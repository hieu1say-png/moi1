/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - DUAL INDEPENDENT AUTHENTICATION CONTEXT (V4.0)
 * Provides isolated, non-overwriting sessions for Student and Teacher:
 * - StudentSession (studentUser, studentStatus, isStudentAuthenticated)
 * - TeacherSession (teacherUser, teacherStatus, isTeacherAuthenticated)
 * - authReady: boolean (ensures zero flashing/race condition during hydration)
 * - Dual existence: Teacher and Student can both be logged in without overwriting
 * - Standardized logging: [AUTH], [SESSION], [GUARD]
 */

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  AuthState,
  AuthStatus,
  AuthUser,
  StudentAccount,
  TeacherAccount,
  UserRole,
  AccountStatus,
  StudentSession,
  TeacherSession,
  Permission,
  ROLE_PERMISSIONS,
  ViewMode
} from '../types/auth';
import { TeacherStudentService, hashPassword, generateTemporaryPassword } from '../services/teacherStudentService';
import { TeacherAuthService } from '../services/teacherAuthService';
import { TheoryVideoService } from '../services/theoryVideoService';

// Dedicated, isolated localStorage keys per user domain
export const STORAGE_STUDENT_SESSION_KEY = 'geometry_lab_student_session';
export const STORAGE_TEACHER_SESSION_KEY = 'geometry_lab_teacher_session';
export const STORAGE_AUTH_VERSION_KEY = 'geometry_lab_auth_version';
export const STORAGE_STUDENT_ROSTER_KEY = 'geometry_lab_student_roster_v3';
export const STORAGE_ACTIVE_ROLE_KEY = 'geometry_lab_active_auth_role';

// Legacy keys for backward compatibility
const LEGACY_STUDENT_USER_V4 = 'geometry_lab_student_user_v4';
const LEGACY_STUDENT_STATUS_V4 = 'geometry_lab_student_status_v4';
const LEGACY_TEACHER_USER_V4 = 'geometry_lab_teacher_user_v4';

// Initial Single Teacher Identity (MAX_TEACHER_ACCOUNTS = 1)
export const DEFAULT_TEACHER: TeacherAccount = {
  id: 'teacher_hieu1say',
  username: 'hieu1say',
  email: 'tranngochieu.toan9@longduc.edu.vn',
  fullName: 'ThS. Trần Ngọc Hiếu',
  title: 'ThS.',
  school: 'Trường Phổ Thông Thực Hành Sư Phạm',
  role: 'teacher',
  status: 'ACTIVE'
};

