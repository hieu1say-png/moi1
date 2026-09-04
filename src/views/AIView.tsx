/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - AI VIEW (AI HÌNH HỌC TOÁN 9)
 * Integrated with Learning Context, 5 Pedagogical Levels, and MathText LaTeX rendering.
 */

import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { MathFormula, MathText } from '../components/common/MathFormula';
import { AIChatPanel } from '../components/ai/AIChatPanel';
import { AIErrorBoundary } from '../components/ai/AIErrorBoundary';
import { ExamTrapRadarBadge } from '../components/practice/ExamTrapRadarBadge';
import {
  Sparkles,
  AlertTriangle,
  Cpu,
  Sliders,
  HelpCircle,
  Layers,
  ArrowRight,
  Radar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLearningContext } from '../context/LearningContext';
import { ShapeType } from '../types';
import { GeometryDataService } from '../data';

const COMMON_ERRORS_BY_SHAPE: Record<ShapeType, string[]> = {
  cylinder: [
    'Quên nhân 2 ở diện tích hai đáy khi tính diện tích toàn phần (Stp = Sxq + 2*Sđáy).',
    'Nhầm đường kính d với bán kính r (quên chia 2).',
    'Nhầm công thức thể tích với diện tích xung quanh.'
  ],
  cone: [
    'Nhầm đường sinh l với chiều cao h (quên định lý Pythagore l = √(h² + r²)).',
    'Quên hệ số 1/3 trong công thức thể tích hình nón V = 1/3 * π * r² * h.',
    'Nhầm diện tích toàn phần hình nón Stp = πrl + πr² (chỉ có 1 đáy tròn).'
  ],
  sphere: [
    'Quên hệ số 4/3 và số mũ r³ trong thể tích khối cầu V = 4/3 * π * R³.',
    'Nhầm diện tích mặt cầu S = 4πR² với chu vi đường tròn lớn C = 2πR.',
    'Quên đổi đường kính sang bán kính trước khi lũy thừa 3.'
  ]
};

