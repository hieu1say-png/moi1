/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - TEACHER SERVICE & DATA REPOSITORY
 * Comprehensive implementation for Classes, Students, Question Bank, Assignments, Submissions, Error Diagnosis, and Reports.
 */

import {
  SchoolClass,
  Student,
  Assignment,
  AssignmentSubmission,
  TeacherClassReport,
  Teacher,
  TeacherProfile,
  Exercise,
  ShapeType,
  ExerciseType,
  ExerciseDifficulty,
  LearningEvent
} from '../types/dataArchitecture';
import { ALL_MOCK_EXERCISES } from '../data/exercisesData';
import { MOCK_STUDENTS_LIST, MOCK_TEACHER } from '../data/userData';
import { MOCK_STUDENT_ERRORS } from '../data/studentErrorsData';
import { getStoredSupabaseConfig } from './supabase/supabaseConfig';
import { getCachedUnifiedAssignmentBank, convertUnifiedToExercise } from './unifiedAssignmentService';
import { TeacherAuthService, sha256 } from './teacherAuthService';

// Storage keys
const STORAGE_CLASSES = 'geometry_lab_classes_v2';
const STORAGE_STUDENTS = 'geometry_lab_students_v2';
const STORAGE_ASSIGNMENTS = 'geometry_lab_assignments_v2';
const STORAGE_SUBMISSIONS = 'geometry_lab_submissions_v2';
const STORAGE_CUSTOM_QUESTIONS = 'geometry_lab_custom_questions_v2';
const STORAGE_LEARNING_EVENTS = 'geometry_lab_learning_events_v2';

// 1. Initial Mock Classes Data
const INITIAL_CLASSES: SchoolClass[] = [
  {
    id: 'cls-9a2',
    name: 'Lớp 9A2',
    grade: 9,
    schoolYear: '2025 - 2026',
    studentCount: 42,
    classCode: 'TOAN9-A2',
    averageScore: 8.6,
    completionRate: 88,
    teacherId: 'usr-teacher-001',
    teacherName: 'ThS. Trần Ngọc Hiếu',
    schedule: 'Thứ 2, 4, 6 (Tiết 1-2)',
    room: 'Phòng 204 - Nhà A',
    description: 'Lớp chọn Toán - Năng khiếu tự nhiên định hướng thi chuyên Toán và KHTN.',
    createdAt: '2025-09-05T08:00:00Z'
  },
  {
    id: 'cls-9a1',
    name: 'Lớp 9A1',
    grade: 9,
    schoolYear: '2025 - 2026',
    studentCount: 40,
    classCode: 'TOAN9-A1',
    averageScore: 8.2,
    completionRate: 78,
    teacherId: 'usr-teacher-001',
    teacherName: 'ThS. Trần Ngọc Hiếu',
    schedule: 'Thứ 3, 5 (Tiết 3-4), Thứ 7 (Tiết 1)',
    room: 'Phòng 202 - Nhà A',
    description: 'Lớp định hướng toàn diện, chuẩn bị thi tuyển sinh Lớp 10 THPT công lập.',
    createdAt: '2025-09-05T08:00:00Z'
  },
  {
    id: 'cls-9a3',
    name: 'Lớp 9A3',
    grade: 9,
    schoolYear: '2025 - 2026',
    studentCount: 38,
    classCode: 'TOAN9-A3',
    averageScore: 7.4,
    completionRate: 65,
    teacherId: 'usr-teacher-001',
    teacherName: 'ThS. Trần Ngọc Hiếu',
    schedule: 'Thứ 2, 5 (Tiết 4-5)',
    room: 'Phòng 206 - Nhà A',
    description: 'Lớp cần củng cố kiến thức hình học không gian và phương pháp tính diện tích, thể tích.',
    createdAt: '2025-09-05T08:00:00Z'
  }
];

