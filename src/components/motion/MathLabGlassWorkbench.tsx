/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SCALORA 3D GLASSMORPHISM MATH EXPERIMENT WORKBENCH
 * 
 * Requirements satisfied:
 * 1. Khung thẻ kính phản quang 3D (Glassmorphism Mockup) với vệt sáng Specular Sheen (radial-gradient)
 * 2. Bộ tab chuyển đổi 3 khối: [Hình Trụ] - [Hình Nón] - [Hình Cầu]
 * 3. Sliders điều chỉnh bán kính r (2 - 10cm) và chiều cao h (4 - 20cm)
 * 4. Khung vẽ hình học động (Dynamic SVG Math Canvas) tự co giãn tỉ lệ theo slider
 * 5. Hộp tính toán tức thì: Tự động nhảy số S_xq, S_tp, V, và độ dài đường sinh ℓ
 * 6. Trợ lý ảo AI Gia Sư: Phân tích nhanh hiện tượng (r tăng gấp 2 thì V tăng gấp 4, bẫy đơn vị, tỉ lệ 3:1)
 */

import React, { useState, useRef, useMemo } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Maximize2, 
  Sliders, 
  Calculator, 
  Lightbulb, 
  Layers, 
  Droplets,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export type ShapeCategory = 'cylinder' | 'cone' | 'sphere';

