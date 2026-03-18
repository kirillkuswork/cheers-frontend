import React from 'react';
import clsx from 'clsx';
import { IIconButtonProps } from '@/shareds/ui/IconButton/types';
import styles from './styles.module.scss';

export const IconButton: React.FC<IIconButtonProps> = ({
  icon,
  variant = 'secondary',
  size = 'large',
  className,
  onClick,
  ...btnAttrs
}) => (
  <button
    onClick={onClick}
    className={clsx(
      styles.iconButton,
      styles[`iconButton_${size}`],
      styles[`iconButton_${variant}`],
      btnAttrs.disabled && styles.iconButton_disabled,
      className,
    )}
    {...btnAttrs}
    type="button"
  >
    <span>{icon}</span>
  </button>
);
