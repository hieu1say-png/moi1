/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AI CORRECTION CARD COMPONENT
 * Renders the comprehensive "AI Thầy Hiếu chữa bài chi tiết" feedback card
 * after a student submits their answer.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Exercise } from '../../types/dataArchitecture';
import { MathFormula, MathText } from '../common/MathFormula';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { SolutionTimeline, SolutionStep } from './SolutionTimeline';
import { AITutorErrorFeedbackCard } from '../ai/AITutorErrorFeedbackCard';
import {
  generateExerciseSolution,
  parseAISolutionResponse,
  ComprehensiveCorrection
} from '../../services/solutionGenerator';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  MessageSquare,
  Send,
  RotateCcw,
  ArrowRight,
  Copy,
  Check,
  Brain,
  HelpCircle,
  Loader2,
  Award,
  Shuffle
} from 'lucide-react';

interface AICorrectionCardProps {
  exercise: Exercise;
  userAnswer: any;
  isCorrect: boolean;
  timeSpent: number;
  detectedError?: { title: string; desc: string } | null;
  onRetry: () => void;
  onNext: () => void;
  onPracticeSimilar?: () => void;
}

export const AICorrectionCard: React.FC<AICorrectionCardProps> = ({
  exercise,
  userAnswer,
  isCorrect,
  timeSpent,
  detectedError,
  onRetry,
  onNext,
  onPracticeSimilar
}) => {
  const [correctionData, setCorrectionData] = useState<ComprehensiveCorrection>(() =>
    generateExerciseSolution(exercise, userAnswer, isCorrect, detectedError)
  );
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Follow-up Q&A states
  const [followupQuestion, setFollowupQuestion] = useState('');
  const [followupReplies, setFollowupReplies] = useState<
    { q: string; a: string; timestamp: string }[]
  >([]);
  const [isAskingFollowup, setIsAskingFollowup] = useState(false);

  // Fetch / Enhance with AI from server if available
  useEffect(() => {
    let isMounted = true;
    const baseCorrection = generateExerciseSolution(
      exercise,
      userAnswer,
      isCorrect,
      detectedError
    );
    setCorrectionData(baseCorrection);
    setFollowupReplies([]);

    async function fetchDetailedAISolution() {
      try {
        setIsLoadingAI(true);
        const res = await fetch('/api/ai-tutor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: `Hãy chữa bài chi tiết từng bước cho học sinh lớp 9 với bài toán sau:
Tiêu đề: ${exercise.title}
Đề bài: ${exercise.question}
Loại hình: ${exercise.shapeId}
Dạng bài: ${exercise.type}
Đáp án mẫu của giáo viên: ${exercise.explanation}
Học sinh trả lời: ${JSON.stringify(userAnswer)}
Kết quả chấm: ${isCorrect ? 'ĐÚNG' : 'CHƯA ĐÚNG'}
Lỗi phát hiện (nếu có): ${detectedError?.title || 'Không có'}
Yêu cầu: Trình bày 4 bước chữa bài chi tiết sư phạm với công thức LaTeX chuẩn ($...$ hoặc $$...$$), chỉ ra điểm mấu chốt và lời khuyên để học sinh làm tốt bài thi vào 10.`,
            feedbackLevel: 5,
            context: {
              currentShape: exercise.shapeId,
              currentLesson: exercise.title,
              currentExercise: exercise,
              studentAnswer: userAnswer,
              commonErrors: detectedError ? [detectedError.title] : []
            }
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.reply) {
            const enhancedSteps = parseAISolutionResponse(
              data.reply,
              baseCorrection.steps
            );
            setCorrectionData((prev) => ({
              ...prev,
              steps: enhancedSteps
            }));
          }
        }
      } catch (err) {
        console.log('Using deterministic offline solution engine:', err);
      } finally {
        if (isMounted) setIsLoadingAI(false);
      }
    }

    fetchDetailedAISolution();

    return () => {
      isMounted = false;
    };
  }, [exercise.id, isCorrect, userAnswer]);

  // Handle asking follow-up question to AI Teacher Hiếu
  const handleSendFollowup = async (customQ?: string) => {
    const questionText = (customQ || followupQuestion).trim();
    if (!questionText || isAskingFollowup) return;

    setFollowupQuestion('');
    setIsAskingFollowup(true);

    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Học sinh hỏi thêm về bài tập "${exercise.title}": "${questionText}". Hãy trả lời ngắn gọn, sư phạm, dùng công thức LaTeX $...$ để giải thích rõ ràng cho học sinh lớp 9.`,
          feedbackLevel: 4,
          context: {
            currentShape: exercise.shapeId,
            currentLesson: exercise.title,
            currentExercise: exercise,
            studentAnswer: userAnswer
          }
        })
      });

      let answerText =
        'Thầy đã nhận được câu hỏi. Với dạng bài này, điều quan trọng nhất là nhớ đúng công thức và xác định chính xác các đại lượng $r, h, l$ từ đề bài nhé!';
      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          answerText = data.reply;
        }
      }

      setFollowupReplies((prev) => [
        ...prev,
        {
          q: questionText,
          a: answerText,
          timestamp: new Date().toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      ]);
    } catch (e) {
      setFollowupReplies((prev) => [
        ...prev,
        {
          q: questionText,
          a: `💡 **Gợi ý từ Thầy Hiếu**: Với ${
            exercise.shapeId === 'cylinder'
              ? 'Hình Trụ'
              : exercise.shapeId === 'cone'
              ? 'Hình Nón'
              : 'Hình Cầu'
          }, hãy luôn vẽ hình nháp và viết công thức tổng quát trước khi thay số để tránh nhầm lẫn nhé!`,
          timestamp: new Date().toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      ]);
    } finally {
      setIsAskingFollowup(false);
    }
  };

  const handleCopySolution = () => {
    const textToCopy = `[LỜI GIẢI CHI TIẾT - ${exercise.title}]
Đề bài: ${exercise.question}

${correctionData.steps
  .map(
    (s) =>
      `Bước ${s.stepNumber}: ${s.title}\n${s.description}${
        s.intermediateResult ? `\n=> Kết quả: ${s.intermediateResult}` : ''
      }`
  )
  .join('\n\n')}

Lời khuyên từ Thầy Hiếu: ${correctionData.teacherTip}`;

    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div
      id="ai-correction-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="rounded-3xl bg-[#FFFDF8] border-2 border-[#DFD2F0] p-5 sm:p-7 shadow-paper space-y-6 relative overflow-hidden"
    >
      {/* Soft background decorative glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#FAF7FD] rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 opacity-70" />

      {/* 1. Header with AI Teacher Hiếu Identity */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5DCCF] relative">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#B7A2D6] to-[#987CC5] text-white flex items-center justify-center shadow-md shrink-0">
            <Sparkles className="w-6 h-6 animate-pulse text-[#FFFDF8]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3A302B] flex items-center gap-2">
                <span>✨ AI Thầy Hiếu chữa bài chi tiết:</span>
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F1EBF9] border border-[#DFD2F0] text-[#634796] text-[11px] font-bold font-sans">
                Gia Sư Toán 9
              </span>
            </div>
            <p className="text-xs text-[#766A61] font-sans mt-0.5">
              Phân tích sư phạm từng bước • KaTeX chuẩn • Chẩn đoán lỗi sai
            </p>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F4EC] border border-[#E5DCCF] text-xs font-mono font-bold text-[#594D46]">
            <span>⏱️ {timeSpent}s</span>
          </div>

          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold font-sans ${
              isCorrect
                ? 'bg-[#EBF2E8] border-[#D0DEC9] text-[#4D6B42]'
                : 'bg-[#FFF6F4] border-[#F4D2CA] text-[#8F3E32]'
            }`}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-black text-emerald-800 tracking-wide">ĐÚNG</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-600" />
                <span className="font-black text-rose-800 tracking-wide">CHƯA ĐÚNG</span>
              </>
            )}
          </div>

          <button
            onClick={handleCopySolution}
            className="p-2 rounded-xl bg-[#FFFDF8] border border-[#E5DCCF] text-[#766A61] hover:text-[#3A302B] hover:bg-[#F4EEE4] transition-all text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Sao chép bài giải"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Đã chép</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Chép lời giải</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Status Banner & Encouragement */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
          isCorrect
            ? 'bg-[#F6FAF4] border-[#D0DEC9] text-[#3A302B]'
            : 'bg-[#FFF6F4] border-[#F4D2CA] text-[#3A302B]'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
              isCorrect
                ? 'bg-[#EBF2E8] text-[#4D6B42]'
                : 'bg-[#FDF0ED] text-[#8F3E32]'
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <AlertTriangle className="w-5 h-5" />
            )}
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#3A302B]">
              {correctionData.statusTitle}
            </h4>
            <p className="text-sm sm:text-base text-[#3A302B] leading-relaxed font-sans font-normal">
              <MathText text={correctionData.statusMessage} />
            </p>
          </div>
        </div>
      </div>

      {/* 3. Thầy Hiếu AI Error Diagnosis & 4-Part Recovery if incorrect */}
      {!isCorrect && (
        <AITutorErrorFeedbackCard
          question={exercise}
          studentAnswer={userAnswer}
          correctAnswer={exercise.explanation || (exercise as any).solution}
        />
      )}

      {/* 4. Misconception Warning Banner (if error detected and correct) */}
      {isCorrect && detectedError && (
        <div className="p-4 rounded-2xl bg-[#FFF8EE] border border-[#F5E6BF] space-y-2">
          <div className="flex items-center gap-2 text-[#7A571B] font-bold text-sm sm:text-base font-sans">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Chẩn đoán sai lầm: {detectedError.title}</span>
          </div>
          <p className="text-sm sm:text-base text-[#8C6627] leading-relaxed font-normal pl-7">
            <MathText text={detectedError.desc} />
          </p>
        </div>
      )}


      {/* 4. Vertical Solution Timeline */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ED806F]" />
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#3A302B]">
              Các bước giải chi tiết chuẩn sư phạm:
            </h4>
          </div>
          {isLoadingAI && (
            <span className="flex items-center gap-1.5 text-xs sm:text-sm text-[#7B5CAE] font-medium font-sans">
              <Loader2 className="w-4 h-4 animate-spin" />
              AI đang hoàn thiện...
            </span>
          )}
        </div>

        {/* Render the Staggered Timeline */}
        <SolutionTimeline
          steps={correctionData.steps}
          isCorrect={correctionData.isCorrect}
        />
      </div>

      {/* 5. Golden Teacher Advice Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7FD] border border-[#DFD2F0] space-y-2 relative">
        <div className="flex items-center gap-2 text-[#634796] font-bold text-sm sm:text-base font-sans">
          <Lightbulb className="w-5 h-5 text-[#7B5CAE] shrink-0" />
          <span>Lời khuyên vàng từ Thầy Hiếu (Mẹo thi vào Lớp 10):</span>
        </div>
        <p className="text-sm sm:text-base text-[#3A302B] leading-relaxed font-sans pl-7">
          <MathText text={correctionData.teacherTip} />
        </p>
      </div>

      {/* 6. Interactive AI Follow-up Q&A Section */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F4EC] border border-[#E5DCCF] space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#C96859]" />
            <h5 className="font-serif text-sm sm:text-base font-bold text-[#3A302B]">
              Hỏi thêm Thầy Hiếu về bài toán này:
            </h5>
          </div>
          <span className="text-[11px] text-[#766A61] font-sans">
            Nhận giải thích tức thì từ AI
          </span>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap gap-2">
          {correctionData.quickQuestions.map((q, idx) => (
            <button
              key={idx}
              disabled={isAskingFollowup}
              onClick={() => handleSendFollowup(q)}
              className="px-3 py-1.5 rounded-full bg-[#FFFDF8] border border-[#E5DCCF] text-xs font-sans text-[#594D46] hover:text-[#C96859] hover:border-[#ED806F] transition-all cursor-pointer shadow-2xs text-left"
            >
              💬 {q}
            </button>
          ))}
        </div>

        {/* Follow-up Replies History */}
        <AnimatePresence>
          {followupReplies.length > 0 && (
            <div className="space-y-3 pt-2">
              {followupReplies.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-xl bg-[#FFFDF8] border border-[#E5DCCF] space-y-2 text-xs font-sans"
                >
                  <div className="flex items-center justify-between text-[#766A61] font-medium border-b border-[#F4EEE4] pb-1.5">
                    <span className="font-bold text-[#3A302B]">
                      Học sinh: "{item.q}"
                    </span>
                    <span className="font-mono text-[10px]">
                      {item.timestamp}
                    </span>
                  </div>
                  <div className="text-[#594D46] leading-relaxed pl-2 border-l-2 border-[#B7A2D6] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#634796] block">
                        Thầy Hiếu giải đáp:
                      </span>
                    </div>
                    <div className="whitespace-pre-line">
                      <MathText text={item.a} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Question Input Box */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="text"
            placeholder="Đặt câu hỏi cho Thầy Hiếu (ví dụ: Tại sao V_cầu có 4/3?)..."
            value={followupQuestion}
            onChange={(e) => setFollowupQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendFollowup();
            }}
            disabled={isAskingFollowup}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5DCCF] bg-[#FFFDF8] text-xs sm:text-sm text-[#3A302B] placeholder:text-[#A0958B] focus:outline-none focus:ring-2 focus:ring-[#ED806F] transition-all font-sans"
          />
          <Button
            size="sm"
            variant="primary"
            shape="rounded"
            disabled={!followupQuestion.trim() || isAskingFollowup}
            onClick={() => handleSendFollowup()}
            leftIcon={
              isAskingFollowup ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )
            }
            className="font-bold text-xs shrink-0"
          >
            {isAskingFollowup ? 'Đang giải...' : 'Hỏi Thầy'}
          </Button>
        </div>
      </div>

      {/* 7. Footer Bottom Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#E5DCCF]">
        <Button
          variant="outline"
          shape="pill"
          size="md"
          onClick={() => {
            onRetry();
          }}
          leftIcon={<RotateCcw className="w-4 h-4" />}
          className="text-xs sm:text-sm font-semibold"
        >
          Làm lại bài này
        </Button>

        <div className="flex items-center gap-2">
          {onPracticeSimilar && (
            <Button
              variant="outline"
              shape="pill"
              size="md"
              onClick={onPracticeSimilar}
              leftIcon={<Shuffle className="w-4 h-4 text-[#059669]" />}
              className="text-xs sm:text-sm font-bold bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#065F46] border-[#A7F3D0] shadow-xs cursor-pointer"
            >
              Luyện câu tương tự 🎯
            </Button>
          )}

          <Button
            variant="primary"
            shape="pill"
            size="md"
            onClick={() => {
              onNext();
            }}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="text-xs sm:text-sm font-bold bg-[#16A34A] hover:bg-[#15803D] text-white shadow-xs cursor-pointer"
          >
            Sang câu tiếp theo
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
