/* eslint-disable import/no-cycle */
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/redux/utils/baseQuery';
import { IGetOfficeResponse, IGetOfficesRequest } from './types/office';

export const officeApi = createApi({
  reducerPath: 'officeApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getOffices: builder.query<IGetOfficeResponse, IGetOfficesRequest>({
      query: (params: IGetOfficesRequest) => ({
        url: '/office/',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const { useGetOfficesQuery, useLazyGetOfficesQuery } = officeApi;
