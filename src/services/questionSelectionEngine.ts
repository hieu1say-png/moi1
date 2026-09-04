/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - QUESTION SELECTION & RANDOM MATRIX ENGINE
 * Pure deterministic question filtering, seeded randomization, matrix allocation,
 * Archetype uniqueness constraint, search engine, and MCQ option shuffling without duplicate questions.
 */

import { Exercise, ExerciseDifficulty, ExerciseType, MultipleChoiceExercise, ShapeType } from '../types/dataArchitecture';
import { UnifiedAssignmentQuestionItem, SourceFilterMode, getCachedUnifiedAssignmentBank } from './unifiedAssignmentService';

export interface QuestionFilterCriteria {
  sourceMode?: SourceFilterMode; // 'SOURCE_ONLY' | 'VARIANT_ONLY' | 'BOTH'
  topics?: Array<ShapeType | 'mixed'>; // 'cylinder' | 'cone' | 'sphere' | 'mixed'
  difficulties?: ExerciseDifficulty[]; // 'easy' | 'medium' | 'hard' | 'olympiad'
  types?: ExerciseType[]; // 'multiple_choice' | 'true_false' | 'numeric'
  searchQuery?: string;
  noSameArchetype?: boolean; // Default true: no 2 questions with same archetype in same assignment
  count?: number;
  matrixRatio?: {
    cylinder?: number;
    cone?: number;
    sphere?: number;
    mixed?: number;
  };
  difficultyRatio?: {
    easy?: number;
    medium?: number;
    hard?: number;
    olympiad?: number;
  };
  randomSeed?: number;
}

export interface ShuffledMCQOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
  originalIndex: number;
  isCorrect: boolean;
}

export interface PreparedQuestion {
  original: Exercise | UnifiedAssignmentQuestionItem;
  id: string;
  shuffledOptions?: ShuffledMCQOption[];
  correctOptionId?: string; // e.g. 'B'
  hasImage: boolean;
  images: string[];
}

export interface AssignmentValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Deterministic Linear Congruential Generator (LCG) for reproducible question seeding
 */
export class SeededPRNG {
  private seed: number;

  constructor(seed?: number) {
    this.seed = (seed !== undefined && seed > 0 ? seed : Math.floor(Math.random() * 1000000) + 1) % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }

  public getSeed(): number {
    return this.seed;
  }

  public next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }

  public nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  public shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }
}

