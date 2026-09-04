/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * USE SPEECH HOOK (PHÁT LOA TIẾNG VIỆT CHẬM RÃI SƯ PHẠM)
 * Delivers warm, slow-paced Vietnamese speech synthesis for Thầy Hiếu AI:
 * - Language: vi-VN
 * - Rate: 0.80 (chậm rãi, rõ ràng cho học sinh THCS)
 * - Pitch: 0.85 (âm sắc ấm áp, thân thiện sư phạm)
 * - Math formula transliteration: \pi -> pi, r^2 -> r bình phương, etc.
 * - Natural pauses between explanation steps
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseSpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
}

/**
 * Transliterates LaTeX and markdown mathematical formulas into natural spoken Vietnamese
 */
export function sanitizeMathTextForSpeech(input: string): string {
  if (!input) return '';

  let text = input;

  // 1. Remove Markdown headers, bold, italics, code blocks
  text = text.replace(/```[\s\S]*?```/g, '');
  text = text.replace(/`([^`]+)`/g, '$1');
  text = text.replace(/[*_~]/g, '');
  text = text.replace(/^#+\s+/gm, '');

  // 2. Common LaTeX math symbols & fractions
  text = text.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 phần $2');
  text = text.replace(/\\sqrt\{([^}]+)\}/g, 'căn bậc hai của $1');
  text = text.replace(/\\pi/g, 'pi');
  text = text.replace(/\\approx/g, 'xấp xỉ bằng');
  text = text.replace(/\\cdot/g, ' nhân ');
  text = text.replace(/\\times/g, ' nhân ');
  text = text.replace(/\\quad/g, ', ');
  text = text.replace(/\\text\{([^}]+)\}/g, '$1');

  // 3. Exponents & geometric indicators
  text = text.replace(/r\^2|R\^2/g, 'bán kính bình phương');
  text = text.replace(/r\^3|R\^3/g, 'bán kính lập phương');
  text = text.replace(/\^2/g, ' bình phương');
  text = text.replace(/\^3/g, ' lập phương');

  // 4. Units & abbreviations
  text = text.replace(/cm\^2|cm²/g, ' xăng-ti-mét vuông');
  text = text.replace(/cm\^3|cm³/g, ' xăng-ti-mét khối');
  text = text.replace(/dm\^3|dm³/g, ' đề-xi-mét khối');
  text = text.replace(/m\^2|m²/g, ' mét vuông');
  text = text.replace(/m\^3|m³/g, ' mét khối');
  text = text.replace(/S_\{xq\}|S_xq/g, 'Diện tích xung quanh');
  text = text.replace(/S_\{tp\}|S_tp/g, 'Diện tích toàn phần');
  text = text.replace(/V_\{cầu\}|V_cau/g, 'Thể tích hình cầu');
  text = text.replace(/V_\{trụ\}|V_tru/g, 'Thể tích hình trụ');
  text = text.replace(/V_\{nón\}|V_non/g, 'Thể tích hình nón');

  // 5. Remove remaining $ delimiters
  text = text.replace(/\$+/g, '');

  // 6. Natural pacing: Add pauses between numbered steps
  text = text.replace(/(\d+[\.\)])\s+/g, '$1... ');
  text = text.replace(/Bước\s+(\d+):/gi, 'Bước $1... ');

  // Clean excessive spaces
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

export function useSpeech(options: UseSpeechOptions = {}) {
  const { rate = 0.80, pitch = 0.85, volume = 1.0 } = options;

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [supported, setSupported] = useState<boolean>(false);
  const [activeText, setActiveText] = useState<string | null>(null);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const vietnameseVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Initialize synthesis and find Vietnamese voice
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      setSupported(true);

      const updateVoices = () => {
        if (!synthRef.current) return;
        const voices = synthRef.current.getVoices();
        // Look for Vietnamese voice
        const viVoice =
          voices.find((v) => v.lang.startsWith('vi') || v.lang.includes('VN')) ||
          voices.find((v) => v.lang.toLowerCase().includes('viet')) ||
          null;
        vietnameseVoiceRef.current = viVoice;
      };

      updateVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = updateVoices;
      }
    }

    return () => {
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const stop = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setActiveText(null);
    }
  }, []);

  const pause = useCallback(() => {
    if (synthRef.current && isSpeaking && !isPaused) {
      synthRef.current.pause();
      setIsPaused(true);
    }
  }, [isSpeaking, isPaused]);

  const resume = useCallback(() => {
    if (synthRef.current && isSpeaking && isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
    }
  }, [isSpeaking, isPaused]);

  const speak = useCallback(
    (textToSpeak: string) => {
      if (!synthRef.current || !supported || !textToSpeak.trim()) return;

      // Stop any current utterance
      synthRef.current.cancel();

      const naturalText = sanitizeMathTextForSpeech(textToSpeak);
      const utterance = new SpeechSynthesisUtterance(naturalText);

      utterance.rate = rate; // 0.80: chậm rãi
      utterance.pitch = pitch; // 0.85: ấm áp
      utterance.volume = volume;

      if (vietnameseVoiceRef.current) {
        utterance.voice = vietnameseVoiceRef.current;
        utterance.lang = vietnameseVoiceRef.current.lang;
      } else {
        utterance.lang = 'vi-VN';
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
        setActiveText(textToSpeak);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setActiveText(null);
      };

      utterance.onerror = (e) => {
        // Interrupted errors happen normally on cancel
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          console.warn('Speech synthesis utterance error:', e.error);
        }
        setIsSpeaking(false);
        setIsPaused(false);
        setActiveText(null);
      };

      utteranceRef.current = utterance;
      synthRef.current.speak(utterance);
    },
    [supported, rate, pitch, volume]
  );

  return {
    speak,
    stop,
    pause,
    resume,
    isSpeaking,
    isPaused,
    supported,
    activeText
  };
}
