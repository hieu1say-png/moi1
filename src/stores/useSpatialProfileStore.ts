/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SPATIAL THINKING PROFILE STORE
 * Manages the 8 spatial dimensions, AI adaptive recommendations, and learning event telemetry.
 */

import { create } from 'zustand';
import {
  SpatialProfileState,
  SpatialMetricKey,
  LearningEvent,
  LearningEventType,
  ScoreTier,
  SuggestedPractice
} from '../types/spatialProfile';

export type { SpatialMetricKey };

const STORAGE_KEY = 'geometry_lab_spatial_profile_v2';

export const SPATIAL_METRIC_CONFIG: Record<
  SpatialMetricKey,
  { label: string; shortLabel: string; description: string; icon: string }
> = {
  shapeRecognition: {
    label: 'Nhận diện hình',
    shortLabel: 'Nhận diện',
    description: 'Phân biệt và gọi tên chính xác hình trụ, hình nón, hình cầu trong không gian.',
    icon: 'Layers'
  },
  spatialOrientation: {
    label: 'Định hướng không gian',
    shortLabel: 'Định hướng',
    description: 'Quan sát mô hình 3D đa chiều, góc nhìn camera, trục quay và tọa độ không gian.',
    icon: 'Compass'
  },
  elementIdentification: {
    label: 'Đo lường',
    shortLabel: 'Đo lường',
    description: 'Xác định chính xác bán kính R, chiều cao h, đường sinh l, đường kính và diện tích.',
    icon: 'Ruler'
  },
  spatialTransformation: {
    label: 'Khai triển',
    shortLabel: 'Khai triển',
    description: 'Khai triển mặt xung quanh thành hình chữ nhật, hình quạt và liên kết các mặt đáy.',
    icon: 'Scissors'
  },
  twoDToThreeD: {
    label: 'Mặt cắt',
    shortLabel: 'Mặt cắt',
    description: 'Quan sát và nhận biết các thiết diện khi cắt hình khối bởi mặt phẳng qua trục hoặc vuông góc với trục.',
    icon: 'Box'
  },
  threeDToTwoD: {
    label: '3D → 2D',
    shortLabel: '3D → 2D',
    description: 'Chuyển đổi biểu diễn hình không gian sang hình phẳng và ngược lại.',
    icon: 'RotateCw'
  },
  mathematicalModeling: {
    label: 'Mô hình hóa',
    shortLabel: 'Mô hình hóa',
    description: 'Vận dụng đúng công thức diện tích xung quanh, toàn phần và thể tích để giải toán.',
    icon: 'BrainCircuit'
  },
  problemSolving: {
    label: 'Giải quyết vấn đề',
    shortLabel: 'Giải quyết',
    description: 'Ứng dụng hình học giải các bài toán thực tiễn và suy luận quy luật bảo toàn thể tích.',
    icon: 'Award'
  }
};

export const getScoreTier = (score: number): ScoreTier => {
  if (score >= 85) return 'mastered';
  if (score >= 70) return 'good';
  if (score >= 50) return 'developing';
  return 'need_practice';
};

export const getTierLabel = (tier: ScoreTier): string => {
  switch (tier) {
    case 'mastered':
      return 'Vững vàng';
    case 'good':
      return 'Khá tốt';
    case 'developing':
      return 'Đang phát triển';
    case 'need_practice':
      return 'Cần luyện thêm';
  }
};

export const getTierColor = (tier: ScoreTier) => {
  switch (tier) {
    case 'mastered':
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        ring: 'stroke-emerald-500',
        fill: 'bg-emerald-500',
        badge: 'bg-emerald-100 text-emerald-800'
      };
    case 'good':
      return {
        bg: 'bg-sky-50',
        text: 'text-sky-700',
        border: 'border-sky-200',
        ring: 'stroke-sky-500',
        fill: 'bg-sky-500',
        badge: 'bg-sky-100 text-sky-800'
      };
    case 'developing':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        ring: 'stroke-amber-500',
        fill: 'bg-amber-500',
        badge: 'bg-amber-100 text-amber-800'
      };
    case 'need_practice':
      return {
        bg: 'bg-orange-50',
        text: 'text-orange-700',
        border: 'border-orange-200',
        ring: 'stroke-orange-500',
        fill: 'bg-orange-500',
        badge: 'bg-orange-100 text-orange-800'
      };
  }
};

