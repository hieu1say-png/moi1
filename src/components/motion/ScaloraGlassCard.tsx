/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SCALORA 3D GLASS CARD WITH SPECULAR LIGHT SHEEN
 * 1. Glassmorphism: backdrop-filter: blur(20px), subtle 1px reflective border
 * 2. 3 macOS traffic light header dots (close #FF5F56, minimize #FFBD2E, expand #27C93F)
 * 3. 3D tilt perspective transform (rotateX, rotateY) modulated by cursor distance
 * 4. Specular gloss sheen overlay with radial-gradient linked to (--mouse-x, --mouse-y)
 */

import React, { useRef, useState, useEffect } from 'react';

export interface ScaloraGlassCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  showTrafficLights?: boolean;
}

export const ScaloraGlassCard: React.FC<ScaloraGlassCardProps> = ({
  title,
  subtitle,
  children,
  className = '',
  maxTilt = 5,
  showTrafficLights = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isCoarse =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 640;
      setIsTouchDevice(isCoarse);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normX = (x - centerX) / (centerX || 1);
    const normY = (y - centerY) / (centerY || 1);

    const rotateX = -normY * maxTilt;
    const rotateY = normX * maxTilt;

    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(6px)`;

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.28,
    });
  };

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    setIsHovered(false);
    cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'transform 100ms ease-out' : 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`
        relative rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60
        shadow-[0_20px_50px_rgba(15,41,30,0.08),0_1px_3px_rgba(0,0,0,0.05)]
        overflow-hidden will-change-transform group ${className}
      `}
    >
      {/* Specular Light Sheen Overlay */}
      {!isTouchDevice && (
        <div
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] overflow-hidden transition-opacity duration-300"
          style={{ opacity: glarePos.opacity }}
          aria-hidden="true"
        >
          <div
            className="absolute -inset-full w-[300%] h-[300%] pointer-events-none"
            style={{
              background: `radial-gradient(circle 380px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.1) 40%, transparent 75%)`,
              mixBlendMode: 'overlay',
            }}
          />
        </div>
      )}

      {/* macOS Traffic Lights Header */}
      {showTrafficLights && (
        <div className="relative z-10 flex items-center justify-between px-4 py-2.5 border-b border-black/[0.06] bg-black/[0.02]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-2xs" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-2xs" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-2xs" />
          </div>

          {(title || subtitle) && (
            <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 truncate">
              {title && <span className="font-semibold text-slate-700">{title}</span>}
              {subtitle && <span className="opacity-70">({subtitle})</span>}
            </div>
          )}

          <div className="w-8" />
        </div>
      )}

      {/* Card Body */}
      <div className="relative z-10 p-4 sm:p-6">
        {children}
      </div>
    </div>
  );
};
