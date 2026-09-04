# NHẬT KÝ THỰC HIỆN NÂNG CẤP (IMPLEMENTATION_LOG.md)

| STT | Thời gian | Hạng mục / Module | File thay đổi | Lý do và Nội dung thay đổi |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 2026-09-02 | Setup & Audit | `/ARTIFACTS/*` | Khởi tạo tài liệu audit kiến trúc, deferred tasks, log thực hiện |
| 2 | 2026-09-02 | Mục H (Font chữ) | `src/index.css`, `index.html` | Thiết lập font Times New Roman chuẩn cho văn bản toàn ứng dụng |
| 3 | 2026-09-02 | Mục F (Video Metadata) | `server/theoryVideoStorage.ts`, `server.ts` | Hoàn thiện 17 trường metadata video theo chuẩn đặc tả |
| 4 | 2026-09-02 | Mục G & D (Phân quyền Server) | `server.ts` | Gắn middleware `requireTeacherAuth` cho toàn bộ các route CRUD video |
| 5 | 2026-09-02 | Mục E (Ngân hàng câu hỏi) | `src/components/practice/*` | Đảm bảo MCQ 4 đáp án, không lộ đáp án trước submit, hiện lời giải 4 bước sau submit |
| 6 | 2026-09-02 | Mục B (Kiến trúc học tập) | `src/views/TheoryView.tsx`, `ExploreView.tsx` | Đảm bảo loading state, error state, empty state và dữ liệu học tập vững chắc |
| 7 | 2026-09-02 | Mục H (Mobile & 3D) | `src/components/explore/*` | Đảm bảo kích thước 3D an toàn, touch target >= 44px, không tràn màn hình |
| 8 | 2026-09-02 | Mục 2 (Separation of Concerns) | `src/services/*`, `server.ts` | Tách biệt hoàn toàn UI -> Service -> API -> Server Storage |
| 9 | 2026-09-02 | Mục 3 (Bảo lưu) | `/ARTIFACTS/DEFERRED_TASKS.md` | Giữ nguyên tuyệt đối không can thiệp logic Mục 3 |
