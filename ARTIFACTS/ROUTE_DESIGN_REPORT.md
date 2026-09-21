# ROUTE DESIGN REPORT — GEOMETRY LAB TOÁN 9
**Comprehensive Architectural & Visual Report for All 12 Modules**
*Methodology: Inspo-Driven Shared Design System | Version: 2.0.0*

---

## 1. Design System Summary
Geometry Lab implements the core thesis:
> **"RIÊNG BIỆT VỀ CẤU TRÚC. ĐỒNG NHẤT VỀ NGÔN NGỮ THIẾT KẾ."**

All modules adhere strictly to:
- **Typography**: 7-level semantic scale (`Display` 30px, `H1` 24px, `H2` 18px, `H3` 15px, `Body` 14px, `Small` 12px, `Meta` 11px) using `Plus Jakarta Sans`. KaTeX handles 100% of mathematical notation.
- **Color Identity**: Slate 50 background (`#F8FAFC`), Slate 900 text (`#0F172A`), with designated shape colors:
  - **Hình Trụ (Cylinder)**: Teal `#0D9488`
  - **Hình Nón (Cone)**: Royal Blue `#1D4ED8`
  - **Hình Cầu (Sphere)**: Indigo `#4F46E5`
- **Component Primitives**: Modern calm educational buttons (`rounded-lg`, 44px min-height), badges (`rounded-full`, subtle border), and cards (`rounded-xl`, 1px borders, `shadow-xs`).
- **Zero Homogenization**: No generic card grids pasted across all routes. Each view possesses a purpose-built macrostructure.

---

## 2. Route-by-Route Macrostructure Audit & Implementation

### 01 HOME (`/home`)
- **Macrostructure**: Educational Editorial Dashboard
- **Focal Points**:
  - *Primary*: Continue Learning Hero Anchor (fits within initial viewport; displays current progress, shape, and immediate Resume CTA).
  - *Secondary*: 3D Shape Shortcuts (Cylinder, Cone, Sphere with formulas) & AI Tutor Quick Prompts.
- **Rhythm & Layout**: Single column mobile (`px-4`), responsive bento grid on desktop (`max-w-[1180px]`).

### 02 THEORY (`/theory`)
- **Macrostructure**: Learning Document
- **Focal Points**:
  - *Primary*: Unbroken reading flow with formal geometric definitions, origin rotations, and KaTeX proofs.
  - *Secondary*: Interactive figures and synchronized video lesson player.
- **Rhythm & Layout**: Editorial document layout (`max-w-[920px] mx-auto`), section steppers (1. Nhận biết → 2. Đặc điểm → 3. Công thức → 4. Ví dụ mẫu).

### 03 VIDEO (Media Learning Workspace)
- **Macrostructure**: Media Learning Workspace
- **Focal Points**:
  - *Primary*: Large 16:9 player with chapter scrubbing and zero autoplay.
  - *Secondary*: Lesson context header (ThS. Trần Ngọc Hiếu, duration, chapter) and timed formula reference cards.
- **Rhythm & Layout**: Theater display with adjacent collapsible formula notes.

### 04 EXPLORE 3D (`/explore`)
- **Macrostructure**: Interactive Laboratory
- **Focal Points**:
  - *Primary*: 100% Unobstructed WebGL 3D Canvas stage.
  - *Secondary*: Docked bottom inspection bar and right-hand live formula calculation inspector.
- **Rhythm & Layout**:
  - *Desktop*: Split layout (8 cols 3D Stage, 4 cols Parameters & AI Assistance).
  - *Mobile*: Stacked layout (Top 50vh canvas with touch orbit/pinch, bottom scrolling controls).

### 05 PRACTICE (`/practice`)
- **Macrostructure**: Focused Practice Workspace
- **Focal Points**:
  - *Primary*: Question-first container with geometric diagram and clear radio options.
  - *Secondary*: Pedagogical 4-Step Solution Timeline and Misconception Radar.
- **Rhythm & Layout**: Distraction-free single question flow with answer privacy before submission.

### 06 GAME (`/game`)
- **Macrostructure**: Calm Learning Game
- **Focal Points**:
  - *Primary*: Relaxed spatial shape assembly and volume matching challenges.
  - *Secondary*: Slow mode toggle, large touch targets, zen sound toggles.
- **Rhythm & Layout**: Default easy mode with reduced velocity, zero screen shakes or strobe flashes.

### 07 EXAM PREP (`/exam-prep`)
- **Macrostructure**: Exam Workspace
- **Focal Points**:
  - *Primary*: Active exam question with KaTeX formulas and flagged status.
  - *Secondary*: 10-Question Master Blueprint Navigator Grid and 30-minute countdown anchor.
- **Rhythm & Layout**: Strict state machine (Intro → Exam Playing → Final Review) preventing accidental exits.

### 08 REAL WORLD (`/real-world`)
- **Macrostructure**: Case Study / Narrative Workflow
- **Focal Points**:
  - *Primary*: Linear real-world narrative: Problem → Data → Model → Mathematics → Verification.
  - *Secondary*: Real photograph context and dimensional unit converter.
- **Rhythm & Layout**: Step-by-step case study viewer with parameter extraction.

### 09 STEM PROJECT WORKFLOW (`/real-world#stem`)
- **Macrostructure**: Project Workflow Interface
- **Focal Points**:
  - *Primary*: 8-stage Engineering Design Process (Problem, Research, Model, Calculate, Build, Test, Refine, Present).
  - *Secondary*: Can Optimization Sandbox, Conical Hat Sandbox, Spatial Sketchpad, and Archimedes Trinity Comparator.
- **Rhythm & Layout**: Blueprint interactive sandboxes with real-time physical simulation.

### 10 AI TUTOR (`/ai`)
- **Macrostructure**: Conversational Learning Workspace
- **Focal Points**:
  - *Primary*: Socratic dialogue timeline with KaTeX formulas and progressive disclosure (Hint 1 → Hint 2 → Scaffold → Solution).
  - *Secondary*: Mathematical symbol insert toolbar (`π`, `r²`, `h`, `l`, `√`, `⅓`, `Sxq`, `Stp`, `V`) and pedagogical action chips.
- **Rhythm & Layout**: Split view with 3D canvas synchronization on desktop; full conversation view on mobile.

### 11 ACHIEVEMENTS (`/achievements`)
- **Macrostructure**: Progress Dashboard
- **Focal Points**:
  - *Primary*: Authentic Chapter IV Mastery Matrix (Cylinder, Cone, Sphere completion and accuracy).
  - *Secondary*: Milestone Badge Locker and Exam Readiness indicator.
- **Rhythm & Layout**: Clean trophy cabinet avoiding noisy arcade gamification.

### 12 TEACHER (`/teacher-dashboard`)
- **Macrostructure**: Data-Oriented Administration Workspace
- **Focal Points**:
  - *Primary*: Class Mastery Heatmap and real-time student performance grid.
  - *Secondary*: Assignment dispatcher, Word exam importer, and video curriculum manager.
- **Rhythm & Layout**: High-density clean administrative interface with table filtering, student drill-downs, and export functions.

---

## 3. Conclusion
The redesigned Geometry Lab Toán 9 achieves structural distinctiveness across every pedagogical context while preserving a unified, calm visual language.
