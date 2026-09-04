/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - FOUR STEP PEDAGOGICAL SOLUTION ENGINE (THẦY HIẾU AI)
 * Always guarantees the 4-step canonical structure:
 * BƯỚC 1: XÁC ĐỊNH DỮ KIỆN (Given Data & Target, diameter->radius, unit conversion)
 * BƯỚC 2: CHỌN MÔ HÌNH / CÔNG THỨC (Why cylinder/cone/sphere, why pythagore, why volume conservation)
 * BƯỚC 3: TÍNH TOÁN (Step-by-step arithmetic without skipping)
 * BƯỚC 4: KẾT LUẬN (Final answer, unit, rounding, real-world meaning)
 */

import { SolutionStep } from '../../components/practice/SolutionTimeline';

export interface FourStepSolution {
  step1Given: SolutionStep;
  step2Formula: SolutionStep;
  step3Calculation: SolutionStep;
  step4Conclusion: SolutionStep;
  allSteps: SolutionStep[];
  teacherFeedback: {
    statusTitle: string;
    statusMessage: string;
    mistakeAnalysis?: string;
    encouragement: string;
  };
}

export interface FourStepInputContext {
  shape: 'cylinder' | 'cone' | 'sphere' | 'mixed';
  questionTitle?: string;
  questionText: string;
  data?: Record<string, any>;
  userAnswer?: any;
  expectedAnswer?: any;
  isCorrect: boolean;
  misconceptionKey?: string;
  unit?: string;
}

export class FourStepSolutionEngine {
  /**
   * Builds the empathetic and pedagogical Thầy Hiếu AI feedback message
   */
  public static buildTeacherFeedback(
    isCorrect: boolean,
    userAnswer: any,
    expectedAnswer: any,
    misconceptionKey?: string
  ): {
    statusTitle: string;
    statusMessage: string;
    mistakeAnalysis?: string;
    encouragement: string;
  } {
    if (isCorrect) {
      const encouragements = [
        'Tuyệt vời! Em đã nắm rất chắc bản chất hình học không gian và tính toán vô cùng chuẩn xác.',
        'Xuất sắc! Các bước tư duy của em rất mạch lạc và đúng chuẩn đáp án kỳ thi vào 10.',
        'Chuẩn không cần chỉnh! Cứ giữ vững phong độ này thì câu hình thực tế vào 10 chắc chắn trọn điểm em nhé!'
      ];
      return {
        statusTitle: 'Chính xác tuyệt đối!',
        statusMessage: 'Em đã tìm ra đáp án hoàn toàn chính xác.',
        encouragement: encouragements[Math.floor(Math.random() * encouragements.length)]
      };
    }

    // Friendly, psychologically supportive tone when student made an error
    let mistakeAnalysis = 'Em đang đi đúng hướng rồi, chỉ vấp ở một bước nhỏ thôi. Cùng Thầy kiểm tra lại nhé!';
    let stepFault = 'bước tính toán';

    if (misconceptionKey) {
      const key = misconceptionKey.toLowerCase();
      if (key.includes('radius') || key.includes('diameter') || key.includes('duong_kinh')) {
        stepFault = 'Bước 1 (Xác định dữ kiện)';
        mistakeAnalysis = 'Chưa đúng ở Bước 1 rồi nè. Đề bài cho **đường kính** $d$, nhưng trong công thức ta phải chia đôi để lấy **bán kính** $r = \\frac{d}{2}$ trước khi tính nhé!';
      } else if (key.includes('formula') || key.includes('cong_thuc') || key.includes('one_third') || key.includes('1/3')) {
        stepFault = 'Bước 2 (Chọn công thức)';
        mistakeAnalysis = 'Chưa đúng ở Bước 2. Em đã nhầm lẫn công thức (ví dụ: hình nón có hệ số $\\frac{1}{3}$, hoặc nhầm giữa diện tích xung quanh $S_{xq}$ và toàn phần $S_{tp}$). Thầy sửa cùng em nhé.';
      } else if (key.includes('unit') || key.includes('don_vi') || key.includes('liter')) {
        stepFault = 'Bước 4 (Đổi đơn vị)';
        mistakeAnalysis = 'Công thức tính đúng rồi nhưng em quên bước đổi đơn vị sang Lít hoặc $\\text{m}^3$ rồi ($1\\text{ m}^3 = 1000\\text{ lít}$). Chú ý chỗ này trong phòng thi nhé!';
      } else if (key.includes('square') || key.includes('binh_phuong')) {
        stepFault = 'Bước 3 (Tính toán)';
        mistakeAnalysis = 'Chưa chuẩn ở Bước 3. Em nhớ tính lũy thừa $r^2$ trước khi nhân với chiều cao $h$ nhé, không được gộp tắt bấm máy vội.';
      }
    }

    return {
      statusTitle: 'Chưa chính xác — Cùng Thầy sửa nhé!',
      statusMessage: `Khoan nản lòng nhé! Em chỉ vấp một chút ở ${stepFault}.`,
      mistakeAnalysis,
      encouragement: 'Không sao cả, sai lầm chính là cơ hội tốt nhất để nhớ sâu kiến thức. Xem kỹ 4 bước Thầy giải bên dưới nhé!'
    };
  }

