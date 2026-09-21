# VIBE CODE PROJECT CONTEXT: GEOMETRY LAB (TOÁN 9)

Tài liệu ngữ cảnh kỹ thuật toàn diện định hình toàn bộ cấu trúc, luồng nghiệp vụ, ranh giới kiến trúc và quy chuẩn phát triển cho dự án **GEOMETRY LAB – Phòng Thí Nghiệm Hình Học Toán 9 (Hình Trụ – Hình Nón – Hình Cầu)**.

---

## 1. Project Purpose (Mục đích dự án)
- Cung cấp một phòng thí nghiệm học tập số học trực quan, đa giác quan và chuẩn mực sư phạm dành riêng cho chương trình Hình học Không gian Lớp 9 (Chương IV: Hình Trụ – Hình Nón – Hình Cầu).
- Kết hợp đa phương pháp:
  1. Mô hình không gian 3D tương tác thời gian thực (xoay, bổ dọc, trải phẳng lưới khai triển, tạo hình tròn xoay, thí nghiệm rót nước định luật Archimedes).
  2. Video bài giảng lý thuyết chuẩn do giáo viên biên soạn, tích hợp trích dẫn định lý và nhảy mốc thời gian.
  3. Ngân hàng câu hỏi trắc nghiệm phân hóa 4 mức độ nhận thức (NB, TH, VD, VDC) với công thức KaTeX chuẩn mực.
  4. Gia sư trí tuệ nhân tạo (AI Tutor) định hướng gợi mở sư phạm Socratic chạy server-side bằng Gemini 2.5 Flash.
  5. Mini-game "Hình Học 9 Master" kết hợp giải đố hình học với nhịp độ thi đấu arcade nhẹ nhàng, cuốn hút.
  6. Không gian sáng tạo thực tế (STEM): tối ưu thể tích vỏ lon, tính diện tích làm nón lá, giải mã nghịch lý thể tích.

---

## 2. Target Users (Đối tượng người dùng)
1. **Học sinh lớp 9 (9A2, 9A3,...):**
   - Độ tuổi 14–15, chuẩn bị thi vào lớp 10 THPT.
   - Nhu cầu: Trực quan hóa hình học không gian, hiểu bản chất công thức tính diện tích xung quanh, toàn phần và thể tích; luyện đề và sửa lỗi sai thường gặp.
2. **Giáo viên Toán (Teacher - ThS. Trần Ngọc Hiếu):**
   - Quản lý học liệu số, tải lên và duyệt video bài giảng thực tế cho từng hình học.
   - Quản lý danh sách tài khoản học sinh, cấp phát mật khẩu ban đầu, xuất thẻ thông tin đăng nhập.
   - Giám sát tiến độ học tập, ma trận điểm số, mức độ yếu kém theo từng đơn vị kiến thức.

---

## 3. Teacher Identity & Management (Giáo viên)
- **Tài khoản duy nhất (Single Teacher Policy):**
  - Username: `hieu1say`
  - Tên hiển thị: `ThS. Trần Ngọc Hiếu`
  - Đơn vị: `Trường Phổ Thông Thực Hành Sư Phạm`
  - Email: `tranngochieu.toan9@longduc.edu.vn`
- **Thẩm quyền của Giáo viên:**
  - Tải lên video bài học (MP4, WebM), tạo thumbnail, gán video cho từng khối hình (`cylinder`, `cone`, `sphere`).
  - Quản lý vòng đời học sinh: Tạo học sinh tự động từ họ tên và lớp, đổi mật khẩu, khóa/mở khóa tài khoản, xuất file danh sách.
  - Theo dõi ma trận năng lực không gian của từng học sinh (Spatial Thinking Profile).

---

## 4. Student Identity & Role (Học sinh)
- **Danh sách mẫu mặc định:**
  - `std-001` - `demo9a2`: Trần Quốc Anh (Lớp 9A2)
  - `std-002` - `maianh9a2`: Lê Mai Anh (Lớp 9A2)
  - `std-003` - `hoangnam9a2`: Nguyễn Hoàng Nam (Lớp 9A2)
  - `std-004` - `duc9a2`: Phạm Minh Đức (Lớp 9A2 - trạng thái LOCKED)
  - `std-005` - `trang9a2`: Vũ Quỳnh Trang (Lớp 9A2)
  - `std-006` - `thu9a3`: Phạm Thị Anh Thư (Lớp 9A3 - trạng thái PENDING)
