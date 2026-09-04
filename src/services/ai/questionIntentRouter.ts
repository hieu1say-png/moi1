/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - QUESTION INTENT ROUTER (V5.0)
 * Intelligent classification for student questions in Grade 9 3D Geometry:
 * - Normalization integration
 * - Canonical Topic Classification (CYLINDER, CONE, SPHERE, PARADOX_1_3, etc.)
 * - 19 Canonical Intent Taxonomy
 * - Sub-Intent Extraction
 * - Confidence Score Metric (0.00 - 1.00)
 * - Math entity and value extractor (r, h, l, d, V, Sxq, Stp)
 * - Misconception & Error diagnosis
 * - Student state classification
 * - Clarification trigger
 */

import { CanonicalTopic, CanonicalIntent, CanonicalSubIntent, QuestionDifficulty, ResponseMode, StudentStateType } from '../../data/questionBank1000/types';
import { QuestionNormalizer } from './questionNormalizer';
import { ErrorDetector } from './errorDetector';
import { StudentStateDetector } from './studentStateDetector';

export type QuestionIntent = CanonicalIntent;
export type GeometryObject = CanonicalTopic;
export type StudentState = StudentStateType;

export interface QuestionRouterResult {
  intent: CanonicalIntent;
  secondaryIntents: CanonicalIntent[];
  topic: CanonicalTopic;
  subIntent: CanonicalSubIntent;
  difficulty: QuestionDifficulty;
  confidence: number;
  responseMode: ResponseMode;
  requiresCalculation: boolean;
  requires3D: boolean;
  requiresClarification: boolean;
  detectedValues: Record<string, number | string>;
  missingInformation: string[];
  misconception: string | null;
  studentState: StudentStateType;
  matchedQuestionIds?: string[];
  clarificationQuestion: string | null;
}

export interface RouterContext {
  currentShape?: string;
  currentMode?: string;
  currentActivity?: string;
  currentRoute?: string;
  currentR?: number | null;
  currentH?: number | null;
  currentL?: number | null;
  pourCount?: number | null;
  highlightTarget?: string | null;
  wrongCount?: number;
  attemptCount?: number;
  timeSpent?: number;
  userAnswer?: any;
  expectedAnswer?: any;
  studentAnswer?: any;
  lastError?: string | null;
}

