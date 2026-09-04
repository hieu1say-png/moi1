/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - KNOWLEDGE QUEST CHESTS MODAL (RƯƠNG KHO BÁU TRI THỨC)
 * Rewarding pedagogical milestones:
 * - Rương 01: Nhập môn Hình Trụ (Thực hành 3D + giải đúng 3 bài)
 * - Rương 02: Bậc Thầy Hình Nón (Khai triển nón + Thí nghiệm rót nước 1/3)
 * - Rương 03: Nhà Thám Hiểm Hình Cầu (Thiết diện mặt cầu + Ác-si-mét ngập nước)
 * - Rương 04: Thần Đồng STEM 5.0 (Xuất sắc bài tập thực tiễn + M1-M5 > 85)
 */

import React, { useState } from 'react';
import {
  X,
  Gift,
  Lock,
  Sparkles,
  Award,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  Coins
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export interface QuestChestsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChestItem {
  id: string;
  title: string;
  shape: string;
  requiredCondition: string;
  unlocked: boolean;
  rewardXp: number;
  badgeName: string;
  iconColor: string;
  description: string;
}

export const QuestChestsModal: React.FC<QuestChestsModalProps> = ({ isOpen, onClose }) => {
  const { userStats } = useApp();
  const [openedChests, setOpenedChests] = useState<string[]>(['chest-1']);

  if (!isOpen) return null;

  const chests: ChestItem[] = [
    {
      id: 'chest-1',
      title: 'Rương Nhập Môn Hình Trụ',
      shape: 'Hình Trụ',
      requiredCondition: 'Khám phá mô hình hình trụ và hoàn thành bài tập cơ bản.',
      unlocked: userStats.exploredShapes.includes('cylinder'),
      rewardXp: 150,
      badgeName: 'Huy hiệu Khối Trụ Vàng',
      iconColor: 'from-amber-400 to-orange-500',
      description: 'Mở khóa bí kíp tính nhanh diện tích toàn phần Stp = 2πrh + 2πr² và công thức bảo toàn thể tích.'
    },
    {
      id: 'chest-2',
      title: 'Rương Bậc Thầy Hình Nón',
      shape: 'Hình Nón',
      requiredCondition: 'Khai triển quạt nón và thực hiện thí nghiệm rót nước 1/3.',
      unlocked: userStats.exploredShapes.includes('cone'),
      rewardXp: 200,
      badgeName: 'Huy hiệu Nón Kỳ Diệu',
      iconColor: 'from-blue-400 to-indigo-600',
      description: 'Nắm vững mối quan hệ đường sinh l² = r² + h² và bản chất tỷ lệ thể tích 1/3.'
    },
    {
      id: 'chest-3',
      title: 'Rương Khám Phá Mặt Cầu',
      shape: 'Hình Cầu',
      requiredCondition: 'Quan sát thiết diện mặt phẳng qua tâm và thể tích Ác-si-mét.',
      unlocked: userStats.exploredShapes.includes('sphere'),
      rewardXp: 250,
      badgeName: 'Huy hiệu Địa Cầu Không Gian',
      iconColor: 'from-emerald-400 to-teal-600',
      description: 'Công thức mặt cầu S = 4πr² và thể tích khối cầu V = 4/3 πr³.'
    },
    {
      id: 'chest-4',
      title: 'Rương Đại Hiệp Sĩ STEM 5.0',
      shape: 'Tổng hợp',
      requiredCondition: 'Tích lũy trên 500 XP và hoàn thành chuỗi bài tập thực tế.',
      unlocked: userStats.xp >= 500,
      rewardXp: 500,
      badgeName: 'Vương Miện Trí Tuệ STEM 9',
      iconColor: 'from-purple-500 to-pink-600',
      description: 'Chứng chỉ thành thạo 5 thành phần năng lực toán học M1 - M5 từ ThS. Trần Ngọc Hiếu.'
    }
  ];

  const handleOpenChest = (chestId: string) => {
    if (!openedChests.includes(chestId)) {
      setOpenedChests([...openedChests, chestId]);
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in font-sans">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-amber-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-inner">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold leading-tight">
                Rương Kho Báu Tri Thức STEM 5.0
              </h3>
              <p className="text-xs text-amber-100">
                Chinh phục các chặng bài tập để mở khóa phần thưởng và bí kíp hình học
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chests List */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {chests.map((chest) => {
            const isOpened = openedChests.includes(chest.id);

            return (
              <div
                key={chest.id}
                className={`p-4 rounded-2xl border transition-all ${
                  chest.unlocked
                    ? 'bg-amber-50/40 border-amber-200 shadow-sm hover:border-amber-400'
                    : 'bg-slate-50 border-slate-200 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${chest.iconColor} flex items-center justify-center text-white shadow-md shrink-0`}
                    >
                      {chest.unlocked ? (
                        <Gift className="w-6 h-6" />
                      ) : (
                        <Lock className="w-5 h-5 opacity-80" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{chest.title}</h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          {chest.shape}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-1 text-xs leading-relaxed">
                        {chest.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-[11px] font-medium text-slate-500">
                        <span className="flex items-center gap-1 text-amber-700 font-bold">
                          <Coins className="w-3.5 h-3.5 text-amber-500" />
                          <span>+{chest.rewardXp} XP</span>
                        </span>
                        <span>•</span>
                        <span>{chest.badgeName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 pt-1">
                    {chest.unlocked ? (
                      isOpened ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Đã mở</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleOpenChest(chest.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xs shadow-md hover:brightness-105 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Mở Rương</span>
                        </button>
                      )
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-200 text-slate-600 text-[11px] font-semibold">
                        <Lock className="w-3 h-3" />
                        <span>Chưa mở khóa</span>
                      </span>
                    )}
                  </div>
                </div>

                {!chest.unlocked && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Điều kiện: {chest.requiredCondition}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
