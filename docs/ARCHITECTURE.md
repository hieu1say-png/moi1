# GEOMETRY LAB – SYSTEM ARCHITECTURE DOCUMENTATION
**Dự án:** GEOMETRY LAB — Nền tảng Học Hình học Không gian 3D Lớp 9  
**Phiên bản:** v2.0 (Post-Audit Refinement)  
**Nhóm kỹ thuật:** Senior Full Stack Engineer, UI/UX Architect, Database Architect, 3D Web Developer, EdTech Specialist

---

## 1. TỔNG QUAN KIẾN TRÚC HỆ THỐNG (SYSTEM OVERVIEW)

Hệ thống GEOMETRY LAB được xây dựng theo kiến trúc phân tầng **Clean Layered Architecture** kết hợp với **Serverless Edge Capabilities**, tối ưu hóa cho trải nghiệm học tập thời gian thực của học sinh lớp 9 và quản lý sư phạm chuyên sâu của giáo viên.

```
+---------------------------------------------------------------------------------------+
|                                1. PRESENTATION LAYER                                  |
|                                                                                       |
|  +--------------------+   +-----------------------+   +----------------------------+  |
|  |   STUDENT VIEWS    |   |     TEACHER VIEWS     |   |      COMMON COMPONENTS     |  |
|  | - Learning Journey |   | - Teacher Dashboard   |   | - 3D Pixar + Pixel Tokens  |  |
|  | - 3D Geometry Lab  |   | - Video Manager       |   | - MathFormula (KaTeX)      |  |
|  | - Smart Video Room |   | - Student Progress    |   | - Husky Interactive Login  |  |
|  | - Practice & Quiz  |   | - Assignment Builder  |   | - Apple Experience Motion  |  |
|  | - Gamification XP  |   | - 5-Level Competency  |   | - Global Toast & Boundary  |  |
|  +---------+----------+   +-----------+-----------+   +--------------+-------------+  |
+------------|--------------------------|------------------------------|----------------+
             |                          |                              |
+------------v--------------------------v------------------------------v----------------+
|                         2. CLIENT APPLICATION & STATE LAYER                           |
|                                                                                       |
|  +----------------------+  +-------------------------+  +--------------------------+  |
|  |     REACT HOOKS      |  |      ZUSTAND STORES     |  |     SERVICE CLIENTS      |  |
|  | - useAuth()          |  | - useTeacherStore       |  | - theoryVideoService     |  |
|  | - useLearningContext |  | - useSpatialProfile     |  | - studentProgressService |  |
|  | - useAdaptiveExam    |  | - useExamStore          |  | - aiService              |  |
|  | - useVideoPlayer     |  | - useErrorMemoryStore   |  | - videoStorageService    |  |
|  +----------------------+  +-------------------------+  +--------------------------+  |
+---------------------------------------+-----------------------------------------------+
                                        | HTTP / JSON (HMAC Signed)
+---------------------------------------v-----------------------------------------------+
|                       3. BACKEND API & SERVERLESS LAYER                               |
|                                                                                       |
|  +--------------------+   +-----------------------+   +----------------------------+  |
|  |   AUTHENTICATION   |   |     API GATEWAY       |   |      AI & LOGIC ENGINE     |  |
|  | - HMAC-SHA256 Sig  |   | - /api/theory-videos  |   | - Gemini @google/genai     |  |
|  | - Token Expiration |   | - /api/student-prog.  |   | - Socratic Hints Engine    |  |
|  | - Role Guard (RBAC)|   | - /api/blob-upload    |   | - Spatial Mistake Analyzer |  |
|  | - Zero Spoofing    |   | - /api/smart-tutor    |   | - 5-Level M1-M5 Evaluator  |  |
|  +--------------------+   +-----------+-----------+   +----------------------------+  |
+---------------------------------------|-----------------------------------------------+
                                        | Direct Client Upload Token
+---------------------------------------v-----------------------------------------------+
|                       4. DATA PERSISTENCE & STORAGE LAYER                             |
|                                                                                       |
|  +--------------------------------+       +----------------------------------------+  |
|  |   RELATIONAL DATABASE SCHEMA   |       |       OBJECT & ASSET STORAGE           |  |
|  | - Users (Student, Teacher)     |       | - Vercel Blob Storage (Cloud Video)    |  |
|  | - Lessons & Geometry Models    |       | - Canonical Videos (/public/videos/)   |  |
|  | - Formulas, Quizzes, Progress  |       | - Posters, 3D Textures & GLTF Assets   |  |
|  | - Achievements & AI Convos     |       | - Zero Serverless Disk Write (No EROFS)|  |
|  +--------------------------------+       +----------------------------------------+  |
+---------------------------------------------------------------------------------------+
```

---

## 2. CHI TIẾT CÁC TẦNG KIẾN TRÚC (LAYER SPECIFICATION)

### 2.1. Frontend Layer
* **Components:** Phân chia module rõ ràng theo domain:
  * `components/3d/` & `components/explore/3d/`: Quản lý các mô hình Three.js (Cylinder, Cone, Sphere), điều khiển góc quay, công cụ đo đạc (Measurement Tool), hoạt ảnh khai triển (Explode Net).
  * `components/journey/`: Quản lý bản đồ học tập sinh động, danh sách bài học, bài tập trắc nghiệm thông minh.
  * `components/video/`: Trình phát video chuyên dụng đồng bộ video thật với mô hình 3D và thẻ công thức KaTeX.
  * `components/game/` & `components/gamification/`: Quản lý huy hiệu, thanh XP, Level và nhiệm vụ ngày.
  * `components/ai/`: Giao diện tương tác với Robot Geo theo phương pháp Socratic.
  * `components/teacher/`: Bộ công cụ quản trị lớp học, phân tích lỗi sai và tải video.
