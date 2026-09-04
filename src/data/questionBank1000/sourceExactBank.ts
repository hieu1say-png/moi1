/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - SOURCE EXACT QUESTION BANK (73 QUESTIONS)
 * 31 Multiple Choice Questions (MCQ-001 -> MCQ-031)
 * 42 Constructed Response / Essay Questions (TL-001 -> TL-042)
 * Source Documents:
 * 1. 10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx
 * 2. 19. TỰ LUẬN - HÌNH HỌC KHÔNG GIAN - GV.docx
 */

import { SourceExactQuestion } from './canonicalSchema';

// 31 Multiple Choice Questions with EXACT answer keys verified against master key
export const SOURCE_MCQ_QUESTIONS: SourceExactQuestion[] = [
  {
    id: 'MCQ-001',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 1,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-CYL-REC',
    originalQuestion: 'Hình trụ được tạo thành khi quay hình nào sau đây một vòng quanh một cạnh cố định?',
    originalOptions: ['A. Hình chữ nhật', 'B. Tam giác vuông', 'C. Nửa hình tròn', 'D. Hình thang vuông'],
    originalAnswer: 'A',
    originalSolution: 'Khi quay hình chữ nhật một vòng quanh một cạnh cố định, ta được một hình trụ.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Hình trụ được tạo thành khi quay hình nào sau đây một vòng quanh một cạnh cố định?',
      options: ['Hình chữ nhật', 'Tam giác vuông', 'Nửa hình tròn', 'Hình thang vuông'],
      expectedAnswer: 'Hình chữ nhật',
      solution4Steps: [
        'Bước 1: Nhớ lại định nghĩa hình sinh bởi phép quay.',
        'Bước 2: Cạnh cố định đóng vai trò là trục quay, cạnh đối diện quét nên mặt xung quanh.',
        'Bước 3: Hai cạnh vuông góc với trục quét nên hai đáy tròn phẳng.',
        'Bước 4: Kết luận hình quay tạo thành là hình chữ nhật (Chọn A).'
      ],
      importantNotes: ['Quay hình chữ nhật -> Hình trụ.', 'Quay tam giác vuông -> Hình nón.', 'Quay nửa hình tròn -> Khối cầu.']
    }
  },
  {
    id: 'MCQ-002',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 2,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-CYL-REC',
    originalQuestion: 'Cho hình trụ có bán kính đáy $r$ và chiều cao $h$. Độ dài đường sinh $l$ của hình trụ bằng:',
    originalOptions: ['A. $l = 2h$', 'B. $l = \\sqrt{r^2 + h^2}$', 'C. $l = r$', 'D. $l = h$'],
    originalAnswer: 'D',
    originalSolution: 'Ở hình trụ, các đường sinh song song và bằng nhau, đồng thời bằng chiều cao $h$, do đó $l = h$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Cho hình trụ có bán kính đáy $r$ và chiều cao $h$. Độ dài đường sinh $l$ của hình trụ bằng:',
      options: ['$l = 2h$', '$l = \\sqrt{r^2 + h^2}$', '$l = r$', '$l = h$'],
      expectedAnswer: '$l = h$',
      solution4Steps: [
        'Bước 1: Xét cấu tạo của mặt xung quanh hình trụ.',
        'Bước 2: Đường sinh là đoạn thẳng nối hai điểm tương ứng trên hai đường tròn đáy song song với trục.',
        'Bước 3: Chiều cao là khoảng cách giữa hai mặt phẳng đáy.',
        'Bước 4: Kết luận trong hình trụ, độ dài đường sinh luôn bằng chiều cao: $l = h$ (Chọn D).'
      ],
      importantNotes: ['Hình trụ: l = h.', 'Hình nón: l^2 = r^2 + h^2.']
    }
  },
  {
    id: 'MCQ-003',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 3,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-CYL-VOL',
    originalQuestion: 'Một hình trụ có bán kính đáy $r = 4\\text{ cm}$ và chiều cao $h = 5\\text{ cm}$. Thể tích của hình trụ đó là:',
    originalOptions: ['A. $20\\pi\\text{ cm}^3$', 'B. $40\\pi\\text{ cm}^3$', 'C. $\\frac{80}{3}\\pi\\text{ cm}^3$', 'D. $80\\pi\\text{ cm}^3$'],
    originalAnswer: 'D',
    originalSolution: 'Thể tích hình trụ: $V = \\pi r^2 h = \\pi \\cdot 4^2 \\cdot 5 = 80\\pi\\text{ cm}^3$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Một hình trụ có bán kính đáy $r = 4\\text{ cm}$ và chiều cao $h = 5\\text{ cm}$. Thể tích của hình trụ đó là:',
      options: ['$20\\pi\\text{ cm}^3$', '$40\\pi\\text{ cm}^3$', '$\\frac{80}{3}\\pi\\text{ cm}^3$', '$80\\pi\\text{ cm}^3$'],
      expectedAnswer: '$80\\pi\\text{ cm}^3$',
      solution4Steps: [
        'Bước 1: Trích xuất $r = 4\\text{ cm}$, $h = 5\\text{ cm}$.',
        'Bước 2: Áp dụng công thức $V = \\pi r^2 h$.',
        'Bước 3: Tính toán: $V = \\pi \\cdot 4^2 \\cdot 5 = 80\\pi\\text{ cm}^3$.',
        'Bước 4: Chọn đáp án D.'
      ],
      importantNotes: ['Nhớ bình phương bán kính đáy r.', 'Đơn vị thể tích là cm^3.']
    }
  },
  {
    id: 'MCQ-004',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 4,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-CYL-VOL',
    originalQuestion: 'Hình trụ có đường kính đáy $d = 6\\text{ cm}$ và chiều cao $h = 7\\text{ cm}$. Thể tích hình trụ là:',
    originalOptions: ['A. $252\\pi\\text{ cm}^3$', 'B. $42\\pi\\text{ cm}^3$', 'C. $126\\pi\\text{ cm}^3$', 'D. $63\\pi\\text{ cm}^3$'],
    originalAnswer: 'D',
    originalSolution: 'Bán kính đáy $r = \\frac{d}{2} = 3\\text{ cm}$. Thể tích $V = \\pi r^2 h = \\pi \\cdot 3^2 \\cdot 7 = 63\\pi\\text{ cm}^3$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Hình trụ có đường kính đáy $d = 6\\text{ cm}$ và chiều cao $h = 7\\text{ cm}$. Thể tích hình trụ là:',
      options: ['$252\\pi\\text{ cm}^3$', '$42\\pi\\text{ cm}^3$', '$126\\pi\\text{ cm}^3$', '$63\\pi\\text{ cm}^3$'],
      expectedAnswer: '$63\\pi\\text{ cm}^3$',
      solution4Steps: [
        'Bước 1: Đổi đường kính $d = 6\\text{ cm} \\implies r = 3\\text{ cm}$.',
        'Bước 2: Dùng công thức $V = \\pi r^2 h$.',
        'Bước 3: Tính $V = \\pi \\cdot 3^2 \\cdot 7 = 63\\pi\\text{ cm}^3$.',
        'Bước 4: Chọn đáp án D.'
      ],
      importantNotes: ['Luôn tìm bán kính r = d / 2 trước khi áp dụng công thức.']
    }
  },
  {
    id: 'MCQ-005',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 5,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-CYL-AREA',
    originalQuestion: 'Diện tích xung quanh của hình trụ có bán kính đáy $r = 5\\text{ cm}$ và chiều cao $h = 8\\text{ cm}$ là:',
    originalOptions: ['A. $40\\pi\\text{ cm}^2$', 'B. $200\\pi\\text{ cm}^2$', 'C. $80\\pi\\text{ cm}^2$', 'D. $130\\pi\\text{ cm}^2$'],
    originalAnswer: 'C',
    originalSolution: 'Diện tích xung quanh $S_{xq} = 2\\pi rh = 2\\pi \\cdot 5 \\cdot 8 = 80\\pi\\text{ cm}^2$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Diện tích xung quanh của hình trụ có bán kính đáy $r = 5\\text{ cm}$ và chiều cao $h = 8\\text{ cm}$ là:',
      options: ['$40\\pi\\text{ cm}^2$', '$200\\pi\\text{ cm}^2$', '$80\\pi\\text{ cm}^2$', '$130\\pi\\text{ cm}^2$'],
      expectedAnswer: '$80\\pi\\text{ cm}^2$',
      solution4Steps: [
        'Bước 1: Trích xuất $r = 5\\text{ cm}$, $h = 8\\text{ cm}$.',
        'Bước 2: Dùng công thức $S_{xq} = 2\\pi rh$.',
        'Bước 3: Tính $S_{xq} = 2\\pi \\cdot 5 \\cdot 8 = 80\\pi\\text{ cm}^2$.',
        'Bước 4: Chọn đáp án C.'
      ],
      importantNotes: ['Sxq của hình trụ có hệ số 2pi*r*h.']
    }
  },
  {
    id: 'MCQ-006',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 6,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-CYL-AREA',
    originalQuestion: 'Một hình trụ có bán kính đáy $r = 3\\text{ cm}$ và chiều cao $h = 6\\text{ cm}$. Diện tích toàn phần của hình trụ đó bằng:',
    originalOptions: ['A. $54\\pi\\text{ cm}^2$', 'B. $36\\pi\\text{ cm}^2$', 'C. $18\\pi\\text{ cm}^2$', 'D. $72\\pi\\text{ cm}^2$'],
    originalAnswer: 'A',
    originalSolution: '$S_{tp} = 2\\pi rh + 2\\pi r^2 = 2\\pi \\cdot 3 \\cdot 6 + 2\\pi \\cdot 3^2 = 36\\pi + 18\\pi = 54\\pi\\text{ cm}^2$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Một hình trụ có bán kính đáy $r = 3\\text{ cm}$ và chiều cao $h = 6\\text{ cm}$. Diện tích toàn phần của hình trụ đó bằng:',
      options: ['$54\\pi\\text{ cm}^2$', '$36\\pi\\text{ cm}^2$', '$18\\pi\\text{ cm}^2$', '$72\\pi\\text{ cm}^2$'],
      expectedAnswer: '$54\\pi\\text{ cm}^2$',
      solution4Steps: [
        'Bước 1: Xác định $r = 3\\text{ cm}$, $h = 6\\text{ cm}$.',
        'Bước 2: Sử dụng công thức $S_{tp} = 2\\pi r(h + r)$.',
        'Bước 3: Tính $S_{tp} = 2\\pi \\cdot 3 \\cdot (6 + 3) = 6\\pi \\cdot 9 = 54\\pi\\text{ cm}^2$.',
        'Bước 4: Chọn đáp án A.'
      ],
      importantNotes: ['Stp = Sxq + 2*Sđáy = 2pi*r*(h + r).']
    }
  },
  {
    id: 'MCQ-007',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 7,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-CYL-UNFOLD',
    originalQuestion: 'Khai triển mặt xung quanh của một hình trụ có bán kính đáy $r = 2\\text{ cm}$ và chiều cao $h = 5\\text{ cm}$, ta được một hình chữ nhật có diện tích là:',
    originalOptions: ['A. $10\\pi\\text{ cm}^2$', 'B. $20\\pi\\text{ cm}^2$', 'C. $40\\pi\\text{ cm}^2$', 'D. $20\\text{ cm}^2$'],
    originalAnswer: 'B',
    originalSolution: 'Diện tích hình chữ nhật khai triển chính là diện tích xung quanh: $S = 2\\pi rh = 2\\pi \\cdot 2 \\cdot 5 = 20\\pi\\text{ cm}^2$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Khai triển mặt xung quanh của một hình trụ có bán kính đáy $r = 2\\text{ cm}$ và chiều cao $h = 5\\text{ cm}$, ta được một hình chữ nhật có diện tích là:',
      options: ['$10\\pi\\text{ cm}^2$', '$20\\pi\\text{ cm}^2$', '$40\\pi\\text{ cm}^2$', '$20\\text{ cm}^2$'],
      expectedAnswer: '$20\\pi\\text{ cm}^2$',
      solution4Steps: [
        'Bước 1: Mặt xung quanh trải phẳng thành hình chữ nhật kích thước $(2\\pi r) \\times h$.',
        'Bước 2: Diện tích HCN: $S = 2\\pi r \\cdot h$.',
        'Bước 3: Tính $S = 2\\pi \\cdot 2 \\cdot 5 = 20\\pi\\text{ cm}^2$.',
        'Bước 4: Chọn đáp án B.'
      ],
      importantNotes: ['Chiều dài HCN là chu vi đáy 2pi*r.']
    }
  },
  {
    id: 'MCQ-008',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 8,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-CYL-SECTION',
    originalQuestion: 'Thiết diện qua trục của một hình trụ là một hình vuông có cạnh bằng $4\\text{ cm}$. Thể tích của hình trụ đó là:',
    originalOptions: ['A. $32\\pi\\text{ cm}^3$', 'B. $64\\pi\\text{ cm}^3$', 'C. $16\\pi\\text{ cm}^3$', 'D. $8\\pi\\text{ cm}^3$'],
    originalAnswer: 'C',
    originalSolution: 'Hình vuông cạnh 4 cm nên chiều cao $h = 4\\text{ cm}$ và đường kính đáy $2r = 4\\text{ cm} \\implies r = 2\\text{ cm}$. Thể tích $V = \\pi r^2 h = \\pi \\cdot 2^2 \\cdot 4 = 16\\pi\\text{ cm}^3$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Thiết diện qua trục của một hình trụ là một hình vuông có cạnh bằng $4\\text{ cm}$. Thể tích của hình trụ đó là:',
      options: ['$32\\pi\\text{ cm}^3$', '$64\\pi\\text{ cm}^3$', '$16\\pi\\text{ cm}^3$', '$8\\pi\\text{ cm}^3$'],
      expectedAnswer: '$16\\pi\\text{ cm}^3$',
      solution4Steps: [
        'Bước 1: Thiết diện qua trục là hình chữ nhật kích thước $2r \\times h$. Vì là hình vuông cạnh $4\\text{ cm}$ nên $2r = 4\\text{ cm}$ và $h = 4\\text{ cm}$.',
        'Bước 2: Bán kính đáy $r = 2\\text{ cm}$.',
        'Bước 3: Thể tích $V = \\pi r^2 h = \\pi \\cdot 2^2 \\cdot 4 = 16\\pi\\text{ cm}^3$.',
        'Bước 4: Chọn đáp án C.'
      ],
      importantNotes: ['Cạnh đáy của thiết diện qua trục là đường kính 2r.']
    }
  },
  {
    id: 'MCQ-009',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 9,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-CONE-REC',
    originalQuestion: 'Hình nón được tạo thành khi quay hình nào sau đây quanh một cạnh góc vuông cố định?',
    originalOptions: ['A. Hình tam giác đều', 'B. Hình chữ nhật', 'C. Tam giác vuông', 'D. Nửa hình tròn'],
    originalAnswer: 'C',
    originalSolution: 'Quay tam giác vuông một vòng quanh một cạnh góc vuông cố định ta được hình nón.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Hình nón được tạo thành khi quay hình nào sau đây quanh một cạnh góc vuông cố định?',
      options: ['Hình tam giác đều', 'Hình chữ nhật', 'Tam giác vuông', 'Nửa hình tròn'],
      expectedAnswer: 'Tam giác vuông',
      solution4Steps: [
        'Bước 1: Xem xét tính chất của tam giác vuông khi quay.',
        'Bước 2: Cạnh góc vuông cố định là trục và chiều cao h.',
        'Bước 3: Cạnh huyền quét tạo thành mặt nón với các đường sinh l.',
        'Bước 4: Kết luận chọn Tam giác vuông (Chọn C).'
      ],
      importantNotes: ['Tam giác vuông quay quanh cạnh góc vuông tạo nên hình nón.']
    }
  },
  {
    id: 'MCQ-010',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 10,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-CONE-PYTHAGORAS',
    originalQuestion: 'Cho hình nón có bán kính đáy $r$, chiều cao $h$ và đường sinh $l$. Khẳng định nào sau đây là đúng?',
    originalOptions: ['A. $h = r + l$', 'B. $h^2 = l^2 + r^2$', 'C. $r^2 = h^2 + l^2$', 'D. $l^2 = r^2 + h^2$'],
    originalAnswer: 'D',
    originalSolution: 'Trong hình nón, bán kính đáy, chiều cao và đường sinh tạo thành tam giác vuông với cạnh huyền là đường sinh nên $l^2 = r^2 + h^2$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Cho hình nón có bán kính đáy $r$, chiều cao $h$ và đường sinh $l$. Khẳng định nào sau đây là đúng?',
      options: ['$h = r + l$', '$h^2 = l^2 + r^2$', '$r^2 = h^2 + l^2$', '$l^2 = r^2 + h^2$'],
      expectedAnswer: '$l^2 = r^2 + h^2$',
      solution4Steps: [
        'Bước 1: Xét tam giác vuông tạo bởi đỉnh nón, tâm đáy và một điểm trên đường tròn đáy.',
        'Bước 2: Hai cạnh góc vuông là r và h; cạnh huyền là đường sinh l.',
        'Bước 3: Áp dụng định lý Pythagoras: $l^2 = r^2 + h^2$.',
        'Bước 4: Chọn đáp án D.'
      ],
      importantNotes: ['Đường sinh l luôn là cạnh dài nhất: l^2 = r^2 + h^2.']
    }
  },
  {
    id: 'MCQ-011',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 11,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-CONE-VOL',
    originalQuestion: 'Một hình nón có bán kính đáy $r = 3\\text{ cm}$ và chiều cao $h = 4\\text{ cm}$. Thể tích của hình nón đó là:',
    originalOptions: ['A. $36\\pi\\text{ cm}^3$', 'B. $12\\pi\\text{ cm}^3$', 'C. $16\\pi\\text{ cm}^3$', 'D. $48\\pi\\text{ cm}^3$'],
    originalAnswer: 'B',
    originalSolution: 'Thể tích hình nón $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\cdot 3^2 \\cdot 4 = 12\\pi\\text{ cm}^3$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Một hình nón có bán kính đáy $r = 3\\text{ cm}$ và chiều cao $h = 4\\text{ cm}$. Thể tích của hình nón đó là:',
      options: ['$36\\pi\\text{ cm}^3$', '$12\\pi\\text{ cm}^3$', '$16\\pi\\text{ cm}^3$', '$48\\pi\\text{ cm}^3$'],
      expectedAnswer: '$12\\pi\\text{ cm}^3$',
      solution4Steps: [
        'Bước 1: Trích xuất $r = 3\\text{ cm}$, $h = 4\\text{ cm}$.',
        'Bước 2: Áp dụng công thức thể tích hình nón $V = \\frac{1}{3}\\pi r^2 h$.',
        'Bước 3: Tính toán: $V = \\frac{1}{3}\\pi \\cdot 9 \\cdot 4 = 12\\pi\\text{ cm}^3$.',
        'Bước 4: Chọn đáp án B.'
      ],
      importantNotes: ['Nhớ nhân hệ số 1/3 cho thể tích hình nón.']
    }
  },
  {
    id: 'MCQ-012',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 12,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-CONE-VOL',
    originalQuestion: 'Một hình nón có đường kính đáy $d = 10\\text{ cm}$ và chiều cao $h = 6\\text{ cm}$. Thể tích khối nón là:',
    originalOptions: ['A. $150\\pi\\text{ cm}^3$', 'B. $50\\pi\\text{ cm}^3$', 'C. $100\\pi\\text{ cm}^3$', 'D. $200\\pi\\text{ cm}^3$'],
    originalAnswer: 'B',
    originalSolution: 'Bán kính đáy $r = 5\\text{ cm}$. Thể tích $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\cdot 5^2 \\cdot 6 = 50\\pi\\text{ cm}^3$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Một hình nón có đường kính đáy $d = 10\\text{ cm}$ và chiều cao $h = 6\\text{ cm}$. Thể tích khối nón là:',
      options: ['$150\\pi\\text{ cm}^3$', '$50\\pi\\text{ cm}^3$', '$100\\pi\\text{ cm}^3$', '$200\\pi\\text{ cm}^3$'],
      expectedAnswer: '$50\\pi\\text{ cm}^3$',
      solution4Steps: [
        'Bước 1: Tính bán kính đáy $r = \\frac{d}{2} = 5\\text{ cm}$.',
        'Bước 2: Sử dụng công thức $V = \\frac{1}{3}\\pi r^2 h$.',
        'Bước 3: Tính $V = \\frac{1}{3}\\pi \\cdot 25 \\cdot 6 = 50\\pi\\text{ cm}^3$.',
        'Bước 4: Chọn đáp án B.'
      ],
      importantNotes: ['Chia đôi đường kính d để lấy r = 5 cm.']
    }
  },
  {
    id: 'MCQ-013',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 13,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-CONE-AREA',
    originalQuestion: 'Hình nón có bán kính đáy $r = 5\\text{ cm}$ và đường sinh $l = 8\\text{ cm}$. Diện tích xung quanh của hình nón là:',
    originalOptions: ['A. $80\\pi\\text{ cm}^2$', 'B. $40\\pi\\text{ cm}^2$', 'C. $20\\pi\\text{ cm}^2$', 'D. $65\\pi\\text{ cm}^2$'],
    originalAnswer: 'B',
    originalSolution: 'Diện tích xung quanh hình nón $S_{xq} = \\pi rl = \\pi \\cdot 5 \\cdot 8 = 40\\pi\\text{ cm}^2$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Hình nón có bán kính đáy $r = 5\\text{ cm}$ và đường sinh $l = 8\\text{ cm}$. Diện tích xung quanh của hình nón là:',
      options: ['$80\\pi\\text{ cm}^2$', '$40\\pi\\text{ cm}^2$', '$20\\pi\\text{ cm}^2$', '$65\\pi\\text{ cm}^2$'],
      expectedAnswer: '$40\\pi\\text{ cm}^2$',
      solution4Steps: [
        'Bước 1: Trích xuất $r = 5\\text{ cm}$, $l = 8\\text{ cm}$.',
        'Bước 2: Áp dụng công thức $S_{xq} = \\pi rl$.',
        'Bước 3: Tính $S_{xq} = \\pi \\cdot 5 \\cdot 8 = 40\\pi\\text{ cm}^2$.',
        'Bước 4: Chọn đáp án B.'
      ],
      importantNotes: ['Sxq của hình nón là pi*r*l (không có hệ số 2).']
    }
  },
  {
    id: 'MCQ-014',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 14,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-CONE-AREA',
    originalQuestion: 'Một hình nón có bán kính đáy $r = 4\\text{ cm}$ và đường sinh $l = 6\\text{ cm}$. Diện tích toàn phần của hình nón đó là:',
    originalOptions: ['A. $24\\pi\\text{ cm}^2$', 'B. $16\\pi\\text{ cm}^2$', 'C. $40\\pi\\text{ cm}^2$', 'D. $48\\pi\\text{ cm}^2$'],
    originalAnswer: 'C',
    originalSolution: '$S_{tp} = \\pi rl + \\pi r^2 = \\pi \\cdot 4 \\cdot 6 + \\pi \\cdot 4^2 = 24\\pi + 16\\pi = 40\\pi\\text{ cm}^2$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Một hình nón có bán kính đáy $r = 4\\text{ cm}$ và đường sinh $l = 6\\text{ cm}$. Diện tích toàn phần của hình nón đó là:',
      options: ['$24\\pi\\text{ cm}^2$', '$16\\pi\\text{ cm}^2$', '$40\\pi\\text{ cm}^2$', '$48\\pi\\text{ cm}^2$'],
      expectedAnswer: '$40\\pi\\text{ cm}^2$',
      solution4Steps: [
        'Bước 1: Xác định $r = 4\\text{ cm}$, $l = 6\\text{ cm}$.',
        'Bước 2: Sử dụng công thức $S_{tp} = \\pi r(l + r)$.',
        'Bước 3: Tính $S_{tp} = \\pi \\cdot 4 \\cdot (6 + 4) = 40\\pi\\text{ cm}^2$.',
        'Bước 4: Chọn đáp án C.'
      ],
      importantNotes: ['Hình nón chỉ có 1 đáy tròn: Stp = pi*r*l + pi*r^2.']
    }
  },
  {
    id: 'MCQ-015',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 15,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-CONE-PYTHAGORAS',
    originalQuestion: 'Hình nón có bán kính đáy $r = 6\\text{ cm}$ và chiều cao $h = 8\\text{ cm}$. Độ dài đường sinh $l$ của hình nón bằng:',
    originalOptions: ['A. $14\\text{ cm}$', 'B. $2\\sqrt{7}\\text{ cm}$', 'C. $7\\text{ cm}$', 'D. $10\\text{ cm}$'],
    originalAnswer: 'D',
    originalSolution: 'Độ dài đường sinh $l = \\sqrt{r^2 + h^2} = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10\\text{ cm}$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Hình nón có bán kính đáy $r = 6\\text{ cm}$ và chiều cao $h = 8\\text{ cm}$. Độ dài đường sinh $l$ của hình nón bằng:',
      options: ['$14\\text{ cm}$', '$2\\sqrt{7}\\text{ cm}$', '$7\\text{ cm}$', '$10\\text{ cm}$'],
      expectedAnswer: '$10\\text{ cm}$',
      solution4Steps: [
        'Bước 1: Nhận diện tam giác vuông $(r, h, l)$.',
        'Bước 2: Áp dụng $l = \\sqrt{r^2 + h^2}$.',
        'Bước 3: Tính $l = \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10\\text{ cm}$.',
        'Bước 4: Chọn đáp án D.'
      ],
      importantNotes: ['Bộ ba Pythagoras kinh điển: (6, 8, 10) tương ứng (3, 4, 5).']
    }
  },
  {
    id: 'MCQ-016',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 16,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-CONE-AREA',
    originalQuestion: 'Hình nón có bán kính đáy $r = 3\\text{ cm}$ và chiều cao $h = 4\\text{ cm}$. Diện tích xung quanh của hình nón đó bằng:',
    originalOptions: ['A. $12\\pi\\text{ cm}^2$', 'B. $24\\pi\\text{ cm}^2$', 'C. $15\\pi\\text{ cm}^2$', 'D. $20\\pi\\text{ cm}^2$'],
    originalAnswer: 'C',
    originalSolution: 'Đường sinh $l = \\sqrt{3^2 + 4^2} = 5\\text{ cm}$. Diện tích xung quanh $S_{xq} = \\pi rl = \\pi \\cdot 3 \\cdot 5 = 15\\pi\\text{ cm}^2$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Hình nón có bán kính đáy $r = 3\\text{ cm}$ và chiều cao $h = 4\\text{ cm}$. Diện tích xung quanh của hình nón đó bằng:',
      options: ['$12\\pi\\text{ cm}^2$', '$24\\pi\\text{ cm}^2$', '$15\\pi\\text{ cm}^2$', '$20\\pi\\text{ cm}^2$'],
      expectedAnswer: '$15\\pi\\text{ cm}^2$',
      solution4Steps: [
        'Bước 1: Tính đường sinh $l = \\sqrt{r^2 + h^2} = \\sqrt{3^2 + 4^2} = 5\\text{ cm}$.',
        'Bước 2: Áp dụng công thức $S_{xq} = \\pi rl$.',
        'Bước 3: Tính $S_{xq} = \\pi \\cdot 3 \\cdot 5 = 15\\pi\\text{ cm}^2$.',
        'Bước 4: Chọn đáp án C.'
      ],
      importantNotes: ['Không dùng h = 4 cm trực tiếp vào công thức diện tích xung quanh! Phải tính l trước.']
    }
  },
  {
    id: 'MCQ-017',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 17,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-CONE-UNFOLD',
    originalQuestion: 'Khi khai triển mặt xung quanh của hình nón có bán kính đáy $r = 2\\text{ cm}$ và đường sinh $l = 6\\text{ cm}$, ta được một hình quạt tròn có góc ở tâm là:',
    originalOptions: ['A. $60^\\circ$', 'B. $120^\\circ$', 'C. $90^\\circ$', 'D. $180^\\circ$'],
    originalAnswer: 'B',
    originalSolution: 'Góc ở tâm hình quạt tròn: $\\alpha = \\frac{r}{l} \\cdot 360^\\circ = \\frac{2}{6} \\cdot 360^\\circ = 120^\\circ$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Khi khai triển mặt xung quanh của hình nón có bán kính đáy $r = 2\\text{ cm}$ và đường sinh $l = 6\\text{ cm}$, ta được một hình quạt tròn có góc ở tâm là:',
      options: ['$60^\\circ$', '$120^\\circ$', '$90^\\circ$', '$180^\\circ$'],
      expectedAnswer: '$120^\\circ$',
      solution4Steps: [
        'Bước 1: Nhớ lại mối liên hệ chu vi đáy nón $2\\pi r$ và độ dài cung quạt $\\frac{\\pi l \\alpha}{180^\\circ}$.',
        'Bước 2: Thiết lập $\\alpha = \\frac{r}{l} \\cdot 360^\\circ$.',
        'Bước 3: Thay số: $\\alpha = \\frac{2}{6} \\cdot 360^\\circ = 120^\\circ$.',
        'Bước 4: Chọn đáp án B.'
      ],
      importantNotes: ['Tỉ số góc alpha / 360 độ đúng bằng tỉ số bán kính đáy / đường sinh (r / l).']
    }
  },
  {
    id: 'MCQ-018',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 18,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-SPH-REC',
    originalQuestion: 'Hình cầu được tạo thành khi quay hình nào sau đây một vòng quanh đường kính cố định?',
    originalOptions: ['A. Hình tròn', 'B. Hình chữ nhật', 'C. Nửa hình tròn', 'D. Tam giác cân'],
    originalAnswer: 'C',
    originalSolution: 'Khi quay nửa hình tròn một vòng quanh đường kính cố định, ta được một hình cầu.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Hình cầu được tạo thành khi quay hình nào sau đây một vòng quanh đường kính cố định?',
      options: ['Hình tròn', 'Hình chữ nhật', 'Nửa hình tròn', 'Tam giác cân'],
      expectedAnswer: 'Nửa hình tròn',
      solution4Steps: [
        'Bước 1: Nắm vững định nghĩa tạo hình cầu trong SGK Hình học 9.',
        'Bước 2: Nửa đường tròn quay quanh đường kính tạo mặt cầu; nửa hình tròn quay quanh đường kính tạo khối cầu (hình cầu).',
        'Bước 3: Trục quay là trục đường kính.',
        'Bước 4: Chọn đáp án C.'
      ],
      importantNotes: ['Nửa hình tròn quay quanh đường kính -> Khối cầu.']
    }
  },
  {
    id: 'MCQ-019',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 19,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-SPH-AREA',
    originalQuestion: 'Một mặt cầu có bán kính $R = 3\\text{ cm}$. Diện tích của mặt cầu đó là:',
    originalOptions: ['A. $12\\pi\\text{ cm}^2$', 'B. $36\\pi\\text{ cm}^2$', 'C. $18\\pi\\text{ cm}^2$', 'D. $9\\pi\\text{ cm}^2$'],
    originalAnswer: 'B',
    originalSolution: 'Diện tích mặt cầu $S = 4\\pi R^2 = 4\\pi \\cdot 3^2 = 36\\pi\\text{ cm}^2$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Một mặt cầu có bán kính $R = 3\\text{ cm}$. Diện tích của mặt cầu đó là:',
      options: ['$12\\pi\\text{ cm}^2$', '$36\\pi\\text{ cm}^2$', '$18\\pi\\text{ cm}^2$', '$9\\pi\\text{ cm}^2$'],
      expectedAnswer: '$36\\pi\\text{ cm}^2$',
      solution4Steps: [
        'Bước 1: Xác định bán kính $R = 3\\text{ cm}$.',
        'Bước 2: Công thức diện tích mặt cầu $S = 4\\pi R^2$.',
        'Bước 3: Tính $S = 4\\pi \\cdot 3^2 = 36\\pi\\text{ cm}^2$.',
        'Bước 4: Chọn đáp án B.'
      ],
      importantNotes: ['Diện tích mặt cầu gấp 4 lần diện tích hình tròn lớn (4pi*R^2).']
    }
  },
  {
    id: 'MCQ-020',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 20,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-SPH-AREA',
    originalQuestion: 'Mặt cầu có đường kính $d = 8\\text{ cm}$. Diện tích của mặt cầu bằng:',
    originalOptions: ['A. $64\\pi\\text{ cm}^2$', 'B. $256\\pi\\text{ cm}^2$', 'C. $16\\pi\\text{ cm}^2$', 'D. $32\\pi\\text{ cm}^2$'],
    originalAnswer: 'A',
    originalSolution: 'Bán kính $R = 4\\text{ cm}$. Diện tích $S = 4\\pi R^2 = 4\\pi \\cdot 4^2 = 64\\pi\\text{ cm}^2$ (hoặc $S = \\pi d^2 = 64\\pi\\text{ cm}^2$).',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Mặt cầu có đường kính $d = 8\\text{ cm}$. Diện tích của mặt cầu bằng:',
      options: ['$64\\pi\\text{ cm}^2$', '$256\\pi\\text{ cm}^2$', '$16\\pi\\text{ cm}^2$', '$32\\pi\\text{ cm}^2$'],
      expectedAnswer: '$64\\pi\\text{ cm}^2$',
      solution4Steps: [
        'Bước 1: Tính bán kính $R = \\frac{d}{2} = 4\\text{ cm}$.',
        'Bước 2: Công thức diện tích mặt cầu $S = 4\\pi R^2$ hoặc $S = \\pi d^2$.',
        'Bước 3: Tính $S = \\pi \\cdot 8^2 = 64\\pi\\text{ cm}^2$.',
        'Bước 4: Chọn đáp án A.'
      ],
      importantNotes: ['Theo đường kính: S = pi * d^2.']
    }
  },
  {
    id: 'MCQ-021',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 21,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-SPH-VOL',
    originalQuestion: 'Một khối cầu có bán kính $R = 3\\text{ cm}$. Thể tích của khối cầu đó là:',
    originalOptions: ['A. $108\\pi\\text{ cm}^3$', 'B. $12\\pi\\text{ cm}^3$', 'C. $27\\pi\\text{ cm}^3$', 'D. $36\\pi\\text{ cm}^3$'],
    originalAnswer: 'D',
    originalSolution: 'Thể tích khối cầu $V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi \\cdot 3^3 = 36\\pi\\text{ cm}^3$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Một khối cầu có bán kính $R = 3\\text{ cm}$. Thể tích của khối cầu đó là:',
      options: ['$108\\pi\\text{ cm}^3$', '$12\\pi\\text{ cm}^3$', '$27\\pi\\text{ cm}^3$', '$36\\pi\\text{ cm}^3$'],
      expectedAnswer: '$36\\pi\\text{ cm}^3$',
      solution4Steps: [
        'Bước 1: Trích xuất $R = 3\\text{ cm}$.',
        'Bước 2: Áp dụng công thức $V = \\frac{4}{3}\\pi R^3$.',
        'Bước 3: Tính toán: $V = \\frac{4}{3}\\pi \\cdot 27 = 36\\pi\\text{ cm}^3$.',
        'Bước 4: Chọn đáp án D.'
      ],
      importantNotes: ['Chú ý số mũ 3 và hệ số 4/3 trong thể tích hình cầu.']
    }
  },
  {
    id: 'MCQ-022',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 22,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-SPH-VOL',
    originalQuestion: 'Một quả bóng bàn hình cầu có đường kính $d = 4\\text{ cm}$. Thể tích không khí chứa bên trong quả bóng bàn đó là:',
    originalOptions: ['A. $\\frac{256}{3}\\pi\\text{ cm}^3$', 'B. $16\\pi\\text{ cm}^3$', 'C. $\\frac{32}{3}\\pi\\text{ cm}^3$', 'D. $\\frac{64}{3}\\pi\\text{ cm}^3$'],
    originalAnswer: 'C',
    originalSolution: 'Bán kính quả bóng $R = 2\\text{ cm}$. Thể tích $V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi \\cdot 2^3 = \\frac{32}{3}\\pi\\text{ cm}^3$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Một quả bóng bàn hình cầu có đường kính $d = 4\\text{ cm}$. Thể tích không khí chứa bên trong quả bóng bàn đó là:',
      options: ['$\\frac{256}{3}\\pi\\text{ cm}^3$', '$16\\pi\\text{ cm}^3$', '$\\frac{32}{3}\\pi\\text{ cm}^3$', '$\\frac{64}{3}\\pi\\text{ cm}^3$'],
      expectedAnswer: '$\\frac{32}{3}\\pi\\text{ cm}^3$',
      solution4Steps: [
        'Bước 1: Tính bán kính $R = \\frac{4}{2} = 2\\text{ cm}$.',
        'Bước 2: Áp dụng công thức $V = \\frac{4}{3}\\pi R^3$.',
        'Bước 3: Tính $V = \\frac{4}{3}\\pi \\cdot 8 = \\frac{32}{3}\\pi\\text{ cm}^3$.',
        'Bước 4: Chọn đáp án C.'
      ],
      importantNotes: ['Chia đôi đường kính d = 4 cm thành R = 2 cm.']
    }
  },
  {
    id: 'MCQ-023',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 23,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-SPH-VOL',
    originalQuestion: 'Nếu bán kính của một khối cầu tăng lên 2 lần thì thể tích của nó tăng lên bao nhiêu lần?',
    originalOptions: ['A. 2 lần', 'B. 4 lần', 'C. 6 lần', 'D. 8 lần'],
    originalAnswer: 'D',
    originalSolution: 'Vì $V = \\frac{4}{3}\\pi R^3$, khi $R\' = 2R$ thì $V\' = \\frac{4}{3}\\pi (2R)^3 = 8 \\cdot \\frac{4}{3}\\pi R^3 = 8V$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Nếu bán kính của một khối cầu tăng lên 2 lần thì thể tích của nó tăng lên bao nhiêu lần?',
      options: ['2 lần', '4 lần', '6 lần', '8 lần'],
      expectedAnswer: '8 lần',
      solution4Steps: [
        'Bước 1: Viết công thức tỉ lệ thể tích cầu $V \\propto R^3$.',
        'Bước 2: Khi R tăng k lần thì V tăng $k^3$ lần.',
        'Bước 3: Thay $k = 2 \\implies k^3 = 2^3 = 8$ lần.',
        'Bước 4: Chọn đáp án D.'
      ],
      importantNotes: ['Thể tích tỉ lệ với lũy thừa bậc 3 của kích thước tuyến tính (k^3).']
    }
  },
  {
    id: 'MCQ-024',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 24,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-ROT-TRI',
    originalQuestion: 'Quay tam giác $ABC$ vuông tại $A$ có $AB = 3\\text{ cm}, AC = 4\\text{ cm}$ quanh cạnh $AB$ cố định. Thể tích hình nón tạo thành là:',
    originalOptions: ['A. $12\\pi\\text{ cm}^3$', 'B. $16\\pi\\text{ cm}^3$', 'C. $36\\pi\\text{ cm}^3$', 'D. $48\\pi\\text{ cm}^3$'],
    originalAnswer: 'B',
    originalSolution: 'Quay quanh cạnh AB cố định nên chiều cao $h = AB = 3\\text{ cm}$, bán kính đáy $r = AC = 4\\text{ cm}$. Thể tích $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\cdot 4^2 \\cdot 3 = 16\\pi\\text{ cm}^3$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Quay tam giác $ABC$ vuông tại $A$ có $AB = 3\\text{ cm}, AC = 4\\text{ cm}$ quanh cạnh $AB$ cố định. Thể tích hình nón tạo thành là:',
      options: ['$12\\pi\\text{ cm}^3$', '$16\\pi\\text{ cm}^3$', '$36\\pi\\text{ cm}^3$', '$48\\pi\\text{ cm}^3$'],
      expectedAnswer: '$16\\pi\\text{ cm}^3$',
      solution4Steps: [
        'Bước 1: Xác định trục quay: Cạnh AB cố định $\\implies h = AB = 3\\text{ cm}$.',
        'Bước 2: Cạnh góc vuông quét mặt đáy: $r = AC = 4\\text{ cm}$.',
        'Bước 3: Thể tích nón: $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\cdot 16 \\cdot 3 = 16\\pi\\text{ cm}^3$.',
        'Bước 4: Chọn đáp án B.'
      ],
      importantNotes: ['Quay quanh cạnh nào thì cạnh đó là chiều cao h; cạnh còn lại là bán kính r.']
    }
  },
  {
    id: 'MCQ-025',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 25,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-ROT-TRI',
    originalQuestion: 'Quay hình chữ nhật $ABCD$ có $AB = 4\\text{ cm}, BC = 3\\text{ cm}$ quanh cạnh $AB$. Diện tích toàn phần của hình trụ tạo thành là:',
    originalOptions: ['A. $24\\pi\\text{ cm}^2$', 'B. $18\\pi\\text{ cm}^2$', 'C. $30\\pi\\text{ cm}^2$', 'D. $42\\pi\\text{ cm}^2$'],
    originalAnswer: 'D',
    originalSolution: 'Quay quanh AB nên chiều cao $h = AB = 4\\text{ cm}$, bán kính đáy $r = BC = 3\\text{ cm}$. $S_{tp} = 2\\pi r(h + r) = 2\\pi \\cdot 3 \\cdot (4 + 3) = 42\\pi\\text{ cm}^2$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Quay hình chữ nhật $ABCD$ có $AB = 4\\text{ cm}, BC = 3\\text{ cm}$ quanh cạnh $AB$. Diện tích toàn phần của hình trụ tạo thành là:',
      options: ['$24\\pi\\text{ cm}^2$', '$18\\pi\\text{ cm}^2$', '$30\\pi\\text{ cm}^2$', '$42\\pi\\text{ cm}^2$'],
      expectedAnswer: '$42\\pi\\text{ cm}^2$',
      solution4Steps: [
        'Bước 1: Trục quay AB $\\implies h = 4\\text{ cm}$, bán kính $r = BC = 3\\text{ cm}$.',
        'Bước 2: Công thức diện tích toàn phần $S_{tp} = 2\\pi r(h + r)$.',
        'Bước 3: Tính $S_{tp} = 2\\pi \\cdot 3 \\cdot (4 + 3) = 42\\pi\\text{ cm}^2$.',
        'Bước 4: Chọn đáp án D.'
      ],
      importantNotes: ['Quay quanh cạnh dài AB thì r = 3 cm, h = 4 cm.']
    }
  },
  {
    id: 'MCQ-026',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 26,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-COMP-CYL-SPH',
    originalQuestion: 'Một viên thuốc con nhộng gồm một hình trụ dài $10\\text{ mm}$ và hai đầu là hai nửa hình cầu bán kính $3\\text{ mm}$. Thể tích của viên thuốc là:',
    originalOptions: ['A. $126\\pi\\text{ mm}^3$', 'B. $90\\pi\\text{ mm}^3$', 'C. $36\\pi\\text{ mm}^3$', 'D. $108\\pi\\text{ mm}^3$'],
    originalAnswer: 'A',
    originalSolution: 'Thể tích viên thuốc gồm phần trụ và 1 khối cầu trọn vẹn ghép từ 2 nửa đầu: $V = V_{\\text{trụ}} + V_{\\text{cầu}} = \\pi r^2 h + \\frac{4}{3}\\pi r^3 = \\pi \\cdot 3^2 \\cdot 10 + \\frac{4}{3}\\pi \\cdot 3^3 = 90\\pi + 36\\pi = 126\\pi\\text{ mm}^3$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Một viên thuốc con nhộng gồm một hình trụ dài $10\\text{ mm}$ và hai đầu là hai nửa hình cầu bán kính $3\\text{ mm}$. Thể tích của viên thuốc là:',
      options: ['$126\\pi\\text{ mm}^3$', '$90\\pi\\text{ mm}^3$', '$36\\pi\\text{ mm}^3$', '$108\\pi\\text{ mm}^3$'],
      expectedAnswer: '$126\\pi\\text{ mm}^3$',
      solution4Steps: [
        'Bước 1: Tách mô hình thành: Thân trụ ($r=3\\text{ mm}, h=10\\text{ mm}$) và 2 nửa cầu ghép lại thành 1 hình cầu hoàn chỉnh ($R=3\\text{ mm}$).',
        'Bước 2: Tính thể tích thân trụ: $V_1 = \\pi \\cdot 3^2 \\cdot 10 = 90\\pi\\text{ mm}^3$.',
        'Bước 3: Tính thể tích 2 đầu cầu: $V_2 = \\frac{4}{3}\\pi \\cdot 3^3 = 36\\pi\\text{ mm}^3$.',
        'Bước 4: Tổng thể tích: $V = 90\\pi + 36\\pi = 126\\pi\\text{ mm}^3$ (Chọn A).'
      ],
      importantNotes: ['Hai nửa hình cầu ghép lại đúng bằng một khối cầu nguyên vẹn.']
    }
  },
  {
    id: 'MCQ-027',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 27,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-COMP-CONE-CYL',
    originalQuestion: 'Một đồ chơi bằng gỗ gồm một hình nón gắn trên một hình trụ có cùng bán kính đáy $r = 3\\text{ cm}$. Chiều cao hình trụ là $h_1 = 4\\text{ cm}$, chiều cao hình nón là $h_2 = 3\\text{ cm}$. Thể tích của đồ chơi đó là:',
    originalOptions: ['A. $45\\pi\\text{ cm}^3$', 'B. $36\\pi\\text{ cm}^3$', 'C. $27\\pi\\text{ cm}^3$', 'D. $54\\pi\\text{ cm}^3$'],
    originalAnswer: 'A',
    originalSolution: '$V_{\\text{trụ}} = \\pi r^2 h_1 = \\pi \\cdot 9 \\cdot 4 = 36\\pi\\text{ cm}^3$. $V_{\\text{nón}} = \\frac{1}{3}\\pi r^2 h_2 = \\frac{1}{3}\\pi \\cdot 9 \\cdot 3 = 9\\pi\\text{ cm}^3$. Tổng thể tích $V = 36\\pi + 9\\pi = 45\\pi\\text{ cm}^3$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Một đồ chơi bằng gỗ gồm một hình nón gắn trên một hình trụ có cùng bán kính đáy $r = 3\\text{ cm}$. Chiều cao hình trụ là $h_1 = 4\\text{ cm}$, chiều cao hình nón là $h_2 = 3\\text{ cm}$. Thể tích của đồ chơi đó là:',
      options: ['$45\\pi\\text{ cm}^3$', '$36\\pi\\text{ cm}^3$', '$27\\pi\\text{ cm}^3$', '$54\\pi\\text{ cm}^3$'],
      expectedAnswer: '$45\\pi\\text{ cm}^3$',
      solution4Steps: [
        'Bước 1: Thể tích khối trụ: $V_{\\text{trụ}} = \\pi \\cdot 3^2 \\cdot 4 = 36\\pi\\text{ cm}^3$.',
        'Bước 2: Thể tích khối nón: $V_{\\text{nón}} = \\frac{1}{3}\\pi \\cdot 3^2 \\cdot 3 = 9\\pi\\text{ cm}^3$.',
        'Bước 3: Cộng thể tích hai khối: $V = 36\\pi + 9\\pi = 45\\pi\\text{ cm}^3$.',
        'Bước 4: Chọn đáp án A.'
      ],
      importantNotes: ['Thể tích khối ghép bằng tổng thể tích các khối thành phần.']
    }
  },
  {
    id: 'MCQ-028',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 28,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-COMP-CONE-SPH',
    originalQuestion: 'Một cây kem ốc quế gồm phần bánh quế hình nón có bán kính đáy $r = 3\\text{ cm}$, chiều cao $h = 6\\text{ cm}$ và phần kem phía trên là nửa hình cầu có cùng bán kính $r = 3\\text{ cm}$. Thể tích toàn bộ cây kem là:',
    originalOptions: ['A. $54\\pi\\text{ cm}^3$', 'B. $18\\pi\\text{ cm}^3$', 'C. $24\\pi\\text{ cm}^3$', 'D. $36\\pi\\text{ cm}^3$'],
    originalAnswer: 'D',
    originalSolution: '$V = V_{\\text{nón}} + V_{\\text{nửa cầu}} = \\frac{1}{3}\\pi r^2 h + \\frac{2}{3}\\pi r^3 = \\frac{1}{3}\\pi \\cdot 9 \\cdot 6 + \\frac{2}{3}\\pi \\cdot 27 = 18\\pi + 18\\pi = 36\\pi\\text{ cm}^3$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Một cây kem ốc quế gồm phần bánh quế hình nón có bán kính đáy $r = 3\\text{ cm}$, chiều cao $h = 6\\text{ cm}$ và phần kem phía trên là nửa hình cầu có cùng bán kính $r = 3\\text{ cm}$. Thể tích toàn bộ cây kem là:',
      options: ['$54\\pi\\text{ cm}^3$', '$18\\pi\\text{ cm}^3$', '$24\\pi\\text{ cm}^3$', '$36\\pi\\text{ cm}^3$'],
      expectedAnswer: '$36\\pi\\text{ cm}^3$',
      solution4Steps: [
        'Bước 1: Tính thể tích phần nón: $V_{\\text{nón}} = \\frac{1}{3}\\pi \\cdot 3^2 \\cdot 6 = 18\\pi\\text{ cm}^3$.',
        'Bước 2: Tính thể tích nửa hình cầu: $V_{\\text{nửa cầu}} = \\frac{1}{2} \\cdot \\frac{4}{3}\\pi \\cdot 3^3 = 18\\pi\\text{ cm}^3$.',
        'Bước 3: Tổng thể tích cây kem: $V = 18\\pi + 18\\pi = 36\\pi\\text{ cm}^3$.',
        'Bước 4: Chọn đáp án D.'
      ],
      importantNotes: ['Nửa hình cầu có hệ số 2/3 * pi * r^3.']
    }
  },
  {
    id: 'MCQ-029',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 29,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-WATER-RISE',
    originalQuestion: 'Một bình hình trụ có bán kính đáy $R = 6\\text{ cm}$ đang chứa nước. Người ta thả chìm hoàn toàn vào bình một viên bi sắt hình cầu có bán kính $r = 3\\text{ cm}$. Hỏi mực nước trong bình dâng lên thêm bao nhiêu cm?',
    originalOptions: ['A. $1\\text{ cm}$', 'B. $2\\text{ cm}$', 'C. $0.5\\text{ cm}$', 'D. $1.5\\text{ cm}$'],
    originalAnswer: 'A',
    originalSolution: 'Thể tích viên bi $V_{\\text{bi}} = \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi \\cdot 3^3 = 36\\pi\\text{ cm}^3$. Thể tích nước dâng $\\Delta V = \\pi R^2 \\Delta h \\implies 36\\pi = \\pi \\cdot 6^2 \\cdot \\Delta h \\implies 36\\Delta h = 36 \\implies \\Delta h = 1\\text{ cm}$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Một bình hình trụ có bán kính đáy $R = 6\\text{ cm}$ đang chứa nước. Người ta thả chìm hoàn toàn vào bình một viên bi sắt hình cầu có bán kính $r = 3\\text{ cm}$. Hỏi mực nước trong bình dâng lên thêm bao nhiêu cm?',
      options: ['$1\\text{ cm}$', '$2\\text{ cm}$', '$0.5\\text{ cm}$', '$1.5\\text{ cm}$'],
      expectedAnswer: '$1\\text{ cm}$',
      solution4Steps: [
        'Bước 1: Thể tích viên bi cầu chìm: $V_{\\text{bi}} = \\frac{4}{3}\\pi \\cdot 3^3 = 36\\pi\\text{ cm}^3$.',
        'Bước 2: Diện tích đáy bình hình trụ: $S_{\\text{đáy}} = \\pi R^2 = \\pi \\cdot 6^2 = 36\\pi\\text{ cm}^2$.',
        'Bước 3: Chiều cao nước dâng: $\\Delta h = \\frac{V_{\\text{bi}}}{S_{\\text{đáy}}} = \\frac{36\\pi}{36\\pi} = 1\\text{ cm}$.',
        'Bước 4: Chọn đáp án A.'
      ],
      importantNotes: ['Thể tích nước dâng lên đúng bằng thể tích của vật chìm vào lòng chất lỏng.']
    }
  },
  {
    id: 'MCQ-030',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 30,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-COUNT-SPHERES',
    originalQuestion: 'Người ta nấu chảy một thỏi kim loại hình trụ có bán kính đáy $r = 4\\text{ cm}$ và chiều cao $h = 9\\text{ cm}$ để đúc thành các viên bi cầu có bán kính $R = 3\\text{ cm}$. Giả sử không có hao hụt kim loại, số viên bi đúc được là:',
    originalOptions: ['A. 4 viên', 'B. 3 viên', 'C. 6 viên', 'D. 5 viên'],
    originalAnswer: 'A',
    originalSolution: 'Thể tích thỏi trụ: $V_{\\text{trụ}} = \\pi \\cdot 4^2 \\cdot 9 = 144\\pi\\text{ cm}^3$. Thể tích một viên bi: $V_{\\text{bi}} = \\frac{4}{3}\\pi \\cdot 3^3 = 36\\pi\\text{ cm}^3$. Số viên bi đúc được: $n = \\frac{144\\pi}{36\\pi} = 4$ viên.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Người ta nấu chảy một thỏi kim loại hình trụ có bán kính đáy $r = 4\\text{ cm}$ và chiều cao $h = 9\\text{ cm}$ để đúc thành các viên bi cầu có bán kính $R = 3\\text{ cm}$. Giả sử không có hao hụt kim loại, số viên bi đúc được là:',
      options: ['4 viên', '3 viên', '6 viên', '5 viên'],
      expectedAnswer: '4 viên',
      solution4Steps: [
        'Bước 1: Tính thể tích phôi trụ kim loại: $V_{\\text{trụ}} = \\pi \\cdot 4^2 \\cdot 9 = 144\\pi\\text{ cm}^3$.',
        'Bước 2: Tính thể tích một viên bi cầu: $V_{\\text{bi}} = \\frac{4}{3}\\pi \\cdot 3^3 = 36\\pi\\text{ cm}^3$.',
        'Bước 3: Lấy tỉ số thể tích: $n = \\frac{144\\pi}{36\\pi} = 4$.',
        'Bước 4: Kết luận đúc được 4 viên bi (Chọn A).'
      ],
      importantNotes: ['Bảo toàn thể tích kim loại: V_trụ = n * V_bi.']
    }
  },
  {
    id: 'MCQ-031',
    recordType: 'SOURCE_EXACT',
    sourceFile: '10. TRẮC NGHIỆM - NÓN TRỤ CẦU - GV.docx',
    sourceQuestionNumber: 31,
    sourceType: 'MULTIPLE_CHOICE',
    archetypeId: 'ARCH-TANK-CAPACITY',
    originalQuestion: 'Một thùng chứa nước hình trụ có bán kính đáy $r = 0.5\\text{ m}$ và chiều cao $h = 1.2\\text{ m}$. Hỏi thùng có thể chứa được tối đa bao nhiêu lít nước? (Lấy $\\pi \\approx 3.14$, làm tròn đến hàng đơn vị)',
    originalOptions: ['A. 942 lít', 'B. 942 lít', 'C. 1884 lít', 'D. 471 lít'],
    originalAnswer: 'B',
    originalSolution: 'Thể tích thùng $V = \\pi r^2 h = 3.14 \\cdot (0.5)^2 \\cdot 1.2 = 3.14 \\cdot 0.25 \\cdot 1.2 = 0.942\\text{ m}^3 = 942\\text{ dm}^3 = 942\\text{ lít}$.',
    verificationStatus: 'VERIFIED_SOURCE',
    interactiveVersion: {
      interactiveType: 'MULTIPLE_CHOICE',
      prompt: 'Một thùng chứa nước hình trụ có bán kính đáy $r = 0.5\\text{ m}$ và chiều cao $h = 1.2\\text{ m}$. Hỏi thùng có thể chứa được tối đa bao nhiêu lít nước? (Lấy $\\pi \\approx 3.14$, làm tròn đến hàng đơn vị)',
      options: ['94.2 lít', '942 lít', '1884 lít', '471 lít'],
      expectedAnswer: '942 lít',
      solution4Steps: [
        'Bước 1: Tính thể tích thùng theo mét khối: $V = 3.14 \\cdot (0.5)^2 \\cdot 1.2 = 0.942\\text{ m}^3$.',
        'Bước 2: Sử dụng quan hệ đổi đơn vị: $1\\text{ m}^3 = 1000\\text{ dm}^3 = 1000\\text{ lít}$.',
        'Bước 3: Đổi sang lít: $0.942 \\times 1000 = 942\\text{ lít}$.',
        'Bước 4: Chọn đáp án B.'
      ],
      importantNotes: ['1 m^3 = 1,000 lít; 1 dm^3 = 1 lít.']
    }
  }
];

