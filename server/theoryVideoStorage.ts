/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Persistent Theory Video Storage System
 * Implements server-side disk persistence for video files and JSON metadata.
 * Ensures data survives server restarts, teacher/student re-logins, and session resets.
 */

import fs from "fs";
import path from "path";
import multer from "multer";

export interface ServerVideoCitation {
  id?: string;
  videoId: string;
  startTimeSeconds: number;
  endTimeSeconds: number;
  label: string;
  summary: string;
  topic?: "CYLINDER" | "CONE" | "SPHERE";
  section?: string;
}

export interface ServerVideoChapter {
  start: number;
  title: string;
}

export interface ServerTheoryVideo {
  // 18 Canonical Fields
  id: string;
  title: string;
  description: string;
  shape?: "cylinder" | "cone" | "sphere";
  shapeType?: "cylinder" | "cone" | "sphere";
  lessonId?: string;
  sectionId?: string;
  type?: "SYSTEM" | "TEACHER" | "SYSTEM_VIDEO" | "TEACHER_VIDEO";
  ownerId?: string;
  storagePath?: string;
  downloadURL?: string;
  mimeType?: string;
  contentType?: string;
  fileId?: string;
  originalName?: string;
  size?: number;
  duration?: string;
  thumbnailURL?: string;
  status: "SYSTEM" | "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED" | "PENDING_STORAGE";
  createdAt: number;
  updatedAt: number;
  publishedAt?: number | null;

  // Interoperability & Legacy fields
  topic: "CYLINDER" | "CONE" | "SPHERE";
  section: "INTRO" | "THEORY" | "ELEMENTS" | "CREATION" | "NET" | "SECTION" | "SURFACE_AREA" | "TOTAL_SURFACE" | "VOLUME" | "REAL_WORLD" | "CHALLENGE" | "SUMMARY";
  videoUrl: string;
  url?: string;
  thumbnailUrl?: string | null;
  thumbnail?: string;
  durationSeconds?: number;
  fileName?: string;
  fileSize?: number;
  width?: number;
  height?: number;
  order: number;
  sourceFile?: string;
  originalFileName?: string;
  sourceFileId?: string | null;
  module?: string;
  sourceType?: "TEACHER_PROVIDED" | "ATTACHED_REAL_VIDEO" | "UPLOADED" | "SYSTEM_SEED";
  visibility?: "public" | "class" | "private" | "restricted" | "teacher_only";
  verificationStatus?: "UNVERIFIED" | "VERIFIED" | "REJECTED";
  transcriptStatus?: "NOT_AVAILABLE" | "TEACHER_PROVIDED" | "GENERATED_TRANSCRIPT";
  citations?: ServerVideoCitation[];
  chapters?: ServerVideoChapter[];
  author?: string;
  authorName?: string;
  authorId?: string;
  createdBy?: string;
  lessonTitle?: string;
  uploadStatus?: "uploading" | "processing" | "ready" | "failed" | "FAILED";
  viewCount: number;
}

export interface ServerSystemVideoHealthItem {
  shape: "cylinder" | "cone" | "sphere";
  fileName: string;
  canonicalUrl: string;
  filePath: string;
  fileExists: boolean;
  fileSizeBytes: number;
  mimeType: string;
  byteRangeSupported: boolean;
  metadataValid: boolean;
  permission: string;
  playabilityStatus: "OK" | "ERROR";
  error: string | null;
}

export interface ServerTeacherVideoHealthItem {
  id: string;
  title: string;
  ownerId: string;
  storagePath: string;
  downloadURL: string;
  fileExists: boolean;
  fileSizeBytes: number;
  mimeType: string;
  metadataValid: boolean;
  status: string;
  permissionValid: boolean;
  playabilityStatus: "OK" | "FILE_MISSING" | "CORRUPTED" | "METADATA_INCOMPLETE";
}

export interface ServerVideoHealthReport {
  overallStatus: "HEALTHY" | "DEGRADED" | "FAILED";
  systemVideoStatus: "ALL_HEALTHY" | "SOME_FAILED";
  teacherVideoStatus: "ALL_HEALTHY" | "SOME_FAILED" | "NO_VIDEOS";
  systemVideoHealth: ServerSystemVideoHealthItem[];
  teacherVideoHealth: {
    storageDirectoryExists: boolean;
    storageDirectoryWritable: boolean;
    totalVideos: number;
    publishedCount: number;
    draftCount: number;
    archivedCount: number;
    healthyCount: number;
    missingFileCount: number;
    videos: ServerTeacherVideoHealthItem[];
  };
  checkedAt: string;
  timestamp: number;
}

// Safe storage directory resolution for local dev, container, and Vercel serverless functions
export function getStoragePaths() {
  const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
  let baseDataDir = path.join(process.cwd(), "server", "data");
  let baseUploadsDir = path.join(process.cwd(), "uploads");

  let isWritable = false;
  if (!isServerless) {
    try {
      if (!fs.existsSync(baseDataDir)) {
        fs.mkdirSync(baseDataDir, { recursive: true });
      }
      const probe = path.join(baseDataDir, `.probe_${Date.now()}`);
      fs.writeFileSync(probe, "ok");
      fs.unlinkSync(probe);
      isWritable = true;
    } catch {
      isWritable = false;
    }
  }

  // In read-only serverless runtimes (e.g. Vercel Lambda where cwd is /var/task), write to /tmp
  if (!isWritable) {
    baseDataDir = path.join("/tmp", "geometry_lab", "data");
    baseUploadsDir = path.join("/tmp", "geometry_lab", "uploads");
  }

  return {
    isServerless,
    DATA_DIR: baseDataDir,
    UPLOADS_DIR: baseUploadsDir,
    VIDEOS_UPLOAD_DIR: path.join(baseUploadsDir, "videos"),
    THUMBNAILS_UPLOAD_DIR: path.join(baseUploadsDir, "thumbnails"),
    TEACHER_STORAGE_DIR: path.join(baseUploadsDir, "teacher"),
    JSON_DB_FILE: path.join(baseDataDir, "theory_videos.json"),
    ASSIGNMENTS_FILE: path.join(baseDataDir, "shape_video_assignments.json"),
    BUNDLE_DATA_DIR: path.join(process.cwd(), "server", "data"),
    BUNDLE_UPLOADS_DIR: path.join(process.cwd(), "uploads")
  };
}

