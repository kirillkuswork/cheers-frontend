import ModalWrapper from '@/shareds/ui/ModalWrapper';
import React, { FC } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import uploadingImages from '../../../../shareds/assets/images/uploadingImages.png';
import uploadingText from '../../../../shareds/assets/images/uploadingText.png';

interface IUploadingModal {
  isOpen: boolean;
  onClose?: () => void;
  isCreatingProduct?: boolean
}

export const UploadingModal: FC<IUploadingModal> = ({
  isOpen,
  onClose,
  isCreatingProduct,
}) => (
  <ModalWrapper
    isVisible={isOpen}
    className={styles.wrapper}
    onClose={onClose}
  >
    <span className={styles.title}>
      {isCreatingProduct ? 'Загружаем текст...' : 'Загружаем изображения...'}
    </span>
    <span className={styles.subTitle}>
      {isCreatingProduct ? 'Осталось чуть-чуть' : 'Еще совсем немного...'}
    </span>
    <Image fill src={isCreatingProduct ? uploadingText : uploadingImages} alt="image" className={styles.image} />

    <div className={styles.progressBar}>
      <div className={styles.progress} />
    </div>
  </ModalWrapper>
);
