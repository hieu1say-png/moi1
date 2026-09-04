/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - CHANGE / RESET STUDENT PASSWORD MODAL
 * Dedicated modal for teachers to change a student's password,
 * with auto-generate temporary password, password strength check,
 * eye toggle, and [X] Require password change on next login.
 */

import React, { useState } from 'react';
import { StudentAccount } from '../../types/auth';
import {
  KeyRound,
  Sparkles,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Lock,
  X,
  Copy,
  Printer
} from 'lucide-react';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';
import { generateTemporaryPassword } from '../../services/teacherStudentService';

interface ChangeStudentPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentAccount | null;
  onPasswordChanged: (studentId: string, newPass: string, requireChange: boolean) => Promise<{ success: boolean; error?: string }>;
}

export const ChangeStudentPasswordModal: React.FC<ChangeStudentPasswordModalProps> = ({
  isOpen,
  onClose,
  student,
  onPasswordChanged
}) => {
  const { showSuccess, showError } = useToast();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [requirePasswordChange, setRequirePasswordChange] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Success result
  const [successInfo, setSuccessInfo] = useState<{
    newPass: string;
  } | null>(null);

  if (!isOpen || !student) return null;

  const handleAutoGenerate = () => {
    const tempPass = generateTemporaryPassword();
    setPassword(tempPass);
    setConfirmPassword(tempPass);
    setShowPassword(true);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedPass = password.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (!trimmedPass) {
      setErrorMessage('Vui lòng nhập mật khẩu mới.');
      return;
    }
    if (trimmedPass.length < 6) {
      setErrorMessage('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }
    if (trimmedPass !== trimmedConfirm) {
      setErrorMessage('Mật khẩu mới và xác nhận mật khẩu không khớp nhau.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await onPasswordChanged(student.id, trimmedPass, requirePasswordChange);
      if (res.success) {
        setSuccessInfo({ newPass: trimmedPass });
        showSuccess(`Đã đổi mật khẩu cho học sinh ${student.fullName}!`);
      } else {
        setErrorMessage(res.error || 'Không thể đổi mật khẩu.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Có lỗi xảy ra.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCredentials = () => {
    if (!successInfo) return;
    const text = `GEOMETRY LAB - CẬP NHẬT MẬT KHẨU\nHọ tên: ${student.fullName}\nLớp: ${student.className}\nTên tài khoản: ${student.username}\nMật khẩu mới: ${successInfo.newPass}`;
    navigator.clipboard.writeText(text);
    showSuccess('Đã sao chép mật khẩu mới!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 my-auto animate-in fade-in zoom-in duration-150">
        {successInfo ? (
          <div className="space-y-5 text-center">
            <div className="w-14 h-14 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900">
                ĐỔI MẬT KHẨU THÀNH CÔNG!
              </h3>
              <p className="text-xs text-slate-500">
                Học sinh <strong>{student.fullName}</strong> có thể sử dụng mật khẩu mới để đăng nhập.
              </p>
            </div>

            {/* Credential summary box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Tên tài khoản:</span>
                <span className="font-mono font-bold text-slate-900">{student.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mật khẩu mới:</span>
                <span className="font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                  {successInfo.newPass}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <Button
                variant="outline"
                size="md"
                shape="pill"
                leftIcon={<Copy className="w-4 h-4" />}
                onClick={handleCopyCredentials}
                className="text-xs font-bold text-slate-700"
              >
                Sao Chép
              </Button>

              <Button
                variant="cylinder"
                size="md"
                shape="pill"
                onClick={onClose}
                className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
              >
                Hoàn Tất &amp; Đóng
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Đổi Mật Khẩu Học Sinh
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {student.fullName} ({student.username} - {student.className})
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700">Mật khẩu mới (*)</label>
                  <button
                    type="button"
                    onClick={handleAutoGenerate}
                    className="text-[11px] font-bold text-orange-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Tự Sinh Mật Khẩu</span>
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Tối thiểu 6 ký tự..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2.5 pr-10 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-medium text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Xác nhận mật khẩu mới (*)</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Nhập lại mật khẩu mới..."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-medium text-slate-900"
                />
              </div>

              <label className="flex items-center gap-2 pt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={requirePasswordChange}
                  onChange={(e) => setRequirePasswordChange(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 rounded-sm cursor-pointer"
                />
                <span className="text-slate-700 font-medium">
                  Yêu cầu học sinh đổi mật khẩu ở lần đăng nhập tiếp theo
                </span>
              </label>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  shape="pill"
                  onClick={onClose}
                  className="text-xs font-bold text-slate-600"
                >
                  Hủy Bỏ
                </Button>

                <Button
                  type="submit"
                  variant="cylinder"
                  size="md"
                  shape="pill"
                  disabled={isSubmitting}
                  className="text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white"
                >
                  {isSubmitting ? 'Đang Lưu...' : 'Cập Nhật Mật Khẩu'}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
