/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * POUR CONTROLS & STEP PROGRESS PANEL
 * Handles 3-step pouring sequence and reset actions
 */

import React from 'react';
import { Droplet, RotateCcw, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export interface PourControlsProps {
  pourCount: 0 | 1 | 2 | 3;
  isPouring: boolean;
  isComplete: boolean;
  predictionAnswer?: 1 | 2 | 3 | 4 | null;
  onPour: () => void;
  onReset: () => void;
}

export const PourControls: React.FC<PourControlsProps> = ({
  pourCount,
  isPouring,
  isComplete,
  predictionAnswer = null,
  onPour,
  onReset
}) => {
  const isPredictionNeeded = predictionAnswer === null;

  const getPourButtonText = () => {
    if (isPredictionNeeded) return 'HÃY DỰ ĐOÁN Ở TRÊN ĐỂ MỞ KHÓA RÓT NƯỚC';
    if (isPouring) return 'Đang rót nước (Phễu Nón → Cốc Trụ)...';
    if (pourCount === 0) return 'ĐỔ NƯỚC (LẦN 1 / 3)';
    if (pourCount === 1) return 'ĐỔ NƯỚC (LẦN 2 / 3)';
    if (pourCount === 2) return 'ĐỔ NƯỚC (LẦN 3 / 3 — VỀ ĐÍCH)';
    return 'THÍ NGHIỆM ĐÃ HOÀN THÀNH';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
      {/* 3 Step Sequence Tracker */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {/* Step 1 */}
        <div
          className={`p-3 rounded-xl border transition-all ${
            pourCount >= 1
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs'
              : pourCount === 0 && !isPouring && !isPredictionNeeded
              ? 'bg-orange-50/80 border-orange-400 text-orange-950 ring-2 ring-orange-200'
              : 'bg-slate-50 border-slate-200 text-slate-400'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold mb-1">
            <span>Lần đổ 1</span>
            {pourCount >= 1 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/80 border border-slate-200">
                1/3 V
              </span>
            )}
          </div>
          <p className="text-[11px] leading-tight text-slate-600">
            Mực nước đạt <strong>h/3</strong> (33.3%)
          </p>
        </div>

        {/* Step 2 */}
        <div
          className={`p-3 rounded-xl border transition-all ${
            pourCount >= 2
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs'
              : pourCount === 1 && !isPouring
              ? 'bg-orange-50/80 border-orange-400 text-orange-950 ring-2 ring-orange-200'
              : 'bg-slate-50 border-slate-200 text-slate-400'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold mb-1">
            <span>Lần đổ 2</span>
            {pourCount >= 2 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/80 border border-slate-200">
                2/3 V
              </span>
            )}
          </div>
          <p className="text-[11px] leading-tight text-slate-600">
            Mực nước đạt <strong>2h/3</strong> (66.7%)
          </p>
        </div>

        {/* Step 3 */}
        <div
          className={`p-3 rounded-xl border transition-all ${
            pourCount >= 3
              ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-2xs ring-2 ring-emerald-200'
              : pourCount === 2 && !isPouring
              ? 'bg-orange-50/80 border-orange-400 text-orange-950 ring-2 ring-orange-200'
              : 'bg-slate-50 border-slate-200 text-slate-400'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold mb-1">
            <span>Lần đổ 3</span>
            {pourCount >= 3 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/80 border border-slate-200">
                3/3 V
              </span>
            )}
          </div>
          <p className="text-[11px] leading-tight text-slate-600">
            Cốc trụ vừa đầy tràn <strong>h</strong> (100%)
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
        {!isComplete ? (
          <button
            type="button"
            onClick={onPour}
            disabled={isPouring || isPredictionNeeded}
            aria-label={getPourButtonText()}
            className={`flex-1 w-full sm:w-auto py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed active:scale-[0.99] ${
              isPredictionNeeded
                ? 'bg-slate-200 text-slate-500 border border-slate-300'
                : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white ring-2 ring-orange-300 shadow-md'
            }`}
          >
            <Droplet className={`w-5 h-5 ${isPouring ? 'animate-bounce text-sky-200' : isPredictionNeeded ? 'text-slate-400' : 'text-amber-200'}`} />
            <span>{getPourButtonText()}</span>
          </button>
        ) : (
          <div className="flex-1 w-full sm:w-auto py-3 px-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-sm flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Đã hoàn thành 3 lần đổ — Bí ẩn 1/3 được làm sáng tỏ!</span>
          </div>
        )}

        <button
          type="button"
          onClick={onReset}
          disabled={isPouring}
          aria-label="Làm lại từ đầu"
          className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" />
          <span>LÀM LẠI TỪ ĐẦU</span>
        </button>
      </div>
    </div>
  );
};
