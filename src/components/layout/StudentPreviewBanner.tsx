/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - TEACHER STUDENT PREVIEW BANNER
 * Persistent, high-contrast banner displayed whenever a verified Teacher
 * is previewing the Student interface:
 * - Emphasizes that real role remains 'teacher' (zero downgrade / zero db mutation)
 * - Highlights safe UI impersonation for instructional review
 * - Provides immediate, prominent one-click return to Teacher Dashboard
 */

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Eye, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

export const StudentPreviewBanner: React.FC = () => {
  const { teacherUser, exitStudentPreview } = useAuth();
  const { navigateTo } = useApp();

  const handleReturnToTeacher = () => {
    exitStudentPreview();
    navigateTo('/teacher-dashboard');
  };

  return (
    <aside
      id="teacher-student-preview-banner"
      aria-label="Chế độ xem trước giao diện học sinh của giáo viên"
      className="sticky top-0 z-50 w-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white shadow-md border-b border-amber-500/80 px-3.5 sm:px-6 py-2 transition-all duration-200"
    >
      <div className="max-w-[1536px] 2xl:max-w-[1600px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
        
        {/* Left Side: Status & Explanation */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30 text-white shadow-inner">
            <Eye className="w-4 h-4 text-white animate-pulse" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap leading-tight">
              <span className="font-heading font-black text-xs sm:text-sm tracking-wide uppercase">
                ĐANG XEM VỚI TƯ CÁCH HỌC SINH
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 border border-white/30 text-[10px] font-extrabold uppercase text-amber-100">
                <ShieldCheck className="w-3 h-3 text-emerald-300" />
                <span>Quyền Giáo Viên Bảo Toàn</span>
              </span>
            </div>

            <p className="text-[11px] text-amber-100/90 truncate mt-0.5 font-medium hidden md:block">
              {teacherUser?.fullName || 'ThS. Trần Ngọc Hiếu'} • Chế độ kiểm tra giao diện học tập (Chức năng quản trị được ẩn tạm thời)
            </p>
          </div>
        </div>

        {/* Right Side: Quick Action Button */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/15 text-[11px] font-semibold text-amber-100 border border-white/10">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Mô phỏng trải nghiệm học sinh Toán 9</span>
          </div>

          <button
            id="btn-exit-student-preview"
            type="button"
            onClick={handleReturnToTeacher}
            className="flex items-center gap-2 px-3.5 py-1.5 sm:py-2 bg-white hover:bg-amber-50 active:scale-95 text-amber-950 font-black text-xs rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border border-amber-200 shrink-0"
            title="Quay lại Bàn làm việc & Quản trị Giáo viên"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-700" />
            <span>Quay lại Bàn Làm Việc GV</span>
          </button>
        </div>

      </div>
    </aside>
  );
};
