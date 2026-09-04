/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * UNIFIED REUSABLE 3D SPHERE GEOMETRY COMPONENT (THREE.JS)
 * Compliant with Grade 9 Vietnamese Geometry Standard (SGK Toán 9)
 *
 * 7 Interactive Geometry Modes:
 * 1. EXPLORE (Khám phá 3D & Giải phẫu):
 *    - Real WebGL 3D Sphere Geometry with Center O, Radius R (OA), Diameter d = 2R (AB), Equatorial Great Circle (Đường tròn lớn).
 *    - Orbit Controls, responsive auto-fit, smooth rotation, 70-80% viewport fill.
 * 2. FORMATION (Sự tạo thành hình cầu):
 *    - Generating Semi-Circle sweeping 0° → 360° around fixed diameter axis.
 *    - Standard controls: [Bắt đầu], [Tạm dừng], [Chơi lại], [Đặt lại].
 * 3. EXPERIMENT (Thực nghiệm Toán học biến thiên R):
 *    - Real-time manipulation of R with instant calculations: d = 2R, S = 4πR², V = 4/3 πR³.
 *    - Prediction Challenge: R × 2 -> d × 2, S × 4, V × 8.
 * 4. MISCONCEPTION BUSTER (Giải mã ngộ nhận d = 2R):
 *    - Visual and analytical proof comparing Radius R vs Diameter d = 2R.
 * 5. SECTION EXPLORATION (Khám phá lát cắt hình cầu):
 *    - Cut plane at distance d_tâm ∈ [0, R], Section radius ρ = √(R² - d²).
 *    - Special case: d_tâm = 0 -> Great Circle (Đường tròn lớn lớn nhất S = πR²).
 * 6. VOLUME COMPARISON (So sánh thể tích hình cầu vs hình trụ ngoại tiếp):
 *    - Circumscribed cylinder (r = R, h = 2R -> V_trụ = 2πR³), V_cầu = 2/3 V_trụ = 4/3 πR³.
 * 7. CHALLENGE (Thử thách hình cầu Toán 9):
 *    - Interactive 3D Grade 9 Geometry Quiz with live parameter synchronization and KaTeX explanations.
 */

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  RotateCw,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Compass,
  Layers,
  HelpCircle,
  Check,
  ChevronRight,
  Trophy,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { MathFormula, MathText } from '../../common/MathFormula';
import { ExplorationModeType } from './CylinderModel';
import { OrbitRotationController } from './OrbitRotationController';

