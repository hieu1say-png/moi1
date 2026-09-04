/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - EXAM HEADER & TIMER COMPONENT
 * Enforces Sections 16, 17, 20, 21.
 * - Single source of truth for timer: derived from endAt.
 * - Color codes: >10m (orange/neutral), <=10m (warning), <=5m (amber), <=1m (red).
 * - Text support: "Còn MM phút SS giây".
 * - Question Navigator with CURRENT, ANSWERED, UNANSWERED, FLAGGED states.
 */

import React, { useMemo } from 'react';
import { Button } from '../common/Button';
import { Timer, Bookmark, Send, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { ExamQuestionItem, StudentQuestionAnswer } from '../../services/examEngine';

export interface ExamHeaderTimerProps {
  remainingSeconds: number;
  totalQuestions: number;
  currentIndex: number;
  questions: ExamQuestionItem[];
  studentAnswers: Record<string, StudentQuestionAnswer>;
  flaggedQuestionIds: string[];
  isFlagged: boolean;
  onSelectIndex: (index: number) => void;
  onToggleFlag: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onRequestSubmit: () => void;
}

export const ExamHeaderTimer: React.FC<ExamHeaderTimerProps> = ({
  remainingSeconds,
  totalQuestions,
  currentIndex,
  questions,
  studentAnswers,
  flaggedQuestionIds,
  isFlagged,
  onSelectIndex,
  onToggleFlag,
  onPrevious,
  onNext,
  onRequestSubmit
}) => {
  // Timer formatting
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Time Text Description
  const timeTextDescription = `Còn ${String(minutes).padStart(2, '0')} phút ${String(seconds).padStart(2, '0')} giây`;

  // Color coding
  let timerBadgeColor = 'bg-[#FFF9E6] text-black border-2 border-black';
  let timerIconColor = 'text-[#FF6B00]';

  if (remainingSeconds <= 60) {
    timerBadgeColor = 'bg-[#FF4F81] text-white border-2 border-black animate-pulse';
    timerIconColor = 'text-white';
  } else if (remainingSeconds <= 300) {
    timerBadgeColor = 'bg-[#FFD23F] text-black border-2 border-black';
    timerIconColor = 'text-black';
  } else if (remainingSeconds <= 600) {
    timerBadgeColor = 'bg-[#FFF9E6] text-black border-2 border-black';
    timerIconColor = 'text-[#FF6B00]';
  }

  // Answered count calculation
  const answeredCount = useMemo(() => {
    return questions.filter((q) => {
      const ans = studentAnswers[q.id];
      if (!ans || ans.value === undefined || ans.value === null) return false;
      if (typeof ans.value === 'string') return ans.value.trim() !== '';
      if (typeof ans.value === 'object') return Object.keys(ans.value).length > 0;
      return true;
    }).length;
  }, [questions, studentAnswers]);

  return (
    <div className="sticky top-0 z-30 bg-white rounded-lg border-3 border-black p-3 sm:p-4 shadow-neo space-y-3">
      {/* Top Row: Timer, Question Counter, Actions */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-3">
          {/* Real-time Timer Badge */}
          <div
            id="exam-countdown-badge"
            className={`px-3 py-1.5 rounded border-2 border-black flex items-center gap-2 shadow-neo-sm font-mono transition-colors ${timerBadgeColor}`}
            aria-live="polite"
          >
            <Timer className={`w-4 h-4 ${timerIconColor} ${remainingSeconds <= 60 ? 'animate-spin' : ''}`} />
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-black tracking-wider leading-none">
                {formattedTime}
              </span>
              <span className="text-[10px] font-sans font-black opacity-90 hidden sm:inline">
                {timeTextDescription}
              </span>
            </div>
          </div>

          {/* Answered Progress */}
          <div className="text-xs font-black text-black">
            Đã làm: <strong className="text-[#FF6B00]">{answeredCount}/{totalQuestions}</strong> câu
          </div>
        </div>

        {/* Action Controls: Flag & Submit */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleFlag}
            className={`neo-btn px-3 py-1.5 rounded text-xs font-black flex items-center gap-1.5 cursor-pointer ${
              isFlagged ? 'bg-[#FFD23F] text-black shadow-neo-sm' : 'bg-white text-black hover:bg-[#FFF9E6]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFlagged ? 'fill-black text-black' : ''}`} />
            {isFlagged ? 'Đã Đánh Dấu' : 'Đánh Dấu'}
          </button>

          <button
            type="button"
            onClick={onRequestSubmit}
            className="neo-btn px-4 py-1.5 rounded text-xs font-black bg-[#FF6B00] text-white hover:bg-[#E55F00] flex items-center gap-1.5 cursor-pointer shadow-neo-sm"
          >
            <Send className="w-3.5 h-3.5" />
            NỘP BÀI
          </button>
        </div>
      </div>

      {/* Bottom Row: 10-Question Navigator */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t-2 border-black flex-wrap">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
          {questions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const isFlag = flaggedQuestionIds.includes(q.id);
            const ans = studentAnswers[q.id];
            const isAnswered =
              ans &&
              ans.value !== undefined &&
              ans.value !== null &&
              (typeof ans.value === 'string' ? ans.value.trim() !== '' : Object.keys(ans.value).length > 0);

            let btnClass = 'bg-white text-black hover:bg-[#FFF9E6] border-2 border-black shadow-neo-sm';

            if (isCurrent) {
              btnClass = 'bg-[#FF6B00] text-white shadow-neo border-2 border-black font-black';
            } else if (isAnswered) {
              btnClass = 'bg-[#B7F000] text-black border-2 border-black font-black shadow-neo-sm';
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onSelectIndex(idx)}
                className={`relative w-8 h-8 rounded text-xs font-black flex items-center justify-center transition-all cursor-pointer ${btnClass}`}
                aria-label={`Chuyển đến câu ${idx + 1}`}
              >
                <span>{idx + 1}</span>
                {isFlag && (
                  <span className="absolute -top-1.5 -right-1.5 text-[10px]" title="Đã đánh dấu">
                    🔖
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Previous / Next buttons */}
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={onPrevious}
            className="neo-btn p-1.5 rounded bg-white text-black border-2 border-black disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-black text-black px-1 font-mono">
            {currentIndex + 1} / {totalQuestions}
          </span>
          <button
            type="button"
            disabled={currentIndex === totalQuestions - 1}
            onClick={onNext}
            className="neo-btn p-1.5 rounded bg-white text-black border-2 border-black disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
