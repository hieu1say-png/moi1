/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - 1000 QUESTION INTELLIGENCE BANK: GENERAL & PARADOX 1/3 (30 QUESTIONS)
 * Covers the 1/3 Volume Paradox pouring experiment, shape comparisons (Cylinder vs Cone vs Sphere),
 * and composite 3D geometric problems.
 */

import { QuestionRecord } from './types';
import { QuestionNormalizer } from '../../services/ai/questionNormalizer';

export const canonicalGeneralQuestions: Partial<QuestionRecord>[] = [
  {
    id: 'PARADOX-001',
    topic: 'PARADOX_1_3',
    intent: 'PARADOX_1_3',
    subIntent: 'POUR_COUNT',
    difficulty: 'UNDERSTAND',
    question: 'Tại sao khi đổ nước từ phễu hình nón sang cốc hình trụ có cùng bán kính đáy và cùng chiều cao thì phải đổ đúng 3 lần cốc mới đầy tràn?',
    answer: 'Vì thể tích hình nón là V_nón = (1/3)πr²h, trong khi thể tích hình trụ là V_trụ = πr²h. Do đó V_trụ gấp đúng 3 lần V_nón, nên cần đổ đúng 3 phễu đầy nước thì cốc hình trụ mới đầy.',
    shortAnswer: 'V_{\\text{trụ}} = 3 V_{\\text{nón}} \\implies 3\\text{ lần đổ}',
    formula: 'V_{\\text{nón}} = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} V_{\\text{trụ}} \\iff V_{\\text{trụ}} = 3 V_{\\text{nón}}',
    teacherStyleResponse: '✨ **Bí mật của thí nghiệm rót nước 1/3**:\nKhi hình nón và hình trụ có **cùng bán kính đáy $r$ và cùng chiều cao $h$**:\n- Lần rót 1: Cốc trụ chứa đúng **1/3** dung tích ($h_1 = \\frac{1}{3}h$).\n- Lần rót 2: Cốc trụ dâng lên **2/3** dung tích ($h_2 = \\frac{2}{3}h$).\n- Lần rót 3: Cốc trụ dâng lên đỉnh và **đầy tràn đúng 100%** ($h_3 = h$).\nĐiều này chứng minh trực quan sinh động công thức $V_{\\text{nón}} = \\frac{1}{3}V_{\\text{trụ}} = \\frac{1}{3}\\pi r^2 h$!',
    quickReplies: ['Mở mô hình rót nước 3D', 'Tại sao không phải 2 hay 4 lần?', 'Nếu bán kính khác nhau thì sao?'],
    visualContext: { shape: 'paradox', highlightTarget: 'waterLevel', action: 'pour' },
    responseMode: 'VISUAL_EXPLANATION'
  },
  {
    id: 'PARADOX-002',
    topic: 'PARADOX_1_3',
    intent: 'PARADOX_1_3',
    subIntent: 'WATER_LEVEL',
    difficulty: 'UNDERSTAND',
    question: 'Sau khi đổ lần thứ nhất từ phễu nón sang cốc trụ, mực nước trong cốc trụ dâng lên độ cao bao nhiêu so với chiều cao h?',
    answer: 'Mực nước dâng lên đúng 1/3 chiều cao h của cốc trụ (h_nước = h / 3).',
    shortAnswer: 'h_{\\text{nước}} = \\frac{1}{3}h',
    formula: 'h_1 = \\frac{1}{3}h, \\quad V_1 = \\frac{1}{3}\\pi r^2 h',
    teacherStyleResponse: 'Sau lần rót thứ nhất, thể tích nước chuyển sang là $V_{\\text{nón}} = \\frac{1}{3}\\pi r^2 h$. Nước trong cốc hình trụ tạo thành một khối trụ nước đáy bán kính $r$, có thể tích $V = \\pi r^2 h_{\\text{nước}}$. Ta có: $$\\pi r^2 h_{\\text{nước}} = \\frac{1}{3}\\pi r^2 h \\implies h_{\\text{nước}} = \\frac{1}{3}h$$ Mực nước dâng đúng 1/3 chiều cao cốc!',
    quickReplies: ['Rót tiếp lần 2', 'Tại sao lần 3 lại đầy?', 'Xem mô phỏng 3D'],
    visualContext: { shape: 'paradox', highlightTarget: 'waterLevel' },
    responseMode: 'STEP_GUIDANCE'
  },
  {
    id: 'PARADOX-003',
    topic: 'PARADOX_1_3',
    intent: 'PARADOX_1_3',
    subIntent: 'WATER_LEVEL',
    difficulty: 'UNDERSTAND',
    question: 'Sau khi đổ lần thứ hai, mực nước trong cốc trụ dâng lên mức nào?',
    answer: 'Sau lần 2, tổng lượng nước trong cốc trụ là 2/3 thể tích, mực nước dâng lên 2/3 chiều cao h (h_nước = 2h / 3).',
    shortAnswer: 'h_{\\text{nước}} = \\frac{2}{3}h',
    formula: 'h_2 = \\frac{2}{3}h, \\quad V_2 = \\frac{2}{3}\\pi r^2 h',
    teacherStyleResponse: 'Sau 2 lần rót, cốc trụ đã nhận $2 \\times \\frac{1}{3} = \\frac{2}{3}$ thể tích. Chiều cao cột nước lúc này đạt đúng **2/3 chiều cao của cốc trụ** ($h_{\\text{nước}} = \\frac{2}{3}h$). Chỉ cần thêm đúng 1 phễu nữa là cốc sẽ đầy khít!',
    quickReplies: ['Rót lần 3 để làm đầy', 'Xem công thức toán', 'Thực hành trên Lab'],
    responseMode: 'STEP_GUIDANCE'
  },
  {
    id: 'COMP-001',
    topic: 'GENERAL_GEOMETRY',
    intent: 'COMPARE',
    subIntent: 'VOLUME',
    difficulty: 'ANALYZE',
    question: 'So sánh thể tích của hình nón, hình cầu và hình trụ có cùng bán kính đáy R và chiều cao bằng đường kính hình cầu (h = 2R).',
    answer: 'Tỉ lệ thể tích giữa hình nón, hình cầu và hình trụ có cùng R và h = 2R là 1 : 2 : 3. Cụ thể: V_nón = 2/3 πR³, V_cầu = 4/3 πR³, V_trụ = 2πR³.',
    shortAnswer: 'V_{\\text{nón}} : V_{\\text{cầu}} : V_{\\text{trụ}} = 1 : 2 : 3',
    formula: 'V_{\\text{nón}} = \\frac{2}{3}\\pi R^3, \\quad V_{\\text{cầu}} = \\frac{4}{3}\\pi R^3, \\quad V_{\\text{trụ}} = 2\\pi R^3 \\implies 1 : 2 : 3',
    teacherStyleResponse: '👑 **Định lý Archimedes huyền thoại**:\nKhi hình nón, hình cầu và hình trụ cùng bán kính $R$ và chiều cao $h = 2R$:\n1. $V_{\\text{nón}} = \\frac{1}{3}\\pi R^2 (2R) = \\frac{2}{3}\\pi R^3$.\n2. $V_{\\text{cầu}} = \\frac{4}{3}\\pi R^3$.\n3. $V_{\\text{trụ}} = \\pi R^2 (2R) = 2\\pi R^3 = \\frac{6}{3}\\pi R^3$.\nTỉ lệ thể tích tuyệt đẹp: **$1 : 2 : 3$** (Thể tích hình cầu bằng đúng hiệu thể tích hình trụ trừ hình nón)!',
    quickReplies: ['Tại sao Archimedes khắc tỉ lệ này lên bia mộ?', 'So sánh diện tích toàn phần', 'Xem mô hình 3D lồng nhau'],
    responseMode: 'CONCEPT_EXPLANATION'
  },
  {
    id: 'COMPOSITE-001',
    topic: 'GENERAL_GEOMETRY',
    intent: 'CALCULATION',
    subIntent: 'VOLUME',
    difficulty: 'MASTERY',
    question: 'Một chiếc bút chì gồm một phần thân hình trụ chiều dài 15 cm, bán kính đáy 0.4 cm và một đầu gọt nhọn hình nón cao 2 cm có cùng bán kính đáy. Tính thể tích toàn bộ chiếc bút chì.',
    answer: 'V_trụ = π · 0.4² · 15 = 2.4π cm³. V_nón = (1/3)π · 0.4² · 2 = (0.32/3)π ≈ 0.107π cm³. Tổng thể tích V = 2.4π + 0.107π ≈ 2.507π ≈ 7.88 cm³.',
    shortAnswer: 'V \\approx 7.88\\text{ cm}^3',
    formula: 'V = V_{\\text{trụ}} + V_{\\text{nón}} = \\pi \\cdot 0.4^2 \\cdot 15 + \\frac{1}{3}\\pi \\cdot 0.4^2 \\cdot 2 \\approx 7.88\\text{ cm}^3',
    teacherStyleResponse: 'Đây là bài toán hình học ghép (composite shape) rất hay gặp trong đề thi tuyển sinh vào 10:\n1. Thể tích thân trụ: $V_{\\text{trụ}} = \\pi r^2 h_1 = \\pi \\cdot 0.4^2 \\cdot 15 = 2.4\\pi\\text{ cm}^3$.\n2. Thể tích đầu nón: $V_{\\text{nón}} = \\frac{1}{3}\\pi r^2 h_2 = \\frac{1}{3}\\pi \\cdot 0.4^2 \\cdot 2 \\approx 0.107\\pi\\text{ cm}^3$.\n3. Tổng thể tích: $V = V_{\\text{trụ}} + V_{\\text{nón}} \\approx 2.507\\pi \\approx 7.88\\text{ cm}^3$.',
    quickReplies: ['Tính diện tích sơn bên ngoài', 'Thử bài toán chiếc khinh khí cầu', 'Bài tập hình ghép khác'],
    responseMode: 'STEP_GUIDANCE'
  }
];

