import { ButtonIcon } from '@/shareds/ui';
import clsx from 'clsx';
import Post from '../Post';
import styles from './styles.module.scss';
import { ArrowLeft, ArrowRight } from './icons';

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
  havePrev: boolean,
  haveNext: boolean,
  goNext: () => void;
  goPrev: () => void;
}
export const SliderPost = ({
  isExpert,
  myReviewId,
  isMain,
  status,
  avatarUrl = '',
  createdAt = '',
  rating = 0,
  name = '',
  description = '',
  havePrev,
  haveNext,
  goNext,
  goPrev,
}: IPostHeadingProps) => (
  <div className={styles.wrapper}>
    <Post
      {...{
        isExpert,
        myReviewId,
        isMain,
        status,
        avatarUrl,
        createdAt,
        rating,
        name,
        description,
      }}
    />
    <div className={styles.buttons}>
      <ButtonIcon
        size="large"
        className={clsx({
          [styles.button]: true,
          [styles.disable]: !havePrev,
        })}
        onClick={() => havePrev && goPrev?.()}
        icon={<ArrowLeft />}
      />
      <ButtonIcon
        size="large"
        className={clsx({
          [styles.button]: true,
          [styles.disable]: !haveNext,
        })}
        onClick={() => haveNext && goNext?.()}
        icon={<ArrowRight />}
      />
    </div>
  </div>
);
export default SliderPost;
