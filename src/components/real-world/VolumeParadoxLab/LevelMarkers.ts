/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 3D LEVEL MARKERS FOR CYLINDER CUP (h/3, 2h/3, h)
 * Dynamic mathematical positions based on actual height h.
 */

import * as THREE from 'three';

export interface LevelMarkersStructure {
  group: THREE.Group;
  ringLevel1: THREE.LineLoop;
  ringLevel2: THREE.LineLoop;
  ringLevel3: THREE.LineLoop;
  markerMaterial1: THREE.LineBasicMaterial;
  markerMaterial2: THREE.LineBasicMaterial;
  markerMaterial3: THREE.LineBasicMaterial;
}

/**
 * Creates the 3 level rings around the cylinder cup.
 */
export function createLevelMarkers(radius: number, height: number): LevelMarkersStructure {
  const group = new THREE.Group();
  group.name = 'LevelMarkersGroup';

  const segments = 48;
  const ringR = radius * 1.015;

  const createRingGeometry = (yPos: number) => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(ringR * Math.cos(theta), yPos, ringR * Math.sin(theta)));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  };

  const markerMaterial1 = new THREE.LineBasicMaterial({
    color: 0x0284c7,
    linewidth: 2,
    transparent: true,
    opacity: 0.8
  });
  const markerMaterial2 = new THREE.LineBasicMaterial({
    color: 0x94a3b8,
    linewidth: 1.5,
    transparent: true,
    opacity: 0.6
  });
  const markerMaterial3 = new THREE.LineBasicMaterial({
    color: 0x94a3b8,
    linewidth: 1.5,
    transparent: true,
    opacity: 0.6
  });

  const ringLevel1 = new THREE.LineLoop(createRingGeometry(height / 3), markerMaterial1);
  const ringLevel2 = new THREE.LineLoop(createRingGeometry((2 * height) / 3), markerMaterial2);
  const ringLevel3 = new THREE.LineLoop(createRingGeometry(height), markerMaterial3);

  group.add(ringLevel1);
  group.add(ringLevel2);
  group.add(ringLevel3);

  return {
    group,
    ringLevel1,
    ringLevel2,
    ringLevel3,
    markerMaterial1,
    markerMaterial2,
    markerMaterial3
  };
}

/**
 * Updates marker geometry and active glow based on current height and pourCount.
 */
export function updateLevelMarkers(
  structure: LevelMarkersStructure,
  radius: number,
  height: number,
  pourCount: number
) {
  const segments = 48;
  const ringR = radius * 1.015;

  const createPoints = (yPos: number) => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(ringR * Math.cos(theta), yPos, ringR * Math.sin(theta)));
    }
    return points;
  };

  // 1. Update geometries
  structure.ringLevel1.geometry.dispose();
  structure.ringLevel1.geometry = new THREE.BufferGeometry().setFromPoints(createPoints(height / 3));

  structure.ringLevel2.geometry.dispose();
  structure.ringLevel2.geometry = new THREE.BufferGeometry().setFromPoints(createPoints((2 * height) / 3));

  structure.ringLevel3.geometry.dispose();
  structure.ringLevel3.geometry = new THREE.BufferGeometry().setFromPoints(createPoints(height));

  // 2. Update highlight colors
  // Level 1
  if (pourCount >= 1) {
    structure.markerMaterial1.color.setHex(0x10b981); // Emerald check
    structure.markerMaterial1.opacity = 0.95;
  } else {
    structure.markerMaterial1.color.setHex(0x0284c7); // Next target cyan
    structure.markerMaterial1.opacity = 0.8;
  }

  // Level 2
  if (pourCount >= 2) {
    structure.markerMaterial2.color.setHex(0x10b981);
    structure.markerMaterial2.opacity = 0.95;
  } else if (pourCount === 1) {
    structure.markerMaterial2.color.setHex(0x0284c7);
    structure.markerMaterial2.opacity = 0.85;
  } else {
    structure.markerMaterial2.color.setHex(0x94a3b8);
    structure.markerMaterial2.opacity = 0.5;
  }

  // Level 3
  if (pourCount >= 3) {
    structure.markerMaterial3.color.setHex(0x10b981);
    structure.markerMaterial3.opacity = 1.0;
  } else if (pourCount === 2) {
    structure.markerMaterial3.color.setHex(0x0284c7);
    structure.markerMaterial3.opacity = 0.85;
  } else {
    structure.markerMaterial3.color.setHex(0x94a3b8);
    structure.markerMaterial3.opacity = 0.5;
  }
}
