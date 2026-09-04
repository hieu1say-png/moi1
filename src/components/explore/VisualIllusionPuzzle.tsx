/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * TRẠM DỪNG CHÂN: CÚ LỪA CỦA THỊ GIÁC (Visual Illusion Puzzle)
 * HỌC VIỆN KHÔNG GIAN 3D – TOÁN THCS – THẦY HIẾU
 *
 * Mục tiêu sư phạm:
 * Giúp học sinh nhận ra rằng cảm giác thị giác không quyết định thể tích;
 * Cần sử dụng mô hình toán học và công thức thể tích hình trụ: V = π * R² * h.
 * "Cốc cao hơn chưa chắc chứa được nhiều nước hơn."
 *
 * Tỷ lệ toán học chuẩn:
 * - Cốc A: R = 2, h = 1  => V_A = π * 2² * 1 = 4π
 * - Cốc B: R = 1, h = 4  => V_B = π * 1² * 4 = 4π
 * => V_A = V_B = 4π
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Sparkles,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Droplets,
  Box,
  Eye,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  ArrowRight,
  Info,
  Maximize2,
  Award
} from 'lucide-react';
import { MathFormula, InlineMath, BlockMath } from '../common/MathFormula';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useApp } from '../../context/AppContext';

export interface VisualIllusionPuzzleProps {
  onComplete?: (isCorrect: boolean, attempts: number) => void;
  className?: string;
  initialMode?: '2d' | '3d';
}

type AnswerOption = 'A' | 'B' | 'EQUAL';
type TeacherState = 'IDLE' | 'THINKING' | 'HINT' | 'SUCCESS' | 'POINTING';

