/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - STUDENT QUIZ RESPONSE & PEDAGOGICAL FEEDBACK ENGINE
 * Handles instant response evaluation, normalization, error classification,
 * empathetic Thầy Hiếu AI feedback, and learning event logging.
 */

import { Exercise, LearningEvent, MultipleChoiceExercise, NumericExercise, TrueFalseExercise } from '../types/dataArchitecture';
import { FourStepSolution, FourStepSolutionEngine } from './ai/fourStepSolutionEngine';

export type ErrorClassificationType =
  | 'wrong_radius'
  | 'wrong_diameter'
  | 'wrong_formula'
  | 'calculation_error'
  | 'unit_error'
  | 'rounding_error'
  | 'concept_error'
  | 'none';

export interface EvaluationResult {
  isCorrect: boolean;
  scoreAwarded: number;
  statusBadge: string; // e.g. '✅ Đúng!' | '❌ Chưa đúng.'
  feedbackMessage: string;
  errorClassification: ErrorClassificationType;
  errorLabel?: string;
  errorExplanation?: string;
  normalizedStudentAnswer: string;
  correctAnswerDisplay: string;
  fourStepSolution: FourStepSolution;
}

export class StudentQuizResponseEngine {
  /**
   * Normalizes a raw student answer string into a clean numeric value or canonical text
   */
  public static normalizeStudentAnswer(rawInput: string | number): {
    cleanString: string;
    numericValue: number | null;
  } {
    if (rawInput === undefined || rawInput === null) {
      return { cleanString: '', numericValue: null };
    }

    let str = String(rawInput).trim();

    // Replace Vietnamese comma with dot
    let standardized = str.replace(',', '.');

    // Remove common mathematical unit suffixes and whitespace
    // e.g. "cm^3", "cm3", "cm²", "cm2", "cm", "m³", "m3", "m²", "m2", "m", "lit", "lít", "litres"
    const unitRegex = /(cm\^?3|cm\^?2|cm|m\^?3|m\^?2|m|dm\^?3|dm\^?2|dm|mm\^?3|mm\^?2|mm|lít|lit|litres|l)\b/gi;
    let stripped = standardized.replace(unitRegex, '').trim();

    // Check for π or pi multiplications (e.g. "128pi", "128*pi", "128 π")
    if (/(?:pi|π)/i.test(stripped)) {
      const parts = stripped.split(/(?:pi|π|\*)/i).filter(Boolean);
      if (parts.length === 1 && !isNaN(parseFloat(parts[0]))) {
        const coef = parseFloat(parts[0]);
        return {
          cleanString: str,
          numericValue: coef * Math.PI
        };
      } else if (stripped.trim() === 'pi' || stripped.trim() === 'π') {
        return {
          cleanString: str,
          numericValue: Math.PI
        };
      }
    }

    // Try parsing pure float
    const parsed = parseFloat(stripped);
    if (!isNaN(parsed) && isFinite(parsed)) {
      return {
        cleanString: str,
        numericValue: parsed
      };
    }

    return {
      cleanString: str,
      numericValue: null
    };
  }

