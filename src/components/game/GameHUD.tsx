/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - HÌNH HỌC 9 MASTER GAME HUD
 */

import React from 'react';
import { GameState } from './types';

interface GameHUDProps {
  gameState: GameState;
  score: number;
  maxScore: number;
  streak: number;
  studyCoins: number;
  hasShield: boolean;
  hasHint5050: boolean;
  isSlowMo: boolean;
  cheats: number;
  isBossStage: boolean;
  soundEnabled: boolean;
  isFullscreen: boolean;
  isEasyMode?: boolean;
  onReturnToLobby: () => void;
  onTogglePause?: () => void;
  onOpenLeaderboard: () => void;
  onOpenBadges: () => void;
  onToggleSound: () => void;
  onToggleFullscreen: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  gameState,
  score,
  maxScore,
  streak,
  studyCoins,
  hasShield,
  hasHint5050,
  isSlowMo,
  cheats,
  isBossStage,
  soundEnabled,
  isFullscreen,
  isEasyMode,
  onReturnToLobby,
  onTogglePause,
  onOpenLeaderboard,
  onOpenBadges,
  onToggleSound,
  onToggleFullscreen
}) => {
  return (
    <>
      {/* Floating Top Navigation Bar */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-center z-20 pointer-events-none">
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            type="button"
            onClick={onReturnToLobby}
            className="bg-slate-900/85 backdrop-blur-md border border-white/15 text-slate-100 px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-md hover:bg-slate-800 transition-transform active:scale-95"
          >
            <span>🏠</span>
            <span>Sảnh</span>
          </button>
          {(gameState === 'PLAYING' || gameState === 'PAUSED') && onTogglePause && (
            <button
              type="button"
              onClick={onTogglePause}
              className="bg-slate-900/85 backdrop-blur-md border border-amber-400/30 text-amber-300 px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1 cursor-pointer shadow-md hover:bg-slate-800 transition-transform active:scale-95"
            >
              <span>{gameState === 'PAUSED' ? '▶ Tiếp tục' : '⏸ Tạm dừng'}</span>
            </button>
          )}
          {isEasyMode && (
            <span className="hidden sm:inline-flex items-center text-[10px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-1 rounded-full">
              🐢 Dễ chơi
            </span>
          )}
        </div>

        <div className="flex gap-1.5 pointer-events-auto">
          <button
            type="button"
            onClick={onOpenLeaderboard}
            className="bg-slate-900/85 backdrop-blur-md border border-white/15 text-slate-100 px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-md hover:bg-slate-800 transition-transform active:scale-95"
          >
            <span>🏆</span>
            <span>Top</span>
          </button>
          <button
            type="button"
            onClick={onOpenBadges}
            className="bg-slate-900/85 backdrop-blur-md border border-white/15 text-slate-100 px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-md hover:bg-slate-800 transition-transform active:scale-95"
          >
            <span>🏅</span>
            <span>Huy hiệu</span>
          </button>
          <button
            type="button"
            onClick={onToggleSound}
            aria-label="Bật tắt âm thanh"
            className="w-8 h-8 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/15 text-slate-100 flex items-center justify-center text-xs font-bold cursor-pointer shadow-md hover:bg-slate-800 transition-transform active:scale-95"
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          <button
            type="button"
            onClick={onToggleFullscreen}
            aria-label="Toàn màn hình"
            className="w-8 h-8 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/15 text-slate-100 flex items-center justify-center text-xs font-bold cursor-pointer shadow-md hover:bg-slate-800 transition-transform active:scale-95"
          >
            {isFullscreen ? '🗗' : '⛶'}
          </button>
        </div>
      </div>

      {/* In-Game Status HUD */}
      {(gameState === 'PLAYING' || isBossStage) && (
        <div className="absolute top-14 left-2.5 right-2.5 flex justify-between items-center pointer-events-none z-[15]">
          {/* Score */}
          <div className="bg-slate-900/85 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full flex items-center gap-1.5 font-bold text-xs shadow-md text-sky-400 font-mono">
            <span>✨</span>
            <span>{score}/{maxScore}</span>
          </div>

          {/* Combo Streak Multiplier Badge */}
          {streak >= 3 && (
            <div className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-2.5 py-1 rounded-full font-extrabold text-[11.5px] flex items-center gap-1 shadow-lg shadow-rose-500/40 animate-pulse">
              <span>🔥</span>
              <span>x{streak >= 5 ? '2 ' : ''}STREAK {streak}</span>
            </div>
          )}

          {/* Study Coins Display */}
          <div className="bg-slate-900/85 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full flex items-center gap-1.5 font-bold text-xs shadow-md text-amber-400 font-mono">
            <span>🪙</span>
            <span>{studyCoins}</span>
          </div>

          {/* Powerup Badges */}
          <div className="flex gap-1 items-center">
            {hasShield && (
              <div className="px-2 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1 bg-cyan-500/20 border border-cyan-400 text-cyan-300 animate-pulse">
                🛡️ Khiên
              </div>
            )}
            {hasHint5050 && (
              <div className="px-2 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1 bg-amber-500/20 border border-amber-400 text-amber-300 animate-pulse">
                💡 50:50
              </div>
            )}
            {isSlowMo && (
              <div className="px-2 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1 bg-purple-500/20 border border-purple-400 text-purple-300 animate-pulse">
                ⏳ Chậm
              </div>
            )}
            <div className="bg-slate-900/85 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-full text-amber-400 text-xs font-bold shadow-md">
              🛟 {cheats}
            </div>
          </div>
        </div>
      )}

      {/* Cảnh báo Trùm Lượng Giác */}
      {isBossStage && gameState === 'PLAYING' && (
        <div className="absolute top-26 left-1/2 -translate-x-1/2 bg-rose-600/90 border-2 border-rose-200 px-4 py-2 rounded-xl font-black text-xs sm:text-sm text-white z-[18] shadow-xl shadow-rose-600/50 animate-bounce tracking-wide whitespace-nowrap pointer-events-none select-none">
          ⚠️ ĐẠI CHIẾN QUÁI THÚ CASIO FX-580!
        </div>
      )}
    </>
  );
};
