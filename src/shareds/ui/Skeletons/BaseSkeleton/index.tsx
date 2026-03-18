import { FC, HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface IBaseSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  isAnimation?: boolean;
  style?: React.CSSProperties;
}
export const BaseSkeleton: FC<IBaseSkeletonProps> = ({
  isAnimation = false,
  children,
  className,
  style,
}) => (
  <div
    className={clsx(
      styles[`${isAnimation ? 'grey' : 'white'}`],
      isAnimation && styles.animation,
      className,
    )}
    style={style}
  >
    {children}
  </div>
);
