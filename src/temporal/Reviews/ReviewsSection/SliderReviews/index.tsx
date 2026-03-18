import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { SliderPost } from '@/widgets/Rating/SliderPost';
import { IMyReview, IReviewItem } from '@/redux/services/types/products';
import { useGetReviewsQuery } from '@/redux/services/productsApi';
import { EmptyReviews } from '@/entities/Product';
import styles from './styles.module.scss';

interface IPropsListReviews {
  isExpert?: boolean,
  isHidden: boolean,
  productId: string,
  myReview: IMyReview,
  onEmpty?: () => void,
}

const SliderReviews = ({
  isExpert,
  isHidden,
  productId,
  myReview,
  onEmpty,
}: IPropsListReviews) => {
  const [currentPost, setCurrentPost] = useState(0);
  const [cursor, setCursor] = useState<string | null>(null);
  const { data, isFetching } = useGetReviewsQuery({
    id: productId,
    cursor,
    limit: 4,
    isExpert: !!isExpert,
  }, { skip: cursor === 'disabled' });
  const isShowMyReview = useMemo(() => {
    const isIExpert = myReview?.user?.role_id === 2;
    return (isIExpert && isExpert) || (!isExpert && !isIExpert);
  }, [isExpert, myReview]);
  const handleGoNext = useCallback(() => {
    setCurrentPost((prev) => {
      if (data?.reviews[prev + 1]) return prev + 1;
      return prev;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPost, data]);
  const handleGoPrev = useCallback(() => {
    setCurrentPost((prev) => {
      if (data?.reviews[prev - 1]) return prev - 1;
      return prev;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPost, data]);
  useEffect(() => {
    if (data?.pagination?.cursor === 'disabled') setCursor('disabled');
    if (!data?.reviews?.length && onEmpty) onEmpty();
  }, [data, onEmpty]);

  const isEmpty = useMemo(() => {
    const isEmptyOther = !data?.reviews?.length;
    const isEmptyMy = !myReview || !isShowMyReview;
    return isEmptyMy && isEmptyOther;
  }, [data?.reviews?.length, isShowMyReview, myReview]);
  const renderPostItem = useCallback(
    (props: IReviewItem, index: number) => (
      <SliderPost
        key={`${props?.description}_${props?.created_at}_slider`}
        isExpert={isExpert}
        avatarUrl={props?.user?.avatar_url}
        createdAt={props?.created_at}
        rating={props?.rating}
        name={props?.user?.name}
        description={props?.description}
        havePrev={isShowMyReview && myReview && index === 1 ? true : !!data?.reviews?.[index - 1]}
        haveNext={!!data?.reviews?.[index + 1]}
        goNext={handleGoNext}
        goPrev={handleGoPrev}
      />
    ),
    [data?.reviews, handleGoNext, handleGoPrev, isExpert, isShowMyReview, myReview],
  );
  const getListPosts = useMemo(() => {
    if (!data?.reviews?.length && !(isShowMyReview && myReview)) return [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let listReviews: any = [];
    if (data?.reviews?.length) listReviews = (data || []).reviews?.map((item, index) => renderPostItem(item, isShowMyReview && myReview ? index + 1 : index));
    return isShowMyReview && myReview ? [
      (<SliderPost
        key="firstPostMyPost_slider"
        isExpert={isExpert}
        avatarUrl={myReview?.user?.avatar_url}
        createdAt={myReview?.created_at}
        rating={myReview?.rating}
        name={myReview?.user?.name}
        description={myReview?.description}
        status={myReview?.status_id}
        myReviewId={myReview?.id}
        isMain
        havePrev={false}
        haveNext={!!data?.reviews?.length}
        goNext={() => setCurrentPost(1)}
        goPrev={() => null}
      />),
      ...listReviews,
    ] : listReviews;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.reviews, isExpert, isShowMyReview, myReview, renderPostItem]);
  useEffect(() => {
    if (cursor === 'disabled' || !data) return;
    if (currentPost > getListPosts.length - 3) setCursor(data.pagination.cursor);
  }, [currentPost, cursor, data, getListPosts]);
  if (isHidden) return null;
  if (isEmpty && !isFetching) {
    return (
      <div className={styles.wrapper}>
        <EmptyReviews classNames={styles.empt} productId={productId} isExpert={!!isExpert} isHavePermission={isShowMyReview} />
      </div>
    );
  }

  return (
    <div className={styles.listReviews}>
      {getListPosts[currentPost]}
    </div>
  );
};

export default SliderReviews;
