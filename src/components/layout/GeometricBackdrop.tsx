/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - LAYERED GEOMETRIC BACKDROP (LIGHT THEME)
 * Ambient editorial background with subtle grid, circles, wireframes & soft radial glow.
 * Pure presentation layer - non-intrusive (pointer-events-none).
 */

import React from 'react';
import { GeometricParticleField } from '../motion/GeometricParticleField';

export const GeometricBackdrop: React.FC = () => {
  return (
    <div
      id="geometric-backdrop"
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none bg-[#F8FAFC]"
      aria-hidden="true"
    >
      {/* 1. Dynamic Ambient Radial Glows (GPU-accelerated float) */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-orange-400/12 to-amber-300/0 blur-3xl animate-pulse-ambient" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-blue-400/10 to-indigo-300/0 blur-3xl animate-pulse-ambient" style={{ animationDelay: '-4s' }} />
      <div className="absolute -bottom-40 left-1/4 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-teal-400/10 to-emerald-300/0 blur-3xl animate-pulse-ambient" style={{ animationDelay: '-8s' }} />
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-gradient-to-r from-purple-400/8 to-pink-300/0 blur-3xl" />

      {/* 2. Interactive Mathematical & Geometric Particle Field */}
      <GeometricParticleField />

      {/* 3. Geometric Coordinate Grid Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035] text-slate-900"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="geometry-grid-pattern" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="24" cy="24" r="0.75" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#geometry-grid-pattern)" />
      </svg>

      {/* 3. Decorative Geometric Circles & Orbital Wireframe Arcs */}
      <svg
        className="absolute top-12 right-12 w-[420px] h-[420px] opacity-[0.06] text-slate-800 hidden md:block"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Concentric rings */}
        <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="200" r="90" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
        <circle cx="200" cy="200" r="40" stroke="currentColor" strokeWidth="0.75" />
        {/* Crosshair coordinate axes */}
        <line x1="200" y1="10" x2="200" y2="390" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
        <line x1="10" y1="200" x2="390" y2="200" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
        {/* Angle degree markers */}
        <line x1="72" y1="72" x2="328" y2="328" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="72" y1="328" x2="328" y2="72" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
      </svg>

      {/* 4. Decorative Wireframe Geometry Form (Isometric Cone & Sphere projection) */}
      <svg
        className="absolute bottom-20 left-10 w-[320px] h-[320px] opacity-[0.05] text-slate-800 hidden lg:block"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Isometric Wireframe Cylinder Projection */}
        <ellipse cx="150" cy="80" rx="90" ry="32" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <ellipse cx="150" cy="220" rx="90" ry="32" stroke="currentColor" strokeWidth="1" />
        <line x1="60" y1="80" x2="60" y2="220" stroke="currentColor" strokeWidth="1" />
        <line x1="240" y1="80" x2="240" y2="220" stroke="currentColor" strokeWidth="1" />
        <line x1="150" y1="80" x2="150" y2="220" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
        {/* Axis center dot */}
        <circle cx="150" cy="80" r="3" fill="currentColor" />
        <circle cx="150" cy="220" r="3" fill="currentColor" />
      </svg>

      {/* 5. Subtle Top-Right Ambient Linear Gradient Accent */}
      <div className="absolute top-0 right-0 w-full h-48 bg-gradient-to-b from-white/60 to-transparent" />
    </div>
  );
};
