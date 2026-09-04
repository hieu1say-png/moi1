/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - EDUCATIONAL NEOBRUTALISM COMPONENT KIT
 * Enforces Section 31 specifications:
 * - 3px solid #000 border
 * - 4px 4px 0 #000 hard shadow (NO blur)
 * - Physical press button mechanics (active translate 4px, 4px; shadow 0)
 * - Accessible contrast & high-contrast focus rings
 * - Standardized math & educational elements
 */

import React, { ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, Sparkles, X, Timer as TimerIcon } from 'lucide-react';
import { MathText, MathFormula } from './MathFormula';

// =========================================================================
// 1. NEO BUTTON
// =========================================================================
export type NeoButtonVariant =
  | 'primary' // #FF6B00 Orange
  | 'yellow' // #FFD23F Yellow
  | 'lime' // #B7F000 Lime
  | 'pink' // #FF4F81 Pink
  | 'blue' // #3B82F6 Blue
  | 'success' // #22C55E Green
  | 'danger' // #EF4444 Red
  | 'ai' // #8B5CF6 Purple
  | 'dark' // #000000 Black
  | 'white' // #FFFFFF White
  | 'subtle'; // #FFF9E6 Cream

export type NeoButtonSize = 'sm' | 'md' | 'lg';

export interface NeoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: NeoButtonVariant;
  size?: NeoButtonSize;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export const NeoButton: React.FC<NeoButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  rightIcon,
  className = '',
  id,
  disabled,
  fullWidth = false,
  ...rest
}) => {
  const sizeClasses: Record<NeoButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs rounded',
    md: 'px-4 py-2.5 text-sm rounded-md',
    lg: 'px-6 py-3 text-base rounded-md font-black'
  };

  const variantClasses: Record<NeoButtonVariant, string> = {
    primary: 'bg-[#FF6B00] text-white hover:bg-[#E55F00]',
    yellow: 'bg-[#FFD23F] text-black hover:bg-[#F0C42E]',
    lime: 'bg-[#B7F000] text-black hover:bg-[#A4D800]',
    pink: 'bg-[#FF4F81] text-white hover:bg-[#E53D6E]',
    blue: 'bg-[#3B82F6] text-white hover:bg-[#2563EB]',
    success: 'bg-[#22C55E] text-black hover:bg-[#16A34A]',
    danger: 'bg-[#EF4444] text-white hover:bg-[#DC2626]',
    ai: 'bg-[#8B5CF6] text-white hover:bg-[#7C3AED]',
    dark: 'bg-black text-white hover:bg-neutral-800',
    white: 'bg-white text-black hover:bg-neutral-100',
    subtle: 'bg-[#FFF9E6] text-black hover:bg-[#FFF3CC]'
  };

  return (
    <button
      id={id}
      disabled={disabled}
      className={`
        neo-btn font-extrabold flex items-center justify-center gap-2
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...rest}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};

// =========================================================================
// 2. NEO CARD
// =========================================================================
export type NeoCardVariant =
  | 'white'
  | 'cream'
  | 'yellow'
  | 'lime'
  | 'pink'
  | 'blue'
  | 'ai'
  | 'cylinder'
  | 'sphere'
  | 'cone';

export interface NeoCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: NeoCardVariant;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  className?: string;
  id?: string;
}

export const NeoCard: React.FC<NeoCardProps> = ({
  children,
  variant = 'white',
  shadow = 'md',
  interactive = false,
  className = '',
  id,
  ...rest
}) => {
  const variantClasses: Record<NeoCardVariant, string> = {
    white: 'bg-white text-black',
    cream: 'bg-[#FFFDF5] text-black',
    yellow: 'bg-[#FFF9E6] text-black',
    lime: 'bg-[#F4FFE0] text-black',
    pink: 'bg-[#FFF0F4] text-black',
    blue: 'bg-[#EFF6FF] text-black',
    ai: 'bg-[#F5F3FF] text-black',
    cylinder: 'bg-[#EFF6FF] text-black',
    sphere: 'bg-[#F0FDFA] text-black',
    cone: 'bg-[#FFF0E5] text-black'
  };

  const shadowClasses: Record<string, string> = {
    none: 'shadow-none',
    sm: 'shadow-neo-sm',
    md: 'shadow-neo',
    lg: 'shadow-neo-lg',
    xl: 'shadow-neo-xl'
  };

  return (
    <motion.div
      id={id}
      className={`
        border-3 border-black rounded-lg p-4 sm:p-5
        ${variantClasses[variant]}
        ${shadowClasses[shadow]}
        ${interactive ? 'neo-card-interactive cursor-pointer' : ''}
        ${className}
      `}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

// =========================================================================
// 3. NEO INPUT
// =========================================================================
export interface NeoInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: ReactNode;
  id?: string;
}

export const NeoInput: React.FC<NeoInputProps> = ({
  label,
  helperText,
  error,
  icon,
  className = '',
  id,
  ...rest
}) => {
  const inputId = id || (label ? `neo-input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-black uppercase tracking-wider text-black">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3.5 pointer-events-none text-black">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={`
            neo-input
            ${icon ? 'pl-10' : 'pl-3.5'}
            ${error ? 'border-red-600 bg-red-50' : 'border-black bg-white'}
            ${className}
          `}
          {...rest}
        />
      </div>
      {error ? (
        <p className="text-xs font-bold text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs font-medium text-gray-700">{helperText}</p>
      ) : null}
    </div>
  );
};

