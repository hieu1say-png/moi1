# BÁO CÁO TOÀN DIỆN VỀ DỰ ÁN GEOMETRY LAB (PROJECT AUDIT REPORT)

**Tên dự án:** GEOMETRY LAB – PHÒNG THÍ NGHIỆM HÌNH TRỤ – HÌNH NÓN – HÌNH CẦU TOÁN 9  
**Thời gian thực hiện:** Tháng 9/2026  
**Chế độ:** READ-ONLY DISCOVERY (KHÔNG SỬA CODE)  
**Tài liệu tham chiếu:** Toàn bộ source code tại `/src`, `/server`, `/api`, `/public`, `/uploads`, các file cấu hình và tài liệu `/ARTIFACTS`.

---

## A. ARCHITECTURE SUMMARY

### 1. Framework & Runtime
- **Frontend Framework:** React 19 (`19.0.0`), TypeScript (`~5.7.2`), Vite (`^6.2.0`).
- **Styling:** Tailwind CSS (`^4.0.0`) được nạp trực tiếp qua `@import "tailwindcss";` trong `src/index.css`.
- **Backend Framework:** Node.js + Express (`^4.21.2`), chạy TypeScript trực tiếp qua `tsx` trong môi trường dev (`tsx server.ts`).
- **Build & Bundle Pipeline:**
  - Client: `vite build` xuất ra thư mục tĩnh `/dist`.
  - Backend: `esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs`.
  - Start Production: `node dist/server.cjs`.

### 2. Entry Point & Flow Khởi Tạo
- **Client Entry Point:**
  - `index.html`: Nạp Google Fonts, KaTeX stylesheet (`katex@0.16.21/dist/katex.min.css`), định nghĩa thẻ mount `#root`, và gọi script `/src/main.tsx`.
  - `src/main.tsx`: Khởi tạo React 19 root (`createRoot`) và render `<App />`.
  - `src/App.tsx`: Cấu trúc phân cấp các Provider:
    `GlobalErrorBoundary` → `AppleExperienceProvider` → `ToastProvider` → `AuthProvider` → `AuthGate`.
- **Server Entry Point:**
  - Chạy local / container: `server.ts` (khởi tạo Express, gán middleware, route `/api/*`, tích hợp Vite middleware khi ở chế độ dev hoặc serve `/dist` khi ở chế độ production, lắng nghe `0.0.0.0:3000`).
  - Chạy Vercel Serverless: `api/index.ts` (import Express instance từ `server.ts` và export làm serverless handler).

### 3. Router Architecture
- **Cơ chế Router:** Custom State & Hash-based Router (không dùng thư viện `react-router-dom`).
- **File điều phối chính:** `src/context/AppContext.tsx` (quản lý `currentRoute`, hàm `navigateTo(route)`, đồng bộ 2 chiều với `window.location.hash`).
- **Cổng bảo vệ (Gatekeeper):** `src/components/auth/AuthGate.tsx`:
  - Trạng thái `AUTH_LOADING` → hiển thị `SessionLoading.tsx`.
  - Trạng thái `UNAUTHENTICATED` → hiển thị `LoginPage.tsx` (cách ly hoàn toàn, không nạp Header, Sidebar hay Three.js canvas).
  - Trạng thái `STUDENT_AUTHENTICATED` → render `StudentAppLayout.tsx` bao bọc các view học sinh.
  - Trạng thái `TEACHER_AUTHENTICATED` → render `TeacherAppLayout.tsx` (mặc định vào `/teacher-dashboard`, có chế độ Preview dành cho học sinh).
- **Danh sách Routes hỗ trợ (`RouteId`):**
  - Học sinh: `/home`, `/theory`, `/explore`, `/practice`, `/exam-prep`, `/real-world`, `/achievements`, `/ai`, `/game`, `/settings`, `/cylinder`, `/cone`, `/sphere`.
  - Giáo viên: `/teacher-dashboard`, `/settings`.

---

## B. AUTHENTICATION & ROLES

