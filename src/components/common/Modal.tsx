/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, ReactNode } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  id?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  id = 'custom-modal'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const sizeClasses: Record<string, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-xl',
    xl: 'max-w-3xl'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id={id}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#3A302B]/40 backdrop-blur-xs transition-opacity"
            id={`${id}-backdrop`}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`
              relative w-full ${sizeClasses[size]} bg-[#FFFDF8] rounded-[20px] shadow-2xl border border-[#E5DCCF] z-10 overflow-hidden my-8
            `}
            id={`${id}-content`}
          >
            {/* Header */}
            {(title || description) && (
              <div className="flex items-start justify-between p-5 md:p-6 border-b border-[#E5DCCF] bg-[#F4EEE4]">
                <div>
                  {title && (
                    <h3 className="font-serif text-lg md:text-xl font-bold text-[#3A302B]" id={`${id}-title`}>
                      {title}
                    </h3>
                  )}
                  {description && (
                    <p className="text-xs md:text-sm text-[#766A61] mt-1">{description}</p>
                  )}
                </div>
                <button
                  id={`${id}-close-button`}
                  onClick={onClose}
                  className="text-[#766A61] hover:text-[#3A302B] p-1.5 rounded-xl hover:bg-[#EAE0D3] transition-colors ml-4 cursor-pointer"
                  aria-label="Đóng cửa sổ"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Body */}
            <div className="p-5 md:p-6 max-h-[70vh] overflow-y-auto text-[#594D46]">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="flex items-center justify-end gap-3 p-4 md:p-5 border-t border-[#E5DCCF] bg-[#F4EEE4]/70">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
