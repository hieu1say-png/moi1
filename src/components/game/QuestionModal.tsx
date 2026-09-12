/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - HÌNH HỌC 9 MASTER QUESTION MODAL
 * Renders verified questions from the Geometry Lab Question Bank.
 * Optimized with memoized KaTeX MathText, cognitive load reduction,
 * two-step selection & confirmation flow, and responsive mobile-first targets.
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GameQuestion } from '../../services/geometryGameQuestionService';
import { MathText } from '../common/MathFormula';

interface QuestionModalProps {
  currentQuestion: GameQuestion;
  score: number;
  maxScore: number;
  timeLeft: number;
  cheats: number;
  eliminatedOptions: number[];
  isBossStage: boolean;
  bossHP: number;
  bossHitsNeeded: number;
  feedbackDuration?: number;
  onAnswer: (index: number) => void;
  onUseCheat: () => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({
  currentQuestion,
  score,
  maxScore,
  timeLeft,
  cheats,
  eliminatedOptions,
  isBossStage,
  bossHP,
  bossHitsNeeded,
  feedbackDuration = 800,
  onAnswer,
  onUseCheat
}) => {
  const optionLabels = ['A', 'B', 'C', 'D'];
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submittedState, setSubmittedState] = useState<{ answerIdx: number; isCorrect: boolean } | null>(null);
  const submittedRef = useRef(false);

  // Reset local selection when current question changes
  useEffect(() => {
    setSelectedOption(null);
    setSubmittedState(null);
    submittedRef.current = false;
  }, [currentQuestion.id]);

  // Memoize KaTeX rendering for question prompt so timeLeft ticking doesn't trigger KaTeX re-parsing
  const memoizedPrompt = useMemo(() => {
    return <MathText text={currentQuestion.q} />;
  }, [currentQuestion.id, currentQuestion.q]);

  // Memoize KaTeX rendering for options
  const memoizedOptions = useMemo(() => {
    return currentQuestion.options.map((opt, idx) => (
      <MathText key={`opt-text-${idx}`} text={opt} />
    ));
  }, [currentQuestion.id, currentQuestion.options]);

  // Memoize KaTeX rendering for explanation (if provided in question bank)
  const memoizedExplanation = useMemo(() => {
    if (!currentQuestion.explanation) return null;
    return <MathText text={currentQuestion.explanation} />;
  }, [currentQuestion.id, currentQuestion.explanation]);

  // Confirmation handler with adequate feedback duration (Phase 14 & 15)
  const handleConfirm = (overrideIdx?: number) => {
    if (submittedRef.current) return;
    const idxToSubmit = overrideIdx !== undefined ? overrideIdx : selectedOption;
    if (idxToSubmit === null) return;
    if (eliminatedOptions.includes(idxToSubmit)) return;

    submittedRef.current = true;
    const isCorrect = idxToSubmit === currentQuestion.ans;
    setSubmittedState({ answerIdx: idxToSubmit, isCorrect });

    if (isCorrect) {
      // 800ms feedback duration allows students to clearly register success
      setTimeout(() => {
        onAnswer(idxToSubmit);
      }, feedbackDuration);
    }
    // If incorrect: do not immediately force game over, allow reading the correct answer and explanation
  };

  // Keyboard navigation: A, B, C, D / 1, 2, 3, 4 to select; Enter to confirm
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If student answered wrong, pressing Enter or Space advances to next screen
      if (submittedState && !submittedState.isCorrect) {
        if (e.key === 'Enter' || e.code === 'Space') {
          e.preventDefault();
          onAnswer(submittedState.answerIdx);
        }
        return;
      }

      if (submittedRef.current) return;
      const key = e.key.toUpperCase();
      let pickedIdx = -1;

      if (key === 'A' || key === '1') pickedIdx = 0;
      else if (key === 'B' || key === '2') pickedIdx = 1;
      else if (key === 'C' || key === '3') pickedIdx = 2;
      else if (key === 'D' || key === '4') pickedIdx = 3;
      else if (key === 'ENTER' && selectedOption !== null) {
        e.preventDefault();
        handleConfirm(selectedOption);
        return;
      } else if ((key === 'P' || key === 'H') && cheats > 0) {
        e.preventDefault();
        onUseCheat();
        return;
      }

      if (pickedIdx >= 0 && pickedIdx < currentQuestion.options.length) {
        if (!eliminatedOptions.includes(pickedIdx)) {
          e.preventDefault();
          setSelectedOption(pickedIdx);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentQuestion.options.length, eliminatedOptions, cheats, selectedOption, submittedState, onUseCheat, onAnswer]);

