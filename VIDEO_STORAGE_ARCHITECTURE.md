# TÀI LIỆU KIẾN TRÚC LƯU TRỮ VIDEO BÀI GIẢNG (VIDEO STORAGE ARCHITECTURE)
## Dự án: Geometry Lab (Toán 9 - Hình Học Không Gian Thực Nghiệm)

---

### 1. NGUYÊN TẮC THIẾT KẾ ĐẶT LÊN HÀNG ĐẦU
1. **Zero-Serverless-Binary Transfer**: Không bao giờ truyền file video qua request body của Vercel Serverless Functions.
2. **Direct Browser-to-Object Storage**: Trình duyệt tải thẳng dữ liệu video lên Vercel Blob thông qua giao thức chuẩn multipart.
3. **Atomic Shape Assignment**: Gán video vào 3 hình học cơ bản (`cylinder`, `cone`, `sphere`) một cách nguyên tử (atomic) và đồng bộ tức thì với học sinh.
4. **Resilient Dual Environment Strategy**:
   - Môi trường Vercel Cloud: 100% Vercel Blob Object Storage công khai qua CDN.
   - Môi trường Local Development: Hỗ trợ tự động fallback khi chưa có token để lập trình viên kiểm thử cục bộ mượt mà.
5. **No Fake Storage Policy**: Nghiêm cấm giả lập upload, không dùng timeout ảo để giả vờ tải xong, không lưu video binary vào Firestore hay LocalStorage.

---

### 2. SƠ ĐỒ LUỒNG DỮ LIỆU TỔNG THỂ (DATA FLOW ARCHITECTURE)

```
+---------------------------------------------------------------------------------------+
|                                    CLIENT BROWSER                                     |
|  +---------------------------+   +-------------------------------+                    |
|  |   TeacherVideosTab.tsx    |   | TheoryVideoService.ts         |                    |
|  | - Drag & Drop MP4 Video   |-->| - validateVideoFile()         |                    |
|  | - Progress bar (real-time)|   | - @vercel/blob/client upload()|                    |
|  +---------------------------+   +---------------+---------------+                    |
+--------------------------------------------------|------------------------------------+
                                                   |
           +---------------------------------------+----------------------------------+
           | (1) POST /api/theory-videos/blob-upload                                  | (3) Direct Upload
           |     Headers: { Authorization: "Bearer <teacher_jwt>" }                   |     Multipart Stream
           |     Body: { type: "blob.generate-client-token", pathname: "..." }        |     File: 5MB - 500MB
           v                                                                          v
+-------------------------------+                                      +-------------------------------+
|    VERCEL SERVERLESS API      |                                      |   VERCEL BLOB OBJECT STORE    |
| (server.ts / theoryVideoRoute)|                                      |   (Edge Distributed Storage)  |
|                               |                                      |                               |
| - Verify Teacher Role (JWT)   |                                      | - Chunk-level multi-stream    |
| - Generate Blob Client Token  |                                      | - Global CDN Caching          |
| - Return token JSON (<1KB)    |                                      | - Byte-range HTTP streaming   |
+---------------+---------------+                                      +---------------+---------------+
                |                                                                      |
                | (2) Return client token                                              | (4) Permanent CDN URL
                +---------------------------------+  +---------------------------------+
                                                  |  |
                                                  v  v
+---------------------------------------------------------------------------------------+
|                                    CLIENT BROWSER                                     |
|                                                                                       |
|  TheoryVideoService.uploadAndAssignVideo(shape, file, title, onProgress)              |
|  -> Nhận CDN URL: "https://public.blob.vercel-storage.com/teacher/.../vid.mp4"        |
|  -> (5) Gửi Metadata nhẹ (<2KB) tới Server                                            |
+--------------------------------------------------|------------------------------------+
                                                   |
                                                   | (5) POST /api/theory-videos/create-and-assign
                                                   |     Body: { shape, videoUrl, title, fileName, size }
                                                   v
+---------------------------------------------------------------------------------------+
|                           VERCEL SERVERLESS METADATA ENGINE                           |
|                                                                                       |
| 1. PersistentTheoryVideoStorage.createVideo(metadata)                                 |
|    - Cập nhật 18 Canonical Fields (id, title, duration, size, ownerId, status: "READY")|
| 2. PersistentTheoryVideoStorage.assignVideoToShape(shape, videoId)                    |
|    - Cập nhật ánh xạ chính thức:                                                      |
|        cylinder -> VIDEO-CYLINDER-XXXX                                                |
|        cone     -> VIDEO-CONE-XXXX                                                    |
|        sphere   -> VIDEO-SPHERE-XXXX                                                  |
| 3. Đồng bộ JSON state file an toàn (server/data/persistentTheoryVideos.json)         |
+--------------------------------------------------|------------------------------------+
                                                   |
                                                   | (6) Server response: { success: true, assignments }
                                                   v
+---------------------------------------------------------------------------------------+
|                               STUDENT & TEACHER VIEWS                                 |
|                                                                                       |
| - TeacherVideosTab: Hiển thị badge "Đã gán chính thức", nút "Xem video"              |
| - TheoryView (Học sinh): Tự động phát video chính thức được giáo viên gán            |
| - LessonVideo.tsx: HTML5 Video Player với Range request, Play/Pause, PiP, Speed 1.0x  |
+---------------------------------------------------------------------------------------+
```