// 2. Initial Mock Extended Students List
const INITIAL_STUDENTS: Student[] = [
  ...MOCK_STUDENTS_LIST,
  {
    id: 'usr-student-004',
    email: 'phamthianhthu@edu.vn',
    fullName: 'Phạm Thị Anh Thư',
    role: 'student',
    grade: 9,
    className: 'Lớp 9A2',
    school: 'Trường Phổ Thông Thực Hành Sư Phạm',
    level: 3,
    xp: 590,
    streakDays: 6,
    accuracyRate: 94,
    targetExamScore: 9.5,
    completedLessons: ['lesson-cyl-01', 'lesson-cyl-02', 'lesson-cone-01'],
    completedExercises: ['ex-mc-cyl-01', 'ex-mc-cyl-02', 'ex-mc-cone-01'],
    exploredShapes: ['cylinder', 'cone', 'sphere'],
    badgesEarned: ['badge-explorer', 'badge-cyl-expert'],
    achievementsUnlocked: ['ach-theory-1', 'ach-practice-1'],
    activeChallengeIds: [],
    createdAt: '2026-01-15T09:00:00Z',
    lastLoginAt: '2026-08-15T16:30:00Z'
  },
  {
    id: 'usr-student-005',
    email: 'vuhoangnam@edu.vn',
    fullName: 'Vũ Hoàng Nam',
    role: 'student',
    grade: 9,
    className: 'Lớp 9A2',
    school: 'Trường Phổ Thông Thực Hành Sư Phạm',
    level: 2,
    xp: 280,
    streakDays: 3,
    accuracyRate: 75,
    targetExamScore: 8.0,
    completedLessons: ['lesson-cyl-01'],
    completedExercises: ['ex-mc-cyl-01'],
    exploredShapes: ['cylinder'],
    badgesEarned: ['badge-explorer'],
    achievementsUnlocked: ['ach-theory-1'],
    activeChallengeIds: [],
    createdAt: '2026-02-05T10:00:00Z',
    lastLoginAt: '2026-08-14T20:10:00Z'
  },
  {
    id: 'usr-student-006',
    email: 'nguyenbaoquan@edu.vn',
    fullName: 'Nguyễn Bảo Quân',
    role: 'student',
    grade: 9,
    className: 'Lớp 9A3',
    school: 'Trường Phổ Thông Thực Hành Sư Phạm',
    level: 1,
    xp: 140,
    streakDays: 1,
    accuracyRate: 62,
    targetExamScore: 7.5,
    completedLessons: ['lesson-cyl-01'],
    completedExercises: [],
    exploredShapes: ['cylinder'],
    badgesEarned: [],
    achievementsUnlocked: [],
    activeChallengeIds: [],
    createdAt: '2026-02-10T11:00:00Z',
    lastLoginAt: '2026-08-13T14:20:00Z'
  }
];

// 3. Initial Mock Assignments
const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-001',
    title: 'Bài tập tuần 1: Diện tích xung quanh & Thể tích Hình Trụ',
    description: 'Yêu cầu các em hoàn thành 4 câu hỏi trắc nghiệm & tính toán về hình trụ. Lưu ý đọc kỹ bán kính r và chiều cao h.',
    shapeId: 'cylinder',
    targetClassId: 'cls-9a2',
    targetClassName: 'Lớp 9A2',
    teacherId: 'usr-teacher-001',
    teacherName: 'ThS. Trần Ngọc Hiếu',
    dueDate: '2026-08-20T23:59:59Z',
    rewardXp: 120,
    exerciseIds: ['ex-mc-cyl-01', 'ex-mc-cyl-02', 'ex-num-cyl-01', 'ex-tf-cyl-01'],
    totalQuestions: 4,
    status: 'published',
    createdAt: '2026-08-12T08:00:00Z',
    submissionsCount: 38,
    averageScore: 8.8
  },
  {
    id: 'asg-002',
    title: 'Thực hành mô hình: Đường sinh và Nón lá Hình Nón',
    description: 'Luyện tập kỹ năng sử dụng định lý Pythagore tính đường sinh l, diện tích xung quanh nón lá và bài toán thực tế.',
    shapeId: 'cone',
    targetClassId: 'cls-9a2',
    targetClassName: 'Lớp 9A2',
    teacherId: 'usr-teacher-001',
    teacherName: 'ThS. Trần Ngọc Hiếu',
    dueDate: '2026-08-22T23:59:59Z',
    rewardXp: 150,
    exerciseIds: ['ex-mc-cone-01', 'ex-mc-cone-02', 'ex-num-cone-01'],
    totalQuestions: 3,
    status: 'published',
    createdAt: '2026-08-14T09:30:00Z',
    submissionsCount: 29,
    averageScore: 8.1
  },
  {
    id: 'asg-003',
    title: 'Chuyên đề Ôn thi vào 10: Tổng hợp Trụ - Nón - Cầu',
    description: 'Bộ đề nâng cao kết hợp 3 hình khối tròn xoay, bài toán rót nước và thể tích chỏm cầu Archimedes.',
    shapeId: 'all',
    targetClassId: 'cls-9a1',
    targetClassName: 'Lớp 9A1',
    teacherId: 'usr-teacher-001',
    teacherName: 'ThS. Trần Ngọc Hiếu',
    dueDate: '2026-08-25T23:59:59Z',
    rewardXp: 200,
    exerciseIds: ['ex-mc-cyl-01', 'ex-mc-cone-01', 'ex-mc-sph-01', 'ex-drag-01'],
    totalQuestions: 4,
    status: 'published',
    createdAt: '2026-08-15T10:00:00Z',
    submissionsCount: 15,
    averageScore: 7.9
  }
];

