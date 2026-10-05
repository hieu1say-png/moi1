/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - MOBILE BOTTOM NAVIGATION
 * Mobile-First fixed navigation bar (height 64-72px):
 * 1. 🏠 Trang chủ (/home)
 * 2. 📚 Bài học (/theory)
 * 3. 🌎 3D Lab (/explore)
 * 4. 🎮 Thử thách (/game)
 * 5. 👤 Cá nhân (/student-profile)
 * 
 * Human Interface Guidelines:
 * - Minimum touch target 44x44px per item
 * - Haptic-like active visual indicator
 * - Safe area inset support (iPhone notch / home indicator)
 * - Pixar soft 3D theme with high-contrast text for Grade 9 students
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { RouteId } from '../types';
import {
  Home,
  BookOpen,
  Box,
  Gamepad2,
  User,
  Sparkles
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  route: RouteId;
  badge?: string;
  color: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'Trang chủ',
    icon: Home,
    route: '/home',
    color: '#FF6B00'
  },
  {
    id: 'theory',
    label: 'Bài học',
    icon: BookOpen,
    route: '/theory',
    color: '#3B82F6'
  },
  {
    id: 'explore',
    label: '3D Lab',
    icon: Box,
    route: '/explore',
    badge: '3D',
    color: '#10B981'
  },
  {
    id: 'game',
    label: 'Thử thách',
    icon: Gamepad2,
    route: '/game',
    color: '#8B5CF6'
  },
  {
    id: 'profile',
    label: 'Cá nhân',
    icon: User,
    route: '/student-profile',
    color: '#F59E0B'
  }
];

export const BottomNavigation: React.FC = () => {
  const { currentRoute, navigateTo } = useApp();

  const isItemActive = (route: RouteId) => {
    if (route === '/home') {
      return currentRoute === '/home';
    }
    if (route === '/theory') {
      return currentRoute === '/theory' || currentRoute === '/cylinder' || currentRoute === '/cone' || currentRoute === '/sphere';
    }
    if (route === '/explore') {
      return currentRoute === '/explore';
    }
    if (route === '/game') {
      return currentRoute === '/game' || currentRoute === '/practice' || currentRoute === '/exam-prep';
    }
    if (route === '/student-profile') {
      return currentRoute === '/student-profile' || currentRoute === '/achievements';
    }
    return currentRoute === route;
  };

  return (
    <nav
      role="navigation"
      aria-label="Điều hướng chính di động"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#FFFDF8]/95 backdrop-blur-md border-t-2 border-[#EADFCB] shadow-[0_-8px_20px_rgba(0,0,0,0.06)] pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1.5"
    >
      <div className="max-w-md mx-auto px-3 flex items-center justify-between h-[64px]">
        {NAV_ITEMS.map((item) => {
          const active = isItemActive(item.route);
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigateTo(item.route)}
              className={`relative flex flex-col items-center justify-center flex-1 min-w-[56px] min-h-[48px] px-1 py-1 rounded-2xl transition-all duration-200 active:scale-95 touch-manipulation ${
                active
                  ? 'text-[#2D241E] font-bold'
                  : 'text-[#8C7E72] hover:text-[#4A3E36] font-medium'
              }`}
            >
              {/* Active Ambient Glow Pill */}
              {active && (
                <span
                  className="absolute inset-0 bg-[#F5EFE6] rounded-2xl -z-10 border border-[#DFCBB5] shadow-xs"
                  aria-hidden="true"
                />
              )}

              {/* Icon Container with Badge */}
              <div className="relative">
                <div
                  className={`p-1 rounded-xl transition-transform ${
                    active ? 'scale-110' : 'scale-100'
                  }`}
                  style={{ color: active ? item.color : undefined }}
                >
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>

                {item.badge && (
                  <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[9px] font-extrabold shadow-2xs leading-tight">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Text Label */}
              <span
                className={`text-[11px] leading-tight mt-0.5 tracking-tight ${
                  active ? 'font-bold' : 'font-medium'
                }`}
                style={{ color: active ? item.color : undefined }}
              >
                {item.label}
              </span>

              {/* Active Dot Indicator */}
              {active && (
                <span
                  className="w-1.5 h-1.5 rounded-full mt-0.5"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
