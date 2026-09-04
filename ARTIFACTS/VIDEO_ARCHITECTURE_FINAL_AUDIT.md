# VIDEO ARCHITECTURE FINAL AUDIT REPORT
**GEOMETRY LAB - Comprehensive System & Teacher Video Infrastructure Audit**
**Date:** September 2026 | **Auditor:** AI Engineering Agent
**Audit Target:** Full Video Architecture (Requirements A - Q)

---

## 1. Executive Summary & Audit Verdict

This audit conducted a root-cause inspection of the entire video system in **GEOMETRY LAB**, covering:
1. Physical video assets on disk (`public/assets/videos/` and `uploads/`)
2. Server routing, authentication middleware, and permission boundaries (`server.ts`)
3. Video database storage service & metadata normalization (`server/theoryVideoStorage.ts` & `server/data/theory_videos.json`)
4. Video player components and UI presentation (`src/components/video/LessonVideo.tsx`, `src/components/theory/TheoryVideoPanel.tsx`, `src/components/teacher/TeacherVideosTab.tsx`)
5. Progress persistence and telemetry (`src/services/studentProgressService.ts`)
6. Centralized asset configurations (`src/config/videoConfig.ts`)

### Summary of Discovered Issues & Root Causes

| ID | Component | Severity | Discovered Root Cause | Impact |
|---|---|---|---|---|
| **BUG-01** | `server.ts` | **CRITICAL** | Route `/api/theory-videos/:id` was defined *before* `/api/theory-videos/health`. Express matched `:id = "health"`, causing `GET /api/theory-videos/health` to return `404 Not Found`. | Health check API failed when accessed via canonical endpoint. |
| **BUG-02** | `server.ts` & `theoryVideoStorage.ts` | **CRITICAL** | Line 503 in `server.ts` filtered unauthenticated requests using `isSystemVideo(v) && v.status === "PUBLISHED"`. However, in `theory_videos.json`, system videos had `status: "SYSTEM"`. Thus `GET /api/theory-videos` returned **0** system videos for unauthenticated users! | System videos appeared empty to guest/unauthenticated students on initial load. |
| **BUG-03** | `theoryVideoStorage.ts` | **HIGH** | `isSystemVideo()` evaluated `true` if `videoUrl` pointed to `/assets/videos/tru.mp4`, `non.mp4`, or `cau.mp4`. If a teacher created a lesson referencing a default/sample video URL, it was wrongly flagged as a `SYSTEM` video, blocking updates and deletion. | Teachers could not delete or edit their own videos if they referenced system sample files. |
| **BUG-04** | `theoryVideoStorage.ts` | **MEDIUM** | When a teacher updated a video and uploaded a replacement file, old physical files in `/uploads/` were not deleted, accumulating orphaned storage. | Storage leakage on video file replacement. |
| **BUG-05** | `TheoryVideoPanel.tsx` & `TeacherVideosTab.tsx` | **MEDIUM** | `TheoryVideoPanel` used `LessonVideo` for System videos but maintained a duplicate inline `<video>` implementation for Teacher videos. `TeacherVideosTab` preview modal used a bare `<video autoPlay>` tag. | Violated Requirement F (Common Player reuse & No Autoplay). |
| **BUG-06** | `LessonVideo.tsx` | **HIGH** | `LessonVideo.tsx` lacked local and telemetry progress persistence (`currentTime`, `completed`, `lastWatched`, and resume prompt). | Requirement L (Video Progress Resume) was unfulfilled. |

---

## 2. Requirement-by-Requirement Gap Analysis

### A. SYSTEM VIDEO
- **Target Assets:**
  - `cylinder` → `/assets/videos/tru.mp4` (size: 306,266 bytes, valid H.264/MP4)
  - `cone` → `/assets/videos/non.mp4` (size: 309,211 bytes, valid H.264/MP4)
  - `sphere` → `/assets/videos/cau.mp4` (size: 305,055 bytes, valid H.264/MP4)
- **Disk Verification:** All 3 physical files exist in `/public/assets/videos/` and `/public/assets/videos/{shape}/`.
- **Independence:** Must be 100% available without login, session, token, or local storage.
- **Defect Found:** Filtering logic in `server.ts` blocked unauthenticated listing when `status === "SYSTEM"`.
- **Remedy:** Modify route filter to guarantee `isSystemVideo(v)` is returned for unauthenticated queries regardless of `status === "SYSTEM" || status === "PUBLISHED"`.

### B. TEACHER VIDEO
- **Permissions:** Teacher has CREATE, READ, UPDATE, DELETE, PUBLISH. Student has READ published only.
- **Backend Check:** Verified that middleware `requireTeacherAuth` protects `/upload`, `/upload-thumbnail`, `POST /api/theory-videos`, `PUT /api/theory-videos/:id`, and `DELETE /api/theory-videos/:id`.
- **Defect Found:** `isSystemVideo` classification falsely captured teacher videos that reused system paths, triggering the system protection rule ("Không thể xóa video chuẩn hệ thống").
- **Remedy:** Redefine `isSystemVideo` to strictly check `type === "SYSTEM"`, `ownerId === "system"`, or canonical system IDs (`system-cylinder`, `theory-video-cylinder-001`, etc.).

