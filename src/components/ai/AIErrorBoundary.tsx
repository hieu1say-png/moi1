/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - AI TUTOR ERROR BOUNDARY
 * Protects AI chat interfaces from network drops or API timeouts,
 * providing deterministic pedagogical hints, formulas, and suggestions from the built-in Math knowledge bank.
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Bot, RefreshCw, Lightbulb, BookOpen } from 'lucide-react';

interface Props {
  children: ReactNode;
  shapeName?: string;
  onRetry?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AIErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('[AIErrorBoundary] AI Tutor component failure:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-slate-800 text-left space-y-3">
          <div className="flex items-center gap-2.5 text-amber-700 font-bold text-xs">
            <Bot className="w-4 h-4 text-amber-600" />
            <span>Thầy Hiếu AI đang tạm thời ngoại tuyến</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Hệ thống đang kích hoạt ngân hàng bí kíp dự phòng. Bạn hãy ghi nhớ các bước giải toán chuẩn:
          </p>

          <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60 text-xs space-y-1.5 font-sans">
            <div className="flex items-center gap-1.5 text-blue-700 font-bold">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>4 Bước Giải Chuẩn Hình Học Không Gian:</span>
            </div>
            <ol className="list-decimal list-inside text-slate-700 space-y-1 pl-1 text-[11px]">
              <li><strong>Bước 1:</strong> Xác định dữ kiện và đổi đơn vị đồng nhất.</li>
              <li><strong>Bước 2:</strong> Viết công thức tổng quát (V, Sxq, Stp).</li>
              <li><strong>Bước 3:</strong> Thay số cẩn thận, chú ý số &pi;.</li>
              <li><strong>Bước 4:</strong> Kết luận và kiểm tra tính thực tiễn.</li>
            </ol>
          </div>

          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false, error: null });
              this.props.onRetry?.();
            }}
            className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Thử kết nối lại trợ lý AI</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
