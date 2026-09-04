/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TEACHER THẦY HIẾU AI - GLOBAL CONTEXT & HOOK
 * Coordinates Avatar state, teacher target highlights, voice, and learning event telemetry.
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import {
  TeacherAvatarState,
  VisualHighlightTarget,
  TeacherChatMessage,
  TeacherAIContextValue
} from './types';
import { LearningEventType } from '../../types/spatialProfile';
import { useSpatialProfileStore } from '../../stores/useSpatialProfileStore';

const TeacherAIContext = createContext<TeacherAIContextValue | undefined>(undefined);

export const TeacherAIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [avatarState, setAvatarState] = useState<TeacherAvatarState>('IDLE');
  const [teacherTarget, setTeacherTarget] = useState<VisualHighlightTarget>(null);
  const [currentMessage, setCurrentMessage] = useState<TeacherChatMessage | null>({
    id: 'msg-init',
    sender: 'teacher',
    text: 'Chào em! Thầy Hiếu sẽ đồng hành cùng em khám phá các khối hình học không gian 3D. Em muốn bắt đầu từ đâu nào?',
    subtitle: 'Trợ giảng Hình học không gian',
    avatarState: 'IDLE',
    feedbackLevel: 1,
    timestamp: Date.now()
  });

  const [feedbackLevel, setFeedbackLevel] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isBubbleOpen, setIsBubbleOpen] = useState<boolean>(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  const { recordEvent } = useSpatialProfileStore();

  const emitLearningEvent = useCallback((type: LearningEventType, metadata?: Record<string, any>) => {
    recordEvent(type, metadata);
  }, [recordEvent]);

  const say = useCallback((
    text: string,
    options?: {
      subtitle?: string;
      latex?: string;
      avatarState?: TeacherAvatarState;
      highlightTarget?: VisualHighlightTarget;
      feedbackLevel?: 1 | 2 | 3 | 4 | 5;
    }
  ) => {
    const nextState = options?.avatarState || 'EXPLAINING';
    const nextTarget = options?.highlightTarget !== undefined ? options.highlightTarget : null;
    const nextLevel = options?.feedbackLevel || 1;

    setAvatarState(nextState);
    setTeacherTarget(nextTarget);
    setFeedbackLevel(nextLevel);

    const message: TeacherChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'teacher',
      text,
      subtitle: options?.subtitle || 'Trợ giảng Hình học không gian',
      latex: options?.latex,
      avatarState: nextState,
      highlightTarget: nextTarget,
      feedbackLevel: nextLevel,
      timestamp: Date.now()
    };

    setCurrentMessage(message);
    setIsBubbleOpen(true);
  }, []);

  const requestNextHint = useCallback(() => {
    setFeedbackLevel((prev) => {
      const next = Math.min(5, prev + 1) as 1 | 2 | 3 | 4 | 5;
      emitLearningEvent('HINT_REQUEST', { level: next });
      setAvatarState(next === 5 ? 'EXPLAINING' : 'HINT');
      return next;
    });
  }, [emitLearningEvent]);

  const showSolution = useCallback(() => {
    setFeedbackLevel(5);
    setAvatarState('EXPLAINING');
    emitLearningEvent('HINT_USED', { isSolution: true });
  }, [emitLearningEvent]);

  const resetHints = useCallback(() => {
    setFeedbackLevel(1);
    setAvatarState('IDLE');
    setTeacherTarget(null);
  }, []);

  return (
    <TeacherAIContext.Provider
      value={{
        avatarState,
        setAvatarState,
        currentMessage,
        teacherTarget,
        setTeacherTarget,
        say,
        feedbackLevel,
        requestNextHint,
        showSolution,
        resetHints,
        isBubbleOpen,
        setIsBubbleOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        emitLearningEvent
      }}
    >
      {children}
    </TeacherAIContext.Provider>
  );
};

export const useTeacherAI = (): TeacherAIContextValue => {
  const context = useContext(TeacherAIContext);
  if (!context) {
    throw new Error('useTeacherAI must be used within a TeacherAIProvider');
  }
  return context;
};
