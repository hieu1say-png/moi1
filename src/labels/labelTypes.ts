/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GATE 1.1 - 3D/2D PROJECTED LABEL SYSTEM TYPES
 * Individual, independent mathematical symbol badges for Grade 9 Cylinder.
 */

import { CylinderComponentKey } from '../geometry/cylinder/cylinderTypes';

export type CylinderSymbolId = 'O' | 'OPrime' | 'R' | 'h' | 'l';

export interface CylinderLabelData {
  id: CylinderSymbolId;
  componentKey: CylinderComponentKey;
  symbol: string; // e.g. "O", "O'", "R", "h", "l"
  title: string;
  subtext: string;
  latex: string;
  colorClass: string;
  badgeBorderClass: string;
  badgeBgClass: string;
  screenX: number;
  screenY: number;
  visible: boolean;
  highlighted: boolean;
}
