# BẢN ĐỒ TÍCH HỢP VIDEO BÀI HỌC THỰC TẾ (VIDEO INTEGRATION MAP)
**Dự án:** Geometry Lab – Toán Lớp 9  
**Ngày thực hiện:** 2026-09-12  
**Chức danh thực hiện:** Senior Full-Stack Engineer, Software Architect & Database Engineer  
**Quy chuẩn áp dụng:** Strict Zero-Fake Policy, Server-Authoritative Video Registry, Dual-Role Authorization (Teacher/Student)

---

## 1. Danh mục Video được xác định từ Video gửi kèm Prompt

| STT | Chủ đề (Topic) | Tên bài học thực tế | Giảng viên & Nguồn | Thời lượng | Định dạng | MIME Type | Trạng thái vật lý |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Hình trụ (`cylinder`)** | Một số hình khối trong thực tiễn - 1. Hình trụ (Nhận biết hình trụ & khai triển) | Thầy Cao Đô (OLM.vn) - Toán 9 Kết nối tri thức | 09:27 (567 giây) | MP4 (H.264 / AAC) | `video/mp4` | Đã lập chỉ mục Metadata; Chờ nạp tệp nhị phân vào ổ cứng |
| **2** | **Hình nón (`cone`)** | Hình nón - 2. Hình nón (Nhận biết hình nón, sự tạo thành & hệ thức $l^2 = h^2 + r^2$) | Thầy Cao Đô (OLM.vn) - Toán 9 Kết nối tri thức | 09:44 (584 giây) | MP4 (H.264 / AAC) | `video/mp4` | Đã lập chỉ mục Metadata; Chờ nạp tệp nhị phân vào ổ cứng |
| **3** | **Hình cầu (`sphere`)** | Toán lớp 9 - 1. Nhận biết hình cầu (Mặt cầu vs Hình cầu, tạo lập & thiết diện) | Thầy Cao Đô (OLM.vn) - Toán 9 Kết nối tri thức | 06:01 (361 giây) | MP4 (H.264 / AAC) | `video/mp4` | Đã lập chỉ mục Metadata; Chờ nạp tệp nhị phân vào ổ cứng |

---

## 2. Tên file thực tế và Cấu trúc Storage Path

Theo đúng cấu trúc chuẩn hóa được yêu cầu:

```
public/
└── videos/
    ├── tru_poster.jpg (Đã có sẵn)
    ├── non_poster.jpg (Đã có sẵn)
    ├── cau_poster.jpg (Đã có sẵn)
    └── theory/
        ├── cylinder/
        │   └── video_thuc_te_hinh_tru.mp4
        ├── cone/
        │   └── video_thuc_te_hinh_non.mp4
        └── sphere/
            └── video_thuc_te_hinh_cau.mp4
```

Và cấu trúc fallback tải lên từ tài khoản giáo viên:
```
uploads/
└── videos/
    └── theory/
        ├── cylinder/
        ├── cone/
        └── sphere/
```

---

## 3. Bản ghi cơ sở dữ liệu (Database Records)

Nguồn sự thật tại `server/data/theory_videos.json` đã được làm sạch 100% video giả/demo/fake URL. Ba bản ghi tương ứng:

1. **Bản ghi Hình trụ:**
   - **ID:** `theory-cylinder`
   - **Topic:** `CYLINDER` / `cylinder`
   - **File:** `video_thuc_te_hinh_tru.mp4`
   - **Storage Path:** `videos/theory/cylinder/video_thuc_te_hinh_tru.mp4`
   - **URL:** `/videos/theory/cylinder/video_thuc_te_hinh_tru.mp4`
   - **Status:** `PENDING_STORAGE` (Tự động kích hoạt `PUBLISHED` khi tệp vật lý được phát hiện)
   - **Poster:** `/videos/tru_poster.jpg`
   - **Duration:** `09:27` (567 giây)

2. **Bản ghi Hình nón:**
   - **ID:** `theory-cone`
   - **Topic:** `CONE` / `cone`
   - **File:** `video_thuc_te_hinh_non.mp4`
   - **Storage Path:** `videos/theory/cone/video_thuc_te_hinh_non.mp4`
   - **URL:** `/videos/theory/cone/video_thuc_te_hinh_non.mp4`
   - **Status:** `PENDING_STORAGE`
   - **Poster:** `/videos/non_poster.jpg`
   - **Duration:** `09:44` (584 giây)

3. **Bản ghi Hình cầu:**
   - **ID:** `theory-sphere`
   - **Topic:** `SPHERE` / `sphere`
   - **File:** `video_thuc_te_hinh_cau.mp4`
   - **Storage Path:** `videos/theory/sphere/video_thuc_te_hinh_cau.mp4`
   - **URL:** `/videos/theory/sphere/video_thuc_te_hinh_cau.mp4`
   - **Status:** `PENDING_STORAGE`
   - **Poster:** `/videos/cau_poster.jpg`
   - **Duration:** `06:01` (361 giây)

---

## 4. Video Registry trung tâm (Centralized Video Registry)

