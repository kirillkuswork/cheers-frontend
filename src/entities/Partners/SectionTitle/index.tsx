import clsx from 'clsx';
import styles from './styles.module.scss';
import { SectionTitleProps } from './types';

function SectionTitle(
  {
    title,
    subtitle,
    className,
  }: SectionTitleProps,
) {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <h2 className={styles.title}>
        {title}
      </h2>
      {subtitle && (
        <div className={styles.subtitle}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

export default SectionTitle;
