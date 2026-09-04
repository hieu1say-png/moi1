/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * COMPONENT SELECTOR FOR GEOMETRIC SHAPES
 * - Grade 9 Standard Geometry Elements:
 *   - [TẤT CẢ]: Overview of whole solid
 *   - [ĐÁY]: Base circles (Tâm O & O', bán kính r)
 *   - [r]: Bán kính đáy (Radius r = OA = O'A')
 *   - [h]: Chiều cao (Height h = OO')
 *   - [l]: Đường sinh (Generator line l = AA')
 *   - [TRỤC]: Trục hình trụ (Axis of revolution OO')
 *   - [MẶT XQ]: Mặt xung quanh (Lateral surface S_xq)
 */

import React from 'react';
import { ShapeType } from '../../types';
import { Layers, Circle, Ruler, ArrowUpDown, Compass, Disc, Sparkles } from 'lucide-react';

export interface ShapeComponentItem {
  id: string;
  name: string;
  shortLabel: string;
  symbol: string;
  description: string;
  details: string;
  color: string;
  badgeBg: string;
}

export const SHAPE_COMPONENTS: Record<ShapeType, ShapeComponentItem[]> = {
  cylinder: [
    {
      id: 'all',
      name: 'Toàn bộ khối',
      shortLabel: 'TẤT CẢ',
      symbol: 'V, S',
      description: 'Khối trụ hoàn chỉnh bao gồm 2 đáy tròn song song và mặt xung quanh.',
      details: 'Thể tích V = πr²h, Diện tích toàn phần Stp = 2πrh + 2πr².',
      color: 'bg-blue-500',
      badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
    },
    {
      id: 'base',
      name: 'Mặt đáy (2 đáy)',
      shortLabel: 'ĐÁY',
      symbol: 'S_đáy',
      description: 'Hai hình tròn bằng nhau nằm trong hai mặt phẳng song song (tâm O\' đáy trên, tâm O đáy dưới).',
      details: 'Diện tích một đáy: S_đáy = πr². Đường kính d = 2r. Chu vi đáy: C = 2πr.',
      color: 'bg-indigo-400',
      badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
    },
    {
      id: 'radius',
      name: 'Bán kính đáy',
      shortLabel: 'r',
      symbol: 'r = OA',
      description: 'Bán kính hình tròn đáy, khoảng cách từ tâm O (hoặc O\') đến một điểm A trên đường tròn.',
      details: 'Ký hiệu r hoặc OA, O\'A\'. Đường kính d = 2r. Chu vi C = 2πr.',
      color: 'bg-emerald-400',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    },
    {
      id: 'height',
      name: 'Chiều cao',
      shortLabel: 'h',
      symbol: 'h = OO\'',
      description: 'Khoảng cách vuông góc giữa hai mặt phẳng chứa hai đáy của hình trụ (độ dài đoạn thẳng OO\').',
      details: 'Trong hình trụ, chiều cao h bằng độ dài đường sinh l (h = l = OO\').',
      color: 'bg-amber-400',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    },
    {
      id: 'generator',
      name: 'Đường sinh',
      shortLabel: 'l',
      symbol: 'l = AA\'',
      description: 'Đoạn thẳng AA\' nằm trên mặt xung quanh, song song với trục OO\' và vuông góc với 2 đáy.',
      details: 'Khi quay đoạn thẳng AA\' một vòng quanh trục OO\' cố định, ta quét được mặt xung quanh. Độ dài: l = h.',
      color: 'bg-cyan-400',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
    },
    {
      id: 'axis',
      name: 'Trục hình trụ',
      shortLabel: 'TRỤC',
      symbol: 'OO\'',
      description: 'Đường thẳng cố định đi qua tâm O (đáy dưới) và tâm O\' (đáy trên).',
      details: 'Hình trụ được tạo thành khi quay hình chữ nhật quanh một cạnh cố định làm trục quay OO\'.',
      color: 'bg-amber-500',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    },
    {
      id: 'lateral_surface',
      name: 'Mặt xung quanh',
      shortLabel: 'MẶT XQ',
      symbol: 'S_xq',
      description: 'Bề mặt cong bao quanh hình trụ, khi trải phẳng ra mặt phẳng sẽ được một hình chữ nhật (2πr × h).',
      details: 'Diện tích xung quanh: S_xq = 2πrh.',
      color: 'bg-blue-400',
      badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
    }
  ],
  cone: [
    {
      id: 'all',
      name: 'Toàn bộ khối',
      shortLabel: 'TẤT CẢ',
      symbol: 'V, S',
      description: 'Khối nón hoàn chỉnh bao gồm đỉnh S, mặt xung quanh và đáy tròn.',
      details: 'Thể tích V = 1/3 πr²h. Diện tích toàn phần Stp = πrl + πr².',
      color: 'bg-orange-500',
      badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/40'
    },
    {
      id: 'base',
      name: 'Mặt đáy',
      shortLabel: 'ĐÁY',
      symbol: 'S_đáy',
      description: 'Hình tròn tâm O, bán kính r đối diện đỉnh S.',
      details: 'Diện tích đáy: S_đáy = πr². Chu vi đáy: C = 2πr.',
      color: 'bg-amber-500',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    },
    {
      id: 'radius',
      name: 'Bán kính đáy',
      shortLabel: 'r',
      symbol: 'r = OA',
      description: 'Bán kính hình tròn đáy của hình nón.',
      details: 'Đoạn nối tâm đáy O đến điểm A trên đường tròn đáy.',
      color: 'bg-emerald-400',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    },
    {
      id: 'height',
      name: 'Chiều cao',
      shortLabel: 'h',
      symbol: 'h = SO',
      description: 'Khoảng cách từ đỉnh S đến tâm O của hình tròn đáy (SO ⊥ đáy).',
      details: 'Trong tam giác vuông SOA: h² + r² = l².',
      color: 'bg-yellow-400',
      badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
    },
    {
      id: 'generator',
      name: 'Đường sinh',
      shortLabel: 'l',
      symbol: 'l = SA',
      description: 'Đoạn thẳng nối đỉnh S với một điểm A bất kỳ trên đường tròn đáy (l = √(h² + r²)).',
      details: 'Diện tích xung quanh nón: S_xq = πrl.',
      color: 'bg-orange-400',
      badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/40'
    },
    {
      id: 'axis',
      name: 'Trục hình nón',
      shortLabel: 'TRỤC',
      symbol: 'SO',
      description: 'Đường thẳng cố định đi qua đỉnh S và tâm O của mặt đáy.',
      details: 'Hình nón được tạo thành khi quay tam giác vuông quanh một cạnh góc vuông.',
      color: 'bg-amber-500',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    }
  ],
  sphere: [
    {
      id: 'all',
      name: 'Toàn bộ khối',
      shortLabel: 'TẤT CẢ',
      symbol: 'V, S',
      description: 'Khối cầu tâm O bán kính R bao gồm mặt cầu và tất cả các điểm bên trong.',
      details: 'Thể tích V = 4/3 πR³, Diện tích mặt cầu S = 4πR².',
      color: 'bg-emerald-500',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    },
    {
      id: 'radius',
      name: 'Bán kính',
      shortLabel: 'r (R)',
      symbol: 'R = OA',
      description: 'Khoảng cách từ tâm O tới bất kỳ điểm nào trên mặt cầu.',
      details: 'Mọi điểm trên mặt cầu đều cách đều tâm O một khoảng bằng R.',
      color: 'bg-teal-400',
      badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-500/40'
    },
    {
      id: 'height',
      name: 'Đường kính',
      shortLabel: 'd',
      symbol: 'd = 2R',
      description: 'Đoạn thẳng đi qua tâm O nối hai điểm trên mặt cầu.',
      details: 'Độ dài đường kính d = 2R. Diện tích S = πd².',
      color: 'bg-cyan-400',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
    },
    {
      id: 'base',
      name: 'Đường tròn lớn',
      shortLabel: 'TRÒN LỚN',
      symbol: 'S = πR²',
      description: 'Thiết diện khi cắt hình cầu bởi mặt phẳng đi qua tâm O.',
      details: 'Diện tích thiết diện lớn nhất: S = πR², chu vi C = 2πR.',
      color: 'bg-indigo-400',
      badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
    },
    {
      id: 'axis',
      name: 'Trục hình cầu',
      shortLabel: 'TRỤC',
      symbol: 'Trục quay',
      description: 'Đường thẳng đi qua tâm O. Khi quay nửa hình tròn quanh trục này ta được hình cầu.',
      details: 'Mặt cầu đối xứng hoàn hảo qua tâm O và mọi trục đi qua O.',
      color: 'bg-emerald-400',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    }
  ]
};

export interface ComponentSelectorProps {
  shape: ShapeType;
  activeComponentId: string;
  onSelectComponent: (componentId: string) => void;
  className?: string;
}

export const ComponentSelector: React.FC<ComponentSelectorProps> = ({
  shape,
  activeComponentId,
  onSelectComponent,
  className = ''
}) => {
  const components = SHAPE_COMPONENTS[shape] || SHAPE_COMPONENTS.cylinder;
  const activeComponent =
    components.find((c) => c.id === activeComponentId) || components[0];

  return (
    <div
      id="explore-component-selector"
      className={`bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-sm text-gray-800 space-y-3 ${className}`}
    >
      {/* Header with Title & Active Component Hint */}
      <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
              Chọn Thành Phần Cần Khám Phá
            </h3>
            <span className="text-[10px] text-gray-500">
              Nhấn chọn để làm nổi bật (Highlight) trực tiếp trên mô hình 3D
            </span>
          </div>
        </div>

        {/* Active Badge */}
        {activeComponent && (
          <span
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-orange-50 text-orange-700 border border-orange-200"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            {activeComponent.shortLabel} ({activeComponent.symbol})
          </span>
        )}
      </div>

      {/* Main Component Quick-Selector Buttons: [ĐÁY] [r] [h] [l] [TRỤC] */}
      <div className="flex flex-wrap gap-2">
        {components.map((comp) => {
          const isSelected = activeComponentId === comp.id;

          return (
            <button
              key={comp.id}
              id={`component-chip-${comp.id}`}
              type="button"
              onClick={() => onSelectComponent(comp.id)}
              className={`
                px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer touch-manipulation min-h-[40px]
                ${
                  isSelected
                    ? 'bg-orange-500 text-white shadow-sm ring-2 ring-orange-200 scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 border border-gray-200 active:scale-95'
                }
              `}
              title={comp.description}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${comp.color} shrink-0`} />
              <span className="font-mono text-xs uppercase tracking-wide">
                [{comp.shortLabel}]
              </span>
              <span className="text-[11px] font-normal opacity-90 hidden xs:inline">
                {comp.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Short Contextual Explanation Banner */}
      {activeComponent && (
        <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-200/80 flex items-start gap-2.5 animate-fadeIn">
          <div className="mt-0.5 shrink-0 text-orange-500">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-orange-900">
                {activeComponent.name}
              </span>
              <span className="font-mono text-[11px] text-orange-800 font-bold bg-white px-2 py-0.5 rounded border border-orange-200">
                Ký hiệu: {activeComponent.symbol}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed text-[11px]">
              {activeComponent.description}
            </p>
            <p className="text-gray-500 font-mono text-[10px] pt-0.5">
              {activeComponent.details}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentSelector;
