/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - TEACHER APPLICATION LAYOUT
 * Dedicated pedagogical administration layout for verified teachers:
 * - High-contrast clean professional layout
 * - Direct access to Teacher Dashboard & Class Management
 * - Safe presentation preview mode for geometry lessons
 * - Dedicated Logout confirmation with zero session leakage
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useTeacherStore } from '../../stores/useTeacherStore';
import { TeacherDashboardView } from '../../views/TeacherDashboardView';
import { SettingsView } from '../../views/SettingsView';
import { TheoryView } from '../../views/TheoryView';
import { ExploreView } from '../../views/ExploreView';
import { PracticeView } from '../../views/PracticeView';
import { LogoutConfirmModal } from '../auth/LogoutConfirmModal';
import { ToastContainer } from '../common/Toast';
import {
  Compass,
  ShieldCheck,
  LayoutDashboard,
  Settings,
  LogOut,
  Eye,
  ArrowLeft,
  GraduationCap
} from 'lucide-react';

export const TeacherAppLayout: React.FC = () => {
  const { currentRoute, navigateTo } = useApp();
  const { openLogoutModal, enterStudentPreview } = useAuth();
  const { teacherName, schoolName } = useTeacherStore();

  const isPreviewingStudentView =
    currentRoute === '/theory' ||
    currentRoute === '/cylinder' ||
    currentRoute === '/cone' ||
    currentRoute === '/sphere' ||
    currentRoute === '/explore' ||
    currentRoute === '/practice';

  return (
    <div id="teacher-app-layout" className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* 1. TOP TEACHER ADMINISTRATIVE HEADER */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand & Portal Badge */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo('/teacher-dashboard')}
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity cursor-pointer text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-xs">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                    GEOMETRY LAB
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-bold uppercase">
                    <ShieldCheck className="w-3 h-3 text-blue-400" />
                    <span>Cổng Quản Trị</span>
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium truncate max-w-[200px] sm:max-w-xs">
                  {schoolName || 'Trường Phổ Thông Thực Hành Sư Phạm'}
                </div>
              </div>
            </button>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              type="button"
              onClick={() => navigateTo('/teacher-dashboard')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                currentRoute === '/teacher-dashboard' || currentRoute === '/teacher'
                  ? 'bg-white/15 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-blue-400" />
              <span>Bàn Làm Việc</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('/settings')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                currentRoute === '/settings'
                  ? 'bg-white/15 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Settings className="w-4 h-4 text-amber-400" />
              <span>Cài Đặt</span>
            </button>

            <button
              id="btn-teacher-student-preview"
              type="button"
              onClick={() => enterStudentPreview()}
              className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 hover:text-white"
              title="Xem với tư cách học sinh (Chế độ xem trước an toàn)"
            >
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Xem Giao Diện Học Sinh</span>
            </button>
          </nav>

          {/* Right Action & Profile */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-right">
              <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-400/40 text-blue-300 font-bold text-xs flex items-center justify-center">
                TH
              </div>
              <div className="leading-tight text-left">
                <div className="text-xs font-bold text-white truncate max-w-[140px]">
                  {teacherName || 'ThS. Trần Ngọc Hiếu'}
                </div>
                <div className="text-[10px] text-blue-400 font-medium">Giáo viên Toán 9A2</div>
              </div>
            </div>

            <button
              id="teacher-header-logout-btn"
              type="button"
              onClick={() => openLogoutModal('teacher')}
              className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Đăng xuất khỏi phiên quản trị"
            >
              <LogOut className="w-3.5 h-3.5 text-red-300" />
              <span className="hidden sm:inline">Đăng Xuất</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. OPTIONAL TEACHER PREVIEW BANNER */}
      {isPreviewingStudentView && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-amber-900 font-semibold">
              <Eye className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Đang ở chế độ xem trước bài giảng học tập để trình chiếu giảng dạy</span>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('/teacher-dashboard')}
              className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Quay Lại Quản Trị</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. DYNAMIC TEACHER VIEW RENDERER */}
      <main className="flex-1 py-6">
        {(() => {
          if (currentRoute === '/settings') {
            return <SettingsView />;
          }
          if (
            currentRoute === '/theory' ||
            currentRoute === '/cylinder' ||
            currentRoute === '/cone' ||
            currentRoute === '/sphere'
          ) {
            return <TheoryView />;
          }
          if (currentRoute === '/explore') {
            return <ExploreView />;
          }
          if (currentRoute === '/practice') {
            return <PracticeView />;
          }
          return <TeacherDashboardView />;
        })()}
      </main>

      {/* Modals & Notifications */}
      <LogoutConfirmModal />
      <ToastContainer />
    </div>
  );
};
