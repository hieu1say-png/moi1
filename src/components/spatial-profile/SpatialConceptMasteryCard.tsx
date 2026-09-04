/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - SPATIAL CONCEPT MASTERY CARD
 * Displays student-facing concept mastery progress and allows instant Mastery Checks.
 */

import React from 'react';
import { useErrorMemoryStore } from '../../stores/useErrorMemoryStore';
import { CheckCircle2, AlertCircle, Sparkles, Target, ArrowRight } from 'lucide-react';

export const SpatialConceptMasteryCard: React.FC = () => {
  const { getAllConceptMasteries, triggerMasteryCheck } = useErrorMemoryStore();
  const masteries = getAllConceptMasteries();

  return (
    <section id="section-concept-mastery-progress" className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-lg bg-orange-50 text-orange-600">
            <Target className="w-4 h-4" />
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
            TIẾN ĐỘ LÀM CHỦ KHÁI NIỆM & KỸ NĂNG
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">
          Dựa trên khả năng tự giải & xử lý bẫy sai lầm
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {masteries.map((m) => {
          const isMastered = m.masteryStatus === 'mastered';
          const isNeedsReview = m.masteryStatus === 'needs_review';

          let statusBadge = (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Đang rèn luyện
            </span>
          );
          let progressColor = 'bg-blue-500';

          if (isMastered) {
            statusBadge = (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Đã làm chủ
              </span>
            );
            progressColor = 'bg-emerald-500';
          } else if (isNeedsReview) {
            statusBadge = (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Cần ôn lại
              </span>
            );
            progressColor = 'bg-amber-500';
          }

          return (
            <div
              key={m.concept}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5 hover:border-orange-200 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {m.conceptTitle}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {m.shape === 'cylinder' ? 'Hình Trụ' : m.shape === 'cone' ? 'Hình Nón' : 'Hình Cầu'} • {m.independentSuccess} lần tự giải đúng
                  </span>
                </div>
                {statusBadge}
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-500">Độ thuần thục</span>
                  <span className={isMastered ? 'text-emerald-600' : isNeedsReview ? 'text-amber-600' : 'text-blue-600'}>
                    {m.masteryScore}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                    style={{ width: `${Math.max(8, m.masteryScore)}%` }}
                  />
                </div>
              </div>

              {/* Action */}
              <div className="pt-1 flex items-center justify-between border-t border-slate-50">
                <span className="text-[10px] text-slate-400">
                  {m.repeatCount > 0 ? `Lặp bẫy: ${m.repeatCount} lần` : 'Chưa vấp bẫy'}
                </span>
                <button
                  type="button"
                  onClick={() => triggerMasteryCheck(m.concept)}
                  className="text-[11px] font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Kiểm tra nhanh</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