### 1. File liên quan
- `src/context/AuthContext.tsx`: Quản lý song song 2 phiên độc lập (`StudentSession` và `TeacherSession`).
- `src/types/auth.ts`: Khai báo kiểu người dùng, quyền hạn (`ROLE_PERMISSIONS`), trạng thái phiên.
- `src/services/teacherAuthService.ts`: Xử lý đăng nhập giáo viên, gọi API `/api/auth/token`.
- `src/services/teacherStudentService.ts`: Quản lý danh sách học sinh, băm mật khẩu SHA-256 client-side.
- `server/auth.ts`: Middleware xác thực HMAC-SHA256 trên server (`signAuthToken`, `verifyAuthToken`, `requireTeacherAuth`, `requireAuth`).
- `src/components/auth/AuthGate.tsx`, `LoginPage.tsx`, `TeacherLogin.tsx`: UI đăng nhập và điều phối.

### 2. Định danh & Phân quyền Role
- **Vai trò Teacher:**
  - Tài khoản mặc định: Username `hieu1say`, tên `ThS. Trần Ngọc Hiếu`, trường `Trường Phổ Thông Thực Hành Sư Phạm`.
  - Mật khẩu mặc định: Hash SHA-256 `d309aeeae7b4f478cb6101f92b0e99c0987950c16521a755366d5553a22838b4` (tương đương mật khẩu thực tế `Phuongthao0810`).
  - Quyền hạn: Quyền cao nhất (`ROLE_PERMISSIONS.teacher`: toàn quyền xem/tải lên/gán/xóa video, quản lý học sinh, thống kê lớp, reset dữ liệu).
- **Vai trò Student:**
  - Danh sách học sinh ban đầu (`INITIAL_STUDENTS`): 3 học sinh mẫu (`std-001` - `demo9a2`, `std-002` - `maianh9a2`, `std-003` - `hoangnam9a2`) với mật khẩu mặc định `Demo@123`.
  - Quyền hạn: Chỉ xem nội dung lý thuyết, video đã `PUBLISHED`, làm bài tập, chơi game, hỏi AI Tutor; không có quyền gọi API quản trị.

### 3. Vị trí kiểm tra Role (Role Enforcement Points)
1. **Phía Client:**
   - `AuthGate.tsx` (dòng 84–105): Phân tách luồng render giữa giáo viên và học sinh.
   - `AuthContext.tsx` (dòng 850–930): Hàm `hasPermission(permission)` kiểm tra quyền dựa trên `ROLE_PERMISSIONS`.
2. **Phía Backend Server (`server.ts` & `server/auth.ts`):**
   - Middleware `requireTeacherAuth` (`server/auth.ts` dòng 165–185): Kiểm tra token HMAC-SHA256 từ header `Authorization: Bearer <token>` hoặc cookie `edu_session_token`. Nếu `user.role !== 'teacher'`, chặn ngay lập tức với mã HTTP 403 Forbidden.
   - Endpoint bảo vệ bằng `requireTeacherAuth`:
     - `POST /api/theory-videos/upload`
     - `POST /api/theory-videos`
     - `PUT /api/theory-videos/:id`
     - `DELETE /api/theory-videos/:id`
     - `POST /api/theory-videos/assign`
     - `POST /api/theory-videos/reset-defaults`
     - `POST /api/teacher/students`
     - `DELETE /api/teacher/students/:id`
     - `PUT /api/teacher/students/:id/password`
   - Bảo vệ static video files (`server.ts` dòng 202–279): Chặn truy cập trực tiếp file video của giáo viên trong thư mục `/uploads/teacher/` nếu người dùng chưa đăng nhập hoặc không phải là chủ sở hữu / học sinh được phân quyền.

---

## C. DATA & DATABASE REALITY

### 1. Hiện trạng Database thực tế
- **Không sử dụng bất kỳ hệ quản trị cơ sở dữ liệu bên ngoài nào:**
  - **KHÔNG** dùng PostgreSQL / MySQL / Cloud SQL.
  - **KHÔNG** dùng MongoDB.
  - **KHÔNG** dùng SQLite.
  - **KHÔNG** dùng Firebase Firestore (mặc dù có quy ước skill, project không cài SDK hay cấu hình Firebase).
  - **KHÔNG** dùng Supabase (không có package `@supabase/supabase-js`, không có file cấu hình Supabase).
