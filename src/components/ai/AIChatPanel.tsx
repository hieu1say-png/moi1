/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - UPGRADED SMART AI TUTOR PANEL (THẦY HIẾU AI)
 * Architecture & Features:
 * - Pure Mathematical Interface with LaTeX / KaTeX rendering
 * - Protected by Authentication (Student & Teacher sessions)
 * - Dynamic 4-Phase AI Processing Indicator ("Đang đọc câu hỏi..." -> "Đang xác định dạng toán..." -> "Đang đối chiếu mô hình 3D..." -> "Đang tìm cách giải thích dễ hiểu...")
 * - Module-Specific Quick Question Chips for Cylinder, Cone, Sphere, and Paradox 1/3
 * - Rich 3D Model Synchronization payload
 * - Interactive 3D Model Action Triggers ([XEM TRÊN MÔ HÌNH 3D], [THỬ NGAY])
 * - Resilient Error Handling & Retry without loss of user input
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send,
  Sparkles,
  Copy,
  RotateCcw,
  RefreshCw,
  Cpu,
  Info,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  X,
  Lock,
  LogIn,
  Eye,
  EyeOff,
  ThumbsUp,
  ThumbsDown,
  Check,
  MoreVertical,
  ArrowRight,
  ExternalLink,
  Layers,
  Compass,
  Box,
  HelpCircle,
  Volume2,
  VolumeX
} from 'lucide-react';
import { MathText } from '../common/MathFormula';
import { useLearningContext } from '../../context/LearningContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useSpatialProfileStore } from '../../stores/useSpatialProfileStore';
import { useSpeech } from '../../hooks/useSpeech';
import { ShapeType } from '../../types';
import { QuestionIntelligenceService } from '../../services/ai/questionIntelligenceService';
import { QuickReplyOption } from '../../data/questionBank1000/types';

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

const FEEDBACK_REASONS = [
  'Khó hiểu',
  'Quá dài',
  'Chưa đúng câu hỏi',
  'Muốn ví dụ',
  'Muốn gợi ý khác'
];

const PROCESSING_PHASES = [
  'Đang đọc câu hỏi...',
  'Đang xác định dạng toán...',
  'Đang đối chiếu mô hình 3D...',
  'Đang tìm cách giải thích dễ hiểu...'
];

