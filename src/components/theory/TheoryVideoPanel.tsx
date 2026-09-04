/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Theory Video Panel
 * Responsive HTML5 video player for geometry lessons with complete
 * Firebase Storage -> getDownloadURL() -> HTML5 Video resolution pipeline.
 * - Thumbnail-first load with Play trigger (no autoplay)
 * - HTML5 Video controls: Play/Pause, Seek, Volume, Fullscreen
 * - KaTeX/MathFormula supported description
 * - Topic Playlist / Related lessons selector
 * - STRICT CONSTRAINT: No microphone, no TTS, no external read-aloud.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TheoryVideo, VideoTopic, SECTION_LABELS } from '../../types/theoryVideo';
import { TheoryVideoService } from '../../services/theoryVideoService';
import { VideoPipelineService, VideoPipelineErrorType } from '../../services/videoPipelineService';
import { MathText } from '../common/MathFormula';
import { LessonVideo } from '../video/LessonVideo';
import { ShapeType } from '../../types';
import { getSystemVideoLesson, lessonVideos } from '../../config/videoConfig';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  AlertCircle,
  Film,
  User,
  Clock,
  ListVideo,
  Loader2,
  Bookmark,
  Gauge
} from 'lucide-react';

interface TheoryVideoPanelProps {
  topic: VideoTopic;
  className?: string;
}

