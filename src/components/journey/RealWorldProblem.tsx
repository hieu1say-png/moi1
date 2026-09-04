/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - RealWorldProblem Component
 * Step 4 of Learning Journey: Ứng Dụng Thực Tiễn
 * Structured flow:
 * BỐI CẢNH -> DỮ KIỆN -> YÊU CẦU -> HỌC SINH SUY NGHĨ -> 4 CẤP ĐỘ GỢI Ý TỪNG BƯỚC -> LỜI GIẢI CHI TIẾT -> KẾT LUẬN
 */

import React, { useState } from 'react';
import { ShapeType } from '../../types';
import { MathFormula, MathText } from '../common/MathFormula';
import {
  Globe,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Calculator,
  RotateCcw,
  Sparkles,
  Eye,
  EyeOff,
  Compass,
  ArrowRight
} from 'lucide-react';

export interface PracticalScenario {
  id: string;
  shapeType: ShapeType;
  title: string;
  category: string;
  badge: string;
  icon: string;
  // 1. BỐI CẢNH
  context: string;
  // 2. DỮ KIỆN
  givens: { label: string; value: string; note?: string }[];
  // 3. YÊU CẦU
  question: string;
  // 4. GỢI Ý TỪNG BƯỚC (4 Cấp độ chuẩn theo Section X)
  hints: [
    { level: 1; title: 'Lần 1: Xác định dữ kiện'; content: string },
    { level: 2; title: 'Lần 2: Công thức áp dụng'; content: string },
    { level: 3; title: 'Lần 3: Thay số & phép tính'; content: string },
    { level: 4; title: 'Lần 4: Kết luận & đơn vị'; content: string }
  ];
  // 5. GIẢI CHI TIẾT
  solutionSteps: { step: number; title: string; explanation: string; latex?: string }[];
  // 6. KẾT LUẬN
  finalAnswer: string;
  practicalSignificance: string;
}

