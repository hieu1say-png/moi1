/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Gamification: Achievements, Badges & Challenges Mock Data
 */

import { Achievement, Badge, Challenge } from '../types/dataArchitecture';
import { MOCK_CHALLENGE_EXERCISES } from './exercisesData';

export const MOCK_BADGES: Badge[] = [
  {
    id: 'badge-3d-explorer',
    title: 'Nhà Thám Hiểm Hình Học',
    description: 'Khám phá và tương tác 3D trọn vẹn cả 3 hình: Trụ, Nón, Cầu.',
    icon: 'Compass',
    tier: 'gold',
    shapeTheme: 'general',
    criteria: 'Hoàn thành khám phá 3/3 hình không gian',
    rarity: 'epic'
  },
  {
    id: 'badge-speed-calc',
    title: 'Kỷ Lục Gia Tính Nhanh',
    description: 'Làm đúng 5 câu liên tiếp dưới 60 giây mỗi câu.',
    icon: 'Target',
    tier: 'silver',
    shapeTheme: 'general',
    criteria: 'Làm đúng 5 câu liên tiếp tốc độ cao',
    rarity: 'rare'
  },
  {
    id: 'badge-formula-master',
    title: 'Bậc Thầy Công Thức',
    description: 'Thuộc và vận dụng đúng toàn bộ công thức Sxq, Stp và Thể tích V.',
    icon: 'Crown',
    tier: 'diamond',
    shapeTheme: 'general',
    criteria: 'Áp dụng chính xác 100% công thức SGK',
    rarity: 'legendary'
  },
  {
    id: 'badge-exam-warrior',
    title: 'Chiến Binh Ôn Thi',
    description: 'Hoàn thành xuất sắc 3 đề thi thử chuẩn cấu trúc vào Lớp 10.',
    icon: 'Award',
    tier: 'gold',
    shapeTheme: 'general',
    criteria: 'Hoàn thành 3 đề thi thử vào 10',
    rarity: 'epic'
  },
  {
    id: 'badge-archimedes-water',
    title: 'Thợ Rót Nước Archimedes',
    description: 'Khám phá trọn vẹn thí nghiệm rót nước nón sang trụ và thả vật chìm.',
    icon: 'Globe',
    tier: 'silver',
    shapeTheme: 'cylinder',
    criteria: 'Thực hiện mô phỏng rót nước thực nghiệm',
    rarity: 'rare'
  },
  {
    id: 'badge-explorer',
    title: 'Người Khám Phá',
    description: 'Khám phá và xoay tương tác đủ 3 mô hình 3D: Hình Trụ, Hình Nón, Hình Cầu.',
    icon: 'Compass',
    tier: 'bronze',
    shapeTheme: 'general',
    criteria: 'Khám phá 3/3 hình trong phòng thí nghiệm 3D',
    rarity: 'common'
  },
  {
    id: 'badge-cyl-expert',
    title: 'Chuyên Gia Hình Trụ',
    description: 'Nắm vững đặc điểm, công thức và hoàn thành các bài tập về Hình Trụ.',
    icon: 'Cylinder',
    tier: 'silver',
    shapeTheme: 'cylinder',
    criteria: 'Hoàn thành lý thuyết và bài tập Hình Trụ',
    rarity: 'rare'
  },
  {
    id: 'badge-cone-expert',
    title: 'Chuyên Gia Hình Nón',
    description: 'Thành thạo công thức đường sinh Pythagore, diện tích và thể tích Hình Nón.',
    icon: 'Cone',
    tier: 'silver',
    shapeTheme: 'cone',
    criteria: 'Hoàn thành lý thuyết và bài tập Hình Nón',
    rarity: 'rare'
  },
  {
    id: 'badge-sph-expert',
    title: 'Chuyên Gia Hình Cầu',
    description: 'Chinh phục trọn vẹn diện tích mặt cầu và thể tích khối cầu.',
    icon: 'Globe',
    tier: 'gold',
    shapeTheme: 'sphere',
    criteria: 'Hoàn thành lý thuyết và bài tập Hình Cầu',
    rarity: 'epic'
  },
  {
    id: 'badge-master',
    title: 'Bậc Thầy Hình Khối',
    description: 'Hoàn thành xuất sắc toàn bộ bài học, bài tập và các tình huống ứng dụng thực tế.',
    icon: 'Crown',
    tier: 'diamond',
    shapeTheme: 'general',
    criteria: 'Hoàn thành tất cả 3 chủ đề hình khối không gian',
    rarity: 'legendary'
  }
];

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-theory-1',
    code: 'THEORY_INIT',
    title: 'Khởi Đầu Vững Chắc',
    description: 'Đọc và tương tác với bài học lý thuyết đầu tiên.',
    category: 'theory',
    icon: 'BookOpen',
    xpReward: 50,
    badgeId: 'badge-bronze-explorer',
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedAt: '2026-08-10T14:20:00Z',
    criteriaDescription: 'Hoàn thành 1 bài lý thuyết'
  },
  {
    id: 'ach-practice-1',
    code: 'PRACTICE_BRONZE',
    title: 'Giải Đề Thần Tốc',
    description: 'Giải đúng liên tiếp 5 bài tập trắc nghiệm và tự luận.',
    category: 'practice',
    icon: 'Target',
    xpReward: 100,
    badgeId: 'badge-cyl-master',
    progress: 3,
    maxProgress: 5,
    unlocked: false,
    criteriaDescription: 'Giải đúng 5 bài tập'
  },
  {
    id: 'ach-explore-1',
    code: '3D_EXPLORER',
    title: 'Kỹ Sư 3D',
    description: 'Xoay và điều chỉnh thông số r, h trên tất cả 3 mô hình không gian.',
    category: 'explore',
    icon: 'Sparkles',
    xpReward: 80,
    badgeId: 'badge-bronze-explorer',
    progress: 2,
    maxProgress: 3,
    unlocked: false,
    criteriaDescription: 'Khám phá đủ 3 mô hình 3D'
  },
  {
    id: 'ach-streak-1',
    code: 'STREAK_7DAYS',
    title: 'Chiến Binh Kiên Trì',
    description: 'Học liên tục 7 ngày không gián đoạn.',
    category: 'streak',
    icon: 'Flame',
    xpReward: 150,
    badgeId: 'badge-cone-master',
    progress: 4,
    maxProgress: 7,
    unlocked: false,
    criteriaDescription: 'Đạt chuỗi học 7 ngày'
  },
  {
    id: 'ach-mastery-1',
    code: 'MASTERY_OLYMPIAD',
    title: 'Đỉnh Cao Điểm 10',
    description: 'Giải quyết thành công thử thách hình học phối hợp nâng cao.',
    category: 'mastery',
    icon: 'Award',
    xpReward: 200,
    badgeId: 'badge-archimedes-legend',
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    criteriaDescription: 'Hoàn thành thử thách Archimedes'
  }
];

