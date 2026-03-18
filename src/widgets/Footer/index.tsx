/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/control-has-associated-label */
import clsx from 'clsx';
import Link from 'next/link';
import {
  APP_STORE,
  GOOGLE_PLAY,
  RU_STORE,
} from '@/shareds/consts/links';
import useBreakpoint from '@/shareds/hooks/useBreakpoint';
import styles from './styles.module.scss';
import TelegramIcn from './TelegramIcn.svg';
import Logo from './Logo.svg';
import AppStoreIcn from './AppStoreIcn.svg';
import RuStoreIcn from './RuStoreIcn.svg';
import PlayMarketIcn from './PlayMarketIcn.svg';

function Footer() {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'xs';

  return (
    <div className={styles.footer_contrainer}>
      <div className={styles.footer}>
        {/* <Widget id="WXLZXU4p" className={styles.myForm} /> */}
        <Link
          className={clsx(styles.psBtn, styles.tgBtn)}
          href="https://t.me/cheers_for_all"
          target="_blank"
        >
          <span>Мы в telegram</span>
          {!isMobile && (
            <TelegramIcn />
          )}
        </Link>
        <div className={styles.logoContainer}><Logo /></div>
        <Link
          className={clsx(styles.psBtn, styles.appStore)}
          href={APP_STORE}
          target="_blank"
        >
          <AppStoreIcn />
        </Link>
        <Link
          className={clsx(styles.psBtn, styles.ruStore)}
          href={RU_STORE}
          target="_blank"
        >
          <RuStoreIcn />
        </Link>
        <Link
          className={clsx(styles.psBtn, styles.playMarket)}
          href={GOOGLE_PLAY}
          target="_blank"
        >
          <PlayMarketIcn />
        </Link>
        <div className={styles.info}>
          ООО «Кибер-Ром», 125212, г. Москва, вн. тер. г. муниципальный
          округ Головинский, б-р Кронштадтский, д. 6, к. 4, помещ. 104, ком. 1В
          © 2024, Cheers
        </div>
        <div />
        <div className={clsx(styles.info, styles.links)}>
          {/* href="/view/security_policy" */}
          <Link className={styles.link} target="_blank" href="view/user_agreement_on_handle_pd">Согласие на обработку ПД</Link>
          <Link className={styles.link} target="_blank" href="view/user_agreement">Пользовательское соглашение</Link>
          <Link className={styles.link} target="_blank" href="view/security_policy">Политика конфиденциальности</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
