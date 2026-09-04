/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - TEACHER LESSONS & CURRICULUM TAB (Giáo án & Bài giảng)
 */

import React from 'react';
import { Lesson, ShapeType } from '../../types/dataArchitecture';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { MathFormula, MathText } from '../common/MathFormula';
import {
  BookOpen,
  Compass,
  Play,
  CheckCircle2,
  Clock,
  ExternalLink,
  Presentation,
  Sparkles,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TeacherLessonsTabProps {
  lessons: Lesson[];
  onOpenLive3D: (shape: ShapeType) => void;
}

export const TeacherLessonsTab: React.FC<TeacherLessonsTabProps> = ({ lessons, onOpenLive3D }) => {
  const { setSelectedShape, navigateTo } = useApp();

  const handleLaunchPresentation = (shape: ShapeType) => {
    setSelectedShape(shape);
    navigateTo('/explore');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h3 className="text-base font-black text-slate-900">
            Khung Chương Trình &amp; Giáo Án Điện Tử – Toán 9
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Chương IV: Hình Trụ • Hình Nón • Hình Cầu. Tích hợp mô hình 3D tương tác để trình chiếu giảng dạy trên lớp.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            shape="pill"
            leftIcon={<BookOpen className="w-4 h-4" />}
            onClick={() => navigateTo('/theory')}
            className="font-bold text-xs"
          >
            Mở SGK Lý Thuyết
          </Button>
        </div>
      </div>

      {/* 3 Main Shape Curriculum Units */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. Hình Trụ */}
        <div className="bg-white rounded-3xl border border-slate-200 hover:border-blue-300 transition-all p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase">
                Bài 1 • Tiết 57-58
              </span>
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" /> 90 phút
              </span>
            </div>

            <div>
              <h4 className="text-lg font-black text-slate-900">Hình Trụ – Diện Tích &amp; Thể Tích</h4>
              <p className="text-xs text-slate-500 mt-1">
                Khái niệm mặt trụ tròn xoay, hình khai triển thành hình chữ nhật và 2 hình tròn đáy.
              </p>
            </div>

            {/* Core Formulas */}
            <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-1.5 text-xs">
              <span className="text-[10px] font-bold text-blue-800 uppercase block">Công thức trọng tâm:</span>
              <div className="text-slate-800 font-semibold space-y-1 font-mono">
                <div>• Sxq = 2πrh</div>
                <div>• Stp = 2πrh + 2πr²</div>
                <div>• V = πr²h</div>
              </div>
            </div>

            {/* Objectives */}
            <div className="space-y-1 text-xs text-slate-600">
              <span className="font-bold text-slate-800 block text-[11px] uppercase">Mục tiêu bài học:</span>
              <div className="space-y-1 text-[11px]">
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span><MathText text="Xác định đúng bán kính $r$, chiều cao $h$, trục $OO'$." /></span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>Giải toán thực tế: lon sữa đặc, ống nước bê tông.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Button
              variant="cylinder"
              size="sm"
              shape="pill"
              leftIcon={<Presentation className="w-4 h-4" />}
              onClick={() => handleLaunchPresentation('cylinder')}
              className="w-full font-bold text-xs"
            >
              Trình Chiếu Mô Hình 3D
            </Button>
          </div>
        </div>

        {/* 2. Hình Nón */}
        <div className="bg-white rounded-3xl border border-slate-200 hover:border-orange-300 transition-all p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-black uppercase">
                Bài 2 • Tiết 59-60
              </span>
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" /> 90 phút
              </span>
            </div>

            <div>
              <h4 className="text-lg font-black text-slate-900">Hình Nón – Đường Sinh &amp; Nón Cụt</h4>
              <p className="text-xs text-slate-500 mt-1">
                Sự tạo thành hình nón khi quay tam giác vuông quanh một cạnh góc vuông.
              </p>
            </div>

            {/* Core Formulas */}
            <div className="p-3 bg-orange-50/60 rounded-2xl border border-orange-100 space-y-1.5 text-xs">
              <span className="text-[10px] font-bold text-orange-800 uppercase block">Công thức trọng tâm:</span>
              <div className="text-slate-800 font-semibold space-y-1 font-mono">
                <div>• l = √(h² + r²)</div>
                <div>• Sxq = πrl, Stp = πrl + πr²</div>
                <div>• V = 1/3 πr²h</div>
              </div>
            </div>

            {/* Objectives */}
            <div className="space-y-1 text-xs text-slate-600">
              <span className="font-bold text-slate-800 block text-[11px] uppercase">Mục tiêu bài học:</span>
              <div className="space-y-1 text-[11px]">
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                  <span>Nắm vững định lý Pythagore giữa $l, h, r$.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                  <span>Hiểu nguồn gốc hệ số $1/3$ qua thí nghiệm rót nước.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Button
              variant="cone"
              size="sm"
              shape="pill"
              leftIcon={<Presentation className="w-4 h-4" />}
              onClick={() => handleLaunchPresentation('cone')}
              className="w-full font-bold text-xs"
            >
              Trình Chiếu Mô Hình 3D
            </Button>
          </div>
        </div>

        {/* 3. Hình Cầu */}
        <div className="bg-white rounded-3xl border border-slate-200 hover:border-emerald-300 transition-all p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                Bài 3 • Tiết 61-62
              </span>
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" /> 90 phút
              </span>
            </div>

            <div>
              <h4 className="text-lg font-black text-slate-900">Hình Cầu – Diện Tích &amp; Thể Tích Khối Cầu</h4>
              <p className="text-xs text-slate-500 mt-1">
                Mặt cầu bán kính R, thiết diện cắt bởi mặt phẳng và thể tích khối cầu Archimedes.
              </p>
            </div>

            {/* Core Formulas */}
            <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-1.5 text-xs">
              <span className="text-[10px] font-bold text-emerald-800 uppercase block">Công thức trọng tâm:</span>
              <div className="text-slate-800 font-semibold space-y-1 font-mono">
                <div>• S = 4πR² = πd²</div>
                <div>• V = 4/3 πR³</div>
                <div>• R = d / 2</div>
              </div>
            </div>

            {/* Objectives */}
            <div className="space-y-1 text-xs text-slate-600">
              <span className="font-bold text-slate-800 block text-[11px] uppercase">Mục tiêu bài học:</span>
              <div className="space-y-1 text-[11px]">
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Phân biệt diện tích mặt cầu (bậc 2) và thể tích (bậc 3).</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Ứng dụng thực tế: quả bóng đá, khinh khí cầu, Trái Đất.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Button
              variant="sphere"
              size="sm"
              shape="pill"
              leftIcon={<Presentation className="w-4 h-4" />}
              onClick={() => handleLaunchPresentation('sphere')}
              className="w-full font-bold text-xs"
            >
              Trình Chiếu Mô Hình 3D
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
