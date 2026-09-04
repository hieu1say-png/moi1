/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - EXAM SUBMIT CONFIRMATION MODAL
 * Enforces Section 19: Manual Submit Modal.
 */

import React from 'react';
import { Button } from '../common/Button';
import { AlertTriangle, CheckCircle2, HelpCircle, X } from 'lucide-react';

export interface ExamSubmitConfirmModalProps {
  isOpen: boolean;
  unansweredCount: number;
  totalQuestions: number;
  onClose: () => void;
  onConfirmSubmit: () => void;
}

export const ExamSubmitConfirmModal: React.FC<ExamSubmitConfirmModalProps> = ({
  isOpen,
  unansweredCount,
  totalQuestions,
  onClose,
  onConfirmSubmit
}) => {
  if (!isOpen) return null;

  const answeredCount = totalQuestions - unansweredCount;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-neo-lg space-y-5 border-3 border-black">
        <div className="flex items-center justify-between border-b-2 border-black pb-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded border-2 border-black flex items-center justify-center font-black ${
              unansweredCount > 0 ? 'bg-[#FFD23F] text-black' : 'bg-[#B7F000] text-black'
            }`}>
              {unansweredCount > 0 ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-700 block">
                Xác Nhận Nộp Bài
              </span>
              <h3 className="text-base font-black text-black">
                {unansweredCount > 0 ? 'Còn Câu Chưa Trả Lời' : 'Sẵn Sàng Nộp Bài'}
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

        <div className="space-y-3 text-xs">
          {unansweredCount > 0 ? (
            <div className="p-4 rounded bg-[#FFF9E6] border-2 border-black text-black space-y-2 shadow-neo-sm">
              <p className="font-black leading-relaxed text-sm">
                Em còn <span className="text-[#FF4F81] font-black">{unansweredCount}</span> câu chưa trả lời.
              </p>
              <p className="text-gray-800 font-semibold">
                Đã hoàn thành: <strong>{answeredCount}/{totalQuestions} câu</strong>.
                Các câu chưa làm sẽ không được tính điểm. Em có chắc chắn muốn nộp bài ngay bây giờ?
              </p>
            </div>
          ) : (
            <div className="p-4 rounded bg-[#FFF9E6] border-2 border-black text-black space-y-1 shadow-neo-sm">
              <p className="font-black leading-relaxed text-sm">
                Em đã hoàn thành đủ <span className="text-[#FF6B00] font-black">10/10</span> câu hỏi!
              </p>
              <p className="text-gray-800 font-semibold">
                Hệ thống sẽ tiến hành chấm điểm tự động và hiển thị lời giải chi tiết 4 bước ngay lập tức.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t-2 border-black">
          <button
            type="button"
            onClick={onClose}
            className="neo-btn px-4 py-2 rounded bg-white text-black hover:bg-[#FFF9E6] font-black text-xs cursor-pointer"
          >
            Tiếp Tục Làm Bài
          </button>

          <button
            type="button"
            onClick={onConfirmSubmit}
            className="neo-btn px-4 py-2 rounded bg-[#FF6B00] text-white hover:bg-[#E55F00] font-black text-xs cursor-pointer shadow-neo-sm"
          >
            Xác Nhận Nộp Bài
          </button>
        </div>
      </div>
    </div>
  );
};