export class QuestionSelectionEngine {
  /**
   * Search and filter unified questions with multi-criteria indexing
   */
  public static searchQuestions(
    bank: UnifiedAssignmentQuestionItem[],
    criteria: {
      sourceMode?: SourceFilterMode;
      topics?: Array<ShapeType | 'mixed'>;
      difficulties?: ExerciseDifficulty[];
      types?: ExerciseType[];
      searchQuery?: string;
    }
  ): UnifiedAssignmentQuestionItem[] {
    const mode = criteria.sourceMode || 'BOTH';
    const topics = criteria.topics || ['cylinder', 'cone', 'sphere', 'mixed'];
    const diffs = criteria.difficulties || ['easy', 'medium', 'hard', 'olympiad'];
    const types = criteria.types || ['multiple_choice', 'true_false', 'numeric'];
    const query = criteria.searchQuery?.trim().toLowerCase() || '';

    return bank.filter((q) => {
      // 1. Source filter
      if (mode === 'SOURCE_ONLY' && q.origin !== 'SOURCE_EXACT') return false;
      if (mode === 'VARIANT_ONLY' && q.origin !== 'GENERATED_VARIANT') return false;

      // 2. Topic filter
      if (!topics.includes(q.shape)) return false;

      // 3. Difficulty filter
      if (!diffs.includes(q.difficulty)) return false;

      // 4. Type filter
      if (!types.includes(q.type)) return false;

      // 5. Search query matching
      if (query) {
        const idMatch = q.id.toLowerCase().includes(query);
        const titleMatch = q.title.toLowerCase().includes(query);
        const textMatch = q.question.toLowerCase().includes(query);
        const archIdMatch = q.archetypeId.toLowerCase().includes(query);
        const archNameMatch = q.archetypeName.toLowerCase().includes(query);
        const sourceDocMatch = q.sourceDoc ? q.sourceDoc.toLowerCase().includes(query) : false;
        const topicMatch = q.topicLabel.toLowerCase().includes(query);
        const typeMatch = q.typeLabel.toLowerCase().includes(query);
        const formulaMatch = q.formula ? q.formula.toLowerCase().includes(query) : false;
        const miscMatch = q.misconceptions?.some((m) => m.toLowerCase().includes(query));
        const notesMatch = q.importantNotes?.some((n) => n.toLowerCase().includes(query));

        if (
          !idMatch &&
          !titleMatch &&
          !textMatch &&
          !archIdMatch &&
          !archNameMatch &&
          !sourceDocMatch &&
          !topicMatch &&
          !typeMatch &&
          !formulaMatch &&
          !miscMatch &&
          !notesMatch
        ) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Extracts all image URLs attached to a question
   */
  public static getQuestionImages(question: Exercise | UnifiedAssignmentQuestionItem): string[] {
    const images: string[] = [];
    if ('images' in question && Array.isArray(question.images)) {
      images.push(...question.images.filter(Boolean));
    }
    if ('image' in question && typeof (question as any).image === 'string') {
      const img = (question as any).image;
      if (!images.includes(img)) images.push(img);
    }
    return images;
  }

  /**
   * Deterministically shuffles MCQ options for a question using a seed, keeping optionId consistent
   */
  public static prepareQuestion(
    question: Exercise | UnifiedAssignmentQuestionItem,
    prng: SeededPRNG
  ): PreparedQuestion {
    const images = this.getQuestionImages(question);
    const isMCQ = question.type === 'multiple_choice';

    if (isMCQ) {
      let rawOptions: string[] = [];
      let correctIdx = 0;

      if ('options' in question && Array.isArray(question.options)) {
        rawOptions = question.options;
      }

      if ('correctOptionIndex' in question && typeof (question as any).correctOptionIndex === 'number') {
        correctIdx = (question as any).correctOptionIndex;
      } else if ('correctAnswerDisplay' in question) {
        const ans = String((question as any).correctAnswerDisplay).trim();
        if (ans.startsWith('A')) correctIdx = 0;
        else if (ans.startsWith('B')) correctIdx = 1;
        else if (ans.startsWith('C')) correctIdx = 2;
        else if (ans.startsWith('D')) correctIdx = 3;
      }

      const indexedOptions = rawOptions.map((text, idx) => ({
        originalIndex: idx,
        text,
        isCorrect: idx === correctIdx
      }));

      const shuffled = prng.shuffle(indexedOptions);
      const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

      let correctOptionId = 'A';
      const formattedOptions: ShuffledMCQOption[] = shuffled.map((item, idx) => {
        const letter = letters[idx] || String(idx + 1);
        if (item.isCorrect) {
          correctOptionId = letter;
        }
        return {
          id: letter,
          text: item.text,
          originalIndex: item.originalIndex,
          isCorrect: item.isCorrect
        };
      });

      return {
        original: question,
        id: question.id,
        shuffledOptions: formattedOptions,
        correctOptionId,
        hasImage: images.length > 0 || Boolean((question as any).hasImage),
        images
      };
    }

    return {
      original: question,
      id: question.id,
      hasImage: images.length > 0 || Boolean((question as any).hasImage),
      images
    };
  }

  /**
   * Advanced Random Question Generator with Matrix Allocation & Archetype Uniqueness
   */
  public static selectUnifiedQuestions(
    bank: UnifiedAssignmentQuestionItem[],
    criteria: QuestionFilterCriteria
  ): {
    selectedQuestions: UnifiedAssignmentQuestionItem[];
    preparedQuestions: PreparedQuestion[];
    seedUsed: number;
    warningMessage?: string;
  } {
    const prng = new SeededPRNG(criteria.randomSeed);
    const targetCount = criteria.count && criteria.count > 0 ? criteria.count : 10;
    const enforceNoSameArchetype = criteria.noSameArchetype !== false; // Default: true

    // 1. Candidate pool satisfying basic filters
    const pool = this.searchQuestions(bank, {
      sourceMode: criteria.sourceMode || 'BOTH',
      topics: criteria.topics,
      difficulties: criteria.difficulties,
      types: criteria.types,
      searchQuery: criteria.searchQuery
    });

    const chosenQuestions: UnifiedAssignmentQuestionItem[] = [];
    const usedIds = new Set<string>();
    const usedArchetypes = new Set<string>();
    let warningMessage: string | undefined;

    // Helper: tries to pick question with optional archetype constraint
    const tryPick = (candidateList: UnifiedAssignmentQuestionItem[], limit: number) => {
      const shuffledCandidates = prng.shuffle(candidateList);
      let pickedCount = 0;

      // Pass 1: Strict archetype uniqueness
      for (const q of shuffledCandidates) {
        if (pickedCount >= limit) break;
        if (usedIds.has(q.id)) continue;
        if (enforceNoSameArchetype && usedArchetypes.has(q.archetypeId)) continue;

        chosenQuestions.push(q);
        usedIds.add(q.id);
        usedArchetypes.add(q.archetypeId);
        pickedCount++;
      }

      // Pass 2: If strict mode couldn't fill and we still need items
      if (pickedCount < limit && enforceNoSameArchetype) {
        for (const q of shuffledCandidates) {
          if (pickedCount >= limit) break;
          if (usedIds.has(q.id)) continue;

          chosenQuestions.push(q);
          usedIds.add(q.id);
          usedArchetypes.add(q.archetypeId);
          pickedCount++;
          warningMessage = 'Số lượng câu hỏi yêu cầu vượt quá số Archetype đơn nhất hiện có trong phạm vi lọc. Đã nới lỏng để đảm bảo đủ số lượng câu.';
        }
      }
    };

    // 2. Matrix ratio by topic
    if (criteria.matrixRatio) {
      const ratio = criteria.matrixRatio;
      const matrixEntries: Array<{ shape: ShapeType | 'mixed'; count: number }> = [
        { shape: 'cylinder', count: ratio.cylinder || 0 },
        { shape: 'cone', count: ratio.cone || 0 },
        { shape: 'sphere', count: ratio.sphere || 0 },
        { shape: 'mixed', count: ratio.mixed || 0 }
      ];

      for (const entry of matrixEntries) {
        if (entry.count <= 0) continue;
        const subPool = pool.filter((q) => q.shape === entry.shape && !usedIds.has(q.id));
        tryPick(subPool, entry.count);
      }
    }

    // 3. Fill remaining slots from candidate pool
    const remainingNeeded = targetCount - chosenQuestions.length;
    if (remainingNeeded > 0) {
      const remainingPool = pool.filter((q) => !usedIds.has(q.id));
      tryPick(remainingPool, remainingNeeded);
    }

    // 4. Fallback to full bank if pool exhausted
    if (chosenQuestions.length < targetCount) {
      const fallbackPool = bank.filter((q) => !usedIds.has(q.id));
      tryPick(fallbackPool, targetCount - chosenQuestions.length);
      warningMessage = 'Đã lấy bổ sung từ toàn bộ ngân hàng để đủ số câu yêu cầu.';
    }

    // Final shuffle so topics are interleaved nicely
    const finalShuffled = prng.shuffle(chosenQuestions);
    const preparedQuestions = finalShuffled.map((q) => this.prepareQuestion(q, prng));

    return {
      selectedQuestions: finalShuffled,
      preparedQuestions,
      seedUsed: prng.getSeed(),
      warningMessage
    };
  }

  /**
   * Pre-assignment validation gatekeeper (Validate before assign)
   */
  public static validateAssignment(data: {
    title: string;
    questionIds: string[];
    dueDate?: string;
    bank?: UnifiedAssignmentQuestionItem[];
  }): AssignmentValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!data.title || data.title.trim() === '') {
      errors.push('Tiêu đề bài tập không được để trống.');
    }

    if (!data.questionIds || data.questionIds.length === 0) {
      errors.push('Vui lòng chọn ít nhất 1 câu hỏi từ ngân hàng.');
    }

    // Check for duplicate IDs
    const idSet = new Set<string>();
    const dupes: string[] = [];
    for (const id of data.questionIds || []) {
      if (idSet.has(id)) dupes.push(id);
      idSet.add(id);
    }
    if (dupes.length > 0) {
      errors.push(`Phát hiện câu hỏi bị trùng lặp trong đề: ${dupes.join(', ')}`);
    }

    // Check verification status and required fields
    const bank = data.bank || getCachedUnifiedAssignmentBank();
    const bankMap = new Map(bank.map((q) => [q.id, q]));

    for (const qId of data.questionIds || []) {
      const q = bankMap.get(qId);
      if (!q) {
        warnings.push(`Câu hỏi ID ${qId} không tìm thấy trong danh mục chính.`);
        continue;
      }

      if (!q.correctAnswerDisplay && q.rawCorrectAnswer === undefined) {
        errors.push(`[${q.id}] Chưa có đáp án chính xác.`);
      }

      if (!q.solution4Steps || q.solution4Steps.length !== 4) {
        errors.push(`[${q.id}] Lời giải 4 bước sư phạm chưa hoàn chỉnh.`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Compatibility wrapper for standard Exercises
   */
  public static selectQuestions(
    questionBank: Exercise[],
    criteria: QuestionFilterCriteria
  ): {
    selectedQuestions: Exercise[];
    preparedQuestions: PreparedQuestion[];
    seedUsed: number;
  } {
    const unifiedBank = getCachedUnifiedAssignmentBank();
    const res = this.selectUnifiedQuestions(unifiedBank, criteria);
    // Convert back to Exercise if needed
    return {
      selectedQuestions: questionBank.slice(0, criteria.count || 10),
      preparedQuestions: res.preparedQuestions,
      seedUsed: res.seedUsed
    };
  }
}
