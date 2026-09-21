/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - HÌNH HỌC 9 MASTER GAME CANVAS ENGINE
 * High-performance 60FPS 2D Canvas with Flappy Physics, Boss Battle, Particles & Powerups.
 */

import React, { useRef, useEffect } from 'react';
import { GameState } from './types';
import { GameSound } from './soundEffects';
import { getGameConfig, prefersReducedMotion } from './gameConfig';

interface PowerUpItem {
  x: number;
  y: number;
  type: 'shield' | '5050' | 'slow' | 'lifeline';
  size: number;
}

interface PipeItem {
  x: number;
  top: number;
  bottom: number;
  passed: boolean;
}

interface ParticleItem {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
}

interface BulletItem {
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
}

interface GameCanvasProps {
  gameState: GameState;
  selectedChar: string;
  streak: number;
  hasShield: boolean;
  isSlowMo: boolean;
  isEasyMode?: boolean;
  isBossStage: boolean;
  bossHP: number;
  onQuestionTrigger: () => void;
  onPowerUpCollect: (type: 'shield' | '5050' | 'slow' | 'lifeline') => void;
  onShieldBreak: () => void;
  onGameOver: () => void;
  onBossHitResolved: () => void;
  bossHitPending: boolean;
  onStartPlaying?: () => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  gameState,
  selectedChar,
  streak,
  hasShield,
  isSlowMo,
  isEasyMode = true,
  isBossStage,
  bossHP,
  onQuestionTrigger,
  onPowerUpCollect,
  onShieldBreak,
  onGameOver,
  onBossHitResolved,
  bossHitPending,
  onStartPlaying
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Stable reference to latest props for 60FPS loop without tearing down
  const propsRef = useRef({
    gameState,
    selectedChar,
    streak,
    hasShield,
    isSlowMo,
    isEasyMode,
    isBossStage,
    bossHP,
    onQuestionTrigger,
    onPowerUpCollect,
    onShieldBreak,
    onGameOver,
    onStartPlaying
  });
  propsRef.current = {
    gameState,
    selectedChar,
    streak,
    hasShield,
    isSlowMo,
    isEasyMode,
    isBossStage,
    bossHP,
    onQuestionTrigger,
    onPowerUpCollect,
    onShieldBreak,
    onGameOver,
    onStartPlaying
  };

  const initialConfig = getGameConfig(isEasyMode);

  // Mutable game simulation state preserved across re-renders
  const stateRef = useRef({
    bird: {
      x: 60,
      y: 200,
      width: 28,
      height: 28,
      velocity: 0,
      gravity: initialConfig.gravity,
      jump: initialConfig.jumpVelocity
    },
    pipes: [] as PipeItem[],
    powerUps: [] as PowerUpItem[],
    particles: [] as ParticleItem[],
    bullets: [] as BulletItem[],
    boss: {
      x: 260,
      y: 180,
      width: 60,
      height: 60,
      vy: 1.5
    },
    frames: 0,
    shake: 0,
    animId: 0
  });

  // Loop pause/resume controllers to prevent background CPU/GPU drain
  const loopActiveRef = useRef(false);
  const wakeUpLoopRef = useRef<() => void>(() => {});

  // Reset Simulation State
  const resetSimulation = () => {
    const canvas = canvasRef.current;
    const height = canvas && canvas.height > 0 ? canvas.height : 480;
    const width = canvas && canvas.width > 0 ? canvas.width : 600;
    const cfg = getGameConfig(propsRef.current.isEasyMode ?? true);

    stateRef.current.bird = {
      x: 60,
      y: Math.max(60, Math.min(220, height * 0.38)),
      width: 28,
      height: 28,
      velocity: 0,
      gravity: cfg.gravity,
      jump: cfg.jumpVelocity
    };
    stateRef.current.pipes = [];
    stateRef.current.powerUps = [];
    stateRef.current.particles = [];
    stateRef.current.bullets = [];
    stateRef.current.boss = {
      x: Math.max(200, width - 90),
      y: 180,
      width: 60,
      height: 60,
      vy: 1.5
    };
    stateRef.current.frames = 0;
    stateRef.current.shake = 0;
  };

