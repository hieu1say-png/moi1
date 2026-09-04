/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - QUESTION UI CONTRACT ENFORCEMENT & VALIDATION
 * Strictly validates questions before rendering to prevent silent fallbacks and broken UI.
 */

export type QuestionRenderType = 'MCQ' | 'TRUE_FALSE' | 'SHORT_ANSWER' | 'MULTI_SHORT_ANSWER';

export interface RendererValidationResult {
  valid: boolean;
  normalizedType: QuestionRenderType | 'UNSUPPORTED' | 'DATA_ERROR';
  errors: string[];
  warnings: string[];
}

/**
 * Normalizes various raw type strings across legacy Exercise and Canonical1000Question schemas
 */
export function normalizeQuestionType(rawType: any): QuestionRenderType | 'UNSUPPORTED' {
  if (!rawType) return 'UNSUPPORTED';
  const t = String(rawType).toUpperCase().trim();

  if (t === 'MCQ' || t === 'MULTIPLE_CHOICE' || t === 'MULTIPLE-CHOICE' || t === 'CHOICE') {
    return 'MCQ';
  }
  if (t === 'TRUE_FALSE' || t === 'TRUE-FALSE' || t === 'TRUEFALSE' || t === 'BOOLEAN') {
    return 'TRUE_FALSE';
  }
  if (
    t === 'SHORT_ANSWER' ||
    t === 'SHORT-ANSWER' ||
    t === 'SHORTANSWER' ||
    t === 'NUMERIC' ||
    t === 'NUMERICAL' ||
    t === 'FILL_BLANK' ||
    t === 'FILL-BLANK'
  ) {
    return 'SHORT_ANSWER';
  }
  if (
    t === 'MULTI_SHORT_ANSWER' ||
    t === 'MULTI-SHORT-ANSWER' ||
    t === 'MULTISHORTANSWER' ||
    t === 'MULTI_PART' ||
    t === 'CHALLENGE' ||
    t === 'STRUCTURED'
  ) {
    return 'MULTI_SHORT_ANSWER';
  }

  // Explicitly unsupported interactive types that must not fall back silently
  // DRAG_DROP, MATCHING, SORTING, ORDERING, PAIRING, etc.
  return 'UNSUPPORTED';
}

/**
 * Validates a question against the Frontend Data Contract.
 * Render only when valid = true.
 */
export function validateQuestionForRenderer(question: any): RendererValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!question || typeof question !== 'object') {
    return {
      valid: false,
      normalizedType: 'DATA_ERROR',
      errors: ['Question object is null, undefined, or not an object.'],
      warnings: []
    };
  }

  // 1. Check Question Text / Prompt (NO SILENT EMPTY FAILURE)
  const promptText =
    question.question ||
    question.questionText ||
    question.prompt ||
    question.originalQuestion ||
    question.title ||
    '';

  if (!promptText || String(promptText).trim() === '') {
    errors.push('DATA_ERROR: Question prompt/questionText is empty.');
    return {
      valid: false,
      normalizedType: 'DATA_ERROR',
      errors,
      warnings
    };
  }

  // 2. Type Mapping & Unknown Type Check
  const rawType = question.type || question.questionType || question.sourceType;
  const normalizedType = normalizeQuestionType(rawType);

  if (normalizedType === 'UNSUPPORTED') {
    errors.push(
      `UNSUPPORTED_QUESTION_TYPE: The question type "${rawType}" is not supported by frontend renderers. Requires review (NEEDS_REVIEW).`
    );
    return {
      valid: false,
      normalizedType: 'UNSUPPORTED',
      errors,
      warnings
    };
  }

  // 3. Schema-Specific Contract Enforcement
  switch (normalizedType) {
    case 'MCQ': {
      const options =
        question.options ||
        (question.interactiveVersion && question.interactiveVersion.options);

      if (!options || !Array.isArray(options) || options.length < 2) {
        errors.push('MCQ Contract Violation: Must contain an "options" array with at least 2 options.');
      } else {
        // Check for duplicate options
        const unique = new Set(options.map((o: any) => (typeof o === 'object' ? o.text || o.value : String(o))));
        if (unique.size !== options.length) {
          warnings.push('MCQ Warning: Options contain duplicate values.');
        }
      }

      const hasCorrectAnswer =
        question.correctOptionId !== undefined ||
        question.correctOptionIndex !== undefined ||
        question.correctAnswer !== undefined ||
        question.expectedAnswer !== undefined ||
        (question.interactiveVersion && question.interactiveVersion.correctOptionIndex !== undefined);

      if (!hasCorrectAnswer) {
        errors.push('MCQ Contract Violation: Must specify correctOptionId, correctOptionIndex, or correctAnswer.');
      }
      break;
    }

    case 'TRUE_FALSE': {
      const statements =
        question.statements ||
        question.items ||
        (question.statement ? [question.statement] : null) ||
        (question.question ? [question.question] : null);

      const hasVerdict =
        question.correctVerdict !== undefined ||
        question.correctAnswers !== undefined ||
        question.correctAnswer !== undefined ||
        question.isTrue !== undefined;

      if (!statements || (Array.isArray(statements) && statements.length === 0)) {
        errors.push('TRUE_FALSE Contract Violation: Missing statements array or statement string.');
      }
      if (!hasVerdict) {
        errors.push('TRUE_FALSE Contract Violation: Missing correctVerdict or correctAnswers.');
      }
      break;
    }

    case 'SHORT_ANSWER': {
      const hasExpected =
        question.correctAnswer !== undefined ||
        question.expectedNumber !== undefined ||
        question.expectedAnswer !== undefined ||
        (question.interactiveVersion && question.interactiveVersion.expectedAnswer !== undefined) ||
        (question.interactiveVersion && question.interactiveVersion.expectedNumber !== undefined);

      if (!hasExpected) {
        errors.push('SHORT_ANSWER Contract Violation: Must contain correctAnswer, expectedNumber, or expectedAnswer.');
      }
      break;
    }

    case 'MULTI_SHORT_ANSWER': {
      const parts =
        question.parts ||
        question.subQuestions ||
        question.questions ||
        question.items;

      if (!parts || !Array.isArray(parts) || parts.length === 0) {
        errors.push('MULTI_SHORT_ANSWER Contract Violation: Must contain a non-empty "parts" or "subQuestions" array.');
      }
      break;
    }
  }

  return {
    valid: errors.length === 0,
    normalizedType,
    errors,
    warnings
  };
}
