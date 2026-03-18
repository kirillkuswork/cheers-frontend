import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { IButtonIconProps } from './types';

export const ButtonIcon: React.FC<IButtonIconProps> = ({
  icon,
  size = 'medium',
  className,
  onClick,
  ...btnAttrs
}) => (
  <button
    onClick={onClick}
    className={clsx(styles.buttonIcon, styles[`buttonIcon_${size}`], className)}
    {...btnAttrs}
    type="button"
  >
    <span>{icon}</span>
  </button>
);
