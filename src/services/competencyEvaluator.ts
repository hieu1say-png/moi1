/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - COMPETENCY EVALUATION ENGINE (CHƯƠNG TRÌNH GDPT 2018)
 * Evaluates the 5 Core Mathematical Competencies (M1 - M5):
 * - M1: Năng lực tư duy và lập luận toán học (Mathematical Thinking & Reasoning)
 * - M2: Năng lực mô hình hóa toán học (Mathematical Modeling)
 * - M3: Năng lực giải quyết vấn đề toán học (Mathematical Problem Solving)
 * - M4: Năng lực giao tiếp toán học (Mathematical Communication)
 * - M5: Năng lực sử dụng công cụ, phương tiện học toán (Use of Mathematical Tools & 3D Media)
 * 
 * Tác giả chương trình: ThS. Trần Ngọc Hiếu — Trường Phổ thông Thực hành Sư phạm
 */

export interface CompetencyScore {
  id: 'M1' | 'M2' | 'M3' | 'M4' | 'M5';
  code: string;
  name: string;
  score: number; // 0 - 100
  tier: 'mastered' | 'good' | 'developing' | 'need_practice';
  tierLabel: string;
  description: string;
  indicators: string[];
  recommendation: string;
}

export interface CompetencyEvaluationResult {
  studentId: string;
  studentName: string;
  className: string;
  evaluatedAt: string;
  overallScore: number;
  overallTier: string;
  competencies: Record<'M1' | 'M2' | 'M3' | 'M4' | 'M5', CompetencyScore>;
  radarData: Array<{ subject: string; score: number; fullMark: number; code: string }>;
  strengths: string[];
  growthOpportunities: string[];
  teacherPedagogicalAdvice: string;
}

export class CompetencyEvaluator {
  private static getTier(score: number): { tier: 'mastered' | 'good' | 'developing' | 'need_practice'; label: string } {
    if (score >= 85) return { tier: 'mastered', label: 'Xuất sắc (Vững vàng)' };
    if (score >= 70) return { tier: 'good', label: 'Đạt chuẩn (Khá tốt)' };
    if (score >= 50) return { tier: 'developing', label: 'Đang phát triển' };
    return { tier: 'need_practice', label: 'Cần tăng cường hỗ trợ' };
  }

