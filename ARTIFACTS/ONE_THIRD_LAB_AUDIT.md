# BÁO CÁO KIỂM TOÁN PHÒNG THÍ NGHIỆM NGHỊCH LÝ 1/3 (ONE THIRD LAB AUDIT)
**Dự án:** Geometry Lab Toán 9  
**Tài liệu:** `/ARTIFACTS/ONE_THIRD_LAB_AUDIT.md`  
**Chủ đề:** Module Thực Nghiệm "Nghịch Lý 1/3 — Bí Ẩn Thể Tích Khối Nón & Khối Trụ"

---

## 1. Bản Chất Toán Học & Mục Tiêu Sư Phạm
Trong chương trình Toán 9, công thức thể tích hình nón $V = \frac{1}{3}\pi r^2 h$ thường khiến học sinh bỡ ngỡ: *Tại sao lại có hệ số $\frac{1}{3}$ thay vì $\frac{1}{2}$?*  
Module `VolumeParadoxLab` được xây dựng nhằm giải quyết câu hỏi cốt lõi này bằng phương pháp thực nghiệm khoa học:
- Khối nón và khối trụ được tạo lập với **CÙNG BÁN KÍNH ĐÁY $R$** và **CÙNG CHIỀU CAO $h$**.
- Học sinh tự tay thao tác rót đầy nước từ khối nón vào khối trụ và quan sát hiện tượng vật lý.

---

## 2. Quy Trình Mô Phỏng 3 Lần Rót Nước (3-Stage Pouring Animation)

| Lần Rót | Trạng Thái Bình Nón | Mực Nước Bình Trụ ($h_{\text{trụ}}$) | Thể Tích Tích Lũy ($V_{\text{nước}}$) | Nhận Thức Sư Phạm |
| :---: | :---: | :---: | :---: | :--- |
| **Lần 1** | Rót hết 100% | Dâng lên đúng $\frac{1}{3} h$ | $V_1 = \frac{1}{3} \pi R^2 h$ | Học sinh nhận thấy 1 phễu nón chỉ chiếm một phần đáy của trụ |
| **Lần 2** | Rót tiếp lần thứ 2 | Dâng lên đúng $\frac{2}{3} h$ | $V_2 = \frac{2}{3} \pi R^2 h$ | Trụ đầy thêm một khoảng bằng đúng lần rót đầu tiên |
| **Lần 3** | Rót lần thứ 3 | Đầy tràn miệng $1.0 h$ | $V_3 = 1.0 \pi R^2 h$ | **Khẳng định thực nghiệm:** Cần đúng 3 ca nón để làm đầy 1 ca trụ |

Chuỗi chuyển động (Animation Sequence) bao gồm 9 pha chuyển động mượt mà:
1. `phase1_tilting`: Ca nón nghiêng dần từ góc $0^\circ$ đến $52^\circ$.
2. `phase2_water_movement`: Dòng nước cong (curved fluid stream) xuất phát từ đỉnh/vành nón rơi vào tâm bình trụ.
3. `phase3_flowing`: Meniscus và mặt nước trong bình trụ dâng đều đặn theo tốc độ dòng chảy.
4. `phase4_return`: Ca nón dựng thẳng lại vị trí ban đầu và sẵn sàng cho lần rót tiếp theo.

---

## 3. Tiến Trình Công Thức Động (Step-by-Step Formula Derivation)
Bảng thông số hiển thị trực tiếp bên cạnh thí nghiệm cập nhật động theo các giá trị thực tế của slider $R$ ($0.5 \text{ cm} \to 2.0 \text{ cm}$) và $h$ ($1.0 \text{ cm} \to 4.0 \text{ cm}$):
1. **Thể tích khối trụ:**
   $$V_{\text{trụ}} = S_{\text{đáy}} \cdot h = \pi R^2 h$$
2. **Mối quan hệ thực nghiệm:**
   $$3 \times V_{\text{nón}} = V_{\text{trụ}}$$
3. **Công thức thể tích khối nón tổng quát:**
   $$V_{\text{nón}} = \frac{1}{3} V_{\text{trụ}} = \frac{1}{3} \pi R^2 h$$

---

## 4. Vòng Lặp Sư Phạm Socratic (Pre-Question & Post-Verification)
- **Dự đoán trước thí nghiệm (Pre-Prediction):** Trước khi bấm nút rót, hệ thống yêu cầu học sinh phán đoán: *"Cần bao nhiêu lần rót một ca nón đầy nước để làm đầy bình trụ có cùng đáy và chiều cao?"* (Các lựa chọn: 2 lần, 3 lần, 4 lần).
- **Câu hỏi kiểm tra sau thực nghiệm (`WaterPouringExplanationModal.tsx`):** Sau khi hoàn thành lần rót thứ 3, hệ thống kích hoạt câu hỏi tư duy bản chất:
  - *Tại sao thể tích nón lại bằng 1/3 thể tích trụ?*
  - Học sinh nhận thức được: Khối nón thu hẹp diện tích thiết diện đều đặn từ đáy lên đỉnh theo hàm bậc hai của khoảng cách ($S(z) = \pi r^2 (1 - z/h)^2$), tích phân từ $0$ đến $h$ cho ra đúng hệ số $\frac{1}{3}$.

---

## 5. Đánh Giá Độ Ổn Định & Tương Tác
- Toàn bộ đồ họa dòng chảy và mực nước sử dụng shader trong suốt 3D với hiệu ứng khúc xạ mặt nước.
- Không xảy ra tình trạng rò rỉ bộ nhớ khi học sinh bấm [Thực Hiện Lại] nhiều lần.
- Bộ điều khiển hỗ trợ xem theo 3 góc nhìn: Mặc định (Perspective), Góc nhìn từ trên xuống (Top View) và Góc nhìn ngang mặt cắt (Side Cross-Section).
