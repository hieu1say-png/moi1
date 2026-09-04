/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TYPES FOR VOLUME PARADOX LAB (TRANG 11: NGHỊCH LÝ 1/3 — BÍ ẨN THỂ TÍCH)
 */

export type PourPhase =
  | 'idle'
  | 'phase1_tilting'
  | 'phase2_water_movement'
  | 'phase3_stream_appears'
  | 'phase4_stream_reaches_cup'
  | 'phase5_cylinder_water_rises'
  | 'phase6_stream_disappears'
  | 'phase7_funnel_returns'
  | 'phase8_funnel_refills'
  | 'phase9_unlocked';

export type CameraViewMode = 'DEFAULT_VIEW' | 'EXPERIMENT_VIEW' | 'X_RAY_VIEW';

export interface VolumeParadoxState {
  radius: number; // R in cm (0.5 to 2.0, default 1.15)
  height: number; // h in cm (1.0 to 4.0, default 2.40)
  pourCount: 0 | 1 | 2 | 3;
  coneFill: number; // 0.0 to 1.0 (mathematical volume fraction in cone)
  cylinderFill: number; // 0.0 to 1.0 (mathematical volume fraction in cylinder)
  isPouring: boolean;
  isComplete: boolean;
  showDebugHUD: boolean;
  pourPhase: PourPhase;
  streamVisible: boolean;
  pourAnimationProgress: number; // 0.0 to 1.0 during active pour
  predictionAnswer: 1 | 2 | 3 | 4 | null;
  cameraMode: CameraViewMode;
  replayStep: 0 | 1 | 2 | 3 | null;
  activeWhyHint: 1 | 2 | 3 | null;
}

export interface VolumeParadoxLearningData {
  predictionAnswer: 1 | 2 | 3 | 4 | null;
  actualAnswer: 3;
  pourCount: 0 | 1 | 2 | 3;
  hintUsed: number[];
  timeSpentSeconds: number;
  completed: boolean;
  conclusionCorrect: boolean;
}

export interface VolumeCalculations {
  radiusR: number;
  heightH: number;
  vCylinder: number; // π * R² * h
  vCone: number; // (1/3) * π * R² * h
  vRatio: number; // 1/3 = 0.3333...
  cylWaterHeight: number; // cylinderFill * h
  coneWaterHeight: number; // h * cbrt(coneFill)
}

export interface LevelMarkerInfo {
  levelIndex: 1 | 2 | 3;
  fractionLabel: string;
  fractionLatex: string;
  heightValue: number; // (levelIndex / 3) * h
  isFilled: boolean;
  isActiveNext: boolean;
}

export interface VolumeParadoxLabProps {
  onNavigateTheory?: () => void;
  onNavigateNextChallenge?: () => void;
  className?: string;
}

