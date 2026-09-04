/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * MINI-GAME 2: NGHỆ NHÂN LÀM NÓN LÁ XỨ HUẾ (CONICAL HAT CRAFT SANDBOX)
 * Applied Geometry for Grade 9:
 * Target: Real-world craft of traditional Vietnamese Conical Hat (Nón Bài Thơ Xứ Huế / Nón Chuông).
 * Key Formulas:
 * 1. Generatrix (Đường sinh l): l = sqrt(r² + h²)
 * 2. Unfolded Sector Angle (Góc ở tâm quạt tròn α): α = (r / l) * 360°
 * 3. Palm leaf surface area (Diện tích xung quanh S_xq): S_xq = π * r * l
 * 4. 16 Bamboo ribs hierarchy calculation (16 Vành nón nan tre).
 */

import React, { useState, useMemo } from 'react';
import { MathFormula } from '../common/MathFormula';
import { Button } from '../common/Button';
import {
  Sparkles
} from 'lucide-react';

export const ConicalHatCraftSandbox: React.FC = () => {
  // Standard traditional conical hat dimensions: r = 20cm (d = 40cm), h = 30cm => l ≈ 36.06cm
  const [radiusR, setRadiusR] = useState<number>(20); // cm
  const [heightH, setHeightH] = useState<number>(30); // cm
  const [activeStep, setActiveStep] = useState<'FRAME' | 'LEAF_SECTOR' | 'WEAVING'>('FRAME');

  // Calculations
  const generatrixL = useMemo(() => {
    return Math.sqrt(radiusR * radiusR + heightH * heightH);
  }, [radiusR, heightH]);

  const sectorAngleDeg = useMemo(() => {
    if (generatrixL === 0) return 0;
    return (radiusR / generatrixL) * 360;
  }, [radiusR, generatrixL]);

  const sXungQuanh = useMemo(() => {
    return Math.PI * radiusR * generatrixL;
  }, [radiusR, generatrixL]);

  const circumferenceBase = useMemo(() => {
    return 2 * Math.PI * radiusR;
  }, [radiusR]);

  return (
    <div className="bg-[#FFFDF8] border-2 border-black rounded-3xl p-5 sm:p-7 shadow-[4px_4px_0px_#000] space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-400 text-amber-900 text-xs font-black uppercase">
              Văn Hóa &amp; Hình Học Di Sản
            </span>
            <span className="text-xs text-slate-500 font-bold">Làng Nón Chuông - Nón Bài Thơ Xứ Huế</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 flex items-center gap-2">
            👒 Mini-Game: Nghệ Nhân Làm Nón Lá Xứ Huế
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Tìm hiểu nguyên lý hình học không gian đằng sau chiếc nón lá truyền thống: Từ tam giác vuông định hình nan tre đến bài toán cắt quạt tròn lá cọ.
          </p>
        </div>

        {/* Action Toggle Mode */}
        <div className="flex items-center gap-2">
          <Button
            variant={activeStep === 'FRAME' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveStep('FRAME')}
            className="text-xs font-bold"
          >
            1. Khung Nan Tre
          </Button>
          <Button
            variant={activeStep === 'LEAF_SECTOR' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveStep('LEAF_SECTOR')}
            className="text-xs font-bold"
          >
            2. Trải Lá Cọ
          </Button>
          <Button
            variant={activeStep === 'WEAVING' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveStep('WEAVING')}
            className="text-xs font-bold"
          >
            3. Chằm Nón
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Visual Display (6 cols) */}
        <div className="lg:col-span-6 bg-white border-2 border-black rounded-2xl p-5 shadow-2xs flex flex-col items-center justify-between min-h-[400px]">
          <div className="w-full flex items-center justify-between text-xs font-bold text-slate-500">
            <span>
              {activeStep === 'FRAME' && 'Khung xương 16 vành nan tre'}
              {activeStep === 'LEAF_SECTOR' && 'Khai triển mặt xung quanh thành hình quạt tròn'}
              {activeStep === 'WEAVING' && 'Thành phẩm Nón Lá Bài Thơ 3D'}
            </span>
            <span className="font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Góc α ≈ {sectorAngleDeg.toFixed(1)}°
            </span>
          </div>

          {/* Canvas Illustration */}
          <div className="my-auto flex items-center justify-center w-full h-[280px]">
            {activeStep === 'FRAME' && (
              <svg viewBox="0 0 300 240" className="w-full h-full max-h-[260px]">
                {/* Axes & Center */}
                <line x1="150" y1="30" x2="150" y2="190" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" />
                <line x1="150" y1="190" x2="250" y2="190" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3,3" />

                {/* Base Ellipse (16 bamboo rings mockup) */}
                <ellipse cx="150" cy="190" rx="100" ry="25" fill="none" stroke="#d97706" strokeWidth="2" />
                <ellipse cx="150" cy="170" rx="87" ry="22" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                <ellipse cx="150" cy="150" rx="75" ry="19" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                <ellipse cx="150" cy="130" rx="62" ry="16" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                <ellipse cx="150" cy="110" rx="50" ry="13" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                <ellipse cx="150" cy="90" rx="37" ry="10" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                <ellipse cx="150" cy="70" rx="25" ry="7" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                <ellipse cx="150" cy="50" rx="12" ry="4" fill="none" stroke="#f59e0b" strokeWidth="1.5" />

                {/* Generatrix Sides */}
                <line x1="150" y1="30" x2="50" y2="190" stroke="#b45309" strokeWidth="2.5" />
                <line x1="150" y1="30" x2="250" y2="190" stroke="#b45309" strokeWidth="2.5" />

                {/* Right angle marker at O */}
                <path d="M 150 180 L 160 180 L 160 190" fill="none" stroke="#3b82f6" strokeWidth="1.5" />

                {/* Dimension Labels */}
                <text x="195" y="205" fill="#2563eb" fontSize="12" fontWeight="bold">r = {radiusR} cm</text>
                <text x="120" y="115" fill="#475569" fontSize="12" fontWeight="bold">h = {heightH} cm</text>
                <text x="210" y="105" fill="#b45309" fontSize="12" fontWeight="bold">l ≈ {generatrixL.toFixed(1)} cm</text>
                <text x="145" y="22" fill="#0f172a" fontSize="13" fontWeight="bold">S (Đỉnh)</text>
                <text x="145" y="208" fill="#0f172a" fontSize="13" fontWeight="bold">O</text>
              </svg>
            )}

            {activeStep === 'LEAF_SECTOR' && (
              <svg viewBox="0 0 300 240" className="w-full h-full max-h-[260px]">
                {/* Circular Sector (Quạt tròn lá cọ) */}
                {(() => {
                  const rad = (sectorAngleDeg * Math.PI) / 180;
                  const startAngle = Math.PI / 2 - rad / 2;
                  const endAngle = Math.PI / 2 + rad / 2;
                  const r = 110;
                  const cx = 150;
                  const cy = 60;
                  const x1 = cx + r * Math.cos(startAngle);
                  const y1 = cy + r * Math.sin(startAngle);
                  const x2 = cx + r * Math.cos(endAngle);
                  const y2 = cy + r * Math.sin(endAngle);
                  const largeArcFlag = sectorAngleDeg > 180 ? 1 : 0;

                  return (
                    <g>
                      <path
                        d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                        fill="#fef3c7"
                        stroke="#d97706"
                        strokeWidth="2.5"
                      />
                      {/* Leaf fibers stripes */}
                      <path d={`M ${cx} ${cy} L 150 ${cy + r}`} stroke="#fde68a" strokeWidth="1.5" strokeDasharray="3,3" />
                      <path d={`M ${cx} ${cy} L 120 ${cy + r - 10}`} stroke="#fde68a" strokeWidth="1.5" strokeDasharray="3,3" />
                      <path d={`M ${cx} ${cy} L 180 ${cy + r - 10}`} stroke="#fde68a" strokeWidth="1.5" strokeDasharray="3,3" />

                      {/* Angle Arc */}
                      <path
                        d={`M ${cx + 25 * Math.cos(startAngle)} ${cy + 25 * Math.sin(startAngle)} A 25 25 0 ${largeArcFlag} 1 ${cx + 25 * Math.cos(endAngle)} ${cy + 25 * Math.sin(endAngle)}`}
                        fill="none"
                        stroke="#dc2626"
                        strokeWidth="2"
                      />
                      <text x="135" y="105" fill="#dc2626" fontSize="11" fontWeight="bold">α ≈ {sectorAngleDeg.toFixed(1)}°</text>

                      {/* Radius labels */}
                      <text x="85" y="80" fill="#b45309" fontSize="11" fontWeight="bold">l = {generatrixL.toFixed(1)}</text>
                      <text x="185" y="80" fill="#b45309" fontSize="11" fontWeight="bold">l = {generatrixL.toFixed(1)}</text>
                      <text x="115" y="210" fill="#2563eb" fontSize="11" fontWeight="bold">Cung đáy C = 2πr = {circumferenceBase.toFixed(1)} cm</text>
                    </g>
                  );
                })()}
              </svg>
            )}

            {activeStep === 'WEAVING' && (
              <div className="relative flex flex-col items-center justify-center">
                <svg viewBox="0 0 300 240" className="w-full h-full max-h-[260px]">
                  {/* Conical Hat Shaded Realistic Vector */}
                  <defs>
                    <linearGradient id="hatGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fef3c7" />
                      <stop offset="30%" stopColor="#fffbeb" />
                      <stop offset="70%" stopColor="#fde68a" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>

                  {/* Body Cone Shape */}
                  <path d="M 150 30 L 50 180 A 100 25 0 0 0 250 180 Z" fill="url(#hatGrad)" stroke="#b45309" strokeWidth="2" />
                  
                  {/* Subtle poem silhouette (Nón bài thơ) */}
                  <text x="110" y="125" fill="#b45309" opacity="0.3" fontSize="10" fontStyle="italic" transform="rotate(-15 110 125)">
                    Ai ra xứ Huế mộng mơ...
                  </text>
                  <text x="115" y="140" fill="#b45309" opacity="0.3" fontSize="10" fontStyle="italic" transform="rotate(-15 115 140)">
                    Mua về chiếc nón bài thơ...
                  </text>

                  {/* Base Ring border */}
                  <ellipse cx="150" cy="180" rx="100" ry="25" fill="none" stroke="#78350f" strokeWidth="2.5" />
                  
                  {/* Silk Strap */}
                  <path d="M 65 183 Q 150 235 235 183" fill="none" stroke="#ec4899" strokeWidth="3" />
                </svg>
              </div>
            )}
          </div>

          <div className="w-full bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-950 font-bold flex items-center justify-between">
            <span>✨ Đường sinh: l ≈ {generatrixL.toFixed(2)} cm</span>
            <span>Diện tích lá cọ: S_xq ≈ {sXungQuanh.toFixed(1)} cm²</span>
          </div>
        </div>

        {/* Right Column: Step by step Controls & Formula Derivations (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Sliders for (r, h) */}
          <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="text-sm font-black text-slate-800 flex items-center justify-between">
              <span>Thông Số Hình Học Nón Lá</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setRadiusR(20);
                  setHeightH(30);
                }}
                className="text-xs font-bold text-amber-800 hover:bg-amber-50 border-amber-300"
              >
                Kích thước Chuẩn Xứ Huế (r=20, h=30)
              </Button>
            </div>

            {/* Radius Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600">Bán kính vành nón đáy (r):</span>
                <span className="font-mono text-blue-700 font-black">{radiusR} cm (Đường kính d = {radiusR * 2} cm)</span>
              </div>
              <input
                type="range"
                min="12"
                max="28"
                step="1"
                value={radiusR}
                onChange={(e) => setRadiusR(parseInt(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Height Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600">Chiều cao chóp nón (h):</span>
                <span className="font-mono text-amber-700 font-black">{heightH} cm</span>
              </div>
              <input
                type="range"
                min="15"
                max="40"
                step="1"
                value={heightH}
                onChange={(e) => setHeightH(parseInt(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>
          </div>

          {/* Mathematical Step-by-Step Box */}
          <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-2xs space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>3 Bước Giải Toán Thực Tế Hình Nón:</span>
            </div>

            {/* Step 1 */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
              <div className="font-black text-slate-900 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center">1</span>
                <span>Tính độ dài đường sinh l bằng định lý Pythagore:</span>
              </div>
              <div className="pl-5 text-slate-700 font-mono">
                <MathFormula formula={`l = \\sqrt{r^2 + h^2} = \\sqrt{${radiusR}^2 + ${heightH}^2} \\approx ${generatrixL.toFixed(2)}\\text{ cm}`} />
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
              <div className="font-black text-slate-900 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center">2</span>
                <span>Tính góc ở tâm α của hình quạt tròn lá cọ:</span>
              </div>
              <div className="pl-5 text-slate-700 font-mono">
                <MathFormula formula={`\\alpha = \\frac{r}{l} \\cdot 360^\\circ = \\frac{${radiusR}}{${generatrixL.toFixed(2)}} \\cdot 360^\\circ \\approx ${sectorAngleDeg.toFixed(1)}^\\circ`} />
              </div>
              <p className="pl-5 text-[11px] text-slate-500">
                (Vì độ dài cung quạt C = 2πr = πlα/180° &rarr; α = (r/l) · 360°)
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs space-y-1">
              <div className="font-black text-amber-950 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-amber-800 text-white text-[10px] flex items-center justify-center">3</span>
                <span>Diện tích lá cọ cần dùng để lợp nón (Diện tích xung quanh):</span>
              </div>
              <div className="pl-5 text-amber-900 font-mono font-bold">
                <MathFormula formula={`S_{xq} = \\pi r l \\approx 3.1416 \\times ${radiusR} \\times ${generatrixL.toFixed(2)} \\approx ${sXungQuanh.toFixed(1)}\\text{ cm}^2`} />
              </div>
              <p className="pl-5 text-[11px] text-amber-800">
                Lưu ý: Nón lá không có đáy dưới nên ta <b>không</b> tính diện tích đáy vào diện tích lá lợp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
