/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Comprehensive Exercises Mock Data
 * Supports 6 Exercise Types:
 * 1. Multiple Choice (Trắc nghiệm 4 lựa chọn)
 * 2. True / False (Đúng / Sai)
 * 3. Numeric Calculation (Tính số)
 * 4. Fill in the Blank (Điền từ / công thức)
 * 5. Drag & Drop Matching (Ghép nối công thức)
 * 6. Challenge Multi-step (Thử thách điểm 10 Archimedes)
 *
 * Across 4 Cognitive Levels (Chuẩn Bộ GD&ĐT):
 * - Nhận biết (Recognition / Easy)
 * - Thông hiểu (Comprehension / Medium)
 * - Vận dụng (Application / Hard)
 * - Vận dụng cao (Advanced / Olympiad)
 *
 * Evaluated 100% deterministically with detailed commonError tracking.
 */

import {
  Exercise,
  MultipleChoiceExercise,
  TrueFalseExercise,
  NumericExercise,
  FillBlankExercise,
  DragDropExercise,
  ChallengeExercise
} from '../types/dataArchitecture';

// ----------------------------------------------------
// 1. Multiple Choice Exercises
// ----------------------------------------------------
export const MOCK_MULTIPLE_CHOICE_EXERCISES: MultipleChoiceExercise[] = [
  {
    id: 'ex-mc-cyl-01',
    shapeId: 'cylinder',
    lessonId: 'lesson-cyl-01',
    type: 'multiple_choice',
    title: 'Tính diện tích xung quanh hình trụ',
    question: 'Một hình trụ có bán kính đáy r = 5 cm và chiều cao h = 12 cm. Diện tích xung quanh của hình trụ đó là:',
    latexEquation: 'r = 5\\text{ cm}, \\quad h = 12\\text{ cm}',
    options: ['60π cm²', '120π cm²', '300π cm²', '170π cm²'],
    correctOptionIndex: 1,
    pointsXp: 40,
    difficulty: 'easy',
    hint: 'Sử dụng công thức Sxq = 2πrh.',
    explanation: 'Áp dụng công thức Sxq = 2πrh = 2 · π · 5 · 12 = 120π (cm²).',
    realWorldContext: 'Tính diện tích nhãn bọc quanh thân lon nước ngọt hình trụ.',
    tags: ['hình trụ', 'diện tích xung quanh', 'nhận biết']
  },
  {
    id: 'ex-mc-cyl-02',
    shapeId: 'cylinder',
    lessonId: 'lesson-cyl-02',
    type: 'multiple_choice',
    title: 'Tính chiều cao hình trụ từ thể tích và bán kính',
    question: 'Một hình trụ có thể tích V = 72π cm³ và bán kính đáy r = 3 cm. Chiều cao h của hình trụ là:',
    latexEquation: 'V = 72\\pi\\text{ cm}^3, \\quad r = 3\\text{ cm}',
    options: ['6 cm', '8 cm', '12 cm', '24 cm'],
    correctOptionIndex: 1,
    pointsXp: 60,
    difficulty: 'medium',
    hint: 'Rút h từ công thức V = πr²h => h = V / (πr²).',
    explanation: 'Ta có V = π · r² · h => 72π = π · 3² · h => 72π = 9π · h => h = 72 / 9 = 8 (cm).',
    realWorldContext: 'Xác định chiều cao của bình chứa dung dịch hóa chất.',
    tags: ['hình trụ', 'thể tích', 'thông hiểu']
  },
  {
    id: 'ex-mc-cone-01',
    shapeId: 'cone',
    lessonId: 'lesson-cone-01',
    type: 'multiple_choice',
    title: 'Tính đường sinh của hình nón',
    question: 'Một hình nón có bán kính đáy r = 6 cm và chiều cao h = 8 cm. Độ dài đường sinh l của hình nón là:',
    latexEquation: 'l = \\sqrt{h^2 + r^2}',
    options: ['10 cm', '14 cm', '12 cm', '48 cm'],
    correctOptionIndex: 0,
    pointsXp: 40,
    difficulty: 'easy',
    hint: 'Đường sinh l là cạnh huyền trong tam giác vuông: l = √(r² + h²).',
    explanation: 'Theo định lý Pythagore: l = √(6² + 8²) = √(36 + 64) = √100 = 10 (cm).',
    realWorldContext: 'Đo kích thước sườn khung nón lá bài thơ.',
    tags: ['hình nón', 'đường sinh', 'nhận biết']
  },
  {
    id: 'ex-mc-cone-02',
    shapeId: 'cone',
    lessonId: 'lesson-cone-02',
    type: 'multiple_choice',
    title: 'Diện tích toàn phần hình nón',
    question: 'Một hình nón có bán kính đáy r = 4 cm và đường sinh l = 6 cm. Diện tích toàn phần Stp của hình nón là:',
    latexEquation: 'S_{tp} = \\pi r l + \\pi r^2 = \\pi r (l + r)',
    options: ['24π cm²', '40π cm²', '48π cm²', '16π cm²'],
    correctOptionIndex: 1,
    pointsXp: 60,
    difficulty: 'medium',
    hint: 'Stp = πr(l + r) = π · 4 · (6 + 4).',
    explanation: 'Stp = π · r · (l + r) = π · 4 · (6 + 4) = π · 4 · 10 = 40π (cm²).',
    realWorldContext: 'Tính lượng giấy bìa cần để dán kín toàn bộ một chiếc mũ sinh nhật có đáy.',
    tags: ['hình nón', 'diện tích toàn phần', 'thông hiểu']
  },
  {
    id: 'ex-mc-sph-01',
    shapeId: 'sphere',
    lessonId: 'lesson-sph-01',
    type: 'multiple_choice',
    title: 'Thể tích khối cầu theo đường kính',
    question: 'Một quả cầu có đường kính d = 6 cm. Thể tích của khối cầu đó là:',
    latexEquation: 'd = 6\\text{ cm} \\implies R = 3\\text{ cm}',
    options: ['36π cm³', '288π cm³', '108π cm³', '12π cm³'],
    correctOptionIndex: 0,
    pointsXp: 40,
    difficulty: 'easy',
    hint: 'Bán kính R = d / 2 = 3 cm. Công thức thể tích: V = (4/3)πR³.',
    explanation: 'Bán kính R = 6 / 2 = 3 cm. Thể tích V = (4/3) · π · 3³ = (4/3) · π · 27 = 36π (cm³).',
    realWorldContext: 'Tính thể tích một viên bi sắt đặc.',
    tags: ['hình cầu', 'thể tích', 'nhận biết']
  },
  {
    id: 'ex-mc-sph-02',
    shapeId: 'sphere',
    lessonId: 'lesson-sph-02',
    type: 'multiple_choice',
    title: 'Diện tích mặt cầu khi biết chu vi đường tròn lớn',
    question: 'Một hình cầu có chu vi đường tròn lớn C = 10π cm. Diện tích mặt cầu đó là:',
    latexEquation: 'C = 2\\pi R = 10\\pi\\text{ cm}',
    options: ['50π cm²', '100π cm²', '25π cm²', '400π cm²'],
    correctOptionIndex: 1,
    pointsXp: 80,
    difficulty: 'hard',
    hint: 'Tìm R từ C = 2πR => R = 5 cm. Sau đó tính S = 4πR².',
    explanation: 'Ta có C = 2πR = 10π => R = 5 cm. Diện tích mặt cầu: S = 4πR² = 4π · 5² = 4π · 25 = 100π (cm²).',
    realWorldContext: 'Đo diện tích bề mặt Trái Đất dựa vào chu vi xích đạo.',
    tags: ['hình cầu', 'diện tích mặt cầu', 'vận dụng']
  }
];

