/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - HÌNH HỌC 9 MASTER LEADERBOARD MODAL
 */

import React from 'react';
import { LeaderboardEntry } from './types';

interface LeaderboardModalProps {
  leaderboard: LeaderboardEntry[];
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ leaderboard, onClose }) => {
  return (
    <div className="absolute inset-0 bg-slate-950/92 backdrop-blur-xl flex justify-center items-center p-4 z-40 animate-fadeIn">
      <div className="w-full max-w-[400px] bg-slate-900 border border-white/15 rounded-3xl p-5 shadow-2xl flex flex-col max-h-[85vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <span>🏆</span>
            <span>BẢNG VÀNG CAO THỦ TOÁN 9</span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto flex-1 space-y-2 pr-1">
          {leaderboard.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs font-semibold">
              Chưa có dữ liệu bảng vàng. Hãy bay ngay để ghi tên nhé!
            </div>
          ) : (
            leaderboard.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                      index === 0
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : index === 1
                        ? 'bg-slate-300 text-slate-950'
                        : index === 2
                        ? 'bg-amber-700 text-white'
                        : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <div className="font-bold text-slate-200">{item.name}</div>
                    <div className="text-[10px] text-slate-500">{item.date}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-sky-400">{item.score}/20 điểm</div>
                  <div className="text-[10px] font-mono text-amber-400">🪙 {item.coins}</div>
                </div>
              </div>
            ))
          )}
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
