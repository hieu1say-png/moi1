/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Complete Learning Journey Experience
 * Unified 6-Step Guided Learning Path for Grade 9 Geometry:
 *  01 Xem video bài học cố định (trụ.mp4, cầu.mp4, nón.mp4)
 *  02 Khám phá kiến thức (KnowledgeCards với KaTeX)
 *  03 Khám phá 3D (ThreeDViewer tương tác thực tế)
 *  04 Ứng dụng thực tế (RealWorldProblem với cơ chế gợi ý 4 cấp độ)
 *  05 Luyện tập trắc nghiệm (PracticeQuiz 100% MCQ 4 lựa chọn, giải chi tiết 4 bước)
 *  06 Hoàn thành chủ đề & Tổng kết tiến độ
 */

import React, { useState, useEffect, useRef } from 'react';
import { ShapeType } from '../../types';
import { SHAPE_VIDEO_LESSONS, getLessonVideoForShape } from '../../data/shapeVideoConfig';
import { StudentProgressService, StudentProgressRecord } from '../../services/studentProgressService';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { KnowledgeCards } from './KnowledgeCards';
import { RealWorldProblem } from './RealWorldProblem';
import { PracticeQuiz } from './PracticeQuiz';
import { ThreeDViewer } from '../explore/ThreeDViewer';
import { LessonVideo } from '../video/LessonVideo';
import { MathFormula, MathText } from '../common/MathFormula';
import {
  Video,
  BookOpen,
  Box,
  Globe,
  Award,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Sparkles,
  Trophy,
  ArrowRight,
  Layers
} from 'lucide-react';

interface LearningJourneyModalProps {
  shapeType: ShapeType;
  initialStep?: number;
  onClose: () => void;
}

const STEP_DEFINITIONS = [
  { step: 1, id: 'theory', title: '01. Lý Thuyết', subtitle: 'Khái niệm & công thức', icon: BookOpen },
  { step: 2, id: 'video', title: '02. Video Bài Học', subtitle: 'Video bài giảng trọng tâm', icon: Video },
  { step: 3, id: 'explore3d', title: '03. Khám Phá 3D', subtitle: 'Mô hình không gian tương tác', icon: Box },
  { step: 4, id: 'realworld', title: '04. Thực Tiễn', subtitle: 'Giải quyết vấn đề thực tế', icon: Globe },
  { step: 5, id: 'practice', title: '05. Luyện Tập', subtitle: 'Trắc nghiệm & giải 4 bước', icon: Award },
  { step: 6, id: 'finish', title: '06. Hoàn Thành', subtitle: 'Báo cáo & chứng nhận', icon: CheckCircle2 }
];

