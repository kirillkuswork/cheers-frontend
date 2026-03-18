import { useCallback } from 'react';
import Link from 'next/link';
import { IProduct } from '@/redux/services/types/products';
import { Carousel } from '@/shareds/ui';
import { PATHS } from '@/shareds/consts/baseConts';
import useBreakpoint from '@/shareds/hooks/useBreakpoint';
import { AnalogCard } from '@/entities/Product';
import styles from './styles.module.scss';
import { QuizCard } from './QuizCard/QuizCard';

interface IProps {
  data: IProduct[]
}

export const AnalogSlider = ({ data }: IProps) => {
  const breakpoint = useBreakpoint();

  const isMobile = breakpoint === 'xs';
  const isSmallTablet = breakpoint === 'sm';
  const isBigTablet = breakpoint === 'md';

  const calcSliderPerView = useCallback(() => {
    if (isBigTablet) return 4;
    if (isSmallTablet) return 3;
    if (isMobile) return 2;
    return 6;
  }, [isBigTablet, isMobile, isSmallTablet]);

  const calcStep = useCallback(() => {
    if (isBigTablet) return 3;
    if (isSmallTablet) return 2;
    if (isMobile) return 1;
    return 5;
  }, [isBigTablet, isMobile, isSmallTablet]);

  const finalArray = data?.concat({ id: 'quiz' } as keyof object);

  return (
    <Carousel
      slidesPerView={calcSliderPerView()}
      step={calcStep()}
      className={styles.carousel}
    >
      {finalArray.map((item) => (
        typeof item.id === 'string' ? (
          <div key={item.id} className={styles.link}>
            <QuizCard />
          </div>
        ) : (
          <Link
            key={item.id}
            href={`${PATHS.products}/${item.id}`}
            className={styles.link}
          >
            <AnalogCard {...item} />
          </Link>
        )
      ))}
    </Carousel>
  );
};
