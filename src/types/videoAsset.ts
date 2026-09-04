/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - VideoAsset TypeScript Model
 * Single Source of Truth for Video Assets matching Firestore & Storage Schema
 */

export type GeometricTopicType = 'cylinder' | 'sphere' | 'cone';

export type VideoVisibilityType = 'teacherOnly' | 'students' | 'class';

export type VideoUploadStatusType = 'uploading' | 'processing' | 'ready' | 'failed';

export interface VideoAsset {
  id: string;
  title: string;
  description?: string;
  topic: GeometricTopicType;
  lessonId: string;
  lessonTitle?: string;
  section: string;
  storagePath: string;
  downloadURL: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  durationSeconds?: number | null;
  thumbnailURL?: string | null;
  uploadedBy: string;
  uploadedByName?: string;
  published: boolean;
  visibility: VideoVisibilityType;
  order: number;
  uploadStatus: VideoUploadStatusType;
  createdAt: number | string | Record<string, unknown>;
  updatedAt: number | string | Record<string, unknown>;
}

export interface VideoUploadProgress {
  bytesTransferred: number;
  totalBytes: number;
  percentage: number;
  state: 'running' | 'paused' | 'canceled' | 'success' | 'error';
  errorMessage?: string;
}

export interface TopicLessonOption {
  lessonId: string;
  lessonTitle: string;
  topic: GeometricTopicType;
  section: string;
}

export const TOPIC_LESSONS_MAP: Record<GeometricTopicType, TopicLessonOption[]> = {
  cylinder: [
    { lessonId: 'cylinder-recognition', lessonTitle: 'Nhận biết hình trụ & Phép quay', topic: 'cylinder', section: 'THEORY' },
    { lessonId: 'cylinder-elements', lessonTitle: 'Các yếu tố: Bán kính R, Chiều cao h, Đường sinh', topic: 'cylinder', section: 'ELEMENTS' },
    { lessonId: 'cylinder-net', lessonTitle: 'Khai triển mặt xung quanh hình trụ', topic: 'cylinder', section: 'NET' },
    { lessonId: 'cylinder-surface', lessonTitle: 'Diện tích xung quanh & Toàn phần hình trụ', topic: 'cylinder', section: 'SURFACE_AREA' },
    { lessonId: 'cylinder-volume', lessonTitle: 'Thể tích hình trụ & Bài toán thực tế', topic: 'cylinder', section: 'VOLUME' },
    { lessonId: 'cylinder-realworld', lessonTitle: 'Ứng dụng thực tế hình trụ trong đời sống', topic: 'cylinder', section: 'REAL_WORLD' }
  ],
  sphere: [
    { lessonId: 'sphere-recognition', lessonTitle: 'Nhận biết hình cầu & Phép quay nửa hình tròn', topic: 'sphere', section: 'THEORY' },
    { lessonId: 'sphere-center-radius', lessonTitle: 'Tâm O và bán kính R hình cầu', topic: 'sphere', section: 'ELEMENTS' },
    { lessonId: 'sphere-surface-concept', lessonTitle: 'Mặt cầu & Mặt cắt qua tâm (Đường tròn lớn)', topic: 'sphere', section: 'NET' },
    { lessonId: 'sphere-surface-area', lessonTitle: 'Diện tích mặt cầu S = 4πR²', topic: 'sphere', section: 'SURFACE_AREA' },
    { lessonId: 'sphere-volume', lessonTitle: 'Thể tích khối cầu V = (4/3)πR³ & Tỉ số Archimedes', topic: 'sphere', section: 'VOLUME' },
    { lessonId: 'sphere-realworld', lessonTitle: 'Ứng dụng thực tế hình cầu: Trái đất, quả bóng', topic: 'sphere', section: 'REAL_WORLD' }
  ],
  cone: [
    { lessonId: 'cone-recognition', lessonTitle: 'Nhận biết hình nón & Phép quay tam giác vuông', topic: 'cone', section: 'THEORY' },
    { lessonId: 'cone-elements', lessonTitle: 'Đỉnh, Chiều cao h, Bán kính r, Đường sinh l (l² = h² + r²)', topic: 'cone', section: 'ELEMENTS' },
    { lessonId: 'cone-net', lessonTitle: 'Khai triển hình quạt tròn hình nón', topic: 'cone', section: 'NET' },
    { lessonId: 'cone-surface', lessonTitle: 'Diện tích xung quanh & Toàn phần hình nón', topic: 'cone', section: 'SURFACE_AREA' },
    { lessonId: 'cone-volume', lessonTitle: 'Thể tích hình nón V = (1/3)πr²h (Thí nghiệm đong nước)', topic: 'cone', section: 'VOLUME' },
    { lessonId: 'cone-realworld', lessonTitle: 'Ứng dụng thực tế hình nón: Nón lá, phễu, tháp', topic: 'cone', section: 'REAL_WORLD' }
  ]
};
