/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMATRIX - GOOGLE APPS SCRIPT WEB APP
 * Module: Code.gs
 * Tệp điều phối chính của Google Apps Script Web App:
 * - doGet(e): Khởi tạo và trả về giao diện HTML Web App
 * - include(filename): Nhúng nội dung các tệp .html (CSS, Scripts, Components)
 * - Các hàm API máy chủ tương thích 100% với google.script.run phía frontend
 */

/**
 * Hàm phục vụ giao diện Web App khi người dùng mở URL
 */
function doGet(e) {
  try {
    const template = HtmlService.createTemplateFromFile('index');
    
    // Nạp dữ liệu khởi tạo ban đầu để tăng tốc độ hiển thị trang
    template.appName = CONFIG.APP_NAME;
    template.appSubtitle = CONFIG.APP_SUBTITLE;
    template.version = CONFIG.VERSION;

    return template
      .evaluate()
      .setTitle(CONFIG.APP_NAME)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (err) {
    console.error('Lỗi nghiêm trọng trong doGet:', err);
    return HtmlService.createHtmlOutput(
      `<div style="font-family:sans-serif;padding:30px;color:#991B1B;background:#FEF2F2;border:1px solid #F87171;border-radius:12px;max-width:600px;margin:50px auto;">
        <h2>Lỗi khởi tạo GEOMATRIX Web App</h2>
        <p>${err.message}</p>
        <p>Vui lòng kiểm tra quyền truy cập Google Drive và Google Sheets trong cài đặt Apps Script.</p>
      </div>`
    );
  }
}

/**
 * Hàm nhúng nội dung file HTML con vào template chính
 * Sử dụng trong index.html: <?!= include('styles'); ?>
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/* =========================================================================
 * CÁC HÀM API PHỤC VỤ GOOGLE.SCRIPT.RUN TỪ GIAO DIỆN
 * ========================================================================= */

/**
 * Lấy toàn bộ dữ liệu cấu hình và danh mục ban đầu cho ứng dụng
 */
function apiGetInitialAppData() {
  try {
    // Đảm bảo Database và Storage sẵn sàng
    Database.getSpreadsheet();
    DriveService.getVideoFolder();

    const assignedVideos = VideoService.getAssignedLessonVideos();
    const videoList = VideoService.getVideoList('all');
    const storageInfo = FileService.getStorageOverview();

    return Utils.responseSuccess({
      config: {
        appName: CONFIG.APP_NAME,
        version: CONFIG.VERSION,
        shapes: CONFIG.SHAPES,
        maxUploadSizeBytes: CONFIG.MAX_UPLOAD_SIZE_BYTES,
        maxUploadSizeLabel: CONFIG.MAX_UPLOAD_SIZE_LABEL
      },
      assignedVideos: assignedVideos.data,
      videos: videoList.data,
      storage: storageInfo.data
    }, 'Khởi tạo ứng dụng thành công');
  } catch (err) {
    console.error('Lỗi trong apiGetInitialAppData:', err);
    return Utils.responseError(err, 'Lỗi nạp dữ liệu khởi tạo');
  }
}

/**
 * Tải lên video mới từ Frontend qua Base64 và lưu vào Drive + Sheets
 */
function apiUploadVideo(payload) {
  return VideoService.uploadVideo(payload);
}

/**
 * Lấy danh sách video (hỗ trợ lọc theo 'all' | 'cylinder' | 'cone' | 'sphere')
 */
function apiGetVideoList(shapeFilter) {
  return VideoService.getVideoList(shapeFilter || 'all');
}

/**
 * Lấy thông tin video theo ID
 */
function apiGetVideoById(id) {
  return VideoService.getVideoById(id);
}

/**
 * Cập nhật thông tin tiêu đề, mô tả của video
 */
function apiUpdateVideo(id, updates) {
  return VideoService.updateVideoMetadata(id, updates);
}

/**
 * Xoá video khỏi hệ thống (đưa file Drive vào Trash, xoá dòng trong Sheets)
 */
function apiDeleteVideo(id) {
  return VideoService.deleteVideo(id);
}

/**
 * Gán video bài giảng chính thức cho hình học cụ thể
 */
function apiAssignVideoToShape(shape, videoId) {
  return VideoService.assignVideoToShape(shape, videoId);
}

/**
 * Lấy 3 video bài giảng chính thức đang áp dụng
 */
function apiGetAssignedLessonVideos() {
  return VideoService.getAssignedLessonVideos();
}

/**
 * Lưu tiến trình học tập của học sinh
 */
function apiSaveStudentProgress(progressData) {
  try {
    if (!progressData || !progressData.studentId) {
      return Utils.responseError(null, 'Dữ liệu học sinh không hợp lệ');
    }

    const studentId = String(progressData.studentId).trim();
    const studentName = String(progressData.studentName || 'Học sinh').trim();
    const sheet = Database.getSheet(CONFIG.SHEET_NAMES.PROGRESS);
    const existing = Database.findRowById(CONFIG.SHEET_NAMES.PROGRESS, studentId);

    const rowObj = {
      studentId: studentId,
      studentName: studentName,
      lastActiveShape: progressData.lastActiveShape || 'cylinder',
      cylinderScore: progressData.cylinderScore || 0,
      coneScore: progressData.coneScore || 0,
      sphereScore: progressData.sphereScore || 0,
      completedLessons: JSON.stringify(progressData.completedLessons || []),
      lastActiveAt: new Date().toISOString()
    };

    if (existing) {
      Database.updateRowById(CONFIG.SHEET_NAMES.PROGRESS, studentId, rowObj);
    } else {
      Database.insertRow(CONFIG.SHEET_NAMES.PROGRESS, rowObj);
    }

    return Utils.responseSuccess(rowObj, 'Đã lưu tiến trình học tập lên Google Sheets.');
  } catch (err) {
    return Utils.responseError(err, 'Lỗi lưu tiến trình học sinh: ' + err.message);
  }
}

/**
 * Lấy tiến trình học tập của học sinh
 */
function apiGetStudentProgress(studentId) {
  try {
    const found = Database.findRowById(CONFIG.SHEET_NAMES.PROGRESS, studentId);
    if (!found) {
      return Utils.responseSuccess(null, 'Chưa có dữ liệu tiến trình');
    }
    return Utils.responseSuccess(found.data);
  } catch (err) {
    return Utils.responseError(err);
  }
}

/**
 * Lấy tổng quan tình trạng dung lượng và kết nối lưu trữ
 */
function apiGetStorageOverview() {
  return FileService.getStorageOverview();
}

/**
 * Kiểm tra sức khỏe toàn bộ hệ sinh thái (Drive, Sheets, Properties)
 */
function apiCheckSystemHealth() {
  try {
    const ss = Database.getSpreadsheet();
    const folder = DriveService.getVideoFolder();
    return Utils.responseSuccess({
      status: 'HEALTHY',
      spreadsheetConnected: !!ss,
      spreadsheetName: ss.getName(),
      driveFolderConnected: !!folder,
      driveFolderName: folder.getName(),
      timestamp: new Date().toISOString()
    }, 'Hệ thống GEOMATRIX đang hoạt động hoàn hảo.');
  } catch (err) {
    return Utils.responseError(err, 'Kiểm tra hệ thống phát hiện sự cố: ' + err.message);
  }
}
