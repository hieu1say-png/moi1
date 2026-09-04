/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - 3D EXPLORE AI ASSISTANT (AI HÌNH HỌC)
 * - Khi đóng: chỉ hiện nút [AI HÌNH HỌC].
 * - Khi mở: panel floating (Desktop: 3D ~70% / AI ~30%, Mobile: Bottom Sheet).
 * - Header: AI HÌNH HỌC
 * - Typing: không làm ảnh hưởng hay rerender Canvas 3D.
 */

import React, { useState } from 'react';
import { ShapeType } from '../../types';
import { Sparkles, MessageSquare, X, Cpu } from 'lucide-react';
import { AIChatPanel } from '../ai/AIChatPanel';

export interface AIExploreWidgetProps {
  shape: ShapeType;
  activeComponentId?: string;
  className?: string;
}

export const AIExploreWidget: React.FC<AIExploreWidgetProps> = ({
  shape,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="ai-geometry-widget-root" className={className}>
      {/* 1. CLOSED STATE: Chỉ hiện nút [AI HÌNH HỌC] */}
      {!isOpen && (
        <button
          id="btn-open-geometry-ai"
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-orange-50 border-2 border-orange-400 text-orange-600 hover:text-orange-700 font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(249,115,22,0.12)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.2)] cursor-pointer group active:scale-98"
          aria-label="Mở AI Hình Học"
        >
          <div className="w-6 h-6 rounded-lg bg-orange-500 text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span>AI HÌNH HỌC</span>
        </button>
      )}

      {/* 2. OPEN STATE - DESKTOP FLOATING / MOBILE BOTTOM SHEET */}
      {isOpen && (
        <>
          {/* Mobile Backdrop for Bottom Sheet */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden animate-fadeIn"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Floating Panel Container (Desktop: In-place floating card, Mobile: Slide-up Bottom Sheet) */}
          <div
            id="ai-floating-panel"
            className="fixed inset-x-0 bottom-0 z-50 lg:static lg:z-auto max-h-[85vh] lg:max-h-none flex flex-col bg-white rounded-t-3xl lg:rounded-3xl border border-slate-200/90 shadow-2xl lg:shadow-md overflow-hidden animate-in slide-in-from-bottom-6 lg:animate-fadeIn duration-200"
          >
            {/* Mobile Drag Handle */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2 lg:hidden" />

            {/* Embedded AI Chat Panel */}
            <div className="w-full">
              <AIChatPanel
                className="w-full border-0 rounded-none lg:rounded-3xl shadow-none"
                onClose={() => setIsOpen(false)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIExploreWidget;
