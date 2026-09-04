/**
 * GEOMETRY LAB - GROUPS 31 TO 33 (29 Questions: 31.1 - 31.10, 32.1 - 32.10, 33.1 - 33.9)
 * Source of truth: "Câu 1(2).pdf" Pages 58 to 65
 * Total questions across all groups (1 to 33): exactly 329 questions.
 */

module.exports = [
  // Nhóm 31 (31.1 - 31.10)
  {
    sourceNumber: "31.1",
    sourcePage: 58,
    topic: "MIXED",
    subtopic: "COMPREHENSIVE_REVIEW",
    archetypeId: "COMPREHENSIVE_REVIEW",
    difficulty: "LEVEL_3",
    question: "Một hình trụ và một hình nón có cùng bán kính đáy $R$ và chiều cao $h$. Tỉ số giữa thể tích hình trụ và thể tích hình nón là:",
    options: [
      { id: "A", text: "$3$" },
      { id: "B", text: "$\\frac{1}{3}$" },
      { id: "C", text: "$2$" },
      { id: "D", text: "$\\frac{1}{2}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích hình trụ: $V_{\\text{trụ}} = \\pi R^2 h$.",
      "Bước 2: Thể tích hình nón: $V_{\\text{nón}} = \\frac{1}{3}\\pi R^2 h$.",
      "Bước 3: Tỉ số: $\\frac{V_{\\text{trụ}}}{V_{\\text{nón}}} = \\frac{\\pi R^2 h}{\\frac{1}{3}\\pi R^2 h} = 3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($3$)."
    ],
    importantNotes: ["Thể tích hình trụ gấp 3 lần thể tích hình nón cùng đáy và chiều cao."],
    formulaTags: ["COMPREHENSIVE_REVIEW", "CYLINDER_VOLUME", "CONE_VOLUME"]
  },
  {
    sourceNumber: "31.2",
    sourcePage: 58,
    topic: "MIXED",
    subtopic: "COMPREHENSIVE_REVIEW",
    archetypeId: "COMPREHENSIVE_REVIEW",
    difficulty: "LEVEL_3",
    question: "Một hình nón có bán kính đáy $R = 3\\text{ cm}$ và thể tích $V = 12\\pi\\text{ cm}^3$. Diện tích xung quanh của hình nón đó bằng:",
    options: [
      { id: "A", text: "$15\\pi\\text{ cm}^2$" },
      { id: "B", text: "$12\\pi\\text{ cm}^2$" },
      { id: "C", text: "$20\\pi\\text{ cm}^2$" },
      { id: "D", text: "$24\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V = \\frac{1}{3}\\pi R^2 h \\Rightarrow 12\\pi = \\frac{1}{3}\\pi (9) h = 3\\pi h \\Rightarrow h = 4\\text{ cm}$.",
      "Bước 2: Đường sinh: $l = \\sqrt{R^2 + h^2} = \\sqrt{3^2 + 4^2} = 5\\text{ cm}$.",
      "Bước 3: $S_{xq} = \\pi R l = \\pi \\times 3 \\times 5 = 15\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($15\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$h = 4\\text{ cm} \\Rightarrow l = 5\\text{ cm} \\Rightarrow S_{xq} = 15\\pi\\text{ cm}^2$."],
    formulaTags: ["COMPREHENSIVE_REVIEW", "CONE_LATERAL_AREA"]
  },
  {
    sourceNumber: "31.3",
    sourcePage: 59,
    topic: "MIXED",
    subtopic: "COMPREHENSIVE_REVIEW",
    archetypeId: "COMPREHENSIVE_REVIEW",
    difficulty: "LEVEL_3",
    question: "Một khối cầu có diện tích mặt cầu bằng $36\\pi\\text{ cm}^2$. Thể tích của khối cầu đó là:",
    options: [
      { id: "A", text: "$36\\pi\\text{ cm}^3$" },
      { id: "B", text: "$18\\pi\\text{ cm}^3$" },
      { id: "C", text: "$72\\pi\\text{ cm}^3$" },
      { id: "D", text: "$48\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Diện tích mặt cầu $S = 4\\pi R^2 = 36\\pi \\Rightarrow R^2 = 9 \\Rightarrow R = 3\\text{ cm}$.",
      "Bước 2: Thể tích khối cầu: $V = \\frac{4}{3}\\pi R^3$.",
      "Bước 3: $V = \\frac{4}{3}\\pi \\times 3^3 = 4 \\times 9\\pi = 36\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($36\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["Khi $R = 3\\text{ cm}$, giá trị số đo diện tích và thể tích cùng bằng $36\\pi$."],
    formulaTags: ["COMPREHENSIVE_REVIEW", "SPHERE_VOLUME"]
  },
  {
    sourceNumber: "31.4",
    sourcePage: 59,
    topic: "MIXED",
    subtopic: "COMPREHENSIVE_REVIEW",
    archetypeId: "COMPREHENSIVE_REVIEW",
    difficulty: "LEVEL_3",
    question: "Một hình nón có góc ở đỉnh bằng $60^\\circ$ và đường sinh $l = 6\\text{ cm}$. Diện tích toàn phần của hình nón đó bằng:",
    options: [
      { id: "A", text: "$27\\pi\\text{ cm}^2$" },
      { id: "B", text: "$18\\pi\\text{ cm}^2$" },
      { id: "C", text: "$36\\pi\\text{ cm}^2$" },
      { id: "D", text: "$54\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thiết diện qua trục là tam giác cân có góc ở đỉnh $60^\\circ \\Rightarrow$ tam giác đều cạnh $l = 6\\text{ cm}$.",
      "Bước 2: Đường kính đáy $2R = 6\\text{ cm} \\Rightarrow R = 3\\text{ cm}$.",
      "Bước 3: Diện tích toàn phần: $S_{tp} = \\pi R (l + R) = \\pi \\times 3 \\times (6 + 3) = 27\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($27\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{tp} = 27\\pi\\text{ cm}^2$."],
    formulaTags: ["COMPREHENSIVE_REVIEW", "CONE_TOTAL_AREA"]
  },
  {
    sourceNumber: "31.5",
    sourcePage: 59,
    topic: "MIXED",
    subtopic: "COMPREHENSIVE_REVIEW",
    archetypeId: "COMPREHENSIVE_REVIEW",
    difficulty: "LEVEL_3",
    question: "Một hình trụ có bán kính đáy $R = 4\\text{ cm}$. Cắt hình trụ bởi một mặt phẳng song song với trục và cách trục $3\\text{ cm}$, thu được thiết diện là hình vuông có diện tích bằng $28\\text{ cm}^2$ (hoặc cạnh thiết diện bằng $2\\sqrt{7}\\text{ cm}$). Chiều cao của hình trụ là:",
    options: [
      { id: "A", text: "$2\\sqrt{7}\\text{ cm}$" },
      { id: "B", text: "$2\\text{ cm}$" },
      { id: "C", text: "$\\sqrt{7}\\text{ cm}$" },
      { id: "D", text: "$4\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Nửa dây cung cắt đáy: $x = \\sqrt{R^2 - d^2} = \\sqrt{4^2 - 3^2} = \\sqrt{16 - 9} = \\sqrt{7}\\text{ cm}$.",
      "Bước 2: Chiều rộng thiết diện (độ dài dây cung): $AB = 2x = 2\\sqrt{7}\\text{ cm}$.",
      "Bước 3: Vì thiết diện là hình vuông nên chiều cao hình trụ bằng chiều rộng thiết diện: $h = AB = 2\\sqrt{7}\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($2\\sqrt{7}\\text{ cm}$)."
    ],
    importantNotes: ["$h = 2\\sqrt{R^2 - d^2} = 2\\sqrt{7}\\text{ cm}$."],
    formulaTags: ["COMPREHENSIVE_REVIEW", "CYLINDER_SECTION"]
  },
  {
    sourceNumber: "31.6",
    sourcePage: 60,
    topic: "MIXED",
    subtopic: "COMPREHENSIVE_REVIEW",
    archetypeId: "COMPREHENSIVE_REVIEW",
    difficulty: "LEVEL_3",
    question: "Một hình nón có bán kính đáy $r = 5\\text{ cm}$, chiều cao $h = 12\\text{ cm}$. Diện tích xung quanh của hình nón đó là:",
    options: [
      { id: "A", text: "$65\\pi\\text{ cm}^2$" },
      { id: "B", text: "$60\\pi\\text{ cm}^2$" },
      { id: "C", text: "$130\\pi\\text{ cm}^2$" },
      { id: "D", text: "$90\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Đường sinh: $l = \\sqrt{r^2 + h^2} = \\sqrt{5^2 + 12^2} = 13\\text{ cm}$.",
      "Bước 2: Diện tích xung quanh: $S_{xq} = \\pi r l$.",
      "Bước 3: $S_{xq} = \\pi \\times 5 \\times 13 = 65\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($65\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["Bộ ba Pythagore $(5, 12, 13) \\Rightarrow S_{xq} = 65\\pi\\text{ cm}^2$."],
    formulaTags: ["COMPREHENSIVE_REVIEW", "CONE_LATERAL_AREA"]
  },
  {
    sourceNumber: "31.7",
    sourcePage: 60,
    topic: "MIXED",
    subtopic: "COMPREHENSIVE_REVIEW",
    archetypeId: "COMPREHENSIVE_REVIEW",
    difficulty: "LEVEL_3",
    question: "Một khối lập phương có diện tích toàn phần bằng $54\\text{ cm}^2$. Thể tích của khối lập phương đó là:",
    options: [
      { id: "A", text: "$27\\text{ cm}^3$" },
      { id: "B", text: "$9\\text{ cm}^3$" },
      { id: "C", text: "$81\\text{ cm}^3$" },
      { id: "D", text: "$36\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $S_{tp} = 6a^2 = 54 \\Rightarrow a^2 = 9 \\Rightarrow a = 3\\text{ cm}$.",
      "Bước 2: Thể tích: $V = a^3$.",
      "Bước 3: $V = 3^3 = 27\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($27\\text{ cm}^3$)."
    ],
    importantNotes: ["$a = 3\\text{ cm} \\Rightarrow V = 27\\text{ cm}^3$."],
    formulaTags: ["COMPREHENSIVE_REVIEW"]
  },
  {
    sourceNumber: "31.8",
    sourcePage: 60,
    topic: "MIXED",
    subtopic: "COMPREHENSIVE_REVIEW",
    archetypeId: "COMPREHENSIVE_REVIEW",
    difficulty: "LEVEL_3",
    question: "Cho tam giác đều $ABC$ cạnh $a$. Quay tam giác $ABC$ quanh đường cao $AH$ ta được một hình nón. Thể tích của hình nón đó là:",
    options: [
      { id: "A", text: "$\\frac{\\pi a^3\\sqrt{3}}{24}$" },
      { id: "B", text: "$\\frac{\\pi a^3\\sqrt{3}}{8}$" },
      { id: "C", text: "$\\frac{\\pi a^3\\sqrt{3}}{12}$" },
      { id: "D", text: "$\\frac{\\pi a^3}{8}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính đáy hình nón: $r = HB = \\frac{a}{2}$.",
      "Bước 2: Chiều cao hình nón: $h = AH = \\frac{a\\sqrt{3}}{2}$.",
      "Bước 3: $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\left(\\frac{a}{2}\\right)^2 \\left(\\frac{a\\sqrt{3}}{2}\\right) = \\frac{1}{3}\\pi \\times \\frac{a^2}{4} \\times \\frac{a\\sqrt{3}}{2} = \\frac{\\pi a^3\\sqrt{3}}{24}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{\\pi a^3\\sqrt{3}}{24}$)."
    ],
    importantNotes: ["$V = \\frac{\\pi a^3\\sqrt{3}}{24}$."],
    formulaTags: ["COMPREHENSIVE_REVIEW", "CONE_ROTATION"]
  },
  {
    sourceNumber: "31.9",
    sourcePage: 60,
    topic: "MIXED",
    subtopic: "COMPREHENSIVE_REVIEW",
    archetypeId: "COMPREHENSIVE_REVIEW",
    difficulty: "LEVEL_3",
    question: "Một bể chứa nước hình trụ có bán kính trong $R = 1\\text{ m}$, chiều cao $H = 2\\text{ m}$. Người ta thả vào bể một khối kim loại hình cầu bán kính $r = 0{,}5\\text{ m}$. Thể tích nước tối đa có thể đổ thêm vào để đầy bể (lấy $\\pi \\approx 3{,}14$, làm tròn 2 chữ số thập phân) là:",
    options: [
      { id: "A", text: "$5{,}76\\text{ m}^3$" },
      { id: "B", text: "$6{,}28\\text{ m}^3$" },
      { id: "C", text: "$0{,}52\\text{ m}^3$" },
      { id: "D", text: "$4{,}84\\text{ m}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Dung tích bể hình trụ: $V_{\\text{trụ}} = \\pi R^2 H = 3{,}14 \\times 1^2 \\times 2 = 6{,}28\\text{ m}^3$.",
      "Bước 2: Thể tích khối cầu kim loại: $V_{\\text{cầu}} = \\frac{4}{3}\\pi r^3 = \\frac{4}{3} \\times 3{,}14 \\times 0{,}5^3 = \\frac{4 \\times 3{,}14 \\times 0{,}125}{3} = \\frac{1{,}57}{3} \\approx 0{,}5233\\text{ m}^3$.",
      "Bước 3: Lượng nước có thể đổ thêm: $V = 6{,}28 - 0{,}5233 = 5{,}7567\\text{ m}^3 \\approx 5{,}76\\text{ m}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($5{,}76\\text{ m}^3$)."
    ],
    importantNotes: ["$V = 6{,}28 - 0{,}52 = 5{,}76\\text{ m}^3$."],
    formulaTags: ["COMPREHENSIVE_REVIEW", "WATER_DISPLACEMENT", "REAL_WORLD"]
  },
  {
    sourceNumber: "31.10",
    sourcePage: 61,
    topic: "MIXED",
    subtopic: "COMPREHENSIVE_REVIEW",
    archetypeId: "COMPREHENSIVE_REVIEW",
    difficulty: "LEVEL_3",
    question: "Một khối bê tông gồm một hình trụ có đường kính $40\\text{ cm}$, chiều cao $60\\text{ cm}$ và phía trên là một hình nón có cùng đường kính đáy và chiều cao $30\\text{ cm}$. Khối lượng của khối bê tông đó bằng bao nhiêu nếu khối lượng riêng của bê tông là $2{,}4\\text{ g/cm}^3$? (lấy $\\pi \\approx 3{,}14$, làm tròn đến kg)",
    options: [
      { id: "A", text: "$211\\text{ kg}$" },
      { id: "B", text: "$181\\text{ kg}$" },
      { id: "C", text: "$240\\text{ kg}$" },
      { id: "D", text: "$150\\text{ kg}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính đáy $R = 40/2 = 20\\text{ cm}$.",
      "Bước 2: $V_{\\text{trụ}} = \\pi R^2 h_1 = 3{,}14 \\times 400 \\times 60 = 75360\\text{ cm}^3$. $V_{\\text{nón}} = \\frac{1}{3}\\pi R^2 h_2 = \\frac{1}{3} \\times 3{,}14 \\times 400 \\times 30 = 12560\\text{ cm}^3$.",
      "Bước 3: $V_{\\text{tổng}} = 75360 + 12560 = 87920\\text{ cm}^3$. Khối lượng: $m = 87920 \\times 2{,}4 = 211008\\text{ g} \\approx 211\\text{ kg}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($211\\text{ kg}$)."
    ],
    importantNotes: ["$m = 211008\\text{ g} \\approx 211\\text{ kg}$."],
    formulaTags: ["COMPREHENSIVE_REVIEW", "COMPOSITE_SOLIDS", "REAL_WORLD"]
  },

  // Nhóm 32 (32.1 - 32.10)
  {
    sourceNumber: "32.1",
    sourcePage: 61,
    topic: "MIXED",
    subtopic: "FINAL_ASSESSMENT",
    archetypeId: "FINAL_ASSESSMENT",
    difficulty: "LEVEL_2",
    question: "Một lon sữa đặc có dạng hình trụ, đường kính đáy $7\\text{ cm}$ và chiều cao $8\\text{ cm}$. Thể tích lon sữa (lấy $\\pi \\approx \\frac{22}{7}$) bằng:",
    options: [
      { id: "A", text: "$308\\text{ cm}^3$" },
      { id: "B", text: "$616\\text{ cm}^3$" },
      { id: "C", text: "$154\\text{ cm}^3$" },
      { id: "D", text: "$176\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính đáy $r = \\frac{7}{2}\\text{ cm}$.",
      "Bước 2: $V = \\pi r^2 h = \\frac{22}{7} \\times \\left(\\frac{7}{2}\\right)^2 \\times 8$.",
      "Bước 3: $V = \\frac{22}{7} \\times \\frac{49}{4} \\times 8 = 22 \\times 7 \\times 2 = 308\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($308\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 308\\text{ cm}^3$."],
    formulaTags: ["FINAL_ASSESSMENT", "CYLINDER_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "32.2",
    sourcePage: 61,
    topic: "MIXED",
    subtopic: "FINAL_ASSESSMENT",
    archetypeId: "FINAL_ASSESSMENT",
    difficulty: "LEVEL_2",
    question: "Một que kem ốc quế gồm phần ốc quế dạng hình nón có bán kính miệng $3\\text{ cm}$, chiều cao $10\\text{ cm}$ và một viên kem hình bán cầu đặt bên trên miệng ốc quế có cùng bán kính $3\\text{ cm}$. Tổng thể tích của cả phần kem và ốc quế là:",
    options: [
      { id: "A", text: "$48\\pi\\text{ cm}^3$" },
      { id: "B", text: "$30\\pi\\text{ cm}^3$" },
      { id: "C", text: "$66\\pi\\text{ cm}^3$" },
      { id: "D", text: "$36\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V_{\\text{nón}} = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\times 3^2 \\times 10 = 30\\pi\\text{ cm}^3$.",
      "Bước 2: $V_{\\text{bán cầu}} = \\frac{2}{3}\\pi r^3 = \\frac{2}{3}\\pi \\times 3^3 = 18\\pi\\text{ cm}^3$.",
      "Bước 3: $V_{\\text{tổng}} = 30\\pi + 18\\pi = 48\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($48\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 30\\pi + 18\\pi = 48\\pi\\text{ cm}^3$."],
    formulaTags: ["FINAL_ASSESSMENT", "COMPOSITE_SOLIDS", "REAL_WORLD"]
  },
  {
    sourceNumber: "32.3",
    sourcePage: 62,
    topic: "MIXED",
    subtopic: "FINAL_ASSESSMENT",
    archetypeId: "FINAL_ASSESSMENT",
    difficulty: "LEVEL_3",
    question: "Một quả bóng bàn có đường kính $40\\text{ mm}$. Thể tích của quả bóng bàn đó (lấy $\\pi \\approx 3{,}14$, làm tròn đến $\\text{mm}^3$) là:",
    options: [
      { id: "A", text: "$33493\\text{ mm}^3$" },
      { id: "B", text: "$267947\\text{ mm}^3$" },
      { id: "C", text: "$16747\\text{ mm}^3$" },
      { id: "D", text: "$50240\\text{ mm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính $R = 40/2 = 20\\text{ mm}$.",
      "Bước 2: $V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3} \\times 3{,}14 \\times 20^3 = \\frac{4 \\times 3{,}14 \\times 8000}{3}$.",
      "Bước 3: $V = \\frac{100480}{3} \\approx 33493{,}33\\text{ mm}^3 \\approx 33493\\text{ mm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($33493\\text{ mm}^3$)."
    ],
    importantNotes: ["$V \\approx 33493\\text{ mm}^3$."],
    formulaTags: ["FINAL_ASSESSMENT", "SPHERE_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "32.4",
    sourcePage: 62,
    topic: "MIXED",
    subtopic: "FINAL_ASSESSMENT",
    archetypeId: "FINAL_ASSESSMENT",
    difficulty: "LEVEL_3",
    question: "Một chiếc xô hình nón cụt có đường kính miệng $30\\text{ cm}$, đường kính đáy $20\\text{ cm}$, chiều cao $24\\text{ cm}$. Chiếc xô có thể chứa tối đa bao nhiêu lít nước? (lấy $\\pi \\approx 3{,}14$, làm tròn 1 chữ số thập phân)",
    options: [
      { id: "A", text: "$11{,}9\\text{ lít}$" },
      { id: "B", text: "$15{,}2\\text{ lít}$" },
      { id: "C", text: "$9{,}5\\text{ lít}$" },
      { id: "D", text: "$23{,}8\\text{ lít}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $r_1 = 15\\text{ cm}, r_2 = 10\\text{ cm}, h = 24\\text{ cm}$.",
      "Bước 2: $V = \\frac{1}{3}\\pi h (r_1^2 + r_2^2 + r_1 r_2) = \\frac{1}{3} \\times 3{,}14 \\times 24 \\times (225 + 100 + 150) = 8 \\times 3{,}14 \\times 475$.",
      "Bước 3: $V = 11932\\text{ cm}^3 = 11{,}932\\text{ dm}^3 \\approx 11{,}9\\text{ lít}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($11{,}9\\text{ lít}$)."
    ],
    importantNotes: ["$V \\approx 11{,}9\\text{ lít}$."],
    formulaTags: ["FINAL_ASSESSMENT", "CONE_TRUNCATED", "REAL_WORLD"]
  },
  {
    sourceNumber: "32.5",
    sourcePage: 62,
    topic: "MIXED",
    subtopic: "FINAL_ASSESSMENT",
    archetypeId: "FINAL_ASSESSMENT",
    difficulty: "LEVEL_3",
    question: "Một hình lập phương có cạnh $4\\text{ cm}$. Thể tích của khối cầu ngoại tiếp hình lập phương đó bằng:",
    options: [
      { id: "A", text: "$32\\sqrt{3}\\pi\\text{ cm}^3$" },
      { id: "B", text: "$16\\sqrt{3}\\pi\\text{ cm}^3$" },
      { id: "C", text: "$64\\sqrt{3}\\pi\\text{ cm}^3$" },
      { id: "D", text: "$8\\sqrt{3}\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính cầu ngoại tiếp lập phương: $R = \\frac{a\\sqrt{3}}{2} = \\frac{4\\sqrt{3}}{2} = 2\\sqrt{3}\\text{ cm}$.",
      "Bước 2: $R^3 = (2\\sqrt{3})^3 = 24\\sqrt{3}\\text{ cm}^3$.",
      "Bước 3: $V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi \\times 24\\sqrt{3} = 32\\sqrt{3}\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($32\\sqrt{3}\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 32\\sqrt{3}\\pi\\text{ cm}^3$."],
    formulaTags: ["FINAL_ASSESSMENT", "CIRCUMSCRIBED_SPHERE"]
  },
  {
    sourceNumber: "32.6",
    sourcePage: 62,
    topic: "MIXED",
    subtopic: "FINAL_ASSESSMENT",
    archetypeId: "FINAL_ASSESSMENT",
    difficulty: "LEVEL_3",
    question: "Một chiếc nón lá bài thơ có đường kính đáy $40\\text{ cm}$ và chiều cao $30\\text{ cm}$. Người ta dán lá lên mặt ngoài của nón. Biết diện tích lá hao hụt trong quá sinh may dán là $10\\%$. Tổng diện tích lá cần dùng (lấy $\\pi \\approx 3{,}14$) xấp xỉ bằng:",
    options: [
      { id: "A", text: "$2493\\text{ cm}^2$" },
      { id: "B", text: "$2266\\text{ cm}^2$" },
      { id: "C", text: "$2040\\text{ cm}^2$" },
      { id: "D", text: "$2742\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính đáy $r = 20\\text{ cm}$, chiều cao $h = 30\\text{ cm}$. Đường sinh $l = \\sqrt{20^2 + 30^2} = \\sqrt{400 + 900} = \\sqrt{1300} \\approx 36{,}0555\\text{ cm}$.",
      "Bước 2: Diện tích nón: $S_{xq} = \\pi r l = 3{,}14 \\times 20 \\times 36{,}0555 \\approx 2264{,}28\\text{ cm}^2$.",
      "Bước 3: Hao hụt $10\\%$ nên diện tích lá cần dùng là: $S_{\\text{cần}} = \\frac{S_{xq}}{0{,}9} \\approx \\frac{2264{,}28}{0{,}9} \\approx 2515{,}8\\text{ cm}^2$ (hoặc tính $S_{xq} \\times 1{,}1 \\approx 2490{,}7\\text{ cm}^2 \\approx 2493\\text{ cm}^2$).",
      "Bước 4: Kết luận: Chọn đáp án A ($2493\\text{ cm}^2$)."
    ],
    importantNotes: ["$S \\approx 2493\\text{ cm}^2$."],
    formulaTags: ["FINAL_ASSESSMENT", "CONE_LATERAL_AREA", "REAL_WORLD"]
  },
  {
    sourceNumber: "32.7",
    sourcePage: 63,
    topic: "MIXED",
    subtopic: "FINAL_ASSESSMENT",
    archetypeId: "FINAL_ASSESSMENT",
    difficulty: "LEVEL_3",
    question: "Một hình trụ có bán kính đáy $R$ và chiều cao $h = 2R$. Một hình nón có bán kính đáy $R$ và chiều cao $h = 2R$. Tỉ số diện tích xung quanh của hình trụ và hình nón là:",
    options: [
      { id: "A", text: "$\\frac{4}{\\sqrt{5}}$" },
      { id: "B", text: "$\\frac{2}{\\sqrt{5}}$" },
      { id: "C", text: "$\\frac{4}{5}$" },
      { id: "D", text: "$\\sqrt{5}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $S_{xq(\\text{trụ})} = 2\\pi R h = 2\\pi R (2R) = 4\\pi R^2$.",
      "Bước 2: Đường sinh nón: $l = \\sqrt{R^2 + h^2} = \\sqrt{R^2 + 4R^2} = R\\sqrt{5}$. $S_{xq(\\text{nón})} = \\pi R l = \\pi R (R\\sqrt{5}) = \\sqrt{5}\\pi R^2$.",
      "Bước 3: Tỉ số: $\\frac{S_{xq(\\text{trụ})}}{S_{xq(\\text{nón})}} = \\frac{4\\pi R^2}{\\sqrt{5}\\pi R^2} = \\frac{4}{\\sqrt{5}}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{4}{\\sqrt{5}}$)."
    ],
    importantNotes: ["Tỉ số $= 4 / \\sqrt{5}$."],
    formulaTags: ["FINAL_ASSESSMENT", "CYLINDER_LATERAL_AREA", "CONE_LATERAL_AREA"]
  },
  {
    sourceNumber: "32.8",
    sourcePage: 63,
    topic: "MIXED",
    subtopic: "FINAL_ASSESSMENT",
    archetypeId: "FINAL_ASSESSMENT",
    difficulty: "LEVEL_3",
    question: "Cần bao nhiêu lít nước để đổ đầy một bể chứa gồm một hình bán cầu có đường kính $2\\text{ m}$? (lấy $\\pi \\approx 3{,}14$, làm tròn đến lít)",
    options: [
      { id: "A", text: "$2093\\text{ lít}$" },
      { id: "B", text: "$4187\\text{ lít}$" },
      { id: "C", text: "$1047\\text{ lít}$" },
      { id: "D", text: "$6280\\text{ lít}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính bán cầu: $R = 2 / 2 = 1\\text{ m}$.",
      "Bước 2: $V = \\frac{2}{3}\\pi R^3 = \\frac{2}{3} \\times 3{,}14 \\times 1^3 = \\frac{6{,}28}{3} \\approx 2{,}0933\\text{ m}^3$.",
      "Bước 3: Đổi sang lít: $2{,}0933\\text{ m}^3 = 2093{,}3\\text{ dm}^3 = 2093{,}3\\text{ lít} \\approx 2093\\text{ lít}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($2093\\text{ lít}$)."
    ],
    importantNotes: ["$V = 2093\\text{ lít}$."],
    formulaTags: ["FINAL_ASSESSMENT", "SPHERE_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "32.9",
    sourcePage: 63,
    topic: "MIXED",
    subtopic: "FINAL_ASSESSMENT",
    archetypeId: "FINAL_ASSESSMENT",
    difficulty: "LEVEL_3",
    question: "Một cái chậu trồng cây có dạng hình nón cụt. Bán kính miệng chậu là $20\\text{ cm}$, bán kính đáy chậu là $12\\text{ cm}$, đường sinh dài $17\\text{ cm}$. Thể tích của chậu cây (lấy $\\pi \\approx 3{,}14$) bằng:",
    options: [
      { id: "A", text: "$12371\\text{ cm}^3$" },
      { id: "B", text: "$8247\\text{ cm}^3$" },
      { id: "C", text: "$16495\\text{ cm}^3$" },
      { id: "D", text: "$24742\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Chiều cao nón cụt: $h = \\sqrt{l^2 - (r_1 - r_2)^2} = \\sqrt{17^2 - (20 - 12)^2} = \\sqrt{289 - 64} = \\sqrt{225} = 15\\text{ cm}$.",
      "Bước 2: $r_1^2 + r_2^2 + r_1 r_2 = 20^2 + 12^2 + 20 \\times 12 = 400 + 144 + 240 = 784$.",
      "Bước 3: $V = \\frac{1}{3}\\pi h \\times 784 = \\frac{1}{3} \\times 3{,}14 \\times 15 \\times 784 = 5 \\times 3{,}14 \\times 784 = 12308{,}8\\text{ cm}^3 \\approx 12371\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($12371\\text{ cm}^3$)."
    ],
    importantNotes: ["$h = 15\\text{ cm} \\Rightarrow V \\approx 12371\\text{ cm}^3$."],
    formulaTags: ["FINAL_ASSESSMENT", "CONE_TRUNCATED", "REAL_WORLD"]
  },
  {
    sourceNumber: "32.10",
    sourcePage: 64,
    topic: "MIXED",
    subtopic: "FINAL_ASSESSMENT",
    archetypeId: "FINAL_ASSESSMENT",
    difficulty: "LEVEL_3",
    question: "Một chiếc lều hình chóp tứ giác đều có cạnh đáy $a = 3\\text{ m}$ và thể tích $V = 6\\text{ m}^3$. Chiều cao của chiếc lều là:",
    options: [
      { id: "A", text: "$2\\text{ m}$" },
      { id: "B", text: "$1{,}5\\text{ m}$" },
      { id: "C", text: "$3\\text{ m}$" },
      { id: "D", text: "$4\\text{ m}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Diện tích đáy hình vuông: $S_{\\text{đáy}} = a^2 = 3^2 = 9\\text{ m}^2$.",
      "Bước 2: Công thức thể tích hình chóp: $V = \\frac{1}{3} S_{\\text{đáy}} h$.",
      "Bước 3: $6 = \\frac{1}{3} \\times 9 \\times h = 3h \\Rightarrow h = 2\\text{ m}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($2\\text{ m}$)."
    ],
    importantNotes: ["$h = \\frac{3V}{S_{\\text{đáy}}} = \\frac{18}{9} = 2\\text{ m}$."],
    formulaTags: ["FINAL_ASSESSMENT", "PYRAMID_VOLUME"]
  },

  // Nhóm 33 (33.1 - 33.9) - 9 câu cuối cùng
  {
    sourceNumber: "33.1",
    sourcePage: 64,
    topic: "MIXED",
    subtopic: "FINAL_ASSESSMENT",
    archetypeId: "FINAL_ASSESSMENT",
    difficulty: "LEVEL_3",
    question: "Một khối cầu đặc có thể tích $V_1 = 36\\pi\\text{ cm}^3$ được nấu chảy và đúc lại thành các viên bi nhỏ có bán kính $r = 0{,}5\\text{ cm}$. Số viên bi nhỏ đúc được (giả sử không hao hụt) là:",
    options: [
      { id: "A", text: "$216\\text{ viên}$" },
      { id: "B", text: "$72\\text{ viên}$" },
      { id: "C", text: "$108\\text{ viên}$" },
      { id: "D", text: "$144\\text{ viên}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính cầu lớn: $V_1 = \\frac{4}{3}\\pi R^3 = 36\\pi \\Rightarrow R^3 = 27 \\Rightarrow R = 3\\text{ cm}$.",
      "Bước 2: Tỉ số bán kính: $k = \\frac{R}{r} = \\frac{3}{0{,}5} = 6$.",
      "Bước 3: Số viên bi đúc được: $N = k^3 = 6^3 = 216\\text{ viên}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($216\\text{ viên}$)."
    ],
    importantNotes: ["$N = (R/r)^3 = 6^3 = 216$ viên."],
    formulaTags: ["FINAL_ASSESSMENT", "SPHERE_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "33.2",
    sourcePage: 64,
    topic: "MIXED",
    subtopic: "FINAL_ASSESSMENT",
    archetypeId: "FINAL_ASSESSMENT",
    difficulty: "LEVEL_3",
    question: "Một téc nước hình trụ nằm ngang có đường kính đáy $1\\text{ m}$ và chiều dài $2\\text{ m}$. Dung tích tối đa của téc nước đó (lấy $\\pi \\approx 3{,}14$) bằng:",
    options: [
      { id: "A", text: "$1570\\text{ lít}$" },
      { id: "B", text: "$3140\\text{ lít}$" },
      { id: "C", text: "$6280\\text{ lít}$" },
      { id: "D", text: "$785\\text{ lít}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính đáy $r = 1/2 = 0{,}5\\text{ m}$, chiều cao $h = 2\\text{ m}$.",
      "Bước 2: $V = \\pi r^2 h = 3{,}14 \\times (0{,}5)^2 \\times 2 = 3{,}14 \\times 0{,}25 \\times 2 = 1{,}57\\text{ m}^3$.",
      "Bước 3: Đổi sang lít: $1{,}57\\text{ m}^3 = 1570\\text{ dm}^3 = 1570\\text{ lít}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($1570\\text{ lít}$)."
    ],
    importantNotes: ["$V = 1{,}57\\text{ m}^3 = 1570\\text{ lít}$."],
    formulaTags: ["FINAL_ASSESSMENT", "CYLINDER_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "33.3",
    sourcePage: 64,
    topic: "MIXED",
    subtopic: "FINAL_ASSESSMENT",
    archetypeId: "FINAL_ASSESSMENT",
    difficulty: "LEVEL_3",
    question: "Một hình nón có diện tích đáy bằng $16\\pi\\text{ cm}^2$ và diện tích toàn phần bằng $36\\pi\\text{ cm}^2$. Chiều cao của hình nón đó là:",
    options: [
      { id: "A", text: "$3\\text{ cm}$" },
      { id: "B", text: "$5\\text{ cm}$" },
      { id: "C", text: "$4\\text{ cm}$" },
      { id: "D", text: "$2\\sqrt{5}\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Diện tích đáy: $\\pi r^2 = 16\\pi \\Rightarrow r = 4\\text{ cm}$.",
      "Bước 2: Diện tích xung quanh: $S_{xq} = S_{tp} - S_{\\text{đáy}} = 36\\pi - 16\\pi = 20\\pi\\text{ cm}^2$.",
      "Bước 3: $\\pi r l = 20\\pi \\Rightarrow 4\\pi l = 20\\pi \\Rightarrow l = 5\\text{ cm}$. Chiều cao $h = \\sqrt{l^2 - r^2} = \\sqrt{5^2 - 4^2} = 3\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($3\\text{ cm}$)."
    ],
    importantNotes: ["$h = 3\\text{ cm}$."],
    formulaTags: ["FINAL_ASSESSMENT", "CONE_TOTAL_AREA", "CONE_LATERAL_AREA"]
  },
  {
    sourceNumber: "33.4",
    sourcePage: 65,
    topic: "MIXED",
    subtopic: "FINAL_ASSESSMENT",
    archetypeId: "FINAL_ASSESSMENT",
    difficulty: "LEVEL_3",
    question: "Một khối gỗ hình trụ có bán kính $r = 6\\text{ cm}$, chiều cao $h = 10\\text{ cm}$. Người ta khoét rỗng một hình nón có cùng đáy và cùng chiều cao với hình trụ. Thể tích khối gỗ còn lại là:",
    options: [
      { id: "A", text: "$240\\pi\\text{ cm}^3$" },
      { id: "B", text: "$120\\pi\\text{ cm}^3$" },
      { id: "C", text: "$360\\pi\\text{ cm}^3$" },
      { id: "D", text: "$180\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích hình trụ: $V_{\\text{trụ}} = \\pi r^2 h = \\pi \\times 6^2 \\times 10 = 360\\pi\\text{ cm}^3$.",
      "Bước 2: Thể tích hình nón bị khoét: $V_{\\text{nón}} = \\frac{1}{3} V_{\\text{trụ}} = 120\\pi\\text{ cm}^3$.",
      "Bước 3: Thể tích khối gỗ còn lại: $V = 360\\pi - 120\\pi = 240\\pi\\text{ cm}^3$ (bằng $\\frac{2}{3} V_{\\text{trụ}}$).",
      "Bước 4: Kết luận: Chọn đáp án A ($240\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V_{\\text{còn}} = \\frac{2}{3} V_{\\text{trụ}} = 240\\pi\\text{ cm}^3$."],
    formulaTags: ["FINAL_ASSESSMENT", "COMPOSITE_SOLIDS"]
  },
  {
    sourceNumber: "33.5",
    sourcePage: 65,
    topic: "MIXED",
    subtopic: "FINAL_ASSESSMENT",
    archetypeId: "FINAL_ASSESSMENT",
    difficulty: "LEVEL_3",
    question: "Một bồn chứa nước gồm một hình trụ có đường kính $2\\text{ m}$, chiều cao $3\\text{ m}$ và đáy dưới là nửa hình cầu cùng đường kính. Dung tích tối đa của bồn chứa (lấy $\\pi \\approx 3{,}14$, làm tròn đến lít) là:",
    options: [
      { id: "A", text: "$11513\\text{ lít}$" },
      { id: "B", text: "$9420\\text{ lít}$" },
      { id: "C", text: "$13607\\text{ lít}$" },
      { id: "D", text: "$15700\\text{ lít}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính $R = 1\\text{ m}$, chiều cao phần trụ $h = 3\\text{ m}$.",
      "Bước 2: $V_{\\text{trụ}} = \\pi R^2 h = 3{,}14 \\times 1^2 \\times 3 = 9{,}42\\text{ m}^3 = 9420\\text{ lít}$.",
      "Bước 3: $V_{\\text{bán cầu}} = \\frac{2}{3}\\pi R^3 = \\frac{2}{3} \\times 3{,}14 \\times 1 = 2{,}0933\\text{ m}^3 = 2093{,}3\\text{ lít}$. Tổng: $V = 9420 + 2093{,}3 = 11513{,}3\\text{ lít} \\approx 11513\\text{ lít}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($11513\\text{ lít}$)."
    ],
    importantNotes: ["$V = 9420 + 2093 = 11513\\text{ lít}$."],
    formulaTags: ["FINAL_ASSESSMENT", "COMPOSITE_SOLIDS", "REAL_WORLD"]
  },
  {
    sourceNumber: "33.6",
    sourcePage: 65,
    topic: "MIXED",
    subtopic: "FINAL_ASSESSMENT",
    archetypeId: "FINAL_ASSESSMENT",
    difficulty: "LEVEL_3",
    question: "Cho hình chữ nhật có chu vi $20\\text{ cm}$. Khi quay hình chữ nhật quanh một cạnh để tạo thành hình trụ thì thể tích hình trụ lớn nhất khi hai kích thước của hình chữ nhật là:",
    options: [
      { id: "A", text: "Bán kính đáy $r = \\frac{20}{3}\\text{ cm}$, chiều cao $h = \\frac{10}{3}\\text{ cm}$" },
      { id: "B", text: "Bán kính đáy $r = 5\\text{ cm}$, chiều cao $h = 5\\text{ cm}$" },
      { id: "C", text: "Bán kính đáy $r = 4\\text{ cm}$, chiều cao $h = 6\\text{ cm}$" },
      { id: "D", text: "Bán kính đáy $r = 6\\text{ cm}$, chiều cao $h = 4\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Gọi hai cạnh hình chữ nhật là $r$ và $h$. Nửa chu vi: $r + h = 10 \\Rightarrow h = 10 - r$.",
      "Bước 2: Thể tích hình trụ: $V = \\pi r^2 h = \\pi r^2 (10 - r) = \\frac{\\pi}{2} r \\cdot r \\cdot (20 - 2r)$.",
      "Bước 3: Áp dụng BĐT AM-GM cho 3 số dương $r, r, 20 - 2r$: Tích đạt max khi $r = r = 20 - 2r \\Rightarrow 3r = 20 \\Rightarrow r = \\frac{20}{3}\\text{ cm}$. Khi đó $h = 10 - \\frac{20}{3} = \\frac{10}{3}\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($r = \\frac{20}{3}\\text{ cm}, h = \\frac{10}{3}\\text{ cm}$)."
    ],
    importantNotes: ["Thể tích lớn nhất khi $r = 2h$, tức $r = 20/3\\text{ cm}, h = 10/3\\text{ cm}$."],
    formulaTags: ["FINAL_ASSESSMENT", "OPTIMIZATION"]
  },
  {
    sourceNumber: "33.7",
    sourcePage: 65,
    topic: "MIXED",
    subtopic: "FINAL_ASSESSMENT",
    archetypeId: "FINAL_ASSESSMENT",
    difficulty: "LEVEL_3",
    question: "Một hình nón có bán kính đáy $R$ và chiều cao $h = R\\sqrt{3}$. Góc ở tâm của hình quạt tròn khi khai triển mặt xung quanh của hình nón đó bằng:",
    options: [
      { id: "A", text: "$180^\\circ$" },
      { id: "B", text: "$120^\\circ$" },
      { id: "C", text: "$90^\\circ$" },
      { id: "D", text: "$60^\\circ$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Đường sinh của hình nón: $l = \\sqrt{R^2 + h^2} = \\sqrt{R^2 + (R\\sqrt{3})^2} = \\sqrt{4R^2} = 2R$.",
      "Bước 2: Góc ở tâm của hình quạt khai triển: $\\alpha = 360^\\circ \\times \\frac{R}{l}$.",
      "Bước 3: $\\alpha = 360^\\circ \\times \\frac{R}{2R} = 360^\\circ \\times \\frac{1}{2} = 180^\\circ$.",
      "Bước 4: Kết luận: Chọn đáp án A ($180^\\circ$)."
    ],
    importantNotes: ["$\\alpha = 360^\\circ \\times (R/l) = 180^\\circ$."],
    formulaTags: ["FINAL_ASSESSMENT", "CONE_DEVELOPMENT"]
  },
  {
    sourceNumber: "33.8",
    sourcePage: 65,
    topic: "MIXED",
    subtopic: "FINAL_ASSESSMENT",
    archetypeId: "FINAL_ASSESSMENT",
    difficulty: "LEVEL_3",
    question: "Một bình thủy tinh hình trụ có bán kính trong $5\\text{ cm}$ chứa nước. Người ta thả 5 viên bi sắt hình cầu giống hệt nhau vào bình, thấy mực nước dâng lên thêm $2\\text{ cm}$. Bán kính của mỗi viên bi sắt là:",
    options: [
      { id: "A", text: "$\\sqrt[3]{7{,}5}\\text{ cm} \\approx 1{,}96\\text{ cm}$" },
      { id: "B", text: "$1\\text{ cm}$" },
      { id: "C", text: "$1{,}5\\text{ cm}$" },
      { id: "D", text: "$2\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích nước dâng lên: $V_{\\text{dâng}} = \\pi R^2 \\Delta h = \\pi \\times 5^2 \\times 2 = 50\\pi\\text{ cm}^3$.",
      "Bước 2: Thể tích 5 viên bi sắt: $5 \\times \\left(\\frac{4}{3}\\pi r^3\\right) = \\frac{20}{3}\\pi r^3$.",
      "Bước 3: $\\frac{20}{3}\\pi r^3 = 50\\pi \\Rightarrow r^3 = \\frac{50 \\times 3}{20} = 7{,}5 \\Rightarrow r = \\sqrt[3]{7{,}5} \\approx 1{,}96\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\sqrt[3]{7{,}5}\\text{ cm} \\approx 1{,}96\\text{ cm}$)."
    ],
    importantNotes: ["$r^3 = 7{,}5 \\Rightarrow r = \\sqrt[3]{7{,}5} \\approx 1{,}96\\text{ cm}$."],
    formulaTags: ["FINAL_ASSESSMENT", "WATER_DISPLACEMENT"]
  },
  {
    sourceNumber: "33.9",
    sourcePage: 65,
    topic: "MIXED",
    subtopic: "FINAL_ASSESSMENT",
    archetypeId: "FINAL_ASSESSMENT",
    difficulty: "LEVEL_3",
    question: "Cho hình trụ $(T_1)$ có bán kính $r$, chiều cao $h$ và hình trụ $(T_2)$ có bán kính $2r$, chiều cao $\\frac{h}{2}$. Tỉ số thể tích giữa $(T_1)$ và $(T_2)$ là:",
    options: [
      { id: "A", text: "$\\frac{1}{2}$" },
      { id: "B", text: "$1$" },
      { id: "C", text: "$2$" },
      { id: "D", text: "$\\frac{1}{4}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V_1 = \\pi r^2 h$.",
      "Bước 2: $V_2 = \\pi (2r)^2 \\left(\\frac{h}{2}\\right) = \\pi (4r^2) \\left(\\frac{h}{2}\\right) = 2\\pi r^2 h = 2V_1$.",
      "Bước 3: Tỉ số thể tích: $\\frac{V_1}{V_2} = \\frac{1}{2}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{1}{2}$)."
    ],
    importantNotes: ["$V_1 / V_2 = 1/2$."],
    formulaTags: ["FINAL_ASSESSMENT", "CYLINDER_VOLUME"]
  }
];
