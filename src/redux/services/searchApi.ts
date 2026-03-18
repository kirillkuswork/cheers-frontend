/* eslint-disable import/no-cycle */
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/redux/utils/baseQuery';
import { IGetSearchRequest, ISearchItemProps } from './types/search';

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getSearch: builder.query<ISearchItemProps[], IGetSearchRequest>({
      query: (params) => ({
        url: '/search/suggestions',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const { useLazyGetSearchQuery } = searchApi;
