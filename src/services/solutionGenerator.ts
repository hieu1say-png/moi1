/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SOLUTION GENERATOR SERVICE
 * Generates pedagogical 4-step mathematical solutions and parses AI Tutor responses.
 */

import { Exercise, MultipleChoiceExercise, TrueFalseExercise, NumericExercise, FillBlankExercise, DragDropExercise, ChallengeExercise } from '../types/dataArchitecture';
import { SolutionStep } from '../components/practice/SolutionTimeline';
import { FourStepSolutionEngine } from './ai/fourStepSolutionEngine';

export interface ComprehensiveCorrection {
  statusTitle: string;
  statusMessage: string;
  isCorrect: boolean;
  steps: SolutionStep[];
  teacherTip: string;
  commonPitfall?: string;
  quickQuestions: string[];
}

/**
 * Generate a high-fidelity 4-step solution for any given exercise
 */
export function generateExerciseSolution(
  exercise: Exercise,
  userAnswer: any,
  isCorrect: boolean,
  detectedError?: { title: string; desc: string } | null
): ComprehensiveCorrection {
  const shapeName =
    exercise.shapeId === 'cylinder'
      ? 'Hình Trụ'
      : exercise.shapeId === 'cone'
      ? 'Hình Nón'
      : 'Hình Cầu';

  const fourStepFeedback = FourStepSolutionEngine.buildTeacherFeedback(
    isCorrect,
    userAnswer,
    exercise.type === 'multiple_choice'
      ? (exercise as MultipleChoiceExercise).options[(exercise as MultipleChoiceExercise).correctOptionIndex]
      : (exercise as any).expectedNumber || (exercise as any).expectedAnswer,
    detectedError?.title
  );

  let steps: SolutionStep[] = [];
  let teacherTip = '';
  let commonPitfall = detectedError?.desc;
  const quickQuestions: string[] = [
    'Tại sao bài này lại áp dụng công thức trên?',
    'Có cách tính nhanh hoặc mẹo nhớ công thức không?',
    'Trong đề thi vào 10, dạng bài này chiếm bao nhiêu điểm?',
    'Lưu ý gì về đơn vị đo và cách làm tròn số?'
  ];

  // Specific per exercise type
  if (exercise.type === 'multiple_choice') {
    const mc = exercise as MultipleChoiceExercise;
    const correctOptText = mc.options[mc.correctOptionIndex];
    const correctLetter = String.fromCharCode(65 + mc.correctOptionIndex);

    steps = [
      {
        stepNumber: 1,
        title: 'Bước 1: Xác định dữ kiện & Mục tiêu',
        subtitle: 'Tóm tắt bài toán & Đổi đơn vị',
        description: `Đề bài cho thông tin về **${shapeName}** với nội dung: "${exercise.question}". Đọc kỹ yêu cầu để xác định các đại lượng $r, h, l, d$ và mục tiêu bài toán.`,
        type: 'given',
        tip: 'Đọc kỹ đề bài để phân biệt giữa bán kính $r$ và đường kính $d = 2r$, hoặc giữa chiều cao $h$ và đường sinh $l$.'
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Chọn mô hình / Công thức',
        subtitle: 'Giải thích cơ sở hình học',
        description: exercise.latexEquation
          ? `Sử dụng công thức toán học chuẩn về ${shapeName}:`
          : `Gợi ý phương pháp: ${exercise.hint}`,
        latex: exercise.latexEquation || undefined,
        type: 'formula',
        tip: 'Viết công thức tổng quát trước khi thay số để tránh nhầm lũy thừa hay thiếu hệ số $\\frac{1}{3}$.'
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Tính toán từng dòng',
        subtitle: 'Thế số & biến đổi đại số',
        description: exercise.explanation,
        intermediateResult: `Phương án đúng là ${correctLetter}: "${correctOptText}"`,
        type: 'calc',
        tip: 'Không bấm máy tính vội vàng một lần trên máy tính bỏ túi để tránh sai sót số mũ!'
      },
      {
        stepNumber: 4,
        title: 'Bước 4: Kết luận & Ý nghĩa thực tế',
        subtitle: 'Tổng kết phương án & lời khuyên',
        description: `Chọn đáp án **${correctLetter}** (${correctOptText}). ${
          detectedError ? `⚠️ Lưu ý: ${fourStepFeedback.mistakeAnalysis}` : fourStepFeedback.encouragement
        }`,
        type: 'conclusion',
        tip: 'Đối với các bài trắc nghiệm hình không gian, luôn viết công thức tổng quát ra nháp trước khi thay số.'
      }
    ];

    teacherTip = `Khi làm bài trắc nghiệm về ${shapeName}, hãy luôn kiểm tra xem đề bài cho bán kính hay đường kính, và kết quả có yêu cầu giữ nguyên số $\\pi$ hay lấy $\\pi \\approx 3{,}14$ nhé!`;
  } else if (exercise.type === 'numeric') {
    const num = exercise as NumericExercise;

    if (num.stepByStepGuide && num.stepByStepGuide.length === 4) {
      steps = num.stepByStepGuide.map((st, i) => ({
        stepNumber: i + 1,
        title: `Bước ${i + 1}: ${st.stepNumber ? st.description : ''}`,
        description: st.description,
        latex: st.formulaLatex,
        intermediateResult: st.intermediateValue,
        type: i === 0 ? 'given' : i === 1 ? 'formula' : i === 2 ? 'calc' : 'conclusion',
        tip: i === 1 ? 'Hãy chú ý thay đúng từng biến số và giữ nguyên các thừa số $\\pi$ cho đến bước rút gọn cuối.' : undefined
      }));
    } else {
      steps = [
        {
          stepNumber: 1,
          title: 'Bước 1: Xác định dữ kiện & Mục tiêu',
          subtitle: 'Tóm tắt bài toán & Đổi đơn vị',
          description: `Đề bài yêu cầu tính toán đại lượng cho **${shapeName}**. Gợi ý: ${exercise.hint}`,
          type: 'given',
          tip: 'Đồng nhất toàn bộ đơn vị đo trước khi bắt đầu tính.'
        },
        {
          stepNumber: 2,
          title: 'Bước 2: Chọn mô hình / Công thức',
          subtitle: 'Giải thích cơ sở hình học',
          description: `Áp dụng công thức tính toán chuẩn cho ${shapeName}:`,
          latex: exercise.latexEquation || undefined,
          type: 'formula'
        },
        {
          stepNumber: 3,
          title: 'Bước 3: Tính toán từng dòng',
          subtitle: 'Thế số & biến đổi đại số',
          description: exercise.explanation,
          intermediateResult: `Giá trị tính được = ${num.expectedNumber} ${num.unit}`,
          type: 'calc'
        },
        {
          stepNumber: 4,
          title: 'Bước 4: Kết luận & Ý nghĩa thực tế',
          subtitle: 'Ghi đáp số và đơn vị đo',
          description: `Kết quả cuối cùng: **${num.expectedNumber} ${num.unit}** (Cho phép sai số $\\pm ${num.tolerance}$). ${
            detectedError ? `⚠️ ${fourStepFeedback.mistakeAnalysis}` : fourStepFeedback.encouragement
          }`,
          type: 'conclusion',
          tip: `Đừng quên ghi kèm đơn vị đo ${num.unit} trong bài thi tự luận!`
        }
      ];
    }

    teacherTip = `Trong các đề thi tuyển sinh vào Lớp 10, câu hỏi hình học thực tế thường yêu cầu làm tròn đến hàng đơn vị hoặc chữ số thập phân thứ nhất. Hãy đọc kỹ quy định làm tròn của đề bài.`;
  } else if (exercise.type === 'true_false') {
    const tf = exercise as TrueFalseExercise;
    steps = [
      {
        stepNumber: 1,
        title: 'Phân tích bản chất hình học',
        subtitle: 'Kiểm tra các tính chất hình không gian',
        description: `Xem xét từng mệnh đề toán học liên quan đến **${shapeName}**:`,
        type: 'given'
      },
      ...tf.statements.map((s, i) => ({
        stepNumber: i + 2,
        title: `Mệnh đề ${i + 1}: ${s.statement}`,
        description: `${s.explanation} $\\rightarrow$ Mệnh đề này là **${s.isTrue ? 'ĐÚNG' : 'SAI'}**.`,
        latex: s.latex,
        intermediateResult: s.isTrue ? 'ĐÚNG (True)' : 'SAI (False)',
        type: (s.isTrue ? 'calc' : 'warning') as any
      })),
      {
        stepNumber: tf.statements.length + 2,
        title: 'Tổng kết phương án Đúng / Sai',
        description: exercise.explanation,
        type: 'conclusion',
        tip: 'Khi xét tính đúng sai, nếu tìm được dù chỉ 1 trường hợp ngoại lệ thì mệnh đề đó là SAI.'
      }
    ];

    teacherTip = `Các câu hỏi Đúng/Sai thường gài bẫy ở điều kiện biên: ví dụ "đường sinh luôn dài hơn bán kính đáy" (đúng với nón) hoặc "thiết diện qua trục là hình vuông" (chỉ đúng khi chiều cao bằng đường kính).`;
  } else if (exercise.type === 'drag_drop') {
    const dd = exercise as DragDropExercise;
    steps = [
      {
        stepNumber: 1,
        title: 'Nhận diện các hình khối tròn xoay',
        description: `Quan sát các đặc điểm cấu tạo của các hình tròn xoay: Hình Trụ (2 đáy tròn bằng nhau), Hình Nón (1 đáy tròn và 1 đỉnh), Hình Cầu (tập hợp điểm cách tâm khoảng cách $R$).`,
        type: 'given'
      },
      {
        stepNumber: 2,
        title: 'Tổng hợp hệ thống công thức tương ứng',
        description: exercise.explanation,
        type: 'formula'
      },
      {
        stepNumber: 3,
        title: 'Kết quả ghép nối chuẩn xác',
        description: `Bảng ghép nối tương ứng giữa hình và công thức đại lượng:`,
        intermediateResult: 'Hoàn thành ghép nối 100%',
        type: 'conclusion',
        tip: 'Ghi nhớ quy luật phân số: Trụ không có phân số, Nón có hệ số 1/3, Cầu có hệ số 4/3 và bán kính mũ 3.'
      }
    ];

    teacherTip = `Quy tắc liên hệ không gian: Nếu hình nón và hình trụ có cùng bán kính đáy $r$ và cùng chiều cao $h$, thì thể tích nón luôn bằng đúng $\\frac{1}{3}$ thể tích hình trụ!`;
  } else if (exercise.type === 'challenge') {
    const ch = exercise as ChallengeExercise;
    steps = [
      {
        stepNumber: 1,
        title: 'Bối cảnh thực tế & Nguyên lý vật lý Archimedes',
        subtitle: 'Phân tích hiện tượng dâng nước',
        description: `Bối cảnh: ${ch.scenario}. Thể tích nước dâng lên trong bình hình trụ chính bằng thể tích của vật thể (khối cầu) thả chìm vào trong nước: $$\\Delta V = V_{\\text{cầu}} = V_{\\text{nước dâng}}$$.`,
        type: 'given',
        tip: 'Nguyên lý bảo toàn thể tích: Khi vật chìm hoàn toàn trong nước, thể tích phần nước dâng lên đúng bằng thể tích của vật.'
      },
      ...ch.subQuestions.map((sq) => ({
        stepNumber: sq.order + 1,
        title: `Bước ${sq.order}: ${sq.question}`,
        description: `Tính toán đại lượng theo công thức:`,
        latex: sq.latex,
        intermediateResult: `Đáp số: ${sq.expectedAnswer}`,
        type: 'calc' as any
      })),
      {
        stepNumber: ch.subQuestions.length + 2,
        title: 'Kết luận bài toán Archimedes',
        description: exercise.explanation,
        type: 'conclusion',
        tip: 'Dạng toán liên hoàn (nhiều bước) là dạng bài thực tế điểm 9-10 trong đề thi vào 10!'
      }
    ];

    teacherTip = `Bài toán Archimedes liên môn Toán - Lý là câu hỏi phân loại học sinh giỏi. Điểm mấu chốt là nhớ $V_{\\text{dâng}} = S_{\\text{đáy trụ}} \\times \\Delta h = V_{\\text{cầu}}$.`;
  } else {
    // Fill in blank or generic
    steps = [
      {
        stepNumber: 1,
        title: 'Phân tích cấu trúc câu & Từ khóa toán học',
        description: exercise.question,
        type: 'given'
      },
      {
        stepNumber: 2,
        title: 'Công thức & Định nghĩa chính xác',
        description: exercise.explanation,
        latex: exercise.latexEquation,
        type: 'formula'
      },
      {
        stepNumber: 3,
        title: 'Kết quả điền khuyết hoàn chỉnh',
        description: `Điền chính xác các biểu thức toán học vào ô trống để tạo thành mệnh đề chuẩn xác.`,
        type: 'conclusion'
      }
    ];
    teacherTip = `Chú ý các ký hiệu toán học đặc biệt như $\\pi, r, h, l, R$ và các số mũ khi nhập vào bài làm.`;
  }

  return {
    statusTitle: isCorrect ? 'Chính xác tuyệt đối!' : 'Chưa chính xác!',
    statusMessage: isCorrect
      ? 'Em đã nắm rất chắc kiến thức và hoàn thành xuất sắc câu hỏi này. Hãy xem lại từng bước giải bên dưới để củng cố kỹ năng trình bày sư phạm nhé!'
      : 'Đừng lo lắng! Hãy xem kỹ từng bước phân tích và chữa bài chi tiết của Thầy Hiếu dưới đây để nhận diện chỗ mình tính nhầm và khắc phục ngay.',
    isCorrect,
    steps,
    teacherTip,
    commonPitfall,
    quickQuestions
  };
}

