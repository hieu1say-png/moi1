/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - HOME DASHBOARD
 * Inspo-Driven Layout: Calm, Precise, Scannable STEM Workspace
 * Macrostructure:
 *  1. Header Greeting & Streak Row
 *  2. Continue Learning (Primary Anchor)
 *  3. 3D Lab Shortcuts (Cylinder, Cone, Sphere)
 *  4. AI Tutor Prompt Suggestions & Quick Jump Grid
 *  5. Teacher Assignments (if available)
 *  6. Student Journey Progress & Weakness Analysis
 *  7. Learning Roadmap Islands
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import { ShapeIllustration } from '../components/common/ShapeIllustration';
import { MathFormula } from '../components/common/MathFormula';
import { TeacherService } from '../services/teacherService';
import { StudentAssignmentModal } from '../components/assignment/StudentAssignmentModal';
import { Assignment } from '../types/dataArchitecture';
import {
  Sparkles,
  Star,
  Trophy,
  ArrowRight,
  Bot,
  ChevronRight,
  FileCheck,
  GraduationCap,
  Timer,
  BookOpen,
  Compass,
  CheckCircle2,
  Globe2,
  Flame,
  HelpCircle,
  Play
} from 'lucide-react';
import { ShapeType } from '../types';
import { TeacherClassBadge } from '../components/common/TeacherClassBadge';
import { StudentJourneyProgressWidget } from '../components/student/StudentJourneyProgressWidget';
import { LearningJourneyModal } from '../components/journey/LearningJourneyModal';
import { LearningIslands } from '../components/common/LearningIslands';
import { StudentProgressService, StudentProgressRecord } from '../services/studentProgressService';

