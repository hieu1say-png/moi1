/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - PracticeQuiz Component
 * Step 5 of Learning Journey: Luyện Tập Trắc Nghiệm Chuẩn Mực
 * - Draws directly from masterQuestionBank.json
 * - 100% Multiple Choice (4 options: A, B, C, D)
 * - Strict test integrity: No answers, colors, or explanations shown before submit
 * - After submit: Detailed 4-step solution rendered with KaTeX
 * - Records score, accuracy, and detected weaknesses to StudentProgressService
 */

import React, { useState, useMemo } from 'react';
import { ShapeType } from '../../types';
import masterBank from '../../data/masterQuestionBank.json';
import { MathFormula, MathText } from '../common/MathFormula';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Trophy,
  AlertTriangle
} from 'lucide-react';

interface QuestionOption {
  id: string;
  text: string;
}

interface MasterQuestion {
  id: string;
  topic: string;
  subtopic?: string;
  question: string;
  options: QuestionOption[];
  correctAnswer: string;
  solution4Steps?: string[];
  importantNotes?: string[];
  explanation?: string;
}

interface PracticeQuizProps {
  shapeType: ShapeType;
  onCompleted?: (correctCount: number, total: number, weaknesses: string[]) => void;
}

export const PracticeQuiz: React.FC<PracticeQuizProps> = ({ shapeType, onCompleted }) => {
  const targetTopic = useMemo(() => {
    switch (shapeType) {
      case 'cylinder':
        return 'CYLINDER';
      case 'sphere':
        return 'SPHERE';
      case 'cone':
        return 'CONE';
      default:
        return 'CYLINDER';
    }
  }, [shapeType]);

  // Select 5 questions from masterQuestionBank
  const questions: MasterQuestion[] = useMemo(() => {
    const raw = (masterBank as any[]).filter((q) => {
      const top = (q.topic || '').toUpperCase();
      return top === targetTopic && q.options && q.options.length === 4 && q.correctAnswer;
    });

    if (raw.length <= 5) return raw;
    // Deterministic selection based on topic
    return raw.slice(0, 5);
  }, [targetTopic]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const currentAnswer = selectedAnswers[currentQ?.id] || null;
  const isSubmitted = !!submittedQuestions[currentQ?.id];

  const handleSelectOption = (optionId: string) => {
    if (isSubmitted) return; // Prevent changing after submission
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId
    }));
  };

  const handleSubmitCurrent = () => {
    if (!currentAnswer) return;
    setSubmittedQuestions((prev) => ({
      ...prev,
      [currentQ.id]: true
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finish quiz
      setQuizFinished(true);
      // Calculate score and weaknesses
      let correct = 0;
      const detectedWeaknesses: string[] = [];
      questions.forEach((q) => {
        if (selectedAnswers[q.id] === q.correctAnswer) {
          correct += 1;
        } else {
          if (q.subtopic) {
            detectedWeaknesses.push(q.subtopic);
          } else {
            detectedWeaknesses.push(`${q.topic} - Công thức & bài toán`);
          }
        }
      });

      if (onCompleted) {
        onCompleted(correct, totalQuestions, Array.from(new Set(detectedWeaknesses)));
      }
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setSubmittedQuestions({});
    setCurrentIndex(0);
    setQuizFinished(false);
  };

  if (!currentQ) {
    return (
      <div className="p-6 text-center text-[#766A61] bg-[#FFFDF8] rounded-2xl border border-[#E5DCCF]">
        Không tìm thấy câu hỏi luyện tập cho chủ đề này.
      </div>
    );
  }

  // Finished Summary Screen
  if (quizFinished) {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) correctCount += 1;
    });
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    return (
      <div className="space-y-6 bg-[#FFFDF8] border border-[#E5DCCF] rounded-2xl p-6 sm:p-8 text-center shadow-xs">
        <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center mx-auto">
          <Trophy className="w-8 h-8 text-amber-600" />
        </div>

        <div className="space-y-1.5">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3A302B]">
            Hoàn Thành Bài Luyện Tập!
          </h3>
          <p className="text-xs sm:text-sm text-[#766A61]">
            Bạn đã nộp toàn bộ {totalQuestions} câu hỏi trắc nghiệm của chủ đề.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DCCF] inline-flex items-center gap-6">
          <div>
            <div className="text-xs text-[#766A61] font-medium">Số câu đúng</div>
            <div className="text-xl font-bold text-[#8F3E32]">
              {correctCount} / {totalQuestions}
            </div>
          </div>
          <div className="w-px h-8 bg-[#E5DCCF]" />
          <div>
            <div className="text-xs text-[#766A61] font-medium">Độ chính xác</div>
            <div className="text-xl font-bold text-emerald-700">{percentage}%</div>
          </div>
          <div className="w-px h-8 bg-[#E5DCCF]" />
          <div>
            <div className="text-xs text-[#766A61] font-medium">Điểm thưởng</div>
            <div className="text-xl font-bold text-[#997129]">+{correctCount * 30} XP</div>
          </div>
        </div>

        <div className="pt-3">
          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8F3E32] text-white text-xs sm:text-sm font-bold hover:bg-[#723228] transition-colors shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm Lại Lần Nữa</span>
          </button>
        </div>
      </div>
    );
  }

  const isCorrect = isSubmitted && currentAnswer === currentQ.correctAnswer;

  return (
    <div className="space-y-6">
      {/* Quiz Progress Header */}
      <div className="flex items-center justify-between bg-[#FFFDF8] border border-[#E5DCCF] rounded-2xl p-4 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#8F3E32] uppercase tracking-wider bg-[#FDF0ED] px-2.5 py-1 rounded-full border border-[#F4D2CA]">
            Câu {currentIndex + 1} / {totalQuestions}
          </span>
          <span className="text-xs text-[#766A61] font-medium hidden sm:inline">
            100% Trắc nghiệm 4 lựa chọn (A, B, C, D)
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {questions.map((q, idx) => {
            const answered = !!selectedAnswers[q.id];
            const isSub = !!submittedQuestions[q.id];
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                  isCurrent
                    ? 'ring-2 ring-[#8F3E32] bg-[#8F3E32] text-white'
                    : isSub
                    ? selectedAnswers[q.id] === q.correctAnswer
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-red-100 text-red-800 border border-red-300'
                    : answered
                    ? 'bg-[#EADBCC] text-[#3A302B]'
                    : 'bg-[#F4EEE4] text-[#766A61]'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-[#FFFDF8] border border-[#E5DCCF] rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
        {/* Question Statement */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-[#766A61] uppercase tracking-wider">
            Nội Dung Câu Hỏi:
          </div>
          <div className="text-sm sm:text-base font-medium text-[#3A302B] leading-relaxed p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DCCF]">
            <MathText text={currentQ.question} />
          </div>
        </div>

        {/* 4 Multiple Choice Options (A, B, C, D) */}
        <div className="space-y-2.5">
          <div className="text-xs font-bold text-[#766A61] uppercase tracking-wider">
            Chọn một trong 4 phương án:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt) => {
              const isSelected = currentAnswer === opt.id;
              let optionStyle = 'bg-white border-[#E5DCCF] text-[#3A302B] hover:border-[#8F3E32]/40';

              if (isSubmitted) {
                if (opt.id === currentQ.correctAnswer) {
                  // Reveal correct answer in green after submit
                  optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                } else if (isSelected && opt.id !== currentQ.correctAnswer) {
                  // User chose wrong answer
                  optionStyle = 'bg-red-50 border-red-400 text-red-950';
                } else {
                  optionStyle = 'bg-white/60 border-slate-200 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                // Neutral highlight before submit - DO NOT REVEAL CORRECT/INCORRECT
                optionStyle = 'bg-[#FDF0ED] border-[#8F3E32] text-[#8F3E32] font-semibold ring-1 ring-[#8F3E32]';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-3.5 sm:p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${optionStyle}`}
                >
                  <span
                    className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected
                        ? isSubmitted
                          ? opt.id === currentQ.correctAnswer
                            ? 'bg-emerald-600 text-white'
                            : 'bg-red-600 text-white'
                          : 'bg-[#8F3E32] text-white'
                        : isSubmitted && opt.id === currentQ.correctAnswer
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#F4EEE4] text-[#594D46]'
                    }`}
                  >
                    {opt.id}
                  </span>
                  <div className="text-xs sm:text-sm pt-0.5 leading-relaxed">
                    <MathText text={opt.text} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button: Nộp Bài / Tiếp Tục */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E5DCCF]">
          {!isSubmitted ? (
            <button
              type="button"
              disabled={!currentAnswer}
              onClick={handleSubmitCurrent}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                currentAnswer
                  ? 'bg-[#8F3E32] text-white hover:bg-[#723228] shadow-xs cursor-pointer'
                  : 'bg-[#E5DCCF] text-[#A0958B] cursor-not-allowed'
              }`}
            >
              Nộp Bài Để Xem Lời Giải
            </button>
          ) : (
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <span className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Chính xác! (+30 XP)</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-red-700 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span>Chưa chính xác. Đáp án đúng là {currentQ.correctAnswer}</span>
                </span>
              )}
            </div>
          )}

          {isSubmitted && (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#8F3E32] text-white font-bold text-xs sm:text-sm hover:bg-[#723228] transition-colors shadow-xs"
            >
              <span>{currentIndex < totalQuestions - 1 ? 'Câu Tiếp Theo' : 'Xem Tổng Kết'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Detailed 4-Step Solution (Shown ONLY after submission) */}
        {isSubmitted && (
          <div className="space-y-3 pt-4 border-t border-[#E5DCCF] animate-fadeIn">
            <div className="flex items-center gap-2 font-serif font-bold text-xs sm:text-sm text-[#3A302B]">
              <Sparkles className="w-4 h-4 text-[#8F3E32]" />
              <span>Lời Giải Chi Tiết 4 Bước Chuẩn Mực:</span>
            </div>

            {currentQ.solution4Steps && currentQ.solution4Steps.length > 0 ? (
              <div className="space-y-2">
                {currentQ.solution4Steps.map((stepText, sIdx) => (
                  <div key={sIdx} className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E5DCCF] text-xs sm:text-sm text-[#3A302B]">
                    <MathText text={stepText} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E5DCCF] text-xs sm:text-sm text-[#3A302B]">
                <MathText text={currentQ.explanation || 'Áp dụng công thức chuẩn hình học không gian Toán 9 để tính toán.'} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
