/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import clsx from 'clsx';
import { IconButton } from '@/shareds';
import { ArrowIcon } from '@/entities/Home/CatalogCard/icons';
import { FC } from 'react';
import { ISelectionCard } from './types';
import styles from './styles.module.scss';

export const SelectionCard: FC<ISelectionCard> = ({
  title,
  className,
  children,
  onClick,
}) => (
  <div onClick={onClick} className={clsx(styles.wrapper, className)}>
    <div className={styles.bgImage} />
    <div className={styles.inner}>
      <div className={styles.title}>{title}</div>
      <IconButton size="small" className={styles.button} icon={<ArrowIcon />} />
    </div>
    {children}
  </div>
);
