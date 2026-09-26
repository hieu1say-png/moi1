/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - VideoLesson Component
 * Safe, zero-fake video player conforming strictly to EdTech UX guidelines:
 * - If video source is missing, invalid, or fails to load: returns null (completely hides frame)
 * - Full controls: Play, Pause, Seek, Volume, Fullscreen, Playback Speed (0.75x - 2x)
 * - Responsive 16:9 aspect ratio container with smooth buffering and loading indicators
 * - Zero external AI/dummy generation
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Gauge,
  Sparkles
} from 'lucide-react';
import { ShapeType } from '../../types';

export interface VideoLessonProps {
  src?: string;
  poster?: string;
  title?: string;
  shape?: ShapeType;
  className?: string;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
}

export const VideoLesson: React.FC<VideoLessonProps> = ({
  src,
  poster,
  title = 'Video bài học',
  shape = 'cylinder',
  className = '',
  onEnded,
  onTimeUpdate
}) => {
  // If no source provided, strictly return null (Zero-Fake Policy)
  if (!src || src.trim() === '') {
    return null;
  }

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bufferedPercent, setBufferedPercent] = useState(0);

  // Reset states when src changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setHasError(false);
    setIsLoading(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }
  }, [src]);

  // Handle Fullscreen change listeners
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Format seconds to mm:ss
  const formatTime = (secs: number): string => {
    if (!secs || isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTogglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.warn('[VIDEO-LESSON] Playback error:', err);
          setIsPlaying(false);
          setIsLoading(false);
          setHasError(true);
        });
    }
  }, [isPlaying]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted && volume === 0) {
        setVolume(0.5);
        videoRef.current.volume = 0.5;
      }
    }
  };

  const handleSpeedSelect = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
    setShowSpeedMenu(false);
  };

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  // If loading error occurs on video element, hide completely
  if (hasError) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden bg-slate-950 shadow-lg border border-slate-800 group select-none ${className}`}
    >
      {/* 16:9 Aspect Ratio Video Element */}
      <div className="relative aspect-video w-full bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="metadata"
          playsInline
          className="w-full h-full object-contain cursor-pointer"
          onClick={handleTogglePlay}
          onTimeUpdate={() => {
            if (videoRef.current) {
              const cur = videoRef.current.currentTime;
              const dur = videoRef.current.duration || duration;
              setCurrentTime(cur);
              onTimeUpdate?.(cur, dur);

              // Update buffer percent
              if (videoRef.current.buffered.length > 0) {
                const end = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
                setBufferedPercent((end / (dur || 1)) * 100);
              }
            }
          }}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setDuration(videoRef.current.duration);
              setIsLoading(false);
            }
          }}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => {
            setIsLoading(false);
            setIsPlaying(true);
          }}
          onEnded={() => {
            setIsPlaying(false);
            onEnded?.();
          }}
          onError={() => {
            console.warn('[VIDEO-LESSON] Video file failed to load:', src);
            setHasError(true);
          }}
        />

        {/* Big Center Play Button Overlay when paused */}
        {!isPlaying && !isLoading && (
          <button
            type="button"
            onClick={handleTogglePlay}
            className="absolute z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl transition-transform transform hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
            title="Bắt đầu phát video bài giảng"
          >
            <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-white" />
          </button>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute z-10 flex flex-col items-center gap-2 bg-black/60 p-4 rounded-xl backdrop-blur-xs text-white">
            <div className="w-8 h-8 border-3 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-medium">Đang tải video bài giảng...</span>
          </div>
        )}
      </div>

      {/* Control Bar Overlay */}
      <div className="bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent p-3 sm:p-4 space-y-2">
        {/* Progress Slider */}
        <div className="relative w-full h-2 flex items-center">
          {/* Buffered Track */}
          <div
            className="absolute left-0 top-0 bottom-0 bg-slate-700/60 rounded-full pointer-events-none transition-all"
            style={{ width: `${bufferedPercent}%` }}
          />
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:h-2 transition-all relative z-10"
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between gap-2 text-white">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Play / Pause Button */}
            <button
              type="button"
              onClick={handleTogglePlay}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
              title={isPlaying ? 'Tạm dừng (Space)' : 'Phát (Space)'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
            </button>

            {/* Replay 10s */}
            <button
              type="button"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = Math.max(0, currentTime - 10);
                }
              }}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Tua lại 10 giây"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Time Indicator */}
            <span className="text-xs font-mono text-slate-300">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            {/* Volume Control */}
            <div className="hidden sm:flex items-center gap-1.5 group/vol">
              <button
                type="button"
                onClick={handleToggleMute}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 opacity-60 group-hover/vol:opacity-100 transition-opacity"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Title / Badge */}
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800">
              <Sparkles className="w-3 h-3" />
              <span>{title}</span>
            </span>

            {/* Speed Selector Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Tốc độ phát"
              >
                <Gauge className="w-3.5 h-3.5" />
                <span>{playbackRate}x</span>
              </button>

              {showSpeedMenu && (
                <div className="absolute right-0 bottom-full mb-2 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-1 z-20 min-w-[70px]">
                  {[0.75, 1, 1.25, 1.5, 2].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => handleSpeedSelect(rate)}
                      className={`w-full text-left px-3 py-1 text-xs transition-colors cursor-pointer ${
                        playbackRate === rate ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={handleToggleFullscreen}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
