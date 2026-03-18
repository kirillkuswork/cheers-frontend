/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Close } from '@/assets/icons';
import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface ITagProps {
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

export const Chips: FC<ITagProps> = ({ label, onClick, isActive }) => {
  const setActiveHandler = () => {
    onClick?.();
  };

  return (
    <div
      onClick={!isActive ? setActiveHandler : () => {}}
      className={clsx(styles.selectedItem, isActive && styles.active)}
    >
      {label}
      {isActive && (
        <div onClick={setActiveHandler} className={styles.removeButton}>
          <Close className={styles.icon} />
        </div>
      )}
    </div>
  );
};
