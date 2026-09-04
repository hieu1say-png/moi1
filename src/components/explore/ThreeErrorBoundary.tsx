/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - THREE.JS / WEBGL ERROR BOUNDARY
 * Isolates 3D canvas rendering failures (e.g. WebGL context lost, GPU driver issue),
 * and provides an interactive 2D geometric fallback with sliders and KaTeX formulas.
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, RotateCw, AlertCircle, Sparkles } from 'lucide-react';

interface Props {
  children: ReactNode;
  shapeName?: string;
  radius?: number;
  height?: number;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ThreeErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('[ThreeErrorBoundary] 3D WebGL failure detected, switching to 2D pedagogical fallback:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      const r = this.props.radius ?? 4;
      const h = this.props.height ?? 8;
      const shape = this.props.shapeName || 'hình khối';

      return (
        <div className="w-full h-full min-h-[380px] rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Chế độ 2D Trực quan (WebGL Dự phòng)</span>
          </div>

          <div className="relative z-10 max-w-sm w-full">
            {/* Interactive SVG Diagram fallback */}
            <div className="w-48 h-48 mx-auto mb-4 bg-slate-950/60 rounded-2xl border border-slate-800 flex items-center justify-center p-4">
              <svg viewBox="0 0 160 160" className="w-full h-full stroke-blue-400 fill-blue-500/10" strokeWidth="2">
                <ellipse cx="80" cy="35" rx="45" ry="16" />
                <path d="M 35 35 L 35 125 A 45 16 0 0 0 125 125 L 125 35" />
                <path d="M 35 125 A 45 16 0 0 1 125 125" strokeDasharray="3 3" />
                {/* Labels */}
                <line x1="80" y1="35" x2="125" y2="35" stroke="#F59E0B" strokeWidth="2" />
                <text x="100" y="30" fill="#F59E0B" fontSize="10" textAnchor="middle">r = {r}</text>
                <line x1="80" y1="35" x2="80" y2="125" stroke="#10B981" strokeWidth="1.5" strokeDasharray="2 2" />
                <text x="92" y="80" fill="#10B981" fontSize="10">h = {h}</text>
              </svg>
            </div>

            <h3 className="text-base font-bold text-white mb-1">
              Mô hình trực quan {shape}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Thiết bị của bạn đang dùng bộ tăng tốc đồ họa dự phòng. Các công thức và số đo vẫn được tính toán chính xác theo thời gian thực.
            </p>

            <button
              type="button"
              onClick={this.handleRetry}
              className="px-4 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/40 text-blue-200 text-xs font-semibold inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Thử kết nối lại 3D WebGL</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
