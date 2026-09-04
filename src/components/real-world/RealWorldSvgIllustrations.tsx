/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Real World SVG Illustrations with Mathematical Annotations (r, h, l, d)
 * 100% Inline SVGs - Zero external asset dependency - Ultra Crisp & Responsive
 */

import React from 'react';

interface SvgProps {
  className?: string;
  showAnnotations?: boolean;
}

/**
 * 1. BỒN NƯỚC HÌNH TRỤ (Cylindrical Stainless Steel Water Tank)
 * d = 1.2m, r = 0.6m, h = 1.8m, V = 2035 lít
 */
export const WaterTankSvg: React.FC<SvgProps> = ({
  className = 'w-full h-auto max-h-72',
  showAnnotations = true,
}) => (
  <svg
    id="svg-water-tank"
    viewBox="0 0 400 320"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Tank Metallic Gradient */}
      <linearGradient id="tankBodyGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="25%" stopColor="#e2e8f0" />
        <stop offset="50%" stopColor="#f8fafc" />
        <stop offset="75%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>

      {/* Tank Cap Gradient */}
      <linearGradient id="tankCapGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f1f5f9" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>

      {/* Water Fill Gradient */}
      <linearGradient id="waterFillGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.85" />
      </linearGradient>

      {/* Steel Rib Gradient */}
      <linearGradient id="steelRibGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#64748b" />
        <stop offset="50%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>

      {/* Stand Gradient */}
      <linearGradient id="standGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>

      <filter id="tankShadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Background Soft Glow */}
    <rect x="0" y="0" width="400" height="320" rx="16" fill="#f8fafc" />
    <circle cx="200" cy="150" r="130" fill="#e0f2fe" fillOpacity="0.5" />

    {/* Shadow base */}
    <ellipse cx="200" cy="272" rx="90" ry="14" fill="#cbd5e1" fillOpacity="0.6" />

    {/* Tank Stand (Chân đế thép) */}
    <g id="tank-stand">
      {/* Legs */}
      <path d="M125 240 L105 272 L120 272 L138 240 Z" fill="url(#standGrad)" />
      <path d="M275 240 L295 272 L280 272 L262 240 Z" fill="url(#standGrad)" />
      <path d="M170 240 L160 272 L172 272 L180 240 Z" fill="url(#standGrad)" />
      <path d="M230 240 L240 272 L228 272 L220 240 Z" fill="url(#standGrad)" />
      {/* Horizontal Brace */}
      <rect x="115" y="256" width="170" height="6" rx="3" fill="#334155" />
    </g>

    {/* Tank Main Body Group */}
    <g id="tank-body" filter="url(#tankShadow)">
      {/* Cylinder Body Wall */}
      <rect x="120" y="70" width="160" height="170" fill="url(#tankBodyGrad)" />

      {/* Water Fill Level Simulation (75% full) */}
      <path
        d="M120 120 L280 120 L280 240 C280 252 120 252 120 240 Z"
        fill="url(#waterFillGrad)"
      />
      {/* Water Wave Surface */}
      <ellipse cx="200" cy="120" rx="80" ry="12" fill="#7dd3fc" fillOpacity="0.8" />
      <ellipse cx="200" cy="120" rx="72" ry="9" fill="#bae6fd" fillOpacity="0.9" />

      {/* Stainless Steel Reinforcing Ribs (Gân tăng cứng) */}
      <ellipse cx="200" cy="100" rx="80" ry="12" fill="none" stroke="url(#steelRibGrad)" strokeWidth="3" />
      <ellipse cx="200" cy="140" rx="80" ry="12" fill="none" stroke="url(#steelRibGrad)" strokeWidth="3" />
      <ellipse cx="200" cy="180" rx="80" ry="12" fill="none" stroke="url(#steelRibGrad)" strokeWidth="3" />
      <ellipse cx="200" cy="220" rx="80" ry="12" fill="none" stroke="url(#steelRibGrad)" strokeWidth="3" />

      {/* Bottom Ellipse Cap */}
      <ellipse cx="200" cy="240" rx="80" ry="14" fill="url(#tankCapGrad)" stroke="#64748b" strokeWidth="1.5" />

      {/* Top Ellipse Cap */}
      <ellipse cx="200" cy="70" rx="80" ry="14" fill="url(#tankCapGrad)" stroke="#94a3b8" strokeWidth="1.5" />

      {/* Tank Top Manhole Lid (Nắp bồn nước) */}
      <ellipse cx="200" cy="58" rx="36" ry="7" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
      <ellipse cx="200" cy="54" rx="22" ry="4" fill="#f8fafc" stroke="#475569" strokeWidth="1" />
      <circle cx="200" cy="52" r="3" fill="#0284c7" />

      {/* Brand Badge on Tank */}
      <rect x="165" y="152" width="70" height="22" rx="4" fill="#1e3a8a" />
      <text x="200" y="167" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
        TÂN Á ĐẠI THÀNH
      </text>

      {/* Water Drain Valve (Vòi xả đáy) */}
      <rect x="110" y="234" width="12" height="6" fill="#f59e0b" rx="1" />
      <circle cx="108" cy="237" r="4" fill="#d97706" />
    </g>

    {/* Mathematical Dimension Annotations */}
    {showAnnotations && (
      <g id="tank-annotations" className="text-xs font-mono select-none">
        {/* Height dimension (h = 1.8m) on right */}
        <line x1="300" y1="70" x2="300" y2="240" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="285" y1="70" x2="308" y2="70" stroke="#ef4444" strokeWidth="1.5" />
        <line x1="285" y1="240" x2="308" y2="240" stroke="#ef4444" strokeWidth="1.5" />
        {/* Arrowheads for height */}
        <polygon points="300,70 297,78 303,78" fill="#ef4444" />
        <polygon points="300,240 297,232 303,232" fill="#ef4444" />
        <rect x="306" y="142" width="76" height="24" rx="4" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" />
        <text x="344" y="158" textAnchor="middle" fill="#b91c1c" fontSize="11" fontWeight="bold">
          h = 1.8 m
        </text>

        {/* Diameter / Radius dimension on top (d = 1.2m -> r = 0.6m) */}
        <line x1="120" y1="36" x2="280" y2="36" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="120" y1="30" x2="120" y2="56" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2 2" />
        <line x1="280" y1="30" x2="280" y2="56" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2 2" />
        <line x1="200" y1="30" x2="200" y2="42" stroke="#2563eb" strokeWidth="1.5" />
        {/* Arrowheads for diameter */}
        <polygon points="120,36 128,33 128,39" fill="#2563eb" />
        <polygon points="280,36 272,33 272,39" fill="#2563eb" />
        <rect x="146" y="18" width="108" height="20" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
        <text x="200" y="32" textAnchor="middle" fill="#1d4ed8" fontSize="10" fontWeight="bold">
          d = 1.2 m (r = 0.6 m)
        </text>

        {/* Center axis line */}
        <line x1="200" y1="46" x2="200" y2="246" stroke="#94a3b8" strokeWidth="1" strokeDasharray="5 3 1 3" />
        <circle cx="200" cy="70" r="3" fill="#2563eb" />
        <text x="208" y="74" fill="#1e40af" fontSize="10" fontWeight="bold">O</text>
      </g>
    )}
  </svg>
);

