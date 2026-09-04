/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - INTERACTIVE LESSON GUIDE BAR & STEP ENGINE
 * Coordinates Grade 9 3D Exploration Flow:
 * - IDLE -> STARTING -> ACTIVE -> COMPLETED
 * - Live synchronization with Three.js 3D Viewer & LearningContext
 * - Grade 9 KaTeX formulas, instant observation checks & micro-quiz
 */

import React, { useState } from 'react';
import { ShapeType } from '../../types';
import { LessonStep, SHAPE_LESSON_FLOWS } from '../../data/lessonFlowData';
import { LessonStateType } from '../../types/learningContext';
import { MathText, MathFormula } from '../common/MathFormula';
import {
  Play,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Award,
  ChevronRight,
  Eye,
  Layers,
  BookOpen,
  Zap,
  Check,
  X
} from 'lucide-react';

export interface LessonGuideBarProps {
  shape: ShapeType;
  lessonState: LessonStateType;
  currentStep: number;
  onStartLesson: () => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onResetLesson: () => void;
  onJumpToStep: (stepNumber: number) => void;
  onNavigateToPractice?: () => void;
  className?: string;
}

export const LessonGuideBar: React.FC<LessonGuideBarProps> = ({
  shape,
  lessonState,
  currentStep,
  onStartLesson,
  onNextStep,
  onPrevStep,
  onResetLesson,
  onJumpToStep,
  onNavigateToPractice,
  className = ''
}) => {
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [showObservationHint, setShowObservationHint] = useState<boolean>(false);
  const [observationConfirmed, setObservationConfirmed] = useState<boolean>(false);

  const steps = SHAPE_LESSON_FLOWS[shape] || SHAPE_LESSON_FLOWS.cylinder;
  const currentStepData: LessonStep = steps[currentStep] || steps[0];
  const totalSteps = steps.length - 1; // excluding intro step 0

  // Handle quiz option click
  const handleSelectQuizOption = (optionId: string) => {
    setSelectedQuizOption(optionId);
    setQuizSubmitted(true);
  };

  // Reset local state when step changes
  React.useEffect(() => {
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setShowObservationHint(false);
    setObservationConfirmed(false);
  }, [currentStep, shape]);

  // Calculate progress percentage
  const progressPercent =
    lessonState === 'idle'
      ? 0
      : lessonState === 'completed'
      ? 100
      : Math.round((currentStep / totalSteps) * 100);

  // 1. IDLE STATE: PROMINENT START BANNER
  if (lessonState === 'idle') {
    return (
      <div
        id="lesson-guide-idle-container"
        className={`bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-lg border border-orange-300 relative overflow-hidden transition-all duration-300 ${className}`}
      >
        {/* Decorative background element */}
        <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Chương Trình Hình Học 9 Chuẩn</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-serif text-white leading-snug">
              {currentStepData.title}
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 font-medium">
              {currentStepData.subtitle}
            </p>
          </div>

          <button
            type="button"
            id="btn-start-learning-flow"
            onClick={onStartLesson}
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-amber-50 text-orange-700 font-bold text-sm sm:text-base rounded-2xl shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer min-h-[48px] touch-manipulation flex items-center justify-center gap-2.5 group"
          >
            <div className="w-7 h-7 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <span>BẮT ĐẦU KHÁM PHÁ</span>
            <ArrowRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  // 2. STARTING STATE: SMOOTH FEEDBACK
  if (lessonState === 'starting') {
    return (
      <div
        id="lesson-guide-starting-container"
        className={`bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-orange-200 shadow-md text-slate-800 animate-pulse flex items-center justify-between gap-4 ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center animate-spin">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">Đang chuẩn bị mô hình không gian 3D...</h3>
            <p className="text-xs text-orange-600 font-medium">Kích hoạt chế độ quan sát trực quan!</p>
          </div>
        </div>
        <div className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-200">
          Khởi tạo...
        </div>
      </div>
    );
  }

  // 3. COMPLETED STATE: REWARD & MASTERY
  if (lessonState === 'completed' || currentStep === 7) {
    return (
      <div
        id="lesson-guide-completed-container"
        className={`bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white shadow-xl border border-emerald-400 relative overflow-hidden transition-all ${className}`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-wide">
              <Award className="w-4 h-4 text-amber-300" />
              <span>ĐÃ LÀM CHỦ BÀI HỌC • +30 XP</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-serif text-white">
              {currentStepData.title}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium max-w-xl">
              {currentStepData.instruction}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              id="btn-lesson-restart"
              onClick={onResetLesson}
              className="flex-1 sm:flex-initial px-4 py-3 bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/30 transition-all cursor-pointer min-h-[44px] touch-manipulation flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>LÀM LẠI</span>
            </button>

            {onNavigateToPractice && (
              <button
                type="button"
                id="btn-lesson-go-practice"
                onClick={onNavigateToPractice}
                className="flex-1 sm:flex-initial px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer min-h-[44px] touch-manipulation flex items-center justify-center gap-2"
              >
                <span>LUYỆN TẬP BÀI TẬP</span>
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 4. ACTIVE STATE: STEP-BY-STEP PEDAGOGICAL ENGINE
  return (
    <div
      id="lesson-guide-active-bar"
      className={`bg-[#FFFDF8]/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-[#E5DCCF] shadow-md text-[#3A302B] p-4 sm:p-5 space-y-3.5 transition-all duration-300 ${className}`}
    >
      {/* Top Header: Step Badge & Navigation Quick Stepper */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-[#E5DCCF]">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-100 text-orange-800 text-xs font-bold border border-orange-200">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>BƯỚC {currentStep} / {totalSteps}</span>
          </span>
          <span className="text-xs font-semibold text-[#766A61] hidden sm:inline">
            • {currentStepData.badge}
          </span>
        </div>

        {/* Step Indicator Dots */}
        <div className="flex items-center gap-1.5">
          {steps.slice(1).map((s) => {
            const isCurr = s.stepNumber === currentStep;
            const isDone = s.stepNumber < currentStep;
            return (
              <button
                key={s.stepNumber}
                type="button"
                onClick={() => onJumpToStep(s.stepNumber)}
                title={`Chuyển tới ${s.title}`}
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-[10px] sm:text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                  isCurr
                    ? 'bg-orange-500 text-white shadow-sm ring-2 ring-orange-200 scale-105'
                    : isDone
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-[#F4EEE4] text-[#766A61] hover:bg-[#EAE0D3]'
                }`}
              >
                {isDone ? <Check className="w-3 h-3 text-emerald-600" /> : s.stepNumber}
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#EAE0D3] h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Step Content: Instruction & Mathematical Core */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-sm sm:text-base font-bold text-[#3A302B]">
            {currentStepData.title}
          </h3>
        </div>

        {/* Formatted Guidance Text */}
        <div className="text-xs sm:text-sm text-[#594D46] leading-relaxed">
          <MathText text={currentStepData.instruction} />
        </div>

        {/* Mathematical Detail Card if available */}
        {currentStepData.mathExplanation && (
          <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DCCF] text-xs text-[#594D46] space-y-1">
            <div className="font-bold text-[#3A302B] flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
              <BookOpen className="w-3.5 h-3.5 text-orange-600" />
              <span>Bản chất hình học:</span>
            </div>
            <div className="whitespace-pre-line leading-relaxed">
              <MathText text={currentStepData.mathExplanation} />
            </div>
          </div>
        )}

        {/* KaTeX Formula Box if available */}
        {currentStepData.formulaLatex && (
          <div className="py-2 px-3 rounded-xl bg-[#F4EEE4] border border-[#E5DCCF] flex items-center justify-center overflow-x-auto">
            <MathFormula tex={currentStepData.formulaLatex} block />
          </div>
        )}

        {/* Step Observation Check (Interactive Confirmation) */}
        {currentStepData.observationCheck && (
          <div className="p-3 rounded-xl bg-orange-50/80 border border-orange-200 text-xs space-y-2">
            <p className="font-semibold text-orange-950 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-orange-600 shrink-0" />
              <span>{currentStepData.observationCheck.prompt}</span>
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setObservationConfirmed(true);
                  setShowObservationHint(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  observationConfirmed
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{currentStepData.observationCheck.yesText}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowObservationHint(!showObservationHint)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-orange-700 border border-orange-300 hover:bg-orange-50 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{currentStepData.observationCheck.noText}</span>
              </button>
            </div>

            {showObservationHint && (
              <p className="text-[11px] text-orange-900 bg-white p-2.5 rounded-lg border border-orange-200 animate-fadeIn">
                💡 <strong>Gợi ý:</strong> {currentStepData.observationCheck.hintText}
              </p>
            )}
          </div>
        )}

        {/* Step Micro-Quiz if available (Step 6) */}
        {currentStepData.quiz && (
          <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs space-y-3">
            <p className="font-bold text-amber-950 flex items-center gap-1.5 text-xs sm:text-sm">
              <Zap className="w-4 h-4 text-amber-600 shrink-0" />
              <MathText text={currentStepData.quiz.question} />
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentStepData.quiz.options.map((opt) => {
                const isSelected = selectedQuizOption === opt.id;
                let btnStyle = 'bg-white hover:bg-amber-100/50 border-amber-200 text-slate-800';
                if (quizSubmitted) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-600 text-white border-emerald-600 shadow-sm font-bold';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = 'bg-rose-500 text-white border-rose-500 font-bold';
                  } else {
                    btnStyle = 'bg-gray-100 text-gray-400 border-gray-200 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectQuizOption(opt.id)}
                    disabled={quizSubmitted}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${btnStyle}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-black/5 flex items-center justify-center font-bold text-[11px]">
                        {opt.id}
                      </span>
                      <span><MathText text={opt.text} /></span>
                    </span>
                    {quizSubmitted && opt.isCorrect && <Check className="w-4 h-4 text-white shrink-0" />}
                    {quizSubmitted && isSelected && !opt.isCorrect && <X className="w-4 h-4 text-white shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Quiz Feedback */}
            {quizSubmitted && selectedQuizOption && (
              <div
                className={`p-3 rounded-xl border text-xs leading-relaxed animate-fadeIn ${
                  currentStepData.quiz.options.find((o) => o.id === selectedQuizOption)?.isCorrect
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    : 'bg-rose-50 text-rose-900 border-rose-200'
                }`}
              >
                {currentStepData.quiz.options.find((o) => o.id === selectedQuizOption)?.feedback}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Controls: Previous, Restart & Next Step */}
      <div className="flex items-center justify-between gap-2.5 pt-2 border-t border-[#E5DCCF]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            id="btn-lesson-prev-step"
            onClick={onPrevStep}
            disabled={currentStep <= 1}
            className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer min-h-[38px] touch-manipulation flex items-center gap-1.5 ${
              currentStep <= 1
                ? 'opacity-40 bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                : 'bg-[#FAF7F2] hover:bg-[#F4EEE4] text-[#594D46] border-[#E5DCCF]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>LÙI LẠI</span>
          </button>

          <button
            type="button"
            id="btn-lesson-reset-step"
            onClick={onResetLesson}
            className="px-2.5 py-2 text-xs font-medium text-[#766A61] hover:text-[#3A302B] hover:bg-[#F4EEE4] rounded-xl border border-transparent hover:border-[#E5DCCF] transition-all cursor-pointer min-h-[38px] touch-manipulation flex items-center gap-1"
            title="Bắt đầu lại bài học từ đầu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Làm lại</span>
          </button>
        </div>

        <button
          type="button"
          id="btn-lesson-next-step"
          onClick={onNextStep}
          className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[38px] touch-manipulation flex items-center gap-2"
        >
          <span>{currentStep === totalSteps ? 'HOÀN THÀNH BÀI HỌC' : 'BƯỚC TIẾP THEO'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
