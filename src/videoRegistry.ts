/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - CENTRALIZED CANONICAL VIDEO REGISTRY
 * Single source of truth managing:
 * - hinh-tru.mp4 (Hình trụ)
 * - hinh-non.mp4 (Hình nón)
 * - hinh-cau.mp4 (Hình cầu)
 *
 * Architecture & Governance:
 * 1. Video Classification: SYSTEM_VIDEO vs TEACHER_VIDEO
 * 2. Video Lifecycle States: DRAFT, REVIEW, PUBLISHED, ARCHIVED
 * 3. Role-Based Permissions:
 *    - Teacher: UPLOAD, UPDATE, DELETE, PUBLISH
 *    - Student: VIEW ONLY
 */

export type VideoShape = 'cylinder' | 'cone' | 'sphere';

export type VideoType = 'SYSTEM_VIDEO' | 'TEACHER_VIDEO';

export type VideoStatus = 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED';

export type VideoAction = 'UPLOAD' | 'UPDATE' | 'DELETE' | 'PUBLISH' | 'VIEW';

export interface VideoRegistryItem {
  readonly id: string;
  readonly title: string;
  readonly shape: VideoShape;
  readonly fileName: 'hinh-tru.mp4' | 'hinh-non.mp4' | 'hinh-cau.mp4' | string;
  readonly storagePath: string;
  readonly url: string;
  readonly poster: string;
  readonly type: VideoType;
  readonly status: VideoStatus;
  readonly mimeType: 'video/mp4' | 'video/webm' | string;
  readonly durationFormatted: string;
  readonly durationSeconds: number;
  readonly author: string;
  readonly description: string;
  readonly chapters?: readonly {
    readonly time: number;
    readonly label: string;
    readonly description: string;
  }[];
}

/**
 * CANONICAL VIDEO REGISTRY (Single Source of Truth)
 * Strictly maps to physical assets in /public/videos/geometry/
 */
export const VIDEO_REGISTRY: Record<VideoShape, VideoRegistryItem> = {
  cylinder: {
    id: 'system-video-cylinder',
    title: 'Video bài học Hình trụ - Khái niệm & Công thức SGK Toán 9',
    shape: 'cylinder',
    fileName: 'hinh-tru.mp4',
    storagePath: 'public/videos/geometry/cylinder/hinh-tru.mp4',
    url: '/videos/geometry/cylinder/hinh-tru.mp4',
    poster: '/videos/geometry/cylinder/tru_poster.jpg',
    type: 'SYSTEM_VIDEO',
    status: 'PUBLISHED',
    mimeType: 'video/mp4',
    durationFormatted: '00:15',
    durationSeconds: 15,
    author: 'Thầy. Trần Ngọc Hiếu (Trường Phổ Thông Thực Hành Sư Phạm)',
    description:
      'Quan sát sự tạo thành hình trụ khi quay hình chữ nhật quanh trục cố định. Xác định bán kính đáy R, chiều cao h, đường sinh và công thức S_xq = 2πRh, V = πR²h.',
    chapters: [
      { time: 0, label: '00:00', description: 'Khái niệm & Sự tạo thành' },
      { time: 5, label: '00:05', description: 'Các yếu tố: Bán kính R, Chiều cao h' },
      { time: 10, label: '00:10', description: 'Công thức diện tích & thể tích' }
    ]
  },
  cone: {
    id: 'system-video-cone',
    title: 'Video bài học Hình nón - Khái niệm & Công thức SGK Toán 9',
    shape: 'cone',
    fileName: 'hinh-non.mp4',
    storagePath: 'public/videos/geometry/cone/hinh-non.mp4',
    url: '/videos/geometry/cone/hinh-non.mp4',
    poster: '/videos/geometry/cone/non_poster.jpg',
    type: 'SYSTEM_VIDEO',
    status: 'PUBLISHED',
    mimeType: 'video/mp4',
    durationFormatted: '00:15',
    durationSeconds: 15,
    author: 'Thầy. Trần Ngọc Hiếu (Trường Phổ Thông Thực Hành Sư Phạm)',
    description:
      'Quan sát sự tạo thành hình nón khi quay tam giác vuông quanh trục cố định. Mối liên hệ Pytago l² = h² + r² và công thức S_xq = πrl, V = (1/3)πr²h.',
    chapters: [
      { time: 0, label: '00:00', description: 'Khái niệm & Sự tạo thành' },
      { time: 5, label: '00:05', description: 'Các yếu tố r, h, l và định lý Pythagore' },
      { time: 10, label: '00:10', description: 'Công thức diện tích & thể tích' }
    ]
  },
  sphere: {
    id: 'system-video-sphere',
    title: 'Video bài học Hình cầu - Khái niệm & Công thức SGK Toán 9',
    shape: 'sphere',
    fileName: 'hinh-cau.mp4',
    storagePath: 'public/videos/geometry/sphere/hinh-cau.mp4',
    url: '/videos/geometry/sphere/hinh-cau.mp4',
    poster: '/videos/geometry/sphere/cau_poster.jpg',
    type: 'SYSTEM_VIDEO',
    status: 'PUBLISHED',
    mimeType: 'video/mp4',
    durationFormatted: '00:15',
    durationSeconds: 15,
    author: 'Thầy. Trần Ngọc Hiếu (Trường Phổ Thông Thực Hành Sư Phạm)',
    description:
      'Quan sát sự tạo thành hình cầu khi quay nửa hình tròn quanh trục đường kính. Xác định tâm O, bán kính R, mặt cắt qua tâm và công thức S = 4πR², V = (4/3)πR³.',
    chapters: [
      { time: 0, label: '00:00', description: 'Khái niệm & Sự tạo thành' },
      { time: 5, label: '00:05', description: 'Tâm O, Bán kính R, Mặt cắt' },
      { time: 10, label: '00:10', description: 'Công thức diện tích & thể tích' }
    ]
  }
};

