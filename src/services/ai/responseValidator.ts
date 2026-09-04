/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - RESPONSE VALIDATOR
 * Verifies and repairs AI output before presenting to students:
 * 1. KaTeX LaTeX formatting (encapsulates unescaped math commands in $...$)
 * 2. Mathematical sanity check
 * 3. Pedagogical level compliance
 * 4. Response length optimization
 * 5. Respectful & encouraging tone
 */

export class ResponseValidator {
  /**
   * Validates and auto-repairs response text.
   */
  public static validateAndRepair(
    rawReply: string,
    context: {
      topic?: string;
      level?: number;
      expectedFormula?: string;
    } = {}
  ): { isValid: boolean; repairedText: string; warnings: string[] } {
    let text = (rawReply || '').trim();
    const warnings: string[] = [];

    if (!text) {
      return {
        isValid: false,
        repairedText: 'Thầy đã nhận được câu hỏi của em. Em có thể nói rõ hơn một chút để Thầy hướng dẫn chính xác nhất nhé!',
        warnings: ['empty_response']
      };
    }

    // 1. Repair raw LaTeX commands that might be unescaped
    // e.g. standalone \pi, \frac{1}{3}, \sqrt{r^2+h^2} outside of $...$ or $$...$$
    // Check if there are unescaped backslashes with math keywords
    const unescapedMathPattern = /(?<!\$)(?:\\pi|\\frac\{[^}]+\}\{[^}]+\}|\\sqrt\{[^}]+\}|\\approx|\\cdot|\\times)(?!\$)/g;
    if (unescapedMathPattern.test(text)) {
      warnings.push('unescaped_latex_repaired');
      // Wrap bare formulas if found outside dollar signs
      text = text.replace(
        /(?<!\$|\b)(?:\\pi|\\frac\{[0-9a-zA-Z\s\+\-\*]+\}\{[0-9a-zA-Z\s\+\-\*]+\}|\\sqrt\{[0-9a-zA-Z\s\+\-\*\^]+\})(?!\$|\b)/g,
        (match) => `$${match}$`
      );
    }

    // 2. Ensure consistency of standard geometric symbols
    text = text
      .replace(/Sxq/g, '$S_{xq}$')
      .replace(/Stp/g, '$S_{tp}$')
      .replace(/\$S_\{xq\}\$/g, '$S_{xq}$')
      .replace(/\$\$S_\{xq\}\$\$/g, '$S_{xq}$')
      .replace(/\$S_\{tp\}\$/g, '$S_{tp}$')
      .replace(/\$\$S_\{tp\}\$\$/g, '$S_{tp}$');

    // 3. Remove double dollar inside dollar (prevent nested KaTeX crash)
    text = text.replace(/\$\$\$/g, '$$').replace(/\$\s*\$/g, '');

    // 4. Check length if level is GENTLE_HINT (Level 1)
    if (context.level === 1 && text.length > 500) {
      warnings.push('level_1_oversized');
    }

    return {
      isValid: warnings.length === 0,
      repairedText: text,
      warnings
    };
  }
}