const initialDefaultState: SpatialProfileState = {
  scores: {
    shapeRecognition: 88,
    spatialOrientation: 84,
    elementIdentification: 76,
    spatialTransformation: 68,
    threeDToTwoD: 62,
    twoDToThreeD: 72,
    mathematicalModeling: 80,
    problemSolving: 85
  },
  level: 3,
  levelTitle: 'Kỹ sư Không gian Cấp 3',
  xp: 1240,
  nextLevelXp: 1500,
  strengths: [
    'Nhận diện và phân biệt hình khối không gian rất nhanh',
    'Xác định chuẩn xác bán kính R và đường cao h',
    'Thao tác xoay và quan sát mô hình 3D linh hoạt'
  ],
  suggestedPractices: [
    {
      id: 'rec-unfold-cone',
      title: 'Khai triển mặt xung quanh Hình Nón',
      reason: 'Điểm 3D → 2D (62%) đang ở mức phát triển. Luyện khai triển thành hình quạt tròn để nắm chắc công thức Sxq = πRl.',
      targetMetric: 'threeDToTwoD',
      shape: 'cone',
      route: '/explore',
      mode: 'unfold',
      difficulty: 'Trung bình',
      actionLabel: 'Luyện khai triển ngay'
    },
    {
      id: 'rec-sphere-section',
      title: 'Mặt cắt và Thiết diện Hình Cầu',
      reason: 'Điểm Biến đổi hình học (68%) cần rèn luyện thêm qua việc quan sát giao tuyến mặt phẳng cắt mặt cầu qua tâm.',
      targetMetric: 'spatialTransformation',
      shape: 'sphere',
      route: '/explore',
      mode: 'cross-section',
      difficulty: 'Thử thách',
      actionLabel: 'Khám phá mặt cắt'
    },
    {
      id: 'rec-volume-lab',
      title: 'Định luật 1/3 — Bí ẩn thể tích Nón & Trụ',
      reason: 'Củng cố tư duy mô hình hóa toán học và mối quan hệ thực tế giữa nón và trụ.',
      targetMetric: 'problemSolving',
      shape: 'cone',
      route: '/explore',
      mode: 'volume_compare',
      difficulty: 'Cơ bản',
      actionLabel: 'Thực nghiệm 3D'
    }
  ],
  timeline: [
    {
      id: 'cyl-mastery',
      shape: 'cylinder',
      title: 'Hình Trụ: Khai triển & Sxq, Stp, V',
      status: 'completed',
      progressPercent: 100,
      unlockedAt: 'Đã hoàn thành',
      highlightSkill: 'Nắm vững HCN 2πr × h'
    },
    {
      id: 'cone-mastery',
      shape: 'cone',
      title: 'Hình Nón: Đường sinh l & Định luật 1/3',
      status: 'in_progress',
      progressPercent: 78,
      unlockedAt: 'Đang rèn luyện',
      highlightSkill: 'Khai triển hình quạt & V = 1/3 πr²h'
    },
    {
      id: 'sphere-mastery',
      shape: 'sphere',
      title: 'Hình Cầu: Mặt cắt qua tâm & S = 4πR²',
      status: 'in_progress',
      progressPercent: 55,
      unlockedAt: 'Đang tiến hành',
      highlightSkill: 'Thiết diện hình tròn lớn'
    }
  ],
  teacherReview: {
    summary: 'Em nhận diện hình khối rất tốt và tương tác mô hình 3D nhanh nhạy. Khả năng xác định bán kính R và đường cao h khá vững.',
    positiveNote: 'Tư duy quan sát trực quan tốt, phản xạ nhanh với các bài toán thể tích thực tế.',
    improvementArea: 'Cần chú ý thêm phần khai triển hình nón sang hình quạt tròn và các bài toán thiết diện hình cầu.',
    speechText: 'Thầy xem hồ sơ rồi nhé! Phần nhận diện hình của em đang rất ổn. Nhưng khai triển hình nón còn hơi "cứng". Mình cùng thử thêm 2 thử thách khai triển 3D sang 2D nữa nhé?'
  },
  dailyChallenge: {
    id: 'ch-cone-ratio',
    title: 'Thử thách Bí ẩn 1/3 của Thầy Hiếu',
    question: 'Không dùng công thức, em có dự đoán được cần bao nhiêu phễu nón để rót đầy cốc trụ cùng bán kính R và chiều cao h?',
    hint: 'Hãy quan sát thể tích không gian bị thu hẹp dần từ đáy lên đỉnh của hình nón.',
    targetShape: 'cone',
    route: '/explore',
    xpReward: 150,
    actionText: 'Thử thách ngay (+150 XP)'
  },
  recentEvents: [],
  updatedAt: Date.now()
};

