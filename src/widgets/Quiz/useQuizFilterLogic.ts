/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { IFilters } from '@/redux/services/types/quiz';

// Хук для управления логикой фильтров в опроснике
const useQuizFilterLogic = (initialFilters: IFilters) => {
  // Хранение выбранных фильтров
  const [selectedFilters, setSelectedFilters] = useState<IFilters>(initialFilters);
  // Хранение выбранных ответов (массив, т.к. возможно множественный выбор на каждом шаге)
  const [selectedResponses, setSelectedResponses] = useState<(number[] | null)[]>([]);

  // Функция для обновления фильтров и выбранных ответов
  const updateFilters = (newFilters: IFilters, currentStep: number, selectedResponseIds: number[] | null) => {
    // Обновляем выбранные ответы, добавляя или заменяя ответ для текущего шага
    setSelectedResponses((prevResponses) => {
      const newResponses = [...prevResponses];
      newResponses[currentStep] = selectedResponseIds;
      return newResponses;
    });

    setSelectedFilters((prevFilters) => {
      // Удаляем фильтры текущего шага, чтобы избежать дублирования
      const filteredBoolean = prevFilters.boolean.filter(
        (filter) => !newFilters.boolean.some((newFilter) => newFilter.attribute === filter.attribute),
      );

      const filteredString = prevFilters.string.filter(
        (filter) => !newFilters.string.some((newFilter) => newFilter.attribute === filter.attribute),
      );

      const filteredNumber = prevFilters.number.filter(
        (filter) => !newFilters.number.some((newFilter) => newFilter.attribute === filter.attribute),
      );

      // Функция для объединения старых и новых фильтров (boolean и string)
      const mergeFilters = <T extends { attribute: string; value: (string | boolean)[] }>(
        prev: T[],
        new_: T[],
      ): T[] => {
        // Объединяем фильтры, избегая дублирования атрибутов и значений
        const merged = [...prev, ...new_].reduce<Record<string, T>>((acc, filter) => {
          if (acc[filter.attribute]) {
            acc[filter.attribute].value = Array.from(new Set([...acc[filter.attribute].value, ...filter.value]));
          } else {
            acc[filter.attribute] = { ...filter };
          }
          return acc;
        }, {});

        return Object.values(merged);
      };

      // Функция для объединения числовых фильтров
      const mergeNumberFilters = (
        prev: IFilters['number'],
        next: IFilters['number'],
      ): IFilters['number'] => {
        // Объединяем числовые фильтры, учитывая минимальные и максимальные значения
        const merged = [...prev, ...next].reduce<Record<string, IFilters['number'][0]>>((acc, filter) => {
          if (acc[filter.attribute]) {
            acc[filter.attribute] = {
              ...acc[filter.attribute],
              from_: Math.min(acc[filter.attribute].from_, filter.from_),
              to: Math.max(acc[filter.attribute].to, filter.to),
            };
          } else {
            acc[filter.attribute] = { ...filter };
          }
          return acc;
        }, {});

        return Object.values(merged);
      };

      // Возвращаем обновленные фильтры
      return {
        boolean: mergeFilters(filteredBoolean, newFilters.boolean),
        string: mergeFilters(filteredString, newFilters.string),
        number: mergeNumberFilters(filteredNumber, newFilters.number),
      };
    });
  };

  return {
    selectedFilters,
    selectedResponses,
    updateFilters,
  };
};

export default useQuizFilterLogic;