- **Cơ chế lưu trữ dữ liệu thực tế (Data Storage Reality):**
  1. **Server-side JSON Flat Files:**
     - `server/data/theory_videos.json`: Lưu danh sách metadata video bài giảng (18 trường chuẩn).
     - `server/data/shape_video_assignments.json`: Lưu mapping gán video cho 3 khối hình (`cylinder`, `cone`, `sphere`).
     - `server/data/student_errors.json`: Lưu vết lỗi sai của học sinh.
  2. **Client-side Browser LocalStorage:**
     - `geometry_lab_student_session`: Phiên đăng nhập học sinh.
     - `geometry_lab_teacher_session`: Phiên đăng nhập giáo viên.
     - `geometry_lab_student_roster_v3`: Danh sách học sinh lớp 9A2 do giáo viên quản lý.
     - `study_coins_v3`, `study_badges_v3`, `study_leaderboard_v3`: Tiến độ và huy hiệu game.
     - `geometry_lab_app_settings`: Cài đặt giao diện, âm thanh, công thức.

### 2. Nguy cơ Database không Persist (Dữ liệu bị biến mất)
- Khi ứng dụng chạy trên **Vercel Serverless Functions**:
  - File system của Vercel Lambda là **Read-Only** tại thư mục ứng dụng (`/var/task`).
  - Thư mục `/tmp` chỉ là ổ đĩa tạm thời trong RAM/Disk của từng phiên container Lambda.
  - Mỗi khi container Lambda bị hủy (scale to zero sau vài phút không có request) hoặc khi có cold start / deploy code mới, toàn bộ dữ liệu trong `/tmp/geometry_lab/data/*.json` **bị xóa sạch hoàn toàn**.
  - Đây chính là nguyên nhân cốt lõi khiến dữ liệu và video metadata bị biến mất sau khi refresh hoặc sau một thời gian không sử dụng trên môi trường Vercel.

---

## D. STORAGE & FILE SYSTEM REALITY

### 1. Cơ chế lưu file vật lý
- **Môi trường Local / Container (Cloud Run / Node long-running):**
  - File video được lưu trên ổ đĩa cục bộ tại thư mục `/uploads`:
    - `/uploads/videos/`: Chứa các video bài giảng chung.
    - `/uploads/thumbnails/`: Chứa ảnh thumbnail.
    - `/uploads/teacher/<userId>/<videoId>/`: Chứa file video do giáo viên tải lên.
- **Môi trường Vercel Serverless:**
  - Thư mục `uploads/` cục bộ không thể ghi (`EROFS: read-only file system`).
  - Hàm `getStoragePaths()` trong `server/theoryVideoStorage.ts` (dòng 138–176) sẽ fallback ghi vào `/tmp/geometry_lab/uploads`.
  - **Vercel Blob Integration:**
    - Code có tích hợp `@vercel/blob` thông qua biến môi trường `BLOB_READ_WRITE_TOKEN`.
    - `server.ts` cung cấp endpoint `POST /api/theory-videos/vercel-blob-token` để cấp token cho client upload trực tiếp lên Vercel Blob (bỏ qua serverless function).
    - `PersistentTheoryVideoStorage.syncToBlob()` và `syncFromBlob()` thực hiện backup metadata `theory_videos.json` và `shape_video_assignments.json` lên Blob storage.

### 2. Sự thật về video và media
- Hệ thống áp dụng **STRICT ZERO-FAKE POLICY** (`DEFAULT_SEED_VIDEOS = []` tại dòng 212 của `server/theoryVideoStorage.ts`).
- Không có bất kỳ video giả lập hay mock data nào được tự động sinh.
- Các video bài học chỉ hiển thị khi:
  1. Giáo viên tải file video thực tế lên hệ thống (MP4/WebM), HOẶC
  2. File vật lý tồn tại thực tế trên đĩa tại `public/videos/trụ.mp4`, `public/videos/nón.mp4`, `public/videos/cầu.mp4` và được gán chính xác trong assignments.

