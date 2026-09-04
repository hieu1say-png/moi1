/**
 * GEOMETRY LAB - GROUPS 26 TO 30 (50 Questions)
 * Source of truth: "Câu 1(2).pdf" Pages 46 to 53
 */

module.exports = [
  // Nhóm 26 (26.1 - 26.10)
  {
    sourceNumber: "26.1",
    sourcePage: 46,
    topic: "MIXED",
    subtopic: "COMPOSITE_SOLIDS",
    archetypeId: "COMPOSITE_SOLIDS",
    difficulty: "LEVEL_2",
    question: "Một chiếc tháp nước gồm một phần hình trụ ở dưới có bán kính đáy $R = 2\\text{ m}$, chiều cao $H = 5\\text{ m}$ và một nửa hình cầu ở trên có cùng bán kính $R = 2\\text{ m}$. Dung tích tối đa của tháp nước là:",
    options: [
      { id: "A", text: "$\\frac{76}{3}\\pi\\text{ m}^3$" },
      { id: "B", text: "$\\frac{68}{3}\\pi\\text{ m}^3$" },
      { id: "C", text: "$20\\pi\\text{ m}^3$" },
      { id: "D", text: "$28\\pi\\text{ m}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V_{\\text{trụ}} = \\pi R^2 H = \\pi \\times 2^2 \\times 5 = 20\\pi\\text{ m}^3$.",
      "Bước 2: $V_{\\text{bán cầu}} = \\frac{2}{3}\\pi R^3 = \\frac{2}{3}\\pi \\times 2^3 = \\frac{16}{3}\\pi\\text{ m}^3$.",
      "Bước 3: $V_{\\text{tổng}} = 20\\pi + \\frac{16}{3}\\pi = \\frac{60 + 16}{3}\\pi = \\frac{76}{3}\\pi\\text{ m}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{76}{3}\\pi\\text{ m}^3$)."
    ],
    importantNotes: ["$V = \\frac{76}{3}\\pi\\text{ m}^3$."],
    formulaTags: ["COMPOSITE_SOLIDS", "REAL_WORLD"]
  },
  {
    sourceNumber: "26.2",
    sourcePage: 46,
    topic: "MIXED",
    subtopic: "COMPOSITE_SOLIDS",
    archetypeId: "COMPOSITE_SOLIDS",
    difficulty: "LEVEL_3",
    question: "Một chiếc phao hình trụ tròn rỗng có bán kính ngoài $R_1 = 5\\text{ dm}$, bên trong rỗng hình trụ có bán kính $R_2 = 3\\text{ dm}$, chiều cao $h = 4\\text{ dm}$. Thể tích phần vật liệu làm phao là:",
    options: [
      { id: "A", text: "$64\\pi\\text{ dm}^3$" },
      { id: "B", text: "$100\\pi\\text{ dm}^3$" },
      { id: "C", text: "$36\\pi\\text{ dm}^3$" },
      { id: "D", text: "$128\\pi\\text{ dm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Công thức thể tích hình trụ rỗng: $V = \\pi (R_1^2 - R_2^2) h$.",
      "Bước 2: Thay $R_1 = 5\\text{ dm}, R_2 = 3\\text{ dm}, h = 4\\text{ dm}$.",
      "Bước 3: $V = \\pi (5^2 - 3^2) \\times 4 = \\pi (25 - 9) \\times 4 = 16 \\times 4\\pi = 64\\pi\\text{ dm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($64\\pi\\text{ dm}^3$)."
    ],
    importantNotes: ["$V = 64\\pi\\text{ dm}^3$."],
    formulaTags: ["COMPOSITE_SOLIDS", "CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "26.3",
    sourcePage: 46,
    topic: "MIXED",
    subtopic: "COMPOSITE_SOLIDS",
    archetypeId: "COMPOSITE_SOLIDS",
    difficulty: "LEVEL_3",
    question: "Một quả bóng bàn hình cầu có đường kính $4\\text{ cm}$ nằm vừa khít bên trong một chiếc hộp hình trụ (tiếp xúc với xung quanh và hai đáy). Thể tích phần không gian trống bên trong hộp là:",
    options: [
      { id: "A", text: "$\\frac{16}{3}\\pi\\text{ cm}^3$" },
      { id: "B", text: "$\\frac{32}{3}\\pi\\text{ cm}^3$" },
      { id: "C", text: "$16\\pi\\text{ cm}^3$" },
      { id: "D", text: "$8\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính cầu $R = 2\\text{ cm} \\Rightarrow V_{\\text{cầu}} = \\frac{4}{3}\\pi \\times 2^3 = \\frac{32}{3}\\pi\\text{ cm}^3$.",
      "Bước 2: Hình trụ chứa khít có bán kính $r = 2\\text{ cm}$, chiều cao $h = 2R = 4\\text{ cm} \\Rightarrow V_{\\text{trụ}} = \\pi \\times 2^2 \\times 4 = 16\\pi\\text{ cm}^3 = \\frac{48}{3}\\pi\\text{ cm}^3$.",
      "Bước 3: Thể tích trống: $V_{\\text{trống}} = V_{\\text{trụ}} - V_{\\text{cầu}} = \\frac{48}{3}\\pi - \\frac{32}{3}\\pi = \\frac{16}{3}\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{16}{3}\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["Phần không gian trống chiếm đúng $1/3$ thể tích hình trụ."],
    formulaTags: ["COMPOSITE_SOLIDS", "CYLINDER_VOLUME", "SPHERE_VOLUME"]
  },
  {
    sourceNumber: "26.4",
    sourcePage: 46,
    topic: "MIXED",
    subtopic: "COMPOSITE_SOLIDS",
    archetypeId: "COMPOSITE_SOLIDS",
    difficulty: "LEVEL_3",
    question: "Một khối bê tông gồm một khối lập phương cạnh $20\\text{ cm}$ và một nửa hình cầu gắn trên một mặt của khối lập phương có đường kính đúng bằng cạnh khối lập phương. Thể tích toàn bộ khối bê tông (lấy $\\pi \\approx 3{,}14$) bằng:",
    options: [
      { id: "A", text: "$10093{,}33\\text{ cm}^3$" },
      { id: "B", text: "$8000\\text{ cm}^3$" },
      { id: "C", text: "$12186{,}67\\text{ cm}^3$" },
      { id: "D", text: "$9046{,}67\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích khối lập phương: $V_{\\text{lập phương}} = 20^3 = 8000\\text{ cm}^3$.",
      "Bước 2: Bán kính nửa hình cầu: $R = 20 / 2 = 10\\text{ cm}$.",
      "Bước 3: $V_{\\text{bán cầu}} = \\frac{2}{3} \\times 3{,}14 \\times 10^3 = \\frac{2000 \\times 3{,}14}{3} = \\frac{6280}{3} \\approx 2093{,}33\\text{ cm}^3$. Tổng: $V = 8000 + 2093{,}33 = 10093{,}33\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($10093{,}33\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 8000 + 2093{,}33 = 10093{,}33\\text{ cm}^3$."],
    formulaTags: ["COMPOSITE_SOLIDS", "REAL_WORLD"]
  },
  {
    sourceNumber: "26.5",
    sourcePage: 47,
    topic: "MIXED",
    subtopic: "COMPOSITE_SOLIDS",
    archetypeId: "COMPOSITE_SOLIDS",
    difficulty: "LEVEL_3",
    question: "Một hình nón có bán kính đáy $R = 6\\text{ cm}$, chiều cao $H = 8\\text{ cm}$. Người ta khoét bên trong một hình nón nhỏ ngược có cùng đỉnh và đáy song song cách đỉnh $4\\text{ cm}$. Tỉ số thể tích phần còn lại so với thể tích hình nón ban đầu là:",
    options: [
      { id: "A", text: "$\\frac{7}{8}$" },
      { id: "B", text: "$\\frac{1}{8}$" },
      { id: "C", text: "$\\frac{3}{4}$" },
      { id: "D", text: "$\\frac{1}{2}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Hình nón nhỏ đồng dạng với hình nón lớn với tỉ số đồng dạng $k = \\frac{h'}{H} = \\frac{4}{8} = \\frac{1}{2}$.",
      "Bước 2: Tỉ số thể tích: $\\frac{V_{\\text{nhỏ}}}{V} = k^3 = \\left(\\frac{1}{2}\\right)^3 = \\frac{1}{8}$.",
      "Bước 3: Phần còn lại chiếm tỉ số: $\\frac{V_{\\text{còn lại}}}{V} = 1 - \\frac{1}{8} = \\frac{7}{8}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{7}{8}$)."
    ],
    importantNotes: ["Tỉ số thể tích tỉ lệ với lập phương tỉ số đồng dạng $k^3 = 1/8$."],
    formulaTags: ["COMPOSITE_SOLIDS", "SIMILARITY"]
  },
  {
    sourceNumber: "26.6",
    sourcePage: 47,
    topic: "MIXED",
    subtopic: "COMPOSITE_SOLIDS",
    archetypeId: "COMPOSITE_SOLIDS",
    difficulty: "LEVEL_3",
    question: "Một chiếc lều có dạng hình chóp nón đặt trên một khối trụ. Phần hình trụ có bán kính đáy $1{,}5\\text{ m}$, chiều cao $2\\text{ m}$. Phần mái nón có cùng bán kính đáy và chiều cao $1\\text{ m}$. Tổng diện tích vải bạt may lều (không tính sàn lều, làm tròn 1 chữ số thập phân, lấy $\\pi \\approx 3{,}14$) là:",
    options: [
      { id: "A", text: "$27{,}3\\text{ m}^2$" },
      { id: "B", text: "$18{,}8\\text{ m}^2$" },
      { id: "C", text: "$34{,}4\\text{ m}^2$" },
      { id: "D", text: "$22{,}5\\text{ m}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Diện tích xung quanh hình trụ: $S_{1} = 2\\pi r h_1 = 2 \\times 3{,}14 \\times 1{,}5 \\times 2 = 18{,}84\\text{ m}^2$.",
      "Bước 2: Đường sinh mái nón: $l = \\sqrt{1{,}5^2 + 1^2} = \\sqrt{2{,}25 + 1} = \\sqrt{3{,}25} \\approx 1{,}8028\\text{ m}$. Diện tích xung quanh mái nón: $S_2 = \\pi r l = 3{,}14 \\times 1{,}5 \\times 1{,}8028 \\approx 8{,}49\\text{ m}^2$.",
      "Bước 3: Tổng diện tích bạt: $S = S_1 + S_2 = 18{,}84 + 8{,}49 = 27{,}33\\text{ m}^2 \\approx 27{,}3\\text{ m}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($27{,}3\\text{ m}^2$)."
    ],
    importantNotes: ["$S = 18{,}84 + 8{,}49 = 27{,}3\\text{ m}^2$."],
    formulaTags: ["COMPOSITE_SOLIDS", "REAL_WORLD"]
  },
  {
    sourceNumber: "26.7",
    sourcePage: 47,
    topic: "MIXED",
    subtopic: "COMPOSITE_SOLIDS",
    archetypeId: "COMPOSITE_SOLIDS",
    difficulty: "LEVEL_3",
    question: "Một khối gỗ hình hộp chữ nhật có kích thước $10\\text{ cm} \\times 10\\text{ cm} \\times 20\\text{ cm}$. Người ta tiện tiện gọt khối gỗ đó thành một khối trụ tròn có thể tích lớn nhất có thể. Thể tích khối trụ tiện được là:",
    options: [
      { id: "A", text: "$500\\pi\\text{ cm}^3$" },
      { id: "B", text: "$1000\\pi\\text{ cm}^3$" },
      { id: "C", text: "$250\\pi\\text{ cm}^3$" },
      { id: "D", text: "$2000\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Để thể tích hình trụ lớn nhất, đáy hình trụ nội tiếp đáy vuông $10\\text{ cm} \\times 10\\text{ cm} \\Rightarrow$ đường kính $d = 10\\text{ cm} \\Rightarrow r = 5\\text{ cm}$.",
      "Bước 2: Chiều cao hình trụ $h = 20\\text{ cm}$.",
      "Bước 3: Thể tích: $V = \\pi r^2 h = \\pi \\times 5^2 \\times 20 = 500\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($500\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$r = 5\\text{ cm}, h = 20\\text{ cm} \\Rightarrow V = 500\\pi\\text{ cm}^3$."],
    formulaTags: ["COMPOSITE_SOLIDS", "OPTIMIZATION"]
  },
  {
    sourceNumber: "26.8",
    sourcePage: 47,
    topic: "MIXED",
    subtopic: "COMPOSITE_SOLIDS",
    archetypeId: "COMPOSITE_SOLIDS",
    difficulty: "LEVEL_3",
    question: "Một bồn chứa ga gồm phần thân là hình trụ dài $6\\text{ m}$, hai đầu là hai nửa hình cầu cùng bán kính $R = 1\\text{ m}$. Thể tích của bồn chứa ga là:",
    options: [
      { id: "A", text: "$\\frac{22}{3}\\pi\\text{ m}^3$" },
      { id: "B", text: "$\\frac{20}{3}\\pi\\text{ m}^3$" },
      { id: "C", text: "$7\\pi\\text{ m}^3$" },
      { id: "D", text: "$8\\pi\\text{ m}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V_{\\text{trụ}} = \\pi R^2 h = \\pi \\times 1^2 \\times 6 = 6\\pi\\text{ m}^3$.",
      "Bước 2: Hai nửa hình cầu ghép lại thành 1 hình cầu: $V_{\\text{cầu}} = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi \\times 1^3 = \\frac{4}{3}\\pi\\text{ m}^3$.",
      "Bước 3: $V_{\\text{tổng}} = 6\\pi + \\frac{4}{3}\\pi = \\frac{18 + 4}{3}\\pi = \\frac{22}{3}\\pi\\text{ m}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{22}{3}\\pi\\text{ m}^3$)."
    ],
    importantNotes: ["$V = \\frac{22}{3}\\pi\\text{ m}^3$."],
    formulaTags: ["COMPOSITE_SOLIDS", "REAL_WORLD"]
  },
  {
    sourceNumber: "26.9",
    sourcePage: 48,
    topic: "MIXED",
    subtopic: "COMPOSITE_SOLIDS",
    archetypeId: "COMPOSITE_SOLIDS",
    difficulty: "LEVEL_3",
    question: "Một con quay gỗ gồm một hình nón có chiều cao $h = 4\\text{ cm}$, bán kính đáy $r = 3\\text{ cm}$ gắn liền với một nửa hình cầu có cùng bán kính đáy. Diện tích toàn bộ bề mặt ngoài của con quay gỗ là:",
    options: [
      { id: "A", text: "$33\\pi\\text{ cm}^2$" },
      { id: "B", text: "$24\\pi\\text{ cm}^2$" },
      { id: "C", text: "$42\\pi\\text{ cm}^2$" },
      { id: "D", text: "$15\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính $r = 3\\text{ cm}$, chiều cao nón $h = 4\\text{ cm} \\Rightarrow$ đường sinh nón $l = \\sqrt{3^2 + 4^2} = 5\\text{ cm}$.",
      "Bước 2: Diện tích xung quanh nón: $S_1 = \\pi r l = \\pi \\times 3 \\times 5 = 15\\pi\\text{ cm}^2$.",
      "Bước 3: Diện tích mặt cong bán cầu: $S_2 = 2\\pi r^2 = 2\\pi \\times 3^2 = 18\\pi\\text{ cm}^2$. Tổng diện tích bề mặt ngoài: $S = S_1 + S_2 = 15\\pi + 18\\pi = 33\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($33\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S = 15\\pi + 18\\pi = 33\\pi\\text{ cm}^2$."],
    formulaTags: ["COMPOSITE_SOLIDS", "CONE_LATERAL_AREA", "SPHERE_AREA"]
  },
  {
    sourceNumber: "26.10",
    sourcePage: 48,
    topic: "MIXED",
    subtopic: "COMPOSITE_SOLIDS",
    archetypeId: "COMPOSITE_SOLIDS",
    difficulty: "LEVEL_3",
    question: "Cho một hình trụ rỗng có bán kính đáy trong $r_1 = 4\\text{ cm}$, bán kính đáy ngoài $r_2 = 5\\text{ cm}$, chiều cao $h = 10\\text{ cm}$. Diện tích toàn phần của hình trụ rỗng này (bao gồm mặt xung quanh trong, ngoài và hai đáy vành khuyên) là:",
    options: [
      { id: "A", text: "$198\\pi\\text{ cm}^2$" },
      { id: "B", text: "$180\\pi\\text{ cm}^2$" },
      { id: "C", text: "$99\\pi\\text{ cm}^2$" },
      { id: "D", text: "$216\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $S_{xq(\\text{ngoài})} = 2\\pi r_2 h = 2\\pi \\times 5 \\times 10 = 100\\pi\\text{ cm}^2$. $S_{xq(\\text{trong})} = 2\\pi r_1 h = 2\\pi \\times 4 \\times 10 = 80\\pi\\text{ cm}^2$.",
      "Bước 2: Diện tích 2 đáy vành khuyên: $2S_{\\text{đáy}} = 2\\pi (r_2^2 - r_1^2) = 2\\pi (25 - 16) = 18\\pi\\text{ cm}^2$.",
      "Bước 3: Tổng diện tích toàn phần: $S = 100\\pi + 80\\pi + 18\\pi = 198\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($198\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S = 100\\pi + 80\\pi + 18\\pi = 198\\pi\\text{ cm}^2$."],
    formulaTags: ["COMPOSITE_SOLIDS", "CYLINDER_TOTAL_AREA"]
  },

  // Nhóm 27 (27.1 - 27.10)
  {
    sourceNumber: "27.1",
    sourcePage: 48,
    topic: "MIXED",
    subtopic: "CROSS_SECTION_RATIO",
    archetypeId: "CROSS_SECTION_RATIO",
    difficulty: "LEVEL_2",
    question: "Một hình nón có chiều cao $h$. Cắt hình nón bởi một mặt phẳng song song với đáy và đi qua trung điểm của đường cao. Tỉ số thể tích của hình nón nhỏ phía trên và hình nón ban đầu là:",
    options: [
      { id: "A", text: "$\\frac{1}{8}$" },
      { id: "B", text: "$\\frac{1}{4}$" },
      { id: "C", text: "$\\frac{1}{2}$" },
      { id: "D", text: "$\\frac{1}{16}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Tỉ số chiều cao $k = \\frac{h/2}{h} = \\frac{1}{2}$.",
      "Bước 2: Tỉ số đồng dạng giữa hình nón nhỏ và hình nón lớn là $k = \\frac{1}{2}$.",
      "Bước 3: Tỉ số thể tích: $\\frac{V_{\\text{nhỏ}}}{V_{\\text{lớn}}} = k^3 = \\left(\\frac{1}{2}\\right)^3 = \\frac{1}{8}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{1}{8}$)."
    ],
    importantNotes: ["Tỉ số thể tích = $k^3 = (1/2)^3 = 1/8$."],
    formulaTags: ["CROSS_SECTION_RATIO", "SIMILARITY"]
  },
  {
    sourceNumber: "27.2",
    sourcePage: 48,
    topic: "MIXED",
    subtopic: "CROSS_SECTION_RATIO",
    archetypeId: "CROSS_SECTION_RATIO",
    difficulty: "LEVEL_2",
    question: "Một hình nón có chiều cao $h$. Cắt hình nón bởi mặt phẳng song song với đáy và chia chiều cao theo tỉ số $1 : 2$ tính từ đỉnh. Tỉ số diện tích thiết diện và diện tích đáy hình nón là:",
    options: [
      { id: "A", text: "$\\frac{1}{9}$" },
      { id: "B", text: "$\\frac{1}{4}$" },
      { id: "C", text: "$\\frac{1}{3}$" },
      { id: "D", text: "$\\frac{1}{27}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Chiều cao hình nón nhỏ là $h' = \\frac{1}{1+2} h = \\frac{1}{3} h$.",
      "Bước 2: Tỉ số đồng dạng $k = \\frac{h'}{h} = \\frac{1}{3}$.",
      "Bước 3: Tỉ số diện tích: $\\frac{S'}{S} = k^2 = \\left(\\frac{1}{3}\\right)^2 = \\frac{1}{9}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{1}{9}$)."
    ],
    importantNotes: ["Tỉ số diện tích = $k^2 = (1/3)^2 = 1/9$."],
    formulaTags: ["CROSS_SECTION_RATIO", "SIMILARITY"]
  },
  {
    sourceNumber: "27.3",
    sourcePage: 49,
    topic: "MIXED",
    subtopic: "CROSS_SECTION_RATIO",
    archetypeId: "CROSS_SECTION_RATIO",
    difficulty: "LEVEL_3",
    question: "Một chiếc phễu hình nón chứa đầy nước. Người ta để nước chảy ra ngoài sao cho chiều cao mực nước trong phễu giảm đi một nửa. Lượng nước đã chảy ra chiếm bao nhiêu phần thể tích nước ban đầu?",
    options: [
      { id: "A", text: "$\\frac{7}{8}$" },
      { id: "B", text: "$\\frac{1}{8}$" },
      { id: "C", text: "$\\frac{1}{2}$" },
      { id: "D", text: "$\\frac{3}{4}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Khi chiều cao mực nước giảm đi một nửa, lượng nước còn lại có dạng hình nón đồng dạng với tỉ số $k = 1/2$.",
      "Bước 2: Thể tích nước còn lại: $V_{\\text{còn}} = k^3 V_0 = \\frac{1}{8} V_0$.",
      "Bước 3: Lượng nước đã chảy ra: $V_{\\text{chảy}} = V_0 - \\frac{1}{8} V_0 = \\frac{7}{8} V_0$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{7}{8}$)."
    ],
    importantNotes: ["Nước chảy ra chiếm $7/8$ tổng lượng nước."],
    formulaTags: ["CROSS_SECTION_RATIO", "REAL_WORLD"]
  },
  {
    sourceNumber: "27.4",
    sourcePage: 49,
    topic: "MIXED",
    subtopic: "CROSS_SECTION_RATIO",
    archetypeId: "CROSS_SECTION_RATIO",
    difficulty: "LEVEL_3",
    question: "Một hình nón có thể tích $V = 64\\text{ cm}^3$. Mặt phẳng $(P)$ song song với đáy cắt hình nón thành hai phần: một hình nón nhỏ phía trên và một hình nón cụt phía dưới. Biết chiều cao hình nón nhỏ bằng $\\frac{3}{4}$ chiều cao hình nón ban đầu. Thể tích hình nón cụt phía dưới là:",
    options: [
      { id: "A", text: "$37\\text{ cm}^3$" },
      { id: "B", text: "$27\\text{ cm}^3$" },
      { id: "C", text: "$48\\text{ cm}^3$" },
      { id: "D", text: "$16\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Tỉ số đồng dạng $k = \\frac{3}{4}$.",
      "Bước 2: Thể tích hình nón nhỏ phía trên: $V_{\\text{nhỏ}} = k^3 V = \\left(\\frac{3}{4}\\right)^3 \\times 64 = \\frac{27}{64} \\times 64 = 27\\text{ cm}^3$.",
      "Bước 3: Thể tích hình nón cụt phía dưới: $V_{\\text{cụt}} = V - V_{\\text{nhỏ}} = 64 - 27 = 37\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($37\\text{ cm}^3$)."
    ],
    importantNotes: ["$V_{\\text{cụt}} = 64 - 27 = 37\\text{ cm}^3$."],
    formulaTags: ["CROSS_SECTION_RATIO", "CONE_TRUNCATED"]
  },
  {
    sourceNumber: "27.5",
    sourcePage: 49,
    topic: "MIXED",
    subtopic: "CROSS_SECTION_RATIO",
    archetypeId: "CROSS_SECTION_RATIO",
    difficulty: "LEVEL_3",
    question: "Cần cắt một hình nón có chiều cao $h$ bằng một mặt phẳng song song với đáy ở vị trí cách đỉnh một khoảng bằng bao nhiêu để chia hình nón thành hai phần có thể tích bằng nhau?",
    options: [
      { id: "A", text: "$\\frac{h}{\\sqrt[3]{2}}$" },
      { id: "B", text: "$\\frac{h}{2}$" },
      { id: "C", text: "$\\frac{h}{\\sqrt{2}}$" },
      { id: "D", text: "$\\frac{h}{3}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Gọi khoảng cách từ đỉnh đến mặt cắt là $x$ ($0 < x < h$).",
      "Bước 2: Tỉ số thể tích hình nón nhỏ và lớn: $\\frac{V'}{V} = \\left(\\frac{x}{h}\\right)^3 = \\frac{1}{2}$.",
      "Bước 3: Khai căn bậc ba hai vế: $\\frac{x}{h} = \\frac{1}{\\sqrt[3]{2}} \\Rightarrow x = \\frac{h}{\\sqrt[3]{2}}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{h}{\\sqrt[3]{2}}$)."
    ],
    importantNotes: ["$x = \\frac{h}{\\sqrt[3]{2}}$."],
    formulaTags: ["CROSS_SECTION_RATIO"]
  },
  {
    sourceNumber: "27.6",
    sourcePage: 49,
    topic: "MIXED",
    subtopic: "CROSS_SECTION_RATIO",
    archetypeId: "CROSS_SECTION_RATIO",
    difficulty: "LEVEL_3",
    question: "Một hình trụ có thể tích $V$. Cắt hình trụ bởi một mặt phẳng song song với hai đáy, chia chiều cao hình trụ theo tỉ số $2 : 3$. Tỉ số thể tích của hai khối trụ tạo thành là:",
    options: [
      { id: "A", text: "$\\frac{2}{3}$" },
      { id: "B", text: "$\\frac{4}{9}$" },
      { id: "C", text: "$\\frac{8}{27}$" },
      { id: "D", text: "$\\frac{2}{5}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Hai khối trụ tạo thành có cùng diện tích đáy $S = \\pi r^2$.",
      "Bước 2: Thể tích hình trụ $V = S h$, tỉ lệ thuận bậc nhất với chiều cao.",
      "Bước 3: Tỉ số thể tích: $\\frac{V_1}{V_2} = \\frac{S h_1}{S h_2} = \\frac{h_1}{h_2} = \\frac{2}{3}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{2}{3}$)."
    ],
    importantNotes: ["Hình trụ có thiết diện đáy bằng nhau nên tỉ số thể tích bằng đúng tỉ số chiều cao."],
    formulaTags: ["CROSS_SECTION_RATIO", "CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "27.7",
    sourcePage: 50,
    topic: "MIXED",
    subtopic: "CROSS_SECTION_RATIO",
    archetypeId: "CROSS_SECTION_RATIO",
    difficulty: "LEVEL_3",
    question: "Một hình nón cụt có hai bán kính đáy lần lượt là $r_1 = 3\\text{ cm}, r_2 = 6\\text{ cm}$ và chiều cao $h = 4\\text{ cm}$. Thể tích của hình nón cụt đó là:",
    options: [
      { id: "A", text: "$84\\pi\\text{ cm}^3$" },
      { id: "B", text: "$63\\pi\\text{ cm}^3$" },
      { id: "C", text: "$252\\pi\\text{ cm}^3$" },
      { id: "D", text: "$108\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Công thức thể tích hình nón cụt: $V = \\frac{1}{3}\\pi h (r_1^2 + r_2^2 + r_1 r_2)$.",
      "Bước 2: Thay $r_1 = 3, r_2 = 6, h = 4$: $r_1^2 + r_2^2 + r_1 r_2 = 9 + 36 + 18 = 63$.",
      "Bước 3: $V = \\frac{1}{3}\\pi \\times 4 \\times 63 = 21 \\times 4\\pi = 84\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($84\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = \\frac{1}{3}\\pi h (r_1^2 + r_2^2 + r_1 r_2) = 84\\pi\\text{ cm}^3$."],
    formulaTags: ["CONE_TRUNCATED", "CONE_VOLUME"]
  },
  {
    sourceNumber: "27.8",
    sourcePage: 50,
    topic: "MIXED",
    subtopic: "CROSS_SECTION_RATIO",
    archetypeId: "CROSS_SECTION_RATIO",
    difficulty: "LEVEL_3",
    question: "Một xô đựng nước bằng tôn có dạng hình nón cụt. Bán kính miệng xô là $15\\text{ cm}$, bán kính đáy xô là $10\\text{ cm}$, đường sinh dài $13\\text{ cm}$. Chiều cao của chiếc xô là:",
    options: [
      { id: "A", text: "$12\\text{ cm}$" },
      { id: "B", text: "$5\\text{ cm}$" },
      { id: "C", text: "$8\\text{ cm}$" },
      { id: "D", text: "$10\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Xét thiết diện qua trục của hình nón cụt là hình thang cân có hai đáy là $2R_1, 2R_2$ và cạnh bên $l$.",
      "Bước 2: Độ lệch bán kính: $\\Delta r = R_1 - R_2 = 15 - 10 = 5\\text{ cm}$.",
      "Bước 3: Chiều cao: $h = \\sqrt{l^2 - (\\Delta r)^2} = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = 12\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($12\\text{ cm}$)."
    ],
    importantNotes: ["$h = \\sqrt{l^2 - (r_1 - r_2)^2} = 12\\text{ cm}$."],
    formulaTags: ["CONE_TRUNCATED", "PYTHAGOREAN"]
  },
  {
    sourceNumber: "27.9",
    sourcePage: 50,
    topic: "MIXED",
    subtopic: "CROSS_SECTION_RATIO",
    archetypeId: "CROSS_SECTION_RATIO",
    difficulty: "LEVEL_3",
    question: "Một chiếc chụp đèn có dạng hình nón cụt với bán kính hai đáy là $8\\text{ cm}$ và $14\\text{ cm}$, đường sinh dài $10\\text{ cm}$. Diện tích vải bạt may chiếc chụp đèn (diện tích xung quanh của nón cụt) là:",
    options: [
      { id: "A", text: "$220\\pi\\text{ cm}^2$" },
      { id: "B", text: "$110\\pi\\text{ cm}^2$" },
      { id: "C", text: "$440\\pi\\text{ cm}^2$" },
      { id: "D", text: "$140\\pi\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Công thức diện tích xung quanh hình nón cụt: $S_{xq} = \\pi (r_1 + r_2) l$.",
      "Bước 2: Thay $r_1 = 8\\text{ cm}, r_2 = 14\\text{ cm}, l = 10\\text{ cm}$.",
      "Bước 3: $S_{xq} = \\pi (8 + 14) \\times 10 = 22 \\times 10\\pi = 220\\pi\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($220\\pi\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_{xq} = \\pi(r_1 + r_2)l = 220\\pi\\text{ cm}^2$."],
    formulaTags: ["CONE_TRUNCATED", "CONE_LATERAL_AREA"]
  },
  {
    sourceNumber: "27.10",
    sourcePage: 50,
    topic: "MIXED",
    subtopic: "CROSS_SECTION_RATIO",
    archetypeId: "CROSS_SECTION_RATIO",
    difficulty: "LEVEL_3",
    question: "Một hình nón có bán kính đáy $R$ và chiều cao $H$. Chia chiều cao thành 3 phần bằng nhau bởi hai mặt phẳng song song với đáy. Tỉ số thể tích của 3 phần từ đỉnh xuống đáy là:",
    options: [
      { id: "A", text: "$1 : 7 : 19$" },
      { id: "B", text: "$1 : 8 : 27$" },
      { id: "C", text: "$1 : 2 : 3$" },
      { id: "D", text: "$1 : 4 : 9$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích các hình nón từ đỉnh có tỉ lệ: $V_1 = \\left(\\frac{1}{3}\\right)^3 V = \\frac{1}{27} V$; $V_{1+2} = \\left(\\frac{2}{3}\\right)^3 V = \\frac{8}{27} V$; $V_{1+2+3} = V = \\frac{27}{27} V$.",
      "Bước 2: Phần thứ nhất: $V_1 = \\frac{1}{27} V$. Phần thứ hai: $V_2 = V_{1+2} - V_1 = \\frac{8 - 1}{27} V = \\frac{7}{27} V$.",
      "Bước 3: Phần thứ ba: $V_3 = V_{1+2+3} - V_{1+2} = \\frac{27 - 8}{27} V = \\frac{19}{27} V$. Tỉ số $V_1 : V_2 : V_3 = 1 : 7 : 19$.",
      "Bước 4: Kết luận: Chọn đáp án A ($1 : 7 : 19$)."
    ],
    importantNotes: ["Tỉ số 3 phần: $1^3 : (2^3 - 1^3) : (3^3 - 2^3) = 1 : 7 : 19$."],
    formulaTags: ["CROSS_SECTION_RATIO", "SIMILARITY"]
  },

  // Nhóm 28 (28.1 - 28.10)
  {
    sourceNumber: "28.1",
    sourcePage: 51,
    topic: "MIXED",
    subtopic: "REVIEW_FORMULAS",
    archetypeId: "REVIEW_FORMULAS",
    difficulty: "LEVEL_1",
    question: "Khẳng định nào sau đây về diện tích xung quanh $S_{xq}$ của các hình khối tròn xoay là SAI?",
    options: [
      { id: "A", text: "Hình trụ: $S_{xq} = \\pi r h$." },
      { id: "B", text: "Hình trụ: $S_{xq} = 2\\pi r h$." },
      { id: "C", text: "Hình nón: $S_{xq} = \\pi r l$." },
      { id: "D", text: "Mặt cầu: $S = 4\\pi R^2$." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Rà soát công thức tính diện tích xung quanh của các hình khối tròn xoay cơ bản.",
      "Bước 2: Hình trụ có diện tích xung quanh là $S_{xq} = 2\\pi r h$. Do đó khẳng định ở câu A ($S_{xq} = \\pi r h$) là SAI.",
      "Bước 3: Khẳng định B, C, D đều đúng theo chuẩn SGK.",
      "Bước 4: Kết luận: Chọn đáp án A."
    ],
    importantNotes: ["$S_{xq}$ của hình trụ là $2\\pi r h$ (không phải $\\pi r h$)."],
    formulaTags: ["REVIEW_FORMULAS"]
  },
  {
    sourceNumber: "28.2",
    sourcePage: 51,
    topic: "MIXED",
    subtopic: "REVIEW_FORMULAS",
    archetypeId: "REVIEW_FORMULAS",
    difficulty: "LEVEL_1",
    question: "Cho hình trụ, hình nón và hình cầu có cùng bán kính $R$. Biết chiều cao hình trụ và hình nón đều bằng $2R$. Khối nào có thể tích lớn nhất?",
    options: [
      { id: "A", text: "Hình trụ." },
      { id: "B", text: "Hình cầu." },
      { id: "C", text: "Hình nón." },
      { id: "D", text: "Cả 3 khối có thể tích bằng nhau." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V_{\\text{trụ}} = \\pi R^2 (2R) = 2\\pi R^3 = \\frac{6}{3}\\pi R^3$.",
      "Bước 2: $V_{\\text{cầu}} = \\frac{4}{3}\\pi R^3$.",
      "Bước 3: $V_{\\text{nón}} = \\frac{1}{3}\\pi R^2 (2R) = \\frac{2}{3}\\pi R^3$.",
      "Bước 4: Ta thấy $2\\pi R^3 > \\frac{4}{3}\\pi R^3 > \\frac{2}{3}\\pi R^3$. Do đó hình trụ có thể tích lớn nhất. Chọn đáp án A."
    ],
    importantNotes: ["Thứ tự thể tích: $V_{\\text{trụ}} > V_{\\text{cầu}} > V_{\\text{nón}}$."],
    formulaTags: ["REVIEW_FORMULAS"]
  },
  {
    sourceNumber: "28.3",
    sourcePage: 51,
    topic: "MIXED",
    subtopic: "REVIEW_FORMULAS",
    archetypeId: "REVIEW_FORMULAS",
    difficulty: "LEVEL_2",
    question: "Khi tăng chiều cao của một hình trụ lên 2 lần và giữ nguyên bán kính đáy thì thể tích của nó tăng lên bao nhiêu lần?",
    options: [
      { id: "A", text: "$2\\text{ lần}$" },
      { id: "B", text: "$4\\text{ lần}$" },
      { id: "C", text: "$8\\text{ lần}$" },
      { id: "D", text: "Không đổi." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích hình trụ $V = \\pi r^2 h$.",
      "Bước 2: Thể tích tỉ lệ bậc nhất với chiều cao $h$.",
      "Bước 3: Khi $h' = 2h \\Rightarrow V' = \\pi r^2 (2h) = 2(\\pi r^2 h) = 2V$.",
      "Bước 4: Kết luận: Chọn đáp án A ($2\\text{ lần}$)."
    ],
    importantNotes: ["$V$ tỉ lệ bậc nhất với $h$."],
    formulaTags: ["REVIEW_FORMULAS", "CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "28.4",
    sourcePage: 51,
    topic: "MIXED",
    subtopic: "REVIEW_FORMULAS",
    archetypeId: "REVIEW_FORMULAS",
    difficulty: "LEVEL_2",
    question: "Khi tăng bán kính đáy của một hình nón lên 2 lần và giảm chiều cao đi 2 lần thì thể tích của hình nón sẽ:",
    options: [
      { id: "A", text: "Tăng 2 lần." },
      { id: "B", text: "Không đổi." },
      { id: "C", text: "Tăng 4 lần." },
      { id: "D", text: "Giảm 2 lần." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V = \\frac{1}{3}\\pi r^2 h$.",
      "Bước 2: Khi $r' = 2r$ và $h' = h / 2$.",
      "Bước 3: $V' = \\frac{1}{3}\\pi (2r)^2 \\left(\\frac{h}{2}\\right) = \\frac{1}{3}\\pi (4r^2) \\left(\\frac{h}{2}\\right) = 2 \\left(\\frac{1}{3}\\pi r^2 h\\right) = 2V$.",
      "Bước 4: Kết luận: Chọn đáp án A (Tăng 2 lần)."
    ],
    importantNotes: ["$r^2$ tăng 4 lần, $h$ giảm 2 lần $\\Rightarrow$ thể tích tăng 2 lần."],
    formulaTags: ["REVIEW_FORMULAS", "CONE_VOLUME"]
  },
  {
    sourceNumber: "28.5",
    sourcePage: 51,
    topic: "MIXED",
    subtopic: "REVIEW_FORMULAS",
    archetypeId: "REVIEW_FORMULAS",
    difficulty: "LEVEL_2",
    question: "Một hình hộp chữ nhật có ba kích thước $a, b, c$. Thể tích của hình hộp chữ nhật đó là:",
    options: [
      { id: "A", text: "$V = a b c$" },
      { id: "B", text: "$V = 2(a+b+c)$" },
      { id: "C", text: "$V = 2(ab + bc + ca)$" },
      { id: "D", text: "$V = \\frac{1}{3} a b c$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Khái niệm thể tích hình hộp chữ nhật.",
      "Bước 2: Thể tích bằng tích của ba kích thước chiều dài, chiều rộng và chiều cao.",
      "Bước 3: $V = a \\times b \\times c$.",
      "Bước 4: Kết luận: Chọn đáp án A ($V = a b c$)."
    ],
    importantNotes: ["$V = a b c$."],
    formulaTags: ["REVIEW_FORMULAS"]
  },
  {
    sourceNumber: "28.6",
    sourcePage: 52,
    topic: "MIXED",
    subtopic: "REVIEW_FORMULAS",
    archetypeId: "REVIEW_FORMULAS",
    difficulty: "LEVEL_2",
    question: "Diện tích toàn phần của một khối lập phương có cạnh $a$ là:",
    options: [
      { id: "A", text: "$S_{tp} = 6a^2$" },
      { id: "B", text: "$S_{tp} = 4a^2$" },
      { id: "C", text: "$S_{tp} = a^3$" },
      { id: "D", text: "$S_{tp} = 12a$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Khối lập phương có 6 mặt đều là các hình vuông bằng nhau cạnh $a$.",
      "Bước 2: Diện tích 1 mặt: $S_1 = a^2$.",
      "Bước 3: Diện tích toàn phần bằng tổng diện tích 6 mặt: $S_{tp} = 6a^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($S_{tp} = 6a^2$)."
    ],
    importantNotes: ["$S_{tp} = 6a^2$."],
    formulaTags: ["REVIEW_FORMULAS"]
  },
  {
    sourceNumber: "28.7",
    sourcePage: 52,
    topic: "MIXED",
    subtopic: "REVIEW_FORMULAS",
    archetypeId: "REVIEW_FORMULAS",
    difficulty: "LEVEL_3",
    question: "Một bể nước hình hộp chữ nhật có kích thước đáy là $2\\text{ m} \\times 1{,}5\\text{ m}$ và chiều cao $1\\text{ m}$. Người ta dùng nước trong bể để đổ đầy các bình hình trụ có bán kính đáy $0{,}1\\text{ m}$ và chiều cao $0{,}3\\text{ m}$. Số bình hình trụ tối đa có thể đổ đầy (lấy $\\pi \\approx 3{,}14$) là:",
    options: [
      { id: "A", text: "$318\\text{ bình}$" },
      { id: "B", text: "$100\\text{ bình}$" },
      { id: "C", text: "$636\\text{ bình}$" },
      { id: "D", text: "$31\\text{ bình}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích bể nước: $V_{\\text{bể}} = 2 \\times 1{,}5 \\times 1 = 3\\text{ m}^3$.",
      "Bước 2: Thể tích một bình hình trụ: $V_{\\text{bình}} = \\pi r^2 h = 3{,}14 \\times 0{,}1^2 \\times 0{,}3 = 3{,}14 \\times 0{,}01 \\times 0{,}3 = 0{,}00942\\text{ m}^3$.",
      "Bước 3: Số bình: $N = \\frac{3}{0{,}00942} \\approx 318{,}47$. Vậy tối đa đổ đầy được 318 bình.",
      "Bước 4: Kết luận: Chọn đáp án A ($318\\text{ bình}$)."
    ],
    importantNotes: ["$N = \\lfloor 3 / 0{,}00942 \\rfloor = 318$ bình."],
    formulaTags: ["REVIEW_FORMULAS", "REAL_WORLD"]
  },
  {
    sourceNumber: "28.8",
    sourcePage: 52,
    topic: "MIXED",
    subtopic: "REVIEW_FORMULAS",
    archetypeId: "REVIEW_FORMULAS",
    difficulty: "LEVEL_3",
    question: "Cho một khối cầu bán kính $R$. Cắt khối cầu bởi một mặt phẳng đi qua tâm thành hai nửa bán cầu. Tổng diện tích toàn phần của hai nửa bán cầu này so với diện tích mặt cầu ban đầu thì:",
    options: [
      { id: "A", text: "Tăng thêm $50\\%$ (bằng $1{,}5$ lần diện tích ban đầu)." },
      { id: "B", text: "Không đổi." },
      { id: "C", text: "Tăng gấp đôi." },
      { id: "D", text: "Tăng thêm $25\\%$." }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Diện tích mặt cầu ban đầu: $S_0 = 4\\pi R^2$.",
      "Bước 2: Khi cắt thành 2 bán cầu, xuất hiện thêm 2 mặt đáy hình tròn có bán kính $R$. Diện tích 2 mặt phẳng này là: $2 \\times \\pi R^2 = 2\\pi R^2$.",
      "Bước 3: Tổng diện tích toàn phần của 2 bán cầu: $S = 4\\pi R^2 + 2\\pi R^2 = 6\\pi R^2 = 1{,}5 S_0$ (tăng thêm $50\\%$).",
      "Bước 4: Kết luận: Chọn đáp án A."
    ],
    importantNotes: ["Xuất hiện thêm 2 mặt tròn lớn làm tổng diện tích tăng $50\\%$ ($6\\pi R^2$)."],
    formulaTags: ["REVIEW_FORMULAS", "SPHERE_AREA"]
  },
  {
    sourceNumber: "28.9",
    sourcePage: 52,
    topic: "MIXED",
    subtopic: "REVIEW_FORMULAS",
    archetypeId: "REVIEW_FORMULAS",
    difficulty: "LEVEL_3",
    question: "Một hình lập phương có thể tích bằng $64\\text{ cm}^3$. Bán kính của mặt cầu nội tiếp hình lập phương đó bằng:",
    options: [
      { id: "A", text: "$2\\text{ cm}$" },
      { id: "B", text: "$4\\text{ cm}$" },
      { id: "C", text: "$2\\sqrt{3}\\text{ cm}$" },
      { id: "D", text: "$1\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Cạnh khối lập phương: $a = \\sqrt[3]{64} = 4\\text{ cm}$.",
      "Bước 2: Mặt cầu nội tiếp hình lập phương tiếp xúc với 6 mặt, có đường kính bằng đúng cạnh hình lập phương: $2R = a = 4\\text{ cm}$.",
      "Bước 3: Bán kính mặt cầu nội tiếp: $R = 4 / 2 = 2\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($2\\text{ cm}$)."
    ],
    importantNotes: ["Mặt cầu nội tiếp lập phương có $R = a/2 = 2\\text{ cm}$."],
    formulaTags: ["REVIEW_FORMULAS", "INSCRIBED_SPHERE"]
  },
  {
    sourceNumber: "28.10",
    sourcePage: 52,
    topic: "MIXED",
    subtopic: "REVIEW_FORMULAS",
    archetypeId: "REVIEW_FORMULAS",
    difficulty: "LEVEL_3",
    question: "Một hình lập phương có cạnh $a = 6\\text{ cm}$. Bán kính của mặt cầu ngoại tiếp hình lập phương đó bằng:",
    options: [
      { id: "A", text: "$3\\sqrt{3}\\text{ cm}$" },
      { id: "B", text: "$3\\text{ cm}$" },
      { id: "C", text: "$6\\sqrt{3}\\text{ cm}$" },
      { id: "D", text: "$3\\sqrt{2}\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Mặt cầu ngoại tiếp hình lập phương đi qua 8 đỉnh của hình lập phương.",
      "Bước 2: Đường kính mặt cầu ngoại tiếp bằng đúng độ dài đường chéo chính của hình lập phương: $2R = d = a\\sqrt{3}$.",
      "Bước 3: Bán kính: $R = \\frac{a\\sqrt{3}}{2} = \\frac{6\\sqrt{3}}{2} = 3\\sqrt{3}\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($3\\sqrt{3}\\text{ cm}$)."
    ],
    importantNotes: ["Mặt cầu ngoại tiếp lập phương có $R = \\frac{a\\sqrt{3}}{2} = 3\\sqrt{3}\\text{ cm}$."],
    formulaTags: ["REVIEW_FORMULAS", "CIRCUMSCRIBED_SPHERE"]
  },

  // Nhóm 29 (29.1 - 29.10)
  {
    sourceNumber: "29.1",
    sourcePage: 53,
    topic: "MIXED",
    subtopic: "EXAM_PREP",
    archetypeId: "EXAM_PREP",
    difficulty: "LEVEL_2",
    question: "Một hộp sữa chua bằng giấy có dạng hình nón cụt có đường kính miệng $8\\text{ cm}$, đường kính đáy $6\\text{ cm}$ và chiều cao $7\\text{ cm}$. Thể tích của hộp sữa chua (lấy $\\pi \\approx 3{,}14$) bằng:",
    options: [
      { id: "A", text: "$271\\text{ cm}^3$" },
      { id: "B", text: "$352\\text{ cm}^3$" },
      { id: "C", text: "$180\\text{ cm}^3$" },
      { id: "D", text: "$220\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính hai đáy $r_1 = 8/2 = 4\\text{ cm}, r_2 = 6/2 = 3\\text{ cm}, h = 7\\text{ cm}$.",
      "Bước 2: $V = \\frac{1}{3}\\pi h (r_1^2 + r_2^2 + r_1 r_2) = \\frac{1}{3} \\times 3{,}14 \\times 7 \\times (16 + 9 + 12) = \\frac{1}{3} \\times 3{,}14 \\times 7 \\times 37$.",
      "Bước 3: $V = \\frac{813{,}26}{3} \\approx 271{,}09\\text{ cm}^3 \\approx 271\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($271\\text{ cm}^3$)."
    ],
    importantNotes: ["$V \\approx 271\\text{ cm}^3$."],
    formulaTags: ["EXAM_PREP", "CONE_TRUNCATED", "REAL_WORLD"]
  },
  {
    sourceNumber: "29.2",
    sourcePage: 53,
    topic: "MIXED",
    subtopic: "EXAM_PREP",
    archetypeId: "EXAM_PREP",
    difficulty: "LEVEL_2",
    question: "Một lon nước ngọt hình trụ có thể tích $330\\text{ ml}$ ($330\\text{ cm}^3$) và đường kính đáy $6\\text{ cm}$. Chiều cao của lon nước ngọt (lấy $\\pi \\approx 3{,}14$, làm tròn đến hàng phần mười) là:",
    options: [
      { id: "A", text: "$11{,}7\\text{ cm}$" },
      { id: "B", text: "$12{,}5\\text{ cm}$" },
      { id: "C", text: "$10{,}2\\text{ cm}$" },
      { id: "D", text: "$14{,}1\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Bán kính đáy $r = 6/2 = 3\\text{ cm}$.",
      "Bước 2: $V = \\pi r^2 h \\Rightarrow 330 = 3{,}14 \\times 3^2 \\times h = 28{,}26 \\times h$.",
      "Bước 3: $h = \\frac{330}{28{,}26} \\approx 11{,}677\\text{ cm} \\approx 11{,}7\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($11{,}7\\text{ cm}$)."
    ],
    importantNotes: ["$h \\approx 11{,}7\\text{ cm}$."],
    formulaTags: ["EXAM_PREP", "CYLINDER_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "29.3",
    sourcePage: 53,
    topic: "MIXED",
    subtopic: "EXAM_PREP",
    archetypeId: "EXAM_PREP",
    difficulty: "LEVEL_3",
    question: "Người ta muốn làm một chiếc chụp đèn bằng vải hình nón có chiều cao $24\\text{ cm}$ và bán kính đáy $10\\text{ cm}$. Hỏi diện tích vải tối thiểu cần dùng là bao nhiêu? (không kể mép may, lấy $\\pi \\approx 3{,}14$)",
    options: [
      { id: "A", text: "$816{,}4\\text{ cm}^2$" },
      { id: "B", text: "$753{,}6\\text{ cm}^2$" },
      { id: "C", text: "$1632{,}8\\text{ cm}^2$" },
      { id: "D", text: "$408{,}2\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Đường sinh của hình nón: $l = \\sqrt{h^2 + r^2} = \\sqrt{24^2 + 10^2} = \\sqrt{576 + 100} = \\sqrt{676} = 26\\text{ cm}$.",
      "Bước 2: Diện tích xung quanh: $S_{xq} = \\pi r l$.",
      "Bước 3: $S_{xq} = 3{,}14 \\times 10 \\times 26 = 816{,}4\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($816{,}4\\text{ cm}^2$)."
    ],
    importantNotes: ["$l = 26\\text{ cm} \\Rightarrow S_{xq} = 816{,}4\\text{ cm}^2$."],
    formulaTags: ["EXAM_PREP", "CONE_LATERAL_AREA", "REAL_WORLD"]
  },
  {
    sourceNumber: "29.4",
    sourcePage: 53,
    topic: "MIXED",
    subtopic: "EXAM_PREP",
    archetypeId: "EXAM_PREP",
    difficulty: "LEVEL_3",
    question: "Một khối cầu bằng kim loại có bán kính $R = 3\\text{ cm}$ được thả vào một bình nước hình trụ có bán kính đáy $R_0 = 6\\text{ cm}$. Biết viên bi chìm hoàn toàn trong nước và nước không tràn. Hỏi mực nước trong bình dâng lên bao nhiêu?",
    options: [
      { id: "A", text: "$1\\text{ cm}$" },
      { id: "B", text: "$0{,}5\\text{ cm}$" },
      { id: "C", text: "$2\\text{ cm}$" },
      { id: "D", text: "$1{,}5\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V_{\\text{cầu}} = \\frac{4}{3}\\pi \\times 3^3 = 36\\pi\\text{ cm}^3$.",
      "Bước 2: $V_{\\text{dâng}} = \\pi \\times 6^2 \\times h = 36\\pi h$.",
      "Bước 3: $36\\pi h = 36\\pi \\Rightarrow h = 1\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($1\\text{ cm}$)."
    ],
    importantNotes: ["$h = 1\\text{ cm}$."],
    formulaTags: ["EXAM_PREP", "WATER_DISPLACEMENT"]
  },
  {
    sourceNumber: "29.5",
    sourcePage: 54,
    topic: "MIXED",
    subtopic: "EXAM_PREP",
    archetypeId: "EXAM_PREP",
    difficulty: "LEVEL_3",
    question: "Một phễu hình nón có chiều cao $16\\text{ cm}$, bán kính đáy $12\\text{ cm}$ chứa đầy nước. Người ta rót toàn bộ nước từ phễu sang một bình hình trụ có bán kính đáy $8\\text{ cm}$. Chiều cao mực nước trong bình hình trụ là:",
    options: [
      { id: "A", text: "$12\\text{ cm}$" },
      { id: "B", text: "$8\\text{ cm}$" },
      { id: "C", text: "$16\\text{ cm}$" },
      { id: "D", text: "$24\\text{ cm}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích nước trong phễu nón: $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\times 12^2 \\times 16 = \\frac{1}{3}\\pi \\times 144 \\times 16 = 768\\pi\\text{ cm}^3$.",
      "Bước 2: Thể tích nước trong hình trụ có chiều cao mực nước $H$: $V = \\pi R^2 H = \\pi \\times 8^2 \\times H = 64\\pi H$.",
      "Bước 3: $64\\pi H = 768\\pi \\Rightarrow H = \\frac{768}{64} = 12\\text{ cm}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($12\\text{ cm}$)."
    ],
    importantNotes: ["$H = 12\\text{ cm}$."],
    formulaTags: ["EXAM_PREP", "CONE_VOLUME", "CYLINDER_VOLUME"]
  },
  {
    sourceNumber: "29.6",
    sourcePage: 54,
    topic: "MIXED",
    subtopic: "EXAM_PREP",
    archetypeId: "EXAM_PREP",
    difficulty: "LEVEL_3",
    question: "Một chiếc lều bạt có dạng hình chóp tứ giác đều có cạnh đáy $2\\text{ m}$ và chiều cao của mặt bên kẻ từ đỉnh chóp bằng $2{,}5\\text{ m}$. Diện tích bạt cần dùng để dựng lều (chỉ tính 4 mặt bên) là:",
    options: [
      { id: "A", text: "$10\\text{ m}^2$" },
      { id: "B", text: "$5\\text{ m}^2$" },
      { id: "C", text: "$20\\text{ m}^2$" },
      { id: "D", text: "$14\\text{ m}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Hình chóp tứ giác đều có 4 mặt bên là 4 tam giác cân bằng nhau.",
      "Bước 2: Diện tích 1 mặt bên: $S_1 = \\frac{1}{2} \\times \\text{cạnh đáy} \\times \\text{chiều cao mặt bên} = \\frac{1}{2} \\times 2 \\times 2{,}5 = 2{,}5\\text{ m}^2$.",
      "Bước 3: Diện tích 4 mặt bên: $S_{xq} = 4 \\times 2{,}5 = 10\\text{ m}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($10\\text{ m}^2$)."
    ],
    importantNotes: ["$S_{xq} = 4 \\times 2{,}5 = 10\\text{ m}^2$."],
    formulaTags: ["EXAM_PREP", "PYRAMID_AREA"]
  },
  {
    sourceNumber: "29.7",
    sourcePage: 54,
    topic: "MIXED",
    subtopic: "EXAM_PREP",
    archetypeId: "EXAM_PREP",
    difficulty: "LEVEL_3",
    question: "Một chi tiết máy gồm hai hình trụ đặc đồng trục ghép liền nhau: hình trụ lớn có bán kính $R_1 = 4\\text{ cm}$, cao $h_1 = 6\\text{ cm}$; hình trụ nhỏ có bán kính $R_2 = 2\\text{ cm}$, cao $h_2 = 4\\text{ cm}$. Khối lượng của chi tiết máy là bao nhiêu nếu khối lượng riêng kim loại là $7{,}8\\text{ g/cm}^3$? (lấy $\\pi \\approx 3{,}14$, làm tròn đến gam)",
    options: [
      { id: "A", text: "$2743\\text{ g}$" },
      { id: "B", text: "$1372\\text{ g}$" },
      { id: "C", text: "$3512\\text{ g}$" },
      { id: "D", text: "$2150\\text{ g}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $V_1 = \\pi R_1^2 h_1 = 3{,}14 \\times 16 \\times 6 = 301{,}44\\text{ cm}^3$.",
      "Bước 2: $V_2 = \\pi R_2^2 h_2 = 3{,}14 \\times 4 \\times 4 = 50{,}24\\text{ cm}^3$. Tổng thể tích: $V = 351{,}68\\text{ cm}^3$.",
      "Bước 3: Khối lượng: $m = D \\times V = 7{,}8 \\times 351{,}68 = 2743{,}104\\text{ g} \\approx 2743\\text{ g}$.",
      "Bước 4: Kết luận: Chọn đáp án A ($2743\\text{ g}$)."
    ],
    importantNotes: ["$m = 7{,}8 \\times 351{,}68 \\approx 2743\\text{ g}$."],
    formulaTags: ["EXAM_PREP", "COMPOSITE_SOLIDS", "REAL_WORLD"]
  },
  {
    sourceNumber: "29.8",
    sourcePage: 54,
    topic: "MIXED",
    subtopic: "EXAM_PREP",
    archetypeId: "EXAM_PREP",
    difficulty: "LEVEL_3",
    question: "Một quả bóng đá tiêu chuẩn số 5 dùng trong thi đấu chính thức có chu vi đường tròn lớn khoảng $68{,}5\\text{ cm}$. Thể tích của quả bóng đá đó (lấy $\\pi \\approx 3{,}14$, làm tròn đến $\\text{cm}^3$) bằng:",
    options: [
      { id: "A", text: "$5440\\text{ cm}^3$" },
      { id: "B", text: "$2720\\text{ cm}^3$" },
      { id: "C", text: "$7250\\text{ cm}^3$" },
      { id: "D", text: "$4350\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Chu vi đường tròn lớn: $C = 2\\pi R = 68{,}5\\text{ cm} \\Rightarrow R = \\frac{68{,}5}{2 \\times 3{,}14} = \\frac{68{,}5}{6{,}28} \\approx 10{,}9076\\text{ cm}$.",
      "Bước 2: $V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3} \\times 3{,}14 \\times (10{,}9076)^3 \\approx 4{,}1888 \\times 1297{,}78 \\approx 5436\\text{ cm}^3 \\approx 5440\\text{ cm}^3$.",
      "Bước 3: Đối chiếu với các phương án.",
      "Bước 4: Kết luận: Chọn đáp án A ($5440\\text{ cm}^3$)."
    ],
    importantNotes: ["$V \\approx 5440\\text{ cm}^3$."],
    formulaTags: ["EXAM_PREP", "SPHERE_VOLUME", "REAL_WORLD"]
  },
  {
    sourceNumber: "29.9",
    sourcePage: 55,
    topic: "MIXED",
    subtopic: "EXAM_PREP",
    archetypeId: "EXAM_PREP",
    difficulty: "LEVEL_3",
    question: "Một chiếc cốc hình nón cụt đựng đầy nước. Người ta bỏ vào cốc một viên bi sắt hình cầu thì thấy nước tràn ra ngoài đúng bằng một nửa thể tích của cốc nước ban đầu. Tỉ số giữa thể tích viên bi và thể tích cốc là:",
    options: [
      { id: "A", text: "$\\frac{1}{2}$" },
      { id: "B", text: "$1$" },
      { id: "C", text: "$\\frac{1}{3}$" },
      { id: "D", text: "$\\frac{2}{3}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Theo nguyên lí Archimedes, thể tích nước tràn ra ngoài bằng thể tích phần viên bi chìm trong nước.",
      "Bước 2: Vì viên bi chìm hoàn toàn trong cốc nên thể tích viên bi bằng thể tích nước tràn ra.",
      "Bước 3: Đề bài cho thể tích nước tràn ra bằng $\\frac{1}{2}$ thể tích cốc. Do đó $V_{\\text{bi}} / V_{\\text{cốc}} = 1/2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{1}{2}$)."
    ],
    importantNotes: ["Thể tích nước tràn = thể tích bi = $1/2$ thể tích cốc."],
    formulaTags: ["EXAM_PREP", "WATER_DISPLACEMENT"]
  },
  {
    sourceNumber: "29.10",
    sourcePage: 55,
    topic: "MIXED",
    subtopic: "EXAM_PREP",
    archetypeId: "EXAM_PREP",
    difficulty: "LEVEL_3",
    question: "Một chiếc đồng hồ cát gồm hai hình nón bằng nhau chung đỉnh nối thông với nhau, mỗi hình nón có bán kính đáy $r = 3\\text{ cm}$ và chiều cao $h = 4\\text{ cm}$. Toàn bộ lượng cát ban đầu chứa đầy ở ngăn nón phía trên. Cát chảy đều qua eo giữa với tốc độ $0{,}5\\text{ cm}^3/\\text{giây}$. Sau bao lâu thì toàn bộ cát chảy hết xuống ngăn dưới? (lấy $\\pi \\approx 3{,}14$)",
    options: [
      { id: "A", text: "$75{,}36\\text{ giây}$" },
      { id: "B", text: "$37{,}68\\text{ giây}$" },
      { id: "C", text: "$150\\text{ giây}$" },
      { id: "D", text: "$60\\text{ giây}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích cát trong ngăn trên (hình nón): $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} \\times 3{,}14 \\times 3^2 \\times 4 = 3{,}14 \\times 3 \\times 4 = 37{,}68\\text{ cm}^3$.",
      "Bước 2: Thời gian cát chảy hết: $t = \\frac{V}{v} = \\frac{37{,}68}{0{,}5} = 75{,}36\\text{ giây}$.",
      "Bước 3: Kiểm tra kết quả.",
      "Bước 4: Kết luận: Chọn đáp án A ($75{,}36\\text{ giây}$)."
    ],
    importantNotes: ["$t = 37{,}68 / 0{,}5 = 75{,}36\\text{ giây}$."],
    formulaTags: ["EXAM_PREP", "CONE_VOLUME", "REAL_WORLD"]
  },

  // Nhóm 30 (30.1 - 30.10)
  {
    sourceNumber: "30.1",
    sourcePage: 55,
    topic: "MIXED",
    subtopic: "ADVANCED_PROBLEMS",
    archetypeId: "ADVANCED_PROBLEMS",
    difficulty: "LEVEL_3",
    question: "Cho hình chữ nhật $ABCD$ có $AB = a, BC = 2a$. Khi quay hình chữ nhật quanh đường trung trực của cạnh $BC$ một góc $360^\\circ$ ta được một hình trụ. Thể tích hình trụ đó là:",
    options: [
      { id: "A", text: "$\\pi a^3$" },
      { id: "B", text: "$2\\pi a^3$" },
      { id: "C", text: "$4\\pi a^3$" },
      { id: "D", text: "$\\frac{1}{2}\\pi a^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Đường trung trực của cạnh $BC$ song song với $AB$, có chiều dài bằng $AB = a$.",
      "Bước 2: Khoảng cách từ trục quay đến hai cạnh $AB$ và $CD$ là bán kính đáy: $r = BC / 2 = 2a / 2 = a$. Chiều cao $h = AB = a$.",
      "Bước 3: Thể tích: $V = \\pi r^2 h = \\pi \\times a^2 \\times a = \\pi a^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\pi a^3$)."
    ],
    importantNotes: ["$r = a, h = a \\Rightarrow V = \\pi a^3$."],
    formulaTags: ["ADVANCED_PROBLEMS", "CYLINDER_ROTATION"]
  },
  {
    sourceNumber: "30.2",
    sourcePage: 56,
    topic: "MIXED",
    subtopic: "ADVANCED_PROBLEMS",
    archetypeId: "ADVANCED_PROBLEMS",
    difficulty: "LEVEL_3",
    question: "Một hình nón có thiết diện qua trục là một tam giác đều có diện tích bằng $9\\sqrt{3}\\text{ cm}^2$. Thể tích của hình nón đó bằng:",
    options: [
      { id: "A", text: "$9\\sqrt{3}\\pi\\text{ cm}^3$" },
      { id: "B", text: "$27\\pi\\text{ cm}^3$" },
      { id: "C", text: "$18\\sqrt{3}\\pi\\text{ cm}^3$" },
      { id: "D", text: "$9\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Diện tích tam giác đều cạnh $x$: $S = \\frac{x^2\\sqrt{3}}{4} = 9\\sqrt{3} \\Rightarrow x^2 = 36 \\Rightarrow x = 6\\text{ cm}$.",
      "Bước 2: Cạnh $x$ là đường kính đáy $\\Rightarrow r = 3\\text{ cm}$. Đường cao $h = \\frac{x\\sqrt{3}}{2} = 3\\sqrt{3}\\text{ cm}$.",
      "Bước 3: $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\times 3^2 \\times 3\\sqrt{3} = 9\\sqrt{3}\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($9\\sqrt{3}\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = 9\\sqrt{3}\\pi\\text{ cm}^3$."],
    formulaTags: ["ADVANCED_PROBLEMS", "CONE_VOLUME", "CONE_SECTION"]
  },
  {
    sourceNumber: "30.3",
    sourcePage: 56,
    topic: "MIXED",
    subtopic: "ADVANCED_PROBLEMS",
    archetypeId: "ADVANCED_PROBLEMS",
    difficulty: "LEVEL_3",
    question: "Một hình trụ nội tiếp bên trong một hình cầu bán kính $R = 5\\text{ cm}$. Biết chiều cao của hình trụ là $h = 6\\text{ cm}$. Thể tích của hình trụ đó là:",
    options: [
      { id: "A", text: "$96\\pi\\text{ cm}^3$" },
      { id: "B", text: "$150\\pi\\text{ cm}^3$" },
      { id: "C", text: "$48\\pi\\text{ cm}^3$" },
      { id: "D", text: "$72\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Mối quan hệ hình trụ nội tiếp hình cầu: $R^2 = r^2 + \\left(\\frac{h}{2}\\right)^2$.",
      "Bước 2: $5^2 = r^2 + 3^2 \\Rightarrow r^2 = 25 - 9 = 16 \\Rightarrow r = 4\\text{ cm}$.",
      "Bước 3: Thể tích hình trụ: $V = \\pi r^2 h = \\pi \\times 16 \\times 6 = 96\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($96\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$r^2 = R^2 - (h/2)^2 = 16 \\Rightarrow V = 96\\pi\\text{ cm}^3$."],
    formulaTags: ["ADVANCED_PROBLEMS", "INSCRIBED_CYLINDER"]
  },
  {
    sourceNumber: "30.4",
    sourcePage: 56,
    topic: "MIXED",
    subtopic: "ADVANCED_PROBLEMS",
    archetypeId: "ADVANCED_PROBLEMS",
    difficulty: "LEVEL_3",
    question: "Một hình nón nội tiếp bên trong một hình cầu bán kính $R = 5\\text{ cm}$. Biết đáy hình nón đi qua tâm của hình cầu. Thể tích của hình nón đó là:",
    options: [
      { id: "A", text: "$\\frac{125}{3}\\pi\\text{ cm}^3$" },
      { id: "B", text: "$\\frac{250}{3}\\pi\\text{ cm}^3$" },
      { id: "C", text: "$25\\pi\\text{ cm}^3$" },
      { id: "D", text: "$75\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Đáy hình nón đi qua tâm hình cầu nên bán kính đáy nón $r = R = 5\\text{ cm}$.",
      "Bước 2: Đỉnh nón nằm trên mặt cầu nên chiều cao nón $h = R = 5\\text{ cm}$.",
      "Bước 3: $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\times 5^2 \\times 5 = \\frac{125}{3}\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($\\frac{125}{3}\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["$V = \\frac{125}{3}\\pi\\text{ cm}^3$."],
    formulaTags: ["ADVANCED_PROBLEMS", "INSCRIBED_CONE"]
  },
  {
    sourceNumber: "30.5",
    sourcePage: 56,
    topic: "MIXED",
    subtopic: "ADVANCED_PROBLEMS",
    archetypeId: "ADVANCED_PROBLEMS",
    difficulty: "LEVEL_3",
    question: "Một chiếc lều hình nón được dựng từ một tấm bạt hình bán nguyệt (nửa hình tròn) có bán kính $R = 4\\text{ m}$. Diện tích mặt sàn tròn của chiếc lều đó bằng:",
    options: [
      { id: "A", text: "$4\\pi\\text{ m}^2$" },
      { id: "B", text: "$8\\pi\\text{ m}^2$" },
      { id: "C", text: "$2\\pi\\text{ m}^2$" },
      { id: "D", text: "$16\\pi\\text{ m}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Đường sinh lều nón $l = R = 4\\text{ m}$. Góc quạt $\\alpha = 180^\\circ$.",
      "Bước 2: Bán kính đáy lều: $r = l \\times \\frac{180^\\circ}{360^\\circ} = 4 \\times \\frac{1}{2} = 2\\text{ m}$.",
      "Bước 3: Diện tích mặt sàn tròn: $S_{\\text{sàn}} = \\pi r^2 = \\pi \\times 2^2 = 4\\pi\\text{ m}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($4\\pi\\text{ m}^2$)."
    ],
    importantNotes: ["$r = 2\\text{ m} \\Rightarrow S = 4\\pi\\text{ m}^2$."],
    formulaTags: ["ADVANCED_PROBLEMS", "CONE_DEVELOPMENT"]
  },
  {
    sourceNumber: "30.6",
    sourcePage: 57,
    topic: "MIXED",
    subtopic: "ADVANCED_PROBLEMS",
    archetypeId: "ADVANCED_PROBLEMS",
    difficulty: "LEVEL_3",
    question: "Cho tam giác $ABC$ vuông tại $A$ có $AB = 6\\text{ cm}, AC = 8\\text{ cm}$. Quay tam giác $ABC$ một vòng quanh cạnh huyền $BC$ ta thu được một khối tròn xoay gồm hai hình nón ghép đáy. Thể tích của khối tròn xoay đó là:",
    options: [
      { id: "A", text: "$76{,}8\\pi\\text{ cm}^3$" },
      { id: "B", text: "$96\\pi\\text{ cm}^3$" },
      { id: "C", text: "$38{,}4\\pi\\text{ cm}^3$" },
      { id: "D", text: "$115{,}2\\pi\\text{ cm}^3$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Cạnh huyền $BC = \\sqrt{6^2 + 8^2} = 10\\text{ cm}$. Đường cao kẻ từ $A$: $r = AH = \\frac{AB \\times AC}{BC} = \\frac{6 \\times 8}{10} = 4{,}8\\text{ cm}$.",
      "Bước 2: Khối tròn xoay gồm 2 hình nón có chung đáy bán kính $r = 4{,}8\\text{ cm}$ và tổng chiều cao $h_1 + h_2 = BC = 10\\text{ cm}$.",
      "Bước 3: $V = \\frac{1}{3}\\pi r^2 (h_1 + h_2) = \\frac{1}{3}\\pi \\times (4{,}8)^2 \\times 10 = \\frac{1}{3}\\pi \\times 23{,}04 \\times 10 = 76{,}8\\pi\\text{ cm}^3$.",
      "Bước 4: Kết luận: Chọn đáp án A ($76{,}8\\pi\\text{ cm}^3$)."
    ],
    importantNotes: ["Quay tam giác vuông quanh cạnh huyền tạo ra 2 nón chung đáy."],
    formulaTags: ["ADVANCED_PROBLEMS", "CONE_ROTATION"]
  },
  {
    sourceNumber: "30.7",
    sourcePage: 57,
    topic: "MIXED",
    subtopic: "ADVANCED_PROBLEMS",
    archetypeId: "ADVANCED_PROBLEMS",
    difficulty: "LEVEL_3",
    question: "Một hình trụ có bán kính đáy $r$ và chiều cao $h = 2r$. Một hình cầu có bán kính $R = r$. Khẳng định nào sau đây về diện tích toàn phần của hình trụ $S_{tp(T)}$ và diện tích mặt cầu $S_{(C)}$ là đúng?",
    options: [
      { id: "A", text: "$S_{tp(T)} = 1{,}5 S_{(C)}$" },
      { id: "B", text: "$S_{tp(T)} = S_{(C)}$" },
      { id: "C", text: "$S_{tp(T)} = 2 S_{(C)}$" },
      { id: "D", text: "$S_{(C)} = 1{,}5 S_{tp(T)}$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: $S_{tp(T)} = 2\\pi r(h + r) = 2\\pi r(2r + r) = 2\\pi r(3r) = 6\\pi r^2$.",
      "Bước 2: $S_{(C)} = 4\\pi R^2 = 4\\pi r^2$.",
      "Bước 3: Tỉ số: $\\frac{S_{tp(T)}}{S_{(C)}} = \\frac{6\\pi r^2}{4\\pi r^2} = \\frac{3}{2} = 1{,}5$.",
      "Bước 4: Kết luận: Chọn đáp án A ($S_{tp(T)} = 1{,}5 S_{(C)}$)."
    ],
    importantNotes: ["$S_{tp(T)} = 6\\pi r^2 = 1{,}5 \\times 4\\pi r^2$."],
    formulaTags: ["ADVANCED_PROBLEMS", "CYLINDER_TOTAL_AREA", "SPHERE_AREA"]
  },
  {
    sourceNumber: "30.8",
    sourcePage: 57,
    topic: "MIXED",
    subtopic: "ADVANCED_PROBLEMS",
    archetypeId: "ADVANCED_PROBLEMS",
    difficulty: "LEVEL_3",
    question: "Một hộp quà dạng hình lập phương có cạnh $10\\text{ cm}$. Người ta đặt vào bên trong hộp một quả bóng hình cầu lớn nhất có thể. Tỉ lệ thể tích bị chiếm bởi quả bóng so với thể tích hộp quà (lấy $\\pi \\approx 3{,}14$) bằng:",
    options: [
      { id: "A", text: "$52{,}33\\%$" },
      { id: "B", text: "$68\\%$" },
      { id: "C", text: "$78{,}5\\%$" },
      { id: "D", text: "$47{,}67\\%$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Thể tích hộp lập phương: $V_{\\text{hộp}} = a^3 = 10^3 = 1000\\text{ cm}^3$.",
      "Bước 2: Quả bóng lớn nhất có đường kính $d = 10\\text{ cm} \\Rightarrow R = 5\\text{ cm}$.",
      "Bước 3: $V_{\\text{bóng}} = \\frac{4}{3} \\times 3{,}14 \\times 5^3 = \\frac{4 \\times 3{,}14 \\times 125}{3} = \\frac{1570}{3} \\approx 523{,}33\\text{ cm}^3$. Tỉ lệ: $\\frac{523{,}33}{1000} = 52{,}33\\%$. (Tỉ lệ chuẩn $\\frac{\\pi}{6} \\approx 52{,}36\\%$).",
      "Bước 4: Kết luận: Chọn đáp án A ($52{,}33\\%$)."
    ],
    importantNotes: ["Tỉ lệ thể tích cầu nội tiếp lập phương: $\\pi/6 \\approx 52{,}36\\%$."],
    formulaTags: ["ADVANCED_PROBLEMS", "INSCRIBED_SPHERE"]
  },
  {
    sourceNumber: "30.9",
    sourcePage: 57,
    topic: "MIXED",
    subtopic: "ADVANCED_PROBLEMS",
    archetypeId: "ADVANCED_PROBLEMS",
    difficulty: "LEVEL_3",
    question: "Một quả dưa hấu hình cầu có chu vi đường xích đạo bằng $62{,}8\\text{ cm}$. Người ta bổ quả dưa hấu làm 4 phần bằng nhau qua trục. Diện tích bề mặt vỏ xanh của 1 miếng dưa (lấy $\\pi \\approx 3{,}14$) bằng:",
    options: [
      { id: "A", text: "$314\\text{ cm}^2$" },
      { id: "B", text: "$628\\text{ cm}^2$" },
      { id: "C", text: "$157\\text{ cm}^2$" },
      { id: "D", text: "$1256\\text{ cm}^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Chu vi xích đạo: $2\\pi R = 62{,}8 \\Rightarrow R = \\frac{62{,}8}{2 \\times 3{,}14} = 10\\text{ cm}$.",
      "Bước 2: Diện tích toàn bộ mặt cầu vỏ dưa: $S = 4\\pi R^2 = 4 \\times 3{,}14 \\times 10^2 = 1256\\text{ cm}^2$.",
      "Bước 3: Diện tích vỏ xanh của 1 trong 4 miếng dưa: $S_1 = \\frac{1256}{4} = 314\\text{ cm}^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($314\\text{ cm}^2$)."
    ],
    importantNotes: ["$S_1 = S/4 = 314\\text{ cm}^2$."],
    formulaTags: ["ADVANCED_PROBLEMS", "SPHERE_AREA", "REAL_WORLD"]
  },
  {
    sourceNumber: "30.10",
    sourcePage: 58,
    topic: "MIXED",
    subtopic: "ADVANCED_PROBLEMS",
    archetypeId: "ADVANCED_PROBLEMS",
    difficulty: "LEVEL_3",
    question: "Một chi tiết máy gồm một hình trụ bán kính đáy $R$, chiều cao $H = 2R$ bị khoét rỗng ở hai đầu bởi hai nửa hình cầu bán kính $R$. Diện tích toàn bộ bề mặt của chi tiết máy đó là:",
    options: [
      { id: "A", text: "$8\\pi R^2$" },
      { id: "B", text: "$6\\pi R^2$" },
      { id: "C", text: "$4\\pi R^2$" },
      { id: "D", text: "$10\\pi R^2$" }
    ],
    correctAnswer: "A",
    solution4Steps: [
      "Bước 1: Diện tích mặt ngoài xung quanh hình trụ: $S_{xq} = 2\\pi R H = 2\\pi R (2R) = 4\\pi R^2$.",
      "Bước 2: Diện tích mặt trong bị khoét ở hai đầu là hai mặt cong bán cầu ghép lại thành 1 mặt cầu hoàn chỉnh: $S_{\\text{cầu}} = 4\\pi R^2$.",
      "Bước 3: Tổng diện tích bề mặt (trong và ngoài): $S = 4\\pi R^2 + 4\\pi R^2 = 8\\pi R^2$.",
      "Bước 4: Kết luận: Chọn đáp án A ($8\\pi R^2$)."
    ],
    importantNotes: ["$S = 4\\pi R^2 + 4\\pi R^2 = 8\\pi R^2$."],
    formulaTags: ["ADVANCED_PROBLEMS", "COMPOSITE_SOLIDS"]
  }
];
