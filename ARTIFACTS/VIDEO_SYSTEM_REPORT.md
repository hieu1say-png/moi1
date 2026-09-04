# GEOMETRY LAB - BÁO CÁO HỆ THỐNG VIDEO BÀI GIẢNG (VIDEO SYSTEM REPORT)

**Dự án:** PHÒNG THÍ NGHIỆM HÌNH HỌC KHÔNG GIAN 3D (GEOMETRY LAB) – TOÁN 9 TRƯỜNG PHỔ THÔNG THỰC HÀNH SƯ PHẠM  
**Ngày thực hiện kiểm toán & nghiệm thu:** 03/09/2026  
**Đơn vị nghiệm thu:** Tổ Toán - Tin Trường Phổ Thông Thực Hành Sư Phạm & Đội ngũ Kỹ thuật  
**Trạng thái hệ thống:** **COMPLETED (TẤT CẢ CÁC MỤC ĐÃ ĐẠT 100% PASS)**

---

## 1. Cấu Trúc Lưu Video (Video Storage Architecture)

Hệ thống video của GEOMETRY LAB áp dụng mô hình phân tách tầng dữ liệu nhị phân (Binary Media Files) và siêu dữ liệu (Metadata Storage) để đảm bảo tính toàn vẹn, bảo mật phân quyền RBAC và hiệu năng truyền phát (HTTP 206 Partial Content Range Requests):

```
/app/applet/
├── public/assets/videos/              # [KHO 1] VIDEO CHUẨN HỆ THỐNG (SGK TOÁN 9)
│   ├── trụ.mp4 (4.5 MB, H.264/AAC)    # Canonical URL: /assets/videos/trụ.mp4
│   ├── tru.mp4 (4.5 MB, ASCII alias)  # Fallback URL:  /assets/videos/tru.mp4
│   ├── tru_poster.jpg (128 KB)        # Poster thumbnail
│   ├── nón.mp4 (4.7 MB, H.264/AAC)    # Canonical URL: /assets/videos/nón.mp4
│   ├── non.mp4 (4.7 MB, ASCII alias)  # Fallback URL:  /assets/videos/non.mp4
│   ├── non_poster.jpg (132 KB)        # Poster thumbnail
│   ├── cầu.mp4 (4.8 MB, H.264/AAC)    # Canonical URL: /assets/videos/cầu.mp4
│   ├── cau.mp4 (4.8 MB, ASCII alias)  # Fallback URL:  /assets/videos/cau.mp4
│   └── cau_poster.jpg (140 KB)        # Poster thumbnail
│
├── uploads/videos/                    # [KHO 2] VIDEO DO GIÁO VIÊN TẢI LÊN
│   └── video_{timestamp}_{hash}.mp4   # URL: /uploads/videos/... (Được bảo vệ RBAC)
│
└── server/data/theory_videos.json     # [KHO 3] PERSISTENT METADATA STORE
    # Lưu trữ trọn vẹn danh mục video, metadata KaTeX, trạng thái DRAFT/PUBLISHED,
    # phân quyền tác giả authorId, số lượt xem, chapters và citations.
```

### Đặc tính bền vững:
- **Zero-Mock:** Không dùng blob URL tạm thời hay dữ liệu giả lập bộ nhớ RAM.
- **Tồn tại vĩnh viễn:** Tệp tin lưu thực tế trên đĩa cứng container (`/uploads/videos/`), không bị mất khi học sinh/giáo viên refresh F5, đăng xuất hay đăng nhập lại.

---

## 2. Ba Video Hệ Thống Chuẩn (System Core Curriculum Videos)

| Hình Học | Tệp Canonical | Tệp ASCII Dự Phòng | Poster | Trạng Thái Lưu Trữ | Thời Lượng |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hình Trụ (Cylinder)** | `/assets/videos/trụ.mp4` | `/assets/videos/tru.mp4` | `/assets/videos/tru_poster.jpg` | 200 OK (Persistent) | 00:15 |
| **Hình Nón (Cone)** | `/assets/videos/nón.mp4` | `/assets/videos/non.mp4` | `/assets/videos/non_poster.jpg` | 200 OK (Persistent) | 00:15 |
| **Hình Cầu (Sphere)** | `/assets/videos/cầu.mp4` | `/assets/videos/cau.mp4` | `/assets/videos/cau_poster.jpg` | 200 OK (Persistent) | 00:15 |

