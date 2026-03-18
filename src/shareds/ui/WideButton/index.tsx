import clsx from 'clsx';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { TG_BOT_URL, APP_STORE, GOOGLE_PLAY } from '@/shareds/consts/links';
import { WideButtonIcn } from '@/assets/icons';
import styles from './styles.module.scss';
import { WideButtonProps } from './types';

function WideButton({
  className,
  onClick,
  text = 'Скачать приложение',
  href,
  disabled,
}: WideButtonProps) {
  const [link, setLink] = useState('');
  useEffect(() => {
    const { userAgent } = navigator;
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      setLink(APP_STORE);
    } else if (/android/i.test(userAgent)) {
      setLink(GOOGLE_PLAY);
    } else {
      setLink(TG_BOT_URL);
    }
  }, []);
  const handleClickOnLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!onClick) return;

    e.preventDefault();
    onClick(e);
  };
  return (
    <Link
      className={clsx(styles.button, className, { [styles.secBtn]: disabled })}
      onClick={handleClickOnLink}
      href={href || link}
      target="_blank"
      aria-label={`Кнопка ${text}`}
    >

      <p>{text}</p>
      {!disabled && (
      <div className={styles.icon}>
        <WideButtonIcn />
      </div>
      )}
    </Link>
  );
}

export default WideButton;
