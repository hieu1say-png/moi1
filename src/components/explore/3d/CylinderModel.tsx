/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * REUSABLE 3D CYLINDER GEOMETRY COMPONENT (THREE.JS)
 *
 * 1. EXPLORE MODE (Khám phá 3D tương tác):
 *    - Real WebGL 3D Geometry (No distortion)
 *    - Grade 9 Standard Notation: O, O', r, d=2r, h=OO', l=AA'
 *
 * 2. FORMATION MODE (Sự tạo thành hình trụ):
 *    - Generating Rectangle OO'A'A sweeps 0° → 360° around axis OO'
 *    - Post-animation completion message: "Hình chữ nhật quay quanh một cạnh tạo thành hình trụ."
 *
 * 3. NET / UNFOLDING MODE (Khai triển mặt hình trụ):
 *    - Sequence: Hình trụ → tách 2 đáy → mở/trải phẳng mặt xung quanh → Hình chữ nhật (2πr × h) + 2 hình tròn đáy (bán kính r).
 *    - Mathematical Dimensions: Width = 2πr, Height = h, Bases = r.
 *    - Live Formulas: Sxq = 2πrh, Stp = 2πrh + 2πr²
 *    - Controls: [BẮT ĐẦU / START], [TẠM DỪNG / PAUSE], [CHƠI LẠI / REPLAY], [ĐẶT LẠI / RESET]
 */

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  RotateCw,
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move,
  Sparkles,
  CheckCircle2,
  Compass,
  Layers,
  FoldHorizontal,
  HelpCircle,
  ArrowRight,
  Sliders,
  Check,
  ChevronRight,
  Droplets,
  Award,
  Trophy,
  Zap,
  RefreshCw
} from 'lucide-react';
import { MathFormula, MathText } from '../../common/MathFormula';
import { OrbitRotationController } from './OrbitRotationController';

export type ExplorationModeType =
  | 'explore'
  | 'formation'
  | 'net'
  | 'liquid'
  | 'challenge'
  | 'section'
  | 'volume_compare'
  | 'misconception';

