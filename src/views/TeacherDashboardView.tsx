/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - TEACHER DASHBOARD VIEW
 * Responsive UI with Navy - Cream color scheme, Profile Header, Horizontal Navigation Tabs,
 * Complete Class/Student CRUD, floating "Hỏi AI Hình Học" assistant, and AI Exam Generator.
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { TeacherAuthService } from '../services/teacherAuthService';
import { TeacherService } from '../services/teacherService';
import { useTeacherStore } from '../stores/useTeacherStore';
import {
  SchoolClass,
  Student,
  Assignment,
  AssignmentSubmission,
  Exercise,
  ShapeType
} from '../types/dataArchitecture';
import { ALL_LESSONS } from '../data/lessonsData';
import { MathText } from '../components/common/MathFormula';

// Tabs Components
import { TeacherOverviewTab } from '../components/teacher/TeacherOverviewTab';
import { TeacherClassesTab } from '../components/teacher/TeacherClassesTab';
import { TeacherStudentsTab } from '../components/teacher/TeacherStudentsTab';
import { TeacherLessonsTab } from '../components/teacher/TeacherLessonsTab';
import { TeacherQuestionBankTab } from '../components/teacher/TeacherQuestionBankTab';
import { TeacherAssignmentsTab } from '../components/teacher/TeacherAssignmentsTab';
import { TeacherResultsTab } from '../components/teacher/TeacherResultsTab';
import { TeacherCommonErrorsTab } from '../components/teacher/TeacherCommonErrorsTab';
import { TeacherReportsTab } from '../components/teacher/TeacherReportsTab';
import { TeacherSettings } from '../components/teacher/TeacherSettings';
import { ExamPrepManager } from '../components/teacher/ExamPrepManager';
import { TeacherProfileModal } from '../components/teacher/TeacherProfileModal';
import { TeacherSpatialProfileTab } from '../components/teacher/TeacherSpatialProfileTab';
import { TeacherVideosTab } from '../components/teacher/TeacherVideosTab';
import { ClassKnowledgeHeatmap } from '../components/teacher/ClassKnowledgeHeatmap';
import { CertificateModal } from '../components/student/CertificateModal';

