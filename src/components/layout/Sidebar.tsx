/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - DESKTOP SIDEBAR NAVIGATION (WARM IVORY THEME)
 * Items: Trang chủ, Lý thuyết, Khám phá 3D, Luyện tập, Ứng dụng thực tế, Thành tích, Cài đặt
 * Warm academic layout, organic paper feel, soft tactile feedback.
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import { RouteId, ShapeType } from '../../types';
import {
  Home,
  BookOpen,
  Compass,
  CheckSquare,
  Globe,
  Award,
  Settings,
  Layers,
  Sparkles,
  ChevronRight,
  Bot,
  GraduationCap,
  School
} from 'lucide-react';
import { ProgressBar } from '../common/ProgressBar';
import { useTeacherStore } from '../../stores/useTeacherStore';
import { useTeacherAI } from '../teacher-ai/TeacherContext';
import { TeacherAvatar } from '../teacher-ai/TeacherAvatar';
import { useAuth } from '../../context/AuthContext';

interface NavItem {
  route: RouteId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeClass?: string;
}

const BASE_NAV_ITEMS: NavItem[] = [
  { route: '/home', label: 'Trang chủ', icon: Home },
  { route: '/theory', label: 'Lý thuyết', icon: BookOpen, badge: 'SGK 9' },
  { route: '/explore', label: 'Khám phá 3D', icon: Compass, badge: '3D Lab' },
  { route: '/practice', label: 'Luyện tập', icon: CheckSquare, badge: '6 Dạng' },
  { route: '/exam-prep', label: 'Ôn thi vào 10', icon: GraduationCap, badge: 'Đề thi', badgeClass: 'bg-[#FDF0ED] text-[#8F3E32] border border-[#F4D2CA]' },
  { route: '/real-world', label: 'Ứng dụng thực tế', icon: Globe },
  { route: '/achievements', label: 'Thành tích', icon: Award }
];

