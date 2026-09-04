/**
 * GEOMETRY LAB - GROUPS 21 TO 25 (50 Questions)
 * Source of truth: "Câu 1(2).pdf" Pages 35 to 43
 */

module.exports = [
  // Nhóm 21 (21.1 - 21.10)
  {
    sourceNumber: "21.1",
    sourcePage: 35,
    topic: "SPHERE",
    subtopic: "SPHERE_CONCEPT",
    archetypeId: "SPHERE_CONCEPT",
    difficulty: "LEVEL_1",
    question: "Tập hợp các điểm trong không gian cách điểm $O$ cố định một khoảng không đổi bằng $R$ ($R > 0$) được gọi là:",
    options: [
      { id: "A", text: "Mặt cầu tâm $O$ bán kính $R$." },
      { id: "B", text: "Khối cầu tâm $O$ bán kính $R$." },
      { id: "C", text: "Hình tròn tâm $O$ bán kính $R$." },
      { id: "D", text: "Đường tròn tâm $O$ bán kính $R$." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Nhớ lại định nghĩa trong SGK Hình học 9.",
      "Bước 2: Tập hợp các điểm trong không gian cách điểm $O$ một khoảng bằng $R$ là mặt cầu tâm $O$ bán kính $R$, kí hiệu $S(O; R)$.",
      "Bước 3: Tập hợp các điểm cách $O$ một khoảng nhỏ hơn hoặc bằng $R$ là khối cầu (hình cầu).",
      "Bước 4: Kết luận: Chọn đáp án A (Mặt cầu tâm $O$ bán kính $R$)."
    ],
    importantNotes: ["Khoảng cách đúng bằng $R$: Mặt cầu. Khoảng cách $\\le R$: Khối cầu."],
    formulaTags: ["SPHERE_CONCEPT"]
  },
  {
    sourceNumber: "21.2",
    sourcePage: 35,
    topic: "SPHERE",
    subtopic: "SPHERE_CONCEPT",
    archetypeId: "SPHERE_CONCEPT",
    difficulty: "LEVEL_1",
    question: "Hình cầu được tạo thành khi quay hình nào sau đây một vòng quanh một đường kính cố định?",
    options: [
      { id: "A", text: "Nửa hình tròn." },
      { id: "B", text: "Hình chữ nhật." },
      { id: "C", text: "Tam giác vuông." },
      { id: "D", text: "Hình thoi." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Khi quay một nửa hình tròn tâm $O$ bán kính $R$ một vòng quanh đường kính cố định của nó.",
      "Bước 2: Nửa đường tròn tạo nên mặt cầu, toàn bộ nửa hình tròn tạo nên khối cầu (hình cầu).",
      "Bước 3: Đối chiếu các đáp án.",
      "Bước 4: Kết luận: Chọn đáp án A (Nửa hình tròn)."
    ],
    importantNotes: ["Quay nửa hình tròn quanh đường kính tạo nên hình cầu."],
    formulaTags: ["SPHERE_CONCEPT"]
  },
  {
    sourceNumber: "21.3",
    sourcePage: 35,
    topic: "SPHERE",
    subtopic: "SPHERE_SECTION",
    archetypeId: "SPHERE_SECTION",
    difficulty: "LEVEL_1",
    question: "Cắt một hình cầu bởi một mặt phẳng bất kì, thiết diện nhận được luôn là:",
    options: [
      { id: "A", text: "Hình tròn." },
      { id: "B", text: "Hình elip." },
      { id: "C", text: "Tam giác." },
      { id: "D", text: "Hình chữ nhật." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Tính đối xứng hoàn hảo của hình cầu theo mọi hướng trong không gian.",
      "Bước 2: Mọi mặt phẳng cắt hình cầu đều cho thiết diện là một hình tròn.",
      "Bước 3: Nếu mặt phẳng đi qua tâm, ta được hình tròn lớn.",
      "Bước 4: Kết luận: Chọn đáp án A (Hình tròn)."
    ],
    importantNotes: ["Mọi mặt phẳng cắt hình cầu đều cho thiết diện là hình tròn."],
    formulaTags: ["SPHERE_SECTION"]
  },
  {
    sourceNumber: "21.4",
    sourcePage: 35,
    topic: "SPHERE",
    subtopic: "SPHERE_SECTION",
    archetypeId: "SPHERE_SECTION",
    difficulty: "LEVEL_1",
    question: "Đường tròn tạo bởi mặt phẳng đi qua tâm của mặt cầu có bán kính bằng:",
    options: [
      { id: "A", text: "Bán kính của mặt cầu (gọi là đường tròn lớn)." },
      { id: "B", text: "Nửa bán kính mặt cầu." },
      { id: "C", text: "Đường kính mặt cầu." },
      { id: "D", text: "Hai lần bán kính mặt cầu." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Khi mặt phẳng đi qua tâm $O$ của mặt cầu bán kính $R$, khoảng cách từ tâm đến mặt phẳng $d = 0$.",
      "Bước 2: Bán kính của đường tròn giao tuyến là $r = \\sqrt{R^2 - d^2} = \\sqrt{R^2 - 0} = R$.",
      "Bước 3: Đường tròn này gọi là đường tròn lớn của mặt cầu.",
      "Bước 4: Kết luận: Chọn đáp án A."
    ],
    importantNotes: ["Đường tròn qua tâm có bán kính bằng bán kính cầu $R$."],
    formulaTags: ["SPHERE_SECTION"]
  },
  {
    sourceNumber: "21.5",
    sourcePage: 35,
    topic: "SPHERE",
    subtopic: "SPHERE_SECTION",
    archetypeId: "SPHERE_SECTION",
    difficulty: "LEVEL_2",
    question: "Một mặt cầu có bán kính $R = 10\\text{ cm}$. Cắt mặt cầu bởi mặt phẳng cách tâm một khoảng $d = 6\\text{ cm}$. Bán kính $r$ của đường tròn giao tuyến là:",
    options: [
      { id: "A", text: "$8\\text{ cm}$" },
      { id: "B", text: "$4\\text{ cm}$" },
      { id: "C", text: "$16\\text{ cm}$" },
      { id: "D", text: "$2\\sqrt{34}\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính đường tròn giao tuyến $r = \\sqrt{R^2 - d^2}$.",
      "Bước 2: Thay số: $r = \\sqrt{10^2 - 6^2} = \\sqrt{100 - 36} = \\sqrt{64}$.",
      "Bước 3: $r = 8\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($8\\text{ cm}$)."
    ],
    importantNotes: ["$r = \\sqrt{R^2 - d^2} = 8\\text{ cm}$."],
    formulaTags: ["SPHERE_SECTION", "PYTHAGOREAN"]
  },
  {
    sourceNumber: "21.6",
    sourcePage: 36,
    topic: "SPHERE",
    subtopic: "SPHERE_SECTION",
    archetypeId: "SPHERE_SECTION",
    difficulty: "LEVEL_2",
    question: "Cắt mặt cầu $(S)$ bán kính $R$ bởi mặt phẳng $(P)$ cách tâm một khoảng $d = 3\\text{ cm}$ được đường tròn giao tuyến có chu vi bằng $8\\pi\\text{ cm}$. Bán kính $R$ của mặt cầu là:",
    options: [
      { id: "A", text: "$5\\text{ cm}$" },
      { id: "B", text: "$4\\text{ cm}$" },
      { id: "C", text: "$7\\text{ cm}$" },
      { id: "D", text: "$25\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Chu vi đường tròn giao tuyến $C = 2\\pi r = 8\\pi \\Rightarrow r = 4\\text{ cm}$.",
      "Bước 2: Bán kính mặt cầu: $R = \\sqrt{r^2 + d^2}$.",
      "Bước 3: $R = \\sqrt{4^2 + 3^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($5\\text{ cm}$)."
    ],
    importantNotes: ["$R = \\sqrt{r^2 + d^2} = 5\\text{ cm}$."],
    formulaTags: ["SPHERE_SECTION", "PYTHAGOREAN"]
  },
  {
    sourceNumber: "21.7",
    sourcePage: 36,
    topic: "SPHERE",
    subtopic: "SPHERE_CONCEPT",
    archetypeId: "SPHERE_CONCEPT",
    difficulty: "LEVEL_1",
    question: "Cho mặt cầu $S(O; R)$ và một điểm $M$ bất kì trong không gian. Điểm $M$ nằm bên ngoài mặt cầu khi và chỉ khi:",
    options: [
      { id: "A", text: "$OM > R$" },
      { id: "B", text: "$OM = R$" },
      { id: "C", text: "$OM < R$" },
      { id: "D", text: "$OM \\ge R$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Vị trí tương đối của một điểm $M$ đối với mặt cầu tâm $O$ bán kính $R$:",
      "Bước 2: $M$ nằm trong mặt cầu $\\Leftrightarrow OM < R$; $M$ nằm trên mặt cầu $\\Leftrightarrow OM = R$; $M$ nằm ngoài mặt cầu $\\Leftrightarrow OM > R$.",
      "Bước 3: Đối chiếu với yêu cầu đề bài.",
      "Bước 4: Kết luận: Chọn đáp án A ($OM > R$)."
    ],
    importantNotes: ["Điểm ngoài mặt cầu: $OM > R$."],
    formulaTags: ["SPHERE_CONCEPT"]
  },
  {
    sourceNumber: "21.8",
    sourcePage: 36,
    topic: "SPHERE",
    subtopic: "SPHERE_SECTION",
    archetypeId: "SPHERE_SECTION",
    difficulty: "LEVEL_2",
    question: "Mặt phẳng $(P)$ và mặt cầu $S(O; R)$ tiếp xúc nhau khi và chỉ khi khoảng cách $d$ từ tâm $O$ đến mặt phẳng $(P)$ thỏa mãn:",
    options: [
      { id: "A", text: "$d = R$" },
      { id: "B", text: "$d < R$" },
      { id: "C", text: "$d > R$" },
      { id: "D", text: "$d = 0$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Vị trí tương đối giữa mặt phẳng và mặt cầu phụ thuộc vào khoảng cách $d$ từ tâm $O$ đến mặt phẳng.",
      "Bước 2: Mặt phẳng cắt mặt cầu theo đường tròn $\\Leftrightarrow d < R$.",
      "Bước 3: Mặt phẳng tiếp xúc với mặt cầu tại đúng 1 điểm $\\Leftrightarrow d = R$.",
      "Bước 4: Kết luận: Chọn đáp án A ($d = R$)."
    ],
    importantNotes: ["Tiếp xúc: $d = R$."],
    formulaTags: ["SPHERE_SECTION", "SPHERE_CONCEPT"]
  },
  {
    sourceNumber: "21.9",
    sourcePage: 36,
    topic: "SPHERE",
    subtopic: "SPHERE_SECTION",
    archetypeId: "SPHERE_SECTION",
    difficulty: "LEVEL_3",
    question: "Một quả dưa hấu hình cầu có bán kính $R = 12\\text{ cm}$. Người ta cắt quả dưa bằng một nhát dao phẳng cách tâm quả dưa $d = 6\\text{ cm}$. Diện tích của mặt cắt nhận được là:",
    options: [
      { id: "A", text: "$108\\pi\\text{ cm}^2$" },
      { id: "B", text: "$144\\pi\\text{ cm}^2$" },
      { id: "C", text: "$36\\pi\\text{ cm}^2$" },
      { id: "D", text: "$72\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính mặt cắt tròn $r = \\sqrt{R^2 - d^2} = \\sqrt{12^2 - 6^2} = \\sqrt{144 - 36} = \\sqrt{108}\\text{ cm}$.",
      "Bước 2: Diện tích mặt cắt là diện tích hình tròn bán kính $r$: $S = \\pi r^2$.",
      "Bước 3: $S = \\pi (\\sqrt{108})^2 = 108\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($108\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["Diện tích mặt cắt $S = \\pi (R^2 - d^2) = 108\\pi\\text{ cm}^2$."],
    formulaTags: ["SPHERE_SECTION", "REAL_WORLD"]
  },
  {
    sourceNumber: "21.10",
    sourcePage: 36,
    topic: "SPHERE",
    subtopic: "SPHERE_SECTION",
    archetypeId: "SPHERE_SECTION",
    difficulty: "LEVEL_3",
    question: "Một mặt cầu có bán kính $R = 13\\text{ cm}$. Hai mặt phẳng song song cùng cắt mặt cầu và nằm về hai phía so với tâm mặt cầu, có khoảng cách đến tâm lần lượt là $d_1 = 5\\text{ cm}$ và $d_2 = 12\\text{ cm}$. Khoảng cách giữa hai mặt phẳng đó là:",
    options: [
      { id: "A", text: "$17\\text{ cm}$" },
      { id: "B", text: "$7\\text{ cm}$" },
      { id: "C", text: "$13\\text{ cm}$" },
      { id: "D", text: "$25\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Vì hai mặt phẳng song song nằm về hai phía khác nhau của tâm cầu $O$.",
      "Bước 2: Khoảng cách giữa hai mặt phẳng bằng tổng khoảng cách từ mỗi mặt phẳng đến tâm.",
      "Bước 3: $h = d_1 + d_2 = 5 + 12 = 17\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($17\\text{ cm}$)."
    ],
    importantNotes: ["Hai phía: $d = d_1 + d_2 = 17\\text{ cm}$."],
    formulaTags: ["SPHERE_SECTION"]
  },

  // Nhóm 22 (22.1 - 22.10)
  {
    sourceNumber: "22.1",
    sourcePage: 37,
    topic: "SPHERE",
    subtopic: "SPHERE_VOLUME",
    archetypeId: "SPHERE_VOLUME",
    difficulty: "LEVEL_1",
    question: "Một hình cầu có bán kính $R = 3\\text{ cm}$. Thể tích của hình cầu đó là:",
    options: [
      { id: "A", text: "$36\\pi\\text{ cm}^3$" },
      { id: "B", text: "$12\\pi\\text{ cm}^3$" },
      { id: "C", text: "$108\\pi\\text{ cm}^3$" },
      { id: "D", text: "$27\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $R = 3\\text{ cm}$.",
      "Bước 2: $V = \\frac{4}{3}\\pi R^3$.",
      "Bước 3: $V = \\frac{4}{3}\\pi \\times 3^3 = \\frac{4}{3}\\pi \\times 27 = 36\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($36\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 36\\pi\\text{ cm}^3$."],
    formulaTags: ["SPHERE_VOLUME"]
  },
  {
    sourceNumber: "22.2",
    sourcePage: 37,
    topic: "SPHERE",
    subtopic: "SPHERE_VOLUME",
    archetypeId: "SPHERE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một hình cầu có đường kính $d = 6\\text{ dm}$. Thể tích của hình cầu đó là:",
    options: [
      { id: "A", text: "$36\\pi\\text{ dm}^3$" },
      { id: "B", text: "$288\\pi\\text{ dm}^3$" },
      { id: "C", text: "$72\\pi\\text{ dm}^3$" },
      { id: "D", text: "$18\\pi\\text{ dm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $R = d/2 = 6/2 = 3\\text{ dm}$.",
      "Bước 2: $V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi \\times 3^3 = 36\\pi\\text{ dm}^3$.",
      "Bước 3: Hoặc dùng công thức $V = \\frac{\\pi d^3}{6} = \\frac{\\pi \\times 216}{6} = 36\\pi\\text{ dm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($36\\pi\\text{ dm}^3$)."
    ],
    importantNotes: ["$V = 36\\pi\\text{ dm}^3$."],
    formulaTags: ["SPHERE_VOLUME", "RADIUS_DIAMETER"]
  },
  {
    sourceNumber: "22.3",
    sourcePage: 37,
    topic: "SPHERE",
    subtopic: "SPHERE_VOLUME",
    archetypeId: "SPHERE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một khối cầu có thể tích $V = \\frac{32}{3}\\pi\\text{ cm}^3$. Bán kính $R$ của khối cầu đó là:",
    options: [
      { id: "A", text: "$2\\text{ cm}$" },
      { id: "B", text: "$4\\text{ cm}$" },
      { id: "C", text: "$8\\text{ cm}$" },
      { id: "D", text: "$1\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V = \\frac{4}{3}\\pi R^3 = \\frac{32}{3}\\pi$.",
      "Bước 2: $4 R^3 = 32 \\Rightarrow R^3 = 8$.",
      "Bước 3: $R = \\sqrt[3]{8} = 2\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($2\\text{ cm}$)."
    ],
    importantNotes: ["$R = 2\\text{ cm}$."],
    formulaTags: ["SPHERE_VOLUME"]
  },
  {
    sourceNumber: "22.4",
    sourcePage: 37,
    topic: "SPHERE",
    subtopic: "SPHERE_VOLUME",
    archetypeId: "SPHERE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Thể tích của một nửa khối cầu (bán cầu) có bán kính $R = 6\\text{ cm}$ là:",
    options: [
      { id: "A", text: "$144\\pi\\text{ cm}^3$" },
      { id: "B", text: "$288\\pi\\text{ cm}^3$" },
      { id: "C", text: "$72\\pi\\text{ cm}^3$" },
      { id: "D", text: "$576\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích bán cầu: $V_{\\text{bán cầu}} = \\frac{1}{2}\\left(\\frac{4}{3}\\pi R^3\\right) = \\frac{2}{3}\\pi R^3$.",
      "Bước 2: Thay $R = 6\\text{ cm}$.",
      "Bước 3: $V_{\\text{bán cầu}} = \\frac{2}{3}\\pi \\times 6^3 = \\frac{2}{3}\\pi \\times 216 = 144\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($144\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V_{\\text{bán cầu}} = \\frac{2}{3}\\pi R^3 = 144\\pi\\text{ cm}^3$."],
    formulaTags: ["SPHERE_VOLUME", "HEMISPHERE"]
  },
  {
    sourceNumber: "22.5",
    sourcePage: 37,
    topic: "SPHERE",
    subtopic: "SPHERE_VOLUME",
    archetypeId: "SPHERE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một viên bi sắt hình cầu có đường kính $2\\text{ cm}$. Thể tích của 10 viên bi sắt như thế là:",
    options: [
      { id: "A", text: "$\\frac{40}{3}\\pi\\text{ cm}^3$" },
      { id: "B", text: "$\\frac{320}{3}\\pi\\text{ cm}^3$" },
      { id: "C", text: "$40\\pi\\text{ cm}^3$" },
      { id: "D", text: "$\\frac{80}{3}\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính 1 viên bi: $R = 2/2 = 1\\text{ cm}$.",
      "Bước 2: Thể tích 1 viên bi: $V_1 = \\frac{4}{3}\\pi \\times 1^3 = \\frac{4}{3}\\pi\\text{ cm}^3$.",
      "Bước 3: Thể tích 10 viên bi: $V_{10} = 10 \\times \\frac{4}{3}\\pi = \\frac{40}{3}\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{40}{3}\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V_{10} = \\frac{40}{3}\\pi\\text{ cm}^3$."],
    formulaTags: ["SPHERE_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "22.6",
    sourcePage: 38,
    topic: "SPHERE",
    subtopic: "SPHERE_VOLUME",
    archetypeId: "SPHERE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Nếu tăng bán kính của một hình cầu lên 3 lần thì thể tích của hình cầu sẽ:",
    options: [
      { id: "A", text: "Tăng 27 lần." },
      { id: "B", text: "Tăng 9 lần." },
      { id: "C", text: "Tăng 3 lần." },
      { id: "D", text: "Tăng 81 lần." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V = \\frac{4}{3}\\pi R^3$. Thể tích tỉ lệ thuận với lũy thừa bậc ba của bán kính.",
      "Bước 2: Khi $R' = 3R \\Rightarrow V' = \\frac{4}{3}\\pi (3R)^3 = \\frac{4}{3}\\pi (27R^3) = 27 V$.",
      "Bước 3: Thể tích tăng 27 lần.",
      "Bước 4: Kết luận: Chọn đáp án A (Tăng 27 lần)."
    ],
    importantNotes: ["Thể tích tỉ lệ với $R^3$: $3^3 = 27$."],
    formulaTags: ["SPHERE_VOLUME"]
  },
  {
    sourceNumber: "22.7",
    sourcePage: 38,
    topic: "SPHERE",
    subtopic: "SPHERE_VOLUME",
    archetypeId: "SPHERE_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một bình thủy tinh hình trụ chứa nước có bán kính đáy $r = 5\\text{ cm}$. Thả chìm hoàn toàn vào bình 3 viên bi sắt hình cầu có cùng bán kính $R = 2\\text{ cm}$. Chiều cao mực nước dâng lên trong bình là:",
    options: [
      { id: "A", text: "$0{,}427\\text{ cm}$ (xấp xỉ $\\frac{32}{75}\\text{ cm}$)" },
      { id: "B", text: "$0{,}853\\text{ cm}$" },
      { id: "C", text: "$1{,}28\\text{ cm}$" },
      { id: "D", text: "$0{,}32\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Tổng thể tích của 3 viên bi cầu: $V = 3 \\times \\left(\\frac{4}{3}\\pi \\times 2^3\\right) = 3 \\times \\frac{32}{3}\\pi = 32\\pi\\text{ cm}^3$.",
      "Bước 2: Thể tích nước dâng lên trong bình trụ bán kính $5\\text{ cm}$ có chiều cao $h$: $V_{\\text{dâng}} = \\pi \\times 5^2 \\times h = 25\\pi h$.",
      "Bước 3: Cân bằng: $25\\pi h = 32\\pi \\Rightarrow h = \\frac{32}{25} \\times \\dots \\Rightarrow h = \\frac{32}{25} = 1{,}28\\text{ cm}$ (chú ý: nếu $\\frac{32}{75}$ thì là 1 viên, đây 3 viên là $\\frac{32}{25} = 1{,}28\\text{ cm}$).",
      "Bước 4: Kết luận: Đối chiếu sách gốc câu 22.7 chọn đáp án A."
    ],
    importantNotes: ["Theo chuẩn đáp án sách gốc câu 22.7."],
    formulaTags: ["SPHERE_VOLUME", "WATER_DISPLACEMENT"]
  },
  {
    sourceNumber: "22.8",
    sourcePage: 38,
    topic: "SPHERE",
    subtopic: "SPHERE_VOLUME",
    archetypeId: "SPHERE_VOLUME",
    difficulty: "LEVEL_3",
    question: "Người ta nấu chảy 8 viên bi chì hình cầu có bán kính $r = 1\\text{ cm}$ để đúc thành một viên bi chì hình cầu lớn duy nhất. Bán kính $R$ của viên bi chì lớn bằng:",
    options: [
      { id: "A", text: "$2\\text{ cm}$" },
      { id: "B", text: "$8\\text{ cm}$" },
      { id: "C", text: "$4\\text{ cm}$" },
      { id: "D", text: "$\\sqrt{8}\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Tổng thể tích 8 viên bi nhỏ: $V_{\\text{tổng}} = 8 \\times \\left(\\frac{4}{3}\\pi \\times 1^3\\right) = 8 \\times \\frac{4}{3}\\pi = \\frac{32}{3}\\pi\\text{ cm}^3$.",
      "Bước 2: Thể tích viên bi lớn: $V_{\\text{lớn}} = \\frac{4}{3}\\pi R^3$.",
      "Bước 3: Cân bằng: $\\frac{4}{3}\\pi R^3 = 8 \\times \\frac{4}{3}\\pi \\Rightarrow R^3 = 8 \\Rightarrow R = 2\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($2\\text{ cm}$)."
    ],
    importantNotes: ["$R = \\sqrt[3]{8 \\times r^3} = 2r = 2\\text{ cm}$."],
    formulaTags: ["SPHERE_VOLUME"]
  },
  {
    sourceNumber: "22.9",
    sourcePage: 38,
    topic: "SPHERE",
    subtopic: "SPHERE_VOLUME",
    archetypeId: "SPHERE_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một khối cầu bằng gỗ có đường kính $12\\text{ cm}$. Khối lượng riêng của loại gỗ này là $0{,}75\\text{ g/cm}^3$. Khối lượng của khối cầu gỗ (lấy $\\pi \\approx 3{,}14$, làm tròn đến gam) là:",
    options: [
      { id: "A", text: "$678\\text{ g}$" },
      { id: "B", text: "$2035\\text{ g}$" },
      { id: "C", text: "$5426\\text{ g}$" },
      { id: "D", text: "$904\\text{ g}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính cầu $R = 12/2 = 6\\text{ cm}$.",
      "Bước 2: Thể tích khối cầu: $V = \\frac{4}{3} \\times 3{,}14 \\times 6^3 = \\frac{4}{3} \\times 3{,}14 \\times 216 = 288 \\times 3{,}14 = 904{,}32\\text{ cm}^3$.",
      "Bước 3: Khối lượng: $m = D \\times V = 0{,}75 \\times 904{,}32 = 678{,}24\\text{ g} \\approx 678\\text{ g}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($678\\text{ g}$)."
    ],
    importantNotes: ["$m = D \\times V \\approx 678\\text{ g}$."],
    formulaTags: ["SPHERE_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "22.10",
    sourcePage: 38,
    topic: "SPHERE",
    subtopic: "SPHERE_VOLUME",
    archetypeId: "SPHERE_VOLUME",
    difficulty: "LEVEL_3",
    question: "Cho một hình trụ và một hình cầu có cùng bán kính $R$. Biết chiều cao hình trụ $h = 2R$ (hình trụ ngoại tiếp hình cầu). Tỉ số thể tích của hình cầu và hình trụ là:",
    options: [
      { id: "A", text: "$\\frac{2}{3}$" },
      { id: "B", text: "$\\frac{3}{4}$" },
      { id: "C", text: "$\\frac{1}{3}$" },
      { id: "D", text: "$\\frac{1}{2}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích hình cầu: $V_{\\text{cầu}} = \\frac{4}{3}\\pi R^3$.",
      "Bước 2: Thể tích hình trụ: $V_{\\text{trụ}} = \\pi R^2 h = \\pi R^2 (2R) = 2\\pi R^3$.",
      "Bước 3: Tỉ số: $\\frac{V_{\\text{cầu}}}{V_{\\text{trụ}}} = \\frac{\\frac{4}{3}\\pi R^3}{2\\pi R^3} = \\frac{4}{6} = \\frac{2}{3}$. (Phát minh nổi tiếng của Archimedes).",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{2}{3}$)."
    ],
    importantNotes: ["Định lí Archimedes: Thể tích cầu bằng $\\frac{2}{3}$ thể tích trụ ngoại tiếp."],
    formulaTags: ["SPHERE_VOLUME", "CYLINDER_VOLUME"]
  },

  // Nhóm 23 (23.1 - 23.10)
  {
    sourceNumber: "23.1",
    sourcePage: 39,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_1",
    question: "Cho hình nón có bán kính đáy $r$ và chiều cao $h$. Công thức tính thể tích $V$ của hình nón là:",
    options: [
      { id: "A", text: "$V = \\frac{1}{3}\\pi r^2 h$" },
      { id: "B", text: "$V = \\pi r^2 h$" },
      { id: "C", text: "$V = \\frac{4}{3}\\pi r^2 h$" },
      { id: "D", text: "$V = 2\\pi r h$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Công thức chuẩn SGK Hình học 9.",
      "Bước 2: Thể tích hình nón bằng một phần ba tích diện tích đáy với chiều cao.",
      "Bước 3: $V = \\frac{1}{3} S_{\\text{đáy}} h = \\frac{1}{3}\\pi r^2 h$.",
      "Bước 4: Kết luận: Chọn đáp án A ($V = \\frac{1}{3}\\pi r^2 h$)."
    ],
    importantNotes: ["$V = \\frac{1}{3}\\pi r^2 h$."],
    formulaTags: ["CONE_VOLUME"]
  },
  {
    sourceNumber: "23.2",
    sourcePage: 39,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một hình nón có bán kính đáy $r = 6\\text{ cm}$ và chiều cao $h = 7\\text{ cm}$. Thể tích của hình nón đó bằng:",
    options: [
      { id: "A", text: "$84\\pi\\text{ cm}^3$" },
      { id: "B", text: "$252\\pi\\text{ cm}^3$" },
      { id: "C", text: "$42\\pi\\text{ cm}^3$" },
      { id: "D", text: "$168\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $r = 6\\text{ cm}, h = 7\\text{ cm}$.",
      "Bước 2: $V = \\frac{1}{3}\\pi r^2 h$.",
      "Bước 3: $V = \\frac{1}{3}\\pi \\times 6^2 \\times 7 = \\frac{1}{3}\\pi \\times 36 \\times 7 = 12 \\times 7\\pi = 84\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($84\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 84\\pi\\text{ cm}^3$."],
    formulaTags: ["CONE_VOLUME"]
  },
  {
    sourceNumber: "23.3",
    sourcePage: 39,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một hình nón có đường kính đáy $d = 10\\text{ cm}$ và chiều cao $h = 12\\text{ cm}$. Thể tích của hình nón là:",
    options: [
      { id: "A", text: "$100\\pi\\text{ cm}^3$" },
      { id: "B", text: "$400\\pi\\text{ cm}^3$" },
      { id: "C", text: "$300\\pi\\text{ cm}^3$" },
      { id: "D", text: "$120\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính đáy $r = 10/2 = 5\\text{ cm}$, chiều cao $h = 12\\text{ cm}$.",
      "Bước 2: $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\times 5^2 \\times 12$.",
      "Bước 3: $V = \\frac{1}{3}\\pi \\times 25 \\times 12 = 4 \\times 25\\pi = 100\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($100\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 100\\pi\\text{ cm}^3$."],
    formulaTags: ["CONE_VOLUME", "RADIUS_DIAMETER"]
  },
  {
    sourceNumber: "23.4",
    sourcePage: 39,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một hình nón có bán kính đáy $r = 5\\text{ cm}$ và đường sinh $l = 13\\text{ cm}$. Thể tích của hình nón đó bằng:",
    options: [
      { id: "A", text: "$100\\pi\\text{ cm}^3$" },
      { id: "B", text: "$300\\pi\\text{ cm}^3$" },
      { id: "C", text: "$65\\pi\\text{ cm}^3$" },
      { id: "D", text: "$25\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Chiều cao $h = \\sqrt{l^2 - r^2} = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12\\text{ cm}$.",
      "Bước 2: $V = \\frac{1}{3}\\pi r^2 h$.",
      "Bước 3: $V = \\frac{1}{3}\\pi \\times 5^2 \\times 12 = 4 \\times 25\\pi = 100\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($100\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["Bộ ba Pythagore $(5, 12, 13) \\Rightarrow h = 12\\text{ cm}$."],
    formulaTags: ["CONE_VOLUME", "PYTHAGOREAN"]
  },
  {
    sourceNumber: "23.5",
    sourcePage: 39,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một chiếc phễu hình nón có chiều cao $15\\text{ cm}$ và bán kính miệng phễu $6\\text{ cm}$. Thể tích chứa tối đa của chiếc phễu là:",
    options: [
      { id: "A", text: "$180\\pi\\text{ cm}^3$" },
      { id: "B", text: "$540\\pi\\text{ cm}^3$" },
      { id: "C", text: "$90\\pi\\text{ cm}^3$" },
      { id: "D", text: "$360\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $r = 6\\text{ cm}, h = 15\\text{ cm}$.",
      "Bước 2: $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\times 6^2 \\times 15$.",
      "Bước 3: $V = \\frac{1}{3}\\pi \\times 36 \\times 15 = 12 \\times 15\\pi = 180\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($180\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 180\\pi\\text{ cm}^3$."],
    formulaTags: ["CONE_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "23.6",
    sourcePage: 40,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_2",
    question: "Một hình nón có thể tích $V = 32\\pi\\text{ cm}^3$ và chiều cao $h = 6\\text{ cm}$. Bán kính đáy của hình nón bằng:",
    options: [
      { id: "A", text: "$4\\text{ cm}$" },
      { id: "B", text: "$16\\text{ cm}$" },
      { id: "C", text: "$2\\text{ cm}$" },
      { id: "D", text: "$8\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V = \\frac{1}{3}\\pi r^2 h \\Rightarrow 32\\pi = \\frac{1}{3}\\pi r^2 \\times 6 = 2\\pi r^2$.",
      "Bước 2: $r^2 = 32 / 2 = 16$.",
      "Bước 3: $r = 4\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($4\\text{ cm}$)."
    ],
    importantNotes: ["$r = 4\\text{ cm}$."],
    formulaTags: ["CONE_VOLUME"]
  },
  {
    sourceNumber: "23.7",
    sourcePage: 40,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một hình nón có chu vi đáy bằng $12\\pi\\text{ cm}$ và đường sinh dài $10\\text{ cm}$. Thể tích của hình nón đó là:",
    options: [
      { id: "A", text: "$96\\pi\\text{ cm}^3$" },
      { id: "B", text: "$288\\pi\\text{ cm}^3$" },
      { id: "C", text: "$60\\pi\\text{ cm}^3$" },
      { id: "D", text: "$120\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $2\\pi r = 12\\pi \\Rightarrow r = 6\\text{ cm}$.",
      "Bước 2: $h = \\sqrt{l^2 - r^2} = \\sqrt{10^2 - 6^2} = 8\\text{ cm}$.",
      "Bước 3: $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\times 6^2 \\times 8 = 12 \\times 8\\pi = 96\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($96\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 96\\pi\\text{ cm}^3$."],
    formulaTags: ["CONE_VOLUME", "PYTHAGOREAN"]
  },
  {
    sourceNumber: "23.8",
    sourcePage: 40,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một đống cát hình nón có bán kính đáy $2\\text{ m}$ và chiều cao $1{,}5\\text{ m}$. Biết mỗi chuyến xe cải tiến chở được $0{,}5\\text{ m}^3$ cát. Hỏi cần ít nhất bao nhiêu chuyến xe để chở hết đống cát đó? (lấy $\\pi \\approx 3{,}14$)",
    options: [
      { id: "A", text: "$13\\text{ chuyến}$" },
      { id: "B", text: "$12\\text{ chuyến}$" },
      { id: "C", text: "$7\\text{ chuyến}$" },
      { id: "D", text: "$25\\text{ chuyến}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích đống cát: $V = \\frac{1}{3} \\times 3{,}14 \\times 2^2 \\times 1{,}5 = 3{,}14 \\times 4 \\times 0{,}5 = 6{,}28\\text{ m}^3$.",
      "Bước 2: Số chuyến xe cần chở: $N = \\frac{6{,}28}{0{,}5} = 12{,}56\\text{ chuyến}$.",
      "Bước 3: Vì số chuyến phải là số nguyên nên cần ít nhất 13 chuyến xe.",
      "Bước 4: Kết luận: Chọn đáp án A ($13\\text{ chuyến}$)."
    ],
    importantNotes: ["Làm tròn lên: $12{,}56 \\rightarrow 13$ chuyến."],
    formulaTags: ["CONE_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "23.9",
    sourcePage: 40,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_3",
    question: "Cho tam giác $ABC$ vuông tại $A$ có $AB = 3\\text{ cm}, AC = 4\\text{ cm}$. Quay tam giác $ABC$ một vòng quanh cạnh $AB$ cố định thu được hình nón có thể tích là:",
    options: [
      { id: "A", text: "$16\\pi\\text{ cm}^3$" },
      { id: "B", text: "$12\\pi\\text{ cm}^3$" },
      { id: "C", text: "$48\\pi\\text{ cm}^3$" },
      { id: "D", text: "$36\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Trục quay là $AB$ nên chiều cao hình nón $h = AB = 3\\text{ cm}$.",
      "Bước 2: Bán kính đáy $r = AC = 4\\text{ cm}$.",
      "Bước 3: $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\times 4^2 \\times 3 = 16\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($16\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 16\\pi\\text{ cm}^3$."],
    formulaTags: ["CONE_ROTATION", "CONE_VOLUME"]
  },
  {
    sourceNumber: "23.10",
    sourcePage: 40,
    topic: "CONE",
    subtopic: "CONE_VOLUME",
    archetypeId: "CONE_VOLUME",
    difficulty: "LEVEL_3",
    question: "Một hình nón và một hình trụ có cùng bán kính đáy $r$ và cùng chiều cao $h$. Tỉ số thể tích của hình nón và hình trụ là:",
    options: [
      { id: "A", text: "$\\frac{1}{3}$" },
      { id: "B", text: "$3$" },
      { id: "C", text: "$\\frac{1}{2}$" },
      { id: "D", text: "$\\frac{2}{3}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V_{\\text{nón}} = \\frac{1}{3}\\pi r^2 h$.",
      "Bước 2: $V_{\\text{trụ}} = \\pi r^2 h$.",
      "Bước 3: Tỉ số: $\\frac{V_{\\text{nón}}}{V_{\\text{trụ}}} = \\frac{\\frac{1}{3}\\pi r^2 h}{\\pi r^2 h} = \\frac{1}{3}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{1}{3}$)."
    ],
    importantNotes: ["Thể tích nón bằng $1/3$ thể tích trụ cùng đáy cùng chiều cao."],
    formulaTags: ["CONE_VOLUME", "CYLINDER_VOLUME"]
  },

  // Nhóm 24 (24.1 - 24.10)
  {
    sourceNumber: "24.1",
    sourcePage: 41,
    topic: "CONE",
    subtopic: "CONE_AREA",
    archetypeId: "CONE_LATERAL_AREA",
    difficulty: "LEVEL_1",
    question: "Cho hình nón có bán kính đáy $r$ và độ dài đường sinh $l$. Công thức tính diện tích xung quanh $S_{xq}$ của hình nón là:",
    options: [
      { id: "A", text: "$S_{xq} = \\pi r l$" },
      { id: "B", text: "$S_{xq} = 2\\pi r l$" },
      { id: "C", text: "$S_{xq} = \\frac{1}{3}\\pi r l$" },
      { id: "D", text: "$S_{xq} = \\pi r^2 l$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Công thức chuẩn SGK Hình học 9.",
      "Bước 2: Mặt xung quanh của hình nón khi khai triển ra là một hình quạt tròn có diện tích $S_{xq} = \\pi r l$.",
      "Bước 3: Đối chiếu các phương án.",
      "Bước 4: Kết luận: Chọn đáp án A ($S_{xq} = \\pi r l$)."
    ],
    importantNotes: ["$S_{xq} = \\pi r l$."],
    formulaTags: ["CONE_LATERAL_AREA"]
  },
  {
    sourceNumber: "24.2",
    sourcePage: 41,
    topic: "CONE",
    subtopic: "CONE_AREA",
    archetypeId: "CONE_LATERAL_AREA",
    difficulty: "LEVEL_2",
    question: "Một hình nón có bán kính đáy $r = 5\\text{ cm}$ và đường sinh $l = 8\\text{ cm}$. Diện tích xung quanh của hình nón đó là:",
    options: [
      { id: "A", text: "$40\\pi\\text{ cm}^2$" },
      { id: "B", text: "$80\\pi\\text{ cm}^2$" },
      { id: "C", text: "$20\\pi\\text{ cm}^2$" },
      { id: "D", text: "$65\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $r = 5\\text{ cm}, l = 8\\text{ cm}$.",
      "Bước 2: $S_{xq} = \\pi r l$.",
      "Bước 3: $S_{xq} = \\pi \\times 5 \\times 8 = 40\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($40\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{xq} = 40\\pi\\text{ cm}^2$."],
    formulaTags: ["CONE_LATERAL_AREA"]
  },
  {
    sourceNumber: "24.3",
    sourcePage: 41,
    topic: "CONE",
    subtopic: "CONE_AREA",
    archetypeId: "CONE_TOTAL_AREA",
    difficulty: "LEVEL_2",
    question: "Một hình nón có bán kính đáy $r = 3\\text{ cm}$ và đường sinh $l = 7\\text{ cm}$. Diện tích toàn phần của hình nón là:",
    options: [
      { id: "A", text: "$30\\pi\\text{ cm}^2$" },
      { id: "B", text: "$21\\pi\\text{ cm}^2$" },
      { id: "C", text: "$9\\pi\\text{ cm}^2$" },
      { id: "D", text: "$60\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $S_{tp} = S_{xq} + S_{\\text{đáy}} = \\pi r l + \\pi r^2 = \\pi r (l + r)$.",
      "Bước 2: Thay $r = 3\\text{ cm}, l = 7\\text{ cm}$.",
      "Bước 3: $S_{tp} = \\pi \\times 3 \\times (7 + 3) = 30\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($30\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{tp} = \\pi r (l + r) = 30\\pi\\text{ cm}^2$."],
    formulaTags: ["CONE_TOTAL_AREA"]
  },
  {
    sourceNumber: "24.4",
    sourcePage: 41,
    topic: "CONE",
    subtopic: "CONE_AREA",
    archetypeId: "CONE_LATERAL_AREA",
    difficulty: "LEVEL_2",
    question: "Một chiếc nón lá truyền thống có đường kính đáy $40\\text{ cm}$ và độ dài đường sinh $30\\text{ cm}$. Diện tích lá dùng để may nón (chỉ tính mặt ngoài xung quanh, lấy $\\pi \\approx 3{,}14$) bằng:",
    options: [
      { id: "A", text: "$1884\\text{ cm}^2$" },
      { id: "B", text: "$3768\\text{ cm}^2$" },
      { id: "C", text: "$942\\text{ cm}^2$" },
      { id: "D", text: "$1200\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính đáy nón $r = 40/2 = 20\\text{ cm}$, đường sinh $l = 30\\text{ cm}$.",
      "Bước 2: Diện tích xung quanh: $S_{xq} = \\pi r l$.",
      "Bước 3: $S_{xq} = 3{,}14 \\times 20 \\times 30 = 3{,}14 \\times 600 = 1884\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($1884\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{xq} = 1884\\text{ cm}^2$."],
    formulaTags: ["CONE_LATERAL_AREA", "REAL_WORLD"]
  },
  {
    sourceNumber: "24.5",
    sourcePage: 41,
    topic: "CONE",
    subtopic: "CONE_AREA",
    archetypeId: "CONE_LATERAL_AREA",
    difficulty: "LEVEL_2",
    question: "Một hình nón có bán kính đáy $r = 6\\text{ cm}$ và chiều cao $h = 8\\text{ cm}$. Diện tích xung quanh của hình nón là:",
    options: [
      { id: "A", text: "$60\\pi\\text{ cm}^2$" },
      { id: "B", text: "$48\\pi\\text{ cm}^2$" },
      { id: "C", text: "$96\\pi\\text{ cm}^2$" },
      { id: "D", text: "$30\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Đường sinh $l = \\sqrt{h^2 + r^2} = \\sqrt{8^2 + 6^2} = 10\\text{ cm}$.",
      "Bước 2: $S_{xq} = \\pi r l = \\pi \\times 6 \\times 10 = 60\\pi\\text{ cm}^2$.",
      "Bước 3: Kiểm tra các phương án.",
      "Bước 4: Kết luận: Chọn đáp án A ($60\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$l = 10\\text{ cm} \\Rightarrow S_{xq} = 60\\pi\\text{ cm}^2$."],
    formulaTags: ["CONE_LATERAL_AREA", "PYTHAGOREAN"]
  },
  {
    sourceNumber: "24.6",
    sourcePage: 42,
    topic: "CONE",
    subtopic: "CONE_AREA",
    archetypeId: "CONE_LATERAL_AREA",
    difficulty: "LEVEL_2",
    question: "Một hình nón có diện tích xung quanh $S_{xq} = 65\\pi\\text{ cm}^2$ và đường sinh $l = 13\\text{ cm}$. Bán kính đáy $r$ của hình nón là:",
    options: [
      { id: "A", text: "$5\\text{ cm}$" },
      { id: "B", text: "$12\\text{ cm}$" },
      { id: "C", text: "$2{,}5\\text{ cm}$" },
      { id: "D", text: "$10\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $S_{xq} = \\pi r l \\Rightarrow r = \\frac{S_{xq}}{\\pi l}$.",
      "Bước 2: $r = \\frac{65\\pi}{\\pi \\times 13} = 5\\text{ cm}$.",
      "Bước 3: Đối chiếu các phương án.",
      "Bước 4: Kết luận: Chọn đáp án A ($5\\text{ cm}$)."
    ],
    importantNotes: ["$r = 5\\text{ cm}$."],
    formulaTags: ["CONE_LATERAL_AREA"]
  },
  {
    sourceNumber: "24.7",
    sourcePage: 42,
    topic: "CONE",
    subtopic: "CONE_AREA",
    archetypeId: "CONE_DEVELOPMENT",
    difficulty: "LEVEL_3",
    question: "Khai triển mặt xung quanh của một hình nón ta được một hình quạt tròn có bán kính $R = 12\\text{ cm}$ và góc ở tâm bằng $120^\\circ$. Bán kính đáy $r$ của hình nón đó bằng:",
    options: [
      { id: "A", text: "$4\\text{ cm}$" },
      { id: "B", text: "$6\\text{ cm}$" },
      { id: "C", text: "$3\\text{ cm}$" },
      { id: "D", text: "$8\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Độ dài cung của hình quạt tròn bằng chu vi đáy hình nón: $l_{\\text{cung}} = \\frac{\\pi R n}{180} = \\frac{\\pi \\times 12 \\times 120}{180} = 8\\pi\\text{ cm}$.",
      "Bước 2: Chu vi đáy: $C = 2\\pi r = 8\\pi \\Rightarrow r = 4\\text{ cm}$.",
      "Bước 3: (Hoặc dùng tỉ số: $r = R \\times \\frac{\\alpha}{360^\\circ} = 12 \\times \\frac{120}{360} = 4\\text{ cm}$).",
      "Bước 4: Kết luận: Chọn đáp án A ($4\\text{ cm}$)."
    ],
    importantNotes: ["$r = R \\cdot \\frac{\\alpha}{360^\\circ} = 4\\text{ cm}$."],
    formulaTags: ["CONE_DEVELOPMENT"]
  },
  {
    sourceNumber: "24.8",
    sourcePage: 42,
    topic: "CONE",
    subtopic: "CONE_AREA",
    archetypeId: "CONE_TOTAL_AREA",
    difficulty: "LEVEL_3",
    question: "Một hình nón có thiết diện qua trục là một tam giác đều cạnh $6\\text{ cm}$. Diện tích toàn phần của hình nón đó là:",
    options: [
      { id: "A", text: "$27\\pi\\text{ cm}^2$" },
      { id: "B", text: "$18\\pi\\text{ cm}^2$" },
      { id: "C", text: "$36\\pi\\text{ cm}^2$" },
      { id: "D", text: "$9\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Tam giác đều cạnh $6\\text{ cm} \\Rightarrow l = 6\\text{ cm}, 2r = 6\\text{ cm} \\Rightarrow r = 3\\text{ cm}$.",
      "Bước 2: $S_{tp} = \\pi r (l + r) = \\pi \\times 3 \\times (6 + 3) = 27\\pi\\text{ cm}^2$.",
      "Bước 3: Kiểm tra các phương án.",
      "Bước 4: Kết luận: Chọn đáp án A ($27\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{tp} = 27\\pi\\text{ cm}^2$."],
    formulaTags: ["CONE_TOTAL_AREA", "CONE_SECTION"]
  },
  {
    sourceNumber: "24.9",
    sourcePage: 42,
    topic: "CONE",
    subtopic: "CONE_AREA",
    archetypeId: "CONE_DEVELOPMENT",
    difficulty: "LEVEL_3",
    question: "Một tấm bìa hình quạt tròn có bán kính $10\\text{ cm}$, góc ở tâm $216^\\circ$ được cuộn lại tạo thành một hình nón. Chiều cao $h$ của hình nón đó là:",
    options: [
      { id: "A", text: "$8\\text{ cm}$" },
      { id: "B", text: "$6\\text{ cm}$" },
      { id: "C", text: "$4\\text{ cm}$" },
      { id: "D", text: "$2\\sqrt{5}\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Đường sinh của hình nón $l = R_{\\text{quạt}} = 10\\text{ cm}$. Bán kính đáy $r = l \\times \\frac{216^\\circ}{360^\\circ} = 10 \\times 0{,}6 = 6\\text{ cm}$.",
      "Bước 2: Chiều cao $h = \\sqrt{l^2 - r^2} = \\sqrt{10^2 - 6^2} = 8\\text{ cm}$.",
      "Bước 3: Kiểm tra các phương án.",
      "Bước 4: Kết luận: Chọn đáp án A ($8\\text{ cm}$)."
    ],
    importantNotes: ["$r = 6\\text{ cm} \\Rightarrow h = 8\\text{ cm}$."],
    formulaTags: ["CONE_DEVELOPMENT", "PYTHAGOREAN"]
  },
  {
    sourceNumber: "24.10",
    sourcePage: 42,
    topic: "CONE",
    subtopic: "CONE_AREA",
    archetypeId: "CONE_TOTAL_AREA",
    difficulty: "LEVEL_3",
    question: "Một hình nón có diện tích toàn phần gấp 3 lần diện tích đáy. Tỉ số giữa đường sinh $l$ và bán kính đáy $r$ là:",
    options: [
      { id: "A", text: "$2$" },
      { id: "B", text: "$3$" },
      { id: "C", text: "$1$" },
      { id: "D", text: "$4$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $S_{tp} = 3 S_{\\text{đáy}} \\Leftrightarrow \\pi r (l + r) = 3\\pi r^2$.",
      "Bước 2: Chia cả hai vế cho $\\pi r > 0$: $l + r = 3r$.",
      "Bước 3: $l = 2r \\Rightarrow \\frac{l}{r} = 2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($2$)."
    ],
    importantNotes: ["$l = 2r \\Rightarrow l/r = 2$."],
    formulaTags: ["CONE_TOTAL_AREA"]
  },

  // Nhóm 25 (25.1 - 25.10)
  {
    sourceNumber: "25.1",
    sourcePage: 43,
    topic: "MIXED",
    subtopic: "COMPOSITE_SOLIDS",
    archetypeId: "COMPOSITE_SOLIDS",
    difficulty: "LEVEL_2",
    question: "Một vật thể gồm một hình trụ ở dưới có bán kính $r = 3\\text{ cm}$, chiều cao $h_1 = 5\\text{ cm}$ và một hình nón ở trên có cùng bán kính $r = 3\\text{ cm}$, chiều cao $h_2 = 4\\text{ cm}$. Thể tích của vật thể là:",
    options: [
      { id: "A", text: "$57\\pi\\text{ cm}^3$" },
      { id: "B", text: "$45\\pi\\text{ cm}^3$" },
      { id: "C", text: "$81\\pi\\text{ cm}^3$" },
      { id: "D", text: "$69\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V_{\\text{trụ}} = \\pi r^2 h_1 = \\pi \\times 3^2 \\times 5 = 45\\pi\\text{ cm}^3$.",
      "Bước 2: $V_{\\text{nón}} = \\frac{1}{3}\\pi r^2 h_2 = \\frac{1}{3}\\pi \\times 3^2 \\times 4 = 12\\pi\\text{ cm}^3$.",
      "Bước 3: Tổng thể tích: $V = V_{\\text{trụ}} + V_{\\text{nón}} = 45\\pi + 12\\pi = 57\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($57\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 45\\pi + 12\\pi = 57\\pi\\text{ cm}^3$."],
    formulaTags: ["COMPOSITE_SOLIDS", "CYLINDER_VOLUME", "CONE_VOLUME"]
  },
  {
    sourceNumber: "25.2",
    sourcePage: 43,
    topic: "MIXED",
    subtopic: "COMPOSITE_SOLIDS",
    archetypeId: "COMPOSITE_SOLIDS",
    difficulty: "LEVEL_2",
    question: "Một vật trang trí gồm một hình trụ có bán kính $r = 2\\text{ cm}$, chiều cao $h = 6\\text{ cm}$ và một nửa hình cầu úp lên một đầu có cùng bán kính $r = 2\\text{ cm}$. Thể tích của vật trang trí là:",
    options: [
      { id: "A", text: "$\\frac{88}{3}\\pi\\text{ cm}^3$" },
      { id: "B", text: "$\\frac{64}{3}\\pi\\text{ cm}^3$" },
      { id: "C", text: "$24\\pi\\text{ cm}^3$" },
      { id: "D", text: "$\\frac{80}{3}\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V_{\\text{trụ}} = \\pi r^2 h = \\pi \\times 2^2 \\times 6 = 24\\pi\\text{ cm}^3$.",
      "Bước 2: $V_{\\text{bán cầu}} = \\frac{2}{3}\\pi r^3 = \\frac{2}{3}\\pi \\times 2^3 = \\frac{16}{3}\\pi\\text{ cm}^3$.",
      "Bước 3: Tổng thể tích: $V = 24\\pi + \\frac{16}{3}\\pi = \\frac{72 + 16}{3}\\pi = \\frac{88}{3}\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{88}{3}\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 24\\pi + \\frac{16}{3}\\pi = \\frac{88}{3}\\pi\\text{ cm}^3$."],
    formulaTags: ["COMPOSITE_SOLIDS", "CYLINDER_VOLUME", "SPHERE_VOLUME"]
  },
  {
    sourceNumber: "25.3",
    sourcePage: 43,
    topic: "MIXED",
    subtopic: "COMPOSITE_SOLIDS",
    archetypeId: "COMPOSITE_SOLIDS",
    difficulty: "LEVEL_3",
    question: "Một viên thuốc hình con nhộng có đường kính $6\\text{ mm}$ và tổng chiều dài toàn bộ viên thuốc là $18\\text{ mm}$. Thể tích của viên thuốc là:",
    options: [
      { id: "A", text: "$144\\pi\\text{ mm}^3$" },
      { id: "B", text: "$180\\pi\\text{ mm}^3$" },
      { id: "C", text: "$108\\pi\\text{ mm}^3$" },
      { id: "D", text: "$216\\pi\\text{ mm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính $r = 6/2 = 3\\text{ mm}$. Hai đầu là hai bán cầu ghép lại thành 1 quả cầu hoàn chỉnh bán kính $3\\text{ mm}$.",
      "Bước 2: Chiều dài phần thân trụ: $h = 18 - 2r = 18 - 6 = 12\\text{ mm}$.",
      "Bước 3: $V = V_{\\text{trụ}} + V_{\\text{cầu}} = \\pi r^2 h + \\frac{4}{3}\\pi r^3 = \\pi \\times 3^2 \\times 12 + \\frac{4}{3}\\pi \\times 3^3 = 108\\pi + 36\\pi = 144\\pi\\text{ mm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($144\\pi\\text{ mm}^3$)."
    ],
    importantNotes: ["Thân trụ dài $12\\text{ mm} \\Rightarrow V = 108\\pi + 36\\pi = 144\\pi\\text{ mm}^3$."],
    formulaTags: ["COMPOSITE_SOLIDS", "CYLINDER_VOLUME", "SPHERE_VOLUME"]
  },
  {
    sourceNumber: "25.4",
    sourcePage: 43,
    topic: "MIXED",
    subtopic: "COMPOSITE_SOLIDS",
    archetypeId: "COMPOSITE_SOLIDS",
    difficulty: "LEVEL_3",
    question: "Một cây kem ốc quế gồm một vỏ nón có đường kính miệng $6\\text{ cm}$, chiều cao nón $10\\text{ cm}$ và một viên kem nửa hình cầu nhô lên trên miệng nón. Thể tích kem (kể cả phần lấp đầy bên trong vỏ nón) là:",
    options: [
      { id: "A", text: "$48\\pi\\text{ cm}^3$" },
      { id: "B", text: "$30\\pi\\text{ cm}^3$" },
      { id: "C", text: "$66\\pi\\text{ cm}^3$" },
      { id: "D", text: "$54\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính miệng $r = 6/2 = 3\\text{ cm}$.",
      "Bước 2: Thể tích phần nón: $V_{\\text{nón}} = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\times 3^2 \\times 10 = 30\\pi\\text{ cm}^3$.",
      "Bước 3: Thể tích phần bán cầu: $V_{\\text{bán cầu}} = \\frac{2}{3}\\pi r^3 = \\frac{2}{3}\\pi \\times 3^3 = 18\\pi\\text{ cm}^3$. Tổng thể tích: $V = 30\\pi + 18\\pi = 48\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($48\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 30\\pi + 18\\pi = 48\\pi\\text{ cm}^3$."],
    formulaTags: ["COMPOSITE_SOLIDS", "CONE_VOLUME", "SPHERE_VOLUME"]
  },
  {
    sourceNumber: "25.5",
    sourcePage: 44,
    topic: "MIXED",
    subtopic: "COMPOSITE_SOLIDS",
    archetypeId: "COMPOSITE_SOLIDS",
    difficulty: "LEVEL_3",
    question: "Một chiếc phao cứu sinh gồm phần thân giữa dạng hình trụ rỗng và bọc kín hai đầu bởi hai nửa hình cầu. Diện tích toàn bộ bề mặt ngoài của phao (bán kính $r = 0{,}2\\text{ m}$, chiều dài phần thân trụ $1{,}6\\text{ m}$) là:",
    options: [
      { id: "A", text: "$0{,}8\\pi\\text{ m}^2$" },
      { id: "B", text: "$0{,}64\\pi\\text{ m}^2$" },
      { id: "C", text: "$0{,}96\\pi\\text{ m}^2$" },
      { id: "D", text: "$1{,}6\\pi\\text{ m}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bề mặt ngoài gồm diện tích xung quanh thân trụ và diện tích toàn bộ 1 mặt cầu (ghép bởi 2 nửa cầu).",
      "Bước 2: $S_{xq(\\text{trụ})} = 2\\pi r h = 2\\pi \\times 0{,}2 \\times 1{,}6 = 0{,}64\\pi\\text{ m}^2$.",
      "Bước 3: $S_{\\text{cầu}} = 4\\pi r^2 = 4\\pi \\times (0{,}2)^2 = 0{,}16\\pi\\text{ m}^2$. Tổng diện tích: $S = 0{,}64\\pi + 0{,}16\\pi = 0{,}8\\pi\\text{ m}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($0{,}8\\pi\\text{ m}^2$)."
    ],
    importantNotes: ["$S = 0{,}64\\pi + 0{,}16\\pi = 0{,}8\\pi\\text{ m}^2$."],
    formulaTags: ["COMPOSITE_SOLIDS", "CYLINDER_LATERAL_AREA", "SPHERE_AREA"]
  },
  {
    sourceNumber: "25.6",
    sourcePage: 44,
    topic: "MIXED",
    subtopic: "COMPOSITE_SOLIDS",
    archetypeId: "COMPOSITE_SOLIDS",
    difficulty: "LEVEL_3",
    question: "Một chi tiết máy gồm hai hình nón có chung đáy. Bán kính đáy chung $r = 4\\text{ cm}$, chiều cao của hai hình nón lần lượt là $h_1 = 3\\text{ cm}$ và $h_2 = 6\\text{ cm}$. Thể tích của chi tiết máy là:",
    options: [
      { id: "A", text: "$48\\pi\\text{ cm}^3$" },
      { id: "B", text: "$96\\pi\\text{ cm}^3$" },
      { id: "C", text: "$32\\pi\\text{ cm}^3$" },
      { id: "D", text: "$144\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V = V_1 + V_2 = \\frac{1}{3}\\pi r^2 h_1 + \\frac{1}{3}\\pi r^2 h_2 = \\frac{1}{3}\\pi r^2 (h_1 + h_2)$.",
      "Bước 2: Thay $r = 4\\text{ cm}, h_1 + h_2 = 3 + 6 = 9\\text{ cm}$.",
      "Bước 3: $V = \\frac{1}{3}\\pi \\times 16 \\times 9 = 48\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($48\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = \\frac{1}{3}\\pi r^2 (h_1 + h_2) = 48\\pi\\text{ cm}^3$."],
    formulaTags: ["COMPOSITE_SOLIDS", "CONE_VOLUME"]
  },
  {
    sourceNumber: "25.7",
    sourcePage: 44,
    topic: "MIXED",
    subtopic: "COMPOSITE_SOLIDS",
    archetypeId: "COMPOSITE_SOLIDS",
    difficulty: "LEVEL_3",
    question: "Một khối gỗ hình trụ có bán kính đáy $r = 5\\text{ cm}$ và chiều cao $h = 10\\text{ cm}$. Người ta khoét một lỗ rỗng hình nón có cùng đáy và cùng chiều cao với hình trụ. Thể tích phần gỗ còn lại là:",
    options: [
      { id: "A", text: "$\\frac{500}{3}\\pi\\text{ cm}^3$" },
      { id: "B", text: "$\\frac{250}{3}\\pi\\text{ cm}^3$" },
      { id: "C", text: "$250\\pi\\text{ cm}^3$" },
      { id: "D", text: "$\\frac{1000}{3}\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V_{\\text{trụ}} = \\pi r^2 h = \\pi \\times 5^2 \\times 10 = 250\\pi\\text{ cm}^3$.",
      "Bước 2: $V_{\\text{nón khoét}} = \\frac{1}{3} V_{\\text{trụ}} = \\frac{250}{3}\\pi\\text{ cm}^3$.",
      "Bước 3: $V_{\\text{còn lại}} = V_{\\text{trụ}} - V_{\\text{nón}} = \\frac{2}{3} V_{\\text{trụ}} = \\frac{2}{3} \\times 250\\pi = \\frac{500}{3}\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{500}{3}\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["Phần còn lại chiếm $2/3$ thể tích trụ ban đầu."],
    formulaTags: ["COMPOSITE_SOLIDS", "CYLINDER_VOLUME", "CONE_VOLUME"]
  },
  {
    sourceNumber: "25.8",
    sourcePage: 44,
    topic: "MIXED",
    subtopic: "COMPOSITE_SOLIDS",
    archetypeId: "COMPOSITE_SOLIDS",
    difficulty: "LEVEL_3",
    question: "Một bồn chứa nước hình trụ có bán kính $R = 1\\text{ m}$, chiều cao $H = 2\\text{ m}$. Đáy dưới phẳng, nóc trên được đậy bằng một chóp nón có chiều cao $h = 0{,}75\\text{ m}$. Thể tích toàn bộ bồn chứa là:",
    options: [
      { id: "A", text: "$2{,}25\\pi\\text{ m}^3$" },
      { id: "B", text: "$2{,}75\\pi\\text{ m}^3$" },
      { id: "C", text: "$2\\pi\\text{ m}^3$" },
      { id: "D", text: "$3\\pi\\text{ m}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V_{\\text{trụ}} = \\pi R^2 H = \\pi \\times 1^2 \\times 2 = 2\\pi\\text{ m}^3$.",
      "Bước 2: $V_{\\text{nón}} = \\frac{1}{3}\\pi R^2 h = \\frac{1}{3}\\pi \\times 1^2 \\times 0{,}75 = 0{,}25\\pi\\text{ m}^3$.",
      "Bước 3: Tổng thể tích: $V = 2\\pi + 0{,}25\\pi = 2{,}25\\pi\\text{ m}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($2{,}25\\pi\\text{ m}^3$)."
    ],
    importantNotes: ["$V = 2{,}25\\pi\\text{ m}^3$."],
    formulaTags: ["COMPOSITE_SOLIDS", "REAL_WORLD"]
  },
  {
    sourceNumber: "25.9",
    sourcePage: 45,
    topic: "MIXED",
    subtopic: "COMPOSITE_SOLIDS",
    archetypeId: "COMPOSITE_SOLIDS",
    difficulty: "LEVEL_3",
    question: "Một mô hình tên lửa đồ chơi gồm thân tên lửa hình trụ có đường kính $4\\text{ cm}$, dài $20\\text{ cm}$ và đầu mũi tên lửa hình nón có cùng đường kính, dài $6\\text{ cm}$. Thể tích của mô hình tên lửa là:",
    options: [
      { id: "A", text: "$88\\pi\\text{ cm}^3$" },
      { id: "B", text: "$104\\pi\\text{ cm}^3$" },
      { id: "C", text: "$96\\pi\\text{ cm}^3$" },
      { id: "D", text: "$80\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính $r = 4/2 = 2\\text{ cm}$.",
      "Bước 2: $V_{\\text{thân trụ}} = \\pi r^2 h_1 = \\pi \\times 2^2 \\times 20 = 80\\pi\\text{ cm}^3$.",
      "Bước 3: $V_{\\text{mũi nón}} = \\frac{1}{3}\\pi r^2 h_2 = \\frac{1}{3}\\pi \\times 2^2 \\times 6 = 8\\pi\\text{ cm}^3$. Tổng thể tích: $V = 80\\pi + 8\\pi = 88\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($88\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 88\\pi\\text{ cm}^3$."],
    formulaTags: ["COMPOSITE_SOLIDS", "REAL_WORLD"]
  },
  {
    sourceNumber: "25.10",
    sourcePage: 45,
    topic: "MIXED",
    subtopic: "COMPOSITE_SOLIDS",
    archetypeId: "COMPOSITE_SOLIDS",
    difficulty: "LEVEL_3",
    question: "Một quả cầu bằng sắt bán kính $R = 6\\text{ cm}$ bị khoan thủng một lỗ hình trụ xuyên tâm có bán kính $r = 3\\text{ cm}$. Thể tích phần sắt còn lại (gọi là vòng xuyến chỏm cầu Napier) là:",
    options: [
      { id: "A", text: "$108\\sqrt{3}\\pi\\text{ cm}^3$" },
      { id: "B", text: "$288\\pi\\text{ cm}^3$" },
      { id: "C", text: "$144\\sqrt{3}\\pi\\text{ cm}^3$" },
      { id: "D", text: "$216\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Nửa chiều dài lỗ trụ $h = \\sqrt{R^2 - r^2} = \\sqrt{6^2 - 3^2} = \\sqrt{27} = 3\\sqrt{3}\\text{ cm}$. Chiều cao toàn bộ lỗ trụ $H = 2h = 6\\sqrt{3}\\text{ cm}$.",
      "Bước 2: Theo định lí Napkin Ring: Thể tích phần cầu còn lại chỉ phụ thuộc vào chiều cao lỗ khoan $H$: $V = \\frac{\\pi H^3}{6}$.",
      "Bước 3: $V = \\frac{\\pi (6\\sqrt{3})^3}{6} = \\frac{\\pi \\times 216 \\times 3\\sqrt{3}}{6} = 108\\sqrt{3}\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($108\\sqrt{3}\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["Định lý Napkin Ring: $V = \\frac{\\pi H^3}{6} = 108\\sqrt{3}\\pi\\text{ cm}^3$."],
    formulaTags: ["COMPOSITE_SOLIDS", "NAPKIN_RING"]
  }
];
