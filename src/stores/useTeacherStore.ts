/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TEACHER PROFILE STORE (ZUSTAND)
 * Global state management for Teacher Profile (Full Name, Title, School, Department, Specialization, Initials)
 * Synchronized with LocalStorage for persistent offline support and database compatibility.
 */

import { create } from 'zustand';
import { TeacherProfile } from '../types/dataArchitecture';

export const computeAvatarInitials = (fullName: string, title?: string): string => {
  if (!fullName || !fullName.trim()) return 'TH';
  const cleanName = fullName.replace(/^(Th\.?s|ThS|PGS\.?|TS\.?|Thầy|Cô|Cử nhân|Thạc sĩ|Tiến sĩ)\s+/i, '').trim();
  const parts = cleanName.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'TH';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  if (parts.length === 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const getTeacherDisplayName = (fullName: string, title?: string): string => {
  const cleanName = fullName?.trim() || 'Trần Ngọc Hiếu';
  let cleanTitle = title?.trim() || 'ThS.';
  if (cleanTitle === 'Th.s' || cleanTitle === 'Th.S' || cleanTitle === 'ThS') {
    cleanTitle = 'ThS.';
  }
  if (!cleanTitle) return cleanName;
  if (cleanName.toLowerCase().startsWith(cleanTitle.toLowerCase())) return cleanName;
  return `${cleanTitle} ${cleanName}`;
};

/**
 * Standardize context display format:
 * "${currentClass.name} • ${teacherProfile.title} ${teacherProfile.fullName}"
 * with optional school "${teacherProfile.schoolName}" when space permits.
 */
export const formatTeacherClassDisplay = (
  className?: string,
  teacherNameOrProfile?: string | Partial<TeacherProfile> | null,
  schoolName?: string,
  includeSchool = true
): string => {
  const cls = className?.trim() || 'Chưa chọn lớp';

  if (typeof teacherNameOrProfile === 'object' && teacherNameOrProfile !== null) {
    const fn = teacherNameOrProfile.fullName?.trim();
    if (!fn) {
      return `${cls} • Chưa cập nhật hồ sơ giáo viên`;
    }
    let rawTitle = teacherNameOrProfile.title?.trim() || 'ThS.';
    if (rawTitle === 'Th.s' || rawTitle === 'Th.S' || rawTitle === 'ThS') {
      rawTitle = 'ThS.';
    }
    const teacherDisplay = fn.startsWith(rawTitle) ? fn : `${rawTitle} ${fn}`;
    const sn = teacherNameOrProfile.schoolName?.trim() || schoolName?.trim();

    if (includeSchool && sn) {
      return `${cls} • ${teacherDisplay} • ${sn}`;
    }
    return `${cls} • ${teacherDisplay}`;
  }

  if (typeof teacherNameOrProfile === 'string' && teacherNameOrProfile.trim()) {
    const teacher = teacherNameOrProfile.trim();
    const school = schoolName?.trim();
    if (includeSchool && school) {
      return `${cls} • ${teacher} • ${school}`;
    }
    return `${cls} • ${teacher}`;
  }

  return `${cls} • Chưa cập nhật hồ sơ giáo viên`;
};

const STORAGE_PROFILE_KEY = 'geometry_lab_teacher_profile_v2';
const STORAGE_NAME_KEY = 'geometry_lab_teacher_name';
const STORAGE_SCHOOL_KEY = 'geometry_lab_teacher_school';
const STORAGE_SUBJECT_KEY = 'geometry_lab_teacher_subject';
const STORAGE_BIO_KEY = 'geometry_lab_teacher_bio';

const DEFAULT_PROFILE: TeacherProfile = {
  id: 'prof-teacher-001',
  userId: 'usr-teacher-001',
  fullName: 'Trần Ngọc Hiếu',
  title: 'ThS.',
  schoolName: 'Trường Phổ Thông Thực Hành Sư Phạm',
  department: 'Toán',
  specialization: 'Hình học không gian (Trụ - Nón - Cầu)',
  avatarInitials: 'TH',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  email: 'tranngochieu.toan9@longduc.edu.vn',
  createdAt: '2025-08-01T07:00:00Z',
  updatedAt: '2026-08-15T00:00:00Z',
};

const loadInitialProfile = (): TeacherProfile => {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_PROFILE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      let title = parsed.title || 'ThS.';
      if (title === 'Th.s' || title === 'Th.S' || title === 'ThS') {
        title = 'ThS.';
      }
      let schoolName = parsed.schoolName || DEFAULT_PROFILE.schoolName;
      if (schoolName.includes('Long Đức') || schoolName.includes('Long Duc')) {
        schoolName = 'Trường Phổ Thông Thực Hành Sư Phạm';
        parsed.schoolName = schoolName;
        localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(parsed));
      }
      return {
        ...DEFAULT_PROFILE,
        ...parsed,
        title,
        schoolName,
        avatarInitials: parsed.avatarInitials || computeAvatarInitials(parsed.fullName, title)
      };
    }

    // Check legacy single keys
    const legacyName = localStorage.getItem(STORAGE_NAME_KEY);
    let legacySchool = localStorage.getItem(STORAGE_SCHOOL_KEY);
    if (legacySchool && (legacySchool.includes('Long Đức') || legacySchool.includes('Long Duc'))) {
      legacySchool = 'Trường Phổ Thông Thực Hành Sư Phạm';
      localStorage.setItem(STORAGE_SCHOOL_KEY, legacySchool);
    }
    const legacySubject = localStorage.getItem(STORAGE_SUBJECT_KEY);
    const legacyBio = localStorage.getItem(STORAGE_BIO_KEY);

    if (legacyName || legacySchool) {
      let title = 'ThS.';
      let fullName = legacyName || DEFAULT_PROFILE.fullName;
      if (fullName.startsWith('Th.S ') || fullName.startsWith('Th.s ') || fullName.startsWith('ThS ') || fullName.startsWith('ThS. ')) {
        title = 'ThS.';
        fullName = fullName.replace(/^Th\.?[sS]\.?\s+/, '');
      }

      const migrated: TeacherProfile = {
        ...DEFAULT_PROFILE,
        fullName: fullName || DEFAULT_PROFILE.fullName,
        title,
        schoolName: legacySchool || DEFAULT_PROFILE.schoolName,
        department: legacySubject ? legacySubject.replace(/\s*\(.*?\)\s*/, '') : DEFAULT_PROFILE.department,
        avatarInitials: computeAvatarInitials(fullName, title)
      };
      localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(migrated));
      return migrated;
    }
  } catch (err) {
    console.warn('Failed to parse stored teacher profile:', err);
  }
  return DEFAULT_PROFILE;
};

