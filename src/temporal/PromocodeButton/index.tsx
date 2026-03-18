/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCallback, useState } from 'react';
import { ModalPromocode } from '@/modals';
import { IPromocodeButtonProps } from './types';
import styles from './styles.module.scss';

export const PromocodeButton = ({
  imgUrl,
  promocode,
  description,
  discount,
  partnerLink,
}: IPromocodeButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleModalClose = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <div
        className={styles.promo}
        onClick={handleModalOpen}
      >
        <div className={styles.top}>Показать код</div>
        <div className={styles.bot}>{promocode}</div>
      </div>

      <ModalPromocode
        isOpen={isModalOpen}
        onClose={handleModalClose}
        imgUrl={imgUrl}
        promocode={promocode}
        description={description}
        discount={discount}
        partnerLink={partnerLink}
      />
    </>
  );
};

export default PromocodeButton;