  return (
    <div
      onPointerDown={(e) => e.stopPropagation()}
      className="absolute inset-0 bg-slate-950/94 backdrop-blur-md flex flex-col justify-center items-center p-3 sm:p-4 z-30 select-none animate-fadeIn"
    >
      <div
        className={`w-full max-w-[420px] max-h-[94%] overflow-y-auto rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col border ${
          isBossStage
            ? 'bg-gradient-to-b from-rose-950/95 to-slate-950/98 border-rose-500/50 shadow-rose-500/30'
            : 'bg-gradient-to-b from-slate-900/95 to-slate-950/98 border-white/15 shadow-black/60'
        }`}
      >
        {/* Boss HP Status Header */}
        {isBossStage && (
          <div className="flex flex-col items-center mb-3 bg-black/40 p-2.5 rounded-xl border border-rose-500/30">
            <div className="w-full flex justify-between items-center text-xs font-extrabold text-rose-300 mb-1.5 font-mono">
              <span className="flex items-center gap-1.5">
                <span>👾</span>
                <span>QUÁI THÚ CASIO FX-580</span>
              </span>
              <span>HP: {bossHP}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300 rounded-full"
                style={{ width: `${bossHP}%` }}
              />
            </div>
          </div>
        )}

        {/* Top bar: Question number, Timer & Phao */}
        <div className="flex justify-between items-center mb-2.5 gap-2">
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              isBossStage
                ? 'bg-rose-500/30 border border-rose-500 text-rose-200'
                : 'bg-indigo-500/25 border border-indigo-400/40 text-indigo-200'
            }`}
          >
            {isBossStage ? `🔥 ĐÒN ĐÁNH BOSS #${4 - bossHitsNeeded}` : `CÂU ${score + 1}/${maxScore}`}
          </div>

          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold font-mono border ${
              timeLeft <= 10
                ? 'bg-rose-500/25 border-rose-500/50 text-rose-300 animate-pulse'
                : 'bg-white/10 border-white/15 text-sky-300'
            }`}
          >
            <span>⏱</span>
            <span>{timeLeft}s</span>
          </div>

          {cheats > 0 && (
            <button
              type="button"
              onClick={onUseCheat}
              className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 cursor-pointer hover:from-amber-500 hover:to-amber-600 active:scale-95 transition-transform shadow-md"
            >
              <span>🛟 Phao ({cheats})</span>
            </button>
          )}
        </div>

        {/* Timer Bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full mb-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 linear ${
              timeLeft <= 10
                ? 'bg-gradient-to-r from-rose-500 to-rose-400'
                : 'bg-gradient-to-r from-sky-400 to-indigo-500'
            }`}
            style={{ width: `${Math.max(0, Math.min(100, (timeLeft / 60) * 100))}%` }}
          />
        </div>

        {/* Question Prompt with MathText & Academic Font (Times New Roman, 18-20px mobile, 20-22px desktop) */}
        <div
          style={{ fontFamily: '"Times New Roman", Times, Georgia, serif' }}
          className={`text-base sm:text-lg leading-relaxed text-slate-100 mb-3 text-left bg-black/40 p-3.5 sm:p-4 rounded-2xl border-l-4 font-serif ${
            isBossStage ? 'border-rose-500' : 'border-sky-500'
          }`}
        >
          <div className="gl-question-text text-slate-100 font-serif leading-relaxed text-[17px] sm:text-[19px]">
            {memoizedPrompt}
          </div>
        </div>

        {/* Options List: min-height >= 52px, full card clickable, touch >= 44px */}
        <div className="flex flex-col gap-2">
          {currentQuestion.options.map((_, index) => {
            const isEliminated = eliminatedOptions.includes(index);
            const isSelected = selectedOption === index;
            const isSubmitted = submittedState !== null;
            const isUserPicked = isSubmitted && submittedState.answerIdx === index;
            const isCorrectOption = isSubmitted && currentQuestion.ans === index;

            let cardStyle = 'bg-white/5 border-white/15 text-slate-200 hover:bg-white/10 hover:border-white/25';
            let badgeStyle = 'bg-white/10 text-slate-300';
            let statusIcon: React.ReactNode = null;

            if (isEliminated) {
              cardStyle = 'opacity-20 pointer-events-none line-through bg-slate-900/40 border-white/5 text-slate-500 grayscale';
              badgeStyle = 'bg-white/5 text-slate-600';
            } else if (isSubmitted) {
              if (isCorrectOption) {
                cardStyle = 'bg-emerald-600/30 border-emerald-400 text-emerald-100 ring-2 ring-emerald-400/50 shadow-md';
                badgeStyle = 'bg-emerald-500 text-slate-950 font-black';
                statusIcon = <span className="text-emerald-400 font-extrabold text-sm ml-auto">✓ ĐÚNG</span>;
              } else if (isUserPicked && !submittedState.isCorrect) {
                cardStyle = 'bg-rose-600/30 border-rose-500 text-rose-100 ring-2 ring-rose-500/50 shadow-md';
                badgeStyle = 'bg-rose-500 text-white font-black';
                statusIcon = <span className="text-rose-400 font-extrabold text-sm ml-auto">✗ SAI</span>;
              } else {
                cardStyle = 'bg-white/5 border-white/10 text-slate-400 opacity-50';
                badgeStyle = 'bg-white/5 text-slate-500';
              }
            } else if (isSelected) {
              cardStyle = 'bg-sky-600/25 border-sky-400 text-white ring-2 ring-sky-400/40 shadow-lg shadow-sky-500/20';
              badgeStyle = 'bg-sky-500 text-slate-950 font-black';
            }

            return (
              <button
                key={index}
                type="button"
                disabled={isEliminated || isSubmitted}
                onClick={() => setSelectedOption(index)}
                style={{ fontFamily: '"Times New Roman", Times, Georgia, serif' }}
                className={`w-full min-h-[52px] sm:min-h-[56px] p-3 rounded-2xl text-sm sm:text-base font-medium text-left flex items-center gap-3 border transition-all cursor-pointer select-none leading-snug ${cardStyle}`}
              >
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${badgeStyle}`}>
                  {isSubmitted && isCorrectOption ? '✓' : isSubmitted && isUserPicked && !submittedState.isCorrect ? '✗' : optionLabels[index]}
                </span>
                <span className="flex-1 font-serif text-slate-100 gl-option-text text-[15px] sm:text-[17px]">
                  {memoizedOptions[index]}
                </span>
                {statusIcon}
              </button>
            );
          })}
        </div>

        {/* Feedback & Explanation Box when student answers incorrectly (Phases 14 & 15) */}
        {submittedState && !submittedState.isCorrect && (
          <div className="mt-3 p-3.5 rounded-2xl bg-slate-900/95 border border-rose-500/40 text-left animate-fadeIn shadow-xl">
            <div className="flex items-center gap-1.5 font-bold text-rose-300 text-xs sm:text-sm mb-1.5">
              <span className="text-base">✗</span>
              <span>Chưa chính xác! Phương án đúng là ({optionLabels[currentQuestion.ans]}).</span>
            </div>

            {memoizedExplanation && (
              <div className="mt-2 p-2.5 bg-black/50 rounded-xl border-l-2 border-amber-400 text-amber-100 font-serif leading-relaxed text-xs sm:text-sm">
                <span className="font-sans font-bold text-amber-300 block mb-1 text-[11px]">💡 Lời giải tham khảo:</span>
                {memoizedExplanation}
              </div>
            )}

            <button
              type="button"
              onClick={() => onAnswer(submittedState.answerIdx)}
              className="w-full min-h-[48px] mt-3 py-2.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-gradient-to-r from-rose-600 via-amber-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span>TIẾP TỤC (XEM KẾT QUẢ VÁN ĐẤU)</span>
              <span>➔</span>
            </button>
          </div>
        )}

        {/* Prominent Confirm Button when pending or correct */}
        {(!submittedState || submittedState.isCorrect) && (
          <button
            type="button"
            disabled={selectedOption === null || submittedState !== null}
            onClick={() => handleConfirm()}
            className={`w-full min-h-[48px] mt-3 py-2.5 sm:py-3 px-4 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg select-none ${
              selectedOption !== null && submittedState === null
                ? 'bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white shadow-sky-500/25 active:scale-[0.98]'
                : submittedState?.isCorrect
                ? 'bg-emerald-600 text-white shadow-emerald-500/30'
                : 'bg-white/10 text-slate-400 border border-white/10 cursor-not-allowed opacity-60'
            }`}
          >
            <span>
              {submittedState?.isCorrect
                ? '✓ CHÍNH XÁC! (+10 COINS) ĐANG CHUYỂN TIẾP...'
                : selectedOption !== null
                ? `XÁC NHẬN PHƯƠNG ÁN (${optionLabels[selectedOption]})`
                : 'CHỌN MỘT ĐÁP ÁN ĐỂ TIẾP TỤC'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

