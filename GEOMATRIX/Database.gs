/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMATRIX - GOOGLE APPS SCRIPT WEB APP
 * Module: Database.gs
 * Quản trị Google Sheets làm cơ sở dữ liệu bền vững:
 * - Tự động tìm hoặc tạo file Spreadsheet GEOMATRIX_DATABASE
 * - Tự động khởi tạo cấu trúc các sheet (VIDEOS, PROGRESS, ASSIGNMENTS, SETTINGS)
 * - Tự động nạp dữ liệu video bài giảng khởi tạo nếu cơ sở dữ liệu mới tạo
 * - Cung cấp các thao tác CRUD an toàn và hỗ trợ đồng bộ dữ liệu hai chiều
 */

const Database = {
  /**
   * Lấy Spreadsheet cơ sở dữ liệu.
   * Nếu chưa tồn tại, tự động tạo mới trên Google Drive và lưu ID vào ScriptProperties.
   */
  getSpreadsheet() {
    const cachedId = getAppProperty('GEOMATRIX_SPREADSHEET_ID', '');
    if (cachedId) {
      try {
        const ss = SpreadsheetApp.openById(cachedId);
        return ss;
      } catch (err) {
        console.warn('ID Spreadsheet trong ScriptProperties không hợp lệ hoặc đã bị xoá. Sẽ dò tìm hoặc tạo mới:', err);
      }
    }

    // Dò tìm trên Drive file có tên CONFIG.DATABASE_NAME
    const files = DriveApp.getFilesByName(CONFIG.DATABASE_NAME);
    if (files.hasNext()) {
      const file = files.next();
      const ss = SpreadsheetApp.open(file);
      setAppProperty('GEOMATRIX_SPREADSHEET_ID', ss.getId());
      this.ensureSheetsStructure(ss);
      return ss;
    }

    // Nếu chưa có, tạo Spreadsheet mới
    console.log('Tạo mới Google Spreadsheet Database:', CONFIG.DATABASE_NAME);
    const newSs = SpreadsheetApp.create(CONFIG.DATABASE_NAME);
    const newId = newSs.getId();
    setAppProperty('GEOMATRIX_SPREADSHEET_ID', newId);

    // Thiết lập quyền truy cập cho tệp database
    try {
      const driveFile = DriveApp.getFileById(newId);
      // Giữ quyền truy cập an toàn cho giáo viên/chủ sở hữu
      driveFile.setDescription('Cơ sở dữ liệu lưu trữ metadata video và tiến trình học tập của ứng dụng GEOMATRIX.');
    } catch (e) {
      console.warn('Lỗi thiết lập mô tả file spreadsheet:', e);
    }

    this.ensureSheetsStructure(newSs);
    return newSs;
  },

  /**
   * Đảm bảo cấu trúc các Sheet và dòng tiêu đề chuẩn mực
   */
  ensureSheetsStructure(ss) {
    // 1. Cấu hình Sheet VIDEOS
    let videoSheet = ss.getSheetByName(CONFIG.SHEET_NAMES.VIDEOS);
    const videoHeaders = [
      'ID',
      'FILE_ID',
      'TITLE',
      'DESCRIPTION',
      'SHAPE',
      'FILE_NAME',
      'MIME_TYPE',
      'SIZE',
      'DURATION',
      'DRIVE_URL',
      'EMBED_URL',
      'DOWNLOAD_URL',
      'STATUS',
      'ASSIGNED_SHAPE',
      'AUTHOR',
      'CREATED_AT',
      'UPDATED_AT'
    ];

    if (!videoSheet) {
      videoSheet = ss.insertSheet(CONFIG.SHEET_NAMES.VIDEOS);
      videoSheet.appendRow(videoHeaders);
      videoSheet.setFrozenRows(1);
      videoSheet.getRange(1, 1, 1, videoHeaders.length).setFontWeight('bold').setBackground('#E2E8F0');
      
      // Tự động gieo mầm dữ liệu video mặc định
      this.seedDefaultVideos(videoSheet, videoHeaders);
    } else {
      // Nếu sheet đã có nhưng rỗng
      if (videoSheet.getLastRow() === 0) {
        videoSheet.appendRow(videoHeaders);
        videoSheet.setFrozenRows(1);
        videoSheet.getRange(1, 1, 1, videoHeaders.length).setFontWeight('bold').setBackground('#E2E8F0');
        this.seedDefaultVideos(videoSheet, videoHeaders);
      }
    }

    // 2. Cấu hình Sheet PROGRESS (Tiến trình học sinh)
    let progressSheet = ss.getSheetByName(CONFIG.SHEET_NAMES.PROGRESS);
    const progressHeaders = [
      'STUDENT_ID',
      'STUDENT_NAME',
      'LAST_ACTIVE_SHAPE',
      'CYLINDER_SCORE',
      'CONE_SCORE',
      'SPHERE_SCORE',
      'COMPLETED_LESSONS',
      'LAST_ACTIVE_AT'
    ];
    if (!progressSheet) {
      progressSheet = ss.insertSheet(CONFIG.SHEET_NAMES.PROGRESS);
      progressSheet.appendRow(progressHeaders);
      progressSheet.setFrozenRows(1);
      progressSheet.getRange(1, 1, 1, progressHeaders.length).setFontWeight('bold').setBackground('#FEF3C7');
    }

    // 3. Cấu hình Sheet ASSIGNMENTS (Bài tập giao từ giáo viên)
    let assignmentSheet = ss.getSheetByName(CONFIG.SHEET_NAMES.ASSIGNMENTS);
    const assignmentHeaders = [
      'ID',
      'TITLE',
      'SHAPE',
      'QUESTION_IDS',
      'DEADLINE',
      'CLASS_NAME',
      'CREATED_AT'
    ];
    if (!assignmentSheet) {
      assignmentSheet = ss.insertSheet(CONFIG.SHEET_NAMES.ASSIGNMENTS);
      assignmentSheet.appendRow(assignmentHeaders);
      assignmentSheet.setFrozenRows(1);
      assignmentSheet.getRange(1, 1, 1, assignmentHeaders.length).setFontWeight('bold').setBackground('#DCFCE7');
    }

    // Xoá sheet mặc định "Sheet1" nếu có
    const defaultSheet = ss.getSheetByName('Sheet1') || ss.getSheetByName('Trang tính1');
    if (defaultSheet && ss.getSheets().length > 1) {
      try {
        ss.deleteSheet(defaultSheet);
      } catch (e) {
        // Bỏ qua nếu là sheet duy nhất
      }
    }
  },

  /**
   * Nạp sẵn các bản ghi video bài giảng lý thuyết SGK Toán 9
   */
  seedDefaultVideos(sheet, headers) {
    CONFIG.DEFAULT_VIDEOS.forEach((vid) => {
      const row = headers.map((key) => {
        const propName = this.columnHeaderToProp(key);
        return vid[propName] !== undefined ? vid[propName] : '';
      });
      sheet.appendRow(row);
    });
  },

  /**
   * Chuyển đổi tên Header cột sang tên thuộc tính Javascript (camelCase)
   */
  columnHeaderToProp(header) {
    const map = {
      'ID': 'id',
      'FILE_ID': 'fileId',
      'TITLE': 'title',
      'DESCRIPTION': 'description',
      'SHAPE': 'shape',
      'FILE_NAME': 'fileName',
      'MIME_TYPE': 'mimeType',
      'SIZE': 'size',
      'DURATION': 'duration',
      'DRIVE_URL': 'driveUrl',
      'EMBED_URL': 'embedUrl',
      'DOWNLOAD_URL': 'downloadUrl',
      'STATUS': 'status',
      'ASSIGNED_SHAPE': 'assignedShape',
      'AUTHOR': 'author',
      'CREATED_AT': 'createdAt',
      'UPDATED_AT': 'updatedAt',
      'STUDENT_ID': 'studentId',
      'STUDENT_NAME': 'studentName',
      'LAST_ACTIVE_SHAPE': 'lastActiveShape',
      'CYLINDER_SCORE': 'cylinderScore',
      'CONE_SCORE': 'coneScore',
      'SPHERE_SCORE': 'sphereScore',
      'COMPLETED_LESSONS': 'completedLessons',
      'LAST_ACTIVE_AT': 'lastActiveAt',
      'QUESTION_IDS': 'questionIds',
      'DEADLINE': 'deadline',
      'CLASS_NAME': 'className'
    };
    return map[header] || header.toLowerCase();
  },

  /**
   * Lấy một Sheet cụ thể theo tên
   */
  getSheet(sheetName) {
    const ss = this.getSpreadsheet();
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      this.ensureSheetsStructure(ss);
      sheet = ss.getSheetByName(sheetName);
    }
    return sheet;
  },

  /**
   * Đọc toàn bộ các hàng trong một sheet thành danh sách đối tượng
   */
  readAllRows(sheetName) {
    const sheet = this.getSheet(sheetName);
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();

    if (lastRow <= 1 || lastCol === 0) {
      return [];
    }

    const data = sheet.getRange(1, 1, lastRow, lastCol).getValues();
    const headers = data[0];
    const results = [];

    for (let r = 1; r < data.length; r++) {
      const row = data[r];
      // Bỏ qua hàng trống hoàn toàn
      if (row.every(cell => cell === '' || cell === null)) continue;

      const item = {};
      headers.forEach((header, c) => {
        const propName = this.columnHeaderToProp(header);
        item[propName] = row[c];
      });
      results.push(item);
    }

    return results;
  },

  /**
   * Tìm một hàng theo trường ID
   */
  findRowById(sheetName, id) {
    const sheet = this.getSheet(sheetName);
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();

    if (lastRow <= 1) return null;

    const data = sheet.getRange(1, 1, lastRow, lastCol).getValues();
    const headers = data[0];
    const idColIndex = headers.indexOf('ID') !== -1 ? headers.indexOf('ID') : headers.indexOf('STUDENT_ID');

    if (idColIndex === -1) return null;

    for (let r = 1; r < data.length; r++) {
      if (String(data[r][idColIndex]) === String(id)) {
        const item = {};
        headers.forEach((header, c) => {
          const propName = this.columnHeaderToProp(header);
          item[propName] = data[r][c];
        });
        return {
          rowNumber: r + 1,
          data: item
        };
      }
    }

    return null;
  },

  /**
   * Chèn một dòng mới vào Sheet
   */
  insertRow(sheetName, rowObject) {
    const sheet = this.getSheet(sheetName);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    const row = headers.map((header) => {
      const prop = this.columnHeaderToProp(header);
      return rowObject[prop] !== undefined ? rowObject[prop] : '';
    });

    sheet.appendRow(row);
    return rowObject;
  },

  /**
   * Cập nhật một dòng theo ID
   */
  updateRowById(sheetName, id, updateFields) {
    const found = this.findRowById(sheetName, id);
    if (!found) {
      throw new Error(`Không tìm thấy bản ghi có ID = ${id} trong bảng ${sheetName}`);
    }

    const sheet = this.getSheet(sheetName);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const updatedData = { ...found.data, ...updateFields, updatedAt: new Date().toISOString() };

    const newRow = headers.map((header) => {
      const prop = this.columnHeaderToProp(header);
      return updatedData[prop] !== undefined ? updatedData[prop] : '';
    });

    sheet.getRange(found.rowNumber, 1, 1, headers.length).setValues([newRow]);
    return updatedData;
  },

  /**
   * Xoá một dòng theo ID
   */
  deleteRowById(sheetName, id) {
    const found = this.findRowById(sheetName, id);
    if (!found) {
      throw new Error(`Không tìm thấy bản ghi có ID = ${id} trong bảng ${sheetName}`);
    }

    const sheet = this.getSheet(sheetName);
    sheet.deleteRow(found.rowNumber);
    return true;
  }
};
