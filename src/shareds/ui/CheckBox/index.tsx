/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface CheckBoxProps {
  value: string;
  label?: string;
  checked: boolean;
  onChange: (value: string, checked: boolean) => void;
  error?: boolean;
  className?: string;
  labelClassName?: string
}

export const CheckBox: FC<CheckBoxProps> = ({
  value,
  label,
  checked,
  onChange,
  error,
  className,
  labelClassName,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, e.target.checked);
  };

  return (
    <label className={clsx(styles.checkbox, label && styles.withLabel, className)}>
      <input
        className={styles.input}
        value={value}
        checked={checked}
        onChange={handleChange}
        {...props}
        type="checkbox"
      />
      <div className={clsx(styles.customCheckbox, error && styles.error, labelClassName)} />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};
