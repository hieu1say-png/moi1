# KẾ HOẠCH TRIỂN KHAI TOÀN DIỆN DỰ ÁN GEOMETRY LAB (SPRINT 1 - 13)

## 1. Mục tiêu & Nguyên tắc Cốt lõi
- **Mục tiêu:** Xây dựng nền tảng học Toán Hình học Không gian Lớp 9 (Hình Trụ, Hình Nón, Hình Cầu) theo chuẩn GDPT 2018 kết hợp 3D Interactive Learning, Geo AI Tutor, STEM và Gamification.
- **Phong cách:** 3D Pixar Education + Cute Pixel Art + Modern SaaS.
- **Nguyên tắc kỹ thuật:**
  1. Không sửa vội vã, luôn đọc hiểu logic trước khi thay đổi.
  2. Giữ vững tính toàn vẹn của kiến trúc (Authentication HMAC-SHA256, Dual Role RBAC).
  3. Tuyệt đối không tạo dữ liệu giả (video thật 100%, câu hỏi và công thức thật).
  4. Chuẩn hóa TypeScript Strict, Clean Architecture, không duplicate, không mã lỗi.

---

## 2. Lộ trình Triển khai Chi tiết Từng Sprint

### 📌 SPRINT 1: THIẾT KẾ KIẾN TRÚC MỚI (GEOMETRY LAB ARCHITECTURE)
- **Mục tiêu:** Xây dựng sơ đồ kiến trúc hệ thống phân tầng hoàn chỉnh (`ARCHITECTURE DIAGRAM`).
- **Phạm vi thực hiện:**
  - **Frontend Layer:** `components/`, `pages/`, `hooks/`, `store/`, `services/`, `design-system/`.
  - **Backend Layer:** Express REST API, Serverless Router (`/api`), HMAC Authentication Token, Gemini Smart Tutor Engine.
  - **Data & Storage Layer:** Relational Data Model, Vercel Blob Direct Client Upload, Static Video Assets.
- **Output:** Sơ đồ kiến trúc kỹ thuật đa tầng và báo cáo cấu trúc Sprint 1.

### 📌 SPRINT 2: DATABASE DESIGN & RELATIONAL SCHEMA
- **Mục tiêu:** Thiết kế và định nghĩa schema cơ sở dữ liệu hoàn chỉnh có khóa chính (PK), khóa ngoại (FK), Index và ràng buộc quan hệ:
  - `User`, `Student`, `Teacher`
  - `Lesson`, `Video` (URL, status, chapters, citations)
  - `GeometryModel` (shape, dimensions, nets, formulas)
  - `Formula` (LaTeX canon, explanations, variables)
  - `Exercise` (level M1-M5, question, options, hint, step-by-step solution)
  - `Progress` (studentId, completedLessons, score, accuracy, timestamp)
  - `Achievement` (badges, xp, streak, rank)
  - `AIConversation` (sessionId, studentId, messages, misconceptions)
- **Output:** Tệp `src/types/database.ts` và `DATABASE SCHEMA` chuẩn mực.

### 📌 SPRINT 3: DESIGN SYSTEM (3D PIXAR + CUTE PIXEL + MODERN SAAS)
- **Mục tiêu:** Chuẩn hóa Design System đồng nhất toàn bộ ứng dụng.
- **Phạm vi thực hiện:**
  - `colors.ts`: Bảng màu giáo dục dịu mắt (Education Blue, Learning Green, Discovery Yellow, Soft White, Deep Space).
  - `typography.ts`: Be Vietnam Pro / Inter + KaTeX Math typography.
  - `spacing.ts`: Chuẩn 4px - 8px - 12px - 16px - 24px - 32px - 48px.
  - Components chuẩn hóa: `Button.tsx`, `Card.tsx`, `Badge.tsx`, `FormulaBox.tsx`, `Modal.tsx`.
- **Output:** Thư viện `src/design-system/` dùng chung không style rời rạc.

### 📌 SPRINT 4: STUDENT EXPERIENCE (STUDENT DASHBOARD & GAME JOURNEY)
- **Mục tiêu:** Xây dựng Dashboard học sinh phong cách Game hóa trực quan.
- **Phạm vi thực hiện:**
  - Learning Journey Map: Lộ trình khám phá Hình Trụ $\to$ Hình Nón $\to$ Hình Cầu $\to$ Master Geometry.
  - Today Mission, Streak, Level Card, XP Progress Bar.
  - 3D Preview thẻ bài học tương tác.