/**
 * 2. LON NƯỚC NGỌT NHÔM 330ml (Soda Can)
 * V = 330 cm³, h = 11.5 cm -> r ≈ 3.02 cm
 */
export const SodaCanSvg: React.FC<SvgProps> = ({
  className = 'w-full h-auto max-h-72',
  showAnnotations = true,
}) => (
  <svg
    id="svg-soda-can"
    viewBox="0 0 400 320"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="canBodyGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#991b1b" />
        <stop offset="20%" stopColor="#dc2626" />
        <stop offset="40%" stopColor="#ef4444" />
        <stop offset="60%" stopColor="#f87171" />
        <stop offset="80%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#7f1d1d" />
      </linearGradient>

      <linearGradient id="canAluGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="30%" stopColor="#f1f5f9" />
        <stop offset="70%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>

      <linearGradient id="canGlossGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>

      <filter id="canShadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#000000" floodOpacity="0.2" />
      </filter>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="400" height="320" rx="16" fill="#f8fafc" />
    <circle cx="200" cy="160" r="120" fill="#fee2e2" fillOpacity="0.5" />

    {/* Soft Shadow */}
    <ellipse cx="200" cy="276" rx="65" ry="12" fill="#cbd5e1" fillOpacity="0.7" />

    {/* Can Container */}
    <g id="soda-can-body" filter="url(#canShadow)">
      {/* Bottom Rim (aluminum bevel) */}
      <path
        d="M148 248 L154 262 C154 270 246 270 246 262 L252 248 Z"
        fill="url(#canAluGrad)"
        stroke="#64748b"
        strokeWidth="1"
      />
      <ellipse cx="200" cy="262" rx="46" ry="6" fill="#94a3b8" />

      {/* Main Cylindrical Body */}
      <rect x="144" y="80" width="112" height="170" fill="url(#canBodyGrad)" />

      {/* Top Bevel (neck-in) */}
      <path
        d="M144 80 L152 64 C152 56 248 56 248 64 L256 80 Z"
        fill="url(#canAluGrad)"
        stroke="#64748b"
        strokeWidth="1"
      />

      {/* Can Top Lid */}
      <ellipse cx="200" cy="62" rx="48" ry="10" fill="url(#canAluGrad)" stroke="#475569" strokeWidth="1.5" />
      <ellipse cx="200" cy="62" rx="38" ry="7" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />

      {/* Pull Tab Ring (Khoen mở lon) */}
      <rect x="190" y="58" width="20" height="8" rx="3" fill="#e2e8f0" stroke="#334155" strokeWidth="1" />
      <circle cx="202" cy="62" r="2.5" fill="#334155" />
      <rect x="193" y="60" width="8" height="4" rx="1.5" fill="#64748b" />

      {/* Vertical Gloss Reflection */}
      <rect x="174" y="80" width="18" height="170" fill="url(#canGlossGrad)" />

      {/* Soda Dynamic Graphic Wave */}
      <path
        d="M144 140 Q 170 125, 200 145 T 256 130 L 256 160 Q 230 175, 200 155 T 144 170 Z"
        fill="#ffffff"
        fillOpacity="0.85"
      />

      {/* Text Label */}
      <text x="200" y="152" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">
        FRESH COLA
      </text>

      <rect x="180" y="195" width="40" height="18" rx="9" fill="#ffffff" fillOpacity="0.9" />
      <text x="200" y="208" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
        330 ml
      </text>

      {/* Ice Bubbles / Droplets */}
      <circle cx="160" cy="110" r="2.5" fill="#ffffff" fillOpacity="0.8" />
      <circle cx="163" cy="120" r="1.5" fill="#ffffff" fillOpacity="0.7" />
      <circle cx="240" cy="175" r="2" fill="#ffffff" fillOpacity="0.8" />
      <circle cx="236" cy="188" r="3" fill="#ffffff" fillOpacity="0.9" />
    </g>

    {/* Annotations */}
    {showAnnotations && (
      <g id="soda-annotations" className="text-xs font-mono select-none">
        {/* Height dimension (h = 11.5 cm) */}
        <line x1="274" y1="62" x2="274" y2="262" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="262" y1="62" x2="282" y2="62" stroke="#dc2626" strokeWidth="1.5" />
        <line x1="262" y1="262" x2="282" y2="262" stroke="#dc2626" strokeWidth="1.5" />
        <polygon points="274,62 271,70 277,70" fill="#dc2626" />
        <polygon points="274,262 271,254 277,254" fill="#dc2626" />
        <rect x="282" y="150" width="88" height="24" rx="4" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" />
        <text x="326" y="166" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">
          h = 11.5 cm
        </text>

        {/* Radius annotation (r ≈ 3.02 cm) */}
        <line x1="200" y1="36" x2="248" y2="36" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="200" y1="30" x2="200" y2="62" stroke="#2563eb" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="248" y1="30" x2="248" y2="62" stroke="#2563eb" strokeWidth="1" strokeDasharray="2 2" />
        <polygon points="248,36 240,33 240,39" fill="#2563eb" />
        <polygon points="200,36 208,33 208,39" fill="#2563eb" />
        <rect x="180" y="18" width="90" height="20" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
        <text x="225" y="32" textAnchor="middle" fill="#1d4ed8" fontSize="10" fontWeight="bold">
          r ≈ 3.02 cm
        </text>

        {/* Volume badge */}
        <rect x="30" y="135" width="96" height="42" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
        <text x="78" y="152" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">DUNG TÍCH (V)</text>
        <text x="78" y="169" textAnchor="middle" fill="#0284c7" fontSize="12" fontWeight="bold">330 cm³</text>
      </g>
    )}
  </svg>
);

