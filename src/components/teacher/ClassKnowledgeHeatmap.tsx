/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BẢN ĐỒ NHIỆT ĐIỂM YẾU LỚP HỌC (CLASS KNOWLEDGE HEATMAP)
 * Teacher Command Center Matrix:
 * Students x Topics/Skills Matrix with Traffic Light Heatmap:
 * - Red (< 50%): Critical Weakness / Exam Trap Vulnerability
 * - Yellow (50% - 80%): Developing / Needs Reinforcement
 * - Green (> 80%): Mastered
 */

import React, { useState, useMemo } from 'react';
import { SchoolClass, Student } from '../../types/dataArchitecture';
import { Button } from '../common/Button';
import {
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Sparkles,
  Search,
  Filter,
  Users,
  Download,
  Flame,
  ArrowRight
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export interface SkillColumn {
  id: string;
  name: string;
  shape: 'cylinder' | 'cone' | 'sphere' | 'overall';
  description: string;
}

export const SKILL_COLUMNS: SkillColumn[] = [
  { id: 'cyl_formula', name: 'Công thức Trụ ($S_{xq}, V$)', shape: 'cylinder', description: 'Ghi nhớ và áp dụng công thức $2\\pi rh, \\pi r^2 h$' },
  { id: 'cyl_radius_trap', name: 'Bẫy $d \\to r$ Trụ', shape: 'cylinder', description: 'Đổi đúng đường kính thành bán kính' },
  { id: 'cone_pythagoras', name: 'Pytago Nón ($l = \\sqrt{r^2+h^2}$)', shape: 'cone', description: 'Phân biệt chiều cao $h$ và đường sinh $l$' },
  { id: 'cone_sector_angle', name: 'Góc Quạt Tròn ($\\alpha = \\frac{r}{l} 360^\\circ$)', shape: 'cone', description: 'Tính góc trải phẳng mặt nón' },
  { id: 'sphere_volume_coef', name: 'Hệ số $\\frac{4}{3}$ Cầu', shape: 'sphere', description: 'Không nhầm với $\\frac{2}{3}$ hay quên chia 3' },
  { id: 'sphere_area', name: 'Diện tích Mặt Cầu ($4\\pi R^2$)', shape: 'sphere', description: 'Công thức $4\\pi R^2$ và diện tích bán cầu' },
  { id: 'unit_conversion', name: 'Quy đổi Đơn vị (Lít, $\\text{dm}^3$)', shape: 'overall', description: 'Đổi chuẩn $1\\text{ dm}^3 = 1\\text{ lít} = 1000\\text{ cm}^3$' },
  { id: 'drawing_standard', name: 'Vẽ Nét Khuất (---)', shape: 'overall', description: 'Chuẩn vẽ hình tự luận thi vào 10' }
];

interface ClassKnowledgeHeatmapProps {
  classes: SchoolClass[];
  selectedClassId?: string;
  onAssignRemedial?: (studentId: string, skillId: string) => void;
}

export const ClassKnowledgeHeatmap: React.FC<ClassKnowledgeHeatmapProps> = ({
  classes,
  selectedClassId,
  onAssignRemedial
}) => {
  const { showSuccess, showInfo } = useToast();
  const [currentClassId, setCurrentClassId] = useState<string>(
    selectedClassId || (classes[0] ? classes[0].id : '')
  );
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'danger' | 'warning' | 'good'>('all');

  const currentClass = classes.find((c) => c.id === currentClassId) || classes[0];

  // Deterministic mock / calculated student score matrix based on student IDs
  const studentScores = useMemo(() => {
    if (!currentClass) return [];
    return currentClass.students.map((st) => {
      // Deterministic pseudo-random based on char codes of student id/name
      const baseSeed = st.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const scores: Record<string, number> = {};

      SKILL_COLUMNS.forEach((col, idx) => {
        const val = ((baseSeed * (idx + 3) * 17) % 65) + 35; // Range 35 - 100
        scores[col.id] = Math.min(100, Math.max(30, val));
      });

      const avg = Math.round(
        Object.values(scores).reduce((a, b) => a + b, 0) / SKILL_COLUMNS.length
      );

      return {
        student: st,
        scores,
        avg
      };
    });
  }, [currentClass]);

  // Filtered Students
  const filteredData = useMemo(() => {
    return studentScores.filter((item) => {
      const matchName = item.student.fullName.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchName) return false;

      if (filterSeverity === 'danger') {
        return (Object.values(item.scores) as number[]).some((s) => s < 50);
      }
      if (filterSeverity === 'warning') {
        return (Object.values(item.scores) as number[]).some((s) => s >= 50 && s < 80);
      }
      if (filterSeverity === 'good') {
        return item.avg >= 80;
      }
      return true;
    });
  }, [studentScores, searchTerm, filterSeverity]);

  // Heatmap Color Helper
  const getCellColor = (score: number) => {
    if (score < 50) {
      return 'bg-red-500 text-white font-black hover:bg-red-600';
    }
    if (score < 80) {
      return 'bg-amber-400 text-amber-950 font-bold hover:bg-amber-500';
    }
    return 'bg-emerald-500 text-white font-bold hover:bg-emerald-600';
  };

  const handleExportCSV = () => {
    if (!currentClass) return;
    const header = ['Mã HS', 'Họ và Tên', ...SKILL_COLUMNS.map((c) => c.name), 'Trung Bình'];
    const rows = studentScores.map((row) => [
      row.student.id,
      row.student.fullName,
      ...SKILL_COLUMNS.map((c) => `${row.scores[c.id]}%`),
      `${row.avg}%`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [header, ...rows].map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BanDoNhiet_${currentClass.name}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showSuccess(`Đã xuất Bản đồ nhiệt lớp ${currentClass.name} thành công!`);
  };

  if (!currentClass) {
    return (
      <div className="p-8 text-center text-slate-500">
        Chưa có dữ liệu lớp học để hiển thị bản đồ nhiệt.
      </div>
    );
  }

  return (
    <div className="bg-[#FFFDF8] border-2 border-black rounded-3xl p-5 sm:p-7 shadow-[4px_4px_0px_#000] space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-red-100 border border-red-400 text-red-900 text-xs font-black uppercase flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-red-600" />
              Bản Đồ Nhiệt Điểm Yếu
            </span>
            <span className="text-xs text-slate-500 font-bold">Quản Trị Lớp Học &amp; Phân Hóa Năng Lực</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            📊 Class Knowledge Heatmap (Ma Trận Năng Lực Toán 9)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Theo dõi trực quan học sinh nào đang gặp nguy hiểm ở các bẫy đề thi tuyển sinh (Đỏ &lt; 50%), cần bổ trợ (Vàng 50-80%) và đã làm chủ (Xanh &gt; 80%).
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Class Select */}
          <select
            value={currentClassId}
            onChange={(e) => setCurrentClassId(e.target.value)}
            className="px-3 py-2 bg-white border-2 border-black rounded-xl text-xs font-bold text-slate-800 shadow-2xs cursor-pointer"
          >
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                Lớp {cls.name} ({cls.students.length} học sinh)
              </option>
            ))}
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="text-xs font-bold flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-slate-700" />
            <span>Xuất Báo Cáo CSV</span>
          </Button>
        </div>
      </div>

      {/* Legend & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên học sinh..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Severity Tabs */}
        <div className="flex items-center gap-1.5 text-xs font-bold">
          <button
            onClick={() => setFilterSeverity('all')}
            className={`px-3 py-1 rounded-lg transition-all ${
              filterSeverity === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tất cả ({studentScores.length})
          </button>
          <button
            onClick={() => setFilterSeverity('danger')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1 transition-all ${
              filterSeverity === 'danger' ? 'bg-red-600 text-white' : 'text-red-700 hover:bg-red-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-400" />
            Lỗ Hổng Nguy Hiểm (&lt;50%)
          </button>
          <button
            onClick={() => setFilterSeverity('warning')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1 transition-all ${
              filterSeverity === 'warning' ? 'bg-amber-500 text-white' : 'text-amber-700 hover:bg-amber-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-300" />
            Cần Rèn Thêm (50-80%)
          </button>
        </div>
      </div>

      {/* Heatmap Matrix Table */}
      <div className="bg-white border-2 border-black rounded-2xl shadow-2xs overflow-hidden overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="bg-slate-900 text-white border-b-2 border-black">
              <th className="p-3 font-bold sticky left-0 bg-slate-900 z-10 w-44">Học Sinh</th>
              {SKILL_COLUMNS.map((col) => (
                <th key={col.id} className="p-3 text-center min-w-[110px] font-bold" title={col.description}>
                  <div className="truncate max-w-[110px]">{col.name}</div>
                </th>
              ))}
              <th className="p-3 text-center font-bold min-w-[80px]">TB Lớp</th>
              <th className="p-3 text-center font-bold min-w-[100px]">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredData.map(({ student, scores, avg }) => (
              <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                {/* Student Info */}
                <td className="p-3 font-bold text-slate-900 sticky left-0 bg-white border-r border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px] font-black">
                      {student.fullName.charAt(0)}
                    </div>
                    <div>
                      <div className="truncate max-w-[120px]">{student.fullName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{student.id}</div>
                    </div>
                  </div>
                </td>

                {/* Skill Cells */}
                {SKILL_COLUMNS.map((col) => {
                  const score = scores[col.id] || 0;
                  return (
                    <td key={col.id} className="p-1.5 text-center">
                      <div
                        className={`py-1.5 px-2 rounded-lg text-xs font-mono transition-transform cursor-pointer select-none ${getCellColor(
                          score
                        )}`}
                        title={`${student.fullName} - ${col.name}: ${score}%`}
                        onClick={() => {
                          showInfo(`${student.fullName} đạt ${score}% ở mục ${col.name}`);
                          if (onAssignRemedial && score < 60) {
                            onAssignRemedial(student.id, col.id);
                          }
                        }}
                      >
                        {score}%
                      </div>
                    </td>
                  );
                })}

                {/* Average */}
                <td className="p-3 text-center font-bold font-mono">
                  <span
                    className={`px-2 py-0.5 rounded-full ${
                      avg >= 80
                        ? 'bg-emerald-100 text-emerald-900'
                        : avg >= 50
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-red-100 text-red-900'
                    }`}
                  >
                    {avg}%
                  </span>
                </td>

                {/* Quick Action */}
                <td className="p-3 text-center">
                  <button
                    onClick={() => {
                      showSuccess(`Đã tạo gói bài tập bù đắp chuyên sâu cho học sinh ${student.fullName}!`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[11px] font-bold"
                  >
                    Giao Phân Hóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