export const AIView: React.FC = () => {
  const { selectedShape, setSelectedShape, navigateTo } = useApp();
  const { context, updateContext, set3DParams, setQuestionContext } = useLearningContext();

  const exercises = GeometryDataService.getExercisesByShape(selectedShape);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>(context.questionId || 'custom');
  const [localAnswer, setLocalAnswer] = useState<string>(context.userAnswer ? String(context.userAnswer) : '');

  const handleSelectExercise = (exId: string) => {
    setSelectedExerciseId(exId);
    if (exId === 'custom') {
      setQuestionContext({
        questionId: null,
        questionText: null,
        userAnswer: null,
        expectedAnswer: null
      });
    } else {
      const found = exercises.find((e) => e.id === exId);
      if (found) {
        setQuestionContext({
          questionId: found.id,
          questionText: `${found.title}: ${found.question}`,
          expectedAnswer: (found as any).correctAnswer || (found as any).finalAnswer || null,
          wrongCount: 0,
          attemptCount: 0
        });
      }
    }
  };

  const handleAnswerChange = (ans: string) => {
    setLocalAnswer(ans);
    updateContext({ userAnswer: ans });
  };

  return (
    <div id="view-ai" className="space-y-5 max-w-7xl mx-auto pb-6">
      {/* ---------------------------------------------------- */}
      {/* 1. TOP HEADER BANNER (No Avatar, Pure Math AI)        */}
      {/* ---------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FFFDF8] p-4 sm:p-5 rounded-2xl border border-[#E5DCCF] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#634796] text-white flex items-center justify-center shadow-xs shrink-0">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-serif font-black text-[#3A302B] tracking-tight">
                AI HÌNH HỌC – TOÁN 9
              </h2>
              <span className="px-2 py-0.5 rounded-md bg-[#634796]/10 text-[#634796] text-[10px] font-mono font-bold border border-[#634796]/20">
                GEMINI FLASH
              </span>
            </div>
            <p className="text-xs text-[#766A61] mt-0.5">
              Hệ thống trợ giảng hình học thông minh, tự động đồng bộ ngữ cảnh 3D và bài tập
            </p>
          </div>
        </div>

        {/* Shape Switcher */}
        <div className="flex items-center gap-1.5 bg-[#F4EEE4] p-1 rounded-xl border border-[#E5DCCF]">
          {(['cylinder', 'cone', 'sphere'] as ShapeType[]).map((shape) => (
            <button
              key={shape}
              type="button"
              onClick={() => {
                setSelectedShape(shape);
                updateContext({
                  currentShape: shape,
                  currentActivity: `Học tập và giải toán ${
                    shape === 'cylinder' ? 'Hình Trụ' : shape === 'cone' ? 'Hình Nón' : 'Hình Cầu'
                  }`
                });
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedShape === shape
                  ? 'bg-[#FFFDF8] text-[#3A302B] shadow-2xs border border-[#E5DCCF]'
                  : 'text-[#766A61] hover:text-[#3A302B]'
              }`}
            >
              {shape === 'cylinder' ? 'Hình Trụ' : shape === 'cone' ? 'Hình Nón' : 'Hình Cầu'}
            </button>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. MAIN LAYOUT: Context Controller + AIChatPanel     */}
      {/* ---------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Learning Context & Exercise Injector */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card: Exercise / Scenario Picker */}
          <div className="bg-[#FFFDF8] rounded-2xl border border-[#E5DCCF] p-4 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-[#E5DCCF] pb-2.5">
              <span className="text-xs font-bold text-[#3A302B] uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#634796]" />
                1. Bài Tập / Tình Huống Liên Kết
              </span>
              <span className="text-[10px] font-mono text-[#766A61]">
                {exercises.length} bài tập sẵn có
              </span>
            </div>

            <select
              value={selectedExerciseId}
              onChange={(e) => handleSelectExercise(e.target.value)}
              className="w-full text-xs bg-[#FAF7F2] border border-[#E5DCCF] rounded-xl p-2.5 font-medium text-[#3A302B] focus:outline-none focus:border-[#ED806F]"
            >
              <option value="custom">-- Tự do đặt câu hỏi (Không theo bài tập cố định) --</option>
              {exercises.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  [{ex.type.toUpperCase()}] {ex.title}
                </option>
              ))}
            </select>

            {context.questionText && (
              <div className="p-3 rounded-xl bg-[#FDF0ED] border border-[#F4D2CA] text-xs space-y-1.5 animate-fadeIn">
                <div className="font-bold text-[#8F3E32] flex items-center justify-between">
                  <span>Bài toán đang liên kết với AI:</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white font-mono text-[#8F3E32] border border-[#F4D2CA]">
                    {context.currentShape}
                  </span>
                </div>
                <div className="text-[#3A302B] leading-relaxed text-[11px]">
                  <MathText text={context.questionText} />
                </div>
              </div>
            )}

            {/* Student's answer field */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-bold text-[#3A302B] flex items-center justify-between">
                <span>2. Kết quả bạn đã tính ra (nếu có):</span>
                <span className="text-[10px] text-[#766A61] font-normal">Tự động gửi kèm AI</span>
              </label>
              <input
                type="text"
                value={localAnswer}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder="VD: 50.24 cm² hoặc 200 lít hoặc 25 cm..."
                className="w-full text-xs bg-[#FAF7F2] border border-[#E5DCCF] rounded-xl p-2.5 text-[#3A302B] focus:outline-none focus:border-[#ED806F]"
              />
              <span className="text-[10px] text-[#A0958B] block leading-tight">
                AI sẽ đối chiếu kết quả này với công thức chuẩn để chỉ ra chỗ bạn tính nhầm.
              </span>
            </div>
          </div>

          {/* Card: 3D Simulation Parameter Controls */}
          <div className="bg-[#FFFDF8] rounded-2xl border border-[#E5DCCF] p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#E5DCCF] pb-2">
              <span className="text-xs font-bold text-[#3A302B] uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#8F3E32]" />
                3. Trạng Thái Thông Số 3D
              </span>
              <button
                type="button"
                onClick={() => navigateTo('/explore')}
                className="text-[11px] text-[#8F3E32] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
              >
                Mở phòng 3D <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-[11px] font-bold text-[#594D46] mb-1">
                  <span>Bán kính đáy (<MathFormula formula="r" />):</span>
                  <span className="font-mono text-[#8F3E32]">{context.currentR ?? 3} cm</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={context.currentR ?? 3}
                  onChange={(e) => set3DParams(parseFloat(e.target.value), context.currentH ?? 6)}
                  className="w-full accent-[#8F3E32] cursor-pointer"
                />
              </div>

              {selectedShape !== 'sphere' && (
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-[#594D46] mb-1">
                    <span>Chiều cao (<MathFormula formula="h" />):</span>
                    <span className="font-mono text-[#8F3E32]">{context.currentH ?? 6} cm</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="15"
                    step="0.5"
                    value={context.currentH ?? 6}
                    onChange={(e) => set3DParams(context.currentR ?? 3, parseFloat(e.target.value))}
                    className="w-full accent-[#8F3E32] cursor-pointer"
                  />
                </div>
              )}

              {selectedShape === 'cone' && (
                <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#E5DCCF] flex items-center justify-between text-[11px]">
                  <span className="text-[#594D46]">Đường sinh tính toán (<MathFormula formula="l" />):</span>
                  <span className="font-mono font-bold text-[#8F3E32]">
                    l = {context.currentL ?? Math.sqrt((context.currentR ?? 3) ** 2 + (context.currentH ?? 6) ** 2).toFixed(2)} cm
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Card: Common Mistakes & Pitfalls */}
          <div className="bg-[#FFFDF8] rounded-2xl border border-[#E5DCCF] p-4 shadow-xs space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#8F3E32]">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Bẫy &amp; Lỗi sai thường gặp ({selectedShape}):</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-[#594D46]">
              {COMMON_ERRORS_BY_SHAPE[selectedShape].map((err, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-1.5 bg-[#FAF7F2] p-2 rounded-xl border border-[#E5DCCF]"
                >
                  <span className="text-[#8F3E32] font-bold shrink-0">•</span>
                  <span className="leading-snug"><MathText text={err} /></span>
                </li>
              ))}
            </ul>
          </div>

          {/* STEM [M] AI Radar Quét Bẫy & Lời Giải 4 Bước */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#0F291E] px-1">
              <span className="flex items-center gap-1.5">
                <Radar className="w-3.5 h-3.5 text-[#16A34A] animate-pulse" />
                <span>AI Radar Quét Bẫy Đề Tuyển Sinh 10:</span>
              </span>
            </div>
            <ExamTrapRadarBadge
              shape={selectedShape}
              questionText={context.questionText || `Bẫy đề thi về hình ${selectedShape} đường kính và thể tích`}
              isAlwaysVisible={true}
              showFullFourSteps={true}
            />
          </div>
        </div>

        {/* Right Column: Complete Responsive AIChatPanel */}
        <div className="lg:col-span-7">
          <AIErrorBoundary shapeName={selectedShape}>
            <AIChatPanel className="w-full min-h-[580px]" />
          </AIErrorBoundary>
        </div>
      </div>
    </div>
  );
};