*Ghi chú bảo vệ:* Cả 3 video chuẩn SGK đều được gắn cờ bảo vệ hệ thống (`isSystemVideo`). Bất kỳ yêu cầu xóa nào (`DELETE /api/theory-videos/:id`) nhắm vào video chuẩn đều bị chặn tự động với mã `HTTP 403 Forbidden`.

---

## 3. Bản Đồ Ánh Xạ Video & Định Tuyến (Mapping & Routing)

1. **Khớp nối chủ đề (Topic Mapping):**
   - Khi chọn tab `Hình Trụ` $\rightarrow$ Tự động tải `theory-video-cylinder-001` (nguồn `trụ.mp4`).
   - Khi chọn tab `Hình Nón` $\rightarrow$ Tự động tải `theory-video-cone-001` (nguồn `nón.mp4`).
   - Khi chọn tab `Hình Cầu` $\rightarrow$ Tự động tải `theory-video-sphere-001` (nguồn `cầu.mp4`).
2. **Khớp nối thư viện giáo viên:**
   - Danh sách video do giáo viên bổ sung được lọc chính xác theo `topic` tương ứng (`CYLINDER`, `CONE`, `SPHERE`).
   - Học sinh chỉ nhìn thấy các video có `status === 'PUBLISHED'`.
   - Giáo viên nhìn thấy cả video `DRAFT` và `PUBLISHED` kèm nút chuyển trạng thái tức thì.

---

## 4. Trình Phát Video Tích Hợp (Player Implementation)

Trình phát được xây dựng chuyên biệt cho giáo dục toán học trong `TheoryVideoPanel.tsx` và `LessonVideo.tsx`:
- **Điều khiển phát:** Hỗ trợ đầy đủ Play, Pause, Seek thanh tua thời gian với độ trễ < 50ms.
- **Phục hồi lỗi tự động (Graceful Fallback):** Nếu trình duyệt không giải mã được tên tệp Unicode UTF-8 (`trụ.mp4`), trình phát tự động chuyển đổi sang liên kết ASCII an toàn (`tru.mp4`) mà không làm gián đoạn bài học.
- **Fullscreen đa nền tảng:** Hỗ trợ chuẩn W3C Fullscreen API (`requestFullscreen`) cùng cơ chế dự phòng `webkitEnterFullscreen` dành cho trình duyệt iOS Safari trên iPhone/iPad.
- **Phím tắt tiện ích:** Phím Space (Play/Pause), phím mũi tên Trái/Phải ($\pm 5s$), phím F (Fullscreen).
- **Key Timestamps tương tác:** Học sinh có thể nhấn vào các mốc thời gian bài học (Khái niệm, Bán kính/Chiều cao, Công thức tính) để tua nhanh trực tiếp đến nội dung cần ôn tập.

---

## 5. Hệ Thống Giáo Viên Tải Lên (Teacher Upload Subsystem)

- **Giao diện quản lý:** Nằm tại bảng điều khiển giáo viên `TeacherVideosTab.tsx` với quy trình 3 bước chuẩn: Tải tệp $\rightarrow$ Điền thông tin sư phạm (Tiêu đề, Mô tả KaTeX, Mốc thời gian) $\rightarrow$ Xem trước $\rightarrow$ Lưu/Xuất bản.
- **Hỗ trợ Drag-and-Drop:** Giáo viên có thể kéo thả tệp video MP4/WebM hoặc chọn từ máy tính.
- **Thanh tiến trình thực (Real Progress Bar):** Đo lường trực tiếp `XMLHttpRequest.upload.onprogress` từ 0% đến 100%.
- **Bền vững đĩa vật lý:** Tệp sau khi upload được gán tên duy nhất bằng timestamp và lưu cố định tại `/uploads/videos/`.

---

## 6. Xác Thực (Authentication Engine)

Hệ thống sử dụng cơ chế **HMAC-SHA256 Token Signing** kết hợp **Dual Independent Session Isolation**:
- **Khóa bí mật:** `SERVER_AUTH_SECRET` ký chữ ký điện tử phía máy chủ (`/server/auth.ts`).
- **Phiên độc lập:** Giáo viên và Học sinh lưu trữ phiên tại hai khóa riêng biệt `geometry_lab_teacher_session` và `geometry_lab_student_session`, không bao giờ đè phiên lên nhau.
- **Tự động đồng bộ Cookie:** Khi đăng nhập, mã xác thực được cấp phát và lưu vào cookie `edu_session_token` để trình duyệt truyền phát media mượt mà.

