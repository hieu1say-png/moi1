/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NON-OBSTRUCTIVE HUD: GEOMETRY CHALLENGE MODE
 * Sits outside the 3D WebGL Canvas for 100% unobstructed 3D visibility
 */

import React, { useState } from 'react';
import { Trophy, CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react';
import { MathFormula, MathText } from '../../common/MathFormula';
import { ShapeType } from '../../../types';

export interface ChallengeQuestion {
  id: string;
  title: string;
  question: string;
  options: Array<{
    text: string;
    isCorrect: boolean;
  }>;
  explanation: string;
  targetR: number;
  targetH?: number;
}

export const DEFAULT_CHALLENGE_QUESTIONS: Record<ShapeType, ChallengeQuestion[]> = {
  cylinder: [
    {
      id: 'cyl-q1',
      title: 'Tính diện tích xung quanh hình trụ',
      question: 'Một hình trụ có bán kính đáy $r = 4\\text{ cm}$ và chiều cao $h = 8\\text{ cm}$. Tính diện tích xung quanh $S_{xq}$ của hình trụ.',
      options: [
        { text: '32\\pi\\text{ cm}^2', isCorrect: false },
        { text: '64\\pi\\text{ cm}^2', isCorrect: true },
        { text: '96\\pi\\text{ cm}^2', isCorrect: false },
        { text: '128\\pi\\text{ cm}^2', isCorrect: false }
      ],
      explanation: 'S_{xq} = 2\\pi r h = 2\\pi \\times 4 \\times 8 = 64\\pi \\approx 201.06\\text{ cm}^2',
      targetR: 4,
      targetH: 8
    },
    {
      id: 'cyl-q2',
      title: 'Tính thể tích hình trụ',
      question: 'Tính thể tích của hình trụ có bán kính $r = 3\\text{ cm}$ và chiều cao $h = 5\\text{ cm}$.',
      options: [
        { text: '15\\pi\\text{ cm}^3', isCorrect: false },
        { text: '30\\pi\\text{ cm}^3', isCorrect: false },
        { text: '45\\pi\\text{ cm}^3', isCorrect: true },
        { text: '75\\pi\\text{ cm}^3', isCorrect: false }
      ],
      explanation: 'V = \\pi r^2 h = \\pi \\times 3^2 \\times 5 = 45\\pi \\approx 141.37\\text{ cm}^3',
      targetR: 3,
      targetH: 5
    }
  ],
  sphere: [
    {
      id: 'sph-q1',
      title: 'Tính diện tích mặt cầu',
      question: 'Cho mặt cầu có bán kính $R = 4\\text{ cm}$. Tính diện tích $S$ của mặt cầu.',
      options: [
        { text: '16\\pi\\text{ cm}^2', isCorrect: false },
        { text: '32\\pi\\text{ cm}^2', isCorrect: false },
        { text: '64\\pi\\text{ cm}^2', isCorrect: true },
        { text: '128\\pi\\text{ cm}^2', isCorrect: false }
      ],
      explanation: 'S = 4\\pi R^2 = 4\\pi \\times 4^2 = 64\\pi \\approx 201.06\\text{ cm}^2',
      targetR: 4
    },
    {
      id: 'sph-q2',
      title: 'Tính thể tích khối cầu',
      question: 'Cho hình cầu có bán kính $R = 3\\text{ cm}$. Tính thể tích $V$ của hình cầu.',
      options: [
        { text: '12\\pi\\text{ cm}^3', isCorrect: false },
        { text: '27\\pi\\text{ cm}^3', isCorrect: false },
        { text: '36\\pi\\text{ cm}^3', isCorrect: true },
        { text: '108\\pi\\text{ cm}^3', isCorrect: false }
      ],
      explanation: 'V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi \\times 3^3 = 36\\pi \\approx 113.10\\text{ cm}^3',
      targetR: 3
    }
  ],
  cone: [
    {
      id: 'cone-q1',
      title: 'Tính đường sinh hình nón',
      question: 'Một hình nón có bán kính đáy $r = 3\\text{ cm}$ và chiều cao $h = 4\\text{ cm}$. Tính độ dài đường sinh $l$.',
      options: [
        { text: 'l = 5\\text{ cm}', isCorrect: true },
        { text: 'l = 7\\text{ cm}', isCorrect: false },
        { text: 'l = \\sqrt{7}\\text{ cm}', isCorrect: false },
        { text: 'l = 25\\text{ cm}', isCorrect: false }
      ],
      explanation: 'l = \\sqrt{r^2 + h^2} = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5\\text{ cm}',
      targetR: 3,
      targetH: 4
    }
  ]
};

export interface GeometryChallengeHUDProps {
  shape: ShapeType;
  questions?: ChallengeQuestion[];
  currentIndex?: number;
  score?: number;
  onSelectAnswer?: (optionIndex: number) => void;
  onNextQuestion?: () => void;
  onRestart?: () => void;
  onSyncModelParams?: (r: number, h?: number) => void;
  className?: string;
}

export const GeometryChallengeHUD: React.FC<GeometryChallengeHUDProps> = ({
  shape,
  questions: passedQuestions,
  currentIndex: passedIndex,
  score: passedScore,
  onSelectAnswer,
  onNextQuestion,
  onRestart,
  onSyncModelParams,
  className = ''
}) => {
  const [internalIndex, setInternalIndex] = useState<number>(0);
  const [internalScore, setInternalScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  const questions = passedQuestions || DEFAULT_CHALLENGE_QUESTIONS[shape] || DEFAULT_CHALLENGE_QUESTIONS.cylinder;
  const currentIndex = passedIndex !== undefined ? passedIndex : internalIndex;
  const score = passedScore !== undefined ? passedScore : internalScore;

  const currentQ = questions[currentIndex] || questions[0];

  const handleConfirm = () => {
    if (selectedAnswer === null) return;
    setIsAnswerSubmitted(true);
    if (currentQ.options[selectedAnswer]?.isCorrect) {
      setInternalScore(prev => prev + 1);
    }
    if (onSelectAnswer) {
      onSelectAnswer(selectedAnswer);
    }
    if (onSyncModelParams) {
      onSyncModelParams(currentQ.targetR, currentQ.targetH);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    if (currentIndex + 1 < questions.length) {
      setInternalIndex(prev => prev + 1);
    } else {
      setInternalIndex(0);
      setInternalScore(0);
    }
    if (onNextQuestion) {
      onNextQuestion();
    }
  };

  const handleRetryCurrent = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
  };

  return (
    <div
      id="docked-geometry-challenge-hud"
      className={`bg-white rounded-2xl sm:rounded-3xl border border-orange-200 shadow-sm p-4 sm:p-5 space-y-4 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-100 border border-orange-200 text-orange-600 flex items-center justify-center font-bold text-sm">
            <Trophy className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-gray-900">
              {currentQ.title}
            </h4>
            <span className="text-[10px] text-gray-500 font-mono">
              Câu hỏi {currentIndex + 1} / {questions.length} &bull; Điểm: <strong className="text-orange-600">{score}</strong> / {questions.length}
            </span>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-orange-700 uppercase">
          Thử thách {shape === 'sphere' ? 'Hình Cầu' : 'Hình Trụ'}
        </span>
      </div>

      {/* Question Statement */}
      <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-800 leading-relaxed">
        <MathText text={currentQ.question} />
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedAnswer === idx;
          let btnStyle = 'bg-white border-gray-200 text-gray-800 hover:bg-orange-50/50 hover:border-orange-300';

          if (isAnswerSubmitted) {
            if (opt.isCorrect) {
              btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-1 ring-emerald-400';
            } else if (isSelected && !opt.isCorrect) {
              btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
            } else {
              btnStyle = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60';
            }
          } else if (isSelected) {
            btnStyle = 'bg-orange-50 border-orange-500 text-orange-950 font-bold ring-1 ring-orange-400';
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={isAnswerSubmitted}
              onClick={() => setSelectedAnswer(idx)}
              className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center justify-between gap-2.5 min-h-[44px] ${btnStyle}`}
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-mono text-[10px] text-gray-700 shrink-0 font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                <MathText text={opt.text} />
              </div>
              {isAnswerSubmitted && opt.isCorrect && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Action Footer & Feedback Explanation */}
      <div className="pt-2 border-t border-gray-100">
        {!isAnswerSubmitted ? (
          <div className="flex justify-end">
            <button
              type="button"
              disabled={selectedAnswer === null}
              onClick={handleConfirm}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedAnswer !== null
                  ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Xác nhận câu trả lời
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200 text-xs text-gray-800 space-y-1">
              <strong className="text-orange-900 block font-bold">Lời giải chi tiết (Toán 9):</strong>
              <MathFormula formula={currentQ.explanation} className="block overflow-x-auto py-1" />
            </div>

            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleRetryCurrent}
                className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold cursor-pointer border border-gray-200 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
                <span>Làm lại câu này</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>{currentIndex + 1 < questions.length ? 'Câu tiếp theo' : 'Bắt đầu lại vòng thi'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeometryChallengeHUD;
