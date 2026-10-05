/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - MOBILE LESSON ROOM (VERTICAL STACK)
 * Mobile First Pedagogy for Grade 9 Students:
 * Strictly stacked vertically with zero horizontal clutter:
 * 1. Video Bài Giảng (MobileVideo)
 * 2. Mô hình 3D tương tác (Three.js with TouchControls)
 * 3. Thẻ công thức toán học kích thước lớn (24-32px KaTeX)
 * 4. Bài tập trắc nghiệm & vận dụng (PracticeQuiz)
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ShapeType } from '../types';
import { TheoryVideo } from '../types/theoryVideo';
import { TheoryVideoService } from '../services/theoryVideoService';
import { MobileVideo } from './MobileVideo';
import { TouchControls } from './TouchControls';
import { ThreeDViewer } from '../components/explore/ThreeDViewer';
import { MathFormula } from '../components/common/MathFormula';
import { PracticeQuiz } from '../components/journey/PracticeQuiz';
import {
  Cylinder,
  Cone as ConeIcon,
  Globe,
  Sparkles,
  BookOpen,
  Box,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

interface ShapeLessonData {
  id: ShapeType;
  name: string;
  vietnameseTitle: string;
  videoUrl: string;
  posterUrl: string;
  description: string;
  formulas: {
    label: string;
    latex: string;
    explanation: string;
  }[];
}

const LESSON_DATA: Record<ShapeType, ShapeLessonData> = {
  cylinder: {
    id: 'cylinder',
    name: 'Hình Trụ',
    vietnameseTitle: 'Chuyên đề 1: Hình Trụ – Diện tích & Thể tích',
    videoUrl: '/videos/trụ.mp4',
    posterUrl: '/videos/tru_poster.jpg',
    description: 'Khám phá sự tạo thành hình trụ khi quay hình chữ nhật quanh một trục cố định.',
    formulas: [
      {
        label: 'Diện tích xung quanh',
        latex: 'S_{xq} = 2\\pi r h',
        explanation: 'Diện tích hình chữ nhật khi trải phẳng mặt xung quanh (chiều dài = chu vi đáy, chiều rộng = chiều cao).'
      },
      {
        label: 'Diện tích toàn phần',
        latex: 'S_{tp} = 2\\pi r h + 2\\pi r^2',
        explanation: 'Tổng diện tích mặt xung quanh và diện tích 2 hình tròn đáy.'
      },
      {
        label: 'Thể tích hình trụ',
        latex: 'V = \\pi r^2 h = S_{\\text{đáy}} \\cdot h',
        explanation: 'Thể tích hình trụ bằng diện tích đáy nhân với chiều cao.'
      }
    ]
  },
  cone: {
    id: 'cone',
    name: 'Hình Nón',
    vietnameseTitle: 'Chuyên đề 2: Hình Nón – Diện tích & Thể tích',
    videoUrl: '/videos/nón.mp4',
    posterUrl: '/videos/non_poster.jpg',
    description: 'Khám phá sự tạo thành hình nón khi quay tam giác vuông quanh một cạnh góc vuông.',
    formulas: [
      {
        label: 'Diện tích xung quanh',
        latex: 'S_{xq} = \\pi r l',
        explanation: 'Với r là bán kính đáy, l là đường sinh: l = \\sqrt{r^2 + h^2}.'
      },
      {
        label: 'Diện tích toàn phần',
        latex: 'S_{tp} = \\pi r l + \\pi r^2',
        explanation: 'Tổng diện tích xung quanh (hình quạt) và diện tích hình tròn đáy.'
      },
      {
        label: 'Thể tích hình nón',
        latex: 'V = \\frac{1}{3}\\pi r^2 h',
        explanation: 'Thể tích hình nón bằng đúng 1/3 thể tích hình trụ có cùng bán kính đáy và chiều cao.'
      }
    ]
  },
  sphere: {
    id: 'sphere',
    name: 'Hình Cầu',
    vietnameseTitle: 'Chuyên đề 3: Hình Cầu – Diện tích mặt cầu & Thể tích',
    videoUrl: '/videos/cầu.mp4',
    posterUrl: '/videos/cau_poster.jpg',
    description: 'Khám phá sự tạo thành mặt cầu khi quay nửa hình tròn quanh đường kính.',
    formulas: [
      {
        label: 'Diện tích mặt cầu',
        latex: 'S = 4\\pi R^2 = \\pi d^2',
        explanation: 'Diện tích mặt cầu bằng 4 lần diện tích hình tròn lớn đi qua tâm.'
      },
      {
        label: 'Thể tích hình cầu',
        latex: 'V = \\frac{4}{3}\\pi R^3',
        explanation: 'Thể tích khối cầu phụ thuộc theo lũy thừa bậc ba của bán kính R.'
      }
    ]
  }
};

export const MobileLesson: React.FC = () => {
  const { selectedShape, setSelectedShape } = useApp();
  const currentShapeKey = selectedShape || 'cylinder';
  const lesson = LESSON_DATA[currentShapeKey] || LESSON_DATA.cylinder;

  // Dynamically assigned video for the current shape
  const [assignedVideo, setAssignedVideo] = useState<TheoryVideo | null>(null);

  useEffect(() => {
    let isMounted = true;
    TheoryVideoService.getAssignedVideo(currentShapeKey).then((res) => {
      if (isMounted) {
        setAssignedVideo(res.hasVideo && res.video ? res.video : null);
      }
    });

    const handleAssigned = (e: any) => {
      if (!e.detail?.shape || e.detail.shape === currentShapeKey) {
        TheoryVideoService.getAssignedVideo(currentShapeKey).then((res) => {
          if (isMounted) {
            setAssignedVideo(res.hasVideo && res.video ? res.video : null);
          }
        });
      }
    };

    window.addEventListener('geometry_lab_video_assigned', handleAssigned);
    return () => {
      isMounted = false;
      window.removeEventListener('geometry_lab_video_assigned', handleAssigned);
    };
  }, [currentShapeKey]);

  // 3D Parameters State
  const [radius, setRadius] = useState(3);
  const [height, setHeight] = useState(5);
  const [viewMode, setViewMode] = useState<'solid' | 'wireframe'>('solid');
  const [isExploded, setIsExploded] = useState(false);
  const [showDimensions, setShowDimensions] = useState(true);

  const handleReset3D = () => {
    setRadius(3);
    setHeight(5);
    setViewMode('solid');
    setIsExploded(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-4 space-y-6 pb-28">
      {/* 1. TOP SHAPE SELECTOR PILLS (Large touch targets >= 44px) */}
      <div className="flex items-center justify-between gap-2 p-1.5 rounded-2xl bg-[#FFFDF8] border border-[#EADFCB] shadow-2xs">
        {(['cylinder', 'cone', 'sphere'] as ShapeType[]).map((shapeKey) => {
          const isActive = currentShapeKey === shapeKey;
          const data = LESSON_DATA[shapeKey];
          return (
            <button
              key={shapeKey}
              type="button"
              onClick={() => {
                setSelectedShape(shapeKey);
                handleReset3D();
              }}
              className={`flex-1 min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 touch-manipulation ${
                isActive
                  ? 'bg-[#FF6B00] text-white shadow-xs'
                  : 'bg-transparent text-[#766A61] hover:text-[#2D241E] hover:bg-[#FAF5EC]'
              }`}
            >
              <span>{data.name}</span>
            </button>
          );
        })}
      </div>

      {/* Lesson Header Title */}
      <div className="space-y-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B00] bg-orange-100/70 px-2.5 py-0.5 rounded-full border border-orange-200">
          Bài học trực quan Toán 9
        </span>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2D241E] leading-snug">
          {assignedVideo?.title || lesson.vietnameseTitle}
        </h2>
        <p className="text-xs text-[#766A61] leading-relaxed">
          {assignedVideo?.description || lesson.description}
        </p>
      </div>

      {/* STEP 1: VIDEO BÀI GIẢNG (16:9 FULL WIDTH) */}
      <section className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-bold text-[#2D241E]">
          <span className="w-6 h-6 rounded-full bg-[#8F3E32] text-white flex items-center justify-center text-xs">
            1
          </span>
          <h3>Video Bài Giảng Thầy Hiếu (GDPT 2018)</h3>
        </div>

        <MobileVideo
          videoUrl={assignedVideo?.videoUrl || lesson.videoUrl}
          posterUrl={assignedVideo?.thumbnailUrl || lesson.posterUrl}
          title={assignedVideo?.title || lesson.vietnameseTitle}
        />
      </section>

      {/* STEP 2: MÔ HÌNH 3D TƯƠNG TÁC THỜI GIAN THỰC */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-[#2D241E]">
            <span className="w-6 h-6 rounded-full bg-[#FF6B00] text-white flex items-center justify-center text-xs">
              2
            </span>
            <h3>Thí Nghiệm Hình Học 3D</h3>
          </div>
          <span className="text-[11px] text-[#766A61]">Vuốt để xoay 360°</span>
        </div>

        <div className="relative w-full h-[320px] rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E5DCCF] shadow-sm">
          {/* Three.js Canvas */}
          <ThreeDViewer
            shape={currentShapeKey}
            radius={radius}
            height={height}
            onRadiusChange={setRadius}
            onHeightChange={setHeight}
            viewMode={viewMode}
            showAxes={false}
            isAutoRotating={false}
            explorationMode={isExploded ? 'net' : 'explore'}
          />

          {/* Mobile Ergonomic Touch Overlay Controls */}
          <div className="absolute inset-0 pointer-events-none">
            <TouchControls
              onResetView={handleReset3D}
              isExploded={isExploded}
              onToggleExplode={() => setIsExploded(!isExploded)}
              showDimensions={showDimensions}
              onToggleDimensions={() => setShowDimensions(!showDimensions)}
              isWireframe={viewMode === 'wireframe'}
              onToggleWireframe={() => setViewMode(viewMode === 'wireframe' ? 'solid' : 'wireframe')}
              shapeName={lesson.name}
            />
          </div>
        </div>
      </section>

      {/* STEP 3: THẺ CÔNG THỨC TOÁN HỌC KÍCH THƯỚC LỚN (24-32px KaTeX) */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-[#2D241E]">
          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
            3
          </span>
          <h3>Công Thức Cần Nhớ (Chuẩn KaTeX)</h3>
        </div>

        <div className="space-y-3">
          {lesson.formulas.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#FFFDF8] border-2 border-[#E5DCCF] shadow-xs space-y-2 text-center"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-[#8F3E32]">
                {item.label}
              </div>

              {/* Big Math Typography (24px-30px, Centered, High Contrast) */}
              <div className="py-2.5 px-3 rounded-xl bg-[#FAF7F2] border border-[#EADFCB] overflow-x-auto flex items-center justify-center">
                <div className="text-xl sm:text-2xl font-bold text-[#2D241E]">
                  <MathFormula formula={item.latex} display="block" />
                </div>
              </div>

              <p className="text-xs text-[#594D46] leading-relaxed text-left">
                💡 <span className="font-semibold">{item.explanation}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* STEP 4: BÀI TẬP TRẮC NGHIỆM VẬN DỤNG */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-[#2D241E]">
          <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">
            4
          </span>
          <h3>Luyện Tập & Củng Cố Kiến Thức</h3>
        </div>

        <div className="rounded-2xl bg-[#FFFDF8] border border-[#E5DCCF] p-3 shadow-xs">
          <PracticeQuiz shapeType={currentShapeKey} />
        </div>
      </section>
    </div>
  );
};
