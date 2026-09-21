# PROJECT STATE: GEOMETRY LAB (HIỆN TRẠNG KỸ THUẬT THỰC TẾ)

**Ngày cập nhật:** 19/09/2026  
**Mục đích:** Ghi nhận chính xác 100% hiện trạng kiến trúc, dữ liệu, lưu trữ, video, game, và các lỗi tồn tại trước khi tiến hành can thiệp code.

---

## 1. KIẾN TRÚC THỰC TẾ HIỆN TẠI (ACTUAL CURRENT ARCHITECTURE)

- **Frontend:**
  - React 19 (`19.0.0`), Vite 6 (`6.2.0`), Tailwind CSS 4 (`4.0.0`).
  - Toàn bộ ứng dụng điều phối bằng Custom State Router qua Hash URL (`src/context/AppContext.tsx`).
  - Phân vùng an ninh người dùng: `src/components/auth/AuthGate.tsx` chia tách 4 trạng thái (`AUTH_LOADING`, `UNAUTHENTICATED`, `STUDENT_AUTHENTICATED`, `TEACHER_AUTHENTICATED`).
- **Backend:**
  - Node.js với Express 4 (`4.21.2`), đóng gói bằng `esbuild` thành file đơn CommonJS `dist/server.cjs`.
  - Phục vụ API RESTful trên cổng `3000` và tích hợp Vite Middleware trong chế độ phát triển.
  - Vercel Serverless entry: `api/index.ts` forward request sang instance Express.

---

## 2. HIỆN TRẠNG DATABASE (CURRENT DATABASE REALITY)

- **Database bên ngoài:** **KHÔNG CÓ** (Không có Cloud SQL, PostgreSQL, MySQL, MongoDB, Firebase Firestore hay Supabase).
- **Lưu trữ Server-side:**
  - Sử dụng file JSON tĩnh trên ổ đĩa cục bộ:
    - `/server/data/theory_videos.json`: Danh sách metadata video bài học.
    - `/server/data/shape_video_assignments.json`: Ánh xạ video chính thức cho từng hình học.
    - `/server/data/student_progress.json`: Tiến trình và mức độ hoàn thành bài tập của học sinh.
    - `/server/data/student_errors.json`: Ghi nhận lỗi sai toán học.
- **Lưu trữ Client-side:**
  - Trình duyệt `localStorage` lưu trữ danh sách tài khoản học sinh (`geometry_lab_student_roster_v3`), phiên đăng nhập, huy hiệu và điểm số game.

---

## 3. HIỆN TRẠNG LƯU TRỮ TẬP TIN (CURRENT STORAGE REALITY)

- **Ổ đĩa cục bộ:**
  - `/uploads/videos/`: Chứa file video bài giảng đã tải lên.
  - `/uploads/thumbnails/`: Chứa ảnh bìa video.
  - `/uploads/teacher/<userId>/<videoId>/`: Chứa file video do giáo viên tải lên theo cấu trúc phân quyền người dùng.
- **Vercel Blob Storage:**
  - Mã nguồn đã tích hợp thư viện `@vercel/blob`, sẵn sàng cấp token tải lên trực tiếp từ client qua endpoint `POST /api/theory-videos/vercel-blob-token`.
  - Phụ thuộc biến môi trường `BLOB_READ_WRITE_TOKEN`. Nếu biến này chưa được cài đặt trên Vercel, chức năng lưu trữ đám mây sẽ chuyển sang trạng thái chờ.

---

## 4. HIỆN TRẠNG VIDEO (CURRENT VIDEO REALITY)

- **Chính sách Zero-Fake:** Toàn bộ hệ thống không chứa bất kỳ video hoạt họa Canvas hay mock data nào.
- **Tập tin video vật lý:**
  - Đã có các file video gốc sẵn trong thư mục công khai:
    - `/public/videos/trụ.mp4` (và `/public/assets/videos/tru.mp4`)
    - `/public/videos/nón.mp4` (và `/public/assets/videos/non.mp4`)
    - `/public/videos/cầu.mp4` (và `/public/assets/videos/cau.mp4`)
- **Cơ chế phát video:**
  - Trình phát `src/components/video/TheoryVideoPlayer.tsx` sử dụng thẻ `<video>` HTML5 nguyên bản.
  - Máy chủ hỗ trợ HTTP 206 Partial Content (HTTP Range Requests) cho phép tua video trực tiếp mà không bị gián đoạn.

