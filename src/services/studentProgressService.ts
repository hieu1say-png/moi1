/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Student Progress & Learning Journey Service
 * Communicates with server-side persistent progress APIs with localStorage fallback.
 */

import { ShapeType } from '../types';

export type ActivityStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface ActivityProgress {
  activityId: 'video' | 'theory' | 'explore3d' | 'realworld' | 'practice';
  title: string;
  status: ActivityStatus;
  startedAt?: string;
  completedAt?: string;
  score?: number;
  questionsTotal?: number;
  questionsCorrect?: number;
  details?: Record<string, any>;
}

export interface TopicProgress {
  topicId: ShapeType;
  topicName: string;
  overallStatus: ActivityStatus;
  percent: number;
  overallProgress?: number;
  videoStarted: boolean;
  videoCompleted: boolean;
  videoProgress: number;
  activities: Record<string, ActivityProgress>;
  practiceQuestionsCorrect: number;
  practiceQuestionsTotal: number;
  weaknesses: string[];
  lastAccessedAt: string;
}

export interface StudentProgressRecord {
  studentId: string;
  studentName: string;
  className: string;
  lastActiveTopic: ShapeType;
  lastActiveStep: number;
  topics: Record<ShapeType, TopicProgress>;
  totalXp: number;
  updatedAt: string;
}

export interface TeacherStudentRow {
  studentId: string;
  studentName: string;
  className: string;
  videoCylinderWatched: boolean;
  videoSphereWatched: boolean;
  videoConeWatched: boolean;
  practiceCompleted: boolean;
  totalCorrect: number;
  totalQuestions: number;
  accuracyRate: number;
  strengths: string[];
  weaknesses: string[];
}

export interface ClassFrequentError {
  errorDesc: string;
  affectedCount: number;
  topicName: string;
  recommendedAction: string;
  topic?: string;
  percentage?: number;
  description?: string;
  recommendation?: string;
}

export interface ClassAnalyticsSummary {
  totalStudents: number;
  videoCompletionRate: number;
  practiceAccuracyAverage: number;
  avgCylinder: number;
  avgSphere: number;
  avgCone: number;
  frequentErrors: ClassFrequentError[];
}

const LOCAL_STORAGE_KEY = 'geometry_lab_student_progress';

export class StudentProgressService {
  private static cachedProgress: StudentProgressRecord | null = null;
  private static listeners: ((record: StudentProgressRecord) => void)[] = [];

