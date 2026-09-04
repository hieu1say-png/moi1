/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - STUDENT STATE DETECTOR
 * Classifies the student's affective and learning state to adapt tone and pedagogical scaffolding:
 * - CURIOUS, CONFIDENT, CONFUSED, STUCK, FRUSTRATED, PLAYFUL, UNCERTAIN, NEUTRAL
 */

import { StudentStateType } from '../../data/questionBank1000/types';

export class StudentStateDetector {
  public static detect(
    text: string,
    context: {
      wrongCount?: number;
      attemptCount?: number;
      timeSpent?: number;
      lastError?: string | null;
    } = {}
  ): StudentStateType {
    const clean = (text || '').toLowerCase().trim();

    // 1. Frustrated / Stuck
    if (
      clean.includes('không hiểu gì') ||
      clean.includes('chẳng hiểu') ||
      clean.includes('bó tay') ||
      clean.includes('khó quá') ||
      clean.includes('cứu em') ||
      clean.includes('mệt quá') ||
      clean.includes('chịu thua') ||
      (context.wrongCount !== undefined && context.wrongCount >= 3)
    ) {
      return (context.wrongCount && context.wrongCount >= 3) ? 'FRUSTRATED' : 'STUCK';
    }

    // 2. Confused
    if (
      clean.includes('sao lại') ||
      clean.includes('ủa') ||
      clean.includes('tại sao vậy') ||
      clean.includes('chưa hiểu') ||
      clean.includes('rối quá') ||
      clean.includes('lạ thế') ||
      clean.includes('nhầm')
    ) {
      return 'CONFUSED';
    }

    // 3. Confident
    if (
      clean.includes('em làm ra') ||
      clean.includes('em tính ra') ||
      clean.includes('chắc chắn') ||
      clean.includes('kết quả là') ||
      clean.includes('đúng không thầy') ||
      clean.includes('dễ ợt') ||
      clean.includes('xong rồi')
    ) {
      return 'CONFIDENT';
    }

    // 4. Curious
    if (
      clean.includes('tại sao') ||
      clean.includes('vì sao') ||
      clean.includes('nguồn gốc') ||
      clean.includes('lịch sử') ||
      clean.includes('chứng minh') ||
      clean.includes('khám phá') ||
      clean.includes('bí mật')
    ) {
      return 'CURIOUS';
    }

    // 5. Uncertain / Dependent on hint
    if (
      clean.includes('chắc là') ||
      clean.includes('hình như') ||
      clean.includes('có phải') ||
      clean.includes('gợi ý thôi') ||
      clean.includes('chỉ em một chút')
    ) {
      return 'UNCERTAIN';
    }

    // 6. Playful
    if (
      clean.includes('haha') ||
      clean.includes('hihi') ||
      clean.includes('thầy ơi') && clean.includes('thách') ||
      clean.includes('đố thầy')
    ) {
      return 'PLAYFUL';
    }

    return 'NEUTRAL';
  }
}
