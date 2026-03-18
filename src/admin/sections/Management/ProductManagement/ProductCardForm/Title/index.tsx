import React, { FC, HTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface ITitleProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const Title: FC<ITitleProps> = ({ title }) => (
  <span className={styles.title}>
    {title}
  </span>
);
