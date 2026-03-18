import ModalWrapper from '@/shareds/ui/ModalWrapper';
import React, { FC } from 'react';
import { Button, ButtonsGroup } from '@/shareds';
import styles from './styles.module.scss';

interface IDeletePartnerOfferModal {
  isOpen: boolean;
  onClose?: () => void;
  onDelete?: () => void;
  title?: string;
  isLoading?: boolean
}

export const DeletePartnerOfferModal: FC<IDeletePartnerOfferModal> = ({
  isOpen,
  onClose,
  onDelete,
  title = 'Вы действительно хотите удалить предложение партнера?',
  isLoading,
}) => (
  <ModalWrapper
    canClose
    isVisible={isOpen}
    className={styles.wrapper}
    onClose={onClose}
  >
    <span className={styles.title}>
      {title}
    </span>
    <ButtonsGroup>
      <Button isLoading={isLoading} label="Удалить" size="large" onClick={onDelete} />
      <Button
        disabled={isLoading}
        label="Отмена"
        variant="tertiary"
        size="large"
        onClick={onClose}
      />
    </ButtonsGroup>
  </ModalWrapper>
);
