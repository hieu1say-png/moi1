/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExerciseAttempt } from './dataArchitecture';
export * from './dataArchitecture';
export * from './learningContext';
export * from './auth';
export * from './theoryVideo';

export type RouteId =
  | '/login'
  | '/student-profile'
  | '/home'
  | '/theory'
  | '/explore'
  | '/practice'
  | '/exam-prep'
  | '/real-world'
  | '/achievements'
  | '/ai'
  | '/settings'
  | '/teacher'
  | '/teacher-dashboard'
  | '/cylinder'
  | '/cone'
  | '/sphere';

// Legacy compatibility aliases for existing UI components
export interface ShapeInfo {
  id: 'cylinder' | 'cone' | 'sphere';
  name: string;
  vietnameseName: string;
  description: string;
  color: string;
  accentColor: string;
  badge: string;
  iconName: string;
  elements: {
    label: string;
    symbol: string;
    unit: string;
    description: string;
  }[];
  formulas: {
    name: string;
    latex: string;
    explanation: string;
    variables: string[];
  }[];
}

export interface PracticeQuestion {
  id: string;
  shapeType: 'cylinder' | 'cone' | 'sphere';
  difficulty: 'easy' | 'medium' | 'hard';
  title: string;
  question: string;
  latexEquation?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  hint: string;
  realWorldContext?: string;
}

export interface RealWorldInteractiveQuiz {
  question: string;
  targetParameter: string;
  unit: string;
  placeholder: string;
  expectedValue: number;
  acceptableRange: [number, number];
  tolerancePercent?: number;
  hint: string;
  formulaHint: string;
}

export interface RealWorldApplication {
  id: string;
  shapeType: 'cylinder' | 'cone' | 'sphere';
  title: string;
  subtitle: string;
  category: string;
  description: string;
  imagePlaceholder: string;
  illustrationKey: string;
  mathProblem: {
    statement: string;
    given: string[];
    solutionSteps: {
      step: number;
      text: string;
      latex?: string;
    }[];
    result: string;
    practicalNote?: string;
  };
  quiz?: RealWorldInteractiveQuiz;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  category: 'theory' | 'practice' | 'explore' | 'mastery';
}

export interface UserStats {
  xp: number;
  level: number;
  completedTheories: string[];
  completedPractices: string[];
  completedRealWorld?: string[];
  exploredShapes: string[];
  streakDays: number;
  accuracy: number;
  attempts?: ExerciseAttempt[];
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
  duration?: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  latex?: string;
  suggestedFollowUps?: string[];
}
