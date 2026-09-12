/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - HÌNH HỌC 9 MASTER SETUP & TOPIC FILTER MODAL
 */

import React from 'react';
import { AVAILABLE_CHARACTERS, GAME_BADGE_LIST } from './types';
import { GameQuestionFilter } from '../../services/geometryGameQuestionService';

interface SetupModalProps {
  playerName: string;
  setPlayerName: (name: string) => void;
  selectedChar: string;
  setSelectedChar: (char: string) => void;
  filter: GameQuestionFilter;
  setFilter: React.Dispatch<React.SetStateAction<GameQuestionFilter>>;
  availableCount: number;
  isLoadingBank: boolean;
  isEasyMode: boolean;
  setIsEasyMode: (val: boolean) => void;
  onStartGame: () => void;
  onOpenLeaderboard: () => void;
  onOpenBadges: () => void;
}

export const SetupModal: React.FC<SetupModalProps> = ({
  playerName,
  setPlayerName,
  selectedChar,
  setSelectedChar,
  filter,
  setFilter,
  availableCount,
  isLoadingBank,
  isEasyMode,
  setIsEasyMode,
  onStartGame,
  onOpenLeaderboard,
  onOpenBadges
}) => {
  return (
    <div className="absolute inset-0 bg-slate-950/92 backdrop-blur-xl flex flex-col justify-center items-center p-4 z-30 text-center overflow-y-auto">
      <div className="w-full max-w-[420px] bg-slate-900/90 border border-white/15 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col items-center my-auto">
        {/* Logo & Header */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-emerald-400 flex items-center justify-center text-3xl shadow-lg shadow-indigo-500/30 mb-3 animate-bounce">
          {selectedChar}
        </div>

        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-1">
          HÌNH HỌC 9 MASTER
        </h1>
        <p className="text-xs text-sky-300 font-semibold tracking-wide mb-4">
          Bay • Trả lời • Combo • Đấu Boss
        </p>

        {/* Player Name Input */}
        <div className="w-full mb-3 text-left">
          <label className="text-[11px] font-bold text-slate-300 block mb-1">
            Tên phi công:
          </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Nhập tên của em..."
            className="w-full px-3.5 py-2 bg-slate-800/80 border border-white/20 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-indigo-400 placeholder:text-slate-500"
          />
        </div>

        {/* Character Picker */}
        <div className="w-full mb-3 text-left">
          <label className="text-[11px] font-bold text-slate-300 block mb-1">
            Chọn nhân vật:
          </label>
          <div className="flex justify-between gap-1.5">
            {AVAILABLE_CHARACTERS.map((char) => (
              <button
                key={char}
                type="button"
                onClick={() => setSelectedChar(char)}
                className={`w-11 h-11 rounded-xl text-xl flex items-center justify-center border transition-all cursor-pointer ${
                  selectedChar === char
                    ? 'bg-indigo-600 border-indigo-300 scale-105 shadow-md shadow-indigo-500/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                {char}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Filter */}
        <div className="w-full mb-3 text-left">
          <label className="text-[11px] font-bold text-slate-300 block mb-1">
            Chủ đề hình học:
          </label>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            {[
              { id: 'all', label: 'Tất cả chủ đề' },
              { id: 'cylinder', label: 'Hình Trụ' },
              { id: 'cone', label: 'Hình Nón' },
              { id: 'sphere', label: 'Hình Cầu' }
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setFilter((prev) => ({ ...prev, topic: t.id as any }))}
                className={`py-1.5 px-2 rounded-xl font-bold border transition-all cursor-pointer text-center truncate ${
                  filter.topic === t.id
                    ? 'bg-emerald-600 border-emerald-300 text-white shadow-xs'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="w-full mb-4 text-left">
          <label className="text-[11px] font-bold text-slate-300 block mb-1">
            Mức độ thử thách:
          </label>
          <div className="grid grid-cols-3 gap-1.5 text-[11px]">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'easy', label: 'Cơ bản' },
              { id: 'medium', label: 'Thông hiểu' }
            ].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setFilter((prev) => ({ ...prev, difficulty: d.id as any }))}
                className={`py-1 px-1.5 rounded-lg font-bold border transition-all cursor-pointer text-center truncate ${
                  filter.difficulty === d.id
                    ? 'bg-indigo-600 border-indigo-300 text-white shadow-xs'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Speed / Ease Mode Selector (Phases 6, 30 & 32) */}
        <div className="w-full mb-3.5 text-left bg-slate-950/50 p-2.5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
              <span>⚡ Nhịp độ chơi:</span>
            </label>
            <span className="text-[10.5px] font-bold text-emerald-400">
              {isEasyMode ? '🐢 Chậm & Dễ chơi' : '🐇 Tiêu chuẩn'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setIsEasyMode(true)}
              className={`py-1.5 px-2 rounded-xl font-bold border transition-all cursor-pointer text-center ${
                isEasyMode
                  ? 'bg-emerald-600 border-emerald-300 text-white shadow-xs'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
              }`}
            >
              🐢 Chậm rãi (Dễ chơi)
            </button>
            <button
              type="button"
              onClick={() => setIsEasyMode(false)}
              className={`py-1.5 px-2 rounded-xl font-bold border transition-all cursor-pointer text-center ${
                !isEasyMode
                  ? 'bg-indigo-600 border-indigo-300 text-white shadow-xs'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
              }`}
            >
              🐇 Tiêu chuẩn
            </button>
          </div>
          <p className="text-[10px] text-slate-400 mt-1.5 leading-snug">
            {isEasyMode
              ? '✓ Tốc độ 68%, cột thưa hơn, chim lượn êm, ưu tiên tư duy Toán học lớp 9.'
              : 'Thử thách phản xạ bay ở tốc độ gốc.'}
          </p>
        </div>

        {/* Bank Status Counter */}
        <div className="w-full bg-slate-950/60 border border-white/10 rounded-xl p-2.5 mb-4 text-xs font-mono text-left">
          <div className="flex items-center justify-between text-slate-300">
            <span>📚 Ngân hàng khả dụng:</span>
            <span className="font-bold text-emerald-400">
              {isLoadingBank ? 'Đang tải...' : `${availableCount} câu`}
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-400 text-[11px] mt-0.5">
            <span>🎯 Mỗi lượt chơi:</span>
            <span className="text-sky-300 font-semibold">Tối đa 20 câu ngẫu nhiên</span>
          </div>
        </div>

        {/* Start Game Button */}
        <button
          type="button"
          disabled={isLoadingBank || availableCount === 0}
          onClick={onStartGame}
          className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-500/30 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>🚀</span>
          <span>BẮT ĐẦU BAY NGAY</span>
        </button>

        {/* Quick Links */}
        <div className="flex justify-center gap-3 w-full text-xs">
          <button
            type="button"
            onClick={onOpenLeaderboard}
            className="text-slate-400 hover:text-white flex items-center gap-1 font-semibold cursor-pointer"
          >
            <span>🏆 Bảng xếp hạng</span>
          </button>
          <span className="text-slate-600">•</span>
          <button
            type="button"
            onClick={onOpenBadges}
            className="text-slate-400 hover:text-white flex items-center gap-1 font-semibold cursor-pointer"
          >
            <span>🏅 Huy hiệu ({GAME_BADGE_LIST.length})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
