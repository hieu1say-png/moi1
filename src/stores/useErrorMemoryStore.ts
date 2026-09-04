/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - AI ERROR MEMORY & MASTERY CHECK STORE
 * Manages persistent error tracking, concept mastery evaluation, repeat detection,
 * and spaced mastery checks without unnecessary external API roundtrips.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  ErrorMemory,
  MasteryStatus,
  ConceptKey,
  ConceptMasteryRecord,
  ErrorTaxonomyType,
  MasteryCheckQuestion,
  MasteryCheckResult
} from '../types/errorMemory';
import { ShapeType } from '../types/dataArchitecture';
import { SpatialMetricKey } from '../types/spatialProfile';
import { useSpatialProfileStore } from './useSpatialProfileStore';
import { MASTERY_CHECK_BANK, getMasteryCheckByConcept, getRandomMasteryCheck } from '../data/masteryCheckBank';

// Default initial concept mastery records
const INITIAL_CONCEPTS: ConceptMasteryRecord[] = [
  {
    concept: 'radius_vs_diameter',
    conceptTitle: 'Phân biệt Bán kính R & Đường kính d',
    shape: 'cylinder',
    masteryScore: 78,
    masteryStatus: 'learning',
    independentSuccess: 3,
    repeatCount: 1,
    totalAttempts: 4,
    lastTestedAt: Date.now() - 3600000 * 2,
    relatedSpatialMetric: 'elementIdentification',
    recommendedPracticeRoute: '/practice'
  },
  {
    concept: 'generatrix_vs_height',
    conceptTitle: 'Đường sinh l & Chiều cao h Hình Nón',
    shape: 'cone',
    masteryScore: 65,
    masteryStatus: 'learning',
    independentSuccess: 2,
    repeatCount: 2,
    totalAttempts: 5,
    lastTestedAt: Date.now() - 3600000 * 5,
    relatedSpatialMetric: 'elementIdentification',
    recommendedPracticeRoute: '/explore'
  },
  {
    concept: 'cone_volume_one_third',
    conceptTitle: 'Tỉ số 1/3 Thể tích Hình Nón & Trụ',
    shape: 'cone',
    masteryScore: 90,
    masteryStatus: 'mastered',
    independentSuccess: 4,
    repeatCount: 0,
    totalAttempts: 4,
    lastTestedAt: Date.now() - 3600000 * 1,
    relatedSpatialMetric: 'mathematicalModeling',
    recommendedPracticeRoute: '/explore'
  },
  {
    concept: 'cylinder_total_surface',
    conceptTitle: 'Diện tích toàn phần Hình Trụ (Stp)',
    shape: 'cylinder',
    masteryScore: 72,
    masteryStatus: 'learning',
    independentSuccess: 2,
    repeatCount: 1,
    totalAttempts: 3,
    lastTestedAt: Date.now() - 3600000 * 8,
    relatedSpatialMetric: 'mathematicalModeling',
    recommendedPracticeRoute: '/practice'
  },
  {
    concept: 'sphere_great_circle',
    conceptTitle: 'Đường tròn lớn & Thiết diện Mặt Cầu',
    shape: 'sphere',
    masteryScore: 85,
    masteryStatus: 'mastered',
    independentSuccess: 3,
    repeatCount: 0,
    totalAttempts: 3,
    lastTestedAt: Date.now() - 3600000 * 12,
    relatedSpatialMetric: 'spatialTransformation',
    recommendedPracticeRoute: '/explore'
  },
  {
    concept: 'unfolding_nets',
    conceptTitle: 'Trải phẳng mặt xung quanh (3D → 2D)',
    shape: 'cylinder',
    masteryScore: 60,
    masteryStatus: 'learning',
    independentSuccess: 1,
    repeatCount: 2,
    totalAttempts: 4,
    lastTestedAt: Date.now() - 3600000 * 20,
    relatedSpatialMetric: 'threeDToTwoD',
    recommendedPracticeRoute: '/explore'
  }
];

