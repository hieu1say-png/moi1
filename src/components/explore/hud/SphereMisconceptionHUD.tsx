/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NON-OBSTRUCTIVE HUD: SPHERE MISCONCEPTION BUSTER (d = 2R?)
 * Sits outside the 3D WebGL Canvas for 100% unobstructed 3D visibility
 */

import React from 'react';
import { HelpCircle, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { MathFormula } from '../../common/MathFormula';

export interface SphereMisconceptionHUDProps {
  radius: number;
  className?: string;
}

export const SphereMisconceptionHUD: React.FC<SphereMisconceptionHUDProps> = ({
  radius,
  className = ''
}) => {
  const diameter = radius * 2;

  return (
    <div
      id="docked-sphere-misconception-hud"
      className={`bg-white rounded-2xl sm:rounded-3xl border border-rose-200 shadow-sm p-4 sm:p-5 space-y-4 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-100 border border-rose-200 text-rose-600 flex items-center justify-center">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-gray-900">
              Giải Mã Ngộ Nhận: Bán Kính R &amp; Đường Kính d
            </h4>
            <p className="text-[11px] text-gray-500 font-medium">
              Phân biệt chính xác giữa R và d = 2R trong công thức tính toán
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700">
          <MathFormula formula="d = 2R \iff R = \frac{d}{2}" />
        </span>
      </div>

      {/* Misconception Alert Callout */}
      <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-950">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong>Ngộ nhận thường gặp của học sinh:</strong>
          <p className="text-gray-700 leading-relaxed">
            Nhiều học sinh khi đọc đề bài cho <em>"đường kính d = {diameter} cm"</em> thường nhầm lẫn thay trực tiếp <MathFormula formula="d" /> vào công thức <MathFormula formula="S = 4\pi R^2" /> hoặc <MathFormula formula="V = \frac{4}{3}\pi R^3" /> dẫn đến kết quả bị sai gấp 4 lần hoặc 8 lần!
          </p>
        </div>
      </div>

      {/* Side by side comparison cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* Card 1: Bán kính R */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
          <div className="flex items-center justify-between font-bold text-emerald-950">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Bán kính R = OA</span>
            </span>
            <span className="font-mono text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
              R = {radius} cm
            </span>
          </div>
          <p className="text-[11px] text-gray-600 leading-relaxed">
            Khoảng cách từ tâm O đến bất kỳ điểm nào trên mặt cầu.
          </p>
          <div className="pt-2 border-t border-emerald-200/60 font-mono text-[11px] text-emerald-900 space-y-1">
            <div>• <MathFormula formula="S = 4\pi R^2 = " />{(4 * Math.PI * radius * radius).toFixed(1)} cm²</div>
            <div>• <MathFormula formula="V = \frac{4}{3}\pi R^3 = " />{((4 / 3) * Math.PI * Math.pow(radius, 3)).toFixed(1)} cm³</div>
          </div>
        </div>

        {/* Card 2: Đường kính d */}
        <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
          <div className="flex items-center justify-between font-bold text-blue-950">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>Đường kính d = AB</span>
            </span>
            <span className="font-mono text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
              d = {diameter} cm
            </span>
          </div>
          <p className="text-[11px] text-gray-600 leading-relaxed">
            Đoạn thẳng nối 2 điểm trên mặt cầu và đi qua tâm O (<MathFormula formula="d = 2R" />).
          </p>
          <div className="pt-2 border-t border-blue-200/60 font-mono text-[11px] text-blue-900 space-y-1">
            <div>• <MathFormula formula="S = \pi d^2 = " />{(Math.PI * diameter * diameter).toFixed(1)} cm²</div>
            <div>• <MathFormula formula="V = \frac{1}{6}\pi d^3 = " />{((1 / 6) * Math.PI * Math.pow(diameter, 3)).toFixed(1)} cm³</div>
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-800 flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <div>
          <strong>Quy tắc giải toán nhanh:</strong> Luôn tìm <MathFormula formula="R = \frac{d}{2}" /> trước khi áp dụng công thức tính diện tích mặt cầu và thể tích hình cầu!
        </div>
      </div>
    </div>
  );
};

export default SphereMisconceptionHUD;