/**
 * Type guards and classifications
 */
export function isSystemVideo(video: { type?: string; id?: string } | null | undefined): boolean {
  if (!video) return false;
  return video.type === 'SYSTEM_VIDEO' || video.type === 'SYSTEM' || String(video.id).startsWith('system-video-');
}

export function isTeacherVideo(video: { type?: string; id?: string } | null | undefined): boolean {
  if (!video) return false;
  return !isSystemVideo(video);
}

/**
 * Access Control Matrix
 * Enforces role-based permissions:
 * - Teacher: UPLOAD, UPDATE, DELETE, PUBLISH, VIEW
 * - Student: VIEW ONLY
 */
export const ROLE_PERMISSIONS: Record<'teacher' | 'student', Record<VideoAction, boolean>> = {
  teacher: {
    UPLOAD: true,
    UPDATE: true,
    DELETE: true,
    PUBLISH: true,
    VIEW: true
  },
  student: {
    UPLOAD: false,
    UPDATE: false,
    DELETE: false,
    PUBLISH: false,
    VIEW: true
  }
};

export function canPerformVideoAction(
  role: 'teacher' | 'student' | string | undefined | null,
  action: VideoAction
): boolean {
  const normalizedRole = role === 'teacher' ? 'teacher' : 'student';
  return ROLE_PERMISSIONS[normalizedRole][action];
}

/**
 * Registry Lookup Helpers
 */
export function getVideoRegistryByShape(shape: string): VideoRegistryItem | null {
  const norm = shape.toLowerCase().trim();
  if (norm.includes('cyl') || norm.includes('trụ') || norm.includes('tru')) {
    return VIDEO_REGISTRY.cylinder;
  }
  if (norm.includes('cone') || norm.includes('nón') || norm.includes('non')) {
    return VIDEO_REGISTRY.cone;
  }
  if (norm.includes('sph') || norm.includes('cầu') || norm.includes('cau')) {
    return VIDEO_REGISTRY.sphere;
  }
  return null;
}

export function getAllCanonicalVideos(): VideoRegistryItem[] {
  return [VIDEO_REGISTRY.cylinder, VIDEO_REGISTRY.cone, VIDEO_REGISTRY.sphere];
}

// Backward compatibility alias
export const videoRegistry = VIDEO_REGISTRY;
export const getVideoRegistryByTopic = getVideoRegistryByShape;
