# BÁO CÁO HIỆN TRẠNG TOÀN BỘ DỰ ÁN (SYSTEM SNAPSHOT)
**Dự án:** GEOMETRY LAB – TOÁN 9 (Phòng Thí Nghiệm Hình Trụ – Hình Nón – Hình Cầu)  
**Thời điểm Snapshot:** 2026-09-11  
**Mục tiêu:** Kiểm toán, ổn định hóa, nâng cấp chất lượng và bảo đảm tính toàn vẹn sư phạm.

---

## 1. FRAMEWORK & CÔNG NGHỆ NỀN TẢNG
- **Frontend Framework:** React 19.0.1 + TypeScript ~5.8.2.
- **Build Tool:** Vite 6.2.3 với `@tailwindcss/vite` 4.1.14.
- **Backend / API Server:** Express 4.21.2 tích hợp trên Node.js (v22.23.2) với `tsx` 4.21.0 phục vụ API RESTful nội bộ và phát video qua HTTP 206 Partial Content.
- **3D Graphics:** Three.js (0.185.1) + `@types/three`.
- **Toán học & Công thức:** KaTeX 0.18.4 (kèm `@types/katex`).
- **State Management:** Zustand 5.0.15 + React Context API (`AuthContext`, `AppContext`, `LearningContext`, `ToastContext`, `TeacherAIContext`).
- **Hoạt họa:** `motion` 12.23.24.
- **Biểu tượng:** `lucide-react` 0.546.0.

---

## 2. CẤU TRÚC THƯ MỤC CHÍNH
```
/
├── ARTIFACTS/                     # Tài liệu kiểm toán và báo cáo nghiệm thu
├── public/                        # Tài nguyên tĩnh
├── server/                        # Backend Express & Business Services
│   ├── auth.ts                    # Dịch vụ xác thực giáo viên & học sinh
│   ├── theoryVideoStorage.ts      # Quản lý metadata & tệp video vật lý
│   ├── studentProgressStorage.ts  # Lưu trữ tiến độ học tập & nhật ký
│   ├── smartTutorEngine.ts        # AI Tutor engine (Gemini & Heuristic)
│   ├── mathEngine.ts              # Xử lý toán & biểu thức
│   └── data/                      # Tệp dữ liệu JSON bền vững của server
│       ├── theory_videos.json
│       ├── shape_video_assignments.json
│       └── student_progress.json
├── src/
│   ├── components/
│   │   ├── auth/                  # AuthGate, LoginPage, LogoutConfirmModal
│   │   ├── common/                # MathFormula, GlobalErrorBoundary, Toast
│   │   ├── explore/               # ThreeDViewer, VisualIllusionPuzzle, ShapeSelector
│   │   ├── game/                  # QuestionModal, GameHUD, soundEffects
│   │   ├── journey/               # LearningJourneyModal, PracticeQuiz, RealWorldProblem
│   │   ├── layout/                # AppShell, Header, Sidebar, StudentAppLayout, TeacherAppLayout
│   │   ├── practice/              # SingleQuestionPracticeFlow, SolutionTimeline
│   │   ├── question-renderers/    # UniversalQuestionRenderer, MultipleChoiceRenderer, etc.
│   │   ├── real-world/            # CanOptimizationSandbox, ConicalHatCraftSandbox
│   │   ├── teacher/               # TeacherOverviewTab, TeacherClassesTab, TeacherStudentsTab,
│   │   │                          # TeacherQuestionBankTab, TeacherVideosTab, TeacherReportsTab
│   │   ├── teacher-ai/            # TeacherDock, TeacherBubble, TeacherAvatar
│   │   ├── theory/                # Theory3DPanel, TheoryVideoPanel, TheoryLearningLayout
│   │   └── video/                 # LessonVideo
│   ├── config/                    # videoConfig.ts
│   ├── context/                   # AppContext, AuthContext, LearningContext, ToastContext
│   ├── data/                      # masterQuestionBank.json (292 câu), questionBank1000/
│   ├── design-system/             # tokens.ts, index.ts
│   ├── stores/                    # useTeacherStore, useExamStore, useSpatialProfileStore
│   ├── views/                     # HomeView, TheoryView, ExploreView, PracticeView,
│   │                              # ExamPrepView, RealWorldView, AchievementsView,
│   │                              # AIView, GeometryMasterGameView, TeacherDashboardView
│   ├── index.css                  # Toàn bộ design tokens & Tailwind utilities
│   └── main.tsx                   # Điểm khởi chạy React
├── server.ts                      # Server Express chính và Vite dev middleware
├── package.json
└── vite.config.ts
```

