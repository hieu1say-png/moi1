# VIDEO LESSON MAPPING SPECIFICATION
**Hệ thống:** Geometry Lab - Toán 9
**Mục tiêu:** Ánh xạ video chuẩn SGK vào các chủ đề Hình trụ, Hình nón, Hình cầu

---

## 1. BẢNG ÁNH XẠ CHỦ ĐỀ & VIDEO
| Hình học | Mã chủ đề | Tiêu đề bài học SGK | Video ID | Đường dẫn phát hiện tại | Trạng thái hiển thị |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hình trụ** | `cylinder` | Video bài học Hình trụ | `null` | `None (Zero-Fake)` | Không render player (Chờ giáo viên) |
| **Hình nón** | `cone` | Video bài học Hình nón | `null` | `None (Zero-Fake)` | Không render player (Chờ giáo viên) |
| **Hình cầu** | `sphere` | Video bài học Hình cầu | `null` | `None (Zero-Fake)` | Không render player (Chờ giáo viên) |

---

## 2. NGUYÊN TẮC HIỂN THỊ TRÊN GIAO DIỆN HỌC TẬP
- **Học sinh (Student View):**
  - Nếu chủ đề chưa có video thật: Không hiển thị khung player rỗng, không hiển thị video mẫu. Nội dung lý thuyết SGK, công thức toán học, mô hình 3D tương tác và hệ thống bài tập vẫn hoạt động bình thường, trực quan và liền mạch.
- **Giáo viên (Teacher View):**
  - Hiển thị hộp điều khiển: *"Chưa có video được gán cho chủ đề này"* kèm 2 nút hành động nhanh:
    1. **+ Tải video lên:** Cho phép chọn tệp video MP4/WebM từ máy tính để tải trực tiếp lên hệ thống lưu trữ.
    2. **Kho video:** Mở bảng chọn các video đã tải để gán làm video chính thức cho bài học.
