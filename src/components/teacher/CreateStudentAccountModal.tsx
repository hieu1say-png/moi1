/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - CREATE STUDENT ACCOUNT MODAL
 * Dedicated modal for creating individual student accounts with auto-username,
 * auto-password, strength meter, validation, and immediate credential card display.
 */

import React, { useState } from 'react';
import { SchoolClass } from '../../types/dataArchitecture';
import { StudentAccount, StudentCredentialCardItem } from '../../types/auth';
import {
  UserPlus,
  Sparkles,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Copy,
  Printer,
  ShieldCheck,
  Building,
  GraduationCap,
  User,
  X,
  Lock
} from 'lucide-react';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';
import {
  generateAutoUsername,
  generateTemporaryPassword
} from '../../services/teacherStudentService';

interface CreateStudentAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  classes: SchoolClass[];
  defaultClassId?: string;
  existingUsernames: string[];
  schoolName: string;
  onStudentCreated: (student: StudentAccount, rawPassword?: string) => void;
  onOpenCredentialSheet?: (item: StudentCredentialCardItem) => void;
}

export const CreateStudentAccountModal: React.FC<CreateStudentAccountModalProps> = ({
  isOpen,
  onClose,
  classes,
  defaultClassId,
  existingUsernames,
  schoolName,
  onStudentCreated,
  onOpenCredentialSheet
}) => {
  const { showSuccess, showWarning } = useToast();

  // Form State
  const [fullName, setFullName] = useState('');
  const [selectedClassId, setSelectedClassId] = useState(defaultClassId || classes[0]?.id || 'cls-9a2');
  const [school, setSchool] = useState(schoolName || 'Trường Phổ Thông Thực Hành Sư Phạm');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [requirePasswordChange, setRequirePasswordChange] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Success Step Screen State
  const [createdStudent, setCreatedStudent] = useState<{
    student: StudentAccount;
    rawPassword: string;
  } | null>(null);

  if (!isOpen) return null;

  const currentClass = classes.find((c) => c.id === selectedClassId) || classes[0];
  const className = currentClass ? currentClass.name : 'Lớp 9A2';

  // Auto generate username
  const handleAutoGenerateUsername = () => {
    if (!fullName.trim()) {
      showWarning('Vui lòng nhập họ và tên trước khi tạo username!');
      return;
    }
    const autoUser = generateAutoUsername(fullName, className, existingUsernames);
    setUsername(autoUser);
    setErrorMessage(null);
    showSuccess(`Đã tạo tên tài khoản: ${autoUser}`);
  };

  // Auto generate password
  const handleAutoGeneratePassword = () => {
    const autoPass = generateTemporaryPassword();
    setPassword(autoPass);
    setConfirmPassword(autoPass);
    setShowPassword(true);
    setErrorMessage(null);
    showSuccess('Đã sinh mật khẩu tạm thời an toàn!');
  };

  // Calculate password strength
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: 'Chưa nhập', color: 'bg-slate-200 text-slate-500' };
    if (pwd.length < 6) return { score: 1, label: 'Quá ngắn (<6 ký tự)', color: 'bg-rose-500 text-white' };
    let score = 1;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score >= 4) return { score: 3, label: 'Rất mạnh', color: 'bg-emerald-600 text-white' };
    if (score >= 2) return { score: 2, label: 'Đạt tiêu chuẩn', color: 'bg-blue-600 text-white' };
    return { score: 1, label: 'Trung bình', color: 'bg-amber-500 text-white' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = fullName.trim();
    const trimmedUser = username.trim().toLowerCase();
    const trimmedPass = password.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (!trimmedName) {
      setErrorMessage('Vui lòng nhập họ và tên học sinh.');
      return;
    }
    if (!trimmedUser) {
      setErrorMessage('Vui lòng nhập tên tài khoản (username).');
      return;
    }
    if (trimmedUser.includes(' ')) {
      setErrorMessage('Tên tài khoản không được chứa khoảng trắng.');
      return;
    }
    if (existingUsernames.map((u) => u.toLowerCase()).includes(trimmedUser)) {
      setErrorMessage(`Tên tài khoản "${trimmedUser}" đã tồn tại. Hãy chọn tên khác.`);
      return;
    }
    if (!trimmedPass) {
      setErrorMessage('Vui lòng nhập mật khẩu ban đầu.');
      return;
    }
    if (trimmedPass.length < 6) {
      setErrorMessage('Mật khẩu ban đầu phải có ít nhất 6 ký tự.');
      return;
    }
    if (trimmedPass !== trimmedConfirm) {
      setErrorMessage('Mật khẩu ban đầu và xác nhận mật khẩu không khớp nhau.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create student payload
      const newStudentAccount: StudentAccount = {
        id: `std-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        username: trimmedUser,
        password: trimmedPass,
        fullName: trimmedName,
        className,
        classId: selectedClassId,
        school: school.trim() || 'Trường Phổ Thông Thực Hành Sư Phạm',
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
        firstLoginAt: null,
        loginCount: 0,
        requirePasswordChange,
        role: 'student',
        progress: {
          cylinder: 0,
          cone: 0,
          sphere: 0,
          net: 0,
          crossSection: 0
        },
        xp: 0,
        level: 1,
        streakDays: 0,
        wrongCount: 0,
        hintsUsed: 0,
        learningEventsCount: 0,
        studyTimeMinutes: 0,
        targetExamScore: 9.0,
        accuracyRate: 100
      };

      onStudentCreated(newStudentAccount, trimmedPass);
      setCreatedStudent({
        student: newStudentAccount,
        rawPassword: trimmedPass
      });
      showSuccess(`Đã tạo tài khoản cho học sinh ${trimmedName}!`);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Không thể tạo tài khoản. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCredentials = () => {
    if (!createdStudent) return;
    const text = `GEOMETRY LAB - TÀI KHOẢN HỌC SINH\nHọ và tên: ${createdStudent.student.fullName}\nLớp: ${createdStudent.student.className}\nTên tài khoản: ${createdStudent.student.username}\nMật khẩu tạm thời: ${createdStudent.rawPassword}`;
    navigator.clipboard.writeText(text);
    showSuccess('Đã sao chép thông tin tài khoản!');
  };

  const handleResetFormForNext = () => {
    setFullName('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setCreatedStudent(null);
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 my-auto animate-in fade-in zoom-in duration-150">
        {/* ========================================================================= */}
        {/* SUCCESS SCREEN VIEW                                                       */}
        {/* ========================================================================= */}
        {createdStudent ? (
          <div className="space-y-5 text-center">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900">
                TẠO TÀI KHOẢN THÀNH CÔNG!
              </h3>
              <p className="text-xs text-slate-500">
                Tài khoản đã sẵn sàng cho học sinh đăng nhập vào Geometry Lab
              </p>
            </div>

            {/* Credential Card Display */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-[11px] font-bold text-slate-500">Họ và tên:</span>
                <span className="text-sm font-black text-slate-900">{createdStudent.student.fullName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-[11px] font-bold text-slate-500">Lớp:</span>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {createdStudent.student.className}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-[11px] font-bold text-slate-500">Tên tài khoản (Username):</span>
                <span className="text-xs font-mono font-black text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {createdStudent.student.username}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">Mật khẩu tạm thời:</span>
                <span className="text-xs font-mono font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded border border-orange-200">
                  {createdStudent.rawPassword}
                </span>
              </div>
            </div>

            {/* Warning */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 text-left flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Lưu ý:</strong> Mật khẩu tạm thời chỉ hiển thị một lần trong phiên này. Thầy/Cô hãy sao chép hoặc in phiếu phát cho học sinh.
              </span>
            </div>

            {/* Action Buttons */}
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
                leftIcon={<Printer className="w-4 h-4" />}
                onClick={() => {
                  if (onOpenCredentialSheet && createdStudent) {
                    onOpenCredentialSheet({
                      id: createdStudent.student.id,
                      fullName: createdStudent.student.fullName,
                      className: createdStudent.student.className,
                      school: createdStudent.student.school,
                      username: createdStudent.student.username,
                      temporaryPassword: createdStudent.rawPassword,
                      createdAt: createdStudent.student.createdAt
                    });
                  }
                }}
                className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
              >
                In Phiếu Thẻ
              </Button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleResetFormForNext}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
              >
                + Tạo tài khoản tiếp theo
              </button>

              <Button
                variant="outline"
                size="sm"
                shape="pill"
                onClick={onClose}
                className="text-xs font-bold text-slate-600"
              >
                Đóng
              </Button>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* CREATE FORM VIEW                                                          */
          /* ========================================================================= */
          <>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-600" />
                <span>Tạo Tài Khoản Học Sinh Mới</span>
              </h3>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
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
              {/* SECTION 1: THÔNG TIN HỌC SINH */}
              <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="font-black text-slate-900 text-xs flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                  <span>Phần 1: Thông tin học sinh</span>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Họ và tên học sinh (*)</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Nguyễn Văn Minh"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-sans text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Lớp (*)</label>
                    <select
                      value={selectedClassId}
                      onChange={(e) => setSelectedClassId(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-sans text-slate-900"
                    >
                      {classes.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Trường (*)</label>
                    <input
                      type="text"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      placeholder="Trường Phổ Thông Thực Hành Sư Phạm"
                      className="w-full p-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-sans text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: THÔNG TIN ĐĂNG NHẬP */}
              <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="font-black text-slate-900 text-xs flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                  <Lock className="w-3.5 h-3.5 text-orange-600" />
                  <span>Phần 2: Thông tin đăng nhập</span>
                </div>

                {/* Username with Auto generate */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700">Tên tài khoản (Username) (*)</label>
                    <button
                      type="button"
                      onClick={handleAutoGenerateUsername}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Tự Động Tạo Username</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="VD: minh9a2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-mono font-bold text-slate-900"
                  />
                </div>

                {/* Password with Auto generate & Strength */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700">Mật khẩu ban đầu (*)</label>
                    <button
                      type="button"
                      onClick={handleAutoGeneratePassword}
                      className="text-[11px] font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <KeyRound className="w-3 h-3" />
                      <span>Tự Sinh Mật Khẩu</span>
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Nhập hoặc bấm tự sinh..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-2.5 pr-10 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-mono font-medium text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {password && (
                    <div className="flex items-center justify-between text-[10px] pt-0.5">
                      <span className="text-slate-400">Độ mạnh mật khẩu:</span>
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${strength.color}`}>
                        {strength.label}
                      </span>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Xác nhận mật khẩu (*)</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Nhập lại mật khẩu ban đầu..."
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-mono font-medium text-slate-900"
                  />
                </div>

                {/* Require password change checkbox */}
                <label className="flex items-center gap-2 pt-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={requirePasswordChange}
                    onChange={(e) => setRequirePasswordChange(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 rounded-sm cursor-pointer"
                  />
                  <span className="text-slate-700 font-medium">
                    Yêu cầu học sinh đổi mật khẩu ở lần đăng nhập đầu tiên
                  </span>
                </label>
              </div>

              {/* Form Buttons */}
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
                  className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                >
                  {isSubmitting ? 'Đang Tạo...' : 'Tạo Tài Khoản'}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
