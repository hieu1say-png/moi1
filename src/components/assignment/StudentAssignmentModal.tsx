/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - STUDENT ASSIGNMENT MODAL (Học sinh làm & Nộp bài tập được giao)
 * Features:
 * 1. Initial "BÀI TẬP MỚI" Overview Card (Tiêu đề, Số câu, Hạn nộp, XP, [LÀM BÀI])
 * 2. Deterministic question loading via assignmentSeed / questionIds without answer leakage.
 * 3. Post-submission pedagogical 4-step review.
 */

import React, { useState, useMemo } from 'react';
import { Assignment, Exercise, SubmissionAnswer } from '../../types/dataArchitecture';
import { TeacherService } from '../../services/teacherService';
import { Button } from '../common/Button';
import { MathFormula, MathText } from '../common/MathFormula';
import {
  FileCheck,
  CheckCircle2,
  XCircle,
  Calendar,
  Award,
  Sparkles,
  Send,
  X,
  Play,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useApp } from '../../context/AppContext';
import { SeededPRNG } from '../../services/questionSelectionEngine';
import { AITutorErrorFeedbackCard } from '../ai/AITutorErrorFeedbackCard';
import { UniversalQuestionRenderer } from '../question-renderers';

interface StudentAssignmentModalProps {
  assignment: Assignment;
  onClose: () => void;
  onSubmitted?: () => void;
}

