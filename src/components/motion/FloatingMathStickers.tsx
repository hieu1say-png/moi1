/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SCALORA DRAGGABLE & PARALLAX STICKY NOTES
 * 4 Pastel Handwritten Sticky Notes:
 * 1. Thẻ Vàng (Pastel Yellow): Hình Trụ (Sxq = 2πrh, V = πr²h)
 * 2. Thẻ Xanh Lá (Pastel Green): Thực nghiệm rót nước 3:1 (V_trụ = 3 × V_nón)
 * 3. Thẻ Đỏ (Pastel Coral/Rose): Cảnh báo bẫy đề thi tuyển sinh vào 10 (nhầm r & d, đổi đơn vị dm³ sang lít)
 * 4. Thẻ Xanh Lam (Pastel Sky): Hình Cầu (S = 4πr², V = 4/3πr³)
 * 
 * Features:
 * - Parallax floating motion tracking mouse
 * - Free drag & drop anywhere on screen (mouse & touch friendly)
 * - Authentic paper washi tape and pin decoration
 * - Reenie Beanie / Caveat handwritten typography
 */

import React, { useState, useRef, useEffect } from 'react';
import { Pin, Eye, EyeOff, RotateCcw } from 'lucide-react';

export interface StickyNoteItem {
  id: string;
  badge: string;
  shape: string;
  tip: string;
  formula: string;
  teacherNote: string;
  speed: number;
  initialXRatio: number; // percentage from left
  initialY: number;      // px from top
  rotation: number;
  bgColor: string;
  borderColor: string;
  tapeColor: string;
  textColor: string;
  tagColor: string;
}

const STICKY_NOTES_CONFIG: StickyNoteItem[] = [
  {
    id: 'note-cylinder',
    badge: 'THẺ VÀNG',
    shape: 'Hình Trụ',
    tip: '💡 Hai đáy là 2 hình tròn song song và bằng nhau!',
    formula: 'S_xq = 2πrh   |   V = πr²h',
    teacherNote: '— Nhớ cộng 2 đáy khi tính diện tích toàn phần S_tp!',
    speed: -0.035,
    initialXRatio: 0.02, // left side
    initialY: 120,
    rotation: -3.5,
    bgColor: 'bg-[#FEF9C3]', // Pastel Yellow
    borderColor: 'border-[#FEF08A]',
    tapeColor: 'bg-amber-300/80',
    textColor: 'text-amber-950',
    tagColor: 'bg-amber-100 text-amber-900 border-amber-300/60',
  },
  {
    id: 'note-water-experiment',
    badge: 'THẺ XANH LÁ',
    shape: 'Thực Nghiệm 3:1',
    tip: '🧪 Rót đúng 3 nón nước đầy thì đầy 1 hình trụ cùng đáy & cao!',
    formula: 'V_trụ = 3 × V_nón   (V_nón = ⅓ V_trụ)',
    teacherNote: '— Thầy Hiếu: Định lý thực nghiệm kinh điển của Archimedes!',
    speed: 0.04,
    initialXRatio: 0.02, // left side lower
    initialY: 340,
    rotation: 4.2,
    bgColor: 'bg-[#DCFCE7]', // Pastel Green
    borderColor: 'border-[#BBF7D0]',
    tapeColor: 'bg-emerald-300/80',
    textColor: 'text-emerald-950',
    tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-300/60',
  },
  {
    id: 'note-exam-trap',
    badge: 'THẺ ĐỎ',
    shape: 'Bẫy Đề Thi Vào 10',
    tip: '⚠️ Đề hay cho ĐƯỜNG KÍNH d, nhớ chia 2 lấy bán kính r!',
    formula: 'd = 2r ➔ r = d/2  |  1 dm³ = 1 lít',
    teacherNote: '— Cẩn thận: 1 m³ = 1000 lít = 1.000.000 cm³.',
    speed: -0.045,
    initialXRatio: 0.82, // right side
    initialY: 130,
    rotation: 2.8,
    bgColor: 'bg-[#FFE4E6]', // Pastel Coral / Red
    borderColor: 'border-[#FECDD3]',
    tapeColor: 'bg-rose-300/80',
    textColor: 'text-rose-950',
    tagColor: 'bg-rose-100 text-rose-900 border-rose-300/60',
  },
  {
    id: 'note-sphere',
    badge: 'THẺ XANH LAM',
    shape: 'Hình Cầu',
    tip: '🌐 Cắt bởi mặt phẳng qua tâm tạo hình tròn lớn có bán kính R!',
    formula: 'S = 4πr²   |   V = ⁴⁄₃πr³',
    teacherNote: '— Thể tích có luỹ thừa bậc 3 (r³), diện tích là (r²).',
    speed: 0.05,
    initialXRatio: 0.82, // right side lower
    initialY: 350,
    rotation: -3.2,
    bgColor: 'bg-[#E0F2FE]', // Pastel Sky Blue
    borderColor: 'border-[#BAE6FD]',
    tapeColor: 'bg-sky-300/80',
    textColor: 'text-sky-950',
    tagColor: 'bg-sky-100 text-sky-900 border-sky-300/60',
  },
];

