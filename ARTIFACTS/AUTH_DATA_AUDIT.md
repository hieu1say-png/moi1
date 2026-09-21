# BÁO CÁO KIỂM TOÁN CHUYÊN SÂU: AUTHENTICATION, AUTHORIZATION & DỮ LIỆU BỀN VỮNG (AUTH & DATA AUDIT)

**Hệ thống:** GEOMETRY LAB (Phòng Thí Nghiệm Hình Học Toán 9)  
**Ngày thực hiện:** 19/09/2026  
**Phạm vi:** Rà soát toàn bộ luồng đăng nhập, phiên làm việc, phân quyền Role, xác thực phía máy chủ, cơ chế lưu trữ dữ liệu (Client vs Server), và mức độ an toàn của dữ liệu.

---

## 1. MỤC TIÊU CỐT LÕI (SECURITY & FUNCTIONAL GOALS)

1. **Giáo viên (Teacher - ThS. Trần Ngọc Hiếu):**
   - Quản lý video bài giảng (Upload, Gán video cho khối hình, Xuất bản, Xóa).
   - Quản lý danh sách tài khoản học sinh (Tạo mới, Đặt lại mật khẩu, Khóa/Mở khóa tài khoản).
   - Giám sát toàn bộ tiến độ, ma trận nhận thức không gian và điểm bài tập của cả lớp.
2. **Học sinh (Students - Lớp 9A2, 9A3):**
   - Học lý thuyết, tương tác trực quan mô hình 3D.
   - Chỉ được xem các video đã được giáo viên **Xuất bản (`PUBLISHED`)**.
   - Làm bài luyện tập, bài thi thử, chơi mini-game, trao đổi cùng Gia sư AI.
   - Tuyệt đối **KHÔNG** thể gọi API quản trị hoặc xem các video nháp (`DRAFT`).
3. **Nguyên tắc vàng:**
   - **KHÔNG ĐƯỢC TIN CẬY ROLE CHỈ TỪ CLIENT / LOCALSTORAGE.**
   - Mọi thao tác của giáo viên đều phải được xác thực và cấp quyền chặt chẽ trên máy chủ (Server-side Verification).

---

## 2. KẾT QUẢ KIỂM TOÁN TỪNG HẠNG MỤC (DEEP-DIVE AUDIT)

### 2.1. Đăng nhập Giáo viên (Teacher Login)
- **Hiện trạng:**
  - Client: `src/services/teacherAuthService.ts` và `src/context/AuthContext.tsx`.
  - Mật khẩu được băm SHA-256 trên trình duyệt bằng Web Crypto API và so sánh với giá trị băm lưu tại `localStorage` (`geometry_lab_teacher_pwd_hash` hoặc giá trị mặc định ban đầu `d309aeeae7b4f478cb6101f92b0e99c0987950c16521a755366d5553a22838b4`).
  - Sau khi kiểm tra khớp trên client, hàm ghi nhận phiên vào `localStorage` (`geometry_lab_teacher_session`).
- **Lỗ hổng & Rủi ro:**
  - Logic xác minh mật khẩu giáo viên diễn ra chủ yếu ở **Client-Side**. Nếu kẻ tấn công mở DevTools chỉnh sửa biến trong `localStorage` hoặc can thiệp mã JavaScript trong bộ nhớ, giao diện client sẽ chuyển sang trạng thái Giáo viên.
  - Sau khi đăng nhập thành công trên client, hệ thống mới gọi bất đồng bộ tới `/api/auth/token` qua hàm `TheoryVideoService.ensureSignedToken()`. Nếu request này thất bại hoặc bị chặn, client vẫn giữ trạng thái Teacher trên UI nhưng server không có token hợp lệ.

### 2.2. Đăng nhập Học sinh (Student Login)
- **Hiện trạng:**
  - Client: `src/context/AuthContext.tsx` (hàm `loginStudent`).
  - Danh sách học sinh được duyệt từ `studentRoster` nạp từ `localStorage.getItem('geometry_lab_student_roster_v3')`.
  - Mật khẩu học sinh được so sánh trực tiếp hoặc qua SHA-256 trên trình duyệt.
- **Lỗ hổng & Rủi ro:**
  - Toàn bộ cơ sở dữ liệu học sinh chỉ nằm trong `localStorage` của trình duyệt hiện tại.
  - Trên server (`server.ts` dòng 348–369), endpoint `POST /api/auth/token` khi nhận `role: "student"` sẽ **tự động cấp token học sinh có chữ ký HMAC mà KHÔNG HỀ kiểm tra mật khẩu hay đối soát với danh sách học sinh**! Bất kỳ ai gửi request `{ "role": "student", "username": "anyone" }` đều nhận được token học sinh hợp lệ.

