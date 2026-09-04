/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TEACHER SETTINGS & AI EXAM WORD PARSER + SVG DIAGRAM GENERATOR
 * Step 1: Account Management (Display Name & Password Change)
 * Step 2: Client-side Word (.docx) Parsing with Mammoth
 * Step 3: AI Processing with Gemini for Math LaTeX & pure SVG Code
 * Step 4: Live Exam Preview & KaTeX Math + Responsive SVG Rendering
 */

import React, { useState, useRef, useEffect } from 'react';
import mammoth from 'mammoth';
import { useToast } from '../../context/ToastContext';
import { TeacherService } from '../../services/teacherService';
import { TeacherAuthService } from '../../services/teacherAuthService';
import { useTeacherStore } from '../../stores/useTeacherStore';
import { useExamStore, ExamQuestionItem } from '../../stores/useExamStore';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { MathFormula, MathText } from '../common/MathFormula';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Lock,
  FileText,
  UploadCloud,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Copy,
  PlusCircle,
  Printer,
  Trash2,
  FileCode,
  Layers,
  ArrowRight,
  RefreshCw,
  FolderPlus,
  HelpCircle,
  FileCheck2,
  FileUp,
  Download,
  Send,
  GraduationCap
} from 'lucide-react';

import { TeacherProfileModal } from './TeacherProfileModal';
import { SystemHealthCheckModal } from './SystemHealthCheckModal';
import { ShieldCheck, Activity } from 'lucide-react';

export interface ExamQuestionAI {
  id: string;
  questionText: string;
  latexFormula: string;
  svgCode: string | null;
  steps: string[];
  finalAnswer: string;
}

const SAMPLE_MATHTYPE_TEXT = `ĐỀ ÔN THI TUYỂN SINH LỚP 10 THPT - CHUYÊN ĐỀ HÌNH HỌC KHÔNG GIAN
Trường THCS Chu Văn An - Năm học 2025 - 2026

Câu 1 (2.0 điểm): Một hộp sữa bột hình trụ có bán kính đáy r = 5 cm và chiều cao h = 18 cm. 
MathType_Equation_1: [S_xq = 2*pi*r*h, V = pi*r^2*h]
Hãy tính diện tích xung quanh của vỏ hộp sữa và thể tích lượng sữa bột chứa được tối đa bên trong hộp (lấy pi = 3.14).

Câu 2 (2.0 điểm): Một chiếc nón bài thơ xứ Huế có đường kính đáy d = 40 cm (bán kính r = 20 cm) và chiều cao h = 15 cm. 
MathType_Equation_2: [l = sqrt(h^2 + r^2), S_xq = pi*r*l]
a) Tính độ dài đường sinh l của chiếc nón lá.
b) Tính diện tích lá cọ cần dùng để khâu xung quanh thân nón (làm tròn đến hàng đơn vị).

Câu 3 (2.0 điểm): Một quả bóng bàn có dạng hình cầu với đường kính d = 40 mm (bán kính R = 20 mm = 2 cm).
MathType_Equation_3: [S = 4*pi*R^2, V = (4/3)*pi*R^3]
Tính diện tích bề mặt của quả bóng bàn và thể tích khối cầu (lấy pi = 3.14).`;

