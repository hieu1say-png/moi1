/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - UNIVERSAL QUESTION RENDERER
 * Master UI Contract Enforcement Component.
 * Runs validateQuestionForRenderer(question) before rendering.
 * Strictly routes to:
 * - MultipleChoiceRenderer (MCQ)
 * - TrueFalseRenderer (TRUE_FALSE)
 * - ShortAnswerRenderer (SHORT_ANSWER)
 * - MultiPartRenderer (MULTI_SHORT_ANSWER)
 * - UnsupportedQuestionRenderer (UNSUPPORTED -> NEVER silent fallback)
 * - DataErrorQuestionRenderer (DATA_ERROR)
 */

import React, { useMemo } from 'react';
import { validateQuestionForRenderer, RendererValidationResult } from './validateQuestionForRenderer';
import { MultipleChoiceRenderer } from './MultipleChoiceRenderer';
import { TrueFalseRenderer } from './TrueFalseRenderer';
import { ShortAnswerRenderer } from './ShortAnswerRenderer';
import { MultiPartRenderer } from './MultiPartRenderer';
import { UnsupportedQuestionRenderer } from './UnsupportedQuestionRenderer';
import { DataErrorQuestionRenderer } from './DataErrorQuestionRenderer';
import { MathFormula, MathText, isValidDisplayFormula } from '../common/MathFormula';

export interface UniversalQuestionRendererProps {
  question: any;
  value?: any;
  onChange: (val: any) => void;
  disabled?: boolean;
  showFeedback?: boolean;
  correctAnswer?: any;
  showPromptHeader?: boolean;
  indexNumber?: number;
}

export const UniversalQuestionRenderer: React.FC<UniversalQuestionRendererProps> = ({
  question,
  value,
  onChange,
  disabled = false,
  showFeedback = false,
  correctAnswer,
  showPromptHeader = true,
  indexNumber
}) => {
  const validation: RendererValidationResult = useMemo(() => {
    return validateQuestionForRenderer(question);
  }, [question]);

  const qId = question?.id || question?.generatedId || question?.exerciseId || 'q-unknown';
  const qTitle = question?.title || `Câu ${indexNumber || 1}`;
  const promptText =
    question?.question ||
    question?.questionText ||
    question?.prompt ||
    question?.originalQuestion ||
    '';
  const latexEquation = question?.latexEquation || question?.latex || question?.formula;

  // 1. DATA_ERROR (e.g. empty prompt or missing object)
  if (!validation.valid && validation.normalizedType === 'DATA_ERROR') {
    return <DataErrorQuestionRenderer questionId={qId} errors={validation.errors} />;
  }

  // 2. UNSUPPORTED_QUESTION_TYPE (NO SILENT FALLBACK)
  if (!validation.valid && validation.normalizedType === 'UNSUPPORTED') {
    return (
      <UnsupportedQuestionRenderer
        questionId={qId}
        rawType={question?.type || question?.questionType || question?.sourceType}
      />
    );
  }

  // 3. Other Validation Errors
  if (!validation.valid) {
    return <DataErrorQuestionRenderer questionId={qId} errors={validation.errors} />;
  }

  // Render Prompt & Specific Contract Renderer
  return (
    <div id={`question-container-${qId}`} className="space-y-3">
      {/* Question Prompt Header */}
      {showPromptHeader && (
        <div className="space-y-2.5">
          {indexNumber !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-base font-black text-slate-900">
                Câu {indexNumber}: {qTitle}
              </span>
              {question?.pointsXp && (
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  +{question.pointsXp} XP
                </span>
              )}
            </div>
          )}

          <div className="gl-question-text">
            <MathText text={promptText} />
          </div>

          {isValidDisplayFormula(latexEquation) && (
            <div className="gl-formula-box font-mono text-sm sm:text-base">
              <MathFormula math={latexEquation} displayMode={true} />
            </div>
          )}
        </div>
      )}

      {/* Strict Type Dispatching */}
      {validation.normalizedType === 'MCQ' && (
        <MultipleChoiceRenderer
          questionId={qId}
          options={question.options || (question.interactiveVersion && question.interactiveVersion.options) || []}
          selectedOption={value}
          onSelectOption={onChange}
          disabled={disabled}
          showFeedback={showFeedback}
          correctOptionValue={correctAnswer || question.correctOptionIndex || question.correctAnswer}
        />
      )}

      {validation.normalizedType === 'TRUE_FALSE' && (
        <TrueFalseRenderer
          questionId={qId}
          statements={
            question.statements ||
            question.items ||
            (question.statement ? [question.statement] : [promptText])
          }
          answers={typeof value === 'object' && value !== null ? value : {}}
          onAnswerChange={(stId, verdict) => {
            const next = { ...(typeof value === 'object' && value !== null ? value : {}), [stId]: verdict };
            onChange(next);
          }}
          disabled={disabled}
          showFeedback={showFeedback}
        />
      )}

      {validation.normalizedType === 'SHORT_ANSWER' && (
        <ShortAnswerRenderer
          questionId={qId}
          value={typeof value === 'string' || typeof value === 'number' ? String(value) : ''}
          onChange={onChange}
          unit={question.unit || (question.imageSpec && question.imageSpec.dimensions && 'cm')}
          placeholder={question.placeholder || 'Nhập kết quả số...'}
          disabled={disabled}
          showFeedback={showFeedback}
          expectedAnswer={correctAnswer || question.expectedNumber || question.correctAnswer}
        />
      )}

      {validation.normalizedType === 'MULTI_SHORT_ANSWER' && (
        <MultiPartRenderer
          questionId={qId}
          parts={question.parts || question.subQuestions || question.questions || []}
          answers={typeof value === 'object' && value !== null ? value : {}}
          onAnswerChange={(partId, partVal) => {
            const next = { ...(typeof value === 'object' && value !== null ? value : {}), [partId]: partVal };
            onChange(next);
          }}
          disabled={disabled}
          showFeedback={showFeedback}
        />
      )}
    </div>
  );
};
