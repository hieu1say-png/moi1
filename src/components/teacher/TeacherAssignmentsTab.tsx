/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - TEACHER ASSIGNMENTS TAB (Giao nhiệm vụ & Bài tập)
 * Upgraded with 4-Tier Master Question Bank (73 Source + 1050 Variants),
 * Source Origin Filter, Matrix Allocation, No-Same-Archetype Constraint, Search & Pre-flight Validation.
 */

import React, { useState, useMemo } from 'react';
import { Assignment, SchoolClass, Exercise, ShapeType, ExerciseDifficulty, ExerciseType } from '../../types/dataArchitecture';
import { Button } from '../common/Button';
import { MathFormula, MathText } from '../common/MathFormula';
import {
  PlusCircle,
  Calendar,
  Award,
  AlertCircle,
  Eye,
  Trash2,
  ToggleLeft,
  ToggleRight,
  BookOpen,
  Shuffle,
  ListFilter,
  Sparkles,
  Search,
  CheckCircle2,
  X,
  Layers,
  HelpCircle,
  Filter
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useTeacherStore } from '../../stores/useTeacherStore';
import { QuestionSelectionEngine } from '../../services/questionSelectionEngine';
import {
  getCachedUnifiedAssignmentBank,
  UnifiedAssignmentQuestionItem,
  SourceFilterMode
} from '../../services/unifiedAssignmentService';
import { ARCHETYPE_MAP } from '../../data/questionBank1000';

interface TeacherAssignmentsTabProps {
  assignments: Assignment[];
  classes: SchoolClass[];
  questionBank: Exercise[];
  selectedClassId: string;
  onCreateAssignment: (assignmentData: Omit<Assignment, 'id' | 'createdAt' | 'submissionsCount' | 'averageScore'>) => void;
  onUpdateStatus: (id: string, status: 'published' | 'draft' | 'closed') => void;
  onDeleteAssignment: (id: string) => void;
  onViewResults: (assignmentId: string) => void;
  isOpenCreateModal?: boolean;
  onCloseCreateModal?: () => void;
}