export const AIChatPanel: React.FC<AIChatPanelProps> = ({
  className = '',
  isCompact = false,
  onClose,
  onExecuteAction
}) => {
  const { context, updateContext } = useLearningContext();
  const { studentSession, studentUser, isStudentAuthenticated, isTeacherAuthenticated, openLoginModal } = useAuth();
  const { showSuccess, showError, showInfo } = useToast();
  const recordEvent = useSpatialProfileStore((state) => state.recordEvent);

  const isUserAuthenticated = isStudentAuthenticated || isTeacherAuthenticated;

  const [inputMessage, setInputMessage] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [loadingPhaseIndex, setLoadingPhaseIndex] = useState<number>(0);
  const [lastFailedQuery, setLastFailedQuery] = useState<string | null>(null);
  const [activeHighlightTarget, setActiveHighlightTarget] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [aiVisionEnabled, setAiVisionEnabled] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [activeFeedbackMsgId, setActiveFeedbackMsgId] = useState<string | null>(null);
  const [dynamicQuickReplies, setDynamicQuickReplies] = useState<QuickReplyOption[]>([]);

  // Pedagogical Slow Vietnamese Speech Synthesis (rate: 0.80, pitch: 0.85)
  const { speak, stop: stopSpeech, isSpeaking, activeText: speakingText } = useSpeech({
    rate: 0.80,
    pitch: 0.85
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isAutoScrollDisabledRef = useRef<boolean>(false);

  // Chat message history
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Clear messages if user logs out
  useEffect(() => {
    if (!isUserAuthenticated) {
      setMessages([]);
      setInputMessage('');
      setLastFailedQuery(null);
    }
  }, [isUserAuthenticated]);

  // Loading phase animation interval
  useEffect(() => {
    let interval: any = null;
    if (isSending) {
      setLoadingPhaseIndex(0);
      interval = setInterval(() => {
        setLoadingPhaseIndex((prev) => (prev + 1) % PROCESSING_PHASES.length);
      }, 550);
    } else {
      setLoadingPhaseIndex(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSending]);

  // Record OPEN_AI event on mount
  useEffect(() => {
    if (isStudentAuthenticated) {
      try {
        recordEvent('HINT_REQUEST', {
          action: 'Học sinh mở bảng Thầy Hiếu AI',
          shape: (context.currentShape as ShapeType) || 'cylinder'
        });
      } catch {
        // ignore telemetry errors
      }
    }
  }, [isStudentAuthenticated]);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback((force = false) => {
    if (force || !isAutoScrollDisabledRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleScroll = () => {
    if (!messageContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messageContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 60;
    isAutoScrollDisabledRef.current = !isAtBottom;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending, loadingPhaseIndex, scrollToBottom]);

  // Format Current Learning Context for Header
  const contextSummary = React.useMemo(() => {
    const shape = context.currentShape;
    const shapeLabel =
      shape === 'cylinder'
        ? 'Hình Trụ'
        : shape === 'cone'
        ? 'Hình Nón'
        : shape === 'sphere'
        ? 'Hình Cầu'
        : 'Hình Không Gian';

    const isParadox =
      context.currentMode === 'real-world' ||
      context.pourCount !== null ||
      context.currentActivity?.includes('paradox') ||
      context.currentActivity?.includes('volume');

    const activityLabel = isParadox
      ? 'Nghịch lý 1/3 Thể tích'
      : context.currentMode === 'practice'
      ? 'Luyện tập bài tập'
      : 'Khám phá 3D';

    const details: string[] = [];
    if (context.currentR !== null && context.currentR !== undefined) {
      details.push(`r = ${context.currentR} cm`);
    }
    if (context.currentH !== null && context.currentH !== undefined && shape !== 'sphere') {
      details.push(`h = ${context.currentH} cm`);
    }
    if (context.currentL !== null && context.currentL !== undefined && shape === 'cone') {
      details.push(`l = ${context.currentL} cm`);
    }
    if (context.pourCount !== null && context.pourCount !== undefined) {
      details.push(`Rót: ${context.pourCount}/3 lần`);
    }

    return {
      title: `${shapeLabel} • ${activityLabel}`,
      details: details.join(' • ')
    };
  }, [
    context.currentShape,
    context.currentMode,
    context.currentActivity,
    context.currentR,
    context.currentH,
    context.currentL,
    context.pourCount
  ]);

  // Dynamic Module-Specific Quick Action Chips
  const quickActionChips = React.useMemo(() => {
    const shape = context.currentShape;
    const isParadox = context.currentMode === 'real-world' || context.pourCount !== null || context.currentActivity?.includes('paradox');

    if (isParadox) {
      return [
        { label: 'Tại sao 1/3?', prompt: 'Tại sao hình nón có 1/3?' },
        { label: 'Tại sao đổ 3 lần?', prompt: 'Tại sao phải đổ 3 lần?' },
        { label: 'Giải thích bằng 3D', prompt: 'Giải thích bằng 3D thí nghiệm rót nước.' },
        { label: 'Cho em gợi ý', prompt: 'Cho em gợi ý về thí nghiệm rót nước.' },
        { label: 'Em chưa hiểu', prompt: 'Em chưa hiểu tại sao sau mỗi lần rót nước lại tăng thêm 1/3.' }
      ];
    }

    if (shape === 'cone') {
      return [
        { label: 'Nón lá có đặc điểm gì?', prompt: 'Nón lá có đặc điểm hình học gì?' },
        { label: 'Đường sinh khác chiều cao?', prompt: 'Đường sinh khác chiều cao thế nào?' },
        { label: 'Công thức diện tích xung quanh?', prompt: 'Công thức tính diện tích xung quanh hình nón?' },
        { label: 'Tại sao có 1/3?', prompt: 'Tại sao hình nón có 1/3 trong công thức thể tích?' },
        { label: 'Cho em gợi ý', prompt: 'Thầy cho em một gợi ý bài tập hình nón nhé!' }
      ];
    }

    if (shape === 'sphere') {
      return [
        { label: 'Tại sao quả bóng hình cầu?', prompt: 'Tại sao quả bóng lại có hình cầu?' },
        { label: 'Công thức diện tích mặt cầu?', prompt: 'Công thức diện tích mặt cầu là gì?' },
        { label: 'So sánh cầu và trụ?', prompt: 'So sánh thể tích hình cầu và hình trụ có cùng bán kính và chiều cao 2R?' },
        { label: 'Ứng dụng bồn chứa cầu?', prompt: 'Tại sao bồn chứa khí gas hóa lỏng lại làm dạng hình cầu?' },
        { label: 'Cho em gợi ý', prompt: 'Thầy cho em gợi ý công thức thể tích hình cầu nhé!' }
      ];
    }

    // Default Cylinder Quick Chips
    return [
      { label: 'Tại sao lon nước hình trụ?', prompt: 'Tại sao lon nước ngọt thường làm hình trụ?' },
      { label: 'Công thức diện tích xung quanh?', prompt: 'Công thức tính diện tích xung quanh hình trụ?' },
      { label: 'Cách tính thể tích bồn nước?', prompt: 'Cách tính thể tích bồn nước hình trụ đứng?' },
      { label: 'Tại sao trải phẳng thành HCN?', prompt: 'Tại sao khi trải phẳng mặt xung quanh hình trụ lại được một hình chữ nhật?' },
      { label: 'Cho em gợi ý', prompt: 'Thầy cho em gợi ý giải bài toán thực tế hình trụ!' }
    ];
  }, [context.currentShape, context.currentMode, context.pourCount, context.currentActivity]);

  // Send message to AI endpoint (/api/tutor or /api/ai-tutor)
  const handleSendMessage = async (textToSend?: string) => {
    const rawText = textToSend !== undefined ? textToSend : inputMessage;
    const text = rawText.trim();

    if (!text && !context.questionText) {
      showInfo('Vui lòng nhập câu hỏi của em.');
      return;
    }

    const query = text || `Giải thích giúp em bài toán: ${context.questionText}`;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setLastFailedQuery(null);

    if (textToSend === undefined) {
      setInputMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }

    setIsSending(true);
    isAutoScrollDisabledRef.current = false;

    // Record ASK_AI telemetry event
    try {
      recordEvent('HINT_REQUEST', {
        action: `Học sinh hỏi Thầy Hiếu AI: ${query.slice(0, 50)}`,
        shape: (context.currentShape as ShapeType) || 'cylinder'
      });
    } catch {
      // ignore
    }

    // Build rich payload conforming strictly to requirements
    const currentShapeKey = context.currentShape || 'cylinder';
    const payload = {
      message: query,
      feedbackLevel: context.currentHintLevel || 1,
      currentLevel: context.currentHintLevel || 1,
      context: {
        studentId: studentUser?.id || 'student-active',
        studentName: studentUser?.fullName || 'Học sinh Lớp 9',
        className: studentUser?.className || 'Lớp 9A2',
        currentShape: currentShapeKey,
        currentMode: context.currentMode || 'explore',
        currentActivity: context.currentActivity || 'Khám phá 3D',
        currentPage: context.currentPage || '/explore',
        currentTopic: context.currentMode === 'practice' ? 'EXERCISE' : 'CONCEPT_EXPLORE',
        questionText: context.questionText || null,
        questionId: context.questionId || null,
        userAnswer: context.userAnswer || null,
        studentAnswer: context.userAnswer || null,
        expectedAnswer: context.expectedAnswer || null,
        currentR: aiVisionEnabled && context.currentR !== undefined ? context.currentR : 4,
        currentH: aiVisionEnabled && context.currentH !== undefined ? context.currentH : 8,
        currentL: aiVisionEnabled && context.currentL !== undefined ? context.currentL : 5,
        pourCount: aiVisionEnabled && context.pourCount !== undefined ? context.pourCount : null,
        cylinderFill: aiVisionEnabled && context.cylinderFill !== undefined ? context.cylinderFill : null,
        coneFill: aiVisionEnabled && context.coneFill !== undefined ? context.coneFill : null,
        currentHintLevel: context.currentHintLevel || 1,
        wrongCount: context.wrongCount || 0,
        timeSpent: context.timeSpent || 0,
        current3DState: {
          shape: currentShapeKey,
          radius: context.currentR ?? 4,
          height: context.currentH ?? 8,
          generatrix: context.currentL ?? 5,
          mode: context.currentMode,
          pourCount: context.pourCount
        },
        mathematicalParameters: {
          r: context.currentR ?? 4,
          h: context.currentH ?? 8,
          l: context.currentL ?? 5
        },
        experimentState: {
          pourCount: context.pourCount,
          cylinderFill: context.cylinderFill
        }
      },
      history: messages.slice(-8).map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        content: m.content
      }))
    };

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();

      let replyContent = '';
      let highlightTarget: string | null = null;
      let hintLevel: number | undefined = undefined;
      let nextAction: { text: string; actionType?: string } | string | null = null;
      let returnedQuickReplies: QuickReplyOption[] | null = null;

      if (typeof data === 'string') {
        replyContent = data;
      } else if (typeof data === 'object' && data !== null) {
        replyContent = data.message || data.reply || data.response || 'Thầy đã nhận được câu hỏi của em.';
        highlightTarget = data.highlightTarget || data.threeDAction?.highlightElement || null;
        hintLevel = data.hintLevel || data.feedbackLevel;
        nextAction = data.nextAction || null;
        if (Array.isArray(data.quickReplies) && data.quickReplies.length > 0) {
          returnedQuickReplies = data.quickReplies;
        }
      }

      if (returnedQuickReplies) {
        setDynamicQuickReplies(returnedQuickReplies);
      }

      if (highlightTarget) {
        setActiveHighlightTarget(highlightTarget);
        updateContext({
          highlightTarget,
          lastAction: `Thầy Hiếu AI Highlight 3D: ${highlightTarget}`
        });
      }

      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        feedbackLevel: hintLevel,
        highlightTarget,
        nextAction,
        feedback: null
      };

      setMessages((prev) => [...prev, assistantMessage]);

      try {
        recordEvent('HINT_USED', {
          action: `Thầy Hiếu AI phản hồi cấp độ ${hintLevel || 1}`,
          shape: (context.currentShape as ShapeType) || 'cylinder'
        });
      } catch {
        // ignore
      }
    } catch (err: any) {
      console.warn('API Error in AIChatPanel, executing local Question Intelligence Engine:', err);
      try {
        const localResult = QuestionIntelligenceService.processQuery(
          query,
          context,
          context.currentHintLevel || 1
        );

        if (localResult.highlightTarget) {
          setActiveHighlightTarget(localResult.highlightTarget);
          updateContext({
            highlightTarget: localResult.highlightTarget,
            lastAction: `Thầy Hiếu AI Highlight 3D: ${localResult.highlightTarget}`
          });
        }

        if (localResult.quickReplies && localResult.quickReplies.length > 0) {
          setDynamicQuickReplies(localResult.quickReplies);
        }

        const localMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: localResult.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          feedbackLevel: context.currentHintLevel || 1,
          highlightTarget: localResult.highlightTarget,
          feedback: null
        };

        setMessages((prev) => [...prev, localMessage]);
      } catch (localErr) {
        setLastFailedQuery(query);
        const errorMessage: ChatMessage = {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: 'Thầy đang hơi lag một chút. Em thử gửi lại câu hỏi nhé!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true,
          canRetry: true
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } finally {
      setIsSending(false);
    }
  };

  // Keyboard handler: Enter to send, Shift+Enter for newline
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isSending && inputMessage.trim()) {
        handleSendMessage();
      }
    }
  };

  // Click quick question chip
  const handleChipClick = (promptText: string) => {
    setInputMessage(promptText);
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
    try {
      recordEvent('HINT_USED', {
        action: `Học sinh chọn câu hỏi mẫu: ${promptText.slice(0, 30)}`,
        shape: (context.currentShape as ShapeType) || 'cylinder'
      });
    } catch {
      // ignore
    }
  };

  const handleCopyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showSuccess('Đã sao chép câu trả lời của Thầy Hiếu');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([]);
    setLastFailedQuery(null);
    setShowMenu(false);
    showInfo('Đã làm mới cuộc trò chuyện');
  };

  const handleRetry = () => {
    if (lastFailedQuery) {
      handleSendMessage(lastFailedQuery);
    } else if (inputMessage.trim()) {
      handleSendMessage();
    }
  };

  const handleFeedback = (msgId: string, type: 'UP' | 'DOWN', reason?: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === msgId) {
          return { ...m, feedback: { type, reason } };
        }
        return m;
      })
    );
    setActiveFeedbackMsgId(null);
    if (type === 'UP') {
      showSuccess('Cảm ơn em đã phản hồi! Thầy rất vui khi giúp ích được cho em.');
    } else {
      showInfo('Thầy đã ghi nhận để giải thích dễ hiểu hơn lần sau.');
    }
  };

  const handleExecuteNextAction = (action?: { text: string; actionType?: string } | string | null) => {
    if (!action) return;
    const actionText = typeof action === 'string' ? action : action.text;
    const actionType = typeof action === 'string' ? 'GENERIC' : action.actionType || 'GENERIC';

    try {
      recordEvent('ANSWER', {
        action: `Học sinh thực hiện Next Action: ${actionText}`,
        shape: (context.currentShape as ShapeType) || 'cylinder'
      });
    } catch {
      // ignore
    }

    if (onExecuteAction) {
      onExecuteAction(actionType);
    } else {
      showInfo(`Đã kích hoạt: ${actionText}`);
    }
  };

  // ----------------------------------------------------
  // UNATHENTICATED / LOADING LOCK STATE
  // ----------------------------------------------------
  if (studentSession.status === 'AUTH_LOADING') {
    return (
      <div
        id="ai-chat-panel-loading"
        className={`flex flex-col bg-[#FFFDF8] rounded-2xl border border-[#E5DCCF] shadow-sm overflow-hidden text-[#3A302B] min-h-[420px] ${className}`}
      >
        <div className="px-4 py-3.5 bg-[#F4EEE4] border-b border-[#E5DCCF] flex items-center justify-between select-none">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#634796] text-white flex items-center justify-center shadow-2xs">
              <Cpu className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-[#3A302B] tracking-tight leading-none">
                THẦY HIẾU AI • TOÁN 9
              </h3>
              <p className="text-[11px] text-[#766A61] font-medium mt-0.5">
                Đang xác thực phiên học sinh...
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 text-center space-y-3 my-auto">
          <Cpu className="w-8 h-8 text-orange-500 animate-spin" />
          <p className="text-xs text-gray-500 font-medium font-sans">
            Đang kiểm tra phiên đăng nhập...
          </p>
        </div>
      </div>
    );
  }

  if (!isUserAuthenticated) {
    return (
      <div
        id="ai-chat-panel-locked"
        className={`flex flex-col bg-[#FFFDF8] rounded-2xl border border-[#E5DCCF] shadow-sm overflow-hidden text-[#3A302B] min-h-[420px] ${className}`}
      >
        <div className="px-4 py-3.5 bg-[#F4EEE4] border-b border-[#E5DCCF] flex items-center justify-between select-none">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#634796] text-white flex items-center justify-center shadow-2xs">
              <Cpu className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-[#3A302B] tracking-tight leading-none flex items-center gap-1.5">
                THẦY HIẾU AI • HÌNH HỌC 9
              </h3>
              <p className="text-[11px] text-[#766A61] font-medium mt-0.5">
                Gia sư sư phạm tương tác 3D
              </p>
            </div>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#766A61] hover:text-[#3A302B] hover:bg-[#EAE0D3] transition-colors cursor-pointer"
              title="Đóng bảng AI"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 text-center space-y-4 my-auto">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center shadow-2xs">
            <Lock className="w-7 h-7" />
          </div>
          <div className="space-y-1.5 max-w-sm">
            <h4 className="text-base font-serif font-bold text-[#3A302B]">
              Yêu Cầu Đăng Nhập
            </h4>
            <p className="text-xs text-[#766A61] leading-relaxed">
              Em cần đăng nhập bằng tài khoản do giáo viên cấp để sử dụng Thầy Hiếu AI và lưu tiến trình học tập.
            </p>
          </div>
          <button
            id="ai-lock-login-btn"
            type="button"
            onClick={() => openLoginModal('AI Hình học')}
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>ĐĂNG NHẬP</span>
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // AUTHENTICATED AI TUTOR PANEL
  // ----------------------------------------------------
  return (
    <div
      id="ai-chat-panel"
      className={`flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden text-gray-800 transition-all ${className}`}
    >
      {/* ---------------------------------------------------- */}
      {/* 1. HEADER (THẦY HIẾU AI - PURE MATH UI)              */}
      {/* ---------------------------------------------------- */}
      <div className="px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-between select-none shadow-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-xs text-white shrink-0">
            <Cpu className="w-4.5 h-4.5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-white tracking-tight leading-none">
                THẦY HIẾU AI
              </h3>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-100 text-[10px] font-semibold border border-emerald-300/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                Sẵn sàng
              </span>
            </div>
            <p className="text-[11px] text-orange-100 font-medium truncate mt-0.5">
              Gia sư sư phạm Hình học 3D Toán 9
            </p>
          </div>
        </div>

        {/* Action Controls in Header */}
        <div className="flex items-center gap-1 shrink-0 relative">
          {/* 3D Vision Toggle */}
          <button
            type="button"
            onClick={() => {
              const next = !aiVisionEnabled;
              setAiVisionEnabled(next);
              showInfo(next ? 'Đã bật đồng bộ thông số mô hình 3D' : 'Đã tắt đồng bộ thông số 3D');
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-semibold ${
              aiVisionEnabled
                ? 'bg-white/20 text-white'
                : 'bg-black/10 text-orange-200 hover:bg-white/10'
            }`}
            title={aiVisionEnabled ? 'Thầy đang nhìn mô hình 3D' : 'Bật đồng bộ mô hình 3D'}
            aria-label="AI nhìn mô hình 3D"
          >
            {aiVisionEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[10px]">Nhìn 3D</span>
          </button>

          {/* More Actions Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Tùy chọn khác"
              aria-label="Menu"
            >
              <MoreVertical className="w-3.5 h-3.5" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-200 py-1 text-xs text-gray-700 z-50 animate-fadeIn">
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-gray-700 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
                  <span>Xóa cuộc trò chuyện</span>
                </button>
              </div>
            )}
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Đóng bảng AI"
              aria-label="Đóng"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. CURRENT LEARNING CONTEXT BAR                       */}
      {/* ---------------------------------------------------- */}
      <div className="px-3.5 py-2 bg-orange-50/80 border-b border-orange-100 text-[11px] text-gray-700 flex flex-wrap items-center justify-between gap-1.5 select-none">
        <div className="flex items-center gap-1.5 font-medium text-orange-950">
          <Layers className="w-3.5 h-3.5 text-orange-600 shrink-0" />
          <span>Đang học: <strong>{contextSummary.title}</strong></span>
        </div>
        {contextSummary.details && (
          <div className="flex items-center gap-2 font-mono text-[10px] text-orange-800 bg-white/90 px-2 py-0.5 rounded-md border border-orange-200/70 shadow-2xs">
            <span>{contextSummary.details}</span>
          </div>
        )}
      </div>

      {/* ---------------------------------------------------- */}
      {/* 3. MESSAGE STREAM (KaTeX Mixed Rendering)             */}
      {/* ---------------------------------------------------- */}
      <div
        ref={messageContainerRef}
        onScroll={handleScroll}
        className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 bg-gray-50/50 min-h-[260px] max-h-[460px]"
      >
        {/* Empty State */}
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2.5 my-auto">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1 max-w-xs">
              <h4 className="text-sm font-bold text-gray-800">
                Thầy có thể hỗ trợ gì cho em?
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Em có thể hỏi về công thức, bản chất hình học, mẹo tránh bẫy hoặc nhờ thầy gợi ý từng bước giải nhé!
              </p>
            </div>
          </div>
        )}

        {/* Message Bubbles */}
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              {/* Sender Name & Timestamp */}
              <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-gray-400">
                <span className="font-semibold text-gray-600">
                  {isUser ? 'Em' : 'Thầy Hiếu AI'}
                </span>
                <span>•</span>
                <span>{m.timestamp}</span>
              </div>

              {/* Message Bubble Container */}
              <div
                className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-4 text-sm sm:text-base leading-relaxed shadow-2xs space-y-2.5 ${
                  isUser
                    ? 'bg-orange-500 text-white rounded-br-xs'
                    : m.isError
                    ? 'bg-red-50 text-red-900 border border-red-200 rounded-bl-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                }`}
              >
                {/* Mathematical Text with KaTeX Rendering */}
                <div className="text-left leading-relaxed font-normal break-words gl-solution-text">
                  {m.isError ? (
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{m.content}</span>
                    </div>
                  ) : (
                    <MathText text={m.content} />
                  )}
                </div>

                {/* 3D Highlight Target Indicator */}
                {m.highlightTarget && (
                  <div className="flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 text-[11px] font-medium">
                    <div className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span>🎯 Điểm nhấn 3D: <strong>{m.highlightTarget}</strong></span>
                    </div>
                    {onExecuteAction && (
                      <button
                        type="button"
                        onClick={() => handleExecuteNextAction({ text: `Xem ${m.highlightTarget} trên 3D`, actionType: 'VIEW_3D' })}
                        className="px-2 py-0.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-[10px] font-bold cursor-pointer transition-all shadow-2xs"
                      >
                        XEM TRÊN 3D
                      </button>
                    )}
                  </div>
                )}

                {/* Next Action Actionable Box */}
                {m.nextAction && (
                  <div className="p-2.5 rounded-xl bg-orange-50/90 border border-orange-200 space-y-1.5">
                    <div className="text-[11px] font-bold text-orange-950 flex items-center justify-between">
                      <span>Bước tiếp theo gợi ý:</span>
                    </div>
                    <p className="text-[11px] text-orange-900 leading-snug">
                      {typeof m.nextAction === 'string' ? m.nextAction : m.nextAction.text}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleExecuteNextAction(m.nextAction)}
                      className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs"
                    >
                      <Box className="w-3 h-3" />
                      <span>THỬ NGAY</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Error Retry Button */}
                {m.canRetry && (
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={handleRetry}
                      disabled={isSending}
                      className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>THỬ LẠI</span>
                    </button>
                  </div>
                )}

                {/* Assistant Footer with Copy & Feedback Buttons */}
                {!isUser && !m.isError && (
                  <div className="pt-1.5 border-t border-gray-100 flex flex-col gap-1.5 text-[10px] text-gray-400">
                    <div className="flex items-center justify-between">
                      {/* Feedback [👍] / [👎] */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500">Giúp ích cho em?</span>
                        <button
                          type="button"
                          onClick={() => handleFeedback(m.id, 'UP')}
                          className={`p-1 rounded transition-colors cursor-pointer ${
                            m.feedback?.type === 'UP'
                              ? 'text-emerald-600 bg-emerald-50'
                              : 'hover:text-emerald-600 hover:bg-gray-100'
                          }`}
                          title="Hữu ích"
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (activeFeedbackMsgId === m.id) {
                              setActiveFeedbackMsgId(null);
                            } else {
                              setActiveFeedbackMsgId(m.id);
                            }
                          }}
                          className={`p-1 rounded transition-colors cursor-pointer ${
                            m.feedback?.type === 'DOWN'
                              ? 'text-red-600 bg-red-50'
                              : 'hover:text-red-600 hover:bg-gray-100'
                          }`}
                          title="Chưa hiểu"
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Audio Speech & Copy Buttons */}
                      <div className="flex items-center gap-1.5">
                        {/* Audio Speech Button */}
                        <button
                          type="button"
                          onClick={() => {
                            if (isSpeaking && speakingText === m.content) {
                              stopSpeech();
                            } else {
                              speak(m.content);
                            }
                          }}
                          className={`p-1 rounded transition-colors cursor-pointer flex items-center gap-1 text-[10px] ${
                            isSpeaking && speakingText === m.content
                              ? 'bg-amber-100 text-amber-800 font-bold animate-pulse'
                              : 'hover:text-gray-700 hover:bg-gray-100'
                          }`}
                          title={
                            isSpeaking && speakingText === m.content
                              ? 'Dừng đọc'
                              : 'Phát loa Thầy Hiếu giảng bài (chậm rãi)'
                          }
                          aria-label="Phát loa"
                        >
                          {isSpeaking && speakingText === m.content ? (
                            <>
                              <VolumeX className="w-3 h-3 text-amber-700" />
                              <span className="text-amber-800 font-bold">Dừng</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3 text-gray-500" />
                              <span>Nghe giảng</span>
                            </>
                          )}
                        </button>

                        {/* Copy Message Button */}
                        <button
                          type="button"
                          onClick={() => handleCopyMessage(m.content, m.id)}
                          className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors cursor-pointer flex items-center gap-1"
                          title="Sao chép câu trả lời"
                          aria-label="Sao chép"
                        >
                          {copiedId === m.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-600 font-bold">Đã chép</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Sao chép</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Negative feedback detailed options */}
                    {activeFeedbackMsgId === m.id && (
                      <div className="p-2 rounded-lg bg-gray-50 border border-gray-200 space-y-1.5 animate-fadeIn">
                        <span className="font-semibold text-gray-700 block">
                          Vì sao câu trả lời chưa giúp ích cho em?
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {FEEDBACK_REASONS.map((r, rIdx) => (
                            <button
                              key={rIdx}
                              type="button"
                              onClick={() => handleFeedback(m.id, 'DOWN', r)}
                              className="px-2 py-0.5 rounded-md bg-white border border-gray-300 hover:border-orange-400 text-gray-700 hover:text-orange-600 text-[10px] transition-colors cursor-pointer"
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Dynamic 4-Phase AI Loading Indicator */}
        {isSending && (
          <div className="flex items-center gap-2.5 text-xs text-orange-700 font-medium p-3 bg-orange-50 border border-orange-200 rounded-2xl w-fit shadow-xs animate-pulse">
            <Cpu className="w-4 h-4 animate-spin text-orange-600 shrink-0" />
            <span className="font-semibold">{PROCESSING_PHASES[loadingPhaseIndex]}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ---------------------------------------------------- */}
      {/* 4. QUICK ACTION CHIPS & FOLLOW-UP ACTIONS            */}
      {/* ---------------------------------------------------- */}
      <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 space-y-1.5">
        <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-1">
          <span>Hỏi nhanh Thầy Hiếu:</span>
          <span className="text-[9px] text-slate-400 font-normal">Nhấn để gửi trực tiếp</span>
        </div>
        
        {/* Core Pedagogical Follow-up Buttons */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => handleSendMessage('Thầy ơi, thầy có thể giải thích lại bước này thật chi tiết giúp em được không ạ?')}
            disabled={isSending}
            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold transition-all cursor-pointer shrink-0 whitespace-nowrap shadow-2xs active:scale-95"
          >
            💡 Giải thích lại bước này
          </button>
          <button
            type="button"
            onClick={() => handleSendMessage('Thầy cho em một bài tập tương tự dạng này để em tự luyện tập nhé!')}
            disabled={isSending}
            className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-semibold transition-all cursor-pointer shrink-0 whitespace-nowrap shadow-2xs active:scale-95"
          >
            📝 Cho bài tập tương tự
          </button>
          <button
            type="button"
            onClick={() => handleSendMessage('Thầy có thể hướng dẫn em cách vẽ hình minh họa và ký hiệu góc/đoạn thẳng chuẩn không ạ?')}
            disabled={isSending}
            className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-semibold transition-all cursor-pointer shrink-0 whitespace-nowrap shadow-2xs active:scale-95"
          >
            📐 Vẽ hình minh họa
          </button>
          {(dynamicQuickReplies.length > 0 ? dynamicQuickReplies.slice(0, 4) : quickActionChips).map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleChipClick(chip.prompt)}
              disabled={isSending}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-orange-50 text-slate-700 hover:text-orange-700 border border-slate-200 hover:border-orange-300 text-xs font-medium transition-colors cursor-pointer shrink-0 whitespace-nowrap shadow-2xs active:scale-95"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 5. FORMULA QUICK INSERTS & INPUT AREA                */}
      {/* ---------------------------------------------------- */}
      <div className="p-3 bg-white border-t border-slate-200 space-y-2">
        {/* Mathematical Quick Formula Inserts (π, r², √, ⅓, ...) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-0.5">Chèn nhanh:</span>
          {[
            { label: 'π', val: 'π' },
            { label: 'r²', val: 'r²' },
            { label: 'h', val: 'h' },
            { label: 'l', val: 'l' },
            { label: '√', val: '√(' },
            { label: '⅓', val: '1/3' },
            { label: 'Sxq', val: 'Sxq' },
            { label: 'Stp', val: 'Stp' },
            { label: 'V', val: 'V' }
          ].map((sym) => (
            <button
              key={sym.label}
              type="button"
              disabled={isSending}
              onClick={() => {
                setInputMessage((prev) => prev + sym.val);
                if (textareaRef.current) {
                  textareaRef.current.focus();
                }
              }}
              className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-orange-100 hover:text-orange-700 text-slate-700 text-xs font-mono font-bold transition-colors cursor-pointer shrink-0 border border-slate-200 shadow-2xs"
            >
              {sym.label}
            </button>
          ))}
        </div>

        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              id="ai-chat-input-textarea"
              ref={textareaRef}
              rows={2}
              value={inputMessage}
              disabled={isSending}
              onChange={(e) => {
                setInputMessage(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
              }}
              onKeyDown={handleKeyDown}
              placeholder="Nhập câu hỏi cho Thầy Hiếu AI..."
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none outline-none transition-all leading-relaxed bg-white text-slate-900 placeholder:text-slate-400 disabled:bg-slate-100 disabled:text-slate-500 min-h-[52px]"
            />
          </div>

          {/* Send Button */}
          <button
            id="ai-chat-send-btn"
            type="button"
            disabled={isSending || !inputMessage.trim()}
            onClick={() => handleSendMessage()}
            aria-label="Gửi câu hỏi"
            className="px-4 py-3 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs shrink-0 min-h-[52px] min-w-[70px] active:scale-95"
          >
            <span>GỬI</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
          <span>Enter để gửi • Shift + Enter để xuống dòng</span>
          <span>Hỗ trợ công thức $LaTeX$</span>
        </div>
      </div>
    </div>
  );
};

export default AIChatPanel;
