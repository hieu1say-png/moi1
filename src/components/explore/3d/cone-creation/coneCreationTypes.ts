/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * CONE FORMATION / ROTATION STATE MACHINE & DATA TYPES
 * Compliant with SGK Grade 9 Geometry Lab Standards:
 * "Khi quay tam giác vuông SOA một vòng quanh cạnh góc vuông OS cố định thì được một hình nón."
 */

export type ConeRotationPhase =
  | 'INITIAL_TRIANGLE'     // Step 0: Observe static right triangle SOA (OS ⟂ OA)
  | 'SELECT_AXIS'          // Step 1: Identify rotation axis OS + Prediction Quiz
  | 'SWEEP_SMALL'          // Step 2: Initial rotation (0° -> 45°)
  | 'SWEEP_90'             // Step 3: Quarter sweep (90°) - Arc OA sweeps 1/4 base circle
  | 'SWEEP_180'            // Step 4: Half sweep (180°) - Half cone & half base formed
  | 'SWEEP_270'            // Step 5: Three-quarter sweep (270°)
  | 'SWEEP_360'            // Step 6: Complete 360° sweep - Closed solid cone formed
  | 'IDENTIFY_ELEMENTS'    // Step 7: Element identification (r = OA, h = OS, l = SA, l = √(r²+h²))
  | 'COMPARE_AND_SUMMARY'; // Step 8: Before/After Comparison & Grade 9 Mastery Check

export interface ConeSweepMetrics {
  r: number; // Base radius (OA)
  h: number; // Height / Rotation Axis (OS)
  l: number; // Slant height / Generatrix (SA) = sqrt(r^2 + h^2)
  sweepAngleRad: number; // Current sweep angle in radians (0 to 2*PI)
  sweepAngleDeg: number; // Current sweep angle in degrees (0° to 360°)
  sweepProgress: number; // 0 to 1
  baseCircumference: number; // 2 * pi * r
  currentArcLength: number; // r * sweepAngleRad
  baseArea: number; // pi * r^2
  currentBaseAreaSwept: number; // 0.5 * r^2 * sweepAngleRad
  lateralArea: number; // pi * r * l
  currentLateralAreaSwept: number; // 0.5 * r * l * sweepAngleRad
  totalArea: number; // lateralArea + baseArea
  volume: number; // 1/3 * pi * r^2 * h
}

export interface ConePredictionOption {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface ConeStepDefinition {
  stepIndex: number;
  phase: ConeRotationPhase;
  targetAngleDeg: number;
  title: string;
  subtitle: string;
  description: string;
  keyHighlight: string;
  formulaNote?: string;
}

