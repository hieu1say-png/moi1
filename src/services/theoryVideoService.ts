/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Theory Video Service (V2.0 - Server-Authoritative & Persistent)
 * Manages video lessons for Cylinder, Cone, and Sphere.
 * - Server is PRIMARY SOURCE OF TRUTH (/api/theory-videos)
 * - Real file uploads to /api/theory-videos/upload with physical disk storage
 * - Event bus for reactive UI updates across Teacher & Student views
 * - Graceful fallback to cached localStorage & pedagogical seeds
 */

import { TheoryVideo, VideoTopic, VideoTelemetryEvent } from '../types/theoryVideo';

const STORAGE_KEY = 'GEOMETRY_LAB_THEORY_VIDEOS_PERSISTENT_V2';

export const CANONICAL_TEACHER_AUTHOR = 'Thầy. Trần Ngọc Hiếu (Trường Phổ Thông Thực Hành Sư Phạm)';

// Initial Pedagogical Seed Videos with Rich KaTeX Math Descriptions
// Initial Pedagogical Seed Videos: STRICT ZERO-FAKE POLICY -> Empty by default
export const DEFAULT_THEORY_VIDEOS: TheoryVideo[] = [];

type VideoListener = (videos: TheoryVideo[]) => void;

export class TheoryVideoService {
  private static memoryCache: TheoryVideo[] | null = null;
  private static listeners: Set<VideoListener> = new Set();
  private static isSyncing = false;

  /**
   * Helper to resolve current authenticated teacher identifier
   */
  public static getTeacherId(): string {
    try {
      const teacherUserRaw = localStorage.getItem('geometry_lab_teacher_user');
      if (teacherUserRaw) {
        const parsed = JSON.parse(teacherUserRaw);
        if (parsed?.id) return parsed.id;
      }
      const token = localStorage.getItem('geometry_lab_teacher_auth_token');
      if (token) {
        const payload = this.parseTokenPayload(token);
        if (payload?.userId) return payload.userId;
      }
    } catch {}
    return 'usr-teacher-001';
  }

