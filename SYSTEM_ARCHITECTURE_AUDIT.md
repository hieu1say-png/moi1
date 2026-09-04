# GEOMETRY LAB – PHÒNG THÍ NGHIỆM HÌNH KHỐI TOÁN 9
## BÁO CÁO KIỂM TOÁN KIẾN TRÚC HỆ THỐNG & PHÂN LOẠI LỖI (SYSTEM ARCHITECTURE AUDIT & BUG REPORT)

**Ngày lập:** Tháng 9/2026  
**Dự án:** GEOMETRY LAB (Phòng Thí Nghiệm Hình Khối Toán 9: Hình Trụ – Hình Nón – Hình Cầu)  
**Tác giả:** Senior Full-Stack Engineer + Software Architect + UI/UX & QA Engineer  
**Trạng thái kiểm định:** Đạt chuẩn TypeScript strict & Compile thành công  

---

## PHẦN I: SƠ ĐỒ KIẾN TRÚC HỆ THỐNG (SYSTEM ARCHITECTURE)

```
+---------------------------------------------------------------------------------------+
|                                    TRÌNH DUYỆT (CLIENT)                              |
+---------------------------------------------------------------------------------------+
|  1. TẦNG TRẢI NGHIỆM HỌC TẬP (VIEWS & LAYOUTS)                                        |
|     +-------------------------------------------------------------------------------+ |
|     | App.tsx (Header, Navigation Tabs, Mode Toggle, Role Switcher: Student/Teacher)| |
|     +-------------------------------------------------------------------------------+ |
|     | [Khám phá 3D]       | [Lý thuyết]        | [Luyện tập]        | [Thực tế]     | |
|     | ThreeDViewer        | TheoryView         | PracticeView       | RealWorldView | |
|     |  - CylinderModel    |  - Theory3DPanel   |  - SingleQuestion  |  - ParadoxLab | |
|     |  - ConeModel        |  - VideoPanel      |  - AICorrectionCard|  - Sketchpad  | |
|     |  - SphereModel      |  - MathText        |  - SolutionTimeline|  - Archimedes | |
|     |  - LiquidSimulation |  - LessonGuideBar  |  - ErrorNotebook   |  - RealExam   | |
|     +-------------------------------------------------------------------------------+ |
|     | [Bảng điều khiển Giáo viên - TeacherDashboardView]                            | |
|     |  - Quản lý lớp & học sinh (TeacherClassesTab, TeacherStudentsTab)              | |
|     |  - Quản lý video bài giảng bền vững (TeacherVideosTab, TeacherVideoManager)   | |
|     |  - Ngân hàng 1000+ câu hỏi (TeacherQuestionBankTab, unifiedAssignmentService) | |
|     |  - Sinh đề thi & bóc tách đề Word bằng AI (ExamPrepManager, TeacherSettings)  | |
|     |  - Bản đồ nhiệt năng lực không gian (ClassKnowledgeHeatmap)                   | |
|     +-------------------------------------------------------------------------------+ |
|                                                                                       |
|  2. TẦNG QUẢN LÝ TRẠNG THÁI & DỊCH VỤ CLIENT                                          |
|     +-----------------------+------------------------+------------------------------+ |
|     | State Stores (Zustand)| Context Providers      | Domain Services              | |
|     |  - useErrorMemoryStore|  - AppContext (XP/Role)|  - TheoryVideoService        | |
|     |  - useTeacherStore    |  - AuthContext         |  - GeometryDataService       | |
|     |  - useExplore3DStore  |  - ToastContext        |  - unifiedAssignmentService  | |
|     +-----------------------+------------------------+------------------------------+ |
|                                                                                       |
|  3. TẦNG RENDER TOÁN HỌC & ĐỒ HỌA 3D                                                 |
|     - KaTeX Engine (MathFormula, MathText, auto-formatting & sanitization)            |
|     - Three.js WebGL (PerspectiveCamera, Ambient/Directional Lights, OrbitControls)   |
|     - HTML5 Canvas 2D (SpatialSketchpad - Bút vẽ nét liền / nét đứt chuẩn vào 10)     |
+---------------------------------------------------------------------------------------+
                                        | (HTTP / REST APIs)
                                        v
+---------------------------------------------------------------------------------------+
|                               EXPRESS BACKEND (server.ts)                             |
+---------------------------------------------------------------------------------------+
|  Port: 3000 | Host: 0.0.0.0 | Vite Middleware (Dev) / Static Serve (Prod)             |
|                                                                                       |
|  APIs CHÍNH:                                                                          |
|   1. POST /api/ai-tutor            -> Tích hợp Gemini 2.5 Flash gia sư sư phạm 4 bước |
|   2. POST /api/ai-exam-generator   -> Sinh đề chuẩn cấu trúc tuyển sinh 10 (Trụ-Nón-Cầu)|
|   3. POST /api/ai-parse-exam       -> Bóc tách đề Word / MathType sang KaTeX & SVG    |
|   4. GET  /api/theory-videos       -> Lấy danh sách video lý thuyết giáo viên         |
|   5. POST /api/theory-videos       -> Tải lên file video mp4/webm bền vững            |
|   6. DELETE /api/theory-videos/:id -> Xóa video vật lý và cập nhật chỉ mục metadata  |
|                                                                                       |
|  HỆ THỐNG LƯU TRỮ BỀN VỮNG (PERSISTENCE LAYER):                                       |
|   - Video Files: `/uploads` (lưu vật lý trên đĩa máy chủ)                             |
|   - Metadata Video: `/server/data/theory_videos.json`                                 |
|   - Fallback Client: `localStorage` dự phòng khi offline                              |
+---------------------------------------------------------------------------------------+
```

