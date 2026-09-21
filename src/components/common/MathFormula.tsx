/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CENTRAL MATHEMATICAL FORMULA & TYPOGRAPHY SYSTEM: MathFormula.tsx
 * - Standard KaTeX rendering with HTML + MathML output
 * - Canonical LaTeX normalization (S_{xq}, S_{tp}, V_{1}, V_{4}, \frac{1}{3}, \sqrt{...}, exponents, roots, percent escaping)
 * - normalizeMathText function for comprehensive LaTeX cleanup
 * - MathText component for seamless mixed text + inline math rendering
 * - MathFormula component for block and inline math display
 * - Zero raw LaTeX leakage, precise baseline alignment, responsive display
 */

import React, { useMemo } from 'react';
import katex from 'katex';

export interface MathFormulaProps {
  value?: string;
  formula?: string;
  math?: string;
  tex?: string;
  children?: React.ReactNode;
  display?: 'inline' | 'block';
  displayMode?: boolean;
  variant?: 'inline' | 'block';
  block?: boolean;
  inline?: boolean;
  className?: string;
}

export interface MathTextProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  inline?: boolean;
}

/**
 * Normalizes mixed text containing LaTeX, HTML entities, and formatting.
 * Preserves normal text and currencies while standardizing math syntax.
 */
