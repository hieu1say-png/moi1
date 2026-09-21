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
      rounded: 'rounded-lg',
      pill: 'rounded-full',
      circle: 'rounded-full p-2 aspect-square',
      square: 'rounded-lg p-2 aspect-square'
    };

    // 2. Sizes (with 2x horizontal padding rule & min 44px mobile height accessibility)
    const sizeClasses: Record<ButtonSize, string> = {
      xs: 'text-xs py-1 px-2.5 gap-1.5 font-semibold min-h-[32px]',
      sm: 'text-xs py-1.5 px-3.5 gap-1.5 font-semibold min-h-[36px]',
      md: 'text-xs sm:text-sm py-2 px-4 gap-2 font-semibold min-h-[44px]',
      lg: 'text-sm sm:text-base py-2.5 px-5 gap-2.5 font-bold min-h-[48px]'
    };

    // 3. Variants (Calm, Precise, Educational Inspo-Driven System)
    const variantClasses: Record<ButtonVariant, string> = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs border border-blue-600 active:scale-[0.98]',
      cylinder: 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs border border-teal-600 active:scale-[0.98]',
      sphere: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs border border-indigo-600 active:scale-[0.98]',
      cone: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs border border-blue-600 active:scale-[0.98]',
      ai: 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs border border-orange-600 active:scale-[0.98]',
      achievement: 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs border border-amber-600 active:scale-[0.98]',
      secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/80 active:scale-[0.98]',
      outline: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-2xs active:scale-[0.98]',
      ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 active:scale-[0.98]',
      subtle: 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 active:scale-[0.98]',
      danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs border border-rose-600 active:scale-[0.98]',
      success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs border border-emerald-600 active:scale-[0.98]',
      white: 'bg-white text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-2xs'
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
