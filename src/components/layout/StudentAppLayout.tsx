/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - STUDENT APPLICATION LAYOUT
 * Dedicated pedagogical student learning interface:
 * - AppShell with Header, Sidebar, STEM Floating Dock, Thầy Hiếu AI
 * - Safe internal route renderer that strictly protects student session
 * - Zero accidental logouts when navigating between tabs/menus
 * - First-login password change and logout confirmation modals
 */

import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AppShell } from './AppShell';
import { HomeView } from '../../views/HomeView';
import { TheoryView } from '../../views/TheoryView';
import { ExploreView } from '../../views/ExploreView';
import { PracticeView } from '../../views/PracticeView';
import { ExamPrepView } from '../../views/ExamPrepView';
import { RealWorldView } from '../../views/RealWorldView';
import { AchievementsView } from '../../views/AchievementsView';
import { AIView } from '../../views/AIView';
import { StudentProfileView } from '../student/StudentProfileView';
import { GeometryMasterGameView } from '../../views/GeometryMasterGameView';
import { LogoutConfirmModal } from '../auth/LogoutConfirmModal';
import { FirstLoginChangePasswordModal } from '../auth/FirstLoginChangePasswordModal';

const StudentRouteRenderer: React.FC = () => {
  const { currentRoute, navigateTo } = useApp();

  // Strict RBAC Guard: If URL hash attempts to access teacher-only routes or /login, redirect safely to /home
  useEffect(() => {
    if (
      currentRoute === '/teacher' ||
      currentRoute === '/teacher-dashboard' ||
      currentRoute === '/settings' ||
      currentRoute === '/login'
    ) {
      navigateTo('/home');
    }
  }, [currentRoute, navigateTo]);

  switch (currentRoute) {
    case '/student-profile':
      return <StudentProfileView />;
    case '/theory':
    case '/cylinder':
    case '/cone':
    case '/sphere':
      return <TheoryView />;
    case '/explore':
      return <ExploreView />;
    case '/practice':
      return <PracticeView />;
    case '/exam-prep':
      return <ExamPrepView />;
    case '/real-world':
      return <RealWorldView />;
    case '/achievements':
      return <AchievementsView />;
    case '/ai':
      return <AIView />;
    case '/game':
      return <GeometryMasterGameView />;
    case '/home':
    default:
      return <HomeView />;
  }
};

export const StudentAppLayout: React.FC = () => {
  return (
    <>
      <AppShell>
        <StudentRouteRenderer />
      </AppShell>
      <LogoutConfirmModal />
      <FirstLoginChangePasswordModal />
    </>
  );
};
