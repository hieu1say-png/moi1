/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - SETTINGS VIEW
 * Unified Single Sign-On (SSO) Settings for Student and Teacher.
 * If authenticated as Teacher, immediately displays Teacher Settings & Administration
 * with ZERO re-login prompts.
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useTeacherStore } from '../stores/useTeacherStore';
import { TeacherService } from '../services/teacherService';
import { TeacherAuthService } from '../services/teacherAuthService';
import { Card, CardTitle, CardHeader, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Modal } from '../components/common/Modal';
import { SystemHealthCheckModal } from '../components/teacher/SystemHealthCheckModal';
import {
  Settings,
  User,
  Eye,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Lock,
  School,
  BookOpen,
  Users,
  Award,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  LogOut,
  LayoutDashboard,
  Sparkles,
  TrendingUp,
  FileCheck
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings, resetProgress, navigateTo } = useApp();
  const {
    user,
    role,
    authStatus,
    studentUser,
    teacherUser,
    isStudentAuthenticated,
    isTeacherAuthenticated,
    logout: authLogout,
    openLogoutModal
  } = useAuth();
  const { showSuccess, showWarning, showError, showInfo } = useToast();

  const isTeacher = isTeacherAuthenticated || TeacherAuthService.isAuthenticated();

  // Student Settings State
  const [studentName, setStudentName] = useState(user?.fullName || settings.studentName || 'Nguyễn Văn Minh');
  const [className, setClassName] = useState((user as any)?.className || settings.className || 'Lớp 9A2');
  const [showResetModal, setShowResetModal] = useState(false);

  // Teacher Profile & Settings State
  const { profile, updateTeacherProfile, teacherName, schoolName, department, specialization } = useTeacherStore();
  const [teacherFullName, setTeacherFullName] = useState(profile.fullName || user?.fullName || 'Trần Ngọc Hiếu');
  const [teacherTitle, setTeacherTitle] = useState(profile.title || 'ThS.');
  const [teacherSchool, setTeacherSchool] = useState(profile.schoolName || user?.school || 'Trường Phổ Thông Thực Hành Sư Phạm');
  const [teacherDept, setTeacherDept] = useState(profile.department || 'Toán');
  const [teacherSpec, setTeacherSpec] = useState(profile.specialization || 'Hình học không gian (Trụ - Nón - Cầu)');
  const [isSavingTeacherProfile, setIsSavingTeacherProfile] = useState(false);

  // Teacher Password Change State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isHealthCheckOpen, setIsHealthCheckOpen] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.role === 'student') {
        setStudentName(user.fullName);
        setClassName((user as any).className || 'Lớp 9A2');
      } else if (user.role === 'teacher') {
        setTeacherFullName(user.fullName);
        setTeacherSchool(user.school || 'Trường Phổ Thông Thực Hành Sư Phạm');
      }
    }
  }, [user]);

  // Strict RBAC Guard: Students cannot view or access Teacher Settings
  if (role === 'student' || (!isTeacherAuthenticated && !TeacherAuthService.isAuthenticated())) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Khu Vực Quản Trị Giáo Viên</h2>
          <p className="text-xs text-slate-600">Trang cài đặt này dành riêng cho Giáo viên phụ trách bộ môn. Em quay lại phòng thí nghiệm nhé!</p>
          <Button onClick={() => navigateTo('/home')} variant="primary" shape="pill" className="w-full">
            Về GEOMETRY LAB
          </Button>
        </div>
      </div>
    );
  }

  const handleSaveStudentProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ studentName, className });
    showSuccess('Đã lưu thông tin học sinh!');
  };

  const handleSaveTeacherProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherFullName.trim() || !teacherSchool.trim()) {
      showError('Họ tên và Tên trường không được để trống!');
      return;
    }

    setIsSavingTeacherProfile(true);
    const updated = updateTeacherProfile({
      fullName: teacherFullName.trim(),
      title: teacherTitle.trim(),
      schoolName: teacherSchool.trim(),
      department: teacherDept.trim(),
      specialization: teacherSpec.trim(),
    });

    TeacherService.updateDetailedProfile(updated);
    TeacherService.updateTeacherProfile({
      fullName: `${updated.title ? updated.title + ' ' : ''}${updated.fullName}`,
      school: updated.schoolName,
      subject: `${updated.department} (Toán 9)`,
      bio: `Giáo viên bộ môn ${updated.department} - Chuyên đề ${updated.specialization}`
    });

    TeacherAuthService.updateDisplayName(updated.fullName);

    setTimeout(() => {
      setIsSavingTeacherProfile(false);
      showSuccess('Đã cập nhật hồ sơ giáo viên thành công!');
    }, 200);
  };

  const handleChangeTeacherPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!oldPassword) {
      showError('Vui lòng nhập mật khẩu hiện tại!');
      return;
    }

    if (newPassword.length < 6) {
      showWarning('Mật khẩu mới phải có ít nhất 6 ký tự!');
      return;
    }

    if (newPassword !== confirmPassword) {
      showError('Xác nhận mật khẩu mới không khớp!');
      return;
    }

    setIsUpdatingPassword(true);
    const result = await TeacherAuthService.changePassword(oldPassword, newPassword);

    setIsUpdatingPassword(false);
    if (result.success) {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showSuccess('Đổi mật khẩu giáo viên thành công! Mật khẩu mới đã được lưu.');
    } else {
      showError(result.error || 'Mật khẩu hiện tại không chính xác!');
    }
  };

  const handleConfirmReset = () => {
    resetProgress();
    setShowResetModal(false);
    showWarning('Đã đặt lại tiến độ học tập về ban đầu.');
  };

  return (
    <div id="view-settings" className="space-y-6 w-full mx-auto">
      {/* Top Banner */}
      <div className="flex items-center justify-between bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shadow-2xs">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {isTeacher ? 'Cài Đặt Quản Trị Giáo Viên' : 'Cài Đặt Ứng Dụng & Tài Khoản'}
              </h2>
              {isTeacher && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ĐANG ĐĂNG NHẬP
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              {isTeacher
                ? `Phiên làm việc của Thầy/Cô: ${user?.fullName || teacherFullName} • ${teacherSchool}`
                : 'Tùy chỉnh trải nghiệm học tập và thiết lập cá nhân'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            id="settings-btn-health-check"
            variant="outline"
            size="sm"
            shape="pill"
            leftIcon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
            onClick={() => setIsHealthCheckOpen(true)}
            className="border-emerald-300 text-emerald-800 hover:bg-emerald-50 bg-emerald-50/50 text-xs font-bold"
          >
            Kiểm Tra Hệ Thống
          </Button>
          <Button
            id="settings-btn-go-dashboard"
            variant="primary"
            size="sm"
            shape="pill"
            leftIcon={<LayoutDashboard className="w-4 h-4" />}
            onClick={() => navigateTo('/teacher-dashboard')}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
          >
            Bảng Quản Trị
          </Button>
          <Button
            id="settings-btn-logout-teacher"
            variant="outline"
            size="sm"
            shape="pill"
            leftIcon={<LogOut className="w-4 h-4" />}
            onClick={() => openLogoutModal('teacher')}
            className="border-slate-200 text-slate-700 hover:text-rose-600 hover:bg-rose-50 text-xs"
          >
            Đăng Xuất
          </Button>
        </div>
      </div>

      {isTeacher ? (
        /* =========================================================================
           CHẾ ĐỘ GIÁO VIÊN ĐÃ ĐĂNG NHẬP (TEACHER SINGLE SIGN-ON MODE)
           Không yêu cầu nhập lại mật khẩu để xem hoặc cấu hình quản trị.
           ========================================================================= */
        <div className="space-y-6">
          {/* Quick Management Navigation Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div
              onClick={() => navigateTo('/teacher-dashboard')}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                <Users className="w-4.5 h-4.5" />
              </div>
              <div className="text-xs font-bold text-slate-900">Quản Lý Học Sinh</div>
              <div className="text-[11px] text-slate-500">Cấp tài khoản &amp; theo dõi</div>
            </div>

            <div
              onClick={() => navigateTo('/teacher-dashboard')}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                <School className="w-4.5 h-4.5" />
              </div>
              <div className="text-xs font-bold text-slate-900">Quản Lý Lớp Học</div>
              <div className="text-[11px] text-slate-500">Phân công Lớp 9A2</div>
            </div>

            <div
              onClick={() => navigateTo('/teacher-dashboard')}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-purple-400 hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                <FileCheck className="w-4.5 h-4.5" />
              </div>
              <div className="text-xs font-bold text-slate-900">Giao Nhiệm Vụ</div>
              <div className="text-[11px] text-slate-500">Đề thi vào 10 &amp; bài tập</div>
            </div>

            <div
              onClick={() => navigateTo('/teacher-dashboard')}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-4.5 h-4.5" />
              </div>
              <div className="text-xs font-bold text-slate-900">Báo Cáo Tiến Độ</div>
              <div className="text-[11px] text-slate-500">Chẩn đoán lỗi sai không gian</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Teacher Profile Info (Editable without password prompt) */}
            <Card className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <User className="w-4.5 h-4.5 text-blue-600" />
                  <CardTitle className="text-sm">Hồ Sơ Sư Phạm &amp; Thông Tin Giáo Viên</CardTitle>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                  Vai trò: GIÁO VIÊN
                </span>
              </div>

              <form onSubmit={handleSaveTeacherProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Input
                      id="settings-teacher-title"
                      label="Học vị / Chức danh"
                      type="text"
                      value={teacherTitle}
                      onChange={(e) => setTeacherTitle(e.target.value)}
                      placeholder="ThS., TS., Thầy..."
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Input
                      id="settings-teacher-name"
                      label="Họ và Tên Giáo Viên"
                      type="text"
                      value={teacherFullName}
                      onChange={(e) => setTeacherFullName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    id="settings-teacher-school"
                    label="Đơn vị Công Tác (Trường)"
                    type="text"
                    value={teacherSchool}
                    onChange={(e) => setTeacherSchool(e.target.value)}
                  />

                  <Input
                    id="settings-teacher-dept"
                    label="Tổ Bộ Môn"
                    type="text"
                    value={teacherDept}
                    onChange={(e) => setTeacherDept(e.target.value)}
                  />
                </div>

                <Input
                  id="settings-teacher-spec"
                  label="Chuyên Đề Giảng Dạy Trọng Tâm"
                  type="text"
                  value={teacherSpec}
                  onChange={(e) => setTeacherSpec(e.target.value)}
                />

                {/* Session details (Read-only) */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="text-xs font-bold text-slate-700">Thông Tin Phiên Đăng Nhập (Teacher Session)</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-600">
                    <div>
                      <span className="text-slate-400 block">Tên tài khoản:</span>
                      <span className="font-mono font-bold text-slate-800">{user?.username || 'hieu1say'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Quyền hạn:</span>
                      <span className="font-bold text-emerald-600">Toàn quyền Quản trị Sư phạm</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Xác thực:</span>
                      <span className="font-bold text-slate-800">Đăng nhập 1 lần (SSO)</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    id="btn-save-teacher-profile"
                    type="submit"
                    size="sm"
                    variant="primary"
                    shape="pill"
                    disabled={isSavingTeacherProfile}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                  >
                    {isSavingTeacherProfile ? 'Đang lưu...' : 'Lưu Thay Đổi Hồ Sơ'}
                  </Button>
                </div>
              </form>
            </Card>

            {/* Display & Sound Options */}
            <div className="space-y-6">
              <Card className="space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <CardTitle className="text-sm">Hiển Thị &amp; Âm Thanh</CardTitle>
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Âm Thanh Hướng Dẫn</div>
                      <div className="text-[11px] text-slate-400">Đọc tự động công thức và định lý</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                      className={`
                        w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer
                        ${settings.soundEnabled ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'}
                      `}
                    >
                      <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Bộ Kết Xuất Công Thức</div>
                      <div className="text-[11px] text-slate-400">LaTeX KaTeX chuẩn Bộ GD&amp;ĐT</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg border border-blue-200">
                      KaTeX 0.16
                    </span>
                  </div>
                </div>
              </Card>

              {/* Password Change Card (Only asks for password when actually changing) */}
              <Card className="space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <KeyRound className="w-4 h-4 text-amber-600" />
                  <CardTitle className="text-sm">Bảo Mật &amp; Đổi Mật Khẩu</CardTitle>
                </div>

                <form onSubmit={handleChangeTeacherPassword} className="space-y-3">
                  <Input
                    id="settings-teacher-old-pwd"
                    label="Mật khẩu hiện tại"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Nhập mật khẩu hiện tại..."
                  />

                  <Input
                    id="settings-teacher-new-pwd"
                    label="Mật khẩu mới (ít nhất 6 ký tự)"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mật khẩu mới..."
                  />

                  <Input
                    id="settings-teacher-confirm-pwd"
                    label="Xác nhận mật khẩu mới"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới..."
                  />

                  <div className="pt-2">
                    <Button
                      id="btn-update-teacher-pwd"
                      type="submit"
                      size="sm"
                      variant="outline"
                      shape="pill"
                      disabled={isUpdatingPassword}
                      className="w-full text-xs font-bold text-slate-800 hover:bg-slate-50"
                    >
                      {isUpdatingPassword ? 'Đang cập nhật...' : 'Cập Nhật Mật Khẩu'}
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================================
           CHẾ ĐỘ HỌC SINH (STUDENT SETTINGS MODE)
           ========================================================================= */
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Student Profile Settings */}
            <Card className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <User className="w-4 h-4 text-blue-600" />
                <CardTitle className="text-sm">Hồ Sơ Học Sinh</CardTitle>
              </div>

              <form onSubmit={handleSaveStudentProfile} className="space-y-4">
                <Input
                  id="settings-student-name"
                  label="Họ và Tên Học Sinh"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />

                <Input
                  id="settings-class-name"
                  label="Lớp &amp; Trường Học"
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                />

                <div className="pt-2">
                  <Button type="submit" size="sm" variant="primary" shape="pill">
                    Cập Nhật Hồ Sơ
                  </Button>
                </div>
              </form>
            </Card>

            {/* Display & Sound Settings */}
            <Card className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Eye className="w-4 h-4 text-blue-600" />
                <CardTitle className="text-sm">Hiển Thị &amp; Âm Thanh</CardTitle>
              </div>

              <div className="space-y-4">
                {/* Audio Toggle */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <div className="text-xs font-bold text-slate-800">Âm Thanh Hướng Dẫn</div>
                    <div className="text-[11px] text-slate-400">Đọc tự động công thức và định nghĩa</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                    className={`
                      w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer
                      ${settings.soundEnabled ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'}
                    `}
                  >
                    <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                  </button>
                </div>

                {/* Formula Render Mode */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <div className="text-xs font-bold text-slate-800">Bộ Kết Xuất Công Thức</div>
                    <div className="text-[11px] text-slate-400">Chế độ hiển thị LaTeX KaTeX chuẩn toán học</div>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg border border-blue-200">
                    KaTeX 0.16
                  </span>
                </div>

                {/* Reset Progress Section */}
                <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-rose-900">Đặt Lại Tiến Độ Học Tập</div>
                    <div className="text-[11px] text-rose-600">Xóa lịch sử làm bài và điểm XP</div>
                  </div>
                  <Button
                    variant="danger"
                    size="xs"
                    shape="pill"
                    onClick={() => setShowResetModal(true)}
                  >
                    Đặt lại
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* CÀI ĐẶT GIÁO VIÊN PORTAL CARD */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 text-white shadow-sm border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/30 text-blue-300 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-[10px] font-bold uppercase tracking-wider">
                    Khu Vực Quản Trị Sư Phạm
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Dành Cho Thầy / Cô Phụ Trách Bộ Môn Toán 9
                </h3>
                <p className="text-xs text-slate-300 max-w-xl">
                  Đăng nhập để quản lý lớp học, cấp tài khoản học sinh, ngân hàng đề thi vào 10 và xem báo cáo phân tích lỗi sai không gian.
                </p>
              </div>
            </div>

            <Button
              id="btn-open-teacher-settings"
              variant="primary"
              size="md"
              shape="pill"
              onClick={() => navigateTo('/teacher')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 self-start sm:self-center cursor-pointer shadow-md"
            >
              Đăng Nhập Giáo Viên
            </Button>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Student Progress Reset */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Xác nhận đặt lại tiến độ"
      >
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-slate-600">
            Bạn có chắc chắn muốn đặt lại toàn bộ điểm XP, thành tích và lịch sử bài tập đã làm? Thao tác này không thể hoàn tác.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowResetModal(false)}>
              Hủy bỏ
            </Button>
            <Button variant="danger" size="sm" onClick={handleConfirmReset}>
              Xác nhận xóa
            </Button>
          </div>
        </div>
      </Modal>
      {/* System Health Check & Diagnostics Modal for Teacher/Admin */}
      {isTeacher && (
        <SystemHealthCheckModal
          isOpen={isHealthCheckOpen}
          onClose={() => setIsHealthCheckOpen(false)}
        />
      )}
    </div>
  );
};

export default SettingsView;
