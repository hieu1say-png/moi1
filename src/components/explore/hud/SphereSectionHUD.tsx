/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NON-OBSTRUCTIVE HUD: SPHERE SECTION (CROSS-SECTION CUT PLANE)
 * Sits outside the 3D WebGL Canvas for 100% unobstructed 3D visibility
 */

import React from 'react';
import { Layers, Sparkles, Sliders } from 'lucide-react';
import { MathFormula } from '../../common/MathFormula';

export interface SphereSectionHUDProps {
  radius: number;
  sectionDistance: number; // 0 to radius
  onSectionDistanceChange: (d: number) => void;
  className?: string;
}

export const SphereSectionHUD: React.FC<SphereSectionHUDProps> = ({
  radius,
  sectionDistance,
  onSectionDistanceChange,
  className = ''
}) => {
  const pi = Math.PI;
  const clampedD = Math.min(radius, Math.max(0, sectionDistance));
  const sectionRadius = Math.sqrt(Math.max(0, radius * radius - clampedD * clampedD));
  const sectionArea = pi * sectionRadius * sectionRadius;
  const sectionAreaPi = (sectionRadius * sectionRadius).toFixed(2);

  return (
    <div
      id="docked-sphere-section-hud"
      className={`bg-white rounded-2xl sm:rounded-3xl border border-orange-200 shadow-sm p-4 sm:p-5 space-y-4 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-100 border border-orange-200 text-orange-600 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-gray-900">
              Khám Phá Thiết Diện Lát Cắt Hình Cầu
            </h4>
            <p className="text-[11px] text-gray-500 font-medium">
              Mặt phẳng cắt khối cầu cách tâm O một khoảng cách <MathFormula formula="d" />
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-orange-700">
          <MathFormula formula="\rho = \sqrt{R^2 - d^2}" />
        </span>
      </div>

      {/* Interactive Slider for Distance d */}
      <div className="space-y-2 bg-gray-50 p-3.5 rounded-2xl border border-gray-200">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-700 font-medium flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-orange-500" />
            <span>Khoảng cách từ tâm O đến mặt phẳng (d):</span>
          </span>
          <span className="font-mono text-orange-600 font-bold bg-white px-2.5 py-0.5 rounded-md border border-gray-200">
            {clampedD.toFixed(1)} cm / {radius} cm
          </span>
        </div>

        <input
          type="range"
          min="0"
          max={radius}
          step="0.1"
          value={clampedD}
          onChange={(e) => onSectionDistanceChange(parseFloat(e.target.value))}
          className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />

        <div className="flex justify-between text-[10px] text-gray-400 font-mono pt-0.5">
          <span>0 cm (Qua tâm O)</span>
          <span>{(radius / 2).toFixed(1)} cm</span>
          <span>{radius} cm (Tiếp diện)</span>
        </div>
      </div>

      {/* Live Calculated Geometric Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-0.5">
          <div className="text-[10px] text-gray-500 font-sans font-medium">Bán kính thiết diện (ρ):</div>
          <div className="text-emerald-800 font-bold text-sm">
            <MathFormula formula={`\\rho = \\sqrt{${radius}^2 - ${clampedD.toFixed(1)}^2} = `} />
            <span className="text-base">{sectionRadius.toFixed(2)} cm</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-200 space-y-0.5">
          <div className="text-[10px] text-gray-500 font-sans font-medium">Diện tích thiết diện (S):</div>
          <div className="text-orange-900 font-bold text-sm">
            <MathFormula formula={`S = \\pi \\rho^2 = `} />
            <span className="text-base">{sectionArea.toFixed(2)} cm²</span> ({sectionAreaPi}π)
          </div>
        </div>
      </div>

      {/* Pedagogical Commentary & Special Cases */}
      <div className="p-3.5 rounded-2xl bg-orange-50/40 border border-orange-200 text-xs text-gray-800 space-y-1.5 leading-relaxed">
        {clampedD === 0 ? (
          <div className="flex items-start gap-2 text-amber-900 font-medium">
            <Sparkles className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <strong>Thiết diện lớn nhất (Đường tròn lớn):</strong> Khi mặt phẳng đi qua tâm O (<MathFormula formula="d = 0" />), thiết diện là <strong>hình tròn lớn</strong> có bán kính đúng bằng bán kính hình cầu <MathFormula formula="\rho = R = " />{radius} cm và diện tích lớn nhất <MathFormula formula="S = \pi R^2" />.
            </div>
          </div>
        ) : clampedD >= radius ? (
          <div className="text-rose-800 font-medium">
            <strong>Mặt phẳng tiếp xúc (Tiếp diện):</strong> Khi khoảng cách <MathFormula formula="d = R" />, mặt phẳng chỉ tiếp xúc với mặt cầu tại đúng 1 điểm duy nhất (bán kính thiết diện <MathFormula formula="\rho = 0" />).
          </div>
        ) : (
          <div>
            <strong>Định lý Lát Cắt Toán 9:</strong> Mọi mặt phẳng cắt hình cầu đều tạo ra thiết diện là một <strong>hình tròn</strong>. Bán kính thiết diện luôn tuân theo định lý Pythagore trong tam giác vuông: <MathFormula formula="\rho^2 + d^2 = R^2 \iff \rho = \sqrt{R^2 - d^2}" />.
          </div>
        )}
      </div>
    </div>
  );
};

export default SphereSectionHUD;
