# BÁO CÁO KIỂM ĐỊNH MÔ HÌNH HÓA TOÁN HỌC STEM (STEM MODELING AUDIT)
**Dự án:** Geometry Lab Toán 9  
**Tài liệu:** `/ARTIFACTS/STEM_MODELING_AUDIT.md`  
**Mục tiêu:** Kiểm tra chu trình mô hình hóa toán học theo chuẩn giáo dục STEM (Problem $\to$ Model $\to$ Solve $\to$ Verify $\to$ Present)

---

## 1. Chu Trình 5 Bước Mô Hình Hóa STEM
Mỗi tình huống thực tế trong `src/views/RealWorldView.tsx` và `src/data/geometryData.ts` đều được tổ chức theo cấu trúc chuẩn:
1. **Problem (Đặt vấn đề thực tế):** Xuất phát từ một bài toán đời sống cụ thể của kỹ sư, nghệ nhân hoặc người tiêu dùng (ví dụ: cần bao nhiêu tấm inox để dập bồn nước, làm sao tối ưu hóa lượng nhôm sản xuất lon nước ngọt).
2. **Model (Mô hình hóa hình học):** Chuyển hóa vật thể thực tế thành khối hình học lý tưởng (Hình trụ, Hình nón, hoặc Hình cầu) và xác định các tham số đầu vào ($r, h, l, R, V$).
3. **Solve (Giải toán bằng công thức):** Vận dụng công thức diện tích xung quanh, toàn phần và thể tích để tính toán giá trị mong muốn.
4. **Verify (Kiểm chứng sai số & dung sai thực tế):** Nhập đáp án tính toán vào hệ thống; hệ thống kiểm tra đối chiếu với khoảng giá trị chấp nhận được (Acceptable Tolerance $\pm 2\%$) có tính đến các yếu tố thực tế như mối hàn, nếp gấp mép lá.
5. **Present (Trình bày & Ý nghĩa ứng dụng):** Hiển thị nhận xét chuyên môn, ý nghĩa kỹ thuật và bài học kinh nghiệm trong sản xuất công nghiệp.

---

## 2. Kiểm Định Chi Tiết Các Tình Huống Thực Tế

### A. Tối Ưu Hóa Lon Nước Ngọt Nhôm 330ml (`CanOptimizationSandbox.tsx`)
- **Vấn đề kỹ thuật:** Để chứa đúng dung tích $V = 330\text{ ml} = 330\text{ cm}^3$, nhà sản xuất cần chọn kích thước bán kính $r$ và chiều cao $h$ như thế nào để diện tích vỏ nhôm $S_{tp}$ nhỏ nhất nhằm tiết kiệm chi phí nguyên liệu?
- **Ràng buộc thực tế:** $r \in [2.5\text{ cm}, 4.0\text{ cm}]$, tỷ lệ cầm nắm vừa tay người tiêu dùng.
- **Toán học tối ưu:**
  $$S_{tp}(r) = 2\pi r^2 + \frac{2V}{r} \implies S'_{tp}(r) = 4\pi r - \frac{2V}{r^2} = 0 \implies h = 2r$$
  Lon tối ưu toán học có chiều cao bằng đường kính đáy!

### B. Chế Tác Nón Lá Truyền Thống Xứ Huế (`ConicalHatCraftSandbox.tsx`)
- **Vấn đề thủ công mỹ nghệ:** Nghệ nhân cần cắt nan tre và lá găng có kích thước như thế nào để chằm thành chiếc nón lá có đường kính vành $40\text{ cm}$ ($r = 20\text{ cm}$) và chiều cao $h = 30\text{ cm}$?
- **Mô hình nón:**
  - Đường sinh $l = \sqrt{r^2 + h^2} = \sqrt{20^2 + 30^2} \approx 36.06\text{ cm}$.
  - Diện tích lá cần phủ: $S_{xq} = \pi rl \approx 2265.7\text{ cm}^2$.
  - Góc quạt khai triển $\theta = \frac{r}{l} \times 360^\circ \approx 200^\circ$.

### C. Bồn Nước Inox Gia Đình 1000L (`rw-bon-nuoc`)
- **Vấn đề gia dụng:** Tính diện tích tôn inox SUS304 cần dùng để gia công một bồn nước hình trụ có dung tích chứa $1.0\text{ m}^3$ với đường kính $d = 0.9\text{ m}$.
- **Ràng buộc kỹ thuật:** Bổ sung $8\%$ diện tích dập gân tăng cứng và mép hàn lượn sóng.

### D. Quả Bóng Đá Tiêu Chuẩn FIFA Size 5 (`rw-bong-da`)
- **Vấn đề thể thao:** Quả bóng đá có chu vi vòng tròn lớn $C = 68.5\text{ cm}$. Tính diện tích da bề mặt và thể tích khí nén cần bơm vào bóng.
- **Mô hình cầu:** Bán kính $R = \frac{C}{2\pi} \approx 10.9\text{ cm} \implies V = \frac{4}{3}\pi R^3 \approx 5424\text{ cm}^3$.

---

## 3. Đánh Giá Giá Trị Giáo Dục STEM
- Hệ thống giúp học sinh xóa bỏ định kiến "hình học không gian chỉ là lý thuyết trừu tượng".
- Học sinh hiểu được mối liên kết hữu cơ giữa Toán học (Math) - Khoa học vật liệu (Science) - Kỹ thuật chế tạo (Engineering).
