/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - TEACHER STUDENTS & ACCOUNT MANAGEMENT TAB
 * Unified management for student accounts, authentication credentials,
 * class assignments, status lifecycle (PENDING / ACTIVE / LOCKED / DISABLED),
 * password resets, bulk imports, printable credential sheets, and audit logs.
 */

import React, { useState, useMemo } from 'react';
import { Student, SchoolClass } from '../../types/dataArchitecture';
import { StudentAccount, AccountStatus, StudentCredentialCardItem, StudentAuditLog } from '../../types/auth';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import {
  Users,
  Search,
  Filter,
  Flame,
  Award,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  ChevronRight,
  TrendingUp,
  X,
  PlusCircle,
  Edit2,
  Trash2,
  Eye,
  Mail,
  School,
  GraduationCap,
  KeyRound,
  Lock,
  Unlock,
  Printer,
  FileSpreadsheet,
  History,
  ArrowRightLeft,
  ShieldCheck,
  Clock,
  Check,
  AlertOctagon,
  Copy
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useTeacherStore } from '../../stores/useTeacherStore';
import { useAuth } from '../../context/AuthContext';
import { TeacherStudentService, generateTemporaryPassword } from '../../services/teacherStudentService';
import { CreateStudentAccountModal } from './CreateStudentAccountModal';
import { BulkImportStudentsModal } from './BulkImportStudentsModal';
import { StudentCredentialSheetModal } from './StudentCredentialSheetModal';
import { ChangeStudentPasswordModal } from './ChangeStudentPasswordModal';
import { MoveStudentClassModal } from './MoveStudentClassModal';
import { StudentAuditLogModal } from './StudentAuditLogModal';

interface TeacherStudentsTabProps {
  students: Student[];
  classes: SchoolClass[];
  selectedClassId: string;
  setSelectedClassId: (id: string) => void;
  onCreateStudent?: (studentData: Partial<Student>) => void;
  onUpdateStudent?: (studentId: string, updates: Partial<Student>) => void;
  onDeleteStudent?: (studentId: string) => void;
}

