/* eslint-disable @next/next/no-img-element */
import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import BreadCrumbs from '../BreadCrumbs';
import { ICrumbProps } from '../BreadCrumbs/types';
import { Skeletons } from '../Skeletons';

interface IProps {
  crumbs?: ICrumbProps[];
  title?: string | string[];
  subtitle?: string;
  children: ReactNode;
  imgUrl?: string;
  isLoading?: boolean;
}

function PageWrapper({
  crumbs,
  title,
  subtitle,
  children,
  imgUrl,
  isLoading,
}: IProps) {
  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.heading}>
          <Skeletons.PageWrapperSkeleton />
        </div>
        <div className={styles.inner}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {(crumbs || title || subtitle) && (

        <div className={clsx(
          styles.heading,
          !!imgUrl && styles.headingImg,
        )}
        >
          <div className={styles.info}>
            {!!crumbs && <BreadCrumbs crumbs={crumbs} />}
            {!!title && (
              <div className={clsx(
                styles.title,
                !crumbs && styles.titleNoMargin,
              )}
              >
                {title}
              </div>
            )}
            {!!subtitle && (
              <div className={clsx(
                styles.subtitle,
                !!imgUrl && styles.subtitleImg,
              )}
              >
                {subtitle}
              </div>
            )}
          </div>
          {!!imgUrl && (
            <div className={styles.imgWrapper}>
              <img src={imgUrl} className={styles.img} alt="Preset" />
            </div>
          )}
        </div>

      )}
      <div className={styles.inner}>
        {children}
      </div>
    </div>
  );
}

export default PageWrapper;
