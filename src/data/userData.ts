/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - User, Student & Teacher Mock Data
 */

import { Student, Teacher, User } from '../types/dataArchitecture';

export const MOCK_STUDENT: Student = {
  id: 'usr-student-001',
  email: 'nguyenvanminh.toan9@edu.vn',
  fullName: 'Nguyễn Văn Minh',
  role: 'student',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  grade: 9,
  className: 'Lớp 9A2',
  school: 'Trường Phổ Thông Thực Hành Sư Phạm',
  level: 2,
  xp: 320,
  streakDays: 4,
  accuracyRate: 92,
  targetExamScore: 9.5,
  completedLessons: ['lesson-cyl-01', 'lesson-cyl-02'],
  completedExercises: ['p-cyl-1', 'p-cyl-2', 'p-cone-1'],
  exploredShapes: ['cylinder', 'cone'],
  badgesEarned: ['badge-bronze-explorer', 'badge-cyl-master'],
  achievementsUnlocked: ['ach-theory-1', 'ach-practice-1', 'ach-explore-1'],
  activeChallengeIds: ['challenge-water-tank-01'],
  createdAt: '2026-01-10T08:00:00Z',
  lastLoginAt: '2026-08-15T18:30:00Z'
};

export const MOCK_TEACHER: Teacher = {
  id: 'usr-teacher-001',
  email: 'tranngochieu.toan9@longduc.edu.vn',
  fullName: 'ThS. Trần Ngọc Hiếu',
  role: 'teacher',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  school: 'Trường Phổ Thông Thực Hành Sư Phạm',
  subject: 'Toán học THCS (Hình học 9)',
  assignedClasses: ['9A1', '9A2', '9A3'],
  publishedLessonsCount: 12,
  bio: 'Giáo viên bộ môn Toán 9 - Chuyên đề Hình học không gian ôn thi vào lớp 10.',
  createdAt: '2025-08-01T07:00:00Z',
  lastLoginAt: '2026-08-15T15:00:00Z'
};

export const MOCK_STUDENTS_LIST: Student[] = [
  MOCK_STUDENT,
  {
    id: 'usr-student-002',
    email: 'lethihuong@edu.vn',
    fullName: 'Lê Thị Hương',
    role: 'student',
    grade: 9,
    className: 'Lớp 9A2',
    school: 'Trường Phổ Thông Thực Hành Sư Phạm',
    level: 3,
    xp: 640,
    streakDays: 7,
    accuracyRate: 96,
    targetExamScore: 10.0,
    completedLessons: ['lesson-cyl-01', 'lesson-cyl-02', 'lesson-cone-01', 'lesson-sph-01'],
    completedExercises: ['p-cyl-1', 'p-cyl-2', 'p-cone-1', 'p-sph-1', 'p-drag-1'],
    exploredShapes: ['cylinder', 'cone', 'sphere'],
    badgesEarned: ['badge-bronze-explorer', 'badge-silver-scholar', 'badge-cone-master'],
    achievementsUnlocked: ['ach-theory-1', 'ach-practice-1', 'ach-explore-1', 'ach-mastery-1'],
    activeChallengeIds: ['challenge-water-tank-01', 'challenge-icecream-02'],
    createdAt: '2026-01-12T09:00:00Z',
    lastLoginAt: '2026-08-15T17:45:00Z'
  },
  {
    id: 'usr-student-003',
    email: 'tranducanh@edu.vn',
    fullName: 'Trần Đức Anh',
    role: 'student',
    grade: 9,
    className: 'Lớp 9A1',
    school: 'Trường Phổ Thông Thực Hành Sư Phạm',
    level: 1,
    xp: 180,
    streakDays: 2,
    accuracyRate: 85,
    targetExamScore: 8.5,
    completedLessons: ['lesson-cyl-01'],
    completedExercises: ['p-cyl-1'],
    exploredShapes: ['cylinder'],
    badgesEarned: ['badge-bronze-explorer'],
    achievementsUnlocked: ['ach-theory-1'],
    activeChallengeIds: [],
    createdAt: '2026-02-01T10:00:00Z',
    lastLoginAt: '2026-08-14T19:20:00Z'
  }
];

export const MOCK_ALL_USERS: User[] = [
  MOCK_STUDENT,
  MOCK_TEACHER,
  MOCK_STUDENTS_LIST[1],
  MOCK_STUDENTS_LIST[2]
];
