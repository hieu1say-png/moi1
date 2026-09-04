/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * EXAM QUESTION BANK SCHEMA (NGÂN HÀNG ÔN THI VÀO 10)
 * Specification standard for Grade 9 Entrance Exam preparation.
 */

export type QuestionType =
  | 'multiple_choice'   // TRẮC NGHIỆM
  | 'true_false'         // ĐÚNG / SAI
  | 'fill_in'            // ĐIỀN ĐÁP ÁN
  | 'essay';             // TỰ LUẬN

export type QuestionSubject =
  | 'geometry'           // HÌNH HỌC
  | 'algebra'            // ĐẠI SỐ
  | 'probability'        // XÁC SUẤT
  | 'statistics'         // THỐNG KÊ
  | 'real_world'         // TOÁN THỰC TẾ
  | 'modeling';          // MÔ HÌNH HÓA

export type QuestionDifficulty = 'easy' | 'medium' | 'hard' | 'olympiad';

export interface GeometryPoint {
  id: string; // e.g. "A", "B", "C", "H", "O", "S"
  x: number;
  y: number;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export interface GeometrySegment {
  from: string; // Point ID
  to: string;   // Point ID
  style?: 'solid' | 'dashed';
  label?: string; // e.g. "h = 12 cm", "l = 15 cm"
}

export interface GeometryCircle {
  center: string; // Point ID
  radius: number;
  style?: 'solid' | 'dashed';
}

export interface GeometryModel {
  containsGeometry: boolean;
  geometryType?: 'cylinder' | 'cone' | 'sphere' | 'triangle' | 'circle' | 'composite';
  points?: GeometryPoint[];
  segments?: GeometrySegment[];
  circles?: GeometryCircle[];
  svgCode?: string;
  notes?: string;
}

export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D' | string;
  text: string;
  isCorrect?: boolean;
}

export interface ExamBankQuestion {
  id: string;
  source: 'word_import' | 'manual' | 'ai_generated' | 'official_exam';
  number: number | string;
  text: string;
  questionType: QuestionType;
  subject: QuestionSubject;
  topic: string;
  difficulty: QuestionDifficulty;
  options?: QuestionOption[];
  correctAnswer: string;
  solution: string | string[];
  hints?: string[];
  formulas?: string[];
  geometry?: GeometryModel;
  image?: string;
  confidence: number; // 0 to 100
  needsReview: boolean;
  createdAt: string;
  updatedAt: string;
}