// ----------------------------------------------------
// 2. True / False Exercises
// ----------------------------------------------------
export const MOCK_TRUE_FALSE_EXERCISES: TrueFalseExercise[] = [
  {
    id: 'ex-tf-all-01',
    shapeId: 'cylinder',
    lessonId: 'lesson-cyl-01',
    type: 'true_false',
    title: 'Đúng / Sai về tính chất hình học không gian 9',
    question: 'Hãy xác định tính Đúng (ĐÚNG) hay Sai (SAI) cho các mệnh đề hình học sau:',
    pointsXp: 60,
    difficulty: 'medium',
    hint: 'Nhớ lại các thiết diện khi cắt hình trụ, hình nón và hình cầu.',
    explanation: 'Xem lại các định lý cơ bản trong sách giáo khoa Toán 9 Chương IV.',
    tags: ['lý thuyết', 'đúng sai', 'thông hiểu'],
    statements: [
      {
        id: 'tf-1',
        statement: 'Khi cắt một hình trụ bởi mặt phẳng song song với trục, thiết diện thu được luôn là một hình chữ nhật.',
        latex: '',
        isTrue: true,
        explanation: 'Đúng. Thiết diện song song với trục cắt hai mặt đáy theo 2 dây cung bằng nhau và 2 đường sinh song song, tạo thành hình chữ nhật.'
      },
      {
        id: 'tf-2',
        statement: 'Thể tích của hình nón luôn bằng thể tích của hình trụ có cùng bán kính đáy và cùng chiều cao.',
        latex: 'V_{\\text{nón}} = V_{\\text{trụ}}',
        isTrue: false,
        explanation: 'Sai. Thể tích hình nón bằng 1/3 thể tích hình trụ cùng đáy và chiều cao: V_nón = (1/3) V_trụ.'
      },
      {
        id: 'tf-3',
        statement: 'Mặt phẳng cắt mặt cầu theo một thiết diện luôn là một hình tròn.',
        latex: '',
        isTrue: true,
        explanation: 'Đúng. Mọi mặt phẳng cắt mặt cầu (khoảng cách từ tâm đến mặt phẳng nhỏ hơn bán kính) đều tạo ra giao tuyến là một đường tròn.'
      },
      {
        id: 'tf-4',
        statement: 'Trong hình nón, đường sinh l luôn nhỏ hơn chiều cao h.',
        latex: 'l < h',
        isTrue: false,
        explanation: 'Sai. l là cạnh huyền trong tam giác vuông có cạnh góc vuông là h, nên luôn có l > h (vì l = √(h² + r²)).'
      }
    ]
  },
  {
    id: 'ex-tf-all-02',
    shapeId: 'cone',
    lessonId: 'lesson-cone-01',
    type: 'true_false',
    title: 'Đúng / Sai về công thức diện tích và thể tích',
    question: 'Hãy xác định tính Đúng / Sai cho các công thức biến đổi sau:',
    pointsXp: 60,
    difficulty: 'medium',
    hint: 'Kiểm tra kỹ các thừa số số học 2, 4, 1/3, 4/3.',
    explanation: 'Các công thức chuẩn được quy định trong SGK Toán 9.',
    tags: ['công thức', 'đúng sai', 'thông hiểu'],
    statements: [
      {
        id: 'tf-2-1',
        statement: 'Diện tích mặt cầu bán kính R gấp 4 lần diện tích hình tròn lớn có cùng bán kính.',
        latex: 'S = 4\\pi R^2 = 4 S_{\\text{đáy}}',
        isTrue: true,
        explanation: 'Đúng. Diện tích mặt cầu S = 4πR² = 4 · (πR²).'
      },
      {
        id: 'tf-2-2',
        statement: 'Khi trải phẳng mặt xung quanh hình nón, ta thu được một hình tam giác cân.',
        latex: '',
        isTrue: false,
        explanation: 'Sai. Khi trải phẳng mặt xung quanh hình nón ta thu được một HÌNH QUẠT TRÒN có bán kính bằng độ dài đường sinh l.'
      },
      {
        id: 'tf-2-3',
        statement: 'Thể tích khối cầu bán kính R tỉ lệ với lũy thừa bậc ba của bán kính R.',
        latex: 'V \\propto R^3',
        isTrue: true,
        explanation: 'Đúng. V = (4/3)πR³ tỉ lệ bậc 3 (nếu tăng R lên 2 lần thì V tăng 8 lần).'
      }
    ]
  }
];

