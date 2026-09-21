/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - APPLE/LINEAR GRADE TILT CARD & SPECULAR GLOSS CONTAINER
 * 1. 3D CSS perspective & transforms (rotateX, rotateY, translateZ, scale)
 * 2. Modulated by cursor distance from center with spring physics
 * 3. Dynamic Specular Gloss Lighting linked to (--mouse-x, --mouse-y)
 * 4. Graceful fallback on touch & prefers-reduced-motion
 */

import React, { useRef, useState, useEffect } from 'react';

export interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  maxTilt?: number; // Maximum tilt degrees (default: 6)
  scale?: number; // Scale on hover (default: 1.02)
  glare?: boolean; // Enable dynamic specular gloss lighting (default: true)
  perspective?: number; // CSS perspective in px (default: 800)
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  disabled = false,
  maxTilt = 6,
  scale = 1.02,
  glare = true,
  perspective = 800,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 640);
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isTouchDevice || isReducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Relative distance from center (-1 to 1)
    const normX = (x - centerX) / (centerX || 1);
    const normY = (y - centerY) / (centerY || 1);

    // Modulated 3D angles
    const rotateX = -normY * maxTilt;
    const rotateY = normX * maxTilt;

    // Update CSS custom properties for specular gloss & 3D transform
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    cardRef.current.style.transform = `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px) scale3d(${scale}, ${scale}, 1)`;

    if (glare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.22,
      });
    }
  };

  const handleMouseEnter = () => {
    if (disabled || isTouchDevice || isReducedMotion) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    setIsHovered(false);
    cardRef.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)`;
    if (glare) {
      setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'transform 120ms ease-out' : 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`relative will-change-transform active:scale-[0.985] group ${className}`}
    >
      {/* Dynamic Specular Gloss Lighting Overlay */}
      {glare && !isTouchDevice && !isReducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] overflow-hidden transition-opacity duration-300"
          style={{ opacity: glarePos.opacity }}
          aria-hidden="true"
        >
          <div
            className="absolute -inset-full w-[300%] h-[300%] pointer-events-none transition-transform duration-75"
            style={{
              background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.08) 35%, transparent 70%)`,
              mixBlendMode: 'overlay',
            }}
          />
        </div>
      )}

      {/* Child Content */}
      <div className="relative z-0 h-full w-full">
        {children}
      </div>
    </div>
  );
};
