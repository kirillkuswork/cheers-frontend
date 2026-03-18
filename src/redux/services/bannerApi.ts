import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/redux/utils/baseQuery';
import {
  IBannerRequest,
  IBannerResponse,
} from '@/redux/services/types/banners';

export const bannerApi = createApi({
  reducerPath: 'bannerApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getBanner: builder.query<IBannerResponse, IBannerRequest>({
      query: (params: IBannerRequest) => ({
        url: '/banner/',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const { useGetBannerQuery, useLazyGetBannerQuery } = bannerApi;
