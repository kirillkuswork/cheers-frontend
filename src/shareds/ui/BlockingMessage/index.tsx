import React, { FC } from 'react';
import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';
import styles from './styles.module.scss';
import Button from '../Button';

interface BlockingMessageProps {
  title?: string;
  subtitle?: string;
  className?: string;
  imageClassName?: string;
  buttonLabel?: string,
  image?: StaticImageData
  showButton?: boolean
  onClick?: () => void,
  type?: 'reload',
}

export const BlockingMessage: FC<BlockingMessageProps> = ({
  title = 'Не удалось загрузить',
  subtitle = 'Попробуйте обновить страницу или зайти позже',
  className,
  imageClassName,
  image,
  showButton,
  buttonLabel = 'Обновить',
  onClick,
  ...props
}) => {
  const handleOnClick = () => {
    if (onClick) {
      onClick?.();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={clsx(styles.wrapper, className)} {...props}>
      {image && (
        <div className={styles.imgWrapper}>
          <Image
            fill
            className={clsx(styles.img, imageClassName)}
            src={image}
            alt="Картинка"
          />
        </div>
      )}
      {Boolean(title) && <div className={styles.title}>{title}</div>}
      {Boolean(subtitle) && <div className={styles.subtitle}>{subtitle}</div>}
      {showButton && buttonLabel && (
        <Button
          label={buttonLabel}
          onClick={handleOnClick}
          className={styles.button}
          variant="secondary"
        />
      )}
    </div>
  );
};

export default BlockingMessage;
