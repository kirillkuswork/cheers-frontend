/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  ReactNode, SyntheticEvent, useEffect, useState,
} from 'react';
import clsx from 'clsx';
import { ArrowLeftOutline, ArrowRightOutline } from '@/shareds/assets/icons';
import styles from './styles.module.scss';

interface ICarouselProps {
  children: ReactNode[];
  slidesPerView?: 1 | 2 | 3 | 4 | 5 | 6;
  step?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export const Carousel = ({
  children,
  slidesPerView = 1,
  step = 1,
  className,
}: ICarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  const [touchPosition, setTouchPosition] = useState(null);

  // Устанавливаем длину для соответствия с массивом children
  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const next = () => {
    if (currentIndex < (length - slidesPerView)) {
      setCurrentIndex((prevState) => {
        // Если некст превышает количество всех элементов, то скроллит до последнего
        if ((prevState + step * 2) + 1 > length) return length - slidesPerView;
        return prevState + step;
      });
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => {
        // Если прев меньше нуля, то возвращаем в начало
        if (prevState - step < 0) return 0;
        return prevState - step;
      });
    }
  };

  const handleTouchStart = (e: SyntheticEvent) => {
    // @ts-expect-error не видит свойство
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e: SyntheticEvent) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }
    // @ts-expect-error не видит свойство
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      next();
    }

    if (diff < -5) {
      prev();
    }

    setTouchPosition(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div
          className={styles.contentWrapper}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={clsx(
              styles.content,
              styles[`show-${slidesPerView}`],
              className,
            )}
            style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}
          >
            {children}
          </div>
        </div>

        {currentIndex > 0 && (
          <button
            onClick={prev}
            className={styles.leftArrow}
            type="button"
          >
            <ArrowLeftOutline />
          </button>
        )}
        {currentIndex < (length - slidesPerView) && (
          <button
            onClick={next}
            className={styles.rightArrow}
            type="button"
          >
            <ArrowRightOutline />
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
