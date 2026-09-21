/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - REDESIGNED APP HEADER (LIGHT EDITORIAL THEME)
 * Sticky, white/translucent with backdrop-blur, subtle border and light shadow.
 * Context-aware navigation for Student (Learning Map, AI Hình học, Hồ sơ, Menu)
 * and Teacher (Tổng quan, Học sinh, Báo cáo, Cài đặt).
 */

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useTeacherAI } from '../teacher-ai/TeacherContext';
import {
  Layers,
  Map,
  Bot,
  Brain,
  Menu,
  X,
  Search,
  Volume2,
  VolumeX,
  GraduationCap,
  Users,
  BarChart3,
  Settings,
  LogOut,
  LogIn,
  Sparkles,
  BookOpen,
  Compass,
  CheckCircle2,
  FileCheck,
  Award,
  Globe2,
  ChevronRight,
  ShieldCheck,
  Eye,
  ArrowLeft,
  Gift,
  Trophy
} from 'lucide-react';
import { QuestChestsModal } from '../gamification/QuestChestsModal';
import { KnowledgeTowerModal } from '../gamification/KnowledgeTowerModal';

export const Header: React.FC = () => {
  const { currentRoute, settings, updateSettings, setSearchOpen, navigateTo } = useApp();
  const {
    studentSession,
    teacherSession,
    studentUser,
    teacherUser,
    isStudentAuthenticated,
    isTeacherAuthenticated,
    openLogoutModal,
    role,
    isTeacher,
    isStudent,
    isStudentPreview,
    enterStudentPreview,
    exitStudentPreview
  } = useAuth();
  const { showInfo } = useToast();
  const { setIsProfileModalOpen } = useTeacherAI();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isChestsModalOpen, setIsChestsModalOpen] = useState(false);
  const [isTowerModalOpen, setIsTowerModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close desktop dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileDrawerOpen(false);
    setIsMenuOpen(false);
  }, [currentRoute]);

  const getAvatarInitial = (name?: string): string => {
    if (!name) return 'H';
    const parts = name.trim().split(/\s+/);
    const last = parts[parts.length - 1];
    return last ? last.charAt(0).toUpperCase() : name.charAt(0).toUpperCase();
  };

  const isTeacherRoute = currentRoute === '/teacher' || currentRoute === '/teacher-dashboard';
  const showTeacherNav = isTeacherRoute && isTeacherAuthenticated;

  return (
    <>
      <header
        id="app-header"
        className="sticky top-0 z-30 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-2xs transition-all select-none"
      >
        <div className="max-w-[1536px] 2xl:max-w-[1600px] mx-auto px-3.5 sm:px-5 lg:px-7 h-16 flex items-center justify-between gap-4">
          
          {/* ========================================================================= */}
          {/* 1. BÊN TRÁI: [Logo hình học] GEOMETRY LAB                                */}
          {/* ========================================================================= */}
          <div className="flex items-center gap-3">
            <button
              id="header-brand-logo"
              type="button"
              onClick={() => navigateTo(showTeacherNav ? '/teacher-dashboard' : '/home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
              title="Về Trang Chủ Geometry Lab"
            >
              <div className="w-9 h-9 rounded-xl bg-[#16A34A] flex items-center justify-center text-white shadow-[0_2px_8px_rgba(22,163,74,0.3)] group-hover:scale-105 group-active:scale-95 transition-transform duration-150">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading text-base sm:text-lg font-extrabold tracking-tight text-slate-900 leading-none">
                    GEOMETRY LAB
                  </span>
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] leading-none">
                    TOÁN 9
                  </span>
                </div>
                <span className="text-[10px] text-gray-600 font-medium hidden sm:block leading-tight">
                  Trụ • Nón • Cầu
                </span>
              </div>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* 2. BÊN PHẢI: NAVIGATION (STUDENT vs TEACHER)                              */}
          {/* ========================================================================= */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* ----------------------------------------------------------------------- */}
            {/* A. MENU BÊN PHẢI CHO GIÁO VIÊN (KHI ĐANG Ở TEACHER ROUTE)               */}
            {/* ----------------------------------------------------------------------- */}
            {showTeacherNav ? (
              <nav className="hidden md:flex items-center gap-1.5" id="teacher-header-nav">
                {/* 1. Tổng quan */}
                <button
                  id="teacher-nav-overview"
                  type="button"
                  onClick={() => navigateTo('/teacher-dashboard')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentRoute === '/teacher-dashboard'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs'
                      : 'text-gray-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>Tổng quan</span>
                </button>

                {/* 2. Học sinh */}
                <button
                  id="teacher-nav-students"
                  type="button"
                  onClick={() => navigateTo('/teacher-dashboard')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>Học sinh</span>
                </button>

                {/* 3. Báo cáo */}
                <button
                  id="teacher-nav-reports"
                  type="button"
                  onClick={() => navigateTo('/teacher-dashboard')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  <span>Báo cáo</span>
                </button>

                {/* 4. Xem giao diện học sinh với tư cách học sinh */}
                <button
                  id="teacher-to-student-link"
                  type="button"
                  onClick={() => enterStudentPreview()}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-all cursor-pointer border border-emerald-200 shadow-2xs"
                  title="Xem với tư cách học sinh (Chế độ xem trước an toàn)"
                >
                  <Eye className="w-4 h-4 text-emerald-600" />
                  <span>Xem giao diện HS</span>
                </button>

                {/* Teacher Account Badge & Logout */}
                <div className="h-5 w-px bg-slate-200 mx-1" />

                <div className="flex items-center gap-2 pl-1">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 text-white rounded-xl text-xs font-semibold shadow-2xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span className="font-bold hidden lg:inline">{teacherUser?.fullName || 'GIÁO VIÊN'}</span>
                  </div>

                  <button
                    id="teacher-logout-btn"
                    type="button"
                    onClick={() => openLogoutModal('teacher')}
                    title="Đăng xuất giáo viên"
                    className="p-2 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer border border-slate-200 shadow-2xs"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </nav>
            ) : (
              /* ----------------------------------------------------------------------- */
              /* B. COMPACT MASTHEAD NAVIGATION CHO HỌC SINH (7 PRIMARY DESTINATIONS)   */
              /* ----------------------------------------------------------------------- */
              <nav className="hidden lg:flex items-center gap-1" id="student-header-nav">
                {/* 1. Trang chủ */}
                <button
                  id="student-nav-home"
                  type="button"
                  onClick={() => navigateTo('/home')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentRoute === '/home'
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/80 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Layers className={`w-3.5 h-3.5 ${currentRoute === '/home' ? 'text-blue-700' : 'text-slate-500'}`} />
                  <span>Trang chủ</span>
                </button>

                {/* 2. Lý thuyết */}
                <button
                  id="student-nav-theory"
                  type="button"
                  onClick={() => navigateTo('/theory')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentRoute === '/theory' || currentRoute === '/cylinder' || currentRoute === '/cone' || currentRoute === '/sphere'
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/80 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className={`w-3.5 h-3.5 ${currentRoute.startsWith('/theory') || currentRoute === '/cylinder' || currentRoute === '/cone' || currentRoute === '/sphere' ? 'text-blue-700' : 'text-slate-500'}`} />
                  <span>Lý thuyết</span>
                </button>

                {/* 3. Khám phá 3D */}
                <button
                  id="student-nav-explore"
                  type="button"
                  onClick={() => navigateTo('/explore')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentRoute === '/explore'
                      ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200/80 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Compass className={`w-3.5 h-3.5 ${currentRoute === '/explore' ? 'text-teal-700' : 'text-slate-500'}`} />
                  <span>Khám phá 3D</span>
                </button>

                {/* 4. Luyện tập */}
                <button
                  id="student-nav-practice"
                  type="button"
                  onClick={() => navigateTo('/practice')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentRoute === '/practice'
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/80 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${currentRoute === '/practice' ? 'text-blue-700' : 'text-slate-500'}`} />
                  <span>Luyện tập</span>
                </button>

                {/* 5. STEM */}
                <button
                  id="student-nav-stem"
                  type="button"
                  onClick={() => navigateTo('/real-world')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentRoute === '/real-world'
                      ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/80 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Globe2 className={`w-3.5 h-3.5 ${currentRoute === '/real-world' ? 'text-emerald-700' : 'text-slate-500'}`} />
                  <span>STEM</span>
                </button>

                {/* 6. AI Tutor */}
                <button
                  id="student-nav-ai"
                  type="button"
                  onClick={() => navigateTo('/ai')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentRoute === '/ai'
                      ? 'bg-blue-600 text-white font-bold border border-blue-600 shadow-2xs'
                      : 'text-blue-700 bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200/60'
                  }`}
                >
                  <Bot className={`w-3.5 h-3.5 ${currentRoute === '/ai' ? 'text-white' : 'text-blue-700'}`} />
                  <span>AI Tutor</span>
                  <span className={`text-[9px] px-1 py-0.2 rounded font-extrabold ${
                    currentRoute === '/ai' ? 'bg-white/20 text-white' : 'bg-white text-blue-700 border border-blue-200'
                  }`}>
                    24/7
                  </span>
                </button>

                {/* 7. Ôn thi vào 10 */}
                <button
                  id="student-nav-exam-prep"
                  type="button"
                  onClick={() => navigateTo('/exam-prep')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentRoute === '/exam-prep'
                      ? 'bg-rose-50 text-rose-800 font-bold border border-rose-200/80 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <GraduationCap className={`w-3.5 h-3.5 ${currentRoute === '/exam-prep' ? 'text-rose-700' : 'text-slate-500'}`} />
                  <span>Ôn thi vào 10</span>
                </button>

                {/* Quick Game Pill */}
                <button
                  id="student-nav-game"
                  type="button"
                  onClick={() => navigateTo('/game')}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentRoute === '/game'
                      ? 'bg-indigo-100 text-indigo-900 font-bold border border-indigo-300 shadow-2xs'
                      : 'text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100/90 border border-indigo-200/70'
                  }`}
                  title="Hình Học 9 Master (Trò chơi giáo dục chậm rãi, tĩnh lặng)"
                >
                  <Trophy className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Game 9</span>
                </button>

                {/* Profile & Gamification Dropdown Button */}
                <div className="relative ml-1" ref={menuRef}>
                  <button
                    id="student-nav-profile-menu-btn"
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border shadow-2xs ${
                      isMenuOpen
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                    title="Hồ sơ & thành tích"
                  >
                    <Brain className="w-3.5 h-3.5 text-amber-600" />
                    <span className="hidden xl:inline">Hồ sơ</span>
                  </button>

                  {/* Dropdown Popup */}
                  {isMenuOpen && (
                    <div
                      id="student-menu-dropdown"
                      className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-lg p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    >
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 py-1">
                        Hồ Sơ & Tiến Độ
                      </div>

                      <div className="space-y-0.5">
                        <button
                          type="button"
                          onClick={() => {
                            setIsProfileModalOpen(true);
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-900 transition-colors text-left"
                        >
                          <span className="flex items-center gap-2">
                            <Brain className="w-3.5 h-3.5 text-amber-500" />
                            Hồ Sơ Tư Duy 8 Chỉ Số
                          </span>
                          <Sparkles className="w-3 h-3 text-amber-500" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsChestsModalOpen(true);
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-900 transition-colors text-left"
                        >
                          <span className="flex items-center gap-2">
                            <Gift className="w-3.5 h-3.5 text-amber-600" />
                            Rương Đảo Tri Thức
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsTowerModalOpen(true);
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-900 transition-colors text-left"
                        >
                          <span className="flex items-center gap-2">
                            <Trophy className="w-3.5 h-3.5 text-indigo-600" />
                            Tháp Tri Thức STEM
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            navigateTo('/achievements');
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors text-left"
                        >
                          <span className="flex items-center gap-2">
                            <Award className="w-3.5 h-3.5 text-amber-500" />
                            Bảng Vàng Thành Tích
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      </div>

                      {/* Auth Status & Sessions */}
                      <div className="border-t border-slate-100 mt-2 pt-2 space-y-1">
                        {isStudentPreview ? (
                          <button
                            type="button"
                            onClick={() => {
                              setIsMenuOpen(false);
                              exitStudentPreview();
                              navigateTo('/teacher-dashboard');
                            }}
                            className="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Quay lại Bàn Làm Việc GV
                          </button>
                        ) : isStudentAuthenticated ? (
                          <button
                            type="button"
                            onClick={() => {
                              setIsMenuOpen(false);
                              openLogoutModal('student');
                            }}
                            className="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-red-600 hover:bg-red-50 rounded-xl text-xs font-semibold transition-colors"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            Đăng xuất ({studentUser?.fullName || 'Học sinh'})
                          </button>
                        ) : !isTeacher ? (
                          <button
                            type="button"
                            onClick={() => {
                              setIsMenuOpen(false);
                              navigateTo('/login');
                            }}
                            className="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors"
                          >
                            <LogIn className="w-3.5 h-3.5" />
                            Đăng nhập tài khoản học sinh
                          </button>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Avatar / User Profile */}
                <button
                  id="student-header-avatar"
                  type="button"
                  onClick={() => {
                    if (isStudentPreview) {
                      exitStudentPreview();
                      navigateTo('/teacher-dashboard');
                    } else {
                      navigateTo(isStudentAuthenticated ? '/student-profile' : '/login');
                    }
                  }}
                  className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 bg-white hover:bg-slate-50 rounded-full border border-slate-200 shadow-2xs transition-colors cursor-pointer ml-1"
                  title={isStudentPreview ? "Đang xem trước học sinh - Nhấn để quay lại Bàn làm việc GV" : isStudentAuthenticated ? "Hồ sơ tài khoản của em" : "Đăng nhập học sinh"}
                >
                  <div className={`w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-bold shadow-2xs ${
                    isStudentPreview ? 'bg-amber-600' : 'bg-gradient-to-br from-blue-600 to-indigo-600'
                  }`}>
                    {isStudentPreview ? <Eye className="w-3.5 h-3.5" /> : isStudentAuthenticated ? getAvatarInitial(studentUser?.fullName) : <LogIn className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-xs font-bold text-slate-800 hidden xl:inline truncate max-w-[120px]">
                    {isStudentPreview ? 'Xem Trước HS' : isStudentAuthenticated ? (studentUser?.fullName || 'Học sinh') : 'Đăng nhập'}
                  </span>
                </button>
              </nav>
            )}

            {/* ----------------------------------------------------------------------- */}
            {/* Quick Action Tools (Audio & Search)                                     */}
            {/* ----------------------------------------------------------------------- */}
            <div className="flex items-center gap-1.5">
              {/* Sound Toggle */}
              <button
                id="header-sound-btn"
                type="button"
                onClick={() => {
                  const next = !settings.soundEnabled;
                  updateSettings({ soundEnabled: next });
                  showInfo(next ? 'Đã bật âm thanh hỗ trợ' : 'Đã tắt âm thanh');
                }}
                className={`p-2 rounded-xl transition-colors cursor-pointer border shadow-2xs ${
                  settings.soundEnabled
                    ? 'text-orange-700 bg-orange-50 border-orange-200'
                    : 'text-slate-400 bg-white border-slate-200 hover:bg-slate-50'
                }`}
                title={settings.soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
              >
                {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Quick Search */}
              <button
                id="header-quick-search-btn"
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl text-slate-500 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs cursor-pointer"
                title="Tìm kiếm nhanh công thức (Ctrl+K)"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* ----------------------------------------------------------------------- */}
            {/* Mobile Hamburger Button                                                 */}
            {/* ----------------------------------------------------------------------- */}
            <button
              id="header-mobile-hamburger"
              type="button"
              onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs cursor-pointer"
              aria-label="Mở menu điều hướng"
            >
              {isMobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. MOBILE SLIDE-OVER DRAWER                                               */}
      {/* ========================================================================= */}
      {isMobileDrawerOpen && (
        <div
          id="mobile-header-drawer"
          className="fixed inset-0 z-40 md:hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
          onClick={() => setIsMobileDrawerOpen(false)}
        >
          <div
            className="w-4/5 max-w-sm bg-white h-full shadow-2xl p-5 overflow-y-auto flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#16A34A] flex items-center justify-center text-white font-bold shadow-xs">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-extrabold text-slate-900">GEOMETRY LAB</h3>
                    <span className="text-[10px] text-[#16A34A] font-bold">
                      {showTeacherNav ? 'Cổng Quản Trị Giáo Viên' : 'Không Gian Học Toán 9'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <div className="py-4 space-y-1">
                {showTeacherNav ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        navigateTo('/teacher-dashboard');
                        setIsMobileDrawerOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-blue-50"
                    >
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                      <span>Tổng quan Dashboard</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigateTo('/teacher-dashboard');
                        setIsMobileDrawerOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-blue-50"
                    >
                      <Users className="w-4 h-4 text-indigo-600" />
                      <span>Quản lý Học sinh</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigateTo('/teacher-dashboard');
                        setIsMobileDrawerOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-blue-50"
                    >
                      <BarChart3 className="w-4 h-4 text-emerald-600" />
                      <span>Báo cáo & Thống kê</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigateTo('/home');
                        setIsMobileDrawerOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-[#F0FDF4]"
                    >
                      <Map className="w-4 h-4 text-[#16A34A]" />
                      <span>Về Phòng Thí Nghiệm Lab</span>
                    </button>
                  </>
                ) : (
                  <>
                    {/* 1. Trang chủ */}
                    <button
                      type="button"
                      onClick={() => {
                        navigateTo('/home');
                        setIsMobileDrawerOpen(false);
                      }}
                      className={`w-full min-h-[48px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        currentRoute === '/home' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Layers className="w-5 h-5 text-blue-600" />
                      <span>Trang chủ</span>
                    </button>

                    {/* 2. Lý thuyết */}
                    <button
                      type="button"
                      onClick={() => {
                        navigateTo('/theory');
                        setIsMobileDrawerOpen(false);
                      }}
                      className={`w-full min-h-[48px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        currentRoute === '/theory' || currentRoute === '/cylinder' || currentRoute === '/cone' || currentRoute === '/sphere'
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <span>Lý thuyết</span>
                    </button>

                    {/* 3. Khám phá 3D */}
                    <button
                      type="button"
                      onClick={() => {
                        navigateTo('/explore');
                        setIsMobileDrawerOpen(false);
                      }}
                      className={`w-full min-h-[48px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        currentRoute === '/explore' ? 'bg-teal-50 text-teal-800 font-bold' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Compass className="w-5 h-5 text-teal-600" />
                      <span>Khám phá 3D</span>
                    </button>

                    {/* 4. Luyện tập */}
                    <button
                      type="button"
                      onClick={() => {
                        navigateTo('/practice');
                        setIsMobileDrawerOpen(false);
                      }}
                      className={`w-full min-h-[48px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        currentRoute === '/practice' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      <span>Luyện tập</span>
                    </button>

                    {/* 5. STEM */}
                    <button
                      type="button"
                      onClick={() => {
                        navigateTo('/real-world');
                        setIsMobileDrawerOpen(false);
                      }}
                      className={`w-full min-h-[48px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        currentRoute === '/real-world' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Globe2 className="w-5 h-5 text-emerald-600" />
                      <span>STEM</span>
                    </button>

                    {/* 6. AI Tutor */}
                    <button
                      type="button"
                      onClick={() => {
                        navigateTo('/ai');
                        setIsMobileDrawerOpen(false);
                      }}
                      className={`w-full min-h-[48px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        currentRoute === '/ai' ? 'bg-blue-600 text-white font-bold' : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Bot className="w-5 h-5" />
                        <span>AI Tutor</span>
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-extrabold ${
                        currentRoute === '/ai' ? 'bg-white/20 text-white' : 'bg-white text-blue-700 border border-blue-200'
                      }`}>
                        24/7
                      </span>
                    </button>

                    {/* 7. Ôn thi vào 10 */}
                    <button
                      type="button"
                      onClick={() => {
                        navigateTo('/exam-prep');
                        setIsMobileDrawerOpen(false);
                      }}
                      className={`w-full min-h-[48px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        currentRoute === '/exam-prep' ? 'bg-rose-50 text-rose-800 font-bold' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <GraduationCap className="w-5 h-5 text-rose-600" />
                      <span>Ôn thi vào 10</span>
                    </button>

                    {/* 8. Game */}
                    <button
                      type="button"
                      onClick={() => {
                        navigateTo('/game');
                        setIsMobileDrawerOpen(false);
                      }}
                      className={`w-full min-h-[48px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        currentRoute === '/game' ? 'bg-indigo-50 text-indigo-900 font-bold' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Trophy className="w-5 h-5 text-indigo-600" />
                      <span>Hình Học 9 Master (Game)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        navigateTo('/student-profile');
                        setIsMobileDrawerOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100"
                    >
                      <GraduationCap className="w-4 h-4 text-slate-600" />
                      <span>Tài khoản của em</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              {isStudentAuthenticated && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                    openLogoutModal('student');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-red-600 bg-red-50 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất học sinh ({studentUser?.fullName || 'Học sinh'})</span>
                </button>
              )}

              {isTeacher && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                    openLogoutModal('teacher');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất GV ({teacherUser?.fullName || 'Giáo viên'})</span>
                </button>
              )}

              {!isStudentAuthenticated && !isTeacher && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                    navigateTo('/login');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-orange-500 rounded-xl shadow-xs"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Đăng nhập tài khoản</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Gamification Modals */}
      <QuestChestsModal
        isOpen={isChestsModalOpen}
        onClose={() => setIsChestsModalOpen(false)}
      />
      <KnowledgeTowerModal
        isOpen={isTowerModalOpen}
        onClose={() => setIsTowerModalOpen(false)}
      />
    </>
  );
};
