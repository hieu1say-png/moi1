/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - TEACHER SPATIAL PROFILE & M1-M5 COMPETENCY ANALYTICS TAB
 * Full integration of:
 * - 5 Mathematical Competencies M1 - M5 (Chương trình GDPT 2018)
 * - Interactive Pentagonal Radar Chart with class aggregate scores
 * - 8 Spatial Thinking Dimensions
 * - Pedagogical diagnosis and interventions from ThS. Trần Ngọc Hiếu
 */

import React, { useState } from 'react';
import { SchoolClass, Student } from '../../types/dataArchitecture';
import { SPATIAL_METRIC_CONFIG, SpatialMetricKey, getScoreTier, getTierColor, getTierLabel } from '../../stores/useSpatialProfileStore';
import { CompetencyEvaluator } from '../../services/competencyEvaluator';
import {
  Brain,
  Sparkles,
  TrendingUp,
  Layers,
  Compass,
  Ruler,
  Scissors,
  Box,
  RotateCw,
  BrainCircuit,
  Award,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Users,
  Printer,
  Target
} from 'lucide-react';
import { Button } from '../common/Button';

interface TeacherSpatialProfileTabProps {
  classes: SchoolClass[];
  students: Student[];
  selectedClassId: string;
  setSelectedClassId: (id: string) => void;
}

