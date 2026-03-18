import { FC } from 'react';
import clsx from 'clsx';
import { Expert, Star } from '@/shareds/assets/icons';
import { ProductCardRate } from '@/shareds/ui';
import styles from './styles.module.scss';

interface IProps {
  title: string | undefined,
  ratingCustomer: number | null | undefined;
  ratingExpert: number | null | undefined;
  className?: string;
}

export const MainSectionTitle: FC<IProps> = ({
  title,
  ratingCustomer,
  ratingExpert,
  className,
}) => (
  <div className={clsx(styles.wrapper, className)}>
    {(!!ratingExpert || !!ratingCustomer) && (
      <div className={styles.heading}>
        <div className={styles.ratingWrapper}>
          {!!ratingExpert && (
            <div className={styles.rating}>
              Экперты
              <ProductCardRate
                icon={<Expert />}
                value={ratingExpert}
                className={styles.ratingValue}
              />
            </div>
          )}
          {!!ratingCustomer && (
            <div className={styles.rating}>
              Покупатели
              <ProductCardRate
                icon={<Star />}
                value={ratingCustomer}
                className={styles.ratingValue}
              />
            </div>
          )}
        </div>
      </div>
    )}
    <div className={styles.title}>
      {title}
    </div>
  </div>
);