  /**
   * Evaluates student performance across the 5 canonical 2018 Vietnamese curriculum competencies.
   */
  public static evaluate(params: {
    studentId?: string;
    studentName?: string;
    className?: string;
    spatialScores?: Record<string, number>;
    exploredShapesCount?: number;
    completedPracticesCount?: number;
    quizAccuracy?: number; // 0 - 100
    labInteractionsCount?: number; // 3D manipulations, water pouring, slider changes
    socraticInteractionsCount?: number;
    unfoldCompleted?: boolean;
    waterPourParadoxExplained?: boolean;
  }): CompetencyEvaluationResult {
    const s = params.spatialScores || {};
    const explored = params.exploredShapesCount ?? 3;
    const practices = params.completedPracticesCount ?? 4;
    const accuracy = params.quizAccuracy ?? 82;
    const labActions = params.labInteractionsCount ?? 15;
    const socraticCount = params.socraticInteractionsCount ?? 6;

    // 1. M1: Năng lực tư duy và lập luận toán học
    // Dựa trên nhận diện hình, định hướng không gian, chuyển đổi 3D sang 2D, suy luận nghịch đảo
    const m1Base = (
      (s.spatialOrientation ?? 80) * 0.35 +
      (s.spatialTransformation ?? 75) * 0.35 +
      (s.twoDToThreeD ?? 82) * 0.30
    );
    const m1Score = Math.min(100, Math.round(m1Base + (params.unfoldCompleted ? 5 : 0)));

    // 2. M2: Năng lực mô hình hóa toán học
    // Dựa trên chuyển đổi bài toán thực tiễn sang mô hình hình học (r, h, l), chọn đúng công thức
    const m2Base = (
      (s.mathematicalModeling ?? 78) * 0.50 +
      (accuracy * 0.35) +
      Math.min(15, practices * 3)
    );
    const m2Score = Math.min(100, Math.round(m2Base));

    // 3. M3: Năng lực giải quyết vấn đề toán học
    // Dựa trên giải bài tập 4 bước, độ chính xác làm bài, xử lý các câu hỏi bẫy (misconceptions)
    const m3Base = (
      (s.problemSolving ?? 82) * 0.45 +
      accuracy * 0.45 +
      Math.min(10, practices * 2)
    );
    const m3Score = Math.min(100, Math.round(m3Base));

    // 4. M4: Năng lực giao tiếp toán học
    // Dựa trên đặt câu hỏi Socratic, đọc hiểu công thức KaTeX, giải thích nghịch lý rót nước 1/3
    const m4Base = (
      (s.elementIdentification ?? 85) * 0.40 +
      Math.min(30, socraticCount * 5) +
      (params.waterPourParadoxExplained ? 18 : 10) +
      15
    );
    const m4Score = Math.min(100, Math.round(m4Base));

    // 5. M5: Năng lực sử dụng công cụ, phương tiện học toán
    // Dựa trên tương tác 3D WebGL, thước đo, thanh trượt r, h, mô phỏng mặt cắt và quay tròn
    const m5Base = (
      Math.min(45, labActions * 3) +
      (explored >= 3 ? 30 : explored * 10) +
      (s.shapeRecognition ?? 85) * 0.25
    );
    const m5Score = Math.min(100, Math.round(m5Base));

    // Overall Average
    const overallScore = Math.round((m1Score + m2Score + m3Score + m4Score + m5Score) / 5);
    const overallTier = this.getTier(overallScore).label;

    const t1 = this.getTier(m1Score);
    const t2 = this.getTier(m2Score);
    const t3 = this.getTier(m3Score);
    const t4 = this.getTier(m4Score);
    const t5 = this.getTier(m5Score);

    const competencies: Record<'M1' | 'M2' | 'M3' | 'M4' | 'M5', CompetencyScore> = {
      M1: {
        id: 'M1',
        code: 'M1',
        name: 'Tư duy và lập luận toán học',
        score: m1Score,
        tier: t1.tier,
        tierLabel: t1.label,
        description: 'Khả năng quan sát, phân tích cấu trúc không gian, nhận diện quan hệ vuông góc, song song và hình chiếu.',
        indicators: [
          'Nhận biết trục quay hình học, mặt phẳng thiết diện',
          'Suy luận mối liên hệ giữa bán kính $r$, chiều cao $h$ và đường sinh $l$',
          'Hiểu sự bảo toàn diện tích khi khai triển mặt xung quanh'
        ],
        recommendation: m1Score < 70 ? 'Nên tăng cường thực hành xoay mô hình 3D đa hướng và xem mặt cắt thiết diện.' : 'Đạt mức tư duy không gian xuất sắc, sẵn sàng giải toán nâng cao.'
      },
      M2: {
        id: 'M2',
        code: 'M2',
        name: 'Mô hình hóa toán học',
        score: m2Score,
        tier: t2.tier,
        tierLabel: t2.label,
        description: 'Biến đổi các vật thể thực tiễn (lon nước, nón lá, quả địa cầu) thành các hình học chuẩn và thiết lập công thức.',
        indicators: [
          'Chuyển bài toán thực tiễn sang đại lượng toán học chuẩn ($r, h, l$)',
          'Thiết lập phương trình tính thể tích hoặc diện tích phù hợp',
          'Đổi đúng đơn vị đo lường (cm, dm, lít, $m^3$)'
        ],
        recommendation: m2Score < 70 ? 'Cần chú ý bước đổi đơn vị và đọc kỹ các dữ liệu ẩn trong bài toán thực tiễn.' : 'Khả năng mô hình hóa bài toán thực tế rất tốt và chính xác.'
      },
      M3: {
        id: 'M3',
        code: 'M3',
        name: 'Giải quyết vấn đề toán học',
        score: m3Score,
        tier: t3.tier,
        tierLabel: t3.label,
        description: 'Vận dụng kiến thức hình học để giải các dạng bài tập thi tuyển sinh vào 10 và ứng dụng đời sống.',
        indicators: [
          'Thực hiện chuẩn mực 4 bước giải toán Tuyển sinh 10',
          'Tính toán số học chính xác, tránh nhầm lẫn giữa bán kính và đường kính',
          'Biết kiểm tra tính hợp lý của kết quả cuối cùng'
        ],
        recommendation: m3Score < 70 ? 'Nên rèn luyện thêm phương pháp kiểm tra lại kết quả và viết rõ từng bước biến đổi.' : 'Kỹ năng giải bài toán mạch lạc, lập luận chặt chẽ.'
      },
      M4: {
        id: 'M4',
        code: 'M4',
        name: 'Giao tiếp toán học',
        score: m4Score,
        tier: t4.tier,
        tierLabel: t4.label,
        description: 'Trình bày lập luận bằng ngôn ngữ toán học chuẩn mực, sử dụng ký hiệu, công thức và trao đổi với gia sư AI.',
        indicators: [
          'Trình bày công thức bằng ký hiệu toán học chuẩn xác',
          'Giải thích được bản chất định lý và hiện tượng (ví dụ: Nghịch lý 1/3 thể tích)',
          'Tương tác tích cực với Thầy Hiếu AI theo phương pháp gợi mở'
        ],
        recommendation: m4Score < 70 ? 'Hãy đặt câu hỏi thường xuyên với Thầy Hiếu AI và tập diễn đạt lời giải bằng lời văn toán học.' : 'Giao tiếp toán học rất tự tin, sử dụng ký hiệu chuẩn xác.'
      },
      M5: {
        id: 'M5',
        code: 'M5',
        name: 'Sử dụng công cụ, phương tiện học toán',
        score: m5Score,
        tier: t5.tier,
        tierLabel: t5.label,
        description: 'Khai thác thành thạo phòng thí nghiệm 3D WebGL, thanh trượt tham số thực nghiệm và công cụ mô phỏng.',
        indicators: [
          'Làm chủ các góc xoay, phóng to thu nhỏ trên không gian 3D',
          'Sử dụng thành thạo chế độ Khai triển mặt phẳng và Thí nghiệm rót nước',
          'Tận dụng các HUD công cụ hỗ trợ để kiểm chứng công thức'
        ],
        recommendation: m5Score < 70 ? 'Dành thêm thời gian trải nghiệm thanh trượt tham số trong Phòng Thí Nghiệm 3D.' : 'Làm chủ công nghệ mô phỏng 3D xuất sắc, chủ động tự học.'
      }
    };

    const radarData = [
      { subject: 'M1: Tư duy', score: m1Score, fullMark: 100, code: 'M1' },
      { subject: 'M2: Mô hình hóa', score: m2Score, fullMark: 100, code: 'M2' },
      { subject: 'M3: Giải quyết VĐ', score: m3Score, fullMark: 100, code: 'M3' },
      { subject: 'M4: Giao tiếp', score: m4Score, fullMark: 100, code: 'M4' },
      { subject: 'M5: Công cụ 3D', score: m5Score, fullMark: 100, code: 'M5' }
    ];

    const strengths: string[] = [];
    const growthOpportunities: string[] = [];

    Object.values(competencies).forEach((c) => {
      if (c.score >= 80) {
        strengths.push(`${c.name} (${c.code}): ${c.score}/100`);
      } else if (c.score < 70) {
        growthOpportunities.push(`${c.name} (${c.code}): ${c.score}/100 - ${c.recommendation}`);
      }
    });

    if (strengths.length === 0) strengths.push('Có tinh thần học tập kiên trì và tích cực trải nghiệm phòng lab.');
    if (growthOpportunities.length === 0) growthOpportunities.push('Tiếp tục duy trì phong độ và thử sức với các bài toán thực tế phức hợp.');

    const teacherPedagogicalAdvice = overallScore >= 80
      ? `Học sinh ${params.studentName || 'Học sinh'} đạt năng lực xuất sắc ở cả 5 thành phần M1-M5. Đặc biệt phát huy tốt tư duy không gian 3D. Khuyến khích tham gia giải đề thi tuyển sinh mức độ Vận dụng cao.`
      : overallScore >= 65
      ? `Học sinh ${params.studentName || 'Học sinh'} đã nắm vững nền tảng kiến thức hình trụ, nón, cầu. Cần rèn luyện thêm kỹ năng đổi đơn vị và trình bày các bước giải toán thực tế để bứt phá điểm 9-10.`
      : `Học sinh ${params.studentName || 'Học sinh'} cần được củng cố thêm về công thức diện tích xung quanh và thể tích. Thầy/Cô nên cho học sinh tương tác thêm với mô hình 3D trực quan và thí nghiệm rót nước để khắc sâu kiến thức.`;

    return {
      studentId: params.studentId || 'usr-student-001',
      studentName: params.studentName || 'Học sinh Toán 9',
      className: params.className || '9A2',
      evaluatedAt: new Date().toLocaleDateString('vi-VN'),
      overallScore,
      overallTier,
      competencies,
      radarData,
      strengths,
      growthOpportunities,
      teacherPedagogicalAdvice
    };
  }
}
