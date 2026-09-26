/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - LessonVideo Component (Phase 5)
 * Standard HTML5 Responsive Video Player for Geometry Lessons
 *
 * Features:
 * - Play / Pause (No autoplay)
 * - Custom Seek slider & Buffered progress display
 * - Fullscreen toggle
 * - Volume control & Mute toggle
 * - Playback rate selector (0.75x, 1x, 1.25x, 1.5x, 2x)
 * - Skip backward 10s / Skip forward 10s
 * - Key chapter timestamp markers
 * - Loading indicator & Error recovery with fallback URL
 * - preload="metadata"
 * - STRICT CONSTRAINT: Zero microphone, zero TTS, zero external speaker read-aloud.
 */

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  AlertCircle,
  Clock,
  Gauge,
  Film,
  CheckCircle2,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import {
  SYSTEM_VIDEOS,
  SystemVideoConfig,
  SystemVideoLesson,
  getSystemVideo,
  getSystemVideoLesson
} from '../../config/videoConfig';
import { ShapeType } from '../../types';
import { StudentProgressService } from '../../services/studentProgressService';

export interface LessonVideoProps {
  title?: string;
  source?: string;
  duration?: number | string;
  poster?: string;
  captions?: string;
  shape?: ShapeType;
  customLesson?: any;
  className?: string;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onEnded?: () => void;
  autoScrollToOnPlay?: boolean;
}

