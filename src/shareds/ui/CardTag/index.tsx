import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface ICardTagProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
  discount?: number | null;
}

export const CardTag: FC<ICardTagProps> = ({
  text,
  className,
  discount,
  ...props
}) => (
  <div className={clsx(styles.wrapper, className)} {...props}>
    {Boolean(text) && (
      <span className={styles.text}>{text}</span>
    )}
    {Boolean(discount) && (
      <span className={styles.discount}>{`-${discount}%`}</span>
    )}
  </div>
);
