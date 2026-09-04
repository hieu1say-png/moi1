/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - TEACHER COMMON ERRORS & MISCONCEPTIONS TAB (Chẩn đoán lỗi sai - Warm Ivory Theme)
 */

import React, { useState } from 'react';
import { ShapeType } from '../../types/dataArchitecture';
import { MathFormula } from '../common/MathFormula';
import { Button } from '../common/Button';
import {
  Lightbulb,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { TeacherService } from '../../services/teacherService';
import { useApp } from '../../context/AppContext';
import { useErrorMemoryStore } from '../../stores/useErrorMemoryStore';
import { Target, AlertTriangle } from 'lucide-react';

export const TeacherCommonErrorsTab: React.FC = () => {
  const { setSelectedShape, navigateTo } = useApp();
  const [selectedShapeFilter, setSelectedShapeFilter] = useState<ShapeType | 'all'>('all');

  const errorAnalytics = TeacherService.getCommonErrorsAnalytics(selectedShapeFilter);
  const topRecurring = useErrorMemoryStore.getState().getTopRecurringMisconceptions();

  const handleLaunchShapeRemediation = (shape: ShapeType) => {
    setSelectedShape(shape);
    navigateTo('/explore');
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FFFDF8] p-5 rounded-[20px] border border-[#E5DCCF] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#3A302B]">
              Phân Tích &amp; Chẩn Đoán Lỗi Thường Gặp
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FDFBF4] text-[#7A571B] border border-[#EEDCB4] text-[10px] font-bold">
              AI Chẩn Đoán Sư Phạm
            </span>
          </div>
          <p className="text-xs text-[#766A61] mt-0.5">
            Hệ thống tự động thống kê và phân loại các hiểu lầm khái niệm, nhầm lẫn công thức toán học phổ biến nhất của học sinh lớp 9.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 bg-[#F4EEE4] p-1 rounded-2xl border border-[#E5DCCF]">
          <button
            onClick={() => setSelectedShapeFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedShapeFilter === 'all'
                ? 'bg-[#FFFDF8] text-[#3A302B] shadow-2xs border border-[#E5DCCF]'
                : 'text-[#766A61] hover:text-[#3A302B]'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setSelectedShapeFilter('cylinder')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedShapeFilter === 'cylinder'
                ? 'bg-[#ED806F] text-white shadow-2xs'
                : 'text-[#766A61] hover:text-[#3A302B]'
            }`}
          >
            Hình Trụ
          </button>
          <button
            onClick={() => setSelectedShapeFilter('cone')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedShapeFilter === 'cone'
                ? 'bg-[#E07A5F] text-white shadow-2xs'
                : 'text-[#766A61] hover:text-[#3A302B]'
            }`}
          >
            Hình Nón
          </button>
          <button
            onClick={() => setSelectedShapeFilter('sphere')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedShapeFilter === 'sphere'
                ? 'bg-[#9FB596] text-white shadow-2xs'
                : 'text-[#766A61] hover:text-[#3A302B]'
            }`}
          >
            Hình Cầu
          </button>
        </div>
      </div>

      {/* 1.5 Live AI Error Memory Misconceptions Stats */}
      {topRecurring.length > 0 && (
        <div className="p-5 rounded-[20px] bg-[#FAF7F2] border border-[#E5DCCF] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-[#E07A5F]/15 text-[#E07A5F]">
                <Target className="w-4 h-4" />
              </span>
              <h4 className="font-serif text-sm font-bold text-[#3A302B] uppercase tracking-wider">
                Top Sai Lầm Lặp Lại Được Ghi Nhớ (AI Error Memory)
              </h4>
            </div>
            <span className="text-[11px] text-[#766A61] font-medium">
              Tự động xếp hạng theo tỉ lệ lặp bẫy
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {topRecurring.map((item) => (
              <div
                key={item.concept}
                className="p-3 rounded-xl bg-white border border-[#E5DCCF] space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#3A302B] line-clamp-1">
                    {item.title}
                  </span>
                  <span className="text-xs font-black text-[#E07A5F] font-mono">
                    {item.percentage}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#E5DCCF]/60 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#E07A5F]"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <p className="text-[10px] text-[#766A61] leading-tight">
                  {item.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Error Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {errorAnalytics.map((err, idx) => {
          const shapeBadgeClass =
            err.shapeId === 'cylinder'
              ? 'bg-[#FDF0ED] text-[#8F3E32] border border-[#F4D2CA]'
              : err.shapeId === 'cone'
              ? 'bg-[#FFF7F4] text-[#8A3B22] border border-[#F4D5C8]'
              : 'bg-[#EBF2E8] text-[#4D6B42] border border-[#D0DEC9]';

          const shapeName =
            err.shapeId === 'cylinder'
              ? 'Hình Trụ'
              : err.shapeId === 'cone'
              ? 'Hình Nón'
              : 'Hình Cầu';

          return (
            <div
              key={err.type}
              className="bg-[#FFFDF8] rounded-[20px] border border-[#E5DCCF] hover:border-[#D5C9BD] hover:shadow-paper-hover transition-all p-5 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${shapeBadgeClass}`}>
                    {shapeName}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#7A571B] bg-[#FDFBF4] px-2.5 py-0.5 rounded-full border border-[#EEDCB4]">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>{err.count} Học sinh mắc phải</span>
                  </div>
                </div>

                <h4 className="font-serif text-sm sm:text-base font-bold text-[#3A302B] leading-snug">
                  {idx + 1}. {err.title}
                </h4>

                {/* Math Formula / Contrast */}
                {err.latex && (
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E5DCCF] text-[#3A302B] font-mono text-xs overflow-x-auto text-center">
                    <MathFormula formula={err.latex} />
                  </div>
                )}

                {/* Remedy & Solution */}
                <div className="p-3.5 rounded-xl bg-[#FDFBF4] border border-[#EEDCB4] space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[#7A571B] text-[11px] uppercase">
                    <Lightbulb className="w-4 h-4 text-[#D7A85D]" />
                    <span>Giải pháp sư phạm khắc phục:</span>
                  </div>
                  <p className="text-[#594D46] leading-relaxed">{err.remedy}</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-[#E5DCCF]">
                <Button
                  variant="outline"
                  size="sm"
                  shape="pill"
                  fullWidth
                  onClick={() => handleLaunchShapeRemediation(err.shapeId)}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                  className="font-bold text-xs"
                >
                  Mở 3D Khắc Phục Lỗi Này
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