/**
 * 3. NÚI MUỐI HÌNH NÓN (Conical Salt Mound / Heap)
 * Chu vi C = 12.56m -> r = 2m, h = 1.5m, V = 6.28 m³, m = 7.536 tấn
 */
export const SaltMoundSvg: React.FC<SvgProps> = ({
  className = 'w-full h-auto max-h-72',
  showAnnotations = true,
}) => (
  <svg
    id="svg-salt-mound"
    viewBox="0 0 400 320"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Sun / Sky Gradient */}
      <linearGradient id="saltSkyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fed7aa" />
        <stop offset="60%" stopColor="#fef3c7" />
        <stop offset="100%" stopColor="#f8fafc" />
      </linearGradient>

      {/* Salt Mound Cone Gradient */}
      <linearGradient id="saltConeGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#cbd5e1" />
        <stop offset="35%" stopColor="#f8fafc" />
        <stop offset="60%" stopColor="#ffffff" />
        <stop offset="85%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>

      <linearGradient id="saltFieldGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>

      <filter id="saltShadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Background Sky & Salt Field */}
    <rect x="0" y="0" width="400" height="320" rx="16" fill="url(#saltSkyGrad)" />
    
    {/* Sun */}
    <circle cx="70" cy="65" r="28" fill="#f59e0b" fillOpacity="0.4" />
    <circle cx="70" cy="65" r="20" fill="#fbbf24" />

    {/* Salt Field Ground (Ruộng muối) */}
    <path d="M0 240 L400 240 L400 320 L0 320 Z" fill="url(#saltFieldGrad)" />
    <ellipse cx="200" cy="245" rx="150" ry="24" fill="#64748b" fillOpacity="0.3" />

    {/* Water reflection mirror in salt field */}
    <ellipse cx="200" cy="275" rx="160" ry="14" fill="#93c5fd" fillOpacity="0.25" />

    {/* Background smaller salt mound */}
    <g opacity="0.6">
      <path d="M60 240 L100 180 L140 240 Z" fill="url(#saltConeGrad)" />
      <ellipse cx="100" cy="240" rx="40" ry="8" fill="#e2e8f0" />
    </g>
    <g opacity="0.6">
      <path d="M280 240 L320 185 L360 240 Z" fill="url(#saltConeGrad)" />
      <ellipse cx="320" cy="240" rx="40" ry="8" fill="#e2e8f0" />
    </g>

    {/* Main Salt Mound (Khối nón chính) */}
    <g id="main-salt-mound" filter="url(#saltShadow)">
      {/* Cone Body */}
      <path d="M80 240 L200 80 L320 240 Z" fill="url(#saltConeGrad)" />

      {/* Base Ellipse (Đáy nón) */}
      <ellipse cx="200" cy="240" rx="120" ry="22" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* Sparkles / Salt Crystals Texture */}
      <circle cx="180" cy="140" r="2" fill="#ffffff" />
      <circle cx="215" cy="120" r="2.5" fill="#ffffff" />
      <circle cx="160" cy="190" r="2" fill="#ffffff" />
      <circle cx="230" cy="180" r="3" fill="#ffffff" />
      <circle cx="250" cy="210" r="2" fill="#ffffff" />
      <circle cx="140" cy="225" r="2.5" fill="#ffffff" />
      <circle cx="195" cy="205" r="3" fill="#38bdf8" fillOpacity="0.6" />

      {/* Salt Worker Silhouette Icon */}
      <g transform="translate(48, 205) scale(0.65)" opacity="0.75">
        <circle cx="15" cy="8" r="6" fill="#475569" />
        <path d="M15 14 L15 32 M8 20 L22 20 M15 32 L8 50 M15 32 L22 50" stroke="#475569" strokeWidth="3" />
        {/* Rake (Cào muối) */}
        <line x1="22" y1="20" x2="42" y2="46" stroke="#92400e" strokeWidth="2.5" />
        <line x1="36" y1="46" x2="48" y2="46" stroke="#475569" strokeWidth="3" />
      </g>
    </g>

    {/* Geometric Wireframe & Annotations */}
    {showAnnotations && (
      <g id="salt-annotations" className="text-xs font-mono select-none">
        {/* Apex S */}
        <circle cx="200" cy="80" r="4" fill="#ea580c" />
        <text x="200" y="68" textAnchor="middle" fill="#c2410c" fontSize="12" fontWeight="bold">S (Đỉnh)</text>

        {/* Center of Base O */}
        <circle cx="200" cy="240" r="3" fill="#2563eb" />
        <text x="208" y="254" fill="#1e40af" fontSize="11" fontWeight="bold">O</text>

        {/* Height Axis h = 1.5m */}
        <line x1="200" y1="80" x2="200" y2="240" stroke="#ea580c" strokeWidth="2" strokeDasharray="4 3" />
        {/* Right-angle square */}
        <rect x="200" y="230" width="10" height="10" fill="none" stroke="#ea580c" strokeWidth="1.5" />

        <rect x="145" y="145" width="50" height="22" rx="4" fill="#ffedd5" stroke="#fdba74" strokeWidth="1" />
        <text x="170" y="160" textAnchor="middle" fill="#c2410c" fontSize="10" fontWeight="bold">h = 1.5m</text>

        {/* Radius r = 2m on base */}
        <line x1="200" y1="240" x2="320" y2="240" stroke="#2563eb" strokeWidth="2" />
        <polygon points="320,240 312,236 312,244" fill="#2563eb" />
        <polygon points="200,240 208,236 208,244" fill="#2563eb" />
        <rect x="238" y="248" width="58" height="22" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
        <text x="267" y="263" textAnchor="middle" fill="#1d4ed8" fontSize="10" fontWeight="bold">r = 2 m</text>

        {/* Base Circumference Callout */}
        <rect x="18" y="18" width="168" height="34" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <text x="26" y="32" fill="#475569" fontSize="9" fontWeight="bold">CHU VI ĐÁY (C = 2πr):</text>
        <text x="26" y="46" fill="#0369a1" fontSize="11" fontWeight="bold">C = 12.56 m ⇒ r = 2 m</text>
      </g>
    )}
  </svg>
);

