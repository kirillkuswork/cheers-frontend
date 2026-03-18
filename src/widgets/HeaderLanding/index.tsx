import Link from 'next/link';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import NavItem from '@/shareds/ui/NavItem';
import { TG_BOT_URL, APP_STORE, GOOGLE_PLAY } from '@/shareds/consts/links';
import { useCurrentBreakpoint } from '@/shareds/providers/BreakpointContext';
import styles from './styles.module.scss';
import { LogoHeader } from './icons';
import NAV_ITEMS from './constants';

function HeaderLanding() {
  const [prevScrollpos, setPrevScrollPos] = useState(0);
  const [showHeader, setShowHeader] = useState(true);

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

  const breakpoint = useCurrentBreakpoint();

  const isTransparent = prevScrollpos < 100 && breakpoint !== 'xs' && breakpoint !== 'sm';

  const scrollToTop = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.onscroll = () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
      setPrevScrollPos(currentScrollPos);
    };
  }, [prevScrollpos]);

  useEffect(() => {
    setPrevScrollPos(window.scrollY);
  }, []);

  return (
    <header
      className={clsx(
        styles.header,
        !showHeader && styles.headerHidden,
        isTransparent && styles.headerTransparent,
      )}
    >
      <div className={styles.inner}>
        <Link
          className={styles.button}
          href="/"
          aria-label="Вернуться в начало"
          onClick={(event) => scrollToTop(event)}
        >
          <LogoHeader />
        </Link>
        <nav className={styles.nav}>
          {NAV_ITEMS.map(({
            id,
            text,
            href,
            icon,
          }) => (
            <NavItem
              key={id}
              text={text}
              href={id === 3 ? link : href}
              icon={icon}
              target={id === 3 ? '_blank' : '_self'}
            />
          ))}
        </nav>
      </div>
    </header>
  );
}

export default HeaderLanding;
