/* eslint-disable import/no-cycle */
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/redux/utils/baseQuery';
import {
  IGetOtpRequest, IGetOtpResponse,
  ILoginRequest,
  ITokens,
} from './types/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getOtp: builder.query<IGetOtpResponse, IGetOtpRequest>({
      query: (params: IGetOtpRequest) => ({
        url: '/auth/send-otp/web',
        method: 'POST',
        body: params,
      }),
      keepUnusedDataFor: 0,
    }),
    login: builder.query<ITokens, ILoginRequest>({
      query: (credentials: ILoginRequest) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    refreshToken: builder.query<ITokens, { refresh_token: string | null }>({
      query: (params) => ({
        url: '/auth/refresh-token',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const {
  useLazyLoginQuery,
  useLazyRefreshTokenQuery,
  useLazyGetOtpQuery,
} = authApi;