export interface FailedQuestionItem {
  id: string;
  questionId: string;
  shape: ShapeType;
  difficulty?: string;
  questionText: string;
  options: Array<{ id: number | string; text: string; isCorrect?: boolean }>;
  correctOptionIndex: number;
  explanation: string;
  fourStepSolution?: {
    step1Summary: string;
    step2Strategy: string;
    step3KaTeX: string;
    step4TrapWarning: string;
  };
  failedAt: number;
  lastAttemptAt: number;
  reviewIntervalDays: number; // 1, 3, 7
  nextReviewAt: number;
  resolved: boolean;
  attemptCount: number;
  lastUserAnswer?: string | number;
  errorType?: string;
  conceptTitle?: string;
}

export interface ErrorMemoryState {
  errors: ErrorMemory[];
  failedQuestions: FailedQuestionItem[];
  conceptMasteries: Record<string, ConceptMasteryRecord>;
  activeMasteryCheck: MasteryCheckQuestion | null;
  pendingMasteryCheckConcept: string | null;
  lastCheckResult: MasteryCheckResult | null;

  // Failed Questions & Error Notebook Management
  addFailedQuestion: (item: Omit<FailedQuestionItem, 'id' | 'failedAt' | 'lastAttemptAt' | 'nextReviewAt' | 'resolved' | 'attemptCount' | 'reviewIntervalDays'> & { id?: string; reviewIntervalDays?: number }) => void;
  resolveFailedQuestion: (questionId: string) => void;
  recordFailedQuestionAttempt: (questionId: string, isCorrect: boolean, userAnswer?: any) => void;
  getFailedQuestions: (filter?: { shape?: ShapeType | 'all'; resolved?: boolean }) => FailedQuestionItem[];

  // Error Classification & Recording
  recordError: (params: {
    activityId: string;
    questionId?: string;
    shape: ShapeType | 'mixed';
    errorType?: string;
    conceptKey?: string;
    conceptTitle?: string;
    userAnswer?: any;
    expectedAnswer?: any;
    hintLevelUsed?: number;
    description?: string;
  }) => {
    errorMemory: ErrorMemory;
    hintStrategy: 'GUIDE' | 'VISUAL_REINFORCEMENT' | 'MINI_LESSON';
    repeatCount: number;
    pedagogicalFeedback: string;
  };

  // Success Recording with Hint-Aware Mastery Progression
  recordSuccess: (params: {
    activityId: string;
    questionId?: string;
    shape: ShapeType | 'mixed';
    conceptKey?: string;
    hintLevelUsed: number;
    timeSpent?: number;
  }) => {
    isIndependent: boolean;
    newStatus: MasteryStatus;
    triggeredMasteryCheck: boolean;
    message: string;
  };

  // Mastery Checks
  triggerMasteryCheck: (conceptKey?: string) => MasteryCheckQuestion | null;
  dismissActiveMasteryCheck: () => void;
  submitMasteryCheck: (userAnswer: any) => MasteryCheckResult;

  // Diagnostics & Queries
  getErrorsByConcept: (concept: string) => ErrorMemory[];
  getConceptMastery: (concept: string) => ConceptMasteryRecord | undefined;
  getAllConceptMasteries: () => ConceptMasteryRecord[];
  getTopRecurringMisconceptions: () => {
    concept: string;
    title: string;
    percentage: number;
    repeatCount: number;
    affectedCount: number;
    recommendation: string;
  }[];
  getStudentFacingProgress: () => {
    concept: string;
    title: string;
    score: number;
    status: MasteryStatus;
    statusLabel: string;
    badgeColor: string;
  }[];
  resetStore: () => void;
}

