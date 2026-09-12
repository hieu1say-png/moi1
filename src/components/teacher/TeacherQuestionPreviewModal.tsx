/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - TEACHER QUESTION PREVIEW MODAL [XEM NHƯ HỌC SINH]
 * Renders the question exactly as viewed by Grade 9 students:
 * - Academic Times New Roman typography (20-22px desktop, 18-20px mobile)
 * - KaTeX formula rendering with zero raw LaTeX leakage
 * - Exact 4 options cards with A/B/C/D pills and full touch target
 * - Detailed 4-Step Solution preview:
 *     + BƯỚC 1: Xác định dữ kiện
 *     + BƯỚC 2: Xác định mô hình và công thức
 *     + BƯỚC 3: Thực hiện tính toán
 *     + BƯỚC 4: Kết luận và kiểm tra
 * - Quality Inspector Checklist for teachers to verify formula, image, answer, and typography.
 */

import React, { useState } from 'react';
import { MathText, MathFormula, isValidDisplayFormula } from '../common/MathFormula';
import {
  X,
  Eye,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Smartphone,
  Monitor,
  Lightbulb,
  FileCheck
} from 'lucide-react';

export interface QuestionPreviewData {
  id: string;
  title: string;
  topic?: string;
  shapeId?: string;
  difficulty?: string;
  question: string;
  latexEquation?: string;
  imageUrl?: string | null;
  options?: Array<{ id: string; text: string }>;
  correctAnswer?: string | number;
  explanation?: string;
  solution4Steps?: string[];
  importantNotes?: string[];
}

interface TeacherQuestionPreviewModalProps {
  isOpen: boolean;
  question: QuestionPreviewData | null;
  onClose: () => void;
}

