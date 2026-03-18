/* eslint-disable import/no-cycle */
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/redux/utils/baseQuery';
import { ICreateFavoriteResponse, IGetFavoritesRequest, IGetFavoritesResponse } from './types/favorite';

export const favoriteApi = createApi({
  reducerPath: 'favoriteApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Favorite'],
  endpoints: (builder) => ({
    getFavorites: builder.query<IGetFavoritesResponse, IGetFavoritesRequest>({
      query: (params) => ({
        url: '/favorite/',
        method: 'POST',
        body: params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ['Favorite'],
      transformResponse: (res: IGetFavoritesResponse): IGetFavoritesResponse => ({
        ...res,
        pagination: { ...res?.pagination, cursor: res?.pagination?.cursor || 'disabled' },
      }),
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.pagination?.cursor !== previousArg?.pagination?.cursor;
      },
      serializeQueryArgs: ({ endpointName }) => `_${endpointName}`,
      merge: (currentCache, newItems) => {
        const items = [...currentCache.products, ...newItems.products];
        const itemsMap = new Map();
        items.forEach((item) => {
          itemsMap.set(item.id, item);
        });

        currentCache.products = Array.from(itemsMap.values());
        currentCache.pagination = newItems.pagination;
      },
    }),
    createFavorite: builder.mutation<ICreateFavoriteResponse, number>({
      query: (id) => ({
        url: `/favorite/${id}`,
        method: 'POST',
      }),
      // invalidatesTags: ['Favorite'],
    }),
    deleteFavorite: builder.mutation<string, number>({
      query: (id) => ({
        url: `/favorite/${id}`,
        method: 'DELETE',
      }),
      // invalidatesTags: ['Favorite'],
      // onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
      //   const patchResult = dispatch(
      //     favoriteApi.util.updateQueryData('getFavorites', undefined, (draft) => {
      //       draft.products = draft.products.filter((item) => item.id !== id);
      //     }),
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();
      //   }
      // },
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useLazyGetFavoritesQuery,
  useCreateFavoriteMutation,
  useDeleteFavoriteMutation,
} = favoriteApi;
