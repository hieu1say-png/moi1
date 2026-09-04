/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - TOP-LEVEL AUTHENTICATION GATE (AUTH GATE)
 * Central security gatekeeper enforcing strict authentication before app rendering:
 * 
 * App
 * └── AuthProvider
 *     └── AuthGate
 *         ├── LOADING → màn hình loading nhẹ (SessionLoading)
 *         ├── UNAUTHENTICATED → MÀN HÌNH LOGIN (LoginPage)
 *         ├── STUDENT_AUTHENTICATED → Student Dashboard + App Layout (StudentAppLayout)
 *         └── TEACHER_AUTHENTICATED → Teacher Dashboard + Teacher Layout (TeacherAppLayout)
 * 
 * Security Guarantees:
 * 1. Zero rendering of internal dashboard or AppShell before authentication is verified.
 * 2. Strict role-based isolation: Student cannot access Teacher; Teacher defaults to Teacher Dashboard.
 * 3. Zero session leakage or cross-contamination between roles.
 * 4. Session persistence on browser reload (zero flash of unauthenticated state).
 * 5. Menu clicks and route switches NEVER cause accidental logout.
 */

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { SessionLoading } from './SessionLoading';
import { LoginPage } from './LoginPage';
import { AppProvider } from '../../context/AppContext';
import { LearningContextProvider } from '../../context/LearningContext';
import { TeacherAIProvider } from '../teacher-ai/TeacherContext';
import { StudentAppLayout } from '../layout/StudentAppLayout';
import { TeacherAppLayout } from '../layout/TeacherAppLayout';

export const AuthGate: React.FC = () => {
  const {
    authReady,
    studentSession,
    teacherSession,
    activeRole,
    isStudentAuthenticated,
    isTeacherAuthenticated,
    isStudentPreview
  } = useAuth();

  // 1. STATE: LOADING
  // Show minimal pedagogical loading screen while sessions are restored from storage
  if (
    !authReady ||
    studentSession.status === 'AUTH_LOADING' ||
    teacherSession.status === 'AUTH_LOADING'
  ) {
    return <SessionLoading />;
  }

  const isStudentAuth =
    isStudentAuthenticated &&
    studentSession.status === 'AUTHENTICATED' &&
    !!studentSession.user;

  const isTeacherAuth =
    isTeacherAuthenticated &&
    teacherSession.status === 'AUTHENTICATED' &&
    !!teacherSession.user;

  // 2. STATE: UNAUTHENTICATED
  // If neither role is authenticated or active role is not valid, render clean Login Page
  // NO AppShell, NO Header, NO Sidebar, NO 3D Canvas, NO content views rendered
  if (
    (!isStudentAuth && !isTeacherAuth) ||
    !activeRole ||
    (activeRole === 'student' && !isStudentAuth) ||
    (activeRole === 'teacher' && !isTeacherAuth)
  ) {
    return (
      <LoginPage
        initialMode={activeRole === 'teacher' || (!isStudentAuth && isTeacherAuth) ? 'teacher' : 'student'}
      />
    );
  }

  // 3. STATE: TEACHER_AUTHENTICATED
  // Teacher enters directly into Teacher Dashboard & Pedagogical Administration
  // In safe Student Preview mode, teacher views the complete Student interface with preview banner
  if (activeRole === 'teacher' && isTeacherAuth) {
    if (isStudentPreview) {
      return (
        <AppProvider initialRole="student" initialRoute="/home">
          <LearningContextProvider>
            <TeacherAIProvider>
              <StudentAppLayout />
            </TeacherAIProvider>
          </LearningContextProvider>
        </AppProvider>
      );
    }

    return (
      <AppProvider initialRole="teacher" initialRoute="/teacher-dashboard">
        <TeacherAIProvider>
          <TeacherAppLayout />
        </TeacherAIProvider>
      </AppProvider>
    );
  }

  // 4. STATE: STUDENT_AUTHENTICATED
  // Student enters directly into Student Dashboard & 3D Geometry Laboratory
  return (
    <AppProvider initialRole="student" initialRoute="/home">
      <LearningContextProvider>
        <TeacherAIProvider>
          <StudentAppLayout />
        </TeacherAIProvider>
      </LearningContextProvider>
    </AppProvider>
  );
};
