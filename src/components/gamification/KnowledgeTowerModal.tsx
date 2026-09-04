/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - KNOWLEDGE TOWER MODAL (THÁP TRI THỨC TOÁN HỌC 9)
 * Visual progression tower mapping student achievements from Novice to STEM 5.0 Master.
 */

import React from 'react';
import {
  X,
  Castle,
  Crown,
  Sparkles,
  Trophy,
  CheckCircle2,
  Lock,
  ArrowUp,
  Star,
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface KnowledgeTowerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TowerFloor {
  level: number;
  title: string;
  minXp: number;
  perks: string[];
  color: string;
  badge: string;
}

export const KnowledgeTowerModal: React.FC<KnowledgeTowerModalProps> = ({ isOpen, onClose }) => {
  const { userStats } = useApp();

  if (!isOpen) return null;

  const currentXp = userStats.xp || 420;

  const floors: TowerFloor[] = [
    {
      level: 5,
      title: 'Tầng 5: Đại Sư Phụ STEM 5.0',
      minXp: 1500,
      perks: [
        'Nhận huy hiệu vinh dự ThS. Trần Ngọc Hiếu',
        'Mở khóa toàn bộ đề thi Tuyển sinh 10 Chuyên',
        'Cố vấn giải toán cho cộng đồng học sinh'
      ],
      color: 'from-amber-400 to-yellow-600',
      badge: 'Bậc Thầy Tối Cao'
    },
    {
      level: 4,
      title: 'Tầng 4: Hiệp Sĩ Không Gian 9',
      minXp: 900,
      perks: [
        'Thành thạo thí nghiệm Ác-si-mét & rót nước 1/3',
        'Đạt chuẩn 5 năng lực M1 - M5 trên 85 điểm',
        'Mở khóa danh hiệu Hiệp Sĩ trên bảng xếp hạng'
      ],
      color: 'from-purple-500 to-indigo-600',
      badge: 'Hiệp Sĩ Không Gian'
    },
    {
      level: 3,
      title: 'Tầng 3: Chiến Binh Công Thức',
      minXp: 500,
      perks: [
        'Khai triển thành thạo mặt xung quanh nón và trụ',
        'Giải đúng 100% các câu hỏi trắc nghiệm nhận biết',
        'Mở khóa giao diện chế độ Tập trung Pro'
      ],
      color: 'from-blue-500 to-cyan-600',
      badge: 'Chiến Binh Trực Quan'
    },
    {
      level: 2,
      title: 'Tầng 2: Thám Hiểm Không Gian',
      minXp: 200,
      perks: [
        'Khám phá đầy đủ 3 khối Trụ - Nón - Cầu 3D',
        'Nhận dạng chính xác trục xoay và mặt phẳng cắt',
        'Mở khóa rương kho báu thứ 2'
      ],
      color: 'from-emerald-500 to-teal-600',
      badge: 'Thám Hiểm Viên'
    },
    {
      level: 1,
      title: 'Tầng 1: Tập Sự Hình Học',
      minXp: 0,
      perks: [
        'Làm quen với phòng lab 3D và các thanh trượt r, h',
        'Học công thức cơ bản và diện tích đáy hình tròn'
      ],
      color: 'from-slate-500 to-slate-700',
      badge: 'Tập Sự'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in font-sans">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-indigo-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-800 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-inner">
              <Castle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold leading-tight">
                Tháp Tri Thức Toán Học 9
              </h3>
              <p className="text-xs text-indigo-100">
                Leo tháp tích lũy XP • Chinh phục đỉnh cao hình học không gian
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current XP Progress Banner */}
        <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex items-center justify-between gap-4 text-xs shrink-0">
          <div className="flex items-center gap-2 text-indigo-900 font-bold">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Điểm tích lũy hiện tại: <strong className="text-amber-600 text-sm">{currentXp} XP</strong></span>
          </div>
          <div className="text-[11px] text-slate-600">
            Cần thêm <strong className="text-indigo-700">{Math.max(0, 500 - currentXp)} XP</strong> để đạt Tầng 3
          </div>
        </div>

        {/* Tower Floors list */}
        <div className="p-6 overflow-y-auto space-y-3.5 text-xs">
          {floors.map((floor) => {
            const isReached = currentXp >= floor.minXp;

            return (
              <div
                key={floor.level}
                className={`p-4 rounded-2xl border transition-all ${
                  isReached
                    ? 'bg-gradient-to-r from-indigo-50/50 to-white border-indigo-200 shadow-sm'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg bg-gradient-to-br ${floor.color} flex items-center justify-center text-white text-xs font-black shadow-xs`}
                    >
                      {floor.level}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{floor.title}</h4>
                      <span className="text-[10px] text-slate-500">Yêu cầu: {floor.minXp} XP</span>
                    </div>
                  </div>

                  {isReached ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Đã đạt</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-200 text-slate-600 text-[10px] font-semibold">
                      <Lock className="w-3 h-3" />
                      <span>Đang khóa</span>
                    </span>
                  )}
                </div>

                <ul className="space-y-1 pl-9 text-[11px] text-slate-600">
                  {floor.perks.map((perk, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
