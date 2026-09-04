/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SPATIAL THINKING PROFILE & LEARNING EVENTS ARCHITECTURE
 * Core types for Spatial Reasoning Analytics & AI Pedagogical Tracking
 */

import { ShapeType } from './dataArchitecture';

// 8 Core Spatial Reasoning Metrics
export type SpatialMetricKey =
  | 'shapeRecognition'       // 1. Nhận diện hình khối (3D recognition, geometry properties)
  | 'spatialOrientation'      // 2. Định hướng không gian (Rotation, camera tracking, 3D perspective)
  | 'elementIdentification'  // 3. Nhận biết yếu tố (Radius R, height h, slant height l, center O, axis)
  | 'spatialTransformation'  // 4. Biến đổi hình học (Deformation, scaling, shearing, volume preserve)
  | 'threeDToTwoD'           // 5. 3D → 2D (Unfolding, nets, cross-section projections)
  | 'twoDToThreeD'           // 6. 2D → 3D (Revolution around axis, solid formation)
  | 'mathematicalModeling'   // 7. Mô hình hóa toán học (Formula application, ratio, rate)
  | 'problemSolving';        // 8. Giải quyết vấn đề thực tế (Real-world scenarios, paradox deduction)

export type ScoreTier = 'need_practice' | 'developing' | 'good' | 'mastered';

export interface SpatialMetricDetail {
  key: SpatialMetricKey;
  label: string;
  shortLabel: string;
  description: string;
  score: number; // 0 - 100
  tier: ScoreTier;
  iconName: string;
}

export type LearningEventType =
  | 'VIEW_MODEL'
  | 'ROTATE_MODEL'
  | 'ZOOM_MODEL'
  | 'SELECT_ELEMENT'
  | 'MEASURE'
  | 'UNFOLD'
  | 'SECTION'
  | 'PREDICT'
  | 'ANSWER'
  | 'ERROR'
  | 'HINT_REQUEST'
  | 'HINT_USED'
  | 'CORRECT'
  | 'COMPLETE';

export interface LearningEvent {
  id: string;
  type: LearningEventType;
  shape?: ShapeType;
  elementId?: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface SuggestedPractice {
  id: string;
  title: string;
  reason: string;
  targetMetric: SpatialMetricKey;
  shape: ShapeType;
  route: string;
  mode?: string;
  difficulty: 'Cơ bản' | 'Trung bình' | 'Thử thách';
  actionLabel: string;
}

export interface ShapeTimelineItem {
  id: string;
  shape: ShapeType;
  title: string;
  status: 'completed' | 'in_progress' | 'locked';
  progressPercent: number;
  unlockedAt?: string;
  highlightSkill: string;
}

export interface TeacherChallenge {
  id: string;
  title: string;
  question: string;
  hint: string;
  targetShape: ShapeType;
  route: string;
  xpReward: number;
  actionText: string;
}

export interface SpatialProfileState {
  scores: Record<SpatialMetricKey, number>;
  level: number;
  levelTitle: string;
  xp: number;
  nextLevelXp: number;
  strengths: string[];
  suggestedPractices: SuggestedPractice[];
  timeline: ShapeTimelineItem[];
  teacherReview: {
    summary: string;
    positiveNote: string;
    improvementArea: string;
    speechText: string;
  };
  dailyChallenge: TeacherChallenge;
  recentEvents: LearningEvent[];
  updatedAt: number;
}
