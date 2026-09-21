# BÁO CÁO KIỂM ĐỊNH MÔ HÌNH 3D GIÁO DỤC (3D EDUCATIONAL MODULE AUDIT)
**Dự án:** Geometry Lab Toán 9 (Hình Trụ - Hình Nón - Hình Cầu)  
**Tài liệu:** `/ARTIFACTS/3D_MODULE_AUDIT.md`  
**Tiêu chí hàng đầu:** GIÁO DỤC > HIỆU ỨNG (Mô hình 3D trực quan hóa bản chất công thức toán học)

---

## 1. Mục Tiêu Sư Phạm Của Hệ Thống 3D
Mô hình Three.js trong Geometry Lab không phục vụ mục đích phô diễn đồ họa thuần túy, mà là công cụ trực quan hóa tư duy không gian (Spatial Reasoning) để học sinh tự mình giải mã nguồn gốc các công thức hình học lớp 9.

---

## 2. Kiểm Định Chi Tiết 3 Module Khối Tròn Xoay

### A. Khối Hình Trụ (`CylinderModel.tsx`)
- **Đại lượng trực quan:** Bán kính đáy $r$, chiều cao $h$, trục quay đối xứng $OO'$.
- **Phục vụ công thức:**
  - $S_{xq} = 2\pi rh$: Trực quan hóa qua tính năng **Khai triển mặt xung quanh** (Net Unfolding). Khi trải phẳng, mặt xung quanh biến thành một hình chữ nhật có kích thước $h$ và chu vi đáy $2\pi r$.
  - $S_{tp} = 2\pi rh + 2\pi r^2$: Bổ sung 2 hình tròn đáy gắn liền với hình chữ nhật khai triển.
  - $V = \pi r^2 h$: Thể hiện nguyên lý Cavalieri và mô phỏng dâng mực nước dạng lát cắt.
- **Mặt cắt & Thiết diện:**
  - Thiết diện qua trục: Hình chữ nhật có cạnh $2r$ và $h$.
  - Thiết diện song song với đáy: Hình tròn bán kính $r$ bằng đáy.

### B. Khối Hình Nón (`ConeModel.tsx`)
- **Đại lượng trực quan:** Đỉnh nón $S$, bán kính đáy $r$, chiều cao $h$, đường sinh $l$, góc ở đỉnh.
- **Mối liên hệ Pythagore:** Tam giác vuông $SOA$ với $SO \perp OA \implies l^2 = r^2 + h^2$.
- **Phục vụ công thức:**
  - $S_{xq} = \pi rl$: Trực quan hóa qua tính năng khai triển mặt nón thành một **hình quạt tròn** có bán kính quạt bằng đường sinh $l$, độ dài cung quạt bằng chu vi đáy $2\pi r$, diện tích quạt đúng bằng $\frac{1}{2} \cdot 2\pi r \cdot l = \pi rl$.
  - $V = \frac{1}{3}\pi r^2 h$: Liên kết trực tiếp với Thí nghiệm Nghịch lý 1/3 (rót nước 3 lần).
- **Mặt cắt & Thiết diện:**
  - Thiết diện qua trục: Tam giác cân có đáy $2r$ và hai cạnh bên là hai đường sinh $l$.

### C. Khối Hình Cầu (`SphereModel.tsx`)
- **Đại lượng trực quan:** Tâm cầu $O$, bán kính $R$, đường kính $d = 2R$.
- **Đường tròn lớn (Great Circle):** Mặt phẳng đi qua tâm cắt khối cầu tạo thành hình tròn có diện tích lớn nhất $S_{\text{max}} = \pi R^2$.
- **Phục vụ công thức:**
  - $S = 4\pi R^2$: Bằng 4 lần diện tích hình tròn lớn (chứng minh Archimedes).
  - $V = \frac{4}{3}\pi R^3$: Tích phân lát cắt và thực nghiệm chìm vật thể Archimedes.

---

## 3. Hệ Thống Điều Khiển Tương Tác (3D Interactive Controls)
1. **Xoay & Thu Phóng:** Tích hợp `OrbitControls` cho phép xoay 360 độ quanh tâm vật thể, thu phóng bằng con cuộn chuột hoặc thao tác 2 ngón tay (pinch-to-zoom) trên màn hình cảm ứng di động.
2. **Chế độ hiển thị đa dạng:**
   - `solid`: Bề mặt khối chân thực với vật liệu bóng mờ (matte shader).
   - `wireframe`: Khung lưới kỹ thuật hỗ trợ quan sát cấu trúc chiều sâu bên trong.
   - `cross-section`: Mặt phẳng cắt động hiển thị thiết diện bên trong hình học.
3. **Trải phẳng (Net Unfolding):** Animation liên tục điều khiển bằng thanh trượt slider từ $0\%$ (khối 3D khép kín) đến $100\%$ (mặt phẳng 2D khai triển hoàn chỉnh).

---

## 4. Quản Lý Nhãn Nhãn 3D (Label Clamping & Collision Prevention)
- Tọa độ 3D của các điểm đo ($r, h, l, R, O$) được chuyển đổi sang tọa độ màn hình 2D thông qua phép chiếu `vector.project(camera)`.
- Áp dụng thuật toán giới hạn biên (Bounding Clamping) ngăn nhãn bay ra khỏi khung nhìn `canvas`.
- Áp dụng thuật toán đẩy lệch (Collision Avoidance) khi hai nhãn có nguy cơ đè lên nhau ở các góc nhìn trùng lặp.

---

## 5. Hiệu Năng & Giải Phóng Bộ Nhớ (Memory Management & 60 FPS)
- **Cơ chế Hủy (Disposal Pattern):** Mọi instance của `THREE.BufferGeometry`, `THREE.Material`, và `THREE.Texture` đều được gọi `.dispose()` đầy đủ trong hàm cleanup của `useEffect`.
- **Hủy WebGL Context:** Gọi `renderer.dispose()` và `renderer.forceContextLoss()` khi component unmount, ngăn ngừa rò rỉ VRAM khi học sinh chuyển đổi giữa các tab hình.
- **Tiết kiệm pin:** Tạm dừng vòng lặp render `requestAnimationFrame` khi tab chuyển sang chế độ nền (`document.hidden`).
