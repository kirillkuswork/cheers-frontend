import { BaseSkeleton } from '../BaseSkeleton';
import styles from './styles.module.scss';

export const MobileFilterControlSkeleton = () => (
  <BaseSkeleton className={styles.wrapper}>
    <BaseSkeleton isAnimation className={styles.left} />
    <BaseSkeleton isAnimation className={styles.right} />
  </BaseSkeleton>
);
