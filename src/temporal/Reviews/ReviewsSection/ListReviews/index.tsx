/* eslint-disable react/button-has-type */
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ArrayRender } from '@/shareds/utils/components';
import { Button } from '@/shareds/ui';
import { Post } from '@/widgets/Rating';
import { IMyReview, IReviewItem } from '@/redux/services/types/products';
import { useGetReviewsQuery } from '@/redux/services/productsApi';
import { EmptyReviews } from '@/entities/Product';
import { ReviewSkeleton } from '../ReviewListSkeleton';
import styles from './styles.module.scss';

interface IPropsListReviews {
  isExpert?: boolean,
  isHidden: boolean,
  productId: string,
  myReview?: IMyReview,
  onEmpty?: () => void,
}

const ListReviews = ({
  isExpert,
  isHidden,
  productId,
  myReview,
  onEmpty,
}: IPropsListReviews) => {
  const [cursor, setCursor] = useState<string | null>(null);
  const { data, isFetching } = useGetReviewsQuery({
    id: productId,
    cursor,
    limit: 3,
    isExpert: !!isExpert,
  }, { skip: cursor === 'disabled' });
  const renderPostItem = useCallback(
    (props: IReviewItem) => (
      <Post
        key={`${props?.created_at}_Post_${props?.user?.name}_${props?.description}`}
        isExpert={isExpert}
        avatarUrl={props?.user?.avatar_url}
        createdAt={props?.created_at}
        rating={props?.rating}
        name={props?.user?.name}
        description={props?.description}
      />
    ),
    [isExpert],
  );
  const handleClickOnMore = () => {
    if (data) setCursor(data.pagination.cursor);
  };
  useEffect(() => {
    if (data?.pagination?.cursor === 'disabled') setCursor('disabled');
    if (!data?.reviews?.length && onEmpty) onEmpty();
  }, [data, onEmpty]);
  const isShowMyReview = useMemo(() => {
    const isIExpert = myReview?.user?.role_id === 2;
    return (isIExpert && isExpert) || (!isExpert && !isIExpert);
  }, [isExpert, myReview]);
  const isEmpty = useMemo(() => {
    const isEmptyOther = !data?.reviews?.length;
    const isEmptyMy = !myReview || !isShowMyReview;
    return isEmptyMy && isEmptyOther;
  }, [data?.reviews?.length, isShowMyReview, myReview]);
  if (isHidden) return null;
  if (isEmpty && !isFetching) {
    return (
      <EmptyReviews classNames={styles.empty} productId={productId} isExpert={!!isExpert} isHavePermission={isShowMyReview} />
    );
  }
  return (
    <div className={styles.listReviews}>
      { isShowMyReview && myReview && (
      <Post
        isExpert={isExpert}
        avatarUrl={myReview?.user?.avatar_url}
        createdAt={myReview?.created_at}
        rating={myReview?.rating}
        name={myReview?.user?.name}
        description={myReview?.description}
        status={myReview?.status_id}
        myReviewId={myReview?.id}
        isMain
      />
      )}
      <ArrayRender
        items={data?.reviews}
        renderItem={renderPostItem}
      />
      {cursor !== 'disabled' && !isFetching && (
        <Button
          label="Загрузить еще"
          variant="tertiary"
          onClick={handleClickOnMore}
        />
      )}
      {isFetching && <ReviewSkeleton />}
    </div>
  );
};

export default ListReviews;
