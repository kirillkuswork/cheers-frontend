import Link from 'next/link';
import { HTMLAttributeAnchorTarget, ReactNode } from 'react';
import { IconButton } from '@/shareds/ui';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface IMobileNavHeaderItemProps {
  text: string;
  href: string;
  target?: HTMLAttributeAnchorTarget;
  icon?: ReactNode;
  onClick?: () => void;
}

export const MobileNavHeaderItem = ({
  text,
  href,
  target = '_self',
  icon,
  onClick,
}: IMobileNavHeaderItemProps) => {
  const Component = onClick && target !== '_blank' ? 'button' : Link;

  return (
    <Component
      className={clsx(styles.item, icon ? styles.mainItem : styles.subItem)}
      href={onClick && target !== '_blank' ? '' : href}
      aria-label={`Навигация на ${text}`}
      target={target}
      onClick={onClick}
    >
      {text}
      {' '}
      <IconButton className={styles.button} icon={icon} variant="tertiary" />
    </Component>
  );
};
