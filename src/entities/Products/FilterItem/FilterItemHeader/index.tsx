/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC } from 'react';
import { ArrowUp } from '@/assets/icons';
import styles from './styles.module.scss';
import { IFilterItemHeaderProps } from './types';

export const FilterItemHeader: FC<IFilterItemHeaderProps> = ({
  title,
  element,
  isOpen,
  toggleOpenHandler,
}) => (
  <div className={styles.itemHeader} onClick={toggleOpenHandler}>
    <div className={styles.titleContainer}>
      <span className={styles.title}>{title}</span>
      {element && element}
    </div>
    <ArrowUp className={`${styles.icon} ${!isOpen && styles.closed}`} />
  </div>
);
