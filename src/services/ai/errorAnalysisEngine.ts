/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - ERROR ANALYSIS & AI TUTOR RECOVERY ENGINE (THẦY HIẾU AI)
 * Comprehensive Mathematical Error Diagnosis, Pedagogical 4-Step Remediation,
 * Adaptive Archetype Recovery & Targeted Spaced Practice.
 */

import { ShapeType, Exercise } from '../../types/dataArchitecture';
import { UnifiedAssignmentQuestionItem, getCachedUnifiedAssignmentBank } from '../unifiedAssignmentService';
import { QuestionSelectionEngine } from '../questionSelectionEngine';
import { ARCHETYPE_MAP } from '../../data/questionBank1000';

export type CanonicalErrorType =
  | 'RADIUS_DIAMETER'
  | 'HEIGHT_SLANT_HEIGHT'
  | 'CONE_ONE_THIRD'
  | 'FORMULA_SELECTION'
  | 'CALCULATION'
  | 'UNIT'
  | 'ROUNDING'
  | 'MISREAD_DIAGRAM'
  | 'AREA_VOLUME'
  | 'CONCEPT'
  | 'OTHER';

export type LearningEventType =
  | 'QUESTION_WRONG'
  | 'ERROR_DETECTED'
  | 'SOLUTION_VIEWED'
  | 'SIMILAR_QUESTION_REQUESTED'
  | 'SIMILAR_QUESTION_COMPLETED';