- **Quyền hạn học sinh:**
  - Được phép: Xem lý thuyết, tương tác 3D, xem video đã xuất bản (`PUBLISHED`), làm bài tập luyện tập, làm đề thi thử, hỏi AI Tutor, chơi mini-game, đổi mật khẩu cá nhân.
  - Bị cấm tuyệt đối: Gọi các API quản trị `/api/teacher/*`, upload/xóa video, xem video ở trạng thái `DRAFT` hoặc `ARCHIVED`.

---

## 5. Authentication Architecture (Xác thực & Phiên làm việc)
- **Kiến trúc phiên song song độc lập (Dual Isolated Sessions):**
  - `StudentSession` và `TeacherSession` được quản lý độc lập tại `src/context/AuthContext.tsx`.
  - Cổng điều phối giao diện: `src/components/auth/AuthGate.tsx`. Khi chưa đăng nhập (`UNAUTHENTICATED`), ứng dụng hiển thị `LoginPage.tsx`, hoàn toàn cách ly và không nạp giao diện chính.
- **Xác thực mã hóa Server-Side:**
  - Endpoint: `POST /api/auth/token`.
  - Thuật toán: HMAC-SHA256 ký token với khóa bí mật `SERVER_AUTH_SECRET`.
  - Truyền tải token: Header `Authorization: Bearer <token>` hoặc Cookie `edu_session_token` (cho phép thẻ HTML5 `<video>` và `<img>` truyền token khi stream media).

---

## 6. Functional Modules (Các phân hệ chức năng)
1. **Trang chủ (`/home`):** Lộ trình học tập cá nhân hóa, thẻ truy cập nhanh 3 khối hình, thống kê nhanh cấp độ và chuỗi ngày học.
2. **Khám phá 3D (`/explore`, `/cylinder`, `/cone`, `/sphere`):** Phòng thí nghiệm không gian Three.js đa chiều.
3. **Lý thuyết bài giảng (`/theory`):** Cây kiến thức tổng quan, trình phát video bài giảng chuyên sâu kèm trích dẫn thời gian và công thức toán học.
4. **Luyện tập trắc nghiệm (`/practice`):** Đề luyện tập phân tầng với giải thích sư phạm từng bước.
5. **Luyện thi vào 10 (`/exam-prep`):** Các đề thi tổng hợp hình nón, trụ, cầu theo cấu trúc đề thi tuyển sinh vào lớp 10 THPT.
6. **Ứng dụng thực tiễn STEM (`/real-world`):** Các phòng thực nghiệm mô phỏng giải quyết bài toán đời sống.
7. **Gia sư AI (`/ai`):** Trợ lý hỗ trợ giải toán và gợi mở tư duy Socratic.
8. **Game Đấu Trường Hình Học (`/game`):** Mini-game Flappy Bird kết hợp giải đố công thức và Boss Casio FX-580.
9. **Thành tích & Huy hiệu (`/achievements`):** Gamification với hệ thống cấp bậc và huy hiệu học tập.
10. **Bảng điều khiển Giáo viên (`/teacher-dashboard`):** Quản lý học sinh, kiểm duyệt video, thống kê phổ điểm.
11. **Cài đặt (`/settings`):** Tùy biến giao diện, âm thanh, phương thức hiển thị công thức.

---

## 7. Question Bank Subsystem (Ngân hàng câu hỏi)
- **Tập tin dữ liệu:** `src/data/masterQuestionBank.json`.
- **Quy mô:** 72 câu hỏi trắc nghiệm 4 lựa chọn (A, B, C, D) chuẩn hóa từ tài liệu học tập Toán 9.
- **Phân loại độ khó:**
  - `NB` (Nhận biết): Nhận diện bán kính đáy, đường cao, đường sinh, công thức cơ bản.
  - `TH` (Thông hiểu): Tính toán trực tiếp diện tích, thể tích khi biết các yếu tố.
  - `VD` (Vận dụng): Bài toán đảo, tìm bán kính khi biết thể tích, tính chi phí vật liệu.
  - `VDC` (Vận dụng cao): Bài toán tối ưu hóa, hình khối kết hợp, bài toán rỗng/đặc phức tạp.
- **Tính toàn vẹn:** 100% câu hỏi có lời giải từng bước (`explanation`), công thức toán học định dạng LaTeX chuẩn.

