/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - TEACHER REPORTS & SUPABASE CLOUD CONFIG TAB (Báo cáo & Kết nối Cloud)
 */

import React, { useState } from 'react';
import { TeacherClassReport, SchoolClass } from '../../types/dataArchitecture';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import {
  TrendingUp,
  Download,
  Printer,
  Database,
  Cloud,
  CheckCircle2,
  AlertTriangle,
  Server,
  Key,
  Globe,
  FileCode,
  Copy,
  ExternalLink,
  Award,
  Sparkles
} from 'lucide-react';
import { TeacherService } from '../../services/teacherService';
import {
  getStoredSupabaseConfig,
  saveSupabaseConfig,
  testSupabaseConnection,
  SupabaseConfig
} from '../../services/supabase/supabaseConfig';
import { useToast } from '../../context/ToastContext';
import { useTeacherStore, formatTeacherClassDisplay } from '../../stores/useTeacherStore';

interface TeacherReportsTabProps {
  classes: SchoolClass[];
  selectedClassId: string;
  setSelectedClassId: (id: string) => void;
}

export const TeacherReportsTab: React.FC<TeacherReportsTabProps> = ({
  classes,
  selectedClassId,
  setSelectedClassId
}) => {
  const { showSuccess, showError, showInfo } = useToast();
  const { profile, teacherName, schoolName } = useTeacherStore();
  const currentClassId = selectedClassId === 'all' ? classes[0]?.id || 'cls-9a2' : selectedClassId;
  const report = TeacherService.getClassReport(currentClassId);

  // Supabase State
  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseConfig>(getStoredSupabaseConfig);
  const [supabaseUrl, setSupabaseUrl] = useState(supabaseConfig.supabaseUrl);
  const [supabaseKey, setSupabaseKey] = useState(supabaseConfig.supabaseAnonKey);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; latencyMs?: number } | null>(null);
  const [showSqlSchema, setShowSqlSchema] = useState(false);

  // Handle Export CSV
  const handleExportCSV = () => {
    const csvContent = TeacherService.exportClassReportCSV(currentClassId);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Bao_Cao_Hoc_Tap_${report.className.replace(/\s+/g, '_')}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showSuccess(`Đã xuất báo cáo ${report.className} định dạng CSV thành công!`);
  };

  // Handle Print Preview
  const handlePrint = () => {
    window.print();
  };

  // Handle Test Supabase
  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    const res = await testSupabaseConnection(supabaseUrl, supabaseKey);
    setIsTesting(false);
    setTestResult(res);

    if (res.success) {
      showSuccess(res.message);
      setSupabaseConfig(getStoredSupabaseConfig());
    } else {
      showError(res.message);
    }
  };

  const handleCopySql = () => {
    const sqlSchema = `-- Geometry Lab Supabase Schema
CREATE TABLE IF NOT EXISTS public.classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    class_code VARCHAR(50) UNIQUE NOT NULL,
    teacher_id UUID NOT NULL
);
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID REFERENCES public.classes(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL
);`;
    navigator.clipboard.writeText(sqlSchema);
    showSuccess('Đã sao chép câu lệnh SQL tạo bảng Supabase!');
  };

  return (
    <div className="space-y-6">
      {/* 1. Top Controls Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h3 className="text-base font-black text-slate-900">
            Báo Cáo Tiến Độ &amp; Xuất Dữ Liệu Sư Phạm
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Báo cáo tổng kết năng lực hình học không gian, phân tích lỗi sai và chuẩn bị kết nối dữ liệu đám mây Supabase.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Class select */}
          <select
            value={currentClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="p-2 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <Button
            variant="cylinder"
            size="sm"
            shape="pill"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={handleExportCSV}
            className="font-bold text-xs"
          >
            Tải File CSV
          </Button>

          <Button
            variant="outline"
            size="sm"
            shape="pill"
            leftIcon={<Printer className="w-4 h-4" />}
            onClick={handlePrint}
            className="font-bold text-xs"
          >
            In Báo Cáo
          </Button>
        </div>
      </div>

      {/* 2. Executive Report Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-6 print:border-none print:shadow-none">
        {/* Report Header */}
        <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
              Báo Cáo Đánh Giá Năng Lực Học Tập
            </span>
            <h4 className="text-xl font-black text-slate-900 mt-0.5">
              {report.className} – Học Kỳ II (Năm học 2025 - 2026)
            </h4>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Giáo viên bộ môn: <strong className="text-slate-800">{teacherName}</strong> • Đơn vị: <strong className="text-slate-800">{schoolName}</strong>
            </p>
            <div className="mt-1 text-[11px] text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md inline-block border border-blue-200">
              {formatTeacherClassDisplay(report.className, profile, schoolName)}
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-black text-emerald-600">{report.averageScore}</div>
            <span className="text-[10px] text-slate-400 font-medium">Điểm Trung Bình Lớp</span>
          </div>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Tổng Sĩ Số</span>
            <span className="text-lg font-black text-slate-800">{report.totalStudents} HS</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Độ Chính Xác</span>
            <span className="text-lg font-black text-emerald-600">{report.averageAccuracy}%</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Lý Thuyết Đã Học</span>
            <span className="text-lg font-black text-blue-600">{report.theoriesCompletedPercent}%</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Bài Tập Đã Giải</span>
            <span className="text-lg font-black text-indigo-600">{report.exercisesCompletedCount} câu</span>
          </div>
        </div>

        {/* Mastery of 3 Shapes */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Mức Độ Làm Chủ 3 Chủ Đề Hình Khối:
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {report.shapesMastery.map((sm) => (
              <div key={sm.shapeId} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black text-xs text-slate-900">{sm.shapeName}</span>
                  <span className="text-xs font-black text-blue-600">{sm.masteryPercent}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${sm.masteryPercent}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-slate-400 block">
                  {sm.commonErrorCount} lượt mắc lỗi khái niệm
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Outstanding Students */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Top 5 Học Sinh Xuất Sắc Nhất Lớp:
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {report.topStudents.map((st, idx) => (
              <div
                key={st.studentId}
                className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-[10px] flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-bold text-slate-900 block">{st.studentName}</span>
                    <span className="text-[10px] text-slate-400">{st.xp} XP • Chuỗi {st.streakDays} ngày</span>
                  </div>
                </div>
                <span className="font-black text-emerald-600">{st.score} điểm</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Supabase Cloud Integration Panel */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-black text-slate-900">
                  Cấu Hình Kết Nối Cơ Sở Dữ Liệu Supabase Cloud
                </h4>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    supabaseConfig.isConnected
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {supabaseConfig.isConnected ? 'Cloud Connected' : 'Chế độ Mock LocalStorage'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Kiến trúc sẵn sàng đồng bộ bảng lớp học, câu hỏi, bài tập và điểm số lên PostgreSQL Supabase.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="xs"
            shape="pill"
            leftIcon={<FileCode className="w-3.5 h-3.5" />}
            onClick={() => setShowSqlSchema(!showSqlSchema)}
            className="text-xs font-bold"
          >
            {showSqlSchema ? 'Ẩn Schema SQL' : 'Xem File SQL Schema'}
          </Button>
        </div>

        {/* SQL Schema Preview Drawer */}
        {showSqlSchema && (
          <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-emerald-400 font-bold">File: /src/services/supabase/schema.sql</span>
              <button
                onClick={handleCopySql}
                className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded-lg cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                Sao chép SQL
              </button>
            </div>
            <pre className="overflow-x-auto text-[11px] leading-relaxed text-slate-300">
{`-- Chạy đoạn script này trong Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS public.classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    grade INT NOT NULL DEFAULT 9,
    class_code VARCHAR(50) UNIQUE NOT NULL,
    teacher_id UUID NOT NULL
);
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID REFERENCES public.classes(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL
);
CREATE TABLE IF NOT EXISTS public.assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    target_class_id UUID REFERENCES public.classes(id),
    due_date TIMESTAMPTZ NOT NULL
);`}
            </pre>
          </div>
        )}

        {/* Credentials Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-slate-400" />
              Supabase Project URL
            </label>
            <input
              type="text"
              placeholder="https://xyzcompany.supabase.co"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <Key className="w-4 h-4 text-slate-400" />
              Supabase Anon Public API Key
            </label>
            <input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={supabaseKey}
              onChange={(e) => setSupabaseKey(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        {/* Test Result Message */}
        {testResult && (
          <div
            className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
              testResult.success
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-semibold'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{testResult.message}</span>
            {testResult.latencyMs && (
              <span className="text-[10px] text-slate-400 ml-auto">({testResult.latencyMs}ms)</span>
            )}
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <span className="text-[11px] text-slate-400">
            Hiện tại ứng dụng hoạt động đầy đủ 100% với Local Database &amp; Mock Service.
          </span>

          <Button
            variant="cylinder"
            size="sm"
            shape="pill"
            leftIcon={<Server className="w-4 h-4" />}
            onClick={handleTestConnection}
            disabled={isTesting}
            className="font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {isTesting ? 'Đang kiểm tra kết nối...' : 'Kiểm Tra Kết Nối Supabase'}
          </Button>
        </div>
      </div>
    </div>
  );
};
