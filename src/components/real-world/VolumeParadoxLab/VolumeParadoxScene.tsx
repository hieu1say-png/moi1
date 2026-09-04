/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 3D WEBGL SCENE FOR "TRANG 11: NGHỊCH LÝ 1/3 — BÍ ẨN THỂ TÍCH"
 * Renders Cone Funnel (orange liquid, apex down) & Cylinder Cup (blue liquid)
 * 
 * Invariants:
 * - SAME_RADIUS = true (R = radius)
 * - SAME_HEIGHT = true (h = height)
 * - Level markers at h/3, 2h/3, h strictly calculated from h
 * - Non-linear cone liquid fraction animation: h_water = h * cbrt(coneFill)
 * - Linear cylinder liquid fraction: h_water = cylinderFill * h
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createConeFunnel, updateConeFunnel, ConeFunnelMeshStructure } from './ConeFunnel';
import { createCylinderCup, updateCylinderCup, CylinderCupMeshStructure } from './CylinderCup';
import { createWaterStream, updateWaterStream, WaterStreamStructure } from './WaterMeshes';
import { CameraViewMode } from './types';
import { Compass, Eye, Sparkles, Layers, Check, ArrowRight } from 'lucide-react';

export interface VolumeParadoxSceneProps {
  radius: number; // R
  height: number; // h
  pourCount: 0 | 1 | 2 | 3;
  coneFill: number; // 0 to 1
  cylinderFill: number; // 0 to 1
  isPouring: boolean;
  pourAnimationProgress: number; // 0 to 1
  cameraMode?: CameraViewMode;
  onCameraModeChange?: (mode: CameraViewMode) => void;
  className?: string;
}