export interface RecordedLearningEvent {
  id: string;
  eventType: LearningEventType;
  questionId: string;
  archetypeId?: string;
  errorType?: CanonicalErrorType;
  studentAnswer?: any;
  correctAnswer?: any;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface ErrorAnalysisInput {
  questionId?: string;
  questionText: string;
  studentAnswer: any;
  correctAnswer: any;
  studentAttempt?: number;
  mathData?: {
    d?: number;
    r?: number;
    h?: number;
    l?: number;
    shape?: ShapeType;
    unit?: string;
  };
  solution?: string | string[];
  archetypeId?: string;
  shape?: ShapeType | 'mixed';
}

export interface ErrorAnalysisResult {
  errorType: CanonicalErrorType;
  errorTypeLabel: string;
  errorStep: number;
  errorStepLabel: string;
  confidence: number;
  // 4-Part Response Layout for Thầy Hiếu AI
  teacherRemark: string; // 1. NHẬN XÉT
  explanation: string; // 2. GIẢI THÍCH
  solution4Steps: string[]; // 3. 4 BƯỚC SƯ PHẠM
  cautionNote: string; // 4. LƯU Ý
  recommendedPractice: string;
  similarQuestion?: UnifiedAssignmentQuestionItem;
  repeatErrorCount: number;
  shouldSuggestTargetedPractice: boolean;
  targetedPracticeTitle?: string;
}

// Local Storage Keys
const STORAGE_ERROR_HISTORY = 'geometry_lab_error_history_v2';
const STORAGE_LEARNING_EVENTS = 'geometry_lab_learning_events_v2';

export class ErrorAnalysisEngine {
  /**
   * Main Diagnostic Method: Determines exact error type and generates 4-part Thầy Hiếu AI response
   */
  public static analyzeError(input: ErrorAnalysisInput): ErrorAnalysisResult {
    const qText = (input.questionText || '').toLowerCase();
    const sAns = String(input.studentAnswer || '').trim().toLowerCase();
    const cAns = String(input.correctAnswer || '').trim().toLowerCase();
    const math = input.mathData || {};

    const studentNum = parseFloat(sAns.replace(',', '.'));
    const correctNum = parseFloat(cAns.replace(',', '.'));

    let errorType: CanonicalErrorType = 'OTHER';
    let errorStep = 3;
    let errorStepLabel = 'Bước 3: Tính toán & Biến đổi số học';
    let confidence = 0.7;
    let teacherRemark = 'Khoan vội, em đang nhầm một chỗ nhỏ trong bài làm.';
    let explanation = 'Cùng Thầy rà soát lại từng bước giải bên dưới để khắc phục ngay nhé!';
    let cautionNote = '⚠️ Khi làm bài toán hình học không gian, hãy chú ý đọc kỹ các đại lượng đề bài cung cấp.';
    let recommendedPractice = 'Luyện tập thêm các bài toán cùng dạng mô hình hình học.';

    // -------------------------------------------------------------
    // 1. RADIUS_DIAMETER (Đường kính d vs Bán kính r)
    // -------------------------------------------------------------
    const dMatch = qText.match(/d\s*=\s*(\d+(\.\d+)?)/i) || qText.match(/đường kính[^\d]*(\d+(\.\d+)?)/i);
    const dVal = math.d !== undefined ? math.d : (dMatch ? parseFloat(dMatch[1]) : 8);
    const rVal = dVal / 2;

    const hasDiameterMention = qText.includes('đường kính') || qText.includes(' d =') || qText.includes('d=') || math.d !== undefined || Boolean(dMatch);
    const isRadiusRatio =
      (!isNaN(studentNum) && !isNaN(correctNum) && correctNum > 0 && (
        Math.abs(studentNum / correctNum - 2) < 0.15 || // e.g. Sxq = 2*pi*r*h with r=d -> factor 2
        Math.abs(studentNum / correctNum - 4) < 0.25 || // e.g. V = pi*r^2*h with r=d -> factor 4
        Math.abs(studentNum / correctNum - 8) < 0.35    // e.g. V_sphere = 4/3*pi*r^3 with r=d -> factor 8
      )) ||
      (sAns.includes(`r=${dVal}`) || sAns.includes(`r = ${dVal}`) || sAns === String(dVal) || sAns.includes('r=8')) ||
      (sAns.includes('r=') && qText.includes('đường kính'));

    if (hasDiameterMention && (isRadiusRatio || sAns.includes('r=') || qText.includes('đường kính'))) {
      errorType = 'RADIUS_DIAMETER';
      errorStep = 1;
      errorStepLabel = 'Bước 1: Xác định dữ kiện & Bán kính đáy';
      confidence = 0.98;
      teacherRemark = 'Khoan vội, em đang nhầm một chỗ rất hay gặp ở bước 1. Đường kính đang đánh lừa em một chút đấy.';
      explanation = `Đề cho đường kính ${dVal} cm.\nBán kính chỉ bằng một nửa:\n$r = \\frac{d}{2} = ${rVal}\\text{ cm}$.`;
      cautionNote = '⚠️ **Bẫy đề thi vào 10 rất hay gặp:** Luôn gạch chân từ "đường kính" trong đề bài và tính ngay $r = \\frac{d}{2}$ trước khi áp dụng công thức!';
      recommendedPractice = 'Luyện 3 câu phân biệt bán kính và đường kính.';
    }


    // -------------------------------------------------------------
    // 2. HEIGHT_SLANT_HEIGHT (Chiều cao h vs Đường sinh l trong Hình Nón)
    // -------------------------------------------------------------
    else if (
      (qText.includes('hình nón') || input.shape === 'cone' || math.shape === 'cone') &&
      (qText.includes('xung quanh') || qText.includes('sxq') || qText.includes('đường sinh') || qText.includes('chiều cao')) &&
      (sAns.includes('h') || sAns.includes('chiều cao') || (!isNaN(studentNum) && math.h && math.l && Math.abs(studentNum - (math.h / math.l) * correctNum) < 0.2))
    ) {
      errorType = 'HEIGHT_SLANT_HEIGHT';
      errorStep = 2;
      errorStepLabel = 'Bước 2: Chọn công thức & Tính đường sinh l';
      confidence = 0.92;
      teacherRemark = 'Đường sinh và chiều cao đang làm em bối rối một chút ở bước 2 rồi.';
      explanation = 'Đối với hình nón, diện tích xung quanh được quét bởi **đường sinh** $l$, công thức đúng là $S_{xq} = \\pi r l$. Chiều cao $h$ là đường thẳng bên trong. Nếu đề bài cho $r$ và $h$, ta phải dùng định lý Pythagore: $l = \\sqrt{r^2 + h^2}$.';
      cautionNote = '⚠️ **Quy tắc nhớ:** $l$ (đường sinh) là cạnh huyền nghiêng ở mặt ngoài, luôn lớn hơn chiều cao $h$ và bán kính $r$.';
      recommendedPractice = 'Luyện tập tam giác vuông tạo bởi chiều cao, bán kính và đường sinh hình nón.';
    }

    // -------------------------------------------------------------
    // 3. CONE_ONE_THIRD (Thiếu hệ số 1/3 trong Thể tích Hình Nón)
    // -------------------------------------------------------------
    else if (
      (qText.includes('hình nón') || input.shape === 'cone' || math.shape === 'cone') &&
      (qText.includes('thể tích') || qText.includes('v =')) &&
      (!isNaN(studentNum) && !isNaN(correctNum) && Math.abs(studentNum / correctNum - 3) < 0.2)
    ) {
      errorType = 'CONE_ONE_THIRD';
      errorStep = 2;
      errorStepLabel = 'Bước 2: Chọn công thức thể tích hình nón';
      confidence = 0.96;
      teacherRemark = 'Em đã tính đúng tích đáy với chiều cao, nhưng thiếu mất một chi tiết cực kỳ quan trọng!';
      explanation = 'Hình nón có đỉnh chóp nhọn, thể tích chỉ bằng **một phần ba** thể tích hình trụ có cùng đáy và chiều cao: $V = \\frac{1}{3}\\pi r^2 h$. Kết quả của em đang gấp 3 lần đáp án đúng.';
      cautionNote = '⚠️ **Ghi nhớ:** Cứ có hình chóp nhọn (hình nón, hình chóp) là công thức thể tích bắt buộc phải có hệ số $\\frac{1}{3}$.';
      recommendedPractice = 'Luyện các bài toán tỉ số thể tích khối nón và khối trụ.';
    }

    // -------------------------------------------------------------
    // 4. UNIT (Đổi đơn vị đo lường: cm³ -> Lít, dm³, m³)
    // -------------------------------------------------------------
    else if (
      !isNaN(studentNum) && !isNaN(correctNum) && (
        Math.abs(studentNum / correctNum - 1000) < 5 ||
        Math.abs(studentNum / correctNum - 0.001) < 0.0001 ||
        Math.abs(studentNum / correctNum - 100) < 0.5 ||
        Math.abs(studentNum / correctNum - 0.01) < 0.001 ||
        Math.abs(studentNum / correctNum - 1000000) < 50
      )
    ) {
      errorType = 'UNIT';
      errorStep = 4;
      errorStepLabel = 'Bước 4: Đổi đơn vị đo lường & Kết luận';
      confidence = 0.94;
      teacherRemark = 'Công thức và các bước tính của em rất tốt, chỉ sơ suất ở khâu đổi đơn vị thôi!';
      explanation = 'Em cần chú ý quy đổi đơn vị đo: $1\\text{ lít} = 1\\text{ dm}^3 = 1000\\text{ cm}^3$, và $1\\text{ m}^3 = 1000\\text{ lít} = 1\\,000\\,000\\text{ cm}^3$.';
      cautionNote = '⚠️ Đề thi tuyển sinh lớp 10 thường hỏi dung tích bằng "lít" trong khi kích thước cho bằng "cm". Hãy đổi đơn vị cẩn thận!';
      recommendedPractice = 'Luyện chuyên đề bài toán thực tế chứa nước và quy đổi đơn vị thể tích.';
    }

    // -------------------------------------------------------------
    // 5. ROUNDING (Làm tròn số thập phân hoặc giá trị pi)
    // -------------------------------------------------------------
    else if (
      !isNaN(studentNum) && !isNaN(correctNum) &&
      Math.abs(studentNum - correctNum) > 0 &&
      Math.abs(studentNum - correctNum) < 1.5
    ) {
      errorType = 'ROUNDING';
      errorStep = 4;
      errorStepLabel = 'Bước 4: Làm tròn số theo yêu cầu';
      confidence = 0.88;
      teacherRemark = 'Kết quả của em suýt soát đúng rồi, chỉ lệch ở bước làm tròn số.';
      explanation = `Em chú ý đọc kỹ yêu cầu đề bài: làm tròn đến chữ số thập phân thứ mấy (thường là làm tròn đến chữ số thập phân thứ nhất hoặc lấy $\\pi \\approx 3{,}14$). Đáp án chuẩn là ${cAns}.`;
      cautionNote = '⚠️ Chỉ làm tròn ở bước cuối cùng, không làm tròn các kết quả trung gian để tránh tích lũy sai số!';
      recommendedPractice = 'Luyện tập quy tắc làm tròn số trong hình học thực tế.';
    }

    // -------------------------------------------------------------
    // 6. AREA_VOLUME (Nhầm lẫn giữa Diện tích và Thể tích)
    // -------------------------------------------------------------
    else if (
      (qText.includes('diện tích') && (sAns.includes('cm3') || sAns.includes('cm³') || sAns.includes('thể tích'))) ||
      (qText.includes('thể tích') && (sAns.includes('cm2') || sAns.includes('cm²') || sAns.includes('diện tích')))
    ) {
      errorType = 'AREA_VOLUME';
      errorStep = 2;
      errorStepLabel = 'Bước 2: Phân biệt Diện tích và Thể tích';
      confidence = 0.90;
      teacherRemark = 'Em đang nhầm lẫn giữa đại lượng diện tích (mặt ngoài) và thể tích (sức chứa).';
      explanation = 'Diện tích ($S_{xq}, S_{tp}$) là độ lớn bề mặt bên ngoài (đơn vị $\\text{cm}^2, \\text{m}^2$). Thể tích ($V$) là khoảng không gian vật thể chiếm chỗ (đơn vị $\\text{cm}^3, \\text{dm}^3, \\text{lít}$).';
      cautionNote = '⚠️ "Sơn mặt ngoài", "làm vỏ hộp" là tính diện tích; "chứa nước", "dung tích" là tính thể tích!';
      recommendedPractice = 'Luyện tập nhận diện bài toán diện tích vỏ vs thể tích chứa.';
    }

    // -------------------------------------------------------------
    // 7. FORMULA_SELECTION (Chọn sai công thức hình trụ / nón / cầu)
    // -------------------------------------------------------------
    else if (
      qText.includes('toàn phần') && !sAns.includes('2 đáy') && !sAns.includes('đáy') && qText.includes('hình trụ')
    ) {
      errorType = 'FORMULA_SELECTION';
      errorStep = 2;
      errorStepLabel = 'Bước 2: Chọn công thức Diện tích Toàn phần';
      confidence = 0.89;
      teacherRemark = 'Em đã tính diện tích xung quanh thay vì diện tích toàn phần rồi nè.';
      explanation = 'Hình trụ có 2 đáy hình tròn, do đó Diện tích toàn phần bằng Diện tích xung quanh cộng Diện tích 2 đáy: $S_{tp} = 2\\pi r h + 2\\pi r^2$.';
      cautionNote = '⚠️ Nếu đề bài nói "thùng không nắp" thì chỉ có 1 đáy; "hình trụ kín" thì có 2 đáy.';
      recommendedPractice = 'Luyện tập công thức diện tích xung quanh vs toàn phần.';
    }

    // -------------------------------------------------------------
    // 8. CALCULATION (Sai sót tính toán số học cơ bản)
    // -------------------------------------------------------------
    else if (!isNaN(studentNum) && !isNaN(correctNum) && Math.abs(studentNum - correctNum) > 0) {
      errorType = 'CALCULATION';
      errorStep = 3;
      errorStepLabel = 'Bước 3: Tính toán số học';
      confidence = 0.85;
      teacherRemark = 'Lập luận của em rất tốt, chỉ sơ suất bấm máy hoặc tính nhẩm ở bước 3.';
      explanation = `Em đã áp dụng đúng hướng, nhưng phép tính ra kết quả là ${sAns} trong khi đáp án chính xác là ${cAns}. Cùng kiểm tra lại từng phép nhân chia nhé!`;
      cautionNote = '⚠️ Khi bấm máy tính, nên viết rõ biểu thức ra giấy nháp trước để kiểm tra lại từng số hạng.';
      recommendedPractice = 'Luyện tập tính toán số học với số pi.';
    }

    // -------------------------------------------------------------
    // 4-Step Solution Array Construction
    // -------------------------------------------------------------
    let sol4: string[] = [];
    if (Array.isArray(input.solution) && input.solution.length === 4) {
      sol4 = input.solution;
    } else if (typeof input.solution === 'string' && input.solution.includes('\n\n')) {
      sol4 = input.solution.split('\n\n').filter(Boolean);
    }

    if (sol4.length < 4) {
      sol4 = [
        `**Bước 1: Xác định dữ kiện:** Trích xuất các kích thước từ đề bài (${input.mathData?.d ? `đường kính d = ${input.mathData.d} cm => bán kính r = ${input.mathData.d / 2} cm` : 'bán kính r, chiều cao h'}).`,
        `**Bước 2: Chọn mô hình & Công thức:** Xác định công thức chuẩn cho hình học không gian.`,
        `**Bước 3: Tính toán chi tiết:** Thay số chính xác vào biểu thức: kết quả = ${cAns}.`,
        `**Bước 4: Kết luận:** Đáp số chính xác là **${cAns}** (${input.mathData?.unit || 'cm'}).`
      ];
    }

    // -------------------------------------------------------------
    // Track Learning Memory & Repeat Error Counts
    // -------------------------------------------------------------
    const repeatCount = this.recordErrorHistory(errorType, input.questionId || 'unknown-q', input.archetypeId);

    // If student repeated this error >= 2 times, trigger targeted practice recommendation
    const shouldSuggestTargetedPractice = repeatCount >= 2;
    let targetedPracticeTitle = undefined;
    if (shouldSuggestTargetedPractice) {
      if (errorType === 'RADIUS_DIAMETER') targetedPracticeTitle = 'Luyện 3 câu phân biệt bán kính và đường kính';
      else if (errorType === 'HEIGHT_SLANT_HEIGHT') targetedPracticeTitle = 'Luyện 3 câu đường sinh vs chiều cao hình nón';
      else if (errorType === 'CONE_ONE_THIRD') targetedPracticeTitle = 'Luyện 3 câu tỉ số thể tích nón và trụ';
      else if (errorType === 'UNIT') targetedPracticeTitle = 'Luyện 3 câu quy đổi đơn vị thể tích thực tế';
      else targetedPracticeTitle = `Luyện 3 câu khắc phục lỗi ${this.getErrorTypeLabel(errorType)}`;
    }

    // -------------------------------------------------------------
    // Find Similar Question from Same Archetype (Different ID & Numbers)
    // -------------------------------------------------------------
    const similarQuestion = this.findSimilarQuestion(input.questionId, input.archetypeId, input.shape);

    // Record Event: ERROR_DETECTED
    this.recordLearningEvent({
      eventType: 'ERROR_DETECTED',
      questionId: input.questionId || 'unknown',
      archetypeId: input.archetypeId,
      errorType,
      studentAnswer: input.studentAnswer,
      correctAnswer: input.correctAnswer
    });

    return {
      errorType,
      errorTypeLabel: this.getErrorTypeLabel(errorType),
      errorStep,
      errorStepLabel,
      confidence,
      teacherRemark,
      explanation,
      solution4Steps: sol4,
      cautionNote,
      recommendedPractice,
      similarQuestion,
      repeatErrorCount: repeatCount,
      shouldSuggestTargetedPractice,
      targetedPracticeTitle
    };
  }

