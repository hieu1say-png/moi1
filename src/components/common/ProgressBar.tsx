/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - NEO PROGRESS BAR COMPONENT
 * Educational Neobrutalism: 3px black border, hard shadow, solid vibrant bar.
 */

import React from 'react';

export type ProgressColor =
  | 'cylinder'
  | 'sphere'
  | 'cone'
  | 'ai'
  | 'achievement'
  | 'indigo'
  | 'emerald'
  | 'amber'
  | 'blue'
  | 'purple';

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  subLabel?: string;
  showValue?: boolean;
  color?: ProgressColor;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  subLabel,
  showValue = true,
  color = 'cylinder',
  size = 'md',
  className = '',
  id
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeClasses: Record<string, string> = {
    xs: 'h-2.5',
    sm: 'h-3.5',
    md: 'h-4',
    lg: 'h-5'
  };

  const colorClasses: Record<ProgressColor, string> = {
    cylinder: 'bg-[#3B82F6]',
    sphere: 'bg-[#14B8A6]',
    cone: 'bg-[#FF6B00]',
    ai: 'bg-[#8B5CF6]',
    achievement: 'bg-[#FFD23F]',
    indigo: 'bg-[#6366F1]',
    emerald: 'bg-[#22C55E]',
    amber: 'bg-[#FFD23F]',
    blue: 'bg-[#3B82F6]',
    purple: 'bg-[#8B5CF6]'
  };

  return (
    <div id={id} className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-black text-black">
          <div className="flex items-center gap-1.5">
            {label && <span>{label}</span>}
            {subLabel && <span className="text-gray-700 font-bold text-[11px]">({subLabel})</span>}
          </div>
          {showValue && <span className="text-black tabular-nums font-mono font-black">{percentage}%</span>}
        </div>
      )}
      <div
        className={`w-full bg-white rounded border-3 border-black shadow-neo-sm overflow-hidden p-0.5 ${sizeClasses[size]}`}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`${colorClasses[color]} h-full rounded-xs border-r-2 border-black transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

