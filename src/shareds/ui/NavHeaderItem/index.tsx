import Link from 'next/link';
import { HTMLAttributeAnchorTarget } from 'react';
import styles from './styles.module.scss';

interface INavHeaderItemProps {
  text: string;
  href: string;
  target?: HTMLAttributeAnchorTarget,
}

function NavHeaderItem({
  text, href, target = '_self',
}: INavHeaderItemProps) {
  return (
    <Link
      className={styles.item}
      href={href}
      aria-label={`Навигация на ${text}`}
      target={target}
    >
      {text}
    </Link>
  );
}

export default NavHeaderItem;