// Adaptive Engine
function computeAdaptiveRecommendations(scores: Record<SpatialMetricKey, number>): SuggestedPractice[] {
  const recommendations: SuggestedPractice[] = [];

  if (scores.threeDToTwoD < 70) {
    recommendations.push({
      id: 'rec-unfold-cone',
      title: 'Khai triển mặt xung quanh Hình Nón',
      reason: `Chỉ số 3D → 2D đang đạt ${scores.threeDToTwoD}%. Luyện tập trải phẳng mặt nón thành hình quạt giúp hiểu sâu Sxq = πRl.`,
      targetMetric: 'threeDToTwoD',
      shape: 'cone',
      route: '/explore',
      mode: 'unfold',
      difficulty: 'Trung bình',
      actionLabel: 'Luyện khai triển ngay'
    });
  }

  if (scores.spatialTransformation < 70) {
    recommendations.push({
      id: 'rec-sphere-section',
      title: 'Mặt cắt và Thiết diện Hình Cầu',
      reason: `Chỉ số Biến đổi hình học đang đạt ${scores.spatialTransformation}%. Khám phá mặt cắt phẳng qua tâm khối cầu.`,
      targetMetric: 'spatialTransformation',
      shape: 'sphere',
      route: '/explore',
      mode: 'cross-section',
      difficulty: 'Thử thách',
      actionLabel: 'Khám phá mặt cắt'
    });
  }

  if (scores.elementIdentification < 70) {
    recommendations.push({
      id: 'rec-measure-rlh',
      title: 'Phân biệt R, h, l và trục quay',
      reason: `Chỉ số Nhận biết yếu tố (${scores.elementIdentification}%) cần củng cố qua việc đo trực quan trên mô hình 3D.`,
      targetMetric: 'elementIdentification',
      shape: 'cylinder',
      route: '/explore',
      mode: 'explore',
      difficulty: 'Cơ bản',
      actionLabel: 'Luyện đo đạc R, h'
    });
  }

  if (recommendations.length < 3) {
    recommendations.push({
      id: 'rec-volume-lab',
      title: 'Định luật 1/3 — Bí ẩn thể tích Nón & Trụ',
      reason: 'Củng cố tư duy mô hình hóa toán học và mối quan hệ thực tế giữa nón và trụ.',
      targetMetric: 'problemSolving',
      shape: 'cone',
      route: '/explore',
      mode: 'volume_compare',
      difficulty: 'Cơ bản',
      actionLabel: 'Thực nghiệm 3D'
    });
  }

  return recommendations.slice(0, 3);
}

interface SpatialProfileStore extends SpatialProfileState {
  recordEvent: (type: LearningEventType, metadata?: Record<string, any>) => void;
  updateScore: (metric: SpatialMetricKey, delta: number) => void;
  setMetricScore: (metric: SpatialMetricKey, score: number) => void;
  addXp: (amount: number) => void;
  resetProfile: () => void;
}