---

## PHẦN II: DANH SÁCH VÀ QUAN HỆ CÁC MODULE

### 1. Phân hệ Khám Phá 3D (`src/views/ExploreView.tsx`)
- **Nhiệm vụ:** Trực quan hóa hình học không gian 3 khối hình (Hình trụ, Hình nón, Hình cầu).
- **Sub-modules:**
  - `ThreeDViewer.tsx`: Container điều hướng mô hình 3D.
  - `CylinderModel.tsx`: Mô hình 3D hình trụ với tương tác kích thước $r, h$, chế độ khung dây, mặt cắt ngang và trải mặt phẳng (unfolding net).
  - `ConeModel.tsx`: Mô hình 3D hình nón với đường sinh $l$, chiều cao $h$, bán kính đáy $r$, tính toán tự động định lý Pytago $l^2 = r^2 + h^2$.
  - `SphereModel.tsx`: Mô hình 3D hình cầu với các mặt cắt qua tâm, đường xích đạo, kinh tuyến/vĩ tuyến.
  - `LiquidSimulation.tsx`: Thí nghiệm rót nước kiểm chứng thể tích.
  - `RevolvingGenerator.tsx`: Mô phỏng quay hình phẳng 2D tạo thành khối 3D (Hình chữ nhật quay quanh trục $\to$ Trụ, Tam giác vuông quay quanh cạnh góc vuông $\to$ Nón, Nửa hình tròn quay quanh đường kính $\to$ Cầu).

### 2. Phân hệ Lý Thuyết Chuẩn Sư Phạm (`src/views/TheoryView.tsx`)
- **Nhiệm vụ:** Trình bày lý thuyết Toán 9 chuẩn chương trình GDPT theo cấu trúc sư phạm trực quan.
- **Sub-modules:**
  - `TheoryLearningLayout.tsx`: Bố cục học tập chia cột giữa nội dung lý thuyết và mô phỏng trực quan.
  - `Theory3DPanel.tsx`: Mô hình 3D tương tác đồng bộ trực tiếp với phần lý thuyết đang đọc.
  - `TheoryVideoPanel.tsx`: Trình phát video bài giảng chuyên sâu do giáo viên đăng tải kèm ghi nhận tiến độ.
  - `lessonsData.ts`: Dữ liệu bài học chuẩn hóa với công thức LaTeX kiểm định.

