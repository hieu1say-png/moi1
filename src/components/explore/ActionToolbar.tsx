/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  RotateCcw,
  RotateCw,
  Play,
  Pause,
  Compass,
  CheckCircle2,
  FoldHorizontal,
  Droplets,
  Box,
  Sparkles,
  HelpCircle,
  Trophy,
  Layers
} from 'lucide-react';
import { Button } from '../common/Button';
import { ExplorationModeType } from './3d/CylinderModel';
import { ShapeType } from '../../types';

export interface ActionToolbarProps {
  shape?: ShapeType;
  viewMode: 'solid' | 'wireframe' | 'cross-section';
  onViewModeChange: (mode: 'solid' | 'wireframe' | 'cross-section') => void;
  showAxes: boolean;
  onToggleAxes: () => void;
  isAutoRotating: boolean;
  onToggleAutoRotate: () => void;
  onSpin360?: () => void;
  isSpinning?: boolean;
  onResetReplay?: () => void;
  onResetView: () => void;
  isExplored: boolean;
  onSaveExploration: () => void;
  explorationMode?: ExplorationModeType;
  onExplorationModeChange?: (mode: ExplorationModeType) => void;
  className?: string;
}

export const ActionToolbar: React.FC<ActionToolbarProps> = ({
  shape = 'cylinder',
  viewMode,
  onViewModeChange,
  showAxes,
  onToggleAxes,
  isAutoRotating,
  onToggleAutoRotate,
  onSpin360,
  isSpinning = false,
  onResetReplay,
  onResetView,
  isExplored,
  onSaveExploration,
  explorationMode = 'explore',
  onExplorationModeChange,
  className = ''
}) => {
  const cylinderModes: Array<{
    id: ExplorationModeType;
    label: string;
    icon: React.ReactNode;
    color: string;
    desc: string;
  }> = [
    {
      id: 'explore',
      label: 'Khám phá 3D',
      icon: <Box className="w-3.5 h-3.5" />,
      color: 'from-blue-600 to-indigo-600',
      desc: 'Mô hình 3D tương tác & Giải phẫu'
    },
    {
      id: 'formation',
      label: 'Sự tạo thành',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      color: 'from-cyan-600 to-blue-600',
      desc: 'Quay HCN O\'ABO quanh trục OO\' 360°'
    },
    {
      id: 'net',
      label: 'Khai triển',
      icon: <FoldHorizontal className="w-3.5 h-3.5" />,
      color: 'from-indigo-600 to-purple-600',
      desc: 'Trải phẳng mặt XQ (2πrh) & 2 đáy tròn'
    },
    {
      id: 'liquid',
      label: 'Rót nước',
      icon: <Droplets className="w-3.5 h-3.5" />,
      color: 'from-cyan-500 to-blue-600',
      desc: 'Mô phỏng đổ nước & Mực nước dâng V = πr²h'
    },
    {
      id: 'challenge',
      label: 'Thử thách',
      icon: <Trophy className="w-3.5 h-3.5" />,
      color: 'from-amber-500 to-orange-600',
      desc: 'Bài toán thực tế & Đổ nước kiểm chứng'
    }
  ];

  const sphereModes: Array<{
    id: ExplorationModeType;
    label: string;
    icon: React.ReactNode;
    color: string;
    desc: string;
  }> = [
    {
      id: 'explore',
      label: 'Khám phá 3D',
      icon: <Box className="w-3.5 h-3.5" />,
      color: 'from-emerald-600 to-teal-600',
      desc: 'Mô hình 3D tương tác & Giải phẫu hình cầu'
    },
    {
      id: 'formation',
      label: 'Sự tạo thành',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      color: 'from-amber-600 to-emerald-600',
      desc: 'Quay nửa đường tròn quanh đường kính 360°'
    },
    {
      id: 'section',
      label: 'Lát cắt',
      icon: <Layers className="w-3.5 h-3.5" />,
      color: 'from-indigo-600 to-blue-600',
      desc: 'Mặt phẳng cắt & Bán kính thiết diện ρ = √(R² - d²)'
    },
    {
      id: 'misconception',
      label: 'd = 2R?',
      icon: <HelpCircle className="w-3.5 h-3.5" />,
      color: 'from-rose-600 to-amber-600',
      desc: 'Giải mã ngộ nhận: So sánh đường kính & bán kính'
    },
    {
      id: 'volume_compare',
      label: 'So sánh Thể tích',
      icon: <Compass className="w-3.5 h-3.5" />,
      color: 'from-purple-600 to-pink-600',
      desc: 'Thí nghiệm: V_cầu = 2/3 V_trụ ngoại tiếp'
    },
    {
      id: 'challenge',
      label: 'Thử thách',
      icon: <Trophy className="w-3.5 h-3.5" />,
      color: 'from-amber-500 to-orange-600',
      desc: 'Thử thách trắc nghiệm & tương tác Toán 9'
    }
  ];

  const coneModes: Array<{
    id: ExplorationModeType;
    label: string;
    icon: React.ReactNode;
    color: string;
    desc: string;
  }> = [
    {
      id: 'explore',
      label: 'Khám phá 3D',
      icon: <Box className="w-3.5 h-3.5" />,
      color: 'from-orange-600 to-amber-600',
      desc: 'Mô hình 3D tương tác & Các yếu tố hình học'
    },
    {
      id: 'formation',
      label: 'Sự tạo thành',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      color: 'from-amber-600 to-orange-600',
      desc: 'Quay tam giác vuông SOA quanh trục SO 360°'
    },
    {
      id: 'liquid',
      label: 'Mode 3: Thực tế',
      icon: <Droplets className="w-3.5 h-3.5" />,
      color: 'from-orange-500 to-rose-600',
      desc: 'Nghịch lý 1/3 — Bí ẩn thể tích: Thí nghiệm đổ nước Phễu Nón → Cốc Trụ'
    }
  ];

  const activeModes = shape === 'cylinder' ? cylinderModes : shape === 'sphere' ? sphereModes : coneModes;

  return (
    <div
      id="explore-action-toolbar"
      className={`bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 p-2.5 sm:p-3 shadow-sm flex flex-col gap-2.5 text-gray-800 z-10 ${className}`}
    >
      {/* 1. Top Row: Interactive Exploration Mode Switcher Tabs for Cylinder & Sphere */}
      {activeModes.length > 0 && onExplorationModeChange && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] uppercase font-bold text-gray-500 shrink-0 px-1 font-mono hidden md:inline">
            Chế độ:
          </span>
          <div className="flex items-center gap-1 bg-gray-100/90 p-1 rounded-xl border border-gray-200 shrink-0">
            {activeModes.map((mode) => {
              const isActive = explorationMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  id={`mode-tab-${mode.id}`}
                  onClick={() => onExplorationModeChange(mode.id)}
                  className={`px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer min-h-[34px] touch-manipulation flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-sm ring-1 ring-orange-300 scale-[1.02]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                  }`}
                  title={mode.desc}
                >
                  {mode.icon}
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Bottom Row: 3D View Controls & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-gray-100">
        {/* Left: View Mode Toggle Group */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200">
          <button
            type="button"
            id="btn-viewmode-solid"
            onClick={() => onViewModeChange('solid')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer min-h-[32px] touch-manipulation ${
              viewMode === 'solid'
                ? 'bg-orange-500 text-white shadow-xs font-bold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
            }`}
          >
            Khối đặc
          </button>
          <button
            type="button"
            id="btn-viewmode-wireframe"
            onClick={() => onViewModeChange('wireframe')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer min-h-[32px] touch-manipulation ${
              viewMode === 'wireframe'
                ? 'bg-orange-500 text-white shadow-xs font-bold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
            }`}
          >
            Khung dây
          </button>
          <button
            type="button"
            id="btn-viewmode-cross-section"
            onClick={() => onViewModeChange('cross-section')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer min-h-[32px] touch-manipulation ${
              viewMode === 'cross-section'
                ? 'bg-orange-500 text-white shadow-xs font-bold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
            }`}
          >
            Thiết diện
          </button>
        </div>

        {/* Middle: Animation Controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Nút [QUAY]: 0° → 360° */}
          {onSpin360 && (
            <button
              type="button"
              id="toolbar-btn-spin"
              onClick={onSpin360}
              disabled={isSpinning}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer min-h-[34px] touch-manipulation flex items-center gap-1.5 ${
                isSpinning
                  ? 'bg-orange-500 text-white border-orange-400 shadow-sm ring-2 ring-orange-200'
                  : 'bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700 hover:border-orange-300'
              }`}
              title="Quay 360°"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>QUAY 360°</span>
            </button>
          )}

          {/* Nút [TỰ XOAY] / [DỪNG XOAY] */}
          <button
            type="button"
            id="toolbar-btn-autorotate"
            onClick={onToggleAutoRotate}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer min-h-[34px] touch-manipulation flex items-center gap-1.5 ${
              isAutoRotating
                ? 'bg-amber-100 border-amber-300 text-amber-800'
                : 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-700'
            }`}
            title={isAutoRotating ? 'Dừng tự xoay camera' : 'Bật tự xoay camera'}
          >
            {isAutoRotating ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current text-amber-700" />
                <span>DỪNG XOAY</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current text-gray-600" />
                <span>TỰ XOAY</span>
              </>
            )}
          </button>

          {/* Nút [CHƠI LẠI] */}
          <button
            type="button"
            id="toolbar-btn-replay"
            onClick={onResetReplay || onResetView}
            className="px-3 py-1.5 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl border border-gray-200 transition-all cursor-pointer min-h-[34px] touch-manipulation flex items-center gap-1.5"
            title="Chơi lại và đặt lại mô hình"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
            <span>CHƠI LẠI</span>
          </button>

          {/* Trục 3D */}
          <button
            type="button"
            id="toolbar-btn-axes"
            onClick={onToggleAxes}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer min-h-[34px] touch-manipulation flex items-center gap-1.5 ${
              showAxes
                ? 'bg-orange-100 border-orange-300 text-orange-800'
                : 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-600'
            }`}
            title="Bật/tắt hệ trục 3D"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Trục 3D</span>
          </button>
        </div>

        {/* Right: Save Exploration (+30 XP) Button */}
        <div>
          <Button
            id="btn-save-exploration"
            variant={isExplored ? 'secondary' : 'primary'}
            size="sm"
            shape="pill"
            onClick={onSaveExploration}
            leftIcon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            className="font-bold min-h-[36px] px-3.5 bg-orange-500 hover:bg-orange-600 text-white"
          >
            {isExplored ? 'Đã lưu (+30 XP)' : 'Lưu (+30 XP)'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActionToolbar;
