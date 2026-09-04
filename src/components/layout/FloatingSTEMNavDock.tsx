/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * FLOATING STEM NAVIGATION DOCK (GLASSMORPHISM & SPOTLIGHT MOTION)
 * - Fixed centered bottom dock (fixed bottom-4 inset-x-0 z-40)
 * - Ultra-smooth spring spotlight indicator (#16A34A) with layoutId
 * - Integrated Quick Spotlight Search launcher [ 🔍 Tìm kiếm STEM... ] (⌘K)
 * - 5 Core STEM Horizons:
 *   1. 🏠 Trang chủ (/home)
 *   2. 🔬 3D Lab (/explore)
 *   3. 📚 Lý thuyết (/theory)
 *   4. ✍️ Luyện thi 10 (/practice)
 *   5. 🥫 Xưởng STEM (/real-world)
 */

import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { RouteId } from '../../types';
import {
  Home,
  Compass,
  BookOpen,
  CheckSquare,
  Globe,
  Search,
  Sparkles,
  Command
} from 'lucide-react';

interface NavDockItem {
  id: string;
  route: RouteId;
  label: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
  activeRoutes: RouteId[];
}

const DOCK_ITEMS: NavDockItem[] = [
  {
    id: 'home',
    route: '/home',
    label: 'Trang chủ',
    icon: Home,
    activeRoutes: ['/home']
  },
  {
    id: 'explore',
    route: '/explore',
    label: '3D Lab',
    badge: '360°',
    icon: Compass,
    activeRoutes: ['/explore']
  },
  {
    id: 'theory',
    route: '/theory',
    label: 'Lý thuyết',
    badge: 'SGK',
    icon: BookOpen,
    activeRoutes: ['/theory', '/cylinder', '/cone', '/sphere']
  },
  {
    id: 'practice',
    route: '/practice',
    label: 'Luyện thi 10',
    badge: 'Radar',
    icon: CheckSquare,
    activeRoutes: ['/practice', '/exam-prep']
  },
  {
    id: 'real-world',
    route: '/real-world',
    label: 'Xưởng STEM',
    badge: '330ml',
    icon: Globe,
    activeRoutes: ['/real-world']
  }
];

export const FloatingSTEMNavDock: React.FC = () => {
  const { currentRoute, navigateTo, setSearchOpen } = useApp();

  // Determine which dock item is active
  const activeItem = DOCK_ITEMS.find((item) =>
    item.activeRoutes.includes(currentRoute)
  );

  return (
    <div
      id="floating-stem-nav-dock"
      className="fixed bottom-3 sm:bottom-4 inset-x-0 z-40 flex justify-center pointer-events-none px-3 select-none"
    >
      <nav
        aria-label="Thanh điều hướng nổi STEM"
        className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-2xl bg-white/92 backdrop-blur-xl border border-[#E2EADF] shadow-[0_12px_32px_-6px_rgba(15,41,30,0.18),0_4px_12px_-2px_rgba(15,41,30,0.08)] transition-all duration-200"
      >
        {/* Spotlight Quick Search Launcher */}
        <button
          id="dock-spotlight-search-btn"
          type="button"
          onClick={() => setSearchOpen(true)}
          className="group relative flex items-center gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl bg-[#F4F8F3] hover:bg-[#EAF3E8] border border-[#DCE8D8] text-[#345241] text-xs font-semibold transition-all duration-150 cursor-pointer active:scale-95"
          title="Tìm kiếm nhanh công thức, bài tập, video bài giảng (Ctrl+K hoặc ⌘K)"
          aria-label="Mở tìm kiếm nhanh STEM"
        >
          <Search className="w-4 h-4 text-[#16A34A] group-hover:scale-110 transition-transform" />
          <span className="hidden md:inline text-xs font-medium text-[#466654]">
            Tìm kiếm STEM...
          </span>
          <span className="hidden lg:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white border border-[#D0E0CC] text-[10px] text-[#5C7E6A] font-mono shadow-2xs">
            <Command className="w-2.5 h-2.5" />K
          </span>
        </button>

        {/* Divider */}
        <div className="h-6 w-[1px] bg-[#E2EADF] mx-0.5" />

        {/* 5 Core Navigation Items with Sliding Spotlight */}
        <div className="flex items-center gap-1 sm:gap-1.5 relative">
          {DOCK_ITEMS.map((item) => {
            const isActive = activeItem?.id === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                id={`dock-tab-${item.id}`}
                type="button"
                onClick={() => navigateTo(item.route)}
                className={`relative flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer min-h-[42px] sm:min-h-[44px] ${
                  isActive
                    ? 'text-white'
                    : 'text-[#4F6859] hover:text-[#0F291E] hover:bg-[#F3F7F2]'
                }`}
              >
                {/* Active Sliding Spotlight Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeDockSpotlight"
                    className="absolute inset-0 rounded-xl bg-[#16A34A] shadow-[0_4px_14px_rgba(22,163,74,0.38)]"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30
                    }}
                  >
                    {/* Top Ambient Glow / Spotlight beam */}
                    <span className="absolute -top-[1.5px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#86EFAC] rounded-full blur-[1px]" />
                  </motion.div>
                )}

                {/* Content */}
                <div className="relative z-10 flex items-center gap-1.5">
                  <Icon
                    className={`w-4 h-4 transition-transform duration-150 ${
                      isActive ? 'scale-110 text-white' : 'text-[#648471]'
                    }`}
                  />
                  <span className="hidden sm:inline font-bold tracking-tight">
                    {item.label}
                  </span>

                  {/* Tiny badge on larger screens */}
                  {item.badge && !isActive && (
                    <span className="hidden xl:inline-block px-1 py-0.2 rounded text-[9px] font-semibold bg-[#EBF3E8] text-[#2F6B45]">
                      {item.badge}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
