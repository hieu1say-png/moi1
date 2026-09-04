# VIDEO ARCHITECTURE FINAL IMPLEMENTATION PLAN
**GEOMETRY LAB - Surgical Remediation & Upgrade Roadmap**
**Date:** September 2026

---

## 1. Objectives & Principles
- **No unnecessary rewrites:** Retain existing stable structures, modify only root-cause flaws.
- **Strict User Intent:** Build exactly what was specified in requirements A through Q.
- **Robust Security:** Authoritative backend permission enforcement with zero reliance on frontend checks.
- **Single Source of Truth:** `LessonVideo` as the Common Player, `PersistentTheoryVideoStorage` as backend manager, `videoConfig.ts` for immutable system videos.

---

## 2. Surgical Steps

### Step 1: Backend Route Ordering & Health Endpoint Fix (`server.ts`)
- Relocate `/api/theory-videos/health` and `/api/theory-videos/reset-defaults` before parametric `/api/theory-videos/:id`.
- Fix the video listing filter so that:
  - Unauthenticated users get all system videos (`isSystemVideo(v)`).
  - Students get all system videos plus teacher videos with `status === "PUBLISHED"`.
  - Teachers get full inventory based on permissions.
- Validate non-owner teacher permissions on update/delete endpoints.

### Step 2: System Video Identification & File Replacement Cleanup (`server/theoryVideoStorage.ts`)
- Update `isSystemVideo(v)` to strictly match `v.type === "SYSTEM"`, `v.ownerId === "system"`, or canonical system IDs (`system-cylinder`, `theory-video-cylinder-001`, etc.).
- Prevent accidental misclassification of teacher videos using default sample URLs.
- In `updateVideo(id, updates)`, if `updates.videoUrl` changes and the previous URL was in `/uploads/`, delete the old physical file.

### Step 3: Common Video Player & Progress Tracking (`src/components/video/LessonVideo.tsx`)
- Enhance `LessonVideoProps` to support both `shape` (for system videos) and optional custom video object / `theoryVideo` (for teacher videos).
- Implement video progress persistence:
  - Read saved time from `localStorage` (`geo_video_progress_{id}`) on mount.
  - Show a non-intrusive resume indicator ("Tiếp tục xem từ {mm:ss}") or resume button.
  - On `timeupdate`: save current timestamp every few seconds, notify `StudentProgressService.updateActivity(...)`.
  - On `ended`: record completion state (`completed: true`) and reward progress XP.
  - Zero autoplay, zero audio/mic/TTS dependencies.

### Step 4: UI Unification (`TheoryVideoPanel.tsx` & `TeacherVideosTab.tsx`)
- In `TheoryVideoPanel.tsx`: replace the separate inline `<video>` block with `<LessonVideo customLesson={...} />`.
- In `TeacherVideosTab.tsx`: replace the preview modal `<video autoPlay>` with `<LessonVideo customLesson={...} />`.

### Step 5: Verification & Documentation Artifacts
- Run `compile_applet` and `lint_applet` to confirm zero compilation errors.
- Test endpoints with `curl` (unauthenticated, student, teacher).
- Generate verification, acceptance, and summary artifacts:
  - `VIDEO_ARCHITECTURE_FINAL_IMPLEMENTATION.md`
  - `VIDEO_ARCHITECTURE_FINAL_VERIFICATION.md`
  - `VIDEO_ARCHITECTURE_FINAL_ACCEPTANCE.md`
  - `VIDEO_ARCHITECTURE_FINAL_SUMMARY.md`
