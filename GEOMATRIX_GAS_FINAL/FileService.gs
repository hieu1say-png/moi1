/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMATRIX - GOOGLE APPS SCRIPT WEB APP
 * Module: FileService.gs
 * Chuyên trách tiện ích kiểm tra file, chẩn đoán lưu trữ và dung lượng:
 * - Kiểm tra định dạng MIME và tính hợp lệ của tệp
 * - Thống kê số lượng video và dung lượng lưu trữ trên Google Drive
 */

const FileService = {
  /**
   * Kiểm tra tính hợp lệ của tệp video trước khi nạp
   */
  validateVideoMetadata(fileName, mimeType, byteSize) {
    const errors = [];

    if (!fileName) {
      errors.push('Tên tệp tin không được để trống.');
    }

    if (byteSize > CONFIG.MAX_UPLOAD_SIZE_BYTES) {
      errors.push(`Dung lượng tệp (${Utils.formatBytes(byteSize)}) vượt quá giới hạn ${CONFIG.MAX_UPLOAD_SIZE_LABEL}.`);
    }

    // Kiểm tra đuôi file
    const extMatch = (fileName || '').match(/\.([a-zA-Z0-9]+)$/);
    const ext = extMatch ? extMatch[1].toLowerCase() : '';
    const allowedExts = ['mp4', 'webm', 'ogg', 'mov', 'm4v'];

    if (ext && allowedExts.indexOf(ext) === -1) {
      errors.push(`Đuôi mở rộng ".${ext}" không được hỗ trợ chính thức. Vui lòng sử dụng MP4 hoặc WebM.`);
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  },

  /**
   * Thống kê tình trạng kho lưu trữ video và cơ sở dữ liệu
   */
  getStorageOverview() {
    try {
      const folder = DriveService.getVideoFolder();
      const files = folder.getFiles();
      let totalBytes = 0;
      let fileCount = 0;

      while (files.hasNext()) {
        const file = files.next();
        totalBytes += file.getSize();
        fileCount++;
      }

      const ss = Database.getSpreadsheet();
      const videoSheet = ss.getSheetByName(CONFIG.SHEET_NAMES.VIDEOS);
      const rowCount = videoSheet ? Math.max(0, videoSheet.getLastRow() - 1) : 0;

      return Utils.responseSuccess({
        folderName: CONFIG.VIDEO_FOLDER_NAME,
        folderId: folder.getId(),
        folderUrl: folder.getUrl(),
        spreadsheetName: CONFIG.DATABASE_NAME,
        spreadsheetId: ss.getId(),
        spreadsheetUrl: ss.getUrl(),
        fileCount: fileCount,
        metadataRowCount: rowCount,
        totalStorageUsed: Utils.formatBytes(totalBytes),
        totalStorageBytes: totalBytes,
        maxUploadLimit: CONFIG.MAX_UPLOAD_SIZE_LABEL
      }, 'Thống kê bộ nhớ lưu trữ thành công');
    } catch (err) {
      return Utils.responseError(err, 'Lỗi kiểm tra bộ nhớ lưu trữ: ' + err.message);
    }
  }
};