### 📌 SPRINT 5: 3D GEOMETRY ENGINE (CYLINDER, CONE, SPHERE)
- **Mục tiêu:** Nâng cấp phòng thí nghiệm 3D với Three.js & React Three Fiber.
- **Phạm vi thực hiện:**
  - `CylinderModel.tsx`: Xoay, thu phóng, đo đạc, khai triển thành 2 hình tròn đáy + 1 hình chữ nhật.
  - `ConeModel.tsx`: Animation sinh hình nón khi quay tam giác vuông quanh trục $360^\circ$, khai triển mặt xung quanh thành hình quạt tròn.
  - `SphereModel.tsx`: Cắt mặt phẳng qua tâm, quan sát đường kính, bán kính và mặt cắt đường tròn lớn.
  - Dynamic Slider: Kéo bán kính $r$, chiều cao $h$ làm mô hình thay đổi thời gian thực kèm tính toán thể tích và diện tích.

### 📌 SPRINT 6: SMART VIDEO LEARNING SYSTEM
- **Mục tiêu:** Hoàn thiện phòng học video đa góc nhìn (Zero-Fake Policy).
- **Phạm vi thực hiện:**
  - Tích hợp 3 video bài giảng chuẩn: `trụ.mp4`, `nón.mp4`, `cầu.mp4`.
  - Đường ống Vercel Blob Direct Client Upload an toàn tuyệt đối.
  - Player đồng bộ: Video (trái) + Mô hình 3D (phải) + Thẻ công thức + Mốc chương Timeline (Chapters).
  - Tương tác Video Quiz: Câu hỏi nhanh xuất hiện theo mốc thời gian bài giảng.

### 📌 SPRINT 7: MATH FORMULA ENGINE (KATEX ENGINE)
- **Mục tiêu:** Đồng bộ hiển thị công thức chuẩn sách giáo khoa $V = \pi r^2 h$, $V = \frac{1}{3}\pi r^2 h$, $V = \frac{4}{3}\pi r^3$.
- **Phạm vi thực hiện:**
  - Áp dụng `MathFormula.tsx` và `MathText.tsx` trên toàn bộ Bài học, Bài tập, Game, và AI Tutor.
  - Chống tràn text trên thiết bị di động, chuẩn hóa ký hiệu toán học $S_{xq}, S_{tp}, V$.

### 📌 SPRINT 8: GEO AI MENTOR (SOCRATIC PEDAGOGICAL TUTOR)
- **Mục tiêu:** Trợ lý thông minh Robot Geo hướng dẫn học sinh phương pháp tư duy.
- **Phạm vi thực hiện:**
  - Chế độ gợi mở (không giải bài thay), phát hiện nhầm lẫn đường kính $d$ và bán kính $r$.
  - Trực quan hóa gợi ý 3D và định dạng LaTeX từng bước.

### 📌 SPRINT 9: GAMIFICATION SYSTEM
- **Mục tiêu:** Cơ chế tính điểm XP, cấp độ (Level 1-5), bộ 12 huy hiệu, Daily Missions và thử thách thực tế (VD: Bể nước hình trụ).
- **Phạm vi thực hiện:** Lưu trữ tiến trình thực tế, hiệu ứng ăn mừng nhẹ nhàng.

### 📌 SPRINT 10: TEACHER DASHBOARD & SPATIAL PROFILE
- **Mục tiêu:** Bảng điều khiển quản lý lớp học Toán cho Giáo viên.
- **Phạm vi thực hiện:**
  - Quản lý học sinh, thống kê lỗi sai thường gặp, đánh giá 5 cấp độ mô hình hóa M1-M5.
  - Giao bài tập, quản lý xuất bản video bài học (Publish / Unpublish).

### 📌 SPRINT 11: ANIMATION SYSTEM (FRAMER MOTION)
- **Mục tiêu:** Tối ưu hiệu ứng chuyển trang, lật mở thẻ bài học mượt mà 60fps trên mobile.

### 📌 SPRINT 12: TESTING & CROSS-DEVICE AUDIT
- **Mục tiêu:** Kiểm thử chức năng, bảo mật và responsive trên 375px, 390px, 768px, 1024px, 1440px.

### 📌 SPRINT 13: PRODUCTION DEPLOY & VERIFICATION
- **Mục tiêu:** Kiểm tra môi trường Production, biến môi trường, build sạch 100% không cảnh báo lỗi.

---

## 3. Quy chuẩn Báo cáo sau mỗi Sprint
Mỗi sprint sẽ được báo cáo đầy đủ theo 6 mục:
- `## STATUS`
- `## FILE CHANGED`
- `## IMPLEMENTATION`
- `## TEST`
- `## RISK`
- `## NEXT STEP`
