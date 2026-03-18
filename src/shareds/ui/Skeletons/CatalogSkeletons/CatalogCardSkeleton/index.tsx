import { FC } from 'react';
import clsx from 'clsx';
import { BaseSkeleton } from '../../BaseSkeleton';
import styles from './styles.module.scss';

interface ICatalogCardSkeleton {
  isLarge?: boolean;
  withImage?: boolean;
}
export const CatalogCardSkeleton: FC<ICatalogCardSkeleton> = ({
  isLarge,
  withImage,
}) => (
  <BaseSkeleton
    isAnimation
    className={clsx(styles.wrapper, isLarge && styles.large)}
  >
    <div className={styles.left}>
      <BaseSkeleton className={styles.topItem} />
      <BaseSkeleton className={styles.bottomItem} />
    </div>
    {withImage && (
      <div className={styles.right}>
        <BaseSkeleton className={styles.bottom} />
      </div>
    )}
  </BaseSkeleton>
);
