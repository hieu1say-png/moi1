/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - CENTRALIZED VIDEO REGISTRY (Nguồn dữ liệu video trung tâm)
 * Tuân thủ nghiêm ngặt nguyên tắc Zero-Fake Video:
 * - CHỈ đặt status = 'active' khi file vật lý thực sự tồn tại trong storage và URL phát được.
 * - Khi file chưa có trên đĩa cứng: status = 'pending_storage'.
 * - Giao diện Lý thuyết hiển thị: "Video bài học chưa được giáo viên cung cấp."
 */

export interface VideoRegistryItem {
  id: string;
  title: string;
  topic: 'cylinder' | 'cone' | 'sphere';
  fileName: string;
  mimeType: string;
  storagePath: string;
  url: string;
  poster: string;
  status: 'active' | 'pending_storage' | 'inactive';
  version: number;
  uploadedAt: string;
  durationFormatted: string;
  durationSeconds: number;
  instructor: string;
  sourceOrigin: string;
  chapters: {
    time: number;
    label: string;
    description: string;
  }[];
}

export const videoRegistry: Record<'cylinder' | 'cone' | 'sphere', VideoRegistryItem> = {
  cylinder: {
    id: 'theory-cylinder',
    title: 'Video bài học Hình trụ - Nhận biết và Khai triển hình trụ',
    topic: 'cylinder',
    fileName: 'video_thuc_te_hinh_tru.mp4',
    mimeType: 'video/mp4',
    storagePath: 'videos/theory/cylinder/video_thuc_te_hinh_tru.mp4',
    url: '/videos/theory/cylinder/video_thuc_te_hinh_tru.mp4',
    poster: '/videos/tru_poster.jpg',
    status: 'pending_storage', // Chỉ chuyển sang 'active' khi tệp video vật lý tồn tại
    version: 1,
    uploadedAt: '2026-09-12T08:42:00.000Z',
    durationFormatted: '09:27',
    durationSeconds: 567,
    instructor: 'Thầy Cao Đô (OLM.vn) - Toán 9 Kết nối tri thức',
    sourceOrigin: 'Video bài giảng thực tế gửi kèm prompt',
    chapters: [
      { time: 0, label: '00:00', description: 'Mở đầu: Một số hình khối trong thực tiễn' },
      { time: 27, label: '00:27', description: 'Hình ảnh thực tế của hình trụ (màng co, lon sữa, cốc thủy tinh)' },
      { time: 56, label: '00:56', description: 'Nhận biết hình trụ & Tạo lập khi quay hình chữ nhật' },
      { time: 136, label: '02:16', description: 'Các yếu tố: Bán kính đáy R, Đường sinh, Chiều cao h' },
      { time: 292, label: '04:52', description: 'Câu hỏi thực hành 1: Bán kính, đường sinh, chiều cao' },
      { time: 317, label: '05:17', description: 'Câu hỏi thực hành 2: Xác định kích thước hình trụ' },
      { time: 360, label: '06:00', description: 'Khái niệm hình khai triển của hình trụ' },
      { time: 429, label: '07:09', description: 'Thực hành cuộn bảng giấy thành hình trụ' },
      { time: 484, label: '08:04', description: 'Ghép và dán 3 miếng bìa thành hình trụ' }
    ]
  },
  cone: {
    id: 'theory-cone',
    title: 'Video bài học Hình nón - Nhận biết và Sự tạo thành hình nón',
    topic: 'cone',
    fileName: 'video_thuc_te_hinh_non.mp4',
    mimeType: 'video/mp4',
    storagePath: 'videos/theory/cone/video_thuc_te_hinh_non.mp4',
    url: '/videos/theory/cone/video_thuc_te_hinh_non.mp4',
    poster: '/videos/non_poster.jpg',
    status: 'pending_storage', // Chỉ chuyển sang 'active' khi tệp video vật lý tồn tại
    version: 1,
    uploadedAt: '2026-09-12T08:42:00.000Z',
    durationFormatted: '09:44',
    durationSeconds: 584,
    instructor: 'Thầy Cao Đô (OLM.vn) - Toán 9 Kết nối tri thức',
    sourceOrigin: 'Video bài giảng thực tế gửi kèm prompt',
    chapters: [
      { time: 0, label: '00:00', description: 'Mở đầu: Giới thiệu hình nón trong thực tiễn & nón lá' },
      { time: 35, label: '00:35', description: 'Nhận biết hình nón: Đỉnh S, Đáy hình tròn tâm O, Đường sinh SA, Chiều cao SO' },
      { time: 80, label: '01:20', description: 'Sự tạo thành hình nón khi quay tam giác vuông quanh cạnh góc vuông' },
      { time: 202, label: '03:22', description: 'Mối liên hệ Pythagore giữa đường sinh l, chiều cao h, bán kính r (l² = h² + r²)' },
      { time: 280, label: '04:40', description: 'Luyện tập 1: Chỉ ra đỉnh, đường cao, bán kính đáy, đường sinh' },
      { time: 316, label: '05:16', description: 'Luyện tập 2: Tính chiều cao và độ dài đường sinh' },
      { time: 385, label: '06:25', description: 'Thực nghiệm tạo lập hình nón từ miếng bìa hình tròn và dây' },
      { time: 468, label: '07:48', description: 'Ghép dán hình tròn và hình quạt tròn thành hình nón' },
      { time: 510, label: '08:30', description: 'Luyện tập 3: Tính toán độ dài đường sinh và chiều cao' }
    ]
  },
  sphere: {
    id: 'theory-sphere',
    title: 'Video bài học Hình cầu - Nhận biết hình cầu và Mặt cầu',
    topic: 'sphere',
    fileName: 'video_thuc_te_hinh_cau.mp4',
    mimeType: 'video/mp4',
    storagePath: 'videos/theory/sphere/video_thuc_te_hinh_cau.mp4',
    url: '/videos/theory/sphere/video_thuc_te_hinh_cau.mp4',
    poster: '/videos/cau_poster.jpg',
    status: 'pending_storage', // Chỉ chuyển sang 'active' khi tệp video vật lý tồn tại
    version: 1,
    uploadedAt: '2026-09-12T08:42:00.000Z',
    durationFormatted: '06:01',
    durationSeconds: 361,
    instructor: 'Thầy Cao Đô (OLM.vn) - Toán 9 Kết nối tri thức',
    sourceOrigin: 'Video bài giảng thực tế gửi kèm prompt',
    chapters: [
      { time: 0, label: '00:00', description: 'Mở đầu: Giới thiệu các vật thể hình cầu trong thực tiễn' },
      { time: 24, label: '00:24', description: 'Vật thể hình cầu: Trái Đất, quả bóng đá, quả cam, quả trang trí Noel' },
      { time: 53, label: '00:53', description: 'Sự tạo thành hình cầu khi quay nửa hình tròn một vòng quanh đường kính' },
      { time: 110, label: '01:50', description: 'Khái niệm mặt cầu: Nửa đường tròn quét nên mặt cầu (Tâm O, đường kính AB, bán kính R)' },
      { time: 170, label: '02:50', description: 'Luyện tập 1: Cho biết tâm và bán kính hình cầu' },
      { time: 183, label: '03:03', description: 'Luyện tập 2: Kể tên tâm và bán kính của mặt cầu' },
      { time: 207, label: '03:27', description: 'Tạo lập hình cầu bằng cách ghép dán nhiều miếng bìa nửa hình tròn' },
      { time: 277, label: '04:37', description: 'Nhận biết phần chung giữa mặt phẳng và mặt cầu (mặt cắt quả cam)' },
      { time: 308, label: '05:08', description: 'Thiết diện mặt phẳng: Mặt phẳng đi qua tâm cắt hình cầu tạo hình tròn lớn' }
    ]
  }
};

/**
 * Helper to get video registry entry for a shape
 */
export function getVideoRegistryByTopic(topic: string): VideoRegistryItem | null {
  const norm = topic.toLowerCase();
  if (norm === 'cylinder' || norm === 'cone' || norm === 'sphere') {
    return videoRegistry[norm as 'cylinder' | 'cone' | 'sphere'];
  }
  return null;
}
