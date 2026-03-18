/* eslint-disable import/no-cycle */
import React, { useState, useCallback } from 'react';
import { IFilters } from '@/redux/services/types/quiz';
import { Chips } from '@/shareds';
import { StepWrapper } from '@/widgets/Quiz/StepWrapper';
import { ICommonStepProps } from '@/widgets/Quiz/types';
import styles from '../styles.module.scss';

export const StepsCheeps: React.FC<ICommonStepProps> = ({
  onNext,
  onCancel,
  data,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleChipClick = useCallback((value: string) => {
    setSelectedValues((prevValues) => {
      if (prevValues.includes(value)) {
        return prevValues.filter((v) => v !== value);
      }
      return [...prevValues, value];
    });
  }, [setSelectedValues]);

  const handleNext = useCallback(() => {
    const aggregatedFilters: IFilters = {
      boolean: [],
      string: [],
      number: [],
    };

    data.responses.forEach((response) => {
      if (selectedValues.includes(response.value)) {
        aggregatedFilters.string.push(...response.filters.string);
        aggregatedFilters.number.push(...response.filters.number);
        aggregatedFilters.boolean.push(...response.filters.boolean);
      }
    });

    onNext(aggregatedFilters, null);
  }, [onNext, data, selectedValues]);

  return (
    <StepWrapper
      handleNext={handleNext}
      onCancel={onCancel}
      description="Вы можете выбрать несколько вариантов"
      question={data?.question}
    >
      <div className={styles.chipsWrapper}>
        {data?.responses.map((response) => (
          <Chips
            key={response.value}
            label={response.value}
            isActive={selectedValues.includes(response.value)}
            onClick={() => handleChipClick(response.value)}
          />
        ))}
      </div>
    </StepWrapper>
  );
};