import {
  LayoutDashboard,
  School,
  Users,
  BookOpen,
  HelpCircle,
  FileCheck,
  Award,
  AlertTriangle,
  TrendingUp,
  ArrowRightLeft,
  LogOut,
  Settings,
  Search,
  Bell,
  Sparkles,
  Bot,
  MessageSquare,
  Send,
  X,
  GraduationCap,
  Edit3,
  UserCheck,
  Brain,
  PlusCircle,
  UserPlus,
  Film,
  Flame,
  Eye
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';

export const TeacherDashboardView: React.FC = () => {
  const { switchRole, navigateTo } = useApp();
  const { enterStudentPreview } = useAuth();
  const { showSuccess, showInfo } = useToast();

  // State
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);
  const [questionBank, setQuestionBank] = useState<Exercise[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('cls-9a2');
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>('all');
  const [openCreateAssignmentModal, setOpenCreateAssignmentModal] = useState(false);
  const [certificateStudent, setCertificateStudent] = useState<{ name: string; id: string; score: number } | null>(null);

  // Global search & AI Assistant Floating Modal
  const [globalSearch, setGlobalSearch] = useState('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiMessages, setAiMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: 'Xin chào Thầy/Cô! Tôi là Trợ lý AI Hình Học 9 (Trụ - Nón - Cầu). Thầy/Cô cần hỗ trợ soạn đề bài, gợi ý phương pháp giải hay phân tích lỗi sai của học sinh?',
      time: 'Vừa xong'
    }
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  const { profile, teacherName, schoolName, department, specialization, avatarInitials } = useTeacherStore();

  const getAvatarInitial = (name: string): string => {
    if (!name) return 'H';
    const parts = name.trim().split(/\s+/);
    const last = parts[parts.length - 1];
    return last ? last.charAt(0).toUpperCase() : name.charAt(0).toUpperCase();
  };

  // Load initial data
  const loadData = () => {
    setClasses(TeacherService.getClasses());
    setStudents(TeacherService.getStudents());
    setAssignments(TeacherService.getAssignments());
    setSubmissions(TeacherService.getSubmissions());
    setQuestionBank(TeacherService.getQuestionBank());
  };

  const { teacherSession, isTeacherAuthenticated, teacherUser, logoutTeacher } = useAuth();

  useEffect(() => {
    // If still checking session on first mount, wait
    if (teacherSession.status === 'AUTH_LOADING') return;

    // Check teacher authentication from teacherSession or TeacherAuthService
    const isTeacher = isTeacherAuthenticated || TeacherAuthService.isAuthenticated();

    if (!isTeacher) {
      navigateTo('/teacher');
      return;
    }
    loadData();
  }, [teacherSession.status, isTeacherAuthenticated]);

  const handleLogout = () => {
    logoutTeacher();
    showInfo('Đã đăng xuất khỏi phiên quản trị giáo viên.');
    navigateTo('/teacher');
  };

  // Class CRUD Handlers
  const handleCreateClass = (classData: any) => {
    TeacherService.createClass(classData);
    loadData();
  };

  const handleUpdateClass = (classId: string, updates: Partial<SchoolClass>) => {
    TeacherService.updateClass(classId, updates);
    loadData();
  };

  const handleDeleteClass = (classId: string) => {
    TeacherService.deleteClass(classId);
    loadData();
  };

  // Student CRUD Handlers
  const handleCreateStudent = (studentData: Partial<Student>) => {
    TeacherService.createStudent(studentData);
    loadData();
  };

  const handleUpdateStudent = (studentId: string, updates: Partial<Student>) => {
    TeacherService.updateStudent(studentId, updates);
    loadData();
  };

  const handleDeleteStudent = (studentId: string) => {
    TeacherService.deleteStudent(studentId);
    loadData();
  };

  // Assignment & Question Handlers
  const handleCreateAssignment = (assignmentData: any) => {
    TeacherService.createAssignment(assignmentData);
    loadData();
  };

  const handleUpdateAssignmentStatus = (id: string, status: any) => {
    TeacherService.updateAssignmentStatus(id, status);
    loadData();
  };

  const handleDeleteAssignment = (id: string) => {
    TeacherService.deleteAssignment(id);
    loadData();
  };

  const handleAddQuestion = (question: Exercise) => {
    TeacherService.addQuestionToBank(question);
    loadData();
  };

  const handleUpdateFeedback = (submissionId: string, feedback: string) => {
    TeacherService.updateSubmissionFeedback(submissionId, feedback);
    loadData();
  };

  const handleOpenLive3D = (shape: ShapeType) => {
    navigateTo('/explore');
  };

  const handleSelectClassForDetail = (classId: string) => {
    setSelectedClassId(classId);
    setActiveTab('students');
  };

  const handleViewResultsForAssignment = (assignmentId: string) => {
    setSelectedAssignmentId(assignmentId);
    setActiveTab('results');
  };

  // AI Chat Assistant
  const handleSendAiQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim() || isAiTyping) return;

    const userText = aiQuestion.trim();
    setAiMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setAiQuestion('');
    setIsAiTyping(true);

    // AI Response generation
    setTimeout(() => {
      let reply = 'Cảm ơn Thầy/Cô. Để hỗ trợ học sinh nắm chắc kiến thức phần này:';
      const lower = userText.toLowerCase();

      if (lower.includes('trụ') || lower.includes('cylinder')) {
        reply = `📌 **Về Hình Trụ:**\n- Diện tích xung quanh: $S_{xq} = 2\\pi r h$\n- Diện tích toàn phần: $S_{tp} = 2\\pi r h + 2\\pi r^2$\n- Thể tích: $V = \\pi r^2 h$\n💡 *Lỗi học sinh hay gặp:* Quên nhân 2 ở đáy khi tính $S_{tp}$, hoặc nhầm đường kính $d$ là bán kính $r$.`;
      } else if (lower.includes('nón') || lower.includes('cone')) {
        reply = `📌 **Về Hình Nón:**\n- Mối quan hệ đường sinh: $l = \\sqrt{h^2 + r^2}$\n- Diện tích xung quanh: $S_{xq} = \\pi r l$\n- Thể tích: $V = \\frac{1}{3}\\pi r^2 h$\n💡 *Lỗi học sinh hay gặp:* Dùng nhầm $h$ thay vì $l$ trong công thức $S_{xq}$, hoặc quên hệ số $1/3$ trong thể tích.`;
      } else if (lower.includes('cầu') || lower.includes('sphere')) {
        reply = `📌 **Về Hình Cầu:**\n- Diện tích mặt cầu: $S = 4\\pi R^2 = \\pi d^2$\n- Thể tích khối cầu: $V = \\frac{4}{3}\\pi R^3$\n💡 *Lỗi học sinh hay gặp:* Quên lũy thừa bậc 3 của bán kính trong công thức thể tích, hoặc nhầm hệ số 4/3 thành 1/3.`;
      } else if (lower.includes('đề thi') || lower.includes('word') || lower.includes('soạn')) {
        reply = `Thầy/Cô có thể vào Tab **"Cài Đặt & AI Đề Thi"** để tải lên file Word (.docx) đề thi hoặc dán văn bản bài toán. Hệ thống AI sẽ tự động phân tích câu hỏi, trích xuất đáp án và sinh đồ họa hình học SVG chất lượng cao!`;
      } else {
        reply = `Tôi đã ghi nhận câu hỏi: "${userText}".\n\nThầy/Cô có thể sử dụng các công cụ có sẵn trong Dashboard:\n1. **Giao nhiệm vụ:** Tạo bài kiểm tra trực tuyến có giới hạn thời gian.\n2. **AI Đề Thi:** Nhập đề từ file Word và sinh hình minh họa trực quan.\n3. **Chẩn đoán lỗi:** Xem phân tích sai sót phổ biến của các em trong lớp.`;
      }

      setAiMessages((prev) => [
        ...prev,
        { sender: 'ai', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      setIsAiTyping(false);
    }, 900);
  };

  // Nav tabs list
  const TABS = [
    { id: 'overview', label: 'Tổng Quan', icon: LayoutDashboard },
    { id: 'heatmap', label: 'Bản Đồ Nhiệt', icon: Flame },
    { id: 'videos', label: 'Video Lý Thuyết', icon: Film },
    { id: 'students', label: 'Học Sinh', icon: Users },
    { id: 'classes', label: 'Lớp', icon: School },
    { id: 'results', label: 'Tiến Độ', icon: Award },
    { id: 'errors', label: 'Lỗi', icon: AlertTriangle },
    { id: 'spatial-profile', label: 'Spatial Profile', icon: Brain },
    { id: 'reports', label: 'Báo Cáo', icon: TrendingUp },
    { id: 'settings', label: 'Cài Đặt', icon: Settings }
  ];

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto px-4 sm:px-6 relative">
      {/* 1. TOP HEADER (Search & Notifications & Quick Info) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Tìm kiếm lớp học, học sinh, bài tập hoặc giáo án..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-2xl shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
          />
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-xs font-bold text-slate-700">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Năm học: 2025 - 2026</span>
          </div>

          <button
            onClick={() => showInfo('Không có thông báo mới.')}
            className="p-2 bg-white border border-slate-200 rounded-2xl shadow-2xs text-slate-500 hover:text-blue-600 transition-colors relative cursor-pointer"
            title="Thông báo"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-blue-600 absolute top-1.5 right-1.5"></span>
          </button>
        </div>
      </div>

      {/* 2. PROFILE CARD (Thẻ Profile lớn màu xanh đậm Navy - Hỗ trợ Click để chỉnh sửa Hồ sơ) */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5 border border-blue-800/40">
        <div
          id="btn-open-teacher-profile"
          onClick={() => setIsProfileModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setIsProfileModalOpen(true)}
          className="flex items-center gap-4 group cursor-pointer hover:opacity-95 transition-all p-1 -m-1 rounded-2xl hover:bg-white/5"
          title="Bấm để chỉnh sửa Hồ Sơ Giáo Viên"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/10 group-hover:bg-white/15 backdrop-blur-md border border-white/20 group-hover:border-blue-400/50 flex items-center justify-center text-white text-xl font-black shadow-inner shrink-0 tracking-wider transition-all">
            {avatarInitials || getAvatarInitial(teacherName)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black group-hover:text-blue-200 transition-colors flex items-center gap-2">
                <span>{teacherName}</span>
                <Edit3 className="w-4 h-4 text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30 text-[10px] font-bold">
                Tổ {department || 'Toán'}
              </span>
            </div>
            <p className="text-xs text-blue-200/80 mt-1 font-medium flex items-center gap-1.5 flex-wrap">
              <span>{schoolName}</span>
              <span>•</span>
              <span>{department || 'Toán'}</span>
              <span>•</span>
              <span>{specialization || 'Hình học không gian (Trụ - Nón - Cầu)'}</span>
            </p>
            <div className="mt-2 text-[11px] text-blue-100 bg-white/10 px-2.5 py-0.5 rounded-md inline-flex items-center gap-1.5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Lớp 9A2 • {teacherName} • {schoolName}</span>
            </div>
          </div>
        </div>

        {/* Action switch back to student app & logout */}
        <div className="flex items-center gap-2.5 self-end md:self-center flex-wrap">
          <Button
            id="btn-primary-create-student"
            variant="primary"
            size="sm"
            shape="pill"
            leftIcon={<UserPlus className="w-4 h-4 text-white" />}
            onClick={() => {
              setActiveTab('students');
              showInfo('Chuyển đến màn hình Quản lý Học sinh & Tạo tài khoản.');
            }}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-md border-0 uppercase tracking-wider"
          >
            + TẠO TÀI KHOẢN HỌC SINH
          </Button>

          <Button
            variant="outline"
            size="sm"
            shape="pill"
            leftIcon={<Edit3 className="w-3.5 h-3.5" />}
            onClick={() => setIsProfileModalOpen(true)}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-bold text-xs shadow-xs"
          >
            Hồ Sơ
          </Button>

          <Button
            id="btn-switch-student"
            variant="outline"
            size="sm"
            shape="pill"
            leftIcon={<Eye className="w-4 h-4 text-emerald-300" />}
            onClick={() => {
              enterStudentPreview();
            }}
            className="bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-100 border-emerald-400/40 font-bold text-xs shadow-xs"
            title="Xem trước giao diện học sinh (Bảo toàn quyền Giáo viên)"
          >
            Xem Với Tư Cách Học Sinh
          </Button>

          <Button
            variant="outline"
            size="sm"
            shape="pill"
            leftIcon={<LogOut className="w-4 h-4" />}
            onClick={handleLogout}
            className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border-rose-400/30 font-bold text-xs shadow-xs"
          >
            Đăng Xuất
          </Button>
        </div>
      </div>

      {/* 3. NAVIGATION TABS BAR (Menu cuộn ngang) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-1.5 shadow-2xs overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 min-w-max">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. TAB CONTENT VIEW */}
      <div className="min-h-[500px]">
        {activeTab === 'overview' && (
          <TeacherOverviewTab
            classes={classes}
            selectedClassId={selectedClassId}
            setSelectedClassId={setSelectedClassId}
            students={students}
            assignments={assignments}
            submissions={submissions}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenCreateAssignment={() => {
              setActiveTab('assignments');
              setOpenCreateAssignmentModal(true);
            }}
          />
        )}

        {activeTab === 'heatmap' && (
          <ClassKnowledgeHeatmap
            classes={classes}
            selectedClassId={selectedClassId}
            onAssignRemedial={(studentId, skillId) => {
              showSuccess(`Đã tạo nhiệm vụ củng cố bẫy thi (${skillId}) cho học sinh ${studentId}`);
            }}
          />
        )}

        {activeTab === 'videos' && (
          <TeacherVideosTab />
        )}

        {activeTab === 'classes' && (
          <TeacherClassesTab
            classes={classes}
            students={students}
            onCreateClass={handleCreateClass}
            onUpdateClass={handleUpdateClass}
            onDeleteClass={handleDeleteClass}
            onSelectClassForDetail={handleSelectClassForDetail}
          />
        )}

        {activeTab === 'students' && (
          <TeacherStudentsTab
            students={students}
            classes={classes}
            selectedClassId={selectedClassId}
            setSelectedClassId={setSelectedClassId}
            onCreateStudent={handleCreateStudent}
            onUpdateStudent={handleUpdateStudent}
            onDeleteStudent={handleDeleteStudent}
          />
        )}

        {activeTab === 'lessons' && (
          <TeacherLessonsTab
            lessons={ALL_LESSONS}
            onOpenLive3D={handleOpenLive3D}
          />
        )}

        {activeTab === 'exam-prep' && (
          <ExamPrepManager />
        )}

        {activeTab === 'question-bank' && (
          <TeacherQuestionBankTab
            questions={questionBank}
            onAddQuestion={handleAddQuestion}
          />
        )}

        {activeTab === 'assignments' && (
          <TeacherAssignmentsTab
            assignments={assignments}
            classes={classes}
            questionBank={questionBank}
            selectedClassId={selectedClassId}
            onCreateAssignment={handleCreateAssignment}
            onUpdateStatus={handleUpdateAssignmentStatus}
            onDeleteAssignment={handleDeleteAssignment}
            onViewResults={handleViewResultsForAssignment}
            isOpenCreateModal={openCreateAssignmentModal}
            onCloseCreateModal={() => setOpenCreateAssignmentModal(false)}
          />
        )}

        {activeTab === 'results' && (
          <TeacherResultsTab
            submissions={submissions}
            assignments={assignments}
            classes={classes}
            selectedAssignmentId={selectedAssignmentId}
            setSelectedAssignmentId={setSelectedAssignmentId}
            onUpdateFeedback={handleUpdateFeedback}
          />
        )}

        {activeTab === 'errors' && (
          <TeacherCommonErrorsTab />
        )}

        {activeTab === 'spatial-profile' && (
          <TeacherSpatialProfileTab
            classes={classes}
            students={students}
            selectedClassId={selectedClassId}
            setSelectedClassId={setSelectedClassId}
          />
        )}

        {activeTab === 'reports' && (
          <TeacherReportsTab
            classes={classes}
            selectedClassId={selectedClassId}
            setSelectedClassId={setSelectedClassId}
          />
        )}

        {activeTab === 'settings' && (
          <div className="mt-2 space-y-6">
            <TeacherSettings />
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 5. FLOATING BUTTON "HỎI AI HÌNH HỌC" & INTERACTIVE AI ASSISTANT DRAWER     */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="btn-floating-ai"
          onClick={() => setIsAiModalOpen(!isAiModalOpen)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-bold text-xs shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer border border-white/20"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>Hỏi AI Hình Học</span>
        </button>
      </div>

      {/* AI Assistant Modal */}
      {isAiModalOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[480px] animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h4 className="text-xs font-black">Trợ Lý AI Hình Học 9</h4>
                <span className="text-[10px] text-blue-200">Giải đáp &amp; Phân tích chuyên sâu</span>
              </div>
            </div>
            <button
              onClick={() => setIsAiModalOpen(false)}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick prompt suggestions */}
          <div className="p-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
            <button
              onClick={() => setAiQuestion('Công thức & lỗi sai hình nón?')}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-300 font-medium text-slate-700 whitespace-nowrap cursor-pointer"
            >
              💡 Lỗi sai hình nón
            </button>
            <button
              onClick={() => setAiQuestion('So sánh thể tích trụ và nón')}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-300 font-medium text-slate-700 whitespace-nowrap cursor-pointer"
            >
              📐 Tỷ số thể tích
            </button>
            <button
              onClick={() => setAiQuestion('Cách dùng tính năng AI tạo đề thi Word?')}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-300 font-medium text-slate-700 whitespace-nowrap cursor-pointer"
            >
              📄 Soạn đề thi Word
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs bg-slate-50/50">
            {aiMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl shadow-2xs whitespace-pre-wrap leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <MathText text={msg.text} className="text-white" />
                  ) : (
                    <MathText text={msg.text} />
                  )}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {isAiTyping && (
              <div className="flex items-center gap-1.5 text-slate-400 text-xs p-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-blue-600" />
                <span>AI đang phân tích &amp; soạn câu trả lời...</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendAiQuestion} className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Nhập câu hỏi hình học hoặc yêu cầu AI..."
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              className="flex-1 p-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
            />
            <Button
              type="submit"
              variant="primary"
              size="xs"
              shape="rounded"
              disabled={!aiQuestion.trim() || isAiTyping}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </form>
        </div>
      )}

      {/* 6. TEACHER PROFILE MODAL */}
      <TeacherProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onNavigateToSecurity={() => setActiveTab('settings')}
      />

      {/* 7. CERTIFICATE OF EXCELLENCE MODAL */}
      {certificateStudent && (
        <CertificateModal
          isOpen={!!certificateStudent}
          onClose={() => setCertificateStudent(null)}
          studentName={certificateStudent.name}
          studentId={certificateStudent.id}
          score={certificateStudent.score}
        />
      )}
    </div>
  );
};
