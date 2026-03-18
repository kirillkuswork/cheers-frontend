/* eslint-disable react-hooks/exhaustive-deps */
import {
  ReactNode,
} from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface IProps {
  children: ReactNode;
  className?: string;
}

export const SearchWrapper = ({ children, className }: IProps) => (
  <div className={clsx(styles.wrapper, className)}>
    {children}
  </div>
);
