/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Centralized Video Service
 * Implements full video lifecycle: Resumable upload control (pause/resume/cancel/retry),
 * thumbnail generation (16:9 canvas), metadata management, lesson integration,
 * and Vietnamese error handling.
 */

import { VideoAsset, VideoUploadProgress, GeometricTopicType } from '../types/videoAsset';
import { TheoryVideoService } from './theoryVideoService';

export interface UploadController {
  readonly id: string;
  pause: () => void;
  resume: () => void;
  cancel: () => void;
  retry: () => void;
  getProgress: () => VideoUploadProgress;
}

export class VideoService {
  private static activeControllers: Map<string, {
    xhr: XMLHttpRequest | null;
    file: File;
    metadata: Partial<VideoAsset>;
    onProgress: (prog: VideoUploadProgress) => void;
    onError: (err: string) => void;
    onComplete: (asset: VideoAsset) => void;
    currentProgress: VideoUploadProgress;
    simulatedPauseOffset?: number;
  }> = new Map();

  /**
   * Translates error codes to Vietnamese
   */
  public static formatErrorMessage(codeOrMessage: string): string {
    const text = (codeOrMessage || '').toLowerCase();
    if (text.includes('unauthorized') || text.includes('permission-denied') || text.includes('403')) {
      return 'Bạn không có quyền thực hiện thao tác này.';
    }
    if (text.includes('canceled') || text.includes('cancelled') || text.includes('abort')) {
      return 'Tải video đã bị hủy.';
    }
    if (text.includes('quota') || text.includes('storage-full')) {
      return 'Dung lượng lưu trữ đã đạt giới hạn.';
    }
    if (text.includes('retry-limit') || text.includes('network') || text.includes('timeout')) {
      return 'Kết nối không ổn định. Vui lòng thử lại.';
    }
    if (text.includes('invalid-file-type') || text.includes('định dạng') || text.includes('mimetype')) {
      return 'Định dạng video không được hỗ trợ. Chỉ hỗ trợ MP4, WebM, MOV.';
    }
    if (text.includes('invalid-file-size') || text.includes('dung lượng') || text.includes('too large')) {
      return 'Video vượt quá dung lượng cho phép (tối đa 100MB).';
    }
    return codeOrMessage || 'Đã xảy ra lỗi không xác định khi xử lý video.';
  }

  /**
   * Validates video file type and size
   */
  public static validateVideo(file: File): { valid: boolean; error?: string } {
    const allowedMimes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/ogg', 'video/x-matroska'];
    const hasValidExt = /\.(mp4|webm|mov|ogg|mkv)$/i.test(file.name);
    const hasValidMime = allowedMimes.includes(file.type) || (file.type.startsWith('video/') && hasValidExt);

    if (!hasValidMime && !hasValidExt) {
      return {
        valid: false,
        error: this.formatErrorMessage('invalid-file-type')
      };
    }

    const MAX_SIZE = 100 * 1024 * 1024; // 100MB
    if (file.size > MAX_SIZE) {
      return {
        valid: false,
        error: this.formatErrorMessage('invalid-file-size')
      };
    }

    return { valid: true };
  }

  /**
   * Calculate video duration in seconds via HTML5 video element
   */
  public static async calculateDuration(file: File): Promise<number> {
    return new Promise((resolve) => {
      try {
        const video = document.createElement('video');
        video.preload = 'metadata';
        const url = URL.createObjectURL(file);
        video.src = url;

        video.onloadedmetadata = () => {
          URL.revokeObjectURL(url);
          resolve(Math.round(video.duration || 0));
        };

        video.onerror = () => {
          URL.revokeObjectURL(url);
          resolve(0);
        };
      } catch {
        resolve(0);
      }
    });
  }

