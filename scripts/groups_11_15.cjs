/**
 * GEOMETRY LAB - GROUPS 11 TO 15 (50 Questions)
 * Source of truth: "Câu 1(2).pdf" Pages 16 to 23
 */

module.exports = [
  // Nhóm 11 (11.1 - 11.10)
  {
    sourceNumber: "11.1",
    sourcePage: 16,
    topic: "CYLINDER",
    subtopic: "CYLINDER_CONCEPT",
    archetypeId: "CYLINDER_CONCEPT",
    difficulty: "LEVEL_1",
    question: "Hình trụ được tạo thành khi quay một hình nào sau đây một vòng quanh một cạnh cố định?",
    options: [
      { id: "A", text: "Hình chữ nhật." },
      { id: "B", text: "Tam giác vuông." },
      { id: "C", text: "Nửa hình tròn." },
      { id: "D", text: "Hình thoi." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Khái niệm SGK Toán 9 về các khối tròn xoay.",
      "Bước 2: Quay hình chữ nhật quanh một cạnh cố định ta được hình trụ tròn xoay.",
      "Bước 3: Quay tam giác vuông quanh cạnh góc vuông được hình nón, quay nửa hình tròn quanh đường kính được hình cầu.",
      "Bước 4: Kết luận: Chọn đáp án A (Hình chữ nhật)."
    ],
    importantNotes: ["Hình chữ nhật quay quanh 1 cạnh tạo ra hình trụ."],
    formulaTags: ["CYLINDER_CONCEPT"]
  },
  {
    sourceNumber: "11.2",
    sourcePage: 16,
    topic: "CYLINDER",
    subtopic: "CYLINDER_CONCEPT",
    archetypeId: "CYLINDER_CONCEPT",
    difficulty: "LEVEL_1",
    question: "Hai đáy của một hình trụ là hai hình gì?",
    options: [
      { id: "A", text: "Hai hình tròn bằng nhau và nằm trên hai mặt phẳng song song." },
      { id: "B", text: "Hai hình tròn có bán kính khác nhau." },
      { id: "C", text: "Hai hình elip đồng dạng." },
      { id: "D", text: "Hai đa giác đều bằng nhau." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Xem xét cấu tạo của hình trụ tròn xoay.",
      "Bước 2: Hai mặt đáy của hình trụ là hai hình tròn bằng nhau cùng bán kính $R$.",
      "Bước 3: Hai mặt phẳng chứa hai đáy song song với nhau.",
      "Bước 4: Kết luận: Chọn đáp án A."
    ],
    importantNotes: ["Hai đáy hình trụ là hai hình tròn bằng nhau song song."],
    formulaTags: ["CYLINDER_CONCEPT"]
  },
  {
    sourceNumber: "11.3",
    sourcePage: 16,
    topic: "CYLINDER",
    subtopic: "CYLINDER_CONCEPT",
    archetypeId: "CYLINDER_CONCEPT",
    difficulty: "LEVEL_1",
    question: "Đoạn thẳng nối tâm hai đường tròn đáy của hình trụ gọi là:",
    options: [
      { id: "A", text: "Trục của hình trụ." },
      { id: "B", text: "Đường sinh của hình trụ." },
      { id: "C", text: "Bán kính đáy của hình trụ." },
      { id: "D", text: "Đường kính của hình trụ." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Gọi $O$ và $O'$ là tâm của hai đường tròn đáy hình trụ.",
      "Bước 2: Đoạn thẳng $OO'$ nối hai tâm được định nghĩa là trục của hình trụ.",
      "Bước 3: Trục $OO'$ vuông góc với hai mặt phẳng đáy và có độ dài bằng chiều cao $h$.",
      "Bước 4: Kết luận: Chọn đáp án A (Trục của hình trụ)."
    ],
    importantNotes: ["Đoạn nối hai tâm đáy là trục hình trụ."],
    formulaTags: ["CYLINDER_CONCEPT"]
  },
  {
    sourceNumber: "11.4",
    sourcePage: 16,
    topic: "CYLINDER",
    subtopic: "CYLINDER_SECTION",
    archetypeId: "CYLINDER_SECTION",
    difficulty: "LEVEL_1",
    question: "Cắt một hình trụ bởi một mặt phẳng song song với trục, thiết diện nhận được là:",
    options: [
      { id: "A", text: "Hình chữ nhật." },
      { id: "B", text: "Hình tròn." },
      { id: "C", text: "Hình tam giác." },
      { id: "D", text: "Hình thang." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Mặt phẳng $(P)$ song song với trục của hình trụ cắt mặt xung quanh theo hai đường sinh song song.",
      "Bước 2: Mặt phẳng $(P)$ cắt hai mặt đáy theo hai dây cung bằng nhau và song song nhau.",
      "Bước 3: Do các đường sinh vuông góc với đáy nên tứ giác thiết diện tạo thành là một hình chữ nhật.",
      "Bước 4: Kết luận: Chọn đáp án A (Hình chữ nhật)."
    ],
    importantNotes: ["Thiết diện song song với trục luôn là hình chữ nhật."],
    formulaTags: ["CYLINDER_SECTION"]
  },
  {
    sourceNumber: "11.5",
    sourcePage: 16,
    topic: "CYLINDER",
    subtopic: "CYLINDER_SECTION",
    archetypeId: "CYLINDER_SECTION",
    difficulty: "LEVEL_1",
    question: "Cắt một hình trụ bởi một mặt phẳng vuông góc với trục, thiết diện nhận được là:",
    options: [
      { id: "A", text: "Hình tròn bằng hai hình tròn đáy." },
      { id: "B", text: "Hình chữ nhật." },
      { id: "C", text: "Hình elip." },
      { id: "D", text: "Hình vuông." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Mặt phẳng vuông góc với trục của hình trụ song song với hai mặt đáy.",
      "Bước 2: Thiết diện tạo bởi mặt phẳng này với hình trụ là một hình tròn.",
      "Bước 3: Hình tròn này có bán kính đúng bằng bán kính của hai hình tròn đáy.",
      "Bước 4: Kết luận: Chọn đáp án A."
    ],
    importantNotes: ["Thiết diện vuông góc trục là hình tròn bằng hình tròn đáy."],
    formulaTags: ["CYLINDER_SECTION"]
  },
  {
    sourceNumber: "11.6",
    sourcePage: 17,
    topic: "CYLINDER",
    subtopic: "CYLINDER_SECTION",
    archetypeId: "CYLINDER_SECTION",
    difficulty: "LEVEL_2",
    question: "Thiết diện qua trục của một hình trụ là một hình vuông có cạnh bằng $6\\text{ cm}$. Bán kính đáy $r$ và chiều cao $h$ của hình trụ đó là:",
    options: [
      { id: "A", text: "$r = 3\\text{ cm}, h = 6\\text{ cm}$" },
      { id: "B", text: "$r = 6\\text{ cm}, h = 6\\text{ cm}$" },
      { id: "C", text: "$r = 3\\text{ cm}, h = 3\\text{ cm}$" },
      { id: "D", text: "$r = 6\\text{ cm}, h = 3\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thiết diện qua trục của hình trụ là hình chữ nhật có một cạnh là đường kính đáy $2r$ và cạnh kia là chiều cao $h$.",
      "Bước 2: Vì thiết diện là hình vuông cạnh $6\\text{ cm}$ nên $2r = 6\\text{ cm}$ và $h = 6\\text{ cm}$.",
      "Bước 3: Suy ra $r = 3\\text{ cm}$ và $h = 6\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A."
    ],
    importantNotes: ["Thiết diện qua trục có cạnh đáy là $2r$, chiều cao $h$."],
    formulaTags: ["CYLINDER_SECTION"]
  },
  {
    sourceNumber: "11.7",
    sourcePage: 17,
    topic: "CYLINDER",
    subtopic: "CYLINDER_SECTION",
    archetypeId: "CYLINDER_SECTION",
    difficulty: "LEVEL_2",
    question: "Một hình trụ có bán kính đáy $r = 4\\text{ cm}$ và chiều cao $h = 5\\text{ cm}$. Diện tích của thiết diện qua trục của hình trụ là:",
    options: [
      { id: "A", text: "$40\\text{ cm}^2$" },
      { id: "B", text: "$20\\text{ cm}^2$" },
      { id: "C", text: "$80\\text{ cm}^2$" },
      { id: "D", text: "$40\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thiết diện qua trục là hình chữ nhật có kích thước $2r$ và $h$.",
      "Bước 2: $2r = 2 \\times 4 = 8\\text{ cm}, h = 5\\text{ cm}$.",
      "Bước 3: Diện tích thiết diện: $S = 2r \\times h = 8 \\times 5 = 40\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($40\\text{ cm}^2$)."
    ],
    importantNotes: ["Diện tích thiết diện qua trục là $S = 2rh$ (không có $\\pi$)."],
    formulaTags: ["CYLINDER_SECTION"]
  },
  {
    sourceNumber: "11.8",
    sourcePage: 17,
    topic: "CYLINDER",
    subtopic: "CYLINDER_CONCEPT",
    archetypeId: "CYLINDER_CONCEPT",
    difficulty: "LEVEL_1",
    question: "Mỗi đường sinh của hình trụ vuông góc với:",
    options: [
      { id: "A", text: "Hai mặt phẳng đáy." },
      { id: "B", text: "Trục của hình trụ." },
      { id: "C", text: "Mọi đường kính của đáy." },
      { id: "D", text: "Cả A và C đều đúng." }
    ],
    correctAnswer: "D",
    solution4Steps: [
      "Bước 1: Đường sinh của hình trụ song song với trục $OO'$ nên vuông góc với hai mặt phẳng đáy.",
      "Bước 2: Vì vuông góc với mặt phẳng đáy nên nó vuông góc với mọi đường thẳng nằm trong mặt đáy, kể cả đường kính.",
      "Bước 3: Do đó cả hai phát biểu A và C đều đúng.",
      "Bước 4: Kết luận: Chọn đáp án D."
    ],
    importantNotes: ["Đường sinh vuông góc với mặt phẳng đáy và mọi đường nằm trong đáy."],
    formulaTags: ["CYLINDER_CONCEPT"]
  },
  {
    sourceNumber: "11.9",
    sourcePage: 17,
    topic: "CYLINDER",
    subtopic: "CYLINDER_SECTION",
    archetypeId: "CYLINDER_SECTION",
    difficulty: "LEVEL_3",
    question: "Một hình trụ có bán kính đáy $R = 5\\text{ cm}$ và chiều cao $h = 8\\text{ cm}$. Cắt hình trụ bởi một mặt phẳng song song với trục và cách trục một khoảng $3\\text{ cm}$. Diện tích của thiết diện tạo thành là:",
    options: [
      { id: "A", text: "$64\\text{ cm}^2$" },
      { id: "B", text: "$32\\text{ cm}^2$" },
      { id: "C", text: "$40\\text{ cm}^2$" },
      { id: "D", text: "$48\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thiết diện là hình chữ nhật có một kích thước bằng chiều cao hình trụ $h = 8\\text{ cm}$.",
      "Bước 2: Kích thước còn lại là độ dài dây cung $AB$ của đường tròn đáy cách tâm $d = 3\\text{ cm}$. Nửa độ dài dây cung: $\\frac{AB}{2} = \\sqrt{R^2 - d^2} = \\sqrt{5^2 - 3^2} = 4\\text{ cm} \\Rightarrow AB = 8\\text{ cm}$.",
      "Bước 3: Diện tích thiết diện: $S = AB \\times h = 8 \\times 8 = 64\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($64\\text{ cm}^2$)."
    ],
    importantNotes: ["Độ dài dây cung $AB = 2\\sqrt{R^2 - d^2} = 8\\text{ cm}$."],
    formulaTags: ["CYLINDER_SECTION", "PYTHAGOREAN"]
  },
  {
    sourceNumber: "11.10",
    sourcePage: 17,
    topic: "CYLINDER",
    subtopic: "CYLINDER_AREA",
    archetypeId: "CYLINDER_AREA",
    difficulty: "LEVEL_2",
    question: "Mặt xung quanh của một hình trụ khi trải phẳng ra trên một mặt phẳng là một hình chữ nhật có chiều rộng bằng chiều cao hình trụ và chiều dài bằng:",
    options: [
      { id: "A", text: "Chu vi của hình tròn đáy." },
      { id: "B", text: "Đường kính của hình tròn đáy." },
      { id: "C", text: "Bán kính của hình tròn đáy." },
      { id: "D", text: "Diện tích của hình tròn đáy." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Khi khai triển mặt xung quanh hình trụ trên mặt phẳng.",
      "Bước 2: Chiều rộng hình chữ nhật bằng chiều cao $h$ của hình trụ.",
      "Bước 3: Chiều dài hình chữ nhật bằng chu vi đường tròn đáy $C = 2\\pi r$.",
      "Bước 4: Kết luận: Chọn đáp án A."
    ],
    importantNotes: ["Mặt xung quanh trải phẳng là hình chữ nhật kích thước $h \\times 2\\pi r$."],
    formulaTags: ["CYLINDER_CONCEPT", "CYLINDER_AREA"]
  },

  // Nhóm 12 (12.1 - 12.10)
  {
    sourceNumber: "12.1",
    sourcePage: 17,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_1",
    question: "Cho hình trụ có đường kính đáy $d$ và chiều cao $h$. Thể tích $V$ của hình trụ được tính theo công thức nào sau đây?",
    options: [
      { id: "A", text: "$V = \\frac{\\pi d^2 h}{4}$" },
      { id: "B", text: "$V = \\pi d^2 h$" },
      { id: "C", text: "$V = \\frac{\\pi d^2 h}{2}$" },
      { id: "D", text: "$V = \\frac{\\pi d^2 h}{12}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích hình trụ $V = \\pi r^2 h$.",
      "Bước 2: Thay bán kính $r = \\frac{d}{2} \\Rightarrow r^2 = \\frac{d^2}{4}$.",
      "Bước 3: $V = \\pi \\left(\\frac{d}{2}\\right)^2 h = \\frac{\\pi d^2 h}{4}$.",
      "Bước 4: Kết luận: Chọn đáp án A."
    ],
    importantNotes: ["Theo đường kính: $V = \\frac{\\pi d^2 h}{4}$."],
    formulaTags: ["CYLINDER_VOLUME", "RADIUS_DIAMETER"]
  },
  {
    sourceNumber: "12.2",
    sourcePage: 18,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một hình trụ có đường kính đáy $d = 4\\text{ cm}$ và chiều cao $h = 7\\text{ cm}$. Thể tích của hình trụ là:",
    options: [
      { id: "A", text: "$28\\pi\\text{ cm}^3$" },
      { id: "B", text: "$112\\pi\\text{ cm}^3$" },
      { id: "C", text: "$56\\pi\\text{ cm}^3$" },
      { id: "D", text: "$14\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính $r = 4/2 = 2\\text{ cm}$.",
      "Bước 2: $V = \\pi r^2 h = \\pi \\times 2^2 \\times 7 = 28\\pi\\text{ cm}^3$.",
      "Bước 3: Hoặc dùng $V = \\frac{\\pi \\times 4^2 \\times 7}{4} = 28\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($28\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 28\\pi\\text{ cm}^3$."],
    formulaTags: ["CYLINDER_VOLUME", "RADIUS_DIAMETER"]
  },
  {
    sourceNumber: "12.3",
    sourcePage: 18,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một hình trụ có đường kính đáy bằng chiều cao và bằng $10\\text{ cm}$. Thể tích của hình trụ đó là:",
    options: [
      { id: "A", text: "$250\\pi\\text{ cm}^3$" },
      { id: "B", text: "$1000\\pi\\text{ cm}^3$" },
      { id: "C", text: "$500\\pi\\text{ cm}^3$" },
      { id: "D", text: "$125\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $d = 10\\text{ cm} \\Rightarrow r = 5\\text{ cm}, h = 10\\text{ cm}$.",
      "Bước 2: $V = \\pi r^2 h = \\pi \\times 5^2 \\times 10 = 250\\pi\\text{ cm}^3$.",
      "Bước 3: Kiểm tra các phương án.",
      "Bước 4: Kết luận: Chọn đáp án A ($250\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 250\\pi\\text{ cm}^3$."],
    formulaTags: ["CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "12.4",
    sourcePage: 18,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một hộp sữa chua hình trụ có đường kính đáy $6\\text{ cm}$ và chiều cao $5\\text{ cm}$. Thể tích của hộp sữa chua (lấy $\\pi \\approx 3{,}14$) bằng:",
    options: [
      { id: "A", text: "$141{,}3\\text{ cm}^3$" },
      { id: "B", text: "$565{,}2\\text{ cm}^3$" },
      { id: "C", text: "$282{,}6\\text{ cm}^3$" },
      { id: "D", text: "$94{,}2\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $r = 6/2 = 3\\text{ cm}, h = 5\\text{ cm}$.",
      "Bước 2: $V = \\pi r^2 h = 3{,}14 \\times 3^2 \\times 5 = 3{,}14 \\times 9 \\times 5 = 3{,}14 \\times 45 = 141{,}3\\text{ cm}^3$.",
      "Bước 3: Đối chiếu kết quả.",
      "Bước 4: Kết luận: Chọn đáp án A ($141{,}3\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 141{,}3\\text{ cm}^3$."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "12.5",
    sourcePage: 18,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một hình trụ có thể tích $V = 128\\pi\\text{ cm}^3$ và chiều cao $h = 8\\text{ cm}$. Đường kính đáy của hình trụ bằng:",
    options: [
      { id: "A", text: "$8\\text{ cm}$" },
      { id: "B", text: "$4\\text{ cm}$" },
      { id: "C", text: "$16\\text{ cm}$" },
      { id: "D", text: "$2\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V = \\pi r^2 h \\Rightarrow 128\\pi = \\pi r^2 \\times 8 \\Rightarrow r^2 = 16 \\Rightarrow r = 4\\text{ cm}$.",
      "Bước 2: Đường kính $d = 2r = 2 \\times 4 = 8\\text{ cm}$.",
      "Bước 3: Chú ý câu hỏi yêu cầu tìm đường kính.",
      "Bước 4: Kết luận: Chọn đáp án A ($8\\text{ cm}$)."
    ],
    importantNotes: ["Đường kính $d = 2r = 8\\text{ cm}$."],
    formulaTags: ["CYLINDER_VOLUME", "RADIUS_DIAMETER"]
  },
  {
    sourceNumber: "12.6",
    sourcePage: 18,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_2",
    question: "Nếu giảm đường kính đáy của hình trụ đi 2 lần và tăng chiều cao lên 4 lần thì thể tích của hình trụ sẽ:",
    options: [
      { id: "A", text: "Không đổi." },
      { id: "B", text: "Tăng 2 lần." },
      { id: "C", text: "Giảm 2 lần." },
      { id: "D", text: "Tăng 4 lần." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích $V = \\frac{\\pi d^2 h}{4}$.",
      "Bước 2: Khi $d' = d/2$ và $h' = 4h$: $V' = \\frac{\\pi (d/2)^2 (4h)}{4} = \\frac{\\pi (d^2/4)(4h)}{4} = \\frac{\\pi d^2 h}{4} = V$.",
      "Bước 3: Do đó thể tích không đổi.",
      "Bước 4: Kết luận: Chọn đáp án A (Không đổi)."
    ],
    importantNotes: ["Bình phương đường kính giảm 4, chiều cao tăng 4 triệt tiêu nhau."],
    formulaTags: ["CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "12.7",
    sourcePage: 18,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một bình nước ngọt hình trụ có đường kính miệng bình $8\\text{ cm}$, chiều cao $15\\text{ cm}$. Người ta rót nước vào bình sao cho mực nước cao bằng $\\frac{2}{3}$ chiều cao của bình. Thể tích nước có trong bình là:",
    options: [
      { id: "A", text: "$160\\pi\\text{ cm}^3$" },
      { id: "B", text: "$240\\pi\\text{ cm}^3$" },
      { id: "C", text: "$640\\pi\\text{ cm}^3$" },
      { id: "D", text: "$80\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính đáy $r = 8/2 = 4\\text{ cm}$. Chiều cao mực nước $h' = \\frac{2}{3} \\times 15 = 10\\text{ cm}$.",
      "Bước 2: Thể tích nước: $V_{\\text{nước}} = \\pi r^2 h'$.",
      "Bước 3: $V_{\\text{nước}} = \\pi \\times 4^2 \\times 10 = 160\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($160\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$h' = 10\\text{ cm} \\Rightarrow V = 160\\pi\\text{ cm}^3$."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "12.8",
    sourcePage: 19,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một cây nến sáp hình trụ có đường kính $2\\text{ cm}$ và chiều dài $12\\text{ cm}$. Khi đốt, ngọn nến cháy đều mỗi phút tiêu hao $0{,}5\\text{ cm}^3$ sáp. Hỏi cây nến sẽ cháy hết trong bao lâu? (lấy $\\pi \\approx 3{,}14$, làm tròn đến phút)",
    options: [
      { id: "A", text: "$75\\text{ phút}$" },
      { id: "B", text: "$38\\text{ phút}$" },
      { id: "C", text: "$150\\text{ phút}$" },
      { id: "D", text: "$60\\text{ phút}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính nến $r = 2/2 = 1\\text{ cm}$, chiều cao $h = 12\\text{ cm}$.",
      "Bước 2: Thể tích toàn bộ cây nến: $V = \\pi r^2 h = 3{,}14 \\times 1^2 \\times 12 = 37{,}68\\text{ cm}^3$.",
      "Bước 3: Thời gian cháy hết: $t = \\frac{37{,}68}{0{,}5} = 75{,}36\\text{ phút} \\approx 75\\text{ phút}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($75\\text{ phút}$)."
    ],
    importantNotes: ["Thời gian = Tổng thể tích / Tốc độ cháy."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "12.9",
    sourcePage: 19,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một trục lăn bê tông hình trụ có đường kính $1\\text{ m}$ và bề rộng (chiều cao) $1{,}5\\text{ m}$. Khi trục lăn quay được 20 vòng thì thể tích của khối bê tông làm nên trục lăn đó bằng:",
    options: [
      { id: "A", text: "$0{,}375\\pi\\text{ m}^3$" },
      { id: "B", text: "$1{,}5\\pi\\text{ m}^3$" },
      { id: "C", text: "$7{,}5\\pi\\text{ m}^3$" },
      { id: "D", text: "$0{,}75\\pi\\text{ m}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Đề bài hỏi thể tích của khối bê tông làm nên trục lăn hình trụ (không phụ thuộc vào số vòng lăn).",
      "Bước 2: Bán kính $r = 1/2 = 0{,}5\\text{ m}$, chiều cao $h = 1{,}5\\text{ m}$.",
      "Bước 3: $V = \\pi r^2 h = \\pi \\times (0{,}5)^2 \\times 1{,}5 = \\pi \\times 0{,}25 \\times 1{,}5 = 0{,}375\\pi\\text{ m}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($0{,}375\\pi\\text{ m}^3$)."
    ],
    importantNotes: ["Đọc kỹ yêu cầu hỏi thể tích khối bê tông làm nên trục."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "12.10",
    sourcePage: 19,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_3",
    question: "Cho hai hình trụ: hình trụ thứ nhất có đường kính đáy $d$ và chiều cao $2h$; hình trụ thứ hai có đường kính đáy $2d$ và chiều cao $h$. Tỉ số thể tích của hình trụ thứ nhất và hình trụ thứ hai là:",
    options: [
      { id: "A", text: "$\\frac{1}{2}$" },
      { id: "B", text: "$1$" },
      { id: "C", text: "$2$" },
      { id: "D", text: "$\\frac{1}{4}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V_1 = \\pi (d/2)^2 (2h) = \\frac{\\pi d^2 (2h)}{4} = \\frac{\\pi d^2 h}{2}$.",
      "Bước 2: $V_2 = \\pi (2d/2)^2 h = \\pi d^2 h$.",
      "Bước 3: Tỉ số: $\\frac{V_1}{V_2} = \\frac{\\frac{1}{2}\\pi d^2 h}{\\pi d^2 h} = \\frac{1}{2}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{1}{2}$)."
    ],
    importantNotes: ["Đường kính gấp đôi làm thể tích tăng gấp 4."],
    formulaTags: ["CYLINDER_VOLUME"]
  },

  // Nhóm 13 (13.1 - 13.10)
  {
    sourceNumber: "13.1",
    sourcePage: 19,
    topic: "CONE",
    subtopic: "CONE_CONCEPT",
    archetypeId: "CONE_CONCEPT",
    difficulty: "LEVEL_1",
    question: "Hình nón được tạo thành khi quay hình nào sau đây một vòng quanh một cạnh góc vuông cố định?",
    options: [
      { id: "A", text: "Tam giác vuông." },
      { id: "B", text: "Tam giác đều." },
      { id: "C", text: "Hình chữ nhật." },
      { id: "D", text: "Hình bán nguyệt." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Xem định nghĩa hình nón trong SGK Hình học 9.",
      "Bước 2: Khi quay tam giác vuông quanh một cạnh góc vuông cố định, cạnh huyền quét nên mặt xung quanh, cạnh góc vuông còn lại quét nên mặt đáy hình tròn.",
      "Bước 3: Khối tròn xoay tạo thành là hình nón.",
      "Bước 4: Kết luận: Chọn đáp án A (Tam giác vuông)."
    ],
    importantNotes: ["Quay tam giác vuông quanh cạnh góc vuông tạo nên hình nón."],
    formulaTags: ["CONE_CONCEPT"]
  },
  {
    sourceNumber: "13.2",
    sourcePage: 20,
    topic: "CONE",
    subtopic: "CONE_CONCEPT",
    archetypeId: "CONE_CONCEPT",
    difficulty: "LEVEL_1",
    question: "Cho hình nón đỉnh $S$, đáy là hình tròn tâm $O$, điểm $A$ nằm trên đường tròn đáy. Đoạn thẳng $SA$ được gọi là:",
    options: [
      { id: "A", text: "Đường sinh của hình nón." },
      { id: "B", text: "Chiều cao của hình nón." },
      { id: "C", text: "Trục của hình nón." },
      { id: "D", text: "Bán kính đáy của hình nón." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Điểm $S$ là đỉnh hình nón, $A$ nằm trên đường viền đáy.",
      "Bước 2: Đoạn thẳng nối đỉnh $S$ với một điểm bất kì trên đường tròn đáy được gọi là đường sinh.",
      "Bước 3: Chiều cao là đoạn $SO$, bán kính là $OA$.",
      "Bước 4: Kết luận: Chọn đáp án A (Đường sinh của hình nón)."
    ],
    importantNotes: ["$SA$ là đường sinh $l$."],
    formulaTags: ["CONE_CONCEPT"]
  },
  {
    sourceNumber: "13.3",
    sourcePage: 20,
    topic: "CONE",
    subtopic: "CONE_CONCEPT",
    archetypeId: "CONE_CONCEPT",
    difficulty: "LEVEL_1",
    question: "Cho hình nón đỉnh $S$, trục $SO$, bán kính đáy $r = OA$ và đường sinh $l = SA$. Mối quan hệ nào sau đây luôn đúng?",
    options: [
      { id: "A", text: "$l^2 = h^2 + r^2$" },
      { id: "B", text: "$h^2 = l^2 + r^2$" },
      { id: "C", text: "$r^2 = l^2 + h^2$" },
      { id: "D", text: "$l = h + r$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Xét tam giác $SOA$ vuông tại $O$ (vì $SO$ vuông góc với mặt phẳng đáy).",
      "Bước 2: Cạnh huyền là đường sinh $SA = l$, hai cạnh góc vuông là chiều cao $SO = h$ và bán kính đáy $OA = r$.",
      "Bước 3: Theo định lí Pythagore: $SA^2 = SO^2 + OA^2 \\Leftrightarrow l^2 = h^2 + r^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($l^2 = h^2 + r^2$)."
    ],
    importantNotes: ["$l^2 = h^2 + r^2$."],
    formulaTags: ["CONE_CONCEPT", "PYTHAGOREAN"]
  },
  {
    sourceNumber: "13.4",
    sourcePage: 20,
    topic: "CONE",
    subtopic: "CONE_SECTION",
    archetypeId: "CONE_SECTION",
    difficulty: "LEVEL_1",
    question: "Cắt một hình nón bởi một mặt phẳng đi qua trục, thiết diện nhận được luôn là:",
    options: [
      { id: "A", text: "Tam giác cân." },
      { id: "B", text: "Tam giác vuông." },
      { id: "C", text: "Hình chữ nhật." },
      { id: "D", text: "Hình tròn." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Mặt phẳng đi qua trục chứa đỉnh $S$ và đường kính đáy $AB$.",
      "Bước 2: Hai cạnh bên của thiết diện là hai đường sinh $SA$ và $SB$.",
      "Bước 3: Vì $SA = SB = l$ nên tam giác $SAB$ luôn là tam giác cân tại $S$.",
      "Bước 4: Kết luận: Chọn đáp án A (Tam giác cân)."
    ],
    importantNotes: ["Thiết diện qua trục của hình nón luôn là tam giác cân tại đỉnh."],
    formulaTags: ["CONE_SECTION"]
  },
  {
    sourceNumber: "13.5",
    sourcePage: 20,
    topic: "CONE",
    subtopic: "CONE_SECTION",
    archetypeId: "CONE_SECTION",
    difficulty: "LEVEL_1",
    question: "Cắt một hình nón bởi một mặt phẳng song song với đáy, thiết diện nhận được là:",
    options: [
      { id: "A", text: "Hình tròn có bán kính nhỏ hơn bán kính đáy." },
      { id: "B", text: "Hình tròn có bán kính bằng bán kính đáy." },
      { id: "C", text: "Tam giác cân." },
      { id: "D", text: "Hình elip." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Mặt phẳng song song với đáy cắt mặt xung quanh của hình nón.",
      "Bước 2: Thiết diện nhận được là một hình tròn có tâm nằm trên trục $SO$.",
      "Bước 3: Do vị trí cắt nằm giữa đỉnh và đáy nên bán kính của hình tròn này luôn nhỏ hơn bán kính đáy.",
      "Bước 4: Kết luận: Chọn đáp án A."
    ],
    importantNotes: ["Mặt cắt song song đáy là hình tròn nhỏ hơn đáy."],
    formulaTags: ["CONE_SECTION"]
  },
  {
    sourceNumber: "13.6",
    sourcePage: 20,
    topic: "CONE",
    subtopic: "CONE_CONCEPT",
    archetypeId: "CONE_CONCEPT",
    difficulty: "LEVEL_2",
    question: "Cho hình nón có chiều cao $h = 8\\text{ cm}$ và bán kính đáy $r = 6\\text{ cm}$. Độ dài đường sinh $l$ của hình nón bằng:",
    options: [
      { id: "A", text: "$10\\text{ cm}$" },
      { id: "B", text: "$14\\text{ cm}$" },
      { id: "C", text: "$2\\sqrt{7}\\text{ cm}$" },
      { id: "D", text: "$48\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Áp dụng $l = \\sqrt{h^2 + r^2}$.",
      "Bước 2: Thay số: $l = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100}$.",
      "Bước 3: $l = 10\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($10\\text{ cm}$)."
    ],
    importantNotes: ["Bộ ba Pythagore $(6, 8, 10)$."],
    formulaTags: ["CONE_CONCEPT", "PYTHAGOREAN"]
  },
  {
    sourceNumber: "13.7",
    sourcePage: 20,
    topic: "CONE",
    subtopic: "CONE_SECTION",
    archetypeId: "CONE_SECTION",
    difficulty: "LEVEL_2",
    question: "Một hình nón có thiết diện qua trục là một tam giác đều cạnh $8\\text{ cm}$. Chiều cao của hình nón đó bằng:",
    options: [
      { id: "A", text: "$4\\sqrt{3}\\text{ cm}$" },
      { id: "B", text: "$8\\sqrt{3}\\text{ cm}$" },
      { id: "C", text: "$4\\text{ cm}$" },
      { id: "D", text: "$8\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Chiều cao hình nón chính là đường cao của tam giác đều cạnh $a = 8\\text{ cm}$.",
      "Bước 2: Công thức đường cao tam giác đều: $h = \\frac{a\\sqrt{3}}{2}$.",
      "Bước 3: $h = \\frac{8\\sqrt{3}}{2} = 4\\sqrt{3}\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($4\\sqrt{3}\\text{ cm}$)."
    ],
    importantNotes: ["$h = 4\\sqrt{3}\\text{ cm}$."],
    formulaTags: ["CONE_SECTION"]
  },
  {
    sourceNumber: "13.8",
    sourcePage: 21,
    topic: "CONE",
    subtopic: "CONE_SECTION",
    archetypeId: "CONE_SECTION",
    difficulty: "LEVEL_2",
    question: "Một hình nón có góc ở đỉnh bằng $90^\\circ$ và độ dài đường sinh $l = 4\\sqrt{2}\\text{ cm}$. Bán kính đáy của hình nón đó là:",
    options: [
      { id: "A", text: "$4\\text{ cm}$" },
      { id: "B", text: "$2\\sqrt{2}\\text{ cm}$" },
      { id: "C", text: "$8\\text{ cm}$" },
      { id: "D", text: "$4\\sqrt{2}\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thiết diện qua trục là tam giác vuông cân tại đỉnh $S$ với cạnh bên $l = 4\\sqrt{2}\\text{ cm}$.",
      "Bước 2: Cạnh huyền là đường kính đáy: $d = l\\sqrt{2} = 4\\sqrt{2} \\times \\sqrt{2} = 8\\text{ cm}$.",
      "Bước 3: Bán kính đáy $r = d/2 = 8/2 = 4\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($4\\text{ cm}$)."
    ],
    importantNotes: ["Tam giác vuông cân cạnh $l$ có cạnh huyền $2r = l\\sqrt{2}$."],
    formulaTags: ["CONE_SECTION", "PYTHAGOREAN"]
  },
  {
    sourceNumber: "13.9",
    sourcePage: 21,
    topic: "CONE",
    subtopic: "CONE_SECTION",
    archetypeId: "CONE_SECTION",
    difficulty: "LEVEL_3",
    question: "Một hình nón có bán kính đáy $r = 5\\text{ cm}$ và diện tích thiết diện qua trục bằng $60\\text{ cm}^2$. Chiều cao $h$ của hình nón bằng:",
    options: [
      { id: "A", text: "$12\\text{ cm}$" },
      { id: "B", text: "$6\\text{ cm}$" },
      { id: "C", text: "$24\\text{ cm}$" },
      { id: "D", text: "$10\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thiết diện qua trục là tam giác cân có cạnh đáy $d = 2r = 10\\text{ cm}$ và chiều cao $h$.",
      "Bước 2: Diện tích tam giác thiết diện: $S = \\frac{1}{2} \\times d \\times h = r \\times h$.",
      "Bước 3: Thay số: $60 = 5 \\times h \\Rightarrow h = \\frac{60}{5} = 12\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($12\\text{ cm}$)."
    ],
    importantNotes: ["Diện tích thiết diện qua trục của nón: $S = rh$."],
    formulaTags: ["CONE_SECTION"]
  },
  {
    sourceNumber: "13.10",
    sourcePage: 21,
    topic: "CONE",
    subtopic: "CONE_CONCEPT",
    archetypeId: "CONE_CONCEPT",
    difficulty: "LEVEL_3",
    question: "Cho hình nón đỉnh $S$, đáy tâm $O$. Gọi $M$ là trung điểm của đường sinh $SA$. Cắt hình nón bởi mặt phẳng qua $M$ và song song với đáy. Tỉ số diện tích của thiết diện tạo thành và diện tích đáy của hình nón là:",
    options: [
      { id: "A", text: "$\\frac{1}{4}$" },
      { id: "B", text: "$\\frac{1}{2}$" },
      { id: "C", text: "$\\frac{1}{8}$" },
      { id: "D", text: "$\\frac{1}{3}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Vì $M$ là trung điểm của $SA$ nên bán kính của đường tròn thiết diện $r' = \\frac{1}{2}r$.",
      "Bước 2: Diện tích thiết diện: $S' = \\pi (r')^2 = \\pi \\left(\\frac{r}{2}\\right)^2 = \\frac{1}{4}\\pi r^2$.",
      "Bước 3: Tỉ số diện tích: $\\frac{S'}{S} = \\frac{\\frac{1}{4}\\pi r^2}{\\pi r^2} = \\frac{1}{4}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{1}{4}$)."
    ],
    importantNotes: ["Tỉ số diện tích bằng bình phương tỉ số đồng dạng: $(1/2)^2 = 1/4$."],
    formulaTags: ["CONE_SECTION", "SIMILARITY"]
  },

  // Nhóm 14 (14.1 - 14.10)
  {
    sourceNumber: "14.1",
    sourcePage: 21,
    topic: "MIXED",
    subtopic: "REAL_WORLD_SHAPES",
    archetypeId: "REAL_WORLD_SHAPES",
    difficulty: "LEVEL_1",
    question: "Vật thể nào sau đây trong thực tế có dạng hình trụ?",
    options: [
      { id: "A", text: "Lon sữa đặc." },
      { id: "B", text: "Chiếc nón lá." },
      { id: "C", text: "Quả bóng đá." },
      { id: "D", text: "Kim tự tháp Ai Cập." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Nhận diện hình dạng các vật thể trong thực tế.",
      "Bước 2: Lon sữa đặc có hai đáy tròn phẳng bằng nhau và mặt xung quanh uốn cong thẳng đứng nên có dạng hình trụ.",
      "Bước 3: Chiếc nón lá có dạng hình nón; quả bóng đá có dạng hình cầu; kim tự tháp có dạng hình chóp tứ giác đều.",
      "Bước 4: Kết luận: Chọn đáp án A (Lon sữa đặc)."
    ],
    importantNotes: ["Lon sữa đặc có dạng hình trụ."],
    formulaTags: ["REAL_WORLD_SHAPES"]
  },
  {
    sourceNumber: "14.2",
    sourcePage: 21,
    topic: "MIXED",
    subtopic: "REAL_WORLD_SHAPES",
    archetypeId: "REAL_WORLD_SHAPES",
    difficulty: "LEVEL_1",
    question: "Vật thể nào sau đây có dạng hình nón?",
    options: [
      { id: "A", text: "Chiếc nón lá truyền thống." },
      { id: "B", text: "Thùng phuy đựng dầu." },
      { id: "C", text: "Viên bi sắt." },
      { id: "D", text: "Viên gạch ống." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Hình nón có 1 đỉnh và 1 đáy là hình tròn.",
      "Bước 2: Chiếc nón lá có dạng mặt xung quanh hình nón.",
      "Bước 3: Thùng phuy là hình trụ; viên bi sắt là hình cầu.",
      "Bước 4: Kết luận: Chọn đáp án A (Chiếc nón lá truyền thống)."
    ],
    importantNotes: ["Nón lá có dạng hình nón."],
    formulaTags: ["REAL_WORLD_SHAPES"]
  },
  {
    sourceNumber: "14.3",
    sourcePage: 22,
    topic: "MIXED",
    subtopic: "REAL_WORLD_SHAPES",
    archetypeId: "REAL_WORLD_SHAPES",
    difficulty: "LEVEL_1",
    question: "Vật thể nào sau đây có dạng hình cầu?",
    options: [
      { id: "A", text: "Quả địa cầu mô hình trường học." },
      { id: "B", text: "Chiếc cốc uống nước hình trụ." },
      { id: "C", text: "Chiếc phễu rót nước." },
      { id: "D", text: "Hộp diêm." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Quả địa cầu biểu diễn bề mặt Trái Đất có dạng hình cầu.",
      "Bước 2: Cốc nước dạng hình trụ, phễu dạng hình nón, hộp diêm dạng hình hộp chữ nhật.",
      "Bước 3: Đối chiếu các phương án.",
      "Bước 4: Kết luận: Chọn đáp án A (Quả địa cầu mô hình trường học)."
    ],
    importantNotes: ["Quả địa cầu có dạng hình cầu."],
    formulaTags: ["REAL_WORLD_SHAPES"]
  },
  {
    sourceNumber: "14.4",
    sourcePage: 22,
    topic: "MIXED",
    subtopic: "REAL_WORLD_SHAPES",
    archetypeId: "REAL_WORLD_SHAPES",
    difficulty: "LEVEL_1",
    question: "Chiếc cọc tiêu giao thông dùng để phân luồng (hình chóp nón cao su) thường có thân chính dạng hình gì?",
    options: [
      { id: "A", text: "Hình nón (hoặc nón cụt)." },
      { id: "B", text: "Hình trụ." },
      { id: "C", text: "Hình cầu." },
      { id: "D", text: "Hình lăng trụ tam giác." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Cọc tiêu giao thông có thân thu nhỏ dần về đỉnh trên một đế phẳng.",
      "Bước 2: Thân cọc tiêu có hình nón hoặc hình nón cụt.",
      "Bước 3: Chọn phương án phù hợp.",
      "Bước 4: Kết luận: Chọn đáp án A."
    ],
    importantNotes: ["Cọc tiêu giao thông có thân dạng hình nón."],
    formulaTags: ["REAL_WORLD_SHAPES"]
  },
  {
    sourceNumber: "14.5",
    sourcePage: 22,
    topic: "MIXED",
    subtopic: "REAL_WORLD_SHAPES",
    archetypeId: "REAL_WORLD_SHAPES",
    difficulty: "LEVEL_1",
    question: "Ống cống thoát nước bê tông đúc sẵn có dạng hình gì?",
    options: [
      { id: "A", text: "Hình trụ rỗng." },
      { id: "B", text: "Hình nón cụt." },
      { id: "C", text: "Hình cầu rỗng." },
      { id: "D", text: "Hình hộp chữ nhật." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Ống cống tròn bê tông có mặt cắt là hai đường tròn đồng tâm kéo dài suốt chiều dài ống.",
      "Bước 2: Hình khối giới hạn bởi hai mặt trụ đồng trục và hai đáy vành khuyên là hình trụ rỗng.",
      "Bước 3: Đối chiếu với các phương án đã cho.",
      "Bước 4: Kết luận: Chọn đáp án A (Hình trụ rỗng)."
    ],
    importantNotes: ["Ống cống là hình trụ rỗng."],
    formulaTags: ["REAL_WORLD_SHAPES"]
  },
  {
    sourceNumber: "14.6",
    sourcePage: 22,
    topic: "MIXED",
    subtopic: "REAL_WORLD_SHAPES",
    archetypeId: "REAL_WORLD_SHAPES",
    difficulty: "LEVEL_1",
    question: "Bong bóng xà phòng bay trong không khí thường có xu hướng thu về hình dạng nào để có diện tích bề mặt nhỏ nhất với cùng thể tích?",
    options: [
      { id: "A", text: "Hình cầu." },
      { id: "B", text: "Hình lập phương." },
      { id: "C", text: "Hình trụ." },
      { id: "D", text: "Hình nón." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Do lực căng bề mặt, các màng chất lỏng tự do luôn co lại để đạt diện tích bề mặt nhỏ nhất.",
      "Bước 2: Trong các hình khối có cùng thể tích, hình cầu có diện tích bề mặt nhỏ nhất.",
      "Bước 3: Do đó bong bóng xà phòng luôn có dạng hình cầu.",
      "Bước 4: Kết luận: Chọn đáp án A (Hình cầu)."
    ],
    importantNotes: ["Hình cầu tối ưu hóa diện tích mặt nhỏ nhất với cùng thể tích."],
    formulaTags: ["REAL_WORLD_SHAPES"]
  },
  {
    sourceNumber: "14.7",
    sourcePage: 22,
    topic: "MIXED",
    subtopic: "REAL_WORLD_SHAPES",
    archetypeId: "REAL_WORLD_SHAPES",
    difficulty: "LEVEL_2",
    question: "Một cây bút chì tiêu chuẩn chưa gọt có thân dạng hình lăng trụ lục giác đều hoặc hình trụ. Sau khi gọt nhọn một đầu, phần đầu ngọn bút chì có dạng hình gì?",
    options: [
      { id: "A", text: "Hình nón." },
      { id: "B", text: "Hình trụ." },
      { id: "C", text: "Hình cầu." },
      { id: "D", text: "Hình chóp tam giác." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Quá trình gọt bút chì tạo nên một đầu nhọn có đáy tròn và thu về một đỉnh nhọn.",
      "Bước 2: Bề mặt này là mặt nón tròn xoay.",
      "Bước 3: Do đó đầu ngọn bút chì có dạng hình nón.",
      "Bước 4: Kết luận: Chọn đáp án A."
    ],
    importantNotes: ["Đầu bút chì gọt có dạng hình nón."],
    formulaTags: ["REAL_WORLD_SHAPES"]
  },
  {
    sourceNumber: "14.8",
    sourcePage: 22,
    topic: "MIXED",
    subtopic: "REAL_WORLD_SHAPES",
    archetypeId: "REAL_WORLD_SHAPES",
    difficulty: "LEVEL_2",
    question: "Một cây kem ốc quế gồm hai phần: phần vỏ bánh bên dưới và viên kem bên trên. Mô hình hình học chuẩn của cây kem này là sự kết hợp của:",
    options: [
      { id: "A", text: "Một hình nón ở dưới và một nửa hình cầu ở trên." },
      { id: "B", text: "Một hình trụ ở dưới và một hình nón ở trên." },
      { id: "C", text: "Một hình nón ở dưới và một hình trụ ở trên." },
      { id: "D", text: "Một hình lập phương và một hình cầu." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Vỏ bánh ốc quế thon nhọn dần về đáy nên có dạng hình nón.",
      "Bước 2: Viên kem tròn nhô lên phía trên miệng vỏ bánh có dạng nửa hình cầu (bán cầu).",
      "Bước 3: Do đó mô hình là sự kết hợp của hình nón và bán cầu.",
      "Bước 4: Kết luận: Chọn đáp án A."
    ],
    importantNotes: ["Kem ốc quế = thân nón + nửa cầu trên."],
    formulaTags: ["REAL_WORLD_SHAPES", "COMPOSITE_SHAPES"]
  },
  {
    sourceNumber: "14.9",
    sourcePage: 23,
    topic: "MIXED",
    subtopic: "REAL_WORLD_SHAPES",
    archetypeId: "REAL_WORLD_SHAPES",
    difficulty: "LEVEL_2",
    question: "Một bồn chở xăng dầu gắn trên xe téc thường có phần thân giữa dạng hình trụ và hai đầu bồn có dạng:",
    options: [
      { id: "A", text: "Hai nửa hình cầu (hoặc hai chỏm cầu)." },
      { id: "B", text: "Hai hình nón nhọn." },
      { id: "C", text: "Hai mặt phẳng phẳng đứng." },
      { id: "D", text: "Hai hình hộp chữ nhật." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Để chịu áp lực chất lỏng tốt nhất và giảm sức cản khi di chuyển, hai đầu bồn xe téc được dập cong.",
      "Bước 2: Hai đầu này có dạng hai nửa hình cầu (bán cầu) hoặc chỏm cầu.",
      "Bước 3: Ghép lại tạo thành hình trụ kết hợp với hai bán cầu.",
      "Bước 4: Kết luận: Chọn đáp án A."
    ],
    importantNotes: ["Xe bồn téc = thân trụ + 2 nửa cầu."],
    formulaTags: ["REAL_WORLD_SHAPES", "COMPOSITE_SHAPES"]
  },
  {
    sourceNumber: "14.10",
    sourcePage: 23,
    topic: "MIXED",
    subtopic: "REAL_WORLD_SHAPES",
    archetypeId: "REAL_WORLD_SHAPES",
    difficulty: "LEVEL_2",
    question: "Một viên thuốc con nhộng (capsule) trong y tế có hình dạng kết hợp bởi:",
    options: [
      { id: "A", text: "Một hình trụ ở giữa và hai nửa hình cầu ở hai đầu." },
      { id: "B", text: "Một hình trụ ở giữa và hai hình nón ở hai đầu." },
      { id: "C", text: "Ba hình cầu nối tiếp nhau." },
      { id: "D", text: "Hai hình trụ lồng vào nhau." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Phân tích hình học của viên thuốc con nhộng.",
      "Bước 2: Thân thẳng ở giữa là một hình trụ tròn.",
      "Bước 3: Hai đầu bo tròn là hai nửa hình cầu có cùng bán kính với hình trụ.",
      "Bước 4: Kết luận: Chọn đáp án A."
    ],
    importantNotes: ["Viên thuốc con nhộng = thân trụ + 2 nửa bán cầu."],
    formulaTags: ["REAL_WORLD_SHAPES", "COMPOSITE_SHAPES"]
  },

  // Nhóm 15 (15.1 - 15.10)
  {
    sourceNumber: "15.1",
    sourcePage: 23,
    topic: "CYLINDER",
    subtopic: "CYLINDER_AREA",
    archetypeId: "CYLINDER_LATERAL_AREA",
    difficulty: "LEVEL_1",
    question: "Cho hình trụ có đường kính đáy $d$ và chiều cao $h$. Công thức tính diện tích xung quanh $S_{xq}$ của hình trụ là:",
    options: [
      { id: "A", text: "$S_{xq} = \\pi d h$" },
      { id: "B", text: "$S_{xq} = 2\\pi d h$" },
      { id: "C", text: "$S_{xq} = \\frac{\\pi d h}{2}$" },
      { id: "D", text: "$S_{xq} = \\pi d^2 h$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Công thức theo bán kính: $S_{xq} = 2\\pi r h$.",
      "Bước 2: Vì $2r = d$ (đường kính), thay vào ta được: $S_{xq} = \\pi (2r) h = \\pi d h$.",
      "Bước 3: Đối chiếu các phương án.",
      "Bước 4: Kết luận: Chọn đáp án A ($S_{xq} = \\pi d h$)."
    ],
    importantNotes: ["Theo đường kính: $S_{xq} = \\pi d h$."],
    formulaTags: ["CYLINDER_LATERAL_AREA", "RADIUS_DIAMETER"]
  },
  {
    sourceNumber: "15.2",
    sourcePage: 23,
    topic: "CYLINDER",
    subtopic: "CYLINDER_AREA",
    archetypeId: "CYLINDER_LATERAL_AREA",
    difficulty: "LEVEL_2",
    question: "Một hình trụ có đường kính đáy $d = 6\\text{ cm}$ và chiều cao $h = 10\\text{ cm}$. Diện tích xung quanh của hình trụ là:",
    options: [
      { id: "A", text: "$60\\pi\\text{ cm}^2$" },
      { id: "B", text: "$120\\pi\\text{ cm}^2$" },
      { id: "C", text: "$30\\pi\\text{ cm}^2$" },
      { id: "D", text: "$90\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $d = 6\\text{ cm}, h = 10\\text{ cm}$.",
      "Bước 2: $S_{xq} = \\pi d h = \\pi \\times 6 \\times 10 = 60\\pi\\text{ cm}^2$.",
      "Bước 3: Hoặc dùng $r = 3 \\Rightarrow S_{xq} = 2\\pi \\times 3 \\times 10 = 60\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($60\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{xq} = 60\\pi\\text{ cm}^2$."],
    formulaTags: ["CYLINDER_LATERAL_AREA"]
  },
  {
    sourceNumber: "15.3",
    sourcePage: 23,
    topic: "CYLINDER",
    subtopic: "CYLINDER_AREA",
    archetypeId: "CYLINDER_LATERAL_AREA",
    difficulty: "LEVEL_2",
    question: "Một hình trụ có diện tích xung quanh $S_{xq} = 80\\pi\\text{ cm}^2$ và chiều cao $h = 8\\text{ cm}$. Đường kính đáy $d$ của hình trụ bằng:",
    options: [
      { id: "A", text: "$10\\text{ cm}$" },
      { id: "B", text: "$5\\text{ cm}$" },
      { id: "C", text: "$20\\text{ cm}$" },
      { id: "D", text: "$8\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $S_{xq} = \\pi d h \\Rightarrow d = \\frac{S_{xq}}{\\pi h}$.",
      "Bước 2: $d = \\frac{80\\pi}{\\pi \\times 8} = 10\\text{ cm}$.",
      "Bước 3: Kiểm tra lại với bán kính: $r = 5\\text{ cm} \\Rightarrow d = 10\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($10\\text{ cm}$)."
    ],
    importantNotes: ["$d = 10\\text{ cm}$."],
    formulaTags: ["CYLINDER_LATERAL_AREA"]
  },
  {
    sourceNumber: "15.4",
    sourcePage: 23,
    topic: "CYLINDER",
    subtopic: "CYLINDER_AREA",
    archetypeId: "CYLINDER_LATERAL_AREA",
    difficulty: "LEVEL_2",
    question: "Một ống cống bê tông hình trụ có đường kính ngoài $1\\text{ m}$ và chiều dài $3\\text{ m}$. Diện tích bề mặt xung quanh phía ngoài của ống cống (lấy $\\pi \\approx 3{,}14$) bằng:",
    options: [
      { id: "A", text: "$9{,}42\\text{ m}^2$" },
      { id: "B", text: "$18{,}84\\text{ m}^2$" },
      { id: "C", text: "$4{,}71\\text{ m}^2$" },
      { id: "D", text: "$2{,}355\\text{ m}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $d = 1\\text{ m}, h = 3\\text{ m}$.",
      "Bước 2: Diện tích xung quanh: $S_{xq} = \\pi d h$.",
      "Bước 3: $S_{xq} = 3{,}14 \\times 1 \\times 3 = 9{,}42\\text{ m}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($9{,}42\\text{ m}^2$)."
    ],
    importantNotes: ["$S_{xq} = 9{,}42\\text{ m}^2$."],
    formulaTags: ["CYLINDER_LATERAL_AREA", "REAL_WORLD"]
  },
  {
    sourceNumber: "15.5",
    sourcePage: 24,
    topic: "CYLINDER",
    subtopic: "CYLINDER_AREA",
    archetypeId: "CYLINDER_LATERAL_AREA",
    difficulty: "LEVEL_2",
    question: "Một cái cột gỗ hình trụ có đường kính đáy $0{,}4\\text{ m}$ và chiều cao $3{,}5\\text{ m}$. Chi phí sơn toàn bộ mặt xung quanh của cột là bao nhiêu tiền, biết giá sơn là $50\\,000\\text{ đồng/m}^2$ (lấy $\\pi \\approx 3{,}14$)?",
    options: [
      { id: "A", text: "$219\\,800\\text{ đồng}$" },
      { id: "B", text: "$439\\,600\\text{ đồng}$" },
      { id: "C", text: "$109\\,900\\text{ đồng}$" },
      { id: "D", text: "$314\\,000\\text{ đồng}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Diện tích xung quanh cột gỗ: $S_{xq} = \\pi d h = 3{,}14 \\times 0{,}4 \\times 3{,}5 = 4{,}396\\text{ m}^2$.",
      "Bước 2: Chi phí sơn: $T = 4{,}396 \\times 50\\,000$.",
      "Bước 3: $T = 219\\,800\\text{ đồng}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($219\\,800\\text{ đồng}$)."
    ],
    importantNotes: ["Chi phí = Diện tích $\\times$ Đơn giá."],
    formulaTags: ["CYLINDER_LATERAL_AREA", "REAL_WORLD"]
  },
  {
    sourceNumber: "15.6",
    sourcePage: 24,
    topic: "CYLINDER",
    subtopic: "CYLINDER_AREA",
    archetypeId: "CYLINDER_LATERAL_AREA",
    difficulty: "LEVEL_2",
    question: "Một nhãn giấy bao quanh thân một lon nước ngọt hình trụ có đường kính $6{,}5\\text{ cm}$ và chiều cao $12\\text{ cm}$. Diện tích giấy làm nhãn (bỏ qua mép dán, lấy $\\pi \\approx 3{,}14$) bằng:",
    options: [
      { id: "A", text: "$244{,}92\\text{ cm}^2$" },
      { id: "B", text: "$489{,}84\\text{ cm}^2$" },
      { id: "C", text: "$122{,}46\\text{ cm}^2$" },
      { id: "D", text: "$398\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Nhãn giấy bao quanh thân lon chính là diện tích xung quanh hình trụ.",
      "Bước 2: $S_{xq} = \\pi d h = 3{,}14 \\times 6{,}5 \\times 12$.",
      "Bước 3: $S_{xq} = 3{,}14 \\times 78 = 244{,}92\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($244{,}92\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{xq} = 244{,}92\\text{ cm}^2$."],
    formulaTags: ["CYLINDER_LATERAL_AREA", "REAL_WORLD"]
  },
  {
    sourceNumber: "15.7",
    sourcePage: 24,
    topic: "CYLINDER",
    subtopic: "CYLINDER_AREA",
    archetypeId: "CYLINDER_LATERAL_AREA",
    difficulty: "LEVEL_2",
    question: "Một trục lăn sơn hình trụ có đường kính $5\\text{ cm}$ và chiều dài trục lăn $20\\text{ cm}$. Khi lăn đúng 10 vòng trên tường phẳng, diện tích tường được sơn phủ là:",
    options: [
      { id: "A", text: "$1000\\pi\\text{ cm}^2$" },
      { id: "B", text: "$2000\\pi\\text{ cm}^2$" },
      { id: "C", text: "$500\\pi\\text{ cm}^2$" },
      { id: "D", text: "$100\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Diện tích quét được sau 1 vòng lăn bằng diện tích xung quanh của trục lăn: $S_{1\\text{vòng}} = \\pi d h = \\pi \\times 5 \\times 20 = 100\\pi\\text{ cm}^2$.",
      "Bước 2: Sau 10 vòng, diện tích tường được sơn là: $S = 10 \\times S_{1\\text{vòng}}$.",
      "Bước 3: $S = 10 \\times 100\\pi = 1000\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($1000\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["1 vòng lăn = $S_{xq} = \\pi d h$."],
    formulaTags: ["CYLINDER_LATERAL_AREA", "REAL_WORLD"]
  },
  {
    sourceNumber: "15.8",
    sourcePage: 24,
    topic: "CYLINDER",
    subtopic: "CYLINDER_AREA",
    archetypeId: "CYLINDER_LATERAL_AREA",
    difficulty: "LEVEL_2",
    question: "Nếu gấp đôi đường kính đáy và giữ nguyên chiều cao của một hình trụ thì diện tích xung quanh của hình trụ sẽ:",
    options: [
      { id: "A", text: "Tăng 2 lần." },
      { id: "B", text: "Tăng 4 lần." },
      { id: "C", text: "Không đổi." },
      { id: "D", text: "Tăng 8 lần." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $S_{xq} = \\pi d h$. Diện tích xung quanh tỉ lệ thuận bậc 1 với đường kính $d$.",
      "Bước 2: Khi $d' = 2d \\Rightarrow S'_{xq} = \\pi (2d) h = 2(\\pi d h) = 2S_{xq}$.",
      "Bước 3: Do đó diện tích xung quanh tăng 2 lần.",
      "Bước 4: Kết luận: Chọn đáp án A."
    ],
    importantNotes: ["$S_{xq}$ tỉ lệ bậc 1 với $d$."],
    formulaTags: ["CYLINDER_LATERAL_AREA"]
  },
  {
    sourceNumber: "15.9",
    sourcePage: 24,
    topic: "CYLINDER",
    subtopic: "CYLINDER_AREA",
    archetypeId: "CYLINDER_TOTAL_AREA",
    difficulty: "LEVEL_2",
    question: "Cho hình trụ có đường kính đáy $d = 8\\text{ cm}$ và chiều cao $h = 6\\text{ cm}$. Diện tích toàn phần $S_{tp}$ của hình trụ là:",
    options: [
      { id: "A", text: "$80\\pi\\text{ cm}^2$" },
      { id: "B", text: "$48\\pi\\text{ cm}^2$" },
      { id: "C", text: "$112\\pi\\text{ cm}^2$" },
      { id: "D", text: "$96\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính $r = 8/2 = 4\\text{ cm}, h = 6\\text{ cm}$.",
      "Bước 2: Diện tích xung quanh: $S_{xq} = 2\\pi r h = 2\\pi \\times 4 \\times 6 = 48\\pi\\text{ cm}^2$.",
      "Bước 3: Diện tích 2 đáy: $2S_{\\text{đáy}} = 2\\pi r^2 = 2\\pi \\times 4^2 = 32\\pi\\text{ cm}^2$. Diện tích toàn phần: $S_{tp} = 48\\pi + 32\\pi = 80\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($80\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{tp} = 2\\pi r h + 2\\pi r^2 = 80\\pi\\text{ cm}^2$."],
    formulaTags: ["CYLINDER_TOTAL_AREA"]
  },
  {
    sourceNumber: "15.10",
    sourcePage: 24,
    topic: "CYLINDER",
    subtopic: "CYLINDER_AREA",
    archetypeId: "CYLINDER_LATERAL_AREA",
    difficulty: "LEVEL_3",
    question: "Một hình trụ có thiết diện qua trục là một hình vuông có chu vi bằng $32\\text{ cm}$. Diện tích xung quanh của hình trụ đó là:",
    options: [
      { id: "A", text: "$64\\pi\\text{ cm}^2$" },
      { id: "B", text: "$32\\pi\\text{ cm}^2$" },
      { id: "C", text: "$128\\pi\\text{ cm}^2$" },
      { id: "D", text: "$16\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Cạnh của hình vuông thiết diện: $a = 32 / 4 = 8\\text{ cm}$.",
      "Bước 2: Thiết diện qua trục có kích thước $d$ và $h$. Do đó $d = 8\\text{ cm}$ và $h = 8\\text{ cm}$.",
      "Bước 3: Diện tích xung quanh: $S_{xq} = \\pi d h = \\pi \\times 8 \\times 8 = 64\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($64\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{xq} = 64\\pi\\text{ cm}^2$."],
    formulaTags: ["CYLINDER_LATERAL_AREA", "CYLINDER_SECTION"]
  }
];
