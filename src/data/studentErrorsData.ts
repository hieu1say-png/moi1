/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Student Error Diagnosis & Misconceptions Mock Data
 */

import { StudentError } from '../types/dataArchitecture';

export const MOCK_STUDENT_ERRORS: StudentError[] = [
  {
    id: 'err-001',
    studentId: 'usr-student-001',
    exerciseId: 'ex-mc-cyl-01',
    shapeId: 'cylinder',
    errorType: 'formula_confusion',
    title: 'Nhầm lẫn giữa Diện tích xung quanh và Thể tích',
    description: 'Học sinh dùng công thức V = πr²h thay vì Sxq = 2πrh khi đề bài yêu cầu tính diện tích xung quanh.',
    wrongAnswer: '300π cm²',
    correctAnswer: '120π cm²',
    remedialExplanation:
      'Chú ý đơn vị và ý nghĩa hình học: Diện tích xung quanh có đơn vị cm² và là tích chu vi đáy với chiều cao (2πrh). Thể tích có đơn vị cm³ và là diện tích đáy nhân chiều cao (πr²h).',
    remedialFormulaLatex: 'S_{xq} = 2\\pi r h \\quad \\text{vs} \\quad V = \\pi r^2 h',
    suggestedAction: 'Xem lại bài giảng mô hình khai triển hình trụ thành hình chữ nhật.',
    occurredAt: '2026-08-14T10:15:00Z'
  },
  {
    id: 'err-002',
    studentId: 'usr-student-001',
    exerciseId: 'ex-mc-cone-01',
    shapeId: 'cone',
    errorType: 'conceptual_misunderstanding',
    title: 'Nhầm lẫn giữa Đường sinh (l) và Chiều cao (h)',
    description: 'Học sinh coi chiều cao h bằng luôn đường sinh l hoặc tính nhầm l = h + r thay vì dùng định lý Pythagore.',
    wrongAnswer: '14 cm',
    correctAnswer: '10 cm',
    remedialExplanation:
      'Trong hình nón, tam giác SOA vuông tại O (tâm đáy). Cạnh SO = h, OA = r là hai cạnh góc vuông, cạnh SA = l là cạnh huyền. Theo định lý Pythagore: l² = h² + r² ⇒ l = √(8² + 6²) = 10 cm.',
    remedialFormulaLatex: 'l = \\sqrt{h^2 + r^2} \\neq h + r',
    suggestedAction: 'Tương tác với mô hình 3D cắt dọc tam giác vuông của hình nón.',
    occurredAt: '2026-08-14T11:20:00Z'
  },
  {
    id: 'err-003',
    studentId: 'usr-student-002',
    exerciseId: 'ex-mc-sph-01',
    shapeId: 'sphere',
    errorType: 'variable_mixup',
    title: 'Nhầm lẫn giữa Đường kính (d) và Bán kính (R)',
    description: 'Đề bài cho đường kính d = 6 cm nhưng học sinh thay trực tiếp d vào công thức V = (4/3)πR³ coi R = 6 cm.',
    wrongAnswer: '288π cm³',
    correctAnswer: '36π cm³',
    remedialExplanation:
      'Khi đề bài cho đường kính d, bước đầu tiên LUÔN PHẢI TÍNH BÁN KÍNH: R = d / 2 = 6 / 2 = 3 cm. Sau đó mới thay vào công thức V = (4/3)π(3)³ = 36π cm³.',
    remedialFormulaLatex: 'R = \\frac{d}{2} = 3\\text{ cm} \\implies V = \\frac{4}{3}\\pi(3)^3 = 36\\pi',
    suggestedAction: 'Thực hành 3 bài tập chuyển đổi đường kính d thành bán kính r.',
    occurredAt: '2026-08-15T09:40:00Z'
  },
  {
    id: 'err-004',
    studentId: 'usr-student-001',
    exerciseId: 'ex-num-cone-01',
    shapeId: 'cone',
    errorType: 'calculation_mistake',
    title: 'Quên hệ số 1/3 trong thể tích hình nón',
    description: 'Học sinh tính thể tích nón như hình trụ: V = πr²h thay vì V = (1/3)πr²h.',
    wrongAnswer: '37680 cm³',
    correctAnswer: '12560 cm³',
    remedialExplanation:
      'Hãy nhớ thí nghiệm rót nước: Cần 3 cốc nước hình nón đầy mới rót đầy được 1 cốc hình trụ có cùng đáy và chiều cao. Do đó thể tích nón luôn có hệ số 1/3.',
    remedialFormulaLatex: 'V_{\\text{nón}} = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} V_{\\text{trụ}}',
    suggestedAction: 'Xem mô phỏng rót nước thí nghiệm nón và trụ trong phòng Lab.',
    occurredAt: '2026-08-15T14:10:00Z'
  }
];
