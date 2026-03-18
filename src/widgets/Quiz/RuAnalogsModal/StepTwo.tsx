/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
import React, { useCallback, useMemo, useState } from 'react';
import { Chips } from '@/shareds';
import { StepWrapper } from '@/widgets/Quiz/StepWrapper';
import { ICommonStepProps } from '@/widgets/Quiz/types';
import { IFilters } from '@/redux/services/types/quiz';
import styles from '../styles.module.scss';

interface StepTwoProps extends Omit<ICommonStepProps, 'onNext'> {
  onNext: (filters: IFilters, selectedResponseIds: number[] | null) => void;
  selectedResponseIds: number[] | null;
}

export const StepTwo: React.FC<StepTwoProps> = ({
  onNext,
  data,
  onCancel,
  selectedResponseIds,
  description,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const uniqueResponses = useMemo(() => data.responses.reduce((acc, response) => {
    if (!selectedResponseIds?.length || selectedResponseIds.includes(response.id!)) {
      if (!acc.some((res) => res.value === response.value)) {
        acc.push(response);
      }
    }
    return acc;
  }, [] as typeof data.responses), [data.responses, selectedResponseIds]);

  const handleChipClick = useCallback(
    (value: string) => {
      setSelectedValues((prevValues) => {
        if (prevValues.includes(value)) {
          return prevValues.filter((v) => v !== value);
        }
        return [...prevValues, value];
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

    uniqueResponses.forEach((response) => {
      if (selectedValues.includes(response.value)) {
        aggregatedFilters.string.push(...response.filters.string);
        aggregatedFilters.number.push(...response.filters.number);
        aggregatedFilters.boolean.push(...response.filters.boolean);
      }
    });

    onNext(aggregatedFilters, null);
  }, [selectedValues, uniqueResponses, onNext]);

  return (
    <StepWrapper
      handleNext={handleNext}
      onCancel={onCancel}
      description={description}
      question={data?.question}
    >
      <div className={styles.chipsWrapper}>
        {uniqueResponses.map((response) => (
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
