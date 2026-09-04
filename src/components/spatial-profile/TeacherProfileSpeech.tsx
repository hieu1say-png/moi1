/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TEACHER PROFILE SPEECH
 * Avatar Thay Hieu directly talks to the student upon viewing their spatial profile.
 */

import React from 'react';
import { TeacherAvatar } from '../teacher-ai/TeacherAvatar';
import { Sparkles, Zap, Clock } from 'lucide-react';

export interface TeacherProfileSpeechProps {
  speechText: string;
  onPracticeNow: () => void;
  onLater: () => void;
  className?: string;
}

export const TeacherProfileSpeech: React.FC<TeacherProfileSpeechProps> = ({
  speechText,
  onPracticeNow,
  onLater,
  className = ''
}) => {
  return (
    <div
      id="teacher-profile-speech"
      className={`bg-white rounded-2xl sm:rounded-3xl border border-orange-200/90 p-4 sm:p-5 shadow-xs relative overflow-hidden ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3 sm:gap-4 min-w-0">
          <TeacherAvatar
            state="EXPLAINING"
            size="md"
            isSpeaking={false}
            showBadge={true}
          />

          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1">
                Thầy Hiếu AI nhắn nhủ
                <Sparkles className="w-3.5 h-3.5 text-orange-500 fill-orange-400" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">
                Gợi ý riêng cho em
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed italic bg-orange-50/50 p-2.5 sm:p-3 rounded-xl border border-orange-100">
              “{speechText}”
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            type="button"
            onClick={onPracticeNow}
            className="py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Luyện ngay</span>
          </button>

          <button
            type="button"
            onClick={onLater}
            className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Để sau</span>
          </button>
        </div>
      </div>
    </div>
  );
};
