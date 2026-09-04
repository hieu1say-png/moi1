/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { REAL_WORLD_APPLICATIONS, SHAPES_DATA } from '../data/geometryData';
import { RealWorldApplication } from '../types';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { MathFormula, MathText } from '../components/common/MathFormula';
import { RealWorldSvgRenderer } from '../components/real-world/RealWorldSvgIllustrations';
import { LiquidSimulation } from '../components/explore/3d/LiquidSimulation';
import { RealVolumeLab } from '../components/real-world/RealVolumeLab';
import { CanOptimizationSandbox } from '../components/real-world/CanOptimizationSandbox';
import { ConicalHatCraftSandbox } from '../components/real-world/ConicalHatCraftSandbox';
import { SpatialSketchpad } from '../components/real-world/SpatialSketchpad';
import { ArchimedesTrinityComparator } from '../components/real-world/ArchimedesTrinityComparator';
import { useToast } from '../context/ToastContext';
import { useApp } from '../context/AppContext';
import {
  Globe,
  Sparkles,
  Droplets,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RefreshCw,
  Eye,
  EyeOff,
  Award,
  Calculator,
  Lightbulb,
  Check,
  ChevronRight,
  BookOpen,
  Boxes,
  FlaskConical,
  Zap,
  PenTool,
  Scale
} from 'lucide-react';

