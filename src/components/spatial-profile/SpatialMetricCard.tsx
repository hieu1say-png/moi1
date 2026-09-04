/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SPATIAL METRIC CARD & PROGRESS RINGS
 * Renders the 8 spatial dimensions with subtle humane color bands.
 */

import React from 'react';
import { SpatialMetricKey, ScoreTier } from '../../types/spatialProfile';
import {
  SPATIAL_METRIC_CONFIG,
  getScoreTier,
  getTierLabel,
  getTierColor
} from '../../stores/useSpatialProfileStore';
import {
  Layers,
  Compass,
  Ruler,
  RotateCw,
  Scissors,
  Box,
  BrainCircuit,
  Award
} from 'lucide-react';

export interface SpatialMetricCardProps {
  metricKey: SpatialMetricKey;
  score: number;
  showDetails?: boolean;
  className?: string;
}

export const SpatialMetricCard: React.FC<SpatialMetricCardProps> = ({
  metricKey,
  score,
  showDetails = true,
  className = ''
}) => {
  const config = SPATIAL_METRIC_CONFIG[metricKey];
  const tier = getScoreTier(score);
  const tierLabel = getTierLabel(tier);
  const colors = getTierColor(tier);

  const getIcon = () => {
    switch (metricKey) {
      case 'shapeRecognition':
        return <Layers className="w-4 h-4 text-orange-600" />;
      case 'spatialOrientation':
        return <Compass className="w-4 h-4 text-sky-600" />;
      case 'elementIdentification':
        return <Ruler className="w-4 h-4 text-amber-600" />;
      case 'spatialTransformation':
        return <Scissors className="w-4 h-4 text-emerald-600" />;
      case 'twoDToThreeD':
        return <Box className="w-4 h-4 text-indigo-600" />;
      case 'threeDToTwoD':
        return <RotateCw className="w-4 h-4 text-purple-600" />;
      case 'mathematicalModeling':
        return <BrainCircuit className="w-4 h-4 text-teal-600" />;
      case 'problemSolving':
        return <Award className="w-4 h-4 text-amber-600" />;
    }
  };

  // SVG Progress Ring calculations
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div
      id={`metric-card-${metricKey}`}
      className={`p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left Info */}
        <div className="flex items-start gap-2.5 min-w-0">
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
            {getIcon()}
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
              {config.label}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colors.badge}`}>
                {tierLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Right Progress Ring */}
        <div className="relative flex items-center justify-center shrink-0 w-14 h-14">
          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 54 54">
            <circle
              cx="27"
              cy="27"
              r={radius}
              className="stroke-slate-100"
              strokeWidth="4.5"
              fill="none"
            />
            <circle
              cx="27"
              cy="27"
              r={radius}
              className={`${colors.ring} transition-all duration-700 ease-out`}
              strokeWidth="4.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-black font-mono text-slate-800">
              {score}%
            </span>
          </div>
        </div>
      </div>

      {/* Optional details */}
      {showDetails && (
        <div className="mt-3 pt-2.5 border-t border-slate-100">
          <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
            {config.description}
          </p>

          {/* Progress Bar Line */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className={`h-full rounded-full ${colors.fill} transition-all duration-500`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
