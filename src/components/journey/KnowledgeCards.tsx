/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Knowledge Cards Component
 * Step 2 of Learning Journey: Khám Phá Kiến Thức
 * Renders mathematical definitions, characteristics, and formulas with KaTeX.
 * ZERO raw LaTeX leaks.
 */

import React, { useState } from 'react';
import { ShapeType } from '../../types';
import { DETAILED_THEORY_DATA } from '../../data/theoryContentData';
import { MathFormula, MathText } from '../common/MathFormula';
import {
  BookOpen,
  Layers,
  Sparkles,
  ChevronRight,
  Maximize2,
  CheckCircle2,
  HelpCircle,
  Zap,
  Info
} from 'lucide-react';

interface KnowledgeCardsProps {
  shapeType: ShapeType;
  onCompleted?: () => void;
}

export const KnowledgeCards: React.FC<KnowledgeCardsProps> = ({ shapeType, onCompleted }) => {
  const theory = DETAILED_THEORY_DATA[shapeType];
  const [activeTab, setActiveTab] = useState<'concept' | 'elements' | 'formulas' | 'archimedes'>('concept');
  const [reviewedCards, setReviewedCards] = useState<Record<string, boolean>>({ concept: true });

  const markCardRead = (cardId: string) => {
    const updated = { ...reviewedCards, [cardId]: true };
    setReviewedCards(updated);
    if (updated.concept && updated.elements && updated.formulas && onCompleted) {
      onCompleted();
    }
  };

  const handleTabChange = (tab: 'concept' | 'elements' | 'formulas' | 'archimedes') => {
    setActiveTab(tab);
    markCardRead(tab);
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => handleTabChange('concept')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'concept'
              ? 'bg-[#8F3E32] text-white shadow-xs'
              : 'bg-[#F4EEE4] text-[#594D46] hover:bg-[#EADBCC]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. Khái Niệm & Sự Tạo Thành</span>
          {reviewedCards.concept && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('elements')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'elements'
              ? 'bg-[#8F3E32] text-white shadow-xs'
              : 'bg-[#F4EEE4] text-[#594D46] hover:bg-[#EADBCC]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>2. Các Yếu Tố Hình Học</span>
          {reviewedCards.elements && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('formulas')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'formulas'
              ? 'bg-[#8F3E32] text-white shadow-xs'
              : 'bg-[#F4EEE4] text-[#594D46] hover:bg-[#EADBCC]'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>3. Công Thức Trọng Tâm</span>
          {reviewedCards.formulas && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('archimedes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'archimedes'
              ? 'bg-[#8F3E32] text-white shadow-xs'
              : 'bg-[#F4EEE4] text-[#594D46] hover:bg-[#EADBCC]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>4. Mối Liên Hệ & Mẹo Nhớ</span>
          {reviewedCards.archimedes && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>
      </div>

      {/* Tab 1: Khái niệm & Sự tạo thành */}
      {activeTab === 'concept' && (
        <div className="space-y-4 bg-[#FFFDF8] border border-[#E5DCCF] rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2 text-[#8F3E32] font-serif font-bold text-base sm:text-lg">
            <BookOpen className="w-5 h-5" />
            <h3>Khái niệm {theory.vietnameseName} trong Toán học 9</h3>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DCCF] text-sm sm:text-base text-[#3A302B] leading-relaxed">
            <MathText text={theory.recognition.concept} />
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-[#766A61] uppercase tracking-wider">
              Cơ chế quay tạo hình không gian:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-[#E5DCCF] space-y-1">
                <span className="text-xs font-bold text-[#8F3E32]">Hình phẳng ban đầu:</span>
                <p className="text-xs sm:text-sm text-[#594D46]">
                  <MathText text={theory.recognition.rotationDetail.planeFigure} />
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E5DCCF] space-y-1">
                <span className="text-xs font-bold text-[#8F3E32]">Trục quay cố định:</span>
                <p className="text-xs sm:text-sm text-[#594D46]">
                  <MathText text={theory.recognition.rotationDetail.rotationAxis} />
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E5DCCF] space-y-1 sm:col-span-2">
                <span className="text-xs font-bold text-[#8F3E32]">Bộ phận quét trong không gian:</span>
                <p className="text-xs sm:text-sm text-[#594D46]">
                  <MathText text={theory.recognition.rotationDetail.movingPart} />
                </p>
              </div>
            </div>
          </div>

          {theory.recognition.keyVisualNote && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>{theory.recognition.keyVisualNote}</span>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Các yếu tố hình học */}
      {activeTab === 'elements' && (
        <div className="space-y-4 bg-[#FFFDF8] border border-[#E5DCCF] rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2 text-[#8F3E32] font-serif font-bold text-base sm:text-lg">
            <Layers className="w-5 h-5" />
            <h3>Các thông số &amp; yếu tố cấu thành {theory.vietnameseName}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {theory.characteristics.elements.map((elem, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DCCF] space-y-2 hover:border-[#8F3E32]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#3A302B]">{elem.name}</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#F4EEE4] font-mono text-xs font-bold text-[#8F3E32]">
                    <MathFormula formula={elem.symbol} display="inline" />
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#594D46]">
                  <MathText text={elem.description} />
                </p>
                {elem.relationFormula && (
                  <div className="pt-1 text-xs text-[#766A61] flex items-center gap-1.5">
                    <span className="font-semibold">Liên hệ:</span>
                    <MathFormula formula={elem.relationFormula} display="inline" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {theory.characteristics.crossSections && theory.characteristics.crossSections.length > 0 && (
            <div className="pt-3 space-y-2.5">
              <h4 className="text-xs font-bold text-[#766A61] uppercase tracking-wider">
                Mặt cắt khi cắt bởi mặt phẳng:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {theory.characteristics.crossSections.map((cs, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-[#E5DCCF] text-xs sm:text-sm">
                    <div className="font-bold text-[#3A302B]">{cs.name}</div>
                    <div className="text-[#594D46] mt-0.5">{cs.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Công thức trọng tâm */}
      {activeTab === 'formulas' && (
        <div className="space-y-4 bg-[#FFFDF8] border border-[#E5DCCF] rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2 text-[#8F3E32] font-serif font-bold text-base sm:text-lg">
            <Zap className="w-5 h-5" />
            <h3>Công thức cốt lõi cần thuộc lòng</h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {theory.formulas.list.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FAF7F2] to-white border border-[#E5DCCF] space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="font-serif font-bold text-sm sm:text-base text-[#3A302B]">
                    {item.vietnameseName}
                  </div>
                  <div className="p-2 sm:px-4 sm:py-2 rounded-xl bg-white border border-[#E5DCCF] shadow-2xs text-center">
                    <MathFormula formula={item.latex} display="block" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#594D46] leading-relaxed">
                  <MathText text={item.explanation} />
                </p>

                {item.variables && item.variables.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#E5DCCF]/60 text-xs text-[#766A61]">
                    <span className="font-semibold">Trong đó:</span>
                    {item.variables.map((v, vIdx) => (
                      <span key={vIdx} className="bg-[#F4EEE4] px-2 py-0.5 rounded-md">
                        <MathFormula formula={v.symbol} display="inline" />: {v.meaning}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {theory.formulas.goldenRule && (
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-800">
                <Sparkles className="w-4 h-4" />
                <span>Quy Tắc Vàng Khi Đi Thi</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">
                <MathText text={theory.formulas.goldenRule} />
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Mối liên hệ & Archimedes */}
      {activeTab === 'archimedes' && (
        <div className="space-y-4 bg-[#FFFDF8] border border-[#E5DCCF] rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2 text-[#8F3E32] font-serif font-bold text-base sm:text-lg">
            <Sparkles className="w-5 h-5" />
            <h3>Mối Liên Hệ Tam Thể Archimedes (Trụ – Cầu – Nón)</h3>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DCCF] text-xs sm:text-sm text-[#3A302B] space-y-2">
            <p className="font-semibold text-[#8F3E32]">
              Định lý bất hủ khắc trên bia mộ nhà bác học Archimedes:
            </p>
            <p className="leading-relaxed">
              Nếu một hình trụ, một hình cầu và một hình nón có cùng bán kính đáy <MathFormula formula="r" display="inline" /> và chiều cao bằng đường kính <MathFormula formula="h = 2r" display="inline" />, thì thể tích của chúng tỉ lệ với các số nguyên:
            </p>
            <div className="my-3 p-3 bg-white rounded-xl border border-[#E5DCCF] text-center font-serif text-base sm:text-lg text-[#3A302B]">
              <MathFormula formula="V_{\text{nón}} : V_{\text{cầu}} : V_{\text{trụ}} = 1 : 2 : 3" display="block" />
            </div>
            <p className="text-xs text-[#766A61]">
              Ý nghĩa: Thể tích khối nón bằng <MathFormula formula="\frac{1}{3}" display="inline" /> thể tích khối trụ; thể tích khối cầu bằng <MathFormula formula="\frac{2}{3}" display="inline" /> thể tích khối trụ ngoại tiếp!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-white border border-[#E5DCCF] text-center space-y-1">
              <div className="text-xs font-bold text-[#8F3E32]">1. Hình Nón</div>
              <div className="font-mono text-sm font-bold text-[#3A302B]">
                <MathFormula formula="V = \frac{1}{3}\pi r^2 h" display="inline" />
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-[#E5DCCF] text-center space-y-1">
              <div className="text-xs font-bold text-[#4D6B42]">2. Hình Cầu</div>
              <div className="font-mono text-sm font-bold text-[#3A302B]">
                <MathFormula formula="V = \frac{4}{3}\pi R^3" display="inline" />
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-[#E5DCCF] text-center space-y-1">
              <div className="text-xs font-bold text-[#2563EB]">3. Hình Trụ</div>
              <div className="font-mono text-sm font-bold text-[#3A302B]">
                <MathFormula formula="V = \pi r^2 h" display="inline" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
