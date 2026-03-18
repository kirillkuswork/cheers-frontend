/* eslint-disable import/no-cycle */
import { createApi } from '@reduxjs/toolkit/query/react';
import {
  ICreateReviewReq,
  IGetOfferRequest,
  IGetOfferResponse,
  IGetPresetRequest,
  IGetPresetResponse,
  IGetProductByIdRequest,
  IGetProductsRequest,
  IGetProductsResponse,
  IGetReviewsRequest,
  IGetReviewsResponse,
  IGetStatisticForProductRequest,
  IMyReview,
  IProduct,
  IProductCurrent,
  IStatisticForProduct,
  IUpdateReviewReq,
} from '@/redux/services/types/products';
import { axiosBaseQuery } from '@/redux/utils/baseQuery';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  tagTypes: ['MyReview'],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getProducts: builder.query<IGetProductsResponse, IGetProductsRequest>({
      query: (params: IGetProductsRequest) => ({
        url: '/product/',
        method: 'POST',
        body: params,
      }),
      keepUnusedDataFor: 0,
    }),
    getProductById: builder.query<IProductCurrent, IGetProductByIdRequest>({
      query: (params: IGetProductByIdRequest) => ({
        url: `/product/${params.id}`,
        method: 'POST',
        body: { coordinates: params.coordinates },
      }),
    }),
    getStatisticForProduct: builder.query<IStatisticForProduct, IGetStatisticForProductRequest>({
      query: (params: IGetStatisticForProductRequest) => ({
        url: `/product/${params.id}/statistic?is_experts_only=${params.is_expers_only}`,
        method: 'GET',
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getMyReview: builder.query<IMyReview, string>({
      query: (id: string) => ({
        url: `/review/${id}/my_review`,
        method: 'GET',
        requiresAuth: true,
      }),
      providesTags: ['MyReview'],
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createReview: builder.mutation<IMyReview, ICreateReviewReq>({
      query: ({ productId, description, rating }) => ({
        url: '/review/',
        method: 'POST',
        body: {
          description,
          rating,
          product_id: +productId,
        },
      }),
      invalidatesTags: ['MyReview'],
    }),
    updateReview: builder.mutation<unknown, IUpdateReviewReq>({
      query: ({ id, description, rating }) => ({
        url: `/review/${id}`,
        method: 'PUT',
        body: {
          description,
          rating,
        },
      }),
      invalidatesTags: ['MyReview'],
    }),
    deleteReview: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `/review/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MyReview'],
    }),
    getReviewsById: builder.query<IGetReviewsResponse, IGetReviewsRequest>({
      query: ({
        id, cursor, limit = 20, isExpert,
      }: IGetReviewsRequest) => ({
        url: `/product/${id}/reviews`,
        method: 'POST',
        body: {
          pagination: {
            cursor,
            limit,
          },
          is_only_experts: isExpert,
        },
      }),
    }),
    getReviews: builder.query<IGetReviewsResponse, IGetReviewsRequest>({
      query: ({
        id, cursor, limit = 20, isExpert,
      }: IGetReviewsRequest) => ({
        url: `/product/${id}/reviews`,
        method: 'POST',
        body: {
          pagination: {
            cursor,
            limit,
          },
          is_only_experts: isExpert,
        },
      }),
      transformResponse: (res: IGetReviewsResponse): IGetReviewsResponse => ({
        ...res,
        reviews: res.reviews.filter((item) => !item.user.is_owner),
        pagination: { ...res?.pagination, cursor: res?.pagination?.cursor || 'disabled' },
      }),
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.cursor !== previousArg?.cursor;
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => `_${queryArgs?.id}_${endpointName}_isExp${queryArgs.isExpert}`,
      merge: (currentCache, newItems) => {
        currentCache.reviews = [...currentCache.reviews, ...newItems.reviews];
        currentCache.pagination = newItems.pagination;
      },
    }),
    getOffers: builder.query<IGetOfferResponse, IGetOfferRequest>({
      query: ({
        id, cursor, limit = 3, coordinates,
      }: IGetOfferRequest) => ({
        url: `/product/${id}/offers`,
        method: 'POST',
        body: {
          coordinates,
          pagination: {
            cursor,
            limit,
          },
        },
      }),
    }),
    getSuggests: builder.query<IProduct[], IGetProductByIdRequest>({
      query: ({
        id, coordinates,
      }: IGetProductByIdRequest) => ({
        url: `/product/${id}/suggests`,
        method: 'POST',
        body: { coordinates },
      }),
    }),
    getPreset: builder.query<IGetPresetResponse, IGetPresetRequest>({
      query: ({
        id, coordinates, sort, pagination,
      }: IGetPresetRequest) => ({
        url: `/product/presets/${id}`,
        method: 'POST',
        body: {
          coordinates,
          sort,
          pagination,
        },
      }),
    }),
  }),
});

export const {
  useGetProductByIdQuery,
  useGetStatisticForProductQuery,
  useGetReviewsQuery,
  useGetProductsQuery,
  useGetMyReviewQuery,
  useGetSuggestsQuery,
  // Lazy
  useLazyGetProductByIdQuery,
  useLazyGetProductsQuery,
  useLazyGetReviewsByIdQuery,
  useLazyGetMyReviewQuery,
  useLazyGetOffersQuery,
  useLazyGetPresetQuery,
  // Mutatuin
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = productsApi;
