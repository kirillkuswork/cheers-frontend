import { BaseSkeleton } from '@/shareds/ui/Skeletons/BaseSkeleton';
import styles from './styles.module.scss';

export const ReviewSkeleton = () => (
  <div className={styles.wrapper}>
    <BaseSkeleton isAnimation className={styles.skeleton} />
    <BaseSkeleton isAnimation className={styles.skeleton} />
    <BaseSkeleton isAnimation className={styles.skeleton} />
    <BaseSkeleton isAnimation className={styles.skeleton} />
    <BaseSkeleton isAnimation className={styles.skeleton} />
    <BaseSkeleton isAnimation className={styles.skeleton} />
    <BaseSkeleton isAnimation className={styles.skeleton} />
    <BaseSkeleton isAnimation className={styles.skeleton} />
  </div>
);