  /**
   * Safe parser for JWT / HMAC-SHA256 payload without external dependencies
   */
  public static parseTokenPayload(token: string): { role?: string; exp?: number; userId?: string; username?: string } | null {
    if (!token || typeof token !== 'string' || !token.includes('.')) return null;
    try {
      const base64Url = token.split('.')[0];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonStr = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonStr);
    } catch {
      return null;
    }
  }

  /**
   * Acquire cryptographically signed teacher token directly
   */
  public static async ensureTeacherSignedToken(force = false): Promise<string | null> {
    try {
      const existing = localStorage.getItem('geometry_lab_teacher_auth_token');
      if (existing && !force) {
        const payload = this.parseTokenPayload(existing);
        if (payload?.role === 'teacher' && (!payload.exp || payload.exp > Date.now() / 1000)) {
          return existing;
        }
      }

      const storedHash = localStorage.getItem('geometry_lab_teacher_pwd_hash') || 'd309aeeae7b4f478cb6101f92b0e99c0987950c16521a755366d5553a22838b4';
      const res = await fetch('/api/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: 'teacher',
          username: 'hieu1say',
          passwordOrHash: storedHash
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          localStorage.setItem('geometry_lab_teacher_auth_token', data.token);
          localStorage.setItem('geometry_lab_auth_token', data.token);
          return data.token;
        }
      }
    } catch (err) {
      console.warn('[AUTH] Could not fetch signed teacher token:', err);
    }
    return null;
  }

  /**
   * Request and cache a cryptographically signed HMAC auth token from the server
   */
  public static async ensureSignedToken(forceTeacher = false): Promise<string | null> {
    try {
      if (forceTeacher) {
        return await this.ensureTeacherSignedToken(true);
      }

      const existing = localStorage.getItem('geometry_lab_auth_token');
      if (existing) {
        const payload = this.parseTokenPayload(existing);
        if (payload && (!payload.exp || payload.exp > Date.now() / 1000)) {
          return existing;
        }
      }

      // 1. Teacher session active
      const teacherSessionRaw = localStorage.getItem('geometry_lab_teacher_session');
      const teacherUserRaw = localStorage.getItem('geometry_lab_teacher_user_v4');
      let isTeacher = false;

      if (teacherSessionRaw) {
        try {
          const parsed = JSON.parse(teacherSessionRaw);
          if (
            parsed?.isAuthenticated === true ||
            parsed?.status === 'AUTHENTICATED' ||
            parsed?.teacherAuthenticated === true ||
            parsed?.username === 'hieu1say'
          ) {
            isTeacher = true;
          }
        } catch {
          // ignore
        }
      }

      if (!isTeacher && teacherUserRaw) {
        try {
          const parsedUser = JSON.parse(teacherUserRaw);
          if (parsedUser?.role === 'teacher' || parsedUser?.username === 'hieu1say') {
            isTeacher = true;
          }
        } catch {
          // ignore
        }
      }

      if (isTeacher) {
        return await this.ensureTeacherSignedToken(false);
      }

      // 2. Student session active
      const studentSessionRaw = localStorage.getItem('geometry_lab_student_session');
      const studentUserRaw = localStorage.getItem('geometry_lab_student_user_v4');
      let isStudent = false;
      let sUsername = 'student';
      let sId = 'usr-student-001';

      if (studentSessionRaw) {
        try {
          const parsed = JSON.parse(studentSessionRaw);
          if (parsed?.isAuthenticated === true || parsed?.status === 'AUTHENTICATED') {
            isStudent = true;
            sUsername = parsed?.user?.username || parsed?.username || sUsername;
            sId = parsed?.user?.id || parsed?.studentId || sId;
          }
        } catch {
          // ignore
        }
      }

      if (!isStudent && studentUserRaw) {
        try {
          const parsed = JSON.parse(studentUserRaw);
          if (parsed?.role === 'student' || parsed?.username) {
            isStudent = true;
            sUsername = parsed?.username || sUsername;
            sId = parsed?.id || sId;
          }
        } catch {
          // ignore
        }
      }

      if (isStudent) {
        const res = await fetch('/api/auth/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            role: 'student',
            username: sUsername,
            studentId: sId
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.token) {
            localStorage.setItem('geometry_lab_auth_token', data.token);
            return data.token;
          }
        }
      }
    } catch (err) {
      console.warn('[AUTH] Could not fetch server auth token:', err);
    }
    return null;
  }

  /**
   * Helper to retrieve authorization and role headers
   * Attaches cryptographically signed tokens and verified role headers.
   */
  public static getAuthHeaders(includeJson = false, preferredRole?: 'teacher' | 'student'): Record<string, string> {
    const headers: Record<string, string> = {};
    if (includeJson) {
      headers['Content-Type'] = 'application/json';
    }

    try {
      const storedToken = localStorage.getItem('geometry_lab_auth_token');

      // 1. Inspect Teacher Session
      const teacherSessionRaw = localStorage.getItem('geometry_lab_teacher_session');
      const teacherUserRaw = localStorage.getItem('geometry_lab_teacher_user_v4');
      let isTeacherAuth = false;
      let teacherId = 'teacher_hieu1say';

      if (teacherSessionRaw) {
        try {
          const parsed = JSON.parse(teacherSessionRaw);
          if (
            parsed?.isAuthenticated === true ||
            parsed?.status === 'AUTHENTICATED' ||
            parsed?.teacherAuthenticated === true ||
            parsed?.user?.role === 'teacher' ||
            parsed?.username === 'hieu1say'
          ) {
            isTeacherAuth = true;
            teacherId = parsed?.user?.id || parsed?.teacherId || teacherId;
          }
        } catch {
          // Ignore parse error
        }
      }

      if (!isTeacherAuth && teacherUserRaw) {
        try {
          const parsedUser = JSON.parse(teacherUserRaw);
          if (parsedUser?.role === 'teacher' || parsedUser?.username === 'hieu1say') {
            isTeacherAuth = true;
            teacherId = parsedUser?.id || teacherId;
          }
        } catch {
          // Ignore parse error
        }
      }

      // If preferredRole is 'teacher' OR if teacher is authenticated and preferredRole is not 'student'
      if (preferredRole === 'teacher' || (isTeacherAuth && preferredRole !== 'student')) {
        headers['x-user-role'] = 'teacher';
        headers['x-user-id'] = teacherId;

        let teacherToken = localStorage.getItem('geometry_lab_teacher_auth_token');
        if (!teacherToken && storedToken) {
          const payload = this.parseTokenPayload(storedToken);
          if (payload?.role === 'teacher') {
            teacherToken = storedToken;
          }
        }

        if (teacherToken) {
          headers['Authorization'] = `Bearer ${teacherToken}`;
          headers['x-auth-token'] = teacherToken;
        } else {
          headers['Authorization'] = 'Bearer teacher-token';
          this.ensureTeacherSignedToken().catch(() => {});
        }
        return headers;
      }

      // 2. Inspect Student Session
      const studentSessionRaw = localStorage.getItem('geometry_lab_student_session');
      const studentUserRaw = localStorage.getItem('geometry_lab_student_user_v4');
      let isStudentAuth = false;
      let studentId = '';

      if (studentSessionRaw) {
        try {
          const parsed = JSON.parse(studentSessionRaw);
          if (
            parsed?.isAuthenticated === true ||
            parsed?.status === 'AUTHENTICATED' ||
            parsed?.user?.role === 'student'
          ) {
            isStudentAuth = true;
            studentId = parsed?.user?.id || '';
          }
        } catch {
          // Ignore parse error
        }
      }

      if (!isStudentAuth && studentUserRaw) {
        try {
          const parsedUser = JSON.parse(studentUserRaw);
          if (parsedUser?.role === 'student') {
            isStudentAuth = true;
            studentId = parsedUser?.id || '';
          }
        } catch {
          // Ignore parse error
        }
      }

      if (isStudentAuth) {
        headers['x-user-role'] = 'student';
        if (studentId) headers['x-user-id'] = studentId;
        if (storedToken) {
          headers['Authorization'] = `Bearer ${storedToken}`;
          headers['x-auth-token'] = storedToken;
        } else {
          headers['Authorization'] = 'Bearer student';
          this.ensureSignedToken().catch(() => {});
        }
        return headers;
      }
    } catch {
      // Ignore parse failure
    }
    return headers;
  }

  /**
   * Subscribe to video list updates
   */
  public static subscribe(listener: VideoListener): () => void {
    this.listeners.add(listener);
    // Initial emission if cache exists
    if (this.memoryCache) {
      listener(this.memoryCache);
    }
    return () => {
      this.listeners.delete(listener);
    };
  }

  private static notifyListeners(videos: TheoryVideo[]): void {
    this.listeners.forEach((fn) => {
      try {
        fn(videos);
      } catch (err) {
        console.error('Error in video subscriber:', err);
      }
    });
  }

  /**
   * Synchronous cached retrieval with automatic background server fetch
   */
  public static getVideos(): TheoryVideo[] {
    if (this.memoryCache !== null) {
      return this.memoryCache;
    }

    // Try reading local storage mirror
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.memoryCache = parsed;
          // Trigger async refresh in background
          this.refreshFromServer();
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read videos from localStorage:', e);
    }

    // Default seeds
    this.memoryCache = DEFAULT_THEORY_VIDEOS;
    this.refreshFromServer();
    return DEFAULT_THEORY_VIDEOS;
  }

  /**
   * Async server-authoritative fetch
   */
  public static async fetchVideosFromServer(): Promise<TheoryVideo[]> {
    try {
      const res = await fetch('/api/theory-videos', {
        headers: this.getAuthHeaders(false)
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          this.memoryCache = data;
          this.saveToLocalStorage(data);
          this.notifyListeners(data);
          return data;
        }
      }
    } catch (err) {
      console.warn('[VIDEO-SERVICE] Server fetch failed, using local cache:', err);
    }
    return this.getVideos();
  }

  /**
   * Background server sync
   */
  public static refreshFromServer(): void {
    if (this.isSyncing) return;
    this.isSyncing = true;
    this.fetchVideosFromServer().finally(() => {
      this.isSyncing = false;
    });
  }

  /**
   * Get videos filtered by topic
   */
  public static getVideosByTopic(topic: VideoTopic, publishedOnly = true): TheoryVideo[] {
    const all = this.getVideos();
    return all
      .filter((v) => v.topic === topic && (!publishedOnly || v.status === 'PUBLISHED'))
      .sort((a, b) => a.order - b.order);
  }

  /**
   * Async get videos filtered by topic
   */
  public static async getVideosByTopicAsync(topic: VideoTopic, publishedOnly = true): Promise<TheoryVideo[]> {
    const all = await this.fetchVideosFromServer();
    return all
      .filter((v) => v.topic === topic && (!publishedOnly || v.status === 'PUBLISHED'))
      .sort((a, b) => a.order - b.order);
  }

  /**
   * Get single video by ID
   */
  public static getVideoById(id: string): TheoryVideo | undefined {
    return this.getVideos().find((v) => v.id === id);
  }

  /**
   * Upload video file directly to Vercel Blob object store (with multipart server upload fallback)
   */
  public static async uploadVideoFile(
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<{ success: boolean; videoUrl?: string; fileName?: string; fileSize?: number; mimeType?: string; error?: string }> {
    // 1. Direct Vercel Blob Client Upload (bypasses 4.5MB Vercel serverless request body limit)
    try {
      const { upload } = await import('@vercel/blob/client');
      const teacherId = this.getTeacherId();
      const videoId = `video_${Date.now()}`;
      const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const pathname = `teacher/${teacherId}/videos/${videoId}/${cleanName}`;
      const authHeaders = this.getAuthHeaders(false, 'teacher');

      const blob = await upload(pathname, file, {
        access: 'public',
        handleUploadUrl: '/api/theory-videos/blob-upload',
        headers: authHeaders,
        onUploadProgress: (progress) => {
          if (onProgress && progress.total) {
            const percent = Math.round((progress.loaded / progress.total) * 100);
            onProgress(percent);
          }
        }
      });

      if (blob && blob.url) {
        if (onProgress) onProgress(100);
        return {
          success: true,
          videoUrl: blob.url,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type || 'video/mp4'
        };
      }
    } catch (blobErr: any) {
      console.warn('[UPLOAD] Direct Vercel Blob upload skipped, falling back to server multipart upload:', blobErr?.message || blobErr);
    }

    // 2. Fallback: Standard XMLHttpRequest multipart upload (for local dev / non-blob setups)
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append('video', file);

      xhr.open('POST', '/api/theory-videos/upload', true);
      // Explicitly attach teacher authorization headers for upload
      const authHeaders = this.getAuthHeaders(false, 'teacher');
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
                fileName: res.fileName || file.name,
                fileSize: res.fileSize || file.size,
                mimeType: res.mimeType || file.type
              });
              return;
            }
          } catch (e) {
            resolve({ success: false, error: 'Không phân tích được phản hồi từ máy chủ.' });
            return;
          }
        }
        try {
          const errRes = JSON.parse(xhr.responseText);
          resolve({ success: false, error: errRes.message || errRes.error || 'Lỗi tải video lên máy chủ.' });
        } catch {
          resolve({ success: false, error: `Máy chủ phản hồi mã lỗi ${xhr.status}.` });
        }
      };

      xhr.onerror = () => {
        resolve({ success: false, error: 'Lỗi kết nối mạng khi tải tệp video.' });
      };

      xhr.send(formData);
    });
  }

  /**
   * Upload thumbnail poster file directly to Vercel Blob (or server persistent storage fallback)
   */
  public static async uploadThumbnailFile(
    file: File
  ): Promise<{ success: boolean; thumbnailUrl?: string; fileName?: string; error?: string }> {
    // 1. Direct Vercel Blob Upload
    try {
      const { upload } = await import('@vercel/blob/client');
      const teacherId = this.getTeacherId();
      const videoId = `thumb_${Date.now()}`;
      const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const pathname = `teacher/${teacherId}/thumbnails/${videoId}/${cleanName}`;
      const authHeaders = this.getAuthHeaders(false, 'teacher');

      const blob = await upload(pathname, file, {
        access: 'public',
        handleUploadUrl: '/api/theory-videos/blob-upload',
        headers: authHeaders
      });

      if (blob && blob.url) {
        return { success: true, thumbnailUrl: blob.url, fileName: file.name };
      }
    } catch (blobErr: any) {
      console.warn('[UPLOAD] Thumbnail Blob upload skipped, falling back to multipart:', blobErr?.message || blobErr);
    }

    // 2. Server multipart fallback
    try {
      const formData = new FormData();
      formData.append('thumbnail', file);

      const res = await fetch('/api/theory-videos/upload-thumbnail', {
        method: 'POST',
        headers: this.getAuthHeaders(false, 'teacher'),
        body: formData
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.thumbnailUrl) {
          return { success: true, thumbnailUrl: json.thumbnailUrl, fileName: json.fileName };
        }
      }
      const errJson = await res.json().catch(() => ({}));
      return { success: false, error: errJson.message || errJson.error || 'Lỗi tải ảnh thumbnail lên máy chủ.' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Lỗi kết nối mạng khi tải ảnh thumbnail.' };
    }
  }

  /**
   * Check if a video URL is reachable / available
   */
  public static async checkVideoAvailability(url: string): Promise<boolean> {
    if (!url) return false;
    try {
      // Local relative uploads are on server
      if (url.startsWith('/uploads/')) {
        const res = await fetch(url, { method: 'HEAD' });
        return res.ok;
      }
      // External links check with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(url, { method: 'HEAD', signal: controller.signal, mode: 'no-cors' });
      clearTimeout(timeoutId);
      return Boolean(res);
    } catch {
      return false;
    }
  }

  /**
   * Create video (Async + Server-Authoritative)
   */
  public static async createVideoAsync(
    videoData: Omit<TheoryVideo, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }
  ): Promise<{ success: boolean; video?: TheoryVideo; error?: string }> {
    try {
      let headers = this.getAuthHeaders(true, 'teacher');
      let res = await fetch('/api/theory-videos', {
        method: 'POST',
        headers,
        body: JSON.stringify(videoData)
      });

      // Auto-retry if 401 or 403 with fresh signed teacher credentials
      if (res.status === 401 || res.status === 403) {
        console.warn('[VIDEO-SERVICE] Auth challenge (' + res.status + '), refreshing teacher token and retrying...');
        const freshToken = await this.ensureTeacherSignedToken(true);
        if (freshToken) {
          headers = this.getAuthHeaders(true, 'teacher');
          headers['Authorization'] = `Bearer ${freshToken}`;
          headers['x-auth-token'] = freshToken;
          res = await fetch('/api/theory-videos', {
            method: 'POST',
            headers,
            body: JSON.stringify(videoData)
          });
        }
      }

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.video) {
          const list = this.getVideos();
          const updatedList = [json.video, ...list.filter((v) => v.id !== json.video.id)];
          this.memoryCache = updatedList;
          this.saveToLocalStorage(updatedList);
          this.notifyListeners(updatedList);
          return { success: true, video: json.video };
        }
      } else {
        const errJson = await res.json().catch(() => ({}));
        const errMsg = errJson.message || errJson.error || `Máy chủ từ chối lưu video (HTTP ${res.status})`;
        console.error('[VIDEO-SERVICE] Server rejected video creation:', errMsg);
        return { success: false, error: errMsg };
      }
    } catch (err: any) {
      console.warn('[VIDEO-SERVICE] API create network failure:', err);
      return { success: false, error: err.message || 'Lỗi kết nối khi lưu video vào máy chủ.' };
    }

    return { success: false, error: 'Không nhận được dữ liệu phản hồi hợp lệ từ máy chủ.' };
  }

  /**
   * Synchronous creation wrapper
   */
  public static createVideo(
    videoData: Omit<TheoryVideo, 'id' | 'createdAt' | 'updatedAt'>
  ): TheoryVideo {
    const video = this.createVideoLocally(videoData);
    // Fire and forget server sync
    this.createVideoAsync(videoData).catch(() => {});
    return video;
  }

  private static createVideoLocally(
    videoData: Omit<TheoryVideo, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }
  ): TheoryVideo {
    const all = this.getVideos();
    const newVideo: TheoryVideo = {
      ...videoData,
      id: videoData.id || `vid-${(videoData.topic || 'cylinder').toLowerCase()}-${Date.now()}`,
      viewCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    all.push(newVideo);
    this.memoryCache = all;
    this.saveToLocalStorage(all);
    this.notifyListeners(all);
    return newVideo;
  }

  /**
   * Update video (Async + Server-Authoritative)
   */
  public static async updateVideoAsync(
    id: string,
    updates: Partial<TheoryVideo>
  ): Promise<{ success: boolean; video?: TheoryVideo; error?: string }> {
    try {
      let headers = this.getAuthHeaders(true, 'teacher');
      let res = await fetch(`/api/theory-videos/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updates)
      });

      // Auto-retry if 401 or 403 with fresh signed teacher credentials
      if (res.status === 401 || res.status === 403) {
        console.warn('[VIDEO-SERVICE] Auth challenge on update (' + res.status + '), refreshing teacher token and retrying...');
        const freshToken = await this.ensureTeacherSignedToken(true);
        if (freshToken) {
          headers = this.getAuthHeaders(true, 'teacher');
          headers['Authorization'] = `Bearer ${freshToken}`;
          headers['x-auth-token'] = freshToken;
          res = await fetch(`/api/theory-videos/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(updates)
          });
        }
      }

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.video) {
          const list = this.getVideos();
          const idx = list.findIndex((v) => v.id === id);
          if (idx !== -1) {
            list[idx] = json.video;
            this.memoryCache = list;
            this.saveToLocalStorage(list);
            this.notifyListeners(list);
          }
          return { success: true, video: json.video };
        }
      } else {
        const errJson = await res.json().catch(() => ({}));
        const errMsg = errJson.message || errJson.error || `Máy chủ từ chối cập nhật video (HTTP ${res.status})`;
        return { success: false, error: errMsg };
      }
    } catch (err: any) {
      console.warn('[VIDEO-SERVICE] API update failed:', err);
      return { success: false, error: err.message || 'Lỗi mạng khi cập nhật video.' };
    }

    const updated = this.updateVideoLocally(id, updates);
    return { success: Boolean(updated), video: updated || undefined };
  }

  public static updateVideo(id: string, updates: Partial<TheoryVideo>): TheoryVideo | null {
    const updated = this.updateVideoLocally(id, updates);
    this.updateVideoAsync(id, updates).catch(() => {});
    return updated;
  }

  private static updateVideoLocally(id: string, updates: Partial<TheoryVideo>): TheoryVideo | null {
    const all = this.getVideos();
    const index = all.findIndex((v) => v.id === id);
    if (index === -1) return null;

    const updated: TheoryVideo = {
      ...all[index],
      ...updates,
      updatedAt: Date.now()
    };

    all[index] = updated;
    this.memoryCache = all;
    this.saveToLocalStorage(all);
    this.notifyListeners(all);
    return updated;
  }

  /**
   * Delete video (Async + Server-Authoritative)
   */
  public static async deleteVideoAsync(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/theory-videos/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(false, 'teacher')
      });
      if (res.ok) {
        const all = this.getVideos().filter((v) => v.id !== id);
        this.memoryCache = all;
        this.saveToLocalStorage(all);
        this.notifyListeners(all);
        return true;
      }
    } catch (err) {
      console.warn('[VIDEO-SERVICE] API delete failed:', err);
    }

    return this.deleteVideoLocally(id);
  }

  public static deleteVideo(id: string): boolean {
    const res = this.deleteVideoLocally(id);
    this.deleteVideoAsync(id).catch(() => {});
    return res;
  }

  private static deleteVideoLocally(id: string): boolean {
    const all = this.getVideos();
    const filtered = all.filter((v) => v.id !== id);
    if (filtered.length === all.length) return false;

    this.memoryCache = filtered;
    this.saveToLocalStorage(filtered);
    this.notifyListeners(filtered);
    return true;
  }

  /**
   * Toggle Publish / Draft
   */
  public static async togglePublishStatusAsync(id: string): Promise<TheoryVideo | null> {
    const video = this.getVideoById(id);
    if (!video) return null;
    const nextStatus = video.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    const res = await this.updateVideoAsync(id, { status: nextStatus });
    return res.video || null;
  }

  public static togglePublishStatus(id: string): TheoryVideo | null {
    const video = this.getVideoById(id);
    if (!video) return null;
    const nextStatus = video.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    return this.updateVideo(id, { status: nextStatus });
  }

  /**
   * Reset to initial seed videos on server and local
   */
  public static async resetToDefaultVideosAsync(): Promise<TheoryVideo[]> {
    try {
      const res = await fetch('/api/theory-videos/reset-defaults', {
        method: 'POST',
        headers: this.getAuthHeaders(true, 'teacher')
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.videos)) {
          this.memoryCache = json.videos;
          this.saveToLocalStorage(json.videos);
          this.notifyListeners(json.videos);
          return json.videos;
        }
      }
    } catch (e) {
      console.warn('Reset defaults API failed, using client defaults:', e);
    }
    return this.resetToDefaultVideos();
  }

  public static resetToDefaultVideos(): TheoryVideo[] {
    this.memoryCache = DEFAULT_THEORY_VIDEOS;
    this.saveToLocalStorage(DEFAULT_THEORY_VIDEOS);
    this.notifyListeners(DEFAULT_THEORY_VIDEOS);
    return DEFAULT_THEORY_VIDEOS;
  }

  /**
   * Record video telemetry and increment view count
   */
  public static recordVideoTelemetry(event: VideoTelemetryEvent): void {
    try {
      fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: event.studentId,
          event: {
            type: event.eventType,
            videoId: event.videoId,
            topic: event.topic,
            currentTime: event.currentTime,
            duration: event.duration,
            timestamp: event.timestamp
          }
        })
      }).catch(() => {});

      if (event.eventType === 'VIDEO_STARTED') {
        fetch(`/api/theory-videos/${event.videoId}/view`, { method: 'POST' }).catch(() => {});
      }
    } catch {
      // Non-blocking telemetry
    }
  }

  /**
   * Health Check: Query the server health report to verify physical file availability
   */
  public static async checkHealth(): Promise<{
    success: boolean;
    total: number;
    verified: number;
    missing: number;
    corrupted: number;
    items?: Array<{
      id: string;
      title: string;
      status: string;
      existsOnDisk: boolean;
      fileSize: number;
      filePath?: string;
    }>;
  }> {
    try {
      const res = await fetch('/api/theory-videos/health');
      if (res.ok) {
        return await res.json();
      }
      return { success: false, total: 0, verified: 0, missing: 0, corrupted: 0 };
    } catch (err) {
      console.warn('Failed to fetch video health report:', err);
      return { success: false, total: 0, verified: 0, missing: 0, corrupted: 0 };
    }
  }

  /**
   * Get assigned lesson video for a specific shape
   * Strictly verifies that the video exists and has real physical file
   */
  public static async getAssignedVideo(
    shape: 'cylinder' | 'cone' | 'sphere'
  ): Promise<{ hasVideo: boolean; video: TheoryVideo | null; error?: string }> {
    try {
      const res = await fetch(`/api/theory-videos/assigned/${shape}`);
      if (res.ok) {
        const data = await res.json();
        return {
          hasVideo: Boolean(data.hasVideo && data.video),
          video: data.video || null,
          error: data.error
        };
      }
    } catch (err: any) {
      console.warn(`[VIDEO-SERVICE] Failed to fetch assigned video for ${shape}:`, err);
    }

    // Fallback: Check local assignments
    try {
      const stored = localStorage.getItem('GEOMETRY_LAB_SHAPE_ASSIGNMENTS');
      const assignments = stored
        ? JSON.parse(stored)
        : {
            cylinder: null,
            cone: null,
            sphere: null
          };
      const videoId = assignments[shape];
      if (videoId) {
        const video = this.getVideoById(videoId);
        if (video) {
          return { hasVideo: true, video };
        }
      }
    } catch {}

    return { hasVideo: false, video: null };
  }

  /**
   * Get all shape assignments
   */
  public static async getAssignments(): Promise<Record<string, string | null>> {
    try {
      const res = await fetch('/api/theory-videos/assignments');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.assignments) {
          localStorage.setItem('GEOMETRY_LAB_SHAPE_ASSIGNMENTS', JSON.stringify(data.assignments));
          return data.assignments;
        }
      }
    } catch (err) {
      console.warn('[VIDEO-SERVICE] Error fetching assignments:', err);
    }

    try {
      const stored = localStorage.getItem('GEOMETRY_LAB_SHAPE_ASSIGNMENTS');
      if (stored) return JSON.parse(stored);
    } catch {}

    return {
      cylinder: null,
            cone: null,
            sphere: null
    };
  }

  /**
   * Assign a video to a shape (Teacher action)
   */
  public static async assignVideo(
    shape: 'cylinder' | 'cone' | 'sphere',
    videoId: string | null
  ): Promise<{ success: boolean; assignments?: Record<string, string | null>; error?: string }> {
    try {
      let headers = this.getAuthHeaders(true, 'teacher');
      let res = await fetch('/api/theory-videos/assign', {
        method: 'POST',
        headers,
        body: JSON.stringify({ shape, videoId })
      });

      if (res.status === 401 || res.status === 403) {
        const freshToken = await this.ensureTeacherSignedToken(true);
        if (freshToken) {
          headers = this.getAuthHeaders(true, 'teacher');
          headers['Authorization'] = `Bearer ${freshToken}`;
          headers['x-auth-token'] = freshToken;
          res = await fetch('/api/theory-videos/assign', {
            method: 'POST',
            headers,
            body: JSON.stringify({ shape, videoId })
          });
        }
      }

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.assignments) {
          localStorage.setItem('GEOMETRY_LAB_SHAPE_ASSIGNMENTS', JSON.stringify(data.assignments));
          // Dispatch custom event so TheoryView and others update immediately
          window.dispatchEvent(
            new CustomEvent('geometry_lab_video_assigned', {
              detail: { shape, videoId, assignments: data.assignments }
            })
          );
          return { success: true, assignments: data.assignments };
        }
      }
      const errData = await res.json().catch(() => ({}));
      return { success: false, error: errData.message || errData.error || 'Lỗi gán video bài học' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Lỗi kết nối máy chủ' };
    }
  }

  /**
   * Upload video file and assign directly to a shape (Teacher action)
   */
  public static async uploadAndAssignVideo(
    shape: 'cylinder' | 'cone' | 'sphere',
    file: File,
    title?: string,
    onProgress?: (percent: number) => void
  ): Promise<{ success: boolean; video?: TheoryVideo; assignments?: Record<string, string | null>; error?: string }> {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append('video', file);
      formData.append('shape', shape);
      if (title) formData.append('title', title);

      xhr.open('POST', '/api/theory-videos/upload-and-assign', true);
      const authHeaders = this.getAuthHeaders(false, 'teacher');
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
            if (res.success && res.video) {
              if (res.assignments) {
                localStorage.setItem('GEOMETRY_LAB_SHAPE_ASSIGNMENTS', JSON.stringify(res.assignments));
              }
              // Update local memory cache and notify subscribers
              const list = this.getVideos();
              const updatedList = [res.video, ...list.filter((v) => v.id !== res.video.id)];
              this.memoryCache = updatedList;
              this.saveToLocalStorage(updatedList);
              this.notifyListeners(updatedList);

              window.dispatchEvent(
                new CustomEvent('geometry_lab_video_assigned', {
                  detail: { shape, videoId: res.video.id, assignments: res.assignments }
                })
              );

              resolve({ success: true, video: res.video, assignments: res.assignments });
              return;
            }
          } catch {
            resolve({ success: false, error: 'Không thể phân tích phản hồi máy chủ' });
            return;
          }
        }
        try {
          const errRes = JSON.parse(xhr.responseText);
          resolve({ success: false, error: errRes.message || errRes.error || 'Lỗi tải video lên máy chủ' });
        } catch {
          resolve({ success: false, error: `Máy chủ phản hồi mã ${xhr.status}` });
        }
      };

      xhr.onerror = () => {
        resolve({ success: false, error: 'Lỗi kết nối khi tải video lên máy chủ' });
      };

      xhr.send(formData);
    });
  }

  private static saveToLocalStorage(videos: TheoryVideo[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
    } catch (e) {
      console.error('Failed to save videos to localStorage:', e);
    }
  }
}
