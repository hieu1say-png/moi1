# HỆ THỐNG THIẾT KẾ GEOMETRY LAB (DESIGN SYSTEM SPECIFICATION)
**Dự án:** Geometry Lab Toán 9  
**Tài liệu:** `/ARTIFACTS/GEOMETRY_LAB_DESIGN_SYSTEM.md`  
**Đặc tính thẩm mỹ:** Điềm tĩnh (Calm), Chuẩn xác (Precise), Mang tính giáo dục cao (Educational), Hiện đại (Modern), Đáng tin cậy (Trustworthy)

---

## 1. Bảng Màu Ngữ Nghĩa (Semantic Color Tokens)
Hệ thống sử dụng bảng màu kiềm chế với tông xanh dương học thuật (Academic Navy/Blue) kết hợp xanh ngọc hình học (Cyan/Emerald) trên nền sáng dịu:

```css
:root {
  /* Surface & Base */
  --color-bg: #F8FAFC;                 /* Slate 50: Nền nền tảng thanh dịu */
  --color-surface: #FFFFFF;            /* Trắng thuần khiết cho bề mặt thẻ */
  --color-surface-subtle: #F1F5F9;     /* Slate 100: Bề mặt phụ hoặc viền nền */
  
  /* Typography Contrast */
  --color-fg: #0F172A;                 /* Slate 900: Chữ chính tương phản cao */
  --color-muted: #475569;              /* Slate 600: Chữ phụ, hướng dẫn */
  --color-border: #E2E8F0;             /* Slate 200: Đường viền sắc nét 1px */
  --color-border-hover: #CBD5E1;       /* Slate 300: Khi rê chuột */

  /* Semantic Intent */
  --color-primary: #1D4ED8;            /* Blue 700: Hành động chính, định hướng học tập */
  --color-primary-hover: #1E40AF;      /* Blue 800 */
  --color-primary-light: #EFF6FF;      /* Blue 50: Nền badge và highlight */
  --color-primary-foreground: #FFFFFF; /* Màu chữ trên nút chính */

  --color-accent-geom: #0D9488;        /* Teal 600: Nhấn hình học, 3D Lab */
  --color-accent-geom-light: #F0FDFA;  /* Teal 50 */

  /* Feedback States */
  --color-success: #15803D;            /* Green 700: Đáp án đúng, hoàn thành */
  --color-success-light: #F0FDF4;      /* Green 50 */
  --color-warning: #B45309;            /* Amber 700: Nhắc nhở, thời gian sắp hết */
  --color-warning-light: #FFFBEB;      /* Amber 50 */
  --color-error: #B91C1C;              /* Red 700: Đáp án sai, lỗi cảnh báo */
  --color-error-light: #FEF2F2;        /* Red 50 */
}
```

*Nguyên tắc:* Không áp dụng màu nhấn (Accent) bừa bãi. Màu nhấn chỉ dùng để chỉ báo:
1. Hành động tiếp theo (Primary Call-to-Action).
2. Trạng thái lựa chọn hiện hành (Active Tab / Selected Option).
3. Tiến độ học tập (Progress Ring / Bar).
4. Đại lượng hình học trọng tâm ($r, h, l$).

---

## 2. Thang Đo Kiểu Chữ (Semantic Typography Ramp)
Hệ thống phân định ranh giới rõ ràng giữa **Giao diện điều hướng (UI Sans)** và **Nội dung công thức toán học (Math Serif/KaTeX)**:

- **Phông chữ UI:** Phông Sans hiện đại (`Plus Jakarta Sans`, system-ui, -apple-system, sans-serif) tạo cảm giác thoáng đãng, sắc nét trên mọi mật độ điểm ảnh.
- **Phông chữ Toán học:** Times New Roman chuẩn mực giáo khoa thông qua bộ phân giải KaTeX an toàn.

| Cấp Bậc | Kích Thước | Trọng Số (Weight) | Chiều Cao Dòng (Line Height) | Áp Dụng |
| :--- | :---: | :---: | :---: | :--- |
| **display** | $32\text{px} - 36\text{px}$ | 800 (Extrabold) | 1.15 | Tiêu đề chính trang chủ, cổng vào 3D |
| **h1** | $26\text{px} - 28\text{px}$ | 700 (Bold) | 1.25 | Tiêu đề chương, tên bài học lớn |
| **h2** | $20\text{px} - 22\text{px}$ | 700 (Bold) | 1.30 | Tiêu đề phân mục, tên khối hình |
| **h3** | $16\text{px} - 17\text{px}$ | 600 (Semibold) | 1.35 | Tiêu đề bài toán, nhãn thẻ chức năng |
| **body** | $15\text{px} - 16\text{px}$ | 400 (Regular) | 1.60 | Đoạn văn bản mô tả, nội dung câu hỏi |
| **small** | $13\text{px} - 14\text{px}$ | 500 (Medium) | 1.50 | Lời chú thích, đáp án trắc nghiệm, gợi ý |
| **meta** | $11\text{px} - 12\text{px}$ | 600 (Semibold) | 1.40 | Badge, nhãn danh mục, đơn vị đo lường |

