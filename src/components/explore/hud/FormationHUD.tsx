/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NON-OBSTRUCTIVE HUD: FORMATION MODE (0° → 360° SWEEP)
 * Sits outside the 3D WebGL Canvas for 100% unobstructed 3D visibility
 */

import React from 'react';
import { Play, Pause, RotateCcw, Sparkles, CheckCircle2, Compass } from 'lucide-react';
import { ShapeType } from '../../../types';
import { MathFormula } from '../../common/MathFormula';

export interface FormationHUDProps {
  shape: ShapeType;
  radius: number;
  height?: number;
  formationAngle: number; // in radians (0 to 2*PI)
  isPlaying: boolean;
  isCompleted: boolean;
  onStart: () => void;
  onPause: () => void;
  onReplay: () => void;
  onReset: () => void;
  onAngleChange?: (angle: number) => void;
  className?: string;
}

export const FormationHUD: React.FC<FormationHUDProps> = ({
  shape,
  radius,
  height = 8,
  formationAngle,
  isPlaying,
  isCompleted,
  onStart,
  onPause,
  onReplay,
  onReset,
  onAngleChange,
  className = ''
}) => {
  const currentDegrees = Math.round((formationAngle / (Math.PI * 2)) * 360);
  const progressPercent = Math.min(100, Math.round((formationAngle / (Math.PI * 2)) * 100));

  return (
    <div
      id="docked-formation-hud"
      className={`bg-white rounded-2xl sm:rounded-3xl border border-orange-200 shadow-sm p-4 sm:p-5 space-y-4 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-100 border border-orange-200 text-orange-600 flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-gray-900">
              Sự Tạo Thành {shape === 'sphere' ? 'Hình Cầu' : 'Hình Trụ'}
            </h4>
            <p className="text-[11px] text-gray-500 font-medium">
              {shape === 'sphere'
                ? 'Quay nửa hình tròn quanh đường kính cố định một vòng 360°'
                : "Quay hình chữ nhật OO'A'A quanh trục OO' cố định một vòng 360°"}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-orange-700">
            {currentDegrees}° / 360° ({progressPercent}%)
          </span>
        </div>
      </div>

      {/* Interactive Sweeping Controls */}
      <div className="space-y-2.5 bg-gray-50 p-3 sm:p-3.5 rounded-2xl border border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-600 font-medium">
          <span>Góc quét hiện tại:</span>
          <span className="font-mono text-orange-600 font-bold">
            {currentDegrees === 0
              ? shape === 'sphere' ? 'Nửa hình tròn ban đầu' : 'Hình chữ nhật phẳng'
              : currentDegrees < 360
              ? `Đang quay (${currentDegrees}°)`
              : 'Đã hoàn thành 360°'}
          </span>
        </div>

        {/* Angle Slider */}
        <input
          type="range"
          min="0"
          max={Math.PI * 2}
          step="0.02"
          value={formationAngle}
          onChange={(e) => onAngleChange?.(parseFloat(e.target.value))}
          className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />

        {/* Action Buttons */}
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
            <span>{formationAngle > 0 && formationAngle < Math.PI * 2 ? 'TIẾP TỤC QUAY' : 'BẮT ĐẦU QUÉT 360°'}</span>
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

      {/* Mathematical Elements & Sweeping Analysis */}
      {shape === 'sphere' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-200 space-y-1">
            <div className="font-bold text-orange-950 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>Trục quay: Đường kính AB (d = {radius * 2} cm)</span>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Trục quay cố định đi qua tâm O. Bán kính nửa hình tròn <MathFormula formula="R = OA = " />{radius} cm.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1">
            <div className="font-bold text-emerald-950 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Mặt tạo thành: Mặt cầu (Sphere)</span>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Nửa đường tròn quét nên mặt cầu có diện tích <MathFormula formula="S = 4\pi R^2 = " />{(4 * Math.PI * radius * radius).toFixed(1)} cm².
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-200 space-y-1">
            <div className="font-bold text-orange-950 text-[11px]">Trục quay cố định</div>
            <div className="font-mono text-orange-700 font-bold">Cạnh OO' = h = {height}cm</div>
            <p className="text-[10px] text-gray-500">Trục đối xứng đi qua tâm 2 đáy</p>
          </div>

          <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1">
            <div className="font-bold text-blue-950 text-[11px]">2 Cạnh quét 2 đáy</div>
            <div className="font-mono text-blue-700 font-bold">OA = O'A' = r = {radius}cm</div>
            <p className="text-[10px] text-gray-500">Quét nên 2 hình tròn đáy bằng nhau</p>
          </div>

          <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-200 space-y-1">
            <div className="font-bold text-purple-950 text-[11px]">Cạnh quét mặt xung quanh</div>
            <div className="font-mono text-purple-700 font-bold">Đường sinh l = AA' = {height}cm</div>
            <p className="text-[10px] text-gray-500">Quét nên mặt xung quanh hình trụ</p>
          </div>
        </div>
      )}

      {/* Completion SGK Standard Conclusion */}
      {isCompleted && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1 animate-fadeIn">
          <div className="flex items-center gap-2 font-bold text-emerald-950">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Kết luận Sách Giáo Khoa Toán 9:</span>
          </div>
          <p className="text-gray-800 leading-relaxed font-medium pl-6">
            {shape === 'sphere' ? (
              <>
                "Khi quay một <strong>nửa hình tròn</strong> tâm O, bán kính R một vòng quanh đường kính cố định của nó thì được một <strong>hình cầu</strong>."
              </>
            ) : (
              <>
                "Khi quay <strong>hình chữ nhật</strong> quanh một cạnh cố định một vòng, ta nhận được một <strong>hình trụ</strong>."
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default FormationHUD;