/**
 * 4. PHỄU LỌC HÌNH NÓN (Conical Filtration Funnel)
 * d = 12 cm -> r = 6 cm, l = 10 cm -> h = 8 cm, V = 301.44 cm³
 */
export const FunnelSvg: React.FC<SvgProps> = ({
  className = 'w-full h-auto max-h-72',
  showAnnotations = true,
}) => (
  <svg
    id="svg-conical-funnel"
    viewBox="0 0 400 320"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Glass gradient */}
      <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.6" />
        <stop offset="30%" stopColor="#e0f2fe" stopOpacity="0.2" />
        <stop offset="70%" stopColor="#ffffff" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.6" />
      </linearGradient>

      {/* Funnel Liquid Solution */}
      <linearGradient id="funnelLiquidGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#6b21a8" stopOpacity="0.9" />
      </linearGradient>

      <filter id="funnelShadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0f172a" floodOpacity="0.2" />
      </filter>
    </defs>

    {/* Background Lab Clean Slate */}
    <rect x="0" y="0" width="400" height="320" rx="16" fill="#f8fafc" />
    <circle cx="200" cy="150" r="120" fill="#f3e8ff" fillOpacity="0.5" />

    {/* Laboratory Stand Clip (Giá đỡ kẹp phễu) */}
    <g id="lab-stand">
      <rect x="80" y="20" width="8" height="280" fill="#475569" rx="2" />
      <rect x="50" y="285" width="100" height="14" fill="#334155" rx="3" />
      {/* Clamp arm */}
      <path d="M88 120 L150 120 L150 128 L88 128 Z" fill="#64748b" />
      <circle cx="88" cy="124" r="6" fill="#1e293b" />
      {/* Clamp ring around funnel */}
      <ellipse cx="200" cy="120" rx="46" ry="7" fill="none" stroke="#475569" strokeWidth="4" />
    </g>

    {/* Glass Funnel Body */}
    <g id="funnel-body" filter="url(#funnelShadow)">
      {/* Cylindrical Stem (Cuống phễu) */}
      <path d="M194 200 L194 275 L206 270 L206 200 Z" fill="url(#glassGrad)" stroke="#38bdf8" strokeWidth="1.5" />
      <path d="M196 200 L196 273 L204 269 L204 200 Z" fill="url(#funnelLiquidGrad)" />

      {/* Liquid Drops (Giọt dung dịch rơi) */}
      <circle cx="200" cy="286" r="3" fill="#9333ea" />
      <circle cx="200" cy="298" r="2.5" fill="#a855f7" />

      {/* Conical Funnel Bowl (Thân nón phễu) */}
      <path
        d="M120 70 L194 200 L206 200 L280 70 Z"
        fill="url(#glassGrad)"
        stroke="#38bdf8"
        strokeWidth="2"
      />

      {/* Liquid in Cone (60% full) */}
      <path
        d="M145 120 L194 200 L206 200 L255 120 Z"
        fill="url(#funnelLiquidGrad)"
      />
      <ellipse cx="200" cy="120" rx="55" ry="10" fill="#c084fc" fillOpacity="0.8" />

      {/* Top Rim of Funnel (Miệng phễu) */}
      <ellipse cx="200" cy="70" rx="80" ry="14" fill="url(#glassGrad)" stroke="#0284c7" strokeWidth="2" />
      <ellipse cx="200" cy="70" rx="72" ry="10" fill="none" stroke="#bae6fd" strokeWidth="1.5" />

      {/* Filter Paper Cone Outline (Giấy lọc xếp nón) */}
      <path
        d="M130 85 L200 190 L270 85"
        stroke="#ffffff"
        strokeWidth="2"
        strokeDasharray="3 3"
        fill="none"
      />
    </g>

    {/* Annotations */}
    {showAnnotations && (
      <g id="funnel-annotations" className="text-xs font-mono select-none">
        {/* Slant Height l = 10 cm */}
        <line x1="290" y1="65" x2="215" y2="200" stroke="#9333ea" strokeWidth="1.5" />
        <polygon points="290,65 284,73 292,75" fill="#9333ea" />
        <polygon points="215,200 222,192 214,190" fill="#9333ea" />
        <rect x="260" y="125" width="80" height="24" rx="4" fill="#f3e8ff" stroke="#d8b4fe" strokeWidth="1" />
        <text x="300" y="141" textAnchor="middle" fill="#7e22ce" fontSize="11" fontWeight="bold">
          l = 10 cm
        </text>

        {/* Height Axis h = 8 cm */}
        <line x1="200" y1="70" x2="200" y2="200" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="200" cy="70" r="3" fill="#ef4444" />
        <circle cx="200" cy="200" r="3" fill="#ef4444" />
        {/* Right-angle square */}
        <rect x="200" y="70" width="8" height="8" fill="none" stroke="#ef4444" strokeWidth="1.5" />

        <rect x="148" y="130" width="50" height="22" rx="4" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" />
        <text x="173" y="145" textAnchor="middle" fill="#b91c1c" fontSize="10" fontWeight="bold">
          h = 8 cm
        </text>

        {/* Mouth Diameter / Radius d = 12cm -> r = 6cm */}
        <line x1="120" y1="40" x2="280" y2="40" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="120" y1="35" x2="120" y2="58" stroke="#2563eb" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="280" y1="35" x2="280" y2="58" stroke="#2563eb" strokeWidth="1" strokeDasharray="2 2" />
        <polygon points="120,40 128,37 128,43" fill="#2563eb" />
        <polygon points="280,40 272,37 272,43" fill="#2563eb" />
        <rect x="142" y="22" width="116" height="20" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
        <text x="200" y="36" textAnchor="middle" fill="#1d4ed8" fontSize="10" fontWeight="bold">
          d = 12 cm (r = 6 cm)
        </text>
      </g>
    )}
  </svg>
);