---

## E. VIDEO SUBSYSTEM DEEP DIVE

### 1. Luồng tải lên (Upload Dataflow: Browser → Upload API → Server → Storage)
Có 2 luồng tải lên độc lập:
1. **Luồng Direct Client Vercel Blob (Khuyên dùng trên Production Vercel):**
   - **Bước 1:** Trình duyệt gọi `POST /api/theory-videos/vercel-blob-token` kèm Authorization Bearer token của giáo viên.
   - **Bước 2:** Server dùng `@vercel/blob` (`generateClientTokenFromReadWriteToken`) tạo token ngắn hạn và trả về cho client.
   - **Bước 3:** Trình duyệt dùng hàm `upload()` của thư viện `@vercel/blob/client` tải file trực tiếp từ máy giáo viên lên Vercel Blob CDN.
   - **Bước 4:** Sau khi tải lên thành công, trình duyệt gọi `POST /api/theory-videos` gửi metadata (bao gồm URL blob công khai) để lưu vào database JSON.
2. **Luồng Server Multipart/Form-data (Dành cho Local Dev & Container):**
   - Trình duyệt gửi request `POST /api/theory-videos/upload` chứa trường `video` (file nhị phân).
   - Middleware `videoUploadMiddleware` (Multer diskStorage) lưu file vào thư mục `/uploads/teacher/<uid>/<videoId>/`.
   - Server ghi nhận metadata và trả về đối tượng video chuẩn 18 trường.

### 2. Luồng phát video (Playback Dataflow: Browser → Video Player)
- Trình duyệt yêu cầu video qua URL `/uploads/...` hoặc `/videos/...`.
- `server.ts` (dòng 202–279) cài đặt tính năng **HTTP Range Requests (HTTP 206 Partial Content)**:
  - Kiểm tra header `req.headers.range` (ví dụ: `bytes=0-1048576`).
  - Mở file stream `fs.createReadStream(filePath, { start, end })`.
  - Phản hồi header: `Content-Range: bytes ${start}-${end}/${fileSize}`, `Accept-Ranges: bytes`, `Content-Length: ${chunkSize}`, `Content-Type: video/mp4`.
  - Cho phép tua (scrubbing), phát trực tiếp tức thì mà không cần chờ tải toàn bộ video dung lượng lớn.
- Phía Client (`src/components/video/TheoryVideoPlayer.tsx`):
  - Sử dụng thẻ HTML5 `<video>` nguyên bản, có hỗ trợ danh sách chương (Chapters), trích dẫn lý thuyết (Citations) tương tác click nhảy mốc thời gian.

### 3. Nguyên nhân gây lỗi Video biến mất & Upload HTTP 500 / 413
1. **Nguyên nhân HTTP 413 (Payload Too Large):**
   - Vercel Serverless Function quy định **giới hạn cứng kích thước body request là 4.5MB**.
   - Nếu client tải file video (thường từ 10MB đến 100MB) trực tiếp qua endpoint `/api/theory-videos/upload` trên Vercel, hạ tầng Edge Proxy của Vercel sẽ tự động ngắt kết nối và trả về mã `HTTP 413 Payload Too Large` trước khi request chạm tới Express backend.
2. **Nguyên nhân HTTP 500 (Internal Server Error):**
   - Trên Vercel Lambda, nếu gọi Multer ghi vào đường dẫn gốc của project (`uploads/`), lỗi hệ thống `EROFS: read-only file system` sẽ kích hoạt và làm sập handler thành 500 nếu không được chuyển hướng sang `/tmp`.
   - Nếu `BLOB_READ_WRITE_TOKEN` không được khai báo trong biến môi trường Vercel, endpoint xin token `/api/theory-videos/vercel-blob-token` sẽ trả về lỗi 503 hoặc 500.
