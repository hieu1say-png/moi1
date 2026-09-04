/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TEACHER LOGIN VIEW (CỔNG ĐĂNG NHẬP GIÁO VIÊN)
 * Renders the unified LoginPage in teacher mode.
 */

import React, { useEffect } from 'react';
import { LoginPage } from '../components/auth/LoginPage';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { TeacherAuthService } from '../services/teacherAuthService';

export const TeacherLogin: React.FC = () => {
  const { navigateTo } = useApp();
  const { isTeacherAuthenticated } = useAuth();

  useEffect(() => {
    const isTeacher = isTeacherAuthenticated || TeacherAuthService.isAuthenticated();
    if (isTeacher) {
      navigateTo('/teacher-dashboard');
    }
  }, [isTeacherAuthenticated]);

  return (
    <LoginPage
      initialMode="teacher"
      onSuccessRedirect={() => navigateTo('/teacher-dashboard')}
    />
  );
};
