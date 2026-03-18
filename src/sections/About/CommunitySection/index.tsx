/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { CommunitySlider, SectionInfoBlock } from '@/widgets/About';
import { SectionTitle, SectionWrapper } from '@/entities/About';
import styles from './styles.module.scss';

interface IProps {
  isVisible?: boolean;
}
function CommunitySection({ isVisible }: IProps) {
  // const [showAnimation, setShowAnimation] = useState(false);
  // const appearAnimation = showAnimation ? styles.appearAnimation : '';
  // useEffect(() => {
  //   if (isVisible === undefined) return;
  //   setShowAnimation(isVisible);
  // }, [isVisible]);
  return (
    <SectionWrapper id="community" showButton>
      <SectionTitle className={styles.titleAnimation}>
        Ваше сообщество
      </SectionTitle>
      <div className={styles.wrapper}>
        <SectionInfoBlock
          title="Когда хотите формировать культуру"
          text="Станьте частью сообщества экспертов,
           производителей, продавцов и покупателей.
           Влияйте на качество продуктов и направляйте рынок вместе"
          animationClassname={styles.appearAnimation}
          hrefButton="/partners"
          textButton="Подробнее о партнерстве"
        />
        <CommunitySlider />
        <div className={styles.dummy} />
      </div>
    </SectionWrapper>
  );
}

export default CommunitySection;
