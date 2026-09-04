/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Real World Applications & Modeling Mock Data
 */

import { RealWorldProblem } from '../types/dataArchitecture';

export const MOCK_REAL_WORLD_PROBLEMS: RealWorldProblem[] = [
  {
    id: 'rw-cyl-01',
    shapeId: 'cylinder',
    title: 'Lon Nước Ngọt & Tối Ưu Vật Liệu Nhôm',
    subtitle: 'Ứng dụng trong sản xuất công nghiệp và bao bì kim loại',
    category: 'Sản xuất bao bì & Kinh tế',
    description:
      'Một nhà máy sản xuất lon nước ngọt dung tích 330 ml (330 cm³) có đáy hình tròn. Hãy tính diện tích vật liệu nhôm cần dùng để chế tạo vỏ lon khi bán kính r = 3.25 cm.',
    imagePlaceholder: '🥫',
    practicalSignificance:
      'Trong công nghiệp, việc tối ưu tỷ lệ giữa chiều cao và bán kính giúp tiết kiệm hàng triệu USD chi phí nhôm mỗi năm cho các hãng nước ngọt toàn cầu.',
    mathProblem: {
      statement:
        'Một lon nước ngọt hình trụ có thể tích V = 330 cm³ và bán kính đáy r = 3.25 cm. Hãy tính diện tích toàn phần của vỏ lon (bỏ qua mép gấp nắp lon, lấy π ≈ 3.1416).',
      given: [
        'Thể tích lon V = 330 cm³',
        'Bán kính đáy r = 3.25 cm',
        'Công thức thể tích: V = πr²h',
        'Công thức diện tích toàn phần: Stp = 2πrh + 2πr²'
      ],
      solutionSteps: [
        {
          step: 1,
          title: 'Tính diện tích một mặt đáy của lon',
          text: 'Áp dụng công thức diện tích đáy hình tròn:',
          latex: 'S_{\\text{đáy}} = \\pi r^2 = 3.1416 \\times (3.25)^2 \\approx 33.183\\text{ cm}^2'
        },
        {
          step: 2,
          title: 'Tính chiều cao h của vỏ lon',
          text: 'Từ công thức thể tích V = S_đáy · h, ta rút ra chiều cao h:',
          latex: 'h = \\frac{V}{\\pi r^2} = \\frac{330}{33.183} \\approx 9.945\\text{ cm}'
        },
        {
          step: 3,
          title: 'Tính diện tích xung quanh của vỏ lon',
          text: 'Áp dụng công thức diện tích xung quanh:',
          latex: 'S_{xq} = 2\\pi r h = 2 \\times 3.1416 \\times 3.25 \\times 9.945 \\approx 203.07\\text{ cm}^2'
        },
        {
          step: 4,
          title: 'Tính tổng diện tích nhôm (diện tích toàn phần)',
          text: 'Tổng diện tích vỏ nhôm cần dùng gồm thân và 2 nắp đáy:',
          latex: 'S_{tp} = S_{xq} + 2S_{\\text{đáy}} = 203.07 + 2(33.183) \\approx 269.44\\text{ cm}^2'
        }
      ],
      result: '269.44 cm²',
      practicalInsight: 'Lon nước ngọt chuẩn thế giới thường có chiều cao gần gấp đôi bán kính đường kính đáy để dễ cầm nắm và xếp vừa vào tủ lạnh.'
    }
  },
  {
    id: 'rw-cone-01',
    shapeId: 'cone',
    title: 'Nón Lá Huế & Nghệ Thuật Đan Lát Truyền Thống',
    subtitle: 'Ứng dụng trong văn hóa và thủ công mỹ nghệ Việt Nam',
    category: 'Văn hóa & Thủ công mỹ nghệ',
    description:
      'Nón bài thơ xứ Huế có dạng hình nón với đường kính đáy 40 cm và chiều cao 30 cm. Cần tính diện tích lá nón tối thiểu để phủ kín mặt xung quanh của chiếc nón.',
    imagePlaceholder: '👒',
    practicalSignificance:
      'Nghệ nhân làng nón Tây Hồ (Huế) tính toán độ nghiêng và chiều dài đường sinh để khi xếp 16 vành nón, lá cọ phủ đều không bị nhăn rách.',
    mathProblem: {
      statement:
        'Một chiếc nón lá hình nón có đường kính đáy d = 40 cm (bán kính r = 20 cm) và chiều cao h = 30 cm. Người ta phủ 2 lớp lá nón lên mặt xung quanh. Tính diện tích lá nón cần dùng (lấy π ≈ 3.14).',
      given: [
        'Đường kính đáy d = 40 cm ⇒ Bán kính đáy r = 20 cm',
        'Chiều cao nón h = 30 cm',
        'Số lớp lá phủ: 2 lớp'
      ],
      solutionSteps: [
        {
          step: 1,
          title: 'Tính độ dài đường sinh l của chiếc nón',
          text: 'Áp dụng định lý Pythagore trong tam giác vuông tạo bởi h, r, l:',
          latex: 'l = \\sqrt{h^2 + r^2} = \\sqrt{30^2 + 20^2} = \\sqrt{900 + 400} = \\sqrt{1300} \\approx 36.06\\text{ cm}'
        },
        {
          step: 2,
          title: 'Tính diện tích xung quanh 1 lớp nón',
          text: 'Áp dụng công thức Sxq = πrl:',
          latex: 'S_{xq} = 3.14 \\times 20 \\times 36.06 \\approx 2264.57\\text{ cm}^2'
        },
        {
          step: 3,
          title: 'Tính tổng diện tích lá cho 2 lớp phủ',
          text: 'Nhân đôi diện tích xung quanh:',
          latex: 'S_{\\text{tổng lá}} = 2 \\times 2264.57 \\approx 4529.14\\text{ cm}^2'
        }
      ],
      result: '4529.14 cm² (khoảng 0.453 m² lá)',
      practicalInsight: 'Nhờ hình dạng nón, nước mưa dễ dàng chảy dốc xuống mà không thấm ướt vào đầu người đội.'
    }
  },
  {
    id: 'rw-sph-01',
    shapeId: 'sphere',
    title: 'Trái Đất & Quỹ Đạo Vệ Tinh Viễn Thông Vinasat',
    subtitle: 'Ứng dụng trong thiên văn học và kỹ thuật hàng không vũ trụ',
    category: 'Thiên văn & Vũ trụ',
    description:
      'Trái Đất có dạng hình cầu với bán kính trung bình R ≈ 6371 km. Vệ tinh viễn thông Vinasat-1 bay ở độ cao 35,786 km so với mặt đất trên quỹ đạo địa tĩnh.',
    imagePlaceholder: '🌍',
    practicalSignificance:
      'Tính toán diện tích bề mặt Trái Đất và thể tích khí quyển là bài toán cơ sở trong dự báo thời tiết, viễn thông và định vị GPS toàn cầu.',
    mathProblem: {
      statement:
        'Xem Trái Đất là một hình cầu có bán kính R = 6371 km. Tính diện tích bề mặt Trái Đất và thể tích của Trái Đất (lấy π ≈ 3.14159).',
      given: [
        'Bán kính Trái Đất R = 6371 km',
        'Công thức diện tích mặt cầu: S = 4πR²',
        'Công thức thể tích khối cầu: V = (4/3)πR³'
      ],
      solutionSteps: [
        {
          step: 1,
          title: 'Tính diện tích bề mặt Trái Đất',
          text: 'Áp dụng công thức diện tích mặt cầu:',
          latex: 'S = 4\\pi R^2 = 4 \\times 3.14159 \\times (6371)^2 \\approx 510,064,472\\text{ km}^2'
        },
        {
          step: 2,
          title: 'Tính thể tích khối Trái Đất',
          text: 'Áp dụng công thức thể tích khối cầu:',
          latex: 'V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3} \\times 3.14159 \\times (6371)^3 \\approx 1.08321 \\times 10^{12}\\text{ km}^3'
        }
      ],
      result: 'Diện tích ≈ 510 triệu km² | Thể tích ≈ 1.083 nghìn tỷ km³',
      practicalInsight: 'Khoảng 71% diện tích mặt cầu Trái Đất được bao phủ bởi đại dương, tương đương ~361 triệu km².'
    }
  }
];
