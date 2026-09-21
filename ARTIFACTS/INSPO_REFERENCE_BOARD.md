# INSPO REFERENCE BOARD — SECTION-BY-SECTION MACROSTRUCTURE
**Geometry Lab Toán 9 — Macrostructure Blueprints & Reference Matrix**
*Methodology: Brief → Reference → Macrostructure → Design Evidence → Shared Design System*

---

## 1. Reference Rationale & Overview
To ensure Geometry Lab avoids "one-template-fits-all" syndrome, each route is assigned a dedicated pedagogical macrostructure grounded in leading STEM and educational benchmarks.

```
+-----------------------------------------------------------------------------------+
|                        SHARED DESIGN LANGUAGE (TOKENS & SYSTEM)                   |
| (Plus Jakarta Sans + KaTeX | Slate-50 Canvas | 44px Touch | 8-16px Radius)       |
+-----------------------------------------------------------------------------------+
      |              |              |              |              |              |
+-------------+ +-------------+ +-------------+ +-------------+ +-------------+ +-------------+
|    01 HOME  | |  02 THEORY  | |  04 3D LAB  | | 05 PRACTICE | |   06 GAME   | |   07 EXAM   |
| Editorial   | | Learning    | | Interactive | | Focused     | | Calm Learn  | | Standard    |
| Dashboard   | | Document    | | Laboratory  | | Workspace   | | Space       | | Test Bed    |
+-------------+ +-------------+ +-------------+ +-------------+ +-------------+ +-------------+
      |              |              |              |              |              |
+-------------+ +-------------+ +-------------+ +-------------+ +-------------+ +-------------+
| 08 CASE ST. | |   09 STEM   | | 10 AI TUTOR | |11 ACHIEVE   | | 12 TEACHER  | |  03 VIDEO   |
| Real World  | | Engineering | | Dialogue    | | Mastery     | | Data Matrix | | Media Room  |
| Narrative   | | Design Loop | | Scaffolding | | Map         | | Admin View  | | Synchronous |
+-------------+ +-------------+ +-------------+ +-------------+ +-------------+ +-------------+
```

---

## 2. Route-by-Route Reference & Macrostructure Specification

### Route 01: HOME (`/home`)
- **Archetype**: Educational Editorial Dashboard (Ref: Brilliant / Coursera Learning Hub)
- **Why Selected**: Students need immediate re-orientation upon opening the app, a clear "Continue Learning" anchor, quick jumps to 3D models, and timely teacher assignments.
- **Macrostructure**:
  1. Greeting & Streak Bar (Compact, metadata)
  2. Continue Learning Hero Anchor (Fits within first viewport, progress percentage, primary action)
  3. 3D Lab Shortcuts Grid (Cylinder, Cone, Sphere with formulas)
  4. AI Tutor Prompt Quick Inquiries
  5. Teacher Assigned Tasks (if any)
  6. Learning Islands Journey Map
- **Palette**: Slate-50 background, `#1D4ED8` primary, subtle shape accents.
- **Density**: Low-Medium.
- **Responsive**: Single column on mobile; multi-column bento on desktop (>1024px).

---

### Route 02: THEORY (`/theory`)
- **Archetype**: Learning Document (Ref: Notion Education / Desmos Math Manual)
- **Why Selected**: Geometry theory requires unbroken reading flow, progressive definitions, highlighted geometric definitions, theorem proofs, and clean formula cards—NOT a chaotic dashboard grid.
- **Macrostructure**:
  1. Document Header & Shape Selector (Cylinder / Cone / Sphere)
  2. Core Definition & Origin Generation (Khái niệm hình thành)
  3. Interactive Visual Figure / Cut-Open Diagram
  4. Formula Matrix (Diện tích xung quanh, Diện tích toàn phần, Thể tích)
  5. Mathematical Derivation & Proof Timeline
  6. Step-by-Step Worked Examples with collapsible hints
  7. Video Lesson Embedding with Synchronized Timestamps
- **Palette**: Warm slate background, white paper surface (`bg-white shadow-xs border border-slate-200`), high-contrast KaTeX equations.
- **Density**: Reading-First (65–75 character line width, generous vertical rhythm).
- **Responsive**: Max reading width `920px`, sticky floating section TOC on desktop.

---

