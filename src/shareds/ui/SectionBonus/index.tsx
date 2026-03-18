import clsx from 'clsx';
import styles from './styles.module.scss';
import { SectionBonusProps } from './types';

function SectionBonus({
  icon,
  title,
  text,
  className,
  animationClassname,
}: SectionBonusProps) {
  return (
    <div className={clsx(styles.wrapper, className, animationClassname)}>
      <div className={styles.overflow}>
        <div className={clsx(styles.icon, animationClassname)}>
          {icon}
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.overflow}>
          <div className={clsx(styles.title, animationClassname)}>
            {title}
          </div>
        </div>
        <div className={styles.overflow}>
          <div className={clsx(styles.text, animationClassname)}>
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionBonus;
