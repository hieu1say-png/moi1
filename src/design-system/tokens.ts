/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - STANDARDIZED DESIGN SYSTEM TOKENS
 * Educational Neobrutalism Theme (3px black border, 4px hard shadow, cream background, bold high-contrast palette)
 */

// =========================================================================
// 1. CORE NEOBRUTALISM COLOR CONSTANTS
// =========================================================================
export const NEO_BG = '#FFFDF5';
export const NEO_SURFACE = '#FFFFFF';
export const NEO_SURFACE_ALT = '#FFF9E6';
export const NEO_BLACK = '#000000';
export const NEO_PRIMARY = '#FF6B00';
export const NEO_PRIMARY_DARK = '#D95A00';
export const NEO_PRIMARY_LIGHT = '#FFF0E5';
export const NEO_YELLOW = '#FFD23F';
export const NEO_LIME = '#B7F000';
export const NEO_PINK = '#FF4F81';
export const NEO_BLUE = '#3B82F6';
export const NEO_GREEN = '#22C55E';
export const NEO_CORAL = '#EF4444';
export const NEO_PURPLE = '#8B5CF6';
export const NEO_TEAL = '#14B8A6';

// Legacy Aliases for backwards compatibility
export const PRIMARY = NEO_PRIMARY;
export const PRIMARY_DARK = NEO_PRIMARY_DARK;
export const PRIMARY_LIGHT = NEO_PRIMARY_LIGHT;
export const BACKGROUND = NEO_BG;
export const SURFACE = NEO_SURFACE;
export const SURFACE_SOFT = NEO_SURFACE_ALT;
export const TEXT = NEO_BLACK;
export const TEXT_MUTED = '#374151';
export const BORDER = NEO_BLACK;
export const AI = NEO_PURPLE;
export const CYLINDER = NEO_BLUE;
export const CONE = NEO_PRIMARY;
export const SPHERE = NEO_TEAL;
export const SUCCESS = NEO_GREEN;