export const TeacherSpatialProfileTab: React.FC<TeacherSpatialProfileTabProps> = ({
  classes,
  students,
  selectedClassId,
  setSelectedClassId
}) => {
  const [viewMode, setViewMode] = useState<'m1_m5' | '8_dimensions'>('m1_m5');
  const [selectedDimension, setSelectedDimension] = useState<SpatialMetricKey>('shapeRecognition');
  const [selectedCompetency, setSelectedCompetency] = useState<'M1' | 'M2' | 'M3' | 'M4' | 'M5'>('M1');

  // M1 - M5 Class Evaluation
  const classEvaluation = CompetencyEvaluator.evaluate({
    studentId: 'class-aggregate',
    studentName: 'Toàn lớp 9A2',
    className: '9A2',
    spatialScores: {
      shapeRecognition: 88,
      spatialOrientation: 84,
      elementIdentification: 76,
      spatialTransformation: 68,
      twoDToThreeD: 72,
      threeDToTwoD: 70,
      mathematicalModeling: 79,
      problemSolving: 82
    },
    exploredShapesCount: 3,
    completedPracticesCount: 4,
    quizAccuracy: 84,
    labInteractionsCount: 25,
    socraticInteractionsCount: 8,
    unfoldCompleted: true,
    waterPourParadoxExplained: true
  });

  const metricKeys: SpatialMetricKey[] = [
    'shapeRecognition',
    'spatialOrientation',
    'elementIdentification',
    'spatialTransformation',
    'twoDToThreeD',
    'threeDToTwoD',
    'mathematicalModeling',
    'problemSolving'
  ];

  // Class aggregate averages
  const dimensionAverages: Record<SpatialMetricKey, number> = {
    shapeRecognition: 88,
    spatialOrientation: 84,
    elementIdentification: 76,
    spatialTransformation: 68,
    twoDToThreeD: 72,
    threeDToTwoD: 70,
    mathematicalModeling: 79,
    problemSolving: 82
  };

  const getDimensionIcon = (key: SpatialMetricKey) => {
    switch (key) {
      case 'shapeRecognition':
        return <Layers className="w-5 h-5 text-orange-600" />;
      case 'spatialOrientation':
        return <Compass className="w-5 h-5 text-sky-600" />;
      case 'elementIdentification':
        return <Ruler className="w-5 h-5 text-amber-600" />;
      case 'spatialTransformation':
        return <Scissors className="w-5 h-5 text-emerald-600" />;
      case 'twoDToThreeD':
        return <Box className="w-5 h-5 text-indigo-600" />;
      case 'threeDToTwoD':
        return <RotateCw className="w-5 h-5 text-purple-600" />;
      case 'mathematicalModeling':
        return <BrainCircuit className="w-5 h-5 text-teal-600" />;
      case 'problemSolving':
        return <Award className="w-5 h-5 text-amber-600" />;
    }
  };

  const selectedConfig = SPATIAL_METRIC_CONFIG[selectedDimension];
  const selectedComp = classEvaluation.competencies[selectedCompetency];

  // SVG Radar Chart Math for 5 Competencies (Pentagon)
  const center = 150;
  const radius = 100;
  const points = classEvaluation.radarData.map((d, i) => {
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    const r = (d.score / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle, label: d.subject, score: d.score, code: d.code };
  });

  const polygonPath = points.map((p) => `${p.x},${p.y}`).join(' ');

  // Web levels (20%, 40%, 60%, 80%, 100%)
  const webLevels = [0.2, 0.4, 0.6, 0.8, 1.0].map((lvl) => {
    const pts = [0, 1, 2, 3, 4].map((i) => {
      const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      const r = lvl * radius;
      return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
    });
    return pts.join(' ');
  });

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Header & View Mode Switcher */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Target className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              Bản Đồ Đánh Giá Năng Lực Học Sinh (STEM 5.0)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Theo khung năng lực Toán học Chương trình GDPT 2018 (M1 - M5) và 8 chiều tư duy không gian.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setViewMode('m1_m5')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                viewMode === 'm1_m5'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              5 Năng Lực (M1 - M5)
            </button>
            <button
              type="button"
              onClick={() => setViewMode('8_dimensions')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                viewMode === '8_dimensions'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              8 Chiều Không Gian
            </button>
          </div>

          {/* Class Filter */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-2xl text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="bg-transparent font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} ({cls.totalStudents} HS)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {viewMode === 'm1_m5' ? (
        /* ================= M1 - M5 COMPETENCY RADAR & DETAILS ================= */
        <div className="space-y-6">
          {/* Radar & Summary Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Pentagon Radar Chart */}
            <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-indigo-600" />
                  <span>Biểu đồ Radar Năng lực Toán 9 (M1 - M5)</span>
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Điểm TB Lớp: {classEvaluation.overallScore}/100
                </span>
              </div>

              <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center my-2">
                <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
                  {/* Radar Web Guidelines */}
                  {webLevels.map((lvlPath, idx) => (
                    <polygon
                      key={idx}
                      points={lvlPath}
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Radial Axis lines */}
                  {points.map((p, i) => {
                    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                    const x2 = center + radius * Math.cos(angle);
                    const y2 = center + radius * Math.sin(angle);
                    return (
                      <line
                        key={i}
                        x1={center}
                        y1={center}
                        x2={x2}
                        y2={y2}
                        stroke="#CBD5E1"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                    );
                  })}

                  {/* Competency Fill Area */}
                  <polygon
                    points={polygonPath}
                    fill="rgba(79, 70, 229, 0.2)"
                    stroke="#4F46E5"
                    strokeWidth="2.5"
                    className="transition-all duration-500"
                  />

                  {/* Points & Data Labels */}
                  {points.map((p, i) => {
                    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                    const lx = center + (radius + 24) * Math.cos(angle);
                    const ly = center + (radius + 20) * Math.sin(angle);

                    return (
                      <g key={i} className="cursor-pointer" onClick={() => setSelectedCompetency(p.code as any)}>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r="5"
                          className="fill-indigo-600 stroke-white stroke-2 hover:r-7 transition-all"
                        />
                        <text
                          x={lx}
                          y={ly}
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight="bold"
                          fill={selectedCompetency === p.code ? '#4338CA' : '#475569'}
                        >
                          {p.code} ({p.score})
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="text-[11px] text-slate-500 text-center mt-2 flex flex-wrap justify-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  <span>Điểm thực tế</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                  <span>Chuẩn đầu ra GDPT 2018</span>
                </span>
              </div>
            </div>

            {/* Pedagogical Diagnosis & Strengths */}
            <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Nhận Xét Sư Phạm Toàn Diện Từ ThS. Trần Ngọc Hiếu</span>
                </h3>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-slate-800 leading-relaxed mb-4">
                  "{classEvaluation.teacherPedagogicalAdvice}"
                </div>

                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Điểm sáng năng lực của lớp:</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600 pl-4 list-disc">
                    {classEvaluation.strengths.map((st, i) => (
                      <li key={i}>{st}</li>
                    ))}
                  </ul>

                  <h4 className="text-xs font-bold text-amber-800 flex items-center gap-1.5 pt-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Cần bồi dưỡng thêm:</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600 pl-4 list-disc">
                    {classEvaluation.growthOpportunities.map((go, i) => (
                      <li key={i}>{go}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Xếp loại tổng thể: <strong className="text-indigo-700 font-bold">{classEvaluation.overallTier}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>In Báo Cáo Lớp</span>
                </button>
              </div>
            </div>
          </div>

          {/* 5 Competency Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {Object.values(classEvaluation.competencies).map((comp) => {
              const isSelected = selectedCompetency === comp.id;

              return (
                <button
                  key={comp.id}
                  type="button"
                  onClick={() => setSelectedCompetency(comp.id)}
                  className={`p-4 rounded-2xl sm:rounded-3xl bg-white border text-left transition-all cursor-pointer shadow-xs ${
                    isSelected
                      ? 'border-indigo-600 ring-2 ring-indigo-200 shadow-md'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-xl bg-indigo-50 text-indigo-700 font-black text-xs flex items-center justify-center">
                      {comp.code}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {comp.score}%
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{comp.name}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                    {comp.description}
                  </p>

                  <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-indigo-600"
                      style={{ width: `${comp.score}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed View on Selected Competency */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <span className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-800 font-black text-sm flex items-center justify-center">
                  {selectedComp.code}
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Năng lực: {selectedComp.name} ({selectedComp.score}/100)
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedComp.description}
                  </p>
                </div>
              </div>

              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wide pt-1">
                Các chỉ số hành vi sư phạm quan sát được:
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {selectedComp.indicators.map((ind, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Giải pháp can thiệp sư phạm</span>
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedComp.recommendation}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-indigo-200">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full justify-center text-xs font-bold bg-indigo-600 hover:bg-indigo-700"
                >
                  Tạo phiếu bài tập rèn luyện {selectedComp.code}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ================= 8 SPATIAL DIMENSIONS ================= */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {metricKeys.map((key) => {
              const config = SPATIAL_METRIC_CONFIG[key];
              const score = dimensionAverages[key];
              const tier = getScoreTier(score);
              const colors = getTierColor(tier);
              const isSelected = selectedDimension === key;

              return (
                <div
                  key={key}
                  onClick={() => setSelectedDimension(key)}
                  className={`p-4 rounded-2xl sm:rounded-3xl bg-white border transition-all cursor-pointer shadow-xs hover:shadow-md ${
                    isSelected
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                      {getDimensionIcon(key)}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colors.badge}`}>
                      {score}% • {getTierLabel(tier)}
                    </span>
                  </div>

                  <div className="mt-3">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{config.label}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                      {config.description}
                    </p>
                  </div>

                  <div className="mt-3.5 pt-2 border-t border-slate-100">
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${colors.fill}`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep dive on 8 dimensions */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600">
                  {getDimensionIcon(selectedDimension)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Chi tiết năng lực: {selectedConfig.label}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedConfig.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                  <h5 className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Học sinh làm chủ tốt (≥ 80%)
                  </h5>
                  <p className="text-xs text-slate-600">
                    28 / 35 học sinh đã hoàn thành xuất sắc các bài tập 3D xoay chiều và nhận diện thiết diện.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                  <h5 className="text-xs font-bold text-amber-800 flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    Cần hướng dẫn thêm
                  </h5>
                  <p className="text-xs text-slate-600">
                    7 học sinh thường nhầm lẫn khi quan sát hình chiếu 2D và cần thêm gợi ý từ AI.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Đề xuất phương pháp giảng dạy
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cho học sinh thực hành trực tiếp thí nghiệm 3D rót nước và mở mặt cắt trên bảng tương tác thông minh để củng cố trực quan.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full justify-center text-xs font-bold bg-blue-600 hover:bg-blue-700"
                >
                  Tạo bài luyện tập cho năng lực này
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
