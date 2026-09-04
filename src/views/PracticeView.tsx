/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - PRACTICE VIEW
 * Module: LUYỆN TẬP TỪNG CÂU — RANDOM QUESTION PRACTICE
 *
 * Features:
 * - Single Question Focus (Mỗi lần chỉ hiển thị 1 câu hỏi)
 * - Random Question Selection across 1100+ items (Unified Bank)
 * - Deterministic Response Evaluation & Misconception Diagnostics
 * - 4-Step Solution Timeline with Thầy Hiếu AI
 * - Diagnostic & Attempt History Tabs
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { MathFormula } from '../components/common/MathFormula';
import { GeometryDataService } from '../data';
import { SingleQuestionPracticeFlow } from '../components/practice/SingleQuestionPracticeFlow';
import {
  CheckSquare,
  AlertTriangle,
  History,
  Sparkles,
  Target,
  BarChart2,
  Clock,
  ShieldCheck,
  Check,
  XCircle,
  Shuffle
} from 'lucide-react';
import { useErrorMemoryStore } from '../stores/useErrorMemoryStore';

export const PracticeView: React.FC = () => {
  const { userStats } = useApp();
  const [activeTab, setActiveTab] = useState<'exercises' | 'diagnostics' | 'analytics'>('exercises');

  const studentErrors = GeometryDataService.getStudentErrors();
  const pastAttempts = userStats.attempts || [];

  return (
    <div id="view-practice" className="space-y-6 w-full mx-auto overflow-x-hidden pb-10">
      {/* 1. Header & Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#E2EADF] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#16A34A] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Shuffle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#0F291E]">
                Luyện Tập Từng Câu — Ngân Hàng 1000+ Câu
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] text-[10px] font-bold">
                Toán 9 Luyện Thi Vào 10
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#658473]">
              Mỗi lượt hiển thị 1 câu ngẫu nhiên • Chấm điểm tức thì • Lời giải 4 bước chuẩn mực cùng ThS. Trần Ngọc Hiếu
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-[#F8FAF5] p-1.5 rounded-xl border border-[#E2EADF] self-start sm:self-auto">
          <button
            id="tab-practice-exercises"
            onClick={() => setActiveTab('exercises')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'exercises'
                ? 'bg-[#16A34A] text-white shadow-xs'
                : 'text-[#334E40] hover:text-[#0F291E] hover:bg-white'
            }`}
          >
            <Shuffle className="w-4 h-4" />
            <span>Luyện Tập Từng Câu</span>
          </button>
          <button
            id="tab-practice-diagnostics"
            onClick={() => setActiveTab('diagnostics')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'diagnostics'
                ? 'bg-[#0F291E] text-white shadow-xs'
                : 'text-[#334E40] hover:text-[#0F291E] hover:bg-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
            <span>Chẩn Đoán Lỗi Sai</span>
          </button>
          <button
            id="tab-practice-analytics"
            onClick={() => setActiveTab('analytics')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'analytics'
                ? 'bg-[#059669] text-white shadow-xs'
                : 'text-[#334E40] hover:text-[#0F291E] hover:bg-white'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Lịch Sử ({pastAttempts.length})</span>
          </button>
        </div>
      </div>

      {/* 2. TAB 1: SINGLE-QUESTION PRACTICE FLOW */}
      {activeTab === 'exercises' && <SingleQuestionPracticeFlow />}

      {/* 3. TAB 2: DIAGNOSTICS & MISCONCEPTIONS */}
      {activeTab === 'diagnostics' && (
        <div className="space-y-5">
          {/* Error Memory & Mastery Check Banner */}
          <Card className="p-5 sm:p-6 bg-[#0F291E] text-white space-y-4 border border-[#16A34A]/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-800/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#16A34A] text-white flex items-center justify-center font-bold">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    AI Error Memory &amp; Trạng Thái Làm Chủ
                  </h3>
                  <p className="text-xs text-emerald-200">
                    Theo dõi lịch sử bẫy sai lầm, độ thuần thục độc lập và kích hoạt bài kiểm tra làm chủ
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => useErrorMemoryStore.getState().triggerMasteryCheck()}
                className="px-4 py-2 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kiểm tra làm chủ ngẫu nhiên</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {useErrorMemoryStore.getState().getAllConceptMasteries().map((m) => {
                const isMastered = m.masteryStatus === 'mastered';
                const isNeedsReview = m.masteryStatus === 'needs_review';

                return (
                  <div
                    key={m.concept}
                    className="p-3.5 rounded-xl bg-white border border-[#E2EADF] shadow-2xs space-y-2 text-left text-[#0F291E]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-[#0F291E] line-clamp-1">
                        {m.conceptTitle}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                          isMastered
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : isNeedsReview
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {isMastered ? 'Đã làm chủ' : isNeedsReview ? 'Cần ôn lại' : 'Đang học'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#658473]">Độ thuần thục:</span>
                        <span className="font-bold text-[#16A34A]">{m.masteryScore}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#F8FAF5] overflow-hidden border border-[#E2EADF]">
                        <div
                          className={`h-full rounded-full ${
                            isMastered ? 'bg-[#16A34A]' : isNeedsReview ? 'bg-amber-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${Math.max(10, m.masteryScore)}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-[10px] text-[#658473]">
                      <span>Tự đúng: {m.independentSuccess} lần</span>
                      <button
                        type="button"
                        onClick={() => useErrorMemoryStore.getState().triggerMasteryCheck(m.concept)}
                        className="text-[#16A34A] hover:text-[#15803D] font-bold underline cursor-pointer"
                      >
                        Kiểm tra →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Error Diagnostics Cards */}
          <Card className="p-5 sm:p-6 bg-white space-y-5 border border-[#E2EADF]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2EADF]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F291E]">
                    Cẩm Nang Chẩn Đoán Sai Lầm Thường Gặp
                  </h3>
                  <p className="text-xs text-[#658473]">
                    Tổng hợp các bẫy đề thi kinh điển của học sinh Lớp 9 khi giải toán Hình không gian • ThS. Trần Ngọc Hiếu
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studentErrors.map((err) => (
                <div
                  key={err.id}
                  className="p-4 rounded-2xl bg-white border border-[#E2EADF] shadow-2xs space-y-3 hover:border-[#16A34A]/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant={err.shapeId} size="xs">
                      {err.shapeId === 'cylinder'
                        ? 'Hình Trụ'
                        : err.shapeId === 'cone'
                        ? 'Hình Nón'
                        : 'Hình Cầu'}
                    </Badge>
                    <Badge variant="danger" size="xs">
                      {err.errorType}
                    </Badge>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-[#0F291E] leading-snug">
                    {err.title}
                  </h4>

                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="p-2 rounded-lg bg-rose-50 border border-rose-100 text-rose-800">
                      ✗ Câu trả lời sai: {err.wrongAnswer}
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 font-bold">
                      ✓ Đáp án đúng: {err.correctAnswer}
                    </div>
                  </div>

                  {err.remedialFormulaLatex && (
                    <div className="p-2 bg-[#F8FAF5] border border-[#E2EADF] text-[#0F291E] rounded-lg font-mono text-xs text-center">
                      <MathFormula formula={err.remedialFormulaLatex} />
                    </div>
                  )}

                  <p className="text-xs text-[#334E40] leading-relaxed font-medium">
                    {err.remedialExplanation}
                  </p>

                  <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 space-y-0.5">
                    <span className="font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                      Hành động khắc phục:
                    </span>
                    <p>{err.suggestedAction}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* 4. TAB 3: ATTEMPT ANALYTICS & HISTORY */}
      {activeTab === 'analytics' && (
        <div className="space-y-4">
          <Card className="p-5 sm:p-6 bg-white space-y-5 border border-[#E2EADF]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2EADF]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center font-bold">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F291E]">
                    Phân Tích Năng Lực &amp; Lịch Sử Làm Bài (Attempt Analytics)
                  </h3>
                  <p className="text-xs text-[#658473]">
                    Lưu trữ kết quả thực tế, tốc độ giải và chẩn đoán độ chính xác cùng ThS. Trần Ngọc Hiếu
                  </p>
                </div>
              </div>
            </div>

            {/* Performance Overview Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-[#F8FAF5] border border-[#E2EADF] text-center space-y-1">
                <span className="text-xs text-[#658473] font-medium">Tổng lượt làm:</span>
                <div className="text-xl sm:text-2xl font-black text-[#0F291E]">
                  {pastAttempts.length}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-center space-y-1">
                <span className="text-xs text-[#059669] font-medium">Tỉ lệ đúng:</span>
                <div className="text-xl sm:text-2xl font-black text-[#059669]">
                  {userStats.accuracy}%
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-center space-y-1">
                <span className="text-xs text-[#16A34A] font-medium">Tổng XP đạt được:</span>
                <div className="text-xl sm:text-2xl font-black text-[#16A34A]">
                  {userStats.xp}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F0FDFA] border border-[#99F6E4] text-center space-y-1">
                <span className="text-xs text-[#0D9488] font-medium">Đã hoàn thành:</span>
                <div className="text-xl sm:text-2xl font-black text-[#0D9488]">
                  {userStats.completedPractices.length} bài
                </div>
              </div>
            </div>

            {/* Attempts Timeline List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs sm:text-sm font-bold text-[#0F291E] uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#658473]" />
                Lịch sử các lượt nộp bài gần đây:
              </h4>

              {pastAttempts.length === 0 ? (
                <div className="p-6 text-center bg-[#F8FAF5] rounded-xl border border-[#E2EADF] text-xs text-[#658473]">
                  Chưa có lượt làm bài nào trong phiên này. Hãy bắt đầu luyện tập ở tab "Luyện Tập Từng Câu"!
                </div>
              ) : (
                <div className="space-y-2">
                  {pastAttempts.map((att) => (
                    <div
                      key={att.id}
                      className="p-3.5 rounded-xl bg-white border border-[#E2EADF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            att.isCorrect
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {att.isCorrect ? <Check className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#0F291E]">{att.exerciseId}</span>
                            <Badge variant={att.shapeId} size="xs">
                              {att.shapeId}
                            </Badge>
                            <span className="text-[#658473] font-mono text-[11px]">
                              {att.exerciseType}
                            </span>
                          </div>
                          {att.commonErrorTitle && (
                            <p className="text-[11px] text-rose-600 font-medium mt-0.5">
                              ⚠️ Lỗi: {att.commonErrorTitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto font-mono text-[#658473]">
                        <span>⏱️ {att.timeSpentSeconds}s</span>
                        <Badge variant={att.isCorrect ? 'success' : 'neutral'} size="xs">
                          {att.isCorrect ? `+${att.scoreAwarded} XP` : '0 XP'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
