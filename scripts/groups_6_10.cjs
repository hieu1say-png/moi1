/**
 * GEOMETRY LAB - GROUPS 6 TO 10 (50 Questions)
 * Source of truth: "Câu 1(2).pdf" Pages 8 to 15
 */

module.exports = [
  // Nhóm 6 (6.1 - 6.10)
  {
    sourceNumber: "6.1",
    sourcePage: 8,
    topic: "CONE",
    subtopic: "CONE_NET",
    archetypeId: "CONE_NET",
    difficulty: "LEVEL_3",
    question: "Từ một tấm bìa hình quạt tròn có góc ở tâm bằng $180^\\circ$ (nửa hình tròn) bán kính $R = 10\\text{ cm}$, cuộn lại tạo thành mặt xung quanh của một hình nón. Bán kính đường tròn đáy $r$ của hình nón tạo thành là:",
    options: [
      { id: "A", text: "$5\\text{ cm}$" },
      { id: "B", text: "$10\\text{ cm}$" },
      { id: "C", text: "$2{,}5\\text{ cm}$" },
      { id: "D", text: "$20\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Khi cuộn nửa hình tròn bán kính $R$ thành hình nón, độ dài đường sinh của hình nón chính bằng bán kính hình quạt: $l = R = 10\\text{ cm}$.",
      "Bước 2: Độ dài cung của nửa hình tròn: $L = \\pi R = 10\\pi\\text{ cm}$. Cung này trở thành chu vi đáy của hình nón: $C = 2\\pi r$.",
      "Bước 3: Thiết lập phương trình: $2\\pi r = 10\\pi \\Rightarrow r = \\frac{10}{2} = 5\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($5\\text{ cm}$)."
    ],
    importantNotes: ["Cuộn nửa hình tròn ($180^\\circ$) luôn tạo hình nón có bán kính đáy $r = R/2$ và đường sinh $l = R$."],
    formulaTags: ["CONE_NET", "CONE_LATERAL_AREA"]
  },
  {
    sourceNumber: "6.2",
    sourcePage: 8,
    topic: "CONE",
    subtopic: "CONE_NET",
    archetypeId: "CONE_NET",
    difficulty: "LEVEL_3",
    question: "Cuộn một tấm bìa hình bán nguyệt (nửa hình tròn) bán kính $12\\text{ cm}$ thành một hình nón. Chiều cao $h$ của hình nón đó bằng:",
    options: [
      { id: "A", text: "$6\\text{ cm}$" },
      { id: "B", text: "$6\\sqrt{3}\\text{ cm}$" },
      { id: "C", text: "$12\\text{ cm}$" },
      { id: "D", text: "$3\\sqrt{3}\\text{ cm}$" }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: Bán kính quạt tròn $R = 12\\text{ cm} \\Rightarrow l = 12\\text{ cm}$.",
      "Bước 2: Bán kính đáy hình nón $r = R/2 = 12/2 = 6\\text{ cm}$.",
      "Bước 3: Chiều cao $h = \\sqrt{l^2 - r^2} = \\sqrt{12^2 - 6^2} = \\sqrt{144 - 36} = \\sqrt{108} = 6\\sqrt{3}\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án B ($6\\sqrt{3}\\text{ cm}$)."
    ],
    importantNotes: ["$h = \\sqrt{l^2 - r^2} = 6\\sqrt{3}\\text{ cm}$."],
    formulaTags: ["CONE_NET", "PYTHAGOREAN"]
  },
  {
    sourceNumber: "6.3",
    sourcePage: 8,
    topic: "CONE",
    subtopic: "CONE_NET",
    archetypeId: "CONE_NET",
    difficulty: "LEVEL_3",
    question: "Cuộn một hình quạt tròn có góc ở tâm $180^\\circ$ bán kính $8\\text{ cm}$ thành hình nón. Diện tích toàn phần của hình nón tạo thành là:",
    options: [
      { id: "A", text: "$32\\pi\\text{ cm}^2$" },
      { id: "B", text: "$48\\pi\\text{ cm}^2$" },
      { id: "C", text: "$16\\pi\\text{ cm}^2$" },
      { id: "D", text: "$64\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: Đường sinh $l = 8\\text{ cm}$, bán kính đáy $r = 8/2 = 4\\text{ cm}$.",
      "Bước 2: $S_{xq} = \\pi r l = \\pi \\times 4 \\times 8 = 32\\pi\\text{ cm}^2$.",
      "Bước 3: Diện tích đáy $S_{\\text{đáy}} = \\pi r^2 = \\pi \\times 4^2 = 16\\pi\\text{ cm}^2$. Diện tích toàn phần: $S_{tp} = 32\\pi + 16\\pi = 48\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án B ($48\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{tp} = S_{xq} + S_{\\text{đáy}} = 48\\pi\\text{ cm}^2$."],
    formulaTags: ["CONE_NET", "CONE_TOTAL_AREA"]
  },
  {
    sourceNumber: "6.4",
    sourcePage: 8,
    topic: "CONE",
    subtopic: "CONE_NET",
    archetypeId: "CONE_NET",
    difficulty: "LEVEL_3",
    question: "Từ một tấm bìa hình quạt tròn bán kính $R = 6\\text{ cm}$ có góc ở tâm $120^\\circ$, ghép thành mặt xung quanh của một hình nón. Bán kính đường tròn đáy $r$ của hình nón đó bằng:",
    options: [
      { id: "A", text: "$2\\text{ cm}$" },
      { id: "B", text: "$3\\text{ cm}$" },
      { id: "C", text: "$1\\text{ cm}$" },
      { id: "D", text: "$4\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Đường sinh của hình nón là $l = R = 6\\text{ cm}$.",
      "Bước 2: Độ dài cung hình quạt tròn góc $120^\\circ$: $L = \\frac{\\pi R n}{180} = \\frac{\\pi \\times 6 \\times 120}{180} = 4\\pi\\text{ cm}$.",
      "Bước 3: Chu vi đáy hình nón bằng độ dài cung: $2\\pi r = 4\\pi \\Rightarrow r = 2\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($2\\text{ cm}$)."
    ],
    importantNotes: ["Công thức nhanh: $r = R \\times \\frac{n^\\circ}{360^\\circ} = 6 \\times \\frac{120}{360} = 2\\text{ cm}$."],
    formulaTags: ["CONE_NET"]
  },
  {
    sourceNumber: "6.5",
    sourcePage: 8,
    topic: "CONE",
    subtopic: "CONE_NET",
    archetypeId: "CONE_NET",
    difficulty: "LEVEL_3",
    question: "Một hình nón có đường sinh $l = 15\\text{ cm}$ và bán kính đáy $r = 5\\text{ cm}$. Khi khai triển mặt xung quanh của hình nón lên một mặt phẳng ta được một hình quạt tròn có góc ở tâm bằng:",
    options: [
      { id: "A", text: "$180^\\circ$" },
      { id: "B", text: "$120^\\circ$" },
      { id: "C", text: "$90^\\circ$" },
      { id: "D", text: "$60^\\circ$" }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: Bán kính của hình quạt khai triển chính là $R = l = 15\\text{ cm}$.",
      "Bước 2: Chu vi đáy nón $C = 2\\pi r = 2\\pi \\times 5 = 10\\pi\\text{ cm}$. Độ dài cung quạt $L = \\frac{\\pi R n}{180}$.",
      "Bước 3: Ta có $\\frac{\\pi \\times 15 \\times n}{180} = 10\\pi \\Rightarrow \\frac{n}{12} = 10 \\Rightarrow n = 120^\\circ$. (Hoặc $n = \\frac{r}{l} \\times 360^\\circ = \\frac{5}{15} \\times 360^\\circ = 120^\\circ$).",
      "Bước 4: Kết luận: Chọn đáp án B ($120^\\circ$)."
    ],
    importantNotes: ["Góc ở tâm hình quạt: $n^\\circ = \\frac{r}{l} \\times 360^\\circ$."],
    formulaTags: ["CONE_NET"]
  },
  {
    sourceNumber: "6.6",
    sourcePage: 8,
    topic: "CONE",
    subtopic: "CONE_NET",
    archetypeId: "CONE_NET",
    difficulty: "LEVEL_3",
    question: "Khai triển mặt xung quanh của một hình nón có bán kính đáy $r = 3\\text{ cm}$ và chiều cao $h = 4\\text{ cm}$ ta được một hình quạt tròn có góc ở tâm bằng:",
    options: [
      { id: "A", text: "$216^\\circ$" },
      { id: "B", text: "$180^\\circ$" },
      { id: "C", text: "$240^\\circ$" },
      { id: "D", text: "$150^\\circ$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Tính đường sinh $l = \\sqrt{r^2 + h^2} = \\sqrt{3^2 + 4^2} = 5\\text{ cm}$.",
      "Bước 2: Áp dụng công thức góc ở tâm của hình quạt: $n^\\circ = \\frac{r}{l} \\times 360^\\circ$.",
      "Bước 3: $n^\\circ = \\frac{3}{5} \\times 360^\\circ = 216^\\circ$.",
      "Bước 4: Kết luận: Chọn đáp án A ($216^\\circ$)."
    ],
    importantNotes: ["$n = \\frac{3}{5} \\times 360^\\circ = 216^\\circ$."],
    formulaTags: ["CONE_NET", "PYTHAGOREAN"]
  },
  {
    sourceNumber: "6.7",
    sourcePage: 9,
    topic: "CONE",
    subtopic: "CONE_NET",
    archetypeId: "CONE_NET",
    difficulty: "LEVEL_3",
    question: "Cuộn một tấm bìa hình quạt tròn có góc ở tâm $90^\\circ$ và bán kính $R = 16\\text{ cm}$ thành một hình nón. Thể tích của hình nón thu được bằng:",
    options: [
      { id: "A", text: "$16\\sqrt{15}\\pi\\text{ cm}^3$" },
      { id: "B", text: "$64\\sqrt{15}\\pi\\text{ cm}^3$" },
      { id: "C", text: "$\\frac{64\\sqrt{15}\\pi}{3}\\text{ cm}^3$" },
      { id: "D", text: "$\\frac{16\\sqrt{15}\\pi}{3}\\text{ cm}^3$" }
    ],
    correctAnswer: "C",
    solution4Steps: [
      "Bước 1: Đường sinh $l = 16\\text{ cm}$. Bán kính đáy $r = R \\times \\frac{90}{360} = 16 \\times \\frac{1}{4} = 4\\text{ cm}$.",
      "Bước 2: Chiều cao $h = \\sqrt{l^2 - r^2} = \\sqrt{16^2 - 4^2} = \\sqrt{256 - 16} = \\sqrt{240} = 4\\sqrt{15}\\text{ cm}$.",
      "Bước 3: Thể tích $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\times 4^2 \\times 4\\sqrt{15} = \\frac{64\\sqrt{15}\\pi}{3}\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án C."
    ],
    importantNotes: ["$V = \\frac{64\\sqrt{15}\\pi}{3}\\text{ cm}^3$."],
    formulaTags: ["CONE_NET", "CONE_VOLUME"]
  },
  {
    sourceNumber: "6.8",
    sourcePage: 9,
    topic: "CONE",
    subtopic: "CONE_NET",
    archetypeId: "CONE_NET",
    difficulty: "LEVEL_3",
    question: "Một hình quạt tròn có bán kính $R = 9\\text{ cm}$ và diện tích bằng $27\\pi\\text{ cm}^2$. Khi cuộn hình quạt đó lại thành một hình nón thì bán kính đáy $r$ của hình nón là:",
    options: [
      { id: "A", text: "$3\\text{ cm}$" },
      { id: "B", text: "$4{,}5\\text{ cm}$" },
      { id: "C", text: "$6\\text{ cm}$" },
      { id: "D", text: "$2\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Diện tích hình quạt chính bằng diện tích xung quanh của hình nón: $S_{\\text{quạt}} = S_{xq} = 27\\pi\\text{ cm}^2$.",
      "Bước 2: Đường sinh nón $l = R = 9\\text{ cm}$.",
      "Bước 3: $S_{xq} = \\pi r l \\Rightarrow 27\\pi = \\pi \\times r \\times 9 \\Rightarrow r = 3\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($3\\text{ cm}$)."
    ],
    importantNotes: ["$S_{\\text{quạt}} = S_{xq} = \\pi r l$."],
    formulaTags: ["CONE_NET", "CONE_LATERAL_AREA"]
  },
  {
    sourceNumber: "6.9",
    sourcePage: 9,
    topic: "CONE",
    subtopic: "CONE_NET",
    archetypeId: "CONE_NET",
    difficulty: "LEVEL_3",
    question: "Một hình nón có góc ở đỉnh là $60^\\circ$ và độ dài đường sinh $l = 10\\text{ cm}$. Khi khai triển mặt xung quanh thành một hình quạt tròn thì góc ở tâm của hình quạt tròn đó bằng:",
    options: [
      { id: "A", text: "$180^\\circ$" },
      { id: "B", text: "$120^\\circ$" },
      { id: "C", text: "$90^\\circ$" },
      { id: "D", text: "$60^\\circ$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thiết diện qua trục của hình nón là tam giác cân tại đỉnh $S$ có góc ở đỉnh bằng $60^\\circ$, nên là tam giác đều cạnh $l = 10\\text{ cm}$.",
      "Bước 2: Đường kính đáy $d = 10\\text{ cm} \\Rightarrow r = 5\\text{ cm}$.",
      "Bước 3: Góc ở tâm quạt tròn khai triển: $n = \\frac{r}{l} \\times 360^\\circ = \\frac{5}{10} \\times 360^\\circ = 180^\\circ$.",
      "Bước 4: Kết luận: Chọn đáp án A ($180^\\circ$)."
    ],
    importantNotes: ["Thiết diện qua trục là tam giác đều $\\Rightarrow r = l/2 \\Rightarrow n = 180^\\circ$."],
    formulaTags: ["CONE_NET", "CONE_SECTION"]
  },
  {
    sourceNumber: "6.10",
    sourcePage: 9,
    topic: "CONE",
    subtopic: "CONE_NET",
    archetypeId: "CONE_NET",
    difficulty: "LEVEL_3",
    question: "Cắt một tấm bìa hình tròn bán kính $R = 12\\text{ cm}$ thành 3 hình quạt tròn bằng nhau. Lấy một hình quạt cuộn lại thành một hình nón. Diện tích xung quanh của hình nón đó bằng:",
    options: [
      { id: "A", text: "$48\\pi\\text{ cm}^2$" },
      { id: "B", text: "$144\\pi\\text{ cm}^2$" },
      { id: "C", text: "$72\\pi\\text{ cm}^2$" },
      { id: "D", text: "$36\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Diện tích toàn bộ hình tròn ban đầu: $S_{\\text{tròn}} = \\pi R^2 = \\pi \\times 12^2 = 144\\pi\\text{ cm}^2$.",
      "Bước 2: Diện tích mỗi hình quạt tròn: $S_{\\text{quạt}} = \\frac{144\\pi}{3} = 48\\pi\\text{ cm}^2$.",
      "Bước 3: Diện tích xung quanh của hình nón đúng bằng diện tích hình quạt tạo nên nó: $S_{xq} = 48\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($48\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{xq} = 48\\pi\\text{ cm}^2$."],
    formulaTags: ["CONE_NET", "CONE_LATERAL_AREA"]
  },

  // Nhóm 7 (7.1 - 7.10)
  {
    sourceNumber: "7.1",
    sourcePage: 9,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_1",
    question: "Cho mặt cầu có diện tích $S = 36\\pi\\text{ cm}^2$. Bán kính của mặt cầu đó là:",
    options: [
      { id: "A", text: "$3\\text{ cm}$" },
      { id: "B", text: "$6\\text{ cm}$" },
      { id: "C", text: "$9\\text{ cm}$" },
      { id: "D", text: "$1{,}5\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Công thức diện tích mặt cầu: $S = 4\\pi R^2$.",
      "Bước 2: Thay $S = 36\\pi \\Rightarrow 4\\pi R^2 = 36\\pi$.",
      "Bước 3: $R^2 = 9 \\Rightarrow R = 3\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($3\\text{ cm}$)."
    ],
    importantNotes: ["$R = 3\\text{ cm}$."],
    formulaTags: ["SPHERE_AREA"]
  },
  {
    sourceNumber: "7.2",
    sourcePage: 9,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_1",
    question: "Cho mặt cầu có diện tích $S = 16\\pi\\text{ dm}^2$. Đường kính của mặt cầu đó là:",
    options: [
      { id: "A", text: "$2\\text{ dm}$" },
      { id: "B", text: "$4\\text{ dm}$" },
      { id: "C", text: "$8\\text{ dm}$" },
      { id: "D", text: "$16\\text{ dm}$" }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: $S = \\pi d^2 = 16\\pi\\text{ dm}^2$.",
      "Bước 2: $d^2 = 16 \\Rightarrow d = 4\\text{ dm}$.",
      "Bước 3: Hoặc tính $R = 2\\text{ dm} \\Rightarrow d = 2R = 4\\text{ dm}$.",
      "Bước 4: Kết luận: Chọn đáp án B ($4\\text{ dm}$)."
    ],
    importantNotes: ["Đường kính $d = 4\\text{ dm}$."],
    formulaTags: ["SPHERE_AREA", "RADIUS_DIAMETER"]
  },
  {
    sourceNumber: "7.3",
    sourcePage: 10,
    topic: "SPHERE",
    subtopic: "SPHERE_SECTION",
    archetypeId: "SPHERE_SECTION",
    difficulty: "LEVEL_2",
    question: "Mặt phẳng đi qua tâm của một hình cầu chia hình cầu đó thành:",
    options: [
      { id: "A", text: "Hai hình cầu nhỏ." },
      { id: "B", text: "Hai bán cầu bằng nhau." },
      { id: "C", text: "Hai khối nón." },
      { id: "D", text: "Hai khối trụ." }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: Phân tích tính đối xứng của hình cầu qua tâm $O$.",
      "Bước 2: Mọi mặt phẳng đi qua tâm $O$ đều là mặt phẳng đối xứng của hình cầu.",
      "Bước 3: Mặt phẳng đó chia hình cầu thành hai phần bằng nhau, mỗi phần gọi là một bán cầu (nửa hình cầu).",
      "Bước 4: Kết luận: Chọn đáp án B."
    ],
    importantNotes: ["Hai nửa hình cầu bằng nhau gọi là hai bán cầu."],
    formulaTags: ["SPHERE_SECTION"]
  },
  {
    sourceNumber: "7.4",
    sourcePage: 10,
    topic: "SPHERE",
    subtopic: "SPHERE_SECTION",
    archetypeId: "SPHERE_SECTION",
    difficulty: "LEVEL_2",
    question: "Cắt một hình cầu tâm $O$ bán kính $R$ bởi một mặt phẳng $(P)$ không đi qua tâm. Thiết diện nhận được luôn là:",
    options: [
      { id: "A", text: "Hình elip." },
      { id: "B", text: "Hình tròn có bán kính $r = R$." },
      { id: "C", text: "Hình tròn có bán kính $r < R$." },
      { id: "D", text: "Hình chữ nhật." }
    ],
    correctAnswer: "C",
    solution4Steps: [
      "Bước 1: Mọi mặt phẳng cắt hình cầu đều tạo ra thiết diện là hình tròn.",
      "Bước 2: Khi mặt phẳng không đi qua tâm (khoảng cách $d > 0$), bán kính thiết diện $r = \\sqrt{R^2 - d^2}$.",
      "Bước 3: Do $d > 0$ nên $r < R$.",
      "Bước 4: Kết luận: Chọn đáp án C."
    ],
    importantNotes: ["Thiết diện luôn là hình tròn, và nhỏ hơn hình tròn lớn khi không qua tâm ($r < R$)."],
    formulaTags: ["SPHERE_SECTION"]
  },
  {
    sourceNumber: "7.5",
    sourcePage: 10,
    topic: "SPHERE",
    subtopic: "SPHERE_SECTION",
    archetypeId: "SPHERE_SECTION",
    difficulty: "LEVEL_3",
    question: "Một hình cầu có bán kính $R = 5\\text{ cm}$. Một mặt phẳng cắt hình cầu và cách tâm một khoảng bằng $3\\text{ cm}$. Diện tích của hình tròn thiết diện tạo bởi mặt phẳng và hình cầu là:",
    options: [
      { id: "A", text: "$16\\pi\\text{ cm}^2$" },
      { id: "B", text: "$9\\pi\\text{ cm}^2$" },
      { id: "C", text: "$25\\pi\\text{ cm}^2$" },
      { id: "D", text: "$4\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính mặt cắt thiết diện $r = \\sqrt{R^2 - d^2}$.",
      "Bước 2: Thay $R = 5\\text{ cm}, d = 3\\text{ cm} \\Rightarrow r = \\sqrt{5^2 - 3^2} = \\sqrt{25 - 9} = 4\\text{ cm}$.",
      "Bước 3: Diện tích hình tròn thiết diện: $S = \\pi r^2 = \\pi \\times 4^2 = 16\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($16\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$r = \\sqrt{R^2 - d^2} = 4\\text{ cm} \\Rightarrow S = 16\\pi\\text{ cm}^2$."],
    formulaTags: ["SPHERE_SECTION", "PYTHAGOREAN"]
  },
  {
    sourceNumber: "7.6",
    sourcePage: 10,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_3",
    question: "Một bán cầu đặc có bán kính $R = 6\\text{ cm}$. Diện tích toàn bộ bề mặt ngoài của bán cầu (gồm mặt cong và mặt đáy phẳng) là:",
    options: [
      { id: "A", text: "$72\\pi\\text{ cm}^2$" },
      { id: "B", text: "$108\\pi\\text{ cm}^2$" },
      { id: "C", text: "$144\\pi\\text{ cm}^2$" },
      { id: "D", text: "$36\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: Diện tích mặt cong của bán cầu: $S_{\\text{cong}} = \\frac{1}{2}(4\\pi R^2) = 2\\pi R^2$.",
      "Bước 2: Diện tích mặt đáy phẳng (hình tròn lớn): $S_{\\text{đáy}} = \\pi R^2$.",
      "Bước 3: Tổng diện tích toàn bề mặt: $S = 2\\pi R^2 + \\pi R^2 = 3\\pi R^2 = 3\\pi \\times 6^2 = 108\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án B ($108\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["Bán cầu đặc có diện tích toàn phần là $3\\pi R^2$."],
    formulaTags: ["SPHERE_AREA", "HEMISPHERE"]
  },
  {
    sourceNumber: "7.7",
    sourcePage: 10,
    topic: "SPHERE",
    subtopic: "SPHERE_CYLINDER",
    archetypeId: "SPHERE_CYLINDER",
    difficulty: "LEVEL_3",
    question: "Một hình trụ ngoại tiếp một hình cầu bán kính $R$ (nghĩa là hình trụ có đáy bằng hình tròn lớn của cầu và chiều cao $h = 2R$). Tỉ số diện tích mặt cầu và diện tích xung quanh của hình trụ là:",
    options: [
      { id: "A", text: "$1$" },
      { id: "B", text: "$2$" },
      { id: "C", text: "$\\frac{1}{2}$" },
      { id: "D", text: "$\\frac{2}{3}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Diện tích mặt cầu: $S_{\\text{cầu}} = 4\\pi R^2$.",
      "Bước 2: Diện tích xung quanh hình trụ: $S_{xq\\text{ trụ}} = 2\\pi r h = 2\\pi R (2R) = 4\\pi R^2$.",
      "Bước 3: Tỉ số: $\\frac{S_{\\text{cầu}}}{S_{xq\\text{ trụ}}} = \\frac{4\\pi R^2}{4\\pi R^2} = 1$.",
      "Bước 4: Kết luận: Chọn đáp án A ($1$)."
    ],
    importantNotes: ["Định lí Archimedes nổi tiếng: Diện tích mặt cầu đúng bằng diện tích xung quanh của hình trụ ngoại tiếp nó."],
    formulaTags: ["SPHERE_AREA", "CYLINDER_AREA"]
  },
  {
    sourceNumber: "7.8",
    sourcePage: 10,
    topic: "SPHERE",
    subtopic: "SPHERE_CYLINDER",
    archetypeId: "SPHERE_CYLINDER",
    difficulty: "LEVEL_3",
    question: "Một hình trụ ngoại tiếp một hình cầu bán kính $R$. Tỉ số thể tích của hình cầu và thể tích của hình trụ ngoại tiếp đó là:",
    options: [
      { id: "A", text: "$\\frac{2}{3}$" },
      { id: "B", text: "$\\frac{1}{3}$" },
      { id: "C", text: "$\\frac{3}{4}$" },
      { id: "D", text: "$\\frac{1}{2}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích hình cầu: $V_{\\text{cầu}} = \\frac{4}{3}\\pi R^3$.",
      "Bước 2: Thể tích hình trụ: $V_{\\text{trụ}} = \\pi R^2 h = \\pi R^2 (2R) = 2\\pi R^3$.",
      "Bước 3: Tỉ số: $\\frac{V_{\\text{cầu}}}{V_{\\text{trụ}}} = \\frac{\\frac{4}{3}\\pi R^3}{2\\pi R^3} = \\frac{4}{6} = \\frac{2}{3}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{2}{3}$)."
    ],
    importantNotes: ["Thể tích cầu bằng đúng $\\frac{2}{3}$ thể tích trụ ngoại tiếp."],
    formulaTags: ["SPHERE_VOLUME", "CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "7.9",
    sourcePage: 11,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_3",
    question: "Nếu giảm đường kính của một mặt cầu đi một nửa thì diện tích của mặt cầu đó sẽ:",
    options: [
      { id: "A", text: "Giảm 2 lần." },
      { id: "B", text: "Giảm 4 lần." },
      { id: "C", text: "Giảm 8 lần." },
      { id: "D", text: "Không đổi." }
    ],
    correctAnswer: "B",
    solution4Steps: [
      "Bước 1: $S = \\pi d^2$.",
      "Bước 2: Khi $d' = d/2 \\Rightarrow S' = \\pi (d/2)^2 = \\frac{1}{4}\\pi d^2 = \\frac{S}{4}$.",
      "Bước 3: Diện tích giảm đi 4 lần.",
      "Bước 4: Kết luận: Chọn đáp án B."
    ],
    importantNotes: ["Đường kính giảm 2 lần $\\Rightarrow$ diện tích giảm $2^2 = 4$ lần."],
    formulaTags: ["SPHERE_AREA"]
  },
  {
    sourceNumber: "7.10",
    sourcePage: 11,
    topic: "SPHERE",
    subtopic: "SPHERE_AREA",
    archetypeId: "SPHERE_AREA",
    difficulty: "LEVEL_3",
    question: "Một bồn chứa nước dạng hình cầu có thể tích bằng $\\frac{32}{3}\\pi\\text{ m}^3$. Diện tích bề mặt ngoài của bồn chứa đó bằng:",
    options: [
      { id: "A", text: "$16\\pi\\text{ m}^2$" },
      { id: "B", text: "$8\\pi\\text{ m}^2$" },
      { id: "C", text: "$32\\pi\\text{ m}^2$" },
      { id: "D", text: "$64\\pi\\text{ m}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V = \\frac{4}{3}\\pi R^3 = \\frac{32}{3}\\pi \\Rightarrow 4R^3 = 32 \\Rightarrow R^3 = 8 \\Rightarrow R = 2\\text{ m}$.",
      "Bước 2: Tính diện tích mặt cầu: $S = 4\\pi R^2$.",
      "Bước 3: $S = 4\\pi \\times 2^2 = 16\\pi\\text{ m}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($16\\pi\\text{ m}^2$)."
    ],
    importantNotes: ["$R = 2\\text{ m} \\Rightarrow S = 16\\pi\\text{ m}^2$."],
    formulaTags: ["SPHERE_VOLUME", "SPHERE_AREA"]
  },

  // Nhóm 8 (8.1 - 8.10)
  {
    sourceNumber: "8.1",
    sourcePage: 11,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Cho hình nón có bán kính đáy $r = 6\\text{ cm}$ và độ dài đường sinh $l = 10\\text{ cm}$. Thể tích của hình nón đó bằng:",
    options: [
      { id: "A", text: "$96\\pi\\text{ cm}^3$" },
      { id: "B", text: "$288\\pi\\text{ cm}^3$" },
      { id: "C", text: "$120\\pi\\text{ cm}^3$" },
      { id: "D", text: "$60\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Tính chiều cao $h = \\sqrt{l^2 - r^2} = \\sqrt{10^2 - 6^2} = \\sqrt{100 - 36} = \\sqrt{64} = 8\\text{ cm}$.",
      "Bước 2: Công thức $V = \\frac{1}{3}\\pi r^2 h$.",
      "Bước 3: $V = \\frac{1}{3}\\pi \\times 6^2 \\times 8 = \\frac{1}{3}\\pi \\times 36 \\times 8 = 96\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($96\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$h = 8\\text{ cm} \\Rightarrow V = 96\\pi\\text{ cm}^3$."],
    formulaTags: ["CONE_VOLUME", "PYTHAGOREAN"]
  },
  {
    sourceNumber: "8.2",
    sourcePage: 11,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Cho hình nón có đường kính đáy $d = 8\\text{ cm}$, đường sinh $l = 5\\text{ cm}$. Thể tích khối nón là:",
    options: [
      { id: "A", text: "$16\\pi\\text{ cm}^3$" },
      { id: "B", text: "$48\\pi\\text{ cm}^3$" },
      { id: "C", text: "$32\\pi\\text{ cm}^3$" },
      { id: "D", text: "$20\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính đáy $r = 8/2 = 4\\text{ cm}$.",
      "Bước 2: Chiều cao $h = \\sqrt{l^2 - r^2} = \\sqrt{5^2 - 4^2} = 3\\text{ cm}$.",
      "Bước 3: Thể tích $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\times 4^2 \\times 3 = 16\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($16\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 16\\pi\\text{ cm}^3$."],
    formulaTags: ["CONE_VOLUME", "PYTHAGOREAN"]
  },
  {
    sourceNumber: "8.3",
    sourcePage: 11,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Cho tam giác $ABC$ vuông tại $A$ có $AB = 3\\text{ cm}, AC = 4\\text{ cm}$. Khi quay tam giác $ABC$ quanh cạnh $AB$ cố định ta được một hình nón có thể tích bằng:",
    options: [
      { id: "A", text: "$16\\pi\\text{ cm}^3$" },
      { id: "B", text: "$12\\pi\\text{ cm}^3$" },
      { id: "C", text: "$48\\pi\\text{ cm}^3$" },
      { id: "D", text: "$36\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Trục quay là $AB$ nên chiều cao hình nón $h = AB = 3\\text{ cm}$, bán kính đáy $r = AC = 4\\text{ cm}$.",
      "Bước 2: Áp dụng $V = \\frac{1}{3}\\pi r^2 h$.",
      "Bước 3: $V = \\frac{1}{3}\\pi \\times 4^2 \\times 3 = 16\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($16\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["Quay quanh $AB$ thì $h = AB = 3\\text{ cm}, r = AC = 4\\text{ cm}$."],
    formulaTags: ["CONE_VOLUME", "CONE_ROTATION"]
  },
  {
    sourceNumber: "8.4",
    sourcePage: 12,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Cho tam giác $ABC$ vuông tại $A$ có $AB = 3\\text{ cm}, AC = 4\\text{ cm}$. Khi quay tam giác $ABC$ quanh cạnh $AC$ cố định ta được một hình nón có thể tích bằng:",
    options: [
      { id: "A", text: "$12\\pi\\text{ cm}^3$" },
      { id: "B", text: "$16\\pi\\text{ cm}^3$" },
      { id: "C", text: "$36\\pi\\text{ cm}^3$" },
      { id: "D", text: "$48\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Trục quay là $AC$ nên chiều cao $h = AC = 4\\text{ cm}$, bán kính đáy $r = AB = 3\\text{ cm}$.",
      "Bước 2: $V = \\frac{1}{3}\\pi r^2 h$.",
      "Bước 3: $V = \\frac{1}{3}\\pi \\times 3^2 \\times 4 = \\frac{1}{3}\\pi \\times 9 \\times 4 = 12\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($12\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["Quay quanh $AC$ thì $h = 4, r = 3 \\Rightarrow V = 12\\pi\\text{ cm}^3$."],
    formulaTags: ["CONE_VOLUME", "CONE_ROTATION"]
  },
  {
    sourceNumber: "8.5",
    sourcePage: 12,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một hình nón có chu vi đáy bằng $10\\pi\\text{ cm}$ và diện tích xung quanh bằng $65\\pi\\text{ cm}^2$. Thể tích của hình nón đó là:",
    options: [
      { id: "A", text: "$100\\pi\\text{ cm}^3$" },
      { id: "B", text: "$300\\pi\\text{ cm}^3$" },
      { id: "C", text: "$25\\pi\\text{ cm}^3$" },
      { id: "D", text: "$50\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $2\\pi r = 10\\pi \\Rightarrow r = 5\\text{ cm}$.",
      "Bước 2: $S_{xq} = \\pi r l = 65\\pi \\Rightarrow l = 65/5 = 13\\text{ cm}$.",
      "Bước 3: Chiều cao $h = \\sqrt{l^2 - r^2} = \\sqrt{13^2 - 5^2} = 12\\text{ cm}$. Thể tích $V = \\frac{1}{3}\\pi \\times 5^2 \\times 12 = 100\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($100\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$h = 12\\text{ cm}, V = 100\\pi\\text{ cm}^3$."],
    formulaTags: ["CONE_VOLUME", "CONE_LATERAL_AREA"]
  },
  {
    sourceNumber: "8.6",
    sourcePage: 12,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một đống cát có dạng hình nón cao $1{,}5\\text{ m}$, chu vi đáy bằng $18{,}84\\text{ m}$. Biết $1\\text{ m}^3$ cát nặng $1{,}5\\text{ tấn}$. Khối lượng của đống cát (lấy $\\pi \\approx 3{,}14$) bằng:",
    options: [
      { id: "A", text: "$21{,}195\\text{ tấn}$" },
      { id: "B", text: "$14{,}13\\text{ tấn}$" },
      { id: "C", text: "$42{,}39\\text{ tấn}$" },
      { id: "D", text: "$7{,}065\\text{ tấn}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính đáy đống cát $r = \\frac{C}{2\\pi} = \\frac{18{,}84}{2 \\times 3{,}14} = 3\\text{ m}$.",
      "Bước 2: Thể tích đống cát: $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} \\times 3{,}14 \\times 3^2 \\times 1{,}5 = 14{,}13\\text{ m}^3$.",
      "Bước 3: Khối lượng đống cát: $M = 14{,}13 \\times 1{,}5 = 21{,}195\\text{ tấn}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($21{,}195\\text{ tấn}$)."
    ],
    importantNotes: ["Khối lượng = Thể tích $\\times$ Khối lượng riêng."],
    formulaTags: ["CONE_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "8.7",
    sourcePage: 12,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một cốc giấy đựng kem có dạng hình nón có chiều cao $12\\text{ cm}$ và đường kính miệng cốc là $10\\text{ cm}$. Dung tích tối đa của cốc giấy đó (lấy $\\pi \\approx 3{,}14$, làm tròn đến $\\text{cm}^3$) là:",
    options: [
      { id: "A", text: "$314\\text{ cm}^3$" },
      { id: "B", text: "$942\\text{ cm}^3$" },
      { id: "C", text: "$1256\\text{ cm}^3$" },
      { id: "D", text: "$157\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính miệng cốc $r = 10/2 = 5\\text{ cm}$, chiều cao $h = 12\\text{ cm}$.",
      "Bước 2: Dung tích tối đa là thể tích hình nón $V = \\frac{1}{3}\\pi r^2 h$.",
      "Bước 3: $V = \\frac{1}{3} \\times 3{,}14 \\times 5^2 \\times 12 = 3{,}14 \\times 25 \\times 4 = 314\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($314\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 314\\text{ cm}^3$."],
    formulaTags: ["CONE_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "8.8",
    sourcePage: 12,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một hình nón có thể tích $V = 48\\pi\\text{ cm}^3$ và chiều cao $h = 9\\text{ cm}$. Bán kính đáy của hình nón là:",
    options: [
      { id: "A", text: "$4\\text{ cm}$" },
      { id: "B", text: "$16\\text{ cm}$" },
      { id: "C", text: "$2\\text{ cm}$" },
      { id: "D", text: "$8\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V = \\frac{1}{3}\\pi r^2 h \\Rightarrow 48\\pi = \\frac{1}{3}\\pi r^2 \\times 9 = 3\\pi r^2$.",
      "Bước 2: $r^2 = 48 / 3 = 16$.",
      "Bước 3: $r = \\sqrt{16} = 4\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($4\\text{ cm}$)."
    ],
    importantNotes: ["$r = 4\\text{ cm}$."],
    formulaTags: ["CONE_VOLUME"]
  },
  {
    sourceNumber: "8.9",
    sourcePage: 12,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_3",
    question: "Cho hình nón có góc ở đỉnh bằng $120^\\circ$ và độ dài đường sinh $l = 6\\text{ cm}$. Thể tích của hình nón đó bằng:",
    options: [
      { id: "A", text: "$27\\pi\\text{ cm}^3$" },
      { id: "B", text: "$9\\sqrt{3}\\pi\\text{ cm}^3$" },
      { id: "C", text: "$81\\pi\\text{ cm}^3$" },
      { id: "D", text: "$18\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thiết diện qua trục là tam giác cân tại đỉnh $S$ có góc $\\widehat{ASB} = 120^\\circ$. Suy ra góc nửa đỉnh $\\alpha = 60^\\circ$.",
      "Bước 2: Bán kính đáy $r = l \\cdot \\sin 60^\\circ = 6 \\times \\frac{\\sqrt{3}}{2} = 3\\sqrt{3}\\text{ cm}$. Chiều cao $h = l \\cdot \\cos 60^\\circ = 6 \\times \\frac{1}{2} = 3\\text{ cm}$.",
      "Bước 3: Thể tích $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\times (3\\sqrt{3})^2 \\times 3 = 27\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($27\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["Góc nửa đỉnh $\\alpha = 60^\\circ \\Rightarrow r = 3\\sqrt{3}, h = 3$."],
    formulaTags: ["CONE_VOLUME", "TRIGONOMETRY"]
  },
  {
    sourceNumber: "8.10",
    sourcePage: 13,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một cái phễu hình nón đựng đầy nước có chiều cao $10\\text{ cm}$. Người ta đổ bớt nước ra sao cho chiều cao của cột nước còn lại trong phễu là $5\\text{ cm}$. Thể tích nước còn lại trong phễu chiếm bao nhiêu phần thể tích nước ban đầu?",
    options: [
      { id: "A", text: "$\\frac{1}{8}$" },
      { id: "B", text: "$\\frac{1}{2}$" },
      { id: "C", text: "$\\frac{1}{4}$" },
      { id: "D", text: "$\\frac{7}{8}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Khối nước còn lại có dạng hình nón đồng dạng với hình nón ban đầu.",
      "Bước 2: Tỉ số đồng dạng về chiều cao: $k = \\frac{h'}{h} = \\frac{5}{10} = \\frac{1}{2}$.",
      "Bước 3: Tỉ số thể tích của hai khối đồng dạng bằng lập phương tỉ số đồng dạng: $\\frac{V'}{V} = k^3 = \\left(\\frac{1}{2}\\right)^3 = \\frac{1}{8}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{1}{8}$)."
    ],
    importantNotes: ["Tỉ số thể tích hình nón đồng dạng tỉ lệ với lập phương chiều cao."],
    formulaTags: ["CONE_VOLUME", "SIMILARITY"]
  },

  // Nhóm 9 (9.1 - 9.10)
  {
    sourceNumber: "9.1",
    sourcePage: 13,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_1",
    question: "Một hình trụ có bán kính đáy $r = 4\\text{ cm}$ và chiều cao $h = 5\\text{ cm}$. Thể tích của hình trụ là:",
    options: [
      { id: "A", text: "$80\\pi\\text{ cm}^3$" },
      { id: "B", text: "$20\\pi\\text{ cm}^3$" },
      { id: "C", text: "$40\\pi\\text{ cm}^3$" },
      { id: "D", text: "$160\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $r = 4\\text{ cm}, h = 5\\text{ cm}$.",
      "Bước 2: Công thức $V = \\pi r^2 h$.",
      "Bước 3: $V = \\pi \\times 4^2 \\times 5 = \\pi \\times 16 \\times 5 = 80\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($80\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = \\pi r^2 h$."],
    formulaTags: ["CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "9.2",
    sourcePage: 13,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một hình trụ có đường kính đáy $d = 6\\text{ cm}$ và chiều cao $h = 10\\text{ cm}$. Thể tích của hình trụ bằng:",
    options: [
      { id: "A", text: "$90\\pi\\text{ cm}^3$" },
      { id: "B", text: "$360\\pi\\text{ cm}^3$" },
      { id: "C", text: "$60\\pi\\text{ cm}^3$" },
      { id: "D", text: "$180\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $r = d/2 = 6/2 = 3\\text{ cm}$.",
      "Bước 2: $V = \\pi r^2 h$.",
      "Bước 3: $V = \\pi \\times 3^2 \\times 10 = 90\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($90\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$r = 3\\text{ cm}$."],
    formulaTags: ["CYLINDER_VOLUME", "RADIUS_DIAMETER"]
  },
  {
    sourceNumber: "9.3",
    sourcePage: 13,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một thùng phuy hình trụ có thể tích $V = 200\\pi\\text{ dm}^3$ và chiều cao $h = 8\\text{ dm}$. Bán kính đáy của thùng phuy là:",
    options: [
      { id: "A", text: "$5\\text{ dm}$" },
      { id: "B", text: "$25\\text{ dm}$" },
      { id: "C", text: "$10\\text{ dm}$" },
      { id: "D", text: "$2{,}5\\text{ dm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V = \\pi r^2 h \\Rightarrow r^2 = \\frac{V}{\\pi h}$.",
      "Bước 2: $r^2 = \\frac{200\\pi}{\\pi \\times 8} = 25$.",
      "Bước 3: $r = 5\\text{ dm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($5\\text{ dm}$)."
    ],
    importantNotes: ["$r = 5\\text{ dm}$."],
    formulaTags: ["CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "9.4",
    sourcePage: 13,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một lon sữa bò hình trụ có bán kính đáy $r = 3{,}5\\text{ cm}$ và chiều cao $h = 8\\text{ cm}$. Thể tích sữa chứa trong lon (lấy $\\pi \\approx \\frac{22}{7}$) bằng:",
    options: [
      { id: "A", text: "$308\\text{ cm}^3$" },
      { id: "B", text: "$616\\text{ cm}^3$" },
      { id: "C", text: "$154\\text{ cm}^3$" },
      { id: "D", text: "$88\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $r = 3{,}5 = \\frac{7}{2}\\text{ cm}, h = 8\\text{ cm}, \\pi = \\frac{22}{7}$.",
      "Bước 2: $V = \\pi r^2 h = \\frac{22}{7} \\times \\left(\\frac{7}{2}\\right)^2 \\times 8$.",
      "Bước 3: $V = \\frac{22}{7} \\times \\frac{49}{4} \\times 8 = 22 \\times 7 \\times 2 = 308\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($308\\text{ cm}^3$)."
    ],
    importantNotes: ["Sử dụng $\\pi = \\frac{22}{7}$ tính toán rút gọn đẹp."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "9.5",
    sourcePage: 13,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một bồn chứa nước inox hình trụ đặt đứng có đường kính đáy $1\\text{ m}$ và chiều cao $2\\text{ m}$. Bồn có thể chứa tối đa bao nhiêu lít nước? (lấy $\\pi \\approx 3{,}14$, bỏ qua độ dày vỏ bồn, $1\\text{ m}^3 = 1000\\text{ lít}$)",
    options: [
      { id: "A", text: "$1570\\text{ lít}$" },
      { id: "B", text: "$6280\\text{ lít}$" },
      { id: "C", text: "$3140\\text{ lít}$" },
      { id: "D", text: "$785\\text{ lít}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính đáy $r = 1/2 = 0{,}5\\text{ m}$, chiều cao $h = 2\\text{ m}$.",
      "Bước 2: Thể tích bồn: $V = \\pi r^2 h = 3{,}14 \\times (0{,}5)^2 \\times 2 = 3{,}14 \\times 0{,}25 \\times 2 = 1{,}57\\text{ m}^3$.",
      "Bước 3: Đổi sang lít: $1{,}57\\text{ m}^3 = 1{,}57 \\times 1000 = 1570\\text{ lít}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($1570\\text{ lít}$)."
    ],
    importantNotes: ["$1\\text{ m}^3 = 1000\\text{ dm}^3 = 1000\\text{ lít}$."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD", "UNIT_CONVERSION"]
  },
  {
    sourceNumber: "9.6",
    sourcePage: 14,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một khối bê tông hình trụ có chu vi đáy là $6\\pi\\text{ m}$ và chiều cao $4\\text{ m}$. Thể tích khối bê tông đó là:",
    options: [
      { id: "A", text: "$36\\pi\\text{ m}^3$" },
      { id: "B", text: "$24\\pi\\text{ m}^3$" },
      { id: "C", text: "$144\\pi\\text{ m}^3$" },
      { id: "D", text: "$72\\pi\\text{ m}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $2\\pi r = 6\\pi \\Rightarrow r = 3\\text{ m}$.",
      "Bước 2: $V = \\pi r^2 h$.",
      "Bước 3: $V = \\pi \\times 3^2 \\times 4 = 36\\pi\\text{ m}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($36\\pi\\text{ m}^3$)."
    ],
    importantNotes: ["$r = 3\\text{ m} \\Rightarrow V = 36\\pi\\text{ m}^3$."],
    formulaTags: ["CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "9.7",
    sourcePage: 14,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_2",
    question: "Nếu tăng bán kính đáy của hình trụ lên 3 lần và giảm chiều cao đi 3 lần thì thể tích của hình trụ sẽ:",
    options: [
      { id: "A", text: "Tăng 3 lần." },
      { id: "B", text: "Không đổi." },
      { id: "C", text: "Tăng 9 lần." },
      { id: "D", text: "Giảm 3 lần." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V = \\pi r^2 h$.",
      "Bước 2: $r' = 3r$ và $h' = h/3$.",
      "Bước 3: $V' = \\pi (3r)^2 \\left(\\frac{h}{3}\\right) = \\pi (9r^2) \\left(\\frac{h}{3}\\right) = 3(\\pi r^2 h) = 3V$.",
      "Bước 4: Kết luận: Chọn đáp án A (Tăng 3 lần)."
    ],
    importantNotes: ["Bán kính bình phương ($9$) chia cho $3$ ra hệ số $3$."],
    formulaTags: ["CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "9.8",
    sourcePage: 14,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một hình trụ có diện tích xung quanh bằng $40\\pi\\text{ cm}^2$ và bán kính đáy $r = 4\\text{ cm}$. Thể tích của hình trụ là:",
    options: [
      { id: "A", text: "$80\\pi\\text{ cm}^3$" },
      { id: "B", text: "$160\\pi\\text{ cm}^3$" },
      { id: "C", text: "$40\\pi\\text{ cm}^3$" },
      { id: "D", text: "$100\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $S_{xq} = 2\\pi r h = 40\\pi \\Rightarrow 2\\pi \\times 4 \\times h = 40\\pi \\Rightarrow h = 5\\text{ cm}$.",
      "Bước 2: Thể tích $V = \\pi r^2 h$.",
      "Bước 3: $V = \\pi \\times 4^2 \\times 5 = 80\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($80\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$h = 5\\text{ cm} \\Rightarrow V = 80\\pi\\text{ cm}^3$."],
    formulaTags: ["CYLINDER_VOLUME", "CYLINDER_AREA"]
  },
  {
    sourceNumber: "9.9",
    sourcePage: 14,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_3",
    question: "Người ta uốn một tấm tôn hình chữ nhật kích thước $20\\text{ cm} \\times 40\\text{ cm}$ thành một hình trụ (hai mép chiều rộng $20\\text{ cm}$ dán khít vào nhau). Thể tích của hình trụ tạo thành (lấy $\\pi \\approx 3{,}14$, làm tròn đến hàng đơn vị) là:",
    options: [
      { id: "A", text: "$2548\\text{ cm}^3$" },
      { id: "B", text: "$1274\\text{ cm}^3$" },
      { id: "C", text: "$5096\\text{ cm}^3$" },
      { id: "D", text: "$800\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Mép chiều rộng $20\\text{ cm}$ khít nhau nên chiều cao hình trụ $h = 20\\text{ cm}$. Chu vi đáy là chiều dài: $C = 40\\text{ cm}$.",
      "Bước 2: Bán kính đáy $r = \\frac{C}{2\\pi} = \\frac{40}{2\\pi} = \\frac{20}{\\pi}\\text{ cm}$.",
      "Bước 3: Thể tích $V = \\pi r^2 h = \\pi \\left(\\frac{20}{\\pi}\\right)^2 \\times 20 = \\frac{8000}{\\pi} \\approx \\frac{8000}{3{,}14159} \\approx 2546{,}48\\text{ cm}^3 \\approx 2548\\text{ cm}^3$ (với $\\pi = 3{,}14$).",
      "Bước 4: Kết luận: Chọn đáp án A ($2548\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = \\frac{8000}{3{,}14} \\approx 2547{,}77 \\approx 2548\\text{ cm}^3$."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "9.10",
    sourcePage: 14,
    topic: "CYLINDER",
    subtopic: "CYLINDER_VOLUME",
    archetypeId: "CYLINDER_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một ống cống bằng bê tông hình trụ có chiều dài $2\\text{ m}$, đường kính ngoài $80\\text{ cm}$, độ dày thành cống là $10\\text{ cm}$. Thể tích bê tông cần dùng để đúc ống cống đó (lấy $\\pi \\approx 3{,}14$) bằng:",
    options: [
      { id: "A", text: "$0{,}4396\\text{ m}^3$" },
      { id: "B", text: "$0{,}8792\\text{ m}^3$" },
      { id: "C", text: "$0{,}2198\\text{ m}^3$" },
      { id: "D", text: "$1{,}0048\\text{ m}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Đổi đơn vị: $h = 2\\text{ m} = 200\\text{ cm}$. Bán kính ngoài $R = 80/2 = 40\\text{ cm} = 0{,}4\\text{ m}$. Bán kính trong $r = 40 - 10 = 30\\text{ cm} = 0{,}3\\text{ m}$.",
      "Bước 2: Công thức thể tích hình trụ rỗng: $V = \\pi (R^2 - r^2) h$.",
      "Bước 3: $V = 3{,}14 \\times (0{,}4^2 - 0{,}3^2) \\times 2 = 3{,}14 \\times (0{,}16 - 0{,}09) \\times 2 = 3{,}14 \\times 0{,}07 \\times 2 = 0{,}4396\\text{ m}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($0{,}4396\\text{ m}^3$)."
    ],
    importantNotes: ["Thể tích trụ rỗng: $V = \\pi (R^2 - r^2) h$."],
    formulaTags: ["CYLINDER_VOLUME", "REAL_WORLD"]
  },

  // Nhóm 10 (10.1 - 10.10)
  {
    sourceNumber: "10.1",
    sourcePage: 14,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_1",
    question: "Thể tích khối nón có bán kính đáy $r$ và chiều cao $h$ là:",
    options: [
      { id: "A", text: "$V = \\frac{1}{3}\\pi r^2 h$" },
      { id: "B", text: "$V = \\pi r^2 h$" },
      { id: "C", text: "$V = 2\\pi r h$" },
      { id: "D", text: "$V = \\frac{4}{3}\\pi r^2 h$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Khối nón tròn xoay đáy tròn bán kính $r$, chiều cao $h$.",
      "Bước 2: Áp dụng định nghĩa thể tích hình nón.",
      "Bước 3: $V = \\frac{1}{3}\\pi r^2 h$.",
      "Bước 4: Kết luận: Chọn đáp án A."
    ],
    importantNotes: ["$V = \\frac{1}{3}\\pi r^2 h$."],
    formulaTags: ["CONE_VOLUME"]
  },
  {
    sourceNumber: "10.2",
    sourcePage: 15,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một hình nón có bán kính đáy $r = 5\\text{ cm}$ và chiều cao $h = 6\\text{ cm}$. Thể tích của hình nón đó bằng:",
    options: [
      { id: "A", text: "$50\\pi\\text{ cm}^3$" },
      { id: "B", text: "$150\\pi\\text{ cm}^3$" },
      { id: "C", text: "$30\\pi\\text{ cm}^3$" },
      { id: "D", text: "$75\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $r = 5\\text{ cm}, h = 6\\text{ cm}$.",
      "Bước 2: $V = \\frac{1}{3}\\pi r^2 h$.",
      "Bước 3: $V = \\frac{1}{3}\\pi \\times 5^2 \\times 6 = 2\\pi \\times 25 = 50\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($50\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 50\\pi\\text{ cm}^3$."],
    formulaTags: ["CONE_VOLUME"]
  },
  {
    sourceNumber: "10.3",
    sourcePage: 15,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Thể tích của một hình nón có đường kính đáy $12\\text{ cm}$ và chiều cao $8\\text{ cm}$ là:",
    options: [
      { id: "A", text: "$96\\pi\\text{ cm}^3$" },
      { id: "B", text: "$288\\pi\\text{ cm}^3$" },
      { id: "C", text: "$384\\pi\\text{ cm}^3$" },
      { id: "D", text: "$192\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $r = 12/2 = 6\\text{ cm}, h = 8\\text{ cm}$.",
      "Bước 2: $V = \\frac{1}{3}\\pi r^2 h$.",
      "Bước 3: $V = \\frac{1}{3}\\pi \\times 6^2 \\times 8 = \\frac{1}{3}\\pi \\times 36 \\times 8 = 96\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($96\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 96\\pi\\text{ cm}^3$."],
    formulaTags: ["CONE_VOLUME", "RADIUS_DIAMETER"]
  },
  {
    sourceNumber: "10.4",
    sourcePage: 15,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một hình nón có thể tích $V = 100\\pi\\text{ cm}^3$ và chiều cao $h = 12\\text{ cm}$. Bán kính đáy của hình nón là:",
    options: [
      { id: "A", text: "$5\\text{ cm}$" },
      { id: "B", text: "$25\\text{ cm}$" },
      { id: "C", text: "$10\\text{ cm}$" },
      { id: "D", text: "$50\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V = \\frac{1}{3}\\pi r^2 h \\Rightarrow 100\\pi = \\frac{1}{3}\\pi r^2 \\times 12 = 4\\pi r^2$.",
      "Bước 2: $r^2 = 100 / 4 = 25$.",
      "Bước 3: $r = 5\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($5\\text{ cm}$)."
    ],
    importantNotes: ["$r = 5\\text{ cm}$."],
    formulaTags: ["CONE_VOLUME"]
  },
  {
    sourceNumber: "10.5",
    sourcePage: 15,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một hình nón có thể tích $V = 36\\pi\\text{ cm}^3$ và bán kính đáy $r = 6\\text{ cm}$. Chiều cao $h$ của hình nón bằng:",
    options: [
      { id: "A", text: "$3\\text{ cm}$" },
      { id: "B", text: "$1\\text{ cm}$" },
      { id: "C", text: "$6\\text{ cm}$" },
      { id: "D", text: "$9\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $h = \\frac{3V}{\\pi r^2}$.",
      "Bước 2: Thay số: $h = \\frac{3 \\times 36\\pi}{\\pi \\times 6^2} = \\frac{108\\pi}{36\\pi} = 3\\text{ cm}$.",
      "Bước 3: Kiểm tra lại: $V = \\frac{1}{3}\\pi \\times 36 \\times 3 = 36\\pi$.",
      "Bước 4: Kết luận: Chọn đáp án A ($3\\text{ cm}$)."
    ],
    importantNotes: ["$h = 3\\text{ cm}$."],
    formulaTags: ["CONE_VOLUME"]
  },
  {
    sourceNumber: "10.6",
    sourcePage: 15,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một hình nón có thiết diện qua trục là một tam giác vuông cân có cạnh huyền bằng $8\\text{ cm}$. Thể tích của khối nón đó là:",
    options: [
      { id: "A", text: "$\\frac{64\\pi}{3}\\text{ cm}^3$" },
      { id: "B", text: "$64\\pi\\text{ cm}^3$" },
      { id: "C", text: "$\\frac{128\\pi}{3}\\text{ cm}^3$" },
      { id: "D", text: "$32\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Cạnh huyền của tam giác thiết diện chính là đường kính đáy: $d = 2r = 8\\text{ cm} \\Rightarrow r = 4\\text{ cm}$.",
      "Bước 2: Trong tam giác vuông cân, đường cao ứng với cạnh huyền bằng nửa cạnh huyền: $h = 8 / 2 = 4\\text{ cm}$.",
      "Bước 3: Thể tích $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\times 4^2 \\times 4 = \\frac{64\\pi}{3}\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{64\\pi}{3}\\text{ cm}^3$)."
    ],
    importantNotes: ["Tam giác vuông cân có $h = r = d/2$."],
    formulaTags: ["CONE_VOLUME", "CONE_SECTION"]
  },
  {
    sourceNumber: "10.7",
    sourcePage: 15,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một hình nón có thiết diện qua trục là một tam giác đều cạnh $6\\text{ cm}$. Thể tích của hình nón đó bằng:",
    options: [
      { id: "A", text: "$9\\sqrt{3}\\pi\\text{ cm}^3$" },
      { id: "B", text: "$27\\sqrt{3}\\pi\\text{ cm}^3$" },
      { id: "C", text: "$18\\pi\\text{ cm}^3$" },
      { id: "D", text: "$3\\sqrt{3}\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thiết diện là tam giác đều cạnh $a = 6\\text{ cm} \\Rightarrow$ đường sinh $l = 6\\text{ cm}$, đường kính đáy $d = 6\\text{ cm} \\Rightarrow r = 3\\text{ cm}$.",
      "Bước 2: Chiều cao tam giác đều: $h = \\frac{a\\sqrt{3}}{2} = \\frac{6\\sqrt{3}}{2} = 3\\sqrt{3}\\text{ cm}$.",
      "Bước 3: Thể tích $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\times 3^2 \\times 3\\sqrt{3} = 9\\sqrt{3}\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($9\\sqrt{3}\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["Tam giác đều cạnh $a$ có chiều cao $h = \\frac{a\\sqrt{3}}{2}$."],
    formulaTags: ["CONE_VOLUME", "CONE_SECTION"]
  },
  {
    sourceNumber: "10.8",
    sourcePage: 15,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một chiếc cốc hình trụ và một chiếc cốc hình nón có cùng bán kính đáy và cùng chiều cao. Người ta múc đầy nước vào chiếc cốc hình nón rồi đổ sang chiếc cốc hình trụ rỗng. Mực nước trong cốc hình trụ dâng lên bằng bao nhiêu phần chiều cao của cốc?",
    options: [
      { id: "A", text: "$\\frac{1}{3}$" },
      { id: "B", text: "$\\frac{1}{2}$" },
      { id: "C", text: "$\\frac{2}{3}$" },
      { id: "D", text: "$\\frac{1}{4}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích nước trong nón $V_{\\text{nước}} = \\frac{1}{3}\\pi r^2 h$.",
      "Bước 2: Thể tích nước trong hình trụ có chiều cao mực nước $h'$: $V = \\pi r^2 h'$.",
      "Bước 3: Cho hai thể tích bằng nhau: $\\pi r^2 h' = \\frac{1}{3}\\pi r^2 h \\Rightarrow h' = \\frac{1}{3}h$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{1}{3}$)."
    ],
    importantNotes: ["Mực nước dâng lên bằng $\\frac{1}{3}$ chiều cao cốc hình trụ."],
    formulaTags: ["CONE_VOLUME", "CYLINDER_VOLUME", "STEM_EXPERIMENT"]
  },
  {
    sourceNumber: "10.9",
    sourcePage: 15,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một bình thủy tinh hình nón có bán kính miệng bình là $6\\text{ cm}$, chiều cao $18\\text{ cm}$ chứa đầy nước. Rót toàn bộ lượng nước này sang một bình thủy tinh hình trụ có bán kính đáy $6\\text{ cm}$. Chiều cao mực nước trong bình hình trụ là:",
    options: [
      { id: "A", text: "$6\\text{ cm}$" },
      { id: "B", text: "$9\\text{ cm}$" },
      { id: "C", text: "$18\\text{ cm}$" },
      { id: "D", text: "$2\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích nước ban đầu: $V = \\frac{1}{3}\\pi \\times 6^2 \\times 18 = 216\\pi\\text{ cm}^3$.",
      "Bước 2: Trong bình hình trụ bán kính $r = 6\\text{ cm}$, thể tích là $V = \\pi r^2 h_{\\text{trụ}} = \\pi \\times 6^2 \\times h_{\\text{trụ}} = 36\\pi h_{\\text{trụ}}$.",
      "Bước 3: $36\\pi h_{\\text{trụ}} = 216\\pi \\Rightarrow h_{\\text{trụ}} = \\frac{216}{36} = 6\\text{ cm}$. (Hoặc $h_{\\text{trụ}} = \\frac{1}{3}h_{\\text{nón}} = \\frac{18}{3} = 6\\text{ cm}$).",
      "Bước 4: Kết luận: Chọn đáp án A ($6\\text{ cm}$)."
    ],
    importantNotes: ["$h_{\\text{trụ}} = 6\\text{ cm}$."],
    formulaTags: ["CONE_VOLUME", "CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "10.10",
    sourcePage: 15,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một khối gỗ hình lập phương cạnh $10\\text{ cm}$. Người ta tiện gọt khối gỗ đó thành một khối nón có thể tích lớn nhất (đáy nón nội tiếp một mặt của hình lập phương, đỉnh nón nằm trên mặt đối diện). Thể tích của khối nón đó (lấy $\\pi \\approx 3{,}14$, làm tròn đến hàng phần mười) là:",
    options: [
      { id: "A", text: "$261{,}7\\text{ cm}^3$" },
      { id: "B", text: "$785\\text{ cm}^3$" },
      { id: "C", text: "$523{,}3\\text{ cm}^3$" },
      { id: "D", text: "$1000\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Hình nón lớn nhất có đáy nội tiếp hình vuông cạnh $10\\text{ cm} \\Rightarrow 2r = 10 \\Rightarrow r = 5\\text{ cm}$.",
      "Bước 2: Chiều cao hình nón bằng cạnh hình lập phương: $h = 10\\text{ cm}$.",
      "Bước 3: Thể tích nón: $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} \\times 3{,}14 \\times 5^2 \\times 10 = \\frac{785}{3} \\approx 261{,}67\\text{ cm}^3 \\approx 261{,}7\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($261{,}7\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = \\frac{785}{3} \\approx 261{,}7\\text{ cm}^3$."],
    formulaTags: ["CONE_VOLUME", "MAX_VOLUME"]
  }
];
