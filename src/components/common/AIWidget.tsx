/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - FLOATING AI WIDGET (AI HÌNH HỌC)
 * Compact floating drawer wrapping AIChatPanel with real-time Learning Context.
 */

import React, { useState } from 'react';
import { Cpu, Sparkles, X, ExternalLink } from 'lucide-react';
import { AIChatPanel } from '../ai/AIChatPanel';
import { useLearningContext } from '../../context/LearningContext';

interface AIWidgetProps {
  onOpenFullView?: () => void;
}

export const AIWidget: React.FC<AIWidgetProps> = ({ onOpenFullView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { context } = useLearningContext();

  return (
    <div id="ai-geometry-widget" className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40">
      {!isOpen ? (
        <button
          id="ai-widget-trigger"
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#634796] hover:bg-[#523880] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer group hover:scale-105 active:scale-95 border border-[#856DB0] font-bold text-xs sm:text-sm"
          aria-label="Mở Trợ lý AI Hình Học 9"
        >
          <div className="relative">
            <Cpu className="w-5 h-5 group-hover:rotate-12 transition-transform text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#789972] rounded-full border-2 border-white animate-pulse" />
          </div>
          <span className="tracking-tight pr-1">AI Hình Học</span>
          <Sparkles className="w-4 h-4 text-[#D7A85D] animate-pulse" />
        </button>
      ) : (
        <div
          id="ai-widget-panel"
          className="w-[92vw] sm:w-[420px] max-h-[85vh] bg-[#FFFDF8] rounded-[24px] shadow-2xl border border-[#E5DCCF] overflow-hidden flex flex-col transition-all duration-200"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#F4EEE4] border-b border-[#E5DCCF] select-none">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#634796] text-white flex items-center justify-center">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <span className="font-serif font-black text-xs text-[#3A302B]">
                AI HÌNH HỌC • CỬA SỔ NHANH
              </span>
            </div>

            <div className="flex items-center gap-1">
              {onOpenFullView && (
                <button
                  id="ai-widget-open-full"
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenFullView();
                  }}
                  className="p-1.5 text-[#766A61] hover:text-[#3A302B] rounded-lg hover:bg-[#EAE0D3] transition-colors cursor-pointer"
                  title="Mở toàn màn hình phòng AI"
                  aria-label="Mở toàn màn hình"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                id="ai-widget-close"
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#766A61] hover:text-[#3A302B] rounded-lg hover:bg-[#EAE0D3] transition-colors cursor-pointer"
                title="Đóng widget"
                aria-label="Đóng"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Embedded AIChatPanel */}
          <AIChatPanel
            className="border-none rounded-none shadow-none flex-1 max-h-[calc(85vh-45px)]"
            isCompact={true}
          />
        </div>
      )}
    </div>
  );
};