### Route 03: VIDEO (Integrated & Dedicated Media View)
- **Archetype**: Media Learning Workspace (Ref: Khan Academy / MasterClass STEM)
- **Why Selected**: High school video learning requires a dominant, distraction-free player paired with key formula timestamps and downloadable summary notes.
- **Macrostructure**:
  1. Video Player Anchor (16:9 cinematic aspect ratio, clear play controls, zero autoplay)
  2. Lesson Context & Metadata Header (Teacher title, duration, chapter mapping)
  3. Key Concept Timestamps (Click to jump to specific formula proof)
  4. Instant Formula Reference Sidebar / Drawer
- **Palette**: Neutral slate dark surround for video theater; clean light notes panel.
- **Density**: Medium.

---

### Route 04: EXPLORE 3D (`/explore`)
- **Archetype**: Interactive Laboratory (Ref: PhET Interactive Simulations / GeoGebra 3D)
- **Why Selected**: 3D geometric shapes are the primary content. The canvas must be completely unobstructed by floating HUDs.
- **Macrostructure**:
  - **Desktop (Split View)**: Left/Center 70% unhindered 3D WebGL Canvas; Right 30% docked Parametric Inspector + Live Formula Calculation.
  - **Mobile (Stacked View)**: Top 50vh Interactive 3D Canvas with touch orbit/pinch; Bottom scrolling Control Sheet & Formula Readout.
- **Palette**: Clean laboratory background (`#F8FAFC`), crisp shape materials (Teal Cylinder, Royal Blue Cone, Indigo Sphere), clear dimension markers.
- **Density**: Visual-First.

---

### Route 05: PRACTICE (`/practice`)
- **Archetype**: Focused Practice Workspace (Ref: SAT Digital Bluebook / Duolingo Math)
- **Why Selected**: Eliminates extraneous navigation during problem solving. Focus is squarely on the active question, diagram, options, and pedagogical feedback.
- **Macrostructure**:
  1. Practice Header: Topic indicator, Difficulty badge (Nhận biết / Thông hiểu / Vận dụng), Progress dots
  2. Question Canvas: Formatted mathematical text + Clear geometric diagram
  3. Options Selector: Clean single-select radio cards with clear active states
  4. Submit / Action Bar: Primary "Kiểm tra" button with 44px min height
  5. Feedback & 4-Step Solution Timeline: Step 1 Phân tích đề → Step 2 Áp dụng công thức → Step 3 Tính toán → Step 4 Kết luận
  6. Misconception Radar: Highlights common traps (e.g. quên nhân 2 đáy, nhầm đường sinh và chiều cao)
- **Palette**: White card container, `#1D4ED8` selection rings, Emerald feedback for correct, Amber for traps.
- **Density**: Question-First.

---

### Route 06: GAME (`/game`)
- **Archetype**: Calm Learning Game (Ref: Monument Valley / Prune / Calm Math Puzzles)
- **Why Selected**: Vietnamese Grade 9 students preparing for high-stakes 10th grade exams need low-stress, thoughtful practice rather than hyperactive arcade stress.
- **Macrostructure**:
  1. Calm Game Header: Slow mode indicator, Zen audio toggle, current score/stars
  2. Geometric Assembly Stage: Minimalist shape slicing / volume filling target
  3. Thoughtful Decision Controls: Spacious buttons, gentle animations, zero strobe flashes
  4. End of Round Reflection: Mathematical review card showing formulas utilized
- **Palette**: Soft slate, soothing teal and lavender accents, reduced motion by default.
- **Density**: Interaction-First, spacious.

---

### Route 07: EXAM PREP (`/exam-prep`)
- **Archetype**: Exam Workspace (Ref: VN National High School Exam Simulation / Cambridge CBT)
- **Why Selected**: Simulates the authentic 10th grade entrance examination environment with a standardized 10-question master blueprint, strict 30-minute countdown, and marked status grid.
- **Macrostructure**:
  1. Exam Header Bar: Countdown timer (color turns orange at <5m), Submit Exam button
  2. Main Exam Split Layout:
     - Left (75%): Active Question with KaTeX math, answer options, flag question for review
     - Right (25%): 10-Question Navigator Grid (Answered, Unanswered, Flagged)
  3. Confirmation Modal: Warns before final submission if unanswered questions remain
  4. Detailed Review Screen: Score card, time spent, question-by-question breakdown
- **Palette**: Slate-100 / White neutral examination environment with high contrast text.
- **Density**: Focused / Test Mode.

---

