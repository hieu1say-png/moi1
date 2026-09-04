/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Data Architecture Central Export & Service Layer
 */

import { Shape, ShapeType, Lesson, Exercise, ExerciseType, RealWorldProblem, Achievement, Badge, Challenge, StudentError, Progress, Student } from '../types/dataArchitecture';
import { SHAPES_MOCK_DATA } from './shapesData';
import { LESSONS_MOCK_DATA } from './lessonsData';
import {
  ALL_MOCK_EXERCISES,
  MOCK_MULTIPLE_CHOICE_EXERCISES,
  MOCK_TRUE_FALSE_EXERCISES,
  MOCK_NUMERIC_EXERCISES,
  MOCK_FILL_BLANK_EXERCISES,
  MOCK_DRAG_DROP_EXERCISES,
  MOCK_CHALLENGE_EXERCISES
} from './exercisesData';
import { MOCK_STUDENT, MOCK_TEACHER, MOCK_STUDENTS_LIST, MOCK_ALL_USERS } from './userData';
import { MOCK_ACHIEVEMENTS, MOCK_BADGES, MOCK_CHALLENGES } from './gamificationData';
import { MOCK_REAL_WORLD_PROBLEMS } from './realWorldData';
import { MOCK_STUDENT_ERRORS } from './studentErrorsData';
import { MOCK_PROGRESS_RECORDS, MOCK_EXERCISE_ATTEMPTS } from './progressData';
import { MOCK_AI_CONVERSATIONS } from './aiData';
import { DETAILED_THEORY_DATA, DetailedShapeTheory } from './theoryContentData';

// Re-export all raw collections
export * from './shapesData';
export * from './lessonsData';
export * from './exercisesData';
export * from './userData';
export * from './gamificationData';
export * from './realWorldData';
export * from './studentErrorsData';
export * from './progressData';
export * from './aiData';
export * from './theoryContentData';

// ====================================================
// Data Access Repository Functions (Separated from UI)
// ====================================================

export const GeometryDataService = {
  // 1. Shapes & Detailed Theory
  getAllShapes: (): Shape[] => Object.values(SHAPES_MOCK_DATA),
  getShapeById: (shapeId: ShapeType): Shape => SHAPES_MOCK_DATA[shapeId] || SHAPES_MOCK_DATA.cylinder,
  getDetailedTheory: (shapeId: ShapeType): DetailedShapeTheory =>
    DETAILED_THEORY_DATA[shapeId] || DETAILED_THEORY_DATA.cylinder,

  // 2. Lessons
  getAllLessons: (): Lesson[] => LESSONS_MOCK_DATA,
  getLessonsByShape: (shapeId: ShapeType): Lesson[] =>
    LESSONS_MOCK_DATA.filter((lesson) => lesson.shapeId === shapeId),
  getLessonById: (lessonId: string): Lesson | undefined =>
    LESSONS_MOCK_DATA.find((l) => l.id === lessonId),

  // 3. Exercises
  getAllExercises: (): Exercise[] => ALL_MOCK_EXERCISES,
  getExercisesByShape: (shapeId: ShapeType): Exercise[] =>
    ALL_MOCK_EXERCISES.filter((ex) => ex.shapeId === shapeId),
  getExercisesByType: (type: ExerciseType): Exercise[] =>
    ALL_MOCK_EXERCISES.filter((ex) => ex.type === type),
  getExercisesByLesson: (lessonId: string): Exercise[] =>
    ALL_MOCK_EXERCISES.filter((ex) => ex.lessonId === lessonId),
  getExerciseById: (exerciseId: string): Exercise | undefined =>
    ALL_MOCK_EXERCISES.find((ex) => ex.id === exerciseId),

  // 4. Real World
  getAllRealWorldProblems: (): RealWorldProblem[] => MOCK_REAL_WORLD_PROBLEMS,
  getRealWorldProblemsByShape: (shapeId: ShapeType): RealWorldProblem[] =>
    MOCK_REAL_WORLD_PROBLEMS.filter((rw) => rw.shapeId === shapeId),
  getRealWorldProblemById: (id: string): RealWorldProblem | undefined =>
    MOCK_REAL_WORLD_PROBLEMS.find((rw) => rw.id === id),

  // 5. Gamification
  getAchievements: (): Achievement[] => MOCK_ACHIEVEMENTS,
  getBadges: (): Badge[] => MOCK_BADGES,
  getChallenges: (): Challenge[] => MOCK_CHALLENGES,
  getChallengeById: (id: string): Challenge | undefined =>
    MOCK_CHALLENGES.find((c) => c.id === id),

  // 6. Student Errors & Diagnosis
  getStudentErrors: (studentId?: string): StudentError[] =>
    studentId ? MOCK_STUDENT_ERRORS.filter((e) => e.studentId === studentId) : MOCK_STUDENT_ERRORS,
  getErrorsByShape: (shapeId: ShapeType): StudentError[] =>
    MOCK_STUDENT_ERRORS.filter((e) => e.shapeId === shapeId),

  // 7. Student Profile & Progress
  getCurrentStudent: (): Student => MOCK_STUDENT,
  getProgressByStudentAndShape: (studentId: string, shapeId: ShapeType): Progress | undefined =>
    MOCK_PROGRESS_RECORDS[`${studentId}_${shapeId}`],
  getAllExerciseAttempts: () => MOCK_EXERCISE_ATTEMPTS,

  // 8. AI Conversations
  getAIConversations: (studentId?: string) =>
    studentId ? MOCK_AI_CONVERSATIONS.filter((c) => c.studentId === studentId) : MOCK_AI_CONVERSATIONS
};
