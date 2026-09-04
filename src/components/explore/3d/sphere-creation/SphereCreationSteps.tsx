/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * PEDAGOGICAL INTERACTIVE STEPS & QUIZZES FOR SPHERE FORMATION
 * Compliant with SGK Grade 9 Geometry Standards:
 * "Khi quay nửa hình tròn (hoặc đường tròn) tâm O, bán kính R một vòng quanh đường kính AB cố định thì được một hình cầu."
 */

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Play,
  Pause,
  Layers,
  ChevronRight,
  Compass,
  Trophy,
  Sliders,
  Check,
  Eye,
  Info,
  Maximize2
} from 'lucide-react';
import { MathText } from '../../../common/MathText';
import { Button } from '../../../common/Button';
import {
  SphereRotationPhase,
  SphereSweepMetrics,
  SpherePredictionOption,
  SphereStepDefinition
} from './sphereCreationTypes';

export interface SphereCreationStepsProps {
  currentStepIndex: number;
  phase: SphereRotationPhase;
  metrics: SphereSweepMetrics;
  isAutoPlaying: boolean;
  onNextStep: () => void;
  onPrevStep: () => void;
  onJumpToStep: (stepIndex: number) => void;
  onToggleAutoPlay: () => void;
  onReset: () => void;
  onRadiusChange: (r: number) => void;
  onCompareToggle?: () => void;
  isComparing?: boolean;
  className?: string;
}

export const SPHERE_STEPS: SphereStepDefinition[] = [
  {
    stepIndex: 0,
    phase: 'INITIAL_CIRCLE',
    targetAngleDeg: 0,
    title: 'Quan sát đường tròn ban đầu',
    subtitle: 'Đường tròn (C) tâm O, bán kính R trong mặt phẳng',
    description:
      'Xét một đường tròn (hoặc nửa đường tròn) tâm O, bán kính R và đường kính cố định AB = 2R nằm trong mặt phẳng. Điểm P là một điểm bất kỳ trên đường tròn với OP = R.',
    keyHighlight: 'Đoạn thẳng AB đi qua tâm O và có độ dài AB = 2R. Mọi điểm P trên đường tròn đều cách tâm O một khoảng bằng R.'
  },
  {
    stepIndex: 1,
    phase: 'SELECT_AXIS',
    targetAngleDeg: 0,
    title: 'Xác định trục quay & Dự đoán',
    subtitle: 'Cố định đường kính AB làm trục quay',
    description:
      'Ta giữ cố định đường kính AB và cho toàn bộ đường tròn (hoặc nửa đường tròn) quay xung quanh trục AB một vòng đầy đủ (360°).',
    keyHighlight: 'Trục quay cố định là đường thẳng chứa đường kính AB đi qua tâm O.'
  },
  {
    stepIndex: 2,
    phase: 'SWEEP_45',
    targetAngleDeg: 45,
    title: 'Bắt đầu quay không gian (0° → 45°)',
    subtitle: 'Vết quét của cung tròn rời mặt phẳng ban đầu',
    description:
      'Khi đường tròn bắt đầu quay quanh trục AB: điểm P rời khỏi mặt phẳng ban đầu và vẽ nên một cung tròn trong không gian có bán kính bằng khoảng cách từ P đến trục AB.',
    keyHighlight: 'Tất cả các điểm trên đường tròn đều chuyển động tròn quanh trục AB với tâm nằm trên trục AB.'
  },
  {
    stepIndex: 3,
    phase: 'SWEEP_90',
    targetAngleDeg: 90,
    title: 'Góc quay 90° (Một phần tư vòng)',
    subtitle: 'Tạo thành 1/4 hình cầu trong không gian',
    description:
      'Sau khi quay được 90° (một góc vuông), cung tròn đã quét được 1/4 diện tích mặt cầu và 1/4 thể tích khối cầu.',
    keyHighlight: 'Tại xích đạo, điểm P đã vạch nên một cung tròn 90° có độ dài l = (1/4) · 2πR = πR/2.'
  },
  {
    stepIndex: 4,
    phase: 'SWEEP_180',
    targetAngleDeg: 180,
    title: 'Góc quay 180° (Nửa vòng quay)',
    subtitle: 'Tạo thành nửa hình cầu (Bán cầu)',
    description:
      'Khi quay được nửa vòng (180°), đường tròn đến vị trí đối xứng qua trục AB. Vết quét trong không gian tạo thành một nửa khối cầu hoàn chỉnh.',
    keyHighlight: 'Mặt phẳng đối xứng chia đôi không gian thành hai nửa bán cầu bằng nhau.'
  },
  {
    stepIndex: 5,
    phase: 'SWEEP_270',
    targetAngleDeg: 270,
    title: 'Góc quay 270° (Ba phần tư vòng)',
    subtitle: 'Khối cầu gần như khép kín hoàn toàn',
    description:
      'Đường tròn tiếp tục quay qua góc 270°. Vết quét đã chiếm 3/4 không gian khối cầu. Chỉ còn 1/4 vòng nữa là mặt tròn xoay hoàn toàn khép kín.',
    keyHighlight: 'Góc quét đạt 270° = 3π/2 rad. Diện tích mặt quét được đạt (3/4) · 4πR² = 3πR².'
  },
  {
    stepIndex: 6,
    phase: 'SWEEP_360',
    targetAngleDeg: 360,
    title: 'Góc quay 360° — Hoàn thành hình cầu',
    subtitle: 'Khép kín toàn bộ không gian 3D',
    description:
      'Khi quay đủ một vòng (360°), đường tròn trở về vị trí xuất phát. Vết quét của đường tròn tạo thành MẶT CẦU, vết quét của hình tròn tạo thành KHỐI CẦU (HÌNH CẦU).',
    keyHighlight: 'Định nghĩa SGK Toán 9: Khi quay nửa hình tròn tâm O, bán kính R một vòng quanh đường kính AB cố định thì được một hình cầu.'
  },
  {
    stepIndex: 7,
    phase: 'IDENTIFY_ELEMENTS',
    targetAngleDeg: 360,
    title: 'Nhận diện các yếu tố & Công thức',
    subtitle: 'Tâm O, Bán kính R, Đường kính d = 2R, Diện tích S & Thể tích V',
    description:
      'Từ chuyển động quay tròn của đường tròn quanh đường kính AB, ta thu được các tính chất toán học chuẩn xác:',
    keyHighlight: 'Công thức Toán 9: S = 4πR² = πd² và V = (4/3)πR³ = (1/6)πd³.'
  }
];