export const StudentAssignmentModal: React.FC<StudentAssignmentModalProps> = ({
  assignment,
  onClose,
  onSubmitted
}) => {
  const { showSuccess, showInfo } = useToast();
  const { settings, markPracticeDone } = useApp();

  // Retrieve questions safely by IDs without answer leakage
  const allQuestions = useMemo(() => TeacherService.getQuestionBank(), []);
  const questionIdList = assignment.questionIds || assignment.exerciseIds || [];
  const assignmentQuestions: Exercise[] = useMemo(() => {
    return questionIdList
      .map((id) => allQuestions.find((q) => q.id === id))
      .filter(Boolean) as Exercise[];
  }, [allQuestions, questionIdList]);

  // Screen State: 'INTRO' | 'TEST' | 'RESULT'
  const [screenState, setScreenState] = useState<'INTRO' | 'TEST' | 'RESULT'>('INTRO');

  // State: Student answers map { [exerciseId]: answer }
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    score: number;
    correctCount: number;
    total: number;
    rewardXp: number;
    reviewedAnswers: SubmissionAnswer[];
  } | null>(null);

  // Deterministically prepared options for each MCQ using assignment.randomSeed
  const preparedOptionsMap = useMemo(() => {
    const prng = new SeededPRNG(assignment.randomSeed || 123456);
    const map = new Map<string, Array<{ id: string; text: string; originalIndex: number }>>();

    for (const q of assignmentQuestions) {
      if (q.type === 'multiple_choice') {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
        const indexed = q.options.map((opt, idx) => ({
          text: opt,
          originalIndex: idx
        }));
        const shuffled = prng.shuffle(indexed);
        map.set(
          q.id,
          shuffled.map((item, idx) => ({
            id: letters[idx] || String(idx + 1),
            text: item.text,
            originalIndex: item.originalIndex
          }))
        );
      }
    }
    return map;
  }, [assignmentQuestions, assignment.randomSeed]);

  const handleSelectOption = (exerciseId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [exerciseId]: optionId }));
  };

  const handleInputChange = (exerciseId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [exerciseId]: value }));
  };

  const checkIsCorrect = (q: Exercise, studentAns: string): boolean => {
    if (!studentAns) return false;
    if (q.type === 'multiple_choice') {
      const optionsForQ = preparedOptionsMap.get(q.id);
      if (optionsForQ) {
        const picked = optionsForQ.find((o) => o.id === studentAns);
        if (picked) {
          return picked.originalIndex === q.correctOptionIndex;
        }
      }
      const letters = ['A', 'B', 'C', 'D'];
      const correctLetter = letters[q.correctOptionIndex];
      return (
        studentAns.trim().toLowerCase() === correctLetter?.toLowerCase() ||
        studentAns.trim().toLowerCase() === q.options[q.correctOptionIndex]?.trim().toLowerCase()
      );
    }
    if (q.type === 'numeric') {
      const num = parseFloat(studentAns.replace(',', '.'));
      if (isNaN(num)) return false;
      return Math.abs(num - q.expectedNumber) <= (q.tolerance || 0.1);
    }
    return false;
  };

  const getCorrectAnswerDisplay = (q: Exercise): string => {
    if (q.type === 'multiple_choice') {
      const letters = ['A', 'B', 'C', 'D'];
      const letter = letters[q.correctOptionIndex] || 'A';
      return `${letter}. ${q.options[q.correctOptionIndex] || ''}`;
    }
    if (q.type === 'numeric') {
      return `${q.expectedNumber} ${q.unit || ''}`.trim();
    }
    if (q.type === 'true_false') {
      return q.statements.map((s) => `${s.statement}: ${s.isTrue ? 'Đúng' : 'Sai'}`).join('; ');
    }
    return 'Chính xác';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const answeredCount = Object.keys(answers).length;
    if (answeredCount < assignmentQuestions.length) {
      if (
        !confirm(
          `Bạn mới trả lời ${answeredCount}/${assignmentQuestions.length} câu hỏi. Bạn có chắc muốn nộp bài sớm không?`
        )
      ) {
        return;
      }
    }

    setIsSubmitting(true);

    let correctCount = 0;
    const formattedAnswers: SubmissionAnswer[] = assignmentQuestions.map((q) => {
      const studentAns = answers[q.id] || '';
      const isCorrect = checkIsCorrect(q, studentAns);

      if (isCorrect) correctCount++;

      return {
        exerciseId: q.id,
        exerciseTitle: q.title,
        questionText: q.question,
        studentAnswer: studentAns || 'Chưa trả lời',
        correctAnswer: getCorrectAnswerDisplay(q),
        isCorrect,
        scoreAwarded: isCorrect ? Math.round((10 / assignmentQuestions.length) * 10) / 10 : 0
      };
    });

    const finalScore =
      assignmentQuestions.length > 0
        ? Math.round((correctCount / assignmentQuestions.length) * 100) / 10
        : 10;

    TeacherService.submitAssignment({
      assignmentId: assignment.id,
      assignmentTitle: assignment.title,
      studentId: 'usr-student-001',
      studentName: settings.studentName || 'Nguyễn Văn Minh',
      className: settings.className.split('–')[0].trim() || 'Lớp 9A2',
      score: finalScore,
      totalQuestions: assignmentQuestions.length,
      correctCount,
      timeSpentMinutes: 8,
      answers: formattedAnswers
    });

    const awardedXp = Math.round((assignment.rewardXp || assignment.xp || 100) * (correctCount / Math.max(1, assignmentQuestions.length)));
    markPracticeDone(`asg-${assignment.id}`, awardedXp);

    setIsSubmitting(false);
    setSubmissionResult({
      score: finalScore,
      correctCount,
      total: assignmentQuestions.length,
      rewardXp: awardedXp,
      reviewedAnswers: formattedAnswers
    });
    setScreenState('RESULT');

    showSuccess(`Nộp bài thành công! Bạn nhận được +${awardedXp} XP.`);
    if (onSubmitted) onSubmitted();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                Nhiệm Vụ Giáo Viên Giao
              </span>
              <h3 className="text-base font-black text-slate-900 line-clamp-1">{assignment.title}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. SCREEN: INTRO (BÀI TẬP MỚI) */}
        {screenState === 'INTRO' && (
          <div className="space-y-5 py-2">
            <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-100 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-wide">
                  BÀI TẬP MỚI
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Lớp: {assignment.targetClassName}
                </span>
              </div>

              <h4 className="text-base font-black text-slate-900">{assignment.title}</h4>

              {assignment.description && (
                <p className="text-xs text-slate-600 leading-relaxed bg-white/80 p-3 rounded-xl border border-blue-100/60">
                  <strong>Lời dặn:</strong> {assignment.description}
                </p>
              )}

              <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
                <div className="p-3 bg-white rounded-xl border border-blue-100 flex flex-col items-center justify-center text-center">
                  <BookOpen className="w-4 h-4 text-blue-600 mb-1" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Số Câu</span>
                  <span className="font-black text-slate-900">
                    {assignment.totalQuestions || assignmentQuestions.length} câu
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-blue-100 flex flex-col items-center justify-center text-center">
                  <Calendar className="w-4 h-4 text-emerald-600 mb-1" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Hạn Nộp</span>
                  <span className="font-black text-slate-900 text-[11px]">
                    {new Date(assignment.dueDate).toLocaleDateString('vi-VN')}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-blue-100 flex flex-col items-center justify-center text-center">
                  <Award className="w-4 h-4 text-amber-500 mb-1" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Thưởng XP</span>
                  <span className="font-black text-amber-600">
                    +{assignment.rewardXp || assignment.xp || 120} XP
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" shape="pill" onClick={onClose}>
                Để Sau
              </Button>
              <Button
                type="button"
                variant="cylinder"
                size="md"
                shape="pill"
                leftIcon={<Play className="w-4 h-4" />}
                onClick={() => setScreenState('TEST')}
                className="font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white"
              >
                LÀM BÀI
              </Button>
            </div>
          </div>
        )}

        {/* 2. SCREEN: TEST (LÀM BÀI - KHÔNG LỘ ĐÁP ÁN) */}
        {screenState === 'TEST' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-600">
                Đang làm bài: <strong>{assignmentQuestions.length} câu hỏi</strong>
              </span>
              <span className="text-blue-700 font-bold">
                Đã trả lời: {Object.keys(answers).length}/{assignmentQuestions.length}
              </span>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {assignmentQuestions.map((q, index) => {
                const currentAnswer = answers[q.id] || '';
                const optionsForQ = preparedOptionsMap.get(q.id);

                // Prepare question object adhering to UI contract
                const adaptedQuestion = {
                  ...q,
                  options: optionsForQ || (q as any).options,
                  pointsXp: Math.round((10 / assignmentQuestions.length) * 10) / 10
                };

                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3"
                  >
                    <UniversalQuestionRenderer
                      question={adaptedQuestion}
                      value={currentAnswer}
                      onChange={(val) => {
                        if (typeof val === 'string' || typeof val === 'number') {
                          handleSelectOption(q.id, String(val));
                        } else {
                          setAnswers((prev) => ({ ...prev, [q.id]: val }));
                        }
                      }}
                      indexNumber={index + 1}
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                size="sm"
                shape="pill"
                onClick={() => setScreenState('INTRO')}
              >
                Quay Lại
              </Button>
              <Button
                type="submit"
                variant="cylinder"
                size="sm"
                shape="pill"
                leftIcon={<Send className="w-3.5 h-3.5" />}
                disabled={isSubmitting}
                className="font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? 'Đang Nộp Bài...' : 'Nộp Bài Tập'}
              </Button>
            </div>
          </form>
        )}

        {/* 3. SCREEN: RESULT (KẾT QUẢ & LỜI GIẢI 4 BƯỚC) */}
        {screenState === 'RESULT' && submissionResult && (
          <div className="space-y-4 py-2">
            <div className="text-center space-y-1">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <Award className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-black text-slate-900">Hoàn Thành Bài Tập!</h4>
              <p className="text-xs text-slate-500">
                Bài làm của bạn đã được ghi nhận và lưu lại trên hệ thống.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5 max-w-md mx-auto">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Điểm Số</span>
                <span className="text-lg font-black text-blue-600">{submissionResult.score} / 10</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Số Câu Đúng</span>
                <span className="text-lg font-black text-emerald-600">
                  {submissionResult.correctCount} / {submissionResult.total}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Thưởng XP</span>
                <span className="text-lg font-black text-amber-500">+{submissionResult.rewardXp} XP</span>
              </div>
            </div>

            {/* Detailed answers review with pedagogical solutions */}
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
              <h5 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Chi Tiết Lời Giải Sư Phạm:
              </h5>

              {submissionResult.reviewedAnswers.map((ans, idx) => {
                const origQuestion = assignmentQuestions.find((q) => q.id === ans.exerciseId);

                return (
                  <div key={idx} className="space-y-3">
                    <div
                      className={`p-3.5 rounded-2xl border text-xs space-y-2 ${
                        ans.isCorrect
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : 'bg-red-50/40 border-red-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-black text-slate-900">
                          Câu {idx + 1}: {ans.exerciseTitle}
                        </span>
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            ans.isCorrect
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {ans.isCorrect ? '✓ Đúng' : '✗ Sai'} (+{ans.scoreAwarded} đ)
                        </span>
                      </div>

                      <div className="p-2 bg-white rounded-xl border border-slate-100 text-slate-700">
                        <div>Câu trả lời của bạn: <strong>{ans.studentAnswer}</strong></div>
                        <div>Đáp án chính xác: <strong className="text-emerald-700">{ans.correctAnswer}</strong></div>
                      </div>

                      {ans.isCorrect && (origQuestion?.explanation || (origQuestion as any)?.solution) && (
                        <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-100 text-slate-800 leading-relaxed">
                          <span className="font-bold text-blue-900 block text-[10px] uppercase">
                            Hướng Dẫn Giải Chi Tiết 4 Bước:
                          </span>
                          <div className="whitespace-pre-line pt-1 font-sans">
                            <MathText text={origQuestion?.explanation || (origQuestion as any)?.solution} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* If question was wrong, show full Thầy Hiếu AI 4-part diagnosis & similar question */}
                    {!ans.isCorrect && (
                      <AITutorErrorFeedbackCard
                        question={origQuestion}
                        studentAnswer={ans.studentAnswer}
                        correctAnswer={ans.correctAnswer}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-center">
              <Button variant="cylinder" size="md" shape="pill" onClick={onClose} className="font-bold text-xs">
                Đóng &amp; Hoàn Tất
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
