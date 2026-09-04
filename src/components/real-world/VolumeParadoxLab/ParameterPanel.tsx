/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * PARAMETER CONTROL PANEL
 * Sliders for Radius R and Height h
 * Invariant: SAME_RADIUS = true, SAME_HEIGHT = true
 */

import React from 'react';
import { Sliders, Maximize2, MoveVertical } from 'lucide-react';

export interface ParameterPanelProps {
  radius: number; // R in cm (0.5 to 2.0)
  height: number; // h in cm (1.0 to 4.0)
  onRadiusChange: (r: number) => void;
  onHeightChange: (h: number) => void;
  disabled?: boolean;
}

export const ParameterPanel: React.FC<ParameterPanelProps> = ({
  radius,
  height,
  onRadiusChange,
  onHeightChange,
  disabled = false
}) => {
  // Synchronized mathematical volume computations
  const vCylinder = Math.PI * radius * radius * height;
  const vCone = (1 / 3) * Math.PI * radius * radius * height;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-orange-100 text-orange-600">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-800">THÔNG SỐ HÌNH HỌC (ĐỒNG BỘ NÓN &amp; TRỤ)</h3>
            <p className="text-xs text-slate-500">
              Hai hình luôn có cùng bán kính đáy <strong>R</strong> và cùng chiều cao <strong>h</strong>
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold px-2 py-1 rounded-md bg-orange-50 text-orange-700 border border-orange-200">
            V_nón = {vCone.toFixed(2)} cm³
          </span>
          <span className="text-[11px] font-mono font-bold px-2 py-1 rounded-md bg-sky-50 text-sky-700 border border-sky-200">
            V_trụ = {vCylinder.toFixed(2)} cm³
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Radius R Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="param-radius-r" className="font-bold text-slate-700 flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-orange-500" />
              <span>Bán kính đáy R (chung):</span>
            </label>
            <div className="flex items-center gap-1">
              <span className="font-mono font-bold text-sm text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-lg border border-orange-200">
                {radius.toFixed(2)} cm
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-slate-400">0.50</span>
            <input
              id="param-radius-r"
              type="range"
              min="0.5"
              max="2.0"
              step="0.01"
              value={radius}
              disabled={disabled}
              onChange={(e) => onRadiusChange(parseFloat(e.target.value))}
              aria-label="Bán kính đáy R"
              aria-valuemin={0.5}
              aria-valuemax={2.0}
              aria-valuenow={radius}
              className="flex-1 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className="text-[11px] font-mono text-slate-400">2.00</span>
          </div>
        </div>

        {/* Height h Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="param-height-h" className="font-bold text-slate-700 flex items-center gap-1.5">
              <MoveVertical className="w-3.5 h-3.5 text-orange-500" />
              <span>Chiều cao h (chung):</span>
            </label>
            <div className="flex items-center gap-1">
              <span className="font-mono font-bold text-sm text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-lg border border-orange-200">
                {height.toFixed(2)} cm
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-slate-400">1.00</span>
            <input
              id="param-height-h"
              type="range"
              min="1.0"
              max="4.0"
              step="0.01"
              value={height}
              disabled={disabled}
              onChange={(e) => onHeightChange(parseFloat(e.target.value))}
              aria-label="Chiều cao h"
              aria-valuemin={1.0}
              aria-valuemax={4.0}
              aria-valuenow={height}
              className="flex-1 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className="text-[11px] font-mono text-slate-400">4.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};
