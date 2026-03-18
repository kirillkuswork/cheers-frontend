/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useState } from 'react';
import { SectionInfoBlock } from '@/widgets/About';
import {
  PhoneVideo, SectionBonus,
} from '@/shareds';
import { IBasedSlidePageProps } from '@/consts/globalTypes';
import { useCurrentBreakpoint } from '@/shareds/providers/BreakpointContext';
import { SectionTitle, SectionWrapper } from '@/entities/About';
import { BarcodeIcn, CouchIcn, ThumbIcn } from './icons';
import styles from './styles.module.scss';

function SommelierSection({ isVisible }: IBasedSlidePageProps) {
  // const [showAnimation, setShowAnimation] = useState(false);
  // const breakpoint = useCurrentBreakpoint();
  // const isStatic = useMemo(() => breakpoint !== 'lg' && breakpoint !== 'xl', [breakpoint]);
  // const appearAnimation = showAnimation ? styles.appearAnimation : '';
  // useEffect(() => {
  //   if (isVisible === undefined || isStatic) return;
  //   setShowAnimation(isVisible);
  // }, [isVisible, isStatic]);

  // useEffect(() => {
  //   if (isVisible === undefined) return;
  //   setShowAnimation(isVisible);
  // }, [isVisible]);
  return (
    <SectionWrapper id="sommelier" showButton>
      <SectionTitle className={styles.titleAnimation}>
        Ваш сомелье
      </SectionTitle>
      <div className={styles.wrapper}>
        <SectionInfoBlock
          title="Когда не разбираетесь
          в алкоголе или просто лень искать
          и выбирать"
          text="Поможем быстро выбрать качественный и вкусный напиток под ваш вкус,
          чтобы вы провели вечер
          с удовольствием"
          animationClassname={styles.appearAnimation}
        />
        <PhoneVideo isPlay />
        <div className={styles.bonuses}>
          <SectionBonus
            icon={<BarcodeIcn />}
            title="В магазине"
            text="Выберите самое вкусное
            качественное из ассортимента, просто наведя камеру
            на этикетку"
            animationClassname={styles.appearAnimation}
          />
          <SectionBonus
            icon={<CouchIcn />}
            title="На диване"
            text="Каталог с тысячами позиций, удобными подборками
            и рекомендациями в вашем смартфоне"
            animationClassname={styles.appearAnimation}
          />
          <SectionBonus
            icon={<ThumbIcn />}
            title="Мнения экспертов"
            text="Сообщество профессиональных сомелье регулярно оценивают напитки и делятся своими вкусовыми ощущениями"
            animationClassname={styles.appearAnimation}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

export default SommelierSection;
