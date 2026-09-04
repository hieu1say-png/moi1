/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - UNIFIED ASSIGNMENT QUESTION ADAPTER
 * Source-Only mode: Connects Master Question Bank directly to Teacher & Student Assessment Engines.
 * Strictly guarantees 100% Multiple Choice (4 options: A, B, C, D) from the PDF source of truth.
 */

import { ARCHETYPE_MAP } from '../data/questionBank1000';
import { Exercise, ShapeType, ExerciseDifficulty, ExerciseType, MultipleChoiceExercise } from '../types/dataArchitecture';
import masterQuestionBankData from '../data/masterQuestionBank.json';
import { isAssessmentEligibleMCQ } from './assessmentEligibility';

export type QuestionSourceOrigin = 'SOURCE_EXACT' | 'GENERATED_VARIANT';
export type SourceFilterMode = 'SOURCE_ONLY' | 'VARIANT_ONLY' | 'BOTH';

export interface UnifiedAssignmentQuestionItem {
  id: string; // e.g. 'GL-MCQ-0001'
  origin: QuestionSourceOrigin;
  title: string;
  question: string;
  shape: ShapeType | 'mixed';
  topicLabel: string;
  difficulty: ExerciseDifficulty;
  difficultyLabel: string;
  type: ExerciseType;
  typeLabel: string;
  archetypeId: string;
  archetypeName: string;
  sourceDoc?: string;
  sourceNumber?: string;
  sourcePage?: number;
  options: string[];
  optionsDetailed?: Array<{ id: 'A' | 'B' | 'C' | 'D'; text: string }>;
  correctAnswerDisplay: string;
  rawCorrectAnswer: string;
  points: number;
  solution4Steps: [string, string, string, string];
  importantNotes?: string[];
  misconceptions?: string[];
  formula?: string;
  hasImage: boolean;
  imageSpec?: any;
  latexEquation?: string;
  verificationStatus: 'VERIFIED_SOURCE' | 'VERIFIED_GENERATED';
  fingerprint: string;
}

// Convert Topic
export function mapTopicToShape(topic: string): ShapeType | 'mixed' {
  const t = (topic || '').toUpperCase();
  if (t.includes('CYL') || t.includes('TRỤ')) return 'cylinder';
  if (t.includes('CONE') || t.includes('NÓN')) return 'cone';
  if (t.includes('SPH') || t.includes('CẦU')) return 'sphere';
  return 'mixed';
}

// Convert Difficulty
export function mapDifficulty(diff: string): ExerciseDifficulty {
  if (diff === 'LEVEL_1' || diff === 'easy' || diff === 'NHẬN BIẾT') return 'easy';
  if (diff === 'LEVEL_2' || diff === 'medium' || diff === 'THÔNG HIỂU') return 'medium';
  if (diff === 'LEVEL_3' || diff === 'hard' || diff === 'VẬN DỤNG') return 'hard';
  return 'olympiad'; // LEVEL_4 / VẬN DỤNG CAO
}

// Convert Type
export function mapQuestionType(type: string): ExerciseType {
  return 'multiple_choice';
}

/**
 * Builds the complete unified catalog of questions from Master Question Bank
 * Strictly filters for assessment-eligible 4-option MCQs.
 */
