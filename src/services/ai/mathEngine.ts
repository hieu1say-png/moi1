/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - CENTRAL MATHEMATICS ENGINE (MATH ENGINE)
 * Handles deterministic geometric calculation, value extraction, formula verification,
 * and error diagnosis for Grade 9 3D Geometry:
 * - Cylinder (Hình Trụ)
 * - Cone (Hình Nón)
 * - Sphere (Hình Cầu)
 * - Paradox 1/3 Volume Experiment (Thí nghiệm Nghịch lý 1/3 thể tích)
 */

export interface ExtractedMathValues {
  r?: number;
  h?: number;
  l?: number;
  d?: number;
  R?: number;
  target?: 'V' | 'Sxq' | 'Stp' | 'S' | 'C' | 'l' | 'r' | 'h' | 'd';
  studentValue?: number;
  hasPiInStudentAnswer?: boolean;
}

export interface MathDiagnosisResult {
  isCorrect?: boolean;
  expectedExactLatex?: string;
  expectedApprox?: number;
  expectedPiMultiple?: number;
  detectedError?:
    | 'MISSING_SQUARE'
    | 'RADIUS_DIAMETER_CONFUSION'
    | 'GENERATRIX_HEIGHT_CONFUSION'
    | 'FORGOT_ONE_THIRD'
    | 'FORGOT_FOUR_THIRD'
    | 'SPHERE_POWER_ERROR'
    | 'UNIT_MISMATCH'
    | 'ARITHMETIC_ERROR'
    | 'NONE';
  errorStepExplanation?: {
    step: string;
    reason: string;
    fix: string;
  };
}

export class MathEngine {
  /**
   * Extracts numbers, variables, and potential student formulas/answers from text.
   */
  public static extractValues(text: string): ExtractedMathValues {
    const clean = text.toLowerCase().replace(/,/g, '.');
    const result: ExtractedMathValues = {};

    // Match r or R
    const rMatch = clean.match(/(?:bán kính|r|R)\s*[:=]?\s*(\d+(?:\.\d+)?)/);
    if (rMatch) result.r = parseFloat(rMatch[1]);

    // Match h
    const hMatch = clean.match(/(?:chiều cao|h)\s*[:=]?\s*(\d+(?:\.\d+)?)/);
    if (hMatch) result.h = parseFloat(hMatch[1]);

    // Match l (generatrix)
    const lMatch = clean.match(/(?:đường sinh|l)\s*[:=]?\s*(\d+(?:\.\d+)?)/);
    if (lMatch) result.l = parseFloat(lMatch[1]);

    // Match d (diameter)
    const dMatch = clean.match(/(?:đường kính|d)\s*[:=]?\s*(\d+(?:\.\d+)?)/);
    if (dMatch) {
      result.d = parseFloat(dMatch[1]);
      if (!result.r) result.r = result.d / 2;
    }

    // Match target variable: V, Sxq, Stp, S
    if (clean.includes('tính v') || clean.includes('thể tích') || clean.includes('tính thể tích')) {
      result.target = 'V';
    } else if (clean.includes('sxq') || clean.includes('xung quanh')) {
      result.target = 'Sxq';
    } else if (clean.includes('stp') || clean.includes('toàn phần')) {
      result.target = 'Stp';
    } else if (clean.includes('diện tích mặt cầu') || clean.includes('diện tích')) {
      result.target = 'S';
    }

    // Extract student number (e.g. "128pi", "128\pi", "128", "401.92")
    const ansMatch = clean.match(/(\d+(?:\.\d+)?)\s*(?:pi|\\pi|π)?/);
    if (ansMatch) {
      const val = parseFloat(ansMatch[1]);
      result.studentValue = val;
      result.hasPiInStudentAnswer = clean.includes('pi') || clean.includes('π') || clean.includes('\\pi');
    }

    return result;
  }

