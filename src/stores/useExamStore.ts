/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * EXAM STORE (ZUSTAND) - ÔN THI VÀO 10
 * Two-way state sync between Teacher Dashboard & Student Exam Preparation.
 */

import { create } from 'zustand';
import { TeacherService } from '../services/teacherService';
import { AssignmentSubmission } from '../types/dataArchitecture';

export interface ExamQuestionItem {
  id: string;
  questionText: string;
  latexFormula?: string;
  originalImageBase64?: string | null;
  svgCode?: string | null;
  options?: string[];
  correctAnswer: string;
  finalAnswer: string;
  stepByStepSolution: string[];
  topic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  publishedAt?: string;
  source?: string;
}

export interface StudentExamSubmission {
  id: string;
  studentName: string;
  className: string;
  questionId: string;
  questionText: string;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeSpentSeconds: number;
  submittedAt: string;
  scoreAwarded: number;
}

interface ExamState {
  publishedQuestions: ExamQuestionItem[];
  studentSubmissions: StudentExamSubmission[];
  activeExamTitle: string;
  publishExamQuestions: (questions: ExamQuestionItem[], title?: string) => void;
  submitAnswer: (submission: Omit<StudentExamSubmission, 'id' | 'submittedAt'>) => StudentExamSubmission;
  getStudentSubmissions: (studentName: string) => StudentExamSubmission[];
}

const STORAGE_PUBLISHED_EXAMS = 'geometry_lab_published_exams_v2';
const STORAGE_STUDENT_SUBMISSIONS = 'geometry_lab_student_submissions_v2';