// =========================================================================
// 2. DESIGN TOKENS OBJECT
// =========================================================================
export const DESIGN_TOKENS = {
  colors: {
    // Exact semantic tokens
    primary: NEO_PRIMARY,
    primaryDark: NEO_PRIMARY_DARK,
    primaryLight: NEO_PRIMARY_LIGHT,
    background: NEO_BG,
    surface: NEO_SURFACE,
    surfaceSoft: NEO_SURFACE_ALT,
    text: NEO_BLACK,
    textMuted: TEXT_MUTED,
    border: NEO_BLACK,
    success: NEO_GREEN,

    // Extended Semantic Palette
    palette: {
      bg: NEO_BG,
      surface: NEO_SURFACE,
      surfaceAlt: NEO_SURFACE_ALT,
      primary: NEO_PRIMARY,
      primaryDark: NEO_PRIMARY_DARK,
      primaryLight: NEO_PRIMARY_LIGHT,
      textPrimary: NEO_BLACK,
      textSecondary: '#1F2937',
      textMuted: TEXT_MUTED,
      border: NEO_BLACK,
      white: '#FFFFFF',
      black: '#000000',
      yellow: NEO_YELLOW,
      lime: NEO_LIME,
      pink: NEO_PINK,
      ai: NEO_PURPLE,
      cylinder: NEO_BLUE,
      cone: NEO_PRIMARY,
      sphere: NEO_TEAL,
      success: NEO_GREEN,
      warning: NEO_YELLOW,
      error: NEO_CORAL
    },

    // Hình Trụ (Cylinder) - Blue Theme (#3B82F6)
    cylinder: {
      primary: NEO_BLUE,
      secondary: '#2563EB',
      accent: '#93C5FD',
      light: '#EFF6FF',
      surface: '#DBEAFE',
      border: '#000000',
      darkText: '#000000',
      badge: '#000000',
      glow: 'none',
      gradient: 'bg-[#3B82F6]',
      gradientSoft: 'bg-[#EFF6FF]'
    },

    // Hình Cầu (Sphere) - Teal Theme (#14B8A6)
    sphere: {
      primary: NEO_TEAL,
      secondary: '#0D9488',
      accent: '#5EEAD4',
      light: '#F0FDFA',
      surface: '#CCFBF1',
      border: '#000000',
      darkText: '#000000',
      badge: '#000000',
      glow: 'none',
      gradient: 'bg-[#14B8A6]',
      gradientSoft: 'bg-[#F0FDFA]'
    },

    // Hình Nón (Cone) - Orange Theme (#FF6B00)
    cone: {
      primary: NEO_PRIMARY,
      secondary: NEO_PRIMARY_DARK,
      accent: '#FDBA74',
      light: '#FFF0E5',
      surface: '#FFE4D1',
      border: '#000000',
      darkText: '#000000',
      badge: '#000000',
      glow: 'none',
      gradient: 'bg-[#FF6B00]',
      gradientSoft: 'bg-[#FFF0E5]'
    },

    // Trợ lý AI (AI Assistant) - Violet Theme (#8B5CF6)
    ai: {
      primary: NEO_PURPLE,
      secondary: '#7C3AED',
      accent: '#C4B5FD',
      light: '#F5F3FF',
      surface: '#EDE9FE',
      border: '#000000',
      darkText: '#000000',
      badge: '#000000',
      glow: 'none',
      gradient: 'bg-[#8B5CF6]',
      gradientSoft: 'bg-[#F5F3FF]'
    },

    // Thành Tích & Huy Hiệu (Achievement) - Gold / Yellow Theme
    achievement: {
      primary: NEO_YELLOW,
      secondary: '#E5BD33',
      accent: '#FEF08A',
      light: '#FFFDF0',
      surface: '#FEF9C3',
      border: '#000000',
      darkText: '#000000',
      badge: '#000000',
      glow: 'none',
      gradient: 'bg-[#FFD23F]',
      gradientSoft: 'bg-[#FFFDF0]'
    },

    // Neutrals & Clean Cream Canvas
    neutral: {
      canvas: NEO_BG,
      surface: NEO_SURFACE,
      subtle: NEO_SURFACE_ALT,
      border: NEO_BLACK,
      borderSubtle: NEO_BLACK,
      textHeading: NEO_BLACK,
      textBody: '#1F2937',
      textMuted: TEXT_MUTED,
      textSubtle: '#4B5563',
      sidebarBg: '#FFFFFF',
      sidebarActive: NEO_PRIMARY
    },

    // Trạng thái (Status)
    status: {
      success: NEO_GREEN,
      warning: NEO_YELLOW,
      error: NEO_CORAL,
      info: NEO_BLUE
    }
  },

  // 2. TYPOGRAPHY
  typography: {
    fontFamily: {
      sans: '"Plus Jakarta Sans", "Be Vietnam Pro", "Inter", "Outfit", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: '"Plus Jakarta Sans", "Outfit", sans-serif',
      serif: '"Times New Roman", Times, "Tinos", serif',
      mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, monospace'
    },
    scale: {
      heroDisplay: 'font-heading text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-black',
      h1: 'font-heading text-xl sm:text-2xl font-black tracking-tight text-black',
      h2: 'font-heading text-lg sm:text-xl font-extrabold tracking-tight text-black',
      h3: 'font-heading text-base sm:text-lg font-extrabold text-black',
      h4: 'font-heading text-sm sm:text-base font-bold text-black',
      bodyLarge: 'font-sans text-sm sm:text-base font-medium leading-relaxed text-black',
      body: 'font-sans text-xs sm:text-sm font-normal leading-normal text-black',
      caption: 'font-sans text-xs text-gray-700 font-semibold',
      overline: 'font-sans text-[11px] font-black uppercase tracking-wider text-black',
      monoFormula: 'font-mono text-xs sm:text-sm text-black font-bold'
    }
  },

  // 3. SPACING & PADDING
  spacing: {
    cardPadding: 'p-4 sm:p-5 lg:p-6',
    cardInnerGap: 'gap-3 sm:gap-4',
    sectionGap: 'space-y-6 sm:space-y-8',
    containerMaxWidth: 'max-w-7xl mx-auto'
  },

  // 4. BORDER RADIUS (Strictly 0-8px for Neobrutalism)
  radii: {
    sm: 'rounded', // 4px
    md: 'rounded-md', // 6px
    lg: 'rounded-lg', // 8px
    xl: 'rounded-xl', // 12px
    pill: 'rounded-md' // No 9999px pill in Neobrutalism
  },

  // 5. SHADOW ELEVATION (Hard shadows with NO blur)
  shadows: {
    flat: 'shadow-neo-none',
    subtle: 'shadow-neo-sm',
    card: 'shadow-neo',
    elevated: 'shadow-neo-lg',
    floating: 'shadow-neo-xl'
  },

  // 6. BREAKPOINTS
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
} as const;

