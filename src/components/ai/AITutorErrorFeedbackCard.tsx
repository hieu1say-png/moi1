/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - AI TUTOR ERROR RECOVERY CARD (THẦY HIẾU AI)
 * Standard 4-part pedagogical layout:
 * 1. NHẬN XÉT
 * 2. GIẢI THÍCH
 * 3. 4 BƯỚC LỜI GIẢI CHI TIẾT
 * 4. LƯU Ý PHÒNG THI (⚠️)
 * Plus [LÀM MỘT CÂU TƯƠNG TỰ] & [LUYỆN 3 CÂU] Targeted Practice
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MathText, MathFormula } from '../common/MathFormula';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import {
  ErrorAnalysisEngine,
  ErrorAnalysisResult,
  CanonicalErrorType
} from '../../services/ai/errorAnalysisEngine';
import { UnifiedAssignmentQuestionItem } from '../../services/unifiedAssignmentService';
import {
  Sparkles,
  AlertTriangle,
  Lightbulb,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Brain,
  Target,
  Send,
  Loader2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface AITutorErrorFeedbackCardProps {
  question: any;
  studentAnswer: any;
  correctAnswer: any;
  onSolveSimilar?: (similarQ: UnifiedAssignmentQuestionItem) => void;
  className?: string;
}

export const AITutorErrorFeedbackCard: React.FC<AITutorErrorFeedbackCardProps> = ({
  question,
  studentAnswer,
  correctAnswer,
  onSolveSimilar,
  className = ''
}) => {
  // 1. Analyze error with Thầy Hiếu AI Engine
  const analysis: ErrorAnalysisResult = React.useMemo(() => {
    return ErrorAnalysisEngine.analyzeError({
      questionId: question?.id,
      questionText: question?.question || question?.questionText || question?.title || '',
      studentAnswer,
      correctAnswer,
      archetypeId: question?.archetypeId,
      shape: question?.shape || question?.shapeId,
      solution: question?.solution || question?.explanation || question?.solution4Steps,
      mathData: {
        d: question?.mathData?.d,
        r: question?.mathData?.r,
        h: question?.mathData?.h,
        l: question?.mathData?.l,
        shape: question?.shape || question?.shapeId
      }
    });
  }, [question, studentAnswer, correctAnswer]);

  const [activeTab, setActiveTab] = useState<'explanation' | 'steps' | 'similar' | 'targeted'>('explanation');
  const [isStepsExpanded, setIsStepsExpanded] = useState<boolean>(true);

  // Similar Question solving state
  const [similarAnswer, setSimilarAnswer] = useState<string>('');
  const [similarSubmitted, setSimilarSubmitted] = useState<boolean>(false);
  const [isSimilarCorrect, setIsSimilarCorrect] = useState<boolean | null>(null);

  // Targeted 3-questions practice state
  const [targetedQuestions, setTargetedQuestions] = useState<UnifiedAssignmentQuestionItem[]>([]);
  const [targetedCurrentIdx, setTargetedCurrentIdx] = useState<number>(0);
  const [targetedAnswers, setTargetedAnswers] = useState<Record<string, string>>({});
  const [targetedSubmitted, setTargetedSubmitted] = useState<boolean>(false);

  // Handle request similar question
  const handleOpenSimilar = () => {
    ErrorAnalysisEngine.recordLearningEvent({
      eventType: 'SIMILAR_QUESTION_REQUESTED',
      questionId: question?.id || 'unknown',
      archetypeId: question?.archetypeId,
      errorType: analysis.errorType,
      studentAnswer
    });

    if (onSolveSimilar && analysis.similarQuestion) {
      onSolveSimilar(analysis.similarQuestion);
    } else {
      setActiveTab('similar');
      setSimilarAnswer('');
      setSimilarSubmitted(false);
      setIsSimilarCorrect(null);
    }
  };

  // Check similar question answer
  const handleCheckSimilarAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!analysis.similarQuestion || !similarAnswer.trim()) return;

    const sq = analysis.similarQuestion;
    const cleanStudent = similarAnswer.trim().toLowerCase();
    const cleanCorrect = String(sq.correctAnswerDisplay || sq.rawCorrectAnswer || '').trim().toLowerCase();

    const isMatch = cleanStudent === cleanCorrect ||
      (sq.type === 'multiple_choice' && cleanStudent === cleanCorrect) ||
      (!isNaN(parseFloat(cleanStudent)) && !isNaN(parseFloat(cleanCorrect)) && Math.abs(parseFloat(cleanStudent) - parseFloat(cleanCorrect)) < 0.05);

    setIsSimilarCorrect(isMatch);
    setSimilarSubmitted(true);

    ErrorAnalysisEngine.recordLearningEvent({
      eventType: 'SIMILAR_QUESTION_COMPLETED',
      questionId: sq.id,
      archetypeId: sq.archetypeId,
      errorType: analysis.errorType,
      studentAnswer: similarAnswer,
      correctAnswer: cleanCorrect,
      metadata: { isCorrect: isMatch }
    });
  };

  // Handle start 3-question targeted practice
  const handleStartTargeted = () => {
    const qList = ErrorAnalysisEngine.getTargetedPracticeQuestions(analysis.errorType, 3);
    setTargetedQuestions(qList);
    setTargetedCurrentIdx(0);
    setTargetedAnswers({});
    setTargetedSubmitted(false);
    setActiveTab('targeted');
  };

  const handleTargetedSelect = (qId: string, ans: string) => {
    setTargetedAnswers((prev) => ({ ...prev, [qId]: ans }));
  };

  return (
    <div
      className={`rounded-2xl bg-[#FFFDF8] border-2 border-[#EADFC9] p-4 sm:p-5 shadow-paper space-y-4 text-slate-800 ${className}`}
    >
      {/* 1. Header: Thầy Hiếu AI Identity */}
      <div className="flex items-center justify-between pb-3 border-b border-[#EFE5D3] flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-xs font-bold text-sm shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse text-amber-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-serif font-bold text-sm sm:text-base text-slate-900 flex items-center gap-1.5">
                <span>Thầy Hiếu AI Chữa Bài</span>
              </h4>
              <Badge variant="warning" size="sm" className="text-[10px] font-bold font-sans">
                {analysis.errorTypeLabel}
              </Badge>
            </div>
            <p className="text-[11px] text-slate-500 font-sans">
              Chẩn đoán sai lầm • Phân tích 4 bước chuẩn kỳ thi vào 10
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
            {analysis.errorStepLabel.split(':')[0]}
          </span>
        </div>
      </div>

      {/* Mode Tabs if similar or targeted practice is active */}
      {activeTab !== 'explanation' && (
        <div className="flex items-center gap-2 border-b border-[#EFE5D3] pb-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('explanation')}
            className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
          >
            ← Xem Lời Giải Chi Tiết
          </button>
          {activeTab === 'similar' && (
            <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-800">
              Đang làm câu tương tự ({analysis.similarQuestion?.id})
            </span>
          )}
          {activeTab === 'targeted' && (
            <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-800">
              Luyện 3 câu: {analysis.errorTypeLabel}
            </span>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* SCREEN 1: 4-PART THẦY HIẾU AI PEDAGOGICAL BREAKDOWN          */}
      {/* ============================================================ */}
      {activeTab === 'explanation' && (
        <div className="space-y-4">
          {/* Part 1: NHẬN XÉT */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>1. NHẬN XÉT TỪ THẦY HIẾU:</span>
            </div>
            <div className="text-xs text-rose-950 font-medium pl-6 leading-relaxed">
              &ldquo;<MathText text={analysis.teacherRemark} />&rdquo;
            </div>
          </div>

          {/* Part 2: GIẢI THÍCH NGUYÊN NHÂN LỖI SAI */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
              <span>2. GIẢI THÍCH CHI TIẾT:</span>
            </div>
            <div className="text-xs text-amber-950 font-sans pl-6 leading-relaxed">
              <MathText text={analysis.explanation} />
            </div>
          </div>

          {/* Part 3: 4 BƯỚC SƯ PHẠM (Canonical 4 Steps) */}
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
            <button
              onClick={() => setIsStepsExpanded(!isStepsExpanded)}
              className="w-full p-3 bg-slate-50 flex items-center justify-between font-bold text-xs text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>3. LỜI GIẢI CHI TIẾT 4 BƯỚC:</span>
              </div>
              {isStepsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isStepsExpanded && (
              <div className="p-3.5 space-y-2.5 divide-y divide-slate-100 text-xs">
                {analysis.solution4Steps.map((step, idx) => (
                  <div key={idx} className={idx > 0 ? 'pt-2.5' : ''}>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="text-slate-800 leading-relaxed font-sans flex-1">
                        <MathText text={step} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Part 4: LƯU Ý PHÒNG THI */}
          <div className="p-3 rounded-xl bg-[#FAF7FD] border border-[#DFD2F0] text-xs space-y-1">
            <div className="font-bold text-[#634796] flex items-center gap-1.5">
              <span>4. LƯU Ý PHÒNG THI:</span>
            </div>
            <div className="text-slate-700 leading-relaxed pl-1 font-sans">
              <MathText text={analysis.cautionNote} />
            </div>
          </div>

          {/* Repeat Error Targeted Practice Banner */}
          {analysis.shouldSuggestTargetedPractice && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 space-y-2"
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                  <Target className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>Em đã lặp lại lỗi này {analysis.repeatErrorCount} lần!</span>
                </div>
                <Button
                  size="sm"
                  variant="primary"
                  shape="pill"
                  onClick={handleStartTargeted}
                  className="font-bold text-xs bg-orange-600 hover:bg-orange-700 text-white shadow-xs"
                >
                  [ LUYỆN 3 CÂU ]
                </Button>
              </div>
              <p className="text-[11px] text-amber-800 font-medium">
                {analysis.targetedPracticeTitle || `Luyện 3 câu chuyên sâu về: ${analysis.errorTypeLabel}`}
              </p>
            </motion.div>
          )}

          {/* Bottom Action: [ LÀM MỘT CÂU TƯƠNG TỰ ] */}
          <div className="pt-2 flex items-center justify-between flex-wrap gap-2 border-t border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium">
              Củng cố kiến thức với bài toán cùng dạng mô hình:
            </span>

            <Button
              variant="cylinder"
              size="sm"
              shape="pill"
              onClick={handleOpenSimilar}
              leftIcon={<Sparkles className="w-4 h-4 text-amber-300" />}
              className="font-bold text-xs"
            >
              LÀM MỘT CÂU TƯƠNG TỰ
            </Button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SCREEN 2: INLINE SIMILAR QUESTION SOLVER                     */}
      {/* ============================================================ */}
      {activeTab === 'similar' && analysis.similarQuestion && (
        <div className="space-y-4">
          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-blue-900">
            <span className="font-bold">🎯 Bài toán tương tự ({analysis.similarQuestion.id}):</span>
            <p className="text-[11px] text-blue-800 mt-0.5">
              Cùng mô hình cấu trúc ({analysis.similarQuestion.archetypeId}) với số liệu mới. Hãy làm lại để ghi nhớ nhé!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
            <h5 className="font-bold text-xs text-slate-900">
              {analysis.similarQuestion.title}
            </h5>
            <div className="text-xs text-slate-800 leading-relaxed">
              <MathText text={analysis.similarQuestion.question} />
            </div>

            {analysis.similarQuestion.latexEquation && (
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 inline-block font-mono text-xs">
                <MathFormula math={analysis.similarQuestion.latexEquation} />
              </div>
            )}

            {/* Multiple Choice Options */}
            {analysis.similarQuestion.type === 'multiple_choice' && analysis.similarQuestion.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {analysis.similarQuestion.options.map((opt: any, oIdx: number) => {
                  const optKey = typeof opt === 'string' ? ['A', 'B', 'C', 'D'][oIdx] : opt.id || ['A', 'B', 'C', 'D'][oIdx];
                  const optText = typeof opt === 'string' ? opt : opt.text;
                  const isSelected = similarAnswer === optKey;

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={similarSubmitted}
                      onClick={() => setSimilarAnswer(optKey)}
                      className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold ring-2 ring-blue-200'
                          : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {optKey}
                      </span>
                      <span className="flex-1 font-sans"><MathText text={optText} /></span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Short Answer Input */}
            {analysis.similarQuestion.type !== 'multiple_choice' && (
              <div className="pt-2">
                <input
                  type="text"
                  placeholder="Nhập kết quả tính toán..."
                  value={similarAnswer}
                  disabled={similarSubmitted}
                  onChange={(e) => setSimilarAnswer(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Submission Result */}
          {similarSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                isSimilarCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-red-50 border-red-300 text-red-900'
              }`}
            >
              <div className="flex items-center gap-2 font-bold">
                {isSimilarCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Xuất sắc! Em đã khắc phục lỗi và làm đúng câu tương tự. (+10 XP)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span>Chưa đúng rồi. Đáp án chính xác là: <MathText text={analysis.similarQuestion.correctAnswerDisplay || analysis.similarQuestion.rawCorrectAnswer} /></span>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-2">
            {!similarSubmitted ? (
              <Button
                variant="primary"
                size="sm"
                shape="pill"
                disabled={!similarAnswer.trim()}
                onClick={handleCheckSimilarAnswer}
                className="font-bold text-xs"
              >
                Kiểm Tra Đáp Án
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                shape="pill"
                onClick={() => setActiveTab('explanation')}
                className="font-bold text-xs"
              >
                Quay Lại Lời Giải
              </Button>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SCREEN 3: TARGETED 3-QUESTION WORKOUT                        */}
      {/* ============================================================ */}
      {activeTab === 'targeted' && targetedQuestions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs">
            <span className="font-bold text-amber-900">
              Luyện 3 câu: {analysis.errorTypeLabel}
            </span>
            <span className="text-amber-800 font-mono">
              Câu {targetedCurrentIdx + 1} / {targetedQuestions.length}
            </span>
          </div>

          {/* Current Targeted Question */}
          {(() => {
            const currentTQ = targetedQuestions[targetedCurrentIdx];
            const currentAns = targetedAnswers[currentTQ.id] || '';

            return (
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                <h5 className="font-bold text-xs text-slate-900">
                  {currentTQ.title} ({currentTQ.id})
                </h5>
                <div className="text-xs text-slate-800 leading-relaxed font-sans">
                  <MathText text={currentTQ.question} />
                </div>

                {currentTQ.options && currentTQ.options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {currentTQ.options.map((opt: any, oIdx: number) => {
                      const optKey = typeof opt === 'string' ? ['A', 'B', 'C', 'D'][oIdx] : opt.id || ['A', 'B', 'C', 'D'][oIdx];
                      const optText = typeof opt === 'string' ? opt : opt.text;
                      const isSelected = currentAns === optKey;

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleTargetedSelect(currentTQ.id, optKey)}
                          className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold ring-2 ring-amber-200'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
                              isSelected ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {optKey}
                          </span>
                          <span className="flex-1 font-sans"><MathText text={optText} /></span>
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    disabled={targetedCurrentIdx === 0}
                    onClick={() => setTargetedCurrentIdx((prev) => Math.max(0, prev - 1))}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                  >
                    ← Câu trước
                  </button>

                  {targetedCurrentIdx < targetedQuestions.length - 1 ? (
                    <Button
                      size="sm"
                      variant="primary"
                      shape="pill"
                      onClick={() => setTargetedCurrentIdx((prev) => prev + 1)}
                      className="font-bold text-xs"
                    >
                      Câu tiếp theo →
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="cylinder"
                      shape="pill"
                      onClick={() => setActiveTab('explanation')}
                      className="font-bold text-xs"
                    >
                      Hoàn Thành Luyện Tập ✓
                    </Button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
