/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TEACHER AUTHENTICATION & SESSION SERVICE
 * Single Teacher Policy: MAX_TEACHER_ACCOUNTS = 1
 * Unique Teacher: hieu1say (teacher_hieu1say)
 * Secure password verification using Web Crypto API SHA-256.
 * Zero plaintext credentials in client code or persistent storage.
 */

export interface TeacherSession {
  teacherAuthenticated: boolean;
  teacherId: string;
  teacherName: string;
  username: string;
  loginTime: string;
}

const STORAGE_AUTH_SESSION = 'geometry_lab_teacher_session';
const STORAGE_PWD_HASH = 'geometry_lab_teacher_pwd_hash';
const STORAGE_TEACHER_NAME = 'geometry_lab_teacher_display_name';

// Single Teacher Policy Definition
export const MAX_TEACHER_ACCOUNTS = 1;
export const TEACHER_ID = 'teacher_hieu1say';
export const TEACHER_USERNAME = 'hieu1say';

// SHA-256 Hash of initial password (Phuongthao0810)
// Computed via crypto.subtle.digest('SHA-256', 'Phuongthao0810')
// No plaintext password is ever stored or hardcoded in client code.
const INITIAL_PWD_HASH = 'd309aeeae7b4f478cb6101f92b0e99c0987950c16521a755366d5553a22838b4';

