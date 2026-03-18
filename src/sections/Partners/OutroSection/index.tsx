import { SectionTitle, SectionWrapper } from '@/entities/Partners';
import { OutroForm } from '@/features/Partners';
import styles from './styles.module.scss';

function OutroSection() {
  return (
    <SectionWrapper className={styles.section}>
      <SectionTitle
        title="Обеспечьте вашему бизнесу рост"
        subtitle="Становитесь партнёром Cheers и получайте новых лояльных платежеспособных клиентов"
        className={styles.title}
      />
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <OutroForm />
        </div>
      </div>
    </SectionWrapper>
  );
}

export default OutroSection;
