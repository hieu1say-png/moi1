# ROUTE UI MAP — GEOMETRY LAB TOÁN 9
**Macrostructure, Primary Focus, Information Density, and Mobile Strategy per Route**
*Standards Version: 2.0.0-Inspo | Framework: Inspo-Driven System*

---

## 1. Route Macrostructure & Strategy Matrix

| Route | Macrostructure | Primary Focus | Density | Mobile Strategy |
|---|---|---|---|---|
| **01 HOME** (`/home`) | **Educational Editorial Dashboard** | Continue Learning Hero Anchor (First Viewport) | Low-Medium | Single column vertical rhythm, compact hero, horizontal swipeable 3D cards, padding >= 24px |
| **02 THEORY** (`/theory`) | **Learning Document** | Reading Flow & Mathematical Exposition | Low-Medium (Reading-first) | Editorial reading column (65-75ch), collapsible worked examples, bottom floating lesson progress |
| **03 VIDEO** (Inside Theory & Media View) | **Media Learning Workspace** | Cinematic 16:9 Video Player | Low | Responsive 16:9 video container, sticky timestamps below video, collapsible formula drawer |
| **04 EXPLORE 3D** (`/explore`) | **Interactive Laboratory** | Unobstructed 3D WebGL Canvas | Visual-First (Low UI) | Vertical stack: 50vh top touch-orbit canvas, bottom scrolling parametric sheet & live formula inspector |
| **05 PRACTICE** (`/practice`) | **Focused Practice Workspace** | Single Question & Geometric Diagram | Medium (Question-first) | One question at a time, min 48px radio cards, submit anchor bar, collapsible 4-step solution timeline |
| **06 GAME** (`/game`) | **Calm Learning Game** | Spatial Assembly & Volume Matching | Low (Calm, Peaceful) | Slow-mode default, large tap targets (>=52px), zen audio toggle, zero screen-shake/particles |
| **07 EXAM** (`/exam-prep`) | **Exam Workspace** | Active Test Question & Countdown Timer | Medium (Test Mode) | Sticky top timer anchor, modal question drawer (10 items), previous/next touch navigation |
| **08 REAL WORLD** (`/real-world`) | **Case Study / Narrative Workflow** | Linear Narrative: Problem → Data → Model → Math → Verification | Medium (Narrative) | Step-by-step accordion/cards, physical unit badges, single column reading layout |
| **09 STEM** (`/real-world#stem`) | **Project Workflow** | 8-Stage Engineering Design Process | Medium (Workflow) | Vertical phase timeline stepper, touch-friendly parameter sliders, blueprint diagram inspection |
| **10 AI TUTOR** (`/ai`) | **Conversational Workspace** | Socratic Dialogue & Progressive Scaffolding | Low-Medium (Conversation-first) | Full-width chat thread, bottom formula insert bar (π, r², √), progressive hints (no text walls) |
| **11 ACHIEVEMENT** (`/achievements`) | **Progress Dashboard** | Chapter IV Shape Mastery Matrix (Cylinder, Cone, Sphere) | Low-Medium | 2-column card layout, authentic geometry milestone badges, clean non-arcade progress bars |
| **12 TEACHER** (`/teacher-dashboard`) | **Data-Oriented Administration Workspace** | Class Mastery Heatmap & Student Performance Matrix | Medium-High (Data-dense) | Horizontal scrollable student tables, card-based class filter tabs, quick assignment drawer |

---

## 2. Macrostructure Differentiation Check
To ensure Geometry Lab strictly obeys **"RIÊNG BIỆT VỀ CẤU TRÚC — ĐỒNG NHẤT VỀ NGÔN NGỮ THIẾT KẾ"**:

1. **Theory ≠ Practice**:
   - Theory is a structured reading document with progressive derivations and worked proofs.
   - Practice is a question-first workspace showing only one question at a time with strict answer submission barriers.
2. **3D ≠ Game**:
   - 3D Lab is an open scientific sandbox with parametric sliders ($r, h, l$) and live formulas.
   - Game is a tranquil, goal-oriented puzzle with lives, scoring, and calm pacing.
3. **STEM ≠ AI**:
   - STEM is an engineering workflow with design steps and optimization sandboxes.
   - AI Tutor is a conversational scaffolding interface with math symbols and step-by-step guidance.
4. **Teacher ≠ Student**:
   - Teacher Dashboard has high information density with data grids, filter controls, and analytics.
   - Student interfaces have low-to-medium density prioritizing clarity and focus.