const PREDICTION_OPTIONS: SpherePredictionOption[] = [
  {
    id: 'sphere',
    label: 'A',
    text: 'Tạo thành một Hình Cầu (Sphere)',
    isCorrect: true,
    explanation:
      'Chính xác! Khi quay một đường tròn (hoặc nửa đường tròn) quanh đường kính cố định của nó, tập hợp tất cả các điểm quét được trong không gian tạo thành một hình cầu.'
  },
  {
    id: 'cylinder',
    label: 'B',
    text: 'Tạo thành một Hình Trụ (Cylinder)',
    isCorrect: false,
    explanation:
      'Chưa đúng. Hình trụ được tạo thành khi quay một HÌNH CHỮ NHẬT quanh một cạnh cố định, không phải đường tròn.'
  },
  {
    id: 'cone',
    label: 'C',
    text: 'Tạo thành một Hình Nón (Cone)',
    isCorrect: false,
    explanation:
      'Chưa đúng. Hình nón được tạo thành khi quay một TAM GIÁC VUÔNG quanh một cạnh góc vuông cố định.'
  },
  {
    id: 'torus',
    label: 'D',
    text: 'Tạo thành một Hình Xuyến (Torus - Phao cứu sinh)',
    isCorrect: false,
    explanation:
      'Chưa đúng. Hình xuyến chỉ hình thành khi trục quay nằm NGOÀI đường tròn. Ở đây trục quay chính là ĐƯỜNG KÍNH đi qua tâm của đường tròn.'
  }
];

