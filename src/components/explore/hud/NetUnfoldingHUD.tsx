/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NON-OBSTRUCTIVE HUD: NET / UNFOLDING MODE
 * Sits outside the 3D WebGL Canvas for 100% unobstructed 3D visibility
 */

import React from 'react';
import { Play, Pause, RotateCcw, FoldHorizontal, CheckCircle2, Sparkles } from 'lucide-react';
import { MathFormula } from '../../common/MathFormula';

export interface NetUnfoldingHUDProps {
  radius: number;
  height: number;
  unfoldProgress: number; // 0 to 1
  isPlaying: boolean;
  isCompleted: boolean;
  onStart: () => void;
  onPause: () => void;
  onReplay: () => void;
  onReset: () => void;
  onProgressChange?: (p: number) => void;
  className?: string;
}

export const NetUnfoldingHUD: React.FC<NetUnfoldingHUDProps> = ({
  radius,
  height,
  unfoldProgress,
  isPlaying,
  isCompleted,
  onStart,
  onPause,
  onReplay,
  onReset,
  onProgressChange,
  className = ''
}) => {
  const pi = Math.PI;
  const perimeter = (2 * pi * radius).toFixed(2);
  const baseArea = (pi * radius * radius).toFixed(2);
  const sxq = (2 * pi * radius * height).toFixed(2);
  const stp = (2 * pi * radius * height + 2 * pi * radius * radius).toFixed(2);

  return (
    <div
      id="docked-net-unfolding-hud"
      className={`bg-white rounded-2xl sm:rounded-3xl border border-orange-200 shadow-sm p-4 sm:p-5 space-y-4 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-100 border border-orange-200 text-orange-600 flex items-center justify-center">
            <FoldHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-gray-900">
              Khai Triển Hình Trụ (Net Unfolding)
            </h4>
            <p className="text-[11px] text-gray-500 font-medium">
              1 Hình Chữ Nhật Mặt Xung Quanh + 2 Hình Tròn Đáy
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-orange-700">
          TIẾN TRÌNH: {(unfoldProgress * 100).toFixed(0)}%
        </span>
      </div>

      {/* Interactive Animation Control Bar */}
      <div className="space-y-2.5 bg-gray-50 p-3 sm:p-3.5 rounded-2xl border border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-600 font-medium">
          <span>Tiến trình mở phẳng:</span>
          <span className="font-mono text-orange-600 font-bold">
            {unfoldProgress === 0
              ? 'Hình trụ nguyên vẹn'
              : unfoldProgress < 0.35
              ? 'Tách 2 đáy tròn'
              : unfoldProgress < 0.95
              ? 'Trải phẳng mặt xung quanh'
              : 'Hoàn tất khai triển'}
          </span>
        </div>

        {/* Progress Slider */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={unfoldProgress}
          onChange={(e) => onProgressChange?.(parseFloat(e.target.value))}
          className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />

        {/* Control Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={onStart}
            disabled={isPlaying}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer min-h-[38px] flex items-center gap-1.5 ${
              isPlaying
                ? 'bg-orange-100 text-orange-700 border border-orange-200'
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-xs'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{unfoldProgress > 0 && unfoldProgress < 1 ? 'TIẾP TỤC' : 'BẮT ĐẦU KHAI TRIỂN'}</span>
          </button>

          <button
            type="button"
            onClick={onPause}
            disabled={!isPlaying}
            className="px-3.5 py-2 text-xs font-bold bg-white hover:bg-gray-100 text-gray-700 rounded-xl border border-gray-200 transition-all cursor-pointer min-h-[38px] flex items-center gap-1.5 disabled:opacity-40"
          >
            <Pause className="w-3.5 h-3.5 fill-current" />
            <span>TẠM DỪNG</span>
          </button>

          <button
            type="button"
            onClick={onReplay}
            className="px-3.5 py-2 text-xs font-bold bg-white hover:bg-gray-100 text-gray-700 rounded-xl border border-gray-200 transition-all cursor-pointer min-h-[38px] flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
            <span>CHƠI LẠI</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="px-3 py-2 text-xs font-bold bg-white hover:bg-gray-100 text-gray-600 rounded-xl border border-gray-200 transition-all cursor-pointer min-h-[38px] ml-auto"
          >
            ĐẶT LẠI
          </button>
        </div>
      </div>

      {/* Dimension Breakdown Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono text-center">
        <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-200">
          <div className="text-[10px] text-gray-500 font-sans font-medium">Chiều Rộng HCN (Chu vi đáy)</div>
          <div className="font-bold text-orange-700 text-sm mt-0.5">2πr = {perimeter} cm</div>
        </div>
        <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200">
          <div className="text-[10px] text-gray-500 font-sans font-medium">Chiều Cao HCN</div>
          <div className="font-bold text-amber-700 text-sm mt-0.5">h = {height} cm</div>
        </div>
        <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200">
          <div className="text-[10px] text-gray-500 font-sans font-medium">Bán kính 2 đáy tròn</div>
          <div className="font-bold text-blue-700 text-sm mt-0.5">r = {radius} cm</div>
        </div>
      </div>

      {/* Live Mathematical Formulas (Toán 9) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200 space-y-1">
          <div className="text-[11px] uppercase font-bold text-orange-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Diện tích Xung Quanh (Sxq):</span>
          </div>
          <div className="text-xs font-mono text-gray-800">
            <MathFormula formula="S_{\text{xq}} = 2\pi rh" /> = <span className="font-bold text-orange-700">{sxq} cm²</span>
          </div>
          <p className="text-[10px] text-gray-600 pt-0.5">
            = Diện tích hình chữ nhật khai triển có cạnh <MathFormula formula="2\pi r" /> và <MathFormula formula="h" />.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
          <div className="text-[11px] uppercase font-bold text-emerald-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Diện tích Toàn Phần (Stp):</span>
          </div>
          <div className="text-xs font-mono text-gray-800">
            <MathFormula formula="S_{\text{tp}} = 2\pi rh + 2\pi r^2" /> = <span className="font-bold text-emerald-700">{stp} cm²</span>
          </div>
          <p className="text-[10px] text-gray-600 pt-0.5">
            = <MathFormula formula="S_{\text{xq}}" /> + Tổng diện tích 2 hình tròn đáy (mỗi đáy <MathFormula formula="\pi r^2 = " />{baseArea} cm²).
          </p>
        </div>
      </div>

      {/* Completion Note when 100% Unfolded */}
      {isCompleted && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong>Khẳng định Toán 9:</strong> Khi cắt dọc theo một đường sinh và trải phẳng mặt xung quanh hình trụ, ta nhận được một <strong>hình chữ nhật</strong> có một cạnh bằng chu vi đáy (<MathFormula formula="2\pi r" />) và một cạnh bằng chiều cao (<MathFormula formula="h" />).
          </div>
        </div>
      )}
    </div>
  );
};

export default NetUnfoldingHUD;
