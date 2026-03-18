import React, { FC } from 'react';
import { IDonutItemInfoProps } from '@/widgets/Product/Donut/types';
import styles from './styles.module.scss';

export const DonutItemInfo: FC<IDonutItemInfoProps> = ({ percent, name, color }) => (
  <div className={styles.wrapper}>
    <span className={styles.percent}>
      {`${percent}%`}
    </span>
    <div className={styles.nameWrapper}>
      <span className={styles.name}>{name}</span>
      <div style={{ backgroundColor: color }} className={styles.indicator} />
    </div>
  </div>
);
