# BÁO CÁO TOÀN DIỆN HỆ THỐNG (FULL SYSTEM AUDIT)
**Dự án:** GEOMETRY LAB – TOÁN 9  
**Mục tiêu:** Kiểm toán chi tiết 20 nhóm chức năng, phân loại mức độ ưu tiên (P0 - Critical, P1 - High, P2 - Medium, P3 - Optional).

---

## BẢNG TỔNG HỢP KIỂM TOÁN 20 NHÓM CHỨC NĂNG

| STT | Nhóm chức năng | Hiện trạng | Vấn đề phát hiện | Mức độ ưu tiên | Hành động xử lý |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **UX/UI** | Giao diện đã có màu sắc xanh lá & be kem chuẩn | Một số thẻ câu hỏi còn dùng font xen kẽ, cần quy chuẩn triệt để | **P1** | Đồng bộ toàn bộ layout với padding nhịp nhàng, tối ưu thẻ bài tập |
| **2** | **Typography** | Font đã cấu hình trong `index.css` | Cần rà soát toàn bộ giao diện (bài thi, câu hỏi, giải thích, nút bấm, dashboard) sang **Times New Roman**, cỡ câu hỏi 20-22px (desktop), 18-20px (mobile), line-height 1.5-1.8 | **P0** | Chuẩn hóa font-family & typography tokens trên toàn hệ thống |
| **3** | **Question Bank** | 292 câu hỏi gốc trong `masterQuestionBank.json` | Cần kiểm tra 100% câu hỏi về schema, options (đủ 4 phương án MCQ), đáp án đúng tồn tại, không duplicate ID | **P0** | Kiểm toán toàn bộ 292 câu hỏi, gán trạng thái rõ ràng |
| **4** | **Math Rendering** | Đã có KaTeX và `MathText`/`MathFormula` | Cần bảo đảm pipeline duy nhất render cả câu hỏi, phương án, lời giải và AI Tutor; không lộ raw LaTeX | **P0** | Đồng bộ KaTeX pipeline xuyên suốt, kiểm tra render an toàn |
| **5** | **Math Validator** | Đã có kiểm tra sơ bộ trong `validationEngine.ts` | Chưa có hàm tập trung `validateMathText()` kiểm tra ngoặc, phân số, căn thức, ký hiệu để tự động đánh dấu `NEEDS_REVIEW` | **P0** | Xây dựng `validateMathText()` chuẩn hóa |
| **6** | **Images** | Dữ liệu câu hỏi phần lớn không có ảnh hoặc ảnh chuẩn | Cần kiểm tra triệt để mọi trường `imageUrl`, nếu ảnh không tồn tại thật thì không render khung ảnh vỡ | **P1** | Bổ sung fallback an toàn: "Không ảnh thật -> không render khung ảnh" |
| **7** | **Video System** | Đã dọn sạch video ảo (Zero-Fake) | Đã sẵn sàng endpoint stream 206 và upload giáo viên, cần giữ nguyên tắc "Không có video thật -> không render player" | **P0** | Duy trì kiểm tra tệp vật lý nghiêm ngặt |
| **8** | **3D System** | Three.js render tương tác mượt mà | Cần kiểm tra tính năng Cone Formation (quay tam giác vuông $0^\circ \to 360^\circ$) và Sphere Formation (quay nửa hình tròn) | **P1** | Đảm bảo nút điều khiển trực quan (Reset, Rotate, Zoom, Sliders) |
| **9** | **Practice Flow** | Có component `SingleQuestionPracticeFlow.tsx` | Cần đảm bảo chỉ lấy câu `APPROVED`, hiển thị từng câu một, trước submit không lộ đáp án, sau submit hiện Đúng/Sai và Lời giải 4 bước | **P0** | Chuẩn hóa luồng làm bài và cơ chế `recentQuestionIds` chống lặp |
| **10** | **Exam Prep** | Đề thi 10 câu / 30 phút | Cần bảo đảm không xem lời giải khi đang thi, nộp bài xong mới hiện điểm và lời giải 4 bước | **P1** | Xác minh `ExamPrepView.tsx` |
| **11** | **STEM & Real World** | Có các bài toán tối ưu lon, nón lá, bồn chứa | Cần kiểm tra chu trình: Tình huống $\to$ Dữ kiện $\to$ Mô hình $\to$ Tính $\to$ Kiểm chứng $\to$ Kết luận | **P2** | Tối ưu hóa giao diện trực quan |
| **12** | **AI Tutor** | Thầy Hiếu AI có phương pháp Socratic | Đảm bảo không giải hộ ngay, hỗ trợ gợi ý bước (Hint 1 $\to$ Hint 2 $\to$ Scaffold $\to$ Solution) và phân loại lỗi sai | **P1** | Xác minh luồng hội thoại và phân loại lỗi trong `smartTutorEngine.ts` |
| **13** | **Progress Tracking** | Lưu trữ trên `student_progress.json` | Cần bảo đảm tự động lưu sau mỗi câu hỏi luyện tập và bài thi | **P1** | Kiểm tra các endpoint `/api/progress` |
| **14** | **Teacher Dashboard** | Có đầy đủ các tab quản lý lớp, học sinh, video | Cần bổ sung tính năng [XEM NHƯ HỌC SINH] trong Question Bank của giáo viên | **P1** | Bổ sung modal Question Preview trực quan cho giáo viên |
| **15** | **Authentication** | Token-based auth với 2 role riêng biệt | Phục hồi phiên tốt từ localStorage, không mất phiên khi chuyển tab | **P0** | Giữ vững cơ chế bảo mật hiện có |
| **16** | **Authorization** | `requireTeacherAuth` trên server và `AuthGate` client | Ngăn chặn học sinh gọi các API của giáo viên | **P0** | Xác minh tính nghiêm ngặt của middleware server |
| **17** | **Database & Storage** | File-based JSON lưu trữ bền vững | Không lưu binary video trong JSON, chỉ lưu metadata và đường dẫn tệp | **P1** | Kiểm tra tính toàn vẹn của JSON database |
| **18** | **Security & Secrets** | Gemini API key bảo mật trên server | Không để lộ API key ra frontend hoặc localStorage | **P0** | Kiểm tra toàn bộ frontend không chứa secret |
| **19** | **Responsive Mobile** | Hỗ trợ responsive Tailwind | Kiểm tra các viewport 360×800, 390×844, 412×915; touch target $\ge 44$px, click cả thẻ phương án | **P1** | Tối ưu hóa padding và kích thước phương án chọn trên mobile |
| **20** | **Performance** | Tải có kiểm soát | Tránh tải trước 3D nặng khi chưa vào tab Explore/Theory | **P2** | Lazy initialization cho Three.js |

