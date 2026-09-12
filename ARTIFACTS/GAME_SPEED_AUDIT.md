# BÁO CÁO AUDIT TỐC ĐỘ VÀ TRẢI NGHIỆM GAME (GEOMETRY LAB)
**Ngày thực hiện:** 12/09/2026  
**Đối tượng:** Trò chơi "Hình Học 9 Master" (Flappy Geometry Bird & Đấu Boss Casio FX-580)  
**Mục tiêu:** Rà soát các yếu tố khiến game quá nhanh / khó thao tác / khó đọc, xây dựng chiến lược "Slow Mode + Easy Play UX" chuẩn mực cho học sinh lớp 9.

---

## 1. Thành Phần Khiến Game Quá Nhanh (Too Fast Factors)
1. **Tốc độ lướt của chướng ngại vật (Pipes/Barriers)**: Tốc độ cơ bản 2.4 px/frame (tương đương 144 px/giây). Với màn hình mobile 360-400px, học sinh chỉ có ~1.8 - 2.2 giây phản xạ trước khi va chạm, tạo áp lực phản xạ arcade thái quá.
2. **Khoảng cách sinh cột (Spawn Interval)**: 120 frames (2.0 giây giữa 2 cột ở 60 FPS). Cột xuất hiện dồn dập, học sinh vừa vượt qua cột này đã lập tức đối mặt cột tiếp theo.
3. **Chuyển tiếp câu hỏi (Question Confirmation & Transition)**: Trong `QuestionModal.tsx`, sau khi bấm chọn và xác nhận, timeout chỉ có `200ms` trước khi đóng modal và chuyển sang `PLAYING` hoặc `GAMEOVER`. Học sinh chưa kịp nhìn nhận diện đúng/sai đã bị giật chuyển cảnh.
4. **Trực tiếp Game Over khi trả lời sai**: Khi trả lời sai, game nhảy ngay sang màn hình `GAMEOVER` mà không cho học sinh xem đáp án đúng là gì, không kịp đọc lời giải thích toán học (`explanation`).
5. **Gia tốc trọng lực chim (Physics Tuning)**: Trọng lực `gravity = 0.38`, lực nhảy `jump = -6.8`, chim rơi nhanh và cần nhấp chuột/chạm liên tục với tần suất cao.

---

## 2. Animation Duration Hiện Tại
- **Fade in modal**: `animate-fadeIn` (150ms).
- **ProgressBar timer**: `transition-all duration-1000 linear`.
- **Boss health bar**: `duration-300`.
- **Answer submission transition**: `200ms` (quá ngắn, học sinh chưa kịp ghi nhận phản hồi ✓ ĐÚNG hay ✗ SAI).
- **Screen Shake**: Khởi tạo `shake = 12-14` với hệ số suy giảm `0.9` mỗi frame (~30-40 frames rung giật liên tục khi va chạm/bắn đạn).

---

## 3. Question Transition Hiện Tại
- **Thời gian hiển thị kết quả (Feedback Duration)**: `200ms` -> **TOO FAST**. Cần nâng lên `750ms - 900ms` (chuẩn 600-1000ms theo Phase 14).
- **Thời gian chuyển câu (Transition Duration)**: ~200ms -> Cần điều chỉnh thành `300ms - 350ms` mượt mà, có chỉ báo rõ ràng.
- **Xem lời giải khi sai (Explanation Buffer)**: Hiện tại `0ms` (chuyển thẳng sang Game Over) -> Cần có bước hiển thị Lời giải chi tiết + Phương án đúng với nút [Tiếp tục] hoặc [Xem lại].

---

## 4. Timer Hiện Tại
- **Thời gian làm bài mỗi câu (`timeLeft`)**: 60 giây.
- **Nhịp đếm timer**: `setInterval` 1000ms.
- **Trạng thái đếm**: Bắt đầu ngay khi mở modal. Timer hoạt động độc lập và reset đúng theo từng câu hỏi.

---

