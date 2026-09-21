/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - SUBTLE AMBIENCE
 * 1. Procedural SVG noise texture overlay (~0.035 opacity)
 * 2. Faint perspective grid for Apple/Linear spatial depth
 * 3. Zero pointer-events interference
 */

import React from 'react';

export const SubtleAmbience: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Faint Spatial Perspective Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0F291E 1px, transparent 1px),
            linear-gradient(to bottom, #0F291E 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(circle at 50% 40%, black 30%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black 30%, transparent 85%)',
        }}
      />

      {/* 2. Procedural SVG Noise Texture */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="apple-procedural-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#apple-procedural-noise)" />
      </svg>
    </div>
  );
};
