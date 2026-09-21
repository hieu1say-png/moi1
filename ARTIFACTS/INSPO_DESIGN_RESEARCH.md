# INSPO DESIGN RESEARCH & EVIDENCE BASE
**Dự án:** Geometry Lab Toán 9 (Hình Trụ – Hình Nón – Hình Cầu)  
**Tài liệu:** `/ARTIFACTS/INSPO_DESIGN_RESEARCH.md`  
**Phương pháp:** Nutlope / Inspo Design Methodology (Real References $\to$ Design Evidence $\to$ Macrostructure $\to$ Design System $\to$ Implementation $\to$ Review)

---

## 1. Cơ Sở Nghiên Cứu & Nguồn Tham Chiếu Thực Tế (Real References)
Thay vì sao chép giao diện hoặc dùng template rập khuôn, nghiên cứu này chắt lọc nguyên lý từ 4 nền tảng giáo dục & công cụ trực quan hàng đầu thế giới:

### A. Brilliant.org — Bậc Thầy Trực Quan Hóa Khái Niệm Toán & STEM
- **Đặc trưng cốt lõi:**
  - Không dùng hero banner khổng lồ chiếm diện tích; người học vừa vào trang đã thấy ngay bài học trọng tâm tiếp theo ("Continue Learning").
  - Tương tác trực tiếp với mô hình toán/vật lý ngay trên canvas; công thức được sinh ra từ chính hành động kéo thả, quan sát chứ không phải áp đặt lý thuyết tĩnh.
  - Phân cấp thị giác: Nền sáng dịu (Warm Light Gray/Slate), viền hairline mảnh 1px có độ tương phản vừa phải, bảng màu nhấn (Accent) hạn chế và có ý nghĩa chỉ báo tiến độ hoặc vật thể được chọn.

### B. PhET Interactive Simulations (Đại Học Colorado Boulder)
- **Đặc trưng cốt lõi:**
  - "Simulation is King": Khu vực mô phỏng là tâm điểm (Hero Canvas), không bị che khuất bởi thanh công cụ hay menu nổi.
  - Bảng điều khiển biến số (Variables & Sliders) đặt gọn gàng ở cột phụ bên phải (trên desktop) hoặc ngay dưới canvas (trên mobile), có đơn vị đo rõ ràng.
  - Trạng thái rõ ràng: Người học luôn biết mình đang thay đổi tham số gì ($r, h, l$) và kết quả tính toán tức thời hiển thị song song.

### C. Khan Academy — Kiến Trúc Tiến Trình & Bản Đồ Năng Lực (Mastery System)
- **Đặc trưng cốt lõi:**
  - Định hướng "Where am I?": Học sinh luôn biết mình đang ở đâu trong lộ trình chương IV Toán 9 (Hình Trụ $\to$ Hình Nón $\to$ Hình Cầu $\to$ Ôn tập tổng hợp).
  - Khối hành động chính (Primary Action) luôn xuất hiện trong viewport đầu tiên với độ ưu tiên #1 rõ ràng (ví dụ: "Tiếp tục bài tập", "Khám phá phòng 3D").
  - Phản hồi bài tập: Tách biệt câu hỏi $\to$ lựa chọn $\to$ xác nhận $\to$ phản hồi giải thích 4 bước.

### D. Linear & Apple Education — Chuẩn Mực Hệ Thống Thiết Kế Tối Giản
- **Đặc trưng cốt lõi:**
  - Thanh điều hướng (Masthead/Top Bar) nhỏ gọn (chiều cao 56–64px), thanh thoát, không chiếm dụng chiều dọc viewport.
  - Bỏ triệt để hiệu ứng bóng đổ nặng (heavy drop-shadows), đèn neon phát sáng chói lọi, kính mờ giả tạo (glassmorphism overload).
  - Thay thế bằng cấu trúc khung viền sắc sảo, tỷ lệ khoảng cách nhịp điệu (Spatial Rhythm: 8px, 16px, 24px, 32px, 48px, 64px) và phông chữ Sans hiện đại dễ đọc.

---

## 2. Bằng Chứng Thiết Kế & Nguyên Tắc Chắt Lọc (Design Evidence)

