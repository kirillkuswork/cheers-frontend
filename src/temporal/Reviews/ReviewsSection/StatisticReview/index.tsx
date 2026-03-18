import React, { useCallback, useMemo, useState } from 'react';
import { Button, Rating } from '@/shareds/ui';
import getNoun from '@/shareds/helpres/getNoun';
import RatingModalController from '@/temporal/ModalController';
import { useGetStatisticForProductQuery } from '@/redux/services/productsApi';
import { IMyReview } from '@/redux/services/types/products';
import RatingBlockItems from '@/features/Rating/RatingBlock/RatingBlockItems';
import { TTabs } from '../types';
import styles from './styles.module.scss';

interface IPropsStatisticReview {
  productId: string,
  activeTab: TTabs,
  myReviewId?: number,
  myReview?: IMyReview,
}

const StatisticReview = ({
  productId, activeTab, myReview, myReviewId,
}: IPropsStatisticReview) => {
  const [isOpenRating, setIsOpenRating] = useState(false);
  const { data, isFetching, isError } = useGetStatisticForProductQuery({
    id: productId,
    is_expers_only: activeTab === 'experts',
  });

  const buttonLabel = useMemo(() => (myReviewId ? 'Изменить отзыв' : 'Оставить отзыв'), [myReviewId]);
  const isExpert = useMemo(() => activeTab === 'experts', [activeTab]);
  const noun = useMemo(() => getNoun(data?.total || 0, ['оценка', 'оценки', 'оценок']), [data]);

  const handleCloseModalRating = useCallback(() => setIsOpenRating(false), []);
  const handleOpenModalRating = useCallback(() => setIsOpenRating(true), []);
  if (isFetching) return <div />;
  if (!data || isError) return <div>При Загрузке произошла ошибка</div>;
  if (!data['1'] && !data['2'] && !data['4'] && !data['3'] && !data['5']) return null;
  return (
    <div className={styles.statisticReview}>
      <RatingModalController
        isOpen={isOpenRating}
        productId={productId}
        myReviewId={myReviewId}
        myReview={myReview}
        onClose={handleCloseModalRating}
      />
      <div className={styles.top}>
        <div className={styles.avgRating}>
          {data.avg_rating || 0}
        </div>
        <div className={styles.topInfo}>
          <Rating ratingValue={data.avg_rating || 0} isExpert={isExpert} />
          <div className={styles.totalRatings}>
            {data.total || 0}
            {' '}
            {noun}
          </div>
        </div>
      </div>
      <RatingBlockItems stat={data} />

      <Button
        label={buttonLabel}
        onClick={handleOpenModalRating}
      />
    </div>
  );
};

export default React.memo(StatisticReview);
