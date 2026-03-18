import { PhoneVideo } from '@/shareds';
import { SectionTitle, SectionWrapper } from '@/entities/Partners';
import { SectionInfoBlock } from '@/widgets/Partners';
import styles from './styles.module.scss';
import { FIRST_ITEMS, SECOND_ITEMS } from './constants';

function ShopSection() {
  return (
    <SectionWrapper showButton>
      <SectionTitle
        title="Как Cheers привлекает
        покупателей, которые прямо сейчас ходят по магазинам"
      />
      <div className={styles.wrapper}>

        <SectionInfoBlock
          title="Когда покупатель
          пришёл в магазин"
          items={FIRST_ITEMS}
          className={styles.infoBlock1}
        />

        <PhoneVideo isPartners isPlay isClient />

        <SectionInfoBlock
          title="Если вы
          наш партнёр"
          items={SECOND_ITEMS}
          className={styles.infoBlock2}
          showButton
        />

      </div>
    </SectionWrapper>
  );
}

export default ShopSection;
