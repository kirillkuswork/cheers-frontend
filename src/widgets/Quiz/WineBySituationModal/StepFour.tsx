/* eslint-disable import/no-cycle */
import React, { useCallback, useEffect, useState } from 'react';
import { IFilters } from '@/redux/services/types/quiz';
import { Chips } from '@/shareds';
import { StepWrapper } from '@/widgets/Quiz/StepWrapper';
import { ICommonStepProps } from '@/widgets/Quiz/types';
import styles from '../styles.module.scss';

interface StepProps extends ICommonStepProps {
  initialFilters: IFilters;
}

export const StepFour: React.FC<StepProps> = ({
  onNext,
  onCancel,
  data,
  initialFilters,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    const initialValues = data.responses
      .filter((response) => response.filters.string.some((filter) => initialFilters.string.some(
        (initialFilter) => initialFilter.attribute === filter.attribute
              && initialFilter.value.includes(response.value),
      )))
      .map((response) => response.value);

    setSelectedValues(initialValues);
  }, [data.responses, initialFilters.string]);

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
        {data.responses.map((response) => (
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