### C. STORAGE
- **Paths:**
  - System: `/public/assets/videos/`
  - Teacher: `/uploads/teacher/${uid}/${videoId}/`
- **File Cleanup:** `PersistentTheoryVideoStorage.deleteVideo` unlinks physical files upon deletion.
- **Improvement:** In `updateVideo`, when `videoUrl` changes and points to a new upload, the former upload file will now be removed.

### D. VIDEO METADATA (18 Canonical Fields)
1. `id`
2. `title`
3. `description`
4. `shape` (`cylinder` | `cone` | `sphere`)
5. `lessonId`
6. `sectionId`
7. `type` (`SYSTEM` | `TEACHER`)
8. `ownerId`
9. `storagePath`
10. `downloadURL`
11. `mimeType`
12. `size`
13. `duration`
14. `thumbnailURL`
15. `status` (`SYSTEM` | `DRAFT` | `PUBLISHED` | `ARCHIVED`)
16. `createdAt`
17. `updatedAt`
18. `publishedAt`
- **Status:** Standardized across `ServerTheoryVideo` and `TheoryVideo`. `normalizeVideo()` guarantees 100% field compliance.

### E. LIFECYCLE
- Transitions: `DRAFT` ↔ `PUBLISHED` ↔ `ARCHIVED`.
- Unpublished videos (Draft or Archived) are strictly invisible to students and unauthenticated users via backend query filtering.

### F. COMMON PLAYER
- **Requirement:** Single reusable `LessonVideo` player for all shapes and video types.
- **Defect Found:** `TheoryVideoPanel` and `TeacherVideosTab` used separate custom `<video>` tags. `autoPlay` was present in the preview modal.
- **Remedy:** Enhance `LessonVideo` to accept either `shape` or a `customLesson` / `theoryVideo` object. Use `LessonVideo` everywhere, eliminating duplicated players and removing `autoPlay`.

### G. LESSON MAPPING
- Cylinder lesson → `tru.mp4` (fallback `cylinder/tru.mp4`)
- Cone lesson → `non.mp4` (fallback `cone/non.mp4`)
- Sphere lesson → `cau.mp4` (fallback `sphere/cau.mp4`)
- Verified in `src/config/videoConfig.ts`. No cross-topic mapping errors.

### H. TEACHER UPLOAD FLOW
- Upload file → validate file → save file to disk (`uploads/teacher/{uid}/{videoId}/`) → create metadata → preview → publish.
- Real-time progress callback supported via XMLHttpRequest/Axios/fetch simulated progress.

### I. VALIDATION
- Supported video MIME types: `video/mp4`, `video/webm`, `video/ogg`, `video/quicktime`.
- Max size: 100MB for video, 10MB for thumbnail.
- Validation checks for file existence and `size > 0` before playback resolution.

### J. PERMISSION
- Backend checks:
  - Unauthenticated GET `/api/theory-videos/:id` for teacher video → 401 Unauthorized.
  - Student GET `/api/theory-videos/:id` for draft teacher video → 403 Forbidden.
  - Non-owner teacher PUT/DELETE → 403 Forbidden.
  - Delete system video → 403 Forbidden.
  - Public system video asset → 200 always.

### K. PERSISTENCE
- `server/data/theory_videos.json` persists metadata across server restarts and browser reloads.
- Atomic sync writing prevents JSON corruption.

### L. VIDEO PROGRESS
- **Requirement:** Persist `currentTime`, `completed`, and `lastWatched` for each video.
- **Remedy:** Add local persistence and `StudentProgressService.updateActivity()` triggers inside `LessonVideo.tsx`, including a resume banner ("Tiếp tục xem từ mm:ss") and completion badge.

### M. HEALTH CHECK
- Endpoint `/api/theory-videos/health` and `/api/video-health` inspects disk files, file sizes, MIME types, byte-range support, and directory write permissions.

### N. RESPONSIVE
- 16:9 ratio container (`aspect-video`), responsive scaling, min 44px touch targets on controls, and Fullscreen API integration.

### O. REGRESSION
- Verify that 3D canvas, theory accordion, question bank, exam generator, and learning journeys remain completely unaffected.

---

## 3. Action Plan Summary

1. Fix route registration order in `server.ts` (place `/health`, `/scan`, `/upload`, `/reset-defaults` before `/:id`).
2. Fix unauthenticated and student video filtering logic in `server.ts`.
3. Refine `isSystemVideo` in `server/theoryVideoStorage.ts` to strictly separate system vs teacher videos.
4. Add cleanup of replaced video files in `PersistentTheoryVideoStorage.updateVideo`.
5. Enhance `LessonVideo.tsx` as the single unified Common Player supporting both System and Teacher videos with progress resumption, no autoplay, and strict zero mic/TTS constraint.
6. Refactor `TheoryVideoPanel.tsx` and `TeacherVideosTab.tsx` to reuse `LessonVideo`.
7. Compile and execute regression tests to verify 100% acceptance.
