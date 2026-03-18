import { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

export const Paper:FC<HTMLAttributes<HTMLDivElement>> = ({ children, className }) => (
  <div className={clsx(styles.paper, className)}>
    {children}
  </div>
);
