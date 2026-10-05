/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMATRIX - GOOGLE APPS SCRIPT WEB APP
 * Module: VideoService.gs
 * Chuyên trách nghiệp vụ Ngân hàng Video:
 * - Tiếp nhận tệp video từ giao diện, điều phối lưu trữ Drive và Sheets
 * - Đảm bảo video sau khi tải lên được lưu bền vững (không mất khi reload hoặc đổi trình duyệt)
 * - Tra cứu, cập nhật metadata, xoá video an toàn
 * - Gán video bài giảng chính thức cho từng hình (Hình Trụ, Hình Nón, Hình Cầu)
 */

const VideoService = {
  /**
   * Tải lên video mới từ Base64, lưu vào Google Drive và ghi metadata vào Google Sheets
   * 
   * @param {Object} payload Dữ liệu tải lên từ frontend
   *   - base64Data: string (Data URL hoặc base64 thuần)
   *   - fileName: string
   *   - mimeType: string
   *   - title: string
   *   - description: string
   *   - shape: string ('cylinder' | 'cone' | 'sphere' | 'all')
   *   - author: string
   *   - setAsAssigned: boolean (Tự động gán làm bài giảng chính thức)
   */
  uploadVideo(payload) {
    try {
      if (!payload || !payload.base64Data) {
        return Utils.responseError(null, 'Dữ liệu video tải lên không hợp lệ hoặc bị rỗng.');
      }

      const fileName = payload.fileName || `video_${Date.now()}.mp4`;
      const mimeType = payload.mimeType || 'video/mp4';
      const shape = payload.shape && CONFIG.SHAPES[payload.shape] ? payload.shape : 'cylinder';
      const title = (payload.title || fileName).trim();
      const description = (payload.description || '').trim();
      const author = (payload.author || 'ThS. Trần Ngọc Hiếu').trim();
      const setAsAssigned = Boolean(payload.setAsAssigned);

      // 1. Lưu file vật lý vào Google Drive
      console.log(`Bắt đầu lưu video "${title}" dung lượng lên Google Drive...`);
      const fileInfo = DriveService.saveBase64VideoFile(payload.base64Data, fileName, mimeType);

      // 2. Tạo ID duy nhất và cấu trúc metadata chuẩn
      const videoId = Utils.generateId('VID');
      const now = new Date().toISOString();

      const metadata = {
        id: videoId,
        fileId: fileInfo.fileId,
        title: title,
        description: description,
        shape: shape,
        fileName: fileInfo.fileName,
        mimeType: fileInfo.mimeType,
        size: fileInfo.size,
        duration: payload.duration || '00:15',
        driveUrl: fileInfo.driveUrl,
        embedUrl: fileInfo.embedUrl,
        downloadUrl: fileInfo.downloadUrl,
        status: 'PUBLISHED',
        assignedShape: setAsAssigned ? shape : '',
        author: author,
        createdAt: now,
        updatedAt: now
      };

      // 3. Ghi vào Google Sheet VIDEOS
      Database.insertRow(CONFIG.SHEET_NAMES.VIDEOS, metadata);

      // 4. Nếu được đánh dấu là bài giảng chính thức, cập nhật trạng thái các video khác
      if (setAsAssigned) {
        this.assignVideoToShape(shape, videoId);
      }

      console.log(`Lưu metadata video thành công: ${videoId} (Drive FileId: ${fileInfo.fileId})`);
      return Utils.responseSuccess(metadata, `Đã tải lên và lưu video thành công vào Google Drive (${Utils.formatBytes(fileInfo.size)}).`);
    } catch (err) {
      console.error('Lỗi trong VideoService.uploadVideo:', err);
      return Utils.responseError(err, 'Không thể tải lên video: ' + err.message);
    }
  },

  /**
   * Lấy danh sách video từ Google Sheets, có lọc theo hình học nếu cần
   */
  getVideoList(shapeFilter = 'all') {
    try {
      const allVideos = Database.readAllRows(CONFIG.SHEET_NAMES.VIDEOS);

      // Lọc theo hình học nếu không phải 'all'
      let filtered = allVideos;
      if (shapeFilter && shapeFilter !== 'all') {
        filtered = allVideos.filter(v => v.shape === shapeFilter || v.assignedShape === shapeFilter || v.shape === 'all');
      }

      // Sắp xếp: Video gán chính thức lên trước, sau đó là video mới nhất
      filtered.sort((a, b) => {
        if (a.assignedShape && !b.assignedShape) return -1;
        if (!a.assignedShape && b.assignedShape) return 1;
        const timeA = new Date(a.createdAt || 0).getTime();
        const timeB = new Date(b.createdAt || 0).getTime();
        return timeB - timeA;
      });

      return Utils.responseSuccess(filtered, 'Tải danh sách video thành công');
    } catch (err) {
      console.error('Lỗi trong VideoService.getVideoList:', err);
      return Utils.responseError(err, 'Không thể tải danh sách video: ' + err.message);
    }
  },

  /**
   * Lấy chi tiết một video theo ID
   */
  getVideoById(id) {
    try {
      const found = Database.findRowById(CONFIG.SHEET_NAMES.VIDEOS, id);
      if (!found) {
        return Utils.responseError(null, `Không tìm thấy video với mã ID: ${id}`);
      }
      return Utils.responseSuccess(found.data);
    } catch (err) {
      return Utils.responseError(err);
    }
  },

  /**
   * Cập nhật thông tin tiêu đề, mô tả hoặc hình học của video
   */
  updateVideoMetadata(id, updates) {
    try {
      if (!id) return Utils.responseError(null, 'Mã video không hợp lệ');

      const safeUpdates = {};
      if (updates.title !== undefined) safeUpdates.title = String(updates.title).trim();
      if (updates.description !== undefined) safeUpdates.description = String(updates.description).trim();
      if (updates.shape !== undefined) safeUpdates.shape = String(updates.shape).trim();
      if (updates.status !== undefined) safeUpdates.status = String(updates.status).trim();
      if (updates.author !== undefined) safeUpdates.author = String(updates.author).trim();

      const updated = Database.updateRowById(CONFIG.SHEET_NAMES.VIDEOS, id, safeUpdates);
      return Utils.responseSuccess(updated, 'Cập nhật thông tin video thành công');
    } catch (err) {
      return Utils.responseError(err, 'Lỗi cập nhật video: ' + err.message);
    }
  },

  /**
   * Xoá video: đưa tệp trên Drive vào Thùng rác và xoá dòng trong Google Sheet
   */
  deleteVideo(id) {
    try {
      const found = Database.findRowById(CONFIG.SHEET_NAMES.VIDEOS, id);
      if (!found) {
        return Utils.responseError(null, `Không tìm thấy video có mã ${id} để xoá.`);
      }

      const videoData = found.data;
      const fileId = videoData.fileId;

      // Không cho phép xoá video mặc định của hệ thống
      if (String(id).startsWith('SYS-VID-')) {
        return Utils.responseError(null, 'Không thể xoá video bài giảng chuẩn mặc định của hệ thống.');
      }

      // Đưa file trên Drive vào thùng rác
      if (fileId) {
        DriveService.trashDriveFile(fileId);
      }

      // Xoá bản ghi trong Sheet
      Database.deleteRowById(CONFIG.SHEET_NAMES.VIDEOS, id);

      return Utils.responseSuccess({ id: id }, `Đã xoá video "${videoData.title}" thành công khỏi hệ thống và Google Drive.`);
    } catch (err) {
      console.error('Lỗi khi xoá video:', err);
      return Utils.responseError(err, 'Không thể xoá video: ' + err.message);
    }
  },

  /**
   * Gán một video làm bài giảng chính thức cho hình (Hình Trụ, Nón, Cầu)
   */
  assignVideoToShape(shape, videoId) {
    try {
      if (!CONFIG.SHAPES[shape]) {
        return Utils.responseError(null, `Chủ đề hình "${shape}" không hợp lệ.`);
      }

      const allVideos = Database.readAllRows(CONFIG.SHEET_NAMES.VIDEOS);

      // Cập nhật lại các video: gỡ assignedShape nếu hình đó đã được gán trước đó
      allVideos.forEach(v => {
        if (v.assignedShape === shape && v.id !== videoId) {
          Database.updateRowById(CONFIG.SHEET_NAMES.VIDEOS, v.id, { assignedShape: '' });
        }
      });

      // Gán video mục tiêu
      const updated = Database.updateRowById(CONFIG.SHEET_NAMES.VIDEOS, videoId, {
        assignedShape: shape,
        shape: shape
      });

      // Lưu thiết lập vào ScriptProperties để tra cứu siêu tốc
      setAppProperty(`ASSIGNED_VIDEO_${shape.toUpperCase()}`, videoId);

      return Utils.responseSuccess(updated, `Đã gán video làm bài giảng chính thức cho ${CONFIG.SHAPES[shape].name}.`);
    } catch (err) {
      return Utils.responseError(err, 'Lỗi khi gán video bài giảng: ' + err.message);
    }
  },

  /**
   * Lấy danh sách 3 video bài giảng chính thức cho 3 hình (Cylinder, Cone, Sphere)
   */
  getAssignedLessonVideos() {
    try {
      const allVideos = Database.readAllRows(CONFIG.SHEET_NAMES.VIDEOS);
      const result = {
        cylinder: null,
        cone: null,
        sphere: null
      };

      // Tìm video được gán
      allVideos.forEach(v => {
        if (v.assignedShape && result[v.assignedShape] === null) {
          result[v.assignedShape] = v;
        }
      });

      // Nếu hình nào chưa có video gán riêng, fallback về video mặc định theo shape
      ['cylinder', 'cone', 'sphere'].forEach(shape => {
        if (!result[shape]) {
          const match = allVideos.find(v => v.shape === shape) || CONFIG.DEFAULT_VIDEOS.find(v => v.shape === shape);
          result[shape] = match || null;
        }
      });

      return Utils.responseSuccess(result, 'Lấy video bài giảng chính thức thành công');
    } catch (err) {
      return Utils.responseError(err, 'Lỗi lấy video bài giảng: ' + err.message);
    }
  }
};
