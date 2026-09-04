/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 3D CONE FUNNEL GEOMETRY & MATERIAL BUILDER
 * Inverted Cone: Apex at bottom (y = 0), Circular Base at top (y = h, radius R)
 * Includes glass shell, top rim, apex node, dimension indicators, and inner orange liquid.
 */

import * as THREE from 'three';

export interface ConeFunnelMeshStructure {
  group: THREE.Group;
  glassBody: THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>;
  topRim: THREE.LineLoop;
  liquidMesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;
  liquidMeniscus: THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;
  dimGroup: THREE.Group;
  dimLineHeight: THREE.Line;
  dimLineRadius: THREE.Line;
}

/**
 * Creates the complete Cone Funnel 3D hierarchy.
 */
export function createConeFunnel(radius: number, height: number): ConeFunnelMeshStructure {
  const group = new THREE.Group();
  group.name = 'ConeFunnelGroup';

  // 1. Glass Outer Shell (Inverted Cone: apex at bottom, base at top)
  // Three.js Cylinder/Cone default has center at (0,0,0) with apex at top.
  // Inverted cone: radiusTop = radius, radiusBottom = 0.001 (or 0)
  const glassGeo = new THREE.CylinderGeometry(radius, 0.005, height, 48, 1, true);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.38,
    roughness: 0.12,
    metalness: 0.05,
    transmission: 0.75,
    ior: 1.45,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const glassBody = new THREE.Mesh(glassGeo, glassMat);
  glassBody.position.y = height / 2;
  glassBody.castShadow = true;
  group.add(glassBody);

  // 2. Top Rim Line (highlighted opening at y = height)
  const rimPoints: THREE.Vector3[] = [];
  const segments = 48;
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    rimPoints.push(new THREE.Vector3(radius * Math.cos(theta), height, radius * Math.sin(theta)));
  }
  const rimGeo = new THREE.BufferGeometry().setFromPoints(rimPoints);
  const rimMat = new THREE.LineBasicMaterial({ color: 0xf97316, linewidth: 2 });
  const topRim = new THREE.LineLoop(rimGeo, rimMat);
  group.add(topRim);

  // 3. Orange Liquid Volume Inside
  // Mathematical principle: water in an inverted cone has height = h * cbrt(f), top radius = r * cbrt(f)
  const liquidGeo = new THREE.CylinderGeometry(radius * 0.985, 0.004, height * 0.985, 48, 1, false);
  const liquidMat = new THREE.MeshStandardMaterial({
    color: 0xf97316,
    emissive: 0xea580c,
    emissiveIntensity: 0.28,
    transparent: true,
    opacity: 0.88,
    roughness: 0.25,
    metalness: 0.1,
    side: THREE.DoubleSide
  });
  const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
  liquidMesh.position.y = (height * 0.985) / 2;
  group.add(liquidMesh);

  // Top surface meniscus of liquid
  const meniscusGeo = new THREE.CircleGeometry(radius * 0.985, 48);
  meniscusGeo.rotateX(-Math.PI / 2);
  const meniscusMat = new THREE.MeshStandardMaterial({
    color: 0xfb923c,
    emissive: 0xf97316,
    emissiveIntensity: 0.35,
    transparent: true,
    opacity: 0.92,
    roughness: 0.2,
    side: THREE.DoubleSide
  });
  const liquidMeniscus = new THREE.Mesh(meniscusGeo, meniscusMat);
  liquidMeniscus.position.y = height * 0.985;
  group.add(liquidMeniscus);

  // 4. Dimension Markers Group
  const dimGroup = new THREE.Group();

  // Height dimension line on left
  const dimHPoints = [
    new THREE.Vector3(-radius - 0.45, 0, 0),
    new THREE.Vector3(-radius - 0.45, height, 0),
    // tick marks
    new THREE.Vector3(-radius - 0.55, 0, 0),
    new THREE.Vector3(-radius - 0.35, 0, 0),
    new THREE.Vector3(-radius - 0.55, height, 0),
    new THREE.Vector3(-radius - 0.35, height, 0)
  ];
  const dimHGeo = new THREE.BufferGeometry().setFromPoints(dimHPoints);
  const dimHMat = new THREE.LineBasicMaterial({ color: 0x94a3b8, linewidth: 1.5 });
  const dimLineHeight = new THREE.Line(dimHGeo, dimHMat);
  dimGroup.add(dimLineHeight);

  // Radius dimension line on top base
  const dimRPoints = [
    new THREE.Vector3(0, height + 0.05, 0),
    new THREE.Vector3(radius, height + 0.05, 0),
    new THREE.Vector3(0, height + 0.12, 0),
    new THREE.Vector3(0, height - 0.02, 0),
    new THREE.Vector3(radius, height + 0.12, 0),
    new THREE.Vector3(radius, height - 0.02, 0)
  ];
  const dimRGeo = new THREE.BufferGeometry().setFromPoints(dimRPoints);
  const dimRMat = new THREE.LineBasicMaterial({ color: 0xea580c, linewidth: 2 });
  const dimLineRadius = new THREE.Line(dimRGeo, dimRMat);
  dimGroup.add(dimLineRadius);

  group.add(dimGroup);

  return {
    group,
    glassBody,
    topRim,
    liquidMesh,
    liquidMeniscus,
    dimGroup,
    dimLineHeight,
    dimLineRadius
  };
}

