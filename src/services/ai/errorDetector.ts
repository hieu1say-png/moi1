/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - ERROR DETECTOR (16 MATHEMATICAL MISCONCEPTIONS)
 * Diagnoses specific student errors in Grade 9 3D Geometry and provides targeted remediation.
 */

export interface MisconceptionDiagnosis {
  type:
    | 'MISSING_SQUARE'
    | 'DIAMETER_AS_RADIUS'
    | 'HEIGHT_FOR_SLANT_HEIGHT'
    | 'SLANT_HEIGHT_FOR_HEIGHT'
    | 'MISSING_ONE_THIRD'
    | 'LATERAL_VS_TOTAL_AREA'
    | 'AREA_VS_VOLUME'
    | 'UNIT_MISMATCH'
    | 'CIRCUMFERENCE_VS_AREA'
    | 'CYLINDER_BASE_COUNT'
    | 'SPHERE_FORMULA_CONFUSION'
    | 'SECTOR_ARC_CONFUSION'
    | 'SECTOR_RADIUS_CONFUSION'
    | 'SECTOR_ANGLE_CONFUSION'
    | 'PARADOX_POUR_COUNT'
    | 'GENERIC_ARITHMETIC';
  name: string;
  identifiedStep: string;
  reason: string;
  remedialFormula: string;
  remedialExplanation: string;
  teacherAdvice: string;
}

