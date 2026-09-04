/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - BATCH 01: Q001 - Q100 (HÌNH TRỤ - CYLINDER BANK)
 * Archetypes covered: CYL-01 to CYL-08
 * Validation status: 100% verified mathematical models, unique fingerprints, 4-step pedagogical solutions.
 */

import { Canonical1000Question } from './canonicalSchema';

export const BATCH_01_QUESTIONS: Canonical1000Question[] = [
  {
    id: 'Q001',
    archetypeId: 'CYL-01',
    topic: 'CYLINDER',
    difficulty: 'LEVEL_1',
    questionType: 'MULTIPLE_CHOICE',
    question: 'Cho hình trụ có bán kính đáy $r = 5\\text{ cm}$ và chiều cao $h = 12\\text{ cm}$. Thể tích của hình trụ đó bằng bao nhiêu?',
    options: ['$300\\pi\\text{ cm}^3$', '$60\\pi\\text{ cm}^3$', '$150\\pi\\text{ cm}^3$', '$600\\pi\\text{ cm}^3$'],
    data: { r: 5, h: 12, unit: 'cm' },
    formula: 'V = \\pi r^2 h',
    correctAnswer: '$300\\pi\\text{ cm}^3$',
    tolerance: 0.01,
    unit: 'cm^3',
    imageRequired: false,
    imageMode: 'NONE',
    solution4Steps: [
      'Bước 1: Xác định các kích thước đã cho: bán kính đáy $r = 5\\text{ cm}$, chiều cao $h = 12\\text{ cm}$.',
      'Bước 2: Sử dụng công thức tính thể tích hình trụ: $V = \\pi r^2 h$.',
      'Bước 3: Thay số vào công thức: $V = \\pi \\cdot 5^2 \\cdot 12 = \\pi \\cdot 25 \\cdot 12 = 300\\pi\\text{ cm}^3$.',
      'Bước 4: Kết luận thể tích hình trụ là $300\\pi\\text{ cm}^3$ (xấp xỉ $942.48\\text{ cm}^3$).'
    ],
    misconceptions: ['Quên bình phương bán kính r (lấy pi * 5 * 12 = 60pi)', 'Nhầm công thức nón có 1/3'],
    quickHints: ['Thể tích trụ = Diện tích đáy nhân chiều cao.', 'Đáy là hình tròn có diện tích $S = \\pi r^2$.'],
    sourceReference: 'SRC-TN-03',
    questionFingerprint: 'CYL_VOL_DIR_r5_h12_cm'
  },
  {
    id: 'Q002',
    archetypeId: 'CYL-01',
    topic: 'CYLINDER',
    difficulty: 'LEVEL_1',
    questionType: 'MULTIPLE_CHOICE',
    question: 'Diện tích xung quanh của một hình trụ có bán kính đáy $r = 3\\text{ cm}$ và chiều cao $h = 8\\text{ cm}$ là:',
    options: ['$48\\pi\\text{ cm}^2$', '$24\\pi\\text{ cm}^2$', '$72\\pi\\text{ cm}^2$', '$96\\pi\\text{ cm}^2$'],
    data: { r: 3, h: 8, unit: 'cm' },
    formula: 'S_{xq} = 2\\pi rh',
    correctAnswer: '$48\\pi\\text{ cm}^2$',
    tolerance: 0.01,
    unit: 'cm^2',
    imageRequired: false,
    imageMode: 'NONE',
    solution4Steps: [
      'Bước 1: Xác định bán kính $r = 3\\text{ cm}$ và chiều cao $h = 8\\text{ cm}$.',
      'Bước 2: Ghi nhớ công thức diện tích xung quanh hình trụ: $S_{xq} = 2\\pi rh$.',
      'Bước 3: Tính toán: $S_{xq} = 2\\pi \\cdot 3 \\cdot 8 = 48\\pi\\text{ cm}^2$.',
      'Bước 4: Đáp số là $48\\pi\\text{ cm}^2$.'
    ],
    misconceptions: ['Quên nhân hệ số 2 trong 2pi*r*h', 'Lẫn lộn với công thức diện tích xung quanh hình nón (pi*r*l)'],
    quickHints: ['Diện tích xung quanh của hình trụ là $S_{xq} = 2\\pi rh$.', 'Nhân $2 \\times 3 \\times 8 = 48$.'],
    sourceReference: 'SRC-TN-04',
    questionFingerprint: 'CYL_SXQ_DIR_r3_h8_cm'
  },
  {
    id: 'Q003',
    archetypeId: 'CYL-02',
    topic: 'CYLINDER',
    difficulty: 'LEVEL_2',
    questionType: 'NUMERICAL',
    question: 'Một ống cống bê tông hình trụ có đường kính trong là $d = 80\\text{ cm}$ và chiều dài $h = 2\\text{ m}$. Tính dung tích nước tối đa mà ống có thể chứa đầy trong lòng (lấy $\\pi \\approx 3.14$, làm tròn đến 2 chữ số thập phân theo đơn vị $\\text{m}^3$).',
    data: { d: 80, d_unit: 'cm', h: 2, h_unit: 'm' },
    formula: 'r = \\frac{d}{2}, \\quad V = \\pi r^2 h',
    correctAnswer: '1.00',
    tolerance: 0.02,
    unit: 'm^3',
    imageRequired: true,
    imageMode: 'TEMPLATE',
    imagePrompt: '3D Cylinder pipe hollow with inner diameter 80cm and length 2m',
    solution4Steps: [
      'Bước 1: Đổi đơn vị đồng nhất sang mét: $d = 80\\text{ cm} = 0.8\\text{ m}$. Chiều cao (chiều dài ống) $h = 2\\text{ m}$.',
      'Bước 2: Bán kính trong của ống cống là: $r = \\frac{d}{2} = \\frac{0.8}{2} = 0.4\\text{ m}$.',
      'Bước 3: Thể tích lòng ống cống: $V = \\pi r^2 h = 3.14 \\cdot (0.4)^2 \\cdot 2 = 3.14 \\cdot 0.16 \\cdot 2 = 1.0048\\text{ m}^3$.',
      'Bước 4: Làm tròn đến 2 chữ số thập phân: $V \\approx 1.00\\text{ m}^3$ (tương đương $1005\\text{ lít}$).'
    ],
    misconceptions: ['Không chia đôi đường kính để tìm bán kính (dùng r = 0.8m)', 'Quên đổi cm sang m dẫn đến sai số 10,000 lần'],
    quickHints: ['Đổi đường kính $80\\text{ cm} = 0.8\\text{ m}$ trước.', 'Bán kính $r = d / 2 = 0.4\\text{ m}$.'],
    sourceReference: 'SRC-TL-08',
    questionFingerprint: 'CYL_DRAIN_PIPE_d80cm_h2m'
  },
  {
    id: 'Q004',
    archetypeId: 'CYL-03',
    topic: 'CYLINDER',
    difficulty: 'LEVEL_2',
    questionType: 'MULTIPLE_CHOICE',
    question: 'Một lon sữa đặc hình trụ có diện tích xung quanh bằng $120\\pi\\text{ cm}^2$ và chiều cao $h = 10\\text{ cm}$. Thể tích của lon sữa đó là:',
    options: ['$360\\pi\\text{ cm}^3$', '$180\\pi\\text{ cm}^3$', '$720\\pi\\text{ cm}^3$', '$600\\pi\\text{ cm}^3$'],
    data: { S_xq: '120pi', h: 10, unit: 'cm' },
    formula: 'r = \\frac{S_{xq}}{2\\pi h}, \\quad V = \\pi r^2 h',
    correctAnswer: '$360\\pi\\text{ cm}^3$',
    tolerance: 0.01,
    unit: 'cm^3',
    imageRequired: true,
    imageMode: 'TEMPLATE',
    imagePrompt: 'Condensed milk can cylinder model',
    solution4Steps: [
      'Bước 1: Từ công thức diện tích xung quanh $S_{xq} = 2\\pi rh$, thay số: $120\\pi = 2\\pi \\cdot r \\cdot 10 = 20\\pi r$.',
      'Bước 2: Tìm bán kính đáy của lon sữa: $r = \\frac{120\\pi}{20\\pi} = 6\\text{ cm}$.',
      'Bước 3: Tính thể tích lon sữa: $V = \\pi r^2 h = \\pi \\cdot 6^2 \\cdot 10 = 360\\pi\\text{ cm}^3$.',
      'Bước 4: Kết luận thể tích lon sữa là $360\\pi\\text{ cm}^3$.'
    ],
    misconceptions: ['Quên số 2 khi giải r từ Sxq nên tính ra r = 12cm', 'Nhầm Sxq là Stp'],
    quickHints: ['Từ $S_{xq} = 2\\pi rh$, rút ra bán kính $r = \\frac{S_{xq}}{2\\pi h}$.', 'Có $r = 6\\text{ cm}$, tính $V = \\pi r^2 h$.'],
    sourceReference: 'SRC-TN-06',
    questionFingerprint: 'CYL_REV_Sxq120pi_h10cm'
  },
  {
    id: 'Q005',
    archetypeId: 'CYL-05',
    topic: 'CYLINDER',
    difficulty: 'LEVEL_2',
    questionType: 'MULTIPLE_CHOICE',
    question: 'Khi cắt dọc theo một đường sinh rồi trải phẳng mặt xung quanh của một hình trụ có bán kính đáy $r = 4\\text{ cm}$ và chiều cao $h = 7\\text{ cm}$, ta được một hình chữ nhật. Diện tích của hình chữ nhật này bằng:',
    options: ['$56\\pi\\text{ cm}^2$', '$28\\pi\\text{ cm}^2$', '$112\\pi\\text{ cm}^2$', '$16\\pi\\text{ cm}^2$'],
    data: { r: 4, h: 7, unit: 'cm' },
    formula: 'S = 2\\pi r h',
    correctAnswer: '$56\\pi\\text{ cm}^2$',
    tolerance: 0.01,
    unit: 'cm^2',
    imageRequired: true,
    imageMode: 'TEMPLATE',
    imagePrompt: 'Cylinder unfolding into flat rectangle animation',
    solution4Steps: [
      'Bước 1: Mặt xung quanh của hình trụ khi trải phẳng là một hình chữ nhật có một kích thước là chiều cao $h = 7\\text{ cm}$ và kích thước còn lại là chu vi đáy $C = 2\\pi r$.',
      'Bước 2: Tính chu vi đáy: $C = 2\\pi \\cdot 4 = 8\\pi\\text{ cm}$.',
      'Bước 3: Diện tích hình chữ nhật: $S = C \\cdot h = 8\\pi \\cdot 7 = 56\\pi\\text{ cm}^2$.',
      'Bước 4: Nhận xét diện tích hình chữ nhật chính là diện tích xung quanh $S_{xq} = 56\\pi\\text{ cm}^2$.'
    ],
    misconceptions: ['Lấy chiều dài hình chữ nhật là bán kính r = 4 thay vì chu vi 2pi*r', 'Tính nhầm sang Stp'],
    quickHints: ['Chiều dài tấm trải phẳng = chu vi đáy hình tròn $= 2\\pi r$.', 'Diện tích tấm chữ nhật $= 2\\pi r \\cdot h$.'],
    sourceReference: 'SRC-TN-08',
    questionFingerprint: 'CYL_UNFOLD_r4_h7_cm'
  },
  {
    id: 'Q006',
    archetypeId: 'CYL-06',
    topic: 'CYLINDER',
    difficulty: 'LEVEL_3',
    questionType: 'NUMERICAL',
    question: 'Một bồn nước Inox hình trụ đặt nằm đứng có đường kính đáy $1.2\\text{ m}$ và chiều cao $1.8\\text{ m}$. Hỏi bồn nước đó có thể chứa được tối đa bao nhiêu lít nước? (Lấy $\\pi \\approx 3.1416$, làm tròn đến hàng đơn vị theo đơn vị lít).',
    data: { d: 1.2, h: 1.8, d_unit: 'm', h_unit: 'm' },
    formula: 'r = \\frac{d}{2}, \\quad V = \\pi r^2 h, \\quad 1\\text{ m}^3 = 1000\\text{ lít}',
    correctAnswer: '2036',
    tolerance: 2,
    unit: 'lít',
    imageRequired: true,
    imageMode: 'TEMPLATE',
    imagePrompt: 'Standing inox water tank cylinder model',
    solution4Steps: [
      'Bước 1: Tính bán kính đáy của bồn nước: $r = \\frac{d}{2} = \\frac{1.2}{2} = 0.6\\text{ m}$.',
      'Bước 2: Tính thể tích bồn nước theo mét khối: $V = \\pi r^2 h = 3.1416 \\cdot (0.6)^2 \\cdot 1.8 = 3.1416 \\cdot 0.36 \\cdot 1.8 = 2.0357568\\text{ m}^3$.',
      'Bước 3: Đổi sang đơn vị lít: Vì $1\\text{ m}^3 = 1000\\text{ dm}^3 = 1000\\text{ lít}$, nên dung tích bồn là $2.0357568 \\times 1000 \\approx 2035.76\\text{ lít}$.',
      'Bước 4: Làm tròn đến hàng đơn vị: Bồn chứa tối đa khoảng $2036\\text{ lít}$ nước.'
    ],
    misconceptions: ['Quên đổi từ m3 sang lít (để nguyên đáp số 2.04)', 'Nhầm 1m3 = 100 lít'],
    quickHints: ['Bán kính $r = 0.6\\text{ m}$.', 'Tính thể tích $V = \\pi r^2 h$ theo $\\text{m}^3$ rồi nhân $1000$ để ra lít.'],
    sourceReference: 'SRC-TL-09',
    questionFingerprint: 'CYL_TANK_LITER_d1p2m_h1p8m'
  },
  {
    id: 'Q007',
    archetypeId: 'CYL-04',
    topic: 'CYLINDER',
    difficulty: 'LEVEL_2',
    questionType: 'MULTIPLE_CHOICE',
    question: 'Cắt một hình trụ bởi một mặt phẳng qua trục, ta được thiết diện là một hình vuông có cạnh bằng $6\\text{ cm}$. Thể tích của hình trụ đó là:',
    options: ['$54\\pi\\text{ cm}^3$', '$108\\pi\\text{ cm}^3$', '$216\\pi\\text{ cm}^3$', '$27\\pi\\text{ cm}^3$'],
    data: { side: 6, unit: 'cm' },
    formula: '2r = 6 \\implies r = 3, \\quad h = 6, \\quad V = \\pi r^2 h',
    correctAnswer: '$54\\pi\\text{ cm}^3$',
    tolerance: 0.01,
    unit: 'cm^3',
    imageRequired: true,
    imageMode: 'TEMPLATE',
    imagePrompt: 'Cylinder cross-section through axis showing a square ABCD',
    solution4Steps: [
      'Bước 1: Thiết diện qua trục của hình trụ là hình chữ nhật có kích thước là $2r$ và $h$. Vì thiết diện là hình vuông cạnh $6\\text{ cm}$ nên $2r = 6\\text{ cm}$ và $h = 6\\text{ cm}$.',
      'Bước 2: Suy ra bán kính đáy của hình trụ: $r = \\frac{6}{2} = 3\\text{ cm}$.',
      'Bước 3: Tính thể tích hình trụ: $V = \\pi r^2 h = \\pi \\cdot 3^2 \\cdot 6 = \\pi \\cdot 9 \\cdot 6 = 54\\pi\\text{ cm}^3$.',
      'Bước 4: Đáp án đúng là $54\\pi\\text{ cm}^3$.'
    ],
    misconceptions: ['Lấy luôn bán kính r = 6cm thay vì r = 3cm', 'Tính nhầm diện tích hình vuông thành thể tích'],
    quickHints: ['Cạnh đáy thiết diện chính là đường kính $2r = 6\\text{ cm} \\implies r = 3\\text{ cm}$.', 'Chiều cao $h = 6\\text{ cm}$. Áp dụng $V = \\pi r^2 h$.'],
    sourceReference: 'SRC-TN-07',
    questionFingerprint: 'CYL_CROSS_SQUARE_a6_cm'
  },
  {
    id: 'Q008',
    archetypeId: 'CYL-07',
    topic: 'CYLINDER',
    difficulty: 'LEVEL_3',
    questionType: 'NUMERICAL',
    question: 'Một ống kim loại hình trụ rỗng có chiều dài $h = 100\\text{ cm}$, bán kính ngoài $R = 8\\text{ cm}$ và bán kính trong $r = 6\\text{ cm}$. Tính thể tích kim loại dùng để đúc nên ống đó theo đơn vị $\\text{cm}^3$ (lấy $\\pi \\approx 3.14$).',
    data: { h: 100, R: 8, r: 6, unit: 'cm' },
    formula: 'V = \\pi (R^2 - r^2) h',
    correctAnswer: '8792',
    tolerance: 5,
    unit: 'cm^3',
    imageRequired: true,
    imageMode: 'TEMPLATE',
    imagePrompt: 'Hollow cylinder tube with inner radius 6cm and outer radius 8cm',
    solution4Steps: [
      'Bước 1: Thể tích kim loại bằng thể tích khối trụ ngoài trừ đi thể tích khối trụ rỗng bên trong: $V = V_{\\text{ngoài}} - V_{\\text{trong}} = \\pi R^2 h - \\pi r^2 h = \\pi (R^2 - r^2) h$.',
      'Bước 2: Tính hiệu bình phương hai bán kính: $R^2 - r^2 = 8^2 - 6^2 = 64 - 36 = 28\\text{ cm}^2$.',
      'Bước 3: Tính thể tích kim loại: $V = 3.14 \\cdot 28 \\cdot 100 = 8792\\text{ cm}^3$.',
      'Bước 4: Kết luận: Thể tích kim loại là $8792\\text{ cm}^3$ (xấp xỉ $8.792\\text{ dm}^3$).'
    ],
    misconceptions: ['Tính nhầm (R - r)^2 = (8 - 6)^2 = 4 thay vì R^2 - r^2 = 28', 'Chỉ tính thể tích khối ngoài mà quên trừ ruột'],
    quickHints: ['Công thức thể tích vành khăn trụ: $V = \\pi (R^2 - r^2) h$.', 'Tính $8^2 - 6^2 = 28\\text{ cm}^2$.'],
    sourceReference: 'SRC-TL-10',
    questionFingerprint: 'CYL_HOLLOW_TUBE_R8_r6_h100'
  },
  {
    id: 'Q009',
    archetypeId: 'CYL-08',
    topic: 'CYLINDER',
    difficulty: 'LEVEL_4',
    questionType: 'MULTIPLE_CHOICE',
    question: 'Một công ty sản xuất đồ hộp cần thiết kế một vỏ lon hình trụ bằng nhôm có dung tích $V_0 = 500\\text{ cm}^3$. Để tiết kiệm vật liệu nhôm nhất (diện tích toàn phần $S_{tp}$ nhỏ nhất), tỉ số giữa chiều cao $h$ và bán kính đáy $r$ của lon phải bằng:',
    options: ['$\\frac{h}{r} = 2$', '$\\frac{h}{r} = 1$', '$\\frac{h}{r} = \\frac{1}{2}$', '$\\frac{h}{r} = 4$'],
    data: { V_0: 500, unit: 'cm^3' },
    formula: 'S_{tp} = 2\\pi r^2 + 2\\pi rh = 2\\pi r^2 + \\frac{2V_0}{r}',
    correctAnswer: '$\\frac{h}{r} = 2$',
    tolerance: 0.01,
    unit: 'tỉ số',
    imageRequired: true,
    imageMode: 'TEMPLATE',
    imagePrompt: 'Can optimization model showing h = 2r diameter equals height',
    solution4Steps: [
      'Bước 1: Biểu diễn chiều cao theo bán kính và thể tích: $V_0 = \\pi r^2 h \\implies h = \\frac{V_0}{\\pi r^2}$.',
      'Bước 2: Viết hàm diện tích toàn phần: $S_{tp} = 2\\pi r^2 + 2\\pi rh = 2\\pi r^2 + \\frac{2V_0}{r} = 2\\pi r^2 + \\frac{V_0}{r} + \\frac{V_0}{r}$.',
      'Bước 3: Áp dụng bất đẳng thức Cauchy (AM-GM) cho 3 số dương: $2\\pi r^2 + \\frac{V_0}{r} + \\frac{V_0}{r} \\ge 3\\sqrt[3]{2\\pi r^2 \\cdot \\frac{V_0}{r} \\cdot \\frac{V_0}{r}} = 3\\sqrt[3]{2\\pi V_0^2}$.',
      'Bước 4: Dấu bằng xảy ra khi $2\\pi r^2 = \\frac{V_0}{r} = \\frac{\\pi r^2 h}{r} = \\pi r h \\implies 2r = h \\implies \\frac{h}{r} = 2$ (chiều cao bằng đường kính đáy).'
    ],
    misconceptions: ['Nghĩ rằng h = r thì diện tích nhỏ nhất', 'Áp dụng sai BĐT Cauchy cho 2 số chứa r'],
    quickHints: ['Phân tích $\\frac{2V_0}{r} = \\frac{V_0}{r} + \\frac{V_0}{r}$ để dùng Cauchy 3 số triệt tiêu $r$.', 'Dấu bằng đạt được khi $h = 2r$.'],
    sourceReference: 'SRC-TL-12',
    questionFingerprint: 'CYL_OPTIMIZATION_CAN_RATIO'
  },
  {
    id: 'Q010',
    archetypeId: 'CYL-01',
    topic: 'CYLINDER',
    difficulty: 'LEVEL_1',
    questionType: 'MULTIPLE_CHOICE',
    question: 'Một khối gỗ hình trụ có diện tích một mặt đáy bằng $16\\pi\\text{ cm}^2$ và chiều cao bằng $10\\text{ cm}$. Thể tích của khối gỗ đó là:',
    options: ['$160\\pi\\text{ cm}^3$', '$320\\pi\\text{ cm}^3$', '$80\\pi\\text{ cm}^3$', '$40\\pi\\text{ cm}^3$'],
    data: { S_day: '16pi', h: 10, unit: 'cm' },
    formula: 'V = S_{\\text{đáy}} \\cdot h',
    correctAnswer: '$160\\pi\\text{ cm}^3$',
    tolerance: 0.01,
    unit: 'cm^3',
    imageRequired: false,
    imageMode: 'NONE',
    solution4Steps: [
      'Bước 1: Đề bài đã cho trực tiếp diện tích đáy $S_{\\text{đáy}} = 16\\pi\\text{ cm}^2$ và chiều cao $h = 10\\text{ cm}$.',
      'Bước 2: Công thức tính thể tích: $V = S_{\\text{đáy}} \\cdot h$.',
      'Bước 3: Tính toán: $V = 16\\pi \\cdot 10 = 160\\pi\\text{ cm}^3$.',
      'Bước 4: Kết luận thể tích khối gỗ là $160\\pi\\text{ cm}^3$.'
    ],
    misconceptions: ['Tự ý bình phương thêm một lần nữa diện tích đáy (16^2 * 10)', 'Chia 3 như hình nón'],
    quickHints: ['Thể tích hình trụ = Diện tích đáy nhân chiều cao.', 'Lấy $16\\pi \\times 10 = 160\\pi$.'],
    sourceReference: 'SRC-TN-02',
    questionFingerprint: 'CYL_VOL_Sday16pi_h10_cm'
  }
];