3. **Nguyên nhân Video biến mất sau khi Refresh:**
   - Nếu video upload lưu tạm vào `/tmp` trên Vercel, khi container tái khởi động hoặc người dùng truy cập vào một Lambda instance khác, file trong `/tmp` không còn tồn tại (`FILE_MISSING`).
   - Nếu client lưu đường dẫn dạng `blob:http://...` do hàm `URL.createObjectURL(file)` sinh ra trong RAM trình duyệt, khi người dùng F5 / Refresh trang, đường dẫn Blob tạm này sẽ lập tức mất hiệu lực.

---

## F. GAME SUBSYSTEM DEEP DIVE

### 1. Kiến trúc Game "Hình Học 9 Master"
- **View chính:** `src/views/GeometryMasterGameView.tsx`.
- **Canvas Engine:** `src/components/game/GameCanvas.tsx` (Vẽ 2D 60FPS bằng Canvas API).
- **Cấu hình nhịp độ:** `src/components/game/gameConfig.ts` (`EASY_GAME_CONFIG` và `NORMAL_GAME_CONFIG`).
- **Modal câu hỏi:** `src/components/game/QuestionModal.tsx`.
- **Âm thanh:** `src/components/game/soundEffects.ts` (Tổng hợp Web Audio API thuần, không cần file MP3 bên ngoài).

### 2. Nguyên nhân Game chạy quá nhanh (Game Speed Root Cause)
1. **Hiện tượng phụ thuộc Tần số quét màn hình (Refresh Rate Dependency - No Delta Time):**
   - Trong `GameCanvas.tsx` (dòng 407–408, dòng 461–465):
     ```typescript
     bird.velocity += bird.gravity;
     bird.y += bird.velocity;
     pipe.x -= speed;
     ```
   - Các phép tính vật lý này được gọi trực tiếp bên trong `requestAnimationFrame` **mà không nhân với hệ số thời gian trôi qua `deltaTime` ($\Delta t$)**.
   - **Hậu quả:**
     - Trên màn hình 60Hz: Vòng lặp chạy 60 lần/giây.
     - Trên màn hình 120Hz / 144Hz (như màn hình ProMotion trên iPad Pro, iPhone 13-16 Pro, MacBook Pro, màn hình Gaming): Vòng lặp chạy **120 đến 144 lần/giây**.
     - Chim rơi nhanh gấp **4 lần** (do gia tốc $y \sim \frac{1}{2} g \cdot frames^2$), cột lướt nhanh gấp **2 đến 2.4 lần**, khiến game trở nên cực kỳ nhanh và bất khả thi để điều khiển đối với học sinh.
2. **Cấu hình vật lý gốc (Base Arcade Tuning):**
   - Trước khi tinh chỉnh, tốc độ lướt cột cơ bản là `2.4 px/frame`, khoảng cách sinh cột dồn dập `120 frames` (~2 giây), không có chế độ chậm ("Slow Mode") cho học sinh lớp 9.
3. **Chuyển cảnh câu hỏi quá gấp gáp:**
   - Trong `QuestionModal.tsx`, trước đây thời gian chuyển tiếp sau khi bấm đáp án chỉ có `200ms`. Học sinh chưa kịp nhìn nhận diện kết quả đúng/sai đã bị đóng modal đột ngột.

---

## G. QUESTION BANK & PRACTICE SUBSYSTEM

### 1. Nguồn dữ liệu & Cấu trúc
- **File dữ liệu chính:** `src/data/masterQuestionBank.json`.
- **Số lượng câu hỏi:** 72 câu hỏi trắc nghiệm chuẩn hóa 100% từ tài liệu bài tập Hình học 9.
- **Phân bổ chủ đề (`topic`):**
  - `CYLINDER` (Hình trụ): Khái niệm, diện tích xung quanh, thể tích, bài toán thực tế.
  - `CONE` (Hình nón): Độ dài đường sinh, góc ở đỉnh, diện tích toàn phần, thể tích nón cụt.
  - `SPHERE` (Hình cầu): Diện tích mặt cầu, thể tích khối cầu, bài toán Archimedes.