// 4. Initial Mock Submissions
const INITIAL_SUBMISSIONS: AssignmentSubmission[] = [
  {
    id: 'sub-001',
    assignmentId: 'asg-001',
    assignmentTitle: 'Bài tập tuần 1: Diện tích xung quanh & Thể tích Hình Trụ',
    studentId: 'usr-student-001',
    studentName: 'Nguyễn Văn Minh',
    className: 'Lớp 9A2',
    submittedAt: '2026-08-14T15:20:00Z',
    score: 10.0,
    totalQuestions: 4,
    correctCount: 4,
    timeSpentMinutes: 8,
    status: 'graded',
    teacherFeedback: 'Làm bài xuất sắc, trình bày chuẩn xác và nắm rất vững công thức!',
    answers: [
      {
        exerciseId: 'ex-mc-cyl-01',
        exerciseTitle: 'Tính diện tích xung quanh hình trụ',
        questionText: 'Một hình trụ có bán kính đáy r = 5 cm và chiều cao h = 12 cm. Diện tích xung quanh là:',
        studentAnswer: '120π cm²',
        correctAnswer: '120π cm²',
        isCorrect: true,
        scoreAwarded: 2.5
      },
      {
        exerciseId: 'ex-mc-cyl-02',
        exerciseTitle: 'Tính chiều cao hình trụ từ thể tích',
        questionText: 'Một hình trụ có thể tích V = 72π cm³ và bán kính đáy r = 3 cm. Chiều cao h là:',
        studentAnswer: '8 cm',
        correctAnswer: '8 cm',
        isCorrect: true,
        scoreAwarded: 2.5
      },
      {
        exerciseId: 'ex-num-cyl-01',
        exerciseTitle: 'Tính thể tích lon sữa đặc',
        questionText: 'Tính thể tích khối trụ có đường kính 8 cm và cao 10 cm.',
        studentAnswer: '502.4',
        correctAnswer: '502.4',
        isCorrect: true,
        scoreAwarded: 2.5
      },
      {
        exerciseId: 'ex-tf-cyl-01',
        exerciseTitle: 'Khẳng định đúng sai về hình trụ',
        questionText: 'Đánh giá các mệnh đề về thiết diện qua trục của hình trụ.',
        studentAnswer: 'Đúng toàn bộ',
        correctAnswer: 'Đúng toàn bộ',
        isCorrect: true,
        scoreAwarded: 2.5
      }
    ]
  },
  {
    id: 'sub-002',
    assignmentId: 'asg-001',
    assignmentTitle: 'Bài tập tuần 1: Diện tích xung quanh & Thể tích Hình Trụ',
    studentId: 'usr-student-002',
    studentName: 'Lê Thị Hương',
    className: 'Lớp 9A2',
    submittedAt: '2026-08-14T16:05:00Z',
    score: 10.0,
    totalQuestions: 4,
    correctCount: 4,
    timeSpentMinutes: 6,
    status: 'graded',
    teacherFeedback: 'Tuyệt vời, tốc độ làm bài nhanh và chính xác.',
    answers: []
  },
  {
    id: 'sub-003',
    assignmentId: 'asg-002',
    assignmentTitle: 'Thực hành mô hình: Đường sinh và Nón lá Hình Nón',
    studentId: 'usr-student-001',
    studentName: 'Nguyễn Văn Minh',
    className: 'Lớp 9A2',
    submittedAt: '2026-08-15T14:40:00Z',
    score: 6.7,
    totalQuestions: 3,
    correctCount: 2,
    timeSpentMinutes: 11,
    status: 'graded',
    teacherFeedback: 'Cần lưu ý phân biệt đường sinh l = √(h² + r²) với chiều cao h!',
    answers: [
      {
        exerciseId: 'ex-mc-cone-01',
        exerciseTitle: 'Tính đường sinh hình nón',
        questionText: 'Cho hình nón có r = 6 cm, h = 8 cm. Tính độ dài đường sinh l.',
        studentAnswer: '14 cm',
        correctAnswer: '10 cm',
        isCorrect: false,
        scoreAwarded: 0,
        errorType: 'conceptual_misunderstanding'
      },
      {
        exerciseId: 'ex-mc-cone-02',
        exerciseTitle: 'Diện tích xung quanh nón lá',
        questionText: 'Tính diện tích lá làm nón có r = 20 cm, l = 30 cm.',
        studentAnswer: '600π cm²',
        correctAnswer: '600π cm²',
        isCorrect: true,
        scoreAwarded: 3.33
      },
      {
        exerciseId: 'ex-num-cone-01',
        exerciseTitle: 'Thể tích khối nón cát',
        questionText: 'Tính thể tích khối nón cát r = 2m, h = 3m.',
        studentAnswer: '12.56',
        correctAnswer: '12.56',
        isCorrect: true,
        scoreAwarded: 3.34
      }
    ]
  }
];

