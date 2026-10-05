/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMATRIX - GOOGLE APPS SCRIPT WEB APP
 * Module: Config.gs
 * Chứa cấu hình toàn cục, hằng số, danh mục bài giảng mặc định và quản trị thuộc tính.
 */

const CONFIG = {
  APP_NAME: 'GEOMATRIX – Phòng Thí Nghiệm Hình Học Toán 9',
  APP_SUBTITLE: 'Khám phá Hình Trụ – Hình Nón – Hình Cầu & Quản lý Video Google Drive',
  VERSION: '3.0.0-GAS',
  
  // Tên thư mục lưu trữ Video trên Google Drive
  VIDEO_FOLDER_NAME: 'GEOMATRIX_VIDEO_STORAGE',
  
  // Tên Google Spreadsheet dùng làm Cơ sở dữ liệu
  DATABASE_NAME: 'GEOMATRIX_DATABASE',
  
  // Giới hạn dung lượng tải lên qua google.script.run (Base64 payload)
  // Khuyến cáo của Google Apps Script là < 25MB để tránh quá tải bộ nhớ và giới hạn request payload
  MAX_UPLOAD_SIZE_BYTES: 25 * 1024 * 1024, // 25 MB
  MAX_UPLOAD_SIZE_LABEL: '25 MB',
  
  // Các định dạng MIME video được hỗ trợ
  ALLOWED_MIME_TYPES: [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/quicktime'
  ],
  
  // Tên các Sheets trong Spreadsheet
  SHEET_NAMES: {
    VIDEOS: 'VIDEOS',
    PROGRESS: 'PROGRESS',
    ASSIGNMENTS: 'ASSIGNMENTS',
    SETTINGS: 'SETTINGS'
  },
  
  // Danh mục 3 hình học cốt lõi
  SHAPES: {
    cylinder: {
      id: 'cylinder',
      name: 'Hình Trụ',
      subtitle: 'Sự quay của hình chữ nhật',
      formulaSxq: 'S_{xq} = 2\\pi rh',
      formulaStp: 'S_{tp} = 2\\pi rh + 2\\pi r^2',
      formulaV: 'V = \\pi r^2 h',
      defaultR: 3,
      defaultH: 6
    },
    cone: {
      id: 'cone',
      name: 'Hình Nón',
      subtitle: 'Sự quay của tam giác vuông quanh trục',
      formulaSxq: 'S_{xq} = \\pi rl',
      formulaStp: 'S_{tp} = \\pi rl + \\pi r^2',
      formulaV: 'V = \\frac{1}{3}\\pi r^2 h',
      formulaL: 'l = \\sqrt{r^2 + h^2}',
      defaultR: 3,
      defaultH: 4
    },
    sphere: {
      id: 'sphere',
      name: 'Hình Cầu',
      subtitle: 'Sự quay của nửa hình tròn quanh đường kính',
      formulaS: 'S = 4\\pi R^2 = \\pi d^2',
      formulaV: 'V = \\frac{4}{3}\\pi R^3',
      defaultR: 4
    }
  },
  
  // Video bài giảng mặc định (chuẩn bị sẵn để hệ thống luôn có dữ liệu chuẩn SGK)
  DEFAULT_VIDEOS: [
    {
      id: 'SYS-VID-CYLINDER',
      fileId: 'system_default_cylinder',
      title: 'Video Bài Giảng: Khái Niệm, Sự Tạo Thành & Công Thức Hình Trụ',
      description: 'Bài giảng chuẩn SGK Toán 9: Quan sát sự quay của hình chữ nhật quanh trục, xác định bán kính đáy r, chiều cao h, công thức diện tích xung quanh và thể tích hình trụ.',
      shape: 'cylinder',
      fileName: 'hinh-tru-toan-9.mp4',
      mimeType: 'video/mp4',
      size: 15420000,
      duration: '00:15',
      driveUrl: '',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      downloadUrl: '',
      status: 'PUBLISHED',
      assignedShape: 'cylinder',
      author: 'ThS. Trần Ngọc Hiếu (Trường PT Thực Hành Sư Phạm)',
      createdAt: '2026-09-01T08:00:00.000Z',
      updatedAt: '2026-09-01T08:00:00.000Z'
    },
    {
      id: 'SYS-VID-CONE',
      fileId: 'system_default_cone',
      title: 'Video Bài Giảng: Sự Tạo Thành, Đường Sinh & Thể Tích Hình Nón',
      description: 'Quan sát tam giác vuông quay quanh một cạnh góc vuông, mối liên hệ Pytago l² = h² + r², giải thích trực quan nghịch lý thể tích hình nón bằng 1/3 hình trụ cùng đáy và chiều cao.',
      shape: 'cone',
      fileName: 'hinh-non-toan-9.mp4',
      mimeType: 'video/mp4',
      size: 14890000,
      duration: '00:15',
      driveUrl: '',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      downloadUrl: '',
      status: 'PUBLISHED',
      assignedShape: 'cone',
      author: 'ThS. Trần Ngọc Hiếu (Trường PT Thực Hành Sư Phạm)',
      createdAt: '2026-09-01T08:00:00.000Z',
      updatedAt: '2026-09-01T08:00:00.000Z'
    },
    {
      id: 'SYS-VID-SPHERE',
      fileId: 'system_default_sphere',
      title: 'Video Bài Giảng: Diện Tích Mặt Cầu & Thể Tích Khối Cầu',
      description: 'Khái niệm mặt cầu và khối cầu, sự tạo thành khi quay nửa hình tròn quanh đường kính. Bảng tra công thức diện tích S = 4πR² và thể tích V = (4/3)πR³.',
      shape: 'sphere',
      fileName: 'hinh-cau-toan-9.mp4',
      mimeType: 'video/mp4',
      size: 16210000,
      duration: '00:15',
      driveUrl: '',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      downloadUrl: '',
      status: 'PUBLISHED',
      assignedShape: 'sphere',
      author: 'ThS. Trần Ngọc Hiếu (Trường PT Thực Hành Sư Phạm)',
      createdAt: '2026-09-01T08:00:00.000Z',
      updatedAt: '2026-09-01T08:00:00.000Z'
    }
  ]
};

/**
 * Lấy một thuộc tính được lưu trong PropertiesService
 */
function getAppProperty(key, defaultValue = '') {
  try {
    const prop = PropertiesService.getScriptProperties().getProperty(key);
    return prop !== null ? prop : defaultValue;
  } catch (err) {
    console.warn('Lỗi đọc ScriptProperties:', err);
    return defaultValue;
  }
}

/**
 * Lưu thuộc tính vào PropertiesService
 */
function setAppProperty(key, value) {
  try {
    PropertiesService.getScriptProperties().setProperty(key, String(value));
    return true;
  } catch (err) {
    console.error('Lỗi ghi ScriptProperties:', err);
    return false;
  }
}
