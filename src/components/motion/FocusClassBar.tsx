/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SCALORA FOCUS MODE CLASS / EMAIL INPUT BAR
 * 1. Focus Mode: Clicking this input triggers .focus-mode on body, dimming the background
 * 2. Hand-drawn curved SVG arrow pointing to the CTA button
 * 3. Confetti explosion & button shake upon successful entry
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Check, KeyRound, ArrowRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const FocusClassBar: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { showSuccess } = useToast();

  const handleFocus = () => {
    setIsFocused(true);
    document.body.classList.add('focus-mode');
  };

  const handleBlur = () => {
    setIsFocused(false);
    document.body.classList.remove('focus-mode');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Trigger button shake
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    // Trigger confetti
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#16A34A', '#22C55E', '#F59E0B', '#3B82F6', '#EC4899'],
      });
    } catch {}

    setIsSuccess(true);
    showSuccess(`Đã kết nối phòng thí nghiệm mã lớp [${inputValue.trim()}] thành công!`);

    setTimeout(() => {
      setIsSuccess(false);
      setInputValue('');
      document.body.classList.remove('focus-mode');
      setIsFocused(false);
    }, 2000);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto my-6 z-40">
      <form
        onSubmit={handleSubmit}
        className={`relative flex items-center p-2 rounded-2xl bg-white border-2 transition-all duration-300 shadow-md ${
          isFocused
            ? 'border-emerald-500 ring-4 ring-emerald-500/20 shadow-2xl scale-[1.02]'
            : 'border-[#E2EADF] hover:border-emerald-400'
        }`}
      >
        <div className="pl-3 pr-2 text-emerald-600">
          <KeyRound className="w-5 h-5" />
        </div>

        <input
          id="input-class-code-focus"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Nhập mã lớp (ví dụ: 9A1-2025) hoặc Email học sinh để kích hoạt Focus Mode..."
          className="w-full py-2.5 px-2 text-xs sm:text-sm font-medium text-[#0F291E] placeholder-slate-400 focus:outline-none bg-transparent"
        />

        <button
          id="btn-submit-focus-code"
          type="submit"
          disabled={!inputValue.trim()}
          className={`relative shrink-0 flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
            isShaking ? 'animate-shake' : ''
          } ${
            isSuccess
              ? 'bg-emerald-600 text-white'
              : inputValue.trim()
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs hover:scale-105 active:scale-95'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          {isSuccess ? (
            <>
              <Check className="w-4 h-4" />
              <span>Đã Kết Nối!</span>
            </>
          ) : (
            <>
              <span>Vào Lớp</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Hand-drawn Curved SVG Arrow pointing to the Submit button */}
      <div className="relative -mt-1 flex items-center justify-end pr-8 pointer-events-none select-none">
        <div className="flex items-center gap-2">
          <span className="font-reenie text-xl sm:text-2xl text-emerald-800 font-bold -rotate-3">
            Bấm vào đây để kết nối phòng học! ✨
          </span>
          <svg
            className="w-14 h-8 text-emerald-700 animate-bounce"
            viewBox="0 0 100 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 40 C 35 45, 60 30, 85 15"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M72 10 L 87 14 L 80 28"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
