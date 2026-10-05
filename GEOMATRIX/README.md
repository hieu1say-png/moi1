# HƯỚNG DẪN TRIỂN KHAI DỰ ÁN GEOMATRIX LÊN GOOGLE APPS SCRIPT WEB APP

Dự án **GEOMATRIX** (Phòng Thí Nghiệm Hình Học Toán 9: Hình Trụ – Hình Nón – Hình Cầu) đã được đóng gói hoàn chỉnh sang môi trường **Google Apps Script** (GAS). 

Dự án sử dụng:
- **Backend:** Google Apps Script (V8 Runtime)
- **Lưu trữ Video:** Google Drive (Thư mục tự động tạo: `GEOMATRIX_VIDEO_STORAGE`)
- **Cơ sở dữ liệu:** Google Sheets (Spreadsheet tự động tạo: `GEOMATRIX_DATABASE`)
- **Frontend:** HTML5, CSS responsive, Three.js (mô hình 3D tương tác), KaTeX (hiển thị công thức toán học sắc nét)
- **Giao tiếp:** `google.script.run` kết nối hai chiều thời gian thực giữa giao diện và dịch vụ đám mây của Google.

---

## CẤU TRÚC BỘ NGUỒN (GEOMATRIX_GAS_FINAL)

```
GEOMATRIX_GAS_FINAL/
├── appsscript.json     # Manifest khai báo múi giờ, V8 engine và quyền OAuth
├── Code.gs             # Entry point (doGet, include) và điều phối API
├── Config.gs           # Cấu hình hằng số, thư mục Drive, tên Sheet, giới hạn file
├── Database.gs         # Cơ chế ORM Google Sheets (tự tạo bảng, CRUD dữ liệu)
├── DriveService.gs     # Quản lý thư mục Drive, upload Base64, sinh URL stream/preview
├── VideoService.gs     # Quản lý video bài giảng, gán bài giảng chính thức, xoá file
├── FileService.gs      # Kiểm tra định dạng tệp, chuẩn hoá dung lượng
├── Utils.gs            # Tiện ích sinh ID, định dạng ngày tháng, chuẩn hoá response
├── index.html          # Khung trang chủ Web App chính
├── styles.html         # CSS giao diện EdTech Toán 9 hiện đại & responsive
├── scripts.html        # Logic client-side, Three.js 3D, FileReader Base64, KaTeX
├── components.html     # Modals tải video, trình phát video Drive, lời giải 4 bước
└── README.md           # Hướng dẫn chi tiết này
```

---

## CÁC BƯỚC TRIỂN KHAI CHI TIẾT (STEP-BY-STEP DEPLOYMENT)