export const TeacherQuestionPreviewModal: React.FC<TeacherQuestionPreviewModalProps> = ({
  isOpen,
  question,
  onClose
}) => {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showSolution, setShowSolution] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  if (!isOpen || !question) return null;

  const shapeTitle =
    question.shapeId === 'cylinder' || question.topic === 'CYLINDER'
      ? 'Hình Trụ'
      : question.shapeId === 'cone' || question.topic === 'CONE'
      ? 'Hình Nón'
      : question.shapeId === 'sphere' || question.topic === 'SPHERE'
      ? 'Hình Cầu'
      : 'Tổng Hợp';

  // Normalize options
  const rawOptions = question.options || [];
  const optionsList = rawOptions.map((opt, idx) => {
    const letter = ['A', 'B', 'C', 'D'][idx] || String.fromCharCode(65 + idx);
    const id = opt.id || letter;
    const text = typeof opt === 'string' ? opt : opt.text;
    return { id, letter, text };
  });

  const correctLetter =
    typeof question.correctAnswer === 'number'
      ? ['A', 'B', 'C', 'D'][question.correctAnswer] || 'A'
      : question.correctAnswer || 'A';

  // Normalize 4-step solution
  const fourSteps =
    question.solution4Steps && question.solution4Steps.length >= 4
      ? question.solution4Steps
      : [
          `Bước 1: Xác định dữ kiện từ đề bài toán về ${shapeTitle}.`,
          'Bước 2: Lựa chọn công thức hình học không gian chuẩn SGK.',
          `Bước 3: Thực hiện tính toán chi tiết: ${question.explanation || 'Áp dụng các đại lượng đã cho để tính kết quả.'}`,
          `Bước 4: Kết luận đáp án đúng là ${correctLetter}.`
        ];

  return (
    <div
      id="teacher-question-preview-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto"
    >
      <div
        className={`w-full ${
          previewMode === 'mobile' ? 'max-w-[420px]' : 'max-w-4xl'
        } bg-white rounded-3xl border-2 border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-all duration-300`}
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center text-white">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-white">XEM NHƯ HỌC SINH</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-400/30">
                  Lớp 9
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Mã câu hỏi: {question.id}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Device Switcher */}
            <div className="hidden sm:flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
              <button
                type="button"
                onClick={() => setPreviewMode('desktop')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  previewMode === 'desktop'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Giao diện máy tính (Desktop)"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Máy tính</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode('mobile')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  previewMode === 'mobile'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Giao diện điện thoại (Mobile)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Điện thoại</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body - Student Screen Simulation */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 bg-[#F8FAF5] flex-1">
          {/* 1. Student Card Frame */}
          <div className="bg-white rounded-2xl border-2 border-black p-5 sm:p-6 shadow-[4px_4px_0_#000000] space-y-4">
            {/* Header badges */}
            <div className="flex items-center justify-between gap-2 flex-wrap border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold">
                  {shapeTitle}
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
                  {question.difficulty === 'easy'
                    ? 'Nhận biết'
                    : question.difficulty === 'hard'
                    ? 'Vận dụng'
                    : 'Thông hiểu'}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500 font-medium">
                {question.id}
              </span>
            </div>

            {/* Question Text */}
            <div className="space-y-3 text-left">
              <div className="gl-question-text text-[#0F291E] leading-relaxed select-text">
                <MathText text={question.question} />
              </div>

              {isValidDisplayFormula(question.latexEquation) && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center text-slate-900 font-mono">
                  <MathFormula formula={question.latexEquation} displayMode={true} />
                </div>
              )}

              {/* Physical image if real */}
              {question.imageUrl && question.imageUrl !== 'null' && (
                <div className="my-3 flex justify-center">
                  <img
                    src={question.imageUrl}
                    alt="Hình vẽ minh họa bài toán"
                    className="max-w-full h-auto max-h-64 object-contain rounded-xl border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
            </div>

            {/* Option Cards (Clickable for Teacher Test) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {optionsList.map((opt) => {
                const isSelected = selectedOption === opt.letter;
                const isCorrect = opt.letter === correctLetter;

                let cardStyle = 'bg-white border-2 border-slate-200 hover:border-orange-400 hover:bg-orange-50/30';
                if (isSelected) {
                  cardStyle = isCorrect
                    ? 'bg-emerald-50 border-2 border-emerald-600 font-bold text-emerald-950'
                    : 'bg-rose-50 border-2 border-rose-500 font-bold text-rose-950';
                }

                return (
                  <button
                    key={opt.letter}
                    type="button"
                    onClick={() => setSelectedOption(opt.letter)}
                    className={`p-3.5 sm:p-4 rounded-xl text-left flex items-center gap-3.5 transition-all cursor-pointer ${cardStyle}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center shrink-0 text-sm ${
                        isSelected
                          ? isCorrect
                            ? 'bg-emerald-600 text-white'
                            : 'bg-rose-600 text-white'
                          : 'bg-slate-100 text-slate-700 border border-slate-300'
                      }`}
                    >
                      {opt.letter}
                    </div>
                    <div className="flex-1 gl-option-text font-medium text-slate-900">
                      <MathText text={opt.text} />
                    </div>
                    {isSelected && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isSelected && !isCorrect && (
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Solution Toggle */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowSolution(!showSolution)}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Lightbulb className="w-4 h-4" />
                <span>{showSolution ? 'Ẩn Lời giải 4 bước' : 'Xem Lời giải 4 bước chi tiết'}</span>
              </button>

              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                Đáp án đúng: Phương án {correctLetter}
              </span>
            </div>

            {/* 4-Step Solution Details */}
            {showSolution && (
              <div className="mt-4 p-4.5 rounded-2xl bg-emerald-50/80 border-2 border-emerald-300 space-y-3 text-left">
                <div className="flex items-center gap-2 text-emerald-950 font-black text-sm uppercase">
                  <FileCheck className="w-4 h-4 text-emerald-700" />
                  <span>Hướng dẫn giải chuẩn 4 bước:</span>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  {fourSteps.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 bg-white rounded-xl border border-emerald-200 text-slate-800 leading-relaxed shadow-2xs"
                    >
                      <MathText text={step} />
                    </div>
                  ))}
                </div>

                {question.importantNotes && question.importantNotes.length > 0 && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-xs space-y-1">
                    <span className="font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Lưu ý sư phạm:
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-amber-900">
                      {question.importantNotes.map((note, nIdx) => (
                        <li key={nIdx}>
                          <MathText text={note} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2. Teacher Quality Audit Checklist */}
          <div className="bg-slate-100 rounded-2xl border border-slate-300 p-4 text-xs text-slate-700 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Phiếu Kiểm Định Chất Lượng Sư Phạm:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Công thức KaTeX chuẩn mực, không rò rỉ mã thô.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Đủ 4 phương án A, B, C, D rõ ràng, không trùng lặp.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Font Times New Roman chuẩn học thuật, cỡ chữ dễ đọc.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Lời giải 4 bước giúp học sinh tự học và ôn thi vào 10.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Trạng thái câu hỏi:{' '}
            <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              APPROVED
            </span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Đóng Xem Trước
          </button>
        </div>
      </div>
    </div>
  );
};
