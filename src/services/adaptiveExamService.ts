/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - ADAPTIVE EXAM & SIMILAR QUESTION SERVICE
 * Powers:
 * 1. Adaptive Exam generation from Attempt 2+ based on error history and mastery.
 * 2. Similar Question Engine ([LÀM MỘT CÂU TƯƠNG TỰ]) targeting same archetypeId with new data.
 */

import { ExamEngine, ExamGradingResult, ExamQuestionItem } from './examEngine';
import { questionBank, ARCHETYPE_MAP } from '../data/questionBank1000';
import { SeededPRNG } from './questionSelectionEngine';

export interface StudentMasteryProfile {
  totalAttempts: number;
  averageScore: number;
  highestScore: number;
  recentScore: number;
  strugglingArchetypes: Array<{ archetypeId: string; name: string; errorCount: number }>;
  strongArchetypes: Array<{ archetypeId: string; name: string; successCount: number }>;
  topicMastery: {
    cylinder: number; // 0 - 100%
    cone: number;
    sphere: number;
    mixed: number;
  };
}

export class AdaptiveExamService {
  /**
   * Computes student mastery profile from history
   */
  public static getMasteryProfile(): StudentMasteryProfile {
    const history = ExamEngine.getExamHistory();
    if (history.length === 0) {
      return {
        totalAttempts: 0,
        averageScore: 0,
        highestScore: 0,
        recentScore: 0,
        strugglingArchetypes: [],
        strongArchetypes: [],
        topicMastery: { cylinder: 0, cone: 0, sphere: 0, mixed: 0 }
      };
    }

    let sumScore = 0;
    let highestScore = 0;
    const archetypeErrors: Record<string, number> = {};
    const archetypeSuccess: Record<string, number> = {};

    let cylCorrect = 0, cylTotal = 0;
    let coneCorrect = 0, coneTotal = 0;
    let sphCorrect = 0, sphTotal = 0;
    let mixCorrect = 0, mixTotal = 0;

    history.forEach((att, idx) => {
      sumScore += att.score;
      if (att.score > highestScore) highestScore = att.score;

      cylCorrect += att.topicStats.cylinder.correct;
      cylTotal += att.topicStats.cylinder.total;

      coneCorrect += att.topicStats.cone.correct;
      coneTotal += att.topicStats.cone.total;

      sphCorrect += att.topicStats.sphere.correct;
      sphTotal += att.topicStats.sphere.total;

      mixCorrect += att.topicStats.mixed.correct;
      mixTotal += att.topicStats.mixed.total;

      att.detectedErrors.forEach((err) => {
        const qRes = att.questionResults.find((qr) => qr.questionId === err.questionId);
        if (qRes) {
          archetypeErrors[err.questionId] = (archetypeErrors[err.questionId] || 0) + 1;
        }
      });
    });

    const struggling = Object.entries(archetypeErrors)
      .map(([id, count]) => {
        const archDef = ARCHETYPE_MAP.get(id);
        return {
          archetypeId: id,
          name: archDef?.name || id,
          errorCount: count
        };
      })
      .sort((a, b) => b.errorCount - a.errorCount)
      .slice(0, 5);

    return {
      totalAttempts: history.length,
      averageScore: Math.round((sumScore / history.length) * 10) / 10,
      highestScore,
      recentScore: history[0]?.score || 0,
      strugglingArchetypes: struggling,
      strongArchetypes: [],
      topicMastery: {
        cylinder: cylTotal > 0 ? Math.round((cylCorrect / cylTotal) * 100) : 80,
        cone: coneTotal > 0 ? Math.round((coneCorrect / coneTotal) * 100) : 75,
        sphere: sphTotal > 0 ? Math.round((sphCorrect / sphTotal) * 100) : 85,
        mixed: mixTotal > 0 ? Math.round((mixCorrect / mixTotal) * 100) : 70
      }
    };
  }

  /**
   * Generates adaptive weights for next exam attempt
   */
  public static getAdaptiveWeights(): Record<string, number> {
    const history = ExamEngine.getExamHistory();
    const weights: Record<string, number> = {};

    if (history.length === 0) return weights;

    // Give higher priority to archetypes where errors occurred in recent 3 attempts
    const recentAttempts = history.slice(0, 3);
    recentAttempts.forEach((att) => {
      att.detectedErrors.forEach((err) => {
        weights[err.questionId] = (weights[err.questionId] || 0) + 2.0;
      });
    });

    return weights;
  }

  /**
   * Finds a verified similar question with the SAME archetype but DIFFERENT questionId and data
   */
  public static findSimilarQuestion(
    currentQuestion: ExamQuestionItem,
    seed: number = Date.now()
  ): ExamQuestionItem | null {
    const prng = new SeededPRNG(seed);
    const allQuestions = questionBank.getAllQuestions();

    // 1. Filter verified variants with same archetypeId but different id
    const candidateVariants = allQuestions.filter((q) => {
      const qId = q.id || (q as any).generatedId;
      const archId = q.archetypeId || (q as any).sourceArchetypeId;
      const isVerified =
        q.recordType === 'SOURCE_EXACT'
          ? q.verificationStatus === 'VERIFIED_SOURCE'
          : q.validationStatus === 'VERIFIED_GENERATED';

      return isVerified && archId === currentQuestion.archetypeId && qId !== currentQuestion.id;
    });

    if (candidateVariants.length === 0) {
      // Fallback to same topic if specific archetype has only 1 item
      const fallbackCandidates = allQuestions.filter((q) => {
        const qId = q.id || (q as any).generatedId;
        const isVerified =
          q.recordType === 'SOURCE_EXACT'
            ? q.verificationStatus === 'VERIFIED_SOURCE'
            : q.validationStatus === 'VERIFIED_GENERATED';
        return isVerified && qId !== currentQuestion.id;
      });

      if (fallbackCandidates.length === 0) return null;
      const shuffledFallback = prng.shuffle(fallbackCandidates);
      const chosen = shuffledFallback[0];
      return (ExamEngine as any).buildExamQuestionItem(chosen, currentQuestion.questionType, 1, prng);
    }

    const shuffled = prng.shuffle(candidateVariants);
    const chosenRaw = shuffled[0];

    return (ExamEngine as any).buildExamQuestionItem(chosenRaw, currentQuestion.questionType, 1, prng);
  }
}
