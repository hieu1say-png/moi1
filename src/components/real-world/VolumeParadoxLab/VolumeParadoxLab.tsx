/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ============================================================================
 * TRANG 11: NGHỊCH LÝ 1/3 — BÍ ẨN THỂ TÍCH
 * MODULE THÍ NGHIỆM 3D MÔ PHỎNG THỂ TÍCH NÓN VÀ TRỤ
 * ============================================================================
 * 
 * Sư phạm:
 * Học sinh trực tiếp quan sát và thực hiện thí nghiệm đổ nước từ một phễu nón đầy nước
 * sang một cốc trụ có:
 *   - CÙNG BÁN KÍNH ĐÁY R
 *   - CÙNG CHIỀU CAO h
 * 
 * Qua 3 lần đổ, học sinh tự phát hiện:
 *   V_nón = 1/3 V_trụ
 *   V_nón = 1/3 * π * R² * h
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VolumeParadoxScene } from './VolumeParadoxScene';
import { ParameterPanel } from './ParameterPanel';
import { PourControls } from './PourControls';
import { ConclusionPanel } from './ConclusionPanel';
import { VolumeParadoxLabProps, PourPhase, CameraViewMode, VolumeParadoxLearningData } from './types';
import { MathFormula, MathText } from '../../common/MathFormula';
import { useLearningContext } from '../../../context/LearningContext';
import {
  Bug,
  RotateCcw,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  Activity,
  Lightbulb,
  Play,
  Check,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  TrendingUp,
  Glasses
} from 'lucide-react';