/**
 * 5. NÓN LÁ TRUYỀN THỐNG VIỆT NAM (Vietnamese Conical Hat)
 * d = 40 cm -> r = 20 cm, h = 21 cm -> l = 29 cm, S_xq = 1822.12 cm²
 */
export const ConicalHatSvg: React.FC<SvgProps> = ({
  className = 'w-full h-auto max-h-72',
  showAnnotations = true,
}) => (
  <svg
    id="svg-conical-hat"
    viewBox="0 0 400 320"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="hatLeafGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#d97706" />
        <stop offset="25%" stopColor="#fef3c7" />
        <stop offset="50%" stopColor="#fffbeb" />
        <stop offset="75%" stopColor="#fde68a" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>

      <linearGradient id="ribbonGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#be185d" />
      </linearGradient>

      <filter id="hatShadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#78350f" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="400" height="320" rx="16" fill="#f8fafc" />
    <circle cx="200" cy="150" r="120" fill="#fef3c7" fillOpacity="0.5" />

    {/* Hat Shadow */}
    <ellipse cx="200" cy="270" rx="140" ry="20" fill="#cbd5e1" fillOpacity="0.6" />

    {/* Hat Silk Ribbon (Quai nón lụa hồng) */}
    <path
      d="M130 240 Q 110 270, 140 295 T 190 305"
      fill="none"
      stroke="url(#ribbonGrad)"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path
      d="M270 240 Q 290 270, 260 295 T 210 305"
      fill="none"
      stroke="url(#ribbonGrad)"
      strokeWidth="6"
      strokeLinecap="round"
    />

    {/* Hat Main Body */}
    <g id="conical-hat-body" filter="url(#hatShadow)">
      {/* 16 Bamboo Rib Rings (16 Vành nón lá) */}
      <path d="M70 240 L200 65 L330 240 Z" fill="url(#hatLeafGrad)" />

      {/* 16 Horizontal Rings Layering */}
      {[...Array(16)].map((_, i) => {
        const factor = (i + 1) / 16;
        const rx = 130 * factor;
        const cy = 65 + 175 * factor;
        const ry = 22 * factor;
        return (
          <ellipse
            key={i}
            cx="200"
            cy={cy}
            rx={rx}
            ry={ry}
            fill="none"
            stroke="#92400e"
            strokeWidth="0.8"
            strokeOpacity="0.45"
          />
        );
      })}

      {/* Hat Base Rim */}
      <ellipse cx="200" cy="240" rx="130" ry="22" fill="#fffbeb" stroke="#b45309" strokeWidth="2" />

      {/* Apex Cap (Chóp nón) */}
      <polygon points="200,60 194,72 206,72" fill="#78350f" />
    </g>

    {/* Annotations */}
    {showAnnotations && (
      <g id="hat-annotations" className="text-xs font-mono select-none">
        {/* Slant Height l = 29 cm */}
        <line x1="338" y1="240" x2="208" y2="65" stroke="#d97706" strokeWidth="2" />
        <polygon points="208,65 214,73 207,75" fill="#d97706" />
        <polygon points="338,240 330,234 332,242" fill="#d97706" />
        <rect x="278" y="135" width="80" height="24" rx="4" fill="#fef3c7" stroke="#fde68a" strokeWidth="1" />
        <text x="318" y="151" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="bold">
          l = 29 cm
        </text>

        {/* Height h = 21 cm */}
        <line x1="200" y1="65" x2="200" y2="240" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="200" cy="65" r="3" fill="#ef4444" />
        <circle cx="200" cy="240" r="3" fill="#ef4444" />
        <rect x="200" y="228" width="10" height="10" fill="none" stroke="#ef4444" strokeWidth="1.5" />
        <rect x="144" y="145" width="52" height="22" rx="4" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" />
        <text x="170" y="160" textAnchor="middle" fill="#b91c1c" fontSize="10" fontWeight="bold">
          h = 21 cm
        </text>

        {/* Base Diameter d = 40 cm -> r = 20 cm */}
        <line x1="70" y1="275" x2="330" y2="275" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="70" y1="246" x2="70" y2="282" stroke="#2563eb" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="330" y1="246" x2="330" y2="282" stroke="#2563eb" strokeWidth="1" strokeDasharray="2 2" />
        <polygon points="70,275 78,272 78,278" fill="#2563eb" />
        <polygon points="330,275 322,272 322,278" fill="#2563eb" />
        <rect x="140" y="265" width="120" height="20" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
        <text x="200" y="279" textAnchor="middle" fill="#1d4ed8" fontSize="10" fontWeight="bold">
          d = 40 cm (r = 20 cm)
        </text>
      </g>
    )}
  </svg>
);

