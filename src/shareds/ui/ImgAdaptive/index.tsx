/* eslint-disable import/prefer-default-export */
/* eslint-disable react/function-component-definition */
import { FC } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ICatalogCardProps } from '@/entities/Home/CatalogCard/types';
import styles from './styles.module.scss';

interface IImgAdaptiveProps extends Pick<ICatalogCardProps, 'onError' | 'size' | 'className'> {
  src: string;
  alt: string;
}

export const ImgAdaptive: FC<IImgAdaptiveProps> = ({
  src, alt, className, onError, size,
}) => (
  <div className={clsx(size === 'l' ? styles.largeImage : styles.image, className)}>
    <Image
      src={src}
      alt={alt}
      fill
      className={clsx(size === 's' && styles.img)}
      onLoad={(result) => {
        if (result.currentTarget.naturalWidth === 0) {
          onError?.();
        }
      }}
      onError={onError}
    />
  </div>
);
