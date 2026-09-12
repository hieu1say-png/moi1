# VIDEO QA & REGRESSION TEST REPORT
**Môi trường:** Ubuntu Container / Express + Vite / Node.js
**Kết quả tổng thể:** PASS (Hệ sinh thái ổn định, tuân thủ nghiêm ngặt Zero-Fake Policy)

---

## 1. KIỂM THỬ GIAO DIỆN & TÍNH NĂNG NỀN TẢNG
| Hạng mục kiểm thử | Kịch bản | Kỳ vọng | Kết quả |
| :--- | :--- | :--- | :--- |
| **Trang chủ (HomeView)** | Truy cập giao diện chính, chọn 3 hình học | Hiển thị mô hình 3D, thanh chỉ số, điều hướng mượt mà | **PASS** |
| **Phòng thí nghiệm 3D** | Xoay hình trụ, nón, cầu; điều chỉnh bán kính, chiều cao | Three.js render chuẩn, lưới tọa độ và mặt cắt mượt mà | **PASS** |
| **Bài học Lý thuyết** | Mở tab Lý thuyết của Hình trụ, Nón, Cầu | Không có player ảo; hiển thị đầy đủ kiến thức SGK | **PASS** |
| **Hành trình Học tập** | Mở Modal lộ trình 6 bước | Bước 2 thông báo trung thực khi chưa có video thật | **PASS** |
| **Giao diện Giáo viên** | Truy cập `/teacher` -> Tab Video | Bảng danh sách, form tải lên, chọn tệp hoạt động tốt | **PASS** |
| **Đăng nhập & Quyền hạn** | Thử gọi API sửa/xóa video mà không có token | Trả về 401/403 bảo mật nghiêm ngặt | **PASS** |

---

## 2. KIỂM THỬ STREAMING & HTTP HEADERS
- Endpoint `GET /api/theory-videos/stream/:id`:
  - Trả về mã lỗi `404 ORIGINAL_VIDEO_NOT_AVAILABLE` khi tệp chưa tồn tại (thay vì phát sinh video giả).
  - Hỗ trợ đầy đủ `Accept-Ranges: bytes` và `206 Partial Content` khi tệp thật có mặt.