const SCENARIOS_DATA: Record<ShapeType, PracticalScenario[]> = {
  cylinder: [
    {
      id: 'rw-cyl-water-tank',
      shapeType: 'cylinder',
      title: 'Bồn Nước Inox Gia Đình Sơn Hà / Đại Thành',
      category: 'Đời sống dân dụng',
      badge: 'Thực tế phổ biến',
      icon: '🚰',
      context: 'Một gia đình chuẩn bị lắp đặt một bồn nước inox hình trụ đứng trên sân thượng tầng 3 để cấp nước sinh hoạt cho cả nhà 4 người (mức dùng trung bình 1.5 m³ đến 2 m³ nước). Bác thợ điện nước tư vấn chọn bồn có đường kính đáy d = 1.2 m và chiều cao h = 1.8 m.',
      givens: [
        { label: 'Đường kính đáy', value: 'd = 1.2\\text{ m}', note: 'Bán kính r = d/2 = 0.6 m' },
        { label: 'Chiều cao bồn', value: 'h = 1.8\\text{ m}' },
        { label: 'Số pi', value: '\\pi \\approx 3.14' }
      ],
      question: 'a) Tính dung tích chứa tối đa của bồn nước theo lít (biết 1 m³ = 1000 lít, làm tròn đến hàng đơn vị).\nb) Gia đình 4 người dùng bồn này trong bao lâu nếu mỗi ngày dùng 400 lít?',
      hints: [
        {
          level: 1,
          title: 'Lần 1: Xác định dữ kiện',
          content: 'Bồn nước có dạng hình trụ. Bán kính đáy $r = \\frac{d}{2} = \\frac{1.2}{2} = 0.6\\text{ m}$. Chiều cao $h = 1.8\\text{ m}$. Ta cần tính thể tích $V$ rồi đổi sang lít ($1\\text{ m}^3 = 1000\\text{ lít}$).'
        },
        {
          level: 2,
          title: 'Lần 2: Công thức áp dụng',
          content: 'Áp dụng công thức tính thể tích khối trụ: $V = \\pi r^2 h$. Sau khi có thể tích $V$ ($m^3$), dung tích nước bằng $V \\times 1000$ lít.'
        },
        {
          level: 3,
          title: 'Lần 3: Thay số & phép tính',
          content: 'Thay số: $V = 3.14 \\times (0.6)^2 \\times 1.8 = 3.14 \\times 0.36 \\times 1.8 = 2.03472\\text{ m}^3$. Đổi ra lít: $2.03472 \\times 1000 \\approx 2035\\text{ lít}$. Số ngày dùng: $2035 \\div 400 \\approx 5.08\\text{ ngày}$.'
        },
        {
          level: 4,
          title: 'Lần 4: Kết luận & đơn vị',
          content: 'Dung tích bồn nước là khoảng $2035\\text{ lít}$ (hơn $2\\text{ khối nước}$). Gia đình có thể dùng thoải mái trong khoảng $5\\text{ ngày}$ trước khi cần bơm thêm.'
        }
      ],
      solutionSteps: [
        {
          step: 1,
          title: 'Tính bán kính đáy của bồn nước',
          explanation: 'Bán kính đáy bồn nước hình trụ là:',
          latex: 'r = \\frac{d}{2} = \\frac{1.2}{2} = 0.6\\text{ m}'
        },
        {
          step: 2,
          title: 'Tính thể tích của bồn nước',
          explanation: 'Áp dụng công thức thể tích khối trụ $V = \\pi r^2 h$:',
          latex: 'V = \\pi \\times (0.6)^2 \\times 1.8 = 3.14 \\times 0.36 \\times 1.8 = 2.03472\\text{ m}^3'
        },
        {
          step: 3,
          title: 'Đổi thể tích sang đơn vị lít',
          explanation: 'Vì $1\\text{ m}^3 = 1000\\text{ lít}$, dung tích tối đa của bồn là:',
          latex: '2.03472 \\times 1000 \\approx 2035\\text{ lít}'
        },
        {
          step: 4,
          title: 'Tính thời gian sử dụng nước',
          explanation: 'Số ngày dùng hết lượng nước dự trữ trong bồn:',
          latex: '\\text{Thời gian} = \\frac{2035}{400} \\approx 5.08\\text{ ngày} \\approx 5\\text{ ngày}'
        }
      ],
      finalAnswer: 'Dung tích bồn: 2035 lít | Dùng được khoảng 5 ngày',
      practicalSignificance: 'Trong thiết kế nhà ở dân dụng, các kỹ sư thường chọn bồn 2000L (2 m³) cho gia đình 4-5 người để đảm bảo an toàn cấp nước khi xảy ra cúp điện hoặc bảo trì nguồn nước máy.'
    },
    {
      id: 'rw-cyl-can',
      shapeType: 'cylinder',
      title: 'Vỏ Lon Nước Ngọt 330ml & Tối Ưu Hóa Nhôm',
      category: 'Công nghiệp & Bao bì',
      badge: 'Kinh tế & Tối ưu',
      icon: '🥫',
      context: 'Mỗi năm trên thế giới có hơn 300 tỷ lon nhôm được sản xuất. Một lon nước ngọt tiêu chuẩn có dung tích 330 ml ($330\\text{ cm}^3$) và bán kính đáy $r = 3.25\\text{ cm}$. Các kỹ sư cần tính chiều cao và lượng nhôm (diện tích toàn phần) để chế tạo vỏ lon.',
      givens: [
        { label: 'Thể tích lon', value: 'V = 330\\text{ cm}^3' },
        { label: 'Bán kính đáy', value: 'r = 3.25\\text{ cm}' },
        { label: 'Số pi', value: '\\pi \\approx 3.1416' }
      ],
      question: 'Tính chiều cao $h$ của vỏ lon và diện tích nhôm toàn phần $S_{tp}$ cần dùng (làm tròn đến 1 chữ số thập phân).',
      hints: [
        {
          level: 1,
          title: 'Lần 1: Xác định dữ kiện',
          content: 'Đã biết thể tích $V = 330\\text{ cm}^3$ và bán kính đáy $r = 3.25\\text{ cm}$. Cần tìm chiều cao $h$ trước, sau đó tính diện tích toàn phần $S_{tp}$.'
        },
        {
          level: 2,
          title: 'Lần 2: Công thức áp dụng',
          content: 'Từ $V = \\pi r^2 h \\Rightarrow h = \\frac{V}{\\pi r^2}$. Diện tích toàn phần: $S_{tp} = S_{xq} + 2S_{\\text{đáy}} = 2\\pi r h + 2\\pi r^2 = 2\\pi r (h + r)$.'
        },
        {
          level: 3,
          title: 'Lần 3: Thay số & phép tính',
          content: 'Diện tích đáy: $S_{\\text{đáy}} = 3.1416 \\times 3.25^2 \\approx 33.18\\text{ cm}^2$. Chiều cao: $h = \\frac{330}{33.18} \\approx 9.95\\text{ cm}$. $S_{tp} = 2 \\times 3.1416 \\times 3.25 \\times (9.95 + 3.25) \\approx 269.5\\text{ cm}^2$.'
        },
        {
          level: 4,
          title: 'Lần 4: Kết luận & đơn vị',
          content: 'Chiều cao lon khoảng $9.95\\text{ cm}$ (xấp xỉ $10\\text{ cm}$), diện tích nhôm chế tạo vỏ lon khoảng $269.5\\text{ cm}^2$.'
        }
      ],
      solutionSteps: [
        {
          step: 1,
          title: 'Tính diện tích đáy của lon',
          explanation: 'Áp dụng công thức diện tích hình tròn:',
          latex: 'S_{\\text{đáy}} = \\pi r^2 = 3.1416 \\times (3.25)^2 \\approx 33.183\\text{ cm}^2'
        },
        {
          step: 2,
          title: 'Tính chiều cao h của lon nước',
          explanation: 'Rút $h$ từ công thức thể tích:',
          latex: 'h = \\frac{V}{\\pi r^2} = \\frac{330}{33.183} \\approx 9.945\\text{ cm}'
        },
        {
          step: 3,
          title: 'Tính diện tích nhôm toàn phần',
          explanation: 'Tổng diện tích vỏ nhôm cần dùng gồm thân trụ và hai đáy:',
          latex: 'S_{tp} = 2\\pi r (h + r) = 2 \\times 3.1416 \\times 3.25 \\times (9.945 + 3.25) \\approx 269.5\\text{ cm}^2'
        }
      ],
      finalAnswer: 'Chiều cao h ≈ 9.95 cm | Diện tích nhôm Stp ≈ 269.5 cm²',
      practicalSignificance: 'Chỉ cần giảm độ dày vỏ lon nhôm đi 0.01 mm trên diện tích 269.5 cm², các tập đoàn nước giải khát toàn cầu đã tiết kiệm hàng chục triệu USD tiền nguyên liệu nhôm mỗi năm.'
    }
  ],
  sphere: [
    {
      id: 'rw-sph-ball',
      shapeType: 'sphere',
      title: 'Quả Bóng Đá Tiêu Chuẩn FIFA (Size 5)',
      category: 'Thể thao & Kỹ thuật chế tạo',
      badge: 'Vận động đời sống',
      icon: '⚽',
      context: 'Quả bóng thi đấu chính thức tại các giải đấu bóng đá quốc tế (như FIFA World Cup) thuộc kích cỡ tiêu chuẩn Size 5 có chu vi đường tròn lớn từ 68 cm đến 70 cm. Ta xét quả bóng có chu vi chuẩn C = 68.5 cm.',
      givens: [
        { label: 'Chu vi đường tròn lớn', value: 'C = 68.5\\text{ cm}' },
        { label: 'Công thức chu vi', value: 'C = 2\\pi R' },
        { label: 'Số pi', value: '\\pi \\approx 3.1416' }
      ],
      question: 'a) Tính bán kính R của quả bóng (làm tròn đến chữ số thập phân thứ hai).\nb) Tính diện tích bề mặt da để bọc quả bóng và thể tích không khí nén bên trong quả bóng.',
      hints: [
        {
          level: 1,
          title: 'Lần 1: Xác định dữ kiện',
          content: 'Quả bóng có dạng hình cầu. Chu vi đường tròn lớn qua tâm là $C = 2\\pi R = 68.5\\text{ cm}$. Từ chu vi ta tìm được bán kính $R$.'
        },
        {
          level: 2,
          title: 'Lần 2: Công thức áp dụng',
          content: 'Bán kính: $R = \\frac{C}{2\\pi}$. Diện tích mặt cầu (da bọc): $S = 4\\pi R^2$. Thể tích không khí: $V = \\frac{4}{3}\\pi R^3$.'
        },
        {
          level: 3,
          title: 'Lần 3: Thay số & phép tính',
          content: '$R = \\frac{68.5}{2 \\times 3.1416} \\approx 10.90\\text{ cm}$. Diện tích da: $S = 4 \\times 3.1416 \\times (10.90)^2 \\approx 1493\\text{ cm}^2$. Thể tích không khí: $V = \\frac{4}{3} \\times 3.1416 \\times (10.90)^3 \\approx 5424\\text{ cm}^3$.'
        },
        {
          level: 4,
          title: 'Lần 4: Kết luận & đơn vị',
          content: 'Bán kính quả bóng khoảng $10.90\\text{ cm}$. Diện tích mặt da bọc là khoảng $1493\\text{ cm}^2$ (khoảng $0.15\\text{ m}^2$). Thể tích không khí bên trong là $5.42\\text{ lít}$.'
        }
      ],
      solutionSteps: [
        {
          step: 1,
          title: 'Tìm bán kính R của quả bóng đá',
          explanation: 'Từ công thức chu vi đường tròn lớn $C = 2\\pi R$:',
          latex: 'R = \\frac{C}{2\\pi} = \\frac{68.5}{2 \\times 3.1416} \\approx 10.90\\text{ cm}'
        },
        {
          step: 2,
          title: 'Tính diện tích bề mặt da bóng',
          explanation: 'Áp dụng công thức diện tích mặt cầu:',
          latex: 'S = 4\\pi R^2 = 4 \\times 3.1416 \\times (10.90)^2 \\approx 1493.0\\text{ cm}^2'
        },
        {
          step: 3,
          title: 'Tính thể tích không khí chứa trong quả bóng',
          explanation: 'Áp dụng công thức thể tích khối cầu:',
          latex: 'V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3} \\times 3.1416 \\times (10.90)^3 \\approx 5424.6\\text{ cm}^3 \\approx 5.42\\text{ lít}'
        }
      ],
      finalAnswer: 'Bán kính R ≈ 10.90 cm | Diện tích da S ≈ 1493 cm² | Thể tích V ≈ 5.42 lít',
      practicalSignificance: 'Mặt cầu là hình học có tỷ lệ diện tích bề mặt trên thể tích nhỏ nhất, giúp áp suất không khí nén bên trong phân bố đồng đều tại mọi điểm, làm bóng bay ổn định khi cầu thủ sút phạt.'
    },
    {
      id: 'rw-sph-gas-tank',
      shapeType: 'sphere',
      title: 'Bồn Chứa Khí Gas Hóa Lỏng (LPG) Hình Cầu',
      category: 'Năng lượng & Công nghiệp dầu khí',
      badge: 'Kỹ thuật hóa dầu',
      icon: '🌐',
      context: 'Tại các nhà máy lọc dầu (như Dung Quất, Nghi Sơn), các bồn chứa khí hóa lỏng thường được chế tạo dưới dạng quả cầu khổng lồ bằng thép chịu lực cao. Một bồn chứa hình cầu có đường kính d = 16 m.',
      givens: [
        { label: 'Đường kính bồn cầu', value: 'd = 16\\text{ m}', note: 'Bán kính R = 8 m' },
        { label: 'Vật liệu', value: 'Thép đặc chủng chịu áp suất' },
        { label: 'Số pi', value: '\\pi \\approx 3.1416' }
      ],
      question: 'a) Tính thể tích khí gas hóa lỏng tối đa mà bồn có thể lưu trữ.\nb) Người ta cần sơn 2 lớp sơn chống rỉ bên ngoài bồn. Biết mỗi mét vuông cần 0.3 kg sơn, tính lượng sơn cần dùng.',
      hints: [
        {
          level: 1,
          title: 'Lần 1: Xác định dữ kiện',
          content: 'Bán kính bồn cầu: $R = \\frac{d}{2} = 8\\text{ m}$. Cần tính thể tích $V$ và diện tích mặt cầu $S$. Chú ý sơn 2 lớp nghĩa là nhân đôi diện tích.'
        },
        {
          level: 2,
          title: 'Lần 2: Công thức áp dụng',
          content: 'Thể tích: $V = \\frac{4}{3}\\pi R^3$. Diện tích mặt ngoài: $S = 4\\pi R^2$. Lượng sơn: $m = 2 \\times S \\times 0.3\\text{ kg}$.'
        },
        {
          level: 3,
          title: 'Lần 3: Thay số & phép tính',
          content: '$V = \\frac{4}{3} \\times 3.1416 \\times 8^3 \\approx 2144.7\\text{ m}^3$. $S = 4 \\times 3.1416 \\times 8^2 \\approx 804.25\\text{ m}^2$. Lượng sơn: $2 \\times 804.25 \\times 0.3 \\approx 482.5\\text{ kg}$.'
        },
        {
          level: 4,
          title: 'Lần 4: Kết luận & đơn vị',
          content: 'Thể tích bồn chứa khoảng $2145\\text{ m}^3$. Cần khoảng $483\\text{ kg}$ sơn chống rỉ (tương đương 24 thùng sơn 20kg).'
        }
      ],
      solutionSteps: [
        {
          step: 1,
          title: 'Tính thể tích chứa của bồn cầu',
          explanation: 'Bán kính $R = 8\\text{ m}$. Thể tích bồn cầu:',
          latex: 'V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3} \\times 3.1416 \\times 8^3 \\approx 2144.66\\text{ m}^3'
        },
        {
          step: 2,
          title: 'Tính diện tích bề mặt vỏ cầu',
          explanation: 'Diện tích mặt cầu ngoài cần sơn:',
          latex: 'S = 4\\pi R^2 = 4 \\times 3.1416 \\times 8^2 \\approx 804.25\\text{ m}^2'
        },
        {
          step: 3,
          title: 'Tính khối lượng sơn cần dùng cho 2 lớp',
          explanation: 'Khối lượng sơn chống rỉ cho 2 lớp:',
          latex: 'm = 2 \\times S \\times 0.3 = 2 \\times 804.25 \\times 0.3 \\approx 482.55\\text{ kg}'
        }
      ],
      finalAnswer: 'Thể tích: 2144.7 m³ | Lượng sơn chống rỉ: 482.6 kg',
      practicalSignificance: 'Hình cầu chịu được áp suất bên trong đồng đều nhất, không có các góc nhọn hay cạnh biên yếu như hình hộp, giúp ngăn ngừa tối đa nguy cơ rò rỉ khí gas nén gây cháy nổ.'
    }
  ],
  cone: [
    {
      id: 'rw-cone-hat',
      shapeType: 'cone',
      title: 'Nón Lá Bài Thơ Xứ Huế & Nghệ Thuật Đan Lát',
      category: 'Văn hóa & Thủ công mỹ nghệ',
      badge: 'Truyền thống Việt Nam',
      icon: '👒',
      context: 'Chiếc nón lá truyền thống của các mẹ, các chị xứ Huế có dạng hình nón. Nghệ nhân làng nón Tây Hồ vót 16 vành tre tròn xếp đều từ đỉnh xuống vành nón. Chiếc nón có đường kính đáy d = 40 cm (bán kính r = 20 cm) và chiều cao h = 30 cm. Người ta phủ 2 lớp lá cọ lên mặt xung quanh để che mưa nắng.',
      givens: [
        { label: 'Đường kính đáy', value: 'd = 40\\text{ cm}', note: 'Bán kính r = 20 cm' },
        { label: 'Chiều cao nón', value: 'h = 30\\text{ cm}' },
        { label: 'Số lớp lá phủ', value: '2 lớp lá' },
        { label: 'Số pi', value: '\\pi \\approx 3.14' }
      ],
      question: 'a) Tính độ dài đường sinh l của chiếc nón lá.\nb) Tính diện tích lá cọ tối thiểu cần dùng để may chiếc nón (làm tròn đến hàng đơn vị).',
      hints: [
        {
          level: 1,
          title: 'Lần 1: Xác định dữ kiện',
          content: 'Hình nón có bán kính đáy $r = 20\\text{ cm}$, chiều cao $h = 30\\text{ cm}$. Chiếc nón lá chỉ phủ lá lên mặt xung quanh (không có đáy). Cần tính đường sinh $l$ trước bằng định lý Pythagore.'
        },
        {
          level: 2,
          title: 'Lần 2: Công thức áp dụng',
          content: 'Mối liên hệ tam giác vuông: $l = \\sqrt{h^2 + r^2}$. Diện tích xung quanh: $S_{xq} = \\pi r l$. Diện tích lá cho 2 lớp: $S_{\\text{lá}} = 2 \\times S_{xq}$.'
        },
        {
          level: 3,
          title: 'Lần 3: Thay số & phép tính',
          content: '$l = \\sqrt{30^2 + 20^2} = \\sqrt{900 + 400} = \\sqrt{1300} \\approx 36.06\\text{ cm}$. $S_{xq} = 3.14 \\times 20 \\times 36.06 \\approx 2264.6\\text{ cm}^2$. Nhân 2 lớp: $2 \\times 2264.6 \\approx 4529\\text{ cm}^2$.'
        },
        {
          level: 4,
          title: 'Lần 4: Kết luận & đơn vị',
          content: 'Đường sinh nón dài khoảng $36.1\\text{ cm}$. Tổng diện tích lá cọ cần dùng là khoảng $4529\\text{ cm}^2$ (khoảng $0.45\\text{ m}^2$).'
        }
      ],
      solutionSteps: [
        {
          step: 1,
          title: 'Tính độ dài đường sinh l của chiếc nón',
          explanation: 'Áp dụng định lý Pythagore trong tam giác vuông tạo bởi h, r, l:',
          latex: 'l = \\sqrt{h^2 + r^2} = \\sqrt{30^2 + 20^2} = \\sqrt{1300} \\approx 36.06\\text{ cm}'
        },
        {
          step: 2,
          title: 'Tính diện tích xung quanh một lớp lá',
          explanation: 'Áp dụng công thức diện tích xung quanh hình nón:',
          latex: 'S_{xq} = \\pi r l = 3.14 \\times 20 \\times 36.06 \\approx 2264.57\\text{ cm}^2'
        },
        {
          step: 3,
          title: 'Tính tổng diện tích lá cho 2 lớp may nón',
          explanation: 'Vì người thợ lợp 2 lớp lá cọ để nón không bị thấm nước mưa:',
          latex: 'S_{\\text{tổng}} = 2 \\times S_{xq} = 2 \\times 2264.57 \\approx 4529.14\\text{ cm}^2'
        }
      ],
      finalAnswer: 'Đường sinh l ≈ 36.06 cm | Diện tích lá Stổng ≈ 4529 cm² (0.45 m²)',
      practicalSignificance: 'Nhờ có độ dốc của hình nón ($h = 30\\text{ cm}$), nước mưa chảy dốc xuống nhanh chóng mà không đọng lại trên mặt nón, giữ cho đầu người đội luôn khô ráo.'
    },
    {
      id: 'rw-cone-funnel',
      shapeType: 'cone',
      title: 'Phễu Rót Dung Dịch Phòng Thí Nghiệm Hóa Học',
      category: 'Khoa học & Kỹ thuật thí nghiệm',
      badge: 'Khoa học tự nhiên',
      icon: '⚗️',
      context: 'Trong phòng thí nghiệm trường THCS, một chiếc phễu thủy tinh dùng để lọc dung dịch có phần thân dạng hình nón ngược với đường kính miệng phễu d = 10 cm (r = 5 cm) và chiều cao h = 12 cm. Người ta rót dung dịch vào phễu đến độ cao 8 cm.',
      givens: [
        { label: 'Miệng phễu', value: 'r = 5\\text{ cm}' },
        { label: 'Chiều cao phễu', value: 'h = 12\\text{ cm}' },
        { label: 'Số pi', value: '\\pi \\approx 3.14' }
      ],
      question: 'Tính dung tích chứa tối đa của chiếc phễu hình nón (khi đầy phễu).',
      hints: [
        {
          level: 1,
          title: 'Lần 1: Xác định dữ kiện',
          content: 'Phần chứa của phễu là khối nón có bán kính đáy $r = 5\\text{ cm}$ và chiều cao $h = 12\\text{ cm}$. Ta cần tính thể tích khối nón.'
        },
        {
          level: 2,
          title: 'Lần 2: Công thức áp dụng',
          content: 'Công thức thể tích hình nón: $V = \\frac{1}{3}\\pi r^2 h$. Chú ý có hệ số $\\frac{1}{3}$.'
        },
        {
          level: 3,
          title: 'Lần 3: Thay số & phép tính',
          content: '$V = \\frac{1}{3} \\times 3.14 \\times 5^2 \\times 12 = \\frac{1}{3} \\times 3.14 \\times 25 \\times 12 = 3.14 \\times 25 \\times 4 = 314\\text{ cm}^3$.'
        },
        {
          level: 4,
          title: 'Lần 4: Kết luận & đơn vị',
          content: 'Dung tích phễu là $314\\text{ cm}^3$ hay $314\\text{ ml}$ dung dịch.'
        }
      ],
      solutionSteps: [
        {
          step: 1,
          title: 'Tính thể tích khối nón của chiếc phễu',
          explanation: 'Áp dụng công thức thể tích khối nón:',
          latex: 'V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} \\times 3.14 \\times 5^2 \\times 12 = 3.14 \\times 25 \\times 4 = 314\\text{ cm}^3'
        },
        {
          step: 2,
          title: 'Quy đổi dung tích sang mililít (ml)',
          explanation: 'Vì $1\\text{ cm}^3 = 1\\text{ ml}$, dung tích tối đa của chiếc phễu là:',
          latex: 'V = 314\\text{ ml}'
        }
      ],
      finalAnswer: 'Dung tích phễu: 314 cm³ (314 ml)',
      practicalSignificance: 'Phễu nón thu hẹp dần tiết diện xuống dưới giúp dòng chảy hội tụ vào ống nghiệm nhỏ mà không bị sánh đổ ra bàn thí nghiệm.'
    }
  ]
};

