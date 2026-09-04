/**
 * GEOMETRY LAB - GROUPS 1 TO 5 (50 Questions)
 * Source of truth: "Câu 1(2).pdf" Pages 1 to 7
 */

module.exports = [
  // Nhóm 1 (1.1 - 1.10)
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
      "Bước 1: Phân tích kích thước: Thể tích khối hộp $V_{\\text{hộp}} = 10 \\times 10 \\times 20 = 2000\\text{ cm}^3$. Bán kính mỗi lỗ $r = 3/2 = 1{,}5\\text{ cm}$, chiều cao $h = 20\\text{ cm}$.",
      "Bước 2: Lựa chọn công thức: $V_{\\text{đất}} = V_{\\text{hộp}} - 4 \\times V_{\\text{lỗ}} = a^2 h - 4\\pi r^2 h$.",
      "Bước 3: Tính toán: $V_{\\text{lỗ}} = \\pi \\times (1{,}5)^2 \\times 20 = 45\\pi\\text{ cm}^3$. $V_{\\text{đất}} = 2000 - 4 \\times 45\\pi = 2000 - 180\\pi \\approx 1435\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($1435\\text{ cm}^3$)."
    ],
    importantNotes: ["Bán kính $r = d/2 = 1{,}5\\text{ cm}$.", "Trừ đi thể tích của cả 4 lỗ trụ."],
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
      "Bước 1: Thể tích khối hộp $V_{\\text{hộp}} = 9^2 \\times 21 = 1701\\text{ cm}^3$.",
      "Bước 2: Bán kính mỗi lỗ $r = 2/2 = 1\\text{ cm}$, chiều cao $h = 21\\text{ cm}$.",
      "Bước 3: $V_{4\\text{lỗ}} = 4 \\times (\\pi \\times 1^2 \\times 21) = 84\\pi \\approx 263{,}89\\text{ cm}^3$. $V_{\\text{đất}} = 1701 - 84\\pi \\approx 1437\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án B ($1437\\text{ cm}^3$)."
    ],
    importantNotes: ["$r = 1\\text{ cm}$."],
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
      "Bước 1: $V_{\\text{hộp}} = 8^2 \\times 20 = 1280\\text{ cm}^3$.",
      "Bước 2: Bán kính lỗ $r = 2{,}5/2 = 1{,}25\\text{ cm}$.",
      "Bước 3: $V_{4\\text{lỗ}} = 4 \\times \\pi \\times (1{,}25)^2 \\times 20 = 125\\pi \\approx 392{,}7\\text{ cm}^3$. $V_{\\text{đất}} = 1280 - 125\\pi \\approx 887\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án C ($887\\text{ cm}^3$)."
    ],
    importantNotes: ["$r = 1{,}25\\text{ cm}$."],
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
      "Bước 1: $V_{\\text{hộp}} = 12^2 \\times 25 = 3600\\text{ cm}^3$.",
      "Bước 2: $r = 4/2 = 2\\text{ cm}, h = 25\\text{ cm}$.",
      "Bước 3: $V_{4\\text{lỗ}} = 4 \\times \\pi \\times 2^2 \\times 25 = 400\\pi \\approx 1256{,}64\\text{ cm}^3$. $V_{\\text{đất}} = 3600 - 400\\pi \\approx 2343\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án D ($2343\\text{ cm}^3$)."
    ],
    importantNotes: ["$r = 2\\text{ cm}$."],
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
      "Bước 2: Bán kính mỗi lỗ $r = 1{,}25\\text{ cm}$.",
      "Bước 3: $V_{4\\text{lỗ}} = 4 \\times \\pi \\times (1{,}25)^2 \\times 22 = 137{,}5\\pi \\approx 431{,}97\\text{ cm}^3$. $V_{\\text{đất}} = 2200 - 137{,}5\\pi \\approx 1768\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($1768\\text{ cm}^3$)."
    ],
    importantNotes: ["$V_{\\text{đất}} = 1768\\text{ cm}^3$."],
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
      "Bước 1: $V_{\\text{hộp}} = (8{,}5)^2 \\times 22 = 1589{,}5\\text{ cm}^3$.",
      "Bước 2: $r = 1{,}25\\text{ cm}, h = 22\\text{ cm}$.",
      "Bước 3: $V_{4\\text{lỗ}} = 4 \\times \\pi \\times (1{,}25)^2 \\times 22 = 137{,}5\\pi \\approx 431{,}97\\text{ cm}^3$. $V_{\\text{đất}} = 1589{,}5 - 431{,}97 \\approx 1158\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án B ($1158\\text{ cm}^3$)."
    ],
    importantNotes: ["$(8{,}5)^2 = 72{,}25$."],
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
      "Bước 1: $V_{\\text{hộp}} = 11^2 \\times 20 = 2420\\text{ cm}^3$.",
      "Bước 2: $r = 1{,}5\\text{ cm}, h = 20\\text{ cm}$.",
      "Bước 3: $V_{4\\text{lỗ}} = 4 \\times \\pi \\times (1{,}5)^2 \\times 20 = 180\\pi \\approx 565{,}49\\text{ cm}^3$. $V_{\\text{đất}} = 2420 - 180\\pi \\approx 1855\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án C ($1855\\text{ cm}^3$)."
    ],
    importantNotes: ["$V_{\\text{đất}} = 1855\\text{ cm}^3$."],
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
      "Bước 1: $V_{\\text{hộp}} = (9{,}5)^2 \\times 21 = 1895{,}25\\text{ cm}^3$.",
      "Bước 2: $r = 1{,}25\\text{ cm}, h = 21\\text{ cm}$.",
      "Bước 3: $V_{4\\text{lỗ}} = 4 \\times \\pi \\times (1{,}25)^2 \\times 21 = 131{,}25\\pi \\approx 412{,}33\\text{ cm}^3$. $V_{\\text{đất}} = 1895{,}25 - 412{,}33 \\approx 1483\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án D ($1483\\text{ cm}^3$)."
    ],
    importantNotes: ["$V_{\\text{đất}} = 1483\\text{ cm}^3$."],
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
      "Bước 1: $V_{\\text{hộp}} = 15^2 \\times 30 = 6750\\text{ cm}^3$.",
      "Bước 2: $r = 5/2 = 2{,}5\\text{ cm}, h = 30\\text{ cm}$.",
      "Bước 3: $V_{4\\text{lỗ}} = 4 \\times \\pi \\times (2{,}5)^2 \\times 30 = 750\\pi \\approx 2356{,}19\\text{ cm}^3$. $V_{\\text{đất}} = 6750 - 750\\pi \\approx 4394\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($4394\\text{ cm}^3$)."
    ],
    importantNotes: ["$V_{\\text{đất}} = 4394\\text{ cm}^3$."],
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
      "Bước 1: $V_{\\text{hộp}} = 8^2 \\times 18 = 1152\\text{ cm}^3$.",
      "Bước 2: $r = 2/2 = 1\\text{ cm}, h = 18\\text{ cm}$.",
      "Bước 3: $V_{4\\text{lỗ}} = 4 \\times \\pi \\times 1^2 \\times 18 = 72\\pi \\approx 226{,}19\\text{ cm}^3$. $V_{\\text{đất}} = 1152 - 72\\pi \\approx 926\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án B ($926\\text{ cm}^3$)."
    ],
    importantNotes: ["$V_{\\text{đất}} = 926\\text{ cm}^3$."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  },

  // Nhóm 2 (2.1 - 2.10)
  {
    sourceNumber: "2.1",
    sourcePage: 2,
    topic: "CYLINDER",
    subtopic: "CYLINDER_ROTATION",
    archetypeId: "CYLINDER_ROTATION",
    difficulty: "LEVEL_2",
    question: "Cho hình chữ nhật $ABCD$ có $AB = 4\\text{ cm}, AD = 6\\text{ cm}$. Quay hình chữ nhật $ABCD$ một vòng quanh cạnh $AB$ cố định ta được một hình trụ có diện tích xung quanh bằng:",
    options: [
      { id: "A", text: "$48\\pi\\text{ cm}^2$" },
      { id: "B", text: "$24\\pi\\text{ cm}^2$" },
      { id: "C", text: "$36\\pi\\text{ cm}^2$" },
      { id: "D", text: "$12\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Xác định trục quay và kích thước: Cạnh $AB$ cố định làm trục quay nên chiều cao $h = AB = 4\\text{ cm}$. Bán kính đáy $r = AD = 6\\text{ cm}$.",
      "Bước 2: Công thức diện tích xung quanh: $S_{xq} = 2\\pi r h$.",
      "Bước 3: Thay số tính toán: $S_{xq} = 2\\pi \\times 6 \\times 4 = 48\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($48\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["Quay quanh cạnh nào thì cạnh đó là chiều cao $h$, cạnh vuông góc là bán kính đáy $r$."],
    formulaTags: ["CYLINDER_ROTATION", "CYLINDER_AREA"]
  },
  {
    sourceNumber: "2.2",
    sourcePage: 2,
    topic: "CYLINDER",
    subtopic: "CYLINDER_ROTATION",
    archetypeId: "CYLINDER_ROTATION",
    difficulty: "LEVEL_2",
    question: "Cho hình chữ nhật $MNPQ$ có $MN = 5\\text{ cm}, MQ = 3\\text{ cm}$. Quay hình chữ nhật $MNPQ$ một vòng quanh cạnh $MN$ cố định ta được một hình trụ có diện tích xung quanh bằng:",
    options: [
      { id: "A", text: "$15\\pi\\text{ cm}^2$" },
      { id: "B", text: "$30\\pi\\text{ cm}^2$" },
      { id: "C", text: "$45\\pi\\text{ cm}^2$" },
      { id: "D", text: "$25\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: Trục quay $MN$ nên $h = MN = 5\\text{ cm}$, bán kính đáy $r = MQ = 3\\text{ cm}$.",
      "Bước 2: Công thức $S_{xq} = 2\\pi r h$.",
      "Bước 3: $S_{xq} = 2\\pi \\times 3 \\times 5 = 30\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án B ($30\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{xq} = 30\\pi\\text{ cm}^2$."],
    formulaTags: ["CYLINDER_ROTATION", "CYLINDER_AREA"]
  },
  {
    sourceNumber: "2.3",
    sourcePage: 2,
    topic: "CYLINDER",
    subtopic: "CYLINDER_ROTATION",
    archetypeId: "CYLINDER_ROTATION",
    difficulty: "LEVEL_2",
    question: "Cho hình chữ nhật $ABCD$ có $AB = 7\\text{ cm}, BC = 2\\text{ cm}$. Quay hình chữ nhật $ABCD$ một vòng quanh cạnh $BC$ cố định ta được một hình trụ có diện tích xung quanh bằng:",
    options: [
      { id: "A", text: "$28\\pi\\text{ cm}^2$" },
      { id: "B", text: "$14\\pi\\text{ cm}^2$" },
      { id: "C", text: "$56\\pi\\text{ cm}^2$" },
      { id: "D", text: "$49\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Trục quay $BC$ nên $h = BC = 2\\text{ cm}$, bán kính đáy $r = AB = 7\\text{ cm}$.",
      "Bước 2: Áp dụng $S_{xq} = 2\\pi r h$.",
      "Bước 3: $S_{xq} = 2\\pi \\times 7 \\times 2 = 28\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($28\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["Quay quanh $BC$ thì $r = AB = 7\\text{ cm}$."],
    formulaTags: ["CYLINDER_ROTATION", "CYLINDER_AREA"]
  },
  {
    sourceNumber: "2.4",
    sourcePage: 2,
    topic: "CYLINDER",
    subtopic: "CYLINDER_ROTATION",
    archetypeId: "CYLINDER_ROTATION",
    difficulty: "LEVEL_2",
    question: "Cho hình chữ nhật $ABCD$ có $AB = 3\\text{ cm}, AD = 8\\text{ cm}$. Quay hình chữ nhật $ABCD$ một vòng quanh cạnh $AB$ cố định ta được một hình trụ có diện tích xung quanh bằng:",
    options: [
      { id: "A", text: "$24\\pi\\text{ cm}^2$" },
      { id: "B", text: "$48\\pi\\text{ cm}^2$" },
      { id: "C", text: "$96\\pi\\text{ cm}^2$" },
      { id: "D", text: "$64\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: Chiều cao $h = AB = 3\\text{ cm}$, bán kính đáy $r = AD = 8\\text{ cm}$.",
      "Bước 2: $S_{xq} = 2\\pi r h$.",
      "Bước 3: $S_{xq} = 2\\pi \\times 8 \\times 3 = 48\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án B ($48\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{xq} = 48\\pi\\text{ cm}^2$."],
    formulaTags: ["CYLINDER_ROTATION", "CYLINDER_AREA"]
  },
  {
    sourceNumber: "2.5",
    sourcePage: 2,
    topic: "CYLINDER",
    subtopic: "CYLINDER_ROTATION",
    archetypeId: "CYLINDER_ROTATION",
    difficulty: "LEVEL_2",
    question: "Cho hình chữ nhật $ABCD$ có chiều dài $10\\text{ cm}$, chiều rộng $4\\text{ cm}$. Quay hình chữ nhật một vòng quanh trục là cạnh chiều dài cố định ta được một hình trụ có diện tích xung quanh bằng:",
    options: [
      { id: "A", text: "$40\\pi\\text{ cm}^2$" },
      { id: "B", text: "$160\\pi\\text{ cm}^2$" },
      { id: "C", text: "$80\\pi\\text{ cm}^2$" },
      { id: "D", text: "$100\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "C",
    solution4Steps: [
      "Bước 1: Trục quay là chiều dài nên $h = 10\\text{ cm}$, bán kính đáy là chiều rộng $r = 4\\text{ cm}$.",
      "Bước 2: $S_{xq} = 2\\pi r h$.",
      "Bước 3: $S_{xq} = 2\\pi \\times 4 \\times 10 = 80\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án C ($80\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$h = 10\\text{ cm}, r = 4\\text{ cm}$."],
    formulaTags: ["CYLINDER_ROTATION", "CYLINDER_AREA"]
  },
  {
    sourceNumber: "2.6",
    sourcePage: 3,
    topic: "CYLINDER",
    subtopic: "CYLINDER_ROTATION",
    archetypeId: "CYLINDER_ROTATION",
    difficulty: "LEVEL_2",
    question: "Cho hình chữ nhật $ABCD$ có $AB = 6\\text{ cm}, AD = 5\\text{ cm}$. Quay hình chữ nhật $ABCD$ một vòng quanh cạnh $AD$ cố định ta được một hình trụ có diện tích xung quanh bằng:",
    options: [
      { id: "A", text: "$60\\pi\\text{ cm}^2$" },
      { id: "B", text: "$30\\pi\\text{ cm}^2$" },
      { id: "C", text: "$120\\pi\\text{ cm}^2$" },
      { id: "D", text: "$50\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Trục quay $AD$ nên $h = AD = 5\\text{ cm}, r = AB = 6\\text{ cm}$.",
      "Bước 2: $S_{xq} = 2\\pi r h$.",
      "Bước 3: $S_{xq} = 2\\pi \\times 6 \\times 5 = 60\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($60\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{xq} = 60\\pi\\text{ cm}^2$."],
    formulaTags: ["CYLINDER_ROTATION", "CYLINDER_AREA"]
  },
  {
    sourceNumber: "2.7",
    sourcePage: 3,
    topic: "CYLINDER",
    subtopic: "CYLINDER_ROTATION",
    archetypeId: "CYLINDER_ROTATION",
    difficulty: "LEVEL_2",
    question: "Cho hình chữ nhật $ABCD$ có $AB = 2\\text{ cm}, BC = 9\\text{ cm}$. Quay hình chữ nhật $ABCD$ một vòng quanh cạnh $AB$ cố định ta được một hình trụ có diện tích xung quanh bằng:",
    options: [
      { id: "A", text: "$18\\pi\\text{ cm}^2$" },
      { id: "B", text: "$36\\pi\\text{ cm}^2$" },
      { id: "C", text: "$72\\pi\\text{ cm}^2$" },
      { id: "D", text: "$81\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: $h = AB = 2\\text{ cm}, r = BC = 9\\text{ cm}$.",
      "Bước 2: $S_{xq} = 2\\pi r h$.",
      "Bước 3: $S_{xq} = 2\\pi \\times 9 \\times 2 = 36\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án B ($36\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{xq} = 36\\pi\\text{ cm}^2$."],
    formulaTags: ["CYLINDER_ROTATION", "CYLINDER_AREA"]
  },
  {
    sourceNumber: "2.8",
    sourcePage: 3,
    topic: "CYLINDER",
    subtopic: "CYLINDER_ROTATION",
    archetypeId: "CYLINDER_ROTATION",
    difficulty: "LEVEL_3",
    question: "Cho hình chữ nhật $ABCD$ có chu vi bằng $28\\text{ cm}$ và chiều dài $AB$ gấp 3 lần chiều rộng $AD$. Quay hình chữ nhật $ABCD$ một vòng quanh cạnh $AB$ cố định ta được một hình trụ có diện tích xung quanh bằng:",
    options: [
      { id: "A", text: "$42\\pi\\text{ cm}^2$" },
      { id: "B", text: "$147\\pi\\text{ cm}^2$" },
      { id: "C", text: "$10{,}5\\pi\\text{ cm}^2$" },
      { id: "D", text: "$73{,}5\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "D",
    solution4Steps: [
      "Bước 1: Nửa chu vi $AB + AD = 28 / 2 = 14\\text{ cm}$. Vì $AB = 3AD \\Rightarrow 4AD = 14 \\Rightarrow AD = 3{,}5\\text{ cm}, AB = 10{,}5\\text{ cm}$.",
      "Bước 2: Quay quanh $AB$ cố định nên $h = AB = 10{,}5\\text{ cm}$, bán kính đáy $r = AD = 3{,}5\\text{ cm}$.",
      "Bước 3: $S_{xq} = 2\\pi r h = 2\\pi \\times 3{,}5 \\times 10{,}5 = 73{,}5\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án D ($73{,}5\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["Tính chính xác chiều dài và chiều rộng từ chu vi."],
    formulaTags: ["CYLINDER_ROTATION", "CYLINDER_AREA"]
  },
  {
    sourceNumber: "2.9",
    sourcePage: 3,
    topic: "CYLINDER",
    subtopic: "CYLINDER_ROTATION",
    archetypeId: "CYLINDER_ROTATION",
    difficulty: "LEVEL_2",
    question: "Cho hình chữ nhật $ABCD$ có diện tích bằng $30\\text{ cm}^2$ và cạnh $AB = 6\\text{ cm}$. Quay hình chữ nhật $ABCD$ một vòng quanh cạnh $AB$ cố định ta được một hình trụ có diện tích xung quanh bằng:",
    options: [
      { id: "A", text: "$60\\pi\\text{ cm}^2$" },
      { id: "B", text: "$30\\pi\\text{ cm}^2$" },
      { id: "C", text: "$120\\pi\\text{ cm}^2$" },
      { id: "D", text: "$50\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Cạnh $AD = S / AB = 30 / 6 = 5\\text{ cm}$.",
      "Bước 2: Quay quanh $AB$ nên $h = AB = 6\\text{ cm}, r = AD = 5\\text{ cm}$.",
      "Bước 3: $S_{xq} = 2\\pi r h = 2\\pi \\times 5 \\times 6 = 60\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($60\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{xq} = 60\\pi\\text{ cm}^2$."],
    formulaTags: ["CYLINDER_ROTATION", "CYLINDER_AREA"]
  },
  {
    sourceNumber: "2.10",
    sourcePage: 3,
    topic: "CYLINDER",
    subtopic: "CYLINDER_ROTATION",
    archetypeId: "CYLINDER_ROTATION",
    difficulty: "LEVEL_2",
    question: "Cho hình chữ nhật $ABCD$ có $AB = a, AD = 2a$. Quay hình chữ nhật $ABCD$ một vòng quanh cạnh $AD$ cố định ta được một hình trụ có diện tích xung quanh bằng:",
    options: [
      { id: "A", text: "$2\\pi a^2$" },
      { id: "B", text: "$4\\pi a^2$" },
      { id: "C", text: "$8\\pi a^2$" },
      { id: "D", text: "$\\pi a^2$" }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: Chiều cao $h = AD = 2a$, bán kính đáy $r = AB = a$.",
      "Bước 2: $S_{xq} = 2\\pi r h$.",
      "Bước 3: $S_{xq} = 2\\pi \\times a \\times 2a = 4\\pi a^2$.",
      "Bước 4: Kết luận: Chọn đáp án B ($4\\pi a^2$)."
    ],
    importantNotes: ["$S_{xq} = 4\\pi a^2$."],
    formulaTags: ["CYLINDER_ROTATION", "CYLINDER_AREA"]
  },

  // Nhóm 3 (3.1 - 3.10)
  {
    sourceNumber: "3.1",
    sourcePage: 3,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_1",
    question: "Cho hình nón có bán kính đáy $R$ và chiều cao $h$. Công thức tính thể tích $V$ của hình nón là:",
    options: [
      { id: "A", text: "$V = \\pi R^2 h$" },
      { id: "B", text: "$V = \\frac{1}{3}\\pi R^2 h$" },
      { id: "C", text: "$V = \\frac{1}{3}\\pi R h$" },
      { id: "D", text: "$V = \\pi R h$" }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: Nhận dạng hình học: Khối nón tròn xoay có bán kính đáy $R$ và chiều cao $h$.",
      "Bước 2: Lựa chọn công thức chuẩn: Thể tích hình nón bằng một phần ba diện tích đáy nhân với chiều cao.",
      "Bước 3: Biểu diễn đại số: $V = \\frac{1}{3} S_{\\text{đáy}} \\cdot h = \\frac{1}{3}\\pi R^2 h$.",
      "Bước 4: Kết luận: Chọn đáp án B ($V = \\frac{1}{3}\\pi R^2 h$)."
    ],
    importantNotes: ["Hình nón có hệ số $\\frac{1}{3}$ so với hình trụ cùng đáy và chiều cao."],
    formulaTags: ["CONE_VOLUME"]
  },
  {
    sourceNumber: "3.2",
    sourcePage: 4,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_1",
    question: "Phát biểu nào sau đây đúng khi nói về thể tích của một hình nón?",
    options: [
      { id: "A", text: "Thể tích hình nón bằng diện tích đáy nhân với chiều cao." },
      { id: "B", text: "Thể tích hình nón bằng một phần ba diện tích đáy nhân với chiều cao." },
      { id: "C", text: "Thể tích hình nón bằng nửa diện tích đáy nhân với chiều cao." },
      { id: "D", text: "Thể tích hình nón bằng chu vi đáy nhân với chiều cao." }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: Phân tích định nghĩa thể tích hình nón trong SGK Toán 9.",
      "Bước 2: Công thức $V = \\frac{1}{3} S h$.",
      "Bước 3: Đối chiếu với các phát biểu bằng lời: Thể tích bằng $\\frac{1}{3}$ diện tích đáy nhân với chiều cao.",
      "Bước 4: Kết luận: Chọn đáp án B."
    ],
    importantNotes: ["Hệ số $\\frac{1}{3}$ là đặc trưng của hình nón."],
    formulaTags: ["CONE_VOLUME"]
  },
  {
    sourceNumber: "3.3",
    sourcePage: 4,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_1",
    question: "Cho hình nón có diện tích đáy bằng $S$ và chiều cao bằng $h$. Thể tích $V$ của hình nón được tính bởi công thức:",
    options: [
      { id: "A", text: "$V = Sh$" },
      { id: "B", text: "$V = 3Sh$" },
      { id: "C", text: "$V = \\frac{1}{3}Sh$" },
      { id: "D", text: "$V = \\frac{1}{2}Sh$" }
    ],
    correctAnswer: "C",
    solution4Steps: [
      "Bước 1: Dữ kiện đã cho là diện tích đáy $S$ và chiều cao $h$.",
      "Bước 2: Công thức tổng quát theo diện tích đáy: $V = \\frac{1}{3} S h$.",
      "Bước 3: Kiểm tra các phương án.",
      "Bước 4: Kết luận: Chọn đáp án C ($V = \\frac{1}{3}Sh$)."
    ],
    importantNotes: ["$V = \\frac{1}{3}Sh$."],
    formulaTags: ["CONE_VOLUME"]
  },
  {
    sourceNumber: "3.4",
    sourcePage: 4,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Hình nón có đường kính đáy là $d$ và chiều cao là $h$. Công thức tính thể tích hình nón là:",
    options: [
      { id: "A", text: "$V = \\frac{1}{3}\\pi d^2 h$" },
      { id: "B", text: "$V = \\frac{1}{12}\\pi d^2 h$" },
      { id: "C", text: "$V = \\frac{1}{4}\\pi d^2 h$" },
      { id: "D", text: "$V = \\pi d^2 h$" }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: Mối liên hệ đường kính và bán kính: $r = \\frac{d}{2} \\Rightarrow r^2 = \\frac{d^2}{4}$.",
      "Bước 2: Thay vào công thức thể tích hình nón: $V = \\frac{1}{3}\\pi r^2 h$.",
      "Bước 3: Biến đổi: $V = \\frac{1}{3}\\pi \\left(\\frac{d^2}{4}\\right) h = \\frac{1}{12}\\pi d^2 h$.",
      "Bước 4: Kết luận: Chọn đáp án B ($V = \\frac{1}{12}\\pi d^2 h$)."
    ],
    importantNotes: ["Khi bình phương bán kính $\\left(\\frac{d}{2}\\right)^2 = \\frac{d^2}{4}$, nhân với $\\frac{1}{3}$ ra hệ số $\\frac{1}{12}$."],
    formulaTags: ["CONE_VOLUME", "RADIUS_DIAMETER"]
  },
  {
    sourceNumber: "3.5",
    sourcePage: 4,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_1",
    question: "Một hình nón và một hình trụ có cùng bán kính đáy và cùng chiều cao. Gọi $V_1$ là thể tích hình nón, $V_2$ là thể tích hình trụ. Khẳng định nào sau đây đúng?",
    options: [
      { id: "A", text: "$V_1 = V_2$" },
      { id: "B", text: "$V_1 = 3V_2$" },
      { id: "C", text: "$V_1 = \\frac{1}{3}V_2$" },
      { id: "D", text: "$V_1 = \\frac{1}{2}V_2$" }
    ],
    correctAnswer: "C",
    solution4Steps: [
      "Bước 1: $V_1 = \\frac{1}{3}\\pi r^2 h$ (hình nón), $V_2 = \\pi r^2 h$ (hình trụ).",
      "Bước 2: Lập tỉ số: $\\frac{V_1}{V_2} = \\frac{\\frac{1}{3}\\pi r^2 h}{\\pi r^2 h} = \\frac{1}{3}$.",
      "Bước 3: Suy ra $V_1 = \\frac{1}{3}V_2$.",
      "Bước 4: Kết luận: Chọn đáp án C."
    ],
    importantNotes: ["Thể tích nón luôn bằng $\\frac{1}{3}$ thể tích trụ nếu có cùng đáy và chiều cao."],
    formulaTags: ["CONE_VOLUME", "CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "3.6",
    sourcePage: 4,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Cho hình nón có bán kính đáy $r = 3\\text{ cm}$ và chiều cao $h = 4\\text{ cm}$. Thể tích của hình nón đó là:",
    options: [
      { id: "A", text: "$12\\pi\\text{ cm}^3$" },
      { id: "B", text: "$36\\pi\\text{ cm}^3$" },
      { id: "C", text: "$24\\pi\\text{ cm}^3$" },
      { id: "D", text: "$18\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $r = 3\\text{ cm}, h = 4\\text{ cm}$.",
      "Bước 2: Áp dụng $V = \\frac{1}{3}\\pi r^2 h$.",
      "Bước 3: $V = \\frac{1}{3}\\pi \\times 3^2 \\times 4 = \\frac{1}{3}\\pi \\times 9 \\times 4 = 12\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($12\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 12\\pi\\text{ cm}^3$."],
    formulaTags: ["CONE_VOLUME"]
  },
  {
    sourceNumber: "3.7",
    sourcePage: 4,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một hình nón có thể tích $V = 30\\pi\\text{ cm}^3$ và bán kính đáy $r = 3\\text{ cm}$. Chiều cao $h$ của hình nón bằng:",
    options: [
      { id: "A", text: "$10\\text{ cm}$" },
      { id: "B", text: "$3{,}33\\text{ cm}$" },
      { id: "C", text: "$90\\text{ cm}$" },
      { id: "D", text: "$30\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Từ công thức $V = \\frac{1}{3}\\pi r^2 h \\Rightarrow h = \\frac{3V}{\\pi r^2}$.",
      "Bước 2: Thay số: $V = 30\\pi, r = 3$.",
      "Bước 3: $h = \\frac{3 \\times 30\\pi}{\\pi \\times 3^2} = \\frac{90\\pi}{9\\pi} = 10\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($10\\text{ cm}$)."
    ],
    importantNotes: ["Nhớ nhân 3 khi rút chiều cao từ thể tích nón: $h = \\frac{3V}{\\pi r^2}$."],
    formulaTags: ["CONE_VOLUME"]
  },
  {
    sourceNumber: "3.8",
    sourcePage: 4,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một hình nón có thể tích $V = 12\\pi\\text{ cm}^3$ và chiều cao $h = 4\\text{ cm}$. Bán kính đáy $r$ của hình nón bằng:",
    options: [
      { id: "A", text: "$3\\text{ cm}$" },
      { id: "B", text: "$9\\text{ cm}$" },
      { id: "C", text: "$1{,}5\\text{ cm}$" },
      { id: "D", text: "$4\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V = \\frac{1}{3}\\pi r^2 h \\Rightarrow r^2 = \\frac{3V}{\\pi h}$.",
      "Bước 2: Thay số: $r^2 = \\frac{3 \\times 12\\pi}{\\pi \\times 4} = \\frac{36\\pi}{4\\pi} = 9$.",
      "Bước 3: Suy ra $r = \\sqrt{9} = 3\\text{ cm}$ (vì $r > 0$).",
      "Bước 4: Kết luận: Chọn đáp án A ($3\\text{ cm}$)."
    ],
    importantNotes: ["$r = 3\\text{ cm}$."],
    formulaTags: ["CONE_VOLUME"]
  },
  {
    sourceNumber: "3.9",
    sourcePage: 4,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Nếu tăng bán kính đáy của một hình nón lên 2 lần và giữ nguyên chiều cao, thì thể tích của hình nón đó sẽ:",
    options: [
      { id: "A", text: "Tăng 2 lần." },
      { id: "B", text: "Tăng 4 lần." },
      { id: "C", text: "Tăng 8 lần." },
      { id: "D", text: "Không đổi." }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: $V = \\frac{1}{3}\\pi r^2 h$. Thể tích tỉ lệ thuận với bình phương bán kính đáy.",
      "Bước 2: Khi $r' = 2r \\Rightarrow V' = \\frac{1}{3}\\pi (2r)^2 h = \\frac{1}{3}\\pi (4r^2) h = 4V$.",
      "Bước 3: Do đó thể tích tăng 4 lần.",
      "Bước 4: Kết luận: Chọn đáp án B."
    ],
    importantNotes: ["Bán kính tăng 2 lần $\\Rightarrow r^2$ tăng $2^2 = 4$ lần."],
    formulaTags: ["CONE_VOLUME"]
  },
  {
    sourceNumber: "3.10",
    sourcePage: 4,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Nếu giữ nguyên bán kính đáy và tăng chiều cao của một hình nón lên 3 lần thì thể tích của hình nón sẽ:",
    options: [
      { id: "A", text: "Tăng 3 lần." },
      { id: "B", text: "Tăng 6 lần." },
      { id: "C", text: "Tăng 9 lần." },
      { id: "D", text: "Tăng 27 lần." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V = \\frac{1}{3}\\pi r^2 h$. Thể tích tỉ lệ thuận bậc 1 với chiều cao.",
      "Bước 2: Khi $h' = 3h \\Rightarrow V' = \\frac{1}{3}\\pi r^2 (3h) = 3V$.",
      "Bước 3: Do đó thể tích tăng 3 lần.",
      "Bước 4: Kết luận: Chọn đáp án A."
    ],
    importantNotes: ["Chiều cao tăng bậc 1 nên $V$ tăng đúng 3 lần."],
    formulaTags: ["CONE_VOLUME"]
  },

  // Nhóm 4 (4.1 - 4.10)
  {
    sourceNumber: "4.1",
    sourcePage: 5,
    topic: "CONE",
    subtopic: "CONE_AREA",
    archetypeId: "CONE_LATERAL_AREA",
    difficulty: "LEVEL_1",
    question: "Cho hình nón có bán kính đáy $r = 5\\text{ cm}$, độ dài đường sinh $l = 8\\text{ cm}$. Diện tích xung quanh của hình nón bằng:",
    options: [
      { id: "A", text: "$40\\pi\\text{ cm}^2$" },
      { id: "B", text: "$80\\pi\\text{ cm}^2$" },
      { id: "C", text: "$200\\pi\\text{ cm}^2$" },
      { id: "D", text: "$13\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $r = 5\\text{ cm}, l = 8\\text{ cm}$.",
      "Bước 2: Công thức diện tích xung quanh hình nón: $S_{xq} = \\pi r l$.",
      "Bước 3: $S_{xq} = \\pi \\times 5 \\times 8 = 40\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($40\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{xq} = \\pi r l$."],
    formulaTags: ["CONE_LATERAL_AREA"]
  },
  {
    sourceNumber: "4.2",
    sourcePage: 5,
    topic: "CONE",
    subtopic: "CONE_AREA",
    archetypeId: "CONE_LATERAL_AREA",
    difficulty: "LEVEL_2",
    question: "Một hình nón có đường kính đáy $d = 10\\text{ cm}$, độ dài đường sinh $l = 12\\text{ cm}$. Diện tích xung quanh của hình nón là:",
    options: [
      { id: "A", text: "$120\\pi\\text{ cm}^2$" },
      { id: "B", text: "$60\\pi\\text{ cm}^2$" },
      { id: "C", text: "$300\\pi\\text{ cm}^2$" },
      { id: "D", text: "$24\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: Bán kính đáy $r = d/2 = 10/2 = 5\\text{ cm}$.",
      "Bước 2: $S_{xq} = \\pi r l$.",
      "Bước 3: $S_{xq} = \\pi \\times 5 \\times 12 = 60\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án B ($60\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["Đổi đường kính sang bán kính: $r = 5\\text{ cm}$."],
    formulaTags: ["CONE_LATERAL_AREA", "RADIUS_DIAMETER"]
  },
  {
    sourceNumber: "4.3",
    sourcePage: 5,
    topic: "CONE",
    subtopic: "CONE_AREA",
    archetypeId: "CONE_LATERAL_AREA",
    difficulty: "LEVEL_2",
    question: "Cho hình nón có chu vi đường tròn đáy bằng $12\\pi\\text{ cm}$ và độ dài đường sinh $l = 10\\text{ cm}$. Diện tích xung quanh của hình nón bằng:",
    options: [
      { id: "A", text: "$120\\pi\\text{ cm}^2$" },
      { id: "B", text: "$60\\pi\\text{ cm}^2$" },
      { id: "C", text: "$36\\pi\\text{ cm}^2$" },
      { id: "D", text: "$72\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: Chu vi đáy $C = 2\\pi r = 12\\pi \\Rightarrow r = 6\\text{ cm}$.",
      "Bước 2: $S_{xq} = \\pi r l$.",
      "Bước 3: $S_{xq} = \\pi \\times 6 \\times 10 = 60\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án B ($60\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$r = C / (2\\pi) = 6\\text{ cm}$."],
    formulaTags: ["CONE_LATERAL_AREA"]
  },
  {
    sourceNumber: "4.4",
    sourcePage: 5,
    topic: "CONE",
    subtopic: "CONE_AREA",
    archetypeId: "CONE_LATERAL_AREA",
    difficulty: "LEVEL_2",
    question: "Cho hình nón có bán kính đáy $r = 3\\text{ cm}$, chiều cao $h = 4\\text{ cm}$. Diện tích xung quanh của hình nón bằng:",
    options: [
      { id: "A", text: "$12\\pi\\text{ cm}^2$" },
      { id: "B", text: "$15\\pi\\text{ cm}^2$" },
      { id: "C", text: "$20\\pi\\text{ cm}^2$" },
      { id: "D", text: "$24\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: Tính đường sinh $l = \\sqrt{r^2 + h^2} = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5\\text{ cm}$.",
      "Bước 2: Công thức $S_{xq} = \\pi r l$.",
      "Bước 3: $S_{xq} = \\pi \\times 3 \\times 5 = 15\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án B ($15\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["Định lí Pythagore tìm đường sinh $l = \\sqrt{r^2 + h^2}$."],
    formulaTags: ["CONE_LATERAL_AREA", "PYTHAGOREAN"]
  },
  {
    sourceNumber: "4.5",
    sourcePage: 5,
    topic: "CONE",
    subtopic: "CONE_AREA",
    archetypeId: "CONE_LATERAL_AREA",
    difficulty: "LEVEL_2",
    question: "Một hình nón có diện tích xung quanh bằng $50\\pi\\text{ cm}^2$ và độ dài đường sinh $l = 10\\text{ cm}$. Bán kính đáy của hình nón là:",
    options: [
      { id: "A", text: "$10\\text{ cm}$" },
      { id: "B", text: "$25\\text{ cm}$" },
      { id: "C", text: "$5\\text{ cm}$" },
      { id: "D", text: "$20\\text{ cm}$" }
    ],
    correctAnswer: "C",
    solution4Steps: [
      "Bước 1: Từ $S_{xq} = \\pi r l \\Rightarrow r = \\frac{S_{xq}}{\\pi l}$.",
      "Bước 2: Thay số: $S_{xq} = 50\\pi, l = 10$.",
      "Bước 3: $r = \\frac{50\\pi}{10\\pi} = 5\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án C ($5\\text{ cm}$)."
    ],
    importantNotes: ["$r = 5\\text{ cm}$."],
    formulaTags: ["CONE_LATERAL_AREA"]
  },
  {
    sourceNumber: "4.6",
    sourcePage: 5,
    topic: "CONE",
    subtopic: "CONE_AREA",
    archetypeId: "CONE_LATERAL_AREA",
    difficulty: "LEVEL_3",
    question: "Một hình nón có diện tích xung quanh bằng $65\\pi\\text{ cm}^2$ và bán kính đáy $r = 5\\text{ cm}$. Chiều cao $h$ của hình nón là:",
    options: [
      { id: "A", text: "$13\\text{ cm}$" },
      { id: "B", text: "$12\\text{ cm}$" },
      { id: "C", text: "$10\\text{ cm}$" },
      { id: "D", text: "$144\\text{ cm}$" }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: Tính đường sinh $l = \\frac{S_{xq}}{\\pi r} = \\frac{65\\pi}{5\\pi} = 13\\text{ cm}$.",
      "Bước 2: Tính chiều cao $h$ theo Pythagore: $h = \\sqrt{l^2 - r^2}$.",
      "Bước 3: $h = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án B ($12\\text{ cm}$)."
    ],
    importantNotes: ["Đừng nhầm đường sinh $l = 13\\text{ cm}$ với chiều cao $h = 12\\text{ cm}$."],
    formulaTags: ["CONE_LATERAL_AREA", "PYTHAGOREAN"]
  },
  {
    sourceNumber: "4.7",
    sourcePage: 5,
    topic: "CONE",
    subtopic: "CONE_AREA",
    archetypeId: "CONE_LATERAL_AREA",
    difficulty: "LEVEL_2",
    question: "Nếu gấp đôi bán kính đáy và giữ nguyên độ dài đường sinh của một hình nón thì diện tích xung quanh của hình nón sẽ:",
    options: [
      { id: "A", text: "Tăng 2 lần." },
      { id: "B", text: "Tăng 4 lần." },
      { id: "C", text: "Không đổi." },
      { id: "D", text: "Giảm 2 lần." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $S_{xq} = \\pi r l$. Diện tích xung quanh tỉ lệ thuận bậc 1 với bán kính đáy $r$.",
      "Bước 2: Khi $r' = 2r$ và $l$ không đổi: $S'_{xq} = \\pi (2r) l = 2(\\pi r l) = 2S_{xq}$.",
      "Bước 3: Do đó diện tích xung quanh tăng 2 lần.",
      "Bước 4: Kết luận: Chọn đáp án A."
    ],
    importantNotes: ["$S_{xq}$ tỉ lệ thuận bậc 1 với $r$."],
    formulaTags: ["CONE_LATERAL_AREA"]
  },
  {
    sourceNumber: "4.8",
    sourcePage: 5,
    topic: "CONE",
    subtopic: "CONE_AREA",
    archetypeId: "CONE_TOTAL_AREA",
    difficulty: "LEVEL_1",
    question: "Công thức tính diện tích toàn phần $S_{tp}$ của hình nón có bán kính đáy $r$ và đường sinh $l$ là:",
    options: [
      { id: "A", text: "$S_{tp} = \\pi r l + 2\\pi r^2$" },
      { id: "B", text: "$S_{tp} = \\pi r l + \\pi r^2$" },
      { id: "C", text: "$S_{tp} = 2\\pi r l + \\pi r^2$" },
      { id: "D", text: "$S_{tp} = \\pi r^2 l$" }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: Diện tích toàn phần hình nón bằng diện tích xung quanh cộng với diện tích một mặt đáy.",
      "Bước 2: $S_{xq} = \\pi r l$ và $S_{\\text{đáy}} = \\pi r^2$.",
      "Bước 3: $S_{tp} = S_{xq} + S_{\\text{đáy}} = \\pi r l + \\pi r^2$.",
      "Bước 4: Kết luận: Chọn đáp án B ($S_{tp} = \\pi r l + \\pi r^2$)."
    ],
    importantNotes: ["Hình nón chỉ có 1 mặt đáy nên chỉ cộng $1\\pi r^2$."],
    formulaTags: ["CONE_TOTAL_AREA"]
  },
  {
    sourceNumber: "4.9",
    sourcePage: 6,
    topic: "CONE",
    subtopic: "CONE_AREA",
    archetypeId: "CONE_LATERAL_AREA",
    difficulty: "LEVEL_2",
    question: "Một chiếc nón lá dạng hình nón có bán kính đáy $r = 20\\text{ cm}$, độ dài đường sinh $l = 30\\text{ cm}$. Diện tích lá cần dùng để phủ kín một lớp xung quanh nón (bỏ qua mép dán) là:",
    options: [
      { id: "A", text: "$600\\pi\\text{ cm}^2$" },
      { id: "B", text: "$1200\\pi\\text{ cm}^2$" },
      { id: "C", text: "$400\\pi\\text{ cm}^2$" },
      { id: "D", text: "$300\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Diện tích lá phủ xung quanh chính là diện tích xung quanh của hình nón.",
      "Bước 2: $S_{xq} = \\pi r l$.",
      "Bước 3: $S_{xq} = \\pi \\times 20 \\times 30 = 600\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($600\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{xq} = 600\\pi\\text{ cm}^2$."],
    formulaTags: ["CONE_LATERAL_AREA", "REAL_WORLD"]
  },
  {
    sourceNumber: "4.10",
    sourcePage: 6,
    topic: "CONE",
    subtopic: "CONE_AREA",
    archetypeId: "CONE_LATERAL_AREA",
    difficulty: "LEVEL_3",
    question: "Người ta làm một chiếc mũ sinh nhật bằng bìa cứng dạng hình nón (không có đáy). Biết đường kính đáy mũ là $16\\text{ cm}$, chiều cao mũ là $15\\text{ cm}$. Diện tích bìa cần dùng (không tính mép dán) là:",
    options: [
      { id: "A", text: "$136\\pi\\text{ cm}^2$" },
      { id: "B", text: "$240\\pi\\text{ cm}^2$" },
      { id: "C", text: "$272\\pi\\text{ cm}^2$" },
      { id: "D", text: "$120\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính đáy $r = 16/2 = 8\\text{ cm}$.",
      "Bước 2: Độ dài đường sinh $l = \\sqrt{r^2 + h^2} = \\sqrt{8^2 + 15^2} = \\sqrt{64 + 225} = \\sqrt{289} = 17\\text{ cm}$.",
      "Bước 3: Diện tích bìa cần dùng: $S_{xq} = \\pi r l = \\pi \\times 8 \\times 17 = 136\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($136\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["Bộ ba Pythagore $(8, 15, 17) \\Rightarrow l = 17\\text{ cm}$."],
    formulaTags: ["CONE_LATERAL_AREA", "PYTHAGOREAN", "REAL_WORLD"]
  },

  // Nhóm 5 (5.1 - 5.10)
  {
    sourceNumber: "5.1",
    sourcePage: 6,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_1",
    question: "Diện tích mặt cầu có bán kính $3\\text{ cm}$ là:",
    options: [
      { id: "A", text: "$36\\pi\\text{ cm}^2$" },
      { id: "B", text: "$12\\pi\\text{ cm}^2$" },
      { id: "C", text: "$18\\pi\\text{ cm}^2$" },
      { id: "D", text: "$9\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính mặt cầu $R = 3\\text{ cm}$.",
      "Bước 2: Công thức diện tích mặt cầu: $S = 4\\pi R^2$.",
      "Bước 3: $S = 4\\pi \\times 3^2 = 4\\pi \\times 9 = 36\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($36\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S = 4\\pi R^2$."],
    formulaTags: ["SPHERE_AREA"]
  },
  {
    sourceNumber: "5.2",
    sourcePage: 6,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_2",
    question: "Diện tích mặt cầu có đường kính $12\\text{ cm}$ là:",
    options: [
      { id: "A", text: "$288\\pi\\text{ cm}^2$" },
      { id: "B", text: "$576\\pi\\text{ cm}^2$" },
      { id: "C", text: "$48\\pi\\text{ cm}^2$" },
      { id: "D", text: "$144\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "D",
    solution4Steps: [
      "Bước 1: Đường kính $d = 12\\text{ cm} \\Rightarrow R = 6\\text{ cm}$.",
      "Bước 2: Hoặc dùng trực tiếp công thức theo đường kính: $S = \\pi d^2$.",
      "Bước 3: $S = \\pi \\times 12^2 = 144\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án D ($144\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["Theo đường kính: $S = \\pi d^2$."],
    formulaTags: ["SPHERE_AREA", "RADIUS_DIAMETER"]
  },
  {
    sourceNumber: "5.3",
    sourcePage: 7,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_1",
    question: "Diện tích mặt cầu có bán kính $2{,}5\\text{ cm}$ là:",
    options: [
      { id: "A", text: "$25\\pi\\text{ cm}^2$" },
      { id: "B", text: "$10\\pi\\text{ cm}^2$" },
      { id: "C", text: "$20\\pi\\text{ cm}^2$" },
      { id: "D", text: "$12{,}5\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $R = 2{,}5\\text{ cm}$.",
      "Bước 2: $S = 4\\pi R^2$.",
      "Bước 3: $S = 4\\pi \\times (2{,}5)^2 = 4\\pi \\times 6{,}25 = 25\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($25\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$4 \\times 6{,}25 = 25$."],
    formulaTags: ["SPHERE_AREA"]
  },
  {
    sourceNumber: "5.4",
    sourcePage: 7,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_2",
    question: "Một mặt cầu có diện tích bề mặt là $100\\pi\\text{ cm}^2$. Bán kính của mặt cầu đó là:",
    options: [
      { id: "A", text: "$10\\text{ cm}$" },
      { id: "B", text: "$5\\text{ cm}$" },
      { id: "C", text: "$25\\text{ cm}$" },
      { id: "D", text: "$50\\text{ cm}$" }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: $S = 4\\pi R^2 = 100\\pi$.",
      "Bước 2: $R^2 = \\frac{100\\pi}{4\\pi} = 25$.",
      "Bước 3: $R = \\sqrt{25} = 5\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án B ($5\\text{ cm}$)."
    ],
    importantNotes: ["$R = 5\\text{ cm}$."],
    formulaTags: ["SPHERE_AREA"]
  },
  {
    sourceNumber: "5.5",
    sourcePage: 7,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_2",
    question: "Một mặt cầu có diện tích bằng $64\\pi\\text{ cm}^2$. Đường kính của mặt cầu đó là:",
    options: [
      { id: "A", text: "$4\\text{ cm}$" },
      { id: "B", text: "$16\\text{ cm}$" },
      { id: "C", text: "$8\\text{ cm}$" },
      { id: "D", text: "$32\\text{ cm}$" }
    ],
    correctAnswer: "C",
    solution4Steps: [
      "Bước 1: Sử dụng công thức theo đường kính $S = \\pi d^2 = 64\\pi$.",
      "Bước 2: $d^2 = 64 \\Rightarrow d = 8\\text{ cm}$.",
      "Bước 3: Đối chiếu yêu cầu hỏi đường kính.",
      "Bước 4: Kết luận: Chọn đáp án C ($8\\text{ cm}$)."
    ],
    importantNotes: ["Đề hỏi đường kính $d = 8\\text{ cm}$."],
    formulaTags: ["SPHERE_AREA", "RADIUS_DIAMETER"]
  },
  {
    sourceNumber: "5.6",
    sourcePage: 7,
    topic: "SPHERE",
    subtopic: "SPHERE_SECTION",
    archetypeId: "SPHERE_SECTION",
    difficulty: "LEVEL_2",
    question: "Cắt một hình cầu bởi một mặt phẳng đi qua tâm, ta được mặt cắt là một hình tròn lớn có chu vi bằng $8\\pi\\text{ cm}$. Diện tích của mặt cầu đó là:",
    options: [
      { id: "A", text: "$64\\pi\\text{ cm}^2$" },
      { id: "B", text: "$16\\pi\\text{ cm}^2$" },
      { id: "C", text: "$32\\pi\\text{ cm}^2$" },
      { id: "D", text: "$256\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Chu vi hình tròn lớn $C = 2\\pi R = 8\\pi \\Rightarrow R = 4\\text{ cm}$.",
      "Bước 2: Công thức diện tích mặt cầu: $S = 4\\pi R^2$.",
      "Bước 3: $S = 4\\pi \\times 4^2 = 4\\pi \\times 16 = 64\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($64\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["Hình tròn lớn có bán kính bằng bán kính mặt cầu $R = 4\\text{ cm}$."],
    formulaTags: ["SPHERE_SECTION", "SPHERE_AREA"]
  },
  {
    sourceNumber: "5.7",
    sourcePage: 7,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_2",
    question: "Khi tăng bán kính của một mặt cầu lên 3 lần thì diện tích mặt cầu sẽ:",
    options: [
      { id: "A", text: "Tăng 3 lần." },
      { id: "B", text: "Tăng 6 lần." },
      { id: "C", text: "Tăng 9 lần." },
      { id: "D", text: "Tăng 27 lần." }
    ],
    correctAnswer: "C",
    solution4Steps: [
      "Bước 1: $S = 4\\pi R^2$. Diện tích mặt cầu tỉ lệ thuận với bình phương bán kính.",
      "Bước 2: Khi $R' = 3R \\Rightarrow S' = 4\\pi (3R)^2 = 4\\pi \\times 9R^2 = 9S$.",
      "Bước 3: Do đó diện tích mặt cầu tăng 9 lần.",
      "Bước 4: Kết luận: Chọn đáp án C."
    ],
    importantNotes: ["$R$ tăng 3 lần $\\Rightarrow R^2$ tăng $3^2 = 9$ lần."],
    formulaTags: ["SPHERE_AREA"]
  },
  {
    sourceNumber: "5.8",
    sourcePage: 7,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_2",
    question: "Cho hai mặt cầu $(S_1)$ và $(S_2)$ có bán kính lần lượt là $R_1 = 2\\text{ cm}, R_2 = 6\\text{ cm}$. Tỉ số diện tích mặt cầu $(S_1)$ và diện tích mặt cầu $(S_2)$ là:",
    options: [
      { id: "A", text: "$\\frac{1}{3}$" },
      { id: "B", text: "$\\frac{1}{9}$" },
      { id: "C", text: "$\\frac{1}{27}$" },
      { id: "D", text: "$3$" }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: Tỉ số bán kính $\\frac{R_1}{R_2} = \\frac{2}{6} = \\frac{1}{3}$.",
      "Bước 2: Tỉ số diện tích bằng bình phương tỉ số bán kính: $\\frac{S_1}{S_2} = \\left(\\frac{R_1}{R_2}\\right)^2$.",
      "Bước 3: $\\frac{S_1}{S_2} = \\left(\\frac{1}{3}\\right)^2 = \\frac{1}{9}$.",
      "Bước 4: Kết luận: Chọn đáp án B ($\\frac{1}{9}$)."
    ],
    importantNotes: ["Tỉ số diện tích bằng bình phương tỉ số kích thước tuyến tính."],
    formulaTags: ["SPHERE_AREA"]
  },
  {
    sourceNumber: "5.9",
    sourcePage: 7,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_2",
    question: "Một quả bóng đá tiêu chuẩn có dạng hình cầu với bán kính khoảng $11\\text{ cm}$. Diện tích bề mặt của quả bóng (bỏ qua các rãnh ghép) là:",
    options: [
      { id: "A", text: "$484\\pi\\text{ cm}^2$" },
      { id: "B", text: "$121\\pi\\text{ cm}^2$" },
      { id: "C", text: "$1331\\pi\\text{ cm}^2$" },
      { id: "D", text: "$363\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính quả bóng $R = 11\\text{ cm}$.",
      "Bước 2: Áp dụng $S = 4\\pi R^2$.",
      "Bước 3: $S = 4\\pi \\times 11^2 = 4\\pi \\times 121 = 484\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($484\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S = 484\\pi\\text{ cm}^2$."],
    formulaTags: ["SPHERE_AREA", "REAL_WORLD"]
  },
  {
    sourceNumber: "5.10",
    sourcePage: 7,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_2",
    question: "Người ta muốn sơn toàn bộ bề mặt ngoài của một mô hình hành tinh dạng mặt cầu có đường kính $40\\text{ cm}$. Diện tích bề mặt cần sơn là:",
    options: [
      { id: "A", text: "$800\\pi\\text{ cm}^2$" },
      { id: "B", text: "$6400\\pi\\text{ cm}^2$" },
      { id: "C", text: "$1600\\pi\\text{ cm}^2$" },
      { id: "D", text: "$3200\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "C",
    solution4Steps: [
      "Bước 1: Đường kính $d = 40\\text{ cm}$.",
      "Bước 2: Áp dụng công thức $S = \\pi d^2$.",
      "Bước 3: $S = \\pi \\times 40^2 = 1600\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án C ($1600\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S = \\pi d^2 = 1600\\pi\\text{ cm}^2$."],
    formulaTags: ["SPHERE_AREA", "REAL_WORLD"]
  }
];
