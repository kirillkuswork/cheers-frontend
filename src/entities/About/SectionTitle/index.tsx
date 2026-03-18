import clsx from 'clsx';
import styles from './styles.module.scss';
import { SectionTitleProps } from './types';

function SectionTitle(
  {
    children,
    className,
  }: SectionTitleProps,
) {
  return (
    <h2 className={clsx(styles.title, className)}>
      {children}
    </h2>
  );
}

export default SectionTitle;
