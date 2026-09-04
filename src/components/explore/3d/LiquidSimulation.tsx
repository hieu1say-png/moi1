/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * LIQUID SIMULATION COMPONENT (THREE.JS 3D)
 *
 * Mathematical Core:
 * - Cylinder Volume Formula: V = S_base * h = π * r² * h
 * - Liquid Level (h_liquid) dynamically linked to Volume V_liquid = π * r² * h_liquid
 *
 * 3D Scene Elements:
 * 1. Container: Graduated glass cylinder with volumetric tick marks, radius r, height h, double-wall transparency.
 * 2. Liquid: 3D translucent fluid cylinder mesh with rising meniscus, surface wave ripples, dynamic water color.
 * 3. Pouring Source: Tilting glass beaker/pitcher with spout positioned above and to the side.
 * 4. Stream: Dynamic curved fluid stream + particle jet connecting pitcher spout to the liquid surface in the cylinder.
 * 5. Splashes & Ripples: Concentric surface ripple geometry and splash particles at impact point.
 *
 * Animation Sequence:
 * - Step 1: Pitcher tilts (0° -> 52°)
 * - Step 2: Stream emerges from spout and flows into cylinder
 * - Step 3: Cylinder liquid level h_liquid rises steadily from 0 to h
 * - Step 4: Live volume display: V = πr²h updates in real time with exact formula and numerical computation.
 *
 * Interactive Controls:
 * - Play / Pause, Reset, Replay, Speed modifier (0.5x, 1x, 2x), Timeline scrubber
 * - Dynamic radius (r) and height (h) sliders
 * - Full 3D orbit controls (Touch & Mouse)
 */

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move,
  Droplets,
  Sliders,
  Sparkles,
  Volume2,
  Info,
  Maximize2,
  Minimize2,
  ArrowRight,
  TrendingUp,
  FlaskConical,
  CheckCircle2,
  RefreshCw,
  HelpCircle,
  Award,
  Building2,
  Coffee
} from 'lucide-react';
import { MathFormula } from '../../common/MathFormula';

export interface LiquidSimulationProps {
  initialRadius?: number; // cm
  initialHeight?: number; // cm
  onVolumeChange?: (vol: number) => void;
  className?: string;
  autoPlay?: boolean;
}

