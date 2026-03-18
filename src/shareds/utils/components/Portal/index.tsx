import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useModal } from '@/providers/ModalProvider';

interface IProps {
  children: ReactNode;
  isModalOpen: boolean;
}

function Portal({ children, isModalOpen }: IProps) {
  const [mounted, setMounted] = useState(false);
  const { increment, decrement } = useModal();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      increment();
    } else {
      decrement();
    }

    return () => {
      if (isModalOpen) {
        decrement();
      }
    };
  }, [isModalOpen, increment, decrement]);

  return mounted ? createPortal(children, document.body) : null;
}

export default Portal;