  /**
   * Human-readable label for Error Types
   */
  public static getErrorTypeLabel(type: CanonicalErrorType): string {
    switch (type) {
      case 'RADIUS_DIAMETER':
        return 'Nhầm đường kính với bán kính';
      case 'HEIGHT_SLANT_HEIGHT':
        return 'Nhầm chiều cao với đường sinh';
      case 'CONE_ONE_THIRD':
        return 'Quên hệ số 1/3 thể tích hình nón';
      case 'FORMULA_SELECTION':
        return 'Chọn sai công thức';
      case 'CALCULATION':
        return 'Sai sót tính toán';
      case 'UNIT':
        return 'Chưa đổi đơn vị đo';
      case 'ROUNDING':
        return 'Làm tròn số chưa chuẩn';
      case 'MISREAD_DIAGRAM':
        return 'Đọc nhầm số liệu từ hình vẽ';
      case 'AREA_VOLUME':
        return 'Nhầm giữa diện tích và thể tích';
      case 'CONCEPT':
        return 'Hiểu sai bản chất hình học';
      case 'OTHER':
      default:
        return 'Lỗi sai khác';
    }
  }

  /**
   * Finds a distinct similar question from the SAME Archetype (Different Question ID)
   */
  public static findSimilarQuestion(
    currentQuestionId?: string,
    archetypeId?: string,
    shape?: ShapeType | 'mixed'
  ): UnifiedAssignmentQuestionItem | undefined {
    const bank = getCachedUnifiedAssignmentBank();

    // 1. Try to find a variant with matching archetypeId but DIFFERENT questionId
    if (archetypeId) {
      const archetypePool = bank.filter(
        (q) => q.archetypeId === archetypeId && q.id !== currentQuestionId
      );
      if (archetypePool.length > 0) {
        // Pick random variant from archetype pool
        const idx = Math.floor(Math.random() * archetypePool.length);
        return archetypePool[idx];
      }
    }

    // 2. Fallback to same shape/topic with different questionId
    if (shape && shape !== 'mixed') {
      const shapePool = bank.filter(
        (q) => q.shape === shape && q.id !== currentQuestionId
      );
      if (shapePool.length > 0) {
        const idx = Math.floor(Math.random() * shapePool.length);
        return shapePool[idx];
      }
    }

    // 3. Fallback to any other question
    const fallbackPool = bank.filter((q) => q.id !== currentQuestionId);
    return fallbackPool[0];
  }