  public static subscribe(listener: (record: StudentProgressRecord) => void): () => void {
    this.listeners.push(listener);
    if (this.cachedProgress) {
      listener(this.cachedProgress);
    }
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private static notify(record: StudentProgressRecord) {
    this.cachedProgress = record;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(record));
    } catch (e) {
      console.warn('[ProgressService] Failed to cache to localStorage', e);
    }
    this.listeners.forEach((l) => l(record));
  }

  public static async fetchProgress(studentId: string = 'usr-student-001', studentName = 'Nguyễn Văn Minh', className = '8A9'): Promise<StudentProgressRecord> {
    try {
      const res = await fetch(`/api/progress/${studentId}?studentName=${encodeURIComponent(studentName)}&className=${encodeURIComponent(className)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.record) {
          this.notify(data.record);
          return data.record;
        }
      }
    } catch (err) {
      console.warn('[ProgressService] Network fetch failed, reading fallback from localStorage', err);
    }

    // LocalStorage fallback
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.cachedProgress = parsed;
        return parsed;
      } catch (e) {
        // pass
      }
    }

    // Default structure
    const def = this.createDefaultRecord(studentId, studentName, className);
    this.notify(def);
    return def;
  }

  public static async updateActivity(
    studentId: string,
    topicId: ShapeType,
    activityId: 'video' | 'theory' | 'explore3d' | 'realworld' | 'practice',
    status: ActivityStatus,
    extra?: {
      stepIndex?: number;
      score?: number;
      videoProgress?: number;
      questionsCorrect?: number;
      questionsTotal?: number;
      weaknesses?: string[];
    }
  ): Promise<StudentProgressRecord> {
    try {
      const res = await fetch('/api/progress/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          topicId,
          activityId,
          status,
          ...extra
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.record) {
          this.notify(data.record);
          return data.record;
        }
      }
    } catch (err) {
      console.warn('[ProgressService] Server sync failed, updating locally', err);
    }

    // Fallback: update cached
    const current = this.cachedProgress || this.createDefaultRecord(studentId, 'Học sinh', '8A9');
    current.lastActiveTopic = topicId;
    if (extra?.stepIndex) current.lastActiveStep = extra.stepIndex;

    const topic = current.topics[topicId];
    if (topic && topic.activities[activityId]) {
      const act = topic.activities[activityId];
      act.status = status;
      if (status === 'IN_PROGRESS' && !act.startedAt) act.startedAt = new Date().toISOString();
      if (status === 'COMPLETED') act.completedAt = new Date().toISOString();
      if (extra?.score !== undefined) act.score = extra.score;

      if (activityId === 'video') {
        if (status === 'IN_PROGRESS' || status === 'COMPLETED') topic.videoStarted = true;
        if (status === 'COMPLETED') {
          topic.videoCompleted = true;
          topic.videoProgress = 15;
        }
        if (extra?.videoProgress !== undefined) topic.videoProgress = extra.videoProgress;
      }

      if (activityId === 'practice') {
        if (extra?.questionsCorrect !== undefined) topic.practiceQuestionsCorrect = extra.questionsCorrect;
        if (extra?.questionsTotal !== undefined) topic.practiceQuestionsTotal = extra.questionsTotal;
        if (extra?.weaknesses) {
          topic.weaknesses = Array.from(new Set([...topic.weaknesses, ...extra.weaknesses]));
        }
      }

      let completedCount = 0;
      const acts = Object.values(topic.activities);
      acts.forEach((a) => {
        if (a.status === 'COMPLETED') completedCount += 1;
        else if (a.status === 'IN_PROGRESS') completedCount += 0.5;
      });
      topic.percent = Math.round((completedCount / acts.length) * 100);
      topic.overallStatus = topic.percent === 100 ? 'COMPLETED' : topic.percent > 0 ? 'IN_PROGRESS' : 'NOT_STARTED';
      topic.lastAccessedAt = new Date().toISOString();
    }

    current.updatedAt = new Date().toISOString();
    this.notify(current);
    return current;
  }

  public static async fetchTeacherStudentsProgress(className?: string): Promise<TeacherStudentRow[]> {
    try {
      const query = className ? `?className=${encodeURIComponent(className)}` : '';
      const res = await fetch(`/api/teacher/students-progress${query}`, {
        headers: {
          'x-user-role': 'teacher',
          'Authorization': 'Bearer usr-teacher-001'
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.records && Array.isArray(data.records)) {
          return data.records.map((r: StudentProgressRecord): TeacherStudentRow => {
            const cyl = r.topics.cylinder;
            const sph = r.topics.sphere;
            const con = r.topics.cone;

            const totalCorrect = (cyl?.practiceQuestionsCorrect || 0) + (sph?.practiceQuestionsCorrect || 0) + (con?.practiceQuestionsCorrect || 0);
            const totalQuestions = (cyl?.practiceQuestionsTotal || 5) + (sph?.practiceQuestionsTotal || 5) + (con?.practiceQuestionsTotal || 5);
            const accuracyRate = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

            const strengths: string[] = [];
            if ((cyl?.percent || 0) >= 80) strengths.push('Hình trụ vững');
            if ((sph?.percent || 0) >= 80) strengths.push('Hình cầu tốt');
            if ((con?.percent || 0) >= 80) strengths.push('Hình nón chắc');

            const weaknesses: string[] = [];
            if (cyl?.weaknesses) weaknesses.push(...cyl.weaknesses);
            if (sph?.weaknesses) weaknesses.push(...sph.weaknesses);
            if (con?.weaknesses) weaknesses.push(...con.weaknesses);

            const practiceCompleted =
              cyl?.activities?.practice?.status === 'COMPLETED' ||
              sph?.activities?.practice?.status === 'COMPLETED' ||
              con?.activities?.practice?.status === 'COMPLETED';

            return {
              studentId: r.studentId,
              studentName: r.studentName,
              className: r.className,
              videoCylinderWatched: cyl?.videoCompleted ?? false,
              videoSphereWatched: sph?.videoCompleted ?? false,
              videoConeWatched: con?.videoCompleted ?? false,
              practiceCompleted,
              totalCorrect,
              totalQuestions,
              accuracyRate,
              strengths: strengths.length > 0 ? strengths : ['Đang hoàn thiện kiến thức'],
              weaknesses: Array.from(new Set(weaknesses))
            };
          });
        }
      }
    } catch (err) {
      console.error('[ProgressService] fetchTeacherStudentsProgress failed', err);
    }
    return [];
  }

  public static async fetchTeacherClassAnalytics(className?: string): Promise<ClassAnalyticsSummary | null> {
    try {
      const query = className ? `?className=${encodeURIComponent(className)}` : '';
      const res = await fetch(`/api/teacher/class-analytics${query}`, {
        headers: {
          'x-user-role': 'teacher',
          'Authorization': 'Bearer usr-teacher-001'
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.analytics) {
          const a = data.analytics;
          const frequentErrors: ClassFrequentError[] = [
            {
              errorDesc: 'Nhầm lẫn giữa đường sinh l và chiều cao h của hình nón',
              affectedCount: Math.max(3, Math.round((a.totalStudents || 6) * 0.45)),
              topicName: 'Hình Nón',
              recommendedAction: 'Giao phiếu bài tập trắc nghiệm phân biệt l và h với mô hình 3D cắt dọc.'
            },
            {
              errorDesc: 'Quên chia 3 trong công thức thể tích hình nón: V = 1/3 π r² h',
              affectedCount: Math.max(2, Math.round((a.totalStudents || 6) * 0.35)),
              topicName: 'Hình Nón & Hình Trụ',
              recommendedAction: 'Cho học sinh xem lại thí nghiệm rót nước 3D (Nghịch lý 1/3).'
            },
            {
              errorDesc: 'Nhầm lẫn giữa diện tích mặt cầu S = 4πR² và chu vi đường tròn lớn',
              affectedCount: Math.max(2, Math.round((a.totalStudents || 6) * 0.25)),
              topicName: 'Hình Cầu',
              recommendedAction: 'Giao bài tập tính diện tích da bọc bóng đá quả cầu thực tế.'
            }
          ];

          return {
            totalStudents: a.totalStudents || 0,
            videoCompletionRate: 85,
            practiceAccuracyAverage: 82,
            avgCylinder: a.avgCylinder || 0,
            avgSphere: a.avgSphere || 0,
            avgCone: a.avgCone || 0,
            frequentErrors
          };
        }
      }
    } catch (err) {
      console.error('[ProgressService] fetchTeacherClassAnalytics failed', err);
    }
    return null;
  }

  private static createDefaultRecord(studentId: string, studentName: string, className: string): StudentProgressRecord {
    return {
      studentId,
      studentName,
      className,
      lastActiveTopic: 'cylinder',
      lastActiveStep: 1,
      totalXp: 120,
      updatedAt: new Date().toISOString(),
      topics: {
        cylinder: {
          topicId: 'cylinder',
          topicName: 'Hình Trụ',
          overallStatus: 'NOT_STARTED',
          percent: 0,
          videoStarted: false,
          videoCompleted: false,
          videoProgress: 0,
          activities: {
            video: { activityId: 'video', title: 'Xem Video Bài Học', status: 'NOT_STARTED' },
            theory: { activityId: 'theory', title: 'Khám Phá Kiến Thức', status: 'NOT_STARTED' },
            explore3d: { activityId: 'explore3d', title: 'Khám Phá 3D', status: 'NOT_STARTED' },
            realworld: { activityId: 'realworld', title: 'Ứng Dụng Thực Tiễn', status: 'NOT_STARTED' },
            practice: { activityId: 'practice', title: 'Luyện Tập Trắc Nghiệm', status: 'NOT_STARTED' }
          },
          practiceQuestionsCorrect: 0,
          practiceQuestionsTotal: 5,
          weaknesses: [],
          lastAccessedAt: new Date().toISOString()
        },
        sphere: {
          topicId: 'sphere',
          topicName: 'Hình Cầu',
          overallStatus: 'NOT_STARTED',
          percent: 0,
          videoStarted: false,
          videoCompleted: false,
          videoProgress: 0,
          activities: {
            video: { activityId: 'video', title: 'Xem Video Bài Học', status: 'NOT_STARTED' },
            theory: { activityId: 'theory', title: 'Khám Phá Kiến Thức', status: 'NOT_STARTED' },
            explore3d: { activityId: 'explore3d', title: 'Khám Phá 3D', status: 'NOT_STARTED' },
            realworld: { activityId: 'realworld', title: 'Ứng Dụng Thực Tiễn', status: 'NOT_STARTED' },
            practice: { activityId: 'practice', title: 'Luyện Tập Trắc Nghiệm', status: 'NOT_STARTED' }
          },
          practiceQuestionsCorrect: 0,
          practiceQuestionsTotal: 5,
          weaknesses: [],
          lastAccessedAt: new Date().toISOString()
        },
        cone: {
          topicId: 'cone',
          topicName: 'Hình Nón',
          overallStatus: 'NOT_STARTED',
          percent: 0,
          videoStarted: false,
          videoCompleted: false,
          videoProgress: 0,
          activities: {
            video: { activityId: 'video', title: 'Xem Video Bài Học', status: 'NOT_STARTED' },
            theory: { activityId: 'theory', title: 'Khám Phá Kiến Thức', status: 'NOT_STARTED' },
            explore3d: { activityId: 'explore3d', title: 'Khám Phá 3D', status: 'NOT_STARTED' },
            realworld: { activityId: 'realworld', title: 'Ứng Dụng Thực Tiễn', status: 'NOT_STARTED' },
            practice: { activityId: 'practice', title: 'Luyện Tập Trắc Nghiệm', status: 'NOT_STARTED' }
          },
          practiceQuestionsCorrect: 0,
          practiceQuestionsTotal: 5,
          weaknesses: [],
          lastAccessedAt: new Date().toISOString()
        }
      }
    };
  }
}
