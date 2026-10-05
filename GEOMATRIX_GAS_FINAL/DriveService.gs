/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMATRIX - GOOGLE APPS SCRIPT WEB APP
 * Module: DriveService.gs
 * Chuyên trách tương tác với Google Drive API:
 * - Tự động tạo và quản lý thư mục lưu trữ GEOMATRIX_VIDEO_STORAGE
 * - Nhận dữ liệu video Base64 từ trình duyệt, giải mã và ghi file vật lý vào Drive
 * - Thiết lập quyền chia sẻ công khai (Viewer with Link) để video phát được trên Web App
 * - Tạo các URL trực quan (Embed Preview URL, Direct Stream/Download URL)
 * - Quản lý di chuyển file vào Thùng rác (Trash) khi xoá video
 */

const DriveService = {
  /**
   * Lấy hoặc tạo mới thư mục lưu trữ video trên Google Drive
   */
  getVideoFolder() {
    const cachedFolderId = getAppProperty('GEOMATRIX_FOLDER_ID', '');
    if (cachedFolderId) {
      try {
        const folder = DriveApp.getFolderById(cachedFolderId);
        return folder;
      } catch (err) {
        console.warn('Folder ID trong ScriptProperties không hợp lệ. Sẽ tạo lại:', err);
      }
    }

    // Dò tìm thư mục có sẵn theo tên
    const folders = DriveApp.getFoldersByName(CONFIG.VIDEO_FOLDER_NAME);
    if (folders.hasNext()) {
      const folder = folders.next();
      setAppProperty('GEOMATRIX_FOLDER_ID', folder.getId());
      return folder;
    }

    // Nếu chưa có, tạo thư mục mới
    console.log('Tạo mới thư mục lưu trữ video trên Google Drive:', CONFIG.VIDEO_FOLDER_NAME);
    const newFolder = DriveApp.createFolder(CONFIG.VIDEO_FOLDER_NAME);
    
    // Cấp quyền công khai cho thư mục để video bên trong có thể xem được
    try {
      newFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (e) {
      console.warn('Không thể đặt quyền chia sẻ thư mục tự động (có thể do chính sách Google Workspace của tổ chức):', e);
    }

    setAppProperty('GEOMATRIX_FOLDER_ID', newFolder.getId());
    return newFolder;
  },

  /**
   * Lưu video từ chuỗi Base64 vào Google Drive
   * 
   * @param {string} base64Data - Chuỗi Data URL (data:video/mp4;base64,...) hoặc base64 thuần
   * @param {string} fileName - Tên tệp tin gốc
   * @param {string} mimeType - Định dạng MIME (video/mp4, video/webm, ...)
   * @returns {Object} Thông tin file đã lưu trên Google Drive
   */
  saveBase64VideoFile(base64Data, fileName, mimeType = 'video/mp4') {
    if (!base64Data) {
      throw new Error('Không có dữ liệu tệp video để tải lên');
    }

    // Tách phần dữ liệu Base64
    const parsed = Utils.parseBase64DataUrl(base64Data, mimeType);
    const effectiveMime = parsed.mimeType || mimeType;

    // Kiểm tra định dạng cho phép
    if (CONFIG.ALLOWED_MIME_TYPES.indexOf(effectiveMime) === -1 && effectiveMime !== 'application/octet-stream') {
      console.warn(`Định dạng MIME ${effectiveMime} không nằm trong danh sách chuẩn, nhưng vẫn tiếp tục xử lý với mimeType video.`);
    }

    // Giải mã Base64 sang Bytes
    let bytes;
    try {
      bytes = Utilities.base64Decode(parsed.base64Content);
    } catch (err) {
      throw new Error('Dữ liệu Base64 không hợp lệ, không thể giải mã: ' + err.message);
    }

    // Kiểm tra dung lượng
    const byteSize = bytes.length;
    if (byteSize > CONFIG.MAX_UPLOAD_SIZE_BYTES) {
      throw new Error(`Kích thước video (${Utils.formatBytes(byteSize)}) vượt quá giới hạn tối đa cho phép của Google Apps Script (${CONFIG.MAX_UPLOAD_SIZE_LABEL}). Vui lòng nén video hoặc chọn tệp dung lượng nhỏ hơn.`);
    }

    // Chuẩn hoá tên file
    const cleanName = Utils.sanitizeFileName(fileName);
    const blob = Utilities.newBlob(bytes, effectiveMime, cleanName);

    // Lưu file vào thư mục Drive
    const folder = this.getVideoFolder();
    const driveFile = folder.createFile(blob);

    // Thiết lập quyền xem công khai bằng liên kết
    try {
      driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (permErr) {
      console.warn('Lưu ý quyền chia sẻ file: ', permErr.message);
    }

    const fileId = driveFile.getId();
    const driveUrl = driveFile.getUrl();
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;

    return {
      fileId: fileId,
      fileName: cleanName,
      mimeType: effectiveMime,
      size: byteSize,
      driveUrl: driveUrl,
      downloadUrl: downloadUrl,
      embedUrl: embedUrl,
      folderId: folder.getId()
    };
  },

  /**
   * Đưa file trên Drive vào Thùng rác (an toàn hơn là xoá vĩnh viễn)
   */
  trashDriveFile(fileId) {
    if (!fileId || fileId.startsWith('system_default')) {
      // Bỏ qua nếu là file hệ thống mặc định
      return true;
    }

    try {
      const file = DriveApp.getFileById(fileId);
      file.setTrashed(true);
      return true;
    } catch (err) {
      console.warn(`Không thể đưa file ${fileId} vào thùng rác (có thể file không tồn tại hoặc đã bị xoá trước đó):`, err);
      return false;
    }
  },

  /**
   * Lấy thông tin chi tiết một file trên Google Drive
   */
  getDriveFileInfo(fileId) {
    try {
      const file = DriveApp.getFileById(fileId);
      return {
        id: file.getId(),
        name: file.getName(),
        size: file.getSize(),
        mimeType: file.getMimeType(),
        url: file.getUrl(),
        embedUrl: `https://drive.google.com/file/d/${file.getId()}/preview`,
        downloadUrl: `https://drive.google.com/uc?export=download&id=${file.getId()}`
      };
    } catch (err) {
      console.error('Lỗi đọc thông tin file Drive:', err);
      return null;
    }
  }
};
