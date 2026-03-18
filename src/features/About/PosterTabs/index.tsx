import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import styles from './styles.module.scss';

export const POSTER_TABS = [
  {
    id: 0,
    name: 'Дегустации',
    title: 'Зачем останавливаться на чем‑то одном, если можно попробовать разное?',
    text: 'Cheers знает, как вам определиться с предпочтениями',
  },
  {
    id: 1,
    name: 'Выставки',
    title: 'Культура питья — прежде всего культура',
    text: 'Знакомьтесь с историей производителей и выбирайте тех, кто соответствует вашему вкусу',
  },
  {
    id: 2,
    name: 'Важные события',
    title: 'Будьте всегда в курсе происходящего в индустрии',
    text: 'И станьте настоящим экспертом',
  },
];
function PosterTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const changeTab = (id: number) => {
    setActiveTab(id);
  };

  return (
    <div className={styles.tabs}>
      <Image
        src={`/images/poster-tabs/tab_${activeTab + 1}.jpg`}
        alt=""
        className={styles.background}
        width={893}
        height={750}
      />
      <div className={styles.nav}>
        {POSTER_TABS?.map(({ id, name }) => (
          <button
            key={`${id}_poster`}
            className={clsx(
              styles.navItem,
              activeTab === id && styles.navItem_active,
            )}
            onClick={() => changeTab(id)}
            type="button"
          >
            {name}
          </button>
        ))}
      </div>
      <div className={styles.info}>
        <p className={styles.title}>
          {POSTER_TABS[activeTab]?.title}
        </p>
        <p className={styles.text}>
          {POSTER_TABS[activeTab]?.text}
        </p>
      </div>
    </div>
  );
}

export default PosterTabs;
