/**
 * GEOMETRY LAB - GENERATE MASTER QUESTION BANK
 * Source of truth: "Câu 1(2).pdf"
 */

const fs = require('fs');
const path = require('path');

const allItems = [];

// Helper to push items
function pushGroup(items) {
  for (const it of items) {
    allItems.push(it);
  }
}

// ----------------------------------------------------
// Nhóm 1: 1.1 -> 1.10 (Gạch đất sét hình trụ 4 lỗ)
// Page: 1-2
// ----------------------------------------------------
pushGroup([
  {
    sourceNumber: "1.1",
    sourcePage: 1,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_BRICK_HOLES",
    difficulty: "LEVEL_2",
    question: "Một viên gạch làm từ đất sét dạng hình hộp chữ nhật có đáy là hình vuông cạnh $10\\text{ cm}$ và chiều cao $20\\text{ cm}$. Bên trong viên gạch có bốn lỗ dạng hình trụ bằng nhau xuyên qua hai đáy có đường kính là $3\\text{ cm}$. Thể tích đất sét (làm tròn đến hàng đơn vị của centimét khối) để làm một viên gạch là:",
    options: [
      { id: "A", text: "$1435\\text{ cm}^3$" },
      { id: "B", text: "$2000\\text{ cm}^3$" },
      { id: "C", text: "$1565\\text{ cm}^3$" },
      { id: "D", text: "$1820\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Phân tích kích thước viên gạch và 4 lỗ hình trụ: Thể tích khối hộp chữ nhật ngoài $V_{\\text{hộp}} = 10 \\times 10 \\times 20 = 2000\\text{ cm}^3$. Bán kính mỗi lỗ trụ $r = 3 / 2 = 1{,}5\\text{ cm}$, chiều cao lỗ $h = 20\\text{ cm}$.",
      "Bước 2: Lựa chọn công thức: Thể tích đất sét thực tế $V_{\\text{đất}} = V_{\\text{hộp}} - 4 \\times V_{\\text{lỗ}} = a^2 \\cdot h - 4 \\cdot \\pi r^2 h$.",
      "Bước 3: Thực hiện tính toán: $V_{\\text{lỗ}} = \\pi \\times (1{,}5)^2 \\times 20 = 45\\pi\\text{ cm}^3$. Tổng thể tích 4 lỗ: $4 \\times 45\\pi = 180\\pi \\approx 565{,}49\\text{ cm}^3$. Thể tích đất sét: $V_{\\text{đất}} = 2000 - 180\\pi \\approx 2000 - 565{,}49 = 1434{,}51\\text{ cm}^3 \\approx 1435\\text{ cm}^3$.",
      "Bước 4: Kết luận: Thể tích đất sét làm một viên gạch là $1435\\text{ cm}^3$. Chọn đáp án A."
    ],
    importantNotes: ["Bán kính đáy của mỗi lỗ tròn bằng một nửa đường kính: $r = d/2$.", "Thể tích đất sét bằng thể tích hình hộp trừ đi tổng thể tích của cả 4 lỗ trụ."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "1.2",
    sourcePage: 1,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_BRICK_HOLES",
    difficulty: "LEVEL_2",
    question: "Một viên gạch làm từ đất sét dạng hình hộp chữ nhật có đáy là hình vuông cạnh $9\\text{ cm}$ và chiều cao $21\\text{ cm}$. Bên trong viên gạch có bốn lỗ dạng hình trụ bằng nhau xuyên qua hai đáy có đường kính là $2\\text{ cm}$. Thể tích đất sét (làm tròn đến hàng đơn vị của centimét khối) để làm một viên gạch là:",
    options: [
      { id: "A", text: "$1701\\text{ cm}^3$" },
      { id: "B", text: "$1437\\text{ cm}^3$" },
      { id: "C", text: "$1500\\text{ cm}^3$" },
      { id: "D", text: "$1617\\text{ cm}^3$" }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: Tính thể tích khối hộp: $V_{\\text{hộp}} = 9^2 \\times 21 = 81 \\times 21 = 1701\\text{ cm}^3$.",
      "Bước 2: Xác định kích thước mỗi lỗ trụ: Bán kính $r = 2 / 2 = 1\\text{ cm}$, chiều cao $h = 21\\text{ cm}$.",
      "Bước 3: Tính tổng thể tích 4 lỗ: $V_{4\\text{lỗ}} = 4 \\times (\\pi \\times 1^2 \\times 21) = 84\\pi \\approx 263{,}89\\text{ cm}^3$. Thể tích đất: $V_{\\text{đất}} = 1701 - 84\\pi \\approx 1437{,}11\\text{ cm}^3 \\approx 1437\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án B ($1437\\text{ cm}^3$)."
    ],
    importantNotes: ["Đường kính $d = 2\\text{ cm} \\Rightarrow r = 1\\text{ cm}$."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "1.3",
    sourcePage: 1,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_BRICK_HOLES",
    difficulty: "LEVEL_2",
    question: "Một viên gạch làm từ đất sét dạng hình hộp chữ nhật có đáy là hình vuông cạnh $8\\text{ cm}$ và chiều cao $20\\text{ cm}$. Bên trong viên gạch có bốn lỗ dạng hình trụ bằng nhau xuyên qua hai đáy có đường kính là $2{,}5\\text{ cm}$. Thể tích đất sét (làm tròn đến hàng đơn vị của centimét khối) để làm một viên gạch là:",
    options: [
      { id: "A", text: "$1280\\text{ cm}^3$" },
      { id: "B", text: "$987\\text{ cm}^3$" },
      { id: "C", text: "$887\\text{ cm}^3$" },
      { id: "D", text: "$1000\\text{ cm}^3$" }
    ],
    correctAnswer: "C",
    solution4Steps: [
      "Bước 1: Tính thể tích bao ngoài: $V_{\\text{hộp}} = 8^2 \\times 20 = 64 \\times 20 = 1280\\text{ cm}^3$.",
      "Bước 2: Tính bán kính lỗ trụ: $r = 2{,}5 / 2 = 1{,}25\\text{ cm}$.",
      "Bước 3: Tính tổng thể tích 4 lỗ: $4 \\times \\pi \\times (1{,}25)^2 \\times 20 = 125\\pi \\approx 392{,}70\\text{ cm}^3$. Thể tích đất: $1280 - 125\\pi \\approx 887{,}30\\text{ cm}^3 \\approx 887\\text{ cm}^3$.",
      "Bước 4: Kết luận: Thể tích đất sét là $887\\text{ cm}^3$. Chọn đáp án C."
    ],
    importantNotes: ["Chú ý bán kính $r = 1{,}25\\text{ cm}$."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "1.4",
    sourcePage: 1,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_BRICK_HOLES",
    difficulty: "LEVEL_2",
    question: "Một viên gạch làm từ đất sét dạng hình hộp chữ nhật có đáy là hình vuông cạnh $12\\text{ cm}$ và chiều cao $25\\text{ cm}$. Bên trong viên gạch có bốn lỗ dạng hình trụ bằng nhau xuyên qua hai đáy có đường kính là $4\\text{ cm}$. Thể tích đất sét (làm tròn đến hàng đơn vị của centimét khối) để làm một viên gạch là:",
    options: [
      { id: "A", text: "$3600\\text{ cm}^3$" },
      { id: "B", text: "$3200\\text{ cm}^3$" },
      { id: "C", text: "$2500\\text{ cm}^3$" },
      { id: "D", text: "$2343\\text{ cm}^3$" }
    ],
    correctAnswer: "D",
    solution4Steps: [
      "Bước 1: Thể tích hình hộp chữ nhật: $V_{\\text{hộp}} = 12^2 \\times 25 = 144 \\times 25 = 3600\\text{ cm}^3$.",
      "Bước 2: Bán kính mỗi lỗ trụ: $r = 4 / 2 = 2\\text{ cm}$.",
      "Bước 3: Tổng thể tích 4 lỗ trụ: $V_{4\\text{lỗ}} = 4 \\times (\\pi \\times 2^2 \\times 25) = 400\\pi \\approx 1256{,}64\\text{ cm}^3$. Thể tích đất sét: $V_{\\text{đất}} = 3600 - 400\\pi \\approx 2343{,}36\\text{ cm}^3 \\approx 2343\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án D ($2343\\text{ cm}^3$)."
    ],
    importantNotes: ["Tránh quên nhân với 4 vì có 4 lỗ hình trụ."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "1.5",
    sourcePage: 1,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_BRICK_HOLES",
    difficulty: "LEVEL_2",
    question: "Một viên gạch làm từ đất sét dạng hình hộp chữ nhật có đáy là hình vuông cạnh $10\\text{ cm}$ và chiều cao $22\\text{ cm}$. Bên trong viên gạch có bốn lỗ dạng hình trụ bằng nhau xuyên qua hai đáy có đường kính là $2{,}5\\text{ cm}$. Thể tích đất sét (làm tròn đến hàng đơn vị của centimét khối) để làm một viên gạch là:",
    options: [
      { id: "A", text: "$1768\\text{ cm}^3$" },
      { id: "B", text: "$2200\\text{ cm}^3$" },
      { id: "C", text: "$1800\\text{ cm}^3$" },
      { id: "D", text: "$1650\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V_{\\text{hộp}} = 10^2 \\times 22 = 2200\\text{ cm}^3$.",
      "Bước 2: Bán kính lỗ $r = 2{,}5 / 2 = 1{,}25\\text{ cm}$.",
      "Bước 3: $V_{4\\text{lỗ}} = 4 \\times \\pi \\times (1{,}25)^2 \\times 22 = 137{,}5\\pi \\approx 431{,}97\\text{ cm}^3$. $V_{\\text{đất}} = 2200 - 137{,}5\\pi \\approx 1768{,}03\\text{ cm}^3 \\approx 1768\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($1768\\text{ cm}^3$)."
    ],
    importantNotes: ["Làm tròn chính xác đến hàng đơn vị."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "1.6",
    sourcePage: 1,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_BRICK_HOLES",
    difficulty: "LEVEL_2",
    question: "Một viên gạch làm từ đất sét dạng hình hộp chữ nhật có đáy là hình vuông cạnh $8{,}5\\text{ cm}$ và chiều cao $22\\text{ cm}$. Bên trong viên gạch có bốn lỗ dạng hình trụ bằng nhau xuyên qua hai đáy có đường kính là $2{,}5\\text{ cm}$. Thể tích đất sét (làm tròn đến hàng đơn vị của centimét khối) để làm một viên gạch là:",
    options: [
      { id: "A", text: "$1590\\text{ cm}^3$" },
      { id: "B", text: "$1158\\text{ cm}^3$" },
      { id: "C", text: "$1200\\text{ cm}^3$" },
      { id: "D", text: "$1100\\text{ cm}^3$" }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: Thể tích khối hộp: $V_{\\text{hộp}} = (8{,}5)^2 \\times 22 = 72{,}25 \\times 22 = 1589{,}5\\text{ cm}^3$.",
      "Bước 2: Kích thước lỗ: $r = 1{,}25\\text{ cm}, h = 22\\text{ cm}$.",
      "Bước 3: $V_{4\\text{lỗ}} = 4 \\times \\pi \\times (1{,}25)^2 \\times 22 = 137{,}5\\pi \\approx 431{,}97\\text{ cm}^3$. $V_{\\text{đất}} = 1589{,}5 - 431{,}97 = 1157{,}53\\text{ cm}^3 \\approx 1158\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án B ($1158\\text{ cm}^3$)."
    ],
    importantNotes: ["Số thập phân $8{,}5^2 = 72{,}25$."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "1.7",
    sourcePage: 1,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_BRICK_HOLES",
    difficulty: "LEVEL_2",
    question: "Một viên gạch làm từ đất sét dạng hình hộp chữ nhật có đáy là hình vuông cạnh $11\\text{ cm}$ và chiều cao $20\\text{ cm}$. Bên trong viên gạch có bốn lỗ dạng hình trụ bằng nhau xuyên qua hai đáy có đường kính là $3\\text{ cm}$. Thể tích đất sét (làm tròn đến hàng đơn vị của centimét khối) để làm một viên gạch là:",
    options: [
      { id: "A", text: "$2420\\text{ cm}^3$" },
      { id: "B", text: "$2000\\text{ cm}^3$" },
      { id: "C", text: "$1855\\text{ cm}^3$" },
      { id: "D", text: "$1900\\text{ cm}^3$" }
    ],
    correctAnswer: "C",
    solution4Steps: [
      "Bước 1: $V_{\\text{hộp}} = 11^2 \\times 20 = 121 \\times 20 = 2420\\text{ cm}^3$.",
      "Bước 2: Bán kính mỗi lỗ $r = 1{,}5\\text{ cm}$.",
      "Bước 3: $V_{4\\text{lỗ}} = 4 \\times \\pi \\times (1{,}5)^2 \\times 20 = 180\\pi \\approx 565{,}49\\text{ cm}^3$. $V_{\\text{đất}} = 2420 - 180\\pi \\approx 1854{,}51\\text{ cm}^3 \\approx 1855\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án C ($1855\\text{ cm}^3$)."
    ],
    importantNotes: ["Thể tích đất sét là $1855\\text{ cm}^3$."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "1.8",
    sourcePage: 1,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_BRICK_HOLES",
    difficulty: "LEVEL_2",
    question: "Một viên gạch làm từ đất sét dạng hình hộp chữ nhật có đáy là hình vuông cạnh $9{,}5\\text{ cm}$ và chiều cao $21\\text{ cm}$. Bên trong viên gạch có bốn lỗ dạng hình trụ bằng nhau xuyên qua hai đáy có đường kính là $2{,}5\\text{ cm}$. Thể tích đất sét (làm tròn đến hàng đơn vị của centimét khối) để làm một viên gạch là:",
    options: [
      { id: "A", text: "$1895\\text{ cm}^3$" },
      { id: "B", text: "$1500\\text{ cm}^3$" },
      { id: "C", text: "$1400\\text{ cm}^3$" },
      { id: "D", text: "$1483\\text{ cm}^3$" }
    ],
    correctAnswer: "D",
    solution4Steps: [
      "Bước 1: Thể tích khối hộp: $V_{\\text{hộp}} = (9{,}5)^2 \\times 21 = 90{,}25 \\times 21 = 1895{,}25\\text{ cm}^3$.",
      "Bước 2: Bán kính mỗi lỗ $r = 1{,}25\\text{ cm}$.",
      "Bước 3: $V_{4\\text{lỗ}} = 4 \\times \\pi \\times (1{,}25)^2 \\times 21 = 131{,}25\\pi \\approx 412{,}33\\text{ cm}^3$. $V_{\\text{đất}} = 1895{,}25 - 412{,}33 = 1482{,}92\\text{ cm}^3 \\approx 1483\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án D ($1483\\text{ cm}^3$)."
    ],
    importantNotes: ["Làm tròn đúng quy tắc."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "1.9",
    sourcePage: 1,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_BRICK_HOLES",
    difficulty: "LEVEL_2",
    question: "Một viên gạch làm từ đất sét dạng hình hộp chữ nhật có đáy là hình vuông cạnh $15\\text{ cm}$ và chiều cao $30\\text{ cm}$. Bên trong viên gạch có bốn lỗ dạng hình trụ bằng nhau xuyên qua hai đáy có đường kính là $5\\text{ cm}$. Thể tích đất sét (làm tròn đến hàng đơn vị của centimét khối) để làm một viên gạch là:",
    options: [
      { id: "A", text: "$4394\\text{ cm}^3$" },
      { id: "B", text: "$6750\\text{ cm}^3$" },
      { id: "C", text: "$5000\\text{ cm}^3$" },
      { id: "D", text: "$4500\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích bao ngoài: $V_{\\text{hộp}} = 15^2 \\times 30 = 225 \\times 30 = 6750\\text{ cm}^3$.",
      "Bước 2: Bán kính mỗi lỗ: $r = 5 / 2 = 2{,}5\\text{ cm}$.",
      "Bước 3: $V_{4\\text{lỗ}} = 4 \\times \\pi \\times (2{,}5)^2 \\times 30 = 750\\pi \\approx 2356{,}19\\text{ cm}^3$. $V_{\\text{đất}} = 6750 - 750\\pi \\approx 4393{,}81\\text{ cm}^3 \\approx 4394\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($4394\\text{ cm}^3$)."
    ],
    importantNotes: ["Bán kính $r = 2{,}5\\text{ cm}$."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "1.10",
    sourcePage: 2,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_BRICK_HOLES",
    difficulty: "LEVEL_2",
    question: "Một viên gạch làm từ đất sét dạng hình hộp chữ nhật có đáy là hình vuông cạnh $8\\text{ cm}$ và chiều cao $18\\text{ cm}$. Bên trong viên gạch có bốn lỗ dạng hình trụ bằng nhau xuyên qua hai đáy có đường kính là $2\\text{ cm}$. Thể tích đất sét (làm tròn đến hàng đơn vị của centimét khối) để làm một viên gạch là:",
    options: [
      { id: "A", text: "$1152\\text{ cm}^3$" },
      { id: "B", text: "$926\\text{ cm}^3$" },
      { id: "C", text: "$1000\\text{ cm}^3$" },
      { id: "D", text: "$850\\text{ cm}^3$" }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: Thể tích khối hộp: $V_{\\text{hộp}} = 8^2 \\times 18 = 64 \\times 18 = 1152\\text{ cm}^3$.",
      "Bước 2: Bán kính mỗi lỗ: $r = 2 / 2 = 1\\text{ cm}$.",
      "Bước 3: $V_{4\\text{lỗ}} = 4 \\times \\pi \\times 1^2 \\times 18 = 72\\pi \\approx 226{,}19\\text{ cm}^3$. $V_{\\text{đất}} = 1152 - 72\\pi \\approx 925{,}81\\text{ cm}^3 \\approx 926\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án B ($926\\text{ cm}^3$)."
    ],
    importantNotes: ["$V_{\\text{đất}} = 926\\text{ cm}^3$."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  }
]);

console.log("Group 1 completed (10 questions). Total questions so far:", allItems.length);
