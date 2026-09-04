/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Real-time Learning Context Data Model
 */

import { ShapeType } from './dataArchitecture';

export type LessonStateType = 'idle' | 'starting' | 'active' | 'completed';

export interface LearningContextData {
  studentId: string;
  studentName?: string;
  className?: string;
  currentShape: ShapeType | string;
  currentMode: string;
  currentActivity: string;
  currentPage: string;
  lessonState?: LessonStateType;
  currentStep?: number;
  learningPhase?: string;
  questionId: string | null;
  questionText: string | null;
  userAnswer: string | number | Record<string, any> | null;
  expectedAnswer: string | number | null;
  attemptCount: number;
  wrongCount: number;
  hintUsed: number[] | string[] | number;
  currentHintLevel: number;
  currentR: number | null;
  currentH: number | null;
  currentL: number | null;
  pourCount: number | null;
  cylinderFill: number | null;
  coneFill: number | null;
  lastAction: string | null;
  lastError: string | null;
  highlightTarget?: string | null;
  activeHighlightTarget?: string | null;
  timeSpent: number;
  completed: boolean;
  notes?: string;
}

export interface LearningContextUpdate {
  studentId?: string;
  studentName?: string;
  className?: string;
  currentShape?: ShapeType | string;
  currentMode?: string;
  currentActivity?: string;
  currentPage?: string;
  lessonState?: LessonStateType;
  currentStep?: number;
  learningPhase?: string;
  questionId?: string | null;
  questionText?: string | null;
  userAnswer?: string | number | Record<string, any> | null;
  expectedAnswer?: string | number | null;
  attemptCount?: number;
  wrongCount?: number;
  hintUsed?: number[] | string[] | number;
  currentHintLevel?: number;
  currentR?: number | null;
  currentH?: number | null;
  currentL?: number | null;
  pourCount?: number | null;
  cylinderFill?: number | null;
  coneFill?: number | null;
  lastAction?: string | null;
  lastError?: string | null;
  highlightTarget?: string | null;
  activeHighlightTarget?: string | null;
  timeSpent?: number;
  completed?: boolean;
  notes?: string;
}

export interface LearningContextValue {
  context: LearningContextData;
  updateContext: (partial: LearningContextUpdate) => void;
  resetContextToDefaults: () => void;
  set3DParams: (r: number | null, h: number | null, l?: number | null) => void;
  setPourState: (pourCount: number | null, cylinderFill: number | null, coneFill: number | null) => void;
  setQuestionContext: (q: {
    questionId?: string | null;
    questionText?: string | null;
    userAnswer?: any;
    expectedAnswer?: any;
    wrongCount?: number;
    attemptCount?: number;
    lastError?: string | null;
    currentHintLevel?: number;
  }) => void;
  recordAction: (action: string) => void;
}