export const TeacherSettings: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  // Active section
  const [activeSection, setActiveSection] = useState<'account' | 'exam-generator'>('account');

  // ----------------------------------------------------
  // BƯỚC 1: QUẢN LÝ TÀI KHOẢN (ACCOUNT SETTINGS)
  // ----------------------------------------------------
  const { profile, teacherName, schoolName, department, specialization, avatarInitials, updateTeacherProfile } = useTeacherStore();
  const [fullName, setFullName] = useState(profile.fullName || 'Trần Ngọc Hiếu');
  const [title, setTitle] = useState(profile.title || 'ThS.');
  const [school, setSchool] = useState(profile.schoolName || 'Trường Phổ Thông Thực Hành Sư Phạm');
  const [dept, setDept] = useState(profile.department || 'Toán');
  const [spec, setSpec] = useState(profile.specialization || 'Hình học không gian (Trụ - Nón - Cầu)');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isHealthCheckOpen, setIsHealthCheckOpen] = useState(false);

  useEffect(() => {
    setFullName(profile.fullName || '');
    setTitle(profile.title || 'ThS.');
    setSchool(profile.schoolName || '');
    setDept(profile.department || 'Toán');
    setSpec(profile.specialization || 'Hình học không gian (Trụ - Nón - Cầu)');
  }, [profile]);

  // Password change states
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !school.trim()) {
      showError('Họ tên và Tên trường không được để trống!');
      return;
    }

    if (!dept.trim()) {
      showError('Vui lòng nhập Tổ / Bộ môn giảng dạy!');
      return;
    }

    setIsSavingProfile(true);
    // 1. Update Zustand store
    const updated = updateTeacherProfile({
      fullName: fullName.trim(),
      title: title.trim(),
      schoolName: school.trim(),
      department: dept.trim(),
      specialization: spec.trim(),
    });

    // 2. Update TeacherService for compatibility
    TeacherService.updateDetailedProfile(updated);
    TeacherService.updateTeacherProfile({
      fullName: `${updated.title ? updated.title + ' ' : ''}${updated.fullName}`,
      school: updated.schoolName,
      subject: `${updated.department} (Toán 9)`,
      bio: `Giáo viên bộ môn ${updated.department} - Chuyên đề ${updated.specialization}`
    });

    setTimeout(() => {
      setIsSavingProfile(false);
      showSuccess('✅ Đã cập nhật hồ sơ giáo viên thành công!');
    }, 150);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!oldPassword.trim()) {
      showError('Vui lòng nhập mật khẩu hiện tại!');
      return;
    }

    if (newPassword.length < 6) {
      showWarning('Mật khẩu mới phải có ít nhất 6 ký tự!');
      return;
    }

    if (newPassword !== confirmPassword) {
      showError('Xác nhận mật khẩu mới không khớp với mật khẩu mới!');
      return;
    }

    if (newPassword === oldPassword) {
      showWarning('Mật khẩu mới không được trùng với mật khẩu cũ!');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const res = await TeacherAuthService.changePassword(oldPassword, newPassword);
      if (res.success) {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        showSuccess('Đổi mật khẩu thành công! Mật khẩu mới đã được cập nhật.');
      } else {
        showError(res.error || 'Mật khẩu hiện tại không chính xác!');
      }
    } catch {
      showError('Lỗi cập nhật mật khẩu. Vui lòng thử lại.');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // ----------------------------------------------------
  // BƯỚC 2 & 3 & 4: WORD PARSER + GEMINI AI + SVG PREVIEW
  // ----------------------------------------------------
  const [rawWordText, setRawWordText] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isParsingWord, setIsParsingWord] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiQuestions, setAiQuestions] = useState<ExamQuestionAI[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle client-side Word parsing via Mammoth
  const processWordFile = async (file: File) => {
    if (!file.name.endsWith('.docx')) {
      showError('Vui lòng chọn file định dạng Word (.docx)!');
      return;
    }

    setIsParsingWord(true);
    setUploadedFileName(file.name);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const extractedText = result.value || '';

      if (!extractedText.trim()) {
        showWarning('Không tìm thấy nội dung văn bản trong file Word được tải lên.');
      } else {
        setRawWordText(extractedText);
        showSuccess(`Trích xuất thành công nội dung từ file ${file.name}!`);
      }
    } catch (err: any) {
      console.error('Mammoth parsing error:', err);
      showError(`Lỗi đọc file Word: ${err.message || 'Không thể trích xuất'}`);
    } finally {
      setIsParsingWord(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processWordFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processWordFile(file);
    }
  };

  const handleLoadSampleText = () => {
    setRawWordText(SAMPLE_MATHTYPE_TEXT);
    setUploadedFileName('De_Thi_Vao_10_Chuyen_De_Hinh_Hoc.docx');
    showInfo('Đã tải văn bản đề thi mẫu chứa công thức MathType!');
  };

  // Submit text to Gemini API endpoint
  const handleGenerateExamAI = async () => {
    if (!rawWordText.trim()) {
      showWarning('Vui lòng tải lên file Word hoặc dán nội dung đề thi vào ô văn bản!');
      return;
    }

    setIsGeneratingAI(true);

    try {
      const response = await fetch('/api/generate-exam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: rawWordText })
      });

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();
      if (data.questions && Array.isArray(data.questions)) {
        setAiQuestions(data.questions);
        showSuccess(`AI đã bóc tách thành công ${data.questions.length} câu hỏi và vẽ hình SVG chuẩn xác!`);
        // Scroll to preview
        setTimeout(() => {
          document.getElementById('exam-preview-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        throw new Error('Dữ liệu trả về không đúng cấu trúc danh sách câu hỏi');
      }
    } catch (err: any) {
      console.error('AI Exam Generation error:', err);
      showError('Lỗi xử lý đề thi bằng AI. Vui lòng kiểm tra lại nội dung.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Add a question to Teacher Question Bank
  const handleAddToQuestionBank = (item: ExamQuestionAI) => {
    try {
      const shape = item.questionText.toLowerCase().includes('nón')
        ? 'cone'
        : item.questionText.toLowerCase().includes('cầu')
        ? 'sphere'
        : 'cylinder';

      TeacherService.addQuestionToBank({
        id: `ai-exam-q-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        shapeId: shape,
        lessonId: shape === 'cone' ? 'lesson-cone-01' : shape === 'sphere' ? 'lesson-sphere-01' : 'lesson-cyl-01',
        type: 'multiple_choice',
        title: `Đề thi vào 10: ${item.questionText.slice(0, 45)}...`,
        question: item.questionText,
        latexEquation: item.latexFormula,
        options: [
          item.finalAnswer,
          'Đáp án B (Tự luận)',
          'Đáp án C (Tự luận)',
          'Đáp án D (Tự luận)'
        ],
        correctOptionIndex: 0,
        hint: item.latexFormula || 'Áp dụng công thức hình học không gian',
        explanation: item.steps ? item.steps.join('\n\n') : 'Lời giải chi tiết từng bước.',
        pointsXp: 25,
        difficulty: 'medium',
        tags: ['ThiVao10', 'AI-Generator', shape]
      });
      showSuccess('Đã lưu câu hỏi vào Ngân hàng đề thi giáo viên!');
    } catch (err: any) {
      showError('Không thể thêm câu hỏi: ' + (err?.message || ''));
    }
  };

  const { publishExamQuestions } = useExamStore();

  const handlePublishExamForStudents = () => {
    if (aiQuestions.length === 0) {
      showWarning('Vui lòng tạo hoặc phân tích câu hỏi trước khi phát hành đề thi!');
      return;
    }

    const formattedQuestions: ExamQuestionItem[] = aiQuestions.map((q, idx) => {
      // Create reasonable multiple choice distractors if needed
      const opts = [
        q.finalAnswer || 'Đáp số A',
        'Phương án B (Tính sai bán kính đáy r)',
        'Phương án C (Nhầm công thức thể tích)',
        'Phương án D (Tính thiếu đường sinh l)'
      ];

      return {
        id: q.id || `exam-pub-${Date.now()}-${idx}`,
        questionText: q.questionText,
        latexFormula: q.latexFormula,
        svgCode: q.svgCode,
        options: opts,
        correctAnswer: q.finalAnswer || 'Đáp số chính xác',
        finalAnswer: q.finalAnswer || '',
        stepByStepSolution: q.steps && q.steps.length > 0 ? q.steps : ['Bước 1: Áp dụng công thức chuẩn', 'Bước 2: Thay số và rút gọn kết quả'],
        topic: q.questionText.toLowerCase().includes('nón')
          ? 'Hình Nón'
          : q.questionText.toLowerCase().includes('cầu')
          ? 'Hình Cầu'
          : 'Hình Trụ',
        difficulty: 'medium',
        publishedAt: new Date().toISOString()
      };
    });

    const examTitle = uploadedFileName
      ? `Đề Ôn Thi Vào 10: ${uploadedFileName.replace('.docx', '')}`
      : 'Bộ Đề Ôn Thi Tuyển Sinh Vào Lớp 10 (Chuyên Đề Hình Học)';

    publishExamQuestions(formattedQuestions, examTitle);
    showSuccess(`Đã phát hành thành công ${formattedQuestions.length} câu hỏi cho học sinh! Học sinh có thể làm bài ngay tại mục "Ôn thi vào 10".`);
  };

  const handleSaveAllToBank = () => {
    if (aiQuestions.length === 0) return;
    aiQuestions.forEach((q) => handleAddToQuestionBank(q));
    showSuccess(`Đã thêm toàn bộ ${aiQuestions.length} câu hỏi vào Ngân hàng đề thi!`);
  };

  return (
    <div id="teacher-settings-container" className="space-y-6">
      {/* Top Selector Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            id="tab-btn-account"
            type="button"
            onClick={() => setActiveSection('account')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeSection === 'account'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Quản Lý Tài Khoản</span>
          </button>

          <button
            id="tab-btn-exam-ai"
            type="button"
            onClick={() => setActiveSection('exam-generator')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeSection === 'exam-generator'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Ôn Thi Vào 10 (Sinh Đề Tự Động & Vẽ SVG)</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            id="btn-teacher-system-health-check"
            variant="outline"
            size="sm"
            shape="pill"
            onClick={() => setIsHealthCheckOpen(true)}
            leftIcon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
            className="text-xs font-bold border-emerald-300 text-emerald-800 hover:bg-emerald-50 bg-emerald-50/50"
          >
            Kiểm Tra Hệ Thống
          </Button>

          <div className="text-[11px] text-slate-400 font-medium px-2 hidden sm:block">
            Bản quyền sư phạm Toán 9 • AI Geometry Lab
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: QUẢN LÝ TÀI KHOẢN (ACCOUNT SETTINGS)                          */}
      {/* ========================================================================= */}
      {activeSection === 'account' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Form 1: Đổi thông tin cá nhân & hiển thị */}
          <Card className="space-y-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  Thông tin cá nhân & Hiển thị
                </CardTitle>
                <p className="text-xs text-slate-500">Cập nhật họ tên hiển thị và đơn vị trường công tác</p>
              </div>
            </CardHeader>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5 sm:col-span-1">
                  <label
                    htmlFor="teacher-title-input"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                  >
                    Học vị / Chức danh
                  </label>
                  <input
                    id="teacher-title-input"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ví dụ: Th.s, Thầy, Cô"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all font-sans bg-white shadow-2xs"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label
                    htmlFor="teacher-name-input"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                  >
                    Họ và tên giáo viên *
                  </label>
                  <input
                    id="teacher-name-input"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ví dụ: Trần Ngọc Hiếu"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all font-sans bg-white shadow-2xs"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="teacher-school-input"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                >
                  Trường công tác *
                </label>
                <input
                  id="teacher-school-input"
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="Ví dụ: Trường Phổ Thông Thực Hành Sư Phạm"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all font-sans bg-white shadow-2xs"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label
                    htmlFor="teacher-dept-input"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                  >
                    Tổ / Bộ môn *
                  </label>
                  <input
                    id="teacher-dept-input"
                    type="text"
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    placeholder="Ví dụ: Toán"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all font-sans bg-white shadow-2xs"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="teacher-spec-input"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                  >
                    Chuyên đề phụ trách
                  </label>
                  <input
                    id="teacher-spec-input"
                    type="text"
                    value={spec}
                    onChange={(e) => setSpec(e.target.value)}
                    placeholder="Ví dụ: Hình học không gian (Trụ - Nón - Cầu)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all font-sans bg-white shadow-2xs"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl text-blue-600 hover:bg-blue-50 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-blue-200"
                >
                  <span>Mở Trình Chỉnh Sửa Hồ Sơ (Live Preview)</span>
                </button>

                <button
                  id="btn-save-teacher-profile"
                  type="submit"
                  disabled={isSavingProfile}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSavingProfile ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Đang lưu...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Lưu Thông Tin</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </Card>

          {/* Form 2: Đổi mật khẩu */}
          <Card className="space-y-5 bg-white border border-slate-200">
            <CardHeader className="pb-3 border-b border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  Đổi Mật Khẩu Quản Trị
                </CardTitle>
                <p className="text-xs text-slate-500">Mật khẩu dùng để truy cập Route ẩn /teacher</p>
              </div>
            </CardHeader>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              {/* Mật khẩu cũ */}
              <div className="space-y-1.5">
                <label
                  htmlFor="old-password-input"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                >
                  Mật khẩu hiện tại *
                </label>
                <div className="relative">
                  <input
                    id="old-password-input"
                    type={showOldPass ? 'text' : 'password'}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Nhập mật khẩu hiện tại..."
                    className="w-full px-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-sans"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPass(!showOldPass)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showOldPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Mật khẩu mới */}
              <div className="space-y-1.5">
                <label
                  htmlFor="new-password-input"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                >
                  Mật khẩu mới * (Tối thiểu 6 ký tự)
                </label>
                <div className="relative">
                  <input
                    id="new-password-input"
                    type={showNewPass ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới..."
                    className="w-full px-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-sans"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Xác nhận mật khẩu mới */}
              <div className="space-y-1.5">
                <label
                  htmlFor="confirm-password-input"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                >
                  Xác nhận mật khẩu mới *
                </label>
                <div className="relative">
                  <input
                    id="confirm-password-input"
                    type={showConfirmPass ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới..."
                    className="w-full px-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-sans"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  id="btn-update-password"
                  type="submit"
                  variant="primary"
                  size="sm"
                  shape="pill"
                  disabled={isUpdatingPassword}
                  leftIcon={isUpdatingPassword ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
                >
                  {isUpdatingPassword ? 'Đang cập nhật...' : 'Cập Nhật Mật Khẩu'}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: ÔN THI VÀO 10 (WORD PARSER + GEMINI AI + SVG PREVIEW)         */}
      {/* ========================================================================= */}
      {activeSection === 'exam-generator' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300 text-2xl font-black shrink-0">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 text-[10px] font-bold uppercase tracking-wider">
                    Công Nghệ AI Gemini 2.5
                  </span>
                  <span className="text-xs text-purple-200">Trích xuất Client-side Mammoth</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black mt-1">
                  Xử Lý Đề Thi Word & Tự Động Vẽ Hình SVG
                </h2>
                <p className="text-xs sm:text-sm text-purple-200/90 max-w-2xl mt-0.5">
                  Tải lên file Word (.docx) chứa rác MathType. AI sẽ phân loại câu hỏi, chuẩn hóa LaTeX KaTeX, lập lời giải từng bước và tự động sinh mã SVG hình học sắc nét.
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              shape="pill"
              onClick={handleLoadSampleText}
              leftIcon={<FileCode className="w-4 h-4 text-amber-300" />}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-bold text-xs shrink-0 self-start md:self-center"
            >
              Nạp Đề Mẫu MathType
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Col: Upload & Raw Textarea (Step 2) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Drag & Drop Card */}
              <Card className="bg-white border-2 border-dashed border-indigo-200 hover:border-indigo-400 transition-colors p-5">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center text-center p-4 rounded-2xl transition-colors cursor-pointer ${
                    isDragOver ? 'bg-indigo-50/80 border border-indigo-300' : 'bg-slate-50/60'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2 shadow-xs">
                    {isParsingWord ? (
                      <RefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
                    ) : (
                      <UploadCloud className="w-6 h-6" />
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-800">
                    {isParsingWord
                      ? 'Đang đọc cấu trúc file Word...'
                      : 'Kéo thả file Word (.docx) vào đây'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Hoặc bấm để chọn file từ máy tính (Trích xuất tức thì tại trình duyệt bằng Mammoth)
                  </p>

                  {uploadedFileName && (
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                      <FileCheck2 className="w-3.5 h-3.5" />
                      <span>{uploadedFileName}</span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Textarea for review and edits */}
              <Card className="bg-white border border-slate-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <CardTitle className="text-sm font-bold">Văn Bản Thô (Trích Xuất Từ Word)</CardTitle>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {rawWordText.length} ký tự
                  </span>
                </div>

                <div className="space-y-2">
                  <textarea
                    id="raw-word-textarea"
                    rows={12}
                    value={rawWordText}
                    onChange={(e) => setRawWordText(e.target.value)}
                    placeholder="Dán hoặc chỉnh sửa văn bản đề thi chứa MathType tại đây..."
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono leading-relaxed bg-[#FAF9F5]"
                  />

                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setRawWordText('');
                        setUploadedFileName(null);
                        setAiQuestions([]);
                      }}
                      className="text-[11px] font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Xóa trắng</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleLoadSampleText}
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                    >
                      <FileCode className="w-3 h-3" />
                      <span>Dùng đề mẫu</span>
                    </button>
                  </div>
                </div>

                {/* Main Action Button (Step 2.4 & 3) */}
                <div className="pt-2">
                  <Button
                    id="btn-trigger-ai-exam"
                    type="button"
                    variant="primary"
                    shape="pill"
                    fullWidth
                    size="md"
                    disabled={isGeneratingAI || !rawWordText.trim()}
                    onClick={handleGenerateExamAI}
                    leftIcon={
                      isGeneratingAI ? (
                        <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-amber-300" />
                      )
                    }
                    className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold text-sm shadow-md cursor-pointer"
                  >
                    {isGeneratingAI ? 'AI Đang Xử Lý & Vẽ Hình SVG...' : '✨ Gửi AI Xử Lý & Vẽ Hình'}
                  </Button>
                </div>
              </Card>
            </div>

            {/* Right Col: Live Preview & Math Rendering (Step 4) */}
            <div id="exam-preview-section" className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Xem Trước Đề Thi Chuẩn Hóa ({aiQuestions.length} câu)
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Công thức toán KaTeX + Hình vẽ không gian SVG độ phân giải cao
                    </p>
                  </div>
                </div>

                {aiQuestions.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      id="btn-publish-exam-students"
                      variant="primary"
                      size="xs"
                      shape="pill"
                      leftIcon={<Send className="w-3.5 h-3.5" />}
                      onClick={handlePublishExamForStudents}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow-xs"
                    >
                      Phát hành đề thi cho Học sinh
                    </Button>
                    <Button
                      variant="outline"
                      size="xs"
                      shape="pill"
                      leftIcon={<FolderPlus className="w-3.5 h-3.5 text-blue-600" />}
                      onClick={handleSaveAllToBank}
                      className="border-slate-200 text-slate-700 font-bold"
                    >
                      Lưu Vào Ngân Hàng
                    </Button>
                    <Button
                      variant="outline"
                      size="xs"
                      shape="pill"
                      leftIcon={<Printer className="w-3.5 h-3.5 text-slate-600" />}
                      onClick={() => window.print()}
                      className="border-slate-200 text-slate-700 font-bold hidden sm:inline-flex"
                    >
                      In Đề
                    </Button>
                  </div>
                )}
              </div>

              {/* Questions List */}
              {isGeneratingAI ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto animate-bounce shadow-inner">
                    <Sparkles className="w-8 h-8 text-purple-600 animate-spin" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900">
                      Gemini đang bóc tách MathType và vẽ hình SVG...
                    </h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Đang phân loại độ khó, chuyển đổi công thức sang chuẩn LaTeX $...$ và thiết kế đồ họa hình học không gian.
                    </p>
                  </div>
                </div>
              ) : aiQuestions.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Layers className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-700">Chưa có dữ liệu xem trước</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Hãy kéo thả file Word hoặc bấm <span className="font-bold text-indigo-600">Nạp Đề Mẫu</span> rồi bấm nút <span className="font-bold text-purple-600">✨ Gửi AI Xử Lý</span> để tạo đề thi hoàn chỉnh.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {aiQuestions.map((item, index) => (
                    <Card
                      key={item.id || index}
                      className="bg-white border border-slate-200/90 shadow-2xs space-y-4 p-5 sm:p-6 overflow-hidden relative"
                    >
                      {/* Question Top Info */}
                      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-xl bg-blue-600 text-white font-black text-xs shadow-2xs">
                            CÂU {index + 1}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">ID: {item.id}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="xs"
                            shape="pill"
                            leftIcon={<PlusCircle className="w-3.5 h-3.5 text-blue-600" />}
                            onClick={() => handleAddToQuestionBank(item)}
                            className="text-slate-700 font-bold border-slate-200"
                          >
                            + Thêm vào Ngân Hàng
                          </Button>
                        </div>
                      </div>

                      {/* Question Text (LaTeX KaTeX rendered with standard sans-serif typography) */}
                      <div className="text-sm sm:text-base font-sans font-normal text-[#3A302B] leading-relaxed text-left">
                        <MathText text={item.questionText} />
                      </div>

                      {/* Formula Summary Tag if present */}
                      {item.latexFormula && (
                        <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center gap-2 text-xs">
                          <span className="font-bold text-blue-900 shrink-0">Công thức trọng tâm:</span>
                          <MathFormula formula={`$${item.latexFormula}$`} className="text-blue-800 font-bold" />
                        </div>
                      )}

                      {/* SVG Code Rendering Area (Step 4 requirement) */}
                      {item.svgCode && (
                        <div className="space-y-1.5 pt-2">
                          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                            <span>📐 Hình vẽ minh họa hình học (SVG):</span>
                          </div>
                          {/* Centered responsive SVG Box */}
                          <div className="max-w-md mx-auto aspect-square p-4 bg-[#FFFDF8] rounded-2xl border border-slate-200 shadow-inner flex items-center justify-center overflow-hidden">
                            <div
                              className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-72"
                              dangerouslySetInnerHTML={{ __html: item.svgCode }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Detailed Step-by-Step Solution */}
                      {item.steps && item.steps.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-slate-100 font-sans">
                          <h5 className="text-xs font-bold text-[#3A302B] uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Lời giải chi tiết từng bước:</span>
                          </h5>
                          <div className="space-y-2 pl-2">
                            {item.steps.map((step, sIdx) => (
                              <div
                                key={sIdx}
                                className="text-xs sm:text-sm text-[#3A302B] bg-slate-50/80 p-3 rounded-xl border border-slate-100 font-sans font-normal leading-[1.7]"
                              >
                                <MathFormula formula={step} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Final Answer */}
                      {item.finalAnswer && (
                        <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-2 text-xs sm:text-sm font-sans">
                          <span className="font-bold text-emerald-900 shrink-0">Đáp số:</span>
                          <span className="font-semibold text-emerald-800 font-sans">
                            <MathFormula formula={item.finalAnswer} />
                          </span>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Teacher Profile Modal for Live Preview & Editing */}
      <TeacherProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* System Health Check & Diagnostics Modal */}
      <SystemHealthCheckModal
        isOpen={isHealthCheckOpen}
        onClose={() => setIsHealthCheckOpen(false)}
      />
    </div>
  );
};

export default TeacherSettings;
