import clsx from 'clsx';
// import { ModalTry } from '@/features/About';
// import { useState } from 'react';
// import { WideButton } from '@/shareds/ui';
import styles from './styles.module.scss';
import { SectionWrapperType } from './types';
import WideButtonModal from '../WideButtonModal';

function SectionWrapper({
  children,
  id,
  className,
  showButton = false,
}: SectionWrapperType) {
  return (
    <section className={clsx(styles.section, className)} id={id}>
      {children}
      {showButton && (
      <WideButtonModal
        className={styles.button}
      />
      )}
    </section>
  );
}

export default SectionWrapper;
