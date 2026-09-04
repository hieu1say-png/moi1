/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - CENTRALIZED VIDEO ASSETS CONFIGURATION
 * Single source of truth defining the mapping between geometric topics
 * and their respective video/poster file paths.
 */

import { ShapeType } from '../types';

export type GeometricTopic = ShapeType; // 'cylinder' | 'sphere' | 'cone'

export interface VideoTimestampMarker {
  readonly time: number;
  readonly label: string;
  readonly description: string;
}

export interface SystemVideoConfig {
  readonly id: string;
  readonly title: string;
  readonly shape: GeometricTopic;
  readonly src: string;
  readonly fallbackSrc: string;
  readonly poster: string;
  readonly type: 'system';
  readonly mimeType: string;
  readonly durationFormatted: string;
  readonly durationSeconds: number;
  readonly subtitle: string;
  readonly description: string;
  readonly keyTimestamps: readonly VideoTimestampMarker[];
}

export type SystemVideoLesson = SystemVideoConfig;

/**
 * SYSTEM_LESSON_VIDEOS
 * Exact single configuration mapping strictly to uploaded real video files.
 */
export const SYSTEM_LESSON_VIDEOS = {
  cylinder: {
    title: "Video bài học Hình trụ",
    source: "/uploads/videos/tru.mp4",
    type: "uploaded" as const
  },
  cone: {
    title: "Video bài học Hình nón",
    source: "/uploads/videos/non.mp4",
    type: "uploaded" as const
  },
  sphere: {
    title: "Video bài học Hình cầu",
    source: "/uploads/videos/cau.mp4",
    type: "uploaded" as const
  }
} as const;

export const lessonVideos = SYSTEM_LESSON_VIDEOS;

/**
 * SINGLE SOURCE OF TRUTH - SYSTEM_VIDEOS
 * Centralized mapping for the 3 verified physical uploaded geometry videos.
 * cylinder -> /uploads/videos/tru.mp4 (fallback: /assets/videos/tru.mp4)
 * cone -> /uploads/videos/non.mp4 (fallback: /assets/videos/non.mp4)
 * sphere -> /uploads/videos/cau.mp4 (fallback: /assets/videos/cau.mp4)
 */
