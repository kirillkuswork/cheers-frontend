import { BaseSkeleton } from '../BaseSkeleton';
import styles from './styles.module.scss';

export const ProductCardSkeleton = () => (
  <BaseSkeleton isAnimation className={styles.wrapper}>
    <BaseSkeleton className={styles.round} />
    <div className={styles.left}>
      <div className={styles.itemWrapper}>
        <BaseSkeleton className={styles.itemLeft} />
        <BaseSkeleton className={styles.itemRight} />
      </div>
      <div className={styles.itemWrapper}>
        <BaseSkeleton className={styles.itemLeft} />
        <BaseSkeleton className={styles.itemRight} />
      </div>
    </div>
    <div className={styles.right}>
      <div className={styles.top}>
        <BaseSkeleton className={styles.first} />
        <BaseSkeleton className={styles.second} />
      </div>
      <div className={styles.bottom}>
        <div className={styles.top}>
          <BaseSkeleton className={styles.first} />
          <BaseSkeleton className={styles.second} />
        </div>
        <BaseSkeleton className={styles.button} />
      </div>
    </div>
  </BaseSkeleton>
);
