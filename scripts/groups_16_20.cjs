/**
 * GEOMETRY LAB - GROUPS 16 TO 20 (50 Questions)
 * Source of truth: "Câu 1(2).pdf" Pages 25 to 33
 */

module.exports = [
  // Nhóm 16 (16.1 - 16.10)
  {
    sourceNumber: "16.1",
    sourcePage: 25,
    topic: "CONE",
    subtopic: "CONE_TRIGONOMETRY",
    archetypeId: "CONE_TRIGONOMETRY",
    difficulty: "LEVEL_3",
    question: "Một hình nón có đường sinh $l = 10\\text{ cm}$ tạo với mặt phẳng đáy một góc bằng $60^\\circ$. Bán kính đáy $r$ và chiều cao $h$ của hình nón lần lượt là:",
    options: [
      { id: "A", text: "$r = 5\\text{ cm}, h = 5\\sqrt{3}\\text{ cm}$" },
      { id: "B", text: "$r = 5\\sqrt{3}\\text{ cm}, h = 5\\text{ cm}$" },
      { id: "C", text: "$r = 5\\text{ cm}, h = 5\\text{ cm}$" },
      { id: "D", text: "$r = 10\\text{ cm}, h = 5\\sqrt{3}\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Góc giữa đường sinh $SA$ và mặt đáy là góc $\\widehat{SAO} = 60^\\circ$ trong tam giác vuông $SOA$ tại $O$.",
      "Bước 2: Bán kính đáy $r = OA = l \\cdot \\cos 60^\\circ = 10 \\times \\frac{1}{2} = 5\\text{ cm}$.",
      "Bước 3: Chiều cao $h = SO = l \\cdot \\sin 60^\\circ = 10 \\times \\frac{\\sqrt{3}}{2} = 5\\sqrt{3}\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($r = 5\\text{ cm}, h = 5\\sqrt{3}\\text{ cm}$)."
    ],
    importantNotes: ["Góc với đáy $\\Rightarrow r = l\\cos\\alpha, h = l\\sin\\alpha$."],
    formulaTags: ["CONE_TRIGONOMETRY"]
  },
  {
    sourceNumber: "16.2",
    sourcePage: 25,
    topic: "CONE",
    subtopic: "CONE_TRIGONOMETRY",
    archetypeId: "CONE_TRIGONOMETRY",
    difficulty: "LEVEL_3",
    question: "Một hình nón có đường sinh $l = 8\\text{ cm}$ tạo với trục hình nón một góc bằng $30^\\circ$. Diện tích xung quanh của hình nón đó là:",
    options: [
      { id: "A", text: "$32\\pi\\text{ cm}^2$" },
      { id: "B", text: "$64\\pi\\text{ cm}^2$" },
      { id: "C", text: "$32\\sqrt{3}\\pi\\text{ cm}^2$" },
      { id: "D", text: "$16\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Góc giữa đường sinh và trục là góc ở nửa đỉnh $\\widehat{ASO} = 30^\\circ$.",
      "Bước 2: Bán kính đáy $r = l \\cdot \\sin 30^\\circ = 8 \\times \\frac{1}{2} = 4\\text{ cm}$.",
      "Bước 3: Diện tích xung quanh: $S_{xq} = \\pi r l = \\pi \\times 4 \\times 8 = 32\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($32\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["Góc với trục $\\Rightarrow r = l\\sin\\beta$."],
    formulaTags: ["CONE_TRIGONOMETRY", "CONE_LATERAL_AREA"]
  },
  {
    sourceNumber: "16.3",
    sourcePage: 25,
    topic: "CONE",
    subtopic: "CONE_TRIGONOMETRY",
    archetypeId: "CONE_TRIGONOMETRY",
    difficulty: "LEVEL_3",
    question: "Một hình nón có bán kính đáy $r = 6\\text{ cm}$ và góc ở đỉnh bằng $120^\\circ$. Chiều cao $h$ của hình nón là:",
    options: [
      { id: "A", text: "$2\\sqrt{3}\\text{ cm}$" },
      { id: "B", text: "$6\\sqrt{3}\\text{ cm}$" },
      { id: "C", text: "$3\\text{ cm}$" },
      { id: "D", text: "$3\\sqrt{3}\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Góc ở đỉnh là $120^\\circ \\Rightarrow$ góc nửa đỉnh $\\widehat{ASO} = 60^\\circ$.",
      "Bước 2: Trong tam giác vuông $SOA$, ta có $\\tan 60^\\circ = \\frac{OA}{SO} = \\frac{r}{h}$.",
      "Bước 3: $h = \\frac{r}{\\tan 60^\\circ} = \\frac{6}{\\sqrt{3}} = 2\\sqrt{3}\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($2\\sqrt{3}\\text{ cm}$)."
    ],
    importantNotes: ["$h = \\frac{r}{\\tan 60^\\circ} = 2\\sqrt{3}\\text{ cm}$."],
    formulaTags: ["CONE_TRIGONOMETRY"]
  },
  {
    sourceNumber: "16.4",
    sourcePage: 25,
    topic: "CONE",
    subtopic: "CONE_TRIGONOMETRY",
    archetypeId: "CONE_TRIGONOMETRY",
    difficulty: "LEVEL_3",
    question: "Một chiếc lều cắm trại dạng hình nón có đường sinh nghiêng với mặt đất một góc $45^\\circ$. Biết bán kính sàn lều là $2\\text{ m}$. Chiều cao của chiếc lều là:",
    options: [
      { id: "A", text: "$2\\text{ m}$" },
      { id: "B", text: "$2\\sqrt{2}\\text{ m}$" },
      { id: "C", text: "$\\sqrt{2}\\text{ m}$" },
      { id: "D", text: "$4\\text{ m}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Góc nghiêng với mặt đất bằng $45^\\circ$ nên tam giác $SOA$ vuông cân tại $O$.",
      "Bước 2: Trong tam giác vuông cân, hai cạnh góc vuông bằng nhau: $h = r$.",
      "Bước 3: Vì $r = 2\\text{ m}$ nên $h = 2\\text{ m}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($2\\text{ m}$)."
    ],
    importantNotes: ["Góc $45^\\circ \\Rightarrow h = r = 2\\text{ m}$."],
    formulaTags: ["CONE_TRIGONOMETRY", "REAL_WORLD"]
  },
  {
    sourceNumber: "16.5",
    sourcePage: 25,
    topic: "CONE",
    subtopic: "CONE_TRIGONOMETRY",
    archetypeId: "CONE_TRIGONOMETRY",
    difficulty: "LEVEL_3",
    question: "Một hình nón có chiều cao $h = 4\\sqrt{3}\\text{ cm}$ và đường sinh $l = 8\\text{ cm}$. Góc ở đỉnh của hình nón đó bằng:",
    options: [
      { id: "A", text: "$60^\\circ$" },
      { id: "B", text: "$30^\\circ$" },
      { id: "C", text: "$120^\\circ$" },
      { id: "D", text: "$90^\\circ$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính đáy $r = \\sqrt{l^2 - h^2} = \\sqrt{8^2 - (4\\sqrt{3})^2} = \\sqrt{64 - 48} = \\sqrt{16} = 4\\text{ cm}$.",
      "Bước 2: Trong tam giác $SOA$, $\\sin\\widehat{ASO} = \\frac{r}{l} = \\frac{4}{8} = \\frac{1}{2} \\Rightarrow \\widehat{ASO} = 30^\\circ$.",
      "Bước 3: Góc ở đỉnh là $2 \\times \\widehat{ASO} = 2 \\times 30^\\circ = 60^\\circ$.",
      "Bước 4: Kết luận: Chọn đáp án A ($60^\\circ$)."
    ],
    importantNotes: ["Góc ở đỉnh bằng 2 lần góc nửa đỉnh: $2 \\times 30^\\circ = 60^\\circ$."],
    formulaTags: ["CONE_TRIGONOMETRY"]
  },
  {
    sourceNumber: "16.6",
    sourcePage: 26,
    topic: "CONE",
    subtopic: "CONE_TRIGONOMETRY",
    archetypeId: "CONE_TRIGONOMETRY",
    difficulty: "LEVEL_3",
    question: "Một đống muối hình nón có góc dốc sườn (góc tạo bởi đường sinh và mặt phẳng đáy) bằng $30^\\circ$. Biết chiều cao đống muối là $1{,}2\\text{ m}$. Đường kính đáy đống muối (lấy $\\sqrt{3} \\approx 1{,}732$, làm tròn đến hàng phần trăm của mét) là:",
    options: [
      { id: "A", text: "$4{,}16\\text{ m}$" },
      { id: "B", text: "$2{,}08\\text{ m}$" },
      { id: "C", text: "$1{,}39\\text{ m}$" },
      { id: "D", text: "$2{,}77\\text{ m}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $\\tan 30^\\circ = \\frac{h}{r} \\Rightarrow r = \\frac{h}{\\tan 30^\\circ} = h\\sqrt{3}$.",
      "Bước 2: Thay $h = 1{,}2\\text{ m} \\Rightarrow r = 1{,}2\\sqrt{3}\\text{ m}$.",
      "Bước 3: Đường kính $d = 2r = 2{,}4\\sqrt{3} \\approx 2{,}4 \\times 1{,}732 = 4{,}1568\\text{ m} \\approx 4{,}16\\text{ m}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($4{,}16\\text{ m}$)."
    ],
    importantNotes: ["Đường kính $d = 2r = 4{,}16\\text{ m}$."],
    formulaTags: ["CONE_TRIGONOMETRY", "REAL_WORLD"]
  },
  {
    sourceNumber: "16.7",
    sourcePage: 26,
    topic: "CONE",
    subtopic: "CONE_TRIGONOMETRY",
    archetypeId: "CONE_TRIGONOMETRY",
    difficulty: "LEVEL_3",
    question: "Một hình nón có diện tích xung quanh gấp đôi diện tích đáy. Góc tạo bởi đường sinh và mặt phẳng đáy của hình nón bằng:",
    options: [
      { id: "A", text: "$60^\\circ$" },
      { id: "B", text: "$30^\\circ$" },
      { id: "C", text: "$45^\\circ$" },
      { id: "D", text: "$75^\\circ$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $S_{xq} = 2 S_{\\text{đáy}} \\Leftrightarrow \\pi r l = 2\\pi r^2 \\Leftrightarrow l = 2r$.",
      "Bước 2: Trong tam giác vuông $SOA$, gọi góc tạo bởi đường sinh và đáy là $\\alpha = \\widehat{SAO}$.",
      "Bước 3: $\\cos\\alpha = \\frac{r}{l} = \\frac{r}{2r} = \\frac{1}{2} \\Rightarrow \\alpha = 60^\\circ$.",
      "Bước 4: Kết luận: Chọn đáp án A ($60^\\circ$)."
    ],
    importantNotes: ["$l = 2r \\Rightarrow \\cos\\alpha = 1/2 \\Rightarrow \\alpha = 60^\\circ$."],
    formulaTags: ["CONE_TRIGONOMETRY", "CONE_LATERAL_AREA"]
  },
  {
    sourceNumber: "16.8",
    sourcePage: 26,
    topic: "CONE",
    subtopic: "CONE_TRIGONOMETRY",
    archetypeId: "CONE_TRIGONOMETRY",
    difficulty: "LEVEL_3",
    question: "Một cọc tiêu hình nón có bán kính đáy $15\\text{ cm}$, đường sinh dài $30\\text{ cm}$. Góc ở đỉnh của cọc tiêu này là:",
    options: [
      { id: "A", text: "$60^\\circ$" },
      { id: "B", text: "$90^\\circ$" },
      { id: "C", text: "$120^\\circ$" },
      { id: "D", text: "$45^\\circ$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Góc nửa đỉnh $\\beta$ thỏa mãn $\\sin\\beta = \\frac{r}{l} = \\frac{15}{30} = \\frac{1}{2}$.",
      "Bước 2: Suy ra $\\beta = 30^\\circ$.",
      "Bước 3: Góc ở đỉnh là $2\\beta = 2 \\times 30^\\circ = 60^\\circ$.",
      "Bước 4: Kết luận: Chọn đáp án A ($60^\\circ$)."
    ],
    importantNotes: ["Góc ở đỉnh là $60^\\circ$."],
    formulaTags: ["CONE_TRIGONOMETRY", "REAL_WORLD"]
  },
  {
    sourceNumber: "16.9",
    sourcePage: 26,
    topic: "CONE",
    subtopic: "CONE_TRIGONOMETRY",
    archetypeId: "CONE_TRIGONOMETRY",
    difficulty: "LEVEL_3",
    question: "Cho tam giác đều $SAB$ cạnh $a$. Khi quay tam giác $SAB$ quanh đường cao $SO$ một vòng ta được một hình nón. Thể tích của hình nón đó là:",
    options: [
      { id: "A", text: "$\\frac{\\pi a^3\\sqrt{3}}{24}$" },
      { id: "B", text: "$\\frac{\\pi a^3\\sqrt{3}}{8}$" },
      { id: "C", text: "$\\frac{\\pi a^3\\sqrt{3}}{12}$" },
      { id: "D", text: "$\\frac{\\pi a^3}{8}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính đáy $r = OA = \\frac{a}{2}$. Chiều cao $h = SO = \\frac{a\\sqrt{3}}{2}$.",
      "Bước 2: Thể tích $V = \\frac{1}{3}\\pi r^2 h$.",
      "Bước 3: $V = \\frac{1}{3}\\pi \\left(\\frac{a}{2}\\right)^2 \\left(\\frac{a\\sqrt{3}}{2}\\right) = \\frac{1}{3}\\pi \\left(\\frac{a^2}{4}\\right) \\left(\\frac{a\\sqrt{3}}{2}\\right) = \\frac{\\pi a^3\\sqrt{3}}{24}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{\\pi a^3\\sqrt{3}}{24}$)."
    ],
    importantNotes: ["$V = \\frac{\\pi a^3\\sqrt{3}}{24}$."],
    formulaTags: ["CONE_VOLUME", "CONE_ROTATION"]
  },
  {
    sourceNumber: "16.10",
    sourcePage: 26,
    topic: "CONE",
    subtopic: "CONE_TRIGONOMETRY",
    archetypeId: "CONE_TRIGONOMETRY",
    difficulty: "LEVEL_3",
    question: "Một hình nón có góc ở đỉnh bằng $90^\\circ$ và chiều cao $h = 6\\text{ cm}$. Diện tích toàn phần của hình nón đó là:",
    options: [
      { id: "A", text: "$36(1 + \\sqrt{2})\\pi\\text{ cm}^2$" },
      { id: "B", text: "$72\\pi\\text{ cm}^2$" },
      { id: "C", text: "$36\\sqrt{2}\\pi\\text{ cm}^2$" },
      { id: "D", text: "$18(1 + \\sqrt{2})\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thiết diện qua trục là tam giác vuông cân tại $S \\Rightarrow r = h = 6\\text{ cm}$.",
      "Bước 2: Đường sinh $l = \\sqrt{h^2 + r^2} = \\sqrt{6^2 + 6^2} = 6\\sqrt{2}\\text{ cm}$.",
      "Bước 3: $S_{tp} = \\pi r l + \\pi r^2 = \\pi \\times 6 \\times 6\\sqrt{2} + \\pi \\times 6^2 = 36\\sqrt{2}\\pi + 36\\pi = 36(1 + \\sqrt{2})\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($36(1 + \\sqrt{2})\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{tp} = 36(1 + \\sqrt{2})\\pi\\text{ cm}^2$."],
    formulaTags: ["CONE_TOTAL_AREA", "CONE_TRIGONOMETRY"]
  },

  // Nhóm 17 (17.1 - 17.10)
  {
    sourceNumber: "17.1",
    sourcePage: 27,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_1",
    question: "Diện tích của một mặt cầu có bán kính $R = 4\\text{ cm}$ bằng:",
    options: [
      { id: "A", text: "$64\\pi\\text{ cm}^2$" },
      { id: "B", text: "$16\\pi\\text{ cm}^2$" },
      { id: "C", text: "$32\\pi\\text{ cm}^2$" },
      { id: "D", text: "$256\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính mặt cầu $R = 4\\text{ cm}$.",
      "Bước 2: $S = 4\\pi R^2$.",
      "Bước 3: $S = 4\\pi \\times 4^2 = 4\\pi \\times 16 = 64\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($64\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S = 4\\pi R^2$."],
    formulaTags: ["SPHERE_AREA"]
  },
  {
    sourceNumber: "17.2",
    sourcePage: 27,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_1",
    question: "Một mặt cầu có đường kính $d = 10\\text{ dm}$. Diện tích của mặt cầu đó là:",
    options: [
      { id: "A", text: "$100\\pi\\text{ dm}^2$" },
      { id: "B", text: "$400\\pi\\text{ dm}^2$" },
      { id: "C", text: "$25\\pi\\text{ dm}^2$" },
      { id: "D", text: "$50\\pi\\text{ dm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $S = \\pi d^2$.",
      "Bước 2: Thay $d = 10\\text{ dm} \\Rightarrow S = \\pi \\times 10^2 = 100\\pi\\text{ dm}^2$.",
      "Bước 3: Hoặc dùng $R = 5\\text{ dm} \\Rightarrow S = 4\\pi \\times 5^2 = 100\\pi\\text{ dm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($100\\pi\\text{ dm}^2$)."
    ],
    importantNotes: ["$S = 100\\pi\\text{ dm}^2$."],
    formulaTags: ["SPHERE_AREA", "RADIUS_DIAMETER"]
  },
  {
    sourceNumber: "17.3",
    sourcePage: 27,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_2",
    question: "Một mặt cầu có diện tích $S = 144\\pi\\text{ cm}^2$. Bán kính của mặt cầu đó là:",
    options: [
      { id: "A", text: "$6\\text{ cm}$" },
      { id: "B", text: "$12\\text{ cm}$" },
      { id: "C", text: "$36\\text{ cm}$" },
      { id: "D", text: "$3\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $S = 4\\pi R^2 = 144\\pi$.",
      "Bước 2: $R^2 = \\frac{144}{4} = 36$.",
      "Bước 3: $R = 6\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($6\\text{ cm}$)."
    ],
    importantNotes: ["$R = 6\\text{ cm}$."],
    formulaTags: ["SPHERE_AREA"]
  },
  {
    sourceNumber: "17.4",
    sourcePage: 27,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_2",
    question: "Diện tích của một bán cầu (chỉ tính diện tích mặt cong bán cầu) có bán kính $R = 5\\text{ cm}$ là:",
    options: [
      { id: "A", text: "$50\\pi\\text{ cm}^2$" },
      { id: "B", text: "$100\\pi\\text{ cm}^2$" },
      { id: "C", text: "$75\\pi\\text{ cm}^2$" },
      { id: "D", text: "$25\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Mặt cong bán cầu bằng một nửa diện tích toàn bộ mặt cầu.",
      "Bước 2: $S_{\\text{cong}} = \\frac{1}{2}(4\\pi R^2) = 2\\pi R^2$.",
      "Bước 3: $S_{\\text{cong}} = 2\\pi \\times 5^2 = 50\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($50\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["Mặt cong bán cầu: $S = 2\\pi R^2$."],
    formulaTags: ["SPHERE_AREA", "HEMISPHERE"]
  },
  {
    sourceNumber: "17.5",
    sourcePage: 27,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_2",
    question: "Một quả bóng bàn hình cầu có đường kính $40\\text{ mm}$. Diện tích bề mặt của quả bóng bàn (lấy $\\pi \\approx 3{,}14$) bằng:",
    options: [
      { id: "A", text: "$5024\\text{ mm}^2$" },
      { id: "B", text: "$20096\\text{ mm}^2$" },
      { id: "C", text: "$1256\\text{ mm}^2$" },
      { id: "D", text: "$2512\\text{ mm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $d = 40\\text{ mm}$.",
      "Bước 2: $S = \\pi d^2 = 3{,}14 \\times 40^2$.",
      "Bước 3: $S = 3{,}14 \\times 1600 = 5024\\text{ mm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($5024\\text{ mm}^2$)."
    ],
    importantNotes: ["$S = 5024\\text{ mm}^2$."],
    formulaTags: ["SPHERE_AREA", "REAL_WORLD"]
  },
  {
    sourceNumber: "17.6",
    sourcePage: 28,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_2",
    question: "Nếu tăng bán kính của một mặt cầu lên 2 lần thì diện tích mặt cầu sẽ:",
    options: [
      { id: "A", text: "Tăng 4 lần." },
      { id: "B", text: "Tăng 2 lần." },
      { id: "C", text: "Tăng 8 lần." },
      { id: "D", text: "Không đổi." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $S = 4\\pi R^2$.",
      "Bước 2: Khi $R' = 2R \\Rightarrow S' = 4\\pi (2R)^2 = 4\\pi (4R^2) = 4(4\\pi R^2) = 4S$.",
      "Bước 3: Diện tích tăng 4 lần.",
      "Bước 4: Kết luận: Chọn đáp án A (Tăng 4 lần)."
    ],
    importantNotes: ["Diện tích tỉ lệ thuận với $R^2$."],
    formulaTags: ["SPHERE_AREA"]
  },
  {
    sourceNumber: "17.7",
    sourcePage: 28,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_2",
    question: "Một mặt cầu có đường tròn lớn với diện tích bằng $9\\pi\\text{ cm}^2$. Diện tích của mặt cầu đó là:",
    options: [
      { id: "A", text: "$36\\pi\\text{ cm}^2$" },
      { id: "B", text: "$18\\pi\\text{ cm}^2$" },
      { id: "C", text: "$81\\pi\\text{ cm}^2$" },
      { id: "D", text: "$27\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Diện tích đường tròn lớn $S_{\\text{tròn lớn}} = \\pi R^2 = 9\\pi \\Rightarrow R^2 = 9$.",
      "Bước 2: Diện tích mặt cầu gấp 4 lần diện tích đường tròn lớn: $S = 4\\pi R^2 = 4 \\times 9\\pi = 36\\pi\\text{ cm}^2$.",
      "Bước 3: Kiểm tra các phương án.",
      "Bước 4: Kết luận: Chọn đáp án A ($36\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["Diện tích mặt cầu bằng đúng 4 lần diện tích hình tròn lớn."],
    formulaTags: ["SPHERE_AREA", "SPHERE_SECTION"]
  },
  {
    sourceNumber: "17.8",
    sourcePage: 28,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_3",
    question: "Mô hình quả địa cầu trường học có đường kính $30\\text{ cm}$. Người ta dán một lớp decal bản đồ địa lý phủ kín mặt cầu. Diện tích decal cần dùng (lấy $\\pi \\approx 3{,}14$, bỏ qua mép dán) là:",
    options: [
      { id: "A", text: "$2826\\text{ cm}^2$" },
      { id: "B", text: "$11304\\text{ cm}^2$" },
      { id: "C", text: "$706{,}5\\text{ cm}^2$" },
      { id: "D", text: "$1413\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $d = 30\\text{ cm} \\Rightarrow R = 15\\text{ cm}$.",
      "Bước 2: $S = \\pi d^2 = 3{,}14 \\times 30^2 = 3{,}14 \\times 900 = 2826\\text{ cm}^2$.",
      "Bước 3: Hoặc $S = 4 \\times 3{,}14 \\times 15^2 = 2826\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($2826\\text{ cm}^2$)."
    ],
    importantNotes: ["$S = 2826\\text{ cm}^2$."],
    formulaTags: ["SPHERE_AREA", "REAL_WORLD"]
  },
  {
    sourceNumber: "17.9",
    sourcePage: 28,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_3",
    question: "Một khối cầu bằng kim loại có thể tích $V = 36\\pi\\text{ cm}^3$. Diện tích bề mặt của khối cầu đó bằng:",
    options: [
      { id: "A", text: "$36\\pi\\text{ cm}^2$" },
      { id: "B", text: "$18\\pi\\text{ cm}^2$" },
      { id: "C", text: "$72\\pi\\text{ cm}^2$" },
      { id: "D", text: "$144\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V = \\frac{4}{3}\\pi R^3 = 36\\pi \\Rightarrow R^3 = \\frac{36 \\times 3}{4} = 27 \\Rightarrow R = 3\\text{ cm}$.",
      "Bước 2: $S = 4\\pi R^2 = 4\\pi \\times 3^2 = 36\\pi\\text{ cm}^2$.",
      "Bước 3: Chú ý trường hợp đặc biệt $R = 3$ thì giá trị số của $V$ và $S$ bằng nhau ($36\\pi$).",
      "Bước 4: Kết luận: Chọn đáp án A ($36\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["Khi $R = 3$, $V = 36\\pi$ và $S = 36\\pi$."],
    formulaTags: ["SPHERE_VOLUME", "SPHERE_AREA"]
  },
  {
    sourceNumber: "17.10",
    sourcePage: 28,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_3",
    question: "Hai mặt cầu $(S_1)$ và $(S_2)$ có diện tích lần lượt là $S_1$ và $S_2$. Biết $S_1 = 4 S_2$. Tỉ số bán kính $R_1 / R_2$ bằng:",
    options: [
      { id: "A", text: "$2$" },
      { id: "B", text: "$4$" },
      { id: "C", text: "$\\sqrt{2}$" },
      { id: "D", text: "$16$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $\\frac{S_1}{S_2} = \\left(\\frac{R_1}{R_2}\\right)^2 = 4$.",
      "Bước 2: Khai căn hai vế: $\\frac{R_1}{R_2} = \\sqrt{4} = 2$ (do $R_1, R_2 > 0$).",
      "Bước 3: Suy ra $R_1 = 2 R_2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($2$)."
    ],
    importantNotes: ["Tỉ số bán kính bằng căn bậc hai tỉ số diện tích: $\\sqrt{4} = 2$."],
    formulaTags: ["SPHERE_AREA"]
  },

  // Nhóm 18 (18.1 - 18.10)
  {
    sourceNumber: "18.1",
    sourcePage: 29,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_1",
    question: "Một hình trụ có bán kính đáy $r = 3\\text{ cm}$ và chiều cao $h = 7\\text{ cm}$. Thể tích của hình trụ là:",
    options: [
      { id: "A", text: "$63\\pi\\text{ cm}^3$" },
      { id: "B", text: "$21\\pi\\text{ cm}^3$" },
      { id: "C", text: "$42\\pi\\text{ cm}^3$" },
      { id: "D", text: "$126\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $r = 3\\text{ cm}, h = 7\\text{ cm}$.",
      "Bước 2: $V = \\pi r^2 h$.",
      "Bước 3: $V = \\pi \\times 3^2 \\times 7 = 63\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($63\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 63\\pi\\text{ cm}^3$."],
    formulaTags: ["CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "18.2",
    sourcePage: 29,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một hình trụ có đường kính đáy $d = 8\\text{ cm}$ và chiều cao $h = 10\\text{ cm}$. Thể tích của hình trụ là:",
    options: [
      { id: "A", text: "$160\\pi\\text{ cm}^3$" },
      { id: "B", text: "$640\\pi\\text{ cm}^3$" },
      { id: "C", text: "$80\\pi\\text{ cm}^3$" },
      { id: "D", text: "$320\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $r = 8/2 = 4\\text{ cm}, h = 10\\text{ cm}$.",
      "Bước 2: $V = \\pi r^2 h = \\pi \\times 4^2 \\times 10 = 160\\pi\\text{ cm}^3$.",
      "Bước 3: Kiểm tra lại các phương án.",
      "Bước 4: Kết luận: Chọn đáp án A ($160\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$r = 4\\text{ cm} \\Rightarrow V = 160\\pi\\text{ cm}^3$."],
    formulaTags: ["CYLINDER_VOLUME", "RADIUS_DIAMETER"]
  },
  {
    sourceNumber: "18.3",
    sourcePage: 29,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một bình thủy tinh hình trụ có diện tích đáy $S_{\\text{đáy}} = 25\\pi\\text{ cm}^2$ và chiều cao $h = 14\\text{ cm}$. Thể tích của bình là:",
    options: [
      { id: "A", text: "$350\\pi\\text{ cm}^3$" },
      { id: "B", text: "$175\\pi\\text{ cm}^3$" },
      { id: "C", text: "$700\\pi\\text{ cm}^3$" },
      { id: "D", text: "$50\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Đã biết diện tích đáy $S = 25\\pi\\text{ cm}^2$ và chiều cao $h = 14\\text{ cm}$.",
      "Bước 2: $V = S_{\\text{đáy}} \\times h$.",
      "Bước 3: $V = 25\\pi \\times 14 = 350\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($350\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = S_{\\text{đáy}} \\times h = 350\\pi\\text{ cm}^3$."],
    formulaTags: ["CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "18.4",
    sourcePage: 29,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một lon nước ngọt hình trụ có chiều cao $12\\text{ cm}$ và thể tích $V = 108\\pi\\text{ cm}^3$. Bán kính đáy của lon nước ngọt là:",
    options: [
      { id: "A", text: "$3\\text{ cm}$" },
      { id: "B", text: "$9\\text{ cm}$" },
      { id: "C", text: "$6\\text{ cm}$" },
      { id: "D", text: "$4{,}5\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V = \\pi r^2 h \\Rightarrow 108\\pi = \\pi r^2 \\times 12$.",
      "Bước 2: $r^2 = 108 / 12 = 9$.",
      "Bước 3: $r = 3\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($3\\text{ cm}$)."
    ],
    importantNotes: ["$r = 3\\text{ cm}$."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "18.5",
    sourcePage: 29,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một hình trụ có chu vi đường tròn đáy bằng $8\\pi\\text{ cm}$ và chiều cao $h = 6\\text{ cm}$. Thể tích của hình trụ đó là:",
    options: [
      { id: "A", text: "$96\\pi\\text{ cm}^3$" },
      { id: "B", text: "$48\\pi\\text{ cm}^3$" },
      { id: "C", text: "$192\\pi\\text{ cm}^3$" },
      { id: "D", text: "$24\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $2\\pi r = 8\\pi \\Rightarrow r = 4\\text{ cm}$.",
      "Bước 2: $V = \\pi r^2 h = \\pi \\times 4^2 \\times 6 = \\pi \\times 16 \\times 6 = 96\\pi\\text{ cm}^3$.",
      "Bước 3: Kiểm tra các phương án.",
      "Bước 4: Kết luận: Chọn đáp án A ($96\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$r = 4\\text{ cm} \\Rightarrow V = 96\\pi\\text{ cm}^3$."],
    formulaTags: ["CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "18.6",
    sourcePage: 29,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một bồn chứa dầu hình trụ có bán kính đáy $1\\text{ m}$ và chiều dài (chiều cao nằm ngang) $4\\text{ m}$. Bồn chứa được tối đa bao nhiêu mét khối dầu?",
    options: [
      { id: "A", text: "$4\\pi\\text{ m}^3$" },
      { id: "B", text: "$8\\pi\\text{ m}^3$" },
      { id: "C", text: "$2\\pi\\text{ m}^3$" },
      { id: "D", text: "$16\\pi\\text{ m}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $r = 1\\text{ m}, h = 4\\text{ m}$.",
      "Bước 2: $V = \\pi r^2 h = \\pi \\times 1^2 \\times 4 = 4\\pi\\text{ m}^3$.",
      "Bước 3: Kiểm tra kết quả.",
      "Bước 4: Kết luận: Chọn đáp án A ($4\\pi\\text{ m}^3$)."
    ],
    importantNotes: ["$V = 4\\pi\\text{ m}^3$."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "18.7",
    sourcePage: 30,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một thùng sơn hình trụ chứa đầy sơn. Người ta dùng hết một nửa lượng sơn thì chiều cao mực sơn còn lại trong thùng là $15\\text{ cm}$. Chiều cao ban đầu của thùng sơn là:",
    options: [
      { id: "A", text: "$30\\text{ cm}$" },
      { id: "B", text: "$20\\text{ cm}$" },
      { id: "C", text: "$45\\text{ cm}$" },
      { id: "D", text: "$60\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích hình trụ tỉ lệ thuận bậc nhất với chiều cao mực chất lỏng vì tiết diện đáy không đổi ($V = S_{\\text{đáy}} h$).",
      "Bước 2: Dùng hết một nửa lượng sơn nghĩa là thể tích còn lại bằng $\\frac{1}{2}$ thể tích ban đầu.",
      "Bước 3: Chiều cao ban đầu: $h_{\\text{đầu}} = 2 \\times 15 = 30\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($30\\text{ cm}$)."
    ],
    importantNotes: ["$h = 2 \\times 15 = 30\\text{ cm}$."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "18.8",
    sourcePage: 30,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một viên bi sắt hình cầu bán kính $3\\text{ cm}$ được thả chìm hoàn toàn vào một cốc nước hình trụ có bán kính đáy $6\\text{ cm}$. Giả sử nước trong cốc không tràn ra ngoài, mực nước trong cốc dâng thêm một đoạn cao bao nhiêu?",
    options: [
      { id: "A", text: "$1\\text{ cm}$" },
      { id: "B", text: "$2\\text{ cm}$" },
      { id: "C", text: "$0{,}5\\text{ cm}$" },
      { id: "D", text: "$1{,}5\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích nước dâng lên bằng đúng thể tích của viên bi cầu thả vào: $V_{\\text{cầu}} = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi \\times 3^3 = 36\\pi\\text{ cm}^3$.",
      "Bước 2: Phần nước dâng lên có dạng hình trụ bán kính đáy $r = 6\\text{ cm}$ và chiều cao $h$: $V_{\\text{dâng}} = \\pi r^2 h = \\pi \\times 6^2 \\times h = 36\\pi h$.",
      "Bước 3: Cân bằng thể tích: $36\\pi h = 36\\pi \\Rightarrow h = 1\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($1\\text{ cm}$)."
    ],
    importantNotes: ["Thể tích nước dâng lên bằng thể tích vật chìm."],
    formulaTags: ["CYLINDER_VOLUME", "SPHERE_VOLUME", "WATER_DISPLACEMENT"]
  },
  {
    sourceNumber: "18.9",
    sourcePage: 30,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một thỏi kim loại hình trụ có bán kính đáy $2\\text{ cm}$ và chiều cao $9\\text{ cm}$. Người ta nấu chảy thỏi kim loại này rồi đúc thành một hình nón có cùng bán kính đáy $2\\text{ cm}$. Chiều cao của hình nón mới đúc là:",
    options: [
      { id: "A", text: "$27\\text{ cm}$" },
      { id: "B", text: "$9\\text{ cm}$" },
      { id: "C", text: "$3\\text{ cm}$" },
      { id: "D", text: "$18\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích thỏi kim loại hình trụ: $V_{\\text{trụ}} = \\pi r^2 h_{\\text{trụ}} = \\pi \\times 2^2 \\times 9 = 36\\pi\\text{ cm}^3$.",
      "Bước 2: Thể tích hình nón: $V_{\\text{nón}} = \\frac{1}{3}\\pi r^2 h_{\\text{nón}} = \\frac{1}{3}\\pi \\times 2^2 \\times h_{\\text{nón}} = \\frac{4}{3}\\pi h_{\\text{nón}}$.",
      "Bước 3: Vì thể tích không đổi: $\\frac{4}{3}\\pi h_{\\text{nón}} = 36\\pi \\Rightarrow h_{\\text{nón}} = \\frac{36 \\times 3}{4} = 27\\text{ cm}$. (Hoặc $h_{\\text{nón}} = 3 h_{\\text{trụ}} = 3 \\times 9 = 27\\text{ cm}$).",
      "Bước 4: Kết luận: Chọn đáp án A ($27\\text{ cm}$)."
    ],
    importantNotes: ["Cùng bán kính đáy thì chiều cao nón gấp 3 lần chiều cao trụ để cùng thể tích."],
    formulaTags: ["CYLINDER_VOLUME", "CONE_VOLUME"]
  },
  {
    sourceNumber: "18.10",
    sourcePage: 30,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một ly thủy tinh hình trụ rỗng có bán kính ngoài $4\\text{ cm}$, bán kính trong $3\\text{ cm}$ và chiều cao $10\\text{ cm}$. Thể tích phần thủy tinh làm nên thân chiếc ly (bỏ qua độ dày đáy) là:",
    options: [
      { id: "A", text: "$70\\pi\\text{ cm}^3$" },
      { id: "B", text: "$160\\pi\\text{ cm}^3$" },
      { id: "C", text: "$90\\pi\\text{ cm}^3$" },
      { id: "D", text: "$140\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Công thức thể tích hình trụ rỗng: $V = \\pi (R^2 - r^2) h$.",
      "Bước 2: Thay $R = 4\\text{ cm}, r = 3\\text{ cm}, h = 10\\text{ cm}$.",
      "Bước 3: $V = \\pi (4^2 - 3^2) \\times 10 = \\pi (16 - 9) \\times 10 = 70\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($70\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = \\pi (R^2 - r^2) h = 70\\pi\\text{ cm}^3$."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  },

  // Nhóm 19 (19.1 - 19.10)
  {
    sourceNumber: "19.1",
    sourcePage: 31,
    topic: "CYLINDER",
    subtopic: "CYLINDER_AREA",
    archetypeId: "CYLINDER_LATERAL_AREA",
    difficulty: "LEVEL_1",
    question: "Một hình trụ có bán kính đáy $r = 5\\text{ cm}$ và chiều cao $h = 8\\text{ cm}$. Diện tích xung quanh của hình trụ đó bằng:",
    options: [
      { id: "A", text: "$80\\pi\\text{ cm}^2$" },
      { id: "B", text: "$40\\pi\\text{ cm}^2$" },
      { id: "C", text: "$200\\pi\\text{ cm}^2$" },
      { id: "D", text: "$130\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $r = 5\\text{ cm}, h = 8\\text{ cm}$.",
      "Bước 2: $S_{xq} = 2\\pi r h$.",
      "Bước 3: $S_{xq} = 2\\pi \\times 5 \\times 8 = 80\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($80\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{xq} = 80\\pi\\text{ cm}^2$."],
    formulaTags: ["CYLINDER_LATERAL_AREA"]
  },
  {
    sourceNumber: "19.2",
    sourcePage: 31,
    topic: "CYLINDER",
    subtopic: "CYLINDER_AREA",
    archetypeId: "CYLINDER_TOTAL_AREA",
    difficulty: "LEVEL_2",
    question: "Một hình trụ có bán kính đáy $r = 3\\text{ cm}$ và chiều cao $h = 5\\text{ cm}$. Diện tích toàn phần của hình trụ là:",
    options: [
      { id: "A", text: "$48\\pi\\text{ cm}^2$" },
      { id: "B", text: "$30\\pi\\text{ cm}^2$" },
      { id: "C", text: "$39\\pi\\text{ cm}^2$" },
      { id: "D", text: "$54\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $S_{tp} = 2\\pi r h + 2\\pi r^2 = 2\\pi r (h + r)$.",
      "Bước 2: Thay $r = 3\\text{ cm}, h = 5\\text{ cm}$.",
      "Bước 3: $S_{tp} = 2\\pi \\times 3 \\times (5 + 3) = 6\\pi \\times 8 = 48\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($48\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{tp} = 2\\pi r(h + r) = 48\\pi\\text{ cm}^2$."],
    formulaTags: ["CYLINDER_TOTAL_AREA"]
  },
  {
    sourceNumber: "19.3",
    sourcePage: 31,
    topic: "CYLINDER",
    subtopic: "CYLINDER_AREA",
    archetypeId: "CYLINDER_LATERAL_AREA",
    difficulty: "LEVEL_2",
    question: "Một cột bê tông hình trụ có chu vi đáy là $2\\text{ m}$ và chiều cao $4\\text{ m}$. Diện tích xung quanh của cột bê tông là:",
    options: [
      { id: "A", text: "$8\\text{ m}^2$" },
      { id: "B", text: "$16\\text{ m}^2$" },
      { id: "C", text: "$4\\text{ m}^2$" },
      { id: "D", text: "$8\\pi\\text{ m}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Chu vi đáy $C = 2\\pi r = 2\\text{ m}$, chiều cao $h = 4\\text{ m}$.",
      "Bước 2: Diện tích xung quanh: $S_{xq} = C \\times h$.",
      "Bước 3: $S_{xq} = 2 \\times 4 = 8\\text{ m}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($8\\text{ m}^2$)."
    ],
    importantNotes: ["$S_{xq} = C \\times h = 8\\text{ m}^2$ (chú ý đơn vị đã gồm $\\pi$)."],
    formulaTags: ["CYLINDER_LATERAL_AREA"]
  },
  {
    sourceNumber: "19.4",
    sourcePage: 31,
    topic: "CYLINDER",
    subtopic: "CYLINDER_AREA",
    archetypeId: "CYLINDER_LATERAL_AREA",
    difficulty: "LEVEL_2",
    question: "Một hình trụ có diện tích xung quanh $S_{xq} = 100\\pi\\text{ cm}^2$ và bán kính đáy $r = 10\\text{ cm}$. Chiều cao $h$ của hình trụ bằng:",
    options: [
      { id: "A", text: "$5\\text{ cm}$" },
      { id: "B", text: "$10\\text{ cm}$" },
      { id: "C", text: "$2\\text{ cm}$" },
      { id: "D", text: "$20\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $S_{xq} = 2\\pi r h \\Rightarrow h = \\frac{S_{xq}}{2\\pi r}$.",
      "Bước 2: $h = \\frac{100\\pi}{2\\pi \\times 10} = \\frac{100}{20} = 5\\text{ cm}$.",
      "Bước 3: Kiểm tra lại: $2\\pi \\times 10 \\times 5 = 100\\pi$.",
      "Bước 4: Kết luận: Chọn đáp án A ($5\\text{ cm}$)."
    ],
    importantNotes: ["$h = 5\\text{ cm}$."],
    formulaTags: ["CYLINDER_LATERAL_AREA"]
  },
  {
    sourceNumber: "19.5",
    sourcePage: 31,
    topic: "CYLINDER",
    subtopic: "CYLINDER_AREA",
    archetypeId: "CYLINDER_TOTAL_AREA",
    difficulty: "LEVEL_2",
    question: "Một hộp sữa hình trụ không có nắp (chỉ có một đáy dưới và mặt xung quanh) có bán kính đáy $r = 4\\text{ cm}$ và chiều cao $h = 10\\text{ cm}$. Diện tích tôn làm hộp (bỏ qua mép dán) là:",
    options: [
      { id: "A", text: "$96\\pi\\text{ cm}^2$" },
      { id: "B", text: "$80\\pi\\text{ cm}^2$" },
      { id: "C", text: "$112\\pi\\text{ cm}^2$" },
      { id: "D", text: "$160\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Hộp không nắp chỉ gồm diện tích xung quanh và 1 đáy: $S = S_{xq} + S_{\\text{đáy}}$.",
      "Bước 2: $S_{xq} = 2\\pi r h = 2\\pi \\times 4 \\times 10 = 80\\pi\\text{ cm}^2$. $S_{\\text{đáy}} = \\pi r^2 = \\pi \\times 4^2 = 16\\pi\\text{ cm}^2$.",
      "Bước 3: $S = 80\\pi + 16\\pi = 96\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($96\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["Hộp không nắp chỉ cộng 1 đáy: $S = 2\\pi r h + \\pi r^2$."],
    formulaTags: ["CYLINDER_TOTAL_AREA", "REAL_WORLD"]
  },
  {
    sourceNumber: "19.6",
    sourcePage: 32,
    topic: "CYLINDER",
    subtopic: "CYLINDER_AREA",
    archetypeId: "CYLINDER_TOTAL_AREA",
    difficulty: "LEVEL_3",
    question: "Một hình trụ có chiều cao gấp 3 lần bán kính đáy ($h = 3r$) và diện tích toàn phần bằng $64\\pi\\text{ cm}^2$. Bán kính đáy $r$ của hình trụ là:",
    options: [
      { id: "A", text: "$2\\sqrt{2}\\text{ cm}$" },
      { id: "B", text: "$4\\text{ cm}$" },
      { id: "C", text: "$2\\text{ cm}$" },
      { id: "D", text: "$8\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $S_{tp} = 2\\pi r (h + r) = 2\\pi r (3r + r) = 2\\pi r (4r) = 8\\pi r^2$.",
      "Bước 2: Thiết lập phương trình: $8\\pi r^2 = 64\\pi \\Rightarrow r^2 = 8$.",
      "Bước 3: $r = \\sqrt{8} = 2\\sqrt{2}\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($2\\sqrt{2}\\text{ cm}$)."
    ],
    importantNotes: ["$r^2 = 8 \\Rightarrow r = 2\\sqrt{2}\\text{ cm}$."],
    formulaTags: ["CYLINDER_TOTAL_AREA"]
  },
  {
    sourceNumber: "19.7",
    sourcePage: 32,
    topic: "CYLINDER",
    subtopic: "CYLINDER_AREA",
    archetypeId: "CYLINDER_LATERAL_AREA",
    difficulty: "LEVEL_3",
    question: "Người ta quét sơn mặt ngoài của 10 chiếc cột bê tông hình trụ giống nhau, mỗi chiếc cột có đường kính đáy $0{,}5\\text{ m}$ và chiều cao $4\\text{ m}$. Biết tiền công sơn là $40\\,000\\text{ đồng/m}^2$. Tổng số tiền phải trả (lấy $\\pi \\approx 3{,}14$) là:",
    options: [
      { id: "A", text: "$2\\,512\\,000\\text{ đồng}$" },
      { id: "B", text: "$5\\,024\\,000\\text{ đồng}$" },
      { id: "C", text: "$1\\,256\\,000\\text{ đồng}$" },
      { id: "D", text: "$3\\,140\\,000\\text{ đồng}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Diện tích xung quanh một chiếc cột: $S_{xq} = \\pi d h = 3{,}14 \\times 0{,}5 \\times 4 = 6{,}28\\text{ m}^2$.",
      "Bước 2: Tổng diện tích xung quanh 10 chiếc cột: $S_{10} = 10 \\times 6{,}28 = 62{,}8\\text{ m}^2$.",
      "Bước 3: Tổng số tiền: $T = 62{,}8 \\times 40\\,000 = 2\\,512\\,000\\text{ đồng}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($2\\,512\\,000\\text{ đồng}$)."
    ],
    importantNotes: ["Nhớ nhân đủ 10 chiếc cột."],
    formulaTags: ["CYLINDER_LATERAL_AREA", "REAL_WORLD"]
  },
  {
    sourceNumber: "19.8",
    sourcePage: 32,
    topic: "CYLINDER",
    subtopic: "CYLINDER_AREA",
    archetypeId: "CYLINDER_TOTAL_AREA",
    difficulty: "LEVEL_2",
    question: "Một hình trụ có bán kính đáy $r$ và diện tích xung quanh bằng tổng diện tích hai đáy. Mối quan hệ giữa chiều cao $h$ và bán kính đáy $r$ là:",
    options: [
      { id: "A", text: "$h = r$" },
      { id: "B", text: "$h = 2r$" },
      { id: "C", text: "$h = \\frac{r}{2}$" },
      { id: "D", text: "$h = 4r$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $S_{xq} = 2\\pi r h$. Tổng diện tích hai đáy: $2S_{\\text{đáy}} = 2\\pi r^2$.",
      "Bước 2: Theo đề bài: $2\\pi r h = 2\\pi r^2$.",
      "Bước 3: Triệt tiêu $2\\pi r$ ở cả hai vế (vì $r > 0$) ta được $h = r$.",
      "Bước 4: Kết luận: Chọn đáp án A ($h = r$)."
    ],
    importantNotes: ["$S_{xq} = 2S_{\\text{đáy}} \\Rightarrow h = r$."],
    formulaTags: ["CYLINDER_TOTAL_AREA"]
  },
  {
    sourceNumber: "19.9",
    sourcePage: 32,
    topic: "CYLINDER",
    subtopic: "CYLINDER_AREA",
    archetypeId: "CYLINDER_LATERAL_AREA",
    difficulty: "LEVEL_2",
    question: "Một hình trụ có thể tích $V = 54\\pi\\text{ cm}^3$ và chiều cao $h = 6\\text{ cm}$. Diện tích xung quanh của hình trụ đó là:",
    options: [
      { id: "A", text: "$36\\pi\\text{ cm}^2$" },
      { id: "B", text: "$18\\pi\\text{ cm}^2$" },
      { id: "C", text: "$72\\pi\\text{ cm}^2$" },
      { id: "D", text: "$54\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V = \\pi r^2 h \\Rightarrow 54\\pi = \\pi r^2 \\times 6 \\Rightarrow r^2 = 9 \\Rightarrow r = 3\\text{ cm}$.",
      "Bước 2: $S_{xq} = 2\\pi r h = 2\\pi \\times 3 \\times 6 = 36\\pi\\text{ cm}^2$.",
      "Bước 3: Kiểm tra các phương án.",
      "Bước 4: Kết luận: Chọn đáp án A ($36\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$r = 3\\text{ cm} \\Rightarrow S_{xq} = 36\\pi\\text{ cm}^2$."],
    formulaTags: ["CYLINDER_LATERAL_AREA", "CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "19.10",
    sourcePage: 32,
    topic: "CYLINDER",
    subtopic: "CYLINDER_AREA",
    archetypeId: "CYLINDER_TOTAL_AREA",
    difficulty: "LEVEL_3",
    question: "Một hình trụ có diện tích xung quanh bằng $40\\pi\\text{ cm}^2$ và diện tích toàn phần bằng $72\\pi\\text{ cm}^2$. Bán kính đáy $r$ và chiều cao $h$ của hình trụ lần lượt là:",
    options: [
      { id: "A", text: "$r = 4\\text{ cm}, h = 5\\text{ cm}$" },
      { id: "B", text: "$r = 5\\text{ cm}, h = 4\\text{ cm}$" },
      { id: "C", text: "$r = 4\\text{ cm}, h = 4\\text{ cm}$" },
      { id: "D", text: "$r = 2\\text{ cm}, h = 10\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Diện tích 2 đáy: $2S_{\\text{đáy}} = S_{tp} - S_{xq} = 72\\pi - 40\\pi = 32\\pi\\text{ cm}^2$.",
      "Bước 2: $2\\pi r^2 = 32\\pi \\Rightarrow r^2 = 16 \\Rightarrow r = 4\\text{ cm}$.",
      "Bước 3: Chiều cao: $h = \\frac{S_{xq}}{2\\pi r} = \\frac{40\\pi}{2\\pi \\times 4} = 5\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($r = 4\\text{ cm}, h = 5\\text{ cm}$)."
    ],
    importantNotes: ["$r = 4\\text{ cm}, h = 5\\text{ cm}$."],
    formulaTags: ["CYLINDER_TOTAL_AREA", "CYLINDER_LATERAL_AREA"]
  },

  // Nhóm 20 (20.1 - 20.10)
  {
    sourceNumber: "20.1",
    sourcePage: 33,
    topic: "CYLINDER",
    subtopic: "CYLINDER_ROTATION",
    archetypeId: "CYLINDER_ROTATION",
    difficulty: "LEVEL_2",
    question: "Cho hình vuông $ABCD$ cạnh $a$. Khi quay hình vuông $ABCD$ một vòng quanh cạnh $AB$ cố định ta được một hình trụ. Thể tích của hình trụ đó là:",
    options: [
      { id: "A", text: "$\\pi a^3$" },
      { id: "B", text: "$\\frac{1}{3}\\pi a^3$" },
      { id: "C", text: "$2\\pi a^3$" },
      { id: "D", text: "$4\\pi a^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Trục quay $AB$ nên chiều cao hình trụ $h = AB = a$. Bán kính đáy $r = AD = a$.",
      "Bước 2: Thể tích $V = \\pi r^2 h$.",
      "Bước 3: $V = \\pi \\times a^2 \\times a = \\pi a^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\pi a^3$)."
    ],
    importantNotes: ["Quay hình vuông cạnh $a$ ta được hình trụ có $r = h = a$."],
    formulaTags: ["CYLINDER_ROTATION", "CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "20.2",
    sourcePage: 33,
    topic: "CYLINDER",
    subtopic: "CYLINDER_ROTATION",
    archetypeId: "CYLINDER_ROTATION",
    difficulty: "LEVEL_2",
    question: "Cho hình vuông $ABCD$ cạnh $4\\text{ cm}$. Quay hình vuông quanh cạnh $AB$ cố định thu được hình trụ có diện tích toàn phần là:",
    options: [
      { id: "A", text: "$64\\pi\\text{ cm}^2$" },
      { id: "B", text: "$32\\pi\\text{ cm}^2$" },
      { id: "C", text: "$48\\pi\\text{ cm}^2$" },
      { id: "D", text: "$96\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Hình trụ có bán kính $r = 4\\text{ cm}$ và chiều cao $h = 4\\text{ cm}$.",
      "Bước 2: $S_{tp} = 2\\pi r (h + r)$.",
      "Bước 3: $S_{tp} = 2\\pi \\times 4 \\times (4 + 4) = 8\\pi \\times 8 = 64\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($64\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{tp} = 64\\pi\\text{ cm}^2$."],
    formulaTags: ["CYLINDER_ROTATION", "CYLINDER_TOTAL_AREA"]
  },
  {
    sourceNumber: "20.3",
    sourcePage: 33,
    topic: "CYLINDER",
    subtopic: "CYLINDER_ROTATION",
    archetypeId: "CYLINDER_ROTATION",
    difficulty: "LEVEL_3",
    question: "Cho hình chữ nhật $ABCD$ có $AB = 4\\text{ cm}, BC = 3\\text{ cm}$. Gọi $V_1$ là thể tích hình trụ tạo thành khi quay quanh cạnh $AB$, $V_2$ là thể tích hình trụ tạo thành khi quay quanh cạnh $BC$. Tỉ số $V_1 / V_2$ là:",
    options: [
      { id: "A", text: "$\\frac{3}{4}$" },
      { id: "B", text: "$\\frac{4}{3}$" },
      { id: "C", text: "$\\frac{9}{16}$" },
      { id: "D", text: "$\\frac{16}{9}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Quay quanh $AB$: $h_1 = AB = 4\\text{ cm}, r_1 = BC = 3\\text{ cm} \\Rightarrow V_1 = \\pi r_1^2 h_1 = \\pi \\times 3^2 \\times 4 = 36\\pi\\text{ cm}^3$.",
      "Bước 2: Quay quanh $BC$: $h_2 = BC = 3\\text{ cm}, r_2 = AB = 4\\text{ cm} \\Rightarrow V_2 = \\pi r_2^2 h_2 = \\pi \\times 4^2 \\times 3 = 48\\pi\\text{ cm}^3$.",
      "Bước 3: Tỉ số: $\\frac{V_1}{V_2} = \\frac{36\\pi}{48\\pi} = \\frac{3}{4}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{3}{4}$)."
    ],
    importantNotes: ["Quay quanh cạnh dài cho thể tích nhỏ hơn quay quanh cạnh ngắn: $\\frac{V_1}{V_2} = \\frac{b}{a} = \\frac{3}{4}$."],
    formulaTags: ["CYLINDER_ROTATION", "CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "20.4",
    sourcePage: 33,
    topic: "CYLINDER",
    subtopic: "CYLINDER_ROTATION",
    archetypeId: "CYLINDER_ROTATION",
    difficulty: "LEVEL_3",
    question: "Cho hình chữ nhật $ABCD$ có $AB = 6\\text{ cm}, BC = 2\\text{ cm}$. Gọi $S_1$ là diện tích xung quanh khi quay quanh $AB$, $S_2$ là diện tích xung quanh khi quay quanh $BC$. Khẳng định nào sau đây đúng?",
    options: [
      { id: "A", text: "$S_1 = S_2 = 24\\pi\\text{ cm}^2$" },
      { id: "B", text: "$S_1 = 2 S_2$" },
      { id: "C", text: "$S_2 = 3 S_1$" },
      { id: "D", text: "$S_1 = 12\\pi\\text{ cm}^2, S_2 = 36\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Quay quanh $AB$: $S_1 = 2\\pi \\times BC \\times AB = 2\\pi \\times 2 \\times 6 = 24\\pi\\text{ cm}^2$.",
      "Bước 2: Quay quanh $BC$: $S_2 = 2\\pi \\times AB \\times BC = 2\\pi \\times 6 \\times 2 = 24\\pi\\text{ cm}^2$.",
      "Bước 3: Do tích hai cạnh không đổi ($AB \\times BC$) nên $S_1 = S_2 = 24\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($S_1 = S_2 = 24\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["Diện tích xung quanh của hai hình trụ tạo bởi việc quay quanh hai cạnh kề của hình chữ nhật luôn bằng nhau ($2\\pi a b$)."],
    formulaTags: ["CYLINDER_ROTATION", "CYLINDER_LATERAL_AREA"]
  },
  {
    sourceNumber: "20.5",
    sourcePage: 33,
    topic: "CYLINDER",
    subtopic: "CYLINDER_ROTATION",
    archetypeId: "CYLINDER_ROTATION",
    difficulty: "LEVEL_2",
    question: "Cho hình chữ nhật có chu vi bằng $20\\text{ cm}$, một cạnh bằng $6\\text{ cm}$. Quay hình chữ nhật quanh cạnh $6\\text{ cm}$ cố định ta được hình trụ có thể tích là:",
    options: [
      { id: "A", text: "$96\\pi\\text{ cm}^3$" },
      { id: "B", text: "$144\\pi\\text{ cm}^3$" },
      { id: "C", text: "$48\\pi\\text{ cm}^3$" },
      { id: "D", text: "$24\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Nửa chu vi $= 10\\text{ cm}$. Cạnh còn lại $= 10 - 6 = 4\\text{ cm}$.",
      "Bước 2: Quay quanh cạnh $6\\text{ cm}$ nên $h = 6\\text{ cm}, r = 4\\text{ cm}$.",
      "Bước 3: $V = \\pi r^2 h = \\pi \\times 4^2 \\times 6 = 96\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($96\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 96\\pi\\text{ cm}^3$."],
    formulaTags: ["CYLINDER_ROTATION", "CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "20.6",
    sourcePage: 34,
    topic: "CYLINDER",
    subtopic: "CYLINDER_ROTATION",
    archetypeId: "CYLINDER_ROTATION",
    difficulty: "LEVEL_3",
    question: "Cho hình chữ nhật có diện tích bằng $24\\text{ cm}^2$ và đường chéo bằng $2\\sqrt{13}\\text{ cm}$. Quay hình chữ nhật này quanh chiều dài cố định thu được hình trụ có thể tích bằng:",
    options: [
      { id: "A", text: "$96\\pi\\text{ cm}^3$" },
      { id: "B", text: "$144\\pi\\text{ cm}^3$" },
      { id: "C", text: "$72\\pi\\text{ cm}^3$" },
      { id: "D", text: "$48\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Gọi hai kích thước là $a > b > 0$. Ta có $ab = 24$ và $a^2 + b^2 = (2\\sqrt{13})^2 = 52$.",
      "Bước 2: $(a+b)^2 = a^2 + b^2 + 2ab = 52 + 48 = 100 \\Rightarrow a+b = 10$. Giải hệ ta được $a = 6\\text{ cm}, b = 4\\text{ cm}$.",
      "Bước 3: Quay quanh chiều dài $a = 6\\text{ cm} \\Rightarrow h = 6\\text{ cm}, r = 4\\text{ cm}$. Thể tích: $V = \\pi \\times 4^2 \\times 6 = 96\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($96\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$a = 6, b = 4 \\Rightarrow V = 96\\pi\\text{ cm}^3$."],
    formulaTags: ["CYLINDER_ROTATION", "CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "20.7",
    sourcePage: 34,
    topic: "CYLINDER",
    subtopic: "CYLINDER_ROTATION",
    archetypeId: "CYLINDER_ROTATION",
    difficulty: "LEVEL_3",
    question: "Cho hình chữ nhật $ABCD$ có $AB = 5\\text{ cm}, BC = 2\\text{ cm}$. Quay hình chữ nhật một vòng quanh trục đối xứng song song với cạnh $AB$. Thể tích hình trụ tạo thành là:",
    options: [
      { id: "A", text: "$5\\pi\\text{ cm}^3$" },
      { id: "B", text: "$20\\pi\\text{ cm}^3$" },
      { id: "C", text: "$10\\pi\\text{ cm}^3$" },
      { id: "D", text: "$2{,}5\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Trục đối xứng song song với $AB$ nằm chính giữa hai cạnh $AB$ và $CD$.",
      "Bước 2: Khoảng cách từ trục đến $AB$ và $CD$ là bán kính đáy hình trụ: $r = BC / 2 = 2 / 2 = 1\\text{ cm}$. Chiều cao hình trụ $h = AB = 5\\text{ cm}$.",
      "Bước 3: Thể tích: $V = \\pi r^2 h = \\pi \\times 1^2 \\times 5 = 5\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($5\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["Quay quanh trục đối xứng thì bán kính $r = \\text{chiều rộng} / 2$."],
    formulaTags: ["CYLINDER_ROTATION", "CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "20.8",
    sourcePage: 34,
    topic: "CYLINDER",
    subtopic: "CYLINDER_ROTATION",
    archetypeId: "CYLINDER_ROTATION",
    difficulty: "LEVEL_3",
    question: "Cho hình chữ nhật $ABCD$ có $AB = 6\\text{ cm}, BC = 4\\text{ cm}$. Quay hình chữ nhật một vòng quanh trục đối xứng song song với cạnh $BC$. Diện tích toàn phần của hình trụ tạo thành là:",
    options: [
      { id: "A", text: "$42\\pi\\text{ cm}^2$" },
      { id: "B", text: "$24\\pi\\text{ cm}^2$" },
      { id: "C", text: "$36\\pi\\text{ cm}^2$" },
      { id: "D", text: "$84\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Trục đối xứng song song với $BC$ nên chiều cao $h = BC = 4\\text{ cm}$, bán kính đáy $r = AB / 2 = 6 / 2 = 3\\text{ cm}$.",
      "Bước 2: $S_{tp} = 2\\pi r (h + r)$.",
      "Bước 3: $S_{tp} = 2\\pi \\times 3 \\times (4 + 3) = 6\\pi \\times 7 = 42\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($42\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$r = 3\\text{ cm}, h = 4\\text{ cm} \\Rightarrow S_{tp} = 42\\pi\\text{ cm}^2$."],
    formulaTags: ["CYLINDER_ROTATION", "CYLINDER_TOTAL_AREA"]
  },
  {
    sourceNumber: "20.9",
    sourcePage: 34,
    topic: "CYLINDER",
    subtopic: "CYLINDER_ROTATION",
    archetypeId: "CYLINDER_ROTATION",
    difficulty: "LEVEL_3",
    question: "Khi quay một hình chữ nhật quanh cạnh có độ dài $a$ cố định ta được hình trụ $(T_1)$, khi quay quanh cạnh có độ dài $b$ cố định ta được hình trụ $(T_2)$. Tỉ số diện tích toàn phần $S_{tp(T_1)} / S_{tp(T_2)}$ là:",
    options: [
      { id: "A", text: "$\\frac{b}{a}$" },
      { id: "B", text: "$\\frac{a}{b}$" },
      { id: "C", text: "$\\frac{b^2}{a^2}$" },
      { id: "D", text: "$1$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Quay quanh $a$: $h_1 = a, r_1 = b \\Rightarrow S_{tp(T_1)} = 2\\pi b (a + b)$.",
      "Bước 2: Quay quanh $b$: $h_2 = b, r_2 = a \\Rightarrow S_{tp(T_2)} = 2\\pi a (b + a)$.",
      "Bước 3: Tỉ số: $\\frac{S_{tp(T_1)}}{S_{tp(T_2)}} = \\frac{2\\pi b(a+b)}{2\\pi a(b+a)} = \\frac{b}{a}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{b}{a}$)."
    ],
    importantNotes: ["Tỉ số diện tích toàn phần bằng $\\frac{b}{a}$."],
    formulaTags: ["CYLINDER_ROTATION", "CYLINDER_TOTAL_AREA"]
  },
  {
    sourceNumber: "20.10",
    sourcePage: 34,
    topic: "CYLINDER",
    subtopic: "CYLINDER_ROTATION",
    archetypeId: "CYLINDER_ROTATION",
    difficulty: "LEVEL_3",
    question: "Cho hình chữ nhật có chu vi không đổi $2p$. Để khi quay hình chữ nhật quanh một cạnh cố định tạo ra hình trụ có diện tích xung quanh lớn nhất thì hình chữ nhật đó phải là:",
    options: [
      { id: "A", text: "Hình vuông có cạnh bằng $\\frac{p}{2}$." },
      { id: "B", text: "Hình chữ nhật có một cạnh gấp đôi cạnh kia." },
      { id: "C", text: "Hình chữ nhật có một cạnh gấp ba cạnh kia." },
      { id: "D", text: "Tùy ý, diện tích xung quanh luôn không đổi." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Gọi hai cạnh là $x, y > 0 \\Rightarrow x + y = p$.",
      "Bước 2: Diện tích xung quanh hình trụ: $S_{xq} = 2\\pi x y$.",
      "Bước 3: Theo BĐT AM-GM: $x y \\le \\left(\\frac{x+y}{2}\\right)^2 = \\frac{p^2}{4}$. Đẳng thức xảy ra khi $x = y = \\frac{p}{2}$ (hình vuông).",
      "Bước 4: Kết luận: Chọn đáp án A (Hình vuông có cạnh bằng $\\frac{p}{2}$)."
    ],
    importantNotes: ["Bất đẳng thức AM-GM: Tích lớn nhất khi hai cạnh bằng nhau (hình vuông)."],
    formulaTags: ["CYLINDER_ROTATION", "OPTIMIZATION"]
  }
];
