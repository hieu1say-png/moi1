/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - CONTEXT-AWARE SMART AI TUTOR ENGINE (THẦY HIẾU AI) (V5.0)
 * Upgraded Full-Stack Architecture:
 * 1. QuestionNormalizer: Vietnamese diacritics & slang normalization
 * 2. QuestionIntentRouter: Canonical Topic, Intent (19 types), Sub-intent, Confidence
 * 3. 1,000 Question Bank Search & Matcher: Sub-millisecond Inverted Index lookup
 * 4. MathEngine: Deterministic geometric validation & error diagnosis
 * 5. ErrorDetector: 16 Mathematical Misconceptions
 * 6. StudentStateDetector: Affective state
 * 7. PedagogicalEngine: 5 Scaffolding Levels (1: Hint -> 2: Socratic -> 3: Formula -> 4: Steps -> 5: Solution)
 * 8. ResponseValidator: KaTeX LaTeX syntax guarantee & Anti-hallucination
 * 9. QuickReplyEngine: Interactive suggestions
 * 10. Gemini 3.7 Flash: Structured Prompt for complex/personalized derivations
 */

import { GoogleGenAI } from '@google/genai';
import { QuestionNormalizer } from '../src/services/ai/questionNormalizer';
import { QuestionIntentRouter, QuestionRouterResult, RouterContext } from '../src/services/ai/questionIntentRouter';
import { QuestionMatcher } from '../src/services/ai/questionMatcher';
import { MathEngine, MathDiagnosisResult } from './mathEngine';
import { PedagogicalEngine } from '../src/services/ai/pedagogicalEngine';
import { ResponseValidator } from '../src/services/ai/responseValidator';
import { QuickReplyEngine } from '../src/services/ai/quickReplyEngine';
import { QuestionRecord, QuickReplyOption } from '../src/data/questionBank1000/types';

export type ResponseStrategy =
  | 'GUIDE'
  | 'QUESTION_BACK'
  | 'VISUAL_PROMPT'
  | 'FORMULA_REMINDER'
  | 'STEP_BY_STEP'
  | 'ERROR_CORRECTION'
  | 'CONCEPT_EXPLANATION'
  | 'REAL_WORLD_LINK'
  | 'MINI_CHALLENGE'
  | 'FULL_SOLUTION'
  | 'ENCOURAGE'
  | 'ASK_CLARIFICATION';

export type HighlightTarget =
  | 'radius'
  | 'diameter'
  | 'height'
  | 'generatrix'
  | 'axis'
  | 'center'
  | 'base'
  | 'section'
  | 'water'
  | 'waterLevel'
  | 'cone'
  | 'cylinder'
  | 'sphere'
  | 'unfold'
  | 'sectorArc'
  | null;

export interface SmartTutorContext extends RouterContext {
  studentId?: string;
  studentName?: string;
  className?: string;
  grade?: string | number;
  currentShape?: string;
  currentMode?: string;
  currentActivity?: string;
  currentPage?: string;
  currentTopic?: string;
  questionId?: string | null;
  questionText?: string | null;
  userAnswer?: string | number | Record<string, any> | null;
  studentAnswer?: string | number | null;
  expectedAnswer?: string | number | null;
  attemptCount?: number;
  wrongCount?: number;
  hintUsed?: any[];
  currentHintLevel?: number;
  currentR?: number | null;
  currentH?: number | null;
  currentL?: number | null;
  pourCount?: number | null;
  cylinderFill?: number | null;
  coneFill?: number | null;
  predictionAnswer?: string | number | null;
  lastAction?: string | null;
  lastError?: string | null;
  timeSpent?: number;
  completed?: boolean;
}

export interface SmartTutorResponse {
  reply: string;
  message: string;
  intent: string;
  secondaryIntents?: string[];
  topic: string;
  state: string;
  strategy: ResponseStrategy;
  errorDiagnosis?: string;
  hintLevel: number;
  shouldRevealAnswer: boolean;
  highlightTarget: HighlightTarget;
  nextAction?: { text: string; actionType?: string } | string | null;
  quickReplies?: QuickReplyOption[];
  matchedQuestionIds?: string[];
  timestamp: string;
}

/**
 * Builds the comprehensive "Thầy Hiếu AI" System Instruction with 3D context.
 */
