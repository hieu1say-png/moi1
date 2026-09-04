/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * STUDENT LEARNING MAP — "LEARNING ISLANDS"
 * - 7 Interconnected Learning Islands:
 *   01 — HÌNH TRỤ
 *   02 — HÌNH NÓN
 *   03 — HÌNH CẦU
 *   04 — PHÒNG THÍ NGHIỆM
 *   05 — ĐẤU TRƯỜNG CÔNG THỨC
 *   06 — BÀI TẬP THỰC TẾ
 *   07 — HỒ SƠ TƯ DUY
 * - Design: Rounded 28-36px, subtle floating offsets, orange accents, geometric decorative SVG backgrounds.
 * - Pure CSS transform & staggered grid (no JS scroll parallax).
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShapeType, RouteId } from '../../types';
import {
  Cylinder,
  Cone,
  Globe2,
  FlaskConical,
  Trophy,
  Compass,
  BrainCircuit,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

interface IslandItem {
  number: string;
  title: string;
  shortDesc: string;
  details: string;
  defaultProgress: number;
  actionText: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  gradientBorder: string;
  badgeBg: string;
  shapeId?: ShapeType;
  route?: RouteId;
  offsetClass: string;
  svgPattern: 'cylinder' | 'cone' | 'sphere' | 'lab' | 'arena' | 'realworld' | 'mind';
}

export const LearningIslands: React.FC = () => {
  const { navigateTo, setSelectedShape, userStats } = useApp();

  // Dynamic progress calculation based on user statistics
  const getIslandProgress = (islandNum: string): number => {
    switch (islandNum) {
      case '01':
        return userStats.exploredShapes.includes('cylinder') ? 85 : 40;
      case '02':
        return userStats.exploredShapes.includes('cone') ? 78 : 30;
      case '03':
        return userStats.exploredShapes.includes('sphere') ? 70 : 25;
      case '04':
        return 92; // Laboratory experiment mastery
      case '05':
        return Math.min(100, Math.max(35, Math.round((userStats.completedPractices.length / 6) * 100)));
      case '06':
        return 65;
      case '07':
        return Math.min(100, Math.max(50, Math.round(((userStats.xp % 500) / 500) * 100)));
      default:
        return 50;
    }
  };

  const islands: IslandItem[] = [
    {
      number: '01',
      title: 'HÌNH TRỤ',
      shortDesc: 'Khám phá: R, h, V',
      details: 'Sxq = 2πrh • Stp = 2πrh + 2πr² • V = πr²h',
      defaultProgress: 85,
      actionText: 'KHÁM PHÁ',
      icon: Cylinder,
      accentColor: '#F97316', // Orange
      gradientBorder: 'hover:border-orange-400 group-hover:shadow-[0_12px_32px_rgba(249,115,22,0.14)]',
      badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
      shapeId: 'cylinder',
      route: '/explore',
      offsetClass: 'md:translate-y-0',
      svgPattern: 'cylinder'
    },
    {
      number: '02',
      title: 'HÌNH NÓN',
      shortDesc: 'Khám phá: R, h, l',
      details: 'Sxq = πrl • Stp = πrl + πr² • V = 1/3 πr²h',
      defaultProgress: 78,
      actionText: 'KHÁM PHÁ',
      icon: Cone,
      accentColor: '#EA580C',
      gradientBorder: 'hover:border-amber-400 group-hover:shadow-[0_12px_32px_rgba(234,88,12,0.14)]',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
      shapeId: 'cone',
      route: '/explore',
      offsetClass: 'md:translate-y-3 lg:translate-y-4',
      svgPattern: 'cone'
    },
    {
      number: '03',
      title: 'HÌNH CẦU',
      shortDesc: 'Khám phá: R, d, S',
      details: 'd = 2R • S = 4πR² • V = 4/3 πR³',
      defaultProgress: 70,
      actionText: 'KHÁM PHÁ',
      icon: Globe2,
      accentColor: '#D97706',
      gradientBorder: 'hover:border-emerald-400 group-hover:shadow-[0_12px_32px_rgba(217,119,6,0.14)]',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      shapeId: 'sphere',
      route: '/explore',
      offsetClass: 'md:-translate-y-2 lg:-translate-y-1',
      svgPattern: 'sphere'
    },
    {
      number: '04',
      title: 'PHÒNG THÍ NGHIỆM',
      shortDesc: 'Nghịch lý 1/3: Rót nước',
      details: 'Thí nghiệm thực chứng V_nón = 1/3 V_trụ',
      defaultProgress: 92,
      actionText: 'VÀO PHÒNG',
      icon: FlaskConical,
      accentColor: '#0284C7',
      gradientBorder: 'hover:border-sky-400 group-hover:shadow-[0_12px_32px_rgba(2,132,199,0.14)]',
      badgeBg: 'bg-sky-50 text-sky-800 border-sky-200',
      shapeId: 'cone',
      route: '/explore',
      offsetClass: 'md:translate-y-2 lg:translate-y-3',
      svgPattern: 'lab'
    },
    {
      number: '05',
      title: 'ĐẤU TRƯỜNG CÔNG THỨC',
      shortDesc: 'Luyện tập & Thi vào 10',
      details: 'Flashcard phản xạ, trắc nghiệm & đề thi chuyên',
      defaultProgress: 60,
      actionText: 'THI ĐẤU',
      icon: Trophy,
      accentColor: '#E11D48',
      gradientBorder: 'hover:border-rose-400 group-hover:shadow-[0_12px_32px_rgba(225,29,72,0.14)]',
      badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
      route: '/practice',
      offsetClass: 'md:-translate-y-3 lg:-translate-y-2',
      svgPattern: 'arena'
    },
    {
      number: '06',
      title: 'BÀI TẬP THỰC TẾ',
      shortDesc: 'Ứng dụng đời sống',
      details: 'Lon nước ngọt, Nón lá Huế, Vệ tinh Trái Đất',
      defaultProgress: 65,
      actionText: 'THỰC HÀNH',
      icon: Compass,
      accentColor: '#059669',
      gradientBorder: 'hover:border-teal-400 group-hover:shadow-[0_12px_32px_rgba(5,150,105,0.14)]',
      badgeBg: 'bg-teal-50 text-teal-800 border-teal-200',
      route: '/real-world',
      offsetClass: 'md:translate-y-2 lg:translate-y-4',
      svgPattern: 'realworld'
    },
    {
      number: '07',
      title: 'HỒ SƠ TƯ DUY',
      shortDesc: '8 Năng lực không gian',
      details: 'Biểu đồ radar tư duy & Bảng vàng thành tích',
      defaultProgress: 85,
      actionText: 'XEM HỒ SƠ',
      icon: BrainCircuit,
      accentColor: '#7C3AED',
      gradientBorder: 'hover:border-purple-400 group-hover:shadow-[0_12px_32px_rgba(124,58,237,0.14)]',
      badgeBg: 'bg-purple-50 text-purple-800 border-purple-200',
      route: '/achievements',
      offsetClass: 'md:translate-y-0',
      svgPattern: 'mind'
    }
  ];

  const handleIslandClick = (island: IslandItem) => {
    if (island.shapeId) {
      setSelectedShape(island.shapeId);
    }
    if (island.route) {
      navigateTo(island.route);
    }
  };

  const renderGeometricBg = (pattern: IslandItem['svgPattern']) => {
    switch (pattern) {
      case 'cylinder':
        return (
          <svg className="absolute right-0 bottom-0 w-36 h-36 opacity-10 pointer-events-none stroke-current text-orange-600" viewBox="0 0 100 100" fill="none">
            <ellipse cx="50" cy="20" rx="35" ry="12" strokeWidth="1.5" />
            <ellipse cx="50" cy="80" rx="35" ry="12" strokeWidth="1.5" />
            <line x1="15" y1="20" x2="15" y2="80" strokeWidth="1.5" />
            <line x1="85" y1="20" x2="85" y2="80" strokeWidth="1.5" />
            <line x1="50" y1="20" x2="50" y2="80" strokeDasharray="3 3" strokeWidth="1" />
          </svg>
        );
      case 'cone':
        return (
          <svg className="absolute right-0 bottom-0 w-36 h-36 opacity-10 pointer-events-none stroke-current text-amber-600" viewBox="0 0 100 100" fill="none">
            <ellipse cx="50" cy="80" rx="35" ry="12" strokeWidth="1.5" />
            <line x1="50" y1="12" x2="15" y2="80" strokeWidth="1.5" />
            <line x1="50" y1="12" x2="85" y2="80" strokeWidth="1.5" />
            <line x1="50" y1="12" x2="50" y2="80" strokeDasharray="3 3" strokeWidth="1" />
            <line x1="50" y1="80" x2="85" y2="80" strokeDasharray="3 3" strokeWidth="1" />
          </svg>
        );
      case 'sphere':
        return (
          <svg className="absolute right-0 bottom-0 w-36 h-36 opacity-10 pointer-events-none stroke-current text-emerald-600" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="38" strokeWidth="1.5" />
            <ellipse cx="50" cy="50" rx="38" ry="14" strokeWidth="1.5" />
            <ellipse cx="50" cy="50" rx="14" ry="38" strokeDasharray="3 3" strokeWidth="1" />
            <circle cx="50" cy="50" r="2" fill="currentColor" />
          </svg>
        );
      case 'lab':
        return (
          <svg className="absolute right-0 bottom-0 w-36 h-36 opacity-10 pointer-events-none stroke-current text-sky-600" viewBox="0 0 100 100" fill="none">
            <path d="M40 15 L60 15 M50 15 L50 35 L75 80 A8 8 0 0 1 68 90 L32 90 A8 8 0 0 1 25 80 L50 35" strokeWidth="1.5" />
            <path d="M35 75 Q50 70 65 75" strokeWidth="1.5" fill="currentColor" fillOpacity="0.3" />
            <circle cx="45" cy="65" r="2" fill="currentColor" />
            <circle cx="55" cy="55" r="3" fill="currentColor" />
          </svg>
        );
      case 'arena':
        return (
          <svg className="absolute right-0 bottom-0 w-36 h-36 opacity-10 pointer-events-none stroke-current text-rose-600" viewBox="0 0 100 100" fill="none">
            <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" strokeWidth="1.5" />
            <polygon points="50,25 75,38 75,62 50,75 25,62 25,38" strokeDasharray="3 3" strokeWidth="1" />
            <circle cx="50" cy="50" r="4" fill="currentColor" />
          </svg>
        );
      case 'realworld':
        return (
          <svg className="absolute right-0 bottom-0 w-36 h-36 opacity-10 pointer-events-none stroke-current text-teal-600" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="36" strokeWidth="1.5" />
            <path d="M14 50 Q50 20 86 50 Q50 80 14 50 Z" strokeWidth="1.2" />
            <path d="M50 14 Q20 50 50 86 Q80 50 50 14 Z" strokeWidth="1.2" />
          </svg>
        );
      case 'mind':
        return (
          <svg className="absolute right-0 bottom-0 w-36 h-36 opacity-10 pointer-events-none stroke-current text-purple-600" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="35" strokeDasharray="2 2" strokeWidth="1" />
            <polygon points="50,20 78,35 78,65 50,80 22,65 22,35" strokeWidth="1.5" />
            <line x1="50" y1="50" x2="50" y2="20" strokeWidth="1" />
            <line x1="50" y1="50" x2="78" y2="35" strokeWidth="1" />
            <line x1="50" y1="50" x2="78" y2="65" strokeWidth="1" />
            <line x1="50" y1="50" x2="50" y2="80" strokeWidth="1" />
            <line x1="50" y1="50" x2="22" y2="65" strokeWidth="1" />
            <line x1="50" y1="50" x2="22" y2="35" strokeWidth="1" />
          </svg>
        );
    }
  };

  return (
    <section id="student-learning-islands" className="w-full space-y-6">
      {/* Header of Learning Islands */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-extrabold uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              LEARNING ISLANDS
            </span>
            <span className="text-xs text-gray-500 font-medium hidden md:inline">
              Bản Đồ Quần Đảo Học Tập Toán 9
            </span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">
            LỘ TRÌNH 7 ĐẢO HỌC TẬP KHÔNG GIAN
          </h2>
        </div>
        <div className="text-xs text-gray-600 font-medium">
          Chinh phục từng đảo để nâng hạng tư duy và tích lũy XP
        </div>
      </div>

      {/* Floating Islands Grid (Staggered Floating Layout with rounded 28-36px) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 pt-2">
        {islands.map((island) => {
          const Icon = island.icon;
          const progress = getIslandProgress(island.number);
          const isFinished = progress >= 100;

          return (
            <div
              key={island.number}
              id={`island-card-${island.number}`}
              className={`group relative rounded-[32px] bg-white/95 backdrop-blur-sm border border-slate-200/90 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] flex flex-col justify-between overflow-hidden cursor-pointer ${island.offsetClass} ${island.gradientBorder}`}
              onClick={() => handleIslandClick(island)}
            >
              {/* Geometric Decorative SVG Background */}
              {renderGeometricBg(island.svgPattern)}

              {/* Ambient Glow Accent */}
              <div
                className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-20 transition-opacity group-hover:opacity-40 pointer-events-none"
                style={{ backgroundColor: island.accentColor }}
              />

              {/* Top Row: Island Number + Icon */}
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter">
                    {island.number}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                </div>

                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center border shadow-xs transition-transform duration-300 group-hover:scale-110 ${island.badgeBg}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Content Area */}
              <div className="my-4 space-y-2 relative z-10">
                <h3 className="font-heading text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-orange-600 transition-colors">
                  {island.title}
                </h3>

                <div className="inline-block px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-700">
                  {island.shortDesc}
                </div>

                <p className="text-xs text-gray-500 font-medium line-clamp-2 leading-relaxed">
                  {island.details}
                </p>
              </div>

              {/* Bottom: Progress Bar + Action Button */}
              <div className="pt-3 border-t border-slate-100 space-y-3 relative z-10">
                {/* Progress Metric */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-gray-500 font-medium">Tiến độ</span>
                    <span className="font-mono text-slate-900 flex items-center gap-1">
                      {isFinished && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      {progress}%
                    </span>
                  </div>

                  {/* Custom Smooth Progress Bar with Orange Accent */}
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500 shadow-xs"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Island Action Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIslandClick(island);
                  }}
                  className="w-full py-2.5 px-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-1.5 shadow-[0_4px_12px_rgba(249,115,22,0.25)] group-hover:shadow-[0_6px_16px_rgba(249,115,22,0.35)] cursor-pointer group-hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>{island.actionText}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LearningIslands;
