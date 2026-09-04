/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShapeType } from '../../types';
import { SHAPES_DATA } from '../../data/geometryData';
import { SHAPE_COMPONENTS } from './ComponentSelector';
import { MathFormula, MathText } from '../common/MathFormula';
import { Sparkles, Sliders, ChevronDown, ChevronUp, Calculator, BookOpen, Lightbulb, TrendingUp } from 'lucide-react';

export interface InfoPanelProps {
  shape: ShapeType;
  activeComponentId: string;
  radius: number;
  height: number;
  onRadiusChange: (r: number) => void;
  onHeightChange: (h: number) => void;
  onSelectComponent?: (componentId: string) => void;
  calculations: {
    slantHeight: number | string;
    sxq: string;
    stp: string;
    v: string;
    baseArea: string;
    sxqPi: string;
    vPi: string;
  };
  className?: string;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({
  shape,
  activeComponentId,
  radius,
  height,
  onRadiusChange,
  onHeightChange,
  onSelectComponent,
  calculations,
  className = ''
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const shapeData = SHAPES_DATA[shape] || SHAPES_DATA.cylinder;

  const currentComponent =
    SHAPE_COMPONENTS[shape]?.find((c) => c.id === activeComponentId) ||
    SHAPE_COMPONENTS[shape]?.[0];

  return (
    <div
      id="explore-info-panel"
      className={`bg-[#FFFDF8]/95 backdrop-blur-md rounded-[20px] border border-[#E5DCCF] shadow-lg text-[#3A302B] overflow-hidden transition-all duration-200 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3.5 bg-[#F4EEE4] border-b border-[#E5DCCF] select-none">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#FDF0ED] text-[#8F3E32] flex items-center justify-center border border-[#F4D2CA]">
            <Calculator className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#3A302B]">
              Thông Số &amp; Kết Quả Tính
            </h3>
            <span className="text-[10px] text-[#766A61] font-mono block">
              {shapeData.vietnameseName} (Toán 9)
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-[#EAE0D3] text-[#766A61] hover:text-[#3A302B] transition-colors cursor-pointer"
          title={isCollapsed ? 'Mở rộng bảng thông số' : 'Thu gọn bảng thông số'}
          aria-label={isCollapsed ? 'Mở rộng bảng' : 'Thu gọn bảng'}
        >
          {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {!isCollapsed && (
        <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Active Component Focus Banner with Grade 9 Standard Notation */}
          {currentComponent && (
            <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E5DCCF] space-y-1.5 animate-fadeIn">
              <div className="flex items-center justify-between text-xs font-bold text-[#3A302B]">
                <span className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${currentComponent.color}`} />
                  {currentComponent.name}
                </span>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-[#FFFDF8] border border-[#E5DCCF] text-[#8F3E32] font-bold">
                  {currentComponent.symbol}
                </span>
              </div>
              <p className="text-[11px] text-[#594D46] leading-relaxed font-medium">
                {currentComponent.description}
              </p>
              <div className="text-[10px] font-mono text-[#7A571B] pt-0.5 border-t border-[#E5DCCF]">
                {currentComponent.details}
              </div>
            </div>
          )}

          {/* Standard Notation Reference Box */}
          <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DCCF] text-[11px] space-y-1 text-[#594D46]">
            <div className="font-serif font-bold text-[#3A302B] text-[10px] uppercase flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-[#ED806F]" />
              <span>Ký hiệu Chuẩn Toán 9:</span>
            </div>
            {shape === 'sphere' ? (
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 font-mono text-[10px]">
                <div><strong className="text-[#8F3E32]">O</strong>: Tâm hình cầu</div>
                <div><strong className="text-[#4D6B42]">R</strong>: Bán kính ({radius}cm)</div>
                <div><strong className="text-[#0284c7]">d = 2R</strong>: Đường kính ({radius * 2}cm)</div>
                <div><strong className="text-[#634796]">C = 2πR</strong>: Chu vi xích đạo</div>
                <div><strong className="text-[#8F3E32]">S = 4πR²</strong>: Diện tích mặt cầu</div>
                <div><strong className="text-[#4D6B42]">V = 4/3 πR³</strong>: Thể tích khối cầu</div>
              </div>
            ) : shape === 'cone' ? (
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 font-mono text-[10px]">
                <div><strong className="text-[#8F3E32]">S</strong>: Đỉnh nón</div>
                <div><strong className="text-[#8F3E32]">O</strong>: Tâm đáy</div>
                <div><strong className="text-[#4D6B42]">r = OA</strong>: Bán kính ({radius}cm)</div>
                <div><strong className="text-[#7A571B]">h = SO</strong>: Chiều cao ({height}cm)</div>
                <div><strong className="text-[#634796]">l = SA</strong>: Đường sinh ({calculations.slantHeight}cm)</div>
                <div><strong className="text-[#4D6B42]">d = 2r</strong>: Đường kính ({radius * 2}cm)</div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 font-mono text-[10px]">
                <div><strong className="text-[#8F3E32]">O</strong>: Tâm đáy dưới</div>
                <div><strong className="text-[#8F3E32]">O'</strong>: Tâm đáy trên</div>
                <div><strong className="text-[#4D6B42]">r</strong>: Bán kính ({radius}cm)</div>
                <div><strong className="text-[#4D6B42]">d = 2r</strong>: Đường kính ({radius * 2}cm)</div>
                <div><strong className="text-[#7A571B]">h = OO'</strong>: Chiều cao ({height}cm)</div>
                <div><strong className="text-[#634796]">l = AA'</strong>: Đường sinh ({height}cm)</div>
              </div>
            )}
          </div>

          {/* Parameter Sliders */}
          <div className="space-y-3 pt-1 border-t border-[#E5DCCF]">
            <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#3A302B]">
              <Sliders className="w-3.5 h-3.5 text-[#ED806F]" />
              <span>
                {shape === 'sphere' ? 'Điều Chỉnh Kích Thước (Bán kính R)' : 'Điều Chỉnh Kích Thước (r, h)'}
              </span>
            </div>

            {/* Radius Slider */}
            <div
              className={`p-2.5 rounded-xl border transition-all ${
                activeComponentId === 'radius' || activeComponentId === 'base'
                  ? 'bg-[#EBF2E8] border-[#9FB596] ring-1 ring-[#9FB596]'
                  : 'bg-[#FAF7F2] border-[#E5DCCF]'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-[#766A61] font-medium cursor-pointer" onClick={() => onSelectComponent?.('radius')}>
                  {shape === 'sphere' ? 'Bán kính mặt cầu (R = OA)' : 'Bán kính đáy (r = OA)'}
                </span>
                <span className="font-mono font-bold text-[#4D6B42] bg-[#FFFDF8] px-2 py-0.5 rounded border border-[#E5DCCF]">
                  {radius} cm
                </span>
              </div>
              <input
                type="range"
                min={shape === 'cone' ? 0.5 : 1}
                max={shape === 'cone' ? 5 : 10}
                step={0.1}
                value={radius}
                onChange={(e) => onRadiusChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-[#EAE0D3] rounded-lg appearance-none cursor-pointer accent-[#9FB596]"
              />
              <div className="flex justify-between text-[9px] text-[#766A61] font-mono mt-0.5">
                <span>min: {shape === 'cone' ? '0.5' : '1'}cm</span>
                <span>max: {shape === 'cone' ? '5.0' : '10'}cm</span>
              </div>
            </div>

            {/* Height Slider */}
            {shape !== 'sphere' && (
              <div
                className={`p-2.5 rounded-xl border transition-all ${
                  activeComponentId === 'height' ||
                  activeComponentId === 'generator' ||
                  activeComponentId === 'axis'
                    ? 'bg-[#FFF7F4] border-[#E07A5F] ring-1 ring-[#E07A5F]'
                    : 'bg-[#FAF7F2] border-[#E5DCCF]'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#766A61] font-medium cursor-pointer" onClick={() => onSelectComponent?.('height')}>
                    {shape === 'cone' ? 'Chiều cao hình nón (h = SO)' : 'Chiều cao trục (h = l = OO\')'}
                  </span>
                  <span className="font-mono font-bold text-[#8A3B22] bg-[#FFFDF8] px-2 py-0.5 rounded border border-[#E5DCCF]">
                    {height} cm
                  </span>
                </div>
                <input
                  type="range"
                  min={shape === 'cone' ? 1 : 2}
                  max={shape === 'cone' ? 8 : 15}
                  step={0.1}
                  value={height}
                  onChange={(e) => onHeightChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-[#EAE0D3] rounded-lg appearance-none cursor-pointer accent-[#E07A5F]"
                />
                <div className="flex justify-between text-[9px] text-[#766A61] font-mono mt-0.5">
                  <span>min: {shape === 'cone' ? '1.0' : '2'}cm</span>
                  <span>max: {shape === 'cone' ? '8.0' : '15'}cm</span>
                </div>
              </div>
            )}
          </div>

          {/* Real-time Calculation Results Grid */}
          <div className="space-y-2 pt-1 border-t border-[#E5DCCF]">
            <div className="flex items-center justify-between text-xs font-serif font-bold text-[#3A302B]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D7A85D]" />
                <span>Kết Quả Tính Toán Tức Thì</span>
              </span>
              <span className="text-[10px] text-[#766A61] font-mono">π ≈ 3.1416</span>
            </div>

            {/* SPHERE CALCULATION CARDS */}
            {shape === 'sphere' ? (
              <div className="grid grid-cols-2 gap-2">
                {/* Thể tích V khối cầu */}
                <div className="p-2.5 rounded-xl bg-[#FDF0ED] border border-[#F4D2CA] shadow-2xs">
                  <div className="text-[10px] text-[#8F3E32] uppercase font-bold">
                    <MathText text="$V = \frac{4}{3}\pi R^3$" />
                  </div>
                  <div className="text-sm font-mono font-bold text-[#8F3E32] mt-0.5">
                    {calculations.v} <span className="text-[10px] font-sans font-normal text-[#766A61]">cm³</span>
                  </div>
                  <div className="text-[10px] text-[#766A61] font-mono">
                    = {calculations.vPi}π
                  </div>
                </div>

                {/* Diện tích mặt cầu */}
                <div
                  className={`p-2.5 rounded-xl border transition-all ${
                    activeComponentId === 'radius' || activeComponentId === 'all'
                      ? 'bg-[#EBF2E8] border-[#9FB596] ring-1 ring-[#9FB596]'
                      : 'bg-[#FAF7F2] border-[#E5DCCF]'
                  }`}
                >
                  <div className="text-[10px] text-[#4D6B42] uppercase font-bold">
                    <MathText text="$S = 4\pi R^2$" />
                  </div>
                  <div className="text-sm font-mono font-bold text-[#4D6B42] mt-0.5">
                    {calculations.sxq} <span className="text-[10px] font-sans font-normal text-[#766A61]">cm²</span>
                  </div>
                  <div className="text-[10px] text-[#766A61] font-mono">
                    = {calculations.sxqPi}π
                  </div>
                </div>

                {/* Đường kính d = 2R */}
                <div
                  className={`p-2.5 rounded-xl border transition-all ${
                    activeComponentId === 'height' || activeComponentId === 'diameter'
                      ? 'bg-[#E0F2FE] border-[#7DD3FC] ring-1 ring-[#0284c7]'
                      : 'bg-[#FAF7F2] border-[#E5DCCF]'
                  }`}
                >
                  <div className="text-[10px] text-[#0284c7] uppercase font-bold">
                    <MathText text="$d = 2R$" />
                  </div>
                  <div className="text-sm font-mono font-bold text-[#0284c7] mt-0.5">
                    {radius * 2} <span className="text-[10px] font-sans font-normal text-[#766A61]">cm</span>
                  </div>
                  <div className="text-[10px] text-[#766A61] font-mono">
                    d = 2 × {radius}
                  </div>
                </div>

                {/* Thiết diện lớn nhất */}
                <div
                  className={`p-2.5 rounded-xl border transition-all ${
                    activeComponentId === 'base'
                      ? 'bg-[#FAF7FD] border-[#DFD2F0] ring-1 ring-[#B7A2D6]'
                      : 'bg-[#FAF7F2] border-[#E5DCCF]'
                  }`}
                >
                  <div className="text-[10px] text-[#634796] uppercase font-bold">
                    <MathText text="$S_{\text{đáy}} = \pi R^2$" />
                  </div>
                  <div className="text-sm font-mono font-bold text-[#634796] mt-0.5">
                    {calculations.baseArea} <span className="text-[10px] font-sans font-normal text-[#766A61]">cm²</span>
                  </div>
                  <div className="text-[10px] text-[#766A61] font-mono">
                    = {(radius * radius).toFixed(1)}π
                  </div>
                </div>
              </div>
            ) : shape === 'cone' ? (
              /* CONE FORMULA PANEL: 4 DEDICATED CARDS (l, Sxq, Stp, V) */
              <div className="grid grid-cols-2 gap-2">
                {/* 1. Đường sinh l = √(r² + h²) */}
                <div
                  onClick={() => onSelectComponent?.('generator')}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    activeComponentId === 'generator'
                      ? 'bg-[#FAF5FF] border-[#C084FC] ring-2 ring-[#C084FC]/30 shadow-xs scale-[1.02]'
                      : 'bg-[#FAF7F2] border-[#E5DCCF] hover:border-[#C084FC] hover:bg-[#FAF5FF]/70'
                  }`}
                >
                  <div className="text-[10px] text-[#6B21A8] font-bold">
                    <MathText text="$l = \sqrt{r^2+h^2}$" />
                  </div>
                  <div className="text-sm font-mono font-bold text-[#6B21A8] mt-0.5">
                    {calculations.slantHeight} <span className="text-[10px] font-sans font-normal text-[#766A61]">cm</span>
                  </div>
                  <div className="text-[10px] text-[#766A61] font-mono">
                    <MathText text={`$\\sqrt{${radius}^2+${height}^2}$`} />
                  </div>
                </div>

                {/* 2. Diện tích xung quanh Sxq = πrl */}
                <div
                  onClick={() => onSelectComponent?.('generator')}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    activeComponentId === 'lateral_surface' || activeComponentId === 'generator'
                      ? 'bg-[#FFF7F4] border-[#E07A5F] ring-2 ring-[#E07A5F]/30 shadow-xs scale-[1.02]'
                      : 'bg-[#FAF7F2] border-[#E5DCCF] hover:border-[#E07A5F] hover:bg-[#FFF7F4]/70'
                  }`}
                >
                  <div className="text-[10px] text-[#8A3B22] font-bold">
                    <MathText text="$S_{xq} = \pi rl$" />
                  </div>
                  <div className="text-sm font-mono font-bold text-[#8A3B22] mt-0.5">
                    {calculations.sxq} <span className="text-[10px] font-sans font-normal text-[#766A61]">cm²</span>
                  </div>
                  <div className="text-[10px] text-[#766A61] font-mono">
                    = {calculations.sxqPi}π
                  </div>
                </div>

                {/* 3. Diện tích toàn phần Stp = πrl + πr² */}
                <div
                  onClick={() => onSelectComponent?.('all')}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    activeComponentId === 'all'
                      ? 'bg-[#EBF2E8] border-[#9FB596] ring-2 ring-[#9FB596]/30 shadow-xs'
                      : 'bg-[#FAF7F2] border-[#E5DCCF] hover:border-[#9FB596] hover:bg-[#EBF2E8]/70'
                  }`}
                >
                  <div className="text-[10px] text-[#4D6B42] font-bold">
                    <MathText text="$S_{tp} = \pi rl+\pi r^2$" />
                  </div>
                  <div className="text-sm font-mono font-bold text-[#4D6B42] mt-0.5">
                    {calculations.stp} <span className="text-[10px] font-sans font-normal text-[#766A61]">cm²</span>
                  </div>
                  <div className="text-[10px] text-[#766A61] font-mono">
                    <MathText text={`$S_{xq} + S_{\\text{đáy}}$`} />
                  </div>
                </div>

                {/* 4. Thể tích V = 1/3 πr²h */}
                <div
                  onClick={() => onSelectComponent?.('all')}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    activeComponentId === 'all'
                      ? 'bg-[#FDF0ED] border-[#F4D2CA] ring-2 ring-[#F4D2CA]/40 shadow-xs'
                      : 'bg-[#FAF7F2] border-[#E5DCCF] hover:border-[#F4D2CA] hover:bg-[#FDF0ED]/70'
                  }`}
                >
                  <div className="text-[10px] text-[#8F3E32] font-bold">
                    <MathText text="$V = \frac{1}{3}\pi r^2h$" />
                  </div>
                  <div className="text-sm font-mono font-bold text-[#8F3E32] mt-0.5">
                    {calculations.v} <span className="text-[10px] font-sans font-normal text-[#766A61]">cm³</span>
                  </div>
                  <div className="text-[10px] text-[#766A61] font-mono">
                    = {calculations.vPi}π
                  </div>
                </div>
              </div>
            ) : (
              /* CYLINDER CALCULATION CARDS */
              <div className="grid grid-cols-2 gap-2">
                {/* Thể tích V */}
                <div
                  onClick={() => onSelectComponent?.('all')}
                  className="p-2.5 rounded-xl bg-[#FDF0ED] border border-[#F4D2CA] shadow-2xs cursor-pointer hover:brightness-98"
                >
                  <div className="text-[10px] text-[#8F3E32] font-bold">
                    <MathText text="$V = \pi r^2h$" />
                  </div>
                  <div className="text-sm font-mono font-bold text-[#8F3E32] mt-0.5">
                    {calculations.v} <span className="text-[10px] font-sans font-normal text-[#766A61]">cm³</span>
                  </div>
                  <div className="text-[10px] text-[#766A61] font-mono">
                    = {calculations.vPi}π
                  </div>
                </div>

                {/* Diện tích xung quanh */}
                <div
                  onClick={() => onSelectComponent?.('lateral_surface')}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    activeComponentId === 'generator' || activeComponentId === 'lateral_surface'
                      ? 'bg-[#FFF7F4] border-[#E07A5F] ring-1 ring-[#E07A5F]'
                      : 'bg-[#FAF7F2] border-[#E5DCCF]'
                  }`}
                >
                  <div className="text-[10px] text-[#8A3B22] font-bold">
                    <MathText text="$S_{xq} = 2\pi rh$" />
                  </div>
                  <div className="text-sm font-mono font-bold text-[#8A3B22] mt-0.5">
                    {calculations.sxq} <span className="text-[10px] font-sans font-normal text-[#766A61]">cm²</span>
                  </div>
                  <div className="text-[10px] text-[#766A61] font-mono">
                    = {calculations.sxqPi}π
                  </div>
                </div>

                {/* Diện tích toàn phần */}
                <div
                  onClick={() => onSelectComponent?.('all')}
                  className="p-2.5 rounded-xl bg-[#EBF2E8] border border-[#D0DEC9] cursor-pointer hover:brightness-98"
                >
                  <div className="text-[10px] text-[#4D6B42] font-bold">
                    <MathText text="$S_{tp} = 2\pi rh + 2\pi r^2$" />
                  </div>
                  <div className="text-sm font-mono font-bold text-[#4D6B42] mt-0.5">
                    {calculations.stp} <span className="text-[10px] font-sans font-normal text-[#766A61]">cm²</span>
                  </div>
                  <div className="text-[10px] text-[#766A61] font-mono">
                    2πrh + 2πr²
                  </div>
                </div>

                {/* Diện tích 1 đáy */}
                <div
                  onClick={() => onSelectComponent?.('base')}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    activeComponentId === 'base'
                      ? 'bg-[#FAF7FD] border-[#DFD2F0] ring-1 ring-[#B7A2D6]'
                      : 'bg-[#FAF7F2] border-[#E5DCCF]'
                  }`}
                >
                  <div className="text-[10px] text-[#634796] font-bold">
                    <MathText text="$S_{\text{đáy}} = \pi r^2$" />
                  </div>
                  <div className="text-sm font-mono font-bold text-[#634796] mt-0.5">
                    {calculations.baseArea} <span className="text-[10px] font-sans font-normal text-[#766A61]">cm²</span>
                  </div>
                  <div className="text-[10px] text-[#766A61] font-mono">
                    = {(radius * radius).toFixed(1)}π
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Geometric Relation Tip Card */}
          <div className="p-2.5 rounded-xl bg-[#FAF7FD] border border-[#DFD2F0] text-[11px] space-y-1 text-[#594D46]">
            <div className="font-serif font-bold text-[#634796] flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-[#B7A2D6]" />
              <span>
                {shape === 'cone'
                  ? 'Mối liên hệ hình học trong Hình Nón'
                  : shape === 'sphere'
                  ? 'Ghi nhớ: Bản chất mặt cầu & khối cầu'
                  : "Ghi nhớ: Hình trụ luôn có l = h"}
              </span>
            </div>
            <div className="text-[10px] text-[#594D46] leading-relaxed">
              {shape === 'cone' ? (
                <div>
                  Trong tam giác vuông <strong className="text-[#8F3E32]">SOA</strong> vuông tại <strong className="text-[#8F3E32]">O</strong>, theo định lý Pytago ta luôn có quan hệ:{' '}
                  <span className="font-bold text-[#6B21A8]">
                    <MathText text="$l^2 = h^2 + r^2 \implies l = \sqrt{h^2 + r^2}$" />
                  </span>.
                </div>
              ) : shape === 'sphere' ? (
                <span>
                  Mặt cầu tâm O bán kính R là tập hợp các điểm trong không gian cách O một khoảng bằng R. Khối cầu gồm các điểm trên mặt cầu và bên trong mặt cầu.
                </span>
              ) : (
                <span>
                  Vì thiết diện qua trục là hình chữ nhật OO'BA, nên đường sinh AB luôn song song và bằng đúng chiều cao OO' (l = h).
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPanel;
