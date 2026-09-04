/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - STUDENT LOGIN FORM
 * Dedicated student login component conforming to EdTech UX guidelines:
 * - Simple, focused, zero jargon
 * - Soft validation ("Em nhập tên tài khoản nhé.", "Em nhập mật khẩu nhé.")
 * - Obfuscated error message preventing user enumeration
 * - Eye toggle for password visibility
 * - High-contrast accessible inputs and touch targets (min-height 52px)
 * - Orange #F97316 primary CTA
 */

import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface StudentLoginFormProps {
  onSuccess?: () => void;
  onSwitchToTeacher?: () => void;
}

export const StudentLoginForm: React.FC<StudentLoginFormProps> = ({
  onSuccess,
  onSwitchToTeacher
}) => {
  const { login } = useAuth();
  const { showSuccess } = useToast();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Field validation and error feedback
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError(null);
    setPasswordError(null);
    setGeneralError(null);

    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    let hasClientError = false;
    if (!trimmedUser) {
      setUsernameError('Em nhập tên tài khoản nhé.');
      hasClientError = true;
    }
    if (!trimmedPass) {
      setPasswordError('Em nhập mật khẩu nhé.');
      hasClientError = true;
    }

    if (hasClientError) return;

    setIsLoading(true);

    try {
      const result = await login(trimmedUser, trimmedPass);

      if (result.success && result.user) {
        showSuccess('Đăng nhập thành công!');
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setGeneralError(result.error || 'Tài khoản hoặc mật khẩu chưa đúng. Em kiểm tra lại nhé.');
      }
    } catch {
      setGeneralError('Không thể kết nối đến máy chủ. Em thử lại nhé.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Title & Subtitle */}
      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          ĐĂNG NHẬP
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 font-medium">
          Tài khoản do giáo viên cấp
        </p>
      </div>

      {/* General Error Notice */}
      {generalError && (
        <div
          id="student-login-error"
          role="alert"
          className="p-3.5 rounded-xl bg-red-50/80 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2.5 leading-relaxed"
        >
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <span>{generalError}</span>
        </div>
      )}

      {/* Main Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username Input */}
        <div className="space-y-1.5 text-left">
          <label
            htmlFor="student-username"
            className="block text-xs font-semibold text-gray-700"
          >
            Tên tài khoản
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <User className="w-4.5 h-4.5" />
            </div>
            <input
              id="student-username"
              type="text"
              autoComplete="username"
              disabled={isLoading}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (usernameError) setUsernameError(null);
                if (generalError) setGeneralError(null);
              }}
              placeholder="Nhập tên tài khoản học sinh..."
              className={`w-full pl-10 pr-4 py-3 min-h-[52px] rounded-xl border text-sm text-[#0F291E] placeholder:text-gray-400 bg-white transition-all outline-none focus:ring-2 focus:ring-[#16A34A] ${
                usernameError || generalError
                  ? 'border-red-300 bg-red-50/20 focus:border-red-500 focus:ring-red-400'
                  : 'border-[#E2EADF] hover:border-gray-300 focus:border-[#16A34A]'
              }`}
            />
          </div>
          {usernameError && (
            <p className="text-[11px] text-red-600 font-medium pl-1">
              {usernameError}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-1.5 text-left">
          <label
            htmlFor="student-password"
            className="block text-xs font-semibold text-gray-700"
          >
            Mật khẩu
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Lock className="w-4.5 h-4.5" />
            </div>
            <input
              id="student-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              disabled={isLoading}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError(null);
                if (generalError) setGeneralError(null);
              }}
              placeholder="Nhập mật khẩu..."
              className={`w-full pl-10 pr-12 py-3 min-h-[52px] rounded-xl border text-sm text-[#0F291E] placeholder:text-gray-400 bg-white transition-all outline-none focus:ring-2 focus:ring-[#16A34A] ${
                passwordError || generalError
                  ? 'border-red-300 bg-red-50/20 focus:border-red-500 focus:ring-red-400'
                  : 'border-[#E2EADF] hover:border-gray-300 focus:border-[#16A34A]'
              }`}
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
          {passwordError && (
            <p className="text-[11px] text-red-600 font-medium pl-1">
              {passwordError}
            </p>
          )}
        </div>

        {/* Primary Submit Button */}
        <div className="pt-2">
          <button
            id="student-login-submit-btn"
            type="submit"
            disabled={isLoading}
            className="w-full min-h-[52px] sm:min-h-[56px] px-6 py-3.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.99] disabled:bg-emerald-300 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>ĐANG ĐĂNG NHẬP...</span>
              </>
            ) : (
              <>
                <span>ĐĂNG NHẬP</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Guidance for student account */}
      <div className="text-center pt-1">
        <p className="text-xs text-[#658473]">
          Chưa có tài khoản? <span className="text-[#0F291E] font-medium">Liên hệ Giáo viên để nhận mã học sinh</span>
        </p>
      </div>

      {/* Teacher Entry Point */}
      {onSwitchToTeacher && (
        <div className="pt-3 border-t border-[#E2EADF] text-center text-xs text-[#658473]">
          <button
            type="button"
            onClick={onSwitchToTeacher}
            className="text-[11px] text-gray-500 hover:text-gray-800 font-medium hover:underline cursor-pointer"
          >
            Dành cho giáo viên &amp; quản trị viên →
          </button>
        </div>
      )}
    </div>
  );
};
