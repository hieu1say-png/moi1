/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - STUDENT GUARD
 * Enforces dedicated Student Session access:
 * - Checks studentSession only (does not check or mutate teacherSession)
 * - Returns loading state during session hydration
 * - Gates unauthenticated students with high-contrast, friendly login prompt
 */

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { SessionLoading } from './SessionLoading';
import { LoginPage } from './LoginPage';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface StudentGuardProps {
  children: React.ReactNode;
}

export const StudentGuard: React.FC<StudentGuardProps> = ({ children }) => {
  const { studentSession, isStudentAuthenticated, isStudentPreview } = useAuth();
  const { navigateTo } = useApp();

  // If teacher is previewing student experience, grant view-through access
  if (isStudentPreview) {
    return <>{children}</>;
  }

  if (studentSession.status === 'AUTH_LOADING') {
    return <SessionLoading />;
  }

  if (!isStudentAuthenticated || !studentSession.user) {
    return <LoginPage initialMode="student" />;
  }

  if (studentSession.user.role !== 'student') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#F8FAFC]">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto shadow-2xs">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-lg font-bold text-gray-900">
              TRUY CẬP KHÔNG HỢP LỆ
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Trang này dành riêng cho học sinh. Em hãy đăng nhập bằng tài khoản học sinh nhé!
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('/login')}
            className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Đăng nhập học sinh</span>
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