export interface SphereModelProps {
  radius: number; // in cm (1 - 10)
  onRadiusChange?: (r: number) => void;
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

export const SphereModel: React.FC<SphereModelProps> = ({
  radius = 4,
  onRadiusChange,
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
    new OrbitRotationController({ moduleName: 'SPHERE', pauseOnInteraction: true, resumeDelay: 1500 })
  );

  // 360 Spin state
  const [internalIsSpinning, setInternalIsSpinning] = useState(false);

  // 1. Formation Animation State (0° to 360° Semi-circle Sweep)
  const [formationAngle, setFormationAngle] = useState<number>(0);
  const [isFormationPlaying, setIsFormationPlaying] = useState<boolean>(false);
  const [formationCompleted, setFormationCompleted] = useState<boolean>(false);
  const formationAngleRef = useRef<number>(0);
  const isFormationPlayingRef = useRef<boolean>(false);
  const lastFormationTimeRef = useRef<number | null>(null);

  // Sync auto rotate state to rotation controller
  useEffect(() => {
    rotationControllerRef.current.setAutoRotate(isAutoRotating);
  }, [isAutoRotating]);

  // Pause rotation when lesson formation animation is playing
  useEffect(() => {
    rotationControllerRef.current.setPausedByLesson(isFormationPlaying);
  }, [isFormationPlaying]);

  // 2. Section Cut Plane State (distance from center d_tâm ∈ [0, radius])
  const [sectionDistance, setSectionDistance] = useState<number>(0);

  // 3. Volume Comparison State
  const [showCircumscribedCylinder, setShowCircumscribedCylinder] = useState<boolean>(true);

  // 5. Challenge Mode State
  const [challengeIndex, setChallengeIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [challengeScore, setChallengeScore] = useState<number>(0);

  // 3D Projected Screen Labels State
  const [labels, setLabels] = useState<ProjectedLabel[]>([]);
  const lastLabelsRef = useRef<ProjectedLabel[]>([]);

  // Mathematical calculations for Sphere (Toán 9)
  const mathCalculations = useMemo(() => {
    const pi = Math.PI;
    const diameter = 2 * radius;
    const surfaceArea = 4 * pi * radius * radius;
    const volume = (4 / 3) * pi * Math.pow(radius, 3);
    const greatCircleArea = pi * radius * radius;
    const greatCircleCircumference = 2 * pi * radius;

    // Section calculations
    const clampedCutDist = Math.min(radius, Math.max(0, sectionDistance));
    const sectionRadius = Math.sqrt(Math.max(0, radius * radius - clampedCutDist * clampedCutDist));
    const sectionArea = pi * sectionRadius * sectionRadius;

    // Circumscribed cylinder calculations (r = R, h = 2R)
    const cylVolume = pi * radius * radius * (2 * radius);

    return {
      radius,
      diameter,
      surfaceArea: surfaceArea.toFixed(2),
      surfaceAreaPi: (4 * radius * radius).toFixed(1),
      volume: volume.toFixed(2),
      volumePi: ((4 / 3) * Math.pow(radius, 3)).toFixed(1),
      greatCircleArea: greatCircleArea.toFixed(2),
      greatCircleAreaPi: (radius * radius).toFixed(1),
      greatCircleCircumference: greatCircleCircumference.toFixed(2),
      greatCircleCircumferencePi: (2 * radius).toFixed(1),
      // Section
      sectionDistance: clampedCutDist,
      sectionRadius: sectionRadius.toFixed(2),
      sectionArea: sectionArea.toFixed(2),
      sectionAreaPi: (sectionRadius * sectionRadius).toFixed(1),
      // Circumscribed Cylinder
      cylVolume: cylVolume.toFixed(2),
      cylVolumePi: (2 * Math.pow(radius, 3)).toFixed(1),
      ratio: ((volume / cylVolume) * 100).toFixed(1)
    };
  }, [radius, sectionDistance]);

  // Challenge Questions list for Sphere
  const challengeQuestions = useMemo(
    () => [
      {
        id: 1,
        title: 'Câu 1: Tính diện tích mặt cầu',
        question: 'Một hình cầu có bán kính R = 5 cm. Diện tích mặt cầu S bằng bao nhiêu?',
        options: [
          { text: '50\\pi\\text{ cm}^2', isCorrect: false },
          { text: '100\\pi\\text{ cm}^2', isCorrect: true },
          { text: '125\\pi\\text{ cm}^2', isCorrect: false },
          { text: '500/3\\pi\\text{ cm}^2', isCorrect: false }
        ],
        explanation:
          'Áp dụng công thức S = 4\\pi R^2 = 4\\pi \\times 5^2 = 100\\pi\\text{ cm}^2 \\approx 314.16\\text{ cm}^2.',
        targetR: 5
      },
      {
        id: 2,
        title: 'Câu 2: Tìm bán kính từ thể tích khối cầu',
        question: 'Một khối cầu có thể tích V = 288\\pi cm³. Bán kính R của khối cầu là bao nhiêu?',
        options: [
          { text: 'R = 4\\text{ cm}', isCorrect: false },
          { text: 'R = 6\\text{ cm}', isCorrect: true },
          { text: 'R = 8\\text{ cm}', isCorrect: false },
          { text: 'R = 12\\text{ cm}', isCorrect: false }
        ],
        explanation:
          'Ta có V = \\frac{4}{3}\\pi R^3 = 288\\pi \\implies R^3 = \\frac{288 \\times 3}{4} = 216 \\implies R = \\sqrt[3]{216} = 6\\text{ cm}.',
        targetR: 6
      },
      {
        id: 3,
        title: 'Câu 3: Bán kính thiết diện khi cắt qua hình cầu',
        question:
          'Cắt một hình cầu bán kính R = 5 cm bởi một mặt phẳng cách tâm d = 3 cm. Bán kính thiết diện là:',
        options: [
          { text: '\\rho = 2\\text{ cm}', isCorrect: false },
          { text: '\\rho = 3.5\\text{ cm}', isCorrect: false },
          { text: '\\rho = 4\\text{ cm}', isCorrect: true },
          { text: '\\rho = 5\\text{ cm}', isCorrect: false }
        ],
        explanation:
          'Theo định lý Pythagore trong tam giác vuông: \\rho = \\sqrt{R^2 - d^2} = \\sqrt{5^2 - 3^2} = \\sqrt{25 - 9} = 4\\text{ cm}.',
        targetR: 5
      }
    ],
    []
  );

  // Camera fit for Sphere (occupies 65–75% of viewport fill)
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

    const sphereSpan = Math.max(size.x, size.y, size.z);
    const distanceForFov = sphereSpan / 2 / Math.tan(fov / 2);
    const distanceForAspect = sphereSpan / 2 / (Math.tan(fov / 2) * aspect);

    const maxFitDistance = Math.max(distanceForFov, distanceForAspect);
    const presentationFillFactor = 0.7; // 70% fill ratio
    const requiredDistance = maxFitDistance / presentationFillFactor;

    camera.near = Math.max(0.1, requiredDistance / 40);
    camera.far = Math.max(250, requiredDistance * 12);
    camera.updateProjectionMatrix();

    let currentDir = new THREE.Vector3()
      .subVectors(camera.position, controls.target)
      .normalize();
    if (currentDir.lengthSq() < 0.1 || isNaN(currentDir.x)) {
      currentDir = new THREE.Vector3(1.1, 0.8, 1.3).normalize();
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
  }, []);

  // Formation Animation Handlers (0° to 360° Sweep)
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

  // 360 Spin Action
  const trigger360Spin = useCallback(() => {
    setInternalIsSpinning(true);
    rotationControllerRef.current.trigger360Spin(1600, () => {
      setInternalIsSpinning(false);
    });
    if (onSpin360) onSpin360();
  }, [onSpin360]);

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
    camera.position.set(12, 9, 15);
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
    renderer.toneMappingExposure = 1.15;

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
    controls.minDistance = 3;
    controls.maxDistance = 70;
    controls.maxPolarAngle = Math.PI - 0.05;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // Attach to unified OrbitRotationController
    rotationControllerRef.current.attach(controls, camera);

    // Lighting setup (Studio 3-Point Light + Ambient)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(16, 20, 16);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf97316, 0.8);
    fillLight.position.set(-16, 12, -14);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xfb923c, 0.6);
    rimLight.position.set(0, -15, -12);
    scene.add(rimLight);

