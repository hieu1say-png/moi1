/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - GEOMETRIC PARTICLES COMPONENT
 * Floating ambient math symbols (π, r, h, V, S) and geometric shapes (○, △, □)
 * Features pointer repulsion on desktop, gentle drift, responsive counts, and reduced-motion support.
 * Pure presentation - strictly pointer-events-none.
 */

import React, { useEffect, useRef, useState, useMemo } from 'react';

export interface GeometricParticlesProps {
  enabled?: boolean;
}

interface ParticleData {
  id: number;
  symbol: string;
  type: 'symbol' | 'shape';
  baseX: number; // percentage 0-100
  baseY: number; // percentage 0-100
  size: number;
  color: string;
  speed: number;
  opacity: number;
  shapeType?: 'circle' | 'triangle' | 'square';
}

const MATH_SYMBOLS = ['π', 'r', 'h', 'V', 'S'];
const THEME_COLORS = [
  '#ED806F', // Coral
  '#9FB596', // Sage
  '#E07A5F', // Terracotta
  '#D7A85D', // Gold
  '#B7A2D6', // Lavender
];

export const GeometricParticles: React.FC<GeometricParticlesProps> = ({ enabled = true }) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const particles = useMemo<ParticleData[]>(() => {
    if (typeof window === 'undefined') return [];
    const width = window.innerWidth;
    // Responsive count: Desktop (24), Tablet (16), Mobile (8)
    const count = width >= 1024 ? 24 : width >= 640 ? 16 : 8;
    const items: ParticleData[] = [];

    for (let i = 0; i < count; i++) {
      const isSymbol = i % 2 === 0;
      const symbol = MATH_SYMBOLS[i % MATH_SYMBOLS.length];
      const color = THEME_COLORS[i % THEME_COLORS.length];
      const shapes: ('circle' | 'triangle' | 'square')[] = ['circle', 'triangle', 'square'];

      items.push({
        id: i,
        symbol,
        type: isSymbol ? 'symbol' : 'shape',
        baseX: 4 + (i * 92) / count + (Math.sin(i * 3.5) * 3),
        baseY: 6 + ((i * 37) % 86) + (Math.cos(i * 2.3) * 4),
        size: isSymbol ? 14 + (i % 3) * 4 : 12 + (i % 3) * 4,
        color,
        speed: 5 + (i % 4) * 1.5, // 5s to 9.5s duration
        opacity: 0.16 + (i % 3) * 0.08,
        shapeType: shapes[i % shapes.length],
      });
    }
    return items;
  }, []);

  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particleElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!enabled || isTouchDevice || isReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId: number;
    const offsets = particles.map(() => ({ currentX: 0, currentY: 0 }));

    const updateRepulsion = () => {
      const mouse = mouseRef.current;
      const repulsionRadius = 260;
      const maxDisplacement = 20;

      particles.forEach((p, idx) => {
        const el = particleElementsRef.current[idx];
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const pCenterX = rect.left + rect.width / 2;
        const pCenterY = rect.top + rect.height / 2;

        const dx = pCenterX - mouse.x;
        const dy = pCenterY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetOffsetX = 0;
        let targetOffsetY = 0;

        if (dist < repulsionRadius && dist > 0) {
          const force = (1 - dist / repulsionRadius) * maxDisplacement;
          targetOffsetX = (dx / dist) * force;
          targetOffsetY = (dy / dist) * force;
        }

        offsets[idx].currentX += (targetOffsetX - offsets[idx].currentX) * 0.12;
        offsets[idx].currentY += (targetOffsetY - offsets[idx].currentY) * 0.12;

        el.style.transform = `translate3d(${offsets[idx].currentX.toFixed(2)}px, ${offsets[idx].currentY.toFixed(2)}px, 0)`;
      });

      animationFrameId = requestAnimationFrame(updateRepulsion);
    };

    animationFrameId = requestAnimationFrame(updateRepulsion);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled, particles, isTouchDevice, isReducedMotion]);

  if (!enabled) return null;

  return (
    <div
      id="geometric-particles-container"
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-[1]"
      aria-hidden="true"
    >
      {particles.map((p, idx) => (
        <div
          key={p.id}
          ref={(el) => {
            particleElementsRef.current[idx] = el;
          }}
          className="absolute transition-transform duration-75 will-change-transform"
          style={{
            left: `${p.baseX}%`,
            top: `${p.baseY}%`,
          }}
        >
          <div
            className={`flex items-center justify-center font-serif font-bold ${
              !isReducedMotion ? 'gl-particle-animated' : ''
            }`}
            style={{
              color: p.color,
              fontSize: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.speed}s`,
              animationDelay: `${-(p.id * 0.8)}s`,
            }}
          >
            {p.type === 'symbol' ? (
              <span className="select-none leading-none">{p.symbol}</span>
            ) : (
              <svg
                width={p.size}
                height={p.size}
                viewBox="0 0 24 24"
                fill="none"
                stroke={p.color}
                strokeWidth="2"
              >
                {p.shapeType === 'circle' && (
                  <circle cx="12" cy="12" r="8" fill={p.color} fillOpacity="0.2" />
                )}
                {p.shapeType === 'triangle' && (
                  <polygon points="12 4 21 20 3 20" fill={p.color} fillOpacity="0.2" />
                )}
                {p.shapeType === 'square' && (
                  <rect x="4" y="4" width="16" height="16" rx="2" fill={p.color} fillOpacity="0.2" />
                )}
              </svg>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
