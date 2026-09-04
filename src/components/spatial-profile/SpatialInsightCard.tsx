/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SPATIAL INSIGHT CARD
 * Displays student strengths and gentle growth focus areas without punitive colors.
 */

import React from 'react';
import { CheckCircle2, Sparkles, HeartHandshake, Award, Target, BookOpen } from 'lucide-react';

export interface SpatialInsightCardProps {
  summary: string;
  positiveNote: string;
  improvementArea: string;
  strengths: string[];
  className?: string;
}

export const SpatialInsightCard: React.FC<SpatialInsightCardProps> = ({
  summary,
  positiveNote,
  improvementArea,
  strengths,
  className = ''
}) => {
  return (
    <div id="spatial-insight-section" className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      {/* 1. Điểm mạnh của em */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-emerald-200/80 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-emerald-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                <Award className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>ĐIỂM MẠNH</span>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500 fill-emerald-400" />
                </h3>
                <span className="text-[10px] font-semibold text-emerald-700">Kỹ năng em làm rất tốt</span>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              {strengths.length} kỹ năng vững vàng
            </span>
          </div>

          <div className="mt-3.5 space-y-2">
            {strengths.map((str, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs text-emerald-900 font-semibold transition-all hover:bg-emerald-50"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{str}</span>
              </div>
            ))}
            {positiveNote && (
              <p className="text-[11px] text-emerald-800 bg-emerald-50/30 p-2 rounded-lg border border-emerald-100/60 italic mt-2">
                “{positiveNote}”
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between text-[11px] text-emerald-700">
          <span className="flex items-center gap-1 font-medium">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
            Tiếp tục phát huy phong độ này nhé!
          </span>
        </div>
      </div>

      {/* 2. Cần luyện (Warm Amber tone, Encouraging, No harsh red) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-amber-200/80 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-amber-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60">
                <Target className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>CẦN LUYỆN</span>
                  <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                </h3>
                <span className="text-[10px] font-semibold text-amber-700">Cơ hội để em bứt phá điểm số</span>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200">
              Trọng tâm rèn luyện
            </span>
          </div>

          <div className="mt-3.5 space-y-2.5">
            <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-100/80 text-xs text-amber-950 font-medium leading-relaxed">
              <p className="font-semibold text-amber-900 mb-1">💡 Gợi ý rèn luyện:</p>
              <p>{improvementArea || 'Tập trung luyện thêm dạng toán khai triển mặt xung quanh và phân biệt đường sinh l với chiều cao h.'}</p>
            </div>

            {summary && (
              <p className="text-[11px] text-slate-600 italic px-1 leading-snug">
                “{summary}”
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-[11px] text-amber-800 font-medium">
          <span>🎯 Chỉ cần luyện thêm vài câu là em sẽ nắm chắc!</span>
        </div>
      </div>
    </div>
  );
};

