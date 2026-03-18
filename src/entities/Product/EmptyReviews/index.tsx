import { useState } from 'react';
import { Button } from '@/shareds/ui';
import RatingModalController from '@/temporal/ModalController';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface IProps {
  isHavePermission: boolean,
  productId: string,
  isExpert: boolean,
  classNames?: string,
}
const EXPERT_TEXT = 'Эксперты еще не оценили этот товар';
const USER_TEXT = 'Пользователи еще не оценили этот товар';

export const EmptyReviews = ({
  productId, isExpert, isHavePermission, classNames,
}: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const text = isExpert ? EXPERT_TEXT : USER_TEXT;
  return (
    <div className={clsx(styles.emptyBlock, classNames)}>
      <RatingModalController productId={productId} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div>Здесь пока нет оценок</div>
      <div>{text}</div>
      <div>
        {isHavePermission && <Button className={styles.btn} onClick={() => setIsOpen(true)} variant="tertiary" label="Оставить отзыв" />}
      </div>
    </div>
  );
};