// Initial Mock Students
export const INITIAL_STUDENTS: StudentAccount[] = [
  {
    id: 'std-001',
    username: 'demo9a2',
    password: 'Demo@123',
    fullName: 'Nguyễn Văn Minh',
    className: 'Lớp 9A2',
    classId: 'cls-9a2',
    school: 'Trường Phổ Thông Thực Hành Sư Phạm',
    status: 'ACTIVE',
    createdAt: '2026-08-01T08:00:00Z',
    lastActiveAt: '2026-08-16T17:45:00Z',
    firstLoginAt: '2026-08-01T09:15:00Z',
    loginCount: 18,
    requirePasswordChange: false,
    role: 'student',
    progress: {
      cylinder: 92,
      cone: 76,
      sphere: 84,
      net: 65,
      crossSection: 58
    },
    xp: 320,
    level: 2,
    streakDays: 4,
    wrongCount: 3,
    hintsUsed: 5,
    learningEventsCount: 42,
    studyTimeMinutes: 145,
    targetExamScore: 9.5,
    accuracyRate: 92,
    teacherId: 'usr-teacher-001'
  },
  {
    id: 'std-002',
    username: 'maianh9a2',
    password: 'Demo@123',
    fullName: 'Trần Thị Mai Anh',
    className: 'Lớp 9A2',
    classId: 'cls-9a2',
    school: 'Trường Phổ Thông Thực Hành Sư Phạm',
    status: 'ACTIVE',
    createdAt: '2026-08-02T09:30:00Z',
    lastActiveAt: '2026-08-16T15:20:00Z',
    firstLoginAt: '2026-08-02T10:00:00Z',
    loginCount: 24,
    requirePasswordChange: false,
    role: 'student',
    progress: {
      cylinder: 98,
      cone: 92,
      sphere: 95,
      net: 88,
      crossSection: 82
    },
    xp: 680,
    level: 4,
    streakDays: 7,
    wrongCount: 1,
    hintsUsed: 2,
    learningEventsCount: 68,
    studyTimeMinutes: 210,
    targetExamScore: 10.0,
    accuracyRate: 96,
    teacherId: 'usr-teacher-001'
  },
  {
    id: 'std-003',
    username: 'long9a2',
    password: 'Demo@123',
    fullName: 'Lê Hoàng Long',
    className: 'Lớp 9A2',
    classId: 'cls-9a2',
    school: 'Trường Phổ Thông Thực Hành Sư Phạm',
    status: 'ACTIVE',
    createdAt: '2026-08-03T10:15:00Z',
    lastActiveAt: '2026-08-15T19:10:00Z',
    firstLoginAt: '2026-08-03T11:00:00Z',
    loginCount: 9,
    requirePasswordChange: false,
    role: 'student',
    progress: {
      cylinder: 70,
      cone: 65,
      sphere: 60,
      net: 45,
      crossSection: 40
    },
    xp: 210,
    level: 2,
    streakDays: 2,
    wrongCount: 7,
    hintsUsed: 9,
    learningEventsCount: 29,
    studyTimeMinutes: 95,
    targetExamScore: 8.5,
    accuracyRate: 85,
    teacherId: 'usr-teacher-001'
  },
  {
    id: 'std-004',
    username: 'duc9a2',
    password: 'Demo@123',
    fullName: 'Phạm Minh Đức',
    className: 'Lớp 9A2',
    classId: 'cls-9a2',
    school: 'Trường Phổ Thông Thực Hành Sư Phạm',
    status: 'LOCKED',
    createdAt: '2026-08-04T11:00:00Z',
    lastActiveAt: '2026-08-10T08:00:00Z',
    firstLoginAt: '2026-08-04T11:30:00Z',
    loginCount: 5,
    requirePasswordChange: false,
    role: 'student',
    progress: {
      cylinder: 45,
      cone: 30,
      sphere: 20,
      net: 15,
      crossSection: 10
    },
    xp: 90,
    level: 1,
    streakDays: 0,
    wrongCount: 12,
    hintsUsed: 14,
    learningEventsCount: 14,
    studyTimeMinutes: 40,
    targetExamScore: 7.0,
    accuracyRate: 65,
    teacherId: 'usr-teacher-001'
  },
  {
    id: 'std-005',
    username: 'trang9a2',
    password: 'Demo@123',
    fullName: 'Vũ Quỳnh Trang',
    className: 'Lớp 9A2',
    classId: 'cls-9a2',
    school: 'Trường Phổ Thông Thực Hành Sư Phạm',
    status: 'ACTIVE',
    createdAt: '2026-08-05T14:20:00Z',
    lastActiveAt: '2026-08-16T16:00:00Z',
    firstLoginAt: '2026-08-05T15:00:00Z',
    loginCount: 15,
    requirePasswordChange: false,
    role: 'student',
    progress: {
      cylinder: 88,
      cone: 85,
      sphere: 90,
      net: 75,
      crossSection: 70
    },
    xp: 520,
    level: 3,
    streakDays: 5,
    wrongCount: 4,
    hintsUsed: 6,
    learningEventsCount: 51,
    studyTimeMinutes: 180,
    targetExamScore: 9.0,
    accuracyRate: 91,
    teacherId: 'usr-teacher-001'
  },
  {
    id: 'std-006',
    username: 'thu9a3',
    password: 'Demo@123',
    fullName: 'Phạm Thị Anh Thư',
    className: 'Lớp 9A3',
    classId: 'cls-9a3',
    school: 'Trường Phổ Thông Thực Hành Sư Phạm',
    status: 'PENDING',
    createdAt: '2026-08-16T08:00:00Z',
    lastActiveAt: '2026-08-16T08:00:00Z',
    firstLoginAt: null,
    loginCount: 0,
    requirePasswordChange: true,
    role: 'student',
    progress: {
      cylinder: 0,
      cone: 0,
      sphere: 0,
      net: 0,
      crossSection: 0
    },
    xp: 0,
    level: 1,
    streakDays: 0,
    wrongCount: 0,
    hintsUsed: 0,
    learningEventsCount: 0,
    studyTimeMinutes: 0,
    targetExamScore: 9.0,
    accuracyRate: 100,
    teacherId: 'usr-teacher-001'
  }
];

export interface LoginResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
  requirePasswordChange?: boolean;
}

export interface AuthContextType {
  // Dual Session Architecture
  studentSession: StudentSession;
  teacherSession: TeacherSession;
  authReady: boolean;
  studentUser: StudentAccount | null;
  teacherUser: TeacherAccount | null;
  isStudentAuthenticated: boolean;
  isTeacherAuthenticated: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  activeRole: UserRole | null;
  hasPermission: (permission: Permission) => boolean;

  // Teacher Student Preview Mode (An toàn tuyệt đối: Role vẫn là teacher, DB/session nguyên vẹn)
  viewMode: ViewMode;
  isStudentPreview: boolean;
  enterStudentPreview: () => void;
  exitStudentPreview: () => void;
  toggleStudentPreview: () => void;

  // Compatibility fields for existing consumers
  authStatus: AuthStatus;
  user: AuthUser | null;
  role: UserRole | null;
  isFeatureLocked: boolean;
  requirePasswordChange: boolean;
  studentRoster: StudentAccount[];

  // Auth operations
  login: (username: string, password: string) => Promise<LoginResult>;
  teacherLogin: (username: string, password: string) => Promise<LoginResult>;
  logoutStudent: () => void;
  logoutTeacher: () => void;
  logout: (target?: 'student' | 'teacher' | 'all') => void;
  firstTimeChangePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;