export const LessonVideo: React.FC<LessonVideoProps> = ({
  title,
  source,
  duration: propDuration,
  poster: propPoster,
  captions: propCaptions,
  shape = 'cylinder',
  customLesson,
  className = '',
  onTimeUpdate,
  onEnded
}) => {
  const effectiveShape: ShapeType = (
    shape ||
    customLesson?.shape ||
    customLesson?.topic ||
    'cylinder'
  ).toLowerCase() as ShapeType;

  const shapeNameVN =
    effectiveShape === 'cylinder'
      ? 'Hình trụ'
      : effectiveShape === 'cone'
      ? 'Hình nón'
      : 'Hình cầu';

  const defaultSystem: SystemVideoConfig = getSystemVideo(effectiveShape) || SYSTEM_VIDEOS.cylinder;
  const isCustomTeacher = Boolean(
    customLesson &&
    (customLesson.type === 'TEACHER' ||
      customLesson.ownerId ||
      customLesson.authorName ||
      (customLesson.id && !customLesson.id.startsWith('theory-video-')))
  );

  const videoId = customLesson?.id || '';
  const videoTitle = title || customLesson?.title || '';
  const videoSrc =
    source ||
    customLesson?.downloadURL ||
    customLesson?.videoUrl ||
    customLesson?.src ||
    '';
  const videoPoster =
    propPoster ||
    customLesson?.thumbnailURL ||
    customLesson?.thumbnailUrl ||
    customLesson?.poster ||
    '';
  const videoDurationFormatted =
    (typeof propDuration === 'string' ? propDuration : undefined) ||
    customLesson?.durationFormatted ||
    (typeof customLesson?.duration === 'string' ? customLesson.duration : defaultSystem.durationFormatted);
  const initialDuration =
    (typeof propDuration === 'number' ? propDuration : undefined) ||
    customLesson?.durationSeconds ||
    (typeof customLesson?.duration === 'number' ? customLesson.duration : defaultSystem.durationSeconds) ||
    15;

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(initialDuration);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [activeSrc, setActiveSrc] = useState<string>(videoSrc);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [bufferedPercent, setBufferedPercent] = useState<number>(0);
  const [resumePrompt, setResumePrompt] = useState<{ time: number } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastSaveTimeRef = useRef<number>(0);

  // Key timestamps / chapters markers normalization
  const markers = useMemo(() => {
    if (customLesson?.citations && Array.isArray(customLesson.citations)) {
      return customLesson.citations.map((c: any) => ({
        time: c.startTimeSeconds || 0,
        label: formatTime(c.startTimeSeconds || 0),
        description: c.label || c.title || c.description || 'Mốc nội dung'
      }));
    }
    if (customLesson?.chapters && Array.isArray(customLesson.chapters)) {
      return customLesson.chapters.map((ch: any) => ({
        time: ch.time || ch.startTimeSeconds || 0,
        label: ch.label || formatTime(ch.time || 0),
        description: ch.title || ch.description || ''
      }));
    }
    return defaultSystem.keyTimestamps || [];
  }, [customLesson, defaultSystem.keyTimestamps]);

  // Sync activeSrc and reset when shape or lesson changes
  useEffect(() => {
    setActiveSrc(videoSrc);
    setIsPlaying(false);
    setHasStarted(false);
    setCurrentTime(0);
    setIsError(false);
    setErrorMessage('');
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }

    // Check saved progress from localStorage (Requirement L)
    try {
      const savedRaw = localStorage.getItem(`geo_video_progress_${videoId}`);
      if (savedRaw) {
        const saved = JSON.parse(savedRaw);
        if (
          saved &&
          typeof saved.currentTime === 'number' &&
          saved.currentTime > 3 &&
          !saved.completed &&
          saved.currentTime < (initialDuration - 3)
        ) {
          setResumePrompt({ time: Math.floor(saved.currentTime) });
        } else {
          setResumePrompt(null);
        }
      } else {
        setResumePrompt(null);
      }
    } catch {
      setResumePrompt(null);
    }
  }, [videoSrc, videoId, shape]);

  // Handle Fullscreen change
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Time formatting helper
  function formatTime(secs: number): string {
    if (!secs || isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  // Play / Pause toggler
  const handleTogglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      setHasStarted(true);
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
          setIsError(false);
        })
        .catch((err) => {
          console.warn('Playback error:', err);
          setIsPlaying(false);
          setIsLoading(false);
          setIsError(true);
          setErrorMessage('Không thể tải video. Vui lòng kiểm tra file lưu trữ.');
        });
    }
  }, [isPlaying, activeSrc]);

  // Handle Resume playback
  const handleResume = () => {
    if (!resumePrompt || !videoRef.current) return;
    const target = resumePrompt.time;
    videoRef.current.currentTime = target;
    setCurrentTime(target);
    setResumePrompt(null);
    handleTogglePlay();
  };

  const handleDismissResume = () => {
    setResumePrompt(null);
  };

  // Video element events
  const onVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const cur = video.currentTime;
    setCurrentTime(cur);

    if (onTimeUpdate) {
      onTimeUpdate(cur, video.duration || duration);
    }

    // Update buffered progress
    if (video.buffered && video.buffered.length > 0 && video.duration) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      setBufferedPercent(Math.min(100, (bufferedEnd / video.duration) * 100));
    }

    // Save student progress periodically (throttled every 2.5s)
    const now = Date.now();
    if (now - lastSaveTimeRef.current > 2500) {
      lastSaveTimeRef.current = now;
      try {
        localStorage.setItem(
          `geo_video_progress_${videoId}`,
          JSON.stringify({
            currentTime: cur,
            duration: video.duration || duration,
            completed: false,
            lastWatched: now
          })
        );
        if (effectiveShape) {
          StudentProgressService.updateActivity('usr-student-001', effectiveShape, 'video', 'IN_PROGRESS', {
            videoProgress: Math.round(cur)
          }).catch(() => {});
        }
      } catch {
        // Safe failover
      }
    }
  };

  const onVideoLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.duration && !isNaN(video.duration)) {
      setDuration(video.duration);
    }
    setIsLoading(false);
    setIsError(false);
  };

  const onVideoWaiting = () => {
    setIsLoading(true);
  };

  const onVideoPlaying = () => {
    setIsLoading(false);
    setIsPlaying(true);
  };

  const onVideoError = () => {
    setIsLoading(false);
    setIsPlaying(false);
    setIsError(true);
    setErrorMessage('Không thể tải video. Vui lòng kiểm tra file lưu trữ.');
  };

  const onVideoEnded = () => {
    setIsPlaying(false);
    try {
      localStorage.setItem(
        `geo_video_progress_${videoId}`,
        JSON.stringify({
          currentTime: duration,
          duration,
          completed: true,
          lastWatched: Date.now()
        })
      );
      if (effectiveShape) {
        StudentProgressService.updateActivity('usr-student-001', effectiveShape, 'video', 'COMPLETED', {
          videoProgress: Math.round(duration)
        }).catch(() => {});
      }
    } catch {}
    if (onEnded) onEnded();
  };

  // Seek bar handler
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = parseFloat(e.target.value);
    setCurrentTime(target);
    if (videoRef.current) {
      videoRef.current.currentTime = target;
    }
  };

  // Seek to specific timestamp (seconds)
  const handleSeekTo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      setCurrentTime(seconds);
      if (!isPlaying) {
        setHasStarted(true);
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }
  };

  // Volume handlers
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
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (videoRef.current) {
      videoRef.current.muted = nextMute;
    }
  };

  // Skip handlers
  const handleSkip = (delta: number) => {
    if (!videoRef.current) return;
    const nextTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + delta));
    videoRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  // Playback speed
  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
    setShowSpeedMenu(false);
  };

  // Fullscreen
  const handleToggleFullscreen = () => {
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

  // Retry recovery
  const handleRetry = () => {
    setIsError(false);
    setErrorMessage('');
    setIsLoading(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  const hasValidVideoSource = Boolean(
    (activeSrc && activeSrc.trim() !== '') || (videoSrc && videoSrc.trim() !== '')
  );

  // If no real video source is available, completely hide the video player (Strict Zero-Fake Policy)
  if (!hasValidVideoSource) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      id={`lesson-video-container-${shape}`}
      className={`relative w-full rounded-2xl overflow-hidden bg-[#0A1A12] border ${
        isCustomTeacher ? 'border-[#8F3E32]/30' : 'border-[#16A34A]/30'
      } shadow-md ${className}`}
    >
      {/* Header Banner */}
      <div
        className={`px-4 py-2.5 border-b flex items-center justify-between gap-3 text-white ${
          isCustomTeacher
            ? 'bg-[#1F1916]/95 border-[#8F3E32]/30'
            : 'bg-[#0F291E]/95 border-[#16A34A]/30'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-7 h-7 rounded-lg text-white flex items-center justify-center shrink-0 ${
              isCustomTeacher ? 'bg-[#8F3E32]' : 'bg-[#16A34A]'
            }`}
          >
            <Film className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded border ${
                  isCustomTeacher
                    ? 'bg-[#8F3E32]/30 text-rose-300 border-[#8F3E32]/50'
                    : 'bg-[#16A34A]/30 text-[#86EFAC] border-[#16A34A]/50'
                }`}
              >
                {isCustomTeacher ? 'VIDEO GIÁO VIÊN' : 'VIDEO BÀI HỌC'}
              </span>
              <span className="text-[10px] text-stone-300 hidden sm:inline-block font-medium truncate">
                {isCustomTeacher
                  ? (customLesson.authorName ? `Biên soạn bởi ${customLesson.authorName}` : 'Học liệu bổ trợ của thầy cô')
                  : 'Học liệu số chuẩn SGK Toán 9'}
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-[#F8FAF5] truncate font-serif">
              {videoTitle}
            </h4>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${
              isCustomTeacher
                ? 'text-rose-300 bg-rose-950/30 border-rose-800/40'
                : 'text-[#86EFAC] bg-[#059669]/20 border-[#059669]/40'
            }`}
          >
            {videoDurationFormatted}
          </span>
        </div>
      </div>

      {/* Main Video Viewport (16:9 Natural Ratio) */}
      <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden group">
        <video
          ref={videoRef}
          id={`lesson-video-player-${shape}`}
          src={activeSrc}
          poster={videoPoster}
          preload="metadata"
          playsInline
          onTimeUpdate={onVideoTimeUpdate}
          onLoadedMetadata={onVideoLoadedMetadata}
          onWaiting={onVideoWaiting}
          onPlaying={onVideoPlaying}
          onError={onVideoError}
          onEnded={onVideoEnded}
          onClick={handleTogglePlay}
          className="w-full h-full object-contain cursor-pointer"
        >
          <source src={activeSrc} type="video/mp4" />
          {propCaptions && <track kind="captions" src={propCaptions} srcLang="vi" label="Tiếng Việt" default />}
          Trình duyệt của bạn không hỗ trợ thẻ video HTML5.
        </video>

        {/* Floating Resume Prompt Banner (Requirement L) */}
        {resumePrompt && !isPlaying && !isLoading && !isError && (
          <div className="absolute top-4 left-4 right-4 z-20 bg-slate-900/95 border border-emerald-500/50 text-white rounded-xl p-3 shadow-xl backdrop-blur-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs min-w-0">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">
                Bạn đã xem đến <strong className="text-emerald-300 font-mono">{formatTime(resumePrompt.time)}</strong>. Tiếp tục học?
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleResume}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Tiếp tục
              </button>
              <button
                onClick={handleDismissResume}
                className="px-2 py-1 text-slate-400 hover:text-white text-xs rounded-lg transition-colors cursor-pointer"
              >
                Bỏ qua
              </button>
            </div>
          </div>
        )}

        {/* Big Center Play Overlay Button when not started or paused */}
        {(!isPlaying || !hasStarted) && !isLoading && !isError && (
          <button
            id={`lesson-video-play-btn-${shape}`}
            onClick={handleTogglePlay}
            aria-label="Phát video"
            className={`absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full ${
              isCustomTeacher ? 'bg-[#8F3E32]/90 hover:bg-[#8F3E32]' : 'bg-[#16A34A]/90 hover:bg-[#16A34A]'
            } text-white flex items-center justify-center shadow-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs border-2 border-white/40 z-10 min-w-[44px] min-h-[44px] touch-manipulation`}
          >
            <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-white" />
          </button>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex flex-col items-center justify-center gap-3 z-20 pointer-events-none">
            <div
              className={`w-10 h-10 border-3 ${
                isCustomTeacher ? 'border-rose-400' : 'border-[#86EFAC]'
              } border-t-transparent rounded-full animate-spin`}
            />
            <span
              className={`text-xs ${
                isCustomTeacher ? 'text-rose-300' : 'text-[#86EFAC]'
              } font-medium`}
            >
              Đang tải video...
            </span>
          </div>
        )}

        {/* Error Fallback Box */}
        {isError && (
          <div className="absolute inset-0 bg-[#0F291E]/95 flex flex-col items-center justify-center p-6 text-center z-30 space-y-3">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1 max-w-sm">
              <h5 className="text-sm font-bold text-white">Chưa thể phát video</h5>
              <p className="text-xs text-red-200">{errorMessage}</p>
            </div>
            <button
              onClick={handleRetry}
              className="px-4 py-2 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
              Thử lại
            </button>
          </div>
        )}

        {/* Bottom Control Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 pt-6 transition-opacity duration-200 z-10 flex flex-col gap-2">
          {/* Seek Progress Bar */}
          <div className="relative flex items-center w-full group/seek">
            {/* Background Track */}
            <div className="w-full h-1.5 sm:h-2 bg-white/20 rounded-full overflow-hidden relative">
              {/* Buffered Track */}
              <div
                className="absolute top-0 left-0 h-full bg-white/30 rounded-full transition-all duration-300"
                style={{ width: `${bufferedPercent}%` }}
              />
              {/* Current Progress Track */}
              <div
                className={`absolute top-0 left-0 h-full ${
                  isCustomTeacher ? 'bg-rose-500' : 'bg-[#16A34A]'
                } rounded-full`}
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
              />
            </div>
            <input
              id={`lesson-video-seek-${shape}`}
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              aria-label="Tua video"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between gap-2 text-white">
            {/* Left Controls: Play/Pause, Rewind, Forward, Time */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                id={`lesson-video-toggle-play-${shape}`}
                onClick={handleTogglePlay}
                aria-label={isPlaying ? 'Tạm dừng' : 'Phát'}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5 fill-white" />}
              </button>

              <button
                onClick={() => handleSkip(-10)}
                aria-label="Lùi 10 giây"
                title="Lùi 10 giây"
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer hidden sm:flex"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleSkip(10)}
                aria-label="Tiến 10 giây"
                title="Tiến 10 giây"
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer hidden sm:flex"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              <div className="text-[11px] sm:text-xs font-mono text-white/90 ml-1">
                <span>{formatTime(currentTime)}</span>
                <span className="text-white/40 mx-1">/</span>
                <span className="text-white/60">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Right Controls: Volume, Speed, Fullscreen */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Volume Group */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleToggleMute}
                  aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
                  className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  aria-label="Âm lượng"
                  className="w-14 sm:w-18 h-1 accent-[#16A34A] cursor-pointer hidden md:block"
                />
              </div>

              {/* Speed Menu Button */}
              <div className="relative">
                <button
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  aria-label="Tốc độ phát"
                  className="px-2 py-1 rounded-md text-[11px] font-bold bg-white/10 hover:bg-white/20 text-[#86EFAC] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Gauge className="w-3 h-3" />
                  <span>{playbackRate}x</span>
                </button>

                {showSpeedMenu && (
                  <div className="absolute bottom-full right-0 mb-2 py-1 bg-[#0F291E] border border-[#16A34A]/40 rounded-xl shadow-xl z-30 min-w-[75px] text-xs">
                    {[0.75, 1, 1.25, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => handleSpeedChange(rate)}
                        className={`w-full text-left px-3 py-1.5 text-[11px] font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                          playbackRate === rate
                            ? 'bg-[#16A34A] text-white'
                            : 'text-[#E2EADF] hover:bg-white/10'
                        }`}
                      >
                        <span>{rate}x</span>
                        {playbackRate === rate && <CheckCircle2 className="w-3 h-3" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={handleToggleFullscreen}
                aria-label={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Timestamp Markers */}
      {markers && markers.length > 0 && (
        <div
          className={`p-3 border-t ${
            isCustomTeacher ? 'bg-[#191412] border-[#8F3E32]/20' : 'bg-[#0D241A] border-[#16A34A]/20'
          }`}
        >
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-stone-200 uppercase tracking-wider mb-2">
            <Clock className={`w-3.5 h-3.5 ${isCustomTeacher ? 'text-rose-400' : 'text-[#16A34A]'}`} />
            <span>Mốc nội dung trọng tâm bài học:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {markers.map((marker: any, idx: number) => (
              <button
                key={idx}
                onClick={() => handleSeekTo(marker.time)}
                className={`p-2 rounded-xl border text-left transition-all cursor-pointer group flex items-start gap-2 ${
                  isCustomTeacher
                    ? 'bg-[#251E1A] hover:bg-[#332924] border-[#8F3E32]/30'
                    : 'bg-[#0F291E] hover:bg-[#163D2D] border-[#16A34A]/30'
                }`}
              >
                <span
                  className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded transition-colors ${
                    isCustomTeacher
                      ? 'bg-rose-950 text-rose-300 group-hover:bg-rose-600 group-hover:text-white'
                      : 'bg-[#16A34A]/30 text-[#86EFAC] group-hover:bg-[#16A34A] group-hover:text-white'
                  }`}
                >
                  {marker.label}
                </span>
                <span className="text-[11px] text-[#E2EADF] leading-tight line-clamp-2">
                  {marker.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
