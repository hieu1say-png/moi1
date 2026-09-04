/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShapeType } from '../../types';

interface ShapeIllustrationProps {
  type: ShapeType | 'all' | 'robot';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const ShapeIllustration: React.FC<ShapeIllustrationProps> = ({
  type,
  className = '',
  size = 'md'
}) => {
  const sizeMap = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-44 h-44',
    hero: 'w-56 h-56 sm:w-64 sm:h-64'
  };

  if (type === 'cylinder') {
    return (
      <svg
        viewBox="0 0 200 240"
        className={`${sizeMap[size]} ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cylinderBodyGrad" x1="40" y1="50" x2="160" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="35%" stopColor="#60a5fa" />
            <stop offset="70%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="cylinderTopGrad" x1="40" y1="50" x2="160" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#dbeafe" />
          </linearGradient>
          <filter id="cylShadow" x="20" y="170" width="160" height="60" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Soft shadow under base */}
        <ellipse cx="100" cy="195" rx="60" ry="16" fill="rgba(37,99,235,0.2)" filter="url(#cylShadow)" />

        {/* Cylinder Body */}
        <path
          d="M40 50 C40 65, 160 65, 160 50 V180 C160 196, 40 196, 40 180 Z"
          fill="url(#cylinderBodyGrad)"
          stroke="#1d4ed8"
          strokeWidth="2.5"
        />

        {/* Bottom Dashed back ellipse */}
        <path
          d="M40 180 C40 166, 160 166, 160 180"
          stroke="#1e40af"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
        />

        {/* Cylinder Top Ellipse */}
        <ellipse cx="100" cy="50" rx="60" ry="18" fill="url(#cylinderTopGrad)" stroke="#1d4ed8" strokeWidth="2.5" />

        {/* Radius marker */}
        <line x1="100" y1="180" x2="160" y2="180" stroke="#1e3a8a" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="100" cy="180" r="3" fill="#1e3a8a" />
        <text x="126" y="175" fill="#1e3a8a" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
          r
        </text>

        {/* Height dimension guide */}
        <line x1="30" y1="50" x2="30" y2="180" stroke="#1d4ed8" strokeWidth="1.5" />
        <polyline points="26,56 30,50 34,56" stroke="#1d4ed8" strokeWidth="1.5" fill="none" />
        <polyline points="26,174 30,180 34,174" stroke="#1d4ed8" strokeWidth="1.5" fill="none" />
        <text x="14" y="120" fill="#1d4ed8" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
          h
        </text>
      </svg>
    );
  }

  if (type === 'sphere') {
    return (
      <svg
        viewBox="0 0 200 240"
        className={`${sizeMap[size]} ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="30%" stopColor="#4ade80" />
            <stop offset="70%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </radialGradient>
          <filter id="sphereShadow" x="20" y="175" width="160" height="50" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Shadow */}
        <ellipse cx="100" cy="195" rx="60" ry="14" fill="rgba(22,163,74,0.2)" filter="url(#sphereShadow)" />

        {/* Sphere Circle */}
        <circle cx="100" cy="115" r="68" fill="url(#sphereGrad)" stroke="#166534" strokeWidth="2.5" />

        {/* Specular highlight */}
        <ellipse cx="78" cy="85" rx="20" ry="12" fill="rgba(255,255,255,0.4)" transform="rotate(-30 78 85)" />

        {/* Equator Dashed Front/Back */}
        <path
          d="M32 115 C32 135, 168 135, 168 115"
          stroke="#14532d"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M32 115 C32 95, 168 95, 168 115"
          stroke="#14532d"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
        />

        {/* Center point and radius */}
        <circle cx="100" cy="115" r="3.5" fill="#ffffff" stroke="#14532d" strokeWidth="1" />
        <line x1="100" y1="115" x2="166" y2="115" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" />
        <text x="130" y="110" fill="#ffffff" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
          r
        </text>
      </svg>
    );
  }

  if (type === 'cone') {
    return (
      <svg
        viewBox="0 0 200 240"
        className={`${sizeMap[size]} ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="coneBodyGrad" x1="40" y1="40" x2="160" y2="190" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fdba74" />
            <stop offset="45%" stopColor="#fb923c" />
            <stop offset="85%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
          <filter id="coneShadow" x="20" y="170" width="160" height="50" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Shadow */}
        <ellipse cx="100" cy="195" rx="60" ry="14" fill="rgba(234,88,12,0.2)" filter="url(#coneShadow)" />

        {/* Cone Body */}
        <path
          d="M100 40 L160 180 C160 196, 40 196, 40 180 Z"
          fill="url(#coneBodyGrad)"
          stroke="#c2410c"
          strokeWidth="2.5"
        />

        {/* Bottom Dashed back ellipse */}
        <path
          d="M40 180 C40 166, 160 166, 160 180"
          stroke="#9a3412"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
        />

        {/* Height line inside */}
        <line x1="100" y1="40" x2="100" y2="180" stroke="#7c2d12" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="104" y="115" fill="#7c2d12" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
          h
        </text>

        {/* Radius marker */}
        <line x1="100" y1="180" x2="160" y2="180" stroke="#7c2d12" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="100" cy="180" r="3" fill="#7c2d12" />
        <text x="126" y="174" fill="#7c2d12" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
          r
        </text>

        {/* Slant height l label */}
        <text x="140" y="100" fill="#c2410c" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
          l
        </text>
      </svg>
    );
  }

  if (type === 'robot') {
    return (
      <svg
        viewBox="0 0 160 160"
        className={`${sizeMap[size]} ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="botHeadGrad" x1="30" y1="30" x2="130" y2="130" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ede9fe" />
          </linearGradient>
          <filter id="botGlow" x="0" y="0" width="160" height="160" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Antenna */}
        <line x1="80" y1="35" x2="80" y2="20" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round" />
        <circle cx="80" cy="16" r="6" fill="#a78bfa" stroke="#7c3aed" strokeWidth="2" />

        {/* Ears */}
        <rect x="24" y="60" width="8" height="24" rx="4" fill="#8b5cf6" />
        <rect x="128" y="60" width="8" height="24" rx="4" fill="#8b5cf6" />

        {/* Head */}
        <rect
          x="30"
          y="35"
          width="100"
          height="80"
          rx="24"
          fill="url(#botHeadGrad)"
          stroke="#7c3aed"
          strokeWidth="3"
        />

        {/* Screen visor */}
        <rect x="42" y="48" width="76" height="52" rx="14" fill="#1e1b4b" />

        {/* Happy glowing eyes */}
        <path d="M54 74 C54 66, 68 66, 68 74" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M92 74 C92 66, 106 66, 106 74" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Cute blush */}
        <circle cx="50" cy="85" r="4" fill="#f43f5e" opacity="0.6" />
        <circle cx="110" cy="85" r="4" fill="#f43f5e" opacity="0.6" />

        {/* Body collar */}
        <path d="M50 115 L110 115 L100 135 L60 135 Z" fill="#8b5cf6" />
      </svg>
    );
  }

  // Fallback / Hero bundle
  return null;
};
