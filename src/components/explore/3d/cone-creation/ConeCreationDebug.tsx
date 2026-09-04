/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * CREATION DEBUG PANEL FOR CONE ROTATION SWEEP
 */

import React from 'react';
import { ConeRotationPhase } from './coneCreationTypes';

export interface ConeCreationDebugProps {
  phase: ConeRotationPhase;
  stepNumber: number;
  r: number;
  h: number;
  l: number;
  sweepAngleDeg: number;
  isOpen: boolean;
  onToggle: () => void;
}

export const ConeCreationDebug: React.FC<ConeCreationDebugProps> = ({
  phase,
  stepNumber,
  r,
  h,
  l,
  sweepAngleDeg,
  isOpen,
  onToggle
}) => {
  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className="fixed bottom-3 left-3 z-50 px-2 py-1 text-[10px] font-mono font-bold bg-slate-900/80 hover:bg-slate-900 text-amber-300 rounded border border-slate-700 shadow-sm backdrop-blur-md cursor-pointer"
      >
        DEBUG: {phase} ({stepNumber}/8)
      </button>
    );
  }

  return (
    <div className="fixed bottom-3 left-3 z-50 w-72 bg-slate-900/95 text-slate-100 p-3 rounded-xl border border-slate-700 shadow-xl font-mono text-[11px] backdrop-blur-md">
      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-700">
        <span className="font-bold text-amber-400">CONE SWEEP DEBUG</span>
        <button
          type="button"
          onClick={onToggle}
          className="text-slate-400 hover:text-white px-1 font-bold cursor-pointer"
        >
          ✕
        </button>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-slate-400">Phase:</span>
          <span className="font-bold text-orange-400">{phase}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Step:</span>
          <span className="font-bold text-white">{stepNumber}/8</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">r (OA):</span>
          <span className="text-emerald-400 font-bold">{r} cm</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">h (OS):</span>
          <span className="text-amber-400 font-bold">{h} cm</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">l (SA):</span>
          <span className="text-purple-400 font-bold">{l.toFixed(3)} cm</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">θ (Sweep Angle):</span>
          <span className="text-cyan-400 font-bold">{sweepAngleDeg.toFixed(1)}°</span>
        </div>
      </div>
    </div>
  );
};
