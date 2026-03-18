import { BaseSkeleton } from '../BaseSkeleton';
import styles from './styles.module.scss';

export const PageWrapperSkeleton = () => (
  <div className={styles.wrapper}>
    <div className={styles.text}>
      <BaseSkeleton isAnimation className={styles.title} />
      <BaseSkeleton isAnimation className={styles.subtitle} />
      <BaseSkeleton isAnimation className={styles.subtitle} />
      <BaseSkeleton isAnimation className={styles.subtitle} />
    </div>
    <BaseSkeleton isAnimation className={styles.img} />
  </div>
);