export const MathLabGlassWorkbench: React.FC = () => {
  // Shape mode
  const [activeShape, setActiveShape] = useState<ShapeCategory>('cylinder');

  // Sliders: r (2 - 10 cm), h (4 - 20 cm)
  const [radius, setRadius] = useState<number>(4);
  const [height, setHeight] = useState<number>(10);
  // Optional cross section for sphere (0 = great circle, up to radius)
  const [sphereCutDist, setSphereCutDist] = useState<number>(0);

  // 3D Tilt & Specular mouse state
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ rx: number; ry: number; mouseX: number; mouseY: number }>({
    rx: 0,
    ry: 0,
    mouseX: 50,
    mouseY: 50,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    // Subtle 3D tilt: max 5 degrees
    const rx = -((y - rect.height / 2) / (rect.height / 2)) * 3.5;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 3.5;

    setTilt({
      rx,
      ry,
      mouseX: percentX,
      mouseY: percentY,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, mouseX: 50, mouseY: 50 });
  };

  // Preset scenarios aligned with Grade 9 exam standards
  const applyPreset = (r: number, h: number, shape?: ShapeCategory) => {
    if (shape) setActiveShape(shape);
    setRadius(r);
    setHeight(h);
    if (shape === 'sphere') setSphereCutDist(0);
  };

  // Mathematical Calculations
  const mathData = useMemo(() => {
    const r = radius;
    const h = height;
    const pi = Math.PI;

    if (activeShape === 'cylinder') {
      const l = h; // đường sinh bằng chiều cao
      const S_xq_pi = 2 * r * h;
      const S_xq = S_xq_pi * pi;
      const S_day_pi = r * r;
      const S_tp_pi = S_xq_pi + 2 * S_day_pi;
      const S_tp = S_tp_pi * pi;
      const V_pi = r * r * h;
      const V = V_pi * pi;
      const liters = V / 1000;

      return {
        l,
        S_xq_pi,
        S_xq,
        S_tp_pi,
        S_tp,
        V_pi,
        V,
        liters,
        formulaS_xq: '2\\pi r h',
        formulaS_tp: '2\\pi r h + 2\\pi r^2',
        formulaV: '\\pi r^2 h',
        lNote: 'ℓ = h (đường sinh bằng chiều cao)',
      };
    } else if (activeShape === 'cone') {
      const l = Math.sqrt(r * r + h * h); // đường sinh Pythagore
      const S_xq_pi = r * l;
      const S_xq = S_xq_pi * pi;
      const S_day_pi = r * r;
      const S_tp_pi = S_xq_pi + S_day_pi;
      const S_tp = S_tp_pi * pi;
      const V_pi = (1 / 3) * r * r * h;
      const V = V_pi * pi;
      const liters = V / 1000;

      return {
        l,
        S_xq_pi,
        S_xq,
        S_tp_pi,
        S_tp,
        V_pi,
        V,
        liters,
        formulaS_xq: '\\pi r l',
        formulaS_tp: '\\pi r l + \\pi r^2',
        formulaV: '\\frac{1}{3}\\pi r^2 h',
        lNote: `ℓ = √(h² + r²) = √(${h}² + ${r}²) = ${l.toFixed(2)} cm`,
      };
    } else {
      // Sphere: R = radius, h is considered 2R (đường kính)
      const l = 2 * r; // đường kính
      const S_pi = 4 * r * r;
      const S = S_pi * pi;
      const V_pi = (4 / 3) * r * r * r;
      const V = V_pi * pi;
      const liters = V / 1000;
      const greatCircle_pi = r * r;
      const greatCircle = greatCircle_pi * pi;

      return {
        l,
        S_xq_pi: S_pi,
        S_xq: S,
        S_tp_pi: S_pi,
        S_tp: S,
        V_pi,
        V,
        liters,
        greatCircle_pi,
        greatCircle,
        formulaS_xq: '4\\pi R^2',
        formulaS_tp: '4\\pi R^2',
        formulaV: '\\frac{4}{3}\\pi R^3',
        lNote: `d = 2R = ${2 * r} cm (đường kính)`,
      };
    }
  }, [activeShape, radius, height]);

  // AI Tutor Quick Observations
  const aiInsight = useMemo(() => {
    const r = radius;
    const h = height;

    if (activeShape === 'cylinder') {
      const ratioV = (r * r * h);
      return {
        headline: `Phân tích biến thiên: r = ${r}cm, h = ${h}cm`,
        points: [
          `⚡ Hiệu ứng bậc hai: Thể tích V = πr²h. Nếu em tăng bán kính r lên gấp 2 (từ ${r} lên ${r * 2}cm) mà giữ nguyên chiều cao, thể tích sẽ tăng gấp 4 lần (2² = 4)!`,
          `🧪 Mối liên hệ 3:1: Thể tích hình trụ này bằng đúng 3 lần thể tích một hình nón có cùng bán kính đáy (${r}cm) và chiều cao (${h}cm).`,
          `⚠️ Cảnh báo bẫy đề thi: Chú ý đề thi cho 'đường kính đáy d' hay 'bán kính đáy r'. Dung tích lon là ${(mathData.liters * 1000).toFixed(0)} ml (${mathData.liters.toFixed(3)} lít).`,
        ],
      };
    } else if (activeShape === 'cone') {
      const l = mathData.l;
      const isPythagorean = Math.abs(l - Math.round(l)) < 0.001;
      return {
        headline: `Phân tích tam giác vuông SOA: r = ${r}cm, h = ${h}cm`,
        points: [
          `📐 Định lý Pythagore: Đường sinh ℓ = √(h² + r²) = ${l.toFixed(2)} cm. ${
            isPythagorean
              ? `🎯 Tuyệt vời! Bộ ba (${r}, ${h}, ${Math.round(l)}) là bộ ba Pythagore số nguyên đẹp rất hay xuất hiện trong đề thi tuyển sinh vào 10!`
              : `Trong đề thi, hãy để dạng căn thức thu gọn nếu số vô tỉ.`
          }`,
          `👒 Khai triển nón lá: Khi cắt hình nón theo một đường sinh và trải phẳng ra, ta được một hình quạt tròn có bán kính quạt chính là đường sinh ℓ!`,
          `🧪 Thực nghiệm Archimedes: Thể tích nón chỉ bằng ⅓ thể tích hình trụ có cùng kích thước đáy và chiều cao: V_nón = ⅓ V_trụ.`,
        ],
      };
    } else {
      return {
        headline: `Phân tích hình cầu: Bán kính R = ${r}cm`,
        points: [
          `🌐 Mặt cắt qua tâm (Đường tròn lớn): Khi cắt hình cầu bởi mặt phẳng qua tâm O, thiết diện là hình tròn có diện tích S_lớn = πR² = ${mathData.greatCircle_pi}π ≈ ${mathData.greatCircle.toFixed(1)} cm².`,
          `✨ Tỉ lệ kinh điển: Diện tích toàn bộ mặt cầu (4πR²) gấp đúng 4 lần diện tích hình tròn lớn!`,
          `⚠️ Bẫy luỹ thừa bậc 3: Thể tích hình cầu phụ thuộc vào R³ (V = ⁴⁄₃πR³), còn diện tích phụ thuộc vào R² (S = 4πR²). Đừng nhầm lẫn giữa hai công thức khi vào phòng thi!`,
        ],
      };
    }
  }, [activeShape, radius, height, mathData]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg)`,
        transition: 'transform 180ms ease-out',
      }}
      className="relative w-full max-w-5xl mx-auto rounded-3xl border border-white/80 bg-white/85 backdrop-blur-2xl shadow-2xl overflow-hidden specular-glass math-lab-interactive"
    >
      {/* Dynamic Specular Sheen Highlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(750px circle at ${tilt.mouseX}% ${tilt.mouseY}%, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.12) 35%, transparent 65%)`,
        }}
      />

      {/* Top Window Bar (macOS Style) */}
      <div className="relative z-20 px-5 py-3.5 border-b border-[#E2EADF] bg-white/60 flex items-center justify-between flex-wrap gap-2">
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-2xs" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-2xs" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-2xs" />
          <span className="ml-2 font-mono text-xs font-bold text-[#0F291E] tracking-tight flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>KHUNG KÍNH THÍ NGHIỆM 3D • ARCHIMEDES LAB</span>
          </span>
        </div>

        {/* Engine Status Badge */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>60fps Interactive Engine</span>
          </span>
          <span className="hidden sm:inline-block text-[11px] text-[#658473] font-mono">
            Chuẩn GDPT 2018
          </span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="relative z-20 p-5 sm:p-7 space-y-6">
        {/* 1. Shape Switcher Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E2EADF] pb-5">
          <div className="flex p-1 rounded-2xl bg-slate-100/90 border border-slate-200/80 shadow-2xs w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveShape('cylinder')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeShape === 'cylinder'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span className="text-base">🥫</span>
              <span>Hình Trụ</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveShape('cone')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeShape === 'cone'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span className="text-base">🍦</span>
              <span>Hình Nón</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveShape('sphere')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeShape === 'sphere'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span className="text-base">🔮</span>
              <span>Hình Cầu</span>
            </button>
          </div>

          {/* Quick Presets for Exam Scenarios */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold text-[#658473]">Tình huống mẫu:</span>
            {activeShape === 'cylinder' && (
              <>
                <button
                  type="button"
                  onClick={() => applyPreset(3.3, 12)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all cursor-pointer"
                >
                  Lon nước ngọt (r=3.3, h=12)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(5, 10)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all cursor-pointer"
                >
                  Thùng phuy (r=5, h=10)
                </button>
              </>
            )}
            {activeShape === 'cone' && (
              <>
                <button
                  type="button"
                  onClick={() => applyPreset(6, 8)}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-all cursor-pointer"
                >
                  Bộ ba Pythagore 6-8-10
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(5, 12)}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-all cursor-pointer"
                >
                  Nón lá (r=5, h=12, ℓ=13)
                </button>
              </>
            )}
            {activeShape === 'sphere' && (
              <>
                <button
                  type="button"
                  onClick={() => applyPreset(6, 12)}
                  className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold transition-all cursor-pointer"
                >
                  Quả bóng đá (R=6)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(4, 8)}
                  className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold transition-all cursor-pointer"
                >
                  Viên bi tròn (R=4)
                </button>
              </>
            )}
          </div>
        </div>

        {/* 2. Interactive Split Layout: SVG Canvas vs Sliders & Real-Time Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left / Center: Dynamic Scalable SVG Math Canvas */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-b from-slate-50/90 to-emerald-50/30 border border-slate-200/90 relative min-h-[340px]">
            {/* SVG Visualizer */}
            <DynamicShapeCanvas
              shape={activeShape}
              radius={radius}
              height={height}
              l={mathData.l}
            />

            {/* Geometry Annotations Pill */}
            <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[11px] font-mono font-semibold px-3 py-1.5 rounded-xl bg-white/90 border border-[#E2EADF] shadow-2xs">
              <span className="text-[#0F291E]">
                Bán kính <strong className="text-emerald-700">r = {radius} cm</strong>
              </span>
              {activeShape !== 'sphere' && (
                <span className="text-[#0F291E]">
                  Chiều cao <strong className="text-emerald-700">h = {height} cm</strong>
                </span>
              )}
              <span className="text-emerald-800 font-bold">
                {mathData.lNote}
              </span>
            </div>
          </div>

          {/* Right: Sliders & Instant Real-Time Calculation Box */}
          <div className="lg:col-span-6 space-y-5">
            {/* Sliders Control Panel */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-[#E2EADF] shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F291E] flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-emerald-600" />
                  <span>Điều Khiển Kích Thước Hình Học</span>
                </span>
                <span className="text-[11px] text-[#658473]">Đơn vị: centimet (cm)</span>
              </div>

              {/* Slider 1: Bán kính r (2 - 10 cm) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#0F291E]">
                  <label htmlFor="workbench-slider-radius" className="flex items-center gap-1.5 cursor-pointer">
                    <span>Bán kính đáy {activeShape === 'sphere' ? 'R' : 'r'}:</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-xs">
                      {radius} cm
                    </span>
                  </label>
                  <span className="text-[11px] font-mono text-slate-500">Giới hạn: 2 - 10 cm</span>
                </div>
                <input
                  id="workbench-slider-radius"
                  type="range"
                  min="2"
                  max="10"
                  step="0.5"
                  value={radius}
                  onChange={(e) => setRadius(parseFloat(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 slider"
                />
                <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                  <span>2 cm</span>
                  <span>4 cm</span>
                  <span>6 cm</span>
                  <span>8 cm</span>
                  <span>10 cm</span>
                </div>
              </div>

              {/* Slider 2: Chiều cao h (4 - 20 cm) (Chỉ cho Trụ & Nón) */}
              {activeShape !== 'sphere' ? (
                <div className="space-y-1.5 pt-1 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0F291E]">
                    <label htmlFor="workbench-slider-height" className="flex items-center gap-1.5 cursor-pointer">
                      <span>Chiều cao h:</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-xs">
                        {height} cm
                      </span>
                    </label>
                    <span className="text-[11px] font-mono text-slate-500">Giới hạn: 4 - 20 cm</span>
                  </div>
                  <input
                    id="workbench-slider-height"
                    type="range"
                    min="4"
                    max="20"
                    step="1"
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value, 10))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 slider"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                    <span>4 cm</span>
                    <span>8 cm</span>
                    <span>12 cm</span>
                    <span>16 cm</span>
                    <span>20 cm</span>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200/80 text-xs text-teal-900 leading-relaxed font-medium">
                  🌐 <strong>Đặc thù Hình Cầu:</strong> Mọi mặt cắt đi qua tâm O của hình cầu đều tạo ra hình tròn lớn có bán kính đúng bằng bán kính hình cầu R = {radius} cm. Chiều cao tối đa bằng đường kính d = 2R = {radius * 2} cm.
                </div>
              )}
            </div>

            {/* Instant Real-Time Calculation Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#0F291E] to-[#1E3A2F] text-white shadow-md space-y-3">
              <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4" />
                  <span>Hộp Tính Toán Tức Thì (Real-Time Jumper)</span>
                </span>
                <span className="font-mono text-[11px] text-emerald-200/80">π ≈ 3.14159</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* 1. Diện tích xung quanh */}
                <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                  <div className="text-[11px] text-emerald-300 font-bold">
                    {activeShape === 'sphere' ? 'Diện tích mặt cầu S:' : 'Diện tích xung quanh S_xq:'}
                  </div>
                  <div className="text-lg font-mono font-black text-white mt-0.5">
                    {mathData.S_xq_pi.toFixed(1)}π <span className="text-xs font-normal text-emerald-200">cm²</span>
                  </div>
                  <div className="text-xs font-mono text-emerald-300/80 mt-0.5">
                    ≈ {mathData.S_xq.toFixed(2)} cm²
                  </div>
                </div>

                {/* 2. Diện tích toàn phần */}
                <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                  <div className="text-[11px] text-emerald-300 font-bold">
                    {activeShape === 'sphere' ? 'Diện tích hình tròn lớn:' : 'Diện tích toàn phần S_tp:'}
                  </div>
                  <div className="text-lg font-mono font-black text-white mt-0.5">
                    {activeShape === 'sphere'
                      ? `${mathData.greatCircle_pi}π`
                      : `${mathData.S_tp_pi.toFixed(1)}π`}{' '}
                    <span className="text-xs font-normal text-emerald-200">cm²</span>
                  </div>
                  <div className="text-xs font-mono text-emerald-300/80 mt-0.5">
                    ≈ {activeShape === 'sphere' ? mathData.greatCircle?.toFixed(2) : mathData.S_tp.toFixed(2)} cm²
                  </div>
                </div>

                {/* 3. Thể tích V */}
                <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                  <div className="text-[11px] text-emerald-300 font-bold">Thể tích khối V:</div>
                  <div className="text-lg font-mono font-black text-amber-300 mt-0.5">
                    {mathData.V_pi.toFixed(2)}π <span className="text-xs font-normal text-amber-200">cm³</span>
                  </div>
                  <div className="text-xs font-mono text-amber-300/80 mt-0.5">
                    ≈ {mathData.V.toFixed(2)} cm³
                  </div>
                </div>

                {/* 4. Dung tích lít & Đường sinh ℓ */}
                <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                  <div className="text-[11px] text-emerald-300 font-bold">
                    {activeShape === 'cone' ? 'Đường sinh ℓ:' : 'Dung tích chứa nước:'}
                  </div>
                  <div className="text-lg font-mono font-black text-white mt-0.5">
                    {activeShape === 'cone'
                      ? `${mathData.l.toFixed(2)} cm`
                      : `${(mathData.V / 1000).toFixed(3)} lít`}
                  </div>
                  <div className="text-xs font-mono text-emerald-300/80 mt-0.5">
                    {activeShape === 'cone'
                      ? `ℓ = √(${height}² + ${radius}²)`
                      : `=${mathData.V.toFixed(1)} ml (${(mathData.V / 1000).toFixed(4)} dm³)`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. AI Tutor Quick Insights (Trợ lý ảo AI Gia Sư) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-2xs">
                AI
              </span>
              <div>
                <h4 className="font-serif text-sm sm:text-base font-bold text-[#0F291E]">
                  Trợ Lý Gia Sư AI Sư Phạm • Nhận Xét Hiện Tượng Trực Quan
                </h4>
                <p className="text-[11px] text-[#658473] font-medium">{aiInsight.headline}</p>
              </div>
            </div>
            <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
            {aiInsight.points.map((pt, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/90 border border-emerald-200/80 text-xs text-[#0F291E] font-medium leading-relaxed shadow-2xs flex flex-col justify-between"
              >
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SUB-COMPONENT: DYNAMIC SVG SHAPE CANVAS WITH REAL-TIME GEOMETRY MARKERS
// =========================================================================

interface DynamicShapeCanvasProps {
  shape: ShapeCategory;
  radius: number;
  height: number;
  l: number;
}

const DynamicShapeCanvas: React.FC<DynamicShapeCanvasProps> = ({ shape, radius, height, l }) => {
  // SVG Canvas dimensions: 360 x 280
  const width = 360;
  const canvasHeight = 280;
  const centerX = width / 2;

  // Scale calculations to fit nicely within viewport
  // radius is 2..10 -> scaled 35..110
  // height is 4..20 -> scaled 70..170
  const scaleR = 30 + ((radius - 2) / 8) * 75;
  const scaleH = 60 + ((height - 4) / 16) * 110;
  const centerY = canvasHeight / 2;

  if (shape === 'cylinder') {
    const rx = scaleR;
    const ry = scaleR * 0.32; // ellipse ratio
    const topY = centerY - scaleH / 2;
    const botY = centerY + scaleH / 2;

    return (
      <svg
        viewBox={`0 0 ${width} ${canvasHeight}`}
        className="w-full max-w-[340px] h-[260px] drop-shadow-md select-none"
      >
        <defs>
          {/* 3D Cylinder gradient */}
          <linearGradient id="cylinderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.85" />
            <stop offset="25%" stopColor="#34D399" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#A7F3D0" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#34D399" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="topBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D1FAE5" />
            <stop offset="100%" stopColor="#6EE7B7" />
          </linearGradient>
        </defs>

        {/* Cylinder Body Projection */}
        <path
          d={`
            M ${centerX - rx} ${topY}
            L ${centerX - rx} ${botY}
            A ${rx} ${ry} 0 0 0 ${centerX + rx} ${botY}
            L ${centerX + rx} ${topY}
            Z
          `}
          fill="url(#cylinderGrad)"
          stroke="#065F46"
          strokeWidth="1.8"
        />

        {/* Bottom Base - Back Arc (Hidden dashed line) */}
        <path
          d={`M ${centerX - rx} ${botY} A ${rx} ${ry} 0 0 1 ${centerX + rx} ${botY}`}
          fill="none"
          stroke="#065F46"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Bottom Base - Front Arc (Solid line) */}
        <path
          d={`M ${centerX - rx} ${botY} A ${rx} ${ry} 0 0 0 ${centerX + rx} ${botY}`}
          fill="none"
          stroke="#065F46"
          strokeWidth="2"
        />

        {/* Top Base (Solid visible ellipse) */}
        <ellipse
          cx={centerX}
          cy={topY}
          rx={rx}
          ry={ry}
          fill="url(#topBaseGrad)"
          stroke="#065F46"
          strokeWidth="2"
        />

        {/* Center Axis Line OO' (Dashed) */}
        <line
          x1={centerX}
          y1={topY}
          x2={centerX}
          y2={botY}
          stroke="#047857"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />

        {/* Centers O and O' */}
        <circle cx={centerX} cy={topY} r="2.5" fill="#065F46" />
        <text x={centerX - 12} y={topY - 4} fontSize="11" fontWeight="bold" fill="#065F46">
          O'
        </text>

        <circle cx={centerX} cy={botY} r="2.5" fill="#065F46" />
        <text x={centerX - 12} y={botY + 12} fontSize="11" fontWeight="bold" fill="#065F46">
          O
        </text>

        {/* Radius dimension line on top base */}
        <line
          x1={centerX}
          y1={topY}
          x2={centerX + rx}
          y2={topY}
          stroke="#B91C1C"
          strokeWidth="1.5"
          markerEnd="url(#arrowRed)"
        />
        <text
          x={centerX + rx / 2}
          y={topY - 6}
          fontSize="11"
          fontWeight="bold"
          fill="#B91C1C"
          textAnchor="middle"
        >
          r = {radius}cm
        </text>

        {/* Height dimension line on left */}
        <line
          x1={centerX - rx - 18}
          y1={topY}
          x2={centerX - rx - 18}
          y2={botY}
          stroke="#1E40AF"
          strokeWidth="1.5"
        />
        <line
          x1={centerX - rx - 24}
          y1={topY}
          x2={centerX - rx - 12}
          y2={topY}
          stroke="#1E40AF"
          strokeWidth="1.2"
        />
        <line
          x1={centerX - rx - 24}
          y1={botY}
          x2={centerX - rx - 12}
          y2={botY}
          stroke="#1E40AF"
          strokeWidth="1.2"
        />
        <text
          x={centerX - rx - 24}
          y={centerY + 4}
          fontSize="11"
          fontWeight="bold"
          fill="#1E40AF"
          textAnchor="end"
        >
          h = {height}cm
        </text>
      </svg>
    );
  } else if (shape === 'cone') {
    const rx = scaleR;
    const ry = scaleR * 0.35;
    const apexY = centerY - scaleH / 2;
    const botY = centerY + scaleH / 2;

    return (
      <svg
        viewBox={`0 0 ${width} ${canvasHeight}`}
        className="w-full max-w-[340px] h-[260px] drop-shadow-md select-none"
      >
        <defs>
          {/* 3D Cone gradient */}
          <linearGradient id="coneGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0.85" />
            <stop offset="30%" stopColor="#FBBF24" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#FEF3C7" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#F59E0B" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Cone Triangular Projection with Curved Base */}
        <path
          d={`
            M ${centerX} ${apexY}
            L ${centerX - rx} ${botY}
            A ${rx} ${ry} 0 0 0 ${centerX + rx} ${botY}
            Z
          `}
          fill="url(#coneGrad)"
          stroke="#92400E"
          strokeWidth="1.8"
        />

        {/* Base Ellipse - Back Arc (Hidden dashed line) */}
        <path
          d={`M ${centerX - rx} ${botY} A ${rx} ${ry} 0 0 1 ${centerX + rx} ${botY}`}
          fill="none"
          stroke="#92400E"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Base Ellipse - Front Arc (Solid line) */}
        <path
          d={`M ${centerX - rx} ${botY} A ${rx} ${ry} 0 0 0 ${centerX + rx} ${botY}`}
          fill="none"
          stroke="#92400E"
          strokeWidth="2"
        />

        {/* Height Axis SO (Dashed) */}
        <line
          x1={centerX}
          y1={apexY}
          x2={centerX}
          y2={botY}
          stroke="#78350F"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Radius Vector OA (Dashed) */}
        <line
          x1={centerX}
          y1={botY}
          x2={centerX + rx}
          y2={botY}
          stroke="#B91C1C"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Right-angle Symbol at O */}
        <path
          d={`M ${centerX + 8} ${botY} L ${centerX + 8} ${botY - 8} L ${centerX} ${botY - 8}`}
          fill="none"
          stroke="#78350F"
          strokeWidth="1.2"
        />

        {/* Labeled Points: S, O, A */}
        <circle cx={centerX} cy={apexY} r="3" fill="#78350F" />
        <text x={centerX} y={apexY - 6} fontSize="12" fontWeight="bold" fill="#78350F" textAnchor="middle">
          S (Đỉnh)
        </text>

        <circle cx={centerX} cy={botY} r="2.5" fill="#78350F" />
        <text x={centerX - 10} y={botY + 12} fontSize="11" fontWeight="bold" fill="#78350F">
          O
        </text>

        <circle cx={centerX + rx} cy={botY} r="2.5" fill="#78350F" />
        <text x={centerX + rx + 8} y={botY + 4} fontSize="11" fontWeight="bold" fill="#78350F">
          A
        </text>

        {/* Radius label */}
        <text
          x={centerX + rx / 2}
          y={botY - 5}
          fontSize="11"
          fontWeight="bold"
          fill="#B91C1C"
          textAnchor="middle"
        >
          r = {radius}cm
        </text>

        {/* Height label */}
        <text
          x={centerX - 10}
          y={centerY}
          fontSize="11"
          fontWeight="bold"
          fill="#78350F"
          textAnchor="end"
        >
          h = {height}cm
        </text>

        {/* Slant Height ℓ label */}
        <text
          x={centerX + rx / 2 + 16}
          y={centerY - 8}
          fontSize="11"
          fontWeight="bold"
          fill="#047857"
          textAnchor="start"
        >
          ℓ = {l.toFixed(1)}cm
        </text>
      </svg>
    );
  } else {
    // Sphere SVG Projection
    const r = scaleR * 1.05;
    const ry = r * 0.32;

    return (
      <svg
        viewBox={`0 0 ${width} ${canvasHeight}`}
        className="w-full max-w-[340px] h-[260px] drop-shadow-md select-none"
      >
        <defs>
          {/* 3D Sphere Radial Gradient */}
          <radialGradient id="sphereGrad" cx="38%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="35%" stopColor="#38BDF8" />
            <stop offset="70%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </radialGradient>
        </defs>

        {/* Sphere Outer Boundary */}
        <circle
          cx={centerX}
          cy={centerY}
          r={r}
          fill="url(#sphereGrad)"
          stroke="#075985"
          strokeWidth="2"
        />

        {/* Equator / Great Circle Ellipse (Back dashed arc) */}
        <path
          d={`M ${centerX - r} ${centerY} A ${r} ${ry} 0 0 1 ${centerX + r} ${centerY}`}
          fill="none"
          stroke="#BAE6FD"
          strokeWidth="1.8"
          strokeDasharray="4 4"
        />

        {/* Equator / Great Circle Ellipse (Front solid arc) */}
        <path
          d={`M ${centerX - r} ${centerY} A ${r} ${ry} 0 0 0 ${centerX + r} ${centerY}`}
          fill="none"
          stroke="#BAE6FD"
          strokeWidth="2"
        />

        {/* Center Point O */}
        <circle cx={centerX} cy={centerY} r="3" fill="#FFFFFF" />
        <text x={centerX - 12} y={centerY - 4} fontSize="12" fontWeight="bold" fill="#FFFFFF">
          O
        </text>

        {/* Radius R Vector to Equator */}
        <line
          x1={centerX}
          y1={centerY}
          x2={centerX + r}
          y2={centerY}
          stroke="#FFFFFF"
          strokeWidth="2"
        />
        <circle cx={centerX + r} cy={centerY} r="2.5" fill="#FFFFFF" />
        <text
          x={centerX + r / 2}
          y={centerY - 8}
          fontSize="11"
          fontWeight="bold"
          fill="#FFFFFF"
          textAnchor="middle"
        >
          R = {radius}cm
        </text>

        {/* Great Circle Tag */}
        <text
          x={centerX}
          y={centerY + ry + 16}
          fontSize="10"
          fontWeight="bold"
          fill="#E0F2FE"
          textAnchor="middle"
        >
          (Đường tròn lớn qua tâm: S = πR²)
        </text>
      </svg>
    );
  }
};