// 4 Initial High-Quality Grade 9 Entrance Exam Questions
const DEFAULT_PUBLISHED_EXAMS: ExamQuestionItem[] = [
  {
    id: 'exam-entry-01',
    questionText: 'Một lon nước ngọt hình trụ có bán kính đáy $r = 3\\text{ cm}$ và chiều cao $h = 10\\text{ cm}$. Tính diện tích xung quanh $S_{xq}$ và thể tích $V$ của lon nước ngọt (lấy $\\pi \\approx 3{,}14$).',
    latexFormula: 'S_{xq} = 2\\pi r h, \\quad V = \\pi r^2 h',
    svgCode: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
  <defs>
    <linearGradient id="cylGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FDF0ED"/>
      <stop offset="50%" stop-color="#FFFDF8"/>
      <stop offset="100%" stop-color="#F9E2DC"/>
    </linearGradient>
  </defs>
  <line x1="150" y1="60" x2="150" y2="240" stroke="#ED806F" stroke-width="1.5" stroke-dasharray="5,4"/>
  <path d="M 60 240 A 90 25 0 0 1 240 240" fill="none" stroke="#ED806F" stroke-width="1.5" stroke-dasharray="4,4"/>
  <path d="M 60 240 A 90 25 0 0 0 240 240" fill="none" stroke="#3A302B" stroke-width="2"/>
  <line x1="60" y1="60" x2="60" y2="240" stroke="#3A302B" stroke-width="2"/>
  <line x1="240" y1="60" x2="240" y2="240" stroke="#3A302B" stroke-width="2"/>
  <ellipse cx="150" cy="60" rx="90" ry="25" fill="url(#cylGrad1)" stroke="#3A302B" stroke-width="2"/>
  <line x1="150" y1="240" x2="240" y2="240" stroke="#8F3E32" stroke-width="2" stroke-dasharray="4,3"/>
  <text x="195" y="232" font-size="13" font-weight="bold" fill="#8F3E32">r = 3 cm</text>
  <text x="250" y="155" font-size="13" font-weight="bold" fill="#3A302B">h = 10 cm</text>
  <circle cx="150" cy="60" r="3" fill="#3A302B"/>
  <text x="155" y="55" font-size="12" font-weight="bold" fill="#3A302B">O</text>
  <circle cx="150" cy="240" r="3" fill="#3A302B"/>
  <text x="155" y="258" font-size="12" font-weight="bold" fill="#3A302B">O'</text>
</svg>`,
    options: ['188.4 cm² và 282.6 cm³', '94.2 cm² và 141.3 cm³', '376.8 cm² và 565.2 cm³', '60 cm² và 90 cm³'],
    correctAnswer: '188.4 cm² và 282.6 cm³',
    finalAnswer: 'S_{xq} = 188{,}4\\text{ cm}^2; \\quad V = 282{,}6\\text{ cm}^3',
    stepByStepSolution: [
      '**Bước 1: Tính diện tích xung quanh**\nÁp dụng công thức $S_{xq} = 2\\pi r h$:\n$$S_{xq} = 2 \\times 3{,}14 \\times 3 \\times 10 = 188{,}4\\text{ (cm}^2\\text{)}$$',
      '**Bước 2: Tính thể tích lon nước**\nÁp dụng công thức thể tích $V = \\pi r^2 h$:\n$$V = 3{,}14 \\times 3^2 \\times 10 = 3{,}14 \\times 9 \\times 10 = 282{,}6\\text{ (cm}^3\\text{)}$$',
      '**Bước 3: Kết luận**\nVậy diện tích xung quanh lon nước là $188{,}4\\text{ cm}^2$ và thể tích là $282{,}6\\text{ cm}^3$.'
    ],
    topic: 'Hình Trụ',
    difficulty: 'easy',
    publishedAt: '2026-08-15T08:00:00Z'
  },
  {
    id: 'exam-entry-02',
    questionText: 'Một chiếc nón lá truyền thống có dạng hình nón với đường kính đáy $d = 40\\text{ cm}$ và độ dài đường sinh $l = 25\\text{ cm}$. Tính chiều cao $h$ và diện tích lá cần dùng để phủ kín mặt xung quanh chiếc nón lá (lấy $\\pi \\approx 3{,}14$).',
    latexFormula: 'h = \\sqrt{l^2 - r^2}, \\quad S_{xq} = \\pi r l',
    svgCode: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
  <defs>
    <linearGradient id="coneGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF8E7"/>
      <stop offset="100%" stop-color="#F2DFB8"/>
    </linearGradient>
  </defs>
  <line x1="150" y1="40" x2="150" y2="240" stroke="#ED806F" stroke-width="1.5" stroke-dasharray="5,4"/>
  <path d="M 50 240 A 100 25 0 0 1 250 240" fill="none" stroke="#ED806F" stroke-width="1.5" stroke-dasharray="4,4"/>
  <path d="M 50 240 A 100 25 0 0 0 250 240" fill="none" stroke="#3A302B" stroke-width="2"/>
  <path d="M 50 240 L 150 40 L 250 240" fill="url(#coneGrad1)" stroke="#3A302B" stroke-width="2" fill-opacity="0.7"/>
  <line x1="150" y1="240" x2="250" y2="240" stroke="#8F3E32" stroke-width="2" stroke-dasharray="4,3"/>
  <circle cx="150" cy="40" r="3.5" fill="#3A302B"/>
  <text x="145" y="30" font-size="13" font-weight="bold" fill="#3A302B">S</text>
  <circle cx="150" cy="240" r="3" fill="#3A302B"/>
  <text x="140" y="258" font-size="12" font-weight="bold" fill="#3A302B">O</text>
  <text x="185" y="232" font-size="12" font-weight="bold" fill="#8F3E32">r = 20 cm</text>
  <text x="210" y="130" font-size="12" font-weight="bold" fill="#3A302B">l = 25 cm</text>
  <text x="120" y="150" font-size="12" font-weight="bold" fill="#ED806F">h = 15 cm</text>
</svg>`,
    options: ['h = 15 cm; Sxq = 1570 cm²', 'h = 20 cm; Sxq = 1256 cm²', 'h = 15 cm; Sxq = 3140 cm²', 'h = 12 cm; Sxq = 1884 cm²'],
    correctAnswer: 'h = 15 cm; Sxq = 1570 cm²',
    finalAnswer: 'h = 15\\text{ cm}; \\quad S_{xq} = 1570\\text{ cm}^2',
    stepByStepSolution: [
      '**Bước 1: Tính bán kính đáy $r$**\nBán kính đáy của chiếc nón lá là:\n$$r = \\frac{d}{2} = \\frac{40}{2} = 20\\text{ (cm)}$$',
      '**Bước 2: Tính chiều cao $h$ bằng định lý Pythagore**\nXét tam giác vuông $SOB$ vuông tại $O$:\n$$h = \\sqrt{l^2 - r^2} = \\sqrt{25^2 - 20^2} = \\sqrt{625 - 400} = \\sqrt{225} = 15\\text{ (cm)}$$',
      '**Bước 3: Tính diện tích lá xung quanh**\nÁp dụng công thức $S_{xq} = \\pi r l$:\n$$S_{xq} = 3{,}14 \\times 20 \\times 25 = 1570\\text{ (cm}^2\\text{)}$$'
    ],
    topic: 'Hình Nón',
    difficulty: 'medium',
    publishedAt: '2026-08-15T08:00:00Z'
  },
  {
    id: 'exam-entry-03',
    questionText: 'Một quả bóng đá tiêu chuẩn số 5 có chu vi đường tròn lớn bằng $68{,}5\\text{ cm}$. Tính thể tích không khí chứa bên trong quả bóng theo $\\text{cm}^3$ (lấy $\\pi \\approx 3{,}1416$, làm tròn đến chữ số thập phân thứ nhất).',
    latexFormula: 'C = 2\\pi R \\implies R = \\frac{C}{2\\pi}, \\quad V = \\frac{4}{3}\\pi R^3',
    svgCode: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
  <defs>
    <radialGradient id="ballGrad1" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="#EBE5D8"/>
      <stop offset="100%" stop-color="#C5BCAE"/>
    </radialGradient>
  </defs>
  <circle cx="150" cy="150" r="100" fill="url(#ballGrad1)" stroke="#3A302B" stroke-width="2"/>
  <path d="M 50 150 A 100 30 0 0 1 250 150" fill="none" stroke="#ED806F" stroke-width="1.5" stroke-dasharray="4,4"/>
  <path d="M 50 150 A 100 30 0 0 0 250 150" fill="none" stroke="#3A302B" stroke-width="1.5"/>
  <line x1="150" y1="150" x2="250" y2="150" stroke="#8F3E32" stroke-width="2"/>
  <circle cx="150" cy="150" r="3.5" fill="#3A302B"/>
  <text x="145" y="140" font-size="13" font-weight="bold" fill="#3A302B">O</text>
  <text x="185" y="142" font-size="12" font-weight="bold" fill="#8F3E32">R ≈ 10.9 cm</text>
</svg>`,
    options: ['5424.6 cm³', '542.5 cm³', '1808.2 cm³', '7232.8 cm³'],
    correctAnswer: '5424.6 cm³',
    finalAnswer: 'V \\approx 5424{,}6\\text{ cm}^3',
    stepByStepSolution: [
      '**Bước 1: Tính bán kính quả bóng $R$ từ chu vi**\nTa có chu vi đường tròn lớn $C = 2\\pi R$:\n$$R = \\frac{C}{2\\pi} = \\frac{68{,}5}{2 \\times 3{,}1416} \\approx 10{,}902\\text{ (cm)}$$',
      '**Bước 2: Tính thể tích quả bóng**\nÁp dụng công thức thể tích hình cầu $V = \\frac{4}{3}\\pi R^3$:\n$$V = \\frac{4}{3} \\times 3{,}1416 \\times (10{,}902)^3 \\approx \\frac{4}{3} \\times 3{,}1416 \\times 1295{,}78 \\approx 5424{,}6\\text{ (cm}^3\\text{)}$$'
    ],
    topic: 'Hình Cầu',
    difficulty: 'hard',
    publishedAt: '2026-08-15T08:00:00Z'
  }
];

const loadInitialPublished = (): ExamQuestionItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_PUBLISHED_EXAMS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load published exams from localStorage', e);
  }
  return DEFAULT_PUBLISHED_EXAMS;
};

const loadInitialSubmissions = (): StudentExamSubmission[] => {
  try {
    const raw = localStorage.getItem(STORAGE_STUDENT_SUBMISSIONS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load student submissions from localStorage', e);
  }
  return [];
};

export const useExamStore = create<ExamState>((set, get) => ({
  publishedQuestions: loadInitialPublished(),
  studentSubmissions: loadInitialSubmissions(),
  activeExamTitle: 'Đề Luyện Thi Tuyển Sinh Vào Lớp 10 - Chuyên Đề Hình Học Không Gian',

  publishExamQuestions: (questions: ExamQuestionItem[], title?: string) => {
    const cleanQuestions = questions.map((q, idx) => ({
      ...q,
      id: q.id || `exam-pub-${Date.now()}-${idx}`,
      publishedAt: new Date().toISOString()
    }));

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_PUBLISHED_EXAMS, JSON.stringify(cleanQuestions));
    }

    set({
      publishedQuestions: cleanQuestions,
      activeExamTitle: title || 'Bộ Đề Ôn Thi Vào 10 Mới Nhất'
    });
  },

  submitAnswer: (submissionData) => {
    const newSubmission: StudentExamSubmission = {
      ...submissionData,
      id: `sub-exam-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      submittedAt: new Date().toISOString()
    };

    const currentSubmissions = get().studentSubmissions;
    const updatedSubmissions = [newSubmission, ...currentSubmissions];

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_STUDENT_SUBMISSIONS, JSON.stringify(updatedSubmissions));
    }

    set({ studentSubmissions: updatedSubmissions });

    // BACKGROUND SYNC WITH TEACHER DASHBOARD (TeacherService)
    try {
      TeacherService.submitAssignment({
        assignmentId: 'asg-003', // Chuyên đề ôn thi vào 10
        assignmentTitle: 'Chuyên đề Ôn thi vào 10: Tổng hợp Trụ - Nón - Cầu',
        studentId: 'usr-student-live',
        studentName: newSubmission.studentName,
        className: newSubmission.className || 'Lớp 9A2',
        score: newSubmission.isCorrect ? 10.0 : 4.0,
        totalQuestions: 1,
        correctCount: newSubmission.isCorrect ? 1 : 0,
        timeSpentMinutes: Math.max(1, Math.round(newSubmission.timeSpentSeconds / 60)),
        teacherFeedback: newSubmission.isCorrect
          ? 'Bài giải chính xác, hiểu bài rất tốt!'
          : 'Cần kiểm tra kỹ các bước biến đổi công thức và đơn vị tính.',
        answers: [
          {
            exerciseId: newSubmission.questionId,
            exerciseTitle: 'Câu hỏi Ôn thi vào 10',
            questionText: newSubmission.questionText,
            studentAnswer: newSubmission.studentAnswer,
            correctAnswer: newSubmission.correctAnswer,
            isCorrect: newSubmission.isCorrect,
            scoreAwarded: newSubmission.scoreAwarded
          }
        ]
      });
    } catch (err) {
      console.warn('Background sync with TeacherService warning:', err);
    }

    return newSubmission;
  },

  getStudentSubmissions: (studentName: string) => {
    const list = get().studentSubmissions;
    return list.filter((s) => s.studentName.toLowerCase() === studentName.toLowerCase());
  }
}));
