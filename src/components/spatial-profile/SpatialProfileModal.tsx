/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SPATIAL THINKING PROFILE MODAL
 * Comprehensive Spatial Reasoning Profile integrating Thay Hieu AI, 8 Spatial Dimensions, and Learning Analytics.
 */

import React, { useEffect } from 'react';
import { useSpatialProfileStore } from '../../stores/useSpatialProfileStore';
import { SpatialMetricKey, SuggestedPractice, TeacherChallenge } from '../../types/spatialProfile';
import { SpatialMetricCard } from './SpatialMetricCard';
import { SpatialInsightCard } from './SpatialInsightCard';
import { SpatialRecommendationCard } from './SpatialRecommendationCard';
import { SpatialTimelineCard } from './SpatialTimelineCard';
import { SpatialChallengeCard } from './SpatialChallengeCard';
import { SpatialConceptMasteryCard } from './SpatialConceptMasteryCard';
import { TeacherProfileSpeech } from './TeacherProfileSpeech';
import { useApp } from '../../context/AppContext';
import {
  X,
  UserCheck,
  Sparkles,
  Trophy,
  Flame,
  Brain,
  RotateCcw,
  GraduationCap
} from 'lucide-react';

export interface SpatialProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpatialProfileModal: React.FC<SpatialProfileModalProps> = ({
  isOpen,
  onClose
}) => {
  const {
    scores,
    level,
    levelTitle,
    xp,
    nextLevelXp,
    strengths,
    suggestedPractices,
    timeline,
    teacherReview,
    dailyChallenge,
    resetProfile
  } = useSpatialProfileStore();

  const { navigateTo, setSelectedShape } = useApp();

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const metricKeys: SpatialMetricKey[] = [
    'shapeRecognition',
    'spatialOrientation',
    'elementIdentification',
    'spatialTransformation',
    'threeDToTwoD',
    'twoDToThreeD',
    'mathematicalModeling',
    'problemSolving'
  ];

  const handleSelectRecommendation = (rec: SuggestedPractice) => {
    if (rec.shape) {
      setSelectedShape(rec.shape);
    }
    navigateTo(rec.route as any);
    onClose();
  };

  const handleAcceptChallenge = (ch: TeacherChallenge) => {
    if (ch.targetShape) {
      setSelectedShape(ch.targetShape);
    }
    navigateTo(ch.route as any);
    onClose();
  };

  const handlePracticeNow = () => {
    if (suggestedPractices.length > 0) {
      handleSelectRecommendation(suggestedPractices[0]);
    } else {
      navigateTo('/explore');
      onClose();
    }
  };

  return (
    <div
      id="spatial-profile-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto"
    >
      <div
        id="spatial-profile-modal-container"
        className="bg-[#F8FAFC] rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden text-slate-800 my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="spatial-profile-title"
      >
        {/* 1. Modal Top Bar */}
        <div className="p-4 sm:p-6 bg-white border-b border-slate-200/80 flex items-center justify-between gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-md">
              <Brain className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 id="spatial-profile-title" className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                  HỒ SƠ TƯ DUY KHÔNG GIAN
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-black uppercase tracking-wider">
                  8 Chỉ số
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Hành trình khám phá hình học của em
              </p>
            </div>
          </div>

          {/* Right Stats & Close Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Level & XP Badge */}
            <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-orange-600" />
                <span className="text-xs font-bold text-slate-900">{levelTitle}</span>
              </div>
              <span className="text-xs font-black text-amber-600 font-mono">
                {xp} XP
              </span>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Đóng hồ sơ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Modal Body (Scrollable) */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* A. Thầy Hiếu Đọc Hồ Sơ (Direct Speech Card) */}
          <TeacherProfileSpeech
            speechText={teacherReview.speechText}
            onPracticeNow={handlePracticeNow}
            onLater={onClose}
          />

          {/* B. 8 Chỉ Số Năng Lực Tư Duy Không Gian */}
          <section id="section-spatial-metrics">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-orange-50 text-orange-600">
                  <UserCheck className="w-4 h-4" />
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                  8 CHỈ SỐ NĂNG LỰC TƯ DUY KHÔNG GIAN
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                Tự động đánh giá theo tương tác 3D
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {metricKeys.map((key) => (
                <SpatialMetricCard
                  key={key}
                  metricKey={key}
                  score={scores[key]}
                />
              ))}
            </div>
          </section>

          {/* C. Tiến Độ Làm Chủ Khái Niệm & Kỹ Năng (AI Error Memory & Mastery Check) */}
          <SpatialConceptMasteryCard />

          {/* D. Nhận Xét & Điểm Mạnh */}
          <SpatialInsightCard
            summary={teacherReview.summary}
            positiveNote={teacherReview.positiveNote}
            improvementArea={teacherReview.improvementArea}
            strengths={strengths}
          />

          {/* D. Thầy Đề Nghị Em Luyện (AI Adaptive Recommendations) */}
          <SpatialRecommendationCard
            recommendations={suggestedPractices}
            onSelectRecommendation={handleSelectRecommendation}
          />

          {/* E. Thử Thách Của Thầy (Special Inquiry Challenge) */}
          <SpatialChallengeCard
            challenge={dailyChallenge}
            onAcceptChallenge={handleAcceptChallenge}
          />

          {/* F. Hành Trình Khám Phá Của Em (Timeline) */}
          <SpatialTimelineCard timeline={timeline} />
        </div>

        {/* 3. Modal Footer */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
          <button
            type="button"
            onClick={resetProfile}
            className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer transition-colors"
            title="Đặt lại dữ liệu mô phỏng hồ sơ"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Đặt lại hồ sơ mặc định</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              Tiếp tục học tập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
