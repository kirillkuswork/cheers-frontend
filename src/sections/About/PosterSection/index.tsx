/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { SectionInfoBlock } from '@/widgets/About';
import { PosterTabs } from '@/features/About';
import { IBasedSlidePageProps } from '@/consts/globalTypes';
import { SectionTitle, SectionWrapper } from '@/entities/About';
import styles from './styles.module.scss';

function PosterSection({ isVisible }: IBasedSlidePageProps) {
  // const [showAnimation, setShowAnimation] = useState(false);
  // const appearAnimation = showAnimation ? styles.appearAnimation : '';
  // useEffect(() => {
  //   if (isVisible === undefined) return;
  //   setShowAnimation(isVisible);
  // }, [isVisible]);
  return (
    <SectionWrapper id="poster" showButton>
      <SectionTitle className={styles.titleAnimation}>
        Ваша афиша
      </SectionTitle>
      <div className={styles.wrapper}>
        <SectionInfoBlock
          title="Когда хотите развлечься
          и приобщиться
          к культуре питья"
          text="Расскажем о всех культурных мероприятиях,
          дегустациях и важных событиях в мире алкоголя,
          чтобы вы весело провели время и поняли свои вкусы"
          animationClassname={styles.appearAnimation}
        />
        <div
          className={clsx(
            styles.tabs,
            styles.tabsAnimation,
          )}
        >
          <PosterTabs />
        </div>
      </div>
    </SectionWrapper>
  );
}

export default PosterSection;