interface TeacherState {
  profile: TeacherProfile;
  teacherName: string;
  schoolName: string;
  title: string;
  department: string;
  specialization: string;
  avatarInitials: string;
  email: string;
  subject: string;
  bio: string;
  currentClassName: string;
  currentClassId: string;
  setCurrentClass: (className: string, classId?: string) => void;
  getFormattedContext: (customClass?: string) => string;
  updateTeacherProfile: (updates: Partial<TeacherProfile>) => TeacherProfile;
  updateProfile: (newName: string, newSchool: string, newSubject?: string, newBio?: string) => void;
}

const initialProfile = loadInitialProfile();

export const useTeacherStore = create<TeacherState>((set, get) => ({
  profile: initialProfile,
  teacherName: getTeacherDisplayName(initialProfile.fullName, initialProfile.title),
  schoolName: initialProfile.schoolName,
  title: initialProfile.title,
  department: initialProfile.department,
  specialization: initialProfile.specialization,
  avatarInitials: initialProfile.avatarInitials,
  email: initialProfile.email,
  subject: initialProfile.department || 'Toán học THCS (Hình học 9)',
  bio: 'Giáo viên bộ môn Toán 9 - Chuyên đề Hình học không gian ôn thi vào lớp 10.',
  currentClassName: 'Lớp 9A2',
  currentClassId: 'cls-9a2',

  setCurrentClass: (className: string, classId?: string) => {
    set({
      currentClassName: className,
      currentClassId: classId || get().currentClassId
    });
  },

  getFormattedContext: (customClass?: string) => {
    const s = get();
    return formatTeacherClassDisplay(
      customClass || s.currentClassName,
      s.profile,
      s.schoolName
    );
  },

  updateTeacherProfile: (updates: Partial<TeacherProfile>): TeacherProfile => {
    const current = get().profile;
    const rawFullName = updates.fullName !== undefined ? updates.fullName.trim() : current.fullName;
    let rawTitle = updates.title !== undefined ? updates.title.trim() : current.title;
    if (rawTitle === 'Th.s' || rawTitle === 'Th.S' || rawTitle === 'ThS') {
      rawTitle = 'ThS.';
    }
    const rawSchool = updates.schoolName !== undefined ? updates.schoolName.trim() : current.schoolName;
    const rawDept = updates.department !== undefined ? updates.department.trim() : current.department;
    const rawSpec = updates.specialization !== undefined ? updates.specialization.trim() : current.specialization;
    const rawInitials = updates.avatarInitials !== undefined && updates.avatarInitials.trim()
      ? updates.avatarInitials.trim().toUpperCase()
      : computeAvatarInitials(rawFullName, rawTitle);

    const updatedProfile: TeacherProfile = {
      ...current,
      ...updates,
      fullName: rawFullName || current.fullName,
      title: rawTitle,
      schoolName: rawSchool || current.schoolName,
      department: rawDept || current.department,
      specialization: rawSpec || current.specialization,
      avatarInitials: rawInitials,
      email: updates.email !== undefined ? updates.email.trim() : current.email,
      updatedAt: new Date().toISOString(),
    };

    const displayName = getTeacherDisplayName(updatedProfile.fullName, updatedProfile.title);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(updatedProfile));
        localStorage.setItem(STORAGE_NAME_KEY, displayName);
        localStorage.setItem(STORAGE_SCHOOL_KEY, updatedProfile.schoolName);
        localStorage.setItem(STORAGE_SUBJECT_KEY, updatedProfile.department);
        localStorage.setItem('geometry_lab_teacher_display_name', displayName);
      } catch (e) {
        console.error('Failed to save profile to localStorage:', e);
      }
    }

    set({
      profile: updatedProfile,
      teacherName: displayName,
      schoolName: updatedProfile.schoolName,
      title: updatedProfile.title,
      department: updatedProfile.department,
      specialization: updatedProfile.specialization,
      avatarInitials: updatedProfile.avatarInitials,
      email: updatedProfile.email,
      subject: updatedProfile.department,
    });

    return updatedProfile;
  },

  updateProfile: (newName: string, newSchool: string, newSubject?: string, newBio?: string) => {
    let cleanTitle = 'ThS.';
    let cleanFullName = newName.trim() || 'Trần Ngọc Hiếu';
    if (cleanFullName.startsWith('Th.S ') || cleanFullName.startsWith('Th.s ') || cleanFullName.startsWith('ThS ') || cleanFullName.startsWith('ThS. ')) {
      cleanTitle = 'ThS.';
      cleanFullName = cleanFullName.replace(/^Th\.?[sS]\.?\s+/, '');
    }

    get().updateTeacherProfile({
      fullName: cleanFullName,
      title: cleanTitle,
      schoolName: newSchool.trim() || 'Trường Phổ Thông Thực Hành Sư Phạm',
      department: newSubject ? newSubject.trim() : undefined,
    });

    if (newBio && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_BIO_KEY, newBio);
      set({ bio: newBio });
    }
  },
}));

