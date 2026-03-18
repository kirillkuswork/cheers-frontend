import React, { FC } from 'react';
import styles from './styles.module.scss';

interface IHeadingProps {
  title: string;
  description?: string;
}

export const Heading:FC<IHeadingProps> = ({ title, description }) => (
  <div className={styles.heading}>
    <span className={styles.title}>{title}</span>
    {description && <span className={styles.description}>{description}</span>}
  </div>
);
