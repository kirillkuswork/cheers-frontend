import Link from 'next/link';
import { HTMLAttributeAnchorTarget, ReactNode } from 'react';
import styles from './styles.module.scss';

interface INavItemProps {
  text: string;
  href: string;
  icon?: ReactNode;
  target: HTMLAttributeAnchorTarget,
}

function NavItem({
  text, href, icon, target = '_self',
}: INavItemProps) {
  return (
    <Link
      className={styles.navItem}
      href={href}
      aria-label={`Навигация на ${text}`}
      target={target}
    >
      <span>{text}</span>
      {icon}
    </Link>
  );
}

export default NavItem;
