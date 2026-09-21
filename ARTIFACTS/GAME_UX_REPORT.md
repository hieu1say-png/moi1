# BÁO CÁO UX & TIÊU CHUẨN THIẾT KẾ TRÒ CHƠI "HÌNH HỌC 9 MASTER"
**Dự án:** Geometry Lab Toán 9 (Chương IV: Hình Trụ - Hình Nón - Hình Cầu)  
**Tài liệu:** `/ARTIFACTS/GAME_UX_REPORT.md`  
**Triết lý:** TOÁN HỌC > PHẢN XẠ (Giảm áp lực arcade, tăng giá trị sư phạm)

---

## 1. Tổng Quan & Mục Tiêu Cải Tiến
Trò chơi "Hình Học 9 Master" được thiết kế nhằm giúp học sinh lớp 9 rèn luyện kiến thức về diện tích xung quanh, diện tích toàn phần và thể tích ba khối tròn xoay. Để tối ưu cho mục đích giáo dục:
- **Ưu tiên nhận thức:** Game không đánh đố phản xạ tay chân mà tạo không gian tư duy giải toán.
- **Mặc định:** Easy Mode = ON (`speedMultiplier = 0.75`, `pipeSpeed = 1.7 px/frame`).
- **Phản hồi học tập:** Khi chọn đáp án, học sinh có đủ 900ms để quan sát trạng thái đúng/sai và lời giải chi tiết (Scaffolded Explanation).
- **Tránh kích động thị giác:** Giảm 75% rung chấn màn hình (screen shake), giảm số hạt particle, tôn trọng `prefers-reduced-motion`.

---

## 2. Tiêu Chuẩn Kích Thước Nút Bấm & Vùng Chạm (Touch Targets)
Tuân thủ nghiêm ngặt tiêu chuẩn WCAG 2.1 AA & Mobile Accessibility:
- **Kích thước tối thiểu (Minimum):** 44px x 44px trên mọi thiết bị di động.
- **Kích thước khuyến nghị (Preferred):** 52px – 56px cho các nút chọn phương án câu hỏi (A, B, C, D) và các nút hành động chính (Chơi Tiếp, Chơi Lại, Tạm Dừng).
- **Khoảng cách đệm (Spacing):** Khoảng cách giữa các nút tối thiểu 10px để tránh bấm nhầm khi ngón tay thao tác nhanh.
- **Trạng thái Focus/Active:** Viền xanh nổi bật (`outline: 3px solid #0066FF`), không dùng hiệu ứng chớp tắt gây mỏi mắt.

---

## 3. Thời Gian Chuyển Cảnh & Phản Hồi (Transitions & Feedback)
- **Transition Duration:** Được cố định ở **300ms** (nằm trong dải chuẩn 250–400ms). Chuyển cảnh mềm mại, không có hiệu ứng flash hay giật khung hình.
- **Feedback Duration:** **900ms** khi học sinh bấm chốt đáp án, giúp học sinh nhận diện màu xanh (Đúng) hoặc đỏ (Sai) kèm icon trực quan trước khi modal đóng lại.
- **Chế độ xem lại khi sai (Mistake Review):** Khi trả lời sai, modal không đóng đột ngột mà hiển thị gợi ý sư phạm và công thức chuẩn để học sinh kịp ghi nhớ lỗi sai (ví dụ: bẫy nhầm lẫn giữa đường kính $d$ và bán kính $r$, hoặc thiếu bình phương $r^2$).

---

## 4. Quản Lý Phiên Chơi & Vòng Đời Trò Chơi (Game Lifecycle & Replay)
- **Replay Session:** Nút [Chơi Lại Ván Mới] tạo ra một `gameSession` hoàn toàn mới:
  - Reset toàn bộ trạng thái: `score = 0`, `streak = 0`, `bossHP = 100%`, `lives = 3`.
  - Làm mới pool câu hỏi ngẫu nhiên bằng giải thuật xáo trộn Fisher-Yates từ ngân hàng đã duyệt.
  - Hủy triệt để requestAnimationFrame và timer của ván chơi trước, bảo đảm không bị duplicate timer hay leak event listener.
- **Chế độ Tạm Dừng (Pause Mode):** Tích hợp nút Pause (phím `P` hoặc nút trên HUD) cho phép học sinh dừng trò chơi bất cứ lúc nào để nghỉ mắt hoặc tra cứu sổ tay công thức.

---

## 5. Khả Năng Tiếp Cận Thị Giác (Visual Accessibility & Reduced Motion)
- **Hệ thống hạt (Particles):** Giới hạn tối đa 8 hạt trong Easy Mode (thay vì hàng chục hạt trước đây).
- **Screen Shake:** Hệ số giảm còn `0.25`. Đặc biệt, khi trình duyệt kích hoạt `prefers-reduced-motion: reduce`, độ rung được set cứng về `0` và toàn bộ hạt bay được triệt tiêu.
- **Màu sắc & Tương phản:** Nền game sử dụng gam màu xanh thẫm không gian phối hợp với màu xanh ngọc học đường, độ tương phản chữ > 4.5:1, không có gradient chói loá gây nhức mắt.