export const RealWorldView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'problems' | 'volume_lab' | 'can_sandbox' | 'hat_sandbox' | 'sketchpad' | 'archimedes'>('problems');
  const [selectedAppId, setSelectedAppId] = useState<string>(REAL_WORLD_APPLICATIONS[0].id);
  const [filterShape, setFilterShape] = useState<'all' | 'cylinder' | 'cone' | 'sphere'>('all');
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [checkResults, setCheckResults] = useState<Record<string, 'correct' | 'incorrect' | null>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'card' | 'simulation'>('card');

  const { showSuccess, showError, showInfo } = useToast();
  const { userStats, markRealWorldDone, navigateTo } = useApp();

  const selectedApp: RealWorldApplication =
    REAL_WORLD_APPLICATIONS.find((a) => a.id === selectedAppId) || REAL_WORLD_APPLICATIONS[0];

  const filteredApps = REAL_WORLD_APPLICATIONS.filter((app) => {
    if (filterShape === 'all') return true;
    return app.shapeType === filterShape;
  });

  const completedCount = REAL_WORLD_APPLICATIONS.filter((app) =>
    userStats.completedRealWorld?.includes(app.id) || checkResults[app.id] === 'correct'
  ).length;

  const currentInput = userInputs[selectedApp.id] || '';
  const currentResult = checkResults[selectedApp.id] || null;
  const isExplanationVisible = showExplanations[selectedApp.id] || currentResult === 'correct';
  const isHintVisible = showHints[selectedApp.id] || false;
  const isCompleted = userStats.completedRealWorld?.includes(selectedApp.id) || currentResult === 'correct';

  const handleInputChange = (val: string) => {
    // Only allow numbers, dots, and commas
    const sanitized = val.replace(/,/g, '.').replace(/[^0-9.]/g, '');
    setUserInputs((prev) => ({ ...prev, [selectedApp.id]: sanitized }));
    // Clear result if user is modifying
    if (checkResults[selectedApp.id]) {
      setCheckResults((prev) => ({ ...prev, [selectedApp.id]: null }));
    }
  };

  const handleCheckAnswer = () => {
    const quiz = selectedApp.quiz;
    if (!quiz) {
      setShowExplanations((prev) => ({ ...prev, [selectedApp.id]: true }));
      return;
    }

    const numValue = parseFloat(currentInput.trim());
    if (isNaN(numValue)) {
      showError('Vui lòng nhập giá trị số để kiểm tra!');
      return;
    }

    const [minAcceptable, maxAcceptable] = quiz.acceptableRange;
    const isCorrect = numValue >= minAcceptable && numValue <= maxAcceptable;

    if (isCorrect) {
      setCheckResults((prev) => ({ ...prev, [selectedApp.id]: 'correct' }));
      setShowExplanations((prev) => ({ ...prev, [selectedApp.id]: true }));
      markRealWorldDone(selectedApp.id);
      showSuccess(`Chính xác! Bạn đã tìm ra ${quiz.targetParameter} = ${numValue} ${quiz.unit}. (+100 XP)`);
    } else {
      setCheckResults((prev) => ({ ...prev, [selectedApp.id]: 'incorrect' }));
      showError('Kết quả chưa chính xác. Hãy xem lại gợi ý hoặc bấm "Xem lời giải"!');
    }
  };

  const handleReset = () => {
    setUserInputs((prev) => ({ ...prev, [selectedApp.id]: '' }));
    setCheckResults((prev) => ({ ...prev, [selectedApp.id]: null }));
    setShowHints((prev) => ({ ...prev, [selectedApp.id]: false }));
  };

  const toggleExplanation = () => {
    setShowExplanations((prev) => ({ ...prev, [selectedApp.id]: !prev[selectedApp.id] }));
  };

  const toggleHint = () => {
    setShowHints((prev) => ({ ...prev, [selectedApp.id]: !prev[selectedApp.id] }));
  };

  return (
    <div id="view-real-world" className="space-y-6 w-full mx-auto pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0F291E] via-[#059669] to-[#16A34A] text-white p-5 sm:p-6 rounded-3xl shadow-md border border-[#A7F3D0]/30">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center border border-white/20 shrink-0">
            <Globe className="w-6 h-6 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-black/20 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                Toán 9 Thực Tiễn
              </span>
              <span className="text-xs text-emerald-100">Chuyên đề Tuyển sinh vào 10 • ThS. Trần Ngọc Hiếu</span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black tracking-tight mt-1">
              Hình Học Không Gian Trong Đời Sống &amp; Kỹ Thuật
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-2xl">
              Giải quyết các bài toán thực tế về bồn nước inox, lon nước giải khát, đống muối diêm dân, nón lá truyền thống, thùng phuy công nghiệp.
            </p>
          </div>
        </div>

        {/* Progress Badge */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center bg-white/10 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-white/15 shrink-0 gap-1">
          <div className="flex items-center gap-1.5 text-xs text-emerald-100">
            <Award className="w-4 h-4 text-amber-300" />
            <span>Tiến độ thực hành:</span>
          </div>
          <div className="text-base sm:text-lg font-black text-white">
            {completedCount} / {REAL_WORLD_APPLICATIONS.length} bài
          </div>
          <div className="w-24 bg-white/20 h-1.5 rounded-full overflow-hidden hidden sm:block mt-1">
            <div
              className="bg-emerald-300 h-full transition-all duration-500"
              style={{ width: `${(completedCount / REAL_WORLD_APPLICATIONS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Mode Switcher: Problem Solving vs 3D Volume Lab Station vs Real-World Sandboxes */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#F8FAF5] rounded-2xl border border-[#E2EADF] w-fit shadow-2xs">
        <button
          id="btn-mode-problems"
          onClick={() => setViewMode('problems')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            viewMode === 'problems'
              ? 'bg-[#16A34A] text-white shadow-xs'
              : 'text-[#334E40] hover:text-[#0F291E] hover:bg-white'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-200" />
          <span>Bài Toán Thực Tế</span>
        </button>

        <button
          id="btn-mode-can"
          onClick={() => setViewMode('can_sandbox')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            viewMode === 'can_sandbox'
              ? 'bg-[#059669] text-white shadow-xs'
              : 'text-[#334E40] hover:text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0]'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-300" />
          <span>Lon Nước 330ml</span>
        </button>

        <button
          id="btn-mode-hat"
          onClick={() => setViewMode('hat_sandbox')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            viewMode === 'hat_sandbox'
              ? 'bg-[#16A34A] text-white shadow-xs'
              : 'text-[#334E40] hover:text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span>Nón Lá Xứ Huế</span>
        </button>

        <button
          id="btn-mode-sketchpad"
          onClick={() => setViewMode('sketchpad')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            viewMode === 'sketchpad'
              ? 'bg-[#0F291E] text-white shadow-xs'
              : 'text-[#334E40] hover:text-[#0F291E] bg-[#ECFDF5] border border-[#A7F3D0]'
          }`}
        >
          <PenTool className="w-4 h-4 text-emerald-300" />
          <span>Tập Vẽ Hình Vào 10</span>
        </button>

        <button
          id="btn-mode-archimedes"
          onClick={() => setViewMode('archimedes')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            viewMode === 'archimedes'
              ? 'bg-[#0D9488] text-white shadow-xs'
              : 'text-[#334E40] hover:text-[#0D9488] bg-[#F0FDFA] border border-[#99F6E4]'
          }`}
        >
          <Scale className="w-4 h-4 text-teal-200" />
          <span>Tỷ Lệ Vàng 1:2:3</span>
        </button>

        <button
          id="btn-mode-volume-lab"
          onClick={() => setViewMode('volume_lab')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer relative ${
            viewMode === 'volume_lab'
              ? 'bg-[#16A34A] text-white shadow-xs'
              : 'text-[#334E40] hover:text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0]'
          }`}
        >
          <FlaskConical className="w-4 h-4 text-emerald-200" />
          <span>Trạm Rót Nước 1/3</span>
        </button>
      </div>

      {viewMode === 'can_sandbox' ? (
        <CanOptimizationSandbox />
      ) : viewMode === 'hat_sandbox' ? (
        <ConicalHatCraftSandbox />
      ) : viewMode === 'sketchpad' ? (
        <SpatialSketchpad />
      ) : viewMode === 'archimedes' ? (
        <ArchimedesTrinityComparator />
      ) : viewMode === 'volume_lab' ? (
        <RealVolumeLab
          onNavigateTheory={() => navigateTo('/theory')}
          onNavigateNextChallenge={() => setViewMode('problems')}
        />
      ) : (
        <>
          {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
          <button
            id="filter-all"
            onClick={() => setFilterShape('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              filterShape === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tất cả ({REAL_WORLD_APPLICATIONS.length})
          </button>
          <button
            id="filter-cylinder"
            onClick={() => setFilterShape('cylinder')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              filterShape === 'cylinder'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Hình Trụ ({REAL_WORLD_APPLICATIONS.filter((a) => a.shapeType === 'cylinder').length})
          </button>
          <button
            id="filter-cone"
            onClick={() => setFilterShape('cone')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              filterShape === 'cone'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            Hình Nón ({REAL_WORLD_APPLICATIONS.filter((a) => a.shapeType === 'cone').length})
          </button>
          <button
            id="filter-sphere"
            onClick={() => setFilterShape('sphere')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              filterShape === 'sphere'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Hình Cầu ({REAL_WORLD_APPLICATIONS.filter((a) => a.shapeType === 'sphere').length})
          </button>
        </div>

        {/* Global Annotation Toggle */}
        <button
          id="btn-toggle-annotations"
          onClick={() => setShowAnnotations(!showAnnotations)}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          {showAnnotations ? <Eye className="w-3.5 h-3.5 text-blue-600" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
          <span>{showAnnotations ? 'Hiện kích thước đo' : 'Ẩn kích thước'}</span>
        </button>
      </div>

      {/* Main Layout: Left Navigation List & Right Interactive Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Problem Directory */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            <span>Danh mục tình huống</span>
            <span>{filteredApps.length} bài toán</span>
          </div>

          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {/* Featured 3D Experiment Card */}
            <div
              onClick={() => setViewMode('volume_lab')}
              className="p-3.5 rounded-2xl border-2 border-orange-300 bg-gradient-to-r from-orange-50 to-amber-50 hover:border-orange-500 transition-all cursor-pointer flex items-start gap-3 shadow-2xs group"
            >
              <div className="text-2xl p-2 bg-orange-100 rounded-xl shrink-0 group-hover:scale-105 transition-transform">
                🧪
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-800 bg-orange-200/80 px-2 py-0.2 rounded-md">
                    Trạm Thí Nghiệm 3D
                  </span>
                  <span className="text-[10px] text-orange-600 font-bold">● Tương tác</span>
                </div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate group-hover:text-orange-600 transition-colors">
                  Nghịch Lý 1/3 — Bí Ẩn Thể Tích
                </h4>
                <p className="text-[11px] text-slate-600 truncate mt-0.5">
                  Đổ 3 lần phễu nón đầy nước vào cốc trụ
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-orange-600 group-hover:translate-x-0.5 transition-transform shrink-0 self-center" />
            </div>

            {filteredApps.map((app) => {
              const isSelected = app.id === selectedApp.id;
              const appCompleted = userStats.completedRealWorld?.includes(app.id) || checkResults[app.id] === 'correct';

              return (
                <div
                  key={app.id}
                  id={`real-world-item-${app.id}`}
                  onClick={() => {
                    setSelectedAppId(app.id);
                    setActiveTab('card');
                  }}
                  className={`
                    p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 relative group
                    ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-2 ring-blue-200/70'
                        : 'bg-white border-slate-200/90 hover:bg-slate-50 hover:border-slate-300'
                    }
                  `}
                >
                  <div className="text-2xl p-2 bg-slate-100 rounded-xl shrink-0 flex items-center justify-center">
                    {app.imagePlaceholder}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <Badge variant={app.shapeType} size="xs">
                        {app.category}
                      </Badge>
                      {appCompleted ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <Check className="w-3 h-3" /> Đã giải
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">Chưa làm</span>
                      )}
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                      {app.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{app.subtitle}</p>
                  </div>

                  <ChevronRight className={`w-4 h-4 text-slate-400 self-center shrink-0 transition-transform ${isSelected ? 'text-blue-600 translate-x-0.5' : 'group-hover:translate-x-0.5'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Comprehensive Interactive Real-World Card */}
        <div className="lg:col-span-8 space-y-5">
          <Card className="space-y-6 overflow-hidden">
            {/* Card Top Title & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-start gap-3.5">
                <span className="text-4xl p-2.5 bg-blue-50 rounded-2xl shrink-0 shadow-2xs">
                  {selectedApp.imagePlaceholder}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={selectedApp.shapeType} size="xs">
                      {selectedApp.category}
                    </Badge>
                    <span className="text-xs font-semibold text-slate-500">
                      • {SHAPES_DATA[selectedApp.shapeType]?.vietnameseName}
                    </span>
                    {isCompleted && (
                      <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Hoàn thành (+100 XP)
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                    {selectedApp.title}
                  </h2>
                  <p className="text-xs text-slate-500">{selectedApp.subtitle}</p>
                </div>
              </div>
            </div>

            {/* If shape is cylinder, show tabs: Bài toán card / Mô phỏng rót nước 3D */}
            {selectedApp.shapeType === 'cylinder' && (
              <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl w-fit">
                <button
                  id="tab-card-view"
                  onClick={() => setActiveTab('card')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'card'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  Bài Toán &amp; Minh Họa SVG
                </button>
                <button
                  id="tab-sim-view"
                  onClick={() => setActiveTab('simulation')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'simulation'
                      ? 'bg-white text-blue-700 shadow-2xs ring-1 ring-blue-100'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Droplets className="w-3.5 h-3.5 text-cyan-600" />
                  Thực Nghiệm 3D Rót Nước
                </button>
              </div>
            )}

            {/* TAB 1: CARD VIEW WITH SVG ILLUSTRATION & MATH PROBLEM */}
            {activeTab === 'card' ? (
              <div className="space-y-6">
                {/* 1. HÌNH MINH HỌA (Inline SVG with crisp annotations) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
                    <span>1. Hình Minh Họa &amp; Thông Số Kích Thước</span>
                    <span className="text-[11px] text-blue-600 lowercase font-mono">100% inline svg</span>
                  </div>

                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/50 p-2 sm:p-4 flex items-center justify-center relative min-h-[220px]">
                    <RealWorldSvgRenderer
                      illustrationKey={selectedApp.illustrationKey}
                      className="w-full max-w-md h-auto max-h-72 drop-shadow-sm transition-all"
                      showAnnotations={showAnnotations}
                    />
                  </div>
                </div>

                {/* 2. TÌNH HUỐNG THỰC TẾ (Real World Story/Context) */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    <Boxes className="w-4 h-4 text-indigo-600" />
                    <span>2. Tình Huống &amp; Bối Cảnh Thực Tế</span>
                  </div>
                  <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100/80 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-1.5">
                    <p><MathText text={selectedApp.description} /></p>
                    {selectedApp.mathProblem.practicalNote && (
                      <div className="flex items-center gap-1.5 text-xs text-indigo-900 font-semibold pt-1 border-t border-indigo-200/50">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span><MathText text={selectedApp.mathProblem.practicalNote} /></span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. DỮ KIỆN (Given Parameters) */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    3. Dữ Kiện Bài Toán Cho Trước
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedApp.mathProblem.given.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E5DCCF] flex items-center gap-3 text-xs sm:text-sm text-[#3A302B] leading-relaxed shadow-2xs text-left"
                      >
                        <span className="w-5 h-5 rounded-lg bg-[#FDF0ED] text-[#8F3E32] flex items-center justify-center font-bold text-[11px] shrink-0 border border-[#F4D2CA]">
                          {idx + 1}
                        </span>
                        <div className="flex-1 text-left">
                          <MathText text={item} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. CÂU HỎI & ĐỀ BÀI TOÁN (Question) */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    4. Câu Hỏi &amp; Yêu Cầu Tính Toán
                  </div>
                  <div className="p-4 bg-[#FAF7F2] border border-[#E5DCCF] rounded-2xl text-xs sm:text-sm text-[#3A302B] leading-relaxed font-normal shadow-2xs text-left">
                    <MathText text={selectedApp.mathProblem.statement} />
                  </div>
                </div>

                {/* 5 & 6. INTERACTIVE INPUT + KIỂM TRA (Check & Feedback) */}
                {selectedApp.quiz && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-orange-200 text-slate-800 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-orange-500" />
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          5. Ô Nhập Kết Quả &amp; Kiểm Tra Đáp Án
                        </span>
                      </div>
                      <button
                        onClick={toggleHint}
                        className="text-xs text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer transition-colors font-medium"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-orange-500" />
                        <span>{isHintVisible ? 'Ẩn gợi ý' : 'Gợi ý giải'}</span>
                      </button>
                    </div>

                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      <MathText text={selectedApp.quiz.question} />
                    </div>

                    {/* Hint Box (if toggled) */}
                    {isHintVisible && (
                      <div className="p-3 bg-orange-50/70 rounded-xl border border-orange-200 text-xs text-orange-950 space-y-2 animate-fadeIn">
                        <div className="font-bold flex items-center gap-1.5 text-orange-800">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Gợi ý công thức:
                        </div>
                        <div className="text-slate-800"><MathText text={selectedApp.quiz.hint} /></div>
                        <div className="p-2.5 bg-[#FFFDF8] border border-[#F3E8D7] rounded-lg text-slate-900 inline-block font-mono">
                          <MathFormula formula={selectedApp.quiz.formulaHint} />
                        </div>
                      </div>
                    )}

                    {/* Input Field and Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <div className="relative flex-1">
                        <input
                          id={`input-quiz-${selectedApp.id}`}
                          type="text"
                          value={currentInput}
                          onChange={(e) => handleInputChange(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCheckAnswer();
                          }}
                          placeholder={selectedApp.quiz.placeholder}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-16"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                          {selectedApp.quiz.unit}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          id="btn-check-quiz"
                          onClick={handleCheckAnswer}
                          className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Kiểm tra</span>
                        </button>

                        <button
                          id="btn-reset-quiz"
                          onClick={handleReset}
                          title="Làm lại"
                          className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Feedback Status */}
                    {currentResult === 'correct' && (
                      <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl flex items-start gap-2.5 text-xs text-emerald-900 animate-fadeIn">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-emerald-800">Chính xác xuất sắc!</span> Bạn đã tính đúng {selectedApp.quiz.targetParameter}. Xem các bước giải chi tiết bên dưới.
                        </div>
                      </div>
                    )}

                    {currentResult === 'incorrect' && (
                      <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-xl flex items-start gap-2.5 text-xs text-rose-900 animate-fadeIn">
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-rose-800">Chưa chính xác.</span> Hãy kiểm tra lại phép tính làm tròn hoặc bấm "Xem lời giải chi tiết" bên dưới để đối chiếu từng bước.
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 7. GIẢI THÍCH CHI TIẾT & CÁC BƯỚC GIẢI (Step-by-step Solution) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-orange-500" />
                      <span>6. Lời Giải Chi Tiết &amp; Giải Thích Toán Học</span>
                    </div>

                    <button
                      id="btn-toggle-solution"
                      onClick={toggleExplanation}
                      className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      {isExplanationVisible ? 'Thu gọn lời giải' : 'Xem lời giải chi tiết'}
                    </button>
                  </div>

                  {isExplanationVisible ? (
                    <div className="p-4 sm:p-5 rounded-2xl bg-orange-50/40 border border-orange-200 space-y-3 animate-fadeIn">
                      <div className="space-y-3">
                        {selectedApp.mathProblem.solutionSteps.map((step) => (
                          <div
                            key={step.step}
                            className="p-3.5 bg-white rounded-xl border border-orange-100 shadow-2xs space-y-2 text-left"
                          >
                            <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-[11px] shrink-0 font-bold">
                                {step.step}
                              </span>
                              <MathText text={step.text} />
                            </div>
                            {step.latex && (
                              <div className="p-2.5 rounded-lg bg-[#FFFDF8] border border-[#F3E8D7] text-slate-900 overflow-x-auto text-xs sm:text-sm text-center font-mono">
                                <MathFormula formula={step.latex} displayMode={true} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs sm:text-sm font-bold text-emerald-900 flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span>Đáp số: </span>
                          <span className="font-mono text-emerald-700"><MathText text={selectedApp.mathProblem.result} /></span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={toggleExplanation}
                      className="p-4 rounded-2xl border border-dashed border-slate-300 text-center text-xs text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      Nhấp vào đây hoặc nút "Kiểm tra" để mở toàn bộ các bước giải chi tiết và công thức Toán.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* TAB 2: 3D LIQUID SIMULATION */
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Droplets className="w-5 h-5 text-cyan-600" />
                      Mô Phỏng 3D: Rót Nước &amp; Đo Thể Tích Thực Nghiệm
                    </h3>
                    <p className="text-xs text-slate-500">
                      <MathText text="Quan sát dòng nước từ cốc rót vào hình trụ theo công thức $V = \pi r^2 h$." className="text-slate-500" />
                    </p>
                  </div>
                  <span className="text-xs font-mono text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-lg border border-cyan-200">
                    <MathFormula formula="V = \pi r^2 h" />
                  </span>
                </div>

                <LiquidSimulation
                  initialRadius={selectedApp.id === 'rw-bon-nuoc' ? 0.6 : 3.02}
                  initialHeight={selectedApp.id === 'rw-bon-nuoc' ? 1.8 : 11.5}
                  className="w-full shadow-lg rounded-2xl overflow-hidden"
                />
              </div>
            )}
          </Card>
        </div>
      </div>
        </>
      )}
    </div>
  );
};
