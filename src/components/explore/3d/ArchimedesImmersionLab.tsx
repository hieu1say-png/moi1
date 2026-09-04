/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ARCHIMEDES IMMERSION LAB (THREE.JS 3D WEBGL)
 * - [S] Science: Thí nghiệm Archimedes với thanh đo mực nước thực tế và tỷ trọng chất lỏng.
 * - [T] Technology: Tối ưu hóa 60 FPS WebGL, hỗ trợ cảm ứng đa điểm phóng to/xoay tự do.
 * - Simulates submerging a metal sphere into a clear cylindrical water container.
 * - Real-time calculation of water level rise: Δh = (4/3) * R.
 * - Visual proof of Archimedes' golden ratio: V_sphere = (2/3) * V_cylinder (circumscribed).
 * - Multi-liquid density selector: Water, Seawater, Oil, Mercury.
 * - Real graduated physical beaker scale readout with ml / cm³ / cm.
 */

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  RotateCcw,
  Droplets,
  ArrowDown,
  ArrowUp,
  Award,
  CheckCircle2,
  FlaskConical,
  Scale,
  Activity,
  Gauge
} from 'lucide-react';
import { MathFormula } from '../../common/MathFormula';

export interface LiquidType {
  id: string;
  name: string;
  density: number; // g/cm3
  gravityN: number; // N/m3
  colorHex: number;
  textColor: string;
  badgeBg: string;
  description: string;
}

const LIQUID_TYPES: LiquidType[] = [
  {
    id: 'water',
    name: 'Nước cất (H₂O)',
    density: 1.0,
    gravityN: 10000,
    colorHex: 0x38bdf8,
    textColor: 'text-sky-700',
    badgeBg: 'bg-sky-50 border-sky-300',
    description: 'Chất lỏng chuẩn quy ước d = 10 000 N/m³'
  },
  {
    id: 'seawater',
    name: 'Nước biển mặn',
    density: 1.03,
    gravityN: 10300,
    colorHex: 0x0284c7,
    textColor: 'text-blue-800',
    badgeBg: 'bg-blue-50 border-blue-300',
    description: 'Tỷ trọng tăng do độ mặn muối biển, lực đẩy FA lớn hơn'
  },
  {
    id: 'oil',
    name: 'Dầu ăn thực vật',
    density: 0.8,
    gravityN: 8000,
    colorHex: 0xeab308,
    textColor: 'text-amber-800',
    badgeBg: 'bg-amber-50 border-amber-300',
    description: 'Dầu nhẹ hơn nước, nổi lên trên, lực đẩy FA giảm'
  },
  {
    id: 'mercury',
    name: 'Thủy ngân (Hg)',
    density: 13.6,
    gravityN: 136000,
    colorHex: 0x94a3b8,
    textColor: 'text-slate-800',
    badgeBg: 'bg-slate-100 border-slate-300',
    description: 'Kim loại lỏng siêu đậm đặc, lực đẩy FA cực đại'
  }
];

export interface ArchimedesImmersionLabProps {
  initialRadius?: number;
  className?: string;
}

