/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Complete Theory Content for Grade 9 Geometry
 * 3 Core Shapes: Cylinder (Hình Trụ), Cone (Hình Nón), Sphere (Hình Cầu)
 * 5 Standard Sections per Shape:
 * 1. Nhận biết (Recognition & Spatial Rotation)
 * 2. Đặc điểm (Elements, Characteristics & Cross-sections)
 * 3. Công thức (Standard Formulas, Derivations & Archimedes ratio)
 * 4. Ví dụ (Step-by-step Worked Examples with Real Numbers)
 * 5. Kiểm tra nhanh (Interactive Quick Quiz with immediate grading)
 */

import { ShapeType } from '../types';

export interface TheoryElementItem {
  name: string;
  symbol: string;
  unit: string;
  description: string;
  relationFormula?: string;
}

export interface TheoryCrossSection {
  name: string;
  shapeName: string;
  description: string;
  feature: string;
}

export interface TheoryFormulaItem {
  id: string;
  name: string;
  vietnameseName: string;
  latex: string;
  explanation: string;
  variables: { symbol: string; meaning: string }[];
  derivedFormulas?: { name: string; latex: string; note: string }[];
}

export interface TheoryExampleStep {
  stepNumber: number;
  title: string;
  latex?: string;
  explanation: string;
}

export interface TheoryExample {
  id: string;
  title: string;
  difficultyBadge: 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';
  problemStatement: string;
  givenData: string[];
  findTarget: string;
  steps: TheoryExampleStep[];
  finalResultLatex: string;
  tips: string;
}

export interface TheoryQuickQuizQuestion {
  id: string;
  question: string;
  latex?: string;
  type: 'multiple_choice' | 'numeric' | 'true_false';
  options?: string[];
  correctOptionIndex?: number;
  expectedNumber?: number;
  tolerance?: number;
  isTrue?: boolean;
  explanation: string;
  hint: string;
  pointsXp: number;
}

export interface DetailedShapeTheory {
  id: ShapeType;
  vietnameseName: string;
  englishName: string;
  tagline: string;
  colorTheme: {
    primary: string;
    bgBadge: string;
    textBadge: string;
    activeBorder: string;
  };
  
  // Section 1: Nhận biết
  recognition: {
    concept: string;
    rotationGeneration: string;
    rotationDetail: {
      planeFigure: string;
      rotationAxis: string;
      movingPart: string;
      movingPartsList?: string[];
      resultingSurface: string;
    };
    keyElements?: {
      name: string;
      symbol?: string;
      description: string;
    }[];
    realWorldExamples: string[];
    keyVisualNote: string;
  };

  // Section 2: Đặc điểm
  characteristics: {
    description: string;
    elements: TheoryElementItem[];
    crossSections: TheoryCrossSection[];
    keyRelationships: { label: string; formulaLatex: string; note: string }[];
  };

  // Section 3: Công thức
  formulas: {
    summaryLatex: string;
    list: TheoryFormulaItem[];
    archimedesInsight?: string;
    goldenRule: string;
  };

  // Section 4: Ví dụ mẫu
  examples: TheoryExample[];

  // Section 5: Kiểm tra nhanh
  quickQuiz: TheoryQuickQuizQuestion[];
}