// Concept normalization helper
export function mapErrorToConcept(errorType?: string, titleOrDesc?: string, shape?: ShapeType | 'mixed'): {
  concept: ConceptKey | string;
  conceptTitle: string;
  spatialMetric: SpatialMetricKey;
} {
  const text = `${errorType || ''} ${titleOrDesc || ''}`.toLowerCase();

  if (text.includes('đường kính') || text.includes('bán kính') || text.includes('radius') || text.includes('diameter') || text.includes('quên chia 2')) {
    return {
      concept: 'radius_vs_diameter',
      conceptTitle: 'Bán kính và Đường kính (R vs d)',
      spatialMetric: 'elementIdentification'
    };
  }

  if (text.includes('đường sinh') || text.includes('chiều cao') || text.includes('generatrix') || text.includes('pythagor') || (shape === 'cone' && text.includes('l'))) {
    return {
      concept: 'generatrix_vs_height',
      conceptTitle: 'Đường sinh và Chiều cao Hình Nón (l vs h)',
      spatialMetric: 'elementIdentification'
    };
  }

  if (text.includes('1/3') || text.includes('rót nước') || text.includes('phân số') || (shape === 'cone' && text.includes('thể tích'))) {
    return {
      concept: 'cone_volume_one_third',
      conceptTitle: 'Tỉ số 1/3 Thể tích Hình Nón & Trụ',
      spatialMetric: 'mathematicalModeling'
    };
  }

  if (text.includes('toàn phần') || text.includes('stp') || text.includes('chu vi đáy') || (shape === 'cylinder' && text.includes('diện tích'))) {
    return {
      concept: 'cylinder_total_surface',
      conceptTitle: 'Diện tích toàn phần Hình Trụ (Stp)',
      spatialMetric: 'mathematicalModeling'
    };
  }

  if (text.includes('mặt cầu') || text.includes('4/3') || text.includes('mũ 3') || text.includes('4πr') || shape === 'sphere') {
    if (text.includes('cắt') || text.includes('thiết diện') || text.includes('mặt phẳng')) {
      return {
        concept: 'sphere_great_circle',
        conceptTitle: 'Đường tròn lớn & Thiết diện Mặt Cầu',
        spatialMetric: 'spatialTransformation'
      };
    }
    return {
      concept: 'sphere_formula_exponent',
      conceptTitle: 'Công thức Diện tích Mặt Cầu & Thể tích Khối Cầu',
      spatialMetric: 'mathematicalModeling'
    };
  }

  if (text.includes('khai triển') || text.includes('trải phẳng') || text.includes('hình chữ nhật') || text.includes('net') || text.includes('unfold')) {
    return {
      concept: 'unfolding_nets',
      conceptTitle: 'Khai triển Mặt Xung Quanh (3D → 2D)',
      spatialMetric: 'threeDToTwoD'
    };
  }

  if (text.includes('cắt') || text.includes('thiết diện') || text.includes('song song') || text.includes('section')) {
    return {
      concept: 'cross_section_plane',
      conceptTitle: 'Thiết diện và Mặt cắt Không Gian',
      spatialMetric: 'spatialTransformation'
    };
  }

  if (text.includes('đơn vị') || text.includes('unit') || text.includes('dm') || text.includes('lít')) {
    return {
      concept: 'unit_conversion',
      conceptTitle: 'Quy đổi Đơn vị Đo lường',
      spatialMetric: 'problemSolving'
    };
  }

  return {
    concept: 'arithmetic_calculation',
    conceptTitle: 'Tính toán Số học & Công thức',
    spatialMetric: 'problemSolving'
  };
}

