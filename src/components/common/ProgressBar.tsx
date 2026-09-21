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
    cylinder: 'bg-teal-600',
    sphere: 'bg-indigo-600',
    cone: 'bg-blue-600',
    ai: 'bg-orange-600',
    achievement: 'bg-amber-500',
    indigo: 'bg-indigo-600',
    emerald: 'bg-emerald-600',
    amber: 'bg-amber-600',
    blue: 'bg-blue-600',
    purple: 'bg-purple-600'
  };

  return (
    <div id={id} className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-semibold text-slate-800">
          <div className="flex items-center gap-1.5">
            {label && <span>{label}</span>}
            {subLabel && <span className="text-slate-500 font-normal text-[11px]">({subLabel})</span>}
          </div>
          {showValue && <span className="text-slate-900 tabular-nums font-mono font-bold">{percentage}%</span>}
        </div>
      )}
      <div
        className={`w-full bg-slate-100 rounded-full border border-slate-200/80 overflow-hidden ${sizeClasses[size]}`}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`${colorClasses[color]} h-full rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

