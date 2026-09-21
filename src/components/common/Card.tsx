/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * WARM IVORY CARD COMPONENT
 * Organic paper texture feeling, soft warm border, subtle shadow
 */

import React, { HTMLAttributes, ReactNode } from 'react';

export type CardVariant =
  | 'default'
  | 'cylinder'
  | 'sphere'
  | 'cone'
  | 'ai'
  | 'achievement'
  | 'neutral'
  | 'subtle';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: CardVariant;
  hoverable?: boolean;
  bordered?: boolean;
  className?: string;
  id?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverable = false,
  bordered = true,
  className = '',
  id,
  ...props
}) => {
  const getVariantStyles = (): string => {
    switch (variant) {
      case 'cylinder':
        return 'bg-white border-teal-200 text-slate-900 hover:border-teal-300';
      case 'sphere':
        return 'bg-white border-indigo-200 text-slate-900 hover:border-indigo-300';
      case 'cone':
        return 'bg-white border-blue-200 text-slate-900 hover:border-blue-300';
      case 'ai':
        return 'bg-white border-orange-200 text-slate-900 hover:border-orange-300';
      case 'achievement':
        return 'bg-white border-amber-200 text-slate-900 hover:border-amber-300';
      case 'subtle':
        return 'bg-slate-50 border-slate-200 text-slate-900';
      default:
        return 'bg-white border-slate-200 text-slate-900';
    }
  };

  return (
    <div
      id={id}
      className={`
        rounded-xl p-5 sm:p-6
        ${bordered ? `border ${getVariantStyles()}` : 'bg-white text-slate-900'}
        shadow-xs
        ${hoverable ? 'transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  id,
  ...props
}) => (
  <div id={id} className={`flex flex-col space-y-1 pb-3 border-b border-slate-200/80 mb-3.5 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = '',
  id,
  ...props
}) => (
  <h3
    id={id}
    className={`font-bold text-base sm:text-lg tracking-tight text-slate-900 ${className}`}
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = '',
  id,
  ...props
}) => (
  <p id={id} className={`text-xs sm:text-sm text-slate-600 font-normal leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  id,
  ...props
}) => (
  <div id={id} className={`text-slate-800 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  id,
  ...props
}) => (
  <div
    id={id}
    className={`flex items-center pt-3 border-t border-slate-200/80 mt-3.5 text-xs sm:text-sm text-slate-600 font-medium ${className}`}
    {...props}
  >
    {children}
  </div>
);
