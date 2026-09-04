/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - EXAM RESULT & 4-STEP REVIEW CARD
 * Enforces Sections 34, 35, 36, 37, 38, 39, 40, 41, 42, 44, 46.
 */

import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { MathFormula, MathText, isValidDisplayFormula } from '../common/MathFormula';
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Sparkles,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  History,
  Layers,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ExamGradingResult, ExamQuestionItem } from '../../services/examEngine';
import { AdaptiveExamService } from '../../services/adaptiveExamService';
import { ExamTrapRadarBadge } from '../practice/ExamTrapRadarBadge';

export interface ExamResultReviewCardProps {
  gradingResult: ExamGradingResult;
  questions: ExamQuestionItem[];
  flaggedQuestionIds: string[];
  onRetakeExam: () => void;
  onViewHistory: () => void;
}

export const ExamResultReviewCard: React.FC<ExamResultReviewCardProps> = ({
  gradingResult,
  questions,
  flaggedQuestionIds,
  onRetakeExam,
  onViewHistory
}) => {
  // Review Filter Tab: 'ALL' | 'CORRECT' | 'WRONG' | 'UNANSWERED' | 'FLAGGED'
  const [filterTab, setFilterTab] = useState<'ALL' | 'CORRECT' | 'WRONG' | 'UNANSWERED' | 'FLAGGED'>('ALL');

  // Similar Question Modal state
  const [similarModalQuestion, setSimilarModalQuestion] = useState<{
    original: ExamQuestionItem;
    similar: ExamQuestionItem | null;
  } | null>(null);

  // Derive Result Encouragement Message
  const getEncouragementMessage = (score: number) => {
    if (score >= 9.0) return 'Quá ổn! Em đang có nền rất chắc.';
    if (score >= 7.0) return 'Khá tốt rồi. Chỉ cần vá thêm vài chỗ.';
    if (score >= 5.0) return 'Không sao. Mình đã biết chính xác chỗ cần ôn.';
    return 'Đừng nản nhé. Mình tách từng dạng ra xử lý.';
  };

  const minutesSpent = Math.floor(gradingResult.timeSpentSeconds / 60);
  const secondsSpent = gradingResult.timeSpentSeconds % 60;

  // Filter questions according to active tab
  const filteredQuestions = questions.filter((q) => {
    const qRes = gradingResult.questionResults.find((qr) => qr.questionId === q.id);
    const isFlagged = flaggedQuestionIds.includes(q.id);

    if (filterTab === 'CORRECT') return qRes?.isFullyCorrect === true;
    if (filterTab === 'WRONG') return qRes && qRes.scoreAwarded < 1.0 && qRes.userAnswerDisplay !== 'Chưa làm' && qRes.userAnswerDisplay !== 'Chưa chọn' && qRes.userAnswerDisplay !== 'Chưa nhập';
    if (filterTab === 'UNANSWERED') return qRes?.userAnswerDisplay === 'Chưa làm' || qRes?.userAnswerDisplay === 'Chưa chọn' || qRes?.userAnswerDisplay === 'Chưa nhập';
    if (filterTab === 'FLAGGED') return isFlagged;
    return true;
  });

  const handleOpenSimilar = (q: ExamQuestionItem) => {
    const similar = AdaptiveExamService.findSimilarQuestion(q);
    setSimilarModalQuestion({ original: q, similar });
  };

  return (
    <div id="exam-result-review-container" className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* 1. Score Summary Banner */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border-3 border-black shadow-neo space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="neo-badge bg-[#FF6B00] text-white">
              <Award className="w-3.5 h-3.5" />
              KẾT QUẢ ÔN THI VÀO 10
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight font-heading">
              Điểm Số: <span className="text-[#FF6B00]">{gradingResult.score} / 10.0</span>
            </h2>
            <p className="text-sm font-black text-black">
              {getEncouragementMessage(gradingResult.score)}
            </p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-2.5 shrink-0 text-center text-xs">
            <div className="p-3 rounded bg-[#FFF9E6] border-2 border-black shadow-neo-sm flex flex-col items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-black mb-1" />
              <span className="text-[10px] text-gray-700 font-black uppercase">Số Câu Đúng</span>
              <span className="font-black text-black text-sm">
                {gradingResult.correctCount}/10
              </span>
            </div>

            <div className="p-3 rounded bg-[#FFF9E6] border-2 border-black shadow-neo-sm flex flex-col items-center justify-center">
              <Clock className="w-4 h-4 text-black mb-1" />
              <span className="text-[10px] text-gray-700 font-black uppercase">Thời Gian</span>
              <span className="font-black text-black text-sm">
                {String(minutesSpent).padStart(2, '0')}:{String(secondsSpent).padStart(2, '0')}
              </span>
            </div>

            <div className="p-3 rounded bg-[#FFF9E6] border-2 border-black shadow-neo-sm flex flex-col items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#FF6B00] mb-1" />
              <span className="text-[10px] text-gray-700 font-black uppercase">Tỷ Lệ Đạt</span>
              <span className="font-black text-[#FF6B00] text-sm">
                {gradingResult.percentage}%
              </span>
            </div>
          </div>
        </div>

        {/* 2. Topic & Difficulty Reports */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t-2 border-black">
          {/* Topic Stats */}
          <div className="p-4 rounded bg-[#FFF9E6] border-2 border-black space-y-2">
            <h4 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#FF6B00]" />
              Thống Kê Theo Chủ Đề:
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-white rounded border-2 border-black flex justify-between font-bold">
                <span>Hình Trụ:</span>
                <strong className="text-black">{gradingResult.topicStats.cylinder.correct}/{gradingResult.topicStats.cylinder.total}</strong>
              </div>
              <div className="p-2 bg-white rounded border-2 border-black flex justify-between font-bold">
                <span>Hình Nón:</span>
                <strong className="text-black">{gradingResult.topicStats.cone.correct}/{gradingResult.topicStats.cone.total}</strong>
              </div>
              <div className="p-2 bg-white rounded border-2 border-black flex justify-between font-bold">
                <span>Hình Cầu:</span>
                <strong className="text-black">{gradingResult.topicStats.sphere.correct}/{gradingResult.topicStats.sphere.total}</strong>
              </div>
              <div className="p-2 bg-white rounded border-2 border-black flex justify-between font-bold">
                <span>Khối Liên Hợp:</span>
                <strong className="text-black">{gradingResult.topicStats.mixed.correct}/{gradingResult.topicStats.mixed.total}</strong>
              </div>
            </div>
          </div>

          {/* Difficulty Stats */}
          <div className="p-4 rounded bg-[#FFF9E6] border-2 border-black space-y-2">
            <h4 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B7F000]" />
              Thống Kê Theo Cấp Độ:
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-white rounded border-2 border-black flex justify-between font-bold">
                <span>Nhận biết:</span>
                <strong className="text-black">{gradingResult.difficultyStats.easy.correct}/{gradingResult.difficultyStats.easy.total}</strong>
              </div>
              <div className="p-2 bg-white rounded border-2 border-black flex justify-between font-bold">
                <span>Thông hiểu:</span>
                <strong className="text-black">{gradingResult.difficultyStats.medium.correct}/{gradingResult.difficultyStats.medium.total}</strong>
              </div>
              <div className="p-2 bg-white rounded border-2 border-black flex justify-between font-bold">
                <span>Vận dụng:</span>
                <strong className="text-black">{gradingResult.difficultyStats.hard.correct}/{gradingResult.difficultyStats.hard.total}</strong>
              </div>
              <div className="p-2 bg-white rounded border-2 border-black flex justify-between font-bold">
                <span>Vận dụng cao:</span>
                <strong className="text-black">{gradingResult.difficultyStats.olympiad.correct}/{gradingResult.difficultyStats.olympiad.total}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Action Buttons (Retake & History) */}
        <div className="flex items-center justify-between pt-2 border-t-2 border-black flex-wrap gap-2">
          <button
            type="button"
            onClick={onViewHistory}
            className="neo-btn px-4 py-2 rounded bg-white text-black hover:bg-[#FFF9E6] font-black text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <History className="w-4 h-4" />
            Xem Lịch Sử Các Lần Thi
          </button>

          <button
            type="button"
            onClick={onRetakeExam}
            className="neo-btn px-4 py-2 rounded bg-[#FF6B00] text-white hover:bg-[#E55F00] font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-neo-sm"
          >
            <RotateCcw className="w-4 h-4" />
            THI LẠI ĐỀ KHÁC (ĐỔI DẠNG BÀI)
          </button>
        </div>
      </div>

      {/* 4. Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
        <span className="text-xs font-black text-black uppercase tracking-wider px-1 shrink-0">
          Xem Chi Tiết:
        </span>
        <button
          onClick={() => setFilterTab('ALL')}
          className={`neo-btn px-3.5 py-1.5 rounded text-xs font-black cursor-pointer ${
            filterTab === 'ALL'
              ? 'bg-black text-white shadow-neo-sm'
              : 'bg-white text-black hover:bg-[#FFF9E6]'
          }`}
        >
          Tất Cả (10)
        </button>
        <button
          onClick={() => setFilterTab('CORRECT')}
          className={`neo-btn px-3.5 py-1.5 rounded text-xs font-black cursor-pointer ${
            filterTab === 'CORRECT'
              ? 'bg-[#B7F000] text-black shadow-neo-sm'
              : 'bg-white text-black hover:bg-[#FFF9E6]'
          }`}
        >
          Đúng ({gradingResult.correctCount})
        </button>
        <button
          onClick={() => setFilterTab('WRONG')}
          className={`neo-btn px-3.5 py-1.5 rounded text-xs font-black cursor-pointer ${
            filterTab === 'WRONG'
              ? 'bg-[#FF4F81] text-white shadow-neo-sm'
              : 'bg-white text-black hover:bg-[#FFF9E6]'
          }`}
        >
          Sai ({gradingResult.wrongCount})
        </button>
        <button
          onClick={() => setFilterTab('UNANSWERED')}
          className={`neo-btn px-3.5 py-1.5 rounded text-xs font-black cursor-pointer ${
            filterTab === 'UNANSWERED'
              ? 'bg-[#FFD23F] text-black shadow-neo-sm'
              : 'bg-white text-black hover:bg-[#FFF9E6]'
          }`}
        >
          Chưa Làm ({gradingResult.unansweredCount})
        </button>
        <button
          onClick={() => setFilterTab('FLAGGED')}
          className={`neo-btn px-3.5 py-1.5 rounded text-xs font-black cursor-pointer ${
            filterTab === 'FLAGGED'
              ? 'bg-[#8B5CF6] text-white shadow-neo-sm'
              : 'bg-white text-black hover:bg-[#FFF9E6]'
          }`}
        >
          Đã Đánh Dấu ({flaggedQuestionIds.length})
        </button>
      </div>

      {/* 5. Itemized 4-Step Solution Cards */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const qRes = gradingResult.questionResults.find((qr) => qr.questionId === q.id);
          const isFull = qRes?.isFullyCorrect;

          return (
            <div
              key={q.id}
              className="bg-white rounded-lg p-5 sm:p-6 border-3 border-black shadow-neo space-y-4"
            >
              {/* Question Item Header */}
              <div className="flex items-center justify-between gap-2 flex-wrap border-b-2 border-black pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded bg-[#FF6B00] text-white text-xs font-black flex items-center justify-center border border-black">
                    {q.index}
                  </span>
                  <div>
                    <h3 className="text-xs font-black text-black">{q.title}</h3>
                    <span className="text-[10px] text-gray-700 font-bold">
                      {q.topicLabel} • Cấp độ: {q.difficultyLabel}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded text-xs font-black flex items-center gap-1.5 border-2 border-black ${
                      isFull
                        ? 'bg-[#B7F000] text-black'
                        : qRes?.scoreAwarded && qRes.scoreAwarded > 0
                        ? 'bg-[#FFD23F] text-black'
                        : 'bg-[#FF4F81] text-white'
                    }`}
                  >
                    {isFull ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Đúng (+{qRes?.scoreAwarded || 1.0} đ)
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        +{qRes?.scoreAwarded || 0} / 1.0 đ
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <div className="gl-question-text">
                <MathText text={q.questionText} />
              </div>

              {isValidDisplayFormula(q.latexEquation) && (
                <div className="gl-formula-box font-mono text-sm sm:text-base">
                  <MathFormula math={q.latexEquation} displayMode={true} />
                </div>
              )}

              {/* Exam Trap Radar Badge */}
              <ExamTrapRadarBadge
                questionText={q.questionText}
                shape={q.shape || q.topic}
              />

              {/* Student Answer vs Correct Answer Compare Box */}
              <div className="p-4 rounded bg-[#FFF9E6] border-2 border-black grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-xs text-gray-700 font-black uppercase block mb-0.5">
                    Bài làm của em:
                  </span>
                  <span className={`font-black text-sm sm:text-base ${isFull ? 'text-black' : 'text-[#FF4F81]'}`}>
                    {qRes?.userAnswerDisplay || 'Chưa làm'}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-gray-700 font-black uppercase block mb-0.5">
                    Đáp án chính xác:
                  </span>
                  <span className="font-black text-sm sm:text-base text-black">
                    {qRes?.correctAnswerDisplay}
                  </span>
                </div>
              </div>

              {/* Thầy Hiếu AI Pedagogical Error Feedback */}
              {!isFull && (
                <div className="p-4 rounded bg-[#FFD23F] border-2 border-black text-sm text-black space-y-2 shadow-neo-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#FF6B00] text-white border border-black flex items-center justify-center font-black text-xs">
                      AI
                    </div>
                    <span className="font-black text-black text-sm sm:text-base">
                      Gợi ý chữa bài từ Thầy Hiếu AI:
                    </span>
                  </div>
                  <div className="leading-relaxed font-semibold text-black gl-solution-text">
                    <MathText text="&ldquo;Đừng vội nản nhé! Ở câu này em cần đặc biệt lưu ý kiểm tra ngay từ **Bước 1** để không bị nhầm lẫn giữa bán kính $r$ và đường kính $d$, hoặc thiếu hệ số $\frac{1}{3}$ khi tính thể tích hình nón.&rdquo;" />
                  </div>
                </div>
              )}

              {/* 4-Step Pedagogical Solution Box */}
              <div className="p-4 rounded bg-white border-2 border-black space-y-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#FF6B00]" />
                  <h4 className="text-xs font-black text-black uppercase tracking-wider">
                    Lời Giải Chi Tiết Chuẩn Sư Phạm 4 Bước:
                  </h4>
                </div>

                <div className="space-y-2.5 gl-solution-text text-black">
                  {q.solution4Steps.map((step, sIdx) => {
                    const stepTitles = [
                      'BƯỚC 1 — PHÂN TÍCH ĐỀ BÀI',
                      'BƯỚC 2 — CHỌN CÔNG THỨC & MÔ HÌNH',
                      'BƯỚC 3 — TIẾN HÀNH TÍNH TOÁN',
                      'BƯỚC 4 — KẾT LUẬN & ĐƠN VỊ'
                    ];

                    return (
                      <div key={sIdx} className="p-3.5 rounded bg-[#FFF9E6] border-2 border-black space-y-1">
                        <span className="text-xs font-black text-[#FF6B00] block">
                          {stepTitles[sIdx]}
                        </span>
                        <div className="leading-relaxed font-semibold">
                          <MathText text={step} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Important Notes (Max 3 items) */}
                {q.importantNotes && q.importantNotes.length > 0 && (
                  <div className="pt-2.5 border-t-2 border-black space-y-2">
                    <span className="text-xs font-black uppercase text-black tracking-wider flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#FF6B00]" />
                      Lưu Ý Quan Trọng:
                    </span>
                    <div className="space-y-1.5">
                      {q.importantNotes.slice(0, 3).map((note, nIdx) => (
                        <div key={nIdx} className="text-sm text-black font-semibold flex items-start gap-2">
                          <span className="text-[#FF6B00] font-black">&bull;</span>
                          <MathText text={note} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Similar Question Trigger Button */}
              {!isFull && (
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => handleOpenSimilar(q)}
                    className="neo-btn px-4 py-2 rounded bg-white text-black hover:bg-[#FFF9E6] font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-neo-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
                    Làm Một Câu Tương Tự ({q.archetypeName})
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Similar Question Practice Modal Drawer */}
      {similarModalQuestion && similarModalQuestion.similar && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-xl w-full p-6 shadow-neo-lg space-y-4 max-h-[90vh] overflow-y-auto border-3 border-black">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-[#FFD23F] text-black border-2 border-black flex items-center justify-center font-black">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#FF6B00] block">
                    Củng Cố Dạng Bài (Targeted Practice)
                  </span>
                  <h3 className="text-sm font-black text-black">
                    Câu Tương Tự: {similarModalQuestion.similar.archetypeName}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSimilarModalQuestion(null)}
                className="p-1.5 text-black hover:bg-black/10 rounded border border-black cursor-pointer font-black text-base"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded bg-[#FFF9E6] border-2 border-black space-y-2">
                <span className="text-[10px] text-gray-700 font-black uppercase block">
                  Đề bài biến thể mới:
                </span>
                <div className="font-semibold text-black leading-relaxed text-sm">
                  <MathText text={similarModalQuestion.similar.questionText} />
                </div>
              </div>

              <div className="p-4 rounded bg-white border-2 border-black text-black space-y-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span className="font-black text-xs uppercase">Hướng Dẫn &amp; Đáp Án:</span>
                </div>
                <div className="text-xs text-black space-y-1 font-semibold">
                  {similarModalQuestion.similar.solution4Steps.map((step, idx) => (
                    <div key={idx} className="p-2 rounded bg-[#FFF9E6] border border-black">
                      <MathText text={step} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t-2 border-black">
              <button
                type="button"
                onClick={() => setSimilarModalQuestion(null)}
                className="neo-btn px-4 py-2 rounded bg-[#FF6B00] text-white hover:bg-[#E55F00] font-black text-xs cursor-pointer shadow-neo-sm"
              >
                Đã Hiểu Dạng Bài Này
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
