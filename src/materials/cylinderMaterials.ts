/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GATE 1.1 - SGK FIDELITY MATERIALS FOR CYLINDER
 * Compliant with Vietnamese Grade 9 Geometry Textbook (Toán 9 - Chương IV)
 * Clean, pedagogically clear, non-neon, elegant architectural rendering.
 */

import * as THREE from 'three';

export interface CylinderMaterialSet {
  sideSurface: THREE.Material;
  topBase: THREE.Material;
  bottomBase: THREE.Material;
  baseRimLine: THREE.LineBasicMaterial;
  axisOOPrime: THREE.LineDashedMaterial;
  axisOOPrimeSolid: THREE.LineBasicMaterial;
  axisOOPrimeTube: THREE.MeshStandardMaterial;
  radiusRLine: THREE.LineBasicMaterial;
  radiusRTube: THREE.MeshStandardMaterial;
  generatrixLLine: THREE.LineBasicMaterial;
  generatrixLTube: THREE.MeshStandardMaterial;
  heightHLine: THREE.LineDashedMaterial;
  heightHTube: THREE.MeshStandardMaterial;
  pointO: THREE.MeshStandardMaterial;
  pointOPrime: THREE.MeshStandardMaterial;
  highlightHalo: THREE.MeshBasicMaterial;
}

export function createSGKCylinderMaterials(): CylinderMaterialSet {
  // 1. Side Surface (Mặt xung quanh hình trụ) - SGK style: soft translucent blue-cyan
  const sideSurface = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8, // Sky blue
    emissive: 0x0369a1,
    emissiveIntensity: 0.12,
    roughness: 0.28,
    metalness: 0.05,
    clearcoat: 0.35,
    clearcoatRoughness: 0.2,
    transparent: true,
    opacity: 0.65,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  // 2. Top Base (Mặt đáy trên)
  const topBase = new THREE.MeshStandardMaterial({
    color: 0x60a5fa,
    emissive: 0x1d4ed8,
    emissiveIntensity: 0.15,
    roughness: 0.3,
    metalness: 0.05,
    transparent: true,
    opacity: 0.75,
    side: THREE.DoubleSide
  });

  // 3. Bottom Base (Mặt đáy dưới)
  const bottomBase = new THREE.MeshStandardMaterial({
    color: 0x60a5fa,
    emissive: 0x1d4ed8,
    emissiveIntensity: 0.15,
    roughness: 0.3,
    metalness: 0.05,
    transparent: true,
    opacity: 0.75,
    side: THREE.DoubleSide
  });

  // 4. Base Rim Rings (Đường tròn đáy)
  const baseRimLine = new THREE.LineBasicMaterial({
    color: 0x0284c7,
    linewidth: 2,
    transparent: true,
    opacity: 0.95
  });

  // 5. Axis OO' (Trục hình trụ)
  const axisOOPrime = new THREE.LineDashedMaterial({
    color: 0xf59e0b, // Amber
    dashSize: 0.35,
    gapSize: 0.2,
    linewidth: 2
  });

  const axisOOPrimeSolid = new THREE.LineBasicMaterial({
    color: 0xf59e0b,
    linewidth: 2.5
  });

  const axisOOPrimeTube = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    emissive: 0xd97706,
    emissiveIntensity: 0.35,
    roughness: 0.3
  });

  // 6. Radius R (Bán kính đáy R) - Emerald green
  const radiusRLine = new THREE.LineBasicMaterial({
    color: 0x10b981,
    linewidth: 3
  });

  const radiusRTube = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    emissive: 0x059669,
    emissiveIntensity: 0.45,
    roughness: 0.25
  });

  // 7. Generatrix l (Đường sinh l) - Royal Indigo/Blue
  const generatrixLLine = new THREE.LineBasicMaterial({
    color: 0x6366f1,
    linewidth: 3
  });

  const generatrixLTube = new THREE.MeshStandardMaterial({
    color: 0x6366f1,
    emissive: 0x4338ca,
    emissiveIntensity: 0.45,
    roughness: 0.25
  });

  // 8. Height h (Chiều cao h = OO') - Coral/Rose
  const heightHLine = new THREE.LineDashedMaterial({
    color: 0xf43f5e,
    dashSize: 0.3,
    gapSize: 0.15,
    linewidth: 2
  });

  const heightHTube = new THREE.MeshStandardMaterial({
    color: 0xf43f5e,
    emissive: 0xbe123c,
    emissiveIntensity: 0.4,
    roughness: 0.3
  });

  // 9. Points O and O' (Tâm đáy)
  const pointO = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    emissive: 0xd97706,
    emissiveIntensity: 0.6,
    roughness: 0.2
  });

  const pointOPrime = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    emissive: 0xd97706,
    emissiveIntensity: 0.6,
    roughness: 0.2
  });

  // 10. Halo highlight for selected components
  const highlightHalo = new THREE.MeshBasicMaterial({
    color: 0xfbbf24,
    transparent: true,
    opacity: 0.7,
    side: THREE.DoubleSide
  });

  return {
    sideSurface,
    topBase,
    bottomBase,
    baseRimLine,
    axisOOPrime,
    axisOOPrimeSolid,
    axisOOPrimeTube,
    radiusRLine,
    radiusRTube,
    generatrixLLine,
    generatrixLTube,
    heightHLine,
    heightHTube,
    pointO,
    pointOPrime,
    highlightHalo
  };
}
