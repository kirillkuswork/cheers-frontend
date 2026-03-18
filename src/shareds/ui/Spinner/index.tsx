import React, { FC } from 'react';
import clsx from 'clsx';
import { SpinnerIcon } from '@/assets/icons';
import styles from './style.module.scss';

interface ISpinnerProps {
  className?: string
}
export const Spinner:FC<ISpinnerProps> = ({ className }) => <SpinnerIcon className={clsx(styles.loader, className)} />;