export interface CylinderModelProps {
  radius: number; // in cm (1 - 10)
  height: number; // in cm (2 - 15)
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

interface ProjectedLabel {
  id: string;
  name: string;
  subtext?: string;
  x: number;
  y: number;
  visible: boolean;
  color: string;
  badgeBg: string;
}

export const CylinderModel: React.FC<CylinderModelProps> = ({
  radius = 4,
  height = 8,
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
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const rotationControllerRef = useRef<OrbitRotationController>(
    new OrbitRotationController({ moduleName: 'CYLINDER', pauseOnInteraction: true, resumeDelay: 1500 })
  );

  // 360 Spin state
  const [internalIsSpinning, setInternalIsSpinning] = useState(false);

  // 1. Formation Animation State (0° to 360° Sweep)
  const [formationAngle, setFormationAngle] = useState<number>(0);
  const [isFormationPlaying, setIsFormationPlaying] = useState<boolean>(false);
  const [formationCompleted, setFormationCompleted] = useState<boolean>(false);
  const formationAngleRef = useRef<number>(0);
  const isFormationPlayingRef = useRef<boolean>(false);
  const lastFormationTimeRef = useRef<number | null>(null);

  // 2. Net / Unfolding Animation State (0.0 to 1.0)
  const [unfoldProgress, setUnfoldProgress] = useState<number>(0);
  const [isUnfoldPlaying, setIsUnfoldPlaying] = useState<boolean>(false);
  const [unfoldCompleted, setUnfoldCompleted] = useState<boolean>(false);
  const unfoldProgressRef = useRef<number>(0);
  const isUnfoldPlayingRef = useRef<boolean>(false);
  const lastUnfoldTimeRef = useRef<number | null>(null);

  // 3. Liquid Water Level State (cm)
  const [waterLevel, setWaterLevel] = useState<number>(() => Math.max(1, height * 0.65));
  const [isLiquidPouring, setIsLiquidPouring] = useState<boolean>(false);
  const waterLevelRef = useRef<number>(Math.max(1, height * 0.65));

  // Sync auto rotate state to rotation controller
  useEffect(() => {
    rotationControllerRef.current.setAutoRotate(isAutoRotating);
  }, [isAutoRotating]);

  // Pause rotation when lesson animation is playing
  useEffect(() => {
    const isLessonAnimating = isFormationPlaying || isUnfoldPlaying || isLiquidPouring;
    rotationControllerRef.current.setPausedByLesson(isLessonAnimating);
  }, [isFormationPlaying, isUnfoldPlaying, isLiquidPouring]);

  // 5. Challenge Mode State (Grade 9 Geometry Mastery Quiz)
  const [challengeIndex, setChallengeIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [challengeScore, setChallengeScore] = useState<number>(0);

  const challengeQuestions = useMemo(() => [
    {
      id: 1,
      title: 'Câu 1: Tính diện tích xung quanh',
      question: 'Một hình trụ có bán kính đáy $r = 3\\text{ cm}$ và chiều cao $h = 7\\text{ cm}$. Diện tích xung quanh $S_{xq}$ của hình trụ bằng bao nhiêu?',
      options: [
        { text: '21\\pi\\text{ cm}^2', isCorrect: false },
        { text: '42\\pi\\text{ cm}^2', isCorrect: true },
        { text: '63\\pi\\text{ cm}^2', isCorrect: false },
        { text: '84\\pi\\text{ cm}^2', isCorrect: false }
      ],
      explanation: 'Áp dụng công thức $S_{xq} = 2\\pi r h = 2\\pi \\times 3 \\times 7 = 42\\pi\\text{ cm}^2 \\approx 131.95\\text{ cm}^2$.',
      targetR: 3,
      targetH: 7
    },
    {
      id: 2,
      title: 'Câu 2: So sánh đường sinh và chiều cao',
      question: 'Trong một hình trụ bất kỳ, mối liên hệ giữa độ dài đường sinh $l$ và chiều cao $h$ là gì?',
      options: [
        { text: 'l = h', isCorrect: true },
        { text: 'l = \\sqrt{h^2 + r^2}', isCorrect: false },
        { text: 'l = 2h', isCorrect: false },
        { text: 'l > h', isCorrect: false }
      ],
      explanation: 'Trong hình trụ, mọi đường sinh đều song song với trục quay và có độ dài bằng khoảng cách giữa 2 đáy, do đó $l = h$. (Lưu ý: $l = \\sqrt{h^2 + r^2}$ là công thức của hình nón).',
      targetR: 4,
      targetH: 8
    },
    {
      id: 3,
      title: 'Câu 3: Quy luật biến thiên thể tích',
      question: 'Nếu tăng bán kính đáy $r$ lên gấp đôi ($2r$) và giữ nguyên chiều cao $h$, thì thể tích $V$ của hình trụ tăng lên gấp mấy lần?',
      options: [
        { text: '2\\text{ lần}', isCorrect: false },
        { text: '4\\text{ lần}', isCorrect: true },
        { text: '8\\text{ lần}', isCorrect: false },
        { text: 'Không đổi', isCorrect: false }
      ],
      explanation: 'Thể tích ban đầu $V_1 = \\pi r^2 h$. Khi bán kính tăng 2 lần: $V_2 = \\pi (2r)^2 h = 4\\pi r^2 h = 4V_1$. Vậy thể tích tăng gấp 4 lần!',
      targetR: 6,
      targetH: 8
    }
  ], []);

  useEffect(() => {
    waterLevelRef.current = Math.min(height, Math.max(0, waterLevel));
  }, [waterLevel, height]);

  // Keep waterLevel in sync with height changes
  useEffect(() => {
    setWaterLevel((prev) => Math.min(height, Math.max(0, prev)));
  }, [height]);

  // 3D Projected Screen Labels State
  const [labels, setLabels] = useState<ProjectedLabel[]>([]);
  const lastLabelsRef = useRef<ProjectedLabel[]>([]);

  // Mathematical calculations
  const mathCalculations = useMemo(() => {
    const pi = Math.PI;
    const perimeter = 2 * pi * radius;
    const baseArea = pi * radius * radius;
    const sxq = 2 * pi * radius * height;
    const stp = sxq + 2 * baseArea;
    const volume = baseArea * height;

    return {
      perimeter: perimeter.toFixed(2),
      perimeterPi: (2 * radius).toFixed(1),
      baseArea: baseArea.toFixed(2),
      baseAreaPi: (radius * radius).toFixed(1),
      sxq: sxq.toFixed(2),
      sxqPi: (2 * radius * height).toFixed(1),
      stp: stp.toFixed(2),
      stpPi: (2 * radius * height + 2 * radius * radius).toFixed(1),
      volume: volume.toFixed(2),
      volumePi: (radius * radius * height).toFixed(1)
    };
  }, [radius, height]);

  // Camera fit
  const fitCameraToModel = useCallback((smooth = false) => {
    if (!cameraRef.current || !controlsRef.current || !groupRef.current) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    const group = groupRef.current;

    const box = new THREE.Box3().setFromObject(group);
    if (box.isEmpty()) return;

    const center = new THREE.Vector3(0, 0, 0);
    box.getCenter(center);

    const size = new THREE.Vector3();
    box.getSize(size);

    const fov = (camera.fov * Math.PI) / 180;
    const aspect = camera.aspect || 1;

    const heightDistance = size.y / 2 / Math.tan(fov / 2);
    const widthDistance = size.x / 2 / (Math.tan(fov / 2) * aspect);
    const radiusSpan = Math.sqrt(size.x * size.x + size.z * size.z) / 2;
    const depthDistance = radiusSpan / (Math.tan(fov / 2) * Math.min(1, aspect));

    const maxFitDistance = Math.max(heightDistance, widthDistance, depthDistance);
    const presentationFillFactor = explorationMode === 'net' ? 0.65 : 0.75;
    const requiredDistance = maxFitDistance / presentationFillFactor;

    camera.near = Math.max(0.1, requiredDistance / 40);
    camera.far = Math.max(250, requiredDistance * 12);
    camera.updateProjectionMatrix();

    let currentDir = new THREE.Vector3()
      .subVectors(camera.position, controls.target)
      .normalize();
    if (currentDir.lengthSq() < 0.1 || isNaN(currentDir.x)) {
      currentDir = new THREE.Vector3(1.2, 0.9, 1.4).normalize();
    }

    const targetPos = center.clone().add(currentDir.multiplyScalar(requiredDistance));

    if (smooth) {
      const startPos = camera.position.clone();
      const startTarget = controls.target.clone();
      const startTime = performance.now();
      const duration = 400;

      const animateCam = (now: number) => {
        const t = Math.min(1, (now - startTime) / duration);
        const ease = t * (2 - t);
        camera.position.lerpVectors(startPos, targetPos, ease);
        controls.target.lerpVectors(startTarget, center, ease);
        controls.update();
        if (t < 1) {
          requestAnimationFrame(animateCam);
        }
      };
      requestAnimationFrame(animateCam);
    } else {
      camera.position.copy(targetPos);
      controls.target.copy(center);
      controls.minDistance = Math.max(2, requiredDistance * 0.35);
      controls.maxDistance = requiredDistance * 3.5;
      controls.update();
    }
  }, [explorationMode]);

  // Formation Animation Handlers
  const handleStartFormation = useCallback(() => {
    if (formationAngleRef.current >= Math.PI * 2 - 0.01) {
      formationAngleRef.current = 0;
      setFormationAngle(0);
      setFormationCompleted(false);
    }
    isFormationPlayingRef.current = true;
    setIsFormationPlaying(true);
    lastFormationTimeRef.current = performance.now();
  }, []);

  const handlePauseFormation = useCallback(() => {
    isFormationPlayingRef.current = false;
    setIsFormationPlaying(false);
    lastFormationTimeRef.current = null;
  }, []);

  const handleReplayFormation = useCallback(() => {
    formationAngleRef.current = 0;
    setFormationAngle(0);
    setFormationCompleted(false);
    isFormationPlayingRef.current = true;
    setIsFormationPlaying(true);
    lastFormationTimeRef.current = performance.now();
  }, []);

  const handleResetFormation = useCallback(() => {
    formationAngleRef.current = 0;
    setFormationAngle(0);
    setFormationCompleted(false);
    isFormationPlayingRef.current = false;
    setIsFormationPlaying(false);
    lastFormationTimeRef.current = null;
  }, []);

  // Net / Unfolding Animation Handlers
  const handleStartUnfold = useCallback(() => {
    if (unfoldProgressRef.current >= 0.99) {
      unfoldProgressRef.current = 0;
      setUnfoldProgress(0);
      setUnfoldCompleted(false);
    }
    isUnfoldPlayingRef.current = true;
    setIsUnfoldPlaying(true);
    lastUnfoldTimeRef.current = performance.now();
  }, []);

  const handlePauseUnfold = useCallback(() => {
    isUnfoldPlayingRef.current = false;
    setIsUnfoldPlaying(false);
    lastUnfoldTimeRef.current = null;
  }, []);

  const handleReplayUnfold = useCallback(() => {
    unfoldProgressRef.current = 0;
    setUnfoldProgress(0);
    setUnfoldCompleted(false);
    isUnfoldPlayingRef.current = true;
    setIsUnfoldPlaying(true);
    lastUnfoldTimeRef.current = performance.now();
  }, []);

  const handleResetUnfold = useCallback(() => {
    unfoldProgressRef.current = 0;
    setUnfoldProgress(0);
    setUnfoldCompleted(false);
    isUnfoldPlayingRef.current = false;
    setIsUnfoldPlaying(false);
    lastUnfoldTimeRef.current = null;
  }, []);

  // 360 Spin Action
  const trigger360Spin = useCallback(() => {
    setInternalIsSpinning(true);
    rotationControllerRef.current.trigger360Spin(1600, () => {
      setInternalIsSpinning(false);
    });
    if (onSpin360) onSpin360();
  }, [onSpin360]);

  const handleReplay = useCallback(() => {
    if (explorationMode === 'formation') {
      handleReplayFormation();
    } else if (explorationMode === 'net') {
      handleReplayUnfold();
    } else {
      if (groupRef.current) {
        groupRef.current.rotation.y = 0;
      }
      fitCameraToModel(true);
      if (onResetReplay) onResetReplay();
      trigger360Spin();
    }
  }, [
    explorationMode,
    handleReplayFormation,
    handleReplayUnfold,
    fitCameraToModel,
    onResetReplay,
    trigger360Spin
  ]);

  // Mode change handler
  const setMode = useCallback(
    (mode: ExplorationModeType) => {
      if (onExplorationModeChange) {
        onExplorationModeChange(mode);
      }
      if (mode === 'formation') {
        formationAngleRef.current = 0;
        setFormationAngle(0);
        setFormationCompleted(false);
        isFormationPlayingRef.current = false;
        setIsFormationPlaying(false);
      } else if (mode === 'net') {
        unfoldProgressRef.current = 0;
        setUnfoldProgress(0);
        setUnfoldCompleted(false);
        isUnfoldPlayingRef.current = false;
        setIsUnfoldPlaying(false);
      }
    },
    [onExplorationModeChange]
  );

  // Initialize Three.js WebGL Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const heightPx = container.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 1000);
    camera.position.set(13, 10, 17);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enableRotate = true;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN
    };
    controls.minDistance = 4;
    controls.maxDistance = 80;
    controls.maxPolarAngle = Math.PI - 0.05;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // Attach to unified OrbitRotationController
    rotationControllerRef.current.attach(controls, camera);

    // Lighting setup
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(15, 20, 15);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x60a5fa, 1.2);
    fillLight.position.set(-15, 10, -15);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xf59e0b, 0.8);
    rimLight.position.set(0, -15, -10);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const gridHelper = new THREE.GridHelper(40, 40, 0xcbd5e1, 0xe2e8f0);
    gridHelper.position.y = -8;
    scene.add(gridHelper);