- **Cấu trúc trường câu hỏi:**
  - `id`: Mã định danh duy nhất (ví dụ: `cyl_001`, `cone_012`, `sph_025`).
  - `topic`: Chủ đề hình học (`CYLINDER`, `CONE`, `SPHERE`).
  - `level`: Cấp độ nhận thức (`NB` - Nhận biết, `TH` - Thông hiểu, `VD` - Vận dụng, `VDC` - Vận dụng cao).
  - `question`: Nội dung câu hỏi (chứa công thức LaTeX chuẩn).
  - `options`: Mảng 4 phương án lựa chọn `[A, B, C, D]`.
  - `correctAnswer`: Chỉ số đáp án đúng (`0`, `1`, `2`, `3`).
  - `explanation`: Lời giải chi tiết sư phạm từng bước.

### 2. Service điều phối câu hỏi
- `src/services/geometryGameQuestionService.ts`:
  - `loadAllBankQuestions()`: Nạp câu hỏi từ `masterQuestionBank.json`.
  - `prepareGameSession(filter, count)`: Trộn ngẫu nhiên câu hỏi theo thuật toán Fisher-Yates, lọc theo chủ đề và độ khó, đảm bảo không lặp câu trong một lượt chơi.

---

## H. MATH RENDERING SUBSYSTEM

### 1. Công nghệ & Thư viện
- **Thư viện chính:** `katex` (phiên bản `0.16.21`).
- **File CSS CDN:** `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css">` trong `index.html`.
- **Thư viện bị cấm / Không sử dụng:** `MathJax` (không có trong `package.json`, không được nạp).

### 2. Component trung tâm: `src/components/common/MathFormula.tsx`
- **Các hàm chuẩn hóa công thức:**
  - `normalizeMathText(input)`: Làm sạch ký tự HTML entity (`&pi;` → `π`, `&times;` → `×`), chuẩn hóa `\dfrac` thành `\frac`, tự động sửa các lỗi gõ tắt thiếu ngoặc nhọn như `\frac13` thành `\frac{1}{3}`, `\sqrt x` thành `\sqrt{x}`.
  - `normalizeFormula(tex)`: Chuẩn hóa các ký hiệu đặc thù Toán 9 Việt Nam: $S_{xq}$, $S_{tp}$, $V$, $\pi$, độ dài đường sinh $l$, bán kính đáy $r$, chiều cao $h$.
- **Các component giao diện:**
  - `<MathText text="..." />`: Nhận diện chuỗi văn bản pha trộn công thức (phân tách bởi dấu `$` hoặc `$$`) và render mượt mà cùng văn bản thường.
  - `<MathFormula formula="..." display="block|inline" />`: Render khối công thức độc lập với thanh cuộn ngang chống tràn (`overflow-x-auto`) trên màn hình điện thoại di động.

---

## I. 3D ENGINE SUBSYSTEM

### 1. Công nghệ & Kiến trúc
- **Thư viện 3D:** `three` (`^0.174.0`) và `@types/three` (`^0.174.0`).
- **Container quản lý:** `src/components/explore/ThreeDViewer.tsx`.
- **Mô hình hình học chi tiết:**
  - `src/components/explore/3d/CylinderModel.tsx`: Mô hình Hình Trụ 3D.
  - `src/components/explore/3d/ConeModel.tsx`: Mô hình Hình Nón 3D.
  - `src/components/explore/3d/SphereModel.tsx`: Mô hình Hình Cầu 3D.
  - `src/components/explore/3d/RevolvingGenerator.tsx`: Mô phỏng sự tạo thành khối tròn xoay khi quay hình phẳng quanh trục (0° → 360°).
  - `src/components/explore/3d/LiquidSimulation.tsx`: Mô phỏng rót nước định lượng thể tích giữa các khối hình.
  - `src/components/explore/3d/ArchimedesImmersionLab.tsx`: Phòng thí nghiệm Archimedes nhúng khối cầu vào bình trụ.

