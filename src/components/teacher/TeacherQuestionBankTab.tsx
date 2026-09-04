/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - TEACHER QUESTION BANK TAB (Ngân hàng câu hỏi)
 */

import React, { useState } from 'react';
import { Exercise, ShapeType, ExerciseType, ExerciseDifficulty } from '../../types/dataArchitecture';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { MathFormula, MathText, isValidDisplayFormula } from '../common/MathFormula';
import {
  BookOpen,
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Layers,
  Award,
  ChevronDown,
  ChevronUp,
  Tag,
  ShieldCheck
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { TeacherQuestionBankAuditModal } from './TeacherQuestionBankAuditModal';

interface TeacherQuestionBankTabProps {
  questions: Exercise[];
  onAddQuestion: (question: Exercise) => void;
}

export const TeacherQuestionBankTab: React.FC<TeacherQuestionBankTabProps> = ({
  questions,
  onAddQuestion
}) => {
  const { showSuccess, showInfo } = useToast();
  const [selectedShape, setSelectedShape] = useState<ShapeType | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<ExerciseDifficulty | 'all'>('all');
  const [selectedType, setSelectedType] = useState<ExerciseType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  // Audit Modal State
  const [showAuditModal, setShowAuditModal] = useState(false);

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newShape, setNewShape] = useState<ShapeType>('cylinder');
  const [newType, setNewType] = useState<ExerciseType>('multiple_choice');
  const [newDifficulty, setNewDifficulty] = useState<ExerciseDifficulty>('medium');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newLatex, setNewLatex] = useState('');
  const [newOptionA, setNewOptionA] = useState('');
  const [newOptionB, setNewOptionB] = useState('');
  const [newOptionC, setNewOptionC] = useState('');
  const [newOptionD, setNewOptionD] = useState('');
  const [newCorrectAnswer, setNewCorrectAnswer] = useState('A');
  const [newExplanation, setNewExplanation] = useState('');
  const [newPoints, setNewPoints] = useState(40);

  const filteredQuestions = questions.filter((q) => {
    if (selectedShape !== 'all' && q.shapeId !== selectedShape) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    if (selectedType !== 'all' && q.type !== selectedType) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchTitle = q.title.toLowerCase().includes(term);
      const matchQuestion = q.question.toLowerCase().includes(term);
      const matchTags = q.tags?.some((t) => t.toLowerCase().includes(term));
      if (!matchTitle && !matchQuestion && !matchTags) return false;
    }
    return true;
  });

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newQuestionText.trim() || !newExplanation.trim()) {
      showInfo('Vui lòng điền đầy đủ tiêu đề, nội dung câu hỏi và lời giải!');
      return;
    }

    let created: Exercise;
    if (newType === 'multiple_choice') {
      const correctIdx =
        newCorrectAnswer === 'B' ? 1 : newCorrectAnswer === 'C' ? 2 : newCorrectAnswer === 'D' ? 3 : 0;
      created = {
        id: `ex-custom-${Date.now()}`,
        shapeId: newShape,
        lessonId: `lesson-${newShape}-01`,
        type: 'multiple_choice',
        difficulty: newDifficulty,
        title: newTitle,
        question: newQuestionText,
        latexEquation: newLatex || undefined,
        options: [
          newOptionA || 'Đáp án A',
          newOptionB || 'Đáp án B',
          newOptionC || 'Đáp án C',
          newOptionD || 'Đáp án D'
        ],
        correctOptionIndex: correctIdx,
        explanation: newExplanation,
        hint: 'Đọc kỹ giả thiết và công thức liên quan.',
        pointsXp: Number(newPoints) || 40,
        tags: ['Đề giáo viên tạo', newShape]
      };
    } else {
      created = {
        id: `ex-custom-${Date.now()}`,
        shapeId: newShape,
        lessonId: `lesson-${newShape}-01`,
        type: 'numeric',
        difficulty: newDifficulty,
        title: newTitle,
        question: newQuestionText,
        latexEquation: newLatex || undefined,
        expectedNumber: parseFloat(newOptionA) || 0,
        tolerance: 0.1,
        unit: 'cm³',
        placeholder: 'Nhập kết quả số...',
        stepByStepGuide: [
          {
            stepNumber: 1,
            description: newExplanation
          }
        ],
        explanation: newExplanation,
        hint: 'Đọc kỹ giả thiết và công thức liên quan.',
        pointsXp: Number(newPoints) || 40,
        tags: ['Đề giáo viên tạo', newShape]
      };
    }

    onAddQuestion(created);
    showSuccess('Đã thêm câu hỏi mới vào Ngân hàng đề thi!');
    setShowAddModal(false);

    // Reset fields
    setNewTitle('');
    setNewQuestionText('');
    setNewLatex('');
    setNewOptionA('');
    setNewOptionB('');
    setNewOptionC('');
    setNewOptionD('');
    setNewExplanation('');
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Add Question Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h3 className="text-base font-black text-slate-900">
            Ngân Hàng Câu Hỏi &amp; Đề Thi Toán 9
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Tổng cộng: <strong>{questions.length} câu hỏi</strong> chuẩn kiến thức kỹ năng (Trắc nghiệm, Đúng/Sai, Điền số, Thử thách).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="md"
            shape="pill"
            leftIcon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
            onClick={() => setShowAuditModal(true)}
            className="font-bold text-xs border-emerald-300 bg-emerald-50/50 hover:bg-emerald-100/60 text-emerald-800"
          >
            Audit &amp; Kiểm Định 1,000 Câu
          </Button>

          <Button
            variant="cylinder"
            size="md"
            shape="pill"
            leftIcon={<PlusCircle className="w-4 h-4" />}
            onClick={() => setShowAddModal(true)}
            className="font-bold text-xs"
          >
            Thêm Câu Hỏi Mới
          </Button>
        </div>
      </div>

      {/* 2. Filter Bar */}
      <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Shape filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-bold">Chủ đề:</span>
            <select
              value={selectedShape}
              onChange={(e) => setSelectedShape(e.target.value as any)}
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 text-xs"
            >
              <option value="all">Tất cả hình khối</option>
              <option value="cylinder">Hình Trụ</option>
              <option value="cone">Hình Nón</option>
              <option value="sphere">Hình Cầu</option>
            </select>
          </div>

          {/* Difficulty filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-bold">Mức độ:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as any)}
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 text-xs"
            >
              <option value="all">Tất cả độ khó</option>
              <option value="easy">Nhận biết (Dễ)</option>
              <option value="medium">Thông hiểu (Vừa)</option>
              <option value="hard">Vận dụng cao (Khó)</option>
            </select>
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-bold">Dạng bài:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 text-xs"
            >
              <option value="all">Tất cả dạng bài</option>
              <option value="multiple_choice">Trắc nghiệm 4 lựa chọn</option>
              <option value="numeric">Điền kết quả số</option>
              <option value="true_false">Đúng / Sai</option>
              <option value="challenge">Thử thách vận dụng cao</option>
            </select>
          </div>

          {/* Search box */}
          <div className="flex-1 min-w-[200px] relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo từ khóa câu hỏi, công thức..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>
      </div>

      {/* 3. Questions List */}
      <div className="space-y-3">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 text-xs">
            Không tìm thấy câu hỏi nào phù hợp với bộ lọc hiện tại.
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isExpanded = expandedQuestionId === q.id;

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-2xs hover:border-blue-300 transition-all space-y-3"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{q.title}</h4>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        q.shapeId === 'cylinder'
                          ? 'bg-blue-100 text-blue-800'
                          : q.shapeId === 'cone'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {q.shapeId === 'cylinder' ? 'Hình Trụ' : q.shapeId === 'cone' ? 'Hình Nón' : 'Hình Cầu'}
                    </span>

                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                      {q.difficulty === 'easy' ? 'Dễ' : q.difficulty === 'medium' ? 'Vừa' : 'Khó'}
                    </span>

                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-bold">
                      +{q.pointsXp} XP
                    </span>
                  </div>

                  <button
                    onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                    className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer self-end sm:self-center"
                  >
                    <span>{isExpanded ? 'Thu gọn' : 'Xem đáp án & Lời giải'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Question Body */}
                <div className="text-xs text-slate-700 leading-relaxed space-y-2">
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <MathText text={q.question} />
                  </div>

                  {isValidDisplayFormula(q.latexEquation) && (
                    <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 inline-block text-slate-900 font-mono">
                      <MathFormula math={q.latexEquation} />
                    </div>
                  )}

                  {/* Options if Multiple Choice */}
                  {(q as any).options && (q as any).options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {((q as any).options as any[]).map((opt) => {
                        const isCorrect = opt.id === (q as any).correctAnswer;
                        return (
                          <div
                            key={opt.id}
                            className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${
                              isExpanded && isCorrect
                                ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-900'
                                : 'bg-slate-50/70 border-slate-200 text-slate-700'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-md bg-white border border-slate-200 text-[10px] font-bold flex items-center justify-center shrink-0">
                              {opt.id}
                            </span>
                            <span>
                              <MathText text={opt.text} />
                            </span>
                            {isExpanded && isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-auto" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Expanded Solution / Explanation */}
                {isExpanded && (
                  <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs space-y-2 animate-in fade-in duration-150">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-[11px] uppercase">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Đáp án đúng: {String((q as any).correctAnswer || '')}</span>
                    </div>
                    <div className="text-slate-700 leading-relaxed">
                      <strong>Lời giải chi tiết:</strong> <MathText text={q.explanation} />
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 4. Add Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-blue-600" />
                Thêm Câu Hỏi Mới Vào Ngân Hàng Đề
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Tiêu đề câu hỏi (*)</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Tính diện tích toàn phần hình trụ có r = 4, h = 6"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Chủ đề hình</label>
                  <select
                    value={newShape}
                    onChange={(e) => setNewShape(e.target.value as ShapeType)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                  >
                    <option value="cylinder">Hình Trụ</option>
                    <option value="cone">Hình Nón</option>
                    <option value="sphere">Hình Cầu</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Mức độ</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as ExerciseDifficulty)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                  >
                    <option value="easy">Dễ (Nhận biết)</option>
                    <option value="medium">Vừa (Thông hiểu)</option>
                    <option value="hard">Khó (Vận dụng cao)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Điểm thưởng XP</label>
                  <input
                    type="number"
                    value={newPoints}
                    onChange={(e) => setNewPoints(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nội dung câu hỏi (*)</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Nhập đề bài câu hỏi toán..."
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                ></textarea>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Công thức LaTeX (Tùy chọn)</label>
                <input
                  type="text"
                  placeholder="VD: S_{tp} = 2\pi rh + 2\pi r^2"
                  value={newLatex}
                  onChange={(e) => setNewLatex(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono text-xs"
                />
              </div>

              {/* 4 Options */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700">4 Lựa chọn trả lời:</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Đáp án A"
                    value={newOptionA}
                    onChange={(e) => setNewOptionA(e.target.value)}
                    className="p-2 rounded-xl border border-slate-200 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Đáp án B"
                    value={newOptionB}
                    onChange={(e) => setNewOptionB(e.target.value)}
                    className="p-2 rounded-xl border border-slate-200 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Đáp án C"
                    value={newOptionC}
                    onChange={(e) => setNewOptionC(e.target.value)}
                    className="p-2 rounded-xl border border-slate-200 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Đáp án D"
                    value={newOptionD}
                    onChange={(e) => setNewOptionD(e.target.value)}
                    className="p-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Đáp án đúng (*)</label>
                <select
                  value={newCorrectAnswer}
                  onChange={(e) => setNewCorrectAnswer(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                >
                  <option value="A">Đáp án A</option>
                  <option value="B">Đáp án B</option>
                  <option value="C">Đáp án C</option>
                  <option value="D">Đáp án D</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Lời giải chi tiết (*)</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Nhập các bước giải chi tiết để học sinh tham khảo sau khi làm bài..."
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  shape="pill"
                  onClick={() => setShowAddModal(false)}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  variant="cylinder"
                  size="sm"
                  shape="pill"
                  className="font-bold"
                >
                  Lưu Vào Ngân Hàng
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Audit & Quality Control Modal */}
      <TeacherQuestionBankAuditModal
        isOpen={showAuditModal}
        onClose={() => setShowAuditModal(false)}
      />
    </div>
  );
};
