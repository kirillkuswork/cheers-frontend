/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import { Button, MainTextArea } from '@/shareds';
import { Controller, useForm, FieldValues } from 'react-hook-form';
import { useCreateReviewMutation, useUpdateReviewMutation } from '@/redux/services/productsApi';
import { IMyReview } from '@/redux/services/types/products';
import { success } from '@/shareds/helpres/AlertHelpers';
import styles from './styles.module.scss';
import { ModalHeading } from '../ModalHeading';
import { RatingModalProductInfo } from '../RatingModalProductInfo';

interface IProps {
  rating: number;
  productId?: string,
  myReviewId?: number,
  myReview?: IMyReview
  setSteps: (value: number) => void;
  onClose: () => void;
  setRatingValue: (prop: number) => void;
}

export const SecondStep: FC<IProps> = ({
  rating,
  productId,
  myReviewId,
  myReview,
  setSteps,
  onClose,
  setRatingValue,
}) => {
  const [invalidate, setInvalidate] = useState('');
  const {
    control,
    handleSubmit,
    setValue,
  } = useForm();
  const [createReview, { error: errorCreate, isSuccess: isSuccessCreate, isLoading: isLoadingCreate }] = useCreateReviewMutation();
  const [updateReview, { error: errorUpdate, isSuccess: isSuccessUpdate, isLoading: isLoadingUpdate }] = useUpdateReviewMutation();
  const getError = useMemo(() => errorUpdate || errorCreate, [errorUpdate, errorCreate]);
  const getSuccess = useMemo(() => isSuccessUpdate || isSuccessCreate, [isSuccessCreate, isSuccessUpdate]);
  const getLoading = useMemo(() => isLoadingUpdate || isLoadingCreate, [isLoadingUpdate, isLoadingCreate]);
  const onSubmit = ({ review }: FieldValues) => {
    if (!review) setInvalidate('Текст должен превышать 10 символов');
    const trimmedReview = review?.trimEnd();
    if (trimmedReview.length > 0 && trimmedReview.length < 10) {
      setInvalidate('Текст должен превышать 10 символов');
      return;
    }
    if (myReviewId) updateReview({ id: myReviewId, rating, description: review });
    else if (productId) createReview({ productId: +productId, rating, description: review });
  };
  useEffect(() => {
    if (myReview) setValue('review', myReview?.description);
  }, [myReview, setValue]);
  useEffect(() => {
    if (getSuccess) {
      setSteps(1);
      setRatingValue(0);
      onClose();
      success('Отзыв отправлен на модерацию');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSuccess, setSteps, setRatingValue]);
  const handleStepBack = useCallback(() => setSteps(1), [setSteps]);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((getError as any)?.data.message) setInvalidate((getError as any).data?.message);
  }, [getError]);
  return (
    <div className={styles.wrapper}>
      <ModalHeading text="Оцените напиток" />
      <RatingModalProductInfo />

      <form>
        <Controller
          name="review"
          control={control}
          render={({ field }) => (
            <MainTextArea
              {...field}
              errorMsg={invalidate}
              error={!!invalidate}
              label="Отзыв"
            />
          )}
        />
      </form>

      <div className={styles.buttons}>
        <Button
          isLoading={getLoading}
          onClick={handleSubmit(onSubmit)}
          size="large"
          label={myReviewId ? 'Изменить' : 'Опубликовать'}
        />

        <Button
          onClick={handleStepBack}
          disabled={getLoading}
          size="large"
          label="Назад"
          variant="tertiary"
        />
      </div>
    </div>
  );
};
