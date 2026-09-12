/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - PHASE 11: QUICK INSIGHT PREDICTOR
 * "Dự đoán trước khi thử nghiệm"
 * Kích thích tư duy phỏng đoán khoa học trước khi tương tác 3D / rót nước.
 * Học sinh chọn dự đoán -> xem mô phỏng 3D đối chiếu -> khắc sâu bản chất công thức.
 */

import React, { useState } from 'react';
import { ShapeType } from '../../types';
import { MathFormula } from '../common/MathFormula';
import { Button } from '../common/Button';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Lightbulb,
  FlaskConical,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export interface InsightQuestion {
  id: string;
  shape: ShapeType | 'all';
  title: string;
  questionText: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanationKaTeX: string;
  pedagogicalNote: string;
  actionLabel: string;
  targetParams?: { r?: number; h?: number; mode?: string };
}

const INSIGHT_QUESTIONS: Record<ShapeType, InsightQuestion[]> = {
  cylinder: [
    {
      id: 'cyl-ins-1',
      shape: 'cylinder',
      title: 'Hiệu ứng bán kính đáy đối với thể tích',
      questionText: 'Nếu giữ nguyên chiều cao $h$ và tăng gấp đôi bán kính đáy $r$ ($r \\to 2r$), thể tích hình trụ $V$ sẽ thay đổi như thế nào?',
      options: [
        { id: 'A', text: 'Tăng gấp đôi (2 lần)', isCorrect: false },
        { id: 'B', text: 'Tăng gấp 4 lần', isCorrect: true },
        { id: 'C', text: 'Không đổi', isCorrect: false },
        { id: 'D', text: 'Tăng gấp 8 lần', isCorrect: false }
      ],
      explanationKaTeX: 'V\' = \\pi (2r)^2 h = 4\\pi r^2 h = 4V',
      pedagogicalNote: 'Vì $r$ nằm ở bậc 2 trong công thức $V = \\pi r^2 h$, nên khi $r$ tăng $k$ lần thì thể tích tăng $k^2$ lần!',
      actionLabel: 'Thử nghiệm: Tăng r = 8 cm, h = 8 cm trên mô hình 3D',
      targetParams: { r: 8, h: 8 }
    },
    {
      id: 'cyl-ins-2',
      shape: 'cylinder',
      title: 'Mối quan hệ giữa đường sinh và chiều cao',
      questionText: 'Khi quay hình chữ nhật $ABCD$ một vòng quanh cạnh $AB$ cố định để tạo hình trụ, độ dài đường sinh $l = CD$ có bằng chiều cao $h = AB$ không?',
      options: [
        { id: 'A', text: 'Đường sinh $l$ luôn lớn hơn chiều cao $h$', isCorrect: false },
        { id: 'B', text: 'Bằng nhau: $l = h$', isCorrect: true },
        { id: 'C', text: 'Đường sinh $l$ nhỏ hơn chiều cao $h$', isCorrect: false },
        { id: 'D', text: 'Tùy thuộc vào bán kính đáy', isCorrect: false }
      ],
      explanationKaTeX: 'l = h \\quad (\\text{trong hình trụ})',
      pedagogicalNote: 'Vì $ABCD$ là hình chữ nhật nên hai cạnh đối $AB = CD$, do đó đường sinh và chiều cao hình trụ luôn bằng nhau!',
      actionLabel: 'Xem thiết diện cắt dọc hình trụ',
      targetParams: { mode: 'cross-section' }
    }
  ],
  cone: [
    {
      id: 'cone-ins-1',
      shape: 'cone',
      title: 'Thí nghiệm rót nước: Hình nón vs Hình trụ',
      questionText: 'Rót đầy nước vào một cốc hình nón rồi đổ toàn bộ vào một cốc hình trụ có cùng bán kính đáy và cùng chiều cao. Mực nước trong cốc hình trụ sẽ chiếm bao nhiêu phần chiều cao?',
      options: [
        { id: 'A', text: 'Đúng 1/3 chiều cao hình trụ', isCorrect: true },
        { id: 'B', text: 'Đúng 1/2 chiều cao hình trụ', isCorrect: false },
        { id: 'C', text: 'Đầy 2/3 chiều cao hình trụ', isCorrect: false },
        { id: 'D', text: 'Cốc trụ sẽ bị tràn nước ra ngoài', isCorrect: false }
      ],
      explanationKaTeX: 'V_{\\text{nón}} = \\frac{1}{3} \\pi r^2 h = \\frac{1}{3} V_{\\text{trụ}}',
      pedagogicalNote: 'Cần đúng 3 cốc nước hình nón để làm đầy một cốc hình trụ có cùng đáy và chiều cao! Đây là định lý nổi tiếng của Democritus & Eudoxus.',
      actionLabel: 'Thực hiện mô phỏng rót nước nón sang trụ',
      targetParams: { mode: 'liquid' }
    },
    {
      id: 'cone-ins-2',
      shape: 'cone',
      title: 'Độ dài đường sinh vs Chiều cao nón',
      questionText: 'Trong hình nón bất kỳ, độ dài đường sinh $l$ và chiều cao $h$ có mối quan hệ như thế nào?',
      options: [
        { id: 'A', text: 'Đường sinh luôn lớn hơn chiều cao ($l > h$)', isCorrect: true },
        { id: 'B', text: 'Đường sinh bằng chiều cao ($l = h$)', isCorrect: false },
        { id: 'C', text: 'Đường sinh luôn nhỏ hơn chiều cao ($l < h$)', isCorrect: false },
        { id: 'D', text: 'Không thể so sánh nếu chưa biết bán kính', isCorrect: false }
      ],
      explanationKaTeX: 'l = \\sqrt{h^2 + r^2} > h \\quad (\\text{do } r > 0)',
      pedagogicalNote: 'Thiết diện qua trục của hình nón là tam giác cân, trong đó đường sinh $l$ là cạnh huyền của tam giác vuông tạo bởi chiều cao $h$ và bán kính đáy $r$.',
      actionLabel: 'Kiểm chứng tam giác vuông tạo bởi h, r, l'
    }
  ],
  sphere: [
    {
      id: 'sph-ins-1',
      shape: 'sphere',
      title: 'Hiệu ứng phóng đại bán kính khối cầu',
      questionText: 'Nếu tăng bán kính khối cầu lên gấp 3 lần ($R \\to 3R$), thể tích khối cầu $V$ sẽ tăng gấp bao nhiêu lần?',
      options: [
        { id: 'A', text: 'Tăng gấp 3 lần', isCorrect: false },
        { id: 'B', text: 'Tăng gấp 9 lần', isCorrect: false },
        { id: 'C', text: 'Tăng gấp 27 lần', isCorrect: true },
        { id: 'D', text: 'Tăng gấp 12 lần', isCorrect: false }
      ],
      explanationKaTeX: 'V\' = \\frac{4}{3}\\pi (3R)^3 = 27 \\cdot \\left(\\frac{4}{3}\\pi R^3\\right) = 27V',
      pedagogicalNote: 'Thể tích khối cầu tỉ lệ với lập phương của bán kính ($R^3$). Do đó khi bán kính tăng 3 lần thì thể tích tăng tới $3^3 = 27$ lần!',
      actionLabel: 'Thử nghiệm tăng R = 6 cm trên mô hình 3D',
      targetParams: { r: 6 }
    },
    {
      id: 'sph-ins-2',
      shape: 'sphere',
      title: 'Mặt phẳng cắt khối cầu',
      questionText: 'Khi dùng một mặt phẳng cắt một hình cầu theo bất kỳ phương nào, thiết diện nhận được luôn là hình gì?',
      options: [
        { id: 'A', text: 'Luôn là một hình tròn', isCorrect: true },
        { id: 'B', text: 'Có thể là hình elip hoặc hình tròn', isCorrect: false },
        { id: 'C', text: 'Hình parabol', isCorrect: false },
        { id: 'D', text: 'Hình chữ nhật', isCorrect: false }
      ],
      explanationKaTeX: 'r_{\\text{td}} = \\sqrt{R^2 - d^2}',
      pedagogicalNote: 'Mọi mặt phẳng cắt hình cầu đều cho thiết diện là một hình tròn. Nếu mặt phẳng đi qua tâm ($d=0$), ta được hình tròn lớn bán kính $R$.',
      actionLabel: 'Xem mô phỏng mặt cắt khối cầu',
      targetParams: { mode: 'cross-section' }
    }
  ]
};

