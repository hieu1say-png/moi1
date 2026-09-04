/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - AUTHENTICATION ENTRY POINT
 * Screen 1 conforming strictly to EdTech Security & UX guidelines:
 * - Direct Gatekeeper: Rendered before ANY internal dashboard or AppShell
 * - Zero 3D Canvas overhead during unauthenticated state
 * - Clean prominent role toggle: [ Học sinh ] [ Giáo viên ]
 * - Clear credential validation & helpful error reporting
 * - Official production login interface without test credentials
 */

import React, { useState } from 'react';
import { GeometricBackground } from './GeometricBackground';
import { AuthCard } from './AuthCard';
import { StudentLoginForm } from './StudentLoginForm';
import { TeacherLoginForm } from './TeacherLoginForm';
import { HuskyInteractiveLoginPage } from './HuskyInteractiveLoginPage';
import {
  Compass,
  GraduationCap,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface LoginPageProps {
  initialMode?: 'student' | 'teacher';
  onSuccessRedirect?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  initialMode = 'student',
  onSuccessRedirect
}) => {
  const [authMode, setAuthMode] = useState<'student' | 'teacher'>(initialMode);
  const [loginTheme, setLoginTheme] = useState<'husky' | 'classic'>(() => {
    try {
      return (localStorage.getItem('geometry_lab_login_theme') as 'husky' | 'classic') || 'husky';
    } catch {
      return 'husky';
    }
  });

  const handleLoginSuccess = () => {
    if (onSuccessRedirect) {
      onSuccessRedirect();
    }
  };

  const switchTheme = (newTheme: 'husky' | 'classic') => {
    setLoginTheme(newTheme);
    try {
      localStorage.setItem('geometry_lab_login_theme', newTheme);
    } catch {}
  };

  // Render Husky Interactive Login when chosen
  if (loginTheme === 'husky') {
    return (
      <HuskyInteractiveLoginPage
        initialMode={authMode}
        onSuccessRedirect={handleLoginSuccess}
        onSwitchToClassic={() => switchTheme('classic')}
      />
    );
  }

  return (
    <div
      id="geometry-login-page"
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] px-4 py-8 sm:py-12 select-none"
    >
      {/* Subtle lightweight SVG Grid Backdrop (No WebGL/3D Canvas) */}
      <GeometricBackground />

      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center space-y-6">
        {/* Switch to Husky Interactive Theme Pill */}
        <button
          type="button"
          onClick={() => switchTheme('husky')}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>Trải nghiệm màn hình đăng nhập Husky Interactive 🐶</span>
        </button>

        {/* Brand & Headline */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-500 text-white shadow-sm mb-1">
            <Compass className="w-7 h-7" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-serif uppercase">
            GEOMETRY LAB <span className="text-orange-500">TOÁN 9</span>
          </h1>

          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            Phòng thí nghiệm Hình học Không gian • Ôn thi vào Lớp 10
          </p>
        </div>

        {/* Role Toggle Selector [ Học sinh ] [ Giáo viên ] */}
        <div className="w-full max-w-xs flex p-1 rounded-2xl bg-slate-100 border border-slate-200/90 shadow-2xs">
          <button
            id="login-role-tab-student"
            type="button"
            onClick={() => setAuthMode('student')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              authMode === 'student'
                ? 'bg-white text-orange-600 shadow-xs border border-gray-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Học Sinh</span>
          </button>

          <button
            id="login-role-tab-teacher"
            type="button"
            onClick={() => setAuthMode('teacher')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              authMode === 'teacher'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Giáo Viên</span>
          </button>
        </div>

        {/* Dedicated Login Card */}
        <AuthCard id="auth-login-card" className="w-full shadow-md">
          {authMode === 'student' ? (
            <StudentLoginForm
              onSuccess={handleLoginSuccess}
              onSwitchToTeacher={() => setAuthMode('teacher')}
            />
          ) : (
            <TeacherLoginForm
              onSuccess={handleLoginSuccess}
              onSwitchToStudent={() => setAuthMode('student')}
            />
          )}
        </AuthCard>

        {/* Footer Note */}
        <div className="text-center text-xs text-gray-400 space-y-1 pt-1">
          <p>Chương trình Hình học Không gian Lớp 9 • SGK Mới</p>
          <p className="text-[11px] text-gray-400">Hình Trụ (San hô) • Hình Nón (Đất nung) • Hình Cầu (Xanh ngọc)</p>
        </div>
      </div>
    </div>
  );
};
