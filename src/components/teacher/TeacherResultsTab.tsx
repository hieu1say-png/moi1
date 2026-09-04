/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - TEACHER RESULTS & SUBMISSIONS TAB (Kết quả học sinh)
 */

import React, { useState } from 'react';
import { AssignmentSubmission, Assignment, SchoolClass } from '../../types/dataArchitecture';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { MathText } from '../common/MathFormula';
import {
  FileCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  Search,
  MessageSquare,
  Eye,
  AlertTriangle,
  Send,
  X
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface TeacherResultsTabProps {
  submissions: AssignmentSubmission[];
  assignments: Assignment[];
  classes: SchoolClass[];
  selectedAssignmentId: string;
  setSelectedAssignmentId: (id: string) => void;
  onUpdateFeedback: (submissionId: string, feedback: string) => void;
}

export const TeacherResultsTab: React.FC<TeacherResultsTabProps> = ({
  submissions,
  assignments,
  classes,
  selectedAssignmentId,
  setSelectedAssignmentId,
  onUpdateFeedback
}) => {
  const { showSuccess } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmissionForReview, setSelectedSubmissionForReview] = useState<AssignmentSubmission | null>(null);
  const [feedbackInput, setFeedbackInput] = useState('');

  const filteredSubmissions = submissions.filter((s) => {
    if (selectedAssignmentId !== 'all' && s.assignmentId !== selectedAssignmentId) {
      return false;
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchName = s.studentName.toLowerCase().includes(term);
      const matchClass = s.className.toLowerCase().includes(term);
      if (!matchName && !matchClass) return false;
    }
    return true;
  });

  const handleOpenReview = (submission: AssignmentSubmission) => {
    setSelectedSubmissionForReview(submission);
    setFeedbackInput(submission.teacherFeedback || '');
  };

  const handleSaveFeedback = () => {
    if (!selectedSubmissionForReview) return;
    onUpdateFeedback(selectedSubmissionForReview.id, feedbackInput);
    showSuccess(`Đã lưu nhận xét cho học sinh ${selectedSubmissionForReview.studentName}!`);
    setSelectedSubmissionForReview({
      ...selectedSubmissionForReview,
      teacherFeedback: feedbackInput
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Filter Bar */}
      <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-slate-900">
              Bảng Điểm &amp; Chi Tiết Bài Làm Của Học Sinh
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Xem chi tiết từng câu trả lời, nhận diện lỗi sai học sinh mắc phải và gửi lời nhận xét sư phạm.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Tổng cộng: <strong>{filteredSubmissions.length}</strong> bài nộp
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
          {/* Assignment Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-bold">Nhiệm vụ:</span>
            <select
              value={selectedAssignmentId}
              onChange={(e) => setSelectedAssignmentId(e.target.value)}
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 text-xs max-w-[280px] truncate"
            >
              <option value="all">-- Tất cả các bài tập đã giao --</option>
              {assignments.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.title} ({a.targetClassName})
                </option>
              ))}
            </select>
          </div>

          {/* Search box */}
          <div className="flex-1 min-w-[200px] relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tìm theo tên học sinh, lớp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>
      </div>

      {/* 2. Submissions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Học Sinh</th>
                <th className="py-3.5 px-3">Lớp</th>
                <th className="py-3.5 px-3">Bài Tập</th>
                <th className="py-3.5 px-3">Thời Gian Nộp</th>
                <th className="py-3.5 px-3">Số Câu Đúng</th>
                <th className="py-3.5 px-3">Điểm Số</th>
                <th className="py-3.5 px-3">Nhận Xét</th>
                <th className="py-3.5 px-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-400">
                    Chưa có bài nộp nào phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub) => {
                  const isHigh = sub.score >= 8.0;

                  return (
                    <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Student Name */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{sub.studentName}</div>
                      </td>

                      {/* Class */}
                      <td className="py-3 px-3">
                        <span className="font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800">
                          {sub.className}
                        </span>
                      </td>

                      {/* Assignment Title */}
                      <td className="py-3 px-3">
                        <span className="font-medium text-slate-700 line-clamp-1 max-w-[220px]">
                          {sub.assignmentTitle}
                        </span>
                      </td>

                      {/* Submitted At */}
                      <td className="py-3 px-3 text-slate-500">
                        {new Date(sub.submittedAt).toLocaleString('vi-VN')}
                      </td>

                      {/* Correct / Total */}
                      <td className="py-3 px-3 font-semibold text-slate-800">
                        {sub.correctCount} / {sub.totalQuestions} câu
                      </td>

                      {/* Score */}
                      <td className="py-3 px-3">
                        <span
                          className={`font-black text-sm px-2.5 py-1 rounded-lg ${
                            isHigh ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {sub.score.toFixed(1)}
                        </span>
                      </td>

                      {/* Feedback Status */}
                      <td className="py-3 px-3">
                        {sub.teacherFeedback ? (
                          <span className="text-[11px] text-blue-700 font-medium line-clamp-1 max-w-[150px]">
                            {sub.teacherFeedback}
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">Chưa có</span>
                        )}
                      </td>

                      {/* Action View */}
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="outline"
                          size="xs"
                          shape="rounded"
                          leftIcon={<Eye className="w-3.5 h-3.5" />}
                          onClick={() => handleOpenReview(sub)}
                          className="text-xs font-bold"
                        >
                          Xem Bài
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Detailed Submission Review Modal */}
      {selectedSubmissionForReview && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Bài Làm: {selectedSubmissionForReview.studentName}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedSubmissionForReview.className} • {selectedSubmissionForReview.assignmentTitle}
                </p>
              </div>

              <button
                onClick={() => setSelectedSubmissionForReview(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score Banner */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-2xl font-black text-blue-600">
                  {selectedSubmissionForReview.score.toFixed(1)} <span className="text-xs text-slate-400 font-bold">/ 10.0</span>
                </div>
                <div className="text-xs text-slate-600">
                  <span>Số câu đúng: <strong>{selectedSubmissionForReview.correctCount} / {selectedSubmissionForReview.totalQuestions}</strong></span>
                  <span className="mx-2">•</span>
                  <span>Thời gian làm bài: <strong>{selectedSubmissionForReview.timeSpentMinutes || 8} phút</strong></span>
                </div>
              </div>
            </div>

            {/* Question Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Chi Tiết Từng Câu Trả Lời:
              </h4>

              {selectedSubmissionForReview.answers && selectedSubmissionForReview.answers.length > 0 ? (
                selectedSubmissionForReview.answers.map((ans, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border text-xs space-y-2 ${
                      ans.isCorrect
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-amber-50/50 border-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {ans.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-amber-600" />
                        )}
                        <span className="font-bold text-slate-900">
                          Câu {idx + 1}: {ans.exerciseTitle}
                        </span>
                      </div>
                      <span className="font-black text-slate-700">+{ans.scoreAwarded} điểm</span>
                    </div>

                    <div className="text-slate-600">
                      <MathText text={ans.questionText} />
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="p-2 rounded-xl bg-white border border-slate-200">
                        <span className="text-[10px] text-slate-400 block font-bold">Học sinh trả lời:</span>
                        <span className={`font-bold ${ans.isCorrect ? 'text-emerald-700' : 'text-amber-700'}`}>
                          {ans.studentAnswer}
                        </span>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-slate-200">
                        <span className="text-[10px] text-slate-400 block font-bold">Đáp án chuẩn:</span>
                        <span className="font-bold text-slate-800">{ans.correctAnswer}</span>
                      </div>
                    </div>

                    {ans.errorType && (
                      <div className="flex items-center gap-1.5 text-[11px] text-amber-800 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Chẩn đoán: Nhầm lẫn khái niệm đường sinh và chiều cao.</span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl">
                  Học sinh đã hoàn thành bài thi trắc nghiệm trên hệ thống.
                </div>
              )}
            </div>

            {/* Teacher Feedback Editor */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                Nhận Xét &amp; Góp Ý Của Giáo Viên Cho Học Sinh:
              </label>
              <textarea
                rows={3}
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                placeholder="Nhập lời khen hoặc dặn dò học sinh cần ôn tập lại công thức nào..."
                className="w-full p-3 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
              ></textarea>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                shape="pill"
                onClick={() => setSelectedSubmissionForReview(null)}
              >
                Đóng
              </Button>
              <Button
                variant="cylinder"
                size="sm"
                shape="pill"
                leftIcon={<Send className="w-3.5 h-3.5" />}
                onClick={handleSaveFeedback}
                className="font-bold text-xs"
              >
                Lưu &amp; Gửi Nhận Xét
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
