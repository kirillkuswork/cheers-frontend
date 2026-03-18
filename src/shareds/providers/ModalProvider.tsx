import React, {
  createContext, ReactNode, useContext, useState, useEffect, useMemo, useCallback,
} from 'react';

interface ModalContextType {
  openModals: number;
  increment: () => void;
  decrement: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [openModals, setOpenModals] = useState(0);

  const increment = useCallback(() => setOpenModals((prev) => prev + 1), []);
  const decrement = useCallback(() => setOpenModals((prev) => Math.max(0, prev - 1)), []);

  useEffect(() => {
    if (openModals > 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openModals]);

  const contextValue = useMemo(
    () => ({
      openModals, increment, decrement,
    }),
    [openModals, increment, decrement],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