    const cylinderGroup = new THREE.Group();
    scene.add(cylinderGroup);
    groupRef.current = cylinderGroup;

    // Responsive resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const entry = entries[0];
      const newWidth = entry.contentRect.width;
      const newHeight = entry.contentRect.height;
      if (newWidth > 0 && newHeight > 0 && cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = newWidth / newHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(newWidth, newHeight);
        fitCameraToModel(false);
      }
    });
    resizeObserver.observe(container);

    // Animation & 3D Screen Projection Loop
    const animate = (now: number) => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      controls.update();

      // A. Formation Sweep Animation
      if (isFormationPlayingRef.current) {
        if (lastFormationTimeRef.current !== null) {
          const delta = (now - lastFormationTimeRef.current) / 1000;
          const sweepSpeed = (Math.PI * 2) / 3.6;
          let nextAngle = formationAngleRef.current + sweepSpeed * delta;

          if (nextAngle >= Math.PI * 2) {
            nextAngle = Math.PI * 2;
            isFormationPlayingRef.current = false;
            setIsFormationPlaying(false);
            setFormationCompleted(true);
            if (onFormationComplete) {
              onFormationComplete('Hình chữ nhật quay quanh một cạnh tạo thành hình trụ.');
            }
          }
          formationAngleRef.current = nextAngle;
          setFormationAngle(nextAngle);
        }
        lastFormationTimeRef.current = now;
      }

      // B. Net / Unfolding Animation
      if (isUnfoldPlayingRef.current) {
        if (lastUnfoldTimeRef.current !== null) {
          const delta = (now - lastUnfoldTimeRef.current) / 1000;
          const unfoldSpeed = 1 / 3.2; // Full unfold in 3.2s
          let nextProg = unfoldProgressRef.current + unfoldSpeed * delta;

          if (nextProg >= 1.0) {
            nextProg = 1.0;
            isUnfoldPlayingRef.current = false;
            setIsUnfoldPlaying(false);
            setUnfoldCompleted(true);
            if (onUnfoldComplete) {
              onUnfoldComplete(
                'Khai triển hình trụ hoàn tất: 1 hình chữ nhật (2πr × h) và 2 hình tròn đáy (r).'
              );
            }
          }
          unfoldProgressRef.current = nextProg;
          setUnfoldProgress(nextProg);
        }
        lastUnfoldTimeRef.current = now;
      }

      // Update rotation controller (handles OrbitControls autoRotate, damping, and 360 spin)
      rotationControllerRef.current.update(now);

      renderer.render(scene, camera);

      // Project 3D coordinates to Screen UI Labels
      if (containerRef.current && cameraRef.current && groupRef.current) {
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        const curCamera = cameraRef.current;
        const curGroup = groupRef.current;

        const halfH = height / 2;
        const rotY = curGroup.rotation.y;
        const currentSweep = explorationMode === 'formation' ? formationAngleRef.current : rotY;

        const project = (pos: THREE.Vector3) => {
          const v = pos.clone().project(curCamera);
          return {
            x: ((v.x + 1) * w) / 2,
            y: ((-v.y + 1) * h) / 2,
            visible: v.z < 1
          };
        };

        const activeLabels: ProjectedLabel[] = [];

        if (explorationMode === 'net') {
          // ================= NET / UNFOLDING LABELS =================
          const p = unfoldProgressRef.current;
          const rectW = 2 * Math.PI * radius;

          // Top base circle label
          const topDiskPos = new THREE.Vector3(0, halfH + radius * Math.sin((p * Math.PI) / 2), radius * Math.cos((p * Math.PI) / 2));
          const pTopDisk = project(topDiskPos);
          activeLabels.push({
            id: 'net_top_disk',
            name: 'Đáy trên (r)',
            subtext: `r = ${radius}cm (S = ${mathCalculations.baseArea}cm²)`,
            x: pTopDisk.x,
            y: pTopDisk.y,
            visible: pTopDisk.visible,
            color: 'text-orange-600',
            badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
          });

          // Bottom base circle label
          const botDiskPos = new THREE.Vector3(0, -halfH - radius * Math.sin((p * Math.PI) / 2), radius * Math.cos((p * Math.PI) / 2));
          const pBotDisk = project(botDiskPos);
          activeLabels.push({
            id: 'net_bot_disk',
            name: 'Đáy dưới (r)',
            subtext: `r = ${radius}cm (S = ${mathCalculations.baseArea}cm²)`,
            x: pBotDisk.x,
            y: pBotDisk.y,
            visible: pBotDisk.visible,
            color: 'text-orange-600',
            badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
          });

          // Unrolled rectangle width label (2πr)
          const pRectWidth = project(new THREE.Vector3(0, -halfH - 0.8, 0));
          activeLabels.push({
            id: 'net_width',
            name: `Chiều rộng = 2πr = ${mathCalculations.perimeter} cm`,
            subtext: 'Chu vi đường tròn đáy',
            x: pRectWidth.x,
            y: pRectWidth.y,
            visible: pRectWidth.visible,
            color: 'text-blue-600',
            badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
          });

          // Height label (h)
          const pRectHeight = project(new THREE.Vector3(p > 0.8 ? rectW / 2 + 1 : radius + 0.8, 0, 0));
          activeLabels.push({
            id: 'net_height',
            name: `Chiều cao h = ${height} cm`,
            subtext: "Độ dài đường sinh AA'",
            x: pRectHeight.x,
            y: pRectHeight.y,
            visible: pRectHeight.visible,
            color: 'text-amber-700',
            badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
          });
        } else if (explorationMode === 'formation') {
          // ================= FORMATION LABELS =================
          const topCenter3D = new THREE.Vector3(0, halfH, 0);
          const bottomCenter3D = new THREE.Vector3(0, -halfH, 0);
          const topA3D = new THREE.Vector3(radius * Math.cos(currentSweep), halfH, radius * Math.sin(currentSweep));
          const bottomA3D = new THREE.Vector3(radius * Math.cos(currentSweep), -halfH, radius * Math.sin(currentSweep));
          const genMid3D = new THREE.Vector3(radius * Math.cos(currentSweep), 0, radius * Math.sin(currentSweep));

          const pTopCenter = project(topCenter3D);
          const pBottomCenter = project(bottomCenter3D);
          const pTopA = project(topA3D);
          const pBottomA = project(bottomA3D);
          const pGenMid = project(genMid3D);

          activeLabels.push({
            id: 'form_top_center',
            name: "O'",
            subtext: 'Trục cố định',
            x: pTopCenter.x,
            y: pTopCenter.y,
            visible: pTopCenter.visible,
            color: 'text-amber-700',
            badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
          });

          activeLabels.push({
            id: 'form_bottom_center',
            name: 'O',
            subtext: 'Trục cố định',
            x: pBottomCenter.x,
            y: pBottomCenter.y,
            visible: pBottomCenter.visible,
            color: 'text-amber-700',
            badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
          });

          activeLabels.push({
            id: 'form_gen_a_prime',
            name: "A'",
            subtext: `r = ${radius}cm`,
            x: pTopA.x,
            y: pTopA.y,
            visible: pTopA.visible,
            color: 'text-blue-600',
            badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
          });

          activeLabels.push({
            id: 'form_gen_a',
            name: 'A',
            subtext: 'Đỉnh quét',
            x: pBottomA.x,
            y: pBottomA.y,
            visible: pBottomA.visible,
            color: 'text-blue-600',
            badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
          });

          activeLabels.push({
            id: 'form_gen_line',
            name: "Đường sinh AA'",
            subtext: `l = h = ${height}cm`,
            x: pGenMid.x,
            y: pGenMid.y,
            visible: pGenMid.visible,
            color: 'text-blue-600',
            badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
          });
        } else {
          // ================= STANDARD EXPLORE & EXPERIMENT LABELS =================
          const topCenter3D = new THREE.Vector3(0, halfH, 0);
          const bottomCenter3D = new THREE.Vector3(0, -halfH, 0);
          const radiusMid3D = new THREE.Vector3(radius / 2, -halfH, 0);
          const heightMid3D = new THREE.Vector3(0, 0, 0);
          const generatorMid3D = new THREE.Vector3(radius, 0, 0);

          const pTopCenter = project(topCenter3D);
          const pBottomCenter = project(bottomCenter3D);
          const pRadiusMid = project(radiusMid3D);
          const pHeightMid = project(heightMid3D);
          const pGenMid = project(generatorMid3D);

          if (activeComponentId === 'all' || activeComponentId === 'base' || activeComponentId === 'height' || activeComponentId === 'axis') {
            activeLabels.push({
              id: 'top_center',
              name: "O'",
              subtext: 'Tâm đáy trên',
              x: pTopCenter.x,
              y: pTopCenter.y,
              visible: pTopCenter.visible,
              color: 'text-blue-600',
              badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
            });
          }

          if (activeComponentId === 'all' || activeComponentId === 'base' || activeComponentId === 'radius' || activeComponentId === 'height' || activeComponentId === 'axis') {
            activeLabels.push({
              id: 'bottom_center',
              name: 'O',
              subtext: 'Tâm đáy dưới',
              x: pBottomCenter.x,
              y: pBottomCenter.y,
              visible: pBottomCenter.visible,
              color: 'text-blue-600',
              badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
            });
          }

          if (activeComponentId === 'all' || activeComponentId === 'radius') {
            activeLabels.push({
              id: 'radius_r',
              name: `r = ${radius}cm`,
              subtext: 'Bán kính OA',
              x: pRadiusMid.x,
              y: pRadiusMid.y,
              visible: pRadiusMid.visible,
              color: 'text-emerald-700',
              badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
            });
          }

          if (activeComponentId === 'all' || activeComponentId === 'height' || activeComponentId === 'axis') {
            activeLabels.push({
              id: 'height_h',
              name: activeComponentId === 'axis' ? "Trục OO'" : `h = ${height}cm`,
              subtext: activeComponentId === 'axis' ? 'Trục quay' : "Chiều cao OO'",
              x: pHeightMid.x,
              y: pHeightMid.y,
              visible: pHeightMid.visible,
              color: 'text-amber-700',
              badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
            });
          }

          if (activeComponentId === 'all' || activeComponentId === 'generator') {
            activeLabels.push({
              id: 'gen_l',
              name: `l = ${height}cm`,
              subtext: "Đường sinh AA' (l = h)",
              x: pGenMid.x,
              y: pGenMid.y,
              visible: pGenMid.visible,
              color: 'text-orange-600',
              badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
            });
          }
        }

        const prev = lastLabelsRef.current;
        let changed = prev.length !== activeLabels.length;
        if (!changed) {
          for (let i = 0; i < activeLabels.length; i++) {
            const a = activeLabels[i];
            const b = prev[i];
            if (
              a.id !== b.id ||
              a.visible !== b.visible ||
              Math.abs(a.x - b.x) > 0.6 ||
              Math.abs(a.y - b.y) > 0.6
            ) {
              changed = true;
              break;
            }
          }
        }

        if (changed) {
          lastLabelsRef.current = activeLabels;
          setLabels(activeLabels);
        }
      }
    };
    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      rotationControllerRef.current.detach();
      controls.dispose();
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [fitCameraToModel]);

  // -------------------------------------------------------------
  // 3D GEOMETRY CONSTRUCTION ENGINE (MATHEMATICAL ACCURACY)
  // -------------------------------------------------------------
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    if (explorationMode !== 'explore') {
      group.rotation.y = 0;
    }

    while (group.children.length > 0) {
      const obj = group.children[0] as THREE.Mesh;
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
      group.remove(obj);
    }

    const radialSegments = 48;
    const halfH = height / 2;

    // ==========================================================
    // CASE 1: NET / UNFOLDING 3D GEOMETRY (KHAI TRIỂN HÌNH TRỤ)
    // ==========================================================
    if (explorationMode === 'net') {
      const u = unfoldProgress; // 0 (closed) -> 1 (flat rectangle)
      const N_s = 64;
      const N_y = 16;
      const positions: number[] = [];
      const uvs: number[] = [];
      const indices: number[] = [];

      // Continuous unrolling parametric surface
      for (let j = 0; j <= N_y; j++) {
        const y = -halfH + (j / N_y) * height;
        const v_coord = j / N_y;
        for (let i = 0; i <= N_s; i++) {
          const s = -Math.PI + (i / N_s) * (2 * Math.PI);
          const u_coord = i / N_s;

          const alpha = 1 - 0.999 * u;
          const R_p = radius / alpha;
          const theta = s * alpha;
          const x = R_p * Math.sin(theta);
          const z = R_p * (1 - Math.cos(theta));

          positions.push(x, y, z);
          uvs.push(u_coord, v_coord);
        }
      }

      for (let j = 0; j < N_y; j++) {
        for (let i = 0; i < N_s; i++) {
          const a = j * (N_s + 1) + i;
          const b = (j + 1) * (N_s + 1) + i;
          const c = (j + 1) * (N_s + 1) + (i + 1);
          const d = j * (N_s + 1) + (i + 1);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      const unrollGeo = new THREE.BufferGeometry();
      unrollGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      unrollGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      unrollGeo.setIndex(indices);
      unrollGeo.computeVertexNormals();

      const unrollMat = new THREE.MeshStandardMaterial({
        color: 0x0ea5e9,
        roughness: 0.3,
        metalness: 0.2,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide
      });
      const unrollMesh = new THREE.Mesh(unrollGeo, unrollMat);
      group.add(unrollMesh);

      // Edge border of unrolled lateral rectangle
      const edgeGeo = new THREE.WireframeGeometry(unrollGeo);
      const edgeMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 1 });
      const edgeLine = new THREE.LineSegments(edgeGeo, edgeMat);
      group.add(edgeLine);

      // Top Circular Base (Hinged at top center edge)
      const topDiskGeo = new THREE.CircleGeometry(radius, 40);
      const topDiskMat = new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        roughness: 0.25,
        metalness: 0.2,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide
      });
      const topDiskMesh = new THREE.Mesh(topDiskGeo, topDiskMat);
      const topAngle = -Math.PI / 2 + (u * Math.PI) / 2;
      topDiskMesh.rotation.x = topAngle;
      topDiskMesh.position.set(0, halfH + radius * Math.sin((u * Math.PI) / 2), radius * Math.cos((u * Math.PI) / 2));
      group.add(topDiskMesh);

      // Top Disk Ring
      const topRingGeo = new THREE.RingGeometry(radius - 0.08, radius, 40);
      const topRingMat = new THREE.MeshBasicMaterial({ color: 0xa5b4fc, side: THREE.DoubleSide });
      const topRingMesh = new THREE.Mesh(topRingGeo, topRingMat);
      topRingMesh.rotation.x = topAngle;
      topRingMesh.position.copy(topDiskMesh.position);
      group.add(topRingMesh);

      // Bottom Circular Base (Hinged at bottom center edge)
      const botDiskGeo = new THREE.CircleGeometry(radius, 40);
      const botDiskMat = new THREE.MeshStandardMaterial({
        color: 0x4f46e5,
        roughness: 0.25,
        metalness: 0.2,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide
      });
      const botDiskMesh = new THREE.Mesh(botDiskGeo, botDiskMat);
      const botAngle = Math.PI / 2 - (u * Math.PI) / 2;
      botDiskMesh.rotation.x = botAngle;
      botDiskMesh.position.set(0, -halfH - radius * Math.sin((u * Math.PI) / 2), radius * Math.cos((u * Math.PI) / 2));
      group.add(botDiskMesh);

      // Bottom Disk Ring
      const botRingGeo = new THREE.RingGeometry(radius - 0.08, radius, 40);
      const botRingMat = new THREE.MeshBasicMaterial({ color: 0xa5b4fc, side: THREE.DoubleSide });
      const botRingMesh = new THREE.Mesh(botRingGeo, botRingMat);
      botRingMesh.rotation.x = botAngle;
      botRingMesh.position.copy(botDiskMesh.position);
      group.add(botRingMesh);

      // Dimension indicator lines when unrolled (u > 0.8)
      if (u > 0.8) {
        const rectW = 2 * Math.PI * radius;
        // Bottom dimension line (2πr)
        const dimPts = [
          new THREE.Vector3(-rectW / 2, -halfH - 0.5, 0),
          new THREE.Vector3(rectW / 2, -halfH - 0.5, 0)
        ];
        const dimGeo = new THREE.BufferGeometry().setFromPoints(dimPts);
        const dimMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 });
        group.add(new THREE.Line(dimGeo, dimMat));
      }
    }

    // ==========================================================
    // CASE 3: FORMATION ANIMATION MODE (SỰ TẠO THÀNH HÌNH TRỤ)
    // ==========================================================
    else if (explorationMode === 'formation') {
      const sweep = formationAngle;

      // Axis OO'
      const axisGeo = new THREE.CylinderGeometry(0.08, 0.08, height + 3, 16);
      const axisMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
      const axisMesh = new THREE.Mesh(axisGeo, axisMat);
      group.add(axisMesh);

      // Centers O & O'
      const centerSphereGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const centerMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const topOPrime = new THREE.Mesh(centerSphereGeo, centerMat);
      topOPrime.position.set(0, halfH, 0);
      group.add(topOPrime);

      const bottomO = new THREE.Mesh(centerSphereGeo, centerMat);
      bottomO.position.set(0, -halfH, 0);
      group.add(bottomO);

      // Initial rectangle OO'A'A at theta = 0
      const initRectShape = new THREE.Shape();
      initRectShape.moveTo(0, -halfH);
      initRectShape.lineTo(radius, -halfH);
      initRectShape.lineTo(radius, halfH);
      initRectShape.lineTo(0, halfH);
      initRectShape.closePath();

      const initRectGeo = new THREE.ShapeGeometry(initRectShape);
      const initRectMat = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: sweep > 0.05 ? 0.25 : 0.65,
        side: THREE.DoubleSide
      });
      group.add(new THREE.Mesh(initRectGeo, initRectMat));

      // Swept 3D Surface & Disks
      if (sweep > 0.02) {
        const segs = Math.max(12, Math.floor(radialSegments * (sweep / (Math.PI * 2))));

        // Lateral surface
        const partialBodyGeo = new THREE.CylinderGeometry(radius, radius, height, segs, 1, true, 0, sweep);
        const partialBodyMat = new THREE.MeshStandardMaterial({
          color: 0x2563eb,
          roughness: 0.3,
          metalness: 0.25,
          transparent: true,
          opacity: 0.8,
          side: THREE.DoubleSide
        });
        group.add(new THREE.Mesh(partialBodyGeo, partialBodyMat));

        // Top disk sector
        const topSectorGeo = new THREE.CircleGeometry(radius, segs, 0, sweep);
        topSectorGeo.rotateX(-Math.PI / 2);
        const topSectorMat = new THREE.MeshStandardMaterial({
          color: 0x60a5fa,
          transparent: true,
          opacity: 0.85,
          side: THREE.DoubleSide
        });
        const topSectorMesh = new THREE.Mesh(topSectorGeo, topSectorMat);
        topSectorMesh.position.set(0, halfH, 0);
        group.add(topSectorMesh);

        // Bottom disk sector
        const bottomSectorGeo = new THREE.CircleGeometry(radius, segs, 0, sweep);
        bottomSectorGeo.rotateX(Math.PI / 2);
        const bottomSectorMat = new THREE.MeshStandardMaterial({
          color: 0x3b82f6,
          transparent: true,
          opacity: 0.85,
          side: THREE.DoubleSide
        });
        const bottomSectorMesh = new THREE.Mesh(bottomSectorGeo, bottomSectorMat);
        bottomSectorMesh.position.set(0, -halfH, 0);
        group.add(bottomSectorMesh);

        // Trajectory Arcs
        const arcPointsTop: THREE.Vector3[] = [];
        const arcPointsBottom: THREE.Vector3[] = [];
        for (let i = 0; i <= segs; i++) {
          const t = (i / segs) * sweep;
          arcPointsTop.push(new THREE.Vector3(radius * Math.cos(t), halfH, radius * Math.sin(t)));
          arcPointsBottom.push(new THREE.Vector3(radius * Math.cos(t), -halfH, radius * Math.sin(t)));
        }
        group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arcPointsTop), new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 3 })));
        group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arcPointsBottom), new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 3 })));
      }

      // Active Rotating Generating Rectangle
      const currentA_X = radius * Math.cos(sweep);
      const currentA_Z = radius * Math.sin(sweep);

      const activeRectShape = new THREE.Shape();
      activeRectShape.moveTo(0, -halfH);
      activeRectShape.lineTo(radius, -halfH);
      activeRectShape.lineTo(radius, halfH);
      activeRectShape.lineTo(0, halfH);
      activeRectShape.closePath();

      const activeRectMesh = new THREE.Mesh(
        new THREE.ShapeGeometry(activeRectShape),
        new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.6, side: THREE.DoubleSide })
      );
      activeRectMesh.rotation.y = sweep;
      group.add(activeRectMesh);

      // Glowing Generator Line AA'
      const genTube = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, height, 12),
        new THREE.MeshBasicMaterial({ color: 0x22d3ee })
      );
      genTube.position.set(currentA_X, 0, currentA_Z);
      group.add(genTube);

      // Vertices A and A'
      const vertexGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const vertexMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const vertexAPrime = new THREE.Mesh(vertexGeo, vertexMat);
      vertexAPrime.position.set(currentA_X, halfH, currentA_Z);
      group.add(vertexAPrime);

      const vertexA = new THREE.Mesh(vertexGeo, vertexMat);
      vertexA.position.set(currentA_X, -halfH, currentA_Z);
      group.add(vertexA);
    }
    // ==========================================================
    // CASE 3B: LIQUID POURING SIMULATION MODE (Mô phỏng Rót Nước)
    // ==========================================================
    else if (explorationMode === 'liquid') {
      const currentWaterH = Math.min(height, Math.max(0.01, waterLevel));

      // 1. Bình thủy tinh có vạch chia trong suốt (Glass Outer Container)
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.35,
        roughness: 0.08,
        metalness: 0.05,
        transmission: 0.8,
        ior: 1.48,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const glassBodyGeo = new THREE.CylinderGeometry(radius, radius, height, radialSegments, 1, true);
      const glassBodyMesh = new THREE.Mesh(glassBodyGeo, glassMat);
      glassBodyMesh.position.set(0, 0, 0);
      group.add(glassBodyMesh);

      // Đáy bình thủy tinh
      const glassBottomGeo = new THREE.CircleGeometry(radius, radialSegments);
      glassBottomGeo.rotateX(-Math.PI / 2);
      const glassBottomMesh = new THREE.Mesh(glassBottomGeo, glassMat);
      glassBottomMesh.position.set(0, -halfH, 0);
      group.add(glassBottomMesh);

      // Viền miệng bình
      const glassTopRimGeo = new THREE.TorusGeometry(radius, 0.08, 16, radialSegments);
      glassTopRimGeo.rotateX(Math.PI / 2);
      const glassTopRimMat = new THREE.MeshStandardMaterial({
        color: 0x93c5fd,
        metalness: 0.5,
        roughness: 0.2,
        transparent: true,
        opacity: 0.85
      });
      const glassTopRimMesh = new THREE.Mesh(glassTopRimGeo, glassTopRimMat);
      glassTopRimMesh.position.set(0, halfH, 0);
      group.add(glassTopRimMesh);

      // Vạch chia thể tích / chiều cao (Tick marks)
      const markMat = new THREE.MeshBasicMaterial({ color: 0x93c5fd });
      for (let cm = 1; cm <= Math.floor(height); cm++) {
        const isMajor = cm % 2 === 0 || cm === Math.floor(height);
        const markGeo = new THREE.PlaneGeometry(isMajor ? 0.6 : 0.35, 0.04);
        const markMesh = new THREE.Mesh(markGeo, markMat);
        markMesh.position.set(0, -halfH + cm, radius + 0.02);
        group.add(markMesh);

        if (isMajor) {
          const ringMarkGeo = new THREE.RingGeometry(radius - 0.02, radius + 0.02, 32);
          ringMarkGeo.rotateX(-Math.PI / 2);
          const ringMarkMesh = new THREE.Mesh(
            ringMarkGeo,
            new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.25, side: THREE.DoubleSide })
          );
          ringMarkMesh.position.set(0, -halfH + cm, 0);
          group.add(ringMarkMesh);
        }
      }

      // 2. Cột nước bên trong hình trụ (Water Column)
      const waterRadius = radius * 0.98;
      const waterMat = new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.82,
        roughness: 0.05,
        metalness: 0.05,
        transmission: 0.25,
        ior: 1.333,
        side: THREE.DoubleSide
      });

      const waterBodyGeo = new THREE.CylinderGeometry(waterRadius, waterRadius, currentWaterH, radialSegments, 1, false);
      const waterBodyMesh = new THREE.Mesh(waterBodyGeo, waterMat);
      waterBodyMesh.position.set(0, -halfH + currentWaterH / 2, 0);
      group.add(waterBodyMesh);

      // Mặt nước phía trên (Liquid Surface Meniscus Disc)
      const surfaceDiscGeo = new THREE.CircleGeometry(waterRadius, radialSegments);
      surfaceDiscGeo.rotateX(-Math.PI / 2);
      const surfaceDiscMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        roughness: 0.1,
        metalness: 0.2,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide
      });
      const surfaceDiscMesh = new THREE.Mesh(surfaceDiscGeo, surfaceDiscMat);
      surfaceDiscMesh.position.set(0, -halfH + currentWaterH, 0);
      group.add(surfaceDiscMesh);

      // Vòng tròn đáy phát sáng
      const baseGlowingRing = new THREE.Mesh(
        new THREE.RingGeometry(radius - 0.05, radius + 0.05, radialSegments),
        new THREE.MeshBasicMaterial({ color: 0x0284c7, side: THREE.DoubleSide })
      );
      baseGlowingRing.rotateX(-Math.PI / 2);
      baseGlowingRing.position.set(0, -halfH + 0.01, 0);
      group.add(baseGlowingRing);

      // Cột đo chiều cao nước bên cạnh
      const waterHeightLinePoints = [
        new THREE.Vector3(radius + 0.6, -halfH, 0),
        new THREE.Vector3(radius + 0.6, -halfH + currentWaterH, 0)
      ];
      const waterLineGeo = new THREE.BufferGeometry().setFromPoints(waterHeightLinePoints);
      group.add(new THREE.Line(waterLineGeo, new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 3 })));
    }
    // ==========================================================
    // CASE 4: STANDARD EXPLORE & MATH EXPERIMENT MODES
    // ==========================================================
    else {
      const isHighlightBase = activeComponentId === 'base';
      const isHighlightRadius = activeComponentId === 'radius';
      const isHighlightHeight = activeComponentId === 'height';
      const isHighlightGen = activeComponentId === 'generator';
      const isHighlightAxis = activeComponentId === 'axis';
      const isHighlightLat = activeComponentId === 'lateral_surface';

      // 1. Thân hình trụ
      const bodyGeometry = new THREE.CylinderGeometry(radius, radius, height, radialSegments, 1, true);
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: isHighlightLat ? 0x3b82f6 : activeComponentId === 'all' ? 0x2563eb : 0x1e3a8a,
        roughness: 0.25,
        metalness: 0.3,
        transparent: true,
        opacity:
          viewMode === 'solid'
            ? isHighlightLat
              ? 0.95
              : isHighlightBase || isHighlightAxis
              ? 0.4
              : 0.75
            : 0.15,
        side: THREE.DoubleSide,
        wireframe: viewMode === 'wireframe'
      });
      const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      group.add(bodyMesh);

      // 2. Đáy trên (Top Base)
      const topBaseGeometry = new THREE.CircleGeometry(radius, radialSegments);
      topBaseGeometry.rotateX(-Math.PI / 2);
      const topBaseMaterial = new THREE.MeshStandardMaterial({
        color: isHighlightBase ? 0x818cf8 : activeComponentId === 'all' ? 0x60a5fa : 0x1e3a8a,
        roughness: 0.2,
        metalness: 0.3,
        transparent: true,
        opacity: viewMode === 'solid' ? (isHighlightBase ? 0.95 : activeComponentId === 'all' ? 0.8 : 0.35) : 0.2,
        side: THREE.DoubleSide,
        wireframe: viewMode === 'wireframe'
      });
      const topBaseMesh = new THREE.Mesh(topBaseGeometry, topBaseMaterial);
      topBaseMesh.position.set(0, halfH, 0);
      group.add(topBaseMesh);

      // Top Base Border
      const topRingPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= radialSegments; i++) {
        const theta = (i / radialSegments) * Math.PI * 2;
        topRingPoints.push(new THREE.Vector3(radius * Math.cos(theta), halfH, radius * Math.sin(theta)));
      }
      group.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(topRingPoints), new THREE.LineBasicMaterial({ color: isHighlightBase ? 0xc7d2fe : 0x60a5fa, linewidth: isHighlightBase ? 3 : 1.5 })));

      // 3. Đáy dưới (Bottom Base)
      const bottomBaseGeometry = new THREE.CircleGeometry(radius, radialSegments);
      bottomBaseGeometry.rotateX(Math.PI / 2);
      const bottomBaseMaterial = new THREE.MeshStandardMaterial({
        color: isHighlightBase ? 0x6366f1 : activeComponentId === 'all' ? 0x2563eb : 0x1e3a8a,
        roughness: 0.2,
        metalness: 0.3,
        transparent: true,
        opacity: viewMode === 'solid' ? (isHighlightBase ? 0.95 : activeComponentId === 'all' ? 0.85 : 0.35) : 0.2,
        side: THREE.DoubleSide,
        wireframe: viewMode === 'wireframe'
      });
      const bottomBaseMesh = new THREE.Mesh(bottomBaseGeometry, bottomBaseMaterial);
      bottomBaseMesh.position.set(0, -halfH, 0);
      group.add(bottomBaseMesh);

      // Bottom Base Border
      const bottomRingPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= radialSegments; i++) {
        const theta = (i / radialSegments) * Math.PI * 2;
        bottomRingPoints.push(new THREE.Vector3(radius * Math.cos(theta), -halfH, radius * Math.sin(theta)));
      }
      group.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(bottomRingPoints), new THREE.LineBasicMaterial({ color: isHighlightBase ? 0xc7d2fe : 0x3b82f6, linewidth: isHighlightBase ? 3 : 1.5 })));

      // 4. Trục OO' & Chiều cao h
      const showHeightAxis = activeComponentId === 'all' || isHighlightHeight || isHighlightAxis || showAxes;
      if (showHeightAxis) {
        const axisMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(
            isHighlightHeight || isHighlightAxis ? 0.09 : 0.05,
            isHighlightHeight || isHighlightAxis ? 0.09 : 0.05,
            height,
            16
          ),
          new THREE.MeshBasicMaterial({ color: isHighlightHeight || isHighlightAxis ? 0xfbbf24 : 0xf59e0b })
        );
        group.add(axisMesh);

        if (isHighlightAxis || showAxes) {
          const dashPoints = [new THREE.Vector3(0, halfH + 1.4, 0), new THREE.Vector3(0, -halfH - 1.4, 0)];
          const axisDashLine = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(dashPoints),
            new THREE.LineDashedMaterial({ color: 0xf59e0b, dashSize: 0.4, gapSize: 0.2 })
          );
          axisDashLine.computeLineDistances();
          group.add(axisDashLine);
        }
      }

      // 5. Centers O & O'
      const centerSphereGeo = new THREE.SphereGeometry(isHighlightBase || isHighlightHeight || isHighlightAxis ? 0.22 : 0.16, 16, 16);
      const topCenterSphere = new THREE.Mesh(
        centerSphereGeo,
        new THREE.MeshBasicMaterial({ color: isHighlightBase || isHighlightHeight || isHighlightAxis ? 0xffffff : 0x93c5fd })
      );
      topCenterSphere.position.set(0, halfH, 0);
      group.add(topCenterSphere);

      const bottomCenterSphere = new THREE.Mesh(
        centerSphereGeo,
        new THREE.MeshBasicMaterial({ color: isHighlightBase || isHighlightHeight || isHighlightAxis || isHighlightRadius ? 0xffffff : 0x93c5fd })
      );
      bottomCenterSphere.position.set(0, -halfH, 0);
      group.add(bottomCenterSphere);

      // 6. Bán kính r (OA)
      const showRadius = activeComponentId === 'all' || isHighlightRadius || isHighlightBase;
      if (showRadius) {
        const radiusPoints = [new THREE.Vector3(0, -halfH, 0), new THREE.Vector3(radius, -halfH, 0)];
        group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(radiusPoints), new THREE.LineBasicMaterial({ color: isHighlightRadius ? 0x34d399 : 0x10b981, linewidth: isHighlightRadius ? 4 : 2 })));

        if (isHighlightRadius) {
          const radTubeGeo = new THREE.CylinderGeometry(0.08, 0.08, radius, 12);
          radTubeGeo.rotateZ(Math.PI / 2);
          const radTube = new THREE.Mesh(radTubeGeo, new THREE.MeshBasicMaterial({ color: 0x34d399 }));
          radTube.position.set(radius / 2, -halfH, 0);
          group.add(radTube);
        }

        const edgePointGeo = new THREE.SphereGeometry(isHighlightRadius ? 0.2 : 0.14, 12, 12);
        const edgePointMat = new THREE.MeshBasicMaterial({ color: isHighlightRadius ? 0xffffff : 0x10b981 });
        const edgePointA = new THREE.Mesh(edgePointGeo, edgePointMat);
        edgePointA.position.set(radius, -halfH, 0);
        group.add(edgePointA);

        const edgePointAPrime = new THREE.Mesh(edgePointGeo, edgePointMat);
        edgePointAPrime.position.set(radius, halfH, 0);
        group.add(edgePointAPrime);
      }

      // 7. Đường sinh l = AA'
      const showGenerator = activeComponentId === 'all' || isHighlightGen || isHighlightLat;
      if (showGenerator) {
        const generatorPoints = [new THREE.Vector3(radius, halfH, 0), new THREE.Vector3(radius, -halfH, 0)];
        group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(generatorPoints), new THREE.LineBasicMaterial({ color: isHighlightGen ? 0x22d3ee : 0x60a5fa, linewidth: isHighlightGen ? 4 : 2 })));

        if (isHighlightGen) {
          const genTube = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, height, 12), new THREE.MeshBasicMaterial({ color: 0x22d3ee }));
          genTube.position.set(radius, 0, 0);
          group.add(genTube);
        }
      }

      // 8. Thiết diện qua trục
      if (viewMode === 'cross-section') {
        const crossGeo = new THREE.PlaneGeometry(radius * 2, height);
        group.add(new THREE.Mesh(crossGeo, new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.35, side: THREE.DoubleSide })));
        group.add(new THREE.LineSegments(new THREE.EdgesGeometry(crossGeo), new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 2 })));
      }

      // 9. Wireframe
      if (viewMode === 'wireframe') {
        group.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.CylinderGeometry(radius, radius, height, 16, 4)), new THREE.LineBasicMaterial({ color: 0x93c5fd, linewidth: 1.5 })));
      }
    }

    fitCameraToModel(false);
  }, [
    radius,
    height,
    viewMode,
    activeComponentId,
    showAxes,
    explorationMode,
    formationAngle,
    unfoldProgress,
    fitCameraToModel
  ]);

  // Sync isSpinning prop
  useEffect(() => {
    if (isSpinning && !internalIsSpinning && explorationMode === 'explore') {
      trigger360Spin();
    }
  }, [isSpinning, internalIsSpinning, explorationMode, trigger360Spin]);

  return (
    <div
      id="cylinder-model-viewport"
      className={`relative w-full h-full min-h-[460px] sm:min-h-[520px] lg:min-h-[620px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#F8FAFC] select-none ${className}`}
    >
      {/* 1. Real WebGL Three.js Canvas Container */}
      <div
        ref={containerRef}
        id="cylinder-threejs-canvas"
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
      />

      {/* 2. Floating 3D Projected Screen Labels */}
      {showLabels && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          {labels.map((label) => {
            if (!label.visible) return null;
            return (
              <div
                key={label.id}
                style={{
                  transform: `translate(${label.x}px, ${label.y}px) translate(-50%, -50%)`
                }}
                className="absolute left-0 top-0 transition-transform duration-75 pointer-events-none"
              >
                <div
                  className={`backdrop-blur-md px-2.5 py-1 rounded-xl border text-center shadow-xs transition-all animate-fadeIn ${label.badgeBg}`}
                >
                  <div className={`font-mono font-bold text-xs ${label.color}`}>
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

      {/* 3. Floating Top Mode Selector HUD Bar */}
      <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none z-20">
        {/* Navigation Tabs for Exploration Modes */}
        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-2xl border border-gray-200 shadow-sm pointer-events-auto overflow-x-auto max-w-full">
          {/* Tab 1: Khám phá 3D */}
          <button
            type="button"
            id="tab-mode-explore"
            onClick={() => setMode('explore')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[36px] flex items-center gap-1.5 whitespace-nowrap ${
              explorationMode === 'explore'
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Khám phá 3D</span>
          </button>

          {/* Tab 2: Khai triển (Net / Unfolding) */}
          <button
            type="button"
            id="tab-mode-net"
            onClick={() => setMode('net')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[36px] flex items-center gap-1.5 whitespace-nowrap ${
              explorationMode === 'net'
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <FoldHorizontal className="w-3.5 h-3.5" />
            <span>Khai triển (Net)</span>
          </button>

          {/* Tab 3: Sự tạo thành (Formation) */}
          <button
            type="button"
            id="tab-mode-formation"
            onClick={() => setMode('formation')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[36px] flex items-center gap-1.5 whitespace-nowrap ${
              explorationMode === 'formation'
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sự tạo thành</span>
            <span className="sm:hidden">Tạo thành</span>
          </button>

          {/* Tab 6: Mô phỏng rót nước & Thể tích (Liquid Simulation) */}
          <button
            type="button"
            id="tab-mode-liquid"
            onClick={() => setMode('liquid')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[36px] flex items-center gap-1.5 whitespace-nowrap ${
              explorationMode === 'liquid'
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Rót nước (V)</span>
          </button>
        </div>

        {/* Viewport Zoom & Fit Buttons */}
        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-xl border border-gray-200 shadow-xs pointer-events-auto">
          <button
            type="button"
            onClick={() => {
              if (controlsRef.current && cameraRef.current) {
                cameraRef.current.position.multiplyScalar(0.85);
                controlsRef.current.update();
              }
            }}
            className="p-1.5 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
            title="Phóng to"
            aria-label="Phóng to"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              if (controlsRef.current && cameraRef.current) {
                cameraRef.current.position.multiplyScalar(1.15);
                controlsRef.current.update();
              }
            }}
            className="p-1.5 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
            title="Thu nhỏ"
            aria-label="Thu nhỏ"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => fitCameraToModel(true)}
            className="p-1.5 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
            title="Căn vừa màn hình (Auto-fit)"
            aria-label="Căn vừa"
          >
            <Move className="w-4 h-4 text-orange-500" />
          </button>
        </div>
      </div>

      {/* 4. MODE SPECIFIC OVERLAYS ARE MANAGED BY NON-OBSTRUCTIVE HUD OUTSIDE CANVAS */}

      {/* 5. Floating Bottom Interactive Action Controls Bar */}
      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex flex-wrap items-center justify-between gap-2.5 pointer-events-none z-20">
        {/* Mode Specific Controls */}
        {explorationMode === 'net' ? (
          /* NET / UNFOLDING CONTROLS: [BẮT ĐẦU] [TẠM DỪNG] [CHƠI LẠI] [ĐẶT LẠI] */
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-gray-200 shadow-sm pointer-events-auto">
            {/* Nút [BẮT ĐẦU / KHAI TRIỂN] */}
            <button
              type="button"
              id="btn-unfold-start"
              onClick={handleStartUnfold}
              disabled={isUnfoldPlaying}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer min-h-[40px] flex items-center gap-1.5 ${
                isUnfoldPlaying
                  ? 'bg-orange-100 text-orange-700 border border-orange-200'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:brightness-110 shadow-xs'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{unfoldProgress > 0 && unfoldProgress < 1 ? 'TIẾP TỤC' : 'KHAI TRIỂN'}</span>
            </button>

            {/* Nút [TẠM DỪNG] */}
            <button
              type="button"
              id="btn-unfold-pause"
              onClick={handlePauseUnfold}
              disabled={!isUnfoldPlaying}
              className="px-3 py-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl border border-gray-200 transition-all cursor-pointer min-h-[40px] flex items-center gap-1.5 disabled:opacity-40"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>TẠM DỪNG</span>
            </button>

            {/* Nút [CHƠI LẠI] */}
            <button
              type="button"
              id="btn-unfold-replay"
              onClick={handleReplayUnfold}
              className="px-3 py-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl border border-gray-200 transition-all cursor-pointer min-h-[40px] flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
              <span>CHƠI LẠI</span>
            </button>

            {/* Nút [ĐẶT LẠI] */}
            <button
              type="button"
              id="btn-unfold-reset"
              onClick={handleResetUnfold}
              className="px-2.5 py-2 text-xs font-bold bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl border border-gray-200 transition-all cursor-pointer min-h-[40px]"
            >
              ĐẶT LẠI
            </button>
          </div>

        ) : explorationMode === 'liquid' ? (
          /* LIQUID WATER POURING CONTROLS */
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-gray-200 shadow-sm pointer-events-auto">
            <button
              type="button"
              id="btn-liquid-fill"
              onClick={() => setWaterLevel(height)}
              className="px-3 py-2 text-xs font-bold bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:brightness-110 rounded-xl transition-all cursor-pointer min-h-[40px] flex items-center gap-1.5 shadow-xs"
            >
              <Droplets className="w-3.5 h-3.5 fill-current" />
              <span>RÓT ĐẦY</span>
            </button>

            <button
              type="button"
              id="btn-liquid-half"
              onClick={() => setWaterLevel(height / 2)}
              className="px-3 py-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl border border-gray-200 transition-all cursor-pointer min-h-[40px]"
            >
              50%
            </button>

            <button
              type="button"
              id="btn-liquid-empty"
              onClick={() => setWaterLevel(0)}
              className="px-2.5 py-2 text-xs font-bold bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl border border-gray-200 transition-all cursor-pointer min-h-[40px]"
            >
              ĐỔ HẾT
            </button>
          </div>
        ) : explorationMode === 'formation' ? (
          /* FORMATION CONTROLS */
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-gray-200 shadow-sm pointer-events-auto">
            <button
              type="button"
              id="btn-formation-start"
              onClick={handleStartFormation}
              disabled={isFormationPlaying}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer min-h-[40px] flex items-center gap-1.5 ${
                isFormationPlaying
                  ? 'bg-orange-100 text-orange-700 border border-orange-200'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:brightness-110 shadow-xs'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{formationAngle > 0 && formationAngle < Math.PI * 2 ? 'TIẾP TỤC' : 'BẮT ĐẦU QUÉT'}</span>
            </button>

            <button
              type="button"
              id="btn-formation-pause"
              onClick={handlePauseFormation}
              disabled={!isFormationPlaying}
              className="px-3 py-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl border border-gray-200 transition-all cursor-pointer min-h-[40px] flex items-center gap-1.5 disabled:opacity-40"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>TẠM DỪNG</span>
            </button>

            <button
              type="button"
              id="btn-formation-replay"
              onClick={handleReplayFormation}
              className="px-3 py-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl border border-gray-200 transition-all cursor-pointer min-h-[40px] flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
              <span>CHƠI LẠI</span>
            </button>

            <button
              type="button"
              id="btn-formation-reset"
              onClick={handleResetFormation}
              className="px-2.5 py-2 text-xs font-bold bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl border border-gray-200 transition-all cursor-pointer min-h-[40px]"
            >
              ĐẶT LẠI
            </button>
          </div>
        ) : (
          /* STANDARD CONTROLS FOR EXPLORE & EXPERIMENT */
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-gray-200 shadow-sm pointer-events-auto">
            {/* Nút [QUAY 360°] */}
            <button
              type="button"
              id="btn-explore-spin"
              onClick={trigger360Spin}
              disabled={internalIsSpinning}
              className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer min-h-[40px] flex items-center gap-1.5 ${
                internalIsSpinning
                  ? 'bg-orange-500 text-white border-orange-400 ring-2 ring-orange-200'
                  : 'bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${internalIsSpinning ? 'animate-spin' : ''}`} />
              <span>QUAY 360°</span>
            </button>

            {/* Nút [BẮT ĐẦU / TẠM DỪNG] Auto-Rotate */}
            {onToggleAutoRotate && (
              <button
                type="button"
                id="btn-explore-autorotate"
                onClick={onToggleAutoRotate}
                className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer min-h-[40px] flex items-center gap-1.5 ${
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

            {/* Nút [CHƠI LẠI] */}
            <button
              type="button"
              id="btn-explore-replay"
              onClick={handleReplay}
              className="px-3 py-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl border border-gray-200 transition-all cursor-pointer min-h-[40px] flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
              <span>CHƠI LẠI</span>
            </button>
          </div>
        )}

        {/* Right Corner Dimension Badges */}
        <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-2 rounded-2xl border border-gray-200 shadow-sm pointer-events-auto">
          <div className="text-[11px] font-mono text-gray-700 flex items-center gap-2">
            <span>
              <strong className="text-orange-600">r</strong> = {radius}cm
            </span>
            <span className="text-gray-300">|</span>
            <span>
              <strong className="text-orange-600">h = l</strong> = {height}cm
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CylinderModel;
