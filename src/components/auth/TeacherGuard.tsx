/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - TEACHER GUARD
 * Enforces dedicated Teacher Session access:
 * - Checks teacherSession only (does not check or mutate studentSession)
 * - Returns loading state during session hydration
 * - Gates unauthenticated or non-teacher users with clean teacher login gate
 */

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { SessionLoading } from './SessionLoading';
import { LoginPage } from './LoginPage';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TeacherGuardProps {
  children: React.ReactNode;
}

export const TeacherGuard: React.FC<TeacherGuardProps> = ({ children }) => {
  const { teacherSession, isTeacherAuthenticated } = useAuth();
  const { navigateTo } = useApp();

  if (teacherSession.status === 'AUTH_LOADING') {
    return <SessionLoading />;
  }

  if (!isTeacherAuthenticated || !teacherSession.user) {
    return <LoginPage initialMode="teacher" />;
  }

  if (teacherSession.user.role !== 'teacher') {
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
              Đây là khu vực quản trị sư phạm dành riêng cho Thầy/Cô. Em quay lại phòng thí nghiệm học tập nhé!
            </p>
          </div>

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
    );
  }

  return <>{children}</>;
};