export class QuestionIntentRouter {
  public static route(
    rawMessage: string,
    context: RouterContext = {},
    _history: any[] = []
  ): QuestionRouterResult {
    const rawClean = (rawMessage || '').trim();
    const normalized = QuestionNormalizer.normalize(rawClean);
    const cleanNoAccent = QuestionNormalizer.removeAccents(normalized);

    // 1. Topic Identification
    const topic = this.detectTopic(normalized, cleanNoAccent, context);

    // 2. Intent Identification
    const { primaryIntent, secondaryIntents, subIntent, confidence, clarificationQuestion } =
      this.detectIntent(normalized, cleanNoAccent, topic, context);

    // 3. Extract Math Values & Parameters
    const detectedValues = this.extractValues(normalized);

    // 4. Misconception / Error Diagnosis
    const diagnosis = ErrorDetector.diagnose(normalized, {
      shape: topic.toLowerCase(),
      r: typeof detectedValues.r === 'number' ? detectedValues.r : undefined,
      h: typeof detectedValues.h === 'number' ? detectedValues.h : undefined,
      l: typeof detectedValues.l === 'number' ? detectedValues.l : undefined,
      d: typeof detectedValues.d === 'number' ? detectedValues.d : undefined,
      studentAnswer: context.userAnswer || detectedValues.studentAnswer
    });
    const misconception = diagnosis ? diagnosis.name : null;

    // 5. Student State
    const studentState = StudentStateDetector.detect(normalized, {
      wrongCount: context.wrongCount,
      attemptCount: context.attemptCount,
      timeSpent: context.timeSpent,
      lastError: context.lastError
    });

    // 6. Response Mode Selection
    const responseMode = this.determineResponseMode(primaryIntent, misconception, confidence, context);

    // 7. Requirements flags
    const requiresCalculation =
      primaryIntent === 'CALCULATION' ||
      primaryIntent === 'CHECK_ANSWER' ||
      Object.keys(detectedValues).length >= 2;

    const requires3D =
      primaryIntent === 'VISUAL_3D' ||
      primaryIntent === 'PARADOX_1_3' ||
      primaryIntent === 'NET_UNFOLD' ||
      normalized.includes('3d') ||
      normalized.includes('mô hình') ||
      normalized.includes('trải phẳng') ||
      normalized.includes('rót nước') ||
      context.pourCount !== null;

    const requiresClarification = confidence < 0.40 && !context.currentShape;

    // 8. Missing information
    const missingInformation: string[] = [];
    if (primaryIntent === 'CALCULATION') {
      if (topic === 'CYLINDER') {
        if (!detectedValues.r && !detectedValues.d) missingInformation.push('bán kính r hoặc đường kính d');
        if (!detectedValues.h) missingInformation.push('chiều cao h');
      } else if (topic === 'CONE') {
        if (!detectedValues.r && !detectedValues.d) missingInformation.push('bán kính r hoặc đường kính d');
        if (!detectedValues.h && !detectedValues.l) missingInformation.push('chiều cao h hoặc đường sinh l');
      } else if (topic === 'SPHERE') {
        if (!detectedValues.r && !detectedValues.d && !detectedValues.R) missingInformation.push('bán kính R hoặc đường kính d');
      }
    }

    return {
      intent: primaryIntent,
      secondaryIntents,
      topic,
      subIntent,
      difficulty: 'UNDERSTAND',
      confidence,
      responseMode,
      requiresCalculation,
      requires3D,
      requiresClarification,
      detectedValues,
      missingInformation,
      misconception,
      studentState,
      clarificationQuestion: requiresClarification ? (clarificationQuestion || 'Em đang hỏi về hình trụ, hình nón hay hình cầu vậy?') : null
    };
  }

  private static detectTopic(norm: string, cleanNoAccent: string, context: RouterContext): CanonicalTopic {
    // Paradox 1/3 explicit keywords
    if (
      norm.includes('1/3') ||
      norm.includes('đổ nước') ||
      norm.includes('rót nước') ||
      norm.includes('3 lần') ||
      norm.includes('nghịch lý') ||
      context.pourCount !== null ||
      context.currentActivity?.includes('paradox')
    ) {
      if (norm.includes('tại sao 1/3') || norm.includes('rót nước') || norm.includes('3 lần') || norm.includes('phễu')) {
        return 'PARADOX_1_3';
      }
    }

    // Cone keywords
    if (
      norm.includes('hình nón') ||
      norm.includes('nón') ||
      norm.includes('đường sinh') ||
      norm.includes('hình quạt') ||
      norm.includes('cung hình quạt') ||
      norm.includes('bán kính hình quạt') ||
      cleanNoAccent.includes('hinh non') ||
      cleanNoAccent.includes('duong sinh')
    ) {
      return 'CONE';
    }

    // Cylinder keywords
    if (
      norm.includes('hình trụ') ||
      norm.includes('trụ') ||
      norm.includes('hình chữ nhật') && norm.includes('trải') ||
      cleanNoAccent.includes('hinh tru')
    ) {
      return 'CYLINDER';
    }

    // Sphere keywords
    if (
      norm.includes('hình cầu') ||
      norm.includes('mặt cầu') ||
      norm.includes('khối cầu') ||
      norm.includes('hình tròn lớn') ||
      norm.includes('thiết diện cầu') ||
      norm.includes('tâm cầu') ||
      cleanNoAccent.includes('hinh cau') ||
      cleanNoAccent.includes('mat cau')
    ) {
      return 'SPHERE';
    }

    // Fallback to active context shape
    if (context.currentShape) {
      const s = context.currentShape.toLowerCase();
      if (s === 'cylinder') return 'CYLINDER';
      if (s === 'cone') return 'CONE';
      if (s === 'sphere') return 'SPHERE';
      if (s.includes('paradox')) return 'PARADOX_1_3';
    }

    return 'GENERAL_GEOMETRY';
  }