export function getUnifiedAssignmentBank(): UnifiedAssignmentQuestionItem[] {
  const list: UnifiedAssignmentQuestionItem[] = [];
  const rawList = Array.isArray(masterQuestionBankData) 
    ? masterQuestionBankData 
    : (masterQuestionBankData as any).questions || [];

  for (const q of rawList) {
    if (!isAssessmentEligibleMCQ(q)) continue;

    const arch = ARCHETYPE_MAP.get(q.archetypeId || '');
    const shape = mapTopicToShape(q.topic);
    const diff = mapDifficulty(q.difficulty);

    const stringOptions = q.options.map(
      (opt: { id: string; text: string }) => `${opt.id}. ${opt.text}`
    );

    const sol4: [string, string, string, string] = (q.solution4Steps && q.solution4Steps.length === 4)
      ? [q.solution4Steps[0], q.solution4Steps[1], q.solution4Steps[2], q.solution4Steps[3]]
      : [
          'Bước 1: Phân tích dữ kiện từ đề bài.',
          'Bước 2: Xác định công thức hình học không gian tương ứng.',
          'Bước 3: Thay số và giải toán chi tiết.',
          `Bước 4: Kết luận: Chọn đáp án ${q.correctAnswer}.`
        ];

    list.push({
      id: q.id,
      origin: 'SOURCE_EXACT',
      title: `[Nguồn PDF] Câu ${q.sourceNumber || q.id}`,
      question: q.question,
      shape,
      topicLabel: shape === 'cylinder' ? 'Hình Trụ' : shape === 'cone' ? 'Hình Nón' : shape === 'sphere' ? 'Khối Cầu' : 'Hình Tổng Hợp',
      difficulty: diff,
      difficultyLabel: diff === 'easy' ? 'Nhận biết' : diff === 'medium' ? 'Thông hiểu' : diff === 'hard' ? 'Vận dụng' : 'Vận dụng cao',
      type: 'multiple_choice',
      typeLabel: 'Trắc nghiệm 4 đáp án',
      archetypeId: q.archetypeId || 'ARCH_STANDARD',
      archetypeName: arch?.name || q.archetypeId || 'Mô hình chuẩn PDF',
      sourceDoc: q.sourceFile || 'Câu 1(1).pdf',
      sourceNumber: q.sourceNumber,
      sourcePage: q.sourcePage,
      options: stringOptions,
      optionsDetailed: q.options as Array<{ id: 'A' | 'B' | 'C' | 'D'; text: string }>,
      correctAnswerDisplay: q.correctAnswer,
      rawCorrectAnswer: q.correctAnswer,
      points: 1.0,
      solution4Steps: sol4,
      importantNotes: q.importantNotes || ['Đọc kỹ dữ kiện bán kính (r) và đường kính (d).'],
      formula: undefined,
      hasImage: Boolean(q.imageUrl),
      imageSpec: null,
      verificationStatus: 'VERIFIED_SOURCE',
      fingerprint: `SRC_${q.sourceId || q.id}`
    });
  }

  return list;
}

// Memory Cache
let cachedUnifiedBank: UnifiedAssignmentQuestionItem[] | null = null;

export function getCachedUnifiedAssignmentBank(): UnifiedAssignmentQuestionItem[] {
  if (!cachedUnifiedBank) {
    cachedUnifiedBank = getUnifiedAssignmentBank();
  }
  return cachedUnifiedBank;
}

/**
 * Converts a UnifiedAssignmentQuestionItem to an Exercise object for backward compatibility
 */
export function convertUnifiedToExercise(item: UnifiedAssignmentQuestionItem): MultipleChoiceExercise {
  const base = {
    id: item.id,
    title: item.title,
    question: item.question,
    shapeId: item.shape as ShapeType,
    difficulty: item.difficulty,
    sourceDoc: item.sourceDoc,
    hint: item.solution4Steps[0] || 'Áp dụng công thức hình học chuẩn.',
    explanation: item.solution4Steps.join('\n\n'),
    pointsXp: 10,
    tags: [item.archetypeId, item.archetypeName, item.origin],
    latexEquation: undefined,
    images: []
  };

  const rawOpts = item.options || ['A. Lựa chọn 1', 'B. Lựa chọn 2', 'C. Lựa chọn 3', 'D. Lựa chọn 4'];
  const cleanOpts = rawOpts.map((opt) => opt.replace(/^[A-D]\.\s*/, ''));
  
  let correctIdx = 0;
  const ansStr = item.correctAnswerDisplay.trim().toUpperCase();
  if (ansStr === 'A') correctIdx = 0;
  else if (ansStr === 'B') correctIdx = 1;
  else if (ansStr === 'C') correctIdx = 2;
  else if (ansStr === 'D') correctIdx = 3;

  const mcq: MultipleChoiceExercise = {
    ...base,
    type: 'multiple_choice',
    options: cleanOpts,
    correctOptionIndex: correctIdx
  };
  return mcq;
}
