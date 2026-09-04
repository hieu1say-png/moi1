/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - PEDAGOGICAL STRATEGY ENGINE (THẦY HIẾU AI 2.0)
 * Scaffolding levels & adaptive response composition:
 * - Level 1: GENTLE_HINT (Socratic focus on key geometric dimensions)
 * - Level 2: GUIDED_QUESTION (Socratic guiding prompt)
 * - Level 3: FORMULA_RECALL (targeted KaTeX formula & parameter meaning)
 * - Level 4: STEP_GUIDANCE (structured step-by-step procedure)
 * - Level 5: FULL_SOLUTION (4-step complete solution with KaTeX & unit analysis)
 * - Instant (<5ms) rich responses for Formula, Concept, Why, Net Unfold, Axial Section, Great Circle, and Paradox queries.
 */

import { QuestionRecord, ResponseMode, StudentStateType } from '../../data/questionBank1000/types';
import { QuestionRouterResult, RouterContext } from './questionIntentRouter';
import { MathDiagnosisResult } from './mathEngine';

export class PedagogicalEngine {
  /**
   * Generates a pedagogically structured response tailored to the student's level and intent.
   */
  public static composeResponse(
    routerResult: QuestionRouterResult,
    matchedRecord: QuestionRecord | null,
    level: number,
    context: RouterContext,
    mathDiagnosis?: MathDiagnosisResult
  ): {
    reply: string;
    responseMode: ResponseMode;
    highlightTarget: string | null;
    suggestedLevel: number;
  } {
    const topic = routerResult.topic;
    const intent = routerResult.intent;
    const values = routerResult.detectedValues;
    const misconception = routerResult.misconception;

    let highlightTarget: string | null = null;
    if (intent === 'NET_UNFOLD' || routerResult.subIntent === '3D_UNFOLD') {
      highlightTarget = topic === 'CONE' ? 'sectorArc' : 'unfold';
    } else if (intent === 'AXIAL_SECTION' || routerResult.subIntent === 'AXIAL_SECTION' || intent === 'GREAT_CIRCLE') {
      highlightTarget = 'section';
    } else if (routerResult.subIntent === 'SLANT_HEIGHT') {
      highlightTarget = 'generatrix';
    } else if (routerResult.subIntent === 'HEIGHT') {
      highlightTarget = 'height';
    } else if (routerResult.subIntent === 'RADIUS' || routerResult.subIntent === 'DIAMETER') {
      highlightTarget = 'radius';
    } else if (topic === 'PARADOX_1_3' || context.pourCount !== null) {
      highlightTarget = 'waterLevel';
    }

    // 1. If there's an active mathematical misconception diagnosed
    if (misconception) {
      const errorMsg = mathDiagnosis?.errorStepExplanation?.fix || '';
      return {
        reply: `⚠️ **Khoan khoan, đừng vội bấm máy nhé!** Thầy thấy em đang đi đúng hướng nhưng vấp phải một cái bẫy đề thi: **${misconception}**.\n- ${mathDiagnosis?.errorStepExplanation?.reason || 'Em hãy chú ý lại công thức đại lượng.'}\n- **Cách sửa chuẩn xác:** $${errorMsg || 'Vui lòng kiểm tra lại bán kính và số mũ'}$$\nEm thử chỉnh lại bước này xem ra kết quả bao nhiêu nhé!`,
        responseMode: 'ERROR_CORRECTION',
        highlightTarget: highlightTarget || 'radius',
        suggestedLevel: 3
      };
    }

    // 2. Check Answer Intent (e.g. "Em ra 128π có đúng không?")
    if (intent === 'CHECK_ANSWER') {
      if (mathDiagnosis?.isCorrect) {
        return {
          reply: `🎉 **Chính xác 100% rồi em ơi!** Kết quả **$${mathDiagnosis.expectedExactLatex || '128\\pi'}\\text{ cm}^3$** (xấp xỉ $${mathDiagnosis.expectedApprox?.toFixed(2) || '402.12'}$) hoàn toàn chuẩn xác. Em nắm bài rất chắc đấy!`,
          responseMode: 'ENCOURAGEMENT',
          highlightTarget,
          suggestedLevel: level
        };
      } else if (mathDiagnosis?.detectedError === 'MISSING_SQUARE') {
        return {
          reply: `⚠️ **Gần đúng rồi!** Em tính ra kết quả đó vì bị thiếu **bình phương bán kính** ($r^2$). Công thức đúng là $V = \\pi r^2 h$. Em nhân thêm một lần $r$ nữa xem ra kết quả bao nhiêu nhé!`,
          responseMode: 'ERROR_CORRECTION',
          highlightTarget: 'radius',
          suggestedLevel: 3
        };
      } else if (mathDiagnosis?.detectedError === 'RADIUS_DIAMETER_CONFUSION') {
        return {
          reply: `⚠️ **Chú ý bẫy đề thi nha!** Đề bài cho đường kính $d$, em phải chia đôi để lấy bán kính: $r = \\frac{d}{2}$. Sau đó mới thế vào công thức tính nhé!`,
          responseMode: 'ERROR_CORRECTION',
          highlightTarget: 'radius',
          suggestedLevel: 3
        };
      }
    }

    // 3. High-Confidence Matched Question Record from 1,000 Canonical Bank
    if (matchedRecord && matchedRecord.teacherStyleResponse) {
      // If the student explicitly asks for a gentle hint during practice (level 1-3 with HINT intent)
      if (intent === 'HINT') {
        if (level === 1) {
          return {
            reply: `💡 **Gợi ý nhỏ cho em**: Em hãy quan sát xem bài toán đang cho đại lượng nào (bán kính $r$, chiều cao $h$ hay đường sinh $l$) và yêu cầu tính diện tích hay thể tích nhé!`,
            responseMode: 'GENTLE_HINT',
            highlightTarget,
            suggestedLevel: 1
          };
        } else if (level === 2) {
          return {
            reply: `🤔 **Thầy hỏi gợi mở em nhé**: Đáy của hình ${topic === 'CYLINDER' ? 'trụ' : topic === 'CONE' ? 'nón' : 'cầu'} là hình gì? Diện tích đáy tròn được tính theo công thức nào?`,
            responseMode: 'GUIDED_QUESTION',
            highlightTarget,
            suggestedLevel: 2
          };
        } else if (level === 3) {
          return {
            reply: `📝 **Công thức cần dùng**: $${matchedRecord.formula || matchedRecord.shortAnswer}$. Em hãy thay các số đã cho vào công thức này nhé!`,
            responseMode: 'FORMULA_RECALL',
            highlightTarget,
            suggestedLevel: 3
          };
        }
      }

      // For direct inquiries (FORMULA, CONCEPT, WHY, NET_UNFOLD, AXIAL_SECTION, GREAT_CIRCLE, PARADOX, CALCULATION, or Level >= 4):
      // Return the full, authoritative teacherStyleResponse immediately (<5ms)
      return {
        reply: matchedRecord.teacherStyleResponse,
        responseMode: matchedRecord.responseMode,
        highlightTarget: matchedRecord.visualContext?.highlightTarget || highlightTarget,
        suggestedLevel: level
      };
    }

    // 4. Intent-Specific Comprehensive Pedagogical Fallbacks

    // 4.1. Axial Section (Thiết diện qua trục)
    if (intent === 'AXIAL_SECTION') {
      if (topic === 'CYLINDER') {
        return {
          reply: `📐 **Thiết diện qua trục của Hình Trụ**:\n- Khi cắt hình trụ bởi một mặt phẳng đi qua trục, ta thu được thiết diện là một **hình chữ nhật**.\n- Kích thước hai cạnh của hình chữ nhật: một cạnh bằng chiều cao $h$ và một cạnh bằng **đường kính đáy** $2r$.\n- Diện tích thiết diện qua trục: $$S_{\\text{thiết diện}} = 2r \\cdot h$$\n- *Trường hợp đặc biệt*: Nếu thiết diện qua trục là **hình vuông** thì chiều cao bằng đường kính đáy ($h = 2r$).`,
          responseMode: 'CONCEPT_EXPLANATION',
          highlightTarget: 'section',
          suggestedLevel: level
        };
      } else if (topic === 'CONE') {
        return {
          reply: `📐 **Thiết diện qua trục của Hình Nón**:\n- Cắt hình nón bởi mặt phẳng qua trục ta thu được một **tam giác cân** tại đỉnh $S$.\n- Hai cạnh bên là đường sinh $l = \\sqrt{r^2 + h^2}$, cạnh đáy là đường kính $2r$, chiều cao tam giác là $h$.\n- Diện tích thiết diện: $$S_{\\text{thiết diện}} = \\frac{1}{2} \\cdot 2r \\cdot h = r \\cdot h$$\n- *Bẫy đề thi*: Nếu thiết diện là tam giác vuông cân thì $l = r\\sqrt{2}$, nếu là tam giác đều thì đường sinh $l = 2r$.`,
          responseMode: 'CONCEPT_EXPLANATION',
          highlightTarget: 'section',
          suggestedLevel: level
        };
      }
    }

    // 4.2. Great Circle / Section of Sphere (Hình tròn lớn & Mặt cắt hình cầu)
    if (intent === 'GREAT_CIRCLE' || (topic === 'SPHERE' && (intent === 'CONCEPT' || intent === 'WHY'))) {
      return {
        reply: `🌐 **Thiết diện và Hình tròn lớn của Hình Cầu**:\n1. **Cắt qua tâm ($d = 0$)**: Mặt phẳng cắt khối cầu qua tâm thu được **hình tròn lớn** có bán kính đúng bằng $R$.\n   - Chu vi hình tròn lớn: $C = 2\\pi R$\n   - Diện tích hình tròn lớn: $S_{\\text{tròn lớn}} = \\pi R^2$\n   - Diện tích cả mặt cầu gấp đúng 4 lần hình tròn lớn: $$S = 4\\pi R^2$$\n2. **Cắt cách tâm khoảng cách $d < R$**: Thiết diện là đường tròn có bán kính: $$r = \\sqrt{R^2 - d^2}$$\n   - Diện tích thiết diện: $S = \\pi r^2 = \\pi (R^2 - d^2)$.`,
        responseMode: 'CONCEPT_EXPLANATION',
        highlightTarget: 'section',
        suggestedLevel: level
      };
    }

    // 4.3. Net Unfold (Trải phẳng 3D)
    if (intent === 'NET_UNFOLD') {
      if (topic === 'CONE') {
        return {
          reply: `✂️ **Khai triển (Trải phẳng) Mặt xung quanh Hình Nón**:\n1. Khi cắt theo một đường sinh và trải phẳng mặt xung quanh của hình nón, ta được một **hình quạt tròn**.\n2. **Bán kính hình quạt**: Đúng bằng độ dài đường sinh $l$.\n3. **Độ dài cung hình quạt**: Đúng bằng chu vi đường tròn đáy $2\\pi r$.\n4. **Góc ở tâm của hình quạt** (tính theo độ): $$\\alpha = 360^\\circ \\cdot \\frac{r}{l}$$\n*Mẹo nhớ*: Tỉ lệ góc bằng đúng tỉ số bán kính đáy chia cho đường sinh!`,
          responseMode: 'VISUAL_EXPLANATION',
          highlightTarget: 'sectorArc',
          suggestedLevel: level
        };
      } else {
        return {
          reply: `✂️ **Khai triển (Trải phẳng) Mặt xung quanh Hình Trụ**:\n1. Cắt theo một đường sinh và trải phẳng mặt xung quanh hình trụ ra, ta được một **hình chữ nhật**.\n2. **Chiều rộng**: Bằng chiều cao $h$ của hình trụ.\n3. **Chiều dài**: Đúng bằng chu vi hình tròn đáy $2\\pi r$.\n4. Diện tích hình chữ nhật chính là diện tích xung quanh: $$S_{xq} = 2\\pi r \\cdot h$$`,
          responseMode: 'VISUAL_EXPLANATION',
          highlightTarget: 'unfold',
          suggestedLevel: level
        };
      }
    }

    // 4.4. Paradox 1/3 & Pouring Experiment
    if (topic === 'PARADOX_1_3' || intent === 'PARADOX_1_3') {
      return {
        reply: `🧪 **Bản chất Thí nghiệm Rót nước 1/3 (Nghịch lý Nón - Trụ)**:\nKhi phễu hình nón và cốc hình trụ có **cùng bán kính đáy $r$ và cùng chiều cao $h$**:\n- Lần rót 1: Cốc trụ chứa đúng **1/3** chiều cao ($h_1 = \\frac{1}{3}h$).\n- Lần rót 2: Cốc trụ dâng lên **2/3** chiều cao ($h_2 = \\frac{2}{3}h$).\n- Lần rót 3: Cốc trụ đầy tràn đúng **100%** ($h_3 = h$).\n$$V_{\\text{nón}} = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} V_{\\text{trụ}} \\iff V_{\\text{trụ}} = 3 V_{\\text{nón}}$$`,
        responseMode: 'VISUAL_EXPLANATION',
        highlightTarget: 'waterLevel',
        suggestedLevel: level
      };
    }

    // 4.5. Comparison / Archimedes Trinity Ratio (1 : 2 : 3)
    if (intent === 'COMPARE') {
      return {
        reply: `👑 **Định lý Archimedes huyền thoại (Tỉ lệ 1 : 2 : 3)**:\nKhi hình nón, hình cầu và hình trụ có cùng bán kính $R$ và chiều cao bằng đường kính cầu ($h = 2R$):\n1. $V_{\\text{nón}} = \\frac{1}{3}\\pi R^2 (2R) = \\frac{2}{3}\\pi R^3$.\n2. $V_{\\text{cầu}} = \\frac{4}{3}\\pi R^3$.\n3. $V_{\\text{trụ}} = \\pi R^2 (2R) = 2\\pi R^3 = \\frac{6}{3}\\pi R^3$.\nTỉ số thể tích tuyệt mỹ: $$V_{\\text{nón}} : V_{\\text{cầu}} : V_{\\text{trụ}} = 1 : 2 : 3$$\n*Khối cầu chiếm đúng $\\frac{2}{3}$ thể tích hình trụ ngoại tiếp nó!*`,
        responseMode: 'CONCEPT_EXPLANATION',
        highlightTarget: 'section',
        suggestedLevel: level
      };
    }

    // 4.6. Topic Core Foundations
    if (topic === 'CYLINDER') {
      return {
        reply: `📚 **Hệ thống kiến thức trọng tâm Hình Trụ (Toán 9)**:\n1. **Thể tích**: $$V = \\pi r^2 h$$\n2. **Diện tích xung quanh**: $$S_{xq} = 2\\pi rh$$\n3. **Diện tích toàn phần** (2 đáy tròn): $$S_{tp} = 2\\pi rh + 2\\pi r^2 = 2\\pi r(h + r)$$\n⚠️ *Cảnh báo bẫy thi*: Nếu đề bài cho "thùng không có nắp" thì chỉ cộng 1 đáy: $S = 2\\pi rh + \\pi r^2$; nếu cho đường kính $d$ thì phải lấy $r = \\frac{d}{2}$ trước khi tính!`,
        responseMode: 'CONCEPT_EXPLANATION',
        highlightTarget: 'height',
        suggestedLevel: level
      };
    }

    if (topic === 'CONE') {
      return {
        reply: `📚 **Hệ thống kiến thức trọng tâm Hình Nón (Toán 9)**:\n1. **Quan hệ Pythagore**: $$l = \\sqrt{r^2 + h^2}$$\n2. **Thể tích** (có hệ số 1/3 và dùng chiều cao $h$): $$V = \\frac{1}{3}\\pi r^2 h$$\n3. **Diện tích xung quanh** (dùng đường sinh $l$): $$S_{xq} = \\pi r l$$\n4. **Diện tích toàn phần** (chỉ có 1 đáy): $$S_{tp} = \\pi r l + \\pi r^2 = \\pi r(l + r)$$\n⚠️ *Cảnh báo bẫy thi*: Tuyệt đối không nhầm đường sinh $l$ với chiều cao $h$ nha em!`,
        responseMode: 'CONCEPT_EXPLANATION',
        highlightTarget: 'generatrix',
        suggestedLevel: level
      };
    }

    if (topic === 'SPHERE') {
      return {
        reply: `📚 **Hệ thống kiến thức trọng tâm Hình Cầu (Toán 9)**:\n1. **Diện tích mặt cầu**: $$S = 4\\pi R^2 = \\pi d^2$$\n2. **Thể tích khối cầu**: $$V = \\frac{4}{3}\\pi R^3 = \\frac{1}{6}\\pi d^3$$\n⚠️ *Cảnh báo bẫy thi*: Thể tích có đơn vị $\\text{cm}^3$ nên $R$ phải có **mũ 3** và đi kèm phân số **$\\frac{4}{3}$**; diện tích có đơn vị $\\text{cm}^2$ nên $R$ có **mũ 2** và đi kèm số **4**!`,
        responseMode: 'CONCEPT_EXPLANATION',
        highlightTarget: 'section',
        suggestedLevel: level
      };
    }

    return {
      reply: `Chào em! Thầy Hiếu AI đây. Em đang cần giải đáp câu hỏi nào về Hình Trụ, Hình Nón hay Hình Cầu? Hãy gõ câu hỏi hoặc chọn các thẻ gợi ý bên dưới để Thầy hỗ trợ ngay nhé!`,
      responseMode: 'CONCEPT_EXPLANATION',
      highlightTarget: null,
      suggestedLevel: 1
    };
  }
}