---

## 8. 3D Visualization Subsystem (Đồ họa Three.js)
- **Thư viện:** Three.js (`three@^0.174.0`).
- **Container điều khiển:** `src/components/explore/ThreeDViewer.tsx`.
- **Tính năng nổi bật:**
  - Mô phỏng quay hình phẳng 360° tạo khối tròn xoay (`RevolvingGenerator.tsx`).
  - Cắt bổ mặt cắt ngang / dọc (Cross-section view).
  - Trải phẳng bề mặt tạo lưới khai triển 2D (`CylinderNet`, `ConeNet`).
  - Thí nghiệm đong nước Archimedes chứng minh thể tích hình nón bằng 1/3 hình trụ có cùng đáy và chiều cao (`LiquidSimulation.tsx`).
- **Quản lý bộ nhớ:** Giải phóng đầy đủ `geometry.dispose()`, `material.dispose()`, hủy `requestAnimationFrame` khi unmount component.

---

## 9. STEM & Real-World Lab (Ứng dụng thực tế)
- Phân tích và thực nghiệm 4 chủ đề:
  1. *CanOptimizationSandbox:* Tối ưu kích thước vỏ lon nước ngọt hình trụ để tiết kiệm nhôm với thể tích $330\text{ ml}$ cố định ($h = 2r$).
  2. *ConicalHatCraftSandbox:* Tính toán diện tích lá cọ và góc mở nan tre khi làm nón lá làng Chuông.
  3. *VolumeParadoxLab:* Thí nghiệm nước dâng khi thả quả cầu kim loại vào bình trụ.
  4. *ArchimedesTrinityComparator:* So sánh tỷ lệ thể tích và diện tích $1 : 2 : 3$ của Nón, Cầu và Trụ ngoại tiếp.

---

## 10. AI Tutor Subsystem (Gia sư thông minh)
- **Engine:** Google Gemini 2.5 Flash (`gemini-2.5-flash`).
- **Kiến trúc bảo mật:** 100% chạy trên Server-side (`server/smartTutorEngine.ts` và `server.ts`). Client tuyệt đối không giữ khóa `GEMINI_API_KEY`.
- **Phương pháp sư phạm Socratic:** Không đưa ngay đáp án cuối cùng. Chia nhỏ câu hỏi, gợi ý học sinh nhận diện hình dạng, nhớ lại công thức liên quan và tự tính toán.

---

## 11. Game Subsystem (Đấu Trường Hình Học)
- **File thành phần:** `src/components/game/GameCanvas.tsx`, `QuestionModal.tsx`, `gameConfig.ts`, `soundEffects.ts`.
- **Gameplay:**
  - Giai đoạn 1: Điều khiển khối hình bay qua các cổng chướng ngại vật hình học.
  - Giai đoạn 2: Cổng tri thức dừng lại, mở modal trắc nghiệm nhanh. Trả lời đúng nhận điểm thưởng và đạn năng lượng; trả lời sai mất 1 tim.
  - Giai đoạn 3: Đấu Boss Casio FX-580 với các câu hỏi thời gian thực.
- **Yêu cầu kỹ thuật:** Vòng lặp Canvas **bắt buộc** phải sử dụng biến số `deltaTime` để đảm bảo tốc độ ổn định 60FPS trên mọi màn hình từ 60Hz đến 144Hz.

---

## 12. Video Subsystem (Video bài giảng số)
- **Chính sách Zero-Fake Video:** Không tạo video giả lập bằng Canvas hay hình động. Chỉ hiển thị video MP4/WebM thực tế có bản quyền sư phạm.
- **Streaming chuẩn:** Hỗ trợ HTTP 206 (Partial Content) cho phép tua video lập tức mà không cần tải toàn bộ.
- **Chương mục & Trích dẫn:** Mỗi video hỗ trợ mốc thời gian (Chapters) và trích dẫn lý thuyết (Citations) tương tác trực tiếp trên màn hình xem.

---

## 13. Database Architecture (Cơ sở dữ liệu)
- **Hiện tại:** Sử dụng file JSON phẳng trên server (`server/data/*.json`) và `localStorage` trên trình duyệt.
- **Ranh giới dữ liệu:**
  - Video metadata & gán hình: `server/data/theory_videos.json`, `shape_video_assignments.json`.
  - Tiến độ học sinh server-side: `server/data/student_progress.json`.
  - Danh sách học sinh & phiên cục bộ: `localStorage` phía client.
