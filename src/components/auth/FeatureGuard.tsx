/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - FEATURE GUARD
 * Wraps interactive learning elements (3D, Practice, AI, Gamification)
 * to enforce the "Teacher-provisioned Student Login" gate.
 */

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LockOverlay } from './LockOverlay';

interface FeatureGuardProps {
  children: React.ReactNode;
  featureName?: string;
  className?: string;
  fallbackMode?: 'overlay' | 'inline' | 'hide';
}

export const FeatureGuard: React.FC<FeatureGuardProps> = ({
  children,
  featureName = 'Tính năng học tập',
  className = '',
  fallbackMode = 'overlay'
}) => {
  const { isFeatureLocked } = useAuth();

  if (!isFeatureLocked) {
    return <>{children}</>;
  }

  if (fallbackMode === 'hide') {
    return null;
  }

  if (fallbackMode === 'inline') {
    return <LockOverlay featureName={featureName} isInline className={className} />;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Dimmed background preview */}
      <div className="pointer-events-none opacity-40 filter blur-[1px] select-none">
        {children}
      </div>

      {/* Non-intrusive Lock Overlay */}
      <LockOverlay featureName={featureName} />
    </div>
  );
};
