/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - MOBILE VIDEO PLAYER
 * Optimized for Mobile Devices (16:9 Aspect Ratio, Large Touch Targets, Zero Clutter):
 * - Direct responsive full-width container
 * - Large touch play/pause overlay
 * - Horizontal scrolling chapter markers (00:00 Cấu tạo, 02:15 Công thức, ...)
 * - Poster image loaded before video playback, preload="metadata" for data saving
 * - Offline/network retry state support
 */

import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Clock,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export interface VideoChapter {
  id: string;
  timeSeconds: number;
  label: string;
  sublabel?: string;
}

export interface MobileVideoProps {
  videoUrl: string;
  posterUrl?: string;
  title: string;
  chapters?: VideoChapter[];
  onTimeUpdate?: (currentTime: number) => void;
  onEnded?: () => void;
  className?: string;
}

const DEFAULT_CHAPTERS: VideoChapter[] = [
  { id: 'ch1', timeSeconds: 0, label: '00:00', sublabel: 'Cấu tạo & Khái niệm' },
  { id: 'ch2', timeSeconds: 135, label: '02:15', sublabel: 'Công thức S_xq & S_tp' },
  { id: 'ch3', timeSeconds: 340, label: '05:40', sublabel: 'Công thức Thể tích V' },
  { id: 'ch4', timeSeconds: 510, label: '08:30', sublabel: 'Ví dụ thực tế & Ứng dụng' }
];

export const MobileVideo: React.FC<MobileVideoProps> = ({
  videoUrl,
  posterUrl,
  title,
  chapters = DEFAULT_CHAPTERS,
  onTimeUpdate,
  onEnded,
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  // Sync active chapter index based on current time
  useEffect(() => {
    let activeIdx = 0;
    for (let i = 0; i < chapters.length; i++) {
      if (currentTime >= chapters[i].timeSeconds) {
        activeIdx = i;
      }
    }
    setActiveChapterIndex(activeIdx);
  }, [currentTime, chapters]);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
        setHasError(false);
      }).catch((err) => {
        console.warn('Mobile video playback blocked or failed:', err);
      });
    }
  };

  const handleSeekChapter = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = seconds;
    setCurrentTime(seconds);
    if (!isPlaying) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch(() => {});
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`w-full space-y-3 ${className}`}>
      {/* 16:9 Video Canvas Container */}
      <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-md border border-[#E5DCCF]">
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          preload="metadata"
          playsInline
          className="w-full h-full object-cover"
          onTimeUpdate={() => {
            if (videoRef.current) {
              const cur = videoRef.current.currentTime;
              setCurrentTime(cur);
              onTimeUpdate?.(cur);
            }
          }}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setDuration(videoRef.current.duration || 0);
            }
          }}
          onEnded={() => {
            setIsPlaying(false);
            onEnded?.();
          }}
          onError={() => setHasError(true)}
        />

        {/* Big Tap Area to Play/Pause */}
        <button
          type="button"
          onClick={handleTogglePlay}
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/25 active:bg-black/40 transition-colors touch-manipulation group"
          aria-label={isPlaying ? 'Tạm dừng video' : 'Phát video'}
        >
          {(!isPlaying || !hasStarted) && (
            <div className="w-16 h-16 rounded-full bg-white/95 text-[#FF6B00] flex items-center justify-center shadow-xl transform active:scale-90 transition-transform">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
          )}
        </button>

        {/* Error Fallback Overlay */}
        {hasError && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-4 text-center text-white space-y-2">
            <AlertCircle className="w-8 h-8 text-amber-400" />
            <p className="text-xs font-semibold">Video đang được chuẩn bị hoặc kết nối yếu.</p>
            <button
              type="button"
              onClick={() => {
                setHasError(false);
                if (videoRef.current) {
                  videoRef.current.load();
                  videoRef.current.play().catch(() => {});
                }
              }}
              className="px-4 py-1.5 rounded-xl bg-orange-600 text-white text-xs font-bold active:scale-95"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Video Bottom Floating Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between gap-3 text-white text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTogglePlay}
              className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center active:scale-95 touch-manipulation"
              aria-label={isPlaying ? 'Tạm dừng' : 'Phát'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>
            <span className="font-mono text-[11px] font-semibold">
              {formatTime(currentTime)} / {formatTime(duration || 0)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleMute}
              className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center active:scale-95 touch-manipulation"
              aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Video Title Header */}
      <div className="px-1 flex items-center justify-between">
        <h4 className="font-bold text-sm text-[#2D241E] line-clamp-1">{title}</h4>
        <span className="text-[11px] text-[#8C7E72] font-medium flex items-center gap-1">
          <Clock className="w-3 h-3" /> {formatTime(duration || 0)}
        </span>
      </div>

      {/* Mobile Horizontal Chapter Track */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-[#766A61] uppercase tracking-wider">
            Nội dung bài giảng (Chạm để chuyển)
          </span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none snap-x touch-pan-x px-1">
          {chapters.map((ch, idx) => {
            const isActive = idx === activeChapterIndex;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => handleSeekChapter(ch.timeSeconds)}
                className={`snap-start shrink-0 px-3 py-2 rounded-xl text-left border transition-all active:scale-95 min-h-[44px] flex flex-col justify-center ${
                  isActive
                    ? 'bg-[#FF6B00] text-white border-[#E05300] shadow-xs'
                    : 'bg-[#FFFDF8] text-[#4A3E36] border-[#EADFCB] hover:bg-[#FAF5EC]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-white' : 'text-[#8F3E32]'}`}>
                    {ch.label}
                  </span>
                  <span className="text-xs font-bold line-clamp-1">
                    {ch.sublabel || `Phần ${idx + 1}`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
