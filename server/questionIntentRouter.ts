/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - QUESTION INTENT ROUTER (SERVER-SIDE)
 */

export type QuestionIntent =
  | 'CONCEPT'
  | 'FORMULA'
  | 'CALCULATION'
  | 'WHY_EXPLANATION'
  | 'STEP_BY_STEP'
  | 'COMPARE'
  | 'REAL_WORLD'
  | 'VISUAL_3D'
  | 'PARADOX_1_3'
  | 'PROOF'
  | 'ERROR_ANALYSIS'
  | 'CHECK_ANSWER'
  | 'HINT'
  | 'EXAMPLE'
  | 'PRACTICE'
  | 'OTHER';

export type GeometryObject =
  | 'CYLINDER'
  | 'CONE'
  | 'SPHERE'
  | 'PARADOX_1_3'
  | 'GENERAL_GEOMETRY';

export type StudentState =
  | 'CONFIDENT'
  | 'CURIOUS'
  | 'CONFUSED'
  | 'FRUSTRATED'
  | 'RUSHING'
  | 'DEPENDENT_ON_HINT'
  | 'INDEPENDENT'
  | 'SUCCESSFUL';

export interface QuestionRouterResult {
  intent: QuestionIntent;
  secondaryIntents: QuestionIntent[];
  topic: string;
  object: GeometryObject;
  difficulty: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';
  responseMode:
    | 'SOCRATIC'
    | 'DIRECT'
    | 'STEP_BY_STEP'
    | 'ERROR_CORRECTION'
    | 'VISUAL_GUIDE'
    | 'CLARIFICATION';
  confidence: number;
  requiresCalculation: boolean;
  requiresExplanation: boolean;
  requires3D: boolean;
  requiresHint: boolean;
  detectedValues: Record<string, number | string>;
  missingInformation: string[];
  misconception: string | null;
  studentState: StudentState;
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
  /**
   * Main entry point to route and analyze a student message.
   */
  public static route(
    rawMessage: string,
    context: RouterContext = {},
    history: any[] = []
  ): QuestionRouterResult {
    const clean = (rawMessage || '').trim().toLowerCase();
    const rawClean = (rawMessage || '').trim();

    // 1. Identify Object / Module
    const object = this.detectObject(clean, context);

    // 2. Identify Primary Intent & Secondary Intents
    const { primaryIntent, secondaryIntents, clarificationQuestion } = this.detectIntent(
      clean,
      rawClean,
      object,
      context,
      history
    );

    // 3. Extract Math Values
    const detectedValues = this.extractValues(clean);

    // 4. Misconception & Error Diagnosis
    const misconception = this.detectMisconception(clean, object);

    // 5. Student State
    const studentState = this.detectStudentState(context, primaryIntent, misconception);

    // 6. Topic classification
    const topic = this.detectTopic(clean, object);

    // 7. Requirements flags
    const requiresCalculation =
      primaryIntent === 'CALCULATION' ||
      primaryIntent === 'CHECK_ANSWER' ||
      Object.keys(detectedValues).length >= 2;

    const requiresExplanation =
      primaryIntent === 'WHY_EXPLANATION' ||
      primaryIntent === 'CONCEPT' ||
      primaryIntent === 'ERROR_ANALYSIS' ||
      primaryIntent === 'PROOF';

    const requires3D =
      primaryIntent === 'VISUAL_3D' ||
      primaryIntent === 'PARADOX_1_3' ||
      clean.includes('3d') ||
      clean.includes('mô hình') ||
      clean.includes('trải phẳng') ||
      clean.includes('cắt') ||
      clean.includes('quay') ||
      clean.includes('rót') ||
      context.pourCount !== null;

    const requiresHint =
      primaryIntent === 'HINT' ||
      primaryIntent === 'STEP_BY_STEP' ||
      (context.wrongCount !== undefined && context.wrongCount >= 2);

    // Missing information check
    const missingInformation: string[] = [];
    if (primaryIntent === 'CALCULATION' && object === 'CYLINDER') {
      if (detectedValues.r === undefined && detectedValues.d === undefined) missingInformation.push('bán kính r');
      if (detectedValues.h === undefined) missingInformation.push('chiều cao h');
    } else if (primaryIntent === 'CALCULATION' && object === 'CONE') {
      if (detectedValues.r === undefined) missingInformation.push('bán kính r');
      if (detectedValues.h === undefined && detectedValues.l === undefined) missingInformation.push('chiều cao h hoặc đường sinh l');
    } else if (primaryIntent === 'CALCULATION' && object === 'SPHERE') {
      if (detectedValues.R === undefined && detectedValues.r === undefined && detectedValues.d === undefined) missingInformation.push('bán kính R');
    }

    // Response Mode selection
    let responseMode: QuestionRouterResult['responseMode'] = 'SOCRATIC';
    if (clarificationQuestion) {
      responseMode = 'CLARIFICATION';
    } else if (primaryIntent === 'ERROR_ANALYSIS') {
      responseMode = 'ERROR_CORRECTION';
    } else if (primaryIntent === 'VISUAL_3D') {
      responseMode = 'VISUAL_GUIDE';
    } else if (primaryIntent === 'STEP_BY_STEP' || primaryIntent === 'CALCULATION') {
      responseMode = 'STEP_BY_STEP';
    } else if (primaryIntent === 'FORMULA' || primaryIntent === 'CONCEPT') {
      responseMode = 'DIRECT';
    }

    return {
      intent: primaryIntent,
      secondaryIntents,
      topic,
      object,
      difficulty: clean.length > 80 || detectedValues.l !== undefined ? 'INTERMEDIATE' : 'BASIC',
      responseMode,
      confidence: clarificationQuestion ? 0.4 : 0.95,
      requiresCalculation,
      requiresExplanation,
      requires3D,
      requiresHint,
      detectedValues,
      missingInformation,
      misconception,
      studentState,
      clarificationQuestion
    };
  }

