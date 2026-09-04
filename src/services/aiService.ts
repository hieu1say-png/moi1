/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - AI SERVICE (THẦY HIẾU AI 2.0 - SOCRATES TEXT-ONLY ENGINE)
 * Full client-side bridge for Socratic Dialogue, Diagnostic Guidance & KaTeX Formatting.
 */

import { QuestionIntelligenceService } from './ai/questionIntelligenceService';
import { SmartTutorContext, SmartTutorResponse } from '../../server/smartTutorEngine';

export class AiService {
  /**
   * Send a text message to Thầy Hiếu AI 2.0 (Socrates Method).
   * Ensures purely text-only interaction focusing on deep mathematical scaffolding.
   */
  static async askTutor(
    message: string,
    context: SmartTutorContext = {},
    level: number = 1,
    history: Array<{ role: string; content: string }> = []
  ): Promise<SmartTutorResponse> {
    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          context,
          feedbackLevel: level,
          history
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (err) {
      console.warn('Network call failed, falling back to local QuestionIntelligenceService:', err);
      const localResult = QuestionIntelligenceService.processQuery(message, context, level);

      return {
        reply: localResult.reply,
        message: localResult.reply,
        intent: localResult.intent,
        topic: localResult.topic,
        state: 'NORMAL',
        strategy: localResult.isQuickAnswer ? 'CONCEPT_EXPLANATION' : 'GUIDE',
        hintLevel: level,
        shouldRevealAnswer: level >= 5,
        highlightTarget: localResult.highlightTarget as any,
        quickReplies: localResult.quickReplies,
        timestamp: new Date().toISOString()
      };
    }
  }
}
