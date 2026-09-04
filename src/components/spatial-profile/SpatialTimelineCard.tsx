/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SPATIAL TIMELINE CARD
 * Renders the student's mastery journey across Cylinder, Cone, Sphere, Unfolding & Sections.
 */

import React from 'react';
import { ShapeTimelineItem } from '../../types/spatialProfile';
import { CheckCircle2, Clock, Lock, Sparkles, Milestone } from 'lucide-react';

export interface SpatialTimelineCardProps {
  timeline: ShapeTimelineItem[];
  onSelectTimelineItem?: (item: ShapeTimelineItem) => void;
  className?: string;
}

export const SpatialTimelineCard: React.FC<SpatialTimelineCardProps> = ({
  timeline,
  onSelectTimelineItem,
  className = ''
}) => {
  return (
    <div
      id="spatial-timeline-card"
      className={`bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 ${className}`}
    >
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
            <Milestone className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              HÀNH TRÌNH KHÁM PHÁ CỦA EM
            </h3>
            <span className="text-[10px] text-slate-500 font-medium">
              Tiến trình làm chủ từng khối hình học không gian
            </span>
          </div>
        </div>

        <span className="text-[10px] font-bold text-slate-400">
          Chương IV - Hình học 9
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {timeline.map((item, idx) => {
          const isCompleted = item.status === 'completed';
          const isInProgress = item.status === 'in_progress';

          return (
            <div
              key={item.id}
              onClick={() => onSelectTimelineItem && onSelectTimelineItem(item)}
              className={`p-3 sm:p-3.5 rounded-2xl border transition-all ${
                isCompleted
                  ? 'bg-emerald-50/40 border-emerald-200/80 hover:bg-emerald-50/70'
                  : isInProgress
                  ? 'bg-orange-50/40 border-orange-200/80 hover:bg-orange-50/70'
                  : 'bg-slate-50/40 border-slate-200/60 opacity-60'
              } ${onSelectTimelineItem ? 'cursor-pointer' : ''}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                      isCompleted
                        ? 'bg-emerald-500 text-white shadow-2xs'
                        : isInProgress
                        ? 'bg-orange-500 text-white shadow-2xs animate-pulse'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : isInProgress ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <Lock className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-slate-500">
                      {item.highlightSkill}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-xs font-black font-mono ${
                      isCompleted
                        ? 'text-emerald-700'
                        : isInProgress
                        ? 'text-orange-700'
                        : 'text-slate-400'
                    }`}
                  >
                    {item.progressPercent}%
                  </span>
                  <span className="block text-[10px] text-slate-400 font-medium">
                    {item.unlockedAt}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200/60 rounded-full h-1.5 mt-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isCompleted
                      ? 'bg-emerald-500'
                      : isInProgress
                      ? 'bg-orange-500'
                      : 'bg-slate-300'
                  }`}
                  style={{ width: `${item.progressPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
