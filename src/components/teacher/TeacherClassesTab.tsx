/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - TEACHER CLASSES TAB (Quản lý Lớp học)
 * Full CRUD with Table View, Create Class Modal, Edit Class Modal, and Delete Confirmation Dialog.
 */

import React, { useState } from 'react';
import { SchoolClass, Student } from '../../types/dataArchitecture';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import {
  Users,
  PlusCircle,
  QrCode,
  Copy,
  Calendar,
  MapPin,
  TrendingUp,
  FileCheck,
  CheckCircle2,
  Trash2,
  Edit2,
  AlertTriangle,
  LayoutGrid,
  List,
  Search,
  School,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useTeacherStore } from '../../stores/useTeacherStore';

interface TeacherClassesTabProps {
  classes: SchoolClass[];
  students: Student[];
  onCreateClass: (classData: Omit<SchoolClass, 'id' | 'createdAt' | 'studentCount' | 'averageScore' | 'completionRate'>) => void;
  onUpdateClass?: (id: string, updates: Partial<SchoolClass>) => void;
  onDeleteClass?: (id: string) => void;
  onSelectClassForDetail: (classId: string) => void;
}

export const TeacherClassesTab: React.FC<TeacherClassesTabProps> = ({
  classes,
  students,
  onCreateClass,
  onUpdateClass,
  onDeleteClass,
  onSelectClassForDetail
}) => {
  const { showSuccess, showInfo, showError, showWarning } = useToast();
  const { teacherName } = useTeacherStore();

  // View state
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingClass, setEditingClass] = useState<SchoolClass | null>(null);
  const [deletingClass, setDeletingClass] = useState<SchoolClass | null>(null);

  // Form states for Create / Edit
  const [className, setClassName] = useState('');
  const [grade, setGrade] = useState(9);
  const [classCode, setClassCode] = useState('');
  const [schedule, setSchedule] = useState('');
  const [room, setRoom] = useState('');
  const [description, setDescription] = useState('');

  const openCreateModal = () => {
    setClassName('');
    setGrade(9);
    setClassCode(`TOAN9-A${classes.length + 1}`);
    setSchedule('Thứ 2, 4 (Tiết 1-2)');
    setRoom('Phòng 204 - Nhà A');
    setDescription('');
    setShowCreateModal(true);
  };

  const openEditModal = (cls: SchoolClass) => {
    setEditingClass(cls);
    setClassName(cls.name);
    setGrade(cls.grade);
    setClassCode(cls.classCode);
    setSchedule(cls.schedule || '');
    setRoom(cls.room || '');
    setDescription(cls.description || '');
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!className.trim() || !classCode.trim()) {
      showWarning('Vui lòng nhập đầy đủ tên lớp và mã lớp!');
      return;
    }

    onCreateClass({
      name: className.startsWith('Lớp ') ? className : `Lớp ${className}`,
      grade,
      schoolYear: '2025 - 2026',
      classCode: classCode.toUpperCase().trim(),
      teacherId: 'usr-teacher-001',
      teacherName: teacherName || 'ThS. Trần Ngọc Hiếu',
      schedule: schedule || 'Thứ 2, 4 (Tiết 1-2)',
      room: room || 'Phòng 204 - Nhà A',
      description: description.trim()
    });

    showSuccess(`Đã tạo thành công lớp ${className}!`);
    setShowCreateModal(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClass) return;

    if (!className.trim() || !classCode.trim()) {
      showWarning('Vui lòng nhập đầy đủ tên lớp và mã lớp!');
      return;
    }

    if (onUpdateClass) {
      onUpdateClass(editingClass.id, {
        name: className.startsWith('Lớp ') ? className : `Lớp ${className}`,
        grade,
        classCode: classCode.toUpperCase().trim(),
        schedule: schedule.trim(),
        room: room.trim(),
        description: description.trim()
      });
      showSuccess(`Đã cập nhật thông tin lớp ${className}!`);
    } else {
      showInfo(`Đã lưu thay đổi thông tin lớp ${className}`);
    }

    setEditingClass(null);
  };

  const handleConfirmDelete = () => {
    if (!deletingClass) return;
    if (onDeleteClass) {
      onDeleteClass(deletingClass.id);
      showSuccess(`Đã xóa lớp ${deletingClass.name} khỏi hệ thống!`);
    }
    setDeletingClass(null);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showSuccess(`Đã sao chép mã tham gia lớp: ${code}`);
  };

  const filteredClasses = classes.filter((c) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(term) ||
      c.classCode.toLowerCase().includes(term) ||
      (c.room && c.room.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-6">
      {/* 1. Header & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <School className="w-5 h-5 text-blue-600" />
            <span>Quản Lý Danh Sách Lớp Học ({classes.length} Lớp)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Quản lý sĩ số, mã tham gia lớp học và theo dõi tiến độ tổng thể của từng lớp phụ trách.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Dạng Bảng"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'cards' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Dạng Thẻ"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <Button
            id="btn-add-class"
            variant="cylinder"
            size="md"
            shape="pill"
            leftIcon={<PlusCircle className="w-4 h-4" />}
            onClick={openCreateModal}
            className="font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
          >
            Thêm Lớp Mới
          </Button>
        </div>
      </div>

      {/* 2. Search bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên lớp, mã lớp, phòng học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium px-2 shrink-0">
          Hiển thị: <strong>{filteredClasses.length}</strong> lớp
        </div>
      </div>

      {/* 3. TABLE VIEW (Bảng quản lý chính theo yêu cầu) */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Lớp Học</th>
                  <th className="py-3.5 px-3">Mã Lớp (Code)</th>
                  <th className="py-3.5 px-3">Khối / Năm Học</th>
                  <th className="py-3.5 px-3">Sĩ Số</th>
                  <th className="py-3.5 px-3">Lịch &amp; Phòng Học</th>
                  <th className="py-3.5 px-3">Điểm TB</th>
                  <th className="py-3.5 px-3">Tiến Độ</th>
                  <th className="py-3.5 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredClasses.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400">
                      Không tìm thấy lớp học nào phù hợp.
                    </td>
                  </tr>
                ) : (
                  filteredClasses.map((cls) => {
                    const classStudents = students.filter((s) => s.className === cls.name);
                    const studentCount = cls.studentCount || classStudents.length;

                    return (
                      <tr key={cls.id} className="hover:bg-blue-50/40 transition-colors group">
                        {/* Class Name */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-2xs shrink-0">
                              {cls.name.replace('Lớp ', '')}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                                <span>{cls.name}</span>
                              </div>
                              <span className="text-[11px] text-slate-400 line-clamp-1">
                                {cls.description || 'Chuyên đề Toán 9'}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Class Code */}
                        <td className="py-3.5 px-3">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200">
                            <span className="font-mono font-black text-slate-800 text-[11px]">{cls.classCode}</span>
                            <button
                              onClick={() => handleCopyCode(cls.classCode)}
                              className="text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                              title="Sao chép mã lớp"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        </td>

                        {/* Grade & Year */}
                        <td className="py-3.5 px-3 font-medium">
                          <span className="text-slate-800 font-bold">Khối {cls.grade}</span>
                          <span className="text-slate-400 block text-[10px]">{cls.schoolYear}</span>
                        </td>

                        {/* Student Count */}
                        <td className="py-3.5 px-3">
                          <span className="font-black text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                            {studentCount} HS
                          </span>
                        </td>

                        {/* Schedule & Room */}
                        <td className="py-3.5 px-3">
                          <div className="space-y-0.5 text-[11px]">
                            <div className="flex items-center gap-1 text-slate-700 font-medium">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              <span>{cls.schedule || 'Thứ 2, 4 (Tiết 1-2)'}</span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-500">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{cls.room || 'Phòng 204'}</span>
                            </div>
                          </div>
                        </td>

                        {/* Average Score */}
                        <td className="py-3.5 px-3 font-black text-emerald-600 text-sm">
                          {cls.averageScore || '8.2'}
                        </td>

                        {/* Completion Rate */}
                        <td className="py-3.5 px-3">
                          <div className="space-y-1">
                            <div className="text-[11px] font-black text-indigo-600">
                              {cls.completionRate || '80'}%
                            </div>
                            <div className="w-16 bg-slate-100 rounded-full h-1.5">
                              <div
                                className="bg-indigo-600 h-1.5 rounded-full"
                                style={{ width: `${cls.completionRate || 80}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>

                        {/* Actions (Edit & Trash Icons) */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onSelectClassForDetail(cls.id)}
                              className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                              title="Xem danh sách học sinh"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => openEditModal(cls)}
                              className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                              title="Chỉnh sửa thông tin lớp"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeletingClass(cls)}
                              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Xóa lớp học"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. CARDS VIEW */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredClasses.map((cls) => {
            const classStudents = students.filter((s) => s.className === cls.name);
            const studentCount = cls.studentCount || classStudents.length;

            return (
              <div
                key={cls.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 transition-all p-5 shadow-2xs hover:shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-xs">
                        {cls.name.replace('Lớp ', '')}
                      </div>
                      <div>
                        <h4 className="text-base font-black text-slate-900">{cls.name}</h4>
                        <span className="text-[11px] text-slate-400 font-medium">Khối {cls.grade} • {cls.schoolYear}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(cls)}
                        className="p-1.5 text-slate-400 hover:text-amber-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                        title="Chỉnh sửa lớp"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingClass(cls)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                        title="Xóa lớp"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Class Code Pill */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <QrCode className="w-4 h-4 text-blue-600" />
                      <span>Mã lớp:</span>
                      <strong className="font-mono text-slate-900 font-black">{cls.classCode}</strong>
                    </div>
                    <button
                      onClick={() => handleCopyCode(cls.classCode)}
                      className="p-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                      title="Sao chép mã lớp"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Schedule & Room */}
                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{cls.schedule || 'Thứ 2, 4 (Tiết 1-2)'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{cls.room || 'Phòng học 204'}</span>
                    </div>
                  </div>

                  {cls.description && (
                    <p className="text-[11px] text-slate-500 line-clamp-2 italic bg-slate-50/50 p-2 rounded-lg">
                      "{cls.description}"
                    </p>
                  )}
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-medium">Sĩ số</span>
                      <span className="text-xs font-black text-slate-800">{studentCount} HS</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-medium">Điểm TB</span>
                      <span className="text-xs font-black text-emerald-600">{cls.averageScore || '8.2'}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-medium">Tiến độ</span>
                      <span className="text-xs font-black text-indigo-600">{cls.completionRate || '80'}%</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    shape="rounded"
                    onClick={() => onSelectClassForDetail(cls.id)}
                    className="w-full text-xs font-bold"
                  >
                    Xem Danh Sách Học Sinh
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: TẠO LỚP HỌC MỚI                                                  */}
      {/* ========================================================================= */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-blue-600" />
                Tạo Lớp Học Mới
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Tên Lớp (*)</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: 9A4"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Mã Tham Gia Lớp (*)</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: TOAN9-A4"
                    value={classCode}
                    onChange={(e) => setClassCode(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Lịch Học</label>
                  <input
                    type="text"
                    placeholder="VD: Thứ 3, 6 (Tiết 3-4)"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Phòng Học</label>
                  <input
                    type="text"
                    placeholder="VD: Phòng 301 - Nhà B"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Mô Tả / Ghi Chú Lớp Học</label>
                <textarea
                  rows={3}
                  placeholder="VD: Lớp ôn thi vào 10 chuyên Toán..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  shape="pill"
                  onClick={() => setShowCreateModal(false)}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  shape="pill"
                  className="font-bold bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Lưu &amp; Tạo Lớp
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CHỈNH SỬA THÔNG TIN LỚP HỌC                                     */}
      {/* ========================================================================= */}
      {editingClass && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-amber-600" />
                Chỉnh Sửa Lớp {editingClass.name}
              </h3>
              <button
                onClick={() => setEditingClass(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Tên Lớp (*)</label>
                  <input
                    type="text"
                    required
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Mã Lớp (*)</label>
                  <input
                    type="text"
                    required
                    value={classCode}
                    onChange={(e) => setClassCode(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Lịch Học</label>
                  <input
                    type="text"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Phòng Học</label>
                  <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Mô Tả / Ghi Chú</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  shape="pill"
                  onClick={() => setEditingClass(null)}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  shape="pill"
                  className="font-bold bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Cập Nhật Lớp
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: XÁC NHẬN XÓA LỚP HỌC (CONFIRMATION DIALOG BẮT BUỘC)              */}
      {/* ========================================================================= */}
      {deletingClass && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-base font-black text-slate-900">
                Xác Nhận Xóa Lớp Học?
              </h3>
              <p className="text-xs text-slate-600">
                Bạn có chắc chắn muốn xóa <strong className="text-rose-600">{deletingClass.name}</strong> (Mã: {deletingClass.classCode})? Hành động này sẽ loại bỏ lớp học khỏi danh sách phụ trách.
              </p>
            </div>

            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-[11px] text-rose-800">
              ⚠️ Lưu ý: Dữ liệu bài nộp và học sinh trong lớp sẽ không thể khôi phục sau khi xóa.
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                shape="pill"
                onClick={() => setDeletingClass(null)}
              >
                Hủy Bỏ
              </Button>

              <Button
                variant="danger"
                size="sm"
                shape="pill"
                leftIcon={<Trash2 className="w-4 h-4" />}
                onClick={handleConfirmDelete}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
              >
                Xác Nhận Xóa
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
