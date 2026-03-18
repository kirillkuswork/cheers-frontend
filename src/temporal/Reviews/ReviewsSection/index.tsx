import {
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useDynamicId } from '@/temporal/useGetId';
import { useGetMyReviewQuery } from '@/redux/services/productsApi';
import { IMyReview } from '@/redux/services/types/products';
import { authSelectors } from '@/redux/selectors/authSelectors';
import { useSelector } from 'react-redux';
import TasteReviewProperties from './TasteReviewProperties';
import PageHeadReview from './PageHeadReview';
import styles from './styles.module.scss';
import ListReviews from './ListReviews';
import { TTabs } from './types';
import StatisticReview from './StatisticReview';

export const ReviewsSection = () => {
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
        <TasteReviewProperties />
      </div>
      <div className={styles.reviewSection_list}>
        <ListReviews
          productId={productId}
          myReview={getMyReview as IMyReview}
          isHidden={activeTab !== 'users'}
        />
        <ListReviews
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

export default ReviewsSection;
