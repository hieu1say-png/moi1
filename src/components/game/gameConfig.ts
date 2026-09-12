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
export const EASY_GAME_CONFIG: GameSpeedConfig = {
  id: 'easy',
  name: 'Chậm rãi & Dễ chơi (Khuyên dùng)',
  speedMultiplier: 0.68,
  pipeSpeedNormal: 1.6, // Giảm từ 2.4 px/frame xuống 1.6 (khoảng 66%)
  pipeSpeedSlow: 1.0,
  gravity: 0.27,        // Giảm từ 0.38 xuống 0.27 giúp chim bay lượn êm hơn
  jumpVelocity: -5.4,   // Lực nhảy êm, không bị giật
  spawnIntervalNormal: 175, // Giãn khoảng cách sinh cột từ 120 lên 175 (~1.46x)
  spawnIntervalBoss: 195,
  pipeGap: 165,         // Khoảng trống vượt ống rộng hơn (từ 150 lên 165px)
  pipeWidth: 52,
  bossSpeedY: 0.95,     // Boss di chuyển chậm hơn (từ 1.5 xuống 0.95)
  bulletSpeedX: 8.5,    // Tốc độ đạn laze mượt mà
  transitionDuration: 300, // 300ms chuyển câu (chuẩn 250-400ms)
  feedbackDuration: 800,   // 800ms hiển thị phản hồi đúng/sai trước khi đóng (chuẩn 600-1000ms)
  screenShakeMultiplier: 0.35, // Giảm rung chấn 65%
  maxParticles: 10
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
  screenShakeMultiplier: 0.6,
  maxParticles: 16
};

export const getGameConfig = (isEasyMode: boolean): GameSpeedConfig => {
  return isEasyMode ? EASY_GAME_CONFIG : NORMAL_GAME_CONFIG;
};