/**
 * Parses raw text from AI endpoint into structured steps if AI returns Markdown/Step format
 */
export function parseAISolutionResponse(
  aiText: string,
  fallbackSteps: SolutionStep[]
): SolutionStep[] {
  if (!aiText || aiText.length < 50) return fallbackSteps;

  try {
    // Check if AI response has step lines like "Bước 1", "1. ", "Bước 2", etc.
    const stepRegex = /(?:###?\s*)?(?:Bước\s*(\d+)|Step\s*(\d+)|(\d+)\.)\s*[:\-\.]?\s*([^\n]+)/gi;
    const matches: { index: number; stepNum: number; title: string }[] = [];

    let m: RegExpExecArray | null;
    while ((m = stepRegex.exec(aiText)) !== null) {
      const num = parseInt(m[1] || m[2] || m[3], 10);
      matches.push({
        index: m.index,
        stepNum: num,
        title: m[4].trim()
      });
    }

    if (matches.length >= 2) {
      const parsedSteps: SolutionStep[] = [];

      for (let i = 0; i < matches.length; i++) {
        const cur = matches[i];
        const next = matches[i + 1];
        const contentStart = cur.index + cur.title.length + 10;
        const contentEnd = next ? next.index : aiText.length;
        const rawContent = aiText.slice(cur.index, contentEnd).trim();

        // Extract latex if present
        let latex: string | undefined = undefined;
        const latexMatch = rawContent.match(/\$\$([\s\S]*?)\$\$/);
        if (latexMatch) {
          latex = latexMatch[1].trim();
        }

        parsedSteps.push({
          stepNumber: cur.stepNum || i + 1,
          title: cur.title.replace(/\*\*/g, '').slice(0, 60),
          description: rawContent.replace(/\$\$[\s\S]*?\$\$/g, '').trim(),
          latex,
          type: i === 0 ? 'given' : i === matches.length - 1 ? 'conclusion' : 'calc'
        });
      }

      if (parsedSteps.length > 0) {
        return parsedSteps;
      }
    }
  } catch (e) {
    console.warn('Failed to parse AI solution text, using fallback steps:', e);
  }

  return fallbackSteps;
}
