/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SCALORA FOCUS DIMMING MODE
 * 1. When user focuses key input field, activates .focus-mode class on <body>
 * 2. All surrounding titles, background grid, sticky notes dim to opacity: 0.25 and filter: blur(2px)
 * 3. 0.5s smooth transition, drawing complete visual attention to active input
 */

import React, { createContext, useContext, useEffect, useState } from 'react';

interface FocusModeContextType {
  isFocusMode: boolean;
  setFocusMode: (active: boolean) => void;
}

const FocusModeContext = createContext<FocusModeContextType>({
  isFocusMode: false,
  setFocusMode: () => {},
});

export const useFocusMode = () => useContext(FocusModeContext);

export const FocusModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFocusMode, setFocusMode] = useState(false);

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Detect relevant interactive input fields
      const isInput = Boolean(
        target.matches(
          'input[type="text"], input[type="search"], input[type="number"], input[type="email"], textarea, [data-focus-input="true"], .key-focus-input'
        ) && !target.closest('[data-no-focus-mode="true"]')
      );

      if (isInput) {
        setFocusMode(true);
        document.body.classList.add('focus-mode');
        target.classList.add('focus-active-element');
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        target.classList.remove('focus-active-element');
      }
      setFocusMode(false);
      document.body.classList.remove('focus-mode');
    };

    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);

    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
      document.body.classList.remove('focus-mode');
    };
  }, []);

  return (
    <FocusModeContext.Provider value={{ isFocusMode, setFocusMode }}>
      {children}
    </FocusModeContext.Provider>
  );
};