export function normalizeMathText(input: string): string {
  if (!input || typeof input !== 'string') return '';
  let clean = input;

  // 1. Replace HTML entities and common tags
  clean = clean
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&bull;/g, '•')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&times;/g, '×')
    .replace(/&divide;/g, '÷')
    .replace(/&pi;/g, 'π')
    .replace(/&plusmn;/g, '±')
    .replace(/&le;/g, '≤')
    .replace(/&ge;/g, '≥')
    .replace(/&ne;/g, '≠')
    .replace(/&deg;/g, '°')
    .replace(/<\/?(strong|b)>/gi, '**')
    .replace(/<\/?(em|i)>/gi, '*');

  // 2. Standardize \dfrac to \frac
  clean = clean.replace(/\\dfrac\b/g, '\\frac');

  // 3. Normalize shorthand fractions inside math delimiters ($...$ or $$...$$)
  clean = clean.replace(/(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\$[^\$\n]+?\$|\\\([\s\S]*?\\\))/g, (match) => {
    return normalizeFormula(match);
  });

  // 4. Normalize un-bracketed \frac13, \frac12, \frac43, \frac23, \frac34 in plain text
  clean = clean
    .replace(/\\frac\s*1\s*3(?![0-9{])/g, '\\frac{1}{3}')
    .replace(/\\frac\s*1\s*2(?![0-9{])/g, '\\frac{1}{2}')
    .replace(/\\frac\s*4\s*3(?![0-9{])/g, '\\frac{4}{3}')
    .replace(/\\frac\s*2\s*3(?![0-9{])/g, '\\frac{2}{3}')
    .replace(/\\frac\s*3\s*4(?![0-9{])/g, '\\frac{3}{4}')
    .replace(/\\frac\s*([0-9a-zA-Z])\s*([0-9a-zA-Z])(?![a-zA-Z0-9{])/g, '\\frac{$1}{$2}')
    .replace(/\\frac\s*([0-9a-zA-Z])\s*\{([^}]+)\}/g, '\\frac{$1}{$2}')
    .replace(/\\frac\s*\{([^}]+)\}\s*([0-9a-zA-Z])(?![a-zA-Z0-9{])/g, '\\frac{$1}{$2}');

  // 4. Normalize shorthand \sqrt x -> \sqrt{x}
  clean = clean.replace(/\\sqrt\s+([a-zA-Z0-9])(?![a-zA-Z0-9{])/g, '\\sqrt{$1}');

  return clean;
}

/**
 * Validates a LaTeX formula string and returns normalized canonical output
 */
export function validateLatexFormula(formula: string): {
  valid: boolean;
  normalized: string;
  error?: string;
} {
  if (!formula || typeof formula !== 'string') {
    return { valid: false, normalized: '', error: 'Empty formula input' };
  }

  const normalized = normalizeFormula(formula);
  if (!normalized) {
    return { valid: false, normalized: '', error: 'Formula resolved to empty after normalization' };
  }

  try {
    katex.renderToString(normalized, {
      displayMode: false,
      throwOnError: true,
      strict: false,
      trust: true
    });
    return { valid: true, normalized };
  } catch (err: any) {
    return { valid: false, normalized, error: err?.message || 'KaTeX parsing failure' };
  }
}

export interface MathValidationResult {
  valid: boolean;
  normalized: string;
  status: 'APPROVED' | 'NEEDS_REVIEW';
  error?: string;
  errors?: string[];
}

/**
 * Validates mixed text containing LaTeX formulas, checking delimiters,
 * brace matching, fraction syntax, and KaTeX compatibility.
 * Returns status APPROVED or NEEDS_REVIEW.
 */
export function validateMathText(input: string): MathValidationResult {
  if (!input || typeof input !== 'string') {
    return { valid: true, normalized: '', status: 'APPROVED' };
  }

  const errors: string[] = [];
  const normalized = normalizeMathText(input);

  // 1. Check matching delimiters ($...$)
  const unescapedDollar = normalized.replace(/\\\$/g, '');
  const dollarCount = (unescapedDollar.match(/\$/g) || []).length;
  if (dollarCount % 2 !== 0) {
    errors.push('Unbalanced math delimiter ($ count is odd)');
  }

  // 2. Extract math chunks and validate braces + KaTeX parsing
  const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\$[^\$\n]+?\$|\\\([\s\S]*?\\\))/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(normalized)) !== null) {
    const rawChunk = match[0];
    let mathInner = rawChunk;
    if (mathInner.startsWith('$$') && mathInner.endsWith('$$')) {
      mathInner = mathInner.slice(2, -2);
    } else if (mathInner.startsWith('$') && mathInner.endsWith('$')) {
      mathInner = mathInner.slice(1, -1);
    } else if (mathInner.startsWith('\\[') && mathInner.endsWith('\\]')) {
      mathInner = mathInner.slice(2, -2);
    } else if (mathInner.startsWith('\\(') && mathInner.endsWith('\\)')) {
      mathInner = mathInner.slice(2, -2);
    }

    // Check balanced curly braces
    const openBraces = (mathInner.match(/\{/g) || []).length;
    const closeBraces = (mathInner.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      errors.push(`Unbalanced curly braces in formula: "${mathInner}"`);
    }

    // Test KaTeX parsing
    try {
      katex.renderToString(mathInner.trim(), {
        displayMode: false,
        throwOnError: true,
        strict: false,
        trust: true
      });
    } catch (err: any) {
      errors.push(`KaTeX syntax error in "${mathInner}": ${err?.message || 'Invalid syntax'}`);
    }
  }

  // 3. Check for unclosed / malformed \frac or \sqrt outside delimiters
  const plainTextWithoutMath = normalized.replace(regex, '');
  if (/\\frac(?!\s*\{)/.test(plainTextWithoutMath)) {
    errors.push('Unenclosed or malformed \\frac outside math delimiters');
  }

  const isValid = errors.length === 0;
  return {
    valid: isValid,
    normalized,
    status: isValid ? 'APPROVED' : 'NEEDS_REVIEW',
    error: errors.length > 0 ? errors.join('; ') : undefined,
    errors: errors.length > 0 ? errors : undefined
  };
}

/**
 * Checks if a string is a valid mathematical formula rather than internal metadata or archetype IDs.
 */
export function isValidDisplayFormula(input: any): boolean {
  if (!input || typeof input !== 'string') return false;
  const s = input.trim();
  if (s.length === 0) return false;
  
  // Rejects uppercase archetype IDs, formula tags, or system metadata
  if (/^[A-Z0-9_-]+$/.test(s)) return false;
  if (/^(SPHERE|CYLINDER|CONE|ARCH|LEVEL|SRC|GL|VAR|MCQ|PDF)_/i.test(s)) return false;
  
  // Must contain valid mathematical operator or LaTeX command
  const hasMath = /[=\\+\-*/^_{}()\\]/.test(s) || /\\(frac|pi|sqrt|times|cdot|approx|implies|le|ge|circ)/.test(s);
  return hasMath;
}

/**
 * Sanitizes and cleans question statements, stripping formula placeholders,
 * fixing double backslashes, normalizing LaTeX units, and preventing metadata leakage.
 */
export function sanitizeQuestionText(input: string): string {
  if (!input || typeof input !== 'string') return '';
  let clean = input;

  // 1. Remove leaked metadata archetype tags if present
  clean = clean.replace(/\b(SPHERE|CYLINDER|CONE|ARCH)_[A-Z0-9_]+\b/g, '');

  // 2. Fix double escaping of LaTeX commands: \\\\text -> \\text, \\text{text{ -> \\text{
  clean = clean.replace(/\\\\([a-zA-Z]+)/g, '\\$1');
  clean = clean.replace(/\\text\{\s*text\{([^}]+)\}\}/g, '\\text{$1}');
  clean = clean.replace(/\\text\{\\text\{([^}]+)\}\}/g, '\\text{$1}');

  // 3. Fix nested or broken delimiters: $$...$$ inside $
  clean = clean.replace(/\$\$([^$]+)\$\$/g, '$$$1$$');

  return clean.trim();
}

/**
 * Validates and cleans raw LaTeX expressions
 */
export function sanitizeLatex(input: string): string {
  if (!input || typeof input !== 'string') return '';
  let clean = input.trim();
  
  // Remove wrapping delimiters
  if (clean.startsWith('$$') && clean.endsWith('$$') && clean.length >= 4) {
    clean = clean.slice(2, -2).trim();
  } else if (clean.startsWith('$') && clean.endsWith('$') && clean.length >= 2) {
    clean = clean.slice(1, -1).trim();
  }

  // Remove nested \text{text{...}}
  clean = clean.replace(/\\text\{\s*text\{([^}]+)\}\}/g, '\\text{$1}');
  clean = clean.replace(/\\text\{\\text\{([^}]+)\}\}/g, '\\text{$1}');
  
  return clean;
}

