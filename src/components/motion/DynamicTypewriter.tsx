/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SCALORA DYNAMIC TYPEWRITER WITH HIGHLIGHT SKEW
 * 1. Typing & erasing loop with dynamic keyword list
 * 2. Highlight badge with transform: skew(-2.5deg)
 * 3. Blinking cursor animation: blink 1s infinite
 */

import React, { useState, useEffect } from 'react';

interface DynamicTypewriterProps {
  words?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDelay?: number;
  className?: string;
}

const DEFAULT_WORDS = [
  'Hình Trụ.',
  'Hình Nón.',
  'Hình Cầu.',
  'Thực Nghiệm 3D.',
  'Toán Vào 10.',
];

export const DynamicTypewriter: React.FC<DynamicTypewriterProps> = ({
  words = DEFAULT_WORDS,
  typingSpeed = 85,
  deletingSpeed = 40,
  pauseDelay = 2000,
  className = '',
}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (currentText.length < currentWord.length) {
        timer = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDelay);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDelay]);

  return (
    <span className={`inline-flex items-center gap-1.5 font-bold ${className}`}>
      {/* Skewed Highlight Block (-2.5deg) */}
      <span
        style={{ transform: 'skew(-2.5deg)' }}
        className="relative inline-block px-3 py-1 rounded-md bg-[#fef08a] border border-[#fde047] text-[#713f12] shadow-xs transition-transform duration-300"
      >
        <span
          style={{ transform: 'skew(2.5deg)' }}
          className="inline-block relative z-10 font-mono tracking-tight font-bold text-xs sm:text-sm text-[#713f12]"
        >
          {currentText}
        </span>
        {/* Blinking cursor */}
        <span
          className="inline-block w-[2px] h-[1.15em] ml-1 align-middle bg-[#713f12] animate-cursor-blink"
          aria-hidden="true"
        />
      </span>
    </span>
  );
};
