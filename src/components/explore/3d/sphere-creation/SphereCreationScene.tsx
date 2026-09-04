/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 3D SPHERE FORMATION SCENE (THREE.JS ROTATIONAL SWEEP)
 * Mathematically rigorous representation of rotating a circle (or semi-circle) around fixed diameter AB
 * - Coordinate layout:
 *   * Center O = (0, 0, 0)
 *   * Axis AB along Y: A = (0, -R, 0), B = (0, R, 0), AB = 2R
 *   * Generating Point P(θ) = (R cos θ, 0, R sin θ)
 *   * Radius OP(θ) = R
 * - Real Parametric Rotational Sweep BufferGeometry:
 *   * P(φ, θ) = [R cos(φ) cos(θ), R sin(φ), R cos(φ) sin(θ)]
 *   * Geometric validation: x² + y² + z² = R²
 * - Standard Color Semantics:
 *   * Diameter Axis AB: Blue (#2563EB)
 *   * Radius OP: Orange (#EA580C)
 *   * Circle Rim: Emerald / Teal (#059669 / #10B981)
 *   * Center O: Amber / Gold (#F59E0B)
 * - Screen-projected HTML labels (O, A, B, P, R, d)
 * - Standard 3/4 Camera view with smooth reset
 */

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Compass, RotateCw, Sparkles } from 'lucide-react';
import { SphereRotationPhase, SphereSweepMetrics } from './sphereCreationTypes';
import { OrbitRotationController } from '../OrbitRotationController';

export interface SphereCreationSceneProps {
  phase: SphereRotationPhase;
  metrics: SphereSweepMetrics;
  sweepAngleRad: number; // 0 to 2*PI
  highlightAxis?: boolean;
  highlightRadius?: boolean;
  highlightCircle?: boolean;
  showGhostCircle?: boolean;
  showLabels?: boolean;
  className?: string;
}

interface ProjectedScreenLabel {
  id: string;
  symbol: string;
  name: string;
  subtext?: string;
  x: number;
  y: number;
  visible: boolean;
  highlighted: boolean;
  colorClass: string;
}

export const SphereCreationScene: React.FC<SphereCreationSceneProps> = ({
  phase,
  metrics,
  sweepAngleRad,
  highlightAxis = false,
  highlightRadius = false,
  highlightCircle = false,
  showGhostCircle = true,
  showLabels = true,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const dynamicGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const rotationControllerRef = useRef<OrbitRotationController>(
    new OrbitRotationController({ moduleName: 'SPHERE_ROTATION_CREATION', pauseOnInteraction: true, resumeDelay: 1500 })
  );

  const labelRefO = useRef<HTMLDivElement>(null);
  const labelRefB = useRef<HTMLDivElement>(null);
  const labelRefA = useRef<HTMLDivElement>(null);
  const labelRefP = useRef<HTMLDivElement>(null);
  const labelRefR = useRef<HTMLDivElement>(null);
  const labelRefD = useRef<HTMLDivElement>(null);

  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  const { R, d } = metrics;
  const sweepAngleRef = useRef<number>(sweepAngleRad);
  const rRef = useRef<number>(R);
  const showLabelsRef = useRef<boolean>(showLabels);

  useEffect(() => {
    sweepAngleRef.current = sweepAngleRad;
  }, [sweepAngleRad]);

  useEffect(() => {
    rRef.current = R;
  }, [R]);

  useEffect(() => {
    showLabelsRef.current = showLabels;
  }, [showLabels]);

  // Standard 3/4 camera view
  const DEFAULT_CAMERA_POS = useMemo(() => new THREE.Vector3(R * 1.8 + 2.5, R * 1.2 + 1.8, R * 2.2 + 3.0), [R]);

  const handleResetCamera = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    const targetPos = new THREE.Vector3(R * 1.8 + 2.5, R * 1.2 + 1.8, R * 2.2 + 3.0);
    const targetLookAt = new THREE.Vector3(0, 0, 0);

    const startPos = camera.position.clone();
    const startLookAt = controls.target.clone();
    const startTime = performance.now();
    const duration = 600;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 3);

      camera.position.lerpVectors(startPos, targetPos, ease);
      controls.target.lerpVectors(startLookAt, targetLookAt, ease);
      controls.update();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [R]);

  const handleSpin360 = useCallback(() => {
    setIsSpinning(true);
    rotationControllerRef.current.trigger360Spin(1600, () => {
      setIsSpinning(false);
    });
  }, []);

  // 1. Initialize Scene & WebGL Renderer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const heightPx = container.clientHeight || 480;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    sceneRef.current = scene;

    const dynamicGroup = new THREE.Group();
    scene.add(dynamicGroup);
    dynamicGroupRef.current = dynamicGroup;

    const camera = new THREE.PerspectiveCamera(42, width / heightPx, 0.1, 100);
    camera.position.copy(DEFAULT_CAMERA_POS);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0, 0);
    controls.minDistance = 2.0;
    controls.maxDistance = 35;
    controlsRef.current = controls;

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(10, 14, 12);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 1024;
    dirLight1.shadow.mapSize.height = 1024;
    dirLight1.shadow.bias = -0.0005;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xd1fae5, 0.45);
    dirLight2.position.set(-10, 8, -8);
    scene.add(dirLight2);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xf1f5f9, 0.45);
    scene.add(hemiLight);

    // Ground Grid & Shadow Receiver
    const grid = new THREE.GridHelper(20, 20, 0xe2e8f0, 0xf1f5f9);
    grid.position.y = -R - 0.2;
    scene.add(grid);

    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -R - 0.21;
    floor.receiveShadow = true;
    scene.add(floor);

    // Animation Render Loop
    const animate = (time: number = 0) => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      rotationControllerRef.current.update(time || performance.now());
      controls.update();
      renderer.render(scene, camera);

      // Direct DOM label projection (Zero React state updates, zero re-renders)
      if (showLabelsRef.current && container) {
        const rect = container.getBoundingClientRect();
        const curTheta = sweepAngleRef.current;
        const curR = rRef.current;

        const updateEl = (el: HTMLDivElement | null, pos: THREE.Vector3) => {
          if (!el) return;
          const v = pos.clone().project(camera);
          const x = ((v.x + 1) * rect.width) / 2;
          const y = ((-v.y + 1) * rect.height) / 2;
          const isBehind = v.z > 1;
          if (!isBehind && x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            el.style.display = 'flex';
            el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
          } else {
            el.style.display = 'none';
          }
        };

        const ptO = new THREE.Vector3(0, -0.22, 0);
        const ptB = new THREE.Vector3(0, curR + 0.22, 0);
        const ptA = new THREE.Vector3(0, -curR - 0.25, 0);
        const curP = new THREE.Vector3(curR * Math.cos(curTheta), 0, curR * Math.sin(curTheta));
        const ptP = curP.clone().add(new THREE.Vector3(0.22 * Math.cos(curTheta), 0.08, 0.22 * Math.sin(curTheta)));
        const ptR = curP.clone().multiplyScalar(0.5).add(new THREE.Vector3(0, 0.15, 0));
        const ptD = new THREE.Vector3(-0.35, curR * 0.45, 0);

        updateEl(labelRefO.current, ptO);
        updateEl(labelRefB.current, ptB);
        updateEl(labelRefA.current, ptA);
        updateEl(labelRefP.current, ptP);
        updateEl(labelRefR.current, ptR);
        updateEl(labelRefD.current, ptD);
      }
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const hPx = container.clientHeight;
      camera.aspect = w / hPx;
      camera.updateProjectionMatrix();
      renderer.setSize(w, hPx);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      renderer.dispose();
    };
  }, [DEFAULT_CAMERA_POS, R]);

  // Helper to build a cylinder tube connecting two 3D points
  const createTube = (
    p1: THREE.Vector3,
    p2: THREE.Vector3,
    radius: number,
    color: number,
    emissiveColor = 0x000000,
    opacity = 1
  ): THREE.Mesh => {
    const dir = new THREE.Vector3().subVectors(p2, p1);
    const len = dir.length();
    const geom = new THREE.CylinderGeometry(radius, radius, Math.max(0.001, len), 16);
    const mat = new THREE.MeshStandardMaterial({
      color,
      emissive: emissiveColor,
      emissiveIntensity: emissiveColor !== 0 ? 0.4 : 0,
      roughness: 0.3,
      metalness: 0.2,
      transparent: opacity < 1,
      opacity
    });
    const mesh = new THREE.Mesh(geom, mat);
    const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    mesh.position.copy(mid);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    return mesh;
  };

  // 2. Build 3D Geometric Entities (Dynamic Rotational Sweep & Circle Components)
  useEffect(() => {
    const group = dynamicGroupRef.current;
    if (!group) return;

    // Clear previous dynamic meshes
    while (group.children.length > 0) {
      const child = group.children[0];
      if (child instanceof THREE.Mesh) {
        child.geometry?.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material?.dispose();
        }
      } else if (child instanceof THREE.Line || child instanceof THREE.LineSegments) {
        child.geometry?.dispose();
        child.material?.dispose();
      }
      group.remove(child);
    }

    const currentTheta = Math.max(0, Math.min(Math.PI * 2, sweepAngleRad));
    const isFullSweep = currentTheta >= Math.PI * 2 - 0.001;

    // Key Mathematical Coordinates
    const O = new THREE.Vector3(0, 0, 0);
    const A = new THREE.Vector3(0, -R, 0); // Bottom pole / diameter endpoint
    const B = new THREE.Vector3(0, R, 0);  // Top pole / diameter endpoint
    const currentP = new THREE.Vector3(R * Math.cos(currentTheta), 0, R * Math.sin(currentTheta));
    const initialP = new THREE.Vector3(R, 0, 0);

    // =========================================================================
    // A. EXTENDED ROTATION AXIS (Y-axis dashed line)
    // =========================================================================
    const axisExtra = R * 0.35 + 0.5;
    const axisGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -R - axisExtra, 0),
      new THREE.Vector3(0, R + axisExtra, 0)
    ]);
    const axisMat = new THREE.LineDashedMaterial({
      color: 0x2563eb,
      dashSize: 0.2,
      gapSize: 0.1,
      linewidth: 2
    });
    const axisLine = new THREE.Line(axisGeo, axisMat);
    axisLine.computeLineDistances();
    group.add(axisLine);

    // =========================================================================
    // B. DIAMETER SEGMENT AB (SOLID BLUE TUBE)
    // =========================================================================
    const tubeAB = createTube(
      A,
      B,
      0.045,
      0x2563eb,
      highlightAxis ? 0x60a5fa : 0x000000,
      1
    );
    group.add(tubeAB);

    // =========================================================================
    // C. INITIAL GHOST CIRCLE (At θ = 0 in XY Plane)
    // =========================================================================
    if (showGhostCircle && currentTheta > 0.05) {
      const ghostCirclePts: THREE.Vector3[] = [];
      const segs = 64;
      for (let i = 0; i <= segs; i++) {
        const phi = (i / segs) * Math.PI * 2;
        ghostCirclePts.push(new THREE.Vector3(R * Math.cos(phi), R * Math.sin(phi), 0));
      }
      const ghostGeo = new THREE.BufferGeometry().setFromPoints(ghostCirclePts);
      const ghostMat = new THREE.LineDashedMaterial({
        color: 0x94a3b8,
        dashSize: 0.15,
        gapSize: 0.1,
        transparent: true,
        opacity: 0.75
      });
      const ghostLine = new THREE.Line(ghostGeo, ghostMat);
      ghostLine.computeLineDistances();
      group.add(ghostLine);

      // Ghost Initial Point P(0)
      const ghostSphereGeo = new THREE.SphereGeometry(0.06, 12, 12);
      const ghostSphereMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8, wireframe: true });
      const ghostP = new THREE.Mesh(ghostSphereGeo, ghostSphereMat);
      ghostP.position.copy(initialP);
      group.add(ghostP);
    }

    // =========================================================================
    // D. PARAMETRIC ROTATIONAL SWEEP SURFACE MESH
    // P(φ, θ) = [R cos(φ) cos(θ), R sin(φ), R cos(φ) sin(θ)]
    // φ ∈ [-π/2, π/2], θ ∈ [0, currentTheta]
    // =========================================================================
    if (currentTheta > 0.01) {
      const phiSegments = 48; // Latitude steps
      const thetaSegments = Math.max(8, Math.round(72 * (currentTheta / (Math.PI * 2)))); // Rotation steps

      const positions: number[] = [];
      const normals: number[] = [];
      const uvs: number[] = [];
      const indices: number[] = [];

      // Generate Grid of Vertices
      for (let j = 0; j <= thetaSegments; j++) {
        const theta_j = (j / thetaSegments) * currentTheta;
        const cosT = Math.cos(theta_j);
        const sinT = Math.sin(theta_j);

        for (let i = 0; i <= phiSegments; i++) {
          const phi_i = -Math.PI / 2 + (i / phiSegments) * Math.PI; // from -PI/2 (South Pole A) to +PI/2 (North Pole B)
          const cosP = Math.cos(phi_i);
          const sinP = Math.sin(phi_i);

          const x = R * cosP * cosT;
          const y = R * sinP;
          const z = R * cosP * sinT;

          positions.push(x, y, z);

          // Normal is unit radial vector [x/R, y/R, z/R]
          normals.push(cosP * cosT, sinP, cosP * sinT);

          uvs.push(j / thetaSegments, i / phiSegments);
        }
      }

      // Generate Triangles
      for (let j = 0; j < thetaSegments; j++) {
        for (let i = 0; i < phiSegments; i++) {
          const a = j * (phiSegments + 1) + i;
          const b = (j + 1) * (phiSegments + 1) + i;
          const c = (j + 1) * (phiSegments + 1) + (i + 1);
          const d = j * (phiSegments + 1) + (i + 1);

          // Two triangles per quad
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      const sweepGeo = new THREE.BufferGeometry();
      sweepGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      sweepGeo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
      sweepGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      sweepGeo.setIndex(indices);

      const sweepOpacity = isFullSweep ? 0.82 : Math.min(0.75, 0.35 + 0.4 * (currentTheta / (Math.PI * 2)));
      const sweepMat = new THREE.MeshStandardMaterial({
        color: 0x10b981, // Emerald Green
        roughness: 0.28,
        metalness: 0.15,
        transparent: true,
        opacity: sweepOpacity,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const sweepMesh = new THREE.Mesh(sweepGeo, sweepMat);
      sweepMesh.castShadow = true;
      group.add(sweepMesh);

      // Trajectory of point P (Equatorial arc in XZ plane)
      const trajectoryPts: THREE.Vector3[] = [];
      for (let j = 0; j <= thetaSegments; j++) {
        const theta_j = (j / thetaSegments) * currentTheta;
        trajectoryPts.push(new THREE.Vector3(R * Math.cos(theta_j), 0, R * Math.sin(theta_j)));
      }
      const trajGeo = new THREE.BufferGeometry().setFromPoints(trajectoryPts);
      const trajMat = new THREE.LineBasicMaterial({
        color: 0xea580c,
        linewidth: 3
      });
      const trajLine = new THREE.Line(trajGeo, trajMat);
      group.add(trajLine);
    }

    // =========================================================================
    // E. CURRENT ROTATING GENERATING CIRCLE / SEMI-CIRCLE AT θ
    // =========================================================================
    // 1. Semi-transparent Interior Fill of Circle at current θ
    const circleShape = new THREE.Shape();
    circleShape.absarc(0, 0, R, 0, Math.PI * 2, false);
    const circleFillGeo = new THREE.ShapeGeometry(circleShape, 48);
    const circleFillMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const circleFillMesh = new THREE.Mesh(circleFillGeo, circleFillMat);
    circleFillMesh.rotation.y = -currentTheta;
    group.add(circleFillMesh);

    // 2. Generating Circle Rim (Emerald Glowing Tube / Line)
    const circleCurvePts: THREE.Vector3[] = [];
    const segCount = 64;
    for (let i = 0; i <= segCount; i++) {
      const phi = (i / segCount) * Math.PI * 2;
      const x = R * Math.cos(phi) * Math.cos(currentTheta);
      const y = R * Math.sin(phi);
      const z = R * Math.cos(phi) * Math.sin(currentTheta);
      circleCurvePts.push(new THREE.Vector3(x, y, z));
    }
    const circleCurveGeo = new THREE.BufferGeometry().setFromPoints(circleCurvePts);
    const circleCurveMat = new THREE.LineBasicMaterial({
      color: 0x059669,
      linewidth: 3
    });
    const circleCurveLine = new THREE.Line(circleCurveGeo, circleCurveMat);
    group.add(circleCurveLine);

    // 3. Radius OP(θ) Tube (Orange #EA580C)
    const tubeOP = createTube(
      O,
      currentP,
      0.042,
      0xea580c,
      highlightRadius ? 0xfb923c : 0x000000,
      1
    );
    group.add(tubeOP);

    // =========================================================================
    // F. KEY VERTEX SPHERES (O, A, B, P)
    // =========================================================================
    const sphereGeo = new THREE.SphereGeometry(0.08, 16, 16);

    // Center O (Amber Gold)
    const matO = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.2, emissive: 0xd97706, emissiveIntensity: 0.3 });
    const meshO = new THREE.Mesh(sphereGeo, matO);
    meshO.position.copy(O);
    group.add(meshO);

    // Endpoint A (Bottom, Blue)
    const matA = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.2 });
    const meshA = new THREE.Mesh(sphereGeo, matA);
    meshA.position.copy(A);
    group.add(meshA);

    // Endpoint B (Top, Blue)
    const matB = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.2 });
    const meshB = new THREE.Mesh(sphereGeo, matB);
    meshB.position.copy(B);
    group.add(meshB);

    // Generating Point P(θ) (Vivid Orange)
    const matP = new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.2, emissive: 0xc2410c, emissiveIntensity: 0.4 });
    const meshP = new THREE.Mesh(sphereGeo, matP);
    meshP.position.copy(currentP);
    group.add(meshP);

    // =========================================================================
    // G. SWEEP ROTATION ARROW INDICATOR
    // =========================================================================
    if (!isFullSweep && currentTheta > 0.1) {
      const arrowRadius = R * 0.65;
      const arrowSegments = 16;
      const arrowArcPoints: THREE.Vector3[] = [];
      const arrowStart = Math.max(0, currentTheta - 0.6);

      for (let i = 0; i <= arrowSegments; i++) {
        const ang = arrowStart + (i / arrowSegments) * (currentTheta - arrowStart);
        arrowArcPoints.push(new THREE.Vector3(arrowRadius * Math.cos(ang), 0.02, arrowRadius * Math.sin(ang)));
      }

      const arrowGeo = new THREE.BufferGeometry().setFromPoints(arrowArcPoints);
      const arrowMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2 });
      const arrowLine = new THREE.Line(arrowGeo, arrowMat);
      group.add(arrowLine);
    }
  }, [R, d, sweepAngleRad, highlightAxis, highlightRadius, highlightCircle, showGhostCircle]);

  return (
    <div
      id="sphere-creation-scene-wrapper"
      className={`relative w-full h-full min-h-[460px] sm:min-h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-50 select-none ${className}`}
    >
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full min-h-[460px] sm:min-h-[520px]" />

      {/* Top Floating Badges */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-auto">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-gray-200 shadow-xs text-xs font-bold text-gray-800">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Sự tạo thành hình cầu (SGK Toán 9)</span>
        </div>
        <div className="px-2.5 py-1.5 rounded-xl bg-emerald-50/95 backdrop-blur-md border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
          θ = {Math.round((sweepAngleRad / (Math.PI * 2)) * 360)}° / 360°
        </div>
      </div>

      {/* Top Right Standard Camera / View Tools */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 pointer-events-auto">
        <button
          type="button"
          onClick={handleResetCamera}
          className="px-2.5 py-1.5 rounded-xl bg-white/95 hover:bg-gray-100 text-gray-700 text-xs font-bold border border-gray-200 shadow-xs transition-all flex items-center gap-1 cursor-pointer"
          title="Đưa góc nhìn về vị trí chuẩn 3/4"
        >
          <Compass className="w-3.5 h-3.5 text-emerald-600" />
          <span className="hidden sm:inline">Góc nhìn chuẩn</span>
        </button>

        <button
          type="button"
          onClick={handleSpin360}
          disabled={isSpinning}
          className="p-1.5 rounded-xl bg-white/95 hover:bg-gray-100 text-gray-700 border border-gray-200 shadow-xs transition-all cursor-pointer disabled:opacity-40"
          title="Xoay 360° quan sát toàn diện"
        >
          <RotateCw className={`w-3.5 h-3.5 text-emerald-600 ${isSpinning ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Direct DOM Projected 3D Labels Overlay */}
      {showLabels && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          {/* Tâm O */}
          <div
            ref={labelRefO}
            className="absolute hidden items-center gap-1.5 px-2 py-0.5 rounded-lg border shadow-xs text-[11px] backdrop-blur-md whitespace-nowrap border-amber-300 text-amber-900 bg-amber-50/95 font-bold"
          >
            <span className="font-bold font-mono">O</span>
            <span className="text-[10px] text-gray-600 font-medium hidden sm:inline">(0, 0, 0)</span>
          </div>

          {/* Cực Bắc B */}
          <div
            ref={labelRefB}
            className={`absolute hidden items-center gap-1.5 px-2 py-0.5 rounded-lg border shadow-xs text-[11px] backdrop-blur-md whitespace-nowrap border-blue-300 text-blue-900 bg-blue-50/95 font-bold ${
              highlightAxis ? 'ring-2 ring-emerald-500 scale-110' : 'opacity-90'
            }`}
          >
            <span className="font-bold font-mono">B</span>
            <span className="text-[10px] text-gray-600 font-medium hidden sm:inline">Cực Bắc</span>
          </div>

          {/* Cực Nam A */}
          <div
            ref={labelRefA}
            className={`absolute hidden items-center gap-1.5 px-2 py-0.5 rounded-lg border shadow-xs text-[11px] backdrop-blur-md whitespace-nowrap border-blue-300 text-blue-900 bg-blue-50/95 font-bold ${
              highlightAxis ? 'ring-2 ring-emerald-500 scale-110' : 'opacity-90'
            }`}
          >
            <span className="font-bold font-mono">A</span>
            <span className="text-[10px] text-gray-600 font-medium hidden sm:inline">Cực Nam</span>
          </div>

          {/* Điểm P */}
          <div
            ref={labelRefP}
            className={`absolute hidden items-center gap-1.5 px-2 py-0.5 rounded-lg border shadow-xs text-[11px] backdrop-blur-md whitespace-nowrap border-orange-300 text-orange-900 bg-orange-50/95 font-bold ${
              highlightRadius ? 'ring-2 ring-emerald-500 scale-110' : 'opacity-90'
            }`}
          >
            <span className="font-bold font-mono">P</span>
            <span className="text-[10px] text-gray-600 font-medium hidden sm:inline">
              θ = {Math.round((sweepAngleRad / (Math.PI * 2)) * 360)}°
            </span>
          </div>

          {/* Bán kính R */}
          <div
            ref={labelRefR}
            className={`absolute hidden items-center gap-1.5 px-2 py-0.5 rounded-lg border shadow-xs text-[11px] backdrop-blur-md whitespace-nowrap border-orange-300 text-orange-900 bg-orange-50/95 font-bold ${
              highlightRadius ? 'ring-2 ring-emerald-500 scale-110' : 'opacity-90'
            }`}
          >
            <span className="font-bold font-mono">R</span>
            <span className="text-[10px] text-gray-600 font-medium hidden sm:inline">R = {R}cm</span>
          </div>

          {/* Trục quay AB */}
          <div
            ref={labelRefD}
            className={`absolute hidden items-center gap-1.5 px-2 py-0.5 rounded-lg border shadow-xs text-[11px] backdrop-blur-md whitespace-nowrap border-blue-300 text-blue-900 bg-blue-50/95 font-bold ${
              highlightAxis ? 'ring-2 ring-emerald-500 scale-110' : 'opacity-90'
            }`}
          >
            <span className="font-bold font-mono">AB</span>
            <span className="text-[10px] text-gray-600 font-medium hidden sm:inline">d = 2R</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SphereCreationScene;
