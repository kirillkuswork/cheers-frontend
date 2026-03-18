import useBreakpoint from '@/shareds/hooks/useBreakpoint';
import { BaseSkeleton } from '../../BaseSkeleton';
import styles from './styles.module.scss';

export const AnalogSectionSkeleton = () => {
  const breakpoint = useBreakpoint();

  const isMobile = breakpoint === 'xs';
  const isSmallTablet = breakpoint === 'sm';
  const isBigTablet = breakpoint === 'md';

  const calcSliderPerView = () => {
    if (isBigTablet) return 4;
    if (isSmallTablet) return 3;
    if (isMobile) return 2;
    return 6;
  };

  return (
    <div className={styles.wrapper}>
      {Array.from({ length: calcSliderPerView() }, (_, index) => (
        <BaseSkeleton key={index} isAnimation className={styles.item} />
      ))}
    </div>
  );
};