* **Pages/Views:**
  * `StudentAppLayout`: Định tuyến cho học sinh (`HomeView`, `ExploreView`, `TheoryView`, `PracticeView`, `AchievementsView`, `AIView`).
  * `TeacherAppLayout`: Định tuyến cho giáo viên (`TeacherDashboardView`, `VideoManager`, `StudentProgress`, `SpatialProfile`).
* **State Management (Zustand Stores):**
  * `useTeacherStore`: Quản lý danh sách lớp, bài tập đã giao và học sinh.
  * `useSpatialProfileStore`: Lưu trữ đánh giá năng lực không gian theo chuẩn M1–M5.
  * `useErrorMemoryStore`: Ghi nhớ các lỗi tư duy của học sinh để AI Tutor nhắc nhở.
  * `useExamStore`: Quản lý trạng thái làm bài khảo sát năng lực thích ứng.
* **Service Layer:** Tách biệt hoàn toàn việc gọi API mạng khỏi UI:
  * `theoryVideoService`: Xử lý lấy danh sách video, khởi tạo upload client token trực tiếp với Vercel Blob.
  * `studentProgressService`: Đồng bộ tiến độ bài học, điểm số và huy hiệu.
  * `aiService`: Giao tiếp với Gemini AI thông qua endpoint an toàn `/api/smart-tutor`.

---

### 2.2. Backend Layer
* **API Endpoints (`server.ts` & `/api/index.ts`):**
  * `POST /api/auth/token`: Xác thực danh tính và phát hành token HMAC-SHA256 hợp lệ.
  * `GET /api/theory-videos`: Trả về danh sách video đã được xuất bản (`PUBLISHED`) hoặc do chính giáo viên sở hữu.
  * `POST /api/theory-videos/blob-upload`: Cung cấp client-token cho browser tải trực tiếp lên Vercel Blob Object Storage.
  * `POST /api/theory-videos/create-and-assign`: Lưu metadata video sau khi tải lên thành công.
  * `GET/POST /api/student-progress`: Đồng bộ hóa kết quả học tập giữa Client và Server.
  * `POST /api/smart-tutor`: Xử lý logic AI gợi mở sư phạm bảo vệ bí mật API Key tại server.
* **Authentication & RBAC (`server/auth.ts`):**
  * Chữ ký số HMAC-SHA256 kết hợp mã băm mật khẩu giáo viên, ngăn chặn hoàn toàn việc giả mạo header `x-user-role`.
  * Học sinh có quyền `VIEW_ONLY` đối với nội dung học tập; Giáo viên có quyền `CRUD` đối với video, bài học và nhiệm vụ.
* **Storage Gateway:**
  * Mô hình **Browser $\to$ Vercel Blob $\to$ Metadata DB** bảo vệ hàm Vercel Serverless khỏi các tệp đa phương tiện dung lượng lớn, tuyệt đối không sử dụng bộ nhớ đệm đĩa cục bộ (`/uploads/temp`).

---

### 2.3. Data Layer
* Thiết kế mô hình dữ liệu quan hệ (Relational Entity Model) định chuẩn, sẵn sàng tích hợp với Cloud SQL/PostgreSQL hoặc lưu trữ Document chuẩn hóa:
  1. `users` (id, role, username, display_name, created_at)
  2. `students` (id, user_id, class_id, level, xp, streak)
  3. `teachers` (id, user_id, title, department)
  4. `lessons` (id, topic, title, description, order_index, status)
  5. `videos` (id, lesson_id, title, video_url, storage_provider, duration, chapters_json, formula_latex, status)
  6. `geometry_models` (id, lesson_id, shape_type, default_params_json, explode_mesh_data)
  7. `formulas` (id, topic, shape_type, name, latex_code, explanation)
  8. `exercises` (id, topic, difficulty, question_text, options_json, correct_answer, solution_latex)
  9. `progress` (id, student_id, lesson_id, completion_pct, score, updated_at)
  10. `achievements` (id, code, name, icon, condition_type, target_value)
  11. `student_achievements` (student_id, achievement_id, unlocked_at)
  12. `ai_conversations` (id, student_id, topic, messages_json, detected_misconceptions)

---

## 3. DATA FLOW & SECURITY BOUNDARY DIAGRAM

```
STUDENT / TEACHER BROWSER
       |
       | 1. Login & Token Verification
       v
+--------------------------+
|  /api/auth/token         |  <--- Signs HMAC-SHA256 Token (7 days)
+--------------------------+
       |
       | 2. Authenticated Session Token
       v
+----------------------------------------------------------------+
|                   ACTION: TEACHER UPLOADS VIDEO                |
|                                                                |
| 1. Client calls /api/theory-videos/blob-upload                 |
| 2. Server verifies Teacher Secret / Token                      |
| 3. Server generates Signed Client Token via @vercel/blob/client|
| 4. Client streams video chunks DIRECTLY to Vercel Blob Storage |
| 5. Client receives permanent public Blob URL                   |
| 6. Client calls /api/theory-videos/create-and-assign           |
| 7. Server records Lesson Metadata with status = PUBLISHED      |
+----------------------------------------------------------------+
       |
       | 3. Read Published Syllabus
       v
+----------------------------------------------------------------+
|                   ACTION: STUDENT LEARNS VIDEO                 |
|                                                                |
| 1. Client requests GET /api/theory-videos                      |
| 2. Server filters: Only PUBLISHED videos returned              |
| 3. VideoPlayer streams from Vercel Blob / Public Canonical CDN |
| 4. Interactive 3D Canvas visualizes 3D Cylinder/Cone/Sphere    |
| 5. MathFormula renders LaTeX equations via KaTeX               |
| 6. Student completes quiz -> Progress saved to /api/student-p |
+----------------------------------------------------------------+
```
