/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - HÌNH HỌC 9 MASTER GAME VIEW
 * Full-featured interactive gamified module:
 * - Flappy Geometry Bird + Boss Battle Casio FX-580
 * - 100% Single Source of Truth from Geometry Lab Question Bank
 * - 20 Questions to Win, Combo Streak, Power-ups, Audio Synthesizer, Badges & Leaderboard
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { GameState, LeaderboardEntry, ToastMessage, GAME_BADGE_LIST } from '../components/game/types';
import { GameSound } from '../components/game/soundEffects';
import { GameCanvas } from '../components/game/GameCanvas';
import { GameHUD } from '../components/game/GameHUD';
import { QuestionModal } from '../components/game/QuestionModal';
import { SetupModal } from '../components/game/SetupModal';
import { LeaderboardModal } from '../components/game/LeaderboardModal';
import { BadgesModal } from '../components/game/BadgesModal';
import {
  GameQuestionService,
  GameQuestion,
  GameQuestionFilter
} from '../services/geometryGameQuestionService';
import { useApp } from '../context/AppContext';

export const GeometryMasterGameView: React.FC = () => {
  const { navigateTo } = useApp();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Core Game State
  const [gameState, setGameState] = useState<GameState>('SETUP');
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [studyCoins, setStudyCoins] = useState<number>(() => {
    return parseInt(localStorage.getItem('study_coins_v3') || '0', 10);
  });
  const [playerName, setPlayerName] = useState<string>(() => {
    return localStorage.getItem('study_player_name_v3') || 'Học Sinh Toán 9';
  });
  const [selectedChar, setSelectedChar] = useState<string>('🚀');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isEasyMode, setIsEasyMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('study_game_easymode_v1');
    return saved !== null ? saved === 'true' : true;
  });

  const handleSetEasyMode = (val: boolean) => {
    setIsEasyMode(val);
    localStorage.setItem('study_game_easymode_v1', String(val));
  };

  // Power-ups
  const [hasShield, setHasShield] = useState<boolean>(false);
  const [hasHint5050, setHasHint5050] = useState<boolean>(false);
  const [isSlowMo, setIsSlowMo] = useState<boolean>(false);
  const [cheats, setCheats] = useState<number>(1);

  // Boss Battle State
  const [isBossStage, setIsBossStage] = useState<boolean>(false);
  const [bossHP, setBossHP] = useState<number>(100);
  const [bossHitsNeeded, setBossHitsNeeded] = useState<number>(3);
  const [bossHitPending, setBossHitPending] = useState<boolean>(false);

  // Question Engine
  const [filter, setFilter] = useState<GameQuestionFilter>({ topic: 'all', difficulty: 'all' });
  const [availableCount, setAvailableCount] = useState<number>(0);
  const [isLoadingBank, setIsLoadingBank] = useState<boolean>(true);
  const [currentQuestion, setCurrentQuestion] = useState<GameQuestion | null>(null);
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);

  // Modals & Popups
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [showBadges, setShowBadges] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userBadges, setUserBadges] = useState<string[]>([]);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Load Saved Storage Data on Mount
  useEffect(() => {
    try {
      const savedLb = localStorage.getItem('study_leaderboard_v3');
      if (savedLb) setLeaderboard(JSON.parse(savedLb));

      const savedBadges = localStorage.getItem('study_badges_v3');
      if (savedBadges) setUserBadges(JSON.parse(savedBadges));
    } catch (e) {
      console.warn('Error reading saved game storage', e);
    }
  }, []);

  // Sync Question Bank Availability Count
  useEffect(() => {
    let isSubscribed = true;
    setIsLoadingBank(true);
    GameQuestionService.loadAllBankQuestions().then((allQuestions) => {
      if (!isSubscribed) return;
      let count = allQuestions.length;
      if (filter.topic && filter.topic !== 'all') {
        count = allQuestions.filter((q) => q.topic === filter.topic).length;
      }
      if (filter.difficulty && filter.difficulty !== 'all') {
        count = allQuestions.filter((q) => q.difficulty === filter.difficulty).length;
      }
      setAvailableCount(count);
      setIsLoadingBank(false);
    });
    return () => {
      isSubscribed = false;
    };
  }, [filter]);

  // Unlock Badge Helper
  const unlockBadge = useCallback((badgeId: string) => {
    setUserBadges((prev) => {
      if (prev.includes(badgeId)) return prev;
      const updated = [...prev, badgeId];
      localStorage.setItem('study_badges_v3', JSON.stringify(updated));
      const badge = GAME_BADGE_LIST.find((b) => b.id === badgeId);
      if (badge) {
        showToast(`🏅 Mở khóa huy hiệu: ${badge.name}!`, 'success');
      }
      return updated;
    });
  }, []);

  // Show Toast Helper
  const showToast = (text: string, type: 'success' | 'error' | 'power' | 'boss' = 'success') => {
    setToast({ text, type });
    setTimeout(() => {
      setToast((curr) => (curr?.text === text ? null : curr));
    }, 2800);
  };

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Sound Handler
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    GameSound.setEnabled(next);
  };

  // Pause / Resume Handler (Phase 16)
  const handleTogglePause = useCallback(() => {
    setGameState((curr) => {
      if (curr === 'PLAYING') {
        GameSound.play('flap');
        return 'PAUSED';
      }
      if (curr === 'PAUSED') {
        return 'PLAYING';
      }
      return curr;
    });
  }, []);

  // Keyboard shortcut for Pause (ESC / P)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || (e.key.toUpperCase() === 'P' && gameState !== 'QUESTION')) {
        if (gameState === 'PLAYING' || gameState === 'PAUSED') {
          e.preventDefault();
          handleTogglePause();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, handleTogglePause]);

  // Start a New Game Session with double-click debounce
  const isStartingRef = useRef(false);
  const handleStartGame = async () => {
    if (isStartingRef.current) return;
    isStartingRef.current = true;

    try {
      localStorage.setItem('study_player_name_v3', playerName);
      setIsLoadingBank(true);

      const session = await GameQuestionService.prepareGameSession(filter, 20);
      setIsLoadingBank(false);

      if (session.poolSize === 0) {
        showToast('Không có câu hỏi phù hợp với bộ lọc.', 'error');
        return;
      }

      setScore(0);
      setStreak(0);
      setHasShield(false);
      setHasHint5050(false);
      setIsSlowMo(false);
      setCheats(1);
      setIsBossStage(false);
      setBossHP(100);
      setBossHitsNeeded(3);

      setGameState('START');
      showToast(session.statusMessage, 'success');
    } finally {
      setTimeout(() => {
        isStartingRef.current = false;
      }, 400);
    }
  };

  // Trigger Question Modal when Bird Passes a Pipe
  const handleQuestionTrigger = () => {
    // Check if boss battle should be triggered (streak >= 5 and not currently in boss stage)
    if (streak >= 5 && !isBossStage) {
      setIsBossStage(true);
      setBossHP(100);
      setBossHitsNeeded(3);
      GameSound.play('boss_alert');
      showToast('⚠️ QUÁI THÚ CASIO FX-580 ĐÃ XUẤT HIỆN!', 'boss');
    }

    const nextQ = GameQuestionService.getNextGameQuestion();
    if (!nextQ) {
      // If questions are exhausted, trigger victory or loop safely
      handleVictory();
      return;
    }

    setCurrentQuestion(nextQ);
    setEliminatedOptions([]);

    // Auto-consume 50:50 if player has it active
    if (hasHint5050) {
      setHasHint5050(false);
      apply5050(nextQ);
    }

    setTimeLeft(60);
    setQuestionStartTime(Date.now());
    setGameState('QUESTION');
  };

  // Apply 50:50 Lifeline
  const apply5050 = (q: GameQuestion) => {
    unlockBadge('smart_bulb');
    const wrongIndices = [0, 1, 2, 3].filter((i) => i !== q.ans);
    // Randomly pick 2 wrong options to eliminate
    for (let i = wrongIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wrongIndices[i], wrongIndices[j]] = [wrongIndices[j], wrongIndices[i]];
    }
    const toEliminate = wrongIndices.slice(0, 2);
    setEliminatedOptions(toEliminate);
    showToast('💡 Đã loại bỏ 2 phương án sai!', 'power');
  };

  // Stable ref for handleAnswer to guarantee timer never executes a stale closure
  const handleAnswerRef = useRef<(index: number) => void>(() => {});

  // Question Timer Effect (strictly 1s interval, proper cleanup)
  useEffect(() => {
    if (gameState !== 'QUESTION') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAnswerRef.current(-1); // Timeout is treated as wrong answer
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Answer Evaluation
  const handleAnswer = (index: number) => {
    if (!currentQuestion) return;

    const elapsedSeconds = (Date.now() - questionStartTime) / 1000;
    const isCorrect = index === currentQuestion.ans;

    if (isCorrect) {
      GameSound.play('correct');
      const nextScore = score + 1;
      const nextStreak = streak + 1;
      setScore(nextScore);
      setStreak(nextStreak);

      // Coins reward with combo multiplier
      const earnedCoins = 10 * (nextStreak >= 5 ? 2 : 1);
      const newTotalCoins = studyCoins + earnedCoins;
      setStudyCoins(newTotalCoins);
      localStorage.setItem('study_coins_v3', newTotalCoins.toString());

      // Badge Checks
      if (nextScore === 1) unlockBadge('first_step');
      if (elapsedSeconds < 5) unlockBadge('speed_god');
      if (nextStreak >= 5) unlockBadge('streak_5');

      // Boss Battle Logic
      if (isBossStage) {
        setBossHitPending(true);
        const nextHits = bossHitsNeeded - 1;
        setBossHitsNeeded(nextHits);
        const nextHP = Math.max(0, bossHP - 34);
        setBossHP(nextHP);

        if (nextHits <= 0) {
          // Boss Defeated!
          setIsBossStage(false);
          const bonusCoins = newTotalCoins + 300;
          setStudyCoins(bonusCoins);
          localStorage.setItem('study_coins_v3', bonusCoins.toString());
          setScore((s) => s + 2);
          unlockBadge('boss_slayer');
          showToast('🎉 ĐẠI THẮNG QUÁI THÚ CASIO! +300 COINS & +2 ĐIỂM!', 'success');

          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }

      // Check Victory Condition (20 points)
      if (nextScore >= 20) {
        handleVictory();
        return;
      }

      showToast(`✨ Chính xác! +${earnedCoins} coins`, 'success');
      setGameState('PLAYING');
    } else {
      // Wrong answer
      GameSound.play('wrong');
      setStreak(0);
      handleGameOver();
    }
  };
  handleAnswerRef.current = handleAnswer;

  // Cheat Lifeline (Phao cứu sinh)
  const handleUseCheat = () => {
    if (cheats <= 0 || !currentQuestion) return;
    setCheats((c) => c - 1);
    showToast('🛟 Đã dùng phao cứu sinh!', 'power');
    handleAnswer(currentQuestion.ans);
  };

  // Power-up Collection
  const handlePowerUpCollect = (type: 'shield' | '5050' | 'slow' | 'lifeline') => {
    GameSound.play('powerup');

    if (type === 'shield') {
      setHasShield(true);
      showToast('🛡️ Nhặt được Khiên Bảo Vệ!', 'power');
    } else if (type === '5050') {
      setHasHint5050(true);
      showToast('💡 Nhặt được Bổ Trợ 50:50!', 'power');
    } else if (type === 'slow') {
      setIsSlowMo(true);
      showToast('⏳ Làm Chậm Thời Gian 5 Giây!', 'power');
      setTimeout(() => setIsSlowMo(false), 5000);
    } else if (type === 'lifeline') {
      setCheats((c) => c + 1);
      showToast('🛟 Nhặt được +1 Phao Cứu Sinh!', 'power');
    }
  };

  // Shield Break Handler
  const handleShieldBreak = () => {
    setHasShield(false);
    GameSound.play('shield_break');
    unlockBadge('shield_hero');
    showToast('🛡️ Khiên đã vỡ để cứu mạng bạn!', 'power');
  };

  // Save to Leaderboard
  const saveLeaderboardEntry = (finalScore: number) => {
    const entry: LeaderboardEntry = {
      name: playerName || 'Học sinh Toán 9',
      score: finalScore,
      coins: studyCoins,
      date: new Date().toLocaleDateString('vi-VN')
    };

    setLeaderboard((prev) => {
      const updated = [...prev, entry]
        .sort((a, b) => b.score - a.score || b.coins - a.coins)
        .slice(0, 10);
      localStorage.setItem('study_leaderboard_v3', JSON.stringify(updated));
      return updated;
    });
  };

  // Game Over
  const handleGameOver = () => {
    setGameState('GAMEOVER');
    saveLeaderboardEntry(score);
  };

  // Victory
  const handleVictory = () => {
    setGameState('WIN');
    unlockBadge('master_a');
    saveLeaderboardEntry(score >= 20 ? 20 : score);

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 }
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[calc(100vh-4rem)] max-w-4xl mx-auto rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col select-none"
    >
      {/* HUD Bar */}
      <GameHUD
        gameState={gameState}
        score={score}
        maxScore={20}
        streak={streak}
        studyCoins={studyCoins}
        hasShield={hasShield}
        hasHint5050={hasHint5050}
        isSlowMo={isSlowMo}
        cheats={cheats}
        isBossStage={isBossStage}
        soundEnabled={soundEnabled}
        isFullscreen={isFullscreen}
        isEasyMode={isEasyMode}
        onReturnToLobby={() => setGameState('SETUP')}
        onTogglePause={handleTogglePause}
        onOpenLeaderboard={() => setShowLeaderboard(true)}
        onOpenBadges={() => setShowBadges(true)}
        onToggleSound={toggleSound}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* 2D Canvas Engine */}
      <div className="relative flex-1 w-full min-h-0 overflow-hidden">
        <GameCanvas
          gameState={gameState}
          selectedChar={selectedChar}
          streak={streak}
          hasShield={hasShield}
          isSlowMo={isSlowMo}
          isEasyMode={isEasyMode}
          isBossStage={isBossStage}
          bossHP={bossHP}
          onQuestionTrigger={handleQuestionTrigger}
          onPowerUpCollect={handlePowerUpCollect}
          onShieldBreak={handleShieldBreak}
          onGameOver={handleGameOver}
          onBossHitResolved={() => setBossHitPending(false)}
          bossHitPending={bossHitPending}
          onStartPlaying={() => setGameState('PLAYING')}
        />
      </div>

      {/* In-Game Paused Overlay (Phase 16) */}
      {gameState === 'PAUSED' && (
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col justify-center items-center z-[25] text-center p-4 animate-fadeIn select-none">
          <div className="w-full max-w-[340px] bg-slate-900/95 border border-amber-400/30 rounded-3xl p-6 shadow-2xl flex flex-col items-center">
            <div className="text-4xl mb-2">⏸️</div>
            <h2 className="text-lg font-black text-amber-300 mb-1">TRÒ CHƠI TẠM DỪNG</h2>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Em có thể thả lỏng tay, xem lại công thức hoặc nghỉ ngơi một chút trước khi tiếp tục bay nhé!
            </p>
            <div className="flex flex-col gap-2.5 w-full">
              <button
                type="button"
                onClick={handleTogglePause}
                className="w-full min-h-[48px] py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>▶</span>
                <span>TIẾP TỤC BAY</span>
              </button>
              <button
                type="button"
                onClick={() => setGameState('SETUP')}
                className="w-full min-h-[44px] py-2.5 bg-white/10 hover:bg-white/15 text-slate-200 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>🏠</span>
                <span>VỀ SẢNH CHỌN CHỦ ĐỀ</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* In-Game Start Overlay (Tap to Jump) */}
      {gameState === 'START' && (
        <div
          className="absolute inset-0 bg-slate-950/65 backdrop-blur-xs flex flex-col justify-center items-center z-[20] pointer-events-none text-center p-4 animate-fadeIn select-none"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-3xl mb-3 animate-pulse">
            👆
          </div>
          <h2 className="text-xl font-extrabold text-white mb-1">CHẠM ĐỂ BAY!</h2>
          <p className="text-xs text-slate-300 max-w-xs mb-3">
            Vượt qua các cột ống để mở khóa câu hỏi từ ngân hàng Geometry Lab. Đạt 20 câu để đại thắng!
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 text-[11px] font-bold text-emerald-300 shadow-lg">
            <span>🖱️ Chuột</span>
            <span className="text-slate-500">•</span>
            <span>👆 Chạm</span>
            <span className="text-slate-500">•</span>
            <span>⌨️ Space / Phím ↑</span>
          </div>
        </div>
      )}

      {/* Question Modal */}
      {gameState === 'QUESTION' && currentQuestion && (
        <QuestionModal
          currentQuestion={currentQuestion}
          score={score}
          maxScore={20}
          timeLeft={timeLeft}
          cheats={cheats}
          eliminatedOptions={eliminatedOptions}
          isBossStage={isBossStage}
          bossHP={bossHP}
          bossHitsNeeded={bossHitsNeeded}
          feedbackDuration={isEasyMode ? 900 : 700}
          onAnswer={handleAnswer}
          onUseCheat={handleUseCheat}
        />
      )}

      {/* Pre-Game Setup & Filter Modal */}
      {gameState === 'SETUP' && (
        <SetupModal
          playerName={playerName}
          setPlayerName={setPlayerName}
          selectedChar={selectedChar}
          setSelectedChar={setSelectedChar}
          filter={filter}
          setFilter={setFilter}
          availableCount={availableCount}
          isLoadingBank={isLoadingBank}
          isEasyMode={isEasyMode}
          setIsEasyMode={handleSetEasyMode}
          onStartGame={handleStartGame}
          onOpenLeaderboard={() => setShowLeaderboard(true)}
          onOpenBadges={() => setShowBadges(true)}
        />
      )}

      {/* Game Over Screen */}
      {gameState === 'GAMEOVER' && (
        <div className="absolute inset-0 bg-slate-950/92 backdrop-blur-xl flex flex-col justify-center items-center p-4 z-30 text-center animate-fadeIn">
          <div className="w-full max-w-[360px] bg-slate-900 border border-rose-500/30 rounded-3xl p-6 shadow-2xl flex flex-col items-center">
            <div className="text-4xl mb-2">💥</div>
            <h2 className="text-xl font-black text-rose-400 mb-1">CHƯA VƯỢT QUA!</h2>
            <p className="text-xs text-slate-400 mb-4">
              Đừng nản lòng! Ôn luyện kiến thức hình học và thử lại ngay nhé.
            </p>

            <div className="w-full grid grid-cols-2 gap-2 bg-black/40 p-3 rounded-2xl mb-5 font-mono text-xs">
              <div className="text-left">
                <span className="text-slate-400 block text-[10px]">Điểm số</span>
                <span className="text-lg font-bold text-sky-400">{score}/20</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px]">Coins kiếm được</span>
                <span className="text-lg font-bold text-amber-400">🪙 {studyCoins}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 w-full">
              <button
                type="button"
                onClick={handleStartGame}
                className="w-full min-h-[48px] py-3 bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-600 hover:from-indigo-500 hover:to-sky-500 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>🔄</span>
                <span>CHƠI LẠI VÁN MỚI</span>
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { window.location.hash = '#/home'; }}
                  className="flex-1 min-h-[44px] py-2.5 px-3 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>🏠</span>
                  <span>TRANG CHỦ</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGameState('SETUP')}
                  className="flex-1 min-h-[44px] py-2.5 px-3 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>⚙️</span>
                  <span>SẢNH CHỌN</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Victory Screen (20/20) */}
      {gameState === 'WIN' && (
        <div className="absolute inset-0 bg-slate-950/92 backdrop-blur-xl flex flex-col justify-center items-center p-4 z-30 text-center animate-fadeIn">
          <div className="w-full max-w-[400px] bg-gradient-to-b from-amber-950/80 to-slate-900 border border-amber-400/40 rounded-3xl p-6 shadow-2xl flex flex-col items-center">
            <div className="text-5xl mb-2 animate-bounce">👑</div>
            <h2 className="text-xl font-black text-amber-300 mb-1">
              THẦN ĐỒNG HÌNH HỌC 9!
            </h2>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Hoàn thành tuyệt đối 20/20 câu & Đại thắng Quái thú Casio FX-580! Em đã làm chủ hoàn toàn chương trình Hình học 9!
            </p>

            <div className="w-full bg-black/40 p-3 rounded-2xl mb-5 font-mono text-xs">
              <div className="text-amber-400 font-bold text-base">✨ ĐIỂM TUYỆT ĐỐI: 20/20</div>
              <div className="text-slate-400 text-[11px] mt-1">🪙 Tổng coins: {studyCoins}</div>
            </div>

            <div className="flex flex-col gap-2.5 w-full">
              <button
                type="button"
                onClick={handleStartGame}
                className="w-full min-h-[48px] py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>🏆</span>
                <span>CHƠI LẠI VÁN MỚI</span>
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { window.location.hash = '#/home'; }}
                  className="flex-1 min-h-[44px] py-2.5 px-3 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>🏠</span>
                  <span>TRANG CHỦ</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGameState('SETUP')}
                  className="flex-1 min-h-[44px] py-2.5 px-3 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>⚙️</span>
                  <span>SẢNH CHỌN</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showLeaderboard && (
        <LeaderboardModal
          leaderboard={leaderboard}
          onClose={() => setShowLeaderboard(false)}
        />
      )}

      {showBadges && (
        <BadgesModal
          userBadges={userBadges}
          onClose={() => setShowBadges(false)}
        />
      )}

      {/* Floating Toast Notification */}
      {toast && (
        <div
          className={`absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full font-bold text-xs shadow-xl z-50 flex items-center gap-2 animate-bounce whitespace-nowrap border pointer-events-none select-none ${
            toast.type === 'error'
              ? 'bg-rose-600 text-white border-rose-400'
              : toast.type === 'power'
              ? 'bg-sky-600 text-white border-sky-400'
              : toast.type === 'boss'
              ? 'bg-amber-600 text-white border-amber-400'
              : 'bg-emerald-600 text-white border-emerald-400'
          }`}
        >
          <span>{toast.text}</span>
        </div>
      )}
    </div>
  );
};
