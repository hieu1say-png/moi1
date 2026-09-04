/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - DATA ERROR QUESTION RENDERER
 * Displays explicit DATA_ERROR notice when questionText is empty or essential schema fields are missing.
 */

import React from 'react';
import { XCircle, FileWarning } from 'lucide-react';

export interface DataErrorQuestionRendererProps {
  questionId: string;
  errors: string[];
  isDevMode?: boolean;
}

export const DataErrorQuestionRenderer: React.FC<DataErrorQuestionRendererProps> = ({
  questionId,
  errors,
  isDevMode = true
}) => {
  return (
    <div id={`data-error-${questionId}`} className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 space-y-2.5 animate-fadeIn">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-rose-200 text-rose-800 flex items-center justify-center shrink-0">
          <XCircle className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 block">
            Lỗi Dữ Liệu Câu Hỏi
          </span>
          <h4 className="text-xs font-bold text-rose-950">DATA_ERROR (Không hiển thị ô trống)</h4>
        </div>
      </div>

      <div className="bg-white/80 p-3 rounded-xl border border-rose-200 text-xs space-y-1 font-mono">
        <div className="font-bold text-slate-800">ID: {questionId}</div>
        {errors.map((err, i) => (
          <div key={i} className="text-rose-700 text-[11px]">
            &bull; {err}
          </div>
        ))}
      </div>
    </div>
  );
};
