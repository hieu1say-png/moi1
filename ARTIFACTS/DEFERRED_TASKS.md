# DEFERRED TASKS (DANH SÁCH NHIỆM VỤ HOÃN LẠI)

## TRẠNG THÁI: TẠM THỜI KHÔNG THỰC HIỆN MỤC 3

Theo chỉ thị nghiêm ngặt tại phần III và XVI của đặc tả dự án:
- **Phạm vi thực hiện:** CHỈ THỰC HIỆN MỤC B, D, E, F, G, H, và MỤC 2.
- **Phạm vi hoãn lại:** **MỤC 3 TUYỆT ĐỐI CHƯA ĐƯỢC TRIỂN KHAI / THAY ĐỔI**.
- Mọi cấu trúc, code, giao diện, route, 3D model và API hiện tại liên quan đến Mục 3 (chương Hình Cầu / Bài 3 hoặc các tính năng mở rộng của Mục 3) được giữ nguyên trạng thái hoạt động hiện tại, không refactor, không can thiệp logic.

---

### BẢNG THEO DÕI NHIỆM VỤ HOÃN LẠI

| Mã Nhiệm Vụ | Tên Nhiệm Vụ | Mô Tả | Trạng Thái | Lý Do Hoãn |
| :--- | :--- | :--- | :--- | :--- |
| **DEF-01** | Refactor nâng cao Mục 3 | Tối ưu hóa chuyên sâu các thuật toán tính toán riêng của Bài 3 / Mục 3 | `DEFERRED – MỤC 3` | Thuộc phạm vi bị cấm can thiệp theo yêu cầu |
| **DEF-02** | Schema Database mở rộng riêng Mục 3 | Mở rộng các trường bảng dành riêng cho các tính năng mới của Mục 3 | `DEFERRED – MỤC 3` | Giữ nguyên kiến trúc hiện tại, không thêm schema riêng cho Mục 3 |
| **DEF-03** | Thêm API endpoints riêng cho Mục 3 | Tạo các route server phục vụ riêng các kịch bản của Mục 3 | `DEFERRED – MỤC 3` | Tránh thay đổi API ngoài phạm vi được giao |
| **DEF-04** | Tái cấu trúc UI/UX riêng Mục 3 | Thiết kế lại giao diện chuyên biệt cho Mục 3 | `DEFERRED – MỤC 3` | Tuân thủ nguyên tắc giữ nguyên Mục 3 |

---

*Ghi chú: Toàn bộ các chức năng hiện có của hệ thống vẫn hoạt động ổn định và không bị ảnh hưởng bởi việc bảo lưu Mục 3.*