export const HomeView: React.FC = () => {
  const { navigateTo, setSelectedShape, userStats, settings } = useApp();
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [journeyModalShape, setJourneyModalShape] = useState<ShapeType | null>(null);
  const [studentProgress, setStudentProgress] = useState<StudentProgressRecord | null>(null);

  useEffect(() => {
    StudentProgressService.fetchProgress('usr-student-001', settings.studentName, settings.className)
      .then(setStudentProgress);
    const unsub = StudentProgressService.subscribe(setStudentProgress);
    return () => unsub();
  }, [settings.studentName, settings.className]);

  const assignments = TeacherService.getAssignments('cls-9a2').filter((a) => a.status === 'published');

  const handleOpen3DLab = (shapeId: ShapeType) => {
    setSelectedShape(shapeId);
    navigateTo('/explore');
  };

  const handleOpenJourney = (shapeId: ShapeType) => {
    setSelectedShape(shapeId);
    setJourneyModalShape(shapeId);
  };

  const handleAskAIWithPrompt = (promptText: string) => {
    sessionStorage.setItem('geometry_lab_initial_ai_query', promptText);
    navigateTo('/ai');
  };

  // Determine current active topic & progress
  const activeTopicKey = (studentProgress?.lastActiveTopic as ShapeType) || 'cylinder';
  const activeTopicData = studentProgress?.topics?.[activeTopicKey];
  const overallProgressPct = activeTopicData?.overallProgress || 65;

  const topicDisplayNames: Record<ShapeType, { title: string; desc: string; chapter: string }> = {
    cylinder: {
      title: 'Hình Trụ',
      desc: 'Diện tích xung quanh & Thể tích hình trụ',
      chapter: 'Chương IV — Bài 1'
    },
    cone: {
      title: 'Hình Nón',
      desc: 'Đường sinh, diện tích quạt tròn & Thể tích',
      chapter: 'Chương IV — Bài 2'
    },
    sphere: {
      title: 'Hình Cầu',
      desc: 'Mặt cầu, thể tích khối cầu & Định luật Archimedes',
      chapter: 'Chương IV — Bài 3'
    }
  };

  return (
    <div
      id="view-home"
      className="space-y-6 w-full max-w-[1180px] mx-auto pb-8"
    >
      {/* ----------------------------------------------------------------------- */}
      {/* 1. CALM DASHBOARD HEADER & STATS ROW                                    */}
      {/* ----------------------------------------------------------------------- */}
      <section id="home-greeting-bar" className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Chào mừng em trở lại, {settings.studentName || 'Học sinh'}!</span>
            <span className="text-base font-normal text-slate-500">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Không gian thực nghiệm Hình học không gian 9 & Luyện thi tuyển sinh vào 10.
          </p>
        </div>

        {/* Quick stats pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200/80 text-orange-800 text-xs font-semibold"
            title="Chuỗi ngày học liên tục"
          >
            <Flame className="w-4 h-4 text-orange-600" />
            <span>Chuỗi: <strong>{userStats.streakDays} ngày</strong></span>
          </div>

          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold"
            title="Điểm kinh nghiệm tích lũy"
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>XP: <strong>{userStats.xp}</strong></span>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('/theory')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            title="Mở nhanh sổ tay công thức toán 9"
          >
            <BookOpen className="w-4 h-4 text-slate-600" />
            <span className="hidden md:inline">Sổ tay công thức</span>
          </button>
        </div>
      </section>

      {/* ----------------------------------------------------------------------- */}
      {/* 2. CONTINUE LEARNING (PRIMARY ANCHOR)                                   */}
      {/* ----------------------------------------------------------------------- */}
      <section
        id="home-continue-learning-anchor"
        className="relative bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:border-blue-300 transition-all"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Topic info & Progress */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider">
                Tiếp tục học tập
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {topicDisplayNames[activeTopicKey]?.chapter}
              </span>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                {topicDisplayNames[activeTopicKey]?.title}: {topicDisplayNames[activeTopicKey]?.desc}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Hoàn thành các hoạt động lý thuyết, cắt ghép 3D trực quan và bài tập rèn luyện kỹ năng.
              </p>
            </div>

            {/* Progress bar container */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Tiến độ chủ đề</span>
                <span className="text-blue-700 font-bold">{overallProgressPct}% hoàn thành</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(5, overallProgressPct))}%` }}
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                id="btn-home-continue-primary"
                onClick={() => handleOpenJourney(activeTopicKey)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer min-h-[44px]"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Tiếp tục học ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                id="btn-home-3d-direct"
                onClick={() => handleOpen3DLab(activeTopicKey)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer min-h-[44px]"
              >
                <Compass className="w-4 h-4 text-teal-600" />
                <span>Mở Phòng Thí Nghiệm 3D</span>
              </button>

              <button
                type="button"
                id="btn-home-quick-practice"
                onClick={() => navigateTo('/practice')}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer min-h-[44px]"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Luyện tập nhanh</span>
              </button>
            </div>
          </div>

          {/* Right: Shape Illustration Preview */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50/80 rounded-xl border border-slate-200/70 text-center">
            <div className="w-32 h-32 flex items-center justify-center">
              <ShapeIllustration type={activeTopicKey} size="md" />
            </div>
            <span className="text-xs font-semibold text-slate-700 mt-2">
              Mô hình 3D tương tác đa chiều
            </span>
            <span className="text-[11px] text-slate-500">
              Kéo xoay 360°, cắt dọc & trải mặt phẳng phẳng
            </span>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------- */}
      {/* 3. 3D LAB SHORTCUTS (CYLINDER, CONE, SPHERE)                            */}
      {/* ----------------------------------------------------------------------- */}
      <section id="home-3d-shortcuts" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Compass className="w-4 h-4 text-teal-600" />
            <span>Phòng Thí Nghiệm 3D Trực Quan</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Chọn hình khối để vào thẳng workspace tương tác
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* A. Hình Trụ */}
          <div
            id="card-shape-cylinder"
            className="p-5 rounded-xl border border-slate-200/80 bg-white hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  Chương IV.1
                </span>
                <span className="text-xs font-semibold text-slate-500">Cắt dọc & Trải phẳng</span>
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-base font-bold text-slate-900">HÌNH TRỤ</h3>
                <p className="text-xs text-slate-600">Hai đáy tròn song song & Mặt xung quanh chữ nhật</p>
              </div>

              <div className="flex items-center justify-center py-2">
                <ShapeIllustration type="cylinder" size="sm" />
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg text-xs space-y-1 border border-slate-200/60 font-mono text-slate-700">
                <div><MathFormula formula="S_{xq} = 2\pi rh" /></div>
                <div><MathFormula formula="V = \pi r^2 h" /></div>
              </div>
            </div>

            <div className="pt-4 mt-2 space-y-2">
              <button
                type="button"
                id="btn-enter-3d-cylinder"
                onClick={() => handleOpen3DLab('cylinder')}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors cursor-pointer min-h-[44px]"
              >
                <Compass className="w-4 h-4" />
                <span>Khám phá 3D Hình Trụ</span>
              </button>
              <button
                type="button"
                onClick={() => handleOpenJourney('cylinder')}
                className="w-full text-center text-xs font-medium text-emerald-700 hover:underline py-1 cursor-pointer"
              >
                Xem toàn bộ bài học lý thuyết & bài tập →
              </button>
            </div>
          </div>

          {/* B. Hình Nón */}
          <div
            id="card-shape-cone"
            className="p-5 rounded-xl border border-slate-200/80 bg-white hover:border-amber-300 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                  Chương IV.2
                </span>
                <span className="text-xs font-semibold text-slate-500">Khai triển quạt tròn</span>
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-base font-bold text-slate-900">HÌNH NÓN</h3>
                <p className="text-xs text-slate-600">Đường sinh <MathFormula formula="l" />, đỉnh & đáy tròn</p>
              </div>

              <div className="flex items-center justify-center py-2">
                <ShapeIllustration type="cone" size="sm" />
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg text-xs space-y-1 border border-slate-200/60 font-mono text-slate-700">
                <div><MathFormula formula="S_{xq} = \pi rl" /></div>
                <div><MathFormula formula="V = \frac{1}{3}\pi r^2 h" /></div>
              </div>
            </div>

            <div className="pt-4 mt-2 space-y-2">
              <button
                type="button"
                id="btn-enter-3d-cone"
                onClick={() => handleOpen3DLab('cone')}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors cursor-pointer min-h-[44px]"
              >
                <Compass className="w-4 h-4" />
                <span>Khám phá 3D Hình Nón</span>
              </button>
              <button
                type="button"
                onClick={() => handleOpenJourney('cone')}
                className="w-full text-center text-xs font-medium text-amber-700 hover:underline py-1 cursor-pointer"
              >
                Xem toàn bộ bài học lý thuyết & bài tập →
              </button>
            </div>
          </div>

          {/* C. Hình Cầu */}
          <div
            id="card-shape-sphere"
            className="p-5 rounded-xl border border-slate-200/80 bg-white hover:border-teal-300 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                  Chương IV.3
                </span>
                <span className="text-xs font-semibold text-slate-500">Mặt cầu & Archimedes</span>
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-base font-bold text-slate-900">HÌNH CẦU</h3>
                <p className="text-xs text-slate-600">Mặt cắt qua tâm & Thí nghiệm rót nước</p>
              </div>

              <div className="flex items-center justify-center py-2">
                <ShapeIllustration type="sphere" size="sm" />
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg text-xs space-y-1 border border-slate-200/60 font-mono text-slate-700">
                <div><MathFormula formula="S = 4\pi R^2" /></div>
                <div><MathFormula formula="V = \frac{4}{3}\pi R^3" /></div>
              </div>
            </div>

            <div className="pt-4 mt-2 space-y-2">
              <button
                type="button"
                id="btn-enter-3d-sphere"
                onClick={() => handleOpen3DLab('sphere')}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors cursor-pointer min-h-[44px]"
              >
                <Compass className="w-4 h-4" />
                <span>Khám phá 3D Hình Cầu</span>
              </button>
              <button
                type="button"
                onClick={() => handleOpenJourney('sphere')}
                className="w-full text-center text-xs font-medium text-teal-700 hover:underline py-1 cursor-pointer"
              >
                Xem toàn bộ bài học lý thuyết & bài tập →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------- */}
      {/* 4. AI TUTOR PROMPT SUGGESTIONS & LEARNING UTILITIES                     */}
      {/* ----------------------------------------------------------------------- */}
      <section id="home-ai-and-tools" className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: AI Tutor Prompts */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/80 p-5 space-y-3.5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Hỏi Thầy Hiếu AI 24/7</h3>
                <p className="text-xs text-slate-500">Chọn câu hỏi nhanh hoặc nhập thắc mắc của em</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('/ai')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>Vào AI Tutor</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleAskAIWithPrompt('Thầy ơi, vì sao thể tích hình nón lại đúng bằng 1/3 thể tích hình trụ có cùng bán kính đáy và chiều cao?')}
              className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-200/60 transition-colors text-xs text-slate-700 flex items-center justify-between group cursor-pointer"
            >
              <span className="flex items-center gap-2 font-medium">
                <HelpCircle className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Vì sao thể tích hình nón bằng 1/3 thể tích hình trụ cùng đáy và chiều cao?</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>

            <button
              type="button"
              onClick={() => handleAskAIWithPrompt('Làm thế nào để phân biệt đường sinh l, bán kính đáy r và chiều cao h trong các bài toán thực tế hình nón?')}
              className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-200/60 transition-colors text-xs text-slate-700 flex items-center justify-between group cursor-pointer"
            >
              <span className="flex items-center gap-2 font-medium">
                <HelpCircle className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Mẹo phân biệt đường sinh l, bán kính r và chiều cao h của hình nón?</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>

            <button
              type="button"
              onClick={() => handleAskAIWithPrompt('Thầy hướng dẫn em các dạng toán thực tế thùng phuy, bể nước và nón lá thường gặp trong đề thi tuyển sinh 10?')}
              className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-200/60 transition-colors text-xs text-slate-700 flex items-center justify-between group cursor-pointer"
            >
              <span className="flex items-center gap-2 font-medium">
                <HelpCircle className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Các dạng toán thực tế hình học không gian hay thi vào Lớp 10?</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          </div>
        </div>

        {/* Right: Quick Prep & Practice Shortcuts */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/80 p-5 space-y-3.5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-rose-600" />
              <span>Chương Trình Trọng Tâm</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Tiện ích tăng tốc ôn luyện và trải nghiệm STEM</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => navigateTo('/exam-prep')}
              className="p-3 rounded-lg bg-rose-50/70 hover:bg-rose-100 border border-rose-200/70 text-left transition-colors cursor-pointer"
            >
              <div className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                <Timer className="w-3.5 h-3.5 text-rose-600" />
                <span>Ôn thi vào 10</span>
              </div>
              <p className="text-[11px] text-rose-700/80 mt-1 line-clamp-2">
                10 câu chuẩn hóa, thi thử tính giờ & phân tích bẫy đề thi.
              </p>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('/real-world')}
              className="p-3 rounded-lg bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-200/70 text-left transition-colors cursor-pointer"
            >
              <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>STEM Thực Tế</span>
              </div>
              <p className="text-[11px] text-emerald-700/80 mt-1 line-clamp-2">
                Lon nước, nón lá, bồn cầu Archimedes đời thực.
              </p>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('/game')}
              className="p-3 rounded-lg bg-indigo-50/70 hover:bg-indigo-100 border border-indigo-200/70 text-left transition-colors cursor-pointer"
            >
              <div className="text-xs font-bold text-indigo-800 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-indigo-600" />
                <span>Game 9 Master</span>
              </div>
              <p className="text-[11px] text-indigo-700/80 mt-1 line-clamp-2">
                Trò chơi toán học chậm rãi, tĩnh lặng, ưu tiên tư duy.
              </p>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('/theory')}
              className="p-3 rounded-lg bg-blue-50/70 hover:bg-blue-100 border border-blue-200/70 text-left transition-colors cursor-pointer"
            >
              <div className="text-xs font-bold text-blue-800 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Sổ Tay Công Thức</span>
              </div>
              <p className="text-[11px] text-blue-700/80 mt-1 line-clamp-2">
                Bảng tra cứu công thức, diện tích, thể tích có phân tích.
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------- */}
      {/* 5. TEACHER ASSIGNED HOMEWORK (IF ANY)                                   */}
      {/* ----------------------------------------------------------------------- */}
      {assignments.length > 0 && (
        <section className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 text-slate-800 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase">
                  Nhiệm Vụ Giáo Viên Giao
                </span>
                <TeacherClassBadge targetClassName={assignments[0].targetClassName || 'Lớp 9A2'} variant="subtle" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">{assignments[0].title}</h3>
              <p className="text-xs text-slate-600 line-clamp-1">{assignments[0].description}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-emerald-700">+{assignments[0].rewardXp} XP</div>
                <div className="text-[10px] text-slate-500">
                  Hạn: {new Date(assignments[0].dueDate).toLocaleDateString('vi-VN')}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAssignment(assignments[0])}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors min-h-[44px] cursor-pointer"
              >
                <FileCheck className="w-4 h-4" />
                <span>Làm Bài Ngay</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Assignment Modal if opened */}
      {selectedAssignment && (
        <StudentAssignmentModal
          assignment={selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
        />
      )}

      {/* ----------------------------------------------------------------------- */}
      {/* 6. STUDENT DETAILED JOURNEY PROGRESS & WEAKNESS WIDGET                  */}
      {/* ----------------------------------------------------------------------- */}
      <StudentJourneyProgressWidget />

      {/* ----------------------------------------------------------------------- */}
      {/* 7. LEARNING ISLANDS ROADMAP                                             */}
      {/* ----------------------------------------------------------------------- */}
      <section id="home-learning-path">
        <LearningIslands />
      </section>

      {/* ----------------------------------------------------------------------- */}
      {/* 8. GUIDED LEARNING JOURNEY MODAL (6-STEP WORKFLOW)                      */}
      {/* ----------------------------------------------------------------------- */}
      {journeyModalShape && (
        <LearningJourneyModal
          shapeType={journeyModalShape}
          initialStep={1}
          onClose={() => setJourneyModalShape(null)}
        />
      )}
    </div>
  );
};