### 2.3. Quản lý Phiên (Session Management)
- **Hiện trạng:**
  - Client duy trì song song `StudentSession` và `TeacherSession` trong state của `AuthContext` và đồng bộ vào `localStorage`.
  - Server duy trì token định dạng `<payloadBase64>.<hmacSignature>` kèm cookie `edu_session_token` (Max-Age: 7 ngày).
- **Lỗ hổng & Rủi ro:**
  - Chưa có cơ chế thu hồi token (Token Revocation / Blacklist) khi giáo viên bấm Đăng xuất. Token HMAC vẫn có hiệu lực trong 7 ngày nếu bị rò rỉ.
  - Biến bí mật `SERVER_AUTH_SECRET` trên server nếu không có biến môi trường sẽ fallback về chuỗi tĩnh: `"geometry_lab_master_secret_2026_toan9_longduc"`. Bất kỳ ai đọc mã nguồn công khai đều có thể tự tạo chữ ký HMAC giả mạo quyền Giáo viên!

### 2.4. Phân định Vai trò (Role Enforcement)
- **Hiện trạng:**
  - Phía Client: `AuthGate.tsx` dựa vào `activeRole` để quyết định hiển thị `TeacherAppLayout` hay `StudentAppLayout`.
  - Phía Server: Middleware `requireTeacherAuth` trong `server/auth.ts` kiểm tra `user.role === 'teacher'`.
- **Lỗ hổng & Rủi ro:**
  - Trong `server/auth.ts` (dòng 153–160), hàm `getAuthenticatedUser` có đoạn code kiểm tra header đặc biệt:
    ```typescript
    const teacherSecret = req.headers["x-teacher-secret"] || req.headers["x-teacher-hash"];
    if (typeof teacherSecret === "string" && validateTeacherCredentials(TEACHER_USERNAME, teacherSecret)) {
      return { userId: ..., role: "teacher", username: TEACHER_USERNAME };
    }
    ```
    Nếu kẻ xấu biết được hash mật khẩu giáo viên (đã nằm trong source code client `teacherAuthService.ts`), họ chỉ cần đính kèm header `x-teacher-hash: d309aeeae...` vào bất kỳ request nào để vượt qua mọi cổng bảo mật server mà không cần đăng nhập!

### 2.5. Cơ chế Ủy quyền (Authorization) trên các tài nguyên nhạy cảm
- **Các API đã được bảo vệ bằng `requireTeacherAuth`:**
  - `POST /api/theory-videos/upload`: Tải file video lên server.
  - `POST /api/theory-videos/upload-and-assign`: Tải và gán video cho hình học.
  - `POST /api/theory-videos/assign`: Gán video có sẵn cho hình học.
  - `POST /api/theory-videos/reset-defaults`: Khôi phục video mặc định.
- **Các API chưa được bảo vệ đầy đủ:**
  - Các thao tác quản lý danh sách học sinh (`src/services/teacherStudentService.ts`) hoàn toàn chạy ở client, **chưa có các endpoint server tương ứng** như `GET /api/teacher/students`, `POST /api/teacher/students`, `DELETE /api/teacher/students/:id`.

### 2.6. Cơ sở dữ liệu & Dữ liệu bền vững (Database & Persistence Reality)
- **Hiện trạng:**
  - **Hoàn toàn không có hệ quản trị CSDL quan hệ hay NoSQL độc lập** (không có Cloud SQL, PostgreSQL, Firebase, Supabase).
  - Dữ liệu video nằm trong `/server/data/theory_videos.json`.
  - Dữ liệu gán video nằm trong `/server/data/shape_video_assignments.json`.
  - Dữ liệu tiến độ học sinh nằm trong `/server/data/student_progress.json`.
  - Dữ liệu danh sách học sinh nằm trong `localStorage` trình duyệt của giáo viên.
- **Hậu quả nghiêm trọng:**
  - **Hiện tượng "Bóng ma thiết bị" (Device Isolation):** Nếu giáo viên dùng máy tính ở trường tạo tài khoản cho học sinh mới, tài khoản đó chỉ lưu trên trình duyệt của chiếc máy tính đó. Khi học sinh dùng điện thoại hoặc máy tính ở nhà để đăng nhập, hệ thống sẽ báo không tìm thấy tài khoản!
  - **Mất dữ liệu trên môi trường Serverless (Vercel):** Các file JSON trong `/server/data` hoặc `/tmp` sẽ bị xóa sạch mỗi khi Lambda tái tạo container.