    const topLight = new THREE.PointLight(0xffffff, 1.2, 50);
    topLight.position.set(0, 15, 0);
    scene.add(topLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const gridHelper = new THREE.GridHelper(40, 40, 0xcbd5e1, 0xe2e8f0);
    gridHelper.position.y = -radius * 1.5;
    scene.add(gridHelper);

    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);
    groupRef.current = sphereGroup;

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

      // Formation Sweep Animation
      if (isFormationPlayingRef.current) {
        if (lastFormationTimeRef.current !== null) {
          const delta = (now - lastFormationTimeRef.current) / 1000;
          const sweepSpeed = (Math.PI * 2) / 3.5;
          let nextAngle = formationAngleRef.current + sweepSpeed * delta;

          if (nextAngle >= Math.PI * 2) {
            nextAngle = Math.PI * 2;
            isFormationPlayingRef.current = false;
            setIsFormationPlaying(false);
            setFormationCompleted(true);
            if (onFormationComplete) {
              onFormationComplete(
                'Khi quay nửa hình tròn một vòng quanh đường kính cố định, ta được một hình cầu.'
              );
            }
          }
          formationAngleRef.current = nextAngle;
          setFormationAngle(nextAngle);
        }
        lastFormationTimeRef.current = now;
      }

      // Update rotation controller (handles OrbitControls autoRotate, damping, and 360 spin)
      rotationControllerRef.current.update(now);

      renderer.render(scene, camera);