export const useErrorMemoryStore = create<ErrorMemoryState>()(
  persist(
    (set, get) => ({
      errors: [
        {
          id: 'err-sample-1',
          studentId: 'student-9a2',
          activityId: 'practice-cone-01',
          questionId: 'ex-cone-num-01',
          shape: 'cone',
          errorType: 'GENERATRIX_ERROR',
          concept: 'generatrix_vs_height',
          conceptTitle: 'Đường sinh và Chiều cao Hình Nón (l vs h)',
          userAnswer: 'h = 5',
          expectedAnswer: 'l = 5 (h = 3, r = 4)',
          attemptNumber: 1,
          hintLevelUsed: 2,
          firstSeenAt: Date.now() - 3600000 * 5,
          lastSeenAt: Date.now() - 3600000 * 2,
          resolved: true,
          masteryStatus: 'learning',
          repeatCount: 2,
          independentSuccessCount: 2,
          consecutiveSuccessCount: 1,
          lastPromptGiven: 'Đường sinh l là cạnh huyền: l² = h² + r²'
        },
        {
          id: 'err-sample-2',
          studentId: 'student-9a2',
          activityId: 'practice-cyl-02',
          questionId: 'ex-cyl-mc-01',
          shape: 'cylinder',
          errorType: 'RADIUS_DIAMETER_CONFUSION',
          concept: 'radius_vs_diameter',
          conceptTitle: 'Bán kính và Đường kính (R vs d)',
          userAnswer: 'd = 6 => r = 6',
          expectedAnswer: 'r = 3',
          attemptNumber: 1,
          hintLevelUsed: 1,
          firstSeenAt: Date.now() - 3600000 * 3,
          lastSeenAt: Date.now() - 3600000 * 1,
          resolved: true,
          masteryStatus: 'learning',
          repeatCount: 1,
          independentSuccessCount: 3,
          consecutiveSuccessCount: 2,
          lastPromptGiven: 'Bán kính r = d / 2'
        }
      ],
      failedQuestions: [],
      conceptMasteries: INITIAL_CONCEPTS.reduce((acc, c) => ({ ...acc, [c.concept]: c }), {}),
      activeMasteryCheck: null,
      pendingMasteryCheckConcept: null,
      lastCheckResult: null,

      addFailedQuestion: (item) => {
        const now = Date.now();
        const interval = item.reviewIntervalDays || 1;
        const currentList = get().failedQuestions;
        const existingIdx = currentList.findIndex((q) => q.questionId === item.questionId);

        if (existingIdx >= 0) {
          const existing = currentList[existingIdx];
          const updated: FailedQuestionItem = {
            ...existing,
            ...item,
            lastAttemptAt: now,
            attemptCount: existing.attemptCount + 1,
            resolved: false,
            reviewIntervalDays: 1, // Reset to 1 day on new failure
            nextReviewAt: now + 86400000 * 1
          };
          const nextList = [...currentList];
          nextList[existingIdx] = updated;
          set({ failedQuestions: nextList });
        } else {
          const newItem: FailedQuestionItem = {
            ...item,
            id: item.id || `fq-${now}-${Math.random().toString(36).substring(2, 6)}`,
            failedAt: now,
            lastAttemptAt: now,
            reviewIntervalDays: interval,
            nextReviewAt: now + 86400000 * interval,
            resolved: false,
            attemptCount: 1
          };
          set({ failedQuestions: [newItem, ...currentList] });
        }
      },

      resolveFailedQuestion: (questionId: string) => {
        const now = Date.now();
        const currentList = get().failedQuestions;
        const nextList = currentList.map((q) => {
          if (q.questionId === questionId || q.id === questionId) {
            // Advance spaced repetition interval (1 -> 3 -> 7 days)
            const nextInterval = q.reviewIntervalDays === 1 ? 3 : 7;
            return {
              ...q,
              resolved: true,
              lastAttemptAt: now,
              reviewIntervalDays: nextInterval,
              nextReviewAt: now + 86400000 * nextInterval
            };
          }
          return q;
        });
        set({ failedQuestions: nextList });
      },

      recordFailedQuestionAttempt: (questionId: string, isCorrect: boolean, userAnswer?: any) => {
        const now = Date.now();
        const currentList = get().failedQuestions;
        const nextList = currentList.map((q) => {
          if (q.questionId === questionId || q.id === questionId) {
            if (isCorrect) {
              const nextInterval = q.reviewIntervalDays === 1 ? 3 : 7;
              return {
                ...q,
                resolved: true,
                lastAttemptAt: now,
                reviewIntervalDays: nextInterval,
                nextReviewAt: now + 86400000 * nextInterval,
                lastUserAnswer: userAnswer
              };
            } else {
              return {
                ...q,
                resolved: false,
                lastAttemptAt: now,
                attemptCount: q.attemptCount + 1,
                reviewIntervalDays: 1,
                nextReviewAt: now + 86400000 * 1,
                lastUserAnswer: userAnswer
              };
            }
          }
          return q;
        });
        set({ failedQuestions: nextList });
      },

      getFailedQuestions: (filter) => {
        const list = get().failedQuestions;
        return list.filter((q) => {
          if (filter?.shape && filter.shape !== 'all' && q.shape !== filter.shape) {
            return false;
          }
          if (filter?.resolved !== undefined && q.resolved !== filter.resolved) {
            return false;
          }
          return true;
        });
      },

      recordError: ({
        activityId,
        questionId,
        shape,
        errorType,
        conceptKey,
        conceptTitle,
        userAnswer,
        expectedAnswer,
        hintLevelUsed = 1,
        description
      }) => {
        const { concept, conceptTitle: mappedTitle, spatialMetric } = mapErrorToConcept(
          errorType,
          conceptTitle || description,
          shape
        );
        const resolvedConcept = conceptKey || concept;
        const resolvedTitle = conceptTitle || mappedTitle;

        const currentErrors = get().errors;
        const existingIdx = currentErrors.findIndex((e) => e.concept === resolvedConcept);
        const now = Date.now();

        let updatedError: ErrorMemory;
        let repeatCount = 1;

        if (existingIdx >= 0) {
          const old = currentErrors[existingIdx];
          repeatCount = old.repeatCount + 1;
          updatedError = {
            ...old,
            attemptNumber: old.attemptNumber + 1,
            repeatCount,
            lastSeenAt: now,
            resolved: false,
            masteryStatus: 'needs_review',
            consecutiveSuccessCount: 0,
            hintLevelUsed: Math.max(old.hintLevelUsed, hintLevelUsed),
            userAnswer: userAnswer ? String(userAnswer) : old.userAnswer,
            expectedAnswer: expectedAnswer ? String(expectedAnswer) : old.expectedAnswer
          };
          const newErrors = [...currentErrors];
          newErrors[existingIdx] = updatedError;
          set({ errors: newErrors });
        } else {
          updatedError = {
            id: `err-${now}-${Math.random().toString(36).substring(2, 6)}`,
            studentId: 'student-9a2',
            activityId,
            questionId,
            shape,
            errorType: errorType || 'CONCEPTUAL_ERROR',
            concept: resolvedConcept,
            conceptTitle: resolvedTitle,
            userAnswer: userAnswer ? String(userAnswer) : undefined,
            expectedAnswer: expectedAnswer ? String(expectedAnswer) : undefined,
            attemptNumber: 1,
            hintLevelUsed,
            firstSeenAt: now,
            lastSeenAt: now,
            resolved: false,
            masteryStatus: 'learning',
            repeatCount: 1,
            independentSuccessCount: 0,
            consecutiveSuccessCount: 0
          };
          set({ errors: [updatedError, ...currentErrors] });
        }

        // Update concept mastery score & status
        const currentMasteries = { ...get().conceptMasteries };
        const existingMastery = currentMasteries[resolvedConcept] || {
          concept: resolvedConcept,
          conceptTitle: resolvedTitle,
          shape,
          masteryScore: 50,
          masteryStatus: 'learning',
          independentSuccess: 0,
          repeatCount: 0,
          totalAttempts: 0,
          lastTestedAt: now,
          relatedSpatialMetric: spatialMetric
        };

        const newScore = Math.max(15, Math.min(95, existingMastery.masteryScore - 12));
        currentMasteries[resolvedConcept] = {
          ...existingMastery,
          masteryScore: newScore,
          masteryStatus: 'needs_review',
          repeatCount: existingMastery.repeatCount + 1,
          totalAttempts: existingMastery.totalAttempts + 1,
          lastTestedAt: now
        };
        set({ conceptMasteries: currentMasteries, pendingMasteryCheckConcept: resolvedConcept });

        // Update Spatial Thinking Profile dimension automatically
        try {
          useSpatialProfileStore.getState().recordEvent('ERROR', {
            metric: spatialMetric,
            delta: -2,
            action: `Nhận diện sai lầm về ${resolvedTitle}`,
            shape
          });
          useSpatialProfileStore.getState().updateScore(spatialMetric, -2);
        } catch {
          // ignore if spatial store is not initialized
        }

        // Determine Hint Tier Strategy based on repeatCount
        let hintStrategy: 'GUIDE' | 'VISUAL_REINFORCEMENT' | 'MINI_LESSON' = 'GUIDE';
        let pedagogicalFeedback = '';

        if (repeatCount === 1) {
          hintStrategy = 'GUIDE';
          pedagogicalFeedback = `💡 Gợi ý định hướng: Hãy để ý kỹ dữ kiện của bài liên quan đến ${resolvedTitle}.`;
        } else if (repeatCount === 2) {
          hintStrategy = 'VISUAL_REINFORCEMENT';
          pedagogicalFeedback = `👀 Thầy highlight trực quan mô hình 3D để em đối chiếu. Hãy so sánh hai yếu tố hình học này trên hình nhé!`;
        } else {
          hintStrategy = 'MINI_LESSON';
          pedagogicalFeedback = `📖 Ơ, chiếc bẫy này lại xuất hiện rồi! Thầy đề nghị em chuyển sang mô hình 3D kéo thử thanh trượt để nắm chắc bản chất ${resolvedTitle} nhé!`;
        }

        return {
          errorMemory: updatedError,
          hintStrategy,
          repeatCount,
          pedagogicalFeedback
        };
      },

      recordSuccess: ({
        activityId,
        questionId,
        shape,
        conceptKey,
        hintLevelUsed,
        timeSpent = 15
      }) => {
        const { concept, conceptTitle, spatialMetric } = mapErrorToConcept(undefined, conceptKey, shape);
        const resolvedConcept = conceptKey || concept;
        const isIndependent = hintLevelUsed <= 1;
        const now = Date.now();

        const currentErrors = [...get().errors];
        const errIdx = currentErrors.findIndex((e) => e.concept === resolvedConcept);
        let updatedStatus: MasteryStatus = 'learning';

        if (errIdx >= 0) {
          const err = currentErrors[errIdx];
          const newIndependent = isIndependent ? err.independentSuccessCount + 1 : err.independentSuccessCount;
          const newConsecutive = isIndependent ? err.consecutiveSuccessCount + 1 : 0;

          // Deterministic rule: Mastered ONLY if independent success >= 2 and consecutive >= 1
          if (newIndependent >= 2 && newConsecutive >= 1 && err.repeatCount <= 2) {
            updatedStatus = 'mastered';
          } else {
            updatedStatus = 'learning';
          }

          currentErrors[errIdx] = {
            ...err,
            resolved: true,
            masteryStatus: updatedStatus,
            independentSuccessCount: newIndependent,
            consecutiveSuccessCount: newConsecutive,
            lastSeenAt: now
          };
          set({ errors: currentErrors });
        }

        // Update Concept Mastery Score
        const currentMasteries = { ...get().conceptMasteries };
        const existingMastery = currentMasteries[resolvedConcept] || {
          concept: resolvedConcept,
          conceptTitle,
          shape,
          masteryScore: 60,
          masteryStatus: 'learning',
          independentSuccess: 0,
          repeatCount: 0,
          totalAttempts: 0,
          lastTestedAt: now,
          relatedSpatialMetric: spatialMetric
        };

        const scoreBoost = isIndependent ? 14 : 5;
        const newScore = Math.min(100, existingMastery.masteryScore + scoreBoost);
        const finalStatus: MasteryStatus = newScore >= 85 && (existingMastery.independentSuccess + (isIndependent ? 1 : 0)) >= 2
          ? 'mastered'
          : 'learning';

        currentMasteries[resolvedConcept] = {
          ...existingMastery,
          masteryScore: newScore,
          masteryStatus: finalStatus,
          independentSuccess: existingMastery.independentSuccess + (isIndependent ? 1 : 0),
          totalAttempts: existingMastery.totalAttempts + 1,
          lastTestedAt: now
        };

        set({ conceptMasteries: currentMasteries });

        // Update Spatial Thinking Profile
        try {
          useSpatialProfileStore.getState().recordEvent('CORRECT', {
            metric: spatialMetric,
            delta: isIndependent ? 4 : 2,
            action: isIndependent ? `Tự giải chính xác ${conceptTitle}` : `Hoàn thành bài tập ${conceptTitle}`,
            shape
          });
          useSpatialProfileStore.getState().updateScore(spatialMetric, isIndependent ? 4 : 2);
        } catch {
          // ignore
        }

        // Check if we should trigger a Spaced Mastery Check
        const hadPreviousError = errIdx >= 0 && currentErrors[errIdx].repeatCount >= 1;
        let triggeredMasteryCheck = false;
        let message = 'Làm bài xuất sắc!';

        if (isIndependent && hadPreviousError) {
          message = 'Ổn rồi đấy! Lần này em tự nhận ra ngay mà không cần Hint.';
        } else if (isIndependent) {
          message = 'Tuyệt vời! Em đã tự mình giải đúng câu hỏi.';
        } else {
          message = 'Tốt lắm! Em đã hiểu bài nhờ xem gợi ý. Hãy thử tự làm câu tiếp theo nhé!';
        }

        return {
          isIndependent,
          newStatus: finalStatus,
          triggeredMasteryCheck,
          message
        };
      },

      triggerMasteryCheck: (conceptKey) => {
        const concept = conceptKey || get().pendingMasteryCheckConcept;
        let question: MasteryCheckQuestion | undefined;

        if (concept) {
          question = getMasteryCheckByConcept(concept);
        }
        if (!question) {
          question = getRandomMasteryCheck();
        }

        set({ activeMasteryCheck: question });
        return question;
      },

      dismissActiveMasteryCheck: () => {
        set({ activeMasteryCheck: null, pendingMasteryCheckConcept: null });
      },

      submitMasteryCheck: (userAnswer: any) => {
        const currentCheck = get().activeMasteryCheck;
        if (!currentCheck) {
          throw new Error('No active mastery check question');
        }

        let isCorrect = false;
        if (currentCheck.type === 'multiple_choice') {
          const opt = currentCheck.options?.find((o) => o.id === userAnswer || o.text === userAnswer);
          isCorrect = !!opt?.isCorrect;
        } else if (currentCheck.type === 'numeric') {
          const num = parseFloat(String(userAnswer).replace(',', '.').trim());
          const exp = currentCheck.expectedNumeric || 0;
          const tol = currentCheck.tolerance || 0.1;
          isCorrect = !isNaN(num) && Math.abs(num - exp) <= tol;
        } else {
          isCorrect = true;
        }

        const concept = currentCheck.concept;
        const now = Date.now();
        const delta = isCorrect ? 15 : -10;

        const currentMasteries = { ...get().conceptMasteries };
        const existing = currentMasteries[concept] || {
          concept,
          conceptTitle: currentCheck.conceptTitle,
          shape: currentCheck.shape,
          masteryScore: 50,
          masteryStatus: 'learning',
          independentSuccess: 0,
          repeatCount: 0,
          totalAttempts: 0,
          lastTestedAt: now,
          relatedSpatialMetric: currentCheck.relatedSpatialMetric
        };

        const newScore = Math.max(10, Math.min(100, existing.masteryScore + delta));
        const newStatus: MasteryStatus = isCorrect
          ? newScore >= 80 ? 'mastered' : 'learning'
          : 'needs_review';

        currentMasteries[concept] = {
          ...existing,
          masteryScore: newScore,
          masteryStatus: newStatus,
          independentSuccess: isCorrect ? existing.independentSuccess + 1 : existing.independentSuccess,
          repeatCount: isCorrect ? existing.repeatCount : existing.repeatCount + 1,
          totalAttempts: existing.totalAttempts + 1,
          lastTestedAt: now
        };

        const feedbackText = isCorrect
          ? `🎉 Xuất sắc! Em đã vượt qua bài kiểm tra làm chủ khái niệm: ${currentCheck.conceptTitle}.`
          : `⚠️ Em cần chú ý thêm: ${currentCheck.explanation}`;

        const result: MasteryCheckResult = {
          checkId: currentCheck.id,
          concept,
          userAnswer,
          isCorrect,
          scoreDelta: delta,
          newMasteryStatus: newStatus,
          feedbackText,
          timestamp: now
        };

        // Update Spatial Thinking Profile
        try {
          useSpatialProfileStore.getState().recordEvent(isCorrect ? 'CORRECT' : 'ERROR', {
            metric: currentCheck.relatedSpatialMetric,
            delta: isCorrect ? 5 : -2,
            action: `Kiểm tra làm chủ khái niệm: ${currentCheck.conceptTitle}`,
            shape: currentCheck.shape
          });
          useSpatialProfileStore.getState().updateScore(currentCheck.relatedSpatialMetric, isCorrect ? 5 : -2);
        } catch {
          // ignore
        }

        set({
          conceptMasteries: currentMasteries,
          lastCheckResult: result,
          activeMasteryCheck: null,
          pendingMasteryCheckConcept: null
        });

        return result;
      },

      getErrorsByConcept: (concept: string) => {
        return get().errors.filter((e) => e.concept === concept);
      },

      getConceptMastery: (concept: string) => {
        return get().conceptMasteries[concept];
      },

      getAllConceptMasteries: () => {
        return Object.values(get().conceptMasteries);
      },

      getTopRecurringMisconceptions: () => {
        const masteries = Object.values(get().conceptMasteries);
        const totalRepeats = masteries.reduce((sum, m) => sum + m.repeatCount, 0) || 1;

        return masteries
          .filter((m) => m.repeatCount > 0)
          .sort((a, b) => b.repeatCount - a.repeatCount)
          .slice(0, 5)
          .map((m) => {
            const percentage = Math.round((m.repeatCount / totalRepeats) * 100);
            let recommendation = 'Tăng cường luyện bài tập trực quan 3D';
            if (m.concept === 'radius_vs_diameter') {
              recommendation = 'Nhắc nhở học sinh luôn gạch chân R hay d ngay khi đọc đề bài.';
            } else if (m.concept === 'generatrix_vs_height') {
              recommendation = 'Sử dụng mô hình 3D mặt cắt tam giác vuông và định lý Pythagore.';
            } else if (m.concept === 'cone_volume_one_third') {
              recommendation = 'Cho học sinh thực hành lại thí nghiệm rót nước 3 phễu nón vào cốc trụ.';
            } else if (m.concept === 'cylinder_total_surface') {
              recommendation = 'Phân biệt rõ 2 đáy 2πr² và diện tích xung quanh 2πrh.';
            }

            return {
              concept: m.concept,
              title: m.conceptTitle,
              percentage: Math.max(12, percentage),
              repeatCount: m.repeatCount,
              affectedCount: Math.max(3, m.repeatCount * 4),
              recommendation
            };
          });
      },

      getStudentFacingProgress: () => {
        const masteries = Object.values(get().conceptMasteries);
        return masteries.map((m) => {
          let statusLabel = 'Đang rèn luyện';
          let badgeColor = 'bg-blue-100 text-blue-800 border-blue-200';

          if (m.masteryStatus === 'mastered') {
            statusLabel = 'Đã làm chủ';
            badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
          } else if (m.masteryStatus === 'needs_review') {
            statusLabel = 'Cần ôn lại';
            badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
          }

          return {
            concept: m.concept,
            title: m.conceptTitle,
            score: m.masteryScore,
            status: m.masteryStatus,
            statusLabel,
            badgeColor
          };
        });
      },

      resetStore: () => {
        set({
          errors: [],
          conceptMasteries: INITIAL_CONCEPTS.reduce((acc, c) => ({ ...acc, [c.concept]: c }), {}),
          activeMasteryCheck: null,
          pendingMasteryCheckConcept: null,
          lastCheckResult: null
        });
      }
    }),
    {
      name: 'geometry_lab_error_memory_v2'
    }
  )
);
