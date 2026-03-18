import {
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useDynamicId } from '@/temporal/useGetId';
import { useGetMyReviewQuery } from '@/redux/services/productsApi';
import { authSelectors } from '@/redux/selectors/authSelectors';
import { useSelector } from 'react-redux';
import { TTabs } from '@/temporal/Reviews/ReviewsSection/types';
import SliderReviews from '@/temporal/Reviews/ReviewsSection/SliderReviews';
import StatisticReview from '@/temporal/Reviews/ReviewsSection/StatisticReview';
import PageHeadReview from '@/temporal/Reviews/ReviewsSection/PageHeadReview';
import { IMyReview } from '@/redux/services/types/products';
import styles from './styles.module.scss';

export const RatingSection = () => {
  const [isFirstEmpty, setIsFirstEmty] = useState(true);
  const { isAuthenticated } = useSelector(authSelectors);
  const productId = useDynamicId();
  const [activeTab, setActiveTab] = useState<TTabs>('experts');
  const { data: myReview, error } = useGetMyReviewQuery(productId || '', { skip: !productId || !isAuthenticated });
  const getMyReview = useMemo(() => {
    if (!error) return myReview;
    return null;
  }, [myReview, error]);
  const handleEmptyExperts = useCallback(() => {
    if (!isFirstEmpty) return;
    setIsFirstEmty(false);
    setActiveTab('users');
  }, [isFirstEmpty]);
  if (!productId) return <div>Loading</div>;
  return (
    <div className={styles.reviewSection}>
      <div className={styles.reviewSection_head}>
        <PageHeadReview
          activeTab={activeTab}
          isSmallTitle
          productId={productId}
          onChangeTab={setActiveTab}
        />
      </div>
      <div className={styles.reviewSection_stat}>
        <StatisticReview
          productId={productId}
          activeTab={activeTab}
          myReviewId={getMyReview?.id}
          myReview={getMyReview as IMyReview}
        />
      </div>
      <div className={styles.reviewSection_list}>
        <SliderReviews
          productId={productId}
          myReview={getMyReview as IMyReview}
          isHidden={activeTab !== 'users'}
        />
        <SliderReviews
          isExpert
          productId={productId}
          myReview={getMyReview as IMyReview}
          isHidden={activeTab !== 'experts'}
          onEmpty={handleEmptyExperts}
        />
      </div>
    </div>
  );
};

export default RatingSection;
