import clsx from 'clsx';
import React, {
  forwardRef, useEffect, useImperativeHandle, useMemo, useState,
} from 'react';
import { useCurrentBreakpoint } from '@/shareds/providers/BreakpointContext';
import styles from './styles.module.scss';

interface IProps {
  children: React.ReactNode,
  afterChange?: (currentSlideIndex: number) => void,
}
const getStylesForSlide = (currentIndex: number, slideIndex: number, count: number): string => {
  if (currentIndex === slideIndex) return styles.slideActive;
  const prevIndex = slideIndex - 1 > -1 ? slideIndex - 1 : count;
  if (currentIndex === prevIndex) return styles.slidePrev;
  const nextIndex = slideIndex + 1 > count ? 0 : slideIndex + 1;
  if (currentIndex === nextIndex) return styles.slideNext;
  return styles.slideHidden;
};
function RafSlider({ children, afterChange }: IProps, ref: React.ForwardedRef<unknown>) {
  const breakpoint = useCurrentBreakpoint();
  const isStatic = useMemo(() => breakpoint !== 'lg' && breakpoint !== 'xl', [breakpoint]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const getCountSlides = useMemo(() => React.Children.count(children) - 1, [children]);
  const getListSlides = useMemo(() => React.Children.map(children, (child, index) => ({
    child,
    key: `${new Date().getTime()}_${index}`,
  })), [children]);
  const goToNext = () => {
    if (isStatic) return;
    if (currentSlide < getCountSlides) setCurrentSlide((p) => p + 1);
    else setCurrentSlide(0);
  };
  const goToPrev = () => {
    if (isStatic) return;
    if (currentSlide > 0) setCurrentSlide((p) => p - 1);
    else setCurrentSlide(getCountSlides);
  };
  useImperativeHandle(ref, () => ({
    goToNext,
    goToPrev,
  }));
  useEffect(() => {
    setTimeout(() => afterChange?.(currentSlide), 300);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, isStatic]);
  if (!getCountSlides) return null;
  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        {getListSlides?.map(({ child, key }, index) => (
          <div
            key={key}
            className={clsx(
              styles.slide,
              !isStatic && getStylesForSlide(index, currentSlide, getCountSlides),
            )}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
const Slider = forwardRef(RafSlider);
export default Slider;
