/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ERROR NOTEBOOK MODAL (SỔ TAY LỖ HỔNG KIẾN THỨC & LẶP LẠI NGẮT QUÃNG)
 * Displays student's saved error questions, spaced repetition timeline (1-3-7 days),
 * and provides interactive in-place question retry to resolve errors.
 */

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  X,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Calendar,
  Clock,
  Filter,
  Check,
  Award,
  ChevronRight,
  ShieldCheck,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { useErrorMemoryStore, FailedQuestionItem } from '../../stores/useErrorMemoryStore';
import { MathFormula, MathText } from '../common/MathFormula';
import { ShapeType } from '../../types';
import { ExamTrapRadarBadge } from './ExamTrapRadarBadge';

export interface ErrorNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetryQuestionExternal?: (question: FailedQuestionItem) => void;
}

export const ErrorNotebookModal: React.FC<ErrorNotebookModalProps> = ({
  isOpen,
  onClose,
  onRetryQuestionExternal
}) => {
  const { failedQuestions, resolveFailedQuestion, recordFailedQuestionAttempt } = useErrorMemoryStore();

  // Filters
  const [shapeFilter, setShapeFilter] = useState<ShapeType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unresolved' | 'resolved'>('all');

  // Active question being retried in modal
  const [activeRetryQuestionId, setActiveRetryQuestionId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmittedRetry, setHasSubmittedRetry] = useState<boolean>(false);
  const [isRetryCorrect, setIsRetryCorrect] = useState<boolean>(false);

  // Filtered List
  const filteredList = useMemo(() => {
    return failedQuestions.filter((q) => {
      if (shapeFilter !== 'all' && q.shape !== shapeFilter) return false;
      if (statusFilter === 'unresolved' && q.resolved) return false;
      if (statusFilter === 'resolved' && !q.resolved) return false;
      return true;
    });
  }, [failedQuestions, shapeFilter, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = failedQuestions.length;
    const resolved = failedQuestions.filter((q) => q.resolved).length;
    const rate = total > 0 ? Math.round((resolved / total) * 100) : 100;
    return { total, resolved, pending: total - resolved, rate };
  }, [failedQuestions]);

  const activeQuestion = useMemo(() => {
    return failedQuestions.find((q) => q.id === activeRetryQuestionId || q.questionId === activeRetryQuestionId) || null;
  }, [failedQuestions, activeRetryQuestionId]);

  if (!isOpen) return null;

  const handleStartRetry = (item: FailedQuestionItem) => {
    setActiveRetryQuestionId(item.id);
    setSelectedOption(null);
    setHasSubmittedRetry(false);
    setIsRetryCorrect(false);
  };

  const handleOptionSelect = (index: number) => {
    if (hasSubmittedRetry) return;
    setSelectedOption(index);
  };

  const handleSubmitRetry = () => {
    if (!activeQuestion || selectedOption === null) return;

    const isCorrect = selectedOption === activeQuestion.correctOptionIndex;
    setHasSubmittedRetry(true);
    setIsRetryCorrect(isCorrect);

    recordFailedQuestionAttempt(activeQuestion.questionId, isCorrect, selectedOption);
    if (isCorrect) {
      resolveFailedQuestion(activeQuestion.questionId);
    }
  };

  const getSpacedBadge = (item: FailedQuestionItem) => {
    if (item.resolved) {
      return (
        <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-black border border-emerald-300 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Đã khắc phục (Ôn sau {item.reviewIntervalDays} ngày)
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded bg-red-100 text-red-800 text-xs font-black border border-red-300 flex items-center gap-1">
        <Clock className="w-3.5 h-3.5" />
        Cần ôn tập hôm nay
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FFFDF8] rounded-2xl border-3 border-black shadow-neo flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-white border-b-2 border-black flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FFF9E6] border-2 border-black shadow-neo-sm">
              <BookOpen className="w-6 h-6 text-[#FF6B00]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-black tracking-tight font-heading">
                Sổ Tay Lỗ Hổng Kiến Thức & Ôn Tập Ngắt Quãng
              </h2>
              <p className="text-xs text-gray-700 font-medium">
                Tự động lưu trữ các câu làm sai và nhắc lịch ôn tập (1 - 3 - 7 ngày) để không bao giờ mắc lại bẫy đề thi.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 border-2 border-black shadow-neo-sm transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Summary Stats & Filters */}
        <div className="p-4 bg-[#FFF9E6] border-b-2 border-black flex flex-wrap items-center justify-between gap-4 text-xs font-black">
          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-white border border-black shadow-neo-sm">
              Tổng số câu sai: <span className="text-[#FF6B00]">{stats.total}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-white border border-black shadow-neo-sm">
              Đã làm chủ: <span className="text-emerald-700">{stats.resolved}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-white border border-black shadow-neo-sm">
              Tỉ lệ khắc phục: <span className="text-blue-700">{stats.rate}%</span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            <select
              value={shapeFilter}
              onChange={(e) => setShapeFilter(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg bg-white border-2 border-black text-xs font-black shadow-neo-sm"
            >
              <option value="all">Mọi Hình Khối</option>
              <option value="cylinder">🔴 Hình Trụ</option>
              <option value="cone">🟠 Hình Nón</option>
              <option value="sphere">🟢 Hình Cầu</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg bg-white border-2 border-black text-xs font-black shadow-neo-sm"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="unresolved">⚠️ Cần ôn lại</option>
              <option value="resolved">✅ Đã làm chủ</option>
            </select>
          </div>
        </div>

        {/* Modal Body: Two-Column or Active Retry Mode */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {activeQuestion ? (
            /* ACTIVE RETRY QUESTION SCREEN */
            <div className="bg-white p-6 rounded-xl border-2 border-black shadow-neo space-y-5">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#FF6B00] text-white text-xs font-black border border-black">
                    LÀM LẠI CÂU SAI
                  </span>
                  <span className="text-xs font-bold text-gray-700">
                    Mã câu: {activeQuestion.questionId}
                  </span>
                </div>
                <button
                  onClick={() => setActiveRetryQuestionId(null)}
                  className="text-xs font-black text-gray-600 hover:text-black underline"
                >
                  ← Quay lại danh sách sổ tay
                </button>
              </div>

              {/* Question Text */}
              <div className="text-base font-bold text-black leading-relaxed">
                <MathText text={activeQuestion.questionText} />
              </div>

              {/* Exam Trap Radar Badge */}
              <ExamTrapRadarBadge
                questionText={activeQuestion.questionText}
                shape={activeQuestion.shape}
                errorType={activeQuestion.errorType}
              />

              {/* Options A, B, C, D */}
              <div className="grid grid-cols-1 gap-3">
                {activeQuestion.options.map((opt, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const isSelected = selectedOption === idx;
                  let optStyle = 'bg-[#FFFDF8] border-black hover:bg-amber-50';

                  if (hasSubmittedRetry) {
                    if (idx === activeQuestion.correctOptionIndex) {
                      optStyle = 'bg-emerald-100 border-emerald-600 text-emerald-950 font-black';
                    } else if (isSelected && !isRetryCorrect) {
                      optStyle = 'bg-red-100 border-red-600 text-red-950 font-black';
                    } else {
                      optStyle = 'bg-gray-100 border-gray-300 opacity-60';
                    }
                  } else if (isSelected) {
                    optStyle = 'bg-[#FF6B00] text-white border-black font-black shadow-neo-sm';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={hasSubmittedRetry}
                      className={`w-full p-3.5 rounded-xl border-2 text-left text-sm flex items-start gap-3 transition-all ${optStyle}`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shrink-0 border ${
                        isSelected && !hasSubmittedRetry ? 'bg-white text-black border-black' : 'bg-white text-black border-black'
                      }`}>
                        {letter}
                      </span>
                      <div className="flex-1 pt-0.5">
                        <MathText text={opt.text} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t">
                {!hasSubmittedRetry ? (
                  <button
                    onClick={handleSubmitRetry}
                    disabled={selectedOption === null}
                    className="px-6 py-2.5 rounded-xl bg-[#FF6B00] text-white font-black text-sm border-2 border-black shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] disabled:opacity-50"
                  >
                    Kiểm Tra Kết Quả
                  </button>
                ) : (
                  <div className="flex items-center gap-3 w-full justify-between">
                    <div className="flex items-center gap-2">
                      {isRetryCorrect ? (
                        <div className="flex items-center gap-1.5 text-emerald-800 font-black text-sm">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          🎉 Chính xác! Em đã làm chủ câu hỏi này và xóa bỏ lỗ hổng.
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-red-700 font-black text-sm">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          ⚠️ Vẫn chưa đúng. Hãy đọc kỹ lời giải 4 bước bên dưới nhé!
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setActiveRetryQuestionId(null)}
                      className="px-4 py-2 rounded-lg bg-black text-white font-black text-xs shadow-neo-sm"
                    >
                      Đóng câu này
                    </button>
                  </div>
                )}
              </div>

              {/* 4-Step Solution when submitted */}
              {hasSubmittedRetry && (
                <div className="p-4 bg-[#FFF9E6] rounded-xl border-2 border-black space-y-3">
                  <div className="flex items-center gap-2 font-black text-xs uppercase text-amber-900">
                    <Lightbulb className="w-4 h-4 text-[#FF6B00]" />
                    Lời Giải 4 Bước Sư Phạm & Hóa Giải Bẫy Đề
                  </div>
                  <div className="text-xs text-gray-800 space-y-2">
                    {activeQuestion.fourStepSolution ? (
                      <>
                        <div><strong>Bước 1 (Tóm tắt):</strong> {activeQuestion.fourStepSolution.step1Summary}</div>
                        <div><strong>Bước 2 (Chiến lược):</strong> {activeQuestion.fourStepSolution.step2Strategy}</div>
                        <div className="bg-white p-2.5 rounded border border-black font-medium">
                          <strong>Bước 3 (Trình bày):</strong> <MathText text={activeQuestion.fourStepSolution.step3KaTeX} />
                        </div>
                        <div className="text-red-700 font-bold">
                          <strong>Bước 4 (Cảnh báo bẫy):</strong> {activeQuestion.fourStepSolution.step4TrapWarning}
                        </div>
                      </>
                    ) : (
                      <div className="bg-white p-2.5 rounded border border-black">
                        <MathText text={activeQuestion.explanation} />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : filteredList.length === 0 ? (
            /* EMPTY STATE */
            <div className="text-center py-12 space-y-3 bg-white rounded-xl border-2 border-dashed border-gray-300 p-8">
              <ShieldCheck className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-base font-black text-black">
                {failedQuestions.length === 0 ? 'Sổ tay trống! Em chưa có câu hỏi nào bị sai.' : 'Không có câu hỏi phù hợp bộ lọc.'}
              </h3>
              <p className="text-xs text-gray-600 max-w-md mx-auto">
                Khi luyện tập hoặc làm bài thi thử nếu chọn sai đáp án, hệ thống sẽ tự động lưu vào đây để em ôn tập lại theo chu kỳ 1 - 3 - 7 ngày.
              </p>
            </div>
          ) : (
            /* LIST OF FAILED QUESTIONS */
            <div className="grid grid-cols-1 gap-3">
              {filteredList.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="bg-white p-4 rounded-xl border-2 border-black shadow-neo-sm hover:border-[#FF6B00] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-black text-white text-[10px] font-black uppercase">
                        {item.shape === 'cylinder' ? 'Hình Trụ' : item.shape === 'cone' ? 'Hình Nón' : 'Hình Cầu'}
                      </span>
                      {getSpacedBadge(item)}
                      <span className="text-[11px] text-gray-500 font-bold">
                        Lần sai gần nhất: {new Date(item.lastAttemptAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>

                    <div className="text-sm font-black text-black line-clamp-2">
                      <MathText text={item.questionText} />
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartRetry(item)}
                    className="px-4 py-2.5 rounded-lg bg-[#FF6B00] text-white font-black text-xs border-2 border-black shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Làm Lại Câu Này
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