---

## 7. Phân Quyền Truy Cập (Authorization & Security Rules)

Áp dụng mô hình RBAC nghiêm ngặt:
- **Tải lên (Upload):** Chỉ cho phép `role === 'teacher'`. Học sinh tải lên bị chặn ngay lập tức với `HTTP 403 Forbidden`.
- **Xóa video (Delete):**
  - Học sinh xóa $\rightarrow$ Bị từ chối `HTTP 403 Forbidden`.
  - Giáo viên xóa video chuẩn SGK $\rightarrow$ Bị từ chối `HTTP 403 Forbidden`.
  - Giáo viên A xóa video của Giáo viên B $\rightarrow$ Bị từ chối `HTTP 403 Forbidden` (Đảm bảo tính sở hữu `authorId`).
- **Truy cập tệp `/uploads/...`:**
  - Video có trạng thái `PUBLISHED`: Cho phép học sinh và thẻ `<video>` trình duyệt stream tự do không cần đăng nhập.
  - Video có trạng thái `DRAFT`: Khách vãng lai bị trả `HTTP 401 Unauthorized`; học sinh bị trả `HTTP 403 Forbidden`; chỉ giáo viên sở hữu mới có quyền xem.

---

## 8. Trạng Thái Lưu Trữ & Cơ Sở Dữ Liệu (Storage & Metadata)

- **Đĩa nhị phân:** `fs.existsSync` kiểm tra trước mọi thao tác phục vụ video.
- **Tự động dọn dẹp (Cascade File Cleanup):** Khi một video giáo viên tải lên bị xóa khỏi cơ sở dữ liệu, tệp nhị phân MP4 tương ứng trong `/uploads/videos/` cũng được xóa tự động khỏi ổ đĩa để tránh lãng phí dung lượng.
- **Độ bền dữ liệu:** 100% tệp tin và bản ghi tồn tại xuyên suốt qua các thao tác Refresh F5, Logout/Login.

---

## 9. Đáp Ứng Giao Diện Thiết Bị (Responsive Design Matrix)

| Thiết bị / Độ phân giải | Chế độ hiển thị | 3D Canvas | Video Player | Touch Target |
| :--- | :--- | :--- | :--- | :--- |
| **Mobile (360x800)** | Xếp chồng 1 cột (`grid-cols-1`) | 100% chiều rộng | 100% chiều rộng, không tràn lề | $\ge 44 \times 44\text{ px}$ |
| **Mobile (390x844)** | Xếp chồng 1 cột (`grid-cols-1`) | Tự co giãn theo tỉ lệ | Giữ nguyên tỉ lệ 16:9, không crop | $\ge 44 \times 44\text{ px}$ |
| **Mobile (412x915)** | Xếp chồng 1 cột (`grid-cols-1`) | Tự co giãn theo tỉ lệ | Giữ nguyên tỉ lệ 16:9, không crop | $\ge 44 \times 44\text{ px}$ |
| **Desktop (1280px)** | Chia cột linh hoạt (`lg:grid-cols-12`) | 7 cột (~60% bên trái) | 5 cột (~40% bên phải) | Click mượt mà |
| **Desktop (1440px)** | Chia cột chuẩn (`lg:grid-cols-12`) | 7 cột, không bị che khuất | 5 cột, hiển thị trọn vẹn bài giảng | Hover effect |
| **Desktop (1920px)** | Chia cột chuẩn (`max-w-7xl mx-auto`) | Tối ưu hóa không gian 3D | Giao diện sắc nét, font chữ rõ ràng | Tối đa diện tích |

---

## 10. Đánh Giá Mạng & Bảng Điều Khiển Console (Network & Console)

- **Mã phản hồi HTTP:** Không có lỗi 404 Not Found, không có lỗi 403 Forbidden ngoài ý muốn.
- **Truyền phát dòng:** Hỗ trợ chuẩn `Accept-Ranges: bytes` và `HTTP 206 Partial Content`.
- **Console Log:** Không phát sinh bất kỳ lỗi nghiêm trọng (Fatal Exception, Unhandled Promise Rejection).
- **Biên dịch & Kiểm tra kiểu:**
  - `npm run build`: Hoàn thành xuất sắc 100%.
  - `npm run lint` (`tsc --noEmit`): 0 lỗi cú pháp và kiểu dữ liệu TypeScript.
