/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { TASTE_KEYS } from '@/sections/Product/ProductSection/constants';
import styles from './styles.module.scss';

interface ITasteKeys {
  bodied_level: string[];
  sweetness_level: string[];
  tannin_level: string[];
  acidity_level: string[];
  fizziness_level: string[];
}

interface SliderProps {
  percent: number | unknown;
  propKey: string;
}

export const SliderItem: React.FC<SliderProps> = ({
  percent,
  propKey,
}) => {
  const percentage = typeof percent === 'number' ? (percent - 1) * 25 : 0;

  return (
    <>
      {percent && propKey && (
        <div className={styles.sliderContainer}>
          <div className={styles.labels}>
            <span className={styles.label}>{TASTE_KEYS[propKey as keyof ITasteKeys][0]}</span>
            <span className={styles.label}>{TASTE_KEYS[propKey as keyof ITasteKeys][1]}</span>
          </div>
          <div className={styles.slider}>
            <div
              className={styles.sliderThumb}
              style={{ left: `calc(${percentage}% - ${percentage * 0.16}px)` }}
            />
          </div>
        </div>
      )}
    </>
  );
};
