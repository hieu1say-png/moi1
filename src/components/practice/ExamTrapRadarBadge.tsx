/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * EXAM TRAP RADAR BADGE & 4-STEP PEDAGOGICAL DECODER (RADAR QUÉT BẪY ĐỀ THI VÀO 10)
 * - [M] Mathematics: Radar phân tích đề thi & bẫy đề thi tuyển sinh 10.
 * - Giải mã bản chất bẫy đề và hướng dẫn quy trình giải 4 bước sư phạm chuẩn Bộ GD&ĐT.
 */

import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Radar,
  HelpCircle,
  FileCheck2,
  ArrowRight
} from 'lucide-react';
import { MathFormula, MathText } from '../common/MathFormula';
import { ShapeType } from '../../types';

export interface PedagogicalFourSteps {
  step1: string; // Trích xuất dữ kiện & vạch trần bẫy ngầm
  step2: string; // Quy đổi đơn vị & chuẩn hóa đại lượng (d -> r)
  step3: string; // Lập công thức hình học chuẩn
  step4: string; // Thay số & kiểm tra tính hợp lý thực tế
}

export interface ExamTrapInfo {
  id: string;
  trapTitle: string;
  statisticText: string;
  warningDetail: string;
  preventionStrategy: string;
  mathFormula?: string;
  severity: 'high' | 'medium' | 'critical';
  fourSteps: PedagogicalFourSteps;
}

export interface ExamTrapRadarBadgeProps {
  questionText?: string;
  shape?: ShapeType | 'mixed';
  errorType?: string;
  customWarning?: string;
  isAlwaysVisible?: boolean;
  className?: string;
  showFullFourSteps?: boolean;
}