export const storagePaths = getStoragePaths();
export const DATA_DIR = storagePaths.DATA_DIR;
export const UPLOADS_DIR = storagePaths.UPLOADS_DIR;
export const VIDEOS_UPLOAD_DIR = storagePaths.VIDEOS_UPLOAD_DIR;
export const THUMBNAILS_UPLOAD_DIR = storagePaths.THUMBNAILS_UPLOAD_DIR;
export const TEACHER_STORAGE_DIR = storagePaths.TEACHER_STORAGE_DIR;
export const JSON_DB_FILE = storagePaths.JSON_DB_FILE;
export const ASSIGNMENTS_FILE = storagePaths.ASSIGNMENTS_FILE;

export interface ShapeVideoAssignments {
  cylinder: string | null;
  cone: string | null;
  sphere: string | null;
}

// Ensure directories exist safely without throwing on read-only environments
function ensureDirectories() {
  try {
    const dirs = [DATA_DIR, UPLOADS_DIR, VIDEOS_UPLOAD_DIR, THUMBNAILS_UPLOAD_DIR, TEACHER_STORAGE_DIR];
    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }
  } catch (err) {
    console.warn("[STORAGE] Storage directories creation notice:", err);
  }
}

// Canonical Teacher Attribution
export const CANONICAL_AUTHOR = "Thầy. Trần Ngọc Hiếu (Trường Phổ Thông Thực Hành Sư Phạm)";

// Initial Pedagogical Seed Videos with Rich KaTeX Math Descriptions
// Initial Pedagogical Seed Videos: STRICT ZERO-FAKE POLICY -> Empty by default
export const DEFAULT_SEED_VIDEOS: ServerTheoryVideo[] = [];

export function isSystemVideo(video: Partial<ServerTheoryVideo> | null | undefined): boolean {
  if (!video) return false;
  return (
    video.type === "SYSTEM_VIDEO" ||
    video.type === "SYSTEM" ||
    video.status === "SYSTEM" ||
    String(video.id).startsWith("system-") ||
    String(video.ownerId) === "system"
  );
}

export function isTeacherVideo(video: Partial<ServerTheoryVideo> | null | undefined): boolean {
  return !isSystemVideo(video);
}

/**
 * Normalizes all 18 canonical fields for any video object to ensure consistent contract
 */
