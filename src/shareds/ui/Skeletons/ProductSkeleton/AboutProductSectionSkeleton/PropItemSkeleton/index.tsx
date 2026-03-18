import styles from './styles.module.scss';
import { BaseSkeleton } from '../../../BaseSkeleton';

export const PropItemSkeleton = () => (
  <div className={styles.prop}>
    <BaseSkeleton isAnimation className={styles.skeleton} />
    <BaseSkeleton isAnimation className={styles.skeleton} />
    <BaseSkeleton isAnimation className={styles.skeleton} />
  </div>
);
