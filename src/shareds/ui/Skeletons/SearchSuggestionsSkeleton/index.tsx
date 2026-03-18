import { BaseSkeleton } from '../BaseSkeleton';
import styles from './styles.module.scss';

export const SearchSuggestionsSkeleton = () => (
  <>
    {Array.from({ length: 5 }, (_, index) => (
      <div key={index} className={styles.wrapper}>
        <BaseSkeleton isAnimation className={styles.img} />
        <div className={styles.info}>
          <BaseSkeleton isAnimation className={styles.title} />
          <BaseSkeleton isAnimation className={styles.desc} />
          <div className={styles.ratingWrapper}>
            <div className={styles.ratingItem}>
              <BaseSkeleton isAnimation className={styles.skeleton} />
              <BaseSkeleton isAnimation className={styles.skeleton} />
            </div>
            <div className={styles.ratingItem}>
              <BaseSkeleton isAnimation className={styles.skeleton} />
              <BaseSkeleton isAnimation className={styles.skeleton} />
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);
