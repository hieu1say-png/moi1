import { ShapeInfo, PracticeQuestion, RealWorldApplication, AchievementBadge } from '../types';

export const SHAPES_DATA: Record<string, ShapeInfo> = {
  cylinder: {
    id: 'cylinder',
    name: 'Cylinder',
    vietnameseName: 'Hình Trụ',
    description: 'Hình học tạo thành khi quay hình chữ nhật một vòng quanh một cạnh cố định.',
    color: 'from-blue-500 to-indigo-600',
    accentColor: 'text-blue-600 bg-blue-50 border-blue-200',
    badge: 'Toán 9 - Chương IV',
    iconName: 'Cylinder',
    elements: [
      { label: 'Bán kính đáy', symbol: 'r', unit: 'cm / m', description: 'Khoảng cách từ tâm đáy đến đường tròn đáy' },
      { label: 'Chiều cao', symbol: 'h', unit: 'cm / m', description: 'Khoảng cách giữa hai mặt phẳng đáy' },
      { label: 'Đường sinh', symbol: 'l', unit: 'cm / m', description: 'Đoạn thẳng song song với trục, l = h' },
      { label: 'Đường kính đáy', symbol: 'd', unit: 'cm / m', description: 'd = 2r' }
    ],
    formulas: [
      {
        name: 'Diện tích xung quanh',
        latex: 'S_{xq} = 2\\pi r h',
        explanation: 'Bằng chu vi đường tròn đáy nhân với chiều cao của hình trụ.',
        variables: ['r: bán kính đáy', 'h: chiều cao', '\\pi \\approx 3.14']
      },
      {
        name: 'Diện tích toàn phần',
        latex: 'S_{tp} = 2\\pi r h + 2\\pi r^2 = 2\\pi r(h + r)',
        explanation: 'Bằng tổng diện tích xung quanh và diện tích hai đáy tròn.',
        variables: ['S_{xq}: diện tích xung quanh', 'S_{đáy} = \\pi r^2']
      },
      {
        name: 'Thể tích hình trụ',
        latex: 'V = \\pi r^2 h = S_{\\text{đáy}} \\cdot h',
        explanation: 'Bằng diện tích một mặt đáy nhân với chiều cao.',
        variables: ['r: bán kính đáy', 'h: chiều cao']
      }
    ]
  },
  cone: {
    id: 'cone',
    name: 'Cone',
    vietnameseName: 'Hình Nón',
    description: 'Hình học tạo thành khi quay tam giác vuông một vòng quanh một cạnh góc vuông cố định.',
    color: 'from-amber-500 to-orange-600',
    accentColor: 'text-amber-600 bg-amber-50 border-amber-200',
    badge: 'Toán 9 - Chương IV',
    iconName: 'Cone',
    elements: [
      { label: 'Bán kính đáy', symbol: 'r', unit: 'cm / m', description: 'Bán kính hình tròn đáy của nón' },
      { label: 'Chiều cao', symbol: 'h', unit: 'cm / m', description: 'Khoảng cách từ đỉnh đến tâm hình tròn đáy' },
      { label: 'Đường sinh', symbol: 'l', unit: 'cm / m', description: 'Khoảng cách từ đỉnh đến một điểm trên đường tròn đáy, l = \\sqrt{h^2 + r^2}' },
      { label: 'Góc ở đỉnh', symbol: '2\\alpha', unit: 'độ', description: 'Góc tạo bởi 2 đường sinh đối diện' }
    ],
    formulas: [
      {
        name: 'Mối liên hệ đường sinh',
        latex: 'l^2 = h^2 + r^2 \\implies l = \\sqrt{h^2 + r^2}',
        explanation: 'Theo định lý Pythagore trong tam giác vuông tạo bởi trục, bán kính và đường sinh.',
        variables: ['l: đường sinh', 'h: chiều cao', 'r: bán kính đáy']
      },
      {
        name: 'Diện tích xung quanh',
        latex: 'S_{xq} = \\pi r l',
        explanation: 'Bằng nửa tích của chu vi đáy và độ dài đường sinh.',
        variables: ['r: bán kính đáy', 'l: đường sinh']
      },
      {
        name: 'Diện tích toàn phần',
        latex: 'S_{tp} = \\pi r l + \\pi r^2 = \\pi r (l + r)',
        explanation: 'Bằng tổng diện tích xung quanh và diện tích đáy hình tròn.',
        variables: ['S_{xq}: diện tích xung quanh', 'S_{đáy} = \\pi r^2']
      },
      {
        name: 'Thể tích hình nón',
        latex: 'V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} S_{\\text{đáy}} \\cdot h',
        explanation: 'Bằng một phần ba diện tích đáy nhân với chiều cao (bằng 1/3 thể tích hình trụ cùng đáy và chiều cao).',
        variables: ['r: bán kính đáy', 'h: chiều cao']
      }
    ]
  },
  sphere: {
    id: 'sphere',
    name: 'Sphere',
    vietnameseName: 'Hình Cầu',
    description: 'Tập hợp tất cả các điểm trong không gian cách một điểm O cố định một khoảng không đổi R.',
    color: 'from-emerald-500 to-teal-600',
    accentColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    badge: 'Toán 9 - Chương IV',
    iconName: 'Globe',
    elements: [
      { label: 'Tâm hình cầu', symbol: 'O', unit: '-', description: 'Điểm cố định ở chính giữa khối cầu' },
      { label: 'Bán kính', symbol: 'R', unit: 'cm / m', description: 'Khoảng cách từ tâm O đến mặt cầu' },
      { label: 'Đường kính', symbol: 'd', unit: 'cm / m', description: 'Đoạn thẳng qua tâm nối 2 điểm trên mặt cầu, d = 2R' },
      { label: 'Đường tròn lớn', symbol: 'C', unit: 'cm', description: 'Thiết diện cắt qua tâm mặt cầu' }
    ],
    formulas: [
      {
        name: 'Diện tích mặt cầu',
        latex: 'S = 4\\pi R^2 = \\pi d^2',
        explanation: 'Bằng 4 lần diện tích hình tròn lớn có cùng bán kính.',
        variables: ['R: bán kính cầu', 'd: đường kính', '\\pi \\approx 3.1416']
      },
      {
        name: 'Thể tích hình cầu',
        latex: 'V = \\frac{4}{3}\\pi R^3 = \\frac{1}{6}\\pi d^3',
        explanation: 'Thể tích của khối cầu bán kính R.',
        variables: ['R: bán kính cầu', 'd: đường kính']
      }
    ]
  }
};

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'p-cyl-1',
    shapeType: 'cylinder',
    difficulty: 'easy',
    title: 'Tính diện tích xung quanh hình trụ',
    question: 'Một hình trụ có bán kính đáy $r = 5\\text{ cm}$ và chiều cao $h = 10\\text{ cm}$. Diện tích xung quanh của hình trụ là bao nhiêu?',
    latexEquation: 'S_{xq} = 2\\pi r h',
    options: [
      '50\\pi \\text{ cm}^2',
      '100\\pi \\text{ cm}^2',
      '200\\pi \\text{ cm}^2',
      '250\\pi \\text{ cm}^2'
    ],
    correctOptionIndex: 1,
    hint: 'Áp dụng trực tiếp công thức $S_{xq} = 2\\pi rh$.',
    explanation: 'Thay số vào công thức: $S_{xq} = 2\\pi \\cdot 5 \\cdot 10 = 100\\pi \\text{ cm}^2$.',
    realWorldContext: 'Tính diện tích vỏ nhãn dán quanh lon sữa.'
  },
  {
    id: 'p-cyl-2',
    shapeType: 'cylinder',
    difficulty: 'medium',
    title: 'Tính thể tích thùng nước hình trụ',
    question: 'Một bể chứa nước hình trụ có đường kính đáy $d = 1.2\\text{ m}$ và chiều cao $h = 2.5\\text{ m}$. Tính lượng nước tối đa bể có thể chứa (lấy $\\pi \\approx 3.14$).',
    latexEquation: 'V = \\pi r^2 h',
    options: [
      'khoảng 2.83 m³ (2826 lít)',
      'khoảng 11.30 m³ (11304 lít)',
      'khoảng 5.65 m³ (5652 lít)',
      'khoảng 1.41 m³ (1413 lít)'
    ],
    correctOptionIndex: 0,
    hint: 'Lưu ý đề bài cho đường kính d = 1.2m nên bán kính r = 0.6m.',
    explanation: 'Bán kính đáy: $r = 1.2 / 2 = 0.6\\text{ m}$. Thể tích: $V = \\pi \\cdot 0.6^2 \\cdot 2.5 = \\pi \\cdot 0.36 \\cdot 2.5 = 0.9\\pi \\approx 2.826\\text{ m}^3 = 2826\\text{ lít}$.'
  },
  {
    id: 'p-cone-1',
    shapeType: 'cone',
    difficulty: 'easy',
    title: 'Tính đường sinh của hình nón',
    question: 'Một hình nón có bán kính đáy $r = 6\\text{ cm}$ và chiều cao $h = 8\\text{ cm}$. Độ dài đường sinh $l$ của hình nón bằng bao nhiêu?',
    latexEquation: 'l = \\sqrt{h^2 + r^2}',
    options: [
      '14 cm',
      '10 cm',
      '12 cm',
      '100 cm'
    ],
    correctOptionIndex: 1,
    hint: 'Tam giác vuông tạo bởi trục, bán kính đáy và đường sinh có độ dài cạnh huyền là đường sinh.',
    explanation: 'Áp dụng định lý Pythagore: $l = \\sqrt{r^2 + h^2} = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10\\text{ cm}$.'
  },
  {
    id: 'p-cone-2',
    shapeType: 'cone',
    difficulty: 'medium',
    title: 'Diện tích lá lợp nón bài thơ xứ Huế',
    question: 'Một chiếc nón lá có đường kính đáy $40\\text{ cm}$ và chiều cao $21\\text{ cm}$. Tính diện tích lá cần dùng để phủ kín xung quanh mặt nón (lấy $\\pi \\approx 3.14$).',
    latexEquation: 'S_{xq} = \\pi r l',
    options: [
      'khoảng 1821.2 cm²',
      'khoảng 1318.8 cm²',
      'khoảng 1822.4 cm²',
      'khoảng 2637.6 cm²'
    ],
    correctOptionIndex: 0,
    hint: 'Tính bán kính $r = 20\\text{ cm}$, sau đó tính đường sinh $l = \\sqrt{20^2 + 21^2} = 29\\text{ cm}$.',
    explanation: 'Bán kính đáy $r = 40/2 = 20\\text{ cm}$. Đường sinh $l = \\sqrt{20^2 + 21^2} = \\sqrt{400 + 441} = \\sqrt{841} = 29\\text{ cm}$. Diện tích xung quanh: $S_{xq} = \\pi \\cdot 20 \\cdot 29 = 580\\pi \\approx 1821.2\\text{ cm}^2$.'
  },
  {
    id: 'p-sph-1',
    shapeType: 'sphere',
    difficulty: 'easy',
    title: 'Diện tích da may quả bóng đá',
    question: 'Một quả bóng đá tiêu chuẩn số 5 có bán kính $R = 11\\text{ cm}$. Tính diện tích mặt da bên ngoài của quả bóng.',
    latexEquation: 'S = 4\\pi R^2',
    options: [
      '484\\pi \\text{ cm}^2',
      '121\\pi \\text{ cm}^2',
      '242\\pi \\text{ cm}^2',
      '1331\\pi \\text{ cm}^2'
    ],
    correctOptionIndex: 0,
    hint: 'Sử dụng công thức diện tích mặt cầu $S = 4\\pi R^2$.',
    explanation: 'Diện tích mặt cầu: $S = 4\\pi R^2 = 4\\pi \\cdot 11^2 = 4\\pi \\cdot 121 = 484\\pi \\text{ cm}^2 \\approx 1520.53\\text{ cm}^2$.'
  }
];

