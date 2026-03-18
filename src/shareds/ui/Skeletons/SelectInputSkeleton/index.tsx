import { BaseSkeleton } from '../BaseSkeleton';
import styles from './styles.module.scss';

export const SelectInputSkeleton = () => (
  <BaseSkeleton isAnimation className={styles.wrapper} />
);
