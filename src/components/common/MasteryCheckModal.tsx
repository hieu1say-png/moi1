/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - MASTERY CHECK MODAL COMPONENT
 * Interactive check dialog for concept retention and spaced error verification.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useErrorMemoryStore } from '../../stores/useErrorMemoryStore';
import { MathFormula, MathText } from './MathFormula';
import { Button } from './Button';
import { Badge } from './Badge';
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  X,
  Target,
  Award,
  BookOpen
} from 'lucide-react';

export const MasteryCheckModal: React.FC = () => {
  const {
    activeMasteryCheck,
    dismissActiveMasteryCheck,
    submitMasteryCheck,
    lastCheckResult
  } = useErrorMemoryStore();

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<any>(null);

  if (!activeMasteryCheck) return null;

  const handleSubmit = () => {
    let answer: any = null;
    if (activeMasteryCheck.type === 'multiple_choice') {
      if (!selectedOptionId) return;
      answer = selectedOptionId;
    } else if (activeMasteryCheck.type === 'numeric') {
      if (!numericInput.trim()) return;
      answer = numericInput;
    }

    const res = submitMasteryCheck(answer);
    setCurrentResult(res);
    setShowResult(true);
  };

  const handleClose = () => {
    setShowResult(false);
    setSelectedOptionId(null);
    setNumericInput('');
    setShowHint(false);
    dismissActiveMasteryCheck();
  };

  return (
    <div
      id="mastery-check-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn"
    >
      <div
        id="mastery-check-modal-container"
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col my-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-white/20 rounded-full">
                  Kiểm tra làm chủ
                </span>
                <span className="text-xs font-medium text-white/90">
                  {activeMasteryCheck.shape === 'cylinder' ? 'Hình Trụ' : activeMasteryCheck.shape === 'cone' ? 'Hình Nón' : 'Hình Cầu'}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                {activeMasteryCheck.conceptTitle}
              </h3>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {!showResult ? (
            <>
              {/* Question Text */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                <MathText text={activeMasteryCheck.questionText} />
                {activeMasteryCheck.questionLatex && (
                  <div className="mt-2 text-center p-2.5 bg-[#FFFDF8] rounded-xl border border-[#F3E8D7] font-mono text-slate-900 font-bold">
                    <MathFormula formula={activeMasteryCheck.questionLatex} displayMode={true} />
                  </div>
                )}
              </div>

              {/* Multiple Choice Options */}
              {activeMasteryCheck.type === 'multiple_choice' && activeMasteryCheck.options && (
                <div className="space-y-2 pt-1">
                  {activeMasteryCheck.options.map((opt, idx) => {
                    const isSelected = selectedOptionId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedOptionId(opt.id)}
                        className={`w-full p-3 sm:p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-orange-50 border-orange-500 text-orange-950 font-bold shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-orange-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                              isSelected
                                ? 'bg-orange-500 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt.text}</span>
                        </div>
                        {opt.latex && (
                          <span className="font-mono text-xs text-slate-500 font-bold">
                            <MathFormula formula={opt.latex} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Numeric Input */}
              {activeMasteryCheck.type === 'numeric' && (
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Nhập kết quả số của em:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Ví dụ: 5 hoặc 3.14..."
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-orange-500 bg-white"
                      autoFocus
                    />
                    {activeMasteryCheck.unit && (
                      <span className="px-3 py-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 font-mono">
                        {activeMasteryCheck.unit}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Hint Accordion */}
              {showHint ? (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                  <span className="font-bold flex items-center gap-1.5 text-amber-800">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    Gợi ý tư duy:
                  </span>
                  <p><MathText text={activeMasteryCheck.hint} /></p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowHint(true)}
                  className="text-[11px] text-slate-500 hover:text-orange-600 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Em chưa nhớ rõ? Xem gợi ý nhẹ</span>
                </button>
              )}
            </>
          ) : (
            /* Result Screen */
            <div className="space-y-4 py-2">
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 ${
                  currentResult?.isCorrect
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50 border-rose-200 text-rose-950'
                }`}
              >
                {currentResult?.isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <h4 className="text-sm font-bold">
                    {currentResult?.isCorrect ? 'Tuyệt vời! Em đã nắm rất chắc!' : 'Chưa chính xác rồi em ơi!'}
                  </h4>
                  <p className="text-xs leading-relaxed">
                    {currentResult?.feedbackText}
                  </p>
                </div>
              </div>

              {/* Explanation & Formula */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-left">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  Phương pháp & Giải thích bản chất:
                </span>
                <div className="text-xs text-slate-700 leading-relaxed font-medium">
                  <MathText text={activeMasteryCheck.explanation} />
                </div>
                {activeMasteryCheck.formulaLatex && (
                  <div className="p-2.5 bg-[#FFFDF8] rounded-xl border border-[#F3E8D7] text-center font-mono text-xs text-slate-900 font-bold">
                    <MathFormula formula={activeMasteryCheck.formulaLatex} displayMode={true} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between">
          {!showResult ? (
            <>
              <button
                type="button"
                onClick={handleClose}
                className="px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 cursor-pointer"
              >
                Để sau
              </button>
              <Button
                variant="primary"
                shape="pill"
                size="sm"
                onClick={handleSubmit}
                disabled={
                  (activeMasteryCheck.type === 'multiple_choice' && !selectedOptionId) ||
                  (activeMasteryCheck.type === 'numeric' && !numericInput.trim())
                }
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                className="font-bold"
              >
                Kiểm tra ngay
              </Button>
            </>
          ) : (
            <div className="w-full flex items-center justify-end">
              <Button
                variant="primary"
                shape="pill"
                size="sm"
                onClick={handleClose}
                className="font-bold"
              >
                Tiếp tục học tập
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
