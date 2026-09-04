# SIÊU PROMPT & TÀI LIỆU KỸ THUẬT: MÀN HÌNH ĐĂNG NHẬP "DEN" HUSKY INTERACTIVE

## 1. Giới thiệu tổng quan
Giao diện đăng nhập **"Den"** là màn hình xác thực đặc sắc được tích hợp vào **Geometry Lab Toán 9**. 
Giao diện kết hợp tính sư phạm của chương trình GDPT 2018 với trải nghiệm người dùng hiện đại, tinh tế và đầy cuốn hút thông qua:
1. **Linh vật Husky tương tác thông minh ("Watch husky eyes!")**
2. **Nút bấm 3D "Sign In Is A Door" với người que bước qua cánh cửa**
3. **Bố cục thẻ Glassmorphism mờ gương sang trọng với liên kết học đường**

---

## 2. Các điểm nhấn tương tác trọng tâm

### 🐶 1. Linh vật Husky tương tác ("Watch husky eyes!")
- **Theo dõi Username (Gõ tài khoản):**
  - Con ngươi (`#pupil-left`, `#pupil-right`) di chuyển theo thời gian thực dựa trên độ dài chuỗi ký tự (`len = username.length`).
  - Thuật toán tracking: `offsetX = Math.min(Math.max((len - 4) * 0.8, -5), 5)` và `offsetY = 3.5` (Husky nhìn chúc xuống ô nhập liệu).
- **Che mắt khi nhập mật khẩu (Password masked):**
  - Khi ô mật khẩu nhận tiêu điểm (`focus`) và đang ở chế độ ẩn:
    - Đôi móng vuốt (`#husky-paws`) trượt êm ái lên trên che mắt (`transform: translateY(-28px)` với đường cong lò xo `cubic-bezier(0.34, 1.56, 0.64, 1)`).
    - Đôi mắt chuyển sang trạng thái nhắm tít (`squint / crescent eyes`).
- **Mở mắt xem mật khẩu (Eye Toggle):**
  - Khi bấm icon con mắt 👁️ để hiện mật khẩu, móng vuốt tự động hạ xuống và Husky mở to mắt ngạc nhiên (`dilated pupils`).
- **Ăn mừng khi đăng nhập thành công:**
  - Husky nở nụ cười rạng rỡ với chiếc lưỡi hồng chúm chím `( ˶ˆᗜˆ˵ )`, đôi má ửng hồng phấn và đôi tai vểnh lên vui sướng.

---

### 🚪 2. Nút "Sign In Is A Door" (Cánh cửa 3D & Người que bước qua)
- **Hiệu ứng cánh cửa 3D:**
  - Khung phối cảnh `perspective: 600px;`.
  - Cánh cửa gỗ có tay nắm vàng xoay mở $72^\circ$ (`rotateY(-72deg)` với `transform-origin: left center`).
  - Ánh sáng vàng rực rỡ bừng sáng từ bên trong ngưỡng cửa (`opacity: 0.95` kèm đổ bóng hào quang `box-shadow: 0 0 16px rgba(251, 191, 36, 0.9)`).
- **Chân người que vung bước đi:**
  - Hoạt ảnh `thighFrontWalk` và `thighBackWalk` luân phiên vung chân 460ms mô phỏng nhịp bước tự nhiên.
  - Người que bước qua ngưỡng cửa và tan biến vào vùng sáng (`transform: translateX(36px); opacity: 0;`).
- **Chuyển đổi nhãn:**
  - Nhãn nút chuyển từ *"Đăng nhập vào Den"* $\rightarrow$ *"Đang mở cửa..."* $\rightarrow$ *"Welcome back!"*.

---

### 📱 3. Bố cục thẻ Glassmorphism & Tiện ích
- **Thanh tìm kiếm vòm cong:** Viên con nhộng mờ gương trên cùng với nhãn *"Tìm nội dung liên quan: Hình trụ, nón, cầu..."*.
- **Hỗ trợ SSO Học đường:** Nút mạng xã hội `[ Google ]` (Google Workspace for Education) & `[ Apple ]`.
- **Thẻ vai trò kép:** Chuyển đổi mượt mà giữa `[ Học Sinh ]` và `[ Giáo Viên ]`.
- **Tài khoản thử nghiệm 1-click:**
  - Học sinh: `demo9a2` / `Demo@123`
  - Giáo viên: `hieu1say` / `gvtoan9@2025`

---

## 3. Mã nguồn triển khai trong dự án

- **Component React:** `/src/components/auth/HuskyInteractiveLoginPage.tsx`
- **Keyframes & CSS 3D:** `/src/index.css` (các lớp `.husky-container`, `.doorbtn-scene`, `.doorbtn.dooropen`, `.doorbtn.walking`, `.doorbtn.out`, `.husky-covering-eyes`)
- **Tích hợp AuthGate & LoginPage:** Hỗ trợ chuyển đổi nhanh giữa chế độ Husky Den và chế độ Chuẩn.