/**
 * 6. QUẢ BÓNG ĐÁ TIÊU CHUẨN FIFA (FIFA Standard Football - Sphere)
 * C = 69 cm -> R ≈ 11 cm, S = 4πR² ≈ 1520 cm², V ≈ 5575 cm³
 */
export const SoccerBallSvg: React.FC<SvgProps> = ({
  className = 'w-full h-auto max-h-72',
  showAnnotations = true,
}) => (
  <svg
    id="svg-soccer-ball"
    viewBox="0 0 400 320"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="ballSphereGrad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#f1f5f9" />
        <stop offset="85%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#475569" />
      </radialGradient>

      <filter id="ballShadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Background Field */}
    <rect x="0" y="0" width="400" height="320" rx="16" fill="#f8fafc" />
    <circle cx="200" cy="155" r="120" fill="#dcfce7" fillOpacity="0.5" />

    {/* Shadow */}
    <ellipse cx="200" cy="265" rx="85" ry="14" fill="#cbd5e1" fillOpacity="0.7" />

    {/* Sphere Ball */}
    <g id="soccer-sphere" filter="url(#ballShadow)">
      <circle cx="200" cy="155" r="95" fill="url(#ballSphereGrad)" stroke="#334155" strokeWidth="2" />

      {/* Central Black Pentagon */}
      <polygon
        points="200,125 224,142 215,170 185,170 176,142"
        fill="#0f172a"
        stroke="#334155"
        strokeWidth="2"
      />

      {/* Neighboring Panels */}
      <polygon points="200,125 200,95 230,85 248,110 224,142" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <polygon points="200,125 176,142 152,110 170,85 200,95" fill="#ffffff" stroke="#334155" strokeWidth="2" />
      <polygon points="176,142 185,170 160,195 135,180 152,110" fill="#e2e8f0" stroke="#334155" strokeWidth="2" />
      <polygon points="215,170 224,142 248,110 265,180 240,195" fill="#f1f5f9" stroke="#334155" strokeWidth="2" />
      <polygon points="185,170 215,170 200,215 170,225 160,195" fill="#0f172a" stroke="#334155" strokeWidth="2" />

      {/* Top Black Pentagon */}
      <polygon points="200,60 215,75 185,75" fill="#0f172a" stroke="#334155" strokeWidth="2" />
      {/* Side Black Pentagons */}
      <polygon points="108,145 125,135 120,165 105,160" fill="#0f172a" stroke="#334155" strokeWidth="2" />
      <polygon points="292,145 275,135 280,165 295,160" fill="#0f172a" stroke="#334155" strokeWidth="2" />
    </g>

    {/* Equator & Radius Annotations */}
    {showAnnotations && (
      <g id="ball-annotations" className="text-xs font-mono select-none">
        {/* Equator circumference ring */}
        <ellipse cx="200" cy="155" rx="95" ry="24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 3" />

        {/* Center O and Radius R */}
        <circle cx="200" cy="155" r="3.5" fill="#dc2626" />
        <text x="190" y="152" fill="#b91c1c" fontSize="11" fontWeight="bold">O</text>

        <line x1="200" y1="155" x2="295" y2="155" stroke="#dc2626" strokeWidth="2" />
        <polygon points="295,155 287,151 287,159" fill="#dc2626" />
        <rect x="215" y="160" width="72" height="22" rx="4" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" />
        <text x="251" y="175" textAnchor="middle" fill="#b91c1c" fontSize="10" fontWeight="bold">
          R ≈ 11 cm
        </text>

        {/* Circumference Badge */}
        <rect x="25" y="25" width="160" height="34" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <text x="35" y="39" fill="#475569" fontSize="9" fontWeight="bold">CHU VI LỚN (C = 2πR):</text>
        <text x="35" y="53" fill="#1d4ed8" fontSize="11" fontWeight="bold">C = 69 cm ⇒ R ≈ 11 cm</text>
      </g>
    )}
  </svg>
);