  /**
   * Get 3 targeted practice questions for a specific error type
   */
  public static getTargetedPracticeQuestions(
    errorType: CanonicalErrorType,
    count: number = 3
  ): UnifiedAssignmentQuestionItem[] {
    const bank = getCachedUnifiedAssignmentBank();
    let matched: UnifiedAssignmentQuestionItem[] = [];

    if (errorType === 'RADIUS_DIAMETER') {
      matched = bank.filter((q) =>
        q.question.includes('đường kính') ||
        q.misconceptions?.some((m) => m.toLowerCase().includes('đường kính') || m.toLowerCase().includes('bán kính'))
      );
    } else if (errorType === 'HEIGHT_SLANT_HEIGHT') {
      matched = bank.filter((q) =>
        q.shape === 'cone' && (q.question.includes('đường sinh') || q.question.includes('chiều cao') || q.question.includes('xung quanh'))
      );
    } else if (errorType === 'CONE_ONE_THIRD') {
      matched = bank.filter((q) => q.shape === 'cone' && q.question.includes('thể tích'));
    } else if (errorType === 'UNIT') {
      matched = bank.filter((q) => q.question.includes('lít') || q.question.includes('dm') || q.question.includes('đổi'));
    }

    if (matched.length < count) {
      // Fill with varied questions from bank
      const remaining = bank.filter((q) => !matched.some((m) => m.id === q.id));
      matched = [...matched, ...remaining.slice(0, count - matched.length)];
    }

    return matched.slice(0, count);
  }

