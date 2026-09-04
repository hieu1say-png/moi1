/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NON-OBSTRUCTIVE 3D LAYOUT SYSTEM
 * Ensures 3D WebGL Canvas has >90% unobstructed visibility
 * All data cards, sliders, formulas, step controls, and quizzes sit OUTSIDE the 3D Canvas
 */

import React from 'react';

export interface NonObstructive3DLayoutProps {
  canvas: React.ReactNode;
  dockedHUD?: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
}

export const NonObstructive3DLayout: React.FC<NonObstructive3DLayoutProps> = ({
  canvas,
  dockedHUD,
  sidebar,
  className = ''
}) => {
  return (
    <div id="non-obstructive-3d-layout-root" className={`w-full flex flex-col gap-4 sm:gap-6 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* Left Column: 100% Unobstructed 3D Stage (8 cols on desktop) */}
        <div className="lg:col-span-8 w-full flex flex-col space-y-4">
          {/* Pure 3D Canvas Container */}
          <div className="w-full relative rounded-2xl sm:rounded-3xl bg-[#F8FAFC] border border-gray-200 shadow-sm overflow-hidden min-h-[460px] sm:min-h-[520px] lg:min-h-[600px] flex flex-col justify-between">
            {canvas}
          </div>

          {/* Docked Mode HUD (Below Canvas on Left Column) */}
          {dockedHUD && (
            <div className="w-full">
              {dockedHUD}
            </div>
          )}
        </div>

        {/* Right Column: Parameters, AI Tutor, and Explanations (4 cols on desktop) */}
        {sidebar && (
          <div className="lg:col-span-4 w-full flex flex-col space-y-4">
            {sidebar}
          </div>
        )}
      </div>
    </div>
  );
};

export default NonObstructive3DLayout;
