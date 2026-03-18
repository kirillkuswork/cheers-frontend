import { FilterValues } from '@/redux/services/types/filters';
import { PATHS } from '../consts/baseConts';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// Функция для объединения всех фильтров типа 'string' в один объект
export const combineFilters = (filters: FilterValues) => filters.string?.reduce(
  (acc: Record<string, string[]>, { attribute, value }: { attribute: string; value: string[] }) => {
    if (!acc[attribute]) {
      acc[attribute] = [];
    }
    acc[attribute] = acc[attribute].concat(value);
    return acc;
  },
  {},
);

// Функция для создания URL с query параметрами на основе переданного базового URL и объекта query параметров
export const createUrlWithQuery = (
  base: string,
  queryObject: { [key: string]: string[] },
) => {
  const url = new URL(base, window.location.origin);
  Object.keys(queryObject).forEach((key) => {
    queryObject[key].forEach((value) => {
      url.searchParams.append(key, value);
    });
  });

  return url.toString();
};

// Функция для извлечения и объединения фильтров верхнего уровня из переданного объекта фильтров
export const getTopLevelFilters = (filters: FilterValues | undefined) => (!filters ? {} : combineFilters(filters));

// Функция для генерации URL для карточки продукта на основе фильтров карточки и фильтров верхнего уровня
export const generateCardHref = (
  cardFilters: FilterValues,
  topLevelFilters: { [key: string]: string[] },
) => {
  const combinedCardFilters = combineFilters(cardFilters);
  const finalFilters = { ...topLevelFilters };

  Object.keys(combinedCardFilters).forEach((attribute) => {
    if (!finalFilters[attribute]) {
      finalFilters[attribute] = [];
    }
    finalFilters[attribute] = finalFilters[attribute].concat(
      combinedCardFilters[attribute],
    );
  });

  return createUrlWithQuery(PATHS.products, finalFilters);
};