export type ShapeThemeKey = 'cylinder' | 'sphere' | 'cone' | 'ai' | 'achievement';

/**
 * Helper lấy các lớp tiện ích Tailwind cho từng chủ đề hình khối theo Educational Neobrutalism
 */
export function getThemeClasses(theme: ShapeThemeKey) {
  switch (theme) {
    case 'cylinder':
      return {
        bgLight: 'bg-[#EFF6FF]',
        bgSurface: 'bg-[#DBEAFE]',
        bgPrimary: 'bg-[#3B82F6]',
        bgHover: 'hover:bg-[#2563EB]',
        border: 'border-3 border-black',
        borderHover: 'hover:border-black',
        textPrimary: 'text-[#1D4ED8]',
        textDark: 'text-black',
        textMuted: 'text-gray-800',
        ring: 'focus:ring-2 focus:ring-black',
        badge: 'bg-[#3B82F6] text-white border-2 border-black shadow-neo-sm font-black',
        pillButton: 'neo-btn bg-[#3B82F6] text-white font-black',
        glow: 'shadow-neo'
      };
    case 'sphere':
      return {
        bgLight: 'bg-[#F0FDFA]',
        bgSurface: 'bg-[#CCFBF1]',
        bgPrimary: 'bg-[#14B8A6]',
        bgHover: 'hover:bg-[#0D9488]',
        border: 'border-3 border-black',
        borderHover: 'hover:border-black',
        textPrimary: 'text-[#0F766E]',
        textDark: 'text-black',
        textMuted: 'text-gray-800',
        ring: 'focus:ring-2 focus:ring-black',
        badge: 'bg-[#14B8A6] text-white border-2 border-black shadow-neo-sm font-black',
        pillButton: 'neo-btn bg-[#14B8A6] text-white font-black',
        glow: 'shadow-neo'
      };
    case 'cone':
      return {
        bgLight: 'bg-[#FFF0E5]',
        bgSurface: 'bg-[#FFE4D1]',
        bgPrimary: 'bg-[#FF6B00]',
        bgHover: 'hover:bg-[#D95A00]',
        border: 'border-3 border-black',
        borderHover: 'hover:border-black',
        textPrimary: 'text-[#C2410C]',
        textDark: 'text-black',
        textMuted: 'text-gray-800',
        ring: 'focus:ring-2 focus:ring-black',
        badge: 'bg-[#FF6B00] text-white border-2 border-black shadow-neo-sm font-black',
        pillButton: 'neo-btn bg-[#FF6B00] text-white font-black',
        glow: 'shadow-neo'
      };
    case 'ai':
      return {
        bgLight: 'bg-[#F5F3FF]',
        bgSurface: 'bg-[#EDE9FE]',
        bgPrimary: 'bg-[#8B5CF6]',
        bgHover: 'hover:bg-[#7C3AED]',
        border: 'border-3 border-black',
        borderHover: 'hover:border-black',
        textPrimary: 'text-[#6D28D9]',
        textDark: 'text-black',
        textMuted: 'text-gray-800',
        ring: 'focus:ring-2 focus:ring-black',
        badge: 'bg-[#8B5CF6] text-white border-2 border-black shadow-neo-sm font-black',
        pillButton: 'neo-btn bg-[#8B5CF6] text-white font-black',
        glow: 'shadow-neo'
      };
    case 'achievement':
      return {
        bgLight: 'bg-[#FFFDF0]',
        bgSurface: 'bg-[#FEF9C3]',
        bgPrimary: 'bg-[#FFD23F]',
        bgHover: 'hover:bg-[#E5BD33]',
        border: 'border-3 border-black',
        borderHover: 'hover:border-black',
        textPrimary: 'text-black',
        textDark: 'text-black',
        textMuted: 'text-gray-800',
        ring: 'focus:ring-2 focus:ring-black',
        badge: 'bg-[#FFD23F] text-black border-2 border-black shadow-neo-sm font-black',
        pillButton: 'neo-btn bg-[#FFD23F] text-black font-black',
        glow: 'shadow-neo'
      };
  }
}

