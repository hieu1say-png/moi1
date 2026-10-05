/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMATRIX - GOOGLE APPS SCRIPT WEB APP
 * Module: Utils.gs
 * Chứa các hàm tiện ích dùng chung: xử lý chuỗi, sinh ID, định dạng ngày tháng, chuẩn hóa phản hồi API.
 */

const Utils = {
  /**
   * Tạo đối tượng phản hồi thành công chuẩn hoá
   */
  responseSuccess(data = null, message = 'Thao tác thành công') {
    return {
      success: true,
      data: data,
      message: message,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Tạo đối tượng phản hồi lỗi chuẩn hoá
   */
  responseError(error, defaultMsg = 'Đã xảy ra lỗi trong quá trình xử lý') {
    const errorMsg = error && error.message ? error.message : (typeof error === 'string' ? error : defaultMsg);
    console.error('[GEOMATRIX Error]:', error);
    return {
      success: false,
      data: null,
      message: errorMsg,
      errorDetail: String(error),
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Sinh mã định danh duy nhất (UUID rút gọn kèm tiền tố)
   */
  generateId(prefix = 'GEO') {
    const uuid = Utilities.getUuid().replace(/-/g, '').substring(0, 10).toUpperCase();
    const timestamp = Date.now().toString(36).toUpperCase();
    return `${prefix}-${timestamp}-${uuid}`;
  },

  /**
   * Định dạng kích thước file sang dạng con người dễ đọc (Bytes, KB, MB)
   */
  formatBytes(bytes, decimals = 2) {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },

  /**
   * Định dạng thời gian theo chuẩn Việt Nam
   */
  formatDateTime(isoDateString) {
    if (!isoDateString) return '';
    try {
      const d = new Date(isoDateString);
      return Utilities.formatDate(d, 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');
    } catch (e) {
      return String(isoDateString);
    }
  },

  /**
   * Làm sạch tên file, loại bỏ ký tự không an toàn cho Drive / Windows / Web
   */
  sanitizeFileName(name) {
    if (!name) return 'video_' + Date.now() + '.mp4';
    return name
      .replace(/[\\/*?:"<>|]/g, '_')
      .replace(/\s+/g, '_')
      .trim();
  },

  /**
   * Tách phần header Base64 Data URL (VD: "data:video/mp4;base64,...")
   * và trả về { mimeType, base64Content }
   */
  parseBase64DataUrl(dataUrl, defaultMime = 'video/mp4') {
    if (!dataUrl) {
      throw new Error('Dữ liệu Base64 rỗng');
    }

    const matches = dataUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      return {
        mimeType: matches[1],
        base64Content: matches[2]
      };
    }

    // Trường hợp là chuỗi Base64 trần (không có prefix header)
    return {
      mimeType: defaultMime,
      base64Content: dataUrl.trim()
    };
  }
};
