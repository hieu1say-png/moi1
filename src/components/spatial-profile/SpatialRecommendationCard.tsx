/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SPATIAL RECOMMENDATION CARD (AI ADAPTIVE)
 * Clickable personalized recommendations directing students to specific targeted labs.
 */

import React from 'react';
import { SuggestedPractice } from '../../types/spatialProfile';
import { Sparkles, ArrowRight, Target, Compass, Scissors, Layers } from 'lucide-react';

export interface SpatialRecommendationCardProps {
  recommendations: SuggestedPractice[];
  onSelectRecommendation: (rec: SuggestedPractice) => void;
  className?: string;
}

export const SpatialRecommendationCard: React.FC<SpatialRecommendationCardProps> = ({
  recommendations,
  onSelectRecommendation,
  className = ''
}) => {
  const getIcon = (target: string) => {
    switch (target) {
      case 'threeDToTwoD':
        return <Scissors className="w-4 h-4 text-purple-600" />;
      case 'spatialTransformation':
        return <Compass className="w-4 h-4 text-emerald-600" />;
      case 'elementIdentification':
        return <Layers className="w-4 h-4 text-amber-600" />;
      default:
        return <Target className="w-4 h-4 text-orange-600" />;
    }
  };

  return (
    <div
      id="spatial-recommendation-card"
      className={`bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 ${className}`}
    >
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-orange-50 text-orange-600 border border-orange-100">
            <Sparkles className="w-4 h-4 fill-orange-400" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              THẦY ĐỀ NGHỊ EM LUYỆN TẬP
            </h3>
            <span className="text-[10px] text-slate-500 font-medium">
              Đề xuất thích ứng theo 8 chỉ số tư duy không gian
            </span>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">
          AI Adaptive
        </span>
      </div>

      <div className="mt-3.5 grid grid-cols-1 md:grid-cols-3 gap-3">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            onClick={() => onSelectRecommendation(rec)}
            className="p-3.5 rounded-2xl bg-slate-50/70 hover:bg-orange-50/40 border border-slate-200/80 hover:border-orange-300 transition-all cursor-pointer flex flex-col justify-between group active:scale-98 shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="p-1.5 rounded-lg bg-white shadow-2xs">
                  {getIcon(rec.targetMetric)}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                  {rec.difficulty}
                </span>
              </div>

              <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                {rec.title}
              </h4>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                {rec.reason}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-orange-600 group-hover:text-orange-700">
              <span>{rec.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
