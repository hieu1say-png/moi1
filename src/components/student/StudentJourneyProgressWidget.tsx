/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - StudentJourneyProgressWidget
 * "TIẾN ĐỘ CỦA EM & TIẾP TỤC HỌC"
 * Section XVI Dashboard Requirement:
 * - Chủ đề đang học + % tiến độ + Nút [TIẾP TỤC HỌC] mở đúng hoạt động dang dở
 * - Chủ đề đã hoàn thành
 * - Video đã xem (trụ.mp4, cầu.mp4, nón.mp4)
 * - Bài tập đã làm & số câu đúng
 * - Nội dung cần ôn lại (Điểm yếu phát hiện)
 */

import React, { useState, useEffect } from 'react';
import { ShapeType } from '../../types';
import { StudentProgressService, StudentProgressRecord } from '../../services/studentProgressService';
import { useApp } from '../../context/AppContext';
import { LearningJourneyModal } from '../journey/LearningJourneyModal';
import {
  PlayCircle,
  Award,
  Video,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Box,
  RotateCcw,
  Clock
} from 'lucide-react';

export const StudentJourneyProgressWidget: React.FC = () => {
  const { settings } = useApp();
  const [progress, setProgress] = useState<StudentProgressRecord | null>(null);
  const [activeModalShape, setActiveModalShape] = useState<ShapeType | null>(null);
  const [activeModalStep, setActiveModalStep] = useState<number>(1);

  useEffect(() => {
    StudentProgressService.fetchProgress('usr-student-001', settings.studentName, settings.className)
      .then(setProgress);

    const unsubscribe = StudentProgressService.subscribe(setProgress);
    return () => unsubscribe();
  }, [settings.studentName, settings.className]);

  if (!progress) {
    return null;
  }

  // Calculate high-level stats
  const topicsList: ShapeType[] = ['cylinder', 'sphere', 'cone'];
  const completedTopics = topicsList.filter((s) => progress.topics[s]?.overallProgress === 100);
  const currentTopicKey = progress.lastActiveTopic || 'cylinder';
  const currentTopicData = progress.topics[currentTopicKey];
  const currentProgressPct = currentTopicData?.overallProgress || 0;

  // Count videos watched
  const watchedVideos = topicsList.filter(
    (s) => progress.topics[s]?.activities?.video?.status === 'COMPLETED'
  ).length;

  // Calculate total questions done and correct
  let totalQuestions = 0;
  let totalCorrect = 0;
  const allWeaknesses: string[] = [];

  topicsList.forEach((s) => {
    const pAct = progress.topics[s]?.activities?.practice;
    if (pAct && pAct.questionsTotal) {
      totalQuestions += pAct.questionsTotal;
      totalCorrect += pAct.questionsCorrect || 0;
    }
    if (progress.topics[s]?.weaknesses) {
      allWeaknesses.push(...(progress.topics[s]?.weaknesses || []));
    }
  });

  const uniqueWeaknesses = Array.from(new Set(allWeaknesses));

  // Determine which step to resume when clicking "TIẾP TỤC HỌC"
  const getResumeStep = (shape: ShapeType): number => {
    const act = progress.topics[shape]?.activities;
    if (!act) return 1;
    if (act.theory?.status !== 'COMPLETED') return 1;
    if (act.video?.status !== 'COMPLETED') return 2;
    if (act.explore3d?.status !== 'COMPLETED') return 3;
    if (act.realworld?.status !== 'COMPLETED') return 4;
    if (act.practice?.status !== 'COMPLETED') return 5;
    return 6;
  };

  const handleContinueLearning = () => {
    const step = getResumeStep(currentTopicKey);
    setActiveModalStep(step);
    setActiveModalShape(currentTopicKey);
  };

  const handleOpenJourney = (shape: ShapeType, step: number = 1) => {
    setActiveModalStep(step);
    setActiveModalShape(shape);
  };

  const shapeNames: Record<ShapeType, string> = {
    cylinder: 'Hình Trụ',
    sphere: 'Hình Cầu',
    cone: 'Hình Nón'
  };

  return (
    <>
      <section
        id="student-journey-dashboard"
        className="rounded-2xl sm:rounded-[22px] bg-[#FFFDF8] border border-[#E5DCCF] p-4.5 sm:p-6 shadow-xs space-y-5"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5DCCF] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FDF0ED] border border-[#F4D2CA] flex items-center justify-center text-[#8F3E32]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#8F3E32] uppercase tracking-wider bg-[#FDF0ED] px-2 py-0.5 rounded-full border border-[#F4D2CA]">
                  Hệ Thống Tự Học Có Hướng Dẫn
                </span>
                <span className="text-xs text-[#766A61] font-medium hidden sm:inline">
                  Toán 9 Tuyển Sinh Vào 10
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3A302B] mt-0.5">
                Tiến Độ Của Em
              </h3>
            </div>
          </div>

          {/* Quick Resume Card Banner */}
          <div className="flex items-center gap-3 bg-[#FAF7F2] p-2.5 sm:px-4 sm:py-2 rounded-xl border border-[#E5DCCF]">
            <div className="text-left">
              <div className="text-[11px] text-[#766A61] font-medium">Bạn đang học:</div>
              <div className="text-xs sm:text-sm font-bold text-[#8F3E32]">
                {shapeNames[currentTopicKey]} – {currentProgressPct}%
              </div>
            </div>
            <button
              type="button"
              onClick={handleContinueLearning}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#8F3E32] text-white text-xs font-bold hover:bg-[#723228] transition-colors shadow-xs"
            >
              <span>TIẾP TỤC HỌC</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Statistical Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Metric 1: Chủ đề hoàn thành */}
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E5DCCF] space-y-1">
            <div className="flex items-center justify-between text-xs text-[#766A61]">
              <span>Chủ đề xong</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-lg font-bold text-[#3A302B]">
              {completedTopics.length} / 3 <span className="text-xs text-[#766A61] font-normal">chủ đề</span>
            </div>
            <div className="w-full bg-[#E5DCCF] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all"
                style={{ width: `${(completedTopics.length / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Metric 2: Video đã xem */}
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E5DCCF] space-y-1">
            <div className="flex items-center justify-between text-xs text-[#766A61]">
              <span>Video bài học</span>
              <Video className="w-3.5 h-3.5 text-[#8F3E32]" />
            </div>
            <div className="text-lg font-bold text-[#8F3E32]">
              {watchedVideos} / 3 <span className="text-xs text-[#766A61] font-normal">video</span>
            </div>
            <div className="text-[11px] text-[#766A61]">
              {watchedVideos === 3 ? 'Đã xem trọn bộ 3 video' : 'Cần xem đủ 3 video chuẩn'}
            </div>
          </div>

          {/* Metric 3: Bài tập & câu đúng */}
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E5DCCF] space-y-1">
            <div className="flex items-center justify-between text-xs text-[#766A61]">
              <span>Bài tập đã làm</span>
              <Award className="w-3.5 h-3.5 text-[#997129]" />
            </div>
            <div className="text-lg font-bold text-emerald-700">
              {totalCorrect} / {totalQuestions || 15} <span className="text-xs text-[#766A61] font-normal">câu đúng</span>
            </div>
            <div className="text-[11px] text-[#766A61]">
              Độ chính xác: {totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0}%
            </div>
          </div>

          {/* Metric 4: Nội dung cần ôn lại */}
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E5DCCF] space-y-1">
            <div className="flex items-center justify-between text-xs text-[#766A61]">
              <span>Cần ôn lại</span>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div className="text-lg font-bold text-amber-700">
              {uniqueWeaknesses.length} <span className="text-xs text-[#766A61] font-normal">nội dung</span>
            </div>
            <div className="text-[11px] text-[#766A61] truncate">
              {uniqueWeaknesses.length > 0 ? uniqueWeaknesses[0] : 'Chưa có lỗi đáng ngại'}
            </div>
          </div>
        </div>

        {/* 3 Interactive Learning Journey Topic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
          {topicsList.map((shape) => {
            const topic = progress.topics[shape];
            const pct = topic?.overallProgress || 0;
            const isFinished = pct === 100;
            const isCurrent = currentTopicKey === shape;
            const act = topic?.activities;

            return (
              <div
                key={shape}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                  isCurrent
                    ? 'bg-white border-[#8F3E32] ring-1 ring-[#8F3E32]/20 shadow-xs'
                    : 'bg-[#FAF7F2]/80 border-[#E5DCCF] hover:bg-white hover:border-[#DAC9B7]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-base text-[#3A302B]">
                      {shapeNames[shape]}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        isFinished
                          ? 'bg-emerald-100 text-emerald-800'
                          : pct > 0
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-[#EADBCC] text-[#766A61]'
                      }`}
                    >
                      {pct}%
                    </span>
                  </div>

                  {/* Step status icons list */}
                  <div className="grid grid-cols-5 gap-1.5 mt-3 pt-2 border-t border-[#E5DCCF]/60 text-center">
                    <div
                      title="Video bài học"
                      className={`p-1.5 rounded-lg text-[10px] font-bold ${
                        act?.video?.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#F4EEE4] text-[#A0958B]'
                      }`}
                    >
                      Video
                    </div>
                    <div
                      title="Khám phá kiến thức"
                      className={`p-1.5 rounded-lg text-[10px] font-bold ${
                        act?.theory?.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#F4EEE4] text-[#A0958B]'
                      }`}
                    >
                      Lý thuyết
                    </div>
                    <div
                      title="Tương tác 3D"
                      className={`p-1.5 rounded-lg text-[10px] font-bold ${
                        act?.explore3d?.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#F4EEE4] text-[#A0958B]'
                      }`}
                    >
                      3D
                    </div>
                    <div
                      title="Ứng dụng thực tiễn"
                      className={`p-1.5 rounded-lg text-[10px] font-bold ${
                        act?.realworld?.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#F4EEE4] text-[#A0958B]'
                      }`}
                    >
                      Thực tế
                    </div>
                    <div
                      title="Luyện tập trắc nghiệm"
                      className={`p-1.5 rounded-lg text-[10px] font-bold ${
                        act?.practice?.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#F4EEE4] text-[#A0958B]'
                      }`}
                    >
                      Luyện tập
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E5DCCF]/60">
                  <button
                    type="button"
                    onClick={() => handleOpenJourney(shape, getResumeStep(shape))}
                    className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                      isCurrent
                        ? 'bg-[#8F3E32] text-white hover:bg-[#723228]'
                        : 'bg-[#F4EEE4] text-[#594D46] hover:bg-[#EADBCC]'
                    }`}
                  >
                    <span>{pct === 0 ? 'Bắt Đầu Hành Trình' : pct === 100 ? 'Học Lại / Ôn Tập' : 'Tiếp Tục Hành Trình'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Weaknesses / Review Recommendations */}
        {uniqueWeaknesses.length > 0 && (
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="text-xs sm:text-sm leading-relaxed">
                <strong>Nội dung cần chú ý ôn lại:</strong>{' '}
                {uniqueWeaknesses.slice(0, 3).join(' • ')}
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleOpenJourney(currentTopicKey, 5)}
              className="shrink-0 px-3 py-1.5 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold text-xs transition-colors"
            >
              Luyện Tập Ngay
            </button>
          </div>
        )}
      </section>

      {/* Complete Guided Learning Journey Modal */}
      {activeModalShape && (
        <LearningJourneyModal
          shapeType={activeModalShape}
          initialStep={activeModalStep}
          onClose={() => setActiveModalShape(null)}
        />
      )}
    </>
  );
};