interface RealWorldProblemProps {
  shapeType: ShapeType;
  onCompleted?: () => void;
}

export const RealWorldProblem: React.FC<RealWorldProblemProps> = ({ shapeType, onCompleted }) => {
  const scenarios = SCENARIOS_DATA[shapeType] || SCENARIOS_DATA.cylinder;
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [hintLevel, setHintLevel] = useState(0); // 0 = no hints, 1 = givens, 2 = formula, 3 = substitution, 4 = conclusion
  const [showSolution, setShowSolution] = useState(false);
  const [studentThoughts, setStudentThoughts] = useState('');
  const [completedScenarios, setCompletedScenarios] = useState<Record<string, boolean>>({});

  const current = scenarios[selectedIdx];

  const handleNextHint = () => {
    if (hintLevel < 4) {
      setHintLevel((prev) => prev + 1);
    }
  };

  const handleToggleSolution = () => {
    const nextState = !showSolution;
    setShowSolution(nextState);
    if (nextState) {
      const updated = { ...completedScenarios, [current.id]: true };
      setCompletedScenarios(updated);
      if (onCompleted) {
        onCompleted();
      }
    }
  };

  const handleSwitchScenario = (idx: number) => {
    setSelectedIdx(idx);
    setHintLevel(0);
    setShowSolution(false);
    setStudentThoughts('');
  };

  return (
    <div className="space-y-6">
      {/* Scenario Selector Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-[#766A61] uppercase tracking-wider shrink-0 mr-1">
          Chọn tình huống:
        </span>
        {scenarios.map((sc, idx) => (
          <button
            key={sc.id}
            type="button"
            onClick={() => handleSwitchScenario(idx)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedIdx === idx
                ? 'bg-[#8F3E32] text-white shadow-xs'
                : 'bg-[#F4EEE4] text-[#594D46] hover:bg-[#EADBCC]'
            }`}
          >
            <span>{sc.icon}</span>
            <span>{sc.title}</span>
            {completedScenarios[sc.id] && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        ))}
      </div>

      {/* Main Problem Container */}
      <div className="bg-[#FFFDF8] border border-[#E5DCCF] rounded-2xl p-5 sm:p-6 space-y-6 shadow-xs">
        {/* Header with badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5DCCF]/80 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{current.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FDF0ED] text-[#8F3E32] text-[11px] font-bold uppercase border border-[#F4D2CA]">
                  {current.category}
                </span>
                <span className="text-xs text-[#766A61] font-medium">{current.badge}</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3A302B] mt-0.5">
                {current.title}
              </h3>
            </div>
          </div>
        </div>

        {/* 1. BỐI CẢNH */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8F3E32] uppercase tracking-wider">
            <Globe className="w-4 h-4" />
            <span>1. Bối Cảnh Thực Tế</span>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DCCF] text-xs sm:text-sm text-[#3A302B] leading-relaxed">
            <MathText text={current.context} />
          </div>
        </div>

        {/* 2. DỮ KIỆN */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8F3E32] uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>2. Dữ Kiện Bài Toán</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {current.givens.map((g, gIdx) => (
              <div key={gIdx} className="p-3.5 rounded-xl bg-white border border-[#E5DCCF] space-y-1">
                <span className="text-[11px] font-bold text-[#766A61] uppercase">{g.label}</span>
                <div className="font-mono text-sm font-bold text-[#8F3E32]">
                  <MathFormula formula={g.value} display="inline" />
                </div>
                {g.note && <div className="text-[11px] text-[#766A61]">{g.note}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* 3. YÊU CẦU */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8F3E32] uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>3. Yêu Cầu Cần Giải Quyết</span>
          </div>
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs sm:text-sm font-medium leading-relaxed">
            <MathText text={current.question} />
          </div>
        </div>

        {/* 4. HỌC SINH SUY NGHĨ (Interactive Workspace) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#594D46] uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>4. Góc Suy Nghĩ &amp; Nháp Của Bạn</span>
            </div>
            <span className="text-[11px] text-[#766A61]">Ghi lại hướng giải hoặc số tính nháp</span>
          </div>
          <textarea
            value={studentThoughts}
            onChange={(e) => setStudentThoughts(e.target.value)}
            placeholder="Ví dụ: Đã có r và h, mình sẽ tính thể tích V = πr²h trước..."
            className="w-full h-20 p-3 rounded-xl bg-white border border-[#E5DCCF] text-xs sm:text-sm text-[#3A302B] focus:outline-none focus:ring-2 focus:ring-[#8F3E32]/30 resize-none font-sans"
          />
        </div>

        {/* 5. GỢI Ý TỪNG BƯỚC (Section X) */}
        <div className="space-y-3 pt-1 border-t border-[#E5DCCF]/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8F3E32] uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>5. Hệ Thống Gợi Ý Từng Bước (Cấp độ: {hintLevel}/4)</span>
            </div>
            {hintLevel < 4 && (
              <button
                type="button"
                onClick={handleNextHint}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
                <span>{hintLevel === 0 ? 'Xem Gợi Ý Lần 1' : `Xem Gợi Ý Lần ${hintLevel + 1}`}</span>
              </button>
            )}
          </div>

          {hintLevel > 0 ? (
            <div className="space-y-2.5">
              {current.hints.slice(0, hintLevel).map((h, hIdx) => (
                <div
                  key={hIdx}
                  className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/80 space-y-1 text-xs sm:text-sm"
                >
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>{h.title}</span>
                  </div>
                  <div className="text-amber-950 pl-3.5">
                    <MathText text={h.content} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-[#766A61] italic bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DCCF]">
              💡 Bạn chưa biết bắt đầu từ đâu? Bấm nút <strong>"Xem Gợi Ý Lần 1"</strong> ở trên để nhận hướng dẫn xác định dữ kiện mà không làm lộ trước lời giải!
            </div>
          )}
        </div>

        {/* 6. NÚT XEM LỜI GIẢI CHI TIẾT */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleToggleSolution}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              showSolution
                ? 'bg-[#594D46] text-white hover:bg-[#3A302B]'
                : 'bg-[#8F3E32] text-white hover:bg-[#723228] shadow-xs'
            }`}
          >
            {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showSolution ? 'Ẩn Lời Giải Chi Tiết' : 'Xem Lời Giải & Kết Luận'}</span>
          </button>

          {showSolution && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Đã hoàn thành khám phá tình huống này (+100 XP)</span>
            </div>
          )}
        </div>

        {/* 7. GIẢI CHI TIẾT & KẾT LUẬN (Chỉ hiển thị khi bấm Xem Lời Giải) */}
        {showSolution && (
          <div className="space-y-4 pt-4 border-t border-[#E5DCCF] animate-fadeIn">
            <h4 className="font-serif font-bold text-sm sm:text-base text-[#3A302B] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8F3E32]" />
              <span>Lời Giải Từng Bước Chuẩn Mực</span>
            </h4>

            <div className="space-y-3">
              {current.solutionSteps.map((step) => (
                <div key={step.step} className="p-4 rounded-xl bg-white border border-[#E5DCCF] space-y-2">
                  <div className="font-bold text-xs sm:text-sm text-[#8F3E32]">
                    Bước {step.step}: {step.title}
                  </div>
                  <p className="text-xs sm:text-sm text-[#594D46]">
                    <MathText text={step.explanation} />
                  </p>
                  {step.latex && (
                    <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E5DCCF]/60 text-center font-mono text-xs sm:text-sm">
                      <MathFormula formula={step.latex} display="block" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 8. KẾT LUẬN & Ý NGHĨA THỰC TIỄN */}
            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 space-y-2">
              <div className="font-bold text-xs sm:text-sm text-emerald-900">
                Đáp Số &amp; Kết Luận: {current.finalAnswer}
              </div>
              <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed">
                <strong>Ý nghĩa thực tế:</strong> {current.practicalSignificance}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