export const LiquidSimulation: React.FC<LiquidSimulationProps> = ({
  initialRadius = 3.5,
  initialHeight = 8,
  onVolumeChange,
  className = '',
  autoPlay = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Geometric Parameters
  const [radius, setRadius] = useState<number>(initialRadius);
  const [maxHeight, setMaxHeight] = useState<number>(initialHeight);

  // Animation State (0.0 to 1.0)
  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [liquidColor, setLiquidColor] = useState<'cyan' | 'blue' | 'emerald' | 'amber'>('cyan');

  // Interactive Sub-Tabs
  const [activeTab, setActiveTab] = useState<'simulation' | 'prediction' | 'realworld'>('simulation');

  // Prediction Experiment State
  const [predictedH, setPredictedH] = useState<string>('5.0');
  const [targetVolumeInput, setTargetVolumeInput] = useState<number>(200);
  const [hasPredicted, setHasPredicted] = useState<boolean>(false);
  const [predictionFeedback, setPredictionFeedback] = useState<{
    actualH: number;
    diff: number;
    isCorrect: boolean;
  } | null>(null);

  // Real-world Tank State
  const [tankType, setTankType] = useState<'water_tank' | 'soda_can'>('water_tank');
  const [realWorldV, setRealWorldV] = useState<number>(1500); // 1500L
  const [realWorldD, setRealWorldD] = useState<number>(1.2); // 1.2m diameter

  // Animation state refs for requestAnimationFrame loop
  const progressRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(autoPlay);
  const playbackSpeedRef = useRef<number>(1);
  const lastTimeRef = useRef<number | null>(null);

  // 3D Object references for frame updates
  const objectsRef = useRef<{
    pitcherGroup: THREE.Group | null;
    pitcherLiquidMesh: THREE.Mesh | null;
    containerGroup: THREE.Group | null;
    liquidMesh: THREE.Mesh | null;
    liquidTopDisc: THREE.Mesh | null;
    streamMesh: THREE.Mesh | null;
    streamParticles: THREE.Points | null;
    rippleMesh: THREE.Mesh | null;
    graduationMarksGroup: THREE.Group | null;
    gridHelper: THREE.GridHelper | null;
    dimensionLinesGroup: THREE.Group | null;
  }>({
    pitcherGroup: null,
    pitcherLiquidMesh: null,
    containerGroup: null,
    liquidMesh: null,
    liquidTopDisc: null,
    streamMesh: null,
    streamParticles: null,
    rippleMesh: null,
    graduationMarksGroup: null,
    gridHelper: null,
    dimensionLinesGroup: null
  });

  // Keep refs in sync
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    playbackSpeedRef.current = playbackSpeed;
  }, [playbackSpeed]);

  // Liquid Calculation Metrics
  const currentMetrics = useMemo(() => {
    const r = radius;
    const hTotal = maxHeight;
    // Current liquid height: progress maps smoothly to [0, hTotal]
    // Tilting happens in progress [0 -> 0.15], pouring in [0.15 -> 0.95], settling in [0.95 -> 1.0]
    let fillFraction = 0;
    if (progress < 0.15) {
      fillFraction = 0;
    } else if (progress < 0.92) {
      // Ease in-out filling
      const t = (progress - 0.15) / (0.92 - 0.15);
      fillFraction = t;
    } else {
      fillFraction = 1;
    }

    const currentH = fillFraction * hTotal;
    const baseArea = Math.PI * r * r;
    const currentVolume = baseArea * currentH;
    const maxVolume = baseArea * hTotal;
    const currentVolumePi = r * r * currentH;
    const maxVolumePi = r * r * hTotal;

    // Pitcher tilt angle in degrees: 0° to 52°
    let tiltAngleDeg = 0;
    if (progress < 0.15) {
      tiltAngleDeg = (progress / 0.15) * 50;
    } else if (progress < 0.9) {
      tiltAngleDeg = 50 + Math.sin(progress * 20) * 1.5; // slight natural hand jitter
    } else {
      // Tilt back
      const t = (progress - 0.9) / 0.1;
      tiltAngleDeg = 50 * (1 - t);
    }

    const isStreamActive = progress >= 0.14 && progress <= 0.92;

    return {
      r,
      hTotal,
      currentH,
      fillFraction,
      baseArea,
      currentVolume,
      maxVolume,
      currentVolumePi,
      maxVolumePi,
      tiltAngleDeg,
      isStreamActive
    };
  }, [radius, maxHeight, progress]);

  // Notify parent of volume changes
  useEffect(() => {
    if (onVolumeChange) {
      onVolumeChange(currentMetrics.currentVolume);
    }
  }, [currentMetrics.currentVolume, onVolumeChange]);

  // Color palette for liquid
  const colorMap = useMemo(() => {
    switch (liquidColor) {
      case 'cyan':
        return {
          water: 0x06b6d4,
          waterSurface: 0x38bdf8,
          glass: 0x93c5fd,
          stream: 0x22d3ee,
          splash: 0x67e8f9
        };
      case 'blue':
        return {
          water: 0x2563eb,
          waterSurface: 0x60a5fa,
          glass: 0x93c5fd,
          stream: 0x3b82f6,
          splash: 0x93c5fd
        };
      case 'emerald':
        return {
          water: 0x10b981,
          waterSurface: 0x34d399,
          glass: 0xa7f3d0,
          stream: 0x10b981,
          splash: 0x6ee7b7
        };
      case 'amber':
        return {
          water: 0xf59e0b,
          waterSurface: 0xfbbf24,
          glass: 0xfde68a,
          stream: 0xf59e0b,
          splash: 0xfcd34d
        };
      default:
        return {
          water: 0x06b6d4,
          waterSurface: 0x38bdf8,
          glass: 0x93c5fd,
          stream: 0x22d3ee,
          splash: 0x67e8f9
        };
    }
  }, [liquidColor]);

  // Fit camera view
  const fitCamera = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    const maxDim = Math.max(radius * 2, maxHeight);
    const dist = maxDim * 2.6 + 8;
    cameraRef.current.position.set(dist * 0.75, dist * 0.55, dist * 0.95);
    cameraRef.current.lookAt(0, maxHeight * 0.45, 0);
    controlsRef.current.target.set(0, maxHeight * 0.45, 0);
    controlsRef.current.update();
  }, [radius, maxHeight]);

  // Play / Pause toggle
  const handleTogglePlay = () => {
    if (progress >= 1) {
      setProgress(0);
      progressRef.current = 0;
    }
    setIsPlaying(!isPlaying);
  };

  // Reset animation and view cleanly
  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
    progressRef.current = 0;
    setHasPredicted(false);
    setPredictionFeedback(null);
    fitCamera();
  };

  // Replay animation
  const handleReplay = () => {
    setProgress(0);
    progressRef.current = 0;
    setIsPlaying(true);
  };

  // Run Prediction Test
  const handleRunPredictionTest = () => {
    const pred = parseFloat(predictedH);
    if (isNaN(pred) || pred <= 0) return;

    // V = pi * r^2 * h => h = V / (pi * r^2)
    const baseArea = Math.PI * radius * radius;
    const actualH = targetVolumeInput / baseArea;
    const diff = Math.abs(actualH - pred);

    setHasPredicted(true);
    setPredictionFeedback({
      actualH,
      diff,
      isCorrect: diff <= 0.4
    });

    // Start filling
    setProgress(0);
    progressRef.current = 0;
    setIsPlaying(true);
  };

  // Build Scene Three.js
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxPolarAngle = Math.PI / 2 + 0.15; // allow slightly below horizon
    controls.minDistance = 6;
    controls.maxDistance = 60;
    controlsRef.current = controls;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainDirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    mainDirLight.position.set(12, 22, 16);
    mainDirLight.castShadow = true;
    mainDirLight.shadow.mapSize.width = 1024;
    mainDirLight.shadow.mapSize.height = 1024;
    mainDirLight.shadow.bias = -0.001;
    scene.add(mainDirLight);

    const fillLight = new THREE.DirectionalLight(0xf97316, 0.6);
    fillLight.position.set(-14, 10, -12);
    scene.add(fillLight);

    const bottomRimLight = new THREE.PointLight(0xfb923c, 0.8, 30);
    bottomRimLight.position.set(0, -1, 0);
    scene.add(bottomRimLight);

    // Floor Base Plate & Grid
    const floorGeo = new THREE.CylinderGeometry(radius * 2.2 + 4, radius * 2.2 + 4, 0.3, 48);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.8,
      metalness: 0.1
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.y = -0.15;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    const gridHelper = new THREE.GridHelper(30, 30, 0xcbd5e1, 0xe2e8f0);
    gridHelper.position.y = -0.3;
    scene.add(gridHelper);
    objectsRef.current.gridHelper = gridHelper;

    // -------------------------------------------------------------
    // 1. CONTAINER: CYLINDER GLASS MEASURING CUP (Bình Chứa Hình Trụ)
    // -------------------------------------------------------------
    const containerGroup = new THREE.Group();
    scene.add(containerGroup);
    objectsRef.current.containerGroup = containerGroup;

    // Glass material
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.32,
      roughness: 0.05,
      metalness: 0.05,
      transmission: 0.85,
      ior: 1.48,
      thickness: 0.2,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xffffff),
      side: THREE.DoubleSide,
      depthWrite: false
    });

    const glassRimMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      roughness: 0.2,
      metalness: 0.6,
      transparent: true,
      opacity: 0.85
    });

    // Glass Outer Cylinder
    const rOuter = radius;
    const rInner = radius * 0.97;
    const h = maxHeight;

    const glassBodyGeo = new THREE.CylinderGeometry(rOuter, rOuter, h, 64, 1, true);
    const glassBodyMesh = new THREE.Mesh(glassBodyGeo, glassMat);
    glassBodyMesh.position.y = h / 2;
    glassBodyMesh.castShadow = true;
    containerGroup.add(glassBodyMesh);

    // Glass Bottom Base Plate
    const glassBottomGeo = new THREE.CylinderGeometry(rOuter, rOuter, 0.2, 64);
    const glassBottomMesh = new THREE.Mesh(glassBottomGeo, glassMat);
    glassBottomMesh.position.y = 0.1;
    containerGroup.add(glassBottomMesh);

    // Glass Top Lip Rim
    const glassTopRimGeo = new THREE.TorusGeometry(rOuter, 0.08, 16, 64);
    glassTopRimGeo.rotateX(Math.PI / 2);
    const glassTopRimMesh = new THREE.Mesh(glassTopRimGeo, glassRimMat);
    glassTopRimMesh.position.y = h;
    containerGroup.add(glassTopRimMesh);

    // Bottom Base Circle Outline (Glowing cyan for math clarity)
    const baseCircleGeo = new THREE.RingGeometry(rOuter - 0.04, rOuter + 0.04, 64);
    baseCircleGeo.rotateX(-Math.PI / 2);
    const baseCircleMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide
    });
    const baseCircleMesh = new THREE.Mesh(baseCircleGeo, baseCircleMat);
    baseCircleMesh.position.y = 0.02;
    containerGroup.add(baseCircleMesh);

    // Graduation Tick Marks (Vạch chia thể tích & chiều cao trên thành bình)
    const marksGroup = new THREE.Group();
    containerGroup.add(marksGroup);
    objectsRef.current.graduationMarksGroup = marksGroup;

    const markMatMajor = new THREE.MeshBasicMaterial({ color: 0xe0f2fe });
    const markMatMinor = new THREE.MeshBasicMaterial({ color: 0x64748b });

    const stepCm = 1; // tick mark every 1cm
    for (let cm = 1; cm <= Math.floor(h); cm++) {
      const isMajor = cm % 2 === 0 || cm === Math.floor(h);
      const markLength = isMajor ? 0.6 : 0.35;
      const markWidth = isMajor ? 0.04 : 0.02;

      // Front mark line
      const markGeo = new THREE.PlaneGeometry(markLength, markWidth);
      const markMesh = new THREE.Mesh(markGeo, isMajor ? markMatMajor : markMatMinor);
      markMesh.position.set(0, cm, rOuter + 0.02);
      marksGroup.add(markMesh);

      // Volume label disc on the side
      if (isMajor) {
        const ringMarkGeo = new THREE.RingGeometry(rOuter - 0.02, rOuter + 0.02, 48);
        ringMarkGeo.rotateX(-Math.PI / 2);
        const ringMarkMesh = new THREE.Mesh(
          ringMarkGeo,
          new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.3
          })
        );
        ringMarkMesh.position.y = cm;
        marksGroup.add(ringMarkMesh);
      }
    }

    // -------------------------------------------------------------
    // 2. LIQUID IN CYLINDER (Chất lỏng trong hình trụ)
    // -------------------------------------------------------------
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: colorMap.water,
      transparent: true,
      opacity: 0.78,
      roughness: 0.05,
      metalness: 0.05,
      transmission: 0.35,
      ior: 1.333, // Water IOR
      side: THREE.DoubleSide
    });

    // Liquid Body Mesh (Initial scale y = 0.001)
    const liquidGeo = new THREE.CylinderGeometry(rInner, rInner, h, 64, 1, false);
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.position.y = 0; // will be dynamically adjusted in render loop
    liquidMesh.scale.set(1, 0.0001, 1);
    containerGroup.add(liquidMesh);
    objectsRef.current.liquidMesh = liquidMesh;

    // Liquid Top Moving Surface Disc (Meniscus with gentle glow & ripples)
    const liquidTopDiscGeo = new THREE.CircleGeometry(rInner, 64);
    liquidTopDiscGeo.rotateX(-Math.PI / 2);
    const liquidTopDiscMat = new THREE.MeshStandardMaterial({
      color: colorMap.waterSurface,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.92,
      side: THREE.DoubleSide
    });
    const liquidTopDisc = new THREE.Mesh(liquidTopDiscGeo, liquidTopDiscMat);
    liquidTopDisc.position.y = 0.01;
    containerGroup.add(liquidTopDisc);
    objectsRef.current.liquidTopDisc = liquidTopDisc;

    // Concentric Wave Ripple Mesh at impact center
    const rippleGeo = new THREE.RingGeometry(0.1, rInner * 0.85, 48);
    rippleGeo.rotateX(-Math.PI / 2);
    const rippleMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide
    });
    const rippleMesh = new THREE.Mesh(rippleGeo, rippleMat);
    rippleMesh.position.y = 0.02;
    containerGroup.add(rippleMesh);
    objectsRef.current.rippleMesh = rippleMesh;

    // -------------------------------------------------------------
    // 3. POURING SOURCE (Cốc/Bình Rót Nghiêng Trên Cao)
    // -------------------------------------------------------------
    const pitcherGroup = new THREE.Group();
    scene.add(pitcherGroup);
    objectsRef.current.pitcherGroup = pitcherGroup;

    // Position pitcher nicely at upper right of cylinder container
    const pitcherInitPos = new THREE.Vector3(radius + 3.8, maxHeight + 3.2, 0);
    pitcherGroup.position.copy(pitcherInitPos);

    // Beaker body
    const pitcherRadius = 1.8;
    const pitcherHeight = 4.2;

    const pitcherBodyGeo = new THREE.CylinderGeometry(
      pitcherRadius * 1.05,
      pitcherRadius * 0.9,
      pitcherHeight,
      32,
      1,
      true
    );
    const pitcherBodyMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      transmission: 0.8,
      ior: 1.45,
      side: THREE.DoubleSide
    });
    const pitcherMesh = new THREE.Mesh(pitcherBodyGeo, pitcherBodyMat);
    pitcherMesh.position.set(0, pitcherHeight / 2, 0);
    pitcherGroup.add(pitcherMesh);

    // Pitcher Bottom
    const pitcherBottomGeo = new THREE.CylinderGeometry(
      pitcherRadius * 0.9,
      pitcherRadius * 0.9,
      0.15,
      32
    );
    const pitcherBottomMesh = new THREE.Mesh(pitcherBottomGeo, pitcherBodyMat);
    pitcherBottomMesh.position.set(0, 0.075, 0);
    pitcherGroup.add(pitcherBottomMesh);

    // Pitcher Spout (Mỏ rót vát nhọn)
    const spoutGeo = new THREE.ConeGeometry(0.5, 0.8, 16, 1, true, 0, Math.PI);
    spoutGeo.rotateZ(Math.PI / 2 + 0.3);
    const spoutMesh = new THREE.Mesh(spoutGeo, pitcherBodyMat);
    spoutMesh.position.set(-pitcherRadius * 1.02, pitcherHeight - 0.2, 0);
    pitcherGroup.add(spoutMesh);

    // Pitcher Handle (Quai cốc)
    const handleGeo = new THREE.TorusGeometry(0.9, 0.12, 12, 24, Math.PI);
    handleGeo.rotateZ(-Math.PI / 2);
    const handleMesh = new THREE.Mesh(handleGeo, glassRimMat);
    handleMesh.position.set(pitcherRadius * 1.05, pitcherHeight * 0.55, 0);
    pitcherGroup.add(handleMesh);

    // Pitcher Liquid inside
    const pitcherLiquidGeo = new THREE.CylinderGeometry(
      pitcherRadius * 0.95,
      pitcherRadius * 0.85,
      pitcherHeight * 0.8,
      32
    );
    const pitcherLiquidMat = new THREE.MeshPhysicalMaterial({
      color: colorMap.water,
      transparent: true,
      opacity: 0.85,
      roughness: 0.1
    });
    const pitcherLiquidMesh = new THREE.Mesh(pitcherLiquidGeo, pitcherLiquidMat);
    pitcherLiquidMesh.position.set(0, pitcherHeight * 0.45, 0);
    pitcherGroup.add(pitcherLiquidMesh);
    objectsRef.current.pitcherLiquidMesh = pitcherLiquidMesh;

    // -------------------------------------------------------------
    // 4. STREAM (Dòng Nước Uốn Lượn Từ Mỏ Cốc Xuống Hình Trụ)
    // -------------------------------------------------------------
    // We create a CatmullRomCurve3 tube for the water stream
    const updateStreamCurve = () => {
      // Spout world position
      const spoutOffset = new THREE.Vector3(-pitcherRadius - 0.2, pitcherHeight - 0.1, 0);
      const spoutWorld = spoutOffset.clone().applyEuler(pitcherGroup.rotation).add(pitcherGroup.position);
      const targetPos = new THREE.Vector3(0, 0.1, 0); // target impact point inside cylinder

      const midPoint = new THREE.Vector3(
        (spoutWorld.x + targetPos.x) * 0.5 - 0.3,
        (spoutWorld.y + targetPos.y) * 0.55,
        0
      );

      const curve = new THREE.CatmullRomCurve3([
        spoutWorld,
        midPoint,
        targetPos
      ]);

      const streamGeo = new THREE.TubeGeometry(curve, 32, 0.16, 12, false);
      return streamGeo;
    };

    const initialStreamGeo = updateStreamCurve();
    const streamMat = new THREE.MeshStandardMaterial({
      color: colorMap.stream,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.0, // hidden initially
      emissive: colorMap.stream,
      emissiveIntensity: 0.25
    });
    const streamMesh = new THREE.Mesh(initialStreamGeo, streamMat);
    scene.add(streamMesh);
    objectsRef.current.streamMesh = streamMesh;

    // Splash Particles (Hạt nước bắn tung tóe)
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleVel = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = 0;
      particlePos[i * 3 + 1] = -100; // start hidden
      particlePos[i * 3 + 2] = 0;

      particleVel[i * 3] = (Math.random() - 0.5) * 1.5;
      particleVel[i * 3 + 1] = Math.random() * 2.0 + 0.5;
      particleVel[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: colorMap.splash,
      size: 0.18,
      transparent: true,
      opacity: 0.0
    });
    const streamParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(streamParticles);
    objectsRef.current.streamParticles = streamParticles;

    // Fit camera
    fitCamera();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const hCanvas = containerRef.current.clientHeight;
      camera.aspect = w / hCanvas;
      camera.updateProjectionMatrix();
      renderer.setSize(w, hCanvas);
    };

    window.addEventListener('resize', handleResize);

    // -------------------------------------------------------------
    // RENDER / ANIMATION LOOP
    // -------------------------------------------------------------
    let particleTick = 0;

    const animate = (timestamp: number) => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      // Handle Progress Time Step
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = timestamp;

      if (isPlayingRef.current) {
        const speed = playbackSpeedRef.current;
        const newProgress = Math.min(1, progressRef.current + (dt * 0.18 * speed));
        progressRef.current = newProgress;
        setProgress(newProgress);

        if (newProgress >= 1) {
          isPlayingRef.current = false;
          setIsPlaying(false);
        }
      }

      const p = progressRef.current;

      // 1. Calculate liquid height & fill ratio
      let fillRatio = 0;
      if (p < 0.15) {
        fillRatio = 0;
      } else if (p < 0.92) {
        fillRatio = (p - 0.15) / (0.92 - 0.15);
      } else {
        fillRatio = 1;
      }

      const currentLiquidH = fillRatio * maxHeight;

      // 2. Animate Pitcher Tilting (Cốc nghiêng)
      const pitcher = objectsRef.current.pitcherGroup;
      if (pitcher) {
        let tilt = 0;
        if (p < 0.15) {
          tilt = (p / 0.15) * 0.92; // 0 to ~53 deg in rad
        } else if (p < 0.9) {
          tilt = 0.92 + Math.sin(timestamp * 0.006) * 0.02; // natural fluid pour oscillation
        } else {
          const ret = (p - 0.9) / 0.1;
          tilt = 0.92 * (1 - ret);
        }
        pitcher.rotation.z = tilt;

        // Drain liquid inside pitcher
        const pitcherLiq = objectsRef.current.pitcherLiquidMesh;
        if (pitcherLiq) {
          const remainingInPitcher = Math.max(0.01, 1 - fillRatio * 0.9);
          pitcherLiq.scale.set(1, remainingInPitcher, 1);
          pitcherLiq.position.y = (pitcherHeight * 0.45) * remainingInPitcher;
        }
      }

      // 3. Animate Liquid Mesh in Cylinder (Mực nước dâng)
      const liqMesh = objectsRef.current.liquidMesh;
      const liqDisc = objectsRef.current.liquidTopDisc;
      const ripMesh = objectsRef.current.rippleMesh;

      if (liqMesh && liqDisc) {
        if (currentLiquidH > 0.05) {
          liqMesh.visible = true;
          liqDisc.visible = true;
          // Cylinder Geometry is created with height = maxHeight and centered at y = 0
          // Scaling y and offsetting position.y = currentLiquidH / 2 creates rising liquid from base y=0!
          const scaleY = currentLiquidH / maxHeight;
          liqMesh.scale.set(1, Math.max(0.001, scaleY), 1);
          liqMesh.position.y = currentLiquidH / 2;

          // Position the top surface disc exactly at current water level
          liqDisc.position.y = currentLiquidH;
        } else {
          liqMesh.visible = false;
          liqDisc.visible = false;
        }

        // 4. Animate Stream & Surface Ripples
        const isPouring = p >= 0.14 && p <= 0.92;
        const strMesh = objectsRef.current.streamMesh;
        const strParts = objectsRef.current.streamParticles;

        if (strMesh) {
          const strMat = strMesh.material as THREE.MeshStandardMaterial;
          if (isPouring) {
            strMat.opacity = 0.88;

            // Recompute stream curve to end right at top of current water level!
            const spoutWorld = new THREE.Vector3(-pitcherRadius - 0.2, pitcherHeight - 0.1, 0)
              .applyEuler(pitcher ? pitcher.rotation : new THREE.Euler())
              .add(pitcher ? pitcher.position : new THREE.Vector3());

            const impactTarget = new THREE.Vector3(0, Math.max(0.05, currentLiquidH), 0);
            const mid = new THREE.Vector3(
              (spoutWorld.x + impactTarget.x) * 0.5 - 0.25,
              (spoutWorld.y + impactTarget.y) * 0.55 + 0.2,
              0
            );

            const newCurve = new THREE.CatmullRomCurve3([spoutWorld, mid, impactTarget]);
            const newGeo = new THREE.TubeGeometry(newCurve, 24, 0.14 + Math.sin(timestamp * 0.015) * 0.02, 10, false);
            strMesh.geometry.dispose();
            strMesh.geometry = newGeo;
          } else {
            strMat.opacity = 0.0;
          }
        }

        // Ripples
        if (ripMesh) {
          const ripMat = ripMesh.material as THREE.MeshBasicMaterial;
          if (isPouring && currentLiquidH > 0.05) {
            ripMesh.position.y = currentLiquidH + 0.01;
            const ripScale = 0.3 + ((timestamp * 0.003) % 1) * 0.7;
            ripMesh.scale.set(ripScale, ripScale, ripScale);
            ripMat.opacity = (1 - ((timestamp * 0.003) % 1)) * 0.6;
          } else {
            ripMat.opacity = 0.0;
          }
        }

        // Splash Particles
        if (strParts && isPouring && currentLiquidH > 0.05) {
          const pMat = strParts.material as THREE.PointsMaterial;
          pMat.opacity = 0.75;
          const posAttr = strParts.geometry.getAttribute('position') as THREE.BufferAttribute;
          const posArray = posAttr.array as Float32Array;

          particleTick++;
          for (let i = 0; i < particleCount; i++) {
            const idx = i * 3;
            // update y
            posArray[idx + 1] += particleVel[idx + 1] * 0.06;
            posArray[idx] += particleVel[idx] * 0.04;
            posArray[idx + 2] += particleVel[idx + 2] * 0.04;

            // Reset particle when it drops below water surface
            if (posArray[idx + 1] < currentLiquidH || posArray[idx + 1] > currentLiquidH + 1.2) {
              posArray[idx] = (Math.random() - 0.5) * 0.2;
              posArray[idx + 1] = currentLiquidH + 0.02;
              posArray[idx + 2] = (Math.random() - 0.5) * 0.2;
            }
          }
          posAttr.needsUpdate = true;
        } else if (strParts) {
          (strParts.material as THREE.PointsMaterial).opacity = 0.0;
        }
      }

      // Update Controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }

      // Render
      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, [radius, maxHeight, colorMap, fitCamera]);

  return (
    <div
      id="liquid-simulation-container"
      className={`relative w-full rounded-2xl sm:rounded-3xl bg-slate-50 border border-gray-200 shadow-sm overflow-hidden flex flex-col ${className}`}
    >
      {/* Top Header & Mathematical Real-time Formula Display Bar */}
      <div className="p-3 sm:p-4 bg-gradient-to-r from-orange-500 to-orange-600 border-b border-orange-600 flex flex-wrap items-center justify-between gap-3 z-10 text-white">
        {/* Title and Math Badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center border border-white/30">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-black tracking-wide text-white uppercase flex items-center gap-1.5">
                <span>Mô Phỏng Thể Tích Chất Lỏng</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 border border-white/40 text-white font-mono">
                  3D WebGL
                </span>
              </h3>
            </div>
            <p className="text-[11px] text-orange-100 flex items-center gap-1">
              <span>Rót nước vào hình trụ &bull; Mực nước</span>
              <strong className="text-white font-mono">h</strong>
              <span>liên kết với thể tích:</span>
              <MathFormula formula="V = \pi r^2 h" className="text-white font-bold inline-block" />
            </p>
          </div>
        </div>

        {/* Live Mathematical Formula Callout using MathFormula */}
        <div className="flex items-center gap-2 bg-white/15 px-3 py-1.5 rounded-xl border border-white/30 backdrop-blur-xs">
          <div className="text-[11px] font-mono text-white flex items-center gap-2 flex-wrap">
            <MathFormula
              formula={`V = \\pi r^2 h = \\pi \\times ${radius}^2 \\times ${currentMetrics.currentH.toFixed(1)}`}
              className="text-orange-100"
            />
            <span className="text-white font-bold">=</span>
            <span className="text-white font-black text-xs sm:text-sm">
              {currentMetrics.currentVolume.toFixed(2)} cm³ (ml)
            </span>
          </div>
        </div>
      </div>

      {/* Sub-Tabs: Simulation / Prediction / Real-World */}
      <div className="px-3 sm:px-4 py-2 bg-white border-b border-gray-200 flex items-center gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('simulation')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'simulation'
              ? 'bg-orange-500 text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Droplets className="w-3.5 h-3.5" />
          <span>Mô phỏng 3D</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('prediction')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'prediction'
              ? 'bg-orange-500 text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Dự đoán thực nghiệm</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('realworld')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'realworld'
              ? 'bg-orange-500 text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Ứng dụng thực tế (Bồn &amp; Lon)</span>
        </button>
      </div>

      {/* 3D Canvas Viewport Stage */}
      <div className="relative w-full h-[360px] sm:h-[430px] lg:h-[480px] bg-[#F8FAFC]">
        {/* Canvas DOM mounting ref */}
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Top-Right Floating Controls (Zoom, Fit, Color Picker) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10 pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-md p-1 rounded-xl border border-gray-200 flex flex-col gap-1 shadow-sm">
            <button
              type="button"
              id="liquid-btn-zoom-in"
              onClick={() => {
                if (controlsRef.current && cameraRef.current) {
                  cameraRef.current.position.multiplyScalar(0.85);
                  controlsRef.current.update();
                }
              }}
              className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              title="Phóng to"
              aria-label="Phóng to"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              id="liquid-btn-zoom-out"
              onClick={() => {
                if (controlsRef.current && cameraRef.current) {
                  cameraRef.current.position.multiplyScalar(1.15);
                  controlsRef.current.update();
                }
              }}
              className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              title="Thu nhỏ"
              aria-label="Thu nhỏ"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              id="liquid-btn-fit"
              onClick={fitCamera}
              className="p-1.5 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
              title="Căn vừa màn hình"
              aria-label="Căn vừa"
            >
              <Move className="w-4 h-4" />
            </button>
          </div>

          {/* Liquid Color Switcher */}
          <div className="bg-white/95 backdrop-blur-md p-1.5 rounded-xl border border-gray-200 flex flex-col items-center gap-1 shadow-sm">
            <button
              type="button"
              onClick={() => setLiquidColor('cyan')}
              className={`w-4 h-4 rounded-full bg-cyan-400 transition-all ${
                liquidColor === 'cyan' ? 'ring-2 ring-orange-500 scale-110' : 'opacity-60 hover:opacity-100'
              }`}
              title="Nước màu Cyan"
            />
            <button
              type="button"
              onClick={() => setLiquidColor('blue')}
              className={`w-4 h-4 rounded-full bg-blue-500 transition-all ${
                liquidColor === 'blue' ? 'ring-2 ring-orange-500 scale-110' : 'opacity-60 hover:opacity-100'
              }`}
              title="Nước màu Xanh Dương"
            />
            <button
              type="button"
              onClick={() => setLiquidColor('emerald')}
              className={`w-4 h-4 rounded-full bg-emerald-400 transition-all ${
                liquidColor === 'emerald' ? 'ring-2 ring-orange-500 scale-110' : 'opacity-60 hover:opacity-100'
              }`}
              title="Nước màu Lục"
            />
            <button
              type="button"
              onClick={() => setLiquidColor('amber')}
              className={`w-4 h-4 rounded-full bg-amber-400 transition-all ${
                liquidColor === 'amber' ? 'ring-2 ring-orange-500 scale-110' : 'opacity-60 hover:opacity-100'
              }`}
              title="Nước màu Vàng / Nước cam"
            />
          </div>
        </div>

        {/* Top-Left Floating Stage Status Tag */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-200 text-[11px] font-mono text-gray-700 shadow-sm space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              <span className="font-bold text-gray-900">
                {progress < 0.15
                  ? 'Giai đoạn 1: Cốc nghiêng rót...'
                  : progress < 0.92
                  ? 'Giai đoạn 2: Nước chảy & Mực nước dâng...'
                  : 'Giai đoạn 3: Rót đầy bình chứa'}
              </span>
            </div>
            <div className="text-[10px] text-gray-500">
              Mực nước: <strong className="text-orange-600 font-bold">{currentMetrics.currentH.toFixed(2)} cm</strong> / {maxHeight} cm ({(currentMetrics.fillFraction * 100).toFixed(0)}%)
            </div>
          </div>
        </div>

        {/* Bottom Floating Interactive Metrics HUD */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl border border-gray-200 text-xs shadow-sm pointer-events-auto flex items-center gap-3">
            <div>
              <div className="text-[10px] text-gray-500 uppercase font-bold">Diện tích đáy (S = πr²)</div>
              <div className="font-mono font-bold text-gray-900 text-xs sm:text-sm">
                {currentMetrics.baseArea.toFixed(2)} cm²
              </div>
            </div>
            <div className="w-px h-7 bg-gray-200" />
            <div>
              <div className="text-[10px] text-gray-500 uppercase font-bold">Chiều cao cột nước (h)</div>
              <div className="font-mono font-bold text-orange-600 text-xs sm:text-sm">
                {currentMetrics.currentH.toFixed(2)} cm
              </div>
            </div>
            <div className="w-px h-7 bg-gray-200" />
            <div>
              <div className="text-[10px] text-gray-500 uppercase font-bold">Thể tích tức thời (V)</div>
              <div className="font-mono font-bold text-emerald-700 text-xs sm:text-sm">
                {currentMetrics.currentVolume.toFixed(2)} ml
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl border border-gray-200 text-xs shadow-sm pointer-events-auto flex items-center gap-2 font-mono text-[11px] text-gray-700">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Dung tích tối đa: <strong className="text-gray-900 font-bold">{currentMetrics.maxVolume.toFixed(1)} ml</strong> ({currentMetrics.maxVolumePi.toFixed(1)}π)</span>
          </div>
        </div>
      </div>

      {/* Bottom Timeline Scrubber & Primary Controls */}
      <div className="p-3 sm:p-4 bg-white border-t border-gray-200 space-y-3">
        {/* Timeline Scrubber */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span className="flex items-center gap-1.5 font-medium">
              <span>Tiến trình rót chất lỏng:</span>
              <strong className="text-orange-600 font-mono font-bold">{(progress * 100).toFixed(0)}%</strong>
            </span>
            <span className="font-mono text-[11px] text-gray-500">
              {progress < 0.15 ? 'Nghiêng cốc' : progress < 0.92 ? 'Đang rót nước...' : 'Hoàn tất'}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.005"
            value={progress}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setProgress(val);
              progressRef.current = val;
            }}
            className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>

        {/* Primary Action Button Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Left: Play/Pause, Reset, Replay */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="liquid-btn-play-pause"
              onClick={handleTogglePlay}
              className={`px-4 py-2 text-xs font-black rounded-xl border transition-all cursor-pointer min-h-[38px] flex items-center gap-2 shadow-xs ${
                isPlaying
                  ? 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
                  : 'bg-orange-500 border-orange-600 text-white hover:bg-orange-600 shadow-xs'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>TẠM DỪNG</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current text-white" />
                  <span>{progress >= 1 ? 'CHẠY LẠI' : 'BẮT ĐẦU RÓT'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              id="liquid-btn-reset"
              onClick={handleReset}
              className="px-3.5 py-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl border border-gray-200 transition-all cursor-pointer min-h-[38px] flex items-center gap-1.5"
              title="Đặt lại về vị trí ban đầu"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
              <span>ĐẶT LẠI</span>
            </button>

            <button
              type="button"
              id="liquid-btn-replay"
              onClick={handleReplay}
              className="px-3.5 py-2 text-xs font-bold bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl border border-orange-200 transition-all cursor-pointer min-h-[38px] flex items-center gap-1.5"
              title="Phát lại từ đầu"
            >
              <RefreshCw className="w-3.5 h-3.5 text-orange-600" />
              <span>CHƠI LẠI</span>
            </button>
          </div>

          {/* Speed selector */}
          <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200">
            <span className="text-[10px] text-gray-500 px-1 font-mono">Tốc độ:</span>
            {[0.5, 1, 2].map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer min-h-[28px] ${
                  playbackSpeed === spd
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Conditional Tab Body: Simulation Controls vs Prediction Experiment vs Real-World */}
        {activeTab === 'simulation' && (
          <>
            {/* Live Container Geometry Dimensions Sliders (r, h) */}
            <div className="pt-2 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Radius Slider */}
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700 font-medium flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-orange-500" />
                    <span>Bán kính đáy bình (r):</span>
                  </span>
                  <span className="font-mono font-bold text-orange-700 bg-white px-2 py-0.5 rounded border border-gray-200 text-xs">
                    {radius} cm
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="6"
                  step="0.5"
                  value={radius}
                  onChange={(e) => setRadius(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              {/* Height Slider */}
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700 font-medium flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-amber-600" />
                    <span>Chiều cao tối đa bình (h):</span>
                  </span>
                  <span className="font-mono font-bold text-amber-800 bg-white px-2 py-0.5 rounded border border-gray-200 text-xs">
                    {maxHeight} cm
                  </span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="14"
                  step="1"
                  value={maxHeight}
                  onChange={(e) => setMaxHeight(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>

            {/* Mathematical Concept Insight Callout */}
            <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200 text-xs space-y-1.5 text-gray-800">
              <div className="font-bold text-orange-800 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                <span>Quy luật Toán học cốt lõi (Toán 9 - Thể tích hình trụ):</span>
              </div>
              <div className="text-[11px] text-gray-700 leading-relaxed space-y-1">
                <div className="flex items-center gap-1.5">
                  <span>1. Thể tích hình trụ:</span>
                  <MathFormula formula="V = S_{\text{đáy}} \cdot h = \pi r^2 h" className="text-orange-900 font-bold" />
                </div>
                <p>
                  2. Mực nước <strong className="text-orange-700 font-mono">h</strong> tỉ lệ thuận bậc nhất với thể tích <strong className="text-emerald-700 font-mono">V</strong>. Khi bán kính <strong className="text-amber-800 font-mono">r</strong> tăng 2 lần, diện tích đáy tăng 4 lần ($2^2$), nên cùng một thể tích rót vào thì chiều cao mực nước chỉ dâng bằng $1/4$ lúc đầu!
                </p>
              </div>
            </div>
          </>
        )}

        {/* 2. Prediction Experiment Tab */}
        {activeTab === 'prediction' && (
          <div className="pt-2 border-t border-gray-200 space-y-3">
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-xs text-emerald-900 uppercase tracking-wider">
                    Thử Thách Dự Đoán Mực Nước
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono font-bold">
                  Toán Thực Nghiệm
                </span>
              </div>

              <p className="text-xs text-gray-700">
                Cho bình hình trụ bán kính đáy <strong className="text-orange-700 font-mono">r = {radius} cm</strong>.
                Nếu đổ một lượng nước <strong className="text-emerald-700 font-mono">V = {targetVolumeInput} ml (cm³)</strong> vào bình, bạn dự đoán mực nước dâng cao bao nhiêu cm?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Target Volume Slider */}
                <div className="p-2.5 rounded-xl bg-white border border-gray-200 space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-700">
                    <span>Lượng nước cần đổ (V):</span>
                    <span className="font-mono font-bold text-emerald-700">{targetVolumeInput} ml</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max={Math.min(500, Math.floor(Math.PI * radius * radius * maxHeight))}
                    step="10"
                    value={targetVolumeInput}
                    onChange={(e) => {
                      setTargetVolumeInput(parseInt(e.target.value, 10));
                      setHasPredicted(false);
                    }}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Student Prediction Input */}
                <div className="p-2.5 rounded-xl bg-white border border-gray-200 space-y-1">
                  <label className="flex items-center justify-between text-xs text-gray-700">
                    <span>Dự đoán của bạn (h dự đoán):</span>
                    <span className="text-[10px] text-gray-500 font-mono">cm</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      max={maxHeight}
                      value={predictedH}
                      onChange={(e) => {
                        setPredictedH(e.target.value);
                        setHasPredicted(false);
                      }}
                      className="w-full px-3 py-1 bg-gray-50 border border-gray-300 rounded-lg text-xs font-mono font-bold text-gray-900 focus:outline-none focus:border-orange-500"
                      placeholder="VD: 5.2"
                    />
                    <button
                      type="button"
                      onClick={handleRunPredictionTest}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-all shrink-0 cursor-pointer shadow-xs"
                    >
                      Đổ &amp; Kiểm chứng
                    </button>
                  </div>
                </div>
              </div>

              {/* Feedback Banner */}
              {hasPredicted && predictionFeedback && (
                <div
                  className={`p-3 rounded-xl border text-xs space-y-1.5 animate-fadeIn ${
                    predictionFeedback.isCorrect
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                      : 'bg-amber-100 border-amber-400 text-amber-900'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5">
                      {predictionFeedback.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <HelpCircle className="w-4 h-4 text-amber-600" />
                      )}
                      <span>
                        {predictionFeedback.isCorrect
                          ? 'Xuất sắc! Dự đoán rất chính xác (±0.4 cm)'
                          : 'Chưa hoàn toàn khớp, hãy đối chiếu công thức!'}
                      </span>
                    </span>
                    <span className="font-mono text-[11px]">
                      Sai số: {predictionFeedback.diff.toFixed(2)} cm
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-gray-800 flex items-center gap-2 flex-wrap">
                    <span>Mực nước tính theo toán học:</span>
                    <MathFormula
                      formula={`h = \\frac{V}{\\pi r^2} = \\frac{${targetVolumeInput}}{\\pi \\times ${radius}^2} = ${predictionFeedback.actualH.toFixed(2)}\\text{ cm}`}
                      className="text-gray-900 font-bold"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. Real-World Applications Tab */}
        {activeTab === 'realworld' && (
          <div className="pt-2 border-t border-gray-200 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Card 1: Tân Á Bồn Nước Inox 1500L */}
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-orange-600" />
                    <span className="font-bold text-xs text-gray-900">Bồn Inox Tân Á Đại Thành</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-orange-100 border border-orange-200 text-orange-800 font-mono font-bold">
                    1500 Lít
                  </span>
                </div>
                <p className="text-[11px] text-gray-700 leading-relaxed">
                  Bồn chứa dung tích <strong>V = 1500 lít = 1.5 m³</strong>. Nếu đường kính bồn là <strong>d = 1.2 m</strong> (bán kính <strong>r = 0.6 m</strong>), thì chiều cao <strong>h</strong> thân bồn là:
                </p>
                <div className="p-2 rounded-xl bg-white border border-gray-200 text-[11px] font-mono text-orange-700">
                  <MathFormula formula="h = \frac{V}{\pi r^2} = \frac{1.5}{\pi \times 0.6^2} \approx 1.33\text{ m}" />
                </div>
              </div>

              {/* Card 2: Lon Nước Ngọt 330ml */}
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-xs text-gray-900">Lon Nước Ngọt Tiêu Chuẩn</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 border border-blue-200 text-blue-800 font-mono font-bold">
                    330 ml
                  </span>
                </div>
                <p className="text-[11px] text-gray-700 leading-relaxed">
                  Lon nước có thể tích <strong>V = 330 cm³ (330 ml)</strong> và bán kính đáy <strong>r ≈ 3.25 cm</strong>. Chiều cao tiêu chuẩn <strong>h</strong> của vỏ lon được tính bằng:
                </p>
                <div className="p-2 rounded-xl bg-white border border-gray-200 text-[11px] font-mono text-blue-700">
                  <MathFormula formula="h = \frac{330}{\pi \times 3.25^2} \approx \frac{330}{33.18} \approx 9.94\text{ cm}" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiquidSimulation;
