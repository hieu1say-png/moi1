/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - QUESTION INTELLIGENCE SERVICE
 * Central client-side orchestration layer for intelligent mathematical question handling:
 * Input -> Normalizer -> Router -> Question Bank Match -> Math Engine -> Pedagogical Engine -> Validator -> Quick Reply
 */

import { QuestionNormalizer } from './questionNormalizer';
import { QuestionIntentRouter, QuestionRouterResult, RouterContext } from './questionIntentRouter';
import { QuestionMatcher } from './questionMatcher';
import { MathEngine, MathDiagnosisResult } from './mathEngine';
import { PedagogicalEngine } from './pedagogicalEngine';
import { ResponseValidator } from './responseValidator';
import { QuickReplyEngine } from './quickReplyEngine';
import { QuickReplyOption, MatchedQuestionResult } from '../../data/questionBank1000/types';

export interface QuestionIntelligenceResult {
  reply: string;
  responseMode: string;
  topic: string;
  intent: string;
  subIntent: string;
  confidence: number;
  matchedQuestions: MatchedQuestionResult[];
  highlightTarget: string | null;
  quickReplies: QuickReplyOption[];
  mathDiagnosis?: MathDiagnosisResult;
  isQuickAnswer: boolean;
}

export class QuestionIntelligenceService {
  /**
   * Processes a student inquiry through the local Question Intelligence Pipeline.
   */
  public static processQuery(
    rawMessage: string,
    context: RouterContext = {},
    level: number = 1
  ): QuestionIntelligenceResult {
    // 1. Normalize
    const normalized = QuestionNormalizer.normalize(rawMessage);

    // 2. Intent & Topic Routing
    const routerResult: QuestionRouterResult = QuestionIntentRouter.route(rawMessage, context);

    // 3. Question Bank Inverted Index Search
    const matched = QuestionMatcher.match(
      normalized,
      routerResult.topic,
      routerResult.intent,
      routerResult.detectedValues,
      5
    );

    // 4. Math Diagnosis
    const mathValues = MathEngine.extractValues(normalized);
    let mathDiagnosis: MathDiagnosisResult | undefined;
    if (mathValues.studentValue !== undefined) {
      mathDiagnosis = MathEngine.diagnoseAnswer(routerResult.topic as any, mathValues);
    }

    // 5. Pedagogical Composition
    const topMatch = matched.length > 0 && matched[0].score >= 0.70 ? matched[0].record : null;
    const isQuickAnswer = !!(topMatch && routerResult.confidence >= 0.85 && topMatch.teacherStyleResponse);

    const composed = PedagogicalEngine.composeResponse(
      routerResult,
      topMatch,
      level,
      context,
      mathDiagnosis
    );

    // 6. Response Validation & KaTeX repair
    const validated = ResponseValidator.validateAndRepair(composed.reply, {
      topic: routerResult.topic,
      level
    });

    // 7. Quick Reply Generation
    const quickReplies = QuickReplyEngine.generate(routerResult.topic, routerResult.intent, {
      shape: context.currentShape,
      pourCount: context.pourCount,
      misconception: routerResult.misconception,
      level
    });

    return {
      reply: validated.repairedText,
      responseMode: composed.responseMode,
      topic: routerResult.topic,
      intent: routerResult.intent,
      subIntent: routerResult.subIntent,
      confidence: routerResult.confidence,
      matchedQuestions: matched,
      highlightTarget: composed.highlightTarget,
      quickReplies,
      mathDiagnosis,
      isQuickAnswer
    };
  }
}