export const Sidebar: React.FC = () => {
  const { currentRoute, navigateTo, selectedShape, setSelectedShape, userStats } = useApp();
  const { isTeacher, isStudentPreview } = useAuth();
  const { teacherName: storedTeacherName, schoolName: storedSchoolName, currentClassName, profile } = useTeacherStore();
  const { setIsProfileModalOpen } = useTeacherAI();
  const teacherName = storedTeacherName || `${profile?.title || 'ThS.'} ${profile?.fullName || 'Trần Ngọc Hiếu'}`;
  const schoolName = storedSchoolName || profile?.schoolName || 'Trường Phổ Thông Thực Hành Sư Phạm';
  const className = currentClassName || 'Lớp 9A2';

  const showTeacherNav = isTeacher && !isStudentPreview;

  const navItems: NavItem[] = [
    ...BASE_NAV_ITEMS,
    ...(showTeacherNav
      ? ([
          { route: '/teacher-dashboard', label: 'Teacher Dashboard', icon: GraduationCap, badge: 'GV' },
          { route: '/settings', label: 'Cài đặt giáo viên', icon: Settings }
        ] as NavItem[])
      : ([
          { route: '/student-profile', label: 'Tài khoản của em', icon: GraduationCap }
        ] as NavItem[]))
  ];

  return (
    <aside
      id="app-sidebar"
      className="hidden lg:flex flex-col w-60 xl:w-64 bg-white/90 backdrop-blur-md text-slate-800 border-r border-slate-200/80 h-screen sticky top-0 shrink-0 z-30 select-none shadow-xs"
    >
      {/* 1. Brand Logo & Header */}
      <div className="p-4.5 xl:p-5 border-b border-slate-200/80 flex items-center justify-between">
        <button
          onClick={() => navigateTo('/home')}
          className="flex items-center gap-3 text-left group cursor-pointer w-full"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#16A34A] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-150">
            <Layers className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h1 className="font-heading text-base sm:text-lg font-extrabold tracking-tight text-slate-900">
                GEOMETRY LAB
              </h1>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#DCFCE7] text-[#15803D] rounded border border-[#BBF7D0]">
                TOÁN 9
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium truncate">Trụ • Cầu • Nón</p>
          </div>
        </button>
      </div>

      {/* 2. Shape Quick Switcher Tabs */}
      <div className="px-3.5 py-2.5 bg-slate-50/80 border-b border-slate-200/80">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 px-1 flex items-center justify-between">
          <span>Chủ Đề Không Gian</span>
          <span className="text-[9px] text-[#16A34A] font-bold">SGK Lớp 9</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'cylinder', label: 'Hình Trụ', activeClass: 'bg-[#059669] text-white font-bold shadow-xs' },
            { id: 'sphere', label: 'Hình Cầu', activeClass: 'bg-[#0D9488] text-white font-bold shadow-xs' },
            { id: 'cone', label: 'Hình Nón', activeClass: 'bg-[#16A34A] text-white font-bold shadow-xs' }
          ].map((item) => {
            const isSelected = selectedShape === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-topic-${item.id}`}
                onClick={() => {
                  setSelectedShape(item.id as ShapeType);
                  if (currentRoute === '/home') {
                    navigateTo('/explore');
                  }
                }}
                className={`
                  px-2 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 text-center truncate cursor-pointer
                  ${
                    isSelected
                      ? item.activeClass
                      : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900 bg-white border border-slate-200'
                  }
                `}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Navigation Items (7 Core Routes) */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto" id="sidebar-navigation">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">
          Điều Hướng Học Tập
        </div>

        {navItems.map((item) => {
          const isActive = currentRoute === item.route;
          const Icon = item.icon;

          return (
            <button
              key={item.route}
              id={`nav-item-${item.route.replace('/', '')}`}
              onClick={() => navigateTo(item.route)}
              className={`
                w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 group cursor-pointer relative
                ${
                  isActive
                    ? 'bg-[#16A34A] text-white font-bold shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }
              `}
            >
              {/* Left active line indicator */}
              {isActive && (
                <span className="absolute left-1 top-2 bottom-2 w-1 bg-white rounded-full" />
              )}

              <div className="flex items-center gap-3 min-w-0 pl-1.5">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors duration-150 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#16A34A]'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 transition-colors duration-150 ${
                    isActive
                      ? 'bg-white/20 text-white border border-white/30'
                      : item.badgeClass
                      ? item.badgeClass
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* AI Assistant Quick Pill */}
        <div className="pt-2">
          <button
            id="nav-item-ai"
            onClick={() => navigateTo('/ai')}
            className={`
              w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer border
              ${
                currentRoute === '/ai'
                  ? 'bg-[#047857] border-[#047857] text-white font-bold shadow-sm'
                  : 'bg-[#DCFCE7] border-[#BBF7D0] text-[#15803D] hover:bg-[#BBF7D0]/60'
              }
            `}
          >
            <div className="flex items-center gap-2">
              <Bot className={`w-3.5 h-3.5 ${currentRoute === '/ai' ? 'text-white' : 'text-[#15803D]'}`} />
              <span>Gia sư AI Toán 9</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${
              currentRoute === '/ai'
                ? 'bg-white/20 text-white border-white/30'
                : 'bg-white text-[#15803D] border-[#BBF7D0]'
            }`}>
              24/7
            </span>
          </button>
        </div>

        {/* Thông tin Lớp học & Giáo viên phụ trách */}
        <div className="mt-4 pt-3.5 px-2 border-t border-slate-200/80 space-y-1">
          <div className="flex items-center justify-between text-[10px] uppercase text-slate-500 font-bold tracking-wider">
            <span>LỚP & PHỤ TRÁCH</span>
            <span className="text-[#16A34A] font-mono font-bold">{className}</span>
          </div>
          <div className="text-xs font-bold text-slate-900 truncate" title={`${className} • ${teacherName} • ${schoolName}`}>
            {teacherName}
          </div>
          <div className="text-[11px] text-slate-500 truncate flex items-center gap-1.5" title={schoolName}>
            <School className="w-3 h-3 text-[#16A34A] shrink-0" />
            <span className="truncate">{schoolName}</span>
          </div>
        </div>
      </nav>

      {/* 4. Student Status & Progress Bottom Card */}
      <div className="p-3.5 m-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#16A34A] text-white flex items-center justify-center text-xs font-black shadow-2xs">
              {userStats.level}
            </div>
            <span className="text-xs font-bold text-slate-900">Cấp Độ Học Sinh</span>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#16A34A] text-white flex items-center gap-0.5 shadow-2xs">
            <Sparkles className="w-3 h-3" />
            {userStats.xp} XP
          </span>
        </div>

        <ProgressBar
          value={userStats.xp % 500}
          max={500}
          size="sm"
          color="cylinder"
          showValue={false}
        />

        <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
          <span>Chuỗi học: {userStats.streakDays} ngày 🔥</span>
          <button
            onClick={() => navigateTo('/achievements')}
            className="text-[#16A34A] hover:text-[#15803D] font-semibold cursor-pointer flex items-center hover:underline"
          >
            Huy hiệu <ChevronRight className="w-2.5 h-2.5 ml-0.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
