/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - LEARNING CONTEXT PROVIDER & HOOK
 * Provides single source of truth for real-time mathematical learning context.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useApp } from './AppContext';
import { useAuth } from './AuthContext';
import { LearningContextData, LearningContextUpdate, LearningContextValue } from '../types/learningContext';

const LearningContext = createContext<LearningContextValue | undefined>(undefined);

export const LearningContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentRoute, selectedShape, settings } = useApp();
  const { studentUser, isStudentAuthenticated } = useAuth();

  const getInitialMode = (route: string): string => {
    switch (route) {
      case '/explore':
        return 'explore';
      case '/practice':
        return 'practice';
      case '/theory':
        return 'theory';
      case '/real-world':
        return 'real-world';
      case '/exam-prep':
        return 'exam-prep';
      case '/ai':
        return 'ai-tutor';
      default:
        return 'general';
    }
  };

  const getInitialActivity = (route: string, shape: string): string => {
    const shapeName = shape === 'cylinder' ? 'Hình Trụ' : shape === 'cone' ? 'Hình Nón' : 'Hình Cầu';
    switch (route) {
      case '/explore':
        return `Khám phá trực quan 3D ${shapeName}`;
      case '/practice':
        return `Luyện tập bài tập ${shapeName}`;
      case '/theory':
        return `Lý thuyết & công thức ${shapeName}`;
      case '/real-world':
        return `Ứng dụng thực tế ${shapeName}`;
      case '/exam-prep':
        return `Ôn thi vào 10 - ${shapeName}`;
      case '/ai':
        return `Gia sư AI Toán 9 - ${shapeName}`;
      default:
        return `Học tập ${shapeName}`;
    }
  };

  const [context, setContext] = useState<LearningContextData>(() => ({
    studentId: isStudentAuthenticated && studentUser ? studentUser.id : null,
    studentName: isStudentAuthenticated && studentUser ? studentUser.fullName : (settings.studentName || 'Học sinh Toán 9'),
    className: isStudentAuthenticated && studentUser ? studentUser.className : (settings.className || 'Lớp 9A2'),
    currentShape: selectedShape || 'cylinder',
    currentMode: getInitialMode(currentRoute),
    currentActivity: getInitialActivity(currentRoute, selectedShape),
    currentPage: currentRoute || '/home',
    lessonState: 'idle',
    currentStep: 0,
    learningPhase: 'INTRO',
    questionId: null,
    questionText: null,
    userAnswer: null,
    expectedAnswer: null,
    attemptCount: 0,
    wrongCount: 0,
    hintUsed: [],
    currentHintLevel: 1,
    currentR: selectedShape === 'cone' ? 2 : 4,
    currentH: selectedShape === 'cone' ? 4 : 8,
    currentL: selectedShape === 'cone' ? 4.47 : null,
    pourCount: null,
    cylinderFill: null,
    coneFill: null,
    lastAction: null,
    lastError: null,
    activeHighlightTarget: null,
    timeSpent: 0,
    completed: false
  }));

  // Synchronize route, selected shape, and authenticated student changes
  useEffect(() => {
    setContext((prev) => ({
      ...prev,
      studentId: isStudentAuthenticated && studentUser ? studentUser.id : null,
      studentName: isStudentAuthenticated && studentUser ? studentUser.fullName : (settings.studentName || prev.studentName),
      className: isStudentAuthenticated && studentUser ? studentUser.className : (settings.className || prev.className),
      currentPage: currentRoute,
      currentMode: getInitialMode(currentRoute),
      currentShape: selectedShape,
      currentActivity: getInitialActivity(currentRoute, selectedShape),
      currentR: prev.currentR ?? (selectedShape === 'cone' ? 2 : 4),
      currentH: prev.currentH ?? (selectedShape === 'cone' ? 4 : 8)
    }));
  }, [currentRoute, selectedShape, settings.studentName, settings.className, studentUser, isStudentAuthenticated]);

  const updateContext = useCallback((partial: LearningContextUpdate) => {
    setContext((prev) => ({
      ...prev,
      ...partial
    }));
  }, []);

  const resetContextToDefaults = useCallback(() => {
    setContext({
      studentId: isStudentAuthenticated && studentUser ? studentUser.id : null,
      studentName: isStudentAuthenticated && studentUser ? studentUser.fullName : (settings.studentName || 'Học sinh Toán 9'),
      className: isStudentAuthenticated && studentUser ? studentUser.className : (settings.className || 'Lớp 9A2'),
      currentShape: selectedShape || 'cylinder',
      currentMode: getInitialMode(currentRoute),
      currentActivity: getInitialActivity(currentRoute, selectedShape),
      currentPage: currentRoute || '/home',
      lessonState: 'idle',
      currentStep: 0,
      learningPhase: 'INTRO',
      questionId: null,
      questionText: null,
      userAnswer: null,
      expectedAnswer: null,
      attemptCount: 0,
      wrongCount: 0,
      hintUsed: [],
      currentHintLevel: 1,
      currentR: selectedShape === 'cone' ? 2 : 4,
      currentH: selectedShape === 'cone' ? 4 : 8,
      currentL: selectedShape === 'cone' ? 4.47 : null,
      pourCount: null,
      cylinderFill: null,
      coneFill: null,
      lastAction: null,
      lastError: null,
      activeHighlightTarget: null,
      timeSpent: 0,
      completed: false
    });
  }, [currentRoute, selectedShape, settings.studentName, settings.className, studentUser, isStudentAuthenticated]);

  const set3DParams = useCallback((r: number | null, h: number | null, l?: number | null) => {
    setContext((prev) => {
      let calculatedL = l;
      if (calculatedL === undefined && r !== null && h !== null && prev.currentShape === 'cone') {
        calculatedL = parseFloat(Math.sqrt(r * r + h * h).toFixed(2));
      }
      return {
        ...prev,
        currentR: r,
        currentH: h,
        currentL: calculatedL !== undefined ? calculatedL : prev.currentL,
        lastAction: `Cập nhật thông số 3D: r=${r}${h ? `, h=${h}` : ''}`
      };
    });
  }, []);

  const setPourState = useCallback((pourCount: number | null, cylinderFill: number | null, coneFill: number | null) => {
    setContext((prev) => ({
      ...prev,
      pourCount,
      cylinderFill,
      coneFill,
      lastAction: `Thực hiện đổ nước lần ${pourCount ?? 0} (Mực nước trụ: ${cylinderFill !== null ? Math.round(cylinderFill * 100) : 0}%)`
    }));
  }, []);

  const setQuestionContext = useCallback((q: {
    questionId?: string | null;
    questionText?: string | null;
    userAnswer?: any;
    expectedAnswer?: any;
    wrongCount?: number;
    attemptCount?: number;
    lastError?: string | null;
    currentHintLevel?: number;
  }) => {
    setContext((prev) => ({
      ...prev,
      questionId: q.questionId !== undefined ? q.questionId : prev.questionId,
      questionText: q.questionText !== undefined ? q.questionText : prev.questionText,
      userAnswer: q.userAnswer !== undefined ? q.userAnswer : prev.userAnswer,
      expectedAnswer: q.expectedAnswer !== undefined ? q.expectedAnswer : prev.expectedAnswer,
      wrongCount: q.wrongCount !== undefined ? q.wrongCount : prev.wrongCount,
      attemptCount: q.attemptCount !== undefined ? q.attemptCount : prev.attemptCount,
      lastError: q.lastError !== undefined ? q.lastError : prev.lastError,
      currentHintLevel: q.currentHintLevel !== undefined ? q.currentHintLevel : prev.currentHintLevel,
      lastAction: q.questionText ? `Chuyển sang bài toán: ${q.questionText.slice(0, 40)}...` : prev.lastAction
    }));
  }, []);

  const recordAction = useCallback((action: string) => {
    setContext((prev) => ({
      ...prev,
      lastAction: action
    }));
  }, []);

  return (
    <LearningContext.Provider
      value={{
        context,
        updateContext,
        resetContextToDefaults,
        set3DParams,
        setPourState,
        setQuestionContext,
        recordAction
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearningContext = (): LearningContextValue => {
  const ctx = useContext(LearningContext);
  if (!ctx) {
    throw new Error('useLearningContext must be used within a LearningContextProvider');
  }
  return ctx;
};