export const ALL_EXAM_TRAPS: ExamTrapInfo[] = [
  {
    id: 'radius_vs_diameter',
    trapTitle: 'BẪY 1: ĐƯỜNG KÍNH vs BÁN KÍNH',
    statisticText: '🚨 BẪY ĐỀ: 68% học sinh quên chia đôi đường kính d',
    warningDetail: 'Đề bài cho Đường kính d nhưng công thức tính diện tích/thể tích luôn yêu cầu Bán kính r = d / 2.',
    preventionStrategy: 'Luôn gạch chân chữ "đường kính" và viết ngay r = d/2 ra nháp trước khi bấm máy tính!',
    mathFormula: 'r = \\frac{d}{2}',
    severity: 'critical',
    fourSteps: {
      step1: 'Gạch chân từ khóa "đường kính d" trong đề bài. Đánh dấu đỏ để không nhầm với bán kính r.',
      step2: 'Tính ngay bán kính $r = \\frac{d}{2}$ ngay dòng đầu tiên của bài làm.',
      step3: 'Viết công thức diện tích/thể tích chuẩn chứa $r$ (ví dụ: $V = \\pi r^2 h$ hoặc $V = \\frac{4}{3}\\pi r^3$).',
      step4: 'Thế giá trị $r$ vừa tìm được vào công thức và bấm máy tính cẩn thận, ghi rõ đơn vị.'
    }
  },
  {
    id: 'cone_volume_one_third',
    trapTitle: 'BẪY 2: THỂ TÍCH TRỤ vs NÓN (QUÊN 1/3)',
    statisticText: '🚨 BẪY ĐỀ: 61% học sinh quên nhân hệ số 1/3 khi tính thể tích khối nón',
    warningDetail: 'Thể tích khối nón chỉ bằng 1/3 thể tích hình trụ có cùng đáy và chiều cao: V_nón = (1/3)πr²h.',
    preventionStrategy: 'Khối có đỉnh chóp nhọn (nón, chóp) luôn có thừa số 1/3 ở phía trước.',
    mathFormula: 'V_{nón} = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} V_{trụ}',
    severity: 'critical',
    fourSteps: {
      step1: 'Nhận diện hình: Đây là hình có đỉnh nhọn (Hình nón), không phải hình trụ.',
      step2: 'Xác định đủ 2 đại lượng độc lập: Bán kính đáy $r$ và chiều cao $h$ (không nhầm với đường sinh $l$).',
      step3: 'Thiết lập công thức thể tích bắt buộc có hệ số $\\frac{1}{3}$: $V = \\frac{1}{3}\\pi r^2 h$.',
      step4: 'Rút gọn phân số với $\\frac{1}{3}$ trước để tránh sai số làm tròn số thập phân.'
    }
  },
  {
    id: 'hemisphere_vs_sphere',
    trapTitle: 'BẪY 3: BÁN CẦU vs TOÀN CẦU (2/3 vs 4/3)',
    statisticText: '🚨 BẪY ĐỀ: 53% học sinh dùng nhầm 4/3 πR³ cho vật thể dạng bán cầu',
    warningDetail: 'Bán cầu chỉ là một nửa quả cầu, do đó thể tích phải chia đôi: V = (2/3)πR³.',
    preventionStrategy: 'Để ý kỹ từ khóa "bán cầu" hoặc "nửa quả cầu" (chỏm cầu bồn nước, bát ăn cơm) để nhân thêm 1/2.',
    mathFormula: 'V_{bán\\,cầu} = \\frac{1}{2} \\cdot \\left(\\frac{4}{3}\\pi R^3\\right) = \\frac{2}{3}\\pi R^3',
    severity: 'critical',
    fourSteps: {
      step1: 'Đọc kỹ mô tả thực tế: "bán cầu", "nửa khối cầu", "chỏm cầu bằng nửa cầu".',
      step2: 'Xác định bán kính khối cầu $R$.',
      step3: 'Áp dụng công thức thể tích bán cầu: $V_{bán\\,cầu} = \\frac{1}{2} V_{cầu} = \\frac{2}{3}\\pi R^3$.',
      step4: 'Nếu đề hỏi diện tích toàn phần của bán cầu kín thì $S_{tp} = 2\\pi R^2 + \\pi R^2 = 3\\pi R^2$ (cộng thêm mặt đáy tròn phẳng).'
    }
  },
  {
    id: 'unit_conversion',
    trapTitle: 'BẪY 4: QUÊN ĐỔI ĐƠN VỊ ĐO (CM ↔ M ↔ LÍT)',
    statisticText: '🚨 BẪY ĐỀ: 48% học sinh nhầm lẫn đơn vị giữa dm³, lít và cm³',
    warningDetail: 'Quy tắc vàng: 1 dm³ = 1 Lít = 1000 cm³ = 0.001 m³. Cần quy đổi toàn bộ r, h về cùng một đơn vị.',
    preventionStrategy: 'Quy đổi toàn bộ kích thước r, h về cùng đơn vị (cm hoặc dm) trước khi ráp công thức.',
    mathFormula: '1\\text{ dm}^3 = 1\\text{ lít} = 1000\\text{ cm}^3 = 10^{-3}\\text{ m}^3',
    severity: 'high',
    fourSteps: {
      step1: 'Rà soát đơn vị đo của mọi kích thước trong đề: $r, h, l$ và đơn vị của kết quả cần tìm.',
      step2: 'Nếu đề hỏi dung tích theo "Lít", đổi tất cả $r, h$ sang $\\text{dm}$ ngay từ đầu ($1\\text{ dm} = 10\\text{ cm}$).',
      step3: 'Tính thể tích bằng đơn vị $\\text{dm}^3$, sau đó kết luận tương đương số Lít ($1\\text{ dm}^3 = 1\\text{ lít}$).',
      step4: 'Kiểm tra lại độ lớn thực tế: 1 chiếc cốc chứa ~0.3 lít, bồn nước gia đình ~1000 lít.'
    }
  },
  {
    id: 'generatrix_vs_height',
    trapTitle: 'BẪY 5: CHIỀU CAO h vs ĐƯỜNG SINH l HÌNH NÓN',
    statisticText: '🚨 BẪY ĐỀ: 59% học sinh thay nhầm h vào công thức S_xq = πrl',
    warningDetail: 'Diện tích xung quanh hình nón dùng đường sinh l, không phải chiều cao h. Phải tìm l bằng Pythagoras.',
    preventionStrategy: 'Tính l = √(r² + h²) trước khi ráp vào S_xq = πrl.',
    mathFormula: 'l = \\sqrt{r^2 + h^2}',
    severity: 'high',
    fourSteps: {
      step1: 'Phân biệt rõ: $h$ là chiều cao vuông góc từ đỉnh $S$ xuống tâm đáy $O$, còn $l$ là đường sinh nghiêng nối $S$ với mép đáy.',
      step2: 'Xét tam giác vuông $SOA$ vuông tại $O$, áp dụng định lý Pythagore: $l = \\sqrt{h^2 + r^2}$.',
      step3: 'Ráp đường sinh $l$ vào công thức diện tích xung quanh: $S_{xq} = \\pi r l$.',
      step4: 'Kiểm tra: Đường sinh $l$ luôn luôn lớn hơn cả $r$ và $h$ ($l > h, l > r$).'
    }
  },
  {
    id: 'open_top_container',
    trapTitle: 'BẪY THÙNG KHÔNG NẮP (CHỈ CÓ 1 ĐÁY)',
    statisticText: '🚨 BẪY ĐỀ: 54% học sinh tính nhầm 2 đáy cho thùng không nắp',
    warningDetail: 'Vật thể không có nắp chỉ có 1 mặt đáy. Diện tích toàn phần lúc này là S = S_xq + πr² (không nhân 2).',
    preventionStrategy: 'Đọc kỹ đề bài xem bồn/thùng có nắp hay không nắp trước khi áp dụng công thức Stp.',
    mathFormula: 'S_{toàn\\,phần\\,1\\,đáy} = 2\\pi r h + \\pi r^2',
    severity: 'critical',
    fourSteps: {
      step1: 'Đọc kỹ từ khóa: "thùng không nắp", "bể nước hở phía trên", "xô đựng nước 1 đáy".',
      step2: 'Diện tích vật liệu gia công chỉ bao gồm mặt xung quanh và 1 đáy phẳng đáy dưới.',
      step3: 'Công thức diện tích thực tế: $S = S_{xq} + S_{đáy} = 2\\pi r h + \\pi r^2$.',
      step4: 'Ghi chú giải thích rõ trong bài làm: "Do thùng không có nắp nên diện tích toàn phần chỉ tính 1 đáy".'
    }
  }
];

