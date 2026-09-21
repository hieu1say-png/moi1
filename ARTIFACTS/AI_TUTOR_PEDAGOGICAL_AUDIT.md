# BÁO CÁO KIỂM ĐỊNH SƯ PHẠM TRỢ LÝ AI (AI TUTOR PEDAGOGICAL AUDIT)
**Dự án:** Geometry Lab Toán 9 (Trợ Lý Sư Phạm Thầy Hiếu AI)  
**Tài liệu:** `/ARTIFACTS/AI_TUTOR_PEDAGOGICAL_AUDIT.md`  
**Nguyên tắc tối cao:** SOCRATIC SCAFFOLDING — KHÔNG GIẢI HỘ, KHÔNG LÀM THAY, DẪN DẮT TƯ DUY TỪNG BƯỚC

---

## 1. Kiến Trúc Phân Tầng Hỗ Trợ 5 Cấp Độ (5-Level Scaffolding Engine)
Module `src/services/ai/pedagogicalEngine.ts` và `server/smartTutorEngine.ts` kiểm soát hành vi phản hồi của AI Tutor theo mô hình giàn giáo nhận thức (Cognitive Scaffolding):

| Cấp Độ | Tên Chiến Lược | Mục Tiêu Sư Phạm | Nội Dung Phản Hồi |
| :---: | :--- | :--- | :--- |
| **Level 1** | `GENTLE_HINT` | Gợi mở tư duy ban đầu | Nhắc học sinh quan sát giả thiết: bài toán đã cho đại lượng nào ($r, h$ hay $l$) và yêu cầu tìm gì. Tuyệt đối không nhắc công thức hay số liệu. |
| **Level 2** | `GUIDED_QUESTION` | Đặt câu hỏi định hướng Socratic | Hỏi học sinh về mối quan hệ trung gian (ví dụ: *Từ chu vi đáy $C = 2\pi r$, em tính được bán kính $r$ bằng bao nhiêu?*). |
| **Level 3** | `FORMULA_RECALL` | Nhắc lại công thức toán học | Hiển thị công thức KaTeX chuẩn mực có chú thích ý nghĩa từng đại lượng, kèm lưu ý bẫy đề thi (ví dụ: đường kính $d$ phải chia 2). |
| **Level 4** | `STEP_GUIDANCE` | Hướng dẫn khung 4 bước | Đưa ra các bước giải tuần tự không có đáp số cuối cùng: Bước 1 tìm $r$, Bước 2 tính đường sinh $l$, Bước 3 thế vào công thức. |
| **Level 5** | `FULL_SOLUTION` | Lời giải chi tiết hoàn chỉnh | **Chỉ mở khóa** khi học sinh đã thử giải ít nhất 2 lần hoặc sau khi bài kiểm tra đã kết thúc, kèm phân tích lỗi sai điển hình. |

---

## 2. Bảo Mật Khóa API & Kiến Trúc Server-Side (Zero Client Key Exposure)
- **Tuyệt đối không lưu API Key ở Client:** Trong toàn bộ thư mục `/src`, không có bất kỳ biến môi trường nào chứa key Gemini (không dùng `VITE_GEMINI_API_KEY`).
- **Xử lý trung gian phía máy chủ (Server-Side Proxy):** Toàn bộ truy vấn AI của học sinh được gửi về endpoint `/api/ai-tutor` trên Express server. Server sử dụng `process.env.GEMINI_API_KEY` khởi tạo lazy instance qua `@google/genai`.

---

## 3. Khả Năng Hoạt Động Ngoại Tuyến & Fallback Chắc Chắn (Offline Reliability)
Khi không có mạng internet hoặc môi trường chưa cấu hình API Key:
- Hàm `handleTutorRequest` trong `server.ts` bắt ngoại lệ `try/catch` an toàn.
- Hệ thống tự động chuyển sang chế độ **Deterministic Socratic Rule Engine** tích hợp sẵn trong `server/smartTutorEngine.ts`.
- Bộ chẩn đoán toán học (`mathEngine.ts`) phân tích lỗi tính toán cụ thể (quên chia đôi đường kính, quên bình phương bán kính, nhầm công thức nón sang trụ) và đưa ra gợi ý sửa lỗi trong vòng < 5ms mà không phụ thuộc vào kết nối mạng bên ngoài.

---

## 4. Kiểm Định Trải Nghiệm Học Sinh
- AI Tutor luôn giữ giọng điệu thân thiện, mô phạm, khích lệ học sinh tự vượt qua bẫy câu hỏi.
- Toàn bộ công thức toán trong câu trả lời của AI đều được render chuẩn KaTeX, không có lỗi định dạng hay lộ mã nguồn.