// ----------------------------------------------------
// 3. Numeric Exercises
// ----------------------------------------------------
export const MOCK_NUMERIC_EXERCISES: NumericExercise[] = [
  {
    id: 'ex-num-cyl-01',
    shapeId: 'cylinder',
    lessonId: 'lesson-cyl-02',
    type: 'numeric',
    title: 'Tính thể tích bồn nước hình trụ',
    question: 'Một bồn nước inox hình trụ có bán kính đáy r = 0.6 m và chiều cao h = 1.5 m. Tính thể tích bồn nước theo đơn vị mét khối (lấy π = 3.14, làm tròn đến 2 chữ số thập phân).',
    latexEquation: 'V = \\pi r^2 h',
    expectedNumber: 1.70,
    tolerance: 0.05,
    unit: 'm³',
    placeholder: 'Nhập số (ví dụ: 1.70)',
    pointsXp: 80,
    difficulty: 'hard',
    hint: 'Tính V = 3.14 · 0.6² · 1.5 = 3.14 · 0.36 · 1.5.',
    explanation: 'V = 3.14 · 0.6² · 1.5 = 3.14 · 0.36 · 1.5 = 1.6956 ≈ 1.70 m³ (tương đương khoảng 1,700 lít nước).',
    realWorldContext: 'Tính dung tích bể chứa nước sinh hoạt gia đình.',
    tags: ['hình trụ', 'bài toán số học', 'vận dụng'],
    stepByStepGuide: [
      {
        stepNumber: 1,
        description: 'Tính diện tích đáy tròn của bồn nước',
        formulaLatex: 'S_{\\text{đáy}} = \\pi r^2 = 3.14 \\times 0.6^2',
        intermediateValue: '1.1304 m²'
      },
      {
        stepNumber: 2,
        description: 'Nhân diện tích đáy với chiều cao của bồn',
        formulaLatex: 'V = S_{\\text{đáy}} \\times h = 1.1304 \\times 1.5',
        intermediateValue: '1.6956 m³'
      },
      {
        stepNumber: 3,
        description: 'Làm tròn đến 2 chữ số thập phân',
        intermediateValue: '1.70 m³'
      }
    ]
  },
  {
    id: 'ex-num-cone-01',
    shapeId: 'cone',
    lessonId: 'lesson-cone-02',
    type: 'numeric',
    title: 'Tính thể tích chiếc nón lá',
    question: 'Một chiếc nón lá có đường kính đáy d = 40 cm (bán kính r = 20 cm) và chiều cao h = 30 cm. Tính thể tích không gian bên trong chiếc nón theo cm³ (lấy π = 3.14, làm tròn đến hàng đơn vị).',
    latexEquation: 'V = \\frac{1}{3}\\pi r^2 h',
    expectedNumber: 12560,
    tolerance: 10,
    unit: 'cm³',
    placeholder: 'Nhập số (ví dụ: 12560)',
    pointsXp: 80,
    difficulty: 'hard',
    hint: 'V = (1/3) · 3.14 · 20² · 30.',
    explanation: 'V = (1/3) · 3.14 · 400 · 30 = 3.14 · 400 · 10 = 12,560 (cm³).',
    tags: ['hình nón', 'tính toán', 'vận dụng'],
    stepByStepGuide: [
      {
        stepNumber: 1,
        description: 'Tính bán kính đáy: r = d / 2 = 20 cm',
        intermediateValue: '20 cm'
      },
      {
        stepNumber: 2,
        description: 'Áp dụng công thức thể tích hình nón: V = 1/3 · π · r² · h',
        formulaLatex: 'V = \\frac{1}{3} \\times 3.14 \\times 20^2 \\times 30',
        intermediateValue: '12560 cm³'
      }
    ]
  },
  {
    id: 'ex-num-sph-01',
    shapeId: 'sphere',
    lessonId: 'lesson-sph-02',
    type: 'numeric',
    title: 'Tính diện tích bề mặt quả bóng bàn',
    question: 'Một quả bóng bàn tiêu chuẩn có đường kính d = 4 cm (bán kính R = 2 cm). Tính diện tích bề mặt của quả bóng bàn theo cm² (lấy π = 3.14).',
    latexEquation: 'S = 4\\pi R^2',
    expectedNumber: 50.24,
    tolerance: 0.1,
    unit: 'cm²',
    placeholder: 'Nhập số (ví dụ: 50.24)',
    pointsXp: 60,
    difficulty: 'medium',
    hint: 'S = 4 · 3.14 · 2² = 4 · 3.14 · 4.',
    explanation: 'S = 4 · 3.14 · 2² = 12.56 · 4 = 50.24 (cm²).',
    tags: ['hình cầu', 'diện tích mặt cầu', 'thông hiểu'],
    stepByStepGuide: [
      {
        stepNumber: 1,
        description: 'Bán kính quả bóng bàn: R = d / 2 = 2 cm',
        intermediateValue: '2 cm'
      },
      {
        stepNumber: 2,
        description: 'Diện tích mặt cầu: S = 4 · π · R²',
        formulaLatex: 'S = 4 \\times 3.14 \\times 2^2',
        intermediateValue: '50.24 cm²'
      }
    ]
  }
];