export const VisualIllusionPuzzle: React.FC<VisualIllusionPuzzleProps> = ({
  onComplete,
  className = '',
  initialMode = '2d'
}) => {
  const { markPracticeDone, recordAttempt } = useApp();

  // Core Puzzle States
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerOption | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'2d' | '3d'>(initialMode);
  const [isPouringWater, setIsPouringWater] = useState<boolean>(false);
  const [waterProgress, setWaterProgress] = useState<number>(1); // 0 to 1

  // Pedagogical Step Animation State (Section VII)
  const [animStep, setAnimStep] = useState<number>(0); // 0: Idle, 1: RA², 2: VA, 3: RB², 4: VB, 5: Match!
  const [isAutoPlayingAnim, setIsAutoPlayingAnim] = useState<boolean>(false);

  // Teacher Avatar State
  const [teacherState, setTeacherState] = useState<TeacherState>('IDLE');
  const [teacherSubtitle, setTeacherSubtitle] = useState<string>(
    'Đừng vội tin vào chiều cao của chiếc cốc. Em hãy thử dự đoán trước nhé!'
  );

  // 3D Canvas Refs
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const threeSceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;
    waterMeshA: THREE.Mesh;
    waterMeshB: THREE.Mesh;
    reqId: number | null;
  } | null>(null);

  // Handle Option Selection
  const handleSelectAnswer = (option: AnswerOption) => {
    const isAnsCorrect = option === 'EQUAL';
    setSelectedAnswer(option);
    setHasAnswered(true);
    setIsCorrect(isAnsCorrect);
    const newAttempts = attemptCount + 1;
    setAttemptCount(newAttempts);
    setShowExplanation(true);

    if (isAnsCorrect) {
      setTeacherState('SUCCESS');
      const text = 'Chính xác! Hai cốc có cùng thể tích. Muốn biết chắc, hãy nhìn vào R² nhé!';
      setTeacherSubtitle(text);
      markPracticeDone('puzzle-visual-illusion-1', 60);
      recordAttempt({
        id: `attempt-puzzle-${Date.now()}`,
        exerciseId: 'puzzle-visual-illusion-1',
        studentId: 'current-student',
        selectedOptionIndex: 2,
        isCorrect: true,
        timeSpentSeconds: 25,
        timestamp: new Date().toISOString()
      });
      if (onComplete) onComplete(true, newAttempts);
    } else if (option === 'A') {
      setTeacherState('THINKING');
      const text = 'Hihi, mắt lừa ta rồi đúng không? Cùng tính thử xem nhé!';
      setTeacherSubtitle(text);
      if (onComplete) onComplete(false, newAttempts);
    } else {
      // Option B
      setTeacherState('THINKING');
      const text = 'Cốc B trông cao hơn thật đấy! Nhưng chiều cao chưa quyết định thể tích. Cùng tính thử nhé!';
      setTeacherSubtitle(text);
      if (onComplete) onComplete(false, newAttempts);
    }
  };

  // Reset Puzzle
  const handleResetPuzzle = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    setIsCorrect(false);
    setShowExplanation(false);
    setAnimStep(0);
    setIsAutoPlayingAnim(false);
    setIsPouringWater(false);
    setWaterProgress(1);
    setTeacherState('IDLE');
    setTeacherSubtitle('Đừng vội tin vào chiều cao của chiếc cốc. Em hãy thử dự đoán trước nhé!');
  };

  // Auto-play synchronized mathematical animation (Section VII)
  useEffect(() => {
    let timer: any;
    if (isAutoPlayingAnim) {
      timer = setInterval(() => {
        setAnimStep((prev) => {
          if (prev >= 5) {
            setIsAutoPlayingAnim(false);
            return 5;
          }
          return prev + 1;
        });
      }, 1400);
    }
    return () => clearInterval(timer);
  }, [isAutoPlayingAnim]);

  // Water pouring animation loop
  useEffect(() => {
    let animId: number;
    if (isPouringWater) {
      const startTime = Date.now();
      const duration = 2800; // 2.8s

      const stepWater = () => {
        const elapsed = Date.now() - startTime;
        const p = Math.min(1, elapsed / duration);
        setWaterProgress(p);

        if (p < 1) {
          animId = requestAnimationFrame(stepWater);
        } else {
          setIsPouringWater(false);
        }
      };

      setWaterProgress(0);
      animId = requestAnimationFrame(stepWater);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPouringWater]);

  // Three.js 3D Viewer Setup (Section IX)
  useEffect(() => {
    if (viewMode !== '3d' || !canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 360;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfbf8f3); // Soft warm watercolor tone

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 4.5, 12);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controls.minDistance = 5;
    controls.maxDistance = 25;
    controls.target.set(0, 1.6, 0);
    controls.update();

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight.position.set(8, 14, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const softFillLight = new THREE.DirectionalLight(0xbbe1fa, 0.8);
    softFillLight.position.set(-8, 6, -6);
    scene.add(softFillLight);

    // Floor Base Plate
    const floorGeo = new THREE.PlaneGeometry(30, 20);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xf3ede2,
      roughness: 0.8
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.05;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Glass Material
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      transparent: true,
      opacity: 0.35,
      roughness: 0.08,
      transmission: 0.82,
      ior: 1.48,
      thickness: 0.15,
      side: THREE.DoubleSide
    });

    // Water Material
    const waterMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75,
      roughness: 0.1,
      transmission: 0.35,
      ior: 1.333,
      side: THREE.DoubleSide
    });

    // ----------------------------------------------------------------
    // CUP A: R = 2, h = 1 (Left: x = -3.2)
    // ----------------------------------------------------------------
    const cupAGroup = new THREE.Group();
    cupAGroup.position.set(-3.2, 0, 0);
    scene.add(cupAGroup);

    // Glass Outer Cylinder A (R=2, h=1)
    const glassAGeo = new THREE.CylinderGeometry(2, 2, 1, 48, 1, true);
    const glassAMesh = new THREE.Mesh(glassAGeo, glassMat);
    glassAMesh.position.y = 0.5;
    cupAGroup.add(glassAMesh);

    // Glass Base Plate A
    const glassABaseGeo = new THREE.CylinderGeometry(2, 2, 0.08, 48);
    const glassABaseMesh = new THREE.Mesh(glassABaseGeo, glassMat);
    glassABaseMesh.position.y = 0.04;
    cupAGroup.add(glassABaseMesh);

    // Water A
    const waterAGeo = new THREE.CylinderGeometry(1.95, 1.95, 1, 48);
    const waterAMesh = new THREE.Mesh(waterAGeo, waterMat);
    waterAMesh.position.y = 0.5;
    cupAGroup.add(waterAMesh);

    // Top Rim Ring A
    const rimAGeo = new THREE.RingGeometry(1.9, 2.05, 48);
    rimAGeo.rotateX(-Math.PI / 2);
    const rimAMesh = new THREE.Mesh(
      rimAGeo,
      new THREE.MeshBasicMaterial({ color: 0x93c5fd, side: THREE.DoubleSide })
    );
    rimAMesh.position.y = 1.01;
    cupAGroup.add(rimAMesh);

    // ----------------------------------------------------------------
    // CUP B: R = 1, h = 4 (Right: x = 3.2)
    // ----------------------------------------------------------------
    const cupBGroup = new THREE.Group();
    cupBGroup.position.set(3.2, 0, 0);
    scene.add(cupBGroup);

    // Glass Outer Cylinder B (R=1, h=4)
    const glassBGeo = new THREE.CylinderGeometry(1, 1, 4, 48, 1, true);
    const glassBMesh = new THREE.Mesh(glassBGeo, glassMat);
    glassBMesh.position.y = 2.0;
    cupBGroup.add(glassBMesh);

    // Glass Base Plate B
    const glassBBaseGeo = new THREE.CylinderGeometry(1, 1, 0.08, 48);
    const glassBBaseMesh = new THREE.Mesh(glassBBaseGeo, glassMat);
    glassBBaseMesh.position.y = 0.04;
    cupBGroup.add(glassBBaseMesh);

    // Water B
    const waterBGeo = new THREE.CylinderGeometry(0.96, 0.96, 4, 48);
    const waterBMesh = new THREE.Mesh(waterBGeo, waterMat);
    waterBMesh.position.y = 2.0;
    cupBGroup.add(waterBMesh);

    // Top Rim Ring B
    const rimBGeo = new THREE.RingGeometry(0.9, 1.05, 48);
    rimBGeo.rotateX(-Math.PI / 2);
    const rimBMesh = new THREE.Mesh(
      rimBGeo,
      new THREE.MeshBasicMaterial({ color: 0x93c5fd, side: THREE.DoubleSide })
    );
    rimBMesh.position.y = 4.01;
    cupBGroup.add(rimBMesh);

    threeSceneRef.current = {
      renderer,
      scene,
      camera,
      controls,
      waterMeshA: waterAMesh,
      waterMeshB: waterBMesh,
      reqId: null
    };

    // Render loop
    const animate = () => {
      threeSceneRef.current!.reqId = requestAnimationFrame(animate);
      controls.update();

      // Dynamic water height in 3D based on waterProgress state
      const p = waterProgress;
      const hA = p * 1;
      const hB = p * 4;

      if (hA > 0.01) {
        waterAMesh.visible = true;
        waterAMesh.scale.set(1, Math.max(0.001, p), 1);
        waterAMesh.position.y = hA / 2;
      } else {
        waterAMesh.visible = false;
      }

      if (hB > 0.01) {
        waterBMesh.visible = true;
        waterBMesh.scale.set(1, Math.max(0.001, p), 1);
        waterBMesh.position.y = hB / 2;
      } else {
        waterBMesh.visible = false;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (threeSceneRef.current?.reqId) {
        cancelAnimationFrame(threeSceneRef.current.reqId);
      }
      renderer.dispose();
      scene.clear();
      threeSceneRef.current = null;
    };
  }, [viewMode, waterProgress]);

  return (
    <div
      id="visual-illusion-puzzle-card"
      className={`relative w-full rounded-3xl bg-[#FFFDF8] border-2 border-[#E5DCCF] p-5 sm:p-7 shadow-paper overflow-hidden font-sans space-y-6 ${className}`}
    >
      {/* Background Soft Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(#C5B9AC 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* ------------------------------------------------------------- */}
      {/* 1. HEADER                                                     */}
      {/* ------------------------------------------------------------- */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DCCF]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#ED806F]/15 border border-[#ED806F]/30 text-[#C96859] text-[11px] font-bold tracking-wide uppercase">
              Thực Nghiệm Khám Phá
            </span>
            <span className="text-xs text-[#766A61] font-mono">Toán 9 • Hình Trụ</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#2E2926] tracking-tight">
            Trạm dừng chân: Cú lừa của thị giác
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-[#766A61]">
            Giải lao 1 phút!
          </p>
        </div>

        {/* Action Toggle Switch (2D Drawing vs 3D Interactive Model) */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="p-1 bg-[#F4EEE4] rounded-2xl border border-[#E5DCCF] flex items-center gap-1 shadow-2xs">
            <button
              type="button"
              id="puzzle-view-2d-btn"
              onClick={() => setViewMode('2d')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === '2d'
                  ? 'bg-[#FFFDF8] text-[#3A302B] shadow-xs'
                  : 'text-[#766A61] hover:text-[#3A302B]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Minh họa 2D</span>
            </button>
            <button
              type="button"
              id="puzzle-view-3d-btn"
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === '3d'
                  ? 'bg-[#ED806F] text-white shadow-xs'
                  : 'text-[#766A61] hover:text-[#3A302B]'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Xem mô hình 3D</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleResetPuzzle}
            className="p-2 rounded-xl bg-[#F4EEE4] hover:bg-[#EAE0D3] text-[#594D46] border border-[#E5DCCF] transition-colors cursor-pointer"
            title="Làm lại câu đố"
            aria-label="Làm lại"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2 & 3. VÙNG MINH HỌA & KÍCH THƯỚC (2D & 3D MODES)           */}
      {/* ------------------------------------------------------------- */}
      <div className="relative rounded-2xl bg-[#FAF6F0] border border-[#E8DFC8] p-4 sm:p-6 overflow-hidden">
        {viewMode === '2d' ? (
          <div className="w-full flex flex-col items-center justify-center">
            {/* Two Glasses Illustration Grid */}
            <div className="w-full max-w-2xl py-4 flex flex-row items-end justify-around gap-4 sm:gap-12 min-h-[300px] sm:min-h-[340px]">
              {/* ========================================= */}
              {/* LEFT: CỐC A (Wide & Low: R = 2, h = 1)   */}
              {/* ========================================= */}
              <div className="flex flex-col items-center gap-3 select-none">
                {/* Top Radius Arrow Annotation (R = 2) */}
                <div
                  className={`flex flex-col items-center gap-0.5 transition-all duration-300 ${
                    animStep === 1 || animStep === 2
                      ? 'scale-110 text-[#C96859] font-black'
                      : 'text-[#3A302B]'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-bold font-mono px-2 py-0.5 rounded-md bg-white/90 border border-[#E5DCCF] shadow-2xs">
                    R = 2
                  </span>
                  {/* Double headed arrow */}
                  <div className="relative w-36 sm:w-44 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-[#594D46]" />
                    <div className="absolute left-0 w-0 h-0 border-y-[4px] border-y-transparent border-r-[6px] border-r-[#594D46]" />
                    <div className="absolute right-0 w-0 h-0 border-y-[4px] border-y-transparent border-l-[6px] border-l-[#594D46]" />
                  </div>
                </div>

                {/* Glass Cylinder A + Height Annotation side-by-side */}
                <div className="flex items-center gap-3">
                  {/* Glass SVG Container */}
                  <div className="relative flex flex-col items-center">
                    <svg
                      width="150"
                      height="95"
                      viewBox="0 0 150 95"
                      className="drop-shadow-md overflow-visible"
                    >
                      {/* Glass Body gradient and water */}
                      <defs>
                        <linearGradient id="glassGradA" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                          <stop offset="25%" stopColor="#bae6fd" stopOpacity="0.4" />
                          <stop offset="75%" stopColor="#7dd3fc" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
                        </linearGradient>
                        <linearGradient id="waterGradA" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
                          <stop offset="50%" stopColor="#0284c7" stopOpacity="0.75" />
                          <stop offset="100%" stopColor="#0369a1" stopOpacity="0.85" />
                        </linearGradient>
                      </defs>

                      {/* Drop shadow ellipse below */}
                      <ellipse cx="75" cy="85" rx="65" ry="8" fill="rgba(58, 48, 43, 0.12)" />

                      {/* Glass Wall Body */}
                      <rect
                        x="10"
                        y="15"
                        width="130"
                        height="65"
                        fill="url(#glassGradA)"
                        stroke="#7dd3fc"
                        strokeWidth="1.5"
                      />

                      {/* Water Fill Body based on waterProgress */}
                      <g opacity={waterProgress > 0 ? 1 : 0}>
                        <rect
                          x="11"
                          y={80 - 65 * waterProgress}
                          width="128"
                          height={65 * waterProgress}
                          fill="url(#waterGradA)"
                        />
                        {/* Meniscus / Top Water Surface */}
                        <ellipse
                          cx="75"
                          cy={80 - 65 * waterProgress}
                          rx="64"
                          ry="7"
                          fill="#38bdf8"
                          stroke="#e0f2fe"
                          strokeWidth="1"
                        />
                      </g>

                      {/* Bottom Glass Ellipse */}
                      <ellipse
                        cx="75"
                        cy="80"
                        rx="65"
                        ry="8"
                        fill="url(#glassGradA)"
                        stroke="#38bdf8"
                        strokeWidth="1.5"
                      />

                      {/* Top Glass Lip Ellipse */}
                      <ellipse
                        cx="75"
                        cy="15"
                        rx="65"
                        ry="8"
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="2"
                      />
                      {/* Inner Lip Reflection */}
                      <ellipse
                        cx="75"
                        cy="15"
                        rx="62"
                        ry="6.5"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="1"
                        strokeOpacity="0.7"
                      />
                    </svg>

                    {/* Step Highlight Ring for Cup A */}
                    {(animStep === 2 || animStep === 5) && (
                      <div className="absolute -inset-2 rounded-2xl border-2 border-[#ED806F] animate-pulse pointer-events-none" />
                    )}
                  </div>

                  {/* Height Arrow Annotation (h = 1) */}
                  <div
                    className={`flex items-center gap-1 transition-all duration-300 ${
                      animStep === 2
                        ? 'scale-110 text-[#C96859] font-black'
                        : 'text-[#3A302B]'
                    }`}
                  >
                    <div className="relative h-18 sm:h-20 flex flex-col items-center justify-between">
                      <div className="w-0 h-0 border-x-[4px] border-x-transparent border-b-[6px] border-b-[#594D46]" />
                      <div className="w-0.5 h-full bg-[#594D46]" />
                      <div className="w-0 h-0 border-x-[4px] border-x-transparent border-t-[6px] border-t-[#594D46]" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold font-mono px-1.5 py-0.5 rounded bg-white/90 border border-[#E5DCCF] shadow-2xs whitespace-nowrap">
                      h = 1
                    </span>
                  </div>
                </div>

                {/* Cup A Label Card */}
                <div className="px-3.5 py-1 rounded-xl bg-[#FFFDF8] border-2 border-[#ED806F] text-[#C96859] font-bold text-sm sm:text-base shadow-xs">
                  Cốc A
                </div>
              </div>

              {/* ========================================= */}
              {/* RIGHT: CỐC B (Narrow & Tall: R = 1, h = 4) */}
              {/* ========================================= */}
              <div className="flex flex-col items-center gap-3 select-none">
                {/* Top Radius Arrow Annotation (R = 1) */}
                <div
                  className={`flex flex-col items-center gap-0.5 transition-all duration-300 ${
                    animStep === 3 || animStep === 4
                      ? 'scale-110 text-[#3B82F6] font-black'
                      : 'text-[#3A302B]'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-bold font-mono px-2 py-0.5 rounded-md bg-white/90 border border-[#E5DCCF] shadow-2xs">
                    R = 1
                  </span>
                  {/* Double headed arrow */}
                  <div className="relative w-20 sm:w-24 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-[#594D46]" />
                    <div className="absolute left-0 w-0 h-0 border-y-[4px] border-y-transparent border-r-[6px] border-r-[#594D46]" />
                    <div className="absolute right-0 w-0 h-0 border-y-[4px] border-y-transparent border-l-[6px] border-l-[#594D46]" />
                  </div>
                </div>

                {/* Glass Cylinder B + Height Annotation side-by-side */}
                <div className="flex items-center gap-3">
                  {/* Glass SVG Container */}
                  <div className="relative flex flex-col items-center">
                    <svg
                      width="80"
                      height="230"
                      viewBox="0 0 80 230"
                      className="drop-shadow-md overflow-visible"
                    >
                      {/* Glass Body gradient and water */}
                      <defs>
                        <linearGradient id="glassGradB" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                          <stop offset="25%" stopColor="#bae6fd" stopOpacity="0.4" />
                          <stop offset="75%" stopColor="#7dd3fc" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
                        </linearGradient>
                        <linearGradient id="waterGradB" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
                          <stop offset="50%" stopColor="#0284c7" stopOpacity="0.75" />
                          <stop offset="100%" stopColor="#0369a1" stopOpacity="0.85" />
                        </linearGradient>
                      </defs>

                      {/* Drop shadow ellipse below */}
                      <ellipse cx="40" cy="220" rx="35" ry="6" fill="rgba(58, 48, 43, 0.12)" />

                      {/* Glass Wall Body */}
                      <rect
                        x="5"
                        y="15"
                        width="70"
                        height="205"
                        fill="url(#glassGradB)"
                        stroke="#7dd3fc"
                        strokeWidth="1.5"
                      />

                      {/* Water Fill Body based on waterProgress */}
                      <g opacity={waterProgress > 0 ? 1 : 0}>
                        <rect
                          x="6"
                          y={220 - 205 * waterProgress}
                          width="68"
                          height={205 * waterProgress}
                          fill="url(#waterGradB)"
                        />
                        {/* Meniscus / Top Water Surface */}
                        <ellipse
                          cx="40"
                          cy={220 - 205 * waterProgress}
                          rx="34"
                          ry="5"
                          fill="#38bdf8"
                          stroke="#e0f2fe"
                          strokeWidth="1"
                        />
                      </g>

                      {/* Bottom Glass Ellipse */}
                      <ellipse
                        cx="40"
                        cy="220"
                        rx="35"
                        ry="6"
                        fill="url(#glassGradB)"
                        stroke="#38bdf8"
                        strokeWidth="1.5"
                      />

                      {/* Top Glass Lip Ellipse */}
                      <ellipse
                        cx="40"
                        cy="15"
                        rx="35"
                        ry="6"
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="2"
                      />
                      {/* Inner Lip Reflection */}
                      <ellipse
                        cx="40"
                        cy="15"
                        rx="32"
                        ry="4.5"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="1"
                        strokeOpacity="0.7"
                      />
                    </svg>

                    {/* Step Highlight Ring for Cup B */}
                    {(animStep === 4 || animStep === 5) && (
                      <div className="absolute -inset-2 rounded-2xl border-2 border-[#3B82F6] animate-pulse pointer-events-none" />
                    )}
                  </div>

                  {/* Height Arrow Annotation (h = 4) */}
                  <div
                    className={`flex items-center gap-1 transition-all duration-300 ${
                      animStep === 4
                        ? 'scale-110 text-[#3B82F6] font-black'
                        : 'text-[#3A302B]'
                    }`}
                  >
                    <div className="relative h-48 sm:h-52 flex flex-col items-center justify-between">
                      <div className="w-0 h-0 border-x-[4px] border-x-transparent border-b-[6px] border-b-[#594D46]" />
                      <div className="w-0.5 h-full bg-[#594D46]" />
                      <div className="w-0 h-0 border-x-[4px] border-x-transparent border-t-[6px] border-t-[#594D46]" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold font-mono px-1.5 py-0.5 rounded bg-white/90 border border-[#E5DCCF] shadow-2xs whitespace-nowrap">
                      h = 4
                    </span>
                  </div>
                </div>

                {/* Cup B Label Card */}
                <div className="px-3.5 py-1 rounded-xl bg-[#FFFDF8] border-2 border-[#3B82F6] text-[#2563EB] font-bold text-sm sm:text-base shadow-xs">
                  Cốc B
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* 3D WebGL Canvas Mode */
          <div className="relative w-full h-[320px] sm:h-[380px]">
            <div ref={canvasContainerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E5DCCF] text-[11px] text-[#594D46] shadow-md font-mono">
              <span>💡 Kéo chuột để xoay 360° • Cuộn để phóng to</span>
            </div>
          </div>
        )}

        {/* Interactive Simulation Controls Bar (Pour Water + 3D) */}
        <div className="mt-3 pt-3 border-t border-[#E8DFC8] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={isPouringWater ? 'primary' : 'outline'}
              shape="pill"
              onClick={() => setIsPouringWater(true)}
              disabled={isPouringWater}
              leftIcon={<Droplets className="w-3.5 h-3.5 text-cyan-600" />}
              className="text-xs font-bold cursor-pointer"
            >
              {isPouringWater ? 'Đang rót nước...' : 'Thử đổ đầy hai cốc'}
            </Button>

            {hasAnswered && (
              <Button
                size="sm"
                variant={isAutoPlayingAnim ? 'secondary' : 'outline'}
                shape="pill"
                onClick={() => {
                  setAnimStep(1);
                  setIsAutoPlayingAnim(!isAutoPlayingAnim);
                }}
                leftIcon={isAutoPlayingAnim ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                className="text-xs font-bold cursor-pointer"
              >
                {isAutoPlayingAnim ? 'Tạm dừng phân tích' : 'Minh họa phép tính từng bước'}
              </Button>
            )}
          </div>

          <div className="text-[11px] text-[#766A61] font-mono">
            {waterProgress < 1 ? `Mực nước: ${(waterProgress * 100).toFixed(0)}%` : 'Đầy bình: V = 4π'}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. CÂU HỎI TRỌNG TÂM                                         */}
      {/* ------------------------------------------------------------- */}
      <div className="text-center py-1">
        <h3 className="text-lg sm:text-2xl font-black text-[#2E2926] tracking-tight">
          Đố vui: Cốc A hay Cốc B chứa được nhiều nước hơn?
        </h3>
        <p className="text-xs sm:text-sm text-[#766A61] mt-1 font-medium">
          Hãy quan sát thật kỹ các thông số bán kính đáy <strong className="text-[#ED806F]">R</strong> và chiều cao <strong className="text-[#ED806F]">h</strong> trước khi lựa chọn nhé!
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. PHẦN 3 NÚT LỰA CHỌN (Section IV)                          */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* OPTION 1: Cốc A */}
        <motion.button
          type="button"
          id="puzzle-opt-a"
          onClick={() => handleSelectAnswer('A')}
          animate={
            selectedAnswer === 'A'
              ? { x: [0, -6, 6, -4, 4, 0], scale: [1, 0.98, 1] }
              : {}
          }
          transition={{ duration: 0.4 }}
          className={`p-4 rounded-2xl border-2 text-center font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-xs min-h-[58px] flex items-center justify-center ${
            selectedAnswer === 'A'
              ? 'bg-[#FFF8EE] border-[#F5E6BF] text-[#8C6627] ring-2 ring-[#F5E6BF]'
              : 'bg-[#FFFDF8] border-[#E5DCCF] text-[#3A302B] hover:bg-[#F4EEE4] hover:border-[#D5C9BD]'
          }`}
        >
          <span>1. Cốc A chứa nhiều nước hơn.</span>
        </motion.button>

        {/* OPTION 2: Cốc B */}
        <motion.button
          type="button"
          id="puzzle-opt-b"
          onClick={() => handleSelectAnswer('B')}
          animate={
            selectedAnswer === 'B'
              ? { x: [0, -6, 6, -4, 4, 0], scale: [1, 0.98, 1] }
              : {}
          }
          transition={{ duration: 0.4 }}
          className={`p-4 rounded-2xl border-2 text-center font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-xs min-h-[58px] flex items-center justify-center ${
            selectedAnswer === 'B'
              ? 'bg-[#FFF8EE] border-[#F5E6BF] text-[#8C6627] ring-2 ring-[#F5E6BF]'
              : 'bg-[#FFFDF8] border-[#E5DCCF] text-[#3A302B] hover:bg-[#F4EEE4] hover:border-[#D5C9BD]'
          }`}
        >
          <span>2. Cốc B chứa nhiều nước hơn.</span>
        </motion.button>

        {/* OPTION 3: EQUAL (CORRECT) */}
        <motion.button
          type="button"
          id="puzzle-opt-equal"
          onClick={() => handleSelectAnswer('EQUAL')}
          animate={
            selectedAnswer === 'EQUAL'
              ? { scale: [1, 1.04, 1], rotate: [0, 1, -1, 0] }
              : {}
          }
          transition={{ duration: 0.4 }}
          className={`p-4 rounded-2xl border-2 text-center font-black text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-xs min-h-[58px] flex items-center justify-center ${
            selectedAnswer === 'EQUAL'
              ? 'bg-[#EBF2E8] border-[#789972] text-[#4D6B42] ring-2 ring-[#9FB596]'
              : 'bg-[#FFFDF8] border-[#E5DCCF] text-[#3A302B] hover:bg-[#F4EEE4] hover:border-[#D5C9BD]'
          }`}
        >
          <span className="flex items-center gap-1.5">
            {selectedAnswer === 'EQUAL' && <CheckCircle2 className="w-5 h-5 text-[#789972]" />}
            <span>3. Cả hai cốc chứa lượng nước BẰNG NHAU.</span>
          </span>
        </motion.button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 6. TEACHER HIẾU AVATAR & SUBTITLE (Section XI)               */}
      {/* ------------------------------------------------------------- */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F4EC] border border-[#E5DCCF] flex items-start gap-4">
        {/* Cartoon Teacher Avatar SVG with Dynamic Expressions */}
        <div className="relative shrink-0">
          <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-gradient-to-tr from-[#ED806F] to-[#D7A85D] p-0.5 shadow-md flex items-center justify-center">
            <svg
              width="52"
              height="52"
              viewBox="0 0 52 52"
              className="w-full h-full rounded-2xl bg-[#FFFDF8]"
            >
              {/* Teacher Face Background */}
              <circle cx="26" cy="24" r="16" fill="#FCE9D8" />
              {/* Hair */}
              <path
                d="M 12 22 Q 26 8 40 22 Q 38 12 26 12 Q 14 12 12 22 Z"
                fill="#3A302B"
              />
              {/* Glasses Frame */}
              <rect x="16" y="20" width="8" height="6" rx="2" fill="none" stroke="#3A302B" strokeWidth="1.5" />
              <rect x="28" y="20" width="8" height="6" rx="2" fill="none" stroke="#3A302B" strokeWidth="1.5" />
              <line x1="24" y1="23" x2="28" y2="23" stroke="#3A302B" strokeWidth="1.5" />

              {/* Eyes Expression */}
              {teacherState === 'SUCCESS' ? (
                <>
                  {/* Joyful curved happy eyes */}
                  <path d="M 18 23 Q 20 20 22 23" fill="none" stroke="#3A302B" strokeWidth="1.5" />
                  <path d="M 30 23 Q 32 20 34 23" fill="none" stroke="#3A302B" strokeWidth="1.5" />
                </>
              ) : teacherState === 'THINKING' ? (
                <>
                  {/* Thinking look up */}
                  <circle cx="20" cy="22" r="1.5" fill="#3A302B" />
                  <circle cx="32" cy="22" r="1.5" fill="#3A302B" />
                </>
              ) : (
                <>
                  {/* Normal Friendly Eyes */}
                  <circle cx="20" cy="23" r="1.5" fill="#3A302B" />
                  <circle cx="32" cy="23" r="1.5" fill="#3A302B" />
                </>
              )}

              {/* Mouth Expression */}
              {teacherState === 'SUCCESS' ? (
                /* Wide joyful smile */
                <path d="M 21 29 Q 26 35 31 29" fill="#ED806F" stroke="#3A302B" strokeWidth="1.2" />
              ) : teacherState === 'THINKING' ? (
                /* Small thoughtful 'o' */
                <ellipse cx="26" cy="30" rx="2.5" ry="2" fill="none" stroke="#3A302B" strokeWidth="1.2" />
              ) : (
                /* Gentle friendly smile */
                <path d="M 22 29 Q 26 33 30 29" fill="none" stroke="#3A302B" strokeWidth="1.5" strokeLinecap="round" />
              )}

              {/* Neck & Teacher Collar Shirt */}
              <path d="M 16 48 L 20 38 L 32 38 L 36 48 Z" fill="#789972" />
              <polygon points="26,38 23,44 26,48 29,44" fill="#ED806F" />
            </svg>
          </div>

          {/* Badge Icon depending on state */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border border-[#E5DCCF] flex items-center justify-center shadow-xs">
            {teacherState === 'SUCCESS' ? (
              <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
            ) : (
              <Lightbulb className="w-3 h-3 text-amber-500" />
            )}
          </div>
        </div>

        {/* Speech Bubble & Text */}
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-serif font-bold text-sm text-[#3A302B] flex items-center gap-1.5">
              <span>Thầy Hiếu dặn dò:</span>
              <span className="text-[10px] font-sans font-bold px-1.5 py-0.2 rounded bg-white border border-[#E5DCCF] text-[#766A61]">
                Gia sư Hình Học 9
              </span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#3A302B] font-medium leading-relaxed">
            "{teacherSubtitle}"
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 6. ACCORDION “BẬT MÍ LỜI GIẢI” (Section VI & VII)             */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            id="puzzle-explanation-card"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-[#FAF7FD] border-2 border-[#DFD2F0] p-5 sm:p-7 space-y-6 shadow-xs overflow-hidden"
          >
            {/* Header Accordion */}
            <div className="flex items-center justify-between pb-3 border-b border-[#DFD2F0]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#634796] text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#3A302B]">
                    Bật Mí Lời Giải & Chứng Minh Toán Học
                  </h4>
                  <p className="text-xs text-[#766A61]">
                    Phân tích chi tiết từng bước theo công thức thể tích hình trụ
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-[#EBF2E8] border border-[#D0DEC9] text-[#4D6B42] text-xs font-bold">
                Đáp án: BẰNG NHAU (V = 4π)
              </span>
            </div>

            {/* 4 Pedagogical Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* BƯỚC 1: Công thức */}
              <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#DFD2F0] space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#634796]">
                  <span className="w-5 h-5 rounded-full bg-[#DFD2F0] text-[#634796] flex items-center justify-center text-xs">
                    1
                  </span>
                  <span>Công thức tính thể tích hình trụ:</span>
                </div>
                <div className="py-1 text-center bg-[#F8F4EC] rounded-xl border border-[#E5DCCF]">
                  <MathFormula formula="V = \pi R^2 h" displayMode={true} />
                </div>
                <p className="text-xs text-[#766A61]">
                  Trong đó <strong className="text-[#3A302B]">R</strong> là bán kính đáy và <strong className="text-[#3A302B]">h</strong> là chiều cao hình trụ.
                </p>
              </div>

              {/* BƯỚC 2: Cốc A */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  animStep === 1 || animStep === 2
                    ? 'bg-[#FFF6F4] border-[#ED806F] ring-2 ring-[#ED806F]/30'
                    : 'bg-[#FFFDF8] border-[#DFD2F0]'
                } space-y-2`}
              >
                <div className="flex items-center justify-between font-bold text-xs sm:text-sm text-[#C96859]">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#FDF0ED] text-[#C96859] flex items-center justify-center text-xs">
                      2
                    </span>
                    <span>Tính thể tích Cốc A:</span>
                  </div>
                  <span className="text-[11px] font-mono">R = 2, h = 1</span>
                </div>
                <div className="py-1 text-center bg-[#F8F4EC] rounded-xl border border-[#E5DCCF]">
                  <MathFormula formula="V_A = \pi \times 2^2 \times 1 = 4\pi \text{ (đvtt)}" displayMode={true} />
                </div>
                <p className="text-xs text-[#766A61]">
                  Bán kính <strong className="text-[#C96859]">R = 2</strong> khi bình phương cho diện tích đáy gấp 4 lần (<InlineMath math="2^2 = 4" />).
                </p>
              </div>

              {/* BƯỚC 3: Cốc B */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  animStep === 3 || animStep === 4
                    ? 'bg-[#EFF6FF] border-[#3B82F6] ring-2 ring-[#3B82F6]/30'
                    : 'bg-[#FFFDF8] border-[#DFD2F0]'
                } space-y-2`}
              >
                <div className="flex items-center justify-between font-bold text-xs sm:text-sm text-[#2563EB]">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center text-xs">
                      3
                    </span>
                    <span>Tính thể tích Cốc B:</span>
                  </div>
                  <span className="text-[11px] font-mono">R = 1, h = 4</span>
                </div>
                <div className="py-1 text-center bg-[#F8F4EC] rounded-xl border border-[#E5DCCF]">
                  <MathFormula formula="V_B = \pi \times 1^2 \times 4 = 4\pi \text{ (đvtt)}" displayMode={true} />
                </div>
                <p className="text-xs text-[#766A61]">
                  Chiều cao <strong className="text-[#2563EB]">h = 4</strong> gấp 4 lần nhưng diện tích đáy chỉ bằng 1 phần 4 (<InlineMath math="1^2 = 1" />).
                </p>
              </div>

              {/* BƯỚC 4: Kết luận & So sánh */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  animStep === 5
                    ? 'bg-[#EBF2E8] border-[#789972] ring-2 ring-[#789972]/40'
                    : 'bg-[#FFFDF8] border-[#DFD2F0]'
                } space-y-2`}
              >
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#4D6B42]">
                  <span className="w-5 h-5 rounded-full bg-[#EBF2E8] text-[#4D6B42] flex items-center justify-center text-xs">
                    4
                  </span>
                  <span>Kết luận: Hai thể tích bằng nhau!</span>
                </div>
                <div className="py-1 text-center bg-[#F8F4EC] rounded-xl border border-[#E5DCCF]">
                  <MathFormula formula="V_A = V_B = 4\pi" displayMode={true} />
                </div>
                <p className="text-xs text-[#4D6B42] font-semibold">
                  Cả hai cốc đều có cùng dung tích chứa chính xác là <InlineMath math="4\pi" />!
                </p>
              </div>
            </div>

            {/* Bất ngờ chưa! Paragraph */}
            <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#DFD2F0] space-y-1.5">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                <span>🎉 Bất ngờ chưa!</span>
              </div>
              <p className="text-xs sm:text-sm text-[#594D46] leading-relaxed">
                Mặc dù Cốc B nhìn cao hơn hẳn, nhưng Cốc A có bán kính đáy lớn gấp đôi. Khi bán kính được bình phương: <strong className="text-[#C96859] font-mono">2² = 4</strong>, nên phần tăng về bán kính đã bù lại phần chiều cao của Cốc B. Vì vậy hai cốc chứa lượng nước hoàn toàn bằng nhau!
              </p>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* 7. “VÌ SAO MẮT DỄ BỊ ĐÁNH LỪA?” (Section VIII)                */}
            {/* ------------------------------------------------------------- */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF8EE] border border-[#F5E6BF] space-y-3">
              <div className="flex items-center gap-2 text-[#7A571B] font-bold text-sm sm:text-base">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                <span>VÌ SAO MẮT DỄ BỊ ĐÁNH LỪA?</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#8C6627]">
                <div className="p-2.5 rounded-xl bg-white/80 border border-[#F5E6BF] space-y-1">
                  <span className="font-bold text-[#C96859] block">Cốc A: R = 2, h = 1</span>
                  <p>Mặt cắt đáy rộng gấp 4 lần, chiều cao chỉ bằng 1/4.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 border border-[#F5E6BF] space-y-1">
                  <span className="font-bold text-[#2563EB] block">Cốc B: R = 1, h = 4</span>
                  <p>Trông cao gấp 4 lần nhưng tiết diện đáy hẹp chỉ bằng 1/4.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/90 border border-[#F5E6BF] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ED806F]/20 text-[#C96859] font-black text-sm flex items-center justify-center shrink-0 border border-[#ED806F]/30">
                  R²
                </div>
                <p className="text-xs sm:text-sm text-[#7A571B] font-medium leading-relaxed">
                  Ta thường có xu hướng chú ý đến <strong>chiều cao</strong> của cốc, nhưng thể tích hình trụ phụ thuộc vào bậc 2: <strong className="text-[#C96859] font-bold">R²</strong>. Khi <strong className="text-[#C96859]">R tăng 2 lần</strong> thì diện tích đáy tăng vọt lên <strong className="text-[#C96859]">4 lần</strong>!
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VisualIllusionPuzzle;