export const REAL_WORLD_APPLICATIONS: RealWorldApplication[] = [
  {
    id: 'rw-bon-nuoc',
    shapeType: 'cylinder',
    title: 'Bồn Nước Inox Gia Đình',
    subtitle: 'Tính dung tích chứa nước sinh hoạt và áp lực',
    category: 'Đời Sống & Dân Dụng',
    description: 'Hầu hết các hộ gia đình Việt Nam đều sử dụng bồn inox hình trụ đặt trên mái nhà hoặc tum để tích trữ nước sinh hoạt, tận dụng chênh lệch độ cao tạo áp lực nước tự nhiên.',
    imagePlaceholder: '🚰',
    illustrationKey: 'water-tank',
    mathProblem: {
      statement: 'Một bồn nước inox hình trụ có đường kính đáy $d = 1.2\\text{ m}$ và chiều cao thân bồn $h = 1.8\\text{ m}$. Hỏi bồn nước này chứa tối đa được bao nhiêu lít nước? (Lấy $\\pi \\approx 3.14$, biết $1\\text{ m}^3 = 1000\\text{ lít}$, bỏ qua độ dày của vỏ inox).',
      given: [
        'Đường kính đáy $d = 1.2\\text{ m} \\implies r = 0.6\\text{ m}$',
        'Chiều cao thân bồn $h = 1.8\\text{ m}$',
        'Số $\\pi \\approx 3.14$',
        'Quy đổi $1\\text{ m}^3 = 1000\\text{ lít}$'
      ],
      solutionSteps: [
        {
          step: 1,
          text: 'Tìm bán kính đáy của bồn nước hình trụ:',
          latex: 'r = \\frac{d}{2} = \\frac{1.2}{2} = 0.6\\text{ (m)}'
        },
        {
          step: 2,
          text: 'Áp dụng công thức tính thể tích hình trụ $V = \\pi r^2 h$:',
          latex: 'V = \\pi r^2 h = 3.14 \\times (0.6)^2 \\times 1.8 = 3.14 \\times 0.36 \\times 1.8 = 2.03472\\text{ (m}^3\\text{)}'
        },
        {
          step: 3,
          text: 'Đổi thể tích từ mét khối (m³) sang đơn vị lít (l):',
          latex: 'V = 2.03472 \\times 1000 = 2034.72\\text{ (lít)} \\approx 2035\\text{ (lít)}'
        }
      ],
      result: 'Dung tích chứa tối đa của bồn nước xấp xỉ 2035 lít (tương đương bồn 2 khối nước tiêu chuẩn).',
      practicalNote: 'Trong thực tế, các nhà sản xuất thường gọi đây là bồn nước "2000L" hoặc "2 khối" (2m³).'
    },
    quiz: {
      question: 'Tính dung tích nước tối đa của bồn nước inox theo đơn vị LÍT (làm tròn số nguyên):',
      targetParameter: 'Dung tích nước V',
      unit: 'lít',
      placeholder: 'Nhập số lít nước (ví dụ: 2035)',
      expectedValue: 2035,
      acceptableRange: [2030, 2040],
      tolerancePercent: 0.5,
      hint: 'Đầu tiên tính bán kính r = d / 2 = 0.6m, sau đó tính V = πr²h rồi nhân 1000.',
      formulaHint: 'V = \\pi r^2 h \\times 1000'
    }
  },
  {
    id: 'rw-lon-nuoc',
    shapeType: 'cylinder',
    title: 'Lon Nước Ngọt 330ml Tiêu Chuẩn',
    subtitle: 'Tối ưu hóa hình học vỏ nhôm trong công nghiệp bao bì',
    category: 'Sản Xuất & Bao Bì',
    description: 'Các kỹ sư thiết kế lon nước giải khát hình trụ sao cho với một dung tích xác định $V = 330\\text{ ml} = 330\\text{ cm}^3$, diện tích kim loại nhôm sử dụng là ít nhất nhằm giảm phát thải và chi phí bao bì.',
    imagePlaceholder: '🥤',
    illustrationKey: 'soda-can',
    mathProblem: {
      statement: 'Một lon nước ngọt hình trụ có thể tích danh định $V = 330\\text{ cm}^3$ và chiều cao $h = 11.5\\text{ cm}$. Tính bán kính đáy của lon nước (làm tròn đến 2 chữ số thập phân, lấy $\\pi \\approx 3.14$).',
      given: [
        'Thể tích $V = 330\\text{ cm}^3$',
        'Chiều cao $h = 11.5\\text{ cm}$',
        'Số $\\pi \\approx 3.14$'
      ],
      solutionSteps: [
        {
          step: 1,
          text: 'Từ công thức tính thể tích hình trụ $V = \\pi r^2 h$, biến đổi để rút ra $r^2$:',
          latex: 'r^2 = \\frac{V}{\\pi h} = \\frac{330}{3.14 \\times 11.5} = \\frac{330}{36.11} \\approx 9.1387'
        },
        {
          step: 2,
          text: 'Khai căn bậc hai hai vế để tìm bán kính đáy $r$:',
          latex: 'r = \\sqrt{9.1387} \\approx 3.0229 \\approx 3.02\\text{ (cm)}'
        },
        {
          step: 3,
          text: 'Kiểm tra đường kính đáy $d = 2r \\approx 6.04\\text{ cm}$ (khớp với kích thước thực tế của lon nhôm cầm tay).',
          latex: 'd = 2 \\times 3.02 = 6.04\\text{ (cm)}'
        }
      ],
      result: 'Bán kính đáy lon nước ngọt là xấp xỉ 3.02 cm (đường kính đáy khoảng 6.04 cm).',
      practicalNote: 'Bán kính r ≈ 3cm giúp người dùng dễ dàng cầm vừa vặn trong lòng bàn tay.'
    },
    quiz: {
      question: 'Tính bán kính đáy r của lon nước theo cm (làm tròn 2 chữ số thập phân):',
      targetParameter: 'Bán kính đáy r',
      unit: 'cm',
      placeholder: 'Nhập số cm (ví dụ: 3.02)',
      expectedValue: 3.02,
      acceptableRange: [3.0, 3.05],
      tolerancePercent: 1.0,
      hint: 'Áp dụng r = √(V / (π × h)) với V = 330 và h = 11.5.',
      formulaHint: 'r = \\sqrt{\\frac{V}{\\pi h}}'
    }
  },
  {
    id: 'rw-nui-muoi',
    shapeType: 'cone',
    title: 'Núi Muối Diêm Dân Cà Ná',
    subtitle: 'Ước lượng khối lượng muối thu hoạch từ hình nón cát/muối',
    category: 'Nông Nghiệp & Diêm Dân',
    description: 'Tại các cánh đồng muối miền Trung (Sa Huỳnh, Cà Ná), diêm dân cào muối vun thành các đống hình nón để róc bớt nước biển. Nhờ đo chu vi đáy và chiều cao, người ta ước tính được sản lượng muối.',
    imagePlaceholder: '🧂',
    illustrationKey: 'salt-mound',
    mathProblem: {
      statement: 'Một đống muối hạt thu hoạch vun thành hình nón có chu vi đáy đo được $C = 12.56\\text{ m}$ và chiều cao đỉnh $h = 1.5\\text{ m}$. Biết khối lượng riêng của muối hạt khô là $D = 1.2\\text{ tấn/m}^3$. Tính khối lượng của đống muối đó theo đơn vị TẤN (lấy $\\pi \\approx 3.14$).',
      given: [
        'Chu vi đáy $C = 12.56\\text{ m}$',
        'Chiều cao $h = 1.5\\text{ m}$',
        'Khối lượng riêng $D = 1.2\\text{ tấn/m}^3$',
        'Số $\\pi \\approx 3.14$'
      ],
      solutionSteps: [
        {
          step: 1,
          text: 'Từ chu vi đáy $C = 2\\pi r$, tính bán kính đáy $r$ của đống muối:',
          latex: 'r = \\frac{C}{2\\pi} = \\frac{12.56}{2 \\times 3.14} = \\frac{12.56}{6.28} = 2\\text{ (m)}'
        },
        {
          step: 2,
          text: 'Áp dụng công thức tính thể tích khối nón $V = \\frac{1}{3}\\pi r^2 h$:',
          latex: 'V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} \\times 3.14 \\times 2^2 \\times 1.5 = \\frac{1}{3} \\times 3.14 \\times 4 \\times 1.5 = 6.28\\text{ (m}^3\\text{)}'
        },
        {
          step: 3,
          text: 'Tính khối lượng đống muối theo công thức $m = V \\times D$:',
          latex: 'm = 6.28 \\times 1.2 = 7.536\\text{ (tấn)} \\approx 7.54\\text{ (tấn)}'
        }
      ],
      result: 'Khối lượng của đống muối khoảng 7.54 tấn (hoặc 7536 kg muối sạch).',
      practicalNote: 'Dạng toán hình nón tự nhiên này xuất hiện thường xuyên trong đề thi vào 10 tại các tỉnh ven biển.'
    },
    quiz: {
      question: 'Tính khối lượng của đống muối theo đơn vị TẤN (làm tròn 2 chữ số thập phân):',
      targetParameter: 'Khối lượng m',
      unit: 'tấn',
      placeholder: 'Nhập số tấn (ví dụ: 7.54)',
      expectedValue: 7.54,
      acceptableRange: [7.5, 7.56],
      tolerancePercent: 1.0,
      hint: 'Tính r = C / (2π) = 2m -> V = 1/3 π r² h = 6.28 m³ -> m = V × D = 6.28 × 1.2.',
      formulaHint: 'm = \\left(\\frac{1}{3}\\pi r^2 h\\right) \\times D'
    }
  },
  {
    id: 'rw-pheu-loc',
    shapeType: 'cone',
    title: 'Phễu Lọc Hóa Học Phòng Thí Nghiệm',
    subtitle: 'Định lý Pythagore và dung tích chiết rót hình nón',
    category: 'Khoa Học & Hóa Học',
    description: 'Phễu thủy tinh lọc hóa chất có thân hình nón giúp chất lỏng chảy đều xuống cuống phễu. Việc tính toán chiều cao và thể tích chứa giúp tránh tràn hóa chất khi đong dung dịch.',
    imagePlaceholder: '🧪',
    illustrationKey: 'funnel',
    mathProblem: {
      statement: 'Một phễu thủy tinh có miệng hình nón với đường kính $d = 12\\text{ cm}$ và độ dài đường sinh $l = 10\\text{ cm}$. Hãy tính: a) Chiều cao $h$ của phần phễu hình nón? b) Dung tích chứa tối đa của phễu theo $\\text{cm}^3$ (lấy $\\pi \\approx 3.14$).',
      given: [
        'Đường kính miệng $d = 12\\text{ cm} \\implies r = 6\\text{ cm}$',
        'Độ dài đường sinh $l = 10\\text{ cm}$',
        'Số $\\pi \\approx 3.14$'
      ],
      solutionSteps: [
        {
          step: 1,
          text: 'Tính bán kính miệng phễu: $r = d / 2 = 12 / 2 = 6\\text{ cm}$.',
          latex: 'r = 6\\text{ (cm)}'
        },
        {
          step: 2,
          text: 'Áp dụng định lý Pythagore trong tam giác vuông tạo bởi chiều cao $h$, bán kính $r$ và đường sinh $l$ ($h^2 + r^2 = l^2$):',
          latex: 'h = \\sqrt{l^2 - r^2} = \\sqrt{10^2 - 6^2} = \\sqrt{100 - 36} = \\sqrt{64} = 8\\text{ (cm)}'
        },
        {
          step: 3,
          text: 'Tính dung tích chứa tối đa của phễu hình nón:',
          latex: 'V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} \\times 3.14 \\times 6^2 \\times 8 = \\frac{1}{3} \\times 3.14 \\times 36 \\times 8 = 3.14 \\times 12 \\times 8 = 301.44\\text{ (cm}^3\\text{)}'
        }
      ],
      result: 'Chiều cao phần nón là 8 cm và dung tích chứa tối đa khoảng 301.44 cm³ (~301.44 ml).',
      practicalNote: 'Bộ ba số Pythagore (6, 8, 10) là tỉ lệ kinh điển rất hay gặp trong các bài kiểm tra thực tế.'
    },
    quiz: {
      question: 'Tính chiều cao h của phần phễu hình nón theo đơn vị cm:',
      targetParameter: 'Chiều cao h',
      unit: 'cm',
      placeholder: 'Nhập số cm (ví dụ: 8)',
      expectedValue: 8,
      acceptableRange: [7.9, 8.1],
      tolerancePercent: 0.5,
      hint: 'Áp dụng định lý Pythagore: h = √(l² - r²) với l = 10 và r = 6.',
      formulaHint: 'h = \\sqrt{l^2 - r^2}'
    }
  },
  {
    id: 'rw-non-la',
    shapeType: 'cone',
    title: 'Nón Lá Truyền Thống Việt Nam',
    subtitle: 'Nghệ thuật đan 16 vành nan và diện tích lá phủ nón',
    category: 'Văn Hóa & Thủ Công Mỹ Nghệ',
    description: 'Chiếc nón bài thơ xứ Huế được làm tỉ mỉ từ 16 vành nan tre uốn tròn và phủ 2 lớp lá gồi/lá cọ. Để tính lượng lá cần dùng làm mặt nón, các nghệ nhân áp dụng diện tích xung quanh hình nón.',
    imagePlaceholder: '🌾',
    illustrationKey: 'conical-hat',
    mathProblem: {
      statement: 'Một chiếc nón lá chuẩn có đường kính vành ngoài cùng $d = 40\\text{ cm}$ và chiều cao từ đỉnh đến tâm mặt đáy $h = 21\\text{ cm}$. Tính độ dài đường sinh $l$ và diện tích lá tối thiểu $S_{xq}$ cần để phủ 1 lớp mặt nón (lấy $\\pi \\approx 3.14$).',
      given: [
        'Đường kính đáy $d = 40\\text{ cm} \\implies r = 20\\text{ cm}$',
        'Chiều cao đỉnh $h = 21\\text{ cm}$',
        'Số $\\pi \\approx 3.14$'
      ],
      solutionSteps: [
        {
          step: 1,
          text: 'Tính bán kính vành đáy: $r = d / 2 = 40 / 2 = 20\\text{ cm}$.',
          latex: 'r = 20\\text{ (cm)}'
        },
        {
          step: 2,
          text: 'Tính độ dài đường sinh $l$ của chiếc nón theo định lý Pythagore:',
          latex: 'l = \\sqrt{h^2 + r^2} = \\sqrt{21^2 + 20^2} = \\sqrt{441 + 400} = \\sqrt{841} = 29\\text{ (cm)}'
        },
        {
          step: 3,
          text: 'Áp dụng công thức tính diện tích xung quanh hình nón $S_{xq} = \\pi r l$:',
          latex: 'S_{xq} = \\pi r l = 3.14 \\times 20 \\times 29 = 1821.2\\text{ (cm}^2\\text{)} \\quad (\\text{hoặc } 580\\pi \\approx 1822.12\\text{ cm}^2)'
        }
      ],
      result: 'Độ dài đường sinh là 29 cm và diện tích lá phủ khoảng 1821.2 cm² (tương đương 0.182 m²).',
      practicalNote: 'Tỉ lệ h = 21 cm, r = 20 cm, l = 29 cm là tỉ lệ vàng tạo nên độ dốc che mưa nắng thanh thoát của nón Huế.'
    },
    quiz: {
      question: 'Tính độ dài đường sinh l của chiếc nón lá theo đơn vị cm:',
      targetParameter: 'Đường sinh l',
      unit: 'cm',
      placeholder: 'Nhập số cm (ví dụ: 29)',
      expectedValue: 29,
      acceptableRange: [28.8, 29.2],
      tolerancePercent: 0.5,
      hint: 'Áp dụng l = √(h² + r²) với h = 21 và r = 20.',
      formulaHint: 'l = \\sqrt{h^2 + r^2} = \\sqrt{21^2 + 20^2}'
    }
  },
  {
    id: 'rw-bong-da',
    shapeType: 'sphere',
    title: 'Quả Bóng Đá Tiêu Chuẩn FIFA (Size 5)',
    subtitle: 'Khối cầu thể thao và diện tích bề mặt da may bóng',
    category: 'Thể Thao & Giải Trí',
    description: 'Quả bóng đá thi đấu chính thức World Cup có dạng hình cầu hoàn hảo. Việc tính toán diện tích mặt cầu giúp nhà sản xuất cắt chính xác 32 miếng da ngũ giác và lục giác ghép lại.',
    imagePlaceholder: '⚽',
    illustrationKey: 'soccer-ball',
    mathProblem: {
      statement: 'Một quả bóng đá FIFA Size 5 có chu vi vòng tròn lớn (xích đạo) đo được $C = 69\\text{ cm}$. Hãy tính: a) Bán kính $R$ của quả bóng? b) Diện tích bề mặt da $S$ của quả bóng theo $\\text{cm}^2$ (làm tròn số nguyên, lấy $\\pi \\approx 3.14$).',
      given: [
        'Chu vi vòng lớn $C = 69\\text{ cm}$',
        'Số $\\pi \\approx 3.14$'
      ],
      solutionSteps: [
        {
          step: 1,
          text: 'Từ công thức chu vi đường tròn lớn $C = 2\\pi R$, tính bán kính $R$:',
          latex: 'R = \\frac{C}{2\\pi} = \\frac{69}{2 \\times 3.14} = \\frac{69}{6.28} \\approx 10.987\\text{ (cm)} \\approx 11\\text{ (cm)}'
        },
        {
          step: 2,
          text: 'Áp dụng công thức tính diện tích mặt cầu $S = 4\\pi R^2$:',
          latex: 'S = 4\\pi R^2 = 4 \\times 3.14 \\times (10.987)^2 = 12.56 \\times 120.714 \\approx 1516.17\\text{ (cm}^2\\text{)} \\approx 1516\\text{ (cm}^2\\text{)}'
        },
        {
          step: 3,
          text: 'Nếu làm tròn bán kính $R \\approx 11\\text{ cm}$ trước khi tính:',
          latex: 'S = 4 \\times 3.14 \\times 11^2 = 4 \\times 3.14 \\times 121 \\approx 1520\\text{ (cm}^2\\text{)}'
        }
      ],
      result: 'Bán kính quả bóng khoảng 11 cm và diện tích bề mặt da khoảng 1516 – 1520 cm².',
      practicalNote: 'Bóng đá size 5 theo chuẩn FIFA luôn có chu vi từ 68 cm đến 70 cm và áp suất 0.6 - 1.1 atm.'
    },
    quiz: {
      question: 'Tính diện tích bề mặt da quả bóng theo đơn vị cm² (làm tròn số nguyên):',
      targetParameter: 'Diện tích mặt cầu S',
      unit: 'cm²',
      placeholder: 'Nhập số cm² (ví dụ: 1516 hoặc 1520)',
      expectedValue: 1516,
      acceptableRange: [1500, 1530],
      tolerancePercent: 1.5,
      hint: 'Tính R = C / (2π) ≈ 11 cm rồi tính S = 4πR².',
      formulaHint: 'S = 4\\pi R^2 = 4\\pi \\left(\\frac{C}{2\\pi}\\right)^2'
    }
  },
  {
    id: 'rw-thung-phuy',
    shapeType: 'cylinder',
    title: 'Thùng Phuy Thép Tiêu Chuẩn 200L',
    subtitle: 'Tính diện tích sơn chống gỉ toàn phần cho vỏ thùng',
    category: 'Công Nghiệp & Vận Tải',
    description: 'Thùng phuy thép hình trụ 200 lít là phương tiện lưu trữ xăng dầu và hóa chất phổ biến nhất thế giới. Để bảo vệ thùng ngoài trời, các xưởng cơ khí phải sơn chống gỉ toàn bộ mặt ngoài.',
    imagePlaceholder: '🛢️',
    illustrationKey: 'oil-drum',
    mathProblem: {
      statement: 'Một thùng phuy hình trụ bằng thép có chiều cao $h = 90\\text{ cm}$ và đường kính đáy $d = 60\\text{ cm}$. Tính diện tích thép toàn phần $S_{tp}$ cần sơn phủ mặt ngoài theo đơn vị $\\text{m}^2$ (làm tròn 2 chữ số thập phân, lấy $\\pi \\approx 3.14$).',
      given: [
        'Chiều cao $h = 90\\text{ cm} = 0.9\\text{ m}$',
        'Đường kính $d = 60\\text{ cm} \\implies r = 30\\text{ cm} = 0.3\\text{ m}$',
        'Số $\\pi \\approx 3.14$'
      ],
      solutionSteps: [
        {
          step: 1,
          text: 'Đổi các kích thước sang đơn vị mét: $r = 0.3\\text{ m}$, $h = 0.9\\text{ m}$.',
          latex: 'r = 0.3\\text{ (m)}, \\quad h = 0.9\\text{ (m)}'
        },
        {
          step: 2,
          text: 'Áp dụng công thức tính diện tích toàn phần hình trụ $S_{tp} = 2\\pi r(r + h)$:',
          latex: 'S_{tp} = 2\\pi r(r + h) = 2 \\times 3.14 \\times 0.3 \\times (0.3 + 0.9) = 1.884 \\times 1.2 = 2.2608\\text{ (m}^2\\text{)}'
        },
        {
          step: 3,
          text: 'Làm tròn kết quả đến 2 chữ số thập phân:',
          latex: 'S_{tp} \\approx 2.26\\text{ (m}^2\\text{)}'
        }
      ],
      result: 'Diện tích sơn bề mặt toàn phần của thùng phuy là khoảng 2.26 m².',
      practicalNote: 'Diện tích này giúp ước tính lượng sơn công nghiệp: 1kg sơn phủ được 8-10m², vậy 1kg sơn đủ cho 4 thùng phuy.'
    },
    quiz: {
      question: 'Tính diện tích toàn phần S_tp của thùng phuy theo đơn vị m² (làm tròn 2 chữ số thập phân):',
      targetParameter: 'Diện tích toàn phần S_tp',
      unit: 'm²',
      placeholder: 'Nhập số m² (ví dụ: 2.26)',
      expectedValue: 2.26,
      acceptableRange: [2.25, 2.27],
      tolerancePercent: 0.5,
      hint: 'Đổi r = 0.3m, h = 0.9m rồi áp dụng S_tp = 2πr(r + h).',
      formulaHint: 'S_{tp} = 2\\pi r (r + h)'
    }
  },
  {
    id: 'rw-leu-tepee',
    shapeType: 'cone',
    title: 'Lều Cắm Trại Dã Ngoại Tepee',
    subtitle: 'Tính chiều cao dựng lều và diện tích vải bạt xung quanh',
    category: 'Du Lịch & Dã Ngoại',
    description: 'Lều dã ngoại hình nón phong cách du mục (Tepee) có ưu điểm thoát nước mưa cực nhanh và đứng vững trước gió lớn nhờ trọng tâm đối xứng và bề mặt nón cong tròn.',
    imagePlaceholder: '⛺',
    illustrationKey: 'tepee-tent',
    mathProblem: {
      statement: 'Một chiếc lều cắm trại hình nón có bán kính đáy $r = 2.4\\text{ m}$ và thanh cọc chống nghiêng (đường sinh) $l = 3\\text{ m}$. Hãy tính diện tích vải bạt xung quanh $S_{xq}$ cần may lều theo $\\text{m}^2$ (bỏ qua mép may, lấy $\\pi \\approx 3.14$).',
      given: [
        'Bán kính đáy $r = 2.4\\text{ m}$',
        'Độ dài đường sinh $l = 3\\text{ m}$',
        'Số $\\pi \\approx 3.14$'
      ],
      solutionSteps: [
        {
          step: 1,
          text: 'Tính chiều cao tâm lều $h$ theo định lý Pythagore:',
          latex: 'h = \\sqrt{l^2 - r^2} = \\sqrt{3^2 - 2.4^2} = \\sqrt{9 - 5.76} = \\sqrt{3.24} = 1.8\\text{ (m)}'
        },
        {
          step: 2,
          text: 'Áp dụng công thức tính diện tích xung quanh hình nón $S_{xq} = \\pi r l$:',
          latex: 'S_{xq} = \\pi r l = 3.14 \\times 2.4 \\times 3 = 3.14 \\times 7.2 = 22.608\\text{ (m}^2\\text{)}'
        },
        {
          step: 3,
          text: 'Làm tròn kết quả:',
          latex: 'S_{xq} \\approx 22.61\\text{ (m}^2\\text{)}'
        }
      ],
      result: 'Diện tích vải bạt xung quanh cần dùng may lều là khoảng 22.61 m² (chiều cao tâm lều là 1.8 m).',
      practicalNote: 'Chiều cao 1.8m vừa vặn cho người trưởng thành đứng thẳng ở khu vực trung tâm lều.'
    },
    quiz: {
      question: 'Tính diện tích vải bạt xung quanh S_xq theo đơn vị m² (làm tròn 2 chữ số thập phân):',
      targetParameter: 'Diện tích xung quanh S_xq',
      unit: 'm²',
      placeholder: 'Nhập số m² (ví dụ: 22.61)',
      expectedValue: 22.61,
      acceptableRange: [22.5, 22.7],
      tolerancePercent: 0.5,
      hint: 'Áp dụng công thức S_xq = π × r × l với r = 2.4 và l = 3.',
      formulaHint: 'S_{xq} = \\pi r l'
    }
  }
];