export const FloatingMathStickers: React.FC = () => {
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize positions on client mount
  const resetPositions = () => {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;
    const isSmall = w < 1024;
    setIsMobile(isSmall);

    const init: Record<string, { x: number; y: number }> = {};
    STICKY_NOTES_CONFIG.forEach((n) => {
      let calcX = Math.round(w * n.initialXRatio);
      // Bound checking so cards don't spawn offscreen
      if (calcX + 240 > w) {
        calcX = Math.max(12, w - 255);
      }
      init[n.id] = { x: calcX, y: n.initialY };
    });
    setPositions(init);
  };

  useEffect(() => {
    resetPositions();

    const handleResize = () => {
      resetPositions();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMouseOffset({
        x: (e.clientX - cx) * 0.35,
        y: (e.clientY - cy) * 0.35,
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Dragging event listeners on window
  useEffect(() => {
    if (!draggingId) return;

    const handleMove = (clientX: number, clientY: number) => {
      setPositions((prev) => ({
        ...prev,
        [draggingId]: {
          x: Math.max(8, Math.min(window.innerWidth - 250, clientX - dragOffset.current.x)),
          y: Math.max(60, Math.min(window.innerHeight - 150, clientY - dragOffset.current.y)),
        },
      }));
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleEnd = () => {
      setDraggingId(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [draggingId]);

  const handleMouseDown = (id: string, e: React.MouseEvent) => {
    // Avoid interfering with interactive buttons inside if any
    setDraggingId(id);
    const pos = positions[id] || { x: 20, y: 120 };
    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  const handleTouchStart = (id: string, e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setDraggingId(id);
      const pos = positions[id] || { x: 20, y: 120 };
      dragOffset.current = {
        x: e.touches[0].clientX - pos.x,
        y: e.touches[0].clientY - pos.y,
      };
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      {/* Floating Control Pill in Bottom Left */}
      <div className="absolute bottom-5 left-5 pointer-events-auto flex items-center gap-2">
        <button
          type="button"
          onClick={() => setHidden(!hidden)}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#0F291E]/15 text-xs font-semibold text-[#0F291E] shadow-xs hover:shadow-md hover:bg-emerald-50 transition-all duration-200 cursor-pointer"
          title="Bật/Tắt 4 thẻ ghi chú dán tường tương tác (Kéo thả & Parallax)"
        >
          {hidden ? (
            <>
              <Eye className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span>Hiện 4 Thẻ Nhớ Dán Tường</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3.5 h-3.5 text-slate-500 group-hover:scale-110 transition-transform" />
              <span>Ẩn Thẻ Nhớ</span>
            </>
          )}
        </button>

        {!hidden && (
          <button
            type="button"
            onClick={resetPositions}
            className="flex items-center justify-center p-2 rounded-full bg-white/95 backdrop-blur-md border border-[#0F291E]/15 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 shadow-xs hover:shadow-md transition-all cursor-pointer"
            title="Sắp xếp lại vị trí 4 thẻ"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {!hidden &&
        STICKY_NOTES_CONFIG.map((note) => {
          const pos = positions[note.id] || { x: 20, y: note.initialY };
          const isDragging = draggingId === note.id;

          // Parallax calculation: only on desktop when not dragging
          const px = isDragging || isMobile ? 0 : mouseOffset.x * note.speed;
          const py = isDragging || isMobile ? 0 : mouseOffset.y * note.speed;

          return (
            <div
              key={note.id}
              data-speed={note.speed}
              onMouseDown={(e) => handleMouseDown(note.id, e)}
              onTouchStart={(e) => handleTouchStart(note.id, e)}
              style={{
                transform: `
                  translate3d(${pos.x + px}px, ${pos.y + py}px, 0)
                  rotate(${isDragging ? 0 : note.rotation}deg)
                  scale(${isDragging ? 1.05 : 1})
                `,
                transition: isDragging
                  ? 'box-shadow 120ms ease'
                  : 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 250ms ease',
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
              className={`
                sticky-note absolute pointer-events-auto select-none will-change-transform
                w-[245px] p-3.5 rounded-sm border ${note.bgColor} ${note.borderColor} ${note.textColor}
                ${isDragging ? 'shadow-2xl ring-2 ring-emerald-500/50 z-50' : 'hover:shadow-xl hover:rotate-0 transition-all duration-200'}
              `}
            >
              {/* Paper Washi Tape on top with natural tilt */}
              <div
                className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 ${note.tapeColor} backdrop-blur-xs border border-black/5 rotate-1 shadow-2xs pointer-events-none`}
              />

              {/* Header with Pin & Badge */}
              <div className="flex items-center justify-between mb-1.5 pt-1">
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${note.tagColor}`}>
                  {note.shape}
                </span>
                <Pin className="w-3.5 h-3.5 opacity-50 hover:opacity-100 transition-opacity" />
              </div>

              {/* Handwritten Note (Reenie Beanie font) */}
              <div className="font-reenie text-xl sm:text-2xl leading-snug font-bold mb-1 tracking-wide">
                {note.tip}
              </div>

              {/* Formula Callout Block */}
              <div className="px-2.5 py-1.5 rounded-md bg-white/80 border border-black/5 font-mono text-xs font-bold tracking-tight text-center mb-1.5 shadow-2xs">
                {note.formula}
              </div>

              {/* Teacher Postscript (Caveat handwriting) */}
              <div className="font-handwriting text-xs leading-relaxed opacity-85 italic text-right">
                {note.teacherNote}
              </div>
            </div>
          );
        })}
    </div>
  );
};