  private static detectIntent(
    norm: string,
    cleanNoAccent: string,
    topic: CanonicalTopic,
    context: RouterContext
  ): {
    primaryIntent: CanonicalIntent;
    secondaryIntents: CanonicalIntent[];
    subIntent: CanonicalSubIntent;
    confidence: number;
    clarificationQuestion: string | null;
  } {
    const secondaryIntents: CanonicalIntent[] = [];
    let subIntent: CanonicalSubIntent = 'GENERAL';
    let confidence = 0.88;
    let clarificationQuestion: string | null = null;

    // Sub-intent check
    if (norm.includes('đường sinh') || norm.includes(' l ') || norm.endsWith(' l')) subIntent = 'SLANT_HEIGHT';
    else if (norm.includes('chiều cao') || norm.includes(' h ') || norm.endsWith(' h')) subIntent = 'HEIGHT';
    else if (norm.includes('đường kính') || norm.includes(' d ') || norm.endsWith(' d')) subIntent = 'DIAMETER';
    else if (norm.includes('bán kính') || norm.includes(' r ') || norm.endsWith(' r')) subIntent = 'RADIUS';
    else if (norm.includes('diện tích xung quanh') || norm.includes('sxq')) subIntent = 'SURFACE_AREA';
    else if (norm.includes('diện tích toàn phần') || norm.includes('stp')) subIntent = 'SURFACE_AREA';
    else if (norm.includes('thể tích') || norm.includes(' v ') || norm.endsWith(' v')) subIntent = 'VOLUME';
    else if (norm.includes('trải phẳng') || norm.includes('hình quạt') || norm.includes('hình chữ nhật')) subIntent = '3D_UNFOLD';
    else if (norm.includes('thiết diện') || norm.includes('mặt cắt')) subIntent = 'AXIAL_SECTION';
    else if (norm.includes('hình tròn lớn') || norm.includes('đường tròn lớn')) subIntent = 'GREAT_CIRCLE';

    // 1. Axial Section (Thiết diện qua trục / mặt cắt)
    if (
      norm.includes('thiết diện qua trục') ||
      norm.includes('mặt cắt qua trục') ||
      norm.includes('cắt dọc trục') ||
      (norm.includes('thiết diện') && (norm.includes('trục') || norm.includes('tam giác') || norm.includes('hình chữ nhật')))
    ) {
      return {
        primaryIntent: 'AXIAL_SECTION',
        secondaryIntents: ['CONCEPT', 'CALCULATION'],
        subIntent: 'AXIAL_SECTION',
        confidence: 0.98,
        clarificationQuestion: null
      };
    }

    // 2. Great Circle (Hình tròn lớn / Thiết diện hình cầu)
    if (
      norm.includes('hình tròn lớn') ||
      norm.includes('đường tròn lớn') ||
      norm.includes('cắt qua tâm') ||
      (norm.includes('mặt phẳng cắt') && norm.includes('cầu')) ||
      (norm.includes('khoảng cách d') && norm.includes('cầu'))
    ) {
      return {
        primaryIntent: 'GREAT_CIRCLE',
        secondaryIntents: ['CONCEPT', 'CALCULATION'],
        subIntent: 'GREAT_CIRCLE',
        confidence: 0.98,
        clarificationQuestion: null
      };
    }

    // 3. Error Analysis / Misconception
    if (
      (norm.includes('đúng không') && (norm.includes('em lấy') || norm.includes('em tính') || norm.includes('nhầm') || norm.includes('ra'))) ||
      norm.includes('em sai ở đâu') ||
      norm.includes('sai ở bước nào') ||
      norm.includes('d=8 mà em lấy r=8') ||
      norm.includes('tính πrh có đúng không') ||
      norm.includes('thiếu bình phương') ||
      norm.includes('em làm thế này đúng chưa')
    ) {
      return {
        primaryIntent: 'ERROR_ANALYSIS',
        secondaryIntents: ['CHECK_ANSWER'],
        subIntent,
        confidence: 0.96,
        clarificationQuestion: null
      };
    }

    // 4. Check Answer (e.g. "Em ra 128π có đúng không?")
    if (
      (norm.includes('có đúng không') || norm.includes('đúng chưa') || norm.includes('đúng ko') || norm.includes('kết quả đúng không')) &&
      (/\d+/.test(norm) || norm.includes('π'))
    ) {
      return {
        primaryIntent: 'CHECK_ANSWER',
        secondaryIntents: ['CALCULATION'],
        subIntent,
        confidence: 0.95,
        clarificationQuestion: null
      };
    }

    // 5. Paradox 1/3 & Pouring Experiment Intent
    if (
      topic === 'PARADOX_1_3' ||
      norm.includes('tại sao 1/3') ||
      norm.includes('tại sao có 1/3') ||
      norm.includes('đổ 3 lần') ||
      norm.includes('rót 3 lần') ||
      norm.includes('tại sao đổ 3 lần') ||
      norm.includes('mực nước')
    ) {
      return {
        primaryIntent: 'PARADOX_1_3',
        secondaryIntents: ['WHY', 'VISUAL_3D'],
        subIntent: norm.includes('đổ') || norm.includes('rót') || norm.includes('lần') ? 'POUR_COUNT' : 'WATER_LEVEL',
        confidence: 0.98,
        clarificationQuestion: null
      };
    }

    // 6. Net Unfolding Intent (Trải phẳng / khai triển 3D)
    if (
      norm.includes('trải phẳng') ||
      norm.includes('khai triển') ||
      norm.includes('hình quạt') ||
      norm.includes('cung hình quạt') ||
      norm.includes('bán kính hình quạt') ||
      norm.includes('góc ở tâm') ||
      norm.includes('trải hình trụ') ||
      norm.includes('trải hình nón')
    ) {
      return {
        primaryIntent: 'NET_UNFOLD',
        secondaryIntents: ['VISUAL_3D', 'CONCEPT'],
        subIntent: '3D_UNFOLD',
        confidence: 0.98,
        clarificationQuestion: null
      };
    }

    // 7. Comparison / Archimedes Trinity Ratio (1 : 2 : 3)
    if (
      norm.includes('so sánh') ||
      norm.includes('tỉ lệ') ||
      norm.includes('tỷ lệ') ||
      norm.includes('archimedes') ||
      norm.includes('ac-si-met') ||
      norm.includes('1:2:3') ||
      norm.includes('1 : 2 : 3') ||
      (norm.includes('hình nón') && norm.includes('hình cầu') && norm.includes('hình trụ'))
    ) {
      return {
        primaryIntent: 'COMPARE',
        secondaryIntents: ['CONCEPT', 'FORMULA'],
        subIntent: 'VOLUME',
        confidence: 0.96,
        clarificationQuestion: null
      };
    }

    // 8. Mathematical Proof Intent
    if (
      norm.includes('chứng minh') ||
      norm.includes('cmr') ||
      norm.includes('tại sao l^2 = r^2 + h^2') ||
      norm.includes('chứng minh công thức')
    ) {
      return {
        primaryIntent: 'PROOF',
        secondaryIntents: ['WHY', 'CONCEPT'],
        subIntent: 'FORMULA_DERIVATION',
        confidence: 0.95,
        clarificationQuestion: null
      };
    }

    // 9. Why / Visual Geometrical Reasoning
    if (
      norm.includes('tại sao') ||
      norm.includes('vì sao') ||
      norm.includes('lý do') ||
      norm.includes('giải thích tại sao') ||
      norm.includes('tại sao lại có')
    ) {
      return {
        primaryIntent: 'WHY',
        secondaryIntents: ['EXPLANATION', 'CONCEPT'],
        subIntent,
        confidence: 0.94,
        clarificationQuestion: null
      };
    }

    // 10. Formula Recall
    if (
      norm.includes('công thức') ||
      norm.includes('công thức tính') ||
      norm.includes('công thức là gì') ||
      norm.includes('công thức nào') ||
      cleanNoAccent.includes('cong thuc')
    ) {
      return {
        primaryIntent: 'FORMULA',
        secondaryIntents: ['CONCEPT'],
        subIntent,
        confidence: 0.98,
        clarificationQuestion: null
      };
    }

    // 11. Practice / Exercise Request
    if (
      norm.includes('cho em bài tập') ||
      norm.includes('luyện tập') ||
      norm.includes('bài tập tương tự') ||
      norm.includes('cho em làm bài') ||
      norm.includes('thử làm bài')
    ) {
      return {
        primaryIntent: 'PRACTICE',
        secondaryIntents: ['EXAMPLE'],
        subIntent,
        confidence: 0.95,
        clarificationQuestion: null
      };
    }

    // 12. Example / Sample Problem
    if (
      norm.includes('ví dụ') ||
      norm.includes('cho em ví dụ') ||
      norm.includes('bài mẫu') ||
      norm.includes('bài toán mẫu')
    ) {
      return {
        primaryIntent: 'EXAMPLE',
        secondaryIntents: ['STEP_BY_STEP'],
        subIntent,
        confidence: 0.95,
        clarificationQuestion: null
      };
    }

    // 13. Advanced Challenge / Mastery (Điểm 9, 10)
    if (
      norm.includes('nâng cao') ||
      norm.includes('bài khó') ||
      norm.includes('điểm 10') ||
      norm.includes('thử thách') ||
      norm.includes('vận dụng cao')
    ) {
      return {
        primaryIntent: 'CHALLENGE',
        secondaryIntents: ['CALCULATION'],
        subIntent,
        confidence: 0.95,
        clarificationQuestion: null
      };
    }

    // 14. 3D Visual & Interactive Simulation
    if (
      norm.includes('xem 3d') ||
      norm.includes('mô hình 3d') ||
      norm.includes('quay mô hình') ||
      norm.includes('chiếu 3d')
    ) {
      return {
        primaryIntent: 'VISUAL_3D',
        secondaryIntents: ['CONCEPT'],
        subIntent,
        confidence: 0.96,
        clarificationQuestion: null
      };
    }

    // 15. Hint Request
    if (
      norm.includes('gợi ý') ||
      norm.includes('gợi ý thôi') ||
      norm.includes('cho em gợi ý') ||
      norm.includes('chỉ em cách làm')
    ) {
      return {
        primaryIntent: 'HINT',
        secondaryIntents: ['STEP_BY_STEP'],
        subIntent,
        confidence: 0.95,
        clarificationQuestion: null
      };
    }

    // 16. Step by step request
    if (
      norm.includes('từng bước') ||
      norm.includes('giải chi tiết') ||
      norm.includes('lời giải đầy đủ') ||
      norm.includes('các bước làm')
    ) {
      return {
        primaryIntent: 'STEP_BY_STEP',
        secondaryIntents: ['CALCULATION'],
        subIntent,
        confidence: 0.95,
        clarificationQuestion: null
      };
    }

    // 17. Calculation problem (contains numbers r=4, h=8 or "tính V", "tính diện tích")
    if (
      (norm.includes('tính') && (/\d+/.test(norm) || norm.includes('cho r') || norm.includes('cho h') || norm.includes('cho l'))) ||
      (norm.includes('cho') && norm.includes('tính'))
    ) {
      return {
        primaryIntent: 'CALCULATION',
        secondaryIntents: ['STEP_BY_STEP'],
        subIntent,
        confidence: 0.95,
        clarificationQuestion: null
      };
    }

    // 18. Real world problem
    if (
      norm.includes('lon') ||
      norm.includes('cốc') ||
      norm.includes('bồn nước') ||
      norm.includes('quả bóng') ||
      norm.includes('kem ốc quế') ||
      norm.includes('nón lá') ||
      norm.includes('phễu') ||
      norm.includes('thùng') ||
      norm.includes('ống cống') ||
      norm.includes('chai') ||
      norm.includes('bút chì')
    ) {
      return {
        primaryIntent: 'REAL_WORLD',
        secondaryIntents: ['CALCULATION'],
        subIntent,
        confidence: 0.94,
        clarificationQuestion: null
      };
    }

    // 19. Concept definition (e.g. "Đường sinh là gì?")
    if (
      norm.includes('là gì') ||
      norm.includes('khái niệm') ||
      norm.includes('định nghĩa') ||
      norm.includes('đường sinh là gì')
    ) {
      return {
        primaryIntent: 'CONCEPT',
        secondaryIntents: ['EXPLANATION'],
        subIntent,
        confidence: 0.95,
        clarificationQuestion: null
      };
    }

    // Short Ambiguous Questions (e.g. "cái này tính sao?", "sao thế?")
    if (norm.length < 15 && (norm.includes('tính sao') || norm.includes('làm sao') || norm.includes('thế nào'))) {
      if (!context.currentShape) {
        confidence = 0.30;
        clarificationQuestion = 'Em đang muốn tính đại lượng nào của hình trụ, hình nón hay hình cầu vậy?';
      }
    }

    return {
      primaryIntent: 'CONCEPT',
      secondaryIntents,
      subIntent,
      confidence,
      clarificationQuestion
    };
  }