export const LearningJourneyModal: React.FC<LearningJourneyModalProps> = ({
  shapeType,
  initialStep = 1,
  onClose
}) => {
  const { userStats, settings, markPracticeDone } = useApp();
  const { showSuccess, showInfo } = useToast();

  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [studentProgress, setStudentProgress] = useState<StudentProgressRecord | null>(null);

  // 3D Model Parameters for Step 3
  const [radius3D, setRadius3D] = useState<number>(shapeType === 'cone' ? 2 : 4);
  const [height3D, setHeight3D] = useState<number>(shapeType === 'cone' ? 4 : 8);
  const [viewMode3D, setViewMode3D] = useState<'solid' | 'wireframe' | 'cross-section'>('solid');
  const [isAutoRotating3D, setIsAutoRotating3D] = useState<boolean>(false);

  // Video State for Step 1
  const videoLesson = getLessonVideoForShape(shapeType);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.9);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(15);
  const [videoStarted, setVideoStarted] = useState<boolean>(false);
  const [videoCompleted, setVideoCompleted] = useState<boolean>(false);

  // Practice Quiz Results
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number } | null>(null);

  // Load progress on mount
  useEffect(() => {
    StudentProgressService.fetchProgress('usr-student-001', settings.studentName, settings.className)
      .then((rec) => {
        setStudentProgress(rec);
      });

    const unsubscribe = StudentProgressService.subscribe((rec) => {
      setStudentProgress(rec);
    });

    return () => unsubscribe();
  }, [settings.studentName, settings.className]);

  // Video playback listeners
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const handleTimeUpdate = () => {
      setCurrentTime(vid.currentTime);
      if (vid.duration && !isNaN(vid.duration)) {
        setDuration(vid.duration);
      }
      if (vid.currentTime > 2 && !videoStarted) {
        setVideoStarted(true);
        StudentProgressService.updateActivity('usr-student-001', shapeType, 'video', 'IN_PROGRESS', {
          stepIndex: 1,
          videoProgress: vid.currentTime
        });
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setVideoCompleted(true);
      StudentProgressService.updateActivity('usr-student-001', shapeType, 'video', 'COMPLETED', {
        stepIndex: 1,
        score: 100,
        videoProgress: duration
      });
      showSuccess('Tuyệt vời! Bạn đã hoàn thành bước xem video bài học (+50 XP).');
    };

    vid.addEventListener('timeupdate', handleTimeUpdate);
    vid.addEventListener('ended', handleEnded);

    return () => {
      vid.removeEventListener('timeupdate', handleTimeUpdate);
      vid.removeEventListener('ended', handleEnded);
    };
  }, [shapeType, videoStarted, duration, showSuccess]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setVideoStarted(true);
      }).catch((e) => {
        console.warn('Playback error', e);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const handleSeekTo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      setCurrentTime(seconds);
      if (!isPlaying) {
        videoRef.current.play().then(() => setIsPlaying(true));
      }
    }
  };

  // Step Completion Handlers
  const handleCompleteKnowledge = () => {
    StudentProgressService.updateActivity('usr-student-001', shapeType, 'theory', 'COMPLETED', {
      stepIndex: 2,
      score: 100
    });
  };

  const handleComplete3D = () => {
    StudentProgressService.updateActivity('usr-student-001', shapeType, 'explore3d', 'COMPLETED', {
      stepIndex: 3,
      score: 100
    });
    showSuccess('Đã hoàn thành khám phá mô hình 3D (+50 XP)!');
    setCurrentStep(4);
  };

  const handleCompleteRealWorld = () => {
    StudentProgressService.updateActivity('usr-student-001', shapeType, 'realworld', 'COMPLETED', {
      stepIndex: 4,
      score: 100
    });
    showSuccess('Đã hoàn thành ứng dụng thực tiễn (+100 XP)!');
  };

  const handleCompleteQuiz = (correct: number, total: number, weaknesses: string[]) => {
    setQuizScore({ correct, total });
    markPracticeDone(`journey-${shapeType}-${Date.now()}`, correct * 30);
    StudentProgressService.updateActivity('usr-student-001', shapeType, 'practice', 'COMPLETED', {
      stepIndex: 5,
      score: Math.round((correct / total) * 100),
      questionsCorrect: correct,
      questionsTotal: total,
      weaknesses
    });
    showSuccess(`Đã nộp bài luyện tập: ${correct}/${total} câu đúng!`);
  };

  const currentTopicProgress = studentProgress?.topics[shapeType];
  const shapeTitle = shapeType === 'cylinder' ? 'Hình Trụ' : shapeType === 'sphere' ? 'Hình Cầu' : 'Hình Nón';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#FFFDF8] border border-[#E5DCCF] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden animate-scaleUp">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#E5DCCF] bg-gradient-to-r from-[#FAF7F2] to-white shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#8F3E32]" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#8F3E32] uppercase tracking-wider bg-[#FDF0ED] px-2.5 py-0.5 rounded-full border border-[#F4D2CA]">
                  Hành Trình Tự Học Có Hướng Dẫn
                </span>
                <span className="text-xs text-[#766A61] font-medium hidden sm:inline">
                  Toán 9 Tuyển Sinh Vào 10
                </span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#3A302B] mt-0.5">
                Chuyên Đề: {shapeTitle}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#766A61] hover:text-[#3A302B] hover:bg-[#F4EEE4] transition-colors"
            title="Đóng hành trình"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 6-Step Visual Journey Stepper */}
        <div className="px-4 sm:px-6 py-3 border-b border-[#E5DCCF] bg-[#FAF7F2] shrink-0 overflow-x-auto scrollbar-none">
          <div className="flex items-center justify-between min-w-[580px] gap-2">
            {STEP_DEFINITIONS.map((s, idx) => {
              const Icon = s.icon;
              const isCurrent = currentStep === s.step;
              const isPast = currentStep > s.step;
              const actKey = s.id as 'video' | 'theory' | 'explore3d' | 'realworld' | 'practice';
              const actStatus = currentTopicProgress?.activities[actKey]?.status;
              const isDone = actStatus === 'COMPLETED' || isPast;

              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setCurrentStep(s.step)}
                  className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl transition-all ${
                    isCurrent
                      ? 'bg-[#8F3E32] text-white shadow-xs font-bold'
                      : isDone
                      ? 'bg-[#EADBCC] text-[#3A302B] font-semibold hover:bg-[#DAC9B7]'
                      : 'text-[#766A61] hover:bg-[#F4EEE4]'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${
                      isCurrent
                        ? 'bg-white/20 text-white'
                        : isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#E5DCCF] text-[#594D46]'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.step}
                  </div>
                  <div className="text-left">
                    <div className="text-xs whitespace-nowrap">{s.title}</div>
                  </div>
                  {idx < STEP_DEFINITIONS.length - 1 && (
                    <ChevronRight className={`w-3.5 h-3.5 ml-1 opacity-40 ${isCurrent ? 'text-white' : 'text-[#766A61]'}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Body Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* STEP 1: KHÁM PHÁ KIẾN THỨC & LÝ THUYẾT (KnowledgeCards) */}
          {currentStep === 1 && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#8F3E32] uppercase tracking-wider">
                  Bước 1 / 6: Khám Phá Lý Thuyết
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3A302B]">
                  Hệ Thống Kiến Thức Cốt Lõi {shapeTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#766A61]">
                  Xem kỹ các khái niệm, thông số hình học và công thức tính toán.
                </p>
              </div>

              <KnowledgeCards shapeType={shapeType} onCompleted={handleCompleteKnowledge} />

              <div className="flex items-center justify-between pt-4 border-t border-[#E5DCCF]">
                <span className="text-xs text-[#766A61]">
                  Nắm vững lý thuyết trước khi theo dõi video bài giảng trọng tâm
                </span>

                <button
                  type="button"
                  onClick={() => {
                    handleCompleteKnowledge();
                    setCurrentStep(2);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8F3E32] text-white font-bold text-xs sm:text-sm hover:bg-[#723228] transition-colors shadow-xs"
                >
                  <span>Tiếp Tục: Video Bài Học</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: XEM VIDEO BÀI HỌC CỐ ĐỊNH */}
          {currentStep === 2 && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#8F3E32] uppercase tracking-wider">
                    Bước 2 / 6: Video Bài Học Chuẩn SGK
                  </span>
                  <span className="text-xs text-[#766A61]">Học liệu số hệ thống</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3A302B]">
                  {shapeType === 'cylinder'
                    ? 'Video bài học Hình trụ'
                    : shapeType === 'cone'
                    ? 'Video bài học Hình nón'
                    : 'Video bài học Hình cầu'}
                </h3>
                <p className="text-xs sm:text-sm text-[#766A61]">
                  Theo dõi bài giảng phân tích chi tiết định nghĩa, công thức diện tích và thể tích.
                </p>
              </div>

              {/* Lesson Video Player or Zero-Fake Clean State */}
              {videoLesson?.src ? (
                <LessonVideo shape={shapeType} source={videoLesson.src} />
              ) : (
                <div className="bg-[#FAF7F2] border border-[#E5DCCF] rounded-2xl p-6 text-center space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                    <Video className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#3A302B]">
                    Video bài học chưa có sẵn trên hệ thống lưu trữ
                  </h4>
                  <p className="text-xs text-[#766A61] max-w-md mx-auto">
                    Chính sách kiểm duyệt: Video bài giảng chuẩn cho chủ đề này đang chờ Giáo viên tải lên tệp thực tế. Em hãy chuyển sang bước tiếp theo để khám phá mô hình không gian 3D tương tác.
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E5DCCF]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F4EEE4] text-[#594D46] font-bold text-xs hover:bg-[#EADBCC]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Quay lại Lý Thuyết</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(3);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8F3E32] text-white font-bold text-xs sm:text-sm hover:bg-[#723228] transition-colors shadow-xs"
                >
                  <span>Sang Khám Phá 3D</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: KHÁM PHÁ 3D */}
          {currentStep === 3 && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#8F3E32] uppercase tracking-wider">
                  Bước 3 / 6: Khám Phá Không Gian 3D
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3A302B]">
                  Mô Hình Tương Tác 3D {shapeTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#766A61]">
                  Xoay, phóng to/thu nhỏ và điều chỉnh các thông số bán kính, chiều cao trong không gian thực nghiệm.
                </p>
              </div>

              {/* 3D Canvas Embed */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-[#E5DCCF] h-[360px] sm:h-[420px] bg-slate-900 relative">
                  <ThreeDViewer
                    shape={shapeType}
                    radius={radius3D}
                    height={height3D}
                    viewMode={viewMode3D}
                    showAxes={true}
                    isAutoRotating={isAutoRotating3D}
                    onParameterChange={(r, h) => {
                      setRadius3D(r);
                      setHeight3D(h);
                    }}
                  />
                </div>

                {/* 3D Controls Sidebar */}
                <div className="lg:col-span-4 space-y-4 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5DCCF]">
                  <h4 className="font-serif font-bold text-sm text-[#3A302B]">
                    Điều Khiển Mô Hình 3D
                  </h4>

                  {/* Radius Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-[#594D46]">
                      <span>Bán kính r:</span>
                      <span className="font-mono text-[#8F3E32]">{radius3D} cm</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={6}
                      step={0.5}
                      value={radius3D}
                      onChange={(e) => setRadius3D(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-[#E5DCCF] rounded-lg accent-[#8F3E32] cursor-pointer"
                    />
                  </div>

                  {/* Height Slider (for cylinder and cone) */}
                  {shapeType !== 'sphere' && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-[#594D46]">
                        <span>Chiều cao h:</span>
                        <span className="font-mono text-[#8F3E32]">{height3D} cm</span>
                      </div>
                      <input
                        type="range"
                        min={2}
                        max={10}
                        step={0.5}
                        value={height3D}
                        onChange={(e) => setHeight3D(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-[#E5DCCF] rounded-lg accent-[#8F3E32] cursor-pointer"
                      />
                    </div>
                  )}

                  {/* View Mode */}
                  <div className="space-y-1 pt-1">
                    <span className="text-xs font-bold text-[#594D46]">Chế độ hiển thị:</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setViewMode3D('solid')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          viewMode3D === 'solid'
                            ? 'bg-[#8F3E32] text-white'
                            : 'bg-white border border-[#E5DCCF] text-[#594D46]'
                        }`}
                      >
                        Khối đặc
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode3D('wireframe')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          viewMode3D === 'wireframe'
                            ? 'bg-[#8F3E32] text-white'
                            : 'bg-white border border-[#E5DCCF] text-[#594D46]'
                        }`}
                      >
                        Khung dây
                      </button>
                    </div>
                  </div>

                  {/* Auto Rotate Toggle */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAutoRotating3D((prev) => !prev)}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition-colors ${
                        isAutoRotating3D
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-white border border-[#E5DCCF] text-[#594D46] hover:bg-[#F4EEE4]'
                      }`}
                    >
                      {isAutoRotating3D ? 'Tắt tự động xoay' : 'Bật tự động xoay 360°'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E5DCCF]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F4EEE4] text-[#594D46] font-bold text-xs hover:bg-[#EADBCC]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Quay lại Kiến thức</span>
                </button>

                <button
                  type="button"
                  onClick={handleComplete3D}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8F3E32] text-white font-bold text-xs sm:text-sm hover:bg-[#723228] transition-colors shadow-xs"
                >
                  <span>Sang Ứng Dụng Thực Tiễn</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ỨNG DỤNG THỰC TẾ (RealWorldProblem) */}
          {currentStep === 4 && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#8F3E32] uppercase tracking-wider">
                  Bước 4 / 6: Ứng Dụng Thực Tiễn
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3A302B]">
                  Giải Quyết Bài Toán Đời Sống &amp; Kỹ Thuật
                </h3>
                <p className="text-xs sm:text-sm text-[#766A61]">
                  Thử thách bản thân qua cấu trúc: Bối cảnh → Dữ kiện → Yêu cầu → Gợi ý 4 bước → Lời giải.
                </p>
              </div>

              <RealWorldProblem shapeType={shapeType} onCompleted={handleCompleteRealWorld} />

              <div className="flex items-center justify-between pt-4 border-t border-[#E5DCCF]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F4EEE4] text-[#594D46] font-bold text-xs hover:bg-[#EADBCC]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Quay lại Khám phá 3D</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleCompleteRealWorld();
                    setCurrentStep(5);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8F3E32] text-white font-bold text-xs sm:text-sm hover:bg-[#723228] transition-colors shadow-xs"
                >
                  <span>Sang Luyện Tập Trắc Nghiệm</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: LUYỆN TẬP TRẮC NGHIỆM (PracticeQuiz) */}
          {currentStep === 5 && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#8F3E32] uppercase tracking-wider">
                  Bước 5 / 6: Luyện Tập Trắc Nghiệm
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3A302B]">
                  Luyện Tập Trắc Nghiệm Tuyển Sinh Vào 10
                </h3>
                <p className="text-xs sm:text-sm text-[#766A61]">
                  100% trắc nghiệm 4 lựa chọn (A, B, C, D). Sau khi nộp bài sẽ xem ngay lời giải 4 bước chi tiết!
                </p>
              </div>

              <PracticeQuiz shapeType={shapeType} onCompleted={handleCompleteQuiz} />

              <div className="flex items-center justify-between pt-4 border-t border-[#E5DCCF]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F4EEE4] text-[#594D46] font-bold text-xs hover:bg-[#EADBCC]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Quay lại Thực tiễn</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(6)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8F3E32] text-white font-bold text-xs sm:text-sm hover:bg-[#723228] transition-colors shadow-xs"
                >
                  <span>Hoàn Thành Chủ Đề</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: HOÀN THÀNH CHỦ ĐỀ */}
          {currentStep === 6 && (
            <div className="space-y-6 max-w-2xl mx-auto py-6 text-center">
              <div className="w-20 h-20 rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center mx-auto shadow-md">
                <Trophy className="w-10 h-10 text-amber-600" />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                  🎉 CHÚC MỪNG HOÀN THÀNH!
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3A302B]">
                  Bạn Đã Hoàn Thành Hành Trình {shapeTitle}!
                </h3>
                <p className="text-xs sm:text-sm text-[#766A61] max-w-md mx-auto">
                  Bạn đã đi trọn vẹn 5 chặng học tập: xem video, nắm chắc kiến thức, tương tác không gian 3D, giải bài toán thực tế và làm bài kiểm tra trắc nghiệm.
                </p>
              </div>

              {/* Badges / Metrics */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DCCF]">
                <div className="space-y-0.5">
                  <div className="text-xs text-[#766A61]">Tiến độ chủ đề</div>
                  <div className="text-lg font-bold text-emerald-700">100%</div>
                </div>
                <div className="space-y-0.5 border-x border-[#E5DCCF]">
                  <div className="text-xs text-[#766A61]">Kinh nghiệm</div>
                  <div className="text-lg font-bold text-[#997129]">+250 XP</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs text-[#766A61]">Trạng thái</div>
                  <div className="text-lg font-bold text-[#8F3E32]">Đạt Chuẩn</div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#8F3E32] text-white font-bold text-xs sm:text-sm hover:bg-[#723228] transition-colors shadow-xs"
                >
                  Quay Về Trang Chủ &amp; Bảng Tiến Độ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
