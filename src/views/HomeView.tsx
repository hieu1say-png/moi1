/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - HOME DASHBOARD (WARM IVORY THEME)
 * Responsive Design: Desktop + Tablet + Mobile Optimized
 * Layout Hierarchy: Hero Banner -> 3 Interactive Shape Cards -> Learning Path Stepper -> Real World / Achievements / AI Help
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { ProgressBar } from '../components/common/ProgressBar';
import { RoadmapStepper } from '../components/common/RoadmapStepper';
import { LearningIslands } from '../components/common/LearningIslands';
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
  Globe,
  Bot,
  ChevronRight,
  FileCheck,
  GraduationCap,
  Timer,
  Gamepad2
} from 'lucide-react';
import { AdaptiveExamService } from '../services/adaptiveExamService';
import { ShapeType } from '../types';
import { TeacherClassBadge } from '../components/common/TeacherClassBadge';
import { GeometricParticles, StaggerReveal, TiltCard } from '../components/motion';
import { StudentJourneyProgressWidget } from '../components/student/StudentJourneyProgressWidget';
import { LearningJourneyModal } from '../components/journey/LearningJourneyModal';

export const HomeView: React.FC = () => {
  const { navigateTo, setSelectedShape, userStats, settings } = useApp();
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [journeyModalShape, setJourneyModalShape] = useState<ShapeType | null>(null);

  const assignments = TeacherService.getAssignments('cls-9a2').filter((a) => a.status === 'published');

  const handleOpenShape = (shapeId: ShapeType) => {
    setSelectedShape(shapeId);
    navigateTo('/explore');
  };

  const handleOpenJourney = (shapeId: ShapeType) => {
    setSelectedShape(shapeId);
    setJourneyModalShape(shapeId);
  };

  return (
    <div
      id="view-home"
      className="relative space-y-5 sm:space-y-6 w-full mx-auto pb-4 overflow-x-hidden"
    >
      {/* Dynamic Geometric & Mathematical Particles */}
      <GeometricParticles />

      {/* Student Warm Greeting Banner */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-xl">👋</span>
          <span className="text-xs sm:text-sm font-semibold text-[#334E40]">
            Chào <span className="font-bold text-[#16A34A]">{settings.studentName || 'bạn'}</span>! Cùng ThS. Trần Ngọc Hiếu khám phá Hình học 9 nhé! 🎯
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-[#334E40] font-medium bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0]">
            <span>🔥 Chuỗi:</span>
            <span className="font-bold text-[#059669]">{userStats.streakDays} ngày</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#334E40] font-medium bg-[#F0FDF4] px-3 py-1 rounded-full border border-[#BBF7D0]">
            <span>⭐ XP:</span>
            <span className="font-bold text-[#16A34A]">{userStats.xp}</span>
          </div>
        </div>
      </div>

      {/* Teacher Assigned Homework Banner for Students */}
      {assignments.length > 0 && (
        <section className="bg-white border border-[#A7F3D0] rounded-2xl sm:rounded-[20px] p-4 sm:p-5 text-[#0F291E] shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] text-[10px] font-bold uppercase">
                  Nhiệm Vụ Giáo Viên Giao
                </span>
                <TeacherClassBadge targetClassName={assignments[0].targetClassName || 'Lớp 9A2'} variant="subtle" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F291E]">{assignments[0].title}</h3>
              <p className="text-xs text-[#334E40] line-clamp-1">{assignments[0].description}</p>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center shrink-0">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-[#16A34A]">+{assignments[0].rewardXp} XP</div>
                <div className="text-[10px] text-[#658473]">
                  Hạn: {new Date(assignments[0].dueDate).toLocaleDateString('vi-VN')}
                </div>
              </div>

              <Button
                variant="cylinder"
                size="sm"
                shape="pill"
                leftIcon={<FileCheck className="w-4 h-4" />}
                onClick={() => setSelectedAssignment(assignments[0])}
                className="font-bold text-xs bg-[#16A34A] hover:bg-[#15803D] text-white"
              >
                Làm Bài Ngay
              </Button>
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

      {/* 1. HERO BANNER - Phong cách trực quan, xanh lá + trắng kem, chuẩn học thuật */}
      <StaggerReveal>
        <section
          id="hero-banner"
          className="relative overflow-hidden rounded-2xl sm:rounded-[24px] bg-white border border-[#E2EADF] p-5 sm:p-6 lg:p-8 shadow-sm"
        >
          {/* Soft atmospheric green gradient blurs */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#16A34A]/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-[#0D9488]/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-[#059669]/8 rounded-full blur-3xl pointer-events-none" />

          {/* Top bar in Hero */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 relative z-10 mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] font-bold text-xs sm:text-sm tracking-wide">
              <Sparkles className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span>PHÒNG THÍ NGHIỆM HÌNH HỌC KHÔNG GIAN 9</span>
            </div>
            <div className="text-xs text-[#658473] font-semibold bg-[#F8FAF5] px-3 py-1 rounded-full border border-[#E2EADF]">
              Tác giả: <strong className="text-[#0F291E]">ThS. Trần Ngọc Hiếu</strong>
            </div>
          </div>

          {/* Hero Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            {/* Left Shapes Display */}
            <div className="lg:col-span-3 flex justify-center order-2 lg:order-1">
              <div className="p-3 sm:p-4 bg-[#F8FAF5] rounded-2xl border border-[#E2EADF] shadow-xs flex items-center justify-center gap-3 w-full max-w-[280px] lg:max-w-none">
                <ShapeIllustration type="cylinder" size="sm" />
                <ShapeIllustration type="sphere" size="sm" />
                <ShapeIllustration type="cone" size="sm" />
              </div>
            </div>

            {/* Center Title & Action Buttons */}
            <div className="lg:col-span-6 text-center space-y-3 sm:space-y-4 order-1 lg:order-2">
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0F291E] leading-tight">
                HÌNH TRỤ – HÌNH NÓN – HÌNH CẦU
              </h1>
              <p className="text-xs sm:text-sm text-[#334E40] font-medium max-w-lg mx-auto leading-relaxed">
                Khám phá mô hình 3D cắt dọc, trải mặt phẳng phẳng, thí nghiệm rót nước Archimedes và giải pháp thích ứng thông minh ôn thi vào Lớp 10.
              </p>
              
              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <Button
                  id="hero-btn-explore"
                  variant="cylinder"
                  shape="pill"
                  size="md"
                  onClick={() => navigateTo('/explore')}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="font-bold min-h-[46px] px-6 bg-[#16A34A] hover:bg-[#15803D] text-white shadow-sm"
                >
                  KHÁM PHÁ NGAY
                </Button>
                <button
                  type="button"
                  id="hero-btn-practice"
                  onClick={() => navigateTo('/practice')}
                  className="px-5 py-2.5 rounded-full border border-[#E2EADF] bg-white hover:bg-[#F0FDF4] text-[#0F291E] font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <GraduationCap className="w-4 h-4 text-[#16A34A]" />
                  <span>LUYỆN THI VÀO 10</span>
                </button>
                <button
                  type="button"
                  id="hero-btn-game"
                  onClick={() => navigateTo('/game')}
                  className="px-5 py-2.5 rounded-full border border-indigo-200 bg-indigo-50/90 hover:bg-indigo-100 text-indigo-900 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Gamepad2 className="w-4 h-4 text-indigo-600" />
                  <span>🎮 GAME HÌNH HỌC 9</span>
                </button>
              </div>
            </div>

            {/* Right Mascot & Formula Cloud */}
            <div className="lg:col-span-3 flex justify-center order-3">
              <div className="p-3.5 sm:p-4 bg-[#F8FAF5] rounded-2xl border border-[#E2EADF] shadow-xs text-center space-y-2.5 w-full max-w-[240px]">
                <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-xl bg-white border border-[#E2EADF] w-full">
                  <MathFormula formula="V = \frac{1}{3}\pi r^2 h" />
                </div>
                <div className="text-xs text-[#334E40] font-semibold flex items-center justify-center gap-1.5">
                  <Bot className="w-4 h-4 text-[#047857]" />
                  <span>Thầy Hiếu AI 2.0 sẵn sàng!</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </StaggerReveal>

      {/* 1.5 DASHBOARD HỌC SINH - TIẾN ĐỘ CỦA EM & TIẾP TỤC HỌC (Section XVI) */}
      <StudentJourneyProgressWidget />

      {/* 2. BA CARD HÌNH KHỐI (HÌNH TRỤ, HÌNH NÓN, HÌNH CẦU) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#0F291E] uppercase tracking-wider">
              Khám Phá 3 Khối Hình Không Gian
            </h2>
          </div>
          <span className="text-xs text-[#658473] font-medium hidden sm:inline">
            Chọn một hình khối để tương tác 3D &amp; mở hành trình tự học
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Card 1: HÌNH TRỤ - NGỌC LỤC BẢO (#059669) */}
          <TiltCard>
            <div
              id="card-shape-cylinder"
              className="p-5 sm:p-6 rounded-[22px] border border-[#A7F3D0] bg-[#ECFDF5] hover:bg-[#ECFDF5]/90 shadow-xs flex flex-col justify-between h-full group transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-white text-[#059669] border border-[#A7F3D0] text-[10px] font-bold uppercase tracking-wider">
                    Ngọc Lục Bảo
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#059669]">Chương IV.1</span>
                </div>

                <div className="text-center">
                  <h3 className="font-serif text-xl font-extrabold text-[#059669] uppercase tracking-wider">
                    HÌNH TRỤ
                  </h3>
                  <p className="text-xs text-[#334E40] mt-0.5 font-medium">Cắt dọc &amp; trải phẳng mặt xung quanh</p>
                </div>

                {/* Graphic + Formulas */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 items-center">
                  <div className="flex justify-center transition-transform duration-200 group-hover:scale-105">
                    <ShapeIllustration type="cylinder" size="md" />
                  </div>
                  <div className="space-y-1.5 text-xs text-[#334E40] bg-white/90 p-2.5 rounded-xl border border-[#A7F3D0]">
                    <div className="font-bold text-[11px] text-[#059669] mb-1">Công thức cốt lõi:</div>
                    <div className="font-mono text-[11px]"><MathFormula formula="S_{xq} = 2\pi rh" /></div>
                    <div className="font-mono text-[11px]"><MathFormula formula="V = \pi r^2 h" /></div>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-2 space-y-2">
                <Button
                  id="btn-journey-cylinder"
                  variant="cylinder"
                  shape="pill"
                  fullWidth
                  size="md"
                  onClick={() => handleOpenJourney('cylinder')}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                  className="font-bold min-h-[44px] bg-[#059669] hover:bg-[#047857] text-white shadow-xs"
                >
                  Hành trình tự học
                </Button>
                <button
                  type="button"
                  onClick={() => handleOpenShape('cylinder')}
                  className="w-full text-center text-xs font-semibold text-[#059669] hover:underline py-1 cursor-pointer"
                >
                  Vào phòng thí nghiệm 3D tự do →
                </button>
              </div>
            </div>
          </TiltCard>

          {/* Card 2: HÌNH CẦU - XANH RÊU BIỂN / SAGE (#0D9488) */}
          <TiltCard>
            <div
              id="card-shape-sphere"
              className="p-5 sm:p-6 rounded-[22px] border border-[#99F6E4] bg-[#F0FDFA] hover:bg-[#F0FDFA]/90 shadow-xs flex flex-col justify-between h-full group transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-white text-[#0D9488] border border-[#99F6E4] text-[10px] font-bold uppercase tracking-wider">
                    Xanh Rêu Biển
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#0D9488]">Chương IV.3</span>
                </div>

                <div className="text-center">
                  <h3 className="font-serif text-xl font-extrabold text-[#0D9488] uppercase tracking-wider">
                    HÌNH CẦU
                  </h3>
                  <p className="text-xs text-[#334E40] mt-0.5 font-medium">Mặt cắt qua tâm &amp; định luật Archimedes</p>
                </div>

                {/* Graphic + Formulas */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 items-center">
                  <div className="flex justify-center transition-transform duration-200 group-hover:scale-105">
                    <ShapeIllustration type="sphere" size="md" />
                  </div>
                  <div className="space-y-1.5 text-xs text-[#334E40] bg-white/90 p-2.5 rounded-xl border border-[#99F6E4]">
                    <div className="font-bold text-[11px] text-[#0D9488] mb-1">Công thức cốt lõi:</div>
                    <div className="font-mono text-[11px]"><MathFormula formula="S = 4\pi R^2" /></div>
                    <div className="font-mono text-[11px]"><MathFormula formula="V = \frac{4}{3}\pi R^3" /></div>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-2 space-y-2">
                <Button
                  id="btn-journey-sphere"
                  variant="sphere"
                  shape="pill"
                  fullWidth
                  size="md"
                  onClick={() => handleOpenJourney('sphere')}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                  className="font-bold min-h-[44px] bg-[#0D9488] hover:bg-[#0f766e] text-white shadow-xs"
                >
                  Hành trình tự học
                </Button>
                <button
                  type="button"
                  onClick={() => handleOpenShape('sphere')}
                  className="w-full text-center text-xs font-semibold text-[#0D9488] hover:underline py-1 cursor-pointer"
                >
                  Vào phòng thí nghiệm 3D tự do →
                </button>
              </div>
            </div>
          </TiltCard>

          {/* Card 3: HÌNH NÓN - XANH LÁ MẠ (#16A34A) */}
          <TiltCard>
            <div
              id="card-shape-cone"
              className="p-5 sm:p-6 rounded-[22px] border border-[#BBF7D0] bg-[#F0FDF4] hover:bg-[#F0FDF4]/90 shadow-xs flex flex-col justify-between h-full group transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-white text-[#16A34A] border border-[#BBF7D0] text-[10px] font-bold uppercase tracking-wider">
                    Xanh Lá Mạ
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#16A34A]">Chương IV.2</span>
                </div>

                <div className="text-center">
                  <h3 className="font-serif text-xl font-extrabold text-[#16A34A] uppercase tracking-wider">
                    HÌNH NÓN
                  </h3>
                  <p className="text-xs text-[#334E40] mt-0.5 font-medium">Đường sinh <MathFormula formula="l" /> &amp; hình quạt tròn khai triển</p>
                </div>

                {/* Graphic + Formulas */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 items-center">
                  <div className="flex justify-center transition-transform duration-200 group-hover:scale-105">
                    <ShapeIllustration type="cone" size="md" />
                  </div>
                  <div className="space-y-1.5 text-xs text-[#334E40] bg-white/90 p-2.5 rounded-xl border border-[#BBF7D0]">
                    <div className="font-bold text-[11px] text-[#16A34A] mb-1">Công thức cốt lõi:</div>
                    <div className="font-mono text-[11px]"><MathFormula formula="S_{xq} = \pi rl" /></div>
                    <div className="font-mono text-[11px]"><MathFormula formula="V = \frac{1}{3}\pi r^2 h" /></div>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-2 space-y-2">
                <Button
                  id="btn-journey-cone"
                  variant="cone"
                  shape="pill"
                  fullWidth
                  size="md"
                  onClick={() => handleOpenJourney('cone')}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                  className="font-bold min-h-[44px] bg-[#16A34A] hover:bg-[#15803D] text-white shadow-xs"
                >
                  Hành trình tự học
                </Button>
                <button
                  type="button"
                  onClick={() => handleOpenShape('cone')}
                  className="w-full text-center text-xs font-semibold text-[#16A34A] hover:underline py-1 cursor-pointer"
                >
                  Vào phòng thí nghiệm 3D tự do →
                </button>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* 2.5 ÔN THI VÀO 10 — MOCK EXAM ROOM BANNER */}
      <section id="home-exam-prep-banner" className="bg-gradient-to-r from-[#047857] via-[#16A34A] to-[#0D9488] rounded-2xl sm:rounded-[22px] p-5 sm:p-6 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-white/30">
                <GraduationCap className="w-3.5 h-3.5" />
                LUYỆN THI VÀO 10
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 text-[10px] font-bold">
                Chuẩn cấu trúc 10 câu • 30 phút
              </span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white">
              Phòng Thi Thử Chuẩn Hóa Tuyển Sinh Lớp 10
            </h3>
            <p className="text-xs text-emerald-100 max-w-xl font-medium leading-relaxed">
              Trắc nghiệm, Đúng/Sai, Trả lời ngắn. Chấm điểm tức thì, radar 4 trụ cột năng lực và chẩn đoán bẫy đề thi cùng ThS. Trần Ngọc Hiếu.
            </p>
          </div>

          <div className="flex items-center gap-3 self-end md:self-center shrink-0">
            <Button
              id="home-btn-start-exam"
              variant="white"
              size="md"
              shape="pill"
              leftIcon={<Timer className="w-4 h-4 text-[#15803D]" />}
              onClick={() => navigateTo('/exam-prep')}
              className="font-black text-xs text-[#15803D] bg-white hover:bg-[#F0FDF4] shadow-sm"
            >
              Vào Phòng Thi Ngay
            </Button>
          </div>
        </div>
      </section>

      {/* 3. LỘ TRÌNH HỌC TẬP — LEARNING ISLANDS */}
      <section id="home-learning-path">
        <LearningIslands />
      </section>

      {/* 4. LOWER SECTION: ỨNG DỤNG THỰC TẾ + THÀNH TÍCH + AI TRỢ GIÚP */}
      <StaggerReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
          {/* 4.1 ỨNG DỤNG THỰC TẾ (Real World Application Card) */}
          <div
            id="card-real-world"
            className="md:col-span-1 lg:col-span-4 p-5 sm:p-6 rounded-[22px] border border-[#E2EADF] bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#16A34A] uppercase tracking-wider">
                  ỨNG DỤNG THỰC TẾ
                </h3>
                <Globe className="w-4 h-4 text-[#16A34A]" />
              </div>
              <p className="text-xs sm:text-sm text-[#334E40] font-medium">
                Khám phá hình khối xung quanh chúng ta: Lon nước ngọt, Nón lá xứ Huế, Bồn cầu Archimedes
              </p>

              <div className="p-3.5 rounded-2xl bg-[#F8FAF5] border border-[#E2EADF] flex items-center justify-center gap-4 py-4">
                <span className="text-3xl" title="Lon nước ngọt & Hình Trụ">🥤</span>
                <span className="text-3xl" title="Nón lá Huế & Hình Nón">👒</span>
                <span className="text-3xl" title="Quả cầu & Archimedes">🔮</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                id="home-btn-realworld"
                variant="cylinder"
                shape="pill"
                fullWidth
                size="md"
                onClick={() => navigateTo('/real-world')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="font-bold min-h-[48px] sm:min-h-[44px] bg-[#16A34A] hover:bg-[#15803D] text-white"
              >
                Khám phá mini-game
              </Button>
            </div>
          </div>

          {/* 4.2 THÀNH TÍCH CỦA BẠN (Achievement Card) */}
          <div
            id="card-achievements"
            className="md:col-span-1 lg:col-span-4 p-5 sm:p-6 rounded-[22px] border border-[#E2EADF] bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#059669] uppercase tracking-wider">
                  TIẾN TRÌNH HỌC TẬP
                </h3>
                <Trophy className="w-4 h-4 text-[#EAB308]" />
              </div>

              {/* 3 Metric Mini Boxes: Điểm cao nhất, Bài đã làm, Cấp độ */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-[#F8FAF5] border border-[#E2EADF] text-center">
                  <div className="text-[11px] sm:text-xs text-[#658473] font-medium">Điểm XP</div>
                  <div className="text-sm sm:text-base font-bold text-[#0F291E] flex items-center justify-center gap-0.5 mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-[#EAB308] text-[#EAB308]" />
                    <span>{userStats.xp}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#F8FAF5] border border-[#E2EADF] text-center">
                  <div className="text-[11px] sm:text-xs text-[#658473] font-medium">Bài đã làm</div>
                  <div className="text-sm sm:text-base font-bold text-[#0F291E] flex items-center justify-center gap-0.5 mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-[#16A34A] text-[#16A34A]" />
                    <span>{userStats.completedPractices.length}/6</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#F8FAF5] border border-[#E2EADF] text-center">
                  <div className="text-[11px] sm:text-xs text-[#658473] font-medium">Cấp độ</div>
                  <div className="mt-0.5">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] font-bold text-xs sm:text-sm border border-[#A7F3D0]">
                      Lớp {userStats.level || 9}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium text-[#658473]">
                  <span>Tiến độ cấp {userStats.level}</span>
                  <span className="font-mono font-bold text-[#059669]">{userStats.xp % 500} / 500 XP</span>
                </div>
                <ProgressBar
                  value={userStats.xp % 500}
                  max={500}
                  size="sm"
                  color="cylinder"
                  showValue={false}
                />
              </div>
            </div>

            <div className="text-xs font-semibold text-[#658473] flex items-center justify-between pt-1 border-t border-[#E2EADF]">
              <span className="flex items-center gap-1">
                <span>Học rất tốt! Cố lên nhé!</span>
                <span>💪</span>
              </span>
              <button
                onClick={() => navigateTo('/achievements')}
                className="text-xs font-bold text-[#16A34A] hover:underline cursor-pointer p-1"
              >
                Chi tiết →
              </button>
            </div>
          </div>

          {/* 4.3 AI TRỢ GIÚP (Thầy Hiếu AI 2.0 Card) */}
          <div
            id="card-ai-help"
            className="md:col-span-2 lg:col-span-4 p-5 sm:p-6 rounded-[22px] border border-[#6EE7B7] bg-[#D1FAE5]/50 hover:bg-[#D1FAE5]/70 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#047857] uppercase tracking-wider">
                  THẦY HIẾU AI 2.0
                </h3>
                <Sparkles className="w-4 h-4 text-[#047857]" />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-14 sm:w-16 h-14 sm:h-16 shrink-0 flex items-center justify-center">
                  <ShapeIllustration type="robot" size="sm" />
                </div>
                <p className="text-xs sm:text-sm text-[#0F291E] leading-relaxed font-medium">
                  Trợ lý gia sư sư phạm phản hồi dưới 5ms, giải đáp Socratic, chẩn đoán bẫy đề thi và hướng dẫn 4 bước lời giải!
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Button
                id="home-btn-ai"
                variant="ai"
                shape="pill"
                fullWidth
                size="md"
                onClick={() => navigateTo('/ai')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="font-bold min-h-[48px] sm:min-h-[44px] bg-[#047857] hover:bg-[#065f46] text-white"
              >
                Hỏi Thầy Hiếu AI
              </Button>
            </div>
          </div>
        </div>
      </StaggerReveal>

      {/* 5. FOOTER MOTTO */}
      <div className="text-center py-4 text-xs sm:text-sm font-semibold text-[#658473] space-y-1 border-t border-[#E2EADF] mt-4">
        <div>❤️ Học vui – Hiểu sâu – Đỗ nguyện vọng 1 vào Lớp 10!</div>
        <div className="text-[11px] text-[#658473]/80">Hệ thống giáo dục số phát triển bởi <strong>ThS. Trần Ngọc Hiếu</strong></div>
      </div>

      {/* 6. MODAL HÀNH TRÌNH TỰ HỌC CÓ HƯỚNG DẪN (6 BƯỚC CHUẨN MỰC) */}
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
