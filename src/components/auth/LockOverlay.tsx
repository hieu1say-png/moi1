/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - LOCK OVERLAY
 * Non-intrusive lock badge and call-to-action:
 * - Icon: 🔒
 * - Title: "KHÓA TÍNH NĂNG"
 * - Message: "Em cần đăng nhập bằng tài khoản do giáo viên cấp để bắt đầu học."
 * - Button: "ĐI TỚI ĐĂNG NHẬP"
 */

import React from 'react';
import { Lock, ArrowRight, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

interface LockOverlayProps {
  featureName?: string;
  className?: string;
  isInline?: boolean;
}

export const LockOverlay: React.FC<LockOverlayProps> = ({
  featureName,
  className = '',
  isInline = false
}) => {
  const { openLoginModal } = useAuth();
  const { navigateTo } = useApp();

  const handleGoToLogin = () => {
    // Open login modal or navigate to /login
    openLoginModal(featureName);
  };

  if (isInline) {
    return (
      <div
        className={`p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs ${className}`}
      >
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-amber-200/80 text-amber-800 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-amber-950 uppercase tracking-tight">
              KHÓA TÍNH NĂNG
            </h4>
            <p className="text-xs text-amber-800">
              Em cần đăng nhập bằng tài khoản do giáo viên cấp để bắt đầu học.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoToLogin}
          className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <span>ĐI TỚI ĐĂNG NHẬP</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] z-30 rounded-2xl flex items-center justify-center p-4 select-none ${className}`}
    >
      <div className="bg-white rounded-2xl border border-gray-200 p-6 max-w-sm w-full text-center shadow-lg space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto shadow-2xs">
          <Lock className="w-6 h-6" />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
            KHÓA TÍNH NĂNG
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Em cần đăng nhập bằng tài khoản do giáo viên cấp để bắt đầu học{featureName ? ` "${featureName}"` : ''}.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGoToLogin}
          className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogIn className="w-4 h-4" />
          <span>ĐI TỚI ĐĂNG NHẬP</span>
        </button>
      </div>
    </div>
  );
};