export const SYSTEM_VIDEOS: Record<GeometricTopic, SystemVideoConfig> = {
  cylinder: {
    id: 'system-cylinder',
    title: SYSTEM_LESSON_VIDEOS.cylinder.title,
    shape: 'cylinder',
    src: SYSTEM_LESSON_VIDEOS.cylinder.source,
    fallbackSrc: '/assets/videos/tru.mp4',
    poster: '/assets/videos/tru_poster.jpg',
    type: 'system',
    mimeType: 'video/mp4',
    durationFormatted: '00:15',
    durationSeconds: 15,
    subtitle: 'Khái niệm, các yếu tố & công thức diện tích, thể tích hình trụ',
    description:
      'Quan sát sự tạo thành hình trụ khi quay hình chữ nhật quanh trục cố định. Xác định bán kính đáy R, chiều cao h, đường sinh và công thức S_xq = 2πRh, V = πR²h.',
    keyTimestamps: [
      { time: 0, label: '00:00', description: 'Khái niệm & Sự tạo thành' },
      { time: 5, label: '00:05', description: 'Các yếu tố: Bán kính R, Chiều cao h' },
      { time: 10, label: '00:10', description: 'Công thức diện tích & thể tích' }
    ]
  },
  cone: {
    id: 'system-cone',
    title: SYSTEM_LESSON_VIDEOS.cone.title,
    shape: 'cone',
    src: SYSTEM_LESSON_VIDEOS.cone.source,
    fallbackSrc: '/assets/videos/non.mp4',
    poster: '/assets/videos/non_poster.jpg',
    type: 'system',
    mimeType: 'video/mp4',
    durationFormatted: '00:15',
    durationSeconds: 15,
    subtitle: 'Khái niệm, đỉnh, chiều cao h, bán kính r, đường sinh l & công thức',
    description:
      'Quan sát sự tạo thành hình nón khi quay tam giác vuông quanh trục cố định. Mối liên hệ Pytago l² = h² + r² và công thức S_xq = πrl, V = (1/3)πr²h.',
    keyTimestamps: [
      { time: 0, label: '00:00', description: 'Khái niệm & Sự tạo thành' },
      { time: 5, label: '00:05', description: 'Các yếu tố r, h, l và định lý Pythagore' },
      { time: 10, label: '00:10', description: 'Công thức diện tích & thể tích' }
    ]
  },
  sphere: {
    id: 'system-sphere',
    title: SYSTEM_LESSON_VIDEOS.sphere.title,
    shape: 'sphere',
    src: SYSTEM_LESSON_VIDEOS.sphere.source,
    fallbackSrc: '/assets/videos/cau.mp4',
    poster: '/assets/videos/cau_poster.jpg',
    type: 'system',
    mimeType: 'video/mp4',
    durationFormatted: '00:15',
    durationSeconds: 15,
    subtitle: 'Khái niệm, tâm O, bán kính R & công thức diện tích mặt cầu, thể tích',
    description:
      'Quan sát sự tạo thành hình cầu khi quay nửa hình tròn quanh trục đường kính. Xác định tâm O, bán kính R, mặt cắt qua tâm và công thức S = 4πR², V = (4/3)πR³.',
    keyTimestamps: [
      { time: 0, label: '00:00', description: 'Khái niệm & Sự tạo thành' },
      { time: 5, label: '00:05', description: 'Tâm O, Bán kính R, Mặt cắt' },
      { time: 10, label: '00:10', description: 'Công thức diện tích & thể tích' }
    ]
  }
};

/**
 * Backward compatibility alias
 */
export const SYSTEM_VIDEO_LESSONS = SYSTEM_VIDEOS;

export interface TopicVideoAsset {
  readonly topic: GeometricTopic;
  readonly topicNameVi: string;
  readonly topicNameEn: string;
  readonly videoPath: string;
  readonly fallbackVideoPath: string;
  readonly posterPath: string;
  readonly mimeType: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly durationSeconds: number;
  readonly durationFormatted: string;
  readonly keyTimestamps: readonly VideoTimestampMarker[];
}

/**
 * Mapping derived directly from SYSTEM_VIDEOS to avoid duplicate configs
 */
export const TOPIC_VIDEO_MAP: Record<GeometricTopic, TopicVideoAsset> = {
  cylinder: {
    topic: 'cylinder',
    topicNameVi: 'Hình trụ',
    topicNameEn: 'Cylinder',
    videoPath: SYSTEM_VIDEOS.cylinder.src,
    fallbackVideoPath: SYSTEM_VIDEOS.cylinder.fallbackSrc,
    posterPath: SYSTEM_VIDEOS.cylinder.poster,
    mimeType: SYSTEM_VIDEOS.cylinder.mimeType,
    title: SYSTEM_VIDEOS.cylinder.title,
    subtitle: SYSTEM_VIDEOS.cylinder.subtitle,
    description: SYSTEM_VIDEOS.cylinder.description,
    durationSeconds: SYSTEM_VIDEOS.cylinder.durationSeconds,
    durationFormatted: SYSTEM_VIDEOS.cylinder.durationFormatted,
    keyTimestamps: SYSTEM_VIDEOS.cylinder.keyTimestamps
  },
  cone: {
    topic: 'cone',
    topicNameVi: 'Hình nón',
    topicNameEn: 'Cone',
    videoPath: SYSTEM_VIDEOS.cone.src,
    fallbackVideoPath: SYSTEM_VIDEOS.cone.fallbackSrc,
    posterPath: SYSTEM_VIDEOS.cone.poster,
    mimeType: SYSTEM_VIDEOS.cone.mimeType,
    title: SYSTEM_VIDEOS.cone.title,
    subtitle: SYSTEM_VIDEOS.cone.subtitle,
    description: SYSTEM_VIDEOS.cone.description,
    durationSeconds: SYSTEM_VIDEOS.cone.durationSeconds,
    durationFormatted: SYSTEM_VIDEOS.cone.durationFormatted,
    keyTimestamps: SYSTEM_VIDEOS.cone.keyTimestamps
  },
  sphere: {
    topic: 'sphere',
    topicNameVi: 'Hình cầu',
    topicNameEn: 'Sphere',
    videoPath: SYSTEM_VIDEOS.sphere.src,
    fallbackVideoPath: SYSTEM_VIDEOS.sphere.fallbackSrc,
    posterPath: SYSTEM_VIDEOS.sphere.poster,
    mimeType: SYSTEM_VIDEOS.sphere.mimeType,
    title: SYSTEM_VIDEOS.sphere.title,
    subtitle: SYSTEM_VIDEOS.sphere.subtitle,
    description: SYSTEM_VIDEOS.sphere.description,
    durationSeconds: SYSTEM_VIDEOS.sphere.durationSeconds,
    durationFormatted: SYSTEM_VIDEOS.sphere.durationFormatted,
    keyTimestamps: SYSTEM_VIDEOS.sphere.keyTimestamps
  }
};

