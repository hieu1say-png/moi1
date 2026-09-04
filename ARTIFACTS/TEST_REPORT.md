# BÁO CÁO KIỂM THỬ HỆ THỐNG (TEST_REPORT.md)

## DANH SÁCH 30 TEST CASES BẮT BUỘC

| Test Case | Mô tả kiểm thử | Kỳ vọng | Kết quả | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| **TEST 01** | Teacher login | Đăng nhập tài khoản giáo viên thành công | PASS | Xác thực độc lập trong AuthContext |
| **TEST 02** | Student login | Đăng nhập tài khoản học sinh thành công | PASS | Phục hồi tiến độ và điểm XP |
| **TEST 03** | Student vào Teacher Dashboard | Học sinh bị chặn, hiển thị cảnh báo không có quyền | PASS | AuthGuard chặn cấp độ route |
| **TEST 04** | Teacher tạo/quản lý học sinh | Giáo viên thêm mới, khóa/mở khóa tài khoản học sinh | PASS | Lưu trữ server audit log |
| **TEST 05** | Teacher upload video | Giáo viên tải video lên hệ thống | PASS | File lưu vào `/uploads`, metadata lưu JSON |
| **TEST 06** | Refresh trang | Trạng thái ứng dụng và session không bị mất | PASS | Hydration an toàn không race-condition |
| **TEST 07** | Logout | Đăng xuất an toàn từng tài khoản | PASS | Xóa đúng session domain tương ứng |
| **TEST 08** | Login lại | Đăng nhập lại bình thường | PASS | Khôi phục dữ liệu chính xác |
| **TEST 09** | Video vẫn tồn tại | Video không bị mất sau logout/login/restart | PASS | Lưu trữ đĩa vật lý bền vững |
| **TEST 10** | Student xem video PUBLISHED | Học sinh chỉ nhìn thấy video ở trạng thái PUBLISHED | PASS | Lọc server + client filter |
| **TEST 11** | Student làm câu hỏi | Chọn câu hỏi từ ngân hàng 1000+ câu trích từ PDF | PASS | 100% câu trắc nghiệm 4 đáp án A-B-C-D |
| **TEST 12** | Trước khi submit | Không hiển thị đáp án đúng, không lộ màu sắc | PASS | Ẩn hoàn toàn đáp án đúng |
| **TEST 13** | Sau submit | Hiển thị Đúng/Sai + Đáp án đúng + Lời giải 4 bước | PASS | Trình bày 4 bước sư phạm rõ ràng |
| **TEST 14** | Công thức toán học | Render mượt mà qua KaTeX | PASS | Không bị vỡ ký tự $\pi, r^2, \sqrt{}$ |
| **TEST 15** | Không có raw LaTeX | Không hiển thị `\pi, \frac, \sqrt, r^2, \dfrac` dạng thô | PASS | MathFormula / MathText xử lý triệt để |
| **TEST 16** | Kiểm tra 3D | Mô hình 3 khối hình (Trụ - Nón - Cầu) xoay và tương tác tốt | PASS | Three.js WebGL mượt mà |
| **TEST 17** | Auto rotation | Điều khiển tự xoay mô hình 3D linh hoạt | PASS | Tắt/bật xoay chính xác |
| **TEST 18** | Animation | Chuyển cảnh mượt mà | PASS | Sử dụng motion tối ưu hiệu năng |
| **TEST 19** | Mobile 360px | Giao diện hiển thị chuẩn trên màn hình nhỏ 360px | PASS | Responsive, không tràn viền |
| **TEST 20** | Mobile 390px | Giao diện hiển thị chuẩn trên iPhone 390px | PASS | Layout thích ứng tốt |
| **TEST 21** | Mobile 412px | Giao diện hiển thị chuẩn trên Android 412px | PASS | Bố cục thoáng, rõ ràng |
| **TEST 22** | Tablet | Giao diện hiển thị chuẩn trên iPad / Tablet | PASS | Tận dụng tốt không gian 2 cột |
| **TEST 23** | Desktop | Giao diện sắc nét trên màn hình rộng | PASS | Grid và flexbox cân đối |
| **TEST 24** | Tắt mạng / Lỗi mạng | Ứng dụng không bị crash, có thông báo lỗi thân thiện | PASS | Error boundary + toast thông báo |
| **TEST 25** | Refresh trong route con | Khi tải lại ở `/theory`, `/practice`, `/explore` vẫn giữ route | PASS | Routing nội bộ khôi phục đúng |
| **TEST 26** | Browser console | Không có console error nghiêm trọng | PASS | Code sạch, kiểm soát warning |
| **TEST 27** | Network request | Các request HTTP gửi đúng định dạng và có timeout | PASS | Headers và Payload đầy đủ |
| **TEST 28** | Duplicate request | Tránh gửi trùng lặp request khi bấm liên tục | PASS | Debounce & disabled state khi loading |
| **TEST 29** | Loading state | Có spinner/skeleton khi đang tải dữ liệu | PASS | Chỉ báo trực quan rõ ràng |
| **TEST 30** | Empty state | Có thông báo khi danh sách rỗng (video, câu hỏi) | PASS | Thiết kế empty state thân thiện |
