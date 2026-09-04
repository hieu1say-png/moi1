/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - EXAM INTRO CARD (ÔN THI VÀO 10 START SCREEN)
 * Enforces Master Contract Section 11.
 */

import React from 'react';
import { Button } from '../common/Button';
import {
  GraduationCap,
  Timer,
  BookOpen,
  Award,
  Sparkles,
  Play,
  History,
  CheckCircle2,
  AlertCircle,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { StudentMasteryProfile } from '../../services/adaptiveExamService';

export interface ExamIntroCardProps {
  studentName: string;
  className: string;
  masteryProfile: StudentMasteryProfile;
  onStartExam: () => void;
  onViewHistory: () => void;
}

export const ExamIntroCard: React.FC<ExamIntroCardProps> = ({
  studentName,
  className,
  masteryProfile,
  onStartExam,
  onViewHistory
}) => {
  const isAdaptive = masteryProfile.totalAttempts >= 1;

  return (
    <div id="exam-intro-screen" className="max-w-4xl mx-auto space-y-6">
      {/* 1. Master Title Banner */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border-3 border-black shadow-neo relative overflow-hidden space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="neo-badge bg-[#FF6B00] text-white">
                <GraduationCap className="w-3.5 h-3.5" />
                PHÒNG THI THỬ VÀO 10
              </span>
              {isAdaptive && (
                <span className="neo-badge bg-[#8B5CF6] text-white">
                  <Sparkles className="w-3 h-3" />
                  Chế độ thích ứng (Adaptive v2)
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight font-heading">
              ÔN THI VÀO 10
            </h1>

            <p className="text-xs sm:text-sm text-gray-800 max-w-2xl leading-relaxed font-semibold">
              Bộ đề mô phỏng chuẩn cấu trúc đề thi tuyển sinh vào Lớp 10 môn Toán (Chuyên đề Hình học không gian).
              Được tự động điều chỉnh theo năng lực và lỗi sai của học sinh.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {masteryProfile.totalAttempts > 0 && (
              <button
                type="button"
                onClick={onViewHistory}
                className="neo-btn px-4 py-2 rounded bg-white text-black hover:bg-[#FFF9E6] font-black text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <History className="w-4 h-4" />
                Lịch Sử ({masteryProfile.totalAttempts} lần)
              </button>
            )}
          </div>
        </div>

        {/* 2. Three Core Metrics (10 câu • 30 phút • 10 điểm) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded bg-[#FFF9E6] border-2 border-black shadow-neo-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded bg-[#FF6B00] text-white border-2 border-black flex items-center justify-center font-black shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black text-gray-800 uppercase block tracking-wider">
                Số Lượng Câu Hỏi
              </span>
              <span className="text-base font-black text-black">10 Câu Chuẩn Hóa</span>
            </div>
          </div>

          <div className="p-4 rounded bg-[#FFF9E6] border-2 border-black shadow-neo-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded bg-[#B7F000] text-black border-2 border-black flex items-center justify-center font-black shrink-0">
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black text-gray-800 uppercase block tracking-wider">
                Thời Gian Làm Bài
              </span>
              <span className="text-base font-black text-black">30 Phút (1800s)</span>
            </div>
          </div>

          <div className="p-4 rounded bg-[#FFF9E6] border-2 border-black shadow-neo-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded bg-[#3B82F6] text-white border-2 border-black flex items-center justify-center font-black shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black text-gray-800 uppercase block tracking-wider">
                Thang Điểm Tối Đa
              </span>
              <span className="text-base font-black text-black">10.0 Điểm</span>
            </div>
          </div>
        </div>

        {/* 3. Structure & Topics Specification */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t-2 border-black">
          <div className="space-y-2">
            <h4 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#FF6B00]" />
              Cấu Trúc Đề Thi Khóa Cứng:
            </h4>
            <div className="space-y-1.5 text-xs text-black font-bold">
              <div className="flex justify-between p-2 rounded bg-[#FFF9E6] border-2 border-black">
                <span>&bull; <strong>4 Câu Trắc Nghiệm (MCQ):</strong> 4 lựa chọn</span>
                <strong className="text-[#FF6B00]">4.0 điểm</strong>
              </div>
              <div className="flex justify-between p-2 rounded bg-[#FFF9E6] border-2 border-black">
                <span>&bull; <strong>3 Câu Đúng / Sai:</strong> 4 mệnh đề / câu</span>
                <strong className="text-[#FF6B00]">3.0 điểm</strong>
              </div>
              <div className="flex justify-between p-2 rounded bg-[#FFF9E6] border-2 border-black">
                <span>&bull; <strong>3 Câu Trả Lời Ngắn:</strong> Tính toán số</span>
                <strong className="text-[#FF6B00]">3.0 điểm</strong>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#B7F000]" />
              Phạm Vi Chủ Đề Hình Không Gian:
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-[#FFF9E6] border-2 border-black text-center">
                <span className="text-[10px] text-gray-700 font-black block">CHỦ ĐỀ 1</span>
                <strong className="text-black">Hình Trụ (3 câu)</strong>
              </div>
              <div className="p-2 rounded bg-[#FFF9E6] border-2 border-black text-center">
                <span className="text-[10px] text-gray-700 font-black block">CHỦ ĐỀ 2</span>
                <strong className="text-black">Hình Nón (3 câu)</strong>
              </div>
              <div className="p-2 rounded bg-[#FFF9E6] border-2 border-black text-center">
                <span className="text-[10px] text-gray-700 font-black block">CHỦ ĐỀ 3</span>
                <strong className="text-black">Hình Cầu (2 câu)</strong>
              </div>
              <div className="p-2 rounded bg-[#FFF9E6] border-2 border-black text-center">
                <span className="text-[10px] text-gray-700 font-black block">CHỦ ĐỀ 4</span>
                <strong className="text-black">Khối Liên Hợp (2 câu)</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Student Session Info & Disclaimer */}
        <div className="p-4 rounded bg-[#FFD23F] border-2 border-black text-xs text-black space-y-1.5 shadow-neo-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-black shrink-0" />
            <span className="font-black">Ghi chú quy chế thi:</span>
          </div>
          <p className="leading-relaxed text-[11px] font-semibold text-black">
            * <strong>Đây là bài thi mô phỏng của Geometry Lab</strong> phục vụ mục đích ôn tập và đánh giá năng lực.
            Thời gian đếm ngược sẽ bắt đầu ngay khi nhấn nút bên dưới. Bài làm tự động lưu liên tục (Autosave) và bảo lưu khi tải lại trang.
          </p>
          <div className="text-[11px] text-black font-bold pt-1 border-t border-black/30 flex justify-between">
            <span>Thí sinh: <strong>{studentName}</strong> ({className})</span>
            <span>Không trùng dạng bài trong cùng một đề thi</span>
          </div>
        </div>

        {/* 5. Start Action Button */}
        <div className="pt-2 flex justify-center">
          <button
            id="btn-start-mock-exam"
            type="button"
            onClick={onStartExam}
            className="neo-btn w-full sm:w-auto px-10 py-4 font-black text-base uppercase tracking-wider bg-[#FF6B00] text-white hover:bg-[#E55F00] flex items-center justify-center gap-2.5 cursor-pointer shadow-neo"
          >
            <Play className="w-5 h-5 fill-current" />
            BẮT ĐẦU THI THỬ (30 PHÚT)
          </button>
        </div>
      </div>
    </div>
  );
};
