import { SectionTitle, SectionWrapper } from '@/entities/Partners';
import { SectionInfoBlock } from '@/widgets/Partners';
import Image from 'next/image';
import styles from './styles.module.scss';
import { FIRST_ITEMS, SECOND_ITEMS } from './constants';
import { BlackTooltip, RedTooltip } from './icons';

function BusinessSection() {
  return (
    <SectionWrapper showButton>
      <SectionTitle
        title="Cheers может помочь вашему бизнесу расти на 15-50% в год?"
        subtitle="по опыту аналогичных сервисов в других странах"
      />
      <div className={styles.wrapper}>

        <SectionInfoBlock
          title="У нас есть"
          items={FIRST_ITEMS}
          className={styles.infoBlock1}
        />

        <div className={styles.imageWrapper}>
          <Image
            src="/images/phone.png"
            alt="phone"
            width={350}
            height={748}
            className={styles.img}
          />
          <div className={styles.blackTooltip}>
            <BlackTooltip />
          </div>
          <div className={styles.redTooltip}>
            <RedTooltip />
          </div>
        </div>

        <SectionInfoBlock
          title="Мы готовы"
          items={SECOND_ITEMS}
          showButton
          className={styles.infoBlock2}
        />

      </div>
    </SectionWrapper>
  );
}

export default BusinessSection;
