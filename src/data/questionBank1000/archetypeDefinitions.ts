/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - ARCHETYPE CATALOGUE (38 ARCHETYPES)
 * Extracted from 73 Source Questions (31 MCQ + 42 TL).
 */

import { ArchetypeDefinition } from './canonicalSchema';

export const MASTER_ARCHETYPES: ArchetypeDefinition[] = [
  // 1. NHẬN BIẾT & YẾU TỐ HÌNH TRỤ
  {
    archetypeId: 'ARCH-CYL-REC',
    name: 'Nhận biết hình trụ',
    category: 'CYLINDER',
    subCategory: 'Nhận biết',
    description: 'Nhận diện hình trụ được sinh ra khi quay hình chữ nhật quanh một cạnh cố định, nhận biết đáy, đường sinh, trục.',
    mathematicalModel: 'Hình sinh bởi phép quay hình chữ nhật quanh 1 cạnh trục cố định.',
    coreFormulas: ['h = l', 'S_{\\text{đáy}} = \\pi r^2'],
    typicalTraps: ['Nhầm đường kính với bán kính', 'Nhầm hình nón với hình trụ'],
    sourceQuestionIds: ['MCQ-001', 'MCQ-002']
  },
  {
    archetypeId: 'ARCH-CYL-VOL',
    name: 'Công thức thể tích trụ',
    category: 'CYLINDER',
    subCategory: 'Tính toán cơ bản',
    description: 'Tính thể tích khối trụ theo bán kính đáy r (hoặc đường kính d) và chiều cao h.',
    mathematicalModel: 'V = S_{\\text{đáy}} \\cdot h = \\pi r^2 h',
    coreFormulas: ['V = \\pi r^2 h'],
    typicalTraps: ['Quên bình phương bán kính r (lấy pi * r * h)', 'Nhầm hệ số 1/3 của hình nón'],
    sourceQuestionIds: ['MCQ-003', 'MCQ-004', 'TL-001', 'TL-002']
  },
  {
    archetypeId: 'ARCH-CYL-AREA',
    name: 'Công thức diện tích trụ',
    category: 'CYLINDER',
    subCategory: 'Tính toán cơ bản',
    description: 'Tính diện tích xung quanh và diện tích toàn phần của hình trụ.',
    mathematicalModel: 'S_{xq} = 2\\pi rh, \\quad S_{tp} = 2\\pi rh + 2\\pi r^2 = 2\\pi r(h + r)',
    coreFormulas: ['S_{xq} = 2\\pi rh', 'S_{tp} = 2\\pi r(h + r)'],
    typicalTraps: ['Quên nhân hệ số 2 ở diện tích xung quanh', 'Chỉ cộng 1 đáy ở diện tích toàn phần (trừ khi là thùng không nắp)'],
    sourceQuestionIds: ['MCQ-005', 'MCQ-006', 'TL-003']
  },
  {
    archetypeId: 'ARCH-CYL-UNFOLD',
    name: 'Khai triển trụ',
    category: 'CYLINDER',
    subCategory: 'Mô hình hóa / Khai triển phẳng',
    description: 'Trải phẳng mặt xung quanh hình trụ thành hình chữ nhật có kích thước là chu vi đáy và chiều cao.',
    mathematicalModel: 'Mặt xung quanh là hình chữ nhật kích thước 2\\pi r \\times h.',
    coreFormulas: ['C_{\\text{đáy}} = 2\\pi r', 'S_{\\text{HCN}} = 2\\pi r h'],
    typicalTraps: ['Lấy chiều dài hình chữ nhật bằng r hoặc d thay vì 2pi*r', 'Tính nhầm sang diện tích toàn phần'],
    sourceQuestionIds: ['MCQ-007', 'TL-004']
  },
  {
    archetypeId: 'ARCH-CYL-SECTION',
    name: 'Thiết diện qua trục của hình trụ',
    category: 'CYLINDER',
    subCategory: 'Hình học không gian',
    description: 'Mặt phẳng cắt hình trụ song song hoặc chứa trục, tạo thành hình chữ nhật (hoặc hình vuông) kích thước 2r x h.',
    mathematicalModel: 'Thiết diện qua trục là hình chữ nhật ABCD có AB = 2r, BC = h.',
    coreFormulas: ['S_{\\text{thiết diện}} = 2r \\cdot h', 'd_{\\text{đáy}} = 2r'],
    typicalTraps: ['Lấy cạnh đáy thiết diện là r thay vì 2r', 'Nhầm thiết diện nón là tam giác'],
    sourceQuestionIds: ['MCQ-008', 'TL-005']
  },

  // 2. NHẬN BIẾT & YẾU TỐ HÌNH NÓN
  {
    archetypeId: 'ARCH-CONE-REC',
    name: 'Nhận biết hình nón',
    category: 'CONE',
    subCategory: 'Nhận biết',
    description: 'Hình nón sinh ra khi quay tam giác vuông quanh một cạnh góc vuông cố định. Nhận biết đỉnh, trục, đường sinh, bán kính đáy.',
    mathematicalModel: 'Hình sinh bởi tam giác vuông quay quanh 1 cạnh góc vuông.',
    coreFormulas: ['l^2 = r^2 + h^2'],
    typicalTraps: ['Nhầm đường sinh l với chiều cao h', 'Nhầm tam giác cân quay với tam giác vuông quay'],
    sourceQuestionIds: ['MCQ-009', 'MCQ-010']
  },
  {
    archetypeId: 'ARCH-CONE-VOL',
    name: 'Công thức thể tích nón',
    category: 'CONE',
    subCategory: 'Tính toán cơ bản',
    description: 'Tính thể tích khối nón theo bán kính đáy r và chiều cao h.',
    mathematicalModel: 'V = \\frac{1}{3} S_{\\text{đáy}} \\cdot h = \\frac{1}{3}\\pi r^2 h',
    coreFormulas: ['V = \\frac{1}{3}\\pi r^2 h'],
    typicalTraps: ['Quên hệ số 1/3 (tính ra thể tích hình trụ)', 'Lấy đường sinh l thay cho chiều cao h trong công thức thể tích'],
    sourceQuestionIds: ['MCQ-011', 'MCQ-012', 'TL-006', 'TL-007']
  },
  {
    archetypeId: 'ARCH-CONE-AREA',
    name: 'Công thức diện tích nón',
    category: 'CONE',
    subCategory: 'Tính toán cơ bản',
    description: 'Tính diện tích xung quanh và toàn phần của hình nón theo bán kính đáy r và đường sinh l.',
    mathematicalModel: 'S_{xq} = \\pi rl, \\quad S_{tp} = \\pi rl + \\pi r^2 = \\pi r(l + r)',
    coreFormulas: ['S_{xq} = \\pi rl', 'S_{tp} = \\pi r(l + r)', 'l = \\sqrt{r^2 + h^2}'],
    typicalTraps: ['Lấy chiều cao h thay vì đường sinh l khi tính Sxq (lấy pi*r*h)', 'Cộng 2 đáy như hình trụ'],
    sourceQuestionIds: ['MCQ-013', 'MCQ-014', 'TL-008', 'TL-009']
  },
  {
    archetypeId: 'ARCH-CONE-PYTHAGORAS',
    name: 'Đường sinh - Chiều cao - Bán kính (Pythagoras)',
    category: 'CONE',
    subCategory: 'Hệ thức liên hệ',
    description: 'Áp dụng định lý Pythagoras trong tam giác vuông tạo bởi chiều cao, bán kính đáy và đường sinh: l² = r² + h².',
    mathematicalModel: 'l = \\sqrt{r^2 + h^2}, \\quad h = \\sqrt{l^2 - r^2}, \\quad r = \\sqrt{l^2 - h^2}',
    coreFormulas: ['l^2 = r^2 + h^2'],
    typicalTraps: ['Tính h = sqrt(l^2 + r^2) thay vì dấu trừ', 'Nhầm góc ở đỉnh nón là 2 alpha'],
    sourceQuestionIds: ['MCQ-015', 'MCQ-016', 'TL-010']
  },
  {
    archetypeId: 'ARCH-CONE-UNFOLD',
    name: 'Khai triển nón',
    category: 'CONE',
    subCategory: 'Khai triển phẳng',
    description: 'Mặt xung quanh hình nón khi khai triển là hình quạt tròn bán kính R = l và góc ở tâm alpha.',
    mathematicalModel: '\\alpha = \\frac{r}{l} \\cdot 360^\\circ, \\quad S_{xq} = \\frac{\\pi l^2 \\alpha}{360^\\circ} = \\pi rl',
    coreFormulas: ['\\alpha = \\frac{r}{l} \\cdot 360^\\circ'],
    typicalTraps: ['Lấy bán kính quạt tròn là r thay vì đường sinh l', 'Quên công thức tính góc quạt tròn'],
    sourceQuestionIds: ['MCQ-017', 'TL-011']
  },

  // 3. NHẬN BIẾT & YẾU TỐ HÌNH CẦU
  {
    archetypeId: 'ARCH-SPH-REC',
    name: 'Nhận biết hình cầu',
    category: 'SPHERE',
    subCategory: 'Nhận biết',
    description: 'Mặt cầu / khối cầu sinh ra khi quay nửa hình tròn quanh đường kính cố định.',
    mathematicalModel: 'Tập hợp các điểm cách tâm O một khoảng bằng R.',
    coreFormulas: ['d = 2R', 'S = 4\\pi R^2'],
    typicalTraps: ['Nhầm khối cầu (đặc) và mặt cầu (vỏ)', 'Nhầm đường kính d với bán kính R'],
    sourceQuestionIds: ['MCQ-018', 'MCQ-019']
  },
  {
    archetypeId: 'ARCH-SPH-AREA',
    name: 'Công thức mặt cầu',
    category: 'SPHERE',
    subCategory: 'Tính toán cơ bản',
    description: 'Tính diện tích mặt cầu bán kính R hoặc đường kính d.',
    mathematicalModel: 'S = 4\\pi R^2 = \\pi d^2',
    coreFormulas: ['S = 4\\pi R^2 = \\pi d^2'],
    typicalTraps: ['Quên hệ số 4 (tính diện tích hình tròn pi*R^2)', 'Lấy 4*pi*d^2 khi đề cho đường kính'],
    sourceQuestionIds: ['MCQ-020', 'MCQ-021', 'TL-012', 'TL-013']
  },
  {
    archetypeId: 'ARCH-SPH-VOL',
    name: 'Công thức thể tích cầu',
    category: 'SPHERE',
    subCategory: 'Tính toán cơ bản',
    description: 'Tính thể tích khối cầu bán kính R hoặc đường kính d.',
    mathematicalModel: 'V = \\frac{4}{3}\\pi R^3 = \\frac{1}{6}\\pi d^3',
    coreFormulas: ['V = \\frac{4}{3}\\pi R^3'],
    typicalTraps: ['Nhầm số mũ R^2 thay vì R^3', 'Quên hệ số 4/3 (chỉ lấy 1/3 hoặc pi*R^3)'],
    sourceQuestionIds: ['MCQ-022', 'MCQ-023', 'TL-014', 'TL-015']
  },

  // 4. QUAY HÌNH & TẠO KHỐI
  {
    archetypeId: 'ARCH-ROT-TRI',
    name: 'Quay hình (Tam giác / Chữ nhật / Hình thang)',
    category: 'COMPOSITE',
    subCategory: 'Quay hình tạo khối',
    description: 'Quay tam giác vuông quanh cạnh góc vuông hoặc cạnh huyền, quay hình chữ nhật, hình thang vuông tạo khối tròn xoay.',
    mathematicalModel: 'Vật thể tròn xoay tổng hợp (nón kép, trụ khoét nón, v.v.).',
    coreFormulas: ['V = V_1 + V_2', 'r = \\text{khoảng cách tới trục quay}'],
    typicalTraps: ['Xác định sai bán kính quét khi quay quanh cạnh huyền', 'Tính nhầm chiều cao khối nón kép'],
    sourceQuestionIds: ['MCQ-024', 'MCQ-025', 'TL-016']
  },

  // 5. KHỐI TỔNG HỢP & GHÉP NỐI
  {
    archetypeId: 'ARCH-COMP-CYL-SPH',
    name: 'Trụ + cầu / Trụ + nửa cầu',
    category: 'COMPOSITE',
    subCategory: 'Khối liên hợp',
    description: 'Mô hình viên thuốc, bồn chứa khí dạng hình trụ ở giữa và 2 đầu là 2 bán cầu.',
    mathematicalModel: 'V = V_{\\text{trụ}} + V_{\\text{cầu}} = \\pi r^2 h + \\frac{4}{3}\\pi r^3',
    coreFormulas: ['V = \\pi r^2 h + \\frac{4}{3}\\pi r^3', 'S = 2\\pi rh + 4\\pi r^2'],
    typicalTraps: ['Cộng thêm diện tích đáy phẳng bên trong (vốn là phần ghép kín)', 'Lấy chiều dài cả vật thể làm chiều cao trụ mà không trừ 2 đầu cầu'],
    sourceQuestionIds: ['MCQ-026', 'TL-017', 'TL-018']
  },
  {
    archetypeId: 'ARCH-COMP-CONE-CYL',
    name: 'Nón + trụ',
    category: 'COMPOSITE',
    subCategory: 'Khối liên hợp',
    description: 'Mô hình bút chì, ngọn hải đăng, tháp chuông gồm phần dưới hình trụ và mái trên hình nón.',
    mathematicalModel: 'V = \\pi r^2 h_1 + \\frac{1}{3}\\pi r^2 h_2',
    coreFormulas: ['V = \\pi r^2 (h_1 + \\frac{1}{3}h_2)', 'S_{xq} = 2\\pi r h_1 + \\pi r l'],
    typicalTraps: ['Tính diện tích mặt tiếp giáp giữa nón và trụ', 'Nhầm chiều cao nón và chiều cao trụ'],
    sourceQuestionIds: ['MCQ-027', 'TL-019', 'TL-020']
  },
  {
    archetypeId: 'ARCH-COMP-CONE-SPH',
    name: 'Nón + cầu (Kem ốc quế / Phao tiêu)',
    category: 'COMPOSITE',
    subCategory: 'Khối liên hợp',
    description: 'Khối gồm hình nón gắn liền với nửa khối cầu có cùng bán kính đáy.',
    mathematicalModel: 'V = \\frac{1}{3}\\pi r^2 h + \\frac{2}{3}\\pi r^3',
    coreFormulas: ['V = \\frac{1}{3}\\pi r^2 (h + 2r)', 'S = \\pi r l + 2\\pi r^2'],
    typicalTraps: ['Tính nguyên cả khối cầu thay vì nửa khối cầu', 'Cộng mặt đáy tròn ngăn cách'],
    sourceQuestionIds: ['MCQ-028', 'TL-021']
  },

  // 6. BÀI TOÁN THỰC TẾ & VẬT LÝ
  {
    archetypeId: 'ARCH-WATER-RISE',
    name: 'Nước dâng / Vật chìm / Thả bi',
    category: 'REAL_WORLD',
    subCategory: 'Thủy tĩnh & Thể tích nước dâng',
    description: 'Thả viên bi cầu / vật đặc vào bình trụ đựng nước, thể tích nước dâng lên đúng bằng thể tích vật chìm: V_vật = S_đáy * delta_h.',
    mathematicalModel: '\\Delta V = S_{\\text{đáy}} \\cdot \\Delta h = \\pi R^2 \\cdot \\Delta h = n \\cdot V_{\\text{bi}}',
    coreFormulas: ['\\Delta h = \\frac{n \\cdot \\frac{4}{3}\\pi r^3}{\\pi R^2}'],
    typicalTraps: ['Lấy bán kính bi làm bán kính bình trụ', 'Quên nhân số lượng viên bi n'],
    sourceQuestionIds: ['MCQ-029', 'TL-022', 'TL-023', 'TL-024']
  },
  {
    archetypeId: 'ARCH-COUNT-SPHERES',
    name: 'Số viên bi / Đúc rót / Nấu chảy kim loại',
    category: 'REAL_WORLD',
    subCategory: 'Bảo toàn thể tích',
    description: 'Nấu chảy khối kim loại hình trụ/nón để đúc thành các viên bi cầu hoặc ngược lại. Số lượng n = V_tổng / V_viên.',
    mathematicalModel: 'n = \\frac{V_{\\text{lớn}}}{V_{\\text{nhỏ}}}',
    coreFormulas: ['n = \\frac{V_1}{V_2}', 'V_{\\text{hao hụt}} = V_1 \\cdot (1 - k\\%)'],
    typicalTraps: ['Không làm tròn xuống khi hỏi số vật hoàn chỉnh tạo thành', 'Quên tỉ lệ hao hụt kim loại'],
    sourceQuestionIds: ['MCQ-030', 'TL-025', 'TL-026']
  },
  {
    archetypeId: 'ARCH-TANK-CAPACITY',
    name: 'Bồn chứa / Xe bồn / Dung tích lít',
    category: 'REAL_WORLD',
    subCategory: 'Dung tích chứa',
    description: 'Tính sức chứa của téc nước, xe bồn chở xăng dầu hình trụ nằm ngang hoặc đứng, đổi ra đơn vị lít (dm3).',
    mathematicalModel: 'V (\\text{lít}) = V (\\text{m}^3) \\times 1000 = V (\\text{dm}^3)',
    coreFormulas: ['1\\text{ m}^3 = 1000\\text{ dm}^3 = 1000\\text{ lít}'],
    typicalTraps: ['Sai hệ số đổi đơn vị m3 sang lít (nhầm nhân 100 thay vì 1000)', 'Không trừ bề dày vỏ bồn'],
    sourceQuestionIds: ['MCQ-031', 'TL-027', 'TL-028']
  },
  {
    archetypeId: 'ARCH-CONICAL-HAT',
    name: 'Nón lá / Mũ chú hề / Chao đèn / Phễu',
    category: 'REAL_WORLD',
    subCategory: 'Vật dụng hình nón',
    description: 'Tính diện tích lá làm nón (diện tích xung quanh), thể tích phễu rót nước, mũ sinh nhật.',
    mathematicalModel: 'S_{\\text{lá}} = \\pi r l, \\quad l = \\sqrt{r^2 + h^2}',
    coreFormulas: ['S_{\\text{lá}} = \\pi r \\sqrt{r^2 + h^2}', 'V = \\frac{1}{3}\\pi r^2 h'],
    typicalTraps: ['Lấy đường kính thay vì bán kính', 'Tính cả đáy nón (nón lá không có đáy phẳng)'],
    sourceQuestionIds: ['TL-029', 'TL-030', 'TL-031']
  },
  {
    archetypeId: 'ARCH-MATERIAL-COST',
    name: 'Vật liệu / Chi phí / Sơn quét',
    category: 'REAL_WORLD',
    subCategory: 'Kinh tế & Dự toán',
    description: 'Tính diện tích cần sơn (mặt trong, mặt ngoài, cột tròn) và nhân đơn giá để ra tổng chi phí.',
    mathematicalModel: 'T = S_{\\text{cần sơn}} \\times \\text{Đơn giá} \\times (1 + \\text{Hao hụt})',
    coreFormulas: ['\\text{Chi phí} = S \\times \\text{Đơn giá}'],
    typicalTraps: ['Sơn cả trong lẫn ngoài phải nhân đôi diện tích', 'Quên cộng đáy thùng nếu là thùng kín'],
    sourceQuestionIds: ['TL-032', 'TL-033', 'TL-034']
  },
  {
    archetypeId: 'ARCH-UNIT-ROUNDING',
    name: 'Đổi đơn vị & Quy tắc làm tròn',
    category: 'REAL_WORLD',
    subCategory: 'Đo lường',
    description: 'Bài toán yêu cầu đổi giữa cm, dm, m, mm, inch, lít, kg và làm tròn theo quy định đề bài.',
    mathematicalModel: '1\\text{ dm}^3 = 1\\text{ lít} = 1000\\text{ cm}^3, \\quad 1\\text{ m}^3 = 1000\\text{ lít}',
    coreFormulas: ['m = D \\cdot V'],
    typicalTraps: ['Đổi sai đơn vị khối lượng riêng D (kg/m3 sang g/cm3)', 'Làm tròn sai quy tắc (làm tròn số trung gian sớm)'],
    sourceQuestionIds: ['TL-035', 'TL-036']
  },
  {
    archetypeId: 'ARCH-INVERSE-CALC',
    name: 'Bài toán ngược (Tìm r, h, l khi biết V, S)',
    category: 'REAL_WORLD',
    subCategory: 'Đại số hóa hình học',
    description: 'Cho biết thể tích hoặc diện tích xung quanh, yêu cầu tìm ngược lại bán kính đáy hoặc chiều cao.',
    mathematicalModel: 'r = \\sqrt{\\frac{V}{\\pi h}}, \\quad h = \\frac{V}{\\pi r^2}, \\quad R = \\sqrt[3]{\\frac{3V}{4\\pi}}',
    coreFormulas: ['r = \\sqrt{\\frac{V}{\\pi h}}', 'l = \\frac{S_{xq}}{\\pi r}'],
    typicalTraps: ['Quên khai căn bậc 2 hoặc căn bậc 3', 'Tính sai khi rút biến'],
    sourceQuestionIds: ['TL-037', 'TL-038', 'TL-039']
  },
  {
    archetypeId: 'ARCH-OPTIMIZATION',
    name: 'Bài toán cực trị & Tối ưu hóa vật liệu',
    category: 'OPTIMIZATION',
    subCategory: 'Vận dụng cao',
    description: 'Tìm tỉ số h/r hoặc kích thước lon hộp, thùng chứa để diện tích toàn phần nhỏ nhất khi thể tích cố định (hoặc ngược lại).',
    mathematicalModel: 'S_{tp} = 2\\pi r^2 + \\frac{2V_0}{r} \\ge 3\\sqrt[3]{2\\pi V_0^2} \\implies h = 2r',
    coreFormulas: ['h = 2r \\iff \\frac{h}{r} = 2'],
    typicalTraps: ['Áp dụng bất đẳng thức Cauchy sai cách', 'Nghĩ rằng h = r tối ưu'],
    sourceQuestionIds: ['TL-040', 'TL-041', 'TL-042']
  }
];

export const ARCHETYPE_MAP = new Map<string, ArchetypeDefinition>(
  MASTER_ARCHETYPES.map((arch) => [arch.archetypeId, arch])
);