export const VolumeParadoxLab: React.FC<VolumeParadoxLabProps> = ({
  onNavigateTheory,
  onNavigateNextChallenge,
  className = ''
}) => {
  const { set3DParams, setPourState, updateContext } = useLearningContext();

  // 1. Geometric Parameters (Invariant: SAME_RADIUS = true, SAME_HEIGHT = true)
  const [radius, setRadius] = useState<number>(1.15); // R: 0.5 -> 2.0
  const [height, setHeight] = useState<number>(2.40); // h: 1.0 -> 4.0

  useEffect(() => {
    set3DParams(radius, height);
    updateContext({
      currentShape: 'cone',
      currentMode: 'real-world',
      currentActivity: 'Thí nghiệm Nghịch lý 1/3 Thể tích Nón & Trụ'
    });
  }, [radius, height, set3DParams, updateContext]);

  // 2. Mathematical Experiment State
  const [pourCount, setPourCount] = useState<0 | 1 | 2 | 3>(0);
  const [coneFill, setConeFill] = useState<number>(1.0); // 1 = 100% full
  const [cylinderFill, setCylinderFill] = useState<number>(0.0); // 0 -> 1/3 -> 2/3 -> 1
  const [isPouring, setIsPouring] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [pourPhase, setPourPhase] = useState<PourPhase>('idle');
  const [streamVisible, setStreamVisible] = useState<boolean>(false);
  const [pourAnimationProgress, setPourAnimationProgress] = useState<number>(0);

  // 3. Educational & Pedagogical Modes
  const [predictionAnswer, setPredictionAnswer] = useState<1 | 2 | 3 | 4 | null>(null);
  const [cameraMode, setCameraMode] = useState<CameraViewMode>('DEFAULT_VIEW');
  const [activeWhyHint, setActiveWhyHint] = useState<1 | 2 | 3 | null>(null);
  const [replayStep, setReplayStep] = useState<0 | 1 | 2 | 3 | null>(null);
  const [hintsUsedList, setHintsUsedList] = useState<number[]>([]);
  const [startTime] = useState<number>(Date.now());

  // 4. UI State
  const [showDebugHUD, setShowDebugHUD] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(60);

  // FPS Monitor for Debug HUD
  const frameCountRef = useRef<number>(0);
  const lastFpsTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    let animId: number;
    const loop = (t: number) => {
      frameCountRef.current++;
      if (t - lastFpsTimeRef.current >= 1000) {
        setFps(Math.round((frameCountRef.current * 1000) / (t - lastFpsTimeRef.current)));
        frameCountRef.current = 0;
        lastFpsTimeRef.current = t;
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Synchronized Mathematical Calculations
  const vCylinder = Math.PI * radius * radius * height;
  const vCone = (1 / 3) * Math.PI * radius * radius * height;
  const waterHeightCylinder = cylinderFill * height;
  const waterHeightCone = height * Math.cbrt(coneFill);

  // 9-Phase Pour Animation Execution
  const handlePour = useCallback(() => {
    if (isPouring || pourCount >= 3 || predictionAnswer === null) return;

    setIsPouring(true);
    setPourAnimationProgress(0);
    setPourPhase('phase1_tilting');
    setStreamVisible(false);
    setReplayStep(null);

    const nextPourCount = (pourCount + 1) as 1 | 2 | 3;
    const startCylFill = cylinderFill;
    const targetCylFill = nextPourCount / 3;

    const duration = 2800; // ms for ultra-smooth 9-phase visual sequence
    const startTimeAnim = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeAnim;
      const progress = Math.min(1, elapsed / duration);
      setPourAnimationProgress(progress);

      if (progress < 0.12) {
        setPourPhase('phase1_tilting');
        setStreamVisible(false);
        setConeFill(1.0);
      } else if (progress < 0.20) {
        setPourPhase('phase2_water_movement');
        setStreamVisible(false);
        setConeFill(1.0);
      } else if (progress < 0.28) {
        setPourPhase('phase3_stream_appears');
        setStreamVisible(true);
        setConeFill(1.0);
      } else if (progress < 0.36) {
        setPourPhase('phase4_stream_reaches_cup');
        setStreamVisible(true);
        setConeFill(0.98);
      } else if (progress < 0.72) {
        setPourPhase('phase5_cylinder_water_rises');
        setStreamVisible(true);
        const flowT = (progress - 0.36) / 0.36;
        setConeFill(Math.max(0, 1.0 - flowT));
        setCylinderFill(startCylFill + (targetCylFill - startCylFill) * flowT);
      } else if (progress < 0.80) {
        setPourPhase('phase6_stream_disappears');
        setStreamVisible(false);
        setConeFill(0.0);
        setCylinderFill(targetCylFill);
      } else if (progress < 0.90) {
        setPourPhase('phase7_funnel_returns');
        setStreamVisible(false);
        setConeFill(0.0);
        setCylinderFill(targetCylFill);
      } else if (progress < 0.98) {
        setPourPhase('phase8_funnel_refills');
        setStreamVisible(false);
        if (nextPourCount < 3) {
          const refillT = (progress - 0.90) / 0.08;
          setConeFill(Math.min(1, refillT));
        } else {
          setConeFill(0.0);
        }
        setCylinderFill(targetCylFill);
      } else {
        setPourPhase('phase9_unlocked');
        setStreamVisible(false);
        if (nextPourCount < 3) {
          setConeFill(1.0);
        }
        setCylinderFill(targetCylFill);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Pour Finished!
        setIsPouring(false);
        setPourCount(nextPourCount);
        setCylinderFill(targetCylFill);
        setPourPhase('idle');
        setStreamVisible(false);

        if (nextPourCount < 3) {
          setConeFill(1.0);
          setPourState(nextPourCount, targetCylFill, 1.0);
        } else {
          setIsComplete(true);
          setPourState(3, 1.0, 0.0);
        }
      }
    };

    requestAnimationFrame(animate);
  }, [isPouring, pourCount, cylinderFill, predictionAnswer, setPourState]);

  // Jump to specific Replay Step (0, 1, 2, 3)
  const handleReplayJump = useCallback((step: 0 | 1 | 2 | 3) => {
    if (isPouring) return;
    setReplayStep(step);
    setPourCount(step);
    setCylinderFill(step / 3);
    setConeFill(step === 3 ? 0.0 : 1.0);
    setIsComplete(step === 3);
  }, [isPouring]);

  // Toggle "Tại sao?" Smart Hint
  const handleToggleWhyHint = useCallback((level: 1 | 2 | 3) => {
    setActiveWhyHint((prev) => (prev === level ? null : level));
    if (!hintsUsedList.includes(level)) {
      setHintsUsedList((prev) => [...prev, level]);
    }
  }, [hintsUsedList]);

  // Reset entire experiment
  const handleReset = useCallback(() => {
    setIsPouring(false);
    setPourAnimationProgress(0);
    setPourPhase('idle');
    setStreamVisible(false);
    setPourCount(0);
    setConeFill(1.0);
    setCylinderFill(0.0);
    setIsComplete(false);
    setPredictionAnswer(null);
    setActiveWhyHint(null);
    setReplayStep(null);
    setRadius(1.15);
    setHeight(2.40);
  }, []);

  // Prepare learning data
  const learningData: VolumeParadoxLearningData = {
    predictionAnswer,
    actualAnswer: 3,
    pourCount,
    hintUsed: hintsUsedList,
    timeSpentSeconds: Math.round((Date.now() - startTime) / 1000),
    completed: isComplete,
    conclusionCorrect: predictionAnswer === 3
  };

  return (
    <div id="volume-paradox-lab" className={`space-y-5 max-w-7xl mx-auto ${className}`}>
      {/* ================================================================== */}
      {/* VII. HEADER (LIGHT THEME, ORANGE GRADIENT, ROUNDED, ACTION BUTTONS) */}
      {/* ================================================================== */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-mono text-[11px] font-bold tracking-wide uppercase">
                Toán 9 — Chương IV
              </span>
            </div>
            <h1 className="text-base sm:text-lg md:text-xl font-black tracking-tight text-white">
              TRANG 11: NGHỊCH LÝ 1/3 — BÍ ẨN THỂ TÍCH
            </h1>
            <p className="text-xs sm:text-sm text-orange-100 font-medium">
              Đổ nước từ Phễu Nón sang Cốc Trụ (Cùng bán kính đáy R, cùng chiều cao h)
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-center">
            {/* Debug HUD Toggle Button */}
            <button
              type="button"
              onClick={() => setShowDebugHUD((prev) => !prev)}
              aria-label="Bật tắt Debug HUD"
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                showDebugHUD
                  ? 'bg-white text-orange-600 border-white shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/40'
              }`}
            >
              <Bug className="w-3.5 h-3.5" />
              <span>Debug HUD</span>
            </button>

            {/* Reset Button */}
            <button
              type="button"
              onClick={handleReset}
              aria-label="Làm lại từ đầu"
              className="px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm lại từ đầu</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================================================================== */}
      {/* VII. STEP 1: PREDICTION CARD (DỰ ĐOÁN TRƯỚC KHI RÓT)                */}
      {/* ================================================================== */}
      {predictionAnswer === null ? (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-300 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4 animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-orange-500 text-white shadow-xs shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-black text-slate-900 text-base sm:text-lg">
                BƯỚC 1: DỰ ĐOÁN TRƯỚC THÍ NGHIỆM
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Quan sát phễu nón bên trái và cốc trụ bên phải (có <strong>cùng bán kính đáy R</strong> và <strong>cùng chiều cao h</strong>). Theo em, cần đổ bao nhiêu phễu nón đầy nước để làm đầy cốc trụ?
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {([1, 2, 3, 4] as const).map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setPredictionAnswer(num)}
                className="py-3 px-4 rounded-2xl bg-white hover:bg-orange-500 hover:text-white border-2 border-orange-200 hover:border-orange-500 font-black text-sm sm:text-base text-slate-800 shadow-xs transition-all flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95 group"
              >
                <span className="text-base sm:text-lg">{num} LẦN</span>
                <span className="text-[11px] font-medium text-slate-400 group-hover:text-orange-100">
                  {num === 3 ? '(Dự đoán 3 lần)' : `(Dự đoán ${num} lần)`}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500 italic bg-white/70 px-3 py-2 rounded-xl border border-orange-100">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Hãy tự do đưa ra dự đoán trực giác của em. Nút đổ nước sẽ được mở khóa ngay sau khi em chọn!</span>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-orange-200 p-3 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-orange-100 text-orange-600">
              <BrainCircuit className="w-4 h-4" />
            </span>
            <div className="text-xs">
              <span className="text-slate-500 font-medium">Dự đoán ban đầu của em: </span>
              <strong className="text-orange-600 font-black text-sm">{predictionAnswer} lần đổ</strong>
              {pourCount === 3 && (
                <span className="ml-2 font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px]">
                  {predictionAnswer === 3 ? 'Chính xác tuyệt đối! ✓' : 'Thực tế là 3 lần!'}
                </span>
              )}
            </div>
          </div>

          {pourCount === 0 && !isPouring && (
            <button
              type="button"
              onClick={() => setPredictionAnswer(null)}
              className="text-[11px] font-bold text-orange-600 hover:text-orange-700 underline cursor-pointer"
            >
              Thay đổi dự đoán
            </button>
          )}
        </div>
      )}

      {/* ================================================================== */}
      {/* VIII. & IX. MAIN 3D CANVAS VIEWPORT (WITH ORBIT CONTROLS & SCENE)  */}
      {/* ================================================================== */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden relative">
        {/* 3D Scene */}
        <VolumeParadoxScene
          radius={radius}
          height={height}
          pourCount={pourCount}
          coneFill={coneFill}
          cylinderFill={cylinderFill}
          isPouring={isPouring}
          pourAnimationProgress={pourAnimationProgress}
          cameraMode={cameraMode}
          onCameraModeChange={setCameraMode}
        />

        {/* XXIX. DEBUG HUD OVERLAY (IF TOGGLED) */}
        {showDebugHUD && (
          <div className="absolute bottom-4 right-4 z-30 p-3 rounded-xl bg-slate-900/90 text-white font-mono text-[10px] sm:text-[11px] border border-slate-700 shadow-xl backdrop-blur-md max-w-xs space-y-1 select-none pointer-events-auto">
            <div className="flex items-center justify-between border-b border-slate-700 pb-1 font-bold text-orange-400">
              <span className="flex items-center gap-1">
                <Activity className="w-3 h-3 text-emerald-400" />
                <span>DEBUG HUD</span>
              </span>
              <span className="text-emerald-400">{fps} FPS</span>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-slate-300">
              <div>R: <strong className="text-white">{radius.toFixed(2)}</strong></div>
              <div>h: <strong className="text-white">{height.toFixed(2)}</strong></div>
              <div>V_cone: <strong className="text-orange-300">{vCone.toFixed(3)}</strong></div>
              <div>V_cyl: <strong className="text-sky-300">{vCylinder.toFixed(3)}</strong></div>
              <div>coneFill: <strong className="text-white">{coneFill.toFixed(3)}</strong></div>
              <div>cylFill: <strong className="text-white">{cylinderFill.toFixed(3)}</strong></div>
              <div>cylWaterH: <strong className="text-white">{waterHeightCylinder.toFixed(2)}</strong></div>
              <div>coneWaterH: <strong className="text-white">{waterHeightCone.toFixed(2)}</strong></div>
              <div>pourCount: <strong className="text-white">{pourCount}/3</strong></div>
              <div>isPouring: <strong className={isPouring ? 'text-amber-400' : 'text-slate-400'}>{String(isPouring)}</strong></div>
              <div>streamVis: <strong className={streamVisible ? 'text-cyan-400' : 'text-slate-400'}>{String(streamVisible)}</strong></div>
              <div>isComplete: <strong className={isComplete ? 'text-emerald-400' : 'text-slate-400'}>{String(isComplete)}</strong></div>
              <div>predAnswer: <strong className="text-white">{String(predictionAnswer)}</strong></div>
              <div>cameraMode: <strong className="text-white">{cameraMode}</strong></div>
              <div className="col-span-2 pt-1 border-t border-slate-800 text-[10px]">
                Phase: <strong className="text-orange-400 font-mono">{pourPhase}</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================================================================== */}
      {/* XXI. VOLUME COUNTER BANNER (HIỂN THỊ THỂ TÍCH HIỆN TẠI)             */}
      {/* ================================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-orange-50/80 border border-orange-200 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-orange-900 uppercase">Thể tích 1 Phễu Nón:</span>
          <div className="my-1">
            <span className="text-base font-black text-orange-600 font-mono">
              {vCone.toFixed(2)} cm³
            </span>
          </div>
          <span className="text-[10px] text-orange-700">
            <MathFormula formula="V_{\text{nón}} = \frac{1}{3}\pi R^2 h" />
          </span>
        </div>

        <div className="p-3 rounded-xl bg-sky-50/80 border border-sky-200 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-sky-900 uppercase">Thể tích Cốc Trụ:</span>
          <div className="my-1">
            <span className="text-base font-black text-sky-600 font-mono">
              {vCylinder.toFixed(2)} cm³
            </span>
          </div>
          <span className="text-[10px] text-sky-700">
            <MathFormula formula="V_{\text{trụ}} = \pi R^2 h" />
          </span>
        </div>

        <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-emerald-900 uppercase">Nước trong Cốc Trụ:</span>
          <div className="my-1 flex items-baseline gap-1.5">
            <span className="text-base font-black text-emerald-700 font-mono">
              {(cylinderFill * vCylinder).toFixed(2)} cm³
            </span>
            <span className="text-xs font-bold text-emerald-600">
              ({(cylinderFill * 100).toFixed(0)}%)
            </span>
          </div>
          <span className="text-[10px] text-emerald-800 font-medium">
            {pourCount === 0 && 'Chưa có nước'}
            {pourCount === 1 && <MathFormula formula="V_{\text{nước}} = \frac{1}{3} V_{\text{trụ}}" />}
            {pourCount === 2 && <MathFormula formula="V_{\text{nước}} = \frac{2}{3} V_{\text{trụ}}" />}
            {pourCount === 3 && <MathFormula formula="V_{\text{nước}} = V_{\text{trụ}} \text{ (100\%)}" />}
          </span>
        </div>
      </div>

      {/* ================================================================== */}
      {/* XXVII. PARAMETER PANEL (SYNCHRONIZED R & h SLIDERS)                 */}
      {/* ================================================================== */}
      <ParameterPanel
        radius={radius}
        height={height}
        onRadiusChange={(r) => setRadius(r)}
        onHeightChange={(h) => setHeight(h)}
        disabled={isPouring}
      />

      {/* ================================================================== */}
      {/* XXVIII. POUR ACTION CONTROLS & STEP TRACKER                        */}
      {/* ================================================================== */}
      <PourControls
        pourCount={pourCount}
        isPouring={isPouring}
        isComplete={isComplete}
        predictionAnswer={predictionAnswer}
        onPour={handlePour}
        onReset={handleReset}
      />

      {/* ================================================================== */}
      {/* XXIV. REPLAY MODE JUMP CONTROLS (XEM LẠI CÁC TRẠNG THÁI)           */}
      {/* ================================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
            <Play className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wide">
              XEM LẠI CÁC TRẠNG THÁI THÍ NGHIỆM
            </h4>
            <p className="text-[11px] text-slate-500">
              Nhấn để nhảy ngay đến trạng thái mực nước tương ứng
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {([0, 1, 2, 3] as const).map((step) => (
            <button
              key={step}
              type="button"
              onClick={() => handleReplayJump(step)}
              disabled={isPouring}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer disabled:opacity-50 ${
                pourCount === step
                  ? 'bg-orange-500 text-white shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {step === 0 ? 'Ban đầu (0)' : `Sau lần ${step}`}
            </button>
          ))}
        </div>
      </div>

      {/* ================================================================== */}
      {/* XXV. SMART HINT ("TẠI SAO?") EXPANDABLE CALLOUTS                   */}
      {/* ================================================================== */}
      {pourCount >= 1 && (
        <div className="bg-white rounded-2xl border border-sky-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-sky-100 text-sky-700">
                <Lightbulb className="w-4 h-4" />
              </span>
              <h4 className="font-bold text-xs text-sky-950 uppercase tracking-wide">
                GỢI Ý TƯ DUY — "TẠI SAO?"
              </h4>
            </div>
            <div className="flex items-center gap-1.5">
              {([1, 2, 3] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => handleToggleWhyHint(lvl)}
                  disabled={pourCount < lvl}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    activeWhyHint === lvl
                      ? 'bg-sky-600 text-white'
                      : pourCount >= lvl
                      ? 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Tại sao lần {lvl}?
                </button>
              ))}
            </div>
          </div>

          {activeWhyHint === 1 && (
            <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-sky-900 space-y-1 animate-fadeIn">
              <strong>Tại sao sau lần đổ 1, mực nước trong cốc trụ đạt mức h/3?</strong>
              <p className="text-slate-700 leading-relaxed">
                Vì thể tích chất lỏng của 1 phễu nón bằng đúng <MathFormula formula="\frac{1}{3}" /> thể tích cốc trụ có cùng bán kính đáy <em>R</em> và cùng chiều cao <em>h</em>. Diện tích đáy hình trụ đều nhau dọc theo chiều cao nên mực nước dâng tỉ lệ thuận với thể tích: <MathFormula formula="h_{\text{nước}} = \frac{1}{3}h" />.
              </p>
            </div>
          )}

          {activeWhyHint === 2 && (
            <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-sky-900 space-y-1 animate-fadeIn">
              <strong>Tại sao sau lần đổ 2, mực nước tiếp tục dâng lên đúng mức 2h/3?</strong>
              <p className="text-slate-700 leading-relaxed">
                Mỗi lần đổ, ta rót thêm đúng <MathFormula formula="V_{\text{nón}} = \frac{1}{3} V_{\text{trụ}}" />. Do đó sau 2 lần, lượng nước trong cốc trụ là <MathFormula formula="\frac{1}{3} + \frac{1}{3} = \frac{2}{3} V_{\text{trụ}}" />, mực nước đạt vạch <MathFormula formula="\frac{2}{3}h" />.
              </p>
            </div>
          )}

          {activeWhyHint === 3 && (
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-1 animate-fadeIn">
              <strong>Tại sao đúng 3 phễu nón đầy nước thì làm đầy cốc trụ?</strong>
              <p className="text-slate-700 leading-relaxed">
                Tổng thể tích của 3 phễu nón là <MathFormula formula="3 \times V_{\text{nón}} = 3 \times \left(\frac{1}{3} V_{\text{trụ}}\right) = V_{\text{trụ}}" />. Cốc trụ vừa đầy khít 100% không thừa không thiếu, khẳng định mối quan hệ toán học cơ bản: <MathFormula formula="V_{\text{nón}} = \frac{1}{3} V_{\text{trụ}}" />.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ================================================================== */}
      {/* XXVI. CONCLUSION PANEL & KATEX DERIVATIONS (WHEN pourCount === 3)   */}
      {/* ================================================================== */}
      {pourCount === 3 && (
        <ConclusionPanel
          radius={radius}
          height={height}
          predictionAnswer={predictionAnswer}
          onNavigateTheory={onNavigateTheory}
          onNavigateNextChallenge={onNavigateNextChallenge}
        />
      )}
    </div>
  );
};
