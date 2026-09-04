/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GATE 1.1 - CYLINDER LABEL RENDERER COMPONENT
 * Renders independent mathematical labels (O, O', R, h, l) mapped to 3D coordinates.
 * Allows independent clicking, highlight, and visibility toggling.
 */

import React from 'react';
import { CylinderLabelData } from './labelTypes';
import { CylinderComponentKey } from '../geometry/cylinder/cylinderTypes';

export interface CylinderLabelRendererProps {
  labels: CylinderLabelData[];
  onSelectLabel?: (componentKey: CylinderComponentKey) => void;
  activeComponentKey?: string;
  showLabels?: boolean;
}

export const CylinderLabelRenderer: React.FC<CylinderLabelRendererProps> = ({
  labels,
  onSelectLabel,
  activeComponentKey = 'all',
  showLabels = true
}) => {
  if (!showLabels || labels.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
      {labels.map((lbl) => {
        if (!lbl.visible) return null;
        const isHighlighted =
          lbl.highlighted ||
          activeComponentKey === lbl.componentKey ||
          activeComponentKey === 'all';

        return (
          <div
            key={lbl.id}
            style={{
              transform: `translate(${lbl.screenX}px, ${lbl.screenY}px) translate(-50%, -50%)`
            }}
            className="absolute transition-transform duration-75 pointer-events-auto cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (onSelectLabel) {
                onSelectLabel(lbl.componentKey);
              }
            }}
          >
            <div
              className={`group px-2.5 py-1 rounded-xl border backdrop-blur-md transition-all duration-200 flex flex-col items-center justify-center text-center shadow-lg ${
                isHighlighted
                  ? `${lbl.badgeBgClass} ${lbl.badgeBorderClass} ring-2 ring-amber-400/40 scale-105`
                  : 'bg-slate-900/70 border-slate-700/60 opacity-80 hover:opacity-100 hover:scale-105'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-black font-serif italic ${lbl.colorClass}`}>
                  {lbl.symbol}
                </span>
                <span className="text-[11px] font-semibold text-slate-200 font-sans">
                  {lbl.title}
                </span>
              </div>
              {lbl.subtext && (
                <span className="text-[10px] text-slate-300 font-sans font-normal opacity-90 hidden sm:inline-block">
                  {lbl.subtext}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
