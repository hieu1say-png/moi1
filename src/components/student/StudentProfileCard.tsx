/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - STUDENT PROFILE CARD
 * Read-only student profile according to EdTech specs:
 * - Họ và tên, Lớp, Trường, Tên tài khoản
 * - Trạng thái: ● ĐANG HOẠT ĐỘNG
 * - Abstract mathematical geometric student badge (zero teacher 3D avatars)
 * - All fields strictly Read-Only (no student self-edit)
 * - Learning progress bars (Cylinder, Cone, Sphere, Net, Cross-section)
 * - XP, Level, Streak counters
 */

import React from 'react';
import { StudentAccount } from '../../types/auth';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  School,
  GraduationCap,
  Sparkles,
  Flame,
  Award,
  Clock,
  CheckCircle2,
  Box,
  Layers,
  HelpCircle,
  AlertCircle,
  LogOut,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface StudentProfileCardProps {
  student?: StudentAccount;
  className?: string;
  showFullProgress?: boolean;
}

export const StudentProfileCard: React.FC<StudentProfileCardProps> = ({
  student: propStudent,
  className = '',
  showFullProgress = true
}) => {
  const { user, openLogoutModal } = useAuth();
  const { navigateTo } = useApp();

  const student = propStudent || (user?.role === 'student' ? (user as StudentAccount) : null);

  if (!student) {
    return null;
  }

  const progress = student.progress || {
    cylinder: 92,
    cone: 76,
    sphere: 84,
    net: 65,
    crossSection: 58
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 1. Main Profile Information Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          {/* Abstract Geometric Student Avatar & Basic Info */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 text-white flex items-center justify-center font-serif text-2xl font-bold shadow-xs select-none">
              {student.fullName ? student.fullName.split(' ').pop()?.charAt(0) : 'E'}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>ĐANG HOẠT ĐỘNG</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-[11px] font-bold">
                  {student.className}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                {student.fullName.toUpperCase()}
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                {student.school}
              </p>
            </div>
          </div>

          {/* Quick Logout Button */}
          <button
            type="button"
            onClick={() => openLogoutModal()}
            className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 hover:text-red-600 text-gray-600 font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đăng xuất</span>
          </button>
        </div>

        {/* Read-Only Information Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              HỒ SƠ CỦA EM
            </h3>
            <span className="text-[11px] text-gray-400">
              *Tài khoản do giáo viên quản lý
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Field 1: Họ và tên */}
            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-gray-100">
              <span className="text-[11px] text-gray-400 block font-medium">Họ và tên</span>
              <span className="text-sm font-bold text-gray-900 block truncate">{student.fullName}</span>
            </div>

            {/* Field 2: Lớp học */}
            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-gray-100">
              <span className="text-[11px] text-gray-400 block font-medium">Lớp</span>
              <span className="text-sm font-bold text-gray-900 block truncate">{student.className}</span>
            </div>

            {/* Field 3: Trường */}
            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-gray-100">
              <span className="text-[11px] text-gray-400 block font-medium">Trường học</span>
              <span className="text-sm font-bold text-gray-900 block truncate">{student.school}</span>
            </div>

            {/* Field 4: Tên tài khoản */}
            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-gray-100">
              <span className="text-[11px] text-gray-400 block font-medium">Tên tài khoản</span>
              <span className="text-sm font-bold text-gray-900 block font-mono truncate">{student.username}</span>
            </div>
          </div>
        </div>

        {/* Gamification Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-orange-800 font-medium">Điểm kinh nghiệm</div>
              <div className="text-lg font-bold text-orange-950">{student.xp || 320} XP</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-amber-800 font-medium">Cấp độ học tập</div>
              <div className="text-lg font-bold text-amber-950">Level {student.level || 2}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-rose-800 font-medium">Chuỗi ngày học</div>
              <div className="text-lg font-bold text-rose-950">{student.streakDays || 4} ngày</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-blue-800 font-medium">Thời gian học</div>
              <div className="text-lg font-bold text-blue-950">{student.studyTimeMinutes || 145} phút</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Learning Progress Breakdown */}
      {showFullProgress && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                TIẾN ĐỘ HỌC TẬP HÌNH HỌC KHÔNG GIAN
              </h3>
              <p className="text-xs text-gray-500">
                Dữ liệu được đồng bộ trực tiếp với Bảng Theo Dõi của Giáo Viên
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('/explore')}
              className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Vào học</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Shape 1: Hình Trụ */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-gray-100 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-800">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>Hình Trụ (Cylinder)</span>
                </span>
                <span className="text-blue-600">{progress.cylinder}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress.cylinder}%` }}
                />
              </div>
            </div>

            {/* Shape 2: Hình Nón */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-gray-100 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-800">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span>Hình Nón (Cone)</span>
                </span>
                <span className="text-purple-600">{progress.cone}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-purple-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress.cone}%` }}
                />
              </div>
            </div>

            {/* Shape 3: Hình Cầu */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-gray-100 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-800">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Hình Cầu (Sphere)</span>
                </span>
                <span className="text-emerald-600">{progress.sphere}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress.sphere}%` }}
                />
              </div>
            </div>

            {/* Spatial Skill: Khai Triển Mặt */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-gray-100 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-800">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>Khai Triển &amp; Gấp Trải Mặt phẳng</span>
                </span>
                <span className="text-amber-600">{progress.net}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress.net}%` }}
                />
              </div>
            </div>

            {/* Spatial Skill: Mặt Cắt 3D */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-gray-100 space-y-2 md:col-span-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-800">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span>Mặt Cắt Không Gian (Cross-section)</span>
                </span>
                <span className="text-orange-600">{progress.crossSection}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-orange-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress.crossSection}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
