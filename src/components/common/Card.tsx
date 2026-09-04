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
        return 'bg-[#FFF9E6] border-black text-black';
      case 'sphere':
        return 'bg-[#FFF9E6] border-black text-black';
      case 'cone':
        return 'bg-[#FFF9E6] border-black text-black';
      case 'ai':
        return 'bg-[#FFF9E6] border-black text-black';
      case 'achievement':
        return 'bg-[#FFD23F] border-black text-black';
      case 'subtle':
        return 'bg-[#FFF9E6] border-black text-black';
      default:
        return 'bg-white border-black text-black';
    }
  };

  return (
    <div
      id={id}
      className={`
        rounded-lg p-5 sm:p-6
        ${bordered ? `border-3 ${getVariantStyles()}` : 'bg-white text-black'}
        shadow-neo
        ${hoverable ? 'transition-transform duration-150 hover:-translate-y-1 hover:shadow-neo-lg cursor-pointer' : ''}
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
  <div id={id} className={`flex flex-col space-y-1.5 pb-3.5 border-b-2 border-black mb-3.5 ${className}`} {...props}>
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
    className={`font-black text-base sm:text-lg lg:text-xl tracking-tight text-black font-heading ${className}`}
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
  <p id={id} className={`text-xs sm:text-sm text-gray-700 font-semibold leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  id,
  ...props
}) => (
  <div id={id} className={`text-black ${className}`} {...props}>
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
    className={`flex items-center pt-3.5 border-t-2 border-black mt-3.5 text-xs sm:text-sm text-gray-700 font-bold ${className}`}
    {...props}
  >
    {children}
  </div>
);
