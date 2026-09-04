/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - EXAM HISTORY MODAL
 * Enforces Sections 47, 48.
 */

import React from 'react';
import { Button } from '../common/Button';
import { History, Award, CheckCircle2, Clock, Calendar, X, Play, AlertCircle } from 'lucide-react';
import { ExamGradingResult } from '../../services/examEngine';

export interface ExamHistoryModalProps {
  isOpen: boolean;
  history: ExamGradingResult[];
  onClose: () => void;
  onRetake: () => void;
}

export const ExamHistoryModal: React.FC<ExamHistoryModalProps> = ({
  isOpen,
  history,
  onClose,
  onRetake
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 shadow-neo-lg space-y-4 max-h-[85vh] overflow-y-auto border-3 border-black">
        <div className="flex items-center justify-between border-b-2 border-black pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded bg-[#FF6B00] text-white border-2 border-black flex items-center justify-center font-black">
              <History className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-gray-700 block">
                Hồ Sơ Đánh Giá Năng Lực
              </span>
              <h3 className="text-base font-black text-black">
                Lịch Sử Ôn Thi Vào 10 ({history.length} Lần Thi)
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-black hover:bg-black/10 rounded border border-black cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {history.length === 0 ? (
          <div className="p-8 text-center space-y-3 bg-[#FFF9E6] rounded border-2 border-black text-black text-xs">
            <AlertCircle className="w-8 h-8 mx-auto text-black" />
            <p className="font-black text-black text-sm">Em chưa có lịch sử thi thử nào.</p>
            <p className="font-semibold text-gray-800">Hãy bắt đầu bài thi đầu tiên để ghi nhận kết quả và kích hoạt chế độ học thích ứng!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((att, idx) => {
              const dateStr = new Date(att.submittedAt).toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              const minutesSpent = Math.floor(att.timeSpentSeconds / 60);
              const secondsSpent = att.timeSpentSeconds % 60;

              return (
                <div
                  key={att.attemptId || idx}
                  className="p-4 rounded bg-[#FFF9E6] border-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-neo-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#FF6B00] text-white font-black text-[10px] border border-black">
                        Lần {history.length - idx}
                      </span>
                      <span className="text-gray-700 flex items-center gap-1 font-bold text-[11px]">
                        <Calendar className="w-3 h-3 text-black" />
                        {dateStr}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 font-bold text-black">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                        Đúng {att.correctCount}/10 câu
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-black" />
                        {String(minutesSpent).padStart(2, '0')}:{String(secondsSpent).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <div className="text-right">
                      <span className="text-[10px] text-gray-700 font-black uppercase block">
                        Điểm Số
                      </span>
                      <span className="text-lg font-black text-[#FF6B00]">
                        {att.score} / 10.0
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t-2 border-black">
          <button
            type="button"
            onClick={onClose}
            className="neo-btn px-4 py-2 rounded bg-white text-black hover:bg-[#FFF9E6] text-xs font-black cursor-pointer"
          >
            Đóng
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onRetake();
            }}
            className="neo-btn px-4 py-2 rounded bg-[#FF6B00] text-white hover:bg-[#E55F00] text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-neo-sm"
          >
            <Play className="w-4 h-4 fill-current" />
            Bắt Đầu Đề Thi Mới
          </button>
        </div>
      </div>
    </div>
  );
};