      // Project 3D coordinates to Screen UI Labels
      if (containerRef.current && cameraRef.current && groupRef.current) {
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        const curCamera = cameraRef.current;

        const project = (pos: THREE.Vector3) => {
          const v = pos.clone().project(curCamera);
          return {
            x: ((v.x + 1) * w) / 2,
            y: ((-v.y + 1) * h) / 2,
            visible: v.z < 1
          };
        };

        const activeLabels: ProjectedLabel[] = [];

        if (explorationMode === 'formation') {
          // Formation Labels
          const sweepAngle = formationAngleRef.current;
          const ptA = new THREE.Vector3(
            radius * Math.cos(sweepAngle),
            0,
            radius * Math.sin(sweepAngle)
          );
          const pO = project(new THREE.Vector3(0, 0, 0));
          const pA = project(ptA);

          activeLabels.push({
            id: 'form_center_o',
            name: 'O (Tâm quay)',
            subtext: 'Tâm đối xứng của hình cầu',
            x: pO.x,
            y: pO.y,
            visible: pO.visible,
            color: 'text-amber-700',
            badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
          });

          activeLabels.push({
            id: 'form_pt_a',
            name: `A (R = ${radius}cm)`,
            subtext: 'Nửa cung tròn đang quay quét tạo khối cầu',
            x: pA.x,
            y: pA.y,
            visible: pA.visible,
            color: 'text-orange-600',
            badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
          });
        } else if (explorationMode === 'section') {
          // Section Labels
          const cutDist = Math.min(radius, Math.max(0, sectionDistance));
          const secRadius = Math.sqrt(Math.max(0, radius * radius - cutDist * cutDist));
          const pCenter = project(new THREE.Vector3(0, 0, 0));
          const pCutRim = project(new THREE.Vector3(secRadius, cutDist, 0));

          activeLabels.push({
            id: 'sec_center_o',
            name: 'O (Tâm cầu)',
            subtext: `Khoảng cách d = ${cutDist.toFixed(1)}cm`,
            x: pCenter.x,
            y: pCenter.y,
            visible: pCenter.visible,
            color: 'text-amber-700',
            badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
          });

          activeLabels.push({
            id: 'sec_rim',
            name: `Thiết diện (ρ = ${secRadius.toFixed(1)}cm)`,
            subtext: cutDist === 0 ? 'Đường tròn lớn lớn nhất (S = πR²)' : `S = πρ² = ${mathCalculations.sectionArea}cm²`,
            x: pCutRim.x,
            y: pCutRim.y,
            visible: pCutRim.visible,
            color: 'text-blue-600',
            badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
          });
        } else if (explorationMode === 'volume_compare') {
          // Volume Comparison Labels
          const pCenter = project(new THREE.Vector3(0, 0, 0));
          const pTopCyl = project(new THREE.Vector3(0, radius, 0));

          activeLabels.push({
            id: 'vol_sphere',
            name: `Khối cầu V = 4/3 πR³`,
            subtext: `${mathCalculations.volume} cm³ (${mathCalculations.volumePi}π)`,
            x: pCenter.x,
            y: pCenter.y,
            visible: pCenter.visible,
            color: 'text-orange-600',
            badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
          });

          activeLabels.push({
            id: 'vol_cyl',
            name: `Trụ ngoại tiếp (h = 2R)`,
            subtext: `V_trụ = 2πR³ = ${mathCalculations.cylVolume} cm³`,
            x: pTopCyl.x,
            y: pTopCyl.y,
            visible: pTopCyl.visible,
            color: 'text-indigo-600',
            badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
          });
        } else {
          // Standard Explore & Experiment Labels
          const pCenter = project(new THREE.Vector3(0, 0, 0));
          const pRadiusPt = project(new THREE.Vector3(radius, 0, 0));
          const pRadiusMid = project(new THREE.Vector3(radius / 2, 0.4, 0));
          const pNorthPole = project(new THREE.Vector3(0, radius, 0));
          const pSouthPole = project(new THREE.Vector3(0, -radius, 0));
          const pLeftPt = project(new THREE.Vector3(-radius, 0, 0));
          const pDiameterMid = project(new THREE.Vector3(0, 0.5, 0));

          // 1. Center O (Always visible or highlighted)
          if (
            activeComponentId === 'all' ||
            activeComponentId === 'axis' ||
            activeComponentId === 'radius'
          ) {
            activeLabels.push({
              id: 'label_center_o',
              name: 'O (Tâm cầu)',
              subtext: 'Tâm đối xứng khối cầu',
              x: pCenter.x,
              y: pCenter.y,
              visible: pCenter.visible,
              color: 'text-amber-700',
              badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
            });
          }

          // 2. Radius R (OA)
          if (activeComponentId === 'all' || activeComponentId === 'radius') {
            activeLabels.push({
              id: 'label_point_a',
              name: 'A',
              subtext: 'Điểm trên mặt cầu',
              x: pRadiusPt.x,
              y: pRadiusPt.y,
              visible: pRadiusPt.visible,
              color: 'text-orange-600',
              badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
            });

            activeLabels.push({
              id: 'label_radius_r',
              name: `R = ${radius}cm`,
              subtext: 'Bán kính OA',
              x: pRadiusMid.x,
              y: pRadiusMid.y,
              visible: pRadiusMid.visible,
              color: 'text-emerald-700',
              badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
            });
          }

          // 3. Diameter d = 2R
          if (activeComponentId === 'height' || activeComponentId === 'diameter') {
            activeLabels.push({
              id: 'label_diameter_b',
              name: 'B',
              subtext: 'Điểm đối xứng',
              x: pLeftPt.x,
              y: pLeftPt.y,
              visible: pLeftPt.visible,
              color: 'text-blue-600',
              badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
            });

            activeLabels.push({
              id: 'label_diameter_d',
              name: `d = 2R = ${radius * 2}cm`,
              subtext: 'Đường kính AB qua tâm O',
              x: pDiameterMid.x,
              y: pDiameterMid.y,
              visible: pDiameterMid.visible,
              color: 'text-blue-600',
              badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
            });
          }

          // 4. Axis of revolution (Trục quay)
          if (activeComponentId === 'axis') {
            activeLabels.push({
              id: 'label_axis_n',
              name: 'Cực Bắc (N)',
              subtext: 'Giao điểm trục quay với mặt cầu',
              x: pNorthPole.x,
              y: pNorthPole.y,
              visible: pNorthPole.visible,
              color: 'text-amber-700',
              badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
            });
            activeLabels.push({
              id: 'label_axis_s',
              name: 'Cực Nam (S)',
              subtext: 'Giao điểm trục quay với mặt cầu',
              x: pSouthPole.x,
              y: pSouthPole.y,
              visible: pSouthPole.visible,
              color: 'text-amber-700',
              badgeBg: 'bg-white/95 border-gray-200 shadow-sm'
            });
          }

          // 5. Great Circle (Đường tròn lớn / Xích đạo)
          if (activeComponentId === 'base' || activeComponentId === 'great_circle') {
            const pEquator = project(new THREE.Vector3(0, 0, radius));
            activeLabels.push({
              id: 'label_great_circle',
              name: 'Đường tròn lớn',
              subtext: `S = πR² = ${mathCalculations.greatCircleArea}cm²`,
              x: pEquator.x,
              y: pEquator.y,
              visible: pEquator.visible,
              color: 'text-indigo-600',
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

  // Build Three.js Geometry inside Group on parameter changes
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    // Clear previous 3D child meshes
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if ((obj as any).geometry) (obj as any).geometry.dispose();
      if ((obj as any).material) {
        if (Array.isArray((obj as any).material)) {
          (obj as any).material.forEach((m: THREE.Material) => m.dispose());
        } else {
          (obj as any).material.dispose();
        }
      }
    }

    const isHighlightRadius = activeComponentId === 'radius';
    const isHighlightDiameter =
      activeComponentId === 'height' || activeComponentId === 'diameter';
    const isHighlightAxis = activeComponentId === 'axis';
    const isHighlightGreatCircle =
      activeComponentId === 'base' || activeComponentId === 'great_circle';

    // 1. FORMATION MODE: SEMI-CIRCLE SWEEP 0° -> 360°
    if (explorationMode === 'formation') {
      const sweep = Math.max(0.01, formationAngle);

      // Swept partial sphere surface
      const partialSphereGeo = new THREE.SphereGeometry(
        radius,
        48,
        32,
        0,
        sweep,
        0,
        Math.PI
      );
      const partialMat = new THREE.MeshPhysicalMaterial({
        color: 0x10b981,
        emissive: 0x064e3b,
        emissiveIntensity: 0.25,
        roughness: 0.2,
        metalness: 0.1,
        clearcoat: 0.4,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide
      });
      const partialMesh = new THREE.Mesh(partialSphereGeo, partialMat);
      group.add(partialMesh);

      // Rotating generating semi-circle disk at current sweep angle
      const semiCircleShape = new THREE.Shape();
      semiCircleShape.absarc(0, 0, radius, -Math.PI / 2, Math.PI / 2, false);
      semiCircleShape.lineTo(0, -radius);

      const semiDiskGeo = new THREE.ShapeGeometry(semiCircleShape, 48);
      const semiDiskMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.35,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide
      });
      const semiDiskMesh = new THREE.Mesh(semiDiskGeo, semiDiskMat);
      semiDiskMesh.rotation.y = -sweep;
      group.add(semiDiskMesh);

      // Semi-circle rim curve highlight
      const curvePts: THREE.Vector3[] = [];
      for (let i = 0; i <= 48; i++) {
        const phi = -Math.PI / 2 + (i / 48) * Math.PI;
        const x = radius * Math.cos(phi) * Math.cos(sweep);
        const y = radius * Math.sin(phi);
        const z = radius * Math.cos(phi) * Math.sin(sweep);
        curvePts.push(new THREE.Vector3(x, y, z));
      }
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePts);
      const curveMat = new THREE.LineBasicMaterial({ color: 0xfacc15, linewidth: 3 });
      const curveLine = new THREE.Line(curveGeo, curveMat);
      group.add(curveLine);

      // Central rotation axis line
      const axisPts = [
        new THREE.Vector3(0, -radius * 1.35, 0),
        new THREE.Vector3(0, radius * 1.35, 0)
      ];
      const axisGeo = new THREE.BufferGeometry().setFromPoints(axisPts);
      const axisMat = new THREE.LineDashedMaterial({
        color: 0xf59e0b,
        dashSize: 0.4,
        gapSize: 0.2,
        linewidth: 2
      });
      const axisLine = new THREE.Line(axisGeo, axisMat);
      axisLine.computeLineDistances();
      group.add(axisLine);

      // Center point O
      const centerGeo = new THREE.SphereGeometry(0.22, 16, 16);
      const centerMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xd97706
      });
      const centerSphere = new THREE.Mesh(centerGeo, centerMat);
      group.add(centerSphere);

