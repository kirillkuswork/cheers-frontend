import React, { FC } from 'react';
import styles from './styles.module.scss';

interface IInfoListItemProps {
  title: string;
  description: string | number | null | undefined;
}

export const InfoListItem: FC<IInfoListItemProps> = ({
  title,
  description,
}) => (
  <div className={styles.listItem}>
    <span className={styles.title}>{title}</span>
    <span className={styles.description}>{description}</span>
  </div>
);
