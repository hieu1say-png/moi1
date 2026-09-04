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
   * Upload video binary to persistent server storage
   */
  public static async uploadVideo(
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<UploadResult> {
    // 1. Validation
    if (!file) {
      return { success: false, error: 'Không tìm thấy tệp video để tải lên.' };
    }

    if (file.size > videoBankConfig.maxVideoSizeBytes) {
      return {
        success: false,
        error: `Dung lượng video (${(file.size / (1024 * 1024)).toFixed(1)}MB) vượt quá mức tối đa ${videoBankConfig.maxVideoSizeBytes / (1024 * 1024)}MB.`
      };
    }

    const validMimes = ['video/mp4', 'video/webm', 'video/ogg'];
    if (!validMimes.includes(file.type) && !file.name.endsWith('.mp4') && !file.name.endsWith('.webm')) {
      return {
        success: false,
        error: 'Định dạng tệp không được hỗ trợ. Vui lòng chọn tệp MP4 hoặc WebM.'
      };
    }

    // 2. Perform upload via XMLHttpRequest for granular progress tracking
    return new Promise<UploadResult>((resolve) => {
      const formData = new FormData();
      formData.append('video', file);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/theory-videos/upload', true);
      const authHeaders = TheoryVideoService.getAuthHeaders(false, 'teacher');
      Object.entries(authHeaders).forEach(([k, v]) => xhr.setRequestHeader(k, v));

      if (xhr.upload && onProgress) {
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            onProgress(percent);
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const res = JSON.parse(xhr.responseText);
            if (res.success && res.videoUrl) {
              resolve({
                success: true,
                videoUrl: res.videoUrl,
                storagePath: res.storagePath || res.videoUrl,
                fileName: res.fileName || file.name,
                fileSize: res.fileSize || file.size,
                mimeType: res.mimeType || file.type || 'video/mp4'
              });
            } else {
              resolve({
                success: false,
                error: res.error || 'Máy chủ không trả về URL hợp lệ.'
              });
            }
          } catch (err: any) {
            resolve({
              success: false,
              error: `Lỗi phân tích phản hồi máy chủ: ${err.message}`
            });
          }
        } else {
          resolve({
            success: false,
            error: `Tải lên thất bại với mã lỗi HTTP ${xhr.status}. Vui lòng thử lại.`
          });
        }
      };

      xhr.onerror = () => {
        resolve({
          success: false,
          error: 'Lỗi kết nối mạng khi tải tệp video lên máy chủ.'
        });
      };

      xhr.send(formData);
    });
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
