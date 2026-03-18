import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface IInfoListProps {
  children: ReactNode;
  className?: string;
}

export const InfoList: FC<IInfoListProps> = ({ children, className }) => <div className={clsx(styles.wrapper, className)}>{children}</div>;
