# GIAI ĐOẠN 1: BẢN ĐỒ KIẾN TRÚC HỆ THỐNG (ARCHITECTURE_PLAN.md)

## 1. BẢN ĐỒ PHÂN CẤP CHỨC NĂNG & QUYỀN HẠN

```
AUTH (Đăng nhập / Phiên làm việc)
  ↓
ROLE (teacher / student)
  ↓
TEACHER ─────────────────────────────── STUDENT
  │                                      │
  ├── Quản lý Lớp & Học sinh            ├── Xem nội dung được cấp phép
  ├── Đổi / Reset mật khẩu               ├── Khám phá 3D (Trụ - Nón - Cầu)
  ├── Quản lý Video (CRUD / Publish)     ├── Xem video bài giảng PUBLISHED
  ├── Quản lý Ngân hàng câu hỏi          ├── Làm bài luyện tập (MCQ từ PDF)
  ├── Soạn & Giao đề thi                 ├── Xem kết quả & Lời giải 4 bước
  └── Theo dõi Tiến độ & Báo cáo        ├── Sổ tay lỗ hổng (Spaced Repetition)
                                         └── Nhận gợi mở từ AI Tutor
  ↓
CONTENT (Nội dung Toán 9: Hình Trụ – Hình Nón – Hình Cầu)
  ↓
THEORY (Lý thuyết chuẩn GDPT + KaTeX + Video bài giảng)
  ↓
3D LAB (Khám phá mô hình 3D, cắt lát, trải phẳng, quay hình 2D)
  ↓
REAL-WORLD PROBLEM (Bài toán thực tế & Bảng vẽ kỹ thuật vào 10)
  ↓
PRACTICE (Luyện tập từng câu ngẫu nhiên không lặp lại)
  ↓
EXAM (Ôn thi vào 10 chuẩn cấu trúc tuyển sinh)
  ↓
PROGRESS (Tiến độ học tập, điểm số, thời gian làm bài)
  ↓
ACHIEVEMENT (Huy hiệu, cấp độ Level, điểm thưởng XP)
  ↓
AI TUTOR (Gia sư Thầy Hiếu AI giải thích sư phạm 4 bước)
```

---

## 2. PHÂN ĐỊNH DỮ LIỆU & LƯU TRỮ (DATA SEPARATION & PERSISTENCE)

| Loại dữ liệu | Tầng lưu trữ | Mức độ bảo vệ | Cơ chế tồn tại (Persistence) |
| :--- | :--- | :--- | :--- |
| **Tài khoản & Phiên đăng nhập** | `localStorage` + Server Session | Bảo mật cao (Cô lập Teacher / Student) | Không bị ghi đè lẫn nhau, sẵn sàng khi tải lại trang |
| **File Video bài giảng** | Object Storage (`/uploads/videos`, `/uploads/thumbnails`) | Kiểm soát truy cập vật lý | Lưu trên ổ đĩa máy chủ, không mất khi restart |
| **Metadata Video bài giảng** | JSON Database (`/server/data/theory_videos.json`) | Phân quyền: Teacher CRUD, Student READ PUBLISHED | Lưu trên đĩa máy chủ, tự động backup |
| **Ngân hàng câu hỏi 1000+** | `src/data/masterQuestionBank.json` | Chuẩn hóa bất biến từ PDF nguồn | Trích xuất nguyên bản 4 đáp án A-B-C-D |
| **Sổ tay lỗ hổng học sinh** | `localStorage` + Zustand `useErrorMemoryStore` | Dữ liệu cá nhân của học sinh | Lưu trữ cục bộ client theo từng ID học sinh |
| **Nét vẽ Bảng vẽ vào 10** | `localStorage` (`GEOMETRY_LAB_SKETCHPAD_PATHS`) | Dữ liệu cục bộ client | Lưu nét vẽ tự động, phục hồi khi đổi tab |
| **Trạng thái UI tạm thời** | React `useState` (Bộ lọc, toggle modal, loading) | UI-only | Tự hủy khi đổi view/unmount |

---

## 3. NGUYÊN TẮC SEPARATION OF CONCERNS (MỤC 2)

```
UI (Views & Components)
  ↓ (gọi qua custom hooks)
HOOKS / STATE (useAuth, useApp, useTeacherStore, useErrorMemoryStore)
  ↓ (gọi qua domain services)
SERVICES (theoryVideoService, teacherStudentService, unifiedAssignmentService)
  ↓ (gọi qua HTTP REST client)
API CLIENT (Fetch requests kèm Authorization header 'teacher' / 'student')
  ↓ (giao thức mạng)
EXPRESS SERVER (server.ts với middleware requireTeacherAuth)
  ↓ (lưu trữ)
STORAGE / DATABASE (Đĩa máy chủ /uploads & JSON metadata)
```

**Cam kết kiến trúc:**
1. Tuyệt đối không để business logic hoặc API key của Gemini nằm trên client.
2. Mọi thao tác quản trị của giáo viên (thêm/sửa/xóa video, quản lý học sinh) đều phải được kiểm tra quyền ở cả Client Guard VÀ Server-side Authorization.
3. Học sinh không thể đọc hoặc chỉnh sửa video ở trạng thái DRAFT / ARCHIVED.