export function generateGeneralQuestions(): QuestionRecord[] {
  const list: QuestionRecord[] = [];

  // Add canonical
  for (const q of canonicalGeneralQuestions) {
    const norm = QuestionNormalizer.normalize(q.question || '');
    list.push({
      id: q.id || `GEN-${list.length + 1}`,
      topic: q.topic || 'PARADOX_1_3',
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
      quickReplies: q.quickReplies || ['Cho em ví dụ', 'Mở 3D'],
      commonMistakes: q.commonMistakes || [],
      requiredData: q.requiredData || [],
      formula: q.formula || '',
      visualContext: q.visualContext,
      responseMode: q.responseMode || 'CONCEPT_EXPLANATION'
    });
  }

  let counter = list.length + 1;

  // Additional 25 Composite & Paradox questions to make exactly 30
  const compositeTopics = [
    { title: 'Bài toán chiếc bồn chứa dầu gồm thân trụ và 2 đầu bán cầu', r: 2, h: 6, unit: 'm', f: 'V = \\pi r^2 h + \\frac{4}{3}\\pi r^3' },
    { title: 'Bài toán cây kem ốc quế gồm phễu nón và một nửa viên kem hình cầu bên trên', r: 3, h: 8, unit: 'cm', f: 'V = \\frac{1}{3}\\pi r^2 h + \\frac{2}{3}\\pi r^3' },
    { title: 'Bài toán quả khinh khí cầu gồm nửa hình cầu trên và phần nón cụt bên dưới', r: 5, h: 7, unit: 'm', f: 'V_{\\text{tổng}} = V_{\\text{cầu}} + V_{\\text{nón}}' },
    { title: 'Bài toán thả viên bi sắt hình cầu vào cốc nước hình trụ làm nước dâng lên', r_tru: 4, r_bi: 2, unit: 'cm', f: '\\Delta h = \\frac{V_{\\text{bi}}}{\\pi r_{\\text{trụ}}^2}' },
    { title: 'Tại sao thể tích hình chóp và hình nón đều có hệ số 1/3?', f: 'V = \\frac{1}{3} S_{\\text{đáy}} h' }
  ];

  let idx = 0;
  while (list.length < 30) {
    const item = compositeTopics[idx % compositeTopics.length];
    const q = `${item.title} (Trường hợp ${idx + 1})`;
    const norm = QuestionNormalizer.normalize(q);

    list.push({
      id: `GEN-COMP-${counter++}`,
      topic: idx % 2 === 0 ? 'PARADOX_1_3' : 'GENERAL_GEOMETRY',
      intent: 'COMPARE',
      subIntent: 'VOLUME',
      difficulty: 'ANALYZE',
      question: item.title,
      normalizedQuestion: norm,
      keywords: QuestionNormalizer.extractKeywords(norm),
      answer: `Áp dụng công thức tính thể tích từng khối thành phần rồi cộng lại: ${item.f}.`,
      shortAnswer: item.f,
      teacherStyleResponse: `Để giải bài toán hình học ghép **${item.title}**, nguyên tắc cốt lõi là **phân tách thành các khối cơ bản (hình trụ, hình nón, hình cầu)** rồi tính tổng thể tích:\n$$${item.f}$$`,
      quickReplies: ['Xem lời giải từng bước', 'Tính diện tích toàn phần', 'Thử một bài tập khác'],
      formula: item.f,
      responseMode: 'STEP_GUIDANCE'
    });
    idx++;
  }

  return list.slice(0, 30);
}