  private static extractValues(text: string): Record<string, number | string> {
    const clean = text.toLowerCase().replace(/,/g, '.');
    const values: Record<string, number | string> = {};

    // r or R
    const rMatch = clean.match(/(?:bán kính|r|R)\s*[:=]?\s*(\d+(?:\.\d+)?)/);
    if (rMatch) values.r = parseFloat(rMatch[1]);

    // h
    const hMatch = clean.match(/(?:chiều cao|h)\s*[:=]?\s*(\d+(?:\.\d+)?)/);
    if (hMatch) values.h = parseFloat(hMatch[1]);

    // l
    const lMatch = clean.match(/(?:đường sinh|l)\s*[:=]?\s*(\d+(?:\.\d+)?)/);
    if (lMatch) values.l = parseFloat(lMatch[1]);

    // d
    const dMatch = clean.match(/(?:đường kính|d)\s*[:=]?\s*(\d+(?:\.\d+)?)/);
    if (dMatch) {
      values.d = parseFloat(dMatch[1]);
      if (values.r === undefined) {
        values.inferredR = values.d / 2;
      }
    }

    // student answer numbers (e.g. "128pi", "128π", "128")
    const ansMatch = clean.match(/(\d+(?:\.\d+)?)\s*(?:pi|\\pi|π)?/);
    if (ansMatch) {
      values.studentAnswer = parseFloat(ansMatch[1]);
    }

    return values;
  }

  private static determineResponseMode(
    intent: CanonicalIntent,
    misconception: string | null,
    confidence: number,
    context: RouterContext
  ): ResponseMode {
    if (confidence < 0.40 && !context.currentShape) return 'CLARIFICATION';
    if (misconception) return 'ERROR_CORRECTION';
    if (intent === 'FORMULA') return 'FORMULA_RECALL';
    if (intent === 'HINT') return 'GENTLE_HINT';
    if (intent === 'STEP_BY_STEP') return 'STEP_GUIDANCE';
    if (intent === 'VISUAL_3D' || intent === 'NET_UNFOLD' || intent === 'PARADOX_1_3') return 'VISUAL_EXPLANATION';
    if (intent === 'REAL_WORLD') return 'REAL_WORLD_EXPLANATION';
    if (intent === 'COMPARE') return 'COMPARE_EXPLANATION';
    return 'CONCEPT_EXPLANATION';
  }
}