### 2. Cơ chế Render & Điều khiển
- Sử dụng `PerspectiveCamera`, `WebGLRenderer` với `antialias: true`, `alpha: true`.
- Tương tác xoay/zoom: Custom pointer touch/mouse rotation controller (`OrbitRotationController.ts`), hỗ trợ thao tác chạm đa điểm trên mobile.
- Theo dõi kích thước bằng `ResizeObserver` gắn vào container cha, tự động điều chỉnh tỷ lệ khung hình (`camera.aspect`) và ma trận chiếu (`updateProjectionMatrix`), ngăn ngừa hiện tượng méo hình khi co giãn giao diện.

---

## J. AI TUTOR SUBSYSTEM

### 1. Công nghệ & Tích hợp SDK
- **Mô hình AI:** Google Gemini 2.5 Flash (`gemini-2.5-flash`).
- **Thư viện SDK:** `@google/genai` (chuẩn SDK hiện đại nhất của Google).
- **Vị trí thực thi:** **Chỉ chạy 100% trên Server-side** (`server/smartTutorEngine.ts` và `server.ts`). Tuyệt đối không để lộ `GEMINI_API_KEY` về phía trình duyệt client.

### 2. File liên quan & Endpoint
- `server/smartTutorEngine.ts`: Khởi tạo `GoogleGenAI` với `process.env.GEMINI_API_KEY`, đóng gói System Instruction định hướng sư phạm chuyên sâu Toán 9.
- `server.ts` API Endpoints:
  - `POST /api/ai/ask`: Hỏi đáp gia sư thông minh về kiến thức Hình học 9.
  - `POST /api/ai/solve-geometry`: Phân tích và hướng dẫn giải bài toán hình học cụ thể.
  - `POST /api/teacher-ai/*`: Bộ công cụ AI hỗ trợ giáo viên (sinh câu hỏi kiểm tra, phân tích điểm yếu học sinh).
- Phía Client:
  - `src/components/ai/AIChatPanel.tsx`: Giao diện chat trực quan, hỗ trợ gợi ý câu hỏi nhanh, hiển thị công thức toán học qua KaTeX.
  - `src/views/AIView.tsx`: Trang chuyên đề Gia sư AI.

---

## K. DEPLOYMENT & ENVIRONMENT VARIABLES

### 1. Cấu hình triển khai (Deployment Configuration)
- **Local & Container Deployment:**
  - Build command: `npm run build`
  - Start command: `npm start` (thực thi `node dist/server.cjs`)
  - Server lắng nghe cổng: `3000` trên host `0.0.0.0`.
- **Vercel Deployment (`vercel.json`):**
  - Cấu hình serverless function:
    ```json
    {
      "version": 2,
      "builds": [
        { "src": "api/index.ts", "use": "@vercel/node" },
        { "src": "package.json", "use": "@vercel/static-build" }
      ],
      "routes": [
        { "src": "/api/(.*)", "dest": "/api/index.ts" },
        { "src": "/uploads/(.*)", "dest": "/api/index.ts" },
        { "src": "/(.*)", "dest": "/$1" }
      ]
    }
    ```

### 2. Danh sách biến môi trường (Environment Variables)
- `GEMINI_API_KEY`: Khóa bí mật API Google Gemini (Bắt buộc cho AI Tutor, chỉ cấu hình trên server).
- `AUTH_SECRET`: Chuỗi khóa ký chữ ký HMAC-SHA256 cho session token giáo viên.
- `BLOB_READ_WRITE_TOKEN`: Khóa đọc/ghi Vercel Blob (Bắt buộc nếu muốn upload video và lưu trữ metadata bền vững trên Vercel).
- `NODE_ENV`: Môi trường thực thi (`development` hoặc `production`).
- `PORT`: Cổng máy chủ (mặc định 3000).

---

## L. DANH SÁCH LỖI & MÃ NGUỒN TIỀM ẨN RỦI RO (KNOWN BUGS / FRAGILE CODE)

