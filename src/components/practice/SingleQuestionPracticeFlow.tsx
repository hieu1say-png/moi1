/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - SINGLE-QUESTION RANDOM PRACTICE FLOW
 * - Module: LUYỆN TẬP TỪNG CÂU (1 Question at a time)
 * - Deterministic Question Selection without Repeats
 * - Multi-format Answer Inputs (MCQ, Numeric, True/False, Fill in Blank)
 * - Instant Grading & Misconception Diagnosis
 * - 4-Step Solution Timeline with Thầy Hiếu AI
 */

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { GeometryDataService } from '../../data';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { MathFormula, MathText, isValidDisplayFormula } from '../common/MathFormula';
import {
  Exercise,
  ExerciseType,
  MultipleChoiceExercise,
  TrueFalseExercise,
  NumericExercise,
  FillBlankExercise,
  DragDropExercise,
  ChallengeExercise,
  ShapeType,
  ExerciseDifficulty
} from '../../types/dataArchitecture';
import { AICorrectionCard } from './AICorrectionCard';
import {
  CheckSquare,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Timer,
  AlertTriangle,
  Flame,
  HelpCircle,
  Layers,
  Award,
  RotateCcw,
  BookOpen,
  Filter,
  Check,
  Zap,
  TrendingUp,
  Clock,
  ShieldCheck,
  Target,
  Shuffle,
  Dice5,
  GraduationCap
} from 'lucide-react';
import { useErrorMemoryStore } from '../../stores/useErrorMemoryStore';
import { ExamTrapRadarBadge } from './ExamTrapRadarBadge';
import { ErrorNotebookModal } from './ErrorNotebookModal';
import { getCachedUnifiedAssignmentBank, convertUnifiedToExercise } from '../../services/unifiedAssignmentService';
import { StudentQuizResponseEngine } from '../../services/studentQuizResponseEngine';

export interface SingleQuestionPracticeFlowProps {
  initialShapeFilter?: 'all' | ShapeType;
  initialDifficultyFilter?: 'all' | ExerciseDifficulty;
}

