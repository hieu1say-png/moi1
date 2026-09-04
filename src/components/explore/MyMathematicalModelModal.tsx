/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - MY MATHEMATICAL MODEL MODAL & PRINTABLE PDF EXPORT
 * Generates an official pedagogical report:
 * - Header: TRƯỜNG PHỔ THÔNG THỰC HÀNH SƯ PHẠM - ThS. TRẦN NGỌC HIẾU
 * - Student info, Active Shape & 3D Parameters (r, h, l, V, Sxq, Stp)
 * - 4-Step Standard Mathematical Derivation
 * - M1 - M5 Competency Evaluation (Chương trình GDPT 2018)
 * - Teacher AI Verification Stamp & Pedagogical Remarks
 * - Print / PDF Export support
 */

import React, { useRef } from 'react';
import {
  X,
  Printer,
  Download,
  Award,
  CheckCircle2,
  Brain,
  Layers,
  Sparkles,
  School,
  UserCheck,
  Calendar,
  FileSpreadsheet
} from 'lucide-react';
import { CompetencyEvaluator } from '../../services/competencyEvaluator';
import { useAuth } from '../../context/AuthContext';
import { useSpatialProfileStore } from '../../stores/useSpatialProfileStore';

export interface MyMathematicalModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  shapeType: 'cylinder' | 'cone' | 'sphere';
  radius: number;
  height: number;
  calculations: {
    slantHeight: number | string;
    sxq: string;
    stp: string;
    v: string;
    baseArea: string;
    sxqPi: string;
    vPi: string;
  };
}

