/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NGAN HANG HOI NHANH THAY HIEU AI - TOAN 9
 * Total 48 items: 42 static Q&A + 6 context-driven 3D templates
 */

export interface CommonErrorDef {
  code: string;
  correction: string;
}

export interface QuickQuestionItem {
  id: string;
  shape: 'cylinder' | 'cone' | 'sphere' | 'common';
  category: 'understand' | 'mistake' | 'real_world' | 'context';
  categoryLabel: 'Hiểu bản chất' | 'Sửa lỗi thường gặp' | 'Bài toán thực tế' | 'Theo mô hình 3D';
  label: string; // Short button label (under 6 words)
  question: string;
  quickAnswer: string;
  steps: string[];
  commonError: CommonErrorDef;
  hint: string;
  followupQuestion?: string;
  followupActions?: string[];
  // Context-driven template fields (for 6 items)
  isContextDriven?: boolean;
  formulaKey?: 'cylinder_volume' | 'cylinder_total_area' | 'cone_slant' | 'cone_volume' | 'sphere_surface_area' | 'sphere_volume';
  requiredContextFields?: ('currentR' | 'currentH' | 'currentL')[];
  promptTemplate?: string;
  answerTemplate?: string;
  sampleContext?: { currentR?: number; currentH?: number; currentL?: number };
  sampleUnit?: string;
  samplePiCoefficient?: string;
  sampleExactAnswer?: string;
}