  /**
   * Records an error event into persistent error history
   */
  private static recordErrorHistory(
    errorType: CanonicalErrorType,
    questionId: string,
    archetypeId?: string
  ): number {
    try {
      const raw = localStorage.getItem(STORAGE_ERROR_HISTORY);
      const history: Record<string, { count: number; lastSeen: number; questionIds: string[] }> = raw
        ? JSON.parse(raw)
        : {};

      const current = history[errorType] || { count: 0, lastSeen: 0, questionIds: [] };
      current.count += 1;
      current.lastSeen = Date.now();
      if (!current.questionIds.includes(questionId)) {
        current.questionIds.push(questionId);
      }
      history[errorType] = current;

      localStorage.setItem(STORAGE_ERROR_HISTORY, JSON.stringify(history));
      return current.count;
    } catch {
      return 1;
    }
  }

  /**
   * Logs a real learning event
   */
  public static recordLearningEvent(event: Omit<RecordedLearningEvent, 'id' | 'timestamp'>): RecordedLearningEvent {
    const fullEvent: RecordedLearningEvent = {
      ...event,
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      timestamp: Date.now()
    };

    try {
      const raw = localStorage.getItem(STORAGE_LEARNING_EVENTS);
      const list: RecordedLearningEvent[] = raw ? JSON.parse(raw) : [];
      list.push(fullEvent);
      // Keep last 200 events
      if (list.length > 200) list.shift();
      localStorage.setItem(STORAGE_LEARNING_EVENTS, JSON.stringify(list));
    } catch (e) {
      console.warn('Failed to record learning event:', e);
    }

    return fullEvent;
  }
}
