/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - FOCUS MODE TOGGLE (CHẾ ĐỘ TẬP TRUNG)
 * Hides ambient distraction elements (sidebars, floating dock, headers)
 * to maximize cognitive focus on 3D geometry manipulation and mathematical modeling.
 * Fully WCAG 2.1 AA compliant with high-contrast outlines and keyboard Esc support.
 */

import React, { useEffect } from 'react';
import { Maximize2, Minimize2, Sparkles } from 'lucide-react';

export interface FocusModeToggleProps {
  isFocusMode: boolean;
  onToggle: (nextState: boolean) => void;
  className?: string;
}

export const FocusModeToggle: React.FC<FocusModeToggleProps> = ({
  isFocusMode,
  onToggle,
  className = ''
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFocusMode) {
        onToggle(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocusMode, onToggle]);

  return (
    <button
      id="btn-focus-mode-toggle"
      type="button"
      onClick={() => onToggle(!isFocusMode)}
      aria-label={isFocusMode ? 'Thoát chế độ tập trung (Esc)' : 'Bật chế độ tập trung toàn màn hình'}
      title={isFocusMode ? 'Thoát chế độ tập trung (phím Esc)' : 'Bật chế độ tập trung (tối đa không gian học)'}
      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs focus:ring-2 focus:ring-blue-500 focus:outline-none ${
        isFocusMode
          ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-400/50 shadow-md shadow-amber-500/20'
          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
      } ${className}`}
    >
      {isFocusMode ? (
        <>
          <Minimize2 className="w-3.5 h-3.5 text-white shrink-0" />
          <span>Thoát Tập Trung (Esc)</span>
        </>
      ) : (
        <>
          <Maximize2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>Chế Độ Tập Trung</span>
        </>
      )}
    </button>
  );
};