  /**
   * Calculates exact Cylinder metrics.
   */
  public static calculateCylinder(r: number, h: number) {
    const Sxq = 2 * Math.PI * r * h;
    const SxqPi = 2 * r * h;
    const Stp = 2 * Math.PI * r * (h + r);
    const StpPi = 2 * r * (h + r);
    const V = Math.PI * r * r * h;
    const VPi = r * r * h;

    return {
      r,
      h,
      d: 2 * r,
      Sxq,
      SxqPi,
      Stp,
      StpPi,
      V,
      VPi,
      latexV: `V = \\pi r^2 h = \\pi \\cdot ${r}^2 \\cdot ${h} = ${VPi}\\pi \\approx ${(V).toFixed(2)}`,
      latexSxq: `S_{xq} = 2\\pi rh = 2\\pi \\cdot ${r} \\cdot ${h} = ${SxqPi}\\pi \\approx ${(Sxq).toFixed(2)}`,
      latexStp: `S_{tp} = 2\\pi rh + 2\\pi r^2 = ${StpPi}\\pi \\approx ${(Stp).toFixed(2)}`
    };
  }

  /**
   * Calculates exact Cone metrics.
   */
  public static calculateCone(r: number, h?: number, l?: number) {
    let calcL = l;
    let calcH = h;

    if (h !== undefined && l === undefined) {
      calcL = Math.sqrt(h * h + r * r);
    } else if (l !== undefined && h === undefined) {
      calcH = l > r ? Math.sqrt(l * l - r * r) : 0;
    }

    const effH = calcH || 0;
    const effL = calcL || 0;

    const Sxq = Math.PI * r * effL;
    const SxqPi = r * effL;
    const Stp = Math.PI * r * (effL + r);
    const StpPi = r * (effL + r);
    const V = (1 / 3) * Math.PI * r * r * effH;
    const VPi = (1 / 3) * r * r * effH;
    const theta = effL > 0 ? Math.round((360 * r) / effL) : 0;

    return {
      r,
      h: effH,
      l: effL,
      theta,
      Sxq,
      SxqPi,
      Stp,
      StpPi,
      V,
      VPi,
      latexPythagoras: `l = \\sqrt{h^2 + r^2} = \\sqrt{${effH}^2 + ${r}^2} = ${effL.toFixed(2)}`,
      latexV: `V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\cdot ${r}^2 \\cdot ${effH} = ${VPi.toFixed(2)}\\pi \\approx ${V.toFixed(2)}`,
      latexSxq: `S_{xq} = \\pi r l = \\pi \\cdot ${r} \\cdot ${effL.toFixed(2)} = ${SxqPi.toFixed(2)}\\pi \\approx ${Sxq.toFixed(2)}`,
      latexTheta: `\\theta = 360^\\circ \\cdot \\frac{r}{l} = 360^\\circ \\cdot \\frac{${r}}{${effL.toFixed(2)}} = ${theta}^\\circ`
    };
  }

  /**
   * Calculates exact Sphere metrics.
   */
  public static calculateSphere(R: number) {
    const S = 4 * Math.PI * R * R;
    const SPi = 4 * R * R;
    const V = (4 / 3) * Math.PI * R * R * R;
    const VPi = (4 / 3) * R * R * R;

    return {
      R,
      d: 2 * R,
      S,
      SPi,
      V,
      VPi,
      latexS: `S = 4\\pi R^2 = 4\\pi \\cdot ${R}^2 = ${SPi}\\pi \\approx ${(S).toFixed(2)}`,
      latexV: `V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi \\cdot ${R}^3 = ${VPi.toFixed(2)}\\pi \\approx ${(V).toFixed(2)}`
    };
  }

