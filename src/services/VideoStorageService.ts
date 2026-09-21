/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Video Storage Service
 * Abstraction layer for video binary storage and retrieval.
 * Reuses server persistent storage (/uploads/ and /assets/) with validation.
 */

import { videoBankConfig } from '../data/theoryVideoBank';
import { TheoryVideoService } from './theoryVideoService';

export interface UploadResult {
  success: boolean;
  videoUrl?: string;
  thumbnailUrl?: string;
  storagePath?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  error?: string;
}

export class VideoStorageService {
  /**
   * Upload video binary using Direct Object Storage upload architecture
   * Bypasses Vercel serverless request body limit to prevent 413/500 errors
   */
  public static async uploadVideo(
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<UploadResult> {
    const res = await TheoryVideoService.uploadVideoFile(file, onProgress);
    if (!res.success || !res.videoUrl) {
      return {
        success: false,
        error: res.error || 'Tải video lên thất bại.'
      };
    }
    return {
      success: true,
      videoUrl: res.videoUrl,
      storagePath: res.storagePath || res.videoUrl,
      fileName: res.fileName || file.name,
      fileSize: res.fileSize || file.size,
      mimeType: res.mimeType || file.type || 'video/mp4'
    };
  }

  /**
   * Upload thumbnail image to persistent server storage
   */
  public static async uploadThumbnail(file: File): Promise<UploadResult> {
    if (!file) {
      return { success: false, error: 'Không tìm thấy tệp ảnh bìa.' };
    }

    try {
      const formData = new FormData();
      formData.append('thumbnail', file);

      const res = await fetch('/api/theory-videos/upload-thumbnail', {
        method: 'POST',
        headers: TheoryVideoService.getAuthHeaders(false, 'teacher'),
        body: formData
      });

      if (!res.ok) {
        return { success: false, error: `Upload thumbnail thất bại: HTTP ${res.status}` };
      }

      const data = await res.json();
      return {
        success: !!data.thumbnailUrl,
        thumbnailUrl: data.thumbnailUrl,
        error: data.error
      };
    } catch (err: any) {
      return { success: false, error: err.message || 'Lỗi mạng khi tải ảnh bìa.' };
    }
  }

  /**
   * Delete video binary from storage
   */
  public static async deleteVideo(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/theory-videos/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: TheoryVideoService.getAuthHeaders(false, 'teacher')
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  /**
   * Verify if a video URL is accessible via HEAD request
   */
  public static async verifyVideoUrl(url: string): Promise<boolean> {
    if (!url || (!url.startsWith('/assets/') && !url.startsWith('/uploads/'))) {
      return false;
    }

    try {
      const res = await fetch(url, { method: 'HEAD' });
      return res.ok;
    } catch {
      return false;
    }
  }
}
