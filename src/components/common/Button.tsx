/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * WARM IVORY BUTTON COMPONENT
 * Pill-shaped and soft rounded buttons with warm tactile hover states
 */

import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'subtle'
  | 'danger'
  | 'success'
  | 'cylinder'
  | 'sphere'
  | 'cone'
  | 'ai'
  | 'achievement'
  | 'white';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type ButtonShape = 'rounded' | 'pill' | 'circle' | 'square';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
  id?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      shape = 'rounded',
      leftIcon,
      rightIcon,
      isLoading = false,
      fullWidth = false,
      className = '',
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    // 1. Shapes
    const shapeClasses: Record<ButtonShape, string> = {
      rounded: 'rounded',
      pill: 'rounded-full',
      circle: 'rounded-full p-2 aspect-square',
      square: 'rounded p-2 aspect-square'
    };

    // 2. Sizes (with 2x horizontal padding rule)
    const sizeClasses: Record<ButtonSize, string> = {
      xs: 'text-xs py-1.5 px-3 gap-1.5 font-black',
      sm: 'text-xs py-2 px-4 gap-2 font-black',
      md: 'text-sm py-2.5 px-5 gap-2 font-black',
      lg: 'text-base py-3 px-6 gap-2.5 font-black'
    };

    // 3. Variants (Neobrutalism: border 2-3px black, hard shadow, bold flat color)
    const variantClasses: Record<ButtonVariant, string> = {
      primary: 'bg-[#FF6B00] text-white hover:bg-[#E55F00] border-2 border-black shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
      cylinder: 'bg-[#FF6B00] text-white hover:bg-[#E55F00] border-2 border-black shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
      sphere: 'bg-[#00D1FF] text-black hover:bg-[#00B8E6] border-2 border-black shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
      cone: 'bg-[#B7F000] text-black hover:bg-[#A0D400] border-2 border-black shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
      ai: 'bg-[#8B5CF6] text-white hover:bg-[#7C3AED] border-2 border-black shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
      achievement: 'bg-[#FFD23F] text-black hover:bg-[#E5BC35] border-2 border-black shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
      secondary: 'bg-white hover:bg-[#FFF9E6] text-black border-2 border-black shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
      outline: 'bg-white hover:bg-[#FFF9E6] text-black border-2 border-black shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
      ghost: 'bg-transparent hover:bg-black/5 text-black active:scale-[0.98]',
      subtle: 'bg-[#FFF9E6] hover:bg-[#FFF0B3] text-black border border-black active:translate-x-[1px] active:translate-y-[1px]',
      danger: 'bg-[#FF4F81] hover:bg-[#E6396B] text-white border-2 border-black shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
      success: 'bg-[#B7F000] hover:bg-[#A0D400] text-black border-2 border-black shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
      white: 'bg-white text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm'
    };

    return (
      <button
        ref={ref}
        id={id}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center whitespace-nowrap cursor-pointer
          transition-all duration-150 select-none
          disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
          ${shapeClasses[shape]}
          ${shape === 'circle' || shape === 'square' ? '' : sizeClasses[size]}
          ${variantClasses[variant]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