  /**
   * Diagnoses student calculation answer for correctness or specific mathematical trap.
   */
  public static diagnoseAnswer(
    shape: 'CYLINDER' | 'CONE' | 'SPHERE' | 'GENERAL_GEOMETRY',
    values: ExtractedMathValues
  ): MathDiagnosisResult {
    const { r = 4, h = 8, l, R, studentValue, hasPiInStudentAnswer } = values;

    if (studentValue === undefined) {
      return { detectedError: 'NONE' };
    }

    if (shape === 'CYLINDER') {
      const { VPi, V, SxqPi, Sxq } = this.calculateCylinder(r, h);
      const isPiMatch = Math.abs(studentValue - VPi) < 0.01;
      const isApproxMatch = Math.abs(studentValue - V) < 0.5;

      if (isPiMatch || isApproxMatch) {
        return {
          isCorrect: true,
          expectedExactLatex: `${VPi}\\pi`,
          expectedApprox: V,
          expectedPiMultiple: VPi,
          detectedError: 'NONE'
        };
      }

      // Check Missing Square (π * r * h) -> student answered r * h
      if (Math.abs(studentValue - r * h) < 0.01) {
        return {
          isCorrect: false,
          detectedError: 'MISSING_SQUARE',
          expectedExactLatex: `${VPi}\\pi`,
          expectedApprox: V,
          errorStepExplanation: {
            step: 'Thiết lập công thức thể tích',
            reason: `Em đã tính r · h = ${r} · ${h} = ${r * h} mà quên bình phương bán kính r².`,
            fix: `Dùng V = \\pi r^2 h = \\pi \\cdot ${r}^2 \\cdot ${h} = ${VPi}\\pi.`
          }
        };
      }

      // Check Diameter confusion if d = 2r was entered directly without dividing
      const d = 2 * r;
      const wrongDVal = d * d * h;
      if (Math.abs(studentValue - wrongDVal) < 0.01) {
        return {
          isCorrect: false,
          detectedError: 'RADIUS_DIAMETER_CONFUSION',
          expectedExactLatex: `${VPi}\\pi`,
          expectedApprox: V,
          errorStepExplanation: {
            step: 'Lấy bán kính r',
            reason: `Em đã lấy trực tiếp đường kính d = ${d} vào công thức thay vì r = ${r}.`,
            fix: `Chia đôi đường kính để có r = ${r}, sau đó tính V = \\pi \\cdot ${r}^2 \\cdot ${h} = ${VPi}\\pi.`
          }
        };
      }
    } else if (shape === 'CONE') {
      const cone = this.calculateCone(r, h, l);
      const isPiMatch = Math.abs(studentValue - cone.VPi) < 0.05;
      const isApproxMatch = Math.abs(studentValue - cone.V) < 0.5;

      if (isPiMatch || isApproxMatch) {
        return {
          isCorrect: true,
          expectedExactLatex: `${cone.VPi.toFixed(2)}\\pi`,
          expectedApprox: cone.V,
          expectedPiMultiple: cone.VPi,
          detectedError: 'NONE'
        };
      }

      // Check forgot 1/3 (calculated cylinder V instead)
      const cylV = r * r * cone.h;
      if (Math.abs(studentValue - cylV) < 0.01) {
        return {
          isCorrect: false,
          detectedError: 'FORGOT_ONE_THIRD',
          expectedExactLatex: `${cone.VPi.toFixed(2)}\\pi`,
          expectedApprox: cone.V,
          errorStepExplanation: {
            step: 'Hệ số hình nón',
            reason: 'Em đã tính ra thể tích hình trụ (πr²h) và quên nhân hệ số 1/3 của hình nón.',
            fix: `Nhân thêm 1/3: V = \\frac{1}{3}\\pi r^2 h = ${cone.VPi.toFixed(2)}\\pi.`
          }
        };
      }
    } else if (shape === 'SPHERE') {
      const effR = R || r;
      const sph = this.calculateSphere(effR);
      const isPiMatch = Math.abs(studentValue - sph.VPi) < 0.05;
      const isApproxMatch = Math.abs(studentValue - sph.V) < 0.5;

      if (isPiMatch || isApproxMatch) {
        return {
          isCorrect: true,
          expectedExactLatex: `${sph.VPi.toFixed(2)}\\pi`,
          expectedApprox: sph.V,
          expectedPiMultiple: sph.VPi,
          detectedError: 'NONE'
        };
      }
    }

    return {
      isCorrect: false,
      detectedError: 'ARITHMETIC_ERROR'
    };
  }
}
