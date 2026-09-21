/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SCALORA & APPLE-GRADE CUSTOM MOUSE CURSOR ENGINE
 * 1. .cursor-dot: 6px precise center dot that instantly tracks clientX / clientY
 * 2. .cursor-circle: 32px inertia circle following via requestAnimationFrame with lerp = 0.15
 * 3. On hover over interactive elements (button, input, link, sticky note):
 *    expands to 58px with subtle border, backdrop blur (2px)
 * 4. Auto-disabled on touch & coarse pointer devices (pointer: coarse)
 */

import React, { useEffect, useRef, useState } from 'react';

export const CustomDualCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Raw mouse coordinates (instant)
  const mousePos = useRef({ x: -100, y: -100 });
  // Lagging inertia coordinates
  const circlePos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Defensive touch / coarse pointer check
    const checkTouch = () => {
      const isCoarse =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(hover: none)').matches;
      setIsTouchDevice(isCoarse);
      return isCoarse;
    };

    if (checkTouch()) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instant exact positioning for 6px dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      // Check if hovering over interactive elements (formulas, shapes, buttons, sliders, cards)
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest(
            'a, button, input, textarea, select, [role="button"], .interactable, .interactive-card, .cursor-pointer, .sticky-note, [data-interactive="true"], .clickable, .math-formula, .katex, svg, canvas, .math-display, .shape-card, .interactive-shape, .slider, input[type="range"], .tab-button, [data-shape], .specular-glass, .math-lab-interactive'
          )
        );
        setIsHovered(interactive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Inertia physics loop using Linear Interpolation (lerp = 0.15)
    const animateCircle = () => {
      const lerp = 0.15;
      circlePos.current.x += (mousePos.current.x - circlePos.current.x) * lerp;
      circlePos.current.y += (mousePos.current.y - circlePos.current.y) * lerp;

      if (circleRef.current) {
        circleRef.current.style.transform = `translate3d(${circlePos.current.x}px, ${circlePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animateCircle);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    rafId.current = requestAnimationFrame(animateCircle);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* 1. Precise Center Dot (6px) */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          transform: `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`,
        }}
      />

      {/* 2. Lagging Inertia Circle (32px -> 58px on hover with lerp 0.15) */}
      <div
        ref={circleRef}
        className={`cursor-circle ${isHovered ? 'cursor-hover' : ''}`}
        style={{
          transform: `translate3d(${circlePos.current.x}px, ${circlePos.current.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </div>
  );
};
