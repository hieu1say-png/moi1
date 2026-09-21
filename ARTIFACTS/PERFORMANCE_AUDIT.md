# BÁO CÁO KIỂM ĐỊNH HIỆU NĂNG ỨNG DỤNG (PERFORMANCE AUDIT)
**Dự án:** Geometry Lab Toán 9  
**Tài liệu:** `/ARTIFACTS/PERFORMANCE_AUDIT.md`  
**Chỉ số mục tiêu:** 60 FPS mượt mà, Tối ưu hóa chu kỳ re-render, Chống rò rỉ bộ nhớ (Zero Memory Leaks)

---

## 1. Tối Ưu Hóa Chu Kỳ Re-render Trong React (Render Optimization)
Để bảo đảm trò chơi và các mô hình 3D hoạt động trơn tru không bị giật khung hình (frame dropping):
1. **Cô lập trạng thái Canvas (Decoupled Canvas Loop):** Trong `GameCanvas.tsx`, vòng lặp `requestAnimationFrame` không phụ thuộc trực tiếp vào các biến state React. Hệ thống sử dụng `propsRef` và `stateRef` để đọc thông số mới nhất của người chơi mà không cần kích hoạt re-render toàn bộ DOM mỗi frame.
2. **Ghi nhớ công thức toán (Memoization with useMemo):** Trong `QuestionModal.tsx`, các chuỗi toán học KaTeX được bọc trong `useMemo`:
   ```tsx
   const memoizedPrompt = useMemo(() => <MathText text={currentQuestion.q} />, [currentQuestion.id, currentQuestion.q]);
   const memoizedOptions = useMemo(() => currentQuestion.options.map((opt, idx) => ({ ... })), [currentQuestion.id, currentQuestion.options]);
   ```
   Nhờ đó, khi đồng hồ đếm ngược `timeLeft` cập nhật mỗi giây, cây DOM của câu hỏi và 4 phương án không bị re-render hay parse lại KaTeX.
3. **Sử dụng React.memo trên các component con:** `Card`, `Badge`, `MathFormula`, `ParameterPanel` đều được bọc `React.memo` để triệt tiêu các lần re-render thừa từ component cha.

---

## 2. Phòng Ngừa Rò Rỉ Bộ Nhớ (Memory Leak Prevention)
- **Quản lý Event Listener:** Mọi sự kiện lắng nghe bàn phím (`keydown`), cử chỉ chạm (`pointerdown`, `touchmove`), và thay đổi kích thước cửa sổ (`resize`) đều có hàm gỡ bỏ `removeEventListener` tương ứng trong phần cleanup của `useEffect`.
- **Dọn dẹp Timer & RAF:** Toàn bộ `setInterval`, `setTimeout`, và `requestAnimationFrame` đều lưu ID vào `ref` và được hủy triệt để bằng `clearInterval`, `clearTimeout`, `cancelAnimationFrame` khi component unmount.
- **Dọn dẹp tài nguyên đồ họa Three.js:** Trong tất cả các component 3D (`CylinderModel`, `ConeModel`, `SphereModel`, `LiquidSimulation`), toàn bộ `BufferGeometry`, `Material`, `Texture` và `WebGLRenderer` đều được gọi `.dispose()` đầy đủ.

---

## 3. Tiết Kiệm Năng Lượng & Điều Tiết Tab Nền (Background Throttling)
- **Tích hợp `document.addEventListener('visibilitychange')`:** Khi học sinh chuyển sang tab khác (ví dụ mở từ điển hoặc tra cứu tài liệu), vòng lặp render đồ họa tự động tạm ngưng, đưa mức tiêu thụ CPU về xấp xỉ 0%.
- Khi học sinh quay lại tab, hệ thống tự động đánh thức vòng lặp một cách êm ái mà không làm sai lệch vị trí của chim hay thời gian làm bài.

---

## 4. Tải Tài Nguyên & Mạng (Network & Asset Efficiency)
- **Tải Video Lý Thuyết:** Hỗ trợ cơ chế tải trực tiếp Vercel Blob và tải chia nhỏ phân đoạn (Chunked Uploads) có kiểm tra mã SHA/MD5, không gây nghẽn băng thông của trình duyệt.
- **Kích thước Bundle:** Chia nhỏ code theo route (Code Splitting), các module 3D và ngân hàng câu hỏi 1,000 câu được tải lười (lazy loading) theo nhu cầu sử dụng thực tế.