---

## 5. HIỆN TRẠNG MINI-GAME (CURRENT GAME REALITY)

- **View:** `src/views/GeometryMasterGameView.tsx`.
- **Canvas:** `src/components/game/GameCanvas.tsx`.
- **Logic vòng lặp:**
  - Vòng lặp `requestAnimationFrame` đang cộng trực tiếp gia tốc trọng lực và vận tốc cố định mỗi khung hình mà **không nhân với `deltaTime`**.
  - Tốc độ di chuyển và độ khó đang phụ thuộc vào tần số quét màn hình (Refresh Rate: 60Hz vs 120Hz/144Hz).

---

## 6. HIỆN TRẠNG DEPLOYMENT (CURRENT DEPLOYMENT REALITY)

- **Môi trường Cloud Run / Container:**
  - Script build: `npm run build` tạo `/dist` và `dist/server.cjs`.
  - Script start: `node dist/server.cjs` lắng nghe `0.0.0.0:3000`.
  - Ổ đĩa cục bộ hoạt động bền vững trong suốt vòng đời của container.
- **Môi trường Vercel:**
  - Cấu hình qua `vercel.json` điều hướng route `/api/*` về `api/index.ts`.
  - Thư mục ứng dụng là Read-Only (`EROFS`), thư mục `/tmp` là Ephemeral (bị xóa khi Lambda kết thúc phiên).

---

## 7. DANH SÁCH LỖI HIỆN TẠI (CURRENT KNOWN ISSUES & ROOT CAUSES)

1. **Vật lý Game phụ thuộc tần số quét màn hình:**
   - *Vị trí:* `src/components/game/GameCanvas.tsx` (dòng 407–408, 461–465).
   - *Nguyên nhân:* Thiếu tham số `deltaTime`. Trên màn hình 120Hz (iPad Pro, MacBook Pro, điện thoại đời mới), game chạy nhanh gấp 2 đến 4 lần so với màn hình 60Hz thông thường.
2. **Nguy cơ lỗi HTTP 413 trên Vercel khi tải video lớn:**
   - *Vị trí:* Endpoint `/api/theory-videos/upload`.
   - *Nguyên nhân:* Vercel giới hạn body request serverless tối đa 4.5MB. Video từ 10MB đến 100MB sẽ bị từ chối với mã 413 Payload Too Large nếu tải qua serverless thay vì upload trực tiếp lên Vercel Blob.
3. **Mất dữ liệu và Video metadata trên Vercel sau khi Lambda khởi động lại:**
   - *Vị trí:* `server/data/*.json` và `/tmp/geometry_lab/`.
   - *Nguyên nhân:* Không có database bền vững bên ngoài. Dữ liệu ghi trên `/tmp` của Lambda sẽ bị xóa sạch khi container scale về 0.
4. **Lỗi HTTP 500 khi lưu file vào hệ thống tập tin Read-Only của Vercel:**
   - *Vị trí:* `server/theoryVideoStorage.ts`.
   - *Nguyên nhân:* Gọi `fs.mkdirSync` hoặc `multer.diskStorage` trực tiếp tại thư mục root `/uploads` mà không có fallback an toàn sang `/tmp` hoặc Vercel Blob.
5. **Thời gian hiển thị kết quả Đúng/Sai trong Game quá ngắn (Flash Feedback):**
   - *Vị trí:* `src/components/game/QuestionModal.tsx`.
   - *Nguyên nhân:* Thời gian delay chuyển tiếp chỉ 200ms, học sinh không kịp tiếp thu phản hồi sư phạm trước khi modal đóng lại.

---

## 8. CÁC ĐIỂM CHƯA XÁC ĐỊNH (UNKNOWN AREAS)

- **Khóa Vercel Blob Token thực tế trên production:** `UNKNOWN` (Hiện tại chưa cấu hình trong môi trường container AI Studio).
- **Hệ cơ sở dữ liệu phân tán tương lai cho đa trường học:** `UNKNOWN` (Dự án hiện được thiết kế tối ưu cho 01 giáo viên ThS. Trần Ngọc Hiếu và học sinh Trường Phổ Thông Thực Hành Sư Phạm).