/**
 * 7. THÙNG PHUY THÉP 200L (Industrial 200L Steel Drum)
 * d = 60 cm -> r = 30 cm, h = 90 cm, S_tp ≈ 2.26 m²
 */
export const OilDrumSvg: React.FC<SvgProps> = ({
  className = 'w-full h-auto max-h-72',
  showAnnotations = true,
}) => (
  <svg
    id="svg-oil-drum"
    viewBox="0 0 400 320"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="drumBlueGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#1e3a8a" />
        <stop offset="25%" stopColor="#2563eb" />
        <stop offset="50%" stopColor="#3b82f6" />
        <stop offset="75%" stopColor="#1d4ed8" />
        <stop offset="100%" stopColor="#172554" />
      </linearGradient>

      <linearGradient id="drumRimGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="50%" stopColor="#f8fafc" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>

      <filter id="drumShadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="400" height="320" rx="16" fill="#f8fafc" />
    <circle cx="200" cy="155" r="120" fill="#dbeafe" fillOpacity="0.5" />

    {/* Shadow */}
    <ellipse cx="200" cy="272" rx="75" ry="12" fill="#cbd5e1" fillOpacity="0.7" />

    {/* Drum Body */}
    <g id="drum-cylinder" filter="url(#drumShadow)">
      {/* Wall */}
      <rect x="135" y="70" width="130" height="185" fill="url(#drumBlueGrad)" />

      {/* 2 Heavy-duty Rolling Hoops (Vành gân gia cường) */}
      <ellipse cx="200" cy="130" rx="65" ry="11" fill="none" stroke="url(#drumRimGrad)" strokeWidth="4" />
      <ellipse cx="200" cy="195" rx="65" ry="11" fill="none" stroke="url(#drumRimGrad)" strokeWidth="4" />

      {/* Bottom Cap */}
      <ellipse cx="200" cy="255" rx="65" ry="12" fill="#1e3a8a" stroke="#64748b" strokeWidth="1.5" />

      {/* Top Cap */}
      <ellipse cx="200" cy="70" rx="65" ry="12" fill="url(#drumRimGrad)" stroke="#475569" strokeWidth="2" />
      <ellipse cx="200" cy="70" rx="56" ry="9" fill="#1d4ed8" />

      {/* Bungs / Caps (Nắp ren lớn & nhỏ) */}
      <circle cx="175" cy="68" r="5" fill="#f1f5f9" stroke="#334155" strokeWidth="1.5" />
      <circle cx="225" cy="72" r="3.5" fill="#f1f5f9" stroke="#334155" strokeWidth="1" />

      {/* Hazard Symbol & Capacity Label */}
      <polygon points="200,148 214,168 186,168" fill="#f59e0b" />
      <text x="200" y="165" textAnchor="middle" fill="#000000" fontSize="10" fontWeight="bold">!</text>
      <text x="200" y="180" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">200 LITRES</text>
    </g>

    {/* Annotations */}
    {showAnnotations && (
      <g id="drum-annotations" className="text-xs font-mono select-none">
        {/* Height h = 90 cm */}
        <line x1="285" y1="70" x2="285" y2="255" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="272" y1="70" x2="295" y2="70" stroke="#ef4444" strokeWidth="1.5" />
        <line x1="272" y1="255" x2="295" y2="255" stroke="#ef4444" strokeWidth="1.5" />
        <polygon points="285,70 282,78 288,78" fill="#ef4444" />
        <polygon points="285,255 282,247 288,247" fill="#ef4444" />
        <rect x="296" y="150" width="80" height="24" rx="4" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" />
        <text x="336" y="166" textAnchor="middle" fill="#b91c1c" fontSize="11" fontWeight="bold">
          h = 90 cm
        </text>

        {/* Diameter d = 60 cm -> r = 30 cm */}
        <line x1="135" y1="36" x2="265" y2="36" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="135" y1="30" x2="135" y2="58" stroke="#2563eb" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="265" y1="30" x2="265" y2="58" stroke="#2563eb" strokeWidth="1" strokeDasharray="2 2" />
        <polygon points="135,36 143,33 143,39" fill="#2563eb" />
        <polygon points="265,36 257,33 257,39" fill="#2563eb" />
        <rect x="142" y="18" width="116" height="20" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
        <text x="200" y="32" textAnchor="middle" fill="#1d4ed8" fontSize="10" fontWeight="bold">
          d = 60 cm (r = 30 cm)
        </text>
      </g>
    )}
  </svg>
);