export const TeacherAssignmentsTab: React.FC<TeacherAssignmentsTabProps> = ({
  assignments,
  classes,
  selectedClassId,
  onCreateAssignment,
  onUpdateStatus,
  onDeleteAssignment,
  onViewResults,
  isOpenCreateModal = false,
  onCloseCreateModal
}) => {
  const { showSuccess, showInfo, showError } = useToast();
  const { teacherName } = useTeacherStore();
  const [showModal, setShowModal] = useState(isOpenCreateModal);

  // Cached Unified Bank (73 Source + 1050 Variants)
  const fullBank = useMemo(() => getCachedUnifiedAssignmentBank(), []);

  // Form base states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetClassId, setTargetClassId] = useState(classes[0]?.id || 'cls-9a2');
  const [shapeId] = useState<ShapeType | 'all'>('cylinder');
  const [dueDate, setDueDate] = useState('2026-08-28');
  const [rewardXp, setRewardXp] = useState(120);

  // Selection states
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>(() => {
    return fullBank.slice(0, 3).map((q) => q.id);
  });
  const [selectionMode, setSelectionMode] = useState<'manual' | 'random'>('manual');
  const [randomCount, setRandomCount] = useState(10);
  const [randomSeed, setRandomSeed] = useState<number>(Date.now());

  // Filter states
  const [sourceFilterMode, setSourceFilterMode] = useState<SourceFilterMode>('BOTH');
  const [selectedTopics, setSelectedTopics] = useState<Array<ShapeType | 'mixed'>>(['cylinder', 'cone', 'sphere', 'mixed']);
  const [selectedDifficulties, setSelectedDifficulties] = useState<ExerciseDifficulty[]>(['easy', 'medium', 'hard', 'olympiad']);
  const [selectedTypes, setSelectedTypes] = useState<ExerciseType[]>(['multiple_choice', 'true_false', 'numeric']);
  const [searchQuery, setSearchQuery] = useState('');

  // Random Matrix & Archetype Uniqueness
  const [noSameArchetype, setNoSameArchetype] = useState(true);
  const [matrixRatios, setMatrixRatios] = useState({ cylinder: 3, cone: 3, sphere: 2, mixed: 2 });
  const [useMatrixRatio, setUseMatrixRatio] = useState(true);
  const [archetypeWarning, setArchetypeWarning] = useState<string | null>(null);

  // Question Preview state
  const [previewItem, setPreviewItem] = useState<UnifiedAssignmentQuestionItem | null>(null);

  const filteredAssignments = assignments.filter(
    (a) => selectedClassId === 'all' || a.targetClassId === selectedClassId
  );

  // Filtered pool based on active controls
  const visibleQuestions = useMemo(() => {
    return QuestionSelectionEngine.searchQuestions(fullBank, {
      sourceMode: sourceFilterMode,
      topics: selectedTopics,
      difficulties: selectedDifficulties,
      types: selectedTypes,
      searchQuery
    });
  }, [fullBank, sourceFilterMode, selectedTopics, selectedDifficulties, selectedTypes, searchQuery]);

  // Handle toggle selection for manual mode
  const handleToggleExerciseSelection = (id: string) => {
    if (selectedExerciseIds.includes(id)) {
      setSelectedExerciseIds(selectedExerciseIds.filter((exId) => exId !== id));
    } else {
      setSelectedExerciseIds([...selectedExerciseIds, id]);
    }
  };

  // Select/Deselect all visible
  const handleSelectAllVisible = () => {
    const visibleIds = visibleQuestions.map((q) => q.id);
    const newSelected = Array.from(new Set([...selectedExerciseIds, ...visibleIds]));
    setSelectedExerciseIds(newSelected);
  };

  const handleClearSelection = () => {
    setSelectedExerciseIds([]);
  };

  // Generate random question set
  const handleGenerateRandomQuestions = (countToUse?: number) => {
    const target = countToUse || randomCount;
    const result = QuestionSelectionEngine.selectUnifiedQuestions(fullBank, {
      sourceMode: sourceFilterMode,
      topics: selectedTopics,
      difficulties: selectedDifficulties,
      types: selectedTypes,
      searchQuery,
      noSameArchetype,
      count: target,
      matrixRatio: useMatrixRatio ? matrixRatios : undefined,
      randomSeed: Date.now()
    });

    const ids = result.selectedQuestions.map((q) => q.id);
    setSelectedExerciseIds(ids);
    setRandomSeed(result.seedUsed);

    if (result.warningMessage) {
      setArchetypeWarning(result.warningMessage);
      showInfo(result.warningMessage);
    } else {
      setArchetypeWarning(null);
      showSuccess(`Đã tạo ngẫu nhiên thành công ${ids.length} câu hỏi không trùng lặp!`);
    }
  };

  // Calculate total points
  const totalPoints = useMemo(() => {
    const bankMap = new Map<string, UnifiedAssignmentQuestionItem>(fullBank.map((q) => [q.id, q]));
    let sum = 0;
    for (const id of selectedExerciseIds) {
      const q = bankMap.get(id);
      sum += q ? q.points : 2.5;
    }
    return sum;
  }, [fullBank, selectedExerciseIds]);


  // Pre-flight validate and submit
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Run Pre-flight Validation
    const validation = QuestionSelectionEngine.validateAssignment({
      title,
      questionIds: selectedExerciseIds,
      dueDate,
      bank: fullBank
    });

    if (!validation.isValid) {
      showError(validation.errors[0] || 'Vui lòng kiểm tra lại cấu hình bài tập!');
      return;
    }

    const targetClass = classes.find((c) => c.id === targetClassId);

    // 2. Dispatch Assignment Object
    onCreateAssignment({
      title,
      description,
      instruction: description,
      shapeId,
      targetClassId,
      classId: targetClassId,
      targetClassName: targetClass?.name || 'Lớp 9A2',
      teacherId: 'usr-teacher-001',
      teacherName: teacherName || 'ThS. Trần Ngọc Hiếu',
      dueDate: new Date(`${dueDate}T23:59:59Z`).toISOString(),
      rewardXp: Number(rewardXp) || 120,
      xp: Number(rewardXp) || 120,
      exerciseIds: selectedExerciseIds,
      questionIds: selectedExerciseIds,
      sourceMode: sourceFilterMode,
      totalQuestions: selectedExerciseIds.length,
      totalPoints: totalPoints,
      status: 'published',
      selectionMode,
      randomSeed: selectionMode === 'random' ? randomSeed : undefined,
      gradingPolicy: 'standard_point_scale'
    });

    showSuccess(`Đã giao bài tập thành công cho ${targetClass?.name || 'lớp'}!`);
    setShowModal(false);
    if (onCloseCreateModal) onCloseCreateModal();

    // Reset fields
    setTitle('');
    setDescription('');
    setSelectedExerciseIds(['MCQ-001', 'MCQ-002']);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h3 className="text-base font-black text-slate-900">
            Quản Lý Nhiệm Vụ &amp; Giao Bài Tập Về Nhà
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Giao bài tập trực tiếp từ Ngân hàng 1000+ câu hỏi chuẩn hóa &amp; 73 câu nguồn. Tự động bảo toàn dữ liệu và phân tích năng lực.
          </p>
        </div>

        <Button
          variant="cylinder"
          size="md"
          shape="pill"
          leftIcon={<PlusCircle className="w-4 h-4" />}
          onClick={() => setShowModal(true)}
          className="font-bold text-xs"
        >
          Tạo &amp; Giao Nhiệm Vụ Mới
        </Button>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 text-xs">
            Chưa có bài tập nào được giao cho lớp này. Nhấn "Tạo &amp; Giao Nhiệm Vụ Mới" để bắt đầu.
          </div>
        ) : (
          filteredAssignments.map((asg) => {
            const isClosed = asg.status === 'closed';

            return (
              <div
                key={asg.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 transition-all p-5 shadow-2xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black">
                        {asg.targetClassName}
                      </span>
                      <h4 className="text-sm font-black text-slate-900">{asg.title}</h4>
                      <span
                        className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                          isClosed ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {isClosed ? 'Đã đóng nộp bài' : 'Đang mở nộp bài'}
                      </span>
                      {asg.sourceMode && (
                        <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                          {asg.sourceMode === 'SOURCE_ONLY' ? 'Gốc' : asg.sourceMode === 'VARIANT_ONLY' ? 'Biến thể' : 'Gốc + Biến thể'}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{asg.description}</p>

                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Hạn nộp: <strong>{new Date(asg.dueDate).toLocaleDateString('vi-VN')}</strong></span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        <span>{asg.totalQuestions} câu hỏi ({asg.totalPoints || asg.totalQuestions * 2.5} điểm)</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-600 font-bold">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>+{asg.rewardXp || asg.xp} XP thưởng</span>
                      </div>
                    </div>
                  </div>

                  {/* Submission statistics & View Results Button */}
                  <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="text-right">
                      <div className="text-xs font-black text-slate-900">
                        {asg.submissionsCount || 0} Học sinh đã nộp
                      </div>
                      <div className="text-[11px] text-emerald-600 font-bold">
                        Điểm TB: {asg.averageScore || '8.2'} / 10
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="cylinder"
                        size="xs"
                        shape="rounded"
                        leftIcon={<Eye className="w-3.5 h-3.5" />}
                        onClick={() => onViewResults(asg.id)}
                        className="text-xs font-bold"
                      >
                        Xem Bài Nộp
                      </Button>

                      <button
                        onClick={() =>
                          onUpdateStatus(asg.id, isClosed ? 'published' : 'closed')
                        }
                        title={isClosed ? 'Mở lại bài nộp' : 'Đóng nộp bài'}
                        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                      >
                        {isClosed ? <ToggleLeft className="w-5 h-5" /> : <ToggleRight className="w-5 h-5 text-emerald-600" />}
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Bạn có chắc muốn xóa bài tập "${asg.title}"?`)) {
                            onDeleteAssignment(asg.id);
                            showSuccess('Đã xóa bài tập!');
                          }
                        }}
                        title="Xóa bài tập"
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ============================================================
          UPGRADED MODAL: GIAO NHIỆM VỤ & BÀI TẬP MỚI
         ============================================================ */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Giao Nhiệm Vụ &amp; Bài Tập Mới
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Ngân hàng 73 câu gốc + 1050 biến thể toán học chuẩn hóa
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  if (onCloseCreateModal) onCloseCreateModal();
                }}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              {/* I. SECTION: THÔNG TIN BÀI TẬP (GIỮ NGUYÊN) */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Tiêu đề bài tập (*)</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Đề ôn tập chuyên đề: Hình trụ &amp; Khối tròn xoay thực tế"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-200 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Lớp nhận bài (*)</label>
                  <select
                    value={targetClassId}
                    onChange={(e) => setTargetClassId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.studentCount} HS)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Hạn nộp bài (*)</label>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Điểm thưởng XP</label>
                  <input
                    type="number"
                    value={rewardXp}
                    onChange={(e) => setRewardXp(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Lời dặn của giáo viên</label>
                <textarea
                  rows={2}
                  placeholder="VD: Các em chú ý tính đúng đơn vị diện tích và áp dụng công thức 4 bước trước khi kết luận..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                ></textarea>
              </div>

              {/* II. SECTION: NGUỒN CÂU HỎI & BỘ LỌC CHUYÊN SÂU */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                {/* Source Filter Tabs */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1.5 uppercase tracking-wide">
                    <Filter className="w-3.5 h-3.5 text-blue-600" />
                    Nguồn Câu Hỏi:
                  </span>
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setSourceFilterMode('SOURCE_ONLY')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        sourceFilterMode === 'SOURCE_ONLY'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      CÂU GỐC (73)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSourceFilterMode('VARIANT_ONLY')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        sourceFilterMode === 'VARIANT_ONLY'
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      BIẾN THỂ (1050)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSourceFilterMode('BOTH')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        sourceFilterMode === 'BOTH'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      CẢ HAI (1123)
                    </button>
                  </div>
                </div>

                {/* Filters Grid: Chủ đề, Dạng, Độ khó */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 border-t border-slate-200/80">
                  {/* Topic Filter */}
                  <div className="space-y-1">
                    <span className="font-bold text-slate-700 block text-[11px]">Chủ đề:</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'cylinder', label: 'Hình trụ' },
                        { id: 'cone', label: 'Hình nón' },
                        { id: 'sphere', label: 'Hình cầu' },
                        { id: 'mixed', label: 'Tổng hợp' }
                      ].map((top) => {
                        const isChecked = selectedTopics.includes(top.id as any);
                        return (
                          <label key={top.id} className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-slate-200 cursor-pointer hover:border-slate-300">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                if (isChecked) {
                                  if (selectedTopics.length > 1) setSelectedTopics(selectedTopics.filter((t) => t !== top.id));
                                } else {
                                  setSelectedTopics([...selectedTopics, top.id as any]);
                                }
                              }}
                              className="rounded text-blue-600"
                            />
                            <span className="text-[11px] text-slate-800">{top.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Type Filter */}
                  <div className="space-y-1">
                    <span className="font-bold text-slate-700 block text-[11px]">Dạng câu hỏi:</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'multiple_choice', label: 'Trắc nghiệm' },
                        { id: 'true_false', label: 'Đúng/Sai' },
                        { id: 'numeric', label: 'Trả lời ngắn' }
                      ].map((typ) => {
                        const isChecked = selectedTypes.includes(typ.id as any);
                        return (
                          <label key={typ.id} className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-slate-200 cursor-pointer hover:border-slate-300">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                if (isChecked) {
                                  if (selectedTypes.length > 1) setSelectedTypes(selectedTypes.filter((t) => t !== typ.id));
                                } else {
                                  setSelectedTypes([...selectedTypes, typ.id as any]);
                                }
                              }}
                              className="rounded text-blue-600"
                            />
                            <span className="text-[11px] text-slate-800">{typ.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Difficulty Filter */}
                  <div className="space-y-1">
                    <span className="font-bold text-slate-700 block text-[11px]">Độ khó:</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'easy', label: 'Nhận biết' },
                        { id: 'medium', label: 'Thông hiểu' },
                        { id: 'hard', label: 'Vận dụng' },
                        { id: 'olympiad', label: 'Vận dụng cao' }
                      ].map((diff) => {
                        const isChecked = selectedDifficulties.includes(diff.id as any);
                        return (
                          <label key={diff.id} className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-slate-200 cursor-pointer hover:border-slate-300">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                if (isChecked) {
                                  if (selectedDifficulties.length > 1) setSelectedDifficulties(selectedDifficulties.filter((d) => d !== diff.id));
                                } else {
                                  setSelectedDifficulties([...selectedDifficulties, diff.id as any]);
                                }
                              }}
                              className="rounded text-blue-600"
                            />
                            <span className="text-[11px] text-slate-800">{diff.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm theo mã câu (MCQ-001, TL-005, VAR-0010), từ khóa, nội dung, archetype, nguồn, lỗi sai..."
                    className="w-full pl-9 pr-8 py-2 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-200 text-xs"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* III. SECTION: CHẾ ĐỘ CHỌN CÂU HỎI (MANUAL vs RANDOM) */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                    Phương Thức Chọn Đề
                  </label>
                  <span className="text-[11px] font-bold text-blue-700">
                    Đang chọn: {selectedExerciseIds.length} câu ({totalPoints} điểm)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectionMode('manual')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      selectionMode === 'manual'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs ring-2 ring-blue-100'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <ListFilter className="w-4 h-4" />
                    <span>Chọn thủ công ({selectedExerciseIds.length} câu)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectionMode('random');
                      if (selectedExerciseIds.length <= 2) {
                        handleGenerateRandomQuestions(10);
                      }
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      selectionMode === 'random'
                        ? 'bg-purple-600 text-white border-purple-600 shadow-xs ring-2 ring-purple-100'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Shuffle className="w-4 h-4" />
                    <span>Tạo đề ngẫu nhiên (Random Matrix)</span>
                  </button>
                </div>
              </div>

              {/* RANDOM MATRIX CONFIGURATION PANEL */}
              {selectionMode === 'random' && (
                <div className="p-3.5 bg-purple-50/70 rounded-2xl border border-purple-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-purple-900 text-xs flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      Cấu Hình Ma Trận Random &amp; Seed
                    </span>
                    <span className="text-[10px] font-mono text-purple-600 bg-white px-2 py-0.5 rounded-md border border-purple-200">
                      Seed: #{randomSeed}
                    </span>
                  </div>

                  {/* Preset Buttons */}
                  <div className="space-y-1">
                    <span className="font-bold text-slate-700 block text-[11px]">Chọn nhanh số câu:</span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {[5, 10, 15, 20].map((countVal) => (
                        <button
                          key={countVal}
                          type="button"
                          onClick={() => {
                            setRandomCount(countVal);
                            handleGenerateRandomQuestions(countVal);
                          }}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            randomCount === countVal
                              ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                              : 'bg-white text-purple-900 border-purple-200 hover:bg-purple-100'
                          }`}
                        >
                          {countVal} câu
                        </button>
                      ))}
                      <div className="flex items-center gap-1.5 ml-auto">
                        <span className="text-[11px] text-slate-600 font-bold">Tùy chỉnh:</span>
                        <input
                          type="number"
                          min={1}
                          max={50}
                          value={randomCount}
                          onChange={(e) => setRandomCount(Math.max(1, parseInt(e.target.value) || 10))}
                          className="w-16 p-1 text-center bg-white rounded-lg border border-purple-200 font-bold text-slate-900"
                        />
                      </div>
                    </div>
                  </div>

                  {/* No Same Archetype Constraint Switch */}
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-purple-100">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-800 text-xs block">
                        Không chọn hai câu cùng một Archetype (No Same Archetype)
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Đảm bảo bài tập bao quát đa dạng mô hình toán học, không lặp lại cùng dạng câu.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNoSameArchetype(!noSameArchetype)}
                      className={`p-1 rounded-lg transition-colors ${noSameArchetype ? 'text-purple-600' : 'text-slate-400'}`}
                    >
                      {noSameArchetype ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                    </button>
                  </div>

                  {/* Matrix ratio allocation */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700 text-[11px]">Phân bổ theo ma trận chủ đề:</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setUseMatrixRatio(true);
                            setMatrixRatios({ cylinder: 3, cone: 3, sphere: 2, mixed: 2 });
                          }}
                          className={`px-2 py-0.5 rounded-lg border text-[10px] font-bold ${
                            useMatrixRatio ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-slate-600 border-slate-200'
                          }`}
                        >
                          Chuẩn (3 Trụ - 3 Nón - 2 Cầu - 2 Tổng hợp)
                        </button>
                        <button
                          type="button"
                          onClick={() => setUseMatrixRatio(false)}
                          className={`px-2 py-0.5 rounded-lg border text-[10px] font-bold ${
                            !useMatrixRatio ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-slate-600 border-slate-200'
                          }`}
                        >
                          Tự do
                        </button>
                      </div>
                    </div>
                  </div>

                  {archetypeWarning && (
                    <div className="p-2 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-[11px] flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                      <span>{archetypeWarning}</span>
                    </div>
                  )}

                  <div className="pt-1">
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      shape="rounded"
                      leftIcon={<Shuffle className="w-3.5 h-3.5" />}
                      onClick={() => handleGenerateRandomQuestions()}
                      className="w-full bg-purple-600 hover:bg-purple-700 font-bold text-xs"
                    >
                      🎲 Tạo Lại Bộ Đề Random Theo Ma Trận
                    </Button>
                  </div>
                </div>
              )}

              {/* IV. SECTION: DANH SÁCH CÂU HỎI TỪ NGÂN HÀNG (MANUAL SELECTION & PREVIEW) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="font-bold text-slate-800">
                      Danh sách câu hỏi ({visibleQuestions.length} câu phù hợp)
                    </label>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                      {selectedExerciseIds.length} đã chọn
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px]">
                    <button
                      type="button"
                      onClick={handleSelectAllVisible}
                      className="text-blue-600 hover:underline font-bold cursor-pointer"
                    >
                      Chọn tất cả hiện tại
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                      type="button"
                      onClick={handleClearSelection}
                      className="text-slate-500 hover:underline font-bold cursor-pointer"
                    >
                      Bỏ chọn hết
                    </button>
                  </div>
                </div>

                <div className="max-h-64 overflow-y-auto space-y-2 p-2 bg-slate-50 rounded-2xl border border-slate-200">
                  {visibleQuestions.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 text-xs">
                      Không tìm thấy câu hỏi nào phù hợp với bộ lọc hiện tại.
                    </div>
                  ) : (
                    visibleQuestions.map((q) => {
                      const isSelected = selectedExerciseIds.includes(q.id);

                      return (
                        <div
                          key={q.id}
                          className={`p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-blue-50/90 border-blue-300 font-semibold text-blue-900 shadow-2xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div
                            onClick={() => handleToggleExerciseSelection(q.id)}
                            className="flex items-center gap-2 cursor-pointer flex-1 min-w-0"
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}}
                              className="rounded text-blue-600 shrink-0"
                            />

                            {/* Badge GỐC vs BIẾN THỂ */}
                            {q.origin === 'SOURCE_EXACT' ? (
                              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-black shrink-0">
                                GỐC
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 text-[9px] font-black shrink-0">
                                BIẾN THỂ
                              </span>
                            )}

                            {/* Question ID */}
                            <span className="font-mono text-[10px] text-slate-500 shrink-0">
                              [{q.id}]
                            </span>

                            {/* Question Text */}
                            <span className="text-xs line-clamp-1 flex-1">
                              {q.question}
                            </span>

                            {q.hasImage && (
                              <span className="px-1 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px] font-bold shrink-0">
                                📷 Hình
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                              {q.topicLabel}
                            </span>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreviewItem(q);
                              }}
                              className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-blue-100 text-blue-700 hover:text-blue-900 text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                            >
                              <Eye className="w-3 h-3" />
                              <span>👁 Xem trước</span>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Action Buttons & Pre-flight Summary */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="text-slate-600 text-xs">
                  Tổng cộng: <strong className="text-slate-900">{selectedExerciseIds.length} câu</strong> |{' '}
                  Tổng điểm: <strong className="text-blue-700">{totalPoints} điểm</strong>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    shape="pill"
                    onClick={() => {
                      setShowModal(false);
                      if (onCloseCreateModal) onCloseCreateModal();
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    type="submit"
                    variant="cylinder"
                    size="sm"
                    shape="pill"
                    className="font-bold bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={selectedExerciseIds.length === 0}
                  >
                    Giao Bài Cho Học Sinh
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          V. PREVIEW MODAL: CHI TIẾT CÂU HỎI [ XEM TRƯỚC ]
         ============================================================ */}
      {previewItem && (
        <div className="fixed inset-0 z-60 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[88vh] overflow-y-auto animate-in fade-in zoom-in duration-150">
            {/* Header with Badges */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                {previewItem.origin === 'SOURCE_EXACT' ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs">
                    CÂU GỐC
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-black text-xs">
                    BIẾN THỂ CHUẨN HÓA
                  </span>
                )}
                <span className="text-xs font-mono font-bold text-slate-600">
                  [{previewItem.id}]
                </span>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Category Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px]">
                  Chủ đề: {previewItem.topicLabel}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[10px]">
                  Dạng: {previewItem.typeLabel}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold text-[10px]">
                  Độ khó: {previewItem.difficultyLabel}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">
                  Archetype: {previewItem.archetypeName} ({previewItem.archetypeId})
                </span>
              </div>

              {/* Question Text */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-slate-900 leading-relaxed font-medium">
                <MathText text={previewItem.question} />
              </div>

              {/* Formula & Core Model */}
              {previewItem.formula && (
                <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-1">
                  <span className="font-bold text-amber-900 block text-[10px] uppercase">
                    Mô hình toán học &amp; Công thức cốt lõi:
                  </span>
                  <div className="font-mono text-xs text-amber-950">
                    <MathFormula math={previewItem.formula} />
                  </div>
                </div>
              )}

              {/* Options for MCQ */}
              {previewItem.type === 'multiple_choice' && previewItem.options && (
                <div className="space-y-1.5 pt-1">
                  <span className="font-bold text-slate-700 block text-[11px]">Lựa chọn đáp án:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {previewItem.options.map((opt, idx) => {
                      const letters = ['A', 'B', 'C', 'D'];
                      const isCorrect = previewItem.correctAnswerDisplay.includes(opt) || previewItem.correctAnswerDisplay.startsWith(letters[idx]);
                      return (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                            isCorrect
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                              isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {letters[idx] || idx + 1}
                          </span>
                          <span className="text-xs">
                            <MathText text={opt} />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Correct Answer Display */}
              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 flex items-center justify-between">
                <span className="font-bold text-xs">Đáp án chính xác:</span>
                <span className="font-black text-xs font-mono bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                  {previewItem.correctAnswerDisplay}
                </span>
              </div>

              {/* 4-Step Pedagogical Solution */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <span className="font-black text-slate-900 text-xs flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Lời Giải Sư Phạm Chuẩn 4 Bước:
                </span>
                <div className="space-y-1.5 p-3 bg-blue-50/50 rounded-2xl border border-blue-100 text-slate-800">
                  {previewItem.solution4Steps.map((step, idx) => (
                    <div key={idx} className="leading-relaxed">
                      <MathText text={step} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Source Document Reference */}
              {previewItem.sourceDoc && (
                <div className="text-[10px] text-slate-500 pt-1">
                  Nguồn tài liệu: <strong>{previewItem.sourceDoc}</strong>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                shape="pill"
                onClick={() => setPreviewItem(null)}
              >
                Đóng Xem Trước
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
