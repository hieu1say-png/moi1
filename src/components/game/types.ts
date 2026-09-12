/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - HÌNH HỌC 9 MASTER GAME TYPES
 */

import { GameQuestion } from '../../services/geometryGameQuestionService';

export type GameState = 'SETUP' | 'START' | 'PLAYING' | 'PAUSED' | 'QUESTION' | 'GAMEOVER' | 'WIN';

export interface BadgeItem {
  id: string;
  icon: string;
  name: string;
  desc: string;
  legendary?: boolean;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  coins: number;
  date: string;
}

export interface ToastMessage {
  text: string;
  type: 'success' | 'error' | 'power' | 'boss';
}

export const GAME_BADGE_LIST: BadgeItem[] = [
  { id: 'first_step', icon: '🐣', name: 'Tân Thủ', desc: 'Vượt qua câu hỏi đầu tiên' },
  { id: 'shield_hero', icon: '🛡️', name: 'Khiên Bất Tử', desc: 'Nhặt và dùng khiên cứu mạng' },
  { id: 'smart_bulb', icon: '💡', name: 'Bác Học', desc: 'Kích hoạt bổ trợ 50:50' },
  { id: 'speed_god', icon: '⚡', name: 'Thần Tốc', desc: 'Trả lời đúng dưới 5 giây' },
  { id: 'streak_5', icon: '🔥', name: 'Chuỗi Bất Bại', desc: 'Đạt chuỗi 5 câu đúng liên tiếp' },
  { id: 'boss_slayer', icon: '👾', name: 'Dũng Sĩ Diệt Boss', desc: 'Hạ gục Quái Thú Casio FX-580', legendary: true },
  { id: 'master_a', icon: '👑', name: 'Thần Đồng A+', desc: 'Chiến thắng toàn bộ 20 câu' }
];

export const AVAILABLE_CHARACTERS = ['🚀', '🦉', '🐱', '🤓', '👾', '🌟'];
