/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Theory View (Lý Thuyết Hình Học Không Gian 9 - Warm Ivory Theme)
 * 3 Core Topics: Hình Trụ (Cylinder), Hình Cầu (Sphere), Hình Nón (Cone)
 * Pedagogical Flow: Giải thích → Hình minh họa → Tương tác → Quiz nhanh
 * 5 Standard Sections per Topic:
 * 1. Nhận biết (Recognition & Spatial Rotation)
 * 2. Đặc điểm (Characteristics, Elements & Cross-sections)
 * 3. Công thức (Formulas & Derivations via KaTeX)
 * 4. Ví dụ (Step-by-step Real-world Examples)
 * 5. Kiểm tra nhanh (Interactive Quick Quiz with immediate feedback)
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { TheoryVideoService } from '../services/theoryVideoService';
import { TheoryVideo } from '../types/theoryVideo';
import { GeometryDataService } from '../data';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { MathFormula, MathText } from '../components/common/MathFormula';
import { ShapeIllustration } from '../components/common/ShapeIllustration';
import { VisualIllusionPuzzle } from '../components/explore/VisualIllusionPuzzle';
import { LessonVideo } from '../components/video/LessonVideo';
import { VideoErrorBoundary } from '../components/common/VideoErrorBoundary';
import { lessonVideos } from '../config/videoConfig';
import { Theory3DPanel } from '../components/theory/Theory3DPanel';
import { ConeCreationMode } from '../components/explore/3d/cone-creation/ConeCreationMode';
import { SphereCreationMode } from '../components/explore/3d/sphere-creation/SphereCreationMode';
import { RealWorldProblem } from '../components/journey/RealWorldProblem';
import { PracticeQuiz } from '../components/journey/PracticeQuiz';
import { ShapeType } from '../types';
import { ShapeThemeKey } from '../design-system/tokens';
import {
  BookOpen,
  Eye,
  Layers,
  Calculator,
  FileSpreadsheet,
  Sparkles,
  RotateCw,
  Scissors,
  CheckCircle2,
  Copy,
  ArrowRight,
  Compass,
  Lightbulb,
  Check,
  Video,
  Box,
  Globe,
  Award,
  Upload,
  RefreshCw,
  Plus,
  X,
  AlertCircle,
  FileVideo,
  Trash2,
  Settings,
  Film
} from 'lucide-react';

type TheorySectionTab = 'recognition' | 'characteristics' | 'formulas' | 'examples';

