/* eslint-disable import/no-cycle */
import React, { ReactNode, FC } from 'react';
import { ButtonsGroup } from '@/shareds';
import Button from '@/shareds/ui/Button';
import styles from './styles.module.scss';

interface IStepWrapper {
  onCancel: () => void;
  handleNext: () => void;
  question: string;
  description?: string;
  children: ReactNode;
  buttonLabel?: string;
}

export const StepWrapper: FC<IStepWrapper> = ({
  question, description, children, handleNext, buttonLabel = 'Далее', onCancel,
}) => (
  <div className={styles.wrapper}>
    <div className={styles.heading}>
      <span className={styles.question}>{question}</span>
      {description && <span className={styles.description}>{description}</span>}
    </div>
    {children}
    <ButtonsGroup>
      <Button size="large" label={buttonLabel} onClick={handleNext} />
      <Button size="large" variant="tertiary" label="Отмена" onClick={onCancel} />
    </ButtonsGroup>
  </div>
);
