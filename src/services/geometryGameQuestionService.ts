/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - GAME QUESTION SERVICE & ADAPTER
 * Connects "Hình Học 9 Master" to the Single Source of Truth Question Bank.
 *
 * Sources:
 * 1. QuestionBankStore (questionBank in src/data/questionBank1000)
 * 2. SOURCE_MCQ_QUESTIONS (Exact textbook exam multiple choice questions)
 * 3. masterQuestionBank (Curated PDF & Archetype questions)
 * 4. TeacherService.getQuestionBank() (Teacher custom questions & mock exercises)
 * 5. PRACTICE_QUESTIONS (Geometry Lab core curriculum exercises)
 */

import { questionBank } from '../data/questionBank1000';
import { SOURCE_MCQ_QUESTIONS } from '../data/questionBank1000/sourceExactBank';
import masterQuestionBankData from '../data/masterQuestionBank.json';
import { TeacherService } from './teacherService';
import { PRACTICE_QUESTIONS } from '../data/geometryData';
import { MultipleChoiceExercise } from '../types/dataArchitecture';

export interface GameQuestion {
  id: string;
  type: 'mcq';
  q: string;
  options: string[];
  ans: number; // 0, 1, 2, 3 index
  topic?: 'cylinder' | 'cone' | 'sphere' | 'mixed';
  difficulty?: 'easy' | 'medium' | 'hard' | 'olympiad';
  explanation?: string;
  hint?: string;
  source?: string;
}

export interface GameQuestionFilter {
  topic?: 'all' | 'cylinder' | 'cone' | 'sphere' | 'mixed';
  difficulty?: 'all' | 'easy' | 'medium' | 'hard' | 'olympiad';
}

export interface GameQuestionPoolResult {
  questions: GameQuestion[];
  totalAvailable: number;
  poolSize: number;
  statusMessage: string;
}

/**
 * Fisher-Yates Shuffle algorithm for unbiased question randomization
 */
export function shuffleQuestions<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Strips leading option prefixes like "A. ", "B) ", etc.
 */
function cleanOptionText(text: string): string {
  if (!text) return '';
  return text.replace(/^[A-Da-d][.)]\s*/, '').trim();
}

/**
 * Validates a normalized question against strict gameplay rules
 */
