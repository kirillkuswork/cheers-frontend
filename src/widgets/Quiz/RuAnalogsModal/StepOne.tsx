/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
import React, { useCallback, useState } from 'react';
import { Chips } from '@/shareds';
import { StepWrapper } from '@/widgets/Quiz/StepWrapper';
import { ICommonStepProps } from '@/widgets/Quiz/types';
import { IFilters } from '@/redux/services/types/quiz';
import styles from '../styles.module.scss';

interface StepOneProps extends Omit<ICommonStepProps, 'onNext'> {
  onNext: (filters: IFilters, selectedResponseIds: number[] | null) => void;
}

export const StepOne: React.FC<StepOneProps> = ({
  onNext,
  data,
  onCancel,
  description,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedResponseIds, setSelectedResponseIds] = useState<number[]>([]);

  const handleChipClick = useCallback(
    (value: string, id: number) => {
      setSelectedValues((prevValues) => {
        if (prevValues.includes(value)) {
          return prevValues.filter((v) => v !== value);
        }
        return [...prevValues, value];
      });

      setSelectedResponseIds((prevIds) => {
        if (prevIds.includes(id)) {
          return prevIds.filter((i) => i !== id);
        }
        return [...prevIds, id];
      });
    },
    [setSelectedValues],
  );

  const handleNext = useCallback(() => {
    const aggregatedFilters: IFilters = {
      string: [],
      number: [],
      boolean: [],
    };

    data.responses.forEach((response) => {
      if (selectedValues.includes(response.value)) {
        aggregatedFilters.string.push(...response.filters.string);
        aggregatedFilters.boolean.push(...response.filters.boolean);
        aggregatedFilters.number.push(...response.filters.number);
      }
    });

    onNext(aggregatedFilters, selectedResponseIds);
  }, [selectedValues, selectedResponseIds, data.responses, onNext]);

  return (
    <StepWrapper
      onCancel={onCancel}
      question={data?.question}
      handleNext={handleNext}
      description={description}
    >
      <div className={styles.chipsWrapper}>
        {data.responses.map((response) => (
          <Chips
            key={response.id}
            label={response.value}
            isActive={selectedValues.includes(response.value)}
            onClick={() => handleChipClick(response.value, response.id!)}
          />
        ))}
      </div>
    </StepWrapper>
  );
};