### 2.7. So sánh `localStorage` vs `sessionStorage`
- Dự án sử dụng 100% `localStorage` cho tất cả các khóa phiên, thông tin người dùng và tiến độ bài tập.
- Không sử dụng `sessionStorage`.
- **Rủi ro:** Khi người dùng sử dụng chung máy tính tại phòng máy của trường, nếu học sinh quên bấm Đăng xuất, phiên đăng nhập vẫn tồn tại vĩnh viễn trong `localStorage`, cho phép người sau truy cập dữ liệu của người trước.

---

## 3. DANH SÁCH CÁC TẬP TIN CẦN SỬA ĐỔI & LÝ DO (FILES TO BE REFACTORED)

| STT | Tập tin cần sửa | Lý do kỹ thuật | Mức độ rủi ro hiện tại |
| :--- | :--- | :--- | :--- |
| **1** | `server/auth.ts` | 1. Xóa bỏ cửa sau (backdoor) nhận `x-teacher-hash` từ header mà không có token hợp lệ.<br>2. Yêu cầu `SERVER_AUTH_SECRET` ngẫu nhiên bảo mật hơn, cảnh báo khi dùng secret mặc định.<br>3. Thêm hàm kiểm tra mật khẩu học sinh khi cấp token. | **CRITICAL (CỰC KỲ NGUY HIỂM)** |
| **2** | `server.ts` | 1. Endpoint `POST /api/auth/token`: Bổ sung xác thực mật khẩu học sinh thay vì tự động cấp token.<br>2. Bổ sung các RESTful endpoints quản trị danh sách học sinh: `GET /api/teacher/students`, `POST /api/teacher/students`, `PUT /api/teacher/students/:id/status`, `PUT /api/teacher/students/:id/password` được bảo vệ bởi `requireTeacherAuth`.<br>3. Lưu trữ danh sách học sinh vào file JSON bền vững phía server (`server/data/students.json`). | **HIGH (CAO)** |
| **3** | `src/services/teacherAuthService.ts` | 1. Chuyển luồng xác thực đăng nhập từ thuần client sang gọi API server: client gửi thông tin đăng nhập, server xác thực và trả về Token có chữ ký số.<br>2. Xóa bỏ việc so sánh hash mật khẩu cục bộ trên client. | **HIGH (CAO)** |
| **4** | `src/services/teacherStudentService.ts` | Chuyển đổi toàn bộ thao tác CRUD học sinh từ `localStorage` sang gọi các endpoint API máy chủ (`/api/teacher/students`), sử dụng `localStorage` chỉ làm bộ đệm ngoại tuyến (Offline Cache). | **HIGH (CAO)** |
| **5** | `src/context/AuthContext.tsx` | 1. Đồng bộ luồng đăng nhập học sinh và giáo viên thông qua API server.<br>2. Đảm bảo token HMAC được lưu trữ nhất quán trước khi chuyển hướng trạng thái `AUTHENTICATED`. | **MEDIUM (TRUNG BÌNH)** |
| **6** | `server/studentProgressStorage.ts` | Kết nối dữ liệu điểm số, bài tập và tiến độ từ client lên máy chủ một cách tự động, thay vì chỉ lưu trên bộ nhớ tạm của trình duyệt. | **MEDIUM (TRUNG BÌNH)** |

---

## 4. KẾT LUẬN & ĐỀ XUẤT KIẾN TRÚC CHO CÁC BƯỚC TIẾP THEO

1. **Về An ninh & Xác thực:**
   - Cần chuyển ngay luồng đăng nhập của cả Giáo viên và Học sinh về Server-Authoritative: Máy chủ là nơi duy nhất xác nhận tính hợp lệ của mật khẩu và cấp Token phiên.
   - Loại bỏ hoàn toàn cơ chế cho phép nâng quyền bằng header `x-teacher-hash`.
2. **Về Cơ sở dữ liệu:**
   - Tạo bộ lưu trữ học sinh tập trung phía máy chủ (`server/data/students.json`), giúp đồng bộ danh sách học sinh giữa giáo viên và học sinh trên mọi thiết bị.
   - Đảm bảo quyền truy cập file video: Học sinh chỉ xem được video có trạng thái `PUBLISHED`.
3. **Phạm vi tuân thủ:**
   - Trong bước này: **KHÔNG** sửa code chức năng, **KHÔNG** can thiệp UI lớn, **KHÔNG** tải lên video. Mọi phân tích đã được ghi lại đầy đủ và khách quan để chuẩn bị cho giai đoạn chuẩn hóa tiếp theo.
