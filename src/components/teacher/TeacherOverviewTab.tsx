/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - TEACHER OVERVIEW TAB
 */

import React, { useState } from 'react';
import { SchoolClass, Assignment, Student, AssignmentSubmission } from '../../types/dataArchitecture';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import {
  Users,
  FileCheck,
  Award,
  AlertTriangle,
  PlusCircle,
  TrendingUp,
  Clock,
  Sparkles,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Layers,
  Download
} from 'lucide-react';
import { TeacherService } from '../../services/teacherService';
import { useToast } from '../../context/ToastContext';
import { useTeacherStore, formatTeacherClassDisplay } from '../../stores/useTeacherStore';
import { SystemHealthCheckModal } from './SystemHealthCheckModal';
import { ShieldCheck } from 'lucide-react';
import { TeacherJourneyAnalyticsWidget } from './TeacherJourneyAnalyticsWidget';

interface TeacherOverviewTabProps {
  classes: SchoolClass[];
  selectedClassId: string;
  setSelectedClassId: (id: string) => void;
  students: Student[];
  assignments: Assignment[];
  submissions: AssignmentSubmission[];
  onNavigateTab: (tabId: string) => void;
  onOpenCreateAssignment: () => void;
}

export const TeacherOverviewTab: React.FC<TeacherOverviewTabProps> = ({
  classes,
  selectedClassId,
  setSelectedClassId,
  students,
  assignments,
  submissions,
  onNavigateTab,
  onOpenCreateAssignment
}) => {
  const { showSuccess } = useToast();
  const [isHealthCheckOpen, setIsHealthCheckOpen] = useState(false);
  const { profile, teacherName, schoolName } = useTeacherStore();
  const currentClass = classes.find((c) => c.id === selectedClassId) || classes[0];
  const classStudents = students.filter((s) => selectedClassId === 'all' || s.className === currentClass?.name);
  const classAssignments = assignments.filter((a) => selectedClassId === 'all' || a.targetClassId === selectedClassId);
  const activeAssignments = classAssignments.filter((a) => a.status === 'published');

  const needsHelpStudents = classStudents.filter((s) => s.accuracyRate < 80);
  const averageScore = currentClass ? currentClass.averageScore : 8.2;
  const completionRate = currentClass ? currentClass.completionRate : 80;

  const exportToCSV = () => {
    const targetClassId = selectedClassId === 'all' ? (classes[0]?.id || 'cls-9a2') : selectedClassId;
    const csvData = TeacherService.exportClassReportCSV(targetClassId);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Thong_Ke_${currentClass?.name ? currentClass.name.replace(/\s+/g, '_') : 'Lop'}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showSuccess(`Đã xuất dữ liệu thống kê CSV cho ${currentClass?.name || 'lớp'} thành công!`);
  };

  return (
    <div className="space-y-6">
      {/* 1. Class Selector & Top Quick Stats Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-base shadow-xs shrink-0">
            {currentClass?.name ? currentClass.name.replace('Lớp ', '') : '9A'}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-black text-slate-900">
                {selectedClassId === 'all' ? 'Tất cả các lớp phụ trách' : currentClass?.name}
              </h3>
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                Năm học 2025 - 2026
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {selectedClassId !== 'all' ? formatTeacherClassDisplay(currentClass?.name, profile, schoolName) : `${teacherName} • ${schoolName}`}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Mã lớp: <strong className="text-slate-700 font-mono">{currentClass?.classCode || 'TOAN9'}</strong> • Sĩ số: {classStudents.length} học sinh
            </p>
          </div>
        </div>

        {/* Class switcher buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setSelectedClassId('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedClassId === 'all'
                ? 'bg-white text-slate-900 shadow-2xs ring-1 ring-slate-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Tất cả
          </button>
          {classes.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelectedClassId(cls.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedClassId === cls.id
                  ? 'bg-white text-blue-700 shadow-2xs ring-1 ring-blue-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cls.name}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Sĩ số */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Tổng học sinh</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-black text-slate-900">{classStudents.length}</span>
              <span className="text-[10px] text-emerald-600 font-bold">100% active</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Điểm Trung Bình */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Điểm Trung Bình</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-black text-slate-900">{averageScore}</span>
              <span className="text-[10px] text-slate-400 font-bold">/ 10</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Tỷ Lệ Hoàn Thành */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Tiến độ chuyên đề</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-black text-slate-900">{completionRate}%</span>
              <span className="text-[10px] text-indigo-600 font-bold">Trụ • Nón • Cầu</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Nhiệm vụ đang mở */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Nhiệm vụ đang giao</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-black text-slate-900">{activeAssignments.length}</span>
              <span className="text-[10px] text-amber-600 font-bold">bài tập về nhà</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Action Center & Quick Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Active Assignments & Recent Submissions */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Assignments Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-blue-600" />
                  Nhiệm Vụ &amp; Bài Tập Đang Giao
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Học sinh nhận và làm bài trực tiếp trong giao diện ứng dụng.
                </p>
              </div>

              <Button
                variant="cylinder"
                size="sm"
                shape="pill"
                leftIcon={<PlusCircle className="w-4 h-4" />}
                onClick={onOpenCreateAssignment}
                className="font-bold text-xs"
              >
                Giao Bài Mới
              </Button>
            </div>

            <div className="space-y-3">
              {classAssignments.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs">
                  Chưa có nhiệm vụ nào được giao cho lớp này.
                </div>
              ) : (
                classAssignments.map((asg) => (
                  <div
                    key={asg.id}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{asg.title}</span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                          {asg.targetClassName}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{asg.description}</p>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400">
                        <span>Hạn nộp: <strong>{new Date(asg.dueDate).toLocaleDateString('vi-VN')}</strong></span>
                        <span>•</span>
                        <span>{asg.totalQuestions} câu hỏi</span>
                        <span>•</span>
                        <span className="text-amber-600 font-bold">+{asg.rewardXp} XP</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                      <div className="text-right">
                        <div className="text-xs font-bold text-slate-800">
                          {asg.submissionsCount || 0} bài nộp
                        </div>
                        <div className="text-[10px] text-emerald-600 font-medium">
                          Điểm TB: {asg.averageScore || '8.0'}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="xs"
                        shape="rounded"
                        onClick={() => onNavigateTab('results')}
                        className="text-xs"
                      >
                        Xem kết quả
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Subject Chapters Overview */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              Tiến Độ Chương Trình 3 Chủ Đề Hình Không Gian
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Cylinder */}
              <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-900">1. Hình Trụ</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-200 text-blue-800">92%</span>
                </div>
                <p className="text-[11px] text-slate-600">Sxq = 2πrh, Stp = 2πrh + 2πr², V = πr²h.</p>
                <div className="w-full bg-blue-200 rounded-full h-1.5">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              {/* Cone */}
              <div className="p-3.5 rounded-xl bg-orange-50/50 border border-orange-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-orange-900">2. Hình Nón</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-200 text-orange-800">81%</span>
                </div>
                <p className="text-[11px] text-slate-600">l = √(h² + r²), Sxq = πrl, V = 1/3 πr²h.</p>
                <div className="w-full bg-orange-200 rounded-full h-1.5">
                  <div className="bg-orange-600 h-1.5 rounded-full" style={{ width: '81%' }}></div>
                </div>
              </div>

              {/* Sphere */}
              <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-900">3. Hình Cầu</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-800">86%</span>
                </div>
                <p className="text-[11px] text-slate-600">S = 4πR², V = 4/3 πR³ (R = d/2).</p>
                <div className="w-full bg-emerald-200 rounded-full h-1.5">
                  <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Section XVII: TIẾN ĐỘ HÀNH TRÌNH TỰ HỌC TỪNG LỚP & HỌC SINH + PHÂN TÍCH LỖI SAI */}
          <TeacherJourneyAnalyticsWidget
            currentClassId={selectedClassId}
            onOpenCreateAssignment={onOpenCreateAssignment}
          />
        </div>

        {/* Right Column (4 cols): Early Warnings & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Warning: Needs Help Students */}
          <div className="bg-white rounded-2xl border border-amber-200 p-4.5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h4 className="text-xs font-black uppercase tracking-wider">Cảnh Báo Cần Hỗ Trợ ({needsHelpStudents.length})</h4>
            </div>
            <p className="text-[11px] text-slate-600">
              Học sinh có tỷ lệ chính xác dưới 80% hoặc hay gặp lỗi nhầm lẫn đường sinh / bán kính.
            </p>

            <div className="space-y-2">
              {needsHelpStudents.length === 0 ? (
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-medium text-center">
                  Cả lớp đang duy trì phong độ rất tốt!
                </div>
              ) : (
                needsHelpStudents.map((st) => (
                  <div
                    key={st.id}
                    className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 block">{st.fullName}</span>
                      <span className="text-[10px] text-slate-500">{st.className} • {st.accuracyRate}% độ chính xác</span>
                    </div>
                    <button
                      onClick={() => onNavigateTab('students')}
                      className="text-[11px] font-bold text-amber-700 hover:underline cursor-pointer"
                    >
                      Chi tiết
                    </button>
                  </div>
                ))
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              shape="rounded"
              onClick={() => onNavigateTab('errors')}
              className="w-full text-xs font-bold border-amber-200 text-amber-800 hover:bg-amber-50"
            >
              Xem Phân Tích Chẩn Đoán Lỗi
            </Button>
          </div>

          {/* Quick Navigation Shortcuts */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-2xs space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Lối Tắt Giáo Viên</h4>

            <button
              onClick={() => onNavigateTab('question-bank')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Ngân hàng câu hỏi (20+ bài)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              id="btn-export-csv-overview"
              onClick={exportToCSV}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5 text-xs font-bold text-emerald-900">
                <Download className="w-4 h-4 text-emerald-600" />
                <span>Xuất dữ liệu thống kê (CSV)</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-800">Tải ngay</span>
            </button>

            <button
              id="btn-health-check-overview"
              onClick={() => setIsHealthCheckOpen(true)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5 text-xs font-bold text-blue-900">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Kiểm Tra Hệ Thống (Health Check)</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-200 text-blue-800">10 Dịch Vụ</span>
            </button>

            <button
              onClick={() => onNavigateTab('reports')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Xuất Báo Cáo Học Tập (CSV / In)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* System Health Check Modal */}
      <SystemHealthCheckModal
        isOpen={isHealthCheckOpen}
        onClose={() => setIsHealthCheckOpen(false)}
      />
    </div>
  );
};
