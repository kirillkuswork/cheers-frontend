/* eslint-disable import/no-cycle */
import { createApi } from '@reduxjs/toolkit/query/react';
import {
  IGetFilterByNameResponse,
  IGetFilterRequest,
  IGetFiltersRequest,
  IGetFiltersResponse,
} from '@/redux/services/types/filters';
import { axiosBaseQuery } from '@/redux/utils/baseQuery';

export const filtersApi = createApi({
  reducerPath: 'filtersApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getFilters: builder.query<IGetFiltersResponse, IGetFiltersRequest>({
      query: (params: IGetFiltersRequest) => ({
        url: '/filter/',
        method: 'POST',
        body: params,
      }),
      keepUnusedDataFor: 0,
      transformResponse: (response: IGetFiltersResponse): IGetFiltersResponse => {
        const modifiedResponse = { ...response };

        // скрываем блок Тип
        if (modifiedResponse.filters?.string) {
          modifiedResponse.filters.string = modifiedResponse.filters.string.filter(
            (filter) => filter.attribute !== 'type',
          );
        }
        // скрываем блок Цена и все блоки где разница между значениями равна 1
        if (modifiedResponse.filters?.number) {
          modifiedResponse.filters.number = modifiedResponse.filters.number.filter(
            // eslint-disable-next-line no-underscore-dangle
            (filter) => Math.abs(filter.to - filter.from_) !== 1,
          );
        }

        return modifiedResponse;
      },
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getFilterByName: builder.mutation<IGetFilterByNameResponse, { attribute: string, params: IGetFilterRequest }>({
      query: ({ attribute, params }) => ({
        url: `/filter/${attribute}`,
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const { useGetFilterByNameMutation, useGetFiltersQuery, useLazyGetFiltersQuery } = filtersApi;
