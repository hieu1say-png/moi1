/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NON-OBSTRUCTIVE HUD: SPHERE VS CYLINDER VOLUME COMPARISON (ARCHIMEDES THEOREM)
 * Sits outside the 3D WebGL Canvas for 100% unobstructed 3D visibility
 */

import React from 'react';
import { Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import { MathFormula } from '../../common/MathFormula';

export interface SphereVolumeCompareHUDProps {
  radius: number;
  showCircumscribedCylinder: boolean;
  onToggleCircumscribedCylinder: (show: boolean) => void;
  className?: string;
}

export const SphereVolumeCompareHUD: React.FC<SphereVolumeCompareHUDProps> = ({
  radius,
  showCircumscribedCylinder,
  onToggleCircumscribedCylinder,
  className = ''
}) => {
  const pi = Math.PI;
  const cylHeight = 2 * radius;
  const cylVolume = 2 * pi * Math.pow(radius, 3);
  const cylVolumePi = (2 * Math.pow(radius, 3)).toFixed(1);

  const sphereVolume = (4 / 3) * pi * Math.pow(radius, 3);
  const sphereVolumePi = (((4 / 3) * Math.pow(radius, 3))).toFixed(1);

  return (
    <div
      id="docked-sphere-volume-compare-hud"
      className={`bg-white rounded-2xl sm:rounded-3xl border border-purple-200 shadow-sm p-4 sm:p-5 space-y-4 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-100 border border-purple-200 text-purple-600 flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-gray-900">
              So Sánh Thể Tích: Hình Cầu vs Hình Trụ Ngoại Tiếp
            </h4>
            <p className="text-[11px] text-gray-500 font-medium">
              Định lý Archimedes: <MathFormula formula="V_{\text{cầu}} = \frac{2}{3} V_{\text{trụ}}" />
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onToggleCircumscribedCylinder(!showCircumscribedCylinder)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            showCircumscribedCylinder
              ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
              : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
          }`}
        >
          {showCircumscribedCylinder ? 'Ẩn hình trụ ngoại tiếp' : 'Hiện hình trụ ngoại tiếp'}
        </button>
      </div>

      {/* Synchronized Volume Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
        {/* Cylinder */}
        <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-1">
          <div className="flex items-center justify-between font-sans">
            <span className="font-bold text-purple-950 text-xs">1. Hình Trụ Ngoại Tiếp</span>
            <span className="text-[10px] text-purple-700 bg-white px-2 py-0.5 rounded border border-purple-200">
              r = {radius}cm, h = {cylHeight}cm
            </span>
          </div>
          <div className="text-gray-700 text-[11px] pt-1">
            <MathFormula formula="V_{\text{trụ}} = \pi R^2 \cdot (2R) = 2\pi R^3" />
          </div>
          <div className="text-purple-900 font-bold text-sm">
            = {cylVolume.toFixed(2)} cm³ ({cylVolumePi}π)
          </div>
        </div>

        {/* Sphere */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1">
          <div className="flex items-center justify-between font-sans">
            <span className="font-bold text-emerald-950 text-xs">2. Hình Cầu Nội Tiếp</span>
            <span className="text-[10px] text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
              Bán kính R = {radius}cm
            </span>
          </div>
          <div className="text-gray-700 text-[11px] pt-1">
            <MathFormula formula="V_{\text{cầu}} = \frac{4}{3}\pi R^3" />
          </div>
          <div className="text-emerald-900 font-bold text-sm">
            = {sphereVolume.toFixed(2)} cm³ ({sphereVolumePi}π)
          </div>
        </div>
      </div>

      {/* Archimedes Ratio Derivation */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 space-y-2 text-xs text-purple-950">
        <div className="flex items-center gap-2 font-bold text-purple-900">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>Tỉ số Thể tích Kỳ diệu của Nhà bác học Archimedes:</span>
        </div>
        <div className="font-mono text-xs sm:text-sm text-purple-900 bg-white/80 p-2.5 rounded-xl border border-purple-200 text-center font-bold">
          <MathFormula formula="\frac{V_{\text{cầu}}}{V_{\text{trụ}}} = \frac{\frac{4}{3}\pi R^3}{2\pi R^3} = \frac{4}{3 \times 2} = \frac{2}{3} \approx 66.67\%" />
        </div>
        <p className="text-[11px] text-gray-700 leading-relaxed">
          Thể tích của khối cầu đúng bằng <MathFormula formula="\frac{2}{3}" /> thể tích của khối trụ ngoại tiếp khối cầu đó. Đây là phát minh vĩ đại nhất mà Archimedes yêu cầu khắc lên bia mộ của mình!
        </p>
      </div>
    </div>
  );
};

export default SphereVolumeCompareHUD;
