# BÁO CÁO KIỂM ĐỊNH BỘ KÝ HIỆU & HIỂN THỊ TOÁN HỌC (MATH RENDERER AUDIT)
**Dự án:** Geometry Lab Toán 9 (Hình Học Tròn Xoay)  
**Tài liệu:** `/ARTIFACTS/MATH_RENDERER_AUDIT.md`  
**Chỉ thị:** Đảm bảo hiển thị toán học nhất quán (KaTeX). Tuyệt đối không để lộ mã nguồn LaTeX thô (raw LaTeX text) ra giao diện người dùng.

---

## 1. Kiến Trúc Bộ Render Toán Học (KaTeX Engine)
Trong toàn bộ hệ thống Geometry Lab, việc hiển thị công thức toán được chuẩn hóa tập trung thông qua module `src/components/common/MathFormula.tsx`:
- **Thư viện lõi:** `KaTeX` bản mới nhất với cấu hình `strict: false`, `trust: true`, `throwOnError: false`, xuất đầu ra kép `htmlAndMathml`.
- **Thành phần giao diện chính:**
  - `<MathFormula formula="..." displayMode={...} />`: Dùng cho các công thức độc lập, căn giữa hoặc hiển thị trong hộp công thức.
  - `<MathText text="..." />`: Dùng cho văn bản hỗn hợp (đề bài, câu trả lời, lời giải chi tiết, gợi ý của AI Tutor), tự động nhận diện và chuyển đổi cả khối toán lẫn văn bản tự nhiên tiếng Việt.

---

## 2. Chuỗi Tiền Xử Lý & Chuẩn Hóa Công Thức (Math Normalization Pipeline)
Hàm `normalizeFormula()` và `normalizeMathText()` tự động chuyển đổi các dạng ký hiệu thông dụng của giáo viên thành mã LaTeX chuẩn mực trước khi render:
1. **Ký hiệu diện tích & thể tích chuyên ngành:**
   - `Sxq` $\to$ `S_{xq}` (Diện tích xung quanh)
   - `Stp` $\to$ `S_{tp}` (Diện tích toàn phần)
   - `Sđáy` $\to$ `S_{\text{đáy}}`
   - `V_nón` $\to$ `V_{\text{nón}}`, `V_trụ` $\to$ `V_{\text{trụ}}`, `V_cầu` $\to$ `V_{\text{cầu}}`
2. **Ký hiệu phân số & căn bậc hai viết tắt:**
   - `1/3` $\to$ `\frac{1}{3}`, `4/3` $\to$ `\frac{4}{3}`, `1/2` $\to$ `\frac{1}{2}`
   - `\frac13` $\to$ `\frac{1}{3}`
   - `\sqrt x` $\to$ `\sqrt{x}`
3. **Ký hiệu đơn vị đo lường:**
   - `cm^3` $\to$ `\text{cm}^3`, `cm^2` $\to$ `\text{cm}^2`
   - `m^3` $\to$ `\text{m}^3`, `dm^3` $\to$ `\text{dm}^3`
4. **Ký tự đặc biệt & an toàn KaTeX:**
   - Thoát dấu phần trăm `%` thành `\%` để tránh lỗi KaTeX coi `%` là chú thích (comment delimiter).
   - Chuẩn hóa dấu nhân: `×` $\to$ `\times`, `·` $\to$ `\cdot`.
   - Chuẩn hóa dấu xấp xỉ: `≈` $\to$ `\approx`.
   - Chuẩn hóa số pi: `π` $\to$ `\pi`.

---

## 3. Quét & Triệt Tiêu Mã LaTeX Thô (Raw LaTeX Prevention)
Giai đoạn tokenize 5 bước trong `parseMixedContent`:
- **Bước 1:** Chuẩn hóa chuỗi bằng `normalizeMathText`.
- **Bước 2:** Nhận diện chuỗi công thức thuần túy (Pure Formula) để render trực tiếp.
- **Bước 3:** Tách chuỗi theo các cặp bao tiêu chuẩn: `$...$`, `$$...$$`, `\[...\]`, `\(...\)`.
- **Bước 4 (Bộ lọc thông minh):** Với các phân đoạn văn bản còn lại, regex `rawLatexRegex` tiếp tục quét tìm bất kỳ lệnh LaTeX trần nào chưa có dấu bao (ví dụ: `\frac{...}{...}`, `\sqrt{...}`, `\pi`, `r^2`, `cm^3`) và tự động chuyển chúng sang token toán học để KaTeX render.
- **Bước 5:** Render React node an toàn, loại bỏ 100% hiện tượng học sinh nhìn thấy chuỗi `\frac` hay `\pi` dạng chữ trần.

---

## 4. Tương Phản Màu Sắc & Kiểu Chữ Học Thuật (Academic Typography & Contrast)
- **Phông chữ:** Quy chuẩn toàn bộ hệ thống toán học trên phông **Times New Roman** chuẩn mực của sách giáo khoa và đề thi toán học Việt Nam.
- **Sửa lỗi tương phản (Contrast Enhancement):** Lớp CSS `.katex` và `.katex-display` trong `index.css` được cấu hình `color: inherit`. Khi hiển thị trong hộp câu hỏi nền tối của game, công thức hiển thị màu sáng rõ nét (`text-slate-100`); khi ở tài liệu trang sách, công thức hiển thị màu mực đen chuẩn (`#0F291E`), bảo đảm chuẩn WCAG AA (>4.5:1).