export function validateGameQuestion(q: any): q is GameQuestion {
  if (!q || typeof q !== 'object') {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[GAME QUESTION VALIDATOR] Question is null or not an object');
    }
    return false;
  }

  if (!q.id || typeof q.id !== 'string' || q.id.trim() === '') {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[GAME QUESTION VALIDATOR] Missing question id:', q);
    }
    return false;
  }

  if (!q.q || typeof q.q !== 'string' || q.q.trim() === '') {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[GAME QUESTION VALIDATOR] Invalid question prompt (id: ${q.id})`);
    }
    return false;
  }

  if (!Array.isArray(q.options) || q.options.length !== 4) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[GAME QUESTION VALIDATOR] Question options length is not 4 (id: ${q.id}, length: ${q.options?.length})`);
    }
    return false;
  }

  // Ensure all 4 options are non-empty strings
  for (let i = 0; i < 4; i++) {
    if (typeof q.options[i] !== 'string' || q.options[i].trim() === '') {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[GAME QUESTION VALIDATOR] Empty option at index ${i} (id: ${q.id})`);
      }
      return false;
    }
  }

  if (
    typeof q.ans !== 'number' ||
    !Number.isInteger(q.ans) ||
    q.ans < 0 ||
    q.ans >= q.options.length
  ) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[GAME QUESTION VALIDATOR] Correct answer index out of range: ${q.ans} (id: ${q.id})`);
    }
    return false;
  }

  if (q.type !== 'mcq') {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[GAME QUESTION VALIDATOR] Invalid question type: ${q.type} (id: ${q.id})`);
    }
    return false;
  }

  return true;
}

/**
 * Adapters: Normalize multiple external Question formats into GameQuestion
 */
function normalizeFromPracticeQuestion(pq: any): GameQuestion | null {
  if (!pq || !pq.options || pq.options.length !== 4) return null;
  return {
    id: pq.id,
    type: 'mcq',
    q: pq.question,
    options: pq.options.map(cleanOptionText),
    ans: pq.correctOptionIndex,
    topic: pq.shapeType as any,
    difficulty: pq.difficulty as any,
    explanation: pq.explanation,
    hint: pq.hint,
    source: 'Practice Bank'
  };
}

function normalizeFromExercise(ex: any): GameQuestion | null {
  if (!ex || ex.type !== 'multiple_choice' || !ex.options || ex.options.length !== 4) return null;
  return {
    id: ex.id,
    type: 'mcq',
    q: ex.question,
    options: ex.options.map(cleanOptionText),
    ans: ex.correctOptionIndex,
    topic: ex.shapeId as any,
    difficulty: ex.difficulty as any,
    explanation: ex.explanation,
    hint: ex.hint,
    source: 'Teacher & Exercise Bank'
  };
}

function normalizeFromSourceMCQ(smcq: any): GameQuestion | null {
  if (!smcq) return null;
  const rawOpts = smcq.interactiveVersion?.options || smcq.originalOptions;
  if (!rawOpts || rawOpts.length !== 4) return null;

  let ansIndex = -1;
  const rawAns = smcq.originalAnswer || smcq.interactiveVersion?.expectedAnswer;

  if (typeof rawAns === 'string') {
    const trimmed = rawAns.trim().toUpperCase();
    if (trimmed === 'A' || trimmed.startsWith('A.')) ansIndex = 0;
    else if (trimmed === 'B' || trimmed.startsWith('B.')) ansIndex = 1;
    else if (trimmed === 'C' || trimmed.startsWith('C.')) ansIndex = 2;
    else if (trimmed === 'D' || trimmed.startsWith('D.')) ansIndex = 3;
    else {
      // Look up expected answer text
      ansIndex = rawOpts.findIndex((opt: string) =>
        opt.trim().toLowerCase() === trimmed.toLowerCase() ||
        cleanOptionText(opt).toLowerCase() === trimmed.toLowerCase()
      );
    }
  } else if (typeof rawAns === 'number') {
    ansIndex = rawAns;
  }

  if (ansIndex < 0 || ansIndex > 3) return null;

  let topic: 'cylinder' | 'cone' | 'sphere' | 'mixed' = 'mixed';
  if (smcq.archetypeId?.includes('CYL')) topic = 'cylinder';
  else if (smcq.archetypeId?.includes('CONE')) topic = 'cone';
  else if (smcq.archetypeId?.includes('SPH')) topic = 'sphere';

  return {
    id: smcq.id,
    type: 'mcq',
    q: smcq.originalQuestion || smcq.interactiveVersion?.prompt,
    options: rawOpts.map(cleanOptionText),
    ans: ansIndex,
    topic,
    difficulty: 'medium',
    explanation: smcq.originalSolution,
    source: 'Official Exam Source'
  };
}

function normalizeFromMasterJSON(mq: any): GameQuestion | null {
  if (!mq || mq.type !== 'multiple_choice' || !mq.options || mq.options.length !== 4) return null;

  // Options may be { id: 'A', text: '...' } or strings
  const optionsText = mq.options.map((opt: any) =>
    typeof opt === 'string' ? cleanOptionText(opt) : cleanOptionText(opt.text || '')
  );

  let ansIndex = -1;
  const rawAns = mq.correctAnswer;
  if (typeof rawAns === 'string') {
    const trimmed = rawAns.trim().toUpperCase();
    if (trimmed === 'A') ansIndex = 0;
    else if (trimmed === 'B') ansIndex = 1;
    else if (trimmed === 'C') ansIndex = 2;
    else if (trimmed === 'D') ansIndex = 3;
  } else if (typeof rawAns === 'number') {
    ansIndex = rawAns;
  }

  if (ansIndex < 0 || ansIndex > 3) return null;

  let topic: 'cylinder' | 'cone' | 'sphere' | 'mixed' = 'mixed';
  if (mq.topic === 'CYLINDER') topic = 'cylinder';
  else if (mq.topic === 'CONE') topic = 'cone';
  else if (mq.topic === 'SPHERE') topic = 'sphere';

  let diff: 'easy' | 'medium' | 'hard' | 'olympiad' = 'medium';
  if (mq.difficulty === 'LEVEL_1') diff = 'easy';
  else if (mq.difficulty === 'LEVEL_2') diff = 'medium';
  else if (mq.difficulty === 'LEVEL_3') diff = 'hard';
  else if (mq.difficulty === 'LEVEL_4') diff = 'olympiad';

  return {
    id: mq.id,
    type: 'mcq',
    q: mq.question,
    options: optionsText,
    ans: ansIndex,
    topic,
    difficulty: diff,
    explanation: Array.isArray(mq.solution4Steps) ? mq.solution4Steps.join(' ') : mq.solution4Steps,
    source: 'Master Bank'
  };
}

/**
 * Question Bank Service & State Manager for "Hình Học 9 Master"
 */
class GeometryGameQuestionService {
  private allNormalizedQuestions: GameQuestion[] = [];
  private isLoaded = false;

  // Active Session State
  private currentPool: GameQuestion[] = [];
  private usedQuestionIds: Set<string> = new Set();
  private currentIndex: number = 0;

  /**
   * Loads all questions once from all available Geometry Lab banks
   */
  public async loadAllBankQuestions(): Promise<GameQuestion[]> {
    if (this.isLoaded && this.allNormalizedQuestions.length > 0) {
      return this.allNormalizedQuestions;
    }

    const seenIds = new Set<string>();
    const candidates: (GameQuestion | null)[] = [];

    // 1. Source 1: Practice Questions (Geometry Lab SGK 9 practice)
    for (const pq of PRACTICE_QUESTIONS) {
      candidates.push(normalizeFromPracticeQuestion(pq));
    }

    // 2. Source 2: Teacher Service Questions (Mock + Custom in localStorage)
    try {
      const teacherExercises = TeacherService.getQuestionBank();
      for (const ex of teacherExercises) {
        if (ex.type === 'multiple_choice') {
          candidates.push(normalizeFromExercise(ex));
        }
      }
    } catch (e) {
      console.warn('[GAME QUESTION BANK] Error reading teacher question bank:', e);
    }

    // 3. Source 3: Source Exact MCQ Questions
    for (const smcq of SOURCE_MCQ_QUESTIONS) {
      candidates.push(normalizeFromSourceMCQ(smcq));
    }

    // 4. Source 4: Master Question Bank JSON (73+ curated questions)
    if (Array.isArray(masterQuestionBankData)) {
      for (const mq of masterQuestionBankData) {
        candidates.push(normalizeFromMasterJSON(mq));
      }
    }

    // 5. Source 5: QuestionBankStore generated variants
    try {
      const generatedMCQ = questionBank.getVariantsByFilter({ questionType: 'MULTIPLE_CHOICE' });
      for (const g of generatedMCQ) {
        if (g.options && g.options.length === 4) {
          const ansIdx = g.options.findIndex((opt: string) => opt.trim() === g.correctAnswer?.trim());
          if (ansIdx >= 0) {
            let topic: 'cylinder' | 'cone' | 'sphere' | 'mixed' = 'mixed';
            if (g.topic === 'CYLINDER') topic = 'cylinder';
            else if (g.topic === 'CONE') topic = 'cone';
            else if (g.topic === 'SPHERE') topic = 'sphere';

            candidates.push({
              id: g.generatedId || (g as any).id,
              type: 'mcq',
              q: g.question,
              options: g.options.map(cleanOptionText),
              ans: ansIdx,
              topic,
              difficulty: 'medium',
              explanation: Array.isArray(g.solution4Steps) ? g.solution4Steps.join(' ') : '',
              source: 'QuestionBank1000'
            });
          }
        }
      }
    } catch (e) {
      console.warn('[GAME QUESTION BANK] Error reading questionBank variants:', e);
    }

    // Validate and deduplicate
    const validQuestions: GameQuestion[] = [];
    for (const c of candidates) {
      if (c && validateGameQuestion(c) && !seenIds.has(c.id)) {
        seenIds.add(c.id);
        validQuestions.push(c);
      }
    }

    this.allNormalizedQuestions = validQuestions;
    this.isLoaded = true;

    if (process.env.NODE_ENV !== 'production') {
      console.group('[GAME QUESTION BANK]');
      console.log('Total ingested valid questions:', validQuestions.length);
      console.log('Sample question:', validQuestions[0]);
      console.groupEnd();
    }

    return this.allNormalizedQuestions;
  }

  /**
   * Filters and creates a session game pool (max 20 questions)
   */
  public async prepareGameSession(filter?: GameQuestionFilter, maxQuestions: number = 20): Promise<GameQuestionPoolResult> {
    const all = await this.loadAllBankQuestions();

    let filtered = all;

    if (filter?.topic && filter.topic !== 'all') {
      filtered = filtered.filter((q) => q.topic === filter.topic);
    }

    if (filter?.difficulty && filter.difficulty !== 'all') {
      filtered = filtered.filter((q) => q.difficulty === filter.difficulty);
    }

    const totalAvailable = filtered.length;

    if (totalAvailable === 0) {
      return {
        questions: [],
        totalAvailable: 0,
        poolSize: 0,
        statusMessage: 'Ngân hàng hiện chưa có câu hỏi phù hợp với bộ lọc đã chọn.'
      };
    }

    // Randomize candidates with Fisher-Yates
    const shuffled = shuffleQuestions(filtered);

    // Pick up to maxQuestions (default 20)
    const selected = shuffled.slice(0, Math.min(maxQuestions, totalAvailable));

    this.currentPool = selected;
    this.usedQuestionIds = new Set();
    this.currentIndex = 0;

    const statusMessage =
      totalAvailable >= maxQuestions
        ? `Ngân hàng hiện có ${totalAvailable} câu phù hợp. Lượt chơi này sẽ chọn ngẫu nhiên ${selected.length} câu.`
        : `Ngân hàng hiện có ${totalAvailable} câu phù hợp. Lượt chơi này sẽ sử dụng ${selected.length} câu.`;

    if (process.env.NODE_ENV !== 'production') {
      console.group('[GAME QUESTION BANK]');
      console.log('Filtered questions count:', totalAvailable);
      console.log('Game pool size:', selected.length);
      console.log('Status message:', statusMessage);
      console.groupEnd();
    }

    return {
      questions: selected,
      totalAvailable,
      poolSize: selected.length,
      statusMessage
    };
  }

  /**
   * Retrieves the next question from the active session pool without repetition
   */
  public getNextGameQuestion(): GameQuestion | null {
    while (this.currentIndex < this.currentPool.length) {
      const candidate = this.currentPool[this.currentIndex];
      this.currentIndex++;

      if (candidate && !this.usedQuestionIds.has(candidate.id)) {
        this.usedQuestionIds.add(candidate.id);

        if (process.env.NODE_ENV !== 'production') {
          console.group('[GAME QUESTION BANK]');
          console.log(`Current question #${this.usedQuestionIds.size}:`, candidate.id, candidate.q);
          console.groupEnd();
        }

        return candidate;
      }
    }

    return null; // Exhausted pool
  }

  /**
   * Resets session pool
   */
  public resetQuestionPool(): void {
    this.currentPool = [];
    this.usedQuestionIds.clear();
    this.currentIndex = 0;
  }

  public getPoolLength(): number {
    return this.currentPool.length;
  }

  public getCurrentIndex(): number {
    return this.currentIndex;
  }
}

export const GameQuestionService = new GeometryGameQuestionService();