// ----------------------------------------------------
// 4. Fill in the Blank Exercises
// ----------------------------------------------------
export const MOCK_FILL_BLANK_EXERCISES: FillBlankExercise[] = [
  {
    id: 'ex-fb-cone-01',
    shapeId: 'cone',
    lessonId: 'lesson-cone-01',
    type: 'fill_blank',
    title: 'Điền công thức hình nón còn thiếu',
    question: 'Hãy điền ký hiệu hoặc công thức thích hợp vào chỗ trống:',
    template: '1. Diện tích xung quanh hình nón có bán kính r và đường sinh l là S_xq = {{blank_1}}.\n2. Quan hệ giữa đường sinh l, chiều cao h và bán kính r là l² = {{blank_2}}.\n3. Thể tích hình nón bằng {{blank_3}} thể tích hình trụ có cùng bán kính đáy và chiều cao.',
    pointsXp: 60,
    difficulty: 'medium',
    hint: 'Gợi ý: πrl, h² + r², 1/3',
    explanation: '1. Sxq = πrl\n2. l² = h² + r² (theo định lý Pythagore)\n3. V_nón = 1/3 V_trụ.',
    tags: ['điền từ', 'công thức', 'hình nón', 'thông hiểu'],
    blanks: [
      {
        id: 'blank_1',
        placeholder: 'πrl / pi*r*l',
        acceptedAnswers: ['\\pi r l', 'pi r l', 'πrl', 'pirl', 'pi*r*l', 'pi r * l'],
        hint: 'Tích của pi, bán kính và đường sinh'
      },
      {
        id: 'blank_2',
        placeholder: 'h^2 + r^2',
        acceptedAnswers: ['h^2 + r^2', 'r^2 + h^2', 'h² + r²', 'r² + h²', 'h^2+r^2', 'r^2+h^2'],
        hint: 'Tổng bình phương hai cạnh góc vuông'
      },
      {
        id: 'blank_3',
        placeholder: '1/3',
        acceptedAnswers: ['1/3', 'một phần ba', '0.33', '1/3 lần', '1 / 3'],
        hint: 'Tỉ số thể tích nón so với trụ'
      }
    ]
  },
  {
    id: 'ex-fb-sph-01',
    shapeId: 'sphere',
    lessonId: 'lesson-sph-01',
    type: 'fill_blank',
    title: 'Điền công thức hình cầu chuẩn xác',
    question: 'Hoàn thiện các công thức cơ bản của hình cầu bán kính R:',
    template: '1. Diện tích mặt cầu bán kính R là S = {{blank_1}}.\n2. Thể tích khối cầu bán kính R là V = {{blank_2}}.\n3. Diện tích mặt cầu bằng {{blank_3}} lần diện tích hình tròn lớn.',
    pointsXp: 60,
    difficulty: 'medium',
    hint: 'Gợi ý: 4πR², 4/3πR³, 4',
    explanation: '1. S = 4πR²\n2. V = 4/3 πR³\n3. Bằng 4 lần diện tích hình tròn lớn πR².',
    tags: ['điền từ', 'công thức', 'hình cầu', 'thông hiểu'],
    blanks: [
      {
        id: 'blank_sph_1',
        placeholder: '4πR²',
        acceptedAnswers: ['4\\pi R^2', '4piR^2', '4πR²', '4pi R^2', '4*pi*R^2', '4 pi R^2', '4πr²'],
        hint: '4 lần pi nhân R bình phương'
      },
      {
        id: 'blank_sph_2',
        placeholder: '4/3 πR³',
        acceptedAnswers: ['4/3\\pi R^3', '4/3 pi R^3', '4/3πR³', '4/3piR^3', '(4/3)piR^3', '(4/3)πR³'],
        hint: 'Bốn phần ba pi nhân R lập phương'
      },
      {
        id: 'blank_sph_3',
        placeholder: '4',
        acceptedAnswers: ['4', 'bốn', '4 lần'],
        hint: 'Số nguyên'
      }
    ]
  }
];