  /**
   * Diagnoses specific geometrical misconception from the numeric or MCQ answer
   */
  public static classifyError(
    exercise: Exercise,
    studentInput: any,
    expectedNumber?: number
  ): {
    type: ErrorClassificationType;
    label: string;
    explanation: string;
  } {
    const norm = this.normalizeStudentAnswer(studentInput);
    const val = norm.numericValue;

    if (val !== null && expectedNumber !== undefined && expectedNumber > 0) {
      // 1. Check if used Diameter instead of Radius (value ~ 4x or 2x expected)
      if (Math.abs(val - expectedNumber * 4) / (expectedNumber * 4) < 0.05) {
        return {
          type: 'wrong_radius',
          label: 'Nhầm Đường Kính & Bán Kính',
          explanation: 'Em đã lấy đường kính d thay vì bán kính r = d/2, khiến diện tích/thể tích bị phóng đại gấp 4 lần ($r^2$).'
        };
      }
      if (Math.abs(val - expectedNumber * 2) / (expectedNumber * 2) < 0.05) {
        return {
          type: 'wrong_diameter',
          label: 'Nhầm Bán Kính & Đường Kính',
          explanation: 'Em đã nhân đôi bán kính hoặc nhầm hệ số đường kính trong công thức.'
        };
      }

      // 2. Check if missed Cone factor 1/3 (value ~ 3x expected)
      if (exercise.shapeId === 'cone' && Math.abs(val - expectedNumber * 3) / (expectedNumber * 3) < 0.05) {
        return {
          type: 'wrong_formula',
          label: 'Thiếu hệ số 1/3 của Hình Nón',
          explanation: 'Thể tích hình nón bằng 1/3 thể tích hình trụ cùng đáy và chiều cao: $V = \\frac{1}{3}\\pi r^2 h$. Em đã quên chia 3.'
        };
      }

      // 3. Check Sphere factor 4/3 (value ~ 0.75x expected)
      if (exercise.shapeId === 'sphere' && Math.abs(val - expectedNumber * 0.75) / (expectedNumber * 0.75) < 0.05) {
        return {
          type: 'wrong_formula',
          label: 'Sai hệ số 4/3 của Hình Cầu',
          explanation: 'Thể tích khối cầu có công thức chuẩn là $V = \\frac{4}{3}\\pi R^3$.'
        };
      }

      // 4. Check Unit Conversion Error (factor of 10, 100, 1000)
      if (
        Math.abs(val - expectedNumber * 1000) / (expectedNumber * 1000) < 0.05 ||
        Math.abs(val - expectedNumber / 1000) / (expectedNumber / 1000) < 0.05
      ) {
        return {
          type: 'unit_error',
          label: 'Lỗi Đổi Đơn Vị Đo',
          explanation: 'Em đã quên đổi đơn vị (ví dụ $1\\text{ m}^3 = 1000\\text{ dm}^3 = 1000\\text{ lít}$).'
        };
      }

      // 5. Check small rounding error
      if (Math.abs(val - expectedNumber) < 1.0) {
        return {
          type: 'rounding_error',
          label: 'Lỗi Làm Tròn Số Thập Phân',
          explanation: 'Kết quả của em rất sát đáp số nhưng có chênh lệch nhỏ do quy tắc làm tròn số hoặc lấy giá trị số $\\pi$.'
        };
      }

      // 6. Calculation error
      return {
        type: 'calculation_error',
        label: 'Lỗi Tính Toán Số Học',
        explanation: 'Thao tác thế số hoặc bấm máy tính có sai lệch ở bước biến đổi trung gian.'
      };
    }

    return {
      type: 'concept_error',
      label: 'Chưa Chọn Đúng Phương Án',
      explanation: 'Hãy xem lại định nghĩa và các bước giải 4 bước của Thầy bên dưới nhé.'
    };
  }