export const TheoryVideoPanel: React.FC<TheoryVideoPanelProps> = ({ topic, className = '' }) => {
  const shape: ShapeType = topic === 'CYLINDER' ? 'cylinder' : topic === 'CONE' ? 'cone' : 'sphere';
  const systemLesson = getSystemVideoLesson(shape);
  const [videoSourceMode, setVideoSourceMode] = useState<'SYSTEM' | 'TEACHER'>('SYSTEM');

  const [videos, setVideos] = useState<TheoryVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<TheoryVideo | null>(null);
  const [resolvedUrl, setResolvedUrl] = useState<string>('');
  const [isResolving, setIsResolving] = useState<boolean>(false);
  const [pipelineError, setPipelineError] = useState<{ type: VideoPipelineErrorType; message: string } | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.85);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [hasStartedPlaying, setHasStartedPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Function to execute the complete video resolution pipeline:
  // Firestore Metadata -> Storage Reference -> getDownloadURL() -> HTML5 Video -> Browser
  const resolveCurrentVideo = useCallback(async (video: TheoryVideo) => {
    setIsResolving(true);
    setPipelineError(null);
    setResolvedUrl('');

    try {
      const result = await VideoPipelineService.resolveVideo(video, 'student');
      if (result.errorType !== 'none') {
        setPipelineError({
          type: result.errorType,
          message: result.errorMessage || 'Không thể truy cập video trong kho lưu trữ.'
        });
        setIsResolving(false);
        return;
      }

      setResolvedUrl(result.downloadURL);
      setPipelineError(null);
    } catch (err: any) {
      setPipelineError({
        type: 'network-error',
        message: 'Không thể kết nối đến kho lưu trữ video. Hãy kiểm tra kết nối mạng.'
      });
    } finally {
      setIsResolving(false);
    }
  }, []);

  // Load videos whenever topic changes and subscribe to real-time updates
  useEffect(() => {
    const updateList = (allVideos?: TheoryVideo[]) => {
      const source = allVideos || TheoryVideoService.getVideos();
      const list = source
        .filter((v) => v.topic === topic && v.status === 'PUBLISHED')
        .sort((a, b) => a.order - b.order);

      setVideos(list);
      setSelectedVideo((prev) => {
        if (!prev) return list[0] || null;
        const exists = list.find((v) => v.id === prev.id);
        return exists || list[0] || null;
      });
    };

    // Initial sync
    updateList();
    TheoryVideoService.fetchVideosFromServer().then((fresh) => {
      updateList(fresh);
    });

    // Subscribe to service updates
    const unsubscribe = TheoryVideoService.subscribe((updatedAll) => {
      updateList(updatedAll);
    });

    // Reset player state
    setIsPlaying(false);
    setHasStartedPlaying(false);
    setCurrentTime(0);

    return () => {
      unsubscribe();
    };
  }, [topic]);

  // When selectedVideo changes, resolve video pipeline
  useEffect(() => {
    if (selectedVideo) {
      setIsPlaying(false);
      setHasStartedPlaying(false);
      setCurrentTime(0);
      resolveCurrentVideo(selectedVideo);
    } else {
      setResolvedUrl('');
      setPipelineError(null);
    }
  }, [selectedVideo, resolveCurrentVideo]);

  // Re-load video element when resolved URL changes
  useEffect(() => {
    if (resolvedUrl && videoRef.current) {
      videoRef.current.load();
    }
  }, [resolvedUrl]);

  // Handle video element timeupdate & events
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setPipelineError(null);
    }
  };

  const handleVideoError = () => {
    const mediaError = videoRef.current?.error || null;
    const parsed = VideoPipelineService.parseMediaError(mediaError);
    setPipelineError({
      type: parsed.errorType,
      message: parsed.message
    });
    setIsPlaying(false);
  };

  const handlePlayClick = () => {
    setHasStartedPlaying(true);
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          if (selectedVideo) {
            TheoryVideoService.recordVideoTelemetry({
              videoId: selectedVideo.id,
              topic: selectedVideo.topic,
              studentId: 'current-student',
              eventType: 'VIDEO_STARTED',
              currentTime: 0,
              duration: duration || 0,
              timestamp: Date.now()
            });
          }
        })
        .catch((err) => {
          console.warn('Playback prevented:', err);
          setIsPlaying(false);
        });
    }
  };

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    const nextMute = !isMuted;
    videoRef.current.muted = nextMute;
    setIsMuted(nextMute);
  };

  const handleSkipBackward = () => {
    if (!videoRef.current) return;
    const target = Math.max(0, videoRef.current.currentTime - 10);
    videoRef.current.currentTime = target;
    setCurrentTime(target);
  };

  const handleSkipForward = () => {
    if (!videoRef.current) return;
    const target = Math.min(duration || 100, videoRef.current.currentTime + 10);
    videoRef.current.currentTime = target;
    setCurrentTime(target);
  };

  const handleChangeSpeed = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
    setPlaybackRate(rate);
    setShowSpeedMenu(false);
  };

  const handleFullscreen = () => {
    const doc = document as any;
    const isFs = doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement;
    if (isFs) {
      if (doc.exitFullscreen) {
        doc.exitFullscreen().catch(() => {});
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      }
    } else {
      const el = containerRef.current as any;
      if (el?.requestFullscreen) {
        el.requestFullscreen().catch(() => {
          if (videoRef.current && (videoRef.current as any).webkitEnterFullscreen) {
            (videoRef.current as any).webkitEnterFullscreen();
          }
        });
      } else if (el?.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      } else if (videoRef.current && (videoRef.current as any).webkitEnterFullscreen) {
        (videoRef.current as any).webkitEnterFullscreen();
      }
    }
  };

  const handleSelectVideo = (video: TheoryVideo) => {
    if (video.id === selectedVideo?.id) return;
    setSelectedVideo(video);
  };

  const handleSeekToTimestamp = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      setCurrentTime(seconds);
      if (!isPlaying) {
        setHasStartedPlaying(true);
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } else {
      setHasStartedPlaying(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = seconds;
          setCurrentTime(seconds);
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }, 300);
    }
  };

  // Step XIII & XXXI: Retry Button re-executes the complete pipeline
  const handleRetry = async () => {
    if (!selectedVideo) return;
    await resolveCurrentVideo(selectedVideo);
    if (videoRef.current) {
      videoRef.current.load();
      if (hasStartedPlaying) {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  };

  const formatTime = (secs: number): string => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // If no video exists for this topic
  if (!selectedVideo || videos.length === 0) {
    return (
      <div
        id="theory-video-panel-empty"
        className={`bg-[#FFFDF8] rounded-2xl sm:rounded-3xl border border-[#E5DCCF] p-6 shadow-xs flex flex-col items-center justify-center text-center min-h-[340px] ${className}`}
      >
        <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E5DCCF] flex items-center justify-center text-[#A0958B] mb-3">
          <Film className="w-6 h-6" />
        </div>
        <h4 className="font-serif font-bold text-base text-[#3A302B]">
          Chưa có video cho nội dung này
        </h4>
        <p className="text-xs text-[#766A61] mt-1 max-w-sm">
          Giáo viên sẽ cập nhật bài giảng video minh họa 3D cho chuyên đề này sớm nhất.
        </p>
      </div>
    );
  }

  // Determine error title and specific message based on error type
  const getErrorDisplay = () => {
    if (!pipelineError) return null;
    switch (pipelineError.type) {
      case 'object-not-found':
        return {
          title: 'Không tìm thấy video trong kho lưu trữ',
          message: pipelineError.message || 'Video này không còn tồn tại trong kho lưu trữ.'
        };
      case 'unauthorized':
        return {
          title: 'Không có quyền truy cập',
          message: pipelineError.message || 'Bạn không có quyền xem video này.'
        };
      case 'unsupported-format':
        return {
          title: 'Định dạng không được hỗ trợ',
          message: pipelineError.message || 'Trình duyệt không hỗ trợ định dạng video này.'
        };
      case 'corrupted':
        return {
          title: 'Lỗi tệp video',
          message: pipelineError.message || 'Video đã tải nhưng trình duyệt không thể giải mã định dạng này.'
        };
      case 'network-error':
        return {
          title: 'Lỗi kết nối mạng',
          message: pipelineError.message || 'Không thể tải video. Hãy kiểm tra kết nối mạng.'
        };
      default:
        return {
          title: 'Không thể phát video này',
          message: pipelineError.message || 'Đường dẫn video có thể tạm thời không khả dụng hoặc bị chặn bởi trình duyệt.'
        };
    }
  };

  const errorDisplay = getErrorDisplay();

  return (
    <div
      id="theory-video-panel"
      className={`bg-[#FFFDF8] rounded-2xl sm:rounded-3xl border border-[#E5DCCF] shadow-xs overflow-hidden flex flex-col ${className}`}
    >
      {/* Header Bar */}
      <div className="px-4 py-2.5 bg-[#FAF7F2] border-b border-[#E5DCCF] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse shrink-0" />
          <span className="text-xs font-bold font-serif text-[#3A302B] uppercase tracking-wider truncate">
            VIDEO BÀI HỌC • {topic === 'CYLINDER' ? 'HÌNH TRỤ' : topic === 'CONE' ? 'HÌNH NÓN' : 'HÌNH CẦU'}
          </span>
        </div>

        {/* Source Toggle: SYSTEM vs TEACHER */}
        <div className="flex items-center gap-1 bg-[#EAE0D3]/80 p-0.5 rounded-lg text-[11px] font-bold">
          <button
            onClick={() => setVideoSourceMode('SYSTEM')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              videoSourceMode === 'SYSTEM'
                ? 'bg-[#16A34A] text-white shadow-xs'
                : 'text-[#594D46] hover:text-[#3A302B]'
            }`}
          >
            Chuẩn SGK
          </button>
          {videos.length > 0 && (
            <button
              onClick={() => setVideoSourceMode('TEACHER')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                videoSourceMode === 'TEACHER'
                  ? 'bg-[#8F3E32] text-white shadow-xs'
                  : 'text-[#594D46] hover:text-[#3A302B]'
              }`}
            >
              Thầy cô ({videos.length})
            </button>
          )}
        </div>
      </div>

      {/* Mode A: SYSTEM VIDEO LESSON (Official persistent video asset) */}
      {videoSourceMode === 'SYSTEM' ? (
        <div className="flex flex-col flex-1">
          <LessonVideo
            title={lessonVideos[shape]?.title || systemLesson.title}
            source={lessonVideos[shape]?.source || systemLesson.src}
            shape={shape}
            className="rounded-none border-0 shadow-none"
          />
          <div className="p-4 space-y-3 flex-1 flex flex-col justify-between bg-[#FFFDF8]">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#3A302B] leading-snug">
                  {systemLesson.title}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#16A34A]/15 text-[#15803D] border border-[#16A34A]/30 shrink-0">
                  Chính thức SGK
                </span>
              </div>
              <p className="text-xs text-[#766A61] font-medium">{systemLesson.subtitle}</p>
              <div className="text-xs text-[#594D46] bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DCCF] leading-relaxed">
                <MathText text={systemLesson.description} />
              </div>
            </div>
          </div>
        </div>
      ) : selectedVideo ? (
        <>
          {/* Main Video Screen Container */}
          <div
            ref={containerRef}
            className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden group"
          >
        {/* State 1: Skeleton/Loading while resolving storage pipeline */}
        {isResolving && (
          <div className="absolute inset-0 z-30 bg-[#1F1916] flex flex-col items-center justify-center text-white gap-3 p-4">
            <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
            <span className="text-xs font-medium text-stone-300">Đang chuẩn bị video bài học...</span>
          </div>
        )}

        {/* State 2: Thumbnail & Play Trigger Button (Initial view before student plays) */}
        {!hasStartedPlaying && !pipelineError && !isResolving && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
            {selectedVideo.thumbnailUrl && (
              <img
                src={selectedVideo.thumbnailUrl}
                alt={selectedVideo.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

            {/* Centered Play Trigger Button */}
            <button
              id="btn-play-theory-video-thumbnail"
              onClick={handlePlayClick}
              className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border-2 border-white/40 min-w-[44px] min-h-[44px] touch-manipulation"
              title="Phát video bài học"
              aria-label="Phát video"
            >
              <Play className="w-7 h-7 sm:w-9 sm:h-9 translate-x-0.5 fill-white text-white" />
            </button>

            {/* Video Duration Badge */}
            {selectedVideo.duration && (
              <div className="absolute bottom-3 right-3 z-20 px-2 py-1 rounded-md bg-black/80 text-white text-[11px] font-mono flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{selectedVideo.duration}</span>
              </div>
            )}
          </div>
        )}

        {/* State 3: Specific Error State Fallback */}
        {pipelineError && errorDisplay ? (
          <div className="absolute inset-0 z-20 bg-[#2A2421] text-white p-5 flex flex-col items-center justify-center text-center">
            <AlertCircle className="w-10 h-10 text-amber-400 mb-2" />
            <p className="text-sm font-bold">{errorDisplay.title}</p>
            <p className="text-xs text-stone-300 mt-1 max-w-xs">
              {errorDisplay.message}
            </p>
            <button
              id="btn-retry-video-playback"
              onClick={handleRetry}
              className="mt-3 px-4 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Thử lại</span>
            </button>
          </div>
        ) : (
          /* HTML5 Video Element - ONLY set src when resolvedUrl is ready */
          resolvedUrl ? (
            <video
              ref={videoRef}
              src={resolvedUrl}
              poster={selectedVideo.thumbnailUrl}
              preload="metadata"
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onError={handleVideoError}
              onEnded={() => {
                setIsPlaying(false);
                if (selectedVideo) {
                  TheoryVideoService.recordVideoTelemetry({
                    videoId: selectedVideo.id,
                    topic: selectedVideo.topic,
                    studentId: 'current-student',
                    eventType: 'VIDEO_COMPLETED',
                    currentTime: duration,
                    duration,
                    timestamp: Date.now()
                  });
                }
              }}
              className="w-full h-full object-contain"
            />
          ) : null
        )}

        {/* Custom Video Controls Bar (Visible when started playing and no error) */}
        {hasStartedPlaying && !pipelineError && resolvedUrl && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 flex flex-col gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {/* Progress Slider */}
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />

            {/* Bottom Row Controls */}
            <div className="flex items-center justify-between text-white text-xs pt-1">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* 10s Skip Backward */}
                <button
                  onClick={handleSkipBackward}
                  className="p-1 hover:text-rose-400 transition-colors cursor-pointer flex items-center gap-0.5 text-[10px]"
                  title="Tua lùi 10 giây"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">10s</span>
                </button>

                {/* Play / Pause */}
                <button
                  onClick={handleTogglePlay}
                  className="p-1 hover:text-rose-400 transition-colors cursor-pointer"
                  title={isPlaying ? 'Tạm dừng' : 'Phát'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                {/* 10s Skip Forward */}
                <button
                  onClick={handleSkipForward}
                  className="p-1 hover:text-rose-400 transition-colors cursor-pointer flex items-center gap-0.5 text-[10px] hidden sm:flex"
                  title="Tua tới 10 giây"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">10s</span>
                </button>

                {/* Volume Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleToggleMute}
                    className="p-1 hover:text-rose-400 transition-colors cursor-pointer"
                    title={isMuted ? 'Bật âm' : 'Tắt âm'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-14 sm:w-16 h-1 bg-white/30 rounded appearance-none cursor-pointer accent-rose-500 hidden sm:block"
                  />
                </div>

                <span className="font-mono text-[11px] text-stone-300">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Playback Speed Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="px-1.5 py-0.5 rounded bg-white/20 hover:bg-white/30 text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    title="Tốc độ phát"
                  >
                    <Gauge className="w-3 h-3" />
                    <span>{playbackRate}x</span>
                  </button>

                  {showSpeedMenu && (
                    <div className="absolute bottom-full mb-1 right-0 bg-[#2A2421]/95 border border-white/20 rounded-lg p-1 shadow-lg flex flex-col gap-0.5 min-w-[70px] z-30">
                      {[0.75, 1, 1.25, 1.5, 2].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => handleChangeSpeed(rate)}
                          className={`px-2 py-1 rounded text-left text-[11px] font-mono transition-colors ${
                            playbackRate === rate
                              ? 'bg-rose-600 text-white font-bold'
                              : 'text-stone-300 hover:bg-white/10'
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fullscreen */}
                <button
                  onClick={handleFullscreen}
                  className="p-1 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Toàn màn hình"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Information Section */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="font-serif text-sm sm:text-base font-bold text-[#3A302B] leading-snug">
            {selectedVideo.title}
          </h3>

          {(selectedVideo.author || selectedVideo.authorName) && (
            <div className="flex items-center gap-1.5 text-xs text-[#766A61]">
              <User className="w-3.5 h-3.5 text-[#A0958B]" />
              <span>{selectedVideo.author || selectedVideo.authorName}</span>
            </div>
          )}

          {/* KaTeX-Supported Video Description */}
          <div className="text-xs text-[#594D46] bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DCCF] leading-relaxed">
            <MathText text={selectedVideo.description} />
          </div>

          {/* Video Citations / Timestamps (Interactive Jump-to-timestamp) */}
          {selectedVideo.citations && selectedVideo.citations.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#3A302B]">
                <Bookmark className="w-3.5 h-3.5 text-rose-500" />
                <span>Trích dẫn video bài học ({selectedVideo.citations.length})</span>
              </div>
              <div className="space-y-1">
                {selectedVideo.citations.map((citation, cIdx) => (
                  <button
                    key={cIdx}
                    onClick={() => handleSeekToTimestamp(citation.startTimeSeconds)}
                    className="w-full text-left p-2 rounded-xl text-xs bg-[#FAF7F2] hover:bg-rose-50/70 border border-[#E5DCCF] hover:border-rose-300 transition-all flex items-start gap-2 group cursor-pointer"
                    title={`Chuyển đến ${formatTime(citation.startTimeSeconds)}`}
                  >
                    <span className="font-mono font-bold text-[11px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 group-hover:bg-rose-500 group-hover:text-white transition-colors shrink-0 flex items-center gap-1">
                      <Play className="w-2.5 h-2.5 fill-current" />
                      {formatTime(citation.startTimeSeconds)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-[#3A302B] group-hover:text-rose-900 truncate">
                        {citation.label}
                      </div>
                      <div className="text-[11px] text-[#766A61] line-clamp-1">
                        {citation.summary}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Playlist / Related Videos in Topic */}
        {videos.length > 1 && (
          <div className="pt-2 border-t border-[#E5DCCF] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#3A302B]">
              <ListVideo className="w-3.5 h-3.5 text-rose-500" />
              <span>Danh sách video chuyên đề ({videos.length})</span>
            </div>

            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {videos.map((vid, idx) => {
                const isCurrent = vid.id === selectedVideo.id;
                return (
                  <button
                    key={vid.id}
                    onClick={() => handleSelectVideo(vid)}
                    className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between gap-2 transition-colors cursor-pointer border ${
                      isCurrent
                        ? 'bg-rose-50 border-rose-200 text-rose-900 font-bold'
                        : 'bg-[#FFFDF8] border-[#E5DCCF] text-[#594D46] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] shrink-0 font-bold ${
                          isCurrent ? 'bg-rose-500 text-white' : 'bg-[#EAE0D3] text-[#3A302B]'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="truncate">{vid.title}</span>
                    </div>
                    {vid.duration && (
                      <span className="text-[10px] text-[#A0958B] font-mono shrink-0">
                        {vid.duration}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
        </>
      ) : (
        <div className="p-8 text-center text-xs text-[#766A61]">
          Chưa có video bổ trợ nào từ giáo viên cho chủ đề này.
        </div>
      )}
    </div>
  );
};
