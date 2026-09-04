import masterQuestionBankData from '../data/masterQuestionBank.json';

export interface AssessmentMCQOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface AssessmentMCQQuestion {
  id: string;
  sourceId: string;
  sourceFile: string;
  sourcePage?: number;
  sourceNumber: string;
  topic: 'CYLINDER' | 'CONE' | 'SPHERE' | 'MIXED';
  subtopic?: string;
  archetypeId?: string;
  difficulty: 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'LEVEL_4';
  type: 'multiple_choice';
  question: string;
  imageUrl?: string | null;
  imageAlt?: string | null;
  imageStatus?: string;
  options: AssessmentMCQOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  solution4Steps?: string[];
  explanation?: string;
  importantNotes?: string[];
  misconceptions?: string[];
  validationStatus: 'VERIFIED';
  assessmentEligible?: boolean;
  recordType?: 'SOURCE_EXACT';
  formulaTags?: string[];
}

/**
 * Validates whether an arbitrary question record strictly fulfills the
 * Assessment MCQ Contract:
 * 1. Must be type === "multiple_choice"
 * 2. Must have exactly 4 options with IDs 'A', 'B', 'C', 'D'
 * 3. Must have a valid correctAnswer in ['A', 'B', 'C', 'D']
 * 4. Must have validationStatus === 'VERIFIED'
 * 5. Must have a valid sourceId (cannot be synthetic / VAR-* without source)
 * 6. Must not be empty or corrupted
 */
export function isAssessmentEligibleMCQ(q: any): q is AssessmentMCQQuestion {
  if (!q || typeof q !== 'object') return false;

  // 1. Check type
  if (q.type !== 'multiple_choice') return false;

  // 2. Reject synthetic/unverified variants
  if (typeof q.id === 'string' && q.id.startsWith('VAR-') && !q.sourceId) {
    return false;
  }

  // 3. Check validation status
  if (q.validationStatus !== 'VERIFIED') return false;

  // 4. Must have a source trace
  if (!q.sourceId) return false;

  // 5. Must have exactly 4 options
  if (!Array.isArray(q.options) || q.options.length !== 4) return false;

  // 6. Option IDs must be A, B, C, D
  const optionIds = q.options.map((o: any) => o?.id);
  const requiredIds = ['A', 'B', 'C', 'D'];
  const hasAllIds = requiredIds.every(id => optionIds.includes(id));
  if (!hasAllIds) return false;

  // 7. Option text must not be empty
  const allHaveText = q.options.every((o: any) => typeof o?.text === 'string' && o.text.trim().length > 0);
  if (!allHaveText) return false;

  // 8. Correct answer must be one of A, B, C, D
  if (!requiredIds.includes(q.correctAnswer)) return false;

  // 9. Question text must not be empty
  if (typeof q.question !== 'string' || q.question.trim().length === 0) return false;

  return true;
}

/**
 * Asserts MCQ contract without throwing, returning a sanitized question if valid
 */
export function assertMCQQuestion(q: any): AssessmentMCQQuestion | null {
  if (isAssessmentEligibleMCQ(q)) {
    return q;
  }
  return null;
}

/**
 * Retrieves all assessment-eligible questions from the Master Question Bank.
 */
export function getMasterAssessmentQuestions(): AssessmentMCQQuestion[] {
  const rawList = Array.isArray(masterQuestionBankData) 
    ? masterQuestionBankData 
    : (masterQuestionBankData as any).questions || [];

  return rawList.filter(isAssessmentEligibleMCQ);
}
