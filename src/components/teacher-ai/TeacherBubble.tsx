/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TEACHER THẦY HIẾU AI - SPEECH BUBBLE & INTERACTIVE DOCK
 * Non-intrusive lightweight teacher bubble with progressive 5-level hint disclosure.
 */

import React, { useState } from 'react';
import { TeacherAvatar } from './TeacherAvatar';
import { TeacherAvatarState, VisualHighlightTarget } from './types';
import { MathFormula } from '../common/MathFormula';
import {
  Sparkles,
  Lightbulb,
  HelpCircle,
  FileCheck2,
  UserCheck,
  RotateCcw
} from 'lucide-react';

export interface TeacherBubbleProps {
  avatarState?: TeacherAvatarState;
  teacherTarget?: VisualHighlightTarget;
  title?: string;
  subtitle?: string;
  message: string;
  latex?: string;
  feedbackLevel?: 1 | 2 | 3 | 4 | 5;
  onRequestNextHint?: () => void;
  onShowSolution?: () => void;
  onResetHints?: () => void;
  onOpenProfile?: () => void;
  onAskTeacher?: () => void;
  isCompact?: boolean;
  className?: string;
}

export const TeacherBubble: React.FC<TeacherBubbleProps> = ({
  avatarState = 'IDLE',
  teacherTarget = null,
  title = 'THẦY HIẾU AI',
  subtitle = 'Trợ giảng Hình học không gian',
  message,
  latex,
  feedbackLevel = 1,
  onRequestNextHint,
  onShowSolution,
  onResetHints,
  onOpenProfile,
  onAskTeacher,
  isCompact = false,
  className = ''
}) => {
  const [isExpanded] = useState<boolean>(true);

  const getTargetLabel = (target: VisualHighlightTarget) => {
    switch (target) {
      case 'radius':
        return 'Thầy đang chỉ vào Bán kính đáy R (đoạn OA)';
      case 'diameter':
        return 'Thầy đang chỉ vào Đường kính đáy 2R (đoạn AB)';
      case 'height':
        return 'Thầy đang chỉ vào Chiều cao h (trục OO\' / SO)';
      case 'generatrix':
        return 'Thầy đang chỉ vào Đường sinh l (đoạn SA)';
      case 'center':
        return 'Thầy đang chỉ vào Tâm đáy O';
      case 'axis':
        return 'Thầy đang chỉ vào Trục quay đối xứng';
      case 'section':
        return 'Thầy đang chỉ vào Mặt cắt / Thiết diện';
      case 'base':
        return 'Thầy đang chỉ vào Mặt phẳng đáy tròn';
      case 'volume':
        return 'Thầy đang chỉ vào Khối thể tích không gian';
      default:
        return null;
    }
  };

  const targetLabel = getTargetLabel(teacherTarget);

  return (
    <div
      id="teacher-ai-bubble"
      className={`relative z-20 transition-all duration-300 ${className}`}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-orange-200/80 shadow-md p-3 sm:p-4 text-slate-800">
        {/* Header Bar: Avatar + Identity + Actions */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <TeacherAvatar
              state={avatarState}
              size={isCompact ? 'sm' : 'md'}
              isSpeaking={false}
              showBadge={true}
            />

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1">
                  {title}
                  <Sparkles className="w-3.5 h-3.5 text-orange-500 fill-orange-400" />
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100/80 text-orange-800 border border-orange-200">
                  {subtitle}
                </span>
              </div>

              {/* Target Highlight Indicator if active */}
              {targetLabel ? (
                <p className="text-[11px] font-semibold text-sky-700 mt-0.5 flex items-center gap-1 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  {targetLabel}
                </p>
              ) : (
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {avatarState === 'POINTING'
                    ? 'Quan sát kỹ chi tiết Thầy đang chỉ trên hình 3D nhé!'
                    : avatarState === 'HINT'
                    ? 'Gợi mở tư duy từng bước'
                    : avatarState === 'ERROR'
                    ? 'Không sao cả, cùng nhìn lại nào!'
                    : avatarState === 'SUCCESS' || avatarState === 'CELEBRATING'
                    ? 'Làm rất tốt! Tiến bộ rõ rệt!'
                    : 'Đồng hành khám phá cùng em'}
                </p>
              )}
            </div>
          </div>

          {/* Quick Profile Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {onOpenProfile && (
              <button
                type="button"
                onClick={onOpenProfile}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                title="Xem Hồ sơ tư duy không gian của em"
              >
                <UserCheck className="w-3.5 h-3.5 text-orange-600" />
                <span className="hidden sm:inline">Hồ sơ của em</span>
              </button>
            )}
          </div>
        </div>

        {/* Message Bubble Content */}
        {isExpanded && (
          <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
            <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-orange-50/60 via-amber-50/40 to-white border border-orange-100 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              “{message}”
            </div>

            {/* LaTeX Equation if applicable */}
            {latex && (
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-xs sm:text-sm">
                <MathFormula formula={latex} />
              </div>
            )}

            {/* Progressive 5-Level Hint Chips (Light & Minimal) */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((lvl) => {
                  const isCurrent = feedbackLevel === lvl;
                  const isUnlocked = feedbackLevel >= lvl;
                  return (
                    <span
                      key={lvl}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-all ${
                        isCurrent
                          ? 'bg-orange-500 text-white shadow-2xs'
                          : isUnlocked
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {lvl === 5 ? 'Lời giải' : `Gợi ý ${lvl}`}
                    </span>
                  );
                })}
              </div>

              {/* Action Buttons: Next Hint, Solution, Ask */}
              <div className="flex items-center gap-1.5">
                {feedbackLevel < 4 && onRequestNextHint && (
                  <button
                    type="button"
                    onClick={onRequestNextHint}
                    className="px-2.5 py-1 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1 shadow-2xs transition-all cursor-pointer active:scale-95"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Thêm gợi ý</span>
                  </button>
                )}

                {feedbackLevel >= 4 && feedbackLevel < 5 && onShowSolution && (
                  <button
                    type="button"
                    onClick={onShowSolution}
                    className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-2xs transition-all cursor-pointer active:scale-95"
                  >
                    <FileCheck2 className="w-3.5 h-3.5" />
                    <span>Xem lời giải</span>
                  </button>
                )}

                {feedbackLevel === 5 && onResetHints && (
                  <button
                    type="button"
                    onClick={onResetHints}
                    className="px-2 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                    title="Khám phá lại từ đầu"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Thử lại</span>
                  </button>
                )}

                {onAskTeacher && (
                  <button
                    type="button"
                    onClick={onAskTeacher}
                    className="px-2.5 py-1 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Hỏi Thầy</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
