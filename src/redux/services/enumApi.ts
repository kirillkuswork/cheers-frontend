/* eslint-disable import/no-cycle */
import { createApi } from '@reduxjs/toolkit/query/react';
import { IEnumResponse } from '@/redux/services/types/enum';
import { axiosBaseQuery } from '@/redux/utils/baseQuery';

export const enumApi = createApi({
  reducerPath: 'enumApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getEnum: builder.query<IEnumResponse, void>({
      query: () => ({
        url: '/enum/',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetEnumQuery } = enumApi;