## 5. Game Object Speed (Tốc Độ Vật Thể)
- **Vận tốc ống (Pipes vx)**: Normal = `2.4 px/frame`; SlowMo = `1.4 px/frame` -> Cần cấu hình `GAME_SPEED_MULTIPLIER` = `0.7` (tương đương Normal = `1.6 - 1.7 px/frame` ở Easy Mode).
- **Trọng lực (Gravity)**: `0.38` -> Cần làm dịu thành `0.26 - 0.28` để chim lượn bồng bềnh hơn, giảm áp lực bấm liên tục.
- **Lực nhảy (Jump)**: `-6.8` -> Cần làm dịu tương ứng thành `-5.2` đến `-5.5`.
- **Tốc độ Boss (Boss vy)**: `1.5 px/frame` -> Giảm xuống `0.9 px/frame`.
- **Tốc độ Đạn bắn (Bullet vx)**: `12 px/frame` -> Giảm xuống `8.5 px/frame`.
- **Tần suất sinh cột (Spawn Interval)**: `120 frames` -> Tăng lên `170 - 180 frames` (giãn cách x1.45 - 1.5 lần theo Phase 7).

---

## 6. Input Timing
- **Phím bay**: Nhận Pointer Down + Space + Mũi tên lên.
- **Phím chọn đáp án**: Phím A/B/C/D, 1/2/3/4 + Enter xác nhận.
- **Touch target buttons**: Chiều cao các thẻ lựa chọn đáp án hiện tại là 52px (desktop) / 56px (mobile). Đáp ứng tiêu chuẩn Phase 9 (min 52px, touch >= 44px).

---

## 7. Replay Timing & Reset Flow
- Khi bấm [CHƠI LẠI VÁN MỚI]: Khởi tạo `handleStartGame()`, lấy 20 câu hỏi mới ngẫu nhiên từ Question Bank qua thuật toán Fisher-Yates, reset `score`, `streak`, `bossHP`, `bossHitsNeeded`.
- Vòng lặp rAF cũ được dọn dẹp an toàn qua `requestNextFrame` và `wakeUpLoopRef`.
- Cần đảm bảo cơ chế debounce / state lock chống click kép (`double click replay bug`).

---

## 8. CPU-Heavy Operations & Memory
- **KaTeX Re-renders**: Đã được tối ưu tách biệt bằng `useMemo` cho `memoizedPrompt` và `memoizedOptions`.
- **Canvas Stars & Particles**: Hiện tại sinh 20 sao và các hạt lửa `particles`. Cần giới hạn số lượng hạt tối đa và kích hoạt chế độ `prefers-reduced-motion`.
- **Background Throttling**: Đã tích hợp `visibilitychange` để ngắt animation khi học sinh rời tab.

---

## 9. Render Loop
- Sử dụng `requestAnimationFrame` duy nhất lồng trong `GameCanvas.tsx`.
- Điều phối qua `requestNextFrame` kiểm tra cờ `loopActiveRef` và trạng thái `gameState`.

---

## 10. Các Lỗi UX & Cognitive Load
1. **Thiếu nút [TẠM DỪNG] (PAUSE)**: Học sinh không thể dừng giữa chừng khi đang bay nếu cần nghỉ mắt hoặc suy nghĩ.
2. **Không có Chế độ Dễ Chơi / Tốc độ Chậm**: Mặc định áp dụng tốc độ nhanh kiểu game thùng arcade, không phù hợp cho bối cảnh học tập toán học lớp 9.
3. **Mất cơ hội học tập khi trả lời sai**: Học sinh trả lời sai lập tức thua cuộc mà không được học từ lỗi sai thông qua lời giải của câu hỏi.
4. **Screen Shake hơi giật**: `shake = 12-14` gây chóng mặt cho học sinh nhạy cảm thị giác.
5. **Cần xác nhận rõ ràng 2 nhịp (Feedback Clarity)**: Cần hiển thị dấu tích xanh [✓ ĐÚNG] hoặc gạch chéo đỏ [✗ SAI] kèm thời gian lưu tối thiểu 700-900ms để học sinh tiếp thu kết quả trước khi hệ thống chuyển tiếp.