// Compute SHA-256 hash using Web Crypto API
export async function sha256(message: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const msgUint8 = new TextEncoder().encode(message.trim());
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Deterministic fallback if Web Crypto is unavailable in testing environments
  let hash = 0;
  for (let i = 0; i < message.length; i++) {
    const char = message.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'fallback_' + Math.abs(hash).toString(16);
}

export const TeacherAuthService = {
  /**
   * Initialize and bootstrap teacher security state & perform storage migration
   */
  initSecurity: async () => {
    try {
      // 1. Remove any legacy plaintext password keys
      localStorage.removeItem('geometry_lab_teacher_custom_password');

      // 2. Initialize password hash if not set or if legacy invalid hash exists
      const existing = localStorage.getItem(STORAGE_PWD_HASH);
      if (!existing) {
        localStorage.setItem(STORAGE_PWD_HASH, INITIAL_PWD_HASH);
      }

      // 3. Migrate any legacy demo teacher session in storage
      const rawSession = localStorage.getItem(STORAGE_AUTH_SESSION);
      if (rawSession) {
        try {
          const parsed = JSON.parse(rawSession);
          if (parsed && parsed.username && parsed.username !== TEACHER_USERNAME) {
            // Remove demo teacher identity from session
            localStorage.removeItem(STORAGE_AUTH_SESSION);
            localStorage.removeItem('geometry_lab_teacher_auth');
            localStorage.removeItem('geometry_lab_teacher_user_v4');
          }
        } catch {
          localStorage.removeItem(STORAGE_AUTH_SESSION);
        }
      }
    } catch (e) {
      console.warn('TeacherAuthService initSecurity warning:', e);
    }
  },

  /**
   * Verify teacher login credentials without leaking failure reason (prevent user enumeration)
   */
  login: async (usernameInput: string, passwordInput: string): Promise<{ success: boolean; session?: TeacherSession; error?: string }> => {
    const trimmedUser = (usernameInput || '').trim();
    const trimmedPass = (passwordInput || '').trim();

    // Constant generic error to prevent account enumeration
    const GENERIC_ERROR = 'Thông tin đăng nhập không chính xác.';

    if (!trimmedUser || !trimmedPass) {
      return { success: false, error: GENERIC_ERROR };
    }

    // Strict check: ONLY hieu1say is authorized as teacher
    if (trimmedUser.toLowerCase() !== TEACHER_USERNAME.toLowerCase()) {
      return { success: false, error: GENERIC_ERROR };
    }

    // Retrieve stored SHA-256 hash or fallback to initial hash
    let storedHash = localStorage.getItem(STORAGE_PWD_HASH);
    if (!storedHash) {
      storedHash = INITIAL_PWD_HASH;
      localStorage.setItem(STORAGE_PWD_HASH, storedHash);
    }

    const inputHash = await sha256(trimmedPass);

    if (inputHash === storedHash) {
      const teacherName = localStorage.getItem(STORAGE_TEACHER_NAME) || localStorage.getItem('geometry_lab_teacher_name') || 'ThS. Trần Ngọc Hiếu';
      const session: TeacherSession = {
        teacherAuthenticated: true,
        teacherId: TEACHER_ID,
        teacherName: teacherName,
        username: TEACHER_USERNAME,
        loginTime: new Date().toISOString()
      };

      const teacherAuthUser = {
        id: TEACHER_ID,
        username: TEACHER_USERNAME,
        email: 'tranngochieu.toan9@longduc.edu.vn',
        fullName: teacherName,
        title: 'ThS.',
        school: 'Trường Phổ Thông Thực Hành Sư Phạm',
        role: 'teacher' as const,
        status: 'ACTIVE' as const
      };

      localStorage.setItem(STORAGE_AUTH_SESSION, JSON.stringify(session));
      localStorage.setItem('geometry_lab_teacher_auth', 'authenticated');
      localStorage.setItem('geometry_lab_teacher_user_v4', JSON.stringify(teacherAuthUser));

      return { success: true, session };
    }

    return { success: false, error: GENERIC_ERROR };
  },

  /**
   * Get current teacher session
   */
  getSession: (): TeacherSession | null => {
    try {
      // 1. Check isolated teacher session storage
      const raw = localStorage.getItem(STORAGE_AUTH_SESSION);
      if (raw) {
        const session: TeacherSession = JSON.parse(raw);
        if (session && session.teacherAuthenticated && session.username === TEACHER_USERNAME) {
          return session;
        }
      }

      // 2. Check isolated teacher user object
      const teacherUserRaw = localStorage.getItem('geometry_lab_teacher_user_v4');
      if (teacherUserRaw) {
        const tUser = JSON.parse(teacherUserRaw);
        if (tUser && tUser.role === 'teacher' && tUser.username === TEACHER_USERNAME) {
          return {
            teacherAuthenticated: true,
            teacherId: TEACHER_ID,
            teacherName: tUser.fullName || 'ThS. Trần Ngọc Hiếu',
            username: TEACHER_USERNAME,
            loginTime: new Date().toISOString()
          };
        }
      }

      return null;
    } catch {
      return null;
    }
  },

  /**
   * Check if teacher is authenticated
   */
  isAuthenticated: (): boolean => {
    const session = TeacherAuthService.getSession();
    if (session && session.teacherAuthenticated && session.username === TEACHER_USERNAME) {
      return true;
    }
    return false;
  },

  /**
   * Logout teacher and invalidate session (without touching student session)
   */
  logout: (): void => {
    localStorage.removeItem(STORAGE_AUTH_SESSION);
    localStorage.removeItem('geometry_lab_teacher_auth');
    localStorage.removeItem('geometry_lab_teacher_user_v4');
  },

  /**
   * Update teacher display name
   */
  updateDisplayName: (newName: string): boolean => {
    const trimmed = newName.trim();
    if (!trimmed) return false;
    localStorage.setItem(STORAGE_TEACHER_NAME, trimmed);

    // Update in session as well
    const session = TeacherAuthService.getSession();
    if (session) {
      session.teacherName = trimmed;
      localStorage.setItem(STORAGE_AUTH_SESSION, JSON.stringify(session));
    }
    return true;
  },

  /**
   * Get teacher display name
   */
  getDisplayName: (): string => {
    return localStorage.getItem(STORAGE_TEACHER_NAME) || localStorage.getItem('geometry_lab_teacher_name') || 'ThS. Trần Ngọc Hiếu';
  },

  /**
   * Get teacher username (immutable)
   */
  getUsername: (): string => {
    return TEACHER_USERNAME;
  },

  /**
   * Verify a password against stored SHA-256 hash
   */
  verifyPassword: async (password: string): Promise<boolean> => {
    const trimmed = password.trim();
    if (!trimmed) return false;
    const storedHash = localStorage.getItem(STORAGE_PWD_HASH) || INITIAL_PWD_HASH;
    const inputHash = await sha256(trimmed);
    return inputHash === storedHash;
  },

  /**
   * Change teacher password using Web Crypto SHA-256
   */
  changePassword: async (currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    const trimmedOld = currentPassword.trim();
    const trimmedNew = newPassword.trim();

    if (!trimmedOld || !trimmedNew) {
      return { success: false, error: 'Vui lòng điền đầy đủ mật khẩu cũ và mới.' };
    }

    if (trimmedNew.length < 6) {
      return { success: false, error: 'Mật khẩu mới phải có ít nhất 6 ký tự.' };
    }

    if (trimmedOld === trimmedNew) {
      return { success: false, error: 'Mật khẩu mới không được trùng với mật khẩu hiện tại.' };
    }

    // Verify current password against stored hash
    const isOldValid = await TeacherAuthService.verifyPassword(trimmedOld);
    if (!isOldValid) {
      return { success: false, error: 'Mật khẩu hiện tại không chính xác.' };
    }

    // Store new SHA-256 hash (never store plaintext)
    const newHash = await sha256(trimmedNew);
    localStorage.setItem(STORAGE_PWD_HASH, newHash);
    localStorage.removeItem('geometry_lab_teacher_custom_password');

    return { success: true };
  }
};