### 3. Phân hệ Luyện Tập Từng Câu (`src/components/practice/SingleQuestionPracticeFlow.tsx`)
- **Nhiệm vụ:** Luyện tập tương tác theo phương pháp: **HIỂU $\to$ THỬ $\to$ SAI $\to$ XEM GIẢI THÍCH $\to$ LÀM LẠI**.
- **Quy tắc sư phạm cốt lõi:**
  1. Hiển thị duy nhất 1 câu tại một thời điểm.
  2. Chọn ngẫu nhiên từ ngân hàng câu hỏi chuẩn (1000+ câu).
  3. Học sinh chọn đáp án và bấm "Gửi".
  4. Hệ thống phản hồi rõ ràng: **ĐÚNG** hoặc **CHƯA CHÍNH XÁC**. Không áp đặt điểm số gây áp lực trong bước luyện tập rèn luyện.
  5. Hiển thị lời giải chi tiết 4 bước: Tóm tắt đề bài $\to$ Chiến lược giải $\to$ Tính toán KaTeX từng bước $\to$ Cảnh báo bẫy thi vào 10.
  6. Nút "Câu tiếp theo" chọn câu ngẫu nhiên khác không trùng lặp trong phiên.
  7. Tự động ghi nhận câu sai vào **Sổ Tay Lỗ Hổng (Error Notebook)** theo phương pháp Spaced Repetition.