export const detectExamTraps = (text = '', shape?: ShapeType | 'mixed', errorType = ''): ExamTrapInfo | null => {
  const lower = `${text} ${errorType}`.toLowerCase();

  // Bẫy 1
  if (lower.includes('đường kính') || lower.includes('diameter') || lower.includes('d =') || lower.includes('d=') || errorType.includes('RADIUS_DIAMETER')) {
    return ALL_EXAM_TRAPS[0];
  }

  // Bẫy 2
  if (lower.includes('thể tích hình nón') || lower.includes('thể tích nón') || (shape === 'cone' && (lower.includes('thể tích') || lower.includes('v ='))) || errorType.includes('FORGOT_ONE_THIRD')) {
    if (!lower.includes('bán cầu')) {
      return ALL_EXAM_TRAPS[1];
    }
  }

  // Bẫy 3
  if (lower.includes('bán cầu') || lower.includes('nửa hình cầu') || lower.includes('nửa quả cầu') || lower.includes('chỏm cầu') || errorType.includes('HEMISPHERE')) {
    return ALL_EXAM_TRAPS[2];
  }

  // Bẫy 4
  if (lower.includes('dm3') || lower.includes('dm³') || lower.includes('lít') || lower.includes('lit') || lower.includes('mét khối') || lower.includes('m3') || lower.includes('m³') || lower.includes('chứa được') || lower.includes('dung tích')) {
    return ALL_EXAM_TRAPS[3];
  }

  // Bẫy 5
  if (shape === 'cone' || lower.includes('nón') || lower.includes('đường sinh') || lower.includes('generatrix')) {
    if (lower.includes('chiều cao') || lower.includes('h =') || lower.includes('diện tích xung quanh')) {
      return ALL_EXAM_TRAPS[4];
    }
  }

  // Thùng không nắp
  if (lower.includes('không nắp') || lower.includes('1 đáy') || lower.includes('hở') || lower.includes('bồn không nắp') || lower.includes('thùng rỗng')) {
    return ALL_EXAM_TRAPS[5];
  }

  return null;
};

