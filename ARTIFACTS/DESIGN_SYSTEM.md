# GEOMETRY LAB — SHARED DESIGN SYSTEM SPECIFICATION
**Single Source of Truth for Visual Language, Typography, Spacing, and Components**
*Standards Version: 2.0.0-Inspo | Framework: React 18 + Tailwind CSS + KaTeX*

---

## 1. Core Visual Principles
1. **Calm, Precise & Educational**: Eliminates juvenile neon clichés, distracting animations, and arbitrary glassmorphism.
2. **Distinct Macrostructure, Shared Visual Language**: Each view has an architecture suited for its pedagogical goal (Editorial Dashboard, Learning Document, Interactive Laboratory, Focused Practice, Calm Game, Exam Workspace, STEM Workflow, AI Workspace, Administration Workspace).
3. **Typography & Mathematical Clarity**: Modern neutral sans-serif (`Plus Jakarta Sans`) paired with KaTeX math rendering (`Times / Computer Modern`). Zero raw LaTeX strings exposed to students.

---

## 2. Color System & Semantic Tokens

### 2.1 Surfaces & Neutrals
| Token Name | CSS Variable | Hex Value | Purpose |
|---|---|---|---|
| Canvas Background | `--color-bg` | `#F8FAFC` (Slate 50) | Main background behind all workspace containers |
| Primary Surface | `--color-surface` | `#FFFFFF` | Cards, modals, document papers, inspector panels |
| Subtle Surface | `--color-surface-subtle` | `#F1F5F9` (Slate 100) | Secondary panels, formula callouts, table headers |
| Elevated Surface | `--color-surface-elevated` | `#FFFFFF` | Dropdowns, popovers, tooltips with subtle elevation |
| Deep Text | `--color-text-primary` | `#0F172A` (Slate 900) | Headings, high-contrast labels, primary equations |
| Muted Text | `--color-text-secondary` | `#475569` (Slate 600) | Descriptive body paragraphs, explanations, hints |
| Border Default | `--color-border` | `#E2E8F0` (Slate 200) | Standard card, input, and divider boundaries |
| Border Hover | `--color-border-hover` | `#CBD5E1` (Slate 300) | Interactive borders on hover or focus |

### 2.2 Semantic Shape Identity
Each shape in Grade 9 Geometry Chapter IV has an unambiguous color identity used across all routes:
| Shape Archetype | Token Name | Hex Color | Subtle BG | Formula Border |
|---|---|---|---|---|
| **Hình Trụ (Cylinder)** | `--color-cylinder` | `#0D9488` (Teal 600) | `#F0FDFA` (Teal 50) | `#99F6E4` (Teal 200) |
| **Hình Nón (Cone)** | `--color-cone` | `#1D4ED8` (Blue 700) | `#EFF6FF` (Blue 50) | `#BFDBFE` (Blue 200) |
| **Hình Cầu (Sphere)** | `--color-sphere` | `#4F46E5` (Indigo 600) | `#EEF2FF` (Indigo 50) | `#C7D2FE` (Indigo 200) |

### 2.3 Status & Pedagogical Feedback Tokens
- **Success / Correct**: `#15803D` (Emerald 700) / Background: `#F0FDF4`
- **Warning / Partial / Misconception**: `#B45309` (Amber 700) / Background: `#FFFBEB`
- **Error / Incorrect**: `#B91C1C` (Rose 700) / Background: `#FEF2F2`
- **AI Tutor / Pedagogical Guidance**: `#D97706` (Amber 600 / Orange 600) / Background: `#FFF7ED`

---

## 3. Typography Hierarchy