export const QUICK_QUESTION_BANK: QuickQuestionItem[] = [
  // ==========================================
  // 6 CONTEXT-DRIVEN TEMPLATES (THEO MO HINH 3D)
  // ==========================================
  {
    id: 'CTX-TRU-V',
    shape: 'cylinder',
    category: 'context',
    categoryLabel: 'Theo mô hình 3D',
    label: 'V mô hình hiện tại?',
    question: 'Hình trụ đang xem có r = {{currentR}} cm, h = {{currentH}} cm. Tính thể tích và giải thích ngắn.',
    promptTemplate: 'Hình trụ đang xem có r = {{currentR}} cm, h = {{currentH}} cm. Tính thể tích và giải thích ngắn.',
    answerTemplate: 'V = πr²h = {{exactAnswer}} cm³; với π = 3,14, khoảng {{approxAnswer}} cm³.',
    formulaKey: 'cylinder_volume',
    requiredContextFields: ['currentR', 'currentH'],
    sampleContext: { currentR: 4, currentH: 8 },
    samplePiCoefficient: '128',
    sampleUnit: 'cm³',
    quickAnswer: 'V = πr²h; thay đúng bán kính và chiều cao đang hiển thị.',
    steps: [
      'Xác định r và h từ mô hình 3D đang hiển thị.',
      'Tính diện tích đáy S_đáy = πr².',
      'Nhân diện tích đáy với chiều cao h để được thể tích V = πr²h.'
    ],
    hint: 'Chọn công thức phù hợp và thay đúng số đo đang hiển thị.',
    commonError: {
      code: 'STALE_OR_MISSING_MODEL_CONTEXT',
      correction: 'Đọc số đo lúc học sinh nhấn câu hỏi; thiếu dữ kiện thì hỏi bổ sung, không tự gán số mặc định.'
    },
    followupActions: ['explain_steps', 'similar_problem', 'diagnose_error'],
    isContextDriven: true
  },
  {
    id: 'CTX-TRU-S',
    shape: 'cylinder',
    category: 'context',
    categoryLabel: 'Theo mô hình 3D',
    label: 'Stp mô hình hiện tại?',
    question: 'Hình trụ kín đang xem có r = {{currentR}} cm, h = {{currentH}} cm. Tính diện tích toàn phần, kể cả hai đáy.',
    promptTemplate: 'Hình trụ kín đang xem có r = {{currentR}} cm, h = {{currentH}} cm. Tính diện tích toàn phần, kể cả hai đáy.',
    answerTemplate: 'Stp = 2πrh + 2πr² = {{exactAnswer}} cm²; với π = 3,14, khoảng {{approxAnswer}} cm².',
    formulaKey: 'cylinder_total_area',
    requiredContextFields: ['currentR', 'currentH'],
    sampleContext: { currentR: 4, currentH: 8 },
    samplePiCoefficient: '96',
    sampleUnit: 'cm²',
    quickAnswer: 'Stp = 2πrh + 2πr²; gồm diện tích xung quanh cộng hai đáy.',
    steps: [
      'Tính diện tích xung quanh S_xq = 2πrh.',
      'Tính diện tích hai đáy 2 × πr².',
      'Cộng hai kết quả: S_tp = S_xq + 2S_đáy.'
    ],
    hint: 'Chọn công thức phù hợp và thay đúng số đo đang hiển thị.',
    commonError: {
      code: 'STALE_OR_MISSING_MODEL_CONTEXT',
      correction: 'Đọc số đo lúc học sinh nhấn câu hỏi; thiếu dữ kiện thì hỏi bổ sung, không tự gán số mặc định.'
    },
    followupActions: ['explain_steps', 'similar_problem', 'diagnose_error'],
    isContextDriven: true
  },
  {
    id: 'CTX-NON-L',
    shape: 'cone',
    category: 'context',
    categoryLabel: 'Theo mô hình 3D',
    label: 'Tìm đường sinh hiện tại',
    question: 'Hình nón đang xem có r = {{currentR}} cm, h = {{currentH}} cm. Tìm đường sinh l.',
    promptTemplate: 'Hình nón đang xem có r = {{currentR}} cm, h = {{currentH}} cm. Tìm đường sinh l.',
    answerTemplate: 'l = √(r² + h²) = {{exactAnswer}} cm; khoảng {{approxAnswer}} cm nếu cần làm tròn.',
    formulaKey: 'cone_slant',
    requiredContextFields: ['currentR', 'currentH'],
    sampleContext: { currentR: 3, currentH: 4 },
    sampleExactAnswer: '5',
    sampleUnit: 'cm',
    quickAnswer: 'l = √(r² + h²); đường sinh là cạnh huyền của tam giác vuông tạo bởi r và h.',
    steps: [
      'Xét tam giác vuông có hai cạnh góc vuông là bán kính r và chiều cao h.',
      'Áp dụng định lý Pythagore: l² = r² + h².',
      'Lấy căn bậc hai: l = √(r² + h²).'
    ],
    hint: 'Chọn công thức phù hợp và thay đúng số đo đang hiển thị.',
    commonError: {
      code: 'STALE_OR_MISSING_MODEL_CONTEXT',
      correction: 'Đọc số đo lúc học sinh nhấn câu hỏi; thiếu dữ kiện thì hỏi bổ sung, không tự gán số mặc định.'
    },
    followupActions: ['explain_steps', 'similar_problem', 'diagnose_error'],
    isContextDriven: true
  },
  {
    id: 'CTX-NON-V',
    shape: 'cone',
    category: 'context',
    categoryLabel: 'Theo mô hình 3D',
    label: 'V nón đang xem?',
    question: 'Hình nón đang xem có r = {{currentR}} cm, h = {{currentH}} cm. Tính thể tích; lưu ý phân biệt h và l.',
    promptTemplate: 'Hình nón đang xem có r = {{currentR}} cm, h = {{currentH}} cm. Tính thể tích; lưu ý phân biệt h và l.',
    answerTemplate: 'V = πr²h/3 = {{exactAnswer}} cm³; với π = 3,14, khoảng {{approxAnswer}} cm³.',
    formulaKey: 'cone_volume',
    requiredContextFields: ['currentR', 'currentH'],
    sampleContext: { currentR: 3, currentH: 4 },
    samplePiCoefficient: '12',
    sampleUnit: 'cm³',
    quickAnswer: 'V = (1/3)πr²h; bằng 1/3 thể tích hình trụ cùng đáy và chiều cao.',
    steps: [
      'Xác định bán kính đáy r và chiều cao vuông góc h (không dùng đường sinh l).',
      'Tính diện tích đáy S_đáy = πr².',
      'Tính thể tích V = (1/3) × S_đáy × h = (1/3)πr²h.'
    ],
    hint: 'Chọn công thức phù hợp và thay đúng số đo đang hiển thị.',
    commonError: {
      code: 'STALE_OR_MISSING_MODEL_CONTEXT',
      correction: 'Đọc số đo lúc học sinh nhấn câu hỏi; thiếu dữ kiện thì hỏi bổ sung, không tự gán số mặc định.'
    },
    followupActions: ['explain_steps', 'similar_problem', 'diagnose_error'],
    isContextDriven: true
  },
  {
    id: 'CTX-CAU-S',
    shape: 'sphere',
    category: 'context',
    categoryLabel: 'Theo mô hình 3D',
    label: 'S mặt cầu hiện tại?',
    question: 'Hình cầu đang xem có r = {{currentR}} cm. Tính diện tích mặt cầu.',
    promptTemplate: 'Hình cầu đang xem có r = {{currentR}} cm. Tính diện tích mặt cầu.',
    answerTemplate: 'S = 4πr² = {{exactAnswer}} cm²; với π = 3,14, khoảng {{approxAnswer}} cm².',
    formulaKey: 'sphere_surface_area',
    requiredContextFields: ['currentR'],
    sampleContext: { currentR: 4 },
    samplePiCoefficient: '64',
    sampleUnit: 'cm²',
    quickAnswer: 'S = 4πr²; diện tích mặt cầu bằng 4 lần diện tích hình tròn lớn.',
    steps: [
      'Xác định bán kính r của hình cầu.',
      'Bình phương bán kính r².',
      'Nhân với 4π: S = 4πr².'
    ],
    hint: 'Chọn công thức phù hợp và thay đúng số đo đang hiển thị.',
    commonError: {
      code: 'STALE_OR_MISSING_MODEL_CONTEXT',
      correction: 'Đọc số đo lúc học sinh nhấn câu hỏi; thiếu dữ kiện thì hỏi bổ sung, không tự gán số mặc định.'
    },
    followupActions: ['explain_steps', 'similar_problem', 'diagnose_error'],
    isContextDriven: true
  },
  {
    id: 'CTX-CAU-V',
    shape: 'sphere',
    category: 'context',
    categoryLabel: 'Theo mô hình 3D',
    label: 'V khối cầu hiện tại?',
    question: 'Khối cầu đang xem có r = {{currentR}} cm. Tính thể tích.',
    promptTemplate: 'Khối cầu đang xem có r = {{currentR}} cm. Tính thể tích.',
    answerTemplate: 'V = 4πr³/3 = {{exactAnswer}} cm³; với π = 3,14, khoảng {{approxAnswer}} cm³.',
    formulaKey: 'sphere_volume',
    requiredContextFields: ['currentR'],
    sampleContext: { currentR: 4 },
    samplePiCoefficient: '256/3',
    sampleUnit: 'cm³',
    quickAnswer: 'V = (4/3)πr³; thể tích khối cầu phụ thuộc lập phương bán kính.',
    steps: [
      'Xác định bán kính r của hình cầu.',
      'Tính lập phương bán kính r³.',
      'Nhân với 4π/3: V = (4/3)πr³.'
    ],
    hint: 'Chọn công thức phù hợp và thay đúng số đo đang hiển thị.',
    commonError: {
      code: 'STALE_OR_MISSING_MODEL_CONTEXT',
      correction: 'Đọc số đo lúc học sinh nhấn câu hỏi; thiếu dữ kiện thì hỏi bổ sung, không tự gán số mặc định.'
    },
    followupActions: ['explain_steps', 'similar_problem', 'diagnose_error'],
    isContextDriven: true
  },

  // ==========================================
  // HÌNH TRỤ (12 CÂU TĨNH: TRU-01 -> TRU-12)
  // ==========================================
  {
    id: 'TRU-01',
    shape: 'cylinder',
    category: 'understand',
    categoryLabel: 'Hiểu bản chất',
    label: 'Trải mặt trụ thế nào?',
    question: 'Mặt xung quanh hình trụ khi trải phẳng có dạng gì? Hai kích thước là gì?',
    quickAnswer: 'Hình chữ nhật có hai kích thước 2πr và h; diện tích xung quanh là 2πrh.',
    steps: [
      'Cắt mặt xung quanh dọc theo một đường sinh bất kỳ rồi trải phẳng trên mặt phẳng.',
      'Một cạnh uốn cong theo chu vi đáy có độ dài bằng 2πr.',
      'Cạnh kia trùng với đường sinh (bằng chiều cao h).'
    ],
    commonError: {
      code: 'CONFUSE_PERIMETER_WITH_DIAMETER',
      correction: 'Cạnh quấn quanh đáy là chu vi 2πr, không phải đường kính 2r.'
    },
    hint: 'Hãy tưởng tượng nhãn giấy quấn vừa đúng một vòng quanh lon sữa đặc.',
    followupQuestion: 'Nếu r = 4 cm, chiều dài một vòng quanh đáy bằng bao nhiêu?'
  },
  {
    id: 'TRU-02',
    shape: 'cylinder',
    category: 'understand',
    categoryLabel: 'Hiểu bản chất',
    label: 'Vì sao V = πr²h?',
    question: 'Vì sao thể tích hình trụ được tính bằng πr²h?',
    quickAnswer: 'Thể tích bằng diện tích đáy nhân chiều cao: V = S_đáy × h = πr²h.',
    steps: [
      'Đáy hình trụ là hình tròn bán kính r nên có diện tích S_đáy = πr².',
      'Hình trụ có tiết diện không đổi dọc theo chiều cao h.',
      'Nhân diện tích đáy với chiều cao để ra toàn bộ lượng không gian bên trong.'
    ],
    commonError: {
      code: 'CONFUSE_CIRCUMFERENCE_WITH_AREA',
      correction: '2πr là chu vi đáy; tính thể tích cần diện tích đáy πr².'
    },
    hint: 'Công thức cần biểu diễn lượng không gian bên trong hình.',
    followupQuestion: 'Nếu chiều cao tăng gấp đôi, bán kính giữ nguyên thì thể tích thay đổi thế nào?'
  },
  {
    id: 'TRU-03',
    shape: 'cylinder',
    category: 'understand',
    categoryLabel: 'Hiểu bản chất',
    label: 'Sxq khác Stp thế nào?',
    question: 'Hình trụ r = 3 cm, h = 5 cm có diện tích xung quanh và toàn phần bằng bao nhiêu?',
    quickAnswer: 'S_xq = 30π cm²; S_tp = 48π cm².',
    steps: [
      'S_xq = 2πrh = 2π × 3 × 5 = 30π cm².',
      'Diện tích hai đáy: 2 × πr² = 2 × π × 3² = 18π cm².',
      'S_tp = S_xq + 2S_đáy = 30π + 18π = 48π cm².'
    ],
    commonError: {
      code: 'FORGET_OR_EXTRA_BASES',
      correction: 'Hình trụ kín có hai đáy; chỉ tính mặt bên thì không cộng đáy.'
    },
    hint: 'Hãy đếm số mặt tròn có trong diện tích cần tính.',
    followupQuestion: 'Nếu bỏ nắp nhưng vẫn có đáy dưới, diện tích còn lại bằng bao nhiêu?'
  },
  {
    id: 'TRU-04',
    shape: 'cylinder',
    category: 'understand',
    categoryLabel: 'Hiểu bản chất',
    label: 'Gấp đôi r, V tăng mấy lần?',
    question: 'Bán kính hình trụ tăng gấp đôi, chiều cao giữ nguyên. Thể tích tăng mấy lần?',
    quickAnswer: 'Thể tích tăng 4 lần.',
    steps: [
      'Công thức thể tích ban đầu: V = πr²h.',
      'Khi thay r bằng 2r: V_mới = π(2r)²h = π(4r²)h = 4πr²h.',
      'Do đó V_mới = 4V.'
    ],
    commonError: {
      code: 'LINEAR_INSTEAD_OF_QUADRATIC',
      correction: 'Bán kính xuất hiện ở dạng bình phương nên không thể kết luận thể tích chỉ tăng hai lần.'
    },
    hint: 'Tính (2r)² trước khi so sánh tỉ số thể tích mới và cũ.',
    followupQuestion: 'Nếu cả r và h đều tăng gấp đôi thì thể tích tăng mấy lần?'
  },
  {
    id: 'TRU-05',
    shape: 'cylinder',
    category: 'mistake',
    categoryLabel: 'Sửa lỗi thường gặp',
    label: 'Em nhầm d với r',
    question: 'Bồn hình trụ có đường kính trong 10 cm và chiều cao trong 12 cm. Em dùng r = 10 cm có đúng không? Tính dung tích.',
    quickAnswer: 'Phải dùng r = 5 cm. Dung tích là 300π cm³.',
    steps: [
      'Tính bán kính đáy: r = d / 2 = 10 / 2 = 5 cm.',
      'Áp dụng công thức thể tích: V = πr²h.',
      'Thay số: V = π × 5² × 12 = π × 25 × 12 = 300π cm³.'
    ],
    commonError: {
      code: 'USE_DIAMETER_AS_RADIUS',
      correction: 'Dùng đường kính làm bán kính khiến thể tích hình trụ lớn gấp bốn lần.'
    },
    hint: 'Đường kính luôn gấp đôi bán kính (d = 2r).',
    followupQuestion: 'Nếu dùng nhầm r = 10 cm, kết quả lớn hơn đúng bao nhiêu lần?'
  },
  {
    id: 'TRU-06',
    shape: 'cylinder',
    category: 'mistake',
    categoryLabel: 'Sửa lỗi thường gặp',
    label: 'Thùng mở nắp: mấy đáy?',
    question: 'Thùng hình trụ không có nắp, r = 3 cm, h = 5 cm. Diện tích vật liệu làm thùng là bao nhiêu? Bỏ qua độ dày và mép ghép.',
    quickAnswer: '39π cm²: diện tích mặt bên cộng một đáy.',
    steps: [
      'S_mặt_bên = 2πrh = 2π × 3 × 5 = 30π cm².',
      'S_đáy_dưới = πr² = π × 3² = 9π cm² (thùng không có nắp nên không tính đáy trên).',
      'Tổng diện tích vật liệu = 30π + 9π = 39π cm².'
    ],
    commonError: {
      code: 'APPLY_CLOSED_FORMULA_TO_OPEN_OBJECT',
      correction: 'Thùng mở nắp chỉ có một mặt đáy; không dùng ngay công thức toàn phần của trụ kín.'
    },
    hint: 'Vẽ riêng mặt bên hình chữ nhật và đáy tròn bên dưới.',
    followupQuestion: 'Nếu thùng có cả nắp thì phải cộng thêm diện tích nào?'
  },
  {
    id: 'TRU-07',
    shape: 'cylinder',
    category: 'mistake',
    categoryLabel: 'Sửa lỗi thường gặp',
    label: 'Nhãn lon có tính đáy?',
    question: 'Nhãn giấy phủ kín mặt bên một lon r = 3 cm, h = 10 cm. Diện tích nhãn tối thiểu là bao nhiêu? Bỏ qua phần chồng mép.',
    quickAnswer: '60π cm²; chỉ tính diện tích xung quanh.',
    steps: [
      'Nhãn giấy chỉ bọc quanh thân lon, không dán kín mặt nắp hay mặt đáy dưới.',
      'Diện tích nhãn = Diện tích xung quanh hình trụ S_xq = 2πrh.',
      'Thay số: S = 2π × 3 × 10 = 60π cm².'
    ],
    commonError: {
      code: 'CONFUSE_LABEL_WITH_TOTAL_AREA',
      correction: 'Tính diện tích toàn phần sẽ cộng thừa hai đáy không được dán nhãn.'
    },
    hint: 'Xác định chính xác phần nào của lon được phủ giấy.',
    followupQuestion: 'Chiều dài nhãn khi trải phẳng bằng bao nhiêu?'
  },
  {
    id: 'TRU-08',
    shape: 'cylinder',
    category: 'mistake',
    categoryLabel: 'Sửa lỗi thường gặp',
    label: 'V dùng cm² hay cm³?',
    question: 'Em tính thể tích hình trụ r = 2 cm, h = 3 cm được 12π cm². Em sai ở đâu?',
    quickAnswer: 'Số 12π đúng, đơn vị phải là cm³.',
    steps: [
      'V = πr²h = π × 2² × 3 = 12π.',
      'Bán kính r (cm) bình phương ra r² (cm²).',
      'Nhân tiếp với chiều cao h (cm) tạo ra đơn vị đo thể tích là cm³.'
    ],
    commonError: {
      code: 'WRONG_VOLUME_UNIT',
      correction: 'cm² đo diện tích; thể tích dùng cm³.'
    },
    hint: 'Kiểm tra đơn vị của từng thừa số: cm × cm × cm = cm³.',
    followupQuestion: 'Diện tích mặt bên của cùng hình trụ có đơn vị gì?'
  },
  {
    id: 'TRU-09',
    shape: 'cylinder',
    category: 'real_world',
    categoryLabel: 'Bài toán thực tế',
    label: 'Bình chứa được mấy lít?',
    question: 'Bình trụ có đường kính trong 20 cm, chiều cao trong 30 cm. Khi đầy, bình chứa bao nhiêu lít? Lấy π = 3,14.',
    quickAnswer: '9,42 lít.',
    steps: [
      'Bán kính trong: r = 20 / 2 = 10 cm.',
      'Thể tích dung tích: V = π × 10² × 30 = 3000π cm³.',
      'Đổi sang lít (1000 cm³ = 1 L): 3000π / 1000 = 3π L ≈ 3 × 3,14 = 9,42 L.'
    ],
    commonError: {
      code: 'FAIL_TO_CONVERT_CM3_TO_LITERS',
      correction: 'Phải đổi 1000 cm³ = 1 L; không giữ nguyên con số 9420 rồi ghi lít.'
    },
    hint: 'Tính thể tích theo cm³ rồi chia cho 1000 để đổi ra lít.',
    followupQuestion: 'Nếu chỉ đổ nửa dung tích thì có bao nhiêu lít?'
  },
  {
    id: 'TRU-10',
    shape: 'cylinder',
    category: 'real_world',
    categoryLabel: 'Bài toán thực tế',
    label: 'Sơn cả bồn kín',
    question: 'Bồn trụ kín có bán kính ngoài 0,5 m, cao 2 m. Sơn toàn bộ mặt ngoài kể cả hai đáy cần phủ bao nhiêu m²? Bỏ qua phần ghép, lấy π = 3,14.',
    quickAnswer: '2,5π m² ≈ 7,85 m².',
    steps: [
      'S_xq = 2π × 0,5 × 2 = 2π m².',
      'Diện tích hai đáy: 2 × π × 0,5² = 0,5π m².',
      'Tổng diện tích cần sơn: S_tp = 2π + 0,5π = 2,5π m² ≈ 2,5 × 3,14 = 7,85 m².'
    ],
    commonError: {
      code: 'OMIT_BASES_IN_CLOSED_PAINT',
      correction: 'Đề nói sơn cả hai đáy nên cần diện tích toàn phần.'
    },
    hint: 'Liệt kê các mặt phải sơn trước khi chọn công thức.',
    followupQuestion: 'Nếu đáy dưới không sơn, diện tích giảm bao nhiêu?'
  },
  {
    id: 'TRU-11',
    shape: 'cylinder',
    category: 'real_world',
    categoryLabel: 'Bài toán thực tế',
    label: 'Mực nước cao 1,2 m',
    question: 'Bồn trụ đứng ban đầu rỗng, bán kính trong 0,5 m. Đổ nước đến độ cao 1,2 m được bao nhiêu lít? Lấy π = 3,14.',
    quickAnswer: '300π L ≈ 942 L.',
    steps: [
      'Khối nước có dạng hình trụ với r = 0,5 m và chiều cao h = 1,2 m.',
      'V = π × 0,5² × 1,2 = 0,3π m³.',
      'Đổi 1 m³ = 1000 L: V = 0,3π × 1000 = 300π L ≈ 300 × 3,14 = 942 L.'
    ],
    commonError: {
      code: 'USE_TOTAL_HEIGHT_INSTEAD_OF_WATER_LEVEL',
      correction: 'Dùng chiều cao phần nước, không tự dùng chiều cao toàn bồn.'
    },
    hint: 'Chọn h của phần không gian thật sự chứa nước.',
    followupQuestion: 'Mực nước tăng thêm 0,2 m thì thêm được bao nhiêu lít?'
  },
  {
    id: 'TRU-12',
    shape: 'cylinder',
    category: 'real_world',
    categoryLabel: 'Bài toán thực tế',
    label: 'Ống rỗng: trừ thế nào?',
    question: 'Ống trụ rỗng có bán kính ngoài 5 cm, bán kính trong 4 cm, dài 20 cm. Thể tích vật liệu làm ống là bao nhiêu?',
    quickAnswer: '180π cm³.',
    steps: [
      'Thể tích vật liệu bằng thể tích trụ ngoài trừ thể tích trụ rỗng bên trong.',
      'V = π × R² × h - π × r² × h = π(R² - r²)h.',
      'Thay số: V = π(5² - 4²) × 20 = π(25 - 16) × 20 = 180π cm³.'
    ],
    commonError: {
      code: 'SQUARE_OF_DIFFERENCE_ERROR',
      correction: 'Không tính toàn bộ thể tích trụ ngoài và không lấy (5 - 4)² làm diện tích vành khăn.'
    },
    hint: 'Hiệu hai bình phương (5² - 4²) khác bình phương của hiệu (5 - 4)².',
    followupQuestion: 'Vì sao (5² - 4²) không bằng (5 - 4)²?'
  },

  // ==========================================
  // HÌNH NÓN (12 CÂU TĨNH: NON-01 -> NON-12)
  // ==========================================
  {
    id: 'NON-01',
    shape: 'cone',
    category: 'understand',
    categoryLabel: 'Hiểu bản chất',
    label: 'Vì sao có 1/3?',
    question: 'Thể tích hình nón bằng bao nhiêu so với hình trụ cùng bán kính đáy và cùng chiều cao?',
    quickAnswer: 'Bằng 1/3 thể tích hình trụ: V_nón = πr²h/3.',
    steps: [
      'Xét hình nón và hình trụ có cùng bán kính đáy r và cùng chiều cao h.',
      'Thí nghiệm thực nghiệm: múc đầy nước vào nón rồi đổ vào trụ, cần đúng 3 lần để đầy trụ.',
      'Do đó thể tích hình nón bằng 1/3 thể tích hình trụ: V = (1/3)S_đáy × h = (1/3)πr²h.'
    ],
    commonError: {
      code: 'ASSUME_ONE_THIRD_FOR_ARBITRARY_SHAPES',
      correction: 'Quan hệ một phần ba cần cùng bán kính đáy và cùng chiều cao; không đúng với hai hình tùy ý.'
    },
    hint: 'Kiểm tra cả r và h của hai vật chứa.',
    followupQuestion: 'Nếu một trong hai chiều cao khác nhau thì còn kết luận một phần ba được không?'
  },
  {
    id: 'NON-02',
    shape: 'cone',
    category: 'understand',
    categoryLabel: 'Hiểu bản chất',
    label: 'h và l khác nhau?',
    question: 'Hình nón tròn xoay có r = 3 cm, h = 4 cm. Đường sinh l bằng bao nhiêu?',
    quickAnswer: 'l = 5 cm.',
    steps: [
      'Chiều cao h vuông góc với mặt đáy tại tâm O.',
      'Đường sinh l nối đỉnh nón S với một điểm A trên đường tròn đáy, tạo tam giác vuông SOA.',
      'Áp dụng Pythagore: l = √(r² + h²) = √(3² + 4²) = 5 cm.'
    ],
    commonError: {
      code: 'CONFUSE_SLANT_WITH_HEIGHT',
      correction: 'h là đoạn vuông góc; l là đoạn nghiêng. Hai đại lượng không thay thế nhau.'
    },
    hint: 'Xét tam giác vuông gồm r, h và l, trong đó l là cạnh huyền.',
    followupQuestion: 'Nếu r = 5 cm và h = 12 cm thì l bằng bao nhiêu?'
  },
  {
    id: 'NON-03',
    shape: 'cone',
    category: 'understand',
    categoryLabel: 'Hiểu bản chất',
    label: 'Trải nón thành hình gì?',
    question: 'Mặt xung quanh hình nón khi trải phẳng thành hình gì? Bán kính và độ dài cung của hình đó là gì?',
    quickAnswer: 'Một hình quạt tròn có bán kính l, độ dài cung 2πr.',
    steps: [
      'Cắt mặt xung quanh hình nón dọc theo đường sinh l rồi trải phẳng.',
      'Tất cả các điểm trên đường tròn đáy đều cách đỉnh một khoảng bằng l, tạo thành hình quạt bán kính l.',
      'Độ dài cung tròn của hình quạt bằng đúng chu vi đáy hình nón là 2πr.'
    ],
    commonError: {
      code: 'CONFUSE_SECTOR_RADIUS_WITH_BASE_RADIUS',
      correction: 'Bán kính hình quạt là đường sinh l, không phải bán kính đáy r.'
    },
    hint: 'Theo dõi đoạn từ đỉnh nón đến mép đáy khi trải phẳng.',
    followupQuestion: 'Vì sao hình quạt thường không phải cả một hình tròn?'
  },
  {
    id: 'NON-04',
    shape: 'cone',
    category: 'understand',
    categoryLabel: 'Hiểu bản chất',
    label: 'Gấp đôi r của nón',
    question: 'Bán kính đáy nón tăng gấp đôi, chiều cao giữ nguyên. Thể tích tăng bao nhiêu lần?',
    quickAnswer: 'Tăng 4 lần.',
    steps: [
      'V = (1/3)πr²h.',
      'Khi r thay bằng 2r: V_mới = (1/3)π(2r)²h = (1/3)π(4r²)h = 4V.',
      'Do đó thể tích tăng 4 lần.'
    ],
    commonError: {
      code: 'FACTOR_ONE_THIRD_CONFUSION',
      correction: 'Hệ số 1/3 không làm thay đổi quy luật tăng theo bình phương bán kính.'
    },
    hint: 'So sánh V_mới / V_cũ, các thừa số chung sẽ triệt tiêu.',
    followupQuestion: 'Nếu chỉ tăng h gấp đôi thì thể tích tăng bao nhiêu lần?'
  },
  {
    id: 'NON-05',
    shape: 'cone',
    category: 'mistake',
    categoryLabel: 'Sửa lỗi thường gặp',
    label: 'Em quên chia 3',
    question: 'Hình nón r = 3 cm, h = 4 cm. Em tính V = π × 3² × 4 = 36π cm³. Sửa thế nào?',
    quickAnswer: 'Phải chia cho 3: V = 12π cm³.',
    steps: [
      'Công thức thể tích hình nón là V = (1/3)πr²h.',
      '36π cm³ là thể tích hình trụ bao quanh nón.',
      'V_nón = 36π / 3 = 12π cm³.'
    ],
    commonError: {
      code: 'OMIT_ONE_THIRD_IN_CONE_VOLUME',
      correction: 'Công thức thể tích hình nón có hệ số 1/3.'
    },
    hint: 'So sánh với hình trụ bao quanh nón có cùng r và h.',
    followupQuestion: 'Kết quả em tính ban đầu lớn hơn kết quả đúng bao nhiêu lần?'
  },
  {
    id: 'NON-06',
    shape: 'cone',
    category: 'mistake',
    categoryLabel: 'Sửa lỗi thường gặp',
    label: 'Sxq dùng h hay l?',
    question: 'Nón có r = 3 cm, h = 4 cm, l = 5 cm. Em dùng Sxq = πrh được 12π cm². Đúng không?',
    quickAnswer: 'Chưa đúng. S_xq = πrl = 15π cm².',
    steps: [
      'Diện tích xung quanh của hình nón tính theo độ dài đường sinh l.',
      'Công thức chuẩn: S_xq = πrl.',
      'Thay số: S_xq = π × 3 × 5 = 15π cm².'
    ],
    commonError: {
      code: 'USE_HEIGHT_FOR_CONE_LATERAL_AREA',
      correction: 'πrh dùng nhầm chiều cao; công thức đúng là πrl.'
    },
    hint: 'Bán kính hình quạt trải phẳng chính là l.',
    followupQuestion: 'Nếu đề chỉ cho r và h thì phải tìm đại lượng nào trước?'
  },
  {
    id: 'NON-07',
    shape: 'cone',
    category: 'mistake',
    categoryLabel: 'Sửa lỗi thường gặp',
    label: 'V có dùng đường sinh?',
    question: 'Nón r = 3 cm, l = 5 cm. Em dùng V = πr²l/3. Hãy tìm thể tích đúng.',
    quickAnswer: 'h = 4 cm, V = 12π cm³.',
    steps: [
      'Thể tích dùng chiều cao h, không dùng đường sinh l.',
      'Tìm chiều cao: h = √(l² - r²) = √(5² - 3²) = 4 cm.',
      'Tính thể tích: V = (1/3)πr²h = (1/3)π × 3² × 4 = 12π cm³.'
    ],
    commonError: {
      code: 'USE_SLANT_FOR_CONE_VOLUME',
      correction: 'Thể tích dùng chiều cao vuông góc h, không dùng đường sinh l.'
    },
    hint: 'Trong tam giác vuông, l là cạnh huyền, h là cạnh góc vuông.',
    followupQuestion: 'Nếu l nhỏ hơn r thì các số đo có tạo được hình nón này không?'
  },
  {
    id: 'NON-08',
    shape: 'cone',
    category: 'mistake',
    categoryLabel: 'Sửa lỗi thường gặp',
    label: 'Nón cộng mấy đáy?',
    question: 'Hình nón có r = 3 cm, l = 5 cm. Diện tích toàn phần có phải πrl + 2πr² không?',
    quickAnswer: 'Không. Nón có một đáy: S_tp = πrl + πr² = 24π cm².',
    steps: [
      'Hình nón chỉ có duy nhất một mặt đáy hình tròn.',
      'S_xq = πrl = π × 3 × 5 = 15π cm².',
      'S_tp = S_xq + S_đáy = 15π + π × 3² = 15π + 9π = 24π cm².'
    ],
    commonError: {
      code: 'ADD_TWO_BASES_TO_CONE',
      correction: 'Không áp dụng hai đáy của hình trụ cho hình nón.'
    },
    hint: 'Đỉnh nón là một điểm nhọn, không phải một mặt tròn.',
    followupQuestion: 'Mũ giấy không có đáy thì diện tích giấy bằng bao nhiêu?'
  },
  {
    id: 'NON-09',
    shape: 'cone',
    category: 'real_world',
    categoryLabel: 'Bài toán thực tế',
    label: 'Làm mũ sinh nhật',
    question: 'Mũ sinh nhật hình nón không có đáy, r = 7 cm, h = 24 cm. Cần tối thiểu bao nhiêu giấy? Bỏ qua mép dán, lấy π = 3,14.',
    quickAnswer: 'l = 25 cm; cần 175π cm² ≈ 549,5 cm² giấy.',
    steps: [
      'Tìm đường sinh: l = √(r² + h²) = √(7² + 24²) = 25 cm.',
      'Mũ đội đầu không có đáy nên lượng giấy là diện tích xung quanh: S = πrl.',
      'Thay số: S = π × 7 × 25 = 175π cm² ≈ 175 × 3,14 = 549,5 cm².'
    ],
    commonError: {
      code: 'USE_VOLUME_FOR_CONE_MATERIAL',
      correction: 'Vật liệu phủ mặt bên cần diện tích xung quanh, không phải thể tích.'
    },
    hint: 'Tìm đường sinh trước; không cộng đáy vì mũ phải rỗng để đội đầu.',
    followupQuestion: 'Nếu cần thêm 10% giấy cho mép ghép thì cần bao nhiêu?'
  },
  {
    id: 'NON-10',
    shape: 'cone',
    category: 'real_world',
    categoryLabel: 'Bài toán thực tế',
    label: 'Kem trong ốc quế',
    question: 'Phần trong ốc quế được mô hình hóa thành hình nón r = 3 cm, h = 12 cm. Đổ đầy phần nón cần bao nhiêu cm³ kem? Không tính kem nhô lên, lấy π = 3,14.',
    quickAnswer: '36π cm³ ≈ 113,04 cm³.',
    steps: [
      'Ốc quế có dạng hình nón với r = 3 cm và h = 12 cm.',
      'Thể tích kem lấp đầy phần nón: V = (1/3)πr²h.',
      'V = (1/3)π × 3² × 12 = 36π cm³ ≈ 36 × 3,14 = 113,04 cm³.'
    ],
    commonError: {
      code: 'ADD_TOP_SCOOP_WHEN_EXCLUDED',
      correction: 'Không cộng phần kem bên trên khi đề đã loại trừ; không bỏ hệ số 1/3.'
    },
    hint: 'Vẽ ranh giới phần nón bên dưới cần tính.',
    followupQuestion: 'Nếu chỉ chứa nửa dung tích đầy thì có bao nhiêu cm³ kem?'
  },
  {
    id: 'NON-11',
    shape: 'cone',
    category: 'real_world',
    categoryLabel: 'Bài toán thực tế',
    label: 'Đống cát hình nón',
    question: 'Đống cát được mô hình hóa là hình nón r = 2 m, h = 1,5 m. Thể tích cát là bao nhiêu m³? Lấy π = 3,14.',
    quickAnswer: '2π m³ ≈ 6,28 m³.',
    steps: [
      'Công thức thể tích hình nón: V = (1/3)πr²h.',
      'Thay số: V = (1/3)π × 2² × 1,5 = (1/3)π × 4 × 1,5 = 2π m³.',
      'Gần đúng với π = 3,14: V ≈ 2 × 3,14 = 6,28 m³.'
    ],
    commonError: {
      code: 'SLANT_AS_SAND_HEIGHT',
      correction: 'Kết quả theo mô hình nón lý tưởng; chiều cao phải là khoảng cách vuông góc từ đỉnh tới đáy.'
    },
    hint: 'Kiểm tra các kích thước đều dùng cùng đơn vị mét.',
    followupQuestion: 'Nếu chiều cao giảm còn 0,75 m nhưng bán kính không đổi thì thể tích bằng bao nhiêu?'
  },
  {
    id: 'NON-12',
    shape: 'cone',
    category: 'real_world',
    categoryLabel: 'Bài toán thực tế',
    label: 'Tìm chiều cao cốc nón',
    question: 'Một cốc có phần trong hình nón bán kính miệng 4 cm, dung tích đầy 48π cm³. Chiều cao phần trong là bao nhiêu?',
    quickAnswer: 'h = 9 cm.',
    steps: [
      'Từ công thức V = (1/3)πr²h, suy ra h = 3V / (πr²).',
      'Thay số: h = 3 × 48π / (π × 4²) = 144π / (16π).',
      'Rút gọn: h = 9 cm.'
    ],
    commonError: {
      code: 'FORGET_MULTIPLY_BY_3_IN_INVERSE',
      correction: 'Khi tìm h phải nhân V với 3; không dùng công thức ngược của hình trụ.'
    },
    hint: 'Biến đổi công thức bằng ký hiệu trước khi thay số.',
    followupQuestion: 'Cốc trụ cùng bán kính và cùng dung tích sẽ cao bao nhiêu?'
  },

  // ==========================================
  // HÌNH CẦU (12 CÂU TĨNH: CAU-01 -> CAU-12)
  // ==========================================
  {
    id: 'CAU-01',
    shape: 'sphere',
    category: 'understand',
    categoryLabel: 'Hiểu bản chất',
    label: 'Mặt cầu và khối cầu',
    question: 'Diện tích mặt cầu và thể tích khối cầu đo hai điều gì khác nhau?',
    quickAnswer: 'Diện tích mặt cầu đo bề mặt: S = 4πr². Thể tích khối cầu đo không gian bên trong: V = 4πr³/3.',
    steps: [
      'Mặt cầu là bề mặt ngoài cong khép kín (giống vỏ quả bóng).',
      'Khối cầu gồm toàn bộ mặt cầu và vùng không gian bên trong nó.',
      'Sơn hay phủ vật liệu dùng S = 4πr²; sức chứa chất lỏng/kim loại đặc dùng V = (4/3)πr³.'
    ],
    commonError: {
      code: 'CONFUSE_SURFACE_WITH_VOLUME',
      correction: 'Không dùng công thức diện tích để tính sức chứa hoặc công thức thể tích để tính vật liệu phủ.'
    },
    hint: 'Hỏi đề cần phủ bên ngoài hay chứa bên trong.',
    followupQuestion: 'Bọc một quả bóng cần diện tích hay thể tích?'
  },
  {
    id: 'CAU-02',
    shape: 'sphere',
    category: 'understand',
    categoryLabel: 'Hiểu bản chất',
    label: 'Công thức V hình cầu',
    question: 'Công thức thể tích hình cầu là gì? Bán kính phải được nâng lũy thừa mấy?',
    quickAnswer: 'V = 4πr³/3; bán kính có lũy thừa 3.',
    steps: [
      'Thể tích khối cầu bán kính r có công thức: V = (4/3)πr³.',
      'Lũy thừa của bán kính là bậc 3 (r³).',
      'Nếu r đo bằng cm thì r³ tạo ra đơn vị thể tích chuẩn là cm³.'
    ],
    commonError: {
      code: 'USE_R2_FOR_SPHERE_VOLUME',
      correction: 'r² thuộc công thức diện tích; thể tích cần r³.'
    },
    hint: 'Dùng đơn vị để kiểm tra số mũ: cm × cm × cm = cm³.',
    followupQuestion: 'Nếu r tăng gấp ba thì thể tích tăng bao nhiêu lần?'
  },
  {
    id: 'CAU-03',
    shape: 'sphere',
    category: 'understand',
    categoryLabel: 'Hiểu bản chất',
    label: 'Mặt cắt qua tâm',
    question: 'Cắt khối cầu r = 5 cm bằng mặt phẳng đi qua tâm. Diện tích mặt cắt có bằng diện tích mặt cầu không?',
    quickAnswer: 'Không. Mặt cắt là hình tròn: 25π cm²; mặt cầu có diện tích 100π cm².',
    steps: [
      'Mặt cắt đi qua tâm hình cầu là một hình tròn lớn có bán kính đúng bằng r = 5 cm.',
      'Diện tích mặt cắt: S_mặt_cắt = πr² = π × 5² = 25π cm².',
      'Diện tích toàn bộ mặt cầu: S_mặt_cầu = 4πr² = 4 × π × 25 = 100π cm² (gấp đúng 4 lần).'
    ],
    commonError: {
      code: 'CONFUSE_SECTION_WITH_SURFACE',
      correction: 'Mặt cắt là một miền phẳng; mặt cầu là toàn bộ bề mặt cong.'
    },
    hint: 'Đếm hệ số πr² ở hai công thức (1 so với 4).',
    followupQuestion: 'Nếu mặt phẳng không qua tâm, bán kính mặt cắt lớn hơn hay nhỏ hơn r?'
  },
  {
    id: 'CAU-04',
    shape: 'sphere',
    category: 'understand',
    categoryLabel: 'Hiểu bản chất',
    label: 'Cầu bằng bao nhiêu trụ?',
    question: 'Khối cầu r được đặt trong hình trụ cùng bán kính r, cao 2r. Thể tích cầu bằng bao nhiêu phần thể tích trụ?',
    quickAnswer: 'Bằng 2/3 thể tích trụ.',
    steps: [
      'V_cầu = (4/3)πr³.',
      'V_trụ = πr² × h = πr² × (2r) = 2πr³.',
      'Tỉ số: V_cầu / V_trụ = ((4/3)πr³) / (2πr³) = (4/3) / 2 = 2/3.'
    ],
    commonError: {
      code: 'ARCHIMEDES_RATIO_PRECONDITION',
      correction: 'Tỉ số 2/3 này cần hình trụ cao 2r và cùng bán kính với cầu.'
    },
    hint: 'Viết hai thể tích theo cùng biến r rồi chia cho nhau.',
    followupQuestion: 'Nếu trụ cao 3r thì tỉ số sẽ là bao nhiêu?'
  },
  {
    id: 'CAU-05',
    shape: 'sphere',
    category: 'mistake',
    categoryLabel: 'Sửa lỗi thường gặp',
    label: 'Bóng d = 6, r là mấy?',
    question: 'Quả bóng có đường kính 6 cm. Em thay r = 6 vào S = 4πr² có đúng không?',
    quickAnswer: 'Phải dùng r = 3 cm; S = 36π cm².',
    steps: [
      'Bán kính bằng một nửa đường kính: r = d / 2 = 6 / 2 = 3 cm.',
      'Diện tích mặt cầu: S = 4πr² = 4π × 3² = 36π cm².',
      'Nếu nhầm r = 6 cm sẽ ra 144π cm² (sai gấp 4 lần).'
    ],
    commonError: {
      code: 'SUBSTITUTE_DIAMETER_INTO_SPHERE_AREA',
      correction: 'Dùng d làm r khiến diện tích lớn gấp bốn lần.'
    },
    hint: 'Chia đường kính cho 2 trước khi bình phương.',
    followupQuestion: 'Sai tương tự trong công thức thể tích sẽ làm kết quả lớn gấp bao nhiêu lần?'
  },
  {
    id: 'CAU-06',
    shape: 'sphere',
    category: 'mistake',
    categoryLabel: 'Sửa lỗi thường gặp',
    label: 'Em dùng r² để tính V',
    question: 'Hình cầu r = 3 cm. Em tính V = 4π × 3²/3 = 12π cm³. Sửa thế nào?',
    quickAnswer: 'Phải dùng r³: V = 4π × 3³/3 = 36π cm³.',
    steps: [
      'Công thức thể tích khối cầu là V = (4/3)πr³.',
      'Với r = 3: r³ = 3³ = 27 (không phải 9).',
      'V = (4/3)π × 27 = 36π cm³.'
    ],
    commonError: {
      code: 'USE_SQUARE_INSTEAD_OF_CUBE',
      correction: 'Không chỉ sửa đơn vị; phải sửa số mũ trong phép tính.'
    },
    hint: 'Viết 3³ thành 3 × 3 × 3 = 27.',
    followupQuestion: 'Diện tích mặt cầu r = 3 cm bằng bao nhiêu và có đơn vị gì?'
  },
  {
    id: 'CAU-07',
    shape: 'sphere',
    category: 'mistake',
    categoryLabel: 'Sửa lỗi thường gặp',
    label: 'Gấp đôi r: S và V?',
    question: 'Bán kính cầu tăng gấp đôi. Có phải cả diện tích và thể tích đều tăng gấp đôi không?',
    quickAnswer: 'Diện tích tăng 4 lần; thể tích tăng 8 lần.',
    steps: [
      'Diện tích S phụ thuộc r²: khi r tăng 2 lần thì S tăng 2² = 4 lần.',
      'Thể tích V phụ thuộc r³: khi r tăng 2 lần thì V tăng 2³ = 8 lần.',
      'Cả hai đều tăng phi tuyến tính theo số mũ của bán kính.'
    ],
    commonError: {
      code: 'LINEAR_GROWTH_FALLACY',
      correction: 'Diện tích và thể tích có quy luật tăng khác nhau.'
    },
    hint: 'Theo dõi riêng bình phương (2²) và lập phương (2³).',
    followupQuestion: 'Nếu r tăng gấp ba thì S và V tăng bao nhiêu lần?'
  },
  {
    id: 'CAU-08',
    shape: 'sphere',
    category: 'mistake',
    categoryLabel: 'Sửa lỗi thường gặp',
    label: 'Bán cầu có cộng đáy?',
    question: 'Bán cầu r = 3 cm có diện tích mặt cong và diện tích toàn bộ bề mặt kể cả đáy tròn là bao nhiêu?',
    quickAnswer: 'Mặt cong: 18π cm². Kể cả đáy: 27π cm².',
    steps: [
      'Diện tích mặt cong bằng nửa mặt cầu: S_cong = 2πr² = 2π × 3² = 18π cm².',
      'Mặt đáy tròn phẳng đi qua tâm: S_đáy = πr² = π × 3² = 9π cm².',
      'Toàn bộ bề mặt = 18π + 9π = 27π cm².'
    ],
    commonError: {
      code: 'HEMISPHERE_BASE_NEGLECT',
      correction: 'Một nửa diện tích mặt cầu chỉ cho mặt cong của bán cầu; cần thêm đáy khi đề yêu cầu.'
    },
    hint: 'Phân biệt phần cong và mặt tròn do cắt tạo ra.',
    followupQuestion: 'Sơn mặt cong của mái vòm bán cầu có cần cộng mặt đáy không?'
  },
  {
    id: 'CAU-09',
    shape: 'sphere',
    category: 'real_world',
    categoryLabel: 'Bài toán thực tế',
    label: 'Bọc bề mặt quả bóng',
    question: 'Quả bóng được mô hình hóa là hình cầu bán kính ngoài 10 cm. Cần phủ bao nhiêu cm² vật liệu? Bỏ qua đường ghép, lấy π = 3,14.',
    quickAnswer: '400π cm² ≈ 1256 cm².',
    steps: [
      'Phủ bề mặt ngoài quả bóng cần diện tích mặt cầu: S = 4πr².',
      'Thay số: S = 4π × 10² = 400π cm².',
      'Số gần đúng: S ≈ 400 × 3,14 = 1256 cm².'
    ],
    commonError: {
      code: 'USE_VOLUME_FOR_BALL_SURFACE',
      correction: 'Chọn công thức diện tích, không dùng thể tích cho lượng vật liệu phủ.'
    },
    hint: 'Bán kính ngoài dùng để tính bề mặt ngoài.',
    followupQuestion: 'Nếu đường kính tăng gấp đôi thì vật liệu phủ tăng mấy lần?'
  },
  {
    id: 'CAU-10',
    shape: 'sphere',
    category: 'real_world',
    categoryLabel: 'Bài toán thực tế',
    label: 'Viên bi đặc d = 6 cm',
    question: 'Viên bi kim loại đặc hình cầu có đường kính 6 cm. Thể tích kim loại là bao nhiêu? Lấy π = 3,14.',
    quickAnswer: '36π cm³ ≈ 113,04 cm³.',
    steps: [
      'Bán kính viên bi: r = 6 / 2 = 3 cm.',
      'Thể tích kim loại: V = (4/3)πr³ = (4/3)π × 3³ = 36π cm³.',
      'Lấy π = 3,14: V ≈ 36 × 3,14 = 113,04 cm³.'
    ],
    commonError: {
      code: 'USE_DIAMETER_FOR_BALL_VOLUME',
      correction: 'Đổi đường kính thành bán kính trước; kết quả là thể tích, chưa phải khối lượng.'
    },
    hint: 'Muốn tính khối lượng còn cần biết thêm khối lượng riêng.',
    followupQuestion: 'Nếu biết khối lượng riêng thì tìm khối lượng bằng phép tính nào?'
  },
  {
    id: 'CAU-11',
    shape: 'sphere',
    category: 'real_world',
    categoryLabel: 'Bài toán thực tế',
    label: 'Bồn cầu chứa mấy lít?',
    question: 'Bồn chứa hình cầu có đường kính trong 1,2 m. Dung tích đầy là bao nhiêu lít? Lấy π = 3,14.',
    quickAnswer: '288π L ≈ 904,32 L.',
    steps: [
      'Bán kính trong: r = 1,2 / 2 = 0,6 m.',
      'Thể tích: V = (4/3)π × 0,6³ = (4/3)π × 0,216 = 0,288π m³.',
      'Đổi sang lít (1 m³ = 1000 L): V = 0,288π × 1000 = 288π L ≈ 288 × 3,14 = 904,32 L.'
    ],
    commonError: {
      code: 'DIAMETER_AND_UNIT_CONVERSION_ERROR',
      correction: 'Dùng đường kính trong để tính sức chứa; đổi m³ sang lít bằng nhân 1000.'
    },
    hint: 'Lập phương 0,6 trước khi nhân các hệ số.',
    followupQuestion: 'Nếu đề chỉ cho đường kính ngoài thì còn thiếu thông tin gì?'
  },
  {
    id: 'CAU-12',
    shape: 'sphere',
    category: 'real_world',
    categoryLabel: 'Bài toán thực tế',
    label: 'Một viên kem tròn',
    question: 'Một viên kem được coi là khối cầu bán kính 2 cm. Thể tích là bao nhiêu? Lấy π = 3,14, làm tròn đến hai chữ số thập phân.',
    quickAnswer: '32π/3 cm³ ≈ 33,49 cm³.',
    steps: [
      'V = (4/3)πr³ = (4/3)π × 2³ = (4/3)π × 8 = 32π/3 cm³.',
      'Thay π = 3,14: V ≈ (32 × 3,14) / 3 = 100,48 / 3 ≈ 33,4933 cm³.',
      'Làm tròn đến 2 chữ số thập phân: V ≈ 33,49 cm³.'
    ],
    commonError: {
      code: 'PREMATURE_ROUNDING_ERROR',
      correction: 'Giữ phân số và π đến bước cuối để tránh sai số làm tròn.'
    },
    hint: 'Không làm tròn 32/3 trước khi nhân π.',
    followupQuestion: 'Nếu bán kính viên kem tăng gấp đôi thì thể tích tăng mấy lần?'
  },

  // ==========================================
  // DÙNG CHUNG (6 CÂU: CHUNG-01 -> CHUNG-06)
  // ==========================================
  {
    id: 'CHUNG-01',
    shape: 'common',
    category: 'mistake',
    categoryLabel: 'Sửa lỗi thường gặp',
    label: '1000 cm³ bằng mấy lít?',
    question: '1000 cm³ bằng bao nhiêu lít? 2500 cm³ bằng bao nhiêu lít?',
    quickAnswer: '1000 cm³ = 1 L; 2500 cm³ = 2,5 L.',
    steps: [
      'Quy ước chuẩn: 1 L = 1 dm³ = 1000 cm³.',
      'Đổi từ cm³ sang lít: chia số đo cho 1000.',
      '2500 cm³ = 2500 / 1000 = 2,5 L.'
    ],
    commonError: {
      code: 'LENGTH_SCALE_FOR_VOLUME_UNIT',
      correction: 'Đổi thể tích không dùng hệ số đổi độ dài.'
    },
    hint: 'Ghi hệ thức 1 L = 1000 cm³ trước khi làm.',
    followupQuestion: '750 mL bằng bao nhiêu cm³?'
  },
  {
    id: 'CHUNG-02',
    shape: 'common',
    category: 'mistake',
    categoryLabel: 'Sửa lỗi thường gặp',
    label: '1 m² bằng mấy cm²?',
    question: 'Vì sao 1 m² = 10000 cm², không phải 100 cm²?',
    quickAnswer: 'Vì diện tích nhân hai chiều: 1 m² = (100 cm) × (100 cm) = 10000 cm².',
    steps: [
      '1 m = 100 cm.',
      'Diện tích hình vuông cạnh 1 m: 1 m² = (100 cm) × (100 cm).',
      'Do đó 1 m² = 100² cm² = 10 000 cm².'
    ],
    commonError: {
      code: 'FORGET_SQUARING_UNIT_FACTOR',
      correction: 'Hệ số đổi diện tích được bình phương; thể tích được lập phương.'
    },
    hint: 'Hãy vẽ hình vuông cạnh 1 m có cạnh là 100 cm.',
    followupQuestion: '1 m³ bằng bao nhiêu cm³?'
  },
  {
    id: 'CHUNG-03',
    shape: 'common',
    category: 'mistake',
    categoryLabel: 'Sửa lỗi thường gặp',
    label: 'r bằng cm, h bằng m',
    question: 'Bồn trụ có r = 20 cm, h = 0,5 m. Em nhân trực tiếp π × 20² × 0,5 có được không? Tính dung tích theo lít, π = 3,14.',
    quickAnswer: 'Cần đổi cùng đơn vị. Dung tích = 20π L ≈ 62,8 L.',
    steps: [
      'Đổi chiều cao về cùng centimet: h = 0,5 m = 50 cm.',
      'Tính thể tích: V = π × 20² × 50 = π × 400 × 50 = 20000π cm³.',
      'Đổi sang lít: 20000π / 1000 = 20π L ≈ 20 × 3,14 = 62,8 L.'
    ],
    commonError: {
      code: 'INCONSISTENT_UNITS_MULTIPLICATION',
      correction: 'Các chiều dài trong công thức phải cùng đơn vị trước khi tính.'
    },
    hint: 'Đổi mét sang centimet rồi mới bắt đầu tính.',
    followupQuestion: 'Nếu đổi r thành 0,2 m thì có ra cùng dung tích không?'
  },
  {
    id: 'CHUNG-04',
    shape: 'common',
    category: 'understand',
    categoryLabel: 'Hiểu bản chất',
    label: 'Đề thiếu dữ kiện?',
    question: 'Một bồn hình trụ cao 10 cm nhưng không cho bán kính, đường kính hay diện tích đáy. Có tìm được dung tích cụ thể không?',
    quickAnswer: 'Chưa đủ dữ kiện; cần thêm bán kính, đường kính hoặc diện tích đáy.',
    steps: [
      'Công thức thể tích: V = S_đáy × h = πr²h.',
      'Đề bài mới chỉ cho h = 10 cm, chưa có thông tin về r hay S_đáy.',
      'Do đó chỉ biểu diễn được dưới dạng công thức V = 10πr², chưa ra số cụ thể.'
    ],
    commonError: {
      code: 'ASSUME_ARBITRARY_VALUES_WHEN_MISSING',
      correction: 'Không tự đoán bán kính hoặc lấy số trên mô hình nếu đề không cho phép.'
    },
    hint: 'Liệt kê các đại lượng công thức cần: V cần cả r và h.',
    followupQuestion: 'Nếu thêm đường kính 6 cm thì dung tích bằng bao nhiêu?'
  },
  {
    id: 'CHUNG-05',
    shape: 'common',
    category: 'mistake',
    categoryLabel: 'Sửa lỗi thường gặp',
    label: 'Khi nào thay π = 3,14?',
    question: 'Khi tính bài hình học, em nên giữ π hay thay ngay bằng 3,14?',
    quickAnswer: 'Nếu đề không yêu cầu số gần đúng, giữ π. Nếu yêu cầu π = 3,14 hoặc làm tròn, thay và làm tròn ở bước cuối.',
    steps: [
      'Kết quả chứa π là kết quả chính xác tuyệt đối theo toán học.',
      'Chỉ thay π = 3,14 khi đề bài có yêu cầu cụ thể (hoặc khi tính thực tế cần con số cụ thể).',
      'Luôn rút gọn hết phân số và π, chỉ thay 3,14 ở phép tính cuối cùng để tránh sai số dồn tích.'
    ],
    commonError: {
      code: 'PREMATURE_PI_SUBSTITUTION',
      correction: 'Không tự đổi quy ước của đề hoặc làm tròn nhiều lần giữa chừng.'
    },
    hint: 'Đọc kỹ câu hỏi cuối bài xem có yêu cầu lấy π = 3,14 hay không.',
    followupQuestion: '90π cm³ bằng bao nhiêu cm³ nếu lấy π = 3,14?'
  },
  {
    id: 'CHUNG-06',
    shape: 'common',
    category: 'real_world',
    categoryLabel: 'Bài toán thực tế',
    label: 'Kích thước ngoài có đủ?',
    question: 'Chai có đường kính ngoài 8 cm và chiều cao toàn bộ 20 cm. Có thể kết luận ngay dung tích là π × 4² × 20 cm³ không?',
    quickAnswer: 'Chưa thể. Cần xác định phần chứa bên trong, kích thước trong và mô hình hình học phù hợp.',
    steps: [
      'Kích thước ngoài bao gồm cả bề dày thành chai và đáy chai.',
      'Dung tích chứa nước là phần rỗng bên trong, phải đo theo kích thước trong.',
      'Chai nước có thể có phần cổ thu hẹp, không phải toàn bộ 20 cm đều là hình trụ.'
    ],
    commonError: {
      code: 'OUTER_DIMENSIONS_AS_CAPACITY',
      correction: 'Dung tích dùng kích thước trong của vùng chứa; không mặc định toàn vật là hình trụ.'
    },
    hint: 'Vẽ phần thực sự chứa nước rồi xác định dữ kiện.',
    followupQuestion: 'Nếu đề cho rõ phần trong là trụ d = 8 cm, h = 20 cm thì mới tính được bao nhiêu?'
  }
];