| Yếu Tố | Thực Trạng Trước Đây | Giải Pháp Dựa Trên Bằng Chứng (Inspo-Driven) |
| :--- | :--- | :--- |
| **Thanh Điều Hướng** | Quá tải: Đồng thời có Header, Sidebar máy tính và Dock nổi đáy màn hình gây chật chội. | **Thanh Masthead Tinh Gọn (Compact Masthead):** Cố định trên đỉnh, chiều cao 56px, hiển thị đủ 7 điểm đến chính; tích hợp menu trượt gọn gàng trên mobile. |
| **Viewport Đầu Tiên** | Hero banner quá khổ kèm hiệu ứng hạt bay đẩy nút hành động chính xuống dưới nếp gấp màn hình. | **Viewport Rõ Ràng Trong 5 Giây:** Người học vào trang biết ngay: (1) Đang học môn gì, (2) Tiến độ đến đâu, (3) Nút bấm bắt đầu ngay trong tầm mắt. |
| **Màu Sắc & Accent** | Dùng quá nhiều màu xanh lá rực, bóng đổ dày, viền đa sắc gây phân tán chú ý. | **Hệ Màu Kiềm Chế (Restrained Academic Palette):** Xanh dương học thuật (`#2563EB`) + Xanh ngọc hình học (`#0D9488`) trên nền sáng ấm dịu (`#F8FAFC`). |
| **Kiểu Chữ (Type Ramp)** | Cài đặt Times New Roman cho toàn bộ nút bấm và menu gây nặng nề, khó đọc trên màn hình nhỏ. | **Phân Lớp Kép:** UI sử dụng phông Sans hiện đại, thoáng đãng (`Plus Jakarta Sans` / System Sans); Nội dung toán học và công thức chuẩn hóa qua KaTeX. |
| **Khối Hình Học (Cards)** | Các thẻ hình trụ, nón, cầu chỉ mang tính trang trí. | **Thẻ Năng Lực Tích Hợp:** Thể hiện trực quan hình dáng, số bài đã làm, công thức đại diện và nút hành động chuyển thẳng vào phòng thí nghiệm 3D. |
| **Không Gian 3D Lab** | Menu nổi và nút bấm chen chúc đè lên mô hình 3D. | **Bố Cục Tách Bạch (Unobstructed Canvas):** Mô hình 3D ở giữa là tâm điểm; bảng thông số và công cụ bố trí ở cột bên cạnh trên desktop hoặc dưới đáy trên mobile. |

---

## 3. Kiến Trúc Vĩ Mô (Macrostructure Blueprint)

### 1. Trang Chủ (HOME VIEW)
- **Khu Vực 1 (Header/Masthead):** Logo Geometry Lab 9, Điều hướng 7 phân hệ, Huy hiệu tiến độ học sinh.
- **Khu Vực 2 (First Viewport Hero & Continue Learning):** Lời chào ngắn, bài học đang dở dang, nút hành động chính [VÀO PHÒNG THÍ NGHIỆM 3D].
- **Khu Vực 3 (Shape Laboratory Suite):** 3 khối cốt lõi (Hình Trụ, Hình Nón, Hình Cầu) với tiến độ và công thức chìa khóa.
- **Khu Vực 4 (STEM Real-World & 1/3 Paradox):** Cầu nối thực tiễn (Lon nước 330ml, Nón lá Huế, Thí nghiệm rót nước).
- **Khu Vực 5 (AI Tutor & Ôn Thi Tuyển Sinh):** Khối hỗ trợ học tập cá nhân hóa và đề thi vào 10.

### 2. Phòng Khám Phá 3D (3D LAB WORKSPACE)
- Khung nhìn WebGL toàn màn hình hoặc container rộng 1200px.
- Thanh công cụ chế độ: Khối đặc (Solid), Khung dây (Wireframe), Cắt thiết diện (Cross-section), Khai triển trải phẳng (Unfold).
- Bảng tham số động ($r, h, l, R$) hiển thị kèm công thức tính toán cập nhật theo thời gian thực.

### 3. Luyện Tập & Ôn Thi (FOCUSED PRACTICE WORKSPACE)
- Luồng tập trung: Đề bài $\to$ Hình vẽ minh họa $\to$ 4 Lựa chọn $\to$ Nút xác nhận $\to$ Phản hồi và Lời giải chi tiết.
- Không để lộ đáp án trước khi học sinh nộp bài.

### 4. Trợ Lý AI (CONVERSATIONAL TUTOR WORKSPACE)
- Khung hội thoại sạch sẽ, chia bước tư duy (Scaffolding Steps).
- Không xả đoạn văn bản dài dòng; dùng progressive disclosure để học sinh tự suy nghĩ từng nấc.
