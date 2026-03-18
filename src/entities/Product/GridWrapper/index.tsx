import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface IGridWrapperProps {
  children: ReactNode;
  className?: string;
}

export const GridWrapper: FC<IGridWrapperProps> = ({ children, className }) => <div className={clsx(styles.wrapper, className)}>{children}</div>;
