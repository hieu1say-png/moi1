# GEOMETRY LAB – HỆ THỐNG TOÁN 9: BÁO CÁO AUDIT UX/UI TOÀN DIỆN (UX AUDIT)

> **Mã báo cáo:** `UX-AUDIT-2026-09-11`  
> **Người thực hiện:** Senior UI/UX Designer & Frontend Architect  
> **Đối tượng sử dụng chính:** Học sinh Lớp 9 (14–15 tuổi) & Giáo viên Toán THCS  
> **Phạm vi Audit:** Toàn bộ 12 màn hình chính, thanh điều hướng, Canvas 3D, phòng thi và hệ thống bài tập

---

## 1. BẢNG TỔNG HỢP ĐIỂM ĐÁNH GIÁ UX/UI (THANG ĐIỂM 10)

| Tiêu chí Đánh giá | Điểm Hiện tại | Điểm Mục tiêu sau Nâng cấp | Đánh giá Trọng số |
| :--- | :---: | :---: | :--- |
| **1. Phân cấp thị giác (Visual Hierarchy)** | 8.2 / 10 | 9.8 / 10 | Rõ ràng, nhưng Trang chủ cần tôn vinh nút "Tiếp tục học" hơn nữa. |
| **2. Typography (Font, Size, Line-height)** | 8.0 / 10 | 9.9 / 10 | Cần chuẩn hóa toàn bộ văn bản toán học & đề bài sang Times New Roman / Academic Serif. |
| **3. Khoảng cách & Đệm (Spacing & Padding)** | 8.5 / 10 | 9.7 / 10 | Một số khối card trên mobile còn đệm quá rộng gây chiếm chỗ vô ích. |
| **4. Căn gióng & Lưới (Alignment & Grid)** | 8.8 / 10 | 9.8 / 10 | Hệ thống 12 cột desktop và 1 cột mobile vận hành tốt, cần nắn thẳng lề thẻ. |
| **5. Tính dễ đọc & Độ tương phản (Readability)** | 9.0 / 10 | 9.9 / 10 | Màu xanh rừng (#16A34A) và nền kem (#F8FAF5) đạt chuẩn WCAG AA+. |
| **6. Trải nghiệm tương tác (Micro-interactions)** | 8.4 / 10 | 9.6 / 10 | Cần bổ sung âm hưởng xúc giác (haptic-like feedback), nút tương tự, dự đoán trước thử nghiệm. |
| **7. Trải nghiệm di động (Mobile UX & Touch)** | 8.1 / 10 | 9.8 / 10 | Một số nút trượt (slider) trên mobile cần touch target tối thiểu 44px. |
| **8. Kiểm soát phân tâm thị giác (Visual Clutter)** | 8.6 / 10 | 9.8 / 10 | Không dùng card lồng card vô lý; giữ không gian thở tinh tế cho việc học. |
| **ĐIỂM TRUNG BÌNH TOÀN DIỆN** | **8.45 / 10** | **9.79 / 10** | **Hệ thống có nền tảng xuất sắc, cần tối ưu độ sắc nét chuyên sâu.** |

---

## 2. PHÂN TÍCH CHI TIẾT THEO TỪNG TIÊU CHÍ

### 2.1. Phân cấp thị giác (Visual Hierarchy)
- **Điểm mạnh:**
  - Sidebar điều hướng có sự phân biệt rõ ràng giữa 3 chủ đề hình học (Trụ - Nón - Cầu) và các khu vực chức năng học tập.
  - Các nút hành động chính (Primary Action Button) sử dụng màu xanh lục nổi bật (`#16A34A`) giúp học sinh dễ định vị.
- **Tồn tại cần khắc phục:**
  - Trang chủ học sinh (`HomeView`) hiện có nhiều khối thẻ ngang hàng: Nhiệm vụ giáo viên, Lộ trình học, 3 Hình không gian, Lối tắt. Cần tạo điểm neo thị giác số 1: Thẻ **"TIẾP TỤC HỌC DỞ"** kèm thông tin rõ ràng về bài học, hoạt động gần nhất và nút kêu gọi hành động (CTA) nổi bật nhất.
  - Phân tách quyền truy cập: Học sinh tuyệt đối không được nhìn thấy bất kỳ nút cấu hình giáo viên hay bảng điều khiển lớp học nào.

### 2.2. Typography & Render Toán học
- **Điểm mạnh:**
  - Đã tích hợp KaTeX chuẩn cho hầu hết các công thức diện tích xung quanh, toàn phần và thể tích.
- **Tồn tại cần khắc phục:**
  - Các đoạn văn bản diễn giải đề toán, phân tích sai lầm và hướng dẫn phương pháp giải ở một số component con đang sử dụng font không chân (`sans-serif`), làm giảm tính học thuật trang trọng của bộ môn Toán 9.
  - **Yêu cầu nâng cấp:** Đặt chuẩn font `Times New Roman` làm font chữ cơ sở cho toàn bộ nội dung học tập, đề bài, các bước giải, bảng biểu dữ liệu và kết quả tính toán; giữ font không chân chỉ cho các thẻ hệ thống (nhãn icon, badge trạng thái nhỏ).
  - Đảm bảo 100% không còn ký tự LaTeX thô chưa biên dịch hiển thị trong giao diện.

### 2.3. Khoảng cách (Spacing & Padding) và Không gian hiển thị (Layout Optimization)
- **Điểm mạnh:**
  - Giao diện có khoảng thở tốt, không bị dính chữ.
- **Tồn tại cần khắc phục:**
  - Trên màn hình nhỏ (<400px), thanh cuộn ngang tiềm ẩn có thể xuất hiện nếu tiêu đề công thức quá dài mà không được xử lý `overflow-x-auto` cục bộ.
  - Khung Canvas 3D cần được giải phóng tối đa diện tích (tối thiểu 90% không gian hiển thị không bị các panel thông tin che khuất). Bộ điều khiển 3D phải đặt ở dạng nổi tiện dụng (floating docked HUD).

### 2.4. Trải nghiệm Tương tác & Phản hồi (Interaction & Feedback)
- **Tồn tại và Nâng cấp đề xuất:**
  - **Luyện tập:** Khi học sinh giải xong một bài toán, cần có ngay nút **"Luyện câu tương tự"** để lấy tức thời một bài toán cùng dạng kiến thức trong ngân hàng 1000+ câu.
  - **Khám phá 3D:** Cần bổ sung tính năng **"Dự đoán trước khi thử nghiệm (Quick Insight)"**. Khi học sinh kéo thanh trượt bán kính tăng gấp đôi, hệ thống đặt câu hỏi dự đoán định tính trước để kích thích tư duy suy luận trước khi kiểm chứng thực tế bằng mô hình trực quan.
  - **Bộ điều khiển 3D đầy đủ:** Nút Xoay 360°, Phóng to (+), Thu nhỏ (-), Đặt lại góc nhìn (Reset), Xem hình chiếu vuông góc, Bật/tắt trục tọa độ.

### 2.5. Trải nghiệm Di động (Mobile UX & Touch Targets)
- **Tồn tại và Nâng cấp đề xuất:**
  - Kích thước chạm (Touch target) của tất cả các nút bấm, tab chuyển đổi trên điện thoại phải đạt tối thiểu 44×44px.
  - Drawer hoặc bottom sheet điều hướng trên mobile đóng/mở mượt mà khi người dùng chạm vào vùng ngoài (backdrop).
  - Tối ưu hiển thị cho các độ phân giải phổ biến: 360×800, 390×844, 412×915 và tablet 768×1024.

---

## 3. DANH SÁCH HÀNH ĐỘNG CẢI THIỆN THEO THỨ TỰ ƯU TIÊN (ACTION ITEMS)

1. **[P0] Chuẩn hóa Typography toàn hệ thống:** Cấu hình `src/index.css` và các class font áp dụng đồng bộ `Times New Roman` cho công thức, bài toán, đề thi, hướng dẫn và phân tích.
2. **[P0] Bổ sung Thẻ "Tiếp tục học" trên Trang chủ Học sinh:** Hiển thị bài học đang học dở, nút "TIẾP TỤC HỌC" đưa thẳng vào trạng thái trước đó.
3. **[P0] Tích hợp tính năng "Luyện câu tương tự" trong Module Luyện tập:** Học sinh có thể nhấn nút để đổi sang câu hỏi biến thể cùng dạng kiến thức.
4. **[P1] Tích hợp hộp thoại "Dự đoán trước khi thử nghiệm (Quick Insight)"** trong không gian 3D.
5. **[P1] Hoàn thiện hệ thống điều khiển 3D trực quan:** Nút zoom, xoay, reset góc nhìn chuẩn không che lấp mô hình.
6. **[P1] Kiểm tra và triệt tiêu triệt để overflow ngang trên mobile.**
7. **[P2] Hoàn thiện các báo cáo kiểm thử và nghiệm thu trong `/ARTIFACTS/`.**
