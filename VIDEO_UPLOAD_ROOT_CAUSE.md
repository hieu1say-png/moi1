# BÁO CÁO PHÂN TÍCH NGUYÊN NHÂN GỐC RỄ (ROOT CAUSE ANALYSIS)
## Sự cố Upload Video Bài học Thất bại (HTTP 500 & HTTP 413) trên Vercel Serverless

---

### 1. BỐI CẢNH & TRIỆU CHỨNG HỆ THỐNG
Trong dự án **Geometry Lab (Toán 9)**, khi giáo viên (ThS. Trần Ngọc Hiếu) tiến hành tải video bài giảng MP4 độ phân giải cao cho các bài học Hình Trụ, Hình Nón, Hình Cầu từ bảng điều khiển giáo viên (`TeacherVideosTab.tsx`), hệ thống trên môi trường **Vercel Production** liên tục gặp lỗi:
- **Lỗi HTTP 413 (Payload Too Large / FUNCTION_PAYLOAD_TOO_LARGE)** khi tệp video vượt quá 4.5MB.
- **Lỗi HTTP 500 (Internal Server Error / EROFS: read-only file system)** khi hệ thống thử lưu trữ tệp hoặc các chunk vào thư mục cục bộ `uploads/` trên máy chủ Vercel.
- Video không hiển thị được cho học sinh tại tab Lý thuyết (`TheoryView.tsx`), player báo lỗi hoặc video bị mất sau khi Serverless Function khởi động lại (cold start).

---

### 2. NGUYÊN NHÂN GỐC RỄ CHI TIẾT (ROOT CAUSE BREAKDOWN)

#### Nguyên nhân 1: Vi phạm Giới hạn Request Body Payload của Vercel Serverless (HTTP 413)
- **Cơ chế hoạt động của Vercel Serverless Functions**: Nền tảng Vercel áp đặt giới hạn cứng (hard limit) **4.5 MB** cho request body gửi tới bất kỳ Serverless Function (`/api/*`).
- **Lỗi kiến trúc cũ**: Kiến trúc cũ gửi toàn bộ tệp MP4 (thường từ 10MB đến 100MB) dưới dạng `multipart/form-data` thông qua endpoint proxy `/api/upload` hoặc `/api/theory-videos/upload`.
- **Hậu quả**: Proxy gateway của Vercel lập tức ngắt kết nối và trả về mã trạng thái **HTTP 413 Request Entity Too Large** trước khi request chạm được vào code Express/Node.js.

#### Nguyên nhân 2: Hệ thống tệp Serverless là Read-Only và Ephemeral (HTTP 500)
- **Bản chất của môi trường Serverless Container**: Trên AWS Lambda / Vercel Serverless, hệ thống tệp gốc và thư mục làm việc của dự án (`process.cwd()`) hoàn toàn ở chế độ **Read-Only** (`EROFS: read-only file system`), ngoại trừ thư mục tạm `/tmp` (bị giới hạn dung lượng và tự động xóa sau khi container kết thúc vòng đời).
- **Lỗi kiến trúc cũ**: 
  1. `multer.diskStorage` và `PersistentTheoryVideoStorage` được cấu hình để ghi tệp video trực tiếp vào `path.join(process.cwd(), "uploads", "videos")` hoặc `path.join(process.cwd(), "uploads", "temp")`.
  2. Cơ chế `chunk-upload` cũ gọi `fs.appendFileSync(tempFilePath, chunkBuffer)` trên đĩa cứng server.
- **Hậu quả**: Lệnh `fs.mkdirSync` hoặc `fs.appendFileSync` ném ra ngoại lệ `EROFS: read-only file system` hoặc `ENOENT`, dẫn đến mã lỗi **HTTP 500 Internal Server Error**. Cho dù có ghi thành công vào `/tmp`, dữ liệu video cũng sẽ biến mất sau vài phút khi instance bị hủy (cold start/scale down), khiến đường link video trở thành "dead link" (404).

#### Nguyên nhân 3: Phụ thuộc vào Fallback Cục bộ và Không Đồng bộ Trạng thái
- Khi upload thất bại, một số thành phần giao diện cố gắng fallback lưu đường dẫn tạm thời dạng blob URL (`blob:https://...`) hoặc đường dẫn cục bộ vào `localStorage`. Tuy nhiên, blob URL chỉ có hiệu lực duy nhất trong phiên duyệt web hiện tại của máy giáo viên, các máy tính của học sinh hoàn toàn không thể truy cập được (`ERR_FILE_NOT_FOUND`).

---

### 3. TẠI SAO CÁC GIẢI PHÁP "CHỮA CHÁY" CŨ ĐỀU THẤT BẠI?

| Giải pháp cũ / Chữa cháy | Tại sao thất bại trên Vercel? |
| :--- | :--- |
| **Gửi qua `/api/upload` với `body-parser` tăng limit** | Vercel API Gateway chặn ở tầng hạ tầng (edge) ở mức 4.5MB, cấu hình trong code Node.js hoàn toàn vô tác dụng. |
| **Base64 encode video rồi gửi JSON** | Làm phình kích thước video thêm 33%, vẫn đụng trần 4.5MB và gây nghẽn RAM container (OOM crash). |
| **Lưu nhị phân video trong Firestore / DB** | Firestore giới hạn 1MB cho mỗi document; chi phí đọc ghi rất cao, không hỗ trợ HTTP Range streaming cho video player. |
| **Lưu vào thư mục `uploads/` trên server** | Đĩa cứng Vercel là Read-Only; container tắt thì tệp mất hoàn toàn. |
| **Lưu blob URL vào localStorage** | Blob URL là in-memory URL nội bộ của trình duyệt giáo viên, học sinh không thể truy cập. |

---

### 4. GIẢI PHÁP TRIỆT ĐỂ ĐÃ TRIỂN KHAI

Hệ thống đã loại bỏ hoàn toàn việc truyền tải binary video qua Vercel Function và chuyển sang mô hình **Direct Upload to Object Storage**:

```
[Trình duyệt Giáo viên]
       │
       ├─ (1) Yêu cầu Token tải lên an toàn (JSON < 1KB) ──► [Vercel API: /api/theory-videos/blob-upload]
       │                                                                  │
       │◄─ (2) Trả về Client Upload Token có chữ ký bảo mật ──────────────┘
       │
       ├─ (3) TẢI TRỰC TIẾP VIDEO (Multipart, hỗ trợ tới 500MB) ────────► [Vercel Blob Object Storage]
       │      (Không qua Vercel Function - 0% nguy cơ 413/500)                    │
       │                                                                          │
       │◄─ (4) Trả về URL video vĩnh viễn (CDN HTTPS) ───────────────────────────┘
       │
       └─ (5) Lưu Metadata & Gán hình học (JSON < 2KB) ────► [Vercel API: /api/theory-videos/create-and-assign]
              (shape: cylinder/cone/sphere)                                       │
                                                                                  ▼
                                                                     [Persistent Theory Storage]
```

---

### 5. KẾT LUẬN
Bằng cách phân tách hoàn toàn giữa **Luồng truyền tải dữ liệu nhị phân dung lượng lớn** (Trình duyệt ──► Vercel Blob Object Storage) và **Luồng quản lý metadata** (Trình duyệt ──► Express API), lỗi HTTP 413 và HTTP 500 đã được loại trừ tận gốc.
