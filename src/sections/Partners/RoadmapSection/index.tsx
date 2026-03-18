import { SectionTitle, SectionWrapper } from '@/entities/Partners';
import { RoadmapItem } from '@/shareds/ui';
import { useMemo, useState } from 'react';
import styles from './styles.module.scss';
import ROADMAP_ITEMS from './constants';
import { LogoIcon, LogoIconMobile } from './icons';

function RoadmapSection() {
  const [centerId, setCenterId] = useState(1);
  const iconPosititon = useMemo(() => {
    if (centerId === 1) {
      return 0;
    }
    if (centerId === 2) {
      return 33;
    }
    if (centerId === 3) {
      return 66;
    }
    if (centerId === 4) {
      return 100;
    }

    return 0;
  }, [centerId]);
  return (
    <SectionWrapper className={styles.section} id="RoadMapSection">
      <SectionTitle
        title="Дорожная карта Cheers"
        subtitle="У нас уже есть инвесторы — мы с вами надолго"
      />
      <div className={styles.wrapper}>

        {ROADMAP_ITEMS.map(({
          id,
          title,
          items,
        }) => (
          <RoadmapItem
            key={id}
            id={id}
            title={title}
            items={items}
            onCenter={() => {
              setCenterId(id);
            }}
          />
        ))}

        <div className={styles.map}>
          <div className={styles.line} />
          {ROADMAP_ITEMS.map(({ id }) => <span key={id} className={styles.dot} />)}
          <div className={styles.iconDesktop} style={{ top: `${iconPosititon}%` }} id="roadmap-icon">
            <LogoIcon />
          </div>
        </div>
      </div>

      <div className={styles.iconMobile}>
        <LogoIconMobile />
      </div>
    </SectionWrapper>
  );
}

export default RoadmapSection;
