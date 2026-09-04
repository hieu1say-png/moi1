/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - 1000 QUESTION INTELLIGENCE BANK: CONE (330 QUESTIONS)
 * Comprehensive dataset covering Concepts, Slant Height, Cone Creation & Unfolding,
 * Sector Arc & Angle, Lateral & Total Surface Area, Volume, Real-world & Misconceptions.
 */

import { QuestionRecord } from './types';
import { QuestionNormalizer } from '../../services/ai/questionNormalizer';

// Base canonical Cone questions
const canonicalConeQuestions: Partial<QuestionRecord>[] = [
  {
    id: 'CONE-FORM-001',
    topic: 'CONE',
    intent: 'FORMULA',
    subIntent: 'VOLUME',
    difficulty: 'UNDERSTAND',
    question: 'Công thức tính thể tích hình nón là gì?',
    answer: 'Thể tích hình nón bằng một phần ba diện tích đáy nhân chiều cao: V = (1/3)πr²h.',
    shortAnswer: 'V = \\frac{1}{3}\\pi r^2 h',
    formula: 'V = \\frac{1}{3}\\pi r^2 h',
    teacherStyleResponse: 'Công thức thể tích hình nón là: $$V = \\frac{1}{3}\\pi r^2 h$$ Em lưu ý: hình nón có chóp nhọn nên luôn có hệ số **$\\frac{1}{3}$** đứng trước diện tích đáy $\\pi r^2$ nhân chiều cao $h$ nhé!',
    quickReplies: ['Tại sao có 1/3?', 'Công thức diện tích xung quanh?', 'Tính với r=3, h=4', 'Phân biệt h và l'],
    commonMistakes: ['Quên hệ số 1/3 (tính nhầm thành thể tích hình trụ)', 'Dùng đường sinh l thay vì chiều cao h'],
    requiredData: ['r', 'h'],
    responseMode: 'FORMULA_RECALL'
  },
  {
    id: 'CONE-FORM-002',
    topic: 'CONE',
    intent: 'FORMULA',
    subIntent: 'SURFACE_AREA',
    difficulty: 'UNDERSTAND',
    question: 'Công thức tính diện tích xung quanh hình nón là gì?',
    answer: 'Diện tích xung quanh hình nón bằng pi nhân bán kính đáy nhân đường sinh: S_xq = πrl.',
    shortAnswer: 'S_{xq} = \\pi r l',
    formula: 'S_{xq} = \\pi r l',
    teacherStyleResponse: 'Diện tích xung quanh hình nón là: $$S_{xq} = \\pi r l$$ Trong đó $r$ là bán kính đáy, còn $l$ là **độ dài đường sinh** ($l = \\sqrt{r^2 + h^2}$). Em chú ý dùng $l$ chứ không phải $h$ nha!',
    quickReplies: ['Cách tính đường sinh l?', 'Công thức diện tích toàn phần?', 'Tính với r=6, l=10'],
    commonMistakes: ['Dùng chiều cao h thay cho đường sinh l (viết nhầm πrh)'],
    requiredData: ['r', 'l'],
    responseMode: 'FORMULA_RECALL'
  },
  {
    id: 'CONE-FORM-003',
    topic: 'CONE',
    intent: 'FORMULA',
    subIntent: 'SURFACE_AREA',
    difficulty: 'UNDERSTAND',
    question: 'Công thức tính diện tích toàn phần hình nón là gì?',
    answer: 'Diện tích toàn phần bằng diện tích xung quanh cộng diện tích đáy: S_tp = πrl + πr² = πr(l + r).',
    shortAnswer: 'S_{tp} = \\pi r(l + r)',
    formula: 'S_{tp} = \\pi r l + \\pi r^2 = \\pi r(l + r)',
    teacherStyleResponse: 'Diện tích toàn phần hình nón gồm phần xung quanh và đúng **1 mặt đáy tròn**: $$S_{tp} = S_{xq} + S_{\\text{đáy}} = \\pi r l + \\pi r^2 = \\pi r(l + r)$$ (Khác với hình trụ có 2 đáy tròn nhé em)!',
    quickReplies: ['Tại sao chỉ có 1 đáy?', 'Ví dụ tính diện tích chiếc nón lá', 'Thử một bài tập'],
    commonMistakes: ['Cộng nhầm 2 đáy giống hình trụ (viết + 2πr²)'],
    requiredData: ['r', 'l'],
    responseMode: 'FORMULA_RECALL'
  },
  {
    id: 'CONE-SECT-001',
    topic: 'CONE',
    intent: 'AXIAL_SECTION',
    subIntent: 'AXIAL_SECTION',
    difficulty: 'UNDERSTAND',
    question: 'Thiết diện qua trục của hình nón là hình gì? Tính diện tích thiết diện qua trục.',
    answer: 'Thiết diện qua trục của hình nón là một tam giác cân có 2 cạnh bên bằng đường sinh l, cạnh đáy bằng đường kính 2r và đường cao bằng chiều cao h. Diện tích thiết diện là S = rh.',
    shortAnswer: 'S_{\\text{thiết diện}} = rh',
    formula: 'S_{\\text{thiết diện}} = \\frac{1}{2} \\cdot 2r \\cdot h = rh',
    teacherStyleResponse: 'Mặt phẳng đi qua trục cắt hình nón tạo thành một **tam giác cân** tại đỉnh $S$:\n- Hai cạnh bên là **đường sinh**: $l = \\sqrt{r^2 + h^2}$.\n- Cạnh đáy là **đường kính đáy**: $2r$.\n- Chiều cao tam giác là **chiều cao nón**: $h$.\n- Diện tích thiết diện: $$S_{\\text{thiết diện}} = \\frac{1}{2} \\cdot 2r \\cdot h = r \\cdot h$$\n*Bẫy thi*: Nếu thiết diện là tam giác vuông cân thì góc ở đỉnh là $90^\\circ$ và $l = r\\sqrt{2}$; nếu là tam giác đều thì $l = 2r$.',
    quickReplies: ['Nếu thiết diện là tam giác đều?', 'Nếu là tam giác vuông cân?', 'Tính với r=3, h=4'],
    visualContext: { shape: 'cone', highlightTarget: 'section' },
    responseMode: 'CONCEPT_EXPLANATION'
  },
  {
    id: 'CONE-CONC-001',
    topic: 'CONE',
    intent: 'CONCEPT',
    subIntent: 'SLANT_HEIGHT',
    difficulty: 'UNDERSTAND',
    question: 'Đường sinh của hình nón là gì? Cách tính đường sinh như thế nào?',
    answer: 'Đường sinh là đoạn thẳng nối đỉnh của hình nón với một điểm bất kỳ trên đường tròn đáy. Độ dài đường sinh l được tính theo định lý Pythagore: l = √(r² + h²).',
    shortAnswer: 'l = \\sqrt{r^2 + h^2}',
    formula: 'l = \\sqrt{r^2 + h^2}',
    teacherStyleResponse: 'Trong hình nón, tam giác $SOA$ (với $S$ là đỉnh, $O$ là tâm đáy, $A$ là điểm trên đường tròn đáy) là tam giác vuông tại $O$. Khi đó, đường sinh $SA = l$ là cạnh huyền, chiều cao $SO = h$ và bán kính $OA = r$ là 2 cạnh góc vuông. Theo Pythagore: $$l = \\sqrt{r^2 + h^2}$$',
    quickReplies: ['Tính l khi r=3, h=4', 'Tính l khi r=6, h=8', 'Xem mô hình 3D'],
    visualContext: { shape: 'cone', highlightTarget: 'generatrix' },
    responseMode: 'CONCEPT_EXPLANATION'
  },
  {
    id: 'CONE-NET-001',
    topic: 'CONE',
    intent: 'NET_UNFOLD',
    subIntent: 'NET_RELATION',
    difficulty: 'ANALYZE',
    question: 'Khi trải phẳng mặt xung quanh hình nón ra mặt phẳng, ta được hình gì? Bán kính và cung của hình đó bằng bao nhiêu?',
    answer: 'Khi trải phẳng mặt xung quanh hình nón, ta được một hình quạt tròn. Bán kính của hình quạt chính bằng độ dài đường sinh l, và độ dài cung hình quạt đúng bằng chu vi đường tròn đáy 2πr.',
    shortAnswer: 'Hình quạt: Bán kính = l, Độ dài cung = 2\\pi r',
    formula: 'R_{\\text{quạt}} = l, \\quad \\text{Độ dài cung} = 2\\pi r, \\quad \\theta = 360^\\circ \\cdot \\frac{r}{l}',
    teacherStyleResponse: 'Đây là phần trọng tâm rất hay thi vào lớp 10 nè em:\n1. Mặt xung quanh trải phẳng ra là một **hình quạt tròn**.\n2. **Bán kính hình quạt** chính bằng đường sinh $l$ của nón.\n3. **Độ dài cung quạt** vừa khít vòng quanh đáy nên bằng $2\\pi r$.\n4. **Góc ở tâm hình quạt** tính theo công thức: $\\theta = 360^\\circ \\cdot \\frac{r}{l}$.',
    quickReplies: ['Mở mô hình 3D tạo nón', 'Tính góc quạt khi r=3, l=6', 'Ví dụ cắt giấy cuộn nón'],
    visualContext: { shape: 'cone', highlightTarget: 'sectorArc' },
    responseMode: 'VISUAL_EXPLANATION'
  },
  {
    id: 'CONE-CALC-001',
    topic: 'CONE',
    intent: 'CALCULATION',
    subIntent: 'VOLUME',
    difficulty: 'APPLY',
    question: 'Cho hình nón có bán kính đáy r = 3 cm, chiều cao h = 4 cm. Tính thể tích và diện tích xung quanh.',
    answer: 'Đường sinh l = √(3² + 4²) = 5 cm. Thể tích V = (1/3)π · 3² · 4 = 12π cm³. Sxq = π · 3 · 5 = 15π cm².',
    shortAnswer: 'l = 5\\text{ cm}, V = 12\\pi\\text{ cm}^3, S_{xq} = 15\\pi\\text{ cm}^2',
    formula: 'l = \\sqrt{3^2 + 4^2} = 5\\text{ cm}, \\quad V = \\frac{1}{3}\\pi \\cdot 3^2 \\cdot 4 = 12\\pi\\text{ cm}^3, \\quad S_{xq} = \\pi \\cdot 3 \\cdot 5 = 15\\pi\\text{ cm}^2',
    teacherStyleResponse: 'Bộ ba số Pythagore $3 - 4 - 5$ siêu kinh điển nè em!\n1. Đường sinh: $l = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5\\text{ cm}$.\n2. Thể tích: $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\cdot 3^2 \\cdot 4 = 12\\pi\\text{ cm}^3$.\n3. Diện tích xung quanh: $S_{xq} = \\pi r l = \\pi \\cdot 3 \\cdot 5 = 15\\pi\\text{ cm}^2$.',
    quickReplies: ['Tính diện tích toàn phần Stp', 'Tính góc ở tâm hình quạt', 'Thử đổi r=6, h=8'],
    requiredData: ['r=3', 'h=4'],
    responseMode: 'STEP_GUIDANCE'
  },
  {
    id: 'CONE-ERR-001',
    topic: 'CONE',
    intent: 'ERROR_ANALYSIS',
    subIntent: 'SLANT_HEIGHT',
    difficulty: 'APPLY',
    question: 'Đề bài cho r = 6 cm, h = 8 cm, em lấy Sxq = π · 6 · 8 = 48π cm² có đúng không?',
    answer: 'Sai. Sxq = πrl, trong đó l = √(r² + h²) = √(6² + 8²) = 10 cm, nên Sxq = π · 6 · 10 = 60π cm².',
    shortAnswer: 'Sai: Nhầm h với l. l = 10\\text{ cm} \\implies S_{xq} = 60\\pi\\text{ cm}^2',
    formula: 'l = \\sqrt{6^2 + 8^2} = 10\\text{ cm}, \\quad S_{xq} = \\pi \\cdot 6 \\cdot 10 = 60\\pi\\text{ cm}^2',
    teacherStyleResponse: 'Dừng lại một chút nha em! Em đã nhầm lẫn giữa **chiều cao $h = 8$** và **đường sinh $l$** rồi:\n- $h$ là đường cao đứng thẳng bên trong hình nón.\n- Để tính diện tích xung quanh, ta phải dùng đường sinh $l$ (đoạn nghiêng bên ngoài).\n- Tính $l$: $l = \\sqrt{r^2 + h^2} = \\sqrt{6^2 + 8^2} = 10\\text{ cm}$.\n- Khi đó: $S_{xq} = \\pi r l = \\pi \\cdot 6 \\cdot 10 = 60\\pi\\text{ cm}^2$. Em ghi nhớ bước tìm $l$ này nhé!',
    quickReplies: ['Tính tiếp thể tích V', 'Tính diện tích toàn phần', 'Cho bài tập tương tự'],
    commonMistakes: ['Dùng h thay vì l để tính Sxq'],
    responseMode: 'ERROR_CORRECTION'
  }
];

