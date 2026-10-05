/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - 3D EXPLORE AI ASSISTANT (REMOVED)
 * Decommissioned per request to remove chat interface.
 */

import React from 'react';
import { ShapeType } from '../../types';

export interface AIExploreWidgetProps {
  shape: ShapeType;
  activeComponentId?: string;
  className?: string;
}

export const AIExploreWidget: React.FC<AIExploreWidgetProps> = () => {
  return null;
};

export default AIExploreWidget;
