/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - VIDEO ERROR BOUNDARY
 * Protects video learning sections from codec or network failures,
 * falling back to an organized KaTeX formula summary and interactive 3D laboratory prompt.
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { VideoOff, ArrowRight, BookOpen } from 'lucide-react';

interface Props {
  children: ReactNode;
  topicTitle?: string;
  onExploreInLab?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class VideoErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('[VideoErrorBoundary] Video playback error caught:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-[300px] rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
            <VideoOff className="w-7 h-7" />
          </div>

          <h3 className="text-base font-bold text-white mb-2">
            Không thể phát video bài giảng
          </h3>
          <p className="text-xs text-slate-400 max-w-md mb-5 leading-relaxed">
            Luồng video đang tạm thời không sẵn sàng trên trình duyệt của bạn. Bạn vẫn có thể tiếp thu đầy đủ lý thuyết qua Phòng Thí Nghiệm 3D tương tác.
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
            >
              Thử tải lại video
            </button>

            {this.props.onExploreInLab && (
              <button
                type="button"
                onClick={this.props.onExploreInLab}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-orange-600/20"
              >
                <span>Vào phòng thí nghiệm 3D</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
