import { BaseSkeleton } from '../../BaseSkeleton';
import styles from './styles.module.scss';

export const PartnersSectionSkeleton = () => (
  <>
    {Array.from({ length: 3 }, (_, index) => (
      <BaseSkeleton key={index} isAnimation className={styles.skeleton} />
    ))}
  </>
);
