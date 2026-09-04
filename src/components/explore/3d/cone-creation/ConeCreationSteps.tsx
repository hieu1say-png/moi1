/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * PEDAGOGICAL INTERACTIVE STEPS & QUIZZES FOR CONE FORMATION (ROTATION OF RIGHT TRIANGLE)
 * Compliant with SGK Grade 9 Geometry Standards
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
  ConeRotationPhase,
  ConeSweepMetrics,
  ConePredictionOption,
  ConeStepDefinition
} from './coneCreationTypes';

export interface ConeCreationStepsProps {
  currentStepIndex: number;
  phase: ConeRotationPhase;
  metrics: ConeSweepMetrics;
  isAutoPlaying: boolean;
  onNextStep: () => void;
  onPrevStep: () => void;
  onJumpToStep: (stepIndex: number) => void;
  onToggleAutoPlay: () => void;
  onReset: () => void;
  onRadiusChange: (r: number) => void;
  onHeightChange: (h: number) => void;
  onCompareToggle?: () => void;
  isComparing?: boolean;
  className?: string;
}

export const CONE_STEPS: ConeStepDefinition[] = [
  {
    stepIndex: 0,
    phase: 'INITIAL_TRIANGLE',
    targetAngleDeg: 0,
    title: 'Quan sát tam giác vuông ban đầu',
    subtitle: 'Mô hình tam giác vuông SOA phẳng',
    description:
      'Xét tam giác vuông SOA vuông tại O nằm trong mặt phẳng. Cạnh OS là một cạnh góc vuông, OA là cạnh góc vuông còn lại, và SA là cạnh huyền.',
    keyHighlight: 'OS ⟂ OA tại đỉnh O. Độ dài OA = r, OS = h, SA = l.'
  },
  {
    stepIndex: 1,
    phase: 'SELECT_AXIS',
    targetAngleDeg: 0,
    title: 'Xác định trục quay & Dự đoán',
    subtitle: 'Cố định cạnh góc vuông OS làm trục',
    description:
      'Ta giữ cố định cạnh góc vuông OS và cho toàn bộ tam giác vuông SOA quay xung quanh trục OS một vòng đầy đủ (360°).',
    keyHighlight: 'Trục quay cố định là trục thẳng đứng đi qua hai điểm O và S.'
  },
  {
    stepIndex: 2,
    phase: 'SWEEP_SMALL',
    targetAngleDeg: 45,
    title: 'Bắt đầu quét không gian (0° → 45°)',
    subtitle: 'Vết quét của các cạnh tam giác',
    description:
      'Khi tam giác SOA bắt đầu quay quanh OS: cạnh OA quét trong mặt phẳng vuông góc với OS tại O tạo ra một hình quạt đáy; cạnh SA quét không gian tạo nên mặt cong xung quanh.',
    keyHighlight: 'OA quét cung tròn đáy, SA quét mặt nón xung quanh.'
  },
  {
    stepIndex: 3,
    phase: 'SWEEP_90',
    targetAngleDeg: 90,
    title: 'Góc quay 90° (Một phần tư vòng)',
    subtitle: 'Tạo thành 1/4 hình nón',
    description:
      'Sau khi quay được 90° (một góc vuông), điểm A đã vẽ nên một cung tròn 90° trên mặt phẳng đáy. Cạnh SA đã quét được 1/4 diện tích mặt xung quanh.',
    keyHighlight: 'Độ dài cung đáy quét được: l_cung = (1/4) · 2πr = πr/2.'
  },
  {
    stepIndex: 4,
    phase: 'SWEEP_180',
    targetAngleDeg: 180,
    title: 'Góc quay 180° (Nửa vòng quay)',
    subtitle: 'Tạo thành nửa hình nón đối xứng',
    description:
      'Khi quay được nửa vòng (180°), điểm A đến vị trí đối xứng qua trục OS. Vết quét của OA tạo thành một nửa hình tròn đáy, SA tạo thành nửa mặt xung quanh.',
    keyHighlight: 'Vết quét của tam giác vuông luôn nhận OS làm trục đối xứng quay.'
  },
  {
    stepIndex: 5,
    phase: 'SWEEP_270',
    targetAngleDeg: 270,
    title: 'Góc quay 270° (Ba phần tư vòng)',
    subtitle: 'Hình nón gần như hoàn tất',
    description:
      'Tam giác SOA tiếp tục quay qua góc 270°. Điểm A tiếp tục vẽ cung tròn đáy. Khoảng không gian quét được đã chiếm 3/4 thể tích hình nón.',
    keyHighlight: 'Góc quét đáy đạt 270° = 3π/2 rad.'
  },
  {
    stepIndex: 6,
    phase: 'SWEEP_360',
    targetAngleDeg: 360,
    title: 'Góc quay 360° — Hoàn thành hình nón',
    subtitle: 'Khép kín không gian quét 3D',
    description:
      'Khi quay đủ một vòng (360°), điểm A quay trở lại vị trí ban đầu. Cạnh OA quét trọn vẹn thành một hình tròn đáy bán kính r. Cạnh SA quét trọn vẹn thành mặt xung quanh của hình nón.',
    keyHighlight: 'Định nghĩa SGK: Khi quay tam giác vuông SOA một vòng quanh cạnh góc vuông OS cố định thì được một hình nón.'
  },
  {
    stepIndex: 7,
    phase: 'IDENTIFY_ELEMENTS',
    targetAngleDeg: 360,
    title: 'Nhận diện các yếu tố hình học của hình nón',
    subtitle: 'Đỉnh, Trục, Đáy, Bán kính, Đường sinh',
    description:
      'Từ tam giác vuông SOA ban đầu, ta nhận diện rõ các thành phần cấu tạo nên hình nón:',
    keyHighlight: 'Mối quan hệ Pythagore trong tam giác vuông SOA: l² = r² + h²  =>  l = √(r² + h²).'
  },
  {
    stepIndex: 8,
    phase: 'COMPARE_AND_SUMMARY',
    targetAngleDeg: 360,
    title: 'Tổng kết & Đối chiếu Trước / Sau',
    subtitle: 'Chuyển hóa từ hình phẳng 2D sang khối 3D',
    description:
      'So sánh sự tương ứng hoàn hảo giữa các thành phần của tam giác vuông phẳng SOA và các thành phần của hình nón không gian 3D.',
    keyHighlight: 'Khắc sâu bản chất toán học: Hình nón là mặt tròn xoay sinh bởi tam giác vuông quay quanh một cạnh góc vuông.'
  }
];

