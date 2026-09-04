/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShapeType } from '../../types';
import { Compass } from 'lucide-react';

export interface ShapeSelectorProps {
  selectedShape: ShapeType;
  onSelectShape: (shape: ShapeType) => void;
}

export const ShapeSelector: React.FC<ShapeSelectorProps> = ({
  selectedShape,
  onSelectShape
}) => {
  const shapes: Array<{
    id: ShapeType;
    name: string;
    vietnameseName: string;
    icon: string;
    colorActive: string;
  }> = [
    {
      id: 'cylinder',
      name: 'Cylinder',
      vietnameseName: 'Hình Trụ',
      icon: '🛢️',
      colorActive: 'bg-[#ED806F] text-white shadow-xs'
    },
    {
      id: 'cone',
      name: 'Cone',
      vietnameseName: 'Hình Nón',
      icon: '🍦',
      colorActive: 'bg-[#E07A5F] text-white shadow-xs'
    },
    {
      id: 'sphere',
      name: 'Sphere',
      vietnameseName: 'Hình Cầu',
      icon: '⚽',
      colorActive: 'bg-[#9FB596] text-white shadow-xs'
    }
  ];

  return (
    <div
      id="explore-shape-selector"
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FFFDF8] p-4 sm:p-5 rounded-[20px] border border-[#E5DCCF] shadow-xs"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#FDF0ED] text-[#8F3E32] flex items-center justify-center shrink-0 border border-[#F4D2CA]">
          <Compass className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-serif text-base sm:text-lg font-bold text-[#3A302B] leading-tight">
            Khám Phá Không Gian 3D
          </h2>
          <p className="text-xs sm:text-sm text-[#766A61] font-medium">
            Tương tác đa chiều mô hình Hình Trụ – Nón – Cầu
          </p>
        </div>
      </div>

      {/* Shape Switcher Pills */}
      <div
        role="tablist"
        aria-label="Chọn hình khối 3D"
        className="grid grid-cols-3 gap-1.5 bg-[#F4EEE4] p-1.5 rounded-2xl border border-[#E5DCCF]"
      >
        {shapes.map((item) => {
          const isSelected = selectedShape === item.id;

          return (
            <button
              key={item.id}
              id={`shape-selector-tab-${item.id}`}
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelectShape(item.id)}
              className={`
                px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer touch-manipulation min-h-[44px]
                ${
                  isSelected
                    ? item.colorActive
                    : 'text-[#766A61] hover:text-[#3A302B] hover:bg-[#EAE0D3]'
                }
              `}
            >
              <span className="text-base sm:text-lg">{item.icon}</span>
              <div className="text-left hidden xs:block">
                <span className="block leading-none">{item.vietnameseName}</span>
                <span className="text-[10px] font-mono opacity-75 leading-none mt-0.5">
                  {item.name}
                </span>
              </div>
              <span className="xs:hidden leading-none">{item.vietnameseName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
