/* eslint-disable @next/next/no-img-element */
import React, { FC, LegacyRef } from 'react';
import clsx from 'clsx';
import { IProductCurrent } from '@/redux/services/types/products';
import styles from './styles.module.scss';

interface IProducerItemProps {
  data: IProductCurrent | undefined;
  showMore: boolean;
  ref?: LegacyRef<HTMLSpanElement> | undefined;
}

// eslint-disable-next-line react/display-name
export const ProducerItem: FC<IProducerItemProps> = React.forwardRef(({
  data,
  showMore,
}, ref) => {
  const { producer, properties } = data || {};
  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>{producer?.name}</span>
      <div className={styles.subtitle}>
        <span className={styles.country}>
          {properties?.country}
          {properties?.region && properties?.country && ', '}
          {properties?.region}
        </span>
      </div>
      {producer?.description && (
        <span
          ref={ref}
          className={clsx(
            styles.description,
            !showMore && styles.descriptionFull,
          )}
        >
          {producer.description}
        </span>
      )}
    </div>
  );
});
