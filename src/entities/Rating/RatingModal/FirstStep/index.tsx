import React, { FC } from 'react';
import { Button, Rating } from '@/shareds';
import styles from './styles.module.scss';
import { ModalHeading } from '../ModalHeading';
import { RatingModalProductInfo } from '../RatingModalProductInfo';

interface IProps {
  setSteps: (value?: number) => void;
  ratingValue: number;
  setRatingValue: (prop: number) => void;
}

const FirstStep: FC<IProps> = ({
  setSteps,
  ratingValue,
  setRatingValue,
}) => (
  <div className={styles.wrapper}>
    <ModalHeading text="Оцените напиток" />
    <RatingModalProductInfo />

    <div className={styles.ratingWrapper}>
      <Rating
        ratingValue={ratingValue}
        onClick={setRatingValue}
        size="l"
      />
    </div>

    <Button
      disabled={!ratingValue}
      onClick={() => setSteps(2)}
      size="large"
      label="Далее"
      className={!ratingValue ? styles.buttonDisabled : ''}
    />
  </div>
);

export default React.memo(FirstStep);
