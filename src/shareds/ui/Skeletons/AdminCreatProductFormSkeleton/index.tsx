import { BaseSkeleton } from '../BaseSkeleton';
import styles from './styles.module.scss';

export const AdminCreatProductFormSkeleton = () => (
  <BaseSkeleton className={styles.wrapper}>
    <BaseSkeleton isAnimation className={styles.title} />
    <div className={styles.itemWrapper}>
      <BaseSkeleton isAnimation className={styles.input} />
      <BaseSkeleton isAnimation className={styles.input} />
    </div>
    <BaseSkeleton isAnimation className={styles.subTitle} />
    <div className={styles.itemWrapper}>
      <BaseSkeleton isAnimation className={styles.input} />
      <BaseSkeleton isAnimation className={styles.input} />
      <BaseSkeleton isAnimation className={styles.input} />
      <BaseSkeleton isAnimation className={styles.input} />
      <BaseSkeleton isAnimation className={styles.input} />
      <BaseSkeleton isAnimation className={styles.input} />
    </div>
    <BaseSkeleton isAnimation className={styles.subTitle} />
    <div className={styles.itemWrapper}>
      <BaseSkeleton isAnimation className={styles.input} />
      <BaseSkeleton isAnimation className={styles.input} />
      <BaseSkeleton isAnimation className={styles.input} />
      <BaseSkeleton isAnimation className={styles.input} />
    </div>
  </BaseSkeleton>
);