export const TheoryView: React.FC = () => {
  const { selectedShape, setSelectedShape, markTheoryRead, userStats, navigateTo } = useApp();
  const { showSuccess, showError } = useToast();
  const { isTeacher, isStudentPreview } = useAuth();
  const showTeacherVideoControls = isTeacher && !isStudentPreview;

  const [activeSection, setActiveSection] = useState<TheorySectionTab>('recognition');

  // Dynamic interactive simulation toggles inside theory
  const [isRotating] = useState(false);

  // Persistent Video System States
  const [assignedVideo, setAssignedVideo] = useState<TheoryVideo | null>(null);
  const [hasRealVideo, setHasRealVideo] = useState<boolean>(false);
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);

  // Teacher Video Management Modals & States
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState<boolean>(false);
  const [availableVideos, setAvailableVideos] = useState<TheoryVideo[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadTitle, setUploadTitle] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const detailedData = GeometryDataService.getDetailedTheory(selectedShape);
  const isCompleted = userStats.completedTheories.includes(selectedShape);
  const themeKey: ShapeThemeKey = selectedShape as ShapeThemeKey;

  // Load Assigned Video for the current shape
  const loadAssignedVideo = useCallback(async () => {
    setIsVideoLoading(true);
    try {
      const res = await TheoryVideoService.getAssignedVideo(selectedShape);
      if (res.hasVideo && res.video) {
        setAssignedVideo(res.video);
        setHasRealVideo(true);
      } else {
        setAssignedVideo(null);
        setHasRealVideo(false);
      }
    } catch (e) {
      console.warn('[THEORY-VIEW] Lỗi kiểm tra video được gán:', e);
      setAssignedVideo(null);
      setHasRealVideo(false);
    } finally {
      setIsVideoLoading(false);
    }
  }, [selectedShape]);

  useEffect(() => {
    loadAssignedVideo();

    const onAssigned = (e: any) => {
      if (!e.detail?.shape || e.detail.shape === selectedShape) {
        loadAssignedVideo();
      }
    };
    window.addEventListener('geometry_lab_video_assigned', onAssigned);
    return () => {
      window.removeEventListener('geometry_lab_video_assigned', onAssigned);
    };
  }, [selectedShape, loadAssignedVideo]);

  // Teacher Actions
  const handleOpenUploadModal = () => {
    setUploadTitle(`Video bài học ${detailedData.vietnameseName}`);
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploadModalOpen(true);
  };

  const handleOpenSelectModal = async () => {
    try {
      const list = await TheoryVideoService.fetchVideosFromServer();
      setAvailableVideos(list);
      setIsSelectModalOpen(true);
    } catch {
      showError('Lỗi', 'Không thể nạp danh sách video từ máy chủ');
    }
  };

  const handleAssignExistingVideo = async (videoId: string) => {
    const res = await TheoryVideoService.assignVideo(selectedShape, videoId);
    if (res.success) {
      showSuccess('Thành công', `Đã gán video cho ${detailedData.vietnameseName}!`);
      setIsSelectModalOpen(false);
      await loadAssignedVideo();
    } else {
      showError('Lỗi', res.error || 'Không thể gán video');
    }
  };

  const handleUnassignVideo = async () => {
    if (
      !window.confirm(
        `Thầy/Cô có chắc chắn muốn gỡ video bài học khỏi ${detailedData.vietnameseName} không? Khi gỡ, học sinh sẽ không nhìn thấy khung video nữa.`
      )
    ) {
      return;
    }
    const res = await TheoryVideoService.assignVideo(selectedShape, null);
    if (res.success) {
      showSuccess(
        'Đã gỡ video',
        `Đã gỡ video bài học khỏi ${detailedData.vietnameseName}. Khung video hiện đã được ẩn đối với học sinh.`
      );
      await loadAssignedVideo();
    } else {
      showError('Lỗi', res.error || 'Không thể gỡ video');
    }
  };

  const handleStartUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      showError('Lỗi', 'Vui lòng chọn một tệp video thực tế (MP4 hoặc WebM).');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const res = await TheoryVideoService.uploadAndAssignVideo(
        selectedShape,
        selectedFile,
        uploadTitle.trim() || `Video bài học ${detailedData.vietnameseName}`,
        (pct) => setUploadProgress(pct)
      );

      if (res.success) {
        showSuccess(
          'Tải lên thành công',
          `Video thật đã được lưu vào máy chủ và gán chính thức cho ${detailedData.vietnameseName}!`
        );
        setIsUploadModalOpen(false);
        setSelectedFile(null);
        await loadAssignedVideo();
      } else {
        showError('Lỗi tải video', res.error || 'Không thể lưu video lên máy chủ.');
      }
    } catch (err: any) {
      showError('Lỗi tải video', err.message || 'Lỗi kết nối máy chủ.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyFormula = (latex: string, name: string) => {
    navigator.clipboard.writeText(latex);
    showSuccess('Đã sao chép công thức', `${name}: ${latex}`);
  };

  const handleMarkAllCompleted = () => {
    markTheoryRead(selectedShape);
    showSuccess('Chúc mừng!', `Bạn đã nắm vững lý thuyết ${detailedData.vietnameseName} (+50 XP)`);
  };

  const sectionTabs = [
    { id: 'recognition', label: '1. Nhận biết', icon: Eye, desc: 'Khái niệm & Phép quay' },
    { id: 'characteristics', label: '2. Đặc điểm', icon: Layers, desc: 'Các yếu tố & Thiết diện' },
    { id: 'formulas', label: '3. Công thức', icon: Calculator, desc: 'Sxq, Stp, V & Biến đổi' },
    { id: 'examples', label: '4. Ví dụ mẫu', icon: FileSpreadsheet, desc: 'Lời giải chi tiết từng bước' }
  ];

  return (
    <div id="view-theory" className="space-y-6 w-full mx-auto overflow-x-hidden">
      {/* 1. Main Header & Shape Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FFFDF8] p-4 sm:p-5 rounded-[20px] border border-[#E5DCCF] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FDF0ED] text-[#8F3E32] flex items-center justify-center shrink-0 border border-[#F4D2CA]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#3A302B]">
                Lý Thuyết Hình Học Không Gian 9
              </h2>
              <Badge variant={selectedShape} size="xs">
                Toán 9 - Chương IV
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-[#766A61]">
              Giải thích → Hình minh họa → Tương tác → Quiz nhanh
            </p>
          </div>
        </div>

        {/* 3 Shape Switcher Tabs */}
        <div className="grid grid-cols-3 gap-1.5 bg-[#F4EEE4] p-1.5 rounded-2xl border border-[#E5DCCF]">
          {[
            { id: 'cylinder', label: 'Hình Trụ', icon: '🛢️', activeClass: 'bg-[#ED806F] text-white font-bold shadow-xs' },
            { id: 'cone', label: 'Hình Nón', icon: '🍦', activeClass: 'bg-[#E07A5F] text-white font-bold shadow-xs' },
            { id: 'sphere', label: 'Hình Cầu', icon: '⚽', activeClass: 'bg-[#9FB596] text-white font-bold shadow-xs' }
          ].map((tab) => (
            <button
              key={tab.id}
              id={`theory-tab-${tab.id}`}
              onClick={() => {
                setSelectedShape(tab.id as ShapeType);
              }}
              className={`
                px-2.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]
                ${
                  selectedShape === tab.id
                    ? tab.activeClass
                    : 'text-[#766A61] hover:text-[#3A302B] hover:bg-[#EAE0D3]'
                }
              `}
            >
              <span>{tab.icon}</span>
              <span className="truncate">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Module Progression Sequence Anchor Stepper */}
      <div className="sticky top-2 z-20 bg-[#FFFDF8]/95 backdrop-blur-md p-2.5 rounded-2xl border border-[#E5DCCF] shadow-xs flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#8F3E32] px-2.5 py-1 bg-[#FDF0ED] rounded-xl border border-[#F4D2CA] whitespace-nowrap">
            Lộ trình bài học {detailedData.vietnameseName}:
          </span>
          <div className="flex items-center gap-1.5">
            {(() => {
              const showVideo = hasRealVideo || isTeacher;
              const hasFormation = selectedShape === 'cone' || selectedShape === 'sphere';
              let counter = 1;

              const steps = [
                { id: 'section-theory', label: `${counter++}. Lý thuyết`, icon: BookOpen },
                ...(showVideo
                  ? [
                      {
                        id: 'section-video',
                        label: `${counter++}. Video bài học ${selectedShape === 'cylinder' ? 'Hình Trụ' : selectedShape === 'cone' ? 'Hình Nón' : 'Hình Cầu'}`,
                        icon: Video
                      }
                    ]
                  : []),
                ...(hasFormation
                  ? [
                      {
                        id: 'section-formation',
                        label: `${counter++}. Sự tạo thành ${selectedShape === 'cone' ? 'hình nón' : 'hình cầu'}`,
                        icon: RotateCw
                      }
                    ]
                  : []),
                {
                  id: 'section-3d',
                  label: `${counter++}. Khám phá 3D`,
                  icon: Box
                },
                {
                  id: 'section-real-world',
                  label: `${counter++}. Ứng dụng thực tế`,
                  icon: Globe
                },
                {
                  id: 'section-practice',
                  label: `${counter++}. Luyện tập`,
                  icon: Award
                }
              ];

              return steps.map((step) => {
                const StepIcon = step.icon;
                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      const el = document.getElementById(step.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold text-slate-700 hover:text-[#16A34A] hover:bg-[#F0FDF4] hover:border-[#86EFAC] border border-slate-200/80 bg-white transition-all whitespace-nowrap text-xs cursor-pointer shadow-2xs"
                  >
                    <StepIcon className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>{step.label}</span>
                  </button>
                );
              });
            })()}
          </div>
        </div>
      </div>

      {/* 1. LÝ THUYẾT HÌNH HỌC */}
      <section id="section-theory" className="space-y-4 pt-2">
        <div className="flex items-center justify-between pb-2 border-b border-[#E5DCCF]/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#16A34A]/15 text-[#15803D] flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#3A302B]">
                LÝ THUYẾT CHUYÊN ĐỀ: {detailedData.vietnameseName.toUpperCase()}
              </h3>
              <p className="text-xs text-[#766A61]">
                Khái niệm, các yếu tố hình học, công thức tính toán và ví dụ mẫu chuẩn SGK Toán 9
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EBF2E8] text-[#3D5A34] border border-[#D0DEC9]">
            Phần 1/5
          </span>
        </div>
        {/* Quick Summary & Golden Rule Banner */}
        <div className="mb-6 p-4 rounded-[20px] bg-[#FAF7F2] text-[#3A302B] shadow-xs border border-[#EEDCB4] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D7A85D]" />
              <span className="font-serif text-sm font-bold text-[#7A571B]">Quy tắc vàng nhớ nhanh: {detailedData.vietnameseName}</span>
            </div>
            <p className="text-xs text-[#594D46] leading-relaxed">
              <MathText text={detailedData.formulas.goldenRule} />
            </p>
          </div>
          <div className="p-2.5 px-4 rounded-xl bg-[#FFFDF8] border border-[#EEDCB4] text-center font-mono text-xs sm:text-sm font-bold text-[#7A571B] shrink-0 self-start md:self-center">
            <MathFormula formula={detailedData.formulas.summaryLatex} />
          </div>
        </div>

        {/* 4-Section Navigation Stepper */}
        <div className="bg-[#FFFDF8] p-2 rounded-[20px] border border-[#E5DCCF] shadow-xs overflow-x-auto mb-6">
          <div className="flex items-center gap-1.5 min-w-[520px] sm:min-w-0 sm:grid sm:grid-cols-4">
            {sectionTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as TheorySectionTab)}
                  className={`
                    flex items-center sm:flex-col sm:items-start gap-2 p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer border
                    ${
                      isActive
                        ? 'bg-[#3A302B] text-[#FFFDF8] border-[#3A302B] shadow-xs'
                        : 'bg-[#FAF7F2] border-[#E5DCCF] text-[#594D46] hover:bg-[#F4EEE4]'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#EAE0D3] text-[#3A302B]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold whitespace-nowrap">
                      {tab.label}
                    </span>
                  </div>
                  <span
                    className={`text-[11px] hidden sm:block truncate ${
                      isActive ? 'text-[#D5C9BD]' : 'text-[#A0958B]'
                    }`}
                  >
                    {tab.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Section Content */}
        <div className="space-y-6">
          {/* SECTION 1: NHẬN BIẾT */}
          {activeSection === 'recognition' && (
            <div className="space-y-4">
              <Card className="p-5 sm:p-6 bg-[#FFFDF8] space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5DCCF]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#FDF0ED] text-[#8F3E32] flex items-center justify-center font-bold border border-[#F4D2CA]">
                      1
                    </div>
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#3A302B]">
                        Nhận Biết & Sự Hình Thành Hình Học
                      </h3>
                      <p className="text-xs text-[#766A61]">Khái niệm sinh ra từ phép quay 360° trong không gian</p>
                    </div>
                  </div>
                  <Badge variant={selectedShape} size="sm">
                    {detailedData.vietnameseName}
                  </Badge>
                </div>

                {/* Definition Box */}
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DCCF] text-xs sm:text-sm text-[#3A302B] leading-relaxed font-medium space-y-2">
                  <span className="font-serif font-bold text-[#8F3E32] block text-sm">💡 Định nghĩa chuẩn SGK:</span>
                  <div className="leading-[1.65]">
                    <MathFormula formula={detailedData.recognition.concept} />
                  </div>
                </div>

                {/* Rotation Mechanics Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-[#3A302B] uppercase tracking-wider flex items-center gap-2">
                    <RotateCw className="w-4 h-4 text-[#ED806F]" />
                    Chi Tiết Phép Quay Tạo Hình:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E5DCCF] space-y-1">
                      <span className="text-xs font-bold text-[#766A61] block">Hình phẳng ban đầu:</span>
                      <div className="text-xs font-semibold text-[#3A302B]">
                        <MathFormula formula={detailedData.recognition.rotationDetail.planeFigure} />
                      </div>
                    </div>
                    <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E5DCCF] space-y-1">
                      <span className="text-xs font-bold text-[#766A61] block">Trục quay cố định:</span>
                      <div className="text-xs font-semibold text-[#3A302B]">
                        <MathFormula formula={detailedData.recognition.rotationDetail.rotationAxis} />
                      </div>
                    </div>
                    <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E5DCCF] space-y-2 sm:col-span-2">
                      <span className="text-xs font-bold text-[#766A61] block">Bộ phận chuyển động & Quét mặt:</span>
                      <div className="text-xs text-[#594D46] space-y-1.5 leading-relaxed">
                        {detailedData.recognition.rotationDetail.movingPartsList ? (
                          detailedData.recognition.rotationDetail.movingPartsList.map((part, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-2">
                              <span className="text-[#8F3E32] font-bold mt-0.5">•</span>
                              <div className="flex-1">
                                <MathFormula formula={part} />
                              </div>
                            </div>
                          ))
                        ) : (
                          <MathFormula formula={detailedData.recognition.rotationDetail.movingPart} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Geometric Elements (CÁC YẾU TỐ CỦA HÌNH) */}
                {detailedData.recognition.keyElements && detailedData.recognition.keyElements.length > 0 && (
                  <div className="space-y-3 pt-2 border-t border-[#E5DCCF]">
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-[#3A302B] uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#ED806F]" />
                      Các Yếu Tố Của {detailedData.vietnameseName}:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {detailedData.recognition.keyElements.map((el, elIdx) => (
                        <div key={elIdx} className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E5DCCF] space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#8F3E32]">
                              <MathFormula formula={el.name} />
                            </span>
                            {el.symbol && (
                              <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 bg-[#FDF0ED] text-[#8F3E32] rounded border border-[#F4D2CA]">
                                <MathFormula formula={`$${el.symbol}$`} />
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-[#594D46] leading-relaxed">
                            <MathFormula formula={el.description} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Real World Recognition Examples */}
                <div className="space-y-2 pt-2 border-t border-[#E5DCCF]">
                  <span className="font-serif text-xs sm:text-sm font-bold text-[#3A302B] block">
                    Vật thể thực tế nhận dạng trong đời sống:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {detailedData.recognition.realWorldExamples.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] text-[#594D46] text-xs font-medium border border-[#E5DCCF]"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Step to next button */}
                <div className="flex justify-end pt-3 border-t border-[#E5DCCF]">
                  <Button
                    size="md"
                    shape="pill"
                    variant={themeKey}
                    onClick={() => setActiveSection('characteristics')}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="font-bold"
                  >
                    Tiếp: 2. Đặc Điểm & Thiết Diện
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* SECTION 2: ĐẶC ĐIỂM */}
          {activeSection === 'characteristics' && (
            <div className="space-y-4">
              <Card className="p-5 sm:p-6 bg-[#FFFDF8] space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5DCCF]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#EBF2E8] text-[#4D6B42] flex items-center justify-center font-bold border border-[#D0DEC9]">
                      2
                    </div>
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#3A302B]">
                        Đặc Điểm, Cấu Tạo & Thiết Diện Cắt
                      </h3>
                      <p className="text-xs text-[#766A61]">Các yếu tố kích thước và hình dáng mặt cắt</p>
                    </div>
                  </div>
                  <Badge variant="neutral" size="sm">
                    {detailedData.characteristics.elements.length} yếu tố
                  </Badge>
                </div>

                {/* Elements Grid */}
                <div className="space-y-3">
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-[#3A302B] uppercase tracking-wider">
                    Các yếu tố hình học cơ bản:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {detailedData.characteristics.elements.map((el, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E5DCCF] space-y-1 hover:border-[#D5C9BD] transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#3A302B]">{el.name}</span>
                          <span className="px-2 py-0.5 rounded-md bg-[#FFFDF8] font-mono text-xs font-bold text-[#8F3E32] border border-[#E5DCCF]">
                            {el.symbol}
                          </span>
                        </div>
                        <p className="text-xs text-[#594D46] leading-relaxed">
                          <MathText text={el.description} />
                        </p>
                        {el.relationFormula && (
                          <div className="text-[11px] font-mono font-bold text-[#4D6B42] pt-1 flex items-center gap-1">
                            <span>Công thức:</span>
                            <MathFormula formula={el.relationFormula} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cross Sections */}
                <div className="space-y-3 pt-3 border-t border-[#E5DCCF]">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-[#3A302B] uppercase tracking-wider flex items-center gap-2">
                      <Scissors className="w-4 h-4 text-[#E07A5F]" />
                      Mặt Cắt (Thiết Diện) Khi Cắt Bởi Mặt Phẳng:
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {detailedData.characteristics.crossSections.map((cs, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EEDCB4] space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#7A571B]">{cs.name}</span>
                          <Badge variant="warning" size="xs">
                            {cs.shapeName}
                          </Badge>
                        </div>
                        <p className="text-xs text-[#594D46] leading-relaxed">
                          <MathText text={cs.feature} />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step Navigation */}
                <div className="flex items-center justify-between pt-3 border-t border-[#E5DCCF]">
                  <Button
                    size="sm"
                    variant="outline"
                    shape="pill"
                    onClick={() => setActiveSection('recognition')}
                  >
                    Quay lại: 1. Nhận biết
                  </Button>
                  <Button
                    size="md"
                    shape="pill"
                    variant={themeKey}
                    onClick={() => setActiveSection('formulas')}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="font-bold"
                  >
                    Tiếp: 3. Hệ Thống Công Thức
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* SECTION 3: CÔNG THỨC */}
          {activeSection === 'formulas' && (
            <div className="space-y-4">
              <Card className="p-5 sm:p-6 bg-[#FFFDF8] space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5DCCF]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF7FD] text-[#634796] flex items-center justify-center font-bold border border-[#DFD2F0]">
                      3
                    </div>
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#3A302B]">
                        Hệ Thống Công Thức Chuẩn SGK & Biến Đổi Suy Ra
                      </h3>
                      <p className="text-xs text-[#766A61]">Đầy đủ diện tích xung quanh, diện tích toàn phần, thể tích</p>
                    </div>
                  </div>
                  <Badge variant="primary" size="sm">
                    KaTeX Chuẩn
                  </Badge>
                </div>

                <div className="space-y-4">
                  {detailedData.formulas.list.map((formula, idx) => (
                    <div
                      key={formula.id}
                      className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DCCF] shadow-xs space-y-3 hover:border-[#D5C9BD] transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E5DCCF]">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-[#FDF0ED] text-[#8F3E32] text-xs font-bold flex items-center justify-center border border-[#F4D2CA]">
                            {idx + 1}
                          </span>
                          <span className="font-serif text-sm sm:text-base font-bold text-[#3A302B]">
                            {formula.name}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopyFormula(formula.latex, formula.name)}
                          className="text-xs text-[#766A61] hover:text-[#3A302B] p-1.5 rounded-lg hover:bg-[#EAE0D3] flex items-center gap-1.5 cursor-pointer self-end sm:self-auto"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép</span>
                        </button>
                      </div>

                      {/* Display Formula in LaTeX */}
                      <div className="p-4 rounded-xl bg-[#FFFDF8] border border-[#E5DCCF] text-[#3A302B] flex items-center justify-center text-center font-mono text-base shadow-xs overflow-x-auto">
                        <MathFormula formula={formula.latex} displayMode />
                      </div>

                      <p className="text-xs sm:text-sm text-[#594D46] font-medium leading-relaxed">
                        <MathText text={formula.explanation} />
                      </p>

                      {/* Derived Formulas */}
                      {formula.derivedFormulas && formula.derivedFormulas.length > 0 && (
                        <div className="pt-2 border-t border-[#E5DCCF]">
                          <span className="font-serif text-xs font-bold text-[#3A302B] block mb-1.5">
                            Công thức biến đổi suy ra:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {formula.derivedFormulas.map((df, i) => (
                              <div key={i} className="p-2.5 rounded-xl bg-[#FFFDF8] border border-[#E5DCCF]">
                                <span className="font-semibold text-[#3A302B] block text-xs">{df.name}:</span>
                                <div className="font-mono text-[#8F3E32] font-bold my-1 text-xs sm:text-sm">
                                  <MathFormula formula={df.latex} />
                                </div>
                                <span className="text-[11px] text-[#A0958B] italic">
                                  <MathText text={df.note} />
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Cylinder Special Station: Visual Illusion Puzzle */}
                {selectedShape === 'cylinder' && (
                  <div className="pt-2">
                    <VisualIllusionPuzzle />
                  </div>
                )}

                {/* Step Navigation */}
                <div className="flex items-center justify-between pt-3 border-t border-[#E5DCCF]">
                  <Button
                    size="sm"
                    variant="outline"
                    shape="pill"
                    onClick={() => setActiveSection('characteristics')}
                  >
                    Quay lại: 2. Đặc điểm
                  </Button>
                  <Button
                    size="md"
                    shape="pill"
                    variant={themeKey}
                    onClick={() => setActiveSection('examples')}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="font-bold"
                  >
                    Tiếp: 4. Ví Dụ Có Lời Giải
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* SECTION 4: VÍ DỤ MẪU */}
          {activeSection === 'examples' && (
            <div className="space-y-4">
              <Card className="p-5 sm:p-6 bg-[#FFFDF8] space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5DCCF]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#FFF7F4] text-[#8A3B22] flex items-center justify-center font-bold border border-[#F4D5C8]">
                      4
                    </div>
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#3A302B]">
                        Ví Dụ Mẫu Giải Chi Tiết Từng Bước
                      </h3>
                      <p className="text-xs text-[#766A61]">Các dạng bài toán tiêu biểu trong kỳ thi vào Lớp 10</p>
                    </div>
                  </div>
                  <Badge variant="warning" size="sm">
                    {detailedData.examples.length} ví dụ
                  </Badge>
                </div>

                <div className="space-y-5">
                  {detailedData.examples.map((ex) => (
                    <div
                      key={ex.id}
                      className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DCCF] space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E5DCCF]">
                        <h4 className="font-serif text-sm sm:text-base font-bold text-[#3A302B]">{ex.title}</h4>
                        <Badge variant="neutral" size="xs">
                          Mức độ: {ex.difficultyBadge}
                        </Badge>
                      </div>

                      {/* Problem Statement */}
                      <div className="text-xs sm:text-sm text-[#3A302B] font-medium leading-relaxed bg-[#FFFDF8] p-3.5 rounded-xl border border-[#E5DCCF]">
                        <MathText text={ex.problemStatement} />
                      </div>

                      {/* Given & Target */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 rounded-lg bg-[#FFFDF8] border border-[#E5DCCF]">
                          <span className="font-bold text-[#3A302B] block text-[11px]">Dữ kiện cho trước:</span>
                          <ul className="list-disc list-inside text-[#594D46] space-y-0.5">
                            {ex.givenData.map((g, gi) => (
                              <li key={gi}>
                                <MathText text={g} />
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#FFFDF8] border border-[#E5DCCF]">
                          <span className="font-bold text-[#3A302B] block text-[11px]">Mục tiêu cần tính:</span>
                          <span className="text-[#594D46] font-semibold">
                            <MathText text={ex.findTarget} />
                          </span>
                        </div>
                      </div>

                      {/* Step by step solution */}
                      <div className="space-y-2.5 pt-1">
                        <span className="font-serif text-xs sm:text-sm font-bold text-[#3A302B] uppercase tracking-wider block">
                          Lời giải chi tiết từng bước:
                        </span>
                        {ex.steps.map((step) => (
                          <div
                            key={step.stepNumber}
                            className="p-3 bg-[#FFFDF8] rounded-xl border border-[#E5DCCF] space-y-1.5"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-[#ED806F] text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                                {step.stepNumber}
                              </span>
                              <span className="text-xs font-bold text-[#3A302B]">{step.title}</span>
                            </div>

                            {step.latex && (
                              <div className="p-2 bg-[#FAF7F2] border border-[#E5DCCF] text-[#3A302B] rounded-lg text-center font-mono text-xs sm:text-sm overflow-x-auto">
                                <MathFormula formula={step.latex} />
                              </div>
                            )}

                            <div className="text-xs text-[#594D46] leading-relaxed pl-7">
                              <MathText text={step.explanation} />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Final Result Banner */}
                      <div className="p-3 rounded-xl bg-[#EBF2E8] border border-[#D0DEC9] text-[#4D6B42] text-xs font-semibold flex items-center justify-between">
                        <span>✓ Đáp số cuối cùng:</span>
                        <span className="font-mono font-bold text-[#4D6B42] text-xs sm:text-sm">
                          <MathFormula formula={ex.finalResultLatex} />
                        </span>
                      </div>

                      {/* Teacher Tip */}
                      <div className="p-3 rounded-xl bg-[#FDFBF4] border border-[#EEDCB4] text-xs text-[#7A571B] space-y-1">
                        <span className="font-serif font-bold flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-[#D7A85D]" />
                          Mẹo làm bài thi tuyển sinh:
                        </span>
                        <p>
                          <MathText text={ex.tips} />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Completion & Next Action Banner at end of Section 4 */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5 p-4 bg-[#EBF2E8]/70 border border-[#D0DEC9] rounded-2xl mt-4">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#4D6B42] shrink-0" />
                    <div className="text-xs sm:text-sm">
                      <span className="font-serif font-bold text-[#3A302B] block">
                        Đã sẵn sàng luyện tập chuyên sâu?
                      </span>
                      <span className="text-[#594D46]">
                        Chuyển qua hệ thống bài tập thực hành để tích lũy thêm XP
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button
                      id="theory-complete-btn"
                      variant={isCompleted ? 'secondary' : 'success'}
                      shape="pill"
                      size="md"
                      onClick={handleMarkAllCompleted}
                      leftIcon={<Check className="w-4 h-4" />}
                      className="font-bold min-h-[44px]"
                    >
                      {isCompleted ? 'Đã hoàn thành lý thuyết' : 'Đánh dấu hoàn thành (+50 XP)'}
                    </Button>
                    <Button
                      size="md"
                      shape="pill"
                      variant="primary"
                      onClick={() => navigateTo('/practice')}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      className="font-bold min-h-[44px]"
                    >
                      Làm bài tập
                    </Button>
                  </div>
                </div>

                {/* Step Navigation */}
                <div className="flex items-center justify-start pt-3 border-t border-[#E5DCCF]">
                  <Button
                    size="sm"
                    variant="outline"
                    shape="pill"
                    onClick={() => setActiveSection('formulas')}
                  >
                    Quay lại: 3. Công thức
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* 2. VIDEO BÀI HỌC HỆ THỐNG */}
      {(hasRealVideo || showTeacherVideoControls) && (
        <section id="section-video" className="space-y-4 pt-4 border-t border-[#E5DCCF]/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E5DCCF]/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#16A34A] text-white flex items-center justify-center font-bold shadow-xs">
                2
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#3A302B]">
                    {selectedShape === 'cylinder'
                      ? 'VIDEO BÀI HỌC HÌNH TRỤ'
                      : selectedShape === 'cone'
                      ? 'VIDEO BÀI HỌC HÌNH NÓN'
                      : 'VIDEO BÀI HỌC HÌNH CẦU'}
                  </h3>
                  {hasRealVideo && (
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">
                      Video chuẩn SGK
                    </span>
                  )}
                  {showTeacherVideoControls && (
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                      Quyền Giáo viên
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#766A61]">
                  {hasRealVideo && assignedVideo
                    ? `${assignedVideo.title} • Biên soạn: ${assignedVideo.authorName || assignedVideo.author || 'Thầy/Cô Toán 9'}`
                    : `Học liệu bài giảng điện tử dành riêng cho ${detailedData.vietnameseName}`}
                </p>
              </div>
            </div>

            {/* Teacher Actions Toolbar (Gated to Teacher Only, Hidden in Student Preview) */}
            {showTeacherVideoControls && (
              <div className="flex items-center gap-2 self-start sm:self-center">
                <Button
                  size="sm"
                  variant="outline"
                  shape="pill"
                  onClick={handleOpenSelectModal}
                  leftIcon={<Film className="w-3.5 h-3.5 text-stone-600" />}
                  className="text-xs font-semibold"
                >
                  Kho video
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  shape="pill"
                  onClick={handleOpenUploadModal}
                  leftIcon={<Upload className="w-3.5 h-3.5 text-white" />}
                  className="text-xs font-bold"
                >
                  Tải video lên
                </Button>
                {hasRealVideo && (
                  <Button
                    size="sm"
                    variant="danger"
                    shape="pill"
                    onClick={handleUnassignVideo}
                    leftIcon={<Trash2 className="w-3.5 h-3.5 text-red-500" />}
                    className="text-xs font-semibold"
                    title="Gỡ video khỏi hình này (học sinh sẽ không thấy)"
                  >
                    Gỡ video
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Conditional Display: If Real Video exists, show Player */}
          {hasRealVideo && assignedVideo ? (
            <div className="max-w-4xl mx-auto space-y-2">
              <VideoErrorBoundary
                topicTitle={detailedData.vietnameseName}
                onExploreInLab={() => navigateTo('/explore')}
              >
                <LessonVideo
                  key={assignedVideo.id}
                  customLesson={assignedVideo}
                  source={assignedVideo.videoUrl}
                  title={assignedVideo.title}
                  shape={selectedShape}
                />
              </VideoErrorBoundary>
              <div className="flex items-center justify-between text-[11px] text-stone-500 px-2 py-1">
                <span>
                  Định dạng: MP4 (H.264/AAC) • Dung lượng: {(Number(assignedVideo.fileSize || assignedVideo.size || 0) / (1024 * 1024)).toFixed(1)} MB
                </span>
                <span>
                  Trạng thái: <strong className="text-emerald-600">Đã kiểm duyệt & Xác thực</strong>
                </span>
              </div>
            </div>
          ) : showTeacherVideoControls ? (
            /* Teacher Empty State Card (Prompt to Upload/Assign) */
            <div className="max-w-4xl mx-auto bg-gradient-to-b from-stone-50 to-[#FFFDF8] border border-[#D5C9BD] rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-xs">
                <FileVideo className="w-6 h-6" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h4 className="font-serif text-base sm:text-lg font-bold text-stone-800">
                  Video bài học chưa được giáo viên cung cấp.
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  <strong>Chính sách Zero-Fake Video:</strong> Chưa có tệp video thực tế cho chuyên đề {detailedData.vietnameseName}. Thầy/Cô vui lòng tải tệp video MP4 hoặc chọn từ kho bài giảng để học sinh học tập.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button
                  size="md"
                  variant="primary"
                  shape="pill"
                  onClick={handleOpenUploadModal}
                  leftIcon={<Upload className="w-4 h-4" />}
                  className="font-bold shadow-xs"
                >
                  Tải lên video thật (.mp4)
                </Button>
                <Button
                  size="md"
                  variant="outline"
                  shape="pill"
                  onClick={handleOpenSelectModal}
                  leftIcon={<Film className="w-4 h-4" />}
                  className="font-bold"
                >
                  Chọn từ kho bài giảng
                </Button>
              </div>
            </div>
          ) : (
            /* Student Empty State Notification */
            <div className="max-w-4xl mx-auto bg-[#FFFDF8] border border-[#E5DCCF] rounded-2xl p-6 sm:p-8 text-center space-y-2.5 shadow-2xs">
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto">
                <Film className="w-5 h-5" />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h4 className="font-serif text-base font-bold text-[#3A302B]">
                  Video bài học chưa được giáo viên cung cấp.
                </h4>
                <p className="text-xs text-[#766A61] leading-relaxed">
                  Chuyên đề {detailedData.vietnameseName} chưa có video bài học từ giáo viên bộ môn. Học sinh hãy tìm hiểu qua các mục lý thuyết tương tác và phòng thí nghiệm 3D bên dưới.
                </p>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 3. SỰ TẠO THÀNH HÌNH NÓN / SỰ TẠO THÀNH HÌNH CẦU (conditionally rendered) */}
      {selectedShape === 'cone' && (
        <section id="section-formation" className="space-y-4 pt-4 border-t border-[#E5DCCF]/80">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5DCCF]/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#E07A5F] text-white flex items-center justify-center font-bold shadow-xs">
                3
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#3A302B]">
                    SỰ TẠO THÀNH HÌNH NÓN
                  </h3>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#FDF0ED] text-[#8F3E32] border border-[#F4D2CA]">
                    Thực nghiệm 3D
                  </span>
                </div>
                <p className="text-xs text-[#766A61]">
                  Khi quay tam giác vuông ΔSOA một vòng quanh cạnh góc vuông SO cố định, ta được một hình nón
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FDF0ED] text-[#8F3E32] border border-[#F4D2CA]">
              Phần 3/6
            </span>
          </div>

          <div className="w-full bg-[#FFFDF8] rounded-2xl border border-[#E5DCCF] p-2 sm:p-4 shadow-xs">
            <ConeCreationMode radius={2.4} height={4.2} />
          </div>
        </section>
      )}

      {selectedShape === 'sphere' && (
        <section id="section-formation" className="space-y-4 pt-4 border-t border-[#E5DCCF]/80">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5DCCF]/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#0D9488] text-white flex items-center justify-center font-bold shadow-xs">
                3
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#3A302B]">
                    SỰ TẠO THÀNH HÌNH CẦU
                  </h3>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#CCFBF1] text-[#0F766E] border border-[#99F6E4]">
                    Thực nghiệm 3D
                  </span>
                </div>
                <p className="text-xs text-[#766A61]">
                  Khi quay một nửa hình tròn tâm O, bán kính R quanh đường kính AB cố định một vòng, ta được một hình cầu
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#CCFBF1] text-[#0F766E] border border-[#99F6E4]">
              Phần 3/6
            </span>
          </div>

          <div className="w-full bg-[#FFFDF8] rounded-2xl border border-[#E5DCCF] p-2 sm:p-4 shadow-xs">
            <SphereCreationMode radius={3.5} />
          </div>
        </section>
      )}

      {/* 3 / 4. KHÁM PHÁ 3D */}
      <section id="section-3d" className="space-y-4 pt-4 border-t border-[#E5DCCF]/80">
        <div className="flex items-center justify-between pb-2 border-b border-[#E5DCCF]/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-bold shadow-xs">
              {selectedShape === 'cylinder' ? '3' : '4'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#3A302B]">
                  KHÁM PHÁ 3D TƯƠNG TÁC: {detailedData.vietnameseName.toUpperCase()}
                </h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Three.js WebGL Lab
                </span>
              </div>
              <p className="text-xs text-[#766A61]">
                Tự do xoay 360°, điều chỉnh bán kính r, chiều cao h và xem thiết diện cắt trực quan
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
            Phần {selectedShape === 'cylinder' ? '3/5' : '4/6'}
          </span>
        </div>

        <Theory3DPanel shape={selectedShape} />
      </section>

      {/* 4 / 5. ỨNG DỤNG THỰC TẾ */}
      <section id="section-real-world" className="space-y-4 pt-4 border-t border-[#E5DCCF]/80">
        <div className="flex items-center justify-between pb-2 border-b border-[#E5DCCF]/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#D97706] text-white flex items-center justify-center font-bold shadow-xs">
              {selectedShape === 'cylinder' ? '4' : '5'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#3A302B]">
                  ỨNG DỤNG THỰC TẾ: {detailedData.vietnameseName.toUpperCase()}
                </h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                  Bài toán đời sống
                </span>
              </div>
              <p className="text-xs text-[#766A61]">
                Vận dụng kiến thức hình học vào các bài toán thực tiễn với hướng dẫn 4 bước tư duy
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            Phần {selectedShape === 'cylinder' ? '4/5' : '5/6'}
          </span>
        </div>

        <div className="bg-[#FFFDF8] rounded-2xl border border-[#E5DCCF] p-4 sm:p-6 shadow-xs">
          <RealWorldProblem shapeType={selectedShape} />
        </div>
      </section>

      {/* 5 / 6. LUYỆN TẬP TRẮC NGHIỆM */}
      <section id="section-practice" className="space-y-4 pt-4 border-t border-[#E5DCCF]/80">
        <div className="flex items-center justify-between pb-2 border-b border-[#E5DCCF]/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center font-bold shadow-xs">
              {selectedShape === 'cylinder' ? '5' : '6'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#3A302B]">
                  LUYỆN TẬP TRẮC NGHIỆM: {detailedData.vietnameseName.toUpperCase()}
                </h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                  Ngân hàng câu hỏi
                </span>
              </div>
              <p className="text-xs text-[#766A61]">
                Kiểm tra mức độ thành thạo qua câu hỏi trắc nghiệm 4 lựa chọn có đáp án và giải thích chi tiết
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
            Phần {selectedShape === 'cylinder' ? '5/5' : '6/6'}
          </span>
        </div>

        <div className="bg-[#FFFDF8] rounded-2xl border border-[#E5DCCF] p-4 sm:p-6 shadow-xs">
          <PracticeQuiz shapeType={selectedShape} />
        </div>
      </section>

      {/* MODAL 1: TẢI LÊN VIDEO THẬT CHO HÌNH ĐANG CHỌN */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF8] rounded-2xl border border-[#E5DCCF] shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-[#E5DCCF] flex items-center justify-between bg-[#FAF7F2]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#3A302B]">
                    Tải Lên Video Thật Cho {detailedData.vietnameseName}
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    Lưu trữ vĩnh viễn trên máy chủ & Gán vào bài học
                  </p>
                </div>
              </div>
              <button
                onClick={() => !isUploading && setIsUploadModalOpen(false)}
                disabled={isUploading}
                className="w-8 h-8 rounded-full hover:bg-stone-200 flex items-center justify-center text-stone-500 cursor-pointer disabled:opacity-40"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleStartUpload} className="p-5 space-y-4">
              {/* Title input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 block">
                  Tiêu đề video bài học:
                </label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  disabled={isUploading}
                  placeholder={`Video bài học ${detailedData.vietnameseName}`}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5DCCF] bg-white focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              {/* Drag & Drop File Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    const file = e.dataTransfer.files[0];
                    if (file.type.startsWith('video/')) {
                      setSelectedFile(file);
                    } else {
                      showError('Định dạng không hợp lệ', 'Vui lòng chọn tệp video (.mp4, .webm).');
                    }
                  }
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                  isDragOver
                    ? 'border-emerald-500 bg-emerald-50/50'
                    : selectedFile
                    ? 'border-emerald-400 bg-emerald-50/30'
                    : 'border-[#D5C9BD] hover:border-emerald-500 bg-[#FAF7F2]'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/ogg,video/quicktime"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                />

                {selectedFile ? (
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-800 truncate max-w-xs mx-auto">
                        {selectedFile.name}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Dung lượng: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type || 'video/mp4'}
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold underline">
                      Bấm để chọn tệp khác
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mx-auto">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-stone-700 block">
                        Kéo thả tệp video vào đây, hoặc <span className="text-emerald-600 underline">chọn tệp từ máy</span>
                      </span>
                      <span className="text-[10px] text-stone-500 block mt-0.5">
                        Hỗ trợ MP4, WebM (H.264/AAC, dung lượng khuyến nghị &lt; 200MB)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Progress Bar */}
              {isUploading && (
                <div className="space-y-1.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
                    <span>Đang tải video trực tiếp lên kho lưu trữ & gán bài học...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 transition-all duration-200 rounded-full"
                      style={{ width: `${Math.max(uploadProgress, 5)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5DCCF]">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  shape="pill"
                  disabled={isUploading}
                  onClick={() => setIsUploadModalOpen(false)}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  shape="pill"
                  disabled={!selectedFile || isUploading}
                  leftIcon={<Upload className="w-3.5 h-3.5" />}
                  className="font-bold"
                >
                  {isUploading ? 'Đang tải lên...' : 'Tải lên & Gán bài học'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CHỌN VIDEO TỪ KHO HỌC LIỆU CỦA GIÁO VIÊN */}
      {isSelectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF8] rounded-2xl border border-[#E5DCCF] shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-[#E5DCCF] flex items-center justify-between bg-[#FAF7F2]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#3A302B]">
                    Kho Video Bài Giảng Của Giáo Viên
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    Chọn video để gán chính thức cho {detailedData.vietnameseName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSelectModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-stone-200 flex items-center justify-center text-stone-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3 flex-1">
              {availableVideos.length === 0 ? (
                <div className="text-center py-10 text-stone-500 space-y-2">
                  <FileVideo className="w-8 h-8 mx-auto text-stone-400" />
                  <p className="text-xs">Chưa có video nào trong kho.</p>
                  <Button
                    size="sm"
                    variant="primary"
                    shape="pill"
                    onClick={() => {
                      setIsSelectModalOpen(false);
                      handleOpenUploadModal();
                    }}
                  >
                    Tải lên video mới ngay
                  </Button>
                </div>
              ) : (
                availableVideos.map((video) => {
                  const isCurrent = assignedVideo?.id === video.id;
                  return (
                    <div
                      key={video.id}
                      className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                        isCurrent
                          ? 'border-emerald-500 bg-emerald-50/50'
                          : 'border-[#E5DCCF] bg-white hover:border-[#D5C9BD]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-16 h-10 rounded-lg bg-stone-900 shrink-0 overflow-hidden relative border border-stone-300">
                          {video.thumbnailUrl || video.thumbnailURL ? (
                            <img
                              src={video.thumbnailUrl || video.thumbnailURL}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-500">
                              <FileVideo className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-stone-800 truncate">
                              {video.title}
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">
                                Đang gán
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                            <span>Chủ đề: {video.topic || 'HÌNH HỌC 9'}</span>
                            <span>•</span>
                            <span>Thời lượng: {video.duration || '00:15'}</span>
                            <span>•</span>
                            <span>Tác giả: {video.authorName || video.author || 'Thầy/Cô'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                        {isCurrent ? (
                          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Đang dùng
                          </span>
                        ) : (
                          <Button
                            size="sm"
                            variant="primary"
                            shape="pill"
                            onClick={() => handleAssignExistingVideo(video.id)}
                            className="text-xs font-bold"
                          >
                            Gán cho {detailedData.vietnameseName}
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="p-3 border-t border-[#E5DCCF] flex items-center justify-between bg-[#FAF7F2]">
              <span className="text-xs text-stone-500">
                Tổng cộng: {availableVideos.length} video trong hệ thống
              </span>
              <Button
                size="sm"
                variant="outline"
                shape="pill"
                onClick={() => setIsSelectModalOpen(false)}
              >
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
