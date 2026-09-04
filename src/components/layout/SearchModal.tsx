import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { MathFormula } from '../common/MathFormula';
import { Search, ArrowRight } from 'lucide-react';
import { RouteId, ShapeType } from '../../types';

interface SearchItem {
  id: string;
  title: string;
  category: string;
  route: RouteId;
  shape?: ShapeType;
  snippet: string;
  latex?: string;
}

const SEARCH_DATABASE: SearchItem[] = [
  {
    id: 's-1',
    title: 'Diện tích xung quanh hình trụ',
    latex: 'S_{xq} = 2\\pi rh',
    category: 'Công thức Hình Trụ',
    route: '/theory',
    shape: 'cylinder',
    snippet: 'Bằng chu vi đường tròn đáy nhân với chiều cao.'
  },
  {
    id: 's-2',
    title: 'Thể tích hình trụ',
    latex: 'V = \\pi r^2 h',
    category: 'Công thức Hình Trụ',
    route: '/theory',
    shape: 'cylinder',
    snippet: 'Bằng diện tích đáy nhân với chiều cao.'
  },
  {
    id: 's-3',
    title: 'Đường sinh hình nón',
    latex: 'l = \\sqrt{h^2 + r^2}',
    category: 'Công thức Hình Nón',
    route: '/theory',
    shape: 'cone',
    snippet: 'Mối liên hệ định lý Pythagore giữa chiều cao, bán kính và đường sinh.'
  },
  {
    id: 's-4',
    title: 'Thể tích hình nón',
    latex: 'V = \\frac{1}{3}\\pi r^2 h',
    category: 'Công thức Hình Nón',
    route: '/theory',
    shape: 'cone',
    snippet: 'Bằng 1/3 thể tích hình trụ có cùng bán kính đáy và chiều cao.'
  },
  {
    id: 's-5',
    title: 'Diện tích mặt cầu',
    latex: 'S = 4\\pi R^2',
    category: 'Công thức Hình Cầu',
    route: '/theory',
    shape: 'sphere',
    snippet: 'Bằng 4 lần diện tích hình tròn lớn.'
  },
  {
    id: 's-6',
    title: 'Thể tích hình cầu',
    latex: 'V = \\frac{4}{3}\\pi R^3',
    category: 'Công thức Hình Cầu',
    route: '/theory',
    shape: 'sphere',
    snippet: 'Thể tích khối cầu bán kính R.'
  },
  {
    id: 's-7',
    title: 'Bài toán nón lá xứ Huế',
    category: 'Ứng dụng thực tế [E]',
    route: '/real-world',
    shape: 'cone',
    snippet: 'Tính diện tích lá lợp mặt nón lá truyền thống và kết cấu nan tre.'
  },
  {
    id: 's-8',
    title: 'Phòng thí nghiệm tương tác 3D Lab',
    category: 'Công nghệ 3D [T]',
    route: '/explore',
    snippet: 'Điều chỉnh bán kính r, chiều cao h, xoay 360°, trải phẳng và mô phỏng rót nước.'
  },
  {
    id: 's-9',
    title: 'Thí nghiệm Archimedes đo thể tích chìm',
    category: 'Khoa học thực nghiệm [S]',
    route: '/explore',
    shape: 'sphere',
    latex: 'V_{cau} = \\frac{2}{3} V_{tru}',
    snippet: 'Thả khối cầu kim loại vào bình trụ nước, đo mực nước dâng chính xác theo tỷ trọng chất lỏng.'
  },
  {
    id: 's-10',
    title: 'Kỹ sư tối ưu hóa vật liệu lon nhôm 330ml',
    category: 'Kỹ thuật tối ưu [E]',
    route: '/real-world',
    shape: 'cylinder',
    latex: 'h = 2r \\approx 7.49\\text{ cm}',
    snippet: 'Dự án kỹ sư nhà máy tính toán diện tích toàn phần cực tiểu để tiết kiệm chi phí và rác thải kim loại.'
  },
  {
    id: 's-11',
    title: 'Bảng vẽ không gian Spatial Sketchpad',
    category: 'Nghệ thuật Origami & Vẽ hình [A]',
    route: '/real-world',
    snippet: 'Bảng vẽ hình học không gian với thước elip đáy, tự động phân biệt nét đứt (khuất) và nét liền (thấy).'
  },
  {
    id: 's-12',
    title: 'Radar quét 4 bẫy kinh điển đề thi vào 10',
    category: 'Toán học thực chiến [M]',
    route: '/practice',
    snippet: 'Cảnh báo 4 bẫy: đường kính d, thùng không nắp, đơn vị dm3 và nhầm lẫn đường sinh l vs chiều cao h.'
  },
  {
    id: 's-13',
    title: 'Video bài giảng thực tế chuẩn SGK',
    category: 'Học liệu video',
    route: '/theory',
    snippet: 'Xem video bài học chính thức tru.mp4, non.mp4, cau.mp4 với các mốc thời gian kiến thức KaTeX.'
  }
];

export const SearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen, navigateTo, setSelectedShape } = useApp();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchOpen]);

  const filteredItems = query.trim()
    ? SEARCH_DATABASE.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.snippet.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()) ||
          (item.latex && item.latex.toLowerCase().includes(query.toLowerCase()))
      )
    : SEARCH_DATABASE.slice(0, 5);

  const handleSelect = (item: SearchItem) => {
    if (item.shape) {
      setSelectedShape(item.shape);
    }
    navigateTo(item.route);
    setSearchOpen(false);
    setQuery('');
  };

  return (
    <Modal
      isOpen={searchOpen}
      onClose={() => {
        setSearchOpen(false);
        setQuery('');
      }}
      size="lg"
      id="search-command-modal"
    >
      <div className="space-y-4">
        {/* Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#A0958B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="search-command-input"
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm công thức, hình học, bài tập..."
            className="w-full pl-11 pr-4 py-3 bg-[#F4EEE4] rounded-xl text-sm text-[#3A302B] placeholder-[#A0958B] focus:bg-[#FFFDF8] focus:outline-none focus:ring-2 focus:ring-[#ED806F] border border-[#E5DCCF]"
          />
        </div>

        {/* Results */}
        <div className="space-y-1 max-h-80 overflow-y-auto">
          <div className="text-[11px] font-bold text-[#A0958B] uppercase tracking-wider px-2 py-1">
            {query.trim() ? `Kết quả (${filteredItems.length})` : 'Gợi ý tìm kiếm phổ biến'}
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-[#A0958B] text-sm">
              Không tìm thấy công thức nào phù hợp với "{query}"
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                id={`search-item-${item.id}`}
                onClick={() => handleSelect(item)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FDF0ED] border border-transparent hover:border-[#F4D2CA] cursor-pointer transition-all group"
              >
                <div className="min-w-0 pr-3 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-[#3A302B] group-hover:text-[#C96859]">
                      {item.title}
                    </span>
                    {item.latex && (
                      <span className="text-xs bg-[#FFFDF8] px-2 py-0.5 rounded border border-[#E5DCCF] text-[#3A302B]">
                        <MathFormula formula={item.latex} />
                      </span>
                    )}
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F4EEE4] text-[#766A61] font-medium">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#766A61] truncate">{item.snippet}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A0958B] group-hover:text-[#ED806F] shrink-0 transition-transform group-hover:translate-x-0.5" />
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};