/**
 * 8. LỀU CẮM TRẠI TEPEE HÌNH NÓN (Conical Tepee Camping Tent)
 * r = 2.4m, l = 3m -> h = 1.8m, S_xq ≈ 22.61 m²
 */
export const TepeeTentSvg: React.FC<SvgProps> = ({
  className = 'w-full h-auto max-h-72',
  showAnnotations = true,
}) => (
  <svg
    id="svg-tepee-tent"
    viewBox="0 0 400 320"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="tentCanvasGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#d97706" />
        <stop offset="30%" stopColor="#fef3c7" />
        <stop offset="70%" stopColor="#fffbeb" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>

      <filter id="tentShadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Background Grass */}
    <rect x="0" y="0" width="400" height="320" rx="16" fill="#f8fafc" />
    <circle cx="200" cy="150" r="120" fill="#dcfce7" fillOpacity="0.6" />

    {/* Shadow Base */}
    <ellipse cx="200" cy="265" rx="130" ry="18" fill="#cbd5e1" fillOpacity="0.7" />

    {/* Tent Structure */}
    <g id="tent-body" filter="url(#tentShadow)">
      {/* Wooden Poles Crossing Top (Cọc gỗ nhô ra ở đỉnh) */}
      <line x1="185" y1="25" x2="215" y2="85" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
      <line x1="215" y1="25" x2="185" y2="85" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
      <line x1="200" y1="20" x2="200" y2="85" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />

      {/* Main Tent Cone Canvas */}
      <path d="M85 245 L200 65 L315 245 Z" fill="url(#tentCanvasGrad)" />

      {/* Base Ellipse */}
      <ellipse cx="200" cy="245" rx="115" ry="18" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />

      {/* Tent Door Flap (Cửa lều vén hình tam giác mở) */}
      <path d="M200 135 L175 248 L225 248 Z" fill="#451a03" />
      <path d="M175 248 L200 135 L182 248 Z" fill="#d97706" />
      <path d="M225 248 L200 135 L218 248 Z" fill="#b45309" />

      {/* Native Pattern Band on Canvas */}
      <path
        d="M108 210 L200 185 L292 210"
        stroke="#0284c7"
        strokeWidth="4"
        fill="none"
      />
    </g>

    {/* Annotations */}
    {showAnnotations && (
      <g id="tent-annotations" className="text-xs font-mono select-none">
        {/* Slant pole l = 3 m */}
        <line x1="324" y1="245" x2="208" y2="65" stroke="#d97706" strokeWidth="2" />
        <polygon points="208,65 214,73 207,75" fill="#d97706" />
        <polygon points="324,245 316,239 318,247" fill="#d97706" />
        <rect x="272" y="140" width="70" height="24" rx="4" fill="#fef3c7" stroke="#fde68a" strokeWidth="1" />
        <text x="307" y="156" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="bold">
          l = 3 m
        </text>

        {/* Height Axis h = 1.8 m */}
        <line x1="200" y1="65" x2="200" y2="245" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="200" cy="65" r="3" fill="#ef4444" />
        <circle cx="200" cy="245" r="3" fill="#ef4444" />
        <rect x="200" y="235" width="8" height="8" fill="none" stroke="#ef4444" strokeWidth="1.5" />
        <rect x="142" y="148" width="54" height="22" rx="4" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" />
        <text x="169" y="163" textAnchor="middle" fill="#b91c1c" fontSize="10" fontWeight="bold">
          h = 1.8 m
        </text>

        {/* Radius r = 2.4 m */}
        <line x1="200" y1="245" x2="315" y2="245" stroke="#2563eb" strokeWidth="2" />
        <polygon points="315,245 307,241 307,249" fill="#2563eb" />
        <polygon points="200,245 208,241 208,249" fill="#2563eb" />
        <rect x="235" y="252" width="68" height="20" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
        <text x="269" y="266" textAnchor="middle" fill="#1d4ed8" fontSize="10" fontWeight="bold">
          r = 2.4 m
        </text>
      </g>
    )}
  </svg>
);

/**
 * Dispatcher to render the appropriate SVG by key
 */
export const RealWorldSvgRenderer: React.FC<{
  illustrationKey: string;
  className?: string;
  showAnnotations?: boolean;
}> = ({ illustrationKey, className, showAnnotations = true }) => {
  switch (illustrationKey) {
    case 'water-tank':
      return <WaterTankSvg className={className} showAnnotations={showAnnotations} />;
    case 'soda-can':
      return <SodaCanSvg className={className} showAnnotations={showAnnotations} />;
    case 'salt-mound':
      return <SaltMoundSvg className={className} showAnnotations={showAnnotations} />;
    case 'funnel':
      return <FunnelSvg className={className} showAnnotations={showAnnotations} />;
    case 'conical-hat':
      return <ConicalHatSvg className={className} showAnnotations={showAnnotations} />;
    case 'soccer-ball':
      return <SoccerBallSvg className={className} showAnnotations={showAnnotations} />;
    case 'oil-drum':
      return <OilDrumSvg className={className} showAnnotations={showAnnotations} />;
    case 'tepee-tent':
      return <TepeeTentSvg className={className} showAnnotations={showAnnotations} />;
    default:
      return <WaterTankSvg className={className} showAnnotations={showAnnotations} />;
  }
};
