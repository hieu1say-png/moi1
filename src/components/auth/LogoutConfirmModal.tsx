/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - LOGOUT CONFIRMATION MODAL
 * Simple, respectful confirmation prompt:
 * - "Em có chắc muốn đăng xuất không?"
 * - Buttons: [Đăng xuất] [Ở lại]
 */

import React from 'react';
import { LogOut, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useApp } from '../../context/AppContext';

export const LogoutConfirmModal: React.FC = () => {
  const {
    isLogoutModalOpen,
    closeLogoutModal,
    logout,
    logoutTargetRole,
    studentSession,
    teacherSession
  } = useAuth();
  const { showInfo } = useToast();
  const { currentRoute, navigateTo } = useApp();

  if (!isLogoutModalOpen) return null;

  const isTeacherLogout = logoutTargetRole === 'teacher' || (!studentSession.isAuthenticated && teacherSession.isAuthenticated);

  const handleConfirmLogout = () => {
    logout();
    showInfo(isTeacherLogout ? 'Đã đăng xuất khỏi tài khoản giáo viên.' : 'Đã đăng xuất tài khoản học sinh.');
    
    // If teacher logged out on a teacher route, navigate to /teacher
    if (isTeacherLogout) {
      if (currentRoute === '/teacher' || currentRoute === '/teacher-dashboard') {
        navigateTo('/teacher');
      }
    } else {
      // If student logged out
      if (currentRoute !== '/home') {
        navigateTo('/login');
      }
    }
  };

  return (
    <div
      id="logout-confirm-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150 select-none"
    >
      <div className="bg-white rounded-2xl border border-gray-200 p-6 max-w-sm w-full shadow-xl space-y-5 animate-in zoom-in-95 duration-150">
        {/* Header with Icon */}
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-700 flex items-center justify-center">
            <LogOut className="w-6 h-6" />
          </div>
          <button
            type="button"
            onClick={closeLogoutModal}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Text */}
        <div className="space-y-1 text-left">
          <h3 className="text-base font-bold text-gray-900">
            XÁC NHẬN ĐĂNG XUẤT
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {isTeacherLogout
              ? 'Thầy/Cô có chắc muốn đăng xuất khỏi tài khoản quản trị giáo viên không?'
              : 'Em có chắc muốn đăng xuất tài khoản học sinh khỏi Geometry Lab không?'}
          </p>
        </div>

        {/* Actions: [Ở lại] and [Đăng xuất] */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            id="btn-logout-cancel"
            type="button"
            onClick={closeLogoutModal}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs sm:text-sm transition-all cursor-pointer"
          >
            Ở lại
          </button>

          <button
            id="btn-logout-confirm"
            type="button"
            onClick={handleConfirmLogout}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-black active:scale-95 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </div>
  );
};