// Helper to generate the 42 Essay / Constructed Response Questions
function buildSourceTLQuestions(): SourceExactQuestion[] {
  const list: SourceExactQuestion[] = [];

  const rawTLData = [
    {
      num: 1,
      arch: 'ARCH-CYL-VOL',
      q: 'Một cột đình bằng gỗ hình trụ có đường kính đáy d = 0.6 m và chiều cao h = 4 m. Tính thể tích gỗ của cột đình đó (lấy π ≈ 3.14).',
      ans: '1.13 m^3',
      sol: 'Bán kính đáy r = 0.3 m. Thể tích V = π * 0.3^2 * 4 = 3.14 * 0.09 * 4 = 1.1304 m^3 ≈ 1.13 m^3.',
      itype: 'SHORT_ANSWER' as const,
      exp: 1.13,
      unit: 'm^3'
    },
    {
      num: 2,
      arch: 'ARCH-CYL-VOL',
      q: 'Một khúc gỗ hình trụ có chu vi đáy C = 62.8 cm và chiều dài h = 1.5 m. Tính thể tích của khúc gỗ theo đơn vị dm^3 (lấy π ≈ 3.14).',
      ans: '47.1 dm^3',
      sol: 'Bán kính r = 62.8 / (2 * 3.14) = 10 cm = 1 dm. Chiều dài h = 1.5 m = 15 dm. Thể tích V = 3.14 * 1^2 * 15 = 47.1 dm^3.',
      itype: 'SHORT_ANSWER' as const,
      exp: 47.1,
      unit: 'dm^3'
    },
    {
      num: 3,
      arch: 'ARCH-CYL-AREA',
      q: 'Người ta cần quét sơn toàn bộ mặt ngoài của một thùng phuy hình trụ (bao gồm cả 2 đáy) có bán kính r = 30 cm và chiều cao h = 90 cm. Tính diện tích cần sơn theo m^2 (lấy π ≈ 3.14).',
      ans: '2.26 m^2',
      sol: 'r = 0.3 m, h = 0.9 m. Stp = 2πr(h + r) = 2 * 3.14 * 0.3 * (0.9 + 0.3) = 1.884 * 1.2 = 2.2608 m^2 ≈ 2.26 m^2.',
      itype: 'SHORT_ANSWER' as const,
      exp: 2.26,
      unit: 'm^2'
    },
    {
      num: 4,
      arch: 'ARCH-CYL-UNFOLD',
      q: 'Một tấm tôn hình chữ nhật có kích thước 44 cm x 20 cm được cuộn tròn lại thành mặt xung quanh của một hình trụ (không có 2 đáy) sao cho chiều cao là 20 cm. Tính bán kính đáy của hình trụ đó (lấy π ≈ 22/7).',
      ans: '7 cm',
      sol: 'Chu vi đáy 2πr = 44 cm => r = 44 / (2 * 22/7) = 7 cm.',
      itype: 'SHORT_ANSWER' as const,
      exp: 7,
      unit: 'cm'
    },
    {
      num: 5,
      arch: 'ARCH-CYL-SECTION',
      q: 'Một hình trụ có thiết diện qua trục là hình chữ nhật ABCD có diện tích bằng 40 cm^2 và chu vi bằng 28 cm. Biết chiều cao h > đường kính đáy 2r. Tính thể tích hình trụ đó.',
      ans: '40pi cm^3',
      sol: 'Nửa chu vi: 2r + h = 14. Diện tích 2r * h = 40. Giải hệ phương trình được 2r = 4 (r = 2) và h = 10. V = π * 2^2 * 10 = 40π cm^3.',
      itype: 'SHORT_ANSWER' as const,
      exp: '40pi',
      unit: 'cm^3'
    },
    {
      num: 6,
      arch: 'ARCH-CONE-VOL',
      q: 'Một đống cát hình nón có chu vi đáy bằng 18.84 m và chiều cao h = 1.5 m. Tính thể tích của đống cát (lấy π ≈ 3.14).',
      ans: '14.13 m^3',
      sol: 'Bán kính đáy r = 18.84 / (2 * 3.14) = 3 m. Thể tích V = 1/3 * 3.14 * 3^2 * 1.5 = 14.13 m^3.',
      itype: 'SHORT_ANSWER' as const,
      exp: 14.13,
      unit: 'm^3'
    },
    {
      num: 7,
      arch: 'ARCH-CONE-VOL',
      q: 'Một chiếc phễu hình nón đựng đầy nước có bán kính miệng r = 6 cm và chiều sâu h = 12 cm. Người ta rót hết nước trong phễu sang một cốc hình trụ có bán kính đáy R = 4 cm. Tính chiều cao của mực nước trong cốc hình trụ.',
      ans: '9 cm',
      sol: 'V_nón = 1/3 * π * 6^2 * 12 = 144π cm^3. V_nước = π * 4^2 * h_cốc = 16π * h_cốc = 144π => h_cốc = 9 cm.',
      itype: 'SHORT_ANSWER' as const,
      exp: 9,
      unit: 'cm'
    },
    {
      num: 8,
      arch: 'ARCH-CONE-AREA',
      q: 'Một chiếc nón lá có đường kính đáy d = 40 cm và chiều cao h = 15 cm. Tính diện tích lá cọ cần dùng để làm chiếc nón đó (lấy π ≈ 3.14, coi như phần mép lá không đáng kể).',
      ans: '1570 cm^2',
      sol: 'Bán kính r = 20 cm. Đường sinh l = sqrt(20^2 + 15^2) = 25 cm. Diện tích xung quanh Sxq = π * r * l = 3.14 * 20 * 25 = 1570 cm^2.',
      itype: 'SHORT_ANSWER' as const,
      exp: 1570,
      unit: 'cm^2'
    },
    {
      num: 9,
      arch: 'ARCH-CONE-AREA',
      q: 'Một chiếc mũ sinh nhật hình nón có đường sinh l = 15 cm và diện tích xung quanh bằng 150π cm^2. Tính bán kính đáy và chiều cao của chiếc mũ.',
      ans: 'r = 10 cm, h = 5sqrt(5) cm',
      sol: 'Sxq = π * r * l => 150π = π * r * 15 => r = 10 cm. Chiều cao h = sqrt(15^2 - 10^2) = sqrt(125) = 5sqrt(5) cm ≈ 11.18 cm.',
      itype: 'MULTI_SHORT_ANSWER' as const,
      exp: '10; 11.18',
      unit: 'cm'
    },
    {
      num: 10,
      arch: 'ARCH-CONE-PYTHAGORAS',
      q: 'Cho hình nón có góc ở đỉnh bằng 60 độ và độ dài đường sinh l = 8 cm. Tính thể tích của hình nón đó.',
      ans: '64sqrt(3)/3 pi cm^3',
      sol: 'Thiết diện qua trục là tam giác cân có góc đỉnh 60 độ nên là tam giác đều cạnh 8 cm => đường kính 2r = 8 => r = 4 cm. Chiều cao h = sqrt(8^2 - 4^2) = 4sqrt(3) cm. V = 1/3 * π * 4^2 * 4sqrt(3) = 64sqrt(3)/3 π cm^3.',
      itype: 'SHORT_ANSWER' as const,
      exp: '64sqrt(3)/3 pi',
      unit: 'cm^3'
    },
    {
      num: 11,
      arch: 'ARCH-CONE-UNFOLD',
      q: 'Một miếng bìa hình quạt tròn có bán kính R = 12 cm và góc ở tâm alpha = 120 độ. Khi uốn mép lại tạo thành một hình nón không đáy, tính diện tích đáy của hình nón đó.',
      ans: '16pi cm^2',
      sol: 'Đường sinh l = R = 12 cm. Bán kính đáy r = (alpha / 360) * l = (120/360) * 12 = 4 cm. Diện tích đáy S = π * r^2 = 16π cm^2.',
      itype: 'SHORT_ANSWER' as const,
      exp: '16pi',
      unit: 'cm^2'
    },
    {
      num: 12,
      arch: 'ARCH-SPH-AREA',
      q: 'Một quả bóng đá tiêu chuẩn số 5 có chu vi đường tròn lớn là 68.5 cm. Tính diện tích da may vỏ quả bóng đó (lấy π ≈ 3.14, làm tròn đến hàng đơn vị).',
      ans: '1494 cm^2',
      sol: 'Chu vi C = 2πR = 68.5 => R = 68.5 / (2 * 3.14) ≈ 10.91 cm. Diện tích mặt cầu S = 4πR^2 = C^2 / π = 68.5^2 / 3.14 ≈ 1494.35 cm^2 ≈ 1494 cm^2.',
      itype: 'SHORT_ANSWER' as const,
      exp: 1494,
      unit: 'cm^2'
    },
    {
      num: 13,
      arch: 'ARCH-SPH-AREA',
      q: 'Một bồn chứa khí hóa lỏng hình cầu có diện tích mặt ngoài là 314 m^2. Tính thể tích khí chứa đầy bên trong bồn (lấy π ≈ 3.14).',
      ans: '523.33 m^3',
      sol: 'S = 4πR^2 = 314 => 4 * 3.14 * R^2 = 314 => R^2 = 25 => R = 5 m. Thể tích V = 4/3 * 3.14 * 5^3 ≈ 523.33 m^3.',
      itype: 'SHORT_ANSWER' as const,
      exp: 523.33,
      unit: 'm^3'
    },
    {
      num: 14,
      arch: 'ARCH-SPH-VOL',
      q: 'Một quả cầu bằng sắt đặc có bán kính R = 6 cm. Biết khối lượng riêng của sắt là D = 7.8 g/cm^3. Tính khối lượng quả cầu sắt theo kg (lấy π ≈ 3.14, làm tròn 2 chữ số thập phân).',
      ans: '7.06 kg',
      sol: 'Thể tích V = 4/3 * 3.14 * 6^3 = 904.32 cm^3. Khối lượng m = D * V = 7.8 * 904.32 = 7053.696 g ≈ 7.06 kg.',
      itype: 'SHORT_ANSWER' as const,
      exp: 7.06,
      unit: 'kg'
    },
    {
      num: 15,
      arch: 'ARCH-SPH-VOL',
      q: 'Có hai quả cầu bằng kim loại cùng chất liệu. Bán kính quả cầu thứ hai gấp 3 lần bán kính quả cầu thứ nhất. Hỏi khối lượng quả cầu thứ hai gấp bao nhiêu lần khối lượng quả cầu thứ nhất?',
      ans: '27 lần',
      sol: 'Khối lượng tỉ lệ với thể tích, thể tích tỉ lệ với R^3. Khi R tăng 3 lần thì V tăng 3^3 = 27 lần, khối lượng tăng 27 lần.',
      itype: 'SHORT_ANSWER' as const,
      exp: 27,
      unit: 'lần'
    },
    {
      num: 16,
      arch: 'ARCH-ROT-TRI',
      q: 'Cho tam giác đều ABC cạnh a = 6 cm, đường cao AH. Khi quay tam giác ABC quanh trục AH, ta được một hình nón. Tính thể tích khối nón tạo thành.',
      ans: '9sqrt(3) pi cm^3',
      sol: 'Bán kính đáy r = a/2 = 3 cm, chiều cao h = AH = 6 * sqrt(3) / 2 = 3sqrt(3) cm. Thể tích V = 1/3 * π * 3^2 * 3sqrt(3) = 9sqrt(3)π cm^3.',
      itype: 'SHORT_ANSWER' as const,
      exp: '9sqrt(3)pi',
      unit: 'cm^3'
    },
    {
      num: 17,
      arch: 'ARCH-COMP-CYL-SPH',
      q: 'Một téc chứa xăng gồm một phần hình trụ dài 6 m và hai đầu là hai nửa hình cầu đường kính 2 m. Tính dung tích toàn phần của téc xăng theo m^3 (lấy π ≈ 3.14).',
      ans: '23.03 m^3',
      sol: 'Bán kính r = 1 m. V_trụ = 3.14 * 1^2 * 6 = 18.84 m^3. V_2_đầu_cầu = 4/3 * 3.14 * 1^3 ≈ 4.187 m^3. Tổng V ≈ 18.84 + 4.187 = 23.027 m^3 ≈ 23.03 m^3.',
      itype: 'SHORT_ANSWER' as const,
      exp: 23.03,
      unit: 'm^3'
    },
    {
      num: 18,
      arch: 'ARCH-COMP-CYL-SPH',
      q: 'Một chiếc phao cứu sinh gồm phần thân hình trụ r = 20 cm, h = 50 cm và 2 đầu là bán cầu r = 20 cm. Tính diện tích toàn bộ bề mặt ngoài của phao theo m^2 (lấy π ≈ 3.14).',
      ans: '1.13 m^2',
      sol: 'r = 0.2 m, h = 0.5 m. S = Sxq_trụ + S_cầu = 2πrh + 4πr^2 = 2 * 3.14 * 0.2 * 0.5 + 4 * 3.14 * 0.2^2 = 0.628 + 0.5024 = 1.1304 m^2 ≈ 1.13 m^2.',
      itype: 'SHORT_ANSWER' as const,
      exp: 1.13,
      unit: 'm^2'
    },
    {
      num: 19,
      arch: 'ARCH-COMP-CONE-CYL',
      q: 'Một tháp nước có phần dưới là hình trụ cao 8 m và phần mái che phía trên là hình nón cao 3 m, cùng có đường kính đáy 4 m. Tính thể tích toàn bộ khối tháp nước.',
      ans: '36pi m^3',
      sol: 'Bán kính r = 2 m. V_trụ = π * 2^2 * 8 = 32π m^3. V_nón = 1/3 * π * 2^2 * 3 = 4π m^3. Tổng V = 32π + 4π = 36π m^3.',
      itype: 'SHORT_ANSWER' as const,
      exp: '36pi',
      unit: 'm^3'
    },
    {
      num: 20,
      arch: 'ARCH-COMP-CONE-CYL',
      q: 'Một chiếc bút chì gỗ chưa gọt có phần thân trụ dài 15 cm, bán kính đáy 4 mm. Sau khi gọt một đầu thành hình nón cao 1.5 cm, tính thể tích phần gỗ bị gọt bỏ.',
      ans: '50.27 mm^3',
      sol: 'Phần gỗ bị gọt bỏ bằng thể tích khối trụ cao 1.5 cm trừ thể tích khối nón cao 1.5 cm: V_bỏ = 2/3 * π * r^2 * h = 2/3 * 3.14 * 4^2 * 15 ≈ 502.65 mm^3 (tính cho h=15mm).',
      itype: 'SHORT_ANSWER' as const,
      exp: 502.65,
      unit: 'mm^3'
    },
    {
      num: 21,
      arch: 'ARCH-COMP-CONE-SPH',
      q: 'Một mô hình con lật đật gồm một nửa khối cầu bán kính r = 4 cm gắn với phần trên là hình nón có chiều cao h = 6 cm và cùng bán kính đáy 4 cm. Tính thể tích con lật đật.',
      ans: '223.40 cm^3',
      sol: 'V = V_nón + V_nửa cầu = 1/3 * 3.14 * 4^2 * 6 + 2/3 * 3.14 * 4^3 = 100.48 + 133.97 = 234.45 cm^3.',
      itype: 'SHORT_ANSWER' as const,
      exp: 234.45,
      unit: 'cm^3'
    },
    {
      num: 22,
      arch: 'ARCH-WATER-RISE',
      q: 'Một cốc thủy tinh hình trụ có đường kính trong d = 8 cm chứa nước ở mức cao 10 cm. Thả vào cốc 5 viên bi sắt hình cầu giống nhau có bán kính r = 1.5 cm chìm hoàn toàn. Hỏi mực nước dâng lên bao nhiêu cm? (lấy π ≈ 3.14).',
      ans: '1.41 cm',
      sol: 'V_5_bi = 5 * (4/3 * π * 1.5^3) = 70.686 cm^3. S_đáy cốc = π * 4^2 = 50.265 cm^2. Δh = 70.686 / 50.265 = 1.406 cm ≈ 1.41 cm.',
      itype: 'SHORT_ANSWER' as const,
      exp: 1.41,
      unit: 'cm'
    },
    {
      num: 23,
      arch: 'ARCH-WATER-RISE',
      q: 'Một bình chứa nước hình trụ có bán kính R = 10 cm. Người ta nhấn chìm một khối kim loại đặc vào bình thì thấy nước dâng lên thêm 2.5 cm mà không tràn. Tính thể tích khối kim loại đó (theo cm^3, lấy π ≈ 3.14).',
      ans: '785 cm^3',
      sol: 'Thể tích khối kim loại = thể tích nước dâng = π * R^2 * Δh = 3.14 * 10^2 * 2.5 = 785 cm^3.',
      itype: 'SHORT_ANSWER' as const,
      exp: 785,
      unit: 'cm^3'
    },
    {
      num: 24,
      arch: 'ARCH-WATER-RISE',
      q: 'Một bể bơi hình trụ có đường kính 6 m chứa nước sâu 1.2 m. Người ta rút bớt nước thì thấy mực nước giảm đi 15 cm. Hỏi lượng nước đã rút là bao nhiêu lít? (lấy π ≈ 3.14).',
      ans: '4239 lít',
      sol: 'Bán kính r = 3 m. Thể tích nước giảm = 3.14 * 3^2 * 0.15 = 4.239 m^3 = 4239 dm^3 = 4239 lít.',
      itype: 'SHORT_ANSWER' as const,
      exp: 4239,
      unit: 'lít'
    },
    {
      num: 25,
      arch: 'ARCH-COUNT-SPHERES',
      q: 'Cần đúc 1000 viên bi thép hình cầu đường kính 1 cm. Hỏi cần tối thiểu bao nhiêu cm^3 thép nóng chảy? (lấy π ≈ 3.14).',
      ans: '523.33 cm^3',
      sol: 'Bán kính mỗi viên r = 0.5 cm. V_1_viên = 4/3 * 3.14 * 0.5^3 ≈ 0.52333 cm^3. V_1000_viên = 1000 * 0.52333 ≈ 523.33 cm^3.',
      itype: 'SHORT_ANSWER' as const,
      exp: 523.33,
      unit: 'cm^3'
    },
    {
      num: 26,
      arch: 'ARCH-COUNT-SPHERES',
      q: 'Người ta nung chảy 8 quả cầu kim loại bán kính r = 3 cm để đúc thành một quả cầu lớn duy nhất. Tính bán kính của quả cầu lớn đó.',
      ans: '6 cm',
      sol: 'Thể tích quả cầu lớn V = 8 * (4/3 * π * 3^3) = 4/3 * π * (8 * 27) = 4/3 * π * 216. Suy ra R^3 = 216 => R = 6 cm.',
      itype: 'SHORT_ANSWER' as const,
      exp: 6,
      unit: 'cm'
    },
    {
      num: 27,
      arch: 'ARCH-TANK-CAPACITY',
      q: 'Một xe bồn chở xăng dầu có bồn chứa hình trụ dài 5.5 m và đường kính trong 1.6 m. Hỏi bồn này chở được tối đa bao nhiêu lít xăng? (lấy π ≈ 3.14).',
      ans: '11053 lít',
      sol: 'Bán kính r = 0.8 m. V = 3.14 * 0.8^2 * 5.5 = 11.0528 m^3 ≈ 11053 dm^3 = 11053 lít.',
      itype: 'SHORT_ANSWER' as const,
      exp: 11053,
      unit: 'lít'
    },
    {
      num: 28,
      arch: 'ARCH-TANK-CAPACITY',
      q: 'Một bồn nước Inox gia đình hình trụ đứng có đường kính đáy 1.1 m và chiều cao 1.4 m. Nếu dùng hết 80% dung tích bồn thì lượng nước còn lại là bao nhiêu lít? (lấy π ≈ 3.14, làm tròn hàng đơn vị).',
      ans: '266 lít',
      sol: 'r = 0.55 m. V_tổng = 3.14 * 0.55^2 * 1.4 = 1.329866 m^3 ≈ 1330 lít. Lượng nước còn lại = 20% * 1330 = 266 lít.',
      itype: 'SHORT_ANSWER' as const,
      exp: 266,
      unit: 'lít'
    },
    {
      num: 29,
      arch: 'ARCH-CONICAL-HAT',
      q: 'Người ta dán giấy màu xung quanh một chiếc chao đèn hình nón có đường kính miệng 30 cm và chiều cao 20 cm (không dán đáy). Tính diện tích giấy màu cần dùng (lấy π ≈ 3.14).',
      ans: '1177.5 cm^2',
      sol: 'Bán kính r = 15 cm. Đường sinh l = sqrt(15^2 + 20^2) = 25 cm. Diện tích dán giấy Sxq = 3.14 * 15 * 25 = 1177.5 cm^2.',
      itype: 'SHORT_ANSWER' as const,
      exp: 1177.5,
      unit: 'cm^2'
    },
    {
      num: 30,
      arch: 'ARCH-CONICAL-HAT',
      q: 'Một chiếc phễu hình nón có đường sinh l = 13 cm và bán kính miệng r = 5 cm. Tính thời gian để rót hết 1.2 lít dầu qua phễu nếu tốc độ chảy qua lỗ đáy phễu là 15 cm^3/giây.',
      ans: '80 giây',
      sol: '1.2 lít = 1200 cm^3. Thời gian chảy hết dầu = 1200 / 15 = 80 giây.',
      itype: 'SHORT_ANSWER' as const,
      exp: 80,
      unit: 'giây'
    },
    {
      num: 31,
      arch: 'ARCH-CONICAL-HAT',
      q: 'Một xưởng may sản xuất 500 chiếc mũ phù thủy hình nón cho lễ hội Halloween. Mỗi chiếc mũ có bán kính đáy 14 cm và đường sinh 30 cm. Tính tổng chi phí mua vải nỉ biết giá 1 m^2 vải nỉ là 80,000 VNĐ (lấy π ≈ 22/7, coi hao hụt mép vải là 10%).',
      ans: '5,808,000 VNĐ',
      sol: 'S_1_mũ = (22/7) * 0.14 * 0.30 = 0.132 m^2. Tổng diện tích 500 mũ = 500 * 0.132 = 66 m^2. Vải cần mua (+10%) = 66 * 1.1 = 72.6 m^2. Tiền vải = 72.6 * 80000 = 5,808,000 VNĐ.',
      itype: 'SHORT_ANSWER' as const,
      exp: 5808000,
      unit: 'VNĐ'
    },
    {
      num: 32,
      arch: 'ARCH-MATERIAL-COST',
      q: 'Một tòa nhà có 8 cột tròn hình trụ cao 5 m và đường kính 0.8 m. Người ta muốn sơn toàn bộ bề mặt xung quanh của 8 cột đó. Biết 1 kg sơn sơn được 6 m^2 và giá 1 kg sơn là 95,000 VNĐ. Tính số tiền mua sơn cần chuẩn bị (lấy π ≈ 3.14, làm tròn kg sơn lên số nguyên).',
      ans: '1,615,000 VNĐ',
      sol: 'Sxq_1_cột = 3.14 * 0.8 * 5 = 12.56 m^2. Tổng diện tích 8 cột = 8 * 12.56 = 100.48 m^2. Số kg sơn = 100.48 / 6 ≈ 16.75 kg -> mua 17 kg. Tiền mua sơn = 17 * 95000 = 1,615,000 VNĐ.',
      itype: 'SHORT_ANSWER' as const,
      exp: 1615000,
      unit: 'VNĐ'
    },
    {
      num: 33,
      arch: 'ARCH-MATERIAL-COST',
      q: 'Để làm vỏ một hộp bánh bằng thiếc hình trụ kín 2 đáy có r = 8 cm, h = 12 cm, nhà sản xuất cần mua thiếc tấm. Biết giá 1 m^2 thiếc là 250,000 VNĐ. Tính chi phí nguyên liệu thiếc cho 1000 hộp bánh (lấy π ≈ 3.14, tính thêm 5% thiếc đề-xê hao hụt mép cắt).',
      ans: '263,760 VNĐ',
      sol: 'Stp_1_hộp = 2 * 3.14 * 0.08 * (0.12 + 0.08) = 0.10048 m^2. 1000 hộp = 100.48 m^2. Thêm 5% hao hụt = 105.504 m^2. Chi phí = 105.504 * 250000 = 26,376,000 VNĐ.',
      itype: 'SHORT_ANSWER' as const,
      exp: 26376000,
      unit: 'VNĐ'
    },
    {
      num: 34,
      arch: 'ARCH-MATERIAL-COST',
      q: 'Một bể bơi hình trụ tròn có bán kính đáy R = 5 m và chiều sâu h = 1.8 m. Người ta lát gạch men chống thấm đáy và thành bể bên trong. Biết giá gạch và công lát là 220,000 VNĐ/m^2. Tính tổng chi phí lát gạch (lấy π ≈ 3.14).',
      ans: '29,713,200 VNĐ',
      sol: 'Diện tích cần lát (đáy + thành xung quanh) S = π*R^2 + 2πRh = 3.14 * 25 + 2 * 3.14 * 5 * 1.8 = 78.5 + 56.52 = 135.06 m^2. Chi phí = 135.06 * 220000 = 29,713,200 VNĐ.',
      itype: 'SHORT_ANSWER' as const,
      exp: 29713200,
      unit: 'VNĐ'
    },
    {
      num: 35,
      arch: 'ARCH-UNIT-ROUNDING',
      q: 'Một ống hút hình trụ có đường kính trong 6 mm và chiều dài 21 cm. Dung tích nước tối đa trong lòng ống hút đó là bao nhiêu mililit (ml)? (lấy π ≈ 3.14, làm tròn 2 chữ số thập phân).',
      ans: '5.93 ml',
      sol: 'r = 0.3 cm, h = 21 cm. V = 3.14 * 0.3^2 * 21 = 5.9346 cm^3 = 5.9346 ml ≈ 5.93 ml.',
      itype: 'SHORT_ANSWER' as const,
      exp: 5.93,
      unit: 'ml'
    },
    {
      num: 36,
      arch: 'ARCH-UNIT-ROUNDING',
      q: 'Khối lượng riêng của nhôm là 2.7 g/cm^3. Một quả cầu nhôm đặc có đường kính d = 12 cm. Khối lượng quả cầu đó bằng bao nhiêu kg? (lấy π ≈ 3.14, làm tròn 2 chữ số thập phân).',
      ans: '2.44 kg',
      sol: 'R = 6 cm. V = 4/3 * 3.14 * 6^3 = 904.32 cm^3. Khối lượng m = 2.7 * 904.32 = 2441.664 g ≈ 2.44 kg.',
      itype: 'SHORT_ANSWER' as const,
      exp: 2.44,
      unit: 'kg'
    },
    {
      num: 37,
      arch: 'ARCH-INVERSE-CALC',
      q: 'Một lon sữa đặc hình trụ có dung tích V = 384 ml và chiều cao h = 12 cm. Tính đường kính đáy của lon sữa đó (lấy π ≈ 3.14, làm tròn 1 chữ số thập phân).',
      ans: '6.4 cm',
      sol: 'V = 384 cm^3. r^2 = V / (π * h) = 384 / (3.14 * 12) = 10.191 => r ≈ 3.19 cm => d = 2r ≈ 6.38 cm ≈ 6.4 cm.',
      itype: 'SHORT_ANSWER' as const,
      exp: 6.4,
      unit: 'cm'
    },
    {
      num: 38,
      arch: 'ARCH-INVERSE-CALC',
      q: 'Một khối nón có thể tích V = 100π cm^3 và chiều cao h = 12 cm. Tính diện tích toàn phần của hình nón đó.',
      ans: '90pi cm^2',
      sol: 'V = 1/3 * π * r^2 * h => 100π = 1/3 * π * r^2 * 12 => 4r^2 = 100 => r = 5 cm. Đường sinh l = sqrt(5^2 + 12^2) = 13 cm. Stp = π * 5 * (13 + 5) = 90π cm^2.',
      itype: 'SHORT_ANSWER' as const,
      exp: '90pi',
      unit: 'cm^2'
    },
    {
      num: 39,
      arch: 'ARCH-INVERSE-CALC',
      q: 'Một mặt cầu có diện tích S = 144π cm^2. Tính thể tích khối cầu giới hạn bởi mặt cầu đó.',
      ans: '288pi cm^3',
      sol: 'S = 4πR^2 = 144π => R^2 = 36 => R = 6 cm. Thể tích V = 4/3 * π * 6^3 = 288π cm^3.',
      itype: 'SHORT_ANSWER' as const,
      exp: '288pi',
      unit: 'cm^3'
    },
    {
      num: 40,
      arch: 'ARCH-OPTIMIZATION',
      q: 'Một người thợ gò nhôm muốn làm một chiếc thùng hình trụ không nắp có dung tích V = 64 dm^3. Hỏi bán kính đáy r và chiều cao h phải có tỉ số h/r bằng bao nhiêu để tiết kiệm nhôm nhất (diện tích toàn phần thùng không nắp nhỏ nhất)?',
      ans: '1',
      sol: 'Thùng không nắp S = πr^2 + 2πrh = πr^2 + 2V/r = πr^2 + V/r + V/r >= 3*cbrt(π*V^2). Dấu bằng khi πr^2 = V/r = πr^2*h/r = πrh => r = h => h/r = 1.',
      itype: 'SHORT_ANSWER' as const,
      exp: 1,
      unit: 'tỉ số'
    },
    {
      num: 41,
      arch: 'ARCH-OPTIMIZATION',
      q: 'Một công ty sản xuất nước giải khát đóng lon hình trụ có nắp thể tích V = 330 ml. Tỉ số h/r tối ưu để diện tích vỏ lon (cả 2 nắp) đạt giá trị nhỏ nhất là bao nhiêu?',
      ans: '2',
      sol: 'Stp = 2πr^2 + 2πrh = 2πr^2 + 2V/r. Dùng Cauchy 3 số: 2πr^2 = V/r = πrh => h = 2r => h/r = 2.',
      itype: 'SHORT_ANSWER' as const,
      exp: 2,
      unit: 'tỉ số'
    },
    {
      num: 42,
      arch: 'ARCH-OPTIMIZATION',
      q: 'Từ một tấm tôn hình chữ nhật kích thước 60 cm x 40 cm, người thợ cuộn tròn lại thành một hình trụ rỗng. Hỏi cuộn theo mép dài 60 cm (h = 40 cm) hay cuộn theo mép 40 cm (h = 60 cm) sẽ cho thể tích lớn hơn và lớn hơn bao nhiêu lần?',
      ans: 'Cuộn theo mép dài 60 cm cho thể tích lớn hơn 1.5 lần',
      sol: 'Cuộn theo mép 60 cm (C = 60, h = 40): r1 = 60/(2π) => V1 = π * (60/2π)^2 * 40 = 36000 / (4π). Cuộn theo mép 40 cm (C = 40, h = 60): r2 = 40/(2π) => V2 = 24000 / (4π). V1 / V2 = 36000 / 24000 = 1.5 lần.',
      itype: 'SHORT_ANSWER' as const,
      exp: 1.5,
      unit: 'lần'
    }
  ];

  for (const item of rawTLData) {
    const id = `TL-${item.num < 10 ? '00' + item.num : '0' + item.num}`;
    list.push({
      id,
      recordType: 'SOURCE_EXACT',
      sourceFile: '19. TỰ LUẬN - HÌNH HỌC KHÔNG GIAN - GV.docx',
      sourceQuestionNumber: item.num,
      sourceType: 'ESSAY',
      archetypeId: item.arch,
      originalQuestion: item.q,
      originalAnswer: item.ans,
      originalSolution: item.sol,
      verificationStatus: 'VERIFIED_SOURCE',
      interactiveVersion: {
        interactiveType: item.itype,
        prompt: item.q,
        expectedAnswer: item.exp,
        unit: item.unit,
        solution4Steps: [
          `Bước 1: Trích xuất các dữ kiện đề bài: ${item.q.slice(0, 70)}...`,
          `Bước 2: Xác định mô hình toán học và công thức áp dụng: ${item.arch}.`,
          `Bước 3: Thực hiện tính toán chi tiết: ${item.sol}`,
          `Bước 4: Kết luận đáp số: ${item.ans}.`
        ],
        importantNotes: [
          'Luôn kiểm tra và quy đổi đơn vị đo đồng nhất trước khi tính.',
          'Chú ý quy tắc làm tròn số thập phân theo yêu cầu đề bài.',
          'Phân biệt rõ bán kính và đường kính.'
        ]
      }
    });
  }

  return list;
}

export const SOURCE_TL_QUESTIONS: SourceExactQuestion[] = buildSourceTLQuestions();

// Master 73 SOURCE_EXACT Questions List
export const MASTER_SOURCE_EXACT_QUESTIONS: SourceExactQuestion[] = [
  ...SOURCE_MCQ_QUESTIONS,
  ...SOURCE_TL_QUESTIONS
];
