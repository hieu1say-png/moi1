/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - TRUE/FALSE RENDERER
 * Strict UI Contract: Renders boolean/statement evaluation rows with explicit True/False selections.
 */

import React from 'react';
import { MathText } from '../common/MathFormula';
import { CheckCircle2, XCircle } from 'lucide-react';

export interface TrueFalseItem {
  id: string;
  statement: string;
  correctVerdict?: boolean;
}

export interface TrueFalseRendererProps {
  questionId: string;
  statements: Array<string | TrueFalseItem>;
  answers: Record<string, boolean | null>;
  onAnswerChange: (statementId: string, verdict: boolean) => void;
  disabled?: boolean;
  showFeedback?: boolean;
}

export const TrueFalseRenderer: React.FC<TrueFalseRendererProps> = ({
  questionId,
  statements,
  answers,
  onAnswerChange,
  disabled = false,
  showFeedback = false
}) => {
  const normalizedItems: TrueFalseItem[] = statements.map((st, idx) => {
    if (typeof st === 'object' && st !== null) {
      return {
        id: st.id || `st-${idx}`,
        statement: st.statement,
        correctVerdict: st.correctVerdict
      };
    }
    return {
      id: `st-${idx}`,
      statement: String(st)
    };
  });

  return (
    <div id={`true-false-renderer-${questionId}`} className="space-y-3 pt-1">
      {normalizedItems.map((item, idx) => {
        const currentVerdict = answers[item.id];
        const isTrueSelected = currentVerdict === true;
        const isFalseSelected = currentVerdict === false;

        return (
          <div
            key={item.id}
            className="p-3.5 sm:p-4 rounded-md bg-white border-3 border-black shadow-neo-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3.5"
          >
            <div className="flex items-start gap-3 flex-1">
              <span className="w-6 h-6 rounded bg-[#FFD23F] text-black text-xs font-black border border-black flex items-center justify-center shrink-0 mt-0.5">
                {String.fromCharCode(97 + idx)}
              </span>
              <div className="flex-1 gl-option-text">
                <MathText text={item.statement} />
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
              <button
                type="button"
                disabled={disabled}
                onClick={() => onAnswerChange(item.id, true)}
                className={`neo-btn px-4 py-2 rounded text-xs sm:text-sm font-black flex items-center gap-1.5 cursor-pointer ${
                  disabled ? 'cursor-default opacity-85' : 'cursor-pointer'
                } ${
                  isTrueSelected
                    ? 'bg-[#B7F000] text-black shadow-neo-sm'
                    : 'bg-white text-black hover:bg-[#FFF9E6]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-black" />
                Đúng
              </button>

              <button
                type="button"
                disabled={disabled}
                onClick={() => onAnswerChange(item.id, false)}
                className={`neo-btn px-4 py-2 rounded text-xs sm:text-sm font-black flex items-center gap-1.5 cursor-pointer ${
                  disabled ? 'cursor-default opacity-85' : 'cursor-pointer'
                } ${
                  isFalseSelected
                    ? 'bg-[#FF4F81] text-white shadow-neo-sm'
                    : 'bg-white text-black hover:bg-[#FFF9E6]'
                }`}
              >
                <XCircle className="w-4 h-4 text-black" />
                Sai
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
