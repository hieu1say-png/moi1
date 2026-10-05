/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - APPLE EXPERIENCE PROVIDER
 * Unified interactive experience layer:
 * 1. Physics-based Dual Cursor (Center dot + Inertia ring)
 * 2. Subtle Ambience (Procedural noise + Spatial grid)
 * 3. Attention Management & Focus Mode
 * 4. Dynamic Specular Gloss CSS variables
 * 
 * Note: Memory Notes / Floating Stickers have been permanently removed (SHOW_MEMORY_NOTES = false).
 */

import React from 'react';
import { PerspectiveTiltGrid } from './PerspectiveTiltGrid';
import { SubtleAmbience } from './SubtleAmbience';
import { FocusModeProvider } from './FocusModeProvider';

export const SHOW_MEMORY_NOTES = false;

export interface AppleExperienceProviderProps {
  children: React.ReactNode;
  enableGrid?: boolean;
  enableAmbience?: boolean;
  enableStickers?: boolean;
}

export const AppleExperienceProvider: React.FC<AppleExperienceProviderProps> = ({
  children,
  enableGrid = true,
  enableAmbience = true,
}) => {
  return (
    <FocusModeProvider>
      {/* 1. 3D Perspective Tilt Grid Background (Scalora Grid) */}
      {enableGrid && <PerspectiveTiltGrid />}

      {/* 2. Subtle Spatial Ambience */}
      {enableAmbience && <SubtleAmbience />}

      {/* 3. Main App Tree */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </FocusModeProvider>
  );
};