export const INITIAL_ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: 'ach-first-step',
    title: 'Khởi Đầu Không Gian',
    description: 'Bắt đầu khám phá phòng thí nghiệm Hình học 9',
    icon: 'Compass',
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    category: 'explore'
  },
  {
    id: 'ach-cylinder-master',
    title: 'Chuyên Gia Hình Trụ',
    description: 'Hoàn thành lý thuyết và 3 bài tập về Hình Trụ',
    icon: 'Cylinder',
    unlocked: false,
    progress: 1,
    maxProgress: 3,
    category: 'theory'
  },
  {
    id: 'ach-cone-explorer',
    title: 'Thợ May Nón Lá',
    description: 'Thành thạo công thức đường sinh và $S_{xq}$ Hình Nón',
    icon: 'Cone',
    unlocked: false,
    progress: 1,
    maxProgress: 3,
    category: 'practice'
  },
  {
    id: 'ach-sphere-genius',
    title: 'Bậc Thầy Mặt Cầu',
    description: 'Chinh phục thể tích và diện tích Hình Cầu',
    icon: 'Globe',
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    category: 'mastery'
  },
  {
    id: 'ach-real-solver',
    title: 'Kỹ Sư Thực Nghiệm',
    description: 'Giải quyết 3 bài toán ứng dụng thực tế',
    icon: 'Sparkles',
    unlocked: false,
    progress: 1,
    maxProgress: 3,
    category: 'explore'
  }
];