export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: 'challenge-water-tank-01',
    title: 'Thử Thách Archimedes: Nước Trào & Khối Cầu',
    subtitle: 'Dạng bài phối hợp phân loại điểm 9-10 kì thi vào Lớp 10',
    description: 'Tính toán chính xác thể tích nước dâng và tràn khi thả quả cầu kim loại đặc vào cốc hình trụ.',
    shapeId: 'all',
    difficulty: 'hard',
    timeLimitSeconds: 180,
    rewardXp: 150,
    exercises: MOCK_CHALLENGE_EXERCISES,
    badgeRewardId: 'badge-archimedes-legend',
    deadline: '2026-08-31T23:59:59Z',
    isCompleted: false
  },
  {
    id: 'challenge-icecream-02',
    title: 'Tối Ưu Hóa Cây Kem Ốc Quế & Nửa Khối Cầu',
    subtitle: 'Bài toán mô hình hóa thể tích phối hợp nón và bán cầu',
    description: 'Một cây kem gồm phần ốc quế hình nón phía dưới và viên kem hình bán cầu phía trên. Tính tổng thể tích kem chứa được.',
    shapeId: 'cone',
    difficulty: 'medium',
    timeLimitSeconds: 240,
    rewardXp: 120,
    exercises: [],
    badgeRewardId: 'badge-cone-master',
    deadline: '2026-09-15T23:59:59Z',
    isCompleted: false
  }
];
