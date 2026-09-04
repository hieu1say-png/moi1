/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - STUDENT PROFILE VIEW
 * Dedicated Student Dashboard / Profile View:
 * - "CHÀO EM, [TÊN]!"
 * - Read-only Profile Card
 * - Interactive Learning Map Jump-off
 */

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { StudentProfileCard } from './StudentProfileCard';
import { StudentAccount } from '../../types/auth';
import {
  Layers,
  Box,
  Circle,
  Triangle,
  Bot,
  BrainCircuit,
  GraduationCap,
  BookOpen,
  ArrowRight,
  Flame,
  Award,
  Sparkles
} from 'lucide-react';

export const StudentProfileView: React.FC = () => {
  const { user } = useAuth();
  const { navigateTo, setSelectedShape } = useApp();

  const student = user?.role === 'student' ? (user as StudentAccount) : null;
  const firstName = student?.fullName ? student.fullName.split(' ').pop() : 'Học Sinh';

  const handleOpenShape = (shape: 'cylinder' | 'cone' | 'sphere') => {
    setSelectedShape(shape);
    navigateTo('/explore');
  };

  return (
    <div id="student-profile-view" className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-2xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phòng Thí Nghiệm Hình Học 3D</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif uppercase">
            CHÀO EM, {student?.fullName ? student.fullName.toUpperCase() : 'NGUYỄN VĂN MINH'}!
          </h1>
          <p className="text-xs sm:text-sm text-white/90 font-medium">
            Tiếp tục khám phá các mô hình không gian và hoàn thành mục tiêu học tập hôm nay nhé!
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('/home')}
          className="px-5 py-3 rounded-xl bg-white text-orange-600 hover:bg-orange-50 active:scale-95 font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span>Bản Đồ Học Tập</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Student Profile Card */}
      <StudentProfileCard student={student || undefined} />

      {/* Quick Access to Learning Modules */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          TRUY CẬP NHANH PHÒNG HỌC
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Cylinder Card */}
          <div
            onClick={() => handleOpenShape('cylinder')}
            className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
                Hình Trụ (Cylinder)
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Khai triển xung quanh, diện tích toàn phần và thể tích
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-blue-600 gap-1 pt-1">
              <span>Mở phòng thí nghiệm 3D</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Cone Card */}
          <div
            onClick={() => handleOpenShape('cone')}
            className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Triangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900 group-hover:text-purple-600 transition-colors">
                Hình Nón (Cone)
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Đường sinh, góc ở đỉnh, hình quạt tròn khai triển
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-purple-600 gap-1 pt-1">
              <span>Mở phòng thí nghiệm 3D</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Sphere Card */}
          <div
            onClick={() => handleOpenShape('sphere')}
            className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Circle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900 group-hover:text-emerald-600 transition-colors">
                Hình Cầu (Sphere)
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Mặt cầu, bán kính, diện tích mặt cầu và thể tích khối cầu
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-emerald-600 gap-1 pt-1">
              <span>Mở phòng thí nghiệm 3D</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
