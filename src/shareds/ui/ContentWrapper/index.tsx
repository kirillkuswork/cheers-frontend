/* eslint-disable import/no-cycle */
import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { Skeletons } from '@/shareds/ui';
import { WineSectionProps } from '@/sections/Home/WineSection';
import styles from './styles.module.scss';

interface IProps extends Pick<WineSectionProps, 'isLoading'> {
  title?: string;
  children: ReactNode;
  className?: string;
  wrapperClassname?: string;
}

function ContentWrapper({
  title,
  children,
  className,
  wrapperClassname,
  isLoading,
}: IProps) {
  return (
    <div className={clsx(styles.wrapper, wrapperClassname)}>
      {isLoading ? <Skeletons.CatalogSkeletons.ContentWrapperTitleSkeleton />
        : title && (
        <div className={styles.title}>
          {title}
        </div>
        )}
      <div className={clsx(styles.inner, className)}>
        {children}
      </div>
    </div>
  );
}

export default ContentWrapper;