// ----------------------------------------------------
// 5. Drag & Drop Matching Exercises
// ----------------------------------------------------
export const MOCK_DRAG_DROP_EXERCISES: DragDropExercise[] = [
  {
    id: 'ex-dd-formulas-01',
    shapeId: 'cylinder',
    lessonId: 'lesson-cyl-01',
    type: 'drag_drop',
    title: 'Ghép nối công thức thể tích với hình tương ứng',
    question: 'Kéo thả các công thức thể tích bên dưới vào đúng hộp của từng hình học không gian:',
    pointsXp: 80,
    difficulty: 'easy',
    hint: 'Hình trụ có hệ số 1, hình nón có hệ số 1/3, hình cầu có hệ số 4/3.',
    explanation: 'Hình trụ: V = πr²h. Hình nón: V = 1/3 πr²h. Hình cầu: V = 4/3 πR³.',
    tags: ['kéo thả', 'nối công thức', 'tổng hợp', 'nhận biết'],
    draggableItems: [
      {
        id: 'item-cyl-v',
        label: 'V = πr²h',
        latex: 'V = \\pi r^2 h',
        shapeType: 'cylinder'
      },
      {
        id: 'item-cone-v',
        label: 'V = 1/3 πr²h',
        latex: 'V = \\frac{1}{3}\\pi r^2 h',
        shapeType: 'cone'
      },
      {
        id: 'item-sph-v',
        label: 'V = 4/3 πR³',
        latex: 'V = \\frac{4}{3}\\pi R^3',
        shapeType: 'sphere'
      },
      {
        id: 'item-sph-s',
        label: 'S = 4πR²',
        latex: 'S = 4\\pi R^2',
        shapeType: 'sphere'
      }
    ],
    dropZones: [
      {
        id: 'zone-cyl',
        title: 'Thể tích Hình Trụ',
        description: 'Khối tròn xoay tạo bởi hình chữ nhật',
        acceptsItemId: 'item-cyl-v'
      },
      {
        id: 'zone-cone',
        title: 'Thể tích Hình Nón',
        description: 'Khối tròn xoay tạo bởi tam giác vuông',
        acceptsItemId: 'item-cone-v'
      },
      {
        id: 'zone-sph',
        title: 'Thể tích Khối Cầu',
        description: 'Khối tròn xoay tạo bởi nửa hình tròn',
        acceptsItemId: 'item-sph-v'
      }
    ]
  }
];

