/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyGetAdminProductAttributesQuery } from '@/redux/services/adminApi';
import { useCallback, useEffect, useState } from 'react';
import { IProductAttributesResult } from '@/admin/sections/Management/ProductManagement/ProductCardForm/types';
import { attributeEnumObject } from '@/admin/sections/Management/ProductManagement/ProductCardForm/consts';
import { IGetAdminProductAttributesResponse } from '@/redux/services/types/admin';

export const useAttributeSelects = () => {
  const [getProductAttributes, { isFetching: isAttributesFetching }] = useLazyGetAdminProductAttributesQuery();

  const [selectStates, setSelectStates] = useState<IProductAttributesResult>({});

  useEffect(() => {
    const initialStates = Object.keys(attributeEnumObject).reduce(
      (acc, key) => {
        acc[key] = {
          pagination: { cursor: null },
          values: [],
        };
        return acc;
      },
      {} as IProductAttributesResult,
    );

    setSelectStates(initialStates);

    // Загрузка всех атрибутов при монтировании
    const fetchAllAttributes = async () => {
      const promises = Object.entries(attributeEnumObject).map(
        ([, attributeId]) => getProductAttributes({
          attributeId,
          pagination: { cursor: null, limit: 100 },
        }).unwrap(),
      );

      const results = await Promise.all(promises);

      // Обновляем состояние для каждого атрибута
      const updatedStates = Object.entries(attributeEnumObject).reduce(
        (acc, [key], index) => {
          acc[key] = results[index];
          return acc;
        },
        {} as IProductAttributesResult,
      );

      setSelectStates(updatedStates);
    };

    fetchAllAttributes();
  }, []);

  // Поиск атрибутов
  const handleSearch = useCallback(
    (key: keyof typeof attributeEnumObject, query: string | null) => {
      getProductAttributes({
        attributeId: attributeEnumObject[key],
        pagination: { cursor: null, limit: 100 },
        query,
      }).then((res) => {
        if (res.data) {
          setSelectStates((prev) => ({
            ...prev,
            [key]: res.data as IGetAdminProductAttributesResponse,
          }));
        }
      });
    },
    [],
  );

  // Подгрузка атрибутов при скролле
  const loadMoreAttributes = useCallback(
    (key: keyof typeof attributeEnumObject) => {
      const currentState = selectStates[key];
      if (!currentState?.pagination.cursor) return;

      getProductAttributes({
        attributeId: attributeEnumObject[key],
        pagination: {
          cursor: currentState.pagination.cursor,
          limit: 100,
        },
      }).then((res) => {
        if (res.data) {
          setSelectStates((prev) => ({
            ...prev,
            [key]: {
              pagination: res.data!.pagination || { cursor: null },
              values: [
                ...(prev[key]?.values || []),
                ...res.data!.values.filter(
                  (newItem) => !(prev[key]?.values || []).some(
                    (oldItem) => oldItem.id === newItem.id,
                  ), // Убираем дубликаты
                ),
              ],
            },
          }));
        }
      });
    },
    [selectStates],
  );

  return {
    selectStates, handleSearch, loadMoreAttributes, isAttributesFetching,
  };
};
