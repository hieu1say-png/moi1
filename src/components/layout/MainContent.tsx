import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';

export interface MainContentProps {
  children: ReactNode;
}

export const MainContent: React.FC<MainContentProps> = ({ children }) => {
  const { currentRoute } = useApp();

  return (
    <main
      id="main-content-container"
      className="flex-1 w-full max-w-[1536px] 2xl:max-w-[1600px] mx-auto px-3.5 sm:px-5 lg:px-7 py-4 sm:py-5 md:py-6 pb-28 lg:pb-24 overflow-x-hidden min-h-[calc(100vh-4rem)]"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentRoute}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};
