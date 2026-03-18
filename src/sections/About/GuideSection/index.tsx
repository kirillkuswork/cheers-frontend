import { SectionInfoBlock } from '@/widgets/About';
import {
  PhoneVideo, SectionBonus,
} from '@/shareds';
import { SectionTitle, SectionWrapper } from '@/entities/About';
import { SealPercentIcn, MapPinIcn, BeerBottleIcn } from './icons';
import styles from './styles.module.scss';

function GuideSection() {
  return (
    <SectionWrapper id="guide" showButton>
      <SectionTitle className={styles.titleAnimation}>
        Ваш гид
      </SectionTitle>
      <div className={styles.wrapper}>
        <SectionInfoBlock
          title="Когда вы выбираете алкогольный напиток"
          text="Поможем быстро найти
          и выгодно купить,
          чтобы вы не тратили своё драгоценное время
          на поиски подходящего напитка"
          animationClassname={styles.appearAnimation}
        />
        <PhoneVideo isPlay />
        <div className={styles.bonuses}>
          <SectionBonus
            icon={<MapPinIcn />}
            title="Ближайшие магазины"
            text="Выбирайте лучшее только из ассортимента магазинов рядом с вами"
            animationClassname={styles.appearAnimation}
          />
          <SectionBonus
            icon={<BeerBottleIcn />}
            title="Редкие напитки"
            text="Находите и пробуйте то,
            что давно хотели, но не могли найти где купить"
            animationClassname={styles.appearAnimation}
          />
          <SectionBonus
            icon={<SealPercentIcn />}
            title="Скидки и акции"
            text="Выгодные предложения на ваши любимые напитки"
            animationClassname={styles.appearAnimation}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

export default GuideSection;
