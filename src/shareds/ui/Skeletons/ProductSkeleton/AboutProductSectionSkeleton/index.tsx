import clsx from 'clsx';
import { BaseSkeleton } from '../../BaseSkeleton';
import styles from './styles.module.scss';
import { PropItemSkeleton } from './PropItemSkeleton';
import { TasteItemSkeleton } from './TasteItemSkeleton';
import { SliderItemSkeleton } from './SliderItemSkeleton';

export const AboutProductSectionSkeleton = () => (
  <div className={styles.wrapper}>
    <BaseSkeleton isAnimation className={clsx(styles.skeleton, styles.left)} />
    <div className={styles.mid}>
      {Array.from({ length: 8 }, (_, index) => (
        <PropItemSkeleton key={index} />
      ))}
    </div>
    <div className={styles.right}>
      <BaseSkeleton isAnimation className={clsx(styles.skeleton, styles.round)}>
        <div />
      </BaseSkeleton>
      <div className={styles.tasteWrapper}>
        {Array.from({ length: 6 }, (_, index) => (
          <TasteItemSkeleton key={index} />
        ))}
      </div>
      <div className={styles.sliderWrapper}>
        {Array.from({ length: 3 }, (_, index) => (
          <SliderItemSkeleton key={index} />
        ))}
      </div>
    </div>
  </div>
);
