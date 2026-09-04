/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - GEOMETRIC PARTICLE & MATHEMATICAL FIELD
 * Ambient floating math symbols (π, r, h, V, S, Δ, √) and geometric shapes (○, △, □)
 * Features pointer repulsion, floating drift, GPU-accelerated transform3d, and reduced-motion support.
 * Pure presentation - strictly pointer-events-none.
 */

import React, { useEffect, useRef, useState, useMemo } from 'react';

interface Particle {
  id: number;
  symbol: string;
  type: 'symbol' | 'shape';
  baseX: number; // percentage 0-100
  baseY: number; // percentage 0-100
  size: number; // px font or radius
  color: string;
  speed: number;
  floatAngle: number;
  opacity: number;
  shapeType?: 'circle' | 'triangle' | 'square' | 'ring';
}

const MATH_SYMBOLS = ['π', 'r', 'h', 'V', 'S', 'Δ', 'l', 'R', '2πr', 'h²'];
const THEME_COLORS = [
  'rgba(237, 128, 111, 0.45)', // Coral (Hình Trụ)
  'rgba(224, 122, 95, 0.45)',  // Terracotta (Hình Nón)
  'rgba(159, 181, 150, 0.45)', // Sage (Hình Cầu)
  'rgba(183, 162, 214, 0.40)', // Lavender (Toán học)
  'rgba(215, 168, 93, 0.40)',  // Gold / Amber
];

export const GeometricParticleField: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check touch and reduced motion preferences on mount
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

  // Generate deterministic particles
  const particles = useMemo<Particle[]>(() => {
    // 22 particles on desktop, 8 on mobile/touch
    const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 22;
    const items: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const isSymbol = i % 2 === 0;
      const symbol = MATH_SYMBOLS[i % MATH_SYMBOLS.length];
      const color = THEME_COLORS[i % THEME_COLORS.length];
      const shapeTypes: Particle['shapeType'][] = ['circle', 'ring', 'triangle', 'square'];

      items.push({
        id: i,
        symbol,
        type: isSymbol ? 'symbol' : 'shape',
        baseX: 5 + (i * 92) / count + (Math.sin(i * 3.7) * 4),
        baseY: 8 + ((i * 37) % 84) + (Math.cos(i * 2.1) * 5),
        size: isSymbol ? 13 + (i % 4) * 3 : 10 + (i % 3) * 6,
        color,
        speed: 18 + (i % 5) * 6,
        floatAngle: (i * 45) % 360,
        opacity: 0.25 + (i % 3) * 0.15,
        shapeType: shapeTypes[i % shapeTypes.length],
      });
    }
    return items;
  }, []);

  // Mouse position with smooth damping for pointer repulsion
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particleElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isTouchDevice || isReducedMotion) return;

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

    const updatePhysics = () => {
      const mouse = mouseRef.current;
      const repulsionRadius = 220; // Radius of repulsion effect
      const repulsionStrength = 32;

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
          const force = (1 - dist / repulsionRadius) * repulsionStrength;
          targetOffsetX = (dx / dist) * force;
          targetOffsetY = (dy / dist) * force;
        }

        // LERP for smooth spring recovery
        offsets[idx].currentX += (targetOffsetX - offsets[idx].currentX) * 0.1;
        offsets[idx].currentY += (targetOffsetY - offsets[idx].currentY) * 0.1;

        el.style.transform = `translate3d(${offsets[idx].currentX.toFixed(2)}px, ${offsets[idx].currentY.toFixed(2)}px, 0)`;
      });

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particles, isTouchDevice, isReducedMotion]);

  return (
    <div
      ref={containerRef}
      id="geometric-particle-field"
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {particles.map((p, idx) => {
        return (
          <div
            key={p.id}
            ref={(el) => {
              particleElementsRef.current[idx] = el;
            }}
            className="absolute transition-transform duration-75 will-change-transform"
            style={{
              left: `${p.baseX}%`,
              top: `${p.baseY}%`,
              opacity: p.opacity,
            }}
          >
            {/* Inner floating animation wrapper */}
            <div
              className={`flex items-center justify-center font-serif font-bold ${
                !isReducedMotion ? 'animate-float-math' : ''
              }`}
              style={{
                animationDuration: `${p.speed}s`,
                animationDelay: `${-(p.id * 1.7)}s`,
                color: p.color,
                fontSize: `${p.size}px`,
              }}
            >
              {p.type === 'symbol' ? (
                <span className="select-none tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  {p.symbol}
                </span>
              ) : (
                <svg
                  width={p.size}
                  height={p.size}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={p.color}
                  strokeWidth="1.75"
                  className="opacity-80"
                >
                  {p.shapeType === 'circle' && (
                    <circle cx="12" cy="12" r="9" fill={p.color} fillOpacity="0.15" />
                  )}
                  {p.shapeType === 'ring' && (
                    <circle cx="12" cy="12" r="8" strokeDasharray="3 3" />
                  )}
                  {p.shapeType === 'triangle' && (
                    <polygon
                      points="12 4 20 20 4 20"
                      fill={p.color}
                      fillOpacity="0.12"
                    />
                  )}
                  {p.shapeType === 'square' && (
                    <rect
                      x="5"
                      y="5"
                      width="14"
                      height="14"
                      rx="3"
                      fill={p.color}
                      fillOpacity="0.12"
                    />
                  )}
                </svg>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