function buildThầyHiếuSystemPrompt(
  routerResult: QuestionRouterResult,
  hintLevel: number,
  context: SmartTutorContext,
  shouldRevealAnswer: boolean,
  matchedRecords: QuestionRecord[]
): string {
  const shape = context.currentShape || routerResult.topic.toLowerCase();
  const shapeName = shape.includes('cylinder') ? 'Hình Trụ' : shape.includes('cone') ? 'Hình Nón' : shape.includes('sphere') ? 'Hình Cầu' : 'Hình Không Gian';

  const matchedSnippets = matchedRecords
    .slice(0, 3)
    .map((m, idx) => `[Mẫu ${idx + 1} (${m.id})]: Câu hỏi: "${m.question}" => Lời giải chuẩn: "${m.shortAnswer}"`)
    .join('\n');

  return `Bạn là "Thầy Hiếu AI 2.0" – Chuyên gia Sư phạm Toán 9 & Trợ lý Gia sư Hình Học Không Gian (Phương pháp Gợi mở Socrates - Socrates Method).

NGUYÊN TẮC CỐT LÕI CỦA THẦY HIẾU AI 2.0 (SOCRATES METHOD):
1. TUYỆT ĐỐI KHÔNG GIẢI HỘ NGAY, KHÔNG ĐƯA ĐÁP SỐ CUỐI CÙNG ở các lượt tương tác thông thường (Level 1-4).
2. DẪN DẮT BẰNG CÂU HỎI GỢI MỞ: Chia nhỏ bài toán thành các câu hỏi phụ để học sinh tự kích hoạt tư duy (ví dụ: "Đề bài cho đường kính d = 10 cm, vậy bước đầu tiên em cần đổi sang bán kính r bằng bao nhiêu?").
3. CHẨN ĐOÁN LỖI SAI CHÍNH XÁC TỨC THÌ:
   - Nếu học sinh nhầm đường kính và bán kính: nhắc nhẹ "Chú ý đề bài cho đường kính d hay bán kính r nhé!".
   - Nếu học sinh tính thể tích nón/cầu quên hệ số 1/3 hoặc 4/3: nhắc kiểm tra lại công thức chuẩn.
   - Nếu học sinh quên đổi đơn vị (ví dụ dm³ sang lít hay cm³ sang lít): chỉ ra ngay vị trí chưa đồng nhất đơn vị.
4. GIAO TIẾP TEXT-ONLY CHUẨN MỰC & TRUYỀN CẢM HỨNG:
   - Thân thiện, gần gũi, xưng "Thầy" và gọi "em".
   - Khẩu ngữ: "Cùng Thầy gỡ từng nút thắt nhé!", "Em quan sát rất tốt, chỉ cần thêm 1 bước nhỏ thôi!".
5. CÔNG THỨC TOÁN CHUẨN KATEX:
   - Mọi biến số, biểu thức, công thức PHẢI được bọc trong $...$ (inline) hoặc $$...$$ (block).
   - Ví dụ: $V = \\pi r^2 h$, $l = \\sqrt{r^2 + h^2}$, $S = 4\\pi R^2$.

KẾT QUẢ ĐIỀU HƯỚNG TỪ QUESTION INTELLIGENCE ENGINE:
- Ý định chính (Intent): ${routerResult.intent}
- Chủ đề toán học (Topic): ${routerResult.topic}
- Trạng thái học sinh: ${routerResult.studentState}
- Chẩn đoán lỗi sai: ${routerResult.misconception || 'Không phát hiện lỗi'}

CÁC CÂU MẪU TƯƠNG ĐỒNG TRONG NGÂN HÀNG 1.000 CÂU:
${matchedSnippets || 'Không có mẫu tương đương trực tiếp.'}

5 CẤP ĐỘ SƯ PHẠM (LEVEL 1 -> 5):
- Cấp độ hiện tại: CẤP ĐỘ ${hintLevel}/5
- QUY TẮC BẢO MẬT & GIẢI THÍCH 4 BƯỚC:
  + CẤP ĐỘ 1 (Gợi mở ý tưởng): Đặt câu hỏi kích thích tư duy, chỉ ra hình dạng và yếu tố hình học mấu chốt.
  + CẤP ĐỘ 2 (Socrates Dẫn dắt): Hỏi từng bước xác định đại lượng $r, h, l$.
  + CẤP ĐỘ 3 (Nhắc công thức): Cung cấp công thức nền tảng trong KaTeX và giải thích ý nghĩa các đại lượng.
  + CẤP ĐỘ 4 (Khung giải bài toán): Hướng dẫn lộ trình giải chia theo các bước logic.
  + CẤP ĐỘ 5 (Giải chi tiết theo Chuẩn 4 Bước Tuyển Sinh 10):
    * BƯỚC 1: XÁC ĐỊNH DỮ KIỆN (Đổi đơn vị, $d \\to r$).
    * BƯỚC 2: CHỌN MÔ HÌNH & THIẾT LẬP CÔNG THỨC.
    * BƯỚC 3: TÍNH TOÁN CHI TIẾT (Từng bước thay số).
    * BƯỚC 4: KẾT LUẬN & Ý NGHĨA THỰC TIỄN.
  + ${shouldRevealAnswer ? 'Được phép đưa đáp án hoàn chỉnh 4 bước (Cấp 5).' : 'TUYỆT ĐỐI KHÔNG đưa đáp số cuối cùng (Cấp 1-4).'}

THÔNG SỐ MÔ HÌNH 3D THỜI GIAN THỰC:
- Khối hình: ${shapeName} (${context.currentShape})
- Chế độ: ${context.currentMode || 'Khám phá'}
- Bán kính: r = ${context.currentR ?? 4}
- Chiều cao: h = ${context.currentH ?? 8}
${context.currentL ? `- Đường sinh: l = ${context.currentL}` : ''}
${context.pourCount !== null && context.pourCount !== undefined ? `- Thí nghiệm Rót nước 3D (Paradox 1/3): Đã rót ${context.pourCount}/3 lần` : ''}

QUY TẮC CÔNG THỨC TOÁN (MATH RENDERING):
- MỌI công thức toán phải viết bằng LaTeX chuẩn nằm trong dấu $...$ (inline) hoặc $$...$$ (block).
- Ví dụ: $V = \\pi r^2 h$, $l = \\sqrt{r^2 + h^2}$, $S = 4\\pi R^2$.
- TUYỆT ĐỐI không viết raw code như \\pi hay \\frac ngoài dấu $.`;
}

