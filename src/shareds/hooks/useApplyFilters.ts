/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect } from 'react';
import { IFilters } from '@/redux/services/types/quiz';
import { UseFormReturn } from 'react-hook-form';
import { FilterValues } from '@/redux/services/types/filters';

const useApplyFilters = (filters: IFilters, methods: UseFormReturn<FilterValues>) => {
  const data = methods.getValues();

  useEffect(() => {
    if (filters) {
      // Применяем строковые фильтры
      filters.string?.forEach((filter) => {
        const { attribute, value } = filter;
        if (!data.string[attribute]) {
          data.string[attribute] = {};
        }
        value.forEach((v) => {
          data.string[attribute][v] = true;
        });
      });

      // Применяем булевые фильтры
      filters.boolean?.forEach((filter) => {
        const { attribute, value } = filter;
        if (!data.boolean[attribute]) {
          data.boolean[attribute] = false;
        }
        value.forEach((v) => {
          data.boolean[attribute] = v;
        });
      });

      // Применяем числовые фильтры
      filters.number?.forEach((filter) => {
        const { attribute, from_, to } = filter;
        if (!data.number[attribute]) {
          data.number[attribute] = [from_, to];
        } else {
          data.number[attribute][0] = Math.min(data.number[attribute][0], from_);
          data.number[attribute][1] = Math.max(data.number[attribute][1], to);
        }
      });

      // Обновляем форму с новыми фильтрами
      methods.reset(data);
    }
  }, [filters, methods]);
};

export default useApplyFilters;
