/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Video Pipeline Resolver Service
 * Firebase Storage & Firestore Video Resolution Pipeline
 * 
 * Pipeline:
 * Firestore Metadata -> Storage Reference -> getDownloadURL() -> HTML5 Video -> Browser
 */

import { TheoryVideo } from '../types/theoryVideo';
import { TheoryVideoService } from './theoryVideoService';

export type VideoPipelineErrorType = 
  | 'none'
  | 'loading'
  | 'object-not-found'
  | 'unauthorized'
  | 'network-error'
  | 'unsupported-format'
  | 'corrupted'
  | 'unknown';

export interface VideoResolutionResult {
  videoId: string;
  storagePath: string;
  downloadURL: string;
  sizeBytes?: number;
  mimeType?: string;
  durationSeconds?: number;
  errorType: VideoPipelineErrorType;
  errorMessage?: string;
}

export class VideoPipelineService {
  /**
   * Resolves the real, verified download URL and storage metadata for a given video
   */
  public static async resolveVideo(video: TheoryVideo, userRole: 'student' | 'teacher' = 'student'): Promise<VideoResolutionResult> {
    const defaultStoragePath = video.storagePath || `videos/${video.topic.toLowerCase()}/${video.id}/${video.fileName || 'video.mp4'}`;
    
    // Authorization check for student
    if (userRole === 'student' && video.status !== 'PUBLISHED') {
      return {
        videoId: video.id,
        storagePath: defaultStoragePath,
        downloadURL: '',
        errorType: 'unauthorized',
        errorMessage: 'Bạn không có quyền xem video này.'
      };
    }

    try {
      // Step 1: Call backend resolver to verify storage reference and metadata
      const authHeaders = TheoryVideoService.getAuthHeaders(false, userRole === 'teacher' ? 'teacher' : undefined);
      const res = await fetch(`/api/theory-videos/${video.id}/resolve`, {
        headers: {
          ...authHeaders,
          'Accept': 'application/json'
        }
      });

      if (res.ok) {
        const data = await res.json();
        
        // Debug logging mandated by prompt
        console.log(`[VIDEO DEBUG]
videoId: ${data.videoId || video.id}
storagePath: ${data.storagePath}
downloadURL: ${data.downloadURL}`);

        return {
          videoId: data.videoId || video.id,
          storagePath: data.storagePath,
          downloadURL: data.downloadURL,
          sizeBytes: data.sizeBytes,
          mimeType: data.mimeType || 'video/mp4',
          durationSeconds: data.durationSeconds,
          errorType: 'none'
        };
      }

      // Step 2: Handle specific error responses
      const errData = await res.json().catch(() => ({}));
      const errorCode = errData.code || '';

      if (res.status === 404 || errorCode === 'storage/object-not-found') {
        return {
          videoId: video.id,
          storagePath: defaultStoragePath,
          downloadURL: '',
          errorType: 'object-not-found',
          errorMessage: 'Video này không còn tồn tại trong kho lưu trữ.'
        };
      }

      if (res.status === 401 || res.status === 403 || errorCode === 'storage/unauthorized') {
        return {
          videoId: video.id,
          storagePath: defaultStoragePath,
          downloadURL: '',
          errorType: 'unauthorized',
          errorMessage: errData.error || errData.message || 'Bạn không có quyền xem video này.'
        };
      }

      if (res.status === 422 || errorCode === 'storage/corrupted-file') {
        return {
          videoId: video.id,
          storagePath: defaultStoragePath,
          downloadURL: '',
          errorType: 'corrupted',
          errorMessage: 'Tệp video bị hỏng hoặc dung lượng không hợp lệ.'
        };
      }
    } catch (networkErr: any) {
      console.warn('[VideoPipeline] Backend resolve failed, attempting direct URL validation:', networkErr);
    }

    // Step 3: Direct fallback URL validation
    const candidateUrl = video.videoUrl || video.url;
    if (!candidateUrl) {
      return {
        videoId: video.id,
        storagePath: defaultStoragePath,
        downloadURL: '',
        errorType: 'object-not-found',
        errorMessage: 'Video này không còn tồn tại trong kho lưu trữ.'
      };
    }

    try {
      // Validate candidate URL with a HEAD request
      const headRes = await fetch(candidateUrl, { method: 'HEAD' });
      if (headRes.ok) {
        console.log(`[VIDEO DEBUG]
videoId: ${video.id}
storagePath: ${defaultStoragePath}
downloadURL: ${candidateUrl}`);

        return {
          videoId: video.id,
          storagePath: defaultStoragePath,
          downloadURL: candidateUrl,
          sizeBytes: video.fileSize,
          mimeType: video.mimeType || 'video/mp4',
          durationSeconds: video.durationSeconds,
          errorType: 'none'
        };
      }

      if (headRes.status === 404) {
        return {
          videoId: video.id,
          storagePath: defaultStoragePath,
          downloadURL: '',
          errorType: 'object-not-found',
          errorMessage: 'Video này không còn tồn tại trong kho lưu trữ.'
        };
      }

      if (headRes.status === 403) {
        return {
          videoId: video.id,
          storagePath: defaultStoragePath,
          downloadURL: '',
          errorType: 'unauthorized',
          errorMessage: 'Bạn không có quyền xem video này.'
        };
      }
    } catch {
      // Network or CORS issue
      return {
        videoId: video.id,
        storagePath: defaultStoragePath,
        downloadURL: '',
        errorType: 'network-error',
        errorMessage: 'Không thể truy cập video. Hãy kiểm tra kết nối mạng.'
      };
    }

    return {
      videoId: video.id,
      storagePath: defaultStoragePath,
      downloadURL: candidateUrl,
      errorType: 'none'
    };
  }

  /**
   * Classify HTML5 video playback errors into friendly Vietnamese messages
   */
  public static parseMediaError(mediaError: MediaError | null): { errorType: VideoPipelineErrorType; message: string } {
    if (!mediaError) {
      return {
        errorType: 'unknown',
        message: 'Đã xảy ra lỗi khi phát video.'
      };
    }

    switch (mediaError.code) {
      case MediaError.MEDIA_ERR_ABORTED:
        return {
          errorType: 'unknown',
          message: 'Quá trình tải video đã bị hủy.'
        };
      case MediaError.MEDIA_ERR_NETWORK:
        return {
          errorType: 'network-error',
          message: 'Không thể tải video. Hãy kiểm tra kết nối mạng.'
        };
      case MediaError.MEDIA_ERR_DECODE:
        return {
          errorType: 'corrupted',
          message: 'Video đã tải nhưng trình duyệt không thể giải mã định dạng này.'
        };
      case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
        return {
          errorType: 'unsupported-format',
          message: 'Trình duyệt không hỗ trợ định dạng video này.'
        };
      default:
        return {
          errorType: 'unknown',
          message: 'Không thể truy cập video trong kho lưu trữ.'
        };
    }
  }
}
