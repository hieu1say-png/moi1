/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Lightbulb, BookOpen, PenTool, Rocket, ChevronRight } from 'lucide-react';
import { RouteId } from '../../types';
import { useApp } from '../../context/AppContext';

export interface StepItem {
  number: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  route: RouteId;
  colorClass: {
    bg: string;
    border: string;
    iconBg: string;
    iconColor: string;
    titleColor: string;
  };
}

export const ROADMAP_STEPS: StepItem[] = [
  {
    number: 1,
    title: '1. Nhận biết',
    description: 'Làm quen và nhận dạng hình khối',
    icon: Lightbulb,
    route: '/theory',
    colorClass: {
      bg: 'bg-[#FFF6F4] hover:bg-[#FDF0ED]',
      border: 'border-[#F4D2CA] hover:border-[#ED806F]',
      iconBg: 'bg-[#ED806F]',
      iconColor: 'text-white',
      titleColor: 'text-[#3A302B]'
    }
  },
  {
    number: 2,
    title: '2. Thông hiểu',
    description: 'Nắm vững công thức và tính chất',
    icon: BookOpen,
    route: '/explore',
    colorClass: {
      bg: 'bg-[#F6FAF4] hover:bg-[#EBF2E8]',
      border: 'border-[#D0DEC9] hover:border-[#9FB596]',
      iconBg: 'bg-[#9FB596]',
      iconColor: 'text-white',
      titleColor: 'text-[#3A302B]'
    }
  },
  {
    number: 3,
    title: '3. Luyện tập',
    description: 'Bài tập cơ bản đến nâng cao',
    icon: PenTool,
    route: '/practice',
    colorClass: {
      bg: 'bg-[#FFF7F4] hover:bg-[#FCECE6]',
      border: 'border-[#F4D5C8] hover:border-[#E07A5F]',
      iconBg: 'bg-[#E07A5F]',
      iconColor: 'text-white',
      titleColor: 'text-[#3A302B]'
    }
  },
  {
    number: 4,
    title: '4. Ứng dụng',
    description: 'Áp dụng vào thực tế cuộc sống',
    icon: Rocket,
    route: '/real-world',
    colorClass: {
      bg: 'bg-[#FAF7FD] hover:bg-[#F1EBF9]',
      border: 'border-[#DFD2F0] hover:border-[#B7A2D6]',
      iconBg: 'bg-[#B7A2D6]',
      iconColor: 'text-[#3A302B]',
      titleColor: 'text-[#3A302B]'
    }
  }
];

export const RoadmapStepper: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="space-y-3.5 w-full">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-base sm:text-lg font-bold text-[#3A302B] tracking-tight">
          Lộ Trình Học Tập Chuẩn Bộ GD&amp;ĐT
        </h3>
        <span className="text-xs text-[#766A61] font-medium hidden sm:inline">
          4 giai đoạn củng cố kiến thức
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
        {ROADMAP_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isLast = idx === ROADMAP_STEPS.length - 1;

          return (
            <div key={step.number} className="relative flex items-center w-full">
              <button
                onClick={() => navigateTo(step.route)}
                className={`
                  w-full text-left p-4 rounded-[18px] border transition-all duration-150 cursor-pointer shadow-xs hover:shadow-paper-hover flex items-center gap-3 min-h-[68px]
                  ${step.colorClass.bg}
                  ${step.colorClass.border}
                `}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${step.colorClass.iconBg} ${step.colorClass.iconColor} shadow-2xs`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-[#3A302B] truncate">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#766A61] line-clamp-1 mt-0.5 font-medium">
                    {step.description}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#A0958B] shrink-0 sm:hidden" />
              </button>

              {!isLast && (
                <div className="hidden lg:flex absolute -right-2 z-10 w-4 h-4 rounded-full bg-[#FFFDF8] border border-[#E5DCCF] items-center justify-center shadow-2xs pointer-events-none text-[#766A61]">
                  <ChevronRight className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
