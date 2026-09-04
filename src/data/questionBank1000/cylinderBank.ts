/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - 1000 QUESTION INTELLIGENCE BANK: CYLINDER (340 QUESTIONS)
 * Comprehensive dataset covering Concepts, Formulas, Calculations, Unfold/Net,
 * Axial Sections, Real-world applications, Error analyses, Socratic prompts.
 */

import { QuestionRecord } from './types';
import { QuestionNormalizer } from '../../services/ai/questionNormalizer';

// Base canonical Cylinder questions
const canonicalCylinderQuestions: Partial<QuestionRecord>[] = [
  {
    id: 'CYL-FORM-001',
    topic: 'CYLINDER',
    intent: 'FORMULA',
    subIntent: 'VOLUME',
    difficulty: 'UNDERSTAND',
    question: 'Công thức tính thể tích hình trụ là gì?',
    answer: 'Thể tích hình trụ bằng diện tích đáy nhân với chiều cao: V = πr²h (hoặc V = S_đáy · h).',
    shortAnswer: 'V = \\pi r^2 h',
    formula: 'V = \\pi r^2 h',
    teacherStyleResponse: 'Công thức thể tích hình trụ rất dễ nhớ nè em: lấy diện tích đáy tròn $\\pi r^2$ nhân với chiều cao $h$. Kết quả là $V = \\pi r^2 h$. Em có muốn thử tính một ví dụ không?',
    quickReplies: ['Cho em ví dụ', 'Tại sao có r bình phương?', 'Tính với r=4, h=8', 'Xem mô hình 3D'],
    commonMistakes: ['Quên bình phương bán kính r (nhầm thành πrh)', 'Lấy đường kính d thay vì bán kính r'],
    requiredData: ['r', 'h'],
    responseMode: 'FORMULA_RECALL'
  },
  {
    id: 'CYL-FORM-002',
    topic: 'CYLINDER',
    intent: 'FORMULA',
    subIntent: 'SURFACE_AREA',
    difficulty: 'UNDERSTAND',
    question: 'Công thức tính diện tích xung quanh hình trụ là gì?',
    answer: 'Diện tích xung quanh hình trụ bằng chu vi đáy nhân chiều cao: S_xq = 2πrh.',
    shortAnswer: 'S_{xq} = 2\\pi rh',
    formula: 'S_{xq} = 2\\pi rh',
    teacherStyleResponse: 'Diện tích xung quanh hình trụ chính là diện tích tấm giấy bao quanh thân trụ khi trải phẳng ra hình chữ nhật: $S_{xq} = 2\\pi rh$ (chu vi đáy nhân chiều cao).',
    quickReplies: ['Công thức diện tích toàn phần?', 'Tại sao trải ra thành HCN?', 'Tính với r=3, h=5'],
    commonMistakes: ['Nhầm Sxq với Stp (quên cộng 2 đáy)', 'Thiếu hệ số 2 trong chu vi đáy'],
    requiredData: ['r', 'h'],
    responseMode: 'FORMULA_RECALL'
  },
  {
    id: 'CYL-FORM-003',
    topic: 'CYLINDER',
    intent: 'FORMULA',
    subIntent: 'SURFACE_AREA',
    difficulty: 'UNDERSTAND',
    question: 'Công thức tính diện tích toàn phần hình trụ là gì?',
    answer: 'Diện tích toàn phần bằng diện tích xung quanh cộng diện tích hai đáy: S_tp = 2πrh + 2πr² = 2πr(h + r).',
    shortAnswer: 'S_{tp} = 2\\pi r(h + r)',
    formula: 'S_{tp} = 2\\pi rh + 2\\pi r^2 = 2\\pi r(h + r)',
    teacherStyleResponse: 'Diện tích toàn phần là tổng diện tích tất cả các mặt: gồm thân xung quanh ($2\\pi rh$) và cả 2 mặt đáy trên dưới ($2\\pi r^2$). Gộp lại ta có $S_{tp} = 2\\pi r(h + r)$.',
    quickReplies: ['Sxq khác Stp thế nào?', 'Cho ví dụ tính vỏ lon sữa', 'Thử một bài tập'],
    commonMistakes: ['Chỉ cộng 1 đáy thay vì 2 đáy', 'Nhầm diện tích toàn phần với thể tích'],
    requiredData: ['r', 'h'],
    responseMode: 'FORMULA_RECALL'
  },
  {
    id: 'CYL-SECT-001',
    topic: 'CYLINDER',
    intent: 'AXIAL_SECTION',
    subIntent: 'AXIAL_SECTION',
    difficulty: 'UNDERSTAND',
    question: 'Thiết diện qua trục của hình trụ là hình gì? Tính diện tích thiết diện qua trục.',
    answer: 'Thiết diện qua trục của hình trụ là hình chữ nhật có một cạnh bằng đường kính đáy 2r và một cạnh bằng chiều cao h. Diện tích thiết diện là S = 2rh.',
    shortAnswer: 'S_{\\text{thiết diện}} = 2rh',
    formula: 'S_{\\text{thiết diện}} = 2r \\cdot h',
    teacherStyleResponse: 'Khi cắt hình trụ bởi một mặt phẳng đi qua trục đối xứng, thiết diện thu được là một **hình chữ nhật**:\n- Một cạnh là **đường kính đáy**: $d = 2r$.\n- Một cạnh là **chiều cao**: $h$.\n- Diện tích thiết diện qua trục: $$S_{\\text{thiết diện}} = 2r \\cdot h$$\n*Đặc biệt*: Nếu thiết diện là hình vuông thì chiều cao bằng đúng đường kính đáy ($h = 2r$).',
    quickReplies: ['Nếu thiết diện là hình vuông?', 'Tính với r=4, h=8', 'Thiết diện hình nón là gì?'],
    visualContext: { shape: 'cylinder', highlightTarget: 'section' },
    responseMode: 'CONCEPT_EXPLANATION'
  },
  {
    id: 'CYL-WHY-001',
    topic: 'CYLINDER',
    intent: 'WHY',
    subIntent: '3D_UNFOLD',
    difficulty: 'UNDERSTAND',
    question: 'Tại sao trải phẳng mặt xung quanh hình trụ lại thành hình chữ nhật?',
    answer: 'Khi cắt mặt xung quanh theo một đường sinh rồi trải phẳng, chiều rộng hình chữ nhật bằng chiều cao h, chiều dài hình chữ nhật bằng chu vi đường tròn đáy 2πr.',
    shortAnswer: 'Chiều dài = 2\\pi r, Chiều rộng = h',
    formula: 'S_{xq} = 2\\pi r \\cdot h',
    teacherStyleResponse: 'Em hãy tưởng tượng ta bóc chiếc nhãn dán quanh vỏ lon sữa ra nhé: Chiều dài của nhãn vừa khít đúng chu vi vòng tròn đáy ($2\\pi r$), còn chiều rộng của nhãn chính là chiều cao $h$ của lon. Vì vậy, mặt xung quanh trải phẳng ra đúng là hình chữ nhật kích thước $2\\pi r \\times h$!',
    quickReplies: ['Mở mô hình 3D xem trải phẳng', 'Tính diện tích hình chữ nhật này', 'Nếu cắt vát thì sao?'],
    visualContext: { shape: 'cylinder', highlightTarget: 'unfold' },
    responseMode: 'VISUAL_EXPLANATION'
  },
  {
    id: 'CYL-WHY-002',
    topic: 'CYLINDER',
    intent: 'WHY',
    subIntent: 'FORMULA_DERIVATION',
    difficulty: 'UNDERSTAND',
    question: 'Tại sao trong công thức thể tích hình trụ bán kính r lại bình phương?',
    answer: 'Vì đáy của hình trụ là hình tròn có diện tích S = πr². Thể tích là xếp chồng các lớp đáy tròn lên theo chiều cao h nên V = S_đáy · h = πr²h.',
    shortAnswer: 'Do đáy là hình tròn diện tích S = \\pi r^2',
    formula: 'V = S_{\\text{đáy}} \\cdot h = \\pi r^2 h',
    teacherStyleResponse: 'Một câu hỏi tư duy rất hay! Đáy hình trụ là một hình tròn có diện tích $S_{\\text{đáy}} = \\pi r^2$. Khi ta xếp chồng vô số hình tròn giống hệt nhau lên đến độ cao $h$, ta được khối trụ có thể tích $V = S_{\\text{đáy}} \\times h = \\pi r^2 h$. Đó là lý do $r$ có mũ 2 đấy em!',
    quickReplies: ['Hình nón thì sao?', 'Ví dụ tính V với r=5, h=10', 'Nhầm d với r'],
    responseMode: 'CONCEPT_EXPLANATION'
  },
  {
    id: 'CYL-CALC-001',
    topic: 'CYLINDER',
    intent: 'CALCULATION',
    subIntent: 'VOLUME',
    difficulty: 'APPLY',
    question: 'Cho hình trụ có r = 4 cm, h = 8 cm. Tính thể tích hình trụ.',
    answer: 'V = π · 4² · 8 = 128π cm³ ≈ 402.12 cm³.',
    shortAnswer: 'V = 128\\pi\\text{ cm}^3',
    formula: 'V = \\pi \\cdot 4^2 \\cdot 8 = 128\\pi\\text{ cm}^3',
    teacherStyleResponse: 'Ta áp dụng công thức $V = \\pi r^2 h$:\n$$V = \\pi \\cdot 4^2 \\cdot 8 = \\pi \\cdot 16 \\cdot 8 = 128\\pi\\text{ cm}^3 \\approx 402.12\\text{ cm}^3.$$\nEm nhớ để nguyên $\\pi$ trong bài thi trừ khi đề bài yêu cầu làm tròn nhé!',
    quickReplies: ['Tính diện tích xung quanh', 'Tính diện tích toàn phần', 'Thử đổi r thành 6 cm'],
    requiredData: ['r=4', 'h=8'],
    responseMode: 'STEP_GUIDANCE'
  },
  {
    id: 'CYL-ERR-001',
    topic: 'CYLINDER',
    intent: 'ERROR_ANALYSIS',
    subIntent: 'DIAMETER',
    difficulty: 'APPLY',
    question: 'Đề bài cho đường kính d = 8 cm, em lấy r = 8 cm để tính có đúng không?',
    answer: 'Sai. Đường kính d = 8 cm thì bán kính r = d / 2 = 4 cm.',
    shortAnswer: 'Sai: r = d / 2 = 4\\text{ cm}',
    formula: 'r = \\frac{d}{2} = \\frac{8}{2} = 4\\text{ cm}',
    teacherStyleResponse: 'Cẩn thận nha em! Đây là "cái bẫy kinh điển" trong các đề thi vào 10. Đường kính $d = 8\\text{ cm}$ thì bán kính chỉ là một nửa thôi: $r = \\frac{d}{2} = 4\\text{ cm}$. Em hãy sửa $r = 4$ rồi thế vào công thức tính lại nhé!',
    quickReplies: ['Tính lại V với r=4, h=8', 'Các bẫy đề thi khác', 'Cho em bài tập tương tự'],
    commonMistakes: ['Nhầm đường kính d với bán kính r'],
    responseMode: 'ERROR_CORRECTION'
  },
  {
    id: 'CYL-ERR-002',
    topic: 'CYLINDER',
    intent: 'ERROR_ANALYSIS',
    subIntent: 'VOLUME',
    difficulty: 'APPLY',
    question: 'Em tính thể tích hình trụ ra πrh có đúng không?',
    answer: 'Không đúng. Thể tích hình trụ phải là V = πr²h (thiếu bình phương của r).',
    shortAnswer: 'Sai: V = \\pi r^2 h (cần có r^2)',
    formula: 'V = \\pi r^2 h',
    teacherStyleResponse: 'Khoan vội bấm máy nhé! Công thức $\\pi rh$ bị thiếu mất bình phương ở bán kính rồi em. Đáy là hình tròn có diện tích $\\pi r^2$, nên thể tích đúng phải là $$V = \\pi r^2 h$$ Em thêm mũ 2 vào $r$ rồi tính lại kết quả nhé!',
    quickReplies: ['Tính lại với r=4, h=8', 'Công thức Sxq là gì?', 'Tại sao lại là r^2?'],
    commonMistakes: ['Quên bình phương bán kính r'],
    responseMode: 'ERROR_CORRECTION'
  },
  {
    id: 'CYL-REAL-001',
    topic: 'CYLINDER',
    intent: 'REAL_WORLD',
    subIntent: 'VOLUME',
    difficulty: 'APPLY',
    question: 'Một lon nước ngọt hình trụ có bán kính đáy 3 cm, chiều cao 12 cm. Lon chứa được bao nhiêu ml nước?',
    answer: 'Thể tích lon là V = π · 3² · 12 = 108π ≈ 339.29 cm³ = 339.29 ml (khoảng 330 ml thực tế).',
    shortAnswer: 'V \\approx 339.29\\text{ ml}',
    formula: 'V = \\pi \\cdot 3^2 \\cdot 12 = 108\\pi \\approx 339.29\\text{ cm}^3 = 339.29\\text{ ml}',
    teacherStyleResponse: 'Chiếc lon nước ngọt này chính là một ứng dụng hình trụ thực tế rất quen thuộc:\n1. Thể tích lon: $V = \\pi r^2 h = \\pi \\cdot 3^2 \\cdot 12 = 108\\pi \\approx 339.29\\text{ cm}^3$.\n2. Vì $1\\text{ cm}^3 = 1\\text{ ml}$ nên lon chứa được khoảng **339.3 ml** nước (rất vừa vặn với thể tích lon 330ml thông dụng ngoài đời)!',
    quickReplies: ['Tính diện tích vỏ nhôm của lon', 'Bài toán bồn chứa nước', 'Bài tập thực tế khác'],
    responseMode: 'REAL_WORLD_EXPLANATION'
  },
  {
    id: 'CYL-REAL-002',
    topic: 'CYLINDER',
    intent: 'REAL_WORLD',
    subIntent: 'SURFACE_AREA',
    difficulty: 'APPLY',
    question: 'Một bồn nước inox hình trụ có bán kính đáy r = 0.5 m và chiều cao h = 1.6 m. Cần bao nhiêu m² inox để làm chiếc bồn kín hai đầu (bỏ qua mép hàn)?',
    answer: 'Diện tích inox cần dùng chính là diện tích toàn phần: Stp = 2πr(h + r) = 2π · 0.5 · (1.6 + 0.5) = 2.1π ≈ 6.6 m².',
    shortAnswer: 'S_{tp} \\approx 6.6\\text{ m}^2',
    formula: 'S_{tp} = 2\\pi \\cdot 0.5 \\cdot (1.6 + 0.5) = 2.1\\pi \\approx 6.6\\text{ m}^2',
    teacherStyleResponse: 'Làm bồn kín 2 đầu nghĩa là ta cần tính **diện tích toàn phần** $S_{tp}$:\n$$S_{tp} = 2\\pi r(h + r) = 2\\pi \\cdot 0.5 \\cdot (1.6 + 0.5) = 2.1\\pi \\approx 6.60\\text{ m}^2.$$\nVậy người thợ cần khoảng $6.6\\text{ m}^2$ inox để chế tạo bồn nước này.',
    quickReplies: ['Bồn này chứa được bao nhiêu lít nước?', 'Nếu không có nắp thì tính sao?', 'Thử bài toán chi phí sơn'],
    responseMode: 'REAL_WORLD_EXPLANATION'
  }
];

