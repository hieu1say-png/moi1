/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 3D CYLINDER CUP GEOMETRY & MATERIAL BUILDER
 * Upright Cylinder: Base at y = 0, Top at y = h, Radius R
 * Includes transparent glass shell, blue water volume, level indicators, and dimension annotations.
 */

import * as THREE from 'three';
import { createLevelMarkers, updateLevelMarkers, LevelMarkersStructure } from './LevelMarkers';

export interface CylinderCupMeshStructure {
  group: THREE.Group;
  glassBody: THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>;
  glassBottom: THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>;
  topRim: THREE.LineLoop;
  liquidMesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;
  liquidMeniscus: THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;
  levelMarkers: LevelMarkersStructure;
  dimGroup: THREE.Group;
  dimLineHeight: THREE.Line;
  dimLineRadius: THREE.Line;
}

/**
 * Creates the complete Cylinder Cup 3D hierarchy.
 */
export function createCylinderCup(radius: number, height: number): CylinderCupMeshStructure {
  const group = new THREE.Group();
  group.name = 'CylinderCupGroup';

  // 1. Glass Cylinder Outer Shell (open top, closed bottom)
  const glassGeo = new THREE.CylinderGeometry(radius, radius, height, 48, 1, true);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.35,
    roughness: 0.1,
    metalness: 0.05,
    transmission: 0.78,
    ior: 1.45,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const glassBody = new THREE.Mesh(glassGeo, glassMat);
  glassBody.position.y = height / 2;
  group.add(glassBody);

  // Bottom disc
  const botGeo = new THREE.CircleGeometry(radius, 48);
  botGeo.rotateX(Math.PI / 2);
  const glassBottom = new THREE.Mesh(botGeo, glassMat);
  glassBottom.position.y = 0.002;
  group.add(glassBottom);

  // Top Rim Line (highlighted blue opening at y = height)
  const rimPoints: THREE.Vector3[] = [];
  const segments = 48;
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    rimPoints.push(new THREE.Vector3(radius * Math.cos(theta), height, radius * Math.sin(theta)));
  }
  const rimGeo = new THREE.BufferGeometry().setFromPoints(rimPoints);
  const rimMat = new THREE.LineBasicMaterial({ color: 0x0284c7, linewidth: 2 });
  const topRim = new THREE.LineLoop(rimGeo, rimMat);
  group.add(topRim);

  // 2. Level Markers (h/3, 2h/3, h)
  const levelMarkers = createLevelMarkers(radius, height);
  group.add(levelMarkers.group);

  // 3. Blue Liquid Volume Inside
  // Mathematical principle: water height in cylinder = cylinderFill * height
  const liquidGeo = new THREE.CylinderGeometry(radius * 0.985, radius * 0.985, 0.001, 48, 1, false);
  const liquidMat = new THREE.MeshStandardMaterial({
    color: 0x3b82f6,
    emissive: 0x1d4ed8,
    emissiveIntensity: 0.28,
    transparent: true,
    opacity: 0.88,
    roughness: 0.22,
    metalness: 0.1,
    side: THREE.DoubleSide
  });
  const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
  liquidMesh.position.y = 0.0005;
  liquidMesh.visible = false;
  group.add(liquidMesh);

  // Top Meniscus of Liquid
  const meniscusGeo = new THREE.CircleGeometry(radius * 0.985, 48);
  meniscusGeo.rotateX(-Math.PI / 2);
  const meniscusMat = new THREE.MeshStandardMaterial({
    color: 0x60a5fa,
    emissive: 0x2563eb,
    emissiveIntensity: 0.35,
    transparent: true,
    opacity: 0.92,
    roughness: 0.18,
    side: THREE.DoubleSide
  });
  const liquidMeniscus = new THREE.Mesh(meniscusGeo, meniscusMat);
  liquidMeniscus.position.y = 0.001;
  liquidMeniscus.visible = false;
  group.add(liquidMeniscus);

  // 4. Dimension Markers Group
  const dimGroup = new THREE.Group();

  // Height dimension line on right
  const dimHPoints = [
    new THREE.Vector3(radius + 0.45, 0, 0),
    new THREE.Vector3(radius + 0.45, height, 0),
    new THREE.Vector3(radius + 0.35, 0, 0),
    new THREE.Vector3(radius + 0.55, 0, 0),
    new THREE.Vector3(radius + 0.35, height, 0),
    new THREE.Vector3(radius + 0.55, height, 0)
  ];
  const dimHGeo = new THREE.BufferGeometry().setFromPoints(dimHPoints);
  const dimHMat = new THREE.LineBasicMaterial({ color: 0x94a3b8, linewidth: 1.5 });
  const dimLineHeight = new THREE.Line(dimHGeo, dimHMat);
  dimGroup.add(dimLineHeight);

  // Radius dimension line on top
  const dimRPoints = [
    new THREE.Vector3(0, height + 0.05, 0),
    new THREE.Vector3(radius, height + 0.05, 0),
    new THREE.Vector3(0, height + 0.12, 0),
    new THREE.Vector3(0, height - 0.02, 0),
    new THREE.Vector3(radius, height + 0.12, 0),
    new THREE.Vector3(radius, height - 0.02, 0)
  ];
  const dimRGeo = new THREE.BufferGeometry().setFromPoints(dimRPoints);
  const dimRMat = new THREE.LineBasicMaterial({ color: 0x0284c7, linewidth: 2 });
  const dimLineRadius = new THREE.Line(dimRGeo, dimRMat);
  dimGroup.add(dimLineRadius);

  group.add(dimGroup);

  return {
    group,
    glassBody,
    glassBottom,
    topRim,
    liquidMesh,
    liquidMeniscus,
    levelMarkers,
    dimGroup,
    dimLineHeight,
    dimLineRadius
  };
}

