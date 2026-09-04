/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - QUESTION BANK MASTER CONTRACT SCHEMA
 * Full 4-Tier Data Model: SOURCE_EXACT -> ARCHETYPE -> GENERATED_VARIANT -> EXAM/ASSIGNMENT_INSTANCE
 */

export type SourceType = 'MULTIPLE_CHOICE' | 'ESSAY';
export type VerificationStatus = 'VERIFIED_SOURCE' | 'NEEDS_VISUAL_VERIFICATION';
export type VariantValidationStatus = 'VERIFIED_GENERATED' | 'NEEDS_REVIEW';

export type CanonicalShapeTopic = 'CYLINDER' | 'CONE' | 'SPHERE' | 'MIXED_SOLIDS' | 'PARADOX_1_3';
export type QuestionDifficultyLevel = 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'LEVEL_4';
export type ExerciseQuestionType = 
  | 'MULTIPLE_CHOICE' 
  | 'SHORT_ANSWER' 
  | 'NUMERICAL' 
  | 'TRUE_FALSE' 
  | 'MULTI_SHORT_ANSWER' 
  | 'STEP_BY_STEP' 
  | 'STEP_RESPONSE';

export interface ImageSpec {
  shape: 'CYLINDER' | 'CONE' | 'SPHERE' | 'COMPOSITE' | 'CROSS_SECTION' | 'UNFOLDED_NET' | 'REAL_WORLD_OBJECT';
  dimensions: Record<string, number | string>;
  labels: Record<string, string>;
  requiredElements: string[];
  forbiddenElements?: string[];
  camera?: {
    fov?: number;
    angle?: string;
    view?: 'isometric' | 'perspective' | 'front' | 'top';
  };
  orientation?: 'vertical' | 'horizontal' | 'slanted';
  svgRendererType?: string;
}

export interface InteractiveQuestionAdapter {
  interactiveType: ExerciseQuestionType;
  prompt: string;
  options?: string[];
  expectedAnswer: string | string[] | number | boolean;
  tolerance?: number;
  unit?: string;
  solution4Steps: [string, string, string, string];
  importantNotes: string[];
}

export interface SourceExactQuestion {
  id: string; // 'MCQ-001' -> 'MCQ-031', 'TL-001' -> 'TL-042'
  recordType: 'SOURCE_EXACT';
  sourceFile: string;
  sourcePage?: number | string;
  sourceQuestionNumber: number | string;
  sourceExam?: string;
  sourceYear?: number | string;
  sourceType: SourceType;
  archetypeId: string;
  originalQuestion: string;
  originalImages?: string[];
  originalEquations?: string[];
  originalOptions?: string[];
  originalAnswer: string;
  originalSolution?: string | string[];
  verificationStatus: VerificationStatus;
  interactiveVersion?: InteractiveQuestionAdapter;
}

export interface ArchetypeDefinition {
  archetypeId: string;
  name: string; // Vietnamese archetype name
  category: 'CYLINDER' | 'CONE' | 'SPHERE' | 'COMPOSITE' | 'REAL_WORLD' | 'OPTIMIZATION';
  subCategory: string;
  description: string;
  mathematicalModel: string;
  coreFormulas: string[];
  typicalTraps: string[];
  sourceQuestionIds: string[];
}

export interface GeneratedVariantQuestion {
  generatedId: string; // e.g. 'VAR-0001' -> 'VAR-1050'
  id?: string; // Legacy compatibility
  recordType: 'GENERATED_VARIANT';
  sourceArchetypeId: string;
  archetypeId?: string; // Legacy compatibility
  sourceReferenceId?: string;
  topic: CanonicalShapeTopic;
  difficulty: QuestionDifficultyLevel;
  questionType: ExerciseQuestionType;
  question: string;
  options?: string[];
  data: Record<string, any>;
  formula: string;
  correctAnswer: string;
  tolerance: number;
  unit: string;
  imageSpec?: ImageSpec;
  imageRequired?: boolean; // Legacy compatibility
  imageMode?: string; // Legacy compatibility
  solution4Steps: [string, string, string, string];
  importantNotes: string[]; // Maximum 3 concise notes
  misconceptions: string[];
  validationStatus: VariantValidationStatus;
  questionFingerprint: string;
}

export interface LegacyBatchQuestion {
  id: string;
  archetypeId: string;
  topic: CanonicalShapeTopic;
  difficulty: QuestionDifficultyLevel;
  questionType: ExerciseQuestionType;
  question: string;
  options?: string[];
  data: Record<string, any>;
  formula: string;
  correctAnswer: string;
  tolerance: number;
  unit: string;
  imageRequired?: boolean;
  imageMode?: string;
  imagePrompt?: string;
  quickHints?: string[];
  sourceReference?: any;
  solution4Steps: [string, string, string, string];
  importantNotes?: string[];
  misconceptions?: string[];
  validationStatus?: string;
  questionFingerprint?: string;
}



export type Canonical1000Question = SourceExactQuestion | GeneratedVariantQuestion | LegacyBatchQuestion;


export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  validationTimestamp: number;
}
