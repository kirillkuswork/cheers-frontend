/* eslint-disable import/prefer-default-export */
import { NavHeaderItem } from '@/shareds/ui';
import { TG_BOT_URL } from '@/shareds/consts/links';
import { NAV_ITEMS } from '@/widgets/Header/constants';
// import { HeaderLocation } from '@/features/Header';
import styles from './styles.module.scss';

export function TopNavigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navCol}>
        {/* <HeaderLocation /> */}
        <NavHeaderItem
          text="@cheers_support"
          href={TG_BOT_URL}
          target="_blank"
        />
      </div>
      <div className={styles.navCol}>
        {NAV_ITEMS.map(({ id, text, href }) => (
          <NavHeaderItem key={id} text={text} href={href} target="_self" />
        ))}
      </div>
    </nav>
  );
}
