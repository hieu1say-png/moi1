/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - EXAM PREP VIEW (PHÒNG THI THỬ VÀO 10 CHUẨN HÓA)
 * Complete Mock Exam Architecture with 10-Question Master Blueprint,
 * 30-Minute Timer, Archetype Uniqueness, State Machine, KaTeX Math,
 * Pedagogical 4-Step Review, AI Error Analysis, and Adaptive Weights.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import {
  ExamEngine,
  ExamSessionState,
  ExamPhase,
  ExamGradingResult,
  ExamQuestionItem,
  StudentQuestionAnswer
} from '../services/examEngine';
import { AdaptiveExamService, StudentMasteryProfile } from '../services/adaptiveExamService';
import { ExamIntroCard } from '../components/exam/ExamIntroCard';
import { ExamHeaderTimer } from '../components/exam/ExamHeaderTimer';
import { ExamSubmitConfirmModal } from '../components/exam/ExamSubmitConfirmModal';
import { ExamResultReviewCard } from '../components/exam/ExamResultReviewCard';
import { ExamHistoryModal } from '../components/exam/ExamHistoryModal';
import { UniversalQuestionRenderer } from '../components/question-renderers';

export const ExamPrepView: React.FC = () => {
  const { settings, markPracticeDone } = useApp();
  const { showSuccess, showInfo, showError } = useToast();

  // Active Session & Phase
  const [session, setSession] = useState<ExamSessionState | null>(null);
  const [examPhase, setExamPhase] = useState<ExamPhase>('INTRO');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(1800);

  // Latest Grading Result for Review
  const [gradingResult, setGradingResult] = useState<ExamGradingResult | null>(null);

  // Confirmation Modal & History Modal
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [historyList, setHistoryList] = useState<ExamGradingResult[]>([]);

  // Mastery Profile
  const [masteryProfile, setMasteryProfile] = useState<StudentMasteryProfile>(() =>
    AdaptiveExamService.getMasteryProfile()
  );

  // Timer Ref
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initial Load & Session Recovery (Strict Reload / Resume)
  useEffect(() => {
    const existingSession = ExamEngine.getActiveSession();
    const history = ExamEngine.getExamHistory();
    setHistoryList(history);
    setMasteryProfile(AdaptiveExamService.getMasteryProfile());

    if (existingSession) {
      const now = Date.now();
      if (existingSession.examPhase === 'PLAYING') {
        if (now >= existingSession.endAt) {
          // Timeout during offline or reload -> Auto Grade
          const res = ExamEngine.gradeExam(existingSession, 'TIMEOUT');
          setSession(existingSession);
          setGradingResult(res);
          setExamPhase('REVIEW');
          showInfo('Hết thời gian làm bài. Hệ thống đã tự động nộp bài và chấm điểm.');
        } else {
          // Resume active exam
          setSession(existingSession);
          setCurrentIndex(existingSession.currentQuestionIndex || 0);
          setExamPhase('PLAYING');
          const rem = Math.max(0, Math.floor((existingSession.endAt - now) / 1000));
          setRemainingSeconds(rem);
        }
      } else if (existingSession.examPhase === 'REVIEW') {
        setSession(existingSession);
        const lastAttempt = history.find((h) => h.examSessionId === existingSession.examSessionId) || history[0];
        if (lastAttempt) {
          setGradingResult(lastAttempt);
        }
        setExamPhase('REVIEW');
      }
    }
  }, []);

  // 2. Countdown Timer Loop (Source of truth: session.endAt)
  useEffect(() => {
    if (examPhase !== 'PLAYING' || !session) {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const rem = Math.max(0, Math.floor((session.endAt - now) / 1000));
      setRemainingSeconds(rem);

      if (rem <= 0) {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        handleAutoSubmitTimeout();
      }
    };

    updateTimer();
    timerIntervalRef.current = setInterval(updateTimer, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [examPhase, session]);

  // 3. Auto-Submit on Timeout
  const handleAutoSubmitTimeout = useCallback(() => {
    if (!session || examPhase !== 'PLAYING') return;

    setExamPhase('SUBMITTING');
    const res = ExamEngine.gradeExam(session, 'TIMEOUT');
    setGradingResult(res);
    setExamPhase('REVIEW');
    setHistoryList(ExamEngine.getExamHistory());
    setMasteryProfile(AdaptiveExamService.getMasteryProfile());
    showInfo('Hết giờ làm bài! Bài thi của em đã được nộp tự động.');
  }, [session, examPhase, showInfo]);

  // 4. Start Exam Trigger
  const handleStartExam = () => {
    const seed = Date.now();
    const studentId = settings.studentName.replace(/\s+/g, '-').toLowerCase() || 'student-01';
    const studentName = settings.studentName || 'Học sinh';

    const adaptiveWeights = AdaptiveExamService.getAdaptiveWeights();
    const newSession = ExamEngine.generateExam(seed, studentId, studentName, adaptiveWeights);

    setSession(newSession);
    setCurrentIndex(0);
    setRemainingSeconds(newSession.durationSeconds);
    setExamPhase('PLAYING');
    showSuccess('Bắt đầu bài thi thử 30 phút! Chúc em làm bài thật tốt.');
  };

  // 5. Answer Change Handler with Autosave
  const handleAnswerChange = (qId: string, value: any, type: any) => {
    if (!session || examPhase !== 'PLAYING') return;

    const newAnswer: StudentQuestionAnswer = {
      questionId: qId,
      type: type || 'MCQ',
      value,
      answeredAt: Date.now()
    };

    const nextStudentAnswers = {
      ...session.studentAnswers,
      [qId]: newAnswer
    };

    const updatedSession: ExamSessionState = {
      ...session,
      studentAnswers: nextStudentAnswers,
      lastSavedAt: Date.now()
    };

    setSession(updatedSession);
    ExamEngine.saveActiveSession(updatedSession);
  };

  // 6. Question Flagging Toggle
  const handleToggleFlag = (qId: string) => {
    if (!session || examPhase !== 'PLAYING') return;

    const currentFlags = session.flaggedQuestionIds || [];
    const nextFlags = currentFlags.includes(qId)
      ? currentFlags.filter((id) => id !== qId)
      : [...currentFlags, qId];

    const updatedSession: ExamSessionState = {
      ...session,
      flaggedQuestionIds: nextFlags,
      lastSavedAt: Date.now()
    };

    setSession(updatedSession);
    ExamEngine.saveActiveSession(updatedSession);
  };

  // 7. Manual Submit Flow
  const handleRequestSubmit = () => {
    setIsSubmitModalOpen(true);
  };

  const handleConfirmSubmit = () => {
    if (!session || examPhase !== 'PLAYING') return;

    setIsSubmitModalOpen(false);
    setExamPhase('SUBMITTING');

    const res = ExamEngine.gradeExam(session, 'MANUAL');
    setGradingResult(res);
    setExamPhase('REVIEW');
    setHistoryList(ExamEngine.getExamHistory());
    setMasteryProfile(AdaptiveExamService.getMasteryProfile());

    // Award XP
    if (res.score >= 5.0) {
      markPracticeDone(`exam-attempt-${res.attemptId}`, Math.round(res.score * 10));
    }

    showSuccess(`Đã nộp bài thành công! Điểm số: ${res.score}/10.0`);
  };

  // 8. Retake Exam
  const handleRetakeExam = () => {
    ExamEngine.clearActiveSession();
    handleStartExam();
  };

  const currentQuestion = session?.questions[currentIndex];
  const currentAnswer = currentQuestion ? session?.studentAnswers[currentQuestion.id]?.value : undefined;
  const isCurrentFlagged = currentQuestion ? session?.flaggedQuestionIds.includes(currentQuestion.id) : false;

  // Unanswered count for confirmation modal
  const unansweredCount = session
    ? session.questions.filter((q) => {
        const ans = session.studentAnswers[q.id];
        if (!ans || ans.value === undefined || ans.value === null) return true;
        if (typeof ans.value === 'string') return ans.value.trim() === '';
        if (typeof ans.value === 'object') return Object.keys(ans.value).length === 0;
        return false;
      }).length
    : 0;

  return (
    <div id="exam-prep-master-view" className="space-y-6 pb-20 max-w-5xl mx-auto px-3 sm:px-6">
      {/* 1. INTRO PHASE */}
      {examPhase === 'INTRO' && (
        <ExamIntroCard
          studentName={settings.studentName}
          className={settings.className}
          masteryProfile={masteryProfile}
          onStartExam={handleStartExam}
          onViewHistory={() => setIsHistoryModalOpen(true)}
        />
      )}

      {/* 2. PLAYING PHASE (Live Mock Exam Room) */}
      {examPhase === 'PLAYING' && session && currentQuestion && (
        <div className="space-y-5">
          {/* Header & Sticky Timer */}
          <ExamHeaderTimer
            remainingSeconds={remainingSeconds}
            totalQuestions={session.questions.length}
            currentIndex={currentIndex}
            questions={session.questions}
            studentAnswers={session.studentAnswers}
            flaggedQuestionIds={session.flaggedQuestionIds}
            isFlagged={isCurrentFlagged || false}
            onSelectIndex={(idx) => {
              setCurrentIndex(idx);
              const updatedSession = { ...session, currentQuestionIndex: idx };
              setSession(updatedSession);
              ExamEngine.saveActiveSession(updatedSession);
            }}
            onToggleFlag={() => handleToggleFlag(currentQuestion.id)}
            onPrevious={() => {
              if (currentIndex > 0) {
                const nextIdx = currentIndex - 1;
                setCurrentIndex(nextIdx);
                const updatedSession = { ...session, currentQuestionIndex: nextIdx };
                setSession(updatedSession);
                ExamEngine.saveActiveSession(updatedSession);
              }
            }}
            onNext={() => {
              if (currentIndex < session.questions.length - 1) {
                const nextIdx = currentIndex + 1;
                setCurrentIndex(nextIdx);
                const updatedSession = { ...session, currentQuestionIndex: nextIdx };
                setSession(updatedSession);
                ExamEngine.saveActiveSession(updatedSession);
              }
            }}
            onRequestSubmit={handleRequestSubmit}
          />

          {/* Active Question Canvas Card */}
          <div className="bg-white rounded-lg p-6 sm:p-8 border-3 border-black shadow-neo space-y-5">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded bg-[#FF6B00] text-white font-black text-xs border border-black">
                  CÂU {currentIndex + 1}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#FFF9E6] text-black text-xs font-bold border border-black">
                  {currentQuestion.topicLabel} • Cấp độ: {currentQuestion.difficultyLabel}
                </span>
              </div>

              <div className="text-xs font-black text-black">
                1.0 Điểm
              </div>
            </div>

            {/* Question Renderer enforcing UI Contract */}
            <UniversalQuestionRenderer
              question={currentQuestion}
              value={currentAnswer}
              onChange={(val) => handleAnswerChange(currentQuestion.id, val, currentQuestion.questionType)}
              showPromptHeader={true}
              indexNumber={currentIndex + 1}
            />
          </div>

          {/* Manual Submit Confirmation Modal */}
          <ExamSubmitConfirmModal
            isOpen={isSubmitModalOpen}
            unansweredCount={unansweredCount}
            totalQuestions={session.questions.length}
            onClose={() => setIsSubmitModalOpen(false)}
            onConfirmSubmit={handleConfirmSubmit}
          />
        </div>
      )}

      {/* 3. REVIEW PHASE (4-Step Solutions & AI Error Diagnostics) */}
      {examPhase === 'REVIEW' && gradingResult && session && (
        <ExamResultReviewCard
          gradingResult={gradingResult}
          questions={session.questions}
          flaggedQuestionIds={session.flaggedQuestionIds}
          onRetakeExam={handleRetakeExam}
          onViewHistory={() => setIsHistoryModalOpen(true)}
        />
      )}

      {/* 4. Exam History Modal */}
      <ExamHistoryModal
        isOpen={isHistoryModalOpen}
        history={historyList}
        onClose={() => setIsHistoryModalOpen(false)}
        onRetake={handleRetakeExam}
      />
    </div>
  );
};
