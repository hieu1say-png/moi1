/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Lessons & Curriculum Mock Data
 */

import { Lesson } from '../types/dataArchitecture';

export const LESSONS_MOCK_DATA: Lesson[] = [
  // ----------------------------------------------------
  // Cylinder Lessons
  // ----------------------------------------------------
  {
    id: 'lesson-cyl-01',
    shapeId: 'cylinder',
    title: 'Bài 1: Hình Trụ – Diện Tích Xung Quanh & Toàn Phần',
    subtitle: 'Khám phá sự hình thành hình trụ và công thức diện tích xung quanh',
    chapter: 'Chương IV: Hình Trụ – Hình Nón – Hình Cầu',
    order: 1,
    estimatedDurationMinutes: 25,
    description:
      'Tìm hiểu định nghĩa hình trụ tròn xoay, các yếu tố bán kính đáy r, chiều cao h, đường sinh l và công thức tính diện tích xung quanh Sxq = 2πrh.',
    learningObjectives: [
      'Nhận biết hình trụ khi quay hình chữ nhật quanh một cạnh.',
      'Chỉ ra tâm đáy, bán kính r, chiều cao h và đường sinh l trên mô hình.',
      'Áp dụng công thức Sxq = 2πrh và Stp = 2πrh + 2πr² để tính toán chính xác.'
    ],
    keyFormulaIds: ['cyl-formula-sxq', 'cyl-formula-stp'],
    sections: [
      {
        id: 'sec-cyl-1-1',
        order: 1,
        title: '1. Khái niệm hình trụ tròn xoay',
        type: 'theory',
        contentMarkdown:
          'Khi quay hình chữ nhật $O\'ABO$ một vòng quanh cạnh $OO\'$ cố định thì ta được một **hình trụ**.\n- Hai cạnh $O\'A$ và $OB$ quét nên hai đáy của hình trụ là hai hình tròn bằng nhau $(O\'; O\'A)$ và $(O; OB)$.\n- Cạnh $AB$ quét nên mặt xung quanh của hình trụ. Mỗi vị trí của $AB$ khi quay là một **đường sinh**.\n- Chiều cao: $h = O\'O$.\n- Bán kính đáy: $R = OB = O\'A$.\n- Đường sinh: $l = AB = h$.'
      },
      {
        id: 'sec-cyl-1-2',
        order: 2,
        title: '2. Khám phá mô hình 3D tương tác',
        type: 'interactive_3d'
      },
      {
        id: 'sec-cyl-1-3',
        order: 3,
        title: '3. Công thức tính diện tích xung quanh & toàn phần',
        type: 'theory',
        featuredFormulaIds: ['cyl-formula-sxq', 'cyl-formula-stp']
      },
      {
        id: 'sec-cyl-1-4',
        order: 4,
        title: '4. Kiểm tra hiểu bài nhanh',
        type: 'check_understanding'
      }
    ],
    nextLessonId: 'lesson-cyl-02'
  },
  {
    id: 'lesson-cyl-02',
    shapeId: 'cylinder',
    title: 'Bài 2: Thể Tích Khối Trụ & Bài Toán Thực Tế',
    subtitle: 'Xác định dung tích chứa của các vật thể hình trụ trong đời sống',
    chapter: 'Chương IV: Hình Trụ – Hình Nón – Hình Cầu',
    order: 2,
    estimatedDurationMinutes: 30,
    description:
      'Nắm vững công thức V = πr²h và vận dụng giải các bài toán thực tế như tính dung tích lon sữa, thùng phi chứa xăng dầu, bể nước hình trụ.',
    learningObjectives: [
      'Giải thích công thức V = S_đáy · h = πr²h.',
      'Biết chuyển đổi đơn vị thể tích (lít, dm³, m³, cm³).',
      'Giải bài toán thực tế thi tuyển sinh vào lớp 10.'
    ],
    keyFormulaIds: ['cyl-formula-v'],
    prerequisites: ['lesson-cyl-01'],
    sections: [
      {
        id: 'sec-cyl-2-1',
        order: 1,
        title: '1. Xây dựng công thức tính thể tích khối trụ',
        type: 'theory'
      },
      {
        id: 'sec-cyl-2-2',
        order: 2,
        title: '2. Ví dụ thực tế: Thùng phi chứa dầu 200 lít',
        type: 'examples'
      },
      {
        id: 'sec-cyl-2-3',
        order: 3,
        title: '3. Tổng kết phương pháp giải',
        type: 'summary'
      }
    ],
    nextLessonId: 'lesson-cone-01'
  },

  // ----------------------------------------------------
  // Cone Lessons
  // ----------------------------------------------------
  {
    id: 'lesson-cone-01',
    shapeId: 'cone',
    title: 'Bài 3: Hình Nón – Đường Sinh, Chiều Cao & Diện Tích Xung Quanh',
    subtitle: 'Khám phá hình nón tròn xoay và hệ thức liên hệ l² = h² + r²',
    chapter: 'Chương IV: Hình Trụ – Hình Nón – Hình Cầu',
    order: 3,
    estimatedDurationMinutes: 35,
    description:
      'Tìm hiểu hình nón tạo thành từ tam giác vuông quay quanh một cạnh góc vuông, định lý Pythagore trong tam giác vuông tạo bởi r, h, l và công thức Sxq = πrl.',
    learningObjectives: [
      'Nhận dạng hình nón từ tam giác vuông quay.',
      'Tính đường sinh l từ r và h bằng định lý Pythagore: l = √(h² + r²).',
      'Tính diện tích xung quanh Sxq = πrl và diện tích lá phủ nón.'
    ],
    keyFormulaIds: ['cone-formula-pythagoras', 'cone-formula-sxq', 'cone-formula-stp'],
    sections: [
      {
        id: 'sec-cone-1-1',
        order: 1,
        title: '1. Khái niệm hình nón và các yếu tố đỉnh, đáy, trục, đường sinh',
        type: 'theory'
      },
      {
        id: 'sec-cone-1-2',
        order: 2,
        title: '2. Mô hình 3D tương tác hình nón & khai triển mặt xung quanh',
        type: 'interactive_3d'
      },
      {
        id: 'sec-cone-1-3',
        order: 3,
        title: '3. Công thức diện tích xung quanh Sxq = πrl',
        type: 'theory'
      }
    ],
    nextLessonId: 'lesson-cone-02'
  },
  {
    id: 'lesson-cone-02',
    shapeId: 'cone',
    title: 'Bài 4: Thể Tích Khối Nón & Thí Nghiệm Rót Nước',
    subtitle: 'Chứng minh trực quan V_nón = (1/3) V_trụ = (1/3)πr²h',
    chapter: 'Chương IV: Hình Trụ – Hình Nón – Hình Cầu',
    order: 4,
    estimatedDurationMinutes: 30,
    description:
      'Thực hiện thí nghiệm rót nước từ hình nón vào hình trụ có cùng đáy và chiều cao, từ đó xây dựng công thức V = (1/3)πr²h.',
    learningObjectives: [
      'Giải thích lý do có hệ số 1/3 trong công thức thể tích nón.',
      'So sánh thể tích khối nón và khối trụ có cùng đáy và chiều cao.',
      'Áp dụng giải bài toán tính lượng kem trong que kem ốc quế.'
    ],
    keyFormulaIds: ['cone-formula-v'],
    prerequisites: ['lesson-cone-01'],
    sections: [
      {
        id: 'sec-cone-2-1',
        order: 1,
        title: '1. Thí nghiệm rót nước 3 lần',
        type: 'interactive_3d'
      },
      {
        id: 'sec-cone-2-2',
        order: 2,
        title: '2. Công thức thể tích khối nón',
        type: 'theory'
      }
    ],
    nextLessonId: 'lesson-sph-01'
  },

  // ----------------------------------------------------
  // Sphere Lessons
  // ----------------------------------------------------
  {
    id: 'lesson-sph-01',
    shapeId: 'sphere',
    title: 'Bài 5: Hình Cầu – Diện Tích Mặt Cầu & Thể Tích Khối Cầu',
    subtitle: 'Nghiên cứu hình học khối cầu, diện tích S = 4πR² và thể tích V = (4/3)πR³',
    chapter: 'Chương IV: Hình Trụ – Hình Nón – Hình Cầu',
    order: 5,
    estimatedDurationMinutes: 35,
    description:
      'Khái niệm nửa hình tròn quay quanh đường kính tạo thành mặt cầu và hình cầu. Công thức tính diện tích mặt cầu S = 4πR² và thể tích khối cầu V = (4/3)πR³.',
    learningObjectives: [
      'Nhận biết tâm O, bán kính R, đường kính d và đường tròn lớn.',
      'Ghi nhớ mẹo: Diện tích mặt cầu bằng 4 lần diện tích hình tròn lớn (S = 4πR²).',
      'Vận dụng công thức V = (4/3)πR³ giải các bài toán thể tích bóng đá, Trái Đất, giọt nước.'
    ],
    keyFormulaIds: ['sph-formula-s', 'sph-formula-v'],
    sections: [
      {
        id: 'sec-sph-1-1',
        order: 1,
        title: '1. Định nghĩa mặt cầu và hình cầu',
        type: 'theory'
      },
      {
        id: 'sec-sph-1-2',
        order: 2,
        title: '2. Tương tác 3D cắt thiết diện qua tâm',
        type: 'interactive_3d'
      },
      {
        id: 'sec-sph-1-3',
        order: 3,
        title: '3. Công thức tính diện tích và thể tích khối cầu',
        type: 'theory'
      }
    ]
  }
];

export const ALL_LESSONS = LESSONS_MOCK_DATA;
