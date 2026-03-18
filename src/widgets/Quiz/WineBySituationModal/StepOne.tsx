/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
import React, { useCallback, useEffect, useState } from 'react';
import { Radio } from '@/shareds';
import { StepWrapper } from '@/widgets/Quiz/StepWrapper';
import { ICommonStepProps } from '@/widgets/Quiz/types';
import styles from '../styles.module.scss';

interface StepProps extends ICommonStepProps {
  selectedId: number[] | null;
}

export const StepOne: React.FC<StepProps> = ({
  onNext, onCancel, data, selectedId,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (selectedId !== null) {
      const selectedResponse = data?.responses?.find((response) => response.id === selectedId?.[0]);
      if (selectedResponse) {
        setSelectedValue(selectedResponse.value);
      }
    }
  }, [selectedId, data?.responses]);

  const handleNext = useCallback(() => {
    if (selectedValue) {
      const selectedResponse = data.responses.find((response) => response.value === selectedValue);
      if (selectedResponse) {
        onNext(selectedResponse.filters, [selectedResponse.id]);
      }
    }
  }, [selectedValue, onNext]);

  return (
    <StepWrapper handleNext={handleNext} onCancel={onCancel} question={data?.question}>
      <div className={styles.radioWrapper}>
        {data?.responses.map((response) => (
          <Radio
            isLeftRadio
            key={response.id}
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