const PREDICTION_OPTIONS: ConePredictionOption[] = [
  {
    id: 'cone',
    label: 'A',
    text: 'Tạo thành một Hình Nón (Cone)',
    isCorrect: true,
    explanation:
      'Chính xác! Cạnh OA quét tạo thành hình tròn đáy, cạnh huyền SA quét tạo thành mặt xung quanh, và đỉnh S là đỉnh nón.'
  },
  {
    id: 'cylinder',
    label: 'B',
    text: 'Tạo thành một Hình Trụ (Cylinder)',
    isCorrect: false,
    explanation:
      'Chưa đúng. Hình trụ được tạo thành khi quay một HÌNH CHỮ NHẬT quanh một cạnh, không phải tam giác vuông.'
  },
  {
    id: 'sphere',
    label: 'C',
    text: 'Tạo thành một Hình Cầu (Sphere)',
    isCorrect: false,
    explanation:
      'Chưa đúng. Hình cầu được tạo thành khi quay một NỬA HÌNH TRÒN quanh đường kính của nó.'
  },
  {
    id: 'unchanged',
    label: 'D',
    text: 'Không tạo thành hình khối kín',
    isCorrect: false,
    explanation:
      'Chưa đúng. Khi quay liên tục 360°, các cạnh tam giác quét kín một miền không gian 3D tạo thành hình khối nón hoàn chỉnh.'
  }
];

