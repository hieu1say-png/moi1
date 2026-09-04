/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Progress & Exercise Attempts Mock Data
 */

import { Progress, ExerciseAttempt } from '../types/dataArchitecture';

export const MOCK_PROGRESS_RECORDS: Record<string, Progress> = {
  'usr-student-001_cylinder': {
    id: 'prog-cyl-001',
    studentId: 'usr-student-001',
    shapeId: 'cylinder',
    lessonProgress: {
      'lesson-cyl-01': {
        completed: true,
        score: 95,
        lastAccessedAt: '2026-08-14T10:00:00Z',
        attemptsCount: 2
      },
      'lesson-cyl-02': {
        completed: true,
        score: 90,
        lastAccessedAt: '2026-08-15T08:30:00Z',
        attemptsCount: 1
      }
    },
    exercisesCompleted: ['ex-mc-cyl-01', 'ex-num-cyl-01', 'ex-dd-formulas-01'],
    masteryLevel: 85,
    accuracyRate: 92,
    totalTimeSpentMinutes: 75,
    lastActiveAt: '2026-08-15T18:00:00Z'
  },
  'usr-student-001_cone': {
    id: 'prog-cone-001',
    studentId: 'usr-student-001',
    shapeId: 'cone',
    lessonProgress: {
      'lesson-cone-01': {
        completed: true,
        score: 88,
        lastAccessedAt: '2026-08-15T11:00:00Z',
        attemptsCount: 2
      },
      'lesson-cone-02': {
        completed: false,
        score: 60,
        lastAccessedAt: '2026-08-15T14:00:00Z',
        attemptsCount: 1
      }
    },
    exercisesCompleted: ['ex-mc-cone-01', 'ex-fb-cone-01'],
    masteryLevel: 65,
    accuracyRate: 85,
    totalTimeSpentMinutes: 50,
    lastActiveAt: '2026-08-15T14:30:00Z'
  },
  'usr-student-001_sphere': {
    id: 'prog-sph-001',
    studentId: 'usr-student-001',
    shapeId: 'sphere',
    lessonProgress: {
      'lesson-sph-01': {
        completed: false,
        score: 40,
        lastAccessedAt: '2026-08-15T16:00:00Z',
        attemptsCount: 1
      }
    },
    exercisesCompleted: ['ex-mc-sph-01'],
    masteryLevel: 35,
    accuracyRate: 80,
    totalTimeSpentMinutes: 25,
    lastActiveAt: '2026-08-15T16:30:00Z'
  }
};

export const MOCK_EXERCISE_ATTEMPTS: ExerciseAttempt[] = [
  {
    id: 'att-001',
    exerciseId: 'ex-mc-cyl-01',
    studentId: 'usr-student-001',
    exerciseType: 'multiple_choice',
    timestamp: '2026-08-14T10:15:00Z',
    answerGiven: 1, // Option 1: 120π cm²
    isCorrect: true,
    scoreAwarded: 40,
    timeSpentSeconds: 45,
    hintsUsedCount: 0
  },
  {
    id: 'att-002',
    exerciseId: 'ex-mc-cone-01',
    studentId: 'usr-student-001',
    exerciseType: 'multiple_choice',
    timestamp: '2026-08-14T11:20:00Z',
    answerGiven: 0, // Option 0: 10 cm
    isCorrect: true,
    scoreAwarded: 40,
    timeSpentSeconds: 52,
    hintsUsedCount: 0
  },
  {
    id: 'att-003',
    exerciseId: 'ex-num-cone-01',
    studentId: 'usr-student-001',
    exerciseType: 'numeric',
    timestamp: '2026-08-15T14:10:00Z',
    answerGiven: 37680,
    isCorrect: false,
    scoreAwarded: 0,
    timeSpentSeconds: 110,
    hintsUsedCount: 1,
    studentErrorId: 'err-004'
  }
];
