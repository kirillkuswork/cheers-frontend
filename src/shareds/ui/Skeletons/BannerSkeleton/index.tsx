import { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { BaseSkeleton } from '../BaseSkeleton';
import styles from './styles.module.scss';

export const BannerSkeleton: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => <BaseSkeleton isAnimation className={clsx(styles.wrapper, className)} />;
