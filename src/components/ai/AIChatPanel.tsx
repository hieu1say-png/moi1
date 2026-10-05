/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - AI CHAT PANEL (DECOMMISSIONED)
 * Khung chat “Thầy Hiếu AI” đã được gỡ bỏ hoàn toàn khỏi giao diện.
 */

import React from 'react';

export interface AIChatPanelProps {
  className?: string;
  isCompact?: boolean;
  onClose?: () => void;
  onExecuteAction?: (actionType: string) => void;
}

export interface ChatFeedback {
  type: 'UP' | 'DOWN';
  reason?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  feedbackLevel?: number;
  highlightTarget?: string | null;
  nextAction?: { text: string; actionType?: string } | string | null;
  isError?: boolean;
  canRetry?: boolean;
  feedback?: ChatFeedback | null;
}

export const AIChatPanel: React.FC<AIChatPanelProps> = () => {
  return null;
};

export default AIChatPanel;
