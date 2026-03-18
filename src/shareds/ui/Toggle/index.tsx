/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styles from './styles.module.scss';
import { IToggleProps } from './types';

export const Toggle: React.FC<IToggleProps> = ({ isChecked, onChange }) => {
  const handleToggle = () => {
    onChange?.(!isChecked);
  };

  return (
    <label className={styles.toggle}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        className={styles.input}
      />
      <span className={styles.slider} />
    </label>
  );
};
