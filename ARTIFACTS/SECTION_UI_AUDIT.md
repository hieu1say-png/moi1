# SECTION UI AUDIT — GEOMETRY LAB TOÁN 9
**Inspo-Driven / Section-by-Section UI Audit & Diagnostic Report**
*Date: 2026-09-19 | Version: 2.0.0-Inspo*

---

## 1. Executive Summary & Audit Objective
Geometry Lab Toán 9 is a dedicated Vietnamese Grade 9 STEM & Spatial Geometry learning application. 
The core design directive of this audit is:
> **"RIÊNG BIỆT VỀ CẤU TRÚC. ĐỒNG NHẤT VỀ NGÔN NGỮ THIẾT KẾ."**  
> *"Khác biệt về macrostructure cho từng mục đích học tập, nhưng đồng nhất về design system, color tokens, type tokens, spacing scale, surfaces và typography."*

Prior to this audit, several routes exhibited "template homogenization" (treating documents, 3D labs, practice quizzes, and games with similar card grids and identical layouts). This audit diagnoses all 12 routes and sets exact structural macrostructures.

---

## 2. Route-by-Route Diagnostic Matrix

| # | Route | Current Macrostructure State | Target Macrostructure | Density | Primary Focal Point | Secondary Focuses | Key Deficiencies to Solve |
|---|---|---|---|---|---|---|---|
| **01** | **HOME** (`/home`) | Mixed Dashboard + Roadmap | **Educational Editorial Dashboard** | Low-Medium | Continue Learning Anchor (in first viewport) | 3D Shortcuts Grid, AI Tutor Quick Prompts | Heading size balance, ensure first viewport completeness |
| **02** | **THEORY** (`/theory`) | Tabbed long-form content with cards | **Learning Document** | Low-Medium | Reading Flow & Mathematical Exposition | Interactive Figures, Video Integration | Avoid dashboard-style card grids; establish a clean editorial textbook feel |
| **03** | **VIDEO** (Inside Theory & Dedicated) | Inline embedded clips | **Media Learning Workspace** | Medium | Large Cinematic Player with Chapter Scrubbing | Lesson Context & Timed Formula Notes | No autoplay, clear lesson notes synchronization |
| **04** | **EXPLORE 3D** (`/explore`) | Canvas with sidebars | **Interactive Laboratory** | Visual-First | Unobstructed 3D Model Stage | Floating Parametric Inspector, Live Mathematical Readout | Ensure HUD never covers 3D mesh; clear mobile vertical stacking |
| **05** | **PRACTICE** (`/practice`) | Single question flow | **Focused Practice Workspace** | Question-First | Current Question & Geometric Diagram | Pedagogical 4-Step Solution Timeline, Misconception Radar | Zero distractions, clear pre-submission privacy |
| **06** | **GAME** (`/game`) | Arcade runner speed elements | **Calm Learning Game** | Calm / Low Motion | Peaceful Spatial Challenge & Shape Assembly | Slow-mode toggle, Large touch targets | Reduce screen shakes/particles; math-first thoughtful gameplay |
| **07** | **EXAM** (`/exam-prep`) | Timer + question list | **Exam Workspace** | Focused / Test Mode | Active Exam Question & Time Anchor | Question Navigation Grid (10 items), Flagged Status | Rigorous exam state machine, zero accidental exits, KaTeX clarity |
| **08** | **REAL WORLD** (`/real-world`) | Grid of real-world cards | **Case Study / Narrative Workflow** | Medium | Linear Narrative: Problem → Data → Model → Math → Verification | Real-life photo context, 3D model comparison | Shift from generic card grid to step-by-step case study narrative |
| **09** | **STEM** (`/real-world#stem`) | Basic calculations | **Project Workflow Interface** | Medium | Engineering Design Cycle (8 phases) | Blueprint schematics, Cost & Material Calculators | True STEM workflow: Problem → Research → Model → Calculate → Build → Test → Refine → Present |
| **10** | **AI TUTOR** (`/ai`) | Chat history with chips | **Conversational Learning Workspace** | Conversation-First | Clean Dialogue Thread with KaTeX formulas | Math Quick Inserts (π, r², √), Progressive Hints (Scaffolding) | Prevent text walls; implement Hint 1 → Hint 2 → Scaffold → Solution |
| **11** | **ACHIEVEMENT** (`/achievements`) | Colorful badges & cards | **Progress Dashboard** | Low-Medium | Mastery Map by Shape & Topic | Badge Locker, Challenge Milestones | Eliminate excessive gamified noise; highlight authentic geometric mastery |
| **12** | **TEACHER** (`/teacher-dashboard`) | Dense table cards | **Data-Oriented Administration Workspace** | Medium-High | Real-Time Class Mastery Matrix | Assignment Dispatcher, Student Progress Table | Clean typographic hierarchy, quick filters, export capabilities |

---

## 3. Shared Design System Deficiencies & Remediation

### 3.1 Color Consistency & Semantic Token Alignment
- **Issue**: Historical styling used mixed Tailwind shades (`orange-500`, `blue-600`, `teal-500`) without strict semantic binding to the 3 geometric archetypes (Cylinder: Teal `#0D9488`, Cone: Royal Blue `#1D4ED8`, Sphere: Indigo `#4F46E5`).
- **Remedy**: Centralize on semantic CSS variables defined in `:root` and `@theme` in `src/index.css`.

### 3.2 Typography & Math Rendering Alignment
- **Issue**: Occasional raw ASCII math (`Sxq = 2*pi*r*h`) or mixed font sizes in headings.
- **Remedy**: All mathematics must pass through `MathFormula` (KaTeX). Enforce the strict 7-level semantic typography scale:
  - `Display` (28–32px, bold, tracking -0.02em)
  - `H1` (22–24px, bold, tracking -0.015em)
  - `H2` (18–20px, semi-bold)
  - `H3` (15–16px, semi-bold)
  - `Body` (14–15px, regular, leading 1.6)
  - `Small` (12–13px, regular/medium)
  - `Meta` (10–11px, bold, uppercase tracking 0.05em).

### 3.3 Spacing & Container Consistency
- **Issue**: Divergent maximum container widths (`max-w-6xl`, `max-w-7xl`, `max-w-5xl`) across different views.
- **Remedy**: Standardize containers:
  - Default App Layout: `max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8`
  - Reading / Theory Document: `max-w-[900px] mx-auto`
  - Lab / 3D Stage: Full height split-screen with zero horizontal clipping.

### 3.4 Responsive Targets
- Specific responsive testing required for mobile viewport baselines:
  - 360 × 800 (Compact Android)
  - 390 × 844 (Standard iPhone)
  - 412 × 915 (Modern Android)
  - 1280 × 800 (Standard Laptop)
  - 1440 × 900 (High-res Desktop)
  - 1920 × 1080 (Full HD Monitor).

---

## 4. Next Actions
1. Complete `/ARTIFACTS/DESIGN_SYSTEM.md`
2. Complete `/ARTIFACTS/INSPO_REFERENCE_BOARD.md`
3. Execute Phase 1 to Phase 10 implementation plan.
