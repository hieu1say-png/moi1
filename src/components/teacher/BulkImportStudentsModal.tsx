/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - BULK IMPORT STUDENTS MODAL
 * Imports student lists via CSV/Excel paste or file upload, parses, validates,
 * auto-generates usernames and passwords, provides live validation preview,
 * and outputs batch credential sheet.
 */

import React, { useState } from 'react';
import { SchoolClass } from '../../types/dataArchitecture';
import { StudentCredentialCardItem } from '../../types/auth';
import {
  FileSpreadsheet,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  X,
  FileText,
  Loader2,
  Copy,
  Printer
} from 'lucide-react';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';
import {
  generateAutoUsername,
  generateTemporaryPassword,
  TeacherStudentService
} from '../../services/teacherStudentService';

interface BulkImportStudentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  classes: SchoolClass[];
  existingUsernames: string[];
  schoolName: string;
  onImportComplete: (createdCount: number) => void;
  onOpenCredentialSheet: (items: StudentCredentialCardItem[]) => void;
}

interface ParsedRow {
  id: string;
  fullName: string;
  className: string;
  username: string;
  password: string;
  isValid: boolean;
  error?: string;
}

export const BulkImportStudentsModal: React.FC<BulkImportStudentsModalProps> = ({
  isOpen,
  onClose,
  classes,
  existingUsernames,
  schoolName,
  onImportComplete,
  onOpenCredentialSheet
}) => {
  const { showSuccess, showWarning, showError } = useToast();

  const [rawText, setRawText] = useState('');
  const [selectedDefaultClassId, setSelectedDefaultClassId] = useState(classes[0]?.id || 'cls-9a2');
  const [parsedRows, setParsedRows] = useState<ParsedRow[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'INPUT' | 'PREVIEW' | 'RESULT'>('INPUT');
  const [importResult, setImportResult] = useState<{
    createdCount: number;
    failedCount: number;
    credentials: StudentCredentialCardItem[];
  } | null>(null);

  if (!isOpen) return null;

  const defaultClass = classes.find((c) => c.id === selectedDefaultClassId) || classes[0];
  const defaultClassName = defaultClass ? defaultClass.name : 'Lớp 9A2';

  // Sample CSV Data
  const sampleData = `Nguyễn Hoàng Long, Lớp 9A2
Trần Bảo Ngọc, Lớp 9A2
Phạm Tuấn Kiệt, Lớp 9A2
Vũ Khánh Linh, Lớp 9A3
Đỗ Minh Quân, Lớp 9A3`;

  const handleLoadSample = () => {
    setRawText(sampleData);
  };

  // Parse text into rows
  const handleParseData = () => {
    if (!rawText.trim()) {
      showWarning('Vui lòng dán danh sách học sinh hoặc tải file lên.');
      return;
    }

    const lines = rawText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      showWarning('Không tìm thấy dòng dữ liệu nào.');
      return;
    }

    const trackingUsernames = [...existingUsernames];
    const rows: ParsedRow[] = [];

    lines.forEach((line, idx) => {
      // Split by tab or comma
      const parts = line.includes('\t')
        ? line.split('\t').map((s) => s.trim())
        : line.split(',').map((s) => s.trim());

      const fullName = parts[0] || '';
      const customClass = parts[1] || defaultClassName;
      let customUser = parts[2] || '';
      const customPass = parts[3] || generateTemporaryPassword();

      if (!fullName) {
        rows.push({
          id: `row-${idx}`,
          fullName: 'Trống',
          className: customClass,
          username: '',
          password: '',
          isValid: false,
          error: 'Thiếu họ và tên học sinh'
        });
        return;
      }

      if (!customUser) {
        customUser = generateAutoUsername(fullName, customClass, trackingUsernames);
      }

      const isDuplicate = trackingUsernames.map((u) => u.toLowerCase()).includes(customUser.toLowerCase());
      trackingUsernames.push(customUser);

      rows.push({
        id: `row-${idx}`,
        fullName,
        className: customClass,
        username: customUser,
        password: customPass,
        isValid: !isDuplicate,
        error: isDuplicate ? 'Trùng tên tài khoản' : undefined
      });
    });

    setParsedRows(rows);
    setStep('PREVIEW');
  };

  // File Upload Handler (CSV / TXT)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setRawText(content);
        showSuccess(`Đã đọc file ${file.name} thành công!`);
      }
    };
    reader.readAsText(file);
  };

  // Execute Bulk Create
  const handleConfirmImport = async () => {
    const validRows = parsedRows.filter((r) => r.isValid);
    if (validRows.length === 0) {
      showError('Không có dòng dữ liệu hợp lệ nào để tạo tài khoản.');
      return;
    }

    setIsProcessing(true);

    try {
      const items = validRows.map((r) => ({
        fullName: r.fullName,
        className: r.className,
        school: schoolName,
        username: r.username,
        password: r.password,
        requirePasswordChange: true
      }));

      const res = await TeacherStudentService.bulkCreateStudentAccounts(items);

      if (res.success) {
        setImportResult({
          createdCount: res.createdCount,
          failedCount: res.failedCount,
          credentials: res.createdStudents
        });
        setStep('RESULT');
        onImportComplete(res.createdCount);
        showSuccess(`Tạo thành công ${res.createdCount} tài khoản học sinh!`);
      } else {
        showError('Không thể tạo danh sách tài khoản.');
      }
    } catch (err: any) {
      showError(err?.message || 'Có lỗi xảy ra trong quá trình tạo tài khoản.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl space-y-5 my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                Nhập Danh Sách Học Sinh Hàng Loạt (Excel / CSV)
              </h3>
              <p className="text-xs text-slate-500">
                Tự động sinh tài khoản, mật khẩu tạm thời và tạo phiếu cấp cho học sinh
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: INPUT VIEW */}
        {step === 'INPUT' && (
          <div className="space-y-4 text-xs flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Lớp mặc định:</label>
                <select
                  value={selectedDefaultClassId}
                  onChange={(e) => setSelectedDefaultClassId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 text-xs"
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Tải file lên (CSV / TXT):</label>
                <label className="flex items-center justify-center gap-2 p-2 rounded-xl bg-slate-50 border border-dashed border-slate-300 hover:bg-slate-100 cursor-pointer font-bold text-blue-600 text-xs">
                  <Upload className="w-4 h-4" />
                  <span>Chọn file từ máy tính</span>
                  <input
                    type="file"
                    accept=".csv,.txt,.tsv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700">
                  Dán nội dung bảng (Mỗi học sinh 1 dòng: [Họ và tên, Lớp]):
                </label>
                <button
                  type="button"
                  onClick={handleLoadSample}
                  className="text-blue-600 hover:underline font-bold text-[11px] cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Dán dữ liệu mẫu</span>
                </button>
              </div>
              <textarea
                rows={7}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder={`Ví dụ:\nNguyễn Văn Minh, Lớp 9A2\nTrần Thị Mai Anh, Lớp 9A2\nLê Hoàng Long, Lớp 9A2`}
                className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl text-[11px] text-blue-900 leading-relaxed">
              <strong>Hệ thống tự động:</strong> Nếu để trống cột Username và Password, hệ thống sẽ tự sinh Username theo chuẩn (vd: <code>minh9a2</code>) và mật khẩu tạm bảo mật (vd: <code>Geo@4829</code>), đồng thời bật yêu cầu đổi mật khẩu ở lần đầu đăng nhập.
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="md"
                shape="pill"
                onClick={onClose}
                className="text-xs font-bold text-slate-600"
              >
                Hủy Bỏ
              </Button>

              <Button
                variant="cylinder"
                size="md"
                shape="pill"
                onClick={handleParseData}
                className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
              >
                Tiếp Tục Xem Trước &gt;
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: PREVIEW VIEW */}
        {step === 'PREVIEW' && (
          <div className="space-y-4 text-xs flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-slate-700 font-bold">
                Tìm thấy <strong>{parsedRows.length}</strong> học sinh (
                <span className="text-emerald-600">{parsedRows.filter((r) => r.isValid).length} hợp lệ</span>
                {parsedRows.some((r) => !r.isValid) && (
                  <span className="text-rose-600">, {parsedRows.filter((r) => !r.isValid).length} lỗi</span>
                )}
                )
              </span>

              <button
                type="button"
                onClick={() => setStep('INPUT')}
                className="text-blue-600 hover:underline font-bold text-xs cursor-pointer"
              >
                &larr; Sửa lại danh sách
              </button>
            </div>

            {/* Table Preview */}
            <div className="flex-1 overflow-y-auto border border-slate-200 rounded-2xl max-h-[360px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0 border-b border-slate-200">
                  <tr>
                    <th className="p-2.5 pl-3">STT</th>
                    <th className="p-2.5">Họ và tên</th>
                    <th className="p-2.5">Lớp</th>
                    <th className="p-2.5">Tên tài khoản (Tự sinh)</th>
                    <th className="p-2.5">Mật khẩu tạm</th>
                    <th className="p-2.5 pr-3 text-right">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {parsedRows.map((row, idx) => (
                    <tr key={row.id} className={row.isValid ? 'hover:bg-slate-50' : 'bg-rose-50/50'}>
                      <td className="p-2.5 pl-3 font-mono text-slate-400">{idx + 1}</td>
                      <td className="p-2.5 font-bold text-slate-900">{row.fullName}</td>
                      <td className="p-2.5 text-blue-700 font-medium">{row.className}</td>
                      <td className="p-2.5 font-mono font-bold text-slate-800">{row.username}</td>
                      <td className="p-2.5 font-mono text-orange-600 font-medium">{row.password}</td>
                      <td className="p-2.5 pr-3 text-right">
                        {row.isValid ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Hợp lệ
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-rose-600 font-bold text-[11px]" title={row.error}>
                            <AlertTriangle className="w-3.5 h-3.5" /> {row.error}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 shrink-0">
              <Button
                variant="outline"
                size="md"
                shape="pill"
                onClick={() => setStep('INPUT')}
                className="text-xs font-bold text-slate-600"
              >
                Quay Lại
              </Button>

              <Button
                variant="cylinder"
                size="md"
                shape="pill"
                disabled={isProcessing || parsedRows.filter((r) => r.isValid).length === 0}
                onClick={handleConfirmImport}
                className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang Tạo Tài Khoản...</span>
                  </>
                ) : (
                  `Xác Nhận Tạo ${parsedRows.filter((r) => r.isValid).length} Tài Khoản`
                )}
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: RESULT VIEW */}
        {step === 'RESULT' && importResult && (
          <div className="space-y-5 text-center flex-1 overflow-y-auto">
            <div className="w-14 h-14 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900">
                ĐÃ TẠO THÀNH CÔNG {importResult.createdCount} TÀI KHOẢN!
              </h3>
              <p className="text-xs text-slate-500">
                Thầy/Cô có thể in phiếu cấp phát cho học sinh hoặc tải về danh sách.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                variant="cylinder"
                size="md"
                shape="pill"
                leftIcon={<Printer className="w-4 h-4" />}
                onClick={() => {
                  onClose();
                  onOpenCredentialSheet(importResult.credentials);
                }}
                className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
              >
                In Phiếu Đăng Nhập (A4)
              </Button>

              <Button
                variant="outline"
                size="md"
                shape="pill"
                onClick={onClose}
                className="text-xs font-bold text-slate-700"
              >
                Hoàn Tất &amp; Đóng
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
