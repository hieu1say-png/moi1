/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - MULTI-PART / STRUCTURED QUESTION RENDERER
 * Strict UI Contract: Renders multi-step / multi-part subquestions with dedicated inputs for each part.
 */

import React from 'react';
import { MathText } from '../common/MathFormula';

export interface MultiPartItem {
  id: string;
  label?: string;
  prompt: string;
  unit?: string;
  expectedAnswer?: string | number;
}

export interface MultiPartRendererProps {
  questionId: string;
  parts: Array<string | MultiPartItem>;
  answers: Record<string, string | number>;
  onAnswerChange: (partId: string, value: string) => void;
  disabled?: boolean;
  showFeedback?: boolean;
}

export const MultiPartRenderer: React.FC<MultiPartRendererProps> = ({
  questionId,
  parts,
  answers,
  onAnswerChange,
  disabled = false,
  showFeedback = false
}) => {
  const normalizedParts: MultiPartItem[] = parts.map((p, idx) => {
    if (typeof p === 'object' && p !== null) {
      return {
        id: p.id || `part-${idx}`,
        label: p.label || `Ý ${idx + 1}`,
        prompt: p.prompt || (p as any).question || '',
        unit: p.unit,
        expectedAnswer: p.expectedAnswer
      };
    }
    return {
      id: `part-${idx}`,
      label: `Ý ${idx + 1}`,
      prompt: String(p)
    };
  });

  return (
    <div id={`multi-part-renderer-${questionId}`} className="space-y-3 pt-1">
      {normalizedParts.map((part, idx) => {
        const val = answers[part.id] !== undefined ? String(answers[part.id]) : '';

        return (
          <div
            key={part.id}
            className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3"
          >
            <div className="flex items-start gap-2.5">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800 text-xs font-bold shrink-0 mt-0.5">
                {part.label || `Câu ${String.fromCharCode(97 + idx)}`}
              </span>
              <div className="flex-1 gl-option-text">
                <MathText text={part.prompt} />
              </div>
            </div>

            <div className="relative flex items-center pt-1">
              <input
                type="text"
                disabled={disabled}
                value={val}
                onChange={(e) => onAnswerChange(part.id, e.target.value)}
                placeholder="Nhập câu trả lời..."
                className={`w-full px-4 py-2.5 rounded-xl border text-sm sm:text-base focus:outline-none transition-all ${
                  disabled ? 'bg-slate-100 cursor-default' : 'bg-white'
                } border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
              {part.unit && (
                <div className="absolute right-3.5 text-xs font-bold text-slate-500">
                  {part.unit}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
