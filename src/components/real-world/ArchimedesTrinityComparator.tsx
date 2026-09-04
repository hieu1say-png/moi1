/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BẢN ĐỒ TỶ LỆ VÀNG ARCHIMEDES (ARCHIMEDES TRINITY COMPARATOR)
 * The legendary Archimedean Ratio:
 * Cone : Sphere : Cylinder = 1 : 2 : 3
 * Given:
 * - Cylinder with radius R, height H = 2R: V_cylinder = π * R² * (2R) = 2πR³ (3 units)
 * - Inscribed Sphere with radius R: V_sphere = (4/3)πR³ = (2/3) * (2πR³) (2 units)
 * - Inscribed Cone with radius R, height H = 2R: V_cone = (1/3)πR² * (2R) = (2/3)πR³ (1 unit)
 * Ratio: V_cone : V_sphere : V_cylinder = 1 : 2 : 3
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MathFormula, MathText } from '../common/MathFormula';
import { Button } from '../common/Button';
import {
  Sparkles,
  Award,
  Layers,
  CheckCircle2,
  Droplets,
  Zap,
  Info,
  ChevronRight
} from 'lucide-react';

export const ArchimedesTrinityComparator: React.FC = () => {
  const [radiusR, setRadiusR] = useState<number>(5); // cm
  const [activeWaterPourStage, setActiveWaterPourStage] = useState<number>(0); // 0: initial, 1: cone poured, 2: sphere poured, 3: full cylinder

  // Calculations
  const heightH = 2 * radiusR;
  const vCone = (1 / 3) * Math.PI * radiusR * radiusR * heightH; // (2/3)πR³
  const vSphere = (4 / 3) * Math.PI * Math.pow(radiusR, 3); // (4/3)πR³
  const vCylinder = Math.PI * radiusR * radiusR * heightH; // 2πR³

  // Base unit volume (V_cone)
  const unitV = vCone;

  return (
    <div className="bg-[#FFFDF8] border-2 border-black rounded-3xl p-5 sm:p-7 shadow-[4px_4px_0px_#000] space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 border border-purple-400 text-purple-900 text-xs font-black uppercase">
              Định Lý Vĩ Đại Của Nhân Loại
            </span>
            <span className="text-xs text-slate-500 font-bold">Hy Lạp Cổ Đại (287 - 212 TCN)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 flex items-center gap-2">
            ⚖️ Bản Đồ Tỷ Lệ Vàng Archimedes (1 : 2 : 3)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Phát hiện vĩ đại nhất đời của nhà bác học Archimedes (được khắc trang trọng trên bia mộ của ông): Khi nội tiếp <b>Hình Nón</b> và <b>Hình Cầu</b> vào trong <b>Hình Trụ</b> (cùng bán kính $R$ và chiều cao $h = 2R$), tỷ lệ thể tích chuẩn xác tuyệt đối là:
          </p>
        </div>

        {/* Ratio Display Badge */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-900 to-purple-900 text-white rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000]">
          <span className="text-xs font-bold text-amber-300">Tỷ lệ vàng:</span>
          <span className="text-lg font-black tracking-wider text-white font-mono">
            V_nón : V_cầu : V_trụ = 1 : 2 : 3
          </span>
        </div>
      </div>

      {/* Interactive Trinity Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* 1. Hình Nón */}
        <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-2xs flex flex-col items-center justify-between relative overflow-hidden">
          <div className="w-full flex items-center justify-between">
            <span className="px-2 py-0.5 bg-amber-100 border border-amber-300 rounded text-[11px] font-black text-amber-900">
              1 PHẦN THỂ TÍCH
            </span>
            <span className="font-mono text-xs font-bold text-slate-500">
              {vCone.toFixed(1)} cm³
            </span>
          </div>

          {/* Graphic */}
          <div className="h-44 w-full flex items-center justify-center my-3">
            <svg viewBox="0 0 160 160" className="h-full">
              {/* Cone Silhouette */}
              <path d="M 80 20 L 25 130 A 55 18 0 0 0 135 130 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
              <ellipse cx="80" cy="130" rx="55" ry="18" fill="none" stroke="#b45309" strokeWidth="2" />
              <line x1="80" y1="20" x2="80" y2="130" stroke="#b45309" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="80" y1="130" x2="135" y2="130" stroke="#b45309" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="70" y="15" fill="#0f172a" fontSize="11" fontWeight="bold">S</text>
              <text x="85" y="80" fill="#b45309" fontSize="10">h = 2R</text>
              <text x="95" y="142" fill="#b45309" fontSize="10">R</text>
            </svg>
          </div>

          <div className="w-full text-center space-y-1">
            <h4 className="font-black text-slate-900 text-sm">1. Hình Nón (Cone)</h4>
            <div className="text-xs font-mono text-amber-800 font-bold bg-amber-50 p-2 rounded-xl border border-amber-200">
              <MathFormula formula="V_{\text{nón}} = \frac{1}{3}\pi R^2 (2R) = \frac{2}{3}\pi R^3" />
            </div>
          </div>
        </div>

        {/* 2. Hình Cầu */}
        <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-2xs flex flex-col items-center justify-between relative overflow-hidden">
          <div className="w-full flex items-center justify-between">
            <span className="px-2 py-0.5 bg-blue-100 border border-blue-300 rounded text-[11px] font-black text-blue-900">
              2 PHẦN THỂ TÍCH
            </span>
            <span className="font-mono text-xs font-bold text-slate-500">
              {vSphere.toFixed(1)} cm³
            </span>
          </div>

          {/* Graphic */}
          <div className="h-44 w-full flex items-center justify-center my-3">
            <svg viewBox="0 0 160 160" className="h-full">
              {/* Sphere Outer */}
              <circle cx="80" cy="80" r="55" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
              {/* Equator */}
              <ellipse cx="80" cy="80" rx="55" ry="18" fill="none" stroke="#1d4ed8" strokeWidth="1.5" strokeDasharray="3,3" />
              <path d="M 25 80 A 55 18 0 0 0 135 80" fill="none" stroke="#1d4ed8" strokeWidth="2" />
              <line x1="80" y1="80" x2="135" y2="80" stroke="#1d4ed8" strokeWidth="1.5" strokeDasharray="3,3" />
              <circle cx="80" cy="80" r="3" fill="#1d4ed8" />
              <text x="100" y="75" fill="#1d4ed8" fontSize="10">R</text>
              <text x="68" y="85" fill="#1d4ed8" fontSize="10">O</text>
            </svg>
          </div>

          <div className="w-full text-center space-y-1">
            <h4 className="font-black text-slate-900 text-sm">2. Hình Cầu (Sphere)</h4>
            <div className="text-xs font-mono text-blue-800 font-bold bg-blue-50 p-2 rounded-xl border border-blue-200">
              <MathFormula formula="V_{\text{cầu}} = \frac{4}{3}\pi R^3 = 2 \times V_{\text{nón}}" />
            </div>
          </div>
        </div>

        {/* 3. Hình Trụ Ngoại Tiếp */}
        <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-2xs flex flex-col items-center justify-between relative overflow-hidden">
          <div className="w-full flex items-center justify-between">
            <span className="px-2 py-0.5 bg-emerald-100 border border-emerald-300 rounded text-[11px] font-black text-emerald-900">
              3 PHẦN THỂ TÍCH
            </span>
            <span className="font-mono text-xs font-bold text-slate-500">
              {vCylinder.toFixed(1)} cm³
            </span>
          </div>

          {/* Graphic */}
          <div className="h-44 w-full flex items-center justify-center my-3">
            <svg viewBox="0 0 160 160" className="h-full">
              {/* Cylinder Outline */}
              <ellipse cx="80" cy="25" rx="55" ry="18" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
              <line x1="25" y1="25" x2="25" y2="135" stroke="#059669" strokeWidth="2" />
              <line x1="135" y1="25" x2="135" y2="135" stroke="#059669" strokeWidth="2" />
              <ellipse cx="80" cy="135" rx="55" ry="18" fill="none" stroke="#059669" strokeWidth="1.5" strokeDasharray="3,3" />
              <path d="M 25 135 A 55 18 0 0 0 135 135" fill="none" stroke="#059669" strokeWidth="2" />
              <line x1="80" y1="25" x2="80" y2="135" stroke="#059669" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="85" y="80" fill="#047857" fontSize="10">h = 2R</text>
            </svg>
          </div>

          <div className="w-full text-center space-y-1">
            <h4 className="font-black text-slate-900 text-sm">3. Hình Trụ Ngoại Tiếp (Cylinder)</h4>
            <div className="text-xs font-mono text-emerald-800 font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-200">
              <MathFormula formula="V_{\text{trụ}} = \pi R^2 (2R) = 2\pi R^3 = 3 \times V_{\text{nón}}" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Water Pouring Experiment Verification */}
      <div className="bg-slate-900 text-white border-2 border-black rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-black text-white">Thí Nghiệm Thực Chứng Nước Rót Rỗng (Archimedean Water Fill):</h3>
          </div>
          <div className="text-xs text-slate-300 font-mono">
            Bán kính thí nghiệm: <b>R = {radiusR} cm</b>
          </div>
        </div>

        {/* Visual Water Fill Bar */}
        <div className="w-full bg-slate-800 h-8 rounded-xl border border-slate-700 p-1 flex items-center relative overflow-hidden">
          {/* Segment 1: Cone (1/3) */}
          <div className="w-1/3 h-full bg-amber-500 rounded-l-lg flex items-center justify-center text-[10px] font-black text-amber-950 border-r border-slate-900">
            1/3 V (Nón)
          </div>
          {/* Segment 2 & 3: Sphere (2/3) */}
          <div className="w-2/3 h-full bg-cyan-500 rounded-r-lg flex items-center justify-center text-[10px] font-black text-cyan-950">
            2/3 V (Cầu)
          </div>
        </div>

        <div className="text-xs text-slate-300 leading-relaxed">
          💡 <b>Kết luận:</b> Nếu đổ đầy nước vào 1 hình nón và 1 hình cầu có cùng bán kính $R$ và chiều cao $h = 2R$, rồi trút toàn bộ vào hình trụ ngoại tiếp, nước sẽ <b>vừa vặn dâng đầy 100% hình trụ</b> mà không bị thiếu hay tràn một giọt nào!
        </div>
      </div>
    </div>
  );
};
