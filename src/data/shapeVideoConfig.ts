/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - SHAPE VIDEO CONFIG
 * Re-exports and wraps the centralized configuration from src/config/videoConfig.ts
 */

import { ShapeType } from '../types';
import {
  SYSTEM_VIDEOS,
  SystemVideoConfig,
  normalizeGeometricTopic
} from '../config/videoConfig';

export interface ShapeVideoLesson {
  id: string;
  shapeId: ShapeType;
  shapeName: string;
  title: string;
  subtitle: string;
  src: string;
  poster: string;
  duration: string;
  durationSeconds: number;
  description: string;
  keyTimestamps: {
    time: number;
    label: string;
    description: string;
  }[];
}

function systemToLesson(config: SystemVideoConfig): ShapeVideoLesson {
  return {
    id: config.id,
    shapeId: config.shape,
    shapeName: config.shape === 'cylinder' ? 'Hình trụ' : config.shape === 'cone' ? 'Hình nón' : 'Hình cầu',
    title: config.title,
    subtitle: config.subtitle,
    src: config.src,
    poster: config.poster,
    duration: config.durationFormatted,
    durationSeconds: config.durationSeconds,
    description: config.description,
    keyTimestamps: [...config.keyTimestamps]
  };
}

export const SHAPE_VIDEO_LESSONS: Record<ShapeType, ShapeVideoLesson> = {
  cylinder: systemToLesson(SYSTEM_VIDEOS.cylinder),
  sphere: systemToLesson(SYSTEM_VIDEOS.sphere),
  cone: systemToLesson(SYSTEM_VIDEOS.cone)
};

export const VIDEO_LESSONS = SHAPE_VIDEO_LESSONS;

export const getLessonVideoForShape = (shape: ShapeType | string): ShapeVideoLesson => {
  const normalized = normalizeGeometricTopic(shape);
  return SHAPE_VIDEO_LESSONS[normalized];
};

