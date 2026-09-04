/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - QUESTION INTELLIGENCE ENGINE (1,000 QUESTION BANK TYPES)
 */

export type CanonicalTopic =
  | 'CYLINDER'
  | 'CONE'
  | 'SPHERE'
  | 'PARADOX_1_3'
  | 'SURFACE_AREA'
  | 'VOLUME'
  | 'NET'
  | 'REAL_WORLD'
  | 'GENERAL_GEOMETRY';

export type CanonicalIntent =
  | 'CONCEPT'
  | 'FORMULA'
  | 'CALCULATION'
  | 'EXPLANATION'
  | 'WHY'
  | 'STEP_BY_STEP'
  | 'HINT'
  | 'CHECK_ANSWER'
  | 'ERROR_ANALYSIS'
  | 'COMPARE'
  | 'REAL_WORLD'
  | 'VISUAL_3D'
  | 'NET_UNFOLD'
  | 'AXIAL_SECTION'
  | 'GREAT_CIRCLE'
  | 'PROOF'
  | 'PRACTICE'
  | 'EXAMPLE'
  | 'PARADOX_1_3'
  | 'CHALLENGE'
  | 'OTHER';

export type CanonicalSubIntent =
  | 'RADIUS'
  | 'DIAMETER'
  | 'HEIGHT'
  | 'SLANT_HEIGHT'
  | 'CIRCUMFERENCE'
  | 'AREA'
  | 'SURFACE_AREA'
  | 'VOLUME'
  | 'UNIT_CONVERSION'
  | 'NET_RELATION'
  | 'AXIAL_SECTION'
  | 'GREAT_CIRCLE'
  | '3D_ROTATION'
  | '3D_UNFOLD'
  | 'WATER_LEVEL'
  | 'POUR_COUNT'
  | 'FORMULA_DERIVATION'
  | 'GENERAL';

export type QuestionDifficulty = 'UNDERSTAND' | 'APPLY' | 'ANALYZE' | 'MASTERY';

export type ResponseMode =
  | 'GENTLE_HINT'
  | 'GUIDED_QUESTION'
  | 'FORMULA_RECALL'
  | 'STEP_GUIDANCE'
  | 'FULL_SOLUTION'
  | 'CONCEPT_EXPLANATION'
  | 'VISUAL_EXPLANATION'
  | 'ERROR_CORRECTION'
  | 'COMPARE_EXPLANATION'
  | 'REAL_WORLD_EXPLANATION'
  | 'ENCOURAGEMENT'
  | 'CLARIFICATION';

export type StudentStateType =
  | 'CURIOUS'
  | 'CONFIDENT'
  | 'CONFUSED'
  | 'STUCK'
  | 'FRUSTRATED'
  | 'PLAYFUL'
  | 'UNCERTAIN'
  | 'NEUTRAL';

export interface QuestionRecord {
  id: string;
  topic: CanonicalTopic;
  intent: CanonicalIntent;
  secondaryIntents?: CanonicalIntent[];
  subIntent?: CanonicalSubIntent;
  difficulty: QuestionDifficulty;
  question: string;
  normalizedQuestion: string;
  keywords: string[];
  entities?: Record<string, any>;
  answer: string;
  shortAnswer: string;
  teacherStyleResponse?: string;
  quickReplies: string[];
  commonMistakes?: string[];
  requiredData?: string[];
  optionalData?: string[];
  formula?: string;
  visualContext?: {
    shape: string;
    highlightTarget?: string;
    action?: string;
  };
  responseMode: ResponseMode;
}

export interface MatchedQuestionResult {
  id: string;
  score: number;
  reason: string;
  record: QuestionRecord;
}

export interface QuickReplyOption {
  label: string;
  prompt: string;
  actionType?: string;
}
