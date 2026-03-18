import React, { useState, useEffect, useMemo } from 'react';
import styles from './styles.module.scss';
import { IRangeSliderProps } from './types';

export const RangeSlider: React.FC<IRangeSliderProps> = ({
  minValue,
  maxValue,
  valueArr,
  onChange,
  currency,
}) => {
  const min = Math.round(minValue);
  const max = Math.round(maxValue);
  const value = useMemo(() => valueArr.map((i: number) => Math.round(i)), [valueArr]);
  const [minInputValue, setMinInputValue] = useState<string | number>(value[0]);
  const [maxInputValue, setMaxInputValue] = useState<string | number>(value[1]);

  useEffect(() => {
    setMinInputValue(value[0]);
    setMaxInputValue(value[1]);
  }, [value]);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value === '' ? '' : +event.target.value;
    setMinInputValue(newValue);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value === '' ? '' : +event.target.value;
    setMaxInputValue(newValue);
  };

  const handleMinInputBlur = () => {
    let newValue = typeof minInputValue === 'string' || minInputValue < min
      ? min
      : minInputValue;
    newValue = newValue >= (maxInputValue as number)
      ? (maxInputValue as number) - 1
      : newValue;
    setMinInputValue(newValue);
    onChange([newValue as number, value[1]]);
  };

  const handleMaxInputBlur = () => {
    let newValue = typeof maxInputValue === 'string' || maxInputValue > max
      ? max
      : maxInputValue;
    newValue = newValue <= (minInputValue as number)
      ? (minInputValue as number) + 1
      : newValue;
    setMaxInputValue(newValue);
    onChange([value[0], newValue as number]);
  };

  const handleMinRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.min(Number(event.target.value), value[1] - 1);
    setMinInputValue(newValue);
    onChange([newValue, value[1]]);
  };

  const handleMaxRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(Number(event.target.value), value[0] + 1);
    setMaxInputValue(newValue);
    onChange([value[0], newValue]);
  };

  const currencyContent = !!currency && (
    <span className={styles.currency}>{currency}</span>
  );

  return (
    <div className={styles.rangeSlider}>
      <div className={styles.inputsContainer}>
        <div className={styles.rangeInputWrapper}>
          <span className={styles.label}>от</span>
          <input
            type="number"
            min={min}
            max={value[1] - 1}
            value={minInputValue}
            onChange={handleMinChange}
            onBlur={handleMinInputBlur}
            className={styles.rangeInput}
            style={{ width: `${String(minInputValue).length + 0.4}ch` }}
          />
          {currencyContent}
        </div>
        <div className={styles.rangeInputWrapper}>
          <span className={styles.label}>до</span>
          <input
            type="number"
            min={value[0] + 1}
            max={max}
            value={maxInputValue}
            onChange={handleMaxChange}
            onBlur={handleMaxInputBlur}
            className={styles.rangeInput}
            style={{ width: `${String(maxInputValue).length + 0.4}ch` }}
          />
          {currencyContent}
        </div>
      </div>
      <div className={styles.sliderContainer}>
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={handleMinRangeChange}
          className={styles.thumb}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={handleMaxRangeChange}
          className={styles.thumb}
        />
        <div className={styles.sliderRangeWrapper}>
          <div
            className={styles.sliderRange}
            style={{
              left: `${((value[0] - min) / (max - min)) * 100}%`,
              width: `${((value[1] - value[0]) / (max - min)) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
