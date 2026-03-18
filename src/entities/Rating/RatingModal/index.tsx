import {
  FC,
  useCallback, useEffect, useMemo,
  useState,
} from 'react';
import ModalWrapper from '@/shareds/ui/ModalWrapper';
import { IMyReview } from '@/redux/services/types/products';
import styles from './styles.module.scss';
import { SecondStep } from './SecondStep';
import FirstStep from './FirstStep';

interface IProps {
  isOpen: boolean,
  productId?: string,
  myReviewId?: number,
  myReview?: IMyReview,
  onClose: () => void
}

export const RatingModal: FC<IProps> = ({
  isOpen,
  productId,
  myReviewId,
  myReview,
  onClose,
}) => {
  const [steps, setSteps] = useState(1);
  const [ratingValue, setRatingValue] = useState(myReview ? myReview?.rating : 0);

  const setStepHandler = useCallback(
    (param?: number) => {
      setSteps(param!);
    },
    [],
  );
  useEffect(() => {
    if (myReview) setRatingValue(myReview.rating);
  }, [myReview]);
  const setRatingValueHandler = useCallback(
    (param?: number) => {
      setRatingValue(param!);
    },
    [],
  );

  const firstStep = useMemo(() => (
    <FirstStep
      setSteps={setStepHandler}
      setRatingValue={setRatingValueHandler}
      ratingValue={ratingValue}
    />
  ), [ratingValue, setRatingValueHandler, setStepHandler]);

  const stepsRender = useMemo(() => {
    if (steps === 2) {
      return (
        <SecondStep
          productId={productId}
          myReviewId={myReviewId}
          myReview={myReview}
          rating={ratingValue}
          setSteps={setStepHandler}
          onClose={onClose}
          setRatingValue={setRatingValueHandler}
        />
      );
    }
    return firstStep;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps, firstStep, setStepHandler]);

  return (
    <ModalWrapper
      canClose
      isVisible={isOpen}
      className={styles.wrapper}
      onClose={onClose}
    >
      <div className={styles.inner}>{stepsRender}</div>
    </ModalWrapper>
  );
};
