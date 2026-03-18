import getRandomInt from '@/shareds/helpres/getRandomInt';
import { BaseSkeleton } from '../BaseSkeleton';
import styles from './styles.module.scss';

export const FilterItemSkeleton = () => (
  <BaseSkeleton className={styles.wrapper}>
    <BaseSkeleton isAnimation className={styles.left} style={{ width: getRandomInt(230, 90) }} />
    <BaseSkeleton isAnimation className={styles.right} />
  </BaseSkeleton>
);
