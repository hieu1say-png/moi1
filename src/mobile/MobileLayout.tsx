/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - MOBILE APPLICATION LAYOUT
 * Mobile-First Root Shell for Grade 9 Students on Smartphones:
 * - Replaces complex desktop sidebars and multi-column layouts
 * - Renders specialized Mobile Screens (MobileHomeScreen, MobileLesson)
 * - Fixed Bottom Navigation with safe-area padding
 * - Offline / Network Detection Banner
 * - High Contrast, 44x44px Touch Targets, Zero Zooming required
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BottomNavigation } from './BottomNavigation';
import { MobileHomeScreen } from './MobileHomeScreen';
import { MobileLesson } from './MobileLesson';
import { ExploreView } from '../views/ExploreView';
import { GeometryMasterGameView } from '../views/GeometryMasterGameView';
import { StudentProfileView } from '../components/student/StudentProfileView';
import { AIView } from '../views/AIView';
import { AchievementsView } from '../views/AchievementsView';
import { WifiOff, RefreshCw } from 'lucide-react';
import { ToastContainer } from '../components/common/Toast';

export const MobileLayout: React.FC = () => {
  const { currentRoute, navigateTo } = useApp();
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    if (typeof navigator !== 'undefined') return navigator.onLine;
    return true;
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Mobile Route Switcher
  const renderMobileContent = () => {
    switch (currentRoute) {
      case '/home':
        return <MobileHomeScreen />;
      case '/theory':
      case '/cylinder':
      case '/cone':
      case '/sphere':
        return <MobileLesson />;
      case '/explore':
        return (
          <div className="w-full max-w-lg mx-auto pb-24">
            <ExploreView />
          </div>
        );
      case '/game':
      case '/practice':
      case '/exam-prep':
        return (
          <div className="w-full max-w-lg mx-auto pb-24">
            <GeometryMasterGameView />
          </div>
        );
      case '/student-profile':
        return (
          <div className="w-full max-w-lg mx-auto pb-24">
            <StudentProfileView />
          </div>
        );
      case '/achievements':
        return (
          <div className="w-full max-w-lg mx-auto pb-24">
            <AchievementsView />
          </div>
        );
      case '/ai':
        return (
          <div className="w-full max-w-lg mx-auto pb-24">
            <AIView />
          </div>
        );
      default:
        return <MobileHomeScreen />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#2D241E] flex flex-col font-sans selection:bg-[#FF6B00] selection:text-white">
      {/* Offline Friendly Status Banner */}
      {!isOnline && (
        <div className="sticky top-0 z-50 px-4 py-2 bg-amber-500 text-white text-xs font-bold flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 shrink-0" />
            <span>Mất kết nối mạng. Bài học sẽ tự động tiếp tục khi có mạng lại.</span>
          </div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="p-1 rounded-md bg-white/20 active:scale-90"
            aria-label="Tải lại"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Mobile Screen Viewport Container */}
      <main className="flex-1 w-full overflow-y-auto">
        {renderMobileContent()}
      </main>

      {/* Fixed Bottom Navigation (Height 64-72px) */}
      <BottomNavigation />

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
};
