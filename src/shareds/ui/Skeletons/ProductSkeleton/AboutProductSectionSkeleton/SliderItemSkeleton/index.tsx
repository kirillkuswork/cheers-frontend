import clsx from 'clsx';
import styles from './styles.module.scss';
import { BaseSkeleton } from '../../../BaseSkeleton';

export const SliderItemSkeleton = () => (
  <div className={styles.wrapper}>
    <div className={styles.top}>
      <BaseSkeleton isAnimation className={styles.skeleton} />
      <BaseSkeleton isAnimation className={styles.skeleton} />
    </div>
    <div className={styles.bot}>
      <BaseSkeleton isAnimation className={clsx(styles.skeleton, styles.line)} />
      <BaseSkeleton isAnimation className={clsx(styles.skeleton, styles.round)} />
    </div>
  </div>
);