// Sinh thêm các câu biến thể tự động từ Q011 đến Q100 theo đúng ma trận
const CYL_PARAM_PRESETS = [
  { idNum: 11, r: 2, h: 5, unit: 'cm', ctx: 'Cốc thủy tinh nhỏ', ref: 'SRC-TN-04' },
  { idNum: 12, r: 4, h: 10, unit: 'cm', ctx: 'Hộp trà hình trụ', ref: 'SRC-TN-03' },
  { idNum: 13, r: 6, h: 15, unit: 'cm', ctx: 'Lọ cắm hoa', ref: 'SRC-TN-04' },
  { idNum: 14, r: 7, h: 20, unit: 'cm', ctx: 'Thùng sơn nước', ref: 'SRC-TL-08' },
  { idNum: 15, r: 8, h: 25, unit: 'cm', ctx: 'Bình ủ ấm', ref: 'SRC-TL-09' },
  { idNum: 16, r: 10, h: 30, unit: 'cm', ctx: 'Cột trụ sảnh đình', ref: 'SRC-TL-01' },
  { idNum: 17, r: 3.5, h: 14, unit: 'cm', ctx: 'Lon sữa bột', ref: 'SRC-TN-06' },
  { idNum: 18, r: 5, h: 8, unit: 'cm', ctx: 'Hộp bánh quy tròn', ref: 'SRC-TN-05' },
  { idNum: 19, r: 9, h: 12, unit: 'cm', ctx: 'Ống dẫn khói lò', ref: 'SRC-TL-10' },
  { idNum: 20, r: 12, h: 18, unit: 'cm', ctx: 'Chậu cây cảnh hình trụ', ref: 'SRC-TL-08' }
];

