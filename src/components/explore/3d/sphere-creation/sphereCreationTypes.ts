/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * SPHERE FORMATION / ROTATION STATE MACHINE & DATA TYPES
 * Compliant with SGK Grade 9 Geometry Lab Standards:
 * "Khi quay nửa hình tròn (hoặc đường tròn) tâm O, bán kính R một vòng quanh đường kính AB cố định thì được một hình cầu."
 */

export type SphereRotationPhase =
  | 'INITIAL_CIRCLE'       // Step 1: Observe static circle (C) with center O, radius R, diameter AB
  | 'SELECT_AXIS'          // Step 2: Choose diameter AB as fixed axis of rotation + Prediction Quiz
  | 'SWEEP_45'             // Step 3: Initial rotation (0° -> 45°) - Circle leaves initial plane
  | 'SWEEP_90'             // Step 4: Quarter sweep (90°) - Quarter sphere surface swept
  | 'SWEEP_180'            // Step 5: Half sweep (180°) - Half sphere solid & space swept
  | 'SWEEP_270'            // Step 6: Three-quarter sweep (270°) - 3/4 space swept
  | 'SWEEP_360'            // Step 7: Complete 360° sweep - Closed complete solid sphere formed
  | 'IDENTIFY_ELEMENTS';   // Step 8: Element identification & Summary (AB = 2R, S = 4πR², V = 4/3 πR³)

export interface SphereSweepMetrics {
  R: number; // Radius OP = OA = OB
  d: number; // Diameter AB = 2R
  sweepAngleRad: number; // Current rotation angle in radians [0, 2*PI]
  sweepAngleDeg: number; // Current rotation angle in degrees [0, 360]
  sweepProgress: number; // 0 to 1
  equatorCircumference: number; // 2 * pi * R
  greatCircleArea: number; // pi * R^2
  currentSurfaceAreaSwept: number; // (sweepProgress) * 4 * pi * R^2
  totalSurfaceArea: number; // 4 * pi * R^2
  currentVolumeSwept: number; // (sweepProgress) * (4/3) * pi * R^3
  totalVolume: number; // (4/3) * pi * R^3
}

export interface SpherePredictionOption {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface SphereStepDefinition {
  stepIndex: number;
  phase: SphereRotationPhase;
  targetAngleDeg: number;
  title: string;
  subtitle: string;
  description: string;
  keyHighlight: string;
  formulaNote?: string;
  question?: {
    prompt: string;
    options: SpherePredictionOption[];
  };
}
