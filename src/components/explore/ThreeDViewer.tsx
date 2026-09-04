/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * THREE.JS 3D VIEWER CONTAINER
 * - Renders reusable CylinderModel (Real Three.js WebGL Geometry)
 * - Viewport framing: 70–80% viewport fill, centered, zero clipping
 * - Responsive layout, touch gestures on mobile
 * - Supports:
 *   1. Khám phá 3D (3D Interactive Explore)
 *   2. Khai triển hình trụ (Net / Unfolding)
 *   3. Sự tạo thành (Formation Animation 0° → 360°)
 *   4. Mô phỏng rót nước & Thể tích (Liquid Simulation)
 *   5. Thử thách trắc nghiệm Toán 9 (Geometry Challenge)
 */

import React from 'react';
import { ShapeType } from '../../types';
import { CylinderModel, ExplorationModeType } from './3d/CylinderModel';
import { SphereModel } from './3d/SphereModel';
import { ConeModel } from './3d/ConeModel';
import { LiquidSimulation } from './3d/LiquidSimulation';
import { VolumeParadoxLab } from '../real-world/VolumeParadoxLab';

export interface ThreeDViewerProps {
  shape: ShapeType;
  radius: number;
  height: number;
  onRadiusChange?: (r: number) => void;
  onHeightChange?: (h: number) => void;
  viewMode: 'solid' | 'wireframe' | 'cross-section';
  showAxes: boolean;
  isAutoRotating: boolean;
  onToggleAutoRotate?: () => void;
  onSpin360?: () => void;
  isSpinning?: boolean;
  onResetReplay?: () => void;
  activeComponentId?: string;
  onSelectComponent?: (id: string) => void;
  onParameterChange?: (r: number, h: number) => void;
  explorationMode?: ExplorationModeType;
  onExplorationModeChange?: (mode: ExplorationModeType) => void;
  onFormationComplete?: (msg: string) => void;
  onUnfoldComplete?: (msg: string) => void;
  children?: React.ReactNode;
}

export const ThreeDViewer: React.FC<ThreeDViewerProps> = ({
  shape,
  radius,
  height,
  onRadiusChange,
  onHeightChange,
  viewMode,
  showAxes,
  isAutoRotating,
  onToggleAutoRotate,
  onSpin360,
  isSpinning,
  onResetReplay,
  activeComponentId,
  onSelectComponent,
  explorationMode = 'explore',
  onExplorationModeChange,
  onFormationComplete,
  onUnfoldComplete,
  children
}) => {
  // Liquid Simulation Mode for Cylinder
  if (shape === 'cylinder' && explorationMode === 'liquid') {
    return (
      <div
        id="three-d-viewer-container"
        className="relative w-full rounded-2xl sm:rounded-3xl bg-[#F8FAFC] border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between"
      >
        <LiquidSimulation
          initialRadius={radius}
          initialHeight={height}
          autoPlay={false}
          className="w-full h-full"
        />
        {/* Child overlays */}
        {children}
      </div>
    );
  }

  // Volume Paradox Lab Mode for Cone (Nghịch lý 1/3: Bí ẩn thể tích)
  if (shape === 'cone' && (explorationMode === 'liquid' || explorationMode === 'volume_compare')) {
    return (
      <div
        id="three-d-viewer-container"
        className="relative w-full rounded-2xl sm:rounded-3xl bg-[#F8FAFC] border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between p-2 sm:p-4"
      >
        <VolumeParadoxLab
          className="w-full h-full"
        />
        {/* Child overlays */}
        {children}
      </div>
    );
  }

  return (
    <div
      id="three-d-viewer-container"
      className="relative w-full min-h-[460px] sm:min-h-[520px] lg:min-h-[620px] rounded-2xl sm:rounded-3xl bg-[#F8FAFC] border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between"
    >
      {/* REAL THREE.JS GEOMETRY RENDERER */}
      {shape === 'cylinder' ? (
        <CylinderModel
          radius={radius}
          height={height}
          onRadiusChange={onRadiusChange}
          onHeightChange={onHeightChange}
          viewMode={viewMode}
          showAxes={showAxes}
          isAutoRotating={isAutoRotating}
          onToggleAutoRotate={onToggleAutoRotate}
          onSpin360={onSpin360}
          isSpinning={isSpinning}
          onResetReplay={onResetReplay}
          activeComponentId={activeComponentId}
          onSelectComponent={onSelectComponent}
          explorationMode={explorationMode}
          onExplorationModeChange={onExplorationModeChange}
          onFormationComplete={onFormationComplete}
          onUnfoldComplete={onUnfoldComplete}
          className="w-full h-full"
        />
      ) : shape === 'sphere' ? (
        <SphereModel
          radius={radius}
          onRadiusChange={onRadiusChange}
          viewMode={viewMode}
          showAxes={showAxes}
          isAutoRotating={isAutoRotating}
          onToggleAutoRotate={onToggleAutoRotate}
          onSpin360={onSpin360}
          isSpinning={isSpinning}
          onResetReplay={onResetReplay}
          activeComponentId={activeComponentId}
          onSelectComponent={onSelectComponent}
          explorationMode={explorationMode}
          onExplorationModeChange={onExplorationModeChange}
          onFormationComplete={onFormationComplete}
          className="w-full h-full"
        />
      ) : (
        /* Real 3D Cone Model */
        <ConeModel
          radius={radius}
          height={height}
          onRadiusChange={onRadiusChange}
          onHeightChange={onHeightChange}
          viewMode={viewMode}
          showAxes={showAxes}
          isAutoRotating={isAutoRotating}
          onToggleAutoRotate={onToggleAutoRotate}
          onSpin360={onSpin360}
          isSpinning={isSpinning}
          onResetReplay={onResetReplay}
          activeComponentId={activeComponentId}
          onSelectComponent={onSelectComponent}
          explorationMode={explorationMode}
          onExplorationModeChange={onExplorationModeChange}
          onFormationComplete={onFormationComplete}
          onUnfoldComplete={onUnfoldComplete}
          className="w-full h-full"
        />
      )}

      {/* Render optional child overlays if any */}
      {children}
    </div>
  );
};

export default ThreeDViewer;
