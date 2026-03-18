import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface IBoxProps {
  children: ReactNode;
  className?: string;
}

export const Box: FC<IBoxProps> = ({ children, className }) => (
  <div className={clsx(styles.box, className)}>{children}</div>
);