  /**
   * Detects the relevant geometric module.
   */
  private static detectObject(clean: string, context: RouterContext): GeometryObject {
    // Check Paradox first
    if (
      clean.includes('đổ 3 lần') ||
      clean.includes('rót 3 lần') ||
      clean.includes('rót nước') ||
      clean.includes('1/3') ||
      clean.includes('nghịch lý') ||
      context.currentActivity?.includes('volume_paradox') ||
      context.pourCount !== null
    ) {
      if (clean.includes('đổ 3 lần') || clean.includes('rót') || clean.includes('thí nghiệm') || context.pourCount !== null) {
        return 'PARADOX_1_3';
      }
    }

    // Check Cylinder
    if (
      clean.includes('hình trụ') ||
      clean.includes('khối trụ') ||
      clean.includes('trụ') ||
      clean.includes('trải phẳng hình trụ') ||
      clean.includes('hai đáy tròn') ||
      clean.includes('2πrh')
    ) {
      return 'CYLINDER';
    }

    // Check Cone
    if (
      clean.includes('hình nón') ||
      clean.includes('khối nón') ||
      clean.includes('nón') ||
      clean.includes('đường sinh') ||
      clean.includes('góc ở đỉnh') ||
      clean.includes('πrl')
    ) {
      return 'CONE';
    }

    // Check Sphere
    if (
      clean.includes('hình cầu') ||
      clean.includes('khối cầu') ||
      clean.includes('mặt cầu') ||
      clean.includes('quả cầu') ||
      clean.includes('4/3') ||
      clean.includes('4πr^2') ||
      clean.includes('4πr²')
    ) {
      return 'SPHERE';
    }

    // Fallback to active UI context shape
    const shape = (context.currentShape || '').toLowerCase();
    if (shape.includes('cone')) return 'CONE';
    if (shape.includes('sphere')) return 'SPHERE';
    if (shape.includes('cylinder')) return 'CYLINDER';

    return 'GENERAL_GEOMETRY';
  }

