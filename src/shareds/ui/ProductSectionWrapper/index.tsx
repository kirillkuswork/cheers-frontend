/* eslint-disable max-len */
import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface IProductSectionWrapperProps {
  children: ReactNode;
  className?: string;
}

export const ProductSectionWrapper: FC<IProductSectionWrapperProps> = ({ children, className }) => <div className={clsx(styles.wrapper, className)}>{children}</div>;
