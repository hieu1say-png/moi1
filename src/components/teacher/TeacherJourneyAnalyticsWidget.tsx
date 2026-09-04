/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - TeacherJourneyAnalyticsWidget
 * Section XVII Teacher Dashboard Upgrade:
 * 1. Tiến độ từng lớp (9A1, 9A2, 8A9, 9A3)
 * 2. Tiến độ từng học sinh:
 *    - Đã xem video chưa? (trụ, cầu, nón)
 *    - Đã làm bài tập chưa?
 *    - Đúng bao nhiêu câu?
 *    - Điểm mạnh / điểm yếu
 * 3. Phân tích lỗi thông minh & Gợi ý hành động cho giáo viên:
 *    - Ví dụ: "Học sinh thường sai ở công thức diện tích xung quanh hình nón"
 *    - Nút giao bài tập bổ trợ chủ đề yếu
 */

import React, { useState, useEffect } from 'react';
import {
  StudentProgressService,
  TeacherStudentRow,
  ClassAnalyticsSummary
} from '../../services/studentProgressService';
import { MathFormula } from '../common/MathFormula';
import {
  Users,
  Video,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Send,
  Sparkles,
  TrendingUp,
  Award,
  BookOpen,
  Filter,
  Check,
  ChevronDown
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface TeacherJourneyAnalyticsWidgetProps {
  currentClassId?: string;
  onOpenCreateAssignment?: (topicPreset?: string) => void;
}

export const TeacherJourneyAnalyticsWidget: React.FC<TeacherJourneyAnalyticsWidgetProps> = ({
  currentClassId,
  onOpenCreateAssignment
}) => {
  const { showSuccess } = useToast();
  const [selectedClass, setSelectedClass] = useState<string>('Lớp 9A2');
  const [studentsData, setStudentsData] = useState<TeacherStudentRow[]>([]);
  const [analytics, setAnalytics] = useState<ClassAnalyticsSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const availableClasses = ['Tất cả lớp', 'Lớp 9A1', 'Lớp 9A2', 'Lớp 9A3', 'Lớp 8A9'];

  useEffect(() => {
    loadData();
  }, [selectedClass]);

  const loadData = async () => {
    setLoading(true);
    const targetClass = selectedClass === 'Tất cả lớp' ? undefined : selectedClass;
    const [studentsRes, analyticsRes] = await Promise.all([
      StudentProgressService.fetchTeacherStudentsProgress(targetClass),
      StudentProgressService.fetchTeacherClassAnalytics(targetClass)
    ]);
    setStudentsData(studentsRes);
    setAnalytics(analyticsRes);
    setLoading(false);
  };

  const handleAssignRemediation = (weakTopic: string) => {
    if (onOpenCreateAssignment) {
      onOpenCreateAssignment(weakTopic);
    } else {
      showSuccess(`Đã tạo nhiệm vụ luyện tập bổ trợ: "${weakTopic}" cho ${selectedClass}!`);
    }
  };

  return (
    <div className="space-y-6 bg-[#FFFDF8] border border-[#E5DCCF] rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5DCCF] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#8F3E32] uppercase tracking-wider bg-[#FDF0ED] px-2.5 py-0.5 rounded-full border border-[#F4D2CA]">
              Quản Trị Học Tập Chuyên Sâu
            </span>
            <span className="text-xs text-[#766A61] font-medium hidden sm:inline">
              Theo dõi tiến độ hành trình tự học Toán 9
            </span>
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3A302B] mt-1">
            Tiến Độ Hành Trình Tự Học &amp; Phân Tích Lỗi Sai
          </h3>
        </div>

        {/* Class Selector Dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-[#766A61] font-bold shrink-0">Chọn lớp:</span>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#E5DCCF] text-xs font-bold text-[#3A302B] focus:outline-none focus:ring-2 focus:ring-[#8F3E32]/30"
          >
            {availableClasses.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3 High-Level Class KPIs */}
      {analytics && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DCCF] space-y-1">
            <div className="flex items-center justify-between text-xs text-[#766A61]">
              <span className="font-semibold">Tỷ lệ xem video bài học</span>
              <Video className="w-4 h-4 text-[#8F3E32]" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#8F3E32]">
              {analytics.videoCompletionRate}%
            </div>
            <div className="text-[11px] text-[#766A61]">
              Học sinh đã xem trọn bộ 3 video cố định
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DCCF] space-y-1">
            <div className="flex items-center justify-between text-xs text-[#766A61]">
              <span className="font-semibold">Độ chính xác bài tập</span>
              <Award className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-700">
              {analytics.practiceAccuracyAverage}%
            </div>
            <div className="text-[11px] text-[#766A61]">
              Trung bình các bài luyện tập trắc nghiệm
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DCCF] space-y-1">
            <div className="flex items-center justify-between text-xs text-[#766A61]">
              <span className="font-semibold">Sĩ số theo dõi</span>
              <Users className="w-4 h-4 text-[#997129]" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#3A302B]">
              {analytics.totalStudents} <span className="text-xs text-[#766A61] font-normal">học sinh</span>
            </div>
            <div className="text-[11px] text-[#766A61]">
              Dữ liệu được lưu trữ máy chủ liên tục
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: PHÂN TÍCH LỖI SAI & GỢI Ý HÀNH ĐỘNG CHO GIÁO VIÊN */}
      {analytics && analytics.frequentErrors && analytics.frequentErrors.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-serif font-bold text-sm sm:text-base text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Phân Tích Lỗi Thường Gặp Của Lớp &amp; Gợi Ý Hành Động:</span>
            </div>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-200/70 px-2.5 py-0.5 rounded-full">
              Hệ thống chẩn đoán tự động
            </span>
          </div>

          <div className="space-y-2.5">
            {analytics.frequentErrors.map((err, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/90 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="text-xs font-bold text-amber-900">
                    Chủ đề: {err.topic} ({err.percentage}% học sinh gặp khó khăn)
                  </div>
                  <div className="text-xs text-[#594D46] leading-relaxed">
                    <strong>Mô tả lỗi:</strong> {err.description}
                  </div>
                  <div className="text-xs text-[#8F3E32] font-medium">
                    💡 <em>{err.recommendation}</em>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAssignRemediation(err.topic)}
                  className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#8F3E32] hover:bg-[#723228] text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Giao Bài Luyện Tập Ngay</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: BẢNG TIẾN ĐỘ TỪNG HỌC SINH */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-serif font-bold text-sm sm:text-base text-[#3A302B]">
            Bảng Theo Dõi Tiến Độ Chi Tiết Từng Học Sinh ({studentsData.length})
          </h4>
          <span className="text-xs text-[#766A61]">Cập nhật liên tục theo thời gian thực</span>
        </div>

        <div className="overflow-x-auto border border-[#E5DCCF] rounded-2xl bg-white shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] text-[#766A61] uppercase tracking-wider font-bold border-b border-[#E5DCCF]">
              <tr>
                <th className="px-4 py-3">Học sinh</th>
                <th className="px-3 py-3">Lớp</th>
                <th className="px-3 py-3 text-center">Video Trụ</th>
                <th className="px-3 py-3 text-center">Video Cầu</th>
                <th className="px-3 py-3 text-center">Video Nón</th>
                <th className="px-3 py-3 text-center">Bài tập làm</th>
                <th className="px-3 py-3 text-center">Số câu đúng</th>
                <th className="px-4 py-3">Điểm mạnh &amp; Cần ôn lại</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DCCF]/70 text-[#3A302B]">
              {studentsData.map((st) => (
                <tr key={st.studentId} className="hover:bg-[#FAF7F2]/60 transition-colors">
                  {/* Student Name */}
                  <td className="px-4 py-3 font-semibold">
                    <div>{st.studentName}</div>
                    <div className="text-[10px] text-[#A0958B] font-mono">{st.studentId}</div>
                  </td>

                  {/* Class Name */}
                  <td className="px-3 py-3 font-medium text-[#594D46] whitespace-nowrap">
                    {st.className}
                  </td>

                  {/* Video Cyl */}
                  <td className="px-3 py-3 text-center">
                    {st.videoCylinderWatched ? (
                      <span className="inline-flex items-center text-emerald-600" title="Đã xem video hình trụ">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-slate-300" title="Chưa xem">
                        <XCircle className="w-4 h-4" />
                      </span>
                    )}
                  </td>

                  {/* Video Sph */}
                  <td className="px-3 py-3 text-center">
                    {st.videoSphereWatched ? (
                      <span className="inline-flex items-center text-emerald-600" title="Đã xem video hình cầu">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-slate-300" title="Chưa xem">
                        <XCircle className="w-4 h-4" />
                      </span>
                    )}
                  </td>

                  {/* Video Cone */}
                  <td className="px-3 py-3 text-center">
                    {st.videoConeWatched ? (
                      <span className="inline-flex items-center text-emerald-600" title="Đã xem video hình nón">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-slate-300" title="Chưa xem">
                        <XCircle className="w-4 h-4" />
                      </span>
                    )}
                  </td>

                  {/* Practice Status */}
                  <td className="px-3 py-3 text-center font-medium">
                    {st.practiceCompleted ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                        Đã làm
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                        Chưa làm
                      </span>
                    )}
                  </td>

                  {/* Score & Correct Count */}
                  <td className="px-3 py-3 text-center font-bold font-mono">
                    <span className={st.accuracyRate >= 80 ? 'text-emerald-700' : 'text-amber-700'}>
                      {st.totalCorrect} / {st.totalQuestions}
                    </span>
                    <span className="text-[10px] text-[#766A61] ml-1">({st.accuracyRate}%)</span>
                  </td>

                  {/* Strengths & Weaknesses */}
                  <td className="px-4 py-3">
                    <div className="space-y-0.5 max-w-xs">
                      {st.strengths.length > 0 && (
                        <div className="text-[11px] text-emerald-700 truncate">
                          <strong>Mạnh:</strong> {st.strengths.join(', ')}
                        </div>
                      )}
                      {st.weaknesses.length > 0 ? (
                        <div className="text-[11px] text-[#8F3E32] truncate">
                          <strong>Cần ôn:</strong> {st.weaknesses.join(', ')}
                        </div>
                      ) : (
                        <div className="text-[11px] text-[#766A61] italic">Tiến độ rất tốt</div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
