/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BÍ KÍP TẬP VẼ HÌNH KHÔNG GIAN CHUẨN THI VÀO 10 (SPATIAL SKETCHPAD)
 * - [A] Art: Bảng vẽ Spatial Sketchpad hỗ trợ vẽ hình không gian với thước elip đáy.
 * - Tự động phát hiện nét khuất nét thấy theo chuẩn thi vào 10.
 * - Solid lines (—) cho đường nhìn thấy (nửa trước đáy elip, đường sinh biên)
 * - Dashed lines (---) cho đường khuất bên trong (nửa sau đáy elip, trục đối xứng OO', SO, bán kính r)
 * - Thước Elip Đáy Chuẩn 10 tự động sinh cung elip chia 2 nửa nét liền & nét đứt
 * - Thước Đường Sinh Biên & Trục Xoay
 * - Smooth touch & mouse drawing, undo, clear, download PNG
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  RotateCcw,
  Download,
  Eye,
  Sparkles,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Ruler
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { MathText } from '../common/MathFormula';

export type LineStyle = 'SOLID' | 'DASHED';
export type ShapeTemplate = 'CYLINDER' | 'CONE' | 'SPHERE' | 'FREE';

export interface DrawPath {
  points: { x: number; y: number }[];
  style: LineStyle;
  color: string;
  size: number;
}

export const SpatialSketchpad: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { showSuccess, showInfo } = useToast();

  // Drawing Settings
  const [lineStyle, setLineStyle] = useState<LineStyle>('SOLID');
  const [color, setColor] = useState<string>('#0f172a');
  const [brushSize] = useState<number>(3);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [autoDetectHidden, setAutoDetectHidden] = useState<boolean>(true);
  const [template, setTemplate] = useState<ShapeTemplate>(() => {
    try {
      const saved = localStorage.getItem('GEOMETRY_LAB_SKETCHPAD_TEMPLATE');
      if (saved && ['CYLINDER', 'CONE', 'SPHERE', 'FREE'].includes(saved)) {
        return saved as ShapeTemplate;
      }
    } catch {
      // Ignore storage error
    }
    return 'CYLINDER';
  });
  const [showGhostGuide, setShowGhostGuide] = useState<boolean>(true);

  // Path History State
  const [paths, setPaths] = useState<DrawPath[]>(() => {
    try {
      const saved = localStorage.getItem('GEOMETRY_LAB_SKETCHPAD_PATHS');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage error
    }
    return [];
  });
  const currentPathRef = useRef<{ x: number; y: number }[]>([]);

  // Persist paths
  useEffect(() => {
    try {
      localStorage.setItem('GEOMETRY_LAB_SKETCHPAD_PATHS', JSON.stringify(paths));
    } catch (e) {
      console.warn('Cannot persist sketchpad paths:', e);
    }
  }, [paths]);

  // Persist template
  useEffect(() => {
    try {
      localStorage.setItem('GEOMETRY_LAB_SKETCHPAD_TEMPLATE', template);
    } catch (e) {
      console.warn('Cannot persist sketchpad template:', e);
    }
  }, [template]);

  // Repaint canvas loop
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dpr = window.devicePixelRatio || 1;
    const expectedWidth = Math.round(rect.width * dpr);
    const expectedHeight = Math.round(rect.height * dpr);

    if (canvas.width !== expectedWidth || canvas.height !== expectedHeight) {
      canvas.width = expectedWidth;
      canvas.height = expectedHeight;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Clear background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw Subtle Academic Grid
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    const gridSize = 25;
    for (let x = 0; x < rect.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, rect.height);
      ctx.stroke();
    }
    for (let y = 0; y < rect.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(rect.width, y);
      ctx.stroke();
    }

    // Draw Ghost Template if enabled
    if (showGhostGuide && template !== 'FREE') {
      ctx.save();
      drawGhostTemplate(ctx, template, rect.width, rect.height);
      ctx.restore();
    }

    // Draw user saved paths
    paths.forEach((p) => {
      if (!p.points || p.points.length === 0) return;
      ctx.save();
      ctx.strokeStyle = p.color;
      ctx.lineWidth = p.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (p.style === 'DASHED') {
        ctx.setLineDash([8, 6]);
      } else {
        ctx.setLineDash([]);
      }

      if (p.points.length === 1) {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.points[0].x, p.points[0].y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(p.points[0].x, p.points[0].y);
        for (let i = 1; i < p.points.length; i++) {
          ctx.lineTo(p.points[i].x, p.points[i].y);
        }
        ctx.stroke();
      }
      ctx.restore();
    });

    // Draw currently active stroke
    if (isDrawing && currentPathRef.current.length > 0) {
      const curr = currentPathRef.current;
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (lineStyle === 'DASHED') {
        ctx.setLineDash([8, 6]);
      } else {
        ctx.setLineDash([]);
      }

      if (curr.length === 1) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(curr[0].x, curr[0].y, brushSize / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(curr[0].x, curr[0].y);
        for (let i = 1; i < curr.length; i++) {
          ctx.lineTo(curr[i].x, curr[i].y);
        }
        ctx.stroke();
      }
      ctx.restore();
    }

    ctx.restore();
  }, [paths, showGhostGuide, template, isDrawing, color, brushSize, lineStyle]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  useEffect(() => {
    const handleResize = () => {
      redrawCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [redrawCanvas]);

  // Pointer event helpers
  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }
    setIsDrawing(true);
    const pos = getCanvasCoords(e);
    currentPathRef.current = [pos];
    redrawCanvas();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const pos = getCanvasCoords(e);
    currentPathRef.current.push(pos);
    redrawCanvas();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    try {
      if ((e.target as HTMLElement).hasPointerCapture(e.pointerId)) {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      }
    } catch {
      // safe fallback
    }
    setIsDrawing(false);
    if (currentPathRef.current.length > 0) {
      let finalStyle = lineStyle;

      // Smart Hidden-Line Auto-Detection:
      // If user drew an interior horizontal or upper stroke in the bottom half zone, detect if it's hidden
      if (autoDetectHidden && lineStyle === 'SOLID') {
        const canvas = canvasRef.current;
        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          const cy = rect.height * 0.65;
          const avgY = currentPathRef.current.reduce((sum, pt) => sum + pt.y, 0) / currentPathRef.current.length;
          // If stroke is strictly near bottom base and sits in upper half of base, suggest or auto-apply dashed
          if (avgY > cy - 25 && avgY < cy) {
            finalStyle = 'DASHED';
          }
        }
      }

      const newPath: DrawPath = {
        points: [...currentPathRef.current],
        style: finalStyle,
        color,
        size: brushSize
      };
      setPaths((prev) => [...prev, newPath]);
    }
    currentPathRef.current = [];
  };

  const handleUndo = () => {
    setPaths((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPaths([]);
    currentPathRef.current = [];
    try {
      localStorage.removeItem('GEOMETRY_LAB_SKETCHPAD_PATHS');
    } catch {
      // Ignore
    }
    showInfo('Đã xóa toàn bộ nét vẽ.');
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `GeometryLab_Drawing_${template}_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showSuccess('Đã tải hình vẽ về máy thành công!');
  };

  // Thước Elip Đáy Chuẩn Thi 10 (Auto Generates Split Hidden/Visible Ellipse)
  const handleApplyEllipseRuler = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height * 0.68;
    const rx = Math.min(105, rect.width * 0.26);
    const ry = rx * 0.28;

    // 1. Nửa elip phía sau (góc PI đến 2*PI phía trên): Nét đứt (DASHED, nét khuất)
    const backPoints: { x: number; y: number }[] = [];
    for (let a = Math.PI; a <= Math.PI * 2; a += 0.08) {
      backPoints.push({ x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) });
    }

    // 2. Nửa elip phía trước (góc 0 đến PI phía dưới): Nét liền (SOLID, nét thấy)
    const frontPoints: { x: number; y: number }[] = [];
    for (let a = 0; a <= Math.PI; a += 0.08) {
      frontPoints.push({ x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) });
    }

    // 3. Trục bán kính r và tâm O: Nét đứt (DASHED)
    const radiusPoints = [
      { x: cx, y: cy },
      { x: cx + rx, y: cy }
    ];

    const newBackPath: DrawPath = { points: backPoints, style: 'DASHED', color, size: brushSize };
    const newFrontPath: DrawPath = { points: frontPoints, style: 'SOLID', color, size: brushSize };
    const newRadiusPath: DrawPath = { points: radiusPoints, style: 'DASHED', color: '#16A34A', size: brushSize };

    setPaths((prev) => [...prev, newBackPath, newFrontPath, newRadiusPath]);
    showSuccess('📐 Đã kẻ Thước Elip đáy chuẩn 10: Nửa sau nét đứt (khuất), nửa trước nét liền (thấy)!');
  };

  // Thước Kẻ Đường Sinh Biên & Trục Đối Xứng
  const handleApplyGeneratrixRuler = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height * 0.68;
    const rx = Math.min(105, rect.width * 0.26);
    const topY = cy - 150;

    if (template === 'CONE') {
      // Cone converging to apex S
      const apex = { x: cx, y: topY };
      const leftLine: DrawPath = {
        points: [apex, { x: cx - rx, y: cy }],
        style: 'SOLID',
        color,
        size: brushSize
      };
      const rightLine: DrawPath = {
        points: [apex, { x: cx + rx, y: cy }],
        style: 'SOLID',
        color,
        size: brushSize
      };
      const heightLine: DrawPath = {
        points: [apex, { x: cx, y: cy }],
        style: 'DASHED',
        color: '#0284C7',
        size: brushSize
      };
      setPaths((prev) => [...prev, leftLine, rightLine, heightLine]);
      showSuccess('📐 Đã kẻ 2 đường sinh nón và đường cao SO nét đứt!');
    } else {
      // Cylinder parallel generatrices
      const leftLine: DrawPath = {
        points: [{ x: cx - rx, y: topY }, { x: cx - rx, y: cy }],
        style: 'SOLID',
        color,
        size: brushSize
      };
      const rightLine: DrawPath = {
        points: [{ x: cx + rx, y: topY }, { x: cx + rx, y: cy }],
        style: 'SOLID',
        color,
        size: brushSize
      };
      const axisLine: DrawPath = {
        points: [{ x: cx, y: topY }, { x: cx, y: cy }],
        style: 'DASHED',
        color: '#0284C7',
        size: brushSize
      };
      setPaths((prev) => [...prev, leftLine, rightLine, axisLine]);
      showSuccess('📐 Đã kẻ 2 đường sinh biên và trục OO\' nét đứt!');
    }
  };

  return (
    <div className="bg-[#FFFDF8] border border-[#E2EADF] rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2EADF] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] text-xs font-bold uppercase flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              [A] Nghệ Thuật &amp; Kỹ Năng Vẽ Hình Không Gian
            </span>
            <span className="text-xs text-[#658473] font-medium">Chuẩn Chấm Điểm Tuyển Sinh 10</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F291E] mt-1 flex items-center gap-2">
            ✏️ Bảng Vẽ Spatial Sketchpad &amp; Thước Elip Đáy Chuẩn 10
          </h2>
          <div className="text-xs sm:text-sm text-[#52705E] mt-1 max-w-2xl">
            <MathText text="Rèn luyện kỹ năng vẽ hình tự luận chuẩn barem: **Nét liền (—)** cho phần nhìn thấy, **Nét đứt (---)** cho đường khuất bên trong (nửa sau elip đáy, trục $OO'$, đường cao $SO$)." />
          </div>
        </div>

        {/* Template Selector */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(['CYLINDER', 'CONE', 'SPHERE', 'FREE'] as ShapeTemplate[]).map((t) => (
            <button
              key={t}
              onClick={() => setTemplate(t)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                template === t
                  ? 'bg-[#16A34A] text-white border-[#16A34A] shadow-xs'
                  : 'bg-white text-[#4F6859] border-[#E2EADF] hover:bg-[#F8FAF5]'
              }`}
            >
              {t === 'CYLINDER' && '1. Hình Trụ'}
              {t === 'CONE' && '2. Hình Nón'}
              {t === 'SPHERE' && '3. Hình Cầu'}
              {t === 'FREE' && '4. Tự Do'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Canvas & Intelligent Tools (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          {/* Tool Control Bar */}
          <div className="bg-white border border-[#E2EADF] rounded-2xl p-3 shadow-2xs flex items-center justify-between flex-wrap gap-2">
            {/* Line Style Switcher */}
            <div className="flex items-center gap-1.5 bg-[#F8FAF5] p-1 rounded-xl border border-[#E2EADF]">
              <button
                type="button"
                onClick={() => setLineStyle('SOLID')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  lineStyle === 'SOLID'
                    ? 'bg-[#0F291E] text-white shadow-2xs'
                    : 'text-[#4F6859] hover:text-[#0F291E]'
                }`}
              >
                <span>— Nét Liền (Thấy)</span>
              </button>
              <button
                type="button"
                onClick={() => setLineStyle('DASHED')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  lineStyle === 'DASHED'
                    ? 'bg-[#16A34A] text-white shadow-2xs'
                    : 'text-[#4F6859] hover:text-[#0F291E]'
                }`}
              >
                <span>- - - Nét Đứt (Khuất)</span>
              </button>
            </div>

            {/* Smart Exam Rulers: Ellipse Ruler & Generatrix Ruler */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleApplyEllipseRuler}
                className="px-2.5 py-1.5 rounded-xl bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#BBF7D0] text-[#16A34A] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
                title="Tự động vẽ đáy elip chuẩn: nửa sau nét đứt, nửa trước nét liền"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Thước Elip Đáy</span>
              </button>
              <button
                type="button"
                onClick={handleApplyGeneratrixRuler}
                className="px-2.5 py-1.5 rounded-xl bg-[#F0F9FF] hover:bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
                title="Tự động vẽ 2 đường sinh biên và trục xoay"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Thước Đường Sinh</span>
              </button>
            </div>

            {/* Color Palette */}
            <div className="flex items-center gap-1 bg-[#F8FAF5] p-1 rounded-xl border border-[#E2EADF]">
              {['#0f172a', '#16a34a', '#0284c7', '#dc2626'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-lg transition-transform cursor-pointer ${
                    color === c ? 'scale-110 ring-2 ring-[#0F291E] shadow-2xs' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c }}
                  aria-label={`Chọn màu ${c}`}
                />
              ))}
            </div>

            {/* Actions: Ghost Guide, Undo, Clear, Download */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShowGhostGuide(!showGhostGuide)}
                className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 cursor-pointer ${
                  showGhostGuide ? 'bg-[#FEF3C7] border-[#FDE68A] text-[#92400E]' : 'bg-[#F8FAF5] border-[#E2EADF] text-[#4F6859]'
                }`}
                title="Bật/Tắt khung mẫu mờ gợi ý"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Mẫu mờ</span>
              </button>
              <button
                type="button"
                onClick={handleUndo}
                className="p-2 rounded-xl bg-[#F8FAF5] hover:bg-[#EAEFE8] border border-[#E2EADF] text-[#334E40] cursor-pointer"
                title="Hoàn tác (Undo)"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="px-2.5 py-1.5 rounded-xl bg-[#FFF1F2] hover:bg-[#FFE4E6] border border-[#FECDD3] text-[#E11D48] text-xs font-bold cursor-pointer"
              >
                Xóa hết
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Tải ảnh</span>
              </button>
            </div>
          </div>

          {/* Canvas Wrapper */}
          <div className="bg-white border border-[#E2EADF] rounded-2xl p-2 shadow-2xs relative overflow-hidden">
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="w-full h-[380px] sm:h-[440px] touch-none rounded-xl cursor-crosshair block"
            />
          </div>

          {/* Auto-detect toggle & Tip */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#F8FAF5] border border-[#E2EADF] rounded-xl text-xs">
            <label className="flex items-center gap-2 font-bold text-[#0F291E] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoDetectHidden}
                onChange={(e) => setAutoDetectHidden(e.target.checked)}
                className="rounded accent-[#16A34A] w-4 h-4"
              />
              <span>Tự động phát hiện nét khuất khi vẽ đáy elip (Tránh mất điểm thi 10)</span>
            </label>
            <span className="text-[11px] text-[#658473] hidden sm:inline">
              Khuyên dùng: Bấm nút <b>Thước Elip Đáy</b> để có đáy chuẩn 100%
            </span>
          </div>
        </div>

        {/* Right: Step by step Rules & Standards for Exam 10 (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Pedagogical Step Guide */}
          <div className="bg-white border border-[#E2EADF] rounded-2xl p-5 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-[#0F291E] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#16A34A]" />
              <span>Quy Tắc Vẽ Chuẩn Barem Tuyển Sinh 10:</span>
            </h3>

            {template === 'CYLINDER' && (
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-[#F0F9FF] border border-[#BAE6FD] rounded-xl">
                  <b className="text-[#0369A1] block font-bold">Bước 1: Vẽ Đáy Trên</b>
                  <div className="text-[#334E40] mt-0.5">
                    <MathText text="Vẽ toàn bộ elip đáy trên bằng **nét liền (—)** vì nhìn thấy toàn bộ từ trên xuống." />
                  </div>
                </div>
                <div className="p-2.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl">
                  <b className="text-[#15803D] block font-bold">Bước 2: Vẽ 2 Đường Sinh Biên</b>
                  <div className="text-[#334E40] mt-0.5">
                    <MathText text="Kẻ 2 đường thẳng song song, vuông góc với đáy bằng **nét liền (—)**." />
                  </div>
                </div>
                <div className="p-2.5 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl">
                  <b className="text-[#B45309] block font-bold">Bước 3: Vẽ Đáy Dưới (Cốt lõi)</b>
                  <div className="text-[#78350F] mt-0.5 space-y-0.5">
                    <p><MathText text="- **Nửa trước (vòng cung dưới)**: Nét liền (—)." /></p>
                    <p><MathText text="- **Nửa sau (vòng cung trên)**: Nét đứt (---) vì bị che khuất!" /></p>
                  </div>
                </div>
                <div className="p-2.5 bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl">
                  <b className="text-[#6D28D9] block font-bold">Bước 4: Trục Đối Xứng OO'</b>
                  <div className="text-[#4C1D95] mt-0.5">
                    <MathText text="Kẻ trục nối 2 tâm $O$ và $O'$ bằng **nét đứt (---)**." />
                  </div>
                </div>
              </div>
            )}

            {template === 'CONE' && (
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl">
                  <b className="text-[#15803D] block font-bold">Bước 1: Vẽ Đáy Nón</b>
                  <div className="text-[#334E40] mt-0.5 space-y-0.5">
                    <p><MathText text="- Nửa trước: **nét liền (—)**." /></p>
                    <p><MathText text="- Nửa sau: **nét đứt (---)**." /></p>
                  </div>
                </div>
                <div className="p-2.5 bg-[#F0F9FF] border border-[#BAE6FD] rounded-xl">
                  <b className="text-[#0369A1] block font-bold">Bước 2: Đỉnh S &amp; 2 Đường Sinh</b>
                  <div className="text-[#334E40] mt-0.5">
                    <MathText text="Chấm đỉnh $S$, kẻ 2 đường sinh nối tới 2 mép biên elip bằng **nét liền (—)**." />
                  </div>
                </div>
                <div className="p-2.5 bg-[#FEF3C7] border border-[#FDE68A] rounded-xl">
                  <b className="text-[#92400E] block font-bold">Bước 3: Chiều Cao SO &amp; Bán Kính OA</b>
                  <div className="text-[#78350F] mt-0.5">
                    <MathText text="Kẻ đường cao $SO \perp OA$ bằng **nét đứt (---)**, ký hiệu góc vuông tại $O$." />
                  </div>
                </div>
              </div>
            )}

            {template === 'SPHERE' && (
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-[#F0F9FF] border border-[#BAE6FD] rounded-xl">
                  <b className="text-[#0369A1] block font-bold">Bước 1: Đường Tròn Biên</b>
                  <div className="text-[#334E40] mt-0.5">
                    <MathText text="Vẽ đường tròn bao ngoài hoàn chỉnh bằng **nét liền (—)**." />
                  </div>
                </div>
                <div className="p-2.5 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl">
                  <b className="text-[#92400E] block font-bold">Bước 2: Đường Xích Đạo Không Gian</b>
                  <div className="text-[#78350F] mt-0.5 space-y-0.5">
                    <p><MathText text="- Nửa trước: **nét liền (—)**." /></p>
                    <p><MathText text="- Nửa sau: **nét đứt (---)**." /></p>
                  </div>
                </div>
                <div className="p-2.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl">
                  <b className="text-[#15803D] block font-bold">Bước 3: Tâm O &amp; Bán Kính R</b>
                  <div className="text-[#334E40] mt-0.5">
                    <MathText text="Chấm tâm $O$, kẻ bán kính $R$ nối ra biên bằng **nét đứt (---)**." />
                  </div>
                </div>
              </div>
            )}

            {template === 'FREE' && (
              <div className="p-3 bg-[#F8FAF5] border border-[#E2EADF] rounded-xl text-xs text-[#52705E]">
                <MathText text="Hãy tự do phác thảo các mô hình hình học không gian phức hợp: Bồn nước inox (Trụ + 2 nửa Cầu), Nón lá, Quả địa cầu..." />
              </div>
            )}
          </div>

          {/* Trap warning */}
          <div className="p-4 bg-[#FFF1F2] border border-[#FECDD3] rounded-2xl text-xs text-[#9F1239] space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-[#E11D48]">
              <AlertTriangle className="w-4 h-4" />
              <span>Cảnh Báo Trừ Điểm Barem Tuyển Sinh:</span>
            </div>
            <div className="leading-relaxed">
              <MathText text="Theo barem chấm thi vào 10, nếu vẽ các đường bị che khuất bên trong thành **nét liền** thay vì **nét đứt**, giám khảo sẽ trừ từ **0.25 đến 0.5 điểm** bài thi!" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper: Draw Ghost Templates on Canvas Background
function drawGhostTemplate(
  ctx: CanvasRenderingContext2D,
  template: ShapeTemplate,
  width: number,
  height: number
) {
  ctx.strokeStyle = '#cbd5e1';
  ctx.fillStyle = '#f8fafc';
  ctx.lineWidth = 1.8;

  const cx = width / 2;
  const cy = height / 2;

  if (template === 'CYLINDER') {
    const rx = Math.min(100, width * 0.25);
    const ry = Math.min(28, rx * 0.28);
    const h = Math.min(180, height * 0.45);
    const topY = cy - h / 2;
    const botY = cy + h / 2;

    // Top Ellipse (Solid ghost)
    ctx.beginPath();
    ctx.ellipse(cx, topY, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Side Generatrices
    ctx.beginPath();
    ctx.moveTo(cx - rx, topY);
    ctx.lineTo(cx - rx, botY);
    ctx.moveTo(cx + rx, topY);
    ctx.lineTo(cx + rx, botY);
    ctx.stroke();

    // Bottom Ellipse Front (Solid ghost)
    ctx.beginPath();
    ctx.ellipse(cx, botY, rx, ry, 0, 0, Math.PI);
    ctx.stroke();

    // Bottom Ellipse Back (Dashed ghost)
    ctx.save();
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.ellipse(cx, botY, rx, ry, 0, Math.PI, Math.PI * 2);
    ctx.stroke();

    // Axis OO'
    ctx.beginPath();
    ctx.moveTo(cx, topY);
    ctx.lineTo(cx, botY);
    ctx.stroke();
    ctx.restore();
  } else if (template === 'CONE') {
    const rx = Math.min(110, width * 0.26);
    const ry = Math.min(30, rx * 0.28);
    const h = Math.min(190, height * 0.48);
    const apexY = cy - h / 2;
    const botY = cy + h / 2;

    // Generatrices SA, SB
    ctx.beginPath();
    ctx.moveTo(cx, apexY);
    ctx.lineTo(cx - rx, botY);
    ctx.moveTo(cx, apexY);
    ctx.lineTo(cx + rx, botY);
    ctx.stroke();

    // Bottom Front (Solid)
    ctx.beginPath();
    ctx.ellipse(cx, botY, rx, ry, 0, 0, Math.PI);
    ctx.stroke();

    // Bottom Back (Dashed)
    ctx.save();
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.ellipse(cx, botY, rx, ry, 0, Math.PI, Math.PI * 2);
    ctx.stroke();

    // Altitude SO
    ctx.beginPath();
    ctx.moveTo(cx, apexY);
    ctx.lineTo(cx, botY);
    ctx.stroke();

    // Radius OA
    ctx.beginPath();
    ctx.moveTo(cx, botY);
    ctx.lineTo(cx + rx, botY);
    ctx.stroke();
    ctx.restore();
  } else if (template === 'SPHERE') {
    const r = Math.min(100, Math.min(width, height) * 0.28);

    // Outer Circle
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    // Equator Front (Solid)
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, r * 0.32, 0, 0, Math.PI);
    ctx.stroke();

    // Equator Back (Dashed)
    ctx.save();
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, r * 0.32, 0, Math.PI, Math.PI * 2);
    ctx.stroke();

    // Center & Radius
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + r, cy);
    ctx.stroke();
    ctx.restore();
  }
}
