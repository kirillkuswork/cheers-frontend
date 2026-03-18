import { PhoneVideo } from '@/shareds';
import { SectionTitle, SectionWrapper } from '@/entities/Partners';
import { SectionInfoBlock } from '@/widgets/Partners';
import styles from './styles.module.scss';
import { FIRST_ITEMS, SECOND_ITEMS } from './constants';

function InternetSection() {
  return (
    <SectionWrapper showButton>
      <SectionTitle
        title="Как Cheers привлекает покупателей, которые ищут напитки в интернете"
      />
      <div className={styles.wrapper}>

        <SectionInfoBlock
          title="Когда покупатель ищет напиток
          в интернете, он придёт в Cheers за"
          items={FIRST_ITEMS}
          className={styles.infoBlock1}
        />

        <PhoneVideo isPlay />

        <SectionInfoBlock
          title="Если вы
          наш партнёр"
          items={SECOND_ITEMS}
          className={styles.infoBlock2}
          showButton
        />

      </div>
    </SectionWrapper>
  );
}

export default InternetSection;
