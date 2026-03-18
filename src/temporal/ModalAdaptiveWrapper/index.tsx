/* eslint-disable no-irregular-whitespace */
import useBreakpoint from '@/shareds/hooks/useBreakpoint';
import ModalWrapper from '@/shareds/ui/ModalWrapper';
import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export const ModalAdaptiveWrapper = ({
  isOpen,
  onClose,
  children,
  className,
}: IProps) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'xs';

  return (
    <ModalWrapper
      isVisible={isOpen}
      onClose={onClose}
      className={clsx(styles.wrapper, className)}
      canClose={!isMobile}
    >
      {isMobile && <div className={styles.indicator}><span /></div>}
      {children}
      {isMobile && <div className={styles.indicatorBot}><span /></div>}
    </ModalWrapper>
  );
};
