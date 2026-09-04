/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { GeometryDataService } from '../data';
import { Card } from '../components/common/Card';
import { Badge as UiBadge } from '../components/common/Badge';
import { Award, Sparkles, Flame, CheckCircle2, Lock, Star, Target, Trophy, Compass, Globe, Crown } from 'lucide-react';

export const AchievementsView: React.FC = () => {
  const { userStats } = useApp();

  const achievements = GeometryDataService.getAchievements();
  const badges = GeometryDataService.getBadges();
  const challenges = GeometryDataService.getChallenges();

  const renderBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-amber-600" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-green-600" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-purple-600" />;
      case 'Target':
        return <Target className="w-6 h-6 text-blue-600" />;
      default:
        return <Award className="w-6 h-6 text-amber-600" />;
    }
  };

  return (
    <div id="view-achievements" className="space-y-6 w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Bảng Vàng Thành Tích & Huy Hiệu
            </h2>
            <p className="text-xs text-slate-500">Ghi nhận tiến trình học tập Hình học không gian Lớp 9</p>
          </div>
        </div>

        <UiBadge variant="achievement" size="md">
          <Trophy className="w-4 h-4 mr-1 text-amber-600" />
          Cấp Độ {userStats.level}
        </UiBadge>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total XP */}
        <Card variant="achievement" className="p-4 bg-white">
          <div className="flex items-center justify-between text-amber-700 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Tổng Điểm XP</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-950 font-mono">{userStats.xp}</div>
          <div className="text-[11px] text-slate-500 mt-1">Cần {500 - (userStats.xp % 500)} XP lên cấp tiếp theo</div>
        </Card>

        {/* Streak */}
        <Card variant="cone" className="p-4 bg-white">
          <div className="flex items-center justify-between text-orange-600 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Chuỗi Học Tập</span>
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
          </div>
          <div className="text-2xl font-black text-orange-950 font-mono">{userStats.streakDays} Ngày</div>
          <div className="text-[11px] text-slate-500 mt-1">Học đều đặn mỗi ngày 🔥</div>
        </Card>

        {/* Completed modules */}
        <Card variant="sphere" className="p-4 bg-white">
          <div className="flex items-center justify-between text-green-600 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Lý Thuyết & 3D</span>
            <Target className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-2xl font-black text-green-950 font-mono">
            {userStats.completedTheories.length + userStats.exploredShapes.length}/6
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Chủ đề đã hoàn thành</div>
        </Card>

        {/* Accuracy */}
        <Card variant="cylinder" className="p-4 bg-white">
          <div className="flex items-center justify-between text-blue-600 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Độ Chính Xác</span>
            <Star className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-blue-950 font-mono">{userStats.accuracy}%</div>
          <div className="text-[11px] text-slate-500 mt-1">Bài tập rèn luyện</div>
        </Card>
      </div>

      {/* Badges Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Bộ Sưu Tập Huy Hiệu Không Gian ({badges.length})</h3>
          <span className="text-xs text-slate-500">Mở khóa theo các mốc học tập</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge) => {
            let isUnlocked = false;
            let currentProgress = 0;
            let maxProgress = 1;

            if (badge.id === 'badge-explorer') {
              currentProgress = userStats.exploredShapes.length;
              maxProgress = 3;
              isUnlocked = currentProgress >= 3;
            } else if (badge.id === 'badge-cyl-expert') {
              const hasTheory = userStats.completedTheories.includes('cylinder') ? 1 : 0;
              const hasPractice = userStats.completedPractices.some((p) => p.includes('cyl')) ? 1 : 0;
              currentProgress = hasTheory + hasPractice;
              maxProgress = 2;
              isUnlocked = currentProgress >= 2;
            } else if (badge.id === 'badge-cone-expert') {
              const hasTheory = userStats.completedTheories.includes('cone') ? 1 : 0;
              const hasPractice = userStats.completedPractices.some((p) => p.includes('cone')) ? 1 : 0;
              currentProgress = hasTheory + hasPractice;
              maxProgress = 2;
              isUnlocked = currentProgress >= 2;
            } else if (badge.id === 'badge-sph-expert') {
              const hasTheory = userStats.completedTheories.includes('sphere') ? 1 : 0;
              const hasPractice = userStats.completedPractices.some((p) => p.includes('sph')) ? 1 : 0;
              currentProgress = hasTheory + hasPractice;
              maxProgress = 2;
              isUnlocked = currentProgress >= 2;
            } else if (badge.id === 'badge-master') {
              currentProgress = Math.min(3, userStats.completedTheories.length);
              maxProgress = 3;
              isUnlocked = userStats.completedTheories.length >= 3 && userStats.completedPractices.length >= 3;
            } else {
              isUnlocked = userStats.xp >= 300;
            }

            return (
              <div
                key={badge.id}
                id={`badge-card-${badge.id}`}
                className={`
                  p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between bg-white
                  ${
                    isUnlocked
                      ? 'border-amber-200 shadow-2xs hover:shadow-xs'
                      : 'border-slate-200 opacity-60 bg-slate-50/50'
                  }
                `}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`
                      w-12 h-12 rounded-2xl flex items-center justify-center shrink-0
                      ${
                        isUnlocked
                          ? 'bg-amber-100/70 border border-amber-200 shadow-xs'
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }
                    `}
                  >
                    {isUnlocked ? renderBadgeIcon(badge.icon) : <Lock className="w-5 h-5 text-slate-400" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{badge.title}</h4>
                      <UiBadge variant="warning" size="xs">
                        {badge.tier}
                      </UiBadge>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{badge.description}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">
                    {badge.criteria} ({currentProgress}/{maxProgress})
                  </span>
                  {isUnlocked ? (
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đã Mở Khóa
                    </span>
                  ) : (
                    <span className="font-medium text-slate-400">Chưa Đạt</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Challenges & Quests */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Thử Thách & Nhiệm Vụ Đặc Biệt ({challenges.length})</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((ch) => (
            <Card key={ch.id} variant="default" className="p-5 space-y-3 bg-white">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">{ch.title}</span>
                <UiBadge variant="warning" size="xs">
                  +{ch.rewardXp} XP
                </UiBadge>
              </div>
              <p className="text-xs text-slate-600">{ch.description}</p>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span>Thời gian: {ch.timeLimitSeconds}s</span>
                <span className="font-medium text-orange-600">Độ khó: {ch.difficulty}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
