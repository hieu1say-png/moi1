/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - NEO GLOW BUTTON COMPONENT
 * Educational Neobrutalism: Tactile physical press button with 3px solid black border and hard shadow.
 */

import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export type GlowButtonVariant = 'primary' | 'outline' | 'subtle' | 'ai';
export type GlowButtonSize = 'sm' | 'md' | 'lg';

export interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: GlowButtonVariant;
  size?: GlowButtonSize;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  id?: string;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  rightIcon,
  className = '',
  id,
  disabled,
  ...rest
}) => {
  const sizeClasses: Record<GlowButtonSize, string> = {
    sm: 'px-3.5 py-1.5 text-xs rounded gap-1.5',
    md: 'px-5 py-2.5 text-xs sm:text-sm rounded-md gap-2',
    lg: 'px-6 py-3.5 text-sm sm:text-base rounded-md gap-2.5 font-black'
  };

  const variantClasses: Record<GlowButtonVariant, string> = {
    primary: 'bg-[#FF6B00] text-white hover:bg-[#E55F00]',
    outline: 'bg-white text-black hover:bg-[#FFF9E6]',
    subtle: 'bg-[#FFF9E6] text-black hover:bg-[#FFF3CC]',
    ai: 'bg-[#8B5CF6] text-white hover:bg-[#7C3AED]'
  };

  return (
    <button
      id={id}
      disabled={disabled}
      className={`
        neo-btn font-extrabold cursor-pointer
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      {...rest}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};

