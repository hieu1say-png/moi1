/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - MOVE STUDENT CLASS MODAL
 * Move student between classes while preserving their learning history,
 * XP, badges, and progress.
 */

import React, { useState } from 'react';
import { SchoolClass } from '../../types/dataArchitecture';
import { StudentAccount } from '../../types/auth';
import { ArrowRightLeft, School, GraduationCap, X, Check } from 'lucide-react';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';

interface MoveStudentClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentAccount | null;
  classes: SchoolClass[];
  onMoveClass: (studentId: string, newClassName: string, newClassId?: string) => void;
}

export const MoveStudentClassModal: React.FC<MoveStudentClassModalProps> = ({
  isOpen,
  onClose,
  student,
  classes,
  onMoveClass
}) => {
  const { showSuccess } = useToast();

  const [targetClassId, setTargetClassId] = useState(classes[0]?.id || 'cls-9a2');

  if (!isOpen || !student) return null;

  const targetClass = classes.find((c) => c.id === targetClassId) || classes[0];
  const targetClassName = targetClass ? targetClass.name : 'Lớp 9A2';

  const handleConfirm = () => {
    onMoveClass(student.id, targetClassName, targetClassId);
    showSuccess(`Đã chuyển học sinh ${student.fullName} sang ${targetClassName}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 my-auto animate-in fade-in zoom-in duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                Chuyển Lớp Cho Học Sinh
              </h3>
              <p className="text-[11px] text-slate-500">
                Giữ nguyên toàn bộ tiến độ học tập và lịch sử
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">Họ và tên:</span>
            <span className="font-black text-slate-900">{student.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Lớp hiện tại:</span>
            <span className="font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded">
              {student.className}
            </span>
          </div>
        </div>

        <div className="space-y-1 text-xs">
          <label className="font-bold text-slate-700 block">Chọn lớp chuyển đến (*):</label>
          <select
            value={targetClassId}
            onChange={(e) => setTargetClassId(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-white border border-slate-200 font-medium text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.grade ? `Khối ${c.grade}` : 'Hình học 9'})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
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
            onClick={handleConfirm}
            className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
          >
            Xác Nhận Chuyển Lớp
          </Button>
        </div>
      </div>
    </div>
  );
};