---

## 3. HỆ THỐNG ROUTES
### Phía Học sinh (Student Routes):
- `/home`: Trang chủ, chào mừng, tiếp tục học tập, bản đồ hình học không gian.
- `/theory`, `/cylinder`, `/cone`, `/sphere`: Lý thuyết trực quan 3D, công thức SGK, bài học video thực tế.
- `/explore`: Phòng thí nghiệm không gian 3D tương tác tự do (thay đổi bán kính, chiều cao, góc mở).
- `/practice`: Luyện tập thích ứng với ngân hàng câu hỏi chuẩn hóa, hướng dẫn giải 4 bước chi tiết.
- `/exam-prep`: Thi thử vào 10 (10 câu / 30 phút, chống lộ đáp án trước khi nộp bài).
- `/real-world`: Vấn đề thực tế (tối ưu hóa lon nước ngọt, nón lá bài thơ, bồn chứa Archimedes).
- `/ai`: Trợ lý Gia sư AI (Thầy Hiếu AI) theo phương pháp gợi mở Socratic.
- `/game`: Thử thách không gian toán học (Geometry Master).
- `/student-profile`: Hồ sơ cá nhân, biểu đồ năng lực không gian, huy hiệu.

### Phía Giáo viên (Teacher Routes):
- `/teacher-dashboard`, `/teacher`: Cổng quản trị sư phạm tổng thể.
  - Tab Bàn làm việc (Overview): Chỉ số lớp, cảnh báo sớm học sinh cần hỗ trợ.
  - Tab Lớp học (Classes): Danh sách lớp 9A1, 9A2, phân bổ sĩ số.
  - Tab Học sinh (Students): Quản lý tài khoản, đặt lại mật khẩu, chuyển lớp, xem nhật ký.
  - Tab Ngân hàng câu hỏi (Question Bank): Duyệt câu hỏi, xem trước như học sinh, lọc dạng bài.
  - Tab Video bài giảng (Videos): Quản lý video thật, tải lên, gán video cho Hình trụ/Nón/Cầu.
  - Tab Nhiệm vụ & Bài tập (Assignments): Giao bài tập theo dạng bài.
  - Tab Báo cáo & Phân tích (Reports & Analytics): Biểu đồ nhiệt độ kiến thức, lỗi thường gặp.

---

## 4. CÁC THÀNH PHẦN CHÍNH (KEY COMPONENTS)
- `AuthGate`: Cổng kiểm soát bảo mật tuyệt đối, ngăn chặn rò rỉ giao diện khi chưa đăng nhập.
- `MathText` / `MathFormula`: Bộ hiển thị công thức toán KaTeX hợp nhất, không để lộ mã nguồn LaTeX thô (`\frac`, `\sqrt`, `\pi`).
- `ThreeDViewer`: Mô hình 3D tương tác hình trụ, nón, cầu viết bằng Three.js thuần với lưới tọa độ, mặt cắt và animation quay tạo hình.
- `LessonVideo`: Trình phát video chuyên dụng, hỗ trợ HTTP Range 206 Streaming, tuân thủ chính sách Không video ảo (No Fake Video = No Player).
- `SingleQuestionPracticeFlow`: Luồng luyện tập từng câu, giao diện tối ưu học sinh lớp 9 với giải thích 4 bước chuẩn mực.
- `TeacherDock` & `TeacherBubble`: Thầy Hiếu AI đồng hành sư phạm mọi lúc trên giao diện học tập.

