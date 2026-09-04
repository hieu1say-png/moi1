/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - AUTH CARD COMPONENT
 * Light theme container conforming to Design System:
 * rounded-2xl, shadow-sm, border #E5E7EB, background #FFFFFF.
 */

import React from 'react';

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({ children, className = '', id }) => {
  return (
    <div
      id={id}
      className={`bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 w-full transition-all duration-200 hover:translate-y-[-1px] ${className}`}
    >
      {children}
    </div>
  );
};
