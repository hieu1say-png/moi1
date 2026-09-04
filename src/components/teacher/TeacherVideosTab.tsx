/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Teacher Videos Management Tab (V3.0)
 * Server-Authoritative Persistent Video Management for Cylinder, Cone, and Sphere.
 * - Multi-Tab Navigation: TẤT CẢ, HÌNH TRỤ, HÌNH NÓN, HÌNH CẦU
 * - Search, Filters (Status, Section), and Multi-criteria Sorting
 * - Real Video & Thumbnail File Upload with Progress Tracking (0-100%)
 * - Full Status Lifecycle: DRAFT ↔ PUBLISHED ↔ ARCHIVED
 * - Health Check Verification (Available / Unavailable)
 * - KaTeX Formula Preview
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  TheoryVideo,
  VideoTopic,
  VideoSection,
  VideoStatus,
  VideoCitation,
  SECTION_LABELS
} from '../../types/theoryVideo';
import { TheoryVideoService } from '../../services/theoryVideoService';
import { MathText } from '../common/MathFormula';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import {
  Film,
  Plus,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  User,
  Upload,
  Play,
  RotateCcw,
  Sparkles,
  X,
  Layers,
  AlertTriangle,
  FileVideo,
  Archive,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  ArrowUpDown,
  Bookmark
} from 'lucide-react';
import { Button } from '../common/Button';
import { LessonVideo } from '../video/LessonVideo';

type SortOption = 'ORDER' | 'CREATED_DESC' | 'UPDATED_DESC' | 'TITLE_ASC';
type UploadStepState = 'IDLE' | 'SELECTED' | 'UPLOADING' | 'SAVING' | 'SAVED' | 'ERROR';

