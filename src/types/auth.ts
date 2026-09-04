/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - AUTHENTICATION & ACCOUNT TYPES
 */

import { UserRole } from './dataArchitecture';

export type AuthStatus = 'AUTH_LOADING' | 'AUTHENTICATED' | 'UNAUTHENTICATED';
export type AccountStatus = 'PENDING' | 'ACTIVE' | 'LOCKED' | 'DISABLED';
export type ViewMode = 'teacher' | 'student-preview';
export type { UserRole };

export type Permission =
  | 'VIEW_STUDENT_CONTENT'
  | 'SOLVE_EXERCISES'
  | 'USE_AI_TUTOR'
  | 'VIEW_OWN_PROFILE'
  | 'VIEW_TEACHER_DASHBOARD'
  | 'MANAGE_STUDENTS'
  | 'MANAGE_CLASSES'
  | 'MANAGE_ASSIGNMENTS'
  | 'MANAGE_VIDEOS'
  | 'MANAGE_TEACHER_SETTINGS'
  | 'RESET_STUDENT_PASSWORD';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  student: [
    'VIEW_STUDENT_CONTENT',
    'SOLVE_EXERCISES',
    'USE_AI_TUTOR',
    'VIEW_OWN_PROFILE'
  ],
  teacher: [
    'VIEW_STUDENT_CONTENT',
    'SOLVE_EXERCISES',
    'USE_AI_TUTOR',
    'VIEW_OWN_PROFILE',
    'VIEW_TEACHER_DASHBOARD',
    'MANAGE_STUDENTS',
    'MANAGE_CLASSES',
    'MANAGE_ASSIGNMENTS',
    'MANAGE_VIDEOS',
    'MANAGE_TEACHER_SETTINGS',
    'RESET_STUDENT_PASSWORD'
  ],
  admin: [
    'VIEW_STUDENT_CONTENT',
    'SOLVE_EXERCISES',
    'USE_AI_TUTOR',
    'VIEW_OWN_PROFILE',
    'VIEW_TEACHER_DASHBOARD',
    'MANAGE_STUDENTS',
    'MANAGE_CLASSES',
    'MANAGE_ASSIGNMENTS',
    'MANAGE_VIDEOS',
    'MANAGE_TEACHER_SETTINGS',
    'RESET_STUDENT_PASSWORD'
  ]
};

export interface ShapeProgress {
  cylinder: number;     // e.g. 92%
  cone: number;         // e.g. 76%
  sphere: number;       // e.g. 84%
  net: number;          // Khai triển e.g. 65%
  crossSection: number; // Mặt cắt e.g. 58%
}

export interface StudentAccount {
  id: string;
  username: string;
  password?: string;
  passwordHash?: string;
  fullName: string;
  className: string;
  classId?: string;
  school: string;
  status: AccountStatus;
  createdAt: string;
  lastActiveAt: string;
  firstLoginAt?: string | null;
  loginCount?: number;
  requirePasswordChange?: boolean;
  role: 'student';
  progress: ShapeProgress;
  xp: number;
  level: number;
  streakDays: number;
  wrongCount: number;
  hintsUsed: number;
  learningEventsCount: number;
  studyTimeMinutes: number;
  targetExamScore?: number;
  accuracyRate?: number;
  teacherId?: string;
}

export interface StudentAuditLog {
  id: string;
  teacherId: string;
  teacherName?: string;
  studentId: string;
  studentName: string;
  action:
    | 'CREATE_STUDENT_ACCOUNT'
    | 'CHANGE_STUDENT_PASSWORD'
    | 'RESET_STUDENT_PASSWORD'
    | 'LOCK_STUDENT'
    | 'UNLOCK_STUDENT'
    | 'DISABLE_STUDENT'
    | 'MOVE_STUDENT_CLASS'
    | 'BULK_CREATE_STUDENTS';
  timestamp: string;
  details?: string;
}

export interface StudentCredentialCardItem {
  id: string;
  fullName: string;
  className: string;
  school: string;
  username: string;
  temporaryPassword?: string;
  createdAt: string;
}

export interface TeacherAccount {
  id: string;
  username: string;
  email?: string;
  fullName: string;
  title: string;
  school: string;
  role: 'teacher';
  status: 'ACTIVE';
}

export type AuthUser = StudentAccount | TeacherAccount;

export interface SessionState<T> {
  status: AuthStatus;
  user: T | null;
  isAuthenticated: boolean;
}

export type StudentSession = SessionState<StudentAccount>;
export type TeacherSession = SessionState<TeacherAccount>;

export interface AuthState {
  studentSession: StudentSession;
  teacherSession: TeacherSession;
  authReady: boolean;
  status?: AuthStatus;
  user?: AuthUser | null;
  role?: UserRole | null;
  requirePasswordChange?: boolean;
}