/**
 * Updates Cone Funnel geometry when R, h or coneFill fraction changes.
 */
export function updateConeFunnel(
  structure: ConeFunnelMeshStructure,
  radius: number,
  height: number,
  coneFillFraction: number
) {
  // 1. Update Glass Shell
  structure.glassBody.geometry.dispose();
  structure.glassBody.geometry = new THREE.CylinderGeometry(radius, 0.005, height, 48, 1, true);
  structure.glassBody.position.y = height / 2;

  // 2. Update Top Rim
  const rimPoints: THREE.Vector3[] = [];
  const segments = 48;
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    rimPoints.push(new THREE.Vector3(radius * Math.cos(theta), height, radius * Math.sin(theta)));
  }
  structure.topRim.geometry.dispose();
  structure.topRim.geometry = new THREE.BufferGeometry().setFromPoints(rimPoints);

  // 3. Update Liquid Mesh
  // Mathematical principle: for an inverted cone with volume fraction f in [0, 1]:
  // water height from bottom: h_w = height * cbrt(f)
  // water radius at surface: r_w = radius * cbrt(f)
  const clampedFraction = Math.max(0, Math.min(1, coneFillFraction));
  const cbrtF = Math.cbrt(clampedFraction);
  const waterH = Math.max(0.001, height * cbrtF * 0.985);
  const waterR = Math.max(0.001, radius * cbrtF * 0.985);

  if (clampedFraction <= 0.001) {
    structure.liquidMesh.visible = false;
    structure.liquidMeniscus.visible = false;
  } else {
    structure.liquidMesh.visible = true;
    structure.liquidMeniscus.visible = true;

    structure.liquidMesh.geometry.dispose();
    structure.liquidMesh.geometry = new THREE.CylinderGeometry(waterR, 0.004, waterH, 48, 1, false);
    structure.liquidMesh.position.y = waterH / 2;

    structure.liquidMeniscus.geometry.dispose();
    const meniscusGeo = new THREE.CircleGeometry(waterR, 48);
    meniscusGeo.rotateX(-Math.PI / 2);
    structure.liquidMeniscus.geometry = meniscusGeo;
    structure.liquidMeniscus.position.y = waterH;
  }

  // 4. Update Dimensions
  const dimHPoints = [
    new THREE.Vector3(-radius - 0.45, 0, 0),
    new THREE.Vector3(-radius - 0.45, height, 0),
    new THREE.Vector3(-radius - 0.55, 0, 0),
    new THREE.Vector3(-radius - 0.35, 0, 0),
    new THREE.Vector3(-radius - 0.55, height, 0),
    new THREE.Vector3(-radius - 0.35, height, 0)
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