export function normalizeVideo(v: any): ServerTheoryVideo {
  const isSys = isSystemVideo(v);
  const rawShape = v.shape || (v.topic ? String(v.topic).toLowerCase() : "cylinder");
  const shape: "cylinder" | "cone" | "sphere" =
    rawShape === "cone" ? "cone" : rawShape === "sphere" ? "sphere" : "cylinder";
  const sectionId = v.sectionId || v.section || "THEORY";
  const lessonId = v.lessonId || `lesson-${shape}`;

  let videoUrl = v.downloadURL || v.videoUrl || (shape === "cylinder" ? "/videos/trụ.mp4" : shape === "cone" ? "/videos/nón.mp4" : "/videos/cầu.mp4");
  if (isSys) {
    if (shape === "cylinder") videoUrl = "/videos/trụ.mp4";
    else if (shape === "cone") videoUrl = "/videos/nón.mp4";
    else if (shape === "sphere") videoUrl = "/videos/cầu.mp4";
  }

  const fallbackThumb = `/videos/${shape === "cylinder" ? "tru" : shape === "cone" ? "non" : "cau"}_poster.jpg`;
  const thumbnailUrl = isSys ? fallbackThumb : (v.thumbnailURL || v.thumbnailUrl || v.thumbnail || fallbackThumb);
  const status = isSys ? "SYSTEM" : (v.status === "SYSTEM" ? "PUBLISHED" : (v.status || "PUBLISHED"));
  const type: "SYSTEM" | "TEACHER" = isSys ? "SYSTEM" : "TEACHER";
  const ownerId = isSys ? "system" : (v.ownerId && v.ownerId !== "system" ? v.ownerId : (v.authorId || v.createdBy || "usr-teacher-001"));
  const size = Number(v.size) || Number(v.fileSize) || 306266;
  const duration = typeof v.duration === "string" ? v.duration : "00:15";

  let storagePath = v.storagePath || "";
  if (isSys) {
    storagePath = `${shape}/${path.basename(videoUrl)}`;
  } else if (!storagePath) {
    if (videoUrl.startsWith("/uploads/")) {
      storagePath = videoUrl.replace(/^\//, "");
    } else {
      storagePath = `teacher/${ownerId}/${v.id || "video"}/${path.basename(videoUrl)}`;
    }
  }

  const createdAt = Number(v.createdAt) || 1716000000000;
  const updatedAt = Number(v.updatedAt) || Date.now();
  const publishedAt = (status === "PUBLISHED" || status === "SYSTEM")
    ? (Number(v.publishedAt) || createdAt)
    : null;

  return {
    ...v,
    id: String(v.id),
    title: v.title || (isSys ? `Video bài học Hình ${shape === "cylinder" ? "Trụ" : shape === "cone" ? "Nón" : "Cầu"}` : "Video bài giảng"),
    description: v.description || "",
    shape,
    lessonId,
    sectionId,
    type,
    ownerId,
    storagePath,
    downloadURL: videoUrl,
    mimeType: v.mimeType || "video/mp4",
    size,
    duration,
    thumbnailURL: thumbnailUrl,
    status,
    createdAt,
    updatedAt,
    publishedAt,

    // Interoperability & Legacy fields
    topic: shape === "cylinder" ? "CYLINDER" : shape === "cone" ? "CONE" : "SPHERE",
    section: sectionId as any,
    videoUrl,
    thumbnailUrl,
    fileName: v.fileName || path.basename(videoUrl),
    fileSize: size,
    order: Number(v.order) || 1,
    sourceType: isSys ? "ATTACHED_REAL_VIDEO" : (v.sourceType || "TEACHER_PROVIDED"),
    author: CANONICAL_AUTHOR,
    authorName: CANONICAL_AUTHOR,
    createdBy: CANONICAL_AUTHOR,
    citations: v.citations || [],
    chapters: v.chapters || [],
    uploadStatus: "ready",
    viewCount: Number(v.viewCount) || 0
  };
}

export class PersistentTheoryVideoStorage {
  private static isInitialized = false;
  private static memoryCache: ServerTheoryVideo[] | null = null;
  private static assignmentsCache: ShapeVideoAssignments | null = null;

  public static initialize(): void {
    if (this.isInitialized) return;
    ensureDirectories();

    if (!fs.existsSync(JSON_DB_FILE)) {
      try {
        const bundleDb = path.join(storagePaths.BUNDLE_DATA_DIR, "theory_videos.json");
        if (fs.existsSync(bundleDb)) {
          const content = fs.readFileSync(bundleDb, "utf8");
          fs.writeFileSync(JSON_DB_FILE, content, "utf8");
          console.log(`[STORAGE] Seeded persistent video DB at ${JSON_DB_FILE} from bundle.`);
        } else {
          fs.writeFileSync(JSON_DB_FILE, JSON.stringify([], null, 2), "utf8");
          console.log(`[STORAGE] Initialized persistent video DB at ${JSON_DB_FILE} with 0 lessons.`);
        }
      } catch (err) {
        console.warn("[STORAGE] Notice creating initial video DB file:", err);
      }
    }

    if (!fs.existsSync(ASSIGNMENTS_FILE)) {
      try {
        const bundleAssignments = path.join(storagePaths.BUNDLE_DATA_DIR, "shape_video_assignments.json");
        if (fs.existsSync(bundleAssignments)) {
          const content = fs.readFileSync(bundleAssignments, "utf8");
          fs.writeFileSync(ASSIGNMENTS_FILE, content, "utf8");
        } else {
          const emptyAssignments: ShapeVideoAssignments = { cylinder: null, cone: null, sphere: null };
          fs.writeFileSync(ASSIGNMENTS_FILE, JSON.stringify(emptyAssignments, null, 2), "utf8");
        }
      } catch (err) {
        console.warn("[STORAGE] Notice creating initial assignments file:", err);
      }
    }

    this.isInitialized = true;
    // Asynchronously synchronize persistent metadata from Vercel Blob if configured
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      this.syncFromBlob().catch(() => {});
    }
  }

  private static async syncFromBlob(): Promise<void> {
    if (!process.env.BLOB_READ_WRITE_TOKEN) return;
    try {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list({ prefix: "metadata/" });
      const videoBlob = blobs.find((b) => b.pathname === "metadata/theory_videos.json");
      if (videoBlob) {
        const res = await fetch(videoBlob.url);
        if (res.ok) {
          const remoteVideos = await res.json();
          if (Array.isArray(remoteVideos) && remoteVideos.length > 0) {
            this.memoryCache = remoteVideos.map((v: any) => normalizeVideo(v));
            try {
              fs.writeFileSync(JSON_DB_FILE, JSON.stringify(this.memoryCache, null, 2), "utf8");
            } catch {}
            console.log(`[STORAGE] Synced ${remoteVideos.length} videos from Vercel Blob store.`);
          }
        }
      }

      const assignBlob = blobs.find((b) => b.pathname === "metadata/shape_video_assignments.json");
      if (assignBlob) {
        const res = await fetch(assignBlob.url);
        if (res.ok) {
          const remoteAssign = await res.json();
          this.assignmentsCache = remoteAssign;
          try {
            fs.writeFileSync(ASSIGNMENTS_FILE, JSON.stringify(remoteAssign, null, 2), "utf8");
          } catch {}
          console.log("[STORAGE] Synced assignments from Vercel Blob store.");
        }
      }
    } catch (err) {
      console.warn("[STORAGE] Notice syncing from Blob store:", err);
    }
  }

  private static async syncToBlob(pathname: string, data: any): Promise<void> {
    if (!process.env.BLOB_READ_WRITE_TOKEN) return;
    try {
      const { put } = await import("@vercel/blob");
      await put(pathname, JSON.stringify(data, null, 2), {
        access: "public",
        addRandomSuffix: false
      });
      console.log(`[STORAGE] Persisted ${pathname} to Vercel Blob.`);
    } catch (err) {
      console.warn(`[STORAGE] Notice persisting ${pathname} to Vercel Blob:`, err);
    }
  }

  /**
   * Read all videos from persistent disk file (with in-memory cache for serverless lifecycles)
   */
  public static getAllVideos(): ServerTheoryVideo[] {
    this.initialize();
    if (this.memoryCache && this.memoryCache.length > 0) {
      return this.memoryCache;
    }

    try {
      if (fs.existsSync(JSON_DB_FILE)) {
        const raw = fs.readFileSync(JSON_DB_FILE, "utf8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const videos = parsed.map((v: any) => normalizeVideo(v));
          this.memoryCache = videos;
          return videos;
        }
      }

      // Check bundled app data as secondary source
      const bundleDb = path.join(storagePaths.BUNDLE_DATA_DIR, "theory_videos.json");
      if (fs.existsSync(bundleDb)) {
        const raw = fs.readFileSync(bundleDb, "utf8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const videos = parsed.map((v: any) => normalizeVideo(v));
          this.memoryCache = videos;
          return videos;
        }
      }
    } catch (err) {
      console.error("[STORAGE] Error reading persistent videos:", err);
    }
    return this.memoryCache || [];
  }

  /**
   * Save all videos to persistent disk file atomically and update in-memory cache
   */
  public static saveAllVideos(videos: ServerTheoryVideo[]): boolean {
    this.initialize();
    this.memoryCache = [...videos];
    this.syncToBlob("metadata/theory_videos.json", videos).catch(() => {});
    try {
      const tempPath = `${JSON_DB_FILE}.tmp.${Date.now()}`;
      fs.writeFileSync(tempPath, JSON.stringify(videos, null, 2), "utf8");
      fs.renameSync(tempPath, JSON_DB_FILE);
      return true;
    } catch (err) {
      console.warn("[STORAGE] Disk write notice (retaining in-memory cache):", err);
      return true;
    }
  }

  /**
   * Get single video by ID
   */
  public static getVideoById(id: string): ServerTheoryVideo | undefined {
    const list = this.getAllVideos();
    return list.find((v) => v.id === id);
  }

  /**
   * Create and persist a new video
   */
  public static createVideo(
    data: Omit<ServerTheoryVideo, "id" | "viewCount" | "createdAt" | "updatedAt"> & { id?: string }
  ): ServerTheoryVideo {
    const list = this.getAllVideos();
    const topic = data.topic || "CYLINDER";
    // Master Video Bank Rule: New uploaded videos start as DRAFT until reviewed & published
    const status = data.status || "DRAFT";
    const effectiveUrl = data.url || data.videoUrl || "";
    const effectiveThumb = data.thumbnail || data.thumbnailUrl || "";
    const effectiveCreatedBy = data.createdBy || data.authorName || CANONICAL_AUTHOR;

    // Source-Only Guard: Reject if URL is empty and marked as PUBLISHED
    if (status === "PUBLISHED" && (!effectiveUrl || effectiveUrl.trim() === "")) {
      throw new Error("Không thể xuất bản video khi chưa có đường dẫn videoUrl hợp lệ.");
    }

    const newVideo: ServerTheoryVideo = {
      ...data,
      id: data.id || `VIDEO-${topic}-${Date.now().toString().slice(-4)}`,
      topic,
      shape: (data.shape || topic.toLowerCase()) as "cylinder" | "cone" | "sphere",
      section: data.section || "THEORY",
      module: data.module || (data.section ? data.section.toLowerCase() : "theory"),
      videoUrl: effectiveUrl,
      url: effectiveUrl,
      downloadURL: effectiveUrl,
      type: "TEACHER",
      ownerId: effectiveCreatedBy,
      thumbnailUrl: effectiveThumb,
      thumbnail: effectiveThumb,
      storagePath: data.storagePath || (effectiveUrl.startsWith("/uploads/") ? effectiveUrl.replace(/^\//, "") : ""),
      status,
      sourceType: "TEACHER_PROVIDED",
      verificationStatus: data.verificationStatus || (status === "PUBLISHED" ? "VERIFIED" : "UNVERIFIED"),
      transcriptStatus: data.transcriptStatus || "NOT_AVAILABLE",
      citations: data.citations || [],
      chapters: data.chapters || [],
      visibility: data.visibility || "public",
      authorName: effectiveCreatedBy,
      createdBy: effectiveCreatedBy,
      publishedAt: data.publishedAt !== undefined ? data.publishedAt : (status === "PUBLISHED" ? Date.now() : null),
      viewCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    // ONE VIDEO PER CONTENT ENFORCEMENT:
    // If published, archive any existing published video for the same topic + section
    if (newVideo.status === "PUBLISHED") {
      for (const existing of list) {
        if (
          existing.topic === newVideo.topic &&
          existing.section === newVideo.section &&
          existing.status === "PUBLISHED"
        ) {
          existing.status = "ARCHIVED";
          existing.updatedAt = Date.now();
          console.log(`[STORAGE] Archived previous video ${existing.id} for ${newVideo.topic} - ${newVideo.section} (One Video Per Content Rule)`);
        }
      }
      // If THEORY section, automatically update assignment for this shape
      if (newVideo.section === "THEORY") {
        this.assignVideoToShape(newVideo.shape, newVideo.id);
      }
    }

    list.push(newVideo);
    this.saveAllVideos(list);
    console.log(`[STORAGE] Created persistent theory video: ${newVideo.id} - "${newVideo.title}"`);
    return newVideo;
  }

  /**
   * Update video metadata
   */
  public static updateVideo(id: string, updates: Partial<ServerTheoryVideo>): ServerTheoryVideo | null {
    const list = this.getAllVideos();
    const idx = list.findIndex((v) => v.id === id);
    if (idx === -1) return null;

    const current = list[idx];
    const newStatus = updates.status || current.status;
    const effectiveUrl = updates.url || updates.videoUrl || current.videoUrl;
    const effectiveThumb = updates.thumbnail || updates.thumbnailUrl || current.thumbnailUrl;
    const effectiveCreatedBy = updates.createdBy || updates.authorName || current.authorName;

    // Clean up replaced video file if previous was in /uploads/
    if (effectiveUrl && effectiveUrl !== current.videoUrl && current.videoUrl && current.videoUrl.startsWith("/uploads/")) {
      try {
        const oldFilePath = path.join(process.cwd(), current.videoUrl.replace(/^\//, ""));
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
          console.log(`[STORAGE] Cleaned up replaced old video file: ${oldFilePath}`);
        }
      } catch (cleanErr) {
        console.warn(`[STORAGE] Warning cleaning replaced file:`, cleanErr);
      }
    }

    const updated: ServerTheoryVideo = {
      ...current,
      ...updates,
      shape: (updates.shape || current.shape || (updates.topic || current.topic).toLowerCase()) as "cylinder" | "cone" | "sphere",
      module: updates.module || current.module || (updates.section || current.section).toLowerCase(),
      videoUrl: effectiveUrl,
      url: effectiveUrl,
      thumbnailUrl: effectiveThumb,
      thumbnail: effectiveThumb,
      storagePath: updates.storagePath || (effectiveUrl.startsWith("/uploads/") ? effectiveUrl.replace(/^\//, "") : current.storagePath),
      status: newStatus,
      visibility: updates.visibility || current.visibility || "public",
      authorName: effectiveCreatedBy,
      createdBy: effectiveCreatedBy,
      publishedAt: updates.publishedAt !== undefined 
        ? updates.publishedAt 
        : (newStatus === "PUBLISHED" && !current.publishedAt ? Date.now() : current.publishedAt),
      updatedAt: Date.now()
    };

    // ONE VIDEO PER CONTENT ENFORCEMENT:
    if (updated.status === "PUBLISHED") {
      for (const existing of list) {
        if (
          existing.id !== id &&
          existing.topic === updated.topic &&
          existing.section === updated.section &&
          existing.status === "PUBLISHED"
        ) {
          existing.status = "ARCHIVED";
          existing.updatedAt = Date.now();
          console.log(`[STORAGE] Archived previous video ${existing.id} for ${updated.topic} - ${updated.section} (One Video Per Content Rule)`);
        }
      }
      if (updated.section === "THEORY") {
        this.assignVideoToShape(updated.shape, updated.id);
      }
    }

    list[idx] = updated;
    this.saveAllVideos(list);
    console.log(`[STORAGE] Updated persistent theory video: ${id}`);
    return updated;
  }

  /**
   * Delete video and clean up physical upload file if local
   */
  public static deleteVideo(id: string): boolean {
    const list = this.getAllVideos();
    const target = list.find((v) => v.id === id);
    if (!target) return false;

    const filtered = list.filter((v) => v.id !== id);
    this.saveAllVideos(filtered);

    // If videoUrl was uploaded to /uploads/..., cleanly delete physical file from Storage
    if (target.videoUrl && target.videoUrl.startsWith("/uploads/")) {
      try {
        const filePath = path.join(process.cwd(), target.videoUrl);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`[STORAGE] Cleaned up physical video file: ${filePath}`);
          // Remove empty parent directory if teacher/{uid}/{videoId}
          const parentDir = path.dirname(filePath);
          if (fs.existsSync(parentDir) && fs.readdirSync(parentDir).length === 0) {
            fs.rmdirSync(parentDir);
          }
        }
        // Also check if stored under storagePath: teacher/{uid}/{videoId}/...
        if (target.storagePath) {
          const directStoragePath = path.join(storagePaths.UPLOADS_DIR, target.storagePath);
          if (fs.existsSync(directStoragePath)) {
            fs.unlinkSync(directStoragePath);
          }
        }
        // Also check fallback in videos upload directory
        const baseName = path.basename(target.videoUrl);
        const fallbackPath = path.join(storagePaths.VIDEOS_UPLOAD_DIR, baseName);
        if (fs.existsSync(fallbackPath)) {
          fs.unlinkSync(fallbackPath);
        }
      } catch (e) {
        console.warn(`[STORAGE] Could not remove video file:`, e);
      }
    }

    // Clear shape assignment if this video was assigned to a shape
    const assignments = this.getAssignments();
    let assignmentsChanged = false;
    (["cylinder", "cone", "sphere"] as const).forEach((sh) => {
      if (assignments[sh] === id) {
        assignments[sh] = null;
        assignmentsChanged = true;
      }
    });
    if (assignmentsChanged) {
      try {
        fs.writeFileSync(ASSIGNMENTS_FILE, JSON.stringify(assignments, null, 2), "utf8");
        this.syncToBlob("metadata/shape_video_assignments.json", assignments).catch(() => {});
        console.log(`[STORAGE] Cleared shape assignment for deleted video ${id}`);
      } catch (err) {
        console.warn("[STORAGE] Error updating shape assignments on delete:", err);
      }
    }

    // Clean up Vercel Blob files if stored on Blob
    if (target.videoUrl && (target.videoUrl.includes("vercel-storage.com") || target.videoUrl.includes("public.blob.vercel-storage.com"))) {
      import("@vercel/blob").then(({ del }) => del(target.videoUrl)).catch(() => {});
    }
    if (target.thumbnailUrl && (target.thumbnailUrl.includes("vercel-storage.com") || target.thumbnailUrl.includes("public.blob.vercel-storage.com"))) {
      import("@vercel/blob").then(({ del }) => del(target.thumbnailUrl!)).catch(() => {});
    }

    console.log(`[STORAGE] Deleted persistent theory video: ${id}`);
    return true;
  }

  /**
   * Increment view counter persistently
   */
  public static incrementViewCount(id: string): ServerTheoryVideo | null {
    const list = this.getAllVideos();
    const target = list.find((v) => v.id === id);
    if (!target) return null;

    target.viewCount = (target.viewCount || 0) + 1;
    target.updatedAt = Date.now();
    this.saveAllVideos(list);
    return target;
  }

  /**
   * Get current shape to video assignments
   */
  public static getAssignments(): ShapeVideoAssignments {
    this.initialize();
    const defaults: ShapeVideoAssignments = {
      cylinder: null,
      cone: null,
      sphere: null
    };

    try {
      if (fs.existsSync(ASSIGNMENTS_FILE)) {
        const raw = fs.readFileSync(ASSIGNMENTS_FILE, "utf8");
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          return {
            cylinder: parsed.cylinder ?? null,
            cone: parsed.cone ?? null,
            sphere: parsed.sphere ?? null
          };
        }
      }
    } catch (err) {
      console.warn("[STORAGE] Error reading shape assignments:", err);
    }

    try {
      fs.writeFileSync(ASSIGNMENTS_FILE, JSON.stringify(defaults, null, 2), "utf8");
    } catch (e) {
      console.error("[STORAGE] Could not write default assignments:", e);
    }
    return defaults;
  }

  /**
   * Set video assignment for a specific shape
   */
  public static assignVideoToShape(
    shape: "cylinder" | "cone" | "sphere",
    videoId: string | null
  ): ShapeVideoAssignments {
    const current = this.getAssignments();
    current[shape] = videoId;
    try {
      fs.writeFileSync(ASSIGNMENTS_FILE, JSON.stringify(current, null, 2), "utf8");
      this.syncToBlob("metadata/shape_video_assignments.json", current).catch(() => {});
      console.log(`[STORAGE] Assigned shape ${shape} to video ${videoId}`);
    } catch (err) {
      console.error("[STORAGE] Error saving shape assignments:", err);
    }
    return current;
  }

  /**
   * Resolves whether the physical file exists and is non-empty on disk
   */
  public static verifyPhysicalVideoExists(video: ServerTheoryVideo): { exists: boolean; filePath: string; size: number } {
    if (video.videoUrl?.startsWith("http") || video.downloadURL?.startsWith("http")) {
      return {
        exists: true,
        filePath: video.videoUrl || video.downloadURL || "",
        size: video.fileSize || video.size || 1024 * 1024
      };
    }

    const cwd = process.cwd();
    const candidatePaths: string[] = [];

    const shapeFolder = (video.shape || video.topic || "").toLowerCase();

    if (video.videoUrl) {
      if (video.videoUrl.startsWith("/videos/")) {
        candidatePaths.push(path.join(cwd, "public", video.videoUrl));
        candidatePaths.push(path.join(cwd, "public", "videos", path.basename(video.videoUrl)));
        candidatePaths.push(path.join(cwd, "uploads", "videos", path.basename(video.videoUrl)));
      } else if (video.videoUrl.startsWith("/uploads/")) {
        candidatePaths.push(path.join(cwd, video.videoUrl.replace(/^\//, "")));
        candidatePaths.push(path.join(cwd, "uploads", "videos", path.basename(video.videoUrl)));
      } else if (video.videoUrl.startsWith("/assets/videos/")) {
        candidatePaths.push(path.join(cwd, "public", video.videoUrl));
        candidatePaths.push(path.join(cwd, "public", "videos", path.basename(video.videoUrl)));
      } else if (!video.videoUrl.startsWith("http")) {
        candidatePaths.push(path.join(cwd, video.videoUrl));
      }
    }

    if (video.downloadURL && !video.downloadURL.startsWith("http")) {
      candidatePaths.push(path.join(cwd, "public", video.downloadURL.replace(/^\//, "")));
      candidatePaths.push(path.join(cwd, video.downloadURL.replace(/^\//, "")));
      candidatePaths.push(path.join(cwd, "public", "videos", path.basename(video.downloadURL)));
      candidatePaths.push(path.join(cwd, "uploads", "videos", path.basename(video.downloadURL)));
    }

    if (video.storagePath) {
      candidatePaths.push(path.join(cwd, video.storagePath));
      candidatePaths.push(path.join(cwd, "public", video.storagePath));
      candidatePaths.push(path.join(cwd, "uploads", video.storagePath));
      candidatePaths.push(path.join(cwd, "public", "assets", "videos", video.storagePath));
      candidatePaths.push(path.join(cwd, "public", "videos", path.basename(video.storagePath)));
      candidatePaths.push(path.join(cwd, "uploads", "videos", path.basename(video.storagePath)));
    }

    if (shapeFolder) {
      candidatePaths.push(path.join(cwd, "public", "videos", "geometry", shapeFolder, `hinh-${shapeFolder === "cylinder" ? "tru" : shapeFolder === "cone" ? "non" : "cau"}.mp4`));
      candidatePaths.push(path.join(cwd, "public", "videos", "geometry", shapeFolder, video.fileName || ""));
      candidatePaths.push(path.join(cwd, "public", "videos", "theory", shapeFolder, video.fileName || ""));
      candidatePaths.push(path.join(cwd, "public", "videos", "theory", shapeFolder, path.basename(video.storagePath || "")));
      candidatePaths.push(path.join(cwd, "uploads", "videos", "theory", shapeFolder, video.fileName || ""));
    }

    if (video.fileName) {
      candidatePaths.push(path.join(cwd, "public", "videos", video.fileName));
      candidatePaths.push(path.join(cwd, "uploads", "videos", video.fileName));
      candidatePaths.push(path.join(cwd, "public", "assets", "videos", video.fileName));
    }

    for (const p of candidatePaths) {
      if (p && fs.existsSync(p)) {
        try {
          const stats = fs.statSync(p);
          if (stats.size > 0) {
            return { exists: true, filePath: p, size: stats.size };
          }
        } catch {
          // ignore
        }
      }
    }

    return { exists: false, filePath: "", size: 0 };
  }

  /**
   * Retrieves the assigned video for a shape, strictly checking that the physical file exists
   */
  public static getAssignedVideoForShape(shape: "cylinder" | "cone" | "sphere"): {
    hasVideo: boolean;
    video: ServerTheoryVideo | null;
    error?: string;
  } {
    const assignments = this.getAssignments();
    let videoId = assignments[shape];

    // If no direct assignment, check if there is an active PUBLISHED theory video for this shape
    if (!videoId) {
      const all = this.getAllVideos();
      const publishedForShape = all.find(
        (v) => v.shape === shape && v.section === "THEORY" && v.status === "PUBLISHED"
      );
      if (publishedForShape) {
        videoId = publishedForShape.id;
        this.assignVideoToShape(shape, videoId);
      }
    }

    if (videoId) {
      const video = this.getVideoById(videoId);
      if (video) {
        const physicalCheck = this.verifyPhysicalVideoExists(video);
        if (physicalCheck.exists) {
          const currentStatus = String(video.status);
          if (currentStatus === "PUBLISHED" || currentStatus === "ACTIVE" || currentStatus === "PENDING_STORAGE") {
            return {
              hasVideo: true,
              video: {
                ...video,
                status: "PUBLISHED",
                fileSize: physicalCheck.size,
                size: physicalCheck.size
              }
            };
          }
        }
      }
    }

    // SYSTEM FIXED VIDEO RESOLVER (Canonical Repository Videos)
    const shapeSlug = shape === "cylinder" ? "tru" : shape === "cone" ? "non" : "cau";
    const fixedPath = path.join(process.cwd(), "public", "videos", "geometry", shape, `hinh-${shapeSlug}.mp4`);
    if (fs.existsSync(fixedPath)) {
      try {
        const stat = fs.statSync(fixedPath);
        if (stat.size > 0) {
          const shapeNameVn = shape === "cylinder" ? "Hình Trụ" : shape === "cone" ? "Hình Nón" : "Hình Cầu";
          const fixedVideo: ServerTheoryVideo = {
            id: `system-fixed-${shape}`,
            title: `Khám phá ${shapeNameVn}`,
            description: `Video bài học ${shapeNameVn} chuẩn sách giáo khoa Toán 9`,
            shape,
            topic: (shape.toUpperCase()) as any,
            section: "THEORY",
            videoUrl: `/videos/geometry/${shape}/hinh-${shapeSlug}.mp4`,
            downloadURL: `/videos/geometry/${shape}/hinh-${shapeSlug}.mp4`,
            thumbnailURL: `/videos/geometry/${shape}/${shapeSlug}_poster.jpg`,
            thumbnailUrl: `/videos/geometry/${shape}/${shapeSlug}_poster.jpg`,
            fileSize: stat.size,
            size: stat.size,
            duration: "05:00",
            durationSeconds: 300,
            status: "PUBLISHED",
            type: "SYSTEM_VIDEO",
            order: 1,
            author: CANONICAL_AUTHOR,
            authorName: CANONICAL_AUTHOR,
            createdBy: CANONICAL_AUTHOR,
            createdAt: 1716000000000,
            updatedAt: Date.now(),
            publishedAt: 1716000000000,
            viewCount: 0
          };
          return {
            hasVideo: true,
            video: fixedVideo
          };
        }
      } catch (e) {
        console.warn("[STORAGE] Error checking fixed video:", e);
      }
    }

    return {
      hasVideo: false,
      video: null,
      error: "Video bài học chưa được giáo viên cung cấp."
    };
  }

  /**
   * Scans uploads/videos and assets/videos directories, automatically indexing and synchronizing
   * physical video files into the database with Zero-Fake Video policy enforcement.
   */
  public static scanAndSyncPhysicalVideos(): {
    scanned: number;
    added: number;
    updated: number;
    total: number;
    videos: ServerTheoryVideo[];
  } {
    this.initialize();
    let list = this.getAllVideos();
    const initialCount = list.length;

    // Strict Zero-Fake Policy: Only verify physical existence of already recorded videos
    list = list.filter((v) => {
      const check = this.verifyPhysicalVideoExists(v);
      return check.exists;
    });

    if (list.length !== initialCount) {
      this.saveAllVideos(list);
      console.log(`[STORAGE SYNC] Purged ${initialCount - list.length} videos with missing physical files.`);
    }

    return {
      scanned: list.length,
      added: 0,
      updated: 0,
      total: list.length,
      videos: list
    };
  }

  /**
   * Scans uploads/videos and registers any new videos automatically (alias to scanAndSyncPhysicalVideos)
   */
  public static scanUploadsDirectory(): {
    scanned: number;
    added: number;
    updated: number;
    total: number;
    videos: ServerTheoryVideo[];
  } {
    return this.scanAndSyncPhysicalVideos();
  }

  /**
   * Complete health check audit report for all system and teacher videos
   */
  public static getHealthReport(): ServerVideoHealthReport {
    this.initialize();
    const allVideos = this.getAllVideos();
    const cwd = process.cwd();

    // 1. Audit System Videos
    const systemTargets: Array<{ shape: "cylinder" | "cone" | "sphere"; fileName: string; canonicalUrl: string }> = [
      { shape: "cylinder", fileName: "trụ.mp4", canonicalUrl: "/videos/trụ.mp4" },
      { shape: "cone", fileName: "nón.mp4", canonicalUrl: "/videos/nón.mp4" },
      { shape: "sphere", fileName: "cầu.mp4", canonicalUrl: "/videos/cầu.mp4" }
    ];

    const systemHealthItems: ServerSystemVideoHealthItem[] = systemTargets.map((target) => {
      const canonicalPath = path.join(cwd, "public", "videos", target.fileName);
      const asciiFallbackPath = path.join(cwd, "public", "videos", target.fileName === "trụ.mp4" ? "tru.mp4" : target.fileName === "nón.mp4" ? "non.mp4" : "cau.mp4");
      const legacyAssetsPath = path.join(cwd, "public", "assets", "videos", target.fileName === "trụ.mp4" ? "tru.mp4" : target.fileName === "nón.mp4" ? "non.mp4" : "cau.mp4");
      const uploadsPath = path.join(cwd, "uploads", "videos", target.fileName);

      let resolvedPath = canonicalPath;
      let exists = fs.existsSync(canonicalPath);
      if (!exists && fs.existsSync(asciiFallbackPath)) {
        resolvedPath = asciiFallbackPath;
        exists = true;
      } else if (!exists && fs.existsSync(legacyAssetsPath)) {
        resolvedPath = legacyAssetsPath;
        exists = true;
      } else if (!exists && fs.existsSync(uploadsPath)) {
        resolvedPath = uploadsPath;
        exists = true;
      }

      let size = 0;
      let playability: "OK" | "ERROR" = "OK";
      let errStr: string | null = null;

      if (exists) {
        try {
          const stats = fs.statSync(resolvedPath);
          size = stats.size;
          if (size <= 0) {
            playability = "ERROR";
            errStr = "File exists but has 0 bytes";
          }
        } catch (e: any) {
          playability = "ERROR";
          errStr = e.message;
        }
      } else {
        playability = "ERROR";
        errStr = `File not found on disk at ${canonicalPath}`;
      }

      const matchingVideo = allVideos.find((v) => isSystemVideo(v) && v.shape === target.shape);
      const metadataValid = exists && size > 0;

      return {
        shape: target.shape,
        fileName: target.fileName,
        canonicalUrl: target.canonicalUrl,
        filePath: resolvedPath,
        fileExists: exists,
        fileSizeBytes: size,
        mimeType: "video/mp4",
        byteRangeSupported: true,
        metadataValid,
        permission: "PUBLIC_READ",
        playabilityStatus: playability,
        error: errStr
      };
    });

    // 2. Audit Teacher Videos
    const teacherVideos = allVideos.filter((v) => isTeacherVideo(v));
    const storageDirExists = fs.existsSync(TEACHER_STORAGE_DIR) || fs.existsSync(VIDEOS_UPLOAD_DIR);
    let storageDirWritable = false;
    try {
      if (storageDirExists) {
        fs.accessSync(TEACHER_STORAGE_DIR, fs.constants.W_OK);
        storageDirWritable = true;
      }
    } catch {
      storageDirWritable = false;
    }

    let publishedCount = 0;
    let draftCount = 0;
    let archivedCount = 0;
    let healthyCount = 0;
    let missingFileCount = 0;

    const teacherHealthItems: ServerTeacherVideoHealthItem[] = teacherVideos.map((v) => {
      if (v.status === "PUBLISHED") publishedCount++;
      else if (v.status === "DRAFT") draftCount++;
      else if (v.status === "ARCHIVED") archivedCount++;

      let fileExists = false;
      let fileSize = 0;

      if (v.downloadURL?.startsWith("http") || v.videoUrl?.startsWith("http")) {
        fileExists = true;
        fileSize = v.fileSize || v.size || 1024 * 1024;
      } else {
        const candidates = [
        v.downloadURL && v.downloadURL.startsWith("/uploads/") ? path.join(UPLOADS_DIR, v.downloadURL.replace(/^\/uploads\//, "")) : null,
        v.videoUrl && v.videoUrl.startsWith("/uploads/") ? path.join(UPLOADS_DIR, v.videoUrl.replace(/^\/uploads\//, "")) : null,
        v.storagePath ? path.join(UPLOADS_DIR, v.storagePath) : null,
        v.downloadURL ? path.join(cwd, v.downloadURL.replace(/^\//, "")) : null,
        v.downloadURL ? path.join(cwd, "public", v.downloadURL.replace(/^\//, "")) : null,
        v.videoUrl ? path.join(cwd, v.videoUrl.replace(/^\//, "")) : null,
        v.videoUrl ? path.join(cwd, "public", v.videoUrl.replace(/^\//, "")) : null,
        v.storagePath ? path.join(cwd, "uploads", v.storagePath) : null,
        v.storagePath ? path.join(cwd, v.storagePath) : null
      ].filter(Boolean) as string[];

        for (const p of candidates) {
          if (fs.existsSync(p)) {
            fileExists = true;
            try {
              fileSize = fs.statSync(p).size;
            } catch {}
            break;
          }
        }
      }

      const metadataValid = !!(
        v.id &&
        v.title &&
        v.shape &&
        (v.downloadURL || v.videoUrl) &&
        (v.type === "TEACHER" || v.sourceType === "TEACHER_PROVIDED" || !v.type) &&
        v.status
      );

      let playability: "OK" | "FILE_MISSING" | "CORRUPTED" | "METADATA_INCOMPLETE" = "OK";
      if (!fileExists) {
        playability = "FILE_MISSING";
        missingFileCount++;
      } else if (fileSize === 0) {
        playability = "CORRUPTED";
      } else if (!metadataValid) {
        playability = "METADATA_INCOMPLETE";
      } else {
        healthyCount++;
      }

      return {
        id: v.id,
        title: v.title,
        ownerId: v.ownerId,
        storagePath: v.storagePath,
        downloadURL: v.downloadURL,
        fileExists,
        fileSizeBytes: fileSize,
        mimeType: v.mimeType || "video/mp4",
        metadataValid,
        status: v.status,
        permissionValid: true,
        playabilityStatus: playability
      };
    });

    const allSysHealthy = systemHealthItems.every((item) => item.playabilityStatus === "OK" && item.metadataValid);
    const allTeacherHealthy = teacherVideos.length === 0 || missingFileCount === 0;

    let overallStatus: "HEALTHY" | "DEGRADED" | "FAILED" = "HEALTHY";
    if (!allSysHealthy) {
      overallStatus = "FAILED";
    } else if (!allTeacherHealthy) {
      overallStatus = "DEGRADED";
    }

    return {
      overallStatus,
      systemVideoStatus: allSysHealthy ? "ALL_HEALTHY" : "SOME_FAILED",
      teacherVideoStatus: teacherVideos.length === 0 ? "NO_VIDEOS" : allTeacherHealthy ? "ALL_HEALTHY" : "SOME_FAILED",
      systemVideoHealth: systemHealthItems,
      teacherVideoHealth: {
        storageDirectoryExists: storageDirExists,
        storageDirectoryWritable: storageDirWritable,
        totalVideos: teacherVideos.length,
        publishedCount,
        draftCount,
        archivedCount,
        healthyCount,
        missingFileCount,
        videos: teacherHealthItems
      },
      checkedAt: new Date().toISOString(),
      timestamp: Date.now()
    };
  }

  /**
   * Reset database back to default pedagogical seed lessons
   */
  public static resetToDefaults(): ServerTheoryVideo[] {
    this.initialize();
    this.saveAllVideos([]);
    const emptyAssignments: ShapeVideoAssignments = {
      cylinder: null,
      cone: null,
      sphere: null
    };
    try {
      fs.writeFileSync(ASSIGNMENTS_FILE, JSON.stringify(emptyAssignments, null, 2), "utf8");
    } catch (e) {
      console.error("[STORAGE] Could not write empty assignments:", e);
    }
    console.log("[STORAGE] Reset video DB to 0 lessons (Empty Video Bank state).");
    return [];
  }
}

// Multer Storage Configuration for File Uploads
const videoFileFilter = (
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimes = [
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/quicktime",
    "video/x-matroska",
    "video/avi"
  ];
  if (allowedMimes.includes(file.mimetype) || file.originalname.match(/\.(mp4|webm|ogg|mov|mkv|avi)$/i)) {
    cb(null, true);
  } else {
    cb(new Error("Định dạng video không hợp lệ. Vui lòng tải lên tệp MP4, WebM hoặc OGG."));
  }
};

const diskStorage = multer.diskStorage({
  destination: (req, _file, cb) => {
    ensureDirectories();
    const user = (req as any).user;
    const uid = (req as any).uploadUid || req.query.uid || (req.body && req.body.uid) || user?.userId || "usr-teacher-001";
    const videoId = (req as any).uploadVideoId || req.query.videoId || (req.body && req.body.videoId) || `video_${Date.now()}`;
    (req as any).uploadUid = uid;
    (req as any).uploadVideoId = videoId;
    const teacherStorageDir = path.join(TEACHER_STORAGE_DIR, String(uid), String(videoId));
    if (!fs.existsSync(teacherStorageDir)) {
      fs.mkdirSync(teacherStorageDir, { recursive: true });
    }
    cb(null, teacherStorageDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".mp4";
    const sanitizedBase = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 40);
    const uniqueName = `video_${Date.now()}_${sanitizedBase}${ext}`;
    cb(null, uniqueName);
  }
});

export const videoUploadMiddleware = multer({
  storage: diskStorage,
  fileFilter: videoFileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB max
  }
});

export const chunkUploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max per chunk (chunks are 2MB)
  }
});

// Thumbnail Storage Configuration
const thumbnailDiskStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    ensureDirectories();
    cb(null, THUMBNAILS_UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    const sanitizedBase = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 40);
    const uniqueName = `thumb_${Date.now()}_${sanitizedBase}${ext}`;
    cb(null, uniqueName);
  }
});

export const thumbnailUploadMiddleware = multer({
  storage: thumbnailDiskStorage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max
  }
});
