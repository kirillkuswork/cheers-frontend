/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface RadioButtonProps {
  value: string | undefined;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
  className?: string;
  labelClassName?: string;
  isLeftRadio?: boolean;
  type?: 'black' | 'red'
}

export const Radio: React.FC<RadioButtonProps> = ({
  value,
  label,
  checked,
  onChange,
  isLeftRadio,
  className,
  labelClassName,
  type = 'red',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <label className={clsx(styles.radio, label && styles.withLabel, isLeftRadio && styles.leftRadio, className)}>
      {label && <span className={clsx(styles.label, labelClassName)}>{label}</span>}
      <input
        className={styles.input}
        type="radio"
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      <span className={clsx(styles.customRadio, checked && (type === 'red' ? styles.red : styles.black))} />
    </label>
  );
};
