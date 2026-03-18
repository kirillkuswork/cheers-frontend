// hooks/useFilterController.ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetFilterByNameMutation, useGetFiltersQuery } from '@/redux/services/filtersApi';
import {
  resetFilters, setFilters, setPagination, setSelectedFilters, toggleFilterExpansion,
} from '@/redux/slices/baseFiltersSlice';
import { baseFiltersSelectors } from '@/redux/selectors/baseFiltersSelectors';

const useFilterController = () => {
  const dispatch = useDispatch();
  const {
    filters, selectedFilters, expandedFilters, pagination,
  } = useSelector(baseFiltersSelectors);

  // Получение начальных фильтров
  const { data: initialFilters, refetch } = useGetFiltersQuery({});

  // Хук для запроса данных по фильтру с пагинацией
  const [getFilterByName] = useGetFilterByNameMutation();

  useEffect(() => {
    if (initialFilters) {
      dispatch(setFilters(initialFilters.filters));
    }
  }, [initialFilters, dispatch]);
  // Метод для обновления выбранных фильтров
  const updateSelectedFilters = (attribute: string, value: { from_: number, to: number } | string | boolean) => {
    const isBoolean = filters?.boolean?.some((item) => item.attribute === attribute);
    const isString = filters?.string?.some((item) => item.attribute === attribute);
    const isNumber = filters?.number?.some((item) => item.attribute === attribute);
    if (isBoolean) {
      return;
    }
    if (isString) {
      const stringFilters = selectedFilters?.string;
      const hasNeedAttribute = stringFilters?.some((item) => item.attribute === attribute);
      if (hasNeedAttribute) {
        const newStringFiters = stringFilters?.map((item) => {
          if (item.attribute !== attribute) return item;
          const isHavaValue = item?.value?.some((elem) => elem === value);
          const newItem = { ...item };
          if (isHavaValue) {
            newItem.value = newItem.value.filter((elem) => elem !== value);
          } else {
            newItem.value = [...newItem.value, value as string];
          }
          return newItem;
        });
        dispatch(setSelectedFilters({ ...filters, string: newStringFiters }));
        return;
      }
      const currentInfoAboutAttribute = filters?.string?.find((item) => item?.attribute === attribute);
      const newStringFiters = [...(stringFilters || []), { attribute, value: [value as string], has_next: !!currentInfoAboutAttribute?.has_next }];
      dispatch(setSelectedFilters({ ...filters, string: newStringFiters }));
      return;
    }
    if (isNumber) {
      const numberFilters = selectedFilters?.number;
      const hasNeedAttribute = numberFilters?.some((item) => item.attribute === attribute);
      if (hasNeedAttribute && typeof value === 'object' && 'from_' in value) {
        const newNumberFiters = numberFilters?.map((item) => {
          if (item.attribute !== attribute) return item;
          const newItem = { ...item, from_: value?.from_, to: value?.to };
          return newItem;
        });
        dispatch(setSelectedFilters({ ...filters, number: newNumberFiters }));
        return;
      }
      const newNumberFiters = [...(numberFilters || []), { attribute, value }];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(setSelectedFilters({ ...filters, number: newNumberFiters as any }));
    }
    dispatch(setSelectedFilters(filters));
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setAllFilters = (newFilters: any) => {
    setSelectedFilters(newFilters);
  };
  // Метод для загрузки данных по конкретному фильтру с учетом пагинации
  const loadFilterByName = async (filterName: string, cursor: string | null, limit = 100) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await getFilterByName({ attribute: filterName, params: { filters: selectedFilters as any, pagination: { cursor, limit } } }).unwrap();
      if (result) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dispatch(setPagination({ filterName, cursor: (result as any).cursor, limit }));
        // Добавляем новые данные в фильтры (обновить значения в Redux)
        const isString = filters?.string?.some((item) => item.attribute === filterName);
        if (isString) {
          const newString = filters?.string?.map((item) => {
            if (item.attribute !== filterName) return item;
            const newlistValues = Array.from(new Set([...result.values, ...(item?.value || [])]));
            return { ...item, value: newlistValues };
          });
          dispatch(setFilters({
            ...filters,
            string: newString,
          }));
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load filter by name: ', error);
    }
  };

  // Метод для сброса фильтров
  const resetAllFilters = () => {
    dispatch(resetFilters());
    refetch(); // Повторный запрос для получения начальных фильтров
  };

  return {
    filters,
    selectedFilters,
    expandedFilters,
    pagination,
    updateSelectedFilters,
    loadFilterByName,
    setAllFilters,
    resetAllFilters,
    toggleFilterExpansion: (filterName: string) => dispatch(toggleFilterExpansion(filterName)),
  };
};

export default useFilterController;
