/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - SESSION LOADING SCREEN
 * Fast, lightweight loading indicator for AUTH_LOADING state.
 */

import React from 'react';
import { Layers } from 'lucide-react';

export const SessionLoading: React.FC = () => {
  return (
    <div
      id="session-loading-screen"
      className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#F8FAFC] text-gray-800 select-none"
    >
      <div className="flex flex-col items-center space-y-4 animate-pulse">
        <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-sm">
          <Layers className="w-7 h-7 animate-bounce" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-mono">
            GEOMETRY LAB
          </h3>
          <p className="text-xs text-gray-500">
            Đang chuẩn bị không gian học tập 3D...
          </p>
        </div>
      </div>
    </div>
  );
};
