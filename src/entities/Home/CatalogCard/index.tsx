/* eslint-disable import/no-cycle */
import Link from 'next/link';
import clsx from 'clsx';
import { ImgAdaptive } from '@/shareds/ui/ImgAdaptive';
import { IconButton } from '@/shareds';
import { ICatalogCardProps } from '@/entities/Home/CatalogCard/types';
import { ArrowIcon } from './icons';
import styles from './styles.module.scss';

function CatalogCard({
  title,
  className,
  classNameForImage,
  href = '/',
  size = 's',
  img,
  onError,
  backgroundColor,
  secondaryColor,
}: ICatalogCardProps) {
  return (
    <Link
      className={clsx(
        styles.wrapper,
        className,
        size === 'l' && styles.wrapperLarge,
      )}
      style={{
        backgroundColor: backgroundColor || '#F5F7FA',
      }}
      href={href}
    >
      <div
        className={clsx(styles.bgIcon, size === 's' && styles.bgIconLarge)}
        style={{
          backgroundColor: secondaryColor || '#F5F7FA',
        }}
      />
      <div className={styles.inner}>
        <div className={clsx(img ? styles.imgTitle : styles.title)}>{title}</div>
        <IconButton
          size="small"
          className={styles.button}
          icon={<ArrowIcon />}
        />
      </div>
      {img && (
        <ImgAdaptive
          size={size}
          src={img}
          alt="вино"
          className={clsx(styles.img, size === 'l' && styles.largeImg, classNameForImage)}
          onError={onError}
        />
      )}
    </Link>
  );
}

export default CatalogCard;
