import clsx from 'clsx';
import { BaseSkeleton } from '../../BaseSkeleton';
import styles from './styles.module.scss';

export const ProducerSectionSkeleton = () => (
  <div className={styles.wrapper}>
    <BaseSkeleton isAnimation className={clsx(styles.skeleton, styles.left)} />
    <div className={styles.item}>
      <BaseSkeleton isAnimation className={clsx(styles.skeleton, styles.title)} />
      <div className={styles.info}>
        <BaseSkeleton isAnimation className={styles.skeleton} />
        <BaseSkeleton isAnimation className={styles.skeleton} />
      </div>
      <div className={styles.desc}>
        <BaseSkeleton isAnimation className={styles.skeleton} />
        <BaseSkeleton isAnimation className={styles.skeleton} />
        <BaseSkeleton isAnimation className={styles.skeleton} />
      </div>
    </div>
  </div>
);
