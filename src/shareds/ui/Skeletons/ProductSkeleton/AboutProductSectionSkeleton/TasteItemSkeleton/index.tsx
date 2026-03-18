import clsx from 'clsx';
import styles from './styles.module.scss';
import { BaseSkeleton } from '../../../BaseSkeleton';

export const TasteItemSkeleton = () => (
  <BaseSkeleton isAnimation className={clsx(styles.skeleton, styles.item)}>
    <BaseSkeleton className={clsx(styles.skeleton, styles.percent)} />
    <div className={styles.bot}>
      <BaseSkeleton className={clsx(styles.skeleton, styles.name)} />
      <BaseSkeleton className={clsx(styles.skeleton, styles.dot)} />
    </div>
  </BaseSkeleton>
);
