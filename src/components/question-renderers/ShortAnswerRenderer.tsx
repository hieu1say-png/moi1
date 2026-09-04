/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - SHORT ANSWER RENDERER
 * Strict UI Contract: Renders exact numerical input with explicit unit tag, precision guidelines, and zero silent fallbacks.
 */

import React from 'react';
import { Hash } from 'lucide-react';

export interface ShortAnswerRendererProps {
  questionId: string;
  value: string;
  onChange: (val: string) => void;
  unit?: string;
  placeholder?: string;
  disabled?: boolean;
  showFeedback?: boolean;
  isCorrect?: boolean;
  expectedAnswer?: string | number;
}

export const ShortAnswerRenderer: React.FC<ShortAnswerRendererProps> = ({
  questionId,
  value,
  onChange,
  unit,
  placeholder = 'Nhập kết quả số (ví dụ: 12.5 hoặc 100)...',
  disabled = false,
  showFeedback = false,
  isCorrect,
  expectedAnswer
}) => {
  return (
    <div id={`short-answer-renderer-${questionId}`} className="space-y-3 pt-1">
      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-black">
          <Hash className="w-5 h-5" />
        </div>
        <input
          type="text"
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`neo-input pl-11 pr-20 py-3 text-sm sm:text-base font-bold tracking-wide ${
            disabled ? 'bg-neutral-100 cursor-default opacity-80' : 'bg-white'
          } ${
            showFeedback
              ? isCorrect
                ? 'border-black bg-[#B7F000] text-black font-black'
                : 'border-black bg-[#FF4F81] text-white font-black'
              : 'border-black text-black'
          }`}
        />
        {unit && (
          <div className="absolute right-3 px-2.5 py-1 rounded bg-[#FFD23F] border-2 border-black text-xs font-black text-black shadow-neo-sm">
            {unit}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-800 font-semibold px-1">
        <span>* Dùng dấu chấm (.) cho số thập phân (ví dụ: 3.14).</span>
        {showFeedback && expectedAnswer !== undefined && !isCorrect && (
          <span className="text-black bg-[#FF4F81] px-2 py-0.5 rounded font-black text-xs sm:text-sm text-white">
            Đáp án đúng: {String(expectedAnswer)} {unit || ''}
          </span>
        )}
      </div>
    </div>
  );
};
