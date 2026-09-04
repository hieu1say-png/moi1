/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TEACHER PROFILE MODAL COMPONENT
 * Real-time profile editing with live preview card, validation, and persistent storage.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  School,
  BookOpen,
  Award,
  Sparkles,
  Save,
  Lock,
  Mail,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Eye
} from 'lucide-react';
import { useTeacherStore, computeAvatarInitials, getTeacherDisplayName } from '../../stores/useTeacherStore';
import { TeacherService } from '../../services/teacherService';
import { useToast } from '../../context/ToastContext';
import { TeacherProfile } from '../../types/dataArchitecture';

interface TeacherProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSecurity?: () => void;
}

export const TeacherProfileModal: React.FC<TeacherProfileModalProps> = ({
  isOpen,
  onClose,
  onNavigateToSecurity
}) => {
  const { profile, updateTeacherProfile } = useTeacherStore();
  const { showSuccess, showError, showInfo } = useToast();

  // Form states initialized from store
  const [fullName, setFullName] = useState(profile.fullName || '');
  const [title, setTitle] = useState(profile.title || 'ThS.');
  const [schoolName, setSchoolName] = useState(profile.schoolName || '');
  const [department, setDepartment] = useState(profile.department || 'Toán');
  const [specialization, setSpecialization] = useState(
    profile.specialization || 'Hình học không gian (Trụ - Nón - Cầu)'
  );
  const [avatarInitials, setAvatarInitials] = useState(profile.avatarInitials || 'TH');
  const [email, setEmail] = useState(profile.email || 'tranngochieu.toan9@longduc.edu.vn');
  const [customInitials, setCustomInitials] = useState(false);

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      setFullName(profile.fullName || '');
      setTitle(profile.title || 'ThS.');
      setSchoolName(profile.schoolName || '');
      setDepartment(profile.department || 'Toán');
      setSpecialization(profile.specialization || 'Hình học không gian (Trụ - Nón - Cầu)');
      setAvatarInitials(profile.avatarInitials || computeAvatarInitials(profile.fullName, profile.title));
      setEmail(profile.email || 'tranngochieu.toan9@longduc.edu.vn');
      setValidationError(null);
      setCustomInitials(false);
    }
  }, [isOpen, profile]);

  // Auto calculate initials when name or title changes (unless user explicitly edited initials)
  const handleFullNameChange = (val: string) => {
    setFullName(val);
    if (!customInitials) {
      setAvatarInitials(computeAvatarInitials(val, title));
    }
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!customInitials) {
      setAvatarInitials(computeAvatarInitials(fullName, val));
    }
  };

  const handleResetInitials = () => {
    const autoInitials = computeAvatarInitials(fullName, title);
    setAvatarInitials(autoInitials);
    setCustomInitials(false);
    showInfo(`Đã tự động tạo tên viết tắt: ${autoInitials}`);
  };

  // Real-time computed display preview
  const previewDisplayName = getTeacherDisplayName(fullName, title);
  const previewInitials = avatarInitials.trim() || computeAvatarInitials(fullName, title) || 'TH';
  const previewSchool = schoolName.trim() || 'Trường Phổ Thông Thực Hành Sư Phạm';
  const previewDept = department.trim() || 'Toán';
  const previewSpec = specialization.trim() || 'Hình học không gian (Trụ - Nón - Cầu)';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!fullName.trim() || !schoolName.trim()) {
      const msg = 'Vui lòng nhập đầy đủ thông tin bắt buộc (Họ và tên, Tên trường).';
      setValidationError(msg);
      showError(msg);
      return;
    }

    if (!department.trim()) {
      const msg = 'Vui lòng nhập thông tin Tổ / Bộ môn giảng dạy.';
      setValidationError(msg);
      showError(msg);
      return;
    }

    setValidationError(null);
    setIsSaving(true);

    try {
      const updatedProfileData: Partial<TeacherProfile> = {
        fullName: fullName.trim(),
        title: title.trim(),
        schoolName: schoolName.trim(),
        department: department.trim(),
        specialization: specialization.trim(),
        avatarInitials: previewInitials.toUpperCase(),
        email: email.trim(),
      };

      // 1. Update global store
      const updated = updateTeacherProfile(updatedProfileData);

      // 2. Update TeacherService for database/storage sync
      TeacherService.updateDetailedProfile(updated);
      TeacherService.updateTeacherProfile({
        fullName: previewDisplayName,
        school: updated.schoolName,
        subject: `${updated.department} (Toán 9)`,
        bio: `Giáo viên bộ môn ${updated.department} - Chuyên đề ${updated.specialization}`,
        email: updated.email
      });

      setTimeout(() => {
        setIsSaving(false);
        showSuccess('✅ Đã lưu và cập nhật hồ sơ giáo viên thành công!');
        onClose();
      }, 150);
    } catch (err) {
      setIsSaving(false);
      showError('Đã có lỗi xảy ra khi lưu hồ sơ. Vui lòng thử lại.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Hồ Sơ Giáo Viên
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Quản lý thông tin hiển thị sư phạm, học vị & chuyên đề giảng dạy
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body with Scroll */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
            {/* 1. REAL-TIME PREVIEW CARD (Mục 5 Preview) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  Xem trước hiển thị thời gian thực (Live Preview):
                </span>
                <span className="text-[11px] text-slate-400">
                  Tự động đồng bộ với Header Dashboard
                </span>
              </div>

              <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-5 text-white shadow-md border border-blue-800/40 flex items-center gap-4">
                {/* Live Avatar Initials */}
                <div className="w-13 h-13 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-lg font-black shadow-inner shrink-0 tracking-wider">
                  {previewInitials}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-base sm:text-lg font-black truncate">
                      {previewDisplayName || 'Chưa nhập họ tên'}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30 text-[10px] font-bold shrink-0">
                      Tổ {previewDept}
                    </span>
                  </div>
                  <p className="text-xs text-blue-200/80 mt-1 font-medium truncate">
                    {previewSchool} • {previewDept} • {previewSpec}
                  </p>
                  <div className="mt-2 text-[11px] text-blue-200 bg-white/10 px-2.5 py-1 rounded-lg inline-flex items-center gap-1 border border-white/10">
                    <span className="font-semibold text-white">Lớp 9A2 • {previewDisplayName || 'ThS. Trần Ngọc Hiếu'} • {previewSchool || 'Trường Phổ Thông Thực Hành Sư Phạm'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Validation Alert */}
            {validationError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2.5 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Form Fields */}
            <form id="teacher-profile-form" onSubmit={handleSave} className="space-y-4">
              {/* Row 1: Họ tên & Học vị */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="sm:col-span-1 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-blue-600" />
                    Học vị / Chức danh
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Th.s, PGS, Cử nhân"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    Họ và tên giáo viên <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Trần Ngọc Hiếu"
                    required
                    value={fullName}
                    onChange={(e) => handleFullNameChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold text-slate-900"
                  />
                </div>
              </div>

              {/* Row 2: Tên trường & Tổ Bộ môn */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <School className="w-3.5 h-3.5 text-blue-600" />
                    Tên trường / Đơn vị <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Trường Phổ Thông Thực Hành Sư Phạm"
                    required
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium text-slate-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    Tổ / Bộ môn giảng dạy <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Toán, Tổ Toán - KHTN"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* Row 3: Chuyên đề hiển thị */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Chuyên đề / Phân môn hiển thị trên đề thi & báo cáo
                </label>
                <input
                  type="text"
                  placeholder="VD: Hình học không gian (Trụ - Nón - Cầu)"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium text-slate-900"
                />
              </div>

              {/* Row 4: Avatar Initials & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="sm:col-span-1 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">
                      Tên viết tắt (Avatar)
                    </label>
                    <button
                      type="button"
                      onClick={handleResetInitials}
                      className="text-[10px] text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-0.5 cursor-pointer"
                      title="Tự động tính lại từ họ tên"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      Tự động
                    </button>
                  </div>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="VD: TH, TNH"
                    value={avatarInitials}
                    onChange={(e) => {
                      setAvatarInitials(e.target.value.toUpperCase());
                      setCustomInitials(true);
                    }}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-black text-center text-blue-700 tracking-wider"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    Email liên hệ sư phạm
                  </label>
                  <input
                    type="email"
                    placeholder="VD: tranngochieu.toan9@longduc.edu.vn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* System Identifiers (Read-only Username & Security Nav) */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>
                    Mã định danh (ID): <strong className="text-slate-700 font-mono">{profile.userId || 'usr-teacher-001'}</strong> (Cố định bảo mật)
                  </span>
                </div>

                {onNavigateToSecurity && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateToSecurity();
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-slate-500" />
                    <span>Đổi Mật Khẩu Bảo Mật</span>
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Modal Footer Actions */}
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              Hủy
            </button>

            <button
              type="submit"
              form="teacher-profile-form"
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Đang lưu...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Lưu Thay Đổi</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