export const useSpatialProfileStore = create<SpatialProfileStore>((set, get) => {
  // Load saved state
  let initial = initialDefaultState;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      initial = { ...initialDefaultState, ...JSON.parse(saved) };
    }
  } catch {
    // fallback
  }

  return {
    ...initial,

    recordEvent: (type: LearningEventType, metadata?: Record<string, any>) => {
      const event: LearningEvent = {
        id: `ev-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        type,
        timestamp: Date.now(),
        metadata
      };

      const currentScores = { ...get().scores };
      let deltaXp = 0;

      // Event score impacts
      switch (type) {
        case 'ROTATE_MODEL':
        case 'ZOOM_MODEL':
          currentScores.spatialOrientation = Math.min(100, currentScores.spatialOrientation + 0.2);
          break;

        case 'SELECT_ELEMENT':
          currentScores.elementIdentification = Math.min(100, currentScores.elementIdentification + 0.5);
          break;

        case 'UNFOLD':
          currentScores.threeDToTwoD = Math.min(100, currentScores.threeDToTwoD + 1.5);
          deltaXp += 20;
          break;

        case 'SECTION':
          currentScores.spatialTransformation = Math.min(100, currentScores.spatialTransformation + 1.2);
          deltaXp += 20;
          break;

        case 'PREDICT':
          currentScores.problemSolving = Math.min(100, currentScores.problemSolving + 1.0);
          break;

        case 'CORRECT':
          currentScores.mathematicalModeling = Math.min(100, currentScores.mathematicalModeling + 2.0);
          currentScores.problemSolving = Math.min(100, currentScores.problemSolving + 1.5);
          deltaXp += 50;
          break;

        case 'ERROR':
          // Subtle encouragement without punitive drop
          currentScores.problemSolving = Math.max(30, currentScores.problemSolving - 0.2);
          break;

        case 'COMPLETE':
          currentScores.shapeRecognition = Math.min(100, currentScores.shapeRecognition + 2.0);
          currentScores.spatialTransformation = Math.min(100, currentScores.spatialTransformation + 2.0);
          deltaXp += 100;
          break;

        default:
          break;
      }

      // Round scores to integers
      for (const k of Object.keys(currentScores) as SpatialMetricKey[]) {
        currentScores[k] = Math.round(Math.min(100, Math.max(0, currentScores[k])));
      }

      const newRecs = computeAdaptiveRecommendations(currentScores);
      const newXp = get().xp + deltaXp;
      const newLevel = Math.floor(newXp / 500) + 1;
      const nextLevelXp = newLevel * 500;
      const levelTitle =
        newLevel >= 4
          ? 'Kiến trúc sư Không gian Đại tài'
          : newLevel === 3
          ? 'Kỹ sư Không gian Cấp 3'
          : 'Nhà Thám hiểm Hình học';

      const recentEvents = [event, ...get().recentEvents].slice(0, 25);

      const nextState = {
        scores: currentScores,
        xp: newXp,
        level: newLevel,
        levelTitle,
        nextLevelXp,
        suggestedPractices: newRecs,
        recentEvents,
        updatedAt: Date.now()
      };

      set(nextState);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...get(), ...nextState }));
      } catch {
        // ignore
      }
    },

    updateScore: (metric: SpatialMetricKey, delta: number) => {
      const currentScores = { ...get().scores };
      currentScores[metric] = Math.round(Math.min(100, Math.max(0, currentScores[metric] + delta)));
      const newRecs = computeAdaptiveRecommendations(currentScores);

      const nextState = {
        scores: currentScores,
        suggestedPractices: newRecs,
        updatedAt: Date.now()
      };
      set(nextState);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...get(), ...nextState }));
      } catch {
        // ignore
      }
    },

    setMetricScore: (metric: SpatialMetricKey, score: number) => {
      const currentScores = { ...get().scores };
      currentScores[metric] = Math.round(Math.min(100, Math.max(0, score)));
      const newRecs = computeAdaptiveRecommendations(currentScores);

      const nextState = {
        scores: currentScores,
        suggestedPractices: newRecs,
        updatedAt: Date.now()
      };
      set(nextState);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...get(), ...nextState }));
      } catch {
        // ignore
      }
    },

    addXp: (amount: number) => {
      const newXp = get().xp + amount;
      const newLevel = Math.floor(newXp / 500) + 1;
      const nextLevelXp = newLevel * 500;
      const levelTitle =
        newLevel >= 4
          ? 'Kiến trúc sư Không gian Đại tài'
          : newLevel === 3
          ? 'Kỹ sư Không gian Cấp 3'
          : 'Nhà Thám hiểm Hình học';

      const nextState = {
        xp: newXp,
        level: newLevel,
        levelTitle,
        nextLevelXp,
        updatedAt: Date.now()
      };
      set(nextState);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...get(), ...nextState }));
      } catch {
        // ignore
      }
    },

    resetProfile: () => {
      set(initialDefaultState);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  };
});
