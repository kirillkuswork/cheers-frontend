import { BaseSkeleton } from '../BaseSkeleton';
import styles from './styles.module.scss';

export const FavoriteCardSkeleton = () => (
  <BaseSkeleton isAnimation className={styles.wrapper} />
);
