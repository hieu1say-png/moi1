/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * EXAM PREP MANAGER (TEACHER VIEW) - ÔN THI VÀO 10
 * AI-powered Multimodal Exam Generator & Student Assignment Publishing.
 */

import React, { useState, useRef } from 'react';
import mammoth from 'mammoth';
import { useExamStore, ExamQuestionItem } from '../../stores/useExamStore';
import { useTeacherStore } from '../../stores/useTeacherStore';
import { useToast } from '../../context/ToastContext';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { MathFormula, MathText } from '../common/MathFormula';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  UploadCloud,
  FileText,
  Image as ImageIcon,
  Sparkles,
  CheckCircle2,
  Trash2,
  Edit3,
  Layers,
  Send,
  Plus,
  X,
  FileCheck,
  HelpCircle,
  Clock,
  Eye,
  AlertCircle,
  RefreshCw,
  BookOpen,
  Check
} from 'lucide-react';

export const ExamPrepManager: React.FC = () => {
  const { publishedQuestions, activeExamTitle, publishExamQuestions, studentSubmissions } = useExamStore();
  const { teacherName, schoolName } = useTeacherStore();
  const { showSuccess, showError, showInfo } = useToast();

  // Input Method mode: 'upload' | 'manual'
  const [inputMode, setInputMode] = useState<'upload' | 'manual'>('upload');

  // Method 1: File Upload State (.pdf, .docx)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [fileMimeType, setFileMimeType] = useState<string | null>(null);
  const [rawHtmlContent, setRawHtmlContent] = useState<string>('');
  const [extractedImageCount, setExtractedImageCount] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Method 2: Manual Text & Attached Image State (.jpg, .png)
  const [manualText, setManualText] = useState<string>('');
  const [attachedImage, setAttachedImage] = useState<File | null>(null);
  const [attachedImagePreview, setAttachedImagePreview] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  // Exam Title State
  const [examTitle, setExamTitle] = useState<string>('Đề Luyện Thi Tuyển Sinh Vào Lớp 10 - Chuyên Đề Hình Học Không Gian');

  // AI Processing State
  const [isProcessingAI, setIsProcessingAI] = useState<boolean>(false);
  const [aiStepMessage, setAiStepMessage] = useState<string>('');

  // AI Generated / Extracted Questions Preview
  const [extractedQuestions, setExtractedQuestions] = useState<ExamQuestionItem[]>([]);

  // Active view tab: 'generator' | 'published'
  const [subTab, setSubTab] = useState<'generator' | 'published'>('generator');

  // Handle Drag & Drop for Method 1
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processDocumentFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processDocumentFile(e.target.files[0]);
    }
  };

  const processDocumentFile = (file: File) => {
    const validExtensions = ['.pdf', '.docx', '.doc', '.txt'];
    const fileNameLower = file.name.toLowerCase();
    const isValid = validExtensions.some((ext) => fileNameLower.endsWith(ext));

    if (!isValid) {
      showError('Định dạng file không hỗ trợ. Vui lòng tải lên file .pdf, .docx hoặc .txt');
      return;
    }

    setUploadedFile(file);

    // If file is a Word document (.docx / .doc), use mammoth.convertToHtml to extract text & embedded base64 images
    if (fileNameLower.endsWith('.docx') || fileNameLower.endsWith('.doc')) {
      setFileMimeType('application/vnd.openxmlformats-officedocument.wordprocessingml.document');

      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const arrayBuffer = event.target?.result as ArrayBuffer;
          let imgCount = 0;

          // Mammoth configuration: Convert all embedded Word images to Base64 Data URIs
          const options = {
            convertImage: mammoth.images.imgElement((image: any) => {
              imgCount++;
              return image.read('base64').then((imageBuffer: string) => {
                return {
                  src: 'data:' + image.contentType + ';base64,' + imageBuffer
                };
              });
            })
          };

          const result = await mammoth.convertToHtml({ arrayBuffer }, options);
          const htmlOutput = result.value || '';
          setRawHtmlContent(htmlOutput);
          setExtractedImageCount(imgCount);

          // Also keep file base64 for fallback
          const b64Reader = new FileReader();
          b64Reader.onload = () => {
            setFileBase64(b64Reader.result as string);
          };
          b64Reader.readAsDataURL(file);

          if (imgCount > 0) {
            showSuccess(
              `✨ Đã đọc file Word và trích xuất thành công ${imgCount} hình ảnh gốc cùng toàn bộ công thức đề thi!`
            );
          } else {
            showSuccess(`Đã trích xuất nội dung file Word: ${file.name} (${Math.round(file.size / 1024)} KB)`);
          }
        } catch (docxErr: any) {
          console.error('Lỗi phân tích file Word bằng mammoth:', docxErr);
          showError('Không thể trích xuất ảnh từ file Word, chuyển sang chế độ đọc cơ bản.');
          const fallbackReader = new FileReader();
          fallbackReader.onload = () => {
            setFileBase64(fallbackReader.result as string);
          };
          fallbackReader.readAsDataURL(file);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      // PDF or TXT
      setFileMimeType(file.type || (fileNameLower.endsWith('.pdf') ? 'application/pdf' : 'text/plain'));
      setRawHtmlContent('');
      setExtractedImageCount(0);

      // Read as Data URL / base64
      const reader = new FileReader();
      reader.onload = () => {
        setFileBase64(reader.result as string);
        showSuccess(`Đã tải lên tệp: ${file.name} (${Math.round(file.size / 1024)} KB)`);
      };
      reader.onerror = () => {
        showError('Không thể đọc tệp tài liệu. Vui lòng thử lại.');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeUploadedFile = () => {
    setUploadedFile(null);
    setFileBase64(null);
    setFileMimeType(null);
    setRawHtmlContent('');
    setExtractedImageCount(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Handle Attached Image for Method 2
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        showError('Vui lòng chọn hình ảnh định dạng .jpg, .png hoặc .webp');
        return;
      }

      setAttachedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setAttachedImagePreview(reader.result as string);
        showSuccess(`Đã đính kèm ảnh minh họa: ${file.name}`);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAttachedImage = () => {
    setAttachedImage(null);
    setAttachedImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  // Quick Samples for Teacher
  const handleInsertSample = (type: 'cylinder' | 'cone' | 'sphere' | 'combo') => {
    if (type === 'cylinder') {
      setManualText(
        `Bài 1: Một lon nước ngọt hình trụ có đường kính đáy d = 6 cm và chiều cao h = 12 cm.\na) Tính diện tích xung quanh của lon nước ngọt (lấy pi ≈ 3,14).\nb) Tính thể tích nước chứa đầy trong lon theo cm3.`
      );
    } else if (type === 'cone') {
      setManualText(
        `Bài 1: Một chiếc nón lá truyền thống có đường kính đáy d = 40 cm và chiều cao h = 15 cm.\na) Tính độ dài đường sinh l của chiếc nón lá.\nb) Tính diện tích lá cần dùng để phủ kín mặt xung quanh (lấy pi ≈ 3,14).`
      );
    } else if (type === 'sphere') {
      setManualText(
        `Bài 1: Một quả bóng bàn dạng hình cầu có đường kính d = 40 mm (bán kính R = 2 cm).\na) Tính diện tích bề mặt quả bóng bàn theo cm2.\nb) Tính thể tích quả bóng bàn (lấy pi ≈ 3,14).`
      );
    } else {
      setManualText(
        `Bài 1 (Hình trụ): Một bể nước hình trụ có bán kính đáy r = 0,8 m và chiều cao h = 1,5 m. Tính dung tích tối đa của bể theo lít (1 m3 = 1000 lít).\n\nBài 2 (Hình nón): Một cốc đựng kem hình nón có bán kính miệng cốc r = 4 cm, chiều cao h = 9 cm. Tính thể tích kem chứa đầy trong cốc.`
      );
    }
    showInfo('Đã chèn nội dung bài toán mẫu.');
  };

  // Execute AI Analysis & Question Generation
  const handleAnalyzeWithAI = async () => {
    const hasText = manualText.trim().length > 0;
    const hasFile = !!fileBase64;
    const hasImage = !!attachedImagePreview;

    if (inputMode === 'manual' && !hasText && !hasImage) {
      showError('Vui lòng nhập văn bản đề thi hoặc đính kèm hình ảnh câu hỏi!');
      return;
    }

    if (inputMode === 'upload' && !hasFile) {
      showError('Vui lòng tải lên file tài liệu (.pdf hoặc .docx) trước khi phân tích!');
      return;
    }

    setIsProcessingAI(true);
    setAiStepMessage('Đang tải dữ liệu và kết nối Gemini AI Model...');

    try {
      setTimeout(() => {
        setAiStepMessage('Đang trích xuất câu hỏi, chuẩn hóa LaTeX KaTeX & phân tích đáp án...');
      }, 1000);

      setTimeout(() => {
        setAiStepMessage('Đang sinh đồ họa SVG hình học không gian và lời giải từng bước...');
      }, 2200);

      const payload: any = {};
      if (inputMode === 'upload') {
        if (rawHtmlContent && rawHtmlContent.trim().length > 0) {
          payload.text = rawHtmlContent;
        } else {
          payload.fileBase64 = fileBase64;
          payload.fileMimeType = fileMimeType;
          payload.text = manualText || 'Tài liệu đề thi tuyển sinh vào 10';
        }
      } else {
        payload.text = manualText;
        if (attachedImagePreview) {
          payload.imageFile = attachedImagePreview;
        }
      }

      const response = await fetch('/api/generate-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
        const formattedQuestions: ExamQuestionItem[] = data.questions.map((q: any, idx: number) => ({
          id: q.questionId || q.id || `exam-q-${Date.now()}-${idx + 1}`,
          questionText: q.questionText || '',
          latexFormula: q.latexFormula || '',
          originalImageBase64: q.originalImageBase64 || null,
          svgCode: q.originalImageBase64 ? null : (q.svgCode || null),
          options: q.options || undefined,
          correctAnswer: q.correctAnswer || q.finalAnswer || '',
          finalAnswer: q.finalAnswer || q.correctAnswer || '',
          stepByStepSolution: Array.isArray(q.stepByStepSolution)
            ? q.stepByStepSolution
            : Array.isArray(q.steps)
            ? q.steps
            : [q.stepByStepSolution || ''],
          topic: q.topic || 'Hình học không gian (Vào 10)',
          difficulty: q.difficulty || (idx % 3 === 0 ? 'easy' : idx % 3 === 1 ? 'medium' : 'hard')
        }));

        setExtractedQuestions(formattedQuestions);
        showSuccess(`✨ AI đã bóc tách thành công ${formattedQuestions.length} câu hỏi chuẩn cấu trúc vào 10!`);
      } else {
        showError('Không thể trích xuất câu hỏi từ dữ liệu đã cung cấp. Vui lòng thử lại.');
      }
    } catch (err: any) {
      console.error('AI Exam Generator error:', err);
      showError('Lỗi xử lý AI. Vui lòng kiểm tra lại dữ liệu đầu vào hoặc thử bài toán mẫu.');
    } finally {
      setIsProcessingAI(false);
      setAiStepMessage('');
    }
  };

  // Publish Questions to Students
  const handlePublishToStudents = () => {
    if (extractedQuestions.length === 0) {
      showError('Chưa có câu hỏi nào trong danh sách Preview để giao cho học sinh.');
      return;
    }

    publishExamQuestions(extractedQuestions, examTitle);
    showSuccess(`🎉 Đã xuất bản và giao ${extractedQuestions.length} câu hỏi Ôn thi vào 10 thành công! Học sinh đã có thể vào làm bài.`);
    setSubTab('published');
  };

  // Remove single question from preview
  const handleRemoveExtractedQuestion = (idxToRemove: number) => {
    setExtractedQuestions((prev) => prev.filter((_, idx) => idx !== idxToRemove));
    showInfo('Đã xóa câu hỏi khỏi danh sách Preview.');
  };

  return (
    <div id="teacher-exam-prep-manager" className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-6 sm:p-7 text-white shadow-sm border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-inner shrink-0">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-white">Chuyên Đề Ôn Thi Tuyển Sinh Vào Lớp 10</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold uppercase">
                AI Multimodal Generator
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 font-sans leading-relaxed max-w-2xl">
              Hỗ trợ tải lên đề thi từ file Word/PDF hoặc nhập thủ công kèm ảnh. AI sẽ tự động chuẩn hóa công thức KaTeX LaTeX, xác định đáp án đúng, vẽ hình SVG và soạn lời giải chi tiết từng bước.
            </p>
          </div>
        </div>

        {/* Action Toggle Subtabs */}
        <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/10 shrink-0 self-end md:self-center">
          <button
            type="button"
            onClick={() => setSubTab('generator')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === 'generator' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tạo Đề Mới (AI)</span>
          </button>
          <button
            type="button"
            onClick={() => setSubTab('published')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === 'published' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Đề Đang Phát Hành ({publishedQuestions.length})</span>
          </button>
        </div>
      </div>

      {subTab === 'generator' ? (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* LEFT PANEL: INPUT CONTROLS (5 cols on xl) */}
          <div className="xl:col-span-5 space-y-6">
            <Card className="bg-white border border-slate-200 shadow-sm rounded-3xl p-5 sm:p-6 space-y-5">
              <CardHeader className="p-0 pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>1. Nhập Liệu Đề Thi</span>
                  </CardTitle>
                  <p className="text-xs text-slate-500">Chọn phương thức nhập văn bản hoặc tải file đề thi</p>
                </div>
              </CardHeader>

              {/* Exam Title Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Tiêu đề bộ đề thi:
                </label>
                <input
                  type="text"
                  value={examTitle}
                  onChange={(e) => setExamTitle(e.target.value)}
                  placeholder="VD: Đề Ôn Thi Vào 10 - Chuyên Đề Hình Học Không Gian..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 font-sans"
                />
              </div>

              {/* Method Selector (Tabs / Radio Buttons) */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setInputMode('upload')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    inputMode === 'upload'
                      ? 'bg-white text-blue-600 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Cách 1: Upload File</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInputMode('manual')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    inputMode === 'manual'
                      ? 'bg-white text-blue-600 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Cách 2: Tạo Thủ Công</span>
                </button>
              </div>

              {/* ======================================================== */}
              {/* CÁCH 1: UPLOAD FILE DRAG & DROP (.docx, .pdf) */}
              {/* ======================================================== */}
              {inputMode === 'upload' && (
                <div className="space-y-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.doc,.txt"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {!uploadedFile ? (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${
                        isDragging
                          ? 'border-blue-600 bg-blue-50/50 scale-[0.99]'
                          : 'border-slate-300 hover:border-blue-500 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-800">
                        Kéo thả file đề thi vào đây hoặc bấm để chọn
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Hỗ trợ định dạng tài liệu: <strong>.PDF, .DOCX, .DOC, .TXT</strong>
                      </p>
                      <div className="mt-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-2xs">
                          <UploadCloud className="w-3.5 h-3.5" />
                          Chọn file từ máy tính
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 truncate">
                            {uploadedFile.name}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2 flex-wrap mt-0.5">
                            <span>{Math.round(uploadedFile.size / 1024)} KB • Đã sẵn sàng</span>
                            {extractedImageCount > 0 && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                                <ImageIcon className="w-3 h-3 text-emerald-600" />
                                {extractedImageCount} ảnh gốc đã trích xuất
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={removeUploadedFile}
                        className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all cursor-pointer shrink-0"
                        title="Xóa tệp"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>
                      AI sẽ tự động lọc bỏ các mã rác MathType, chuyển đổi công thức sang chuẩn LaTeX KaTeX và tính toán đáp số tự động.
                    </span>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* CÁCH 2: TẠO THỦ CÔNG (TEXTAREA + ĐÍNH KÈM HÌNH ẢNH) */}
              {/* ======================================================== */}
              {inputMode === 'manual' && (
                <div className="space-y-4">
                  {/* Quick samples bar */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
                      Mẫu nhanh:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleInsertSample('cylinder')}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-semibold shrink-0 cursor-pointer transition-colors"
                    >
                      + Hình Trụ
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertSample('cone')}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-semibold shrink-0 cursor-pointer transition-colors"
                    >
                      + Hình Nón
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertSample('sphere')}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-semibold shrink-0 cursor-pointer transition-colors"
                    >
                      + Hình Cầu
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertSample('combo')}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-semibold shrink-0 cursor-pointer transition-colors"
                    >
                      + Bộ 2 Câu
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Nội dung câu hỏi đề thi (Text / MathType):
                    </label>
                    <textarea
                      rows={6}
                      value={manualText}
                      onChange={(e) => setManualText(e.target.value)}
                      placeholder="Dán hoặc nhập nội dung bài toán tại đây... Ví dụ: Một lon nước ngọt hình trụ có bán kính đáy r = 3cm, chiều cao h = 10cm. Tính diện tích xung quanh..."
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 font-sans leading-relaxed"
                    />
                  </div>

                  {/* Attached Image Section */}
                  <div className="space-y-2">
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/jpg"
                      onChange={handleImageSelect}
                      className="hidden"
                    />

                    {!attachedImagePreview ? (
                      <button
                        type="button"
                        onClick={() => imageInputRef.current?.click()}
                        className="w-full py-2.5 px-4 rounded-xl border border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/50 text-slate-700 hover:text-blue-700 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ImageIcon className="w-4 h-4 text-blue-600" />
                        <span>[+ Đính kèm hình ảnh minh họa (.jpg, .png)]</span>
                      </button>
                    ) : (
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={attachedImagePreview}
                            alt="Preview đính kèm"
                            className="w-12 h-12 object-cover rounded-xl border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-800 truncate">
                              {attachedImage?.name || 'Ảnh minh họa'}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              Đã đính kèm • Sẽ gửi cùng đề bài vào Gemini
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={removeAttachedImage}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                          title="Gỡ ảnh"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* MAIN ACTION BUTTON: ✨ AI Phân tích & Tạo đáp án */}
              <div className="pt-3 border-t border-slate-100">
                <Button
                  id="btn-ai-analyze-exam"
                  type="button"
                  variant="primary"
                  size="md"
                  shape="pill"
                  disabled={isProcessingAI}
                  leftIcon={
                    isProcessingAI ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )
                  }
                  onClick={handleAnalyzeWithAI}
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-sm shadow-sm py-3"
                >
                  {isProcessingAI ? 'Đang phân tích đa phương tiện...' : '✨ AI Phân tích & Tạo đáp án'}
                </Button>

                {isProcessingAI && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800 flex items-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600 shrink-0" />
                    <span className="font-medium">{aiStepMessage}</span>
                  </motion.div>
                )}
              </div>
            </Card>
          </div>

          {/* RIGHT PANEL: PREVIEW & PUBLISH (7 cols on xl) */}
          <div className="xl:col-span-7 space-y-6">
            <Card className="bg-white border border-slate-200 shadow-sm rounded-3xl p-5 sm:p-6 space-y-5">
              <CardHeader className="p-0 pb-3 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>2. Xem Trước Kết Quả Bóc Tách (AI Preview)</span>
                    {extractedQuestions.length > 0 && (
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                        {extractedQuestions.length} câu hỏi
                      </span>
                    )}
                  </CardTitle>
                  <p className="text-xs text-slate-500">
                    Kiểm tra câu hỏi, công thức LaTeX, hình vẽ SVG và lời giải trước khi giao bài
                  </p>
                </div>

                {extractedQuestions.length > 0 && (
                  <Button
                    id="btn-publish-exam-questions"
                    type="button"
                    variant="primary"
                    size="sm"
                    shape="pill"
                    leftIcon={<Send className="w-4 h-4" />}
                    onClick={handlePublishToStudents}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                  >
                    [Lưu & Giao bài cho Học sinh]
                  </Button>
                )}
              </CardHeader>

              {extractedQuestions.length > 0 ? (
                <div className="space-y-5">
                  {extractedQuestions.map((q, qIdx) => (
                    <div
                      key={q.id || qIdx}
                      className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E5DCCF] space-y-4 shadow-2xs relative group"
                    >
                      {/* Question Top Row */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-0.5 rounded-lg bg-blue-600 text-white font-bold text-xs">
                            CÂU {qIdx + 1}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                            {q.topic || 'Toán 9 Vào 10'}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveExtractedQuestion(qIdx)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                          title="Xóa câu này"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Question Text (LaTeX KaTeX rendered with standard sans-serif typography) */}
                      <div className="text-sm font-sans font-normal text-slate-900 leading-relaxed text-left">
                        <MathText text={q.questionText} />
                      </div>

                      {/* Formula */}
                      {q.latexFormula && (
                        <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-200/60 text-xs flex items-center gap-2">
                          <span className="font-bold text-blue-900 shrink-0">Công thức:</span>
                          <MathFormula formula={`$${q.latexFormula}$`} className="text-blue-800 font-semibold" />
                        </div>
                      )}

                      {/* Original Word Image OR SVG Visual Graphic */}
                      {q.originalImageBase64 ? (
                        <div className="space-y-1.5">
                          <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                            <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Hình vẽ gốc từ file Word:</span>
                          </div>
                          <div className="max-w-md mx-auto p-2.5 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
                            <img
                              src={q.originalImageBase64}
                              alt="Hình vẽ gốc đề bài"
                              className="max-h-60 max-w-full object-contain rounded-lg"
                            />
                          </div>
                        </div>
                      ) : q.svgCode ? (
                        <div className="space-y-1.5">
                          <div className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                            <Layers className="w-3.5 h-3.5 text-blue-600" />
                            <span>Hình minh họa SVG:</span>
                          </div>
                          <div className="max-w-[220px] aspect-square p-3 bg-white rounded-2xl border border-slate-200 shadow-inner flex items-center justify-center mx-auto [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-48">
                            <div dangerouslySetInnerHTML={{ __html: q.svgCode }} className="w-full h-full flex items-center justify-center" />
                          </div>
                        </div>
                      ) : null}

                      {/* Correct Answer Highlight */}
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
                            Đáp án đúng (Hệ thống dùng để tự động chấm):
                          </div>
                          <div className="text-xs font-semibold text-emerald-800 font-sans mt-0.5">
                            <MathFormula formula={q.correctAnswer || q.finalAnswer} />
                          </div>
                        </div>
                      </div>

                      {/* Step by step solutions */}
                      <div className="space-y-1.5 font-sans">
                        <div className="text-[11px] font-bold text-[#3A302B] uppercase tracking-wider">
                          Lời giải chi tiết từng bước:
                        </div>
                        <div className="space-y-2">
                          {q.stepByStepSolution && q.stepByStepSolution.map((step, sIdx) => (
                            <div
                              key={sIdx}
                              className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-sans font-normal text-[#3A302B] leading-[1.7]"
                            >
                              <MathFormula formula={step} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Bottom Save & Publish Button */}
                  <div className="pt-2 flex justify-end">
                    <Button
                      id="btn-publish-bottom"
                      type="button"
                      variant="primary"
                      size="md"
                      shape="pill"
                      leftIcon={<Send className="w-4 h-4" />}
                      onClick={handlePublishToStudents}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs px-6"
                    >
                      [Lưu & Giao bài cho Học sinh]
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-700">Chưa có kết quả phân tích</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Vui lòng chọn file Word/PDF hoặc nhập nội dung bài toán ở cột bên trái và bấm <strong>"✨ AI Phân tích & Tạo đáp án"</strong>.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      ) : (
        /* SUBTAB: PUBLISHED QUESTIONS & STUDENT RESULTS */
        <div className="space-y-6">
          <Card className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">{activeExamTitle}</h3>
                <p className="text-xs text-slate-500">
                  Danh sách {publishedQuestions.length} câu hỏi đang phát hành cho học sinh trong mục "Ôn thi vào 10"
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                shape="pill"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={() => setSubTab('generator')}
                className="border-blue-600 text-blue-600 font-bold"
              >
                Tạo Thêm Đề Mới
              </Button>
            </div>

            {/* List of currently published questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {publishedQuestions.map((q, idx) => (
                <div
                  key={q.id || idx}
                  className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#E5DCCF] space-y-3 shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-blue-600 text-white font-bold text-xs">
                      Câu {idx + 1}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {q.topic || 'Hình học không gian'}
                    </span>
                  </div>

                  <div className="text-xs font-sans font-normal text-slate-800 line-clamp-3 text-left leading-relaxed">
                    <MathText text={q.questionText} />
                  </div>

                  {q.originalImageBase64 ? (
                    <div className="p-2 bg-white rounded-xl border border-slate-200 flex items-center justify-center max-h-32 overflow-hidden">
                      <img
                        src={q.originalImageBase64}
                        alt="Hình vẽ gốc"
                        className="max-h-28 max-w-full object-contain rounded"
                      />
                    </div>
                  ) : q.svgCode ? (
                    <div className="p-2 bg-[#F8F5EE] rounded-xl border border-slate-200 flex items-center justify-center max-h-32 overflow-hidden [&>div>svg]:max-h-28">
                      <div dangerouslySetInnerHTML={{ __html: q.svgCode }} className="w-full flex justify-center" />
                    </div>
                  ) : null}

                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
                    Đáp án: <MathFormula formula={q.correctAnswer || q.finalAnswer} />
                  </div>
                </div>
              ))}
            </div>

            {/* Student submission log summary */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Nhật ký làm bài gần đây của học sinh ({studentSubmissions.length} lượt nộp):</span>
              </h4>

              {studentSubmissions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-bold">
                        <th className="py-2.5 px-3">Học Sinh</th>
                        <th className="py-2.5 px-3">Lớp</th>
                        <th className="py-2.5 px-3">Đáp Án Nhập</th>
                        <th className="py-2.5 px-3">Kết Quả</th>
                        <th className="py-2.5 px-3">Thời Gian Làm</th>
                        <th className="py-2.5 px-3">Thời Điểm</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {studentSubmissions.slice(0, 10).map((sub) => (
                        <tr key={sub.id} className="hover:bg-slate-50 font-sans">
                          <td className="py-2.5 px-3 font-bold text-slate-900">{sub.studentName}</td>
                          <td className="py-2.5 px-3 text-slate-600">{sub.className}</td>
                          <td className="py-2.5 px-3 font-mono text-slate-700 max-w-[150px] truncate">
                            {sub.studentAnswer}
                          </td>
                          <td className="py-2.5 px-3">
                            {sub.isCorrect ? (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                Đúng (+10đ)
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                                Sai
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-slate-600">{sub.timeSpentSeconds}s</td>
                          <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                            {new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl">
                  Chưa có lượt nộp bài nào từ học sinh. Các kết quả làm bài sẽ tự động được ghi nhận và hiển thị tại đây theo thời gian thực.
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ExamPrepManager;