export const ArchimedesImmersionLab: React.FC<ArchimedesImmersionLabProps> = ({
  initialRadius = 3,
  className = ''
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // States
  const [radius, setRadius] = useState<number>(initialRadius); // Sphere & Cylinder radius (cm)
  const [immersionProgress, setImmersionProgress] = useState<number>(0); // 0 (above water) to 1 (fully submerged)
  const [isAutoDropping, setIsAutoDropping] = useState<boolean>(false);
  const [dropDirection, setDropDirection] = useState<'down' | 'up'>('down');
  const [selectedLiquid, setSelectedLiquid] = useState<LiquidType>(LIQUID_TYPES[0]);

  // Cylinder container height is 3.5 * R to have ample room
  const cylinderHeight = useMemo(() => radius * 3.5, [radius]);
  const initialWaterHeight = useMemo(() => radius * 1.2, [radius]);
  const maxWaterRise = useMemo(() => (4 / 3) * radius, [radius]);

  // Current physical positions
  const currentWaterHeight = useMemo(() => {
    return initialWaterHeight + immersionProgress * maxWaterRise;
  }, [initialWaterHeight, immersionProgress, maxWaterRise]);

  // Initial water volume in beaker: V_0 = pi * r^2 * h_0 (cm3 = ml)
  const initialWaterVolumeMl = useMemo(() => {
    return Math.PI * radius * radius * initialWaterHeight;
  }, [radius, initialWaterHeight]);

  // Sphere resting Y position
  const sphereSuspendedY = useMemo(() => cylinderHeight + 0.8, [cylinderHeight]);
  const sphereSubmergedY = useMemo(() => radius + 0.2, [radius]);
  const currentSphereY = useMemo(() => {
    return sphereSuspendedY - immersionProgress * (sphereSuspendedY - sphereSubmergedY);
  }, [sphereSuspendedY, sphereSubmergedY, immersionProgress]);

  // KaTeX computations & Physics values
  const mathProof = useMemo(() => {
    const r = radius;
    const vSphere = (4 / 3) * Math.PI * Math.pow(r, 3);
    const vCylinderCircumscribed = 2 * Math.PI * Math.pow(r, 3); // h = 2r
    const deltaH = (4 / 3) * r;
    const deltaV = vSphere * immersionProgress; // cm3 = ml
    const totalCurrentWaterVolumeMl = initialWaterVolumeMl + deltaV;

    // Displaced mass m = D * deltaV (grams)
    const displacedMassG = selectedLiquid.density * deltaV;
    // Buoyant force F_A = d * V = (gravityN * (deltaV / 1,000,000)) (N)
    const buoyantForceN = selectedLiquid.gravityN * (deltaV / 1000000);

    return {
      rVal: r.toFixed(1),
      vSphereExact: `\\frac{4}{3}\\pi \\cdot ${r}^3`,
      vSphereNum: vSphere.toFixed(2),
      vCylinderCircumscribedNum: vCylinderCircumscribed.toFixed(2),
      deltaHNum: deltaH.toFixed(2),
      currentDeltaVNum: deltaV.toFixed(2),
      currentWaterLevel: currentWaterHeight.toFixed(2),
      totalCurrentWaterVolumeMl: totalCurrentWaterVolumeMl.toFixed(1),
      displacedMassG: displacedMassG.toFixed(1),
      buoyantForceN: buoyantForceN.toFixed(3)
    };
  }, [radius, immersionProgress, currentWaterHeight, initialWaterVolumeMl, selectedLiquid]);

  // Initialize Three.js WebGL Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const heightPx = container.clientHeight || 460;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfffdf8);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 100);
    camera.position.set(10, 8, 14);
    cameraRef.current = camera;

    // 3. Renderer with high performance & smooth touch
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Controls with Multi-Touch support
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 6;
    controls.maxDistance = 35;
    controls.target.set(0, 4, 0);
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN
    };
    controlsRef.current = controls;

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffaed, 1.4);
    dirLight.position.set(12, 20, 15);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xcceeff, 0.7);
    fillLight.position.set(-10, 10, -10);
    scene.add(fillLight);

    // 6. Ground grid
    const grid = new THREE.GridHelper(20, 20, 0xddcbb5, 0xede4d5);
    grid.position.y = -0.01;
    scene.add(grid);

    // Render loop (Target 60 FPS)
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

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

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Dynamic Meshes in WebGL Scene
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    let labGroup = scene.getObjectByName('archimedesGroup') as THREE.Group | null;
    if (labGroup) {
      scene.remove(labGroup);
      labGroup.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const m = obj as THREE.Mesh;
          m.geometry?.dispose();
          if (Array.isArray(m.material)) m.material.forEach((mat) => mat.dispose());
          else m.material?.dispose();
        }
      });
    }

    labGroup = new THREE.Group();
    labGroup.name = 'archimedesGroup';
    scene.add(labGroup);

    // 1. GLASS CYLINDRICAL CONTAINER (Bình đo hình trụ trong suốt)
    const glassGeo = new THREE.CylinderGeometry(radius, radius, cylinderHeight, 48, 1, true);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 0.35,
      transparent: true,
      roughness: 0.05,
      ior: 1.5,
      side: THREE.DoubleSide
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.position.y = cylinderHeight / 2;
    labGroup.add(glassMesh);

    // Base of glass beaker
    const baseGeo = new THREE.CircleGeometry(radius, 48);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0xb0c4de,
      roughness: 0.2,
      metalness: 0.1,
      side: THREE.DoubleSide
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.rotation.x = Math.PI / 2;
    baseMesh.position.y = 0.01;
    labGroup.add(baseMesh);

    // Glass rim ring (top)
    const rimGeo = new THREE.TorusGeometry(radius, 0.06, 16, 48);
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x99ccff, roughness: 0.2 });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = cylinderHeight;
    labGroup.add(rimMesh);

    // Graduation Tick Marks on Glass
    for (let h = 1; h <= Math.floor(cylinderHeight); h++) {
      const isMajor = h % 2 === 0;
      const tickGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(radius * 0.95, h, 0),
        new THREE.Vector3(radius * (isMajor ? 1.08 : 1.03), h, 0)
      ]);
      const tickMat = new THREE.LineBasicMaterial({ color: isMajor ? 0x1e293b : 0x64748b, linewidth: isMajor ? 3 : 1 });
      const tick = new THREE.Line(tickGeo, tickMat);
      labGroup.add(tick);
    }

    // 2. WATER MESH (TRANSLUCENT CYLINDER WITH RISING HEIGHT & DYNAMIC LIQUID COLOR)
    if (currentWaterHeight > 0.1) {
      const waterGeo = new THREE.CylinderGeometry(radius * 0.98, radius * 0.98, currentWaterHeight, 48);
      const waterMat = new THREE.MeshPhysicalMaterial({
        color: selectedLiquid.colorHex,
        transmission: 0.65,
        opacity: 0.85,
        transparent: true,
        roughness: 0.15,
        ior: 1.333
      });
      const waterMesh = new THREE.Mesh(waterGeo, waterMat);
      waterMesh.position.y = currentWaterHeight / 2;
      labGroup.add(waterMesh);

      // Water Surface Meniscus Disc
      const waterSurfaceGeo = new THREE.CircleGeometry(radius * 0.98, 48);
      const waterSurfaceMat = new THREE.MeshStandardMaterial({
        color: selectedLiquid.colorHex,
        roughness: 0.1,
        metalness: 0.1,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide
      });
      const waterSurfaceMesh = new THREE.Mesh(waterSurfaceGeo, waterSurfaceMat);
      waterSurfaceMesh.rotation.x = Math.PI / 2;
      waterSurfaceMesh.position.y = currentWaterHeight;
      labGroup.add(waterSurfaceMesh);
    }

    // Initial Water Level Indicator (Red Reference Ring)
    const initRingGeo = new THREE.TorusGeometry(radius * 1.02, 0.03, 12, 48);
    const initRingMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const initRing = new THREE.Mesh(initRingGeo, initRingMat);
    initRing.rotation.x = Math.PI / 2;
    initRing.position.y = initialWaterHeight;
    labGroup.add(initRing);

    // 3. SOLID METAL SPHERE (Quả cầu kim loại chìm trong nước)
    const sphereGeo = new THREE.SphereGeometry(radius, 48, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.25
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.position.set(0, currentSphereY, 0);
    sphereMesh.castShadow = true;
    labGroup.add(sphereMesh);

    // Suspension Thread Line
    const threadPoints = [
      new THREE.Vector3(0, cylinderHeight + 4, 0),
      new THREE.Vector3(0, currentSphereY + radius, 0)
    ];
    const threadGeo = new THREE.BufferGeometry().setFromPoints(threadPoints);
    const threadMat = new THREE.LineBasicMaterial({ color: 0x111111, linewidth: 2 });
    const threadLine = new THREE.Line(threadGeo, threadMat);
    labGroup.add(threadLine);

    // Ring eyelet on top of sphere
    const eyeletGeo = new THREE.TorusGeometry(0.18, 0.04, 12, 24);
    const eyeletMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.9 });
    const eyelet = new THREE.Mesh(eyeletGeo, eyeletMat);
    eyelet.position.set(0, currentSphereY + radius, 0);
    labGroup.add(eyelet);

  }, [radius, cylinderHeight, initialWaterHeight, currentWaterHeight, currentSphereY, selectedLiquid]);

  // Auto-drop/pull animation loop
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isAutoDropping) {
      timer = setInterval(() => {
        setImmersionProgress((prev) => {
          if (dropDirection === 'down') {
            const next = prev + 0.015;
            if (next >= 1) {
              setIsAutoDropping(false);
              return 1;
            }
            return next;
          } else {
            const next = prev - 0.015;
            if (next <= 0) {
              setIsAutoDropping(false);
              return 0;
            }
            return next;
          }
        });
      }, 20);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAutoDropping, dropDirection]);

  return (
    <div className={`w-full bg-[#FFFDF8] rounded-2xl border border-[#E2EADF] shadow-sm p-4 sm:p-6 space-y-5 ${className}`}>
      {/* 1. Header with STEM badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2EADF] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] text-xs font-bold flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5" />
              [S] Khoa Học Thực Nghiệm Archimedes
            </span>
            <span className="text-[10px] font-mono text-[#658473] bg-[#F4F8F3] px-2 py-0.5 rounded border border-[#E2EADF]">
              WebGL 60 FPS • Đa điểm
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#0F291E] tracking-tight mt-1">
            Thí Nghiệm Nhúng Chìm Archimedes Đo Thể Tích &amp; Tỷ Trọng
          </h3>
          <p className="text-xs text-[#52705E] font-medium mt-0.5">
            Thả khối cầu kim loại vào bình trụ chia độ, đo thể tích dâng <MathFormula formula="V_{cầu} = \frac{2}{3}V_{trụ}" inline /> và tính lực đẩy Archimedes <MathFormula formula="F_A = d \cdot V" inline /> theo thời gian thực.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => {
              setDropDirection('down');
              setIsAutoDropping(true);
            }}
            disabled={immersionProgress >= 1}
            className="px-3 py-2 rounded-xl bg-[#16A34A] text-white font-bold text-xs shadow-xs hover:bg-[#15803D] disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowDown className="w-4 h-4" />
            Thả Chìm Cầu
          </button>
          <button
            onClick={() => {
              setDropDirection('up');
              setIsAutoDropping(true);
            }}
            disabled={immersionProgress <= 0}
            className="px-3 py-2 rounded-xl bg-white text-[#0F291E] font-bold text-xs border border-[#E2EADF] shadow-xs hover:bg-[#F8FAF5] disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
            Kéo Cầu Lên
          </button>
          <button
            onClick={() => {
              setIsAutoDropping(false);
              setImmersionProgress(0);
            }}
            className="p-2 rounded-xl bg-[#F8FAF5] text-[#334E40] font-bold border border-[#E2EADF] hover:bg-[#EAEFE8] cursor-pointer"
            title="Đặt lại trạng thái ban đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Liquid Density Selector Pills */}
      <div className="bg-[#F8FAF5] p-3 rounded-xl border border-[#E2EADF] space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#0F291E] flex items-center gap-1.5">
            <Droplets className="w-4 h-4 text-[#16A34A]" />
            Chọn chất lỏng thí nghiệm (Tỷ trọng D):
          </span>
          <span className="text-[11px] text-[#52705E] font-mono">
            d = {selectedLiquid.gravityN.toLocaleString()} N/m³
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {LIQUID_TYPES.map((liq) => {
            const isSelected = selectedLiquid.id === liq.id;
            return (
              <button
                key={liq.id}
                type="button"
                onClick={() => setSelectedLiquid(liq)}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#16A34A] shadow-xs ring-2 ring-[#16A34A]/20'
                    : 'bg-white/60 border-[#E2EADF] hover:bg-white hover:border-[#CBD5E1]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isSelected ? 'text-[#16A34A]' : 'text-[#0F291E]'}`}>
                    {liq.name}
                  </span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />}
                </div>
                <div className="text-[11px] font-mono text-[#658473] mt-0.5">
                  D = {liq.density.toFixed(2)} g/cm³
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. 3D WebGL Canvas with Physical Graduated Scale Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* 3D Viewport (9 cols) */}
        <div className="lg:col-span-9 relative w-full h-[380px] sm:h-[440px] bg-gradient-to-b from-[#FFFDF8] to-[#EBF6EC] rounded-2xl border border-[#E2EADF] overflow-hidden shadow-inner">
          <div
            ref={mountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            style={{ touchAction: 'none' }}
          />

          {/* Visual Legend Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
            <div className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#E2EADF] text-xs font-bold text-[#0F291E] shadow-xs">
              💧 Mức nước dâng: <span className="text-[#16A34A]">+{ (immersionProgress * maxWaterRise).toFixed(2) } cm</span> ({(immersionProgress * 100).toFixed(0)}% chìm)
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-black/75 text-white text-[10px] font-bold">
              🔴 Vạch đỏ: Mực nước ban đầu ({initialWaterHeight.toFixed(1)} cm)
            </div>
          </div>

          {/* 60 FPS & Multi-touch Indicator */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-[#E2EADF] text-[10px] font-bold text-[#059669]">
            <Activity className="w-3 h-3 animate-pulse" />
            <span>60 FPS WebGL</span>
          </div>

          {/* Live Displaced Volume Indicator */}
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#E2EADF] shadow-sm text-xs font-bold space-y-0.5">
            <div className="text-[#658473]">Thể tích nước dâng ΔV:</div>
            <div className="text-base text-[#16A34A] font-black">
              {mathProof.currentDeltaVNum} <span className="text-xs font-bold text-[#658473]">ml (cm³)</span>
            </div>
            <div className="text-[10px] text-[#52705E] pt-0.5 border-t border-[#E2EADF]">
              Khối lượng dâng: <strong>{mathProof.displacedMassG} g</strong>
            </div>
          </div>
        </div>

        {/* Physical Graduated Scale Bar (Thước đo ống đong thực tế - 3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E2EADF] p-4 flex flex-col justify-between shadow-2xs">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F291E]">
              <Gauge className="w-4 h-4 text-[#16A34A]" />
              Thanh Đo Ống Đong
            </div>
            <p className="text-[11px] text-[#658473]">
              Theo dõi vạch chia độ thể tích thực tế trong bình trụ
            </p>
          </div>

          {/* Graduated Tube Simulation */}
          <div className="relative my-3 h-[240px] w-full bg-[#F4F8F3] rounded-xl border-2 border-[#CBD5E1] p-2 flex flex-col justify-between overflow-hidden">
            {/* Liquid Fill Level in Tube */}
            <div
              className="absolute bottom-0 inset-x-0 transition-all duration-150 rounded-b-lg opacity-85"
              style={{
                height: `${Math.min(100, (parseFloat(mathProof.currentWaterLevel) / cylinderHeight) * 100)}%`,
                backgroundColor: `#${selectedLiquid.colorHex.toString(16).padStart(6, '0')}`
              }}
            >
              {/* Meniscus surface line */}
              <div className="w-full h-1 bg-white/70 shadow-2xs" />
            </div>

            {/* Scale Ticks */}
            {[5, 4, 3, 2, 1, 0].map((step) => {
              const tickH = (cylinderHeight / 5) * step;
              return (
                <div key={step} className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#475569]">
                  <div className="w-3 h-[1px] bg-slate-400" />
                  <span className="font-bold">{tickH.toFixed(1)} cm</span>
                </div>
              );
            })}
          </div>

          {/* Real-time Physical Readout */}
          <div className="space-y-1 text-xs bg-[#F8FAF5] p-2.5 rounded-xl border border-[#E2EADF]">
            <div className="flex justify-between">
              <span className="text-[#658473]">Tổng thể tích:</span>
              <span className="font-bold text-[#0F291E]">{mathProof.totalCurrentWaterVolumeMl} ml</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#658473]">Lực đẩy FA:</span>
              <span className="font-bold text-[#16A34A]">{mathProof.buoyantForceN} N</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Interactive Immersion Slider & Radius Adjustment */}
      <div className="bg-white p-4 rounded-xl border border-[#E2EADF] shadow-2xs space-y-4">
        {/* Immersion Level Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-[#0F291E]">
            <span>0% (Quả cầu ở ngoài)</span>
            <span className="text-[#16A34A]">Mức độ chìm trong chất lỏng: {Math.round(immersionProgress * 100)}%</span>
            <span>100% (Ngập hoàn toàn)</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={immersionProgress}
            onChange={(e) => {
              setIsAutoDropping(false);
              setImmersionProgress(parseFloat(e.target.value));
            }}
            className="w-full h-2.5 bg-[#E2EADF] rounded-lg appearance-none cursor-pointer accent-[#16A34A]"
          />
        </div>

        {/* Radius Slider */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#E2EADF]">
          <div className="text-xs font-bold text-[#0F291E]">
            Bán kính cầu &amp; đáy bình trụ R: <span className="text-[#16A34A] font-mono font-black">{radius} cm</span>
          </div>
          <input
            type="range"
            min="2"
            max="4.5"
            step="0.5"
            value={radius}
            onChange={(e) => setRadius(parseFloat(e.target.value))}
            className="w-full sm:w-48 h-2 bg-[#E2EADF] rounded appearance-none cursor-pointer accent-[#16A34A]"
          />
        </div>
      </div>

      {/* 5. Pedagogical Archimedes Mathematical Proof */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Thể tích quả cầu */}
        <div className="bg-[#FBF8EF] p-4 rounded-xl border border-[#EFE5CD] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#856404]">
            <Scale className="w-4 h-4" />
            1. Thể Tích Khối Cầu
          </div>
          <div className="text-sm font-bold text-[#0F291E]">
            <MathFormula formula="V_{cầu} = \frac{4}{3}\pi R^3" inline />
          </div>
          <p className="text-xs text-[#594D46]">
            = <MathFormula formula={mathProof.vSphereExact} inline /> ≈ <strong>{mathProof.vSphereNum} cm³</strong>
          </p>
        </div>

        {/* Card 2: Cột nước dâng lên */}
        <div className="bg-[#F0FDF4] p-4 rounded-xl border border-[#BBF7D0] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#15803D]">
            <Droplets className="w-4 h-4" />
            2. Độ Dâng Cột Nước (Δh)
          </div>
          <div className="text-sm font-bold text-[#15803D]">
            <MathFormula formula="\Delta h = \frac{\Delta V}{\pi R^2} = \frac{4}{3}R" inline />
          </div>
          <p className="text-xs text-[#166534] font-medium">
            Khi ngập hết: Δh = <strong>{mathProof.deltaHNum} cm</strong>
          </p>
        </div>

        {/* Card 3: Tỉ số Archimedes 2/3 */}
        <div className="bg-[#ECFDF5] p-4 rounded-xl border border-[#A7F3D0] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#059669]">
            <Award className="w-4 h-4" />
            3. Tỉ Số Vàng 2/3
          </div>
          <div className="text-sm font-bold text-[#065F46]">
            <MathFormula formula="\frac{V_{cầu}}{V_{trụ\,ngoại\,tiếp}} = \frac{2}{3}" inline />
          </div>
          <p className="text-[11px] text-[#047857] font-medium">
            Khối trụ ngoại tiếp chứa vừa khít khối cầu có <MathFormula formula="h = 2R" inline />.
          </p>
        </div>
      </div>
    </div>
  );
};