export const TeacherStudentsTab: React.FC<TeacherStudentsTabProps> = ({
  students,
  classes,
  selectedClassId,
  setSelectedClassId,
  onCreateStudent,
  onUpdateStudent,
  onDeleteStudent
}) => {
  const { showSuccess, showWarning, showInfo, showError } = useToast();
  const { schoolName } = useTeacherStore();
  const {
    studentRoster,
    updateStudentStatus,
    changeStudentPassword,
    resetStudentPassword,
    moveStudentClass,
    deleteStudent,
    createStudent,
    reloadRoster
  } = useAuth();

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | AccountStatus>('ALL');
  const [performanceFilter, setPerformanceFilter] = useState<'all' | 'high' | 'medium' | 'needs_help'>('all');

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [auditLogs, setAuditLogs] = useState<StudentAuditLog[]>([]);

  // Selected student targets for actions
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<StudentAccount | null>(null);
  const [selectedStudentForPassword, setSelectedStudentForPassword] = useState<StudentAccount | null>(null);
  const [selectedStudentForMove, setSelectedStudentForMove] = useState<StudentAccount | null>(null);
  const [selectedStudentForLockToggle, setSelectedStudentForLockToggle] = useState<StudentAccount | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<StudentAccount | null>(null);

  // Print credentials batch
  const [printCredentialsList, setPrintCredentialsList] = useState<StudentCredentialCardItem[]>([]);

  // Quick reset confirmation
  const [quickResetResult, setQuickResetResult] = useState<{
    student: StudentAccount;
    tempPass: string;
  } | null>(null);

  const currentClass = classes.find((c) => c.id === selectedClassId);

  // Combine Auth Student Roster with Learning Analytics
  const mergedStudents: StudentAccount[] = useMemo(() => {
    const rosterMap = new Map<string, StudentAccount>();
    studentRoster.forEach((item) => {
      rosterMap.set(item.id, item);
      rosterMap.set(item.username.toLowerCase(), item);
      rosterMap.set(item.fullName.toLowerCase(), item);
    });

    // Start with student roster as base
    const list: StudentAccount[] = [...studentRoster];

    // Ensure any student in mock students list has an entry
    students.forEach((s) => {
      const match =
        rosterMap.get(s.id) ||
        rosterMap.get(s.fullName.toLowerCase()) ||
        rosterMap.get(s.email.split('@')[0].toLowerCase());

      if (!match) {
        const fallbackAccount: StudentAccount = {
          id: s.id,
          username: s.email ? s.email.split('@')[0] : `hs_${s.id.slice(-4)}`,
          fullName: s.fullName,
          className: s.className,
          school: s.school || schoolName || 'Trường Phổ Thông Thực Hành Sư Phạm',
          status: 'ACTIVE',
          createdAt: s.createdAt || new Date().toISOString(),
          lastActiveAt: s.lastLoginAt || new Date().toISOString(),
          firstLoginAt: s.createdAt || new Date().toISOString(),
          loginCount: 12,
          requirePasswordChange: false,
          role: 'student',
          progress: {
            cylinder: s.completedLessons?.includes('lesson-cyl-01') ? 90 : 40,
            cone: s.completedLessons?.includes('lesson-cone-01') ? 85 : 30,
            sphere: s.completedLessons?.includes('lesson-sph-01') ? 80 : 20,
            net: 60,
            crossSection: 50
          },
          xp: s.xp || 150,
          level: s.level || 1,
          streakDays: s.streakDays || 0,
          wrongCount: 2,
          hintsUsed: 3,
          learningEventsCount: 25,
          studyTimeMinutes: 120,
          targetExamScore: s.targetExamScore || 9.0,
          accuracyRate: s.accuracyRate || 88
        };
        list.push(fallbackAccount);
      }
    });

    return list;
  }, [studentRoster, students, schoolName]);

  // Existing usernames list for duplicate prevention
  const existingUsernames = useMemo(() => {
    return mergedStudents.map((s) => s.username.toLowerCase());
  }, [mergedStudents]);

  // Filtered student list
  const filteredStudents = useMemo(() => {
    return mergedStudents.filter((s) => {
      // Class filter
      if (selectedClassId !== 'all' && currentClass) {
        if (s.className !== currentClass.name && s.classId !== selectedClassId) {
          return false;
        }
      }

      // Status filter
      if (statusFilter !== 'ALL' && s.status !== statusFilter) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchName = s.fullName.toLowerCase().includes(term);
        const matchUser = s.username.toLowerCase().includes(term);
        const matchClass = s.className.toLowerCase().includes(term);
        if (!matchName && !matchUser && !matchClass) return false;
      }

      // Performance filter
      const acc = s.accuracyRate ?? 85;
      if (performanceFilter === 'high' && acc < 90) return false;
      if (performanceFilter === 'medium' && (acc < 80 || acc >= 90)) return false;
      if (performanceFilter === 'needs_help' && acc >= 80) return false;

      return true;
    });
  }, [mergedStudents, selectedClassId, currentClass, statusFilter, searchTerm, performanceFilter]);

  // Status Badge Helper
  const renderStatusBadge = (status: AccountStatus) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>Đang hoạt động</span>
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" />
            <span>Chờ kích hoạt</span>
          </span>
        );
      case 'LOCKED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-orange-50 text-orange-700 border border-orange-200">
            <Lock className="w-3 h-3" />
            <span>Tạm khóa</span>
          </span>
        );
      case 'DISABLED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-slate-100 text-slate-700 border border-slate-300">
            <AlertOctagon className="w-3 h-3" />
            <span>Vô hiệu hóa</span>
          </span>
        );
      default:
        return null;
    }
  };

  // Handlers for Account Creation & Reset
  const handleSingleStudentCreated = (newStudent: StudentAccount, rawPassword?: string) => {
    createStudent({
      fullName: newStudent.fullName,
      className: newStudent.className,
      classId: newStudent.classId,
      school: newStudent.school,
      username: newStudent.username,
      password: rawPassword,
      requirePasswordChange: newStudent.requirePasswordChange
    });

    if (onCreateStudent) {
      onCreateStudent({
        id: newStudent.id,
        fullName: newStudent.fullName,
        className: newStudent.className,
        school: newStudent.school,
        email: `${newStudent.username}@edu.vn`,
        targetExamScore: 9.0,
        accuracyRate: 100
      });
    }
  };

  const handleOpenPrintAllCredentials = () => {
    const list: StudentCredentialCardItem[] = filteredStudents.map((s) => ({
      id: s.id,
      fullName: s.fullName,
      className: s.className,
      school: s.school,
      username: s.username,
      temporaryPassword: s.password || 'Demo@123',
      createdAt: s.createdAt
    }));

    if (list.length === 0) {
      showWarning('Không có học sinh nào để in phiếu.');
      return;
    }

    setPrintCredentialsList(list);
    setShowPrintModal(true);
  };

  const handleOpenPrintCredentials = (student: StudentAccount) => {
    setPrintCredentialsList([
      {
        id: student.id,
        fullName: student.fullName,
        className: student.className,
        school: student.school,
        username: student.username,
        temporaryPassword: student.password || 'Demo@123',
        createdAt: student.createdAt
      }
    ]);
    setShowPrintModal(true);
  };

  const handleOpenAuditLogs = () => {
    const logs = TeacherStudentService.getAuditLogs();
    setAuditLogs(logs);
    setShowAuditModal(true);
  };

  const handleQuickResetPassword = async (student: StudentAccount) => {
    const tempPass = generateTemporaryPassword();
    await resetStudentPassword(student.id, tempPass);
    setQuickResetResult({
      student,
      tempPass
    });
    showSuccess(`Đã đặt lại mật khẩu cho ${student.fullName}!`);
  };

  const handleToggleLockStatus = (student: StudentAccount) => {
    setSelectedStudentForLockToggle(student);
  };

  const handleConfirmLockToggle = () => {
    if (!selectedStudentForLockToggle) return;
    const isCurrentlyLocked = selectedStudentForLockToggle.status === 'LOCKED';
    const newStatus: AccountStatus = isCurrentlyLocked ? 'ACTIVE' : 'LOCKED';

    updateStudentStatus(selectedStudentForLockToggle.id, newStatus);
    showSuccess(
      isCurrentlyLocked
        ? `Đã mở khóa tài khoản cho ${selectedStudentForLockToggle.fullName}!`
        : `Đã tạm khóa tài khoản của ${selectedStudentForLockToggle.fullName}!`
    );
    setSelectedStudentForLockToggle(null);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Management Actions Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>Quản Lý Tài Khoản Học Sinh &amp; Tiến Độ</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Cấp tài khoản, sinh mật khẩu tạm thời, in phiếu đăng nhập và kiểm soát trạng thái học sinh
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              id="btn-audit-logs"
              variant="outline"
              size="sm"
              shape="pill"
              leftIcon={<History className="w-4 h-4 text-slate-600" />}
              onClick={handleOpenAuditLogs}
              className="text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Nhật Ký Quản Trị
            </Button>

            <Button
              id="btn-print-credentials"
              variant="outline"
              size="sm"
              shape="pill"
              leftIcon={<Printer className="w-4 h-4 text-blue-600" />}
              onClick={handleOpenPrintAllCredentials}
              className="text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              In Phiếu Đăng Nhập
            </Button>

            <Button
              id="btn-bulk-import"
              variant="outline"
              size="sm"
              shape="pill"
              leftIcon={<FileSpreadsheet className="w-4 h-4 text-emerald-600" />}
              onClick={() => setShowBulkModal(true)}
              className="text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Import Excel / CSV
            </Button>

            <Button
              id="btn-create-student-account"
              variant="cylinder"
              size="sm"
              shape="pill"
              leftIcon={<PlusCircle className="w-4 h-4" />}
              onClick={() => setShowCreateModal(true)}
              className="text-xs font-black bg-emerald-500 hover:bg-emerald-600 text-white shadow-md uppercase tracking-wider"
            >
              + TẠO TÀI KHOẢN HỌC SINH
            </Button>
          </div>
        </div>

        {/* Filters and Search Row */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
          {/* Class Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-bold">Lớp:</span>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            >
              <option value="all">-- Tất cả các lớp ({mergedStudents.length} HS) --</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.studentCount} HS)
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-bold">Trạng thái:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            >
              <option value="ALL">Tất cả trạng thái</option>
              <option value="ACTIVE">Đang hoạt động</option>
              <option value="PENDING">Chờ kích hoạt</option>
              <option value="LOCKED">Tạm khóa</option>
              <option value="DISABLED">Vô hiệu hóa</option>
            </select>
          </div>

          {/* Performance Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            {[
              { id: 'all', label: 'Tất cả kết quả' },
              { id: 'high', label: '≥90% Xuất sắc' },
              { id: 'medium', label: '80-89% Khá' },
              { id: 'needs_help', label: '<80% Cần kèm' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setPerformanceFilter(f.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  performanceFilter === f.id
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="flex-1 min-w-[200px] relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tìm theo tên học sinh, username, lớp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
            />
          </div>
        </div>
      </div>

      {/* 2. Unified Student Accounts & Analytics: Desktop Table */}
      <div className="hidden md:block bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Học Sinh</th>
                <th className="py-3.5 px-3">Tên Đăng Nhập</th>
                <th className="py-3.5 px-3">Lớp</th>
                <th className="py-3.5 px-3">Trạng Thái</th>
                <th className="py-3.5 px-3">Lần Đăng Nhập</th>
                <th className="py-3.5 px-3">Cấp Độ &amp; XP</th>
                <th className="py-3.5 px-3">Độ Chính Xác</th>
                <th className="py-3.5 px-4 text-right">Quản Trị Tài Khoản</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    Không tìm thấy học sinh nào phù hợp với bộ lọc.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const isWeak = (student.accuracyRate ?? 85) < 80;
                  const isLocked = student.status === 'LOCKED';
                  const formattedLastActive = student.lastActiveAt
                    ? new Date(student.lastActiveAt).toLocaleDateString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : 'Chưa vào';

                  return (
                    <tr
                      key={student.id}
                      className={`hover:bg-blue-50/40 transition-colors group ${
                        isLocked ? 'bg-slate-50/70 opacity-75' : ''
                      }`}
                    >
                      {/* Student Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black flex items-center justify-center text-xs shadow-2xs shrink-0">
                            {student.fullName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{student.fullName}</span>
                              {isWeak && (
                                <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px] font-bold">
                                  Cần kèm
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400 font-mono">
                              ID: {student.id.slice(-6)}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Username */}
                      <td className="py-3 px-3">
                        <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/80">
                          {student.username}
                        </span>
                      </td>

                      {/* Class */}
                      <td className="py-3 px-3">
                        <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                          {student.className}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        {renderStatusBadge(student.status)}
                      </td>

                      {/* Login Stats */}
                      <td className="py-3 px-3">
                        <div className="space-y-0.5 text-[11px]">
                          <span className="font-medium text-slate-700 block">
                            {formattedLastActive}
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            {student.loginCount || 0} lần đăng nhập
                          </span>
                        </div>
                      </td>

                      {/* Level & XP */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">
                            {student.level || 1}
                          </span>
                          <span className="font-bold text-slate-800">{student.xp || 0} XP</span>
                        </div>
                      </td>

                      {/* Accuracy */}
                      <td className="py-3 px-3">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className={`font-black ${isWeak ? 'text-amber-600' : 'text-emerald-600'}`}>
                              {student.accuracyRate ?? 85}%
                            </span>
                          </div>
                          <div className="w-16 bg-slate-100 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${isWeak ? 'bg-amber-500' : 'bg-emerald-500'}`}
                              style={{ width: `${student.accuracyRate ?? 85}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      {/* Action buttons */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {/* View Detail Profile */}
                          <button
                            onClick={() => setSelectedStudentForDetail(student)}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                            title="Xem hồ sơ tiến độ học tập"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Change Password */}
                          <button
                            onClick={() => setSelectedStudentForPassword(student)}
                            className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                            title="Đổi mật khẩu"
                          >
                            <KeyRound className="w-4 h-4" />
                          </button>

                          {/* Quick Reset Password */}
                          <button
                            onClick={() => handleQuickResetPassword(student)}
                            className="p-1.5 rounded-lg text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer"
                            title="Đặt lại mật khẩu tạm thời ngay lập tức"
                          >
                            <Sparkles className="w-4 h-4" />
                          </button>

                          {/* Move Class */}
                          <button
                            onClick={() => setSelectedStudentForMove(student)}
                            className="p-1.5 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer"
                            title="Chuyển lớp"
                          >
                            <ArrowRightLeft className="w-4 h-4" />
                          </button>

                          {/* Lock / Unlock Toggle */}
                          <button
                            onClick={() => handleToggleLockStatus(student)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              isLocked
                                ? 'text-emerald-600 hover:bg-emerald-50'
                                : 'text-slate-500 hover:text-orange-600 hover:bg-orange-50'
                            }`}
                            title={isLocked ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
                          >
                            {isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                          </button>

                          {/* Delete Student */}
                          <button
                            onClick={() => setDeletingStudent(student)}
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Xóa tài khoản"
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

      {/* 2b. Unified Student Accounts & Analytics: Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredStudents.length === 0 ? (
          <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
            Không tìm thấy học sinh nào phù hợp với bộ lọc.
          </div>
        ) : (
          filteredStudents.map((student) => {
            const isWeak = (student.accuracyRate ?? 85) < 80;
            const isLocked = student.status === 'LOCKED';
            const formattedLastActive = student.lastActiveAt
              ? new Date(student.lastActiveAt).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })
              : 'Chưa vào';

            return (
              <div
                key={student.id}
                className={`bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3 ${
                  isLocked ? 'bg-slate-50/80 opacity-80' : ''
                }`}
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-2xs shrink-0">
                      {student.fullName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <span>{student.fullName}</span>
                        {isWeak && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px] font-bold">
                            Cần kèm
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.2 rounded">
                          @{student.username}
                        </span>
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded">
                          {student.className}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>{renderStatusBadge(student.status)}</div>
                </div>

                {/* Performance stats */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Cấp Độ</span>
                    <span className="font-bold text-slate-800">Lv.{student.level || 1}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Kinh Nghiệm</span>
                    <span className="font-bold text-amber-600">{student.xp || 0} XP</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Chính Xác</span>
                    <span className={`font-bold ${isWeak ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {student.accuracyRate ?? 85}%
                    </span>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <div className="text-[10px] text-slate-400">
                    Lần cuối: {formattedLastActive}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenPrintCredentials(student)}
                      className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                      title="In phiếu tài khoản"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedStudentForPassword(student)}
                      className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Đổi mật khẩu"
                    >
                      <KeyRound className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedStudentForMove(student)}
                      className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
                      title="Chuyển lớp"
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleToggleLockStatus(student)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isLocked ? 'text-emerald-600 hover:bg-emerald-50' : 'text-amber-600 hover:bg-amber-50'
                      }`}
                      title={isLocked ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
                    >
                      {isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setDeletingStudent(student)}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Xóa tài khoản"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: CREATE STUDENT ACCOUNT                                             */}
      {/* ========================================================================= */}
      <CreateStudentAccountModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        classes={classes}
        defaultClassId={selectedClassId !== 'all' ? selectedClassId : undefined}
        existingUsernames={existingUsernames}
        schoolName={schoolName || 'Trường Phổ Thông Thực Hành Sư Phạm'}
        onStudentCreated={handleSingleStudentCreated}
        onOpenCredentialSheet={(item) => {
          setShowCreateModal(false);
          setPrintCredentialsList([item]);
          setShowPrintModal(true);
        }}
      />

      {/* ========================================================================= */}
      {/* MODAL: BULK IMPORT STUDENTS                                               */}
      {/* ========================================================================= */}
      <BulkImportStudentsModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        classes={classes}
        existingUsernames={existingUsernames}
        schoolName={schoolName || 'Trường Phổ Thông Thực Hành Sư Phạm'}
        onImportComplete={(count) => {
          reloadRoster();
        }}
        onOpenCredentialSheet={(items) => {
          setShowBulkModal(false);
          setPrintCredentialsList(items);
          setShowPrintModal(true);
        }}
      />

      {/* ========================================================================= */}
      {/* MODAL: BATCH CREDENTIAL SHEET (PRINT A4)                                  */}
      {/* ========================================================================= */}
      <StudentCredentialSheetModal
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
        credentials={printCredentialsList}
      />

      {/* ========================================================================= */}
      {/* MODAL: CHANGE STUDENT PASSWORD                                            */}
      {/* ========================================================================= */}
      <ChangeStudentPasswordModal
        isOpen={Boolean(selectedStudentForPassword)}
        onClose={() => setSelectedStudentForPassword(null)}
        student={selectedStudentForPassword}
        onPasswordChanged={async (studentId, newPass, reqChange) => {
          const res = await changeStudentPassword(studentId, newPass, reqChange);
          return res;
        }}
      />

      {/* ========================================================================= */}
      {/* MODAL: MOVE STUDENT CLASS                                                 */}
      {/* ========================================================================= */}
      <MoveStudentClassModal
        isOpen={Boolean(selectedStudentForMove)}
        onClose={() => setSelectedStudentForMove(null)}
        student={selectedStudentForMove}
        classes={classes}
        onMoveClass={(studentId, newClassName, newClassId) => {
          moveStudentClass(studentId, newClassName, newClassId);
          if (onUpdateStudent) {
            onUpdateStudent(studentId, { className: newClassName });
          }
        }}
      />

      {/* ========================================================================= */}
      {/* MODAL: AUDIT LOG HISTORY                                                  */}
      {/* ========================================================================= */}
      <StudentAuditLogModal
        isOpen={showAuditModal}
        onClose={() => setShowAuditModal(false)}
        logs={auditLogs}
      />

      {/* ========================================================================= */}
      {/* MODAL: QUICK RESET RESULT DIALOG                                          */}
      {/* ========================================================================= */}
      {quickResetResult && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-150 text-center">
            <div className="w-14 h-14 rounded-3xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto shadow-sm">
              <KeyRound className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900">
                ĐẶT LẠI MẬT KHẨU TẠM THỜI
              </h3>
              <p className="text-xs text-slate-500">
                Học sinh <strong>{quickResetResult.student.fullName}</strong> ({quickResetResult.student.username})
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">Tên tài khoản:</span>
                <span className="font-mono font-bold text-slate-900">{quickResetResult.student.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">Mật khẩu tạm mới:</span>
                <span className="font-mono font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded border border-orange-200">
                  {quickResetResult.tempPass}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button
                variant="outline"
                size="md"
                shape="pill"
                leftIcon={<Copy className="w-4 h-4" />}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `GEOMETRY LAB - MẬT KHẨU TẠM\nHọ tên: ${quickResetResult.student.fullName}\nUsername: ${quickResetResult.student.username}\nMật khẩu mới: ${quickResetResult.tempPass}`
                  );
                  showSuccess('Đã sao chép mật khẩu!');
                }}
                className="text-xs font-bold text-slate-700"
              >
                Sao Chép
              </Button>

              <Button
                variant="cylinder"
                size="md"
                shape="pill"
                onClick={() => setQuickResetResult(null)}
                className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
              >
                Hoàn Tất
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CONFIRM LOCK / UNLOCK TOGGLE                                       */}
      {/* ========================================================================= */}
      {selectedStudentForLockToggle && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-150">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto ${
              selectedStudentForLockToggle.status === 'LOCKED'
                ? 'bg-emerald-100 text-emerald-600'
                : 'bg-orange-100 text-orange-600'
            }`}>
              {selectedStudentForLockToggle.status === 'LOCKED' ? (
                <Unlock className="w-6 h-6" />
              ) : (
                <Lock className="w-6 h-6" />
              )}
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-base font-black text-slate-900">
                {selectedStudentForLockToggle.status === 'LOCKED'
                  ? 'Mở Khóa Tài Khoản Học Sinh?'
                  : 'Tạm Khóa Tài Khoản Học Sinh?'}
              </h3>
              <p className="text-xs text-slate-600">
                {selectedStudentForLockToggle.status === 'LOCKED'
                  ? `Học sinh ${selectedStudentForLockToggle.fullName} sẽ có thể đăng nhập lại vào Geometry Lab.`
                  : `Học sinh ${selectedStudentForLockToggle.fullName} sẽ tạm thời không thể đăng nhập. Toàn bộ dữ liệu bài tập và điểm số vẫn được giữ nguyên.`}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                shape="pill"
                onClick={() => setSelectedStudentForLockToggle(null)}
              >
                Hủy Bỏ
              </Button>

              <Button
                variant={selectedStudentForLockToggle.status === 'LOCKED' ? 'cylinder' : 'danger'}
                size="sm"
                shape="pill"
                onClick={handleConfirmLockToggle}
                className={
                  selectedStudentForLockToggle.status === 'LOCKED'
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold'
                    : 'bg-orange-600 hover:bg-orange-700 text-white font-bold'
                }
              >
                {selectedStudentForLockToggle.status === 'LOCKED' ? 'Xác Nhận Mở Khóa' : 'Xác Nhận Khóa'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CONFIRM DELETE STUDENT                                             */}
      {/* ========================================================================= */}
      {deletingStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-base font-black text-slate-900">
                Xác Nhận Xóa Học Sinh?
              </h3>
              <p className="text-xs text-slate-600">
                Bạn có chắc chắn muốn xóa học sinh <strong className="text-rose-600">{deletingStudent.fullName}</strong> ({deletingStudent.className})?
              </p>
            </div>

            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-[11px] text-rose-800">
              ⚠️ Toàn bộ thông tin tài khoản và kết quả của học sinh này sẽ bị xóa khỏi danh sách.
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                shape="pill"
                onClick={() => setDeletingStudent(null)}
              >
                Hủy Bỏ
              </Button>

              <Button
                variant="danger"
                size="sm"
                shape="pill"
                leftIcon={<Trash2 className="w-4 h-4" />}
                onClick={() => {
                  deleteStudent(deletingStudent.id);
                  if (onDeleteStudent) {
                    onDeleteStudent(deletingStudent.id);
                  }
                  showSuccess(`Đã xóa học sinh ${deletingStudent.fullName}!`);
                  setDeletingStudent(null);
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
              >
                Xác Nhận Xóa
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: VIEW STUDENT DETAIL PROFILE                                        */}
      {/* ========================================================================= */}
      {selectedStudentForDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black flex items-center justify-center text-lg shadow-xs">
                  {selectedStudentForDetail.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">{selectedStudentForDetail.fullName}</h3>
                  <p className="text-xs text-slate-500">
                    {selectedStudentForDetail.className} • {selectedStudentForDetail.school} • Tên tài khoản: <strong>{selectedStudentForDetail.username}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudentForDetail(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Cấp Độ</span>
                <span className="text-base font-black text-blue-600">Level {selectedStudentForDetail.level}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Điểm XP</span>
                <span className="text-base font-black text-amber-500">{selectedStudentForDetail.xp} XP</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Độ Chính Xác</span>
                <span className="text-base font-black text-emerald-600">{selectedStudentForDetail.accuracyRate ?? 90}%</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Chuỗi Học</span>
                <span className="text-base font-black text-orange-500">{selectedStudentForDetail.streakDays} ngày</span>
              </div>
            </div>

            {/* Shape Mastery Progress */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Tiến độ thành thạo hình học 3D
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100">
                  <span className="text-blue-900 font-bold block text-xs">Hình Trụ</span>
                  <span className="text-lg font-black text-blue-600">{selectedStudentForDetail.progress?.cylinder || 0}%</span>
                </div>
                <div className="p-3 rounded-2xl bg-orange-50/60 border border-orange-100">
                  <span className="text-orange-900 font-bold block text-xs">Hình Nón</span>
                  <span className="text-lg font-black text-orange-600">{selectedStudentForDetail.progress?.cone || 0}%</span>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                  <span className="text-emerald-900 font-bold block text-xs">Hình Cầu</span>
                  <span className="text-lg font-black text-emerald-600">{selectedStudentForDetail.progress?.sphere || 0}%</span>
                </div>
              </div>
            </div>

            {/* Account Metadata */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-slate-900 block">Thông tin tài khoản hệ thống:</span>
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div>• Ngày tạo: {new Date(selectedStudentForDetail.createdAt).toLocaleDateString('vi-VN')}</div>
                <div>• Trạng thái: {renderStatusBadge(selectedStudentForDetail.status)}</div>
                <div>• Lần đầu đăng nhập: {selectedStudentForDetail.firstLoginAt ? new Date(selectedStudentForDetail.firstLoginAt).toLocaleDateString('vi-VN') : 'Chưa đăng nhập'}</div>
                <div>• Lần đăng nhập gần nhất: {new Date(selectedStudentForDetail.lastActiveAt).toLocaleDateString('vi-VN')}</div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                variant="cylinder"
                size="sm"
                shape="pill"
                onClick={() => setSelectedStudentForDetail(null)}
              >
                Đóng Hồ Sơ
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
