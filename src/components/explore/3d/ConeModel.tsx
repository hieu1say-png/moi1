/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GATE 1.2 — 3D CONE GEOMETRY ELEMENTS & MATH RENDERING
 * Compliant with SGK Grade 9 Geometry Lab Standards
 *
 * - Realtime WebGL Cone with geometric elements:
 *   - Apex S (0, h, 0)
 *   - Base Center O (0, 0, 0)
 *   - Point A on base circle (r, 0, 0)
 *   - Height segment SO (S -> O)
 *   - Radius segment OA (O -> A)
 *   - Slant height segment SA (S -> A)
 *   - Right angle square marker at vertex O in right triangle SOA (SO ⊥ OA)
 * - 3D Projected Screen Labels (Html overlay):
 *   - S, O, A, r, h, l (bg-white border-gray-200 rounded-md shadow-sm text-gray-700)
 * - Interactive Highlight on Hover / Click:
 *   - r <-> highlight OA
 *   - h <-> highlight SO
 *   - l <-> highlight SA
 * - OrbitControls, Auto-rotate, Spin 360°, and "Góc nhìn chuẩn" Camera Reset.
 */

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCcw, RotateCw, Compass, Play, Pause } from 'lucide-react';
import { ExplorationModeType } from './CylinderModel';
import { ConeCreationMode } from './cone-creation/ConeCreationMode';
import { OrbitRotationController } from './OrbitRotationController';

export interface ConeModelProps {
  radius?: number; // default = 2 (min = 0.5, max = 5)
  height?: number; // default = 4 (min = 1, max = 8)
  onRadiusChange?: (r: number) => void;
  onHeightChange?: (h: number) => void;
  viewMode?: 'solid' | 'wireframe' | 'cross-section';
  showAxes?: boolean;
  showLabels?: boolean;
  isAutoRotating?: boolean;
  onToggleAutoRotate?: () => void;
  onSpin360?: () => void;
  isSpinning?: boolean;
  onResetReplay?: () => void;
  activeComponentId?: string;
  onSelectComponent?: (componentId: string) => void;
  explorationMode?: ExplorationModeType;
  onExplorationModeChange?: (mode: ExplorationModeType) => void;
  onFormationComplete?: (msg: string) => void;
  onUnfoldComplete?: (msg: string) => void;
  className?: string;
}

interface ProjectedConeLabel {
  id: string;
  componentId: string;
  symbol: string;
  name: string;
  subtext?: string;
  x: number;
  y: number;
  visible: boolean;
  highlighted: boolean;
  colorClass: string;
  targetCoord: THREE.Vector3;
}

