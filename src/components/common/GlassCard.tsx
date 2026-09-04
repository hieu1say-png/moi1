/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - NEO CARD CONTAINER
 * Educational Neobrutalism: 3px solid black border, 4px hard shadow, high-contrast crisp card.
 */

import React, { ReactNode, HTMLAttributes } from 'react';

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  id?: string;
  hoverEffect?: boolean;
  bordered?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  id,
  hoverEffect = true,
  bordered = true,
  ...rest
}) => {
  return (
    <div
      id={id}
      className={`
        bg-white rounded-lg p-5 sm:p-6
        ${bordered ? 'border-3 border-black shadow-neo' : 'border-0'}
        ${
          hoverEffect
            ? 'transition-transform duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-lg'
            : ''
        }
        ${className}
      `}
      {...rest}
    >
      {children}
    </div>
  );
};

