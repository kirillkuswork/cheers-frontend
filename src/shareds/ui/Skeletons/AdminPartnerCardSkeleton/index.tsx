import { BaseSkeleton } from '../BaseSkeleton';
import styles from './styles.module.scss';

export const AdminPartnerCardSkeleton = () => (
  <BaseSkeleton isAnimation className={styles.wrapper}>
    <BaseSkeleton className={styles.img} />
    <BaseSkeleton className={styles.price} />
    <div className={styles.text}>
      <BaseSkeleton className={styles.title} />
      <BaseSkeleton className={styles.subTitle} />
      <BaseSkeleton className={styles.description} />
    </div>
  </BaseSkeleton>
);
