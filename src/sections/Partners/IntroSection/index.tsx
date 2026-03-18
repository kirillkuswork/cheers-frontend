import Image from 'next/image';
import { useState } from 'react';
import { ModalTry } from '@/features/About';
import { SectionWrapper } from '@/entities/Partners';
import INTRO_IMAGES from './constants';
import styles from './styles.module.scss';
import { ArrowDownIcon, QuoteIcon } from './icons';

function IntroSection() {
  const [isOpenModal, setIsOpen] = useState(false);

  return (
    <>
      <ModalTry isOpen={isOpenModal} onClose={() => setIsOpen(false)} />
      <SectionWrapper className={styles.section}>
        <div className={styles.wrapper}>
          <div className={styles.intro}>
            <h1 className={styles.title}>
              <div>Cheers:</div>
              <div>опережайте рынок</div>
            </h1>
            <p className={styles.subtitle}>
              Мы помогаем бизнесу, обеспечивая стабильный
              поток новых платежеспособных клиентов
            </p>
            <button
              className={styles.button}
              onClick={() => setIsOpen(true)}
              type="button"
            >
              Подробнее о партнёрстве
            </button>
          </div>

          <div className={styles.quote}>
            <div className={styles.quoteIcon}>
              <QuoteIcon />
            </div>
            <span> Жизнь слишком коротка, чтобы пить невкусный алкоголь </span>
          </div>

          <div className={styles.down}>
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
              src={`/images/intro/partners/intro_${id}.png`}
              width={width}
              height={height}
              alt={`vine ${id}`}
              className={styles.image}
            />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}

export default IntroSection;
