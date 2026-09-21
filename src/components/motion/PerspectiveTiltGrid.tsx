/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SCALORA 3D PERSPECTIVE TILT GRID BACKGROUND
 * 1. Background grid layer .grid-bg with 40px 40px gradient
 * 2. Placed inside perspective(500px) container
 * 3. Mouse ratio percentX, percentY from center [-1, 1] to rotateX, rotateY and translateX, translateY
 */

import React, { useEffect, useRef, useState } from 'react';

export const PerspectiveTiltGrid: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const targetAngles = useRef({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const currentAngles = useRef({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkTouch = () => {
      const isCoarse =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 768;
      setIsTouchDevice(isCoarse);
      return isCoarse;
    };

    if (checkTouch()) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      // Calculate normalized ratio from center [-1, 1]
      const percentX = (e.clientX - cx) / (cx || 1);
      const percentY = (e.clientY - cy) / (cy || 1);

      // 3D Tilt parameters (Scalora spec: rotateX, rotateY and subtle translation)
      targetAngles.current.rx = -percentY * 5; // degrees
      targetAngles.current.ry = percentX * 5;  // degrees
      targetAngles.current.tx = -percentX * 12; // px
      targetAngles.current.ty = -percentY * 12; // px
    };

    // Smooth inertia interpolation loop
    const animate = () => {
      const ease = 0.08;
      currentAngles.current.rx += (targetAngles.current.rx - currentAngles.current.rx) * ease;
      currentAngles.current.ry += (targetAngles.current.ry - currentAngles.current.ry) * ease;
      currentAngles.current.tx += (targetAngles.current.tx - currentAngles.current.tx) * ease;
      currentAngles.current.ty += (targetAngles.current.ty - currentAngles.current.ty) * ease;

      if (gridRef.current) {
        gridRef.current.style.transform = `
          translate3d(${currentAngles.current.tx.toFixed(2)}px, ${currentAngles.current.ty.toFixed(2)}px, 0)
          rotateX(${currentAngles.current.rx.toFixed(2)}deg)
          rotateY(${currentAngles.current.ry.toFixed(2)}deg)
        `;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 grid-bg-container overflow-hidden" aria-hidden="true">
      <div
        ref={gridRef}
        className="grid-bg"
      />
    </div>
  );
};
