/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Close } from '@/assets/icons';
import React, { FC, MouseEvent } from 'react';
import styles from './styles.module.scss';

interface ITagProps {
  label: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

export const Tag: FC<ITagProps> = ({ label, onClick }) => (
  <div className={styles.selectedItem}>
    {label}
    <button
      type="button"
      className={styles.removeButton}
      onClick={onClick}
    >
      <Close className={styles.removeButton} />
    </button>
  </div>
);
