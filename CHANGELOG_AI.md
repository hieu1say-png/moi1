# CHANGELOG AI: GEOMETRY LAB VERSION HISTORY

Tập tin ghi nhận nhật ký kiểm toán, các mốc phiên bản và trạng thái hệ thống trước và sau các đợt rà soát mã nguồn.

---

## [Baseline Pre-Fix Snapshot] - 2026-09-19

### 1. Trạng thái mã nguồn trước khi sửa đổi (Pre-Fix State)
- **Kiến trúc ứng dụng:** React 19 + TypeScript + Vite 6 + Tailwind CSS 4 + Express 4.
- **Trạng thái Build:** Mã nguồn biên dịch thành công (`tsc --noEmit` PASS, `vite build` PASS, `esbuild` PASS).
- **Hệ thống xác thực:** Cơ chế Dual Session độc lập giữa Teacher (`hieu1say`) và Student (`demo9a2`, `maianh9a2`, `hoangnam9a2`).
- **Lưu trữ dữ liệu:** Lưu trữ kết hợp JSON Flat-files (`server/data/*.json`) và trình duyệt `localStorage`.
- **Lưu trữ media:** Ổ đĩa cục bộ `/uploads/` và cơ chế sẵn sàng `@vercel/blob`.
- **Trình phát video:** HTML5 video với HTTP 206 Partial Content Range Streaming.
- **Ngân hàng câu hỏi:** 72 câu hỏi trắc nghiệm Toán 9 với KaTeX math rendering.
- **Mô hình 3D:** Three.js cho Trụ, Nón, Cầu, Khai triển phẳng, Tạo hình tròn xoay, Rót nước Archimedes.
- **Gia sư AI:** Gemini 2.5 Flash chạy server-side.

### 2. Các điểm lỗi đã được định vị cần chuẩn hóa
- `src/components/game/GameCanvas.tsx`: Vật lý rơi tự do và lướt chướng ngại vật chưa có `deltaTime`.
- `server.ts` & `server/theoryVideoStorage.ts`: Nguy cơ sập 500 hoặc 413 trên môi trường serverless Vercel khi tải file lớn hơn 4.5MB.
- `src/services/teacherStudentService.ts`: Danh sách học sinh lớp lưu trữ ở client `localStorage`, chưa được đồng bộ bền vững về server.
- `server/auth.ts`: Endpoint cấp token cho học sinh `/api/auth/token` chưa kiểm tra mật khẩu học sinh đối sánh với danh sách chuẩn.

### 3. Quy tắc phát triển áp dụng
- Không phá vỡ các chức năng hiện có (No Breaking Changes).
- Giữ nguyên toàn bộ dữ liệu thật, không đưa vào mock data hay video ảo.
- Thực hiện kiểm toán chi tiết trước khi tiến hành can thiệp mã nguồn.