/**
 * Normalizes any formula string into canonical LaTeX.
 * Handles pseudo-text (Sxq, Stp, V1, V4, V_đất, 4/3, sqrt, shorthand fractions \frac13, unescaped %) without corrupting existing LaTeX commands.
 */
export function normalizeFormula(input: string): string {
  if (!input) return '';
  let clean = input.trim();

  // If input is purely metadata (e.g. SPHERE_AREA_A), do NOT treat it as a mathematical formula
  if (/^[A-Z0-9_-]+$/.test(clean) && /^(SPHERE|CYLINDER|CONE|ARCH)_/i.test(clean)) {
    return '';
  }

  // Strip wrapping $ or $$ or \[ \] or \( \) if caller provided them
  if (clean.startsWith('$$') && clean.endsWith('$$') && clean.length >= 4) {
    clean = clean.slice(2, -2).trim();
  } else if (clean.startsWith('$') && clean.endsWith('$') && clean.length >= 2) {
    clean = clean.slice(1, -1).trim();
  } else if (clean.startsWith('\\[') && clean.endsWith('\\]') && clean.length >= 4) {
    clean = clean.slice(2, -2).trim();
  } else if (clean.startsWith('\\(') && clean.endsWith('\\)') && clean.length >= 4) {
    clean = clean.slice(2, -2).trim();
  }

  // Fix accidental nested \text{text{...}} or \text{\text{...}}
  clean = clean.replace(/\\text\{\s*text\{([^}]+)\}\}/g, '\\text{$1}');
  clean = clean.replace(/\\text\{\\text\{([^}]+)\}\}/g, '\\text{$1}');

  // Fix double backslashes before known LaTeX commands: \\pi -> \pi, \\frac -> \frac, \\text -> \text
  clean = clean.replace(/\\\\([a-zA-Z]+)/g, '\\$1');

  // Standardize shorthand fractions \frac13 -> \frac{1}{3}, \frac12 -> \frac{1}{2}, etc.
  clean = clean
    .replace(/\\frac\s*1\s*3(?![0-9{])/g, '\\frac{1}{3}')
    .replace(/\\frac\s*1\s*2(?![0-9{])/g, '\\frac{1}{2}')
    .replace(/\\frac\s*4\s*3(?![0-9{])/g, '\\frac{4}{3}')
    .replace(/\\frac\s*2\s*3(?![0-9{])/g, '\\frac{2}{3}')
    .replace(/\\frac\s*3\s*4(?![0-9{])/g, '\\frac{3}{4}')
    .replace(/\\frac\s*([0-9a-zA-Z])\s*([0-9a-zA-Z])(?![a-zA-Z0-9{])/g, '\\frac{$1}{$2}')
    .replace(/\\frac\s*([0-9a-zA-Z])\s*\{([^}]+)\}/g, '\\frac{$1}{$2}')
    .replace(/\\frac\s*\{([^}]+)\}\s*([0-9a-zA-Z])(?![a-zA-Z0-9{])/g, '\\frac{$1}{$2}');

  // Standardize shorthand square roots: \sqrt x -> \sqrt{x}
  clean = clean.replace(/\\sqrt\s+([a-zA-Z0-9])(?![a-zA-Z0-9{])/g, '\\sqrt{$1}');

  // Fix unescaped percentage signs: "100%" -> "100\\%" (prevent KaTeX treating % as LaTeX comment delimiter)
  clean = clean.replace(/(?<!\\)%/g, '\\%');

  // Canonical replacements for standard symbols
  clean = clean
    .replace(/·/g, ' \\cdot ')
    .replace(/×/g, ' \\times ')
    .replace(/≈/g, ' \\approx ')
    .replace(/≤/g, ' \\le ')
    .replace(/≥/g, ' \\ge ')
    .replace(/≠/g, ' \\ne ')
    .replace(/±/g, ' \\pm ')
    .replace(/−/g, ' - ')
    .replace(/π/g, '\\pi ')
    // Unicode superscripts & subscripts
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/⁴/g, '^4')
    .replace(/₁/g, '_1')
    .replace(/₂/g, '_2')
    .replace(/₃/g, '_3')
    .replace(/₄/g, '_4')
    // Unicode arrows & implication
    .replace(/⇒/g, ' \\implies ')
    .replace(/→/g, ' \\to ')
    // Square roots from text
    .replace(/√\s*\(([^)]+)\)/g, '\\sqrt{$1}')
    .replace(/√\s*([a-zA-Z0-9^_+]+)/g, '\\sqrt{$1}')
    .replace(/sqrt\(([^)]+)\)/gi, '\\sqrt{$1}')
    // Degree symbols: e.g. 60° or 60 độ -> 60^\circ
    .replace(/(\d+)\s*°/g, '$1^\\circ')
    // Specific geometric surface area & volume subscripts
    .replace(/\bSxq\b/g, 'S_{xq}')
    .replace(/\bStp\b/g, 'S_{tp}')
    .replace(/\bSđáy\b/gi, 'S_{\\text{đáy}}')
    .replace(/\bSday\b/gi, 'S_{\\text{đáy}}')
    .replace(/\bS_day\b/gi, 'S_{\\text{đáy}}')
    .replace(/\bS_đáy\b/gi, 'S_{\\text{đáy}}')
    .replace(/\bV1\b/g, 'V_1')
    .replace(/\bV2\b/g, 'V_2')
    .replace(/\bV3\b/g, 'V_3')
    .replace(/\bV4\b/g, 'V_4')
    .replace(/\bV_1\b/g, 'V_1')
    .replace(/\bV_2\b/g, 'V_2')
    .replace(/\bV_3\b/g, 'V_3')
    .replace(/\bV_4\b/g, 'V_4')
    .replace(/\bR1\b/g, 'R_1')
    .replace(/\bR2\b/g, 'R_2')
    .replace(/\br1\b/g, 'r_1')
    .replace(/\br2\b/g, 'r_2')
    .replace(/\bh1\b/g, 'h_1')
    .replace(/\bh2\b/g, 'h_2')
    .replace(/\bl1\b/g, 'l_1')
    .replace(/\bl2\b/g, 'l_2')
    .replace(/\bV_đất\b/gi, 'V_{\\text{đất}}')
    .replace(/\bV_hộp\b/gi, 'V_{\\text{hộp}}')
    .replace(/\bV_trụ\b/gi, 'V_{\\text{trụ}}')
    .replace(/\bV_nón\b/gi, 'V_{\\text{nón}}')
    .replace(/\bV_cầu\b/gi, 'V_{\\text{cầu}}')
    .replace(/\bV_nước\b/gi, 'V_{\\text{nước}}')
    .replace(/\bVđất\b/gi, 'V_{\\text{đất}}')
    .replace(/\bVhộp\b/gi, 'V_{\\text{hộp}}')
    .replace(/\bVtru\b/gi, 'V_{\\text{trụ}}')
    .replace(/\bVnon\b/gi, 'V_{\\text{nón}}')
    .replace(/\bVcau\b/gi, 'V_{\\text{cầu}}')
    .replace(/\bVnuoc\b/gi, 'V_{\\text{nước}}');

  // Safely replace unit representations if NOT already preceded by \text{
  clean = clean
    .replace(/(?<!\\text\{\s*)cm\^3/g, '\\text{cm}^3')
    .replace(/(?<!\\text\{\s*)cm\^2/g, '\\text{cm}^2')
    .replace(/(?<!\\text\{\s*)dm\^3/g, '\\text{dm}^3')
    .replace(/(?<!\\text\{\s*)m\^3/g, '\\text{m}^3')
    .replace(/(?<!\\text\{\s*)m\^2/g, '\\text{m}^2')
    .replace(/(?<!\\text\{\s*)cm3\b/g, '\\text{cm}^3')
    .replace(/(?<!\\text\{\s*)cm2\b/g, '\\text{cm}^2')
    .replace(/(?<!\\text\{\s*)mm3\b/g, '\\text{mm}^3')
    .replace(/(?<!\\text\{\s*)mm2\b/g, '\\text{mm}^2');

  // Plain text fractions e.g. 1/3, 4/3
  clean = clean
    .replace(/\b1\/3\b/g, '\\frac{1}{3}')
    .replace(/\b2\/3\b/g, '\\frac{2}{3}')
    .replace(/\b4\/3\b/g, '\\frac{4}{3}')
    .replace(/\b1\/2\b/g, '\\frac{1}{2}')
    .replace(/\b3\/4\b/g, '\\frac{3}{4}')
    .replace(/\bd\/2\b/g, '\\frac{d}{2}');

  // Final cleanup of any duplicated \text{\text{...}}
  clean = clean.replace(/\\text\{\s*\\text\{([^}]+)\}\}/g, '\\text{$1}');
  clean = clean.replace(/\\text\{\s*text\{([^}]+)\}\}/g, '\\text{$1}');

  return clean;
}

/**
 * Convert canonical formula to clean LaTeX string for export / MathType
 */
export function formulaToLatex(formula: string): string {
  return normalizeFormula(formula);
}

/**
 * Convert canonical formula to MathML string for Word / MathType import
 */
export function formulaToMathML(formula: string, displayMode = false): string {
  try {
    const norm = normalizeFormula(formula);
    return katex.renderToString(norm, {
      displayMode,
      throwOnError: false,
      strict: false,
      trust: true,
      output: 'mathml'
    });
  } catch (err) {
    console.warn('Failed to convert formula to MathML:', err);
    return `<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mtext>${formula}</mtext></mrow></math>`;
  }
}

/**
 * Render a single pure LaTeX string using KaTeX
 */
export function renderKatexToString(latexStr: string, isDisplay: boolean): string {
  try {
    const clean = normalizeFormula(latexStr);

    return katex.renderToString(clean, {
      displayMode: isDisplay,
      throwOnError: false,
      strict: false,
      trust: true,
      output: 'htmlAndMathml'
    });
  } catch {
    return `<span class="katex-error">${latexStr}</span>`;
  }
}

/**
 * Helper to determine if a string is purely a mathematical expression
 * rather than a natural language Vietnamese sentence.
 */
function isPureFormulaString(str: string): boolean {
  if (!str) return false;
  const trimmed = str.trim();
  // Reject pure uppercase metadata identifiers (e.g. SPHERE_AREA_A)
  if (/^[A-Z0-9_-]+$/.test(trimmed) && /^(SPHERE|CYLINDER|CONE|ARCH|LEVEL|SRC|GL|VAR|MCQ)_/i.test(trimmed)) {
    return false;
  }
  // Remove \text{...} blocks before inspecting natural language
  const stripped = trimmed.replace(/\\text\{[^{}]*\}/g, '').trim();
  const hasVietnameseOutsideText = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(stripped);
  if (hasVietnameseOutsideText) return false;

  const hasMathIndicators = /[\\^_{}=*/√π²³⁴₁₂₃₄+<>]/.test(trimmed) || /\b(?:V|S|r|h|l|R|d|Stp|Sxq|C|cm|m)\b/.test(trimmed);
  return hasMathIndicators;
}

/**
 * Helper to parse bold markdown **text** and newlines in explanation strings
 */
function renderFormattedText(text: string, keyPrefix: string): React.ReactNode {
  if (!text) return null;

  // Split by newline to preserve step lines and paragraph spacing
  const lines = text.split('\n');

  return (
    <>
      {lines.map((line, lineIdx) => {
        if (!line.trim() && lineIdx > 0 && lineIdx < lines.length - 1) {
          return <span key={`${keyPrefix}-gap-${lineIdx}`} className="block h-2" />;
        }

        // Parse **bold** markdown
        const boldRegex = /\*\*(.*?)\*\*/g;
        const parts: React.ReactNode[] = [];
        let lastIdx = 0;
        let match: RegExpExecArray | null;
        let partIdx = 0;

        while ((match = boldRegex.exec(line)) !== null) {
          if (match.index > lastIdx) {
            parts.push(
              <span key={`${keyPrefix}-p-${lineIdx}-${partIdx++}`} className="font-normal">
                {line.slice(lastIdx, match.index)}
              </span>
            );
          }
          parts.push(
            <strong
              key={`${keyPrefix}-b-${lineIdx}-${partIdx++}`}
              className="font-semibold"
            >
              {match[1]}
            </strong>
          );
          lastIdx = boldRegex.lastIndex;
        }

        if (lastIdx < line.length) {
          parts.push(
            <span key={`${keyPrefix}-p-${lineIdx}-${partIdx++}`} className="font-normal">
              {line.slice(lastIdx)}
            </span>
          );
        }

        return (
          <React.Fragment key={`${keyPrefix}-line-${lineIdx}`}>
            {lineIdx > 0 && <br />}
            {parts}
          </React.Fragment>
        );
      })}
    </>
  );
}

/**
 * Splits mixed text containing $...$ or $$...$$ or \[...\] or \(...\) or raw LaTeX snippets into rendered tokens
 */
export function parseMixedContent(content: string, defaultDisplay: boolean): React.ReactNode {
  if (!content) return null;

  // Step 1: Pre-process with normalizeMathText to clean tags and shorthand fractions
  const preprocessed = normalizeMathText(content);

  // Step 2: If the entire content is already a pure formula string (e.g. "V = \frac{4}{3}\pi R^3"), render directly
  if (isPureFormulaString(preprocessed)) {
    const html = renderKatexToString(preprocessed, defaultDisplay);
    return (
      <span
        className={
          defaultDisplay
            ? 'block-math my-2 text-center overflow-x-auto max-w-full'
            : 'inline-math align-baseline'
        }
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  // Step 3: Tokenize based on explicit standard delimiters ($...$, $$...$$, \[...\], \(...\))
  interface Token {
    type: 'text' | 'math';
    value: string;
    isBlock?: boolean;
  }

  const tokens: Token[] = [];
  const delimiterRegex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\$[^\$\n]+?\$|\\\([\s\S]*?\\\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = delimiterRegex.exec(preprocessed)) !== null) {
    const matchStart = match.index;
    const matchEnd = delimiterRegex.lastIndex;

    if (matchStart > lastIndex) {
      tokens.push({ type: 'text', value: preprocessed.slice(lastIndex, matchStart) });
    }

    const rawMatch = match[0];
    const isBlock = rawMatch.startsWith('$$') || rawMatch.startsWith('\\[');
    const inner = isBlock
      ? rawMatch.slice(2, -2)
      : (rawMatch.startsWith('\\(') ? rawMatch.slice(2, -2) : rawMatch.slice(1, -1));

    tokens.push({ type: 'math', value: inner, isBlock: isBlock || defaultDisplay });
    lastIndex = matchEnd;
  }

  if (lastIndex < preprocessed.length) {
    tokens.push({ type: 'text', value: preprocessed.slice(lastIndex) });
  }

  // Step 4: For text tokens, detect any un-delimited raw LaTeX commands or math fragments (e.g. \frac, \dfrac, \sqrt, \pi, r^2, cm^3)
  const refinedTokens: Token[] = [];
  const rawLatexRegex = /(\\(?:d?frac\{[^{}]*\}\{[^{}]*\}|sqrt(?:\[[^\]]*\])?\{[^{}]*\}|pi\b|approx\b|times\b|cdot\b|le\b|ge\b|ne\b|pm\b|implies\b|to\b|circ\b|text\{[^{}]*\}|alpha\b|beta\b|theta\b|infty\b)|(?:[rRhldSVA-Z]\^[0-9]+)|(?:(?:cm|dm|m|mm)\^[23]))/g;

  for (const token of tokens) {
    if (token.type === 'math') {
      refinedTokens.push(token);
    } else {
      const rawText = token.value;
      let textLastIdx = 0;
      let rawMatch: RegExpExecArray | null;

      while ((rawMatch = rawLatexRegex.exec(rawText)) !== null) {
        const rStart = rawMatch.index;
        const rEnd = rawLatexRegex.lastIndex;

        if (rStart > textLastIdx) {
          refinedTokens.push({ type: 'text', value: rawText.slice(textLastIdx, rStart) });
        }

        refinedTokens.push({ type: 'math', value: rawMatch[0], isBlock: false });
        textLastIdx = rEnd;
      }

      if (textLastIdx < rawText.length) {
        refinedTokens.push({ type: 'text', value: rawText.slice(textLastIdx) });
      }
    }
  }

  // Step 5: Render all refined tokens into React nodes
  let keyIdx = 0;
  return (
    <>
      {refinedTokens.map((tok) => {
        if (tok.type === 'math') {
          const renderedHtml = renderKatexToString(tok.value, tok.isBlock || defaultDisplay);
          return (
            <span
              key={`math-${keyIdx++}`}
              className={
                tok.isBlock
                  ? 'block-math my-2 text-center overflow-x-auto max-w-full'
                  : 'inline-math align-baseline'
              }
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            />
          );
        }

        // Text token with markdown bold and linebreaks
        return (
          <span key={`txt-${keyIdx++}`} className="font-normal">
            {renderFormattedText(tok.value, `seg-${keyIdx}`)}
          </span>
        );
      })}
    </>
  );
}

/**
 * Dedicated MathText Component
 * Renders paragraphs, question statements, given data items, hints, and explanations
 * with seamless mixed text, inline KaTeX math, and display KaTeX math.
 */
export const MathText: React.FC<MathTextProps> = ({
  text,
  children,
  className = '',
  inline = true
}) => {
  const content = text ?? (typeof children === 'string' ? children : '');
  const rendered = useMemo(() => {
    if (typeof content === 'string' && content.length > 0) {
      return parseMixedContent(content, false);
    }
    return children || null;
  }, [content, children]);

  if (!rendered) return null;

  return (
    <span
      className={`math-text ${
        inline ? 'inline' : 'inline-block'
      } text-left leading-relaxed text-[#3A302B] ${className}`}
    >
      {rendered}
    </span>
  );
};

/**
 * Universal MathFormula Component
 * Supports value, formula, math, children props and inline/block display
 */
export const MathFormula: React.FC<MathFormulaProps> = ({
  value,
  formula,
  math,
  tex,
  children,
  display,
  displayMode = false,
  variant,
  block = false,
  inline = false,
  className = ''
}) => {
  const isDisplay = !inline && (display === 'block' || variant === 'block' || displayMode || block);
  const rawString = value ?? formula ?? math ?? tex ?? (typeof children === 'string' ? children : '');

  const rendered = useMemo(() => {
    if (typeof rawString === 'string' && rawString.length > 0) {
      // If the string contains explicit delimiters or mixed text, parse mixed content
      if (rawString.includes('$') || rawString.includes('\\[') || rawString.includes('\\(')) {
        return parseMixedContent(rawString, isDisplay);
      }
      // Otherwise MathFormula directly renders the formula with KaTeX
      const html = renderKatexToString(rawString, isDisplay);
      return (
        <span
          className={
            isDisplay
              ? 'block-math my-2 text-center text-[#2E2926] overflow-x-auto max-w-full'
              : 'inline-math align-baseline text-[#2E2926]'
          }
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }
    return children || null;
  }, [rawString, isDisplay, children]);

  if (!rendered) return null;

  return (
    <span
      className={`math-formula-wrapper text-[#3A302B] ${
        isDisplay
          ? 'block my-2 text-center overflow-x-auto py-1.5'
          : 'inline align-baseline'
      } ${className}`}
    >
      {rendered}
    </span>
  );
};

/**
 * Convenient InlineMath component
 */
export const InlineMath: React.FC<{
  value?: string;
  math?: string;
  formula?: string;
  children?: React.ReactNode;
  className?: string;
}> = ({
  value,
  math,
  formula,
  children,
  className = ''
}) => (
  <MathFormula
    display="inline"
    variant="inline"
    displayMode={false}
    value={value}
    math={math}
    formula={formula}
    className={className}
  >
    {children}
  </MathFormula>
);

/**
 * Convenient BlockMath component
 */
export const BlockMath: React.FC<{
  value?: string;
  math?: string;
  formula?: string;
  children?: React.ReactNode;
  className?: string;
}> = ({
  value,
  math,
  formula,
  children,
  className = ''
}) => (
  <MathFormula
    display="block"
    variant="block"
    displayMode={true}
    value={value}
    math={math}
    formula={formula}
    className={className}
  >
    {children}
  </MathFormula>
);

export default MathFormula;

