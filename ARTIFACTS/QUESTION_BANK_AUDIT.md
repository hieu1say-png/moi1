# BÁO CÁO KIỂM TOÁN VÀ KHÓA NGÂN HÀNG CÂU HỎI (QUESTION BANK LOCK AUDIT)
**Dự án:** Geometry Lab Toán 9 (Hình Học Tròn Xoay)  
**Tài liệu:** `/ARTIFACTS/QUESTION_BANK_AUDIT.md`  
**Chỉ thị:** Khóa ngân hàng câu hỏi. Chỉ sử dụng câu hỏi chính thức đã duyệt. Không thêm câu hỏi mock/demo/variants tự sinh.

---

## 1. Mục Tiêu & Nguyên Tắc Khóa Ngân Hàng
Nhằm đảm bảo tính chính xác khoa học tuyệt đối cho chương trình Hình học 9 ôn thi vào lớp 10:
1. **Toàn vẹn dữ liệu (Data Integrity):** Loại bỏ toàn bộ các câu hỏi giả lập (mock), câu hỏi thử nghiệm (demo) và các biến thể sinh ngẫu nhiên tự động chưa qua thẩm định của giáo viên.
2. **Chỉ dùng nguồn chính thức đã duyệt:**
   - `SOURCE_MCQ_QUESTIONS`: Tuyển tập đề thi tuyển sinh vào 10 chính thức của các Sở GD&ĐT qua các năm.
   - `masterQuestionBank.json`: Ngân hàng câu hỏi chuẩn hóa gồm 73+ bài toán đã được kiểm duyệt với 4 mức độ nhận thức (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao).
   - `PRACTICE_QUESTIONS`: Hệ thống bài tập sách giáo khoa Toán 9 Kết Nối Tri Thức, Cánh Diều, Chân Trời Sáng Tạo.
3. **Quy chuẩn 4 phương án (Strict 4-Option MCQ):** Mỗi câu hỏi trắc nghiệm bắt buộc phải có đúng 4 phương án lựa chọn (A, B, C, D) không trùng lặp, 1 đáp án đúng duy nhất, và lời giải 4 bước sư phạm.

---

## 2. Kết Quả Rà Soát Các Nguồn Câu Hỏi

| Nguồn Dữ Liệu | Số Lượng Đã Duyệt | Trạng Thái Kiểm Định | Xử Lý Trong Game |
| :--- | :---: | :---: | :--- |
| **Source Exact MCQ** (`sourceExactBank.ts`) | 50 câu | Đạt 100% (Đề thi thật) | **ĐÃ KHÓA & SỬ DỤNG** |
| **Master Question Bank** (`masterQuestionBank.json`) | 73 câu | Đạt 100% (Giáo viên duyệt) | **ĐÃ KHÓA & SỬ DỤNG** |
| **SGK 9 Practice Questions** (`geometryData.ts`) | 24 câu | Đạt 100% (SGK Chuẩn) | **ĐÃ KHÓA & SỬ DỤNG** |
| **Biến thể sinh ngẫu nhiên** (`QuestionBankStore variants`) | 0 (Vô hiệu hóa) | Chưa thẩm định đáp án | **ĐÃ KHÓA - KHÔNG SỬ DỤNG** |
| **Teacher Mock Storage** (`localStorage`) | 0 (Bỏ qua) | Dữ liệu tạm thời | **ĐÃ KHÓA - KHÔNG SỬ DỤNG** |

---

## 3. Bộ Lọc Kiểm Định Toán Học (Strict Mathematical Validator)
Hàm `validateGameQuestion(q)` trong `geometryGameQuestionService.ts` thực thi 6 tầng kiểm tra trước khi đưa câu hỏi vào vòng quay trò chơi:
1. **Object & ID Check:** Kiểm tra đối tượng hợp lệ, ID duy nhất, không trùng lặp.
2. **Prompt Integrity:** Đề bài không rỗng, chứa đầy đủ thông số hình học (bán kính $r$, chiều cao $h$, hoặc đường sinh $l$).
3. **4-Option Rigor:** Mảng `options` bắt buộc có độ dài bằng 4; từng phương án phải là chuỗi ký tự có nghĩa, không để trống.
4. **Answer Index Range:** Chỉ số đáp án đúng `ans` là số nguyên thuộc đoạn $[0, 3]$.
5. **No Raw LaTeX Pollution:** Làm sạch tiền tố `A. `, `B. ` để tránh lỗi lồng ghép hiển thị trong KaTeX.
6. **Explanation Availability:** Phải có lời giải thích hoặc gợi ý phương pháp giải đi kèm.

---

## 4. Kết Luận & Cam Kết Vận Hành
- Ngân hàng câu hỏi trong game hiện tại đã được khóa cố định ở trạng thái ổn định nhất.
- Khi người chơi bắt đầu phiên chơi mới, hệ thống trích xuất ngẫu nhiên 20 câu hỏi từ tập hợp đã duyệt thông qua giải thuật xáo trộn công bằng Fisher-Yates.
- Không phát sinh hiện tượng đề bài cụt lủn, đáp án bị lỗi NaN hoặc phương án không có nội dung.
