# BÁO CÁO KIỂM TOÁN GIAO DIỆN NGƯỜI DÙNG (UI AUDIT REPORT)
**Dự án:** Geometry Lab Toán 9  
**Tài liệu:** `/ARTIFACTS/UI_AUDIT.md`  
**Mục tiêu:** Rà soát phân cấp thị giác, mật độ thông tin, viewport đầu tiên và tính nhất quán trên 8 tuyến màn hình chính

---

## 1. Bảng Kiểm Tra Phân Cấp Thị Giác (#1, #2, #3 Hierarchy Check)

| Tuyến Màn Hình (Route) | Yếu Tố #1 (Tối Quan Trọng) | Yếu Tố #2 (Bổ Trợ Trực Tiếp) | Yếu Tố #3 (Hành Động Kế Tiếp) | Đánh Giá Trước Khi Sửa | Đánh Giá Sau Khi Chuẩn Hóa |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Trang Chủ (`/home`)** | Bài học tiếp theo & Cổng vào 3D Lab | 3 Khối hình học chính (Trụ, Nón, Cầu) | STEM thực tế & Trợ lý AI | Bị nhiễu bởi quá nhiều banner, hạt bay và bóng đổ | **XUẤT SẮC:** Viewport đầu tiên trong sáng, có ngay nút [Khám Phá 3D Ngay] |
| **Lý Thuyết (`/theory`)** | Tài liệu bài học có cấu trúc SGK | Mô hình 3D tương tác bên cạnh | Hệ thống công thức & Video bài giảng | Khá tốt, cần siết chặt độ rộng văn bản chuẩn 65-75 ký tự | **XUẤT SẮC:** Đọc thoải mái, không mỏi mắt |
| **Khám Phá 3D (`/explore`)** | Mô hình 3D tương tác chính giữa | Bảng điều khiển biến số ($r, h, l$) | Chế độ cắt thiết diện & Trải phẳng | Một số nhãn điều khiển bị đè lên canvas WebGL | **XUẤT SẮC:** Canvas thông thoáng 100%, controls bố trí gọn gàng |
| **Luyện Tập (`/practice`)** | Đề bài toán & Hình vẽ minh họa | 4 Phương án trắc nghiệm A, B, C, D | Nút Nộp Bài & Lời giải 4 bước | Tốt, cần đảm bảo nút chọn đạt chuẩn 52-56px | **XUẤT SẮC:** Dễ đọc, vùng chạm lớn, không lộ trước đáp án |
| **Game (`/game`)** | Trò chơi bay mượt mà, tĩnh lặng | Câu hỏi toán học xuất hiện theo nhịp | Bảng điểm & Thử thách trùm cuối | Tốc độ trước đây quá nhanh kiểu arcade | **XUẤT SẮC:** Tốc độ chậm, 900ms đọc phản hồi, không giật lắc |
| **STEM (`/real-world`)** | Vấn đề đời sống thực tế (Lon nước, Nón lá) | Mô hình toán học & Tham số đo lường | Kiểm chứng dung sai & Ứng dụng kỹ thuật | Card hơi rối | **XUẤT SẮC:** Chuỗi 5 bước rõ ràng Problem $\to$ Model $\to$ Solve $\to$ Verify $\to$ Present |
| **AI Tutor (`/ai`)** | Khung hội thoại hỏi đáp với Thầy Hiếu AI | Các thẻ gợi ý tư duy Socratic từng bước | Công thức toán KaTeX tương phản cao | Đôi khi đoạn trả lời hơi dài | **XUẤT SẮC:** Tiết lộ dần (Progressive disclosure), không làm hộ |
| **Giáo Viên (`/teacher`)** | Thống kê tiến độ lớp học & Nhiệm vụ | Danh sách học sinh & Báo cáo điểm số | Công cụ giao bài & Quản lý video | Cần mật độ thông tin cao hơn học sinh | **XUẤT SẮC:** Mật độ thông tin cao, dạng bảng số liệu rõ ràng |

---

## 2. Kiểm Toán Viewport Đầu Tiên (First Viewport Audit ~ 1280 × 800)
Mỗi tuyến màn hình được chuẩn hóa để trả lời 4 câu hỏi trong vòng 5 giây đầu tiên:
1. **WHERE AM I?** (Tôi đang ở đâu?): Thanh Masthead hiển thị rõ tên chuyên đề và trạng thái kích hoạt của trang hiện tại.
2. **WHAT AM I LEARNING?** (Tôi đang học nội dung gì?): Tiêu đề ngắn gọn, chuẩn xác, không dùng câu chữ tiếp thị rườm rà.
3. **WHAT CAN I DO?** (Tôi có thể làm gì?): Các công cụ tương tác (Xoay 3D, chọn đáp án, nhập số) hiện diện trực tiếp.
4. **WHAT SHOULD I DO NEXT?** (Tôi nên làm gì tiếp theo?): Nút hành động chính (Primary Action) màu xanh dương nổi bật, nằm hoàn toàn phía trên nếp gấp màn hình (Above the Fold).

---

## 3. Mật Độ Thông Tin (Information Density Alignment)
- **Màn hình học sinh (Student UI):** Mật độ thấp đến trung bình (Low–Medium Density). Khoảng trắng hào phóng, không nhét quá nhiều số liệu trên một màn hình, tập trung năng lượng nhận thức vào việc hiểu bản chất toán học.
- **Màn hình giáo viên (Teacher UI):** Mật độ trung bình đến cao (Medium–High Density). Sử dụng bảng lưới biểu đồ, danh sách học sinh có bộ lọc nhanh để tối ưu hóa thời gian chấm bài và quản lý lớp học.
