/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC, useCallback, useState } from 'react';
import { RuAnalogsModal } from '@/widgets/Quiz/RuAnalogsModal';
import clsx from 'clsx';
import { IconButton } from '@/shareds/ui';
import { ArrowIcon } from '@/entities/Home/CatalogCard/icons';
import Image from 'next/image';
import styles from './styles.module.scss';

export interface IProps {
  className?: string;
}

export const QuizCard: FC<IProps> = ({
  className,
}: IProps) => {
  const [openRuAnalogsModal, setOpenRuAnalogsModal] = useState(false);

  const handleModalOpen = useCallback(() => setOpenRuAnalogsModal(true), []);
  const handleModalClose = useCallback(() => setOpenRuAnalogsModal(false), []);

  return (
    <>
      <div
        className={clsx(styles.wrapper, className)}
        onClick={handleModalOpen}
      >
        <div className={styles.title}>Найти российский аналог</div>
        {/* <div className={styles.subtitle}>Подтекст</div> */}
        <div className={styles.bgImage} />
        <IconButton size="small" className={styles.button} icon={<ArrowIcon />} />
        <div className={styles.imgWrapper}>
          <Image className={styles.img} fill src="/images/product/wine_bottle_russia_large.png" alt="Vino" />
        </div>
      </div>

      <RuAnalogsModal isOpen={openRuAnalogsModal} onClose={handleModalClose} />
    </>
  );
};
