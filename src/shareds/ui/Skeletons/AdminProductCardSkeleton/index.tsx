import { BaseSkeleton } from '../BaseSkeleton';
import styles from './styles.module.scss';

export const AdminProductCardSkeleton = () => (
  <BaseSkeleton isAnimation className={styles.wrapper}>
    <BaseSkeleton className={styles.img} />
    <div className={styles.text}>
      <BaseSkeleton className={styles.title} />
      <BaseSkeleton className={styles.subTitle} />
    </div>
  </BaseSkeleton>
);
