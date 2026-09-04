/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - TEACHER STUDENT ACCOUNT SERVICE
 * Canonical service layer for teacher-controlled student provisioning,
 * password management, credential sheet generation, audit logs, and account lifecycle.
 */

import { StudentAccount, AccountStatus, StudentAuditLog, StudentCredentialCardItem } from '../types/auth';
import { Student } from '../types/dataArchitecture';

const STORAGE_STUDENT_ROSTER = 'geometry_lab_student_roster_v3';
const STORAGE_TEACHER_STUDENTS = 'geometry_lab_students_v2';
const STORAGE_AUDIT_LOGS = 'geometry_lab_student_audit_logs_v1';

// Web Crypto SHA-256 password hasher
export async function hashPassword(plainText: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plainText.trim());
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Deterministic fallback for non-crypto environments
  let hash = 0;
  for (let i = 0; i < plainText.length; i++) {
    const char = plainText.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'h_' + Math.abs(hash).toString(16);
}

// Convert Vietnamese accented string to unaccented slug
export function removeVietnameseAccents(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

/**
 * Automatically generate clean username from Vietnamese Full Name and Class Name
 * e.g. "Nguyễn Văn Minh" + "Lớp 9A3" -> "minh9a3"
 */
export function generateAutoUsername(
  fullName: string,
  className: string,
  existingUsernames: string[] = []
): string {
  const cleanName = removeVietnameseAccents(fullName.trim().toLowerCase());
  const nameParts = cleanName.split(/\s+/).filter(Boolean);
  if (nameParts.length === 0) return 'hocsinh';

  // Last name (first name in Vietnamese context, e.g. "minh")
  const firstName = nameParts[nameParts.length - 1].replace(/[^a-z0-9]/g, '');

  // Extract class code (e.g. "Lớp 9A3" -> "9a3")
  const cleanClass = removeVietnameseAccents(className.toLowerCase()).replace(/[^a-z0-9]/g, '');
  const classMatch = cleanClass.match(/9[a-z0-9]+/i) || cleanClass.match(/[0-9]+[a-z0-9]*/i);
  const classCode = classMatch ? classMatch[0] : (cleanClass || '9a');

  const base = `${firstName}${classCode}`.toLowerCase().slice(0, 20);
  let candidate = base;

  if (!existingUsernames.map((u) => u.toLowerCase()).includes(candidate)) {
    return candidate;
  }

  // Duplicate suffix resolution e.g. minh9a3_02
  let index = 2;
  while (existingUsernames.map((u) => u.toLowerCase()).includes(candidate)) {
    const suffix = index < 10 ? `_0${index}` : `_${index}`;
    candidate = `${base}${suffix}`;
    index++;
  }

  return candidate;
}

/**
 * Generate a strong, friendly temporary password
 * e.g. "Geo@4829"
 */
export function generateTemporaryPassword(): string {
  const prefixes = ['Geo', 'Toan', 'Lab', 'Hinh'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}@${randomNum}`;
}

export const TeacherStudentService = {
  /**
   * Get all student accounts from persistent storage
   */
  getStudentAccounts: (): StudentAccount[] => {
    try {
      const raw = localStorage.getItem(STORAGE_STUDENT_ROSTER);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Failed to parse student roster:', e);
    }
    return [];
  },

  /**
   * Save student accounts to persistent storage
   */
  saveStudentAccounts: (accounts: StudentAccount[]): void => {
    try {
      localStorage.setItem(STORAGE_STUDENT_ROSTER, JSON.stringify(accounts));
    } catch (e) {
      console.warn('Failed to save student accounts:', e);
    }
  },

  /**
   * Get audit logs
   */
  getAuditLogs: (): StudentAuditLog[] => {
    try {
      const raw = localStorage.getItem(STORAGE_AUDIT_LOGS);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Failed to parse audit logs:', e);
    }
    return [];
  },

  /**
   * Append audit log entry
   */
  logAudit: (entry: Omit<StudentAuditLog, 'id' | 'timestamp'>): void => {
    try {
      const logs = TeacherStudentService.getAuditLogs();
      const newLog: StudentAuditLog = {
        id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toISOString(),
        ...entry
      };
      const updated = [newLog, ...logs].slice(0, 200); // keep last 200 logs
      localStorage.setItem(STORAGE_AUDIT_LOGS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save audit log:', e);
    }
  },

  /**
   * Create a single student account
   */
  createStudentAccount: async (params: {
    fullName: string;
    className: string;
    classId?: string;
    school: string;
    username: string;
    initialPassword?: string;
    requirePasswordChange?: boolean;
    teacherId?: string;
    teacherName?: string;
  }): Promise<{ success: boolean; student?: StudentAccount; error?: string }> => {
    const fullName = params.fullName.trim();
    const username = params.username.trim().toLowerCase();
    const className = params.className.trim() || 'Lớp 9A2';
    const school = params.school.trim() || 'Trường Phổ Thông Thực Hành Sư Phạm';
    const rawPassword = params.initialPassword?.trim() || generateTemporaryPassword();
    const teacherId = params.teacherId || 'usr-teacher-001';
    const teacherName = params.teacherName || 'ThS. Trần Ngọc Hiếu';

    if (!fullName) {
      return { success: false, error: 'Vui lòng nhập họ và tên học sinh.' };
    }
    if (!username) {
      return { success: false, error: 'Vui lòng nhập tên tài khoản (username).' };
    }
    if (username.includes(' ')) {
      return { success: false, error: 'Tên tài khoản không được chứa khoảng trắng.' };
    }
    if (username.length < 3) {
      return { success: false, error: 'Tên tài khoản phải có ít nhất 3 ký tự.' };
    }

    const currentAccounts = TeacherStudentService.getStudentAccounts();
    const isDuplicate = currentAccounts.some((s) => s.username.toLowerCase() === username);
    if (isDuplicate) {
      return { success: false, error: `Tên tài khoản "${username}" đã tồn tại. Hãy chọn tên khác.` };
    }

    const passwordHash = await hashPassword(rawPassword);
    const studentId = `std-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const nowIso = new Date().toISOString();

    const newStudent: StudentAccount = {
      id: studentId,
      username,
      password: rawPassword, // kept in memory/session for temporary one-time credential card display
      passwordHash,
      fullName,
      className,
      classId: params.classId || 'cls-9a2',
      school,
      status: 'PENDING', // starts PENDING until first student login
      createdAt: nowIso,
      lastActiveAt: nowIso,
      firstLoginAt: null,
      loginCount: 0,
      requirePasswordChange: params.requirePasswordChange ?? true,
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
      teacherId
    };

    const updatedAccounts = [newStudent, ...currentAccounts];
    TeacherStudentService.saveStudentAccounts(updatedAccounts);

    // Sync to TeacherService student records for class analytics
    try {
      const rawTeacherStudents = localStorage.getItem(STORAGE_TEACHER_STUDENTS);
      let teacherStudents: Student[] = rawTeacherStudents ? JSON.parse(rawTeacherStudents) : [];
      const newTeacherStudent: Student = {
        id: studentId,
        email: `${username}@edu.vn`,
        fullName,
        role: 'student',
        grade: 9,
        className,
        school,
        level: 1,
        xp: 0,
        streakDays: 0,
        accuracyRate: 100,
        targetExamScore: 9.0,
        completedLessons: [],
        completedExercises: [],
        exploredShapes: [],
        badgesEarned: [],
        achievementsUnlocked: [],
        activeChallengeIds: [],
        createdAt: nowIso,
        lastLoginAt: nowIso
      };
      teacherStudents = [newTeacherStudent, ...teacherStudents];
      localStorage.setItem(STORAGE_TEACHER_STUDENTS, JSON.stringify(teacherStudents));
    } catch (e) {
      console.warn('Sync to teacher students error:', e);
    }

    // Write audit log (NEVER logs password or hash)
    TeacherStudentService.logAudit({
      teacherId,
      teacherName,
      studentId,
      studentName: fullName,
      action: 'CREATE_STUDENT_ACCOUNT',
      details: `Tạo tài khoản học sinh ${username} (${className}, ${school})`
    });

    return { success: true, student: newStudent };
  },

  /**
   * Bulk import student accounts
   */
  bulkCreateStudentAccounts: async (
    items: Array<{
      fullName: string;
      className: string;
      school?: string;
      username?: string;
      password?: string;
      requirePasswordChange?: boolean;
    }>,
    teacherId = 'usr-teacher-001',
    teacherName = 'ThS. Trần Ngọc Hiếu'
  ): Promise<{
    success: boolean;
    createdCount: number;
    failedCount: number;
    createdStudents: StudentCredentialCardItem[];
    errors: Array<{ row: number; name: string; error: string }>;
  }> => {
    const currentAccounts = TeacherStudentService.getStudentAccounts();
    const existingUsernames = currentAccounts.map((s) => s.username.toLowerCase());

    const createdStudents: StudentCredentialCardItem[] = [];
    const errors: Array<{ row: number; name: string; error: string }> = [];
    const newAccounts: StudentAccount[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const fullName = (item.fullName || '').trim();
      const className = (item.className || 'Lớp 9A2').trim();
      const school = (item.school || 'Trường Phổ Thông Thực Hành Sư Phạm').trim();

      if (!fullName) {
        errors.push({ row: i + 1, name: 'Trống', error: 'Thiếu họ và tên học sinh' });
        continue;
      }

      // Generate or validate username
      let username = (item.username || '').trim().toLowerCase();
      if (!username) {
        username = generateAutoUsername(fullName, className, existingUsernames);
      } else {
        if (existingUsernames.includes(username)) {
          errors.push({
            row: i + 1,
            name: fullName,
            error: `Tên tài khoản "${username}" đã tồn tại trên hệ thống`
          });
          continue;
        }
      }

      existingUsernames.push(username);

      const rawPassword = (item.password || '').trim() || generateTemporaryPassword();
      const passwordHash = await hashPassword(rawPassword);
      const studentId = `std-bulk-${Date.now()}-${i}-${Math.floor(Math.random() * 1000)}`;
      const nowIso = new Date().toISOString();

      const newStudent: StudentAccount = {
        id: studentId,
        username,
        password: rawPassword,
        passwordHash,
        fullName,
        className,
        school,
        status: 'PENDING',
        createdAt: nowIso,
        lastActiveAt: nowIso,
        firstLoginAt: null,
        loginCount: 0,
        requirePasswordChange: item.requirePasswordChange ?? true,
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
        teacherId
      };

      newAccounts.push(newStudent);
      createdStudents.push({
        id: studentId,
        fullName,
        className,
        school,
        username,
        temporaryPassword: rawPassword,
        createdAt: nowIso
      });
    }

    if (newAccounts.length > 0) {
      const updatedAccounts = [...newAccounts, ...currentAccounts];
      TeacherStudentService.saveStudentAccounts(updatedAccounts);

      TeacherStudentService.logAudit({
        teacherId,
        teacherName,
        studentId: 'bulk',
        studentName: `${newAccounts.length} học sinh`,
        action: 'BULK_CREATE_STUDENTS',
        details: `Tạo hàng loạt ${newAccounts.length} tài khoản thành công.`
      });
    }

    return {
      success: newAccounts.length > 0,
      createdCount: newAccounts.length,
      failedCount: errors.length,
      createdStudents,
      errors
    };
  },

  /**
   * Change student password
   */
  changeStudentPassword: async (
    studentId: string,
    newPassword: string,
    requireChangeOnNextLogin = false,
    teacherId = 'usr-teacher-001',
    teacherName = 'ThS. Trần Ngọc Hiếu'
  ): Promise<{ success: boolean; error?: string }> => {
    const trimmedPass = newPassword.trim();
    if (!trimmedPass || trimmedPass.length < 6) {
      return { success: false, error: 'Mật khẩu mới phải có ít nhất 6 ký tự.' };
    }

    const accounts = TeacherStudentService.getStudentAccounts();
    const student = accounts.find((s) => s.id === studentId);
    if (!student) {
      return { success: false, error: 'Không tìm thấy thông tin học sinh.' };
    }

    const passwordHash = await hashPassword(trimmedPass);
    const updated = accounts.map((s) =>
      s.id === studentId
        ? {
            ...s,
            password: trimmedPass,
            passwordHash,
            requirePasswordChange: requireChangeOnNextLogin
          }
        : s
    );

    TeacherStudentService.saveStudentAccounts(updated);

    TeacherStudentService.logAudit({
      teacherId,
      teacherName,
      studentId,
      studentName: student.fullName,
      action: 'CHANGE_STUDENT_PASSWORD',
      details: `Đổi mật khẩu cho học sinh ${student.username} (Yêu cầu đổi lần sau: ${
        requireChangeOnNextLogin ? 'Có' : 'Không'
      })`
    });

    return { success: true };
  },

  /**
   * Reset student password with temporary password
   */
  resetStudentPassword: async (
    studentId: string,
    customTempPassword?: string,
    teacherId = 'usr-teacher-001',
    teacherName = 'ThS. Trần Ngọc Hiếu'
  ): Promise<{ success: boolean; temporaryPassword?: string; student?: StudentAccount; error?: string }> => {
    const accounts = TeacherStudentService.getStudentAccounts();
    const student = accounts.find((s) => s.id === studentId);
    if (!student) {
      return { success: false, error: 'Không tìm thấy học sinh.' };
    }

    const tempPassword = customTempPassword?.trim() || generateTemporaryPassword();
    const passwordHash = await hashPassword(tempPassword);

    const updated = accounts.map((s) =>
      s.id === studentId
        ? {
            ...s,
            password: tempPassword,
            passwordHash,
            requirePasswordChange: true
          }
        : s
    );

    TeacherStudentService.saveStudentAccounts(updated);

    TeacherStudentService.logAudit({
      teacherId,
      teacherName,
      studentId,
      studentName: student.fullName,
      action: 'RESET_STUDENT_PASSWORD',
      details: `Đặt lại mật khẩu tạm thời cho học sinh ${student.username}`
    });

    return { success: true, temporaryPassword: tempPassword, student: { ...student, password: tempPassword } };
  },

  /**
   * Update student account status (ACTIVE / LOCKED / DISABLED)
   */
  updateStudentStatus: (
    studentId: string,
    status: AccountStatus,
    teacherId = 'usr-teacher-001',
    teacherName = 'ThS. Trần Ngọc Hiếu'
  ): { success: boolean; error?: string } => {
    const accounts = TeacherStudentService.getStudentAccounts();
    const student = accounts.find((s) => s.id === studentId);
    if (!student) {
      return { success: false, error: 'Không tìm thấy học sinh.' };
    }

    const updated = accounts.map((s) => (s.id === studentId ? { ...s, status } : s));
    TeacherStudentService.saveStudentAccounts(updated);

    const actionMap: Record<AccountStatus, StudentAuditLog['action']> = {
      ACTIVE: 'UNLOCK_STUDENT',
      LOCKED: 'LOCK_STUDENT',
      DISABLED: 'DISABLE_STUDENT',
      PENDING: 'UNLOCK_STUDENT'
    };

    TeacherStudentService.logAudit({
      teacherId,
      teacherName,
      studentId,
      studentName: student.fullName,
      action: actionMap[status] || 'LOCK_STUDENT',
      details: `Cập nhật trạng thái tài khoản thành ${status}`
    });

    return { success: true };
  },

  /**
   * Move student to another class
   */
  moveStudentClass: (
    studentId: string,
    newClassName: string,
    newClassId?: string,
    teacherId = 'usr-teacher-001',
    teacherName = 'ThS. Trần Ngọc Hiếu'
  ): { success: boolean; error?: string } => {
    const accounts = TeacherStudentService.getStudentAccounts();
    const student = accounts.find((s) => s.id === studentId);
    if (!student) {
      return { success: false, error: 'Không tìm thấy học sinh.' };
    }

    const oldClass = student.className;
    const updated = accounts.map((s) =>
      s.id === studentId
        ? {
            ...s,
            className: newClassName,
            classId: newClassId || s.classId
          }
        : s
    );

    TeacherStudentService.saveStudentAccounts(updated);

    // Sync TeacherService student records
    try {
      const rawTeacherStudents = localStorage.getItem(STORAGE_TEACHER_STUDENTS);
      if (rawTeacherStudents) {
        const list: Student[] = JSON.parse(rawTeacherStudents);
        const updatedList = list.map((s) =>
          s.id === studentId || s.fullName === student.fullName
            ? { ...s, className: newClassName }
            : s
        );
        localStorage.setItem(STORAGE_TEACHER_STUDENTS, JSON.stringify(updatedList));
      }
    } catch (e) {
      console.warn('Move class sync error:', e);
    }

    TeacherStudentService.logAudit({
      teacherId,
      teacherName,
      studentId,
      studentName: student.fullName,
      action: 'MOVE_STUDENT_CLASS',
      details: `Chuyển học sinh ${student.fullName} từ ${oldClass} sang ${newClassName}`
    });

    return { success: true };
  }
};
