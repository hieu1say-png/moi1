# BÁO CÁO ĐÁP ỨNG THIẾT BỊ TOÀN DIỆN (UI RESPONSIVE REPORT)
**Dự án:** Geometry Lab Toán 9  
**Tài liệu:** `/ARTIFACTS/UI_RESPONSIVE_REPORT.md`  
**Tiêu chí:** Tối ưu hóa đồng thời trên mọi kích thước màn hình phổ biến của học sinh và trường học Việt Nam

---

## 1. Ma Trận Kích Thước Thiết Bị Kiểm Thử

| Phân Loại Thiết Bị | Độ Phân Giải Kiểm Thử | Chiến Lược Bố Cục (Layout Strategy) | Lề Ngang (Horizontal Padding) | Trạng Thái |
| :--- | :---: | :--- | :---: | :---: |
| **Mobile Nhỏ (Android Compact)** | $360 \times 800$ | 1 cột duy nhất; Masthead thu gọn thành Hamburger drawer; Nút chạm $\ge 48\text{px}$ | $24\text{px}$ (`px-6`) | **PASS** |
| **Mobile Tiêu Chuẩn (iPhone 13/14/15)** | $390 \times 844$ | 1 cột linh hoạt; Mô hình 3D nằm trên, bảng điều khiển nằm dưới; Nút chọn đáp án $54\text{px}$ | $24\text{px}$ (`px-6`) | **PASS** |
| **Mobile Lớn (Galaxy S / Plus)** | $412 \times 915$ | Bố cục thẻ xếp dọc thoáng đãng; thanh tiến độ dễ nhìn; chạm vuốt mượt mà | $24\text{px}$ (`px-6`) | **PASS** |
| **Laptop Tiêu Chuẩn (Target Viewport)** | $1280 \times 800$ | Thanh Masthead đơn 58px; Container $1140\text{px}$; Bố cục 2-3 cột cân đối; Nút CTA trên nếp gấp | $32\text{px}$ (`px-8`) | **PASS** |
| **Màn Hình Làm Việc (MacBook / PC)** | $1440 \times 900$ | Container học tập $1200\text{px}$; Mô hình 3D mở rộng tới $1360\text{px}$; Không bị kéo giãn vô tận | $40\text{px}$ | **PASS** |
| **Màn Hình Lớn / Bảng Tương Tác** | $1920 \times 1080$ | Giữ nguyên container căn giữa an toàn; viền nền dịu nhẹ tôn lên nội dung trung tâm | Tự động căn giữa | **PASS** |

---

## 2. Quy Tắc Tái Cấu Trúc Bố Cục Khi Thu Nhỏ (Adaptive Recomposition)
Thay vì chỉ co tỷ lệ (scale down) cơ học:
1. **Phòng Thí Nghiệm 3D (3D Lab):**
   - Trên Desktop ($> 1024\text{px}$): Bố cục 2 cột — Cột trái là Canvas 3D chiếm $65\%$ chiều ngang, Cột phải là Bảng tham số và công thức chiếm $35\%$.
   - Trên Mobile ($< 768\text{px}$): Tái cấu trúc thành xếp chồng dọc (Stacked Column) — Canvas 3D cao cố định $320\text{px} - 360\text{px}$ ở trên cùng để ngón tay dễ xoay vật thể, toàn bộ thanh trượt $r, h$ và công thức nằm gọn gàng bên dưới có thể cuộn nhẹ nhàng.
2. **Khu Vực Luyện Tập (Practice Mode):**
   - Trên Desktop: Lưới 2x2 cho 4 phương án A, B, C, D.
   - Trên Mobile: Chuyển thành danh sách 1 cột (1 column list) với chiều cao mỗi phương án là $54\text{px}$, khoảng cách giữa các phương án là $10\text{px}$ để ngón tay cái thao tác dễ dàng không bị ấn nhầm.
3. **Thanh Điều Hướng (Navigation):**
   - Trên Desktop: Thanh Masthead ngang thanh thoát, các mục nằm trên cùng 1 hàng.
   - Trên Mobile: Biến đổi thành nút Menu Hamburger mở Drawer trượt mượt mà từ cạnh phải, các nút mục tiêu lớn tối thiểu $48\text{px}$ kèm biểu tượng trực quan.