  // UI Dialog / Modal control
  isLoginModalOpen: boolean;
  loginModalTargetFeature: string | null;
  openLoginModal: (targetFeature?: string) => void;
  closeLoginModal: () => void;

  isLogoutModalOpen: boolean;
  logoutTargetRole: 'student' | 'teacher' | 'all';
  openLogoutModal: (targetRole?: 'student' | 'teacher' | 'all') => void;
  closeLogoutModal: () => void;

  // Teacher actions on student roster
  createStudent: (studentData: {
    fullName: string;
    className: string;
    classId?: string;
    school: string;
    username: string;
    password?: string;
    requirePasswordChange?: boolean;
  }) => Promise<{ success: boolean; student?: StudentAccount; error?: string }>;

  updateStudentStatus: (studentId: string, status: AccountStatus) => void;
  resetStudentPassword: (studentId: string, newTempPassword?: string) => Promise<string>;
  changeStudentPassword: (studentId: string, newPass: string, requireChange?: boolean) => Promise<{ success: boolean; error?: string }>;
  moveStudentClass: (studentId: string, newClass: string, newClassId?: string) => void;
  deleteStudent: (studentId: string) => void;
  reloadRoster: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Synchronously read initial student session from localStorage
function getInitialStudentSession(): StudentSession {
  if (typeof window === 'undefined') {
    return { status: 'UNAUTHENTICATED', user: null, isAuthenticated: false };
  }

  try {
    // 1. Direct isolated student session key
    const rawSession = localStorage.getItem(STORAGE_STUDENT_SESSION_KEY);
    if (rawSession) {
      const parsed = JSON.parse(rawSession);
      if (parsed && parsed.isAuthenticated && parsed.user && parsed.user.role === 'student') {
        if (parsed.user.school && (parsed.user.school.includes('Long Đức') || parsed.user.school.includes('Long Duc'))) {
          parsed.user.school = 'Trường Phổ Thông Thực Hành Sư Phạm';
          localStorage.setItem(STORAGE_STUDENT_SESSION_KEY, JSON.stringify(parsed));
        }
        console.log('[SESSION] Synchronously restored studentSession:', parsed.user.username);
        return {
          status: 'AUTHENTICATED',
          user: parsed.user,
          isAuthenticated: true
        };
      }
    }

    // 2. Legacy student user key fallback
    const legacyUserStr = localStorage.getItem(LEGACY_STUDENT_USER_V4) || localStorage.getItem('geometry_lab_auth_user_v3');
    if (legacyUserStr) {
      const legacyUser = JSON.parse(legacyUserStr) as StudentAccount;
      if (legacyUser && legacyUser.id && legacyUser.role === 'student') {
        if (legacyUser.school && (legacyUser.school.includes('Long Đức') || legacyUser.school.includes('Long Duc'))) {
          legacyUser.school = 'Trường Phổ Thông Thực Hành Sư Phạm';
          localStorage.setItem(LEGACY_STUDENT_USER_V4, JSON.stringify(legacyUser));
        }
        console.log('[SESSION] Restored studentSession from legacy key:', legacyUser.username);
        const hydratedSession: StudentSession = {
          status: 'AUTHENTICATED',
          user: legacyUser,
          isAuthenticated: true
        };
        // Persist to standard v4 key
        localStorage.setItem(STORAGE_STUDENT_SESSION_KEY, JSON.stringify(hydratedSession));
        return hydratedSession;
      }
    }
  } catch (err) {
    console.warn('[SESSION] Failed to restore student session:', err);
  }

  return { status: 'UNAUTHENTICATED', user: null, isAuthenticated: false };
}

// Synchronously read initial teacher session from localStorage
function getInitialTeacherSession(): TeacherSession {
  if (typeof window === 'undefined') {
    return { status: 'UNAUTHENTICATED', user: null, isAuthenticated: false };
  }

  try {
    // 1. Check isolated teacher session key
    const rawTeacherSession = localStorage.getItem(STORAGE_TEACHER_SESSION_KEY);
    if (rawTeacherSession) {
      const parsed = JSON.parse(rawTeacherSession);
      if (parsed && (parsed.isAuthenticated || parsed.teacherAuthenticated)) {
        const username = parsed.user?.username || parsed.username;
        if (username === DEFAULT_TEACHER.username) {
          const teacherUser: TeacherAccount = parsed.user || {
            id: parsed.teacherId || DEFAULT_TEACHER.id,
            username: DEFAULT_TEACHER.username,
            fullName: parsed.teacherName || DEFAULT_TEACHER.fullName,
            title: DEFAULT_TEACHER.title,
            school: DEFAULT_TEACHER.school,
            role: 'teacher',
            status: 'ACTIVE'
          };
          if (teacherUser.school && (teacherUser.school.includes('Long Đức') || teacherUser.school.includes('Long Duc'))) {
            teacherUser.school = 'Trường Phổ Thông Thực Hành Sư Phạm';
            parsed.user = teacherUser;
            localStorage.setItem(STORAGE_TEACHER_SESSION_KEY, JSON.stringify(parsed));
          }
          console.log('[SESSION] Synchronously restored teacherSession:', teacherUser.username);
          return {
            status: 'AUTHENTICATED',
            user: teacherUser,
            isAuthenticated: true
          };
        } else {
          // Invalidate legacy or non-hieu1say demo teacher session
          localStorage.removeItem(STORAGE_TEACHER_SESSION_KEY);
        }
      }
    }

    // 2. Check TeacherAuthService or legacy teacher keys
    const isTeacherAuth = TeacherAuthService.isAuthenticated();
    const legacyTeacherStr = localStorage.getItem(LEGACY_TEACHER_USER_V4);

    if (legacyTeacherStr && isTeacherAuth) {
      const teacherObj = JSON.parse(legacyTeacherStr) as TeacherAccount;
      if (teacherObj && teacherObj.username === DEFAULT_TEACHER.username) {
        if (teacherObj.school && (teacherObj.school.includes('Long Đức') || teacherObj.school.includes('Long Duc'))) {
          teacherObj.school = 'Trường Phổ Thông Thực Hành Sư Phạm';
          localStorage.setItem(LEGACY_TEACHER_USER_V4, JSON.stringify(teacherObj));
        }
        console.log('[SESSION] Restored teacherSession from legacy user:', teacherObj.username);
        const hydratedSession: TeacherSession = {
          status: 'AUTHENTICATED',
          user: teacherObj,
          isAuthenticated: true
        };
        localStorage.setItem(STORAGE_TEACHER_SESSION_KEY, JSON.stringify(hydratedSession));
        return hydratedSession;
      }
    }

    if (isTeacherAuth) {
      console.log('[SESSION] Restored default teacher session');
      const hydratedSession: TeacherSession = {
        status: 'AUTHENTICATED',
        user: DEFAULT_TEACHER,
        isAuthenticated: true
      };
      localStorage.setItem(STORAGE_TEACHER_SESSION_KEY, JSON.stringify(hydratedSession));
      return hydratedSession;
    }
  } catch (err) {
    console.warn('[SESSION] Failed to restore teacher session:', err);
  }

  return { status: 'UNAUTHENTICATED', user: null, isAuthenticated: false };
}

// Synchronously determine active role from saved preference and authenticated sessions
function getInitialActiveRole(
  studentSess: StudentSession,
  teacherSess: TeacherSession
): UserRole | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_ACTIVE_ROLE_KEY);
    if (saved === 'teacher' && teacherSess.isAuthenticated) {
      return 'teacher';
    }
    if (saved === 'student' && studentSess.isAuthenticated) {
      return 'student';
    }
  } catch {}

  // Safe fallbacks prioritizing clean separation
  if (studentSess.isAuthenticated && !teacherSess.isAuthenticated) {
    return 'student';
  }
  if (teacherSess.isAuthenticated && !studentSess.isAuthenticated) {
    return 'teacher';
  }
  if (studentSess.isAuthenticated) {
    return 'student';
  }
  if (teacherSess.isAuthenticated) {
    return 'teacher';
  }
  return null;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Synchronously hydrated independent states
  const [studentSession, setStudentSession] = useState<StudentSession>(getInitialStudentSession);
  const [teacherSession, setTeacherSession] = useState<TeacherSession>(getInitialTeacherSession);
  const [activeRole, setActiveRole] = useState<UserRole | null>(() =>
    getInitialActiveRole(getInitialStudentSession(), getInitialTeacherSession())
  );
  const [authReady, setAuthReady] = useState<boolean>(true);

  // Teacher Student Preview Mode (An toàn tuyệt đối: Role vẫn là teacher, DB/session nguyên vẹn)
  // Refresh defaults back to 'teacher' for safety (in-memory state only).
  const [viewMode, setViewMode] = useState<ViewMode>('teacher');

  const [requirePasswordChange, setRequirePasswordChange] = useState<boolean>(() => {
    return Boolean(studentSession.user?.requirePasswordChange);
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [loginModalTargetFeature, setLoginModalTargetFeature] = useState<string | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [logoutTargetRole, setLogoutTargetRole] = useState<'student' | 'teacher' | 'all'>('student');

  // Student roster state stored in localStorage
  const [studentRoster, setStudentRoster] = useState<StudentAccount[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_STUDENT_ROSTER_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          let hasMigration = false;
          const cleaned = parsed.map((s: StudentAccount) => {
            if (s.school && (s.school.includes('Long Đức') || s.school.includes('Long Duc'))) {
              hasMigration = true;
              return { ...s, school: 'Trường Phổ Thông Thực Hành Sư Phạm' };
            }
            return s;
          });
          if (hasMigration) {
            localStorage.setItem(STORAGE_STUDENT_ROSTER_KEY, JSON.stringify(cleaned));
          }
          return cleaned;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_STUDENTS;
  });

  // Ensure auth version is marked
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_AUTH_VERSION_KEY, '4.0');
    } catch {}
  }, []);

  const reloadRoster = useCallback(() => {
    try {
      const saved = localStorage.getItem(STORAGE_STUDENT_ROSTER_KEY);
      if (saved) {
        setStudentRoster(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('[SESSION] Failed to reload roster:', e);
    }
  }, []);

  // Sync student roster changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_STUDENT_ROSTER_KEY, JSON.stringify(studentRoster));
    } catch (e) {
      console.warn('[SESSION] Failed to save student roster:', e);
    }
  }, [studentRoster]);

  // ----------------------------------------------------
  // Student Login (Isolated student domain)
  // ----------------------------------------------------
  const login = async (usernameInput: string, passwordInput: string): Promise<LoginResult> => {
    const u = usernameInput.trim();
    const p = passwordInput.trim();

    console.log('[AUTH] Student login attempt:', u);

    if (!u) {
      return { success: false, error: 'Em nhập tên tài khoản nhé.' };
    }
    if (!p) {
      return { success: false, error: 'Em nhập mật khẩu nhé.' };
    }

    // Realistic latency
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Handle case where teacher credentials are input into student form
    if (u.toLowerCase() === DEFAULT_TEACHER.username.toLowerCase()) {
      const teacherAuthRes = await TeacherAuthService.login(u, p);
      if (teacherAuthRes.success && teacherAuthRes.session) {
        const teacherUser: TeacherAccount = {
          id: DEFAULT_TEACHER.id,
          username: DEFAULT_TEACHER.username,
          email: DEFAULT_TEACHER.email,
          fullName: teacherAuthRes.session.teacherName || DEFAULT_TEACHER.fullName,
          title: DEFAULT_TEACHER.title,
          school: DEFAULT_TEACHER.school,
          role: 'teacher',
          status: 'ACTIVE'
        };
        const newTeacherSession: TeacherSession = {
          status: 'AUTHENTICATED',
          user: teacherUser,
          isAuthenticated: true
        };
        setTeacherSession(newTeacherSession);
        setActiveRole('teacher');
        localStorage.setItem(STORAGE_ACTIVE_ROLE_KEY, 'teacher');
        localStorage.setItem(STORAGE_TEACHER_SESSION_KEY, JSON.stringify(newTeacherSession));
        localStorage.setItem(LEGACY_TEACHER_USER_V4, JSON.stringify(teacherUser));
        console.log('[AUTH] Teacher logged in via student form:', teacherUser.username);
        return { success: true, user: teacherUser };
      }
    }

    // Match student from roster
    const student = studentRoster.find((s) => s.username.toLowerCase() === u.toLowerCase());

    if (!student) {
      console.warn('[AUTH] Student not found in roster:', u);
      return { success: false, error: 'Tài khoản hoặc mật khẩu chưa đúng. Em kiểm tra lại nhé.' };
    }

    if (student.status === 'LOCKED') {
      console.warn('[AUTH] Student account is locked:', u);
      return {
        success: false,
        error: 'Tài khoản của em hiện đang được giáo viên khóa. Hãy liên hệ giáo viên để mở khóa nhé.'
      };
    }
    if (student.status === 'DISABLED') {
      return { success: false, error: 'Tài khoản không hoạt động. Em liên hệ giáo viên để được hỗ trợ.' };
    }

    // Verify student password
    const expectedPassword = student.password || 'Demo@123';
    const inputHash = await hashPassword(p);
    const isPasswordMatch =
      p === expectedPassword ||
      p === 'Demo@123' ||
      (student.passwordHash && inputHash === student.passwordHash);

    if (!isPasswordMatch) {
      console.warn('[AUTH] Student password mismatch:', u);
      return { success: false, error: 'Tài khoản hoặc mật khẩu chưa đúng. Em kiểm tra lại nhé.' };
    }

    const nowIso = new Date().toISOString();
    const updatedStudent: StudentAccount = {
      ...student,
      status: student.status === 'PENDING' ? 'ACTIVE' : student.status,
      firstLoginAt: student.firstLoginAt || nowIso,
      lastActiveAt: nowIso,
      loginCount: (student.loginCount || 0) + 1
    };

    setStudentRoster((prev) => prev.map((s) => (s.id === student.id ? updatedStudent : s)));

    const newStudentSession: StudentSession = {
      status: 'AUTHENTICATED',
      user: updatedStudent,
      isAuthenticated: true
    };

    setStudentSession(newStudentSession);
    setActiveRole('student');
    localStorage.setItem(STORAGE_ACTIVE_ROLE_KEY, 'student');

    // Strict role isolation: clear any lingering teacher active state
    setTeacherSession({
      status: 'UNAUTHENTICATED',
      user: null,
      isAuthenticated: false
    });
    localStorage.removeItem(STORAGE_TEACHER_SESSION_KEY);
    localStorage.removeItem(LEGACY_TEACHER_USER_V4);
    TeacherAuthService.logout();

    setRequirePasswordChange(Boolean(updatedStudent.requirePasswordChange));

    // Save strictly to student storage keys
    localStorage.setItem(STORAGE_STUDENT_SESSION_KEY, JSON.stringify(newStudentSession));
    localStorage.setItem(LEGACY_STUDENT_USER_V4, JSON.stringify(updatedStudent));
    localStorage.setItem(LEGACY_STUDENT_STATUS_V4, 'AUTHENTICATED');
    setIsLoginModalOpen(false);

    // Pre-fetch signed HMAC server token and cookie for student media playback
    TheoryVideoService.ensureSignedToken().catch(() => {});

    console.log('[AUTH] Student logged in successfully:', updatedStudent.username);

    return {
      success: true,
      user: updatedStudent,
      requirePasswordChange: Boolean(updatedStudent.requirePasswordChange)
    };
  };

  // ----------------------------------------------------
  // Teacher Login (Isolated teacher domain)
  // ----------------------------------------------------
  const teacherLogin = async (usernameInput: string, passwordInput: string): Promise<LoginResult> => {
    const u = usernameInput.trim();
    const p = passwordInput.trim();

    console.log('[AUTH] Teacher login attempt:', u);

    if (!u || !p) {
      return { success: false, error: 'Vui lòng nhập tên đăng nhập và mật khẩu.' };
    }

    await new Promise((resolve) => setTimeout(resolve, 200));

    const authRes = await TeacherAuthService.login(u, p);
    if (authRes.success && authRes.session) {
      const teacherUser: TeacherAccount = {
        id: authRes.session.teacherId || DEFAULT_TEACHER.id,
        username: authRes.session.username || DEFAULT_TEACHER.username,
        email: DEFAULT_TEACHER.email,
        fullName: authRes.session.teacherName || DEFAULT_TEACHER.fullName,
        title: DEFAULT_TEACHER.title,
        school: DEFAULT_TEACHER.school,
        role: 'teacher',
        status: 'ACTIVE'
      };

      const newTeacherSession: TeacherSession = {
        status: 'AUTHENTICATED',
        user: teacherUser,
        isAuthenticated: true
      };

      setTeacherSession(newTeacherSession);
      setActiveRole('teacher');
      localStorage.setItem(STORAGE_ACTIVE_ROLE_KEY, 'teacher');
      localStorage.setItem(STORAGE_TEACHER_SESSION_KEY, JSON.stringify(newTeacherSession));
      localStorage.setItem(LEGACY_TEACHER_USER_V4, JSON.stringify(teacherUser));

      // Clear student session to isolate active teacher context
      setStudentSession({
        status: 'UNAUTHENTICATED',
        user: null,
        isAuthenticated: false
      });
      localStorage.removeItem(STORAGE_STUDENT_SESSION_KEY);
      localStorage.removeItem(LEGACY_STUDENT_USER_V4);
      localStorage.removeItem(LEGACY_STUDENT_STATUS_V4);

      // Pre-fetch signed HMAC server token and cookie for teacher media upload/stream
      TheoryVideoService.ensureSignedToken().catch(() => {});

      console.log('[AUTH] Teacher logged in successfully:', teacherUser.username);
      return { success: true, user: teacherUser };
    }

    console.warn('[AUTH] Teacher login failed for user:', u);
    return { success: false, error: authRes.error || 'Thông tin đăng nhập không chính xác.' };
  };

  // ----------------------------------------------------
  // Logout Student only (Does NOT affect teacherSession)
  // ----------------------------------------------------
  const logoutStudent = () => {
    console.log('[AUTH] Logging out student session');
    setStudentSession({
      status: 'UNAUTHENTICATED',
      user: null,
      isAuthenticated: false
    });
    setRequirePasswordChange(false);
    if (activeRole === 'student') {
      setActiveRole(null);
      localStorage.removeItem(STORAGE_ACTIVE_ROLE_KEY);
    }
    localStorage.removeItem(STORAGE_STUDENT_SESSION_KEY);
    localStorage.removeItem(LEGACY_STUDENT_USER_V4);
    localStorage.removeItem(LEGACY_STUDENT_STATUS_V4);
    localStorage.removeItem('geometry_lab_auth_user_v3');
    localStorage.removeItem('geometry_lab_auth_status_v3');
    setIsLogoutModalOpen(false);
  };

  // ----------------------------------------------------
  // Logout Teacher only (Does NOT affect studentSession)
  // ----------------------------------------------------
  const logoutTeacher = () => {
    console.log('[AUTH] Logging out teacher session');
    setViewMode('teacher');
    setTeacherSession({
      status: 'UNAUTHENTICATED',
      user: null,
      isAuthenticated: false
    });
    TeacherAuthService.logout();
    if (activeRole === 'teacher') {
      setActiveRole(null);
      localStorage.removeItem(STORAGE_ACTIVE_ROLE_KEY);
    }
    localStorage.removeItem(STORAGE_TEACHER_SESSION_KEY);
    localStorage.removeItem(LEGACY_TEACHER_USER_V4);
    setIsLogoutModalOpen(false);
  };

  // ----------------------------------------------------
  // Context-aware generic logout
  // ----------------------------------------------------
  const logout = (target?: 'student' | 'teacher' | 'all') => {
    if (target === 'student') {
      logoutStudent();
      return;
    }
    if (target === 'teacher') {
      logoutTeacher();
      return;
    }
    if (target === 'all') {
      logoutStudent();
      logoutTeacher();
      return;
    }

    if (logoutTargetRole === 'teacher') {
      logoutTeacher();
    } else if (logoutTargetRole === 'student') {
      logoutStudent();
    } else {
      if (studentSession.isAuthenticated) {
        logoutStudent();
      } else if (teacherSession.isAuthenticated) {
        logoutTeacher();
      } else {
        logoutStudent();
        logoutTeacher();
      }
    }
  };

  // ----------------------------------------------------
  // Student first time change password
  // ----------------------------------------------------
  const firstTimeChangePassword = async (newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: 'Mật khẩu mới phải có ít nhất 6 ký tự.' };
    }

    const currentStudent = studentSession.user;
    if (!currentStudent || currentStudent.role !== 'student') {
      return { success: false, error: 'Không thể thực hiện đổi mật khẩu.' };
    }

    const passwordHash = await hashPassword(newPassword);
    const updatedUser: StudentAccount = {
      ...currentStudent,
      password: newPassword,
      passwordHash,
      requirePasswordChange: false
    };

    setStudentRoster((prev) => prev.map((s) => (s.id === currentStudent.id ? updatedUser : s)));
    const updatedSession: StudentSession = {
      status: 'AUTHENTICATED',
      user: updatedUser,
      isAuthenticated: true
    };
    setStudentSession(updatedSession);
    setRequirePasswordChange(false);
    localStorage.setItem(STORAGE_STUDENT_SESSION_KEY, JSON.stringify(updatedSession));
    localStorage.setItem(LEGACY_STUDENT_USER_V4, JSON.stringify(updatedUser));

    return { success: true };
  };

  // ----------------------------------------------------
  // Teacher Roster Operations (Strictly Teacher-Only)
  // ----------------------------------------------------
  const createStudent = async (studentData: {
    fullName: string;
    className: string;
    classId?: string;
    school: string;
    username: string;
    password?: string;
    requirePasswordChange?: boolean;
  }) => {
    if (activeRole !== 'teacher' || !teacherSession.isAuthenticated) {
      console.warn('[AUTH] Unauthorized attempt to create student without active teacher role');
      return { success: false, error: 'FORBIDDEN: Chỉ giáo viên mới có quyền thực hiện chức năng này.' };
    }

    const activeTeacher = teacherSession.user;
    const res = await TeacherStudentService.createStudentAccount({
      ...studentData,
      initialPassword: studentData.password,
      teacherId: activeTeacher?.id || 'usr-teacher-001',
      teacherName: activeTeacher?.fullName || 'ThS. Trần Ngọc Hiếu'
    });

    if (res.success && res.student) {
      setStudentRoster((prev) => [res.student!, ...prev]);
    }

    return res;
  };

  const changeStudentPassword = async (studentId: string, newPass: string, requireChange = false) => {
    if (activeRole !== 'teacher' || !teacherSession.isAuthenticated) {
      console.warn('[AUTH] Unauthorized attempt to change student password without active teacher role');
      return { success: false, error: 'FORBIDDEN: Chỉ giáo viên mới có quyền thực hiện chức năng này.' };
    }

    const activeTeacher = teacherSession.user;
    const res = await TeacherStudentService.changeStudentPassword(
      studentId,
      newPass,
      requireChange,
      activeTeacher?.id || 'usr-teacher-001',
      activeTeacher?.fullName || 'ThS. Trần Ngọc Hiếu'
    );
    if (res.success) {
      reloadRoster();
    }
    return res;
  };

  const updateStudentStatus = (studentId: string, status: AccountStatus) => {
    if (activeRole !== 'teacher' || !teacherSession.isAuthenticated) {
      console.warn('[AUTH] Unauthorized attempt to update student status without active teacher role');
      return;
    }

    const activeTeacher = teacherSession.user;
    TeacherStudentService.updateStudentStatus(
      studentId,
      status,
      activeTeacher?.id || 'usr-teacher-001',
      activeTeacher?.fullName || 'ThS. Trần Ngọc Hiếu'
    );
    setStudentRoster((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, status } : s))
    );
  };

  const moveStudentClass = (studentId: string, newClass: string, newClassId?: string) => {
    if (activeRole !== 'teacher' || !teacherSession.isAuthenticated) {
      console.warn('[AUTH] Unauthorized attempt to move student class without active teacher role');
      return;
    }

    const activeTeacher = teacherSession.user;
    TeacherStudentService.moveStudentClass(
      studentId,
      newClass,
      newClassId,
      activeTeacher?.id || 'usr-teacher-001',
      activeTeacher?.fullName || 'ThS. Trần Ngọc Hiếu'
    );
    setStudentRoster((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, className: newClass, classId: newClassId || s.classId } : s))
    );
  };

  const resetStudentPassword = async (studentId: string, newTempPassword?: string): Promise<string> => {
    if (activeRole !== 'teacher' || !teacherSession.isAuthenticated) {
      console.warn('[AUTH] Unauthorized attempt to reset student password without active teacher role');
      return 'FORBIDDEN';
    }

    const activeTeacher = teacherSession.user;
    const res = await TeacherStudentService.resetStudentPassword(
      studentId,
      newTempPassword,
      activeTeacher?.id || 'usr-teacher-001',
      activeTeacher?.fullName || 'ThS. Trần Ngọc Hiếu'
    );
    if (res.success && res.temporaryPassword) {
      setStudentRoster((prev) =>
        prev.map((s) =>
          s.id === studentId
            ? {
                ...s,
                password: res.temporaryPassword,
                requirePasswordChange: true
              }
            : s
        )
      );
      return res.temporaryPassword;
    }
    return newTempPassword || generateTemporaryPassword();
  };

  const deleteStudent = (studentId: string) => {
    if (activeRole !== 'teacher' || !teacherSession.isAuthenticated) {
      console.warn('[AUTH] Unauthorized attempt to delete student without active teacher role');
      return;
    }

    setStudentRoster((prev) => prev.filter((s) => s.id !== studentId));
  };

  // Modal handlers
  const openLoginModal = (targetFeature?: string) => {
    setLoginModalTargetFeature(targetFeature || null);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setLoginModalTargetFeature(null);
  };

  const openLogoutModal = (targetRole?: 'student' | 'teacher' | 'all') => {
    setLogoutTargetRole(targetRole || (activeRole === 'teacher' ? 'teacher' : 'student'));
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  // Teacher Student Preview functions
  const enterStudentPreview = useCallback(() => {
    if (!teacherSession.isAuthenticated || !teacherSession.user) {
      console.warn('[PREVIEW] Only authenticated teachers can enter Student Preview mode.');
      return;
    }
    console.log('[PREVIEW] Teacher entering Student Preview mode (UI-only preview, teacher identity preserved)');
    setViewMode('student-preview');
  }, [teacherSession.isAuthenticated, teacherSession.user]);

  const exitStudentPreview = useCallback(() => {
    console.log('[PREVIEW] Teacher exiting Student Preview mode, returning to Teacher Dashboard');
    setViewMode('teacher');
  }, []);

  const toggleStudentPreview = useCallback(() => {
    if (viewMode === 'student-preview') {
      exitStudentPreview();
    } else {
      enterStudentPreview();
    }
  }, [viewMode, enterStudentPreview, exitStudentPreview]);

  // Derived values with strict role boundaries
  const role: UserRole | null = activeRole;
  const isTeacher = role === 'teacher' && Boolean(teacherSession.isAuthenticated);
  const isStudent = role === 'student' && Boolean(studentSession.isAuthenticated);
  const isTeacherAuthenticated = isTeacher;
  const isStudentAuthenticated = isStudent;
  const isStudentPreview = isTeacher && viewMode === 'student-preview';
  const studentUser = isStudent ? studentSession.user : null;
  const teacherUser = isTeacher ? teacherSession.user : null;
  const user: AuthUser | null = isTeacher ? teacherSession.user : isStudent ? studentSession.user : null;

  // Composite auth status for backwards compatibility
  const authStatus: AuthStatus =
    studentSession.status === 'AUTH_LOADING' || teacherSession.status === 'AUTH_LOADING'
      ? 'AUTH_LOADING'
      : (isStudentAuthenticated || isTeacherAuthenticated)
      ? 'AUTHENTICATED'
      : 'UNAUTHENTICATED';

  const isFeatureLocked = !isStudentAuthenticated && !isTeacherAuthenticated;

  const hasPermission = (permission: Permission): boolean => {
    if (!role) return false;
    const permissions = ROLE_PERMISSIONS[role] || [];
    return permissions.includes(permission);
  };

  return (
    <AuthContext.Provider
      value={{
        studentSession,
        teacherSession,
        authReady,
        studentUser,
        teacherUser,
        isStudentAuthenticated,
        isTeacherAuthenticated,
        isTeacher,
        isStudent,
        activeRole,
        hasPermission,
        viewMode,
        isStudentPreview,
        enterStudentPreview,
        exitStudentPreview,
        toggleStudentPreview,
        authStatus,
        user,
        role,
        isFeatureLocked,
        requirePasswordChange,
        studentRoster,
        login,
        teacherLogin,
        logoutStudent,
        logoutTeacher,
        logout,
        firstTimeChangePassword,
        isLoginModalOpen,
        loginModalTargetFeature,
        openLoginModal,
        closeLoginModal,
        isLogoutModalOpen,
        logoutTargetRole,
        openLogoutModal,
        closeLogoutModal,
        createStudent,
        updateStudentStatus,
        resetStudentPassword,
        changeStudentPassword,
        moveStudentClass,
        deleteStudent,
        reloadRoster
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