export const TeacherVideosTab: React.FC = () => {
  const { showSuccess, showError, showInfo } = useToast();
  const { teacherUser } = useAuth();

  const [videos, setVideos] = useState<TheoryVideo[]>([]);
  const [activeTopicTab, setActiveTopicTab] = useState<'ALL' | VideoTopic>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [sortOption, setSortOption] = useState<SortOption>('ORDER');

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<TheoryVideo | null>(null);
  const [deleteConfirmVideo, setDeleteConfirmVideo] = useState<TheoryVideo | null>(null);

  // Upload states
  const [uploadStep, setUploadStep] = useState<UploadStepState>('IDLE');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState<boolean>(false);
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

  // Health checks cache
  const [healthMap, setHealthMap] = useState<Record<string, boolean>>({});
  const isSubmittingRef = useRef<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form inputs
  const [formData, setFormData] = useState({
    title: '',
    topic: 'CYLINDER' as VideoTopic,
    section: 'THEORY' as VideoSection,
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
    duration: '05:00',
    fileName: '',
    fileSize: 0,
    mimeType: '',
    order: 1,
    status: 'PUBLISHED' as VideoStatus,
    citations: [] as VideoCitation[],
    authorName: teacherUser?.fullName || 'ThS. Trần Ngọc Hiếu',
    authorId: teacherUser?.id || 'usr-teacher-001'
  });

  const loadVideos = () => {
    TheoryVideoService.fetchVideosFromServer().then((list) => {
      setVideos(list);
    });
  };

  useEffect(() => {
    loadVideos();

    // Subscribe to real-time service updates
    const unsubscribe = TheoryVideoService.subscribe((updatedVideos) => {
      setVideos(updatedVideos);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Filtered & Sorted list
  const filteredVideos = useMemo(() => {
    const list = videos.filter((v) => {
      const matchTopic = activeTopicTab === 'ALL' || v.topic === activeTopicTab;
      const matchSearch =
        !searchQuery.trim() ||
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (v.authorName && v.authorName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchSection = selectedSectionFilter === 'ALL' || v.section === selectedSectionFilter;
      const matchStatus = selectedStatusFilter === 'ALL' || v.status === selectedStatusFilter;

      return matchTopic && matchSearch && matchSection && matchStatus;
    });

    return list.sort((a, b) => {
      if (sortOption === 'ORDER') return a.order - b.order;
      if (sortOption === 'CREATED_DESC') return (b.createdAt || 0) - (a.createdAt || 0);
      if (sortOption === 'UPDATED_DESC') return (b.updatedAt || 0) - (a.updatedAt || 0);
      if (sortOption === 'TITLE_ASC') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [videos, activeTopicTab, searchQuery, selectedSectionFilter, selectedStatusFilter, sortOption]);

  // Statistics
  const stats = useMemo(() => {
    const total = videos.length;
    const published = videos.filter((v) => v.status === 'PUBLISHED').length;
    const drafts = videos.filter((v) => v.status === 'DRAFT').length;
    const archived = videos.filter((v) => v.status === 'ARCHIVED').length;
    const totalViews = videos.reduce((acc, v) => acc + (v.viewCount || 0), 0);

    const cylCount = videos.filter((v) => v.topic === 'CYLINDER').length;
    const coneCount = videos.filter((v) => v.topic === 'CONE').length;
    const sphCount = videos.filter((v) => v.topic === 'SPHERE').length;

    return { total, published, drafts, archived, totalViews, cylCount, coneCount, sphCount };
  }, [videos]);

  const handleOpenCreateModal = () => {
    setEditingVideoId(null);
    setFormData({
      title: '',
      topic: activeTopicTab === 'ALL' ? 'CYLINDER' : activeTopicTab,
      section: 'THEORY',
      description: '',
      videoUrl: activeTopicTab === 'CONE' ? '/assets/videos/non.mp4' : activeTopicTab === 'SPHERE' ? '/assets/videos/cau.mp4' : '/assets/videos/tru.mp4',
      thumbnailUrl: activeTopicTab === 'CONE' ? '/assets/videos/non_poster.jpg' : activeTopicTab === 'SPHERE' ? '/assets/videos/cau_poster.jpg' : '/assets/videos/tru_poster.jpg',
      duration: '00:15',
      fileName: '',
      fileSize: 0,
      mimeType: 'video/mp4',
      order: videos.length + 1,
      status: 'PUBLISHED',
      citations: [
        {
          videoId: '',
          startTimeSeconds: 0,
          endTimeSeconds: 6,
          label: 'Nhận biết vật thể',
          summary: 'Quan sát vật thể trong thực tế',
          topic: activeTopicTab === 'ALL' ? 'CYLINDER' : activeTopicTab,
          section: 'INTRO'
        }
      ],
      authorName: teacherUser?.fullName || 'ThS. Trần Ngọc Hiếu',
      authorId: teacherUser?.id || 'usr-teacher-001'
    });
    setUploadStep('IDLE');
    setUploadProgress(0);
    setIsFormDirty(false);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (video: TheoryVideo) => {
    setEditingVideoId(video.id);
    setFormData({
      title: video.title,
      topic: video.topic,
      section: video.section,
      description: video.description,
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl || '',
      duration: video.duration || '00:15',
      fileName: video.fileName || '',
      fileSize: video.fileSize || 0,
      mimeType: video.mimeType || '',
      order: video.order,
      status: video.status,
      citations: video.citations && video.citations.length > 0 ? [...video.citations] : [],
      authorName: video.authorName || teacherUser?.fullName || 'ThS. Trần Ngọc Hiếu',
      authorId: video.authorId || teacherUser?.id || 'usr-teacher-001'
    });
    setUploadStep('IDLE');
    setUploadProgress(0);
    setIsFormDirty(false);
    setIsFormModalOpen(true);
  };

  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submission lock: Strictly prevent double clicks / parallel duplicate submission
    if (isSubmittingRef.current || isSubmitting || uploadStep === 'SAVING' || uploadStep === 'UPLOADING') {
      return;
    }
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    if (!formData.title.trim()) {
      showError('Thiếu tiêu đề', 'Vui lòng nhập tiêu đề cho bài giảng video.');
      isSubmittingRef.current = false;
      setIsSubmitting(false);
      return;
    }
    if (!formData.videoUrl.trim()) {
      showError('Thiếu đường dẫn video', 'Vui lòng nhập đường dẫn hoặc tải lên video bài học.');
      isSubmittingRef.current = false;
      setIsSubmitting(false);
      return;
    }

    setUploadStep('SAVING');
    try {
      if (editingVideoId) {
        const res = await TheoryVideoService.updateVideoAsync(editingVideoId, {
          ...formData,
          authorId: teacherUser?.id || formData.authorId,
          authorName: teacherUser?.fullName || formData.authorName
        });
        if (res.success) {
          showSuccess('Thành công', 'Đã cập nhật và lưu bài giảng video vào máy chủ.');
          setUploadStep('SAVED');
          setIsFormDirty(false);
          setIsFormModalOpen(false);
        } else {
          setUploadStep('ERROR');
          showError('Lỗi cập nhật', res.error || 'Không thể lưu thay đổi.');
        }
      } else {
        const res = await TheoryVideoService.createVideoAsync({
          ...formData,
          authorId: teacherUser?.id || 'usr-teacher-001',
          authorName: teacherUser?.fullName || formData.authorName
        });
        if (res.success) {
          showSuccess('Thành công', 'Đã lưu video bài giảng mới bền vững vào máy chủ.');
          setUploadStep('SAVED');
          setIsFormDirty(false);
          setIsFormModalOpen(false);
        } else {
          setUploadStep('ERROR');
          showError('Lỗi tạo video', res.error || 'Không thể lưu video mới.');
        }
      }
    } catch (err: any) {
      setUploadStep('ERROR');
      showError('Lỗi máy chủ', err.message || 'Có lỗi xảy ra khi lưu video.');
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (id: string, newStatus: VideoStatus) => {
    const res = await TheoryVideoService.updateVideoAsync(id, { status: newStatus });
    if (res.success && res.video) {
      const label =
        newStatus === 'PUBLISHED'
          ? 'Đã xuất bản (Học sinh xem được)'
          : newStatus === 'DRAFT'
          ? 'Đã chuyển thành Bản nháp'
          : 'Đã đưa vào Lưu trữ (Archived)';
      showSuccess('Cập nhật trạng thái', label);
    }
  };

  const handleDeleteVideo = async (video: TheoryVideo) => {
    const success = await TheoryVideoService.deleteVideoAsync(video.id);
    if (success) {
      showSuccess('Đã xóa', `Đã xóa video "${video.title}" khỏi hệ thống.`);
    } else {
      showError('Lỗi', 'Không thể xóa video này.');
    }
    setDeleteConfirmVideo(null);
  };

  const handleResetDefaults = async () => {
    if (
      window.confirm(
        'Khôi phục danh sách video bài giảng mẫu chuẩn chương trình cho Hình Trụ, Nón, Cầu? Thao tác này sẽ cập nhật dữ liệu máy chủ.'
      )
    ) {
      await TheoryVideoService.resetToDefaultVideosAsync();
      showSuccess('Khôi phục thành công', 'Đã nạp lại các video bài giảng chuẩn chương trình.');
    }
  };

  // Video File Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      showError('Tệp quá lớn', 'Kích thước video tối đa cho phép là 100MB.');
      return;
    }

    setUploadStep('UPLOADING');
    setUploadProgress(0);
    showInfo(`Đang tải lên máy chủ: ${file.name}...`);

    try {
      const uploadRes = await TheoryVideoService.uploadVideoFile(file, (percent) => {
        setUploadProgress(percent);
      });

      if (uploadRes.success && uploadRes.videoUrl) {
        setFormData((prev) => ({
          ...prev,
          videoUrl: uploadRes.videoUrl || '',
          fileName: uploadRes.fileName || file.name,
          fileSize: uploadRes.fileSize || file.size,
          mimeType: uploadRes.mimeType || file.type,
          title: prev.title || file.name.replace(/\.[^/.]+$/, '')
        }));
        setIsFormDirty(true);
        setUploadStep('SELECTED');
        showSuccess('Tải lên hoàn tất', `Video đã được lưu vào máy chủ (${(file.size / (1024 * 1024)).toFixed(1)} MB).`);
      } else {
        setUploadStep('ERROR');
        showError('Tải lên thất bại', uploadRes.error || 'Không thể lưu video lên máy chủ.');
      }
    } catch (err: any) {
      setUploadStep('ERROR');
      showError('Lỗi tải tệp', err.message || 'Lỗi mạng khi tải lên tệp video.');
    } finally {
      e.target.value = '';
    }
  };

  // Thumbnail File Upload
  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showError('Ảnh quá lớn', 'Kích thước ảnh thumbnail tối đa là 10MB.');
      return;
    }

    setIsUploadingThumbnail(true);
    try {
      const res = await TheoryVideoService.uploadThumbnailFile(file);
      if (res.success && res.thumbnailUrl) {
        setFormData((prev) => ({
          ...prev,
          thumbnailUrl: res.thumbnailUrl || ''
        }));
        setIsFormDirty(true);
        showSuccess('Ảnh bìa đã tải lên', 'Đã lưu ảnh thumbnail vào máy chủ.');
      } else {
        showError('Lỗi ảnh', res.error || 'Không thể tải ảnh bìa lên máy chủ.');
      }
    } catch (err: any) {
      showError('Lỗi', err.message || 'Lỗi mạng khi tải ảnh bìa.');
    } finally {
      setIsUploadingThumbnail(false);
      e.target.value = '';
    }
  };

  // Check health for a video
  const handleCheckHealth = async (video: TheoryVideo) => {
    showInfo(`Đang kiểm tra kết nối video: ${video.title}...`);
    const ok = await TheoryVideoService.checkVideoAvailability(video.videoUrl);
    setHealthMap((prev) => ({ ...prev, [video.id]: ok }));
    if (ok) {
      showSuccess('Khả dụng', `Video sẵn sàng phát mượt mà.`);
    } else {
      showError('Cảnh báo', `Đường dẫn video không phản hồi hoặc bị chặn CORS.`);
    }
  };

  return (
    <div id="teacher-videos-tab" className="space-y-6">
      {/* 1. Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Tổng Video</span>
            <Film className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mt-1">
            {stats.total}
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Đã Xuất Bản</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl sm:text-2xl font-bold font-serif text-emerald-600 mt-1">
            {stats.published}
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Bản Nháp / Lưu Trữ</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-xl sm:text-2xl font-bold font-serif text-amber-600 mt-1">
            {stats.drafts} <span className="text-xs font-sans text-slate-400 font-normal">/ {stats.archived} lưu trữ</span>
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Lượt Xem Học Sinh</span>
            <Eye className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-xl sm:text-2xl font-bold font-serif text-indigo-600 mt-1">
            {stats.totalViews.toLocaleString()}
          </p>
        </div>
      </div>

      {/* 2. Shape Topic Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTopicTab('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTopicTab === 'ALL'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>Tất cả hình</span>
          <span
            className={`px-1.5 py-0.5 rounded-full text-[10px] ${
              activeTopicTab === 'ALL' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {stats.total}
          </span>
        </button>

        <button
          onClick={() => setActiveTopicTab('CYLINDER')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTopicTab === 'CYLINDER'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>Hình Trụ</span>
          <span
            className={`px-1.5 py-0.5 rounded-full text-[10px] ${
              activeTopicTab === 'CYLINDER' ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {stats.cylCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTopicTab('CONE')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTopicTab === 'CONE'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>Hình Nón</span>
          <span
            className={`px-1.5 py-0.5 rounded-full text-[10px] ${
              activeTopicTab === 'CONE' ? 'bg-rose-700 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {stats.coneCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTopicTab('SPHERE')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTopicTab === 'SPHERE'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>Hình Cầu</span>
          <span
            className={`px-1.5 py-0.5 rounded-full text-[10px] ${
              activeTopicTab === 'SPHERE' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {stats.sphCount}
          </span>
        </button>
      </div>

      {/* 3. Controls, Search, Filter & Sort Row */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 flex-wrap">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tìm theo tiêu đề, tác giả hoặc mô tả..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Section */}
          <select
            value={selectedSectionFilter}
            onChange={(e) => setSelectedSectionFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="ALL">Tất cả mục lý thuyết</option>
            <option value="THEORY">1. Khái niệm & Nhận biết</option>
            <option value="ELEMENTS">2. Đặc điểm & Cấu tạo</option>
            <option value="CREATION">3. Sự tạo thành từ phép quay</option>
            <option value="NET">4. Khai triển & Mặt cắt</option>
            <option value="SURFACE_AREA">5. Diện tích xung quanh & TP</option>
            <option value="VOLUME">6. Thể tích & Ứng dụng</option>
            <option value="REAL_WORLD">7. Mô hình thực tế</option>
            <option value="CHALLENGE">8. Ôn thi vào 10</option>
          </select>

          {/* Filter Status */}
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="PUBLISHED">Đã xuất bản</option>
            <option value="DRAFT">Bản nháp</option>
            <option value="ARCHIVED">Lưu trữ (Ẩn)</option>
          </select>

          {/* Sort Order */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="bg-transparent focus:outline-none cursor-pointer text-xs"
            >
              <option value="ORDER">Thứ tự (1 → n)</option>
              <option value="CREATED_DESC">Mới tạo nhất</option>
              <option value="UPDATED_DESC">Cập nhật gần nhất</option>
              <option value="TITLE_ASC">Tiêu đề (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            shape="pill"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={handleResetDefaults}
            className="text-xs"
            title="Khôi phục các video mẫu mặc định"
          >
            Mặc định
          </Button>

          <Button
            id="btn-teacher-add-video"
            variant="primary"
            size="sm"
            shape="pill"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={handleOpenCreateModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs"
          >
            + THÊM VIDEO
          </Button>
        </div>
      </div>

      {/* 4. Video List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVideos.map((video) => {
          const isHealthKnown = typeof healthMap[video.id] === 'boolean';
          const isHealthy = healthMap[video.id] !== false;

          return (
            <div
              key={video.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              {/* Thumbnail Header */}
              <div className="relative aspect-video bg-slate-900 group">
                {video.thumbnailUrl ? (
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">
                    <Film className="w-10 h-10" />
                  </div>
                )}

                {/* Topic & Section Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${
                      video.topic === 'CYLINDER'
                        ? 'bg-amber-600'
                        : video.topic === 'CONE'
                        ? 'bg-rose-600'
                        : 'bg-emerald-600'
                    }`}
                  >
                    {video.topic === 'CYLINDER'
                      ? 'Hình Trụ'
                      : video.topic === 'CONE'
                      ? 'Hình Nón'
                      : 'Hình Cầu'}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs">
                    {SECTION_LABELS[video.section] || 'Lý thuyết'}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="absolute top-2.5 right-2.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      video.status === 'PUBLISHED'
                        ? 'bg-emerald-500 text-white'
                        : video.status === 'DRAFT'
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-500 text-white'
                    }`}
                  >
                    {video.status === 'PUBLISHED'
                      ? 'Đã xuất bản'
                      : video.status === 'DRAFT'
                      ? 'Bản nháp'
                      : 'Đã lưu trữ'}
                  </span>
                </div>

                {/* Play / Preview Trigger */}
                <button
                  onClick={() => setPreviewVideo(video)}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg"
                  title="Xem trước video"
                >
                  <Play className="w-5 h-5 translate-x-0.5 fill-current" />
                </button>

                {/* Duration & Health Status */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1">
                  {isHealthKnown && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                        isHealthy ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}
                    >
                      {isHealthy ? '✓ Sẵn sàng' : '⚠ Lỗi kết nối'}
                    </span>
                  )}
                  {video.duration && (
                    <span className="px-1.5 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono">
                      {video.duration}
                    </span>
                  )}
                </div>
              </div>

              {/* Video Info Content */}
              <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 text-[11px] text-slate-400 mb-1 font-mono">
                    <span>Thứ tự #{video.order}</span>
                    {video.videoUrl.startsWith('/uploads/') && (
                      <span className="text-emerald-600 font-sans font-bold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                        Ổ đĩa máy chủ
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif font-bold text-sm text-slate-900 line-clamp-2">
                    {video.title}
                  </h4>
                  <div className="text-xs text-slate-600 line-clamp-2 mt-1 font-sans">
                    <MathText text={video.description} />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1 truncate max-w-[140px]">
                    <User className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{video.authorName || 'Giáo viên'}</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono">
                    <Eye className="w-3 h-3 text-slate-400" />
                    <span>{video.viewCount || 0} lượt xem</span>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-1.5">
                {/* Publish / Draft Toggle */}
                <div className="flex items-center gap-1">
                  {video.status === 'DRAFT' && (
                    <button
                      onClick={() => handleToggleStatus(video.id, 'PUBLISHED')}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors cursor-pointer"
                    >
                      Xuất bản
                    </button>
                  )}
                  {video.status === 'PUBLISHED' && (
                    <button
                      onClick={() => handleToggleStatus(video.id, 'DRAFT')}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors cursor-pointer"
                    >
                      Chuyển nháp
                    </button>
                  )}
                  {video.status === 'ARCHIVED' && (
                    <button
                      onClick={() => handleToggleStatus(video.id, 'PUBLISHED')}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer"
                    >
                      Khôi phục
                    </button>
                  )}
                  {video.status !== 'ARCHIVED' && (
                    <button
                      onClick={() => handleToggleStatus(video.id, 'ARCHIVED')}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
                      title="Lưu trữ (Ẩn khỏi danh sách học sinh)"
                    >
                      <Archive className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Edit, Health Check, Delete */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCheckHealth(video)}
                    className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                    title="Kiểm tra kết nối video"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenEditModal(video)}
                    className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                    title="Chỉnh sửa thông tin"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmVideo(video)}
                    className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                    title="Xóa video vĩnh viễn"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredVideos.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
          <Film className="w-10 h-10 text-slate-400 mx-auto" />
          <h4 className="font-serif font-bold text-base text-slate-800">
            Không tìm thấy video bài giảng phù hợp
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Thầy/Cô hãy thử điều chỉnh bộ lọc hoặc bấm nút "+ THÊM VIDEO" để tải lên bài học mới.
          </p>
        </div>
      )}

      {/* 5. CREATE / EDIT VIDEO MODAL */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl p-6 space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileVideo className="w-5 h-5 text-blue-600" />
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  {editingVideoId ? 'Chỉnh Sửa Video Bài Học' : 'Thêm Video Bài Học Mới'}
                </h3>
              </div>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Unsaved changes notification */}
            {isFormDirty && (
              <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                <span>Bạn có các thay đổi chưa được lưu vào máy chủ.</span>
                <span className="font-bold text-amber-700">Chưa lưu</span>
              </div>
            )}

            <form onSubmit={handleSaveVideo} className="space-y-4">
              {/* Row 1: Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tiêu đề video bài giảng <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Khái niệm & Sự hình thành Hình Trụ từ Phép quay HCN"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    setIsFormDirty(true);
                  }}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-serif"
                />
              </div>

              {/* Row 2: Topic & Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Chủ đề Hình Học <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => {
                      setFormData({ ...formData, topic: e.target.value as VideoTopic });
                      setIsFormDirty(true);
                    }}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="CYLINDER">Hình Trụ (Cylinder)</option>
                    <option value="CONE">Hình Nón (Cone)</option>
                    <option value="SPHERE">Hình Cầu (Sphere)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mục Lý Thuyết <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.section}
                    onChange={(e) => {
                      setFormData({ ...formData, section: e.target.value as VideoSection });
                      setIsFormDirty(true);
                    }}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="THEORY">1. Khái niệm & Nhận biết</option>
                    <option value="ELEMENTS">2. Đặc điểm & Cấu tạo</option>
                    <option value="CREATION">3. Sự hình thành từ phép quay</option>
                    <option value="NET">4. Khai triển & Mặt cắt</option>
                    <option value="SURFACE_AREA">5. Diện tích xung quanh & Toàn phần</option>
                    <option value="VOLUME">6. Thể tích & Ứng dụng</option>
                    <option value="REAL_WORLD">7. Mô hình thực tế</option>
                    <option value="CHALLENGE">8. Bài toán ôn thi vào 10</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Video File Upload & URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Đường dẫn Video hoặc Tải tệp MP4 <span className="text-rose-500">*</span>
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      placeholder="https://example.com/video.mp4 hoặc /uploads/videos/..."
                      value={formData.videoUrl}
                      onChange={(e) => {
                        setFormData({ ...formData, videoUrl: e.target.value });
                        setIsFormDirty(true);
                      }}
                      className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                    <label
                      className={`px-3 py-2 ${
                        uploadStep === 'UPLOADING'
                          ? 'bg-slate-200 cursor-not-allowed text-slate-400'
                          : 'bg-blue-50 hover:bg-blue-100 text-blue-700 cursor-pointer'
                      } rounded-xl text-xs font-bold flex items-center gap-1.5 border border-blue-200 transition-colors`}
                    >
                      <Upload
                        className={`w-3.5 h-3.5 ${uploadStep === 'UPLOADING' ? 'animate-bounce' : ''}`}
                      />
                      <span>{uploadStep === 'UPLOADING' ? 'Đang tải...' : 'Tải lên MP4'}</span>
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/ogg,video/quicktime"
                        disabled={uploadStep === 'UPLOADING'}
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Upload Progress Bar */}
                  {uploadStep === 'UPLOADING' && (
                    <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-100 space-y-1.5 animate-fadeIn">
                      <div className="flex items-center justify-between text-xs font-semibold text-blue-900">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                          Đang lưu trữ video vào ổ đĩa máy chủ...
                        </span>
                        <span className="font-mono font-bold text-blue-700">{uploadProgress}%</span>
                      </div>
                      <div className="w-full h-2 bg-blue-200/60 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all duration-200 ease-out"
                          style={{ width: `${Math.max(uploadProgress, 5)}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-blue-600 italic">
                        Video sẽ được lưu bền vững tại thư mục máy chủ, không bao giờ mất sau khi đăng xuất/đăng nhập lại.
                      </p>
                    </div>
                  )}

                  {/* Server Storage Confirmation Badge */}
                  {uploadStep !== 'UPLOADING' && formData.videoUrl && formData.videoUrl.startsWith('/uploads/') && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 text-[11px] font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Video đã lưu trữ vĩnh viễn trên máy chủ ({formData.videoUrl}).</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 4: Thumbnail File Upload & URL */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ảnh Poster Thumbnail
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/... hoặc tải ảnh lên"
                    value={formData.thumbnailUrl}
                    onChange={(e) => {
                      setFormData({ ...formData, thumbnailUrl: e.target.value });
                      setIsFormDirty(true);
                    }}
                    className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                  <label
                    className={`px-3 py-2 ${
                      isUploadingThumbnail
                        ? 'bg-slate-200 cursor-not-allowed text-slate-400'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer'
                    } rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-200 transition-colors`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>{isUploadingThumbnail ? 'Đang tải...' : 'Tải ảnh PNG/JPG'}</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      disabled={isUploadingThumbnail}
                      onChange={handleThumbnailUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Row 5: Duration & Order & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Thời lượng video
                  </label>
                  <input
                    type="text"
                    placeholder="05:30"
                    value={formData.duration}
                    onChange={(e) => {
                      setFormData({ ...formData, duration: e.target.value });
                      setIsFormDirty(true);
                    }}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Thứ tự hiển thị
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.order}
                    onChange={(e) => {
                      setFormData({ ...formData, order: parseInt(e.target.value) || 1 });
                      setIsFormDirty(true);
                    }}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Trạng thái xuất bản
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => {
                      setFormData({ ...formData, status: e.target.value as VideoStatus });
                      setIsFormDirty(true);
                    }}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="PUBLISHED">Đã xuất bản (Học sinh xem được)</option>
                    <option value="DRAFT">Bản nháp (Chỉ giáo viên thấy)</option>
                    <option value="ARCHIVED">Lưu trữ (Archived)</option>
                  </select>
                </div>
              </div>

              {/* Row 6: KaTeX Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mô tả chi tiết bài học (Hỗ trợ KaTeX toán học: $...$)
                </label>
                <textarea
                  rows={3}
                  placeholder="Ví dụ: Công thức tính diện tích xung quanh $S_{xq} = 2\pi rh$ và thể tích $V = \pi r^2 h$."
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    setIsFormDirty(true);
                  }}
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-serif leading-relaxed"
                />
              </div>

              {/* Description Preview */}
              {formData.description && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500">
                    Xem trước hiển thị công thức:
                  </span>
                  <div className="text-xs text-slate-800">
                    <MathText text={formData.description} />
                  </div>
                </div>
              )}

              {/* Row 7: Video Citations / Timestamps Editor */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                    <span>Trích dẫn & Mốc thời gian (Video Citations & Chapters)</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const newCitation: VideoCitation = {
                        videoId: editingVideoId || '',
                        startTimeSeconds: 0,
                        endTimeSeconds: 5,
                        label: 'Đoạn trích dẫn mới',
                        summary: 'Mô tả nội dung trích dẫn',
                        topic: formData.topic,
                        section: formData.section
                      };
                      setFormData({
                        ...formData,
                        citations: [...formData.citations, newCitation]
                      });
                      setIsFormDirty(true);
                    }}
                    className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Thêm mốc</span>
                  </button>
                </div>

                {formData.citations.length === 0 ? (
                  <p className="text-[11px] text-slate-400 italic">
                    Chưa có trích dẫn mốc thời gian. Bấm "Thêm mốc" để thêm trích dẫn cho video bài giảng.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {formData.citations.map((citation, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] text-slate-500 font-medium">Từ:</span>
                            <input
                              type="number"
                              min={0}
                              value={citation.startTimeSeconds}
                              onChange={(e) => {
                                const val = Math.max(0, parseInt(e.target.value) || 0);
                                const updated = [...formData.citations];
                                updated[idx] = { ...updated[idx], startTimeSeconds: val };
                                setFormData({ ...formData, citations: updated });
                                setIsFormDirty(true);
                              }}
                              className="w-14 px-2 py-1 text-xs bg-white border border-slate-200 rounded-lg text-center font-mono font-bold text-blue-700"
                            />
                            <span className="text-[11px] text-slate-400">s</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <span className="text-[11px] text-slate-500 font-medium">Đến:</span>
                            <input
                              type="number"
                              min={0}
                              value={citation.endTimeSeconds}
                              onChange={(e) => {
                                const val = Math.max(0, parseInt(e.target.value) || 0);
                                const updated = [...formData.citations];
                                updated[idx] = { ...updated[idx], endTimeSeconds: val };
                                setFormData({ ...formData, citations: updated });
                                setIsFormDirty(true);
                              }}
                              className="w-14 px-2 py-1 text-xs bg-white border border-slate-200 rounded-lg text-center font-mono font-bold text-blue-700"
                            />
                            <span className="text-[11px] text-slate-400">s</span>
                          </div>

                          <input
                            type="text"
                            placeholder="Tiêu đề mốc (VD: Nhận biết hình trụ)"
                            value={citation.label}
                            onChange={(e) => {
                              const updated = [...formData.citations];
                              updated[idx] = { ...updated[idx], label: e.target.value };
                              setFormData({ ...formData, citations: updated });
                              setIsFormDirty(true);
                            }}
                            className="flex-1 px-2.5 py-1 text-xs bg-white border border-slate-200 rounded-lg font-medium text-slate-800"
                          />

                          <button
                            type="button"
                            onClick={() => {
                              const updated = formData.citations.filter((_, cIdx) => cIdx !== idx);
                              setFormData({ ...formData, citations: updated });
                              setIsFormDirty(true);
                            }}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                            title="Xóa mốc này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <input
                          type="text"
                          placeholder="Tóm tắt nội dung lý thuyết tại mốc thời gian này"
                          value={citation.summary}
                          onChange={(e) => {
                            const updated = [...formData.citations];
                            updated[idx] = { ...updated[idx], summary: e.target.value };
                            setFormData({ ...formData, citations: updated });
                            setIsFormDirty(true);
                          }}
                          className="w-full px-2.5 py-1 text-[11px] bg-white border border-slate-200 rounded-lg text-slate-600"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  shape="pill"
                  disabled={isSubmitting || uploadStep === 'SAVING' || uploadStep === 'UPLOADING'}
                  onClick={() => setIsFormModalOpen(false)}
                >
                  Hủy bỏ
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  shape="pill"
                  disabled={isSubmitting || uploadStep === 'SAVING' || uploadStep === 'UPLOADING'}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-2"
                >
                  {uploadStep === 'SAVING' ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang lưu vào máy chủ...</span>
                    </>
                  ) : (
                    <span>{editingVideoId ? 'Lưu Thay Đổi' : 'Tạo Video Bài Học'}</span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. PREVIEW VIDEO MODAL */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-rose-500" />
                <h4 className="font-serif font-bold text-sm truncate">{previewVideo.title}</h4>
              </div>
              <button
                onClick={() => setPreviewVideo(null)}
                className="p-1 rounded-full hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-black flex items-center justify-center">
              <LessonVideo
                customLesson={previewVideo}
                shape={(previewVideo.topic || 'cylinder').toLowerCase() as any}
                className="rounded-none border-0 shadow-none"
              />
            </div>

            <div className="p-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  {previewVideo.topic}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {previewVideo.duration || '04:00'}
                </span>
              </div>
              <div className="text-xs text-slate-700 leading-relaxed font-serif bg-slate-50 p-3 rounded-xl border border-slate-200">
                <MathText text={previewVideo.description} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. DELETE CONFIRMATION MODAL */}
      {deleteConfirmVideo && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-slate-900">
              Xác nhận xóa video bài học?
            </h3>
            <p className="text-xs text-slate-600">
              Bạn có chắc chắn muốn xóa vĩnh viễn video "<strong>{deleteConfirmVideo.title}</strong>"? Thao tác
              này sẽ xóa siêu dữ liệu và tệp video trên máy chủ.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                shape="pill"
                onClick={() => setDeleteConfirmVideo(null)}
              >
                Không, giữ lại
              </Button>
              <Button
                variant="primary"
                size="sm"
                shape="pill"
                onClick={() => handleDeleteVideo(deleteConfirmVideo)}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
              >
                Xóa Video
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
