import React, { createContext, useContext, ReactNode } from 'react';
import useBreakpoint from '../hooks/useBreakpoint';

const BreakpointContext = createContext<string | undefined>(undefined);

export function BreakpointProvider({ children }: { children: ReactNode }) {
  const breakpoint = useBreakpoint();

  return (
    <BreakpointContext.Provider value={breakpoint}>
      {children}
    </BreakpointContext.Provider>
  );
}

export const useCurrentBreakpoint = (): string => {
  const context = useContext(BreakpointContext);
  if (context === undefined) {
    throw new Error('useCurrentBreakpoint must be used within a BreakpointProvider');
  }
  return context;
};