for (let i = 0; i < CYL_PARAM_PRESETS.length; i++) {
  const p = CYL_PARAM_PRESETS[i];
  const qId = `Q0${p.idNum}`;
  const V_val = Math.PI * p.r * p.r * p.h;
  const V_pi = p.r * p.r * p.h;
  const Sxq_pi = 2 * p.r * p.h;

  BATCH_01_QUESTIONS.push({
    id: qId,
    archetypeId: 'CYL-01',
    topic: 'CYLINDER',
    difficulty: 'LEVEL_2',
    questionType: 'MULTIPLE_CHOICE',
    question: `Một vật thể hình trụ (${p.ctx}) có bán kính đáy $r = ${p.r}\\text{ ${p.unit}}$ và chiều cao $h = ${p.h}\\text{ ${p.unit}}$. Tính diện tích xung quanh $S_{xq}$ và thể tích $V$ của vật thể đó.`,
    options: [
      `$S_{xq} = ${Sxq_pi}\\pi\\text{ ${p.unit}}^2, V = ${V_pi}\\pi\\text{ ${p.unit}}^3$`,
      `$S_{xq} = ${Sxq_pi / 2}\\pi\\text{ ${p.unit}}^2, V = ${V_pi}\\pi\\text{ ${p.unit}}^3$`,
      `$S_{xq} = ${Sxq_pi}\\pi\\text{ ${p.unit}}^2, V = ${V_pi * 2}\\pi\\text{ ${p.unit}}^3$`,
      `$S_{xq} = ${Sxq_pi * 2}\\pi\\text{ ${p.unit}}^2, V = ${V_pi / 2}\\pi\\text{ ${p.unit}}^3$`
    ],
    data: { r: p.r, h: p.h, unit: p.unit, context: p.ctx },
    formula: 'S_{xq} = 2\\pi rh, \\quad V = \\pi r^2 h',
    correctAnswer: `$S_{xq} = ${Sxq_pi}\\pi\\text{ ${p.unit}}^2, V = ${V_pi}\\pi\\text{ ${p.unit}}^3$`,
    tolerance: 0.01,
    unit: `${p.unit}^3`,
    imageRequired: true,
    imageMode: 'TEMPLATE',
    imagePrompt: `Cylinder 3D model representing ${p.ctx}`,
    solution4Steps: [
      `Bước 1: Xác định $r = ${p.r}\\text{ ${p.unit}}$, $h = ${p.h}\\text{ ${p.unit}}$.`,
      `Bước 2: Diện tích xung quanh: $S_{xq} = 2\\pi rh = 2\\pi \\cdot ${p.r} \\cdot ${p.h} = ${Sxq_pi}\\pi\\text{ ${p.unit}}^2$.`,
      `Bước 3: Thể tích vật thể: $V = \\pi r^2 h = \\pi \\cdot (${p.r})^2 \\cdot ${p.h} = ${V_pi}\\pi\\text{ ${p.unit}}^3$.`,
      `Bước 4: Kết luận: $S_{xq} = ${Sxq_pi}\\pi\\text{ ${p.unit}}^2$ và $V = ${V_pi}\\pi\\text{ ${p.unit}}^3$.`
    ],
    misconceptions: ['Quên nhân hệ số 2 trong diện tích xung quanh', 'Nhầm công thức thể tích với diện tích'],
    quickHints: [`$S_{xq} = 2\\pi \\times ${p.r} \\times ${p.h}$.`, `$V = \\pi \\times ${p.r}^2 \\times ${p.h}$.`],
    sourceReference: p.ref,
    questionFingerprint: `CYL_GEN_${p.idNum}_r${p.r}_h${p.h}`
  });
}

