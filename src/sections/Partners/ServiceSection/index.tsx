import { SectionTitle, SectionWrapper } from '@/entities/Partners';
import { ServiceItem } from '@/shareds/ui';
import styles from './styles.module.scss';
import SERVICE_ITEMS from './constants';

function ServiceSection() {
  return (
    <SectionWrapper showButton>
      <SectionTitle
        title="Cheers  — это сервис"
        subtitle="с технологиями на основе искусственного интеллекта
        и командой специалистов"
      />
      <div className={styles.wrapper}>

        {SERVICE_ITEMS.map(({
          id,
          icon,
          title,
          text,
        }) => (
          <ServiceItem
            key={id}
            title={title}
            text={text}
            icon={icon}
          />
        ))}

      </div>
    </SectionWrapper>
  );
}

export default ServiceSection;
