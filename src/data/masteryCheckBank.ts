/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - MASTERY CHECK QUESTION BANK
 * Parallel test items for Spaced Error Recheck and Concept Verification.
 */

import { MasteryCheckQuestion } from '../types/errorMemory';

export const MASTERY_CHECK_BANK: MasteryCheckQuestion[] = [
  // 1. RADIUS VS DIAMETER (Concept: radius_vs_diameter)
  {
    id: 'chk-rad-diam-01',
    concept: 'radius_vs_diameter',
    conceptTitle: 'Bán kính và Đường kính (R vs d)',
    shape: 'sphere',
    title: 'Kiểm tra nhanh: Đường kính quả cầu',
    questionText: 'Một quả cầu có đường kính d = 10 cm. Bán kính R của quả cầu bằng bao nhiêu cm?',
    questionLatex: 'd = 10\\text{ cm} \\implies R = ?',
    type: 'numeric',
    expectedNumeric: 5,
    tolerance: 0.1,
    unit: 'cm',
    hint: 'Nhớ quy tắc cơ bản: Bán kính R luôn bằng một nửa đường kính (R = d / 2).',
    explanation: 'Bán kính hình cầu bằng một nửa đường kính: $R = \\frac{d}{2} = \\frac{10}{2} = 5\\text{ cm}$.',
    formulaLatex: 'R = \\frac{d}{2} = 5\\text{ cm}',
    relatedSpatialMetric: 'elementIdentification',
    difficulty: 'easy'
  },
  {
    id: 'chk-rad-diam-02',
    concept: 'radius_vs_diameter',
    conceptTitle: 'Bán kính và Đường kính (R vs d)',
    shape: 'cylinder',
    title: 'Kiểm tra nhanh: Bán kính đáy hình trụ',
    questionText: 'Một lon nước ngọt hình trụ có đường kính đáy d = 6.4 cm. Bán kính đáy r của lon nước là:',
    type: 'multiple_choice',
    options: [
      { id: 'opt-1', text: '6.4 cm', isCorrect: false, explanation: '6.4 cm là đường kính d, chưa chia 2.' },
      { id: 'opt-2', text: '3.2 cm', isCorrect: true, explanation: 'Chính xác! r = d / 2 = 6.4 / 2 = 3.2 cm.' },
      { id: 'opt-3', text: '12.8 cm', isCorrect: false, explanation: 'Nhầm nhân đôi thay vì chia 2.' },
      { id: 'opt-4', text: '1.6 cm', isCorrect: false, explanation: 'Chia 4 là không chính xác.' }
    ],
    hint: 'Bán kính bằng một nửa đường kính đáy.',
    explanation: 'Bán kính đáy $r = \\frac{d}{2} = \\frac{6{,}4}{2} = 3{,}2\\text{ cm}$.',
    formulaLatex: 'r = \\frac{d}{2} = 3{,}2\\text{ cm}',
    relatedSpatialMetric: 'elementIdentification',
    difficulty: 'easy'
  },

  // 2. GENERATRIX VS HEIGHT (Concept: generatrix_vs_height)
  {
    id: 'chk-cone-lh-01',
    concept: 'generatrix_vs_height',
    conceptTitle: 'Đường sinh và Chiều cao Hình Nón (l vs h)',
    shape: 'cone',
    title: 'Kiểm tra nhanh: Độ dài đường sinh hình nón',
    questionText: 'Một hình nón có bán kính đáy r = 4 cm và chiều cao h = 3 cm. Độ dài đường sinh l bằng bao nhiêu cm?',
    questionLatex: 'r = 4\\text{ cm}, \\quad h = 3\\text{ cm} \\implies l = ?',
    type: 'numeric',
    expectedNumeric: 5,
    tolerance: 0.1,
    unit: 'cm',
    hint: 'Tam giác vuông tạo bởi chiều cao h, bán kính đáy r và đường sinh l (cạnh huyền). Dùng định lý Pythagore: l² = h² + r².',
    explanation: 'Áp dụng định lý Pythagore trong tam giác vuông: $l = \\sqrt{h^2 + r^2} = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5\\text{ cm}$.',
    formulaLatex: 'l = \\sqrt{h^2 + r^2} = \\sqrt{3^2 + 4^2} = 5\\text{ cm}',
    relatedSpatialMetric: 'elementIdentification',
    difficulty: 'medium'
  },
  {
    id: 'chk-cone-lh-02',
    concept: 'generatrix_vs_height',
    conceptTitle: 'Đường sinh và Chiều cao Hình Nón (l vs h)',
    shape: 'cone',
    title: 'Kiểm tra khái niệm: Đường nào là đường sinh?',
    questionText: 'Trong hình nón có đỉnh S, tâm đáy O và một điểm A nằm trên đường tròn đáy. Đoạn thẳng nào là đường sinh của hình nón?',
    type: 'multiple_choice',
    options: [
      { id: 'opt-1', text: 'Đoạn SO', isCorrect: false, explanation: 'SO là trục quay/chiều cao vuông góc với mặt phẳng đáy.' },
      { id: 'opt-2', text: 'Đoạn OA', isCorrect: false, explanation: 'OA là bán kính đáy r của hình nón.' },
      { id: 'opt-3', text: 'Đoạn SA', isCorrect: true, explanation: 'Chính xác! Đoạn thẳng nối đỉnh S với một điểm A trên đường tròn đáy chính là đường sinh l.' },
      { id: 'opt-4', text: 'Đường kính đáy đi qua A', isCorrect: false, explanation: 'Đường kính nằm hoàn toàn trên mặt đáy.' }
    ],
    hint: 'Đường sinh là đoạn thẳng quét nên mặt xung quanh của hình nón khi quay tam giác vuông.',
    explanation: 'Đoạn thẳng $SA$ nối đỉnh $S$ với điểm $A$ trên đường tròn đáy là đường sinh $l$. Chiều cao là $SO = h$, bán kính đáy là $OA = r$.',
    formulaLatex: 'SA = l, \\quad SO = h, \\quad OA = r',
    relatedSpatialMetric: 'elementIdentification',
    difficulty: 'easy'
  },

  // 3. CONE VOLUME ONE THIRD & PARADOX (Concept: cone_volume_one_third)
  {
    id: 'chk-cone-v-01',
    concept: 'cone_volume_one_third',
    conceptTitle: 'Hệ số 1/3 Thể tích Hình Nón',
    shape: 'cone',
    title: 'Kiểm tra tư duy: Nghịch lý 1/3 Thể tích',
    questionText: 'Một chiếc cốc hình trụ và một phễu hình nón có cùng bán kính đáy r và cùng chiều cao h. Nếu thể tích cốc hình trụ là 90 cm³, thể tích phễu hình nón là bao nhiêu cm³?',
    questionLatex: 'V_{\\text{trụ}} = 90\\text{ cm}^3 \\implies V_{\\text{nón}} = ?',
    type: 'numeric',
    expectedNumeric: 30,
    tolerance: 0.5,
    unit: 'cm³',
    hint: 'Nhớ thí nghiệm rót nước: Cần 3 phễu nón để rót đầy 1 cốc trụ có cùng đáy và chiều cao (V_nón = 1/3 V_trụ).',
    explanation: 'Thể tích hình nón bằng một phần ba thể tích hình trụ có cùng đáy và chiều cao: $V_{\\text{nón}} = \\frac{1}{3} V_{\\text{trụ}} = \\frac{1}{3} \\times 90 = 30\\text{ cm}^3$.',
    formulaLatex: 'V_{\\text{nón}} = \\frac{1}{3} V_{\\text{trụ}} = 30\\text{ cm}^3',
    relatedSpatialMetric: 'mathematicalModeling',
    difficulty: 'easy'
  },
  {
    id: 'chk-cone-v-02',
    concept: 'cone_volume_one_third',
    conceptTitle: 'Hệ số 1/3 Thể tích Hình Nón',
    shape: 'cone',
    title: 'Bản chất hình học: Vì sao thể tích hình nón có hệ số 1/3?',
    questionText: 'Tại sao công thức thể tích hình nón lại có hệ số 1/3 so với hình trụ có cùng đáy và chiều cao?',
    type: 'multiple_choice',
    options: [
      { id: 'opt-1', text: 'Vì chu vi đáy hình nón bằng 1/3 chu vi hình trụ.', isCorrect: false, explanation: 'Hai hình có cùng bán kính đáy nên chu vi bằng nhau.' },
      { id: 'opt-2', text: 'Vì diện tích các thiết diện ngang của hình nón thu hẹp dần từ đáy lên đỉnh theo hàm bậc hai (nguyên lý Cavalieri/thực nghiệm rót nước 3 lần).', isCorrect: true, explanation: 'Rất sâu sắc! Khi đi từ đáy lên đỉnh, diện tích mặt cắt ngang giảm dần về 0, tích phân diện tích tạo ra hệ số 1/3.' },
      { id: 'opt-3', text: 'Vì hình nón có 3 đỉnh.', isCorrect: false, explanation: 'Hình nón chỉ có 1 đỉnh S duy nhất.' },
      { id: 'opt-4', text: 'Vì chiều cao hình nón bằng 1/3 đường sinh.', isCorrect: false, explanation: 'Chiều cao và đường sinh liên hệ theo Pythagore, không bằng 1/3.' }
    ],
    hint: 'Hãy quan sát thể tích không gian bị thu hẹp dần từ đáy hình tròn lên đến đỉnh nhọn của hình nón.',
    explanation: 'Hình nón thu hẹp dần đều từ đáy lên đỉnh. Theo nguyên lý Cavalieri và thí nghiệm thực tiễn, thể tích hình nón luôn chiếm đúng $\\frac{1}{3}$ thể tích hình trụ ngoại tiếp có cùng $r$ và $h$.',
    formulaLatex: 'V_{\\text{nón}} = \\frac{1}{3}\\pi r^2 h',
    relatedSpatialMetric: 'problemSolving',
    difficulty: 'hard'
  },

  // 4. SPHERE GREAT CIRCLE & EXPONENT (Concept: sphere_great_circle / sphere_formula_exponent)
  {
    id: 'chk-sph-gc-01',
    concept: 'sphere_great_circle',
    conceptTitle: 'Thiết diện & Đường tròn lớn của Mặt Cầu',
    shape: 'sphere',
    title: 'Kiểm tra nhanh: Mặt phẳng cắt khối cầu qua tâm',
    questionText: 'Một mặt phẳng cắt mặt cầu tâm O bán kính R = 6 cm đi qua tâm O. Bán kính r của đường tròn giao tuyến bằng bao nhiêu cm?',
    questionLatex: '(\\alpha) \\text{ qua tâm } O, R = 6\\text{ cm} \\implies r_{\\text{thiết diện}} = ?',
    type: 'numeric',
    expectedNumeric: 6,
    tolerance: 0.1,
    unit: 'cm',
    hint: 'Mặt phẳng đi qua tâm của mặt cầu luôn tạo ra thiết diện là một đường tròn lớn có bán kính bằng đúng bán kính R của mặt cầu.',
    explanation: 'Giao tuyến của mặt phẳng đi qua tâm với mặt cầu là đường tròn lớn, có bán kính $r = R = 6\\text{ cm}$.',
    formulaLatex: 'r_{\\text{lớn}} = R = 6\\text{ cm}',
    relatedSpatialMetric: 'spatialTransformation',
    difficulty: 'easy'
  },
  {
    id: 'chk-sph-exp-01',
    concept: 'sphere_formula_exponent',
    conceptTitle: 'Công thức Diện tích Mặt Cầu và Thể tích Khối Cầu',
    shape: 'sphere',
    title: 'Kiểm tra công thức: Diện tích mặt cầu và Thể tích khối cầu',
    questionText: 'Công thức tính thể tích V của khối cầu bán kính R là:',
    type: 'multiple_choice',
    options: [
      { id: 'opt-1', text: 'V = 4πR²', isCorrect: false, explanation: '4πR² là công thức tính DIỆN TÍCH MẶT CẦU S, không phải thể tích.' },
      { id: 'opt-2', text: 'V = (4/3)πR³', isCorrect: true, explanation: 'Chính xác! Thể tích khối cầu là (4/3)πR³ (đơn vị cm³ tương ứng với R³).' },
      { id: 'opt-3', text: 'V = (4/3)πR²', isCorrect: false, explanation: 'Nhầm số mũ R² thay vì R³.' },
      { id: 'opt-4', text: 'V = (1/3)πR³', isCorrect: false, explanation: '1/3 là hệ số của hình nón, hình cầu là 4/3.' }
    ],
    hint: 'Thể tích có đơn vị khối (cm³), vì vậy bán kính R phải mang số mũ 3 (R³), đi kèm hệ số 4/3.',
    explanation: 'Thể tích khối cầu là $V = \\frac{4}{3}\\pi R^3$. Diện tích mặt cầu là $S = 4\\pi R^2$.',
    formulaLatex: 'V = \\frac{4}{3}\\pi R^3, \\quad S = 4\\pi R^2',
    relatedSpatialMetric: 'mathematicalModeling',
    difficulty: 'easy'
  },

  // 5. CYLINDER TOTAL SURFACE (Concept: cylinder_total_surface)
  {
    id: 'chk-cyl-stp-01',
    concept: 'cylinder_total_surface',
    conceptTitle: 'Diện tích Toàn phần Hình Trụ (Stp)',
    shape: 'cylinder',
    title: 'Kiểm tra nhanh: Diện tích toàn phần hình trụ',
    questionText: 'Hình trụ có bán kính đáy r = 3 cm và chiều cao h = 5 cm. Diện tích toàn phần Stp của hình trụ là bao nhiêu π cm² (chỉ nhập hệ số trước π)?',
    questionLatex: 'r = 3\\text{ cm}, h = 5\\text{ cm} \\implies S_{tp} = ?\\pi\\text{ cm}^2',
    type: 'numeric',
    expectedNumeric: 48,
    tolerance: 0.5,
    unit: 'π cm²',
    hint: 'Stp = Sxq + 2*Sđáy = 2πrh + 2πr² = 2πr(h + r). Tính 2*3*(5 + 3).',
    explanation: '$S_{tp} = 2\\pi r h + 2\\pi r^2 = 2\\pi(3)(5) + 2\\pi(3^2) = 30\\pi + 18\\pi = 48\\pi\\text{ cm}^2$.',
    formulaLatex: 'S_{tp} = 2\\pi r(h + r) = 2\\pi \\cdot 3 \\cdot (5 + 3) = 48\\pi',
    relatedSpatialMetric: 'mathematicalModeling',
    difficulty: 'medium'
  },

  // 6. UNFOLDING NETS (Concept: unfolding_nets)
  {
    id: 'chk-unfold-01',
    concept: 'unfolding_nets',
    conceptTitle: 'Khai triển Mặt Xung Quanh (3D → 2D)',
    shape: 'cylinder',
    title: 'Kiểm tra tư duy 3D → 2D: Khai triển hình trụ',
    questionText: 'Khai triển mặt xung quanh của một hình trụ có bán kính đáy r và chiều cao h ta thu được một hình chữ nhật có kích thước là:',
    type: 'multiple_choice',
    options: [
      { id: 'opt-1', text: 'πr và h', isCorrect: false, explanation: 'Chiều dài hình chữ nhật là toàn bộ chu vi đáy (2πr), không phải nửa chu vi.' },
      { id: 'opt-2', text: '2πr và h', isCorrect: true, explanation: 'Chính xác! Chiều dài bằng chu vi đáy 2πr và chiều rộng bằng chiều cao h.' },
      { id: 'opt-3', text: '2r và h', isCorrect: false, explanation: '2r chỉ là đường kính d, chưa nhân π.' },
      { id: 'opt-4', text: 'πr² và h', isCorrect: false, explanation: 'πr² là diện tích hình tròn đáy.' }
    ],
    hint: 'Mép dưới của hình chữ nhật khi cuộn tròn lại vừa khít với đường tròn đáy của hình trụ.',
    explanation: 'Khi trải phẳng mặt xung quanh hình trụ, ta được một hình chữ nhật có một cạnh là chu vi đáy $C = 2\\pi r$ và cạnh kia là chiều cao $h$.',
    formulaLatex: 'S_{xq} = 2\\pi r \\times h',
    relatedSpatialMetric: 'threeDToTwoD',
    difficulty: 'easy'
  }
];

export function getMasteryCheckByConcept(concept: string): MasteryCheckQuestion | undefined {
  return MASTERY_CHECK_BANK.find((q) => q.concept === concept);
}

export function getRandomMasteryCheck(excludeIds: string[] = []): MasteryCheckQuestion {
  const available = MASTERY_CHECK_BANK.filter((q) => !excludeIds.includes(q.id));
  if (available.length === 0) return MASTERY_CHECK_BANK[0];
  const idx = Math.floor(Math.random() * available.length);
  return available[idx];
}
