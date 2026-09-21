/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SCALORA HAND-DRAWN SVG ARROW & CONFETTI CELEBRATION
 * 1. Curved hand-drawn SVG arrow with handwritten cursive note pointing to CTA
 * 2. On click / submit:
 *    - Triggers button shake micro-animation (.animate-shake)
 *    - Switches button icon to green checkmark
 *    - Fires celebratory confetti blast via canvas-confetti
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

interface HandDrawnArrowCTAProps {
  label?: string;
  handwrittenNote?: string;
  onClick?: () => void;
  className?: string;
  arrowPosition?: 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right';
}

export const HandDrawnArrowCTA: React.FC<HandDrawnArrowCTAProps> = ({
  label = 'Khám Phá Mô Hình 3D Ngay',
  handwrittenNote = 'Bấm vào đây để bắt đầu! ✨',
  onClick,
  className = '',
  arrowPosition = 'top-right',
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 1. Button shake micro-animation
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    // 2. Success state
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 2400);

    // 3. Canvas confetti celebration
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    try {
      // Primary burst
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { x, y },
        colors: ['#16A34A', '#22C55E', '#86EFAC', '#F59E0B', '#3B82F6', '#EC4899'],
        ticks: 200,
        gravity: 1.1,
        scalar: 0.9,
      });

      // Secondary festive star shower
      setTimeout(() => {
        confetti({
          particleCount: 35,
          angle: 60,
          spread: 55,
          origin: { x: Math.max(0.1, x - 0.1), y },
          colors: ['#10B981', '#FBBF24', '#60A5FA'],
          shapes: ['star', 'circle'],
        });
        confetti({
          particleCount: 35,
          angle: 120,
          spread: 55,
          origin: { x: Math.min(0.9, x + 0.1), y },
          colors: ['#10B981', '#FBBF24', '#60A5FA'],
          shapes: ['star', 'circle'],
        });
      }, 150);
    } catch {
      // Fallback if canvas-confetti has restrictions
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Hand-drawn SVG Arrow & Note */}
      {arrowPosition === 'top-right' && (
        <div className="absolute -top-12 -right-16 sm:-right-24 pointer-events-none hidden sm:flex items-center gap-1 z-20">
          <span className="font-handwriting text-xl sm:text-2xl font-bold text-emerald-800 -rotate-6 whitespace-nowrap drop-shadow-2xs select-none">
            {handwrittenNote}
          </span>
          {/* Curved Hand-drawn SVG Arrow pointing down-left toward button */}
          <svg
            className="w-10 h-10 text-emerald-700 -rotate-12 translate-y-2 select-none"
            viewBox="0 0 50 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 40 10 Q 30 35 12 38" />
            <path d="M 12 38 L 22 32" />
            <path d="M 12 38 L 20 44" />
          </svg>
        </div>
      )}

      {arrowPosition === 'top-left' && (
        <div className="absolute -top-12 -left-16 sm:-left-24 pointer-events-none hidden sm:flex items-center gap-1 z-20">
          {/* Curved Hand-drawn SVG Arrow pointing down-right toward button */}
          <svg
            className="w-10 h-10 text-emerald-700 rotate-12 translate-y-2 select-none"
            viewBox="0 0 50 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 10 10 Q 20 35 38 38" />
            <path d="M 38 38 L 28 32" />
            <path d="M 38 38 L 30 44" />
          </svg>
          <span className="font-handwriting text-xl sm:text-2xl font-bold text-emerald-800 rotate-6 whitespace-nowrap drop-shadow-2xs select-none">
            {handwrittenNote}
          </span>
        </div>
      )}

      {/* Main Interactive Button with Shake & Confetti */}
      <button
        onClick={handleClick}
        className={`
          interactable relative group px-6 py-3.5 rounded-xl font-medium text-sm sm:text-base
          transition-all duration-200 shadow-md hover:shadow-xl active:scale-95
          flex items-center gap-2.5 cursor-pointer select-none
          ${isShaking ? 'animate-shake' : ''}
          ${
            isSuccess
              ? 'bg-emerald-600 text-white ring-4 ring-emerald-400/40 shadow-emerald-600/30'
              : 'bg-[#0F291E] text-white hover:bg-[#163c2c] active:bg-[#0c2017]'
          }
        `}
      >
        {isSuccess ? (
          <>
            <div className="w-5 h-5 rounded-full bg-white text-emerald-700 flex items-center justify-center animate-bounce">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="font-semibold tracking-wide">Tuyệt Vời! Đang Mở...</span>
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '2s' }} />
          </>
        ) : (
          <>
            <span className="tracking-wide font-medium">{label}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </div>
  );
};
