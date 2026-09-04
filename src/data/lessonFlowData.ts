/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - STEP-BY-STEP PEDAGOGICAL LESSON FLOW DATA (GRADE 9)
 * Strict Contract for each Shape:
 * Step 0: Intro (Idle)
 * Step 1: Quan sát & Nhận diện (Observe)
 * Step 2: Xác định đại lượng & Kích thước (Identify & Parameters)
 * Step 3: Sự tạo thành / Quét không gian (Formation & 3D Sweep)
 * Step 4: Mô hình hóa & Khai triển (Unfolding & Modeling)
 * Step 5: Công thức cốt lõi & Tính toán thực tế (Formulas & Math)
 * Step 6: Thử thách kiểm tra nhanh (Micro-Quiz)
 * Step 7: Tổng kết & Hoàn thành (Conclusion & Mastery)
 */

import { ShapeType } from '../types';

export interface LessonStep {
  stepNumber: number;
  phase: 'INTRO' | 'OBSERVE' | 'IDENTIFY' | 'FORMATION' | 'MODELING' | 'FORMULA' | 'QUIZ' | 'COMPLETED';
  title: string;
  subtitle: string;
  badge: string;
  instruction: string;
  mathExplanation?: string;
  formulaLatex?: string;
  activeComponentId: string;
  highlightTarget: string;
  recommended3DMode?: 'explore' | 'formation' | 'net' | 'section' | 'liquid' | 'volume_compare';
  actionTrigger?: string;
  observationCheck?: {
    prompt: string;
    yesText: string;
    noText: string;
    hintText: string;
  };
  quiz?: {
    question: string;
    options: { id: string; text: string; isCorrect: boolean; feedback: string }[];
  };
}