### 4. Phân hệ Thực Tế & Tập Vẽ Hình Vào 10 (`src/views/RealWorldView.tsx`)
- **Nhiệm vụ:** Ứng dụng toán vào đời sống và rèn luyện kỹ năng vẽ hình tự luận chuẩn barem chấm thi vào 10.
- **Sub-modules:**
  - `SpatialSketchpad.tsx`: Bảng vẽ HTML5 Canvas rèn luyện kỹ năng vẽ nét liền (đường nhìn thấy) và nét đứt (đường khuất bên trong $OO', SO, r$).
  - `VolumeParadoxLab.tsx`: Nghịch lý thể tích $1/3$ giữa hình nón và hình trụ.
  - `ArchimedesImmersionLab.tsx`: Thí nghiệm cổ điển Ac-si-mét về mối quan hệ thể tích Trụ – Nón – Cầu ($V_{\text{nón}} : V_{\text{cầu}} : V_{\text{trụ}} = 1 : 2 : 3$).

### 5. Phân hệ Bảng Điều Khiển Giáo Viên (`src/views/TeacherDashboardView.tsx`)
- **Nhiệm vụ:** Quản lý toàn diện tiến độ của học sinh, ngân hàng câu hỏi, video bài giảng và sinh đề thi.
- **Sub-modules:**
  - `TeacherVideosTab.tsx` / `TeacherVideoManager.tsx`: Tải lên, biên tập, quản lý video vật lý lưu trữ bền vững tại `/uploads` và `/server/data/theory_videos.json`.
  - `TeacherQuestionBankTab.tsx`: Duyệt, tìm kiếm và phân loại câu hỏi theo mức độ (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao).
  - `ExamPrepManager.tsx`: Soạn đề thi ôn tập vào 10 tự động qua AI và bóc tách đề từ file Word/MathType.
  - `ClassKnowledgeHeatmap.tsx`: Bản đồ nhiệt phân tích các lỗ hổng kiến thức phổ biến của cả lớp.

---

## PHẦN III: LUỒNG DỮ LIỆU TOÀN HỆ THỐNG (DATA FLOWS)

### 1. Luồng Học Sinh (Student Flow)
```
Học sinh mở ứng dụng
  │
  ├──► [Khám phá 3D]: Chọn Trụ/Nón/Cầu ──► Kéo trượt r, h ──► Xem mô phỏng quay 2D sang 3D
  │                                                      └──► Xem mặt cắt & trải phẳng
  │
  ├──► [Lý thuyết]: Chọn bài học ──► Đọc công thức KaTeX ──► Xem video giáo viên giảng
  │                                                     └──► Tương tác mô hình 3D thu nhỏ
  │
  ├──► [Luyện tập từng câu]:
  │     └──► Lấy ngẫu nhiên 1 câu (ngân hàng không trùng lặp)
  │     └──► Chọn đáp án A, B, C, D (hoặc nhập số / đúng sai)
  │     └──► Bấm "Gửi"
  │     └──► Hiển thị kết quả: ĐÚNG / CHƯA ĐÚNG
  │     └──► Xem lời giải chi tiết 4 bước (KaTeX chuẩn + Cảnh báo bẫy vào 10)
  │     └──► Nếu SAI: Tự động lưu vào "Sổ Tay Lỗ Hổng" (Local Memory + Zustand)
  │     └──► Bấm "Câu tiếp theo" ──► Chọn câu mới ngẫu nhiên
  │
  └──► [Tập vẽ hình vào 10]:
        └──► Chọn mẫu hình (Trụ, Nón, Cầu)
        └──► Vẽ nét liền (đường thấy) & Nét đứt (đường khuất)
        └──► Nét vẽ được lưu trữ bền vững trong LocalStorage, không mất khi đổi tab
        └──► Tải file ảnh PNG về máy
```

### 2. Luồng Giáo Viên (Teacher Flow)
```
Giáo viên mở Bảng Điều Khiển
  │
  ├──► [Quản lý Video]:
  │     └──► Chọn file video (MP4/WebM) từ máy tính
  │     └──► Gửi request POST /api/theory-videos kèm metadata (bài học, khối hình)
  │     └──► Server lưu file vật lý vào thư mục `/uploads`
  │     └──► Server cập nhật chỉ mục `/server/data/theory_videos.json`
  │     └──► Đồng bộ tức thời lên phân hệ học sinh (TheoryVideoService event-bus)
  │
  ├──► [Ngân Hàng Câu Hỏi]:
  │     └──► Xem & lọc hơn 1000 câu hỏi từ masterQuestionBank.json
  │     └──► Kiểm tra công thức KaTeX và đáp án chuẩn
  │
  └──► [Sinh Đề Thi & Bóc Tách Đề]:
        └──► Nhập nội dung đề Word hoặc yêu cầu AI
        └──► Gửi request POST /api/ai-exam-generator hoặc /api/ai-parse-exam
        └──► AI Gemini chuẩn hóa công thức MathType sang KaTeX & tạo hình SVG
        └──► Phê duyệt và giao bài cho học sinh
```

---

## PHẦN IV: ĐÁNH GIÁ MODULE ĐỘC LẬP VÀ PHỤ THUỘC

| Tên Module | Mức độ độc lập | Các thành phần phụ thuộc | Nguy cơ tiềm ẩn |
| :--- | :--- | :--- | :--- |
| **MathFormula / MathText** | Độc lập cao | KaTeX library (CDN hoặc local) | Lỗi hiển thị nếu công thức chứa ký tự đặc biệt không thoát chuỗi hoặc CDN bị chặn |
| **ThreeDViewer & 3D Models** | Độc lập vừa | Three.js, Canvas WebGL context | Rò rỉ bộ nhớ (memory leak) nếu không dispose geometry/material khi unmount |
| **SpatialSketchpad (Bảng vẽ)** | Độc lập cao | HTML5 Canvas 2D API | Mất nét vẽ khi unmount nếu chỉ lưu trong RAM component |
| **SingleQuestionPracticeFlow** | Phụ thuộc | `masterQuestionBank.json`, `useErrorMemoryStore`, `AppContext` | Nếu ngân hàng câu hỏi rỗng hoặc format sai sẽ gây crash luồng làm bài |
| **TheoryVideoService** | Phụ thuộc | `/api/theory-videos`, Express Server, LocalStorage fallback | Nếu server mất kết nối, cần fallback mượt mà về dữ liệu mẫu có sẵn |
| **AICorrectionCard** | Phụ thuộc | `/api/ai-tutor`, Gemini API, `solutionGenerator.ts` | Nếu thiếu API Key hoặc lỗi mạng, phải chuyển sang bộ giải thuật toán offline có sẵn |

---

## PHẦN V: BÁO CÁO PHÂN LOẠI & LIỆT KÊ TẤT CẢ LỖI (BUG REPORT)

Dựa trên kiểm toán mã nguồn toàn diện, hệ thống ghi nhận các điểm cần tối ưu hóa và hoàn thiện theo 5 nhóm ưu tiên:

### NHÓM 1: LỖI DỮ LIỆU & LƯU TRỮ BỀN VỮNG (DATA PERSISTENCE)
* **BUG-DP-01 (SpatialSketchpad Canvas Paths)**
  * **Vị trí:** `src/components/real-world/SpatialSketchpad.tsx`
  * **Mức độ nghiêm trọng:** Trung bình (Medium)
  * **Nguyên nhân gốc rễ:** Lịch sử nét vẽ `paths` được lưu trong `useState` của component. Khi học sinh chuyển tab (ví dụ sang Lý thuyết hoặc Luyện tập) rồi quay lại, component bị re-mount và mảng `paths` bị reset về rỗng, khiến nét vẽ của học sinh bị biến mất.
  * **Giải pháp:** Tích hợp đồng bộ tự động `localStorage` (`GEOMETRY_LAB_SKETCHPAD_PATHS`) kèm debounce, tự động nạp lại khi mount và dọn sạch khi bấm "Xóa hết".
* **BUG-DP-02 (Video Upload Server Persistence)**
  * **Vị trí:** `server/theoryVideoStorage.ts` & `src/services/theoryVideoService.ts`
  * **Mức độ nghiêm trọng:** Đã được kiểm soát tốt (Low - Good)
  * **Đánh giá:** Server đã lưu file vật lý vào `/uploads` và ghi metadata vào `/server/data/theory_videos.json`. Cần đảm bảo quyền đọc/ghi thư mục tự động khởi tạo khi chưa tồn tại thư mục `uploads`.

### NHÓM 2: LỖI CÔNG THỨC TOÁN HỌC (MATH RENDERING)
* **BUG-MR-01 (KaTeX Display CSS & CDN Fallback)**
  * **Vị trí:** `index.html` & `src/components/common/MathFormula.tsx`
  * **Mức độ nghiêm trọng:** Cao (High)
  * **Nguyên nhân gốc rễ:** KaTeX CSS được nhúng qua CDN `cdn.jsdelivr.net`. Trong môi trường mạng trường học bị chặn CDN hoặc mạng lag, các ký hiệu $\pi, r^2, \sqrt{\dots}$ có thể bị vỡ font hiển thị.
  * **Giải pháp:** Đảm bảo `MathFormula.tsx` xử lý an toàn: chuẩn hóa dấu `\`, tự động sửa lỗi ký tự LaTeX không hợp lệ trước khi gọi `katex.renderToString`, và bổ sung inline CSS styling dự phòng.

### NHÓM 3: LỖI GIAO DIỆN & RESPONSIVE TRÊN THIẾT BỊ DI ĐỘNG (RESPONSIVE)
* **BUG-RS-01 (Mobile Canvas & Math Formula Overflow)**
  * **Vị trí:** `src/components/common/MathFormula.tsx` & `src/components/real-world/SpatialSketchpad.tsx`
  * **Mức độ nghiêm trọng:** Trung bình (Medium)
  * **Nguyên nhân gốc rễ:** Trên màn hình điện thoại (<380px), các công thức dài như diện tích toàn phần $S_{tp} = 2\pi r h + 2\pi r^2$ hoặc bảng vẽ canvas có thể bị co tràn mép nếu không có thanh cuộn ngang mượt mà.
  * **Giải pháp:** Bổ sung class `.katex-display { overflow-x: auto; -webkit-overflow-scrolling: touch; }` và đảm bảo kích thước canvas linh hoạt theo chiều rộng container (`ResizeObserver`).

### NHÓM 4: LỖI LOGIC HỌC TẬP (LEARNING LOGIC)
* **BUG-LL-01 (Luyện tập từng câu - Áp lực điểm số không phù hợp mục tiêu luyện tập)**
  * **Vị trí:** `src/components/practice/SingleQuestionPracticeFlow.tsx` & `AICorrectionCard.tsx`
  * **Mức độ nghiêm trọng:** Trung bình (Medium)
  * **Nguyên nhân gốc rễ:** Yêu cầu sư phạm chỉ rõ: *"Khi học sinh nộp bài, hệ thống hiển thị: ĐÚNG hoặc SAI. KHÔNG CHẤM ĐIỂM ngay tại bước này. Mục tiêu là HIỂU $\to$ THỬ $\to$ SAI $\to$ XEM GIẢI THÍCH $\to$ LÀM LẠI"*. Việc hiển thị chấm điểm chi tiết gây tâm lý kiểm tra căng thẳng thay vì tạo không gian an toàn để học sinh thử nghiệm và học từ sai lầm.
  * **Giải pháp:** Tinh chỉnh thông báo nộp bài thành nhãn trạng thái trực quan: **ĐÚNG (Chính xác)** hoặc **CHƯA CHÍNH XÁC (Cần khắc phục)**, tập trung toàn bộ trọng tâm vào bảng giải thích chi tiết 4 bước của Thầy Hiếu AI.

### NHÓM 5: LỖI HIỆU NĂNG & MÔ HÌNH 3D (PERFORMANCE & 3D)
* **BUG-PF-01 (Three.js Animation Loop & Canvas Cleanup)**
  * **Vị trí:** `src/components/explore/3d/CylinderModel.tsx`, `ConeModel.tsx`, `SphereModel.tsx`
  * **Mức độ nghiêm trọng:** Trung bình (Medium)
  * **Nguyên nhân gốc rễ:** Khi học sinh liên tục chuyển đổi giữa các khối hình (Trụ $\leftrightarrow$ Nón $\leftrightarrow$ Cầu), các instance WebGLRenderer, Geometries và Materials cần được giải phóng triệt để (`dispose()`) và `cancelAnimationFrame` để tránh tiêu hao GPU/RAM.
  * **Giải pháp:** Đảm bảo tất cả useEffect dọn sạch đầy đủ `renderer.dispose()`, `geometry.dispose()`, `material.dispose()`.

---

## KẾT LUẬN & BƯỚC TIẾP THEO

Kiến trúc hiện tại của dự án **GEOMETRY LAB** rất vững chắc, phân tách rõ ràng giữa Client (React 19 + Tailwind + KaTeX + Three.js) và Server (Express + Video File Storage + Gemini AI). 

Kế hoạch hành động theo quy trình:
1. Hoàn thiện việc lưu trữ bền vững cho nét vẽ (`SpatialSketchpad.tsx`) với LocalStorage.
2. Tối ưu giao diện luyện tập từng câu chuẩn quy tắc "ĐÚNG / SAI - Tập trung vào giải thích sư phạm 4 bước".
3. Kiểm tra độ ổn định của toàn bộ 3D models, KaTeX formula render và responsiveness.
4. Chạy `compile_applet` và `lint_applet` để nghiệm thu cuối cùng.
