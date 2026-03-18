import React, { FC } from 'react';
import { IModalHeader } from '@/widgets/Header/AuthModal/types';
import styles from '../styles.module.scss';

export const ModalHeader: FC<IModalHeader> = ({ title, description }) => (
  <div className={styles.header}>
    <span className={styles.title}>{title}</span>
    {description && <span className={styles.description}>{description}</span>}
  </div>
);
