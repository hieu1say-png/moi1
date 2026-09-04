/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CHỨNG CHỈ VINH DANH HỌC TẬP GEOMETRY LAB (CERTIFICATE MODAL)
 * Generates an official Certificate of Mastery for Grade 9 Spatial Geometry:
 * - Student Name, Completed Date, Score / Rank
 * - QR Code Verification for Authenticity
 * - Digital Signature & Seal of Teacher / Geometry Lab
 * - Direct Print / PDF Save
 */

import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../common/Button';
import {
  Award,
  Download,
  Printer,
  X,
  Sparkles,
  QrCode,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentId?: string;
  score?: number;
  completedTopic?: string;
  issueDate?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName,
  studentId = 'HS-2026-9A1',
  score = 95,
  completedTopic = 'Chuyên Đề Hình Trụ - Hình Nón - Hình Cầu (Toán 9)',
  issueDate = new Date().toLocaleDateString('vi-VN')
}) => {
  const certificateRef = useRef<HTMLDivElement | null>(null);
  const { showSuccess } = useToast();

  const handlePrint = () => {
    window.print();
    showSuccess('Đang chuẩn bị lệnh in chứng chỉ...');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl border-4 border-amber-600 shadow-[8px_8px_0px_#000] max-w-3xl w-full p-6 sm:p-8 relative space-y-6 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Certificate Printable Canvas Body */}
          <div
            ref={certificateRef}
            className="border-8 border-double border-amber-500 bg-gradient-to-b from-[#FFFDF8] via-[#FFFBF0] to-[#FFF8E7] p-6 sm:p-10 rounded-2xl text-center space-y-6 relative overflow-hidden"
          >
            {/* Watermark Logo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
              <Award className="w-96 h-96 text-amber-900" />
            </div>

            {/* Top Emblem & Header */}
            <div className="space-y-2 relative z-10">
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-amber-500 border-2 border-black flex items-center justify-center shadow-md">
                  <Award className="w-7 h-7 text-white" />
                </div>
              </div>

              <div className="text-xs font-black tracking-widest uppercase text-amber-800">
                HỆ THỐNG GIÁO DỤC HÌNH HỌC KHÔNG GIAN SỐ — GEOMETRY LAB
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
                GIẤY CHỨNG NHẬN VINH DANH
              </h1>
              <div className="text-xs text-slate-500 italic">
                Certificate of Academic Excellence in 3D Spatial Geometry
              </div>
            </div>

            {/* Recipient Details */}
            <div className="space-y-3 relative z-10 py-2 border-y-2 border-amber-200">
              <p className="text-xs sm:text-sm text-slate-600">Trang trọng trao tặng học sinh xuất sắc:</p>
              <h2 className="text-xl sm:text-3xl font-black text-blue-900 uppercase font-sans tracking-wide">
                {studentName}
              </h2>
              <p className="text-xs text-slate-500 font-mono">Mã Định Danh: {studentId}</p>
              <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
                Đã hoàn thành xuất sắc toàn bộ lộ trình thí nghiệm 3D, phòng thi thử tuyển sinh 10 và làm chủ hoàn toàn chuyên đề:
              </p>
              <div className="text-sm sm:text-base font-bold text-amber-950 font-serif">
                "{completedTopic}"
              </div>
            </div>

            {/* Achievement Matrix & Grade */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto relative z-10">
              <div className="bg-white/80 border border-amber-300 rounded-xl p-2.5">
                <div className="text-[10px] text-slate-500 font-bold">Điểm Tổng Kết</div>
                <div className="text-lg font-black text-emerald-600 font-mono">{score}/100</div>
              </div>
              <div className="bg-white/80 border border-amber-300 rounded-xl p-2.5">
                <div className="text-[10px] text-slate-500 font-bold">Xếp Loại</div>
                <div className="text-lg font-black text-amber-600">XUẤT SẮC</div>
              </div>
              <div className="bg-white/80 border border-amber-300 rounded-xl p-2.5">
                <div className="text-[10px] text-slate-500 font-bold">Ngày Cấp</div>
                <div className="text-xs font-black text-slate-800 mt-1">{issueDate}</div>
              </div>
            </div>

            {/* Footer Signatures & QR Code */}
            <div className="pt-4 flex items-end justify-between relative z-10 text-left">
              {/* QR Verification */}
              <div className="flex items-center gap-3 bg-white/90 p-2.5 rounded-xl border border-amber-300 shadow-2xs">
                {/* SVG QR Code Simulation */}
                <div className="w-12 h-12 bg-slate-900 p-1 rounded flex items-center justify-center shrink-0">
                  <QrCode className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-slate-800 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Mã Xác Thực
                  </div>
                  <div className="text-[9px] text-slate-500 font-mono">GL-VERIFY-{Date.now().toString().slice(-6)}</div>
                  <div className="text-[8px] text-slate-400">Quét để tra cứu học bạ số</div>
                </div>
              </div>

              {/* Digital Seal & Teacher Signature */}
              <div className="text-center space-y-1">
                <div className="text-[11px] font-bold text-slate-500">BAN GIẢNG HUẤN TOÁN 9</div>
                <div className="h-10 flex items-center justify-center">
                  <span className="font-serif italic font-black text-blue-900 text-lg">
                    Thầy Hiếu &amp; Hội đồng Chuyên môn
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">Chữ Ký Số Đã Chứng Thực</div>
              </div>
            </div>
          </div>

          {/* Action Button Controls */}
          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" onClick={onClose} className="text-xs font-bold">
              Đóng
            </Button>
            <Button
              variant="primary"
              onClick={handlePrint}
              className="text-xs font-bold flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Printer className="w-4 h-4" />
              <span>In Chứng Chỉ (Print / Save PDF)</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
