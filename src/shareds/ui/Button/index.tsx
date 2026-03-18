/* eslint-disable react/button-has-type */
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { Spinner } from '@/shareds/ui/Spinner';
import styles from './styles.module.scss';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  size?: 'small' | 'medium' | 'large';
  icon?: ReactNode;
  isLoading?: boolean;
  type?: 'button' | 'submit';
}

function Button({
  label,
  variant = 'primary',
  size = 'medium',
  icon,
  isLoading,
  className,
  type = 'button',
  ...btnAttrs
}: IButtonProps) {
  return (
    <button
      className={clsx(
        styles.button,
        icon && !label && styles[`button_${size}_iconButton`],
        styles[`button_${variant}`],
        styles[`button_${size}`],
        btnAttrs.disabled && styles.button_disabled,
        className,
      )}
      {...btnAttrs}
      type={type}
    >
      {isLoading ? <Spinner /> : (
        <>
          {icon && <span className={styles.icon}>{icon}</span>}
          {label && label}
        </>
      )}

    </button>
  );
}

export default Button;
