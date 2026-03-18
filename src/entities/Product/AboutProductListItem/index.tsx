import React, { FC } from 'react';
import styles from './styles.module.scss';

interface IAboutProductListItemProps {
  title: string;
  description: string | null | undefined;
}

export const AboutProductListItem: FC<IAboutProductListItemProps> = ({
  title,
  description,
}) => (
  <div className={styles.listItem}>
    <span className={styles.title}>{title}</span>
    <span className={styles.description}>{description}</span>
  </div>
);
