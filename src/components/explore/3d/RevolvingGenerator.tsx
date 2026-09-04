/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * REVOLVING GEOMETRY GENERATOR (THREE.JS 3D WEBGL)
 * - Revolves 2D cross-sections (Rectangle, Right Triangle, Semicircle) around a fixed axis to form 3D shapes (Cylinder, Cone, Sphere).
 * - Real-time sweep angle controller (0° to 360°) with play/pause/reset.
 * - Laser sweep trail & 2D planar cross-section.
 * - X-Ray Skeleton / Wireframe / Solid rendering modes.
 * - Live KaTeX mathematical proof & formula derivation.
 * - Complete WebGL memory lifecycle management.
 */

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Sparkles,
  Eye,
  Layers,
  Box,
  Compass,
  ArrowRight,
  Info,
  Maximize2,
  CheckCircle2,
  Activity,
  Zap,
  HelpCircle
} from 'lucide-react';
import { MathFormula } from '../../common/MathFormula';
import { ShapeType } from '../../../types';

export interface RevolvingGeneratorProps {
  initialShape?: ShapeType;
  initialRadius?: number;
  initialHeight?: number;
  onFormationComplete?: (message: string) => void;
  className?: string;
}

export const RevolvingGenerator: React.FC<RevolvingGeneratorProps> = ({
  initialShape = 'cylinder',
  initialRadius = 3,
  initialHeight = 6,
  onFormationComplete,
  className = ''
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Scene Group References
  const dynamicGroupRef = useRef<THREE.Group | null>(null);
  const generatorPlaneGroupRef = useRef<THREE.Group | null>(null);

  // States
  const [shape, setShape] = useState<ShapeType>(initialShape);
  const [radius, setRadius] = useState<number>(initialRadius);
  const [height, setHeight] = useState<number>(initialHeight);
  const [sweepAngleDeg, setSweepAngleDeg] = useState<number>(180); // 0 to 360
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1);
  const [renderStyle, setRenderStyle] = useState<'solid' | 'wireframe' | 'xray'>('solid');
  const [showLaserTrail, setShowLaserTrail] = useState<boolean>(true);
  const [showMeasurements, setShowMeasurements] = useState<boolean>(true);
  const [hasCompleted360, setHasCompleted360] = useState<boolean>(false);

  // Calculated slant height for cone
  const slantHeight = useMemo(() => {
    return Math.sqrt(radius * radius + height * height);
  }, [radius, height]);

  // Sync props when initialShape changes
  useEffect(() => {
    setShape(initialShape);
    if (initialShape === 'cylinder') {
      setRadius(3);
      setHeight(6);
    } else if (initialShape === 'cone') {
      setRadius(3);
      setHeight(5);
    } else {
      setRadius(3.5);
    }
    setSweepAngleDeg(180);
    setHasCompleted360(false);
  }, [initialShape]);

  // Initialize Three.js WebGL Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const heightPx = container.clientHeight || 480;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfffdf8); // Warm ivory background
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 100);
    camera.position.set(12, 10, 16);
    cameraRef.current = camera;

    // 3. Renderer with antialiasing
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 40;
    controls.maxPolarAngle = Math.PI / 2 + 0.1; // Don't flip below ground
    controls.target.set(0, 2.5, 0);
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff5ea, 1.2);
    dirLight1.position.set(15, 20, 15);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 1024;
    dirLight1.shadow.mapSize.height = 1024;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xddeeff, 0.6);
    dirLight2.position.set(-15, 10, -15);
    scene.add(dirLight2);

    // 6. Ground grid & axis
    const gridHelper = new THREE.GridHelper(24, 24, 0xddcbb5, 0xede4d5);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    // Dynamic content group
    const dynamicGroup = new THREE.Group();
    scene.add(dynamicGroup);
    dynamicGroupRef.current = dynamicGroup;

    // Generator 2D plane group
    const generatorPlaneGroup = new THREE.Group();
    scene.add(generatorPlaneGroup);
    generatorPlaneGroupRef.current = generatorPlaneGroup;

    // Animation render loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0 && rendererRef.current && cameraRef.current) {
          cameraRef.current.aspect = newW / newH;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);

      // Recursive disposal of scene objects
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => m.dispose());
            } else {
              mesh.material.dispose();
            }
          }
        }
      });

      controls.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update 3D Geometry and Generator Plane when parameters change
  useEffect(() => {
    const dynGroup = dynamicGroupRef.current;
    const planeGroup = generatorPlaneGroupRef.current;
    if (!dynGroup || !planeGroup) return;

    // Clear previous children
    while (dynGroup.children.length > 0) {
      const obj = dynGroup.children[0] as THREE.Mesh;
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
      dynGroup.remove(obj);
    }

    while (planeGroup.children.length > 0) {
      const obj = planeGroup.children[0] as THREE.Mesh;
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
      planeGroup.remove(obj);
    }

    const radAngle = (sweepAngleDeg * Math.PI) / 180;
    const isSolid = renderStyle === 'solid';
    const isXRay = renderStyle === 'xray';
    const isWire = renderStyle === 'wireframe';

    // Base Color Schemes
    const colorMap = {
      cylinder: { primary: 0xed806f, secondary: 0xc45d4c, accent: 0xff3b30 },
      cone: { primary: 0xe07a5f, secondary: 0xb55a40, accent: 0xff6b00 },
      sphere: { primary: 0x9fb596, secondary: 0x6e8766, accent: 0x2e7d32 }
    };
    const activeColor = colorMap[shape];

    // 1. REVOLVED 3D VOLUME (LATHE / PARTIAL MESH)
    if (sweepAngleDeg > 0.5) {
      let revolvedGeo: THREE.BufferGeometry;

      if (shape === 'cylinder') {
        const points: THREE.Vector2[] = [];
        points.push(new THREE.Vector2(0, 0));
        points.push(new THREE.Vector2(radius, 0));
        points.push(new THREE.Vector2(radius, height));
        points.push(new THREE.Vector2(0, height));
        revolvedGeo = new THREE.LatheGeometry(points, 48, 0, radAngle);
      } else if (shape === 'cone') {
        const points: THREE.Vector2[] = [];
        points.push(new THREE.Vector2(0, 0));
        points.push(new THREE.Vector2(radius, 0));
        points.push(new THREE.Vector2(0, height));
        revolvedGeo = new THREE.LatheGeometry(points, 48, 0, radAngle);
      } else {
        // Sphere (revolving semicircle around Y axis, center at (0, R, 0))
        const points: THREE.Vector2[] = [];
        const segments = 32;
        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI; // 0 to PI
          const x = radius * Math.sin(theta);
          const y = radius - radius * Math.cos(theta); // 0 to 2*radius
          points.push(new THREE.Vector2(x, y));
        }
        revolvedGeo = new THREE.LatheGeometry(points, 48, 0, radAngle);
      }

      const mainMat = new THREE.MeshPhysicalMaterial({
        color: activeColor.primary,
        metalness: 0.1,
        roughness: 0.35,
        clearcoat: 0.3,
        transmission: isXRay ? 0.65 : 0,
        opacity: isXRay ? 0.75 : (isWire ? 0.3 : 0.95),
        transparent: isXRay || isWire,
        wireframe: isWire,
        side: THREE.DoubleSide
      });

      const revolvedMesh = new THREE.Mesh(revolvedGeo, mainMat);
      revolvedMesh.castShadow = true;
      revolvedMesh.receiveShadow = true;
      dynGroup.add(revolvedMesh);

      // Add edge outline for partial sweep
      if (sweepAngleDeg < 359.5 && !isWire) {
        const wireMat = new THREE.MeshBasicMaterial({
          color: 0x000000,
          wireframe: true,
          transparent: true,
          opacity: 0.15
        });
        const edgeOverlay = new THREE.Mesh(revolvedGeo.clone(), wireMat);
        dynGroup.add(edgeOverlay);
      }
    }

    // 2. ROTATING 2D GENERATOR CROSS-SECTION (Hình phẳng sinh khối)
    const planePivot = new THREE.Group();
    planePivot.rotation.y = radAngle;

    if (shape === 'cylinder') {
      // Rectangle (width r, height h)
      const rectShape = new THREE.Shape();
      rectShape.moveTo(0, 0);
      rectShape.lineTo(radius, 0);
      rectShape.lineTo(radius, height);
      rectShape.lineTo(0, height);
      rectShape.closePath();

      const rectGeo = new THREE.ShapeGeometry(rectShape);
      const rectMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: activeColor.primary,
        emissiveIntensity: 0.45,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const rectMesh = new THREE.Mesh(rectGeo, rectMat);
      planePivot.add(rectMesh);

      // Outline border
      const borderPoints = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(radius, 0, 0),
        new THREE.Vector3(radius, height, 0),
        new THREE.Vector3(0, height, 0),
        new THREE.Vector3(0, 0, 0)
      ];
      const borderGeo = new THREE.BufferGeometry().setFromPoints(borderPoints);
      const borderMat = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 3 });
      const borderLine = new THREE.Line(borderGeo, borderMat);
      planePivot.add(borderLine);
    } else if (shape === 'cone') {
      // Right Triangle (base r, height h, hypotenuse l)
      const triShape = new THREE.Shape();
      triShape.moveTo(0, 0);
      triShape.lineTo(radius, 0);
      triShape.lineTo(0, height);
      triShape.closePath();

      const triGeo = new THREE.ShapeGeometry(triShape);
      const triMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: activeColor.primary,
        emissiveIntensity: 0.5,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const triMesh = new THREE.Mesh(triGeo, triMat);
      planePivot.add(triMesh);

      // Border with highlight on hypotenuse (Generatrix l)
      const borderPoints = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(radius, 0, 0),
        new THREE.Vector3(0, height, 0),
        new THREE.Vector3(0, 0, 0)
      ];
      const borderGeo = new THREE.BufferGeometry().setFromPoints(borderPoints);
      const borderMat = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 3 });
      const borderLine = new THREE.Line(borderGeo, borderMat);
      planePivot.add(borderLine);

      // Generatrix glowing laser line
      const genPoints = [new THREE.Vector3(radius, 0, 0.01), new THREE.Vector3(0, height, 0.01)];
      const genGeo = new THREE.BufferGeometry().setFromPoints(genPoints);
      const genMat = new THREE.LineBasicMaterial({ color: activeColor.accent, linewidth: 4 });
      const genLine = new THREE.Line(genGeo, genMat);
      planePivot.add(genLine);
    } else {
      // Semicircle (radius R, along Y from 0 to 2R)
      const semiShape = new THREE.Shape();
      semiShape.moveTo(0, 0);
      const segs = 32;
      for (let i = 0; i <= segs; i++) {
        const t = (i / segs) * Math.PI;
        const x = radius * Math.sin(t);
        const y = radius - radius * Math.cos(t);
        semiShape.lineTo(x, y);
      }
      semiShape.lineTo(0, 2 * radius);
      semiShape.closePath();

      const semiGeo = new THREE.ShapeGeometry(semiShape);
      const semiMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: activeColor.primary,
        emissiveIntensity: 0.45,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const semiMesh = new THREE.Mesh(semiGeo, semiMat);
      planePivot.add(semiMesh);

      const semiBorderPoints: THREE.Vector3[] = [];
      semiBorderPoints.push(new THREE.Vector3(0, 0, 0));
      for (let i = 0; i <= segs; i++) {
        const t = (i / segs) * Math.PI;
        semiBorderPoints.push(new THREE.Vector3(radius * Math.sin(t), radius - radius * Math.cos(t), 0));
      }
      semiBorderPoints.push(new THREE.Vector3(0, 2 * radius, 0));
      semiBorderPoints.push(new THREE.Vector3(0, 0, 0));

      const semiBorderGeo = new THREE.BufferGeometry().setFromPoints(semiBorderPoints);
      const semiBorderMat = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 3 });
      const semiBorderLine = new THREE.Line(semiBorderGeo, semiBorderMat);
      planePivot.add(semiBorderLine);
    }

    planeGroup.add(planePivot);

    // 3. CENTRAL ROTATION AXIS (Trục quay cố định OO' / d)
    const axisHeight = shape === 'sphere' ? radius * 2 + 2 : height + 2;
    const axisGeo = new THREE.CylinderGeometry(0.04, 0.04, axisHeight, 16);
    const axisMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2 });
    const axisMesh = new THREE.Mesh(axisGeo, axisMat);
    axisMesh.position.y = shape === 'sphere' ? radius : height / 2;
    dynGroup.add(axisMesh);

    // Axis Arrows / Caps
    const arrowGeo = new THREE.ConeGeometry(0.12, 0.35, 16);
    const arrowMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const topArrow = new THREE.Mesh(arrowGeo, arrowMat);
    topArrow.position.y = (shape === 'sphere' ? radius * 2 + 1 : height + 1);
    dynGroup.add(topArrow);

    // 4. LASER SWEEP TRAIL (Vệt sáng laser quét)
    if (showLaserTrail && sweepAngleDeg > 0) {
      const arcPoints: THREE.Vector3[] = [];
      const arcSteps = Math.max(12, Math.floor(sweepAngleDeg / 4));
      for (let i = 0; i <= arcSteps; i++) {
        const curDeg = (i / arcSteps) * sweepAngleDeg;
        const curRad = (curDeg * Math.PI) / 180;
        if (shape === 'cylinder') {
          arcPoints.push(new THREE.Vector3(radius * Math.cos(curRad), 0, -radius * Math.sin(curRad)));
        } else if (shape === 'cone') {
          arcPoints.push(new THREE.Vector3(radius * Math.cos(curRad), 0, -radius * Math.sin(curRad)));
        } else {
          arcPoints.push(new THREE.Vector3(radius * Math.cos(curRad), radius, -radius * Math.sin(curRad)));
        }
      }
      const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPoints);
      const arcMat = new THREE.LineBasicMaterial({ color: activeColor.accent, linewidth: 3 });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      dynGroup.add(arcLine);
    }

  }, [shape, radius, height, sweepAngleDeg, renderStyle, showLaserTrail, showMeasurements]);

  // Auto-sweep animation timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSweepAngleDeg((prev) => {
          const next = prev + 2 * playSpeed;
          if (next >= 360) {
            setIsPlaying(false);
            setHasCompleted360(true);
            if (onFormationComplete) {
              const nameMap = { cylinder: 'Hình Trụ', cone: 'Hình Nón', sphere: 'Hình Cầu' };
              onFormationComplete(`Đã hoàn tất quay 360° tạo thành khối ${nameMap[shape]} hoàn chỉnh!`);
            }
            return 360;
          }
          return next;
        });
      }, 20);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playSpeed, shape, onFormationComplete]);

  // Live KaTeX Math Derivation
  const mathData = useMemo(() => {
    const fraction = sweepAngleDeg / 360;
    if (shape === 'cylinder') {
      const vFull = Math.PI * radius * radius * height;
      const sxqFull = 2 * Math.PI * radius * height;
      return {
        shapeName: 'Hình Trụ (Cylinder)',
        generatorName: 'Hình chữ nhật kích thước r × h',
        axisName: 'Cạnh chiều cao h (Trục OO\')',
        vCurrent: (vFull * fraction).toFixed(2),
        vFormula: 'V = \\pi r^2 h',
        sxqFormula: 'S_{xq} = 2\\pi r h',
        stpFormula: 'S_{tp} = 2\\pi r h + 2\\pi r^2',
        pythagoras: 'l = h'
      };
    } else if (shape === 'cone') {
      const vFull = (1 / 3) * Math.PI * radius * radius * height;
      const sxqFull = Math.PI * radius * slantHeight;
      return {
        shapeName: 'Hình Nón (Cone)',
        generatorName: 'Tam giác vuông cạnh góc vuông r, h',
        axisName: 'Cạnh góc vuông h (Chiều cao)',
        vCurrent: (vFull * fraction).toFixed(2),
        vFormula: 'V = \\frac{1}{3}\\pi r^2 h',
        sxqFormula: 'S_{xq} = \\pi r l',
        stpFormula: 'S_{tp} = \\pi r l + \\pi r^2',
        pythagoras: `l = \\sqrt{r^2 + h^2} = \\sqrt{${radius}^2 + ${height}^2} = ${slantHeight.toFixed(2)}`
      };
    } else {
      const vFull = (4 / 3) * Math.PI * Math.pow(radius, 3);
      const sFull = 4 * Math.PI * radius * radius;
      return {
        shapeName: 'Hình Cầu (Sphere)',
        generatorName: 'Nửa hình tròn bán kính R',
        axisName: 'Đường kính AB = 2R',
        vCurrent: (vFull * fraction).toFixed(2),
        vFormula: 'V = \\frac{4}{3}\\pi R^3',
        sxqFormula: 'S_{mặt\\,cầu} = 4\\pi R^2',
        stpFormula: 'S = 4\\pi R^2',
        pythagoras: `d = 2R = ${2 * radius}\\text{ cm}`
      };
    }
  }, [shape, radius, height, slantHeight, sweepAngleDeg]);

  return (
    <div className={`w-full bg-[#FFFDF8] rounded-xl border-3 border-black shadow-neo p-4 sm:p-6 space-y-5 ${className}`}>
      {/* 1. Header & Shape Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#FF6B00] text-white text-xs font-black uppercase border border-black flex items-center gap-1.5 shadow-neo-sm">
              <Zap className="w-3.5 h-3.5" />
              WebGL 3D Engine
            </span>
            <h3 className="text-lg sm:text-xl font-black text-black tracking-tight font-heading">
              Cỗ máy Xoay Sinh Khối 360° (Revolving Geometry)
            </h3>
          </div>
          <p className="text-xs text-gray-700 font-medium mt-1">
            Quan sát quá trình hình phẳng 2D quay quanh trục cố định để ngưng tụ thành khối tròn xoay 3D.
          </p>
        </div>

        {/* 3 Shape Tabs */}
        <div className="flex items-center gap-1.5 bg-[#FFF9E6] p-1 rounded-lg border-2 border-black shrink-0">
          <button
            onClick={() => { setShape('cylinder'); setSweepAngleDeg(180); setHasCompleted360(false); }}
            className={`px-3 py-1.5 rounded text-xs font-black transition-all ${
              shape === 'cylinder' ? 'bg-[#ED806F] text-white shadow-neo-sm border border-black' : 'text-gray-800 hover:bg-white/60'
            }`}
          >
            🔴 Hình Trụ
          </button>
          <button
            onClick={() => { setShape('cone'); setSweepAngleDeg(180); setHasCompleted360(false); }}
            className={`px-3 py-1.5 rounded text-xs font-black transition-all ${
              shape === 'cone' ? 'bg-[#E07A5F] text-white shadow-neo-sm border border-black' : 'text-gray-800 hover:bg-white/60'
            }`}
          >
            🟠 Hình Nón
          </button>
          <button
            onClick={() => { setShape('sphere'); setSweepAngleDeg(180); setHasCompleted360(false); }}
            className={`px-3 py-1.5 rounded text-xs font-black transition-all ${
              shape === 'sphere' ? 'bg-[#9FB596] text-black shadow-neo-sm border border-black' : 'text-gray-800 hover:bg-white/60'
            }`}
          >
            🟢 Hình Cầu
          </button>
        </div>
      </div>

      {/* 2. Main 3D Canvas Stage */}
      <div className="relative w-full h-[380px] sm:h-[450px] bg-gradient-to-b from-[#FFFDF8] to-[#FFF6EA] rounded-xl border-2 border-black overflow-hidden shadow-inner">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          <div className="px-3 py-1.5 rounded-md bg-white/95 backdrop-blur-sm border-2 border-black text-xs font-black text-black shadow-neo-sm">
            📐 Góc Quét: <span className="text-[#FF6B00]">{Math.round(sweepAngleDeg)}°</span> / 360° ({Math.round((sweepAngleDeg / 360) * 100)}%)
          </div>
          <div className="px-2.5 py-1 rounded bg-black/80 text-white text-[11px] font-bold">
            💡 Kéo chuột để xoay góc nhìn 360°
          </div>
        </div>

        {/* Render Style Toolbar inside Canvas */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/95 p-1 rounded-lg border-2 border-black shadow-neo-sm">
          <button
            onClick={() => setRenderStyle('solid')}
            title="Khối đặc"
            className={`px-2 py-1 rounded text-xs font-black flex items-center gap-1 ${
              renderStyle === 'solid' ? 'bg-black text-white' : 'text-black hover:bg-gray-100'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            Đặc
          </button>
          <button
            onClick={() => setRenderStyle('xray')}
            title="Nhìn xuyên thấu X-Ray"
            className={`px-2 py-1 rounded text-xs font-black flex items-center gap-1 ${
              renderStyle === 'xray' ? 'bg-[#FF6B00] text-white' : 'text-black hover:bg-gray-100'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            X-Ray
          </button>
          <button
            onClick={() => setRenderStyle('wireframe')}
            title="Khung dây"
            className={`px-2 py-1 rounded text-xs font-black flex items-center gap-1 ${
              renderStyle === 'wireframe' ? 'bg-black text-white' : 'text-black hover:bg-gray-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Khung Dây
          </button>
        </div>

        {/* Laser Trail Toggle */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-white/90 px-3 py-1.5 rounded-lg border-2 border-black text-xs font-black shadow-neo-sm">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={showLaserTrail}
              onChange={(e) => setShowLaserTrail(e.target.checked)}
              className="rounded accent-[#FF6B00]"
            />
            Vệt sáng Laser
          </label>
        </div>
      </div>

      {/* 3. Sweep Controller & Sliders */}
      <div className="bg-white p-4 rounded-xl border-2 border-black shadow-neo-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-lg bg-[#FF6B00] text-white font-black text-xs border-2 border-black shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] flex items-center gap-1.5"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Tạm Dừng' : 'Tự Động Quét 360°'}
            </button>

            <button
              onClick={() => { setSweepAngleDeg(0); setIsPlaying(false); setHasCompleted360(false); }}
              className="px-3 py-2 rounded-lg bg-white text-black font-black text-xs border-2 border-black shadow-neo-sm hover:bg-gray-50 flex items-center gap-1"
            >
              <RotateCcw className="w-4 h-4" />
              Đặt Lại (0°)
            </button>

            <button
              onClick={() => { setSweepAngleDeg(360); setIsPlaying(false); setHasCompleted360(true); }}
              className="px-3 py-2 rounded-lg bg-[#FFF9E6] text-black font-black text-xs border-2 border-black shadow-neo-sm hover:bg-amber-100 flex items-center gap-1"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Hoàn Tất (360°)
            </button>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1.5 text-xs font-black">
            <span className="text-gray-600">Tốc độ:</span>
            {[0.5, 1, 2].map((s) => (
              <button
                key={s}
                onClick={() => setPlaySpeed(s)}
                className={`px-2 py-1 rounded border border-black ${
                  playSpeed === s ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Sweep Angle Range Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-black text-black">
            <span>0° (Hình phẳng 2D)</span>
            <span className="text-[#FF6B00]">Góc quét: {Math.round(sweepAngleDeg)}°</span>
            <span>360° (Khối 3D trọn vẹn)</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={sweepAngleDeg}
            onChange={(e) => setSweepAngleDeg(parseFloat(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF6B00] border-2 border-black"
          />
        </div>

        {/* Geometric Parameters Sliders (r, h) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-200">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-black">
              <span>Bán kính đáy r:</span>
              <span className="text-[#FF6B00]">{radius} cm</span>
            </div>
            <input
              type="range"
              min="1.5"
              max="5"
              step="0.5"
              value={radius}
              onChange={(e) => setRadius(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded appearance-none cursor-pointer accent-black"
            />
          </div>

          {shape !== 'sphere' && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-black">
                <span>Chiều cao h:</span>
                <span className="text-[#FF6B00]">{height} cm</span>
              </div>
              <input
                type="range"
                min="3"
                max="8"
                step="0.5"
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded appearance-none cursor-pointer accent-black"
              />
            </div>
          )}
        </div>
      </div>

      {/* 4. Pedagogical KaTeX Analysis Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Bản chất hình phẳng */}
        <div className="bg-[#FFF9E6] p-4 rounded-xl border-2 border-black shadow-neo-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-900">
            <Compass className="w-4 h-4" />
            1. Hình Phẳng Ban Đầu
          </div>
          <p className="text-sm font-black text-black">
            {mathData.generatorName}
          </p>
          <div className="text-xs text-gray-700 font-medium">
            Quay quanh: <strong className="text-black">{mathData.axisName}</strong>
          </div>
        </div>

        {/* Card 2: Công thức sinh khối & Pythagoras */}
        <div className="bg-white p-4 rounded-xl border-2 border-black shadow-neo-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-[#FF6B00]">
            <Activity className="w-4 h-4" />
            2. Mối liên hệ Hình Học
          </div>
          <div className="text-xs font-black text-black space-y-1">
            <div>• Thể tích: <MathFormula formula={mathData.vFormula} inline /></div>
            <div>• Diện tích xung quanh: <MathFormula formula={mathData.sxqFormula} inline /></div>
            {shape === 'cone' && (
              <div className="text-red-700">
                • Pythagoras: <MathFormula formula={mathData.pythagoras} inline />
              </div>
            )}
          </div>
        </div>

        {/* Card 3: Thể tích ngưng tụ hiện tại */}
        <div className="bg-[#F0FDF4] p-4 rounded-xl border-2 border-black shadow-neo-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-800">
            <CheckCircle2 className="w-4 h-4" />
            3. Thể Tích Đã Quét
          </div>
          <div className="text-lg font-black text-emerald-900">
            {mathData.vCurrent} <span className="text-xs font-bold text-gray-600">cm³</span>
          </div>
          <p className="text-[11px] text-gray-700 font-medium">
            {sweepAngleDeg >= 360 ? '🎉 Khối tròn xoay hoàn chỉnh!' : `Đạt ${Math.round((sweepAngleDeg / 360) * 100)}% dung tích khối`}
          </p>
        </div>
      </div>
    </div>
  );
};