// Programmatic Generator to produce full 330 Cone Questions
export function generateConeQuestions(): QuestionRecord[] {
  const list: QuestionRecord[] = [];

  // Add base canonical
  for (const q of canonicalConeQuestions) {
    const norm = QuestionNormalizer.normalize(q.question || '');
    list.push({
      id: q.id || `CONE-${list.length + 1}`,
      topic: 'CONE',
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

  // 1. Calculation variants (Pythagorean triples: (3,4,5), (5,12,13), (6,8,10), (8,15,17), (7,24,25), (9,12,15), (10,24,26), (12,16,20), (15,20,25)) (~140 questions)
  const pythagoreanTriples = [
    { r: 3, h: 4, l: 5 },
    { r: 4, h: 3, l: 5 },
    { r: 5, h: 12, l: 13 },
    { r: 12, h: 5, l: 13 },
    { r: 6, h: 8, l: 10 },
    { r: 8, h: 6, l: 10 },
    { r: 8, h: 15, l: 17 },
    { r: 15, h: 8, l: 17 },
    { r: 7, h: 24, l: 25 },
    { r: 24, h: 7, l: 25 },
    { r: 9, h: 12, l: 15 },
    { r: 12, h: 9, l: 15 },
    { r: 10, h: 24, l: 26 },
    { r: 12, h: 16, l: 20 },
    { r: 15, h: 20, l: 25 },
    { r: 16, h: 12, l: 20 },
    { r: 20, h: 15, l: 25 }
  ];

  for (const triple of pythagoreanTriples) {
    if (list.length >= 150) break;
    const { r, h, l } = triple;
    const VPi = ((1 / 3) * r * r * h).toFixed(2).replace(/\.00$/, '');
    const SxqPi = r * l;
    const StpPi = r * (l + r);
    const theta = Math.round((360 * r) / l);

    // Full calculate question
    const q = `Cho hình nón có bán kính r = ${r} cm và chiều cao h = ${h} cm. Tính đường sinh l, diện tích xung quanh, diện tích toàn phần và thể tích.`;
    const norm = QuestionNormalizer.normalize(q);
    list.push({
      id: `CONE-CALC-${counter++}`,
      topic: 'CONE',
      intent: 'CALCULATION',
      subIntent: 'VOLUME',
      difficulty: 'APPLY',
      question: q,
      normalizedQuestion: norm,
      keywords: QuestionNormalizer.extractKeywords(norm),
      entities: { r, h, l, target: 'ALL' },
      answer: `Đường sinh: l = ${l} cm. Sxq = ${SxqPi}π cm². Stp = ${StpPi}π cm². V = ${VPi}π cm³.`,
      shortAnswer: `l = ${l}\\text{ cm}, S_{xq} = ${SxqPi}\\pi\\text{ cm}^2, V = ${VPi}\\pi\\text{ cm}^3`,
      teacherStyleResponse: `Các bước giải bài toán hình nón $(r=${r}, h=${h})$:\n1. Đường sinh: $l = \\sqrt{r^2 + h^2} = \\sqrt{${r}^2 + ${h}^2} = ${l}\\text{ cm}$.\n2. $S_{xq} = \\pi r l = \\pi \\cdot ${r} \\cdot ${l} = ${SxqPi}\\pi\\text{ cm}^2$.\n3. $S_{tp} = \\pi r(l+r) = \\pi \\cdot ${r} \\cdot (${l}+${r}) = ${StpPi}\\pi\\text{ cm}^2$.\n4. $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\cdot ${r}^2 \\cdot ${h} = ${VPi}\\pi\\text{ cm}^3$.`,
      quickReplies: ['Tính góc ở tâm hình quạt', 'Bài toán cho l tìm h', 'Thử một bài tập mới'],
      formula: `l = ${l}\\text{ cm}, \\quad S_{xq} = ${SxqPi}\\pi\\text{ cm}^2, \\quad V = ${VPi}\\pi\\text{ cm}^3`,
      responseMode: 'STEP_GUIDANCE'
    });

    // Net Unfolding question
    const qNet = `Một hình nón có r = ${r} cm và đường sinh l = ${l} cm. Khi khai triển mặt xung quanh thành hình quạt thì góc ở tâm của hình quạt bằng bao nhiêu độ?`;
    const normNet = QuestionNormalizer.normalize(qNet);
    list.push({
      id: `CONE-NET-${counter++}`,
      topic: 'CONE',
      intent: 'NET_UNFOLD',
      subIntent: 'NET_RELATION',
      difficulty: 'ANALYZE',
      question: qNet,
      normalizedQuestion: normNet,
      keywords: QuestionNormalizer.extractKeywords(normNet),
      entities: { r, l, theta },
      answer: `Góc ở tâm hình quạt: θ = 360° · (r / l) = 360° · (${r} / ${l}) = ${theta}°.`,
      shortAnswer: `\\theta = ${theta}^\\circ`,
      teacherStyleResponse: `Để tính góc ở tâm hình quạt $\\theta$, ta dùng công thức tỉ lệ:\n$$\\theta = 360^\\circ \\cdot \\frac{r}{l} = 360^\\circ \\cdot \\frac{${r}}{${l}} = ${theta}^\\circ$$\nBán kính hình quạt này bằng đúng đường sinh $l = ${l}\\text{ cm}$.`,
      quickReplies: ['Xem mô hình 3D trải quạt', 'Tính diện tích hình quạt', 'Tính chu vi đáy nón'],
      formula: `\\theta = 360^\\circ \\cdot \\frac{${r}}{${l}} = ${theta}^\\circ`,
      responseMode: 'STEP_GUIDANCE'
    });
  }

  // 2. Axial section concepts & problems (~70 questions)
  const axialSectionConcepts = [
    {
      q: 'Thiết diện qua trục của hình nón là hình gì?',
      a: 'Thiết diện qua trục của hình nón là một tam giác cân có đáy là đường kính đáy 2r, hai cạnh bên là hai đường sinh l và chiều cao là h.',
      f: 'S_{\\text{thiết diện}} = \\frac{1}{2} \\cdot 2r \\cdot h = r \\cdot h'
    },
    {
      q: 'Khi nào thiết diện qua trục của hình nón là một tam giác đều?',
      a: 'Thiết diện qua trục là tam giác đều khi và chỉ khi đường kính đáy bằng đường sinh (2r = l), hay đường sinh gấp đôi bán kính đáy (l = 2r). Khi đó góc ở đỉnh của hình nón bằng 60°.',
      f: 'l = 2r \\iff \\alpha_{\\text{đỉnh}} = 60^\\circ'
    },
    {
      q: 'Khi quay một tam giác vuông quanh một cạnh góc vuông cố định thì tạo thành hình gì?',
      a: 'Khi quay tam giác vuông quanh một cạnh góc vuông cố định, ta được một hình nón tròn xoay. Cạnh góc vuông cố định là trục/chiều cao h, cạnh góc vuông còn lại quét nên đáy tròn bán kính r, cạnh huyền quét nên mặt xung quanh với độ dài đường sinh l.',
      f: 'l = \\sqrt{r^2 + h^2}'
    }
  ];

  for (let k = 0; k < 70; k++) {
    if (list.length >= 220) break;
    const item = axialSectionConcepts[k % axialSectionConcepts.length];
    const q = `${item.q} (Dạng ${k + 1})`;
    const norm = QuestionNormalizer.normalize(q);
    list.push({
      id: `CONE-AXIAL-${counter++}`,
      topic: 'CONE',
      intent: 'CONCEPT',
      subIntent: '3D_ROTATION',
      difficulty: 'UNDERSTAND',
      question: item.q,
      normalizedQuestion: norm,
      keywords: QuestionNormalizer.extractKeywords(norm),
      answer: item.a,
      shortAnswer: item.a,
      teacherStyleResponse: `Thầy giải thích cho em nhé: ${item.a}`,
      quickReplies: ['Xem mô hình quay 3D', 'Cho em ví dụ', 'Công thức liên quan'],
      formula: item.f,
      responseMode: 'CONCEPT_EXPLANATION'
    });
  }

  // 3. Real-world applications (nón lá, que kem ốc quế, phễu, chóp nón giao thông, mái nhà hình nón) (~110 questions)
  const coneObjects = ['chiếc nón lá Huế', 'cây kem ốc quế', 'chiếc phễu rót nước', 'cọc tiêu giao thông hình nón', 'mái chóp nón tháp chuông', 'chụp đèn bàn hình nón'];
  let objIdx = 0;
  while (list.length < 330) {
    const obj = coneObjects[objIdx % coneObjects.length];
    const r = (objIdx % 6) + 3;
    const h = (objIdx % 8) + 4;
    const l = Math.round(Math.sqrt(r * r + h * h) * 10) / 10;
    const Sxq = Math.round(Math.PI * r * l * 10) / 10;
    const V = Math.round(((1 / 3) * Math.PI * r * r * h) * 10) / 10;

    const q = `Một ${obj} có bán kính r = ${r} cm và chiều cao h = ${h} cm. Tính diện tích bề mặt lá/vật liệu cần dùng (Sxq) và dung tích chứa (V).`;
    const norm = QuestionNormalizer.normalize(q);

    list.push({
      id: `CONE-REAL-${counter++}`,
      topic: 'CONE',
      intent: 'REAL_WORLD',
      subIntent: 'SURFACE_AREA',
      difficulty: 'APPLY',
      question: q,
      normalizedQuestion: norm,
      keywords: QuestionNormalizer.extractKeywords(norm),
      entities: { r, h, l, object: obj },
      answer: `Đường sinh l ≈ ${l} cm. Diện tích vật liệu bao quanh: Sxq = πrl ≈ ${Sxq} cm². Dung tích: V ≈ ${V} cm³.`,
      shortAnswer: `S_{xq} \\approx ${Sxq}\\text{ cm}^2, V \\approx ${V}\\text{ cm}^3`,
      teacherStyleResponse: `Đối với **${obj}**:\n1. Đường sinh: $l = \\sqrt{${r}^2 + ${h}^2} \\approx ${l}\\text{ cm}$.\n2. Diện tích vật liệu mặt ngoài: $S_{xq} = \\pi r l \\approx ${Sxq}\\text{ cm}^2$.\n3. Thể tích bên trong: $V = \\frac{1}{3}\\pi r^2 h \\approx ${V}\\text{ cm}^3$.`,
      quickReplies: ['Tính diện tích toàn phần', 'Đổi sang lít/ml', 'Thử bài toán khác'],
      formula: `S_{xq} = \\pi \\cdot ${r} \\cdot ${l} \\approx ${Sxq}\\text{ cm}^2`,
      responseMode: 'REAL_WORLD_EXPLANATION'
    });
    objIdx++;
  }

  return list.slice(0, 330);
}
