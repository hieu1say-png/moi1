/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Theory Video Types
 */

import { ShapeType } from './dataArchitecture';

export type VideoTopic = 'CYLINDER' | 'CONE' | 'SPHERE';

export type VideoSection = 
  | 'INTRO'
  | 'THEORY' 
  | 'ELEMENTS' 
  | 'CREATION' 
  | 'NET' 
  | 'SECTION'
  | 'SURFACE_AREA'
  | 'TOTAL_SURFACE'
  | 'VOLUME' 
  | 'REAL_WORLD' 
  | 'CHALLENGE'
  | 'SUMMARY';

export type VideoStatus = 'SYSTEM' | 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'PENDING_STORAGE';

export type VideoSourceType = 'TEACHER_PROVIDED';

export type VideoVerificationStatus = 'UNVERIFIED' | 'VERIFIED' | 'REJECTED';

export type VideoTranscriptStatus = 'NOT_AVAILABLE' | 'TEACHER_PROVIDED' | 'GENERATED_TRANSCRIPT';

export interface VideoCitation {
  id?: string;
  videoId: string;
  startTimeSeconds: number;
  endTimeSeconds: number;
  label: string;
  summary: string;
  topic?: VideoTopic;
  section?: VideoSection;
}

export interface VideoChapter {
  start: number;
  title: string;
}

/**
 * 18 Canonical Metadata Fields as mandated by Architecture Specs:
 * id, title, description, shape, lessonId, sectionId, type, ownerId,
 * storagePath, downloadURL, mimeType, size, duration, thumbnailURL,
 * status, createdAt, updatedAt, publishedAt
 */
export interface TheoryVideo {
  // 18 Canonical Fields
  id: string;
  title: string;
  description: string;
  shape?: ShapeType;
  lessonId?: string;
  sectionId?: string;
  type?: 'SYSTEM' | 'TEACHER';
  ownerId?: string;
  storagePath?: string;
  downloadURL?: string;
  mimeType?: string;
  size?: number;
  duration?: string; // e.g. "00:15"
  thumbnailURL?: string;
  status: VideoStatus;
  createdAt: number;
  updatedAt: number;
  publishedAt?: number | null;

  // Interoperability & Domain UI Fields
  topic: VideoTopic;
  section: VideoSection;
  videoUrl: string;
  url?: string;
  thumbnailUrl?: string | null;
  thumbnail?: string;
  sourceFile?: string;
  originalFileName?: string;
  sourceFileId?: string | null;
  module?: string;
  durationSeconds?: number;
  fileName?: string;
  fileSize?: number;
  width?: number;
  height?: number;
  order: number;
  sourceType?: VideoSourceType | 'ATTACHED_REAL_VIDEO' | 'UPLOADED' | 'SYSTEM_SEED';
  visibility?: 'public' | 'class' | 'private' | 'restricted' | 'teacher_only';
  uploadStatus?: 'ready' | 'processing' | 'error' | 'FAILED';
  verificationStatus?: VideoVerificationStatus;
  transcriptStatus?: VideoTranscriptStatus;
  citations?: VideoCitation[];
  chapters?: VideoChapter[];
  author?: string;
  authorName?: string;
  authorId?: string;
  createdBy?: string;
  viewCount?: number;
  lessonTitle?: string;
}

export interface SystemVideoHealthItem {
  shape: ShapeType;
  fileName: string;
  canonicalUrl: string;
  filePath: string;
  fileExists: boolean;
  fileSizeBytes: number;
  mimeType: string;
  byteRangeSupported: boolean;
  metadataValid: boolean;
  permission: string;
  playabilityStatus: 'OK' | 'ERROR';
  error: string | null;
}

export interface TeacherVideoHealthItem {
  id: string;
  title: string;
  ownerId: string;
  storagePath: string;
  downloadURL: string;
  fileExists: boolean;
  fileSizeBytes: number;
  mimeType: string;
  metadataValid: boolean;
  status: VideoStatus;
  permissionValid: boolean;
  playabilityStatus: 'OK' | 'FILE_MISSING' | 'CORRUPTED' | 'METADATA_INCOMPLETE';
}

export interface VideoHealthReport {
  overallStatus: 'HEALTHY' | 'DEGRADED' | 'FAILED';
  systemVideoStatus: 'ALL_HEALTHY' | 'SOME_FAILED';
  teacherVideoStatus: 'ALL_HEALTHY' | 'SOME_FAILED' | 'NO_VIDEOS';
  systemVideoHealth: SystemVideoHealthItem[];
  teacherVideoHealth: {
    storageDirectoryExists: boolean;
    storageDirectoryWritable: boolean;
    totalVideos: number;
    publishedCount: number;
    draftCount: number;
    archivedCount: number;
    healthyCount: number;
    missingFileCount: number;
    videos: TeacherVideoHealthItem[];
  };
  checkedAt: string;
  timestamp: number;
}

export interface VideoTelemetryEvent {
  videoId: string;
  topic: VideoTopic;
  studentId: string;
  eventType: 'VIDEO_STARTED' | 'VIDEO_25_PERCENT' | 'VIDEO_50_PERCENT' | 'VIDEO_75_PERCENT' | 'VIDEO_COMPLETED' | 'VIDEO_PAUSED';
  currentTime: number;
  duration: number;
  timestamp: number;
}

export const TOPIC_TO_SHAPE_MAP: Record<VideoTopic, ShapeType> = {
  CYLINDER: 'cylinder',
  CONE: 'cone',
  SPHERE: 'sphere'
};

export const SHAPE_TO_TOPIC_MAP: Record<ShapeType, VideoTopic> = {
  cylinder: 'CYLINDER',
  cone: 'CONE',
  sphere: 'SPHERE'
};

export const SECTION_LABELS: Record<VideoSection, string> = {
  INTRO: 'Giới thiệu & Nhận biết',
  THEORY: 'Lý thuyết & Khái niệm',
  ELEMENTS: 'Cấu tạo & Các yếu tố',
  CREATION: 'Sự hình thành từ phép quay',
  NET: 'Khai triển & Trải hình',
  SECTION: 'Mặt cắt & Thiết diện',
  SURFACE_AREA: 'Diện tích xung quanh',
  TOTAL_SURFACE: 'Diện tích toàn phần',
  VOLUME: 'Thể tích & Ứng dụng',
  REAL_WORLD: 'Mô hình thực tế',
  CHALLENGE: 'Bài tập ôn thi vào 10',
  SUMMARY: 'Tổng kết & Ghi nhớ'
};
