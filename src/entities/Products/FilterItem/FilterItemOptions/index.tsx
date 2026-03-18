import React, { FC, HTMLAttributes } from 'react';
import styles from './styles.module.scss';

export const FilterItemOptions:FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
}) => <div className={styles.filterItems}>{children}</div>;