---

## 3. Nhịp Điệu Khoảng Cách (Spacing & Container System)
- **Quy tắc lề di động (Mobile Padding):** Lề ngang tối thiểu $24\text{px}$ trên thiết bị di động (`px-6` trên mobile) giúp các thành phần không bị dính sát mép kính.
- **Độ rộng Container chuẩn (Content Max-Width):**
  - Nội dung học tập, bài đọc lý thuyết, bảng câu hỏi: **$1140\text{px} - 1200\text{px}$** căn giữa (`max-w-6xl mx-auto`), tránh trải dài gây mỏi mắt khi đọc.
  - Không gian phòng thí nghiệm 3D (3D Workspace): Mở rộng tới **$1400\text{px}$** để tối ưu hóa góc quan sát mô hình không gian.
- **Nhịp điệu khoảng cách (Spatial Rhythm):**
  - Khoảng cách giữa các phần tử liên quan chặt chẽ: $8\text{px} - 12\text{px}$.
  - Khoảng cách đệm bên trong thẻ (Padding): $16\text{px} - 24\text{px}$.
  - Khoảng cách giữa các phân đoạn lớn (Vertical Separation): $36\text{px} - 48\text{px}$.

---

## 4. Hệ Thống Khung Viền & Bo Góc (Border & Radius Hierarchy)
Hạn chế tối đa việc sử dụng hỗn tạp hàng chục loại bo góc. Quy chuẩn về 3 mức độ hình học:
- **`tile` ($8\text{px}$):** Áp dụng cho các ô nhập liệu (Input), nút bấm nhỏ, badge, thanh cuộn tham số.
- **`card` ($14\text{px}$):** Áp dụng cho toàn bộ các khối nội dung, thẻ bài học, hộp câu hỏi, bảng điều khiển 3D.
- **`pill` ($9999\text{px}$):** Chỉ dành riêng cho chip trạng thái, nút hành động tròn hai đầu, và nhãn tiến độ.

---

## 5. Bóng Đổ & Phân Lớp Không Gian (Shadow & Depth)
- Loại bỏ triệt để các bóng đổ xám đen dày cộm hoặc viền neon phát sáng gây cảm giác đồ chơi (toy-like).
- Ưu tiên sử dụng **viền mảnh 1px (`#E2E8F0`)** kết hợp với sự chênh lệch nền nhẹ nhàng giữa `--color-bg` (`#F8FAFC`) và `--color-surface` (`#FFFFFF`).
- Chỉ dùng bóng mờ siêu nhẹ (Subtle Elevation): `box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05)`.

---

## 6. Chiến Lược Điều Hướng Tinh Gọn (Compact Navigation)
- **Desktop:** Thanh Masthead dạng thanh đơn (Compact Masthead) cố định đỉnh màn hình, cao đúng $58\text{px}$, hiển thị đầy đủ 7 điểm đến trọng tâm kèm icon và nhãn văn bản:
  1. 🏠 **Trang chủ** (`/home`)
  2. 📚 **Lý thuyết** (`/theory`)
  3. 🔬 **Khám phá 3D** (`/explore`)
  4. ✍️ **Luyện tập** (`/practice`)
  5. 🥫 **STEM** (`/real-world`)
  6. 🤖 **AI Tutor** (`/ai`)
  7. 🎓 **Ôn thi vào 10** (`/exam-prep`)
  *(Kèm lối tắt nhanh sang 🎮 Game Hình Học 9 và phân hệ Giáo Viên khi có quyền)*.
- **Loại bỏ sự dư thừa:** Không chồng chéo cùng lúc 3 thanh điều hướng (bỏ thanh Sidebar cồng kềnh chiếm diện tích ngang và bỏ thanh Dock đáy che khuất nội dung).

---

## 7. Động Lực & Tương Tác (Micro-Interactions & Reduced Motion)
- Chuyển trạng thái khi rê chuột: $150\text{ms} - 200\text{ms}$ nhẹ nhàng (`ease-out`).
- Chuyển trang/chuyển tab: $250\text{ms} - 300\text{ms}$ mượt mà.
- Khi người dùng bật `prefers-reduced-motion: reduce`, toàn bộ transition được rút ngắn về $0\text{ms}$, triệt tiêu hiệu ứng lắc lư, bảo đảm môi trường học tập tập trung tối đa.
