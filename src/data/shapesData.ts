/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Comprehensive Shape Mock Data
 * Cylinder (Hình Trụ), Cone (Hình Nón), Sphere (Hình Cầu)
 */

import { Shape } from '../types/dataArchitecture';

export const SHAPES_MOCK_DATA: Record<string, Shape> = {
  cylinder: {
    id: 'cylinder',
    name: 'Hình Trụ',
    vietnameseName: 'Hình Trụ',
    englishName: 'Cylinder',
    colorTheme: {
      primary: '#2563eb', // Blue-600
      secondary: '#3b82f6', // Blue-500
      accent: '#60a5fa', // Blue-400
      bgLight: '#eff6ff', // Blue-50
      bgSubtle: '#dbeafe', // Blue-100
      border: '#bfdbfe', // Blue-200
      borderSubtle: '#93c5fd', // Blue-300
      badgeBg: '#dbeafe',
      textDark: '#1e3a8a', // Blue-900
      gradient: 'from-blue-600 via-blue-500 to-indigo-600'
    },
    description:
      'Khi quay hình chữ nhật O\'ABO một vòng quanh cạnh OO\' cố định thì ta được một hình trụ.',
    badgeTag: 'Toán 9 - Kết Nối Tri Thức',
    iconName: 'Cylinder',
    realWorldPreview: 'Hộp sữa đặc, lon nước ngọt, thùng phuy chứa dầu, cột trụ bê tông, đường ống nước',
    learningObjectives: [
      'Hiểu rõ khái niệm mặt trụ, hình trụ, đáy, chiều cao, đường sinh và trục của hình trụ.',
      'Nắm vững và vận dụng thành thạo công thức tính diện tích xung quanh (Sxq = 2πrh) và diện tích toàn phần (Stp).',
      'Hiểu và vận dụng công thức tính thể tích hình trụ (V = πr²h) vào các bài toán thực tế.',
      'Nhận biết các mặt cắt (thiết diện) song song với trục hoặc song song với đáy.'
    ],
    elements: [
      {
        label: 'Bán kính đáy',
        symbol: 'r',
        unit: 'cm / m',
        description: 'Khoảng cách từ tâm O đến bất kỳ điểm nào trên đường tròn đáy'
      },
      {
        label: 'Chiều cao',
        symbol: 'h',
        unit: 'cm / m',
        description: 'Khoảng cách vuông góc giữa hai mặt phẳng chứa hai đáy'
      },
      {
        label: 'Đường sinh',
        symbol: 'l',
        unit: 'cm / m',
        description: 'Đoạn thẳng quét tạo nên mặt xung quanh, với hình trụ l = h'
      },
      {
        label: 'Đường kính đáy',
        symbol: 'd',
        unit: 'cm / m',
        description: 'Đoạn thẳng đi qua tâm nối hai điểm trên đường tròn đáy, d = 2r'
      },
      {
        label: 'Trục hình trụ',
        symbol: 'OO\'',
        unit: '-',
        description: 'Đường thẳng nối tâm của hai đáy tròn'
      }
    ],
    formulas: [
      {
        id: 'cyl-formula-sxq',
        name: 'Diện tích xung quanh',
        vietnameseName: 'Diện tích xung quanh hình trụ',
        latex: 'S_{xq} = 2\\pi r h = \\pi d h',
        explanation: 'Bằng chu vi đường tròn đáy nhân với chiều cao của hình trụ.',
        standardGrade9ExamFrequency: 'very_high',
        variables: [
          { symbol: 'r', name: 'Bán kính đường tròn đáy', unit: 'cm/m', description: 'Bán kính đáy' },
          { symbol: 'h', name: 'Chiều cao hình trụ', unit: 'cm/m', description: 'Khoảng cách 2 đáy' },
          { symbol: '\\pi', name: 'Số Pi', unit: '-', description: 'Hằng số xấp xỉ 3.14159' }
        ],
        derivedFormulas: [
          { name: 'Tính bán kính đáy r từ Sxq', latex: 'r = \\frac{S_{xq}}{2\\pi h}', notes: 'Khi biết Sxq và chiều cao' },
          { name: 'Tính chiều cao h từ Sxq', latex: 'h = \\frac{S_{xq}}{2\\pi r}', notes: 'Khi biết Sxq và bán kính' }
        ]
      },
      {
        id: 'cyl-formula-stp',
        name: 'Diện tích toàn phần',
        vietnameseName: 'Diện tích toàn phần hình trụ',
        latex: 'S_{tp} = 2\\pi r h + 2\\pi r^2 = 2\\pi r(h + r)',
        explanation: 'Bằng tổng diện tích xung quanh cộng với diện tích hai đáy tròn.',
        standardGrade9ExamFrequency: 'very_high',
        variables: [
          { symbol: 'S_{xq}', name: 'Diện tích xung quanh', unit: 'cm²', description: '2πrh' },
          { symbol: 'S_{đáy}', name: 'Diện tích một đáy tròn', unit: 'cm²', description: 'πr²' }
        ],
        derivedFormulas: [
          { name: 'Phương trình bậc 2 tìm r từ Stp', latex: 'r^2 + hr - \\frac{S_{tp}}{2\\pi} = 0', notes: 'Giải phương trình bậc hai tìm r > 0' }
        ]
      },
      {
        id: 'cyl-formula-v',
        name: 'Thể tích hình trụ',
        vietnameseName: 'Thể tích khối trụ tròn xoay',
        latex: 'V = \\pi r^2 h = S_{\\text{đáy}} \\cdot h',
        explanation: 'Bằng diện tích đáy tròn nhân với chiều cao của hình trụ.',
        standardGrade9ExamFrequency: 'very_high',
        variables: [
          { symbol: 'r', name: 'Bán kính đáy', unit: 'cm/m', description: 'Bán kính đáy' },
          { symbol: 'h', name: 'Chiều cao khối trụ', unit: 'cm/m', description: 'Khoảng cách 2 đáy' }
        ],
        derivedFormulas: [
          { name: 'Tính bán kính đáy r từ V', latex: 'r = \\sqrt{\\frac{V}{\\pi h}}', notes: 'Căn bậc hai thể tích chia chiều cao' },
          { name: 'Tính chiều cao h từ V', latex: 'h = \\frac{V}{\\pi r^2}', notes: 'Thể tích chia diện tích đáy' }
        ]
      }
    ]
  },

  cone: {
    id: 'cone',
    name: 'Hình Nón',
    vietnameseName: 'Hình Nón',
    englishName: 'Cone',
    colorTheme: {
      primary: '#ea580c', // Orange-600
      secondary: '#f97316', // Orange-500
      accent: '#fb923c', // Orange-400
      bgLight: '#fff7ed', // Orange-50
      bgSubtle: '#ffedd5', // Orange-100
      border: '#fed7aa', // Orange-200
      borderSubtle: '#fdba74', // Orange-300
      badgeBg: '#ffedd5',
      textDark: '#7c2d12', // Orange-900
      gradient: 'from-amber-500 via-orange-500 to-rose-600'
    },
    description:
      'Hình nón được tạo thành khi quay một tam giác vuông một vòng quanh một cạnh góc vuông cố định. Mặt đáy là một hình tròn và đỉnh là điểm đối diện mặt đáy.',
    badgeTag: 'Toán 9 - Bài 2 Chương IV',
    iconName: 'Cone',
    realWorldPreview: 'Chiếc nón lá truyền thống Việt Nam, cây kem ốc quế, cọc tiêu giao thông, tháp chuông chóp nón',
    learningObjectives: [
      'Nắm vững mối quan hệ hình học cơ bản giữa bán kính đáy (r), chiều cao (h) và đường sinh (l) qua định lý Pythagore: l² = r² + h².',
      'Vận dụng chính xác công thức diện tích xung quanh (Sxq = πrl) và diện tích toàn phần (Stp = πrl + πr²).',
      'Hiểu và chứng minh tại sao thể tích hình nón bằng đúng 1/3 thể tích hình trụ có cùng đáy và chiều cao: V = (1/3)πr²h.',
      'Giải quyết các bài toán cắt hình nón bằng mặt phẳng song song với đáy (hình nón cụt).'
    ],
    elements: [
      {
        label: 'Bán kính đáy',
        symbol: 'r',
        unit: 'cm / m',
        description: 'Bán kính hình tròn đáy của hình nón'
      },
      {
        label: 'Chiều cao',
        symbol: 'h',
        unit: 'cm / m',
        description: 'Khoảng cách vuông góc từ đỉnh S đến tâm đáy O'
      },
      {
        label: 'Đường sinh',
        symbol: 'l',
        unit: 'cm / m',
        description: 'Độ dài đoạn thẳng từ đỉnh nón đến một điểm trên đường tròn đáy, l = √(h² + r²)'
      },
      {
        label: 'Đỉnh hình nón',
        symbol: 'S',
        unit: '-',
        description: 'Điểm cao nhất đối diện với mặt đáy tròn'
      },
      {
        label: 'Góc ở đỉnh',
        symbol: '2α',
        unit: 'độ',
        description: 'Góc tạo bởi hai đường sinh nằm trên thiết diện qua trục'
      }
    ],
    formulas: [
      {
        id: 'cone-formula-pythagoras',
        name: 'Mối liên hệ đường sinh',
        vietnameseName: 'Hệ thức Pythagore trong hình nón',
        latex: 'l^2 = h^2 + r^2 \\implies l = \\sqrt{h^2 + r^2}',
        explanation: 'Tam giác vuông SOA vuông tại O có hai cạnh góc vuông là r, h và cạnh huyền là đường sinh l.',
        standardGrade9ExamFrequency: 'very_high',
        variables: [
          { symbol: 'l', name: 'Đường sinh', unit: 'cm/m', description: 'Cạnh huyền tam giác vuông quay' },
          { symbol: 'h', name: 'Chiều cao', unit: 'cm/m', description: 'Trục nón' },
          { symbol: 'r', name: 'Bán kính đáy', unit: 'cm/m', description: 'Bán kính đáy' }
        ],
        derivedFormulas: [
          { name: 'Tính chiều cao h', latex: 'h = \\sqrt{l^2 - r^2}', notes: 'Khi biết đường sinh và bán kính' },
          { name: 'Tính bán kính đáy r', latex: 'r = \\sqrt{l^2 - h^2}', notes: 'Khi biết đường sinh và chiều cao' }
        ]
      },
      {
        id: 'cone-formula-sxq',
        name: 'Diện tích xung quanh',
        vietnameseName: 'Diện tích xung quanh hình nón',
        latex: 'S_{xq} = \\pi r l',
        explanation: 'Bằng nửa tích của chu vi đáy với độ dài đường sinh của hình nón (khi khai triển thành hình quạt tròn).',
        standardGrade9ExamFrequency: 'very_high',
        variables: [
          { symbol: 'r', name: 'Bán kính đáy', unit: 'cm/m', description: 'Bán kính đường tròn đáy' },
          { symbol: 'l', name: 'Đường sinh', unit: 'cm/m', description: 'Độ dài đường sinh' }
        ],
        derivedFormulas: [
          { name: 'Góc ở tâm của hình quạt tròn khai triển', latex: '\\alpha = \\frac{r}{l} \\cdot 360^\\circ', notes: 'Góc tạo bởi mặt xung quanh khi trải phẳng' }
        ]
      },
      {
        id: 'cone-formula-stp',
        name: 'Diện tích toàn phần',
        vietnameseName: 'Diện tích toàn phần hình nón',
        latex: 'S_{tp} = \\pi r l + \\pi r^2 = \\pi r(l + r)',
        explanation: 'Bằng tổng diện tích xung quanh cộng với diện tích một đáy tròn.',
        standardGrade9ExamFrequency: 'high',
        variables: [
          { symbol: 'S_{xq}', name: 'Diện tích xung quanh', unit: 'cm²', description: 'πrl' },
          { symbol: 'S_{đáy}', name: 'Diện tích đáy', unit: 'cm²', description: 'πr²' }
        ]
      },
      {
        id: 'cone-formula-v',
        name: 'Thể tích hình nón',
        vietnameseName: 'Thể tích khối nón tròn xoay',
        latex: 'V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} S_{\\text{đáy}} \\cdot h',
        explanation: 'Bằng một phần ba diện tích đáy nhân với chiều cao (bằng 1/3 thể tích khối trụ cùng đáy và chiều cao).',
        standardGrade9ExamFrequency: 'very_high',
        variables: [
          { symbol: 'r', name: 'Bán kính đáy', unit: 'cm/m', description: 'Bán kính đáy' },
          { symbol: 'h', name: 'Chiều cao', unit: 'cm/m', description: 'Khoảng cách từ đỉnh đến đáy' }
        ],
        derivedFormulas: [
          { name: 'Tính chiều cao h từ thể tích', latex: 'h = \\frac{3V}{\\pi r^2}', notes: 'Gấp 3 lần thể tích chia diện tích đáy' },
          { name: 'Tính bán kính r từ thể tích', latex: 'r = \\sqrt{\\frac{3V}{\\pi h}}', notes: 'Căn bậc 2 của 3V / πh' }
        ]
      }
    ]
  },

  sphere: {
    id: 'sphere',
    name: 'Hình Cầu',
    vietnameseName: 'Hình Cầu',
    englishName: 'Sphere',
    colorTheme: {
      primary: '#16a34a', // Emerald/Green-600
      secondary: '#22c55e', // Green-500
      accent: '#4ade80', // Green-400
      bgLight: '#f0fdf4', // Green-50
      bgSubtle: '#dcfce7', // Green-100
      border: '#bbf7d0', // Green-200
      borderSubtle: '#86efac', // Green-300
      badgeBg: '#dcfce7',
      textDark: '#14532d', // Green-900
      gradient: 'from-emerald-600 via-green-500 to-teal-600'
    },
    description:
      'Hình cầu được tạo thành khi quay nửa hình tròn tâm O bán kính R một vòng quanh đường kính cố định. Mặt cầu là tập hợp các điểm trong không gian cách tâm O một khoảng bằng R.',
    badgeTag: 'Toán 9 - Bài 3 Chương IV',
    iconName: 'Globe',
    realWorldPreview: 'Quả địa cầu, trái bóng đá FIFA, bình chứa khí nén cầu, bong bóng xà phòng, các hành tinh',
    learningObjectives: [
      'Hiểu rõ định nghĩa mặt cầu, hình cầu, tâm O, bán kính R, đường kính d = 2R.',
      'Ghi nhớ và áp dụng công thức tính diện tích mặt cầu: S = 4πR² = πd² (bằng 4 lần diện tích hình tròn lớn).',
      'Ghi nhớ và áp dụng công thức tính thể tích khối cầu: V = (4/3)πR³ = (1/6)πd³.',
      'Vận dụng vào các bài toán tính thể tích vật thể phối hợp (quả cầu thả vào bình trụ, nửa quả cầu úp lên hình nón).'
    ],
    elements: [
      {
        label: 'Tâm hình cầu',
        symbol: 'O',
        unit: '-',
        description: 'Điểm cố định đối xứng trung tâm của toàn bộ khối cầu'
      },
      {
        label: 'Bán kính',
        symbol: 'R',
        unit: 'cm / m',
        description: 'Khoảng cách từ tâm O đến mọi điểm trên mặt cầu'
      },
      {
        label: 'Đường kính',
        symbol: 'd',
        unit: 'cm / m',
        description: 'Đoạn thẳng đi qua tâm nối hai điểm trên mặt cầu, d = 2R'
      },
      {
        label: 'Đường tròn lớn',
        symbol: 'C',
        unit: 'cm / m',
        description: 'Thiết diện cắt qua tâm O của mặt cầu (chu vi C = 2πR)'
      }
    ],
    formulas: [
      {
        id: 'sph-formula-s',
        name: 'Diện tích mặt cầu',
        vietnameseName: 'Diện tích mặt cầu',
        latex: 'S = 4\\pi R^2 = \\pi d^2',
        explanation: 'Diện tích mặt cầu bằng 4 lần diện tích của hình tròn lớn (cắt qua tâm).',
        standardGrade9ExamFrequency: 'very_high',
        variables: [
          { symbol: 'R', name: 'Bán kính mặt cầu', unit: 'cm/m', description: 'Khoảng cách từ tâm O đến mặt cầu' },
          { symbol: 'd', name: 'Đường kính', unit: 'cm/m', description: 'd = 2R' }
        ],
        derivedFormulas: [
          { name: 'Tính bán kính R từ diện tích S', latex: 'R = \\sqrt{\\frac{S}{4\\pi}} = \\frac{1}{2}\\sqrt{\\frac{S}{\\pi}}', notes: 'Căn bậc 2 diện tích chia 4π' },
          { name: 'Diện tích nửa mặt cầu (bán cầu)', latex: 'S_{\\text{bán cầu}} = 2\\pi R^2', notes: 'Chỉ tính mặt cong (chưa gồm đáy tròn)' }
        ]
      },
      {
        id: 'sph-formula-v',
        name: 'Thể tích khối cầu',
        vietnameseName: 'Thể tích khối cầu',
        latex: 'V = \\frac{4}{3}\\pi R^3 = \\frac{1}{6}\\pi d^3',
        explanation: 'Thể tích của khối cầu bán kính R tỉ lệ với lũy thừa bậc ba của bán kính.',
        standardGrade9ExamFrequency: 'very_high',
        variables: [
          { symbol: 'R', name: 'Bán kính khối cầu', unit: 'cm/m', description: 'Khoảng cách từ tâm' },
          { symbol: 'd', name: 'Đường kính khối cầu', unit: 'cm/m', description: 'd = 2R' }
        ],
        derivedFormulas: [
          { name: 'Tính bán kính R từ thể tích V', latex: 'R = \\sqrt[3]{\\frac{3V}{4\\pi}}', notes: 'Căn bậc ba của (3V / 4π)' },
          { name: 'Thể tích nửa khối cầu', latex: 'V_{\\text{nửa cầu}} = \\frac{2}{3}\\pi R^3', notes: 'Bằng 1/2 thể tích cả khối cầu' }
        ]
      }
    ]
  }
};
