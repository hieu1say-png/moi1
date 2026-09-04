import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MainContent } from './MainContent';
import { MobileNavigation } from './MobileNavigation';
import { FloatingSTEMNavDock } from './FloatingSTEMNavDock';
import { ToastContainer } from '../common/Toast';
import { SearchModal } from './SearchModal';
import { useApp } from '../../context/AppContext';
import { TeacherDock } from '../teacher-ai/TeacherDock';
import { SpatialProfileModal } from '../spatial-profile/SpatialProfileModal';
import { MasteryCheckModal } from '../common/MasteryCheckModal';
import { useTeacherAI } from '../teacher-ai/TeacherContext';
import { GeometricBackdrop } from './GeometricBackdrop';
import { useAuth } from '../../context/AuthContext';
import { StudentPreviewBanner } from './StudentPreviewBanner';

export interface AppShellProps {
  children: ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { navigateTo, currentRoute } = useApp();
  const { isStudentPreview } = useAuth();
  const { isProfileModalOpen, setIsProfileModalOpen } = useTeacherAI();

  return (
    <div id="app-shell" className="relative flex flex-col min-h-screen bg-[#F8FAFC] text-gray-800 selection:bg-orange-500 selection:text-white">
      {/* Decorative Layered Geometric Background */}
      <GeometricBackdrop />

      {/* Teacher Student Preview Mode Banner */}
      {isStudentPreview && <StudentPreviewBanner />}

      <div className="relative flex-1 flex min-h-0">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Column */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header */}
          <Header />

          {/* Dynamic Main Content View */}
          <MainContent>{children}</MainContent>

          {/* Animated Floating STEM Navigation Dock */}
          <FloatingSTEMNavDock />
        </div>
      </div>

      {/* Thầy Hiếu AI Smart Dock (Active everywhere except full AI View to prevent duplication) */}
      {currentRoute !== '/ai' && <TeacherDock />}

      {/* Global Spatial Thinking Profile Modal */}
      <SpatialProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Global Mastery Check Modal */}
      <MasteryCheckModal />

      {/* Global Toast System */}
      <ToastContainer />

      {/* Quick Search Modal */}
      <SearchModal />
    </div>
  );
};
