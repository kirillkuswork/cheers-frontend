import { Logo } from '@/widgets/Header/icons';
import Link from 'next/link';
import { Profile } from '@/assets/icons';
import { MenuItem } from '@/admin/components/Header/MenuItem';
import { useAuth } from '@/providers/AuthProvider';
import { useShowUserInfo } from '@/shareds/hooks/useShowUserInfo';
import styles from './styles.module.scss';

export const Header = () => {
  const { user } = useAuth();
  const userInfo = useShowUserInfo(user);
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Logo className={styles.logo} />
        <nav className={styles.nav}>
          <span>Модерация оценок</span>
          <Link href="/admin/products">Управление товарами</Link>
        </nav>
        <div className={styles.menuItems}>
          <MenuItem icon={<Profile />} text={userInfo} />
        </div>
      </div>
    </header>
  );
};
