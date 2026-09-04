# BÁO CÁO KIỂM TOÁN HỆ THỐNG LƯU TRỮ VIDEO (VIDEO STORAGE AUDIT REPORT)
**Dự án:** Geometry Lab – Toán Lớp 9  
**Ngày thực hiện:** 2026-09-04  
**Chức danh thực hiện:** Senior Full-Stack Engineer, Software Architect & Storage Security Engineer  
**Trạng thái kiểm toán:** HOÀN TẤT (AUDIT COMPLETED)

---

## 1. Mục tiêu kiểm toán Storage

Báo cáo này nhằm xác định chính xác hạ tầng lưu trữ vật lý thực tế của module Video trong Geometry Lab, loại bỏ hoàn toàn các giả định sai lầm (như nhầm lẫn rằng hệ thống đang kết nối trực tiếp với Firebase Storage trên Cloud khi không có credentials hợp lệ), làm rõ đường dẫn lưu trữ trên đĩa container, các chính sách bảo mật phân quyền (RBAC), kiểm soát MIME type, giới hạn dung lượng và luồng stream dữ liệu.

---

## 2. Kết quả kiểm toán nhà cung cấp lưu trữ (Storage Provider)

| Tiêu chí | Kết quả kiểm toán thực tế | Đánh giá & Rủi ro |
| :--- | :--- | :--- |
| **Storage Provider thực tế** | **Local Disk Storage trong Node.js/Express Container (Cloud Run / Linux container)** | Hệ thống đang chạy container độc lập. Mọi tệp video tải lên được ghi trực tiếp vào filesystem của container thông qua `multer.diskStorage`. |
| **Firebase Storage SDK** | **Không có Service Account hoặc Bucket thực tế được kích hoạt ở runtime** | Mã nguồn trước đây có các wrapper `VideoPipelineService` mô phỏng tên hàm Firebase nhưng thực tế bên dưới gọi về API REST `/api/theory-videos/:id/resolve` và đọc file từ ổ đĩa container. |
| **Tính bền vững của dữ liệu (Persistence)** | **Ổ đĩa container cục bộ kết hợp JSON Database** | Tệp video vật lý được lưu tại `/uploads/teacher/`, metadata lưu tại `server/data/theory_videos.json`. |

---

## 3. Bản đồ cấu trúc thư mục lưu trữ vật lý (Storage Directory Map)

Toàn bộ đường dẫn trên máy chủ chạy từ thư mục gốc của dự án (`process.cwd()` = `/workspace`):

```
/workspace (Container Root)
├── uploads/
│   ├── teacher/                        <-- [KHO LƯU TRỮ CHÍNH CỦA GIÁO VIÊN]
│   │   └── {teacherId}/                <-- Phân vùng theo ID giáo viên (VD: teacher_hieu1say)
│   │       └── {videoId}/              <-- Thư mục riêng cho từng bản ghi video
│   │           └── video_{ts}_{name}.mp4 <-- Tệp video nhị phân thật do giáo viên tải lên
│   ├── thumbnails/                     <-- Ảnh thu nhỏ do giáo viên tải lên hoặc tạo ra
│   └── videos/                         <-- Bản sao đệm (cache fallback) phục vụ stream nhanh
├── server/
│   └── data/
│       ├── theory_videos.json          <-- CƠ SỞ DỮ LIỆU METADATA DUY NHẤT (Single Source of Truth)
│       └── shape_video_assignments.json<-- Bảng gán video cho từng bài học lý thuyết
└── public/
    └── assets/videos/                  <-- Thư mục tài nguyên tĩnh cũ (chứa các file mẫu/demo cần tách biệt khỏi Video Bank)
```

---

## 4. Cơ chế phục vụ Video (Streaming & Playback Mechanism)

Hệ thống cung cấp video cho trình duyệt HTML5 Video Player qua 2 lớp bảo vệ:

1. **Endpoint phân giải (Resolution API):**
   - Tuyến đường: `GET /api/theory-videos/:id/resolve`
   - Nhiệm vụ:
     - Tiếp nhận `videoId`.
     - Kiểm tra trạng thái xuất bản (`status === 'PUBLISHED'`). Nếu là `DRAFT` hoặc `ARCHIVED`, chỉ cho phép giáo viên sở hữu truy cập.
     - Kiểm tra sự tồn tại thực tế của tệp trên đĩa cứng (`fs.existsSync` và `fs.statSync.size > 0`).
     - Ghi nhận log gỡ lỗi chuẩn:
       ```
       [VIDEO DEBUG]
       videoId: <id>
       storagePath: <storagePath>
       downloadURL: <playbackUrl>
       ```
     - Trả về metadata và URL stream đã được xác thực.

2. **Tuyến đường phục vụ tĩnh có phân quyền (Streaming Route with HTTP Range Support):**
   - Tuyến đường: `app.use("/uploads", ...)`
   - Hỗ trợ chuẩn HTTP Range Request (`Accept-Ranges: bytes`, `206 Partial Content`) giúp học sinh tua tiến/lùi mượt mà trên thanh tiến trình video.
   - Header `Content-Type`: Được ép kiểu nghiêm ngặt theo phần mở rộng MIME (`video/mp4`, `video/webm`, `video/ogg`).
   - Phân quyền (RBAC):
     - Khách vãng lai / Học sinh: Chỉ được tải/stream các tệp gắn với video đã có trạng thái `PUBLISHED`.
     - Giáo viên: Có toàn quyền truy cập tất cả các tệp do mình tải lên (kể cả bản nháp `DRAFT`).

---

## 5. Giới hạn kỹ thuật và xác thực dữ liệu tải lên

| Thông số | Giá trị quy định | Thực thi tại Server |
| :--- | :--- | :--- |
| **Dung lượng tối đa (Max File Size)** | **100 MB** cho tệp Video; **10 MB** cho Ảnh Thumbnail | `multer({ limits: { fileSize: 100 * 1024 * 1024 } })` |
| **Định dạng video hợp lệ** | `.mp4`, `.webm`, `.ogg` | Kiểm tra cả `file.mimetype` và phần mở rộng `path.extname`. Từ chối mọi file thực thi, script hoặc định dạng không phải video. |
| **MIME Types được duyệt** | `video/mp4`, `video/webm`, `video/ogg`, `video/quicktime`, `video/x-matroska` | Chặn đứng các tệp lạ, trả về `400 Bad Request`. |
| **Quyền tải lên (Upload Authorization)** | **Chỉ tài khoản Giáo viên (Teacher Role)** | Middleware `requireTeacherAuth` xác thực token HMAC/Session Cookie trước khi multer kích hoạt. Học sinh hoặc khách cố tình gọi API tải lên sẽ lập tức nhận lỗi `403 Forbidden`. |

---

## 6. Kết luận kiểm toán Storage

Hệ thống lưu trữ vật lý thực tế là **Local Container Disk Storage** kết hợp với **Persistent JSON Metadata Repository** trên Express Server. Mọi luồng xử lý video thật từ giáo viên phải tuân thủ nghiêm ngặt mô hình:
`Tải lên đĩa vật lý -> Xác thực dung lượng/MIME -> Tạo bản ghi Video Bank (sourceType: TEACHER_UPLOADED) -> Xác thực tồn tại file thật -> Cho phép xuất bản (PUBLISHED) -> Phục vụ qua Range-Request Player.`
Không cho phép bất kỳ cơ chế tạo URL giả lập nào vượt qua khâu kiểm tra file vật lý này.
