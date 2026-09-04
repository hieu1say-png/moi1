/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Theory Learning Layout
 * Master layout combining:
 * 1. 3D Model (60-70% width on desktop)
 * 2. Video Bài Học (30-40% width on desktop)
 * 3. Lý Thuyết / Công Thức / Ví Dụ / Luyện Tập (Full width below)
 *
 * Strict Constraints:
 * - Desktop: 3D on Left, Video on Right.
 * - Mobile: 3D on Top, Video below.
 * - Video is a SIBLING to 3D Canvas (no absolute positioning overlap).
 * - Zero microphone, zero external TTS/audio.
 */

import React from 'react';
import { ShapeType } from '../../types';
import { SHAPE_TO_TOPIC_MAP } from '../../types/theoryVideo';
import { Theory3DPanel } from './Theory3DPanel';
import { TheoryVideoPanel } from './TheoryVideoPanel';

interface TheoryLearningLayoutProps {
  shape: ShapeType;
  children: React.ReactNode;
}

export const TheoryLearningLayout: React.FC<TheoryLearningLayoutProps> = ({ shape, children }) => {
  const topic = SHAPE_TO_TOPIC_MAP[shape];

  return (
    <div id="theory-learning-layout" className="space-y-6 w-full">
      {/* 
        TOP SECTION: 3D MODEL + VIDEO BÀI HỌC
        Desktop: 7 cols (approx 58-60%) for 3D + 5 cols (approx 40-42%) for Video
        Mobile: Stacked 3D then Video
      */}
      <section aria-label="Mô hình 3D và Video bài học" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 3D Model (Left Column) */}
        <div className="lg:col-span-7 xl:col-span-7 w-full">
          <Theory3DPanel shape={shape} className="w-full" />
        </div>

        {/* Video Bài Học (Right Column) */}
        <div className="lg:col-span-5 xl:col-span-5 w-full">
          <TheoryVideoPanel topic={topic} className="w-full" />
        </div>
      </section>

      {/* 
        BOTTOM SECTION: LÝ THUYẾT / CÔNG THỨC / VÍ DỤ / LUYỆN TẬP
      */}
      <section aria-label="Nội dung lý thuyết và bài tập" className="w-full">
        {children}
      </section>
    </div>
  );
};
