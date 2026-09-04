/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * STANDARDIZED QUESTION / CHALLENGE CARD COMPONENT
 * Implements the Light Theme + Orange Accent Design System:
 * - Background: #FFFFFF
 * - Text: #1F2937 (Text Primary)
 * - Accent: #F97316 (Primary Accent / Orange)
 * - Border: #E5E7EB with rounded-2xl
 * - Mathematical Formulas: rendered on warm ivory (#FFFDF8 / #FFFBF5) background with crisp dark text
 */

import React, { ReactNode } from 'react';
import { Sparkles, Trophy, Lightbulb, HelpCircle, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { MathFormula, MathText } from './MathFormula';

export interface QuestionCardProps {
  id?: string;
  badge?: string;
  badgeVariant?: 'orange' | 'blue' | 'emerald' | 'amber';
  title?: string;
  subtitle?: string;
  points?: number | string;
  question?: string;
  formula?: string;
  headerRight?: ReactNode;
  children?: ReactNode;
  hint?: string;
  hintFormula?: string;
  isHintOpen?: boolean;
  onToggleHint?: () => void;
  solution?: string;
  solutionFormula?: string;
  isSolutionOpen?: boolean;
  onToggleSolution?: () => void;
  status?: 'default' | 'correct' | 'incorrect';
  feedbackText?: string;
  className?: string;
  isChallenge?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  id,
  badge,
  badgeVariant = 'orange',
  title,
  subtitle,
  points,
  question,
  formula,
  headerRight,
  children,
  hint,
  hintFormula,
  isHintOpen,
  onToggleHint,
  solution,
  solutionFormula,
  isSolutionOpen,
  onToggleSolution,
  status = 'default',
  feedbackText,
  className = '',
  isChallenge = false
}) => {
  const getBadgeClass = () => {
    switch (badgeVariant) {
      case 'blue':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'emerald':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'amber':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'orange':
      default:
        return 'bg-orange-50 text-orange-700 border-orange-200';
    }
  };

  return (
    <div
      id={id}
      className={`bg-white rounded-2xl sm:rounded-3xl border ${
        isChallenge ? 'border-orange-300 ring-1 ring-orange-100' : 'border-slate-200'
      } p-5 sm:p-6 shadow-sm space-y-4 text-slate-800 transition-all ${className}`}
    >
      {/* Header */}
      {(badge || title || points || headerRight) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            {badge && (
              <span
                className={`text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1 uppercase tracking-wider ${getBadgeClass()}`}
              >
                {isChallenge && <Trophy className="w-3 h-3 text-orange-500" />}
                {badge}
              </span>
            )}
            {title && (
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {title}
              </h3>
            )}
            {subtitle && (
              <span className="text-xs sm:text-sm text-slate-500 font-medium">
                {subtitle}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {points && (
              <span className="text-xs sm:text-sm font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-200 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                +{points} XP
              </span>
            )}
            {headerRight}
          </div>
        </div>
      )}

      {/* Question Text */}
      {question && (
        <div className="gl-question-text">
          <MathText text={question} />
        </div>
      )}

      {/* Primary LaTeX Formula Display Box */}
      {formula && (
        <div className="gl-formula-box font-mono text-sm sm:text-base">
          <MathFormula formula={formula} displayMode={true} />
        </div>
      )}

      {/* Question Interactive Body / Inputs / Options */}
      {children && <div className="space-y-3">{children}</div>}

      {/* Status Feedback (Correct / Incorrect) */}
      {status === 'correct' && (
        <div className="p-3.5 sm:p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex items-start gap-2.5 text-sm sm:text-base text-emerald-900 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-emerald-800">Chính xác xuất sắc! </span>
            {feedbackText || 'Em đã trả lời đúng câu hỏi này.'}
          </div>
        </div>
      )}

      {status === 'incorrect' && (
        <div className="p-3.5 sm:p-4 bg-rose-50 border border-rose-300 rounded-xl flex items-start gap-2.5 text-sm sm:text-base text-rose-900 animate-fadeIn">
          <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-rose-800">Chưa chính xác. </span>
            {feedbackText || 'Hãy kiểm tra lại công thức và các phép tính.'}
          </div>
        </div>
      )}

      {/* Hint Accordion */}
      {hint && (
        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onToggleHint}
            className="text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>{isHintOpen ? 'Ẩn gợi ý giải' : 'Gợi ý giải bài'}</span>
            {isHintOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isHintOpen && (
            <div className="mt-2.5 p-3.5 sm:p-4 rounded-xl bg-orange-50/70 border border-orange-200 text-sm sm:text-base text-orange-950 space-y-2.5 animate-fadeIn">
              <div className="font-normal leading-relaxed">
                <MathText text={hint} />
              </div>
              {hintFormula && (
                <div className="p-2.5 bg-white rounded-lg border border-orange-200 text-center font-mono text-sm sm:text-base">
                  <MathFormula formula={hintFormula} displayMode={true} />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Detailed Solution Accordion */}
      {solution && (
        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onToggleSolution}
            className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-blue-500" />
            <span>{isSolutionOpen ? 'Ẩn lời giải chi tiết' : 'Xem lời giải chi tiết'}</span>
            {isSolutionOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isSolutionOpen && (
            <div className="mt-2.5 p-4 rounded-xl bg-[#FFFDF8] border border-[#F3E8D7] gl-solution-text space-y-3 animate-fadeIn">
              <div className="font-normal leading-relaxed">
                <MathText text={solution} />
              </div>
              {solutionFormula && (
                <div className="p-3 bg-white rounded-lg border border-[#F3E8D7] text-center font-mono text-sm sm:text-base">
                  <MathFormula formula={solutionFormula} displayMode={true} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
