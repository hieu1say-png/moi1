/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * MINI-GAME 1: KỸ SƯ NHÀ MÁY LON NƯỚC NGỌT 330ML (CAN OPTIMIZATION SANDBOX)
 * - [E] Engineering: Tối ưu hóa vật liệu nhôm lon 330ml (h = 2r ≈ 7.49 cm).
 * - Tính toán chi phí thực tế theo VNĐ trên quy mô 1 triệu lon.
 * - Giảm thiểu rác thải kim loại (kg nhôm nguyên chất) bảo vệ môi trường.
 * - 3 Presets: Lon cao gầy thị trường, Lon tối ưu kỹ sư STEM, Lon lùn béo.
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { MathFormula, MathText } from '../common/MathFormula';
import { Button } from '../common/Button';
import {
  Award,
  Sparkles,
  TrendingDown,
  Info,
  CheckCircle2,
  Zap,
  Leaf,
  DollarSign,
  PackageCheck
} from 'lucide-react';

const FIXED_V = 330; // cm3
const OPTIMAL_R = 3.74; // cm
const OPTIMAL_H = 7.49; // cm
const OPTIMAL_STP = 264.4; // cm2

export const CanOptimizationSandbox: React.FC = () => {
  const [radius, setRadius] = useState<number>(3.0); // cm
  const aluminumPricePerCm2 = 15; // VND / cm2

  // Computed values
  const height = useMemo(() => {
    return FIXED_V / (Math.PI * radius * radius);
  }, [radius]);

  const sDay = useMemo(() => Math.PI * radius * radius, [radius]);
  const sXungQuanh = useMemo(() => 2 * Math.PI * radius * height, [radius, height]);
  const sToanPhan = useMemo(() => 2 * sDay + sXungQuanh, [sDay, sXungQuanh]);
  const unitCostVnd = useMemo(() => sToanPhan * aluminumPricePerCm2, [sToanPhan, aluminumPricePerCm2]);

  // Waste & Savings compared to optimal can on scale of 1,000,000 cans
  const wasteAnalysis = useMemo(() => {
    const diffCm2 = Math.max(0, sToanPhan - OPTIMAL_STP);
    const totalExtraSurfaceM2 = (diffCm2 * 1000000) / 10000; // m2
    // Aluminum thickness 0.1 mm = 0.01 cm, density 2.7 g/cm3
    const extraMassKg = (diffCm2 * 0.01 * 2.7 * 1000000) / 1000; // kg
    const totalExtraCostMillionVnd = (diffCm2 * aluminumPricePerCm2 * 1000000) / 1000000; // Million VND

    return {
      diffCm2: diffCm2.toFixed(1),
      totalExtraSurfaceM2: Math.round(totalExtraSurfaceM2).toLocaleString(),
      extraMassKg: Math.round(extraMassKg).toLocaleString(),
      totalExtraCostMillionVnd: totalExtraCostMillionVnd.toFixed(1)
    };
  }, [sToanPhan, aluminumPricePerCm2]);

  // Is within optimal sweet spot (error < 0.18cm)
  const isOptimal = Math.abs(radius - OPTIMAL_R) <= 0.18;
  const isClose = Math.abs(radius - OPTIMAL_R) <= 0.5 && !isOptimal;

  // Visual aspect ratio scale
  const visualHeight = Math.min(260, Math.max(50, height * 18));
  const visualWidth = Math.min(220, Math.max(40, radius * 2 * 18));

  // Graph curve points for S_tp over r from 2.0 to 6.5
  const graphPoints = useMemo(() => {
    const points: { r: number; s: number }[] = [];
    for (let r = 2.0; r <= 6.5; r += 0.1) {
      const h = FIXED_V / (Math.PI * r * r);
      const s = 2 * Math.PI * r * r + 2 * Math.PI * r * h;
      points.push({ r: Number(r.toFixed(2)), s: Number(s.toFixed(1)) });
    }
    return points;
  }, []);

  const minSInGraph = 264;
  const maxSInGraph = 450;

  const currentGraphX = ((radius - 2.0) / (6.5 - 2.0)) * 260 + 20;
  const currentGraphY = 130 - ((Math.min(maxSInGraph, sToanPhan) - minSInGraph) / (maxSInGraph - minSInGraph)) * 100;

  return (
    <div className="bg-[#FFFDF8] border border-[#E2EADF] rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2EADF] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] text-xs font-bold uppercase">
              [E] Kỹ Thuật Tối Ưu Hóa Vật Liệu STEM
            </span>
            <span className="text-xs text-[#658473] font-medium">Toán 9 Tuyển Sinh 10</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F291E] mt-1 flex items-center gap-2">
            🏭 Dự Án Kỹ Sư: Tối Ưu Hóa Lon Nước Ngọt 330ml
          </h2>
          <p className="text-xs sm:text-sm text-[#52705E] mt-1 max-w-2xl">
            Nhiệm vụ: Thiết kế kích thước bán kính đáy <MathFormula formula="r" inline /> và chiều cao <MathFormula formula="h" inline /> sao cho chứa đúng 330 cm³ đồ uống nhưng tốn ít diện tích nhôm nhất (<MathFormula formula="S_{tp} \to \min" inline />) để tiết kiệm hàng trăm triệu đồng chi phí và giảm thiểu rác thải kim loại!
          </p>
        </div>

        {/* Master Engineer Badge */}
        {isOptimal && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 px-4 py-2 bg-[#FEF3C7] border border-[#FDE68A] rounded-2xl shadow-xs"
          >
            <Award className="w-6 h-6 text-[#B45309]" />
            <div>
              <div className="text-[10px] font-bold uppercase text-[#92400E]">Danh hiệu Đạt được</div>
              <div className="text-sm font-black text-[#78350F]">🏆 KỸ SƯ TRƯỞNG NHÀ MÁY</div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive 2D Dynamic Can Sandbox (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E2EADF] rounded-2xl p-5 shadow-2xs flex flex-col items-center justify-between min-h-[420px]">
          <div className="w-full flex items-center justify-between text-xs font-bold text-[#658473]">
            <span>Mô Hình Lon Nước Ngọt Thực Tế</span>
            <span className="font-mono text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#BBF7D0]">
              V = {FIXED_V} cm³
            </span>
          </div>

          {/* Dynamic Visual Can */}
          <div className="my-auto flex flex-col items-center justify-center h-[260px] w-full relative">
            {/* Top Dimensions indicators */}
            <div className="absolute top-2 text-xs font-bold text-[#0F291E] bg-white/95 px-2.5 py-0.5 rounded-full border border-[#E2EADF] shadow-2xs">
              Đường kính d = {(radius * 2).toFixed(2)} cm
            </div>

            {/* Cylinder Vector Graphic */}
            <div
              className="relative transition-all duration-150 ease-out flex flex-col items-center justify-center"
              style={{ width: `${visualWidth}px`, height: `${visualHeight}px` }}
            >
              {/* Top Lid (Ellipse) */}
              <div
                className="w-full rounded-[50%] bg-gradient-to-b from-slate-200 to-slate-400 border border-slate-600 shadow-inner absolute top-0 z-20 flex items-center justify-center"
                style={{ height: `${Math.max(16, visualWidth * 0.28)}px`, transform: 'translateY(-50%)' }}
              >
                <div className="w-3 h-1.5 rounded-full bg-slate-500/80 border border-slate-700" />
              </div>

              {/* Body */}
              <div
                className={`w-full h-full border-x border-slate-600 relative overflow-hidden transition-colors ${
                  isOptimal
                    ? 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600'
                    : isClose
                    ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600'
                    : 'bg-gradient-to-r from-rose-500 via-rose-400 to-rose-600'
                }`}
              >
                {/* Brand Logo Stripe */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/90 font-black tracking-wider text-center select-none rotate-[-12deg]">
                  <span className="text-xs uppercase drop-shadow">GEOMETRY SODA</span>
                  <span className="text-[10px] opacity-80">330 ML</span>
                </div>
                {/* Shimmer light reflection */}
                <div className="absolute top-0 bottom-0 left-[20%] w-[15%] bg-white/30 skew-x-[-15deg]" />
              </div>

              {/* Bottom Base (Ellipse) */}
              <div
                className="w-full rounded-[50%] bg-slate-400 border border-slate-600 absolute bottom-0 z-10"
                style={{ height: `${Math.max(16, visualWidth * 0.28)}px`, transform: 'translateY(50%)' }}
              />

              {/* Height Indicator on the right */}
              <div className="absolute right-[-50px] top-0 bottom-0 flex items-center">
                <div className="h-full w-[2px] bg-[#64748B] relative">
                  <div className="absolute -top-1 -left-[3px] w-2 h-2 border-t-2 border-l-2 border-slate-700 -rotate-45" />
                  <div className="absolute -bottom-1 -left-[3px] w-2 h-2 border-b-2 border-l-2 border-slate-700 rotate-45" />
                </div>
                <span className="ml-1.5 text-[11px] font-mono font-bold text-[#334155] whitespace-nowrap">
                  h = {height.toFixed(1)} cm
                </span>
              </div>
            </div>
          </div>

          {/* Real-time Status Card */}
          <div className="w-full pt-4 border-t border-[#E2EADF]">
            {isOptimal ? (
              <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0" />
                <div className="text-xs text-[#065F46]">
                  <span className="font-bold">ĐẠT ĐIỂM CỰC TIỂU VÀNG:</span> Chiều cao <MathFormula formula="h \approx 2r \approx 7.49\text{ cm}" inline />. Tiết kiệm tối đa nhôm và bảo vệ môi trường!
                </div>
              </div>
            ) : isClose ? (
              <div className="p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl flex items-center gap-3">
                <Zap className="w-5 h-5 text-[#D97706] shrink-0" />
                <div className="text-xs text-[#92400E]">
                  <span className="font-bold">Gần tới rồi!</span> Tiếp tục dịch chuyển thanh trượt tới <MathFormula formula="r \approx 3.74\text{ cm}" inline />.
                </div>
              </div>
            ) : (
              <div className="p-3 bg-[#FFF1F2] border border-[#FECDD3] rounded-xl flex items-center gap-3">
                <Info className="w-5 h-5 text-[#E11D48] shrink-0" />
                <div className="text-xs text-[#9F1239]">
                  <span className="font-bold">Lãng phí vật liệu:</span> Diện tích <MathFormula formula="S_{tp}" inline /> đang cao hơn mức tối ưu <strong>{wasteAnalysis.diffCm2} cm²/lon</strong>.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Mathematical Analysis & Enterprise Savings (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Preset Buttons */}
          <div className="bg-white border border-[#E2EADF] rounded-2xl p-4 shadow-2xs space-y-2">
            <span className="text-xs font-bold text-[#0F291E] flex items-center gap-1.5">
              <PackageCheck className="w-4 h-4 text-[#16A34A]" />
              Chọn các mẫu thiết kế lon điển hình:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRadius(2.9)}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  Math.abs(radius - 2.9) < 0.05
                    ? 'bg-[#F0FDF4] border-[#16A34A] ring-1 ring-[#16A34A]'
                    : 'bg-[#F8FAF5] border-[#E2EADF] hover:bg-white'
                }`}
              >
                <div className="text-xs font-bold text-[#0F291E]">Lon Cao Gầy (Thị trường)</div>
                <div className="text-[10px] text-[#658473] font-mono mt-0.5">r = 2.9 cm • h = 12.5 cm</div>
              </button>

              <button
                type="button"
                onClick={() => setRadius(3.74)}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  Math.abs(radius - 3.74) < 0.05
                    ? 'bg-[#F0FDF4] border-[#16A34A] ring-1 ring-[#16A34A]'
                    : 'bg-[#F8FAF5] border-[#E2EADF] hover:bg-white'
                }`}
              >
                <div className="text-xs font-bold text-[#16A34A]">Lon Tối Ưu STEM (h = 2r)</div>
                <div className="text-[10px] text-[#059669] font-mono mt-0.5">r = 3.74 cm • h = 7.49 cm</div>
              </button>

              <button
                type="button"
                onClick={() => setRadius(4.8)}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  Math.abs(radius - 4.8) < 0.05
                    ? 'bg-[#F0FDF4] border-[#16A34A] ring-1 ring-[#16A34A]'
                    : 'bg-[#F8FAF5] border-[#E2EADF] hover:bg-white'
                }`}
              >
                <div className="text-xs font-bold text-[#0F291E]">Lon Lùn Béo (Đĩa tròn)</div>
                <div className="text-[10px] text-[#658473] font-mono mt-0.5">r = 4.8 cm • h = 4.56 cm</div>
              </button>
            </div>
          </div>

          {/* Interactive Radius Slider */}
          <div className="bg-white border border-[#E2EADF] rounded-2xl p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0F291E]">
                Bán kính đáy r: <span className="text-lg font-mono font-black text-[#16A34A]">{radius.toFixed(2)} cm</span>
              </span>
            </div>

            <input
              type="range"
              min="2.0"
              max="6.5"
              step="0.05"
              value={radius}
              onChange={(e) => setRadius(parseFloat(e.target.value))}
              className="w-full h-2.5 bg-[#E2EADF] rounded-lg appearance-none cursor-pointer accent-[#16A34A]"
            />
            <div className="flex justify-between text-[10px] text-[#658473] font-mono">
              <span>2.0 cm (Cao lênh khênh)</span>
              <span className="text-[#16A34A] font-bold">3.74 cm (Chuẩn Tối Ưu)</span>
              <span>6.5 cm (Dẹt như đĩa)</span>
            </div>
          </div>

          {/* Mathematical Metric Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-[#F8FAF5] border border-[#E2EADF] rounded-xl p-3 text-center">
              <div className="text-[10px] text-[#658473] font-bold">Chiều cao h</div>
              <div className="text-sm sm:text-base font-bold text-[#0F291E] font-mono mt-0.5">
                {height.toFixed(2)} <span className="text-xs font-normal">cm</span>
              </div>
            </div>
            <div className="bg-[#F8FAF5] border border-[#E2EADF] rounded-xl p-3 text-center">
              <div className="text-[10px] text-[#658473] font-bold">Diện tích 2 đáy</div>
              <div className="text-sm sm:text-base font-bold text-[#0F291E] font-mono mt-0.5">
                {(2 * sDay).toFixed(1)} <span className="text-xs font-normal">cm²</span>
              </div>
            </div>
            <div className="bg-[#F8FAF5] border border-[#E2EADF] rounded-xl p-3 text-center">
              <div className="text-[10px] text-[#658473] font-bold">Diện tích XQ</div>
              <div className="text-sm sm:text-base font-bold text-[#0F291E] font-mono mt-0.5">
                {sXungQuanh.toFixed(1)} <span className="text-xs font-normal">cm²</span>
              </div>
            </div>
            <div className={`rounded-xl p-3 text-center border ${
              isOptimal ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]' : 'bg-[#FFF1F2] border-[#FECDD3] text-[#9F1239]'
            }`}>
              <div className="text-[10px] font-bold">Tổng diện tích S_tp</div>
              <div className="text-sm sm:text-base font-black font-mono mt-0.5">
                {sToanPhan.toFixed(1)} <span className="text-xs font-normal">cm²</span>
              </div>
            </div>
          </div>

          {/* Enterprise Cost & Scrap Reduction Analysis */}
          <div className="bg-gradient-to-r from-[#F0FDF4] to-[#ECFDF5] border border-[#BBF7D0] rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#065F46]">
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-[#16A34A]" />
                Tính toán chi phí &amp; Giảm rác thải trên 1.000.000 lon:
              </span>
              <span className="font-mono text-[11px] text-[#15803D]">
                Đơn giá: {unitCostVnd.toFixed(0)} VNĐ/lon
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
              <div className="bg-white/80 rounded-xl p-2.5 border border-[#A7F3D0]">
                <div className="text-[10px] text-[#658473] font-bold">Diện tích nhôm chênh lệch</div>
                <div className="text-sm font-bold text-[#0F291E] font-mono mt-0.5">
                  {wasteAnalysis.totalExtraSurfaceM2} m²
                </div>
              </div>

              <div className="bg-white/80 rounded-xl p-2.5 border border-[#A7F3D0]">
                <div className="text-[10px] text-[#059669] font-bold flex items-center justify-center gap-1">
                  <Leaf className="w-3 h-3 text-[#16A34A]" />
                  Rác kim loại cắt giảm
                </div>
                <div className="text-sm font-bold text-[#059669] font-mono mt-0.5">
                  {wasteAnalysis.extraMassKg} kg nhôm
                </div>
              </div>

              <div className="bg-white/80 rounded-xl p-2.5 border border-[#A7F3D0]">
                <div className="text-[10px] text-[#15803D] font-bold">Chi phí doanh nghiệp tiết kiệm</div>
                <div className="text-sm font-bold text-[#15803D] font-mono mt-0.5">
                  {wasteAnalysis.totalExtraCostMillionVnd} triệu VNĐ
                </div>
              </div>
            </div>
          </div>

          {/* Cost Optimization Graph (SVG) */}
          <div className="bg-white border border-[#E2EADF] rounded-2xl p-4 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-[#0F291E]">
                <TrendingDown className="w-4 h-4 text-[#16A34A]" />
                <span>Đồ Thị Cực Trị Diện Tích Nhôm S_tp(r)</span>
              </span>
              <span className="text-[#658473] font-mono text-[11px]">
                Cực tiểu tại r = 3.74 cm
              </span>
            </div>

            {/* SVG Curve Canvas */}
            <div className="w-full h-32 bg-[#0F291E] rounded-xl p-2 relative overflow-hidden border border-[#16A34A]/30">
              <svg viewBox="0 0 300 140" className="w-full h-full">
                {/* Grid lines */}
                <line x1="20" y1="120" x2="280" y2="120" stroke="#224233" strokeWidth="1" />
                <line x1="20" y1="20" x2="20" y2="120" stroke="#224233" strokeWidth="1" />

                {/* Optimal Vertical Line */}
                <line x1="130" y1="20" x2="130" y2="120" stroke="#4ADE80" strokeWidth="1" strokeDasharray="3,3" />
                <text x="135" y="32" fill="#4ADE80" fontSize="9" fontWeight="bold">Điểm cực tiểu (h = 2r)</text>

                {/* Function Curve: S(r) */}
                <path
                  d={graphPoints.reduce((acc, pt, idx) => {
                    const x = ((pt.r - 2.0) / (6.5 - 2.0)) * 260 + 20;
                    const y = 130 - ((Math.min(maxSInGraph, pt.s) - minSInGraph) / (maxSInGraph - minSInGraph)) * 100;
                    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
                  }, '')}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="2.5"
                />

                {/* Current Radius Target Indicator */}
                <circle cx={currentGraphX} cy={currentGraphY} r="5" fill="#FBBF24" stroke="#ffffff" strokeWidth="2" />
                <line x1={currentGraphX} y1="20" x2={currentGraphX} y2="120" stroke="#FBBF24" strokeWidth="1" strokeDasharray="2,2" />
              </svg>

              <div className="absolute bottom-1 right-3 text-[10px] text-slate-400 font-mono">
                r = {radius.toFixed(2)} cm &rarr; S_tp = {sToanPhan.toFixed(1)} cm²
              </div>
            </div>
          </div>

          {/* Mathematical Proof */}
          <div className="bg-[#FFFDF5] border border-[#FDE68A] rounded-2xl p-4 text-xs space-y-2">
            <div className="font-bold text-[#92400E] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D97706]" />
              <span>Chứng minh Toán học Tuyển sinh 10 (Bất Đẳng Thức Cauchy / AM-GM):</span>
            </div>
            <div className="text-[#594D46] leading-relaxed space-y-1">
              <div>
                <MathText text="Ta có: $S_{tp} = 2\pi r^2 + 2\pi rh = 2\pi r^2 + \frac{2V}{r} = 2\pi r^2 + \frac{V}{r} + \frac{V}{r}$." />
              </div>
              <div>
                <MathText text="Áp dụng BĐT Cauchy cho 3 số dương: $S_{tp} \ge 3\sqrt[3]{2\pi r^2 \cdot \frac{V}{r} \cdot \frac{V}{r}} = 3\sqrt[3]{2\pi V^2}$." />
              </div>
              <div className="font-bold text-[#78350F]">
                <MathText text="Dấu '=' xảy ra khi $2\pi r^2 = \frac{V}{r} \iff V = 2\pi r^3 \iff \pi r^2 h = 2\pi r^3 \iff h = 2r$ (Chiều cao đúng bằng đường kính đáy)." />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
