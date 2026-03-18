import { Button, Rating } from '@/shareds/ui';
import getNoun from '@/shareds/helpres/getNoun';
import { useGetStatisticForProductQuery } from '@/redux/services/productsApi';
import RatingBlockItems from './RatingBlockItems';
import styles from './styles.module.scss';

interface IProps {
  isExpert?: boolean;
  productId?: string;
  onCrateReview: () => void
}

export const RatingBlock = ({
  isExpert = false,
  productId,
  onCrateReview,
}: IProps) => {
  const { data } = useGetStatisticForProductQuery({
    id: productId,
    is_expers_only: isExpert,
  });
  const { avg_rating: avgRating, total } = data || {};
  const handleNoun = () => getNoun(total || 0, ['оценка', 'оценки', 'оценок']);

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.avgRating}>
          {avgRating || 0}
        </div>
        <div className={styles.topInfo}>
          <Rating ratingValue={avgRating || 0} isExpert={isExpert} />
          <div className={styles.totalRatings}>
            {total || 0}
            {' '}
            {handleNoun()}
          </div>
        </div>
      </div>
      <RatingBlockItems stat={data} />

      <Button
        label="Оставить отзыв"
        onClick={onCrateReview}
      />
    </div>
  );
};

export default RatingBlock;
