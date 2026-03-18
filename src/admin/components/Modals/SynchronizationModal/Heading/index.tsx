import React, { FC } from 'react';
import { CheersIcon, ViVinoIcon } from '@/admin/assets/icons';
import { ArrowsDownUp } from '@/assets/icons';
import styles from './styles.module.scss';

interface IHeadingProps {
  title: string;
  description: string
}

export const Heading:FC<IHeadingProps> = ({ title, description }) => (
  <div className={styles.heading}>
    <div className={styles.logos}>
      <div className={styles.logo}><CheersIcon /></div>
      <ArrowsDownUp className={styles.arrows} />
      <div className={styles.logo}><ViVinoIcon /></div>
    </div>
    <div className={styles.text}>
      <span className={styles.title}>{title}</span>
      <span className={styles.description}>{description}</span>
    </div>
  </div>
);
