/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - STUDENT CREDENTIAL SHEET & PRINTABLE CARDS MODAL
 * Generates single or batch printable credential cards (4-6 cards per A4 page)
 * with instructions for students to log in.
 */

import React, { useRef } from 'react';
import { StudentCredentialCardItem } from '../../types/auth';
import { Printer, Copy, Check, X, Shield, KeyRound, User, Sparkles, BookOpen } from 'lucide-react';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';

interface StudentCredentialSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  credentials: StudentCredentialCardItem[];
  title?: string;
}

export const StudentCredentialSheetModal: React.FC<StudentCredentialSheetModalProps> = ({
  isOpen,
  onClose,
  credentials,
  title = 'Phiếu Thông Tin Đăng Nhập Học Sinh'
}) => {
  const { showSuccess } = useToast();
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen || credentials.length === 0) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopySingle = (item: StudentCredentialCardItem) => {
    const text = `GEOMETRY LAB - TÀI KHOẢN HỌC SINH\nHọ tên: ${item.fullName}\nLớp: ${item.className}\nTrường: ${item.school}\nTên tài khoản: ${item.username}\nMật khẩu tạm: ${item.temporaryPassword || 'Demo@123'}\nĐịa chỉ truy cập: Geometry Lab`;
    navigator.clipboard.writeText(text);
    showSuccess(`Đã sao chép thông tin của ${item.fullName}!`);
  };

  const handleCopyAll = () => {
    const lines = credentials.map((item, idx) =>
      `${idx + 1}. Họ tên: ${item.fullName} | Lớp: ${item.className} | Username: ${item.username} | Mật khẩu: ${item.temporaryPassword || 'Demo@123'}`
    );
    navigator.clipboard.writeText(lines.join('\n'));
    showSuccess(`Đã sao chép danh sách ${credentials.length} tài khoản!`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl space-y-6 my-auto max-h-[90vh] flex flex-col">
        {/* Header (hidden in print) */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 shrink-0 print:hidden">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-orange-600" />
              <span>{title}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Phát phiếu cho học sinh đăng nhập lần đầu. Mật khẩu tạm chỉ hiển thị trong phiên này.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              shape="pill"
              leftIcon={<Copy className="w-4 h-4" />}
              onClick={handleCopyAll}
              className="text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Sao Chép Tất Cả
            </Button>
            <Button
              variant="cylinder"
              size="sm"
              shape="pill"
              leftIcon={<Printer className="w-4 h-4" />}
              onClick={handlePrint}
              className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
            >
              In Phiếu (A4)
            </Button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notice alert */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-xs text-amber-800 shrink-0 print:hidden">
          <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Lưu ý bảo mật:</strong> Để đảm bảo an toàn thông tin, hệ thống mã hóa mật khẩu và không lưu plaintext trong cơ sở dữ liệu. Thầy/Cô vui lòng in hoặc gửi phiếu trực tiếp cho học sinh.
          </span>
        </div>

        {/* Printable Grid of Cards */}
        <div
          ref={printRef}
          className="flex-1 overflow-y-auto p-2 grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-4 print:p-0"
        >
          {credentials.map((item, idx) => (
            <div
              key={item.id || idx}
              className="border-2 border-dashed border-slate-300 rounded-2xl p-5 bg-gradient-to-br from-slate-50 via-white to-orange-50/20 relative flex flex-col justify-between space-y-4 page-break-inside-avoid print:border-slate-800 print:bg-white"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-500 text-white font-black flex items-center justify-center text-xs">
                    GL
                  </div>
                  <div>
                    <span className="text-[11px] font-black tracking-wider text-slate-900 uppercase block">
                      GEOMETRY LAB
                    </span>
                    <span className="text-[9px] font-bold text-orange-600 uppercase">
                      THẺ ĐĂNG NHẬP HỌC SINH
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopySingle(item)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer print:hidden text-[10px] font-bold flex items-center gap-1"
                  title="Sao chép phiếu này"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép</span>
                </button>
              </div>

              {/* Student info */}
              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Họ và tên:</span>
                    <span className="font-black text-slate-900 text-sm">{item.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Lớp:</span>
                    <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 inline-block">
                      {item.className}
                    </span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500">Tên tài khoản (Username):</span>
                    <span className="font-mono font-black text-slate-900 text-xs px-2 py-0.5 bg-slate-100 rounded">
                      {item.username}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500">Mật khẩu tạm thời:</span>
                    <span className="font-mono font-black text-orange-600 text-xs px-2 py-0.5 bg-orange-50 border border-orange-200 rounded">
                      {item.temporaryPassword || 'Demo@123'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4-Step Instructions */}
              <div className="border-t border-slate-100 pt-2 text-[10px] text-slate-500 space-y-0.5">
                <span className="font-bold text-slate-700 block text-[10px]">Hướng dẫn đăng nhập:</span>
                <p>1. Mở ứng dụng <strong>GEOMETRY LAB</strong>.</p>
                <p>2. Nhập tên tài khoản và mật khẩu tạm ở trên.</p>
                <p>3. Đổi mật khẩu cá nhân mới khi hệ thống yêu cầu.</p>
                <p>4. Bắt đầu học bài và khám phá mô hình 3D.</p>
              </div>

              <div className="text-[9px] text-slate-400 italic text-right">
                {item.school || 'Trường Phổ Thông Thực Hành Sư Phạm'} • Năm học 2025 - 2026
              </div>
            </div>
          ))}
        </div>

        {/* Footer (hidden in print) */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 shrink-0 print:hidden">
          <span className="text-xs text-slate-500">
            Tổng cộng: <strong>{credentials.length}</strong> phiếu học sinh
          </span>
          <Button
            variant="outline"
            size="md"
            shape="pill"
            onClick={onClose}
            className="text-xs font-bold text-slate-700"
          >
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
};
