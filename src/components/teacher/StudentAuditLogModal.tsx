/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - STUDENT AUDIT LOG MODAL
 * Displays transparent audit log history of all teacher actions
 * (Create student, change password, reset password, lock, unlock, disable, move class).
 */

import React, { useState } from 'react';
import { StudentAuditLog } from '../../types/auth';
import {
  History,
  ShieldCheck,
  UserPlus,
  KeyRound,
  Lock,
  Unlock,
  AlertOctagon,
  ArrowRightLeft,
  X,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '../common/Button';

interface StudentAuditLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: StudentAuditLog[];
}

export const StudentAuditLogModal: React.FC<StudentAuditLogModalProps> = ({
  isOpen,
  onClose,
  logs
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');

  if (!isOpen) return null;

  const filteredLogs = logs.filter((log) => {
    const matchSearch =
      log.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.details || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchAction = actionFilter === 'ALL' || log.action === actionFilter;
    return matchSearch && matchAction;
  });

  const getActionBadge = (action: StudentAuditLog['action']) => {
    switch (action) {
      case 'CREATE_STUDENT_ACCOUNT':
      case 'BULK_CREATE_STUDENTS':
        return {
          label: 'Tạo tài khoản',
          icon: UserPlus,
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
        };
      case 'CHANGE_STUDENT_PASSWORD':
      case 'RESET_STUDENT_PASSWORD':
        return {
          label: 'Đổi / Đặt lại mật khẩu',
          icon: KeyRound,
          color: 'bg-amber-50 text-amber-700 border-amber-200'
        };
      case 'LOCK_STUDENT':
        return {
          label: 'Khóa tài khoản',
          icon: Lock,
          color: 'bg-orange-50 text-orange-700 border-orange-200'
        };
      case 'UNLOCK_STUDENT':
        return {
          label: 'Mở khóa tài khoản',
          icon: Unlock,
          color: 'bg-blue-50 text-blue-700 border-blue-200'
        };
      case 'DISABLE_STUDENT':
        return {
          label: 'Vô hiệu hóa',
          icon: AlertOctagon,
          color: 'bg-rose-50 text-rose-700 border-rose-200'
        };
      case 'MOVE_STUDENT_CLASS':
        return {
          label: 'Chuyển lớp',
          icon: ArrowRightLeft,
          color: 'bg-purple-50 text-purple-700 border-purple-200'
        };
      default:
        return {
          label: 'Quản trị',
          icon: History,
          color: 'bg-slate-50 text-slate-700 border-slate-200'
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl space-y-5 my-auto max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                Nhật Ký Quản Trị Tài Khoản (Audit Log)
              </h3>
              <p className="text-xs text-slate-500">
                Lịch sử ghi nhận thao tác của giáo viên đối với tài khoản học sinh
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

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo tên học sinh, chi tiết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none"
          >
            <option value="ALL">Tất cả hành động</option>
            <option value="CREATE_STUDENT_ACCOUNT">Tạo tài khoản</option>
            <option value="CHANGE_STUDENT_PASSWORD">Đổi mật khẩu</option>
            <option value="RESET_STUDENT_PASSWORD">Đặt lại mật khẩu</option>
            <option value="LOCK_STUDENT">Khóa tài khoản</option>
            <option value="UNLOCK_STUDENT">Mở khóa</option>
            <option value="MOVE_STUDENT_CLASS">Chuyển lớp</option>
          </select>
        </div>

        {/* Log items list */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              Chưa có nhật ký hoạt động nào được ghi nhận.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const badge = getActionBadge(log.action);
              const Icon = badge.icon;
              const formattedDate = new Date(log.timestamp).toLocaleString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              });

              return (
                <div
                  key={log.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl border shrink-0 ${badge.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{log.studentName}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px]">{log.details}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono text-slate-400 block">{formattedDate}</span>
                    <span className="text-[10px] text-slate-500 font-medium">GV: {log.teacherName || 'Trần Ngọc Hiếu'}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3 shrink-0">
          <span className="text-xs text-slate-500">
            Tổng cộng: <strong>{filteredLogs.length}</strong> bản ghi
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
