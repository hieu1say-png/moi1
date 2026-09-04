/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * CONE FORMATION MAIN CONTAINER & STATE MACHINE ENGINE
 * Strictly adheres to Geometry Lab Pedagogical Specifications:
 * - Rotational Sweep of Right Triangle ΔSOA around OS -> Cone
 * - Non-Obstructive Layout (3D Stage + Docked Controls + Pedagogical Guide)
 */

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useLearningContext } from '../../../../context/LearningContext';
import { useToast } from '../../../../context/ToastContext';
import {
  ConeRotationPhase,
  ConeSweepMetrics,
  ConeStepDefinition
} from './coneCreationTypes';
import { ConeCreationScene } from './ConeCreationScene';
import { ConeCreationSteps, CONE_STEPS } from './ConeCreationSteps';
import { Play, Pause, RotateCcw, Sliders, Sparkles, CheckCircle2 } from 'lucide-react';

export interface ConeCreationModeProps {
  radius?: number;
  height?: number;
  onRadiusChange?: (r: number) => void;
  onHeightChange?: (h: number) => void;
  onFormationComplete?: (msg: string) => void;
  className?: string;
}

export const ConeCreationMode: React.FC<ConeCreationModeProps> = ({
  radius = 2.4,
  height = 4.2,
  onRadiusChange,
  onHeightChange,
  onFormationComplete,
  className = ''
}) => {
  const { updateContext } = useLearningContext();
  const { showSuccess, showInfo } = useToast();

  // Local state for radius & height
  const [localRadius, setLocalRadius] = useState<number>(radius);
  const [localHeight, setLocalHeight] = useState<number>(height);

  // Rotation Sweep Angle state (0 to 2*PI radians)
  const [sweepAngleRad, setSweepAngleRad] = useState<number>(0);
  const sweepAngleRef = useRef<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [isComparing, setIsComparing] = useState<boolean>(false);

  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    sweepAngleRef.current = sweepAngleRad;
  }, [sweepAngleRad]);

  useEffect(() => {
    if (radius !== undefined && radius !== localRadius) {
      setLocalRadius(radius);
    }
  }, [radius]);

  useEffect(() => {
    if (height !== undefined && height !== localHeight) {
      setLocalHeight(height);
    }
  }, [height]);

  const handleRChange = (newR: number) => {
    const validR = Math.max(1, Math.min(4, newR));
    setLocalRadius(validR);
    onRadiusChange?.(validR);
  };

  const handleHChange = (newH: number) => {
    const validH = Math.max(2, Math.min(6, newH));
    setLocalHeight(validH);
    onHeightChange?.(validH);
  };

  // Comprehensive Mathematical Model
  const metrics: ConeSweepMetrics = useMemo(() => {
    const r = localRadius;
    const h = localHeight;
    const l = Math.sqrt(r * r + h * h);
    const sweepAngleDeg = (sweepAngleRad / (Math.PI * 2)) * 360;
    const sweepProgress = sweepAngleRad / (Math.PI * 2);
    const baseCircumference = 2 * Math.PI * r;
    const currentArcLength = r * sweepAngleRad;
    const baseArea = Math.PI * r * r;
    const currentBaseAreaSwept = 0.5 * r * r * sweepAngleRad;
    const lateralArea = Math.PI * r * l;
    const currentLateralAreaSwept = 0.5 * r * l * sweepAngleRad;
    const totalArea = lateralArea + baseArea;
    const volume = (1 / 3) * Math.PI * r * r * h;

    return {
      r,
      h,
      l,
      sweepAngleRad,
      sweepAngleDeg,
      sweepProgress,
      baseCircumference,
      currentArcLength,
      baseArea,
      currentBaseAreaSwept,
      lateralArea,
      currentLateralAreaSwept,
      totalArea,
      volume
    };
  }, [localRadius, localHeight, sweepAngleRad]);

  // Smooth Step Interpolation Function
  const animateToAngle = useCallback((targetAngleRad: number, onComplete?: () => void) => {
    const startAngle = sweepAngleRef.current;
    const diff = targetAngleRad - startAngle;
    const startTime = performance.now();
    const duration = Math.max(400, Math.min(1200, Math.abs(diff) * 300));

    const stepAnimate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

      const current = startAngle + diff * ease;
      sweepAngleRef.current = current;
      setSweepAngleRad(current);

      if (progress < 1) {
        requestAnimationFrame(stepAnimate);
      } else {
        sweepAngleRef.current = targetAngleRad;
        setSweepAngleRad(targetAngleRad);
        onComplete?.();
      }
    };
    requestAnimationFrame(stepAnimate);
  }, []);

  // Handle Step Navigation
  const handleJumpToStep = useCallback((stepIdx: number) => {
    const validIdx = Math.max(0, Math.min(CONE_STEPS.length - 1, stepIdx));
    setCurrentStepIndex(validIdx);
    setIsAutoPlaying(false);

    const targetStep = CONE_STEPS[validIdx];
    const targetRad = (targetStep.targetAngleDeg / 180) * Math.PI;
    animateToAngle(targetRad);

    if (validIdx === 6 || validIdx === 7 || validIdx === 8) {
      onFormationComplete?.('Đã tạo thành hình nón hoàn chỉnh từ tam giác vuông SOA!');
    }
  }, [animateToAngle, onFormationComplete]);

  const handleNextStep = useCallback(() => {
    if (currentStepIndex < CONE_STEPS.length - 1) {
      handleJumpToStep(currentStepIndex + 1);
    }
  }, [currentStepIndex, handleJumpToStep]);

  const handlePrevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      handleJumpToStep(currentStepIndex - 1);
    }
  }, [currentStepIndex, handleJumpToStep]);

  // Reset to initial state
  const handleReset = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentStepIndex(0);
    animateToAngle(0);
    showInfo('Đã thiết lập lại vị trí tam giác vuông ban đầu.');
  }, [animateToAngle, showInfo]);

  // Auto-play loop (Continuous rotation sweep 0 to 360°)
  useEffect(() => {
    if (!isAutoPlaying) {
      lastTimeRef.current = null;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const ROTATION_SPEED = (Math.PI * 2) / 5.5; // 5.5 seconds for full 360°

    const tick = (now: number) => {
      if (lastTimeRef.current !== null) {
        const dt = (now - lastTimeRef.current) / 1000;
        const currentAngle = sweepAngleRef.current;
        const nextAngle = currentAngle + dt * ROTATION_SPEED;

        if (nextAngle >= Math.PI * 2) {
          sweepAngleRef.current = Math.PI * 2;
          setSweepAngleRad(Math.PI * 2);
          setIsAutoPlaying(false);
          setCurrentStepIndex(6);
          showSuccess('Hoàn thành quét không gian! Hình nón đã được tạo thành.');
          onFormationComplete?.('Tạo thành hình nón hoàn tất');
          return;
        }

        sweepAngleRef.current = nextAngle;
        setSweepAngleRad(nextAngle);

        // Sync currentStepIndex with angle thresholds
        const deg = (nextAngle / (Math.PI * 2)) * 360;
        if (deg >= 270) setCurrentStepIndex(5);
        else if (deg >= 180) setCurrentStepIndex(4);
        else if (deg >= 90) setCurrentStepIndex(3);
        else if (deg >= 45) setCurrentStepIndex(2);
      }
      lastTimeRef.current = now;
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAutoPlaying, onFormationComplete, showSuccess]);

  const handleToggleAutoPlay = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
    } else {
      if (sweepAngleRad >= Math.PI * 2 - 0.05) {
        setSweepAngleRad(0);
        setCurrentStepIndex(2);
      }
      setIsAutoPlaying(true);
    }
  };

  const currentPhase: ConeRotationPhase = CONE_STEPS[currentStepIndex]?.phase || 'INITIAL_TRIANGLE';

  return (
    <div
      id="cone-formation-experience"
      className={`w-full max-w-7xl mx-auto space-y-4 ${className}`}
    >
      {/* 2-Column Responsive Layout: Left 3D Stage (8 cols) & Right Step Engine (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* Left Column: 3D Stage + Bottom Sweep Controller Toolbar */}
        <div className="lg:col-span-8 space-y-3">
          {/* 3D WebGL Scene */}
          <div className="w-full h-[460px] sm:h-[520px] bg-slate-50 rounded-2xl sm:rounded-3xl border border-gray-200 shadow-sm overflow-hidden relative">
            <ConeCreationScene
              phase={currentPhase}
              metrics={metrics}
              sweepAngleRad={sweepAngleRad}
              highlightAxis={currentStepIndex === 1 || currentStepIndex === 7}
              highlightRadius={currentStepIndex === 2 || currentStepIndex === 3 || currentStepIndex === 7}
              highlightSlant={currentStepIndex === 4 || currentStepIndex === 5 || currentStepIndex === 7}
              showGhostTriangle={true}
              showLabels={true}
            />
          </div>

          {/* Docked Rotation Sweep Toolbar (Outside Canvas) */}
          <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleToggleAutoPlay}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto ${
                  isAutoPlaying
                    ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                    : 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs'
                }`}
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Tạm dừng</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Quay tự động (0° → 360°)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="p-2 rounded-xl text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-all cursor-pointer"
                title="Đặt lại góc quay về 0°"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Sweep Slider */}
            <div className="flex items-center gap-3 w-full sm:flex-1 max-w-md">
              <span className="text-xs font-semibold text-gray-600 whitespace-nowrap">
                Góc quay θ:
              </span>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={Math.round((sweepAngleRad / (Math.PI * 2)) * 360)}
                onChange={(e) => {
                  setIsAutoPlaying(false);
                  const deg = parseFloat(e.target.value);
                  const rad = (deg / 360) * Math.PI * 2;
                  setSweepAngleRad(rad);

                  // Update step accordingly
                  if (deg === 0) setCurrentStepIndex(0);
                  else if (deg < 45) setCurrentStepIndex(1);
                  else if (deg < 90) setCurrentStepIndex(2);
                  else if (deg < 180) setCurrentStepIndex(3);
                  else if (deg < 270) setCurrentStepIndex(4);
                  else if (deg < 360) setCurrentStepIndex(5);
                  else setCurrentStepIndex(6);
                }}
                className="w-full accent-orange-600 cursor-pointer h-2 bg-gray-200 rounded-lg"
              />
              <span className="text-xs font-mono font-bold text-orange-950 w-12 text-right">
                {Math.round((sweepAngleRad / (Math.PI * 2)) * 360)}°
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Pedagogical Step Engine (4 cols) */}
        <div className="lg:col-span-4 w-full">
          <ConeCreationSteps
            currentStepIndex={currentStepIndex}
            phase={currentPhase}
            metrics={metrics}
            isAutoPlaying={isAutoPlaying}
            onNextStep={handleNextStep}
            onPrevStep={handlePrevStep}
            onJumpToStep={handleJumpToStep}
            onToggleAutoPlay={handleToggleAutoPlay}
            onReset={handleReset}
            onRadiusChange={handleRChange}
            onHeightChange={handleHChange}
            onCompareToggle={() => setIsComparing(!isComparing)}
            isComparing={isComparing}
          />
        </div>
      </div>
    </div>
  );
};

export default ConeCreationMode;