// =========================================================================
// 4. NEO SELECT
// =========================================================================
export interface NeoSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: string | number; label: string }>;
  helperText?: string;
  error?: string;
  id?: string;
}

export const NeoSelect: React.FC<NeoSelectProps> = ({
  label,
  options,
  helperText,
  error,
  className = '',
  id,
  ...rest
}) => {
  const selectId = id || (label ? `neo-select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-black uppercase tracking-wider text-black">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`
          neo-input cursor-pointer font-bold
          ${error ? 'border-red-600 bg-red-50' : 'border-black bg-white'}
          ${className}
        `}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-black font-semibold">
            {opt.label}
          </option>
        ))}
      </select>
      {error ? (
        <p className="text-xs font-bold text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs font-medium text-gray-700">{helperText}</p>
      ) : null}
    </div>
  );
};

// =========================================================================
// 5. NEO BADGE
// =========================================================================
export type NeoBadgeVariant =
  | 'primary' // Orange
  | 'yellow' // Yellow
  | 'lime' // Lime
  | 'pink' // Pink
  | 'blue' // Blue
  | 'success' // Green
  | 'danger' // Red
  | 'ai' // Purple
  | 'dark' // Black
  | 'neutral'; // White/Cream

export interface NeoBadgeProps {
  children: ReactNode;
  variant?: NeoBadgeVariant;
  icon?: ReactNode;
  className?: string;
  id?: string;
}

export const NeoBadge: React.FC<NeoBadgeProps> = ({
  children,
  variant = 'primary',
  icon,
  className = '',
  id
}) => {
  const variantClasses: Record<NeoBadgeVariant, string> = {
    primary: 'bg-[#FF6B00] text-white',
    yellow: 'bg-[#FFD23F] text-black',
    lime: 'bg-[#B7F000] text-black',
    pink: 'bg-[#FF4F81] text-white',
    blue: 'bg-[#3B82F6] text-white',
    success: 'bg-[#22C55E] text-black',
    danger: 'bg-[#EF4444] text-white',
    ai: 'bg-[#8B5CF6] text-white',
    dark: 'bg-black text-white',
    neutral: 'bg-white text-black'
  };

  return (
    <span
      id={id}
      className={`
        neo-badge flex items-center gap-1.5
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

// =========================================================================
// 6. NEO TAB
// =========================================================================
export interface NeoTabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
}

export interface NeoTabProps {
  items: NeoTabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  id?: string;
}

export const NeoTab: React.FC<NeoTabProps> = ({
  items,
  activeId,
  onChange,
  className = '',
  id
}) => {
  return (
    <div
      id={id}
      className={`flex items-center gap-2 p-1.5 bg-[#FFFDF5] border-3 border-black rounded-lg shadow-neo-sm overflow-x-auto ${className}`}
    >
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`
              flex items-center gap-2 px-3.5 py-2 rounded font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer
              ${
                isActive
                  ? 'bg-[#FF6B00] text-white border-2 border-black shadow-neo-sm'
                  : 'bg-white text-black border-2 border-transparent hover:bg-neutral-100 hover:border-black'
              }
            `}
          >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
            {item.badge !== undefined && (
              <span
                className={`px-1.5 py-0.2 rounded text-[10px] font-black border border-black ${
                  isActive ? 'bg-white text-black' : 'bg-[#FFD23F] text-black'
                }`}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

// =========================================================================
// 7. NEO MODAL
// =========================================================================
export interface NeoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  id?: string;
}

export const NeoModal: React.FC<NeoModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = 'lg',
  id
}) => {
  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl'
  };

  return (
    <div
      id={id}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`w-full bg-white border-3 border-black rounded-lg shadow-neo-xl overflow-hidden ${maxWidthClasses[maxWidth]}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#FFF9E6] border-b-3 border-black">
          <h3 className="font-heading text-lg font-black text-black">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ"
            className="p-1 text-black bg-white border-2 border-black rounded hover:bg-[#FF4F81] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[75vh] overflow-y-auto">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="p-4 bg-[#FFFDF5] border-t-3 border-black flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 8. NEO QUESTION CARD
// =========================================================================
export interface NeoQuestionCardProps {
  questionNumber?: number | string;
  topicBadge?: string;
  levelBadge?: string;
  questionContent: string;
  formula?: string;
  children?: ReactNode;
  actionSlot?: ReactNode;
  id?: string;
}

export const NeoQuestionCard: React.FC<NeoQuestionCardProps> = ({
  questionNumber,
  topicBadge,
  levelBadge,
  questionContent,
  formula,
  children,
  actionSlot,
  id
}) => {
  return (
    <div
      id={id}
      className="neo-card bg-[#FFFDF5] p-5 sm:p-6 space-y-4"
    >
      {/* Meta Header */}
      <div className="flex items-center justify-between gap-2 flex-wrap pb-3 border-b-2 border-black">
        <div className="flex items-center gap-2 flex-wrap">
          {questionNumber && (
            <NeoBadge variant="dark">Câu {questionNumber}</NeoBadge>
          )}
          {topicBadge && <NeoBadge variant="yellow">{topicBadge}</NeoBadge>}
          {levelBadge && <NeoBadge variant="lime">{levelBadge}</NeoBadge>}
        </div>
        {actionSlot && <div>{actionSlot}</div>}
      </div>

      {/* Stem with LaTeX */}
      <div className="gl-question-text text-black text-base sm:text-lg leading-relaxed">
        <MathText text={questionContent} />
      </div>

      {/* Standalone formula if provided */}
      {formula && (
        <div className="gl-formula-box my-3">
          <MathFormula formula={formula} block />
        </div>
      )}

      {/* Options or Answer Area */}
      {children && <div className="pt-2">{children}</div>}
    </div>
  );
};

// =========================================================================
// 9. NEO ANSWER OPTION
// =========================================================================
export interface NeoAnswerOptionProps {
  letter: string;
  text: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  disabled?: boolean;
  onClick: () => void;
  id?: string;
}

export const NeoAnswerOption: React.FC<NeoAnswerOptionProps> = ({
  letter,
  text,
  isSelected,
  isCorrect,
  isWrong,
  disabled,
  onClick,
  id
}) => {
  let containerBg = 'bg-white hover:bg-[#FFF9E6] border-black';
  let badgeBg = 'bg-white text-black border-black';
  let indicator = null;

  if (isCorrect) {
    containerBg = 'bg-[#B7F000] text-black border-black font-bold';
    badgeBg = 'bg-black text-white border-black';
    indicator = <span className="ml-auto text-xs font-black bg-black text-white px-2 py-0.5 rounded">✓ ĐÚNG</span>;
  } else if (isWrong) {
    containerBg = 'bg-[#FF4F81] text-white border-black font-bold';
    badgeBg = 'bg-black text-white border-black';
    indicator = <span className="ml-auto text-xs font-black bg-black text-white px-2 py-0.5 rounded">✕ SAI</span>;
  } else if (isSelected) {
    containerBg = 'bg-[#FFD23F] text-black border-black font-bold';
    badgeBg = 'bg-black text-white border-black';
  }

  return (
    <button
      id={id}
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        w-full p-4 rounded-md border-3 shadow-neo-sm text-left flex items-center gap-3.5 transition-all
        ${disabled ? 'cursor-default' : 'cursor-pointer hover:translate-x-0.5 active:translate-x-1'}
        ${containerBg}
      `}
    >
      <span
        className={`w-8 h-8 rounded border-2 font-black text-sm flex items-center justify-center shrink-0 ${badgeBg}`}
      >
        {letter}
      </span>
      <div className="flex-1 gl-option-text">
        <MathText text={text} />
      </div>
      {indicator}
    </button>
  );
};

