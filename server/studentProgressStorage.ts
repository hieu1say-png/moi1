/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Persistent Student Progress & Assessment Storage
 * Server-side JSON file persistence for student learning journeys,
 * activity statuses, quiz attempts, and class-level pedagogical analytics.
 */

import fs from 'fs';
import path from 'path';
import { DATA_DIR } from './theoryVideoStorage';

export type ActivityStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface ActivityProgress {
  activityId: 'video' | 'theory' | 'explore3d' | 'realworld' | 'practice';
  title: string;
  status: ActivityStatus;
  startedAt?: string;
  completedAt?: string;
  score?: number; // e.g. 100 for video/theory/3d when completed, 0-100 for practice
  details?: Record<string, any>;
}

export interface TopicProgress {
  topicId: 'cylinder' | 'sphere' | 'cone';
  topicName: string;
  overallStatus: ActivityStatus;
  percent: number; // 0 to 100%
  videoStarted: boolean;
  videoCompleted: boolean;
  videoProgress: number; // seconds or 0-100%
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
  lastActiveTopic: 'cylinder' | 'sphere' | 'cone';
  lastActiveStep: number; // 1 to 6
  topics: Record<'cylinder' | 'sphere' | 'cone', TopicProgress>;
  totalXp: number;
  updatedAt: string;
}

const PROGRESS_FILE = path.join(DATA_DIR, 'student_progress.json');
const ATTEMPTS_FILE = path.join(DATA_DIR, 'student_attempts.json');

function getDefaultTopicProgress(topicId: 'cylinder' | 'sphere' | 'cone', name: string): TopicProgress {
  return {
    topicId,
    topicName: name,
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
  };
}

function calculateTopicPercent(topic: TopicProgress): number {
  let completedCount = 0;
  const acts = Object.values(topic.activities);
  acts.forEach((a) => {
    if (a.status === 'COMPLETED') completedCount += 1;
    else if (a.status === 'IN_PROGRESS') completedCount += 0.5;
  });
  return Math.round((completedCount / acts.length) * 100);
}

export class StudentProgressStorage {
  private static cache: Record<string, StudentProgressRecord> = {};
  private static isInitialized = false;