---

### 3. CÁC ĐẶC TẢ CHI TIẾT CỦA CÁC THÀNH PHẦN

#### A. Xác thực và Phân quyền (Authentication & Authorization)
- Chỉ giáo viên đã xác thực (`role === "teacher"`, tài khoản `hieu1say` / ThS. Trần Ngọc Hiếu) mới được phép yêu cầu token tải lên tại `/api/theory-videos/blob-upload` và lưu metadata tại `/api/theory-videos/create-and-assign`.
- Token phía máy khách được sinh thông qua `generateClientTokenFromReadWriteToken` với thời hạn ngắn, chỉ áp dụng cho đường dẫn cụ thể `teacher/<userId>/videos/<videoId>/<cleanFileName>`.
- Học sinh và khách vãng lai chỉ có quyền đọc (`GET /api/theory-videos` và `GET /api/theory-videos/assignments`), không thể can thiệp hoặc ghi đè video của giáo viên.

#### B. Ánh xạ Hình học Chuẩn (Standard Geometric Shape Mapping)
- `cylinder` ──► Video bài học Hình Trụ (Công thức $S_{xq} = 2\pi rh$, $S_{tp} = 2\pi rh + 2\pi r^2$, $V = \pi r^2 h$)
- `cone`     ──► Video bài học Hình Nón (Công thức $S_{xq} = \pi rl$, $S_{tp} = \pi rl + \pi r^2$, $V = \frac{1}{3}\pi r^2 h$)
- `sphere`   ──► Video bài học Hình Cầu (Công thức $S = 4\pi R^2$, $V = \frac{4}{3}\pi R^3$)

#### C. Cấu trúc Metadata 18 Trường Chuẩn (Canonical Fields Specification)
Mỗi bản ghi video được lưu trữ đầy đủ các thông tin:
1. `id`: Mã định danh duy nhất (VD: `VIDEO-CYLINDER-5404`).
2. `title`: Tên bài học video tiếng Việt rõ ràng.
3. `description`: Mô tả nội dung bài học Toán 9.
4. `shape` & `shapeType`: Loại hình học không gian (`cylinder` | `cone` | `sphere`).
5. `lessonId`: Mã bài giảng liên kết (`lesson-cylinder`, v.v.).
6. `sectionId`: Phân mục học tập (`THEORY`).
7. `topic`: Tên phân mục hoa (`CYLINDER` | `CONE` | `SPHERE`).
8. `videoUrl` & `downloadURL`: Đường dẫn CDN công khai vĩnh viễn trên Vercel Blob.
9. `storagePath`: Đường dẫn khóa trong kho lưu trữ Object Storage.
10. `fileName` & `originalName`: Tên file gốc do giáo viên tải lên.
11. `fileSize` & `size`: Kích thước tệp tính theo bytes.
12. `mimeType` & `contentType`: Định dạng MIME chuẩn (VD: `video/mp4`).
13. `duration` & `durationSeconds`: Thời lượng video.
14. `status`: Trạng thái xuất bản (`PUBLISHED`).
15. `uploadStatus`: Trạng thái xử lý (`ready`).
16. `visibility`: Mức độ hiển thị (`public` để học sinh xem được ngay).
17. `authorName` & `createdBy`: ThS. Trần Ngọc Hiếu.
18. `createdAt` & `updatedAt`: Dấu thời gian Unix milliseconds.

---

### 4. BIẾN MÔI TRƯỜNG CẦN THIẾT TRÊN VERCEL DASHBOARD
Để kích hoạt tính năng trên môi trường Production của Vercel, người quản trị chỉ cần cấu hình:
- **Tên biến**: `BLOB_READ_WRITE_TOKEN`
- **Giá trị**: Token lấy trực tiếp từ tab **Storage ──► Vercel Blob** trong bảng điều khiển Vercel Project.
- Hệ thống backend tự động nhận diện thông qua `process.env.BLOB_READ_WRITE_TOKEN` và cấp quyền tải lên cho trình duyệt của giáo viên.
