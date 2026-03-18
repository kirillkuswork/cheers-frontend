import { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface IContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const Container:FC<IContainerProps> = ({ children, className }) => (
  <div className={clsx(styles.container, className)}>
    {children}
  </div>
);
