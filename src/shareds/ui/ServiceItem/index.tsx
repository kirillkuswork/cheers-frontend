import clsx from 'clsx';
import styles from './styles.module.scss';
import { ServiceItemProps } from './types';

function ServiceItem({
  icon,
  title,
  text,
  className,
}: ServiceItemProps) {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.icon}>
        {icon}
      </div>
      <div className={styles.title}>
        {title}
      </div>
      <div className={styles.text}>
        {text}
      </div>
    </div>
  );
}

export default ServiceItem;
