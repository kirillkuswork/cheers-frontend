import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface IProductCardRateProps {
  icon: ReactNode;
  value: number | null | undefined;
  className?: string;
}
export const ProductCardRate: FC<IProductCardRateProps> = ({
  icon,
  value,
  className,
}) => {
  if (!value) {
    return null;
  }

  return (
    <div className={styles.productCardRate}>
      <div className={styles.icon}>{icon}</div>
      <span className={clsx(styles.title, className)}>{value}</span>
    </div>
  );
};