export const DETAILED_THEORY_DATA: Record<ShapeType, DetailedShapeTheory> = {
  cylinder: {
    id: 'cylinder',
    vietnameseName: 'Hình Trụ',
    englishName: 'Cylinder',
    tagline: 'Khối tròn xoay tạo bởi hình chữ nhật quay quanh một cạnh',
    colorTheme: {
      primary: '#2563eb',
      bgBadge: 'bg-blue-100',
      textBadge: 'text-blue-800',
      activeBorder: 'border-blue-500'
    },
    recognition: {
      concept: 'Khi quay hình chữ nhật $O\'ABO$ một vòng quanh cạnh $OO\'$ cố định thì ta được một hình trụ.',
      rotationGeneration: 'Khi quay hình chữ nhật $O\'ABO$ một vòng quanh cạnh $OO\'$ cố định thì ta được một hình trụ.',
      rotationDetail: {
        planeFigure: 'Hình chữ nhật $O\'ABO$',
        rotationAxis: 'Đường thẳng $OO\'$ cố định (trục của hình trụ)',
        movingPart: 'Hai cạnh $O\'A$ và $OB$ quét nên hai đáy của hình trụ là hai hình tròn bằng nhau $(O\'; O\'A)$ và $(O; OB)$.\nCạnh $AB$ quét nên mặt xung quanh của hình trụ. Mỗi vị trí của $AB$ khi quay là một **đường sinh**.',
        movingPartsList: [
          'Hai cạnh $O\'A$ và $OB$ quét nên hai đáy của hình trụ là hai hình tròn bằng nhau $(O\'; O\'A)$ và $(O; OB)$.',
          'Cạnh $AB$ quét nên mặt xung quanh của hình trụ. Mỗi vị trí của $AB$ khi quay là một **đường sinh**.'
        ],
        resultingSurface: 'Hai đáy $(O\'; O\'A)$ và $(O; OB)$ song song bằng nhau cùng mặt xung quanh của hình trụ'
      },
      keyElements: [
        {
          name: 'Chiều cao ($h$)',
          symbol: 'h',
          description: 'Độ dài của đoạn $OO\'$ gọi là chiều cao của hình trụ ($h = O\'O$).'
        },
        {
          name: 'Bán kính đáy ($R$)',
          symbol: 'R',
          description: 'Độ dài $O\'A = OB$ gọi là bán kính đáy ($R = OB$).'
        },
        {
          name: 'Đường sinh ($l$)',
          symbol: 'l',
          description: 'Các đường sinh bằng nhau và bằng chiều cao $OO\'$ ($l = AB = h$).'
        }
      ],
      realWorldExamples: [
        'Hộp sữa đặc',
        'Lon nước ngọt Coca-Cola, Pepsi',
        'Thùng phuy chứa dầu công nghiệp',
        'Cột trụ bê tông nhà hát lớn',
        'Đường ống thoát nước tròn PVC',
        'Thỏi phấn viết bảng hình trụ'
      ],
      keyVisualNote: 'Mọi đoạn thẳng song song với trục $OO\'$ nối 2 đường tròn đáy đều có độ dài bằng nhau và bằng chiều cao $h$ (gọi là đường sinh $l = h$).'
    },
    characteristics: {
      description: 'Hình trụ có 2 đáy là 2 hình tròn bằng nhau nằm trên 2 mặt phẳng song song, và một mặt xung quanh cong đều.',
      elements: [
        {
          name: 'Bán kính đáy',
          symbol: 'r',
          unit: 'cm, m',
          description: 'Bán kính của 2 hình tròn đáy (O, r) và (O\', r)',
          relationFormula: 'r = d / 2'
        },
        {
          name: 'Chiều cao',
          symbol: 'h',
          unit: 'cm, m',
          description: 'Khoảng cách vuông góc giữa hai mặt phẳng chứa hai đáy',
          relationFormula: 'h = OO\''
        },
        {
          name: 'Đường sinh',
          symbol: 'l',
          unit: 'cm, m',
          description: 'Đoạn thẳng quét nên mặt xung quanh. Với hình trụ, đường sinh luôn bằng chiều cao',
          relationFormula: 'l = h'
        },
        {
          name: 'Đường kính đáy',
          symbol: 'd',
          unit: 'cm, m',
          description: 'Đoạn thẳng đi qua tâm đáy nối hai điểm trên đường tròn',
          relationFormula: 'd = 2r'
        },
        {
          name: 'Trục hình trụ',
          symbol: 'OO\'',
          unit: '-',
          description: 'Đường thẳng nối tâm hai đáy của hình trụ'
        }
      ],
      crossSections: [
        {
          name: 'Mặt cắt song song với đáy',
          shapeName: 'Hình tròn',
          description: 'Cắt hình trụ bởi mặt phẳng song song với đáy',
          feature: 'Thiết diện thu được là một hình tròn có bán kính đúng bằng bán kính đáy r.'
        },
        {
          name: 'Mặt cắt song song với trục',
          shapeName: 'Hình chữ nhật',
          description: 'Cắt hình trụ bởi mặt phẳng song song hoặc chứa trục OO\'',
          feature: 'Thiết diện là hình chữ nhật có một cạnh bằng chiều cao h, cạnh kia bằng độ dài dây cung đáy (nếu qua trục thì cạnh đó là 2r).'
        }
      ],
      keyRelationships: [
        { label: 'Quan hệ đường sinh và chiều cao', formulaLatex: 'l = h', note: 'Đặc trưng riêng của hình trụ' },
        { label: 'Diện tích 1 mặt đáy', formulaLatex: 'S_{\\text{đáy}} = \\pi r^2', note: 'Hình tròn bán kính r' },
        { label: 'Chu vi đường tròn đáy', formulaLatex: 'C_{\\text{đáy}} = 2\\pi r = \\pi d', note: 'Chiều dài khi trải phẳng mặt xung quanh' }
      ]
    },
    formulas: {
      summaryLatex: 'S_{xq} = 2\\pi r h, \\quad S_{tp} = 2\\pi r (h + r), \\quad V = \\pi r^2 h',
      list: [
        {
          id: 'cyl-sxq',
          name: 'Diện tích xung quanh',
          vietnameseName: 'Diện tích xung quanh hình trụ',
          latex: 'S_{xq} = 2\\pi r h = \\pi d h',
          explanation: 'Bằng chu vi đường tròn đáy nhân với chiều cao của hình trụ (khi trải mặt xung quanh ra ta được một hình chữ nhật kích thước 2πr × h).',
          variables: [
            { symbol: 'r', meaning: 'Bán kính đường tròn đáy' },
            { symbol: 'h', meaning: 'Chiều cao hình trụ' },
            { symbol: 'd', meaning: 'Đường kính đáy (d = 2r)' }
          ],
          derivedFormulas: [
            { name: 'Tìm bán kính đáy r từ Sxq', latex: 'r = \\frac{S_{xq}}{2\\pi h}', note: 'Biết diện tích xung quanh và chiều cao' },
            { name: 'Tìm chiều cao h từ Sxq', latex: 'h = \\frac{S_{xq}}{2\\pi r}', note: 'Biết diện tích xung quanh và bán kính' }
          ]
        },
        {
          id: 'cyl-stp',
          name: 'Diện tích toàn phần',
          vietnameseName: 'Diện tích toàn phần hình trụ',
          latex: 'S_{tp} = S_{xq} + 2S_{\\text{đáy}} = 2\\pi r h + 2\\pi r^2 = 2\\pi r (h + r)',
          explanation: 'Bằng diện tích xung quanh cộng với diện tích của cả 2 mặt đáy tròn.',
          variables: [
            { symbol: 'S_{xq}', meaning: 'Diện tích xung quanh (2πrh)' },
            { symbol: 'S_{\\text{đáy}}', meaning: 'Diện tích 1 đáy (πr²)' }
          ]
        },
        {
          id: 'cyl-v',
          name: 'Thể tích hình trụ',
          vietnameseName: 'Thể tích khối trụ tròn xoay',
          latex: 'V = \\pi r^2 h = S_{\\text{đáy}} \\cdot h',
          explanation: 'Bằng diện tích mặt đáy nhân với chiều cao của khối trụ.',
          variables: [
            { symbol: 'r', meaning: 'Bán kính đáy' },
            { symbol: 'h', meaning: 'Chiều cao' },
            { symbol: 'V', meaning: 'Thể tích (đơn vị: cm³, m³, lít)' }
          ],
          derivedFormulas: [
            { name: 'Tìm bán kính r từ thể tích V', latex: 'r = \\sqrt{\\frac{V}{\\pi h}}', note: 'Lấy căn bậc 2 của V / (πh)' },
            { name: 'Tìm chiều cao h từ thể tích V', latex: 'h = \\frac{V}{\\pi r^2}', note: 'Thể tích chia cho diện tích đáy' }
          ]
        }
      ],
      goldenRule: 'Trải phẳng mặt xung quanh hình trụ thu được một HÌNH CHỮ NHẬT có kích thước là Chu vi đáy (2πr) và Chiều cao (h).'
    },
    examples: [
      {
        id: 'cyl-ex-1',
        title: 'Ví dụ 1: Tính diện tích và thể tích lon nước hình trụ',
        difficultyBadge: 'Nhận biết',
        problemStatement: 'Một lon nước ngọt hình trụ có đường kính đáy d = 6 cm và chiều cao h = 12 cm. Tính diện tích xung quanh, diện tích toàn phần và thể tích của lon nước đó (lấy π = 3.14).',
        givenData: ['Đường kính d = 6 cm => Bán kính r = 3 cm', 'Chiều cao h = 12 cm', 'π ≈ 3.14'],
        findTarget: 'Sxq, Stp, V',
        steps: [
          {
            stepNumber: 1,
            title: 'Tìm bán kính đáy r',
            latex: 'r = \\frac{d}{2} = \\frac{6}{2} = 3\\text{ (cm)}',
            explanation: 'Bán kính bằng một nửa đường kính.'
          },
          {
            stepNumber: 2,
            title: 'Tính diện tích xung quanh lon nước',
            latex: 'S_{xq} = 2\\pi r h = 2 \\times 3.14 \\times 3 \\times 12 = 226.08\\text{ (cm}^2\\text{)}',
            explanation: 'Áp dụng công thức Sxq = 2πrh.'
          },
          {
            stepNumber: 3,
            title: 'Tính diện tích toàn phần của lon nước',
            latex: 'S_{tp} = 2\\pi r(h + r) = 2 \\times 3.14 \\times 3 \\times (12 + 3) = 18.84 \\times 15 = 282.6\\text{ (cm}^2\\text{)}',
            explanation: 'Áp dụng công thức Stp = 2πr(h + r).'
          },
          {
            stepNumber: 4,
            title: 'Tính thể tích chứa của lon nước',
            latex: 'V = \\pi r^2 h = 3.14 \\times 3^2 \\times 12 = 3.14 \\times 9 \\times 12 = 339.12\\text{ (cm}^3\\text{)}',
            explanation: 'Thể tích lon nước xấp xỉ 339 ml.'
          }
        ],
        finalResultLatex: 'S_{xq} = 226.08\\text{ cm}^2, \\quad S_{tp} = 282.6\\text{ cm}^2, \\quad V = 339.12\\text{ cm}^3',
        tips: 'Luôn nhớ chia đôi đường kính d để tìm bán kính r trước khi thay vào công thức tính!'
      },
      {
        id: 'cyl-ex-2',
        title: 'Ví dụ 2: Bài toán thực tế bể chứa nước sinh hoạt',
        difficultyBadge: 'Vận dụng',
        problemStatement: 'Một bồn inox hình trụ có dung tích V = 3.14 m³ (tương đương 3140 lít) và chiều cao h = 2.5 m. Tính bán kính đáy của bồn nước đó.',
        givenData: ['Thể tích V = 3.14 m³', 'Chiều cao h = 2.5 m', 'π ≈ 3.14'],
        findTarget: 'Bán kính đáy r (m)',
        steps: [
          {
            stepNumber: 1,
            title: 'Viết công thức thể tích và biểu diễn r',
            latex: 'V = \\pi r^2 h \\implies r^2 = \\frac{V}{\\pi h}',
            explanation: 'Rút r² từ công thức thể tích hình trụ.'
          },
          {
            stepNumber: 2,
            title: 'Thay số và tính r²',
            latex: 'r^2 = \\frac{3.14}{3.14 \\times 2.5} = \\frac{1}{2.5} = 0.4\\text{ (m}^2\\text{)}',
            explanation: 'Triệt tiêu π ở tử và mẫu giúp tính toán nhanh gọn.'
          },
          {
            stepNumber: 3,
            title: 'Khai căn tìm bán kính r',
            latex: 'r = \\sqrt{0.4} \\approx 0.632\\text{ (m)} = 63.2\\text{ (cm)}',
            explanation: 'Vì r > 0 nên lấy giá trị căn dương.'
          }
        ],
        finalResultLatex: 'r \\approx 0.632\\text{ m} = 63.2\\text{ cm}',
        tips: 'Khi đề bài cho các giá trị là bội số của π, hãy để nguyên π để triệt tiêu rút gọn thay vì bấm số thập phân quá sớm.'
      }
    ],
    quickQuiz: [
      {
        id: 'qq-cyl-1',
        type: 'multiple_choice',
        question: 'Hình trụ được tạo thành khi quay hình nào quanh một cạnh cố định?',
        options: ['Hình tam giác vuông', 'Hình chữ nhật', 'Nửa hình tròn', 'Hình thoi'],
        correctOptionIndex: 1,
        explanation: 'Hình trụ được sinh ra khi quay hình chữ nhật một vòng quanh một cạnh cố định.',
        hint: 'Nghĩ đến việc quay một tờ giấy hình chữ nhật quanh cái trục thẳng.',
        pointsXp: 20
      },
      {
        id: 'qq-cyl-2',
        type: 'numeric',
        question: 'Một hình trụ có bán kính đáy r = 4 cm và chiều cao h = 5 cm. Thể tích của hình trụ là bao nhiêu π cm³?',
        expectedNumber: 80,
        tolerance: 0.1,
        explanation: 'V = π · r² · h = π · 4² · 5 = π · 16 · 5 = 80π (cm³). Bạn nhập hệ số: 80.',
        hint: 'V = π · r² · h, hãy tính 4² × 5.',
        pointsXp: 25
      },
      {
        id: 'qq-cyl-3',
        type: 'true_false',
        question: 'Khi cắt hình trụ bởi mặt phẳng song song với trục, thiết diện thu được luôn là một hình tròn.',
        isTrue: false,
        explanation: 'Sai! Cắt song song với trục thu được HÌNH CHỮ NHẬT. Chỉ khi cắt song song với đáy mới thu được HÌNH TRÒN.',
        hint: 'Hãy tưởng tượng việc dùng dao chém dọc từ trên xuống dưới một khúc gỗ hình trụ.',
        pointsXp: 20
      }
    ]
  },

  cone: {
    id: 'cone',
    vietnameseName: 'Hình Nón',
    englishName: 'Cone',
    tagline: 'Khối tròn xoay tạo bởi tam giác vuông quay quanh một cạnh góc vuông',
    colorTheme: {
      primary: '#ea580c',
      bgBadge: 'bg-orange-100',
      textBadge: 'text-orange-800',
      activeBorder: 'border-orange-500'
    },
    recognition: {
      concept: 'Khi quay một tam giác vuông AOC một vòng quanh cạnh góc vuông OA cố định, ta được một hình nón.',
      rotationGeneration: 'Phép quay 360° của tam giác vuông quanh một cạnh góc vuông làm trục.',
      rotationDetail: {
        planeFigure: 'Tam giác vuông AOC vuông tại O (cạnh OA = h, OC = r, AC = l)',
        rotationAxis: 'Cạnh góc vuông OA cố định (trục và đường cao của hình nón)',
        movingPart: 'Cạnh huyền AC quét nên mặt xung quanh của hình nón; cạnh OC quét nên hình tròn đáy',
        movingPartsList: [
          'Cạnh góc vuông $OC$ quét nên mặt đáy của hình nón là hình tròn $(O; OC)$.',
          'Cạnh huyền $AC$ quét nên mặt xung quanh của hình nón. Mỗi vị trí của $AC$ khi quay là một **đường sinh**.'
        ],
        resultingSurface: 'Một mặt đáy hình tròn tâm O bán kính r và một mặt xung quanh hội tụ tại đỉnh A'
      },
      keyElements: [
        {
          name: 'Đỉnh hình nón',
          symbol: 'A',
          description: 'Điểm cố định $A$ trên trục quay ($A$ là đỉnh của hình nón).'
        },
        {
          name: 'Chiều cao ($h$)',
          symbol: 'h',
          description: 'Độ dài đoạn $OA$ gọi là chiều cao của hình nón ($h = OA$).'
        },
        {
          name: 'Bán kính đáy ($r$)',
          symbol: 'r',
          description: 'Độ dài đoạn $OC$ gọi là bán kính đáy ($r = OC$).'
        },
        {
          name: 'Đường sinh ($l$)',
          symbol: 'l',
          description: 'Độ dài cạnh huyền $AC$ gọi là đường sinh ($l = AC = \\sqrt{h^2 + r^2}$).'
        }
      ],
      realWorldExamples: [
        'Chiếc nón lá truyền thống Việt Nam',
        'Vỏ ốc quế đựng kem',
        'Cọc tiêu nón cảnh báo giao thông',
        'Phễu rót chất lỏng nhà bếp',
        'Mũ sinh nhật chóp nón giấy'
      ],
      keyVisualNote: 'Đường sinh l là cạnh huyền trong tam giác vuông: luôn có l² = h² + r² nên đường sinh l luôn LỚN HƠN chiều cao h và bán kính r.'
    },
    characteristics: {
      description: 'Hình nón có 1 đỉnh, 1 mặt đáy hình tròn và 1 mặt xung quanh hình nón.',
      elements: [
        {
          name: 'Bán kính đáy',
          symbol: 'r',
          unit: 'cm, m',
          description: 'Bán kính của hình tròn đáy tâm O',
          relationFormula: 'r = \\sqrt{l^2 - h^2}'
        },
        {
          name: 'Chiều cao',
          symbol: 'h',
          unit: 'cm, m',
          description: 'Khoảng cách vuông góc từ đỉnh S đến tâm đáy O',
          relationFormula: 'h = \\sqrt{l^2 - r^2}'
        },
        {
          name: 'Đường sinh',
          symbol: 'l',
          unit: 'cm, m',
          description: 'Khoảng cách từ đỉnh S đến bất kỳ điểm nào trên đường tròn đáy',
          relationFormula: 'l = \\sqrt{h^2 + r^2}'
        },
        {
          name: 'Đỉnh hình nón',
          symbol: 'S',
          unit: '-',
          description: 'Điểm đối diện với mặt đáy của hình nón'
        },
        {
          name: 'Góc ở đỉnh',
          symbol: '2α',
          unit: 'độ',
          description: 'Góc tạo bởi hai đường sinh đối xứng qua trục trên thiết diện'
        }
      ],
      crossSections: [
        {
          name: 'Thiết diện qua trục',
          shapeName: 'Tam giác cân',
          description: 'Mặt phẳng đi qua đỉnh và tâm đáy hình nón',
          feature: 'Luôn là một tam giác cân có cạnh bên là đường sinh l, cạnh đáy là đường kính 2r và đường cao là h.'
        },
        {
          name: 'Thiết diện song song đáy',
          shapeName: 'Hình tròn đồng tâm',
          description: 'Mặt phẳng cắt song song với mặt đáy',
          feature: 'Tạo thành một hình tròn nhỏ hơn, phần giữa hai mặt phẳng gọi là hình nón cụt.'
        }
      ],
      keyRelationships: [
        { label: 'Định lý Pythagore trong hình nón', formulaLatex: 'l^2 = h^2 + r^2', note: 'Mối quan hệ vàng quan trọng nhất' },
        { label: 'Diện tích hình quạt khai triển', formulaLatex: 'S_{\\text{quạt}} = S_{xq} = \\pi r l', note: 'Trải mặt xung quanh nón ra mặt phẳng' },
        { label: 'Góc ở tâm hình quạt trải phẳng', formulaLatex: '\\alpha^\\circ = \\frac{r}{l} \\cdot 360^\\circ', note: 'Độ mở góc của quạt tròn' }
      ]
    },
    formulas: {
      summaryLatex: 'l = \\sqrt{h^2 + r^2}, \\quad S_{xq} = \\pi r l, \\quad S_{tp} = \\pi r (l + r), \\quad V = \\frac{1}{3}\\pi r^2 h',
      list: [
        {
          id: 'cone-pyth',
          name: 'Mối quan hệ đường sinh (Pythagore)',
          vietnameseName: 'Hệ thức Pythagore đường sinh',
          latex: 'l = \\sqrt{h^2 + r^2} \\iff l^2 = h^2 + r^2',
          explanation: 'Vì tam giác SOA vuông tại O nên bình phương cạnh huyền (đường sinh l) bằng tổng bình phương hai cạnh góc vuông (chiều cao h và bán kính r).',
          variables: [
            { symbol: 'l', meaning: 'Độ dài đường sinh' },
            { symbol: 'h', meaning: 'Chiều cao nón' },
            { symbol: 'r', meaning: 'Bán kính đáy' }
          ],
          derivedFormulas: [
            { name: 'Tính chiều cao h', latex: 'h = \\sqrt{l^2 - r^2}', note: 'Biết đường sinh l và bán kính r' },
            { name: 'Tính bán kính r', latex: 'r = \\sqrt{l^2 - h^2}', note: 'Biết đường sinh l và chiều cao h' }
          ]
        },
        {
          id: 'cone-sxq',
          name: 'Diện tích xung quanh hình nón',
          vietnameseName: 'Diện tích xung quanh hình nón',
          latex: 'S_{xq} = \\pi r l',
          explanation: 'Bằng tích của số pi, bán kính đáy r và độ dài đường sinh l.',
          variables: [
            { symbol: 'r', meaning: 'Bán kính đáy' },
            { symbol: 'l', meaning: 'Độ dài đường sinh (chú ý: dùng l chứ KHÔNG dùng h!)' }
          ]
        },
        {
          id: 'cone-stp',
          name: 'Diện tích toàn phần hình nón',
          vietnameseName: 'Diện tích toàn phần hình nón',
          latex: 'S_{tp} = S_{xq} + S_{\\text{đáy}} = \\pi r l + \\pi r^2 = \\pi r (l + r)',
          explanation: 'Bằng diện tích xung quanh cộng với diện tích một đáy tròn (hình nón chỉ có duy nhất 1 đáy).',
          variables: [
            { symbol: 'S_{xq}', meaning: 'Diện tích xung quanh (πrl)' },
            { symbol: 'S_{\\text{đáy}}', meaning: 'Diện tích đáy tròn (πr²)' }
          ]
        },
        {
          id: 'cone-v',
          name: 'Thể tích hình nón',
          vietnameseName: 'Thể tích khối nón tròn xoay',
          latex: 'V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} S_{\\text{đáy}} \\cdot h',
          explanation: 'Thể tích hình nón bằng đúng 1/3 thể tích hình trụ có cùng bán kính đáy r và chiều cao h.',
          variables: [
            { symbol: 'r', meaning: 'Bán kính đáy' },
            { symbol: 'h', meaning: 'Chiều cao (khoảng cách từ đỉnh đến đáy)' }
          ],
          derivedFormulas: [
            { name: 'Tính chiều cao h từ thể tích V', latex: 'h = \\frac{3V}{\\pi r^2}', note: 'Gấp 3 lần thể tích chia diện tích đáy' },
            { name: 'Tính bán kính r từ thể tích V', latex: 'r = \\sqrt{\\frac{3V}{\\pi h}}', note: 'Căn bậc hai của 3V / (πh)' }
          ]
        }
      ],
      goldenRule: 'Quy tắc 1/3: Thể tích nón V = 1/3 π r² h (luôn có hệ số 1/3 và dùng chiều cao h, KHÔNG dùng đường sinh l khi tính thể tích!).'
    },
    examples: [
      {
        id: 'cone-ex-1',
        title: 'Ví dụ 1: Tính diện tích lá cọ làm nón lá bài thơ',
        difficultyBadge: 'Thông hiểu',
        problemStatement: 'Một chiếc nón lá có đường kính đáy d = 40 cm (bán kính r = 20 cm) và chiều cao h = 15 cm. Tính độ dài đường sinh l và diện tích lá cọ cần để phủ kín mặt xung quanh chiếc nón (lấy π = 3.14).',
        givenData: ['Bán kính đáy r = 20 cm', 'Chiều cao h = 15 cm', 'π ≈ 3.14'],
        findTarget: 'Đường sinh l, Diện tích xung quanh Sxq',
        steps: [
          {
            stepNumber: 1,
            title: 'Áp dụng định lý Pythagore tính đường sinh l',
            latex: 'l = \\sqrt{h^2 + r^2} = \\sqrt{15^2 + 20^2} = \\sqrt{225 + 400} = \\sqrt{625} = 25\\text{ (cm)}',
            explanation: 'Bộ ba số Pythagore đẹp: 15 - 20 - 25 (bội số của 3-4-5).'
          },
          {
            stepNumber: 2,
            title: 'Tính diện tích lá xung quanh chiếc nón',
            latex: 'S_{xq} = \\pi r l = 3.14 \\times 20 \\times 25 = 3.14 \\times 500 = 1570\\text{ (cm}^2\\text{)}',
            explanation: 'Thay r = 20 cm và l = 25 cm vào công thức Sxq = πrl.'
          }
        ],
        finalResultLatex: 'l = 25\\text{ cm}, \\quad S_{xq} = 1570\\text{ cm}^2 = 0.157\\text{ m}^2',
        tips: 'Sai lầm kinh điển: Học sinh hay lấy nhầm chiều cao h = 15 thay vì đường sinh l = 25 để tính Sxq. Hãy luôn nhớ: Sxq = π·r·l!'
      },
      {
        id: 'cone-ex-2',
        title: 'Ví dụ 2: Bài toán đống cát hình nón',
        difficultyBadge: 'Vận dụng',
        problemStatement: 'Một đống cát có dạng hình nón có chu vi đáy C = 18.84 m và chiều cao h = 2 m. Tính thể tích cát trong đống (lấy π = 3.14).',
        givenData: ['Chu vi đáy C = 18.84 m', 'Chiều cao h = 2 m', 'π ≈ 3.14'],
        findTarget: 'Thể tích V (m³)',
        steps: [
          {
            stepNumber: 1,
            title: 'Tìm bán kính đáy r từ chu vi đáy',
            latex: 'C = 2\\pi r \\implies r = \\frac{C}{2\\pi} = \\frac{18.84}{2 \\times 3.14} = \\frac{18.84}{6.28} = 3\\text{ (m)}',
            explanation: 'Bán kính đáy r = 3 m.'
          },
          {
            stepNumber: 2,
            title: 'Tính thể tích đống cát',
            latex: 'V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} \\times 3.14 \\times 3^2 \\times 2 = \\frac{1}{3} \\times 3.14 \\times 9 \\times 2 = 3.14 \\times 3 \\times 2 = 18.84\\text{ (m}^3\\text{)}',
            explanation: 'Rút gọn 1/3 với 9 = 3 trước khi nhân.'
          }
        ],
        finalResultLatex: 'V = 18.84\\text{ m}^3',
        tips: 'Đừng quên nhân hệ số 1/3 khi tính thể tích hình nón!'
      }
    ],
    quickQuiz: [
      {
        id: 'qq-cone-1',
        type: 'multiple_choice',
        question: 'Công thức tính diện tích xung quanh hình nón có bán kính đáy r và đường sinh l là gì?',
        options: ['Sxq = 2πrl', 'Sxq = πrl', 'Sxq = 1/3 πr²h', 'Sxq = πr²l'],
        correctOptionIndex: 1,
        explanation: 'Diện tích xung quanh hình nón là Sxq = πrl.',
        hint: 'Nhớ phân biệt với hình trụ: hình trụ là 2πrh còn hình nón là πrl.',
        pointsXp: 20
      },
      {
        id: 'qq-cone-2',
        type: 'numeric',
        question: 'Một hình nón có bán kính đáy r = 3 cm và chiều cao h = 4 cm. Độ dài đường sinh l là bao nhiêu cm?',
        expectedNumber: 5,
        tolerance: 0.05,
        explanation: 'l = √(3² + 4²) = √(9 + 16) = √25 = 5 (cm).',
        hint: 'Áp dụng định lý Pythagore: l = √(r² + h²).',
        pointsXp: 25
      },
      {
        id: 'qq-cone-3',
        type: 'true_false',
        question: 'Thể tích hình nón bằng 1/3 thể tích hình trụ có cùng bán kính đáy và cùng chiều cao.',
        isTrue: true,
        explanation: 'Đúng! V_nón = 1/3 π r² h = 1/3 V_trụ.',
        hint: 'Đây là định lý cơ bản và được chứng minh bằng thực nghiệm rót nước.',
        pointsXp: 20
      }
    ]
  },

  sphere: {
    id: 'sphere',
    vietnameseName: 'Hình Cầu',
    englishName: 'Sphere',
    tagline: 'Tập hợp tất cả các điểm trong không gian cách tâm O một khoảng không đổi R',
    colorTheme: {
      primary: '#16a34a',
      bgBadge: 'bg-emerald-100',
      textBadge: 'text-emerald-800',
      activeBorder: 'border-emerald-500'
    },
    recognition: {
      concept: 'Khi quay một nửa hình tròn tâm O bán kính R một vòng quanh đường kính cố định, ta được một hình cầu.',
      rotationGeneration: 'Phép quay 360° của nửa hình tròn quanh đường kính cố định làm trục.',
      rotationDetail: {
        planeFigure: 'Nửa hình tròn tâm $O$, bán kính $R$ (đường kính $AB = 2R$)',
        rotationAxis: 'Đường kính $AB$ cố định làm trục quay',
        movingPart: 'Nửa đường tròn quét nên MẶT CẦU; toàn bộ nửa hình tròn quét nên KHỐI CẦU',
        movingPartsList: [
          'Nửa đường tròn quét nên **Mặt cầu** tâm $O$, bán kính $R$.',
          'Toàn bộ nửa hình tròn quét nên **Khối cầu** tâm $O$, bán kính $R$.'
        ],
        resultingSurface: 'Mặt cầu là biên ngoài; khối cầu bao gồm toàn bộ các điểm bên trong và trên mặt cầu'
      },
      keyElements: [
        {
          name: 'Tâm hình cầu',
          symbol: 'O',
          description: 'Điểm chính giữa $O$ của đường kính $AB$ cố định.'
        },
        {
          name: 'Bán kính ($R$)',
          symbol: 'R',
          description: 'Khoảng cách từ tâm $O$ đến bất kỳ điểm nào trên mặt cầu ($R = OA = OB$).'
        },
        {
          name: 'Đường kính ($d$)',
          symbol: 'd',
          description: 'Đoạn thẳng đi qua tâm $O$ nối 2 điểm trên mặt cầu ($d = AB = 2R$).'
        }
      ],
      realWorldExamples: [
        'Trái bóng đá, bóng chuyền, bóng rổ',
        'Quả địa cầu mô hình Trái Đất',
        'Bình cầu chứa khí nén chịu áp lực cao',
        'Viên bi ve, viên bi sắt ổ trục vòng bi',
        'Bong bóng xà phòng bay trong không khí'
      ],
      keyVisualNote: 'Hình cầu có tính đối xứng hoàn hảo cao nhất trong không gian: mọi mặt phẳng đi qua tâm O đều cắt hình cầu tạo thành một ĐƯỜNG TRÒN LỚN có bán kính đúng bằng R.'
    },
    characteristics: {
      description: 'Hình cầu không có đỉnh, không có cạnh, hoàn toàn đối xứng qua tâm O.',
      elements: [
        {
          name: 'Tâm hình cầu',
          symbol: 'O',
          unit: '-',
          description: 'Điểm cố định cách đều mọi điểm trên mặt cầu một khoảng bằng R'
        },
        {
          name: 'Bán kính',
          symbol: 'R',
          unit: 'cm, m',
          description: 'Khoảng cách từ tâm O đến bất kỳ điểm nào trên mặt cầu',
          relationFormula: 'R = d / 2'
        },
        {
          name: 'Đường kính',
          symbol: 'd',
          unit: 'cm, m',
          description: 'Đoạn thẳng đi qua tâm O nối hai điểm trên mặt cầu',
          relationFormula: 'd = 2R'
        },
        {
          name: 'Đường tròn lớn',
          symbol: 'C',
          unit: 'cm',
          description: 'Đường tròn thiết diện cắt bởi mặt phẳng đi qua tâm O',
          relationFormula: 'C = 2\\pi R'
        }
      ],
      crossSections: [
        {
          name: 'Mặt phẳng đi qua tâm',
          shapeName: 'Đường tròn lớn (Great Circle)',
          description: 'Cắt mặt cầu bởi mặt phẳng đi qua tâm O',
          feature: 'Thiết diện là hình tròn có bán kính lớn nhất bằng đúng bán kính R của hình cầu, chu vi 2πR, diện tích πR².'
        },
        {
          name: 'Mặt phẳng không qua tâm',
          shapeName: 'Đường tròn nhỏ (Small Circle)',
          description: 'Cắt mặt cầu bởi mặt phẳng cách tâm khoảng cách d < R',
          feature: 'Thiết diện luôn là một đường tròn có bán kính r = √(R² - d²).'
        }
      ],
      keyRelationships: [
        { label: 'Diện tích mặt cầu gấp 4 lần diện tích hình tròn lớn', formulaLatex: 'S = 4 S_{\\text{tròn lớn}} = 4\\pi R^2', note: 'Khám phá của Archimedes' },
        { label: 'Công thức theo đường kính d', formulaLatex: 'S = \\pi d^2, \\quad V = \\frac{1}{6}\\pi d^3', note: 'Thay R = d/2 vào công thức gốc' },
        { label: 'Tỉ số thể tích kinh điển Archimedes', formulaLatex: 'V_{\\text{cầu}} = \\frac{2}{3} V_{\\text{trụ ngoại tiếp}}', note: 'Hình trụ ngoại tiếp có r = R, h = 2R' }
      ]
    },
    formulas: {
      summaryLatex: 'S = 4\\pi R^2 = \\pi d^2, \\quad V = \\frac{4}{3}\\pi R^3 = \\frac{1}{6}\\pi d^3',
      list: [
        {
          id: 'sph-s',
          name: 'Diện tích mặt cầu',
          vietnameseName: 'Diện tích mặt cầu',
          latex: 'S = 4\\pi R^2 = \\pi d^2',
          explanation: 'Diện tích mặt cầu bằng 4 lần diện tích hình tròn lớn có cùng bán kính R.',
          variables: [
            { symbol: 'R', meaning: 'Bán kính mặt cầu' },
            { symbol: 'd', meaning: 'Đường kính mặt cầu (d = 2R)' }
          ],
          derivedFormulas: [
            { name: 'Tính bán kính R từ diện tích S', latex: 'R = \\sqrt{\\frac{S}{4\\pi}} = \\frac{1}{2}\\sqrt{\\frac{S}{\\pi}}', note: 'Căn bậc hai của S chia cho 4π' },
            { name: 'Diện tích nửa mặt cầu (bán cầu)', latex: 'S_{\\text{bán cầu}} = 2\\pi R^2', note: 'Chỉ tính phần mặt cong' }
          ]
        },
        {
          id: 'sph-v',
          name: 'Thể tích khối cầu',
          vietnameseName: 'Thể tích khối cầu',
          latex: 'V = \\frac{4}{3}\\pi R^3 = \\frac{1}{6}\\pi d^3',
          explanation: 'Thể tích của khối cầu tỉ lệ thuận với lũy thừa bậc ba của bán kính R.',
          variables: [
            { symbol: 'R', meaning: 'Bán kính khối cầu' },
            { symbol: 'd', meaning: 'Đường kính khối cầu' }
          ],
          derivedFormulas: [
            { name: 'Tính bán kính R từ thể tích V', latex: 'R = \\sqrt[3]{\\frac{3V}{4\\pi}}', note: 'Căn bậc 3 của (3V / 4π)' },
            { name: 'Thể tích nửa khối cầu', latex: 'V_{\\text{nửa cầu}} = \\frac{2}{3}\\pi R^3', note: 'Một nửa thể tích toàn khối cầu' }
          ]
        }
      ],
      goldenRule: 'Quy tắc 4 và 4/3: Diện tích có số 4 (S = 4πR²), Thể tích có số 4/3 và mũ 3 (V = 4/3 π R³).'
    },
    examples: [
      {
        id: 'sph-ex-1',
        title: 'Ví dụ 1: Tính diện tích da may quả bóng đá',
        difficultyBadge: 'Nhận biết',
        problemStatement: 'Một quả bóng đá tiêu chuẩn FIFA có đường kính d = 22 cm (bán kính R = 11 cm). Tính diện tích bề mặt da của quả bóng và thể tích không khí bên trong quả bóng (lấy π = 3.14, làm tròn đến chữ số thập phân thứ nhất).',
        givenData: ['Bán kính R = 11 cm', 'Đường kính d = 22 cm', 'π ≈ 3.14'],
        findTarget: 'Diện tích mặt cầu S, Thể tích khối cầu V',
        steps: [
          {
            stepNumber: 1,
            title: 'Tính diện tích bề mặt quả bóng',
            latex: 'S = 4\\pi R^2 = 4 \\times 3.14 \\times 11^2 = 12.56 \\times 121 = 1519.76 \\approx 1519.8\\text{ (cm}^2\\text{)}',
            explanation: 'Áp dụng công thức diện tích mặt cầu S = 4πR².'
          },
          {
            stepNumber: 2,
            title: 'Tính thể tích không khí bên trong quả bóng',
            latex: 'V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3} \\times 3.14 \\times 11^3 = \\frac{4}{3} \\times 3.14 \\times 1331 = 5572.5\\text{ (cm}^3\\text{)}',
            explanation: 'Thể tích quả bóng xấp xỉ 5.57 lít.'
          }
        ],
        finalResultLatex: 'S \\approx 1519.8\\text{ cm}^2, \\quad V \\approx 5572.5\\text{ cm}^3',
        tips: 'Chú ý không nhầm lẫn giữa R² trong công thức diện tích và R³ trong công thức thể tích!'
      },
      {
        id: 'sph-ex-2',
        title: 'Ví dụ 2: Thí nghiệm Archimedes thả bi cầu vào bình trụ',
        difficultyBadge: 'Vận dụng cao',
        problemStatement: 'Một cốc thủy tinh hình trụ chứa nước có bán kính đáy r = 6 cm. Người ta thả chìm hoàn toàn một viên bi sắt hình cầu bán kính R = 3 cm vào cốc. Hỏi mực nước trong cốc dâng cao thêm bao nhiêu cm?',
        givenData: ['Bán kính cốc trụ r = 6 cm', 'Bán kính viên bi sắt R = 3 cm'],
        findTarget: 'Độ dâng của mực nước Δh (cm)',
        steps: [
          {
            stepNumber: 1,
            title: 'Tính thể tích viên bi sắt hình cầu',
            latex: 'V_{\\text{cầu}} = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi \\times 3^3 = \\frac{4}{3}\\pi \\times 27 = 36\\pi\\text{ (cm}^3\\text{)}',
            explanation: 'Thể tích viên bi cầu là 36π cm³.'
          },
          {
            stepNumber: 2,
            title: 'Viết công thức thể tích khối nước dâng lên (hình trụ)',
            latex: 'V_{\\text{dâng}} = \\pi r^2 \\cdot \\Delta h = \\pi \\times 6^2 \\cdot \\Delta h = 36\\pi \\cdot \\Delta h',
            explanation: 'Phần nước dâng lên có dạng hình trụ đáy bán kính r = 6 cm và chiều cao Δh.'
          },
          {
            stepNumber: 3,
            title: 'Cân bằng thể tích theo nguyên lý Archimedes',
            latex: 'V_{\\text{dâng}} = V_{\\text{cầu}} \\implies 36\\pi \\cdot \\Delta h = 36\\pi \\implies \\Delta h = 1\\text{ (cm)}',
            explanation: 'Thể tích nước dâng lên bằng đúng thể tích vật thể bị chìm.'
          }
        ],
        finalResultLatex: '\\Delta h = 1\\text{ cm}',
        tips: 'Dạng bài toán Archimedes này thường xuyên xuất hiện trong câu cuối phân loại điểm 9-10 của đề thi tuyển sinh Lớp 10.'
      }
    ],
    quickQuiz: [
      {
        id: 'qq-sph-1',
        type: 'multiple_choice',
        question: 'Diện tích mặt cầu bán kính R bằng bao nhiêu lần diện tích hình tròn lớn?',
        options: ['2 lần', '3 lần', '4 lần', '8 lần'],
        correctOptionIndex: 2,
        explanation: 'S_mặt cầu = 4πR² = 4 × (πR²) = 4 lần diện tích hình tròn lớn.',
        hint: 'S = 4πR².',
        pointsXp: 20
      },
      {
        id: 'qq-sph-2',
        type: 'numeric',
        question: 'Một hình cầu có bán kính R = 3 cm. Thể tích của khối cầu đó là bao nhiêu π cm³?',
        expectedNumber: 36,
        tolerance: 0.1,
        explanation: 'V = (4/3) · π · 3³ = (4/3) · π · 27 = 36π (cm³). Bạn nhập hệ số: 36.',
        hint: 'Tính (4/3) × 27.',
        pointsXp: 25
      },
      {
        id: 'qq-sph-3',
        type: 'true_false',
        question: 'Mọi mặt phẳng cắt mặt cầu luôn tạo ra thiết diện là một hình tròn.',
        isTrue: true,
        explanation: 'Đúng! Mọi mặt phẳng cắt mặt cầu đều có giao tuyến là một đường tròn (nếu qua tâm thì là đường tròn lớn, nếu không qua tâm thì là đường tròn nhỏ).',
        hint: 'Hãy tưởng tượng việc dùng dao cắt ngang quả cam.',
        pointsXp: 20
      }
    ]
  }
};
