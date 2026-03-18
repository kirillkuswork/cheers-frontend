import { FC, useMemo } from 'react';
import { Portal } from '@/shareds/utils/components';
import { MobileNavHeaderItem } from '@/shareds/ui/MobileNavHeaderItem';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/router';
import { useShowUserInfo } from '@/shareds/hooks/useShowUserInfo';
import styles from './styles.module.scss';
import { MOBILE_NAV_ITEMS as initialMobileNavItems } from '../constants';
import { FavoriteItem } from '../MainBlock/FavouriteItem';

interface IMobileNavigationProps {
  showMenu: boolean;
  setOpenModal?: (param: boolean) => void;
  setShowMenu?: (param: boolean) => void;
}
export const MobileNavigation: FC<IMobileNavigationProps> = ({ showMenu, setOpenModal, setShowMenu }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const userInfo = useShowUserInfo(user);
  const getMobileNavItem = useMemo(() => initialMobileNavItems.map((item) => {
    if (item.text === 'Выйти') {
      return {
        ...item,
        onClick: () => {
          logout();
        },
        isHidden: !isAuthenticated,
      };
    }
    if (item.text === 'Войти') {
      return { ...item, text: userInfo, onClick: () => (user ? () => {} : setOpenModal?.(true)) };
    }
    return item;
  }), [isAuthenticated, logout, setOpenModal, user, userInfo]);

  return (
    <Portal isModalOpen={showMenu}>
      <div className={styles.mobileNav}>
        {getMobileNavItem.map(({
          id, text, href, target, icon, onClick, isHidden,
        }) => {
          const handleOnClick = () => {
            if (target === '_blank') {
              return;
            }
            router.push(href);
            setShowMenu!(false);
          };
          if (isHidden) return null;
          if (text === 'Избранное') return <FavoriteItem key={`${id}_${isHidden}`} />;
          return (
            <MobileNavHeaderItem
              key={`${id}_${isHidden}`}
              text={text}
              href={href}
              target={target}
              icon={icon}
              onClick={onClick || handleOnClick}
            />
          );
        })}
      </div>
    </Portal>
  );
};
