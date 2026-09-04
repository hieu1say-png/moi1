/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - WATER POURING EXPERIMENT Socratic "Observe -> Explain" Loop
 * Triggered upon completing 3 water pourings (Cone -> Cylinder).
 * Deepens conceptual mastery: $V_{\text{nón}} = \frac{1}{3} V_{\text{trụ}} = \frac{1}{3} \pi r^2 h$.
 */

import React, { useState } from 'react';
import { Sparkles, CheckCircle2, HelpCircle, X, ArrowRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface WaterPouringExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified?: () => void;
}

export const WaterPouringExplanationModal: React.FC<WaterPouringExplanationModalProps> = ({
  isOpen,
  onClose,
  onVerified
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  if (!isOpen) return null;

  const options = [
    {
      id: 1,
      text: 'Vì diện tích xung quanh hình nón bằng 1/3 diện tích xung quanh hình trụ.',
      isCorrect: false,
      feedback: 'Chưa chính xác. Diện tích xung quanh hình nón là Sxq = πrl, không phải bằng 1/3 diện tích xung quanh hình trụ.'
    },
    {
      id: 2,
      text: 'Vì hình nón thu hẹp dần về đỉnh, thực nghiệm rót nước 3 lần chứng minh thể tích hình nón bằng đúng 1/3 thể tích hình trụ có cùng bán kính đáy r và chiều cao h.',
      isCorrect: true,
      feedback: 'Chính xác xuất sắc! Khi cùng đáy và chiều cao, không gian khối nón thu hẹp tuyến tính về đỉnh S, do đó thể tích đúng bằng 1/3 V trụ: V = 1/3 πr²h.'
    },
    {
      id: 3,
      text: 'Vì đường sinh của hình nón luôn nhỏ hơn chiều cao của hình trụ.',
      isCorrect: false,
      feedback: 'Sai rồi nhé! Trong tam giác vuông tạo thành hình nón, đường sinh l là cạnh huyền nên luôn LỚN HƠN chiều cao h (l² = r² + h²).'
    }
  ];

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (options[index].isCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
      onVerified?.();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in font-sans">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-blue-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-sm font-bold leading-tight">
                Vòng Lặp Sư Phạm: Quan Sát → Giải Thích
              </h3>
              <p className="text-[11px] text-blue-100">
                Thí nghiệm Nghịch lý Thể tích 1/3 (Thầy Hiếu AI)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-blue-900 font-bold block mb-1">
                Câu hỏi tư duy Socrates:
              </strong>
              <p className="text-slate-700 leading-relaxed">
                Em vừa thực hiện rót đúng <strong>3 ca nước hình nón</strong> để làm đầy tràn <strong>1 bình hình trụ</strong> có cùng bán kính đáy $r$ và chiều cao $h$. Theo em, bản chất toán học của hiện tượng này là gì?
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = 'border-slate-200 hover:border-blue-400 bg-white';
              if (isAnswered) {
                if (opt.isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900';
                } else if (isSelected) {
                  btnStyle = 'border-red-500 bg-red-50 text-red-900';
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {isAnswered && selectedOption !== null && (
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${options[selectedOption].isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
              <div className="font-bold flex items-center gap-1.5 mb-1">
                {options[selectedOption].isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Chính xác! Ghi nhận vào năng lực M4 (Giao tiếp toán học).</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    <span>Gợi ý từ Thầy Hiếu AI:</span>
                  </>
                )}
              </div>
              <p>{options[selectedOption].feedback}</p>
            </div>
          )}

          {isAnswered && (
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Tiếp tục khám phá 3D</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