/**
 * Main function processing query from student.
 */
export async function processSmartTutorQuery(
  ai: GoogleGenAI | null,
  rawMessage: string,
  level: number = 1,
  context: SmartTutorContext = {},
  history: any[] = []
): Promise<SmartTutorResponse> {
  const normalized = QuestionNormalizer.normalize(rawMessage);
  const routerResult = QuestionIntentRouter.route(rawMessage, context, history);

  // Match against 1,000 Question Bank
  const matched = QuestionMatcher.match(
    normalized,
    routerResult.topic,
    routerResult.intent,
    routerResult.detectedValues,
    5
  );

  // Deterministic Math Calculations & Error Diagnosis
  const mathValues = MathEngine.extractValues(normalized);
  let mathDiagnosis: MathDiagnosisResult | undefined;
  if (mathValues.studentValue !== undefined) {
    mathDiagnosis = MathEngine.diagnoseAnswer(routerResult.topic as any, mathValues);
  }

  const shouldRevealAnswer = level >= 5 || routerResult.intent === 'STEP_BY_STEP' || rawMessage.toLowerCase().includes('giải chi tiết');

  // Fast Local Question Bank Instant Answer (Sub-millisecond latency for FAQ / exact canonical)
  const topMatch = matched.length > 0 && matched[0].score >= 0.70 ? matched[0].record : null;
  const isExactOrHighConfidence =
    (topMatch && matched[0].score >= 0.85 && routerResult.confidence >= 0.80) ||
    routerResult.intent === 'CHECK_ANSWER' ||
    routerResult.misconception !== null ||
    !ai;

  let replyText = '';
  let highlightTarget: HighlightTarget = null;
  let strategy: ResponseStrategy = 'GUIDE';

  if (isExactOrHighConfidence) {
    const composed = PedagogicalEngine.composeResponse(
      routerResult,
      topMatch,
      level,
      context,
      mathDiagnosis
    );
    replyText = composed.reply;
    highlightTarget = composed.highlightTarget as HighlightTarget;
    strategy = routerResult.misconception ? 'ERROR_CORRECTION' : 'CONCEPT_EXPLANATION';
  } else if (ai) {
    // Call Gemini 3.7 Flash with structured prompt & 3D Spatial Context
    try {
      const systemInstruction = buildThầyHiếuSystemPrompt(
        routerResult,
        level,
        context,
        shouldRevealAnswer,
        matched.map((m) => m.record)
      );

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: [
          ...history.map((h: any) => ({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.content }]
          })),
          {
            role: 'user',
            parts: [{ text: rawMessage }]
          }
        ],
        config: {
          systemInstruction,
          temperature: 0.3,
          maxOutputTokens: 1024
        }
      });

      replyText = response.text || '';
    } catch (err: any) {
      console.warn('Gemini API call failed, using high-fidelity local pedagogical engine:', err?.message);
      const fallbackComposed = PedagogicalEngine.composeResponse(
        routerResult,
        topMatch,
        level,
        context,
        mathDiagnosis
      );
      replyText = fallbackComposed.reply;
      highlightTarget = fallbackComposed.highlightTarget as HighlightTarget;
    }
  }

  // Response Validation & KaTeX Repair
  const validated = ResponseValidator.validateAndRepair(replyText, {
    topic: routerResult.topic,
    level
  });

  // Quick Reply Suggestions
  const quickReplies = QuickReplyEngine.generate(routerResult.topic, routerResult.intent, {
    shape: context.currentShape,
    pourCount: context.pourCount,
    misconception: routerResult.misconception,
    level
  });

  return {
    reply: validated.repairedText,
    message: validated.repairedText,
    intent: routerResult.intent,
    secondaryIntents: routerResult.secondaryIntents,
    topic: routerResult.topic,
    state: routerResult.studentState,
    strategy,
    errorDiagnosis: routerResult.misconception || mathDiagnosis?.detectedError || undefined,
    hintLevel: level,
    shouldRevealAnswer,
    highlightTarget,
    quickReplies,
    matchedQuestionIds: matched.map((m) => m.id),
    timestamp: new Date().toISOString()
  };
}
