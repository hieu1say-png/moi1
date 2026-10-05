/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - MOBILE HOME SCREEN
 * Specialized Mobile First Education App Home:
 * - Top Header: Student Avatar, Name, Class & Live XP Counter
 * - Hero Card: "Bài học tiếp theo" with progress ring/bar & [Tiếp tục học] button
 * - Learning Journey Path: Cylinder -> Cone -> Sphere (Vertical Cards)
 * - Daily Mission Cards: Interactive progress bar with [Chơi ngay]
 * - Student Achievement Badges Carousel
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { StudentProgressService, StudentProgressRecord } from '../services/studentProgressService';
import {
  Sparkles,
  Flame,
  Zap,
  ArrowRight,
  BookOpen,
  Box,
  Trophy,
  Target,
  CheckCircle2,
  Lock,
  ChevronRight,
  Play
} from 'lucide-react';
import { ShapeType } from '../types';

export const MobileHomeScreen: React.FC = () => {
  const { navigateTo, setSelectedShape, userStats, settings } = useApp();
  const { studentUser } = useAuth();
  const [progress, setProgress] = useState<StudentProgressRecord | null>(null);

  useEffect(() => {
    StudentProgressService.fetchProgress('usr-student-001', settings.studentName, settings.className)
      .then(setProgress);
    const unsub = StudentProgressService.subscribe(setProgress);
    return () => unsub();
  }, [settings.studentName, settings.className]);

  const studentName = studentUser?.fullName || settings.studentName || 'Học sinh Lớp 9';
  const className = settings.className || '9A1';
  const totalXp = progress?.totalXp ?? userStats.xp ?? 350;

  const handleContinueLesson = (shape: ShapeType) => {
    setSelectedShape(shape);
    navigateTo('/theory');
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-4 space-y-6 pb-28 animate-fade-in">
      {/* 1. TOP MOBILE HEADER: Student Info & XP Counter */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFFDF8] border border-[#EADFCB] shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center font-bold text-base shadow-xs">
            {studentName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#2D241E] leading-tight">
              {studentName}
            </h3>
            <span className="text-[11px] font-medium text-[#766A61]">
              Lớp {className} • Toán 9 GDPT
            </span>
          </div>
        </div>

        {/* Live XP Badge & Streak */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-orange-100/80 border border-orange-200 text-[#FF6B00] font-bold text-xs shadow-2xs">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{totalXp} XP</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-amber-100/80 border border-amber-200 text-amber-700 font-bold text-xs">
            <Flame className="w-3.5 h-3.5 fill-current text-amber-500" />
            <span>3</span>
          </div>
        </div>
      </div>

      {/* 2. HERO CARD: "Bài học tiếp theo" */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2D241E] via-[#3E322A] to-[#1C1613] text-white p-5 shadow-lg border border-[#4A3E36]">
        {/* Decorative Geometric Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/15 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none" />

        <div className="relative space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-400 bg-orange-500/20 px-2.5 py-1 rounded-full border border-orange-400/30">
              Bài học tiếp theo
            </span>
            <span className="text-xs font-bold text-emerald-400">
              70% hoàn thành
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🌎</span> Hình Cầu – Diện Tích & Thể Tích
            </h3>
            <p className="text-xs text-[#DFCBB5] leading-relaxed line-clamp-2">
              Khám phá công thức Ac-si-met và bài toán thực tế quả địa cầu.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full h-2.5 rounded-full bg-white/15 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500"
                style={{ width: '70%' }}
              />
            </div>
          </div>

          {/* Action Button (Min 44x44px target) */}
          <button
            type="button"
            onClick={() => handleContinueLesson('sphere')}
            className="w-full min-h-[48px] rounded-2xl bg-[#FF6B00] hover:bg-[#E05300] active:scale-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all touch-manipulation"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Tiếp Tục Học Ngay</span>
          </button>
        </div>
      </div>

      {/* 3. LEARNING JOURNEY ROADMAP (Vertical Cards) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sm text-[#2D241E]">
            Lộ Trình Hình Học Không Gian 9
          </h4>
          <span className="text-xs text-[#766A61]">3 Chuyên đề chính</span>
        </div>

        <div className="space-y-2.5">
          {/* Chuyên đề 1: Hình Trụ */}
          <div
            onClick={() => handleContinueLesson('cylinder')}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFFDF8] border border-[#EADFCB] hover:border-orange-300 active:bg-orange-50/50 transition-all cursor-pointer shadow-2xs touch-manipulation"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-200">
                1
              </div>
              <div>
                <h5 className="font-bold text-xs sm:text-sm text-[#2D241E]">Hình Trụ</h5>
                <p className="text-[11px] text-[#766A61]">{"S_xq = 2πrh • V = πr²h"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                100%
              </span>
              <ChevronRight className="w-4 h-4 text-[#8C7E72]" />
            </div>
          </div>

          {/* Chuyên đề 2: Hình Nón */}
          <div
            onClick={() => handleContinueLesson('cone')}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFFDF8] border border-[#EADFCB] hover:border-orange-300 active:bg-orange-50/50 transition-all cursor-pointer shadow-2xs touch-manipulation"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#FF6B00] flex items-center justify-center font-bold text-sm border border-orange-200">
                2
              </div>
              <div>
                <h5 className="font-bold text-xs sm:text-sm text-[#2D241E]">Hình Nón</h5>
                <p className="text-[11px] text-[#766A61]">{"S_xq = πrl • V = (1/3)πr²h"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
                85%
              </span>
              <ChevronRight className="w-4 h-4 text-[#8C7E72]" />
            </div>
          </div>

          {/* Chuyên đề 3: Hình Cầu */}
          <div
            onClick={() => handleContinueLesson('sphere')}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFFDF8] border-2 border-orange-400 bg-orange-50/30 active:bg-orange-100/50 transition-all cursor-pointer shadow-xs touch-manipulation"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm border border-emerald-200">
                3
              </div>
              <div>
                <h5 className="font-bold text-xs sm:text-sm text-[#2D241E]">Hình Cầu (Đang học)</h5>
                <p className="text-[11px] text-[#766A61]">{"S = 4πR² • V = (4/3)πR³"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-lg border border-orange-300">
                70%
              </span>
              <ChevronRight className="w-4 h-4 text-[#FF6B00]" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. DAILY MISSIONS (VERTICAL PROGRESS CARDS) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Target className="w-4 h-4 text-[#8F3E32]" />
            <h4 className="font-bold text-sm text-[#2D241E]">Nhiệm Vụ Hôm Nay</h4>
          </div>
          <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
            +50 XP
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#EADFCB] space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-[#2D241E]">
              🎯 Tính thể tích hình nón và hình trụ
            </span>
            <span className="text-xs font-mono font-bold text-[#8F3E32]">2/3</span>
          </div>

          {/* Graphical Progress Bar (██████░░) */}
          <div className="space-y-1">
            <div className="w-full h-3 rounded-full bg-[#EFE7DC] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                style={{ width: '66%' }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#766A61] font-mono">
              <span>Đã hoàn thành 2 bài</span>
              <span>Còn 1 bài nữa</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('/game')}
            className="w-full min-h-[44px] rounded-xl bg-[#2D241E] hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform touch-manipulation"
          >
            <span>Chơi Thử Thách Ngay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
