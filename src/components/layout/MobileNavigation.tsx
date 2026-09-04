/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - MOBILE BOTTOM NAVIGATION (WARM IVORY THEME)
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { RouteId } from '../../types';
import {
  Home,
  BookOpen,
  Compass,
  CheckSquare,
  MoreHorizontal,
  Globe,
  Award,
  Settings,
  Bot,
  GraduationCap,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavTab {
  route: RouteId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PRIMARY_TABS: NavTab[] = [
  { route: '/home', label: 'Trang chủ', icon: Home },
  { route: '/theory', label: 'Lý thuyết', icon: BookOpen },
  { route: '/explore', label: 'Khám phá 3D', icon: Compass },
  { route: '/practice', label: 'Luyện tập', icon: CheckSquare }
];

const BASE_MORE_TABS: NavTab[] = [
  { route: '/exam-prep', label: 'Ôn thi vào 10', icon: GraduationCap },
  { route: '/real-world', label: 'Ứng dụng thực tế', icon: Globe },
  { route: '/achievements', label: 'Thành tích', icon: Award },
  { route: '/ai', label: 'Gia sư AI Toán 9', icon: Bot }
];

export const MobileNavigation: React.FC = () => {
  const { currentRoute, navigateTo } = useApp();
  const { isTeacher, isStudentPreview } = useAuth();
  const [showMoreDrawer, setShowMoreDrawer] = useState(false);

  const showTeacherTabs = isTeacher && !isStudentPreview;

  const moreTabs: NavTab[] = [
    ...BASE_MORE_TABS,
    ...(showTeacherTabs
      ? ([
          { route: '/teacher-dashboard', label: 'Teacher Dashboard', icon: GraduationCap },
          { route: '/settings', label: 'Cài đặt giáo viên', icon: Settings }
        ] as NavTab[])
      : ([
          { route: '/student-profile', label: 'Tài khoản của em', icon: GraduationCap }
        ] as NavTab[]))
  ];

  const isMoreActive = moreTabs.some((tab) => tab.route === currentRoute);

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav
        id="mobile-bottom-nav"
        aria-label="Thanh điều hướng di động"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-xs"
      >
        {PRIMARY_TABS.map((tab) => {
          const isActive = currentRoute === tab.route;
          const Icon = tab.icon;

          return (
            <button
              key={tab.route}
              id={`mobile-tab-${tab.route.replace('/', '')}`}
              onClick={() => {
                setShowMoreDrawer(false);
                navigateTo(tab.route);
              }}
              className={`flex flex-col items-center justify-center flex-1 min-h-[44px] py-1 px-1 rounded-xl transition-all duration-150 cursor-pointer ${
                isActive ? 'text-orange-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={`w-5 h-5 transition-transform duration-150 ${isActive ? 'scale-110' : ''}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full" />
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight truncate font-medium">
                {tab.label}
              </span>
            </button>
          );
        })}

        {/* Compact 'More' Menu Button */}
        <button
          id="mobile-tab-more"
          onClick={() => setShowMoreDrawer(!showMoreDrawer)}
          className={`flex flex-col items-center justify-center flex-1 min-h-[44px] py-1 px-1 rounded-xl transition-all duration-150 cursor-pointer ${
            isMoreActive || showMoreDrawer
              ? 'text-orange-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <MoreHorizontal className="w-5 h-5" />
            {isMoreActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-medium">Thêm</span>
        </button>
      </nav>

      {/* Compact Drawer for additional routes */}
      <AnimatePresence>
        {showMoreDrawer && (
          <div className="lg:hidden fixed inset-0 z-40 flex flex-col justify-end" id="mobile-more-drawer">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMoreDrawer(false)}
              className="fixed inset-0 bg-[#3A302B]/40 backdrop-blur-xs"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="relative z-50 bg-[#FFFDF8] rounded-t-3xl p-5 pb-8 shadow-2xl border-t border-[#E5DCCF] space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DCCF]">
                <div>
                  <h3 className="font-serif text-base font-bold text-[#3A302B]">Danh Mục Bổ Trợ</h3>
                  <p className="text-xs text-[#766A61]">Khám phá các chức năng chuyên sâu</p>
                </div>
                <button
                  onClick={() => setShowMoreDrawer(false)}
                  className="p-1.5 text-[#766A61] hover:text-[#3A302B] rounded-full bg-[#F4EEE4] cursor-pointer"
                  aria-label="Đóng bảng điều hướng"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {moreTabs.map((tab) => {
                  const isActive = currentRoute === tab.route;
                  const Icon = tab.icon;

                  return (
                    <button
                      key={tab.route}
                      id={`mobile-drawer-${tab.route.replace('/', '')}`}
                      onClick={() => {
                        setShowMoreDrawer(false);
                        navigateTo(tab.route);
                      }}
                      className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-[#FDF0ED] border-[#F4D2CA] text-[#8F3E32] font-bold shadow-xs'
                          : 'bg-[#F4EEE4] border-[#E5DCCF] text-[#594D46] hover:bg-[#EAE0D3]'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isActive ? 'bg-[#ED806F] text-white' : 'bg-[#FFFDF8] text-[#594D46] border border-[#E5DCCF]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold leading-tight">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
