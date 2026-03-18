/* eslint-disable no-irregular-whitespace */
import { SectionTitle, SectionWrapper } from '@/entities/Partners';
import styles from './styles.module.scss';
import { BombIcon, FlameIcon, SmileySadIcon } from './icons';
import WHY_PARAGRAPHS from './constants';

function WhySection() {
  return (
    <SectionWrapper>
      <SectionTitle
        title="Почему так происходит?"
      />
      <div className={styles.wrapper}>

        <div className={styles.item}>
          <div className={styles.col}>
            <div className={styles.icon}>
              <FlameIcon />
            </div>
            <p className={styles.heading}>
              Боль участников
              рынка алкогольных напитков
            </p>
          </div>
          <div className={styles.col}>
            {WHY_PARAGRAPHS.map((note) => (
              <div key={note} className={styles.note}>
                <div className={styles.defis}>
                  -
                </div>
                <p className={styles.paragraph}>
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.col}>
            <div className={styles.icon}>
              <BombIcon />
            </div>
            <p className={styles.heading}>
              Дорогой, сложный
              и не очень эффективный
              маркетинг
            </p>
          </div>
          <div className={styles.col}>
            <p className={styles.paragraph}>
              Закон о запрете рекламы ограничивает количество
              каналов продвижения и вынуждает привлекать новых
              клиентов через неэффективные и исчерпанные каналы
            </p>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.col}>
            <div className={styles.icon}>
              <SmileySadIcon />
            </div>
            <p className={styles.heading}>
              Мало клиентов
              за большие деньги
            </p>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}

export default WhySection;
