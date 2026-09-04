/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - UNSUPPORTED QUESTION TYPE RENDERER
 * Enforces NO SILENT FALLBACK.
 * In DEV/Teacher mode: Displays UNSUPPORTED_QUESTION_TYPE + NEEDS_REVIEW diagnostic.
 * In Student/Production mode: Displays "Câu hỏi này đang được giáo viên cập nhật."
 */

import React from 'react';
import { AlertTriangle, Wrench, ShieldAlert } from 'lucide-react';

export interface UnsupportedQuestionRendererProps {
  questionId: string;
  rawType?: string;
  isDevMode?: boolean;
}

export const UnsupportedQuestionRenderer: React.FC<UnsupportedQuestionRendererProps> = ({
  questionId,
  rawType = 'UNKNOWN',
  isDevMode = process.env.NODE_ENV !== 'production' || true
}) => {
  return (
    <div id={`unsupported-type-${questionId}`} className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 space-y-3 animate-fadeIn">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-amber-200/80 text-amber-800 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block">
            Hệ Thống Kiểm Soát Giao Diện (UI Contract)
          </span>
          <h4 className="text-xs font-bold text-amber-950">
            {isDevMode ? 'UNSUPPORTED_QUESTION_TYPE' : 'Câu hỏi đang cập nhật'}
          </h4>
        </div>
      </div>

      {isDevMode ? (
        <div className="space-y-2 text-xs bg-white/80 p-3 rounded-xl border border-amber-200/80 font-mono">
          <div className="flex justify-between">
            <span>Mã câu hỏi:</span>
            <strong className="text-slate-900">{questionId}</strong>
          </div>
          <div className="flex justify-between">
            <span>Dạng bài gốc (rawType):</span>
            <strong className="text-rose-600">{String(rawType)}</strong>
          </div>
          <div className="flex justify-between">
            <span>Trạng thái đánh giá:</span>
            <strong className="text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">NEEDS_REVIEW</strong>
          </div>
          <p className="text-[11px] text-amber-800 font-sans mt-1">
            * Không fallback âm thầm sang text input. Đang chờ chuyển đổi cấu trúc sang MCQ / TRUE_FALSE / SHORT_ANSWER.
          </p>
        </div>
      ) : (
        <p className="text-xs text-amber-800 bg-white/60 p-3 rounded-xl border border-amber-200">
          Câu hỏi này đang được giáo viên cập nhật. Bạn sẽ được cộng điểm tự động cho câu hỏi này.
        </p>
      )}
    </div>
  );
};