// ----------------------------------------------------
// 6. Challenge (Olympiad / Multi-step) Exercises
// ----------------------------------------------------
export const MOCK_CHALLENGE_EXERCISES: ChallengeExercise[] = [
  {
    id: 'ex-ch-watertank-01',
    shapeId: 'cylinder',
    lessonId: 'lesson-cyl-02',
    type: 'challenge',
    title: 'Thử Thách Archimedes: Quả Cầu Thả Vào Cốc Trụ',
    question: 'Một chiếc cốc thủy tinh hình trụ chứa nước có bán kính đáy R_trụ = 6 cm. Người ta thả chìm hoàn toàn một viên bi cầu bằng kim loại có bán kính R_cầu = 3 cm vào trong cốc. Hỏi mực nước trong cốc dâng cao thêm bao nhiêu cm?',
    scenario: 'Bài toán nguyên lý Archimedes kết hợp thể tích khối trụ và khối cầu - dạng bài phân loại điểm 9-10 trong đề thi vào Lớp 10.',
    timeLimitSeconds: 180,
    bonusXp: 150,
    pointsXp: 100,
    difficulty: 'hard',
    hint: 'Thể tích nước dâng lên bằng đúng thể tích của viên bi cầu được thả vào: V_dâng = V_cầu. Mà V_dâng = π · R_trụ² · Δh.',
    explanation: '1. Thể tích viên bi cầu: V_cầu = (4/3)π · 3³ = 36π (cm³).\n2. Phần nước dâng lên có dạng hình trụ với đáy bán kính 6 cm và chiều cao Δh.\n3. V_dâng = π · 6² · Δh = 36π · Δh.\n4. Vì V_dâng = V_cầu nên 36π · Δh = 36π => Δh = 1 (cm). Vậy mực nước dâng lên 1 cm.',
    tags: ['thử thách', 'vật lý - toán', 'vận dụng cao'],
    subQuestions: [
      {
        id: 'sub-q1',
        order: 1,
        question: 'Tính thể tích viên bi cầu kim loại theo π (nhập hệ số trước π):',
        latex: 'V_{\\text{cầu}} = \\frac{4}{3}\\pi R^3',
        answerType: 'numeric',
        expectedAnswer: 36,
        points: 30
      },
      {
        id: 'sub-q2',
        order: 2,
        question: 'Diện tích đáy của cốc hình trụ theo π (nhập hệ số trước π):',
        latex: 'S_{\\text{đáy}} = \\pi R_{\\text{trụ}}^2',
        answerType: 'numeric',
        expectedAnswer: 36,
        points: 30
      },
      {
        id: 'sub-q3',
        order: 3,
        question: 'Mực nước dâng thêm Δh bằng bao nhiêu cm?',
        latex: '\\Delta h = \\frac{V_{\\text{cầu}}}{S_{\\text{đáy}}}',
        answerType: 'numeric',
        expectedAnswer: 1,
        points: 40
      }
    ]
  }
];

// Combine all exercises into a unified array
export const ALL_MOCK_EXERCISES: Exercise[] = [
  ...MOCK_MULTIPLE_CHOICE_EXERCISES,
  ...MOCK_TRUE_FALSE_EXERCISES,
  ...MOCK_NUMERIC_EXERCISES,
  ...MOCK_FILL_BLANK_EXERCISES,
  ...MOCK_DRAG_DROP_EXERCISES,
  ...MOCK_CHALLENGE_EXERCISES
];
