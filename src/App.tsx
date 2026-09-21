/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - ROOT APPLICATION ENTRY POINT
 * Strict Authentication Architecture:
 * 
 * App
 * └── ToastProvider
 *     └── AuthProvider
 *         └── AuthGate
 *             ├── LOADING → SessionLoading
 *             ├── UNAUTHENTICATED → LoginPage (No AppShell, No Header/Sidebar, No 3D Canvas)
 *             ├── STUDENT_AUTHENTICATED → Student Dashboard + AppShell
 *             └── TEACHER_AUTHENTICATED → Teacher Dashboard + TeacherAppLayout
 */

import React from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { AuthGate } from './components/auth/AuthGate';
import { GlobalErrorBoundary } from './components/common/GlobalErrorBoundary';
import { AppleExperienceProvider } from './components/motion/AppleExperienceProvider';

export default function App() {
  return (
    <GlobalErrorBoundary>
      <AppleExperienceProvider>
        <ToastProvider>
          <AuthProvider>
            <AuthGate />
          </AuthProvider>
        </ToastProvider>
      </AppleExperienceProvider>
    </GlobalErrorBoundary>
  );
}
