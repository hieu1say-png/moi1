/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NGHỊCH LÝ 1/3 — BÍ ẨN THỂ TÍCH (VolumeParadoxLab)
 */

import React from 'react';
import { VolumeParadoxLab } from './VolumeParadoxLab/VolumeParadoxLab';
import { VolumeParadoxLabProps } from './VolumeParadoxLab/types';

export interface RealVolumeLabProps extends VolumeParadoxLabProps {}

export const RealVolumeLab: React.FC<RealVolumeLabProps> = (props) => {
  return <VolumeParadoxLab {...props} />;
};

export default RealVolumeLab;
