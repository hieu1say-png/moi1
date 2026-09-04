/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GATE 1.1 - CYLINDER DATA TYPES & NODE CONSTANTS
 * Defines node hierarchy names, component keys, and interaction state types.
 */

export type CylinderComponentKey =
  | 'all'
  | 'top_base'
  | 'bottom_base'
  | 'side_surface'
  | 'axis'
  | 'radius'
  | 'generatrix'
  | 'height'
  | 'point_o'
  | 'point_o_prime';

export const CYLINDER_NODE_NAMES = {
  ROOT: 'CylinderRoot',
  TOP_BASE: 'TopBase',
  BOTTOM_BASE: 'BottomBase',
  SIDE_SURFACE: 'SideSurface',
  AXIS_OO_PRIME: 'AxisOOPrime',
  RADIUS_R: 'RadiusR',
  GENERATRIX_L: 'GeneratrixL',
  HEIGHT_H: 'HeightH',
  POINT_O: 'PointO',
  POINT_O_PRIME: 'PointOPrime'
} as const;

export type CylinderNodeName = typeof CYLINDER_NODE_NAMES[keyof typeof CYLINDER_NODE_NAMES];

export interface CylinderGeometryConfig {
  radius: number; // R (bán kính đáy, đơn vị cm)
  height: number; // h (chiều cao, h = OO', đơn vị cm)
  radialSegments?: number;
  heightSegments?: number;
}

export interface CylinderVisibilityState {
  topBase: boolean;
  bottomBase: boolean;
  sideSurface: boolean;
  axisOOPrime: boolean;
  radiusR: boolean;
  generatrixL: boolean;
  heightH: boolean;
  pointO: boolean;
  pointOPrime: boolean;
}

export const DEFAULT_CYLINDER_VISIBILITY: CylinderVisibilityState = {
  topBase: true,
  bottomBase: true,
  sideSurface: true,
  axisOOPrime: true,
  radiusR: true,
  generatrixL: true,
  heightH: true,
  pointO: true,
  pointOPrime: true
};

export interface CylinderLabelItem {
  id: 'O' | 'OPrime' | 'R' | 'h' | 'l';
  nodeName: CylinderNodeName;
  latexText: string;
  vietnameseName: string;
  symbol: string;
  description: string;
  worldPosition: [number, number, number];
  color: string;
  badgeBg: string;
  highlighted: boolean;
  visible: boolean;
}
