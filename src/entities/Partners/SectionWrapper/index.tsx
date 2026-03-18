import clsx from 'clsx';
import { ModalTry } from '@/features/About';
import { useState } from 'react';
import { WideButton } from '@/shareds/ui';
import styles from './styles.module.scss';
import { SectionWrapperType } from './types';

function SectionWrapper({
  children,
  id,
  className,
  showButton = false,
}: SectionWrapperType) {
  const [isOpenModal, setIsOpen] = useState(false);
  return (
    <>
      <ModalTry isOpen={isOpenModal} onClose={() => setIsOpen(false)} />
      <section className={clsx(styles.section, className)} id={id}>
        {children}
        {showButton && (
          <WideButton
            className={styles.button}
          />
        )}
      </section>
    </>
  );
}

export default SectionWrapper;