      return;
    }

    // 2. SECTION EXPLORATION MODE (MẶT PHẲNG CẮT HÌNH CẦU)
    if (explorationMode === 'section') {
      const cutDist = Math.min(radius, Math.max(0, sectionDistance));
      const secRadius = Math.sqrt(Math.max(0, radius * radius - cutDist * cutDist));

      // Translucent whole outer sphere to see inside
      const outerGeo = new THREE.SphereGeometry(radius, 48, 36);
      const outerMat = new THREE.MeshPhysicalMaterial({
        color: 0x059669,
        roughness: 0.3,
        metalness: 0.05,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      });
      const outerMesh = new THREE.Mesh(outerGeo, outerMat);
      group.add(outerMesh);

      // 3D Cutting plane square
      const planeSpan = radius * 2.4;
      const planeGeo = new THREE.PlaneGeometry(planeSpan, planeSpan);
      const planeMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide
      });
      const planeMesh = new THREE.Mesh(planeGeo, planeMat);
      planeMesh.rotation.x = Math.PI / 2;
      planeMesh.position.y = cutDist;
      group.add(planeMesh);

      // Section Disc at height y = cutDist
      if (secRadius > 0.05) {
        const secDiscGeo = new THREE.CircleGeometry(secRadius, 48);
        const secDiscMat = new THREE.MeshStandardMaterial({
          color: cutDist === 0 ? 0x6366f1 : 0x0284c7,
          emissive: cutDist === 0 ? 0x4f46e5 : 0x0369a1,
          emissiveIntensity: 0.45,
          roughness: 0.2,
          transparent: true,
          opacity: 0.85,
          side: THREE.DoubleSide
        });
        const secDiscMesh = new THREE.Mesh(secDiscGeo, secDiscMat);
        secDiscMesh.rotation.x = Math.PI / 2;
        secDiscMesh.position.y = cutDist;
        group.add(secDiscMesh);

        // Section perimeter ring
        const ringPts: THREE.Vector3[] = [];
        for (let i = 0; i <= 48; i++) {
          const theta = (i / 48) * Math.PI * 2;
          ringPts.push(
            new THREE.Vector3(
              secRadius * Math.cos(theta),
              cutDist,
              secRadius * Math.sin(theta)
            )
          );
        }
        const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPts);
        const ringLine = new THREE.Line(
          ringGeo,
          new THREE.LineBasicMaterial({ color: 0xfacc15, linewidth: 3 })
        );
        group.add(ringLine);

        // Right triangle showing distance d_tâm, section radius ρ, and sphere radius R
        const trianglePts = [
          new THREE.Vector3(0, 0, 0), // O
          new THREE.Vector3(0, cutDist, 0), // H (center of cut)
          new THREE.Vector3(secRadius, cutDist, 0), // M (point on cut circle)
          new THREE.Vector3(0, 0, 0) // O
        ];
        const triGeo = new THREE.BufferGeometry().setFromPoints(trianglePts);
        const triLine = new THREE.Line(
          triGeo,
          new THREE.LineBasicMaterial({ color: 0xf43f5e, linewidth: 2.5 })
        );
        group.add(triLine);
      }

      // Center point O
      const centerGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const centerMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xd97706
      });
      const centerSphere = new THREE.Mesh(centerGeo, centerMat);
      group.add(centerSphere);

      return;
    }

    // 3. VOLUME COMPARISON MODE (SO SÁNH THỂ TÍCH CẦU VS TRỤ)
    if (explorationMode === 'volume_compare') {
      // Sphere solid mesh
      const sphereGeo = new THREE.SphereGeometry(radius, 48, 36);
      const sphereMat = new THREE.MeshPhysicalMaterial({
        color: 0x10b981,
        emissive: 0x064e3b,
        emissiveIntensity: 0.3,
        roughness: 0.2,
        metalness: 0.1,
        transparent: true,
        opacity: 0.85
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      group.add(sphereMesh);

      // Circumscribed Cylinder (r = R, h = 2R)
      if (showCircumscribedCylinder) {
        const cylGeo = new THREE.CylinderGeometry(radius, radius, 2 * radius, 36, 1, true);
        const cylMat = new THREE.MeshStandardMaterial({
          color: 0xa855f7,
          emissive: 0x7e22ce,
          emissiveIntensity: 0.2,
          transparent: true,
          opacity: 0.25,
          side: THREE.DoubleSide
        });
        const cylMesh = new THREE.Mesh(cylGeo, cylMat);
        group.add(cylMesh);

        // Cylinder top & bottom rim wireframes
        const cylWireGeo = new THREE.CylinderGeometry(radius, radius, 2 * radius, 36, 4, true);
        const cylWireMat = new THREE.MeshBasicMaterial({
          color: 0xc084fc,
          wireframe: true,
          transparent: true,
          opacity: 0.55
        });
        const cylWireMesh = new THREE.Mesh(cylWireGeo, cylWireMat);
        group.add(cylWireMesh);
      }

      // Center point O
      const centerGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const centerMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xd97706
      });
      const centerSphere = new THREE.Mesh(centerGeo, centerMat);
      group.add(centerSphere);

      return;
    }

    // 4. STANDARD EXPLORE, EXPERIMENT, MISCONCEPTION & CHALLENGE MODES

    // A. Main Outer Sphere Mesh
    if (viewMode === 'wireframe') {
      const wireGeo = new THREE.SphereGeometry(radius, 28, 20);
      const wireMat = new THREE.MeshBasicMaterial({
        color: isHighlightRadius ? 0x34d399 : 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });
      const wireMesh = new THREE.Mesh(wireGeo, wireMat);
      group.add(wireMesh);
    } else if (viewMode === 'cross-section') {
      // Half sphere (hemisphere) to reveal inner cross section
      const hemiGeo = new THREE.SphereGeometry(
        radius,
        64,
        48,
        0,
        Math.PI * 2,
        0,
        Math.PI / 2
      );
      const hemiMat = new THREE.MeshPhysicalMaterial({
        color: 0x10b981,
        emissive: 0x064e3b,
        emissiveIntensity: 0.15,
        roughness: 0.25,
        metalness: 0.1,
        clearcoat: 0.4,
        transparent: true,
        opacity: 0.88,
        side: THREE.DoubleSide
      });
      const hemiMesh = new THREE.Mesh(hemiGeo, hemiMat);
      group.add(hemiMesh);

      // Cross-section base circular face at y = 0
      const crossDiskGeo = new THREE.CircleGeometry(radius, 64);
      const crossDiskMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        emissive: 0x0369a1,
        emissiveIntensity: 0.3,
        roughness: 0.2,
        side: THREE.DoubleSide
      });
      const crossDiskMesh = new THREE.Mesh(crossDiskGeo, crossDiskMat);
      crossDiskMesh.rotation.x = Math.PI / 2;
      group.add(crossDiskMesh);

      // Border ring of cross-section
      const ringPts: THREE.Vector3[] = [];
      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2;
        ringPts.push(
          new THREE.Vector3(radius * Math.cos(theta), 0, radius * Math.sin(theta))
        );
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPts);
      const ringLine = new THREE.Line(
        ringGeo,
        new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 })
      );
      group.add(ringLine);
    } else {
      // Solid Mode (Smooth translucent emerald physical sphere)
      const sphereGeo = new THREE.SphereGeometry(radius, 64, 48);
      const sphereMat = new THREE.MeshPhysicalMaterial({
        color: isHighlightRadius
          ? 0x059669
          : isHighlightDiameter
          ? 0x0284c7
          : 0x10b981,
        emissive: isHighlightRadius
          ? 0x064e3b
          : isHighlightDiameter
          ? 0x0369a1
          : 0x064e3b,
        emissiveIntensity: 0.2,
        roughness: 0.22,
        metalness: 0.08,
        clearcoat: 0.5,
        clearcoatRoughness: 0.15,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
        depthWrite: true
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      sphereMesh.castShadow = true;
      sphereMesh.receiveShadow = true;
      group.add(sphereMesh);

      // Subtle longitude & latitude guide rings for 3D depth perception
      const equatorPts: THREE.Vector3[] = [];
      const meridianPts: THREE.Vector3[] = [];
      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2;
        equatorPts.push(
          new THREE.Vector3(radius * Math.cos(theta), 0, radius * Math.sin(theta))
        );
        meridianPts.push(
          new THREE.Vector3(
            radius * Math.cos(theta),
            radius * Math.sin(theta),
            0
          )
        );
      }

      // Equatorial Great Circle Ring (Đường tròn lớn xích đạo)
      const equatorGeo = new THREE.BufferGeometry().setFromPoints(equatorPts);
      const equatorMat = new THREE.LineBasicMaterial({
        color: isHighlightGreatCircle ? 0x818cf8 : 0x34d399,
        linewidth: isHighlightGreatCircle ? 3 : 1.5,
        transparent: true,
        opacity: isHighlightGreatCircle ? 0.95 : 0.6
      });
      const equatorLine = new THREE.Line(equatorGeo, equatorMat);
      group.add(equatorLine);

      // Meridian Great Circle Ring
      const meridianGeo = new THREE.BufferGeometry().setFromPoints(meridianPts);
      const meridianMat = new THREE.LineDashedMaterial({
        color: 0x38bdf8,
        dashSize: 0.3,
        gapSize: 0.2,
        linewidth: 1,
        transparent: true,
        opacity: 0.45
      });
      const meridianLine = new THREE.Line(meridianGeo, meridianMat);
      meridianLine.computeLineDistances();
      group.add(meridianLine);
    }

    // B. Center Point O (0, 0, 0)
    const centerSphereGeo = new THREE.SphereGeometry(
      isHighlightAxis ? 0.26 : 0.2,
      16,
      16
    );
    const centerSphereMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.6,
      roughness: 0.2
    });
    const centerSphere = new THREE.Mesh(centerSphereGeo, centerSphereMat);
    group.add(centerSphere);

    // Halo ring around center point O
    const haloGeo = new THREE.RingGeometry(0.28, 0.38, 24);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = Math.PI / 2;
    group.add(haloMesh);

    // C. Radius Line OA (From Center (0,0,0) to Surface Point (radius, 0, 0))
    if (
      activeComponentId === 'all' ||
      activeComponentId === 'radius' ||
      explorationMode === 'misconception'
    ) {
      const radiusPts = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(radius, 0, 0)
      ];
      const radiusGeo = new THREE.BufferGeometry().setFromPoints(radiusPts);
      const radiusMat = new THREE.LineBasicMaterial({
        color: 0x34d399,
        linewidth: 3
      });
      const radiusLine = new THREE.Line(radiusGeo, radiusMat);
      group.add(radiusLine);

      // Glowing tube for radius line
      const tubeCurve = new THREE.LineCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(radius, 0, 0)
      );
      const tubeGeo = new THREE.TubeGeometry(tubeCurve, 20, 0.07, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: 0x34d399,
        emissive: 0x059669,
        emissiveIntensity: 0.5
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      group.add(tubeMesh);

      // Surface Point A
      const ptAGeo = new THREE.SphereGeometry(0.22, 16, 16);
      const ptAMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x047857,
        emissiveIntensity: 0.5
      });
      const ptAMesh = new THREE.Mesh(ptAGeo, ptAMat);
      ptAMesh.position.set(radius, 0, 0);
      group.add(ptAMesh);
    }

    // D. Diameter Line AB = 2R (From (-radius, 0, 0) through O to (radius, 0, 0))
    if (
      activeComponentId === 'height' ||
      activeComponentId === 'diameter' ||
      explorationMode === 'misconception'
    ) {
      const diamPts = [
        new THREE.Vector3(-radius, 0, 0),
        new THREE.Vector3(radius, 0, 0)
      ];
      const diamGeo = new THREE.BufferGeometry().setFromPoints(diamPts);
      const diamMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        linewidth: 3
      });
      const diamLine = new THREE.Line(diamGeo, diamMat);
      group.add(diamLine);

      const diamTubeCurve = new THREE.LineCurve3(
        new THREE.Vector3(-radius, 0, 0),
        new THREE.Vector3(radius, 0, 0)
      );
      const diamTubeGeo = new THREE.TubeGeometry(diamTubeCurve, 24, 0.08, 8, false);
      const diamTubeMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.6
      });
      const diamTubeMesh = new THREE.Mesh(diamTubeGeo, diamTubeMat);
      group.add(diamTubeMesh);

      // Point B
      const ptBGeo = new THREE.SphereGeometry(0.22, 16, 16);
      const ptBMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        emissive: 0x0369a1
      });
      const ptBMesh = new THREE.Mesh(ptBGeo, ptBMat);
      ptBMesh.position.set(-radius, 0, 0);
      group.add(ptBMesh);
    }

    // E. Rotation Axis (Trục quay qua 2 cực N và S)
    if (showAxes || activeComponentId === 'axis') {
      const axisLen = radius * 1.35;
      const axisPts = [
        new THREE.Vector3(0, -axisLen, 0),
        new THREE.Vector3(0, axisLen, 0)
      ];
      const axisGeo = new THREE.BufferGeometry().setFromPoints(axisPts);
      const axisMat = new THREE.LineDashedMaterial({
        color: isHighlightAxis ? 0xfbbf24 : 0x94a3b8,
        dashSize: 0.4,
        gapSize: 0.2,
        linewidth: isHighlightAxis ? 2.5 : 1.5,
        transparent: true,
        opacity: isHighlightAxis ? 1.0 : 0.65
      });
      const axisLine = new THREE.Line(axisGeo, axisMat);
      axisLine.computeLineDistances();
      group.add(axisLine);

      // North and South pole marker points
      const poleGeo = new THREE.SphereGeometry(0.18, 12, 12);
      const poleMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b });
      const northPole = new THREE.Mesh(poleGeo, poleMat);
      northPole.position.set(0, radius, 0);
      group.add(northPole);

      const southPole = new THREE.Mesh(poleGeo, poleMat);
      southPole.position.set(0, -radius, 0);
      group.add(southPole);
    }

    // F. Great Circle Face Highlight
    if (isHighlightGreatCircle && viewMode !== 'cross-section') {
      const circleDiskGeo = new THREE.CircleGeometry(radius, 64);
      const circleDiskMat = new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        emissive: 0x4f46e5,
        emissiveIntensity: 0.35,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide
      });
      const circleDiskMesh = new THREE.Mesh(circleDiskGeo, circleDiskMat);
      circleDiskMesh.rotation.x = Math.PI / 2;
      group.add(circleDiskMesh);
    }

    fitCameraToModel(false);
  }, [
    radius,
    viewMode,
    showAxes,
    activeComponentId,
    explorationMode,
    formationAngle,
    sectionDistance,
    showCircumscribedCylinder,
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
      className={`relative w-full h-full min-h-[460px] sm:min-h-[520px] lg:min-h-[620px] select-none bg-[#F8FAFC] rounded-2xl sm:rounded-3xl overflow-hidden ${className}`}
    >
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full min-h-[460px] sm:min-h-[520px] lg:min-h-[620px] cursor-grab active:cursor-grabbing"
      />

      {/* Floating 2D Screen Overlay Labels */}
      {showLabels && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {labels.map((lbl) => {
            if (!lbl.visible) return null;
            return (
              <div
                key={lbl.id}
                style={{
                  transform: `translate(${lbl.x}px, ${lbl.y}px) translate(-50%, -50%)`
                }}
                className="absolute transition-all duration-75 pointer-events-auto"
              >
                <div
                  className={`px-2.5 py-1 rounded-xl border backdrop-blur-md shadow-sm flex flex-col items-center justify-center text-center whitespace-nowrap animate-fadeIn ${lbl.badgeBg}`}
                >
                  <span className={`text-xs font-bold font-mono ${lbl.color}`}>
                    {lbl.name}
                  </span>
                  {lbl.subtext && (
                    <span className="text-[10px] text-gray-500 font-sans mt-0.5">
                      {lbl.subtext}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Top Right Live 3D Overlay Badge */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-gray-200 shadow-sm text-[11px] font-mono text-orange-600">
        <Sparkles className="w-3.5 h-3.5 text-orange-500" />
        <span>
          R = {radius}cm | S = {mathCalculations.surfaceAreaPi}π | V = {mathCalculations.volumePi}π
        </span>
      </div>
    </div>
  );
};

export default SphereModel;