export interface QuickInsightPredictorProps {
  shape: ShapeType;
  onApplyParams?: (r?: number, h?: number, mode?: string) => void;
  className?: string;
}

export const QuickInsightPredictor: React.FC<QuickInsightPredictorProps> = ({
  shape,
  onApplyParams,
  className = ''
}) => {
  const questions = INSIGHT_QUESTIONS[shape] || INSIGHT_QUESTIONS.cylinder;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasPredicted, setHasPredicted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const currentQ = questions[currentIdx] || questions[0];

  const handleSelectOption = (optId: string) => {
    if (hasPredicted) return;
    setSelectedOption(optId);
  };

  const handleConfirmPrediction = () => {
    if (!selectedOption) return;
    setHasPredicted(true);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setHasPredicted(false);
  };

  const handleNextQuestion = () => {
    setCurrentIdx((prev) => (prev + 1) % questions.length);
    setSelectedOption(null);
    setHasPredicted(false);
  };

  const handleActionClick = () => {
    if (onApplyParams && currentQ.targetParams) {
      onApplyParams(currentQ.targetParams.r, currentQ.targetParams.h, currentQ.targetParams.mode);
    }
  };

  const selectedObj = currentQ.options.find((o) => o.id === selectedOption);
  const isCorrect = selectedObj ? selectedObj.isCorrect : false;

  return (
    <div
      id="quick-insight-predictor"
      className={`rounded-2xl border border-[#BBF7D0] bg-[#F0FDF4] p-3.5 sm:p-4 shadow-xs transition-all ${className}`}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-2 border-b border-[#DCFCE7] pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#16A34A] text-white flex items-center justify-center shrink-0 shadow-xs">
            <FlaskConical className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#15803D] bg-white px-2 py-0.5 rounded-full border border-[#BBF7D0]">
                Thực Nghiệm Khoa Học
              </span>
              <span className="text-xs font-semibold text-[#166534]">
                Dự đoán trước khi thử nghiệm
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-[#0F291E] mt-0.5 font-serif">
              {currentQ.title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg text-[#15803D] hover:bg-white/80 transition-colors cursor-pointer"
            title={isCollapsed ? 'Mở rộng' : 'Thu gọn'}
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="pt-3 space-y-3">
          {/* Question Text */}
          <div className="text-xs sm:text-sm text-[#1F3D2F] font-medium leading-relaxed font-serif">
            {currentQ.questionText}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              let btnStyle = 'bg-white border-[#E2EADF] text-[#0F291E] hover:border-[#16A34A]';

              if (hasPredicted) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-[#DCFCE7] border-[#22C55E] text-[#14532D] font-bold';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'bg-[#FEE2E2] border-[#EF4444] text-[#991B1B]';
                } else {
                  btnStyle = 'bg-white/60 border-gray-200 text-gray-400 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'bg-[#DCFCE7] border-[#16A34A] text-[#14532D] font-bold ring-2 ring-[#16A34A]/20';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={hasPredicted}
                  className={`px-3 py-2 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-2 cursor-pointer ${btnStyle}`}
                >
                  <span className="font-bold shrink-0 w-5 h-5 rounded-full bg-black/5 flex items-center justify-center text-xs">
                    {opt.id}
                  </span>
                  <span className="flex-1 font-serif">{opt.text}</span>
                  {hasPredicted && opt.isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {hasPredicted && isSelected && !opt.isCorrect && (
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Row */}
          {!hasPredicted ? (
            <div className="flex justify-end pt-1">
              <Button
                variant="cylinder"
                shape="pill"
                size="sm"
                disabled={!selectedOption}
                onClick={handleConfirmPrediction}
                rightIcon={<Sparkles className="w-3.5 h-3.5" />}
                className="text-xs font-bold bg-[#16A34A] hover:bg-[#15803D] text-white px-4 py-1.5"
              >
                Xác Nhận Dự Đoán Của Em
              </Button>
            </div>
          ) : (
            <div className="space-y-2.5 pt-1">
              {/* Result Feedback Banner */}
              <div
                className={`p-3 rounded-xl border text-xs sm:text-sm space-y-1.5 ${
                  isCorrect
                    ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]'
                    : 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Chính xác tuyệt đối! Trực giác và suy luận của em rất chuẩn.</span>
                    </>
                  ) : (
                    <>
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span>Chưa chính xác, nhưng đây là một dự đoán rất thú vị! Hãy xem công thức:</span>
                    </>
                  )}
                </div>

                <div className="py-1 px-2.5 bg-white rounded-lg border border-black/5 inline-block font-mono">
                  <MathFormula formula={currentQ.explanationKaTeX} />
                </div>

                <p className="text-xs leading-relaxed font-serif">
                  {currentQ.pedagogicalNote}
                </p>
              </div>

              {/* Action Buttons: Apply to 3D & Next Question */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                {currentQ.actionLabel && (
                  <button
                    type="button"
                    onClick={handleActionClick}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#16A34A] text-[#15803D] text-xs font-bold hover:bg-[#F0FDF4] transition-colors cursor-pointer shadow-xs"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>{currentQ.actionLabel}</span>
                  </button>
                )}

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#4B6354] hover:bg-white transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Thử lại</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16A34A] text-white text-xs font-bold hover:bg-[#15803D] transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Câu dự đoán khác →</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
