/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GATE 1.1 - CAMERA CONFIGURATION CONSTANTS
 * Defines DEFAULT_CAMERA (SGK Standard view) & INTERACTION_CAMERA limits.
 */

import * as THREE from 'three';

export interface CameraConfiguration {
  position: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
  near: number;
  far: number;
}

export const SGK_DEFAULT_CAMERA_CONFIG = {
  // SGK standard view vector: looking from front-right slightly elevated (showing both top/bottom bases, axis OO', generatrix l, radius R)
  relativeDirection: new THREE.Vector3(1.2, 0.75, 1.4).normalize(),
  fov: 42,
  near: 0.1,
  far: 1000,
  minZoomDistanceFactor: 1.25,
  maxZoomDistanceFactor: 4.5,
  animationDurationMs: 650
} as const;
