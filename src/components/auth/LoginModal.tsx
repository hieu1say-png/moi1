/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - IN-CONTEXT LOGIN MODAL
 * Allows logging in seamlessly when a student clicks on a locked interactive feature.
 */

import React, { useState } from 'react';
import { X, Layers } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { StudentLoginForm } from './StudentLoginForm';
import { TeacherLoginForm } from './TeacherLoginForm';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, loginModalTargetFeature } = useAuth();
  const [authMode, setAuthMode] = useState<'student' | 'teacher'>('student');

  if (!isLoginModalOpen) return null;

  return (
    <div
      id="in-context-login-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150 select-none overflow-y-auto"
    >
      <div className="relative bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 my-8 animate-in zoom-in-95 duration-150">
        {/* Close button */}
        <button
          type="button"
          onClick={closeLoginModal}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand emblem */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-xs shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 tracking-tight">
              GEOMETRY LAB
            </h3>
            <p className="text-xs text-orange-600 font-medium">
              {loginModalTargetFeature ? `Mở khóa: ${loginModalTargetFeature}` : 'Đăng nhập để học'}
            </p>
          </div>
        </div>

        {/* Form Body */}
        {authMode === 'student' ? (
          <StudentLoginForm
            onSuccess={closeLoginModal}
            onSwitchToTeacher={() => setAuthMode('teacher')}
          />
        ) : (
          <TeacherLoginForm
            onSuccess={closeLoginModal}
            onSwitchToStudent={() => setAuthMode('student')}
          />
        )}
      </div>
    </div>
  );
};
