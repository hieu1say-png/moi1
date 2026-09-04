/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - MULTIPLE CHOICE RENDERER (MCQ)
 * Strict UI Contract: Renders 4 (or N) distinct options with keyboard/touch selection.
 */

import React from 'react';
import { MathFormula, MathText } from '../common/MathFormula';

export interface MultipleChoiceRendererProps {
  questionId: string;
  options: Array<string | { id: string; text: string; originalIndex?: number }>;
  selectedOption: string | number | null;
  onSelectOption: (optionValue: string | number) => void;
  disabled?: boolean;
  showFeedback?: boolean;
  correctOptionValue?: string | number;
}

export const MultipleChoiceRenderer: React.FC<MultipleChoiceRendererProps> = ({
  questionId,
  options,
  selectedOption,
  onSelectOption,
  disabled = false,
  showFeedback = false,
  correctOptionValue
}) => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  const normalizedOptions = options.map((opt, idx) => {
    if (typeof opt === 'object' && opt !== null) {
      return {
        id: opt.id || letters[idx] || String(idx + 1),
        text: opt.text,
        value: opt.id || opt.text || idx
      };
    }
    return {
      id: letters[idx] || String(idx + 1),
      text: String(opt),
      value: letters[idx] || idx
    };
  });

  return (
    <div id={`mcq-renderer-${questionId}`} className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
      {normalizedOptions.map((opt, idx) => {
        const isSelected =
          selectedOption === opt.value ||
          selectedOption === opt.id ||
          selectedOption === opt.text ||
          selectedOption === idx;

        const isCorrect =
          showFeedback &&
          (correctOptionValue === opt.value ||
            correctOptionValue === opt.id ||
            correctOptionValue === opt.text ||
            correctOptionValue === idx);

        const isWrong = showFeedback && isSelected && !isCorrect;

        let containerClass =
          'bg-white border-3 border-black text-black hover:bg-[#FFF9E6] shadow-neo-sm';
        let badgeClass = 'bg-white text-black border-2 border-black';
        let indicator = null;

        if (isSelected && !showFeedback) {
          containerClass = 'bg-[#FFD23F] border-3 border-black text-black font-black shadow-neo';
          badgeClass = 'bg-black text-white border-2 border-black';
        } else if (isCorrect) {
          containerClass = 'bg-[#B7F000] border-3 border-black text-black font-black shadow-neo';
          badgeClass = 'bg-black text-white border-2 border-black';
          indicator = <span className="ml-auto text-xs font-black bg-black text-white px-2 py-0.5 rounded shrink-0">✓ ĐÚNG</span>;
        } else if (isWrong) {
          containerClass = 'bg-[#FF4F81] border-3 border-black text-white font-black shadow-neo';
          badgeClass = 'bg-black text-white border-2 border-black';
          indicator = <span className="ml-auto text-xs font-black bg-black text-white px-2 py-0.5 rounded shrink-0">✕ SAI</span>;
        }

        return (
          <button
            key={opt.id || idx}
            type="button"
            disabled={disabled}
            onClick={() => onSelectOption(opt.value)}
            className={`p-3.5 sm:p-4 rounded-md flex items-center gap-3.5 text-left transition-all ${
              disabled ? 'cursor-default opacity-85' : 'cursor-pointer hover:translate-x-0.5 active:translate-x-1'
            } ${containerClass}`}
          >
            <span
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-xs sm:text-sm font-black flex items-center justify-center shrink-0 transition-all ${badgeClass}`}
            >
              {opt.id}
            </span>
            <div className="flex-1 gl-option-text">
              <MathText text={opt.text} />
            </div>
            {indicator}
          </button>
        );
      })}
    </div>
  );
};
