/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Comprehensive Data Architecture Types & Interfaces
 */

// ==========================================
// 1. Core Shapes & Themes
// ==========================================

export type ShapeType = 'cylinder' | 'sphere' | 'cone';

export interface ShapeColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  bgLight: string;
  bgSubtle: string;
  border: string;
  borderSubtle: string;
  badgeBg: string;
  textDark: string;
  gradient: string;
}

export interface FormulaVariable {
  symbol: string;
  name: string;
  unit: string;
  description: string;
}

export interface DerivedFormula {
  name: string;
  latex: string;
  notes: string;
}

export interface Formula {
  id: string;
  name: string;
  vietnameseName: string;
  latex: string;
  explanation: string;
  variables: FormulaVariable[];
  derivedFormulas?: DerivedFormula[];
  standardGrade9ExamFrequency: 'high' | 'very_high' | 'medium';
}

export interface ShapeElement {
  label: string;
  symbol: string;
  unit: string;
  description: string;
}

export interface Shape {
  id: ShapeType;
  name: string;
  vietnameseName: string;
  englishName: string;
  colorTheme: ShapeColorTheme;
  description: string;
  learningObjectives: string[];
  elements: ShapeElement[];
  formulas: Formula[];
  badgeTag: string;
  iconName: string;
  realWorldPreview: string;
}

// ==========================================
// 2. Users, Students, & Teachers
// ==========================================

export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  lastLoginAt: string;
}

export interface Student extends User {
  role: 'student';
  grade: number; // 9
  className: string;
  school: string;
  level: number;
  xp: number;
  streakDays: number;
  accuracyRate: number;
  targetExamScore?: number; // Mục tiêu thi vào 10 (e.g. 9.0)
  completedLessons: string[];
  completedExercises: string[];
  exploredShapes: ShapeType[];
  badgesEarned: string[];
  achievementsUnlocked: string[];
  activeChallengeIds: string[];
}

export interface Teacher extends User {
  role: 'teacher';
  school: string;
  subject: string;
  assignedClasses: string[];
  publishedLessonsCount: number;
  bio?: string;
}

export interface TeacherProfile {
  id: string;
  userId: string;
  fullName: string;
  title: string;
  schoolName: string;
  department: string;
  specialization: string;
  avatarInitials: string;
  avatarUrl?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 3. Lessons & Curriculum Structure
// ==========================================

export interface LessonSection {
  id: string;
  order: number;
  title: string;
  type: 'theory' | 'interactive_3d' | 'examples' | 'summary' | 'check_understanding';
  contentMarkdown?: string;
  featuredFormulaIds?: string[];
}

export interface Lesson {
  id: string;
  shapeId: ShapeType;
  title: string;
  subtitle: string;
  chapter: string; // e.g. "Chương IV - Hình Trụ, Hình Nón, Hình Cầu"
  order: number;
  estimatedDurationMinutes: number;
  description: string;
  learningObjectives: string[];
  keyFormulaIds: string[];
  sections: LessonSection[];
  prerequisites?: string[];
  nextLessonId?: string;
}

// ==========================================
// 4. Exercises & Attempt Models (6 Types)
// ==========================================

export type ExerciseType =
  | 'multiple_choice'
  | 'true_false'
  | 'numeric'
  | 'fill_blank'
  | 'drag_drop'
  | 'challenge';

export type ExerciseDifficulty = 'easy' | 'medium' | 'hard' | 'olympiad';

export interface BaseExercise {
  id: string;
  shapeId: ShapeType | 'mixed';
  lessonId?: string;
  type: ExerciseType;
  title: string;
  question: string;
  latexEquation?: string;
  hint: string;
  explanation: string;
  pointsXp: number;
  difficulty: ExerciseDifficulty;
  realWorldContext?: string;
  tags: string[];
  images?: string[];
  image?: string;
}

// 4.1 Multiple Choice
export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple_choice';
  options: string[];
  correctOptionIndex: number;
}

// 4.2 True / False
export interface TrueFalseStatement {
  id: string;
  statement: string;
  latex?: string;
  isTrue: boolean;
  explanation: string;
}

export interface TrueFalseExercise extends BaseExercise {
  type: 'true_false';
  statements: TrueFalseStatement[];
}

// 4.3 Numeric Calculation
export interface NumericExercise extends BaseExercise {
  type: 'numeric';
  expectedNumber: number;
  tolerance: number; // e.g. 0.05
  unit: string; // e.g. "cm²", "cm³", "m"
  placeholder: string;
  stepByStepGuide: {
    stepNumber: number;
    description: string;
    formulaLatex?: string;
    intermediateValue?: string;
  }[];
}

