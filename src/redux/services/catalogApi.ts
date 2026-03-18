/* eslint-disable import/no-cycle */
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/redux/utils/baseQuery';
import {
  IGetCatalogResponse,
  IGetCatalogSecondLevelResponse,
} from './types/catalog';

export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getCatalog: builder.query<IGetCatalogResponse, void>({
      query: () => ({
        url: '/catalog',
        method: 'GET',
      }),
    }),
    getCatalogById: builder.query<IGetCatalogSecondLevelResponse, string>({
      query: (id: string) => ({
        url: `/catalog/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetCatalogQuery,
  useLazyGetCatalogQuery,
  useGetCatalogByIdQuery,
  useLazyGetCatalogByIdQuery,
} = catalogApi;
