/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Theory 3D Panel
 * Interactive 3D Model Viewer for Theory View.
 * - Live Three.js WebGL Rendering (Cylinder, Cone, Sphere)
 * - Dimension sliders (Radius $r$, Height $h$)
 * - View mode toggles (Solid, Wireframe)
 * - Live math formulas ($S_{xq}, S_{tp}, V$)
 * - Sibling element to TheoryVideoPanel (no overlay clipping)
 */

import React, { useState, useMemo } from 'react';
import { ShapeType } from '../../types';
import { ThreeDViewer } from '../explore/ThreeDViewer';
import { MathFormula } from '../common/MathFormula';
import {
  RotateCw,
  Box,
  Compass,
  Layers,
  Sparkles,
  Sliders
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Theory3DPanelProps {
  shape: ShapeType;
  className?: string;
}

export const Theory3DPanel: React.FC<Theory3DPanelProps> = ({ shape, className = '' }) => {
  const { navigateTo } = useApp();
  const [radius, setRadius] = useState<number>(() => (shape === 'cone' ? 2.5 : 3.5));
  const [height, setHeight] = useState<number>(() => (shape === 'cone' ? 4.5 : 7));
  const [viewMode, setViewMode] = useState<'solid' | 'wireframe' | 'cross-section'>('solid');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [showAxes, setShowAxes] = useState<boolean>(true);
  const [activeComponentId, setActiveComponentId] = useState<string>('all');

  const handleSpin360 = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1600);
  };

  // Dynamic live geometric metrics
  const liveCalculations = useMemo(() => {
    const r = radius;
    const h = height;
    const pi = Math.PI;

    if (shape === 'cylinder') {
      const sxq = 2 * pi * r * h;
      const stp = 2 * pi * r * h + 2 * pi * r * r;
      const v = pi * r * r * h;
      return {
        formulaSxq: `S_{xq} = 2\\pi \\cdot ${r} \\cdot ${h} \\approx ${sxq.toFixed(1)}`,
        formulaV: `V = \\pi \\cdot ${r}^2 \\cdot ${h} \\approx ${v.toFixed(1)}`
      };
    } else if (shape === 'cone') {
      const l = Math.sqrt(r * r + h * h);
      const sxq = pi * r * l;
      const v = (1 / 3) * pi * r * r * h;
      return {
        formulaSxq: `S_{xq} = \\pi \\cdot ${r} \\cdot ${l.toFixed(1)} \\approx ${sxq.toFixed(1)}`,
        formulaV: `V = \\frac{1}{3}\\pi \\cdot ${r}^2 \\cdot ${h} \\approx ${v.toFixed(1)}`
      };
    } else {
      // Sphere
      const s = 4 * pi * r * r;
      const v = (4 / 3) * pi * Math.pow(r, 3);
      return {
        formulaSxq: `S = 4\\pi \\cdot ${r}^2 \\approx ${s.toFixed(1)}`,
        formulaV: `V = \\frac{4}{3}\\pi \\cdot ${r}^3 \\approx ${v.toFixed(1)}`
      };
    }
  }, [shape, radius, height]);

  return (
    <div
      id="theory-3d-panel"
      className={`bg-[#FFFDF8] rounded-2xl sm:rounded-3xl border border-[#E5DCCF] shadow-xs overflow-hidden flex flex-col ${className}`}
    >
      {/* 3D Controls Top Bar */}
      <div className="px-4 py-3 bg-[#FAF7F2] border-b border-[#E5DCCF] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          <span className="text-xs font-bold font-serif text-[#3A302B] uppercase tracking-wider">
            MÔ HÌNH 3D TRỰC QUAN • {shape === 'cylinder' ? 'HÌNH TRỤ' : shape === 'cone' ? 'HÌNH NÓN' : 'HÌNH CẦU'}
          </span>
        </div>

        {/* View Mode & Quick Actions */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setViewMode(viewMode === 'solid' ? 'wireframe' : 'solid')}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 border transition-colors cursor-pointer ${
              viewMode === 'wireframe'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white border-[#E5DCCF] text-[#594D46] hover:bg-[#F4EEE4]'
            }`}
            title="Chuyển chế độ khung dây / đặc"
          >
            <Box className="w-3.5 h-3.5" />
            <span>{viewMode === 'wireframe' ? 'Khung Dây' : 'Khối Đặc'}</span>
          </button>

          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 border transition-colors cursor-pointer ${
              isAutoRotating
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white border-[#E5DCCF] text-[#594D46] hover:bg-[#F4EEE4]'
            }`}
            title="Tự động xoay quanh trục"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} />
            <span>Xoay</span>
          </button>

          <button
            onClick={handleSpin360}
            className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-white border border-[#E5DCCF] text-[#594D46] hover:bg-[#F4EEE4] flex items-center gap-1 cursor-pointer"
            title="Xoay 360 độ nhanh"
          >
            <span>360°</span>
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Area */}
      <div className="relative w-full h-[320px] sm:h-[380px] bg-slate-50">
        <ThreeDViewer
          shape={shape}
          radius={radius}
          height={height}
          onRadiusChange={setRadius}
          onHeightChange={setHeight}
          viewMode={viewMode}
          showAxes={showAxes}
          isAutoRotating={isAutoRotating}
          onToggleAutoRotate={() => setIsAutoRotating(!isAutoRotating)}
          onSpin360={handleSpin360}
          isSpinning={isSpinning}
          activeComponentId={activeComponentId}
          onSelectComponent={setActiveComponentId}
        />

        {/* Real-time Math Formulas Pill floating over 3D (bottom left) */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs p-2 sm:p-2.5 rounded-xl border border-slate-200 shadow-sm text-xs font-serif text-[#3A302B] space-y-1 pointer-events-none hidden sm:block">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Kích thước tức thời:</span>
          </div>
          <div className="font-mono text-xs">
            <MathFormula formula={liveCalculations.formulaSxq} />
          </div>
          <div className="font-mono text-xs">
            <MathFormula formula={liveCalculations.formulaV} />
          </div>
        </div>
      </div>

      {/* Interactive Sliders & Explore Link Bar */}
      <div className="p-3.5 bg-[#FAF7F2] border-t border-[#E5DCCF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Sliders */}
        <div className="flex items-center gap-4 flex-wrap flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#594D46]">Bán kính r:</span>
            <input
              type="range"
              min={1}
              max={6}
              step={0.5}
              value={radius}
              onChange={(e) => setRadius(parseFloat(e.target.value))}
              className="w-24 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-xs font-mono font-bold text-[#3A302B]">{radius}</span>
          </div>

          {shape !== 'sphere' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#594D46]">Chiều cao h:</span>
              <input
                type="range"
                min={2}
                max={10}
                step={0.5}
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value))}
                className="w-24 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-xs font-mono font-bold text-[#3A302B]">{height}</span>
            </div>
          )}
        </div>

        {/* Quick Link to full 3D lab */}
        <button
          onClick={() => navigateTo('/explore')}
          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Mở Khám Phá 3D</span>
        </button>
      </div>
    </div>
  );
};
