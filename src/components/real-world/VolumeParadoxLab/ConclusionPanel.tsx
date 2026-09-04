/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CONCLUSION & PEDAGOGICAL SYNTHESIS PANEL
 * Displays when pourCount === 3 with KaTeX formula derivations & celebration.
 */

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MathFormula, InlineMath } from '../../common/MathFormula';
import { Sparkles, Award, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';

export interface ConclusionPanelProps {
  radius: number;
  height: number;
  predictionAnswer?: 1 | 2 | 3 | 4 | null;
  onNavigateTheory?: () => void;
  onNavigateNextChallenge?: () => void;
}

export const ConclusionPanel: React.FC<ConclusionPanelProps> = ({
  radius,
  height,
  predictionAnswer,
  onNavigateTheory,
  onNavigateNextChallenge
}) => {
  // Fire confetti celebration on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.62 },
        colors: ['#f97316', '#3b82f6', '#10b981', '#f59e0b']
      });
    } catch {
      // safe fallback
    }
  }, []);

  const vCylinder = Math.PI * radius * radius * height;
  const vCone = (1 / 3) * Math.PI * radius * radius * height;

  return (
    <div className="bg-white rounded-3xl border-2 border-emerald-400/80 p-5 sm:p-7 shadow-lg space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>BÍ ẨN ĐƯỢC GIẢI MÃ: NGHỊCH LÝ 1/3!</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Toán 9 SGK
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
              Đúng 3 lần đổ đầy Phễu Nón vừa vặn làm đầy 100% Cốc Trụ (cùng bán kính R, cùng chiều cao h).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1.5">
            <InlineMath math="3 \times V_{\text{nón}} = V_{\text{trụ}}" /> ✓
          </span>
        </div>
      </div>

      {/* Prediction Recap Box */}
      {predictionAnswer !== undefined && predictionAnswer !== null && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 ${
            predictionAnswer === 3
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}
        >
          <div
            className={`p-2 rounded-xl text-white shrink-0 ${
              predictionAnswer === 3 ? 'bg-emerald-600' : 'bg-amber-500'
            }`}
          >
            {predictionAnswer === 3 ? <CheckCircle2 className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
          </div>
          <div className="text-xs sm:text-sm">
            <span className="font-bold">
              Dự đoán ban đầu của em: <u>{predictionAnswer} lần</u>.{' '}
            </span>
            {predictionAnswer === 3 ? (
              <span>
                <strong>Chính xác tuyệt đối!</strong> Trực giác toán học của em rất xuất sắc. Thí nghiệm đã xác nhận đúng 3 phễu nón làm đầy cốc trụ.
              </span>
            ) : (
              <span>
                Qua thí nghiệm trực quan, em đã thấy cần đúng <strong>3 lần đổ</strong>. Đây chính là nghịch lý thú vị: dù có cùng đáy và chiều cao, hình nón chỉ chiếm đúng <strong>1/3</strong> không gian của hình trụ!
              </span>
            )}
          </div>
        </div>
      )}

      {/* Main KaTeX Formula Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Formula 1: Relative ratio */}
        <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80 space-y-2">
          <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">
            1. Mối liên hệ Thể tích
          </span>
          <div className="p-3 bg-white rounded-xl border border-orange-200 text-center shadow-2xs">
            <MathFormula formula="V_{\text{nón}} = \frac{1}{3} V_{\text{trụ}}" displayMode={true} />
          </div>
          <p className="text-xs text-orange-800 leading-relaxed">
            Vì cần đúng <strong>3 phễu nón</strong> đầy nước để làm đầy cốc hình trụ có cùng bán kính đáy <em>R</em> và chiều cao <em>h</em>.
          </p>
        </div>

        {/* Formula 2: Explicit formula */}
        <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200/80 space-y-2">
          <span className="text-xs font-bold text-sky-900 uppercase tracking-wider">
            2. Công thức Tổng quát
          </span>
          <div className="p-3 bg-white rounded-xl border border-sky-200 text-center shadow-2xs">
            <MathFormula formula="V_{\text{nón}} = \frac{1}{3}\pi R^2 h" displayMode={true} />
          </div>
          <p className="text-xs text-sky-800 leading-relaxed">
            Thay công thức thể tích hình trụ <MathFormula formula="V_{\text{trụ}} = \pi R^2 h" /> vào, ta thu được công thức thể tích hình nón.
          </p>
        </div>
      </div>

      {/* Numerical Validation Box for current R & h */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Kiểm chứng số liệu với giá trị hiện tại (R = {radius.toFixed(2)} cm, h = {height.toFixed(2)} cm):</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800">
            <span className="text-slate-400 block text-[10px]">V_nón:</span>
            <strong>{vCone.toFixed(3)} cm³</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800">
            <span className="text-slate-400 block text-[10px]">V_trụ:</span>
            <strong>{vCylinder.toFixed(3)} cm³</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
            <span className="text-emerald-600 block text-[10px]">Tỉ số V_nón / V_trụ:</span>
            <strong>{(vCone / vCylinder).toFixed(4)} = 1/3 ✓</strong>
          </div>
        </div>
      </div>

      {/* Action Navigation */}
      <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
        {onNavigateTheory && (
          <button
            type="button"
            onClick={onNavigateTheory}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Ôn lại Lý thuyết SGK</span>
          </button>
        )}

        {onNavigateNextChallenge && (
          <button
            type="button"
            onClick={onNavigateNextChallenge}
            className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span>Thực hành Bài toán Thực tế</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
