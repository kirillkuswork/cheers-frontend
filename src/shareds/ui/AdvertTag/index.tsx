import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface IAdvertTagProps extends HTMLAttributes<HTMLDivElement> {
  label: string
}

export const AdvertTag: FC<IAdvertTagProps> = ({ label, className, ...props }) => (
  <div className={clsx(styles.tag, className)} {...props}>
    {label}
  </div>
);
