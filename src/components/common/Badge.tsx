/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from 'react';

export type BadgeVariant =
  | 'cylinder'
  | 'sphere'
  | 'cone'
  | 'ai'
  | 'achievement'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'outline'
  | 'primary'
  | 'mixed';

export type BadgeSize = 'xs' | 'sm' | 'md';
export type BadgeShape = 'rounded' | 'pill';

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  icon?: ReactNode;
  className?: string;
  id?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  shape = 'pill',
  icon,
  className = '',
  id
}) => {
  const shapeClasses: Record<BadgeShape, string> = {
    rounded: 'rounded-md',
    pill: 'rounded-full'
  };

  const sizeClasses: Record<BadgeSize, string> = {
    xs: 'px-2 py-0.5 text-[10px] font-bold gap-1',
    sm: 'px-2.5 py-0.5 text-xs font-semibold gap-1.5',
    md: 'px-3 py-1 text-xs font-bold gap-1.5'
  };

  const variantClasses: Record<BadgeVariant, string> = {
    cylinder: 'bg-teal-50 text-teal-800 border border-teal-200',
    sphere: 'bg-indigo-50 text-indigo-800 border border-indigo-200',
    cone: 'bg-blue-50 text-blue-800 border border-blue-200',
    ai: 'bg-orange-50 text-orange-800 border border-orange-200',
    achievement: 'bg-amber-50 text-amber-800 border border-amber-200',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    danger: 'bg-rose-50 text-rose-800 border border-rose-200',
    outline: 'bg-white text-slate-700 border border-slate-300',
    primary: 'bg-blue-50 text-blue-800 border border-blue-200',
    mixed: 'bg-purple-50 text-purple-800 border border-purple-200'
  };

  return (
    <span
      id={id}
      className={`
        inline-flex items-center justify-center whitespace-nowrap select-none transition-colors
        ${shapeClasses[shape]}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