  /**
   * Generates high-fidelity 4-step solution for any question
   */
  public static generate(context: FourStepInputContext): FourStepSolution {
    const { shape, questionText, data = {}, userAnswer, expectedAnswer, isCorrect, misconceptionKey, unit = '' } = context;

    const shapeLabel =
      shape === 'cylinder'
        ? 'Hình Trụ'
        : shape === 'cone'
        ? 'Hình Nón'
        : shape === 'sphere'
        ? 'Hình Cầu'
        : 'Hình Không Gian Ghép Khối';

    // BƯỚC 1: XÁC ĐỊNH DỮ KIỆN
    const givenList: string[] = [];
    if (data.r !== undefined) givenList.push(`- Bán kính đáy: $r = ${data.r}\\text{ ${data.unit || 'cm'}}$`);
    if (data.d !== undefined) {
      const calculatedR = Number(data.d) / 2;
      givenList.push(`- Đề bài cho đường kính: $d = ${data.d}\\text{ ${data.unit || 'cm'}} \\implies$ Bán kính đáy $r = \\frac{d}{2} = ${calculatedR}\\text{ ${data.unit || 'cm'}}$`);
    }
    if (data.R !== undefined) givenList.push(`- Bán kính mặt cầu: $R = ${data.R}\\text{ ${data.unit || 'cm'}}$`);
    if (data.h !== undefined) givenList.push(`- Chiều cao: $h = ${data.h}\\text{ ${data.unit || 'cm'}}$`);
    if (data.l !== undefined) givenList.push(`- Đường sinh: $l = ${data.l}\\text{ ${data.unit || 'cm'}}$`);

    if (givenList.length === 0) {
      givenList.push(`- Đọc kỹ đề bài và trích xuất các đại lượng hình học đã cho về cùng một đơn vị đo.`);
    }

    const step1: SolutionStep = {
      stepNumber: 1,
      title: 'Bước 1: Xác định dữ kiện & Mục tiêu',
      subtitle: 'Tóm tắt bài toán & Đổi đơn vị',
      description: `Đề bài cho các thông số của **${shapeLabel}**:\n${givenList.join('\n')}\n- **Mục tiêu cần tính:** Đại lượng bài toán yêu cầu tìm (${unit ? `đơn vị $\\text{${unit}}$` : 'đáp số chính xác'}).`,
      type: 'given',
      tip: data.d !== undefined ? '⚠️ Nhớ luôn kiểm tra xem đề cho bán kính $r$ hay đường kính $d$ trước khi áp dụng công thức!' : 'Đồng nhất toàn bộ đơn vị đo trước khi bắt đầu tính.'
    };

    // BƯỚC 2: CHỌN MÔ HÌNH / CÔNG THỨC
    let formulaExplanation = '';
    let formulaLatex = '';

    if (shape === 'cylinder') {
      formulaExplanation = 'Vật thể có dạng hình trụ (2 đáy hình tròn bằng nhau và song song, mặt xung quanh trải phẳng là hình chữ nhật). Do đó ta áp dụng công thức chuẩn:';
      formulaLatex = 'V = \\pi r^2 h, \\quad S_{xq} = 2\\pi rh, \\quad S_{tp} = 2\\pi rh + 2\\pi r^2';
    } else if (shape === 'cone') {
      formulaExplanation = 'Vật thể có dạng hình nón (1 đáy tròn và 1 đỉnh nhọn). Thiết diện qua trục là tam giác cân, trong đó chiều cao $h$, bán kính đáy $r$ và đường sinh $l$ liên hệ bởi định lý Pythagore:';
      formulaLatex = 'l = \\sqrt{r^2 + h^2}, \\quad S_{xq} = \\pi rl, \\quad V = \\frac{1}{3}\\pi r^2 h';
    } else if (shape === 'sphere') {
      formulaExplanation = 'Vật thể có dạng hình cầu đối xứng qua tâm. Áp dụng định lý về diện tích mặt cầu và thể tích khối cầu bán kính $R$:';
      formulaLatex = 'S = 4\\pi R^2, \\quad V = \\frac{4}{3}\\pi R^3';
    } else {
      formulaExplanation = 'Bài toán liên quan đến ghép khối hoặc bảo toàn thể tích (chìm vật thể / rót nước). Áp dụng định lý bảo toàn thể tích:';
      formulaLatex = '\\Delta V_{\\text{nước dâng}} = V_{\\text{vật chìm}}';
    }

    const step2: SolutionStep = {
      stepNumber: 2,
      title: 'Bước 2: Chọn mô hình & Công thức',
      subtitle: 'Giải thích cơ sở hình học',
      description: formulaExplanation,
      latex: formulaLatex,
      type: 'formula',
      tip: shape === 'cone' ? 'Chú ý hệ số $\\frac{1}{3}$ trong thể tích hình nón và dùng đường sinh $l$ cho diện tích xung quanh.' : undefined
    };

    // BƯỚC 3: TÍNH TOÁN
    let calcLines: string[] = [];
    if (shape === 'cylinder' && data.r && data.h) {
      const r = Number(data.r);
      const h = Number(data.h);
      calcLines = [
        `Thay số vào công thức:`,
        `$$V = \\pi \\cdot (${r})^2 \\cdot ${h} = \\pi \\cdot ${r * r} \\cdot ${h} = ${r * r * h}\\pi\\text{ ${data.unit || 'cm'}}^3$$`,
        `Nếu lấy $\\pi \\approx 3.14$: $$V \\approx 3.14 \\cdot ${r * r * h} = ${(3.14 * r * r * h).toFixed(2)}\\text{ ${data.unit || 'cm'}}^3$$`
      ];
    } else if (shape === 'cone' && data.r && data.h) {
      const r = Number(data.r);
      const h = Number(data.h);
      const l2 = r * r + h * h;
      const l = Math.sqrt(l2);
      calcLines = [
        `Tính đường sinh theo định lý Pythagore: $$l = \\sqrt{r^2 + h^2} = \\sqrt{${r}^2 + ${h}^2} = \\sqrt{${l2}} ${Number.isInteger(l) ? `= ${l}` : `\\approx ${l.toFixed(2)}`}\\text{ ${data.unit || 'cm'}}$$`,
        `Tính thể tích: $$V = \\frac{1}{3}\\pi \\cdot ${r}^2 \\cdot ${h} = \\frac{1}{3}\\pi \\cdot ${r * r} \\cdot ${h} = ${( (r * r * h) / 3 ).toFixed(2)}\\pi\\text{ ${data.unit || 'cm'}}^3$$`
      ];
    } else if (shape === 'sphere' && (data.R || data.r)) {
      const R = Number(data.R || data.r);
      calcLines = [
        `Tính diện tích mặt cầu: $$S = 4\\pi R^2 = 4\\pi \\cdot (${R})^2 = ${4 * R * R}\\pi\\text{ ${data.unit || 'cm'}}^2$$`,
        `Tính thể tích khối cầu: $$V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi \\cdot (${R})^3 = ${( (4 * R * R * R) / 3 ).toFixed(2)}\\pi\\text{ ${data.unit || 'cm'}}^3$$`
      ];
    } else {
      calcLines = [
        `Thay các số liệu đã cho vào biểu thức:`,
        `Thực hiện phép tính theo thứ tự ưu tiên: Tính trong ngoặc $\\rightarrow$ Lũy thừa $\\rightarrow$ Nhân chia $\\rightarrow$ Cộng trừ.`,
        expectedAnswer ? `Giá trị tính toán ra được: **${expectedAnswer}**` : 'Thực hiện phép tính rút gọn ra kết quả chuẩn.'
      ];
    }

    const step3: SolutionStep = {
      stepNumber: 3,
      title: 'Bước 3: Thực hiện tính toán từng dòng',
      subtitle: 'Thế số & biến đổi đại số',
      description: calcLines.join('\n\n'),
      type: 'calc',
      tip: 'Không bấm máy tính vội vàng một lần trên máy tính bỏ túi để tránh sai sót số mũ!'
    };

    // BƯỚC 4: KẾT LUẬN
    const finalAnsText = expectedAnswer ? `${expectedAnswer} ${unit}` : `Đáp số chuẩn`;
    const step4: SolutionStep = {
      stepNumber: 4,
      title: 'Bước 4: Kết luận & Ý nghĩa thực tế',
      subtitle: 'Ghi đáp số và đơn vị đo',
      description: `Vậy kết quả của bài toán là **${finalAnsText}**.\n\n*Ý nghĩa thực tiễn:* Trong thực tế sản xuất và đời sống, kết quả này giúp kỹ sư/nhà thiết kế tính toán chính xác lượng vật liệu cần dùng, dung tích chứa chất lỏng hoặc chi phí gia công tối ưu.`,
      type: 'conclusion',
      intermediateResult: expectedAnswer ? String(expectedAnswer) : undefined,
      tip: 'Trong bài thi tự luận, luôn nhớ ghi kèm đơn vị đo và kết luận rõ ràng bằng chữ để đạt trọn vẹn điểm trình bày!'
    };

    const teacherFeedback = this.buildTeacherFeedback(isCorrect, userAnswer, expectedAnswer, misconceptionKey);

    return {
      step1Given: step1,
      step2Formula: step2,
      step3Calculation: step3,
      step4Conclusion: step4,
      allSteps: [step1, step2, step3, step4],
      teacherFeedback
    };
  }
}