### Route 08: REAL WORLD (`/real-world`)
- **Archetype**: Case Study / Narrative Workflow (Ref: New York Times Interactive / Harvard STEM Cases)
- **Why Selected**: Grade 9 exams heavily test applied math (thùng nước, nón lá, bồn chứa). This requires a narrative journey: Problem → Data → Model → Mathematics → Verification.
- **Macrostructure**:
  1. Case Study Hero: Real-world context photo + Problem Statement
  2. Data Extraction Card: Given parameters with physical units (cm, lít, kg)
  3. 3D Geometric Abstraction: Translates real object into ideal cylinder/cone/sphere
  4. Step-by-Step Calculation: Formula derivation with unit conversion
  5. Practical Verification & Engineering Insight
- **Palette**: Editorial documentary tone, crisp photographic framing, clear unit badges.
- **Density**: Medium narrative.

---

### Route 09: STEM PROJECT WORKFLOW (`/real-world#stem`)
- **Archetype**: Project Workflow Interface (Ref: NASA JPL STEM Challenges / Autodesk Instructables)
- **Why Selected**: Guides students through the complete 8-stage Engineering Design Process.
- **Macrostructure**:
  1. Stage Stepper: 1. Problem → 2. Research → 3. Model → 4. Calculate → 5. Build → 6. Test → 7. Refine → 8. Present
  2. Blueprint & Materials Inspector: Raw materials, dimensions, constraints
  3. Interactive Cost & Optimization Calculator
  4. Student Project Submission & Reflection Notes
- **Palette**: Technical blueprint accents, engineering grids, clear progress tracking.
- **Density**: Structured Workflow.

---

### Route 10: AI TUTOR (`/ai`)
- **Archetype**: Conversational Learning Workspace (Ref: Khanmigo / Claude Artifacts Workspace)
- **Why Selected**: AI tutoring must provide Socratic progressive scaffolding (Hint 1 → Hint 2 → Scaffold → Solution) rather than flooding the student with answers.
- **Macrostructure**:
  1. AI Header: Thầy Hiếu AI status indicator, Pedagogical guidelines badge
  2. Chat Thread: Progressive bubble timeline, KaTeX math blocks, collapsible steps
  3. Pedagogical Action Quick Buttons: "Giải thích lại bước này", "Cho bài tập tương tự", "Vẽ hình minh họa"
  4. Formula Quick-Insert Bar: `π`, `r²`, `h`, `l`, `√`, `⅓`, `Sxq`, `V`
  5. Input Bar: Textarea with Shift+Enter support, voice/math assist
- **Palette**: Friendly warm slate canvas, Amber/Orange pedagogical badges, clean white bubbles.
- **Density**: Conversation-First.

---

### Route 11: ACHIEVEMENTS (`/achievements`)
- **Archetype**: Progress Dashboard (Ref: Strava Trophy Case / Duolingo Progress Matrix)
- **Why Selected**: Avoids cheap flashy gamification. Focuses on authentic Grade 9 geometric competency and syllabus milestone mastery.
- **Macrostructure**:
  1. Student Level & Mastery Header: Current rank (e.g. "Chuyên Gia Hình Học 9"), XP, Streak
  2. Chapter IV Mastery Matrix: Cylinder %, Cone %, Sphere %
  3. Authentic Geometry Badges: "Nhà Thám Hiểm Archimedes", "Bậc Thầy Trải Phẳng", "Kỷ Lục Gia 10 Điểm"
  4. Exam Readiness Indicator: Predicted score bracket for 10th grade entrance
- **Palette**: Sophisticated metallic bronze, silver, and gold accents on clean slate surface.
- **Density**: Low-Medium.

---

### Route 12: TEACHER (`/teacher-dashboard`)
- **Archetype**: Data-Oriented Administration Workspace (Ref: Google Classroom / Linear App)
- **Why Selected**: Teachers need efficient tools to manage classes, view student mastery tables, dispatch homework assignments, and manage video libraries without clutter.
- **Macrostructure**:
  1. Admin Header: Class Selector (`Lớp 9A1`, `Lớp 9A2`), Quick Action Buttons
  2. Key Metrics Row: Total Students, Class Average %, Completion Rate, Weak Topics
  3. Tabbed Workspaces:
     - Tab 1: Student Mastery Table (Search, sort, individual diagnostic drill-down)
     - Tab 2: Assignment Dispatcher (Create homework with due date & XP)
     - Tab 3: Video & Curriculum Management
     - Tab 4: Weakness Matrix (Identifies traps like $V_{nón}$ vs $V_{trụ}$)
- **Palette**: Clean administrative slate, high-density data tables, accessible contrast.
- **Density**: Medium-High.
