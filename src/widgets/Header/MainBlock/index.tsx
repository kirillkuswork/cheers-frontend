/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import {
  FC, useCallback, useEffect, useState,
} from 'react';
import { Button, IconButton } from '@/shareds/ui';
import useBreakpoint from '@/shareds/hooks/useBreakpoint';
import {
  BurgerMenu, CrossIcn, Profile,
} from '@/assets/icons';
import { AuthModal } from '@/widgets/Header/AuthModal';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/router';
import { useShowUserInfo } from '@/shareds/hooks/useShowUserInfo';
import { useActions } from '@/shareds/hooks/useActions';
import { locationActions } from '@/redux/actions/locationActions';
import styles from './styles.module.scss';
import { ButtonIcon, Logo, SmallLogo } from '../icons';
import SearchInput from './SearchInput';
import { FavoriteItem } from './FavouriteItem';

interface IMainBlockProps {
  setShowHeader: (param: boolean) => void;
  setShowMenu: () => void;
  setOpenModal: (param: boolean) => void;
  showMenu: boolean;
  openModal: boolean;
}
export const MainBlock: FC<IMainBlockProps> = ({
  setShowHeader,
  setOpenModal,
  setShowMenu,
  showMenu,
  openModal,
}) => {
  const [prevScrollpos, setPrevScrollPos] = useState(0);
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const { setIsLocationPopupOpen } = useActions(locationActions);

  // const scrollToTop = (event: SyntheticEvent<EventTarget>) => {
  //   event.preventDefault();
  //   window.location.href = '/';
  // };

  useEffect(() => {
    window.onscroll = () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos || currentScrollPos < 100) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
        setIsLocationPopupOpen(false);
      }
      setPrevScrollPos(currentScrollPos);
    };
  }, [prevScrollpos]);

  useEffect(() => {
    setPrevScrollPos(window.scrollY);
  }, []);

  const breakpoint = useBreakpoint();

  const isTablet = breakpoint === 'md';
  const isSmallTablet = breakpoint === 'sm';
  const isMobile = breakpoint === 'xs';
  const isDevice = isMobile || isSmallTablet;

  const loginHandler = () => {
    if (!user) {
      setOpenModal(true);
    }
  };

  const handleToCatalog = useCallback(() => router.push('/'), []);
  const userInfo = useShowUserInfo(user);

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <Link className={styles.logo} href="/" aria-label="Вернуться в начало">
          {isMobile ? <SmallLogo /> : <Logo />}
        </Link>
        {!isDevice && (
          <Button
            icon={<ButtonIcon className={styles.icon} />}
            label={isTablet ? '' : 'Каталог'}
            size="large"
            onClick={handleToCatalog}
          />
        )}
      </div>
      <SearchInput />
      {!isDevice && (
        <div className={styles.rightBlock}>
          <button type="button" onClick={loginHandler} className={styles.item}>
            <Profile />
            <span className={styles.text}>{userInfo}</span>
          </button>

          {isAuthenticated && (
            <button onClick={logout} type="button" className={styles.item}>
              <CrossIcn />
              <span className={styles.text}>Выйти</span>
            </button>
          )}

          <FavoriteItem />
        </div>
      )}
      {isDevice && (
        <IconButton
          onClick={setShowMenu}
          icon={showMenu ? <CrossIcn /> : <BurgerMenu />}
          variant={showMenu ? 'secondary' : 'tertiary'}
        />
      )}
      <AuthModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};