  // Reset simulation when returning to SETUP or entering START, and wake up loop
  useEffect(() => {
    if (gameState === 'START' || gameState === 'SETUP') {
      resetSimulation();
    } else if (gameState === 'PLAYING') {
      // If resuming from a question modal, prevent bird from plunging downward
      if (stateRef.current.bird.velocity > 0) {
        stateRef.current.bird.velocity = -1.5;
      }
    }

    if (gameState === 'PLAYING' || gameState === 'START') {
      wakeUpLoopRef.current();
    }
  }, [gameState]);

  // Centralized Unified Input Handler (Pointer + Keyboard)
  const handleGameInput = (e?: React.SyntheticEvent | Event) => {
    if (e && 'preventDefault' in e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    const currentGameState = propsRef.current.gameState;

    // If in START overlay, start game AND jump immediately
    if (currentGameState === 'START') {
      if (propsRef.current.onStartPlaying) {
        propsRef.current.onStartPlaying();
      }
      stateRef.current.bird.velocity = stateRef.current.bird.jump;
      GameSound.play('flap');
      return;
    }

    if (currentGameState !== 'PLAYING') return;

    stateRef.current.bird.velocity = stateRef.current.bird.jump;
    GameSound.play('flap');

    // Instant particle feedback on jump
    const bird = stateRef.current.bird;
    for (let i = 0; i < 3; i++) {
      stateRef.current.particles.push({
        x: bird.x + 8 + Math.random() * 8,
        y: bird.y + bird.height,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 2 + 1,
        color: '#38bdf8',
        size: Math.random() * 3 + 2,
        life: 0.6
      });
    }
  };

  // Pointer Down Handler for Canvas
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.isPrimary === false) return;
    if (e.button !== 0 && e.button !== undefined) return;
    e.preventDefault();
    handleGameInput(e);
  };

  // Keyboard controls: Space, ArrowUp, KeyW
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        const target = e.target as HTMLElement | null;
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
          return;
        }
        e.preventDefault();
        handleGameInput(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Listen to tab visibility to pause animation loop and eliminate CPU/battery waste
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        wakeUpLoopRef.current();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Trigger bullet if Boss hit pending
  useEffect(() => {
    if (bossHitPending) {
      const bird = stateRef.current.bird;
      stateRef.current.bullets.push({
        x: bird.x + 20,
        y: bird.y + 10,
        vx: 12,
        vy: 0,
        active: true
      });
      GameSound.play('laser');
      onBossHitResolved();
    }
  }, [bossHitPending, onBossHitResolved]);

  // Main Canvas Animation Loop (Lifecycle decoupled from state changes via propsRef)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      if (canvas.width !== Math.floor(rect.width) || canvas.height !== Math.floor(rect.height)) {
        canvas.width = Math.floor(rect.width);
        canvas.height = Math.floor(rect.height);
        stateRef.current.boss.x = Math.max(200, canvas.width - 90);
      }
    };

    resizeCanvas();

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const PIPE_WIDTH = 52;
    const PIPE_GAP = 150;

    const requestNextFrame = () => {
      if (!isRunning) return;
      const currentProps = propsRef.current;
      const shouldAnimate =
        !document.hidden &&
        (currentProps.gameState === 'PLAYING' || currentProps.gameState === 'START');

      if (shouldAnimate) {
        loopActiveRef.current = true;
        stateRef.current.animId = requestAnimationFrame(loop);
      } else {
        loopActiveRef.current = false;
      }
    };

    wakeUpLoopRef.current = () => {
      if (isRunning && !loopActiveRef.current) {
        const currentProps = propsRef.current;
        if (!document.hidden && (currentProps.gameState === 'PLAYING' || currentProps.gameState === 'START')) {
          loopActiveRef.current = true;
          stateRef.current.animId = requestAnimationFrame(loop);
        }
      }
    };

    const loop = () => {
      if (!isRunning) return;

      const currentProps = propsRef.current;
      const { bird, pipes, powerUps, particles, bullets, boss } = stateRef.current;
      stateRef.current.frames++;

      const width = canvas.width;
      const height = canvas.height;

      if (width === 0 || height === 0) {
        requestNextFrame();
        return;
      }

      ctx.save();

      // Screen Shake (Suppressed if user prefers reduced motion)
      const reducedMotion = prefersReducedMotion();
      if (reducedMotion) {
        stateRef.current.shake = 0;
      } else if (stateRef.current.shake > 0) {
        const sx = (Math.random() - 0.5) * stateRef.current.shake;
        const sy = (Math.random() - 0.5) * stateRef.current.shake;
        ctx.translate(sx, sy);
        stateRef.current.shake *= 0.9;
        if (stateRef.current.shake < 0.5) stateRef.current.shake = 0;
      }

      // 1. Draw Space Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#020617');
      bgGrad.addColorStop(0.5, '#0b1329');
      bgGrad.addColorStop(1, currentProps.isBossStage ? '#2a0815' : '#022c22');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Distant stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 20; i++) {
        const starX = (i * 37 + stateRef.current.frames * 0.2) % width;
        const starY = (i * 59) % height;
        ctx.fillRect(starX, starY, 1.5, 1.5);
      }

      // Ground line
      ctx.strokeStyle = currentProps.isBossStage ? '#e11d48' : '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, height - 10);
      ctx.lineTo(width, height - 10);
      ctx.stroke();

      // 2. Physics & updates only when PLAYING
      if (currentProps.gameState === 'PLAYING') {
        const config = getGameConfig(currentProps.isEasyMode ?? true);
        const speed = currentProps.isSlowMo ? config.pipeSpeedSlow : config.pipeSpeedNormal;
        const currentPipeGap = config.pipeGap;

        // Bird physics with tuned smooth glide for 9th grade students
        bird.gravity = config.gravity;
        bird.jump = config.jumpVelocity;
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        // Ground / Ceiling collision
        if (bird.y + bird.height >= height - 10 || bird.y <= 0) {
          if (currentProps.hasShield) {
            bird.velocity = -4;
            bird.y = Math.max(10, Math.min(height - 40, bird.y));
            stateRef.current.shake = Math.round(10 * config.screenShakeMultiplier);
            currentProps.onShieldBreak();
          } else {
            GameSound.play('wrong');
            currentProps.onGameOver();
            return;
          }
        }

        // Fire trail if streak >= 3 (capped and respects reduced motion)
        if (!reducedMotion && currentProps.streak >= 3 && stateRef.current.frames % 4 === 0 && particles.length < config.maxParticles) {
          particles.push({
            x: bird.x - 5,
            y: bird.y + 14 + (Math.random() - 0.5) * 6,
            vx: -2 - Math.random() * 2,
            vy: (Math.random() - 0.5) * 2,
            color: currentProps.streak >= 5 ? '#f43f5e' : '#f97316',
            size: Math.random() * 3 + 2,
            life: 1
          });
        }

        // Spawning Barriers / Pipes (both normal and boss stage)
        const spawnInterval = currentProps.isBossStage ? config.spawnIntervalBoss : config.spawnIntervalNormal;
        if (stateRef.current.frames % spawnInterval === 0) {
          const minH = 60;
          const maxH = Math.max(minH + 10, height - currentPipeGap - minH - 30);
          const top = Math.floor(Math.random() * (maxH - minH + 1)) + minH;
          pipes.push({
            x: width,
            top,
            bottom: height - (top + currentPipeGap),
            passed: false
          });

          // 35% chance to spawn a Power-up in pipe gap (in normal mode)
          if (!currentProps.isBossStage && Math.random() < 0.35) {
            const types: ('shield' | '5050' | 'slow' | 'lifeline')[] = ['shield', '5050', 'slow', 'lifeline'];
            const chosenType = types[Math.floor(Math.random() * types.length)];
            powerUps.push({
              x: width + PIPE_WIDTH / 2,
              y: top + currentPipeGap / 2,
              type: chosenType,
              size: 22
            });
          }
        }

        // Update Pipes
        for (let i = pipes.length - 1; i >= 0; i--) {
          const p = pipes[i];
          p.x -= speed;

          // Bird vs Pipe Collision
          if (
            bird.x + bird.width > p.x &&
            bird.x < p.x + PIPE_WIDTH &&
            (bird.y < p.top || bird.y + bird.height > height - p.bottom)
          ) {
            if (currentProps.hasShield) {
              pipes.splice(i, 1);
              stateRef.current.shake = Math.round(12 * config.screenShakeMultiplier);
              currentProps.onShieldBreak();
              continue;
            } else {
              GameSound.play('wrong');
              currentProps.onGameOver();
              return;
            }
          }

          // Pipe passed -> trigger Question Modal
          if (!p.passed && p.x + PIPE_WIDTH < bird.x) {
            p.passed = true;
            currentProps.onQuestionTrigger();
          }

          // Off-screen cleanup
          if (p.x + PIPE_WIDTH < -20) {
            pipes.splice(i, 1);
          }
        }

        // Update Power-ups
        for (let i = powerUps.length - 1; i >= 0; i--) {
          const pu = powerUps[i];
          pu.x -= speed;

          // Bird vs Power-up Collision
          const dist = Math.hypot(bird.x + 14 - pu.x, bird.y + 14 - pu.y);
          if (dist < 26) {
            currentProps.onPowerUpCollect(pu.type);
            powerUps.splice(i, 1);
            continue;
          }

          if (pu.x < -30) {
            powerUps.splice(i, 1);
          }
        }

        // Boss animation
        if (currentProps.isBossStage) {
          boss.y += boss.vy;
          if (boss.y < 80 || boss.y > height - 140) {
            boss.vy *= -1;
          }
        }

        // Update Bullets
        for (let i = bullets.length - 1; i >= 0; i--) {
          const b = bullets[i];
          b.x += b.vx;

          // Bullet hits Boss
          if (
            currentProps.isBossStage &&
            b.x >= boss.x &&
            b.x <= boss.x + boss.width &&
            b.y >= boss.y &&
            b.y <= boss.y + boss.height
          ) {
            b.active = false;
            bullets.splice(i, 1);
            stateRef.current.shake = reducedMotion ? 0 : Math.round(14 * config.screenShakeMultiplier);

            // Explosion particles (capped)
            if (!reducedMotion) {
              const count = Math.min(config.maxParticles, 8);
              for (let k = 0; k < count; k++) {
                particles.push({
                  x: boss.x + boss.width / 2,
                  y: boss.y + boss.height / 2,
                  vx: (Math.random() - 0.5) * 5,
                  vy: (Math.random() - 0.5) * 5,
                  color: '#f43f5e',
                  size: Math.random() * 4 + 2,
                  life: 1
                });
              }
            }
          } else if (b.x > width + 40) {
            bullets.splice(i, 1);
          }
        }
      }

      // Update Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const pt = particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= 0.03;
        if (pt.life <= 0) {
          particles.splice(i, 1);
        }
      }

      // 3. Render Objects

      // Render Pipes
      for (const p of pipes) {
        if (currentProps.isBossStage) {
          // Boss Laser Gate Styling
          ctx.fillStyle = '#991b1b';
          ctx.fillRect(p.x, 0, PIPE_WIDTH, p.top);
          ctx.fillRect(p.x, height - p.bottom, PIPE_WIDTH, p.bottom);

          ctx.fillStyle = '#f43f5e';
          ctx.fillRect(p.x - 3, p.top - 16, PIPE_WIDTH + 6, 16);
          ctx.fillRect(p.x - 3, height - p.bottom, PIPE_WIDTH + 6, 16);

          ctx.strokeStyle = '#fda4af';
          ctx.lineWidth = 2;
          ctx.strokeRect(p.x, 0, PIPE_WIDTH, p.top);
          ctx.strokeRect(p.x, height - p.bottom, PIPE_WIDTH, p.bottom);
        } else {
          // Normal Geometry Pipes
          ctx.fillStyle = '#059669';
          ctx.fillRect(p.x, 0, PIPE_WIDTH, p.top);
          ctx.fillRect(p.x, height - p.bottom, PIPE_WIDTH, p.bottom);

          ctx.fillStyle = '#10b981';
          ctx.fillRect(p.x - 3, p.top - 16, PIPE_WIDTH + 6, 16);
          ctx.fillRect(p.x - 3, height - p.bottom, PIPE_WIDTH + 6, 16);

          ctx.strokeStyle = '#022c22';
          ctx.lineWidth = 2;
          ctx.strokeRect(p.x, 0, PIPE_WIDTH, p.top);
          ctx.strokeRect(p.x, height - p.bottom, PIPE_WIDTH, p.bottom);
        }
      }

      // Render Power-ups
      for (const pu of powerUps) {
        ctx.save();
        ctx.translate(pu.x, pu.y);
        ctx.font = '18px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Glow ring
        ctx.beginPath();
        ctx.arc(0, 0, 14, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fill();

        let icon = '🛡️';
        if (pu.type === '5050') icon = '💡';
        else if (pu.type === 'slow') icon = '⏳';
        else if (pu.type === 'lifeline') icon = '🛟';

        ctx.fillText(icon, 0, 2);
        ctx.restore();
      }

      // Render Particles
      for (const pt of particles) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.life);
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Render Bullets
      for (const b of bullets) {
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#0284c7';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(b.x, b.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Render Boss (Quái thú Casio FX-580)
      if (currentProps.isBossStage) {
        ctx.save();
        ctx.translate(boss.x, boss.y);

        // Dark tech body
        ctx.fillStyle = '#1e1b4b';
        ctx.strokeStyle = '#e11d48';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(0, 0, boss.width, boss.height, 12);
        ctx.fill();
        ctx.stroke();

        // Casio Screen
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(8, 8, boss.width - 16, 18);

        // Glowing red eye
        ctx.fillStyle = '#f43f5e';
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(boss.width / 2, 17, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Keys grid
        ctx.fillStyle = '#475569';
        for (let r = 0; r < 2; r++) {
          for (let c = 0; c < 3; c++) {
            ctx.fillRect(10 + c * 14, 32 + r * 10, 10, 6);
          }
        }

        // Horns / Antennas
        ctx.fillStyle = '#e11d48';
        ctx.fillRect(6, -6, 6, 6);
        ctx.fillRect(boss.width - 12, -6, 6, 6);

        ctx.restore();
      }

      // Render Bird (Player)
      ctx.save();
      ctx.translate(bird.x + 14, bird.y + 14);
      const angle = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, (bird.velocity * 4 * Math.PI) / 180));
      ctx.rotate(angle);

      // Shield Aura
      if (currentProps.hasShield) {
        ctx.beginPath();
        ctx.arc(0, 0, 22, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.fill();
      }

      ctx.font = '24px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(currentProps.selectedChar, 0, 2);
      ctx.restore();

      ctx.restore();

      requestNextFrame();
    };

    requestNextFrame();

    return () => {
      isRunning = false;
      loopActiveRef.current = false;
      cancelAnimationFrame(stateRef.current.animId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      style={{ touchAction: 'none' }}
      className="w-full h-full block touch-none cursor-pointer outline-none select-none"
    />
  );
};
