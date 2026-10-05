/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - MOBILE 3D TOUCH CONTROLS
 * Ergonomic Touch Gesture Engine for Mobile Devices (iPhone / Android):
 * - 1 Finger: Smooth 360° Orbit Rotation
 * - 2 Fingers: Pinch to Zoom in/out
 * - Double Tap: Quick Camera Reset
 * - Large Touch Targets (Min 44x44px) for one-handed operation
 */

import React, { useState } from 'react';
import {
  RotateCcw,
  Layers,
  Ruler,
  Eye,
  Sparkles,
  HelpCircle,
  X,
  Maximize2
} from 'lucide-react';

export interface TouchControlsProps {
  onResetView?: () => void;
  isExploded?: boolean;
  onToggleExplode?: () => void;
  showDimensions?: boolean;
  onToggleDimensions?: () => void;
  isWireframe?: boolean;
  onToggleWireframe?: () => void;
  shapeName?: string;
}

export const TouchControls: React.FC<TouchControlsProps> = ({
  onResetView,
  isExploded = false,
  onToggleExplode,
  showDimensions = true,
  onToggleDimensions,
  isWireframe = false,
  onToggleWireframe,
  shapeName = 'Hình không gian'
}) => {
  const [showHint, setShowHint] = useState(true);

  return (
    <div className="pointer-events-none relative w-full h-full flex flex-col justify-between p-3 select-none">
      {/* Top Banner: Gesture Tip (Auto-dismissable) */}
      {showHint && (
        <div className="pointer-events-auto flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-[#2D241E]/80 backdrop-blur-md text-white text-xs shadow-md border border-white/10 animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">💡 Thao tác 3D:</span>
            <span>1 ngón xoay • 2 ngón phóng to • Chạm 2 lần để đặt lại</span>
          </div>
          <button
            type="button"
            onClick={() => setShowHint(false)}
            className="p-1 rounded-lg hover:bg-white/20 active:scale-90 text-white/80 transition-colors"
            aria-label="Đóng hướng dẫn"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Bottom Quick Action Dock for 3D Viewport */}
      <div className="pointer-events-auto mt-auto flex items-center justify-center gap-2 px-3 py-2 rounded-2xl bg-[#FFFDF8]/90 backdrop-blur-md border border-[#E5DCCF] shadow-lg self-center mb-1">
        {/* Reset Camera Button */}
        {onResetView && (
          <button
            type="button"
            onClick={onResetView}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-[#E5DCCF] text-[#4A3E36] hover:bg-orange-50 active:bg-orange-100 active:scale-95 transition-all shadow-xs touch-manipulation"
            title="Đặt lại góc nhìn"
            aria-label="Đặt lại góc nhìn 3D"
          >
            <RotateCcw className="w-5 h-5 text-[#8F3E32]" />
          </button>
        )}

        {/* Explode / Fold Net Button */}
        {onToggleExplode && (
          <button
            type="button"
            onClick={onToggleExplode}
            className={`flex items-center gap-1.5 px-3 h-11 rounded-xl font-bold text-xs transition-all shadow-xs active:scale-95 touch-manipulation ${
              isExploded
                ? 'bg-amber-500 text-white border border-amber-600 shadow-inner'
                : 'bg-white border border-[#E5DCCF] text-[#4A3E36] hover:bg-amber-50'
            }`}
            title="Khai triển mặt xung quanh"
            aria-label="Khai triển mặt xung quanh"
          >
            <Layers className="w-4 h-4" />
            <span>{isExploded ? 'Gập lại' : 'Khai triển'}</span>
          </button>
        )}

        {/* Measurement Dimensions Toggle */}
        {onToggleDimensions && (
          <button
            type="button"
            onClick={onToggleDimensions}
            className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all shadow-xs active:scale-95 touch-manipulation ${
              showDimensions
                ? 'bg-blue-600 text-white border border-blue-700 shadow-inner'
                : 'bg-white border border-[#E5DCCF] text-[#4A3E36] hover:bg-blue-50'
            }`}
            title="Hiện kích thước r, h, l"
            aria-label="Bật tắt hiển thị kích thước hình"
          >
            <Ruler className="w-5 h-5" />
          </button>
        )}

        {/* Wireframe / Solid Mode Toggle */}
        {onToggleWireframe && (
          <button
            type="button"
            onClick={onToggleWireframe}
            className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all shadow-xs active:scale-95 touch-manipulation ${
              isWireframe
                ? 'bg-emerald-600 text-white border border-emerald-700 shadow-inner'
                : 'bg-white border border-[#E5DCCF] text-[#4A3E36] hover:bg-emerald-50'
            }`}
            title="Chế độ khung dây"
            aria-label="Bật tắt khung dây 3D"
          >
            <Eye className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
