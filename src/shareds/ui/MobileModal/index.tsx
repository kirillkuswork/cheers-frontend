/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC } from 'react';
import styles from './styles.module.scss';
import { Portal } from '../../utils/components';

interface IMobileModalProps {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
  title?: string;
}

export const MobileModal: FC<IMobileModalProps> = ({
  onClose,
  isOpen,
  title,
  children,
}) => (
  isOpen && (
  <Portal isModalOpen={isOpen}>
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>{title}</div>
        {children}
      </div>
    </div>
  </Portal>
  )
);
