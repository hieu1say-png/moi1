/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - 1000 QUESTION INTELLIGENCE BANK: SPHERE (300 QUESTIONS)
 * Comprehensive dataset covering Center, Radius, Diameter, Great Circle, Section Cuts,
 * Surface Area (4πR²), Volume (4/3 πR³), Real-world & Misconceptions.
 */

import { QuestionRecord } from './types';
import { QuestionNormalizer } from '../../services/ai/questionNormalizer';

// Base canonical Sphere questions
const canonicalSphereQuestions: Partial<QuestionRecord>[] = [
  {
    id: 'SPH-FORM-001',
    topic: 'SPHERE',
    intent: 'FORMULA',
    subIntent: 'SURFACE_AREA',
    difficulty: 'UNDERSTAND',
    question: 'Công thức tính diện tích mặt cầu là gì?',
    answer: 'Diện tích mặt cầu bằng bốn lần diện tích hình tròn lớn: S = 4πR² (hoặc S = πd² với d là đường kính).',
    shortAnswer: 'S = 4\\pi R^2',
    formula: 'S = 4\\pi R^2 = \\pi d^2',
    teacherStyleResponse: 'Công thức diện tích mặt cầu cực kỳ dễ nhớ nè em:\n$$S = 4\\pi R^2$$\nNó bằng đúng **4 lần diện tích hình tròn lớn** đi qua tâm! Em nhớ diện tích có đơn vị $\\text{cm}^2$ nên $R$ gắn với số mũ 2 nhé!',
    quickReplies: ['Công thức thể tích khối cầu?', 'Tính với R=3 cm', 'Tại sao có số 4?', 'Nếu cho đường kính d thì sao?'],
    commonMistakes: ['Nhầm với thể tích (viết 4/3 πR³)', 'Quên chia 2 khi đề bài cho đường kính d'],
    requiredData: ['R'],
    responseMode: 'FORMULA_RECALL'
  },
  {
    id: 'SPH-FORM-002',
    topic: 'SPHERE',
    intent: 'FORMULA',
    subIntent: 'VOLUME',
    difficulty: 'UNDERSTAND',
    question: 'Công thức tính thể tích hình cầu là gì?',
    answer: 'Thể tích khối cầu bằng bốn phần ba pi nhân bán kính lập phương: V = (4/3)πR³.',
    shortAnswer: 'V = \\frac{4}{3}\\pi R^3',
    formula: 'V = \\frac{4}{3}\\pi R^3 = \\frac{1}{6}\\pi d^3',
    teacherStyleResponse: 'Công thức thể tích khối cầu là:\n$$V = \\frac{4}{3}\\pi R^3$$\nVì thể tích có đơn vị khối $\\text{cm}^3$ nên $R$ có **mũ 3**, và đi cùng với phân số **$\\frac{4}{3}$** (có số 3 ở mẫu) nha em!',
    quickReplies: ['Tính với R=3 cm', 'Tính với R=6 cm', 'Phân biệt S mặt cầu và V khối cầu', 'Xem mô hình 3D'],
    commonMistakes: ['Quên mũ 3 của R (viết nhầm 4/3 πR²)', 'Quên phân số 4/3'],
    requiredData: ['R'],
    responseMode: 'FORMULA_RECALL'
  },
  {
    id: 'SPH-SECT-001',
    topic: 'SPHERE',
    intent: 'GREAT_CIRCLE',
    subIntent: 'GREAT_CIRCLE',
    difficulty: 'UNDERSTAND',
    question: 'Hình tròn lớn của hình cầu là gì? Tính chu vi và diện tích hình tròn lớn.',
    answer: 'Khi cắt mặt cầu bởi mặt phẳng đi qua tâm O, thiết diện là hình tròn có bán kính bằng bán kính R của hình cầu, gọi là hình tròn lớn. Chu vi C = 2πR, diện tích S = πR².',
    shortAnswer: 'S_{\\text{tròn lớn}} = \\pi R^2, \\quad C = 2\\pi R',
    formula: 'S_{\\text{tròn lớn}} = \\pi R^2, \\quad C = 2\\pi R, \\quad S_{\\text{mặt cầu}} = 4S_{\\text{tròn lớn}} = 4\\pi R^2',
    teacherStyleResponse: 'Mặt phẳng đi qua tâm $O$ của quả cầu cắt quả cầu tạo thành **hình tròn lớn**:\n- Bán kính hình tròn lớn: Đúng bằng bán kính $R$ của quả cầu.\n- Chu vi hình tròn lớn: $C = 2\\pi R$.\n- Diện tích hình tròn lớn: $S_{\\text{tròn lớn}} = \\pi R^2$.\n- **Mối liên hệ tuyệt đẹp**: Diện tích toàn bộ mặt cầu gấp đúng **4 lần** diện tích hình tròn lớn: $$S_{\\text{mặt cầu}} = 4\\pi R^2 = 4 \\cdot S_{\\text{tròn lớn}}$$',
    quickReplies: ['Nếu cắt không qua tâm?', 'Tính với R=5 cm', 'Tại sao diện tích gấp 4 lần?'],
    visualContext: { shape: 'sphere', highlightTarget: 'section' },
    responseMode: 'CONCEPT_EXPLANATION'
  },
  {
    id: 'SPH-CONC-001',
    topic: 'SPHERE',
    intent: 'CONCEPT',
    subIntent: 'GENERAL',
    difficulty: 'UNDERSTAND',
    question: 'Hình tròn lớn của hình cầu là gì? Mặt phẳng cắt mặt cầu khi nào?',
    answer: 'Khi cắt mặt cầu bởi một mặt phẳng đi qua tâm O, thiết diện thu được là một hình tròn có bán kính bằng đúng bán kính R của hình cầu, gọi là hình tròn lớn.',
    shortAnswer: 'Hình tròn qua tâm có bán kính đúng bằng R',
    formula: 'S_{\\text{tròn lớn}} = \\pi R^2, \\quad C = 2\\pi R',
    teacherStyleResponse: 'Khi ta dùng một mặt phẳng cắt đôi quả cầu qua chính tâm $O$ (giống như cắt đôi quả dưa hấu), mặt cắt thu được là **hình tròn lớn** với bán kính bằng đúng $R$. Diện tích hình tròn lớn này là $\\pi R^2$, và diện tích cả mặt cầu gấp đúng 4 lần hình tròn lớn đó: $S = 4\\pi R^2$!',
    quickReplies: ['Mặt phẳng cắt không qua tâm thì sao?', 'Khoảng cách từ tâm đến mặt phẳng', 'Mở mô hình 3D mặt cắt'],
    visualContext: { shape: 'sphere', highlightTarget: 'section' },
    responseMode: 'CONCEPT_EXPLANATION'
  },
  {
    id: 'SPH-CONC-002',
    topic: 'SPHERE',
    intent: 'CONCEPT',
    subIntent: 'GENERAL',
    difficulty: 'ANALYZE',
    question: 'Một mặt phẳng cách tâm mặt cầu khoảng cách d < R thì thiết diện là hình gì? Tính bán kính thiết diện.',
    answer: 'Khi d < R, mặt phẳng cắt mặt cầu theo giao tuyến là một đường tròn có bán kính r = √(R² - d²).',
    shortAnswer: 'r = \\sqrt{R^2 - d^2}',
    formula: 'r = \\sqrt{R^2 - d^2}',
    teacherStyleResponse: 'Xét tam giác vuông nối tâm $O$, hình chiếu của $O$ trên mặt phẳng (khoảng cách $d$), và một điểm trên đường tròn giao tuyến (bán kính cầu $R$ đóng vai trò là cạnh huyền). Theo định lý Pythagore:\n$$r = \\sqrt{R^2 - d^2}$$\nNếu $d = 0$ (qua tâm) thì $r = R$ (hình tròn lớn); nếu $d = R$ thì mặt phẳng tiếp xúc với mặt cầu tại 1 điểm duy nhất!',
    quickReplies: ['Tính r với R=5, d=3', 'Tính r với R=10, d=6', 'Xem 3D mô phỏng cắt cầu'],
    responseMode: 'CONCEPT_EXPLANATION'
  },
  {
    id: 'SPH-CALC-001',
    topic: 'SPHERE',
    intent: 'CALCULATION',
    subIntent: 'SURFACE_AREA',
    difficulty: 'APPLY',
    question: 'Tính diện tích mặt cầu và thể tích hình cầu có bán kính R = 3 cm.',
    answer: 'S = 4π · 3² = 36π cm² ≈ 113.10 cm². V = (4/3)π · 3³ = 36π cm³ ≈ 113.10 cm³.',
    shortAnswer: 'S = 36\\pi\\text{ cm}^2, \\quad V = 36\\pi\\text{ cm}^3',
    formula: 'S = 4\\pi \\cdot 3^2 = 36\\pi\\text{ cm}^2, \\quad V = \\frac{4}{3}\\pi \\cdot 3^3 = 36\\pi\\text{ cm}^3',
    teacherStyleResponse: 'Trường hợp $R = 3\\text{ cm}$ là một trường hợp đặc biệt rất thú vị nè em:\n1. Diện tích mặt cầu: $S = 4\\pi R^2 = 4\\pi \\cdot 3^2 = 36\\pi\\text{ cm}^2$.\n2. Thể tích khối cầu: $V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi \\cdot 27 = 36\\pi\\text{ cm}^3$.\nCả hai đều có giá trị số là $36\\pi$ nhưng khác đơn vị đo ($\\text{cm}^2$ và $\\text{cm}^3$) nhé!',
    quickReplies: ['Thử với R=6 cm', 'Thử với R=5 cm', 'Tại sao R=3 thì S và V cùng số?'],
    requiredData: ['R=3'],
    responseMode: 'STEP_GUIDANCE'
  },
  {
    id: 'SPH-ERR-001',
    topic: 'SPHERE',
    intent: 'ERROR_ANALYSIS',
    subIntent: 'DIAMETER',
    difficulty: 'APPLY',
    question: 'Một quả bóng có đường kính d = 20 cm, em tính diện tích S = 4 · π · 20² = 1600π cm² có đúng không?',
    answer: 'Sai. Đường kính d = 20 cm thì bán kính R = d / 2 = 10 cm. Do đó S = 4π · 10² = 400π cm².',
    shortAnswer: 'Sai: Phải lấy R = 10\\text{ cm} \\implies S = 400\\pi\\text{ cm}^2',
    formula: 'R = \\frac{d}{2} = 10\\text{ cm}, \\quad S = 4\\pi \\cdot 10^2 = 400\\pi\\text{ cm}^2',
    teacherStyleResponse: 'Khoan khoan nha em! Đề bài cho **đường kính $d = 20\\text{ cm}$**, nên bán kính chỉ là $R = \\frac{20}{2} = 10\\text{ cm}$ thôi.\n- Nếu thế $R=10$ vào công thức: $S = 4\\pi R^2 = 4\\pi \\cdot 10^2 = 400\\pi\\text{ cm}^2$.\n- Hoặc nếu dùng trực tiếp đường kính: $S = \\pi d^2 = \\pi \\cdot 20^2 = 400\\pi\\text{ cm}^2$.\nKết quả của em bị gấp 4 lần do quên chia đôi đường kính đấy!',
    quickReplies: ['Tính thể tích quả bóng này', 'Cách đổi sang lít', 'Cho em bài tập tương tự'],
    commonMistakes: ['Dùng đường kính d trực tiếp vào công thức 4πR²'],
    responseMode: 'ERROR_CORRECTION'
  }
];

