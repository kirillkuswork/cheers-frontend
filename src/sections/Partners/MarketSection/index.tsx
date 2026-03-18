import { SectionTitle, SectionWrapper } from '@/entities/Partners';
import styles from './styles.module.scss';
import { BuildingsIcon, StorefrontIcon } from './icons';

function MarketSection() {
  return (
    <SectionWrapper>
      <SectionTitle
        title="Рынок розничной торговли алкоголем в 2023 году"
        className={styles.title}
      />
      <div className={styles.wrapper}>

        <div className={styles.item}>
          <div className={styles.icon}>
            <StorefrontIcon />
          </div>
          <div className={styles.info}>
            <div className={styles.number}>
              2,4
            </div>
            <div className={styles.numberInfo}>
              трлн. ₽
            </div>
          </div>
          <div className={styles.text}>
            объём рынка розничной торговли в 2023 году
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.icon}>
            <BuildingsIcon />
          </div>
          <div className={styles.info}>
            <div className={styles.number}>
              97
            </div>
            <div className={styles.numberInfo}>
              %
            </div>
          </div>
          <div className={styles.text}>
            от объёма принадлежит крупным торговым сетям
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}

export default MarketSection;
