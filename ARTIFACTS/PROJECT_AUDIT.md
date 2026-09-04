# GIAI ĐOẠN 0: BÁO CÁO AUDIT TOÀN BỘ DỰ ÁN (PROJECT_AUDIT.md)

**Dự án:** GEOMETRY LAB – PHÒNG THÍ NGHIỆM HÌNH TRỤ – HÌNH NÓN – HÌNH CẦU TOÁN 9  
**Ngày thực hiện:** Tháng 9/2026  
**Vai trò:** Principal Software Engineer + Full-stack Architect + UX/UI Designer + EdTech Expert + QA Engineer  

---

## 1. PHÂN TÍCH HIỆN TRẠNG 30 HẠNG MỤC KỸ THUẬT

### 1.1. Cấu trúc thư mục
- Thư mục gốc sạch sẽ, tách bạch rõ ràng giữa:
  - `/server`: Express server (`server.ts`), storage (`server/theoryVideoStorage.ts`), AI logic (`server/smartTutorEngine.ts`).
  - `/uploads`: Lưu trữ file vật lý (`/uploads/videos`, `/uploads/thumbnails`).
  - `/src`: Toàn bộ mã nguồn client gồm `components`, `context`, `data`, `services`, `stores`, `types`, `views`.
  - `/ARTIFACTS`: Thư mục lưu trữ tài liệu audit, kiến trúc, log và báo cáo kiểm thử.

### 1.2. Dependencies & Build Configurations (`package.json`, `vite.config.ts`, `tsconfig.json`)
- React 19 + TypeScript + Vite + Tailwind CSS.
- Server chạy qua `tsx server.ts` trên port 3000, build bundle bằng `esbuild`.
- Thư viện toán: `katex` (với CDN CSS trong `index.html`).
- Thư viện 3D: `three` (WebGL native với PerspectiveCamera, OrbitControls, Group mesh).
- Icons: `lucide-react`.
- Animation: `motion`.

### 1.3. Routing & Entry Point
- Entry point: `index.html` -> `src/main.tsx` -> `src/App.tsx`.
- Routing nội bộ thông qua `useApp().currentRoute` và `RouteRenderer` trong `App.tsx`.
- Các routes chính:
  - `/home`, `/theory`, `/explore`, `/practice`, `/exam-prep`, `/real-world`, `/achievements`, `/ai`, `/settings` (Dành cho học sinh).
  - `/login`, `/student-profile`.
  - `/teacher`, `/teacher-dashboard` (Khu vực quản trị sư phạm giáo viên có AuthGuard).

### 1.4. Quản lý trạng thái (Contexts & Stores)
- Contexts:
  - `AuthContext`: Quản lý 2 session độc lập (`studentSession` và `teacherSession`), cờ `authReady`.
  - `AppContext`: Quản lý route, XP, Level, chế độ âm thanh, bộ đếm thống kê.
  - `LearningContext`: Quản lý bài học đang chọn, khối hình đang chọn (Cylinder, Cone, Sphere).
  - `ToastContext`: Thông báo nổi đa tầng (Success, Error, Info, Warning).
- Zustand Stores:
  - `useErrorMemoryStore`: Sổ tay lỗ hổng kiến thức học sinh (Spaced Repetition).
  - `useTeacherStore`: Quản lý lớp, học sinh, phân công bài tập phía giáo viên.

### 1.5. Server-side & API Security
- Server chạy tại `server.ts` lắng nghe `0.0.0.0:3000`.
- Tích hợp Google Gemini 2.5 Flash thông qua `@google/genai` (chỉ chạy server-side, không bao giờ lộ API key về client).
- API video bài giảng: Lưu file vật lý tại `/uploads` và ghi metadata vào `/server/data/theory_videos.json`.
- Phân quyền (Authorization): Đã có middleware `requireTeacherAuth`, cần củng cố bảo vệ thêm cho các endpoint upload/create/edit/delete video và quản lý lớp học.

### 1.6. Question Bank & Math Rendering
- Nguồn câu hỏi: `src/data/masterQuestionBank.json` (Trích xuất nguyên bản từ `Câu 1(1).pdf` với 100% câu trắc nghiệm 4 đáp án A-B-C-D).
- Công thức toán: Render qua `MathFormula` và `MathText` (sử dụng KaTeX).
- Đảm bảo tuyệt đối: Không rò rỉ raw LaTeX (`\pi`, `\frac`, `r^2`, `\sqrt{}`) ra ngoài text thuần.

### 1.7. 3D Rendering & Mobile Layout
- Khám phá 3 khối hình (Trụ - Nón - Cầu) hoạt động bằng Three.js canvas.
- Cần tối ưu vùng an toàn (Safe Zone) trên màn hình mobile 360px, 390px, 412px để HUD controls không che khuất mô hình 3D.
- Typography: Áp dụng font Times New Roman cho văn bản toàn ứng dụng theo yêu cầu đặc tả.

---

## 2. PHÂN LOẠI LỖI & RỦI RO PHÁT HIỆN (FINDINGS)

1. **Rủi ro F-01 (Video Persistence & Metadata):**
   - Cần đảm bảo metadata video có đầy đủ 17 trường bắt buộc theo đặc tả Mục F: `id, title, description, topic, shape, module, storagePath, url, thumbnail, duration, fileSize, mimeType, createdBy, createdAt, updatedAt, publishedAt, visibility, status`.
2. **Rủi ro G-01 (Server-side Authorization cho Video):**
   - Các API tạo/sửa/xóa video (`POST /api/theory-videos`, `PUT /api/theory-videos/:id`, `DELETE /api/theory-videos/:id`) trước đó chưa gắn `requireTeacherAuth`. Học sinh chỉ được phép gọi `GET /api/theory-videos` với trạng thái `status=PUBLISHED`.
3. **Rủi ro E-01 (MCQ & Nộp bài):**
   - Đảm bảo khi học sinh đang làm bài, không được hiển thị đáp án đúng hay lời giải dưới bất kỳ hình thức nào. Chỉ sau khi bấm "SUBMIT / NỘP BÀI" mới hiện đúng/sai và lời giải chuẩn 4 bước.
4. **Rủi ro H-01 (Font chữ & Touch Targets):**
   - Font văn bản cần được chuẩn hóa về **Times New Roman** trên toàn ứng dụng.
   - Touch target của mọi button trên mobile phải đạt tối thiểu 44px.
5. **Rủi ro Mục 3 (Scope Guard):**
   - Mục 3 được bảo lưu nguyên trạng, không được sửa code hay refactor.