// Helper to get local data or fallback
const getStorageItem = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn(`Could not read ${key} from localStorage`, e);
    return fallback;
  }
};

const setStorageItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Could not write ${key} to localStorage`, e);
  }
};

// ====================================================
// TEACHER SERVICE IMPLEMENTATION
// ====================================================

export const TeacherService = {
  // --------------------------------------------------
  // 1. Classes Management
  // --------------------------------------------------
  getClasses: (): SchoolClass[] => {
    return getStorageItem<SchoolClass[]>(STORAGE_CLASSES, INITIAL_CLASSES);
  },

  getClassById: (classId: string): SchoolClass | undefined => {
    const classes = TeacherService.getClasses();
    return classes.find((c) => c.id === classId);
  },

  createClass: (newClass: Omit<SchoolClass, 'id' | 'createdAt' | 'studentCount' | 'averageScore' | 'completionRate'>): SchoolClass => {
    const classes = TeacherService.getClasses();
    const created: SchoolClass = {
      ...newClass,
      id: `cls-${Date.now()}`,
      studentCount: 0,
      averageScore: 0,
      completionRate: 0,
      createdAt: new Date().toISOString()
    };

    const updated = [created, ...classes];
    setStorageItem(STORAGE_CLASSES, updated);
    return created;
  },

  updateClass: (classId: string, updates: Partial<SchoolClass>): SchoolClass | undefined => {
    const classes = TeacherService.getClasses();
    const index = classes.findIndex((c) => c.id === classId);
    if (index === -1) return undefined;

    classes[index] = { ...classes[index], ...updates };
    setStorageItem(STORAGE_CLASSES, classes);
    return classes[index];
  },

  deleteClass: (classId: string): boolean => {
    const classes = TeacherService.getClasses();
    const filtered = classes.filter((c) => c.id !== classId);
    setStorageItem(STORAGE_CLASSES, filtered);
    return true;
  },

  // --------------------------------------------------
  // 2. Students Management
  // --------------------------------------------------
  getStudents: (classId?: string): Student[] => {
    let list = getStorageItem<Student[]>(STORAGE_STUDENTS, INITIAL_STUDENTS);
    let migrated = false;
    list = list.map((s) => {
      if (s.school && (s.school.includes('Long Đức') || s.school.includes('Long Duc'))) {
        migrated = true;
        return { ...s, school: 'Trường Phổ Thông Thực Hành Sư Phạm' };
      }
      return s;
    });
    if (migrated) {
      setStorageItem(STORAGE_STUDENTS, list);
    }
    if (!classId || classId === 'all') {
      return list;
    }
    const cls = TeacherService.getClassById(classId);
    if (!cls) return list;
    return list.filter((s) => s.className === cls.name);
  },

  getStudentById: (studentId: string): Student | undefined => {
    const students = TeacherService.getStudents();
    return students.find((s) => s.id === studentId);
  },

  createStudent: (studentData: Partial<Student>): Student => {
    const list = TeacherService.getStudents();
    const newStudent: Student = {
      id: `usr-student-${Date.now()}`,
      email: studentData.email || `hs${Date.now()}@edu.vn`,
      fullName: studentData.fullName || 'Học Sinh Mới',
      role: 'student',
      grade: studentData.grade || 9,
      className: studentData.className || 'Lớp 9A2',
      school: studentData.school || 'Trường Phổ Thông Thực Hành Sư Phạm',
      level: 1,
      xp: 0,
      streakDays: 1,
      accuracyRate: studentData.accuracyRate || 85,
      targetExamScore: studentData.targetExamScore || 9.0,
      completedLessons: [],
      completedExercises: [],
      exploredShapes: ['cylinder'],
      badgesEarned: [],
      achievementsUnlocked: [],
      activeChallengeIds: [],
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    const updated = [newStudent, ...list];
    setStorageItem(STORAGE_STUDENTS, updated);
    return newStudent;
  },

  updateStudent: (studentId: string, updates: Partial<Student>): Student | undefined => {
    const list = TeacherService.getStudents();
    const index = list.findIndex((s) => s.id === studentId);
    if (index === -1) return undefined;

    list[index] = { ...list[index], ...updates };
    setStorageItem(STORAGE_STUDENTS, list);
    return list[index];
  },

  deleteStudent: (studentId: string): boolean => {
    const list = TeacherService.getStudents();
    const filtered = list.filter((s) => s.id !== studentId);
    setStorageItem(STORAGE_STUDENTS, filtered);
    return true;
  },

  // --------------------------------------------------
  // 3. Question Bank Management
  // --------------------------------------------------
  getQuestionBank: (filter?: {
    shape?: ShapeType | 'all';
    difficulty?: ExerciseDifficulty | 'all';
    type?: ExerciseType | 'all';
    search?: string;
  }): Exercise[] => {
    const customQuestions = getStorageItem<Exercise[]>(STORAGE_CUSTOM_QUESTIONS, []);
    const unifiedQuestions = getCachedUnifiedAssignmentBank().map(convertUnifiedToExercise);
    
    // Combine mock exercises, custom, and full unified question bank (avoiding duplicate IDs)
    const existingIds = new Set<string>();
    const allQuestions: Exercise[] = [];

    for (const q of [...ALL_MOCK_EXERCISES, ...customQuestions, ...unifiedQuestions]) {
      if (!existingIds.has(q.id)) {
        existingIds.add(q.id);
        allQuestions.push(q);
      }
    }


    if (!filter) return allQuestions;

    return allQuestions.filter((q) => {
      if (filter.shape && filter.shape !== 'all' && q.shapeId !== filter.shape) {
        return false;
      }
      if (filter.difficulty && filter.difficulty !== 'all' && q.difficulty !== filter.difficulty) {
        return false;
      }
      if (filter.type && filter.type !== 'all' && q.type !== filter.type) {
        return false;
      }
      if (filter.search && filter.search.trim()) {
        const term = filter.search.toLowerCase();
        const matchTitle = q.title.toLowerCase().includes(term);
        const matchQuestion = q.question.toLowerCase().includes(term);
        const matchTags = q.tags?.some((t) => t.toLowerCase().includes(term));
        if (!matchTitle && !matchQuestion && !matchTags) return false;
      }
      return true;
    });
  },

  addQuestionToBank: (newQuestion: Exercise): Exercise => {
    const customQuestions = getStorageItem<Exercise[]>(STORAGE_CUSTOM_QUESTIONS, []);
    const updated = [newQuestion, ...customQuestions];
    setStorageItem(STORAGE_CUSTOM_QUESTIONS, updated);
    return newQuestion;
  },

  // --------------------------------------------------
  // 4. Assignments Management (Giao nhiệm vụ)
  // --------------------------------------------------
  getAssignments: (classId?: string): Assignment[] => {
    const list = getStorageItem<Assignment[]>(STORAGE_ASSIGNMENTS, INITIAL_ASSIGNMENTS);
    if (!classId || classId === 'all') return list;
    return list.filter((a) => a.targetClassId === classId);
  },

  getAssignmentById: (assignmentId: string): Assignment | undefined => {
    const assignments = TeacherService.getAssignments();
    return assignments.find((a) => a.id === assignmentId);
  },

  createAssignment: (
    assignmentData: Omit<Assignment, 'id' | 'createdAt' | 'submissionsCount' | 'averageScore'>
  ): Assignment => {
    const assignments = TeacherService.getAssignments();
    const created: Assignment = {
      ...assignmentData,
      id: `asg-${Date.now()}`,
      submissionsCount: 0,
      averageScore: 0,
      createdAt: new Date().toISOString()
    };

    const updated = [created, ...assignments];
    setStorageItem(STORAGE_ASSIGNMENTS, updated);
    return created;
  },

  updateAssignmentStatus: (assignmentId: string, status: 'published' | 'draft' | 'closed'): Assignment | undefined => {
    const assignments = TeacherService.getAssignments();
    const index = assignments.findIndex((a) => a.id === assignmentId);
    if (index === -1) return undefined;

    assignments[index].status = status;
    setStorageItem(STORAGE_ASSIGNMENTS, assignments);
    return assignments[index];
  },

  deleteAssignment: (assignmentId: string): boolean => {
    const assignments = TeacherService.getAssignments();
    const filtered = assignments.filter((a) => a.id !== assignmentId);
    setStorageItem(STORAGE_ASSIGNMENTS, filtered);
    return true;
  },

  // --------------------------------------------------
  // 5. Submissions & Grading (Kết quả học sinh)
  // --------------------------------------------------
  getSubmissions: (assignmentId?: string): AssignmentSubmission[] => {
    const list = getStorageItem<AssignmentSubmission[]>(STORAGE_SUBMISSIONS, INITIAL_SUBMISSIONS);
    if (!assignmentId || assignmentId === 'all') return list;
    return list.filter((s) => s.assignmentId === assignmentId);
  },

  getStudentSubmissions: (studentId: string): AssignmentSubmission[] => {
    const list = TeacherService.getSubmissions();
    return list.filter((s) => s.studentId === studentId);
  },

  submitAssignment: (
    submission: Omit<AssignmentSubmission, 'id' | 'submittedAt' | 'status'>
  ): AssignmentSubmission => {
    const submissions = TeacherService.getSubmissions();
    const created: AssignmentSubmission = {
      ...submission,
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'graded'
    };

    const updated = [created, ...submissions];
    setStorageItem(STORAGE_SUBMISSIONS, updated);

    // Update assignment submission count & average score
    const assignments = TeacherService.getAssignments();
    const asgIdx = assignments.findIndex((a) => a.id === submission.assignmentId);
    if (asgIdx !== -1) {
      const asgSubmissions = updated.filter((s) => s.assignmentId === submission.assignmentId);
      const totalScore = asgSubmissions.reduce((acc, s) => acc + s.score, 0);
      assignments[asgIdx].submissionsCount = asgSubmissions.length;
      assignments[asgIdx].averageScore = Math.round((totalScore / asgSubmissions.length) * 10) / 10;
      setStorageItem(STORAGE_ASSIGNMENTS, assignments);
    }

    return created;
  },

  updateSubmissionFeedback: (submissionId: string, feedback: string): AssignmentSubmission | undefined => {
    const submissions = TeacherService.getSubmissions();
    const index = submissions.findIndex((s) => s.id === submissionId);
    if (index === -1) return undefined;

    submissions[index].teacherFeedback = feedback;
    setStorageItem(STORAGE_SUBMISSIONS, submissions);
    return submissions[index];
  },

  // --------------------------------------------------
  // 5.1 Learning Events Tracking (Theo dõi sự kiện học tập)
  // --------------------------------------------------
  recordLearningEvent: (
    event: Omit<LearningEvent, 'id' | 'timestamp'>
  ): LearningEvent => {
    const events = getStorageItem<LearningEvent[]>(STORAGE_LEARNING_EVENTS, []);
    const newEvent: LearningEvent = {
      ...event,
      id: `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString()
    };
    const updated = [newEvent, ...events].slice(0, 500); // Keep last 500 events
    setStorageItem(STORAGE_LEARNING_EVENTS, updated);
    return newEvent;
  },

  getLearningEvents: (studentId?: string, assignmentId?: string): LearningEvent[] => {
    const events = getStorageItem<LearningEvent[]>(STORAGE_LEARNING_EVENTS, []);
    return events.filter((e) => {
      if (studentId && e.studentId !== studentId) return false;
      if (assignmentId && e.assignmentId !== assignmentId) return false;
      return true;
    });
  },

  // --------------------------------------------------
  // 6. Common Errors Diagnosis (Phân tích lỗi thường gặp)
  // --------------------------------------------------
  getCommonErrorsAnalytics: (shapeId?: ShapeType | 'all') => {
    const errors = MOCK_STUDENT_ERRORS;
    const filtered = !shapeId || shapeId === 'all' ? errors : errors.filter((e) => e.shapeId === shapeId);

    const errorStats: Record<string, { count: number; title: string; shapeId: ShapeType; remedy: string; latex?: string }> = {
      formula_confusion: {
        count: 14,
        title: 'Nhầm lẫn giữa Diện tích xung quanh và Thể tích (Sxq vs V)',
        shapeId: 'cylinder',
        remedy: 'Nhấn mạnh đơn vị diện tích (cm²) là tích chu vi với chiều cao (2πrh), còn thể tích (cm³) là tích đáy với chiều cao (πr²h).',
        latex: 'S_{xq} = 2\\pi rh \\quad \\text{vs} \\quad V = \\pi r^2 h'
      },
      conceptual_misunderstanding: {
        count: 18,
        title: 'Nhầm lẫn giữa Đường sinh (l) và Chiều cao (h) của Hình Nón',
        shapeId: 'cone',
        remedy: 'Cho học sinh tương tác mặt cắt tam giác vuông SOA để nhận thức l là cạnh huyền: l = √(h² + r²).',
        latex: 'l = \\sqrt{h^2 + r^2} \\neq h + r'
      },
      variable_mixup: {
        count: 22,
        title: 'Nhầm lẫn giữa Đường kính (d) và Bán kính (R/r)',
        shapeId: 'sphere',
        remedy: 'Tạo thói quen luôn gạch chân đề bài và tính ngay bán kính R = d/2 trước khi áp dụng công thức.',
        latex: 'R = \\frac{d}{2} \\implies V = \\frac{4}{3}\\pi R^3'
      },
      cone_fraction_omission: {
        count: 16,
        title: 'Quên hệ số 1/3 trong thể tích hình nón',
        shapeId: 'cone',
        remedy: 'Trình chiếu mô phỏng thí nghiệm rót nước 3 cốc nón đầy mới rót đầy 1 cốc trụ tương ứng.',
        latex: 'V_{\\text{nón}} = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} V_{\\text{trụ}}'
      },
      sphere_power_confusion: {
        count: 11,
        title: 'Nhầm số mũ R² và R³ giữa Diện tích và Thể tích Mặt Cầu',
        shapeId: 'sphere',
        remedy: 'Diện tích mặt cầu là 4πR² (bậc 2, cm²), Thể tích khối cầu là (4/3)πR³ (bậc 3, cm³).',
        latex: 'S = 4\\pi R^2 \\quad \\text{và} \\quad V = \\frac{4}{3}\\pi R^3'
      }
    };

    return Object.entries(errorStats).map(([key, value]) => ({
      type: key,
      ...value
    }));
  },

  // --------------------------------------------------
  // 7. Comprehensive Class Reports & CSV Export
  // --------------------------------------------------
  getClassReport: (classId: string): TeacherClassReport => {
    const cls = TeacherService.getClassById(classId) || INITIAL_CLASSES[0];
    const students = TeacherService.getStudents(classId);

    return {
      classId: cls.id,
      className: cls.name,
      totalStudents: cls.studentCount || students.length,
      activeStudents: Math.round((cls.studentCount || students.length) * 0.95),
      averageAccuracy: 88.5,
      averageScore: cls.averageScore,
      theoriesCompletedPercent: cls.completionRate,
      exercisesCompletedCount: 142,
      shapesMastery: [
        {
          shapeId: 'cylinder',
          shapeName: 'Hình Trụ',
          masteryPercent: 92,
          commonErrorCount: 8
        },
        {
          shapeId: 'cone',
          shapeName: 'Hình Nón',
          masteryPercent: 81,
          commonErrorCount: 19
        },
        {
          shapeId: 'sphere',
          shapeName: 'Hình Cầu',
          masteryPercent: 86,
          commonErrorCount: 12
        }
      ],
      topWeaknesses: [
        {
          errorType: 'conceptual_misunderstanding',
          title: 'Tính toán đường sinh l = √(h² + r²) của Hình Nón',
          affectedStudentsCount: 12,
          recommendation: 'Tổ chức 15 phút luyện tập chuyên sâu hình nón cắt dọc và định lý Pythagore.'
        },
        {
          errorType: 'variable_mixup',
          title: 'Quên chia đôi đường kính d để lấy bán kính r',
          affectedStudentsCount: 9,
          recommendation: 'Nhắc nhở học sinh gạch chân từ khóa "đường kính" khi giải bài toán thực tế.'
        }
      ],
      topStudents: students.slice(0, 5).map((s) => ({
        studentId: s.id,
        studentName: s.fullName,
        xp: s.xp,
        score: s.targetExamScore || 9.0,
        streakDays: s.streakDays
      }))
    };
  },

  exportClassReportCSV: (classId: string): string => {
    const cls = TeacherService.getClassById(classId) || INITIAL_CLASSES[0];
    const students = TeacherService.getStudents(classId);
    const submissions = TeacherService.getSubmissions();

    let csvContent = 'STT,Họ và Tên,Lớp,Điểm Trung Bình,Cấp Độ,Điểm XP,Độ Chính Xác (%),Chuỗi Học (Ngày),Bài Tập Đã Nộp\n';

    students.forEach((student, index) => {
      const studentSubs = submissions.filter((s) => s.studentId === student.id);
      const avgScore = studentSubs.length > 0
        ? (studentSubs.reduce((a, b) => a + b.score, 0) / studentSubs.length).toFixed(1)
        : '8.5';

      csvContent += `${index + 1},"${student.fullName}","${student.className}",${avgScore},${student.level},${student.xp},${student.accuracyRate}%,${student.streakDays},${studentSubs.length}\n`;
    });

    return csvContent;
  },

  // --------------------------------------------------
  // 8. Teacher Profile & Authentication Management
  // --------------------------------------------------
  getTeacherProfile: (): Teacher => {
    return getStorageItem<Teacher>('geometry_lab_teacher_profile', MOCK_TEACHER);
  },

  updateTeacherProfile: (profile: Partial<Teacher>): Teacher => {
    const current = TeacherService.getTeacherProfile();
    const updated = { ...current, ...profile };
    setStorageItem('geometry_lab_teacher_profile', updated);
    return updated;
  },

  getDetailedProfile: (): TeacherProfile => {
    const defaultProf: TeacherProfile = {
      id: 'prof-teacher-001',
      userId: 'usr-teacher-001',
      fullName: 'Trần Ngọc Hiếu',
      title: 'Th.s',
      schoolName: 'Trường Phổ Thông Thực Hành Sư Phạm',
      department: 'Toán',
      specialization: 'Hình học không gian (Trụ - Nón - Cầu)',
      avatarInitials: 'TH',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      email: 'tranngochieu.toan9@longduc.edu.vn',
      createdAt: '2025-08-01T07:00:00Z',
      updatedAt: '2026-08-15T00:00:00Z'
    };
    const prof = getStorageItem<TeacherProfile>('geometry_lab_teacher_profile_v2', defaultProf);
    if (prof.schoolName && (prof.schoolName.includes('Long Đức') || prof.schoolName.includes('Long Duc'))) {
      prof.schoolName = 'Trường Phổ Thông Thực Hành Sư Phạm';
      setStorageItem('geometry_lab_teacher_profile_v2', prof);
    }
    return prof;
  },

  updateDetailedProfile: (profileUpdates: Partial<TeacherProfile>): TeacherProfile => {
    const current = TeacherService.getDetailedProfile();
    const updated = { ...current, ...profileUpdates, updatedAt: new Date().toISOString() };
    setStorageItem('geometry_lab_teacher_profile_v2', updated);
    return updated;
  },

  verifyPasswordAsync: async (password: string): Promise<boolean> => {
    return await TeacherAuthService.verifyPassword(password);
  },

  updatePasswordAsync: async (currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    return await TeacherAuthService.changePassword(currentPassword, newPassword);
  }
};
