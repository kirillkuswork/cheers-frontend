import { useState } from 'react';
import clsx from 'clsx';
import ModalGetPartners from '@/features/Partners/ModalGetPartners';
import { WideButton } from '@/shareds';
import styles from './styles.module.scss';
import { SectionInfoBlockProps } from './types';

function SectionInfoBlock({
  title,
  items,
  className,
  showButton = false,
}: SectionInfoBlockProps) {
  const [isOpenModal, setIsOpen] = useState(false);
  return (
    <div className={clsx(styles.info, className)}>
      <ModalGetPartners isOpen={isOpenModal} onClose={() => setIsOpen(false)} />
      <div className={styles.wrapper}>
        <p className={styles.title}>
          {title}
        </p>
        <div className={styles.items}>
          {items.map((item, idx) => (
            <div key={item} className={styles.item}>
              <div className={styles.number}>
                {idx + 1}
              </div>
              <p className={styles.text}>
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
      {showButton && (
        <div className={styles.button}>
          <WideButton onClick={() => setIsOpen((prev) => !prev)} text="Стать партнёром" />
        </div>
      )}
    </div>
  );
}

export default SectionInfoBlock;
