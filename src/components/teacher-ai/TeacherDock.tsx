/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - GLOBAL AI HÌNH HỌC DOCK & BOTTOM SHEET
 * Canonical responsive floating launcher and bottom sheet for AIChatPanel:
 * - Strictly no avatar / teacher character illustration (pure edtech math aesthetic)
 * - Non-intrusive floating button [AI HÌNH HỌC] with live ready status
 * - Mobile bottom sheet with drag handle, responsive height, touch-safe controls
 * - Desktop floating dock with minimize / expand / close controls
 */

import React, { useState } from 'react';
import { Sparkles, Cpu, ChevronDown, ChevronUp, X, MessageSquare } from 'lucide-react';
import { AIChatPanel } from '../ai/AIChatPanel';
import { useLearningContext } from '../../context/LearningContext';

export interface TeacherDockProps {
  className?: string;
  allowMinimize?: boolean;
}

export const TeacherDock: React.FC<TeacherDockProps> = ({
  className = '',
  allowMinimize = true
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { context } = useLearningContext();

  const shapeLabel =
    context.currentShape === 'cylinder'
      ? 'Hình Trụ'
      : context.currentShape === 'cone'
      ? 'Hình Nón'
      : 'Hình Cầu';

  return (
    <>
      {/* ---------------------------------------------------- */}
      {/* 1. FLOATING ACTION LAUNCHER BUTTON [AI HÌNH HỌC]     */}
      {/* ---------------------------------------------------- */}
      {!isOpen && (
        <div
          id="ai-geometry-dock-launcher"
          className={`fixed bottom-20 lg:bottom-5 right-4 lg:right-5 z-40 transition-all duration-300 pointer-events-auto ${className}`}
        >
          <button
            id="open-ai-chat-btn"
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 min-h-[52px] bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] rounded-2xl shadow-lg hover:shadow-xl hover:bg-[#bbf7d0]/80 active:bg-[#047857] active:text-white transition-all duration-200 cursor-pointer group"
            aria-label="Mở AI Hình Học"
          >
            <div className="w-8 h-8 rounded-xl bg-[#16A34A] flex items-center justify-center text-white shadow-2xs">
              <Cpu className="w-4.5 h-4.5 group-hover:rotate-12 transition-transform" />
            </div>

            <div className="text-left pr-1">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xs tracking-tight">AI GIA SƯ HÌNH HỌC</span>
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              </div>
              <span className="text-[10px] text-[#15803D]/80 font-medium block truncate max-w-[130px]">
                {context.currentShape ? `Hỏi về ${shapeLabel}` : 'Đặt câu hỏi toán 9'}
              </span>
            </div>

            <span className="p-1 rounded-lg bg-[#16A34A]/10 group-hover:bg-[#16A34A]/20 text-[#15803D] group-active:text-white">
              <ChevronUp className="w-4 h-4" />
            </span>
          </button>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 2. RESPONSIVE AI PANEL (Desktop Floating / Mobile Sheet) */}
      {/* ---------------------------------------------------- */}
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-2xs z-40 md:hidden animate-fadeIn"
            onClick={() => setIsOpen(false)}
          />

          {/* Desktop Floating Box & Mobile Bottom Sheet */}
          <div
            id="ai-geometry-dock-modal"
            className="fixed z-50 transition-all duration-300
              bottom-0 left-0 right-0 max-h-[85vh] rounded-t-3xl md:rounded-2xl
              md:bottom-5 md:right-5 md:left-auto md:w-[410px] md:max-h-[620px]
              shadow-2xl overflow-hidden flex flex-col pointer-events-auto animate-slideUp"
          >
            {/* Mobile Drag Handle */}
            <div className="w-full bg-[#047857] py-1.5 flex justify-center md:hidden cursor-grab">
              <div className="w-10 h-1 rounded-full bg-white/40" />
            </div>

            {/* Embedded AIChatPanel */}
            <AIChatPanel
              className="w-full h-full border-none shadow-none rounded-none md:rounded-2xl flex-1"
              onClose={() => setIsOpen(false)}
            />
          </div>
        </>
      )}
    </>
  );
};

export default TeacherDock;