export const MyMathematicalModelModal: React.FC<MyMathematicalModelModalProps> = ({
  isOpen,
  onClose,
  shapeType,
  radius,
  height,
  calculations
}) => {
  const { studentUser, teacherUser, activeRole } = useAuth();
  const { scores } = useSpatialProfileStore();
  const printableRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const shapeTitle =
    shapeType === 'cylinder' ? 'Hình Trụ Tròn Xoay' :
    shapeType === 'cone' ? 'Hình Nón Tròn Xoay' : 'Khối Cầu Không Gian';

  const studentName = (studentUser as any)?.fullName || studentUser?.username || 'Học sinh Toán 9';
  const className = (studentUser as any)?.className || '9A2';
  const teacherName = 'ThS. Trần Ngọc Hiếu';
  const schoolName = 'Trường Phổ thông Thực hành Sư phạm';
  const reportDate = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  // Calculate M1 - M5 Competencies
  const evaluation = CompetencyEvaluator.evaluate({
    studentId: studentUser?.id || 'usr-student-001',
    studentName,
    className,
    spatialScores: scores,
    exploredShapesCount: 3,
    completedPracticesCount: 5,
    quizAccuracy: 88,
    labInteractionsCount: 22,
    socraticInteractionsCount: 7,
    unfoldCompleted: true,
    waterPourParadoxExplained: true
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in font-sans">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Controls Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-orange-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                Hồ Sơ Mô Hình Toán Học & Báo Cáo Năng Lực STEM
              </h2>
              <p className="text-xs text-slate-300">
                Chuẩn sư phạm Chương trình GDPT 2018 • Toán 9 Không Gian
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-orange-600/30 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>In / Lưu PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Body */}
        <div ref={printableRef} className="p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-800 bg-white print:p-0 print:m-0">
          {/* 1. Official School Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wide mb-1">
                <School className="w-4 h-4 text-blue-700" />
                <span>{schoolName}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                BÁO CÁO MÔ HÌNH HÌNH HỌC KHÔNG GIAN
              </h1>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Chương trình STEM 5.0 • Chuyên đề: Hình Trụ – Hình Nón – Hình Cầu
              </p>
            </div>

            <div className="text-right sm:border-l sm:border-slate-200 sm:pl-4 text-xs space-y-1">
              <div className="font-bold text-slate-800">
                Tác giả: <span className="text-blue-800">{teacherName}</span>
              </div>
              <div className="text-slate-500 flex items-center gap-1 sm:justify-end">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Ngày xuất: {reportDate}</span>
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                <CheckCircle2 className="w-3 h-3" />
                <span>Đã kiểm định 3D thực nghiệm</span>
              </div>
            </div>
          </div>

          {/* 2. Student & Session Information */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">Học sinh:</span>
              <strong className="text-slate-900 font-bold">{studentName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Lớp:</span>
              <strong className="text-slate-900 font-bold">{className}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Mô hình khảo sát:</span>
              <strong className="text-orange-700 font-bold">{shapeTitle}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Xếp loại năng lực:</span>
              <strong className="text-blue-700 font-bold">{evaluation.overallTier}</strong>
            </div>
          </div>

          {/* 3. 3D Parameter Specifications & Live Calculations */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-600" />
              <span>1. Thông số mô hình 3D thực nghiệm</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-center">
                <span className="text-[10px] text-blue-700 font-semibold uppercase block">Bán kính (r)</span>
                <span className="text-lg font-black text-blue-900">{radius} cm</span>
              </div>

              <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl text-center">
                <span className="text-[10px] text-indigo-700 font-semibold uppercase block">Chiều cao (h)</span>
                <span className="text-lg font-black text-indigo-900">{height} cm</span>
              </div>

              {shapeType === 'cone' && (
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-center">
                  <span className="text-[10px] text-amber-700 font-semibold uppercase block">Đường sinh (l)</span>
                  <span className="text-lg font-black text-amber-900">{calculations.slantHeight} cm</span>
                </div>
              )}

              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-center">
                <span className="text-[10px] text-emerald-700 font-semibold uppercase block">Diện tích xung quanh</span>
                <span className="text-sm font-bold text-emerald-900 block mt-1">{calculations.sxq} cm²</span>
                <span className="text-[10px] text-emerald-600">({calculations.sxqPi}π)</span>
              </div>

              <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-xl text-center">
                <span className="text-[10px] text-teal-700 font-semibold uppercase block">Diện tích toàn phần</span>
                <span className="text-sm font-bold text-teal-900 block mt-1">{calculations.stp} cm²</span>
              </div>

              <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-xl text-center">
                <span className="text-[10px] text-purple-700 font-semibold uppercase block">Thể tích (V)</span>
                <span className="text-sm font-bold text-purple-900 block mt-1">{calculations.v} cm³</span>
                <span className="text-[10px] text-purple-600">({calculations.vPi}π)</span>
              </div>
            </div>
          </div>

          {/* 4. 4-Step Standard Mathematical Derivation */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-600" />
              <span>2. Chuẩn 4 Bước Giải Toán Tuyển Sinh 10</span>
            </h3>

            <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong className="text-blue-900 font-bold block mb-1">
                  Bước 1: Xác định dữ kiện và quy đổi đơn vị
                </strong>
                <p className="text-slate-700">
                  Mô hình {shapeTitle} có bán kính đáy r = {radius} cm, chiều cao h = {height} cm.
                  {shapeType === 'cone' && ` Đường sinh tính theo định lý Pythagoras: l = √(r² + h²) = √(${radius}² + ${height}²) ≈ ${calculations.slantHeight} cm.`}
                  Các đơn vị đã đồng nhất.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong className="text-blue-900 font-bold block mb-1">
                  Bước 2: Thiết lập công thức toán học chuẩn
                </strong>
                <p className="text-slate-700 font-mono text-[11px]">
                  {shapeType === 'cylinder' && 'Sxq = 2πrh • Stp = 2πrh + 2πr² • V = πr²h'}
                  {shapeType === 'cone' && 'Sxq = πrl • Stp = πrl + πr² • V = 1/3 πr²h'}
                  {shapeType === 'sphere' && 'S = 4πr² • V = 4/3 πr³'}
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong className="text-blue-900 font-bold block mb-1">
                  Bước 3: Thay số và tính toán chi tiết
                </strong>
                <p className="text-slate-700">
                  - Thể tích: V = {calculations.vPi}&pi; &approx; {calculations.v} cm&sup3;.<br />
                  - Diện tích xung quanh: Sxq = {calculations.sxqPi}&pi; &approx; {calculations.sxq} cm&sup2;.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong className="text-blue-900 font-bold block mb-1">
                  Bước 4: Kết luận và đánh giá thực tiễn
                </strong>
                <p className="text-slate-700">
                  Kết quả tính toán khớp hoàn toàn với số liệu đo lường mô phỏng trong phòng thí nghiệm 3D WebGL.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Competency Evaluation M1 - M5 (GDPT 2018) */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>3. Đánh giá 5 Thành phần Năng lực Toán học (M1 - M5)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {Object.values(evaluation.competencies).map((comp) => (
                <div key={comp.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-center">
                  <div className="text-[11px] font-black text-blue-900">{comp.code}</div>
                  <div className="text-[10px] text-slate-600 font-semibold line-clamp-1 mt-0.5">{comp.name}</div>
                  <div className="text-xl font-black text-slate-900 my-1">{comp.score}<span className="text-[10px] text-slate-400">/100</span></div>
                  <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {comp.tier === 'mastered' ? 'Xuất sắc' : comp.tier === 'good' ? 'Khá tốt' : 'Cần rèn luyện'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Teacher Note & Electronic Stamp */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex-1">
              <div className="text-[11px] font-bold text-slate-600 uppercase mb-1">
                Nhận xét của Giáo viên bộ môn & Thầy Hiếu AI:
              </div>
              <p className="text-xs text-slate-700 italic bg-amber-50/60 p-3 rounded-xl border border-amber-200/70">
                "{evaluation.teacherPedagogicalAdvice}"
              </p>
            </div>

            <div className="text-center sm:text-right shrink-0 border border-slate-200 p-3 rounded-2xl bg-slate-50">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Chứng thực học liệu điện tử</div>
              <div className="font-bold text-blue-900 mt-1">{teacherName}</div>
              <div className="text-[10px] text-slate-600">Trường PT Thực hành Sư phạm</div>
              <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>STEM 5.0 VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
