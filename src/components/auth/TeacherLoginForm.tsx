/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - TEACHER LOGIN FORM
 * Dedicated administration authentication component:
 * - Clean light theme
 * - Email / Username input
 * - Password with eye visibility toggle
 * - Button "ĐĂNG NHẬP QUẢN TRỊ"
 * - Zero avatar / zero cartoon characters
 */

import React, { useState } from 'react';
import { Eye, EyeOff, UserCheck, Lock, ArrowRight, Loader2, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface TeacherLoginFormProps {
  onSuccess?: () => void;
  onSwitchToStudent?: () => void;
}

export const TeacherLoginForm: React.FC<TeacherLoginFormProps> = ({
  onSuccess,
  onSwitchToStudent
}) => {
  const { teacherLogin } = useAuth();
  const { showSuccess } = useToast();

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedUser = usernameOrEmail.trim();
    const trimmedPass = password.trim();

    if (!trimmedUser || !trimmedPass) {
      setErrorMessage('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await teacherLogin(trimmedUser, trimmedPass);

      if (result.success && result.user) {
        showSuccess('Đăng nhập quản trị giáo viên thành công!');
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setErrorMessage(result.error || 'Tài khoản hoặc mật khẩu giáo viên không chính xác.');
      }
    } catch {
      setErrorMessage('Không thể kết nối đến máy chủ. Thầy/Cô vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wider mb-1">
          <ShieldCheck className="w-3 h-3 text-slate-600" />
          <span>Cổng Quản Trị Sư Phạm</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          ĐĂNG NHẬP GIÁO VIÊN
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 font-medium">
          Quản trị lớp học, cấp tài khoản &amp; theo dõi tiến độ
        </p>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div
          id="teacher-login-error"
          role="alert"
          className="p-3.5 rounded-xl bg-red-50/80 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2.5 leading-relaxed"
        >
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email or Username */}
        <div className="space-y-1.5 text-left">
          <label
            htmlFor="teacher-auth-username"
            className="block text-xs font-semibold text-gray-700"
          >
            Email / Tên đăng nhập
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <UserCheck className="w-4.5 h-4.5" />
            </div>
            <input
              id="teacher-auth-username"
              type="text"
              autoComplete="username"
              disabled={isLoading}
              value={usernameOrEmail}
              onChange={(e) => {
                setUsernameOrEmail(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Nhập email hoặc tên tài khoản giáo viên..."
              className="w-full pl-10 pr-4 py-3 min-h-[52px] rounded-xl border border-gray-200 hover:border-gray-300 focus:border-slate-800 text-sm text-gray-900 placeholder:text-gray-400 bg-white transition-all outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5 text-left">
          <label
            htmlFor="teacher-auth-password"
            className="block text-xs font-semibold text-gray-700"
          >
            Mật khẩu quản trị
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Lock className="w-4.5 h-4.5" />
            </div>
            <input
              id="teacher-auth-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              disabled={isLoading}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Nhập mật khẩu quản trị..."
              className="w-full pl-10 pr-12 py-3 min-h-[52px] rounded-xl border border-gray-200 hover:border-gray-300 focus:border-slate-800 text-sm text-gray-900 placeholder:text-gray-400 bg-white transition-all outline-none focus:ring-2 focus:ring-slate-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            >
              {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            id="teacher-login-submit-btn"
            type="submit"
            disabled={isLoading}
            className="w-full min-h-[52px] sm:min-h-[56px] px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.99] disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>ĐANG XÁC THỰC...</span>
              </>
            ) : (
              <>
                <span>ĐĂNG NHẬP QUẢN TRỊ</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Footer switcher */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <div className="text-[11px] text-slate-400 font-medium">
          Dành riêng cho Giáo viên &amp; Quản trị viên
        </div>

        {onSwitchToStudent && (
          <button
            type="button"
            onClick={onSwitchToStudent}
            className="text-[11px] text-orange-600 hover:text-orange-700 font-medium hover:underline cursor-pointer flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Đăng nhập học sinh</span>
          </button>
        )}
      </div>
    </div>
  );
};