---

## 5. CƠ SỞ DỮ LIỆU (DATABASE)
- **Cơ chế lưu trữ:** File-based JSON Database trên server (`/server/data/`), bảo đảm tính bền vững khi tải lại trang, khởi động lại server hoặc thay đổi phiên.
- **Tập tin dữ liệu cốt lõi:**
  - `/server/data/theory_videos.json`: Danh mục metadata video bài giảng của giáo viên.
  - `/server/data/shape_video_assignments.json`: Bảng ánh xạ video chính thức cho 3 hình học (`cylinder`, `cone`, `sphere`).
  - `/server/data/student_progress.json`: Dữ liệu tiến độ, điểm số, bài làm của học sinh.
  - `src/data/masterQuestionBank.json`: 292 câu hỏi gốc chuẩn mực từ tài liệu kiểm duyệt Toán 9.

---

## 6. HỆ THỐNG LƯU TRỮ TỆP (STORAGE)
- **Thư mục tệp vật lý:** `/uploads/teacher/{teacherId}/{videoId}/{fileName}`.
- **Pipeline truyền tải:** Endpoint streaming `GET /api/theory-videos/stream/:id` với HTTP 206 Partial Content, hỗ trợ tua nhanh video lớn đến 500MB.
- **Kiểm tra vật lý:** Phương thức `verifyPhysicalVideoExists()` xác thực tệp có mặt trên ổ đĩa trước khi trả về URL hoặc phát.

---

## 7. XÁC THỰC (AUTHENTICATION)
- Hỗ trợ 2 vai trò tách biệt: Học sinh (`student`) và Giáo viên (`teacher`).
- Lưu phiên làm việc an toàn qua `localStorage` (`geom_student_session`, `geom_teacher_session`) kèm token và thời hạn.
- Tự động phục hồi phiên khi refresh, không bị nhấp nháy chuyển trang đăng nhập.

---

## 8. PHÂN QUYỀN (AUTHORIZATION - RBAC)
- Phân quyền nghiêm ngặt cả ở Client (`AuthGate`, `StudentRouteRenderer`, `TeacherAppLayout`) và Server (`requireTeacherAuth`).
- Học sinh không thể truy cập API tải lên, gán video, quản lý học sinh hoặc sửa câu hỏi.
- Chế độ "Xem như học sinh" an toàn cho giáo viên (`Student Preview`) có banner cảnh báo nổi bật.

---

## 9. NGÂN HÀNG CÂU HỎI (QUESTION BANK)
- **Tổng số câu hỏi gốc đã kiểm duyệt:** 292 câu hỏi thực tế trong `src/data/masterQuestionBank.json` phân bổ đều cho Hình trụ, Hình nón, Hình cầu.
- **Cấu trúc mỗi câu:** Đầy đủ `id`, `topic`, `subtopic`, `difficulty`, `type`, `question`, `options` (4 phương án với MCQ), `correctAnswer`, `solution4Steps`, `importantNotes`.
- **Hệ thống mở rộng:** `src/data/questionBank1000/` với 38 archetypes chuẩn hóa và generator biến thể có kiểm soát.

---

## 10. HỆ THỐNG VIDEO BÀI GIẢNG (VIDEO SYSTEM)
- **Chính sách Zero-Fake tuyệt đối:** Không sinh video mẫu, không dùng video giả lập 15 giây, không nhúng YouTube/Vimeo.
- **Trạng thái hiện tại:** Thư mục video đã được dọn sạch hoàn toàn; nếu giáo viên chưa tải lên video lớp học thật, giao diện học sinh sẽ không hiển thị player hỏng mà hiển thị đầy đủ lý thuyết 3D và mô phỏng tương tác.
- **Giao diện giáo viên:** Có đầy đủ tính năng tải lên MP4/WebM, gắn nhãn chương mục và gán video vào bài học.

