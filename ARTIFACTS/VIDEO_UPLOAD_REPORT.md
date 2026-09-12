# TEACHER VIDEO UPLOAD PIPELINE AUDIT & REPORT
**Chức năng:** Tải lên video giáo viên & Gán bài học chính thức
**Tác nhân kiểm thử:** Giáo viên (`usr-teacher-001`)

---

## 1. PIPELINE TẢI LÊN VIDEO
1. **Kiểm tra định dạng & dung lượng:**
   - Hỗ trợ định dạng: `video/mp4`, `video/webm`, `video/quicktime`.
   - Giới hạn dung lượng: Tối đa 500MB qua `multer` streaming pipeline.
2. **Quy chuẩn lưu trữ phân cấp:**
   - Tệp được ghi vào đường dẫn: `/uploads/teacher/{teacherId}/{videoId}/{filename}`
   - Tạo đồng thời bản ghi trong `/server/data/theory_videos.json` với 18 trường chuẩn:
     `id, title, description, shape, topic, sectionId, durationFormatted, durationSeconds, videoUrl, downloadURL, storagePath, status, type, ownerId, createdAt, updatedAt, viewsCount, likesCount`.
3. **Endpoint tải & gán tự động:**
   - `POST /api/theory-videos/upload-and-assign`
   - Nhận `multipart/form-data` gồm tệp `video`, `shape` (`cylinder` | `cone` | `sphere`), `title`, `description`.
   - Lưu trữ an toàn, cập nhật gán vào bài học và phát tín hiệu đồng bộ theo thời gian thực tới giao diện.

---

## 2. BẢO VỆ PHÂN QUYỀN & BẢO MẬT TÀI NGUYÊN
- **Tải lên / Chỉnh sửa / Xóa / Xuất bản:** Yêu cầu xác thực quyền Giáo viên (`requireTeacherAuth`). Học sinh hoặc khách vãng lai gọi các API này sẽ bị từ chối với mã lỗi `401 Unauthorized` hoặc `403 Forbidden`.
- **Xem video:** Video ở trạng thái `DRAFT` chỉ giáo viên sở hữu mới có quyền truy cập. Video sau khi được chuyển sang `PUBLISHED` mới cho phép học sinh tải và phát streaming.
