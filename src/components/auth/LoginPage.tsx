/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - TEACHER AUTHENTICATION PORTAL
 * Students learn directly without login (open access).
 * Teachers log in to access student management, question bank & exam tools.
 */

import React, { useState } from 'react';
import { GeometricBackground } from './GeometricBackground';
import { AuthCard } from './AuthCard';
import { TeacherLoginForm } from './TeacherLoginForm';
import { HuskyInteractiveLoginPage } from './HuskyInteractiveLoginPage';
import {
  Compass,
  ShieldCheck,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

interface LoginPageProps {
  initialMode?: 'teacher' | 'student';
  onSuccessRedirect?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onSuccessRedirect
}) => {
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
    } else {
      window.location.hash = '#/teacher-dashboard';
    }
  };

  const switchTheme = (newTheme: 'husky' | 'classic') => {
    setLoginTheme(newTheme);
    try {
      localStorage.setItem('geometry_lab_login_theme', newTheme);
    } catch {}
  };

  const handleReturnToClassroom = () => {
    window.location.hash = '#/home';
  };

  // Render Husky Interactive Login when chosen
  if (loginTheme === 'husky') {
    return (
      <HuskyInteractiveLoginPage
        initialMode="teacher"
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
      {/* Subtle lightweight SVG Grid Backdrop */}
      <GeometricBackground />

      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center space-y-6">
        {/* Top actions: Theme switch & Return to Classroom */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <button
            type="button"
            onClick={handleReturnToClassroom}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về Phòng Học (Học Sinh)</span>
          </button>

          <button
            type="button"
            onClick={() => switchTheme('husky')}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>Màn hình Husky Interactive 🐶</span>
          </button>
        </div>

        {/* Brand & Headline */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 text-amber-300 border-2 border-slate-900 shadow-[3px_3px_0_#171e19] mb-1">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif uppercase">
            CỔNG QUẢN TRỊ <span className="text-amber-500">GIÁO VIÊN</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto">
            Học sinh không cần đăng nhập. Thầy/Cô vui lòng nhập thông tin xác thực để quản lý ngân hàng câu hỏi, lớp học và tiến độ.
          </p>
        </div>

        {/* Dedicated Login Card */}
        <AuthCard id="auth-login-card" className="w-full shadow-md border-2 border-slate-900 shadow-[4px_4px_0_#171e19]">
          <TeacherLoginForm
            onSuccess={handleLoginSuccess}
            onSwitchToStudent={handleReturnToClassroom}
          />
        </AuthCard>

        {/* Footer Note */}
        <div className="text-center text-xs text-slate-400 space-y-1 pt-1">
          <p>Phòng Thí Nghiệm Hình Học Không Gian Toán 9 • GDPT 2018</p>
          <p className="text-[11px] text-slate-400">Hình Trụ • Hình Nón • Hình Cầu</p>
        </div>
      </div>
    </div>
  );
};