| STT | Vấn đề / Lỗi | File liên quan | Vị trí dòng | Phân tích nguyên nhân |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **Vật lý Game phụ thuộc tần số quét màn hình (120Hz/144Hz quá nhanh)** | `src/components/game/GameCanvas.tsx` | Dòng 407–408, 461–465 | Không sử dụng `deltaTime`. Trên màn hình 120Hz, vật lý chạy nhanh gấp đôi, chim rơi gấp 4 lần. |
| **2** | **Giới hạn 4.5MB Payload trên Vercel Serverless (Lỗi HTTP 413)** | `server.ts`, `server/theoryVideoStorage.ts` | `server.ts` dòng 324–360 | Request upload trực tiếp file lớn (>4.5MB) qua API serverless bị Vercel Edge Proxy chặn với mã 413. |
| **3** | **Lỗi hệ thống tập tin Read-Only trên Vercel (Lỗi HTTP 500)** | `server/theoryVideoStorage.ts` | Dòng 145–163, 1181–1204 | Môi trường Lambda không thể tạo thư mục `/uploads` tại root. Cần đảm bảo fallback sang `/tmp` hoặc Vercel Blob. |
| **4** | **Dữ liệu và Video metadata bị xóa sau khi Lambda tái khởi động** | `server/theoryVideoStorage.ts` | Dòng 171–186, 315–345 | Thư mục `/tmp` bị hủy khi Lambda cold-start. Nếu thiếu `BLOB_READ_WRITE_TOKEN`, metadata sẽ bị reset về rỗng. |
| **5** | **Thời gian xem phản hồi câu hỏi quá ngắn (Feedback Flash)** | `src/components/game/QuestionModal.tsx` | Dòng 85–92 | `feedbackDuration` mặc định cần đảm bảo tối thiểu 800ms để học sinh kịp nhìn nhận diện Đúng/Sai và đọc giải thích. |
| **6** | **Thiếu cơ chế ngắt nhịp (Pause) trong vòng lặp Game** | `src/views/GeometryMasterGameView.tsx`, `GameCanvas.tsx` | Dòng 170–185 | Cần cơ chế Tạm dừng (Pause) hoàn chỉnh để học sinh có thể nghỉ mắt hoặc tạm hoãn mà không bị xử thua. |
| **7** | **Đường dẫn Video cục bộ dạng Blob URL mất hiệu lực khi F5** | `src/services/theoryVideoService.ts` | Dòng 120–155 | Nếu sử dụng URL sinh ra từ `URL.createObjectURL(file)`, khi người dùng refresh trình duyệt, URL này bị revoke lập tức. |

---

## M. ĐÁNH GIÁ MỨC ĐỘ RỦI RO TỔNG THỂ (OVERALL RISK LEVEL)

**Mức độ rủi ro hiện tại: MEDIUM (TRUNG BÌNH)**

### Lý do đánh giá:
1. **Điểm mạnh (Kiến trúc vững chắc):**
   - Hệ thống tách biệt rõ ràng giữa Client, Server, Storage và AI Engine.
   - Codebase có tính module cao, Typescript typing chặt chẽ, không có lỗi build/syntax.
   - Toàn bộ 72 câu hỏi trắc nghiệm và render KaTeX đều hoạt động ổn định, không rò rỉ raw LaTeX.
   - 3D Three.js engine được đóng gói bài bản, giải phóng tài nguyên tốt khi unmount.
2. **Các điểm cần lưu ý khi nâng cấp/vận hành (Xem xét ở các bước tiếp theo):**
   - Cần bổ sung nhân tố thời gian `deltaTime` vào vòng lặp Canvas của Game để đảm bảo tốc độ đồng nhất 60FPS trên mọi màn hình (60Hz, 90Hz, 120Hz, 144Hz).
   - Khi triển khai trên Vercel, bắt buộc phải thiết lập `BLOB_READ_WRITE_TOKEN` để chuyển toàn bộ việc upload và metadata sang Vercel Blob Storage, tránh các giới hạn 4.5MB (HTTP 413) và tính chất tạm thời của ổ đĩa serverless.

---

AUDIT ONLY = COMPLETED