### BƯỚC 1: Mở Google Apps Script
1. Truy cập vào trình quản lý Apps Script: [https://script.google.com](https://script.google.com).
2. Đăng nhập bằng tài khoản Google (tài khoản cá nhân hoặc Google Workspace giáo dục).

### BƯỚC 2: Tạo Dự Án Mới (New Project)
1. Bấm vào nút **+ Dự án mới** (**New project**).
2. Đặt tên cho dự án ở góc trên bên trái: `GEOMATRIX`.

### BƯỚC 3: Cấu hình `appsscript.json` (Manifest)
1. Trong menu bên trái, chọn biểu tượng bánh răng **Cài đặt dự án** (**Project Settings**).
2. Tích chọn vào ô: **"Hiển thị tệp tóm tắt 'appsscript.json' trong trình chỉnh sửa"** (*Show "appsscript.json" manifest file in editor*).
3. Quay lại mục **Trình chỉnh sửa** (**Editor** `<>`), mở tệp `appsscript.json`.
4. Dán toàn bộ nội dung từ tệp `appsscript.json` trong thư mục `GEOMATRIX_GAS_FINAL`:
```json
{
  "timeZone": "Asia/Ho_Chi_Minh",
  "dependencies": {
    "enabledAdvancedServices": []
  },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "webapp": {
    "executeAs": "USER_DEPLOYING",
    "access": "ANYONE"
  },
  "oauthScopes": [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/script.external_request"
  ]
}
```

### BƯỚC 4: Tạo Các Tệp Mã Nguồn (`.gs` và `.html`)
Trong trình soạn thảo Google Apps Script, bấm dấu **+** cạnh mục **Tệp** (**Files**):

#### A. Tạo các tệp Script (`.gs`):
1. **`Code.gs`**: Xoá code mặc định, dán nội dung từ `Code.gs`.
2. Bấm dấu **+** -> Chọn **Tệp script** -> Đặt tên `Config`: Dán nội dung `Config.gs`.
3. Bấm dấu **+** -> Chọn **Tệp script** -> Đặt tên `Database`: Dán nội dung `Database.gs`.
4. Bấm dấu **+** -> Chọn **Tệp script** -> Đặt tên `DriveService`: Dán nội dung `DriveService.gs`.
5. Bấm dấu **+** -> Chọn **Tệp script** -> Đặt tên `VideoService`: Dán nội dung `VideoService.gs`.
6. Bấm dấu **+** -> Chọn **Tệp script** -> Đặt tên `FileService`: Dán nội dung `FileService.gs`.
7. Bấm dấu **+** -> Chọn **Tệp script** -> Đặt tên `Utils`: Dán nội dung `Utils.gs`.

#### B. Tạo các tệp HTML (`.html`):
1. Bấm dấu **+** -> Chọn **Tệp HTML** -> Đặt tên `index`: Dán nội dung `index.html`.
2. Bấm dấu **+** -> Chọn **Tệp HTML** -> Đặt tên `styles`: Dán nội dung `styles.html`.
3. Bấm dấu **+** -> Chọn **Tệp HTML** -> Đặt tên `scripts`: Dán nội dung `scripts.html`.
4. Bấm dấu **+** -> Chọn **Tệp HTML** -> Đặt tên `components`: Dán nội dung `components.html`.

*(Lưu ý: Không nhập phần mở rộng `.html` hoặc `.gs` khi gõ tên file trong giao diện Apps Script).*

Bấm **Lưu dự án** (**Save project** / phím tắt `Ctrl + S` hoặc `Cmd + S`).

### BƯỚC 5: Chạy Thử & Cấp Quyền Ban Đầu (Authorization)
1. Trong tệp `Code.gs`, tại thanh công cụ chọn hàm `apiCheckSystemHealth` từ danh sách thả xuống.
2. Bấm nút **Chạy** (**Run**).
3. Google sẽ hiển thị hộp thoại yêu cầu cấp quyền truy cập (**Authorization Required**):
   - Bấm **Xem lại quyền** (**Review permissions**).
   - Chọn tài khoản Google của bạn.
   - Nếu thấy cảnh báo "Google chưa xác minh ứng dụng này", bấm vào liên kết **Nâng cao** (**Advanced**) ở góc dưới -> chọn **Đi tới GEOMATRIX (không an toàn)**.
   - Bấm **Cho phép** (**Allow**) để cấp quyền truy cập Drive và Sheets.
4. Trình biên dịch sẽ tự động tạo sẵn:
   - Thư mục Google Drive: `GEOMATRIX_VIDEO_STORAGE`
   - Bảng tính Google Sheets: `GEOMATRIX_DATABASE`

### BƯỚC 6: Triển Khai Web App (Deploy)
1. Ở góc trên bên phải, bấm nút **Triển khai** (**Deploy**) -> chọn **Tệp triển khai mới** (**New deployment**).
2. Bấm vào biểu tượng bánh răng **Chọn loại** (**Select type**) -> chọn **Ứng dụng web** (**Web app**).
3. Điền thông tin:
   - **Mô tả** (*Description*): `GEOMATRIX Web App v3.0`
   - **Thực thi dưới dạng** (*Execute as*): **Tôi** (*Me - email của bạn*)
   - **Ai có quyền truy cập** (*Who has access*): **Bất kỳ ai** (*Anyone*)
4. Bấm nút **Triển khai** (**Deploy**).
5. Sao chép **URL ứng dụng web** (*Web App URL*) hiển thị trên màn hình.

### BƯỚC 7: Trải Nghiệm Ứng Dụng
Mở URL vừa sao chép trên trình duyệt máy tính hoặc điện thoại thông minh:
- **Trang chủ:** Bảng tổng quan 3 chủ đề hình học.
- **Lý thuyết & Video:** Xem video bài giảng gán chính thức từ Google Drive.
- **3D Lab:** Dùng chuột/chạm tay xoay 360° khối không gian, kéo thanh trượt bán kính $r$, chiều cao $h$ tính $S_{xq}, S_{tp}, V$ tức thì.
- **Ngân hàng Video:** Bấm "Tải Lên Video Mới" để chọn tệp MP4, xem tiến trình tải lên Google Drive, xem video trực tiếp bằng iframe preview và gán bài học.
- **Luyện tập:** Xem bộ đề thi thử vào 10 kèm sơ đồ giải 4 bước sư phạm.

---

## GIỚI HẠN KỸ THUẬT VÀ KHUYẾN NGHỊ

1. **Giới hạn dung lượng tải lên:**
   - Google Apps Script giới hạn payload truyền qua `google.script.run` là khoảng **30MB**. Do đó ứng dụng đặt ngưỡng bảo vệ an toàn là **25 MB**.
   - Khuyến nghị xuất video ở độ phân giải 720p hoặc chuẩn nén H.264/MP4 để video dài 10-15 phút có dung lượng chỉ từ 10MB - 20MB.
2. **Quyền chia sẻ video trên Google Drive:**
   - Hệ thống tự động đặt quyền `ANYONE_WITH_LINK, VIEW` cho thư mục `GEOMATRIX_VIDEO_STORAGE` và các file video được upload, giúp video có thể phát qua iframe preview trên Web App.
   - Nếu dùng tài khoản Google Workspace trường học có chính sách chặn chia sẻ ra ngoài miền, hãy đảm bảo người xem đăng nhập cùng miền trường học hoặc điều chỉnh chính sách chia sẻ trong Google Admin.
3. **Cơ chế lưu trữ:**
   - Video tải lên được lưu thành tệp thật trên Google Drive (`fileId`, `driveUrl`, `embedUrl`).
   - Không sử dụng URL blob tạm thời, dữ liệu tồn tại vĩnh viễn và không bị mất sau khi reload trang.
