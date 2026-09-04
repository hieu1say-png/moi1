# GEOMETRY LAB - BÁO CÁO PHÂN HỆ GIÁO VIÊN TẢI LÊN VIDEO (TEACHER UPLOAD REPORT)

**Tác giả:** Đội ngũ Kỹ thuật Hệ thống & Kiểm thử Bảo mật  
**Đối tượng áp dụng:** Tài khoản Giáo viên (ThS. Trần Ngọc Hiếu - `hieu1say`) & Giáo viên bộ môn  
**Thời gian hoàn thành:** 03/09/2026  
**Đánh giá tổng thể:** **HOÀN TOÀN ĐẠT CHUẨN (ALL TESTS PASSED)**

---

## 1. Mục Tiêu Phân Hệ

Cho phép giáo viên bộ môn Toán 9 chủ động đóng góp bài giảng video thực tế minh họa cho 3 hình học không gian (Hình Trụ, Hình Nón, Hình Cầu). Phân hệ đảm bảo tính ổn định, bảo mật quyền tác giả và kiểm soát xuất bản chặt chẽ trước khi học sinh tiếp cận.

---

## 2. Quy Trình Nghiệp Vụ Tải Lên (Upload Workflow)

```
[ Giáo viên ]
      │
      ▼
1. Chọn hoặc kéo thả tệp (MP4 / WebM / OGG, dung lượng tối đa 100MB)
      │
      ▼
2. Kiểm tra định dạng & Kích thước (Client-side & Multer validation)
      │
      ▼
3. Gửi tệp nhị phân đến POST /api/theory-videos/upload (Kèm Header xác thực HMAC)
      │
      ├─► Lưu vật lý tại: /uploads/videos/video_{timestamp}_{name}.mp4
      └─► Trả về URL nội bộ: /uploads/videos/...
      │
      ▼
4. Nhập siêu dữ liệu sư phạm:
      ├─ Tiêu đề bài học
      ├─ Chủ đề hình học (CYLINDER / CONE / SPHERE)
      ├─ Mô tả công thức Toán học (Hỗ trợ định dạng LaTeX/KaTeX)
      └─ Mốc thời gian trọng tâm (Key Timestamps)
      │
      ▼
5. Chọn chế độ lưu:
      ├─ [LƯU BẢN NHÁP (DRAFT)]: Chỉ giáo viên thấy, học sinh không thấy.
      └─ [XUẤT BẢN NGAY (PUBLISHED)]: Học sinh trong lớp có thể xem và tương tác ngay.
```

---

## 3. Kiến Trúc Lưu Trữ & Tính Bền Vững (Storage & Persistence)

- **Lưu trữ tệp nhị phân:** Được lưu trực tiếp vào thư mục máy chủ `/uploads/videos/` với quyền truy cập hệ thống thích hợp.
- **Lưu trữ Metadata:** Lưu vào `/server/data/theory_videos.json`. Mỗi bản ghi chứa:
  - `id`: Định danh duy nhất (UUID/Generated slug).
  - `title`, `description`, `topic`: Thông tin bài học.
  - `videoUrl`: Đường dẫn tệp video nội bộ.
  - `status`: `DRAFT` hoặc `PUBLISHED`.
  - `authorId`: Định danh giáo viên tải lên (VD: `teacher_hieu1say`).
  - `authorName`: Tên hiển thị của giáo viên.
  - `viewCount`: Lượt xem thực tế của học sinh.
  - `createdAt`, `updatedAt`: Dấu thời gian.

### Kiểm thử độ bền vững (Persistence Verification):
1. **Thao tác Refresh (F5):** Dữ liệu video và file nhị phân giữ nguyên vẹn 100%.
2. **Thao tác Đăng xuất / Đăng nhập lại:** Dữ liệu video của giáo viên không bị xóa, phiên làm việc phục hồi chính xác.
3. **Môi trường Multi-client:** Trạng thái xuất bản đồng bộ thời gian thực đến bảng học tập của học sinh.

---

## 4. Quản Lý Quyền Tác Giả & Bảo Vệ Tài Nguyên (Teacher Ownership & Authorization)

Hệ thống đã triển khai và kiểm toán 4 quy tắc an toàn cốt lõi:

| Quy tắc bảo mật | Thao tác kiểm thử | Mã phản hồi | Kết quả kiểm tra |
| :--- | :--- | :--- | :--- |
| **Quy tắc 1: Học sinh không được phép tải lên** | Học sinh gửi POST `/api/theory-videos/upload` | `HTTP 403 Forbidden` | **PASS** (Bị chặn tức thì) |
| **Quy tắc 2: Học sinh không được phép xóa** | Học sinh gửi DELETE `/api/theory-videos/:id` | `HTTP 403 Forbidden` | **PASS** (Bị chặn tức thì) |
| **Quy tắc 3: Giáo viên không xóa video của giáo viên khác** | Giáo viên B cố gắng xóa video do Giáo viên A tạo | `HTTP 403 Forbidden` | **PASS** (Bị chặn tức thì) |
| **Quy tắc 4: Video chuẩn SGK được bảo vệ tuyệt đối** | Giáo viên gửi lệnh xóa video hệ thống chuẩn | `HTTP 403 Forbidden` | **PASS** (Không thể xóa) |

---

## 5. Cơ Chế Thu Hồi & Dọn Dẹp Bộ Nhớ (Cascade Delete & Cleanup)

Khi giáo viên thực hiện xóa một video bài giảng của chính mình:
1. Bản ghi siêu dữ liệu trong `theory_videos.json` được xóa sạch.
2. Hệ thống kiểm tra vị trí tệp tin trên ổ đĩa cứng `/uploads/videos/`.
3. Tệp nhị phân MP4 tương ứng được giải phóng hoàn toàn khỏi đĩa (`fs.unlinkSync`), đảm bảo không để lại tệp rác chiếm dụng bộ nhớ máy chủ.

---

## 6. Kết Quả Nghiệm Thu Trực Tiếp (Direct Verification Log)

- Tải lên tệp video thực tế: **THÀNH CÔNG** (Tệp `/public/assets/videos/cầu.mp4` được upload tạo video mới).
- Hiển thị bản nháp: **CHÍNH XÁC** (Giáo viên thấy, học sinh không thấy).
- Chuyển trạng thái xuất bản: **CHÍNH XÁC** (Học sinh thấy ngay lập tức sau khi Publish).
- Tua bài học và hiển thị thời lượng: **CHÍNH XÁC** (Phát mượt mà, đầy đủ công cụ điều khiển).
- Xóa và dọn dẹp: **HOÀN HẢO** (Tệp tin và bản ghi biến mất đồng thời).