  public static initialize(): void {
    if (this.isInitialized) return;
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(PROGRESS_FILE)) {
        const raw = fs.readFileSync(PROGRESS_FILE, 'utf-8');
        this.cache = JSON.parse(raw);
      } else {
        // Seed initial class records including 8A9, 9A1, 9A2 as specified in Section XVIII
        this.seedInitialData();
        this.saveToFile();
      }
      this.isInitialized = true;
      console.log(`[PROGRESS STORAGE] Initialized with ${Object.keys(this.cache).length} student records.`);
    } catch (err) {
      console.error('[PROGRESS STORAGE] Initialization error:', err);
      this.cache = {};
      this.isInitialized = true;
    }
  }

  private static seedInitialData(): void {
    const students = [
      { id: 'usr-student-001', name: 'Nguyễn Văn Minh', className: '8A9', cyl: 90, sph: 60, con: 20 },
      { id: 'usr-student-002', name: 'Trần Thị Bảo Ngọc', className: '8A9', cyl: 100, sph: 80, con: 70 },
      { id: 'usr-student-003', name: 'Lê Hoàng Long', className: '8A9', cyl: 70, sph: 50, con: 40 },
      { id: 'usr-student-004', name: 'Phạm Thu Thảo', className: '9A1', cyl: 85, sph: 90, con: 60 },
      { id: 'usr-student-005', name: 'Đỗ Đức Anh', className: '9A1', cyl: 60, sph: 40, con: 80 },
      { id: 'usr-student-006', name: 'Vũ Hải Yến', className: '9A2', cyl: 100, sph: 95, con: 90 }
    ];

    students.forEach((s) => {
      const rec: StudentProgressRecord = {
        studentId: s.id,
        studentName: s.name,
        className: s.className,
        lastActiveTopic: 'cylinder',
        lastActiveStep: 2,
        totalXp: 350,
        updatedAt: new Date().toISOString(),
        topics: {
          cylinder: {
            topicId: 'cylinder',
            topicName: 'Hình Trụ',
            overallStatus: s.cyl >= 80 ? 'COMPLETED' : 'IN_PROGRESS',
            percent: s.cyl,
            videoStarted: true,
            videoCompleted: s.cyl >= 40,
            videoProgress: 15,
            activities: {
              video: { activityId: 'video', title: 'Xem Video Bài Học', status: s.cyl >= 20 ? 'COMPLETED' : 'IN_PROGRESS' },
              theory: { activityId: 'theory', title: 'Khám Phá Kiến Thức', status: s.cyl >= 40 ? 'COMPLETED' : 'NOT_STARTED' },
              explore3d: { activityId: 'explore3d', title: 'Khám Phá 3D', status: s.cyl >= 60 ? 'COMPLETED' : 'NOT_STARTED' },
              realworld: { activityId: 'realworld', title: 'Ứng Dụng Thực Tiễn', status: s.cyl >= 80 ? 'COMPLETED' : 'NOT_STARTED' },
              practice: { activityId: 'practice', title: 'Luyện Tập Trắc Nghiệm', status: s.cyl >= 90 ? 'COMPLETED' : 'IN_PROGRESS' }
            },
            practiceQuestionsCorrect: Math.round((s.cyl / 100) * 5),
            practiceQuestionsTotal: 5,
            weaknesses: s.cyl < 70 ? ['Thể tích hình trụ'] : [],
            lastAccessedAt: new Date().toISOString()
          },
          sphere: {
            topicId: 'sphere',
            topicName: 'Hình Cầu',
            overallStatus: s.sph >= 80 ? 'COMPLETED' : 'IN_PROGRESS',
            percent: s.sph,
            videoStarted: true,
            videoCompleted: s.sph >= 40,
            videoProgress: 15,
            activities: {
              video: { activityId: 'video', title: 'Xem Video Bài Học', status: s.sph >= 20 ? 'COMPLETED' : 'NOT_STARTED' },
              theory: { activityId: 'theory', title: 'Khám Phá Kiến Thức', status: s.sph >= 40 ? 'COMPLETED' : 'NOT_STARTED' },
              explore3d: { activityId: 'explore3d', title: 'Khám Phá 3D', status: s.sph >= 60 ? 'COMPLETED' : 'NOT_STARTED' },
              realworld: { activityId: 'realworld', title: 'Ứng Dụng Thực Tiễn', status: s.sph >= 80 ? 'COMPLETED' : 'NOT_STARTED' },
              practice: { activityId: 'practice', title: 'Luyện Tập Trắc Nghiệm', status: s.sph >= 90 ? 'COMPLETED' : 'NOT_STARTED' }
            },
            practiceQuestionsCorrect: Math.round((s.sph / 100) * 5),
            practiceQuestionsTotal: 5,
            weaknesses: s.sph < 70 ? ['Diện tích mặt cầu và bán kính R'] : [],
            lastAccessedAt: new Date().toISOString()
          },
          cone: {
            topicId: 'cone',
            topicName: 'Hình Nón',
            overallStatus: s.con >= 80 ? 'COMPLETED' : 'IN_PROGRESS',
            percent: s.con,
            videoStarted: s.con > 10,
            videoCompleted: s.con >= 40,
            videoProgress: s.con > 10 ? 15 : 0,
            activities: {
              video: { activityId: 'video', title: 'Xem Video Bài Học', status: s.con >= 20 ? 'COMPLETED' : 'NOT_STARTED' },
              theory: { activityId: 'theory', title: 'Khám Phá Kiến Thức', status: s.con >= 40 ? 'COMPLETED' : 'NOT_STARTED' },
              explore3d: { activityId: 'explore3d', title: 'Khám Phá 3D', status: s.con >= 60 ? 'COMPLETED' : 'NOT_STARTED' },
              realworld: { activityId: 'realworld', title: 'Ứng Dụng Thực Tiễn', status: s.con >= 80 ? 'COMPLETED' : 'NOT_STARTED' },
              practice: { activityId: 'practice', title: 'Luyện Tập Trắc Nghiệm', status: s.con >= 90 ? 'COMPLETED' : 'NOT_STARTED' }
            },
            practiceQuestionsCorrect: Math.round((s.con / 100) * 5),
            practiceQuestionsTotal: 5,
            weaknesses: s.con < 70 ? ['Đường sinh l và diện tích xung quanh hình nón'] : [],
            lastAccessedAt: new Date().toISOString()
          }
        }
      };
      this.cache[s.id] = rec;
    });
  }

  private static saveToFile(): void {
    try {
      fs.writeFileSync(PROGRESS_FILE, JSON.stringify(this.cache, null, 2), 'utf-8');
    } catch (err) {
      console.error('[PROGRESS STORAGE] Failed to write progress file:', err);
    }
  }

  public static getStudentProgress(studentId: string, studentName = 'Học sinh', className = '8A9'): StudentProgressRecord {
    this.initialize();
    if (!this.cache[studentId]) {
      this.cache[studentId] = {
        studentId,
        studentName,
        className,
        lastActiveTopic: 'cylinder',
        lastActiveStep: 1,
        totalXp: 0,
        updatedAt: new Date().toISOString(),
        topics: {
          cylinder: getDefaultTopicProgress('cylinder', 'Hình Trụ'),
          sphere: getDefaultTopicProgress('sphere', 'Hình Cầu'),
          cone: getDefaultTopicProgress('cone', 'Hình Nón')
        }
      };
      this.saveToFile();
    }
    return this.cache[studentId];
  }

  public static updateActivity(
    studentId: string,
    topicId: 'cylinder' | 'sphere' | 'cone',
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
  ): StudentProgressRecord {
    const rec = this.getStudentProgress(studentId);
    rec.lastActiveTopic = topicId;
    if (extra?.stepIndex) {
      rec.lastActiveStep = extra.stepIndex;
    }

    const topic = rec.topics[topicId];
    if (topic && topic.activities[activityId]) {
      const act = topic.activities[activityId];
      act.status = status;
      if (status === 'IN_PROGRESS' && !act.startedAt) {
        act.startedAt = new Date().toISOString();
      }
      if (status === 'COMPLETED') {
        act.completedAt = new Date().toISOString();
      }
      if (extra?.score !== undefined) {
        act.score = extra.score;
      }

      if (activityId === 'video') {
        if (status === 'IN_PROGRESS' || status === 'COMPLETED') {
          topic.videoStarted = true;
        }
        if (status === 'COMPLETED') {
          topic.videoCompleted = true;
          topic.videoProgress = 15;
        }
        if (extra?.videoProgress !== undefined) {
          topic.videoProgress = extra.videoProgress;
        }
      }

      if (activityId === 'practice') {
        if (extra?.questionsCorrect !== undefined) {
          topic.practiceQuestionsCorrect = extra.questionsCorrect;
        }
        if (extra?.questionsTotal !== undefined) {
          topic.practiceQuestionsTotal = extra.questionsTotal;
        }
        if (extra?.weaknesses) {
          topic.weaknesses = Array.from(new Set([...topic.weaknesses, ...extra.weaknesses]));
        }
      }

      topic.percent = calculateTopicPercent(topic);
      topic.overallStatus = topic.percent === 100 ? 'COMPLETED' : topic.percent > 0 ? 'IN_PROGRESS' : 'NOT_STARTED';
      topic.lastAccessedAt = new Date().toISOString();
    }

    rec.updatedAt = new Date().toISOString();
    this.saveToFile();
    return rec;
  }

  public static getAllStudentsProgress(className?: string): StudentProgressRecord[] {
    this.initialize();
    const all = Object.values(this.cache);
    if (!className || className === 'ALL') {
      return all;
    }
    return all.filter((s) => s.className.toLowerCase().includes(className.toLowerCase()));
  }

  public static getClassAnalytics(className?: string) {
    const list = this.getAllStudentsProgress(className);
    const totalStudents = list.length;
    if (totalStudents === 0) {
      return {
        totalStudents: 0,
        avgCylinder: 0,
        avgSphere: 0,
        avgCone: 0,
        commonWeaknesses: []
      };
    }

    const sumCyl = list.reduce((acc, s) => acc + (s.topics.cylinder?.percent || 0), 0);
    const sumSph = list.reduce((acc, s) => acc + (s.topics.sphere?.percent || 0), 0);
    const sumCon = list.reduce((acc, s) => acc + (s.topics.cone?.percent || 0), 0);

    const weaknessCounts: Record<string, number> = {};
    list.forEach((s) => {
      Object.values(s.topics).forEach((t) => {
        t.weaknesses?.forEach((w) => {
          weaknessCounts[w] = (weaknessCounts[w] || 0) + 1;
        });
      });
    });

    const sortedWeaknesses = Object.entries(weaknessCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([topic, count]) => ({ topic, count }));

    return {
      totalStudents,
      avgCylinder: Math.round(sumCyl / totalStudents),
      avgSphere: Math.round(sumSph / totalStudents),
      avgCone: Math.round(sumCon / totalStudents),
      commonWeaknesses: sortedWeaknesses
    };
  }
}
