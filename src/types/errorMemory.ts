/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - AI ERROR MEMORY & MASTERY CHECK ARCHITECTURE
 * Core types for Error Tracking, Concept Misconceptions, and Mastery Checks.
 */

import { ShapeType } from './dataArchitecture';
import { SpatialMetricKey } from './spatialProfile';

export type MasteryStatus = 'unknown' | 'learning' | 'mastered' | 'needs_review';

export type ErrorTaxonomyType =
  | 'RADIUS_DIAMETER_CONFUSION'
  | 'HEIGHT_ERROR'
  | 'GENERATRIX_ERROR'
  | 'FORMULA_ERROR'
  | 'ARITHMETIC_ERROR'
  | 'UNIT_ERROR'
  | '3D_2D_TRANSFORMATION_ERROR'
  | 'SECTION_ERROR'
  | 'UNFOLDING_ERROR'
  | 'MODEL_SELECTION_ERROR'
  | 'SPATIAL_ORIENTATION_ERROR'
  | 'VOLUME_PARADOX_MISUNDERSTANDING'
  | 'OTHER_ERROR';

export type ConceptKey =
  | 'radius_vs_diameter'
  | 'generatrix_vs_height'
  | 'cone_volume_one_third'
  | 'cylinder_total_surface'
  | 'sphere_formula_exponent'
  | 'sphere_great_circle'
  | 'unfolding_nets'
  | 'cross_section_plane'
  | 'unit_conversion'
  | 'arithmetic_calculation'
  | 'spatial_perspective_rotation'
  | 'pythagoras_cone';

export interface ErrorMemory {
  id: string;
  studentId?: string;
  activityId: string;
  questionId?: string;
  shape: ShapeType | 'mixed';
  errorType: ErrorTaxonomyType | string;
  concept: ConceptKey | string;
  conceptTitle?: string;
  userAnswer?: string;
  expectedAnswer?: string;
  attemptNumber: number;
  hintLevelUsed: number;
  firstSeenAt: number;
  lastSeenAt: number;
  resolved: boolean;
  masteryStatus: MasteryStatus;
  repeatCount: number;
  independentSuccessCount: number;
  consecutiveSuccessCount: number;
  lastPromptGiven?: string;
  recommendedActivity?: string;
}

export interface ConceptMasteryRecord {
  concept: ConceptKey | string;
  conceptTitle: string;
  shape: ShapeType | 'mixed';
  masteryScore: number; // 0 -> 100
  masteryStatus: MasteryStatus;
  independentSuccess: number;
  repeatCount: number;
  totalAttempts: number;
  lastTestedAt: number;
  relatedSpatialMetric: SpatialMetricKey;
  recommendedPracticeRoute?: string;
}

export interface MasteryCheckOption {
  id: string;
  text: string;
  latex?: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface MasteryCheckQuestion {
  id: string;
  concept: ConceptKey | string;
  conceptTitle: string;
  shape: ShapeType | 'mixed';
  title: string;
  questionText: string;
  questionLatex?: string;
  type: 'multiple_choice' | 'numeric' | 'true_false' | 'concept_why';
  options?: MasteryCheckOption[];
  expectedNumeric?: number;
  tolerance?: number;
  unit?: string;
  explanation: string;
  whyExplanation?: string;
  formulaLatex?: string;
  hint: string;
  relatedSpatialMetric: SpatialMetricKey;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface MasteryCheckResult {
  checkId: string;
  concept: string;
  userAnswer: any;
  isCorrect: boolean;
  scoreDelta: number;
  newMasteryStatus: MasteryStatus;
  feedbackText: string;
  timestamp: number;
}