  /**
   * Evaluates student answer and generates 4-step pedagogical explanation with Thầy Hiếu AI voice
   */
  public static evaluate(
    exercise: Exercise,
    studentAnswer: any,
    pointsPossible = 2.5
  ): EvaluationResult {
    let isCorrect = false;
    let correctAnswerDisplay = '';
    let errorClassification: ErrorClassificationType = 'none';
    let errorLabel: string | undefined;
    let errorExplanation: string | undefined;

    if (exercise.type === 'multiple_choice') {
      const mcq = exercise as MultipleChoiceExercise;
      const letters = ['A', 'B', 'C', 'D', 'E'];
      const correctLetter = letters[mcq.correctOptionIndex] || 'A';
      const correctText = mcq.options[mcq.correctOptionIndex] || '';
      correctAnswerDisplay = `${correctLetter}. ${correctText}`;

      const rawAns = String(studentAnswer || '').trim();
      if (
        rawAns.toLowerCase() === correctLetter.toLowerCase() ||
        rawAns.toLowerCase() === correctText.toLowerCase() ||
        rawAns.toLowerCase().startsWith(correctLetter.toLowerCase() + '.')
      ) {
        isCorrect = true;
      } else {
        const diag = this.classifyError(exercise, studentAnswer);
        errorClassification = diag.type;
        errorLabel = diag.label;
        errorExplanation = diag.explanation;
      }
    } else if (exercise.type === 'numeric') {
      const numEx = exercise as NumericExercise;
      correctAnswerDisplay = `${numEx.expectedNumber} ${numEx.unit || ''}`.trim();
      const norm = this.normalizeStudentAnswer(studentAnswer);

      if (norm.numericValue !== null) {
        const tol = numEx.tolerance || 0.1;
        const diff = Math.abs(norm.numericValue - numEx.expectedNumber);
        const relDiff = numEx.expectedNumber !== 0 ? diff / Math.abs(numEx.expectedNumber) : diff;

        if (diff <= tol || relDiff <= 0.02) {
          isCorrect = true;
        } else {
          const diag = this.classifyError(exercise, norm.numericValue, numEx.expectedNumber);
          errorClassification = diag.type;
          errorLabel = diag.label;
          errorExplanation = diag.explanation;
        }
      } else {
        errorClassification = 'concept_error';
        errorLabel = 'Chưa Nhập Số Hợp Lệ';
        errorExplanation = 'Vui lòng nhập giá trị số kèm dấu thập phân (VD: 402.12).';
      }
    } else if (exercise.type === 'true_false') {
      const tf = exercise as TrueFalseExercise;
      correctAnswerDisplay = tf.statements.map((s) => `${s.statement}: ${s.isTrue ? 'Đúng' : 'Sai'}`).join('; ');
      isCorrect = Boolean(studentAnswer === true || studentAnswer === 'true' || studentAnswer === 'Đúng');
      if (!isCorrect) {
        errorClassification = 'concept_error';
        errorLabel = 'Nhận Định Chưa Chuẩn Xác';
        errorExplanation = 'Mệnh đề này cần đối chiếu lại định lý hình học.';
      }
    } else {
      isCorrect = Boolean(studentAnswer);
    }

    // Generate Canonical 4-Step Pedagogical Solution
    const fourStepSolution = FourStepSolutionEngine.generate({
      shape: exercise.shapeId as any,
      questionText: exercise.question,
      data: (exercise as any).data || {
        r: 5,
        h: 12,
        unit: (exercise as any).unit || 'cm'
      },
      userAnswer: studentAnswer,
      expectedAnswer: correctAnswerDisplay,
      isCorrect,
      misconceptionKey: errorClassification,
      unit: (exercise as any).unit
    });

    // Feedback message in Thầy Hiếu AI tone
    let feedbackMessage = '';
    let statusBadge = '';

    if (exercise.type === 'true_false') {
      statusBadge = isCorrect ? '✅ Chính xác!' : '❌ Chưa chính xác.';
    } else {
      statusBadge = isCorrect ? '✅ Đúng!' : '❌ Chưa đúng.';
    }

    if (isCorrect) {
      feedbackMessage = 'Chuẩn bài rồi! Em đã xác định đúng bán kính và chọn đúng công thức.';
    } else {
      feedbackMessage = 'Chưa sao cả, mình bắt lại từ bước 1 nhé.';
    }

    return {
      isCorrect,
      scoreAwarded: isCorrect ? pointsPossible : 0,
      statusBadge,
      feedbackMessage,
      errorClassification,
      errorLabel,
      errorExplanation,
      normalizedStudentAnswer: String(studentAnswer || 'Chưa trả lời'),
      correctAnswerDisplay,
      fourStepSolution
    };
  }
}