export class ErrorDetector {
  /**
   * Diagnoses misconception from student input text and extracted values.
   */
  public static diagnose(
    text: string,
    context: {
      shape?: string;
      r?: number;
      h?: number;
      l?: number;
      d?: number;
      studentAnswer?: any;
    } = {}
  ): MisconceptionDiagnosis | null {
    const clean = text.toLowerCase();

    // 1. Missing square: "πrh", "pi*r*h" for cylinder/cone volume
    if (
      clean.includes('πrh') ||
      clean.includes('pirh') ||
      clean.includes('pi r h') ||
      clean.includes('π r h') ||
      clean.includes('thiếu bình phương') ||
      clean.includes('r không bình phương')
    ) {
      return {
        type: 'MISSING_SQUARE',
        name: 'Quên bình phương bán kính r',
        identifiedStep: 'Thiết lập công thức thể tích',
        reason: 'Học sinh viết công thức là πrh thay vì πr²h.',
        remedialFormula: 'V = \\pi r^2 h',
        remedialExplanation: 'Đáy hình trụ là một hình tròn có diện tích bằng $\\pi r^2$. Khi nhân với chiều cao $h$, công thức thể tích bắt buộc phải có bình phương bán kính: $V = \\pi r^2 h$.',
        teacherAdvice: 'Khoan vội bấm máy nhé! Em đang thiếu bình phương ở bán kính ($r^2$). Hãy sửa thành $V = \\pi r^2 h$ rồi tính lại nhé!'
      };
    }

    // 2. Diameter taken as radius (e.g. "d=8 mà em lấy r=8", "d = 8 => r = 8", "đường kính 8 mà lấy r 8")
    if (
      clean.includes('d=8 mà em lấy r=8') ||
      clean.includes('d=8 mà r=8') ||
      clean.includes('đường kính') && (clean.includes('lấy r') || clean.includes('nhầm d với r') || clean.includes('nhầm r với d'))
    ) {
      return {
        type: 'DIAMETER_AS_RADIUS',
        name: 'Nhầm đường kính d với bán kính r',
        identifiedStep: 'Trích xuất đại lượng từ đề bài',
        reason: 'Đề bài cho đường kính d nhưng học sinh trực tiếp thay vào công thức như bán kính r mà không chia đôi.',
        remedialFormula: 'r = \\frac{d}{2}',
        remedialExplanation: 'Bán kính $r$ luôn luôn chỉ bằng một nửa đường kính: $r = \\frac{d}{2}$.',
        teacherAdvice: 'Đây là cái "bẫy" đề thi rất phổ biến! Đề bài cho đường kính $d = 8\\text{ cm}$ thì bán kính phải là $r = \\frac{8}{2} = 4\\text{ cm}$. Em hãy chia đôi đường kính trước khi tính nhé!'
      };
    }

    // 3. Using height h instead of slant height l for Sxq of Cone: "πrh" for cone lateral area
    if (
      (clean.includes('nón') || context.shape === 'cone') &&
      (clean.includes('sxq') || clean.includes('xung quanh')) &&
      (clean.includes('h') && !clean.includes('l') || clean.includes('πrh') || clean.includes('chiều cao'))
    ) {
      return {
        type: 'HEIGHT_FOR_SLANT_HEIGHT',
        name: 'Dùng chiều cao h thay cho đường sinh l trong hình nón',
        identifiedStep: 'Tính diện tích xung quanh hình nón',
        reason: 'Học sinh dùng chiều cao h trong công thức Sxq của hình nón thay vì đường sinh l.',
        remedialFormula: 'S_{xq} = \\pi r l, \\quad l = \\sqrt{r^2 + h^2}',
        remedialExplanation: 'Diện tích xung quanh của hình nón được quét bởi đường sinh $l$, do đó công thức đúng là $S_{xq} = \\pi r l$. Nếu đề bài chỉ cho $r$ và $h$, ta phải tìm $l = \\sqrt{r^2 + h^2}$ trước.',
        teacherAdvice: 'Chú ý nha em! Chiều cao $h$ là đường thẳng bên trong, còn bao quanh mặt nón là đường sinh $l$. Em hãy tính $l = \\sqrt{r^2 + h^2}$ rồi thay vào $S_{xq} = \\pi r l$ nhé!'
      };
    }

    // 4. Missing 1/3 in Cone Volume
    if (
      (clean.includes('nón') || context.shape === 'cone') &&
      clean.includes('thể tích') &&
      (clean.includes('thiếu 1/3') || clean.includes('quên 1/3') || clean.includes('πr²h') && !clean.includes('1/3'))
    ) {
      return {
        type: 'MISSING_ONE_THIRD',
        name: 'Thiếu hệ số 1/3 trong thể tích hình nón',
        identifiedStep: 'Công thức thể tích hình nón',
        reason: 'Học sinh tính thể tích hình nón bằng πr²h thay vì (1/3)πr²h.',
        remedialFormula: 'V = \\frac{1}{3}\\pi r^2 h',
        remedialExplanation: 'Hình nón có đỉnh nhọn, thể tích chỉ bằng đúng một phần ba hình trụ có cùng đáy và chiều cao.',
        teacherAdvice: 'Hình nón luôn có đỉnh chóp nhọn nên thể tích chỉ bằng $\\frac{1}{3}$ hình trụ thôi em nhé: $V = \\frac{1}{3}\\pi r^2 h$.'
      };
    }

    // 5. Confusing Sxq and Stp
    if (clean.includes('sxq với stp') || clean.includes('xung quanh với toàn phần') || clean.includes('quên đáy') || clean.includes('quên cộng đáy')) {
      return {
        type: 'LATERAL_VS_TOTAL_AREA',
        name: 'Nhầm diện tích xung quanh và diện tích toàn phần',
        identifiedStep: 'Xác định diện tích cần tính',
        reason: 'Học sinh quên cộng thêm diện tích các mặt đáy khi tính diện tích toàn phần.',
        remedialFormula: 'S_{tp} = S_{xq} + S_{\\text{đáy}}',
        remedialExplanation: 'Hình trụ có 2 đáy tròn ($S_{tp} = 2\\pi rh + 2\\pi r^2$), còn hình nón chỉ có 1 đáy tròn ($S_{tp} = \\pi rl + \\pi r^2$).',
        teacherAdvice: 'Em nhớ phân biệt nhé: Xung quanh ($S_{xq}$) chỉ là phần thân bao quanh, còn Toàn phần ($S_{tp}$) là bao gồm cả mặt đáy nữa!'
      };
    }

    // 6. Confusing Sphere formulas
    if ((clean.includes('cầu') || context.shape === 'sphere') && (clean.includes('4/3 πr²') || clean.includes('4πr³') || clean.includes('nhầm công thức cầu'))) {
      return {
        type: 'SPHERE_FORMULA_CONFUSION',
        name: 'Nhầm lẫn công thức diện tích và thể tích hình cầu',
        identifiedStep: 'Áp dụng công thức hình cầu',
        reason: 'Học sinh gán sai số mũ: diện tích gắn với R³ hoặc thể tích gắn với R².',
        remedialFormula: 'S = 4\\pi R^2, \\quad V = \\frac{4}{3}\\pi R^3',
        remedialExplanation: 'Mẹo nhớ: Diện tích có đơn vị cm² nên có $R^2$ ($S = 4\\pi R^2$). Thể tích có đơn vị cm³ nên có $R^3$ và chia 3 ($V = \\frac{4}{3}\\pi R^3$).',
        teacherAdvice: 'Mẹo nhớ siêu dễ: Diện tích gắn với $R^2$, Thể tích gắn với $R^3$ và có số 3 ở mẫu ($\\frac{4}{3}$) nha em!'
      };
    }

    // 7. Net Sector Radius vs Base Radius
    if (clean.includes('bán kính hình quạt') && (clean.includes('r') || clean.includes('bán kính đáy'))) {
      return {
        type: 'SECTOR_RADIUS_CONFUSION',
        name: 'Nhầm bán kính hình quạt với bán kính đáy hình nón',
        identifiedStep: 'Khai triển trải phẳng hình nón',
        reason: 'Học sinh nghĩ bán kính hình quạt trải phẳng là bán kính đáy r thay vì đường sinh l.',
        remedialFormula: 'R_{\\text{quạt}} = l, \\quad \\text{Cung} = 2\\pi r',
        remedialExplanation: 'Khi mở mặt xung quanh của hình nón ra, mép cắt chính là đường sinh $l$. Vì thế bán kính của hình quạt tròn này đúng bằng $l$, còn cung tròn của quạt có độ dài $2\\pi r$.',
        teacherAdvice: 'Điểm then chốt cần nhớ: Bán kính của hình quạt chính là độ dài đường sinh $l$ của hình nón nhé em!'
      };
    }

    return null;
  }
}
