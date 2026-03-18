import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { ModalTry } from '@/features/About';
import { IBasedSlidePageProps } from '@/consts/globalTypes';
import { SectionWrapper } from '@/entities/About';
// import { TG_BOT_URL } from '@/shareds/consts/links';
import { ArrowDownIcon, QuoteIcon } from '../../Partners/IntroSection/icons';
// import { ArrowDownIcon, QuoteIcon } from './icons';
import INTRO_IMAGES from './constants';
import styles from './styles.module.scss';

function IntroSection({ isVisible }: IBasedSlidePageProps) {
  const [isOpenModal, setIsOpen] = useState(false);
  const [showImages, setShowImages] = useState<string>(styles.imageHidden);
  const [showTitle, setShowTitle] = useState<string>(styles.hidden);
  const startAnimation = () => {
    setShowImages('');
    setShowTitle('');
  };
  const endAnimation = () => {
    setShowImages(styles.imageHidden);
    setShowTitle(styles.hidden);
  };
  useEffect(() => {
    if (isVisible === undefined) return;
    if (isVisible) startAnimation();
    else endAnimation();
  }, [isVisible]);

  return (
    <>
      <ModalTry isOpen={isOpenModal} onClose={() => setIsOpen(false)} />
      <SectionWrapper id="intro" className={styles.section}>
        <div className={styles.wrapper}>
          <div className={styles.intro}>
            <h1 className={clsx(styles.title, showTitle)}>
              <div>Cheers:</div>
              <div>выбор напитков</div>
              <div>со вкусом</div>
            </h1>
            <p className={clsx(styles.subtitle, showTitle)}>
              Сервис для поиска, выбора и покупки алкоголя,
              соответствующего вашим предпочтениям и статусу
            </p>
            <Link
              className={styles.button}
              // onClick={() => setIsOpen(true)}
              href="/application"
              type="button"
              aria-label="Скачать приложение"
            >
              Скачать приложение
            </Link>
          </div>

          <div className={clsx(styles.quote, showTitle)}>
            <div className={styles.quoteIcon}>
              <QuoteIcon />
            </div>
            <span> Жизнь слишком коротка, чтобы пить невкусный алкоголь </span>
          </div>

          <div className={clsx(styles.down, showTitle)}>
            <span>Скролльте вниз</span>
            <div className={styles.arrowDownIcon}>
              <ArrowDownIcon />
            </div>
          </div>

          {INTRO_IMAGES.map(({
            id,
            width,
            height,
          }) => (
            <Image
              key={id}
              src={`/images/intro/about/intro_${id}.png`}
              width={width}
              height={height}
              alt={`vine ${id}`}
              className={clsx(
                styles.image,
                showImages,
              )}
            />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}

export default IntroSection;
