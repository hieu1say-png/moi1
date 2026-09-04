/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TEACHER THẦY HIẾU AI - VECTOR AVATAR (8 STATES)
 * Cel-shading anime style, STEM lab coat, modern glasses, high-performance SVG.
 */

import React from 'react';
import { TeacherAvatarState } from './types';

export interface TeacherAvatarProps {
  state?: TeacherAvatarState;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isSpeaking?: boolean;
  className?: string;
  onClick?: () => void;
  showBadge?: boolean;
}

export const TeacherAvatar: React.FC<TeacherAvatarProps> = ({
  state = 'IDLE',
  size = 'md',
  isSpeaking = false,
  className = '',
  onClick,
  showBadge = false
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  // Expression variations
  const renderEyes = () => {
    switch (state) {
      case 'THINKING':
        // Eyes looking upward/thoughtful
        return (
          <g id="avatar-eyes-thinking">
            {/* Left Eye */}
            <ellipse cx="40" cy="42" rx="4.5" ry="5" fill="#2C3E50" />
            <circle cx="41.5" cy="40" r="1.8" fill="#FFFFFF" />
            {/* Right Eye */}
            <ellipse cx="60" cy="42" rx="4.5" ry="5" fill="#2C3E50" />
            <circle cx="61.5" cy="40" r="1.8" fill="#FFFFFF" />
            {/* Eyebrows */}
            <path d="M34 35 Q40 33 46 36" stroke="#4A3B32" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M54 36 Q60 33 66 35" stroke="#4A3B32" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'HINT':
        // One eyebrow raised playfully
        return (
          <g id="avatar-eyes-hint">
            <ellipse cx="40" cy="44" rx="4.5" ry="5" fill="#2C3E50" />
            <circle cx="41.5" cy="42.5" r="1.8" fill="#FFFFFF" />
            <ellipse cx="60" cy="44" rx="4.5" ry="5" fill="#2C3E50" />
            <circle cx="61.5" cy="42.5" r="1.8" fill="#FFFFFF" />
            {/* Left eyebrow normal, Right eyebrow raised */}
            <path d="M34 37 Q40 36 46 38" stroke="#4A3B32" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M54 34 Q60 30 66 33" stroke="#4A3B32" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'ERROR':
        // Warm encouraging eyes (crescent closed or gentle smile)
        return (
          <g id="avatar-eyes-error">
            <path d="M35 44 Q40 40 45 44" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M55 44 Q60 40 65 44" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Gentle eyebrows */}
            <path d="M35 37 Q40 35 45 37" stroke="#4A3B32" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M55 37 Q60 35 65 37" stroke="#4A3B32" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'SUCCESS':
      case 'CELEBRATING':
        // Sparkling happy crescent eyes
        return (
          <g id="avatar-eyes-happy">
            <path d="M34 43 Q40 37 46 43" stroke="#2C3E50" strokeWidth="2.8" strokeLinecap="round" fill="none" />
            <path d="M54 43 Q60 37 66 43" stroke="#2C3E50" strokeWidth="2.8" strokeLinecap="round" fill="none" />
            <path d="M34 34 Q40 32 46 34" stroke="#4A3B32" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M54 34 Q60 32 66 34" stroke="#4A3B32" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        );

      default:
        // IDLE, POINTING, EXPLAINING
        return (
          <g id="avatar-eyes-default">
            <ellipse cx="40" cy="44" rx="4.5" ry="5.2" fill="#2C3E50" />
            <circle cx="41.5" cy="42" r="1.8" fill="#FFFFFF" />
            <circle cx="38.5" cy="46" r="0.9" fill="#FFFFFF" />
            <ellipse cx="60" cy="44" rx="4.5" ry="5.2" fill="#2C3E50" />
            <circle cx="61.5" cy="42" r="1.8" fill="#FFFFFF" />
            <circle cx="58.5" cy="46" r="0.9" fill="#FFFFFF" />
            {/* Eyebrows */}
            <path d="M34 36 Q40 34 46 36" stroke="#4A3B32" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M54 36 Q60 34 66 36" stroke="#4A3B32" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        );
    }
  };

  const renderMouth = () => {
    if (isSpeaking) {
      return (
        <path
          d="M44 54 Q50 62 56 54 Z"
          fill="#D9534F"
          stroke="#9E2A2B"
          strokeWidth="1.5"
          className="animate-pulse"
        />
      );
    }

    switch (state) {
      case 'THINKING':
        return <path d="M46 54 Q50 53 54 54" stroke="#B05B48" strokeWidth="2" strokeLinecap="round" fill="none" />;
      case 'HINT':
        return <path d="M45 53 Q50 57 55 53" stroke="#B05B48" strokeWidth="2.2" strokeLinecap="round" fill="none" />;
      case 'ERROR':
        return <path d="M44 54 Q50 58 56 54" stroke="#B05B48" strokeWidth="2" strokeLinecap="round" fill="none" />;
      case 'SUCCESS':
      case 'CELEBRATING':
        return (
          <path d="M43 52 Q50 62 57 52" stroke="#B05B48" strokeWidth="2.2" strokeLinecap="round" fill="#FFFFFF" />
        );
      default:
        return <path d="M45 54 Q50 58 55 54" stroke="#B05B48" strokeWidth="2" strokeLinecap="round" fill="none" />;
    }
  };

  const renderGesture = () => {
    switch (state) {
      case 'THINKING':
        // Hand touching chin
        return (
          <g id="gesture-thinking">
            <ellipse cx="62" cy="62" rx="6" ry="5" fill="#FDDCB8" stroke="#E6A875" strokeWidth="1.2" />
            <path d="M58 60 Q62 54 64 57" stroke="#E6A875" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'POINTING':
        // Hand pointing forward/up with laser/pointer
        return (
          <g id="gesture-pointing">
            {/* Arm sleeve */}
            <path d="M72 75 L86 52 L92 56 L78 82 Z" fill="#F0F4F8" stroke="#CBD5E1" strokeWidth="1.5" />
            {/* Hand pointing */}
            <circle cx="88" cy="50" r="5" fill="#FDDCB8" />
            {/* Index finger */}
            <path d="M88 50 L98 34" stroke="#FDDCB8" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M88 50 L98 34" stroke="#E6A875" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            {/* Sparkle on fingertip */}
            <circle cx="99" cy="33" r="3" fill="#FFB703" className="animate-ping" />
            <circle cx="99" cy="33" r="2" fill="#FB8500" />
          </g>
        );

      case 'EXPLAINING':
        // Hand holding academic ruler/pointer
        return (
          <g id="gesture-explaining">
            {/* Arm sleeve */}
            <path d="M72 75 L84 56 L90 60 L78 82 Z" fill="#F0F4F8" stroke="#CBD5E1" strokeWidth="1.5" />
            {/* Hand */}
            <circle cx="86" cy="56" r="5" fill="#FDDCB8" />
            {/* STEM Ruler / pointer */}
            <line x1="78" y1="68" x2="98" y2="28" stroke="#FB8500" strokeWidth="3" strokeLinecap="round" />
            <line x1="86" y1="52" x2="88" y2="48" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="90" y1="44" x2="92" y2="40" stroke="#FFFFFF" strokeWidth="1" />
          </g>
        );

      case 'SUCCESS':
        // Thumbs UP!
        return (
          <g id="gesture-thumbsup">
            <path d="M72 75 L82 58 L88 62 L78 82 Z" fill="#F0F4F8" stroke="#CBD5E1" strokeWidth="1.5" />
            <circle cx="84" cy="56" r="6" fill="#FDDCB8" />
            {/* Thumb */}
            <path d="M84 56 L85 43 Q87 42 89 44 L87 56" fill="#FDDCB8" stroke="#E6A875" strokeWidth="1.2" />
            {/* Thumbs up sparkle */}
            <path d="M85 36 L86 38 L88 39 L86 40 L85 42 L84 40 L82 39 L84 38 Z" fill="#FFB703" />
          </g>
        );

      case 'CELEBRATING':
        // Clapping hands with star bursts
        return (
          <g id="gesture-celebrating">
            {/* Left Hand */}
            <circle cx="40" cy="70" r="5.5" fill="#FDDCB8" stroke="#E6A875" strokeWidth="1.2" />
            {/* Right Hand */}
            <circle cx="58" cy="70" r="5.5" fill="#FDDCB8" stroke="#E6A875" strokeWidth="1.2" />
            {/* Celebration stars */}
            <path d="M49 60 L50 63 L53 64 L50 65 L49 68 L48 65 L45 64 L48 63 Z" fill="#FB8500" />
            <circle cx="32" cy="62" r="1.5" fill="#FFB703" />
            <circle cx="68" cy="62" r="1.5" fill="#FFB703" />
          </g>
        );

      default:
        // Relaxed hands
        return null;
    }
  };

  return (
    <div
      id="teacher-avatar-container"
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none ${sizeMap[size]} ${className} ${
        onClick ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
      }`}
      role="img"
      aria-label={`Thầy Hiếu AI - Trạng thái ${state}`}
    >
      {/* Background Soft Glow Ring */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-300 ${
          isSpeaking
            ? 'ring-4 ring-orange-400/50 bg-orange-50 shadow-md scale-105'
            : state === 'SUCCESS' || state === 'CELEBRATING'
            ? 'ring-3 ring-emerald-400/50 bg-emerald-50'
            : state === 'HINT'
            ? 'ring-3 ring-amber-400/50 bg-amber-50'
            : state === 'POINTING'
            ? 'ring-3 ring-sky-400/50 bg-sky-50'
            : 'ring-2 ring-slate-200 bg-white'
        }`}
      />

      {/* SVG Vector Graphic */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full relative z-10 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3E2723" />
            <stop offset="100%" stopColor="#1B120C" />
          </linearGradient>
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE0BD" />
            <stop offset="100%" stopColor="#FCD5A8" />
          </linearGradient>
          <linearGradient id="coatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <linearGradient id="tieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
        </defs>

        {/* 1. Body & STEM Lab Coat */}
        <g id="avatar-body">
          {/* Orange Inner Shirt Collar */}
          <path d="M42 66 L50 78 L58 66 Z" fill="url(#tieGrad)" />
          {/* Blue Tie / Badge clip */}
          <path d="M48 74 L52 74 L51 88 L49 88 Z" fill="#0284C7" />
          {/* White Lab Coat */}
          <path
            d="M26 84 C26 72 34 68 42 67 L50 78 L58 67 C66 68 74 72 74 84 L76 96 L24 96 Z"
            fill="url(#coatGrad)"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          {/* Lab Coat Lapels */}
          <path d="M42 67 L34 82 L42 83 L47 73" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
          <path d="M58 67 L66 82 L58 83 L53 73" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
          {/* STEM Pocket Pen */}
          <rect x="33" y="77" width="2" height="6" rx="1" fill="#0284C7" />
          <rect x="36" y="77" width="2" height="6" rx="1" fill="#EA580C" />
        </g>

        {/* 2. Neck */}
        <path d="M43 56 L43 68 L57 68 L57 56 Z" fill="url(#skinGrad)" stroke="#E6A875" strokeWidth="0.8" />

        {/* 3. Head & Face */}
        <path
          d="M32 40 C32 26 68 26 68 40 C68 54 60 62 50 62 C40 62 32 54 32 40 Z"
          fill="url(#skinGrad)"
          stroke="#E6A875"
          strokeWidth="1.2"
        />

        {/* Ears */}
        <ellipse cx="32" cy="43" rx="3.5" ry="5.5" fill="url(#skinGrad)" stroke="#E6A875" strokeWidth="1" />
        <ellipse cx="68" cy="43" rx="3.5" ry="5.5" fill="url(#skinGrad)" stroke="#E6A875" strokeWidth="1" />

        {/* Blush Cheeks */}
        <circle cx="37" cy="48" r="3.5" fill="#FF8A8A" opacity="0.4" />
        <circle cx="63" cy="48" r="3.5" fill="#FF8A8A" opacity="0.4" />

        {/* 4. Eyes & Eyebrows */}
        {renderEyes()}

        {/* Nose */}
        <path d="M50 44 L48.5 49 L51.5 49" stroke="#E6A875" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Mouth */}
        {renderMouth()}

        {/* 5. Modern Smart Glasses */}
        <g id="avatar-glasses">
          {/* Left Lens Frame */}
          <rect x="33" y="36" width="14" height="13" rx="3.5" fill="none" stroke="#2563EB" strokeWidth="1.8" />
          {/* Right Lens Frame */}
          <rect x="53" y="36" width="14" height="13" rx="3.5" fill="none" stroke="#2563EB" strokeWidth="1.8" />
          {/* Bridge */}
          <path d="M47 41 L53 41" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" />
          {/* Side arms */}
          <path d="M33 40 L30 39" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M67 40 L70 39" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
          {/* Subtle Lens Reflection */}
          <line x1="35" y1="38" x2="39" y2="46" stroke="#93C5FD" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
          <line x1="55" y1="38" x2="59" y2="46" stroke="#93C5FD" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
        </g>

        {/* 6. Hair (Anime / Stylized Cel-shaded) */}
        <g id="avatar-hair">
          <path
            d="M30 38 C28 22 42 16 50 16 C60 16 72 22 70 38 C70 38 67 28 58 26 C53 25 47 27 42 29 C38 31 34 35 30 38 Z"
            fill="url(#hairGrad)"
          />
          {/* Front bangs */}
          <path d="M35 28 Q42 34 40 37 Q46 31 52 35 Q50 28 62 33 Q56 25 48 24 Z" fill="url(#hairGrad)" />
          {/* Hair shine */}
          <path d="M42 20 Q50 18 58 21" stroke="#8D6E63" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </g>

        {/* 7. Active Gestures */}
        {renderGesture()}
      </svg>

      {/* Optional Badge */}
      {showBadge && (
        <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-orange-500 text-white font-black text-[9px] rounded-full shadow-2xs border border-white">
          AI
        </span>
      )}
    </div>
  );
};
