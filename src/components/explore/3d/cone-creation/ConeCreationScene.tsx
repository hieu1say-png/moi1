/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 3D CONE FORMATION SCENE (THREE.JS ROTATIONAL SWEEP)
 * Mathematically rigorous representation of rotating right triangle ΔSOA around perpendicular axis OS
 * - Continuous parametric BufferGeometry sweep (lateral surface + base sector)
 * - Dynamic right triangle ΔSOA(θ) with standard color-coded edges:
 *   * OS (Blue #2563EB) = Rotation Axis / Height h
 *   * OA (Orange #EA580C) = Base Radius r
 *   * SA (Purple #9333EA) = Slant Height / Generatrix l = √(r²+h²)
 * - Accurate Right-Angle marker (∟) at vertex O
 * - Screen-projected HTML labels (S, O, A, r, h, l)
 * - Standard 3/4 Camera view with smooth reset
 */

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Compass, RotateCw, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { ConeRotationPhase, ConeSweepMetrics } from './coneCreationTypes';
import { OrbitRotationController } from '../OrbitRotationController';

export interface ConeCreationSceneProps {
  phase: ConeRotationPhase;
  metrics: ConeSweepMetrics;
  sweepAngleRad: number; // 0 to 2*PI
  highlightAxis?: boolean;
  highlightRadius?: boolean;
  highlightSlant?: boolean;
  showGhostTriangle?: boolean;
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

export const ConeCreationScene: React.FC<ConeCreationSceneProps> = ({
  phase,
  metrics,
  sweepAngleRad,
  highlightAxis = false,
  highlightRadius = false,
  highlightSlant = false,
  showGhostTriangle = true,
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
    new OrbitRotationController({ moduleName: 'CONE_ROTATION_CREATION', pauseOnInteraction: true, resumeDelay: 1500 })
  );

  const labelRefS = useRef<HTMLDivElement>(null);
  const labelRefO = useRef<HTMLDivElement>(null);
  const labelRefA = useRef<HTMLDivElement>(null);
  const labelRefH = useRef<HTMLDivElement>(null);
  const labelRefR = useRef<HTMLDivElement>(null);
  const labelRefL = useRef<HTMLDivElement>(null);

  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  const { r, h, l } = metrics;
  const sweepAngleRef = useRef<number>(sweepAngleRad);
  const rRef = useRef<number>(r);
  const hRef = useRef<number>(h);
  const lRef = useRef<number>(l);
  const showLabelsRef = useRef<boolean>(showLabels);

  useEffect(() => {
    sweepAngleRef.current = sweepAngleRad;
  }, [sweepAngleRad]);

  useEffect(() => {
    rRef.current = r;
  }, [r]);

  useEffect(() => {
    hRef.current = h;
  }, [h]);

  useEffect(() => {
    lRef.current = l;
  }, [l]);

  useEffect(() => {
    showLabelsRef.current = showLabels;
  }, [showLabels]);

  // Standard 3/4 camera view
  const DEFAULT_CAMERA_POS = useMemo(() => new THREE.Vector3(5.5, 4.2, 6.5), []);

  const handleResetCamera = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    const targetPos = DEFAULT_CAMERA_POS.clone();
    const targetLookAt = new THREE.Vector3(0, Math.max(0.8, h / 2.5), 0);

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
  }, [DEFAULT_CAMERA_POS, h]);

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
    controls.target.set(0, Math.max(0.8, h / 2.5), 0);
    controls.maxPolarAngle = Math.PI / 2 + 0.15; // Don't flip below ground
    controls.minDistance = 2.5;
    controls.maxDistance = 24;
    controlsRef.current = controls;

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.1);
    dirLight1.position.set(8, 12, 10);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 1024;
    dirLight1.shadow.mapSize.height = 1024;
    dirLight1.shadow.bias = -0.0005;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffedd5, 0.45);
    dirLight2.position.set(-8, 6, -6);
    scene.add(dirLight2);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xf1f5f9, 0.4);
    scene.add(hemiLight);

    // Subtle Ground Grid & Shadow Receiver
    const grid = new THREE.GridHelper(16, 16, 0xe2e8f0, 0xf1f5f9);
    grid.position.y = -0.01;
    scene.add(grid);

    const floorGeo = new THREE.PlaneGeometry(24, 24);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.012;
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
        const curH = hRef.current;

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

        const ptS = new THREE.Vector3(0, curH + 0.18, 0);
        const ptO = new THREE.Vector3(0, -0.22, 0);
        const curA = new THREE.Vector3(curR * Math.cos(curTheta), 0, curR * Math.sin(curTheta));
        const ptA = curA.clone().add(new THREE.Vector3(0.2 * Math.cos(curTheta), 0.05, 0.2 * Math.sin(curTheta)));
        const ptH = new THREE.Vector3(-0.25, curH * 0.5, 0);
        const ptR = curA.clone().multiplyScalar(0.5).add(new THREE.Vector3(0, -0.15, 0));
        const S_pos = new THREE.Vector3(0, curH, 0);
        const ptL = S_pos.clone().add(curA).multiplyScalar(0.5).add(new THREE.Vector3(0.15, 0.12, 0.15));

        updateEl(labelRefS.current, ptS);
        updateEl(labelRefO.current, ptO);
        updateEl(labelRefA.current, ptA);
        updateEl(labelRefH.current, ptH);
        updateEl(labelRefR.current, ptR);
        updateEl(labelRefL.current, ptL);
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
  }, [DEFAULT_CAMERA_POS, h]);

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
    const geom = new THREE.CylinderGeometry(radius, radius, len, 16);
    const mat = new THREE.MeshStandardMaterial({
      color,
      emissive: emissiveColor,
      emissiveIntensity: emissiveColor !== 0 ? 0.35 : 0,
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

  // 2. Build 3D Geometric Entities (Dynamic Rotational Sweep & Right Triangle ΔSOA)
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
    const S = new THREE.Vector3(0, h, 0);
    const currentA = new THREE.Vector3(r * Math.cos(currentTheta), 0, r * Math.sin(currentTheta));
    const initialA = new THREE.Vector3(r, 0, 0);

    // =========================================================================
    // A. EXTENDED ROTATION AXIS (Y-axis line)
    // =========================================================================
    const axisExtra = 0.8;
    const axisGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -0.4, 0),
      new THREE.Vector3(0, h + axisExtra, 0)
    ]);
    const axisMat = new THREE.LineDashedMaterial({
      color: 0x2563eb,
      dashSize: 0.15,
      gapSize: 0.08,
      linewidth: 2
    });
    const axisLine = new THREE.Line(axisGeo, axisMat);
    axisLine.computeLineDistances();
    group.add(axisLine);

    // =========================================================================
    // B. INITIAL GHOST TRIANGLE (At θ = 0)
    // =========================================================================
    if (showGhostTriangle && currentTheta > 0.05) {
      const ghostPoints = [O, S, initialA, O];
      const ghostGeo = new THREE.BufferGeometry().setFromPoints(ghostPoints);
      const ghostMat = new THREE.LineDashedMaterial({
        color: 0x94a3b8,
        dashSize: 0.12,
        gapSize: 0.08,
        transparent: true,
        opacity: 0.75
      });
      const ghostLine = new THREE.Line(ghostGeo, ghostMat);
      ghostLine.computeLineDistances();
      group.add(ghostLine);

      // Ghost vertex A(0) indicator
      const ghostSphereGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const ghostSphereMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8, wireframe: true });
      const ghostA = new THREE.Mesh(ghostSphereGeo, ghostSphereMat);
      ghostA.position.copy(initialA);
      group.add(ghostA);
    }

    // =========================================================================
    // C. ROTATIONAL SWEEP GEOMETRY (Continuous Lateral Surface + Base Sector Fan)
    // =========================================================================
    if (currentTheta > 0.01) {
      const segmentsCount = Math.max(8, Math.round(72 * (currentTheta / (Math.PI * 2))));
      const lateralPositions: number[] = [];
      const lateralNormals: number[] = [];
      const basePositions: number[] = [];

      const baseArcPoints: THREE.Vector3[] = [];

      for (let i = 0; i <= segmentsCount; i++) {
        const theta_i = (i / segmentsCount) * currentTheta;
        const x_i = r * Math.cos(theta_i);
        const z_i = r * Math.sin(theta_i);
        baseArcPoints.push(new THREE.Vector3(x_i, 0, z_i));
      }

      // Build Lateral Triangular Ribbons [S, P_i, P_{i+1}]
      for (let i = 0; i < segmentsCount; i++) {
        const p1 = baseArcPoints[i];
        const p2 = baseArcPoints[i + 1];

        // Triangle: S -> p1 -> p2 (Outer facing)
        lateralPositions.push(
          S.x, S.y, S.z,
          p1.x, p1.y, p1.z,
          p2.x, p2.y, p2.z
        );

        // Approximate outward normals
        const vA = new THREE.Vector3(p1.x, 0, p1.z).normalize().multiplyScalar(h).add(new THREE.Vector3(0, r, 0)).normalize();
        const vB = new THREE.Vector3(p2.x, 0, p2.z).normalize().multiplyScalar(h).add(new THREE.Vector3(0, r, 0)).normalize();
        lateralNormals.push(
          0, 1, 0,
          vA.x, vA.y, vA.z,
          vB.x, vB.y, vB.z
        );

        // Base Disc Sector Fan: O -> p2 -> p1
        basePositions.push(
          O.x, O.y, O.z,
          p2.x, p2.y, p2.z,
          p1.x, p1.y, p1.z
        );
      }

      // Lateral Surface Mesh
      const lateralGeo = new THREE.BufferGeometry();
      lateralGeo.setAttribute('position', new THREE.Float32BufferAttribute(lateralPositions, 3));
      lateralGeo.computeVertexNormals();

      const sweepOpacity = isFullSweep ? 0.72 : Math.min(0.68, 0.35 + 0.35 * (currentTheta / (Math.PI * 2)));
      const lateralMat = new THREE.MeshStandardMaterial({
        color: 0xf97316, // Warm Orange
        roughness: 0.35,
        metalness: 0.1,
        transparent: true,
        opacity: sweepOpacity,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const lateralMesh = new THREE.Mesh(lateralGeo, lateralMat);
      lateralMesh.castShadow = true;
      group.add(lateralMesh);

      // Base Sector Fan Mesh
      const baseGeo = new THREE.BufferGeometry();
      baseGeo.setAttribute('position', new THREE.Float32BufferAttribute(basePositions, 3));
      baseGeo.computeVertexNormals();

      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8, // Sky Blue
        roughness: 0.4,
        metalness: 0.05,
        transparent: true,
        opacity: Math.min(0.45, 0.25 + 0.2 * (currentTheta / (Math.PI * 2))),
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      group.add(baseMesh);

      // Base Arc Trajectory Rim (Orange Glowing Curve)
      const arcGeo = new THREE.BufferGeometry().setFromPoints(baseArcPoints);
      const arcMat = new THREE.LineBasicMaterial({
        color: 0xea580c,
        linewidth: 3
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      group.add(arcLine);

      // Add a couple of subtle generatrix trace lines to give depth
      if (!isFullSweep && segmentsCount >= 4) {
        const quarterIdx = Math.floor(segmentsCount / 2);
        const midP = baseArcPoints[quarterIdx];
        const traceGeo = new THREE.BufferGeometry().setFromPoints([S, midP]);
        const traceMat = new THREE.LineDashedMaterial({
          color: 0xc084fc,
          dashSize: 0.1,
          gapSize: 0.05,
          transparent: true,
          opacity: 0.5
        });
        const traceLine = new THREE.Line(traceGeo, traceMat);
        traceLine.computeLineDistances();
        group.add(traceLine);
      }
    }

    // =========================================================================
    // D. ROTATING RIGHT TRIANGLE ΔSOA(θ)
    // =========================================================================
    // 1. Semi-transparent Interior Fill of Triangle ΔSOA
    const triGeo = new THREE.BufferGeometry();
    triGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(
        [
          O.x, O.y, O.z,
          S.x, S.y, S.z,
          currentA.x, currentA.y, currentA.z,
          // Back face
          O.x, O.y, O.z,
          currentA.x, currentA.y, currentA.z,
          S.x, S.y, S.z
        ],
        3
      )
    );
    triGeo.computeVertexNormals();
    const triMat = new THREE.MeshBasicMaterial({
      color: 0xfde047, // Bright yellow tint
      transparent: true,
      opacity: 0.42,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const triMesh = new THREE.Mesh(triGeo, triMat);
    group.add(triMesh);

    // 2. Edge OS (Rotation Axis / Height h) -> Blue
    const tubeOS = createTube(
      O,
      S,
      0.038,
      0x2563eb,
      highlightAxis ? 0x60a5fa : 0x000000,
      1
    );
    group.add(tubeOS);

    // 3. Edge OA(θ) (Base Radius r) -> Orange
    const tubeOA = createTube(
      O,
      currentA,
      0.038,
      0xea580c,
      highlightRadius ? 0xfb923c : 0x000000,
      1
    );
    group.add(tubeOA);

    // 4. Edge SA(θ) (Slant Height / Generatrix l) -> Purple
    const tubeSA = createTube(
      S,
      currentA,
      0.042,
      0x9333ea,
      highlightSlant ? 0xc084fc : 0x000000,
      1
    );
    group.add(tubeSA);

    // 5. Vertices Spheres: O, S, A
    const sphereGeo = new THREE.SphereGeometry(0.065, 16, 16);

    // Vertex S (Apex)
    const matS = new THREE.MeshStandardMaterial({ color: 0x9333ea, roughness: 0.2 });
    const meshS = new THREE.Mesh(sphereGeo, matS);
    meshS.position.copy(S);
    group.add(meshS);

    // Vertex O (Base Center & Right Angle Vertex)
    const matO = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.2 });
    const meshO = new THREE.Mesh(sphereGeo, matO);
    meshO.position.copy(O);
    group.add(meshO);

    // Vertex A(θ) (Orbiting base point)
    const matA = new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.2 });
    const meshA = new THREE.Mesh(sphereGeo, matA);
    meshA.position.copy(currentA);
    group.add(meshA);

    // =========================================================================
    // E. ACCURATE RIGHT-ANGLE MARKER (∟) AT VERTEX O
    // =========================================================================
    const rightAngleSize = Math.min(0.35, 0.14 * Math.min(r, h));
    const dirA = currentA.clone().normalize(); // along OA
    const dirS = new THREE.Vector3(0, 1, 0);   // along OS

    const cornerP1 = dirA.clone().multiplyScalar(rightAngleSize);
    const cornerP2 = cornerP1.clone().add(dirS.clone().multiplyScalar(rightAngleSize));
    const cornerP3 = dirS.clone().multiplyScalar(rightAngleSize);

    const rightAngleGeo = new THREE.BufferGeometry().setFromPoints([cornerP1, cornerP2, cornerP3]);
    const rightAngleMat = new THREE.LineBasicMaterial({
      color: 0x1e293b,
      linewidth: 2
    });
    const rightAngleLine = new THREE.Line(rightAngleGeo, rightAngleMat);
    group.add(rightAngleLine);

    // Small dot in square marker
    const dotCenter = dirA.clone().multiplyScalar(rightAngleSize * 0.5).add(dirS.clone().multiplyScalar(rightAngleSize * 0.5));
    const dotGeo = new THREE.SphereGeometry(0.02, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
    const dotMesh = new THREE.Mesh(dotGeo, dotMat);
    dotMesh.position.copy(dotCenter);
    group.add(dotMesh);

    // =========================================================================
    // F. SWEEP ROTATION ARROW INDICATOR (At Base or Apex)
    // =========================================================================
    if (!isFullSweep && currentTheta > 0.1) {
      const arrowRadius = r * 0.6;
      const arrowSegments = 16;
      const arrowArcPoints: THREE.Vector3[] = [];
      const arrowStart = Math.max(0, currentTheta - 0.5);

      for (let i = 0; i <= arrowSegments; i++) {
        const ang = arrowStart + (i / arrowSegments) * (currentTheta - arrowStart);
        arrowArcPoints.push(new THREE.Vector3(arrowRadius * Math.cos(ang), 0.02, arrowRadius * Math.sin(ang)));
      }

      const arrowGeo = new THREE.BufferGeometry().setFromPoints(arrowArcPoints);
      const arrowMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2 });
      const arrowLine = new THREE.Line(arrowGeo, arrowMat);
      group.add(arrowLine);
    }
  }, [r, h, l, sweepAngleRad, highlightAxis, highlightRadius, highlightSlant, showGhostTriangle]);

  return (
    <div
      id="cone-creation-scene-wrapper"
      className={`relative w-full h-full min-h-[460px] sm:min-h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-50 select-none ${className}`}
    >
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full min-h-[460px] sm:min-h-[520px]" />

      {/* Top Floating Badges */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-auto">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-gray-200 shadow-xs text-xs font-bold text-gray-800">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>Sự tạo thành hình nón (SGK Toán 9)</span>
        </div>
        <div className="px-2.5 py-1.5 rounded-xl bg-orange-50/95 backdrop-blur-md border border-orange-200 text-orange-800 text-xs font-mono font-bold">
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
          <Compass className="w-3.5 h-3.5 text-orange-500" />
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
          {/* Đỉnh S */}
          <div
            ref={labelRefS}
            className={`absolute hidden items-center gap-1.5 px-2 py-0.5 rounded-lg border shadow-xs text-[11px] backdrop-blur-md whitespace-nowrap border-purple-300 text-purple-800 bg-purple-50/95 font-bold ${
              highlightSlant ? 'ring-2 ring-orange-400 scale-110' : 'opacity-90'
            }`}
          >
            <span className="font-bold font-mono">S</span>
            <span className="text-[10px] text-gray-600 font-medium hidden sm:inline">Đỉnh nón</span>
          </div>

          {/* Tâm đáy O */}
          <div
            ref={labelRefO}
            className={`absolute hidden items-center gap-1.5 px-2 py-0.5 rounded-lg border shadow-xs text-[11px] backdrop-blur-md whitespace-nowrap border-blue-300 text-blue-800 bg-blue-50/95 font-bold ${
              highlightAxis ? 'ring-2 ring-orange-400 scale-110' : 'opacity-90'
            }`}
          >
            <span className="font-bold font-mono">O</span>
            <span className="text-[10px] text-gray-600 font-medium hidden sm:inline">Tâm đáy (∟)</span>
          </div>

          {/* Điểm A */}
          <div
            ref={labelRefA}
            className={`absolute hidden items-center gap-1.5 px-2 py-0.5 rounded-lg border shadow-xs text-[11px] backdrop-blur-md whitespace-nowrap border-orange-300 text-orange-800 bg-orange-50/95 font-bold ${
              highlightRadius ? 'ring-2 ring-orange-400 scale-110' : 'opacity-90'
            }`}
          >
            <span className="font-bold font-mono">A</span>
            <span className="text-[10px] text-gray-600 font-medium hidden sm:inline">
              θ = {Math.round((sweepAngleRad / (Math.PI * 2)) * 360)}°
            </span>
          </div>

          {/* Chiều cao h */}
          <div
            ref={labelRefH}
            className={`absolute hidden items-center gap-1.5 px-2 py-0.5 rounded-lg border shadow-xs text-[11px] backdrop-blur-md whitespace-nowrap border-blue-300 text-blue-900 bg-blue-50/95 font-bold ${
              highlightAxis ? 'ring-2 ring-orange-400 scale-110' : 'opacity-90'
            }`}
          >
            <span className="font-bold font-mono">h</span>
            <span className="text-[10px] text-gray-600 font-medium hidden sm:inline">h = {h}cm</span>
          </div>

          {/* Bán kính r */}
          <div
            ref={labelRefR}
            className={`absolute hidden items-center gap-1.5 px-2 py-0.5 rounded-lg border shadow-xs text-[11px] backdrop-blur-md whitespace-nowrap border-orange-300 text-orange-900 bg-orange-50/95 font-bold ${
              highlightRadius ? 'ring-2 ring-orange-400 scale-110' : 'opacity-90'
            }`}
          >
            <span className="font-bold font-mono">r</span>
            <span className="text-[10px] text-gray-600 font-medium hidden sm:inline">r = {r}cm</span>
          </div>

          {/* Đường sinh l */}
          <div
            ref={labelRefL}
            className={`absolute hidden items-center gap-1.5 px-2 py-0.5 rounded-lg border shadow-xs text-[11px] backdrop-blur-md whitespace-nowrap border-purple-300 text-purple-900 bg-purple-50/95 font-bold ${
              highlightSlant ? 'ring-2 ring-orange-400 scale-110' : 'opacity-90'
            }`}
          >
            <span className="font-bold font-mono">l</span>
            <span className="text-[10px] text-gray-600 font-medium hidden sm:inline">l = {l.toFixed(2)}cm</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConeCreationScene;
