/* eslint-disable import/no-cycle */
import { createApi } from '@reduxjs/toolkit/query/react';
import {
  IGetUserResponse,
  IUpdateUserRequest,
  IUpdateUserResponse,
} from '@/redux/services/types/user';
import { axiosBaseQuery } from '@/redux/utils/baseQuery';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    updateUser: builder.query<IUpdateUserResponse, IUpdateUserRequest>({
      query: (params: IUpdateUserRequest) => ({
        url: '/user/',
        method: 'PUT',
        body: params,
        requiresAuth: true,
      }),
    }),
    getUser: builder.query<IGetUserResponse, void>({
      query: () => ({
        url: '/user/',
        method: 'GET',
        requiresAuth: true,
      }),
    }),
  }),
});

export const {
  useLazyUpdateUserQuery,
  useLazyGetUserQuery,
} = userApi;