// 4.4 Fill in the Blank
export interface BlankItem {
  id: string;
  placeholder: string;
  acceptedAnswers: string[];
  hint?: string;
}

export interface FillBlankExercise extends BaseExercise {
  type: 'fill_blank';
  template: string; // e.g. "Diện tích xung quanh của hình nón có bán kính đáy r và đường sinh l là S_xq = {{blank_1}}."
  blanks: BlankItem[];
}

// 4.5 Drag and Drop Matching
export interface DragItem {
  id: string;
  label: string;
  latex?: string;
  shapeType?: ShapeType;
}

export interface DropZone {
  id: string;
  title: string;
  description: string;
  acceptsItemId: string;
}

export interface DragDropExercise extends BaseExercise {
  type: 'drag_drop';
  draggableItems: DragItem[];
  dropZones: DropZone[];
}

// 4.6 Challenge / Olympiad Multi-step
export interface ChallengeSubQuestion {
  id: string;
  order: number;
  question: string;
  latex?: string;
  answerType: 'numeric' | 'multiple_choice' | 'text';
  expectedAnswer: string | number;
  options?: string[];
  points: number;
}

export interface ChallengeExercise extends BaseExercise {
  type: 'challenge';
  scenario: string;
  timeLimitSeconds: number;
  bonusXp: number;
  subQuestions: ChallengeSubQuestion[];
}

export type Exercise =
  | MultipleChoiceExercise
  | TrueFalseExercise
  | NumericExercise
  | FillBlankExercise
  | DragDropExercise
  | ChallengeExercise;

// 4.7 Exercise Attempt Records
export interface ExerciseAttempt {
  id: string;
  exerciseId: string;
  studentId?: string;
  shapeId?: ShapeType;
  difficulty?: ExerciseDifficulty;
  exerciseType: ExerciseType;
  timestamp: string;
  answerGiven: any;
  isCorrect: boolean;
  scoreAwarded: number;
  timeSpentSeconds: number;
  hintsUsedCount?: number;
  studentErrorId?: string;
  commonErrorTitle?: string;
  commonErrorDesc?: string;
}

// ==========================================
// 5. Progress Tracking
// ==========================================

export interface LessonProgressSummary {
  completed: boolean;
  score: number;
  lastAccessedAt: string;
  attemptsCount: number;
}

export interface Progress {
  id: string;
  studentId: string;
  shapeId: ShapeType;
  lessonProgress: Record<string, LessonProgressSummary>;
  exercisesCompleted: string[];
  masteryLevel: number; // 0 to 100
  accuracyRate: number; // percentage
  totalTimeSpentMinutes: number;
  lastActiveAt: string;
}

// ==========================================
// 6. Gamification: Achievements, Badges, Challenges
// ==========================================

export type AchievementCategory = 'theory' | 'practice' | 'explore' | 'streak' | 'mastery';

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  category: AchievementCategory;
  icon: string;
  xpReward: number;
  badgeId: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: string;
  criteriaDescription: string;
}

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'diamond' | 'master';

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  tier: BadgeTier;
  shapeTheme?: ShapeType | 'general';
  criteria: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Challenge {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  shapeId: ShapeType | 'all';
  difficulty: 'medium' | 'hard' | 'olympiad';
  timeLimitSeconds: number;
  rewardXp: number;
  exercises: Exercise[];
  badgeRewardId?: string;
  deadline?: string;
  isCompleted?: boolean;
  highScore?: number;
}

// ==========================================
// 7. Real World Problems & Mathematical Modeling
// ==========================================

export interface RealWorldStep {
  step: number;
  title: string;
  text: string;
  latex?: string;
  note?: string;
}

export interface RealWorldProblem {
  id: string;
  shapeId: ShapeType;
  title: string;
  subtitle: string;
  category: string; // e.g. "Văn hóa Việt Nam", "Kỹ thuật hàng không", "Kiến trúc hiện đại"
  description: string;
  imagePlaceholder: string;
  practicalSignificance: string;
  mathProblem: {
    statement: string;
    given: string[];
    solutionSteps: RealWorldStep[];
    result: string;
    practicalInsight: string;
  };
}