export const ConeCreationSteps: React.FC<ConeCreationStepsProps> = ({
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
  onHeightChange,
  onCompareToggle,
  isComparing = false,
  className = ''
}) => {
  const { r, h, l, lateralArea, totalArea, volume, sweepAngleDeg } = metrics;
  const currentStep = CONE_STEPS[currentStepIndex] || CONE_STEPS[0];

  // Prediction Quiz State (Step 1)
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean>(false);

  // Micro Knowledge Check State (Step 8)
  const [quizAnswer1, setQuizAnswer1] = useState<string | null>(null);
  const [quizAnswer2, setQuizAnswer2] = useState<string | null>(null);

  const handlePredictionSelect = (optionId: string) => {
    setSelectedPrediction(optionId);
    setPredictionSubmitted(true);
  };

  return (
    <div
      id="cone-creation-steps-container"
      className={`bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-4 sm:p-6 shadow-sm flex flex-col justify-between space-y-4 ${className}`}
    >
      {/* Top Header & Step Tracker */}
      <div>
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-orange-100 text-orange-800 text-xs font-bold font-mono">
              BƯỚC {currentStepIndex}/8
            </span>
            <span className="text-xs font-semibold text-gray-700 truncate max-w-[200px] sm:max-w-none">
              {currentStep.title}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onToggleAutoPlay}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all flex items-center gap-1 cursor-pointer ${
                isAutoPlaying
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200'
              }`}
              title="Chuyển đổi giữa chế độ Tự động và Từng bước"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-700" />
                  <span>Tạm dừng</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tự động</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onReset}
              className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg border border-gray-200 transition-all cursor-pointer"
              title="Chơi lại từ đầu"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Progress Bar with 8 Step Dots */}
        <div className="pt-3 pb-1">
          <div className="flex items-center justify-between gap-1 mb-1.5">
            {CONE_STEPS.map((step, idx) => (
              <button
                key={step.stepIndex}
                type="button"
                onClick={() => onJumpToStep(idx)}
                className={`h-2 flex-1 rounded-full transition-all cursor-pointer ${
                  idx === currentStepIndex
                    ? 'bg-orange-500 ring-2 ring-orange-200'
                    : idx < currentStepIndex
                    ? 'bg-emerald-500'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                title={`Bước ${idx}: ${step.title}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Dynamic Step Content */}
      <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[380px] pr-1">
        {/* Step Title & Description */}
        <div className="space-y-1">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-1.5">
            <span>{currentStep.title}</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{currentStep.description}</p>
        </div>

        {/* Highlight Callout */}
        <div className="p-3 rounded-xl bg-orange-50 border border-orange-200/80 text-xs sm:text-sm text-orange-950 font-medium leading-relaxed">
          <div className="font-bold text-orange-900 mb-0.5 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Trọng tâm toán học:</span>
          </div>
          <div>{currentStep.keyHighlight}</div>
        </div>

        {/* STEP 1: PREDICTION QUIZ */}
        {currentStepIndex === 1 && (
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Câu hỏi dự đoán (Toán 9):</span>
            </div>
            <p className="text-xs text-blue-950">
              Nếu quay tam giác vuông SOA một vòng quanh cạnh góc vuông OS cố định, em dự đoán thu được hình gì?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {PREDICTION_OPTIONS.map((opt) => {
                const isSelected = selectedPrediction === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handlePredictionSelect(opt.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-start gap-2 ${
                      isSelected
                        ? opt.isCorrect
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-200'
                          : 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-200'
                        : 'bg-white hover:bg-blue-100/50 border-blue-200 text-gray-800'
                    }`}
                  >
                    <span className="font-bold font-mono px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[11px]">
                      {opt.label}
                    </span>
                    <span className="font-medium flex-1">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {predictionSubmitted && selectedPrediction && (
              <div
                className={`p-2.5 rounded-lg text-xs leading-relaxed ${
                  PREDICTION_OPTIONS.find((o) => o.id === selectedPrediction)?.isCorrect
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-medium'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}
              >
                {PREDICTION_OPTIONS.find((o) => o.id === selectedPrediction)?.explanation}
              </div>
            )}
          </div>
        )}

        {/* STEP 7: IDENTIFY ELEMENTS & PYTHAGOREAN THEOREM */}
        {currentStepIndex === 7 && (
          <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 space-y-3">
            <h4 className="text-xs font-bold text-purple-950 uppercase tracking-wide">
              3 Yếu tố cốt lõi của hình nón:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-white border border-blue-200">
                <div className="font-bold text-blue-700 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>Chiều cao (h = OS)</span>
                </div>
                <div className="text-gray-600 text-[11px] mt-0.5">Trục quay cố định = {h} cm</div>
              </div>

              <div className="p-2 rounded-lg bg-white border border-orange-200">
                <div className="font-bold text-orange-700 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span>Bán kính đáy (r = OA)</span>
                </div>
                <div className="text-gray-600 text-[11px] mt-0.5">Quét thành đường tròn đáy = {r} cm</div>
              </div>

              <div className="p-2 rounded-lg bg-white border border-purple-200">
                <div className="font-bold text-purple-700 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  <span>Đường sinh (l = SA)</span>
                </div>
                <div className="text-gray-600 text-[11px] mt-0.5">Quét thành mặt xung quanh = {l.toFixed(2)} cm</div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-purple-300 text-xs font-mono text-purple-900 flex items-center justify-between">
              <span>Định lý Pythagore:</span>
              <span className="font-bold text-sm text-purple-950">
                l = √(r² + h²) = √({r}² + {h}²) = {l.toFixed(2)} cm
              </span>
            </div>
          </div>
        )}

        {/* STEP 8: BEFORE / AFTER COMPARISON TABLE & SUMMARY */}
        {currentStepIndex === 8 && (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-orange-600" />
              <span>Đối chiếu: Tam giác vuông phẳng (2D) ➔ Hình nón (3D)</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-200 text-slate-800">
                    <th className="p-2 rounded-l-lg">Thành phần trong Δ vuông SOA</th>
                    <th className="p-2">Hành động khi quay</th>
                    <th className="p-2 rounded-r-lg">Thành phần tạo ra ở Hình Nón</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-2 font-bold text-blue-700">Cạnh góc vuông OS</td>
                    <td className="p-2">Cố định</td>
                    <td className="p-2 font-semibold text-blue-900">Trục quay & Chiều cao (h)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-orange-700">Cạnh góc vuông OA</td>
                    <td className="p-2">Quét trên mặt phẳng vuông góc OS</td>
                    <td className="p-2 font-semibold text-orange-900">Hình tròn đáy (bán kính r)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-purple-700">Cạnh huyền SA</td>
                    <td className="p-2">Quét không gian quanh trục OS</td>
                    <td className="p-2 font-semibold text-purple-900">Mặt xung quanh (đường sinh l)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-gray-800">Đỉnh S</td>
                    <td className="p-2">Cố định trên trục quay</td>
                    <td className="p-2 font-semibold text-gray-900">Đỉnh của hình nón</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Formulas Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
              <div className="p-2 rounded-lg bg-orange-100/70 border border-orange-200">
                <span className="text-gray-600 block text-[10px]">Diện tích xung quanh</span>
                <span className="font-bold text-orange-950">S_xq = π·r·l = {lateralArea.toFixed(1)} cm²</span>
              </div>
              <div className="p-2 rounded-lg bg-amber-100/70 border border-amber-200">
                <span className="text-gray-600 block text-[10px]">Diện tích toàn phần</span>
                <span className="font-bold text-amber-950">S_tp = π·r·l + π·r² = {totalArea.toFixed(1)} cm²</span>
              </div>
              <div className="p-2 rounded-lg bg-blue-100/70 border border-blue-200">
                <span className="text-gray-600 block text-[10px]">Thể tích hình nón</span>
                <span className="font-bold text-blue-950">V = 1/3·π·r²·h = {volume.toFixed(1)} cm³</span>
              </div>
            </div>
          </div>
        )}

        {/* Real-time Parameters & Metric Slider in All Steps */}
        <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-gray-700">
            <span className="flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-gray-500" />
              <span>Thông số thực nghiệm tam giác vuông SOA:</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Radius r Slider */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-orange-700 font-semibold">Bán kính đáy OA (r):</span>
                <span className="font-bold font-mono text-orange-950">{r} cm</span>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                step="0.2"
                value={r}
                onChange={(e) => onRadiusChange(parseFloat(e.target.value))}
                className="w-full accent-orange-600 cursor-pointer h-1.5 bg-gray-200 rounded-lg"
              />
            </div>

            {/* Height h Slider */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-blue-700 font-semibold">Chiều cao OS (h):</span>
                <span className="font-bold font-mono text-blue-950">{h} cm</span>
              </div>
              <input
                type="range"
                min="2"
                max="6"
                step="0.2"
                value={h}
                onChange={(e) => onHeightChange(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-1.5 bg-gray-200 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevStep}
          disabled={currentStepIndex === 0}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          className="cursor-pointer"
        >
          Bước trước
        </Button>

        <div className="text-xs font-mono text-gray-500">
          Góc quét: <strong className="text-orange-600">{Math.round(sweepAngleDeg)}°</strong> / 360°
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={onNextStep}
          disabled={currentStepIndex === CONE_STEPS.length - 1}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white"
        >
          {currentStepIndex === CONE_STEPS.length - 2 ? 'Xem tổng kết' : 'Bước tiếp'}
        </Button>
      </div>
    </div>
  );
};

export default ConeCreationSteps;
