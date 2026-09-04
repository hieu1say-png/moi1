/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - FIRST LOGIN PASSWORD CHANGE MODAL
 * Displayed if requirePasswordChange is true after initial provision by teacher:
 * Fields: Mật khẩu hiện tại, Mật khẩu mới, Xác nhận mật khẩu.
 */

import React, { useState } from 'react';
import { KeyRound, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const FirstLoginChangePasswordModal: React.FC = () => {
  const { requirePasswordChange, firstTimeChangePassword } = useAuth();
  const { showSuccess } = useToast();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!requirePasswordChange) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const np = newPassword.trim();
    const cp = confirmPassword.trim();

    if (!np || !cp) {
      setErrorMessage('Em vui lòng nhập đầy đủ mật khẩu mới và xác nhận nhé.');
      return;
    }
    if (np.length < 6) {
      setErrorMessage('Mật khẩu mới phải có ít nhất 6 ký tự để đảm bảo an toàn.');
      return;
    }
    if (np !== cp) {
      setErrorMessage('Mật khẩu mới và xác nhận mật khẩu không khớp nhau.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await firstTimeChangePassword(np);
      if (res.success) {
        showSuccess('Đổi mật khẩu thành công! Chào mừng em đến với Geometry Lab.');
      } else {
        setErrorMessage(res.error || 'Không thể đổi mật khẩu. Em thử lại nhé.');
      }
    } catch {
      setErrorMessage('Lỗi hệ thống. Em thử lại nhé.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="first-login-pwd-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none"
    >
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
        {/* Header */}
        <div className="text-center space-y-1.5">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto shadow-2xs">
            <KeyRound className="w-6 h-6" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">
            ĐỔI MẬT KHẨU LẦN ĐẦU
          </h3>
          <p className="text-xs text-gray-500">
            Để bảo mật tài khoản cá nhân, em vui lòng đặt lại mật khẩu mới
          </p>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium flex items-center gap-2 border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
          {/* New Password */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 block">
              Mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                disabled={isLoading}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)..."
                className="w-full pl-3.5 pr-10 py-2.5 min-h-[48px] rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 block">
              Xác nhận mật khẩu mới
            </label>
            <input
              type={showPass ? 'text' : 'password'}
              disabled={isLoading}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu mới..."
              className="w-full px-3.5 py-2.5 min-h-[48px] rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-orange-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>ĐANG LƯU...</span>
                </>
              ) : (
                <>
                  <span>HOÀN TẤT &amp; VÀO HỌC</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
