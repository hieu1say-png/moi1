/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - CENTRALIZED GAME CONFIGURATION
 * Single Source of Truth for timing, physics, speed, transitions & accessibility.
 */

export interface GameSpeedConfig {
  id: 'easy' | 'normal';
  name: string;
  speedMultiplier: number;
  pipeSpeedNormal: number;
  pipeSpeedSlow: number;
  gravity: number;
  jumpVelocity: number;
  spawnIntervalNormal: number;
  spawnIntervalBoss: number;
  pipeGap: number;
  pipeWidth: number;
  bossSpeedY: number;
  bulletSpeedX: number;
  transitionDuration: number;
  feedbackDuration: number;
  screenShakeMultiplier: number;
  maxParticles: number;
}

// EASY MODE (Slow Mode) - Mặc định cho học sinh lớp 9: Chậm rãi, êm ái, chú trọng tư duy Toán học
// Baseline: speedMultiplier ≈ 0.70–0.80 (chọn 0.75)
export const EASY_GAME_CONFIG: GameSpeedConfig = {
  id: 'easy',
  name: 'Chậm rãi & Dễ chơi (Khuyên dùng)',
  speedMultiplier: 0.75,
  pipeSpeedNormal: 1.7, // Giảm tốc độ trôi cột phù hợp phản xạ học sinh lớp 9
  pipeSpeedSlow: 1.1,
  gravity: 0.28,        // Trọng lực êm ái giúp chim lượn mượt mà
  jumpVelocity: -5.4,   // Lực nhảy nhẹ nhàng, không xóc
  spawnIntervalNormal: 175, // Giãn khoảng cách cột (~1.45x)
  spawnIntervalBoss: 195,
  pipeGap: 168,         // Khoảng trống vượt ống thoáng (168px)
  pipeWidth: 52,
  bossSpeedY: 0.95,     // Boss di chuyển từ tốn
  bulletSpeedX: 8.5,    // Tốc độ tia ngắm chuẩn mực
  transitionDuration: 300, // 300ms chuyển cảnh (nằm trong khoảng 250-400ms)
  feedbackDuration: 900,   // 900ms hiển thị phản hồi đủ lâu để học sinh đọc
  screenShakeMultiplier: 0.25, // Giảm rung chấn 75%
  maxParticles: 8       // Giảm số lượng hạt particle
};

// NORMAL MODE - Dành cho các em muốn thử thách nhịp độ cao hơn
export const NORMAL_GAME_CONFIG: GameSpeedConfig = {
  id: 'normal',
  name: 'Tiêu chuẩn (Thử thách)',
  speedMultiplier: 1.0,
  pipeSpeedNormal: 2.2,
  pipeSpeedSlow: 1.3,
  gravity: 0.34,
  jumpVelocity: -6.2,
  spawnIntervalNormal: 135,
  spawnIntervalBoss: 155,
  pipeGap: 152,
  pipeWidth: 52,
  bossSpeedY: 1.3,
  bulletSpeedX: 11,
  transitionDuration: 250,
  feedbackDuration: 650,
  screenShakeMultiplier: 0.5,
  maxParticles: 14
};

export const getGameConfig = (isEasyMode: boolean): GameSpeedConfig => {
  return isEasyMode ? EASY_GAME_CONFIG : NORMAL_GAME_CONFIG;
};

/**
 * Checks system prefers-reduced-motion setting
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