/**
 * Quick path lookups referencing SYSTEM_VIDEOS
 */
export const TOPIC_VIDEO_PATHS: Record<GeometricTopic, string> = {
  cylinder: SYSTEM_VIDEOS.cylinder.src,
  cone: SYSTEM_VIDEOS.cone.src,
  sphere: SYSTEM_VIDEOS.sphere.src
};

export const TOPIC_POSTER_PATHS: Record<GeometricTopic, string> = {
  cylinder: SYSTEM_VIDEOS.cylinder.poster,
  cone: SYSTEM_VIDEOS.cone.poster,
  sphere: SYSTEM_VIDEOS.sphere.poster
};

/**
 * Helper to get the System Video for any shape or string
 */
export function getSystemVideo(shape: GeometricTopic | string): SystemVideoConfig {
  const normalized = normalizeGeometricTopic(shape);
  return SYSTEM_VIDEOS[normalized];
}

export const getSystemVideoLesson = getSystemVideo;

/**
 * Validates whether a value is a supported GeometricTopic
 */
export function isGeometricTopic(val: unknown): val is GeometricTopic {
  return typeof val === 'string' && (val === 'cylinder' || val === 'sphere' || val === 'cone');
}

/**
 * Normalizes input string (Vietnamese or English) to a valid GeometricTopic
 */
export function normalizeGeometricTopic(input: string): GeometricTopic {
  const normalized = input.toLowerCase().trim();
  if (normalized.includes('cyl') || normalized.includes('trụ') || normalized.includes('tru')) {
    return 'cylinder';
  }
  if (normalized.includes('sph') || normalized.includes('cầu') || normalized.includes('cau')) {
    return 'sphere';
  }
  if (normalized.includes('cone') || normalized.includes('nón') || normalized.includes('non')) {
    return 'cone';
  }
  return 'cylinder';
}

/**
 * Retrieves the complete video asset config for a geometric topic
 */
export function getVideoAssetByTopic(topic: GeometricTopic | string): TopicVideoAsset {
  const normalized = normalizeGeometricTopic(topic);
  return TOPIC_VIDEO_MAP[normalized];
}

/**
 * Retrieves the video file path for a geometric topic
 */
export function getVideoPathByTopic(topic: GeometricTopic | string): string {
  return getVideoAssetByTopic(topic).videoPath;
}

/**
 * Retrieves the poster image path for a geometric topic
 */
export function getPosterPathByTopic(topic: GeometricTopic | string): string {
  return getVideoAssetByTopic(topic).posterPath;
}
