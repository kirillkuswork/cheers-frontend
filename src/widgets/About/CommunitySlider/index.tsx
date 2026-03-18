import clsx from 'clsx';
import React, { useRef } from 'react';
import Carousel from 'antd/lib/carousel';
import styles from './styles.module.scss';
import { CommunitySliderProps } from './types';
import COMMUNITY_SLIDES from './constants';
import {
  LeftArrowIcon,
  LeftArrowMobileIcon,
  RightArrowIcon,
  RightArrowMobileIcon,
  NavIcon,
  LeftArrowLaptopIcon,
  RightArrowLaptopIcon,
  RightArrowTabletSmallIcon,
  LeftArrowTabletSmallIcon,
} from './icons';

function CommunitySlider({ className, animationTrigger = true }: CommunitySliderProps) {
  const slider = useRef(null);

  return (
    <div className={styles.container}>
      <div className={clsx(
        styles.wrapper,
        className,
        animationTrigger ? styles.sliderAnimation : '',
      )}
      >
        <Carousel
          className={clsx(
            styles.slider,
          )}
          dots={false}
          ref={slider}
        >
          {COMMUNITY_SLIDES.map(({
            id,
            icon,
            title,
            text,
          }) => (
            <div
              key={id}
              className={styles.slide}
            >
              <div className={styles.slide_inner}>
                <div className={styles.icon}>
                  {icon}
                </div>
                <p className={styles.title}>
                  {title}
                </p>
                <p className={styles.text}>
                  {text}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
        <LeftArrowIcon
          className={clsx(
            styles.arrow__leftDesktop,
            animationTrigger ? styles.leftArrowAnimation : '',
          )}
        />
        <RightArrowIcon
          className={clsx(
            styles.arrow__rightDesktop,
            animationTrigger ? styles.rightArrowAnimation : '',
          )}
        />
        <LeftArrowLaptopIcon
          className={clsx(
            styles.arrow__leftLaptop,
            animationTrigger ? styles.rightArrowAnimation : '',
          )}
        />
        <RightArrowLaptopIcon
          className={clsx(
            styles.arrow__rightLaptop,
            animationTrigger ? styles.rightArrowAnimation : '',
          )}
        />
        <LeftArrowTabletSmallIcon className={styles.arrow__leftTabletSmall} />
        <RightArrowTabletSmallIcon className={styles.arrow__rightTabletSmall} />
        <LeftArrowMobileIcon className={styles.arrow__leftMobile} />
        <RightArrowMobileIcon className={styles.arrow__rightMobile} />
        <div className={clsx(
          styles.absoluteText,
          animationTrigger ? styles.buttonsAnimation : '',
        )}
        >
          Лучше попадает
          в желания клиентов
          и увеличивает
          продажи
        </div>
      </div>

      <div className={styles.relativeText}>
        Лучше попадает
        в желания клиентов
        и увеличивает
        продажи
      </div>

      <div className={clsx(
        styles.buttons,
        animationTrigger ? styles.buttonsAnimation : '',
      )}
      >
        <button
          type="button"
          aria-label="prevButton"
          className={styles.button}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick={() => (slider?.current as any)?.prev?.()}
        >
          <NavIcon style={{ minWidth: '6px' }} />
        </button>
        <button
          type="button"
          aria-label="nextButton"
          className={styles.button}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick={() => (slider?.current as any)?.next?.()}
        >
          <NavIcon style={{ minWidth: '6px' }} />
        </button>
      </div>
    </div>
  );
}

export default CommunitySlider;