export const VolumeParadoxScene: React.FC<VolumeParadoxSceneProps> = ({
  radius,
  height,
  pourCount,
  coneFill,
  cylinderFill,
  isPouring,
  pourAnimationProgress,
  cameraMode = 'DEFAULT_VIEW',
  onCameraModeChange,
  className = ''
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Mesh structures
  const coneStructureRef = useRef<ConeFunnelMeshStructure | null>(null);
  const cylStructureRef = useRef<CylinderCupMeshStructure | null>(null);
  const streamStructureRef = useRef<WaterStreamStructure | null>(null);

  // Positions
  const CONE_BASE_X = -2.2;
  const CYL_BASE_X = 2.2;

  // 2D Screen Projection Coordinates for dynamic HTML Annotations
  const [annotations, setAnnotations] = useState<{
    coneTop: { x: number; y: number; visible: boolean };
    cylTop: { x: number; y: number; visible: boolean };
    level1: { x: number; y: number; visible: boolean };
    level2: { x: number; y: number; visible: boolean };
    level3: { x: number; y: number; visible: boolean };
    coneDimH: { x: number; y: number; visible: boolean };
    cylDimH: { x: number; y: number; visible: boolean };
    coneDimR: { x: number; y: number; visible: boolean };
    cylDimR: { x: number; y: number; visible: boolean };
    streamFlow: { x: number; y: number; visible: boolean };
  }>({
    coneTop: { x: 0, y: 0, visible: false },
    cylTop: { x: 0, y: 0, visible: false },
    level1: { x: 0, y: 0, visible: false },
    level2: { x: 0, y: 0, visible: false },
    level3: { x: 0, y: 0, visible: false },
    coneDimH: { x: 0, y: 0, visible: false },
    cylDimH: { x: 0, y: 0, visible: false },
    coneDimR: { x: 0, y: 0, visible: false },
    cylDimR: { x: 0, y: 0, visible: false },
    streamFlow: { x: 0, y: 0, visible: false }
  });

  // Apply Camera Mode
  const applyCameraMode = useCallback((mode: CameraViewMode) => {
    if (!cameraRef.current || !controlsRef.current) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    if (mode === 'DEFAULT_VIEW') {
      camera.position.set(0, 2.9, 7.4);
      controls.target.set(0, 1.2, 0);
    } else if (mode === 'EXPERIMENT_VIEW') {
      camera.position.set(0.4, 2.3, 5.2);
      controls.target.set(0.1, 1.3, 0);
    } else if (mode === 'X_RAY_VIEW') {
      camera.position.set(0, 2.5, 6.8);
      controls.target.set(0, 1.2, 0);
    }
    controls.update();
  }, []);

  // Sync Camera Mode changes
  useEffect(() => {
    applyCameraMode(cameraMode);

    // Apply X-Ray Material adjustments
    if (coneStructureRef.current && cylStructureRef.current) {
      const isXRay = cameraMode === 'X_RAY_VIEW';
      const coneGlass = coneStructureRef.current.glassBody.material;
      const cylGlass = cylStructureRef.current.glassBody.material;
      const cylBottom = cylStructureRef.current.glassBottom.material;

      if (isXRay) {
        coneGlass.opacity = 0.18;
        coneGlass.transmission = 0.94;
        coneGlass.roughness = 0.05;
        cylGlass.opacity = 0.18;
        cylGlass.transmission = 0.94;
        cylGlass.roughness = 0.05;
        cylBottom.opacity = 0.2;
      } else {
        coneGlass.opacity = 0.38;
        coneGlass.transmission = 0.75;
        coneGlass.roughness = 0.12;
        cylGlass.opacity = 0.35;
        cylGlass.transmission = 0.78;
        cylGlass.roughness = 0.1;
        cylBottom.opacity = 0.35;
      }
      coneGlass.needsUpdate = true;
      cylGlass.needsUpdate = true;
      cylBottom.needsUpdate = true;
    }
  }, [cameraMode, applyCameraMode]);

  // Initialize WebGL Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const heightPx = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc); // Light clean background (slate-50)
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / heightPx, 0.1, 100);
    camera.position.set(0, 2.9, 7.4);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.target.set(0, 1.2, 0);
    controls.minDistance = 3.0;
    controls.maxDistance = 14.0;
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // Do not go below ground
    controlsRef.current = controls;

    // 5. Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 0.9);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.1);
    dirLight1.position.set(6, 12, 8);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 1024;
    dirLight1.shadow.mapSize.height = 1024;
    dirLight1.shadow.bias = -0.0001;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffedd5, 0.6); // warm orange fill
    dirLight2.position.set(-6, 8, -4);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0xe0f2fe, 0.5); // cool blue rim fill
    dirLight3.position.set(6, 6, -6);
    scene.add(dirLight3);

    // 6. Ground & Grid Helper
    const gridHelper = new THREE.GridHelper(18, 36, 0x94a3b8, 0xe2e8f0);
    gridHelper.position.y = -0.001;
    scene.add(gridHelper);

    // Shadow catcher plane on ground
    const shadowPlaneGeo = new THREE.PlaneGeometry(24, 24);
    shadowPlaneGeo.rotateX(-Math.PI / 2);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.position.y = 0;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // 7. Create 3D Objects
    const coneStruct = createConeFunnel(radius, height);
    coneStruct.group.position.set(CONE_BASE_X, 0, 0);
    scene.add(coneStruct.group);
    coneStructureRef.current = coneStruct;

    const cylStruct = createCylinderCup(radius, height);
    cylStruct.group.position.set(CYL_BASE_X, 0, 0);
    scene.add(cylStruct.group);
    cylStructureRef.current = cylStruct;

    const streamStruct = createWaterStream();
    scene.add(streamStruct.streamMesh);
    scene.add(streamStruct.streamParticles);
    scene.add(streamStruct.splashRing);
    scene.add(streamStruct.alignmentLine);
    streamStructureRef.current = streamStruct;

    // 8. Resize Observer
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 9. Animation Loop with Screen Projector for Annotations
    const tempVec = new THREE.Vector3();
    const projectPoint = (worldPos: THREE.Vector3) => {
      tempVec.copy(worldPos);
      tempVec.project(camera);
      const isBehind = tempVec.z > 1;
      const x = ((tempVec.x + 1) * width) / 2;
      const y = ((-tempVec.y + 1) * heightPx) / 2;
      return { x, y, visible: !isBehind && x >= -50 && x <= width + 50 && y >= -50 && y <= heightPx + 50 };
    };

    let frameCount = 0;

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      controls.update();

      renderer.render(scene, camera);

      // Throttled annotation projection (every 2 frames)
      frameCount++;
      if (frameCount % 2 === 0 && container) {
        const currentConePos = coneStructureRef.current?.group.position || new THREE.Vector3(CONE_BASE_X, 0, 0);
        const currentCylPos = cylStructureRef.current?.group.position || new THREE.Vector3(CYL_BASE_X, 0, 0);

        setAnnotations({
          coneTop: projectPoint(new THREE.Vector3(currentConePos.x, height + 0.35, currentConePos.z)),
          cylTop: projectPoint(new THREE.Vector3(currentCylPos.x, height + 0.35, currentCylPos.z)),
          level1: projectPoint(new THREE.Vector3(currentCylPos.x + radius + 0.25, height / 3, currentCylPos.z)),
          level2: projectPoint(new THREE.Vector3(currentCylPos.x + radius + 0.25, (2 * height) / 3, currentCylPos.z)),
          level3: projectPoint(new THREE.Vector3(currentCylPos.x + radius + 0.25, height, currentCylPos.z)),
          coneDimH: projectPoint(new THREE.Vector3(currentConePos.x - radius - 0.75, height / 2, currentConePos.z)),
          cylDimH: projectPoint(new THREE.Vector3(currentCylPos.x + radius + 0.85, height / 2, currentCylPos.z)),
          coneDimR: projectPoint(new THREE.Vector3(currentConePos.x + radius / 2, height + 0.25, currentConePos.z)),
          cylDimR: projectPoint(new THREE.Vector3(currentCylPos.x + radius / 2, height + 0.25, currentCylPos.z)),
          streamFlow: projectPoint(new THREE.Vector3(0, height * 0.9, 0))
        });
      }
    };

    animate();

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      renderer.dispose();
    };
  }, []);

  // Update Geometries when R, h, water fractions, or pour animation progress changes
  useEffect(() => {
    if (!coneStructureRef.current || !cylStructureRef.current || !streamStructureRef.current) return;

    // 1. Pour Animation Dynamics (Cone Tilting & Translation)
    let coneTiltZ = 0;
    let coneShiftX = CONE_BASE_X;
    let coneShiftY = 0;

    if (isPouring) {
      if (pourAnimationProgress < 0.14) {
        // Phase 1 & 2: Tilting towards cylinder
        const t = pourAnimationProgress / 0.14;
        const smoothT = Math.sin((t * Math.PI) / 2);
        coneTiltZ = -smoothT * 0.60; // tilt ~34 degrees
        coneShiftX = CONE_BASE_X + smoothT * 0.68;
        coneShiftY = smoothT * 0.35;
      } else if (pourAnimationProgress < 0.76) {
        // Phase 3, 4, 5, 6: Active pouring hold
        coneTiltZ = -0.60;
        coneShiftX = CONE_BASE_X + 0.68;
        coneShiftY = 0.35;
      } else if (pourAnimationProgress < 0.88) {
        // Phase 7: Returning upright
        const t = (pourAnimationProgress - 0.76) / 0.12;
        const smoothT = Math.cos((t * Math.PI) / 2);
        coneTiltZ = -smoothT * 0.60;
        coneShiftX = CONE_BASE_X + smoothT * 0.68;
        coneShiftY = smoothT * 0.35;
      } else {
        // Phase 8 & 9: Standing upright, refilling / unlocked
        coneTiltZ = 0;
        coneShiftX = CONE_BASE_X;
        coneShiftY = 0;
      }
    }

    // Apply Cone Transform
    coneStructureRef.current.group.rotation.z = coneTiltZ;
    coneStructureRef.current.group.position.set(coneShiftX, coneShiftY, 0);

    // 2. Update Cone Geometry
    updateConeFunnel(coneStructureRef.current, radius, height, coneFill);

    // 3. Update Cylinder Geometry
    updateCylinderCup(cylStructureRef.current, radius, height, cylinderFill, pourCount);

    // 4. Update Fluid Stream
    const cylWaterHeight = cylinderFill * height;
    updateWaterStream(
      streamStructureRef.current,
      isPouring,
      pourAnimationProgress,
      coneStructureRef.current.group.position,
      cylStructureRef.current.group.position,
      radius,
      height,
      radius,
      height,
      cylWaterHeight
    );
  }, [radius, height, coneFill, cylinderFill, pourCount, isPouring, pourAnimationProgress]);

  return (
    <div className={`relative w-full h-[420px] sm:h-[500px] md:h-[540px] bg-slate-50 overflow-hidden select-none ${className}`}>
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Educational Camera Modes Toolbar */}
      <div className="absolute top-4 right-4 z-20 flex flex-wrap items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-sm">
        <button
          type="button"
          onClick={() => onCameraModeChange ? onCameraModeChange('DEFAULT_VIEW') : applyCameraMode('DEFAULT_VIEW')}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
            cameraMode === 'DEFAULT_VIEW'
              ? 'bg-orange-500 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
          title="Góc nhìn toàn cảnh chuẩn"
        >
          <Compass className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Góc nhìn chuẩn</span>
        </button>

        <button
          type="button"
          onClick={() => onCameraModeChange ? onCameraModeChange('EXPERIMENT_VIEW') : applyCameraMode('EXPERIMENT_VIEW')}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
            cameraMode === 'EXPERIMENT_VIEW'
              ? 'bg-orange-500 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
          title="Góc nhìn cận cảnh dòng nước đổ"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Quan sát dòng đổ</span>
        </button>

        <button
          type="button"
          onClick={() => onCameraModeChange ? onCameraModeChange('X_RAY_VIEW') : applyCameraMode('X_RAY_VIEW')}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
            cameraMode === 'X_RAY_VIEW'
              ? 'bg-orange-500 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
          title="Thành kính siêu trong suốt, nhìn rõ các mức nước"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">X-Ray trong suốt</span>
        </button>
      </div>

      {/* Top Badges for Funnel and Cup */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/95 border border-orange-200 shadow-sm text-xs font-bold text-orange-950 backdrop-blur-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
          <span>Phễu Nón ({Math.round(coneFill * 100)}% nước)</span>
        </div>
      </div>

      <div className="absolute top-14 sm:top-4 right-4 sm:right-72 z-20 pointer-events-none">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/95 border border-sky-200 shadow-sm text-xs font-bold text-sky-950 backdrop-blur-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
          <span>Cốc Trụ ({Math.round(cylinderFill * 100)}% đầy)</span>
        </div>
      </div>

      {/* Water Trace Active Badge during Pour */}
      {isPouring && annotations.streamFlow.visible && (
        <div
          className="absolute z-20 pointer-events-none transition-all duration-75"
          style={{
            left: `${annotations.streamFlow.x}px`,
            top: `${annotations.streamFlow.y - 18}px`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-sky-500 text-white font-bold text-[11px] shadow-md animate-pulse">
            <span>Dòng nước: Phễu Nón</span>
            <ArrowRight className="w-3.5 h-3.5" />
            <span>Cốc Trụ</span>
          </div>
        </div>
      )}

      {/* Dynamic 3D Projected Screen Labels */}
      {/* 1. Level Markers on Cylinder Cup */}
      {annotations.level1.visible && (
        <div
          className="absolute z-10 pointer-events-none transition-all duration-75"
          style={{
            left: `${annotations.level1.x + 8}px`,
            top: `${annotations.level1.y - 12}px`,
            transform: 'translateY(-50%)'
          }}
        >
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border shadow-xs backdrop-blur-xs whitespace-nowrap ${
              pourCount >= 1
                ? 'bg-emerald-50/95 border-emerald-300 text-emerald-800'
                : 'bg-white/90 border-slate-200 text-slate-600'
            }`}
          >
            {pourCount >= 1 ? (
              <Check className="w-3 h-3 text-emerald-600 shrink-0" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
            )}
            <span>Mức 1/3 (h/3) {pourCount >= 1 ? '— Đã đổ 1 ✓' : '— Chờ đổ 1'}</span>
          </div>
        </div>
      )}

      {annotations.level2.visible && (
        <div
          className="absolute z-10 pointer-events-none transition-all duration-75"
          style={{
            left: `${annotations.level2.x + 8}px`,
            top: `${annotations.level2.y - 12}px`,
            transform: 'translateY(-50%)'
          }}
        >
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border shadow-xs backdrop-blur-xs whitespace-nowrap ${
              pourCount >= 2
                ? 'bg-emerald-50/95 border-emerald-300 text-emerald-800'
                : 'bg-white/90 border-slate-200 text-slate-600'
            }`}
          >
            {pourCount >= 2 ? (
              <Check className="w-3 h-3 text-emerald-600 shrink-0" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
            )}
            <span>Mức 2/3 (2h/3) {pourCount >= 2 ? '— Đã đổ 2 ✓' : '— Chờ đổ 2'}</span>
          </div>
        </div>
      )}

      {annotations.level3.visible && (
        <div
          className="absolute z-10 pointer-events-none transition-all duration-75"
          style={{
            left: `${annotations.level3.x + 8}px`,
            top: `${annotations.level3.y - 12}px`,
            transform: 'translateY(-50%)'
          }}
        >
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border shadow-xs backdrop-blur-xs whitespace-nowrap ${
              pourCount >= 3
                ? 'bg-emerald-50/95 border-emerald-400 text-emerald-900 ring-2 ring-emerald-200'
                : 'bg-white/90 border-slate-200 text-slate-600'
            }`}
          >
            {pourCount >= 3 ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
            )}
            <span>Mức 3/3 (h) {pourCount >= 3 ? '— Đầy 100% ✓' : '— Chờ đổ 3'}</span>
          </div>
        </div>
      )}

      {/* Height Dimension Badges */}
      {annotations.coneDimH.visible && (
        <div
          className="absolute z-10 pointer-events-none"
          style={{
            left: `${annotations.coneDimH.x}px`,
            top: `${annotations.coneDimH.y}px`,
            transform: 'translate(-100%, -50%)'
          }}
        >
          <span className="px-2 py-0.5 rounded-md bg-white/90 border border-slate-200 text-[11px] font-mono font-bold text-slate-600 shadow-2xs">
            h = {height.toFixed(2)} cm
          </span>
        </div>
      )}

      {/* Radius Dimension Badges */}
      {annotations.coneDimR.visible && (
        <div
          className="absolute z-10 pointer-events-none"
          style={{
            left: `${annotations.coneDimR.x}px`,
            top: `${annotations.coneDimR.y}px`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <span className="px-2 py-0.5 rounded-md bg-orange-50/90 border border-orange-200 text-[11px] font-mono font-bold text-orange-800 shadow-2xs">
            R = {radius.toFixed(2)} cm
          </span>
        </div>
      )}

      {/* Invariant Info Overlay Badge on bottom-left */}
      <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200 shadow-xs text-[11px] font-semibold text-slate-600 backdrop-blur-xs">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>Đồng bộ: <strong>R_nón = R_trụ</strong> &amp; <strong>h_nón = h_trụ</strong></span>
        </div>
      </div>
    </div>
  );
};
