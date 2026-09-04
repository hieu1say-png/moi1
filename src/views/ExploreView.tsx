/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * PROMPT 08 & ADVANCED 3D GEOMETRY SUITE
 * 1. 3D Interactive Explore (Khám phá 3D)
 * 2. Net / Unfolding Mode ([KHAI TRIỂN]): Hình trụ → tách đáy → mở mặt xung quanh → HCN (2πr × h) + 2 hình tròn đáy (r).
 *    Công thức: Sxq = 2πrh, Stp = 2πrh + 2πr²
 *    Controls: Bắt đầu, Tạm dừng, Chơi lại, Đặt lại.
 * 3. Math Experiment (Thực nghiệm toán học): Thay đổi r, h trong thời gian thực.
 *    Cập nhật đồng thời: geometry, labels, volume (V = πr²h), surface area (Sxq, Stp).
 * 4. Misconception Buster ("Hình trụ có l = h?"): Animation so sánh độ dài AB = l và OO' = h qua hình chữ nhật thiết diện OO'BA.
 *    Cuối animation kết luận: l = h.
 */

import React, { useState, useMemo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { useLearningContext } from '../context/LearningContext';
import { ShapeType } from '../types';
import { SHAPES_DATA } from '../data/geometryData';
import { ExplorationModeType } from '../components/explore/3d/CylinderModel';

// Explore Sub-components
import { ShapeSelector } from '../components/explore/ShapeSelector';
import { ThreeDViewer } from '../components/explore/ThreeDViewer';
import { ComponentSelector } from '../components/explore/ComponentSelector';
import { InfoPanel } from '../components/explore/InfoPanel';
import { ActionToolbar } from '../components/explore/ActionToolbar';
import { AIExploreWidget } from '../components/explore/AIExploreWidget';
import { VisualIllusionPuzzle } from '../components/explore/VisualIllusionPuzzle';
import { ConeCreationMode } from '../components/explore/3d/cone-creation/ConeCreationMode';
import { SphereCreationMode } from '../components/explore/3d/sphere-creation/SphereCreationMode';
import { RevolvingGenerator } from '../components/explore/3d/RevolvingGenerator';
import { ArchimedesImmersionLab } from '../components/explore/3d/ArchimedesImmersionLab';

// Non-Obstructive 3D HUD Suite
import { NonObstructive3DLayout } from '../components/explore/hud/NonObstructive3DLayout';
import { NetUnfoldingHUD } from '../components/explore/hud/NetUnfoldingHUD';
import { FormationHUD } from '../components/explore/hud/FormationHUD';
import { SphereSectionHUD } from '../components/explore/hud/SphereSectionHUD';
import { SphereMisconceptionHUD } from '../components/explore/hud/SphereMisconceptionHUD';
import { SphereVolumeCompareHUD } from '../components/explore/hud/SphereVolumeCompareHUD';
import { GeometryChallengeHUD } from '../components/explore/hud/GeometryChallengeHUD';

// Pedagogical & Resilience Modals
import { ThreeErrorBoundary } from '../components/explore/ThreeErrorBoundary';
import { MyMathematicalModelModal } from '../components/explore/MyMathematicalModelModal';
import { WaterPouringExplanationModal } from '../components/explore/WaterPouringExplanationModal';
import { FocusModeToggle } from '../components/common/FocusModeToggle';
import { Printer, FileSpreadsheet, Sparkles } from 'lucide-react';

export const ExploreView: React.FC = () => {
  const { selectedShape, setSelectedShape, markShapeExplored, userStats } = useApp();
  const { showSuccess, showInfo } = useToast();
  const { updateContext } = useLearningContext();

  // 3D Geometric Parameter State (Preserved without distortion)
  const [radius, setRadius] = useState<number>(() => (selectedShape === 'cone' ? 2 : 4));
  const [height, setHeight] = useState<number>(() => (selectedShape === 'cone' ? 4 : 8));
  const [activeComponentId, setActiveComponentId] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'solid' | 'wireframe' | 'cross-section'>('solid');
  const [showAxes, setShowAxes] = useState<boolean>(true);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [explorationMode, setExplorationMode] = useState<ExplorationModeType>('explore');

  // Mode HUD specific states
  const [unfoldProgress, setUnfoldProgress] = useState<number>(0);
  const [isUnfoldPlaying, setIsUnfoldPlaying] = useState<boolean>(false);
  const [isUnfoldCompleted, setIsUnfoldCompleted] = useState<boolean>(false);
  const [formationAngle, setFormationAngle] = useState<number>(0);
  const [isFormationPlaying, setIsFormationPlaying] = useState<boolean>(false);
  const [isFormationCompleted, setIsFormationCompleted] = useState<boolean>(false);
  const [sectionDistance, setSectionDistance] = useState<number>(0);

  // Pedagogical & Focus Modals
  const [isModelModalOpen, setIsModelModalOpen] = useState<boolean>(false);
  const [isWaterPourModalOpen, setIsWaterPourModalOpen] = useState<boolean>(false);
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const [showCircumscribedCylinder, setShowCircumscribedCylinder] = useState<boolean>(false);

  const isExplored = userStats.exploredShapes.includes(selectedShape);

  // Compute live geometric formulas
  const calculations = useMemo(() => {
    const pi = Math.PI;
    const r = radius;
    const h = height;

    if (selectedShape === 'cylinder') {
      const sxq = 2 * pi * r * h;
      const stp = 2 * pi * r * h + 2 * pi * r * r;
      const v = pi * r * r * h;
      return {
        slantHeight: h,
        sxq: sxq.toFixed(2),
        stp: stp.toFixed(2),
        v: v.toFixed(2),
        baseArea: (pi * r * r).toFixed(2),
        sxqPi: (2 * r * h).toFixed(1),
        vPi: (r * r * h).toFixed(1)
      };
    } else if (selectedShape === 'cone') {
      const l = Math.sqrt(r * r + h * h);
      const sxq = pi * r * l;
      const stp = pi * r * l + pi * r * r;
      const v = (1 / 3) * pi * r * r * h;
      return {
        slantHeight: l.toFixed(2),
        sxq: sxq.toFixed(2),
        stp: stp.toFixed(2),
        v: v.toFixed(2),
        baseArea: (pi * r * r).toFixed(2),
        sxqPi: (r * l).toFixed(1),
        vPi: (((1 / 3) * r * r * h)).toFixed(1)
      };
    } else {
      // Sphere
      const s = 4 * pi * r * r;
      const v = (4 / 3) * pi * Math.pow(r, 3);
      return {
        slantHeight: r,
        sxq: s.toFixed(2),
        stp: s.toFixed(2),
        v: v.toFixed(2),
        baseArea: (pi * r * r).toFixed(2),
        sxqPi: (4 * r * r).toFixed(1),
        vPi: (((4 / 3) * Math.pow(r, 3))).toFixed(1)
      };
    }
  }, [selectedShape, radius, height]);

  const handleSpin360 = useCallback(() => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, 1700);
  }, []);

  // Handler functions
  const handleShapeChange = (shape: ShapeType) => {
    setSelectedShape(shape);
    setActiveComponentId('all');
    setExplorationMode('explore');
    if (shape === 'cone') {
      setRadius(2);
      setHeight(4);
    } else if (shape === 'cylinder') {
      setRadius(4);
      setHeight(8);
    } else if (shape === 'sphere') {
      setRadius(4);
    }

    updateContext({
      currentShape: shape,
      learningPhase: 'EXPLORE',
      activeHighlightTarget: null,
      lastAction: 'CHANGE_SHAPE'
    });
  };

  const handleResetReplay = useCallback(() => {
    setIsAutoRotating(false);
    handleSpin360();
    showInfo('Đã thiết lập lại góc nhìn và phát lại chuyển động quay 360°');
  }, [handleSpin360, showInfo]);

  const handleResetView = () => {
    if (selectedShape === 'cone') {
      setRadius(2);
      setHeight(4);
      showInfo('Đã đặt lại thông số về mặc định (r = 2cm, h = 4cm)');
    } else if (selectedShape === 'sphere') {
      setRadius(4);
      showInfo('Đã đặt lại thông số về mặc định (R = 4cm)');
    } else {
      setRadius(4);
      setHeight(8);
      showInfo('Đã đặt lại thông số về mặc định (r = 4cm, h = 8cm)');
    }
    setIsAutoRotating(false);
    setActiveComponentId('all');
  };

  const handleSaveExploration = () => {
    markShapeExplored(selectedShape);
    showSuccess(
      'Lưu thành công!',
      `Đã ghi nhận khám phá mô hình ${SHAPES_DATA[selectedShape].vietnameseName} (+30 XP)`
    );
  };

  const handleFormationComplete = useCallback((message: string) => {
    showSuccess('Tạo thành công hình trụ!', message);
  }, [showSuccess]);

  const handleUnfoldComplete = useCallback((message: string) => {
    showSuccess('Khai triển thành công!', message);
  }, [showSuccess]);

  const renderDockedHUD = () => {
    if (explorationMode === 'net' && selectedShape === 'cylinder') {
      return (
        <NetUnfoldingHUD
          radius={radius}
          height={height}
          unfoldProgress={unfoldProgress}
          isPlaying={isUnfoldPlaying}
          isCompleted={isUnfoldCompleted}
          onStart={() => setIsUnfoldPlaying(true)}
          onPause={() => setIsUnfoldPlaying(false)}
          onReplay={() => {
            setUnfoldProgress(0);
            setIsUnfoldCompleted(false);
            setIsUnfoldPlaying(true);
          }}
          onReset={() => {
            setUnfoldProgress(0);
            setIsUnfoldPlaying(false);
            setIsUnfoldCompleted(false);
          }}
          onProgressChange={setUnfoldProgress}
        />
      );
    }

    if (explorationMode === 'formation' && selectedShape === 'cylinder') {
      return (
        <FormationHUD
          shape="cylinder"
          radius={radius}
          formationAngle={formationAngle}
          isPlaying={isFormationPlaying}
          isCompleted={isFormationCompleted}
          onStart={() => setIsFormationPlaying(true)}
          onPause={() => setIsFormationPlaying(false)}
          onReplay={() => {
            setFormationAngle(0);
            setIsFormationCompleted(false);
            setIsFormationPlaying(true);
          }}
          onReset={() => {
            setFormationAngle(0);
            setIsFormationPlaying(false);
            setIsFormationCompleted(false);
          }}
          onAngleChange={setFormationAngle}
        />
      );
    }

    if (explorationMode === 'section' && selectedShape === 'sphere') {
      return (
        <SphereSectionHUD
          radius={radius}
          sectionDistance={sectionDistance}
          onSectionDistanceChange={setSectionDistance}
        />
      );
    }

    if (explorationMode === 'misconception' && selectedShape === 'sphere') {
      return (
        <SphereMisconceptionHUD
          radius={radius}
        />
      );
    }

    if (explorationMode === 'volume_compare' && selectedShape === 'sphere') {
      return (
        <SphereVolumeCompareHUD
          radius={radius}
          showCircumscribedCylinder={showCircumscribedCylinder}
          onToggleCircumscribedCylinder={setShowCircumscribedCylinder}
        />
      );
    }

    if (explorationMode === 'challenge') {
      return (
        <GeometryChallengeHUD
          shape={selectedShape}
          onSyncModelParams={(r, h) => {
            setRadius(r);
            if (h !== undefined) setHeight(h);
          }}
        />
      );
    }

    // Default 'explore' or component exploration: dock ComponentSelector
    return (
      <ComponentSelector
        shape={selectedShape}
        activeComponentId={activeComponentId}
        onSelectComponent={setActiveComponentId}
      />
    );
  };

  const isRevolvingFormation = explorationMode === 'formation';
  const isSphereArchimedesLab = selectedShape === 'sphere' && explorationMode === 'volume_compare';
  const isConeVolumeParadox = selectedShape === 'cone' && (explorationMode === 'liquid' || explorationMode === 'volume_compare');
  const isConeNet = selectedShape === 'cone' && explorationMode === 'net';

  return (
    <div id="view-explore-page" className="space-y-4 sm:space-y-6 w-full mx-auto overflow-x-hidden">
      {/* 1. ShapeSelector Component */}
      <ShapeSelector
        selectedShape={selectedShape}
        onSelectShape={handleShapeChange}
      />

      {/* ActionToolbar placed on top for easy access across all shapes & modes */}
      <ActionToolbar
        shape={selectedShape}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showAxes={showAxes}
        onToggleAxes={() => setShowAxes(!showAxes)}
        isAutoRotating={isAutoRotating}
        onToggleAutoRotate={() => setIsAutoRotating(!isAutoRotating)}
        onSpin360={handleSpin360}
        isSpinning={isSpinning}
        onResetReplay={handleResetReplay}
        onResetView={handleResetView}
        isExplored={isExplored}
        onSaveExploration={handleSaveExploration}
        explorationMode={explorationMode}
        onExplorationModeChange={setExplorationMode}
      />

      {/* Quick Pedagogical Bar & Focus Mode */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsModelModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs shadow-orange-600/20 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Mô hình toán học của tôi (In / Xuất PDF)</span>
          </button>

          {selectedShape === 'cone' && (
            <button
              type="button"
              onClick={() => setIsWaterPourModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Nghịch lý rót nước 1/3 (Thầy Hiếu)</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <FocusModeToggle
            isFocusMode={isFocusMode}
            onToggle={setIsFocusMode}
          />
        </div>
      </div>

      {isRevolvingFormation ? (
        /* Full-width 360° Revolving Geometry Generator for all shapes */
        <div className="w-full">
          <RevolvingGenerator
            initialShape={selectedShape}
            initialRadius={radius}
            initialHeight={height}
            onFormationComplete={handleFormationComplete}
          />
        </div>
      ) : isSphereArchimedesLab ? (
        /* Full-width Archimedes Immersion Lab for Sphere Volume Comparison */
        <div className="w-full">
          <ArchimedesImmersionLab
            initialRadius={radius}
          />
        </div>
      ) : isConeVolumeParadox ? (
        /* Full-width VolumeParadoxLab for Cone Mode 3 — Thực tế */
        <div className="w-full">
          <ThreeErrorBoundary
            shapeName={SHAPES_DATA[selectedShape].vietnameseName}
            radius={radius}
            height={height}
          >
            <ThreeDViewer
              shape={selectedShape}
              radius={radius}
              height={height}
              onRadiusChange={setRadius}
              onHeightChange={setHeight}
              viewMode={viewMode}
              showAxes={showAxes}
              isAutoRotating={isAutoRotating}
              onToggleAutoRotate={() => setIsAutoRotating(!isAutoRotating)}
              onSpin360={handleSpin360}
              isSpinning={isSpinning}
              onResetReplay={handleResetReplay}
              activeComponentId={activeComponentId}
              onSelectComponent={setActiveComponentId}
              explorationMode={explorationMode}
              onExplorationModeChange={setExplorationMode}
              onFormationComplete={handleFormationComplete}
              onUnfoldComplete={handleUnfoldComplete}
            />
          </ThreeErrorBoundary>
        </div>
      ) : isConeNet ? (
        /* Full-width Cone Creation & Unfolding Experience (8 cols 3D Stage + 4 cols Interactive Steps) */
        <div className="w-full">
          <ConeCreationMode
            radius={radius}
            height={height}
            onRadiusChange={setRadius}
            onHeightChange={setHeight}
            onFormationComplete={handleFormationComplete}
          />
        </div>
      ) : (
        /* 3. Non-Obstructive 3D Layout (>90% Unobstructed WebGL Canvas + Outside Docked HUD) */
        <NonObstructive3DLayout
          canvas={
            <ThreeErrorBoundary
              shapeName={SHAPES_DATA[selectedShape].vietnameseName}
              radius={radius}
              height={height}
            >
              <ThreeDViewer
                shape={selectedShape}
                radius={radius}
                height={height}
                onRadiusChange={setRadius}
                onHeightChange={setHeight}
                viewMode={viewMode}
                showAxes={showAxes}
                isAutoRotating={isAutoRotating}
                onToggleAutoRotate={() => setIsAutoRotating(!isAutoRotating)}
                onSpin360={handleSpin360}
                isSpinning={isSpinning}
                onResetReplay={handleResetReplay}
                activeComponentId={activeComponentId}
                onSelectComponent={setActiveComponentId}
                explorationMode={explorationMode}
                onExplorationModeChange={setExplorationMode}
                onFormationComplete={handleFormationComplete}
                onUnfoldComplete={handleUnfoldComplete}
              />
            </ThreeErrorBoundary>
          }
          dockedHUD={renderDockedHUD()}
          sidebar={
            <>
              {/* InfoPanel: Live parameters & Instant Formula calculation results */}
              <InfoPanel
                shape={selectedShape}
                activeComponentId={activeComponentId}
                radius={radius}
                height={height}
                onRadiusChange={setRadius}
                onHeightChange={setHeight}
                onSelectComponent={setActiveComponentId}
                calculations={calculations}
              />

              {/* AIExploreWidget: Contextual AI Assistant for active 3D model */}
              <AIExploreWidget
                shape={selectedShape}
                activeComponentId={activeComponentId}
              />
            </>
          }
        />
      )}

      {/* Special Pedagogical Visual Illusion Puzzle for Cylinder */}
      {selectedShape === 'cylinder' && (
        <div className="pt-2">
          <VisualIllusionPuzzle />
        </div>
      )}

      {/* My Mathematical Model & PDF Modal */}
      <MyMathematicalModelModal
        isOpen={isModelModalOpen}
        onClose={() => setIsModelModalOpen(false)}
        shapeType={selectedShape}
        radius={radius}
        height={height}
        calculations={calculations}
      />

      {/* Water Pouring Socratic Reflection Modal */}
      <WaterPouringExplanationModal
        isOpen={isWaterPourModalOpen}
        onClose={() => setIsWaterPourModalOpen(false)}
        onVerified={() => {
          showSuccess('Xuất sắc!', 'Đã mở khóa huy hiệu Hiểu sâu tỷ lệ thể tích 1/3 (+50 XP)');
        }}
      />
    </div>
  );
};

export default ExploreView;
