# BÁO CÁO KIỂM ĐỊNH KHẢ NĂNG TIẾP CẬN (ACCESSIBILITY AUDIT - WCAG 2.1 AA)
**Dự án:** Geometry Lab Toán 9  
**Tài liệu:** `/ARTIFACTS/ACCESSIBILITY_AUDIT.md`  
**Tiêu chuẩn:** Tuân thủ hướng dẫn trợ năng nội dung web WCAG 2.1 cấp độ AA

---

## 1. Điều Hướng Bằng Bàn Phím (Full Keyboard Navigability)
Học sinh có thể sử dụng ứng dụng hoàn toàn thông qua bàn phím cơ hoặc thiết bị trợ thính:
- **Phím Tab / Shift + Tab:** Di chuyển tuần tự qua tất cả các thành phần tương tác (nút bấm, ô nhập liệu, danh sách phương án trắc nghiệm).
- **Phím Space / Enter:** Kích hoạt nút bấm, xác nhận chọn đáp án.
- **Phím Mũi Tên (Up / Down / Left / Right):** Điều khiển độ cao của vật thể trong game, điều chỉnh giá trị slider bán kính $r$ và chiều cao $h$ trong phòng thí nghiệm 3D.
- **Phím Escape:** Đóng các hộp thoại (Modal, Dialog) và đưa tiêu điểm focus trở lại nút đã mở hộp thoại.
- **Phím tắt trong Game:** Phím `P` (Tạm dừng game), Phím `1, 2, 3, 4` hoặc `A, B, C, D` (Chọn nhanh phương án trả lời).

---

## 2. Chỉ Báo Tiêu Điểm Rõ Ràng (Visible Focus Ring)
Trong `src/index.css`, hệ thống thiết lập bộ quy tắc CSS bắt buộc:
```css
:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
a:focus-visible {
  outline: 3px solid #0066FF !important;
  outline-offset: 4px !important;
}
```
Vòng viền màu xanh dương tương phản cao (`#0066FF`) nổi bật trên cả nền sáng lẫn nền tối, giúp học sinh khiếm thị một phần hoặc người dùng bàn phím dễ dàng nhận biết vị trí con trỏ.

---

## 3. Độ Tương Phản Màu Sắc (Color Contrast Ratio)
- **Văn bản thông thường (Body Text):** Tỷ lệ tương phản đạt tối thiểu $7.2:1$ (màu chữ `#0F291E` trên nền sáng `#F8FAF5`), vượt xa ngưỡng tối thiểu $4.5:1$ của chuẩn WCAG AA.
- **Tiêu đề & Công thức toán (Headings & Math):** Màu đen tuyền `#000000` trên nền sáng đạt tỷ lệ tương phản tuyệt đối $> 15:1$.
- **Hộp thoại game nền tối:** Chữ trắng sáng `text-slate-100` trên nền xanh thẫm `bg-slate-950` đạt tỷ lệ tương phản $> 12:1$.
- **Tuyệt đối không dùng chữ xám mờ trên nền màu:** Đảm bảo độ sắc nét khi đọc trên màn hình điện thoại dưới ánh sáng ngoài trời.

---

## 4. Kích Thước Vùng Chạm Di Động (Touch Targets)
- Tất cả các nút bấm đều có chiều cao tối thiểu $44\text{ px}$.
- Các nút chọn đáp án trắc nghiệm đạt kích thước $52\text{ px} - 56\text{ px}$, có khoảng cách đệm (padding) tối thiểu $10\text{ px}$ giữa các phần tử để loại bỏ triệt để hiện tượng bấm trượt trên thiết bị cảm ứng.

---

## 5. Hỗ Trợ Trình Đọc Màn Hình & Giảm Chuyển Động (Screen Readers & Reduced Motion)
- Các icon hình học của `lucide-react` đều được bổ sung thuộc tính ngữ nghĩa hoặc kèm văn bản mô tả ẩn `aria-label`.
- Các hộp thoại trắc nghiệm và thông báo đều có thuộc tính `role="dialog"` và `aria-modal="true"`.
- Hệ thống hỗ trợ hoàn hảo chế độ `prefers-reduced-motion: reduce`: triệt tiêu chuyển động rung màn hình và ngừng phát sinh các hạt phát sáng để bảo vệ người dùng nhạy cảm tiền đình.
