import clsx from 'clsx';
import { BaseSkeleton } from '../../BaseSkeleton';
import styles from './styles.module.scss';

export const MainSectionSkeleton = () => (
  <div className={styles.wrapper}>
    <BaseSkeleton isAnimation className={clsx(styles.skeleton, styles.left)} />
    <div className={styles.midTitle}>
      <div className={styles.rating}>
        <BaseSkeleton isAnimation className={styles.skeleton} />
        <BaseSkeleton isAnimation className={styles.skeleton} />
      </div>
      <BaseSkeleton isAnimation className={clsx(styles.skeleton, styles.title)} />
    </div>
    <div className={styles.midInfo}>
      <div className={styles.props}>
        {Array.from({ length: 10 }, (_, index) => (
          <BaseSkeleton key={index} isAnimation className={styles.skeleton} />
        ))}
      </div>
      <BaseSkeleton isAnimation className={clsx(styles.skeleton, styles.dropdown)} />
    </div>
    <div className={styles.right}>
      <BaseSkeleton isAnimation className={styles.skeleton} />
      <BaseSkeleton isAnimation className={styles.skeleton} />
    </div>
  </div>
);
