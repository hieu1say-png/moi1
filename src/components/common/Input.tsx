/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  subLabel?: string;
  helperText?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      subLabel,
      helperText,
      error,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className = '',
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`${fullWidth ? 'w-full' : ''} space-y-1.5`}>
        {(label || subLabel) && (
          <div className="flex items-center justify-between">
            {label && (
              <label htmlFor={id} className="text-xs font-bold text-[#1F2937]">
                {label}
              </label>
            )}
            {subLabel && <span className="text-[11px] text-[#64748B] font-medium">{subLabel}</span>}
          </div>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#64748B]">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            className={`
              w-full text-xs sm:text-sm bg-[#FFFFFF] border rounded-xl py-2.5 px-3.5 text-[#1F2937] placeholder:text-[#64748B]
              transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1
              disabled:opacity-50 disabled:bg-[#F8FAFC] disabled:cursor-not-allowed
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${
                error
                  ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#FEE2E2]'
                  : 'border-[#E5E7EB] focus:border-[#F97316] focus:ring-[#FFF7ED]'
              }
              ${className}
            `}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-[#64748B]">
              {rightIcon}
            </div>
          )}
        </div>

        {error && <p className="text-[11px] font-medium text-[#EF4444]">{error}</p>}
        {!error && helperText && <p className="text-[11px] text-[#64748B]">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
