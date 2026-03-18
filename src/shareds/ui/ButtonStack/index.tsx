import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

export interface IButtonStack extends HTMLAttributes<HTMLButtonElement> {}

export const ButtonStack:FC<IButtonStack> = ({
  className,
  children,
}) => (
  <div className={clsx(styles.buttonStack, className)}>
    {children}
  </div>
);
