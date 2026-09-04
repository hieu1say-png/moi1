# BÁO CÁO KIỂM TOÁN NGUỒN DỮ LIỆU VIDEO (VIDEO SOURCE AUDIT REPORT)
**Dự án:** Geometry Lab – Toán Lớp 9  
**Ngày thực hiện:** 2026-09-04  
**Chức danh thực hiện:** Senior Full-Stack Engineer, Software Architect & Database Engineer  
**Trạng thái:** HOÀN THÀNH KIỂM TOÁN & XÁC ĐỊNH DANH SÁCH VI PHẠM (AUDIT COMPLETED)

---

## 1. Mục tiêu kiểm toán dữ liệu Video

Triết lý tối thượng của dự án:
> **"VIDEO KHÔNG PHẢI LÀ DỮ LIỆU DEMO. VIDEO LÀ FILE THẬT DO GIÁO VIÊN TẢI LÊN. KHÔNG CÓ FILE THẬT → KHÔNG CÓ VIDEO. KHÔNG CÓ VIDEO → HIỂN THỊ EMPTY STATE."**  
> **"DATA INTEGRITY > UI ĐẦY ĐỦ."**

Nhiệm vụ kiểm toán: Rà soát toàn bộ dự án từ Database, Mock Repositories, Hardcoded Seed Configurations đến Frontend States để truy tìm tất cả các video ảo, video demo, video giả lập, và loại bỏ triệt để.

---

## 2. Danh sách 4 nhóm Video Ảo / Mock vi phạm nguyên tắc hệ thống

Qua quá trình rà soát toàn bộ tệp tin dự án, đã phát hiện 4 nhóm dữ liệu ảo vi phạm:

| STT | Tên Video / ID vi phạm | Nguồn phát hiện | Bản chất vi phạm |
| :--- | :--- | :--- | :--- |
| **1** | **Cylinder Mock Video**  <br>`theory-video-cylinder-001` / `system-cylinder` / `vid-cyl-01.mp4` | `server/theoryVideoStorage.ts`<br>`src/services/theoryVideoService.ts`<br>`src/config/videoConfig.ts`<br>`server/data/theory_videos.json` | Video được hardcode tự động seed vào hệ thống khi khởi động server, giả mạo dữ liệu bài học mà không có giáo viên tải lên. |
| **2** | **Cone Mock Video**  <br>`theory-video-cone-001` / `system-cone` / `vid-cone-01.mp4` | `server/theoryVideoStorage.ts`<br>`src/services/theoryVideoService.ts`<br>`src/config/videoConfig.ts`<br>`server/data/theory_videos.json` | Video cấu hình mặc định (seed data) tự sinh, vi phạm nguyên tắc "chỉ hiển thị video do giáo viên tải lên". |
| **3** | **Sphere Mock Video**  <br>`theory-video-sphere-001` / `system-sphere` / `vid-sph-01.mp4` | `server/theoryVideoStorage.ts`<br>`src/services/theoryVideoService.ts`<br>`src/config/videoConfig.ts`<br>`server/data/theory_videos.json` | Video cấu hình mặc định (seed data) tự sinh, vi phạm nguyên tắc "chỉ hiển thị video do giáo viên tải lên". |
| **4** | **Dangling & Auto-Generated Mock Videos**  <br>`VIDEO-CYLINDER-4611`, `vid-cyl-02`, `vid-cyl-03`, `vid-cone-02`, `vid-sph-02` | `server/data/theory_videos.json`<br>`scanAndSyncPhysicalVideos()` trong backend<br>`MASTER_THEORY_VIDEO_BANK` | Bản ghi video trong Database trỏ đến file không tồn tại hoặc do hàm quét đĩa tự động gắn metadata giả lập mà không qua quy trình giáo viên tải lên. |

---

## 3. Các vị trí chứa mã nguồn gieo rắc video ảo (Code Injection Points)

1. **`server/theoryVideoStorage.ts`:**
   - Hằng số `DEFAULT_SEED_VIDEOS` chứa 3 video hệ thống hardcode.
   - Hàm `PersistentTheoryVideoStorage.initialize()` tự động gán lại `DEFAULT_SEED_VIDEOS` mỗi khi mảng rỗng hoặc khi khởi động lại server.
   - Hàm `scanAndSyncPhysicalVideos()` chứa từ điển `canonicalMap` tự động tạo mới các video `vid-cyl-01`, `vid-cyl-02`,...
   - Hàm `getAssignments()` tự động gán default về 3 video mock.

2. **`server/data/theory_videos.json` & `server/data/shape_video_assignments.json`:**
   - Chứa các bản ghi của các video ảo kể trên.

3. **`src/services/theoryVideoService.ts`:**
   - Mảng `DEFAULT_THEORY_VIDEOS` trong frontend tự động cung cấp video giả lập nếu backend trả về rỗng hoặc lỗi mạng.

4. **`src/config/videoConfig.ts` & `src/data/shapeVideoConfig.ts`:**
   - Chứa cấu hình `SYSTEM_VIDEOS` gán cứng URL tĩnh cho 3 hình học.

5. **`src/views/TheoryView.tsx`, `TheoryVideoPanel.tsx`, `LessonVideo.tsx`:**
   - Có cơ chế fallback: nếu không tìm thấy video giáo viên thì fallback về `SYSTEM_VIDEOS`. Đây là vi phạm nghiêm trọng cần xóa bỏ.

---

## 4. Kế hoạch hành động dọn dẹp và tái cấu trúc (Remediation Plan)

1. **Làm sạch Database (`server/data/theory_videos.json`):**
   - Đặt mảng JSON thành `[]` (trạng thái khởi đầu hợp lệ: rỗng).
   - Xóa bỏ mọi liên kết trong `shape_video_assignments.json` (`{ cylinder: null, cone: null, sphere: null }`).

2. **Khử bỏ hoàn toàn logic Auto-Seed trong Backend (`server/theoryVideoStorage.ts`):**
   - Loại bỏ việc tự động thêm `DEFAULT_SEED_VIDEOS` vào Database khi khởi tạo server.
   - Cho phép Database hợp lệ ở trạng thái rỗng `[]`.
   - Ngăn chặn hàm scan đĩa tự sinh bản ghi không qua kiểm duyệt của giáo viên.

3. **Khử bỏ Fallback về Mock trong Frontend:**
   - Đặt `DEFAULT_THEORY_VIDEOS` trong frontend thành rỗng `[]`.
   - Xóa bỏ fallback sang `SYSTEM_VIDEOS` trong `TheoryView`, `TheoryVideoPanel`, và `LessonVideo`.
   - Khi không có video thật: Hiển thị giao diện **Empty State** chuẩn mực.

4. **Chuẩn hóa Schema Video Record:**
   - Chỉ cho phép `sourceType: "TEACHER_UPLOADED"`.
   - Banned các giá trị: `MOCK`, `DEMO`, `SAMPLE`, `SYSTEM`, `AI_GENERATED`.

5. **Thực thi quy tắc "Mỗi nội dung chỉ 1 Video" (One Video Per Content):**
   - Khóa duy nhất: `topic + section`.
   - Khi một video mới được xuất bản (`PUBLISHED`), mọi video cũ cùng `topic + section` tự động chuyển sang `ARCHIVED`.

---

## 5. Kết luận

Sau khi thực hiện kế hoạch trên, hệ thống sẽ đạt trạng thái **Zero-Fake Video Architecture**. Không một video nào được phép xuất hiện trên giao diện học tập của học sinh trừ khi chính giáo viên tải tệp lên và bấm Xuất bản (Publish).
