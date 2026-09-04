/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SOLUTION TIMELINE COMPONENT
 * Renders a vertical pedagogical step-by-step solution timeline with motion animation
 * and full KaTeX mathematical rendering.
 */

import React from 'react';
import { motion } from 'motion/react';
import { MathFormula, MathText } from '../common/MathFormula';
import { CheckCircle, Lightbulb, Calculator, Target, BookOpen, AlertCircle } from 'lucide-react';

export interface SolutionStep {
  stepNumber: number;
  title: string;
  subtitle?: string;
  description: string;
  latex?: string;
  intermediateResult?: string;
  tip?: string;
  type?: 'given' | 'formula' | 'calc' | 'conclusion' | 'warning';
}

interface SolutionTimelineProps {
  steps: SolutionStep[];
  isCorrect?: boolean;
}

export const SolutionTimeline: React.FC<SolutionTimelineProps> = ({
  steps,
  isCorrect = true,
}) => {
  const getStepIcon = (type?: string, index: number = 0) => {
    switch (type) {
      case 'given':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'formula':
        return <Calculator className="w-4 h-4 text-[#C96859]" />;
      case 'calc':
        return <Lightbulb className="w-4 h-4 text-amber-600" />;
      case 'conclusion':
        return <Target className="w-4 h-4 text-emerald-600" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-rose-600" />;
      default:
        return <span className="font-bold text-xs">{index + 1}</span>;
    }
  };

  const getStepBadgeColor = (type?: string) => {
    switch (type) {
      case 'given':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'formula':
        return 'bg-[#FFF6F4] border-[#F4D2CA] text-[#8F3E32]';
      case 'calc':
        return 'bg-amber-50 border-amber-200 text-amber-900';
      case 'conclusion':
        return 'bg-emerald-50 border-emerald-200 text-emerald-900';
      case 'warning':
        return 'bg-rose-50 border-rose-200 text-rose-900';
      default:
        return 'bg-slate-100 border-slate-200 text-slate-700';
    }
  };

  return (
    <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E5DCCF]">
      {steps.map((step, idx) => {
        return (
          <motion.div
            key={step.stepNumber || idx}
            initial={{ opacity: 0, x: -16, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              duration: 0.35,
              delay: idx * 0.12,
              ease: 'easeOut',
            }}
            className="relative group"
          >
            {/* Step Node Marker on Vertical Line */}
            <div
              className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 bg-[#FFFDF8] flex items-center justify-center shadow-xs transition-transform group-hover:scale-110 ${
                step.type === 'conclusion'
                  ? 'border-emerald-500 text-emerald-600 bg-emerald-50/50'
                  : step.type === 'formula'
                  ? 'border-[#ED806F] text-[#ED806F] bg-[#FFF6F4]'
                  : 'border-[#D0C7B9] text-[#766A61]'
              }`}
            >
              {getStepIcon(step.type, idx)}
            </div>

            {/* Step Content Box */}
            <div className="bg-[#FFFDF8] border border-[#E5DCCF] rounded-2xl p-4 sm:p-5 shadow-2xs hover:border-[#D0C7B9] transition-all space-y-3">
              {/* Step Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`px-2.5 py-1 rounded-lg border text-xs font-bold uppercase tracking-wider font-mono ${getStepBadgeColor(
                      step.type
                    )}`}
                  >
                    Bước {step.stepNumber || idx + 1}
                  </span>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#2A201B]">
                    {step.title}
                  </h4>
                </div>
                {step.subtitle && (
                  <span className="text-xs sm:text-sm text-[#766A61] font-medium font-sans">
                    {step.subtitle}
                  </span>
                )}
              </div>

              {/* Step Description / Text */}
              <div className="gl-solution-text font-sans font-normal whitespace-pre-line text-[#2E2926]">
                <MathText text={step.description} />
              </div>

              {/* Math Formula Highlight Box (if provided) */}
              {step.latex && (
                <div className="my-2.5 gl-formula-box font-mono text-sm sm:text-base text-[#1A1512]">
                  <MathFormula formula={step.latex} displayMode={true} />
                </div>
              )}

              {/* Intermediate Result / Calculation Note */}
              {step.intermediateResult && (
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#F6FAF4] border border-[#D0DEC9] text-xs sm:text-sm text-[#38542F] font-semibold">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Kết quả bước này: <strong className="font-mono text-emerald-900"><MathText text={step.intermediateResult} /></strong>
                  </span>
                </div>
              )}

              {/* Pedagogical Tip / Warning Note */}
              {step.tip && (
                <div className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#FFF8EE] border border-[#F5E6BF] text-xs sm:text-sm text-[#7A571B]">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold">Lưu ý sư phạm: </span>
                    <span className="leading-relaxed"><MathText text={step.tip} /></span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