| Level | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|---|
| **Display** | Plus Jakarta Sans | 30px (1.875rem) | Bold (700) | 1.2 | -0.025em | Main hero greeting, primary module title |
| **H1** | Plus Jakarta Sans | 24px (1.5rem) | Bold (700) | 1.25 | -0.02em | Section headers, document chapter titles |
| **H2** | Plus Jakarta Sans | 18px (1.125rem) | SemiBold (600) | 1.3 | -0.01em | Subsection headers, modal headers, card titles |
| **H3** | Plus Jakarta Sans | 15px (0.9375rem) | SemiBold (600) | 1.4 | 0 | Sub-block titles, parameter group labels |
| **Body** | Plus Jakarta Sans | 14px (0.875rem) | Regular (400) | 1.6 | 0 | Theory narrative, exercise prompts, explanations |
| **Small** | Plus Jakarta Sans | 12px (0.75rem) | Medium (500) | 1.5 | 0.01em | Button labels, helper text, breadcrumbs |
| **Meta / Badge** | Plus Jakarta Sans | 11px (0.6875rem) | Bold (700) | 1.2 | 0.05em (caps) | Category tags, chapter badges, status pills |
| **Math / Formula** | KaTeX / Serif | 16–20px | Regular/Italic | Math standard | Standard | Formulas: $S_{xq} = 2\pi rh$, $V = \frac{1}{3}\pi r^2 h$ |

---

## 4. Spacing Scale & Layout Containers

### 4.1 Spacing Scale
- `space-1`: 4px (tight grouping)
- `space-2`: 8px (icon & label gap)
- `space-3`: 12px (card inner elements)
- `space-4`: 16px (standard container inner padding)
- `space-5`: 20px (between form controls)
- `space-6`: 24px (major section spacing on mobile)
- `space-8`: 32px (major section spacing on desktop)
- `space-10`: 40px (document reading spacing)

### 4.2 Standard Container Widths
- **App Shell Default**: `max-w-[1180px] mx-auto px-4 sm:px-6`
- **Document / Theory Reading**: `max-w-[920px] mx-auto px-4 sm:px-6`
- **Practice / Exam Center**: `max-w-[960px] mx-auto px-4 sm:px-6`
- **3D Laboratory**: `w-full max-w-[1400px] mx-auto px-3 sm:px-6`
- **Teacher Admin Grid**: `max-w-[1320px] mx-auto px-4 sm:px-6`

---

## 5. Border Radii & Elevation (Shadows)

### 5.1 Corner Radius
- `radius-sm`: `6px` (badges, tags, tiny buttons)
- `radius-md`: `8px` (standard buttons, text inputs, formula callouts)
- `radius-lg`: `12px` (inner cards, media items, question cards)
- `radius-xl`: `16px` (main containers, modal dialogs, roadmap islands)
- `radius-pill`: `9999px` (status pills, avatar rings, filter chips)

### 5.2 Shadows
- `shadow-xs`: `0 1px 2px 0 rgba(15, 23, 42, 0.04)` (clean default border support)
- `shadow-sm`: `0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.08)`
- `shadow-md`: `0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.06)`
- `shadow-modal`: `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.1)`

---

## 6. Shared Component Specifications

### 6.1 Buttons (`Button.tsx`)
- Minimum touch target: 44px on mobile (`min-h-[44px]`)
- Horizontal padding is 2x vertical padding (`px-4 py-2` or `px-5 py-2.5`)
- Variants:
  - `primary`: Solid `#1D4ED8` or shape color, white text, subtle hover lift
  - `secondary`: Slate-100 background, Slate-800 text, border border-slate-200
  - `outline`: White background, Slate-700 text, border border-slate-300
  - `ghost`: Transparent background, hover:bg-slate-100
  - `danger`: Solid `#B91C1C`, white text

### 6.2 Badges & Chips
- Single-line text with `white-space: nowrap`
- Pill rounded (`rounded-full` or `rounded-md`)
- Subtle border matching text tint

### 6.3 Form Inputs & Selects
- Height 44px min for accessibility
- Border `#CBD5E1`, focus ring with shape accent
- Clear floating or top-aligned labels

### 6.4 Mathematical Display
- Always wrap in `<MathFormula formula="..." />` or inline `KaTeX`
- Background for block formulas: `#F8FAFC`, border `#E2E8F0`, with copy/speak accessibility.

---

## 7. Motion & Accessibility
- Micro-interactions: `150ms - 250ms ease-out`
- Modals & route transitions: `250ms - 350ms`
- Game animation: Calm, slow, zero violent screen shakes or strobe flashes
- Full support for `prefers-reduced-motion: reduce`