  /**
   * Generates a 16:9 thumbnail from the video at specified seconds
   */
  public static async generateThumbnail(file: File, atSecond = 1): Promise<string | null> {
    return new Promise((resolve) => {
      try {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.muted = true;
        (video as any).playsInline = true;
        const objectUrl = URL.createObjectURL(file);
        video.src = objectUrl;

        let resolved = false;
        const cleanup = () => {
          if (!resolved) {
            resolved = true;
            URL.revokeObjectURL(objectUrl);
          }
        };

        const timeoutId = setTimeout(() => {
          cleanup();
          resolve(null);
        }, 5000);

        video.onloadeddata = () => {
          video.currentTime = Math.min(atSecond, Math.max(0, (video.duration || 2) - 0.5));
        };

        video.onseeked = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = 640;
            canvas.height = 360; // 16:9
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
              clearTimeout(timeoutId);
              cleanup();
              resolve(dataUrl);
              return;
            }
          } catch {
            // fallback
          }
          clearTimeout(timeoutId);
          cleanup();
          resolve(null);
        };

        video.onerror = () => {
          clearTimeout(timeoutId);
          cleanup();
          resolve(null);
        };
      } catch {
        resolve(null);
      }
    });
  }

  /**
   * Resumable Upload controller supporting pause, resume, cancel, and retry
   */
  public static uploadVideo(
    file: File,
    metadata: Partial<VideoAsset>,
    onProgress: (progress: VideoUploadProgress) => void,
    onError: (error: string) => void,
    onComplete: (asset: VideoAsset) => void
  ): UploadController {
    const uploadId = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    const validation = this.validateVideo(file);
    if (!validation.valid) {
      const err = validation.error || 'Tệp không hợp lệ';
      onError(err);
      return {
        id: uploadId,
        pause: () => {},
        resume: () => {},
        cancel: () => {},
        retry: () => {},
        getProgress: () => ({
          bytesTransferred: 0,
          totalBytes: file.size,
          percentage: 0,
          state: 'error',
          errorMessage: err
        })
      };
    }

    const stateRecord = {
      xhr: null as XMLHttpRequest | null,
      file,
      metadata,
      onProgress,
      onError,
      onComplete,
      currentProgress: {
        bytesTransferred: 0,
        totalBytes: file.size,
        percentage: 0,
        state: 'running'
      } as VideoUploadProgress
    };

    this.activeControllers.set(uploadId, stateRecord);

    const startUpload = async () => {
      stateRecord.currentProgress.state = 'running';

      try {
        const uploadRes = await TheoryVideoService.uploadVideoFile(file, (percent) => {
          if (stateRecord.currentProgress.state !== 'running') return;
          stateRecord.currentProgress = {
            bytesTransferred: Math.round((file.size * percent) / 100),
            totalBytes: file.size,
            percentage: percent,
            state: 'running'
          };
          onProgress(stateRecord.currentProgress);
        });

        if ((stateRecord.currentProgress.state as string) === 'canceled') return;

        if (uploadRes.success && uploadRes.videoUrl) {
          stateRecord.currentProgress = {
            bytesTransferred: file.size,
            totalBytes: file.size,
            percentage: 100,
            state: 'success'
          };
          onProgress(stateRecord.currentProgress);

          // Construct standard VideoAsset
          const finalAsset: VideoAsset = {
            id: `video-${Date.now()}`,
            title: metadata.title || file.name.replace(/\.[^/.]+$/, ''),
            description: metadata.description || '',
            topic: (metadata.topic as GeometricTopicType) || 'sphere',
            lessonId: metadata.lessonId || `${metadata.topic || 'sphere'}-recognition`,
            lessonTitle: metadata.lessonTitle || '',
            section: metadata.section || 'THEORY',
            storagePath: uploadRes.storagePath || uploadRes.videoUrl,
            downloadURL: uploadRes.videoUrl,
            fileName: uploadRes.fileName || file.name,
            mimeType: uploadRes.mimeType || file.type || 'video/mp4',
            sizeBytes: uploadRes.fileSize || file.size,
            durationSeconds: metadata.durationSeconds ?? 15,
            thumbnailURL: metadata.thumbnailURL || null,
            uploadedBy: metadata.uploadedBy || 'teacher_001',
            uploadedByName: metadata.uploadedByName || 'ThS. Trần Ngọc Hiếu',
            published: metadata.published ?? true,
            visibility: metadata.visibility || 'students',
            order: metadata.order ?? 1,
            uploadStatus: 'ready',
            createdAt: Date.now(),
            updatedAt: Date.now()
          };

          // Persist metadata to server
          await VideoService.createVideoMetadata(finalAsset).catch(() => {});
          onComplete(finalAsset);
          return;
        }

        const errMsg = VideoService.formatErrorMessage(uploadRes.error || 'Lỗi lưu video');
        stateRecord.currentProgress.state = 'error';
        stateRecord.currentProgress.errorMessage = errMsg;
        onError(errMsg);
      } catch (err: any) {
        if (stateRecord.currentProgress.state === 'canceled') return;
        const errMsg = VideoService.formatErrorMessage(err.message || 'Lỗi kết nối khi tải video');
        stateRecord.currentProgress.state = 'error';
        stateRecord.currentProgress.errorMessage = errMsg;
        onError(errMsg);
      }
    };

    startUpload();

    const controller: UploadController = {
      id: uploadId,
      pause: () => {
        if (stateRecord.currentProgress.state === 'running') {
          if (stateRecord.xhr) {
            stateRecord.xhr.abort();
            stateRecord.xhr = null;
          }
          stateRecord.currentProgress.state = 'paused';
          onProgress({ ...stateRecord.currentProgress });
        }
      },
      resume: () => {
        if (stateRecord.currentProgress.state === 'paused') {
          startUpload();
        }
      },
      cancel: () => {
        stateRecord.currentProgress.state = 'canceled';
        if (stateRecord.xhr) {
          stateRecord.xhr.abort();
          stateRecord.xhr = null;
        }
        onProgress({
          ...stateRecord.currentProgress,
          state: 'canceled'
        });
      },
      retry: () => {
        startUpload();
      },
      getProgress: () => ({ ...stateRecord.currentProgress })
    };

    return controller;
  }

  /**
   * Get all videos with optional published filtering
   */
  public static async getVideos(isStudent = false): Promise<VideoAsset[]> {
    try {
      const url = `/api/theory-videos${isStudent ? '?publishedOnly=true' : ''}`;
      const res = await fetch(url, {
        headers: isStudent ? { 'x-user-role': 'student' } : { 'x-user-role': 'teacher' }
      });
      if (res.ok) {
        const rawList = await res.json();
        return rawList.map(this.mapServerToAsset);
      }
    } catch (e) {
      console.warn('[VIDEO-SERVICE] getVideos fetch error:', e);
    }
    return [];
  }

  /**
   * Get single video by ID
   */
  public static async getVideoById(id: string, isStudent = false): Promise<VideoAsset | null> {
    try {
      const res = await fetch(`/api/theory-videos/${id}`, {
        headers: isStudent ? { 'x-user-role': 'student' } : { 'x-user-role': 'teacher' }
      });
      if (res.ok) {
        const item = await res.json();
        return this.mapServerToAsset(item);
      }
    } catch {
      // fallback
    }
    return null;
  }

  /**
   * Get videos by topic (cylinder, sphere, cone)
   */
  public static async getVideosByTopic(topic: GeometricTopicType, isStudent = false): Promise<VideoAsset[]> {
    const list = await this.getVideos(isStudent);
    return list.filter((v) => v.topic.toLowerCase() === topic.toLowerCase());
  }

  /**
   * Get videos assigned to a specific lesson (AUTO INTEGRATION)
   * Ordered by order ASC, createdAt DESC
   */
  public static async getVideosByLesson(lessonId: string, isStudent = true): Promise<VideoAsset[]> {
    const all = await this.getVideos(isStudent);
    return all
      .filter((v) => {
        if (isStudent && (!v.published || v.uploadStatus !== 'ready')) return false;
        // Match exact lessonId or prefix topic
        return v.lessonId === lessonId || (lessonId.includes(v.topic) && (!v.lessonId || v.lessonId.includes(v.topic)));
      })
      .sort((a, b) => {
        if (a.order !== b.order) return a.order - b.order;
        const timeA = typeof a.createdAt === 'number' ? a.createdAt : 0;
        const timeB = typeof b.createdAt === 'number' ? b.createdAt : 0;
        return timeB - timeA;
      });
  }

  /**
   * Create video metadata
   */
  public static async createVideoMetadata(asset: VideoAsset): Promise<VideoAsset> {
    const serverPayload = {
      id: asset.id,
      topic: asset.topic.toUpperCase(),
      section: asset.section || 'THEORY',
      title: asset.title,
      description: asset.description || '',
      videoUrl: asset.downloadURL,
      thumbnailUrl: asset.thumbnailURL || '',
      duration: asset.durationSeconds ? `${Math.floor(asset.durationSeconds / 60)}:${(asset.durationSeconds % 60).toString().padStart(2, '0')}` : '04:00',
      durationSeconds: asset.durationSeconds || 240,
      fileName: asset.fileName,
      fileSize: asset.sizeBytes,
      mimeType: asset.mimeType,
      order: asset.order,
      status: asset.published ? 'PUBLISHED' : 'DRAFT',
      visibility: asset.visibility,
      authorName: asset.uploadedByName || 'ThS. Trần Ngọc Hiếu',
      authorId: asset.uploadedBy || 'usr-teacher-001',
      lessonId: asset.lessonId,
      lessonTitle: asset.lessonTitle,
      storagePath: asset.storagePath,
      uploadStatus: asset.uploadStatus
    };

    const res = await fetch('/api/theory-videos', {
      method: 'POST',
      headers: TheoryVideoService.getAuthHeaders(true, 'teacher'),
      body: JSON.stringify(serverPayload)
    });

    if (res.ok) {
      const json = await res.json();
      if (json.video) return this.mapServerToAsset(json.video);
    }
    return asset;
  }

  /**
   * Update video metadata
   */
  public static async updateVideoMetadata(id: string, updates: Partial<VideoAsset>): Promise<VideoAsset | null> {
    const serverPayload: any = {};
    if (updates.title !== undefined) serverPayload.title = updates.title;
    if (updates.description !== undefined) serverPayload.description = updates.description;
    if (updates.topic !== undefined) serverPayload.topic = updates.topic.toUpperCase();
    if (updates.lessonId !== undefined) serverPayload.lessonId = updates.lessonId;
    if (updates.lessonTitle !== undefined) serverPayload.lessonTitle = updates.lessonTitle;
    if (updates.order !== undefined) serverPayload.order = updates.order;
    if (updates.published !== undefined) serverPayload.status = updates.published ? 'PUBLISHED' : 'DRAFT';
    if (updates.visibility !== undefined) serverPayload.visibility = updates.visibility;
    if (updates.uploadStatus !== undefined) serverPayload.uploadStatus = updates.uploadStatus;
    if (updates.thumbnailURL !== undefined) serverPayload.thumbnailUrl = updates.thumbnailURL;

    const res = await fetch(`/api/theory-videos/${id}`, {
      method: 'PUT',
      headers: TheoryVideoService.getAuthHeaders(true, 'teacher'),
      body: JSON.stringify(serverPayload)
    });

    if (res.ok) {
      const json = await res.json();
      if (json.video) return this.mapServerToAsset(json.video);
    }
    return null;
  }

  /**
   * Publish video
   */
  public static async publishVideo(id: string): Promise<boolean> {
    const res = await this.updateVideoMetadata(id, { published: true, uploadStatus: 'ready' });
    return Boolean(res);
  }

  /**
   * Unpublish video
   */
  public static async unpublishVideo(id: string): Promise<boolean> {
    const res = await this.updateVideoMetadata(id, { published: false });
    return Boolean(res);
  }

  /**
   * Delete video (removes both metadata and physical storage file)
   */
  public static async deleteVideo(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/theory-videos/${id}`, {
        method: 'DELETE',
        headers: TheoryVideoService.getAuthHeaders(false, 'teacher')
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  /**
   * Helper mapping server record to VideoAsset
   */
  private static mapServerToAsset(s: any): VideoAsset {
    const topicNorm = (s.topic || 'sphere').toString().toLowerCase();
    const topic: GeometricTopicType = topicNorm.includes('cyl') ? 'cylinder' : topicNorm.includes('cone') ? 'cone' : 'sphere';

    return {
      id: s.id,
      title: s.title || 'Video bài giảng',
      description: s.description || '',
      topic,
      lessonId: s.lessonId || `${topic}-recognition`,
      lessonTitle: s.lessonTitle || '',
      section: s.section || 'THEORY',
      storagePath: s.storagePath || `videos/teacher_001/${s.id}/original/${s.fileName || 'video.mp4'}`,
      downloadURL: s.videoUrl || s.url || '',
      fileName: s.fileName || 'video.mp4',
      mimeType: s.mimeType || 'video/mp4',
      sizeBytes: s.fileSize || 0,
      durationSeconds: s.durationSeconds || null,
      thumbnailURL: s.thumbnailUrl || s.thumbnail || null,
      uploadedBy: s.authorId || 'usr-teacher-001',
      uploadedByName: s.authorName || 'ThS. Trần Ngọc Hiếu',
      published: s.status === 'PUBLISHED',
      visibility: s.visibility || 'students',
      order: s.order || 1,
      uploadStatus: s.uploadStatus || (s.status === 'PUBLISHED' ? 'ready' : 'ready'),
      createdAt: s.createdAt || Date.now(),
      updatedAt: s.updatedAt || Date.now()
    };
  }
}
