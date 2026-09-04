/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Master Theory Video Bank
 * Single Source of Truth for all video assets in GEOMETRY LAB.
 * Strictly SOURCE-ONLY: All records are teacher-provided or verified attached media.
 * Zero fake URLs, Zero AI-generated videos, Zero Internet scrapers.
 */

import { TheoryVideo } from '../types/theoryVideo';

export const videoBankConfig = {
  sourceOnly: true,
  allowGeneratedVideos: false,
  allowInternetVideos: false,
  allowFakeUrls: false,
  maxVideoSizeBytes: 100 * 1024 * 1024 // 100 MB
};

export const MASTER_THEORY_VIDEO_BANK: TheoryVideo[] = [
  // 1. HÌNH TRỤ (CYLINDER)
  {
    id: 'VIDEO-CYLINDER-001',
    topic: 'CYLINDER',
    section: 'CREATION',
    title: 'Sự tạo thành hình trụ từ hình chữ nhật',
    description: 'Quan sát trực quan cách hình chữ nhật quay quanh một cạnh cố định để tạo thành hình trụ tròn xoay, các yếu tố đáy, chiều cao và đường sinh.',
    videoUrl: '/assets/videos/tru.mp4',
    thumbnailUrl: '/assets/videos/tru_poster.jpg',
    storagePath: 'theory/cylinder/creation-001.mp4',
    fileName: 'tru.mp4',
    originalFileName: 'tru.mp4',
    mimeType: 'video/mp4',
    fileSize: 306266,
    duration: '00:15',
    durationSeconds: 15,
    width: 1280,
    height: 720,
    order: 1,
    status: 'PUBLISHED',
    sourceType: 'TEACHER_PROVIDED',
    verificationStatus: 'VERIFIED',
    transcriptStatus: 'NOT_AVAILABLE',
    citations: [
      {
        videoId: 'VIDEO-CYLINDER-001',
        startTimeSeconds: 0,
        endTimeSeconds: 6,
        label: 'Nhận biết vật thể hình trụ trong thực tế',
        summary: 'Các đồ vật hình trụ quen thuộc: lon sữa ông thọ, cốc nước, ống cầu lông.',
        topic: 'CYLINDER',
        section: 'INTRO'
      },
      {
        videoId: 'VIDEO-CYLINDER-001',
        startTimeSeconds: 7,
        endTimeSeconds: 15,
        label: 'Sự tạo thành hình trụ',
        summary: 'Quay hình chữ nhật quanh một cạnh cố định quét nên khối trụ.',
        topic: 'CYLINDER',
        section: 'CREATION'
      }
    ],
    chapters: [
      { start: 0, title: 'Nhận biết hình trụ' },
      { start: 7, title: 'Sự tạo thành hình trụ' }
    ],
    authorName: 'ThS. Trần Ngọc Hiếu (Tổ Toán - THCS Chuyên)',
    createdBy: 'teacher_001',
    viewCount: 1540,
    createdAt: 1716600000000,
    updatedAt: 1716600000000
  },

  // 2. HÌNH NÓN (CONE)
  {
    id: 'VIDEO-CONE-001',
    topic: 'CONE',
    section: 'CREATION',
    title: 'Sự tạo thành hình nón & Các yếu tố cơ bản',
    description: 'Tìm hiểu cách tam giác vuông quay quanh một cạnh góc vuông cố định quét nên hình nón, xác định đỉnh, đáy, đường sinh l, bán kính r và chiều cao h.',
    videoUrl: '/assets/videos/non.mp4',
    thumbnailUrl: '/assets/videos/non_poster.jpg',
    storagePath: 'theory/cone/creation-001.mp4',
    fileName: 'non.mp4',
    originalFileName: 'non.mp4',
    mimeType: 'video/mp4',
    fileSize: 309211,
    duration: '00:15',
    durationSeconds: 15,
    width: 1280,
    height: 720,
    order: 1,
    status: 'PUBLISHED',
    sourceType: 'TEACHER_PROVIDED',
    verificationStatus: 'VERIFIED',
    transcriptStatus: 'NOT_AVAILABLE',
    citations: [
      {
        videoId: 'VIDEO-CONE-001',
        startTimeSeconds: 0,
        endTimeSeconds: 6,
        label: 'Chi tiết cơ khí & Vật thể hình nón',
        summary: 'Nhận diện hình nón và cấu trúc đỉnh nón.',
        topic: 'CONE',
        section: 'INTRO'
      },
      {
        videoId: 'VIDEO-CONE-001',
        startTimeSeconds: 7,
        endTimeSeconds: 15,
        label: 'Tam giác vuông quay quanh cạnh góc vuông',
        summary: 'Cách tạo thành hình nón từ tam giác vuông SOA quay quanh trục SO.',
        topic: 'CONE',
        section: 'CREATION'
      }
    ],
    chapters: [
      { start: 0, title: 'Nhận diện hình nón' },
      { start: 7, title: 'Tam giác vuông tạo hình nón' }
    ],
    authorName: 'ThS. Trần Ngọc Hiếu (Tổ Toán - THCS Chuyên)',
    createdBy: 'teacher_001',
    viewCount: 1820,
    createdAt: 1716600000000,
    updatedAt: 1716600000000
  },

  // 3. HÌNH CẦU (SPHERE)
  {
    id: 'VIDEO-SPHERE-001',
    topic: 'SPHERE',
    section: 'CREATION',
    title: 'Khái niệm Mặt Cầu & Khối Cầu trong không gian',
    description: 'Khám phá sự tạo thành mặt cầu khi quay nửa đường tròn quanh trục đường kính cố định, phân biệt mặt cầu và khối cầu, các khái niệm tâm O và bán kính R.',
    videoUrl: '/assets/videos/cau.mp4',
    thumbnailUrl: '/assets/videos/cau_poster.jpg',
    storagePath: 'theory/sphere/creation-001.mp4',
    fileName: 'cau.mp4',
    originalFileName: 'cau.mp4',
    mimeType: 'video/mp4',
    fileSize: 305055,
    duration: '00:15',
    durationSeconds: 15,
    width: 1280,
    height: 720,
    order: 1,
    status: 'PUBLISHED',
    sourceType: 'TEACHER_PROVIDED',
    verificationStatus: 'VERIFIED',
    transcriptStatus: 'NOT_AVAILABLE',
    citations: [
      {
        videoId: 'VIDEO-SPHERE-001',
        startTimeSeconds: 0,
        endTimeSeconds: 6,
        label: 'Vật thể hình cầu trong đời sống',
        summary: 'Trái đất, quả bóng đá, quả cam, quả cầu tuyết.',
        topic: 'SPHERE',
        section: 'INTRO'
      },
      {
        videoId: 'VIDEO-SPHERE-001',
        startTimeSeconds: 7,
        endTimeSeconds: 15,
        label: 'Nửa hình tròn quay quanh đường kính',
        summary: 'Sự hình thành hình cầu và mặt cầu bằng phép quay nửa đường tròn quanh đường kính AB cố định.',
        topic: 'SPHERE',
        section: 'CREATION'
      }
    ],
    chapters: [
      { start: 0, title: 'Vật thể hình cầu' },
      { start: 7, title: 'Sự tạo thành hình cầu' }
    ],
    authorName: 'ThS. Trần Ngọc Hiếu (Tổ Toán - THCS Chuyên)',
    createdBy: 'teacher_001',
    viewCount: 2150,
    createdAt: 1716600000000,
    updatedAt: 1716600000000
  }
];

/**
 * Derived map for fast O(1) topic queries
 */
export const theoryVideoMap: Record<'CYLINDER' | 'CONE' | 'SPHERE', TheoryVideo[]> = {
  CYLINDER: MASTER_THEORY_VIDEO_BANK.filter(v => v.topic === 'CYLINDER' && v.status === 'PUBLISHED'),
  CONE: MASTER_THEORY_VIDEO_BANK.filter(v => v.topic === 'CONE' && v.status === 'PUBLISHED'),
  SPHERE: MASTER_THEORY_VIDEO_BANK.filter(v => v.topic === 'SPHERE' && v.status === 'PUBLISHED')
};