export const ConeModel: React.FC<ConeModelProps> = ({
  radius = 2,
  height = 4,
  onRadiusChange,
  onHeightChange,
  viewMode = 'solid',
  showAxes = true,
  showLabels = true,
  isAutoRotating = false,
  onToggleAutoRotate,
  onSpin360,
  isSpinning = false,
  onResetReplay,
  activeComponentId = 'all',
  onSelectComponent,
  explorationMode = 'explore',
  onExplorationModeChange,
  onFormationComplete,
  onUnfoldComplete,
  className = ''
}) => {
  // If in Formation mode, render the dedicated 3D Cone Creation Experience
  if (explorationMode === 'formation' || explorationMode === 'net') {
    return (
      <ConeCreationMode
        radius={radius}
        height={height}
        onRadiusChange={onRadiusChange}
        onHeightChange={onHeightChange}
        onFormationComplete={onFormationComplete}
        className={className}
      />
    );
  }
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const dynamicGroupRef = useRef<THREE.Group | null>(null);
  const axesRef = useRef<THREE.AxesHelper | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const rotationControllerRef = useRef<OrbitRotationController>(
    new OrbitRotationController({ moduleName: 'CONE', pauseOnInteraction: true, resumeDelay: 1500 })
  );

  // Local hover state for interactive highlighting
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  // 3D Projected Screen Labels State
  const [projectedLabels, setProjectedLabels] = useState<ProjectedConeLabel[]>([]);
  const lastLabelsRef = useRef<ProjectedConeLabel[]>([]);

  // Internal spin 360 state
  const [internalIsSpinning, setInternalIsSpinning] = useState(false);

  // Sync external auto-rotate prop to rotation controller
  useEffect(() => {
    rotationControllerRef.current.setAutoRotate(isAutoRotating);
  }, [isAutoRotating]);

  // Realtime Math calculations
  const slantHeight = useMemo(() => Math.sqrt(radius * radius + height * height), [radius, height]);

  // Default camera parameters
  const DEFAULT_CAMERA_POS = useRef(new THREE.Vector3(5.5, 4.2, 6.5));

  // Reset Camera to Default View
  const handleResetCamera = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    const targetPos = DEFAULT_CAMERA_POS.current.clone();
    const targetLookAt = new THREE.Vector3(0, height / 2, 0);

    const startPos = camera.position.clone();
    const startLookAt = controls.target.clone();
    const startTime = performance.now();
    const duration = 600; // ms

    const animateReset = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 3); // Ease-out cubic

      camera.position.lerpVectors(startPos, targetPos, ease);
      controls.target.lerpVectors(startLookAt, targetLookAt, ease);
      controls.update();

      if (progress < 1) {
        requestAnimationFrame(animateReset);
      }
    };

    requestAnimationFrame(animateReset);
  }, [height]);

  // Spin 360 trigger
  const trigger360Spin = useCallback(() => {
    setInternalIsSpinning(true);
    rotationControllerRef.current.trigger360Spin(1600, () => {
      setInternalIsSpinning(false);
    });
    if (onSpin360) {
      onSpin360();
    }
  }, [onSpin360]);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const heightPx = container.clientHeight || 480;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc); // Light Theme Canvas
    sceneRef.current = scene;

    // Dynamic Elements Group
    const dynamicGroup = new THREE.Group();
    scene.add(dynamicGroup);
    dynamicGroupRef.current = dynamicGroup;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / heightPx, 0.1, 100);
    camera.position.copy(DEFAULT_CAMERA_POS.current);
    cameraRef.current = camera;

    // 3. Renderer
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

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, height / 2, 0);
    controls.minDistance = 2.0;
    controls.maxDistance = 25;
    controls.maxPolarAngle = Math.PI / 2 + 0.18; // Allow slight lower perspective but prevent going under floor
    controlsRef.current = controls;

    // Attach to unified OrbitRotationController
    rotationControllerRef.current.attach(controls, camera);

    // 5. Lighting (Studio 3-Point Setup)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainDirLight = new THREE.DirectionalLight(0xfff7ed, 1.2);
    mainDirLight.position.set(6, 12, 8);
    mainDirLight.castShadow = true;
    mainDirLight.shadow.mapSize.width = 1024;
    mainDirLight.shadow.mapSize.height = 1024;
    scene.add(mainDirLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 0.6);
    fillLight.position.set(-8, 6, -6);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffedd5, 0.5);
    rimLight.position.set(0, -4, -8);
    scene.add(rimLight);

    // 6. Ground GridHelper (Subtle Slate Lines)
    const grid = new THREE.GridHelper(16, 16, 0xcbd5e1, 0xe2e8f0);
    grid.position.y = 0;
    scene.add(grid);

    // 7. AxesHelper
    const axes = new THREE.AxesHelper(3.5);
    axes.position.set(0, 0.001, 0);
    axes.visible = showAxes;
    scene.add(axes);
    axesRef.current = axes;

    // 8. Animation & Projection Loop
    const animate = (time: number) => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      // Update rotation controller (handles auto-rotate, damping, and 360 spin)
      rotationControllerRef.current.update(time);

      renderer.render(scene, camera);

      // Update projected 2D Screen Label positions
      if (containerRef.current && cameraRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;

        if (w > 0 && h > 0) {
          const project = (pos: THREE.Vector3) => {
            const worldPos = pos.clone();
            if (dynamicGroupRef.current) {
              worldPos.applyMatrix4(dynamicGroupRef.current.matrixWorld);
            }
            const p = worldPos.project(cameraRef.current!);
            return {
              x: (p.x * 0.5 + 0.5) * w,
              y: (-p.y * 0.5 + 0.5) * h,
              visible: p.z < 1.0
            };
          };

          // Define key geometric points in 3D
          const pointS = new THREE.Vector3(0, height, 0);
          const pointO = new THREE.Vector3(0, 0, 0);
          const pointA = new THREE.Vector3(radius, 0, 0);

          const midSO = new THREE.Vector3(0, height / 2, 0);
          const midOA = new THREE.Vector3(radius / 2, 0, 0);
          const midSA = new THREE.Vector3(radius / 2, height / 2, 0);

          // Offsets for clear label visibility
          const pS = project(new THREE.Vector3(0, height + 0.35, 0));
          const pO = project(new THREE.Vector3(0, -0.32, 0.35));
          const pA = project(new THREE.Vector3(radius + 0.38, 0, 0));
          const ph = project(new THREE.Vector3(-0.45, height / 2, 0));
          const pr = project(new THREE.Vector3(radius / 2, -0.38, 0));
          const pl = project(new THREE.Vector3(radius / 2 + 0.45, height / 2 + 0.15, 0));

          const currentSlant = Math.sqrt(radius * radius + height * height);

          const updatedLabels: ProjectedConeLabel[] = [
            {
              id: 'label_S',
              componentId: 'all',
              symbol: 'S',
              name: 'Đỉnh S',
              subtext: `Đỉnh nón`,
              x: pS.x,
              y: pS.y,
              visible: pS.visible,
              highlighted: activeComponentId === 'all' || hoveredElement === 'S',
              colorClass: 'text-amber-800',
              targetCoord: pointS
            },
            {
              id: 'label_O',
              componentId: 'base',
              symbol: 'O',
              name: 'Tâm O',
              subtext: `Tâm mặt đáy`,
              x: pO.x,
              y: pO.y,
              visible: pO.visible,
              highlighted: activeComponentId === 'base' || hoveredElement === 'O',
              colorClass: 'text-amber-800',
              targetCoord: pointO
            },
            {
              id: 'label_A',
              componentId: 'generator',
              symbol: 'A',
              name: 'Điểm A',
              subtext: `Trên đường tròn đáy`,
              x: pA.x,
              y: pA.y,
              visible: pA.visible,
              highlighted: activeComponentId === 'generator' || hoveredElement === 'A',
              colorClass: 'text-blue-700',
              targetCoord: pointA
            },
            {
              id: 'label_h',
              componentId: 'height',
              symbol: 'h = SO',
              name: `h = ${height}cm`,
              subtext: `Chiều cao SO`,
              x: ph.x,
              y: ph.y,
              visible: ph.visible,
              highlighted: activeComponentId === 'height' || activeComponentId === 'axis' || hoveredElement === 'height' || hoveredElement === 'SO',
              colorClass: 'text-amber-700 font-bold',
              targetCoord: midSO
            },
            {
              id: 'label_r',
              componentId: 'radius',
              symbol: 'r = OA',
              name: `r = ${radius}cm`,
              subtext: `Bán kính đáy OA`,
              x: pr.x,
              y: pr.y,
              visible: pr.visible,
              highlighted: activeComponentId === 'radius' || activeComponentId === 'base' || hoveredElement === 'radius' || hoveredElement === 'OA',
              colorClass: 'text-emerald-700 font-bold',
              targetCoord: midOA
            },
            {
              id: 'label_l',
              componentId: 'generator',
              symbol: 'l = SA',
              name: `l = ${currentSlant.toFixed(2)}cm`,
              subtext: `Đường sinh SA`,
              x: pl.x,
              y: pl.y,
              visible: pl.visible,
              highlighted: activeComponentId === 'generator' || hoveredElement === 'generator' || hoveredElement === 'SA',
              colorClass: 'text-purple-700 font-bold',
              targetCoord: midSA
            }
          ];

          const prev = lastLabelsRef.current;
          let changed = prev.length !== updatedLabels.length;
          if (!changed) {
            for (let i = 0; i < updatedLabels.length; i++) {
              const a = updatedLabels[i];
              const b = prev[i];
              if (
                a.id !== b.id ||
                a.visible !== b.visible ||
                a.highlighted !== b.highlighted ||
                Math.abs(a.x - b.x) > 0.6 ||
                Math.abs(a.y - b.y) > 0.6
              ) {
                changed = true;
                break;
              }
            }
          }

          if (changed) {
            lastLabelsRef.current = updatedLabels;
            setProjectedLabels(updatedLabels);
          }
        }
      }
    };
    animFrameIdRef.current = requestAnimationFrame(animate);

    // 9. Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = newWidth / newHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      resizeObserver.disconnect();
      rotationControllerRef.current.detach();
      controls.dispose();
      renderer.dispose();
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  // Update 3D Geometry Structure when parameters, viewMode, or active component change
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(0, height / 2, 0);
    }
    const group = dynamicGroupRef.current;
    if (!group || !sceneRef.current) return;

    // Clear previous dynamic meshes
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if (obj instanceof THREE.Mesh) {
        obj.geometry?.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material?.dispose();
        }
      } else if (obj instanceof THREE.Line) {
        obj.geometry?.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material?.dispose();
        }
      }
    }

    const isHighlightRadius = activeComponentId === 'radius' || activeComponentId === 'base' || hoveredElement === 'radius' || hoveredElement === 'OA';
    const isHighlightHeight = activeComponentId === 'height' || activeComponentId === 'axis' || hoveredElement === 'height' || hoveredElement === 'SO';
    const isHighlightGenerator = activeComponentId === 'generator' || hoveredElement === 'generator' || hoveredElement === 'SA';
    const isHighlightBase = activeComponentId === 'base' || hoveredElement === 'base' || hoveredElement === 'O';

    // 1. Semi-transparent 3D Cone Body Mesh
    const coneGeo = new THREE.ConeGeometry(radius, height, 64);
    const coneMat = new THREE.MeshPhysicalMaterial({
      color: isHighlightGenerator ? 0xfb923c : 0xf97316,
      transparent: true,
      opacity: viewMode === 'wireframe' ? 1 : activeComponentId === 'all' ? 0.8 : 0.65,
      roughness: 0.25,
      metalness: 0.05,
      clearcoat: 0.3,
      transmission: 0.12,
      ior: 1.45,
      wireframe: viewMode === 'wireframe',
      side: THREE.DoubleSide
    });
    const coneMesh = new THREE.Mesh(coneGeo, coneMat);
    coneMesh.position.set(0, height / 2, 0);
    coneMesh.castShadow = true;
    coneMesh.receiveShadow = true;
    group.add(coneMesh);

    // 2. Base Circle Disk & Rim Outline (at y = 0)
    const baseDiskGeo = new THREE.CircleGeometry(radius, 64);
    const baseDiskMat = new THREE.MeshBasicMaterial({
      color: isHighlightBase ? 0xfbbf24 : 0xfde68a,
      transparent: true,
      opacity: isHighlightBase ? 0.75 : 0.4,
      side: THREE.DoubleSide
    });
    const baseDiskMesh = new THREE.Mesh(baseDiskGeo, baseDiskMat);
    baseDiskMesh.rotation.x = Math.PI / 2;
    baseDiskMesh.position.set(0, 0.002, 0);
    group.add(baseDiskMesh);

    // Base circle rim curve
    const rimCurvePoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      rimCurvePoints.push(new THREE.Vector3(radius * Math.cos(theta), 0.004, radius * Math.sin(theta)));
    }
    const rimGeo = new THREE.BufferGeometry().setFromPoints(rimCurvePoints);
    const rimMat = new THREE.LineBasicMaterial({
      color: isHighlightBase ? 0xd97706 : 0x94a3b8,
      linewidth: isHighlightBase ? 3 : 1
    });
    group.add(new THREE.Line(rimGeo, rimMat));

    // 3. Height Segment SO: from (0, h, 0) to (0, 0, 0)
    const heightTubeRadius = isHighlightHeight ? 0.065 : 0.035;
    const heightTubeGeo = new THREE.CylinderGeometry(heightTubeRadius, heightTubeRadius, height, 16);
    const heightTubeMat = new THREE.MeshStandardMaterial({
      color: isHighlightHeight ? 0xf59e0b : 0xd97706,
      emissive: isHighlightHeight ? 0xf59e0b : 0xb45309,
      emissiveIntensity: isHighlightHeight ? 0.6 : 0.2,
      roughness: 0.3
    });
    const heightTube = new THREE.Mesh(heightTubeGeo, heightTubeMat);
    heightTube.position.set(0, height / 2, 0);
    group.add(heightTube);

    // 4. Radius Segment OA: from (0, 0, 0) to (r, 0, 0)
    const radiusTubeRadius = isHighlightRadius ? 0.065 : 0.035;
    const radiusTubeGeo = new THREE.CylinderGeometry(radiusTubeRadius, radiusTubeRadius, radius, 16);
    const radiusTubeMat = new THREE.MeshStandardMaterial({
      color: isHighlightRadius ? 0x10b981 : 0x059669,
      emissive: isHighlightRadius ? 0x10b981 : 0x047857,
      emissiveIntensity: isHighlightRadius ? 0.6 : 0.2,
      roughness: 0.3
    });
    const radiusTube = new THREE.Mesh(radiusTubeGeo, radiusTubeMat);
    radiusTube.rotation.z = Math.PI / 2;
    radiusTube.position.set(radius / 2, 0.005, 0);
    group.add(radiusTube);

    // 5. Slant Height Segment SA: from S(0, h, 0) to A(r, 0, 0)
    const pointS_coord = new THREE.Vector3(0, height, 0);
    const pointA_coord = new THREE.Vector3(radius, 0, 0);
    const slantVector = new THREE.Vector3().subVectors(pointA_coord, pointS_coord);
    const slantLength = slantVector.length();
    const generatorTubeRadius = isHighlightGenerator ? 0.07 : 0.038;
    const generatorTubeGeo = new THREE.CylinderGeometry(generatorTubeRadius, generatorTubeRadius, slantLength, 16);
    const generatorTubeMat = new THREE.MeshStandardMaterial({
      color: isHighlightGenerator ? 0x8b5cf6 : 0x7c3aed,
      emissive: isHighlightGenerator ? 0x8b5cf6 : 0x6d28d9,
      emissiveIntensity: isHighlightGenerator ? 0.65 : 0.25,
      roughness: 0.3
    });
    const generatorTube = new THREE.Mesh(generatorTubeGeo, generatorTubeMat);

    // Position generator tube at exact midpoint between S(0, h, 0) and A(r, 0, 0)
    generatorTube.position.set(radius / 2, height / 2, 0);

    // Align cylinder from +Y axis (0, 1, 0) to vector SA (radius, -height, 0)
    const dir = slantVector.clone().normalize();
    generatorTube.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    group.add(generatorTube);

    // Crisp line connecting S and A directly on the cone surface
    const generatorLineGeo = new THREE.BufferGeometry().setFromPoints([pointS_coord, pointA_coord]);
    const generatorLineMat = new THREE.LineBasicMaterial({
      color: isHighlightGenerator ? 0xa855f7 : 0x7c3aed,
      linewidth: isHighlightGenerator ? 3 : 2
    });
    group.add(new THREE.Line(generatorLineGeo, generatorLineMat));

    // 6. Right Angle Square Marker at Vertex O (SOA = 90 deg)
    const markSize = Math.max(0.25, Math.min(radius, height) * 0.16);
    const rightAnglePoints: THREE.Vector3[] = [
      new THREE.Vector3(0, markSize, 0.005),
      new THREE.Vector3(markSize, markSize, 0.005),
      new THREE.Vector3(markSize, 0.005, 0.005)
    ];
    const rightAngleGeo = new THREE.BufferGeometry().setFromPoints(rightAnglePoints);
    const rightAngleMat = new THREE.LineBasicMaterial({
      color: isHighlightHeight || isHighlightRadius ? 0xf59e0b : 0x475569,
      linewidth: 2
    });
    group.add(new THREE.Line(rightAngleGeo, rightAngleMat));

    // 7. Key Points Markers (Spheres at S, O, A)
    const markerSphereGeo = new THREE.SphereGeometry(0.12, 16, 16);

    // Apex S
    const sMarkerMat = new THREE.MeshStandardMaterial({
      color: activeComponentId === 'all' || hoveredElement === 'S' ? 0xf59e0b : 0xd97706,
      emissive: 0xd97706,
      emissiveIntensity: 0.4
    });
    const sMesh = new THREE.Mesh(markerSphereGeo, sMarkerMat);
    sMesh.position.set(0, height, 0);
    group.add(sMesh);

    // Center O
    const oMarkerMat = new THREE.MeshStandardMaterial({
      color: isHighlightBase || hoveredElement === 'O' ? 0xf59e0b : 0x059669,
      emissive: 0x059669,
      emissiveIntensity: 0.4
    });
    const oMesh = new THREE.Mesh(markerSphereGeo, oMarkerMat);
    oMesh.position.set(0, 0, 0);
    group.add(oMesh);

    // Point A
    const aMarkerMat = new THREE.MeshStandardMaterial({
      color: isHighlightGenerator || isHighlightRadius || hoveredElement === 'A' ? 0x8b5cf6 : 0x2563eb,
      emissive: 0x2563eb,
      emissiveIntensity: 0.4
    });
    const aMesh = new THREE.Mesh(markerSphereGeo, aMarkerMat);
    aMesh.position.set(radius, 0, 0);
    group.add(aMesh);

    // Update controls target to center of cone
    if (controlsRef.current) {
      controlsRef.current.target.set(0, height / 2, 0);
    }
  }, [radius, height, viewMode, activeComponentId, hoveredElement]);

  // Update Axes visibility
  useEffect(() => {
    if (axesRef.current) {
      axesRef.current.visible = showAxes;
    }
  }, [showAxes]);

  return (
    <div className={`relative w-full h-[460px] sm:h-[520px] lg:h-[560px] rounded-2xl sm:rounded-3xl bg-[#F8FAFC] border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between select-none ${className}`}>
      {/* 1. 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
      />

      {/* 2. Floating 3D Projected Screen Labels (Html overlay) */}
      {showLabels && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          {projectedLabels.map((label) => {
            if (!label.visible) return null;
            return (
              <div
                key={label.id}
                style={{
                  transform: `translate(${label.x}px, ${label.y}px) translate(-50%, -50%)`
                }}
                className="absolute left-0 top-0 transition-transform duration-75 pointer-events-auto"
                onMouseEnter={() => setHoveredElement(label.id.replace('label_', ''))}
                onMouseLeave={() => setHoveredElement(null)}
                onClick={() => onSelectComponent?.(label.componentId)}
              >
                <div
                  className={`px-2.5 py-1 rounded-md border text-center shadow-sm backdrop-blur-xs transition-all cursor-pointer ${
                    label.highlighted
                      ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-200 scale-105'
                      : 'bg-white border-gray-200 hover:border-orange-300 hover:bg-orange-50/70'
                  }`}
                >
                  <div className={`font-mono font-bold text-xs ${label.colorClass}`}>
                    {label.name}
                  </div>
                  {label.subtext && (
                    <div className="text-[9px] text-gray-500 font-sans tracking-tight">
                      {label.subtext}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. Top Left Badge: Model Identity */}
      <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 border border-orange-200 shadow-xs text-xs font-bold text-orange-950 backdrop-blur-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
          <span>Hình Nón 3D (Cone)</span>
        </div>
      </div>

      {/* 4. Top Right Control: Reset Camera (Góc nhìn chuẩn) */}
      <div className="absolute top-3.5 right-3.5 z-20">
        <button
          type="button"
          onClick={handleResetCamera}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 border border-gray-200 shadow-xs hover:border-orange-300 hover:bg-orange-50/80 text-xs font-semibold text-gray-700 hover:text-orange-600 transition-colors backdrop-blur-xs cursor-pointer"
          title="Đưa camera về góc nhìn mặc định"
          aria-label="Góc nhìn chuẩn"
        >
          <Compass className="w-3.5 h-3.5 text-orange-500" />
          <span>Góc nhìn chuẩn</span>
        </button>
      </div>

      {/* 5. Floating Bottom Interactive Action Controls Bar */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none z-20">
        {/* Left Action Buttons: Spin 360 & Auto-Rotate */}
        <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-gray-200 shadow-xs pointer-events-auto">
          {/* Nút QUAY 360° */}
          <button
            type="button"
            onClick={trigger360Spin}
            disabled={internalIsSpinning || isSpinning}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
              internalIsSpinning || isSpinning
                ? 'bg-orange-500 text-white border-orange-400 ring-2 ring-orange-200'
                : 'bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${internalIsSpinning || isSpinning ? 'animate-spin' : ''}`} />
            <span>QUAY 360°</span>
          </button>

          {/* Nút TỰ XOAY */}
          {onToggleAutoRotate && (
            <button
              type="button"
              onClick={onToggleAutoRotate}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                isAutoRotating
                  ? 'bg-amber-100 border-amber-300 text-amber-800'
                  : 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-700'
              }`}
            >
              {isAutoRotating ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>TẠM DỪNG</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current text-orange-500" />
                  <span>TỰ XOAY</span>
                </>
              )}
            </button>
          )}

          {/* Nút CHƠI LẠI */}
          {onResetReplay && (
            <button
              type="button"
              onClick={onResetReplay}
              className="px-3 py-1.5 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl border border-gray-200 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
              <span>CHƠI LẠI</span>
            </button>
          )}
        </div>

        {/* Right Corner Live Dimensions Badges */}
        <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-gray-200 shadow-xs pointer-events-auto">
          <div className="text-[11px] font-mono text-gray-700 flex items-center gap-2">
            <span
              className={`cursor-pointer transition-colors ${activeComponentId === 'radius' ? 'text-emerald-600 font-bold' : ''}`}
              onClick={() => onSelectComponent?.('radius')}
            >
              <strong className="text-emerald-600">r</strong> = {radius}cm
            </span>
            <span className="text-gray-300">|</span>
            <span
              className={`cursor-pointer transition-colors ${activeComponentId === 'height' ? 'text-amber-700 font-bold' : ''}`}
              onClick={() => onSelectComponent?.('height')}
            >
              <strong className="text-amber-700">h</strong> = {height}cm
            </span>
            <span className="text-gray-300">|</span>
            <span
              className={`cursor-pointer transition-colors ${activeComponentId === 'generator' ? 'text-purple-700 font-bold' : ''}`}
              onClick={() => onSelectComponent?.('generator')}
            >
              <strong className="text-purple-700">l</strong> = {slantHeight.toFixed(2)}cm
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConeModel;