---

## DANH MỤC NHIỆM VỤ THEO MỨC ĐỘ ƯU TIÊN & TIẾN ĐỘ THỰC HIỆN

### ƯU TIÊN P0 (CRITICAL - ĐÃ HOÀN THÀNH TOÀN DIỆN & XÁC THỰC)
1. **Typography chuẩn hóa (Phase 2):** ✅ ĐÃ HOÀN THÀNH. Toàn bộ giao diện áp dụng font Times New Roman học thuật, cỡ câu hỏi 20-22px (desktop), 18-20px (mobile), line-height 1.5-1.8 qua các tokens `.gl-question-text`, `.gl-option-text`, `.gl-solution-text`.
2. **Math Rendering & Validator (Phase 3 & 4):** ✅ ĐÃ HOÀN THÀNH. Triển khai hàm `validateMathText()` trong `MathFormula.tsx`, bảo đảm KaTeX pipeline duy nhất, kiểm tra ngoặc nhọn, phân số, căn thức, không để lọt raw LaTeX.
3. **Question Bank Audit & Status (Phase 5 & 6):** ✅ ĐÃ HOÀN THÀNH. Kiểm toán toàn bộ 292 câu hỏi gốc trong `masterQuestionBank.json`, kiểm tra 100% options, đáp án đúng tồn tại, không duplicate ID.
4. **Practice Game Flow & 4-Step Explanation (Phase 8, 9, 10, 11):** ✅ ĐÃ HOÀN THÀNH. Hiển thị từng câu đơn, chống lặp qua `recentQuestionIds`, không lộ đáp án trước khi submit, giải thích chuẩn 4 bước sư phạm (Xác định dữ kiện $\to$ Lập công thức $\to$ Tính toán $\to$ Kết luận & Kiểm tra).
5. **Video Zero-Fake Enforcement (Phase 15 - 26):** ✅ ĐÃ HOÀN THÀNH. Duy trì nguyên tắc nghiêm ngặt: không video thật thì hiển thị thông báo sư phạm lịch sự, tuyệt đối không render player rỗng hoặc tạo video giả.
6. **Bảo mật & Phân quyền (Phase 46, 47, 48):** ✅ ĐÃ HOÀN THÀNH. Phân quyền AuthGate nghiêm ngặt giữa Học sinh và Giáo viên, không rò rỉ API key ra client.

### ƯU TIÊN P1 (HIGH - ĐÃ HOÀN THÀNH VÀ NÂNG CẤP TRẢI NGHIỆM)
1. **Teacher Question Preview [XEM NHƯ HỌC SINH] (Phase 7):** ✅ ĐÃ HOÀN THÀNH. Modal `TeacherQuestionPreviewModal` tích hợp vào `TeacherQuestionBankTab`, cho phép giáo viên xem trước câu hỏi đúng như học sinh nhìn thấy (bao gồm 4 bước giải).
2. **Mobile UX & Responsive (Phase 13):** ✅ ĐÃ HOÀN THÀNH. Thẻ phương án tối thiểu 56px (`min-h-[56px] w-full select-none`), click cả card, không bị horizontal overflow trên màn hình 360px-412px.
3. **Live Math Preview cho Giáo viên (Phase 39):** ✅ ĐÃ HOÀN THÀNH. Hiển thị xem trước công thức KaTeX và lời giải 4 bước theo thời gian thực ngay trong modal tạo câu hỏi của giáo viên.
4. **3D Formation controls (Phase 27, 28, 29):** ✅ ĐÃ HOÀN THÀNH. Mô phỏng tạo hình nón (quay tam giác vuông $0^\circ \to 360^\circ$) và hình cầu (quay nửa hình tròn), controls bố trí hợp lý không che khuất mô hình.
5. **AI Tutor Scaffolding (Phase 31, 32):** ✅ ĐÃ HOÀN THÀNH. Thầy Hiếu AI hỗ trợ 5 cấp độ gợi ý sư phạm (Hint 1 $\to$ Socratic $\to$ Công thức $\to$ Khung giải $\to$ Lời giải 4 bước) kèm chẩn đoán lỗi sai.
6. **Early Warning & Báo cáo Giáo viên (Phase 41):** ✅ ĐÃ HOÀN THÀNH. Theo dõi học sinh cần giáo viên quan tâm trên Teacher Dashboard.

### ƯU TIÊN P2 (MEDIUM - ĐÃ HOÀN THÀNH)
1. STEM Sandbox tương tác (Phase 30): Can Optimization, Conical Hat Craft, Archimedes Trinity Lab.
2. Hồ sơ My Mathematical Model (Phase 33) & Error Notebook (Phase 34).
3. Thẻ "Tiếp tục học" & Lộ trình Learning Islands trên Student Home (Phase 35).