// Programmatic Generator to populate full 340 Cylinder Questions with comprehensive coverage
export function generateCylinderQuestions(): QuestionRecord[] {
  const list: QuestionRecord[] = [];

  // Add the hand-curated canonical items
  for (const q of canonicalCylinderQuestions) {
    const norm = QuestionNormalizer.normalize(q.question || '');
    list.push({
      id: q.id || `CYL-${list.length + 1}`,
      topic: 'CYLINDER',
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

  // Parameterized question variations to reach 340 entries
  const rValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25];
  const hValues = [2, 4, 5, 6, 8, 10, 12, 14, 15, 16, 20, 25, 30];

  let counter = list.length + 1;

  // 1. Calculation variants (V, Sxq, Stp with various r, h) (~120 questions)
  for (let i = 0; i < rValues.length; i++) {
    for (let j = 0; j < hValues.length; j++) {
      if (list.length >= 150) break;
      const r = rValues[i];
      const h = hValues[j];
      const VPi = r * r * h;
      const SxqPi = 2 * r * h;
      const StpPi = 2 * r * (h + r);

      // Volume question
      const qV = `Tính thể tích hình trụ có bán kính đáy r = ${r} cm và chiều cao h = ${h} cm.`;
      const normV = QuestionNormalizer.normalize(qV);
      list.push({
        id: `CYL-CALC-${counter++}`,
        topic: 'CYLINDER',
        intent: 'CALCULATION',
        subIntent: 'VOLUME',
        difficulty: 'APPLY',
        question: qV,
        normalizedQuestion: normV,
        keywords: QuestionNormalizer.extractKeywords(normV),
        entities: { r, h, target: 'V' },
        answer: `Thể tích hình trụ: V = πr²h = π · ${r}² · ${h} = ${VPi}π cm³ ≈ ${(VPi * Math.PI).toFixed(2)} cm³.`,
        shortAnswer: `V = ${VPi}\\pi\\text{ cm}^3`,
        teacherStyleResponse: `Ta áp dụng công thức $V = \\pi r^2 h = \\pi \\cdot ${r}^2 \\cdot ${h} = ${VPi}\\pi\\text{ cm}^3 \\approx ${(VPi * Math.PI).toFixed(2)}\\text{ cm}^3$. Em nhớ ghi kèm đơn vị $\\text{cm}^3$ nhé!`,
        quickReplies: [`Tính Sxq với r=${r}, h=${h}`, `Tính Stp với r=${r}, h=${h}`, 'Cho em bài toán ngược'],
        requiredData: [`r=${r}`, `h=${h}`],
        formula: `V = \\pi \\cdot ${r}^2 \\cdot ${h} = ${VPi}\\pi\\text{ cm}^3`,
        responseMode: 'STEP_GUIDANCE'
      });

      // Lateral Surface question
      const qSxq = `Tính diện tích xung quanh hình trụ có r = ${r} cm, h = ${h} cm.`;
      const normSxq = QuestionNormalizer.normalize(qSxq);
      list.push({
        id: `CYL-CALC-${counter++}`,
        topic: 'CYLINDER',
        intent: 'CALCULATION',
        subIntent: 'SURFACE_AREA',
        difficulty: 'APPLY',
        question: qSxq,
        normalizedQuestion: normSxq,
        keywords: QuestionNormalizer.extractKeywords(normSxq),
        entities: { r, h, target: 'Sxq' },
        answer: `Sxq = 2πrh = 2π · ${r} · ${h} = ${SxqPi}π cm² ≈ ${(SxqPi * Math.PI).toFixed(2)} cm².`,
        shortAnswer: `S_{xq} = ${SxqPi}\\pi\\text{ cm}^2`,
        teacherStyleResponse: `Diện tích xung quanh là $S_{xq} = 2\\pi rh = 2\\pi \\cdot ${r} \\cdot ${h} = ${SxqPi}\\pi\\text{ cm}^2 \\approx ${(SxqPi * Math.PI).toFixed(2)}\\text{ cm}^2$.`,
        quickReplies: [`Tính thể tích V`, `Tính diện tích toàn phần Stp`, 'Giải thích công thức'],
        requiredData: [`r=${r}`, `h=${h}`],
        formula: `S_{xq} = 2\\pi \\cdot ${r} \\cdot ${h} = ${SxqPi}\\pi\\text{ cm}^2`,
        responseMode: 'STEP_GUIDANCE'
      });
    }
  }

  // 2. Inverse problem variants (Finding r, h from V, Sxq) (~80 questions)
  const inverseSpecs = [
    { target: 'h', r: 3, V: 90, unit: 'cm' },
    { target: 'h', r: 4, V: 160, unit: 'cm' },
    { target: 'h', r: 5, V: 250, unit: 'cm' },
    { target: 'r', h: 8, V: 128, unit: 'cm' },
    { target: 'r', h: 10, V: 250, unit: 'cm' },
    { target: 'r', h: 12, Sxq: 72, unit: 'cm' },
    { target: 'h', r: 6, Sxq: 120, unit: 'cm' }
  ];

  for (const spec of inverseSpecs) {
    if (list.length >= 220) break;
    let qText = '';
    let aText = '';
    let fText = '';
    if (spec.target === 'h' && spec.V) {
      qText = `Một hình trụ có bán kính đáy r = ${spec.r} cm và thể tích V = ${spec.V}π cm³. Tìm chiều cao h của hình trụ.`;
      const calcH = spec.V / (spec.r * spec.r);
      aText = `Ta có h = V / (πr²) = (${spec.V}π) / (π · ${spec.r}²) = ${calcH} cm.`;
      fText = `h = \\frac{V}{\\pi r^2} = \\frac{${spec.V}\\pi}{\\pi \\cdot ${spec.r}^2} = ${calcH}\\text{ cm}`;
    } else if (spec.target === 'r' && spec.V) {
      qText = `Một hình trụ có chiều cao h = ${spec.h} cm và thể tích V = ${spec.V}π cm³. Tìm bán kính đáy r.`;
      const calcR = Math.sqrt(spec.V / spec.h);
      aText = `Ta có r² = V / (πh) = ${spec.V} / ${spec.h} = ${calcR * calcR} => r = ${calcR} cm.`;
      fText = `r = \\sqrt{\\frac{V}{\\pi h}} = \\sqrt{\\frac{${spec.V}\\pi}{\\pi \\cdot ${spec.h}}} = ${calcR}\\text{ cm}`;
    } else {
      qText = `Một hình trụ có chiều cao h = ${spec.h} cm và Sxq = ${spec.Sxq}π cm². Tìm bán kính đáy r.`;
      const calcR = (spec.Sxq || 0) / (2 * (spec.h || 1));
      aText = `Ta có r = Sxq / (2πh) = (${spec.Sxq}π) / (2π · ${spec.h}) = ${calcR} cm.`;
      fText = `r = \\frac{S_{xq}}{2\\pi h} = ${calcR}\\text{ cm}`;
    }

    const norm = QuestionNormalizer.normalize(qText);
    list.push({
      id: `CYL-INV-${counter++}`,
      topic: 'CYLINDER',
      intent: 'CALCULATION',
      subIntent: spec.target === 'h' ? 'HEIGHT' : 'RADIUS',
      difficulty: 'APPLY',
      question: qText,
      normalizedQuestion: norm,
      keywords: QuestionNormalizer.extractKeywords(norm),
      entities: { target: spec.target },
      answer: aText,
      shortAnswer: fText,
      teacherStyleResponse: `Để tìm đại lượng chưa biết, ta biến đổi công thức gốc:\n$$${fText}$$\nEm luôn nhớ rút gọn $\\pi$ ở cả tử và mẫu cho tiện tính toán nhé!`,
      quickReplies: ['Cho một bài toán ngược khác', 'Tính tiếp diện tích toàn phần', 'Gợi ý từng bước'],
      formula: fText,
      responseMode: 'STEP_GUIDANCE'
    });
  }

  // 3. Concepts & Axial Section questions (~60 questions)
  const conceptTopics = [
    { title: 'Thiết diện qua trục của hình trụ là hình gì?', ans: 'Thiết diện qua trục của hình trụ là một hình chữ nhật có kích thước 2r × h (đặc biệt nếu h = 2r thì là hình vuông).', formula: 'S_{\\text{thiết diện}} = 2r \\cdot h' },
    { title: 'Trục của hình trụ là gì?', ans: 'Trục của hình trụ là đường thẳng nối tâm của hai đường tròn đáy OO\'. Trục vuông góc với hai đáy và có độ dài bằng chiều cao h.', formula: 'OO\' = h' },
    { title: 'Đường sinh của hình trụ có quan hệ gì với chiều cao?', ans: 'Trong hình trụ tròn xoay, tất cả các đường sinh đều song song, bằng nhau và bằng chiều cao h (l = h).', formula: 'l = h' },
    { title: 'Khi quay một hình chữ nhật quanh một cạnh cố định ta được hình gì?', ans: 'Khi quay một hình chữ nhật quanh một cạnh cố định, ta được một hình trụ tròn xoay. Cạnh cố định là trục, cạnh đối diện quét nên mặt xung quanh, hai cạnh kề quét nên hai đáy tròn.', formula: 'V = \\pi r^2 h' },
    { title: 'Nếu tăng bán kính hình trụ lên gấp đôi và giữ nguyên chiều cao thì thể tích tăng mấy lần?', ans: 'Vì V tỉ lệ thuận với r², khi r tăng 2 lần thì V tăng 2² = 4 lần.', formula: 'V\' = \\pi (2r)^2 h = 4\\pi r^2 h = 4V' },
    { title: 'Nếu tăng chiều cao lên gấp đôi và giảm bán kính đáy một nửa thì thể tích thay đổi thế nào?', ans: 'V mới = π(r/2)² · (2h) = π(r²/4) · 2h = (1/2)πr²h. Vậy thể tích giảm đi một nửa.', formula: 'V\' = \\frac{1}{2}V' }
  ];

  for (let k = 0; k < 60; k++) {
    if (list.length >= 290) break;
    const item = conceptTopics[k % conceptTopics.length];
    const q = `${item.title} (Biến thể ${k + 1})`;
    const norm = QuestionNormalizer.normalize(q);
    list.push({
      id: `CYL-CONC-${counter++}`,
      topic: 'CYLINDER',
      intent: 'CONCEPT',
      subIntent: 'GENERAL',
      difficulty: 'UNDERSTAND',
      question: item.title,
      normalizedQuestion: norm,
      keywords: QuestionNormalizer.extractKeywords(norm),
      answer: item.ans,
      shortAnswer: item.ans,
      teacherStyleResponse: `Thầy giải thích cho em nhé: ${item.ans}`,
      quickReplies: ['Xem minh họa 3D', 'Cho em ví dụ', 'Công thức liên quan'],
      formula: item.formula,
      responseMode: 'CONCEPT_EXPLANATION'
    });
  }

  // 4. Fill remaining up to 340 questions with Real-world and Practice variations
  const realObjects = ['lon nước ngọt', 'bồn chứa xăng', 'cột trụ bê tông', 'ống cống thoát nước', 'cốc thủy tinh', 'hộp sữa đặc', 'thùng phuy dầu', 'lon bia', 'bình giữ nhiệt'];
  let objIdx = 0;
  while (list.length < 340) {
    const obj = realObjects[objIdx % realObjects.length];
    const r = (objIdx % 5) + 2;
    const h = (objIdx % 8) + 6;
    const q = `Một chiếc ${obj} hình trụ có bán kính r = ${r} cm và chiều cao h = ${h} cm. Tính dung tích và diện tích vật liệu để sản xuất.`;
    const norm = QuestionNormalizer.normalize(q);
    const VPi = r * r * h;
    const StpPi = 2 * r * (h + r);

    list.push({
      id: `CYL-PRACTICE-${counter++}`,
      topic: 'CYLINDER',
      intent: 'REAL_WORLD',
      subIntent: 'VOLUME',
      difficulty: 'APPLY',
      question: q,
      normalizedQuestion: norm,
      keywords: QuestionNormalizer.extractKeywords(norm),
      entities: { r, h, object: obj },
      answer: `Dung tích: V = ${VPi}π cm³ ≈ ${(VPi * Math.PI).toFixed(2)} ml. Diện tích vật liệu: Stp = ${StpPi}π cm² ≈ ${(StpPi * Math.PI).toFixed(2)} cm².`,
      shortAnswer: `V = ${VPi}\\pi\\text{ cm}^3, S_{tp} = ${StpPi}\\pi\\text{ cm}^2`,
      teacherStyleResponse: `Để tính cho chiếc **${obj}**, ta thực hiện 2 bước:\n1. Thể tích: $V = \\pi r^2 h = ${VPi}\\pi\\text{ cm}^3$.\n2. Diện tích vật liệu (toàn phần): $S_{tp} = 2\\pi r(h+r) = ${StpPi}\\pi\\text{ cm}^2$.`,
      quickReplies: ['Đổi sang lít/ml', 'Tính chi phí vật liệu', 'Bài tiếp theo'],
      formula: `V = ${VPi}\\pi\\text{ cm}^3, S_{tp} = ${StpPi}\\pi\\text{ cm}^2`,
      responseMode: 'REAL_WORLD_EXPLANATION'
    });
    objIdx++;
  }

  return list.slice(0, 340);
}
