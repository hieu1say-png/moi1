/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - SYSTEM FIXED LESSON VIDEOS CONFIGURATION
 * Permanent, immutable video assets bundled with the application repository.
 */

export interface FixedLessonVideo {
  title: string;
  video: string;
  poster: string;
  category: 'fixed';
  shape: 'cylinder' | 'cone' | 'sphere';
}

export const lessonVideos: Record<'cylinder' | 'cone' | 'sphere', FixedLessonVideo> = {
  cylinder: {
    title: 'Khám phá Hình trụ',
    video: '/videos/geometry/cylinder/hinh-tru.mp4',
    poster: '/videos/geometry/cylinder/tru_poster.jpg',
    category: 'fixed',
    shape: 'cylinder'
  },
  cone: {
    title: 'Khám phá Hình nón',
    video: '/videos/geometry/cone/hinh-non.mp4',
    poster: '/videos/geometry/cone/non_poster.jpg',
    category: 'fixed',
    shape: 'cone'
  },
  sphere: {
    title: 'Khám phá Hình cầu',
    video: '/videos/geometry/sphere/hinh-cau.mp4',
    poster: '/videos/geometry/sphere/cau_poster.jpg',
    category: 'fixed',
    shape: 'sphere'
  }
};
