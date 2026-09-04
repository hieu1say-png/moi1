/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - NEO SECTION HEADER COMPONENT
 * Educational Neobrutalism: Bold high-contrast heading, tight spacing, accessible hierarchy.
 */

import React, { ReactNode } from 'react';

export interface SectionHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  badge?: ReactNode;
  action?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  id?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  action,
  align = 'left',
  className = '',
  id
}) => {
  const isCenter = align === 'center';

  return (
    <div
      id={id}
      className={`
        flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8
        ${isCenter ? 'text-center md:flex-col md:items-center' : 'text-left'}
        ${className}
      `}
    >
      <div className={`space-y-1.5 ${isCenter ? 'mx-auto max-w-3xl' : 'max-w-2xl'}`}>
        {badge && (
          <div className={`flex items-center gap-2 mb-2 ${isCenter ? 'justify-center' : 'justify-start'}`}>
            {typeof badge === 'string' ? (
              <span className="neo-badge bg-[#FFD23F] text-black">
                {badge}
              </span>
            ) : (
              badge
            )}
          </div>
        )}
        <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-black text-black tracking-tight leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm md:text-base text-gray-800 leading-relaxed font-medium">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className={`shrink-0 ${isCenter ? 'mt-2' : ''}`}>
          {action}
        </div>
      )}
    </div>
  );
};

