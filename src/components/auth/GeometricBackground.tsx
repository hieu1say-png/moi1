/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - SUBTLE GEOMETRIC WIREFRAME BACKGROUND
 * Pure mathematical SVG aesthetics: wireframe cylinder, cone, sphere and coordinate grid.
 * Very low opacity (3-6%) to enhance focus without distraction.
 */

import React from 'react';

export const GeometricBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full opacity-[0.05] text-slate-800"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 800"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        {/* Isometric Grid Lines */}
        <defs>
          <pattern id="isometric-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 60 M 0 0 L 60 60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#isometric-grid)" />

        {/* Wireframe Cylinder (Top Left) */}
        <g transform="translate(120, 100)">
          <ellipse cx="60" cy="30" rx="50" ry="18" stroke="currentColor" />
          <line x1="10" y1="30" x2="10" y2="150" stroke="currentColor" />
          <line x1="110" y1="30" x2="110" y2="150" stroke="currentColor" />
          <path d="M 10 150 A 50 18 0 0 0 110 150" stroke="currentColor" />
          <path d="M 10 150 A 50 18 0 0 1 110 150" stroke="currentColor" strokeDasharray="3 3" />
          <line x1="60" y1="30" x2="60" y2="150" stroke="currentColor" strokeDasharray="2 2" />
        </g>

        {/* Wireframe Cone (Bottom Right) */}
        <g transform="translate(980, 520)">
          <ellipse cx="70" cy="160" rx="60" ry="22" stroke="currentColor" />
          <line x1="70" y1="20" x2="10" y2="160" stroke="currentColor" />
          <line x1="70" y1="20" x2="130" y2="160" stroke="currentColor" />
          <line x1="70" y1="20" x2="70" y2="160" stroke="currentColor" strokeDasharray="2 2" />
          <line x1="70" y1="160" x2="130" y2="160" stroke="currentColor" strokeDasharray="2 2" />
        </g>

        {/* Wireframe Sphere (Top Right) */}
        <g transform="translate(940, 80)">
          <circle cx="80" cy="80" r="70" stroke="currentColor" />
          <ellipse cx="80" cy="80" rx="70" ry="25" stroke="currentColor" />
          <ellipse cx="80" cy="80" rx="25" ry="70" stroke="currentColor" strokeDasharray="3 3" />
          <line x1="10" y1="80" x2="150" y2="80" stroke="currentColor" strokeDasharray="2 2" />
          <line x1="80" y1="10" x2="80" y2="150" stroke="currentColor" strokeDasharray="2 2" />
        </g>

        {/* 3D Coordinate Axis (Bottom Left) */}
        <g transform="translate(100, 620)">
          <line x1="0" y1="0" x2="120" y2="0" stroke="currentColor" strokeWidth="1.5" />
          <line x1="0" y1="0" x2="0" y2="-120" stroke="currentColor" strokeWidth="1.5" />
          <line x1="0" y1="0" x2="-70" y2="50" stroke="currentColor" strokeWidth="1.5" />
          <text x="130" y="5" fontSize="14" fontFamily="monospace" fill="currentColor">x</text>
          <text x="-5" y="-130" fontSize="14" fontFamily="monospace" fill="currentColor">z</text>
          <text x="-85" y="65" fontSize="14" fontFamily="monospace" fill="currentColor">y</text>
        </g>
      </svg>
    </div>
  );
};
