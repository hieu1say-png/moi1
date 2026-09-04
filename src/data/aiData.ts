/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - AI Tutor Conversation & Dialogue Mock Data
 */

import { AIConversation } from '../types/dataArchitecture';

export const MOCK_AI_CONVERSATIONS: AIConversation[] = [
  {
    id: 'ai-conv-001',
    studentId: 'usr-student-001',
    title: 'Phân biệt Đường sinh & Chiều cao trong hình nón',
    contextShape: 'cone',
    contextLessonId: 'lesson-cone-01',
    createdAt: '2026-08-14T11:22:00Z',
    messages: [
      {
        id: 'msg-001',
        sender: 'user',
        content: 'Thầy ơi, sao em tính đường sinh của hình nón ra 14 cm mà đáp án lại là 10 cm ạ? (Biết h = 8 cm, r = 6 cm)',
        timestamp: '11:22'
      },
      {
        id: 'msg-002',
        sender: 'assistant',
        content:
          'Chào Minh! Thầy thấy em đã cộng trực tiếp chiều cao và bán kính: 8 + 6 = 14 cm. Đây là một nhầm lẫn rất phổ biến của học sinh lớp 9.\n\nTrong hình nón, tam giác nối đỉnh S, tâm đáy O và một điểm A trên đường tròn đáy là một **tam giác vuông tại O**. Đường sinh SA (ký hiệu là $l$) chính là **cạnh huyền** của tam giác vuông này.\n\nTheo định lý Pythagore:',
        latex: 'l = \\sqrt{h^2 + r^2} = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10\\text{ cm}',
        timestamp: '11:23',
        suggestedFollowUps: [
          'Tại sao đường sinh luôn dài hơn chiều cao?',
          'Cách tính góc ở đỉnh hình nón?',
          'Luyện tập thêm 1 bài tương tự'
        ],
        relatedFormulaId: 'cone-formula-pythagoras',
        identifiedErrorType: 'conceptual_misunderstanding'
      },
      {
        id: 'msg-003',
        sender: 'user',
        content: 'À em hiểu rồi ạ! Phải dùng Pitago tính căn của tổng bình phương. Cảm ơn Thầy!',
        timestamp: '11:25'
      },
      {
        id: 'msg-004',
        sender: 'assistant',
        content: 'Rất tuyệt vời! Em nhớ nhé: $l = \\sqrt{h^2 + r^2}$. Bây giờ em thử tính diện tích xung quanh $S_{xq} = \\pi r l$ với $r = 6$ cm và $l = 10$ cm xem bằng bao nhiêu nhé!',
        latex: 'S_{xq} = \\pi \\cdot 6 \\cdot 10 = 60\\pi\\text{ cm}^2',
        timestamp: '11:25'
      }
    ]
  },
  {
    id: 'ai-conv-002',
    studentId: 'usr-student-001',
    title: 'Hỏi về công thức thể tích khối cầu',
    contextShape: 'sphere',
    contextLessonId: 'lesson-sph-01',
    createdAt: '2026-08-15T09:42:00Z',
    messages: [
      {
        id: 'msg-005',
        sender: 'user',
        content: 'Làm sao để nhớ công thức diện tích mặt cầu và thể tích khối cầu không bị nhầm ạ?',
        timestamp: '09:42'
      },
      {
        id: 'msg-006',
        sender: 'assistant',
        content:
          'Một mẹo nhớ cực kỳ thú vị của các thầy cô nè Minh:\n\n1. **Diện tích mặt cầu (đơn vị cm² - mũ 2):**\n   Mặt cầu có diện tích bằng đúng **4 lần diện tích hình tròn lớn** đi qua tâm:\n   $$S = 4\\pi R^2$$\n\n2. **Thể tích khối cầu (đơn vị cm³ - mũ 3):**\n   Thể tích có lũy thừa 3, nên phân số đi kèm có mẫu là 3: **bốn phần ba pi R mũ ba**:\n   $$V = \\frac{4}{3}\\pi R^3$$\n\nEm thấy không: Diện tích gắn với $R^2$, thể tích gắn với $R^3$ và chia cho 3!',
        latex: 'S = 4\\pi R^2 \\quad \\text{và} \\quad V = \\frac{4}{3}\\pi R^3',
        timestamp: '09:43',
        suggestedFollowUps: [
          'Nếu đề bài cho đường kính d thì tính thế nào?',
          'Bài toán Trái Đất và vệ tinh',
          'Luyện tập bài tập trắc nghiệm hình cầu'
        ]
      }
    ]
  }
];
