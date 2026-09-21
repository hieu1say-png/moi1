/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - APPLE EXPERIENCE PROVIDER
 * Unified interactive experience layer:
 * 1. Physics-based Dual Cursor (Center dot + Inertia ring)
 * 2. Subtle Ambience (Procedural noise + Spatial grid)
 * 3. Tactile Floating Elements (Parallax & Draggable Math Stickers)
 * 4. Attention Management & Focus Mode
 * 5. Dynamic Specular Gloss CSS variables
 */

import React, { useEffect } from 'react';
import { CustomDualCursor } from './CustomDualCursor';
import { PerspectiveTiltGrid } from './PerspectiveTiltGrid';
import { SubtleAmbience } from './SubtleAmbience';
import { FloatingMathStickers } from './FloatingMathStickers';
import { FocusModeProvider } from './FocusModeProvider';

export interface AppleExperienceProviderProps {
  children: React.ReactNode;
  enableCursor?: boolean;
  enableGrid?: boolean;
  enableAmbience?: boolean;
  enableStickers?: boolean;
}

export const AppleExperienceProvider: React.FC<AppleExperienceProviderProps> = ({
  children,
  enableCursor = true,
  enableGrid = true,
  enableAmbience = true,
  enableStickers = true,
}) => {
  // Update global root variables for specular gloss lighting
  useEffect(() => {
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--global-mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--global-mouse-y', `${e.clientY}px`);
        rafId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <FocusModeProvider>
      {/* 1. 3D Perspective Tilt Grid Background (Scalora Grid) */}
      {enableGrid && <PerspectiveTiltGrid />}

      {/* 2. Subtle Spatial Ambience */}
      {enableAmbience && <SubtleAmbience />}

      {/* 3. Physics-based Dual Cursor (Dot + Lagging Ring) */}
      {enableCursor && <CustomDualCursor />}

      {/* 4. Tactile Floating Math Stickers */}
      {enableStickers && <FloatingMathStickers />}

      {/* 5. Main App Tree */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </FocusModeProvider>
  );
};