  /**
   * Determines the primary intent, secondary intents, and if clarification is needed.
   */
  private static detectIntent(
    clean: string,
    rawClean: string,
    object: GeometryObject,
    context: RouterContext,
    history: any[] = []
  ): {
    primaryIntent: QuestionIntent;
    secondaryIntents: QuestionIntent[];
    clarificationQuestion: string | null;
  } {
    const secondaryIntents: QuestionIntent[] = [];
    let clarificationQuestion: string | null = null;

    // Test case 10: "Cái này là gì?" / "đây là gì?"
    if (clean === 'cái này là gì?' || clean === 'cái này là gì' || clean === 'đây là gì?' || clean === 'đây là gì') {
      if (context.highlightTarget) {
        return { primaryIntent: 'VISUAL_3D', secondaryIntents: ['CONCEPT'], clarificationQuestion: null };
      }
      return {
        primaryIntent: 'CONCEPT',
        secondaryIntents: ['VISUAL_3D'],
        clarificationQuestion:
          object === 'CONE'
            ? 'Em đang muốn hỏi về chi tiết nào trên mô hình 3D hình nón vậy? Chiều cao h, đường sinh l hay bán kính đáy r?'
            : object === 'CYLINDER'
            ? 'Em đang muốn hỏi về chi tiết nào trên mô hình 3D hình trụ vậy? Bán kính đáy r, chiều cao h hay mặt xung quanh trải phẳng?'
            : 'Em đang hỏi về chi tiết hay khối hình học nào vậy? Hãy chỉ rõ để thầy giải thích nhé!'
      };
    }

    // Test case 8: "Thầy cho em gợi ý thôi" / "cho em gợi ý"
    if (
      clean.includes('gợi ý thôi') ||
      clean.includes('cho em gợi ý') ||
      clean.includes('cho xin gợi ý') ||
      clean === 'gợi ý' ||
      clean === 'gợi ý?' ||
      clean === 'gợi ý giúp em'
    ) {
      return { primaryIntent: 'HINT', secondaryIntents: ['STEP_BY_STEP'], clarificationQuestion: null };
    }

    // Test case 4: "Em tính πrh có đúng không?" / "sai ở đâu"
    if (
      clean.includes('sai ở đâu') ||
      clean.includes('em tính') && (clean.includes('đúng không') || clean.includes('đúng ko') || clean.includes('chưa'))
    ) {
      if (clean.includes('πrh') || clean.includes('pirh') || clean.includes('sai ở đâu') || clean.includes('nhầm')) {
        return { primaryIntent: 'ERROR_ANALYSIS', secondaryIntents: ['CHECK_ANSWER', 'FORMULA'], clarificationQuestion: null };
      }
    }

    // Test case 9: "Em làm ra 128π đúng không?"
    if (
      (clean.includes('đúng không') || clean.includes('đúng ko') || clean.includes('đúng chưa') || clean.includes('kết quả này')) &&
      (clean.includes('làm ra') || clean.includes('ra') || clean.includes('đáp án') || clean.includes('kết quả') || clean.match(/\d+/))
    ) {
      return { primaryIntent: 'CHECK_ANSWER', secondaryIntents: ['CALCULATION'], clarificationQuestion: null };
    }

    // Test case 3: "r = 4, h = 8 tính V" / Calculation
    if (
      (clean.match(/r\s*=\s*\d+/) && clean.match(/h\s*=\s*\d+/)) ||
      clean.includes('tính v') ||
      clean.includes('tính thể tích') ||
      clean.includes('tính diện tích') ||
      clean.includes('tính sxq') ||
      clean.includes('tính stp')
    ) {
      return { primaryIntent: 'CALCULATION', secondaryIntents: ['FORMULA', 'STEP_BY_STEP'], clarificationQuestion: null };
    }

    // Test case 6: "Tại sao phải đổ 3 lần?" / Paradox 1/3
    if (clean.includes('đổ 3 lần') || clean.includes('rót 3 lần') || clean.includes('3 lần')) {
      return { primaryIntent: 'PARADOX_1_3', secondaryIntents: ['WHY_EXPLANATION', 'VISUAL_3D'], clarificationQuestion: null };
    }

    // Test case 1 & 5: "Tại sao trải phẳng...", "Tại sao hình nón có 1/3?"
    if (
      clean.includes('tại sao') ||
      clean.includes('vì sao') ||
      clean.includes('nguyên nhân') ||
      clean.includes('lý do')
    ) {
      if (clean.includes('1/3') || clean.includes('đổ')) {
        secondaryIntents.push('PARADOX_1_3');
      }
      if (clean.includes('trải phẳng') || clean.includes('hình chữ nhật')) {
        secondaryIntents.push('VISUAL_3D');
      }
      return { primaryIntent: 'WHY_EXPLANATION', secondaryIntents, clarificationQuestion: null };
    }

    // Test case 2: "Công thức thể tích hình trụ?"
    if (
      clean.includes('công thức') ||
      clean.includes('tính bằng công thức nào') ||
      clean.includes('công thức tính')
    ) {
      return { primaryIntent: 'FORMULA', secondaryIntents: ['CONCEPT'], clarificationQuestion: null };
    }

    // Test case 7: "Đường sinh là gì?" / Concept
    if (
      clean.includes('là gì') ||
      clean.includes('định nghĩa') ||
      clean.includes('khái niệm') ||
      clean.includes('đường sinh là gì') ||
      clean.includes('bán kính ở đâu')
    ) {
      return { primaryIntent: 'CONCEPT', secondaryIntents: ['VISUAL_3D'], clarificationQuestion: null };
    }

    // Trải phẳng thế nào? / 3D Visualization
    if (
      clean.includes('trải phẳng thế nào') ||
      clean.includes('trải phẳng') ||
      clean.includes('mặt cắt') ||
      clean.includes('mô hình 3d') ||
      clean.includes('xoay')
    ) {
      return { primaryIntent: 'VISUAL_3D', secondaryIntents: ['CONCEPT'], clarificationQuestion: null };
    }

    // Step by step guidance
    if (clean.includes('từng bước') || clean.includes('các bước') || clean.includes('hướng dẫn')) {
      return { primaryIntent: 'STEP_BY_STEP', secondaryIntents: ['HINT'], clarificationQuestion: null };
    }

    // Compare
    if (clean.includes('so sánh') || clean.includes('khác nhau') || clean.includes('gấp mấy lần')) {
      return { primaryIntent: 'COMPARE', secondaryIntents: ['CONCEPT'], clarificationQuestion: null };
    }

    // Real world application
    if (clean.includes('thực tế') || clean.includes('đời sống') || clean.includes('ứng dụng') || clean.includes('ví dụ')) {
      return { primaryIntent: 'REAL_WORLD', secondaryIntents: ['EXAMPLE'], clarificationQuestion: null };
    }

    // Proof
    if (clean.includes('chứng minh') || clean.includes('cmr')) {
      return { primaryIntent: 'PROOF', secondaryIntents: ['WHY_EXPLANATION'], clarificationQuestion: null };
    }

    // Practice
    if (clean.includes('bài tập') || clean.includes('luyện tập') || clean.includes('đề thi')) {
      return { primaryIntent: 'PRACTICE', secondaryIntents: ['EXAMPLE'], clarificationQuestion: null };
    }

    return { primaryIntent: 'OTHER', secondaryIntents: ['CONCEPT'], clarificationQuestion: null };
  }

