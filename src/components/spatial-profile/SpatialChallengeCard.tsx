/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SPATIAL CHALLENGE CARD
 * Renders Thay Hieu's special spatial inquiry challenge with XP bonus.
 */

import React from 'react';
import { TeacherChallenge } from '../../types/spatialProfile';
import { TeacherAvatar } from '../teacher-ai/TeacherAvatar';
import { Flame, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';

export interface SpatialChallengeCardProps {
  challenge: TeacherChallenge;
  onAcceptChallenge: (challenge: TeacherChallenge) => void;
  className?: string;
}

export const SpatialChallengeCard: React.FC<SpatialChallengeCardProps> = ({
  challenge,
  onAcceptChallenge,
  className = ''
}) => {
  return (
    <div
      id="spatial-challenge-card"
      className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border-2 border-orange-300 ring-1 ring-orange-100 shadow-sm relative overflow-hidden text-slate-800 ${className}`}
    >
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3 sm:gap-4">
          <TeacherAvatar state="HINT" size="md" showBadge={false} />

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="p-1 rounded-lg bg-orange-100 text-orange-600 shadow-2xs">
                <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full text-orange-700">
                THỬ THÁCH CỦA THẦY HIẾU
              </span>
              <span className="text-[10px] font-bold text-orange-600 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
                +{challenge.xpReward} XP
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              {challenge.title}
            </h3>

            <p className="text-xs text-slate-700 font-medium leading-relaxed max-w-xl">
              “{challenge.question}”
            </p>

            <p className="text-[11px] text-orange-700/90 italic pt-0.5">
              Gợi mở: {challenge.hint}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onAcceptChallenge(challenge)}
          className="self-start md:self-auto py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
        >
          <span>{challenge.actionText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
