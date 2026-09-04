# BÁO CÁO AUDIT TÍCH HỢP VIDEO BÀI HỌC – GEOMETRY LAB (PHASE 0)

**Dự án**: GEOMETRY LAB – TOÁN 9 (Hình học không gian)  
**Tác giả học liệu**: ThS. Trần Ngọc Hiếu  
**Ngày kiểm tra**: 03/09/2026  
**Mục tiêu**: Đưa trực tiếp 3 file video được cung cấp vào ứng dụng cho 3 phân hệ Hình Trụ, Hình Nón, Hình Cầu.

---

## 1. Kiểm tra cấu trúc Dự án & Hệ thống Video hiện tại

### 1.1. Cấu trúc thư mục Assets & Video
- **Thư mục static assets**: `public/assets/videos/` đã tồn tại trong workspace, chứa:
  - `tru.mp4` và `trụ.mp4` (306,266 bytes - 15.0s - 1280x720 H.264 / AAC)
  - `non.mp4` và `nón.mp4` (309,211 bytes - 15.0s - 1280x720 H.264 / AAC)
  - `cau.mp4` và `cầu.mp4` (305,055 bytes - 15.0s - 1280x720 H.264 / AAC)
  - Poster tương ứng: `tru_poster.jpg`, `non_poster.jpg`, `cau_poster.jpg`.
- **Thư mục server uploads**: `uploads/videos/` và `uploads/thumbnails/` phục vụ cho hệ thống Teacher Upload Video.
- **Máy chủ Node/Express (`server.ts`)**:
  - Đã cấu hình static route `/assets` phục vụ `public/assets` với header `Accept-Ranges: bytes` và `Content-Type: video/mp4`.
  - Hỗ trợ đầy đủ HTTP 206 Partial Content (Streaming / Seeking).

### 1.2. Các thành phần và Modules liên quan
- **Config**: `src/config/videoConfig.ts` & `src/data/shapeVideoConfig.ts` định nghĩa mapping giữa shape (`cylinder`, `cone`, `sphere`) và file video.
- **Service**: 
  - `src/services/theoryVideoService.ts`: Quản lý danh sách video lý thuyết.
  - `src/services/videoPipelineService.ts`: Xử lý phân giải pipeline tải video.
- **Components**:
  - `src/components/theory/TheoryVideoPanel.tsx`: Player giao diện hỗ trợ xem video, tua, chỉnh âm lượng, chọn tốc độ, xem timestamp.
  - `src/components/theory/TheoryLearningLayout.tsx`: Bố cục chia cột 3D + Video + Lý thuyết.
  - `src/components/teacher/TeacherVideosTab.tsx`: Bảng điều khiển quản lý và tải lên video giáo viên.
- **Views**:
  - `src/views/TheoryView.tsx`: Trang lý thuyết chính thức.
  - `src/views/ExploreView.tsx`: Không gian 3D tương tác.
  - `src/views/PracticeView.tsx`: Ngân hàng câu hỏi luyện tập.
  - `src/views/RealWorldView.tsx`: Trạm thí nghiệm thực tế.

---

## 2. Phân loại Video: System Video vs Teacher Video (Phase 15)

1. **SYSTEM_VIDEO (Video bài học chuẩn hệ thống)**:
   - Cố định, vĩnh viễn, không phụ thuộc phiên đăng nhập hay Teacher Dashboard.
   - Học sinh và giáo viên đều có quyền truy cập trực tiếp ngay khi mở bài học.
   - Nguồn tệp gốc: `/assets/videos/tru.mp4`, `/assets/videos/non.mp4`, `/assets/videos/cau.mp4`.
2. **TEACHER_VIDEO (Video bổ trợ của Giáo viên)**:
   - Giáo viên có quyền tạo, tải lên, chỉnh sửa, xóa và xuất bản (Publish / Draft).
   - Học sinh chỉ xem được khi giáo viên chuyển trạng thái sang `PUBLISHED`.
   - Lưu trữ riêng trong `uploads/videos/` với API xác thực phân quyền `requireTeacherAuth`.

---

## 3. Vấn đề phát hiện & Giải pháp đề xuất

| STT | Vấn đề phát hiện | Giải pháp đề xuất |
|---|---|---|
| 1 | Chưa có component chuẩn `LessonVideo` độc lập như yêu cầu Phase 5 | Xây dựng `LessonVideo.tsx` hoàn chỉnh (Play/Pause, Seek, Progress, Fullscreen, Volume, Loading, Error, Preload metadata, không autoplay, không mic, không TTS). |
| 2 | Các route `/cylinder`, `/cone`, `/sphere` chưa được khai báo trong `RouteId` của `AppContext` (đang rơi vào default `/home`) | Bổ sung `/cylinder`, `/cone`, `/sphere` vào danh sách route hợp lệ, tự động set `selectedShape` tương ứng và hiển thị module bài học kèm video. |
| 3 | Khung hiển thị luồng sư phạm tuần tự (Lý thuyết → Video → Sự tạo thành → 3D → Thực tế → Luyện tập) cần được củng cố rõ ràng trong module bài học | Cấu trúc luồng hiển thị chuẩn mực từng phần cho Hình Trụ, Hình Nón, Hình Cầu. |
| 4 | Mapping cần đảm bảo duy nhất, không xung đột | Sử dụng hằng số `SYSTEM_VIDEO_LESSONS` làm Single Source of Truth trong `src/config/videoConfig.ts`. |
