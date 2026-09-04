/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * WATER STREAM & SPLASH MESHES
 * Fluid arc, flowing droplet particles, and impact splash ring during pouring animation.
 * Alignment line linking cone top to cylinder top.
 */

import * as THREE from 'three';

export interface WaterStreamStructure {
  streamMesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;
  streamParticles: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;
  splashRing: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
  alignmentLine: THREE.Line<THREE.BufferGeometry, THREE.LineDashedMaterial>;
}

/**
 * Creates fluid stream, splash ripples, particles, and alignment reference line.
 */
export function createWaterStream(): WaterStreamStructure {
  // 1. Fluid Stream Tube Mesh
  const initialCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.0, 2.5, 0),
    new THREE.Vector3(0.0, 2.7, 0.05),
    new THREE.Vector3(1.2, 1.8, 0)
  ]);

  const tubeGeo = new THREE.TubeGeometry(initialCurve, 28, 0.048, 12, false);
  const streamMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.55,
    transparent: true,
    opacity: 0.88,
    roughness: 0.12,
    metalness: 0.15,
    side: THREE.DoubleSide
  });
  const streamMesh = new THREE.Mesh(tubeGeo, streamMat);
  streamMesh.visible = false;
  streamMesh.castShadow = true;

  // 2. Stream Droplets / Particles along the stream arc
  const particleCount = 48;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0xbae6fd,
    size: 0.09,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
  });
  const streamParticles = new THREE.Points(particleGeo, particleMat);
  streamParticles.visible = false;

  // 3. Impact Splash Ring inside Cylinder
  const splashGeo = new THREE.RingGeometry(0.02, 0.28, 32);
  splashGeo.rotateX(-Math.PI / 2);
  const splashMat = new THREE.MeshBasicMaterial({
    color: 0x7dd3fc,
    transparent: true,
    opacity: 0.75,
    side: THREE.DoubleSide
  });
  const splashRing = new THREE.Mesh(splashGeo, splashMat);
  splashRing.visible = false;

  // 4. Top Alignment Reference Line (between cone top and cylinder top)
  const linePoints = [new THREE.Vector3(-2.2, 2.4, 0), new THREE.Vector3(2.2, 2.4, 0)];
  const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
  const lineMat = new THREE.LineDashedMaterial({
    color: 0x94a3b8,
    dashSize: 0.15,
    gapSize: 0.08,
    linewidth: 1,
    transparent: true,
    opacity: 0.65
  });
  const alignmentLine = new THREE.Line(lineGeo, lineMat);
  alignmentLine.computeLineDistances();

  return {
    streamMesh,
    streamParticles,
    splashRing,
    alignmentLine
  };
}

/**
 * Updates fluid stream curve, splash ripples, and particles during active pouring.
 */
export function updateWaterStream(
  structure: WaterStreamStructure,
  isPouring: boolean,
  progress: number,
  conePos: THREE.Vector3,
  cylPos: THREE.Vector3,
  coneRadius: number,
  coneHeight: number,
  cylRadius: number,
  cylHeight: number,
  cylWaterHeight: number
) {
  // Update Top Alignment Line
  const linePoints = [
    new THREE.Vector3(conePos.x, coneHeight, 0),
    new THREE.Vector3(cylPos.x, cylHeight, 0)
  ];
  structure.alignmentLine.geometry.dispose();
  structure.alignmentLine.geometry = new THREE.BufferGeometry().setFromPoints(linePoints);
  structure.alignmentLine.computeLineDistances();

  // Handle Stream Flow Visibility across Phases (Phases 3 to 6: progress ~ 0.18 to 0.82)
  if (!isPouring || progress < 0.16 || progress > 0.82) {
    structure.streamMesh.visible = false;
    structure.streamParticles.visible = false;
    structure.splashRing.visible = false;
    return;
  }

  structure.streamMesh.visible = true;
  structure.streamParticles.visible = true;

  // 1. Calculate Stream Arc Endpoints
  // Start point: right edge of tilted cone opening
  const startPt = new THREE.Vector3(
    conePos.x + coneRadius * 0.82,
    conePos.y + coneHeight * 0.94,
    conePos.z
  );

  // End point: into center of cylinder at current water surface level
  const targetY = Math.max(0.04, cylWaterHeight);
  const endPt = new THREE.Vector3(cylPos.x, targetY, cylPos.z);

  // Control point for natural gravitational parabolic arc
  const midPt = new THREE.Vector3(
    (startPt.x + endPt.x) * 0.48,
    Math.max(startPt.y, endPt.y) + 0.32,
    (startPt.z + endPt.z) * 0.5
  );

  // Growth factor during stream appearance (Phase 3 -> 4) and shrink during disappearance (Phase 6)
  let flowFraction = 1.0;
  if (progress < 0.24) {
    flowFraction = Math.min(1, Math.max(0.1, (progress - 0.16) / 0.08));
  } else if (progress > 0.76) {
    flowFraction = Math.min(1, Math.max(0.1, (0.82 - progress) / 0.06));
  }

  // Active curve with interpolation
  const currentEndPt = new THREE.Vector3().lerpVectors(startPt, endPt, Math.min(1, flowFraction * 1.2));
  const currentMidPt = new THREE.Vector3().lerpVectors(startPt, midPt, Math.min(1, flowFraction * 1.1));
  const curve = new THREE.QuadraticBezierCurve3(startPt, currentMidPt, currentEndPt);

  // Dynamic tube radius
  const streamRadius = 0.044 * Math.sin(flowFraction * Math.PI * 0.5);
  structure.streamMesh.geometry.dispose();
  structure.streamMesh.geometry = new THREE.TubeGeometry(curve, 28, Math.max(0.015, streamRadius), 10, false);

  // 2. Stream Particle Flow Simulation
  const positions = structure.streamParticles.geometry.attributes.position.array as Float32Array;
  const count = positions.length / 3;
  const timeOffset = (Date.now() % 800) / 800;

  for (let i = 0; i < count; i++) {
    const t = ((i / count) + timeOffset) % 1;
    if (t <= flowFraction) {
      const pt = curve.getPoint(t);
      const sprayAngle = (i * 1.37);
      const sprayRadius = (0.015 + t * 0.025);
      positions[i * 3] = pt.x + Math.sin(sprayAngle) * sprayRadius;
      positions[i * 3 + 1] = pt.y + Math.cos(sprayAngle * 2) * sprayRadius;
      positions[i * 3 + 2] = pt.z + Math.sin(sprayAngle * 3) * sprayRadius;
    } else {
      positions[i * 3] = startPt.x;
      positions[i * 3 + 1] = -100; // hide
      positions[i * 3 + 2] = startPt.z;
    }
  }
  structure.streamParticles.geometry.attributes.position.needsUpdate = true;

  // 3. Splash Ripples inside Cylinder
  if (flowFraction > 0.8) {
    structure.splashRing.visible = true;
    structure.splashRing.position.set(cylPos.x, targetY + 0.005, cylPos.z);
    const pulseScale = 0.8 + 0.3 * Math.sin(Date.now() * 0.012);
    structure.splashRing.scale.set(pulseScale, pulseScale, pulseScale);
  } else {
    structure.splashRing.visible = false;
  }
}