export const ExamTrapRadarBadge: React.FC<ExamTrapRadarBadgeProps> = ({
  questionText = '',
  shape,
  errorType = '',
  customWarning,
  isAlwaysVisible = false,
  className = '',
  showFullFourSteps = true
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeStepTab, setActiveStepTab] = useState<1 | 2 | 3 | 4>(1);

  const trap = useMemo(() => {
    return detectExamTraps(questionText, shape, errorType);
  }, [questionText, shape, errorType]);

  if (!trap && !customWarning && !isAlwaysVisible) return null;

  const activeTrap = trap || ALL_EXAM_TRAPS[0];
  const title = customWarning ? 'CẢNH BÁO BẪY ĐỀ THI' : activeTrap.trapTitle;
  const stat = customWarning || activeTrap.statisticText;
  const detail = activeTrap.warningDetail;
  const strategy = activeTrap.preventionStrategy;

  return (
    <div
      className={`rounded-2xl border transition-all ${
        activeTrap.severity === 'critical'
          ? 'bg-[#FFF5F5] border-[#FECDD3] text-[#9F1239]'
          : 'bg-[#FFFBF0] border-[#FDE68A] text-[#92400E]'
      } p-3.5 sm:p-4 shadow-xs ${className}`}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between gap-2 cursor-pointer select-none"
      >
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-xl bg-[#E11D48] text-white font-bold text-xs shrink-0 shadow-2xs">
            <Radar className="w-4 h-4 animate-pulse" />
          </span>
          <div>
            <div className="text-xs font-bold text-[#0F291E] flex items-center gap-1.5">
              <span>{title}</span>
              <span className="px-2 py-0.2 rounded bg-white/80 text-[10px] font-mono text-[#E11D48] border border-[#FECDD3]">
                {activeTrap.severity.toUpperCase()}
              </span>
            </div>
            <div className="text-[11px] font-medium text-[#658473] mt-0.5">
              {stat}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="p-1.5 rounded-xl bg-white/80 text-[#334E40] border border-[#E2EADF] hover:bg-white cursor-pointer"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3.5 pt-3.5 border-t border-[#E2EADF] text-xs space-y-3">
          <div className="font-medium text-[#334E40] leading-relaxed">
            <strong className="text-[#0F291E]">⚠️ Bản chất bẫy:</strong> {detail}
          </div>

          {activeTrap.mathFormula && (
            <div className="p-2.5 bg-white rounded-xl border border-[#E2EADF] font-bold text-center text-sm shadow-2xs">
              <MathFormula formula={activeTrap.mathFormula} inline />
            </div>
          )}

          <div className="flex items-center gap-2 text-[#065F46] font-bold bg-[#ECFDF5] p-2.5 rounded-xl border border-[#A7F3D0]">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16A34A]" />
            <span><strong>Mẹo hóa giải thần tốc:</strong> {strategy}</span>
          </div>

          {/* 4-Step Pedagogical Methodology Card */}
          {showFullFourSteps && (
            <div className="bg-white rounded-xl border border-[#E2EADF] p-3.5 space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold text-[#0F291E]">
                <span className="flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-[#16A34A]" />
                  Quy Trình 4 Bước Sư Phạm Hóa Giải:
                </span>
                <span className="text-[10px] text-[#658473] font-normal">Chuẩn thi Tuyển sinh 10</span>
              </div>

              {/* Step tabs */}
              <div className="grid grid-cols-4 gap-1">
                {[1, 2, 3, 4].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setActiveStepTab(s as 1 | 2 | 3 | 4)}
                    className={`py-1 text-center rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                      activeStepTab === s
                        ? 'bg-[#16A34A] text-white shadow-2xs'
                        : 'bg-[#F8FAF5] text-[#4F6859] hover:bg-[#EAEFE8]'
                    }`}
                  >
                    Bước {s}
                  </button>
                ))}
              </div>

              {/* Active Step Content */}
              <div className="p-2.5 rounded-lg bg-[#F8FAF5] border border-[#E2EADF] text-[11px] text-[#334E40] leading-relaxed">
                {activeStepTab === 1 && (
                  <div>
                    <strong className="text-[#0F291E] block mb-1">Bước 1: Trích xuất dữ kiện &amp; Vạch trần bẫy ngầm</strong>
                    <MathText text={activeTrap.fourSteps.step1} />
                  </div>
                )}
                {activeStepTab === 2 && (
                  <div>
                    <strong className="text-[#0F291E] block mb-1">Bước 2: Quy đổi đơn vị &amp; Chuẩn hóa đại lượng (d &rarr; r)</strong>
                    <MathText text={activeTrap.fourSteps.step2} />
                  </div>
                )}
                {activeStepTab === 3 && (
                  <div>
                    <strong className="text-[#0F291E] block mb-1">Bước 3: Lập công thức hình học chuẩn</strong>
                    <MathText text={activeTrap.fourSteps.step3} />
                  </div>
                )}
                {activeStepTab === 4 && (
                  <div>
                    <strong className="text-[#0F291E] block mb-1">Bước 4: Thay số &amp; Kiểm tra tính hợp lý thực tế</strong>
                    <MathText text={activeTrap.fourSteps.step4} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
