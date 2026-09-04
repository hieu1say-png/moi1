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
    rounded: 'rounded',
    pill: 'rounded-full'
  };

  const sizeClasses: Record<BadgeSize, string> = {
    xs: 'px-2 py-0.5 text-[10px] font-black gap-1',
    sm: 'px-2.5 py-0.5 text-xs font-black gap-1.5',
    md: 'px-3 py-1 text-xs font-black gap-1.5'
  };

  const variantClasses: Record<BadgeVariant, string> = {
    cylinder: 'bg-[#FF6B00] text-white border border-black',
    sphere: 'bg-[#00D1FF] text-black border border-black',
    cone: 'bg-[#B7F000] text-black border border-black',
    ai: 'bg-[#8B5CF6] text-white border border-black',
    achievement: 'bg-[#FFD23F] text-black border border-black',
    neutral: 'bg-[#FFF9E6] text-black border border-black',
    success: 'bg-[#B7F000] text-black border border-black',
    warning: 'bg-[#FFD23F] text-black border border-black',
    danger: 'bg-[#FF4F81] text-white border border-black',
    outline: 'bg-white text-black border border-black',
    primary: 'bg-[#FF6B00] text-white border border-black',
    mixed: 'bg-[#8B5CF6] text-white border border-black'
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
