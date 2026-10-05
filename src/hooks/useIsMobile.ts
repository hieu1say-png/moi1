/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * RESPONSIVE MOBILE DETECTION HOOK
 * Provides instant breakpoint detection and updates on screen resize or orientation change.
 * Mobile breakpoint: <= 768px (iPhone SE, iPhone 14/15, Android, standard mobile/tablet portrait).
 */

import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= breakpoint;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Initial check
    checkMobile();

    // Event listener with resize and orientationchange
    window.addEventListener('resize', checkMobile, { passive: true });
    window.addEventListener('orientationchange', checkMobile, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, [breakpoint]);

  return isMobile;
}