export const SingleQuestionPracticeFlow: React.FC<SingleQuestionPracticeFlowProps> = ({
  initialShapeFilter = 'all',
  initialDifficultyFilter = 'all'
}) => {
  const { markPracticeDone, recordAttempt, userStats } = useApp();
  const { showSuccess, showError, showInfo } = useToast();

  // Filters
  const [selectedShapeFilter, setSelectedShapeFilter] = useState<'all' | ShapeType>(initialShapeFilter);
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState<'all' | ExerciseDifficulty>(initialDifficultyFilter);

  // Session Statistics
  const [sessionCount, setSessionCount] = useState<number>(0);
  const [sessionCorrectCount, setSessionCorrectCount] = useState<number>(0);
  const [sessionStreak, setSessionStreak] = useState<number>(0);
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<string>>(new Set());

  // Current Question
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);

  // Interactive Inputs
  const [mcSelectedOption, setMcSelectedOption] = useState<number | null>(null);
  const [tfAnswers, setTfAnswers] = useState<Record<string, boolean | null>>({});
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [fillBlankAnswers, setFillBlankAnswers] = useState<Record<string, string>>({});
  const [dragMatches, setDragMatches] = useState<Record<string, string>>({});
  const [selectedDragItem, setSelectedDragItem] = useState<string | null>(null);
  const [challengeAnswers, setChallengeAnswers] = useState<Record<string, string | number>>({});

  // Submission & Feedback
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isSubmissionCorrect, setIsSubmissionCorrect] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showStepByStep, setShowStepByStep] = useState<boolean>(false);
  const [detectedCommonError, setDetectedCommonError] = useState<{ title: string; desc: string } | null>(null);

  // Time Tracker for current question
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Error Notebook Modal State
  const [isErrorNotebookOpen, setIsErrorNotebookOpen] = useState<boolean>(false);
  const { failedQuestions } = useErrorMemoryStore();
  const unresolvedErrorCount = useMemo(() => failedQuestions.filter((q) => !q.resolved).length, [failedQuestions]);

  // Unified Data bank (Single Source of Truth from masterQuestionBank.json)
  const unifiedBank = useMemo(() => getCachedUnifiedAssignmentBank(), []);

  // Pick Next Random Exercise
  const pickRandomExercise = useCallback(
    (shape = selectedShapeFilter, diff = selectedDifficultyFilter) => {
      let pool: MultipleChoiceExercise[] = [];

      // Filter from unified bank first
      const filteredUnified = unifiedBank.filter((q) => {
        const matchShape = shape === 'all' || q.shape === shape;
        const matchDiff = diff === 'all' || q.difficulty === diff;
        return matchShape && matchDiff;
      });

      const availableUnified = filteredUnified.filter((q) => !usedQuestionIds.has(q.id));
      const candidateUnified = availableUnified.length > 0 ? availableUnified : (filteredUnified.length > 0 ? filteredUnified : unifiedBank);

      if (candidateUnified.length > 0) {
        const randomIndex = Math.floor(Math.random() * candidateUnified.length);
        pool = [convertUnifiedToExercise(candidateUnified[randomIndex])];
      } else {
        const fallbackList = unifiedBank.length > 0 ? unifiedBank : [];
        const randomIndex = Math.floor(Math.random() * fallbackList.length);
        pool = [convertUnifiedToExercise(fallbackList[randomIndex])];
      }

      const nextQ = pool[0];
      setCurrentExercise(nextQ);
      setUsedQuestionIds((prev) => new Set(prev).add(nextQ.id));

      // Reset interactive answer states
      setMcSelectedOption(null);
      setTfAnswers({});
      setNumericAnswer('');
      setFillBlankAnswers({});
      setDragMatches({});
      setSelectedDragItem(null);
      setChallengeAnswers({});
      setHasSubmitted(false);
      setIsSubmissionCorrect(false);
      setShowHint(false);
      setShowStepByStep(false);
      setDetectedCommonError(null);
      setTimeSpent(0);
    },
    [selectedShapeFilter, selectedDifficultyFilter, usedQuestionIds, unifiedBank]
  );

  // Initialize first question
  useEffect(() => {
    if (!currentExercise) {
      pickRandomExercise(selectedShapeFilter, selectedDifficultyFilter);
    }
  }, [currentExercise, pickRandomExercise, selectedShapeFilter, selectedDifficultyFilter]);

  // Question Timer
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (!hasSubmitted && currentExercise) {
      timerRef.current = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasSubmitted, currentExercise?.id]);

  const resetInteractiveState = () => {
    setMcSelectedOption(null);
    setTfAnswers({});
    setNumericAnswer('');
    setFillBlankAnswers({});
    setDragMatches({});
    setSelectedDragItem(null);
    setChallengeAnswers({});
    setHasSubmitted(false);
    setIsSubmissionCorrect(false);
    setShowHint(false);
    setShowStepByStep(false);
    setDetectedCommonError(null);
    setTimeSpent(0);
  };

  // Phase 13: Luyện câu tương tự cùng dạng / cùng mức độ
  const handlePracticeSimilar = useCallback(() => {
    if (!currentExercise) {
      pickRandomExercise();
      return;
    }

    const currentShape = currentExercise.shapeId;
    const currentDiff = currentExercise.difficulty;

    // Search unified question bank for a sibling question of the same shape and difficulty
    const exactCandidates = unifiedBank.filter(
      (q) => q.id !== currentExercise.id && q.shape === currentShape && q.difficulty === currentDiff
    );

    const shapeCandidates = unifiedBank.filter(
      (q) => q.id !== currentExercise.id && q.shape === currentShape
    );

    const targetPool = exactCandidates.length > 0 ? exactCandidates : (shapeCandidates.length > 0 ? shapeCandidates : unifiedBank);
    if (targetPool.length > 0) {
      const selected = targetPool[Math.floor(Math.random() * targetPool.length)];
      setUsedQuestionIds((prev) => new Set(prev).add(selected.id));
      resetInteractiveState();
      setCurrentExercise(convertUnifiedToExercise(selected));
      showInfo('Đã tải câu hỏi tương tự', `Dạng bài: ${selected.archetypeName || selected.topicLabel} (${selected.difficultyLabel || 'Cùng mức độ'})`);
    } else {
      pickRandomExercise(currentShape === 'mixed' ? 'all' : (currentShape as ShapeType), currentDiff);
    }
  }, [currentExercise, unifiedBank, pickRandomExercise, showInfo]);

  // Submit and Evaluate
  const handleSubmit = () => {
    if (!currentExercise || hasSubmitted) return;

    let correct = false;
    let errorDiagnosis: { title: string; desc: string } | null = null;
    const studentAns =
      mcSelectedOption !== null
        ? mcSelectedOption
        : numericAnswer || tfAnswers || fillBlankAnswers || dragMatches || challengeAnswers;

    if (currentExercise.type === 'multiple_choice') {
      const mcEx = currentExercise as MultipleChoiceExercise;
      if (mcSelectedOption === null) {
        showInfo('Chưa chọn đáp án', 'Vui lòng chọn một phương án A, B, C hoặc D trước khi gửi bài.');
        return;
      }
      correct = mcSelectedOption === mcEx.correctOptionIndex;
      if (!correct) {
        if (mcEx.shapeId === 'cone' && mcSelectedOption === 2) {
          errorDiagnosis = {
            title: 'Nhầm lẫn đường sinh l với chiều cao h',
            desc: 'Trong công thức diện tích xung quanh của hình nón Sxq = πrl, phải dùng đường sinh l chứ không dùng h!'
          };
        } else if (mcEx.shapeId === 'cylinder') {
          errorDiagnosis = {
            title: 'Quên nhân hệ số 2 trong chu vi đáy',
            desc: 'Chu vi đáy hình trụ là 2πr (hoặc πd). Chú ý kiểm tra xem đề bài cho bán kính r hay đường kính d!'
          };
        } else {
          errorDiagnosis = {
            title: 'Tính toán sai số học hoặc chọn nhầm công thức',
            desc: 'Hãy đối chiếu lại các đại lượng đã cho trong đề bài và công thức chuẩn của hình.'
          };
        }
      }
    } else if (currentExercise.type === 'numeric') {
      const numEx = currentExercise as NumericExercise;
      const val = parseFloat(numericAnswer.replace(',', '.').trim());
      if (isNaN(val)) {
        showInfo('Số không hợp lệ', 'Vui lòng nhập một giá trị số hợp lệ (ví dụ: 12.5 hoặc 36).');
        return;
      }
      const tolerance = numEx.tolerance || 0.1;
      correct = Math.abs(val - numEx.expectedNumber) <= tolerance;
      if (!correct) {
        if (numEx.shapeId === 'cone' && Math.abs(val - numEx.expectedNumber * 3) <= tolerance * 3) {
          errorDiagnosis = {
            title: 'Quên nhân hệ số 1/3 khi tính thể tích hình nón',
            desc: 'Thể tích hình nón là V = 1/3 πr²h. Bạn đã tính ra thể tích của cả khối trụ!'
          };
        } else if (Math.abs(val - numEx.expectedNumber * 4) <= tolerance * 4) {
          errorDiagnosis = {
            title: 'Nhầm lẫn đường kính và bán kính (r vs d)',
            desc: 'Khi tính diện tích hoặc thể tích có r², nếu lấy nhầm đường kính thì kết quả sẽ bị phóng đại gấp 4 lần.'
          };
        } else {
          errorDiagnosis = {
            title: 'Sai lệch giá trị tính toán hoặc làm tròn số',
            desc: `Giá trị bạn nhập: ${val}, kết quả mong đợi: ${numEx.expectedNumber} (cho phép sai số ±${tolerance}).`
          };
        }
      }
    } else if (currentExercise.type === 'true_false') {
      const tfEx = currentExercise as TrueFalseExercise;
      const allAnswered = tfEx.statements.every((s) => tfAnswers[s.id] !== undefined && tfAnswers[s.id] !== null);
      if (!allAnswered) {
        showInfo('Chưa trả lời đủ', 'Vui lòng đánh dấu Đúng/Sai cho tất cả các mệnh đề.');
        return;
      }
      correct = tfEx.statements.every((s) => tfAnswers[s.id] === s.isTrue);
      if (!correct) {
        errorDiagnosis = {
          title: 'Nhầm lẫn tính chất thiết diện hoặc định lý',
          desc: 'Chú ý: Cắt hình trụ song song trục tạo hình chữ nhật, thể tích nón bằng 1/3 trụ, và đường sinh nón luôn lớn hơn chiều cao.'
        };
      }
    } else if (currentExercise.type === 'fill_blank') {
      const fbEx = currentExercise as FillBlankExercise;
      const allBlanksFilled = fbEx.blanks.every((b) => fillBlankAnswers[b.id]?.trim());
      if (!allBlanksFilled) {
        showInfo('Chưa điền đủ', 'Vui lòng điền vào tất cả các ô trống.');
        return;
      }
      correct = fbEx.blanks.every((b) => {
        const userAns = (fillBlankAnswers[b.id] || '').trim().toLowerCase().replace(/\s+/g, '');
        return b.acceptedAnswers.some((acc) => acc.toLowerCase().replace(/\s+/g, '') === userAns);
      });
      if (!correct) {
        errorDiagnosis = {
          title: 'Chưa chính xác công thức toán học',
          desc: 'Hãy chú ý các ký hiệu như π, số mũ bình phương ^2, lập phương ^3 hoặc tỉ số phân số.'
        };
      }
    } else {
      correct = true;
    }

    setHasSubmitted(true);
    setIsSubmissionCorrect(correct);
    setDetectedCommonError(errorDiagnosis);

    // Update Session Metrics
    setSessionCount((prev) => prev + 1);
    if (correct) {
      setSessionCorrectCount((prev) => prev + 1);
      setSessionStreak((prev) => prev + 1);
    } else {
      setSessionStreak(0);
    }

    // Save Attempt
    const attemptRecord = {
      id: `att-${Date.now()}`,
      exerciseId: currentExercise.id,
      shapeId: currentExercise.shapeId,
      exerciseType: currentExercise.type,
      difficulty: currentExercise.difficulty,
      timestamp: new Date().toISOString(),
      timeSpentSeconds: timeSpent,
      isCorrect: correct,
      scoreAwarded: correct ? currentExercise.pointsXp : 0,
      answerGiven: studentAns,
      commonErrorTitle: errorDiagnosis?.title,
      commonErrorDesc: errorDiagnosis?.desc
    };
    recordAttempt(attemptRecord);

    // Store Synchronization
    const hintLevelUsed = showStepByStep ? 4 : showHint ? 2 : 1;
    if (correct) {
      markPracticeDone(currentExercise.id, currentExercise.pointsXp);
      const successResult = useErrorMemoryStore.getState().recordSuccess({
        activityId: `practice-${currentExercise.id}`,
        questionId: currentExercise.id,
        shape: currentExercise.shapeId,
        hintLevelUsed,
        timeSpent
      });
      showSuccess('ĐÚNG!', 'Bạn đã trả lời chính xác! Hãy đọc kỹ lời giải chi tiết và mẹo làm bài bên dưới.');
    } else {
      const errorResult = useErrorMemoryStore.getState().recordError({
        activityId: `practice-${currentExercise.id}`,
        questionId: currentExercise.id,
        shape: currentExercise.shapeId,
        errorType: errorDiagnosis?.title || 'CALCULATION_ERROR',
        conceptTitle: errorDiagnosis?.title,
        description: errorDiagnosis?.desc || currentExercise.explanation,
        userAnswer: studentAns,
        expectedAnswer: currentExercise.explanation,
        hintLevelUsed
      });

      // Construct options array for MCQ
      let optionsList: { id: string; text: string }[] = [];
      let correctIdx = 0;
      if (currentExercise.type === 'multiple_choice') {
        const mc = currentExercise as MultipleChoiceExercise;
        optionsList = mc.options.map((opt, i) => ({ id: `opt-${i}`, text: opt }));
        correctIdx = mc.correctOptionIndex;
      } else {
        optionsList = [{ id: 'opt-0', text: currentExercise.explanation }];
      }

      // Add to Spaced Repetition Error Notebook
      useErrorMemoryStore.getState().addFailedQuestion({
        questionId: currentExercise.id,
        shape: currentExercise.shapeId === 'mixed' ? 'cylinder' : currentExercise.shapeId,
        questionText: currentExercise.question,
        options: optionsList,
        correctOptionIndex: correctIdx,
        lastUserAnswer: typeof studentAns === 'number' ? studentAns : 0,
        explanation: currentExercise.explanation,
        errorType: errorDiagnosis?.title || 'CALCULATION_ERROR',
        fourStepSolution: {
          step1Summary: `Đề bài cho dạng hình ${currentExercise.shapeId === 'cylinder' ? 'Trụ' : currentExercise.shapeId === 'cone' ? 'Nón' : 'Cầu'} với các thông số kích thước hình học.`,
          step2Strategy: 'Xác định đúng đại lượng (bán kính r, chiều cao h, đường sinh l) và áp dụng đúng công thức chuẩn.',
          step3KaTeX: currentExercise.explanation,
          step4TrapWarning: errorDiagnosis?.desc || 'Cẩn thận bẫy đường kính d vs bán kính r, quy đổi đơn vị và hệ số thể tích.'
        }
      });

      showError('CHƯA ĐÚNG!', 'Đừng lo lắng! Hãy xem các bước giải chi tiết và chẩn đoán bẫy sai lầm của Thầy Hiếu để nắm vững phương pháp.');
    }
  };

  const sessionAccuracy = sessionCount > 0 ? Math.round((sessionCorrectCount / sessionCount) * 100) : 0;

  return (
    <div id="single-question-practice-flow" className="space-y-5">
      {/* 1. Filter Pills & Random Selection Controls */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Topic Selectors */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-orange-500" />
              Chủ đề:
            </span>

            {[
              { id: 'all', label: 'Tất cả khối hình' },
              { id: 'cylinder', label: 'Hình Trụ' },
              { id: 'cone', label: 'Hình Nón' },
              { id: 'sphere', label: 'Hình Cầu' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedShapeFilter(item.id as any);
                  pickRandomExercise(item.id as any, selectedDifficultyFilter);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  selectedShapeFilter === item.id
                    ? 'bg-orange-500 border-orange-600 text-white shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Quick Random Action & Error Notebook */}
          <div className="flex items-center gap-2 self-end md:self-auto flex-wrap">
            <button
              onClick={() => setIsErrorNotebookOpen(true)}
              className="px-3 py-1.5 rounded-xl border border-red-300 bg-red-50 hover:bg-red-100 text-red-900 font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-red-600" />
              <span>Sổ Tay Lỗ Hổng</span>
              {unresolvedErrorCount > 0 && (
                <span className="px-1.5 py-0.2 bg-red-600 text-white rounded-full text-[10px] font-black">
                  {unresolvedErrorCount}
                </span>
              )}
            </button>

            <Button
              variant="outline"
              shape="pill"
              size="sm"
              onClick={() => pickRandomExercise()}
              leftIcon={<Dice5 className="w-4 h-4 text-orange-500" />}
              className="font-bold text-xs"
            >
              Đổi câu ngẫu nhiên khác
            </Button>
          </div>
        </div>

        {/* Live Session Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between px-3">
            <span className="text-slate-500 font-medium">Đã làm phiên này:</span>
            <span className="font-bold text-slate-900">{sessionCount} câu</span>
          </div>
          <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between px-3">
            <span className="text-emerald-700 font-medium">Đúng:</span>
            <span className="font-bold text-emerald-800">
              {sessionCorrectCount}/{sessionCount} ({sessionAccuracy}%)
            </span>
          </div>
          <div className="p-2 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-between px-3">
            <span className="text-orange-700 font-medium">Chuỗi đúng:</span>
            <span className="font-bold text-orange-800 flex items-center gap-0.5">
              <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              {sessionStreak} 🔥
            </span>
          </div>
          <div className="p-2 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-between px-3">
            <span className="text-violet-700 font-medium">Tổng XP:</span>
            <span className="font-bold text-violet-800 flex items-center gap-0.5">
              <Sparkles className="w-3.5 h-3.5 text-violet-600" />
              {userStats.xp} XP
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Question Card */}
      {currentExercise && (
        <div className="space-y-5">
          <Card className="p-5 sm:p-7 bg-white space-y-6 shadow-xs border border-slate-200">
            {/* Header: Badges & Timer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5 flex-wrap">
                <Badge variant={currentExercise.shapeId} size="sm">
                  {currentExercise.shapeId === 'cylinder'
                    ? 'Hình Trụ'
                    : currentExercise.shapeId === 'cone'
                    ? 'Hình Nón'
                    : currentExercise.shapeId === 'sphere'
                    ? 'Hình Cầu'
                    : 'Tổng Hợp'}
                </Badge>

                <Badge
                  variant={
                    currentExercise.difficulty === 'easy'
                      ? 'success'
                      : currentExercise.difficulty === 'medium'
                      ? 'warning'
                      : 'danger'
                  }
                  size="sm"
                >
                  {currentExercise.difficulty === 'easy'
                    ? 'Nhận biết'
                    : currentExercise.difficulty === 'medium'
                    ? 'Thông hiểu'
                    : currentExercise.difficulty === 'hard'
                    ? 'Vận dụng'
                    : 'Vận dụng cao'}
                </Badge>

                <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                  Mã: {currentExercise.id}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600 font-bold">
                  <Timer className="w-3.5 h-3.5 text-slate-400" />
                  <span>{timeSpent}s</span>
                </div>

                <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>+{currentExercise.pointsXp} XP</span>
                </div>
              </div>
            </div>

            {/* Question Statement */}
            <div className="space-y-3 text-left">
              <h3 className="text-sm sm:text-base font-bold text-slate-700 leading-snug">
                {currentExercise.title}
              </h3>
              <div className="gl-question-text text-slate-900 leading-relaxed">
                <MathText text={currentExercise.question} />
              </div>

              {isValidDisplayFormula(currentExercise.latexEquation) && (
                <div className="gl-formula-box font-mono text-sm sm:text-base text-slate-900 text-center">
                  <MathFormula formula={currentExercise.latexEquation} displayMode={true} />
                </div>
              )}

              {/* Exam Trap Radar Badge */}
              <ExamTrapRadarBadge
                questionText={currentExercise.question}
                shape={currentExercise.shapeId}
                errorType={detectedCommonError?.title}
              />
            </div>

            {/* Interactive Inputs */}
            <div className="pt-2">
              {/* MCQ Options */}
              {currentExercise.type === 'multiple_choice' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(currentExercise as MultipleChoiceExercise).options.map((opt, idx) => {
                    const letters = ['A', 'B', 'C', 'D'];
                    const letter = letters[idx];
                    const isSelected = mcSelectedOption === idx;
                    const isCorrectOption = idx === (currentExercise as MultipleChoiceExercise).correctOptionIndex;

                    let cardStyle = 'bg-white border-slate-200 text-slate-800 hover:border-orange-300 hover:bg-orange-50/40';

                    if (isSelected && !hasSubmitted) {
                      cardStyle = 'bg-orange-50 border-orange-500 text-orange-950 font-bold shadow-2xs';
                    } else if (hasSubmitted) {
                      if (isCorrectOption) {
                        cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                      } else if (isSelected && !isCorrectOption) {
                        cardStyle = 'bg-rose-50 border-rose-500 text-rose-950 font-bold';
                      } else {
                        cardStyle = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={hasSubmitted}
                        onClick={() => setMcSelectedOption(idx)}
                        className={`p-3.5 sm:p-4 rounded-2xl border text-left flex items-center gap-3.5 transition-all cursor-pointer min-h-[56px] w-full select-none ${cardStyle}`}
                      >
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl font-bold flex items-center justify-center shrink-0 text-xs sm:text-sm ${
                            isSelected
                              ? 'bg-orange-500 text-white'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {letter}
                        </div>
                        <div className="flex-1 gl-option-text font-medium">
                          <MathText text={opt} />
                        </div>
                        {hasSubmitted && isCorrectOption && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {hasSubmitted && isSelected && !isCorrectOption && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Numeric Input */}
              {currentExercise.type === 'numeric' && (
                <div className="space-y-3 max-w-lg">
                  <label className="text-xs sm:text-sm font-bold text-slate-700 block">
                    Nhập kết quả tính toán số học ({currentExercise.unit || 'cm'}):
                  </label>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="text"
                      disabled={hasSubmitted}
                      placeholder={currentExercise.placeholder || 'Nhập kết quả số (VD: 12.5 hoặc 36)...'}
                      value={numericAnswer}
                      onChange={(e) => setNumericAnswer(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !hasSubmitted) handleSubmit();
                      }}
                      className="flex-1 px-4 py-3 rounded-2xl border border-slate-300 text-sm sm:text-base font-mono focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white shadow-2xs"
                    />
                    {currentExercise.unit && (
                      <span className="px-3.5 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-xs sm:text-sm font-bold text-slate-700">
                        {currentExercise.unit}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* True / False */}
              {currentExercise.type === 'true_false' && (
                <div className="space-y-3">
                  {(currentExercise as TrueFalseExercise).statements.map((st) => {
                    const currentVal = tfAnswers[st.id];
                    return (
                      <div
                        key={st.id}
                        className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5"
                      >
                        <div className="gl-option-text font-medium flex-1">
                          <MathText text={st.statement} />
                        </div>
                        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                          <button
                            disabled={hasSubmitted}
                            onClick={() => setTfAnswers((prev) => ({ ...prev, [st.id]: true }))}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                              currentVal === true
                                ? 'bg-emerald-500 border-emerald-600 text-white shadow-2xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-emerald-50'
                            }`}
                          >
                            ✓ Đúng
                          </button>
                          <button
                            disabled={hasSubmitted}
                            onClick={() => setTfAnswers((prev) => ({ ...prev, [st.id]: false }))}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                              currentVal === false
                                ? 'bg-rose-500 border-rose-600 text-white shadow-2xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-rose-50'
                            }`}
                          >
                            ✗ Sai
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Fill in Blank */}
              {currentExercise.type === 'fill_blank' && (
                <div className="space-y-3">
                  <div className="gl-question-text font-medium text-slate-800">
                    <MathText text={(currentExercise as FillBlankExercise).template} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {(currentExercise as FillBlankExercise).blanks.map((b, idx) => (
                      <div key={b.id} className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">
                          {(b as any).label || b.placeholder || `Ô trống ${idx + 1}`}:
                        </label>
                        <input
                          type="text"
                          disabled={hasSubmitted}
                          placeholder={b.placeholder || 'Nhập câu trả lời...'}
                          value={fillBlankAnswers[b.id] || ''}
                          onChange={(e) =>
                            setFillBlankAnswers((prev) => ({ ...prev, [b.id]: e.target.value }))
                          }
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                {currentExercise.hint && (
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="px-3 py-2 rounded-xl border border-amber-200 bg-amber-50 text-amber-800 text-xs font-bold hover:bg-amber-100 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>{showHint ? 'Ẩn gợi ý' : 'Gợi ý giải bài'}</span>
                  </button>
                )}

                {hasSubmitted && 'stepByStepGuide' in currentExercise && (
                  <button
                    onClick={() => setShowStepByStep(!showStepByStep)}
                    className="px-3 py-2 rounded-xl border border-blue-200 bg-blue-50 text-blue-800 text-xs font-bold hover:bg-blue-100 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>{showStepByStep ? 'Ẩn các bước' : 'Xem cấu trúc bước giải'}</span>
                  </button>
                )}
              </div>

              <div>
                {!hasSubmitted ? (
                  <Button
                    variant="primary"
                    shape="pill"
                    size="md"
                    onClick={handleSubmit}
                    rightIcon={<Check className="w-4 h-4" />}
                    className="font-bold min-h-[44px] bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Gửi Đáp Án & Kiểm Tra
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    <Button
                      variant="outline"
                      shape="pill"
                      size="md"
                      onClick={resetInteractiveState}
                      leftIcon={<RotateCcw className="w-4 h-4" />}
                      className="text-xs sm:text-sm font-semibold"
                    >
                      Làm lại câu này
                    </Button>
                    <Button
                      variant="outline"
                      shape="pill"
                      size="md"
                      onClick={handlePracticeSimilar}
                      leftIcon={<Shuffle className="w-4 h-4 text-emerald-600" />}
                      className="font-bold text-xs sm:text-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300 shadow-xs cursor-pointer"
                    >
                      Luyện câu tương tự 🎯
                    </Button>
                    <Button
                      variant="primary"
                      shape="pill"
                      size="md"
                      onClick={() => pickRandomExercise()}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      className="font-bold text-xs sm:text-sm bg-[#16A34A] hover:bg-[#15803D] text-white shadow-xs cursor-pointer"
                    >
                      Câu Tiếp Theo →
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Hint Box Content */}
            {showHint && currentExercise.hint && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1 text-left">
                <span className="font-bold flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  Gợi ý phương pháp:
                </span>
                <div>
                  <MathText text={currentExercise.hint} />
                </div>
              </div>
            )}
          </Card>

          {/* AI Thầy Hiếu 4-Step Solution Timeline & Feedback */}
          {hasSubmitted && (
            <AICorrectionCard
              exercise={currentExercise}
              userAnswer={
                mcSelectedOption !== null
                  ? mcSelectedOption
                  : numericAnswer || tfAnswers || fillBlankAnswers || dragMatches || challengeAnswers
              }
              isCorrect={isSubmissionCorrect}
              timeSpent={timeSpent}
              detectedError={detectedCommonError}
              onRetry={resetInteractiveState}
              onNext={() => pickRandomExercise()}
              onPracticeSimilar={handlePracticeSimilar}
            />
          )}
        </div>
      )}

      {/* Spaced Repetition Error Notebook Modal */}
      <ErrorNotebookModal
        isOpen={isErrorNotebookOpen}
        onClose={() => setIsErrorNotebookOpen(false)}
      />
    </div>
  );
};
