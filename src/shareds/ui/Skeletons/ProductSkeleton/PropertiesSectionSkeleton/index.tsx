import clsx from 'clsx';
import { BaseSkeleton } from '../../BaseSkeleton';
import styles from './styles.module.scss';

export const PropertiesSectionSkeleton = () => (
  <div className={styles.wrapper}>
    <BaseSkeleton isAnimation className={clsx(styles.skeleton, styles.left)} />
    <div className={styles.propWrapper}>
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className={styles.prop}>
          <BaseSkeleton isAnimation className={styles.skeleton} />
          <BaseSkeleton isAnimation className={styles.skeleton} />
        </div>
      ))}
    </div>
  </div>
);