// =========================================================================
// 10. NEO PANEL
// =========================================================================
export interface NeoPanelProps {
  title: ReactNode;
  subtitle?: ReactNode;
  headerAction?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}

export const NeoPanel: React.FC<NeoPanelProps> = ({
  title,
  subtitle,
  headerAction,
  children,
  className = '',
  id
}) => {
  return (
    <div
      id={id}
      className={`bg-white border-3 border-black rounded-lg shadow-neo overflow-hidden ${className}`}
    >
      <div className="p-4 bg-[#FFF9E6] border-b-3 border-black flex items-center justify-between gap-3">
        <div>
          <h3 className="font-heading text-base font-black text-black">{title}</h3>
          {subtitle && <p className="text-xs text-gray-700 font-medium">{subtitle}</p>}
        </div>
        {headerAction && <div>{headerAction}</div>}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
};

// =========================================================================
// 11. NEO ALERT
// =========================================================================
export type NeoAlertVariant = 'info' | 'success' | 'warning' | 'error' | 'ai';

export interface NeoAlertProps {
  variant?: NeoAlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

export const NeoAlert: React.FC<NeoAlertProps> = ({
  variant = 'info',
  title,
  children,
  className = '',
  id
}) => {
  const variantStyles = {
    info: {
      bg: 'bg-[#EFF6FF]',
      border: 'border-black',
      icon: <Info className="w-5 h-5 text-blue-700 shrink-0" />
    },
    success: {
      bg: 'bg-[#F4FFE0]',
      border: 'border-black',
      icon: <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0" />
    },
    warning: {
      bg: 'bg-[#FFF9E6]',
      border: 'border-black',
      icon: <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
    },
    error: {
      bg: 'bg-[#FFF0F4]',
      border: 'border-black',
      icon: <AlertCircle className="w-5 h-5 text-red-700 shrink-0" />
    },
    ai: {
      bg: 'bg-[#F5F3FF]',
      border: 'border-black',
      icon: <Sparkles className="w-5 h-5 text-purple-700 shrink-0" />
    }
  };

  const style = variantStyles[variant];

  return (
    <div
      id={id}
      className={`p-4 rounded-md border-3 shadow-neo-sm flex items-start gap-3.5 ${style.bg} ${style.border} ${className}`}
    >
      {style.icon}
      <div className="flex-1 min-w-0 text-sm text-black">
        {title && <h4 className="font-heading font-black text-sm text-black mb-1">{title}</h4>}
        <div>{children}</div>
      </div>
    </div>
  );
};

// =========================================================================
// 12. NEO PROGRESS
// =========================================================================
export interface NeoProgressProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
  className?: string;
  id?: string;
}

export const NeoProgress: React.FC<NeoProgressProps> = ({
  value,
  max = 100,
  label,
  color = 'bg-[#FF6B00]',
  className = '',
  id
}) => {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div id={id} className={`w-full space-y-1.5 ${className}`}>
      {label && (
        <div className="flex justify-between items-center text-xs font-black text-black">
          <span>{label}</span>
          <span className="font-mono">{percent}%</span>
        </div>
      )}
      <div className="w-full h-4 bg-white border-3 border-black rounded shadow-neo-sm overflow-hidden p-0.5">
        <div
          className={`h-full ${color} rounded-xs border-r-2 border-black transition-all duration-300`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

// =========================================================================
// 13. NEO TIMER
// =========================================================================
export interface NeoTimerProps {
  remainingSeconds: number;
  className?: string;
  id?: string;
}

export const NeoTimer: React.FC<NeoTimerProps> = ({
  remainingSeconds,
  className = '',
  id
}) => {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isCritical = remainingSeconds <= 300; // <= 5 mins

  return (
    <div
      id={id}
      className={`
        px-3.5 py-1.5 rounded border-3 border-black shadow-neo-sm flex items-center gap-2 font-mono
        ${isCritical ? 'bg-[#EF4444] text-white font-black animate-pulse' : 'bg-[#FFD23F] text-black font-extrabold'}
        ${className}
      `}
    >
      <TimerIcon className="w-4 h-4 shrink-0" />
      <span className="text-sm sm:text-base tracking-wider">
        {isCritical ? `⚠ CÒN ${formatted}` : formatted}
      </span>
    </div>
  );
};

// =========================================================================
// 14. NEO VIDEO CARD
// =========================================================================
export interface NeoVideoCardProps {
  title: string;
  duration?: string;
  teacherName?: string;
  thumbnailUrl?: string;
  onClick: () => void;
  id?: string;
}

export const NeoVideoCard: React.FC<NeoVideoCardProps> = ({
  title,
  duration,
  teacherName,
  thumbnailUrl,
  onClick,
  id
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className="neo-card bg-white p-3 cursor-pointer neo-card-interactive space-y-2.5"
    >
      <div className="relative aspect-video bg-neutral-900 border-2 border-black rounded overflow-hidden flex items-center justify-center">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#FF6B00] border-2 border-black flex items-center justify-center text-white font-black shadow-neo-sm">
            ▶
          </div>
        )}
        {duration && (
          <span className="absolute bottom-2 right-2 bg-black text-white text-[11px] font-black px-1.5 py-0.5 rounded border border-white">
            {duration}
          </span>
        )}
      </div>
      <div>
        <h4 className="font-heading font-black text-sm text-black line-clamp-2">{title}</h4>
        {teacherName && <p className="text-xs text-gray-700 font-medium mt-1">GV: {teacherName}</p>}
      </div>
    </div>
  );
};

// =========================================================================
// 15. NEO AI MESSAGE
// =========================================================================
export interface NeoAIMessageProps {
  message: string;
  steps?: Array<{ title: string; detail: string }>;
  tip?: string;
  className?: string;
  id?: string;
}

export const NeoAIMessage: React.FC<NeoAIMessageProps> = ({
  message,
  steps,
  tip,
  className = '',
  id
}) => {
  return (
    <div
      id={id}
      className={`bg-[#FFFDF5] border-3 border-black rounded-lg p-5 shadow-neo space-y-4 ${className}`}
    >
      {/* Header with AI Badge */}
      <div className="flex items-center gap-2.5 pb-2 border-b-2 border-black">
        <div className="w-7 h-7 rounded bg-[#8B5CF6] text-white border-2 border-black flex items-center justify-center font-black text-xs shadow-neo-sm">
          AI
        </div>
        <span className="font-heading font-black text-sm text-black">
          Gợi ý Sư phạm từ AI Tutor
        </span>
      </div>

      {/* Main explanation text */}
      <div className="gl-solution-text text-sm sm:text-base leading-relaxed text-black">
        <MathText text={message} />
      </div>

      {/* Step by step cards if present */}
      {steps && steps.length > 0 && (
        <div className="space-y-2 pt-1">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-3 bg-white border-2 border-black rounded shadow-neo-sm space-y-1"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#FFD23F] text-black border border-black flex items-center justify-center text-xs font-black">
                  {idx + 1}
                </span>
                <span className="font-heading font-black text-xs sm:text-sm text-black">
                  {s.title}
                </span>
              </div>
              <div className="text-xs sm:text-sm text-gray-800 pl-7">
                <MathText text={s.detail} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pedagogical Tip Box */}
      {tip && (
        <div className="p-3 bg-[#FFF9E6] border-2 border-black rounded flex items-start gap-2 text-xs font-bold text-black">
          <Sparkles className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
          <div>
            <span className="font-black">Lưu ý then chốt: </span>
            <MathText text={tip} />
          </div>
        </div>
      )}
    </div>
  );
};
