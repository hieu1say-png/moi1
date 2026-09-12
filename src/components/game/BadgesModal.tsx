/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - HÌNH HỌC 9 MASTER BADGES MODAL
 */

import React from 'react';
import { GAME_BADGE_LIST } from './types';

interface BadgesModalProps {
  userBadges: string[];
  onClose: () => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({ userBadges, onClose }) => {
  return (
    <div className="absolute inset-0 bg-slate-950/92 backdrop-blur-xl flex justify-center items-center p-4 z-40 animate-fadeIn">
      <div className="w-full max-w-[420px] bg-slate-900 border border-white/15 rounded-3xl p-5 shadow-2xl flex flex-col max-h-[85vh]">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <span>🏅</span>
              <span>HUY HIỆU DANH GIÁ</span>
            </h2>
            <p className="text-[11px] text-slate-400">
              Đã mở khóa: {userBadges.length}/{GAME_BADGE_LIST.length}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto flex-1 space-y-2 pr-1">
          {GAME_BADGE_LIST.map((b) => {
            const isUnlocked = userBadges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                  isUnlocked
                    ? b.legendary
                      ? 'bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-transparent border-amber-500/40'
                      : 'bg-white/5 border-emerald-500/30'
                    : 'bg-white/2 border-white/5 opacity-40 grayscale'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                    isUnlocked ? 'bg-white/10' : 'bg-white/5'
                  }`}
                >
                  {b.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white truncate">{b.name}</span>
                    {b.legendary && (
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40">
                        HUYỀN THOẠI
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{b.desc}</p>
                </div>
                <div>
                  {isUnlocked ? (
                    <span className="text-emerald-400 text-xs font-bold">✓</span>
                  ) : (
                    <span className="text-slate-600 text-xs font-bold">🔒</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};
