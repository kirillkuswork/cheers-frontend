import clsx from 'clsx';
import { WideButton } from '@/shareds';
import styles from './styles.module.scss';
import { SectionInfoBlockProps } from './types';

function SectionInfoBlock({
  title,
  text,
  className,
  animationClassname,
  textButton,
  hrefButton,
}: SectionInfoBlockProps) {
  return (
    <div className={clsx(styles.info, className)}>
      <div className={styles.textWrapper}>
        <div className={styles.overflow}>
          <p className={clsx(styles.heading, animationClassname)}>
            {title}
          </p>
        </div>
        <div className={styles.overflow}>
          <p className={clsx(styles.subheading, animationClassname)}>
            {text}
          </p>
        </div>
      </div>
      <div className={clsx(styles.overflow, styles.button)}>
        <WideButton
          className={clsx(
            animationClassname,
            // styles.transparent,
          )}
          text={textButton}
          href={hrefButton}
        />
      </div>
    </div>
  );
}

export default SectionInfoBlock;