export const SHAPE_LESSON_FLOWS: Record<ShapeType, LessonStep[]> = {
  cylinder: [
    {
      stepNumber: 0,
      phase: 'INTRO',
      title: 'Giới Thiệu Hình Trụ (Toán 9)',
      subtitle: 'Khám phá trực quan cấu trúc không gian và công thức hình học',
      badge: 'Khởi động',
      instruction: 'Chào mừng em đến với phòng thí nghiệm Hình Trụ! Nhấn nút **[BẮT ĐẦU]** bên dưới để bước vào hành trình khám phá 7 bước trực quan.',
      activeComponentId: 'all',
      highlightTarget: 'cylinder',
      recommended3DMode: 'explore'
    },
    {
      stepNumber: 1,
      phase: 'OBSERVE',
      title: 'Bước 1: Quan sát cấu trúc hai đáy & trục',
      subtitle: 'Nhận diện các thành phần cơ bản của hình trụ',
      badge: 'Quan sát 3D',
      instruction: 'Em hãy xoay mô hình 3D để quan sát: Hình trụ gồm **hai mặt đáy** là hai hình tròn song song bằng nhau, và **trục quay $OO\'$** vuông góc với hai đáy.',
      mathExplanation: 'Hai đáy có tâm là $O$ và $O\'$. Khoảng cách giữa hai tâm $OO\' = h$ chính là chiều cao.',
      formulaLatex: 'S_{\\text{đáy}} = \\pi r^2',
      activeComponentId: 'base',
      highlightTarget: 'base',
      recommended3DMode: 'explore',
      actionTrigger: 'SPIN_360',
      observationCheck: {
        prompt: 'Em đã xác định được hai mặt đáy và trục OO\' trên mô hình chưa?',
        yesText: 'Đã quan sát rõ',
        noText: 'Chưa rõ',
        hintText: 'Hãy thử dùng chuột hoặc ngón tay xoay mô hình 3D nhìn từ trên xuống để thấy rõ 2 hình tròn đáy nhé!'
      }
    },
    {
      stepNumber: 2,
      phase: 'IDENTIFY',
      title: 'Bước 2: Bán kính đáy $r$, Chiều cao $h$ & Đường sinh $l$',
      subtitle: 'Mối quan hệ đặc biệt giữa chiều cao và đường sinh',
      badge: 'Đại lượng',
      instruction: 'Trên hình trụ, đoạn thẳng nối hai điểm tương ứng trên hai đường tròn đáy song song với trục được gọi là **đường sinh ($l$)**.',
      mathExplanation: 'Với hình trụ thẳng đứng, mọi đường sinh đều vuông góc với mặt đáy và luôn có độ dài bằng đúng chiều cao: $l = h = OO\'$.',
      formulaLatex: 'l = h = OO\', \\quad d = 2r',
      activeComponentId: 'generatrix',
      highlightTarget: 'generatrix',
      recommended3DMode: 'explore',
      observationCheck: {
        prompt: 'Em có nhận thấy đường sinh l luôn có độ dài bằng chiều cao h không?',
        yesText: 'Đã hiểu l = h',
        noText: 'Giải thích thêm',
        hintText: 'Khi cắt hình trụ bởi mặt phẳng song song với trục, thiết diện thu được là hình chữ nhật có chiều dài chính bằng đường sinh l và bằng chiều cao h.'
      }
    },
    {
      stepNumber: 3,
      phase: 'FORMATION',
      title: 'Bước 3: Sự tạo thành hình trụ từ phép quay',
      subtitle: 'Quay một hình chữ nhật quanh một cạnh cố định',
      badge: 'Sự tạo thành',
      instruction: 'Khi quay một hình chữ nhật $OO\'A\'A$ một vòng (360°) quanh cạnh cố định $OO\'$, ta sẽ quét ra một **hình trụ**.',
      mathExplanation: 'Cạnh $OO\'$ quét thành trục, cạnh $AA\'$ quét thành mặt xung quanh, hai cạnh $OA$ và $O\'A\'$ quét thành hai hình tròn đáy.',
      formulaLatex: 'OO\'A\'A \\xrightarrow{\\text{Quay } 360^\\circ \\text{ quanh } OO\'} \\text{Hình Trụ}',
      activeComponentId: 'axis',
      highlightTarget: 'axis',
      recommended3DMode: 'formation',
      actionTrigger: 'START_FORMATION'
    },
    {
      stepNumber: 4,
      phase: 'MODELING',
      title: 'Bước 4: Khai triển trải phẳng mặt xung quanh',
      subtitle: 'Mặt xung quanh mở ra thành hình chữ nhật',
      badge: 'Trải phẳng 3D',
      instruction: 'Khi cắt mặt xung quanh của hình trụ dọc theo một đường sinh rồi trải phẳng ra:',
      mathExplanation: 'Mặt xung quanh biến thành một **hình chữ nhật** có: \n- Chiều rộng bằng chiều cao hình trụ ($h$).\n- Chiều dài bằng chu vi đường tròn đáy ($C = 2\\pi r$).',
      formulaLatex: 'S_{xq} = C_{\\text{đáy}} \\cdot h = 2\\pi r h',
      activeComponentId: 'lateral',
      highlightTarget: 'lateral',
      recommended3DMode: 'net',
      actionTrigger: 'START_UNFOLD'
    },
    {
      stepNumber: 5,
      phase: 'FORMULA',
      title: 'Bước 5: Hệ thống công thức & Tính toán thực tế',
      subtitle: 'Nắm vững các công thức trọng tâm thi vào 10',
      badge: 'Công thức',
      instruction: 'Hãy ghi nhớ 3 công thức vàng của hình trụ:',
      mathExplanation: '1. Diện tích xung quanh: $S_{xq} = 2\\pi rh$\n2. Diện tích toàn phần: $S_{tp} = 2\\pi rh + 2\\pi r^2$\n3. Thể tích hình trụ: $V = S_{\\text{đáy}} \\cdot h = \\pi r^2 h$',
      formulaLatex: 'V = \\pi r^2 h, \\quad S_{tp} = 2\\pi r (h + r)',
      activeComponentId: 'all',
      highlightTarget: 'cylinder',
      recommended3DMode: 'explore'
    },
    {
      stepNumber: 6,
      phase: 'QUIZ',
      title: 'Bước 6: Thử thách kiểm tra nhanh',
      subtitle: 'Kiểm tra độ hiểu bài ngay lập tức',
      badge: 'Thử thách',
      instruction: 'Hãy trả lời câu hỏi trắc nghiệm ngắn dưới đây để hoàn tất bài học:',
      activeComponentId: 'all',
      highlightTarget: 'cylinder',
      recommended3DMode: 'explore',
      quiz: {
        question: 'Một hình trụ có bán kính đáy $r = 4\\text{ cm}$ và chiều cao $h = 8\\text{ cm}$. Thể tích của hình trụ là bao nhiêu?',
        options: [
          {
            id: 'A',
            text: '32π cm³',
            isCorrect: false,
            feedback: 'Chưa đúng rồi! Em bị nhầm do lấy π·r·h (thiếu bình phương r²).'
          },
          {
            id: 'B',
            text: '128π cm³',
            isCorrect: true,
            feedback: 'Xuất sắc! V = π·r²·h = π·4²·8 = π·16·8 = 128π cm³ (≈ 402,12 cm³).'
          },
          {
            id: 'C',
            text: '64π cm³',
            isCorrect: false,
            feedback: 'Chưa chính xác! Em hãy tính lại 4² = 16, rồi nhân 16 × 8 nhé.'
          },
          {
            id: 'D',
            text: '256π cm³',
            isCorrect: false,
            feedback: 'Chưa đúng! Em kiểm tra lại phép tính π·16·8 nhé.'
          }
        ]
      }
    },
    {
      stepNumber: 7,
      phase: 'COMPLETED',
      title: 'Bước 7: Chúc mừng em đã làm chủ Hình Trụ!',
      subtitle: 'Đã hoàn thành xuất sắc 7 bước khám phá trực quan',
      badge: 'Hoàn thành',
      instruction: 'Em đã nắm vững cấu trúc 3D, sự tạo thành, mô hình trải phẳng và toàn bộ công thức tính diện tích, thể tích hình trụ.',
      mathExplanation: 'Hãy tiếp tục chuyển sang phần **Luyện tập bài tập** hoặc khám phá thêm **Hình Nón** và **Hình Cầu** nhé!',
      activeComponentId: 'all',
      highlightTarget: 'cylinder',
      recommended3DMode: 'explore'
    }
  ],

  cone: [
    {
      stepNumber: 0,
      phase: 'INTRO',
      title: 'Giới Thiệu Hình Nón (Toán 9)',
      subtitle: 'Khám phá tam giác vuông quay quanh trục và nghịch lý thể tích 1/3',
      badge: 'Khởi động',
      instruction: 'Chào mừng em đến với bài học Hình Nón! Nhấn nút **[BẮT ĐẦU]** bên dưới để bước vào hành trình khám phá 7 bước trực quan.',
      activeComponentId: 'all',
      highlightTarget: 'cone',
      recommended3DMode: 'explore'
    },
    {
      stepNumber: 1,
      phase: 'OBSERVE',
      title: 'Bước 1: Quan sát đỉnh S, mặt đáy và chiều cao',
      subtitle: 'Nhận diện cấu trúc không gian của hình nón',
      badge: 'Quan sát 3D',
      instruction: 'Hình nón có một **đỉnh $S$**, một **mặt đáy** là hình tròn tâm $O$, và đoạn thẳng $SO$ vuông góc với mặt đáy là **chiều cao ($h$)**.',
      mathExplanation: 'Đoạn nối đỉnh $S$ với một điểm bất kỳ trên đường tròn đáy được gọi là **đường sinh ($l = SA$)**.',
      formulaLatex: 'S: \\text{Đỉnh}, \\quad SO = h, \\quad OA = r, \\quad SA = l',
      activeComponentId: 'vertex',
      highlightTarget: 'vertex',
      recommended3DMode: 'explore',
      actionTrigger: 'SPIN_360',
      observationCheck: {
        prompt: 'Em đã thấy rõ đỉnh S, chiều cao SO và đường sinh SA chưa?',
        yesText: 'Đã thấy rõ',
        noText: 'Chưa rõ',
        hintText: 'Xoay mô hình nón để thấy đỉnh S ở trên cao và trục SO vuông góc với đáy tròn tâm O.'
      }
    },
    {
      stepNumber: 2,
      phase: 'IDENTIFY',
      title: 'Bước 2: Mối liên hệ Pythagore ($l^2 = h^2 + r^2$)',
      subtitle: 'Tam giác vuông SOA tạo nên mối quan hệ giữa ba đại lượng cốt lõi',
      badge: 'Định lý Pythagore',
      instruction: 'Tam giác $SOA$ vuông tại $O$, do đó theo định lý Pythagore:',
      mathExplanation: '$$l^2 = h^2 + r^2 \\implies l = \\sqrt{h^2 + r^2}$$\nNếu biết 2 trong 3 đại lượng $(r, h, l)$, ta luôn tìm được đại lượng còn lại.',
      formulaLatex: 'l = \\sqrt{h^2 + r^2}, \\quad h = \\sqrt{l^2 - r^2}, \\quad r = \\sqrt{l^2 - h^2}',
      activeComponentId: 'generatrix',
      highlightTarget: 'generatrix',
      recommended3DMode: 'explore',
      observationCheck: {
        prompt: 'Nếu r = 3 cm và h = 4 cm, em có tính được l = 5 cm không?',
        yesText: 'Đã tính ra l = 5cm',
        noText: 'Cần hướng dẫn',
        hintText: 'Áp dụng Pythagore: l² = 3² + 4² = 9 + 16 = 25 => l = √25 = 5 cm.'
      }
    },
    {
      stepNumber: 3,
      phase: 'FORMATION',
      title: 'Bước 3: Sự tạo thành hình nón từ tam giác vuông',
      subtitle: 'Quay tam giác vuông SOA quanh trục SO một vòng',
      badge: 'Sự tạo thành',
      instruction: 'Khi quay tam giác vuông $SOA$ một vòng (360°) quanh cạnh góc vuông cố định $SO$:',
      mathExplanation: 'Cạnh huyền $SA$ quét thành **mặt xung quanh**, cạnh góc vuông $OA$ quét thành **hình tròn đáy**.',
      formulaLatex: '\\Delta SOA \\text{ vuông tại } O \\xrightarrow{\\text{Quay } 360^\\circ \\text{ quanh } SO} \\text{Hình Nón}',
      activeComponentId: 'axis',
      highlightTarget: 'axis',
      recommended3DMode: 'formation',
      actionTrigger: 'START_FORMATION'
    },
    {
      stepNumber: 4,
      phase: 'MODELING',
      title: 'Bước 4: Trải phẳng mặt xung quanh & Hệ số 1/3',
      subtitle: 'Mặt xung quanh là hình quạt tròn bán kính l',
      badge: 'Trải phẳng & Thể tích',
      instruction: 'Khi cắt mặt xung quanh theo một đường sinh và trải phẳng ra, ta được một **hình quạt tròn** bán kính $l$ với độ dài cung bằng chu vi đáy ($2\\pi r$).',
      mathExplanation: 'Đặc biệt, thể tích hình nón bằng đúng **một phần ba** thể tích hình trụ có cùng đáy và chiều cao: $V_{\\text{nón}} = \\frac{1}{3}\\pi r^2 h$.',
      formulaLatex: 'S_{xq} = \\pi r l, \\quad V = \\frac{1}{3}\\pi r^2 h',
      activeComponentId: 'lateral',
      highlightTarget: 'lateral',
      recommended3DMode: 'liquid',
      actionTrigger: 'START_LIQUID'
    },
    {
      stepNumber: 5,
      phase: 'FORMULA',
      title: 'Bước 5: Hệ thống công thức Hình Nón chuẩn',
      subtitle: 'Các công thức cốt lõi ôn thi vào 10',
      badge: 'Công thức',
      instruction: 'Hãy ghi nhớ 4 công thức trọng tâm của hình nón:',
      mathExplanation: '1. Đường sinh: $l = \\sqrt{h^2 + r^2}$\n2. Diện tích xung quanh: $S_{xq} = \\pi r l$\n3. Diện tích toàn phần: $S_{tp} = \\pi r l + \\pi r^2$\n4. Thể tích hình nón: $V = \\frac{1}{3}\\pi r^2 h$',
      formulaLatex: 'S_{xq} = \\pi r l, \\quad S_{tp} = \\pi r (l + r), \\quad V = \\frac{1}{3}\\pi r^2 h',
      activeComponentId: 'all',
      highlightTarget: 'cone',
      recommended3DMode: 'explore'
    },
    {
      stepNumber: 6,
      phase: 'QUIZ',
      title: 'Bước 6: Thử thách kiểm tra nhanh',
      subtitle: 'Kiểm tra độ hiểu bài ngay lập tức',
      badge: 'Thử thách',
      instruction: 'Hãy chọn đáp án đúng cho câu hỏi sau:',
      activeComponentId: 'all',
      highlightTarget: 'cone',
      recommended3DMode: 'explore',
      quiz: {
        question: 'Một hình nón có bán kính đáy $r = 3\\text{ cm}$ và chiều cao $h = 4\\text{ cm}$. Diện tích xung quanh $S_{xq}$ của hình nón là:',
        options: [
          {
            id: 'A',
            text: '12π cm²',
            isCorrect: false,
            feedback: 'Chưa đúng! Em lấy r·h thay vì r·l. Nhớ tìm đường sinh l trước nhé!'
          },
          {
            id: 'B',
            text: '15π cm²',
            isCorrect: true,
            feedback: 'Rất chính xác! Đường sinh l = √(3² + 4²) = 5 cm. Sxq = π·r·l = π·3·5 = 15π cm².'
          },
          {
            id: 'C',
            text: '24π cm²',
            isCorrect: false,
            feedback: 'Chưa chính xác! Diện tích toàn phần mới là 15π + 9π = 24π cm².'
          },
          {
            id: 'D',
            text: '36π cm²',
            isCorrect: false,
            feedback: 'Chưa đúng rồi! Em hãy kiểm tra lại công thức Sxq = π·r·l nhé.'
          }
        ]
      }
    },
    {
      stepNumber: 7,
      phase: 'COMPLETED',
      title: 'Bước 7: Chúc mừng em đã làm chủ Hình Nón!',
      subtitle: 'Đã hoàn thành xuất sắc 7 bước khám phá trực quan',
      badge: 'Hoàn thành',
      instruction: 'Em đã nắm vững cấu trúc, định lý Pythagore liên hệ $(r, h, l)$, thí nghiệm rót nước 1/3 và các công thức tính diện tích, thể tích hình nón.',
      mathExplanation: 'Hãy tiếp tục làm thêm bài tập hoặc khám phá **Hình Cầu** nhé!',
      activeComponentId: 'all',
      highlightTarget: 'cone',
      recommended3DMode: 'explore'
    }
  ],

  sphere: [
    {
      stepNumber: 0,
      phase: 'INTRO',
      title: 'Giới Thiệu Hình Cầu & Mặt Cầu (Toán 9)',
      subtitle: 'Khám phá sự đối xứng hoàn hảo trong không gian 3D',
      badge: 'Khởi động',
      instruction: 'Chào mừng em đến với bài học Hình Cầu! Nhấn nút **[BẮT ĐẦU]** bên dưới để bước vào hành trình khám phá 7 bước trực quan.',
      activeComponentId: 'all',
      highlightTarget: 'sphere',
      recommended3DMode: 'explore'
    },
    {
      stepNumber: 1,
      phase: 'OBSERVE',
      title: 'Bước 1: Quan sát tâm O và Bán kính R',
      subtitle: 'Khái niệm mặt cầu và khối cầu',
      badge: 'Quan sát 3D',
      instruction: 'Tập hợp các điểm trong không gian cách điểm $O$ cố định một khoảng bằng $R$ $(R > 0)$ được gọi là **mặt cầu** tâm $O$, bán kính $R$.',
      mathExplanation: 'Khối cầu tâm $O$ bán kính $R$ bao gồm mặt cầu và tất cả các điểm nằm bên trong mặt cầu đó.',
      formulaLatex: 'OA = R, \\quad d = 2R',
      activeComponentId: 'center',
      highlightTarget: 'center',
      recommended3DMode: 'explore',
      actionTrigger: 'SPIN_360',
      observationCheck: {
        prompt: 'Em có nhận thấy mọi điểm trên mặt cầu đều cách đều tâm O một khoảng bằng R không?',
        yesText: 'Đã hiểu rõ',
        noText: 'Chưa rõ',
        hintText: 'Xoay mô hình để thấy tia bán kính nối từ tâm O đến bất kỳ điểm nào trên vỏ mặt cầu đều có độ dài bằng nhau.'
      }
    },
    {
      stepNumber: 2,
      phase: 'IDENTIFY',
      title: 'Bước 2: Đường kính $d = 2R$ & Tính đối xứng',
      subtitle: 'Mặt cầu là hình có tính đối xứng vô hạn',
      badge: 'Tính đối xứng',
      instruction: 'Đoạn thẳng đi qua tâm $O$ nối hai điểm trên mặt cầu là **đường kính ($d = 2R$)**.',
      mathExplanation: 'Tâm $O$ là tâm đối xứng, và mọi mặt phẳng đi qua tâm $O$ đều là mặt phẳng đối xứng của hình cầu.',
      formulaLatex: 'd = 2R, \\quad C_{\\text{xích đạo}} = 2\\pi R',
      activeComponentId: 'radius',
      highlightTarget: 'radius',
      recommended3DMode: 'explore'
    },
    {
      stepNumber: 3,
      phase: 'FORMATION',
      title: 'Bước 3: Sự tạo thành hình cầu',
      subtitle: 'Nửa hình tròn quay quanh đường kính cố định',
      badge: 'Sự tạo thành',
      instruction: 'Khi quay một nửa hình tròn tâm $O$ bán kính $R$ một vòng (360°) quanh đường kính cố định của nó:',
      mathExplanation: 'Nửa đường tròn quét thành **mặt cầu**, và toàn bộ nửa hình tròn quét thành **khối cầu**.',
      formulaLatex: '\\text{Nửa hình tròn } (O, R) \\xrightarrow{\\text{Quay } 360^\\circ \\text{ quanh đường kính}} \\text{Hình Cầu}',
      activeComponentId: 'axis',
      highlightTarget: 'axis',
      recommended3DMode: 'explore',
      actionTrigger: 'START_FORMATION'
    },
    {
      stepNumber: 4,
      phase: 'MODELING',
      title: 'Bước 4: Cắt mặt phẳng & Đường tròn lớn',
      subtitle: 'Thiết diện khi cắt hình cầu bởi mặt phẳng',
      badge: 'Cắt mặt phẳng',
      instruction: 'Khi cắt một hình cầu bán kính $R$ bởi một mặt phẳng đi qua tâm $O$, thiết diện thu được luôn là một **đường tròn lớn** có bán kính đúng bằng $R$.',
      mathExplanation: 'Chu vi đường tròn lớn: $C = 2\\pi R$.\nDiện tích hình tròn lớn: $S = \\pi R^2$.',
      formulaLatex: 'S_{\\text{tròn lớn}} = \\pi R^2, \\quad C_{\\text{tròn lớn}} = 2\\pi R',
      activeComponentId: 'section',
      highlightTarget: 'section',
      recommended3DMode: 'section',
      actionTrigger: 'TOGGLE_SECTION'
    },
    {
      stepNumber: 5,
      phase: 'FORMULA',
      title: 'Bước 5: Công thức Diện tích mặt cầu & Thể tích khối cầu',
      subtitle: 'Hệ thống công thức chuẩn môn Toán 9',
      badge: 'Công thức',
      instruction: 'Hãy ghi nhớ 2 công thức cốt lõi của hình cầu:',
      mathExplanation: '1. Diện tích mặt cầu: $$S = 4\\pi R^2 = \\pi d^2$$\n(Gấp 4 lần diện tích hình tròn lớn!)\n2. Thể tích khối cầu: $$V = \\frac{4}{3}\\pi R^3 = \\frac{1}{6}\\pi d^3$$',
      formulaLatex: 'S = 4\\pi R^2, \\quad V = \\frac{4}{3}\\pi R^3',
      activeComponentId: 'all',
      highlightTarget: 'sphere',
      recommended3DMode: 'explore'
    },
    {
      stepNumber: 6,
      phase: 'QUIZ',
      title: 'Bước 6: Thử thách kiểm tra nhanh',
      subtitle: 'Kiểm tra độ hiểu bài ngay lập tức',
      badge: 'Thử thách',
      instruction: 'Hãy chọn đáp án đúng cho câu hỏi sau:',
      activeComponentId: 'all',
      highlightTarget: 'sphere',
      recommended3DMode: 'explore',
      quiz: {
        question: 'Một quả bóng hình cầu có bán kính $R = 3\\text{ cm}$. Thể tích của quả bóng là bao nhiêu?',
        options: [
          {
            id: 'A',
            text: '36π cm³',
            isCorrect: true,
            feedback: 'Chính xác 100%! V = (4/3)·π·R³ = (4/3)·π·27 = 36π cm³ (≈ 113,1 cm³).'
          },
          {
            id: 'B',
            text: '108π cm³',
            isCorrect: false,
            feedback: 'Chưa đúng! Em bị thiếu nhân hệ số 4/3 với R³ = 27.'
          },
          {
            id: 'C',
            text: '12π cm³',
            isCorrect: false,
            feedback: 'Chưa chính xác! Công thức tính thể tích là (4/3)πR³, không phải 4πR.'
          },
          {
            id: 'D',
            text: '27π cm³',
            isCorrect: false,
            feedback: 'Chưa đúng! Nhớ nhân thêm hệ số 4/3 nhé: (4/3) × 27 = 36.'
          }
        ]
      }
    },
    {
      stepNumber: 7,
      phase: 'COMPLETED',
      title: 'Bước 7: Chúc mừng em đã làm chủ Hình Cầu!',
      subtitle: 'Đã hoàn thành xuất sắc 7 bước khám phá trực quan',
      badge: 'Hoàn thành',
      instruction: 'Em đã nắm vững khái niệm tâm $O$, bán kính $R$, thiết diện đường tròn lớn và các công thức tính diện tích mặt cầu ($4\\pi R^2$), thể tích khối cầu ($\\frac{4}{3}\\pi R^3$).',
      mathExplanation: 'Tuyệt vời! Em đã hoàn thành trọn bộ 3 hình không gian Lớp 9: Trụ - Nón - Cầu.',
      activeComponentId: 'all',
      highlightTarget: 'sphere',
      recommended3DMode: 'explore'
    }
  ]
};