// ==========================================
// 8. AI Conversation & Tutoring
// ==========================================

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  latex?: string;
  timestamp: string;
  suggestedFollowUps?: string[];
  relatedFormulaId?: string;
  identifiedErrorType?: string;
}

export interface AIConversation {
  id: string;
  studentId: string;
  title: string;
  createdAt: string;
  messages: AIMessage[];
  contextShape?: ShapeType;
  contextLessonId?: string;
}

// ==========================================
// 9. Student Error Diagnosis & Misconceptions
// ==========================================

export type StudentErrorType =
  | 'formula_confusion' // Nhầm giữa công thức trụ và nón hoặc diện tích xung quanh với thể tích
  | 'unit_mismatch' // Quên đổi đơn vị dm -> cm, m -> cm
  | 'calculation_mistake' // Tính sai số học hoặc bình phương
  | 'conceptual_misunderstanding' // Không phân biệt được đường sinh l và chiều cao h
  | 'variable_mixup'; // Nhầm bán kính r và đường kính d = 2r

export interface StudentError {
  id: string;
  studentId: string;
  exerciseId: string;
  shapeId: ShapeType;
  errorType: StudentErrorType;
  title: string;
  description: string;
  wrongAnswer: string;
  correctAnswer: string;
  remedialExplanation: string;
  remedialFormulaLatex?: string;
  suggestedAction: string;
  occurredAt: string;
}

// ==========================================
// 10. Teacher Dashboard, Classes & Assignments
// ==========================================

export interface SchoolClass {
  id: string;
  name: string; // e.g. "Lớp 9A2"
  className?: string; // alias for name, e.g. "Lớp 9A2"
  grade: number; // 9
  schoolYear: string; // "2025 - 2026"
  studentCount: number;
  totalStudents?: number; // alias for studentCount
  students?: any[];
  classCode: string; // e.g. "TOAN9-A2"
  averageScore: number; // 0 to 10
  completionRate: number; // percentage 0 to 100
  teacherId: string;
  teacherName: string;
  schedule?: string;
  room?: string;
  description?: string;
  createdAt: string;
}

export type Class = SchoolClass;

export interface Assignment {
  id: string;
  assignmentId?: string; // alias
  title: string;
  description: string;
  instruction?: string; // alias
  shapeId: ShapeType | 'all' | 'mixed';
  targetClassId: string;
  classId?: string; // alias
  targetClassName: string;
  teacherId: string;
  teacherName: string;
  dueDate: string;
  rewardXp: number;
  xp?: number; // alias
  exerciseIds: string[];
  questionIds?: string[]; // alias
  sourceMode?: 'SOURCE_ONLY' | 'VARIANT_ONLY' | 'BOTH';
  totalQuestions: number;
  totalPoints?: number;
  status: 'published' | 'draft' | 'closed';
  selectionMode?: 'manual' | 'random';
  randomSeed?: number;
  gradingPolicy?: string;
  createdAt: string;
  submissionsCount?: number;
  averageScore?: number;
}


export interface LearningEvent {
  id: string;
  questionId: string;
  assignmentId?: string;
  studentId: string;
  answer: any;
  correct: boolean;
  attemptCount: number;
  errorType?: string;
  timeSpent: number; // in seconds
  hintUsed: boolean;
  solutionViewed: boolean;
  timestamp: string;
}

export interface SubmissionAnswer {
  exerciseId: string;
  exerciseTitle: string;
  questionText: string;
  studentAnswer: any;
  correctAnswer: any;
  isCorrect: boolean;
  scoreAwarded: number;
  errorType?: StudentErrorType | string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  studentId: string;
  studentName: string;
  className: string;
  submittedAt: string;
  score: number; // Scale 0-10
  totalQuestions: number;
  correctCount: number;
  timeSpentMinutes: number;
  answers: SubmissionAnswer[];
  teacherFeedback?: string;
  status: 'graded' | 'pending';
}

export interface TeacherClassReport {
  classId: string;
  className: string;
  totalStudents: number;
  activeStudents: number;
  averageAccuracy: number;
  averageScore: number;
  theoriesCompletedPercent: number;
  exercisesCompletedCount: number;
  shapesMastery: {
    shapeId: ShapeType;
    shapeName: string;
    masteryPercent: number;
    commonErrorCount: number;
  }[];
  topWeaknesses: {
    errorType: string;
    title: string;
    affectedStudentsCount: number;
    recommendation: string;
  }[];
  topStudents: {
    studentId: string;
    studentName: string;
    xp: number;
    score: number;
    streakDays: number;
  }[];
}
