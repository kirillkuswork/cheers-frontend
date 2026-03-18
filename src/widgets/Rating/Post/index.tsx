import {
  Avatar, Rating,
  TextShowMore,
} from '@/shareds/ui';
import { ReactNode, useMemo, useState } from 'react';
import { formatToDDMONTHYYYY } from '@/shareds/helpres/formatTime';
import { useDeleteReviewMutation } from '@/redux/services/productsApi';
import { PostKebab } from '@/features/Rating';
import styles from './styles.module.scss';

interface IPostHeadingProps {
  myReviewId?: number;
  isExpert?: boolean;
  isMain?: boolean;
  avatarUrl: string | null;
  createdAt: string;
  rating: number;
  name: string;
  description: string | null;
  status?: number;
  children?: ReactNode,
}
const listStatusDivs = [
  null,
  <div key="mod_rev" className={styles.modareate}>На рассмотрении</div>,
  null,
  <div key="rej_rev" className={styles.rejected}>Отзыв откланен</div>,
];
const Post = ({
  isExpert,
  myReviewId,
  isMain,
  status,
  avatarUrl = '',
  createdAt = '',
  rating = 0,
  name = '',
  description = '',
  children,
}: IPostHeadingProps) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [deletePost] = useDeleteReviewMutation();
  const handleDelete = () => {
    if (!myReviewId) return;
    deletePost(+myReviewId);
    setIsDeleted(true);
  };
  const toFormat = useMemo(() => (createdAt ? formatToDDMONTHYYYY(createdAt) : ''), [createdAt]);
  if (isDeleted) return null;
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <Avatar imgUrl={avatarUrl || ''} isExpert={isExpert} />
        <div className={styles.mid}>
          <div className={styles.name}>{isMain ? 'Ваш отзыв' : name || 'Неизвестно'}</div>
          <Rating ratingValue={rating} isExpert={isExpert} />
        </div>
        <div className={styles.right}>
          <div className={styles.date}>
            {status && listStatusDivs[status]}
            {toFormat}
          </div>
          {isMain && myReviewId && <PostKebab myReviewId={myReviewId} onDelete={handleDelete} />}
        </div>
      </div>

      {description && (
        <TextShowMore
          text={description}
          className={styles.desc}
        />
      )}
      {children}
    </div>
  );
};

export default Post;