---

## 11. HỆ THỐNG MÔ HÌNH 3D (3D SYSTEM)
- Tương tác thời gian thực: Thay đổi bán kính $r$, chiều cao $h$, góc mở $0^\circ \to 360^\circ$ (tạo hình nón từ tam giác vuông, tạo hình cầu từ nửa hình tròn).
- Bố cục chống che khuất: Bảng điều khiển đặt cân đối bên cạnh, không che đè lên mô hình 3D.
- Hỗ trợ các nút: Đặt lại góc nhìn (Reset), Tự động xoay (Auto Rotate), Dừng (Stop), Phóng to/Thu nhỏ (Zoom).

---

## 12. GIA SƯ AI (AI TUTOR - THẦY HIẾU AI)
- Phương pháp sư phạm Socratic: Gợi mở dữ kiện $\to$ Gợi ý công thức $\to$ Phân tích bước sai $\to$ Hướng dẫn giải.
- Không giải hộ bài toán ngay từ lượt hỏi đầu tiên.
- Phân loại lỗi sai: Sai mô hình hóa, sai áp dụng công thức, sai thứ tự tính toán, sai đơn vị đo.

---

## 13. BÀN LÀM VIỆC GIÁO VIÊN (TEACHER DASHBOARD)
- Quản lý học sinh, danh sách lớp học 9A1, 9A2.
- Giám sát tiến độ học tập, điểm số bài luyện tập và thi thử.
- Xem nhật ký thao tác sư phạm (Audit logs).
- Quản lý và kiểm toán ngân hàng câu hỏi.

---

## 14. BÀN LÀM VIỆC HỌC SINH (STUDENT DASHBOARD)
- Thẻ "Tiếp tục học" khôi phục chính xác bài học và phần đang thực hiện dở dang.
- Lộ trình bài bản: Lý thuyết $\to$ Video $\to$ 3D $\to$ Vấn đề thực tế $\to$ STEM $\to$ Luyện tập.
- Nhật ký lỗi sai (Error Notebook) giúp học sinh ôn lại câu đã làm sai.

---

## 15. CÁC ĐIỂM CẦN NÂNG CẤP & TỐI ƯU HÓA (AREAS FOR AUDIT & ENHANCEMENT)
1. **Typography đồng nhất:** Cần đảm bảo font Times New Roman học thuật chuẩn mực áp dụng triệt để cho toàn bộ text, tiêu đề, nút bấm, câu hỏi và phương án, với kích thước chữ phù hợp học sinh lớp 9 (Desktop: 20–22px cho câu hỏi, Mobile: 18–20px).
2. **Bộ kiểm tra toán học (`validateMathText`):** Cần một validator chuẩn hóa kiểm tra cú pháp KaTeX, dấu đóng mở ngoặc, căn thức, phân số trước khi hiển thị cho học sinh.
3. **Phân loại trạng thái câu hỏi:** Đảm bảo 100% câu hỏi có trạng thái rõ ràng (`APPROVED`, `REVIEW`, `NEEDS_REVIEW`), và chỉ những câu `APPROVED` mới xuất hiện trong bài luyện tập của học sinh.
4. **Tính năng "Xem như học sinh" cho giáo viên:** Bổ sung modal xem trước câu hỏi trong tab Ngân hàng câu hỏi của giáo viên để kiểm tra tính chính xác của công thức và phương án.
5. **Chuẩn hóa lời giải 4 bước:** Kiểm tra để bảo đảm tất cả giải thích đáp án đều tuân thủ 4 bước sư phạm chuẩn (Xác định dữ kiện $\to$ Mô hình và công thức $\to$ Tính toán $\to$ Kết luận).