/**
 * Updates Cylinder Cup geometry when R, h, cylinderFill or pourCount changes.
 */
export function updateCylinderCup(
  structure: CylinderCupMeshStructure,
  radius: number,
  height: number,
  cylinderFillFraction: number,
  pourCount: number
) {
  // 1. Update Glass Shell & Bottom
  structure.glassBody.geometry.dispose();
  structure.glassBody.geometry = new THREE.CylinderGeometry(radius, radius, height, 48, 1, true);
  structure.glassBody.position.y = height / 2;

  structure.glassBottom.geometry.dispose();
  const botGeo = new THREE.CircleGeometry(radius, 48);
  botGeo.rotateX(Math.PI / 2);
  structure.glassBottom.geometry = botGeo;

  // 2. Update Top Rim
  const rimPoints: THREE.Vector3[] = [];
  const segments = 48;
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    rimPoints.push(new THREE.Vector3(radius * Math.cos(theta), height, radius * Math.sin(theta)));
  }
  structure.topRim.geometry.dispose();
  structure.topRim.geometry = new THREE.BufferGeometry().setFromPoints(rimPoints);

  // 3. Update Level Markers
  updateLevelMarkers(structure.levelMarkers, radius, height, pourCount);

  // 4. Update Liquid Mesh
  // Mathematical principle: water height = fraction * height (uniform cross-section)
  const clampedFraction = Math.max(0, Math.min(1, cylinderFillFraction));
  const waterH = Math.max(0.001, height * clampedFraction * 0.995);

  if (clampedFraction <= 0.005) {
    structure.liquidMesh.visible = false;
    structure.liquidMeniscus.visible = false;
  } else {
    structure.liquidMesh.visible = true;
    structure.liquidMeniscus.visible = true;

    structure.liquidMesh.geometry.dispose();
    structure.liquidMesh.geometry = new THREE.CylinderGeometry(
      radius * 0.985,
      radius * 0.985,
      waterH,
      48,
      1,
      false
    );
    structure.liquidMesh.position.y = waterH / 2;

    structure.liquidMeniscus.geometry.dispose();
    const meniscusGeo = new THREE.CircleGeometry(radius * 0.985, 48);
    meniscusGeo.rotateX(-Math.PI / 2);
    structure.liquidMeniscus.geometry = meniscusGeo;
    structure.liquidMeniscus.position.y = waterH;
  }

  // 5. Update Dimensions
  const dimHPoints = [
    new THREE.Vector3(radius + 0.45, 0, 0),
    new THREE.Vector3(radius + 0.45, height, 0),
    new THREE.Vector3(radius + 0.35, 0, 0),
    new THREE.Vector3(radius + 0.55, 0, 0),
    new THREE.Vector3(radius + 0.35, height, 0),
    new THREE.Vector3(radius + 0.55, height, 0)
  ];
  structure.dimLineHeight.geometry.dispose();
  structure.dimLineHeight.geometry = new THREE.BufferGeometry().setFromPoints(dimHPoints);

  const dimRPoints = [
    new THREE.Vector3(0, height + 0.05, 0),
    new THREE.Vector3(radius, height + 0.05, 0),
    new THREE.Vector3(0, height + 0.12, 0),
    new THREE.Vector3(0, height - 0.02, 0),
    new THREE.Vector3(radius, height + 0.12, 0),
    new THREE.Vector3(radius, height - 0.02, 0)
  ];
  structure.dimLineRadius.geometry.dispose();
  structure.dimLineRadius.geometry = new THREE.BufferGeometry().setFromPoints(dimRPoints);
}