  /**
   * Extracts values like r=4, h=8, l=5 from query.
   */
  private static extractValues(clean: string): Record<string, number | string> {
    const values: Record<string, number | string> = {};
    const rMatch = clean.match(/(?:bán kính|r|R)\s*[:=]?\s*(\d+(?:\.\d+)?)/);
    if (rMatch) values.r = parseFloat(rMatch[1]);

    const hMatch = clean.match(/(?:chiều cao|h)\s*[:=]?\s*(\d+(?:\.\d+)?)/);
    if (hMatch) values.h = parseFloat(hMatch[1]);

    const lMatch = clean.match(/(?:đường sinh|l)\s*[:=]?\s*(\d+(?:\.\d+)?)/);
    if (lMatch) values.l = parseFloat(lMatch[1]);

    const dMatch = clean.match(/(?:đường kính|d)\s*[:=]?\s*(\d+(?:\.\d+)?)/);
    if (dMatch) values.d = parseFloat(dMatch[1]);

    return values;
  }

  /**
   * Detects potential student misconceptions.
   */
  private static detectMisconception(clean: string, object: GeometryObject): string | null {
    if ((clean.includes('πrh') || clean.includes('pirh') || clean.includes('\\pi rh')) && !clean.includes('2πrh')) {
      return 'MISSING_SQUARE_IN_VOLUME';
    }
    if (object === 'CONE' && clean.includes('πr^2h') && !clean.includes('1/3')) {
      return 'FORGOT_ONE_THIRD_COEFFICIENT';
    }
    if (object === 'CONE' && clean.includes('sxq') && clean.includes('h')) {
      return 'USED_HEIGHT_INSTEAD_OF_GENERATRIX';
    }
    if (clean.includes('đường kính') && !clean.includes('chia 2') && !clean.includes('/2')) {
      return 'RADIUS_DIAMETER_CONFUSION';
    }
    return null;
  }

  /**
   * Detects student emotional & pedagogical state.
   */
  private static detectStudentState(
    context: RouterContext,
    intent: QuestionIntent,
    misconception: string | null
  ): StudentState {
    if (context.wrongCount && context.wrongCount >= 3) return 'FRUSTRATED';
    if (misconception || intent === 'ERROR_ANALYSIS' || (context.wrongCount && context.wrongCount >= 1)) return 'CONFUSED';
    if (intent === 'WHY_EXPLANATION' || intent === 'PARADOX_1_3' || intent === 'REAL_WORLD') return 'CURIOUS';
    if (intent === 'HINT') return 'DEPENDENT_ON_HINT';
    if (context.timeSpent && context.timeSpent < 15 && (context.attemptCount || 0) >= 2) return 'RUSHING';
    if (intent === 'CHECK_ANSWER' && !context.wrongCount) return 'CONFIDENT';
    return 'INDEPENDENT';
  }

  /**
   * Identifies topic keyword.
   */
  private static detectTopic(clean: string, object: GeometryObject): string {
    if (clean.includes('thể tích') || clean.includes('v') || clean.includes('đổ nước')) return 'VOLUME';
    if (clean.includes('diện tích xung quanh') || clean.includes('sxq')) return 'SURFACE_LATERAL';
    if (clean.includes('diện tích toàn phần') || clean.includes('stp')) return 'SURFACE_TOTAL';
    if (clean.includes('diện tích') || clean.includes('mặt cầu')) return 'SURFACE_AREA';
    if (clean.includes('trải phẳng') || clean.includes('hình chữ nhật')) return 'UNFOLDING';
    if (clean.includes('đường sinh') || clean.includes('pythagore') || clean.includes('pythagoras')) return 'GENERATRIX_PYTHAGORAS';
    if (clean.includes('mặt cắt') || clean.includes('thiết diện')) return 'CROSS_SECTION';
    return 'GENERAL_CONCEPT';
  }
}