- **Lưu ý:** Trên môi trường serverless (Vercel), hệ thống tập tin cục bộ là read-only/ephemeral.

---

## 14. Storage Architecture (Lưu trữ tập tin)
- **Local Dev / Container:** Lưu trữ trực tiếp trên đĩa tại `/uploads/videos`, `/uploads/thumbnails`, `/uploads/teacher`.
- **Vercel Cloud Storage:** Tích hợp `@vercel/blob` thông qua biến môi trường `BLOB_READ_WRITE_TOKEN` cho phép upload trực tiếp từ client lên CDN.

---

## 15. Deployment Architecture (Triển khai hệ thống)
- **Nền tảng mục tiêu 1:** Google Cloud Run (Container chuẩn với port 3000, host 0.0.0.0, long-running Node process).
- **Nền tảng mục tiêu 2:** Vercel Serverless (cấu hình qua `vercel.json` và `api/index.ts`).

---

## 16. Security Rules (Quy tắc an ninh)
1. **Không tin cậy Role từ Client:** Không sử dụng header tự chế như `x-user-role` mà không có chữ ký số.
2. **Ký số HMAC bắt buộc:** Mọi thao tác quản trị của giáo viên phải được xác thực bằng token HMAC-SHA256 hoặc xác minh mật khẩu/hash trực tiếp trên server.
3. **Bảo vệ nội dung media:** File video của giáo viên trong `/uploads/teacher/` chỉ cho phép học sinh truy cập khi video đã được xuất bản (`PUBLISHED`).

---

## 17. Math Rendering Guidelines (Hiển thị công thức toán học)
- **Công nghệ duy nhất:** `katex` (v0.16.21). Tuyệt đối **KHÔNG** sử dụng `MathJax`.
- **Quy tắc render:** Luôn bọc trong `<MathText text={...} />` hoặc `<MathFormula formula={...} />`.
- **Chống rò rỉ mã thô:** Mọi chuỗi chứa `\frac`, `\pi`, `r^2`, `\sqrt` đều phải qua bộ lọc chuẩn hóa regex trước khi mount vào DOM.

---

## 18. Responsive Design (Thiết kế đáp ứng)
- Thiết kế thích ứng từ màn hình di động nhỏ (360px), tablet (iPad 768px - 1024px) đến desktop (1280px - 1920px).
- Bảng công thức và SVG hình học phải có thanh trượt ngang `overflow-x-auto` trên mobile để tránh vỡ giao diện.
- Nút bấm và vùng chạm cảm ứng trên màn hình cảm ứng đạt tối thiểu 44px × 44px.

---

## 19. Accessibility (Khả năng tiếp cận)
- Đảm bảo độ tương phản màu sắc đạt chuẩn WCAG AA (tỷ lệ tương phản tối thiểu 4.5:1 cho văn bản thường).
- Toàn bộ các nút bấm và icon tương tác phải có thuộc tính `aria-label` hoặc `title` rõ ràng.

---

## 20. Performance (Hiệu năng)
- Three.js: Tận dụng `ResizeObserver` cho canvas, bật `powerPreference: "high-performance"`, chỉ render lại khi có chuyển động hoặc tương tác xoay.
- Canvas Game: Vòng lặp `requestAnimationFrame` phải tính toán dựa trên `deltaTime` thực tế thay vì cộng số nguyên cố định.

---

## 21. Rules for Modifying Code (Quy tắc sửa đổi mã nguồn)
1. **Tuyệt đối không xóa logic sẵn có:** Mọi sửa đổi phải mang tính kế thừa, giữ nguyên các tính năng hiện hữu và tương thích ngược.
2. **Không tự bịa dữ liệu giả lập:** Tuân thủ triệt để chính sách Zero-Fake Data.
3. **Phân tách trách nhiệm rõ ràng:** Logic UI trong `/src/components` và `/src/views`, logic trạng thái trong `/src/context`, giao tiếp mạng trong `/src/services`, logic xử lý dữ liệu và bảo mật trong `/server`.
4. **Kiểm tra biên dịch sau mỗi thay đổi:** Luôn chạy kiểm tra linter (`npm run lint`) và build (`compile_applet`) trước khi hoàn tất nhiệm vụ.