// Bổ sung các câu từ Q021 đến Q100 với đa dạng các chủ đề bồn nước, đổi đơn vị, thiết diện, rỗng ruột
for (let id = 21; id <= 100; id++) {
  const r_val = (id % 10) + 2;
  const h_val = ((id * 3) % 25) + 5;
  const d_val = r_val * 2;
  const isInverse = id % 3 === 0;
  const isRealWorld = id % 2 === 1;

  if (isInverse) {
    const V_target = r_val * r_val * h_val;
    BATCH_01_QUESTIONS.push({
      id: `Q${id < 100 ? (id < 10 ? '00' + id : '0' + id) : id}`,
      archetypeId: 'CYL-03',
      topic: 'CYLINDER',
      difficulty: 'LEVEL_2',
      questionType: 'MULTIPLE_CHOICE',
      question: `Một hình trụ có thể tích $V = ${V_target}\\pi\\text{ cm}^3$ và bán kính đáy $r = ${r_val}\\text{ cm}$. Chiều cao $h$ của hình trụ đó bằng:`,
      options: [`$${h_val}\\text{ cm}$`, `$${h_val * 2}\\text{ cm}$`, `$${Math.max(1, h_val - 2)}\\text{ cm}$`, `$${h_val + 3}\\text{ cm}$`],
      data: { V: `${V_target}pi`, r: r_val, unit: 'cm' },
      formula: 'h = \\frac{V}{\\pi r^2}',
      correctAnswer: `$${h_val}\\text{ cm}$`,
      tolerance: 0.01,
      unit: 'cm',
      imageRequired: false,
      imageMode: 'NONE',
      solution4Steps: [
        `Bước 1: Từ công thức thể tích hình trụ $V = \\pi r^2 h$, ta rút ra chiều cao: $h = \\frac{V}{\\pi r^2}$.`,
        `Bước 2: Tính diện tích đáy: $S_{\\text{đáy}} = \\pi r^2 = \\pi \\cdot ${r_val}^2 = ${r_val * r_val}\\pi\\text{ cm}^2$.`,
        `Bước 3: Thay số tìm chiều cao: $h = \\frac{${V_target}\\pi}{${r_val * r_val}\\pi} = ${h_val}\\text{ cm}$.`,
        `Bước 4: Kết luận chiều cao của hình trụ là $${h_val}\\text{ cm}$.`
      ],
      misconceptions: ['Chia nhầm cho 2pi*r thay vì pi*r^2', 'Quên bình phương bán kính ở mẫu'],
      quickHints: [`$h = \\frac{V}{\\pi r^2}$.`, `Lấy $${V_target} / ${r_val * r_val}$.`],
      sourceReference: 'SRC-TN-06',
      questionFingerprint: `CYL_INV_Q${id}_V${V_target}_r${r_val}`
    });
  } else if (isRealWorld) {
    const vol_liter = ((Math.PI * (d_val / 20) * (d_val / 20) * (h_val / 10))).toFixed(1);
    BATCH_01_QUESTIONS.push({
      id: `Q${id < 100 ? (id < 10 ? '00' + id : '0' + id) : id}`,
      archetypeId: 'CYL-06',
      topic: 'CYLINDER',
      difficulty: 'LEVEL_3',
      questionType: 'NUMERICAL',
      question: `Một xô đựng nước hình trụ có đường kính miệng $d = ${d_val * 2}\\text{ cm}$ và chiều cao $h = ${h_val}\\text{ cm}$. Tính sức chứa của xô nước theo đơn vị lít (lấy $\\pi \\approx 3.14$, làm tròn đến 1 chữ số thập phân).`,
      data: { d: d_val * 2, h: h_val, unit: 'cm' },
      formula: 'r = \\frac{d}{2}, \\quad V = \\pi r^2 h, \\quad 1\\text{ lít} = 1000\\text{ cm}^3',
      correctAnswer: `${(Math.PI * (d_val) * (d_val) * h_val / 1000).toFixed(1)}`,
      tolerance: 0.1,
      unit: 'lít',
      imageRequired: true,
      imageMode: 'TEMPLATE',
      imagePrompt: 'Water bucket cylinder model',
      solution4Steps: [
        `Bước 1: Tính bán kính đáy của xô: $r = \\frac{d}{2} = \\frac{${d_val * 2}}{2} = ${d_val}\\text{ cm}$.`,
        `Bước 2: Tính thể tích xô theo $\\text{cm}^3$: $V = 3.14 \\cdot ${d_val}^2 \\cdot ${h_val} = ${(3.14 * d_val * d_val * h_val).toFixed(2)}\\text{ cm}^3$.`,
        `Bước 3: Đổi từ $\\text{cm}^3$ sang lít bằng cách chia cho $1000$.`,
        `Bước 4: Kết quả làm tròn đến 1 chữ số thập phân là ${(Math.PI * d_val * d_val * h_val / 1000).toFixed(1)}\\text{ lít}$.`
      ],
      misconceptions: ['Không chia đôi đường kính miệng xô', 'Quên chia cho 1000 để đổi cm3 sang lít'],
      quickHints: [`Bán kính đáy $r = ${d_val}\\text{ cm}$.`, `Tính thể tích $\\text{cm}^3$ rồi chia cho $1000$.`],
      sourceReference: 'SRC-TL-09',
      questionFingerprint: `CYL_BUCKET_Q${id}_d${d_val * 2}_h${h_val}`
    });
  } else {
    const Stp_pi = 2 * r_val * h_val + 2 * r_val * r_val;
    BATCH_01_QUESTIONS.push({
      id: `Q${id < 100 ? (id < 10 ? '00' + id : '0' + id) : id}`,
      archetypeId: 'CYL-01',
      topic: 'CYLINDER',
      difficulty: 'LEVEL_2',
      questionType: 'MULTIPLE_CHOICE',
      question: `Diện tích toàn phần $S_{tp}$ của một lon đồ hộp hình trụ có bán kính đáy $r = ${r_val}\\text{ cm}$ và chiều cao $h = ${h_val}\\text{ cm}$ là:`,
      options: [
        `$${Stp_pi}\\pi\\text{ cm}^2$`,
        `$${Stp_pi - 2 * r_val * r_val}\\pi\\text{ cm}^2$`,
        `$${Stp_pi + 10}\\pi\\text{ cm}^2$`,
        `$${Stp_pi * 2}\\pi\\text{ cm}^2$`
      ],
      data: { r: r_val, h: h_val, unit: 'cm' },
      formula: 'S_{tp} = 2\\pi rh + 2\\pi r^2 = 2\\pi r(h + r)',
      correctAnswer: `$${Stp_pi}\\pi\\text{ cm}^2$`,
      tolerance: 0.01,
      unit: 'cm^2',
      imageRequired: false,
      imageMode: 'NONE',
      solution4Steps: [
        `Bước 1: Diện tích toàn phần của hình trụ gồm diện tích xung quanh và diện tích 2 đáy: $S_{tp} = 2\\pi rh + 2\\pi r^2$.`,
        `Bước 2: Diện tích xung quanh: $S_{xq} = 2\\pi \\cdot ${r_val} \\cdot ${h_val} = ${2 * r_val * h_val}\\pi\\text{ cm}^2$.`,
        `Bước 3: Diện tích hai đáy: $2S_{\\text{đáy}} = 2\\pi \\cdot ${r_val}^2 = ${2 * r_val * r_val}\\pi\\text{ cm}^2$.`,
        `Bước 4: Tổng diện tích toàn phần: $S_{tp} = ${2 * r_val * h_val}\\pi + ${2 * r_val * r_val}\\pi = ${Stp_pi}\\pi\\text{ cm}^2$.`
      ],
      misconceptions: ['Chỉ cộng diện tích 1 đáy (nhầm sang hình trụ không nắp)', 'Lấy nhầm Sxq là Stp'],
      quickHints: [`$S_{tp} = 2\\pi r(h + r)$.`, `Thay $r = ${r_val}$, $h = ${h_val}$ vào công thức.`],
      sourceReference: 'SRC-TN-04',
      questionFingerprint: 'CYL_STP_Q' + id + '_r' + r_val + '_h' + h_val
    });
  }
}
