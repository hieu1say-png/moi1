import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';

export interface MainContentProps {
  children: ReactNode;
}

export const MainContent: React.FC<MainContentProps> = ({ children }) => {
  const { currentRoute } = useApp();
  const is3DRoute = currentRoute === '/explore';

  return (
    <main
      id="main-content-container"
      className={`flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-16 overflow-x-hidden min-h-[calc(100vh-3.75rem)] ${
        is3DRoute ? 'max-w-[1400px]' : 'max-w-[1180px]'
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentRoute}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