Đã thiết lập tại `src/data/videoRegistry.ts` và `server/data/videoRegistry.json`:
- Đảm bảo tính toàn vẹn 1 nguồn sự thật (Single Source of Truth).
- Khóa gán: `server/data/shape_video_assignments.json`:
  ```json
  {
    "cylinder": "theory-cylinder",
    "cone": "theory-cone",
    "sphere": "theory-sphere"
  }
  ```

---

## 5. Kết nối vào thành phần Lý thuyết (Theory Component)

- **Component:** `src/views/TheoryView.tsx` (Mục 2: "VIDEO BÀI GIẢNG ĐIỆN TỬ")
- **Player Component:** `src/components/video/LessonVideo.tsx`
- **Mapping Logic:**
  - `selectedShape === 'cylinder'` $\rightarrow$ `theory-cylinder`
  - `selectedShape === 'cone'` $\rightarrow$ `theory-cone`
  - `selectedShape === 'sphere'` $\rightarrow$ `theory-sphere`
- **Hành vi hiển thị:**
  - **Khi tệp video vật lý tồn tại và hợp lệ:** Hiển thị HTML5 Video Player với đầy đủ thanh điều khiển, chapters, timeline scrubbing, volume, fullscreen, không autoplay, không loop, preload metadata.
  - **Khi tệp video chưa được nạp vào storage:** Hiển thị chính xác thông báo:
    **"Video bài học chưa được giáo viên cung cấp."**
    (Không hiển thị video demo, không hiển thị video AI, không hiển thị video sai chủ đề).

---

## 6. Kiểm toán tính bền vững (Persistence & Security)

1. **Sau Refresh (F5):**
   - Registry và Assignments lưu tại `server/data/*.json` và `localStorage` an toàn.
2. **Sau Đăng xuất / Đăng nhập lại:**
   - Học sinh chỉ xem được video khi video đã qua kiểm chứng vật lý.
   - Giáo viên (`hieu1say`) có quyền quản trị, tải lên, gán hoặc gỡ video.
3. **Phòng chống lỗi HTTP 413 (Payload Too Large):**
   - Giới hạn body Express nâng lên 50MB/100MB.
   - Hỗ trợ endpoint tải lên theo phân mảnh (chunked upload) và hỗ trợ Direct Upload tới Vercel Blob khi biến môi trường `BLOB_READ_WRITE_TOKEN` được cung cấp.

---

## 7. Bảng tổng hợp trạng thái tích hợp (Status Matrix)

| Chủ đề | File thật | Storage Path | URL | Metadata | Theory Mapping | Playback | Persistence | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hình trụ** | `video_thuc_te_hinh_tru.mp4` | `videos/theory/cylinder/video_thuc_te_hinh_tru.mp4` | `/videos/theory/cylinder/video_thuc_te_hinh_tru.mp4` | Đã cấu hình (09:27, 567s) | Hoàn tất | NOT VERIFIED (Chờ nạp file nhị phân) | Sẵn sàng | PARTIALLY COMPLETED |
| **Hình nón** | `video_thuc_te_hinh_non.mp4` | `videos/theory/cone/video_thuc_te_hinh_non.mp4` | `/videos/theory/cone/video_thuc_te_hinh_non.mp4` | Đã cấu hình (09:44, 584s) | Hoàn tất | NOT VERIFIED (Chờ nạp file nhị phân) | Sẵn sàng | PARTIALLY COMPLETED |
| **Hình cầu** | `video_thuc_te_hinh_cau.mp4` | `videos/theory/sphere/video_thuc_te_hinh_cau.mp4` | `/videos/theory/sphere/video_thuc_te_hinh_cau.mp4` | Đã cấu hình (06:01, 361s) | Hoàn tất | NOT VERIFIED (Chờ nạp file nhị phân) | Sẵn sàng | PARTIALLY COMPLETED |

---

## 8. Các vấn đề còn tồn tại & Giải pháp (Remaining Tasks)

1. **Tệp nhị phân video thực tế:**
   - Khi người dùng gửi video đính kèm trong chat prompt của Google AI Studio, video được đưa vào pipeline xử lý thị giác đa phương thức (multimodal token frames), chứ môi trường web sandbox của container không tự động tải tệp nhị phân thô (.mp4) xuống đĩa cứng `/app/applet`.
   - **Giải pháp hoàn tất:** Giáo viên có thể đưa tệp vào dự án bằng cách:
     - Cách A: Dùng giao diện Quản trị của Giáo viên trong ứng dụng (bấm nút "Tải lên video thật" trong mục Lý thuyết hoặc tab Giáo viên).
     - Cách B: Copy/thả tệp video vào đúng thư mục `public/videos/theory/cylinder/`, `public/videos/theory/cone/`, `public/videos/theory/sphere/`.
2. **Khi tệp được đặt vào thư mục:**
   - Hàm `verifyPhysicalVideoExists()` trong backend sẽ ngay lập tức nhận diện tệp, kích hoạt trạng thái `PUBLISHED` và player trong phần Lý thuyết sẽ tự động phát video thực tế mà không cần khởi động lại ứng dụng.
