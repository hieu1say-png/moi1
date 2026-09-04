/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - AUTH GUARD & ROUTE PROTECTION (V4.0)
 * Enforces role-based access control without cross-session contamination:
 * - Teacher dashboard is strictly protected by TeacherRouteGuard / isTeacherAuthenticated
 * - Student modules are fully accessible without accidental logouts
 * - Zero flash-of-unauthenticated content (powered by authReady)
 * - Safe navigation between all 3D geometry tabs and modules
 */

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { SessionLoading } from './SessionLoading';
import { LoginPage } from './LoginPage';
import { LoginModal } from './LoginModal';
import { LogoutConfirmModal } from './LogoutConfirmModal';
import { FirstLoginChangePasswordModal } from './FirstLoginChangePasswordModal';
import { AuthDebugPanel } from './AuthDebugPanel';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const {
    authReady,
    role,
    studentSession,
    teacherSession,
    isStudentAuthenticated,
    isTeacherAuthenticated
  } = useAuth();
  const { currentRoute, navigateTo } = useApp();

  // 1. Wait until authentication state is fully ready
  if (!authReady || studentSession.status === 'AUTH_LOADING' || teacherSession.status === 'AUTH_LOADING') {
    return <SessionLoading />;
  }

  const isTeacherRoute = currentRoute === '/teacher' || currentRoute === '/teacher-dashboard' || currentRoute === '/settings';

  // 2. Teacher Protected Area
  if (isTeacherRoute) {
    // If student is logged in and trying to access teacher area, block completely
    if (role === 'student' || (isStudentAuthenticated && !isTeacherAuthenticated)) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#F8FAFC]">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-2xs">
              <ShieldAlert className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-lg font-bold text-gray-900">
                KHU VỰC DÀNH CHO GIÁO VIÊN
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Khu vực này dành riêng cho Giáo viên phụ trách bộ môn. Em quay lại phòng thí nghiệm học tập nhé!
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigateTo('/home')}
                className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Về GEOMETRY LAB</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (!isTeacherAuthenticated) {
      return (
        <>
          <LoginPage initialMode="teacher" />
          <LogoutConfirmModal />
          <AuthDebugPanel />
        </>
      );
    }

    return (
      <>
        {children}
        <LoginModal />
        <LogoutConfirmModal />
        <AuthDebugPanel />
      </>
    );
  }

  // 3. Direct login page route
  if (currentRoute === '/login') {
    return (
      <>
        <LoginPage initialMode={isTeacherAuthenticated && !isStudentAuthenticated ? 'teacher' : 'student'} />
        <LogoutConfirmModal />
        <AuthDebugPanel />
      </>
    );
  }

  // 4. Student profile route requires student login
  if (currentRoute === '/student-profile' && !isStudentAuthenticated) {
    return (
      <>
        <LoginPage initialMode="student" />
        <LogoutConfirmModal />
        <AuthDebugPanel />
      </>
    );
  }

  // 5. Standard learning & exploration routes (/home, /theory, /explore, /practice, /exam-prep, /real-world, /achievements, /ai, /settings)
  return (
    <>
      {children}
      <LoginModal />
      <LogoutConfirmModal />
      <FirstLoginChangePasswordModal />
      <AuthDebugPanel />
    </>
  );
};
