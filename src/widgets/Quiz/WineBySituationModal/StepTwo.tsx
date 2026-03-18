/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useCallback } from 'react';
import { Radio } from '@/shareds';
import { StepWrapper } from '@/widgets/Quiz/StepWrapper';
import { ICommonStepProps } from '@/widgets/Quiz/types';
import { useActions } from '@/shareds/hooks/useActions';
import { productsActions } from '@/redux/actions/productsActions';
import styles from '../styles.module.scss';

interface StepProps extends ICommonStepProps {
  filterId: number[];
  selectedId: number[] | null;
}

export const StepTwo: React.FC<StepProps> = ({
  onNext, onCancel, data, filterId, selectedId,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
  const { setQuizHeaderInfo } = useActions(productsActions);

  const responsesWithItemId = data.responses.map((response, index) => ({
    ...response,
    itemId: index + 1,
  }));

  const filteredResponses = responsesWithItemId.filter((response) => response.id === filterId?.[0]);

  useEffect(() => {
    if (selectedId !== null) {
      const selectedResponse = filteredResponses.find((response) => response.itemId === selectedId?.[0]);
      if (selectedResponse) {
        setSelectedValue(selectedResponse.value);
      }
    } else {
      setSelectedValue(undefined);
    }
  }, [selectedId]);

  const handleNext = useCallback(() => {
    if (selectedValue) {
      const selectedResponse = filteredResponses.find((response) => response.value === selectedValue);
      if (selectedResponse) {
        setQuizHeaderInfo({ value: selectedResponse.value, description: selectedResponse.description });
        onNext(selectedResponse.filters, [selectedResponse.itemId]);
      }
    }
  }, [selectedValue, onNext, setQuizHeaderInfo]);

  return (
    <StepWrapper handleNext={handleNext} onCancel={onCancel} question={data?.question}>
      <div className={styles.radioWrapper}>
        {filteredResponses.map((response) => (
          <Radio
            labelClassName={styles.label}
            isLeftRadio
            key={response.itemId}
            value={response.value}
            label={response.value}
            checked={selectedValue === response.value}
            onChange={setSelectedValue}
          />
        ))}
      </div>
    </StepWrapper>
  );
};