export const SphereCreationSteps: React.FC<SphereCreationStepsProps> = ({
  currentStepIndex,
  phase,
  metrics,
  isAutoPlaying,
  onNextStep,
  onPrevStep,
  onJumpToStep,
  onToggleAutoPlay,
  onReset,
  onRadiusChange,
  onCompareToggle,
  isComparing = false,
  className = ''
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [showRConfig, setShowRConfig] = useState<boolean>(false);

  const currentStep = SPHERE_STEPS[currentStepIndex] || SPHERE_STEPS[0];
  const { R, d, sweepAngleDeg, sweepProgress, currentSurfaceAreaSwept, totalSurfaceArea, currentVolumeSwept, totalVolume } = metrics;

  const handleSelectAnswer = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    setIsAnswerSubmitted(true);
  };

  const selectedOpt = PREDICTION_OPTIONS.find((o) => o.id === selectedAnswer);

  return (
    <div
      id="sphere-creation-steps-container"
      className={`flex flex-col h-full bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-xs p-4 sm:p-5 space-y-4 ${className}`}
    >
      {/* 1. Step Header & Progress Track */}
      <div className="space-y-2 border-b border-gray-100 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
              BƯỚC {currentStepIndex + 1}/{SPHERE_STEPS.length}
            </span>
            <span className="text-xs font-semibold text-gray-500 hidden sm:inline">
              Tiến trình quét {Math.round(sweepProgress * 100)}%
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowRConfig(!showRConfig)}
            className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
            title="Tùy chỉnh bán kính R"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-600" />
            <span>R = {R}cm</span>
          </button>
        </div>

        {/* 8-Step Interactive Progress Bubbles */}
        <div className="grid grid-cols-8 gap-1 pt-1">
          {SPHERE_STEPS.map((step, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isCompleted = idx < currentStepIndex;
            return (
              <button
                key={step.phase}
                type="button"
                onClick={() => onJumpToStep(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-emerald-600 ring-2 ring-emerald-300 ring-offset-1'
                    : isCompleted
                    ? 'bg-emerald-400 hover:bg-emerald-500'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                title={`Bước ${idx + 1}: ${step.title}`}
              />
            );
          })}
        </div>

        {/* Collapsible Radius Slider */}
        {showRConfig && (
          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 space-y-2 mt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-950">Bán kính R:</span>
              <span className="font-mono font-bold text-emerald-700">{R} cm (Đường kính d = {2 * R} cm)</span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              step="0.5"
              value={R}
              onChange={(e) => onRadiusChange(parseFloat(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-emerald-200 rounded-lg"
            />
          </div>
        )}
      </div>

      {/* 2. Main Step Instruction Content */}
      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
            {currentStep.title}
          </h3>
          <p className="text-xs font-medium text-emerald-700 mt-0.5">
            {currentStep.subtitle}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-serif">
          {currentStep.description}
        </p>

        {/* Key Highlight Callout */}
        <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-950 leading-relaxed font-medium">
            {currentStep.keyHighlight}
          </div>
        </div>

        {/* Step 2: Prediction Quiz */}
        {currentStepIndex === 1 && (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>Dự đoán hình học:</span>
            </div>
            <p className="text-xs text-gray-700 font-medium">
              Khi quay một đường tròn (hoặc nửa đường tròn) một vòng đầy đủ 360° quanh đường kính AB cố định, ta sẽ thu được hình gì?
            </p>

            <div className="grid grid-cols-1 gap-1.5 pt-1">
              {PREDICTION_OPTIONS.map((opt) => {
                const isSelected = selectedAnswer === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectAnswer(opt.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-bold ring-1 ring-emerald-400'
                        : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span>
                      <strong className="font-mono text-emerald-700 mr-2">{opt.label}.</strong>
                      {opt.text}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>

            {!isAnswerSubmitted ? (
              <Button
                variant="primary"
                size="sm"
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className="w-full text-xs font-bold mt-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Kiểm tra dự đoán
              </Button>
            ) : (
              <div
                className={`p-3 rounded-xl text-xs space-y-1 mt-2 border ${
                  selectedOpt?.isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  {selectedOpt?.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                  )}
                  <span>{selectedOpt?.isCorrect ? 'Dự đoán hoàn toàn chính xác!' : 'Giải thích chi tiết:'}</span>
                </div>
                <p className="leading-relaxed">{selectedOpt?.explanation}</p>
              </div>
            )}
          </div>
        )}

        {/* Step 7 & 8: Real-time Live Calculations & Elements */}
        {(currentStepIndex === 6 || currentStepIndex === 7) && (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-gray-800 border-b border-gray-200 pb-2">
              <span className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-emerald-600" />
                <span>Các yếu tố & Công thức Toán 9</span>
              </span>
              <span className="font-mono text-emerald-700">R = {R} cm</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-gray-200 space-y-1">
                <div className="text-[11px] text-gray-500 font-medium">Đường kính trục quay:</div>
                <div className="font-mono font-bold text-blue-700">
                  <MathText text="d = 2R" /> = {2 * R} cm
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-gray-200 space-y-1">
                <div className="text-[11px] text-gray-500 font-medium">Đường tròn lớn (Xích đạo):</div>
                <div className="font-mono font-bold text-teal-700">
                  <MathText text="S_{đtl} = \pi R^2" /> ≈ {(Math.PI * R * R).toFixed(2)} cm²
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-gray-200 space-y-1">
                <div className="text-[11px] text-gray-500 font-medium">Diện tích mặt cầu:</div>
                <div className="font-mono font-bold text-emerald-700">
                  <MathText text="S = 4\pi R^2" /> ≈ {totalSurfaceArea.toFixed(2)} cm²
                </div>
                <div className="text-[10px] text-gray-500 font-mono">(= 4 lần diện tích đường tròn lớn)</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-gray-200 space-y-1">
                <div className="text-[11px] text-gray-500 font-medium">Thể tích khối cầu:</div>
                <div className="font-mono font-bold text-orange-700">
                  <MathText text="V = \frac{4}{3}\pi R^3" /> ≈ {totalVolume.toFixed(2)} cm³
                </div>
              </div>
            </div>

            {/* Before vs After Comparison Button */}
            {onCompareToggle && (
              <button
                type="button"
                onClick={onCompareToggle}
                className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isComparing ? 'Ẩn bảng so sánh Trước / Sau' : 'Xem bảng so sánh 2D (Đường tròn) ➔ 3D (Hình cầu)'}</span>
              </button>
            )}
          </div>
        )}

        {/* 2D vs 3D Comparison Drawer */}
        {isComparing && (
          <div className="p-3.5 rounded-xl bg-emerald-950 text-white space-y-2.5 animate-fadeIn text-xs">
            <div className="font-bold flex items-center gap-1.5 text-emerald-300">
              <Layers className="w-4 h-4" />
              <span>Đối chiếu bản chất hình học: 2D ➔ 3D</span>
            </div>
            <div className="space-y-1.5 text-[11px] text-emerald-100/90 leading-relaxed font-serif">
              <div className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Tâm:</strong> Tâm O của đường tròn ➔ Tâm đối xứng O của hình cầu.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Trục:</strong> Đường kính cố định AB (d = 2R) ➔ Trục quay đối xứng của hình cầu.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Đường biên:</strong> Đường tròn phẳng (2D) ➔ Quét tạo thành <strong>Mặt cầu</strong> (2D cong trong không gian 3D).</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Miền trong:</strong> Hình tròn phẳng (2D) ➔ Quét tạo thành <strong>Khối cầu</strong> (3D).</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Navigation Controls (Next / Prev / Reset) */}
      <div className="border-t border-gray-100 pt-3 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevStep}
          disabled={currentStepIndex === 0}
          className="text-xs font-semibold flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Bước trước</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 cursor-pointer"
          title="Đặt lại về góc quay 0°"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Đặt lại</span>
        </Button>

        <Button
          variant="primary"
          size="sm"
          onClick={onNextStep}
          disabled={currentStepIndex === SPHERE_STEPS.length - 1}
          className="text-xs font-bold flex items-center gap-1 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <span>Bước tiếp</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default SphereCreationSteps;
