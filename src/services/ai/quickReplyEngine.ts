/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - QUICK REPLY ENGINE
 * Generates 3-4 context-aware interactive suggestion chips following pedagogical intent and 3D state.
 */

import { CanonicalTopic, CanonicalIntent, QuickReplyOption } from '../../data/questionBank1000/types';

export class QuickReplyEngine {
  public static generate(
    topic: CanonicalTopic,
    intent: CanonicalIntent,
    context: {
      shape?: string;
      pourCount?: number | null;
      misconception?: string | null;
      level?: number;
    } = {}
  ): QuickReplyOption[] {
    // 1. Misconception / Error correction quick replies
    if (context.misconception) {
      return [
        { label: 'Tính lại theo công thức đúng', prompt: 'Thầy hướng dẫn em tính lại với công thức chuẩn nhé!' },
        { label: 'Tại sao em lại sai?', prompt: 'Tại sao bước tính đó của em lại bị sai ạ?' },
        { label: 'Cho em bài tương tự', prompt: 'Cho em một bài tập tương tự để làm lại nhé!' }
      ];
    }

    // 2. Paradox 1/3 quick replies
    if (topic === 'PARADOX_1_3' || context.pourCount !== null) {
      return [
        { label: 'Tại sao 1/3?', prompt: 'Tại sao hình nón có 1/3?' },
        { label: 'Tại sao đổ 3 lần?', prompt: 'Tại sao phải đổ đúng 3 lần cốc mới đầy?' },
        { label: 'Giải thích bằng 3D', prompt: 'Giải thích bằng 3D thí nghiệm rót nước.' },
        { label: 'Em chưa hiểu', prompt: 'Em chưa hiểu tại sao sau mỗi lần rót nước lại tăng thêm 1/3.' }
      ];
    }

    // 3. Cone & Net Unfolding quick replies
    if (topic === 'CONE') {
      if (intent === 'NET_UNFOLD') {
        return [
          { label: 'Bán kính hình quạt?', prompt: 'Bán kính hình quạt là gì?' },
          { label: 'Cung bằng gì?', prompt: 'Cung hình quạt bằng gì?' },
          { label: 'Trải ra thế nào?', prompt: 'Mặt xung quanh hình nón trải phẳng ra thế nào?' },
          { label: 'Cho em gợi ý', prompt: 'Cho em gợi ý về công thức tính góc ở tâm hình quạt.' }
        ];
      }

      return [
        { label: 'Đường sinh là gì?', prompt: 'Đường sinh là gì?' },
        { label: 'Công thức thể tích?', prompt: 'Công thức tính thể tích hình nón là gì?' },
        { label: 'Tại sao có 1/3?', prompt: 'Tại sao hình nón có 1/3?' },
        { label: 'Gợi ý', prompt: 'Thầy cho em gợi ý thôi' }
      ];
    }

    // 4. Cylinder quick replies
    if (topic === 'CYLINDER') {
      if (intent === 'NET_UNFOLD' || intent === 'WHY') {
        return [
          { label: 'Tại sao thành HCN?', prompt: 'Tại sao trải phẳng hình trụ thành hình chữ nhật?' },
          { label: 'Chiều dài HCN bằng gì?', prompt: 'Chiều dài hình chữ nhật bằng gì?' },
          { label: 'Xem mô hình 3D', prompt: 'Mở mô hình 3D trải phẳng hình trụ.' },
          { label: 'Công thức Sxq?', prompt: 'Công thức tính diện tích xung quanh hình trụ là gì?' }
        ];
      }

      return [
        { label: 'Công thức thể tích?', prompt: 'Công thức tính thể tích hình trụ là gì?' },
        { label: 'Tại sao trải thành HCN?', prompt: 'Tại sao trải phẳng hình trụ thành hình chữ nhật?' },
        { label: 'Gợi ý bài tập', prompt: 'Thầy cho em gợi ý thôi' },
        { label: 'Xem 3D', prompt: 'Mở mô hình 3D hình trụ.' }
      ];
    }

    // 5. Sphere quick replies
    if (topic === 'SPHERE') {
      return [
        { label: 'Hình tròn lớn là gì?', prompt: 'Hình tròn lớn của hình cầu là gì?' },
        { label: 'Công thức diện tích?', prompt: 'Công thức tính diện tích mặt cầu là gì?' },
        { label: 'Công thức thể tích?', prompt: 'Công thức tính thể tích hình cầu là gì?' },
        { label: 'Mặt phẳng cắt cầu', prompt: 'Một mặt phẳng cắt mặt cầu thì thiết diện là gì?' }
      ];
    }

    // Default general quick replies
    return [
      { label: 'Gợi ý nhẹ', prompt: 'Thầy cho em gợi ý thôi' },
      { label: 'Công thức', prompt: 'Công thức tính bài này là gì?' },
      { label: 'Ví dụ', prompt: 'Cho em một ví dụ minh họa' },
      { label: 'Mở 3D', prompt: 'Xem trên mô hình không gian 3D' }
    ];
  }
}
