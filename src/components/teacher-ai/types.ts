/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TEACHER THẦY HIẾU AI - SYSTEM TYPES
 * 8 Avatar States, 5 Pedagogical Feedback Levels, and 3D Visual Highlighting
 */

import { ShapeType } from '../../types';
import { LearningEventType } from '../../types/spatialProfile';

export type TeacherAvatarState =
  | 'IDLE'        // Mỉm cười nhẹ, theo dõi học sinh
  | 'THINKING'    // Tay chống cằm, nghiền ngẫm
  | 'POINTING'    // Tay chỉ chính xác vào đối tượng 3D (kèm teacherTarget)
  | 'EXPLAINING'  // Cầm thước / tay diễn giải sơ đồ
  | 'HINT'        // Nhướn mày, gợi mở bí quyết
  | 'ERROR'       // Mỉm cười động viên, ấm áp, không phán xét
  | 'SUCCESS'     // Thumbs up, khích lệ
  | 'CELEBRATING';// Vỗ tay, chúc mừng đột phá

export type VisualHighlightTarget =
  | 'radius'      // Bán kính R / OA / OM
  | 'diameter'    // Đường kính 2R / AB
  | 'height'      // Chiều cao h / OO' / SO
  | 'generatrix'  // Đường sinh l / SA / SB
  | 'center'      // Tâm O / O'
  | 'axis'        // Trục quay / Trục đối xứng
  | 'section'     // Thiết diện / Mặt cắt qua trục
  | 'base'        // Đáy tròn / Mặt phẳng đáy
  | 'volume'      // Khối thể tích / Nước
  | null;

export interface TeacherChatMessage {
  id: string;
  sender: 'teacher' | 'student';
  text: string;
  subtitle?: string;
  latex?: string;
  avatarState?: TeacherAvatarState;
  highlightTarget?: VisualHighlightTarget;
  feedbackLevel?: 1 | 2 | 3 | 4 | 5;
  timestamp: number;
}

export interface TeacherAIContextValue {
  avatarState: TeacherAvatarState;
  setAvatarState: (state: TeacherAvatarState) => void;
  currentMessage: TeacherChatMessage | null;
  teacherTarget: VisualHighlightTarget;
  setTeacherTarget: (target: VisualHighlightTarget) => void;
  say: (text: string, options?: {
    subtitle?: string;
    latex?: string;
    avatarState?: TeacherAvatarState;
    highlightTarget?: VisualHighlightTarget;
    feedbackLevel?: 1 | 2 | 3 | 4 | 5;
  }) => void;
  feedbackLevel: 1 | 2 | 3 | 4 | 5;
  requestNextHint: () => void;
  showSolution: () => void;
  resetHints: () => void;
  isBubbleOpen: boolean;
  setIsBubbleOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  emitLearningEvent: (type: LearningEventType, metadata?: Record<string, any>) => void;
}
