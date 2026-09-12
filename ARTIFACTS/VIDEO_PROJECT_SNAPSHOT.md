# VIDEO PROJECT SNAPSHOT
**Ngày tạo:** 2026-09-11
**Trạng thái hệ thống:** Đã kiểm toán toàn diện & dọn dẹp video ảo (Zero-Fake Policy)

---

## 1. MỤC TIÊU VÀ NGUYÊN TẮC TỐI CAO
- Tuyệt đối không tạo video mới bằng AI / không sinh video / không tạo video ảo / demo / placeholder / sample / YouTube / Vimeo.
- Nguyên tắc cốt lõi: **VIDEO KHÔNG TỒN TẠI → KHÔNG HIỂN THỊ PLAYER → KHÔNG TẠO VIDEO THAY THẾ.**
- Nếu tệp video thật do giáo viên cung cấp chưa có trong storage:
  - Báo trạng thái: `ORIGINAL_VIDEO_NOT_AVAILABLE`
  - Yêu cầu giáo viên tải lên video bài giảng thực tế qua giao diện Quản lý Giáo viên (`/teacher` -> Tab Video bài giảng).
  - Không hiển thị khung player rỗng hay lỗi cho học sinh.

---

## 2. KẾT QUẢ QUÉT TÀI NGUYÊN HỆ THỐNG
- Đã xóa toàn bộ script tạo video giả lập (`scripts/generate_fixed_videos.py`).
- Đã thu hồi toàn bộ các tệp video mẫu phát sinh (`uploads/videos/*.mp4`, `public/videos/*.mp4`, `dist/videos/*.mp4`).
- Cơ sở dữ liệu metadata (`server/data/theory_videos.json`): Hiện tại chứa 0 tệp ảo. Sẵn sàng tiếp nhận video thực tế từ giáo viên.
- Bảng phân bổ video (`server/data/shape_video_assignments.json`):
  - `cylinder`: `null` (Chờ giáo viên tải lên)
  - `cone`: `null` (Chờ giáo viên tải lên)
  - `sphere`: `null` (Chờ giáo viên tải lên)

---

## 3. KIẾN TRÚC LƯU TRỮ VÀ XÁC THỰC
- Thư mục lưu trữ chính quy: `/uploads/teacher/{teacherId}/{videoId}/`
- Backup và đồng bộ: `/uploads/videos/`
- Phân quyền:
  - **Giáo viên:** Toàn quyền Tải lên, Cập nhật metadata, Gán vào bài học Hình trụ / Nón / Cầu, Xuất bản, Xóa.
  - **Học sinh:** Chỉ đọc video đã được `PUBLISHED` và gán chính thức.
- Streaming:
  - Endpoint: `GET /api/theory-videos/stream/:id`
  - Hỗ trợ đầy đủ HTTP 206 Partial Content, Range requests, Content-Range, Content-Length, Accept-Ranges: bytes.