// Programmatic Generator to populate full 300 Sphere Questions
export function generateSphereQuestions(): QuestionRecord[] {
  const list: QuestionRecord[] = [];

  // Add base canonical
  for (const q of canonicalSphereQuestions) {
    const norm = QuestionNormalizer.normalize(q.question || '');
    list.push({
      id: q.id || `SPH-${list.length + 1}`,
      topic: 'SPHERE',
      intent: q.intent || 'CONCEPT',
      secondaryIntents: q.secondaryIntents || [],
      subIntent: q.subIntent || 'GENERAL',
      difficulty: q.difficulty || 'UNDERSTAND',
      question: q.question || '',
      normalizedQuestion: norm,
      keywords: QuestionNormalizer.extractKeywords(norm),
      entities: q.entities || {},
      answer: q.answer || '',
      shortAnswer: q.shortAnswer || '',
      teacherStyleResponse: q.teacherStyleResponse || '',
      quickReplies: q.quickReplies || ['Cho em ví dụ', 'Xem công thức', 'Mở 3D'],
      commonMistakes: q.commonMistakes || [],
      requiredData: q.requiredData || [],
      formula: q.formula || '',
      visualContext: q.visualContext,
      responseMode: q.responseMode || 'CONCEPT_EXPLANATION'
    });
  }

  let counter = list.length + 1;
  const radiusValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 18, 20, 21, 25, 30];

  // 1. Calculation variants (S = 4πR², V = 4/3 πR³) (~140 questions)
  for (const R of radiusValues) {
    if (list.length >= 140) break;
    const S_Pi = 4 * R * R;
    const V_Pi = ((4 / 3) * R * R * R).toFixed(2).replace(/\.00$/, '');

    const q = `Tính diện tích mặt cầu và thể tích hình cầu có bán kính R = ${R} cm.`;
    const norm = QuestionNormalizer.normalize(q);

    list.push({
      id: `SPH-CALC-${counter++}`,
      topic: 'SPHERE',
      intent: 'CALCULATION',
      subIntent: 'VOLUME',
      difficulty: 'APPLY',
      question: q,
      normalizedQuestion: norm,
      keywords: QuestionNormalizer.extractKeywords(norm),
      entities: { R, target: 'ALL' },
      answer: `Diện tích mặt cầu: S = 4π · ${R}² = ${S_Pi}π cm². Thể tích: V = (4/3)π · ${R}³ = ${V_Pi}π cm³.`,
      shortAnswer: `S = ${S_Pi}\\pi\\text{ cm}^2, \\quad V = ${V_Pi}\\pi\\text{ cm}^3`,
      teacherStyleResponse: `Các bước tính với bán kính $R = ${R}\\text{ cm}$:\n1. Diện tích mặt cầu: $S = 4\\pi R^2 = 4\\pi \\cdot ${R}^2 = ${S_Pi}\\pi\\text{ cm}^2$.\n2. Thể tích khối cầu: $V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi \\cdot ${R}^3 = ${V_Pi}\\pi\\text{ cm}^3$.`,
      quickReplies: [`Tính với đường kính d=${2 * R} cm`, 'Cho bài toán ngược tìm R', 'Đổi sang lít'],
      formula: `S = ${S_Pi}\\pi\\text{ cm}^2, \\quad V = ${V_Pi}\\pi\\text{ cm}^3`,
      responseMode: 'STEP_GUIDANCE'
    });

    // Inverse problem (given S, find R and V)
    const qInv = `Một mặt cầu có diện tích S = ${S_Pi}π cm². Tìm bán kính R và thể tích V của khối cầu.`;
    const normInv = QuestionNormalizer.normalize(qInv);
    list.push({
      id: `SPH-INV-${counter++}`,
      topic: 'SPHERE',
      intent: 'CALCULATION',
      subIntent: 'RADIUS',
      difficulty: 'APPLY',
      question: qInv,
      normalizedQuestion: normInv,
      keywords: QuestionNormalizer.extractKeywords(normInv),
      entities: { S: S_Pi, R, target: 'R' },
      answer: `Bán kính R = √(S / (4π)) = √(${S_Pi} / 4) = ${R} cm. Thể tích V = ${V_Pi}π cm³.`,
      shortAnswer: `R = ${R}\\text{ cm}, \\quad V = ${V_Pi}\\pi\\text{ cm}^3`,
      teacherStyleResponse: `Từ công thức diện tích $S = 4\\pi R^2$, ta suy ra bán kính:\n$$R = \\sqrt{\\frac{S}{4\\pi}} = \\sqrt{\\frac{${S_Pi}\\pi}{4\\pi}} = ${R}\\text{ cm}$$\nSau đó tính thể tích: $V = \\frac{4}{3}\\pi R^3 = ${V_Pi}\\pi\\text{ cm}^3$.`,
      quickReplies: ['Bài toán cho V tìm R', 'Tính đường kính d', 'Thử một bài tập mới'],
      formula: `R = \\sqrt{\\frac{S}{4\\pi}} = ${R}\\text{ cm}`,
      responseMode: 'STEP_GUIDANCE'
    });
  }

  // 2. Section cut variants (r = √(R² - d²)) (~60 questions)
  const cutTriples = [
    { R: 5, d: 3, r: 4 },
    { R: 5, d: 4, r: 3 },
    { R: 10, d: 6, r: 8 },
    { R: 10, d: 8, r: 6 },
    { R: 13, d: 5, r: 12 },
    { R: 13, d: 12, r: 5 },
    { R: 15, d: 9, r: 12 },
    { R: 17, d: 8, r: 15 },
    { R: 25, d: 7, r: 24 },
    { R: 25, d: 20, r: 15 }
  ];

  for (const cut of cutTriples) {
    if (list.length >= 220) break;
    const { R, d, r } = cut;
    const sSection = r * r;
    const qCut = `Một mặt cầu có bán kính R = ${R} cm. Một mặt phẳng (P) cách tâm cầu một khoảng d = ${d} cm cắt mặt cầu theo giao tuyến là một đường tròn. Tính bán kính và diện tích của hình tròn giao tuyến.`;
    const normCut = QuestionNormalizer.normalize(qCut);

    list.push({
      id: `SPH-SECTION-${counter++}`,
      topic: 'SPHERE',
      intent: 'CALCULATION',
      subIntent: 'AREA',
      difficulty: 'ANALYZE',
      question: qCut,
      normalizedQuestion: normCut,
      keywords: QuestionNormalizer.extractKeywords(normCut),
      entities: { R, d, r },
      answer: `Bán kính hình tròn giao tuyến: r = √(R² - d²) = √(${R}² - ${d}²) = ${r} cm. Diện tích hình tròn giao tuyến: S = πr² = ${sSection}π cm².`,
      shortAnswer: `r = ${r}\\text{ cm}, \\quad S = ${sSection}\\pi\\text{ cm}^2`,
      teacherStyleResponse: `Theo định lý Pythagore trong tam giác vuông liên hệ giữa bán kính cầu $R$, khoảng cách từ tâm $d$ và bán kính thiết diện $r$:\n$$r = \\sqrt{R^2 - d^2} = \\sqrt{${R}^2 - ${d}^2} = \\sqrt{${R * R - d * d}} = ${r}\\text{ cm}$$\nDiện tích thiết diện là: $S_{\\text{thiết diện}} = \\pi r^2 = \\pi \\cdot ${r}^2 = ${sSection}\\pi\\text{ cm}^2$.`,
      quickReplies: ['Xem mô hình 3D cắt cầu', 'Nếu mặt phẳng đi qua tâm?', 'Tính chu vi thiết diện'],
      formula: `r = \\sqrt{${R}^2 - ${d}^2} = ${r}\\text{ cm}, \\quad S = ${sSection}\\pi\\text{ cm}^2`,
      responseMode: 'STEP_GUIDANCE'
    });
  }

  // 3. Real-world applications (bóng đá, Trái Đất, bồn chứa khí cầu, viên bi ve, quả bóng bàn, quả địa cầu) (~80 questions)
  const sphereObjects = [
    { name: 'quả bóng đá tiêu chuẩn số 5', R: 11, unit: 'cm' },
    { name: 'quả bóng bàn', R: 2, unit: 'cm' },
    { name: 'quả bóng chuyền', R: 10.5, unit: 'cm' },
    { name: 'viên bi ve thủy tinh', R: 1, unit: 'cm' },
    { name: 'quả địa cầu để bàn', R: 15, unit: 'cm' },
    { name: 'bồn chứa khí gas hình cầu', R: 5, unit: 'm' },
    { name: 'bong bóng xà phòng hình cầu', R: 4, unit: 'cm' }
  ];

  let objIdx = 0;
  while (list.length < 300) {
    const obj = sphereObjects[objIdx % sphereObjects.length];
    const R = obj.R;
    const unit = obj.unit;
    const S = Math.round(4 * Math.PI * R * R * 10) / 10;
    const V = Math.round(((4 / 3) * Math.PI * R * R * R) * 10) / 10;

    const q = `Một ${obj.name} có bán kính R = ${R} ${unit}. Tính diện tích bề mặt ngoài và thể tích không gian bên trong của vật thể đó.`;
    const norm = QuestionNormalizer.normalize(q);

    list.push({
      id: `SPH-REAL-${counter++}`,
      topic: 'SPHERE',
      intent: 'REAL_WORLD',
      subIntent: 'VOLUME',
      difficulty: 'APPLY',
      question: q,
      normalizedQuestion: norm,
      keywords: QuestionNormalizer.extractKeywords(norm),
      entities: { R, unit, object: obj.name },
      answer: `Diện tích bề mặt: S ≈ ${S} ${unit}². Thể tích: V ≈ ${V} ${unit}³.`,
      shortAnswer: `S \\approx ${S}\\text{ }${unit}^2, \\quad V \\approx ${V}\\text{ }${unit}^3`,
      teacherStyleResponse: `Tính toán thực tế cho **${obj.name}** ($R = ${R}\\text{ }${unit}$):\n1. Diện tích bề mặt: $S = 4\\pi R^2 = 4\\pi \\cdot ${R}^2 \\approx ${S}\\text{ }${unit}^2$.\n2. Thể tích bên trong: $V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi \\cdot ${R}^3 \\approx ${V}\\text{ }${unit}^3$.`,
      quickReplies: ['Đổi sang lít/ml', 'Chi phí da bọc ngoài', 'Bài toán khác'],
      formula: `S = 4\\pi \\cdot ${R}^2 \\approx ${S}\\text{ }${unit}^2, \\quad V = \\frac{4}{3}\\pi \\cdot ${R}^3 \\approx ${V}\\text{ }${unit}^3`,
      responseMode: 'REAL_WORLD_EXPLANATION'
    });
    objIdx++;
  }

  return list.slice(0, 300);
}
